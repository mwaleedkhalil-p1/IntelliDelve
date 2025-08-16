import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { blogService, caseStudyService, BlogPost, CaseStudy, BlogFilters, CaseStudyFilters } from '../services/apiService';
import { cacheManager } from '../utils/cacheManager';

/**
 * Enhanced blog hooks with automatic refresh after mutations
 * Eliminates need for manual page refresh
 */

// Blog Hooks
export const useBlogsWithAutoRefresh = (filters?: BlogFilters) => {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['blogs', filters],
    queryFn: () => blogService.getPublicBlogs(filters),
    staleTime: 0, // Always consider data stale for immediate updates
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  // Auto-refresh when cache is invalidated
  React.useEffect(() => {
    const unsubscribe = cacheManager.onCacheUpdate((type) => {
      if (type === 'blogs' || type === 'all') {
        console.log('🔄 Auto-refreshing blogs due to cache invalidation');
        query.refetch();
      }
    });
    
    return unsubscribe;
  }, [query]);

  return query;
};

export const useBlogWithAutoRefresh = (id: string) => {
  const query = useQuery({
    queryKey: ['blogs', id],
    queryFn: () => blogService.getPublicBlog(id),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  // Auto-refresh when cache is invalidated
  React.useEffect(() => {
    const unsubscribe = cacheManager.onCacheUpdate((type) => {
      if (type === 'blogs' || type === 'all') {
        console.log(`🔄 Auto-refreshing blog ${id} due to cache invalidation`);
        query.refetch();
      }
    });
    
    return unsubscribe;
  }, [query, id]);

  return query;
};

export const useCreateBlogWithAutoRefresh = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: async (data) => {
      console.log('✅ Blog created, triggering auto-refresh');
      
      // Immediate cache invalidation and refetch
      await cacheManager.immediateInvalidation('blog', data.data?.id || '');
      
      // Force refetch all blog queries
      await queryClient.refetchQueries({
        queryKey: ['blogs'],
        exact: false,
        type: 'all'
      });
    },
    onError: (error) => {
      console.error('❌ Blog creation failed:', error);
    }
  });
};

export const useUpdateBlogWithAutoRefresh = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BlogPost> }) => 
      blogService.updateBlog(id, data),
    onSuccess: async (data, variables) => {
      console.log('✅ Blog updated, triggering auto-refresh');
      
      // Immediate cache invalidation and refetch
      await cacheManager.immediateInvalidation('blog', variables.id);
      
      // Force refetch all blog queries
      await queryClient.refetchQueries({
        queryKey: ['blogs'],
        exact: false,
        type: 'all'
      });
    },
    onError: (error) => {
      console.error('❌ Blog update failed:', error);
    }
  });
};

export const useDeleteBlogWithAutoRefresh = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: async (data, id) => {
      console.log('✅ Blog deleted, triggering auto-refresh');
      
      // Immediate cache invalidation and refetch
      await cacheManager.immediateInvalidation('blog', id);
      
      // Remove the specific blog from cache
      queryClient.removeQueries({
        queryKey: ['blogs', id],
        exact: true
      });
      
      // Force refetch all blog queries
      await queryClient.refetchQueries({
        queryKey: ['blogs'],
        exact: false,
        type: 'all'
      });
    },
    onError: (error) => {
      console.error('❌ Blog deletion failed:', error);
    }
  });
};

// Case Study Hooks
export const useCaseStudiesWithAutoRefresh = (filters?: CaseStudyFilters) => {
  const query = useQuery({
    queryKey: ['case-studies', filters],
    queryFn: () => caseStudyService.getPublicCaseStudies(filters),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  // Auto-refresh when cache is invalidated
  React.useEffect(() => {
    const unsubscribe = cacheManager.onCacheUpdate((type) => {
      if (type === 'case-studies' || type === 'all') {
        console.log('🔄 Auto-refreshing case studies due to cache invalidation');
        query.refetch();
      }
    });
    
    return unsubscribe;
  }, [query]);

  return query;
};

export const useCaseStudyWithAutoRefresh = (id: string) => {
  const query = useQuery({
    queryKey: ['case-studies', id],
    queryFn: () => caseStudyService.getPublicCaseStudy(id),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  // Auto-refresh when cache is invalidated
  React.useEffect(() => {
    const unsubscribe = cacheManager.onCacheUpdate((type) => {
      if (type === 'case-studies' || type === 'all') {
        console.log(`🔄 Auto-refreshing case study ${id} due to cache invalidation`);
        query.refetch();
      }
    });
    
    return unsubscribe;
  }, [query, id]);

  return query;
};

export const useCreateCaseStudyWithAutoRefresh = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: caseStudyService.createCaseStudy,
    onSuccess: async (data) => {
      console.log('✅ Case study created, triggering auto-refresh');
      
      // Immediate cache invalidation and refetch
      await cacheManager.immediateInvalidation('case-study', data.data?.id || '');
      
      // Force refetch all case study queries
      await queryClient.refetchQueries({
        queryKey: ['case-studies'],
        exact: false,
        type: 'all'
      });
    },
    onError: (error) => {
      console.error('❌ Case study creation failed:', error);
    }
  });
};

export const useUpdateCaseStudyWithAutoRefresh = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CaseStudy> }) => 
      caseStudyService.updateCaseStudy(id, data),
    onSuccess: async (data, variables) => {
      console.log('✅ Case study updated, triggering auto-refresh');
      
      // Immediate cache invalidation and refetch
      await cacheManager.immediateInvalidation('case-study', variables.id);
      
      // Force refetch all case study queries
      await queryClient.refetchQueries({
        queryKey: ['case-studies'],
        exact: false,
        type: 'all'
      });
    },
    onError: (error) => {
      console.error('❌ Case study update failed:', error);
    }
  });
};

export const useDeleteCaseStudyWithAutoRefresh = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: caseStudyService.deleteCaseStudy,
    onSuccess: async (data, id) => {
      console.log('✅ Case study deleted, triggering auto-refresh');
      
      // Immediate cache invalidation and refetch
      await cacheManager.immediateInvalidation('case-study', id);
      
      // Remove the specific case study from cache
      queryClient.removeQueries({
        queryKey: ['case-studies', id],
        exact: true
      });
      
      // Force refetch all case study queries
      await queryClient.refetchQueries({
        queryKey: ['case-studies'],
        exact: false,
        type: 'all'
      });
    },
    onError: (error) => {
      console.error('❌ Case study deletion failed:', error);
    }
  });
};