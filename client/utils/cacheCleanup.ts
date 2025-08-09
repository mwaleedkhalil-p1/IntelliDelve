/**
 * Cache Cleanup Utility
 * 
 * This utility helps clean up phantom/stale entries from the cache
 * that may exist locally but not on the server.
 */

import { queryClient } from '../lib/queryClient';
import { blogService, caseStudyService } from '../services/apiService';
import { queryKeys } from '../hooks/useApi';
import { cacheManager } from './cacheManager';

class CacheCleanupManager {
  /**
   * Verify and clean up blog cache against server state
   * Removes any phantom entries that don't exist on the server
   */
  async cleanupBlogCache(): Promise<void> {
    console.log('🧹 Starting blog cache cleanup...');
    
    try {
      // Get all cached blog list data
      const cachedBlogQueries = queryClient.getQueriesData({ 
        queryKey: queryKeys.blogs.all 
      });
      
      if (cachedBlogQueries.length === 0) {
        console.log('🧹 No cached blog data found, skipping cleanup');
        return;
      }
      
      // Get fresh data from server
      const serverResponse = await blogService.getBlogs({ page: 1, limit: 100 });
      
      if (!serverResponse.success) {
        console.warn('🧹 Failed to fetch server data for cleanup:', serverResponse.error);
        return;
      }
      
      const serverBlogIds = new Set(
        serverResponse.data.data.map(blog => blog.uuid || blog.id)
      );
      
      console.log('🧹 Server has', serverBlogIds.size, 'blogs');
      
      let phantomCount = 0;
      
      // Check each cached query and remove phantom entries
      cachedBlogQueries.forEach(([queryKey, queryData]: [any, any]) => {
        if (!queryData?.success || !queryData?.data?.data) return;
        
        const originalCount = queryData.data.data.length;
        const cleanedData = queryData.data.data.filter((blog: any) => {
          const blogId = blog.uuid || blog.id;
          const existsOnServer = serverBlogIds.has(blogId);
          
          if (!existsOnServer) {
            console.log(`🧹 Removing phantom blog: ${blog.title} (${blogId})`);
            phantomCount++;
          }
          
          return existsOnServer;
        });
        
        if (cleanedData.length !== originalCount) {
          // Update the cache with cleaned data
          queryClient.setQueryData(queryKey, {
            ...queryData,
            data: {
              ...queryData.data,
              data: cleanedData,
              total: cleanedData.length
            }
          });
        }
      });
      
      console.log(`🧹 Blog cache cleanup complete. Removed ${phantomCount} phantom entries.`);
      
    } catch (error) {
      console.error('🧹 Blog cache cleanup failed:', error);
    }
  }
  
  /**
   * Verify and clean up case study cache against server state
   */
  async cleanupCaseStudyCache(): Promise<void> {
    console.log('🧹 Starting case study cache cleanup...');
    
    try {
      // Get all cached case study list data
      const cachedCaseStudyQueries = queryClient.getQueriesData({ 
        queryKey: queryKeys.caseStudies.all 
      });
      
      if (cachedCaseStudyQueries.length === 0) {
        console.log('🧹 No cached case study data found, skipping cleanup');
        return;
      }
      
      // Get fresh data from server
      const serverResponse = await caseStudyService.getCaseStudies({ page: 1, limit: 100 });
      
      if (!serverResponse.success) {
        console.warn('🧹 Failed to fetch server data for cleanup:', serverResponse.error);
        return;
      }
      
      const serverCaseStudyIds = new Set(
        serverResponse.data.data.map(cs => cs.uuid || cs.id)
      );
      
      console.log('🧹 Server has', serverCaseStudyIds.size, 'case studies');
      
      let phantomCount = 0;
      
      // Check each cached query and remove phantom entries
      cachedCaseStudyQueries.forEach(([queryKey, queryData]: [any, any]) => {
        if (!queryData?.success || !queryData?.data?.data) return;
        
        const originalCount = queryData.data.data.length;
        const cleanedData = queryData.data.data.filter((cs: any) => {
          const csId = cs.uuid || cs.id;
          const existsOnServer = serverCaseStudyIds.has(csId);
          
          if (!existsOnServer) {
            console.log(`🧹 Removing phantom case study: ${cs.title} (${csId})`);
            phantomCount++;
          }
          
          return existsOnServer;
        });
        
        if (cleanedData.length !== originalCount) {
          // Update the cache with cleaned data
          queryClient.setQueryData(queryKey, {
            ...queryData,
            data: {
              ...queryData.data,
              data: cleanedData,
              total: cleanedData.length
            }
          });
        }
      });
      
      console.log(`🧹 Case study cache cleanup complete. Removed ${phantomCount} phantom entries.`);
      
    } catch (error) {
      console.error('🧹 Case study cache cleanup failed:', error);
    }
  }
  
  /**
   * Clean up all cache types
   */
  async cleanupAllCaches(): Promise<void> {
    console.log('🧹 Starting comprehensive cache cleanup...');
    
    await Promise.all([
      this.cleanupBlogCache(),
      this.cleanupCaseStudyCache()
    ]);
    
    console.log('🧹 Comprehensive cache cleanup complete!');
  }
  
  /**
   * Schedule automatic cache cleanup
   */
  scheduleCleanup(intervalMinutes: number = 15): NodeJS.Timeout {
    console.log(`🧹 Scheduling cache cleanup every ${intervalMinutes} minutes`);
    
    return setInterval(() => {
      this.cleanupAllCaches();
    }, intervalMinutes * 60 * 1000);
  }
}

// Export singleton instance
export const cacheCleanupManager = new CacheCleanupManager();

// Auto-schedule cleanup in development mode
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Clean up immediately on load
  setTimeout(() => {
    cacheCleanupManager.cleanupAllCaches();
  }, 5000); // Wait 5 seconds for app to initialize
  
  // Schedule regular cleanup every 15 minutes
  cacheCleanupManager.scheduleCleanup(15);
}
