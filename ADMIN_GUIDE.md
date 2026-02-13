# Image Management Admin Guide

## Overview
The Wambui Bales website now includes an admin interface for managing product images. You can upload, view, and delete images directly from the admin panel without needing to manually edit files.

## Accessing the Admin Panel

1. Navigate to `/admin/images` or click the **Admin** button in the header
2. You'll see the Image Management page with upload and gallery sections

## Uploading Images

### Method 1: Drag and Drop
1. Locate the upload area on the left side
2. Drag image files directly into the dashed box
3. The image will upload automatically
4. You'll see a success message when complete

### Method 2: Click to Select
1. Click anywhere in the upload box
2. Select an image from your device
3. The upload begins immediately

### Upload Requirements
- **File Size**: Maximum 5MB per image
- **Formats**: JPEG, PNG, WebP, GIF
- **Best Practice**: Use square images (e.g., 800x800px) for product bales
- **Optimization Tip**: Compress images before uploading to keep file sizes small

## Viewing Images

The gallery on the right shows all uploaded images with:
- Preview thumbnail
- Filename
- File size in KB
- Upload date

### Gallery Actions
- **Refresh**: Click the "Refresh" button to reload the image list
- **Sort**: Images are automatically sorted by newest first

## Deleting Images

1. Hover over any image in the gallery
2. A delete button (trash icon) appears
3. Click the delete button
4. Confirm the deletion when prompted
5. The image is removed from the server

**Important**: Deleted images cannot be recovered. Make sure you want to delete before confirming.

## File Storage

All uploaded images are saved to:
```
public/uploads/
```

Each file is named with a timestamp to avoid conflicts:
```
1234567890-original-filename.jpg
```

You can reference these images in code using:
```
/uploads/filename.jpg
```

## Using Uploaded Images on the Shop Page

To display uploaded images on your shop page:

1. Get the image path from the admin gallery
2. Use it in your bales array or components:

```tsx
const bales = [
  {
    id: 1,
    name: 'Ladies Mix',
    image: '/uploads/1234567890-ladies-clothing.jpg',
    category: 'ladies',
    // ... other properties
  }
]
```

## Troubleshooting

### Upload Fails
- Check file size (must be under 5MB)
- Ensure file format is supported (JPEG, PNG, WebP, GIF)
- Refresh the page and try again

### Images Won't Display
- Verify the file path is correct (should start with `/uploads/`)
- Check that the image file wasn't deleted
- Clear your browser cache

### Gallery Won't Load
- Click the "Refresh" button
- Check your internet connection
- Try clearing browser cache and reloading

## Image Optimization Tips

To keep your website fast and responsive:

1. **Compress Before Upload**
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Target 50-200KB per image

2. **Recommended Dimensions**
   - Product thumbnails: 400x400px to 800x800px
   - Save as WebP format for best compression

3. **Naming Convention**
   - Use clear, descriptive names
   - Example: `ladies-mix-bale.jpg`, `kids-colorful-clothing.jpg`

## API Endpoints (for developers)

The admin panel uses these API endpoints:

### Upload Image
```
POST /api/images/upload
Body: FormData with 'file' and optional 'category'
```

### Delete Image
```
POST /api/images/delete
Body: JSON { filename: "string" }
```

### List Images
```
GET /api/images/list
Response: { images: [] }
```

## Security Notes

- The upload folder is publicly accessible
- File type validation prevents non-image files
- Filenames are sanitized to prevent malicious code
- Future versions can add authentication for additional security

## Next Steps

After setting up images:
1. Update the shop page to use your uploaded images
2. Organize images by category (ladies, gents, kids, mixed)
3. Keep file sizes optimized for fast loading
4. Regularly review and remove unused images
