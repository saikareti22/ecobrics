@echo off
echo ========================================
echo EcoBricks Vercel Deployment
echo ========================================
echo.

echo Step 1: Login to Vercel
vercel login

echo.
echo Step 2: Deploy to Vercel (Preview)
vercel

echo.
echo ========================================
echo Deployment Complete!
echo.
echo To deploy to production, run:
echo   vercel --prod
echo ========================================
pause
