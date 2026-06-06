@echo off
title Pakistan Load Shedding Tracker
color 0A

echo.
echo  ============================================
echo   Pakistan Load Shedding Tracker
echo   Pakistan Load Shedding Tracker - Launcher
echo  ============================================
echo.

:: Check if Node.js is installed
where node >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] Node.js is not installed.
    echo  Please install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: Change to the app directory
cd /d "%~dp0"

echo  [INFO] Starting local server on http://localhost:4173
echo  [INFO] The app will open in your browser automatically...
echo.
echo  Press Ctrl+C to stop the server when done.
echo.

:: Start the preview server and open browser after a short delay
start "" cmd /c "npx vite preview --port 4173"
timeout /t 2 /nobreak >nul
start http://localhost:4173

echo  [OK] App launched! Check your browser.
echo.
echo  Keeping server running... Close this window to stop.
pause >nul
