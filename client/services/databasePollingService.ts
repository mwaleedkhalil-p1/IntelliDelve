import { blogService, caseStudyService } from './apiService';
import { realTimeUpdateService } from './realTimeUpdateService';
import { loggingService } from './loggingService';
import { cacheManager } from '../utils/cacheManager';

/**
 * Database Polling Service
 * 
 * Monitors the database for changes by polling API endpoints
 * and triggers real-time cache invalidation when changes are detected.
 * This solves the issue where direct database changes don't trigger webhooks.
 */

interface ContentSnapshot {
  blogs: Array<{ id: string; updated_at: string; status: string }>;
  caseStudies: Array<{ id: string; updated_at: string; status: string }>;
  lastCheck: string;
}

interface ChangeDetection {
  hasChanges: boolean;
  changedBlogs: Array<{ id: string; action: 'created' | 'updated' | 'deleted' | 'status_changed' }>;
  changedCaseStudies: Array<{ id: string; action: 'created' | 'updated' | 'deleted' | 'status_changed' }>;
}

class DatabasePollingService {
  private isPolling: boolean = false;
  private pollingInterval: NodeJS.Timeout | null = null;
  private lastSnapshot: ContentSnapshot | null = null;
  private pollingFrequency: number = 2000; // 2 seconds for real-time feel
  private maxRetries: number = 3;
  private retryCount: number = 0;

  constructor() {
    this.startPolling();
  }

  /**
   * Start polling the database for changes
   */
  startPolling(): void {
    if (this.isPolling) return;

    this.isPolling = true;
    console.log('🔄 Database polling service started');

    // Initial snapshot
    this.takeSnapshot();

    // Set up polling interval
    this.pollingInterval = setInterval(() => {
      this.pollForChanges();
    }, this.pollingFrequency);

    loggingService.logInfo(
      'Database polling service started',
      { pollingFrequency: this.pollingFrequency }
    );
  }

  /**
   * Stop polling the database
   */
  stopPolling(): void {
    if (!this.isPolling) return;

    this.isPolling = false;
    
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }

    console.log('⏹️ Database polling service stopped');

    loggingService.logInfo('Database polling service stopped');
  }

  /**
   * Take a snapshot of current content state
   */
  private async takeSnapshot(): Promise<ContentSnapshot | null> {
    try {
      const startTime = Date.now();

      // Fetch current state from API (this hits the database)
      const [blogsResponse, caseStudiesResponse] = await Promise.all([
        blogService.getBlogs({ limit: 1000 }), // Admin method to get all content
        caseStudyService.getCaseStudies({ limit: 1000 })
      ]);

      const snapshot: ContentSnapshot = {
        blogs: (blogsResponse.results || []).map(blog => ({
          id: blog.id,
          updated_at: blog.updated_at,
          status: blog.status
        })),
        caseStudies: (caseStudiesResponse.results || []).map(cs => ({
          id: cs.id,
          updated_at: cs.updated_at,
          status: cs.status
        })),
        lastCheck: new Date().toISOString()
      };

      const processingTime = Date.now() - startTime;

      loggingService.logDebug(
        `Database snapshot taken in ${processingTime}ms`,
        {
          processingTime,
          blogCount: snapshot.blogs.length,
          caseStudyCount: snapshot.caseStudies.length,
        }
      );

      this.retryCount = 0; // Reset retry count on success
      return snapshot;

    } catch (error: any) {
      this.retryCount++;
      
      loggingService.logError(
        `Database snapshot failed (attempt ${this.retryCount}/${this.maxRetries}): ${error.message}`,
        { error: error.message, retryCount: this.retryCount }
      );

      // If we've exceeded max retries, stop polling temporarily
      if (this.retryCount >= this.maxRetries) {
        console.warn('⚠️ Database polling temporarily disabled due to repeated failures');
        this.stopPolling();
        
        // Restart after 30 seconds
        setTimeout(() => {
          console.log('🔄 Restarting database polling after failure recovery');
          this.retryCount = 0;
          this.startPolling();
        }, 30000);
      }

      return null;
    }
  }

  /**
   * Poll for changes and trigger updates if detected
   */
  private async pollForChanges(): Promise<void> {
    try {
      const newSnapshot = await this.takeSnapshot();
      if (!newSnapshot) return;

      if (this.lastSnapshot) {
        const changes = this.detectChanges(this.lastSnapshot, newSnapshot);
        
        if (changes.hasChanges) {
          console.log('🔄 Database changes detected, triggering cache invalidation');
          await this.handleChanges(changes);
        }
      }

      this.lastSnapshot = newSnapshot;

    } catch (error: any) {
      loggingService.logError(
        `Database polling error: ${error.message}`,
        { error: error.message }
      );
    }
  }

  /**
   * Detect changes between snapshots
   */
  private detectChanges(oldSnapshot: ContentSnapshot, newSnapshot: ContentSnapshot): ChangeDetection {
    const changedBlogs: Array<{ id: string; action: 'created' | 'updated' | 'deleted' | 'status_changed' }> = [];
    const changedCaseStudies: Array<{ id: string; action: 'created' | 'updated' | 'deleted' | 'status_changed' }> = [];

    // Create maps for easier lookup
    const oldBlogs = new Map(oldSnapshot.blogs.map(b => [b.id, b]));
    const newBlogs = new Map(newSnapshot.blogs.map(b => [b.id, b]));
    const oldCaseStudies = new Map(oldSnapshot.caseStudies.map(cs => [cs.id, cs]));
    const newCaseStudies = new Map(newSnapshot.caseStudies.map(cs => [cs.id, cs]));

    // Check for blog changes
    // New blogs (created)
    for (const [id, blog] of newBlogs) {
      if (!oldBlogs.has(id)) {
        changedBlogs.push({ id, action: 'created' });
      }
    }

    // Updated or status changed blogs
    for (const [id, newBlog] of newBlogs) {
      const oldBlog = oldBlogs.get(id);
      if (oldBlog) {
        if (oldBlog.updated_at !== newBlog.updated_at) {
          changedBlogs.push({ id, action: 'updated' });
        } else if (oldBlog.status !== newBlog.status) {
          changedBlogs.push({ id, action: 'status_changed' });
        }
      }
    }

    // Deleted blogs
    for (const [id] of oldBlogs) {
      if (!newBlogs.has(id)) {
        changedBlogs.push({ id, action: 'deleted' });
      }
    }

    // Check for case study changes (same logic)
    // New case studies (created)
    for (const [id, cs] of newCaseStudies) {
      if (!oldCaseStudies.has(id)) {
        changedCaseStudies.push({ id, action: 'created' });
      }
    }

    // Updated or status changed case studies
    for (const [id, newCs] of newCaseStudies) {
      const oldCs = oldCaseStudies.get(id);
      if (oldCs) {
        if (oldCs.updated_at !== newCs.updated_at) {
          changedCaseStudies.push({ id, action: 'updated' });
        } else if (oldCs.status !== newCs.status) {
          changedCaseStudies.push({ id, action: 'status_changed' });
        }
      }
    }

    // Deleted case studies
    for (const [id] of oldCaseStudies) {
      if (!newCaseStudies.has(id)) {
        changedCaseStudies.push({ id, action: 'deleted' });
      }
    }

    return {
      hasChanges: changedBlogs.length > 0 || changedCaseStudies.length > 0,
      changedBlogs,
      changedCaseStudies,
    };
  }

  /**
   * Handle detected changes by triggering cache invalidation and real-time updates
   */
  private async handleChanges(changes: ChangeDetection): Promise<void> {
    const startTime = Date.now();

    try {
      // Process blog changes
      for (const change of changes.changedBlogs) {
        console.log(`🔄 Blog ${change.action}: ${change.id}`);
        
        // Trigger immediate cache invalidation
        await cacheManager.immediateInvalidation('blog', change.id);
        
        // Trigger real-time updates
        await realTimeUpdateService.triggerContentRefresh(
          'blog',
          change.id,
          this.mapActionToWebhookAction(change.action)
        );
      }

      // Process case study changes
      for (const change of changes.changedCaseStudies) {
        console.log(`🔄 Case Study ${change.action}: ${change.id}`);
        
        // Trigger immediate cache invalidation
        await cacheManager.immediateInvalidation('case-study', change.id);
        
        // Trigger real-time updates
        await realTimeUpdateService.triggerContentRefresh(
          'case-study',
          change.id,
          this.mapActionToWebhookAction(change.action)
        );
      }

      const processingTime = Date.now() - startTime;

      loggingService.logInfo(
        `Database changes processed in ${processingTime}ms`,
        {
          processingTime,
          blogChanges: changes.changedBlogs.length,
          caseStudyChanges: changes.changedCaseStudies.length,
          changes: {
            blogs: changes.changedBlogs,
            caseStudies: changes.changedCaseStudies,
          },
        }
      );

      console.log(`✅ Database changes processed: ${changes.changedBlogs.length} blogs, ${changes.changedCaseStudies.length} case studies`);

    } catch (error: any) {
      const processingTime = Date.now() - startTime;
      
      loggingService.logError(
        `Database change processing failed after ${processingTime}ms: ${error.message}`,
        {
          processingTime,
          error: error.message,
        }
      );

      throw error;
    }
  }

  /**
   * Map database change actions to webhook actions
   */
  private mapActionToWebhookAction(action: 'created' | 'updated' | 'deleted' | 'status_changed'): 'create' | 'update' | 'delete' | 'publish' | 'unpublish' {
    switch (action) {
      case 'created':
        return 'create';
      case 'updated':
        return 'update';
      case 'deleted':
        return 'delete';
      case 'status_changed':
        return 'publish'; // Could be publish or unpublish, but we'll let the cache invalidation handle it
      default:
        return 'update';
    }
  }

  /**
   * Force a manual check for changes
   */
  async forceCheck(): Promise<void> {
    console.log('🔄 Forcing database change check');
    await this.pollForChanges();
  }

  /**
   * Update polling frequency
   */
  setPollingFrequency(frequency: number): void {
    this.pollingFrequency = Math.max(1000, frequency); // Minimum 1 second
    
    if (this.isPolling) {
      this.stopPolling();
      this.startPolling();
    }

    loggingService.logInfo(
      `Database polling frequency updated to ${this.pollingFrequency}ms`
    );
  }

  /**
   * Get current polling status
   */
  getStatus(): {
    isPolling: boolean;
    pollingFrequency: number;
    lastCheck: string | null;
    retryCount: number;
  } {
    return {
      isPolling: this.isPolling,
      pollingFrequency: this.pollingFrequency,
      lastCheck: this.lastSnapshot?.lastCheck || null,
      retryCount: this.retryCount,
    };
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.stopPolling();
    this.lastSnapshot = null;

    loggingService.logInfo('Database polling service destroyed');
  }
}

// Export singleton instance
export const databasePollingService = new DatabasePollingService();

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    databasePollingService.destroy();
  });
}

export default DatabasePollingService;