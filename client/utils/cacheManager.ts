import { QueryClient } from '@tanstack/react-query';
import { loggingService } from '../services/loggingService';
import type { WebhookPayload } from '../services/webhookHandlerService';

// Global cache manager for real-time cross-component cache invalidation
class CacheManager {
  private queryClient: QueryClient | null = null;
  private eventListeners: Set<(type: 'blogs' | 'case-studies' | 'all') => void> = new Set();
  private broadcastChannel: BroadcastChannel | null = null;

  constructor() {
    // Initialize BroadcastChannel for cross-tab communication
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.broadcastChannel = new BroadcastChannel('intellidelve-cache-updates');
      this.broadcastChannel.onmessage = this.handleBroadcastMessage.bind(this);
    }
  }

  setQueryClient(queryClient: QueryClient) {
    this.queryClient = queryClient;
  }

  // Add event listener for cache updates
  onCacheUpdate(callback: (type: 'blogs' | 'case-studies' | 'all') => void) {
    this.eventListeners.add(callback);
    return () => this.eventListeners.delete(callback);
  }

  // Handle broadcast messages from other tabs/components
  private handleBroadcastMessage(event: MessageEvent) {
    const { type, action } = event.data;
    console.log(`📡 BroadcastChannel: Received ${action} for ${type}`);
    
    switch (action) {
      case 'invalidate-blogs':
        this.forceBlogInvalidation();
        break;
      case 'invalidate-case-studies':
        this.forceCaseStudyInvalidation();
        break;
      case 'invalidate-all':
        this.forceAllInvalidation();
        break;
    }
  }

  // Broadcast cache invalidation to other tabs/components
  private broadcast(type: 'blogs' | 'case-studies' | 'all', action: string) {
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({ type, action });
    }
  }

  // Notify all listeners about cache updates
  private notifyListeners(type: 'blogs' | 'case-studies' | 'all') {
    this.eventListeners.forEach(callback => callback(type));
  }

  // Force blog cache invalidation without broadcast (internal use)
  private async forceBlogInvalidation() {
    if (!this.queryClient) return;
    
    console.log('🔥 CacheManager: Force invalidating blog caches');
    
    // Invalidate and immediately refetch all blog queries
    await Promise.all([
      // Mark queries as stale
      this.queryClient.invalidateQueries({ 
        queryKey: ['blogs'], 
        exact: false,
        refetchType: 'all' // Changed from 'active' to 'all' for more aggressive refetching
      }),
      // Force immediate refetch of all blog queries
      this.queryClient.refetchQueries({
        queryKey: ['blogs'],
        exact: false,
        type: 'all' // Refetch all queries, not just active ones
      })
    ]);
    
    this.notifyListeners('blogs');
  }

  // Force case study cache invalidation without broadcast (internal use)
  private async forceCaseStudyInvalidation() {
    if (!this.queryClient) return;
    
    console.log('🔥 CacheManager: Force invalidating case study caches');
    
    // Invalidate and immediately refetch all case study queries
    await Promise.all([
      // Mark queries as stale
      this.queryClient.invalidateQueries({ 
        queryKey: ['case-studies'], 
        exact: false,
        refetchType: 'all' // Changed from 'active' to 'all' for more aggressive refetching
      }),
      // Force immediate refetch of all case study queries
      this.queryClient.refetchQueries({
        queryKey: ['case-studies'],
        exact: false,
        type: 'all' // Refetch all queries, not just active ones
      })
    ]);
    
    this.notifyListeners('case-studies');
  }

  // Force all cache invalidation without broadcast (internal use)
  private async forceAllInvalidation() {
    if (!this.queryClient) return;
    
    await Promise.all([
      this.forceBlogInvalidation(),
      this.forceCaseStudyInvalidation()
    ]);
    
    this.notifyListeners('all');
  }

  // Public method: Force invalidate all blog-related caches across the entire app
  async invalidateBlogs() {
    if (!this.queryClient) return;
    
    console.log('🔥 CacheManager: AGGRESSIVE blog cache invalidation across ALL tabs/components');
    
    // Broadcast to other tabs first
    this.broadcast('blogs', 'invalidate-blogs');
    
    // Then invalidate locally
    await this.forceBlogInvalidation();
  }

  // Public method: Force invalidate all case study caches across the entire app
  async invalidateCaseStudies() {
    if (!this.queryClient) return;
    
    console.log('🔥 CacheManager: AGGRESSIVE case study cache invalidation across ALL tabs/components');
    
    // Broadcast to other tabs first
    this.broadcast('case-studies', 'invalidate-case-studies');
    
    // Then invalidate locally
    await this.forceCaseStudyInvalidation();
  }

  // Public method: Force refresh all data across the app
  async invalidateAll() {
    if (!this.queryClient) return;
    
    console.log('🔥 CacheManager: AGGRESSIVE invalidation of ALL caches across ALL tabs/components');
    
    // Broadcast to other tabs first
    this.broadcast('all', 'invalidate-all');
    
    // Then invalidate locally
    await this.forceAllInvalidation();
  }

  // Nuclear option: Clear everything and force complete refetch
  async nuclearReset() {
    if (!this.queryClient) return;
    
    console.log('💥 CacheManager: NUCLEAR RESET - Clearing ALL caches and forcing complete refetch');
    
    // Clear everything
    this.queryClient.clear();
    
    // Wait a tick for the clear to propagate
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // Force refetch all active queries
    await this.queryClient.refetchQueries({ type: 'all' });
    
    // Broadcast reset to other tabs
    this.broadcast('all', 'nuclear-reset');
    
    this.notifyListeners('all');
  }

  // Optimistic update helper for immediate UI updates
  optimisticallyUpdateBlogs(updater: (oldData: any) => any) {
    if (!this.queryClient) return;
    
    console.log('⚡ CacheManager: Optimistic blog update across all queries');
    
    // Update all blog queries immediately
    this.queryClient.setQueriesData({ queryKey: ['blogs'], exact: false }, updater);
    
    // Notify listeners
    this.notifyListeners('blogs');
  }

  optimisticallyUpdateCaseStudies(updater: (oldData: any) => any) {
    if (!this.queryClient) return;
    
    console.log('⚡ CacheManager: Optimistic case study update across all queries');
    
    // Update all case study queries immediately
    this.queryClient.setQueriesData({ queryKey: ['case-studies'], exact: false }, updater);
    
    // Notify listeners
    this.notifyListeners('case-studies');
  }

  // WEBHOOK-TRIGGERED INVALIDATION METHODS

  /**
   * Invalidate cache based on webhook payload
   * This is the main entry point for webhook-triggered cache invalidation
   * Optimized for sub-second propagation
   */
  async invalidateFromWebhook(payload: WebhookPayload): Promise<void> {
    const requestId = loggingService.generateRequestId();
    const startTime = Date.now();
    
    try {
      loggingService.logInfo(
        `Webhook-triggered cache invalidation: ${payload.action} ${payload.contentType} ${payload.contentId}`,
        {
          action: payload.action,
          contentType: payload.contentType,
          contentId: payload.contentId,
        },
        requestId
      );

      // Perform parallel invalidation for maximum speed
      const invalidationPromises = [];

      // Invalidate based on content type
      if (payload.contentType === 'blog') {
        invalidationPromises.push(this.invalidateBlogs());
      } else if (payload.contentType === 'case-study') {
        invalidationPromises.push(this.invalidateCaseStudies());
      }

      // Also invalidate specific content cache in parallel
      invalidationPromises.push(this.invalidateSpecificContent(payload.contentType, payload.contentId));

      // Execute all invalidations in parallel for speed
      await Promise.all(invalidationPromises);

      const processingTime = Date.now() - startTime;

      // Log successful invalidation with timing
      const cacheKeys = this.generateCacheKeysForContent(payload.contentType, payload.contentId);
      loggingService.logCacheInvalidation(cacheKeys, 'webhook', {
        success: true,
        affectedCount: cacheKeys.length,
        requestId,
      });

      loggingService.logInfo(
        `Cache invalidation completed in ${processingTime}ms`,
        {
          processingTime,
          contentType: payload.contentType,
          contentId: payload.contentId,
        },
        requestId
      );

    } catch (error: any) {
      const processingTime = Date.now() - startTime;
      
      loggingService.logCacheInvalidation([], 'webhook', {
        success: false,
        requestId,
      });

      loggingService.logError(
        `Cache invalidation failed after ${processingTime}ms: ${error.message}`,
        {
          processingTime,
          error: error.message,
        },
        requestId
      );
      
      throw new Error(`Webhook cache invalidation failed: ${error.message}`);
    }
  }

  /**
   * Invalidate cache for specific content item
   * Optimized for immediate invalidation
   */
  async invalidateSpecificContent(contentType: 'blog' | 'case-study', contentId: string): Promise<void> {
    if (!this.queryClient) return;

    const requestId = loggingService.generateRequestId();
    const startTime = Date.now();
    
    try {
      // Generate specific cache keys for this content
      const cacheKeys = this.generateCacheKeysForContent(contentType, contentId);
      
      const queryType = contentType === 'blog' ? 'blogs' : 'case-studies';
      
      // Perform parallel invalidation for maximum speed
      const invalidationPromises = [
        // Invalidate specific item queries
        this.queryClient.invalidateQueries({
          queryKey: [queryType, contentId],
          exact: false,
          refetchType: 'active'
        }),
        
        // Invalidate list queries that might contain this item
        this.queryClient.invalidateQueries({
          queryKey: [queryType],
          exact: false,
          refetchType: 'active'
        }),
        
        // Also invalidate any filtered queries
        this.queryClient.invalidateQueries({
          predicate: (query) => {
            const key = query.queryKey[0];
            return key === queryType;
          },
          refetchType: 'active'
        })
      ];

      await Promise.all(invalidationPromises);

      const processingTime = Date.now() - startTime;

      loggingService.logCacheInvalidation(cacheKeys, 'specific-content', {
        success: true,
        requestId,
      });

      loggingService.logDebug(
        `Specific content invalidation completed in ${processingTime}ms`,
        {
          processingTime,
          contentType,
          contentId,
          cacheKeys,
        },
        requestId
      );

    } catch (error: any) {
      const processingTime = Date.now() - startTime;
      
      loggingService.logCacheInvalidation([], 'specific-content', {
        success: false,
        requestId,
      });

      loggingService.logError(
        `Specific content invalidation failed after ${processingTime}ms: ${error.message}`,
        {
          processingTime,
          error: error.message,
        },
        requestId
      );
      
      throw error;
    }
  }

  /**
   * Generate cache key for content queries
   */
  generateCacheKey(type: string, filters?: any): string {
    if (!filters || Object.keys(filters).length === 0) {
      return `${type}:all`;
    }

    // Sort filters for consistent key generation
    const sortedFilters = Object.keys(filters)
      .sort()
      .reduce((result, key) => {
        result[key] = filters[key];
        return result;
      }, {} as any);

    const filterString = JSON.stringify(sortedFilters);
    const hash = this.simpleHash(filterString);
    
    return `${type}:${hash}`;
  }

  /**
   * Invalidate cache keys matching a pattern
   */
  async invalidateCachePattern(pattern: string): Promise<void> {
    if (!this.queryClient) return;

    const requestId = loggingService.generateRequestId();
    
    try {
      // For React Query, we need to use predicate-based invalidation
      // since it doesn't support glob patterns directly
      await this.queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey.join(':');
          return this.matchesPattern(queryKey, pattern);
        },
        refetchType: 'active'
      });

      loggingService.logCacheInvalidation([pattern], 'pattern-match', {
        success: true,
        requestId,
      });

    } catch (error: any) {
      loggingService.logCacheInvalidation([pattern], 'pattern-match', {
        success: false,
        requestId,
      });
      
      throw error;
    }
  }

  /**
   * Enhanced invalidation methods with logging
   * These override the existing methods to add proper logging
   */
  async invalidateBlogsWithLogging(): Promise<void> {
    const requestId = loggingService.generateRequestId();
    
    try {
      // Call the original invalidateBlogs logic
      await this.invalidateBlogs();
      
      loggingService.logCacheInvalidation(['blogs:*'], 'manual', {
        success: true,
        requestId,
      });
    } catch (error: any) {
      loggingService.logCacheInvalidation(['blogs:*'], 'manual', {
        success: false,
        requestId,
      });
      throw error;
    }
  }

  async invalidateCaseStudiesWithLogging(): Promise<void> {
    const requestId = loggingService.generateRequestId();
    
    try {
      // Call the original invalidateCaseStudies logic
      await this.invalidateCaseStudies();
      
      loggingService.logCacheInvalidation(['case-studies:*'], 'manual', {
        success: true,
        requestId,
      });
    } catch (error: any) {
      loggingService.logCacheInvalidation(['case-studies:*'], 'manual', {
        success: false,
        requestId,
      });
      throw error;
    }
  }

  /**
   * Immediate cache invalidation for critical updates
   * Forces immediate refetch to eliminate need for manual refresh
   * Target: <100ms processing time with automatic UI updates
   */
  async immediateInvalidation(contentType: 'blog' | 'case-study', contentId: string): Promise<void> {
    if (!this.queryClient) return;

    const startTime = Date.now();
    
    try {
      const queryType = contentType === 'blog' ? 'blogs' : 'case-studies';
      
      console.log(`🚀 CacheManager: IMMEDIATE invalidation and refetch for ${contentType} ${contentId}`);
      
      // Use the most aggressive invalidation and refetch strategy
      await Promise.all([
        // 1. Clear all related queries immediately (removes stale data)
        this.queryClient.removeQueries({
          queryKey: [queryType],
          exact: false
        }),
        
        // 2. Force immediate refetch of ALL queries (not just active ones)
        this.queryClient.refetchQueries({
          queryKey: [queryType],
          exact: false,
          type: 'all' // Changed from 'active' to 'all' for complete refresh
        }),
        
        // 3. Also refetch any specific item queries
        this.queryClient.refetchQueries({
          queryKey: [queryType, contentId],
          exact: false,
          type: 'all'
        }),
        
        // 4. Broadcast to other tabs immediately
        this.broadcast(contentType === 'blog' ? 'blogs' : 'case-studies', `immediate-invalidate-${contentType}`)
      ]);

      // 5. Force a complete cache reset for this content type to ensure fresh data
      await this.queryClient.resetQueries({
        queryKey: [queryType],
        exact: false
      });

      const processingTime = Date.now() - startTime;

      loggingService.logInfo(
        `Immediate invalidation with forced refetch completed in ${processingTime}ms`,
        {
          processingTime,
          contentType,
          contentId,
          target: '<100ms',
          strategy: 'remove-refetch-reset'
        }
      );

      // Notify all listeners for immediate UI updates
      this.notifyListeners(contentType === 'blog' ? 'blogs' : 'case-studies');

    } catch (error: any) {
      const processingTime = Date.now() - startTime;
      
      loggingService.logError(
        `Immediate invalidation failed after ${processingTime}ms: ${error.message}`,
        {
          processingTime,
          error: error.message,
        }
      );
      
      throw error;
    }
  }

  // HELPER METHODS

  /**
   * Generate cache keys for specific content
   */
  private generateCacheKeysForContent(contentType: 'blog' | 'case-study', contentId: string): string[] {
    const baseType = contentType === 'blog' ? 'blogs' : 'case-studies';
    
    return [
      `${baseType}:all`,
      `${baseType}:${contentId}`,
      `${baseType}:published`,
      `${baseType}:list:*`,
    ];
  }

  /**
   * Simple hash function for cache key generation
   */
  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Check if a cache key matches a pattern (simple glob-like matching)
   */
  private matchesPattern(key: string, pattern: string): boolean {
    // Convert glob pattern to regex
    const regexPattern = pattern
      .replace(/\*/g, '.*')
      .replace(/\?/g, '.');
    
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(key);
  }

  // Cleanup method
  destroy() {
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
    }
    this.eventListeners.clear();
  }
}

// Export singleton instance
export const cacheManager = new CacheManager();

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    cacheManager.destroy();
  });
}
