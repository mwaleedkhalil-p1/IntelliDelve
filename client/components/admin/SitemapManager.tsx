import React, { useState, useEffect } from 'react';
import {
  Download,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Search,
  Globe,
  FileText,
  Rss,
  Settings,
  Info
} from 'lucide-react';
import { SanitySitemapGenerator, seoUtils } from '../../utils/sanitySitemap';
import { sitemapUtils } from '../../utils/sitemapEndpoint';

interface SitemapStats {
  totalUrls: number;
  blogUrls: number;
  caseStudyUrls: number;
  lastGenerated: string;
}

interface ValidationResult {
  url: string;
  status: number;
  valid: boolean;
}

const SitemapManager: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [stats, setStats] = useState<SitemapStats | null>(null);
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [sitemapXML, setSitemapXML] = useState<string>('');
  const [robotsTxt, setRobotsTxt] = useState<string>('');
  const [rssXML, setRssXML] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots' | 'rss' | 'validation'>('sitemap');

  const generator = new SanitySitemapGenerator();

  useEffect(() => {
    generateSitemap();
  }, []);

  const generateSitemap = async () => {
    setIsGenerating(true);
    try {
      const [sitemap, robots, rss] = await Promise.all([
        generator.generateSitemap(),
        generator.generateRobotsTxt(),
        generator.generateRSSFeed()
      ]);

      setSitemapXML(sitemap);
      setRobotsTxt(robots);
      setRssXML(rss);

      // Calculate stats
      const urlCount = (sitemap.match(/<url>/g) || []).length;
      const blogCount = (sitemap.match(/\/blogs\//g) || []).length;
      const caseStudyCount = (sitemap.match(/\/case-studies\//g) || []).length;

      setStats({
        totalUrls: urlCount,
        blogUrls: blogCount,
        caseStudyUrls: caseStudyCount,
        lastGenerated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error generating sitemap:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const validateSitemap = async () => {
    if (!sitemapXML) return;

    setIsValidating(true);
    try {
      const results = await sitemapUtils.validateSitemapUrls(sitemapXML);
      setValidationResults(results);
    } catch (error) {
      console.error('Error validating sitemap:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const submitToSearchEngines = async () => {
    const sitemapUrl = `${window.location.origin}/sitemap.xml`;
    try {
      const results = await sitemapUtils.submitToSearchEngines(sitemapUrl);
      console.log('Submission results:', results);
      // You could show a toast notification here
    } catch (error) {
      console.error('Error submitting to search engines:', error);
    }
  };

  const validUrls = validationResults.filter(r => r.valid).length;
  const invalidUrls = validationResults.filter(r => !r.valid).length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                SEO & Sitemap Manager
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Manage sitemaps, robots.txt, and RSS feeds for Sanity content
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={generateSitemap}
                disabled={isGenerating}
                className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                {isGenerating ? 'Generating...' : 'Regenerate All'}
              </button>
              <button
                onClick={submitToSearchEngines}
                className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Submit to Search Engines
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-300">Total URLs</span>
                </div>
                <div className="text-2xl font-bold text-blue-600 mt-1">{stats.totalUrls}</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-900 dark:text-green-300">Blog Posts</span>
                </div>
                <div className="text-2xl font-bold text-green-600 mt-1">{stats.blogUrls}</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900 dark:text-purple-300">Case Studies</span>
                </div>
                <div className="text-2xl font-bold text-purple-600 mt-1">{stats.caseStudyUrls}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-300">Last Updated</span>
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
                  {new Date(stats.lastGenerated).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'sitemap', label: 'Sitemap', icon: Globe },
              { id: 'robots', label: 'Robots.txt', icon: Settings },
              { id: 'rss', label: 'RSS Feed', icon: Rss },
              { id: 'validation', label: 'Validation', icon: CheckCircle }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                  activeTab === id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'sitemap' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sitemap.xml</h3>
                <button
                  onClick={() => downloadFile(sitemapXML, 'sitemap.xml', 'application/xml')}
                  className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-96 overflow-auto">
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {sitemapXML || 'No sitemap generated yet...'}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'robots' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Robots.txt</h3>
                <button
                  onClick={() => downloadFile(robotsTxt, 'robots.txt', 'text/plain')}
                  className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {robotsTxt || 'No robots.txt generated yet...'}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'rss' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">RSS Feed</h3>
                <button
                  onClick={() => downloadFile(rssXML, 'rss.xml', 'application/rss+xml')}
                  className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-96 overflow-auto">
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {rssXML || 'No RSS feed generated yet...'}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'validation' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">URL Validation</h3>
                <button
                  onClick={validateSitemap}
                  disabled={isValidating || !sitemapXML}
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Search className={`w-4 h-4 ${isValidating ? 'animate-spin' : ''}`} />
                  {isValidating ? 'Validating...' : 'Validate URLs'}
                </button>
              </div>

              {validationResults.length > 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900 dark:text-green-300">Valid URLs</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600 mt-1">{validUrls}</div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span className="font-medium text-red-900 dark:text-red-300">Invalid URLs</span>
                      </div>
                      <div className="text-2xl font-bold text-red-600 mt-1">{invalidUrls}</div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="max-h-64 overflow-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              URL
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Valid
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {validationResults.map((result, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                <a
                                  href={result.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:text-primary/80 hover:underline"
                                >
                                  {result.url}
                                </a>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  result.status >= 200 && result.status < 300
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                    : result.status >= 300 && result.status < 400
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                }`}>
                                  {result.status || 'Error'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                {result.valid ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  <AlertTriangle className="w-5 h-5 text-red-500" />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {validationResults.length === 0 && !isValidating && (
                <div className="text-center py-8">
                  <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Click "Validate URLs" to check the accessibility of all URLs in your sitemap.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SitemapManager;