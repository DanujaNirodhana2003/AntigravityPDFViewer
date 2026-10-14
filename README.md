# Antigravity PDF Viewer (Live Reload & Zero File Lock)

A universal PDF Viewer plugin for **Google Antigravity 2.0 Desktop** that renders PDFs directly inside the **Auxiliary Panel** with live-reload support and zero Windows file locking.

## Features

- 📑 **Integrated Auxiliary Panel UI:** Opens cleanly inside Antigravity's side panel whenever a `.pdf` file is clicked.
- ⚡ **Zero File Lock (Windows Safe):** Never holds open Windows OS file handles. Compilers (`pdflatex`, `latexmk`, `xelatex`, python, etc.) can overwrite or recompile output PDFs without permission/access denied crashes.
- 🔄 **Smart Live Reload:** Watches for document updates, debounces compiler writes, verifies the `%%EOF` marker, and automatically refreshes.
- 📌 **Scroll & Zoom Preservation:** Maintains your exact page number, scroll percentage, and zoom level across live recompilations—no jumping back to page 1.
- 🎨 **Adaptive Theme:** Syncs automatically with Antigravity dark/light themes.
- 📦 **Offline & Standalone:** Bundled with Mozilla `pdfjs-dist` (no external CDN or internet connection required).

## Directory Structure

```text
pdf-viewer/
├── plugin.json
└── sidecars/
    └── viewer/
        ├── sidecar.json
        ├── main.mjs
        ├── index.html
        └── vendor/
            ├── pdf.min.mjs
            └── pdf.worker.min.mjs
```

## Installation

### Global (All Workspaces)
Clone or copy this folder into your global Antigravity plugins directory:
```bash
# Windows
%USERPROFILE%\.gemini\config\plugins\pdf-viewer\
```

Antigravity will automatically detect the plugin and register the PDF Viewer UI for all `.pdf` files.
