import { useEffect, useState } from 'react';

export function useSafariModal(isOpen: boolean) {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(userAgent);
    setIsSafari(isSafariBrowser);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (isSafari) {

        document.body.classList.add('modal-open-safari');
      } else {

        document.body.style.overflow = 'hidden';
      }
    } else {
      if (isSafari) {
        document.body.classList.remove('modal-open-safari');
      } else {
        document.body.style.overflow = 'unset';
      }
    }

    return () => {
      if (isSafari) {
        document.body.classList.remove('modal-open-safari');
      } else {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, isSafari]);

  const getOverlayClasses = (baseClasses: string = '') => {
    if (isSafari) {
      return `safari-modal-container modal-overlay-safari ${baseClasses}`;
    }
    return `z-50 bg-black bg-opacity-60 backdrop-blur-sm ${baseClasses}`;
  };

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
