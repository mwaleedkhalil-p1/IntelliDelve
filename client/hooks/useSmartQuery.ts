/**
 * Smart Query Hook with Conditional Polling
 * 
 * This hook prevents race conditions during delete operations by temporarily
 * disabling background polling when delete operations are in progress.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// Track active delete operations globally
const activeDeletions = new Set<string>();

// Helper to manage active deletions
export const deleteTracker = {
  start: (id: string) => {
    activeDeletions.add(id);
    console.log(`🔥 Delete started for ${id}. Active deletions:`, activeDeletions.size);
  },
  finish: (id: string) => {
    activeDeletions.delete(id);
    console.log(`✅ Delete finished for ${id}. Active deletions:`, activeDeletions.size);
  },
  hasActiveDeletions: () => activeDeletions.size > 0,
  getActiveDeletions: () => Array.from(activeDeletions),
};

interface UseSmartQueryOptions {
  queryKey: any[];
  queryFn: () => Promise<any>;
  enabled?: boolean;
  staleTime?: number;
  refetchOnMount?: boolean | 'always';
  refetchOnWindowFocus?: boolean;
  gcTime?: number;
  refetchInterval?: number | false;
  refetchIntervalInBackground?: boolean;
  deleteTrackingPrefix?: string; // e.g., 'blog-', 'case-study-'
}

export const useSmartQuery = ({
  queryKey,
  queryFn,
  enabled = true,
  staleTime = 0,
  refetchOnMount = 'always',
  refetchOnWindowFocus = true,
  gcTime = 1000 * 60 * 5,
  refetchInterval = 30000,
  refetchIntervalInBackground = true,
  deleteTrackingPrefix,
}: UseSmartQueryOptions) => {
  const [shouldPause, setShouldPause] = useState(false);
  
  // Check for relevant active deletions
  useEffect(() => {
    const checkActiveDeletions = () => {
      if (!deleteTrackingPrefix) {
        setShouldPause(false);
        return;
      }
      
      const relevantDeletions = Array.from(activeDeletions).some(id => 
        id.startsWith(deleteTrackingPrefix)
      );
      
      setShouldPause(relevantDeletions);
    };
    
    // Check immediately
    checkActiveDeletions();
    
    // Set up polling to check for changes
    const interval = setInterval(checkActiveDeletions, 100);
    
    return () => clearInterval(interval);
  }, [deleteTrackingPrefix]);
  
  // Determine the actual refetch interval
  const actualRefetchInterval = shouldPause ? false : refetchInterval;
  
  useEffect(() => {
    if (shouldPause) {
      console.log(`⏸️ Pausing polling for query ${JSON.stringify(queryKey)} due to active deletions`);
    } else {
      console.log(`▶️ Resuming polling for query ${JSON.stringify(queryKey)}`);
    }
  }, [shouldPause, queryKey]);
  
  return useQuery({
    queryKey,
    queryFn,
    enabled: enabled && !shouldPause,
    staleTime,
    refetchOnMount,
    refetchOnWindowFocus: shouldPause ? false : refetchOnWindowFocus,
    gcTime,
    refetchInterval: actualRefetchInterval,
    refetchIntervalInBackground: shouldPause ? false : refetchIntervalInBackground,
  });
};
