import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { sanityService } from '../services/sanityService'
import type { 
  BlogListItem, 
  CaseStudyListItem, 
  SanityBlog, 
  SanityCaseStudy,
  BlogFilters,
  CaseStudyFilters,
  ContentWithSource,
  ContentSource
} from '../types/sanity'

// Fallback configuration
interface FallbackConfig {
  enableFallback: boolean
  fallbackDelay: number
  maxRetries: number
  logFallbacks: boolean
}

const DEFAULT_FALLBACK_CONFIG: FallbackConfig = {
  enableFallback: true,
  fallbackDelay: 2000, // 2 seconds
  maxRetries: 2,
  logFallbacks: true
}

// Transform legacy API data to match Sanity format
const transformLegacyBlog = (legacyBlog: any): BlogListItem => ({
  _id: legacyBlog.id || legacyBlog.uuid,
  title: legacyBlog.title,
  slug: legacyBlog.slug || legacyBlog.id,
  author: legacyBlog.author || 'IntelliDelve Team',
  publishedAt: legacyBlog.created_at || legacyBlog.publishedAt || new Date().toISOString(),
  excerpt: legacyBlog.excerpt || legacyBlog.description || '',
  featuredImage: legacyBlog.featured_image || legacyBlog.image,
  category: legacyBlog.category || 'Technology',
  tags: legacyBlog.tags || [],
  readTime: legacyBlog.readTime || 5,
  status: legacyBlog.status || 'published'
})

const transformLegacyCaseStudy = (legacyCaseStudy: any): CaseStudyListItem => ({
  _id: legacyCaseStudy.id || legacyCaseStudy.uuid,
  title: legacyCaseStudy.title,
  slug: legacyCaseStudy.slug || legacyCaseStudy.id,
  client: legacyCaseStudy.client || legacyCaseStudy.company,
  industry: legacyCaseStudy.industry,
  featuredImage: legacyCaseStudy.featured_image || legacyCaseStudy.image,
  results: legacyCaseStudy.results || legacyCaseStudy.metrics || [],
  tags: legacyCaseStudy.tags || [],
  publishedAt: legacyCaseStudy.created_at || legacyCaseStudy.publishedAt || new Date().toISOString(),
  featured: legacyCaseStudy.featured || false,
  status: legacyCaseStudy.status || 'published'
})

// Generic fallback hook
function useFallbackQuery<TSanityData, TLegacyData, TTransformed>(
  queryKey: string[],
  sanityFetcher: () => Promise<TSanityData>,
  legacyFetcher: () => Promise<TLegacyData>,
  transformer: (data: TLegacyData) => TTransformed,
  config: Partial<FallbackConfig> = {}
): UseQueryResult<ContentWithSource<TTransformed>, Error> {
  const fallbackConfig = { ...DEFAULT_FALLBACK_CONFIG, ...config }

  return useQuery({
    queryKey,
    queryFn: async (): Promise<ContentWithSource<TTransformed>> => {
      if (!fallbackConfig.enableFallback) {
        // If fallback is disabled, only try Sanity
        try {
          const sanityData = await sanityFetcher()
          return {
            data: sanityData as TTransformed,
            source: 'sanity' as ContentSource,
            isLoading: false,
            error: null
          }
        } catch (error) {
          throw error
        }
      }

      // Try Sanity first
      try {
        console.log(`🔍 Attempting to fetch from Sanity: ${queryKey.join('.')}`)
        const sanityData = await sanityFetcher()
        
        if (fallbackConfig.logFallbacks) {
          console.log(`✅ Successfully fetched from Sanity: ${queryKey.join('.')}`)
        }
        
        return {
          data: sanityData as TTransformed,
          source: 'sanity' as ContentSource,
          isLoading: false,
          error: null
        }
      } catch (sanityError) {
        if (fallbackConfig.logFallbacks) {
          console.warn(`⚠️ Sanity fetch failed for ${queryKey.join('.')}, falling back to legacy API:`, sanityError)
        }

        // Fallback to legacy API
        try {
          const legacyData = await legacyFetcher()
          const transformedData = transformer(legacyData)
          
          if (fallbackConfig.logFallbacks) {
            console.log(`✅ Successfully fell back to legacy API: ${queryKey.join('.')}`)
          }
          
          return {
            data: transformedData,
            source: 'legacy' as ContentSource,
            isLoading: false,
            error: null
          }
        } catch (legacyError) {
          if (fallbackConfig.logFallbacks) {
            console.error(`❌ Both Sanity and legacy API failed for ${queryKey.join('.')}:`, {
              sanityError,
              legacyError
            })
          }
          
          throw new Error(`Both primary and fallback data sources failed: ${sanityError.message}`)
        }
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: fallbackConfig.maxRetries,
    retryDelay: fallbackConfig.fallbackDelay
  })
}

// Blog hooks with fallback
export function useSanityBlogsWithFallback(
  filters: BlogFilters = {},
  config?: Partial<FallbackConfig>
) {
  return useFallbackQuery(
    ['sanity-blogs-fallback', filters],
    () => sanityService.getBlogs(filters),
    () => Promise.resolve([]),
    (legacyData: any[]) => legacyData.map(transformLegacyBlog),
    config
  )
}

export function useSanityBlogWithFallback(
  slug: string,
  config?: Partial<FallbackConfig>
) {
  return useFallbackQuery(
    ['sanity-blog-fallback', slug],
    () => sanityService.getBlogBySlug(slug),
    () => Promise.resolve(null),
    (legacyData: any) => legacyData ? {
      ...legacyData,
      _id: legacyData.id || legacyData.uuid,
      _type: 'blog' as const,
      slug: { current: legacyData.slug || legacyData.id },
      publishedAt: legacyData.created_at || legacyData.publishedAt || new Date().toISOString(),
      featuredImage: legacyData.featured_image ? {
        url: legacyData.featured_image,
        alt: legacyData.title
      } : undefined,
      content: legacyData.content || legacyData.body || '',
      status: legacyData.status || 'published'
    } as SanityBlog : null,
    config
  )
}

// Case study hooks with fallback
export function useSanityCaseStudiesWithFallback(
  filters: CaseStudyFilters = {},
  config?: Partial<FallbackConfig>
) {
  return useFallbackQuery(
    ['sanity-case-studies-fallback', filters],
    () => sanityService.getCaseStudies(filters),
    () => Promise.resolve([]),
    (legacyData: any[]) => legacyData.map(transformLegacyCaseStudy),
    config
  )
}

export function useSanityCaseStudyWithFallback(
  slug: string,
  config?: Partial<FallbackConfig>
) {
  return useFallbackQuery(
    ['sanity-case-study-fallback', slug],
    () => sanityService.getCaseStudyBySlug(slug),
    () => Promise.resolve(null),
    (legacyData: any) => legacyData ? {
      ...legacyData,
      _id: legacyData.id || legacyData.uuid,
      _type: 'caseStudy' as const,
      slug: { current: legacyData.slug || legacyData.id },
      publishedAt: legacyData.created_at || legacyData.publishedAt || new Date().toISOString(),
      featuredImage: legacyData.featured_image ? {
        url: legacyData.featured_image,
        alt: legacyData.title
      } : undefined,
      challenge: legacyData.challenge || '',
      solution: legacyData.solution || '',
      results: legacyData.results || legacyData.metrics || [],
      testimonial: legacyData.testimonial,
      gallery: legacyData.gallery || [],
      status: legacyData.status || 'published',
      featured: legacyData.featured || false
    } as SanityCaseStudy : null,
    config
  )
}

// Health check hook
export function useSanityHealthCheck() {
  return useQuery({
    queryKey: ['sanity-health-check'],
    queryFn: async () => {
      try {
        const startTime = Date.now()
        await sanityService.getBlogs({ limit: 1 })
        const responseTime = Date.now() - startTime
        
        return {
          status: 'healthy' as const,
          responseTime,
          source: 'sanity' as ContentSource
        }
      } catch (error) {
        return {
          status: 'unhealthy' as const,
          error: error.message,
          source: 'sanity' as ContentSource
        }
      }
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // 1 minute
  })
}

// Configuration hook for enabling/disabling fallback
export function useFallbackConfig() {
  const enableFallback = (enable: boolean) => {
    localStorage.setItem('sanity-fallback-enabled', enable.toString())
  }

  const isFallbackEnabled = () => {
    const stored = localStorage.getItem('sanity-fallback-enabled')
    return stored !== null ? stored === 'true' : DEFAULT_FALLBACK_CONFIG.enableFallback
  }

  const getFallbackStats = () => {
    // This could be enhanced to track fallback usage statistics
    return {
      fallbacksUsed: 0,
      totalRequests: 0,
      fallbackRate: 0
    }
  }

  return {
    enableFallback,
    isFallbackEnabled,
    getFallbackStats
  }
}