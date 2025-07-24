import React, { useEffect, useRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { imagePreloader } from '../services/imagePreloader';

interface PrefetchLinkProps extends LinkProps {
  prefetchImages?: string[];
  prefetchOnHover?: boolean;
  prefetchOnVisible?: boolean;
}

export const PrefetchLink: React.FC<PrefetchLinkProps> = ({
  children,
  prefetchImages = [],
  prefetchOnHover = true,
  prefetchOnVisible = false,
  ...linkProps
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const hasPrefetched = useRef(false);

  const prefetchResources = async () => {
    if (hasPrefetched.current) return;
    hasPrefetched.current = true;

    if (prefetchImages.length > 0) {
      const promises = prefetchImages.map(src =>
        imagePreloader.isImagePreloaded(src)
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => resolve();
              img.onerror = () => resolve();
              img.src = src;
            })
      );

      await Promise.allSettled(promises);
    }
  };

  const handleMouseEnter = () => {
    if (prefetchOnHover) {
      prefetchResources();
    }
  };

  useEffect(() => {
    if (!prefetchOnVisible || !linkRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            prefetchResources();
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' }
    );

    observer.observe(linkRef.current);

    return () => observer.disconnect();
  }, [prefetchOnVisible]);

  return (
    <Link
      ref={linkRef}
      onMouseEnter={handleMouseEnter}
      {...linkProps}
    >
      {children}
    </Link>
  );
};
