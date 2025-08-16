import React, { useState, useRef, useEffect } from 'react';
import { getImageUrl } from '../../lib/sanity';
import type { SanityImageWithUrl, ImageTransformOptions } from '../../types/sanity';

interface ResponsiveSanityImageProps {
  image: SanityImageWithUrl;
  alt?: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  sizes?: string;
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  aspectRatio?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  onClick?: () => void;
}

const ResponsiveSanityImage: React.FC<ResponsiveSanityImageProps> = ({
  image,
  alt,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'blur',
  sizes = '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw',
  breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  },
  aspectRatio,
  objectFit = 'cover',
  loading = 'lazy',
  onLoad,
  onError,
  onClick
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  if (!image?.asset) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">No image</span>
      </div>
    );
  }

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate responsive srcSet
  const generateSrcSet = () => {
    const srcSetEntries: string[] = [];
    
    Object.entries(breakpoints).forEach(([breakpoint, width]) => {
      if (width) {
        const url = getImageUrl(image, {
          width,
          quality,
          auto: 'format',
          fit: objectFit === 'cover' ? 'crop' : 'clip'
        });
        srcSetEntries.push(`${url} ${width}w`);
      }
    });

    return srcSetEntries.join(', ');
  };

  // Generate main src (fallback)
  const mainSrc = getImageUrl(image, {
    width: breakpoints.lg || 1024,
    quality,
    auto: 'format',
    fit: objectFit === 'cover' ? 'crop' : 'clip'
  });

  // Generate placeholder
  const placeholderSrc = placeholder === 'blur' ? getImageUrl(image, {
    width: 20,
    quality: 20,
    auto: 'format'
  }) : undefined;

  // Generate aspect ratio classes
  const getAspectRatioClasses = () => {
    if (!aspectRatio) return '';
    
    const classes: string[] = [];
    
    Object.entries(aspectRatio).forEach(([breakpoint, ratio]) => {
      const prefix = breakpoint === 'sm' ? '' : `${breakpoint}:`;
      classes.push(`${prefix}aspect-[${ratio}]`);
    });
    
    return classes.join(' ');
  };

  // Object fit classes
  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down'
  };

  if (hasError) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${getAspectRatioClasses()} ${className}`}>
        <span className="text-gray-400 text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${getAspectRatioClasses()} ${className}`}>
      {/* Blur placeholder */}
      {placeholder === 'blur' && placeholderSrc && !isLoaded && (
        <img
          src={placeholderSrc}
          alt=""
          className={`absolute inset-0 w-full h-full ${objectFitClasses[objectFit]} filter blur-sm scale-110 transition-opacity duration-300`}
          aria-hidden="true"
        />
      )}
      
      {/* Loading skeleton */}
      {placeholder === 'empty' && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}

      {/* Main image */}
      {(isInView || priority) && (
        <picture>
          {/* WebP sources for modern browsers */}
          <source
            srcSet={generateSrcSet().replace(/\.(jpg|jpeg|png)/g, '.webp')}
            sizes={sizes}
            type="image/webp"
          />
          
          {/* Fallback image */}
          <img
            ref={imgRef}
            src={mainSrc}
            srcSet={generateSrcSet()}
            sizes={sizes}
            alt={alt || image.alt || ''}
            className={`w-full h-full ${objectFitClasses[objectFit]} transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${onClick ? 'cursor-pointer' : ''}`}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            onClick={onClick}
          />
        </picture>
      )}

      {/* Loading indicator */}
      {!isLoaded && (isInView || priority) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ResponsiveSanityImage;