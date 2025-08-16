/**
 * Comprehensive Logging Service
 * 
 * Provides structured logging for content synchronization debugging and monitoring.
 * Tracks API requests, cache operations, webhook processing, and database queries.
 */

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  category: 'api' | 'cache' | 'webhook' | 'database' | 'security';
  message: string;
  data?: any;
  requestId?: string;
}

export interface ApiRequestLog {
  endpoint: string;
  method: string;
  filters: any;
  cacheStatus: 'hit' | 'miss' | 'bypass';
  source: 'db' | 'cache' | 'index';
  resultIds: string[];
  responseTime?: number;
  statusCode?: number;
}

export interface CacheOperationLog {
  operation: 'invalidate' | 'set' | 'get' | 'clear';
  keys: string[];
  trigger: 'webhook' | 'manual' | 'mutation' | 'timeout';
  success: boolean;
  affectedCount?: number;
}

export interface WebhookProcessingLog {
  webhookId: string;
  payload: any;
  result: {
    success: boolean;
    cacheInvalidated: boolean;
    errors?: string[];
    retryCount?: number;
  };
  processingTime?: number;
}

export interface DatabaseQueryLog {
  query: string;
  filters: any;
  resultCount: number;
  executionTime?: number;
  table?: string;
}

/**
 * Logging Service Class
 * 
 * Centralized logging system with structured data and multiple output targets.
 */
export class LoggingService {
  private logs: LogEntry[] = [];
  private maxLogEntries: number = 1000;
  private enableConsoleOutput: boolean = true;
  private enableLocalStorage: boolean = false;
  private requestIdCounter: number = 0;

  constructor(options?: {
    maxLogEntries?: number;
    enableConsoleOutput?: boolean;
    enableLocalStorage?: boolean;
  }) {
    if (options) {
      this.maxLogEntries = options.maxLogEntries ?? this.maxLogEntries;
      this.enableConsoleOutput = options.enableConsoleOutput ?? this.enableConsoleOutput;
      this.enableLocalStorage = options.enableLocalStorage ?? this.enableLocalStorage;
    }
  }

  /**
   * Generates a unique request ID for tracking related operations
   */
  generateRequestId(): string {
    this.requestIdCounter++;
    return `req_${Date.now()}_${this.requestIdCounter}`;
  }

  /**
   * Core logging method - all other methods use this
   */
  private log(entry: Omit<LogEntry, 'timestamp'>): void {
    const logEntry: LogEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
    };

    // Add to in-memory log store
    this.logs.push(logEntry);

    // Maintain max log entries limit
    if (this.logs.length > this.maxLogEntries) {
      this.logs = this.logs.slice(-this.maxLogEntries);
    }

    // Console output
    if (this.enableConsoleOutput) {
      this.outputToConsole(logEntry);
    }

    // Local storage (for debugging)
    if (this.enableLocalStorage && typeof window !== 'undefined') {
      this.saveToLocalStorage(logEntry);
    }
  }

  /**
   * Output log entry to console with appropriate formatting
   */
  private outputToConsole(entry: LogEntry): void {
    const prefix = `[${entry.timestamp}] [${entry.category.toUpperCase()}]`;
    const message = `${prefix} ${entry.message}`;

    switch (entry.level) {
      case 'error':
        console.error(message, entry.data);
        break;
      case 'warn':
        console.warn(message, entry.data);
        break;
      case 'debug':
        console.debug(message, entry.data);
        break;
      default:
        console.log(message, entry.data);
    }
  }

  /**
   * Save log entry to local storage for debugging
   */
  private saveToLocalStorage(entry: LogEntry): void {
    try {
      const storageKey = 'intellidelve_sync_logs';
      const existingLogs = JSON.parse(localStorage.getItem(storageKey) || '[]');
      existingLogs.push(entry);
      
      // Keep only last 100 entries in localStorage
      const recentLogs = existingLogs.slice(-100);
      localStorage.setItem(storageKey, JSON.stringify(recentLogs));
    } catch (error) {
      console.warn('Failed to save log to localStorage:', error);
    }
  }

  /**
   * Log API endpoint requests with detailed information
   */
  logApiRequest(
    endpoint: string,
    method: string,
    filters: any,
    cacheStatus: 'hit' | 'miss' | 'bypass',
    source: 'db' | 'cache' | 'index',
    resultIds: string[],
    options?: {
      responseTime?: number;
      statusCode?: number;
      requestId?: string;
    }
  ): void {
    const logData: ApiRequestLog = {
      endpoint,
      method,
      filters,
      cacheStatus,
      source,
      resultIds,
      responseTime: options?.responseTime,
      statusCode: options?.statusCode,
    };

    this.log({
      level: 'info',
      category: 'api',
      message: `API Request: ${method} ${endpoint} - ${cacheStatus} (${resultIds.length} results)`,
      data: logData,
      requestId: options?.requestId,
    });
  }

  /**
   * Log cache invalidation and other cache operations
   */
  logCacheInvalidation(
    keys: string[],
    trigger: 'webhook' | 'manual' | 'mutation' | 'timeout',
    options?: {
      success?: boolean;
      affectedCount?: number;
      requestId?: string;
    }
  ): void {
    const logData: CacheOperationLog = {
      operation: 'invalidate',
      keys,
      trigger,
      success: options?.success ?? true,
      affectedCount: options?.affectedCount,
    };

    this.log({
      level: 'info',
      category: 'cache',
      message: `Cache Invalidation: ${keys.length} keys invalidated (trigger: ${trigger})`,
      data: logData,
      requestId: options?.requestId,
    });
  }

  /**
   * Log general cache operations (set, get, clear)
   */
  logCacheOperation(
    operation: 'set' | 'get' | 'clear',
    keys: string[],
    options?: {
      success?: boolean;
      trigger?: string;
      requestId?: string;
    }
  ): void {
    const logData: CacheOperationLog = {
      operation,
      keys,
      trigger: options?.trigger as any || 'manual',
      success: options?.success ?? true,
    };

    this.log({
      level: 'debug',
      category: 'cache',
      message: `Cache ${operation.toUpperCase()}: ${keys.length} keys`,
      data: logData,
      requestId: options?.requestId,
    });
  }

  /**
   * Log webhook processing with detailed results
   */
  logWebhookProcessing(
    webhookId: string,
    payload: any,
    result: {
      success: boolean;
      cacheInvalidated: boolean;
      errors?: string[];
      retryCount?: number;
    },
    options?: {
      processingTime?: number;
      requestId?: string;
    }
  ): void {
    const logData: WebhookProcessingLog = {
      webhookId,
      payload,
      result,
      processingTime: options?.processingTime,
    };

    const level = result.success ? 'info' : 'error';
    const message = `Webhook Processing: ${webhookId} - ${result.success ? 'SUCCESS' : 'FAILED'}`;

    this.log({
      level,
      category: 'webhook',
      message,
      data: logData,
      requestId: options?.requestId,
    });
  }

  /**
   * Log database query execution
   */
  logDatabaseQuery(
    query: string,
    filters: any,
    resultCount: number,
    options?: {
      executionTime?: number;
      table?: string;
      requestId?: string;
    }
  ): void {
    const logData: DatabaseQueryLog = {
      query,
      filters,
      resultCount,
      executionTime: options?.executionTime,
      table: options?.table,
    };

    this.log({
      level: 'debug',
      category: 'database',
      message: `DB Query: ${options?.table || 'unknown'} - ${resultCount} results`,
      data: logData,
      requestId: options?.requestId,
    });
  }

  /**
   * Log security-related events (bypass attempts, unauthorized access, etc.)
   */
  logSecurityEvent(
    event: string,
    details: any,
    severity: 'low' | 'medium' | 'high' = 'medium',
    requestId?: string
  ): void {
    const level = severity === 'high' ? 'error' : 'warn';

    this.log({
      level,
      category: 'security',
      message: `Security Event: ${event}`,
      data: {
        event,
        severity,
        details,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
        url: typeof window !== 'undefined' ? window.location.href : undefined,
      },
      requestId,
    });
  }

  /**
   * Get recent log entries for debugging
   */
  getRecentLogs(count: number = 50, category?: LogEntry['category']): LogEntry[] {
    let filteredLogs = this.logs;

    if (category) {
      filteredLogs = this.logs.filter(log => log.category === category);
    }

    return filteredLogs.slice(-count);
  }

  /**
   * Get logs by request ID for tracing related operations
   */
  getLogsByRequestId(requestId: string): LogEntry[] {
    return this.logs.filter(log => log.requestId === requestId);
  }

  /**
   * Clear all logs (useful for testing or memory management)
   */
  clearLogs(): void {
    this.logs = [];
    
    if (this.enableLocalStorage && typeof window !== 'undefined') {
      localStorage.removeItem('intellidelve_sync_logs');
    }
  }

  /**
   * Export logs as JSON for external analysis
   */
  exportLogs(category?: LogEntry['category']): string {
    let logsToExport = this.logs;

    if (category) {
      logsToExport = this.logs.filter(log => log.category === category);
    }

    return JSON.stringify(logsToExport, null, 2);
  }

  /**
   * Get logging statistics
   */
  getStats(): {
    totalLogs: number;
    byCategory: Record<string, number>;
    byLevel: Record<string, number>;
    oldestLog?: string;
    newestLog?: string;
  } {
    const byCategory: Record<string, number> = {};
    const byLevel: Record<string, number> = {};

    this.logs.forEach(log => {
      byCategory[log.category] = (byCategory[log.category] || 0) + 1;
      byLevel[log.level] = (byLevel[log.level] || 0) + 1;
    });

    return {
      totalLogs: this.logs.length,
      byCategory,
      byLevel,
      oldestLog: this.logs[0]?.timestamp,
      newestLog: this.logs[this.logs.length - 1]?.timestamp,
    };
  }
}

// Export singleton instance
export const loggingService = new LoggingService({
  maxLogEntries: 1000,
  enableConsoleOutput: import.meta.env.DEV || import.meta.env.VITE_ENABLE_LOGGING === 'true',
  enableLocalStorage: import.meta.env.DEV,
});

// Export for testing
export default LoggingService;