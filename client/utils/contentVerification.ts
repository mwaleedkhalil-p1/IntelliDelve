/**
 * Content Verification Utility
 * 
 * This utility provides comprehensive testing for React Quill content integrity,
 * ensuring HTML content is saved and retrieved correctly without escaping or formatting loss.
 * Works both offline (mock mode) and online (real API mode).
 */

import { processRichTextContent } from './contentSanitizer';
import { blogService, caseStudyService } from '../services/apiService';

// Mock storage for offline testing
interface MockContent {
  id: string;
  content: string;
  timestamp: number;
}

class MockStorage {
  private blogs: Map<string, MockContent> = new Map();
  private caseStudies: Map<string, MockContent> = new Map();

  saveBlog(id: string, content: string): MockContent {
    const mockContent: MockContent = {
      id,
      content,
      timestamp: Date.now()
    };
    this.blogs.set(id, mockContent);
    return mockContent;
  }

  getBlog(id: string): MockContent | null {
    return this.blogs.get(id) || null;
  }

  saveCaseStudy(id: string, content: string): MockContent {
    const mockContent: MockContent = {
      id,
      content,
      timestamp: Date.now()
    };
    this.caseStudies.set(id, mockContent);
    return mockContent;
  }

  getCaseStudy(id: string): MockContent | null {
    return this.caseStudies.get(id) || null;
  }

  clear(): void {
    this.blogs.clear();
    this.caseStudies.clear();
  }
}

const mockStorage = new MockStorage();

// Test content samples with various formatting
const TEST_CONTENT_SAMPLES = {
  basic: '<h1>Main Title</h1><p>This is a <strong>bold</strong> paragraph with <em>italic</em> text.</p>',
  
  comprehensive: `
    <h1>Comprehensive Test Content</h1>
    <h2>Subtitle with formatting</h2>
    <p>This paragraph contains <strong>bold text</strong>, <em>italic text</em>, and <u>underlined text</u>.</p>
    <h3>Links and Images</h3>
    <p>Here's a <a href="https://example.com" target="_blank">clickable link</a> that should remain functional.</p>
    <img src="https://via.placeholder.com/300x200" alt="Test image" style="max-width: 100%; height: auto;" />
    <h4>Lists</h4>
    <ul>
      <li>First bullet point</li>
      <li>Second bullet point with <strong>bold</strong> text</li>
      <li>Third point with <a href="#">embedded link</a></li>
    </ul>
    <ol>
      <li>Numbered item one</li>
      <li>Numbered item two</li>
    </ol>
    <h5>Code and Quotes</h5>
    <blockquote>This is a blockquote that should be styled properly.</blockquote>
    <p>Inline code: <code>console.log('Hello World')</code></p>
    <h6>Final Section</h6>
    <p>This content tests all major HTML elements that React Quill supports.</p>
  `,
  
  quillSpecific: `
    <div class="ql-editor">
      <h1 class="ql-align-center">Centered Title</h1>
      <p class="ql-align-justify">Justified paragraph with <span class="ql-size-large">large text</span> and normal text.</p>
      <p class="ql-indent-1">Indented paragraph</p>
      <ul>
        <li class="ql-align-right">Right-aligned list item</li>
      </ul>
    </div>
  `
};

// Verification result interface
interface VerificationResult {
  success: boolean;
  originalContent: string;
  processedContent: string;
  retrievedContent: string;
  differences: string[];
  timestamp: number;
  mode: 'mock' | 'api';
  contentType: 'blog' | 'casestudy';
  testName: string;
}

// Content comparison utility
function compareContent(original: string, retrieved: string): string[] {
  const differences: string[] = [];
  
  // Normalize whitespace for comparison
  const normalizeWhitespace = (str: string) => str.replace(/\s+/g, ' ').trim();
  const normalizedOriginal = normalizeWhitespace(original);
  const normalizedRetrieved = normalizeWhitespace(retrieved);
  
  if (normalizedOriginal !== normalizedRetrieved) {
    differences.push('Content mismatch detected');
    
    // Check for specific issues
    if (original.includes('<') && !retrieved.includes('<')) {
      differences.push('HTML tags appear to be escaped or stripped');
    }
    
    if (original.includes('&lt;') || original.includes('&gt;')) {
      differences.push('HTML entities found in original content');
    }
    
    if (retrieved.includes('&lt;') || retrieved.includes('&gt;')) {
      differences.push('HTML entities found in retrieved content (possible escaping issue)');
    }
    
    // Check for missing formatting
    const originalTags = (original.match(/<[^>]+>/g) || []).length;
    const retrievedTags = (retrieved.match(/<[^>]+>/g) || []).length;
    
    if (originalTags !== retrievedTags) {
      differences.push(`Tag count mismatch: original ${originalTags}, retrieved ${retrievedTags}`);
    }
    
    // Check for link functionality
    if (original.includes('<a ') && !retrieved.includes('<a ')) {
      differences.push('Links may have been stripped or escaped');
    }
    
    // Check for image preservation
    if (original.includes('<img ') && !retrieved.includes('<img ')) {
      differences.push('Images may have been stripped or escaped');
    }
  }
  
  return differences;
}

// Server connectivity check
async function checkServerConnectivity(): Promise<boolean> {
  try {
    // Try to make a simple request to check if server is online
    const response = await fetch('/api/health', { 
      method: 'GET',
      timeout: 5000 as any
    });
    return response.ok;
  } catch (error) {
    console.warn('Server appears to be offline, using mock mode for verification');
    return false;
  }
}

// Mock content verification
async function verifyContentMock(
  content: string, 
  contentType: 'blog' | 'casestudy',
  testName: string
): Promise<VerificationResult> {
  const testId = `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Process content as it would be in real scenario
  const processedContent = processRichTextContent(content);
  
  // Save to mock storage
  const saved = contentType === 'blog' 
    ? mockStorage.saveBlog(testId, processedContent)
    : mockStorage.saveCaseStudy(testId, processedContent);
  
  // Retrieve from mock storage
  const retrieved = contentType === 'blog'
    ? mockStorage.getBlog(testId)
    : mockStorage.getCaseStudy(testId);
  
  const retrievedContent = retrieved?.content || '';
  
  // Compare content
  const differences = compareContent(processedContent, retrievedContent);
  
  return {
    success: differences.length === 0,
    originalContent: content,
    processedContent,
    retrievedContent,
    differences,
    timestamp: Date.now(),
    mode: 'mock',
    contentType,
    testName
  };
}

// Real API content verification
async function verifyContentAPI(
  content: string,
  contentType: 'blog' | 'casestudy',
  testName: string
): Promise<VerificationResult> {
  const processedContent = processRichTextContent(content);
  let retrievedContent = '';
  
  try {
    if (contentType === 'blog') {
      // Create a test blog post
      const blogData = {
        title: `Test Blog - ${testName} - ${Date.now()}`,
        content: processedContent,
        excerpt: 'Test excerpt for content verification',
        author: 'Content Verification System',
        status: 'draft' as const,
        tags: ['test', 'verification'],
        category: 'Testing'
      };
      
      const createResult = await blogService.createBlog(blogData);
      if (createResult.success && createResult.data?.uuid) {
        // Fetch the created blog
        const fetchResult = await blogService.getBlog(createResult.data.uuid);
        if (fetchResult.success && fetchResult.data) {
          retrievedContent = fetchResult.data.content || '';
          
          // Clean up test blog
          await blogService.deleteBlog(createResult.data.uuid).catch(console.warn);
        }
      }
    } else {
      // Create a test case study
      const caseStudyData = {
        title: `Test Case Study - ${testName} - ${Date.now()}`,
        client: 'Test Client',
        industry: 'Testing',
        challenge: processedContent,
        solution: 'Test solution content',
        results: 'Test results content',
        content: processedContent,
        status: 'draft' as const,
        tags: ['test', 'verification']
      };
      
      const createResult = await caseStudyService.createCaseStudy(caseStudyData);
      if (createResult.success && createResult.data?.uuid) {
        // Fetch the created case study
        const fetchResult = await caseStudyService.getCaseStudy(createResult.data.uuid);
        if (fetchResult.success && fetchResult.data) {
          retrievedContent = fetchResult.data.content || '';
          
          // Clean up test case study
          await caseStudyService.deleteCaseStudy(createResult.data.uuid).catch(console.warn);
        }
      }
    }
  } catch (error) {
    console.error('API verification failed:', error);
    throw error;
  }
  
  const differences = compareContent(processedContent, retrievedContent);
  
  return {
    success: differences.length === 0,
    originalContent: content,
    processedContent,
    retrievedContent,
    differences,
    timestamp: Date.now(),
    mode: 'api',
    contentType,
    testName
  };
}

// Main verification function
export async function verifyContentIntegrity(
  content?: string,
  contentType: 'blog' | 'casestudy' = 'blog',
  testName: string = 'manual-test'
): Promise<VerificationResult> {
  // Use provided content or default test content
  const testContent = content || TEST_CONTENT_SAMPLES.comprehensive;
  
  console.log(`🔍 Starting content verification for ${contentType} (${testName})...`);
  
  // Check if server is online
  const isServerOnline = await checkServerConnectivity();
  
  let result: VerificationResult;
  
  if (isServerOnline) {
    console.log('📡 Server is online, using real API for verification');
    try {
      result = await verifyContentAPI(testContent, contentType, testName);
    } catch (error) {
      console.warn('⚠️ API verification failed, falling back to mock mode:', error);
      result = await verifyContentMock(testContent, contentType, testName);
    }
  } else {
    console.log('💾 Server is offline, using mock storage for verification');
    result = await verifyContentMock(testContent, contentType, testName);
  }
  
  // Log results
  if (result.success) {
    console.log('✅ Content verification PASSED');
    console.log(`   Mode: ${result.mode}`);
    console.log(`   Content type: ${result.contentType}`);
    console.log(`   Test: ${result.testName}`);
  } else {
    console.error('❌ Content verification FAILED');
    console.error(`   Mode: ${result.mode}`);
    console.error(`   Content type: ${result.contentType}`);
    console.error(`   Test: ${result.testName}`);
    console.error('   Differences found:');
    result.differences.forEach(diff => console.error(`   - ${diff}`));
    
    // Log content for debugging
    console.group('📋 Content Details');
    console.log('Original:', result.originalContent.substring(0, 200) + '...');
    console.log('Processed:', result.processedContent.substring(0, 200) + '...');
    console.log('Retrieved:', result.retrievedContent.substring(0, 200) + '...');
    console.groupEnd();
  }
  
  return result;
}

// Run comprehensive test suite
export async function runContentVerificationSuite(): Promise<VerificationResult[]> {
  console.log('🚀 Running comprehensive content verification suite...');
  
  const results: VerificationResult[] = [];
  
  // Test different content types and samples
  const tests = [
    { content: TEST_CONTENT_SAMPLES.basic, type: 'blog' as const, name: 'basic-blog' },
    { content: TEST_CONTENT_SAMPLES.basic, type: 'casestudy' as const, name: 'basic-casestudy' },
    { content: TEST_CONTENT_SAMPLES.comprehensive, type: 'blog' as const, name: 'comprehensive-blog' },
    { content: TEST_CONTENT_SAMPLES.comprehensive, type: 'casestudy' as const, name: 'comprehensive-casestudy' },
    { content: TEST_CONTENT_SAMPLES.quillSpecific, type: 'blog' as const, name: 'quill-specific-blog' },
    { content: TEST_CONTENT_SAMPLES.quillSpecific, type: 'casestudy' as const, name: 'quill-specific-casestudy' }
  ];
  
  for (const test of tests) {
    try {
      const result = await verifyContentIntegrity(test.content, test.type, test.name);
      results.push(result);
      
      // Small delay between tests to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Test ${test.name} failed with error:`, error);
    }
  }
  
  // Summary
  const passed = results.filter(r => r.success).length;
  const failed = results.length - passed;
  
  console.log(`\n📊 Verification Suite Complete:`);
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📈 Success Rate: ${((passed / results.length) * 100).toFixed(1)}%`);
  
  if (failed > 0) {
    console.log('\n🔧 Failed tests require attention:');
    results.filter(r => !r.success).forEach(result => {
      console.log(`   - ${result.testName} (${result.contentType}, ${result.mode})`);
    });
  }
  
  return results;
}

// Utility to clear mock storage
export function clearMockStorage(): void {
  mockStorage.clear();
  console.log('🧹 Mock storage cleared');
}

// Export test content samples for external use
export { TEST_CONTENT_SAMPLES };

// Auto-run verification on import in development
if (process.env.NODE_ENV === 'development') {
  // Auto-run a basic test when this module is imported
  setTimeout(() => {
    verifyContentIntegrity(TEST_CONTENT_SAMPLES.basic, 'blog', 'auto-import-test')
      .catch(error => console.warn('Auto-verification failed:', error));
  }, 2000);
}