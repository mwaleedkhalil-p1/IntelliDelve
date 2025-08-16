import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { SanityBlog, SanityCaseStudy } from '../../types/sanity';

interface SanitySEOProps {
  content: SanityBlog | SanityCaseStudy;
  type: 'blog' | 'caseStudy';
  canonicalUrl?: string;
}

const SanitySEO: React.FC<SanitySEOProps> = ({ content, type, canonicalUrl }) => {
  // Generate SEO data based on content type
  const generateSEOData = () => {
    const baseUrl = window.location.origin;
    const defaultImage = `${baseUrl}/images/og-default.jpg`;
    
    if (type === 'blog') {
      const blog = content as SanityBlog;
      
      return {
        title: blog.seo?.metaTitle || `${blog.title} | IntelliDelve Blog`,
        description: blog.seo?.metaDescription || blog.excerpt || `Read ${blog.title} on IntelliDelve blog`,
        keywords: blog.seo?.keywords?.join(', ') || blog.tags?.join(', ') || '',
        image: blog.featuredImage?.url || defaultImage,
        url: canonicalUrl || `${baseUrl}/blogs/${blog.slug.current}`,
        publishedTime: blog.publishedAt,
        modifiedTime: blog._updatedAt,
        author: blog.author,
        section: blog.category,
        tags: blog.tags || [],
        type: 'article'
      };
    } else {
      const caseStudy = content as SanityCaseStudy;
      
      return {
        title: `${caseStudy.title} - ${caseStudy.client} Case Study | IntelliDelve`,
        description: `Learn how ${caseStudy.client} achieved success with IntelliDelve's background screening solutions in the ${caseStudy.industry} industry.`,
        keywords: caseStudy.tags?.join(', ') || `${caseStudy.industry}, ${caseStudy.client}, background screening, case study`,
        image: caseStudy.featuredImage?.url || defaultImage,
        url: canonicalUrl || `${baseUrl}/case-studies/${caseStudy.slug.current}`,
        publishedTime: caseStudy.publishedAt,
        modifiedTime: caseStudy._updatedAt,
        section: caseStudy.industry,
        tags: caseStudy.tags || [],
        type: 'article'
      };
    }
  };

  const seoData = generateSEOData();

  // Generate structured data (JSON-LD)
  const generateStructuredData = () => {
    const baseStructuredData = {
      '@context': 'https://schema.org',
      '@type': type === 'blog' ? 'BlogPosting' : 'Article',
      headline: seoData.title,
      description: seoData.description,
      image: seoData.image,
      url: seoData.url,
      datePublished: seoData.publishedTime,
      dateModified: seoData.modifiedTime,
      author: {
        '@type': 'Organization',
        name: type === 'blog' ? seoData.author : 'IntelliDelve',
        url: `${window.location.origin}/about`
      },
      publisher: {
        '@type': 'Organization',
        name: 'IntelliDelve',
        url: window.location.origin,
        logo: {
          '@type': 'ImageObject',
          url: `${window.location.origin}/images/logo.png`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': seoData.url
      }
    };

    if (type === 'blog') {
      return {
        ...baseStructuredData,
        articleSection: seoData.section,
        keywords: seoData.keywords,
        wordCount: content.content?.length || 0
      };
    } else {
      const caseStudy = content as SanityCaseStudy;
      return {
        ...baseStructuredData,
        about: {
          '@type': 'Organization',
          name: caseStudy.client,
          industry: caseStudy.industry
        },
        mentions: caseStudy.tags?.map(tag => ({
          '@type': 'Thing',
          name: tag
        })) || []
      };
    }
  };

  const structuredData = generateStructuredData();

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      {seoData.keywords && <meta name="keywords" content={seoData.keywords} />}
      <link rel="canonical" href={seoData.url} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={seoData.type} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:url" content={seoData.url} />
      <meta property="og:site_name" content="IntelliDelve" />
      
      {/* Article-specific Open Graph tags */}
      {type === 'blog' && (
        <>
          <meta property="article:published_time" content={seoData.publishedTime} />
          <meta property="article:modified_time" content={seoData.modifiedTime} />
          <meta property="article:author" content={seoData.author} />
          <meta property="article:section" content={seoData.section} />
          {seoData.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@IntelliDelve" />
      <meta name="twitter:creator" content="@IntelliDelve" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Language and Locale */}
      <meta property="og:locale" content="en_US" />
      <html lang="en" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Preconnect to Sanity CDN for performance */}
      <link rel="preconnect" href="https://cdn.sanity.io" />
      <link rel="dns-prefetch" href="https://cdn.sanity.io" />
    </Helmet>
  );
};

export default SanitySEO;