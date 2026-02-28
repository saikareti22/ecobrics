# Vercel Deployment Guide

## Prerequisites
✅ Vercel CLI installed (already done!)
✅ GitHub account
✅ Vercel account (free)

## Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub (recommended)

## Step 2: Deploy Your Project

### Option A: Deploy via CLI (Recommended)
```bash
# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? ecobricks-ecommerce
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

### Option B: Deploy via GitHub (Automatic)
1. Push your code to GitHub first
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Click "Deploy"
5. Vercel will automatically detect settings

## Step 3: Environment Variables (if needed)
If you add a database later, set environment variables:
```bash
vercel env add DATABASE_URL
```

## Your Live URLs
After deployment, you'll get:
- **Preview URL**: `https://ecobricks-ecommerce-xxx.vercel.app`
- **Production URL**: `https://ecobricks-ecommerce.vercel.app`

## Automatic Deployments
Once connected to GitHub:
- Every push to `main` branch = Production deployment
- Every pull request = Preview deployment

## Custom Domain (Optional)
1. Go to your project on Vercel dashboard
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Useful Commands
```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm ecobricks-ecommerce

# Open project in browser
vercel open
```

## Important Notes
- Free tier includes:
  - Unlimited deployments
  - Automatic HTTPS
  - Global CDN
  - 100GB bandwidth/month
  
- The server will run serverless (no need to keep it running)
- Database will be in-memory (resets on each deployment)
- For persistent data, add a database like MongoDB Atlas

## Next Steps After Deployment
1. Test all features on live URL
2. Share the link with customers
3. Add custom domain (optional)
4. Set up analytics (optional)
5. Add database for persistent storage (recommended)
