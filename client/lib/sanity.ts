import { createClient, type ClientConfig } from '@sanity/client'
import imageUrlBuilder, { type ImageUrlBuilder } from '@sanity/image-url'
import type { 
  SanityImage, 
  SanityImageWithUrl, 
  ImageTransformOptions,
  SanityBlog,
  SanityCaseStudy 
} from '../types/sanity'
// Import error handling utilities
import { ResilientSanityClient, SanityError } from './sanityErrorHandler'

// Sanity client configuration with type safety
const config: ClientConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'k9jiezj8',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: import.meta.env.VITE_SANITY_USE_CDN === 'true',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN, // Add token for authenticated requests
  ignoreBrowserTokenWarning: true, // Suppress token warnings in development
  perspective: 'published' // Only fetch published documents
}

export const sanityClient = createClient(config)

// Type-safe image URL builder
const builder: ImageUrlBuilder = imageUrlBuilder(sanityClient)

export const urlFor = (source: SanityImage | any) => builder.image(source)

// Type-safe helper function to get optimized image URL
export const getImageUrl = (
  source: SanityImage | any, 
  options: ImageTransformOptions = {}
): string => {
  if (!source) return ''
  
  let imageBuilder = urlFor(source)
  
  if (options.width) {
    imageBuilder = imageBuilder.width(options.width)
  }
  
  if (options.height) {
    imageBuilder = imageBuilder.height(options.height)
  }
  
  if (options.quality) {
    imageBuilder = imageBuilder.quality(options.quality)
  }
  
  if (options.format) {
    imageBuilder = imageBuilder.format(options.format)
  }
  
  if (options.fit) {
    imageBuilder = imageBuilder.fit(options.fit)
  }
  
  if (options.auto) {
    imageBuilder = imageBuilder.auto(options.auto)
  }
  
  return imageBuilder.url()
}

// Helper function for responsive images with type safety
export const getResponsiveImageUrls = (source: SanityImage | any) => {
  if (!source) {
    return {
      small: '',
      medium: '',
      large: '',
      xlarge: '',
    }
  }
  
  return {
    small: getImageUrl(source, { width: 400, quality: 80, auto: 'format' }),
    medium: getImageUrl(source, { width: 800, quality: 80, auto: 'format' }),
    large: getImageUrl(source, { width: 1200, quality: 85, auto: 'format' }),
    xlarge: getImageUrl(source, { width: 1600, quality: 85, auto: 'format' }),
  }
}

// Helper function to transform Sanity image to include URL
export const transformSanityImage = (image: SanityImage | undefined): SanityImageWithUrl | undefined => {
  if (!image) return undefined
  
  return {
    ...image,
    url: getImageUrl(image, { auto: 'format', quality: 85 })
  }
}

// Helper function to get image with srcset for responsive loading
export const getImageSrcSet = (source: SanityImage | any): string => {
  if (!source) return ''
  
  const sizes = [400, 600, 800, 1000, 1200, 1600]
  
  return sizes
    .map(size => `${getImageUrl(source, { width: size, auto: 'format', quality: 80 })} ${size}w`)
    .join(', ')
}

// Type-safe GROQ query helper
export const groq = (strings: TemplateStringsArray, ...values: any[]): string => {
  return strings.reduce((result, string, i) => {
    return result + string + (values[i] || '')
  }, '')
}

// Validation helpers
export const isValidSanityImage = (image: any): image is SanityImage => {
  return image && 
         typeof image === 'object' && 
         image._type === 'image' && 
         image.asset && 
         typeof image.asset._ref === 'string'
}

export const isValidSanityDocument = (doc: any): doc is SanityBlog | SanityCaseStudy => {
  return doc && 
         typeof doc === 'object' && 
         typeof doc._id === 'string' && 
         typeof doc._type === 'string' &&
         (doc._type === 'blog' || doc._type === 'caseStudy')
}

// Note: SanityError is imported from sanityErrorHandler

// Create resilient client instance
const resilientClient = new ResilientSanityClient(sanityClient, {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2
})

// Type-safe client wrapper with enhanced error handling and retry logic
export const safeSanityFetch = async <T>(
  query: string,
  params?: Record<string, any>
): Promise<T> => {
  try {
    const result = await resilientClient.fetch<T>(query, params)
    return result
  } catch (error) {
    // Error is already processed by the resilient client
    throw error
  }
}

// Health check function
export const checkSanityHealth = async (): Promise<{
  status: 'healthy' | 'degraded' | 'unhealthy'
  circuitBreakerState: string
  responseTime?: number
}> => {
  const startTime = Date.now()
  
  try {
    await safeSanityFetch('*[_type == "blog"][0]._id')
    const responseTime = Date.now() - startTime
    
    return {
      status: responseTime < 2000 ? 'healthy' : 'degraded',
      circuitBreakerState: resilientClient.getCircuitBreakerState(),
      responseTime
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      circuitBreakerState: resilientClient.getCircuitBreakerState()
    }
  }
}

// Manual circuit breaker reset (for admin use)
export const resetSanityCircuitBreaker = (): void => {
  resilientClient.resetCircuitBreaker()
}