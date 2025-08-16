import { useEffect, useRef, useCallback, useState } from 'react';

interface UseVideoScrollControlOptions {
  /** Initial volume level (0-1) */
  volume?: number;
  /** Whether to auto-pause when scrolled out of view */
  autoPauseOnScroll?: boolean;
  /** Threshold for visibility (0-1, where 0.5 means 50% visible) */
  visibilityThreshold?: number;
  /** Whether to auto-resume when scrolled back into view */
  autoResumeOnScroll?: boolean;
  /** Callback when video becomes visible/invisible */
  onVisibilityChange?: (isVisible: boolean) => void;
}

interface UseVideoScrollControlReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  setVolume: (volume: number) => void;
  getCurrentVolume: () => number;
  currentVolume: number;
}

export const useVideoScrollControl = (
  options: UseVideoScrollControlOptions = {}
): UseVideoScrollControlReturn => {
  const {
    volume = 0.1,
    autoPauseOnScroll = true,
    visibilityThreshold = 0.3,
    autoResumeOnScroll = false,
    onVisibilityChange
  } = options;

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const wasPlayingRef = useRef(false);
  const [currentVolume, setCurrentVolume] = useState(volume);

  const setVolume = useCallback((newVolume: number) => {
    const video = videoRef.current;
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    if (video) {
      video.volume = clampedVolume;
    }
    setCurrentVolume(clampedVolume);
  }, []);

  const getCurrentVolume = useCallback(() => {
    return currentVolume;
  }, [currentVolume]);

  const checkVisibility = useCallback(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    
    if (!container || !video) return false;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Calculate how much of the element is visible
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
    
    const elementHeight = rect.height;
    const elementWidth = rect.width;
    
    const visibleArea = Math.max(0, visibleHeight) * Math.max(0, visibleWidth);
    const totalArea = elementHeight * elementWidth;
    
    const visibilityRatio = totalArea > 0 ? visibleArea / totalArea : 0;
    
    return visibilityRatio >= visibilityThreshold;
  }, [visibilityThreshold]);

  const handleScroll = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const isCurrentlyVisible = checkVisibility();
    const wasVisible = isVisibleRef.current;

    if (isCurrentlyVisible !== wasVisible) {
      isVisibleRef.current = isCurrentlyVisible;
      onVisibilityChange?.(isCurrentlyVisible);

      if (autoPauseOnScroll) {
        if (!isCurrentlyVisible && !video.paused) {
          // Video scrolled out of view and is playing
          wasPlayingRef.current = true;
          video.pause();
        } else if (isCurrentlyVisible && autoResumeOnScroll && wasPlayingRef.current) {
          // Video scrolled back into view and was playing before
          video.play().catch(() => {
            // Handle autoplay restrictions
          });
          wasPlayingRef.current = false;
        }
      }
    }
  }, [checkVisibility, autoPauseOnScroll, autoResumeOnScroll, onVisibilityChange]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial volume
    video.volume = volume;
    setCurrentVolume(volume);

    // Add scroll listener with throttling
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add event listeners
    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', throttledScroll, { passive: true });

    // Initial visibility check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', throttledScroll);
    };
  }, [volume, handleScroll]);

  return {
    videoRef,
    containerRef,
    isVisible: isVisibleRef.current,
    setVolume,
    getCurrentVolume,
    currentVolume
  };
};

export default useVideoScrollControl;
