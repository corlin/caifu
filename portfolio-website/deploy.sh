#!/bin/bash

# Deployment script for Cloudflare Pages
# This script builds and deploys the portfolio website to Cloudflare Pages

set -e  # Exit on error

echo "🚀 Starting deployment process..."

# Step 1: Clean previous build
echo "📦 Cleaning previous build..."
rm -rf dist

# Step 2: Run build
echo "🔨 Building project..."
npm run build

# Step 3: Check build output
echo "📊 Build output size:"
du -sh dist
echo ""
echo "📁 Build files:"
ls -lh dist/

# Step 4: Deploy to Cloudflare Pages
echo ""
echo "☁️  Deploying to Cloudflare Pages..."
wrangler pages deploy dist --project-name=caifu

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your site should be live at: https://caifu.pages.dev"
echo ""
echo "📝 Next steps:"
echo "  1. Visit your site to verify deployment"
echo "  2. Test all routes and functionality"
echo "  3. Run Lighthouse performance test"
echo "  4. Configure custom domain (if needed)"
