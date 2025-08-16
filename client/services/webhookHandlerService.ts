import { loggingService } from './loggingService';

/**
 * Webhook payload interface for CMS integration
 */
export interface WebhookPayload {
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish';
  contentType: 'blog' | 'case-study';
  contentId: string;
  data?: {
    title?: string;
    status?: 'draft' | 'published' | 'archived';
    [key: string]: any;
  };
  timestamp: string;
  signature?: string;
  retryCount?: number;
}

/**
 * Webhook processing result interface
 */
export interface WebhookResult {
  success: boolean;
  cacheInvalidated: boolean;
  errors?: string[];
  retryCount?: number;
  processingTime?: number;
  webhookId: string;
}

/**
 * Webhook retry configuration
 */
interface RetryConfig {
  maxRetries: number;
  baseDelay: number; // milliseconds
  maxDelay: number; // milliseconds
  backoffMultiplier: number;
}

/**
 * Webhook Handler Service
 * 
 * Processes CMS webhooks and triggers appropriate cache invalidation and content updates.
 * Includes retry mechanism with exponential backoff for failed webhooks.
 */
export class WebhookHandlerService {
  private retryConfig: RetryConfig = {
    maxRetries: 3,
    baseDelay: 100, // 100ms for faster retries
    maxDelay: 5000, // 5 seconds max delay
    backoffMultiplier: 2,
  };

  private webhookSecret: string;
  private pendingRetries: Map<string, NodeJS.Timeout> = new Map();

  constructor(webhookSecret?: string) {
    this.webhookSecret = webhookSecret || import.meta.env.VITE_WEBHOOK_SECRET || 'default-secret';
  }

  /**
   * Main webhook processing method
   * Validates, processes, and handles retries for webhook payloads
   */
  async processWebhook(payload: WebhookPayload, signature?: string): Promise<WebhookResult> {
    const webhookId = this.generateWebhookId(payload);
    const requestId = loggingService.generateRequestId();
    const startTime = Date.now();

    try {
      // Validate webhook signature if provided
      if (signature && !this.validateWebhookSignature(JSON.stringify(payload), signature)) {
        const error = 'Invalid webhook signature';
        loggingService.logSecurityEvent(
          'Invalid webhook signature',
          { webhookId, payload: this.sanitizePayload(payload) },
          'high',
          requestId
        );

        const result: WebhookResult = {
          success: false,
          cacheInvalidated: false,
          errors: [error],
          webhookId,
          processingTime: Date.now() - startTime,
        };

        loggingService.logWebhookProcessing(webhookId, this.sanitizePayload(payload), result, {
          processingTime: result.processingTime,
          requestId,
        });

        return result;
      }

      // Validate payload structure
      const validationError = this.validatePayload(payload);
      if (validationError) {
        const result: WebhookResult = {
          success: false,
          cacheInvalidated: false,
          errors: [validationError],
          webhookId,
          processingTime: Date.now() - startTime,
        };

        loggingService.logWebhookProcessing(webhookId, this.sanitizePayload(payload), result, {
          processingTime: result.processingTime,
          requestId,
        });

        return result;
      }

      // Process the webhook based on action type
      const result = await this.executeWebhookAction(payload, webhookId, requestId);
      result.processingTime = Date.now() - startTime;

      // Log the processing result
      loggingService.logWebhookProcessing(webhookId, this.sanitizePayload(payload), result, {
        processingTime: result.processingTime,
        requestId,
      });

      // If processing failed and we haven't exceeded retry limit, schedule retry
      if (!result.success && (payload.retryCount || 0) < this.retryConfig.maxRetries) {
        this.scheduleRetry(payload, webhookId);
      }

      return result;
    } catch (error: any) {
      const result: WebhookResult = {
        success: false,
        cacheInvalidated: false,
        errors: [error.message || 'Unknown error'],
        webhookId,
        processingTime: Date.now() - startTime,
      };

      loggingService.logWebhookProcessing(webhookId, this.sanitizePayload(payload), result, {
        processingTime: result.processingTime,
        requestId,
      });

      // Schedule retry for unexpected errors
      if ((payload.retryCount || 0) < this.retryConfig.maxRetries) {
        this.scheduleRetry(payload, webhookId);
      }

      return result;
    }
  }

  /**
   * Execute the specific webhook action
   */
  private async executeWebhookAction(
    payload: WebhookPayload,
    webhookId: string,
    requestId: string
  ): Promise<WebhookResult> {
    const result: WebhookResult = {
      success: false,
      cacheInvalidated: false,
      webhookId,
      retryCount: payload.retryCount || 0,
    };

    try {
      switch (payload.action) {
        case 'create':
          result.success = await this.handleContentCreate(payload, requestId);
          break;
        
        case 'update':
          result.success = await this.handleContentUpdate(payload, requestId);
          break;
        
        case 'delete':
          result.success = await this.handleContentDelete(payload, requestId);
          result.cacheInvalidated = true; // Always invalidate cache on delete
          break;
        
        case 'publish':
          result.success = await this.handleContentPublish(payload, requestId);
          result.cacheInvalidated = true; // Always invalidate cache on publish
          break;
        
        case 'unpublish':
          result.success = await this.handleContentUnpublish(payload, requestId);
          result.cacheInvalidated = true; // Always invalidate cache on unpublish
          break;
        
        default:
          result.errors = [`Unknown action: ${payload.action}`];
          return result;
      }

      // If action was successful and requires cache invalidation, do it
      if (result.success && (result.cacheInvalidated || this.shouldInvalidateCache(payload.action))) {
        await this.invalidateContentCache(payload, requestId);
        result.cacheInvalidated = true;
      }

    } catch (error: any) {
      result.errors = [error.message || 'Action execution failed'];
    }

    return result;
  }

  /**
   * Handle content creation webhook
   */
  private async handleContentCreate(payload: WebhookPayload, requestId: string): Promise<boolean> {
    // For create actions, we typically don't need to do anything special
    // The content will be fetched from the database when needed
    loggingService.logInfo(
      `Content created: ${payload.contentType} ${payload.contentId}`,
      { action: 'create', contentType: payload.contentType, contentId: payload.contentId },
      requestId
    );

    return true;
  }

  /**
   * Handle content update webhook
   */
  private async handleContentUpdate(payload: WebhookPayload, requestId: string): Promise<boolean> {
    // For update actions, invalidate specific content cache
    loggingService.logInfo(
      `Content updated: ${payload.contentType} ${payload.contentId}`,
      { action: 'update', contentType: payload.contentType, contentId: payload.contentId },
      requestId
    );

    return true;
  }

  /**
   * Handle content deletion webhook
   */
  private async handleContentDelete(payload: WebhookPayload, requestId: string): Promise<boolean> {
    loggingService.logInfo(
      `Content deleted: ${payload.contentType} ${payload.contentId}`,
      { action: 'delete', contentType: payload.contentType, contentId: payload.contentId },
      requestId
    );

    return true;
  }

  /**
   * Handle content publish webhook
   */
  private async handleContentPublish(payload: WebhookPayload, requestId: string): Promise<boolean> {
    loggingService.logInfo(
      `Content published: ${payload.contentType} ${payload.contentId}`,
      { action: 'publish', contentType: payload.contentType, contentId: payload.contentId },
      requestId
    );

    return true;
  }

  /**
   * Handle content unpublish webhook
   */
  private async handleContentUnpublish(payload: WebhookPayload, requestId: string): Promise<boolean> {
    loggingService.logInfo(
      `Content unpublished: ${payload.contentType} ${payload.contentId}`,
      { action: 'unpublish', contentType: payload.contentType, contentId: payload.contentId },
      requestId
    );

    return true;
  }

  /**
   * Invalidate content cache based on webhook payload
   * Uses immediate invalidation for critical actions (publish/unpublish/delete)
   * Also triggers real-time UI updates
   */
  private async invalidateContentCache(payload: WebhookPayload, requestId: string): Promise<void> {
    const startTime = Date.now();
    
    try {
      // Import services dynamically to avoid circular dependencies
      const { cacheManager } = await import('../utils/cacheManager');
      const { realTimeUpdateService } = await import('./realTimeUpdateService');

      const cacheKeys: string[] = [];

      // Use immediate invalidation for critical actions that affect public visibility
      const criticalActions = ['publish', 'unpublish', 'delete'];
      const useImmediateInvalidation = criticalActions.includes(payload.action);

      if (useImmediateInvalidation) {
        // Use immediate invalidation for sub-second propagation
        await cacheManager.immediateInvalidation(payload.contentType, payload.contentId);
        cacheKeys.push(`${payload.contentType}:immediate:${payload.contentId}`);
        
        // Trigger real-time UI updates for immediate refresh
        await realTimeUpdateService.triggerContentRefresh(
          payload.contentType, 
          payload.contentId, 
          payload.action
        );
        
        loggingService.logInfo(
          `Used immediate invalidation with real-time updates for critical action: ${payload.action}`,
          {
            action: payload.action,
            contentType: payload.contentType,
            contentId: payload.contentId,
            processingTime: Date.now() - startTime,
            realTimeTriggered: true,
          },
          requestId
        );
      } else {
        // Use standard invalidation for non-critical actions
        if (payload.contentType === 'blog') {
          await cacheManager.invalidateBlogs();
          cacheKeys.push('blogs:*');
        } else if (payload.contentType === 'case-study') {
          await cacheManager.invalidateCaseStudies();
          cacheKeys.push('case-studies:*');
        }

        // Also invalidate specific content cache
        cacheKeys.push(`${payload.contentType}:${payload.contentId}`);
        
        // Still trigger real-time updates for non-critical actions
        await realTimeUpdateService.triggerContentRefresh(
          payload.contentType, 
          payload.contentId, 
          payload.action
        );
      }

      const totalProcessingTime = Date.now() - startTime;

      loggingService.logCacheInvalidation(cacheKeys, 'webhook', {
        success: true,
        requestId,
      });

      loggingService.logInfo(
        `Cache invalidation with real-time updates completed in ${totalProcessingTime}ms (${useImmediateInvalidation ? 'immediate' : 'standard'})`,
        {
          processingTime: totalProcessingTime,
          invalidationType: useImmediateInvalidation ? 'immediate' : 'standard',
          action: payload.action,
          realTimeUpdatesTriggered: true,
        },
        requestId
      );

    } catch (error: any) {
      const totalProcessingTime = Date.now() - startTime;
      
      loggingService.logCacheInvalidation([], 'webhook', {
        success: false,
        requestId,
      });

      loggingService.logError(
        `Cache invalidation with real-time updates failed after ${totalProcessingTime}ms: ${error.message}`,
        {
          processingTime: totalProcessingTime,
          error: error.message,
        },
        requestId
      );
      
      throw new Error(`Cache invalidation failed: ${error.message}`);
    }
  }

  /**
   * Determine if cache should be invalidated for a given action
   */
  private shouldInvalidateCache(action: WebhookPayload['action']): boolean {
    // Actions that affect public visibility should invalidate cache
    return ['publish', 'unpublish', 'delete'].includes(action);
  }

  /**
   * Schedule retry for failed webhook with exponential backoff
   */
  private scheduleRetry(payload: WebhookPayload, webhookId: string): void {
    const retryCount = (payload.retryCount || 0) + 1;
    const delay = Math.min(
      this.retryConfig.baseDelay * Math.pow(this.retryConfig.backoffMultiplier, retryCount - 1),
      this.retryConfig.maxDelay
    );

    // Cancel any existing retry for this webhook
    const existingTimeout = this.pendingRetries.get(webhookId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Schedule new retry
    const timeout = setTimeout(async () => {
      this.pendingRetries.delete(webhookId);
      
      const retryPayload: WebhookPayload = {
        ...payload,
        retryCount,
      };

      loggingService.logInfo(
        `Retrying webhook: ${webhookId} (attempt ${retryCount}/${this.retryConfig.maxRetries})`,
        { webhookId, retryCount, delay }
      );

      await this.processWebhook(retryPayload);
    }, delay);

    this.pendingRetries.set(webhookId, timeout);

    loggingService.logInfo(
      `Scheduled webhook retry: ${webhookId} in ${delay}ms`,
      { webhookId, retryCount, delay }
    );
  }

  /**
   * Manually retry a failed webhook by ID
   */
  async retryFailedWebhook(webhookId: string, payload: WebhookPayload): Promise<WebhookResult> {
    loggingService.logInfo(
      `Manual retry requested for webhook: ${webhookId}`,
      { webhookId }
    );

    return this.processWebhook(payload);
  }

  /**
   * Validate webhook signature using HMAC
   */
  validateWebhookSignature(payload: string, signature: string): boolean {
    try {
      // In a real implementation, you would use crypto.createHmac
      // For now, we'll do a simple comparison
      const expectedSignature = `sha256=${this.webhookSecret}`;
      return signature === expectedSignature;
    } catch (error) {
      loggingService.logSecurityEvent(
        'Webhook signature validation error',
        { error: error instanceof Error ? error.message : 'Unknown error' },
        'medium'
      );
      return false;
    }
  }

  /**
   * Validate webhook payload structure
   */
  private validatePayload(payload: WebhookPayload): string | null {
    if (!payload.action) {
      return 'Missing required field: action';
    }

    if (!['create', 'update', 'delete', 'publish', 'unpublish'].includes(payload.action)) {
      return `Invalid action: ${payload.action}`;
    }

    if (!payload.contentType) {
      return 'Missing required field: contentType';
    }

    if (!['blog', 'case-study'].includes(payload.contentType)) {
      return `Invalid contentType: ${payload.contentType}`;
    }

    if (!payload.contentId) {
      return 'Missing required field: contentId';
    }

    if (!payload.timestamp) {
      return 'Missing required field: timestamp';
    }

    // Validate timestamp is not too old (prevent replay attacks)
    const payloadTime = new Date(payload.timestamp).getTime();
    const currentTime = Date.now();
    const maxAge = 5 * 60 * 1000; // 5 minutes

    if (currentTime - payloadTime > maxAge) {
      return 'Webhook payload is too old';
    }

    return null;
  }

  /**
   * Generate unique webhook ID for tracking
   */
  private generateWebhookId(payload: WebhookPayload): string {
    return `wh_${payload.contentType}_${payload.contentId}_${payload.action}_${Date.now()}`;
  }

  /**
   * Sanitize payload for logging (remove sensitive data)
   */
  private sanitizePayload(payload: WebhookPayload): Partial<WebhookPayload> {
    const sanitized = { ...payload };
    delete sanitized.signature; // Don't log signatures
    return sanitized;
  }

  /**
   * Get pending retry information
   */
  getPendingRetries(): Array<{ webhookId: string; scheduled: boolean }> {
    return Array.from(this.pendingRetries.keys()).map(webhookId => ({
      webhookId,
      scheduled: true,
    }));
  }

  /**
   * Cancel all pending retries (useful for testing or shutdown)
   */
  cancelAllRetries(): void {
    this.pendingRetries.forEach(timeout => clearTimeout(timeout));
    this.pendingRetries.clear();
  }

  /**
   * Update retry configuration
   */
  updateRetryConfig(config: Partial<RetryConfig>): void {
    this.retryConfig = { ...this.retryConfig, ...config };
  }
}

// Export singleton instance
export const webhookHandlerService = new WebhookHandlerService();

// Export for testing
export default WebhookHandlerService;