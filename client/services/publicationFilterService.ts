import { BlogPost, CaseStudy, BlogFilters, CaseStudyFilters } from './apiService';

/**
 * Query options interface for standardized filtering
 */
export interface QueryOptions {
  filters: {
    status: 'published';
    [key: string]: any;
  };
  pagination?: {
    page?: number;
    limit?: number;
  };
  search?: string;
  orderBy?: string;
}

/**
 * Publication Filter Service
 * 
 * Centralized service to ensure all public queries filter by publication status.
 * This prevents draft or archived content from appearing on public pages.
 */
export class PublicationFilterService {
  /**
   * Creates standardized query options for public blog queries
   * Always includes status: 'published' filter
   */
  getPublicBlogsQuery(filters?: BlogFilters): QueryOptions {
    const queryOptions: QueryOptions = {
      filters: {
        status: 'published' as const,
      },
    };

    if (filters) {
      // Add pagination
      if (filters.page || filters.limit) {
        queryOptions.pagination = {
          page: filters.page,
          limit: filters.limit,
        };
      }

      // Add search
      if (filters.search) {
        queryOptions.search = filters.search;
      }

      // Add category filter (but never allow status override)
      if (filters.category) {
        queryOptions.filters.category = filters.category;
      }

      // Explicitly ignore any status filter from input to prevent bypass
      // Only published content should be visible publicly
    }

    return queryOptions;
  }

  /**
   * Creates standardized query options for public case study queries
   * Always includes status: 'published' filter
   */
  getPublicCaseStudiesQuery(filters?: CaseStudyFilters): QueryOptions {
    const queryOptions: QueryOptions = {
      filters: {
        status: 'published' as const,
      },
    };

    if (filters) {
      // Add pagination
      if (filters.page || filters.limit) {
        queryOptions.pagination = {
          page: filters.page,
          limit: filters.limit,
        };
      }

      // Add search
      if (filters.search) {
        queryOptions.search = filters.search;
      }

      // Add industry filter (but never allow status override)
      if (filters.industry) {
        queryOptions.filters.industry = filters.industry;
      }

      // Explicitly ignore any status filter from input to prevent bypass
      // Only published content should be visible publicly
    }

    return queryOptions;
  }

  /**
   * Validates if a blog post or case study is publicly visible
   * Returns true only for published content
   */
  isPubliclyVisible(item: BlogPost | CaseStudy): boolean {
    if (!item || !item.status) {
      return false;
    }

    return item.status === 'published';
  }

  /**
   * Validates if content should be accessible to public users
   * This is a more comprehensive check that can be extended with additional rules
   */
  validatePublicAccess(item: BlogPost | CaseStudy): boolean {
    // Check basic publication status
    if (!this.isPubliclyVisible(item)) {
      return false;
    }

    // Additional validation rules can be added here:
    // - Check if content is scheduled for future publication
    // - Check if content has expired
    // - Check if content is geo-restricted
    // - Check if content requires authentication

    return true;
  }

  /**
   * Converts QueryOptions to URL search parameters for API calls
   * This ensures consistent parameter formatting across all API requests
   */
  buildApiParams(queryOptions: QueryOptions): URLSearchParams {
    const params = new URLSearchParams();

    // Always add the published status filter
    params.append('status', queryOptions.filters.status);

    // Add other filters
    Object.entries(queryOptions.filters).forEach(([key, value]) => {
      if (key !== 'status' && value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    // Add pagination
    if (queryOptions.pagination?.page) {
      params.append('page', queryOptions.pagination.page.toString());
    }
    if (queryOptions.pagination?.limit) {
      params.append('limit', queryOptions.pagination.limit.toString());
    }

    // Add search
    if (queryOptions.search) {
      params.append('search', queryOptions.search);
    }

    return params;
  }

  /**
   * Security method to detect and log attempts to bypass publication filters
   * This helps identify potential security issues or bugs in the application
   */
  detectFilterBypass(originalFilters: BlogFilters | CaseStudyFilters): boolean {
    if (originalFilters?.status && originalFilters.status !== 'published') {
      console.warn('🚨 PublicationFilterService: Attempt to bypass publication filter detected', {
        requestedStatus: originalFilters.status,
        timestamp: new Date().toISOString(),
        stack: new Error().stack,
      });
      return true;
    }
    return false;
  }

  /**
   * Validates that API response data only contains published content
   * This is a safety check to ensure backend is also filtering correctly
   */
  validateApiResponse(data: (BlogPost | CaseStudy)[]): {
    isValid: boolean;
    invalidItems: (BlogPost | CaseStudy)[];
  } {
    const invalidItems = data.filter(item => !this.isPubliclyVisible(item));
    
    if (invalidItems.length > 0) {
      console.error('🚨 PublicationFilterService: API returned non-published content', {
        invalidCount: invalidItems.length,
        invalidItems: invalidItems.map(item => ({ id: item.id, status: item.status })),
        timestamp: new Date().toISOString(),
      });
    }

    return {
      isValid: invalidItems.length === 0,
      invalidItems,
    };
  }
}

// Export singleton instance
export const publicationFilterService = new PublicationFilterService();

// Export for testing
export default PublicationFilterService;