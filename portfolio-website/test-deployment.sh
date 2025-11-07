#!/bin/bash

# Deployment Testing and Validation Script
# This script helps validate the deployment after it goes live

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🧪 Deployment Testing and Validation"
echo "===================================="
echo ""

# Check if URL is provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}Usage: ./test-deployment.sh <deployment-url>${NC}"
    echo "Example: ./test-deployment.sh https://caifu.pages.dev"
    exit 1
fi

DEPLOYMENT_URL=$1

echo "Testing deployment at: $DEPLOYMENT_URL"
echo ""

# Test 1: Check if site is accessible
echo "📡 Test 1: Checking site accessibility..."
if curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL" | grep -q "200"; then
    echo -e "${GREEN}✓ Site is accessible${NC}"
else
    echo -e "${RED}✗ Site is not accessible${NC}"
    exit 1
fi
echo ""

# Test 2: Check main routes
echo "🔗 Test 2: Checking main routes..."
routes=("/" "/projects" "/about" "/contact")
for route in "${routes[@]}"; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL$route")
    if [ "$status" = "200" ]; then
        echo -e "${GREEN}✓ $route - OK${NC}"
    else
        echo -e "${RED}✗ $route - Failed (Status: $status)${NC}"
    fi
done
echo ""

# Test 3: Check if _redirects is working (client-side routing)
echo "🔄 Test 3: Checking client-side routing support..."
status=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL/projects/some-random-path")
if [ "$status" = "200" ]; then
    echo -e "${GREEN}✓ Client-side routing is working${NC}"
else
    echo -e "${YELLOW}⚠ Client-side routing might not be configured correctly${NC}"
fi
echo ""

# Test 4: Check if static assets are accessible
echo "📦 Test 4: Checking static assets..."
# Check if we can access the main JS and CSS files
if curl -s "$DEPLOYMENT_URL" | grep -q "assets/index-"; then
    echo -e "${GREEN}✓ Static assets are referenced correctly${NC}"
else
    echo -e "${YELLOW}⚠ Could not verify static assets${NC}"
fi
echo ""

# Test 5: Check response headers
echo "🔒 Test 5: Checking security headers..."
headers=$(curl -s -I "$DEPLOYMENT_URL")

if echo "$headers" | grep -q "x-frame-options"; then
    echo -e "${GREEN}✓ X-Frame-Options header present${NC}"
else
    echo -e "${YELLOW}⚠ X-Frame-Options header missing${NC}"
fi

if echo "$headers" | grep -q "x-content-type-options"; then
    echo -e "${GREEN}✓ X-Content-Type-Options header present${NC}"
else
    echo -e "${YELLOW}⚠ X-Content-Type-Options header missing${NC}"
fi
echo ""

# Test 6: Check page load time
echo "⚡ Test 6: Checking page load time..."
load_time=$(curl -s -o /dev/null -w "%{time_total}" "$DEPLOYMENT_URL")
echo "Page load time: ${load_time}s"
if (( $(echo "$load_time < 2.0" | bc -l) )); then
    echo -e "${GREEN}✓ Load time is good (< 2s)${NC}"
else
    echo -e "${YELLOW}⚠ Load time could be improved${NC}"
fi
echo ""

# Summary
echo "=================================="
echo "✅ Basic deployment tests complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Run Lighthouse test in Chrome DevTools"
echo "  2. Test on mobile devices"
echo "  3. Verify all interactive features"
echo "  4. Check console for any errors"
echo ""
echo "🔍 Lighthouse test:"
echo "  - Open Chrome DevTools (F12)"
echo "  - Go to 'Lighthouse' tab"
echo "  - Run audit for Performance, Accessibility, Best Practices, SEO"
echo "  - Target: All scores > 90"
echo ""
echo "📱 Mobile testing:"
echo "  - Test on iPhone (Safari)"
echo "  - Test on Android (Chrome)"
echo "  - Use Chrome DevTools device emulator"
echo ""
