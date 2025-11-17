#!/bin/bash

# 🚀 Quick Deployment Script for nivbuskila.tech
# This script helps prepare and deploy your portfolio

set -e  # Exit on error

echo "🚀 Portfolio Deployment Helper"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Are you in the portfolio directory?"
    exit 1
fi

echo "Step 1: Running pre-deployment checks..."
echo ""

# Check git status
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes:"
    git status --short
    echo ""
    read -p "Do you want to commit these changes? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter commit message: " commit_msg
        git add .
        git commit -m "$commit_msg"
        print_success "Changes committed"
    else
        print_warning "Proceeding with uncommitted changes"
    fi
else
    print_success "Working tree is clean"
fi

echo ""
echo "Step 2: Running tests..."
npm test -- --passWithNoTests
if [ $? -eq 0 ]; then
    print_success "All tests passed"
else
    print_error "Tests failed. Fix issues before deploying."
    exit 1
fi

echo ""
echo "Step 3: Running linter..."
npm run lint
if [ $? -eq 0 ]; then
    print_success "Linter passed"
else
    print_error "Linter failed. Fix issues before deploying."
    exit 1
fi

echo ""
echo "Step 4: Building for production..."
npm run build
if [ $? -eq 0 ]; then
    print_success "Production build successful"
else
    print_error "Build failed. Check errors above."
    exit 1
fi

echo ""
echo "Step 5: Checking current branch..."
current_branch=$(git branch --show-current)
echo "Current branch: $current_branch"

if [[ "$current_branch" != "main" && "$current_branch" != "master" ]]; then
    print_warning "You're not on main/master branch"
    echo ""
    echo "Deployment options:"
    echo "  1) Create and push to main branch (recommended)"
    echo "  2) Push current branch and deploy from there"
    echo "  3) Cancel"
    echo ""
    read -p "Choose option (1-3): " -n 1 -r
    echo ""

    case $REPLY in
        1)
            echo "Creating main branch..."
            git checkout -b main 2>/dev/null || git checkout main
            git merge "$current_branch" --no-edit
            print_success "Merged to main"
            ;;
        2)
            echo "Will push current branch: $current_branch"
            ;;
        3)
            echo "Deployment cancelled"
            exit 0
            ;;
        *)
            print_error "Invalid option"
            exit 1
            ;;
    esac
fi

echo ""
echo "Step 6: Pushing to remote..."
current_branch=$(git branch --show-current)
git push -u origin "$current_branch"
print_success "Pushed to origin/$current_branch"

echo ""
echo "=============================="
print_success "Pre-deployment checks complete!"
echo ""
echo "Next steps:"
echo ""
echo "📦 Option 1: Deploy to Vercel (Recommended)"
echo "   1. Go to https://vercel.com"
echo "   2. Import your GitHub repository"
echo "   3. Deploy automatically!"
echo ""
echo "📦 Option 2: Deploy to Netlify"
echo "   1. Go to https://netlify.com"
echo "   2. Import your GitHub repository"
echo "   3. Set build command: npm run build"
echo "   4. Deploy!"
echo ""
echo "📦 Option 3: Manual deployment"
echo "   See DEPLOYMENT.md for detailed instructions"
echo ""
echo "🎉 Your portfolio is ready to go live at nivbuskila.tech!"
echo ""
