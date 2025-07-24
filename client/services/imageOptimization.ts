// Image optimization service for better performance and user experience

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png' | 'auto';
  blur?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

export class ImageOptimizationService {
  private static instance: ImageOptimizationService;
  private cache = new Map<string, string>();
  private preloadedImages = new Set<string>();

  static getInstance(): ImageOptimizationService {
    if (!ImageOptimizationService.instance) {
      ImageOptimizationService.instance = new ImageOptimizationService();
    }
    return ImageOptimizationService.instance;
  }

  /**
   * Optimize image URL based on the source and options
   */
  optimizeImageUrl(src: string, options: ImageOptimizationOptions = {}): string {
    const cacheKey = `${src}-${JSON.stringify(options)}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    let optimizedUrl = src;

    try {
      // Handle local images first to avoid unnecessary processing
      if (src.startsWith('/') || src.startsWith('./') || src.startsWith('../')) {
        optimizedUrl = src; // Return local images as-is
      }
      // Handle Unsplash images
      else if (src.includes('unsplash.com')) {
        optimizedUrl = this.optimizeUnsplashUrl(src, options);
      }
      // Handle other CDN images (can be extended)
      else if (src.includes('cloudinary.com')) {
        optimizedUrl = this.optimizeCloudinaryUrl(src, options);
      }
      // Handle other external sources
      else {
        optimizedUrl = this.optimizeGenericUrl(src, options);
      }

      this.cache.set(cacheKey, optimizedUrl);
    } catch (error) {

      optimizedUrl = src; // Fallback to original
    }

    return optimizedUrl;
  }

  /**
   * Optimize Unsplash image URLs
   */
  private optimizeUnsplashUrl(src: string, options: ImageOptimizationOptions): string {
    const url = new URL(src);

    if (options.width) {
      url.searchParams.set('w', options.width.toString());
    }
    if (options.height) {
      url.searchParams.set('h', options.height.toString());
    }
    if (options.quality) {
      url.searchParams.set('q', Math.min(100, Math.max(1, options.quality)).toString());
    }
    if (options.fit) {
      url.searchParams.set('fit', options.fit);
    }
    if (options.format && options.format !== 'auto') {
      url.searchParams.set('fm', options.format);
    }

    // Auto-detect WebP support
    if (options.format === 'auto' && this.supportsWebP()) {
      url.searchParams.set('fm', 'webp');
    }

    return url.toString();
  }

  /**
   * Optimize Cloudinary image URLs
   */
  private optimizeCloudinaryUrl(src: string, options: ImageOptimizationOptions): string {
    // Basic Cloudinary optimization
    // This can be extended based on Cloudinary's transformation API
    let optimizedUrl = src;

    if (options.width || options.height || options.quality) {
      const transformations = [];

      if (options.width) transformations.push(`w_${options.width}`);
      if (options.height) transformations.push(`h_${options.height}`);
      if (options.quality) transformations.push(`q_${options.quality}`);
      if (options.format && options.format !== 'auto') transformations.push(`f_${options.format}`);

      if (options.format === 'auto' && this.supportsWebP()) {
        transformations.push('f_webp');
      }

      // Insert transformations into Cloudinary URL
      optimizedUrl = src.replace('/upload/', `/upload/${transformations.join(',')}/`);
    }

    return optimizedUrl;
  }

  /**
   * Generic URL optimization (for local images or other sources)
   */
  private optimizeGenericUrl(src: string, options: ImageOptimizationOptions): string {
    // For local images starting with /images/, return as-is to avoid Cloudinary processing
    if (src.startsWith('/images/') || src.startsWith('./images/') || src.startsWith('../images/')) {
      return src;
    }

    // For other local images, return as-is
    if (src.startsWith('/') || src.startsWith('./') || src.startsWith('../')) {
      return src;
    }

    // For local images, we can't modify the URL, but we can provide sizing hints
    return src;
  }

  /**
   * Check if browser supports WebP format
   */
  private supportsWebP(): boolean {
    if (typeof window === 'undefined') return false;

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  /**
   * Preload critical images
   */
  async preloadImages(urls: string[], options: ImageOptimizationOptions = {}): Promise<void> {
    const preloadPromises = urls.map(url => {
      const optimizedUrl = this.optimizeImageUrl(url, options);

      if (this.preloadedImages.has(optimizedUrl)) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          this.preloadedImages.add(optimizedUrl);
          resolve();
        };
        img.onerror = reject;
        img.src = optimizedUrl;
      });
    });

    try {
      await Promise.allSettled(preloadPromises);
    } catch (error) {

    }
  }

  /**
   * Generate responsive image sizes string
   */
  generateSizes(breakpoints: { [key: string]: number }): string {
    const sizes = Object.entries(breakpoints)
      .sort(([, a], [, b]) => b - a) // Sort by width descending
      .map(([media, width]) => {
        if (media === 'default') {
          return `${width}px`;
        }
        return `(max-width: ${media}) ${width}px`;
      });

    return sizes.join(', ');
  }

  /**
   * Create a blur placeholder data URL
   */
  createBlurPlaceholder(width: number = 10, height: number = 10, color: string = '#f3f4f6'): string {
    if (typeof window === 'undefined') return '';

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);

      // Add some noise for a more realistic blur effect
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 20 - 10;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));     // Red
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // Green
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // Blue
      }

      ctx.putImageData(imageData, 0, 0);
    }

    return canvas.toDataURL();
  }

  /**
   * Get optimal image dimensions based on container and device
   */
  getOptimalDimensions(containerWidth: number, containerHeight: number, devicePixelRatio: number = 1): {
    width: number;
    height: number;
  } {
    const dpr = Math.min(devicePixelRatio, 2); // Cap at 2x for performance

    return {
      width: Math.ceil(containerWidth * dpr),
      height: Math.ceil(containerHeight * dpr),
    };
  }

  /**
   * Clear cache (useful for memory management)
   */
  clearCache(): void {
    this.cache.clear();
    this.preloadedImages.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { cacheSize: number; preloadedCount: number } {
    return {
      cacheSize: this.cache.size,
      preloadedCount: this.preloadedImages.size,
    };
  }
}

// Export singleton instance
export const imageOptimizer = ImageOptimizationService.getInstance();

// Utility functions for common use cases
export const optimizeHeroImage = (src: string) =>
  imageOptimizer.optimizeImageUrl(src, {
    width: 1920,
    height: 1080,
    quality: 85,
    format: 'auto',
    fit: 'cover'
  });

export const optimizeCardImage = (src: string) =>
  imageOptimizer.optimizeImageUrl(src, {
    width: 400,
    height: 300,
    quality: 80,
    format: 'auto',
    fit: 'cover'
  });

export const optimizeThumbnail = (src: string) =>
  imageOptimizer.optimizeImageUrl(src, {
    width: 150,
    height: 150,
    quality: 75,
    format: 'auto',
    fit: 'cover'
  });

export const preloadCriticalImages = (urls: string[]) =>
  imageOptimizer.preloadImages(urls, {
    quality: 85,
    format: 'auto'
  });

export default imageOptimizer;
