#!/usr/bin/env node

/**
 * Ngrok Troubleshooting Script
 * Tests the ngrok tunnel connectivity and provides solutions
 */

import https from 'https';
import http from 'http';

const NGROK_URL = 'https://informed-bluebird-right.ngrok-free.app';
const TEST_ENDPOINTS = [
  '/api/auth/validate/',
  '/api/blogs/',
  '/api/case-studies/'
];

console.log('🔍 Ngrok Troubleshooting Script');
console.log('================================\n');

// Test function
async function testEndpoint(url, headers = {}) {
  return new Promise((resolve) => {
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...headers
      }
    };

    const request = https.request(url, options, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        resolve({
          status: response.statusCode,
          headers: response.headers,
          data: data,
          contentType: response.headers['content-type'] || 'unknown'
        });
      });
    });
    
    request.on('error', (error) => {
      resolve({
        error: error.message,
        status: 'ERROR'
      });
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      resolve({
        error: 'Request timeout',
        status: 'TIMEOUT'
      });
    });
    
    request.end();
  });
}

async function runTests() {
  console.log(`📡 Testing ngrok tunnel: ${NGROK_URL}\n`);
  
  // Test 1: Basic connectivity
  console.log('🔗 Test 1: Basic Connectivity');
  console.log('------------------------------');
  
  const basicTest = await testEndpoint(NGROK_URL);
  
  if (basicTest.error) {
    console.log(`❌ Failed: ${basicTest.error}`);
    console.log('\n💡 Solutions:');
    console.log('  1. Make sure ngrok is running: ngrok http 8000');
    console.log('  2. Check if the URL is correct');
    console.log('  3. Verify your internet connection');
    return false;
  }
  
  if (basicTest.data.includes('ngrok.com')) {
    console.log('⚠️  Ngrok warning page detected');
    console.log(`   Status: ${basicTest.status}`);
    console.log(`   Content-Type: ${basicTest.contentType}`);
    console.log('\n💡 This is normal for ngrok free tier');
  } else {
    console.log('✅ Direct connection successful');
  }
  
  // Test 2: API endpoints with bypass header
  console.log('\n🎯 Test 2: API Endpoints with Bypass Header');
  console.log('--------------------------------------------');
  
  for (const endpoint of TEST_ENDPOINTS) {
    const fullUrl = NGROK_URL + endpoint;
    console.log(`\nTesting: ${endpoint}`);
    
    const result = await testEndpoint(fullUrl, {
      'ngrok-skip-browser-warning': 'true'
    });
    
    if (result.error) {
      console.log(`❌ ${endpoint}: ${result.error}`);
    } else if (result.data.includes('ngrok.com')) {
      console.log(`⚠️  ${endpoint}: Still showing ngrok warning (Status: ${result.status})`);
    } else if (result.contentType.includes('text/html')) {
      console.log(`⚠️  ${endpoint}: Receiving HTML instead of JSON (Status: ${result.status})`);
      console.log('   This suggests the backend server might not be running');
    } else if (result.contentType.includes('application/json')) {
      console.log(`✅ ${endpoint}: Receiving JSON response (Status: ${result.status})`);
    } else {
      console.log(`⚠️  ${endpoint}: Unexpected content type: ${result.contentType} (Status: ${result.status})`);
    }
  }
  
  // Provide solutions
  console.log('\n🔧 Troubleshooting Solutions');
  console.log('============================\n');
  
  console.log('1. 🚀 Start your backend server:');
  console.log('   cd your-django-project');
  console.log('   python manage.py runserver 8000\n');
  
  console.log('2. 🌐 Start ngrok tunnel:');
  console.log('   ngrok http 8000\n');
  
  console.log('3. 🔄 Restart your frontend development server:');
  console.log('   npm run dev\n');
  
  console.log('4. 🛠️  If still getting HTML responses:');
  console.log('   - Check Django CORS configuration');
  console.log('   - Verify API endpoints exist in Django');
  console.log('   - Check Django URL routing\n');
  
  console.log('5. 🎯 Test API directly in browser:');
  console.log(`   Visit: ${NGROK_URL}/api/blogs/`);
  console.log(`   Should return JSON, not HTML\n`);
  
  console.log('6. 📝 Check Django logs for errors:');
  console.log('   Look for 404, 500, or CORS errors\n');
  
  return true;
}

// Run the tests
runTests().catch(console.error);
