import { SanitySitemapGenerator } from './sanitySitemap';

// Server-side sitemap generation endpoint
export const generateSitemapResponse = async (baseUrl: string): Promise<Response> => {
  try {
    const generator = new SanitySitemapGenerator(baseUrl);
    const sitemapXML = await generator.generateSitemap();
    
    return new Response(sitemapXML, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'X-Robots-Tag': 'noindex'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
};

// Server-side robots.txt generation endpoint
export const generateRobotsResponse = async (baseUrl: string): Promise<Response> => {
  try {
    const generator = new SanitySitemapGenerator(baseUrl);
    const robotsTxt = await generator.generateRobotsTxt();
    
    return new Response(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      }
    });
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    return new Response('Error generating robots.txt', { status: 500 });
  }
};

// Server-side RSS feed generation endpoint
export const generateRSSResponse = async (baseUrl: string): Promise<Response> => {
  try {
    const generator = new SanitySitemapGenerator(baseUrl);
    const rssXML = await generator.generateRSSFeed();
    
    return new Response(rssXML, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
};

// Client-side sitemap utilities
export const sitemapUtils = {
  // Download sitemap as file
  downloadSitemap: async () => {
    try {
      const generator = new SanitySitemapGenerator();
      const sitemapXML = await generator.generateSitemap();
      
      const blob = new Blob([sitemapXML], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sitemap.xml';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading sitemap:', error);
    }
  },

  // Submit sitemap to search engines
  submitToSearchEngines: async (sitemapUrl: string) => {
    const searchEngines = [
      `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    ];

    const results = await Promise.allSettled(
      searchEngines.map(url => 
        fetch(url, { method: 'GET', mode: 'no-cors' })
      )
    );

    return results.map((result, index) => ({
      engine: index === 0 ? 'Google' : 'Bing',
      success: result.status === 'fulfilled',
      error: result.status === 'rejected' ? result.reason : null
    }));
  },

  // Validate sitemap URLs
  validateSitemapUrls: async (sitemapXML: string): Promise<Array<{ url: string; status: number; valid: boolean }>> => {
    const urlRegex = /<loc>(.*?)<\/loc>/g;
    const urls: string[] = [];
    let match;

    while ((match = urlRegex.exec(sitemapXML)) !== null) {
      urls.push(match[1]);
    }

    const validationResults = await Promise.allSettled(
      urls.map(async (url) => {
        try {
          const response = await fetch(url, { method: 'HEAD' });
          return {
            url,
            status: response.status,
            valid: response.status >= 200 && response.status < 400
          };
        } catch (error) {
          return {
            url,
            status: 0,
            valid: false
          };
        }
      })
    );

    return validationResults.map((result, index) => 
      result.status === 'fulfilled' 
        ? result.value 
        : { url: urls[index], status: 0, valid: false }
    );
  }
};