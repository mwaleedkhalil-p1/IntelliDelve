// Simple API test utility to debug authentication issues
import axios from 'axios';

const API_BASE_URL = 'https://informed-bluebird-right.ngrok-free.app';

export const testApiConnection = async () => {
  console.log('🔍 Testing API Connection...');

  try {
    // Test 1: Try login endpoint directly (skip health check)
    console.log('1. Testing login endpoint directly...');
    const loginResponse = await axios.post(
      `${API_BASE_URL}/api/auth/login/`,
      {
        email: 'shahmirkhan9181@gmail.com',
        password: 'IntelliDelveIntern123@'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000,
        withCredentials: false
      }
    );

    console.log('✅ Login successful:', {
      status: loginResponse.status,
      data: loginResponse.data
    });

    return loginResponse.data;
  } catch (error: any) {
    console.log('❌ Login failed:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.config?.data
      }
    });

    // If it's a CORS error, provide specific guidance
    if (error.code === 'ERR_NETWORK' && error.message === 'Network Error') {
      console.log('🚨 This appears to be a CORS issue. The backend needs to be configured to allow requests from http://localhost:3000');
      console.log('📋 Backend CORS configuration needed:');
      console.log('   - Allow origin: http://localhost:3000');
      console.log('   - Allow headers: Content-Type, Authorization');
      console.log('   - Allow methods: GET, POST, PUT, DELETE, OPTIONS');
    }

    throw error;
  }
};

export const testBlogsEndpoint = async (token?: string) => {
  console.log('🔍 Testing Blogs Endpoint...');
  
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const blogsResponse = await axios.get(`${API_BASE_URL}/api/blogs/`, {
      headers,
      timeout: 10000,
      withCredentials: false
    });
    
    console.log('✅ Blogs fetch successful:', {
      status: blogsResponse.status,
      dataLength: blogsResponse.data?.data?.data?.length || 0
    });
    
    return blogsResponse.data;
  } catch (error: any) {
    console.log('❌ Blogs fetch failed:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    
    throw error;
  }
};

// Function to run all tests
export const runApiTests = async () => {
  console.log('🚀 Starting API Tests...');

  try {
    const loginResult = await testApiConnection();
    const token = loginResult?.data?.token;

    if (token) {
      await testBlogsEndpoint(token);
    }

    console.log('✅ All tests completed successfully!');
  } catch (error) {
    console.log('❌ Tests failed:', error);
  }
};

// Expose test functions globally for manual testing
declare global {
  interface Window {
    testAPI: {
      testConnection: typeof testApiConnection;
      testBlogs: typeof testBlogsEndpoint;
      runAll: typeof runApiTests;
    };
  }
}

// Make functions available globally
if (typeof window !== 'undefined') {
  window.testAPI = {
    testConnection: testApiConnection,
    testBlogs: testBlogsEndpoint,
    runAll: runApiTests,
  };
}
