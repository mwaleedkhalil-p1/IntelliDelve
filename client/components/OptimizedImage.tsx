import React, { useState, useRef, useEffect, useCallback } from "react";
import { useImagePreloader } from '../hooks/useImagePreloader';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "eager" | "lazy";
  priority?: 'high' | 'low';
  lazy?: boolean;
  placeholder?: string;
  fallback?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  sizes?: string;
  quality?: number;
  retries?: number;
  retryDelay?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  priority = 'low',
  sizes,
  quality = 75,
  placeholder = "/placeholder.svg",
  fallback = "/fallback-image.png",
  onLoad,
  onError,
  retries = 2,
  retryDelay = 1000,
}: OptimizedImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const retryTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (retryTimeout.current) {
        clearTimeout(retryTimeout.current);
      }
    };
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    const error = new Error(`Failed to load image: ${src}`);

    if (retryCount < retries) {
      setRetryCount(prev => prev + 1);
      retryTimeout.current = setTimeout(() => {
        setCurrentSrc(`${src}${src.includes('?') ? '&' : '?'}retry=${retryCount + 1}`);
      }, retryDelay * (retryCount + 1));
    } else {
      setHasError(true);
      setCurrentSrc(fallback);
      setIsLoaded(true);
      onError?.(error);
    }
  }, [src, fallback, retryCount, retries, retryDelay, onError]);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoading(true);
    setIsLoaded(false);
    setHasError(false);
    setRetryCount(0);
  }, [src]);

  useEffect(() => {
    if (priority === 'high' || loading === "eager") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, loading]);

  const generateSrcSet = (baseSrc: string) => {
    if (baseSrc.includes("placeholder.svg")) return "";

    const ext = baseSrc.split(".").pop()?.toLowerCase();
    const basePath = baseSrc.replace(`.${ext}`, "");

    const sizesArray = [320, 640, 768, 1024, 1280, 1920];
    return sizesArray.map((size) => `${basePath}-${size}w.webp ${size}w`).join(", ");
  };

  const imageSrc = hasError ? fallback : currentSrc;
  const srcSet = generateSrcSet(imageSrc);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={{ width, height }}
        />
      )}

      {isInView && (
        <picture>
          {srcSet && (
            <source
              srcSet={srcSet}
              sizes={
                sizes ||
                "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
              type="image/webp"
            />
          )}
          <img
            src={imageSrc}
            alt={alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={loading}
            className="w-full h-full object-cover"
            style={{ width, height }}
          />
        </picture>
      )}

      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

export function useImagePreload(src: string, priority = false) {
  useEffect(() => {
    if (!priority) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [src, priority]);
}
