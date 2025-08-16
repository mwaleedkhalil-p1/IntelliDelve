import React, { useEffect, useState } from 'react';
import { sanityService } from '../services/sanityService';
import { sanityClient } from '../lib/sanity';

const SanityDebug: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const runDebugTests = async () => {
      try {
        setLoading(true);
        
        // Test 1: Basic client configuration
        const clientConfig = {
          projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
          dataset: import.meta.env.VITE_SANITY_DATASET,
          apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
          useCdn: import.meta.env.VITE_SANITY_USE_CDN,
        };
        
        // Test 2: Simple GROQ query to check connection
        const simpleQuery = '*[_type == "blog"] | order(_createdAt desc) [0...5] { _id, title, slug, status }';
        const simpleResult = await sanityClient.fetch(simpleQuery);
        
        // Test 3: Count total blogs
        const countQuery = 'count(*[_type == "blog"])';
        const totalBlogs = await sanityClient.fetch(countQuery);
        
        // Test 4: Count published blogs
        const publishedCountQuery = 'count(*[_type == "blog" && status == "published"])';
        const publishedBlogs = await sanityClient.fetch(publishedCountQuery);
        
        // Test 5: Check circuit breaker state and reset if needed
        const { checkSanityHealth, resetSanityCircuitBreaker } = await import('../lib/sanity')
        const healthCheck = await checkSanityHealth()
        console.log('Circuit breaker state:', healthCheck.circuitBreakerState)
        
        // Reset circuit breaker if it's open
        if (healthCheck.circuitBreakerState === 'OPEN') {
          console.log('Resetting circuit breaker...')
          resetSanityCircuitBreaker()
        }
        
        // Test 6: Test service method with detailed logging
        let serviceResult = null
        let serviceError = null
        try {
          console.log('Testing sanityService.getBlogs...')
          serviceResult = await sanityService.getBlogs({ limit: 3 })
          console.log('Service result:', serviceResult)
        } catch (error: any) {
          console.error('Service error:', error)
          serviceError = {
            message: error.message,
            stack: error.stack,
            name: error.name
          }
        }
        
        // Test 7: Test direct client fetch with same query as service
        let directClientResult = null;
        let directClientError = null;
        try {
          const directQuery = `*[_type == "blog" && status == "published"] | order(publishedAt desc) [0...3] {
            _id,
            _type,
            _createdAt,
            _updatedAt,
            title,
            slug,
            "slugCurrent": slug.current,
            author,
            publishedAt,
            excerpt,
            featuredImage {
              ...,
              "url": asset->url
            },
            category,
            tags,
            status,
            "readTime": round(length(pt::text(content)) / 5 / 180)
          }`;
          directClientResult = await sanityClient.fetch(directQuery);
          console.log('Direct client result:', directClientResult);
        } catch (error: any) {
          console.error('Direct client error:', error);
          directClientError = {
            message: error.message,
            stack: error.stack,
            name: error.name
          };
        }
        
        setDebugInfo({
          clientConfig,
          simpleResult,
          totalBlogs,
          publishedBlogs,
          serviceResult,
          serviceError,
          directClientResult,
          directClientError,
          timestamp: new Date().toISOString()
        });
        
      } catch (err: any) {
        console.error('Debug test error:', err);
        setError(err.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    runDebugTests();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Sanity Debug - Loading...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Sanity Debug - Error</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p><strong>Error:</strong> {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sanity Debug Information</h1>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Client Configuration</h2>
          <pre className="bg-white p-3 rounded text-sm overflow-x-auto">
            {JSON.stringify(debugInfo?.clientConfig, null, 2)}
          </pre>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Blog Counts</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded">
              <p><strong>Total Blogs:</strong> {debugInfo?.totalBlogs}</p>
            </div>
            <div className="bg-white p-3 rounded">
              <p><strong>Published Blogs:</strong> {debugInfo?.publishedBlogs}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Simple Query Result (First 5 Blogs)</h2>
          <pre className="bg-white p-3 rounded text-sm overflow-x-auto max-h-64 overflow-y-auto">
            {JSON.stringify(debugInfo?.simpleResult, null, 2)}
          </pre>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Service Method Result</h2>
          <pre className="bg-white p-3 rounded text-sm overflow-x-auto max-h-64 overflow-y-auto">
            {JSON.stringify(debugInfo?.serviceResult, null, 2)}
          </pre>
          {debugInfo?.serviceError && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-red-600">Service Error</h3>
              <pre className="bg-red-50 p-3 rounded text-sm overflow-x-auto max-h-32 overflow-y-auto text-red-800">
                {JSON.stringify(debugInfo.serviceError, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Direct Client Query Result</h2>
          <pre className="bg-white p-3 rounded text-sm overflow-x-auto max-h-64 overflow-y-auto">
            {JSON.stringify(debugInfo?.directClientResult, null, 2)}
          </pre>
          {debugInfo?.directClientError && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-red-600">Direct Client Error</h3>
              <pre className="bg-red-50 p-3 rounded text-sm overflow-x-auto max-h-32 overflow-y-auto text-red-800">
                {JSON.stringify(debugInfo.directClientError, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Test Timestamp</h2>
          <p>{debugInfo?.timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default SanityDebug;