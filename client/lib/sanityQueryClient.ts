import { QueryClient } from '@tanstack/react-query';

// Sanity-specific query client configuration
export const createSanityQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Sanity content is relatively stable, so we can cache for longer
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
        
        // Retry configuration for Sanity API calls
        retry: (failureCount, error: any) => {
          // Don't retry on 4xx errors (client errors)
          if (error?.statusCode >= 400 && error?.statusCode < 500) {
            return false;
          }
          
          // Retry up to 3 times for other errors
          return failureCount < 3;
        },
        
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        
        // Enable background refetching for fresh content
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        
        // Don't refetch on mount if data is fresh
        refetchOnMount: 'always',
        
        // Network mode configuration
        networkMode: 'online',
      },
      
      mutations: {
        // Mutations are less common with Sanity (read-only for frontend)
        retry: 1,
        networkMode: 'online',
      },
    },
  });
};

// Cache invalidation patterns for Sanity content
export const sanityCachePatterns = {
  // Invalidate all blog-related queries
  invalidateBlogs: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ 
      queryKey: ['sanity', 'blogs'],
      exact: false 
    });
  },
  
  // Invalidate all case study-related queries
  invalidateCaseStudies: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ 
      queryKey: ['sanity', 'caseStudies'],
      exact: false 
    });
  },
  
  // Invalidate all Sanity content
  invalidateAll: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ 
      queryKey: ['sanity'],
      exact: false 
    });
  },
  
  // Invalidate search results
  invalidateSearch: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ 
      queryKey: ['sanity', 'search'],
      exact: false 
    });
  },
  
  // Prefetch related content
  prefetchRelatedContent: async (queryClient: QueryClient, contentType: 'blog' | 'caseStudy', id: string) => {
    // This would prefetch related content based on the current item
    // Implementation depends on your specific needs
  },
};

// Cache optimization utilities
export const sanityCacheUtils = {
  // Remove old cache entries to free up memory
  cleanupOldEntries: (queryClient: QueryClient, maxAge: number = 60 * 60 * 1000) => {
    const cache = queryClient.getQueryCache();
    const now = Date.now();
    
    cache.getAll().forEach(query => {
      if (query.state.dataUpdatedAt && (now - query.state.dataUpdatedAt) > maxAge) {
        queryClient.removeQueries({ queryKey: query.queryKey });
      }
    });
  },
  
  // Preload critical content
  preloadCriticalContent: async (queryClient: QueryClient) => {
    // Preload homepage content, featured posts, etc.
    // This could be called on app initialization
  },
  
  // Get cache statistics
  getCacheStats: (queryClient: QueryClient) => {
    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();
    
    return {
      totalQueries: queries.length,
      sanityQueries: queries.filter(q => q.queryKey[0] === 'sanity').length,
      staleQueries: queries.filter(q => q.isStale()).length,
      errorQueries: queries.filter(q => q.state.status === 'error').length,
      loadingQueries: queries.filter(q => q.state.status === 'pending').length,
    };
  },
};

// Background sync configuration
export const backgroundSyncConfig = {
  // Sync interval for background updates
  syncInterval: 10 * 60 * 1000, // 10 minutes
  
  // Content types to sync in background
  syncContentTypes: ['blogs', 'caseStudies', 'categories', 'tags'],
  
  // Maximum number of items to sync per type
  maxItemsPerSync: 50,
  
  // Enable/disable background sync based on network conditions
  enableOnSlowNetwork: false,
  enableOnMeteredConnection: false,
};

// Performance monitoring for cache
export const cachePerformanceMonitor = {
  // Track cache hit rates
  trackCacheHit: (queryKey: string[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎯 Cache hit:', queryKey.join('.'));
    }
  },
  
  // Track cache misses
  trackCacheMiss: (queryKey: string[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('❌ Cache miss:', queryKey.join('.'));
    }
  },
  
  // Track query performance
  trackQueryPerformance: (queryKey: string[], duration: number) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`⏱️ Query performance: ${queryKey.join('.')} took ${duration}ms`);
    }
  },
};

export default createSanityQueryClient;