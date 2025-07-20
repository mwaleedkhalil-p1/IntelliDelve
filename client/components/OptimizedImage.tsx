import React, { useState, useRef, useEffect } from "react";
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
  onError?: () => void;
  sizes?: string;
  quality?: number;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  priority = false,
  sizes,
  quality = 75,
  placeholder = "/placeholder.svg",
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority || loading === "eager");
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || loading === "eager") return;

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
        rootMargin: "50px", // Start loading 50px before entering viewport
        threshold: 0.1,
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, loading]);

  // Generate responsive image sources
  const generateSrcSet = (baseSrc: string) => {
    if (baseSrc.includes("placeholder.svg")) return "";

    const ext = baseSrc.split(".").pop()?.toLowerCase();
    const basePath = baseSrc.replace(`.${ext}`, "");

    // Generate different sizes for responsive images
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    return sizes.map((size) => `${basePath}-${size}w.webp ${size}w`).join(", ");
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const imageSrc = hasError ? placeholder : src;
  const srcSet = generateSrcSet(imageSrc);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder background */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={{ width, height }}
        />
      )}

      {/* Actual image */}
      {isInView && (
        <>
          {/* Modern WebP format */}
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
              width={width}
              height={height}
              loading={loading}
              decoding="async"
              className={`transition-opacity duration-300 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleLoad}
              onError={handleError}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </picture>

          {/* Preload critical images */}
          {priority && (
            <link
              rel="preload"
              as="image"
              href={imageSrc}
              imageSizes={sizes}
              imageSrcSet={srcSet}
            />
          )}
        </>
      )}

      {/* Loading indicator */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

// Hook for preloading critical images
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
