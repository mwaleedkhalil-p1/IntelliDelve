import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed top-1/2 right-4 transform -translate-y-1/2 z-[9999] p-4 bg-gradient-to-r from-primary to-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border-2 border-white/30 backdrop-blur-sm"
          aria-label="Scroll to top"
          style={{ marginTop: '60px' }}
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
