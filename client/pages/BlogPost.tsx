import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { gsap } from "gsap";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Eye,
  CheckCircle,
  Shield,
  AlertTriangle,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Loader2
} from "lucide-react";
import { SEO } from "../components/SEO";
import { useBlog, useBlogs, useImagesForContent } from "../hooks/useApi";

const BlogPost = () => {
  const { id } = useParams();
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Log the ID being used
  console.log('🎯 BlogPost - ID from params:', id);

  // Fetch blog post from API
  const { data: blogResponse, isLoading, error } = useBlog(id || '', !!id);
  
  // Fetch images for this blog post
  const { data: imagesResponse, isLoading: imagesLoading } = useImagesForContent(
    'blog', 
    id || '', 
    !!id && !!blogResponse?.success
  );
  
  // More defensive data extraction
  let blogPost = null;
  if (blogResponse) {
    console.log('📡 Raw API Response:', blogResponse);
    if (blogResponse.success && blogResponse.data) {
      blogPost = blogResponse.data;
    } else if (blogResponse.data) {
      // Sometimes the API might return data directly without success wrapper
      blogPost = blogResponse.data;
    } else if (Array.isArray(blogResponse) && blogResponse.length > 0) {
      // Handle case where API returns array
      blogPost = blogResponse[0];
    }
  }
  
  // Extract images data
  const blogImages = imagesResponse?.success ? imagesResponse.data : [];
  
  // Fetch related blogs from API
  const { data: relatedBlogsResponse, isLoading: relatedLoading } = useBlogs({ 
    status: 'published', 
    limit: 5 
  });
  
  // Comprehensive debug logging
  console.log('🚨 COMPREHENSIVE DEBUG:', {
    id,
    hasId: !!id,
    isLoading,
    error: error?.message,
    blogResponse,
    blogPost,
    blogPostExists: !!blogPost,
    blogPostKeys: blogPost ? Object.keys(blogPost) : [],
  });
  
  // Calculate read time based on content length
  const calculateReadTime = (content: string) => {
    if (!content) return '5 min read';
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  // Animation effects
  useEffect(() => {
    if (blogPost && contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }

    if (blogPost && sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current.children,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      );
    }
  }, [blogPost]);

  // Early return for missing ID
  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Invalid Blog Post URL
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            No blog post ID provided in the URL.
          </p>
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Loading Blog Post...
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Fetching article content
          </p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error Loading Blog Post
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error.message || 'Failed to load the blog post. Please try again.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
            <Link 
              to="/blogs"
              className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Not found state
  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The blog post you're looking for doesn't exist or may have been removed.
          </p>
          <Link 
            to="/blogs"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }
  
  // Get related blogs from API (exclude current post)
  const relatedBlogsData = relatedBlogsResponse?.success ? relatedBlogsResponse.data.data : [];
  const relatedBlogs = relatedBlogsData?.filter(blog => {
    const currentPostUUID = blogPost?.uuid || blogPost?.id;
    const blogUUID = blog.uuid || blog.id;
    return blogUUID !== currentPostUUID;
  }).slice(0, 2) || [];

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      });
    } catch {
      return dateStr || 'N/A';
    }
  };

  // Get full image URL
  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    return `${baseUrl}${imageUrl}`;
  };

  // Safe content rendering
  const renderContent = () => {
    const content = blogPost?.content || blogPost?.body || '';
    if (!content) {
      return <p className="text-gray-600 dark:text-gray-300">No content available for this blog post.</p>;
    }
    
    // Always render as HTML since rich text editor produces HTML
    return (
      <div
        className="prose prose-lg dark:prose-invert max-w-none ql-editor-content"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          // Support Quill editor classes
          '--ql-size-large': '1.5em',
          '--ql-size-huge': '2.5em'
        } as React.CSSProperties}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO
        title={`${blogPost.title || 'Blog Post'} | IntelliDelve Blog`}
        description={blogPost.excerpt || blogPost.description || 'Read this article on IntelliDelve blog'}
        keywords={blogPost.tags?.join(", ") || ""}
        canonicalUrl={`/blogs/${id}`}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-brand-navy dark:via-brand-navy/90 dark:to-purple-900/20 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-primary dark:text-sky-300 hover:text-primary/80 dark:hover:text-sky-300/80 mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>

          {blogPost.category && (
            <div className="mb-6">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                {blogPost.category}
              </span>
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {blogPost.title || 'Untitled Blog Post'}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{blogPost.author || 'IntelliDelve Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>
                {formatDate(blogPost.created_at || blogPost.createdAt || blogPost.date)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{blogPost.readTime || calculateReadTime(blogPost.content || blogPost.body || '')}</span>
            </div>
            {blogPost.views && (
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>{blogPost.views} views</span>
              </div>
            )}
          </div>

          {blogPost.tags && blogPost.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {blogPost.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Main Article */}
            <div className="lg:col-span-3">
              {/* Featured Image */}
              {(blogPost.featuredImage || blogPost.image) && (
                <div className="mb-10">
                  <img
                    src={blogPost.featuredImage || blogPost.image}
                    alt={blogPost.title}
                    className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                  />
                </div>
              )}

              {/* Blog Content */}
              <article className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-lg mb-10">
                <div ref={contentRef}>
                  {renderContent()}
                </div>
              </article>

              {/* Blog Images Gallery */}
              {blogImages && blogImages.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-lg mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Eye className="w-6 h-6 text-primary" />
                    Related Images
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogImages
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map((image, index) => (
                        <div key={image.id} className="group relative">
                          <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                            <img
                              src={getImageUrl(image.url || image.image)}
                              alt={image.alt_text || `Blog image ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden w-full h-full flex items-center justify-center">
                              <AlertTriangle className="w-8 h-8 text-gray-400" />
                            </div>
                          </div>
                          {(image.caption || image.alt_text) && (
                            <div className="mt-3">
                              {image.caption && (
                                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                  {image.caption}
                                </p>
                              )}
                              {image.alt_text && image.alt_text !== image.caption && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {image.alt_text}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 dark:from-brand-navy/50 dark:to-purple-900/50 rounded-2xl p-8">
                <div className="text-center">
                  <Shield className="w-12 h-12 text-primary dark:text-sky-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Ready to Implement Professional Background Screening?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Get expert guidance and comprehensive screening solutions tailored to your business needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Get Free Consultation
                    </Link>
                    <Link
                      to="/what-we-offer"
                      className="inline-flex items-center gap-2 border border-primary text-primary dark:text-sky-300 px-6 py-3 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-sky-300 dark:hover:text-brand-navy transition-colors font-medium"
                    >
                      <BookOpen className="w-5 h-5" />
                      Explore Our Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div ref={sidebarRef} className="space-y-8">
                
                {/* Related Articles */}
                {relatedBlogs.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Related Articles
                    </h3>
                    <div className="space-y-5">
                      {relatedBlogs.map((blog) => (
                        <Link
                          key={blog.uuid || blog.id}
                          to={`/blogs/${blog.uuid || blog.id}`}
                          className="block group hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg p-3 transition-colors duration-200"
                        >
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-sky-300 transition-colors duration-200 text-sm leading-tight mb-2">
                            {blog.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {blog.readTime || calculateReadTime(blog.content || '')}
                            </div>
                            {blog.category && (
                              <span className="bg-primary/10 text-primary dark:bg-sky-300/20 dark:text-sky-300 px-2 py-0.5 rounded-full text-xs font-medium">
                                {blog.category}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 text-primary dark:text-sky-300 hover:text-primary/80 dark:hover:text-sky-300/80 font-medium text-sm group"
                      >
                        <span>View All Articles</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Contact CTA */}
                <div className="bg-gradient-to-br from-primary to-purple-600 dark:from-brand-navy dark:to-purple-900 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Need Expert Help?</h3>
                  <p className="text-white/90 mb-4 text-sm">
                    Get personalized guidance on implementing background screening for your organization.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm w-full justify-center"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Contact Our Experts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;