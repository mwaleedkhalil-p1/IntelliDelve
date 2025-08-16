import { webhookHandlerService, WebhookPayload, WebhookResult } from './webhookHandlerService';
import { loggingService } from './loggingService';

/**
 * Webhook endpoint request interface
 */
export interface WebhookRequest {
  method: 'POST';
  headers: {
    'content-type': string;
    'x-webhook-signature'?: string;
    'user-agent'?: string;
    [key: string]: string | undefined;
  };
  body: string;
}

/**
 * Webhook endpoint response interface
 */
export interface WebhookResponse {
  status: number;
  headers: {
    'content-type': string;
    [key: string]: string;
  };
  body: string;
}

/**
 * Webhook validation result
 */
interface ValidationResult {
  isValid: boolean;
  error?: string;
  payload?: WebhookPayload;
}

/**
 * Webhook Endpoint Service
 * 
 * Handles incoming webhook requests from CMS systems.
 * This would typically be implemented as a backend API endpoint,
 * but is provided here for testing and development purposes.
 */
export class WebhookEndpointService {
  private readonly WEBHOOK_PATH = '/api/webhooks/content-sync';
  private readonly MAX_PAYLOAD_SIZE = 1024 * 1024; // 1MB
  private readonly SUPPORTED_CONTENT_TYPES = ['application/json'];

  /**
   * Main webhook endpoint handler
   * Processes incoming webhook requests and returns appropriate responses
   */
  async handleWebhookRequest(request: WebhookRequest): Promise<WebhookResponse> {
    const requestId = loggingService.generateRequestId();
    const startTime = Date.now();

    try {
      // Log incoming webhook request
      loggingService.logInfo(
        `Incoming webhook request: ${request.method} ${this.WEBHOOK_PATH}`,
        {
          method: request.method,
          contentType: request.headers['content-type'],
          userAgent: request.headers['user-agent'],
          hasSignature: !!request.headers['x-webhook-signature'],
          bodySize: request.body.length,
        },
        requestId
      );

      // Validate request method
      if (request.method !== 'POST') {
        return this.createErrorResponse(405, 'Method Not Allowed', requestId);
      }

      // Validate content type
      const contentType = request.headers['content-type'];
      if (!contentType || !this.SUPPORTED_CONTENT_TYPES.some(type => contentType.includes(type))) {
        return this.createErrorResponse(415, 'Unsupported Media Type', requestId);
      }

      // Validate payload size
      if (request.body.length > this.MAX_PAYLOAD_SIZE) {
        return this.createErrorResponse(413, 'Payload Too Large', requestId);
      }

      // Validate and parse request
      const validation = this.validateAndParseRequest(request, requestId);
      if (!validation.isValid || !validation.payload) {
        return this.createErrorResponse(400, validation.error || 'Invalid request', requestId);
      }

      // Process webhook with handler service
      const result = await webhookHandlerService.processWebhook(
        validation.payload,
        request.headers['x-webhook-signature']
      );

      const processingTime = Date.now() - startTime;

      // Log processing result
      if (result.success) {
        loggingService.logInfo(
          `Webhook processing completed: ${result.webhookId}`,
          {
            webhookId: result.webhookId,
            success: result.success,
            cacheInvalidated: result.cacheInvalidated,
            processingTime,
          },
          requestId
        );
      } else {
        loggingService.logError(
          `Webhook processing failed: ${result.webhookId}`,
          {
            webhookId: result.webhookId,
            success: result.success,
            errors: result.errors,
            processingTime,
          },
          requestId
        );
      }

      // Return appropriate response
      if (result.success) {
        return this.createSuccessResponse(result, requestId);
      } else {
        return this.createWebhookErrorResponse(result, requestId);
      }

    } catch (error: any) {
      const processingTime = Date.now() - startTime;

      loggingService.logError(
        `Webhook endpoint error: ${error.message}`,
        {
          error: error.message,
          stack: error.stack,
          processingTime,
        },
        requestId
      );

      return this.createErrorResponse(500, 'Internal Server Error', requestId);
    }
  }

  /**
   * Validate and parse incoming webhook request
   */
  private validateAndParseRequest(request: WebhookRequest, requestId: string): ValidationResult {
    try {
      // Parse JSON payload
      let payload: WebhookPayload;
      try {
        payload = JSON.parse(request.body);
      } catch (parseError) {
        loggingService.logSecurityEvent(
          'Invalid JSON in webhook payload',
          { error: parseError instanceof Error ? parseError.message : 'Unknown parse error' },
          'low',
          requestId
        );
        return { isValid: false, error: 'Invalid JSON payload' };
      }

      // Validate required fields
      const requiredFields = ['action', 'contentType', 'contentId', 'timestamp'];
      for (const field of requiredFields) {
        if (!payload[field as keyof WebhookPayload]) {
          return { isValid: false, error: `Missing required field: ${field}` };
        }
      }

      // Validate field values
      const validActions = ['create', 'update', 'delete', 'publish', 'unpublish'];
      if (!validActions.includes(payload.action)) {
        return { isValid: false, error: `Invalid action: ${payload.action}` };
      }

      const validContentTypes = ['blog', 'case-study'];
      if (!validContentTypes.includes(payload.contentType)) {
        return { isValid: false, error: `Invalid contentType: ${payload.contentType}` };
      }

      // Validate timestamp format
      const timestamp = new Date(payload.timestamp);
      if (isNaN(timestamp.getTime())) {
        return { isValid: false, error: 'Invalid timestamp format' };
      }

      // Check if timestamp is not too old (prevent replay attacks)
      const maxAge = 5 * 60 * 1000; // 5 minutes
      if (Date.now() - timestamp.getTime() > maxAge) {
        loggingService.logSecurityEvent(
          'Webhook payload timestamp too old',
          { timestamp: payload.timestamp, age: Date.now() - timestamp.getTime() },
          'medium',
          requestId
        );
        return { isValid: false, error: 'Webhook payload is too old' };
      }

      return { isValid: true, payload };

    } catch (error: any) {
      loggingService.logError(
        `Request validation error: ${error.message}`,
        { error: error.message },
        requestId
      );

      return { isValid: false, error: 'Request validation failed' };
    }
  }

  /**
   * Create success response for successful webhook processing
   */
  private createSuccessResponse(result: WebhookResult, requestId: string): WebhookResponse {
    const responseBody = {
      success: true,
      webhookId: result.webhookId,
      cacheInvalidated: result.cacheInvalidated,
      processingTime: result.processingTime,
      requestId,
    };

    return {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'x-request-id': requestId,
      },
      body: JSON.stringify(responseBody),
    };
  }

  /**
   * Create error response for failed webhook processing
   */
  private createWebhookErrorResponse(result: WebhookResult, requestId: string): WebhookResponse {
    const responseBody = {
      success: false,
      webhookId: result.webhookId,
      errors: result.errors,
      retryCount: result.retryCount,
      processingTime: result.processingTime,
      requestId,
    };

    // Use 422 for webhook processing errors (valid request, but processing failed)
    return {
      status: 422,
      headers: {
        'content-type': 'application/json',
        'x-request-id': requestId,
      },
      body: JSON.stringify(responseBody),
    };
  }

  /**
   * Create generic error response
   */
  private createErrorResponse(status: number, message: string, requestId: string): WebhookResponse {
    const responseBody = {
      success: false,
      error: message,
      requestId,
    };

    return {
      status,
      headers: {
        'content-type': 'application/json',
        'x-request-id': requestId,
      },
      body: JSON.stringify(responseBody),
    };
  }

  /**
   * Health check endpoint for webhook service
   */
  async handleHealthCheck(): Promise<WebhookResponse> {
    const requestId = loggingService.generateRequestId();

    try {
      // Check webhook handler service status
      const pendingRetries = webhookHandlerService.getPendingRetries();
      
      const healthData = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        pendingRetries: pendingRetries.length,
        requestId,
      };

      loggingService.logInfo(
        'Webhook health check requested',
        healthData,
        requestId
      );

      return {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'x-request-id': requestId,
        },
        body: JSON.stringify(healthData),
      };

    } catch (error: any) {
      loggingService.logError(
        `Health check error: ${error.message}`,
        { error: error.message },
        requestId
      );

      return this.createErrorResponse(500, 'Health check failed', requestId);
    }
  }

  /**
   * Get webhook endpoint configuration
   */
  getEndpointInfo(): {
    path: string;
    method: string;
    contentTypes: string[];
    maxPayloadSize: number;
  } {
    return {
      path: this.WEBHOOK_PATH,
      method: 'POST',
      contentTypes: this.SUPPORTED_CONTENT_TYPES,
      maxPayloadSize: this.MAX_PAYLOAD_SIZE,
    };
  }

  /**
   * Create a test webhook request for development/testing
   */
  createTestWebhookRequest(payload: WebhookPayload, signature?: string): WebhookRequest {
    return {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'Test-Webhook-Client/1.0',
        ...(signature && { 'x-webhook-signature': signature }),
      },
      body: JSON.stringify(payload),
    };
  }
}

// Export singleton instance
export const webhookEndpointService = new WebhookEndpointService();

// Export for testing
export default WebhookEndpointService;