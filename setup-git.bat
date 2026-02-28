@echo off
echo ========================================
echo Setting up Git Repository for EcoBricks
echo ========================================
echo.

echo Step 1: Configure Git (replace with your details)
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
git commit -m "Initial commit: EcoBricks e-commerce website"

echo.
echo Step 5: Create main branch
git branch -M main

echo.
echo ========================================
echo Next Steps:
echo 1. Create a new repository on GitHub.com
echo 2. Copy the repository URL
echo 3. Run: git remote add origin YOUR_GITHUB_URL
echo 4. Run: git push -u origin main
echo ========================================
pause