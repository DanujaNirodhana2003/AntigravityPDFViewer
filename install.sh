#!/usr/bin/env bash
set -e

echo "========================================================"
echo "  Installing Antigravity PDF Viewer Plugin (macOS/Linux)"
echo "========================================================"
echo ""

TARGET_DIR="$HOME/.gemini/config/plugins/pdf-viewer"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "[1/3] Creating target directory: $TARGET_DIR"
mkdir -p "$TARGET_DIR"

echo "[2/3] Copying plugin files..."
cp "$SCRIPT_DIR/plugin.json" "$TARGET_DIR/"
rm -rf "$TARGET_DIR/sidecars"
cp -r "$SCRIPT_DIR/sidecars" "$TARGET_DIR/"

echo "[3/3] Checking installation..."
if [ -f "$TARGET_DIR/sidecars/viewer/main.mjs" ]; then
    echo ""
    echo "========================================================"
    echo "  [SUCCESS] Antigravity PDF Viewer installed!"
    echo "========================================================"
    echo ""
    echo "How to use:"
    echo "1. Open Google Antigravity."
    echo "2. Click any .pdf file in your explorer."
    echo "3. It will open in the Auxiliary Panel with live reload!"
    echo ""
else
    echo "[ERROR] Installation failed."
    exit 1
fi
