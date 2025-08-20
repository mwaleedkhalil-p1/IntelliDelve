import { test, expect } from '@playwright/test';
import { BasePage } from './utils/base-page';

// All routes from the application
const routes = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About Us' },
  { path: '/industries', name: 'Industries' },
  { path: '/privacy-policy', name: 'Privacy Policy' },
  { path: '/cookies', name: 'Cookies' },
  { path: '/services', name: 'Services' },
  { path: '/solutions', name: 'Solutions' },
  { path: '/case-studies', name: 'Case Studies' },
  { path: '/partners', name: 'Partners' },
  { path: '/clients', name: 'Clients' },
  { path: '/careers', name: 'Careers' },
  { path: '/blogs', name: 'Blogs' },
  { path: '/contact', name: 'Contact' },
  
  // Solution pages
  { path: '/solutions/background-screening', name: 'Background Screening Solution' },
  { path: '/solutions/corporate-due-diligence', name: 'Corporate Due Diligence' },
  { path: '/solutions/ai-data-science', name: 'AI Data Science' },
  { path: '/solutions/tech-innovation', name: 'Tech Innovation' },
  
  // Industry pages
  { path: '/industries/banking-financial', name: 'Banking Financial' },
  { path: '/industries/healthcare-medical', name: 'Healthcare Medical' },
  { path: '/industries/corporate-professional', name: 'Corporate Professional' },
  { path: '/industries/insurance', name: 'Insurance' },
  { path: '/industries/legal-services', name: 'Legal Services' },
  { path: '/industries/real-estate', name: 'Real Estate' },
  { path: '/industries/accounting-advisory', name: 'Accounting Advisory' },
  { path: '/industries/it-software', name: 'IT Software' },
  { path: '/industries/startups-tech', name: 'Startups Tech' },
  { path: '/industries/ecommerce-digital', name: 'Ecommerce Digital' },
  { path: '/industries/telecommunications', name: 'Telecommunications' },
  { path: '/industries/government-public', name: 'Government Public' },
  { path: '/industries/education-academic', name: 'Education Academic' },
  { path: '/industries/non-profit', name: 'Non Profit' },
  { path: '/industries/manufacturing-industrial', name: 'Manufacturing Industrial' },
  { path: '/industries/retail-consumer', name: 'Retail Consumer' },
  { path: '/industries/transportation-logistics', name: 'Transportation Logistics' },
  { path: '/industries/energy-utilities', name: 'Energy Utilities' },
  { path: '/industries/financial-institution', name: 'Financial Institution' },
  { path: '/industries/gig-workers', name: 'Gig Workers' },
  { path: '/industries/academic-education', name: 'Academic Education' },
  { path: '/industries/hospitality-food-leisure', name: 'Hospitality Food Leisure' },
  { path: '/industries/industrial-manufacturing', name: 'Industrial Manufacturing' },
  
  // Service pages
  { path: '/background-screening', name: 'Background Screening' },
  { path: '/employment-verification', name: 'Employment Verification' },
  { path: '/criminal-check', name: 'Criminal Check' },
  { path: '/education-verification', name: 'Education Verification' },
  { path: '/reference-validation', name: 'Reference Validation' },
  { path: '/watchlist-screening', name: 'Watchlist Screening' },
  { path: '/address-verification', name: 'Address Verification' },
  { path: '/predictive-analytics', name: 'Predictive Analytics' },
  { path: '/kyc-compliance', name: 'KYC Compliance' },
  { path: '/citizen-by-investment', name: 'Citizen By Investment' },
  { path: '/computer-vision', name: 'Computer Vision' },
  { path: '/document-intelligence', name: 'Document Intelligence' },
  { path: '/interactive-dashboards', name: 'Interactive Dashboards' },
  { path: '/nlp', name: 'NLP' },
  { path: '/rag', name: 'RAG' },
  { path: '/recommendation-engines', name: 'Recommendation Engines' },
  { path: '/resume-ranking', name: 'Resume Ranking' },
  { path: '/risk-scoring', name: 'Risk Scoring' },
  { path: '/sentiment-analysis', name: 'Sentiment Analysis' },
  { path: '/what-we-offer', name: 'What We Offer' },
  { path: '/custom-software', name: 'Custom Software' },
  { path: '/system-integration', name: 'System Integration' },
  { path: '/data-migration', name: 'Data Migration' },
  { path: '/cloud-infrastructure', name: 'Cloud Infrastructure' }
];

test.describe('IntelliDelve Website Comprehensive Testing', () => {
  let basePage: BasePage;
  let testResults: any[] = [];

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test.afterAll(async () => {
    // Save test results to JSON file
    const fs = require('fs');
    const path = require('path');
    
    const resultsDir = 'test-results';
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(resultsDir, 'comprehensive-test-results.json'),
      JSON.stringify(testResults, null, 2)
    );
  });

  // Test each page individually
  routes.forEach((route) => {
    test(`Page Test: ${route.name} (${route.path})`, async ({ page }) => {
      const basePage = new BasePage(page);
      const pageResult = {
        name: route.name,
        path: route.path,
        timestamp: new Date().toISOString(),
        tests: {}
      };

      try {
        // Navigate to page
        await basePage.goto(route.path);
        
        // Basic page load test
        pageResult.tests.pageLoad = { status: 'PASS', message: 'Page loaded successfully' };
        
        // Check page title and meta
        const seoElements = await basePage.checkSEOElements();
        pageResult.tests.seo = {
          status: seoElements.title && seoElements.metaDescription ? 'PASS' : 'FAIL',
          data: seoElements
        };
        
        // Check responsive design
        const responsiveResults = await basePage.checkResponsiveDesign();
        pageResult.tests.responsive = {
          status: responsiveResults.every(r => r.contentVisible) ? 'PASS' : 'FAIL',
          data: responsiveResults
        };
        
        // Check navigation
        const navResults = await basePage.checkNavigation();
        pageResult.tests.navigation = {
          status: navResults.navigationLinksCount > 0 ? 'PASS' : 'FAIL',
          data: navResults
        };
        
        // Check footer
        const footerResults = await basePage.checkFooter();
        pageResult.tests.footer = {
          status: footerResults.hasFooter ? 'PASS' : 'FAIL',
          data: footerResults
        };
        
        // Check performance
        const performanceResults = await basePage.checkLoadingPerformance();
        pageResult.tests.performance = {
          status: performanceResults.loadTime < 5000 ? 'PASS' : 'FAIL',
          data: performanceResults
        };
        
        // Take screenshot
        await basePage.takeScreenshot(`${route.name.replace(/\s+/g, '-').toLowerCase()}`);
        
        // Check accessibility basics
        const accessibilityResults = await basePage.checkPageAccessibility();
        pageResult.tests.accessibility = {
          status: accessibilityResults.hasMainContent ? 'PASS' : 'FAIL',
          data: accessibilityResults
        };

      } catch (error) {
        pageResult.tests.pageLoad = { 
          status: 'FAIL', 
          message: `Failed to load page: ${error.message}` 
        };
      }

      testResults.push(pageResult);
      
      // Assert that the page loaded successfully
      expect(pageResult.tests.pageLoad.status).toBe('PASS');
    });
  });
});
