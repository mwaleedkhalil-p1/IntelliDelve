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
  Loader2,
  MapPin,
  Building,
  Quote
} from "lucide-react";
import { PortableText } from '@portabletext/react';
import { SEO } from "../SEO";
import { useSanityCaseStudyWithFallback, useSanityCaseStudiesWithFallback } from "../../hooks/useSanityWithFallback";
import { useFallback } from "../FallbackProvider";
import SanityImage from "./SanityImage";
import SanityImageGallery from "./SanityImageGallery";

// Portable Text components for rich content rendering
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      
      return (
        <div className="my-8">
          <SanityImage
            image={value}
            alt={value.alt || ''}
            className="w-full rounded-lg shadow-lg"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
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
};

interface SanityCaseStudyProps {
  slug?: string;
  className?: string;
}

const SanityCaseStudy: React.FC<SanityCaseStudyProps> = ({
  slug: propSlug,
  className = ""
}) => {
  const { id } = useParams();
  const slug = propSlug || id;
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  const { contentSource, isSanityHealthy } = useFallback();

  // Fetch case study from Sanity with fallback
  const { data: caseStudyResponse, isLoading, error } = useSanityCaseStudyWithFallback(slug || '');
  
  // Fetch related case studies
  const { data: relatedCaseStudiesResponse } = useSanityCaseStudiesWithFallback({ 
    status: 'published', 
    limit: 3 
  });
  
  const caseStudy = caseStudyResponse?.data;
  const dataSource = caseStudyResponse?.source || 'sanity';
  
  // Get related case studies (exclude current post)
  const relatedCaseStudies = relatedCaseStudiesResponse?.data?.filter(cs => 
    cs.slug !== slug
  ).slice(0, 2) || [];

  // Animation effects
  useEffect(() => {
    if (caseStudy && contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }

    if (caseStudy && sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current.children,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      );
    }
  }, [caseStudy]);

  // Early return for missing slug
  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Invalid Case Study URL
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            No case study slug provided in the URL.
          </p>
          <Link 
            to="/case-studies" 
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Case Studies
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
            Loading Case Study...
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Fetching case study content from {dataSource === 'sanity' ? 'Sanity CMS' : 'Legacy API'}
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
            Error Loading Case Study
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error.message || 'Failed to load the case study. Please try again.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
            <Link 
              to="/case-studies"
              className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              Back to Case Studies
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
  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Case Study Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The case study you're looking for doesn't exist or may have been removed.
          </p>
          <Link 
            to="/case-studies"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Case Studies
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
        title={`${caseStudy.title || 'Case Study'} | IntelliDelve Case Studies`}
        description={`Learn how ${caseStudy.client} achieved success with IntelliDelve's background screening solutions.`}
        keywords={caseStudy.tags?.join(", ") || `${caseStudy.industry}, background screening, case study`}
        canonicalUrl={`/case-studies/${slug}`}
        image={caseStudy.featuredImage?.url}
      />

      <DataSourceIndicator />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-brand-navy dark:via-brand-navy/90 dark:to-purple-900/20 pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-primary dark:text-sky-300 hover:text-primary/80 dark:hover:text-sky-300/80 mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Case Studies
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {caseStudy.industry}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {caseStudy.title}
              </h1>

              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  <span className="font-semibold">{caseStudy.client}</span>
                </div>
                {caseStudy.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{caseStudy.location}</span>
                  </div>
                )}
                {caseStudy.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>Project Duration: {caseStudy.duration}</span>
                  </div>
                )}
                {caseStudy.completedDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>Completed: {formatDate(caseStudy.completedDate)}</span>
                  </div>
                )}
              </div>

              {caseStudy.tags && caseStudy.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-6">
                  {caseStudy.tags.slice(0, 5).map((tag) => (
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

            {/* Featured Image */}
            {caseStudy.featuredImage && (
              <div>
                <SanityImage
                  image={caseStudy.featuredImage}
                  alt={caseStudy.featuredImage.alt || caseStudy.title}
                  className="w-full h-96 rounded-2xl shadow-xl"
                  aspectRatio="video"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div ref={contentRef} className="space-y-12">
                
                {/* Challenge Section */}
                {caseStudy.challenge && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-orange-500" />
                      The Challenge
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      {Array.isArray(caseStudy.challenge) ? (
                        <PortableText 
                          value={caseStudy.challenge} 
                          components={portableTextComponents}
                        />
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {caseStudy.challenge}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Solution Section */}
                {caseStudy.solution && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      Our Solution
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      {Array.isArray(caseStudy.solution) ? (
                        <PortableText 
                          value={caseStudy.solution} 
                          components={portableTextComponents}
                        />
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {caseStudy.solution}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Implementation Steps */}
                {caseStudy.implementation && caseStudy.implementation.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-blue-500" />
                      Implementation Process
                    </h2>
                    <div className="space-y-4">
                      {caseStudy.implementation.map((step, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results Section */}
                {caseStudy.results && caseStudy.results.length > 0 && (
                  <div className="bg-gradient-to-br from-primary/5 to-purple-600/5 dark:from-brand-navy/50 dark:to-purple-900/50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center flex items-center justify-center gap-3">
                      <TrendingUp className="w-6 h-6 text-primary" />
                      Measurable Results
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {caseStudy.results.map((result, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                          <div className="text-4xl font-bold text-primary dark:text-sky-300 mb-2">
                            {result.metric}
                          </div>
                          <div className="text-gray-900 dark:text-white font-semibold mb-1">
                            {result.label}
                          </div>
                          {result.improvement && (
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {result.improvement}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testimonial Section */}
                {caseStudy.testimonial && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <Quote className="w-6 h-6 text-purple-500" />
                      Client Testimonial
                    </h2>
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                      <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed mb-6 pl-6">
                        "{caseStudy.testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-4">
                        {caseStudy.testimonial.authorImage && (
                          <SanityImage
                            image={caseStudy.testimonial.authorImage}
                            alt={caseStudy.testimonial.author}
                            className="w-12 h-12 rounded-full"
                          />
                        )}
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {caseStudy.testimonial.author}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {caseStudy.testimonial.position}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Image Gallery */}
                {caseStudy.gallery && caseStudy.gallery.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <Eye className="w-6 h-6 text-indigo-500" />
                      Project Gallery
                    </h2>
                    <SanityImageGallery
                      images={caseStudy.gallery}
                      columns={3}
                      showCaptions={true}
                      allowFullscreen={true}
                    />
                  </div>
                )}

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 dark:from-brand-navy/50 dark:to-purple-900/50 rounded-2xl p-8">
                  <div className="text-center">
                    <Shield className="w-12 h-12 text-primary dark:text-sky-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Ready to Achieve Similar Results?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Let us help you implement a comprehensive background screening solution tailored to your organization's needs.
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
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div ref={sidebarRef} className="space-y-8">
                
                {/* Related Case Studies */}
                {relatedCaseStudies.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Related Case Studies
                    </h3>
                    <div className="space-y-5">
                      {relatedCaseStudies.map((cs) => (
                        <Link
                          key={cs._id}
                          to={`/case-studies/${cs.slug}`}
                          className="block group hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg p-3 transition-colors duration-200"
                        >
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-sky-300 transition-colors duration-200 text-sm leading-tight mb-2">
                            {cs.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              {cs.client}
                            </div>
                            <span className="bg-primary/10 text-primary dark:bg-sky-300/20 dark:text-sky-300 px-2 py-0.5 rounded-full text-xs font-medium">
                              {cs.industry}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        to="/case-studies"
                        className="inline-flex items-center gap-2 text-primary dark:text-sky-300 hover:text-primary/80 dark:hover:text-sky-300/80 font-medium text-sm group"
                      >
                        <span>View All Case Studies</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Contact CTA */}
                <div className="bg-gradient-to-br from-primary to-purple-600 dark:from-brand-navy dark:to-purple-900 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Start Your Success Story</h3>
                  <p className="text-white/90 mb-4 text-sm">
                    Ready to achieve similar results? Let's discuss how we can help your organization.
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

export default SanityCaseStudy;