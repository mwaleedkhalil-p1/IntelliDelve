import { Page, expect } from '@playwright/test';

export class BasePage {
  constructor(public page: Page) {}

  async goto(path: string = '/') {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    // Wait for the page to be fully loaded
    await this.page.waitForLoadState('networkidle');
    
    // Wait for any loading animations to complete
    await this.page.waitForTimeout(1000);
  }

  async checkPageTitle(expectedTitle?: string) {
    const title = await this.page.title();
    if (expectedTitle) {
      expect(title).toContain(expectedTitle);
    }
    return title;
  }

  async checkMetaDescription() {
    const metaDescription = await this.page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    return metaDescription;
  }

  async checkPageAccessibility() {
    // Check for basic accessibility elements
    const hasMainContent = await this.page.locator('main, [role="main"]').count() > 0;
    const hasNavigation = await this.page.locator('nav, [role="navigation"]').count() > 0;
    
    return {
      hasMainContent,
      hasNavigation
    };
  }

  async checkResponsiveDesign() {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop Large' },
      { width: 1366, height: 768, name: 'Desktop Medium' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];

    const results = [];
    
    for (const viewport of viewports) {
      await this.page.setViewportSize({ width: viewport.width, height: viewport.height });
      await this.page.waitForTimeout(500);
      
      // Check if page content is visible and properly laid out
      const isContentVisible = await this.page.locator('body').isVisible();
      const hasHorizontalScroll = await this.page.evaluate(() => {
        return document.body.scrollWidth > window.innerWidth;
      });
      
      results.push({
        viewport: viewport.name,
        dimensions: `${viewport.width}x${viewport.height}`,
        contentVisible: isContentVisible,
        hasHorizontalScroll
      });
    }
    
    return results;
  }

  async checkLoadingPerformance() {
    const startTime = Date.now();
    await this.page.reload();
    await this.waitForPageLoad();
    const loadTime = Date.now() - startTime;
    
    return {
      loadTime,
      performanceGrade: loadTime < 3000 ? 'Good' : loadTime < 5000 ? 'Fair' : 'Poor'
    };
  }

  async checkForJavaScriptErrors() {
    const errors: string[] = [];
    
    this.page.on('pageerror', (error) => {
      errors.push(error.message);
    });
    
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    return errors;
  }

  async checkNavigation() {
    // Check if main navigation elements are present
    const navElements = await this.page.locator('nav a, header a').count();
    const logoLink = await this.page.locator('a[href="/"], a[href="https://intellidelve-beta.netlify.app/"]').count();
    
    return {
      navigationLinksCount: navElements,
      hasLogoLink: logoLink > 0
    };
  }

  async checkFooter() {
    const footer = this.page.locator('footer');
    const isVisible = await footer.isVisible();
    const linksCount = await footer.locator('a').count();
    
    return {
      hasFooter: isVisible,
      footerLinksCount: linksCount
    };
  }

  async checkContactForm() {
    const forms = await this.page.locator('form').count();
    const contactInputs = await this.page.locator('input[type="email"], input[name*="email"], input[name*="name"], textarea').count();
    
    return {
      hasForm: forms > 0,
      hasContactInputs: contactInputs > 0
    };
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}.png`,
      fullPage: true 
    });
  }

  async checkSEOElements() {
    const title = await this.page.title();
    const metaDescription = await this.page.locator('meta[name="description"]').getAttribute('content');
    const h1Count = await this.page.locator('h1').count();
    const h1Text = await this.page.locator('h1').first().textContent();
    const canonicalUrl = await this.page.locator('link[rel="canonical"]').getAttribute('href');
    
    return {
      title,
      metaDescription,
      h1Count,
      h1Text,
      canonicalUrl,
      titleLength: title?.length || 0,
      descriptionLength: metaDescription?.length || 0
    };
  }
}
