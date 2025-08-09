import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set to 0 for real-time behavior - always consider data stale for CMS/blog data
      staleTime: 0,
      // Keep data in cache for longer for background refetches
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: (failureCount, error) => {
        // Don't retry auth errors
        if (error?.message?.includes('authentication')) {
          return false;
        }
        return failureCount < 3; // Increase retry count
      },
      // Enable window focus refetch for real-time updates
      refetchOnWindowFocus: true,
      // Enable mount refetch for fresh data
      refetchOnMount: 'always',
      // Refetch when network comes back online
      refetchOnReconnect: 'always',
    },
    mutations: {
      // Increase retry count for mutations
      retry: (failureCount, error) => {
        // Don't retry validation errors (4xx)
        if (error?.message?.includes('validation') || error?.message?.includes('400')) {
          return false;
        }
        return failureCount < 2;
      },
      // Network error handling
      networkMode: 'always',
    },
  },
});
