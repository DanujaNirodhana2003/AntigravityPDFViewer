@echo off
setlocal enabledelayedexpansion

echo ========================================================
echo   Installing Antigravity PDF Viewer Plugin
echo ========================================================
echo.

set "TARGET_DIR=%USERPROFILE%\.gemini\config\plugins\pdf-viewer"
set "SCRIPT_DIR=%~dp0"

echo [1/3] Creating plugin directory:
echo       "%TARGET_DIR%"
if not exist "%TARGET_DIR%" mkdir "%TARGET_DIR%"

echo.
echo [2/3] Copying plugin files...
copy /y "%SCRIPT_DIR%plugin.json" "%TARGET_DIR%\" >nul
if exist "%TARGET_DIR%\sidecars" rmdir /s /q "%TARGET_DIR%\sidecars"
xcopy /s /e /y /q "%SCRIPT_DIR%sidecars" "%TARGET_DIR%\sidecars\" >nul

echo.
echo [3/3] Checking installation...
if exist "%TARGET_DIR%\sidecars\viewer\main.mjs" (
    echo.
    echo ========================================================
    echo   [SUCCESS] Antigravity PDF Viewer installed!
    echo ========================================================
    echo.
    echo How to use:
    echo 1. Open Google Antigravity.
    echo 2. Click any .pdf file in your explorer.
    echo 3. It will open in the Auxiliary Panel with live reload!
    echo.
) else (
    echo.
    echo [ERROR] Installation failed. Please check permissions.
)

pause
