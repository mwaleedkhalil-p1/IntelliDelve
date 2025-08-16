import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { sanityService, type PaginatedResponse } from '../services/sanityService'
import type {
  BlogListItem,
  CaseStudyListItem,
  SanityBlog,
  SanityCaseStudy,
  BlogFilters,
  CaseStudyFilters
} from '../types/sanity'

// Query key factories for consistent caching
export const sanityQueryKeys = {
  all: ['sanity'] as const,
  blogs: () => [...sanityQueryKeys.all, 'blogs'] as const,
  blog: (slug: string) => [...sanityQueryKeys.blogs(), slug] as const,
  blogsPaginated: (filters: any) => [...sanityQueryKeys.blogs(), 'paginated', filters] as const,
  blogsRelated: (id: string, category?: string) => [...sanityQueryKeys.blogs(), 'related', id, category] as const,
  caseStudies: () => [...sanityQueryKeys.all, 'caseStudies'] as const,
  caseStudy: (slug: string) => [...sanityQueryKeys.caseStudies(), slug] as const,
  caseStudiesPaginated: (filters: any) => [...sanityQueryKeys.caseStudies(), 'paginated', filters] as const,
  caseStudiesRelated: (id: string, industry?: string) => [...sanityQueryKeys.caseStudies(), 'related', id, industry] as const,
  categories: () => [...sanityQueryKeys.all, 'categories'] as const,
  industries: () => [...sanityQueryKeys.all, 'industries'] as const,
  tags: () => [...sanityQueryKeys.all, 'tags'] as const,
  facets: (type: 'blog' | 'caseStudy') => [...sanityQueryKeys.all, 'facets', type] as const,
  stats: () => [...sanityQueryKeys.all, 'stats'] as const,
  search: (query: string) => [...sanityQueryKeys.all, 'search', query] as const,
}

// Blog Hooks
export function useSanityBlogs(
  filters: BlogFilters = {},
  options?: {
    enabled?: boolean
    staleTime?: number
    refetchInterval?: number
  }
): UseQueryResult<BlogListItem[], Error> {
  return useQuery({
    queryKey: sanityQueryKeys.blogs(),
    queryFn: () => sanityService.getBlogs(filters),
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    refetchInterval: options?.refetchInterval,
    enabled: options?.enabled ?? true,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export function useSanityBlogsPaginated(
  filters: Parameters<typeof sanityService.getBlogsPaginated>[0] = {},
  options?: {
    enabled?: boolean
    staleTime?: number
    keepPreviousData?: boolean
  }
): UseQueryResult<PaginatedResponse<BlogListItem>, Error> {
  return useQuery({
    queryKey: sanityQueryKeys.blogsPaginated(filters),
    queryFn: () => sanityService.getBlogsPaginated(filters),
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
    keepPreviousData: options?.keepPreviousData ?? true,
    retry: 2,
  })
}

export function useSanityBlog(
  slug: string,
  options?: {
    enabled?: boolean
    staleTime?: number
  }
): UseQueryResult<SanityBlog | null, Error> {
  return useQuery({
    queryKey: sanityQueryKeys.blog(slug),
    queryFn: () => sanityService.getBlogBySlug(slug),
    staleTime: options?.staleTime ?? 10 * 60 * 1000, // 10 minutes for individual posts
    enabled: (options?.enabled ?? true) && !!slug,
    retry: 2,
  })
}

export function useSanityRelatedBlogs(
  currentBlogId: string,
  category?: string,
  limit: number = 3,
  options?: {
    enabled?: boolean
    staleTime?: number
  }
): UseQueryResult<BlogListItem[], Error> {
  return useQuery({
    queryKey: sanityQueryKeys.blogsRelated(currentBlogId, category),
    queryFn: () => sanityService.getRelatedBlogs(currentBlogId, category, limit),
    staleTime: options?.staleTime ?? 15 * 60 * 1000, // 15 minutes
    enabled: (options?.enabled ?? true) && !!currentBlogId,
    retry: 1,
  })
}

// Case Study Hooks
export function useSanityCaseStudies(
  filters: CaseStudyFilters = {},
  options?: {
    enabled?: boolean
    staleTime?: number
    refetchInterval?: number
  }
): UseQueryResult<CaseStudyListItem[], Error> {
  return useQuery({
    queryKey: sanityQueryKeys.caseStudies(),
    queryFn: () => sanityService.getCaseStudies(filters),
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    refetchInterval: options?.refetchInterval,
    enabled: options?.enabled ?? true,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export function useSanityCaseStudiesPaginated(
  filters: Parameters<typeof sanityService.getCaseStudiesPaginated>[0] = {},
  options?: {
    enabled?: boolean
    staleTime?: number
    keepPreviousData?: boolean
  }
): UseQueryResult<PaginatedResponse<CaseStudyListItem>, Error> {
  return useQuery({
    queryKey: sanityQueryKeys.caseStudiesPaginated(filters),
    queryFn: () => sanityService.getCaseStudiesPaginated(filters),
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
    keepPreviousData: options?.keepPreviousData ?? true,
    retry: 2,
  })
}

export function useSanityCaseStudy(
  slug: string,
  options?: {
    enabled?: boolean
    staleTime?: number
  }
): UseQueryResult<SanityCaseStudy | null, Error> {
  return useQuery({
    queryKey: sanityQueryKeys.caseStudy(slug),
    queryFn: () => sanityService.getCaseStudyBySlug(slug),
    staleTime: options?.staleTime ?? 10 * 60 * 1000,
    enabled: (options?.enabled ?? true) && !!slug,
    retry: 2,
  })
}

export function useSanityRelatedCaseStudies(
  currentCaseStudyId: string,
  industry?: string,
  limit: number = 3,
  options?: {
    enabled?: boolean
    staleTime?: number
  }
): UseQueryResult<CaseStudyListItem[], Error> {
  return useQuery({
    queryKey: sanityQueryKeys.caseStudiesRelated(currentCaseStudyId, industry),
    queryFn: () => sanityService.getRelatedCaseStudies(currentCaseStudyId, industry, limit),
    staleTime: options?.staleTime ?? 15 * 60 * 1000,
    enabled: (options?.enabled ?? true) && !!currentCaseStudyId,
    retry: 1,
  })
}

export function useSanityFeaturedCaseStudies(
  limit: number = 3,
  options?: {
    enabled?: boolean
    staleTime?: number
  }
): UseQueryResult<CaseStudyListItem[], Error> {
  return useQuery({
    queryKey: [...sanityQueryKeys.caseStudies(), 'featured', limit],
    queryFn: () => sanityService.getFeaturedCaseStudies(limit),
    staleTime: options?.staleTime ?? 10 * 60 * 1000,
    enabled: options?.enabled ?? true,
    retry: 2,
  })
}

// Utility Hooks
export function useSanityBlogCategories(
  options?: {
    enabled?: boolean
    staleTime?: number
  }
): UseQueryResult<string[], Error> {
  return useQuery({
    queryKey: sanityQueryKeys.categories(),
    queryFn: () => sanityService.getBlogCategories(),
    staleTime: options?.staleTime ?? 30 * 60 * 1000, // 30 minutes
    enabled: options?.enabled ?? true,
    retry: 1,
  })
}

export function useSanityCaseStudyIndustries(
  options?: {
    enabled?: boolean
    staleTime?: number
  }
): UseQueryResult<string[], Error> {
  return useQuery({
    queryKey: sanityQueryKeys.industries(),
    queryFn: () => sanityService.getCaseStudyIndustries(),
    staleTime: options?.staleTime ?? 30 * 60 * 1000,
    enabled: options?.enabled ?? true,
    retry: 1,
  })
}

export function useSanityTags(
  options?: {
    enabled?: boolean
    staleTime?: number
  }
): UseQueryResult<{ blogTags: string[]; caseStudyTags: string[] }, Error> {
  return useQuery({
    queryKey: sanityQueryKeys.tags(),
    queryFn: () => sanityService.getAllTags(),
    staleTime: options?.staleTime ?? 30 * 60 * 1000,
    enabled: options?.enabled ?? true,
    retry: 1,
  })
}

// Search Hooks
export function useSanitySearch(
  query: string,
  limit: number = 10,
  options?: {
    enabled?: boolean
    staleTime?: number
  }
): UseQueryResult<{
  blogs: BlogListItem[]
  caseStudies: CaseStudyListItem[]
  total: number
}, Error> {
  return useQuery({
    queryKey: sanityQueryKeys.search(query),
    queryFn: () => sanityService.searchContent(query, limit),
    staleTime: options?.staleTime ?? 2 * 60 * 1000, // 2 minutes for search results
    enabled: (options?.enabled ?? true) && query.length >= 2,
    retry: 1,
  })
}

// Faceted Search Hooks
export function useSanityBlogFacets(
  options?: {
    enabled?: boolean
    staleTime?: number
  }
): UseQueryResult<{
  categories: Array<{ value: string; count: number }>
  authors: Array<{ value: string; count: number }>
  tags: Array<{ value: string; count: number }>
}, Error> {
  return useQuery({
    queryKey: sanityQueryKeys.facets('blog'),
    queryFn: () => sanityService.getBlogFacets(),
    staleTime: options?.staleTime ?? 15 * 60 * 1000,
    enabled: options?.enabled ?? true,
    retry: 1,
  })
}

export function useSanityCaseStudyFacets(
  options?: {
    enabled?: boolean
    staleTime?: number
  }
): UseQueryResult<{
  industries: Array<{ value: string; count: number }>
  tags: Array<{ value: string; count: number }>
}, Error> {
  return useQuery({
    queryKey: sanityQueryKeys.facets('caseStudy'),
    queryFn: () => sanityService.getCaseStudyFacets(),
    staleTime: options?.staleTime ?? 15 * 60 * 1000,
    enabled: options?.enabled ?? true,
    retry: 1,
  })
}

// Statistics Hook
export function useSanityContentStats(
  options?: {
    enabled?: boolean
    staleTime?: number
    refetchInterval?: number
  }
): UseQueryResult<{
  totalBlogs: number
  totalCaseStudies: number
  publishedBlogs: number
  publishedCaseStudies: number
  draftBlogs: number
  draftCaseStudies: number
}, Error> {
  return useQuery({
    queryKey: sanityQueryKeys.stats(),
    queryFn: () => sanityService.getContentStats(),
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    refetchInterval: options?.refetchInterval,
    enabled: options?.enabled ?? true,
    retry: 1,
  })
}

// Prefetch utilities for performance optimization
export function useSanityPrefetch() {
  const queryClient = useQuery.getQueryClient?.() // Get query client if available
  
  const prefetchBlog = (slug: string) => {
    if (queryClient) {
      queryClient.prefetchQuery({
        queryKey: sanityQueryKeys.blog(slug),
        queryFn: () => sanityService.getBlogBySlug(slug),
        staleTime: 10 * 60 * 1000,
      })
    }
  }

  const prefetchCaseStudy = (slug: string) => {
    if (queryClient) {
      queryClient.prefetchQuery({
        queryKey: sanityQueryKeys.caseStudy(slug),
        queryFn: () => sanityService.getCaseStudyBySlug(slug),
        staleTime: 10 * 60 * 1000,
      })
    }
  }

  const prefetchRelatedContent = (type: 'blog' | 'caseStudy', id: string, category?: string) => {
    if (queryClient) {
      if (type === 'blog') {
        queryClient.prefetchQuery({
          queryKey: sanityQueryKeys.blogsRelated(id, category),
          queryFn: () => sanityService.getRelatedBlogs(id, category, 3),
          staleTime: 15 * 60 * 1000,
        })
      } else {
        queryClient.prefetchQuery({
          queryKey: sanityQueryKeys.caseStudiesRelated(id, category),
          queryFn: () => sanityService.getRelatedCaseStudies(id, category, 3),
          staleTime: 15 * 60 * 1000,
        })
      }
    }
  }

  return {
    prefetchBlog,
    prefetchCaseStudy,
    prefetchRelatedContent,
  }
}

// Cache invalidation utilities
export function useSanityInvalidation() {
  const queryClient = useQuery.getQueryClient?.()
  
  const invalidateBlogs = () => {
    if (queryClient) {
      queryClient.invalidateQueries({ queryKey: sanityQueryKeys.blogs() })
    }
  }

  const invalidateCaseStudies = () => {
    if (queryClient) {
      queryClient.invalidateQueries({ queryKey: sanityQueryKeys.caseStudies() })
    }
  }

  const invalidateAll = () => {
    if (queryClient) {
      queryClient.invalidateQueries({ queryKey: sanityQueryKeys.all })
    }
  }

  const invalidateSearch = () => {
    if (queryClient) {
      queryClient.invalidateQueries({ 
        queryKey: sanityQueryKeys.all,
        predicate: (query) => query.queryKey.includes('search')
      })
    }
  }

  return {
    invalidateBlogs,
    invalidateCaseStudies,
    invalidateAll,
    invalidateSearch,
  }
}