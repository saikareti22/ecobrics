# Install Git on Windows

## Method 1: Direct Download (Recommended)
1. Go to: https://git-scm.com/download/win
2. Click "Download for Windows"
3. Run the downloaded installer
4. Use default settings (just keep clicking "Next")
5. Restart your terminal/PowerShell after installation

## Method 2: Using Winget (Windows Package Manager)
Open PowerShell as Administrator and run:
```powershell
winget install --id Git.Git -e --source winget
```

## Method 3: Using Chocolatey (if installed)
```powershell
choco install git
```

## After Installation
1. Close and reopen your terminal/PowerShell
2. Test if Git is installed:
```bash
git --version
```

## Then Continue with GitHub Setup
After Git is installed, you can run these commands:

```bash
# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize repository
git init
git add .
git commit -m "Initial commit: EcoBricks e-commerce website"
git branch -M main

# Connect to GitHub (after creating repository)
git remote add origin https://github.com/YOUR_USERNAME/ecobricks-ecommerce.git
git push -u origin main
```