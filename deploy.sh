#!/bin/bash

# AI Resume Generator Deployment Script
# This script helps prepare your application for deployment

echo "🚀 AI Resume Generator Deployment Script"
echo "========================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-github-repo-url>"
    exit 1
fi

# Check if all required files exist
echo "📁 Checking required files..."

required_files=(
    "frontend/vercel.json"
    "frontend/env.production"
    "backend/render.yaml"
    "backend/package.json"
    "DEPLOYMENT.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - Missing!"
    fi
done

echo ""
echo "🔧 Pre-deployment checklist:"
echo ""

# Check environment variables
echo "1. Environment Variables:"
echo "   - Set up MongoDB Atlas database"
echo "   - Get your OpenAI API key"
echo "   - Prepare your GitHub repository"

echo ""
echo "2. Update Configuration Files:"
echo "   - Edit frontend/env.production with your backend URL"
echo "   - Edit backend/render.yaml with your app name"
echo "   - Update DEPLOYMENT.md with your specific URLs"

echo ""
echo "3. Deploy Backend to Render:"
echo "   - Go to render.com"
echo "   - Create new Web Service"
echo "   - Connect your GitHub repo"
echo "   - Set root directory to 'backend'"
echo "   - Add environment variables"

echo ""
echo "4. Deploy Frontend to Vercel:"
echo "   - Go to vercel.com"
echo "   - Create new project"
echo "   - Import your GitHub repo"
echo "   - Set root directory to 'frontend'"
echo "   - Add environment variables"

echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🎯 Quick Commands:"
echo "   git add ."
echo "   git commit -m 'Prepare for deployment'"
echo "   git push origin main"
echo ""
echo "✅ Ready for deployment!" 