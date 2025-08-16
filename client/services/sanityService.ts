import {
  safeSanityFetch,
  transformSanityImage,
  groq
} from '../lib/sanity'
import type {
  SanityBlog,
  SanityCaseStudy,
  BlogFilters,
  CaseStudyFilters,
  BlogListItem,
  CaseStudyListItem,
  SanityImageWithUrl
} from '../types/sanity'

// Enhanced filter interfaces
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface AdvancedBlogFilters extends BlogFilters {
  dateFrom?: string
  dateTo?: string
  author?: string
  sortBy?: 'publishedAt' | 'title' | '_createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface AdvancedCaseStudyFilters extends CaseStudyFilters {
  dateFrom?: string
  dateTo?: string
  client?: string
  sortBy?: 'publishedAt' | 'title' | 'client' | 'industry'
  sortOrder?: 'asc' | 'desc'
}

// Clean GROQ query fragments
const BLOG_BASE_FIELDS = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  author,
  publishedAt,
  excerpt,
  featuredImage {
    ...,
    "url": asset->url
  },
  category,
  tags,
  status
`

const BLOG_FULL_FIELDS = `
  ${BLOG_BASE_FIELDS},
  content,
  seo,
  "readTime": round(length(pt::text(content)) / 5 / 180)
`

const CASE_STUDY_BASE_FIELDS = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  client,
  industry,
  location,
  duration,
  completedDate,
  featuredImage {
    ...,
    "url": asset->url
  },
  tags,
  publishedAt,
  status,
  featured
`

const CASE_STUDY_FULL_FIELDS = `
  ${CASE_STUDY_BASE_FIELDS},
  challenge,
  solution,
  implementation,
  results,
  testimonial {
    ...,
    authorImage {
      ...,
      "url": asset->url
    }
  },
  gallery[] {
    ...,
    "url": asset->url
  }
`

export class SanityService {
  // Helper methods
  private buildBlogFilter(filters: AdvancedBlogFilters): string {
    const conditions = ['_type == "blog"']
    
    if (filters.status) {
      conditions.push(`status == "${filters.status}"`)
    }
    if (filters.category) {
      conditions.push(`category == "${filters.category}"`)
    }
    if (filters.tag) {
      conditions.push(`"${filters.tag}" in tags`)
    }
    if (filters.author) {
      conditions.push(`author match "${filters.author}*"`)
    }
    if (filters.dateFrom) {
      conditions.push(`publishedAt >= "${filters.dateFrom}"`)
    }
    if (filters.dateTo) {
      conditions.push(`publishedAt <= "${filters.dateTo}"`)
    }
    if (filters.search) {
      const searchTerm = filters.search.replace(/"/g, '')
      conditions.push(`(title match "${searchTerm}*" || excerpt match "${searchTerm}*" || pt::text(content) match "${searchTerm}*")`)
    }
    
    return conditions.join(' && ')
  }

  private buildCaseStudyFilter(filters: AdvancedCaseStudyFilters): string {
    const conditions = ['_type == "caseStudy"']
    
    if (filters.status) {
      conditions.push(`status == "${filters.status}"`)
    }
    if (filters.industry) {
      conditions.push(`industry == "${filters.industry}"`)
    }
    if (filters.tag) {
      conditions.push(`"${filters.tag}" in tags`)
    }
    if (filters.client) {
      conditions.push(`client match "${filters.client}*"`)
    }
    if (filters.featured !== undefined) {
      conditions.push(`featured == ${filters.featured}`)
    }
    if (filters.dateFrom) {
      conditions.push(`publishedAt >= "${filters.dateFrom}"`)
    }
    if (filters.dateTo) {
      conditions.push(`publishedAt <= "${filters.dateTo}"`)
    }
    if (filters.search) {
      const searchTerm = filters.search.replace(/"/g, '')
      conditions.push(`(title match "${searchTerm}*" || client match "${searchTerm}*" || industry match "${searchTerm}*")`)
    }
    
    return conditions.join(' && ')
  }

  private buildOrderBy(sortBy?: string, sortOrder: 'asc' | 'desc' = 'desc'): string {
    if (!sortBy) return 'order(publishedAt desc)'
    return `order(${sortBy} ${sortOrder})`
  }

  private createPaginationRange(offset: number, limit: number): string {
    const start = Math.max(0, offset)
    const end = start + Math.max(1, Math.min(limit, 100)) - 1
    return `[${start}...${end}]`
  }

  private transformBlogToListItem(blog: SanityBlog): BlogListItem {
    return {
      _id: blog._id,
      title: blog.title,
      slug: blog.slug?.current || '',
      author: blog.author,
      publishedAt: blog.publishedAt,
      excerpt: blog.excerpt,
      featuredImage: blog.featuredImage?.url,
      category: blog.category,
      tags: blog.tags || [],
      readTime: (blog as any).readTime || 5,
      status: blog.status
    }
  }

  private transformCaseStudyToListItem(caseStudy: SanityCaseStudy): CaseStudyListItem {
    return {
      _id: caseStudy._id,
      title: caseStudy.title,
      slug: caseStudy.slug?.current || '',
      client: caseStudy.client,
      industry: caseStudy.industry,
      featuredImage: caseStudy.featuredImage?.url,
      results: caseStudy.results || [],
      tags: caseStudy.tags || [],
      publishedAt: caseStudy.publishedAt,
      featured: caseStudy.featured || false,
      status: caseStudy.status
    }
  }

  // Blog methods
  async getBlogs(filters: BlogFilters = {}): Promise<BlogListItem[]> {
    const { limit = 10, offset = 0 } = filters
    const filterString = this.buildBlogFilter(filters)
    const paginationRange = this.createPaginationRange(offset, limit)

    const query = groq`
      *[${filterString}] | order(publishedAt desc)${paginationRange} {
        ${BLOG_BASE_FIELDS}
      }
    `

    try {
      const blogs = await safeSanityFetch<SanityBlog[]>(query)
      return blogs.map(blog => this.transformBlogToListItem(blog))
    } catch (error) {
      console.error('Error fetching blogs:', error)
      throw new Error('Failed to fetch blogs')
    }
  }

  async getBlogsPaginated(filters: AdvancedBlogFilters = {}): Promise<PaginatedResponse<BlogListItem>> {
    const { limit = 10, offset = 0, sortBy = 'publishedAt', sortOrder = 'desc' } = filters
    const filterString = this.buildBlogFilter(filters)
    const orderBy = this.buildOrderBy(sortBy, sortOrder)
    const paginationRange = this.createPaginationRange(offset, limit)

    const countQuery = groq`count(*[${filterString}])`
    const dataQuery = groq`
      *[${filterString}] | ${orderBy}${paginationRange} {
        ${BLOG_BASE_FIELDS}
      }
    `

    try {
      const [total, blogs] = await Promise.all([
        safeSanityFetch<number>(countQuery),
        safeSanityFetch<SanityBlog[]>(dataQuery)
      ])

      const data = blogs.map(blog => this.transformBlogToListItem(blog))
      const page = Math.floor(offset / limit) + 1
      const hasMore = offset + limit < total

      return { data, total, page, limit, hasMore }
    } catch (error) {
      console.error('Error fetching paginated blogs:', error)
      throw new Error('Failed to fetch paginated blogs')
    }
  }

  async getBlogBySlug(slug: string): Promise<SanityBlog | null> {
    const query = groq`
      *[_type == "blog" && slug.current == $slug && status == "published"][0] {
        ${BLOG_FULL_FIELDS}
      }
    `

    try {
      const blog = await safeSanityFetch<SanityBlog | null>(query, { slug })
      if (blog?.featuredImage) {
        blog.featuredImage = transformSanityImage(blog.featuredImage)
      }
      return blog
    } catch (error) {
      console.error('Error fetching blog by slug:', error)
      throw new Error('Failed to fetch blog')
    }
  }

  async getBlogById(id: string): Promise<SanityBlog | null> {
    const query = groq`
      *[_type == "blog" && _id == $id][0] {
        ${BLOG_FULL_FIELDS}
      }
    `

    try {
      const blog = await safeSanityFetch<SanityBlog | null>(query, { id })
      if (blog?.featuredImage) {
        blog.featuredImage = transformSanityImage(blog.featuredImage)
      }
      return blog
    } catch (error) {
      console.error('Error fetching blog by ID:', error)
      throw new Error('Failed to fetch blog')
    }
  }

  async getRelatedBlogs(currentBlogId: string, category?: string, limit: number = 3): Promise<BlogListItem[]> {
    const conditions = [
      '_type == "blog"',
      'status == "published"',
      `_id != "${currentBlogId}"`
    ]
    
    if (category) {
      conditions.push(`category == "${category}"`)
    }
    
    const filterString = conditions.join(' && ')
    const paginationRange = this.createPaginationRange(0, limit)

    const query = groq`
      *[${filterString}] | order(publishedAt desc)${paginationRange} {
        ${BLOG_BASE_FIELDS}
      }
    `

    try {
      const blogs = await safeSanityFetch<SanityBlog[]>(query)
      return blogs.map(blog => this.transformBlogToListItem(blog))
    } catch (error) {
      console.error('Error fetching related blogs:', error)
      return []
    }
  }

  // Case Study methods
  async getCaseStudies(filters: CaseStudyFilters = {}): Promise<CaseStudyListItem[]> {
    const { limit = 10, offset = 0 } = filters
    const filterString = this.buildCaseStudyFilter(filters)
    const orderBy = filters.featured ? 'order(featured desc, publishedAt desc)' : 'order(publishedAt desc)'
    const paginationRange = this.createPaginationRange(offset, limit)

    const query = groq`
      *[${filterString}] | ${orderBy}${paginationRange} {
        ${CASE_STUDY_BASE_FIELDS},
        results
      }
    `

    try {
      const caseStudies = await safeSanityFetch<SanityCaseStudy[]>(query)
      return caseStudies.map(cs => this.transformCaseStudyToListItem(cs))
    } catch (error) {
      console.error('Error fetching case studies:', error)
      throw new Error('Failed to fetch case studies')
    }
  }

  async getCaseStudiesPaginated(filters: AdvancedCaseStudyFilters = {}): Promise<PaginatedResponse<CaseStudyListItem>> {
    const { limit = 10, offset = 0, sortBy = 'publishedAt', sortOrder = 'desc' } = filters
    const filterString = this.buildCaseStudyFilter(filters)
    const orderBy = filters.featured ? 'order(featured desc, publishedAt desc)' : this.buildOrderBy(sortBy, sortOrder)
    const paginationRange = this.createPaginationRange(offset, limit)

    const countQuery = groq`count(*[${filterString}])`
    const dataQuery = groq`
      *[${filterString}] | ${orderBy}${paginationRange} {
        ${CASE_STUDY_BASE_FIELDS},
        results
      }
    `

    try {
      const [total, caseStudies] = await Promise.all([
        safeSanityFetch<number>(countQuery),
        safeSanityFetch<SanityCaseStudy[]>(dataQuery)
      ])

      const data = caseStudies.map(cs => this.transformCaseStudyToListItem(cs))
      const page = Math.floor(offset / limit) + 1
      const hasMore = offset + limit < total

      return { data, total, page, limit, hasMore }
    } catch (error) {
      console.error('Error fetching paginated case studies:', error)
      throw new Error('Failed to fetch paginated case studies')
    }
  }

  async getCaseStudyBySlug(slug: string): Promise<SanityCaseStudy | null> {
    const query = groq`
      *[_type == "caseStudy" && slug.current == $slug && status == "published"][0] {
        ${CASE_STUDY_FULL_FIELDS}
      }
    `

    try {
      const caseStudy = await safeSanityFetch<SanityCaseStudy | null>(query, { slug })
      
      if (caseStudy) {
        if (caseStudy.featuredImage) {
          caseStudy.featuredImage = transformSanityImage(caseStudy.featuredImage)
        }
        if (caseStudy.testimonial?.authorImage) {
          caseStudy.testimonial.authorImage = transformSanityImage(caseStudy.testimonial.authorImage)
        }
        if (caseStudy.gallery) {
          caseStudy.gallery = caseStudy.gallery
            .map(img => transformSanityImage(img))
            .filter(Boolean) as SanityImageWithUrl[]
        }
      }
      
      return caseStudy
    } catch (error) {
      console.error('Error fetching case study by slug:', error)
      throw new Error('Failed to fetch case study')
    }
  }

  async getCaseStudyById(id: string): Promise<SanityCaseStudy | null> {
    const query = groq`
      *[_type == "caseStudy" && _id == $id][0] {
        ${CASE_STUDY_FULL_FIELDS}
      }
    `

    try {
      const caseStudy = await safeSanityFetch<SanityCaseStudy | null>(query, { id })
      
      if (caseStudy) {
        if (caseStudy.featuredImage) {
          caseStudy.featuredImage = transformSanityImage(caseStudy.featuredImage)
        }
        if (caseStudy.testimonial?.authorImage) {
          caseStudy.testimonial.authorImage = transformSanityImage(caseStudy.testimonial.authorImage)
        }
        if (caseStudy.gallery) {
          caseStudy.gallery = caseStudy.gallery
            .map(img => transformSanityImage(img))
            .filter(Boolean) as SanityImageWithUrl[]
        }
      }
      
      return caseStudy
    } catch (error) {
      console.error('Error fetching case study by ID:', error)
      throw new Error('Failed to fetch case study')
    }
  }

  async getFeaturedCaseStudies(limit: number = 3): Promise<CaseStudyListItem[]> {
    return this.getCaseStudies({ featured: true, limit })
  }

  async getRelatedCaseStudies(currentCaseStudyId: string, industry?: string, limit: number = 3): Promise<CaseStudyListItem[]> {
    const conditions = [
      '_type == "caseStudy"',
      'status == "published"',
      `_id != "${currentCaseStudyId}"`
    ]
    
    if (industry) {
      conditions.push(`industry == "${industry}"`)
    }
    
    const filterString = conditions.join(' && ')
    const paginationRange = this.createPaginationRange(0, limit)

    const query = groq`
      *[${filterString}] | order(publishedAt desc)${paginationRange} {
        ${CASE_STUDY_BASE_FIELDS},
        results
      }
    `

    try {
      const caseStudies = await safeSanityFetch<SanityCaseStudy[]>(query)
      return caseStudies.map(cs => this.transformCaseStudyToListItem(cs))
    } catch (error) {
      console.error('Error fetching related case studies:', error)
      return []
    }
  }

  // Utility methods
  async getBlogCategories(): Promise<string[]> {
    const query = groq`
      array::unique(*[_type == "blog" && status == "published" && defined(category)].category)
    `

    try {
      const categories = await safeSanityFetch<string[]>(query)
      return categories.filter(Boolean)
    } catch (error) {
      console.error('Error fetching blog categories:', error)
      return []
    }
  }

  async getCaseStudyIndustries(): Promise<string[]> {
    const query = groq`
      array::unique(*[_type == "caseStudy" && status == "published" && defined(industry)].industry)
    `

    try {
      const industries = await safeSanityFetch<string[]>(query)
      return industries.filter(Boolean)
    } catch (error) {
      console.error('Error fetching case study industries:', error)
      return []
    }
  }

  async getAllTags(): Promise<{ blogTags: string[], caseStudyTags: string[] }> {
    const query = groq`
      {
        "blogTags": array::unique(*[_type == "blog" && status == "published" && defined(tags)].tags[]),
        "caseStudyTags": array::unique(*[_type == "caseStudy" && status == "published" && defined(tags)].tags[])
      }
    `

    try {
      const result = await safeSanityFetch<{ blogTags: string[], caseStudyTags: string[] }>(query)
      return {
        blogTags: result.blogTags.filter(Boolean),
        caseStudyTags: result.caseStudyTags.filter(Boolean)
      }
    } catch (error) {
      console.error('Error fetching tags:', error)
      return { blogTags: [], caseStudyTags: [] }
    }
  }

  // Search methods
  async searchContent(searchQuery: string, limit: number = 10): Promise<{
    blogs: BlogListItem[]
    caseStudies: CaseStudyListItem[]
    total: number
  }> {
    const cleanQuery = searchQuery.replace(/"/g, '')
    const blogLimit = Math.ceil(limit / 2)
    const caseStudyLimit = Math.floor(limit / 2)
    
    const blogFilter = `_type == "blog" && status == "published" && (title match "${cleanQuery}*" || excerpt match "${cleanQuery}*" || pt::text(content) match "${cleanQuery}*")`
    const caseStudyFilter = `_type == "caseStudy" && status == "published" && (title match "${cleanQuery}*" || client match "${cleanQuery}*" || industry match "${cleanQuery}*")`
    
    const blogRange = this.createPaginationRange(0, blogLimit)
    const caseStudyRange = this.createPaginationRange(0, caseStudyLimit)
    
    const query = groq`
      {
        "blogs": *[${blogFilter}] | order(publishedAt desc)${blogRange} {
          ${BLOG_BASE_FIELDS}
        },
        "caseStudies": *[${caseStudyFilter}] | order(publishedAt desc)${caseStudyRange} {
          ${CASE_STUDY_BASE_FIELDS},
          results
        }
      }
    `

    try {
      const { blogs, caseStudies } = await safeSanityFetch<{
        blogs: SanityBlog[]
        caseStudies: SanityCaseStudy[]
      }>(query)

      const blogResults = blogs.map(blog => this.transformBlogToListItem(blog))
      const caseStudyResults = caseStudies.map(cs => this.transformCaseStudyToListItem(cs))

      return {
        blogs: blogResults,
        caseStudies: caseStudyResults,
        total: blogResults.length + caseStudyResults.length
      }
    } catch (error) {
      console.error('Error searching content:', error)
      return { blogs: [], caseStudies: [], total: 0 }
    }
  }

  // Statistics
  async getContentStats(): Promise<{
    totalBlogs: number
    totalCaseStudies: number
    publishedBlogs: number
    publishedCaseStudies: number
    draftBlogs: number
    draftCaseStudies: number
  }> {
    const query = groq`
      {
        "totalBlogs": count(*[_type == "blog"]),
        "totalCaseStudies": count(*[_type == "caseStudy"]),
        "publishedBlogs": count(*[_type == "blog" && status == "published"]),
        "publishedCaseStudies": count(*[_type == "caseStudy" && status == "published"]),
        "draftBlogs": count(*[_type == "blog" && status == "draft"]),
        "draftCaseStudies": count(*[_type == "caseStudy" && status == "draft"])
      }
    `

    try {
      return await safeSanityFetch(query)
    } catch (error) {
      console.error('Error fetching content stats:', error)
      return {
        totalBlogs: 0,
        totalCaseStudies: 0,
        publishedBlogs: 0,
        publishedCaseStudies: 0,
        draftBlogs: 0,
        draftCaseStudies: 0
      }
    }
  }
}

// Export singleton instance
export const sanityService = new SanityService()
export default sanityService
