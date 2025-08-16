import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Edit3,
  Globe
} from 'lucide-react';
import { useAuth, useBlogs, useCaseStudies, useLogout } from '../../hooks/useApi';
import { LoginForm } from '../../components/admin/LoginForm';
import { SEO } from '../../components/SEO';
import { ApiTestComponent } from '../../components/admin/ApiTestComponent';
import { ErrorBoundary } from '../../components/admin/ErrorBoundary';
// Lazy load Sanity components to prevent blocking
const SanityStudioIntegration = React.lazy(() => 
  import('../../components/admin/SanityStudioIntegration').catch(() => ({
    default: () => (
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Sanity CMS Integration</h3>
        <p className="text-gray-600 dark:text-gray-400">Loading Sanity components...</p>
        <div className="mt-4">
          <a 
            href="https://k9jiezj8.sanity.studio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            <Edit3 className="w-4 h-4" />
            Open Sanity Studio
          </a>
        </div>
      </div>
    )
  }))
);

const SitemapManager = React.lazy(() => 
  import('../../components/admin/SitemapManager').catch(() => ({
    default: () => (
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">SEO & Sitemap Tools</h3>
        <p className="text-gray-600 dark:text-gray-400">SEO tools are loading...</p>
      </div>
    )
  }))
);

const AdminDashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth();
  const [activeTab, setActiveTab] = useState<'blogs' | 'case-studies' | 'sanity' | 'seo'>('blogs');
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const navigate = useNavigate();
  
  const { data: blogsResponse } = useBlogs({ status: 'published', limit: 50 });
  const { data: caseStudiesResponse } = useCaseStudies({ status: 'published', limit: 50 });
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Debug authentication state
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('📊 AdminDashboard - Auth state changed:', {
      user: user ? { email: user.email, role: user.role } : null,
      isAuthenticated,
      isLoading,
      error: error?.message,
      hasToken: !!token,
      tokenPreview: token ? `${token.substring(0, 20)}...` : null,
      timestamp: new Date().toISOString()
    });
  }, [user, isAuthenticated, isLoading, error]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Validating authentication...</p>
          <button 
            onClick={() => setShowDebugInfo(!showDebugInfo)}
            className="mt-2 text-sm text-gray-500 underline"
          >
            {showDebugInfo ? 'Hide' : 'Show'} Debug Info
          </button>
          {showDebugInfo && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-left text-xs">
              <pre>{JSON.stringify({ user, isAuthenticated, isLoading, error: error?.message }, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // The LoginForm will trigger a re-render of this component on successful login
    // because the underlying auth query will be invalidated and refetched.
    return <LoginForm onSuccess={() => {
      console.log('🔐 Login success callback triggered in AdminDashboard');
    }} />;
  }

  const blogs = blogsResponse?.success ? blogsResponse.data.data : [];
  const caseStudies = caseStudiesResponse?.success ? caseStudiesResponse.data.data : [];

  const stats = [
    { name: 'Total Blogs', value: blogs.length, icon: BookOpen, color: 'bg-blue-500' },
    { name: 'Case Studies', value: caseStudies.length, icon: FileText, color: 'bg-green-500' },
    { name: 'Published', value: blogs.filter(b => b.status === 'published').length, icon: Eye, color: 'bg-purple-500' },
    { name: 'Drafts', value: blogs.filter(b => b.status === 'draft').length, icon: Edit, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <SEO
        title="Admin Dashboard | IntelliDelve"
        description="Admin dashboard for managing IntelliDelve content"
        noindex={true}
      />
      
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome back, {user?.name || user?.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'blogs', name: 'Blogs', icon: BookOpen },
                { id: 'case-studies', name: 'Case Studies', icon: FileText },
                { id: 'sanity', name: 'Sanity CMS', icon: Edit3 },
                { id: 'seo', name: 'SEO & Sitemaps', icon: Globe },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'blogs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Blog Posts ({blogs.length})
                  </h2>
                  <button 
                    onClick={() => navigate('/admin/BlogManagement')}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4" />
                    Manage Blogs
                  </button>
                </div>
                
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Author
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                      {blogs.map((blog) => (
                        <tr key={blog.uuid}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {blog.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {blog.author}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              blog.status === 'published' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                            }`}>
                              {blog.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'case-studies' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Case Studies ({caseStudies.length})
                  </h2>
                  {/* <button 
                    onClick={() => navigate('/admin/CaseStudyManagement')}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4" />
                    Manage Case Studies
                  </button> */}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {caseStudies.map((study) => (
                    <div key={study.uuid} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {study.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Client: {study.client}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Industry: {study.industry}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          study.status === 'published' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                        }`}>
                          {study.status}
                        </span>
                        <div className="flex items-center gap-2">
                          <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'sanity' && (
              <div className="-m-6">
                <ErrorBoundary>
                  <React.Suspense fallback={
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <span className="ml-2">Loading Sanity CMS...</span>
                    </div>
                  }>
                    <SanityStudioIntegration />
                  </React.Suspense>
                </ErrorBoundary>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="-m-6">
                <ErrorBoundary>
                  <React.Suspense fallback={
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <span className="ml-2">Loading SEO Tools...</span>
                    </div>
                  }>
                    <SitemapManager />
                  </React.Suspense>
                </ErrorBoundary>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// export default AdminDashboard;

// If there are issues, uncomment the line below and comment out the line above
export { default } from './AdminDashboardSafe';
