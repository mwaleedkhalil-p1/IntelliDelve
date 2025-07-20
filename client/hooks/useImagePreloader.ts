import { useState, useEffect, useCallback } from 'react';

interface ImagePreloaderOptions {
  priority?: 'high' | 'low';
  lazy?: boolean;
  timeout?: number;
}

interface PreloadedImage {
  src: string;
  loaded: boolean;
  error: boolean;
}

export const useImagePreloader = (
  images: string[],
  options: ImagePreloaderOptions = {}
) => {
  const { priority = 'high', lazy = false, timeout = 10000 } = options;
  const [preloadedImages, setPreloadedImages] = useState<Record<string, PreloadedImage>>({});
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const timeoutId = setTimeout(() => {
        reject(new Error(`Image load timeout: ${src}`));
      }, timeout);

      img.onload = () => {
        clearTimeout(timeoutId);
        setPreloadedImages(prev => ({
          ...prev,
          [src]: { src, loaded: true, error: false }
        }));
        resolve();
      };

      img.onerror = () => {
        clearTimeout(timeoutId);
        setPreloadedImages(prev => ({
          ...prev,
          [src]: { src, loaded: false, error: true }
        }));
        reject(new Error(`Failed to load image: ${src}`));
      };

      // Set loading attributes for optimization
      if (priority === 'high') {
        img.loading = 'eager';
        img.fetchPriority = 'high';
      } else {
        img.loading = 'lazy';
        img.fetchPriority = 'low';
      }

      img.src = src;
    });
  }, [timeout, priority]);

  const preloadImages = useCallback(async () => {
    if (images.length === 0) {
      setAllLoaded(true);
      return;
    }

    // Initialize all images as not loaded
    const initialState = images.reduce((acc, src) => ({
      ...acc,
      [src]: { src, loaded: false, error: false }
    }), {});
    setPreloadedImages(initialState);

    let loadedCount = 0;
    const totalImages = images.length;

    // Preload images with controlled concurrency
    const concurrencyLimit = priority === 'high' ? 6 : 3;
    const chunks = [];
    for (let i = 0; i < images.length; i += concurrencyLimit) {
      chunks.push(images.slice(i, i + concurrencyLimit));
    }

    for (const chunk of chunks) {
      const promises = chunk.map(async (src) => {
        try {
          await preloadImage(src);
          loadedCount++;
          setLoadingProgress((loadedCount / totalImages) * 100);
        } catch (error) {
          console.warn(`Failed to preload image: ${src}`, error);
          loadedCount++;
          setLoadingProgress((loadedCount / totalImages) * 100);
        }
      });

      await Promise.allSettled(promises);
    }

    setAllLoaded(true);
  }, [images, preloadImage, priority]);

  useEffect(() => {
    if (!lazy) {
      preloadImages();
    }
  }, [preloadImages, lazy]);

  const startPreloading = useCallback(() => {
    if (lazy) {
      preloadImages();
    }
  }, [preloadImages, lazy]);

  const isImageLoaded = useCallback((src: string) => {
    return preloadedImages[src]?.loaded || false;
  }, [preloadedImages]);

  const hasImageError = useCallback((src: string) => {
    return preloadedImages[src]?.error || false;
  }, [preloadedImages]);

  return {
    preloadedImages,
    allLoaded,
    loadingProgress,
    startPreloading,
    isImageLoaded,
    hasImageError
  };
};

// Hook for preloading critical images on app startup
export const useCriticalImagePreloader = () => {
  const [isReady, setIsReady] = useState(false);

  // Critical images that should load immediately
  const criticalImages = [
    // Hero section images for main pages
    'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
    'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85',
    // Add more critical images as needed
  ];

  const { allLoaded } = useImagePreloader(criticalImages, { priority: 'high' });

  useEffect(() => {
    if (allLoaded) {
      setIsReady(true);
    }
  }, [allLoaded]);

  return { isReady, criticalImagesLoaded: allLoaded };
};
