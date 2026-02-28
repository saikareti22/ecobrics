# Customer Login Feature

## Overview
A dedicated login page that customers must use before accessing the e-commerce website.

## Features

### Login Page (login.html)
- **Beautiful Split-Screen Design**
  - Left side: Branding and features
  - Right side: Login/Signup forms

- **Login Form**
  - Email and password fields
  - Remember me checkbox
  - Forgot password link
  - Continue as Guest option

- **Signup Form**
  - Full name, email, phone
  - Password with confirmation
  - Terms & Conditions checkbox
  - Easy switch between login/signup

### Security Features
- Password validation (minimum 6 characters)
- Password confirmation matching
- Email validation
- Duplicate email prevention
- Session management with localStorage

### User Experience
1. **First Visit**: User sees login page
2. **Options**:
   - Login with existing account
   - Create new account
   - Continue as guest
3. **After Login**: Redirected to main website
4. **Logged In State**: User info shown in navbar
5. **Logout**: Returns to login page

## How It Works

### Flow Diagram
```
Visit Website
    ↓
Login Page (login.html)
    ↓
Choose Option:
├── Login → Main Site (index.html)
├── Signup → Login → Main Site
└── Guest → Main Site (limited features)
```

### Files Created
- `public/login.html` - Login page HTML
- `public/login-styles.css` - Login page styles
- `public/login.js` - Login page JavaScript

### API Endpoints Used
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/profile` - Get user profile

## Testing the Feature

### Test Accounts
Create test accounts by signing up or use these steps:

1. **Create Account**:
   - Go to http://localhost:3000/login.html
   - Click "Sign Up"
   - Fill in details
   - Click "Create Account"

2. **Login**:
   - Enter email and password
   - Click "Login"
   - Redirected to main site

3. **Guest Access**:
   - Click "Continue as Guest"
   - Access site without account

### User States
- **Not Logged In**: Redirected to login.html
- **Logged In**: Full access to site
- **Guest**: Can browse and shop

## Customization

### Change Login Page Colors
Edit `public/login-styles.css`:
```css
:root {
    --primary-color: #2d6a4f;  /* Change this */
    --secondary-color: #52b788; /* Change this */
}
```

### Add Social Login
Add buttons in `login.html`:
```html
<button class="btn-social">
    Login with Google
</button>
```

### Require Login (No Guest)
In `public/login.html`, remove:
```html
<button type="button" class="btn-guest" onclick="continueAsGuest()">
    Continue as Guest
</button>
```

## Security Notes

⚠️ **Important for Production**:
1. Hash passwords (use bcrypt)
2. Use JWT tokens instead of simple tokens
3. Add HTTPS
4. Implement rate limiting
5. Add CAPTCHA for signup
6. Email verification
7. Password reset functionality

## Future Enhancements
- [ ] Social login (Google, Facebook)
- [ ] Two-factor authentication
- [ ] Email verification
- [ ] Password reset via email
- [ ] Remember device
- [ ] Login history
- [ ] Account settings page
- [ ] Profile picture upload
