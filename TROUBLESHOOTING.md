# Troubleshooting Guide

## Browser Not Working / Can't Access Website

### ✅ Server is Now Running!

**Access your website at:**
- Login Page: http://localhost:3000/login.html
- Main Site: http://localhost:3000/index.html
- API: http://localhost:3000/api/products

---

## Common Issues & Solutions

### 1. "This site can't be reached" or "Connection refused"

**Problem:** Server is not running

**Solution:**
```bash
# Start the server
node server.js
```

Or double-click `start.bat`

---

### 2. "Port 3000 is already in use"

**Problem:** Another process is using port 3000

**Solution A - Kill Node processes:**
```powershell
Get-Process -Name node | Stop-Process -Force
node server.js
```

**Solution B - Use different port:**
Edit `server.js` line 8:
```javascript
const PORT = process.env.PORT || 3001; // Change to 3001
```

Then access: http://localhost:3001

---

### 3. Blank Page or "Cannot GET /"

**Problem:** Accessing wrong URL

**Solution:** Make sure you're accessing:
- http://localhost:3000/login.html (NOT just http://localhost:3000)

---

### 4. Login Page Not Loading

**Problem:** File path issue

**Solution:** Check files exist:
- `public/login.html`
- `public/login.js`
- `public/login-styles.css`

---

### 5. "API Error" or Network Errors

**Problem:** API URL mismatch

**Solution:** Check `public/app.js` and `public/login.js`:
```javascript
const API_URL = 'http://localhost:3000/api';
```

Make sure port matches your server port.

---

### 6. Changes Not Showing

**Problem:** Browser cache

**Solution:**
- Press `Ctrl + Shift + R` (hard refresh)
- Or `Ctrl + F5`
- Or clear browser cache

---

### 7. Server Crashes Immediately

**Problem:** Missing dependencies

**Solution:**
```bash
npm install
node server.js
```

---

## Quick Start Commands

### Start Server
```bash
node server.js
```

### Check if Server is Running
Open browser: http://localhost:3000/api/products

Should show JSON with products.

### Stop Server
Press `Ctrl + C` in terminal

---

## Testing Checklist

✅ Server running? Check terminal for "Server is running on http://localhost:3000"
✅ Can access http://localhost:3000/login.html?
✅ Can create account?
✅ Can login?
✅ Can see products?
✅ Can add to cart?
✅ Can checkout?

---

## Browser Recommendations

**Best browsers for testing:**
- Google Chrome
- Microsoft Edge
- Firefox

**Enable Developer Tools:**
- Press `F12`
- Check Console tab for errors
- Check Network tab for API calls

---

## Port Already in Use - Complete Fix

If you keep getting port errors:

```powershell
# 1. Find what's using port 3000
netstat -ano | findstr :3000

# 2. Kill that process (replace PID with actual number)
taskkill /PID <PID_NUMBER> /F

# 3. Start server
node server.js
```

---

## Still Not Working?

### Check These:

1. **Node.js installed?**
   ```bash
   node --version
   ```
   Should show version number.

2. **Dependencies installed?**
   ```bash
   npm install
   ```

3. **Correct directory?**
   ```bash
   dir
   ```
   Should see `server.js`, `package.json`, `public` folder

4. **Firewall blocking?**
   - Allow Node.js through Windows Firewall
   - Try http://127.0.0.1:3000/login.html instead

---

## Contact for Help

If still having issues, check:
- Terminal/console for error messages
- Browser console (F12) for JavaScript errors
- Make sure all files are in correct locations
