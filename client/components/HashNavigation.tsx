import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const HashNavigation = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {

      const timer = setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {

          const navHeight = 80;
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

  }, [hash, pathname]);

  return null;
};

export default HashNavigation;
