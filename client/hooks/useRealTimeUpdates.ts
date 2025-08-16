import { useEffect, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { realTimeUpdateService, UpdateEvent } from '../services/realTimeUpdateService';

/**
 * Hook that provides real-time updates for content changes
 * Automatically refreshes data when content is created, updated, or deleted
 */
export const useRealTimeUpdates = () => {
  const queryClient = useQueryClient();
  const [lastUpdate, setLastUpdate] = useState<UpdateEvent | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleUpdate = useCallback(async (event: UpdateEvent) => {
    console.log('🔄 Real-time update received:', event);
    setLastUpdate(event);

    // Determine which queries to refetch based on the update
    const queryKey = event.contentType === 'blog' ? 'blogs' : 'case-studies';

    try {
      if (event.contentId === 'all' || event.contentId === 'bulk-update') {
        // Refresh all queries for this content type
        await queryClient.refetchQueries({
          queryKey: [queryKey],
          exact: false,
          type: 'all'
        });
      } else {
        // Refresh specific content and related queries
        await Promise.all([
          // Refresh the specific item
          queryClient.refetchQueries({
            queryKey: [queryKey, event.contentId],
            exact: false,
            type: 'all'
          }),
          // Refresh list queries that might contain this item
          queryClient.refetchQueries({
            queryKey: [queryKey],
            exact: false,
            type: 'all'
          })
        ]);
      }

      console.log(`✅ Auto-refresh completed for ${event.contentType} ${event.contentId}`);
    } catch (error) {
      console.error('❌ Auto-refresh failed:', error);
    }
  }, [queryClient]);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = realTimeUpdateService.subscribe(handleUpdate);
    
    // Check connection status
    const status = realTimeUpdateService.getConnectionStatus();
    setIsConnected(status.connected);
    
    console.log('🔄 Real-time updates hook registered');
    
    return () => {
      unsubscribe();
      console.log('🔄 Real-time updates hook unregistered');
    };
  }, [handleUpdate]);

  const triggerRefresh = useCallback(async (contentType: 'blog' | 'case-study', contentId: string, action: UpdateEvent['action']) => {
    await realTimeUpdateService.triggerContentRefresh(contentType, contentId, action);
  }, []);

  const forceRefreshAll = useCallback(async (contentType?: 'blog' | 'case-study') => {
    await realTimeUpdateService.forceRefreshAll(contentType);
  }, []);

  return {
    lastUpdate,
    isConnected,
    triggerRefresh,
    forceRefreshAll,
  };
};

/**
 * Hook specifically for blog real-time updates
 */
export const useBlogRealTimeUpdates = () => {
  const queryClient = useQueryClient();
  const [lastBlogUpdate, setLastBlogUpdate] = useState<UpdateEvent | null>(null);

  const handleBlogUpdate = useCallback(async (event: UpdateEvent) => {
    if (event.contentType !== 'blog') return;
    
    console.log('🔄 Blog real-time update received:', event);
    setLastBlogUpdate(event);

    try {
      // Always refresh all blog queries for immediate updates
      await queryClient.refetchQueries({
        queryKey: ['blogs'],
        exact: false,
        type: 'all'
      });

      console.log(`✅ Blog auto-refresh completed for ${event.contentId}`);
    } catch (error) {
      console.error('❌ Blog auto-refresh failed:', error);
    }
  }, [queryClient]);

  useEffect(() => {
    const unsubscribe = realTimeUpdateService.subscribe(handleBlogUpdate);
    return unsubscribe;
  }, [handleBlogUpdate]);

  return { lastBlogUpdate };
};

/**
 * Hook specifically for case study real-time updates
 */
export const useCaseStudyRealTimeUpdates = () => {
  const queryClient = useQueryClient();
  const [lastCaseStudyUpdate, setLastCaseStudyUpdate] = useState<UpdateEvent | null>(null);

  const handleCaseStudyUpdate = useCallback(async (event: UpdateEvent) => {
    if (event.contentType !== 'case-study') return;
    
    console.log('🔄 Case study real-time update received:', event);
    setLastCaseStudyUpdate(event);

    try {
      // Always refresh all case study queries for immediate updates
      await queryClient.refetchQueries({
        queryKey: ['case-studies'],
        exact: false,
        type: 'all'
      });

      console.log(`✅ Case study auto-refresh completed for ${event.contentId}`);
    } catch (error) {
      console.error('❌ Case study auto-refresh failed:', error);
    }
  }, [queryClient]);

  useEffect(() => {
    const unsubscribe = realTimeUpdateService.subscribe(handleCaseStudyUpdate);
    return unsubscribe;
  }, [handleCaseStudyUpdate]);

  return { lastCaseStudyUpdate };
};

/**
 * Hook that provides a manual refresh button functionality
 */
export const useManualRefresh = () => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshAll = useCallback(async () => {
    setIsRefreshing(true);
    
    try {
      console.log('🔄 Manual refresh triggered for all content');
      
      // Force refresh all queries
      await queryClient.refetchQueries({
        type: 'all'
      });
      
      // Also trigger real-time service refresh
      await realTimeUpdateService.forceRefreshAll();
      
      console.log('✅ Manual refresh completed');
    } catch (error) {
      console.error('❌ Manual refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [queryClient]);

  const refreshBlogs = useCallback(async () => {
    setIsRefreshing(true);
    
    try {
      console.log('🔄 Manual blog refresh triggered');
      
      await queryClient.refetchQueries({
        queryKey: ['blogs'],
        exact: false,
        type: 'all'
      });
      
      await realTimeUpdateService.forceRefreshAll('blog');
      
      console.log('✅ Manual blog refresh completed');
    } catch (error) {
      console.error('❌ Manual blog refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [queryClient]);

  const refreshCaseStudies = useCallback(async () => {
    setIsRefreshing(true);
    
    try {
      console.log('🔄 Manual case study refresh triggered');
      
      await queryClient.refetchQueries({
        queryKey: ['case-studies'],
        exact: false,
        type: 'all'
      });
      
      await realTimeUpdateService.forceRefreshAll('case-study');
      
      console.log('✅ Manual case study refresh completed');
    } catch (error) {
      console.error('❌ Manual case study refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [queryClient]);

  return {
    isRefreshing,
    refreshAll,
    refreshBlogs,
    refreshCaseStudies,
  };
};

export default useRealTimeUpdates;