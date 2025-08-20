import { test, expect } from '@playwright/test';
import { BasePage } from './utils/base-page';

test.describe('Forms and Interactive Elements Testing', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('Contact Form Functionality', async ({ page }) => {
    await basePage.goto('/contact');
    
    // Check if contact form exists
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    // Check form fields
    const nameField = page.locator('input[name*="name"], input[placeholder*="name"]').first();
    const emailField = page.locator('input[type="email"], input[name*="email"]').first();
    const messageField = page.locator('textarea, input[name*="message"]').first();
    
    if (await nameField.count() > 0) {
      await nameField.fill('Test User');
    }
    
    if (await emailField.count() > 0) {
      await emailField.fill('test@example.com');
    }
    
    if (await messageField.count() > 0) {
      await messageField.fill('This is a test message for UAT testing.');
    }
    
    // Check if submit button exists
    const submitButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("submit")').first();
    await expect(submitButton).toBeVisible();
    
    // Note: We won't actually submit to avoid spam
    console.log('Contact form validation completed');
  });

  test('Navigation Menu Functionality', async ({ page }) => {
    await basePage.goto('/');
    
    // Check main navigation
    const navLinks = page.locator('nav a, header a');
    const linkCount = await navLinks.count();
    
    expect(linkCount).toBeGreaterThan(0);
    
    // Test a few navigation links
    const testLinks = [
      { selector: 'a[href="/about"], a:has-text("About")', expectedPath: '/about' },
      { selector: 'a[href="/services"], a:has-text("Services")', expectedPath: '/services' },
      { selector: 'a[href="/contact"], a:has-text("Contact")', expectedPath: '/contact' }
    ];
    
    for (const link of testLinks) {
      const linkElement = page.locator(link.selector).first();
      if (await linkElement.count() > 0) {
        await linkElement.click();
        await page.waitForLoadState('networkidle');
        
        const currentUrl = page.url();
        expect(currentUrl).toContain(link.expectedPath);
        
        // Go back to home for next test
        await basePage.goto('/');
      }
    }
  });

  test('Mobile Menu Functionality', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await basePage.goto('/');
    
    // Look for mobile menu toggle
    const mobileMenuToggle = page.locator('button[aria-label*="menu"], button:has-text("☰"), .hamburger, [data-testid="mobile-menu"]').first();
    
    if (await mobileMenuToggle.count() > 0) {
      await mobileMenuToggle.click();
      await page.waitForTimeout(500);
      
      // Check if mobile menu is visible
      const mobileMenu = page.locator('nav, .mobile-menu, [data-testid="mobile-nav"]');
      await expect(mobileMenu.first()).toBeVisible();
    }
  });

  test('Search Functionality', async ({ page }) => {
    await basePage.goto('/');
    
    // Look for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"], input[name*="search"]').first();
    
    if (await searchInput.count() > 0) {
      await searchInput.fill('background screening');
      
      // Look for search button or submit
      const searchButton = page.locator('button[type="submit"], button:has-text("search")').first();
      if (await searchButton.count() > 0) {
        await searchButton.click();
        await page.waitForLoadState('networkidle');
      }
    }
  });

  test('Interactive Elements and Buttons', async ({ page }) => {
    await basePage.goto('/');
    
    // Test CTA buttons
    const ctaButtons = page.locator('button, a[class*="button"], a[class*="btn"]');
    const buttonCount = await ctaButtons.count();
    
    expect(buttonCount).toBeGreaterThan(0);
    
    // Test hover effects on first few buttons
    for (let i = 0; i < Math.min(3, buttonCount); i++) {
      const button = ctaButtons.nth(i);
      if (await button.isVisible()) {
        await button.hover();
        await page.waitForTimeout(200);
      }
    }
  });

  test('Modal and Popup Functionality', async ({ page }) => {
    await basePage.goto('/');
    
    // Look for elements that might trigger modals
    const modalTriggers = page.locator('button[data-modal], a[data-modal], [data-toggle="modal"]');
    const triggerCount = await modalTriggers.count();
    
    if (triggerCount > 0) {
      await modalTriggers.first().click();
      await page.waitForTimeout(1000);
      
      // Look for modal content
      const modal = page.locator('.modal, [role="dialog"], .popup');
      if (await modal.count() > 0) {
        await expect(modal.first()).toBeVisible();
        
        // Try to close modal
        const closeButton = page.locator('.modal button, [aria-label="close"], .close');
        if (await closeButton.count() > 0) {
          await closeButton.first().click();
        }
      }
    }
  });

  test('Form Validation', async ({ page }) => {
    await basePage.goto('/contact');
    
    // Try to submit empty form to test validation
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
    
    if (await submitButton.count() > 0) {
      await submitButton.click();
      
      // Check for validation messages
      const validationMessages = page.locator('.error, .invalid, [aria-invalid="true"]');
      const hasValidation = await validationMessages.count() > 0;
      
      console.log(`Form validation ${hasValidation ? 'present' : 'not detected'}`);
    }
  });

  test('Social Media Links', async ({ page }) => {
    await basePage.goto('/');
    
    // Look for social media links
    const socialLinks = page.locator('a[href*="facebook"], a[href*="twitter"], a[href*="linkedin"], a[href*="instagram"]');
    const socialCount = await socialLinks.count();
    
    if (socialCount > 0) {
      // Test that social links open in new tab
      for (let i = 0; i < socialCount; i++) {
        const link = socialLinks.nth(i);
        const target = await link.getAttribute('target');
        expect(target).toBe('_blank');
      }
    }
  });

  test('Newsletter Signup', async ({ page }) => {
    await basePage.goto('/');
    
    // Look for newsletter signup
    const newsletterInput = page.locator('input[name*="newsletter"], input[placeholder*="newsletter"], input[name*="subscribe"]').first();
    
    if (await newsletterInput.count() > 0) {
      await newsletterInput.fill('test@example.com');
      
      const subscribeButton = page.locator('button:has-text("subscribe"), button:has-text("sign up")').first();
      if (await subscribeButton.count() > 0) {
        // Don't actually submit to avoid spam
        await expect(subscribeButton).toBeVisible();
      }
    }
  });
});
