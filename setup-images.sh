#!/bin/bash

# Create directories for images
mkdir -p public/images/projects

# Create placeholder images with information text
echo "Create a 400x400px profile image" > public/images/profile.txt
echo "Add project screenshots here (1200x675px recommended)" > public/images/projects/README.txt
echo "Add an OG image for social media sharing" > public/images/og-image.txt

echo "Image directories created. Please add your images to:"
echo "- public/images/profile.jpg (professional headshot)"
echo "- public/images/projects/ (project screenshots)"
echo "- public/images/og-image.jpg (site preview for social media)"
echo "- app/favicon.ico (site icon)" 