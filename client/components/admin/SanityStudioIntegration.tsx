import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Edit3,
  FileText,
  Settings,
  Users,
  BarChart3,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  Plus,
  Search,
  Filter,
  Calendar,
  Building
} from 'lucide-react';
import { useFallback } from '../FallbackProvider';
import { useSanityBlogsWithFallback, useSanityCaseStudiesWithFallback } from '../../hooks/useSanityWithFallback';

interface ContentStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalCaseStudies: number;
  publishedCaseStudies: number;
  draftCaseStudies: number;
  lastUpdated: string;
}

interface RecentContent {
  id: string;
  title: string;
  type: 'blog' | 'caseStudy';
  status: 'published' | 'draft';
  lastModified: string;
  author?: string;
}

const SanityStudioIntegration: React.FC = () => {
  const [stats, setStats] = useState<ContentStats | null>(null);
  const [recentContent, setRecentContent] = useState<RecentContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'health'>('overview');
  
  const { isSanityHealthy, contentSource } = useFallback();
  
  // Fetch content for stats
  const { data: blogsResponse } = useSanityBlogsWithFallback({ limit: 100 });
  const { data: caseStudiesResponse } = useSanityCaseStudiesWithFallback({ limit: 100 });

  const blogs = blogsResponse?.data || [];
  const caseStudies = caseStudiesResponse?.data || [];

  useEffect(() => {
    if (blogs.length > 0 || caseStudies.length > 0) {
      calculateStats();
      setIsLoading(false);
    }
  }, [blogs, caseStudies]);

  const calculateStats = () => {
    const publishedBlogs = blogs.filter(blog => blog.status === 'published').length;
    const draftBlogs = blogs.filter(blog => blog.status === 'draft').length;
    const publishedCaseStudies = caseStudies.filter(cs => cs.status === 'published').length;
    const draftCaseStudies = caseStudies.filter(cs => cs.status === 'draft').length;

    setStats({
      totalBlogs: blogs.length,
      publishedBlogs,
      draftBlogs,
      totalCaseStudies: caseStudies.length,
      publishedCaseStudies,
      draftCaseStudies,
      lastUpdated: new Date().toISOString()
    });

    // Get recent content
    const allContent: RecentContent[] = [
      ...blogs.map(blog => ({
        id: blog._id,
        title: blog.title,
        type: 'blog' as const,
        status: blog.status as 'published' | 'draft',
        lastModified: blog.updatedAt || blog.publishedAt,
        author: blog.author
      })),
      ...caseStudies.map(cs => ({
        id: cs._id,
        title: cs.title,
        type: 'caseStudy' as const,
        status: cs.status as 'published' | 'draft',
        lastModified: cs.updatedAt || cs.publishedAt,
        author: cs.client
      }))
    ];

    // Sort by last modified and take top 10
    const recent = allContent
      .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
      .slice(0, 10);

    setRecentContent(recent);
  };

  const openSanityStudio = () => {
    const studioUrl = `https://${import.meta.env.VITE_SANITY_PROJECT_ID}.sanity.studio`;
    window.open(studioUrl, '_blank', 'noopener,noreferrer');
  };

  const openSanityManage = () => {
    const manageUrl = `https://www.sanity.io/manage/personal/project/${import.meta.env.VITE_SANITY_PROJECT_ID}`;
    window.open(manageUrl, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return <FileText className="w-4 h-4" />;
      case 'caseStudy':
        return <Building className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-gray-600 dark:text-gray-300">Loading Sanity data...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-6 h-6 text-primary" />
                Sanity CMS Integration
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Manage your content and monitor Sanity CMS health
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={openSanityManage}
                className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Manage Project
              </button>
              <button
                onClick={openSanityStudio}
                className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open Sanity Studio
              </button>
            </div>
          </div>
        </div>

        {/* Health Status */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              isSanityHealthy 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
            }`}>
              {isSanityHealthy ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
              Sanity CMS: {isSanityHealthy ? 'Healthy' : 'Unavailable'}
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              contentSource === 'sanity'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                contentSource === 'sanity' ? 'bg-blue-500' : 'bg-yellow-500'
              }`} />
              Content Source: {contentSource === 'sanity' ? 'Sanity CMS' : 'Legacy API'}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'content', label: 'Recent Content', icon: FileText },
              { id: 'health', label: 'System Health', icon: CheckCircle }
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
          {activeTab === 'overview' && stats && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-300">Total Blogs</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mt-1">{stats.totalBlogs}</div>
                  <div className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                    {stats.publishedBlogs} published, {stats.draftBlogs} drafts
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900 dark:text-green-300">Case Studies</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mt-1">{stats.totalCaseStudies}</div>
                  <div className="text-xs text-green-700 dark:text-green-400 mt-1">
                    {stats.publishedCaseStudies} published, {stats.draftCaseStudies} drafts
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900 dark:text-purple-300">Published</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mt-1">
                    {stats.publishedBlogs + stats.publishedCaseStudies}
                  </div>
                  <div className="text-xs text-purple-700 dark:text-purple-400 mt-1">
                    Live content items
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-900 dark:text-yellow-300">Drafts</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600 mt-1">
                    {stats.draftBlogs + stats.draftCaseStudies}
                  </div>
                  <div className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                    Pending publication
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => openSanityStudio()}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <Plus className="w-5 h-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">New Blog Post</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Create content</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => openSanityStudio()}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <Building className="w-5 h-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">New Case Study</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Add success story</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => openSanityManage()}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <Users className="w-5 h-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">Manage Users</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">User permissions</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => openSanityManage()}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <Settings className="w-5 h-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">Project Settings</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Configure CMS</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Content</h3>
                <div className="flex gap-2">
                  <button className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <button className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Search className="w-4 h-4" />
                    Search
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Content
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Last Modified
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {recentContent.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                {getTypeIcon(item.type)}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {item.title}
                                </div>
                                {item.author && (
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    by {item.author}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                            <span className="capitalize">{item.type === 'caseStudy' ? 'Case Study' : item.type}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(item.lastModified)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={openSanityStudio}
                              className="text-primary hover:text-primary/80 mr-3"
                            >
                              Edit
                            </button>
                            <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* API Health */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className={`w-5 h-5 ${isSanityHealthy ? 'text-green-500' : 'text-red-500'}`} />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Status</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Sanity API</span>
                      <span className={`text-sm font-medium ${isSanityHealthy ? 'text-green-600' : 'text-red-600'}`}>
                        {isSanityHealthy ? 'Healthy' : 'Unavailable'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Content Source</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {contentSource === 'sanity' ? 'Sanity CMS' : 'Legacy API'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Project ID</span>
                      <span className="text-sm font-mono text-gray-900 dark:text-white">
                        {import.meta.env.VITE_SANITY_PROJECT_ID}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Stats */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Content Health</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Content Items</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {(stats?.totalBlogs || 0) + (stats?.totalCaseStudies || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Published Content</span>
                      <span className="text-sm font-medium text-green-600">
                        {(stats?.publishedBlogs || 0) + (stats?.publishedCaseStudies || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Draft Content</span>
                      <span className="text-sm font-medium text-yellow-600">
                        {(stats?.draftBlogs || 0) + (stats?.draftCaseStudies || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Information */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Environment:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {import.meta.env.MODE}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Dataset:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {import.meta.env.VITE_SANITY_DATASET}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">API Version:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {import.meta.env.VITE_SANITY_API_VERSION}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {stats ? formatDate(stats.lastUpdated) : 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SanityStudioIntegration;