import { useEffect, useState } from 'react';

/**
 * Custom hook to handle Safari-specific modal behavior
 * Addresses Safari issues with z-index stacking, backdrop blur, and body scroll lock
 */
export function useSafariModal(isOpen: boolean) {
  const [isSafari, setIsSafari] = useState(false);

  // Detect Safari browser on mount
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(userAgent);
    setIsSafari(isSafariBrowser);
  }, []);

  // Handle body scroll lock with Safari-specific fixes
  useEffect(() => {
    if (isOpen) {
      if (isSafari) {
        // Safari-specific body scroll lock using CSS class
        document.body.classList.add('modal-open-safari');
      } else {
        // Standard body scroll lock
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (isSafari) {
        document.body.classList.remove('modal-open-safari');
      } else {
        document.body.style.overflow = 'unset';
      }
    }

    // Cleanup function
    return () => {
      if (isSafari) {
        document.body.classList.remove('modal-open-safari');
      } else {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, isSafari]);

  /**
   * Get CSS classes for modal overlay
   */
  const getOverlayClasses = (baseClasses: string = '') => {
    if (isSafari) {
      return `safari-modal-container modal-overlay-safari ${baseClasses}`;
    }
    return `z-50 bg-black bg-opacity-60 backdrop-blur-sm ${baseClasses}`;
  };

  /**
   * Get CSS classes for modal content
   */
  const getContentClasses = (baseClasses: string = '') => {
    if (isSafari) {
      return `modal-content-safari ${baseClasses}`;
    }
    return baseClasses;
  };

  return {
    isSafari,
    getOverlayClasses,
    getContentClasses,
  };
}
