@echo off
echo ========================================
echo Update GitHub Repository
echo ========================================
echo.

echo Step 1: Check Git status
& "C:\Program Files\Git\bin\git.exe" status

echo.
echo Step 2: Add all changes
& "C:\Program Files\Git\bin\git.exe" add .

echo.
echo Step 3: Commit changes
set /p commit_message="Enter commit message (e.g., Added login page): "
& "C:\Program Files\Git\bin\git.exe" commit -m "%commit_message%"

echo.
echo Step 4: Push to GitHub
& "C:\Program Files\Git\bin\git.exe" push origin main

echo.
echo ========================================
echo GitHub Updated Successfully!
echo ========================================
pause
