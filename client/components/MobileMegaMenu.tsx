import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { gsap } from "gsap";
import { LucideIcon } from "lucide-react";

interface MobileMegaMenuProps {
  isOpen: boolean;
  title: string;
  sections: {
    title: string;
    icon: LucideIcon;
    items: {
      name: string;
      path: string;
      icon: LucideIcon;
    }[];
  }[];
  onClose: () => void;
}

interface AccordionSectionProps {
  section: {
    title: string;
    icon: LucideIcon;
    items: {
      name: string;
      path: string;
      icon: LucideIcon;
    }[];
  };
  isExpanded: boolean;
  onToggle: () => void;
  onItemClick: () => void;
  navigate: (path: string, options: any) => void;
}

const AccordionSection = ({ section, isExpanded, onToggle, onItemClick, navigate }: AccordionSectionProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        gsap.to(contentRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }
  }, [isExpanded]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gradient-to-r hover:from-primary/5 hover:to-purple-500/5 dark:hover:from-sky-500/10 dark:hover:to-purple-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset group"
        aria-expanded={isExpanded}
        aria-controls={`section-${section.title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 dark:bg-sky-300/10 rounded-lg group-hover:bg-primary/20 dark:group-hover:bg-sky-300/20 transition-colors duration-300">
            <section.icon className="w-5 h-5 text-primary dark:text-sky-300 flex-shrink-0" />
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white text-base block">
              {section.title}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {section.items.length} solutions
            </span>
          </div>
        </div>
        <div className={`p-2 rounded-full transition-all duration-300 ${isExpanded ? 'bg-primary/20 dark:bg-sky-300/20 rotate-180' : 'bg-gray-100 dark:bg-gray-700'}`}>
          <span className={`text-sm font-bold transition-colors duration-300 ${isExpanded ? 'text-primary dark:text-sky-300' : 'text-gray-500 dark:text-gray-400'}`}>
            +
          </span>
        </div>
      </button>

      <div
        ref={contentRef}
        id={`section-${section.title.replace(/\s+/g, '-').toLowerCase()}`}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="bg-gray-50 dark:bg-gray-900/50 px-4 pb-4">
          <ul className="space-y-2 pt-2" role="list">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex} role="listitem">
                <Link
                  to={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    // Close menu first
                    onItemClick();

                    // Delay navigation slightly to ensure menu closes
                    setTimeout(() => {
                      navigate(item.path, {});
                      // Scroll to top after navigation
                      requestAnimationFrame(() => {
                        window.scrollTo({
                          top: 0,
                          behavior: 'instant'
                        });
                      });
                    }, 0);
                  }}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-sky-300 transition-all duration-300 py-3 px-4 hover:bg-white dark:hover:bg-gray-800 rounded-xl group text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-sm hover:shadow-md transform hover:translate-x-1"
                >
                  {item.icon && (
                    <div className="p-1.5 bg-white dark:bg-gray-800 rounded-lg group-hover:bg-primary/10 dark:group-hover:bg-sky-300/10 transition-colors duration-300">
                      <item.icon className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-sky-300 transition-colors duration-300 flex-shrink-0" />
                    </div>
                  )}
                  <span className="flex-1 font-medium">{item.name}</span>
                  <div className="w-2 h-2 bg-primary/20 dark:bg-sky-300/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const MobileMegaMenu = ({ isOpen, title, sections, onClose }: MobileMegaMenuProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleSection = (index: number) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleItemClick = () => {
    setExpandedSections(new Set());
    onClose();
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      // Use instant behavior to prevent unwanted smooth scrolling
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setCanScrollUp(scrollTop > 10);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 10);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Scroll tracking
  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current;
      scrollElement.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check

      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isOpen]);

  // Animation and body scroll prevention
  useEffect(() => {
    if (menuRef.current) {
      if (isOpen) {
        // Prevent body scroll with inline styles for more reliable control
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';

        gsap.fromTo(
          menuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      } else {
        // Restore body scroll
        document.body.style.overflow = '';
        document.body.style.height = '';
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 shadow-2xl mobile-mega-menu-enter flex flex-col"
      role="region"
      aria-label={`${title} mobile menu`}
    >

      <div className="flex-shrink-0 bg-gradient-to-r from-primary/5 to-purple-500/5 dark:from-sky-500/10 dark:to-purple-500/10 p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <div className="w-2 h-2 bg-primary dark:bg-sky-400 rounded-full mr-3 animate-pulse"></div>
            {title}
          </h3>
          <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            {sections.length} Categories
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto mobile-mega-menu-scrollbar relative scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >

        <div className="absolute top-0 right-0 w-1 bg-gradient-to-b from-primary/20 to-purple-500/20 dark:from-sky-400/20 dark:to-purple-400/20 z-10 rounded-full"></div>

        {canScrollUp && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-24 right-4 z-30 p-3 bg-primary dark:bg-sky-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 active:scale-95"
            aria-label="Scroll to top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}

        <div className={`sticky top-0 h-4 bg-gradient-to-b from-white dark:from-gray-900 to-transparent z-20 pointer-events-none transition-opacity duration-300 ${canScrollUp ? 'opacity-100' : 'opacity-0'}`}></div>

        <div className="px-2 pb-2">
          {sections.map((section, index) => (
            <div key={index} className="mb-2">
                <AccordionSection
                  section={section}
                  isExpanded={expandedSections.has(index)}
                  onToggle={() => toggleSection(index)}
                  onItemClick={handleItemClick}
                  navigate={navigate}
                />
            </div>
          ))}
        </div>

        <div className={`sticky bottom-0 h-4 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-20 pointer-events-none transition-opacity duration-300 ${canScrollDown ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>

      {canScrollUp && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 bg-primary dark:bg-sky-500 text-white p-3 rounded-full shadow-lg hover:bg-primary/90 dark:hover:bg-sky-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};
