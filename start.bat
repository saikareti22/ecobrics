@echo off
echo ========================================
echo EcoBricks E-Commerce Platform
echo ========================================
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting server...
echo.
echo Server will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
node server.js
