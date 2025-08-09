import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from './use-toast';
import {
  blogService,
  caseStudyService,
  authService,
  imageService,
  BlogPost,
  CaseStudy,
  BlogFilters,
  CaseStudyFilters,
  LoginCredentials,
  ImageData,
  ImageUploadData,
  ApiResponse,
  PaginatedResponse,
} from '../services/apiService';

// Query Keys
export const queryKeys = {
  auth: {
    user: ['auth', 'user'] as const,
  },
  blogs: {
    all: ['blogs'] as const,
    list: (filters?: BlogFilters) => ['blogs', 'list', filters] as const,
    detail: (id: string) => ['blogs', 'detail', id] as const,
    images: (id: string) => ['blogs', 'images', id] as const,
  },
  caseStudies: {
    all: ['caseStudies'] as const,
    list: (filters?: CaseStudyFilters) => ['caseStudies', 'list', filters] as const,
    detail: (id: string) => ['caseStudies', 'detail', id] as const,
    images: (id: string) => ['caseStudies', 'images', id] as const,
  },
  images: {
    detail: (id: string) => ['images', 'detail', id] as const,
  },
};

// Auth Hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      if (data.success) {
        // Set the user data in the cache
        queryClient.setQueryData(queryKeys.auth.user, data);
        // Invalidate and refetch the auth query to trigger re-renders
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.user });
        toast({ title: 'Success', description: data.message || 'Login successful' });
      } else {
        toast({ title: 'Error', description: data.error || 'Login failed', variant: 'destructive' });
      }
    },
    onError: (error: any) => {
      console.error('Login error:', error);
      toast({ title: 'Error', description: error.response?.data?.error || 'Login failed', variant: 'destructive' });
    },
  });
};

export const useValidateToken = () => {
  return useQuery({
    queryKey: queryKeys.auth.user,
    queryFn: () => authService.validateToken(),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: !!localStorage.getItem('token'),
  });
};

export const useAuth = () => {
  const { data, isLoading, error } = useValidateToken();
  
  return {
    user: data?.data?.user || null,
    isAuthenticated: !!data?.success && !!data?.data?.user,
    isLoading,
    error: error?.message || null,
  };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
      localStorage.removeItem('token');
      toast({ title: 'Success', description: 'Logged out successfully' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.response?.data?.message || 'Logout failed', variant: 'destructive' });
    },
  });
};

// Blog Hooks
export const useBlogs = (filters?: BlogFilters) => {
  return useQuery({
    queryKey: queryKeys.blogs.list(filters),
    queryFn: () => blogService.getBlogs(filters),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });
};

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: queryKeys.blogs.detail(id),
    queryFn: () => blogService.getBlog(id),
    enabled: !!id,
    staleTime: 0, // Always fetch fresh data for real-time updates
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (blogData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'images'>) => 
      blogService.createBlog(blogData),
    onSuccess: async (data) => {
      // Invalidate all blog-related queries for real-time updates
      await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all });
      await queryClient.invalidateQueries({ queryKey: ['blogs'] }); // Invalidate all blog queries
      
      // Force immediate refetch
      queryClient.refetchQueries({ queryKey: queryKeys.blogs.all });
      queryClient.refetchQueries({ queryKey: ['blogs'] });
      
      if (data.success) {
        toast({ title: 'Success', description: data.message || 'Blog created successfully' });
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to create blog', variant: 'destructive' });
      }
    },
    onError: (error: any) => {
      console.error('Create blog error:', error);
      toast({ title: 'Error', description: error.response?.data?.error || 'Failed to create blog', variant: 'destructive' });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, blogData }: { id: string; blogData: Partial<BlogPost> }) => 
      blogService.updateBlog(id, blogData),
    onSuccess: async (data, variables) => {
      // Invalidate all blog-related queries for real-time updates
      await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all });
      await queryClient.invalidateQueries({ queryKey: ['blogs'] }); // Invalidate all blog queries
      await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.detail(variables.id) });
      
      // Force immediate refetch
      queryClient.refetchQueries({ queryKey: queryKeys.blogs.all });
      queryClient.refetchQueries({ queryKey: ['blogs'] });
      queryClient.refetchQueries({ queryKey: queryKeys.blogs.detail(variables.id) });
      
      if (data.success) {
        toast({ title: 'Success', description: data.message || 'Blog updated successfully' });
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to update blog', variant: 'destructive' });
      }
    },
    onError: (error: any) => {
      console.error('Update blog error:', error);
      toast({ title: 'Error', description: error.response?.data?.error || 'Failed to update blog', variant: 'destructive' });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => blogService.deleteBlog(id),
    onSuccess: async (data) => {
      // Invalidate all blog-related queries for real-time updates
      await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all });
      await queryClient.invalidateQueries({ queryKey: ['blogs'] }); // Invalidate all blog queries
      
      // Force immediate refetch
      queryClient.refetchQueries({ queryKey: queryKeys.blogs.all });
      queryClient.refetchQueries({ queryKey: ['blogs'] });
      
      if (data.success) {
        toast({ title: 'Success', description: data.message || 'Blog deleted successfully' });
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to delete blog', variant: 'destructive' });
      }
    },
    onError: (error: any) => {
      console.error('Delete blog error:', error);
      toast({ title: 'Error', description: error.response?.data?.error || 'Failed to delete blog', variant: 'destructive' });
    },
  });
};

// Case Study Hooks
export const useCaseStudies = (filters?: CaseStudyFilters) => {
  return useQuery({
    queryKey: queryKeys.caseStudies.list(filters),
    queryFn: () => caseStudyService.getCaseStudies(filters),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });
};

export const useCaseStudy = (id: string) => {
  return useQuery({
    queryKey: queryKeys.caseStudies.detail(id),
    queryFn: () => caseStudyService.getCaseStudy(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateCaseStudy = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (caseStudyData: Omit<CaseStudy, 'id' | 'created_at' | 'updated_at' | 'images'>) => 
      caseStudyService.createCaseStudy(caseStudyData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.all });
      if (data.success) {
        toast({ title: 'Success', description: data.message || 'Case study created successfully' });
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to create case study', variant: 'destructive' });
      }
    },
    onError: (error: any) => {
      console.error('Create case study error:', error);
      toast({ title: 'Error', description: error.response?.data?.error || 'Failed to create case study', variant: 'destructive' });
    },
  });
};

export const useUpdateCaseStudy = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, caseStudyData }: { id: string; caseStudyData: Partial<CaseStudy> }) => 
      caseStudyService.updateCaseStudy(id, caseStudyData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.detail(variables.id) });
      if (data.success) {
        toast({ title: 'Success', description: data.message || 'Case study updated successfully' });
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to update case study', variant: 'destructive' });
      }
    },
    onError: (error: any) => {
      console.error('Update case study error:', error);
      toast({ title: 'Error', description: error.response?.data?.error || 'Failed to update case study', variant: 'destructive' });
    },
  });
};

export const useDeleteCaseStudy = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => caseStudyService.deleteCaseStudy(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.all });
      if (data.success) {
        toast({ title: 'Success', description: data.message || 'Case study deleted successfully' });
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to delete case study', variant: 'destructive' });
      }
    },
    onError: (error: any) => {
      console.error('Delete case study error:', error);
      toast({ title: 'Error', description: error.response?.data?.error || 'Failed to delete case study', variant: 'destructive' });
    },
  });
};

// Image Hooks
export const useUploadImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({
      contentType,
      objectId,
      imageFile,
      metadata,
    }: {
      contentType: 'blog' | 'casestudy';
      objectId: string;
      imageFile: File;
      metadata?: ImageUploadData;
    }) => imageService.uploadImage(contentType, objectId, imageFile, metadata),
    onSuccess: async (data, variables) => {
      // Invalidate and refetch images for the specific content
      if (variables.contentType === 'blog') {
        await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.images(variables.objectId) });
        await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.detail(variables.objectId) });
        await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all });
        await queryClient.invalidateQueries({ queryKey: ['blogs'] }); // Invalidate all blog queries
        
        // Force immediate refetch
        queryClient.refetchQueries({ queryKey: queryKeys.blogs.images(variables.objectId) });
        queryClient.refetchQueries({ queryKey: queryKeys.blogs.detail(variables.objectId) });
      } else {
        await queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.images(variables.objectId) });
        await queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.detail(variables.objectId) });
        await queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.all });
        await queryClient.invalidateQueries({ queryKey: ['caseStudies'] }); // Invalidate all case study queries
        
        // Force immediate refetch
        queryClient.refetchQueries({ queryKey: queryKeys.caseStudies.images(variables.objectId) });
        queryClient.refetchQueries({ queryKey: queryKeys.caseStudies.detail(variables.objectId) });
      }
      
      if (data.success) {
        toast({ title: 'Success', description: data.message || 'Image uploaded successfully' });
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to upload image', variant: 'destructive' });
      }
    },
    onError: (error: any) => {
      console.error('Upload image error:', error);
      toast({ title: 'Error', description: error.response?.data?.error || 'Failed to upload image', variant: 'destructive' });
    },
  });
};

export const useBulkUploadImages = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({
      contentType,
      objectId,
      imageFiles,
    }: {
      contentType: 'blog' | 'casestudy';
      objectId: string;
      imageFiles: File[];
    }) => imageService.bulkUploadImages(contentType, objectId, imageFiles),
    onSuccess: async (data, variables) => {
      // Invalidate and refetch images for the specific content
      if (variables.contentType === 'blog') {
        await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.images(variables.objectId) });
        await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.detail(variables.objectId) });
        await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all });
        await queryClient.invalidateQueries({ queryKey: ['blogs'] }); // Invalidate all blog queries
        
        // Force immediate refetch
        queryClient.refetchQueries({ queryKey: queryKeys.blogs.images(variables.objectId) });
        queryClient.refetchQueries({ queryKey: queryKeys.blogs.detail(variables.objectId) });
      } else {
        await queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.images(variables.objectId) });
        await queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.detail(variables.objectId) });
        await queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.all });
        await queryClient.invalidateQueries({ queryKey: ['caseStudies'] }); // Invalidate all case study queries
        
        // Force immediate refetch
        queryClient.refetchQueries({ queryKey: queryKeys.caseStudies.images(variables.objectId) });
        queryClient.refetchQueries({ queryKey: queryKeys.caseStudies.detail(variables.objectId) });
      }
      
      if (data.success) {
        const count = data.data?.length || 0;
        toast({ title: 'Success', description: data.message || `${count} images uploaded successfully` });
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to upload images', variant: 'destructive' });
      }
    },
    onError: (error: any) => {
      console.error('Bulk upload images error:', error);
      toast({ title: 'Error', description: error.response?.data?.error || 'Failed to upload images', variant: 'destructive' });
    },
  });
};

export const useImages = (contentType: 'blog' | 'casestudy', objectId: string) => {
  return useQuery({
    queryKey: contentType === 'blog' 
      ? queryKeys.blogs.images(objectId)
      : queryKeys.caseStudies.images(objectId),
    queryFn: () => imageService.getImages(contentType, objectId),
    enabled: !!objectId,
    staleTime: 0, // Always fetch fresh data for real-time updates
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

// Alias for useImages with additional enabled parameter
export const useImagesForContent = (contentType: 'blog' | 'casestudy', objectId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: contentType === 'blog' 
      ? queryKeys.blogs.images(objectId)
      : queryKeys.caseStudies.images(objectId),
    queryFn: () => imageService.getImages(contentType, objectId),
    enabled: !!objectId && enabled,
    staleTime: 0, // Always fetch fresh data for real-time updates
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useImage = (imageId: string) => {
  return useQuery({
    queryKey: queryKeys.images.detail(imageId),
    queryFn: () => imageService.getImage(imageId),
    enabled: !!imageId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateImageMetadata = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ imageId, metadata }: { imageId: string; metadata: Partial<ImageUploadData> }) => 
      imageService.updateImageMetadata(imageId, metadata),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.images.detail(variables.imageId) });
      // Also invalidate parent content queries
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.all });
      
      if (data.success) {
        toast({ title: 'Success', description: data.message || 'Image updated successfully' });
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to update image', variant: 'destructive' });
      }
    },
    onError: (error: any) => {
      console.error('Update image error:', error);
      toast({ title: 'Error', description: error.response?.data?.error || 'Failed to update image', variant: 'destructive' });
    },
  });
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (imageId: string) => imageService.deleteImage(imageId),
    onSuccess: (data) => {
      // Invalidate all image-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.caseStudies.all });
      
      if (data.success) {
        toast({ title: 'Success', description: data.message || 'Image deleted successfully' });
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to delete image', variant: 'destructive' });
      }
    },
    onError: (error: any) => {
      console.error('Delete image error:', error);
      toast({ title: 'Error', description: error.response?.data?.error || 'Failed to delete image', variant: 'destructive' });
    },
  });
};