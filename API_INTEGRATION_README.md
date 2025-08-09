# IntelliDelve API Integration

This document describes the API integration implemented in the IntelliDelve frontend application.

## Overview

The frontend now integrates with the Django backend API to fetch and manage blog posts and case studies dynamically. The integration includes authentication, data fetching, and error handling.

## API Endpoints Integrated

### Authentication
- **POST** `/api/auth/login/` - User login
- **GET** `/api/auth/validate/` - Token validation

### Blogs
- **GET** `/api/blogs/` - List all blogs (with pagination and search)
- **GET** `/api/blogs/{uuid}/` - Get single blog post
- **POST** `/api/blogs/` - Create new blog post (authenticated)
- **PUT** `/api/blogs/{uuid}/` - Update blog post (authenticated)
- **DELETE** `/api/blogs/{uuid}/` - Delete blog post (authenticated)

### Case Studies
- **GET** `/api/case-studies/` - List all case studies (with pagination)
- **GET** `/api/case-studies/{uuid}/` - Get single case study
- **POST** `/api/case-studies/` - Create new case study (authenticated)
- **PUT** `/api/case-studies/{uuid}/` - Update case study (authenticated)
- **DELETE** `/api/case-studies/{uuid}/` - Delete case study (authenticated)

## Files Added/Modified

### New Files
- `client/services/apiService.ts` - Main API client and service functions
- `client/hooks/useApi.ts` - React Query hooks for API operations
- `client/context/AuthContext.tsx` - Authentication context provider
- `client/components/admin/LoginForm.tsx` - Admin login form component
- `client/pages/admin/AdminDashboard.tsx` - Admin dashboard for content management

### Modified Files
- `client/pages/Blogs.tsx` - Updated to use API data with loading/error states
- `client/pages/BlogPost.tsx` - Updated to fetch individual blog posts from API
- `client/pages/CaseStudies.tsx` - Added API integration hooks
- `client/App.tsx` - Added AuthProvider wrapper
- `client/routes.tsx` - Added admin dashboard route
- `.env.example` - Added API configuration variables

## Configuration

### Environment Variables
Add these variables to your `.env` file:

```env
VITE_API_BASE_URL=https://informed-bluebird-right.ngrok-free.app
```

### API Base URL
The API base URL is configured to use:
- Development: `https://informed-bluebird-right.ngrok-free.app` (from env or fallback)
- Production: `https://api.intellidelve.com` (from env or fallback)

## Features Implemented

### 1. Authentication System
- JWT token-based authentication
- Automatic token storage in localStorage
- Token validation on app startup
- Protected routes for admin functionality

### 2. Blog Management
- Dynamic blog listing with pagination
- Search functionality
- Category filtering (client-side)
- Individual blog post viewing
- Loading states and error handling
- Fallback to static data when API is unavailable

### 3. Case Studies
- Dynamic case study listing
- API integration with fallback to static data
- Loading and error states

### 4. Admin Dashboard
- Login form with test credentials
- Dashboard showing blog and case study statistics
- Table view of all content
- Basic CRUD operation placeholders

### 5. Error Handling
- Network error handling
- API error responses
- User-friendly error messages
- Retry functionality

### 6. Loading States
- Skeleton loading for better UX
- Spinner components
- Progressive loading

## Usage

### Accessing the Admin Dashboard
1. Navigate to `/admin`
2. Use the test credentials:
   - Email: `shahmirkhan9181@gmail.com`
   - Password: `IntelliDelveIntern123@`

### API Service Usage
```typescript
import { blogService, caseStudyService, authService } from '../services/apiService';

// Fetch blogs
const blogs = await blogService.getBlogs({ page: 1, search: 'background' });

// Login
const result = await authService.login({ email, password });

// Create blog post
const newBlog = await blogService.createBlog({
  title: 'New Blog Post',
  content: '<p>Content here</p>',
  excerpt: 'Short description',
  author: 'Author Name',
  status: 'published',
  tags: ['tag1', 'tag2'],
  category: 'Technology'
});
```

### React Query Hooks Usage
```typescript
import { useBlogs, useBlog, useCreateBlog } from '../hooks/useApi';

// In component
const { data: blogsResponse, isLoading, error } = useBlogs({ page: 1 });
const { data: blogResponse } = useBlog('blog-uuid');
const createBlogMutation = useCreateBlog();
```

## API Response Format

All API responses follow this format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: Record<string, string>;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: {
    data: T[];
    total: number;
    page: number;
    limit: number;
  };
}
```

## Testing

### Test Credentials
- **Email**: `shahmirkhan9181@gmail.com`
- **Password**: `IntelliDelveIntern123@`

### Test Endpoints
The API is currently running on: `https://informed-bluebird-right.ngrok-free.app`

### Postman Collection
A Postman collection is available with all endpoints configured for testing.

## Fallback Behavior

When the API is unavailable:
- Blog pages show static fallback data
- Case studies show static fallback data
- Error messages are displayed with retry options
- Admin dashboard shows login form

## Security Features

- JWT token authentication
- Automatic token refresh handling
- Protected admin routes
- CORS handling
- Input validation
- Error message sanitization

## Next Steps

1. Implement full CRUD operations in admin dashboard
2. Add image upload functionality
3. Implement rich text editor for blog content
4. Add user management features
5. Implement role-based permissions
6. Add analytics and reporting
7. Implement caching strategies
8. Add offline support

## Troubleshooting

### Debug Tools Available

1. **API Test Page**: Navigate to `/api-test` for comprehensive API testing
2. **Admin Debug Tab**: Go to `/admin` and click "API Debug" tab
3. **Browser Console**: Use `window.testAPI.runAll()` to run tests manually
4. **Network Tab**: Check browser dev tools for detailed request/response info

### Common Issues & Solutions

1. **401 Unauthorized Error**
   ```
   POST https://informed-bluebird-right.ngrok-free.app/api/auth/login/ 401 (Unauthorized)
   ```
   **Solutions:**
   - Verify the API server is running and accessible
   - Check if credentials are correct: `shahmirkhan9181@gmail.com` / `IntelliDelveIntern123@`
   - Ensure ngrok tunnel is active and URL is correct
   - Check if backend CORS is configured for your domain

2. **Network/CORS Issues**
   - Open browser console and look for CORS errors
   - Ensure backend allows requests from your frontend domain
   - Check if ngrok requires additional headers (we've added `ngrok-skip-browser-warning`)

3. **API Connection Failed**
   - Test the API directly: Visit the test page at `/api-test`
   - Check if the API server is running
   - Verify the API base URL in environment variables
   - Check network connectivity

### Manual Testing Steps

1. **Test API Connection**:
   ```javascript
   // In browser console
   window.testAPI.runAll()
   ```

2. **Test Individual Endpoints**:
   ```javascript
   // Test login only
   window.testAPI.testConnection()

   // Test blogs with token
   window.testAPI.testBlogs('your-token-here')
   ```

3. **Check Network Tab**:
   - Open browser dev tools → Network tab
   - Try logging in through `/admin`
   - Look for the POST request to `/api/auth/login/`
   - Check request headers, body, and response

### Debug Mode
- All API requests are logged to console in development
- Check browser console for detailed request/response information
- Error responses include full error details
