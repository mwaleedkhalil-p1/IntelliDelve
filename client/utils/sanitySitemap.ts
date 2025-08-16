import { sanityService } from '../services/sanityService';

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export class SanitySitemapGenerator {
  private baseUrl: string;

  constructor(baseUrl: string = window.location.origin) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  async generateSitemap(): Promise<string> {
    const entries: SitemapEntry[] = [];

    try {
      // Add blog entries
      const blogs = await sanityService.getBlogs({ status: 'published', limit: 1000 });
      blogs.forEach(blog => {
        entries.push({
          url: `${this.baseUrl}/blogs/${blog.slug}`,
          lastModified: new Date(blog.publishedAt).toISOString(),
          changeFrequency: 'monthly',
          priority: 0.7
        });
      });

      // Add case study entries
      const caseStudies = await sanityService.getCaseStudies({ status: 'published', limit: 1000 });
      caseStudies.forEach(caseStudy => {
        entries.push({
          url: `${this.baseUrl}/case-studies/${caseStudy.slug}`,
          lastModified: new Date(caseStudy.publishedAt).toISOString(),
          changeFrequency: 'monthly',
          priority: 0.8
        });
      });

      // Add main pages
      entries.push(
        {
          url: `${this.baseUrl}/blogs`,
          lastModified: new Date().toISOString(),
          changeFrequency: 'daily',
          priority: 0.9
        },
        {
          url: `${this.baseUrl}/case-studies`,
          lastModified: new Date().toISOString(),
          changeFrequency: 'weekly',
          priority: 0.9
        }
      );

    } catch (error) {
      console.error('Error generating sitemap:', error);
    }

    return this.generateXML(entries);
  }

  private generateXML(entries: SitemapEntry[]): string {
    const xmlEntries = entries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
  }

  async generateRobotsTxt(): Promise<string> {
    const sitemapUrl = `${this.baseUrl}/sitemap.xml`;
    
    return `User-agent: *
Allow: /

# Sanity-powered content
Allow: /blogs/
Allow: /case-studies/

# Admin and API endpoints
Disallow: /admin/
Disallow: /api/

# Sitemap
Sitemap: ${sitemapUrl}`;
  }

  // Generate RSS feed for blogs
  async generateRSSFeed(): Promise<string> {
    try {
      const blogs = await sanityService.getBlogs({ 
        status: 'published', 
        limit: 20 
      });

      const rssItems = blogs.map(blog => `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <description><![CDATA[${blog.excerpt}]]></description>
      <link>${this.baseUrl}/blogs/${blog.slug}</link>
      <guid isPermaLink="true">${this.baseUrl}/blogs/${blog.slug}</guid>
      <pubDate>${new Date(blog.publishedAt).toUTCString()}</pubDate>
      <category><![CDATA[${blog.category}]]></category>
      <author><![CDATA[${blog.author}]]></author>
      ${blog.featuredImage ? `<enclosure url="${blog.featuredImage}" type="image/jpeg" />` : ''}
    </item>`).join('');

      return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>IntelliDelve Blog</title>
    <description>Expert insights on background screening, risk management, and compliance</description>
    <link>${this.baseUrl}/blogs</link>
    <atom:link href="${this.baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>IntelliDelve Sanity CMS</generator>
${rssItems}
  </channel>
</rss>`;
    } catch (error) {
      console.error('Error generating RSS feed:', error);
      return '';
    }
  }
}

// Utility functions for SEO
export const seoUtils = {
  // Generate meta description from content
  generateMetaDescription: (content: any[], maxLength: number = 160): string => {
    if (!content || !Array.isArray(content)) return '';
    
    const textContent = content
      .filter(block => block._type === 'block')
      .map(block => 
        block.children?.map((child: any) => child.text).join(' ') || ''
      )
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength - 3) + '...'
      : textContent;
  },

  // Extract keywords from content
  extractKeywords: (content: any[], tags: string[] = []): string[] => {
    if (!content || !Array.isArray(content)) return tags;
    
    const textContent = content
      .filter(block => block._type === 'block')
      .map(block => 
        block.children?.map((child: any) => child.text).join(' ') || ''
      )
      .join(' ')
      .toLowerCase();
    
    // Simple keyword extraction (could be enhanced with NLP)
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'shall'];
    
    const words = textContent
      .split(/\W+/)
      .filter(word => word.length > 3 && !commonWords.includes(word))
      .slice(0, 10);
    
    return [...new Set([...tags, ...words])];
  },

  // Generate breadcrumb structured data
  generateBreadcrumbStructuredData: (breadcrumbs: Array<{ name: string; url: string }>) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };
  },

  // Generate FAQ structured data
  generateFAQStructuredData: (faqs: Array<{ question: string; answer: string }>) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  },

  // Generate organization structured data
  generateOrganizationStructuredData: () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'IntelliDelve',
      url: window.location.origin,
      logo: `${window.location.origin}/images/logo.png`,
      description: 'AI-powered background screening and risk management solutions',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-XXX-XXX-XXXX',
        contactType: 'customer service',
        availableLanguage: 'English'
      },
      sameAs: [
        'https://linkedin.com/company/intellidelve',
        'https://twitter.com/intellidelve'
      ]
    };
  }
};

export default SanitySitemapGenerator;