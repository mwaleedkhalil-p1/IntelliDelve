import { test, expect } from '@playwright/test';
import { BasePage } from './utils/base-page';

test.describe('Performance and SEO Testing', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('Page Load Performance', async ({ page }) => {
    const performanceResults = [];
    
    const testPages = [
      '/',
      '/about',
      '/services',
      '/contact',
      '/solutions',
      '/industries'
    ];

    for (const pagePath of testPages) {
      const startTime = Date.now();
      
      await page.goto(`https://intellidelve-beta.netlify.app${pagePath}`);
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Get performance metrics
      const performanceMetrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
          firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
        };
      });

      performanceResults.push({
        page: pagePath,
        loadTime,
        metrics: performanceMetrics
      });

      // Assert reasonable load time (under 5 seconds)
      expect(loadTime).toBeLessThan(5000);
    }

    console.log('Performance Results:', JSON.stringify(performanceResults, null, 2));
  });

  test('SEO Meta Tags Validation', async ({ page }) => {
    const seoResults = [];
    
    const testPages = [
      { path: '/', name: 'Home' },
      { path: '/about', name: 'About' },
      { path: '/services', name: 'Services' },
      { path: '/contact', name: 'Contact' },
      { path: '/solutions', name: 'Solutions' }
    ];

    for (const testPage of testPages) {
      await page.goto(`https://intellidelve-beta.netlify.app${testPage.path}`);
      
      // Get SEO elements
      const title = await page.title();
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      const metaKeywords = await page.locator('meta[name="keywords"]').getAttribute('content');
      const canonicalUrl = await page.locator('link[rel="canonical"]').getAttribute('href');
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      
      // Check heading structure
      const h1Count = await page.locator('h1').count();
      const h1Text = await page.locator('h1').first().textContent();
      const h2Count = await page.locator('h2').count();
      
      const seoData = {
        page: testPage.name,
        path: testPage.path,
        title,
        titleLength: title?.length || 0,
        metaDescription,
        descriptionLength: metaDescription?.length || 0,
        metaKeywords,
        canonicalUrl,
        ogTitle,
        ogDescription,
        ogImage,
        h1Count,
        h1Text,
        h2Count,
        seoScore: 0
      };

      // Calculate SEO score
      let score = 0;
      if (title && title.length >= 30 && title.length <= 60) score += 20;
      if (metaDescription && metaDescription.length >= 120 && metaDescription.length <= 160) score += 20;
      if (h1Count === 1) score += 15;
      if (h1Text && h1Text.length > 0) score += 15;
      if (ogTitle) score += 10;
      if (ogDescription) score += 10;
      if (ogImage) score += 10;

      seoData.seoScore = score;
      seoResults.push(seoData);

      // Basic SEO assertions
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(10);
      expect(metaDescription).toBeTruthy();
      expect(h1Count).toBeGreaterThan(0);
    }

    console.log('SEO Results:', JSON.stringify(seoResults, null, 2));
  });

  test('Image Optimization Check', async ({ page }) => {
    await page.goto('https://intellidelve-beta.netlify.app/');
    
    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    const imageResults = [];
    
    for (let i = 0; i < Math.min(10, imageCount); i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt');
      const loading = await img.getAttribute('loading');
      
      // Check if image loads
      const isVisible = await img.isVisible();
      
      imageResults.push({
        src,
        hasAlt: !!alt,
        altText: alt,
        hasLazyLoading: loading === 'lazy',
        isVisible
      });
    }

    // Assert that images have alt text
    const imagesWithoutAlt = imageResults.filter(img => !img.hasAlt);
    expect(imagesWithoutAlt.length).toBeLessThan(imageResults.length * 0.2); // Less than 20% without alt

    console.log('Image Optimization Results:', JSON.stringify(imageResults, null, 2));
  });

  test('Mobile Performance', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const startTime = Date.now();
    await page.goto('https://intellidelve-beta.netlify.app/');
    await page.waitForLoadState('networkidle');
    const mobileLoadTime = Date.now() - startTime;

    // Check mobile-specific elements
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    const hasTouchIcons = await page.locator('link[rel*="apple-touch-icon"]').count() > 0;
    
    // Check if content is properly sized for mobile
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    
    const mobileResults = {
      loadTime: mobileLoadTime,
      hasViewportMeta: !!viewport,
      viewportContent: viewport,
      hasTouchIcons,
      contentFitsViewport: bodyWidth <= viewportWidth * 1.1, // Allow 10% tolerance
      bodyWidth,
      viewportWidth
    };

    console.log('Mobile Performance Results:', JSON.stringify(mobileResults, null, 2));

    // Assertions
    expect(mobileLoadTime).toBeLessThan(6000); // Mobile should load within 6 seconds
    expect(viewport).toBeTruthy();
    expect(mobileResults.contentFitsViewport).toBeTruthy();
  });

  test('Accessibility Basics', async ({ page }) => {
    await page.goto('https://intellidelve-beta.netlify.app/');
    
    // Check for basic accessibility elements
    const hasSkipLink = await page.locator('a[href="#main"], a[href="#content"]').count() > 0;
    const hasMainLandmark = await page.locator('main, [role="main"]').count() > 0;
    const hasNavLandmark = await page.locator('nav, [role="navigation"]').count() > 0;
    
    // Check form labels
    const inputs = page.locator('input[type="text"], input[type="email"], textarea');
    const inputCount = await inputs.count();
    let inputsWithLabels = 0;
    
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const placeholder = await input.getAttribute('placeholder');
      
      if (id) {
        const hasLabel = await page.locator(`label[for="${id}"]`).count() > 0;
        if (hasLabel || ariaLabel || placeholder) {
          inputsWithLabels++;
        }
      } else if (ariaLabel || placeholder) {
        inputsWithLabels++;
      }
    }

    // Check heading hierarchy
    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();
    const h3Count = await page.locator('h3').count();

    const accessibilityResults = {
      hasSkipLink,
      hasMainLandmark,
      hasNavLandmark,
      inputsWithLabels,
      totalInputs: inputCount,
      labelCoverage: inputCount > 0 ? (inputsWithLabels / inputCount) * 100 : 100,
      headingStructure: {
        h1: h1Count,
        h2: h2Count,
        h3: h3Count
      }
    };

    console.log('Accessibility Results:', JSON.stringify(accessibilityResults, null, 2));

    // Basic accessibility assertions
    expect(hasMainLandmark).toBeTruthy();
    expect(h1Count).toBeGreaterThan(0);
    expect(accessibilityResults.labelCoverage).toBeGreaterThan(70); // At least 70% of inputs should have labels
  });

  test('External Links and Resources', async ({ page }) => {
    await page.goto('https://intellidelve-beta.netlify.app/');
    
    // Check external links
    const externalLinks = page.locator('a[href^="http"]:not([href*="intellidelve"])');
    const externalLinkCount = await externalLinks.count();
    
    let externalLinksWithTarget = 0;
    for (let i = 0; i < externalLinkCount; i++) {
      const link = externalLinks.nth(i);
      const target = await link.getAttribute('target');
      if (target === '_blank') {
        externalLinksWithTarget++;
      }
    }

    // Check for broken internal links (sample)
    const internalLinks = page.locator('a[href^="/"], a[href^="./"], a[href^="../"]');
    const internalLinkCount = await internalLinks.count();
    
    const linkResults = {
      externalLinks: externalLinkCount,
      externalLinksWithTarget,
      internalLinks: internalLinkCount,
      externalLinkTargetCoverage: externalLinkCount > 0 ? (externalLinksWithTarget / externalLinkCount) * 100 : 0
    };

    console.log('Link Analysis Results:', JSON.stringify(linkResults, null, 2));

    // Most external links should open in new tab
    if (externalLinkCount > 0) {
      expect(linkResults.externalLinkTargetCoverage).toBeGreaterThan(50);
    }
  });
});
