# How to Update Code on GitHub

## Quick Method - Use the Batch File
Simply double-click `update-github.bat` and follow the prompts!

---

## Manual Commands

### Step 1: Check what files changed
```bash
& "C:\Program Files\Git\bin\git.exe" status
```

### Step 2: Add all changes
```bash
& "C:\Program Files\Git\bin\git.exe" add .
```

### Step 3: Commit with a message
```bash
& "C:\Program Files\Git\bin\git.exe" commit -m "Your message here"
```

### Step 4: Push to GitHub
```bash
& "C:\Program Files\Git\bin\git.exe" push origin main
```

---

## Complete Example

```bash
# See what changed
& "C:\Program Files\Git\bin\git.exe" status

# Add all files
& "C:\Program Files\Git\bin\git.exe" add .

# Commit with message
& "C:\Program Files\Git\bin\git.exe" commit -m "Added customer login page and payment system"

# Push to GitHub
& "C:\Program Files\Git\bin\git.exe" push origin main
```

---

## Common Commit Messages

Use clear, descriptive messages:

```bash
# For new features
git commit -m "Added customer login page"
git commit -m "Added payment gateway integration"
git commit -m "Added product search feature"

# For fixes
git commit -m "Fixed cart calculation bug"
git commit -m "Fixed mobile responsive issues"

# For updates
git commit -m "Updated product prices to INR"
git commit -m "Updated UI design"
git commit -m "Updated README documentation"

# For multiple changes
git commit -m "Added login page, payment system, and updated prices"
```

---

## First Time Setup (If Not Done)

### 1. Set up Git remote (only once)
```bash
& "C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/YOUR_USERNAME/ecobricks-ecommerce.git
```

### 2. Set branch to main
```bash
& "C:\Program Files\Git\bin\git.exe" branch -M main
```

### 3. First push
```bash
& "C:\Program Files\Git\bin\git.exe" push -u origin main
```

---

## Troubleshooting

### Error: "remote origin already exists"
```bash
# Remove existing remote
& "C:\Program Files\Git\bin\git.exe" remote remove origin

# Add new remote
& "C:\Program Files\Git\bin\git.exe" remote add origin YOUR_GITHUB_URL
```

### Error: "failed to push"
```bash
# Pull latest changes first
& "C:\Program Files\Git\bin\git.exe" pull origin main

# Then push
& "C:\Program Files\Git\bin\git.exe" push origin main
```

### Error: "nothing to commit"
This means no files have changed. Make some changes first!

---

## Workflow Summary

```
Make Changes → Add → Commit → Push
     ↓           ↓       ↓        ↓
  (Edit)    (git add) (git commit) (git push)
```

---

## Check Your GitHub Repository

After pushing, visit:
```
https://github.com/YOUR_USERNAME/ecobricks-ecommerce
```

You should see your latest changes!

---

## Daily Workflow

```bash
# Morning: Pull latest changes
git pull origin main

# Work on your code...

# Evening: Push your changes
git add .
git commit -m "Description of what you did today"
git push origin main
```
