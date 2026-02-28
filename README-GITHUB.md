# GitHub Setup Instructions

## Prerequisites
1. Install Git for Windows from: https://git-scm.com/download/win
2. Create a GitHub account at: https://github.com

## Setup Steps

### 1. Configure Git (First time only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 2. Initialize Repository
```bash
git init
git add .
git commit -m "Initial commit: EcoBricks e-commerce website"
git branch -M main
```

### 3. Create GitHub Repository
1. Go to https://github.com
2. Click "New repository" (green button)
3. Repository name: `ecobricks-ecommerce`
4. Description: `E-commerce website for sustainable bricks made from textile waste`
5. Keep it Public or Private (your choice)
6. Don't initialize with README (we already have files)
7. Click "Create repository"

### 4. Connect to GitHub
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/ecobricks-ecommerce.git
git push -u origin main
```

### 5. Future Updates
```bash
# After making changes to your code:
git add .
git commit -m "Description of changes"
git push
```

## Repository Structure
```
ecobricks-ecommerce/
├── public/
│   ├── index.html      # Main website
│   ├── styles.css      # Styling
│   └── app.js          # Frontend JavaScript
├── server.js           # Backend server
├── package.json        # Dependencies
├── .gitignore         # Git ignore rules
└── README.md          # Documentation
```

## Live Demo
After pushing to GitHub, you can deploy to:
- **Netlify** (for frontend only)
- **Vercel** (for full-stack)
- **Heroku** (for full-stack)
- **Railway** (for full-stack)

## Environment Variables (for deployment)
```
PORT=3000
NODE_ENV=production
```

## Quick Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## Quick Deploy to Netlify
1. Drag and drop the `public` folder to netlify.com
2. For full-stack, use Netlify Functions