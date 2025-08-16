import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { cacheManager } from '../utils/cacheManager';

/**
 * Hook that automatically refreshes data when cache is invalidated
 * Eliminates the need for manual page refresh after CRUD operations
 */
export const useAutoRefresh = () => {
  const queryClient = useQueryClient();

  const handleCacheUpdate = useCallback((type: 'blogs' | 'case-studies' | 'all') => {
    console.log(`🔄 Auto-refresh triggered for: ${type}`);
    
    // Force immediate refetch of affected queries
    if (type === 'blogs' || type === 'all') {
      queryClient.refetchQueries({
        queryKey: ['blogs'],
        exact: false,
        type: 'all'
      });
    }
    
    if (type === 'case-studies' || type === 'all') {
      queryClient.refetchQueries({
        queryKey: ['case-studies'],
        exact: false,
        type: 'all'
      });
    }
  }, [queryClient]);

  useEffect(() => {
    // Register for cache update notifications
    const unsubscribe = cacheManager.onCacheUpdate(handleCacheUpdate);
    
    console.log('🔄 Auto-refresh hook registered');
    
    return () => {
      unsubscribe();
      console.log('🔄 Auto-refresh hook unregistered');
    };
  }, [handleCacheUpdate]);

  // Manual refresh function for components to use
  const manualRefresh = useCallback(async (type?: 'blogs' | 'case-studies' | 'all') => {
    console.log(`🔄 Manual refresh triggered for: ${type || 'all'}`);
    
    if (!type || type === 'blogs' || type === 'all') {
      await queryClient.refetchQueries({
        queryKey: ['blogs'],
        exact: false,
        type: 'all'
      });
    }
    
    if (!type || type === 'case-studies' || type === 'all') {
      await queryClient.refetchQueries({
        queryKey: ['case-studies'],
        exact: false,
        type: 'all'
      });
    }
  }, [queryClient]);

  return { manualRefresh };
};

/**
 * Hook specifically for blog data auto-refresh
 */
export const useBlogAutoRefresh = () => {
  const queryClient = useQueryClient();

  const handleBlogUpdate = useCallback(() => {
    console.log('🔄 Blog auto-refresh triggered');
    
    // Force refetch all blog queries
    queryClient.refetchQueries({
      queryKey: ['blogs'],
      exact: false,
      type: 'all'
    });
  }, [queryClient]);

  useEffect(() => {
    const unsubscribe = cacheManager.onCacheUpdate((type) => {
      if (type === 'blogs' || type === 'all') {
        handleBlogUpdate();
      }
    });
    
    return unsubscribe;
  }, [handleBlogUpdate]);

  return { refreshBlogs: handleBlogUpdate };
};

/**
 * Hook specifically for case study data auto-refresh
 */
export const useCaseStudyAutoRefresh = () => {
  const queryClient = useQueryClient();

  const handleCaseStudyUpdate = useCallback(() => {
    console.log('🔄 Case study auto-refresh triggered');
    
    // Force refetch all case study queries
    queryClient.refetchQueries({
      queryKey: ['case-studies'],
      exact: false,
      type: 'all'
    });
  }, [queryClient]);

  useEffect(() => {
    const unsubscribe = cacheManager.onCacheUpdate((type) => {
      if (type === 'case-studies' || type === 'all') {
        handleCaseStudyUpdate();
      }
    });
    
    return unsubscribe;
  }, [handleCaseStudyUpdate]);

  return { refreshCaseStudies: handleCaseStudyUpdate };
};

/**
 * Hook that provides real-time data synchronization
 * Automatically keeps data fresh across all components
 */
export const useRealTimeSync = () => {
  const queryClient = useQueryClient();

  const syncData = useCallback(async () => {
    console.log('🔄 Real-time sync triggered');
    
    // Refetch all queries to ensure data is fresh
    await queryClient.refetchQueries({
      type: 'all',
      stale: true // Only refetch stale queries for efficiency
    });
  }, [queryClient]);

  useEffect(() => {
    // Set up periodic sync every 30 seconds as backup
    const interval = setInterval(syncData, 30000);
    
    // Also sync on cache updates
    const unsubscribe = cacheManager.onCacheUpdate(() => {
      syncData();
    });
    
    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [syncData]);

  return { syncData };
};

export default useAutoRefresh;