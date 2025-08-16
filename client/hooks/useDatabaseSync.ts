import { useEffect, useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { databasePollingService } from '../services/databasePollingService';

/**
 * Hook that provides database synchronization for real-time updates
 * This solves the issue where direct database changes don't trigger frontend updates
 */
export const useDatabaseSync = () => {
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);

  useEffect(() => {
    // Ensure database polling is active
    const status = databasePollingService.getStatus();
    setIsConnected(status.isPolling);
    setLastSync(status.lastCheck);

    // Start polling if not already started
    if (!status.isPolling) {
      databasePollingService.startPolling();
      setIsConnected(true);
    }

    // Set up periodic status checks
    const statusInterval = setInterval(() => {
      const currentStatus = databasePollingService.getStatus();
      setIsConnected(currentStatus.isPolling);
      setLastSync(currentStatus.lastCheck);
    }, 5000);

    return () => {
      clearInterval(statusInterval);
    };
  }, []);

  const forceSync = useCallback(async () => {
    console.log('🔄 Forcing database sync check');
    await databasePollingService.forceCheck();
    
    const status = databasePollingService.getStatus();
    setLastSync(status.lastCheck);
  }, []);

  const adjustPollingFrequency = useCallback((frequency: number) => {
    databasePollingService.setPollingFrequency(frequency);
    console.log(`🔄 Database polling frequency set to ${frequency}ms`);
  }, []);

  return {
    isConnected,
    lastSync,
    forceSync,
    adjustPollingFrequency,
  };
};

/**
 * Hook that provides aggressive database synchronization
 * Uses faster polling for immediate updates
 */
export const useAggressiveDatabaseSync = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Set aggressive polling (1 second intervals)
    databasePollingService.setPollingFrequency(1000);
    
    console.log('🚀 Aggressive database sync enabled (1 second polling)');

    return () => {
      // Reset to normal polling when component unmounts
      databasePollingService.setPollingFrequency(2000);
      console.log('🔄 Database sync reset to normal frequency');
    };
  }, []);

  const forceSyncNow = useCallback(async () => {
    console.log('🚀 Force sync NOW');
    
    // Force immediate check
    await databasePollingService.forceCheck();
    
    // Also force refetch all queries
    await queryClient.refetchQueries({
      type: 'all'
    });
  }, [queryClient]);

  return { forceSyncNow };
};

/**
 * Hook for development/debugging that provides manual control
 */
export const useDatabaseSyncDebug = () => {
  const [pollingFrequency, setPollingFrequency] = useState(2000);
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    const status = databasePollingService.getStatus();
    setIsPolling(status.isPolling);
    setPollingFrequency(status.pollingFrequency);
  }, []);

  const startPolling = useCallback(() => {
    databasePollingService.startPolling();
    setIsPolling(true);
  }, []);

  const stopPolling = useCallback(() => {
    databasePollingService.stopPolling();
    setIsPolling(false);
  }, []);

  const updateFrequency = useCallback((frequency: number) => {
    databasePollingService.setPollingFrequency(frequency);
    setPollingFrequency(frequency);
  }, []);

  const forceCheck = useCallback(async () => {
    await databasePollingService.forceCheck();
  }, []);

  const getStatus = useCallback(() => {
    return databasePollingService.getStatus();
  }, []);

  return {
    isPolling,
    pollingFrequency,
    startPolling,
    stopPolling,
    updateFrequency,
    forceCheck,
    getStatus,
  };
};

export default useDatabaseSync;