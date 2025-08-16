import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  Share2,
  X,
  Loader2,
  RefreshCw
} from "lucide-react";
import { SEO } from "../SEO";
import { useSanityBlogsWithFallback } from "../../hooks/useSanityWithFallback";
import { useFallback } from "../FallbackProvider";
import type { BlogFilters } from "../../types/sanity";

interface SanityBlogListProps {
  initialFilters?: BlogFilters;
  showSearch?: boolean;
  showCategories?: boolean;
  showPagination?: boolean;
  itemsPerPage?: number;
  className?: string;
}

const SanityBlogList: React.FC<SanityBlogListProps> = ({
  initialFilters = {},
  showSearch = true,
  showCategories = true,
  showPagination = true,
  itemsPerPage = 10,
  className = ""
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [currentPage, setCurrentPage] = useState(1);
  
  const { contentSource, isSanityHealthy } = useFallback();

  // Build filters for API call
  const filters: BlogFilters = useMemo(() => ({
    ...initialFilters,
    search: searchQuery.trim() || undefined,
    status: 'published',
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  }), [initialFilters, searchQuery, currentPage, itemsPerPage]);

  // Fetch blogs with fallback
  const { data: blogsResponse, isLoading, error, refetch } = useSanityBlogsWithFallback(filters);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" }
      );
    }

    if (cardsRef.current && !isLoading) {
      gsap.fromTo(
        cardsRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      );
    }
  }, [isLoading]);

  // Extract blog posts from response
  const blogPosts = blogsResponse?.data || [];
  const dataSource = blogsResponse?.source || 'sanity';
  
  // Debug logging
  console.log('SanityBlogList - Data Source:', dataSource);
  console.log('SanityBlogList - Blogs Response:', blogsResponse);
  console.log('SanityBlogList - Is Sanity Healthy:', isSanityHealthy);
  console.log('SanityBlogList - Content Source:', contentSource);
  
  // Calculate total pages (simplified for now)
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);

  const categories = [
    "All Posts",
    "Background Screening",
    "Risk Management",
    "Employment Screening",
    "Legal Compliance",
    "Technology"
  ];

  // Filter posts by category (client-side filtering for categories)
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All Posts") {
      return blogPosts;
    }
    return blogPosts.filter(post => post.category === selectedCategory);
  }, [blogPosts, selectedCategory]);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Helper function to calculate read time
  const calculateReadTime = (readTime?: number) => {
    return readTime ? `${readTime} min read` : '5 min read';
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefresh = async () => {
    await refetch();
  };

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <span className="ml-2 text-gray-600 dark:text-gray-300">
        Loading blogs from {dataSource === 'sanity' ? 'Sanity CMS' : 'Legacy API'}...
      </span>
    </div>
  );

  // Error component
  const ErrorMessage = () => (
    <div className="text-center py-12">
      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Unable to load blogs
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {error?.message || 'Something went wrong while fetching blogs.'}
      </p>
      <div className="flex gap-2 justify-center">
        <button
          onClick={handleRefresh}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
        {dataSource === 'sanity' && !isSanityHealthy && (
          <div className="text-sm text-yellow-600 dark:text-yellow-400">
            Sanity CMS is currently unavailable. Trying fallback...
          </div>
        )}
      </div>
    </div>
  );

  // Data source indicator
  const DataSourceIndicator = () => (
    <div className="mb-4 text-center">
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
        dataSource === 'sanity' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      }`}>
        <div className={`w-2 h-2 rounded-full ${
          dataSource === 'sanity' ? 'bg-green-500' : 'bg-yellow-500'
        }`} />
        Content from {dataSource === 'sanity' ? 'Sanity CMS' : 'Legacy API'}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${className}`}>
      <SEO
        title="Expert Insights on Background Screening | IntelliDelve Blog"
        description="Stay informed with the latest insights on background checks, employment screening, risk management, and compliance. Expert articles to help protect your business."
        keywords="background check blog, employment screening insights, risk management articles, compliance updates, hiring best practices"
        canonicalUrl="/blogs"
      />

      <section
        ref={heroRef}
        className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-brand-navy dark:via-brand-navy/90 dark:to-purple-900/20 pt-20 pb-16 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-20 blur-sm"
          style={{
            backgroundImage: `url('/images/downloaded/unsplash-photo-1497366216548-37526070297c.jpg')`,
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Search className="w-4 h-4" />
              Expert Insights & Industry Knowledge
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              IntelliDelve
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-purple-300">
                Insights Blog
              </span>
            </h1>

            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Stay ahead with expert insights on background screening, risk management,
              and compliance. Your trusted resource for making informed business decisions.
            </p>

            {showSearch && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleRefresh}
                    className="inline-flex items-center gap-2 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                    title="Refresh blogs data"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                  >
                    Get Expert Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full animate-pulse delay-1000"></div>
      </section>

      {showCategories && (
        <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    category === selectedCategory
                      ? "bg-primary text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Debug Data Source Indicator */}
          {/* <div className="mb-8 p-4 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Debug Info:</h3>
            <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <p><strong>Data Source:</strong> {dataSource}</p>
              <p><strong>Sanity Healthy:</strong> {isSanityHealthy ? 'Yes' : 'No'}</p>
              <p><strong>Content Source:</strong> {contentSource}</p>
              <p><strong>Blog Posts Count:</strong> {blogPosts.length}</p>
              <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
              <p><strong>Error:</strong> {error ? 'Yes' : 'No'}</p>
            </div>
          </div> */}
          
          <DataSourceIndicator />
          
          {/* Show loading state */}
          {isLoading && <LoadingSpinner />}

          {/* Show error state */}
          {error && !isLoading && <ErrorMessage />}

          {/* Show content when loaded successfully */}
          {!isLoading && !error && (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {searchQuery || selectedCategory !== "All Posts" ? "Search Results" : "Latest Articles"}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {searchQuery || selectedCategory !== "All Posts"
                    ? `Found ${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} ${searchQuery ? `matching "${searchQuery}"` : `in "${selectedCategory}"`}`
                    : "Explore our comprehensive library of articles on background screening and business protection"
                  }
                </p>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    No articles found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {searchQuery
                      ? `No articles match "${searchQuery}". Try different keywords or browse by category.`
                      : `No articles found in "${selectedCategory}" category.`
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      >
                        <X className="w-4 h-4" />
                        Clear Search
                      </button>
                    )}
                    <button
                      onClick={() => handleCategorySelect("All Posts")}
                      className="inline-flex items-center gap-2 border border-primary text-primary dark:text-sky-300 px-6 py-3 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-sky-300 dark:hover:text-brand-navy transition-colors font-medium"
                    >
                      <ArrowRight className="w-4 h-4" />
                      View All Posts
                    </button>
                  </div>
                </div>
              ) : (
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <article
                      key={post._id}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={post.featuredImage || "/images/downloaded/unsplash-photo-1560472354-b33ff0c44a43.jpg"}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.publishedAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {calculateReadTime(post.readTime)}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-sky-300 transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <Link
                            to={`/blogs/${post.slug}`}
                            className="inline-flex items-center gap-2 text-primary dark:text-sky-300 hover:text-primary/80 dark:hover:text-sky-300/80 font-medium transition-colors"
                          >
                            Read Full Article
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <button className="p-2 text-gray-400 hover:text-primary dark:hover:text-sky-300 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Pagination Section */}
      {showPagination && !isLoading && !error && totalPages > 1 && (
        <section className="py-8 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    page === currentPage
                      ? 'text-white bg-primary border border-primary'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </div>

            <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
              Showing page {currentPage} of {totalPages} ({filteredPosts.length} total articles)
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gradient-to-r from-primary to-purple-600 dark:from-brand-navy dark:to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <Shield className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Protect Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Don't let hiring risks cost you money. Get expert background screening solutions tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium shadow-lg"
              >
                <CheckCircle className="w-5 h-5" />
                Get Free Consultation
              </Link>
              <Link
                to="/what-we-offer"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-medium"
              >
                <TrendingUp className="w-5 h-5" />
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SanityBlogList;