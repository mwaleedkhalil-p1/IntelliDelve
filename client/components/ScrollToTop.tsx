import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const previousPathnameRef = useRef<string>('');

  useEffect(() => {
    // COMPLETELY DISABLED FOR DEBUGGING - NO SCROLLING AT ALL
    console.log('ScrollToTop: Effect triggered but DISABLED', {
      pathname,
      previousPath: previousPathnameRef.current,
      hash,
      hasFocus: document.hasFocus()
    });

    // Just update the pathname without any scrolling
    previousPathnameRef.current = pathname;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
