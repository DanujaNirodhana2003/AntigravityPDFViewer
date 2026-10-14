// PDF Viewer sidecar backend.
//
// Design goal: NEVER hold a file handle open. Every request opens the PDF,
// reads it into memory and closes it immediately. Node opens files on Windows
// with FILE_SHARE_READ | FILE_SHARE_WRITE | FILE_SHARE_DELETE, so even during
// that brief read, pdflatex/latexmk (or anything else) can still overwrite,
// rename or delete the file without a "permission denied" error.
import { readFileSync, statSync, openSync, readSync, closeSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import { SidecarApp } from 'sidecar_sdk';

const here = dirname(fileURLToPath(import.meta.url));

/** Accepts a Windows path, POSIX path or file:// URI; only allows .pdf files. */
function resolvePdf(input) {
  if (typeof input !== 'string' || !input) throw new Error('No file given');
  const p = input.startsWith('file:') ? fileURLToPath(input) : input;
  if (extname(p).toLowerCase() !== '.pdf') throw new Error('Not a .pdf file: ' + p);
  return p;
}

/** True if the last 2 KB of the file contain the %%EOF marker (write finished). */
function hasEof(path, size) {
  const n = Math.min(2048, size);
  if (n < 5) return false;
  const buf = Buffer.alloc(n);
  const fd = openSync(path, 'r');
  try { readSync(fd, buf, 0, n, size - n); } finally { closeSync(fd); }
  return buf.includes('%%EOF');
}

const app = new SidecarApp();

app.page('/', () => readFileSync(join(here, 'index.html'), 'utf8'));

// Cheap change detection, polled by the view.
app.api('/api/stat', ({ file }) => {
  try {
    const path = resolvePdf(file);
    const st = statSync(path);
    return { ok: true, mtimeMs: st.mtimeMs, size: st.size, complete: hasEof(path, st.size) };
  } catch (err) {
    // Missing file is normal mid-compile (some tools delete then recreate).
    return { ok: false, error: String(err.message || err) };
  }
});

// Whole file as base64, read in one shot and released immediately.
app.api('/api/read', ({ file }) => {
  try {
    const path = resolvePdf(file);
    const data = readFileSync(path);
    const st = statSync(path);
    return { ok: true, mtimeMs: st.mtimeMs, size: data.length, base64: data.toString('base64') };
  } catch (err) {
    return { ok: false, error: String(err.message || err) };
  }
});

// Bundled PDF.js (no network needed).
const VENDOR = { pdf: 'pdf.min.mjs', worker: 'pdf.worker.min.mjs' };
app.api('/api/vendor', ({ name }) => {
  const f = VENDOR[name];
  if (!f) return { ok: false, error: 'unknown vendor file' };
  return { ok: true, source: readFileSync(join(here, 'vendor', f), 'utf8') };
});

app.run();
