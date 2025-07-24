import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder,
  blurDataURL,
  onLoad,
  onError,
  priority = false,
  sizes,
  quality = 75,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, isInView]);

  useEffect(() => {
    if (!isInView || isLoaded) return;

    setIsLoading(true);
    const img = new Image();

    img.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
      onLoad?.();
    };

    img.onerror = () => {

      setHasError(true);
      setIsLoading(false);
      onError?.();
    };

    img.src = src;
  }, [isInView, src, quality, sizes, onLoad, onError, isLoaded]);

  const getPlaceholderStyle = () => {
    if (blurDataURL) {
      return {
        backgroundImage: `url(${blurDataURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(10px)',
      };
    }
    return {};
  };

  if (hasError) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
      >
        <div className="text-center text-gray-500 dark:text-gray-400 p-4">
          <div className="text-sm">Failed to load image</div>
          <div className="text-xs mt-1 opacity-75">{alt}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>

      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
          style={getPlaceholderStyle()}
        >
          {isLoading ? (
            <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
          ) : (
            <div className="text-gray-400 text-center">
              <div className="text-sm">Loading...</div>
            </div>
          )}
        </div>
      )}

      <img
        ref={imgRef}
        src={isInView ? src : placeholder || ''}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        onLoad={() => {
          setIsLoaded(true);
          setIsLoading(false);
          onLoad?.();
        }}
        onError={() => {

          setHasError(true);
          setIsLoading(false);
          onError?.();
        }}
      />
    </div>
  );
};

export const withLazyLoading = <P extends object>(
  Component: React.ComponentType<P & { src: string; alt: string; className?: string }>
) => {
  return React.forwardRef<HTMLImageElement, P & LazyImageProps>((props, ref) => {
    return <LazyImage {...props} />;
  });
};

export const generateBlurDataURL = (width: number = 10, height: number = 10): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  return canvas.toDataURL();
};

export const useImagePreloader = (urls: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const preloadImage = (url: string) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = reject;
        img.src = url;
      });
    };

    const preloadAll = async () => {
      try {
        const results = await Promise.allSettled(
          urls.map(url => preloadImage(url))
        );

        const loaded = new Set<string>();
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            loaded.add(urls[index]);
          }
        });

        setLoadedImages(loaded);
      } catch (error) {

      }
    };

    if (urls.length > 0) {
      preloadAll();
    }
  }, [urls]);

  return loadedImages;
};

export default LazyImage;
