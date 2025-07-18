#!/bin/bash

# Convert HEIC files to WebP format
# Requires imagemagick: brew install imagemagick

echo "Converting HEIC files to WebP..."

# Change to the gallery directory
cd "$(dirname "$0")/../gallery" || exit 1

# Convert all HEIC files to WebP
for file in *.HEIC *.heic; do
    if [ -f "$file" ]; then
        # Get filename without extension
        filename="${file%.*}"
        
        # Convert to WebP with 40% resize
        echo "Converting $file to ${filename}.webp (resizing to 40%)..."
        magick "$file" -resize 40% -quality 85 "${filename}.webp"
        
        # Optional: remove original HEIC file (uncomment if desired)
        # rm "$file"
    fi
done

echo "Conversion complete!"
echo "You can now delete the original HEIC files if desired." 