import React from 'react';
import { TestTube } from 'lucide-react';

export const ApiTestComponent: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <TestTube className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Test Component</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        API testing functionality will be implemented here.
      </p>
    </div>
  );
};