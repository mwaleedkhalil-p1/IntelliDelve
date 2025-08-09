import React from 'react';
import { SEO } from '@/components/SEO';
import { ApiTestComponent } from '@/components/admin/ApiTestComponent';

const ApiTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <SEO
        title="API Test | IntelliDelve"
        description="API connection testing page"
        noIndex={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            API Connection Test
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Test the connection to the IntelliDelve API backend
          </p>
        </div>
        
        <ApiTestComponent />
      </div>
    </div>
  );
};

export default ApiTest;
