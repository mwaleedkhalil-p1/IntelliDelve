# CORS Issue Solution

## Problem

The application was experiencing CORS (Cross-Origin Resource Sharing) issues when making API requests from the frontend to the backend. This was evident from the following error messages:

```
Access to XMLHttpRequest at 'https://informed-bluebird-right.ngrok-free.app/api/blogs/?status=published&limit=50' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Solution

The solution involved two key changes:

### 1. Added a Proxy in Vite Configuration

Updated `vite.config.ts` to include a proxy configuration that forwards API requests to the ngrok URL:

```typescript
server: {
  port: 3000,
  open: true,
  proxy: {
    '/api': {
      target: 'https://informed-bluebird-right.ngrok-free.app',
      changeOrigin: true,
      secure: false,
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    }
  },
},
```

This configuration:
- Routes all requests to `/api/*` through the proxy
- Changes the origin to match the target server
- Disables SSL certificate validation for the proxy
- Adds the ngrok-specific header to bypass warnings

### 2. Updated API Base URL

Modified `apiService.ts` to use a relative URL in development mode instead of the absolute ngrok URL:

```typescript
const getBaseURL = (): string => {
  // For development, use the local proxy to avoid CORS issues
  if (import.meta.env.DEV) {
    return '';
  }
  return import.meta.env.VITE_API_BASE_URL || 'https://api.intellidelve.com';
};
```

By returning an empty string, the API client will make requests to the current origin (e.g., `http://localhost:3001`), which will be intercepted by the Vite proxy and forwarded to the actual API server.

## How It Works

1. Frontend makes a request to `/api/blogs`
2. Vite proxy intercepts the request
3. Proxy forwards the request to `https://informed-bluebird-right.ngrok-free.app/api/blogs`
4. Proxy receives the response and returns it to the frontend

This approach avoids CORS issues because the browser is only making requests to the same origin (localhost).

## Alternative Solutions

If the proxy solution doesn't work, consider these alternatives:

1. Configure CORS on the backend server to allow requests from your frontend origin
2. Use a CORS browser extension for development (not recommended for production)
3. Set up a dedicated API gateway

## Testing

To verify the solution is working:

1. Start the development server with `npm run dev`
2. Navigate to the admin dashboard
3. Check browser console for API requests - they should no longer show CORS errors
4. Verify that data is loading correctly in the UI