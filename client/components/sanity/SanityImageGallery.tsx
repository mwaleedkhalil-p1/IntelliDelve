import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, Download, Share2 } from 'lucide-react';
import SanityImage from './SanityImage';
import type { SanityImageWithUrl } from '../../types/sanity';

interface SanityImageGalleryProps {
  images: SanityImageWithUrl[];
  className?: string;
  showThumbnails?: boolean;
  showCaptions?: boolean;
  allowFullscreen?: boolean;
  allowDownload?: boolean;
  allowShare?: boolean;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

const SanityImageGallery: React.FC<SanityImageGalleryProps> = ({
  images,
  className = '',
  showThumbnails = true,
  showCaptions = true,
  allowFullscreen = true,
  allowDownload = false,
  allowShare = false,
  columns = 3,
  gap = 'md'
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen || selectedIndex === null) return;

      switch (e.key) {
        case 'Escape':
          closeFullscreen();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen, selectedIndex]);

  const openFullscreen = (index: number) => {
    setSelectedIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setSelectedIndex(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedIndex === null) return;

    const newIndex = direction === 'prev' 
      ? (selectedIndex - 1 + images.length) % images.length
      : (selectedIndex + 1) % images.length;
    
    setSelectedIndex(newIndex);
  };

  const handleDownload = async (image: SanityImageWithUrl) => {
    if (!image.url) return;

    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `image-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  const handleShare = async (image: SanityImageWithUrl) => {
    if (!image.url) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: image.alt || 'Image',
          url: image.url
        });
      } catch (error) {
        console.error('Failed to share image:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(image.url);
        // You could show a toast notification here
      } catch (error) {
        console.error('Failed to copy image URL:', error);
      }
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  };

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}>
        {images.map((image, index) => (
          <div key={index} className="group relative">
            <SanityImage
              image={image}
              alt={image.alt}
              className="w-full h-64 rounded-lg cursor-pointer transition-transform duration-300 group-hover:scale-105"
              aspectRatio="auto"
              onClick={() => allowFullscreen && openFullscreen(index)}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
              {allowFullscreen && (
                <button
                  onClick={() => openFullscreen(index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30"
                >
                  <ZoomIn className="w-6 h-6 text-white" />
                </button>
              )}
            </div>

            {/* Caption */}
            {showCaptions && (image.caption || image.alt) && (
              <div className="mt-2">
                {image.caption && (
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {image.caption}
                  </p>
                )}
                {image.alt && image.alt !== image.caption && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {image.alt}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && selectedIndex !== null && (
        <div
          ref={fullscreenRef}
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
          onClick={(e) => e.target === fullscreenRef.current && closeFullscreen()}
        >
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Action Buttons */}
          {(allowDownload || allowShare) && (
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              {allowDownload && (
                <button
                  onClick={() => handleDownload(images[selectedIndex])}
                  className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-colors"
                  title="Download image"
                >
                  <Download className="w-5 h-5 text-white" />
                </button>
              )}
              {allowShare && (
                <button
                  onClick={() => handleShare(images[selectedIndex])}
                  className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-colors"
                  title="Share image"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          )}

          {/* Main Image */}
          <div className="max-w-full max-h-full p-8">
            <SanityImage
              image={images[selectedIndex]}
              alt={images[selectedIndex].alt}
              className="max-w-full max-h-full"
              objectFit="contain"
              priority
            />
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black bg-opacity-50 rounded-full px-4 py-2">
              <span className="text-white text-sm">
                {selectedIndex + 1} / {images.length}
              </span>
            </div>
          )}

          {/* Caption in Fullscreen */}
          {showCaptions && (images[selectedIndex].caption || images[selectedIndex].alt) && (
            <div className="absolute bottom-4 right-4 left-4 z-10 text-center">
              {images[selectedIndex].caption && (
                <p className="text-white text-lg font-medium mb-1">
                  {images[selectedIndex].caption}
                </p>
              )}
              {images[selectedIndex].alt && images[selectedIndex].alt !== images[selectedIndex].caption && (
                <p className="text-gray-300 text-sm">
                  {images[selectedIndex].alt}
                </p>
              )}
            </div>
          )}

          {/* Thumbnails */}
          {showThumbnails && images.length > 1 && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex gap-2 max-w-full overflow-x-auto px-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === selectedIndex 
                      ? 'border-white' 
                      : 'border-transparent hover:border-gray-400'
                  }`}
                >
                  <SanityImage
                    image={image}
                    alt={image.alt}
                    className="w-full h-full"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SanityImageGallery;