import React, { createContext, useContext, ReactNode } from 'react';
import { useRealTimeUpdates, useManualRefresh } from '../hooks/useRealTimeUpdates';
import { UpdateEvent } from '../services/realTimeUpdateService';

interface AutoRefreshContextType {
  lastUpdate: UpdateEvent | null;
  isConnected: boolean;
  triggerRefresh: (contentType: 'blog' | 'case-study', contentId: string, action: UpdateEvent['action']) => Promise<void>;
  forceRefreshAll: (contentType?: 'blog' | 'case-study') => Promise<void>;
  manualRefresh: {
    isRefreshing: boolean;
    refreshAll: () => Promise<void>;
    refreshBlogs: () => Promise<void>;
    refreshCaseStudies: () => Promise<void>;
  };
}

const AutoRefreshContext = createContext<AutoRefreshContextType | null>(null);

interface AutoRefreshProviderProps {
  children: ReactNode;
  showNotifications?: boolean;
}

/**
 * Provider component that enables automatic refresh functionality
 * Add this to your app root or specific pages that need auto-refresh
 */
export const AutoRefreshProvider: React.FC<AutoRefreshProviderProps> = ({ 
  children, 
  showNotifications = false 
}) => {
  const realTimeUpdates = useRealTimeUpdates();
  const manualRefresh = useManualRefresh();

  const contextValue: AutoRefreshContextType = {
    ...realTimeUpdates,
    manualRefresh,
  };

  return (
    <AutoRefreshContext.Provider value={contextValue}>
      {children}
      {showNotifications && <AutoRefreshNotifications />}
    </AutoRefreshContext.Provider>
  );
};

/**
 * Hook to access auto-refresh functionality
 */
export const useAutoRefresh = () => {
  const context = useContext(AutoRefreshContext);
  if (!context) {
    throw new Error('useAutoRefresh must be used within an AutoRefreshProvider');
  }
  return context;
};

/**
 * Component that shows notifications when content is updated
 */
const AutoRefreshNotifications: React.FC = () => {
  const { lastUpdate, isConnected } = useAutoRefresh();
  const [showNotification, setShowNotification] = React.useState(false);

  React.useEffect(() => {
    if (lastUpdate) {
      setShowNotification(true);
      
      // Hide notification after 3 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [lastUpdate]);

  if (!showNotification || !lastUpdate) {
    return null;
  }

  const getNotificationMessage = (event: UpdateEvent) => {
    const contentType = event.contentType === 'blog' ? 'Blog' : 'Case Study';
    
    switch (event.type) {
      case 'content-created':
        return `New ${contentType.toLowerCase()} created`;
      case 'content-updated':
        return `${contentType} updated`;
      case 'content-deleted':
        return `${contentType} deleted`;
      default:
        return `${contentType} changed`;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`
        bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg
        transform transition-all duration-300 ease-in-out
        ${showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">
            {getNotificationMessage(lastUpdate)}
          </span>
        </div>
        <div className="text-xs opacity-75 mt-1">
          Content refreshed automatically
        </div>
      </div>
    </div>
  );
};

/**
 * Component that shows connection status and manual refresh button
 */
export const RefreshControls: React.FC = () => {
  const { isConnected, manualRefresh } = useAutoRefresh();

  return (
    <div className="flex items-center space-x-4">
      {/* Connection Status */}
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm text-gray-600">
          {isConnected ? 'Auto-refresh active' : 'Auto-refresh disconnected'}
        </span>
      </div>

      {/* Manual Refresh Button */}
      <button
        onClick={manualRefresh.refreshAll}
        disabled={manualRefresh.isRefreshing}
        className={`
          px-3 py-1 text-sm rounded-md border transition-colors
          ${manualRefresh.isRefreshing 
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }
        `}
      >
        {manualRefresh.isRefreshing ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <span>Refreshing...</span>
          </div>
        ) : (
          'Refresh'
        )}
      </button>
    </div>
  );
};

/**
 * Simple refresh button component
 */
export const RefreshButton: React.FC<{
  contentType?: 'blog' | 'case-study';
  className?: string;
}> = ({ contentType, className = '' }) => {
  const { manualRefresh } = useAutoRefresh();

  const handleRefresh = () => {
    if (contentType === 'blog') {
      manualRefresh.refreshBlogs();
    } else if (contentType === 'case-study') {
      manualRefresh.refreshCaseStudies();
    } else {
      manualRefresh.refreshAll();
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={manualRefresh.isRefreshing}
      className={`
        inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm 
        leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {manualRefresh.isRefreshing ? (
        <>
          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2"></div>
          Refreshing...
        </>
      ) : (
        <>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </>
      )}
    </button>
  );
};

export default AutoRefreshProvider;