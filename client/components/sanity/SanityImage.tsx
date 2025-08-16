import React, { useState, useRef, useEffect } from 'react';
import { getImageUrl, getImageSrcSet, getResponsiveImageUrls } from '../../lib/sanity';
import type { SanityImageWithUrl, ImageTransformOptions } from '../../types/sanity';

interface SanityImageProps {
  image: SanityImageWithUrl;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  blur?: boolean;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
}

const SanityImage: React.FC<SanityImageProps> = ({
  image,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  quality = 85,
  blur = true,
  aspectRatio = 'auto',
  objectFit = 'cover',
  loading = 'lazy',
  onClick,
  onLoad,
  onError
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

  // Generate responsive image URLs
  const responsiveUrls = getResponsiveImageUrls(image);
  
  // Generate optimized image URL for main src
  const optimizedUrl = getImageUrl(image, {
    quality,
    auto: 'format',
    fit: objectFit === 'cover' ? 'crop' : 'clip'
  });

  // Generate low-quality placeholder for blur effect
  const blurUrl = blur ? getImageUrl(image, {
    width: 20,
    quality: 20,
    auto: 'format'
  }) : undefined;

  // Generate srcSet for responsive images
  const srcSet = getImageSrcSet(image);

  // Aspect ratio classes
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    auto: ''
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
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${aspectRatioClasses[aspectRatio]} ${className}`}>
        <span className="text-gray-400 text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatioClasses[aspectRatio]} ${className}`}>
      {/* Blur placeholder */}
      {blur && blurUrl && !isLoaded && (
        <img
          src={blurUrl}
          alt=""
          className={`absolute inset-0 w-full h-full ${objectFitClasses[objectFit]} filter blur-sm scale-110 transition-opacity duration-300`}
          aria-hidden="true"
        />
      )}
      
      {/* Loading skeleton */}
      {!isLoaded && !blur && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}

      {/* Main image */}
      {(isInView || priority) && (
        <img
          ref={imgRef}
          src={optimizedUrl}
          srcSet={srcSet}
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

export default SanityImage;