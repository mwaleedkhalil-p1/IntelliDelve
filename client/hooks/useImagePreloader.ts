import { useState, useEffect, useCallback, useRef } from 'react';

interface ImagePreloaderOptions {
  priority?: 'high' | 'low';
  lazy?: boolean;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  onProgress?: (progress: number) => void;
  onComplete?: (results: { success: string[]; failed: string[] }) => void;
}

interface PreloadedImage {
  src: string;
  loaded: boolean;
  error: boolean;
  retries: number;
  lastError?: Error;
}

export const useImagePreloader = (
  images: string[],
  options: ImagePreloaderOptions = {}
) => {
  const {
    priority = 'high',
    lazy = false,
    timeout = 10000,
    retries = 2,
    retryDelay = 1000,
    onProgress,
    onComplete,
  } = options;

  const [preloadedImages, setPreloadedImages] = useState<Record<string, PreloadedImage>>({});
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState<{ success: string[]; failed: string[] }>({ success: [], failed: [] });

  const activeRequests = useRef<Record<string, AbortController>>({});
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;

      Object.values(activeRequests.current).forEach(controller => {
        controller.abort();
      });
    };
  }, []);

  const updateProgress = useCallback((current: number, total: number) => {
    const progress = Math.round((current / total) * 100);
    setLoadingProgress(progress);
    onProgress?.(progress);
  }, [onProgress]);

  const preloadImage = useCallback(async (src: string, retryCount = 0): Promise<boolean> => {
    if (!isMounted.current) return false;

    if (preloadedImages[src]?.loaded) {
      return true;
    }

    const controller = new AbortController();
    activeRequests.current[src] = controller;

    try {
      const response = await fetch(src, {
        signal: controller.signal,
        mode: 'cors',
        cache: 'force-cache',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        const timeoutId = setTimeout(() => {
          reject(new Error(`Image load timeout: ${src}`));
        }, timeout);

        img.onload = () => {
          clearTimeout(timeoutId);
          URL.revokeObjectURL(blobUrl);
          resolve();
        };

        img.onerror = () => {
          clearTimeout(timeoutId);
          URL.revokeObjectURL(blobUrl);
          reject(new Error(`Failed to load image: ${src}`));
        };

        img.src = blobUrl;
      });

      if (isMounted.current) {
        setPreloadedImages(prev => ({
          ...prev,
          [src]: {
            src,
            loaded: true,
            error: false,
            retries: retryCount,
          }
        }));
      }

      return true;
    } catch (error) {
      if (isMounted.current) {
        const currentRetry = retryCount + 1;

        if (currentRetry <= retries) {

          await new Promise(resolve => setTimeout(resolve, retryDelay * currentRetry));
          return preloadImage(src, currentRetry);
        }

        setPreloadedImages(prev => ({
          ...prev,
          [src]: {
            src,
            loaded: false,
            error: true,
            retries: currentRetry - 1,
            lastError: error instanceof Error ? error : new Error(String(error))
          }
        }));
      }
      return false;
    } finally {
      delete activeRequests.current[src];
    }
  }, [timeout, retries, retryDelay, preloadedImages]);

  const preloadImages = useCallback(async () => {
    if (!images.length) {
      setAllLoaded(true);
      setCompleted(true);
      onComplete?.({ success: [], failed: [] });
      return;
    }

    const initialState = images.reduce((acc, src) => ({
      ...acc,
      [src]: {
        src,
        loaded: false,
        error: false,
        retries: 0,
      }
    }), {});

    setPreloadedImages(initialState);
    setAllLoaded(false);
    setCompleted(false);
    setResults({ success: [], failed: [] });
    updateProgress(0, images.length);

    const concurrencyLimit = priority === 'high' ? 6 : 3;
    const chunks = [];
    for (let i = 0; i < images.length; i += concurrencyLimit) {
      chunks.push(images.slice(i, i + concurrencyLimit));
    }

    const success: string[] = [];
    const failed: string[] = [];
    let processed = 0;

    for (const chunk of chunks) {
      const chunkResults = await Promise.allSettled(
        chunk.map(src => preloadImage(src))
      );

      chunkResults.forEach((result, index) => {
        const src = chunk[index];
        if (result.status === 'fulfilled' && result.value && src) {
          success.push(src);
        } else if (src) {
          failed.push(src);
        }
      });

      if (!isMounted.current) return;

      processed += chunk.length;
      updateProgress(processed, images.length);
    }

    if (isMounted.current) {
      setAllLoaded(true);
      setCompleted(true);
      const result = { success, failed };
      setResults(result);
      onComplete?.(result);
    }

    setAllLoaded(true);
  }, [images, preloadImage, priority, onComplete, updateProgress]);

  useEffect(() => {
    if (!lazy) {
      preloadImages();
    }

    return () => {

      Object.values(activeRequests.current).forEach(controller => {
        controller.abort();
      });
    };
  }, [lazy, preloadImages]);

  const getImageStatus = useCallback((src: string) => {
    return preloadedImages[src] || { loaded: false, error: false, retries: 0 };
  }, [preloadedImages]);

  return {

    preloadedImages,
    allLoaded,
    loadingProgress,
    completed,
    results,

    preloadImages,
    getImageStatus,

    isImageLoaded: (src: string) => preloadedImages[src]?.loaded || false,
    hasImageError: (src: string) => preloadedImages[src]?.error || false,
  };
};

export const useCriticalImagePreloader = (criticalImages: string[] = []) => {
  const [criticalImagesLoaded, setCriticalImagesLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ success: string[]; failed: string[] }>({ success: [], failed: [] });

  const { preloadImages, ...rest } = useImagePreloader(criticalImages, {
    priority: 'high',
    lazy: false,
    timeout: 10000,
    retries: 3,
    retryDelay: 1000,
    onProgress: setProgress,
    onComplete: (result) => {
      setCriticalImagesLoaded(true);
      setResults(result);
    },
  });

  useEffect(() => {
    if (criticalImages.length > 0) {
      preloadImages().catch((error) => console.error('Error preloading critical images:', error));
    }
  }, [criticalImages, preloadImages]);

  return {
    criticalImagesLoaded,
    progress,
    results: { ...results },
    preloadCriticalImages: preloadImages,
    ...rest,
  };
};
