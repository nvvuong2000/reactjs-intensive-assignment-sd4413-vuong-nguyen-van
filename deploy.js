const { execSync } = require('child_process');
const fs = require('fs');

console.log('Deploying KYC React App...\n');

// Ensure Vercel CLI is installed
try { execSync('vercel --version', { stdio: 'pipe' }); }
catch { execSync('npm install -g vercel', { stdio: 'inherit' }); }

// Ensure logged in
try { execSync('vercel whoami', { stdio: 'pipe' }); }
catch { execSync('vercel login', { stdio: 'inherit' }); }

// Link project if needed
if (!fs.existsSync('.vercel')) execSync('vercel link', { stdio: 'inherit' });

// Build and deploy
execSync('npm run build', { stdio: 'inherit' });
execSync('vercel --prod', { stdio: 'inherit' });

console.log('\nDeployment successful!');
