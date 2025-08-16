import axios, { AxiosError, AxiosResponse } from 'axios';
import { cloudinaryService, CloudinaryImageData, ImageMetadata } from './cloudinaryService';
import { publicationFilterService } from './publicationFilterService';
import { loggingService } from './loggingService';

// Base URL configuration
const getBaseURL = (): string => {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_BASE_URL || 'https://informed-bluebird-right.ngrok-free.app';
  }
  return import.meta.env.VITE_API_BASE_URL || 'https://api.intellidelve.com';
};

const API_BASE_URL = getBaseURL();

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

/**
 * Validates that public API calls don't include unauthorized parameters
 * This prevents attempts to bypass publication status filtering
 */
const validatePublicApiParams = (params: URLSearchParams, endpoint: string): void => {
  const statusParam = params.get('status');
  if (statusParam && statusParam !== 'published') {
    console.warn(`🚨 API Security: Attempt to bypass publication filter on ${endpoint}`, {
      requestedStatus: statusParam,
      endpoint,
      timestamp: new Date().toISOString(),
    });
    // Remove the unauthorized status parameter
    params.delete('status');
    params.set('status', 'published');
  }
};

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

// Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: Record<string, string>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    data: T[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  featured_image?: string;
  tags: string[];
  category: string;
  images?: ImageData[];
  created_at: string;
  updated_at: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  status: 'draft' | 'published' | 'archived';
  featured_image?: string;
  tags: string[];
  images?: ImageData[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  metrics?: Array<{
    metric: string;
    label: string;
    improvement: string;
  }>;
  created_at: string;
  updated_at: string;
}

export interface ImageData {
  id: string;
  url: string;
  alt_text: string;
  caption: string;
  order: number;
  file_size: number;
  width: number;
  height: number;
  file_name: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  lastLogin?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface BlogFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
}

export interface CaseStudyFilters {
  page?: number;
  limit?: number;
  search?: string;
  industry?: string;
  status?: string;
}

export interface ImageUploadData {
  alt_text?: string;
  caption?: string;
  order?: number;
}

// Auth Service
export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response: AxiosResponse<ApiResponse<{ user: User; token: string }>> = await apiClient.post(
        '/api/auth/login/',
        credentials
      );
      
      if (response.data.success && response.data.data?.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async validateToken(): Promise<ApiResponse<{ user: User }>> {
    try {
      const token = localStorage.getItem('token');
      const demoUser = localStorage.getItem('demo-user');
      
      // Handle demo authentication
      if (token === 'demo-token' && demoUser) {
        const user = JSON.parse(demoUser);
        return {
          success: true,
          data: { user }
        };
      }
      
      // For real authentication, make API call
      const response: AxiosResponse<ApiResponse<{ user: User }>> = await apiClient.get('/api/auth/validate/');
      return response.data;
    } catch (error: any) {
      console.error('Token validation error:', error);
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('demo-user');
    window.location.href = '/admin';
  },
};

// Blog Service
export const blogService = {
  // PUBLIC METHODS - Use these for public-facing pages (enforces publication filtering)
  async getPublicBlogs(filters?: BlogFilters): Promise<PaginatedResponse<BlogPost>> {
    const requestId = loggingService.generateRequestId();
    const startTime = Date.now();
    
    try {
      // Detect and log any bypass attempts
      if (publicationFilterService.detectFilterBypass(filters || {})) {
        loggingService.logSecurityEvent(
          'Publication filter bypass attempt',
          { filters, endpoint: '/api/blogs/' },
          'high',
          requestId
        );
      }
      
      // Use publication filter service to ensure only published content
      const queryOptions = publicationFilterService.getPublicBlogsQuery(filters);
      const params = publicationFilterService.buildApiParams(queryOptions);
      
      // Additional security validation
      validatePublicApiParams(params, '/api/blogs/');

      const response: AxiosResponse<PaginatedResponse<BlogPost>> = await apiClient.get(
        `/api/blogs/?${params.toString()}`
      );

      const responseTime = Date.now() - startTime;
      const resultIds = response.data.results?.map(item => item.id) || [];

      // Log the API request
      loggingService.logApiRequest(
        '/api/blogs/',
        'GET',
        filters || {},
        'miss', // Assume miss for now, could be enhanced with actual cache detection
        'db',
        resultIds,
        {
          responseTime,
          statusCode: response.status,
          requestId,
        }
      );

      // Validate that API response only contains published content
      const validation = publicationFilterService.validateApiResponse(response.data.results || []);
      if (!validation.isValid) {
        loggingService.logSecurityEvent(
          'API returned non-published content',
          { 
            endpoint: '/api/blogs/',
            invalidCount: validation.invalidItems.length,
            invalidItems: validation.invalidItems.map(item => ({ id: item.id, status: item.status }))
          },
          'high',
          requestId
        );
        
        // Filter out any invalid items as a safety measure
        response.data.results = response.data.results?.filter(item => 
          publicationFilterService.isPubliclyVisible(item)
        ) || [];
      }

      return response.data;
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      loggingService.logApiRequest(
        '/api/blogs/',
        'GET',
        filters || {},
        'miss',
        'db',
        [],
        {
          responseTime,
          statusCode: error.response?.status,
          requestId,
        }
      );
      
      console.error('Get public blogs error:', error);
      throw error;
    }
  },

  async getPublicBlog(id: string): Promise<ApiResponse<BlogPost>> {
    const requestId = loggingService.generateRequestId();
    const startTime = Date.now();
    
    try {
      const response: AxiosResponse<ApiResponse<BlogPost>> = await apiClient.get(`/api/blogs/${id}/`);
      const responseTime = Date.now() - startTime;
      
      // Validate that the returned blog is publicly accessible
      if (response.data.data && !publicationFilterService.validatePublicAccess(response.data.data)) {
        loggingService.logSecurityEvent(
          'Attempt to access non-published blog',
          { 
            blogId: id,
            status: response.data.data.status,
            endpoint: `/api/blogs/${id}/`
          },
          'medium',
          requestId
        );
        
        // Log the blocked request
        loggingService.logApiRequest(
          `/api/blogs/${id}/`,
          'GET',
          {},
          'miss',
          'db',
          [],
          {
            responseTime,
            statusCode: 404, // We're returning 404
            requestId,
          }
        );
        
        // Return 404-like error for non-published content
        const error = new Error('Blog post not found or not available') as any;
        error.response = { status: 404 };
        throw error;
      }

      // Log successful request
      loggingService.logApiRequest(
        `/api/blogs/${id}/`,
        'GET',
        {},
        'miss',
        'db',
        [response.data.data?.id || ''],
        {
          responseTime,
          statusCode: response.status,
          requestId,
        }
      );

      return response.data;
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      // Log failed request (if not already logged above)
      if (!error.message?.includes('not found or not available')) {
        loggingService.logApiRequest(
          `/api/blogs/${id}/`,
          'GET',
          {},
          'miss',
          'db',
          [],
          {
            responseTime,
            statusCode: error.response?.status,
            requestId,
          }
        );
      }
      
      console.error('Get public blog error:', error);
      throw error;
    }
  },

  // ADMIN METHODS - Use these for admin/CMS interfaces (no publication filtering)
  async getBlogs(filters?: BlogFilters): Promise<PaginatedResponse<BlogPost>> {
    try {
      const params = new URLSearchParams();
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.search) params.append('search', filters.search);
      if (filters?.category) params.append('category', filters.category);
      if (filters?.status) params.append('status', filters.status);

      const response: AxiosResponse<PaginatedResponse<BlogPost>> = await apiClient.get(
        `/api/blogs/?${params.toString()}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Get blogs error:', error);
      throw error;
    }
  },

  async getBlog(id: string): Promise<ApiResponse<BlogPost>> {
    try {
      const response: AxiosResponse<ApiResponse<BlogPost>> = await apiClient.get(`/api/blogs/${id}/`);
      return response.data;
    } catch (error: any) {
      console.error('Get blog error:', error);
      throw error;
    }
  },

  async createBlog(blogData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'images'>): Promise<ApiResponse<BlogPost>> {
    try {
      const response: AxiosResponse<ApiResponse<BlogPost>> = await apiClient.post('/api/blogs/', blogData);
      return response.data;
    } catch (error: any) {
      console.error('Create blog error:', error);
      throw error;
    }
  },

  async updateBlog(id: string, blogData: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> {
    try {
      const response: AxiosResponse<ApiResponse<BlogPost>> = await apiClient.put(`/api/blogs/${id}/`, blogData);
      return response.data;
    } catch (error: any) {
      console.error('Update blog error:', error);
      throw error;
    }
  },

  async deleteBlog(id: string): Promise<ApiResponse<void>> {
    try {
      const response: AxiosResponse<ApiResponse<void>> = await apiClient.delete(`/api/blogs/${id}/`);
      return response.data;
    } catch (error: any) {
      console.error('Delete blog error:', error);
      throw error;
    }
  },
};

// Case Study Service
export const caseStudyService = {
  // PUBLIC METHODS - Use these for public-facing pages (enforces publication filtering)
  async getPublicCaseStudies(filters?: CaseStudyFilters): Promise<PaginatedResponse<CaseStudy>> {
    try {
      // Detect and log any bypass attempts
      publicationFilterService.detectFilterBypass(filters || {});
      
      // Use publication filter service to ensure only published content
      const queryOptions = publicationFilterService.getPublicCaseStudiesQuery(filters);
      const params = publicationFilterService.buildApiParams(queryOptions);
      
      // Additional security validation
      validatePublicApiParams(params, '/api/case-studies/');

      const response: AxiosResponse<PaginatedResponse<CaseStudy>> = await apiClient.get(
        `/api/case-studies/?${params.toString()}`
      );

      // Validate that API response only contains published content
      const validation = publicationFilterService.validateApiResponse(response.data.results || []);
      if (!validation.isValid) {
        // Filter out any invalid items as a safety measure
        response.data.results = response.data.results?.filter(item => 
          publicationFilterService.isPubliclyVisible(item)
        ) || [];
      }

      return response.data;
    } catch (error: any) {
      console.error('Get public case studies error:', error);
      throw error;
    }
  },

  async getPublicCaseStudy(id: string): Promise<ApiResponse<CaseStudy>> {
    try {
      const response: AxiosResponse<ApiResponse<CaseStudy>> = await apiClient.get(`/api/case-studies/${id}/`);
      
      // Validate that the returned case study is publicly accessible
      if (response.data.data && !publicationFilterService.validatePublicAccess(response.data.data)) {
        // Return 404-like error for non-published content
        const error = new Error('Case study not found or not available') as any;
        error.response = { status: 404 };
        throw error;
      }

      return response.data;
    } catch (error: any) {
      console.error('Get public case study error:', error);
      throw error;
    }
  },

  // ADMIN METHODS - Use these for admin/CMS interfaces (no publication filtering)
  async getCaseStudies(filters?: CaseStudyFilters): Promise<PaginatedResponse<CaseStudy>> {
    try {
      const params = new URLSearchParams();
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.search) params.append('search', filters.search);
      if (filters?.industry) params.append('industry', filters.industry);
      if (filters?.status) params.append('status', filters.status);

      const response: AxiosResponse<PaginatedResponse<CaseStudy>> = await apiClient.get(
        `/api/case-studies/?${params.toString()}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Get case studies error:', error);
      throw error;
    }
  },

  async getCaseStudy(id: string): Promise<ApiResponse<CaseStudy>> {
    try {
      const response: AxiosResponse<ApiResponse<CaseStudy>> = await apiClient.get(`/api/case-studies/${id}/`);
      return response.data;
    } catch (error: any) {
      console.error('Get case study error:', error);
      throw error;
    }
  },

  async createCaseStudy(caseStudyData: Omit<CaseStudy, 'id' | 'created_at' | 'updated_at' | 'images'>): Promise<ApiResponse<CaseStudy>> {
    try {
      const response: AxiosResponse<ApiResponse<CaseStudy>> = await apiClient.post('/api/case-studies/', caseStudyData);
      return response.data;
    } catch (error: any) {
      console.error('Create case study error:', error);
      throw error;
    }
  },

  async updateCaseStudy(id: string, caseStudyData: Partial<CaseStudy>): Promise<ApiResponse<CaseStudy>> {
    try {
      const response: AxiosResponse<ApiResponse<CaseStudy>> = await apiClient.put(`/api/case-studies/${id}/`, caseStudyData);
      return response.data;
    } catch (error: any) {
      console.error('Update case study error:', error);
      throw error;
    }
  },

  async deleteCaseStudy(id: string): Promise<ApiResponse<void>> {
    try {
      const response: AxiosResponse<ApiResponse<void>> = await apiClient.delete(`/api/case-studies/${id}/`);
      return response.data;
    } catch (error: any) {
      console.error('Delete case study error:', error);
      throw error;
    }
  },
};

// Image Service - Cloudinary Integration
export const imageService = {
  async uploadImage(
    contentType: 'blog' | 'casestudy',
    objectId: string,
    imageFile: File,
    metadata?: ImageUploadData
  ): Promise<ApiResponse<ImageData>> {
    try {
      const cloudinaryMetadata: ImageMetadata = {
        alt_text: metadata?.alt_text,
        caption: metadata?.caption,
        order: metadata?.order,
        content_type: contentType,
        object_id: objectId
      };
      
      const cloudinaryResult = await cloudinaryService.uploadImage(imageFile, cloudinaryMetadata);
      
      // Transform Cloudinary result to match existing ImageData interface
      const imageData: ImageData = {
        id: cloudinaryResult.id,
        url: cloudinaryResult.secure_url,
        alt_text: cloudinaryResult.alt_text || '',
        caption: cloudinaryResult.caption || '',
        order: cloudinaryResult.order || 0,
        file_name: cloudinaryResult.file_name,
        file_size: cloudinaryResult.file_size,
        width: cloudinaryResult.width,
        height: cloudinaryResult.height,
        created_at: cloudinaryResult.created_at,
        updated_at: cloudinaryResult.created_at
      };
      
      return {
        success: true,
        data: imageData,
        message: 'Image uploaded successfully to Cloudinary'
      };
    } catch (error: any) {
      console.error('Upload image error:', error);
      return {
        success: false,
        error: error.message || 'Failed to upload image to Cloudinary'
      };
    }
  },

  async bulkUploadImages(
    contentType: 'blog' | 'casestudy',
    objectId: string,
    imageFiles: File[]
  ): Promise<ApiResponse<ImageData[]>> {
    try {
      const cloudinaryMetadata: Omit<ImageMetadata, 'order'> = {
        content_type: contentType,
        object_id: objectId
      };
      
      const cloudinaryResults = await cloudinaryService.bulkUploadImages(imageFiles, cloudinaryMetadata);
      
      // Transform Cloudinary results to match existing ImageData interface
      const imageDataArray: ImageData[] = cloudinaryResults.map((result) => ({
        id: result.id,
        url: result.secure_url,
        alt_text: result.alt_text || '',
        caption: result.caption || '',
        order: result.order || 0,
        file_name: result.file_name,
        file_size: result.file_size,
        width: result.width,
        height: result.height,
        created_at: result.created_at,
        updated_at: result.created_at
      }));
      
      return {
        success: true,
        data: imageDataArray,
        message: `${imageDataArray.length} images uploaded successfully to Cloudinary`
      };
    } catch (error: any) {
      console.error('Bulk upload images error:', error);
      return {
        success: false,
        error: error.message || 'Failed to bulk upload images to Cloudinary'
      };
    }
  },

  async getImages(
    contentType: 'blog' | 'casestudy',
    objectId: string
  ): Promise<ApiResponse<ImageData[]>> {
    try {
      const cloudinaryResults = await cloudinaryService.getImagesForContent(contentType, objectId);
      
      // Transform Cloudinary results to match existing ImageData interface
      const imageDataArray: ImageData[] = cloudinaryResults.map((result) => ({
        id: result.id,
        url: result.secure_url,
        alt_text: result.alt_text || '',
        caption: result.caption || '',
        order: result.order || 0,
        file_name: result.file_name,
        file_size: result.file_size,
        width: result.width,
        height: result.height,
        created_at: result.created_at,
        updated_at: result.created_at
      }));
      
      return {
        success: true,
        data: imageDataArray,
        message: 'Images retrieved successfully from Cloudinary'
      };
    } catch (error: any) {
      console.error('Get images error:', error);
      return {
        success: false,
        error: error.message || 'Failed to retrieve images from Cloudinary'
      };
    }
  },

  async getImage(imageId: string): Promise<ApiResponse<ImageData>> {
    try {
      // For Cloudinary, we can construct the URL directly from the public ID
      const imageUrl = cloudinaryService.getImageUrl(imageId);
      
      // Since Cloudinary doesn't store metadata separately, we return basic info
      const imageData: ImageData = {
        id: imageId,
        url: imageUrl,
        alt_text: '',
        caption: '',
        order: 0,
        file_name: imageId,
        file_size: 0,
        width: 0,
        height: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return {
        success: true,
        data: imageData,
        message: 'Image retrieved successfully from Cloudinary'
      };
    } catch (error: any) {
      console.error('Get image error:', error);
      return {
        success: false,
        error: error.message || 'Failed to retrieve image from Cloudinary'
      };
    }
  },

  async updateImageMetadata(
    imageId: string,
    metadata: Partial<ImageUploadData>
  ): Promise<ApiResponse<ImageData>> {
    try {
      const cloudinaryMetadata: Partial<ImageMetadata> = {
        alt_text: metadata.alt_text,
        caption: metadata.caption,
        order: metadata.order
      };
      
      const cloudinaryResult = await cloudinaryService.updateImageMetadata(imageId, cloudinaryMetadata);
      
      // Transform Cloudinary result to match existing ImageData interface
      const imageData: ImageData = {
        id: cloudinaryResult.id,
        url: cloudinaryResult.secure_url,
        alt_text: cloudinaryResult.alt_text || '',
        caption: cloudinaryResult.caption || '',
        order: cloudinaryResult.order || 0,
        file_name: cloudinaryResult.file_name,
        file_size: cloudinaryResult.file_size,
        width: cloudinaryResult.width,
        height: cloudinaryResult.height,
        created_at: cloudinaryResult.created_at,
        updated_at: new Date().toISOString()
      };
      
      return {
        success: true,
        data: imageData,
        message: 'Image metadata updated successfully in Cloudinary'
      };
    } catch (error: any) {
      console.error('Update image metadata error:', error);
      return {
        success: false,
        error: error.message || 'Failed to update image metadata in Cloudinary'
      };
    }
  },

  async deleteImage(imageId: string): Promise<ApiResponse<void>> {
    try {
      const success = await cloudinaryService.deleteImage(imageId);
      
      if (success) {
        return {
          success: true,
          message: 'Image deleted successfully from Cloudinary'
        };
      } else {
        return {
          success: false,
          error: 'Failed to delete image from Cloudinary'
        };
      }
    } catch (error: any) {
      console.error('Delete image error:', error);
      return {
        success: false,
        error: error.message || 'Failed to delete image from Cloudinary'
      };
    }
  },
};

// Export the API client for custom requests
export { apiClient };
export default apiClient;

// Individual services are already exported above when declared

// Legacy compatibility - export combined service object
export const apiService = {
  ...authService,
  ...blogService,
  ...caseStudyService,
  ...imageService
};