import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const previousPathnameRef = useRef<string>('');

  useEffect(() => {
    
    if (previousPathnameRef.current !== pathname) {
    
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }

    
    previousPathnameRef.current = pathname;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
