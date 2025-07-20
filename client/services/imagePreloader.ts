// Image Preloader Service for IntelliDelve
// Preloads all hero section images and critical assets

export class ImagePreloaderService {
  private static instance: ImagePreloaderService;
  private preloadedImages: Set<string> = new Set();
  private loadingImages: Map<string, Promise<void>> = new Map();
  private failedImages: Set<string> = new Set();

  private constructor() {}

  public static getInstance(): ImagePreloaderService {
    if (!ImagePreloaderService.instance) {
      ImagePreloaderService.instance = new ImagePreloaderService();
    }
    return ImagePreloaderService.instance;
  }

  // All hero section images across the website
  private getAllHeroImages(): string[] {
    return [
      // Main Pages
      'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',

      // Service Pages
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',

      // Industry Pages
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
    ];
  }

  // Critical images that should load first
  private getCriticalImages(): string[] {
    return [
      // Home page hero
      'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      // Main navigation pages
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
    ];
  }

  private async preloadImage(src: string, priority: 'high' | 'low' = 'low'): Promise<void> {
    if (this.preloadedImages.has(src) || this.failedImages.has(src)) {
      return Promise.resolve();
    }

    if (this.loadingImages.has(src)) {
      return this.loadingImages.get(src)!;
    }

    const loadPromise = new Promise<void>((resolve, reject) => {
      const img = new Image();
      const timeout = setTimeout(() => {
        reject(new Error(`Image load timeout: ${src}`));
      }, priority === 'high' ? 5000 : 10000);

      img.onload = () => {
        clearTimeout(timeout);
        this.preloadedImages.add(src);
        this.loadingImages.delete(src);
        resolve();
      };

      img.onerror = () => {
        clearTimeout(timeout);
        this.failedImages.add(src);
        this.loadingImages.delete(src);
        console.warn(`Failed to preload image: ${src}`);
        reject(new Error(`Failed to load image: ${src}`));
      };

      // Optimize loading
      if (priority === 'high') {
        img.loading = 'eager';
        img.fetchPriority = 'high';
      } else {
        img.loading = 'lazy';
        img.fetchPriority = 'low';
      }

      img.src = src;
    });

    this.loadingImages.set(src, loadPromise);
    return loadPromise;
  }

  // Preload critical images immediately
  public async preloadCriticalImages(): Promise<void> {
    const criticalImages = this.getCriticalImages();
    console.log('🚀 Preloading critical images...', criticalImages.length);
    
    const promises = criticalImages.map(src => 
      this.preloadImage(src, 'high').catch(err => {
        console.warn(`Critical image failed to load: ${src}`, err);
      })
    );

    await Promise.allSettled(promises);
    console.log('✅ Critical images preloaded');
  }

  // Preload all hero images with controlled concurrency
  public async preloadAllHeroImages(): Promise<void> {
    const allImages = this.getAllHeroImages();
    const criticalImages = this.getCriticalImages();
    const nonCriticalImages = allImages.filter(img => !criticalImages.includes(img));
    
    console.log('🖼️ Preloading all hero images...', allImages.length);

    // Load in batches to avoid overwhelming the browser
    const batchSize = 6;
    const batches = [];
    for (let i = 0; i < nonCriticalImages.length; i += batchSize) {
      batches.push(nonCriticalImages.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      const promises = batch.map(src => 
        this.preloadImage(src, 'low').catch(err => {
          console.warn(`Image failed to load: ${src}`, err);
        })
      );
      
      await Promise.allSettled(promises);
      // Small delay between batches to prevent blocking
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('✅ All hero images preloaded');
  }

  // Check if image is preloaded
  public isImagePreloaded(src: string): boolean {
    return this.preloadedImages.has(src);
  }

  // Check if image failed to load
  public hasImageFailed(src: string): boolean {
    return this.failedImages.has(src);
  }

  // Get preloading statistics
  public getStats() {
    const totalImages = this.getAllHeroImages().length;
    return {
      total: totalImages,
      preloaded: this.preloadedImages.size,
      failed: this.failedImages.size,
      loading: this.loadingImages.size,
      progress: (this.preloadedImages.size / totalImages) * 100
    };
  }

  // Initialize preloading (call this on app startup)
  public async initialize(): Promise<void> {
    try {
      // First load critical images
      await this.preloadCriticalImages();
      
      // Then load all other images in background
      setTimeout(() => {
        this.preloadAllHeroImages();
      }, 1000); // Delay to not interfere with initial page load
      
    } catch (error) {
      console.error('Image preloader initialization failed:', error);
    }
  }
}

// Export singleton instance
export const imagePreloader = ImagePreloaderService.getInstance();
