// Enhanced error handling and retry logic for Sanity operations

export class SanityError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: any,
    public retryable: boolean = false
  ) {
    super(message)
    this.name = 'SanityError'
  }
}

export class SanityNetworkError extends SanityError {
  constructor(message: string, details?: any) {
    super(message, undefined, details, true)
    this.name = 'SanityNetworkError'
  }
}

export class SanityRateLimitError extends SanityError {
  constructor(message: string, retryAfter?: number) {
    super(message, 429, { retryAfter }, true)
    this.name = 'SanityRateLimitError'
  }
}

export class SanityServerError extends SanityError {
  constructor(message: string, statusCode: number, details?: any) {
    super(message, statusCode, details, statusCode >= 500)
    this.name = 'SanityServerError'
  }
}

export interface RetryConfig {
  maxRetries: number
  baseDelay: number
  maxDelay: number
  backoffFactor: number
  retryableErrors: string[]
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  backoffFactor: 2,
  retryableErrors: [
    'SanityNetworkError',
    'SanityRateLimitError',
    'SanityServerError'
  ]
}

export class RetryHandler {
  constructor(private config: RetryConfig = DEFAULT_RETRY_CONFIG) {}

  async execute<T>(
    operation: () => Promise<T>,
    operationName: string = 'Sanity operation'
  ): Promise<T> {
    let lastError: Error
    
    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        const result = await operation()
        
        // Log successful retry if this wasn't the first attempt
        if (attempt > 0) {
          console.log(`✅ ${operationName} succeeded after ${attempt} retries`)
        }
        
        return result
      } catch (error) {
        lastError = this.processError(error)
        
        // Don't retry on the last attempt or if error is not retryable
        if (attempt === this.config.maxRetries || !this.isRetryable(lastError)) {
          break
        }
        
        const delay = this.calculateDelay(attempt, lastError)
        
        console.warn(
          `⚠️ ${operationName} failed (attempt ${attempt + 1}/${this.config.maxRetries + 1}): ${lastError.message}. Retrying in ${delay}ms...`
        )
        
        await this.sleep(delay)
      }
    }
    
    console.error(`❌ ${operationName} failed after ${this.config.maxRetries + 1} attempts:`, lastError)
    throw lastError
  }

  private processError(error: any): SanityError {
    // If it's already a SanityError, return as is
    if (error instanceof SanityError) {
      return error
    }

    // Network errors
    if (error.code === 'NETWORK_ERROR' || error.message?.includes('fetch')) {
      return new SanityNetworkError(
        `Network error: ${error.message}`,
        error
      )
    }

    // Rate limiting
    if (error.statusCode === 429) {
      const retryAfter = error.headers?.['retry-after'] 
        ? parseInt(error.headers['retry-after']) * 1000 
        : undefined
      
      return new SanityRateLimitError(
        'Rate limit exceeded',
        retryAfter
      )
    }

    // Server errors (5xx)
    if (error.statusCode >= 500) {
      return new SanityServerError(
        `Server error: ${error.message}`,
        error.statusCode,
        error
      )
    }

    // Client errors (4xx) - generally not retryable
    if (error.statusCode >= 400 && error.statusCode < 500) {
      return new SanityError(
        `Client error: ${error.message}`,
        error.statusCode,
        error,
        false
      )
    }

    // Generic error
    return new SanityError(
      `Sanity operation failed: ${error.message}`,
      error.statusCode,
      error,
      true
    )
  }

  private isRetryable(error: SanityError): boolean {
    return error.retryable && this.config.retryableErrors.includes(error.name)
  }

  private calculateDelay(attempt: number, error: SanityError): number {
    // For rate limit errors, use the retry-after header if available
    if (error instanceof SanityRateLimitError && error.details?.retryAfter) {
      return Math.min(error.details.retryAfter, this.config.maxDelay)
    }

    // Exponential backoff with jitter
    const exponentialDelay = this.config.baseDelay * Math.pow(this.config.backoffFactor, attempt)
    const jitter = Math.random() * 0.1 * exponentialDelay // 10% jitter
    const delay = exponentialDelay + jitter

    return Math.min(delay, this.config.maxDelay)
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// Circuit breaker pattern for additional resilience
export class CircuitBreaker {
  private failures = 0
  private lastFailureTime = 0
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED'

  constructor(
    private failureThreshold: number = 5,
    private recoveryTimeout: number = 60000, // 1 minute
    private successThreshold: number = 2
  ) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.recoveryTimeout) {
        this.state = 'HALF_OPEN'
        console.log('🔄 Circuit breaker transitioning to HALF_OPEN state')
      } else {
        throw new SanityError('Circuit breaker is OPEN - service temporarily unavailable')
      }
    }

    try {
      const result = await operation()
      
      if (this.state === 'HALF_OPEN') {
        this.failures = Math.max(0, this.failures - 1)
        if (this.failures === 0) {
          this.state = 'CLOSED'
          console.log('✅ Circuit breaker reset to CLOSED state')
        }
      }
      
      return result
    } catch (error) {
      this.failures++
      this.lastFailureTime = Date.now()
      
      if (this.failures >= this.failureThreshold) {
        this.state = 'OPEN'
        console.error(`🚨 Circuit breaker OPENED after ${this.failures} failures`)
      }
      
      throw error
    }
  }

  getState(): string {
    return this.state
  }

  reset(): void {
    this.failures = 0
    this.lastFailureTime = 0
    this.state = 'CLOSED'
    console.log('🔄 Circuit breaker manually reset')
  }
}

// Enhanced Sanity client wrapper with retry and circuit breaker
export class ResilientSanityClient {
  private retryHandler: RetryHandler
  private circuitBreaker: CircuitBreaker

  constructor(
    private client: any,
    retryConfig?: Partial<RetryConfig>,
    circuitBreakerConfig?: {
      failureThreshold?: number
      recoveryTimeout?: number
      successThreshold?: number
    }
  ) {
    this.retryHandler = new RetryHandler({
      ...DEFAULT_RETRY_CONFIG,
      ...retryConfig
    })
    
    this.circuitBreaker = new CircuitBreaker(
      circuitBreakerConfig?.failureThreshold,
      circuitBreakerConfig?.recoveryTimeout,
      circuitBreakerConfig?.successThreshold
    )
  }

  async fetch<T>(query: string, params?: Record<string, any>): Promise<T> {
    return this.circuitBreaker.execute(() =>
      this.retryHandler.execute(
        () => this.client.fetch<T>(query, params),
        `Sanity fetch: ${query.substring(0, 50)}...`
      )
    )
  }

  getCircuitBreakerState(): string {
    return this.circuitBreaker.getState()
  }

  resetCircuitBreaker(): void {
    this.circuitBreaker.reset()
  }
}

// Fallback data provider interface
export interface FallbackDataProvider {
  getBlogs(filters?: any): Promise<any[]>
  getBlogBySlug(slug: string): Promise<any | null>
  getCaseStudies(filters?: any): Promise<any[]>
  getCaseStudyBySlug(slug: string): Promise<any | null>
}

// Fallback handler that switches to legacy API when Sanity fails
export class FallbackHandler<T> {
  constructor(
    private primaryProvider: () => Promise<T>,
    private fallbackProvider: () => Promise<T>,
    private operationName: string
  ) {}

  async execute(): Promise<{ data: T; source: 'primary' | 'fallback' }> {
    try {
      const data = await this.primaryProvider()
      return { data, source: 'primary' }
    } catch (error) {
      console.warn(`⚠️ Primary provider failed for ${this.operationName}, falling back to secondary provider:`, error.message)
      
      try {
        const data = await this.fallbackProvider()
        return { data, source: 'fallback' }
      } catch (fallbackError) {
        console.error(`❌ Both primary and fallback providers failed for ${this.operationName}:`, {
          primaryError: error.message,
          fallbackError: fallbackError.message
        })
        throw new SanityError(
          `Both primary and fallback providers failed: ${error.message}`,
          undefined,
          { primaryError: error, fallbackError }
        )
      }
    }
  }
}