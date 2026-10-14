# Antigravity PDF Viewer 📑⚡

A universal, high-performance PDF Viewer plugin for **Google Antigravity 2.0 Desktop** that renders PDFs directly inside the **Auxiliary Panel** with live reload, selectable text, and zero Windows file locking.

---

## 🚀 One-Line Quick Install

Send this single command to your friends! Open CMD or PowerShell and run:

### Windows (Command Prompt / PowerShell)
```cmd
git clone https://github.com/DanujaNirodhana2003/AntigravityPDFViewer.git && cd AntigravityPDFViewer && install.bat
```

### macOS / Linux
```bash
git clone https://github.com/DanujaNirodhana2003/AntigravityPDFViewer.git && cd AntigravityPDFViewer && chmod +x install.sh && ./install.sh
```

That's it! Open Antigravity and click any `.pdf` file.

---

## ✨ Why this plugin?

- 🚫 **No More Junk Letters:** Fixes the issue where Antigravity opens binary `.pdf` files as unreadable raw text in the Auxiliary Panel.
- ⚡ **Zero File Lock (Windows Safe):** Never holds exclusive OS file handles. Compilers (`pdflatex`, `latexmk`, `xelatex`, Typst, Python) can overwrite PDFs on the fly without `Permission Denied` crashes.
- 🔄 **Smart Live Reload:** Detects recompiles, debounces file-writing activity, verifies the `%%EOF` marker, and automatically reloads without flickering.
- 📌 **Scroll & Zoom Preservation:** Remembers your exact page number, scroll percentage, and zoom level across recompiles—never resets to page 1.
- ✍️ **Selectable & Copyable Text:** Built with PDF.js `TextLayer` so you can highlight, select, and copy (`Ctrl + C`) text and equations.
- 🎨 **Adaptive Theme:** Syncs automatically with Antigravity dark and light themes.
- 📦 **100% Offline:** Bundled with local Mozilla `pdfjs-dist` (no CDN or internet connection required).

---

## 🛠 Manual Installation

If you prefer to install manually, simply copy the `plugin.json` and `sidecars` folder into your global Antigravity config directory:

```text
%USERPROFILE%\.gemini\config\plugins\pdf-viewer\
├── plugin.json
└── sidecars\
    └── viewer\
        ├── sidecar.json
        ├── main.mjs
        ├── index.html
        └── vendor\
```

---

## 📄 License
MIT License. Free to use and share!
