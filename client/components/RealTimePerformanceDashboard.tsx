import React, { useState, useEffect } from 'react';
import { monitoringService } from '../services/monitoringService';

interface PerformanceMetrics {
  webhookProcessingTimes: number[];
  cacheInvalidationTimes: number[];
  averageWebhookTime: number;
  averageCacheTime: number;
  subSecondSuccessRate: number;
}

export const RealTimePerformanceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const updateMetrics = () => {
      try {
        const realTimeMetrics = monitoringService.getRealTimeMetrics();
        setMetrics(realTimeMetrics);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to fetch real-time metrics:', error);
        setIsConnected(false);
      }
    };

    // Update metrics every second for real-time monitoring
    updateMetrics();
    const interval = setInterval(updateMetrics, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!metrics) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-300 rounded"></div>
            <div className="h-3 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (value: number, threshold: number, inverse = false) => {
    const isGood = inverse ? value < threshold : value > threshold;
    return isGood ? 'text-green-600' : 'text-red-600';
  };

  const getStatusBadge = (value: number, threshold: number, inverse = false) => {
    const isGood = inverse ? value < threshold : value > threshold;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        isGood ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {isGood ? 'GOOD' : 'ALERT'}
      </span>
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Real-Time Performance Dashboard
        </h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sub-Second Success Rate */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Sub-Second Success Rate</h3>
            {getStatusBadge(metrics.subSecondSuccessRate, 95)}
          </div>
          <div className={`text-2xl font-bold ${getStatusColor(metrics.subSecondSuccessRate, 95)}`}>
            {metrics.subSecondSuccessRate.toFixed(1)}%
          </div>
          <p className="text-xs text-gray-600 mt-1">Target: &gt;95%</p>
        </div>

        {/* Average Webhook Time */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Avg Webhook Time</h3>
            {getStatusBadge(metrics.averageWebhookTime, 500, true)}
          </div>
          <div className={`text-2xl font-bold ${getStatusColor(metrics.averageWebhookTime, 500, true)}`}>
            {metrics.averageWebhookTime.toFixed(0)}ms
          </div>
          <p className="text-xs text-gray-600 mt-1">Target: &lt;500ms</p>
        </div>

        {/* Average Cache Time */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Avg Cache Time</h3>
            {getStatusBadge(metrics.averageCacheTime, 100, true)}
          </div>
          <div className={`text-2xl font-bold ${getStatusColor(metrics.averageCacheTime, 100, true)}`}>
            {metrics.averageCacheTime.toFixed(0)}ms
          </div>
          <p className="text-xs text-gray-600 mt-1">Target: &lt;100ms</p>
        </div>
      </div>

      {/* Recent Performance Chart */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Performance</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Webhook Processing Times */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Webhook Processing Times</h4>
            <div className="space-y-2">
              {metrics.webhookProcessingTimes.slice(-5).map((time, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Request {index + 1}</span>
                  <span className={`text-sm font-medium ${
                    time < 500 ? 'text-green-600' : time < 1000 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {time.toFixed(0)}ms
                  </span>
                </div>
              ))}
              {metrics.webhookProcessingTimes.length === 0 && (
                <p className="text-sm text-gray-500 italic">No recent webhook requests</p>
              )}
            </div>
          </div>

          {/* Cache Invalidation Times */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Cache Invalidation Times</h4>
            <div className="space-y-2">
              {metrics.cacheInvalidationTimes.slice(-5).map((time, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Operation {index + 1}</span>
                  <span className={`text-sm font-medium ${
                    time < 100 ? 'text-green-600' : time < 500 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {time.toFixed(0)}ms
                  </span>
                </div>
              ))}
              {metrics.cacheInvalidationTimes.length === 0 && (
                <p className="text-sm text-gray-500 italic">No recent cache operations</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Performance Indicators</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Excellent (&lt;500ms)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Good (500ms-1s)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Needs Attention (&gt;1s)</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Refresh Dashboard
        </button>
        <button 
          onClick={() => {
            const data = monitoringService.exportMetrics();
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `performance-metrics-${new Date().toISOString()}.json`;
            a.click();
          }}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          Export Metrics
        </button>
      </div>
    </div>
  );
};

export default RealTimePerformanceDashboard;