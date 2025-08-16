import { cacheManager } from '../utils/cacheManager';
import { loggingService } from './loggingService';

/**
 * Real-time update service that provides WebSocket-like functionality
 * for immediate UI updates without manual refresh
 */

export interface UpdateEvent {
  type: 'content-updated' | 'content-created' | 'content-deleted';
  contentType: 'blog' | 'case-study';
  contentId: string;
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish';
  timestamp: string;
  data?: any;
}

export type UpdateListener = (event: UpdateEvent) => void;

class RealTimeUpdateService {
  private listeners: Set<UpdateListener> = new Set();
  private broadcastChannel: BroadcastChannel | null = null;
  private isConnected: boolean = false;

  constructor() {
    this.initializeBroadcastChannel();
    this.setupCacheManagerIntegration();
  }

  /**
   * Initialize BroadcastChannel for cross-tab communication
   */
  private initializeBroadcastChannel(): void {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.broadcastChannel = new BroadcastChannel('intellidelve-realtime-updates');
      this.broadcastChannel.onmessage = this.handleBroadcastMessage.bind(this);
      this.isConnected = true;
      
      loggingService.log({
        level: 'info',
        category: 'realtime',
        message: 'Real-time update service initialized',
      });
    }
  }

  /**
   * Set up integration with cache manager for automatic updates
   */
  private setupCacheManagerIntegration(): void {
    // Listen for cache updates and convert them to real-time events
    cacheManager.onCacheUpdate((type) => {
      const event: UpdateEvent = {
        type: 'content-updated',
        contentType: type === 'blogs' ? 'blog' : 'case-study',
        contentId: 'bulk-update',
        action: 'update',
        timestamp: new Date().toISOString(),
      };

      this.notifyListeners(event);
    });
  }

  /**
   * Handle broadcast messages from other tabs
   */
  private handleBroadcastMessage(event: MessageEvent): void {
    try {
      const updateEvent: UpdateEvent = event.data;
      
      loggingService.log({
        level: 'debug',
        category: 'realtime',
        message: `Received real-time update: ${updateEvent.type}`,
        data: updateEvent,
      });

      this.notifyListeners(updateEvent);
    } catch (error: any) {
      loggingService.log({
        level: 'error',
        category: 'realtime',
        message: `Failed to handle broadcast message: ${error.message}`,
      });
    }
  }

  /**
   * Notify all listeners of an update event
   */
  private notifyListeners(event: UpdateEvent): void {
    this.listeners.forEach(listener => {
      try {
        listener(event);
      } catch (error: any) {
        loggingService.log({
          level: 'error',
          category: 'realtime',
          message: `Listener error: ${error.message}`,
        });
      }
    });
  }

  /**
   * Subscribe to real-time updates
   */
  subscribe(listener: UpdateListener): () => void {
    this.listeners.add(listener);
    
    loggingService.log({
      level: 'debug',
      category: 'realtime',
      message: `New listener subscribed. Total listeners: ${this.listeners.size}`,
    });

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
      
      loggingService.log({
        level: 'debug',
        category: 'realtime',
        message: `Listener unsubscribed. Total listeners: ${this.listeners.size}`,
      });
    };
  }

  /**
   * Broadcast an update event to all tabs and listeners
   */
  broadcastUpdate(event: UpdateEvent): void {
    // Broadcast to other tabs
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage(event);
    }

    // Notify local listeners
    this.notifyListeners(event);

    loggingService.log({
      level: 'info',
      category: 'realtime',
      message: `Broadcasted update: ${event.type} for ${event.contentType} ${event.contentId}`,
      data: event,
    });
  }

  /**
   * Trigger immediate content refresh for specific content
   */
  async triggerContentRefresh(contentType: 'blog' | 'case-study', contentId: string, action: UpdateEvent['action']): Promise<void> {
    const startTime = Date.now();
    
    try {
      // Immediate cache invalidation
      await cacheManager.immediateInvalidation(contentType, contentId);

      // Broadcast update event
      const event: UpdateEvent = {
        type: action === 'delete' ? 'content-deleted' : action === 'create' ? 'content-created' : 'content-updated',
        contentType,
        contentId,
        action,
        timestamp: new Date().toISOString(),
      };

      this.broadcastUpdate(event);

      const processingTime = Date.now() - startTime;

      loggingService.log({
        level: 'info',
        category: 'realtime',
        message: `Content refresh completed in ${processingTime}ms`,
        data: {
          processingTime,
          contentType,
          contentId,
          action,
        },
      });

    } catch (error: any) {
      const processingTime = Date.now() - startTime;
      
      loggingService.log({
        level: 'error',
        category: 'realtime',
        message: `Content refresh failed after ${processingTime}ms: ${error.message}`,
        data: {
          processingTime,
          error: error.message,
        },
      });
      
      throw error;
    }
  }

  /**
   * Force refresh all content of a specific type
   */
  async forceRefreshAll(contentType?: 'blog' | 'case-study'): Promise<void> {
    try {
      if (!contentType || contentType === 'blog') {
        await cacheManager.invalidateBlogs();
        
        const event: UpdateEvent = {
          type: 'content-updated',
          contentType: 'blog',
          contentId: 'all',
          action: 'update',
          timestamp: new Date().toISOString(),
        };
        
        this.broadcastUpdate(event);
      }

      if (!contentType || contentType === 'case-study') {
        await cacheManager.invalidateCaseStudies();
        
        const event: UpdateEvent = {
          type: 'content-updated',
          contentType: 'case-study',
          contentId: 'all',
          action: 'update',
          timestamp: new Date().toISOString(),
        };
        
        this.broadcastUpdate(event);
      }

      loggingService.log({
        level: 'info',
        category: 'realtime',
        message: `Force refresh completed for: ${contentType || 'all'}`,
      });

    } catch (error: any) {
      loggingService.log({
        level: 'error',
        category: 'realtime',
        message: `Force refresh failed: ${error.message}`,
      });
      
      throw error;
    }
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): { connected: boolean; listeners: number } {
    return {
      connected: this.isConnected,
      listeners: this.listeners.size,
    };
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
      this.broadcastChannel = null;
    }
    
    this.listeners.clear();
    this.isConnected = false;

    loggingService.log({
      level: 'info',
      category: 'realtime',
      message: 'Real-time update service destroyed',
    });
  }
}

// Export singleton instance
export const realTimeUpdateService = new RealTimeUpdateService();

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    realTimeUpdateService.destroy();
  });
}

export default RealTimeUpdateService;