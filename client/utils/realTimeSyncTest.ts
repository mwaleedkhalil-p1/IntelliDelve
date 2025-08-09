/**
 * Real-time Sync Testing and Debugging Script
 * 
 * This utility helps verify that the cache/real-time update system is working correctly.
 * Run this in the browser console or import it into your components for debugging.
 */

import { queryClient } from '../lib/queryClient';
import { cacheManager } from './cacheManager';
import { blogService, caseStudyService } from '../services/apiService';

interface TestResult {
  test: string;
  passed: boolean;
  details: string;
  timestamp: Date;
}

class RealTimeSyncTester {
  private results: TestResult[] = [];

  private log(test: string, passed: boolean, details: string) {
    const result: TestResult = {
      test,
      passed,
      details,
      timestamp: new Date(),
    };
    this.results.push(result);
    
    const emoji = passed ? '✅' : '❌';
    console.log(`${emoji} ${test}: ${details}`);
    
    return result;
  }

  // Test 1: Verify QueryClient Configuration
  testQueryClientConfig() {
    console.log('\n🔧 Testing QueryClient Configuration...');
    
    const defaultOptions = queryClient.getDefaultOptions();
    const queries = defaultOptions.queries;
    
    this.log(
      'Stale Time Configuration',
      queries?.staleTime === 0,
      `staleTime is ${queries?.staleTime} (should be 0 for real-time behavior)`
    );
    
    this.log(
      'Refetch on Mount',
      queries?.refetchOnMount === 'always',
      `refetchOnMount is ${queries?.refetchOnMount} (should be 'always')`
    );
    
    this.log(
      'Refetch on Window Focus',
      queries?.refetchOnWindowFocus === true,
      `refetchOnWindowFocus is ${queries?.refetchOnWindowFocus} (should be true)`
    );
    
    this.log(
      'GC Time Configuration',
      queries?.gcTime === 1000 * 60 * 30,
      `gcTime is ${queries?.gcTime} (should be 30 minutes for background updates)`
    );
  }

  // Test 2: Verify Cache Manager Setup
  testCacheManagerSetup() {
    console.log('\n🎛️ Testing Cache Manager Setup...');
    
    this.log(
      'Cache Manager Initialized',
      !!cacheManager,
      'Cache manager instance exists'
    );
    
    // Test BroadcastChannel support
    const hasBroadcastChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window;
    this.log(
      'BroadcastChannel Support',
      hasBroadcastChannel,
      `BroadcastChannel API is ${hasBroadcastChannel ? 'available' : 'not available'} in this browser`
    );
  }

  // Test 3: Test Query Keys Consistency
  testQueryKeysConsistency() {
    console.log('\n🔑 Testing Query Keys Consistency...');
    
    // Import query keys
    import('../hooks/useApi').then(({ queryKeys }) => {
      this.log(
        'Blog Query Keys Structure',
        !!(queryKeys.blogs.all && queryKeys.blogs.lists && queryKeys.blogs.details),
        `Blog keys: ${JSON.stringify(queryKeys.blogs)}`
      );
      
      this.log(
        'Case Study Query Keys Structure',
        !!(queryKeys.caseStudies.all && queryKeys.caseStudies.lists && queryKeys.caseStudies.details),
        `Case Study keys: ${JSON.stringify(queryKeys.caseStudies)}`
      );
    });
  }

  // Test 4: Test Cache Invalidation
  async testCacheInvalidation() {
    console.log('\n🔄 Testing Cache Invalidation...');
    
    try {
      // Test blog cache invalidation
      const blogQueriesBeforeInvalidation = queryClient.getQueriesData({ queryKey: ['blogs'] });
      await cacheManager.invalidateBlogs();
      
      this.log(
        'Blog Cache Invalidation',
        true,
        `Invalidated ${blogQueriesBeforeInvalidation.length} blog queries`
      );
      
      // Test case study cache invalidation
      const caseStudyQueriesBeforeInvalidation = queryClient.getQueriesData({ queryKey: ['case-studies'] });
      await cacheManager.invalidateCaseStudies();
      
      this.log(
        'Case Study Cache Invalidation',
        true,
        `Invalidated ${caseStudyQueriesBeforeInvalidation.length} case study queries`
      );
    } catch (error) {
      this.log(
        'Cache Invalidation Error',
        false,
        `Error during cache invalidation: ${error}`
      );
    }
  }

  // Test 5: Test Cross-Tab Communication
  testCrossTabCommunication() {
    console.log('\n📡 Testing Cross-Tab Communication...');
    
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const testChannel = new BroadcastChannel('intellidelve-cache-updates-test');
      let messageReceived = false;
      
      // Set up listener
      testChannel.onmessage = (event) => {
        if (event.data.type === 'test') {
          messageReceived = true;
          this.log(
            'Cross-Tab Message Received',
            true,
            `Received test message: ${JSON.stringify(event.data)}`
          );
          testChannel.close();
        }
      };
      
      // Send test message
      setTimeout(() => {
        testChannel.postMessage({ type: 'test', data: 'Hello from sync tester!' });
        
        setTimeout(() => {
          this.log(
            'Cross-Tab Communication',
            messageReceived,
            messageReceived ? 'Successfully sent and received test message' : 'Failed to receive test message'
          );
          if (!messageReceived) {
            testChannel.close();
          }
        }, 100);
      }, 50);
    } else {
      this.log(
        'Cross-Tab Communication',
        false,
        'BroadcastChannel API not available in this browser'
      );
    }
  }

  // Test 6: Test API Response Handling
  async testAPIResponseHandling() {
    console.log('\n🌐 Testing API Response Handling...');
    
    try {
      // Test blog API
      const blogResponse = await blogService.getBlogs({ limit: 1 });
      this.log(
        'Blog API Response Structure',
        !!(blogResponse && typeof blogResponse === 'object' && 'success' in blogResponse),
        `Blog API response: ${blogResponse ? 'Valid structure' : 'Invalid structure'}`
      );
      
      // Test case study API
      const caseStudyResponse = await caseStudyService.getCaseStudies({ limit: 1 });
      this.log(
        'Case Study API Response Structure',
        !!(caseStudyResponse && typeof caseStudyResponse === 'object' && 'success' in caseStudyResponse),
        `Case Study API response: ${caseStudyResponse ? 'Valid structure' : 'Invalid structure'}`
      );
    } catch (error) {
      this.log(
        'API Response Error',
        false,
        `Error during API testing: ${error}`
      );
    }
  }

  // Test 7: Test Optimistic Updates (Mock)
  testOptimisticUpdates() {
    console.log('\n⚡ Testing Optimistic Updates...');
    
    // Mock optimistic update for blogs
    const mockBlogData = {
      uuid: 'test-blog-123',
      title: 'Test Blog',
      content: 'Test content',
      author: 'Test Author',
      category: 'Test',
      status: 'draft' as const,
      tags: ['test'],
      excerpt: 'Test excerpt'
    };
    
    try {
      cacheManager.optimisticallyUpdateBlogs((old: any) => {
        if (!old?.success) return old;
        return {
          ...old,
          data: {
            ...old.data,
            data: [mockBlogData, ...(old.data?.data || [])],
            total: (old.data?.total || 0) + 1
          }
        };
      });
      
      this.log(
        'Blog Optimistic Update',
        true,
        'Successfully executed optimistic blog update'
      );
    } catch (error) {
      this.log(
        'Blog Optimistic Update',
        false,
        `Error during optimistic update: ${error}`
      );
    }
  }

  // Test 8: Test Real-time Polling Configuration
  async testRealTimePolling() {
    console.log('\n🔄 Testing Real-time Polling Configuration...');
    
    // Check if queries have polling configured
    const activeQueries = queryClient.getQueryCache().getAll();
    const blogQueries = activeQueries.filter(query => 
      query.queryKey[0] === 'blogs' && query.queryKey[1] === 'lists'
    );
    
    this.log(
      'Active Blog Queries',
      blogQueries.length > 0,
      `Found ${blogQueries.length} active blog queries`
    );
    
    if (blogQueries.length > 0) {
      const hasRefetchInterval = blogQueries.some(query => 
        query.options?.refetchInterval === 30000
      );
      
      this.log(
        'Polling Configuration',
        hasRefetchInterval,
        hasRefetchInterval ? 'Queries have 30-second polling configured' : 'Queries missing polling configuration'
      );
    }
  }

  // Generate Test Report
  generateReport() {
    console.log('\n📊 Real-time Sync Test Report');
    console.log('=' .repeat(50));
    
    const passedTests = this.results.filter(r => r.passed).length;
    const totalTests = this.results.length;
    const successRate = Math.round((passedTests / totalTests) * 100);
    
    console.log(`Overall Success Rate: ${passedTests}/${totalTests} (${successRate}%)`);
    console.log('\nDetailed Results:');
    
    this.results.forEach(result => {
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      console.log(`${status} ${result.test}: ${result.details}`);
    });
    
    if (successRate < 100) {
      console.log('\n⚠️  Some tests failed. Please review the implementation:');
      console.log('1. Check QueryClient configuration in client/lib/queryClient.ts');
      console.log('2. Verify cache manager setup in client/utils/cacheManager.ts');
      console.log('3. Review API hooks in client/hooks/useApi.ts');
      console.log('4. Ensure BroadcastChannel is supported in your browser');
    } else {
      console.log('\n🎉 All tests passed! Your real-time sync system is working correctly.');
    }
    
    return {
      successRate,
      passedTests,
      totalTests,
      results: this.results
    };
  }

  // Run All Tests
  async runAllTests() {
    console.log('🚀 Starting Real-time Sync Test Suite...');
    console.log('=' .repeat(50));
    
    this.results = []; // Reset results
    
    this.testQueryClientConfig();
    this.testCacheManagerSetup();
    this.testQueryKeysConsistency();
    await this.testCacheInvalidation();
    this.testCrossTabCommunication();
    await this.testAPIResponseHandling();
    this.testOptimisticUpdates();
    await this.testRealTimePolling();
    
    // Wait a bit for async tests to complete
    setTimeout(() => {
      return this.generateReport();
    }, 1000);
  }
}

// Export for use in browser console or components
export const realTimeSyncTester = new RealTimeSyncTester();

// Auto-run in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Wait for app to initialize
  setTimeout(() => {
    console.log('🔍 Auto-running Real-time Sync Tests in Development Mode...');
    realTimeSyncTester.runAllTests();
  }, 3000);
}

// Make available globally in dev mode
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  (window as any).testRealTimeSync = realTimeSyncTester;
}
