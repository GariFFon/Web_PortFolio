#!/bin/bash

echo "Verifying installation of GariFFon Portfolio..."

# Check Node.js installation
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js is installed (${NODE_VERSION})"
else
    echo "❌ Node.js is not installed"
    exit 1
fi

# Check npm installation
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✅ npm is installed (${NPM_VERSION})"
else
    echo "❌ npm is not installed"
    exit 1
fi

# Check for required files
if [ -f "package.json" ]; then
    echo "✅ package.json exists"
else
    echo "❌ package.json is missing"
    exit 1
fi

if [ -d "app" ]; then
    echo "✅ app directory exists"
else
    echo "❌ app directory is missing"
    exit 1
fi

# Check for node_modules
if [ -d "node_modules" ]; then
    echo "✅ Dependencies are installed"
else
    echo "❌ Dependencies are not installed. Run 'npm install' first."
    exit 1
fi

# Check for image directories
if [ -d "public/images" ]; then
    echo "✅ Image directories exist"
else
    echo "❌ Image directories are missing. Run './setup-images.sh' first."
    exit 1
fi

echo "✅ Installation verification complete. Run 'npm run dev' to start the development server." 