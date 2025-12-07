# Simple Deployment Guide

## Quick Deploy

Run this command to deploy your app:

```
node deploy.js
```

## What the script does:

1. Checks if Vercel CLI is installed
2. Installs Vercel CLI if needed
3. Checks if you are logged in to Vercel
4. Logs you in if needed
5. Links your project to Vercel
6. Builds your React app
7. Deploys to Vercel production

## Manual Steps (if needed)

If you prefer to do it manually:

### Step 1: Install Vercel CLI
```
npm install -g vercel
```

### Step 2: Login to Vercel
```
vercel login
```

### Step 3: Build and Deploy
```
npm run build
npm run deploy
```

## After Deployment

Your app will be live at a URL like:
https://your-project.vercel.app

You can share this URL with others to access your KYC app.

## Troubleshooting

Build fails?
```
npm install
npm run build
```

Not logged in?
```
vercel login
```

Need to link project?
```
vercel link
```