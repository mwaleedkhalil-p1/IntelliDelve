# Image Management API Documentation

## Overview

This document provides comprehensive documentation for the Image Management API endpoints for blogs and case studies. The API allows frontend developers to upload, retrieve, update, and delete images associated with blog posts and case studies.

## Base URL

All endpoints are prefixed with `/api/`

## Authentication

- **GET requests**: No authentication required (public access)
- **POST, PUT, DELETE requests**: Requires JWT authentication
- Include the JWT token in the Authorization header: `Authorization: Bearer <token>`

## Content Types Supported

- `blog` - For blog posts
- `casestudy` - For case studies

## Image Upload Specifications

### Supported File Types
- JPEG (`.jpg`, `.jpeg`)
- PNG (`.png`)
- GIF (`.gif`)
- WebP (`.webp`)

### File Size Limits
- Maximum file size: **5MB**
- Maximum memory usage: **10MB**

### Image Processing
- Images are automatically processed to extract metadata (width, height, file size)
- Files are stored in organized directories: `/media/images/{content_type}/{object_id}/`

## API Endpoints

### 1. Upload Single Image

**Endpoint:** `POST /api/{content_type}/{object_id}/images/upload/`

**Description:** Upload a single image for a blog or case study.

**Parameters:**
- `content_type` (string): Either "blog" or "casestudy"
- `object_id` (UUID): The ID of the blog or case study

**Request Body (multipart/form-data):**
```json
{
  "image": "file",
  "alt_text": "string (optional, max 255 chars)",
  "caption": "string (optional)",
  "order": "integer (optional, default: 0)"
}
```

**Example Request:**
```bash
curl -X POST \
  -H "Authorization: Bearer <your-jwt-token>" \
  -F "image=@/path/to/image.jpg" \
  -F "alt_text=Sample image description" \
  -F "caption=This is a sample image" \
  -F "order=1" \
  http://localhost:8000/api/blog/123e4567-e89b-12d3-a456-426614174000/images/upload/
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "id": "456e7890-e89b-12d3-a456-426614174001",
    "image": "/media/images/blog/123e4567-e89b-12d3-a456-426614174000/sample_image.jpg",
    "alt_text": "Sample image description",
    "caption": "This is a sample image",
    "order": 1,
    "file_size": 1024000,
    "width": 1920,
    "height": 1080,
    "url": "/media/images/blog/123e4567-e89b-12d3-a456-426614174000/sample_image.jpg",
    "file_name": "sample_image.jpg",
    "content_type": 15,
    "object_id": "123e4567-e89b-12d3-a456-426614174000",
    "content_type_name": "blog",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### 2. Upload Multiple Images (Bulk Upload)

**Endpoint:** `POST /api/{content_type}/{object_id}/images/bulk-upload/`

**Description:** Upload multiple images at once for a blog or case study.

**Request Body (multipart/form-data):**
```json
{
  "images": ["file1", "file2", "file3", "..."]
}
```

**Example Request:**
```bash
curl -X POST \
  -H "Authorization: Bearer <your-jwt-token>" \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.png" \
  -F "images=@/path/to/image3.gif" \
  http://localhost:8000/api/blog/123e4567-e89b-12d3-a456-426614174000/images/bulk-upload/
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Successfully uploaded 3 images",
  "data": [
    {
      "id": "456e7890-e89b-12d3-a456-426614174001",
      "image": "/media/images/blog/123e4567-e89b-12d3-a456-426614174000/image1.jpg",
      "alt_text": "",
      "caption": "",
      "order": 0,
      "file_size": 1024000,
      "width": 1920,
      "height": 1080,
      "url": "/media/images/blog/123e4567-e89b-12d3-a456-426614174000/image1.jpg",
      "file_name": "image1.jpg",
      "content_type": 15,
      "object_id": "123e4567-e89b-12d3-a456-426614174000",
      "content_type_name": "blog",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
    // ... more images
  ]
}
```

### 3. Get All Images for Content

**Endpoint:** `GET /api/{content_type}/{object_id}/images/`

**Description:** Retrieve all images associated with a specific blog or case study.

**Example Request:**
```bash
curl -X GET \
  http://localhost:8000/api/blog/123e4567-e89b-12d3-a456-426614174000/images/
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Images retrieved successfully",
  "data": [
    {
      "id": "456e7890-e89b-12d3-a456-426614174001",
      "image": "/media/images/blog/123e4567-e89b-12d3-a456-426614174000/image1.jpg",
      "alt_text": "Sample image description",
      "caption": "This is a sample image",
      "order": 0,
      "file_size": 1024000,
      "width": 1920,
      "height": 1080,
      "url": "/media/images/blog/123e4567-e89b-12d3-a456-426614174000/image1.jpg",
      "file_name": "image1.jpg",
      "content_type": 15,
      "object_id": "123e4567-e89b-12d3-a456-426614174000",
      "content_type_name": "blog",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
    // ... more images
  ]
}
```

### 4. Get Single Image

**Endpoint:** `GET /api/images/{image_id}/`

**Description:** Retrieve details of a specific image.

**Example Request:**
```bash
curl -X GET \
  http://localhost:8000/api/images/456e7890-e89b-12d3-a456-426614174001/
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "456e7890-e89b-12d3-a456-426614174001",
    "image": "/media/images/blog/123e4567-e89b-12d3-a456-426614174000/image1.jpg",
    "alt_text": "Sample image description",
    "caption": "This is a sample image",
    "order": 0,
    "file_size": 1024000,
    "width": 1920,
    "height": 1080,
    "url": "/media/images/blog/123e4567-e89b-12d3-a456-426614174000/image1.jpg",
    "file_name": "image1.jpg",
    "content_type": 15,
    "object_id": "123e4567-e89b-12d3-a456-426614174000",
    "content_type_name": "blog",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### 5. Update Image Metadata

**Endpoint:** `PUT /api/images/{image_id}/`

**Description:** Update image metadata (alt_text, caption, order). Cannot update the image file itself.

**Request Body (JSON):**
```json
{
  "alt_text": "Updated alt text",
  "caption": "Updated caption",
  "order": 2
}
```

**Example Request:**
```bash
curl -X PUT \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{"alt_text": "Updated alt text", "caption": "Updated caption", "order": 2}' \
  http://localhost:8000/api/images/456e7890-e89b-12d3-a456-426614174001/
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Image updated successfully",
  "data": {
    "id": "456e7890-e89b-12d3-a456-426614174001",
    "image": "/media/images/blog/123e4567-e89b-12d3-a456-426614174000/image1.jpg",
    "alt_text": "Updated alt text",
    "caption": "Updated caption",
    "order": 2,
    "file_size": 1024000,
    "width": 1920,
    "height": 1080,
    "url": "/media/images/blog/123e4567-e89b-12d3-a456-426614174000/image1.jpg",
    "file_name": "image1.jpg",
    "content_type": 15,
    "object_id": "123e4567-e89b-12d3-a456-426614174000",
    "content_type_name": "blog",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:35:00Z"
  }
}
```

### 6. Delete Image

**Endpoint:** `DELETE /api/images/{image_id}/`

**Description:** Delete an image. This removes both the database record and the physical file.

**Example Request:**
```bash
curl -X DELETE \
  -H "Authorization: Bearer <your-jwt-token>" \
  http://localhost:8000/api/images/456e7890-e89b-12d3-a456-426614174001/
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

## Enhanced Blog and Case Study Endpoints

### Blog with Images

When you fetch a blog post, it now includes all associated images:

**Endpoint:** `GET /api/blogs/{blog_id}/`

**Response includes images:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Sample Blog Post",
    "content": "Blog content here...",
    "excerpt": "Brief description",
    "author": "John Doe",
    "status": "published",
    "featured_image": "https://example.com/featured.jpg",
    "images": [
      {
        "id": "456e7890-e89b-12d3-a456-426614174001",
        "url": "/media/images/blog/123e4567-e89b-12d3-a456-426614174000/image1.jpg",
        "alt_text": "Sample image",
        "caption": "Image caption",
        "order": 0,
        "file_size": 1024000,
        "width": 1920,
        "height": 1080
      }
    ],
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### Case Study with Images

**Endpoint:** `GET /api/case-studies/{case_study_id}/`

**Response includes images:**
```json
{
  "success": true,
  "data": {
    "id": "789e0123-e89b-12d3-a456-426614174002",
    "title": "Sample Case Study",
    "client": "ABC Company",
    "industry": "Technology",
    "challenge": "Challenge description...",
    "solution": "Solution description...",
    "results": "Results description...",
    "featured_image": "https://example.com/featured.jpg",
    "images": [
      {
        "id": "456e7890-e89b-12d3-a456-426614174003",
        "url": "/media/images/casestudy/789e0123-e89b-12d3-a456-426614174002/chart1.png",
        "alt_text": "Performance chart",
        "caption": "Performance improvement chart",
        "order": 0,
        "file_size": 512000,
        "width": 1200,
        "height": 800
      }
    ],
    "created_at": "2024-01-15T09:00:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

## Error Responses

### Validation Errors (400)

```json
{
  "success": false,
  "error": "Validation error",
  "details": {
    "image": ["Image file too large. Maximum size is 5MB."]
  }
}
```

### Authentication Required (401)

```json
{
  "success": false,
  "error": "Authentication credentials were not provided."
}
```

### Not Found (404)

```json
{
  "success": false,
  "error": "Blog not found."
}
```

### Server Error (500)

```json
{
  "success": false,
  "error": "Failed to upload image"
}
```

## Frontend Integration Examples

### React/JavaScript Example

```javascript
// Upload single image
const uploadImage = async (contentType, objectId, imageFile, metadata = {}) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  if (metadata.alt_text) formData.append('alt_text', metadata.alt_text);
  if (metadata.caption) formData.append('caption', metadata.caption);
  if (metadata.order !== undefined) formData.append('order', metadata.order);

  try {
    const response = await fetch(`/api/${contentType}/${objectId}/images/upload/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      console.log('Image uploaded:', result.data);
      return result.data;
    } else {
      console.error('Upload failed:', result.error);
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// Get all images for content
const getImages = async (contentType, objectId) => {
  try {
    const response = await fetch(`/api/${contentType}/${objectId}/images/`);
    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

// Delete image
const deleteImage = async (imageId) => {
  try {
    const response = await fetch(`/api/images/${imageId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const result = await response.json();

    if (result.success) {
      console.log('Image deleted successfully');
      return true;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

// Bulk upload example
const bulkUploadImages = async (contentType, objectId, imageFiles) => {
  const formData = new FormData();

  imageFiles.forEach(file => {
    formData.append('images', file);
  });

  try {
    const response = await fetch(`/api/${contentType}/${objectId}/images/bulk-upload/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      console.log(`${result.data.length} images uploaded successfully`);
      return result.data;
    } else {
      console.error('Bulk upload failed:', result.error);
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Bulk upload error:', error);
    throw error;
  }
};
```

## Best Practices

### 1. Image Optimization
- Compress images before upload to reduce file size
- Use appropriate formats (WebP for modern browsers, JPEG for photos, PNG for graphics)
- Consider implementing client-side image resizing for large images

### 2. Error Handling
- Always check the `success` field in responses
- Handle different error types appropriately (validation, authentication, server errors)
- Provide user-friendly error messages

### 3. Performance
- Use the bulk upload endpoint for multiple images
- Implement image lazy loading on the frontend
- Consider implementing image thumbnails for better performance

### 4. Security
- Validate file types on the frontend before upload
- Check file sizes before upload to provide immediate feedback
- Always include proper authentication headers for protected endpoints

### 5. User Experience
- Show upload progress for large files
- Provide preview functionality before upload
- Allow users to reorder images using the `order` field
- Implement drag-and-drop functionality for better UX

## Database Schema

### Image Model Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `content_type` | ForeignKey | Links to Blog or CaseStudy model |
| `object_id` | UUID | ID of the associated blog or case study |
| `image` | ImageField | The uploaded image file |
| `alt_text` | CharField | Alternative text for accessibility |
| `caption` | TextField | Optional image caption |
| `order` | PositiveIntegerField | Display order of the image |
| `file_size` | PositiveIntegerField | File size in bytes |
| `width` | PositiveIntegerField | Image width in pixels |
| `height` | PositiveIntegerField | Image height in pixels |
| `created_at` | DateTimeField | Creation timestamp |
| `updated_at` | DateTimeField | Last update timestamp |

### Relationships

- **Blog** → **Images**: One-to-many relationship
- **CaseStudy** → **Images**: One-to-many relationship
- Images are automatically deleted when the parent blog or case study is deleted

## File Storage

- Images are stored in `/media/images/{content_type}/{object_id}/`
- File names are sanitized to prevent security issues
- Original file extensions are preserved
- Files are automatically deleted when image records are removed

## Troubleshooting

### Common Issues

1. **"Pillow is not installed" error**
   - Ensure Pillow is installed: `pip install Pillow`

2. **"File too large" error**
   - Check file size limits in settings
   - Compress images before upload

3. **"Invalid file type" error**
   - Ensure file is one of the supported formats
   - Check file extension and MIME type

4. **Authentication errors**
   - Verify JWT token is valid and not expired
   - Include proper Authorization header

5. **404 errors**
   - Verify the blog/case study ID exists
   - Check URL format and content type parameter

For additional support, please contact the development team.
