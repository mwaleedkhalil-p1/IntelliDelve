import { QueryClient } from '@tanstack/react-query';

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
    
    // Only invalidate queries, don't remove them and don't force refetch
    // This marks them as stale so they will refetch naturally when accessed
    await this.queryClient.invalidateQueries({ 
      queryKey: ['blogs'], 
      exact: false,
      refetchType: 'active'
    });
    
    this.notifyListeners('blogs');
  }

  // Force case study cache invalidation without broadcast (internal use)
  private async forceCaseStudyInvalidation() {
    if (!this.queryClient) return;
    
    console.log('🔥 CacheManager: Force invalidating case study caches');
    
    // Only invalidate queries, don't remove them and don't force refetch
    // This marks them as stale so they will refetch naturally when accessed
    await this.queryClient.invalidateQueries({ 
      queryKey: ['case-studies'], 
      exact: false,
      refetchType: 'active'
    });
    
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
