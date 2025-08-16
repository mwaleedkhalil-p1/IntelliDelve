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
import { PortableText } from '@portabletext/react';
import { SEO } from "../SEO";
import { useSanityBlogWithFallback, useSanityBlogsWithFallback } from "../../hooks/useSanityWithFallback";
import { useFallback } from "../FallbackProvider";
import { getImageUrl } from "../../lib/sanity";

// Portable Text components for rich content rendering
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      
      return (
        <div className="my-8">
          <img
            src={getImageUrl(value, { width: 800, quality: 85, auto: 'format' })}
            alt={value.alt || ''}
            className="w-full rounded-lg shadow-lg"
            loading="lazy"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    code: ({ value }: any) => (
      <div className="my-6">
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <code className={`language-${value.language || 'text'}`}>
            {value.code}
          </code>
        </pre>
      </div>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      
      return (
        <a
          href={value.href}
          rel={rel}
          target={target}
          className="text-primary dark:text-sky-300 hover:text-primary/80 dark:hover:text-sky-300/80 underline"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="ml-4">{children}</li>,
    number: ({ children }: any) => <li className="ml-4">{children}</li>,
  },
};

interface SanityBlogPostProps {
  slug?: string;
  className?: string;
}

const SanityBlogPost: React.FC<SanityBlogPostProps> = ({
  slug: propSlug,
  className = ""
}) => {
  const { id } = useParams();
  const slug = propSlug || id;
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  const { contentSource, isSanityHealthy } = useFallback();

  // Fetch blog post from Sanity with fallback
  const { data: blogResponse, isLoading, error } = useSanityBlogWithFallback(slug || '');
  
  // Fetch related blogs
  const { data: relatedBlogsResponse } = useSanityBlogsWithFallback({ 
    status: 'published', 
    limit: 3 
  });
  
  const blogPost = blogResponse?.data;
  const dataSource = blogResponse?.source || 'sanity';
  
  // Get related blogs (exclude current post)
  const relatedBlogs = relatedBlogsResponse?.data?.filter(blog => 
    blog.slug !== slug
  ).slice(0, 2) || [];

  // Calculate read time based on content
  const calculateReadTime = (content: any[]) => {
    if (!content || !Array.isArray(content)) return '5 min read';
    
    const textContent = content
      .filter(block => block._type === 'block')
      .map(block => 
        block.children?.map((child: any) => child.text).join(' ') || ''
      )
      .join(' ');
    
    const wordsPerMinute = 200;
    const wordCount = textContent.split(' ').length;
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

  // Early return for missing slug
  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Invalid Blog Post URL
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            No blog post slug provided in the URL.
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
            Fetching article content from {dataSource === 'sanity' ? 'Sanity CMS' : 'Legacy API'}
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
          {dataSource === 'sanity' && !isSanityHealthy && (
            <div className="mt-4 text-sm text-yellow-600 dark:text-yellow-400">
              Sanity CMS is currently unavailable. Trying fallback...
            </div>
          )}
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
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
      <SEO
        title={`${blogPost.title || 'Blog Post'} | IntelliDelve Blog`}
        description={blogPost.seo?.metaDescription || blogPost.excerpt || 'Read this article on IntelliDelve blog'}
        keywords={blogPost.seo?.keywords?.join(", ") || blogPost.tags?.join(", ") || ""}
        canonicalUrl={`/blogs/${slug}`}
        image={blogPost.featuredImage?.url}
      />

      <DataSourceIndicator />

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
            {blogPost.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(blogPost.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{calculateReadTime(blogPost.content)}</span>
            </div>
          </div>

          {blogPost.tags && blogPost.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {blogPost.tags.slice(0, 5).map((tag) => (
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
              {blogPost.featuredImage && (
                <div className="mb-10">
                  <img
                    src={blogPost.featuredImage.url}
                    alt={blogPost.featuredImage.alt || blogPost.title}
                    className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                    loading="eager"
                  />
                </div>
              )}

              {/* Blog Content */}
              <article className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-lg mb-10">
                <div ref={contentRef}>
                  {blogPost.content && Array.isArray(blogPost.content) ? (
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <PortableText 
                        value={blogPost.content} 
                        components={portableTextComponents}
                      />
                    </div>
                  ) : (
                    <div 
                      className="prose prose-lg dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: blogPost.content || 'No content available for this blog post.' 
                      }}
                    />
                  )}
                </div>
              </article>

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
                          key={blog._id}
                          to={`/blogs/${blog.slug}`}
                          className="block group hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg p-3 transition-colors duration-200"
                        >
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-sky-300 transition-colors duration-200 text-sm leading-tight mb-2">
                            {blog.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {blog.readTime ? `${blog.readTime} min read` : '5 min read'}
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

export default SanityBlogPost;