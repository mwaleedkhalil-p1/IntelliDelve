import { loggingService } from './loggingService';
import { webhookHandlerService } from './webhookHandlerService';
import { cacheManager } from '../utils/cacheManager';

/**
 * Monitoring metrics interface
 */
export interface MonitoringMetrics {
  webhooks: {
    totalProcessed: number;
    successRate: number;
    averageProcessingTime: number;
    pendingRetries: number;
    failureCount: number;
  };
  cache: {
    hitRate: number;
    missRate: number;
    invalidationCount: number;
    lastInvalidation: string | null;
  };
  api: {
    totalRequests: number;
    errorRate: number;
    averageResponseTime: number;
    securityEvents: number;
  };
  system: {
    uptime: number;
    lastHealthCheck: string;
    status: 'healthy' | 'degraded' | 'unhealthy';
  };
}

/**
 * Alert configuration interface
 */
export interface AlertConfig {
  webhookFailureThreshold: number; // Percentage
  cacheHitRateThreshold: number; // Percentage
  apiErrorRateThreshold: number; // Percentage
  responseTimeThreshold: number; // Milliseconds
  securityEventThreshold: number; // Count per hour
}

/**
 * Alert interface
 */
export interface Alert {
  id: string;
  type: 'webhook_failure' | 'cache_performance' | 'api_error' | 'security_event' | 'system_health';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  data: any;
  resolved: boolean;
}

/**
 * Monitoring and Alerting Service
 * 
 * Provides comprehensive monitoring of content synchronization system
 * with alerting capabilities for production deployment.
 */
export class MonitoringService {
  private metrics: MonitoringMetrics;
  private alerts: Alert[] = [];
  private alertConfig: AlertConfig;
  private startTime: number;
  private metricsCollectionInterval: NodeJS.Timeout | null = null;

  constructor(alertConfig?: Partial<AlertConfig>) {
    this.startTime = Date.now();
    
    this.alertConfig = {
      webhookFailureThreshold: 10, // 10% failure rate
      cacheHitRateThreshold: 80, // 80% hit rate minimum
      apiErrorRateThreshold: 5, // 5% error rate
      responseTimeThreshold: 2000, // 2 seconds
      securityEventThreshold: 10, // 10 events per hour
      ...alertConfig,
    };

    this.metrics = this.initializeMetrics();
    this.startMetricsCollection();
  }

  /**
   * Initialize metrics with default values
   */
  private initializeMetrics(): MonitoringMetrics {
    return {
      webhooks: {
        totalProcessed: 0,
        successRate: 100,
        averageProcessingTime: 0,
        pendingRetries: 0,
        failureCount: 0,
      },
      cache: {
        hitRate: 0,
        missRate: 0,
        invalidationCount: 0,
        lastInvalidation: null,
      },
      api: {
        totalRequests: 0,
        errorRate: 0,
        averageResponseTime: 0,
        securityEvents: 0,
      },
      system: {
        uptime: 0,
        lastHealthCheck: new Date().toISOString(),
        status: 'healthy',
      },
    };
  }

  /**
   * Start periodic metrics collection
   */
  private startMetricsCollection(): void {
    // Collect metrics every 30 seconds
    this.metricsCollectionInterval = setInterval(() => {
      this.collectMetrics();
      this.checkAlerts();
    }, 30000);
  }

  /**
   * Collect current metrics from various services
   */
  private collectMetrics(): void {
    try {
      // Update system uptime
      this.metrics.system.uptime = Date.now() - this.startTime;
      this.metrics.system.lastHealthCheck = new Date().toISOString();

      // Collect webhook metrics
      this.collectWebhookMetrics();

      // Collect cache metrics
      this.collectCacheMetrics();

      // Collect API metrics
      this.collectApiMetrics();

      // Update system status based on metrics
      this.updateSystemStatus();

      loggingService.log({
        level: 'debug',
        category: 'monitoring',
        message: 'Metrics collected successfully',
        data: this.metrics,
      });

    } catch (error: any) {
      loggingService.log({
        level: 'error',
        category: 'monitoring',
        message: `Metrics collection failed: ${error.message}`,
        data: { error: error.message },
      });

      this.createAlert('system_health', 'high', 'Metrics collection failed', { error: error.message });
    }
  }

  /**
   * Collect webhook-related metrics
   */
  private collectWebhookMetrics(): void {
    try {
      const pendingRetries = webhookHandlerService.getPendingRetries();
      this.metrics.webhooks.pendingRetries = pendingRetries.length;

      // Get webhook statistics from logging service
      const logs = loggingService.getRecentLogs(100, 'webhook');
      const webhookLogs = logs.filter(log => log.message.includes('Webhook processing'));

      if (webhookLogs.length > 0) {
        const successfulWebhooks = webhookLogs.filter(log => log.message.includes('completed'));
        const failedWebhooks = webhookLogs.filter(log => log.message.includes('failed'));

        this.metrics.webhooks.totalProcessed = webhookLogs.length;
        this.metrics.webhooks.successRate = (successfulWebhooks.length / webhookLogs.length) * 100;
        this.metrics.webhooks.failureCount = failedWebhooks.length;

        // Calculate average processing time
        const processingTimes = webhookLogs
          .map(log => log.data?.processingTime)
          .filter(time => typeof time === 'number');

        if (processingTimes.length > 0) {
          this.metrics.webhooks.averageProcessingTime = 
            processingTimes.reduce((sum, time) => sum + time, 0) / processingTimes.length;
        }
      }

    } catch (error: any) {
      loggingService.log({
        level: 'warn',
        category: 'monitoring',
        message: `Webhook metrics collection failed: ${error.message}`,
      });
    }
  }

  /**
   * Collect cache-related metrics
   */
  private collectCacheMetrics(): void {
    try {
      // Get cache statistics from logging service
      const logs = loggingService.getRecentLogs(100, 'cache');
      const invalidationLogs = logs.filter(log => log.message.includes('invalidation'));

      this.metrics.cache.invalidationCount = invalidationLogs.length;

      if (invalidationLogs.length > 0) {
        this.metrics.cache.lastInvalidation = invalidationLogs[invalidationLogs.length - 1].timestamp;
      }

      // Get API request logs to calculate cache hit/miss rates
      const apiLogs = loggingService.getRecentLogs(100, 'api');
      const cacheHits = apiLogs.filter(log => log.data?.cacheStatus === 'hit').length;
      const cacheMisses = apiLogs.filter(log => log.data?.cacheStatus === 'miss').length;
      const totalCacheRequests = cacheHits + cacheMisses;

      if (totalCacheRequests > 0) {
        this.metrics.cache.hitRate = (cacheHits / totalCacheRequests) * 100;
        this.metrics.cache.missRate = (cacheMisses / totalCacheRequests) * 100;
      }

    } catch (error: any) {
      loggingService.log({
        level: 'warn',
        category: 'monitoring',
        message: `Cache metrics collection failed: ${error.message}`,
      });
    }
  }

  /**
   * Collect API-related metrics
   */
  private collectApiMetrics(): void {
    try {
      const logs = loggingService.getRecentLogs(100, 'api');
      this.metrics.api.totalRequests = logs.length;

      if (logs.length > 0) {
        // Calculate error rate
        const errorLogs = logs.filter(log => log.data?.statusCode >= 400);
        this.metrics.api.errorRate = (errorLogs.length / logs.length) * 100;

        // Calculate average response time
        const responseTimes = logs
          .map(log => log.data?.responseTime)
          .filter(time => typeof time === 'number');

        if (responseTimes.length > 0) {
          this.metrics.api.averageResponseTime = 
            responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
        }
      }

      // Count security events
      const securityLogs = loggingService.getRecentLogs(100, 'security');
      this.metrics.api.securityEvents = securityLogs.length;

    } catch (error: any) {
      loggingService.log({
        level: 'warn',
        category: 'monitoring',
        message: `API metrics collection failed: ${error.message}`,
      });
    }
  }

  /**
   * Update overall system status based on metrics
   */
  private updateSystemStatus(): void {
    const issues = [];

    // Check webhook health
    if (this.metrics.webhooks.successRate < this.alertConfig.webhookFailureThreshold) {
      issues.push('webhook_failures');
    }

    // Check cache performance
    if (this.metrics.cache.hitRate < this.alertConfig.cacheHitRateThreshold) {
      issues.push('cache_performance');
    }

    // Check API health
    if (this.metrics.api.errorRate > this.alertConfig.apiErrorRateThreshold) {
      issues.push('api_errors');
    }

    if (this.metrics.api.averageResponseTime > this.alertConfig.responseTimeThreshold) {
      issues.push('slow_response');
    }

    // Determine system status
    if (issues.length === 0) {
      this.metrics.system.status = 'healthy';
    } else if (issues.length <= 2) {
      this.metrics.system.status = 'degraded';
    } else {
      this.metrics.system.status = 'unhealthy';
    }
  }

  /**
   * Check metrics against alert thresholds and create alerts
   */
  private checkAlerts(): void {
    // Check webhook failure rate
    if (this.metrics.webhooks.successRate < (100 - this.alertConfig.webhookFailureThreshold)) {
      this.createAlert(
        'webhook_failure',
        'high',
        `Webhook failure rate is ${(100 - this.metrics.webhooks.successRate).toFixed(1)}%`,
        { 
          successRate: this.metrics.webhooks.successRate,
          threshold: this.alertConfig.webhookFailureThreshold,
        }
      );
    }

    // Check cache hit rate
    if (this.metrics.cache.hitRate < this.alertConfig.cacheHitRateThreshold && this.metrics.cache.hitRate > 0) {
      this.createAlert(
        'cache_performance',
        'medium',
        `Cache hit rate is ${this.metrics.cache.hitRate.toFixed(1)}%`,
        {
          hitRate: this.metrics.cache.hitRate,
          threshold: this.alertConfig.cacheHitRateThreshold,
        }
      );
    }

    // Check API error rate
    if (this.metrics.api.errorRate > this.alertConfig.apiErrorRateThreshold) {
      this.createAlert(
        'api_error',
        'high',
        `API error rate is ${this.metrics.api.errorRate.toFixed(1)}%`,
        {
          errorRate: this.metrics.api.errorRate,
          threshold: this.alertConfig.apiErrorRateThreshold,
        }
      );
    }

    // Check response time
    if (this.metrics.api.averageResponseTime > this.alertConfig.responseTimeThreshold) {
      this.createAlert(
        'api_error',
        'medium',
        `Average response time is ${this.metrics.api.averageResponseTime.toFixed(0)}ms`,
        {
          responseTime: this.metrics.api.averageResponseTime,
          threshold: this.alertConfig.responseTimeThreshold,
        }
      );
    }

    // Check security events
    if (this.metrics.api.securityEvents > this.alertConfig.securityEventThreshold) {
      this.createAlert(
        'security_event',
        'critical',
        `${this.metrics.api.securityEvents} security events detected`,
        {
          eventCount: this.metrics.api.securityEvents,
          threshold: this.alertConfig.securityEventThreshold,
        }
      );
    }
  }

  /**
   * Create a new alert
   */
  private createAlert(
    type: Alert['type'],
    severity: Alert['severity'],
    message: string,
    data: any
  ): void {
    // Check if similar alert already exists and is not resolved
    const existingAlert = this.alerts.find(
      alert => alert.type === type && !alert.resolved && alert.message === message
    );

    if (existingAlert) {
      return; // Don't create duplicate alerts
    }

    const alert: Alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      severity,
      message,
      timestamp: new Date().toISOString(),
      data,
      resolved: false,
    };

    this.alerts.push(alert);

    // Log the alert
    loggingService.log({
      level: severity === 'critical' || severity === 'high' ? 'error' : 'warn',
      category: 'monitoring',
      message: `Alert created: ${message}`,
      data: alert,
    });

    // In a production environment, this would send notifications
    // to external alerting systems (email, Slack, PagerDuty, etc.)
    this.sendAlertNotification(alert);
  }

  /**
   * Send alert notification (placeholder for external integrations)
   */
  private sendAlertNotification(alert: Alert): void {
    // In production, integrate with:
    // - Email notifications
    // - Slack webhooks
    // - PagerDuty
    // - SMS alerts
    // - Custom webhook endpoints

    console.warn(`🚨 ALERT [${alert.severity.toUpperCase()}]: ${alert.message}`, alert.data);
  }

  /**
   * Get current metrics
   */
  getMetrics(): MonitoringMetrics {
    return { ...this.metrics };
  }

  /**
   * Get active alerts
   */
  getActiveAlerts(): Alert[] {
    return this.alerts.filter(alert => !alert.resolved);
  }

  /**
   * Get all alerts
   */
  getAllAlerts(): Alert[] {
    return [...this.alerts];
  }

  /**
   * Resolve an alert
   */
  resolveAlert(alertId: string): boolean {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
      
      loggingService.log({
        level: 'info',
        category: 'monitoring',
        message: `Alert resolved: ${alert.message}`,
        data: { alertId, resolvedAt: new Date().toISOString() },
      });

      return true;
    }
    return false;
  }

  /**
   * Get health check status
   */
  getHealthStatus(): {
    status: string;
    uptime: number;
    metrics: MonitoringMetrics;
    activeAlerts: number;
    lastCheck: string;
  } {
    return {
      status: this.metrics.system.status,
      uptime: this.metrics.system.uptime,
      metrics: this.metrics,
      activeAlerts: this.getActiveAlerts().length,
      lastCheck: this.metrics.system.lastHealthCheck,
    };
  }

  /**
   * Update alert configuration
   */
  updateAlertConfig(config: Partial<AlertConfig>): void {
    this.alertConfig = { ...this.alertConfig, ...config };
    
    loggingService.log({
      level: 'info',
      category: 'monitoring',
      message: 'Alert configuration updated',
      data: this.alertConfig,
    });
  }

  /**
   * Get real-time performance metrics for sub-second tracking
   */
  getRealTimeMetrics(): {
    webhookProcessingTimes: number[];
    cacheInvalidationTimes: number[];
    averageWebhookTime: number;
    averageCacheTime: number;
    subSecondSuccessRate: number;
  } {
    const recentLogs = loggingService.getRecentLogs(50);
    
    // Extract webhook processing times
    const webhookLogs = recentLogs.filter(log => 
      log.category === 'webhook' && log.data?.processingTime
    );
    const webhookTimes = webhookLogs.map(log => log.data.processingTime).filter(time => typeof time === 'number');
    
    // Extract cache invalidation times
    const cacheLogs = recentLogs.filter(log => 
      log.category === 'cache' && log.data?.processingTime
    );
    const cacheTimes = cacheLogs.map(log => log.data.processingTime).filter(time => typeof time === 'number');
    
    // Calculate averages
    const avgWebhookTime = webhookTimes.length > 0 
      ? webhookTimes.reduce((sum, time) => sum + time, 0) / webhookTimes.length 
      : 0;
    
    const avgCacheTime = cacheTimes.length > 0 
      ? cacheTimes.reduce((sum, time) => sum + time, 0) / cacheTimes.length 
      : 0;
    
    // Calculate sub-second success rate (operations completed in <1000ms)
    const allTimes = [...webhookTimes, ...cacheTimes];
    const subSecondOperations = allTimes.filter(time => time < 1000);
    const subSecondRate = allTimes.length > 0 
      ? (subSecondOperations.length / allTimes.length) * 100 
      : 100;

    return {
      webhookProcessingTimes: webhookTimes,
      cacheInvalidationTimes: cacheTimes,
      averageWebhookTime: avgWebhookTime,
      averageCacheTime: avgCacheTime,
      subSecondSuccessRate: subSecondRate,
    };
  }

  /**
   * Export metrics for external monitoring systems
   */
  exportMetrics(): string {
    const exportData = {
      timestamp: new Date().toISOString(),
      metrics: this.metrics,
      alerts: this.getActiveAlerts(),
      config: this.alertConfig,
    };

    return JSON.stringify(exportData, null, 2);
  }

  /**
   * Cleanup and stop monitoring
   */
  destroy(): void {
    if (this.metricsCollectionInterval) {
      clearInterval(this.metricsCollectionInterval);
      this.metricsCollectionInterval = null;
    }

    loggingService.log({
      level: 'info',
      category: 'monitoring',
      message: 'Monitoring service stopped',
      data: { uptime: this.metrics.system.uptime },
    });
  }
}

// Export singleton instance
export const monitoringService = new MonitoringService();

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    monitoringService.destroy();
  });
}

// Export for testing
export default MonitoringService;