import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const HashNavigation = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait for the page to render, then scroll to the hash
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          // Calculate offset for fixed navigation
          const navHeight = 80; // Approximate navigation height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
    // Removed automatic scroll to top when no hash - this was causing unwanted scrolling
  }, [hash, pathname]);

  return null;
};

export default HashNavigation;
