@echo off
echo ========================================
echo EcoBricks GitHub Setup
echo ========================================
echo.

echo Checking if Git is installed...
git --version
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Git is not found in PATH
    echo Please restart your terminal/PowerShell and try again
    echo Or manually add Git to your PATH
    pause
    exit /b 1
)

echo.
echo Git is installed! Proceeding with setup...
echo.

echo Step 1: Configure Git (you'll need to edit this with your details)
echo Please replace "Your Name" and "your.email@example.com" with your actual details
pause

git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

echo.
echo Step 2: Initialize Git repository
git init

echo.
echo Step 3: Add all files to Git
git add .

echo.
echo Step 4: Create initial commit
git commit -m "Initial commit: EcoBricks e-commerce website with payment system"

echo.
echo Step 5: Set main branch
git branch -M main

echo.
echo ========================================
echo SUCCESS! Local Git repository is ready
echo ========================================
echo.
echo NEXT STEPS:
echo 1. Go to https://github.com
echo 2. Click "New repository"
echo 3. Name it: ecobricks-ecommerce
echo 4. Description: E-commerce website for sustainable bricks made from textile waste
echo 5. Click "Create repository"
echo 6. Copy the repository URL
echo 7. Run these commands:
echo.
echo    git remote add origin YOUR_GITHUB_URL
echo    git push -u origin main
echo.
echo ========================================
pause