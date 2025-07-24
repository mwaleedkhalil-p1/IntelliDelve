

import { DirectImageLoader } from '../utils/imageLoader';

export class ImagePreloaderService {
  private static instance: ImagePreloaderService;
  private preloadedImages: Set<string> = new Set();
  private loadingImages: Map<string, Promise<void>> = new Map();
  private failedImages: Set<string> = new Set();

  private constructor()
  public static getInstance(): ImagePreloaderService {
    if (!ImagePreloaderService.instance) {
      ImagePreloaderService.instance = new ImagePreloaderService();
    }
    return ImagePreloaderService.instance;
  }

  private getAllHeroImages(): string[] {
    return [

      '/images/downloaded/unsplash-photo-1507003211169-0a1dd7228f2d.jpg',
      '/images/downloaded/unsplash-photo-1677442136019-21780ecad995.jpg',
      '/images/downloaded/unsplash-photo-1519389950473-47ba0277781c.jpg',
      '/images/downloaded/freepik-background-check-illustration.jpg',
      '/images/downloaded/unsplash-photo-1497366216548-37526070297c.jpg',
      '/images/downloaded/unsplash-photo-1486406146926-c627a92ad1ab.jpg',
      '/images/downloaded/unsplash-photo-1518186285589-2f7649de83e0.jpg',
      '/images/downloaded/unsplash-photo-1451187580459-43490279c0fa.jpg',
      '/images/downloaded/unsplash-photo-1556761175-b413da4baf72.jpg',
      '/images/downloaded/unsplash-photo-1560472354-b33ff0c44a43.jpg',
      '/images/downloaded/unsplash-photo-1589829545856-d10d557cf95f.jpg',
      '/images/downloaded/unsplash-photo-1541339907198-e08756dedf3f.jpg',
      '/images/downloaded/unsplash-photo-1560518883-ce09059eeffa.jpg',
      '/images/downloaded/unsplash-photo-1521737604893-d14cc237f11d.jpg',
      '/images/downloaded/unsplash-photo-1554224155-6726b3ff858f.jpg',
      '/images/downloaded/unsplash-photo-1541354329998-f4d9a9f9297f.jpg',
      '/images/downloaded/unsplash-photo-1554224154-26032ffc0d07.jpg',
      '/images/downloaded/unsplash-photo-1450101499163-c8848c66ca85.jpg',
      '/images/downloaded/unsplash-photo-1517077304055-6e89abbf09b0.jpg',
      '/images/downloaded/unsplash-photo-1559136555-9303baea8ebd.jpg',
      '/images/downloaded/unsplash-photo-1558618666-fcd25c85cd64.jpg',
      '/images/downloaded/unsplash-photo-1581091226825-a6a2a5aee158.jpg',
      '/images/downloaded/unsplash-photo-1565793298595-6a879b1d9492.jpg',
      '/images/downloaded/unsplash-photo-1473341304170-971dccb5ac1e.jpg',
      '/images/downloaded/unsplash-photo-1441986300917-64674bd600d8.jpg',
      '/images/downloaded/unsplash-photo-1556742049-0cfed4f6a45d.jpg',
      '/images/downloaded/unsplash-photo-1586528116311-ad8dd3c8310d.jpg',
      '/images/downloaded/unsplash-photo-1414235077428-338989a2e8c0.jpg',
      '/images/downloaded/unsplash-photo-1559027615-cd4628902d4a.jpg',
      '/images/downloaded/unsplash-photo-1560472354-b33ff0c44a43.jpg',
      '/images/downloaded/unsplash-photo-1522202176988-66273c2fd55f.jpg',
      '/images/downloaded/unsplash-photo-1486406146926-c627a92ad1ab.jpg',
    ];
  }

  private getCriticalImages(): string[] {
    return [

      '/images/downloaded/unsplash-photo-1507003211169-0a1dd7228f2d.jpg',
      '/images/downloaded/unsplash-photo-1677442136019-21780ecad995.jpg',
      '/images/downloaded/unsplash-photo-1519389950473-47ba0277781c.jpg',
      '/images/downloaded/freepik-background-check-illustration.jpg',
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

      img.onerror = (error) => {
        clearTimeout(timeout);
        this.failedImages.add(src);
        this.loadingImages.delete(src);

        reject(new Error(`Failed to load image: ${src}`));
      };

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

  public async preloadCriticalImages(): Promise<void> {
    const criticalImages = this.getCriticalImages();

    const promises = criticalImages.map(src =>
      this.preloadImage(src, 'high').catch(err => {

      })
    );

    await Promise.allSettled(promises);

  }

  public async preloadAllHeroImages(): Promise<void> {
    const allImages = this.getAllHeroImages();
    const criticalImages = this.getCriticalImages();
    const nonCriticalImages = allImages.filter(img => !criticalImages.includes(img));

    const batchSize = 6;
    const batches = [];
    for (let i = 0; i < nonCriticalImages.length; i += batchSize) {
      batches.push(nonCriticalImages.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      const promises = batch.map(src =>
        this.preloadImage(src, 'low').catch(err => {

        })
      );

      await Promise.allSettled(promises);

      await new Promise(resolve => setTimeout(resolve, 100));
    }

  }

  public isImagePreloaded(src: string): boolean {
    return this.preloadedImages.has(src);
  }

  public hasImageFailed(src: string): boolean {
    return this.failedImages.has(src);
  }

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

  public async initialize(): Promise<void> {
    try {

      await this.preloadCriticalImages();

      setTimeout(() => {
        this.preloadAllHeroImages();
      }, 1000);

    } catch (error) {

    }
  }
}

export const imagePreloader = ImagePreloaderService.getInstance();
