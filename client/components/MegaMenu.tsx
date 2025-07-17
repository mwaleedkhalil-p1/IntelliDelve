import { useEffect, useRef, useState, memo, useCallback } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";


import { LucideIcon } from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  sections: {
    title: string;
    icon: LucideIcon;
    items: {
      name: string;
      path: string;
      icon: LucideIcon;
    }[];
  }[];
}



const MegaMenu = memo(
  ({ isOpen, onClose, title, description, sections }: MegaMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = useState(false);
    const [activeKeyboardIndex, setActiveKeyboardIndex] = useState(-1);

    // Calculate optimal column count based on sections
    const getOptimalColumns = useCallback(() => {
      const sectionCount = sections.length;
      if (sectionCount <= 2) return 2;
      if (sectionCount <= 3) return 3;
      if (sectionCount <= 4) return 4;
      return Math.min(5, sectionCount);
    }, [sections.length]);

    useEffect(() => {
      if (isOpen) {
        setShouldRender(true);
        gsap.killTweensOf(menuRef.current);
        gsap.fromTo(
          menuRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: "power2.out"
          },
        );
      } else {
        gsap.killTweensOf(menuRef.current);
        gsap.to(menuRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            setShouldRender(false);
            setActiveKeyboardIndex(-1);
          },
        });
      }

      return () => {
        gsap.killTweensOf(menuRef.current);
      };
    }, [isOpen]);

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) return;

        const allLinks = Array.from(
          menuRef.current?.querySelectorAll('a[href]') || []
        ) as HTMLAnchorElement[];

        switch (e.key) {
          case 'Escape':
            e.preventDefault();
            onClose();
            break;
          case 'ArrowDown':
            e.preventDefault();
            setActiveKeyboardIndex(prev =>
              prev < allLinks.length - 1 ? prev + 1 : prev
            );
            break;
          case 'ArrowUp':
            e.preventDefault();
            setActiveKeyboardIndex(prev => prev > 0 ? prev - 1 : prev);
            break;
          case 'Enter':
            if (activeKeyboardIndex >= 0 && allLinks[activeKeyboardIndex]) {
              allLinks[activeKeyboardIndex].click();
            }
            break;
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, activeKeyboardIndex, onClose]);

    // Focus management for keyboard navigation
    useEffect(() => {
      if (isOpen && activeKeyboardIndex >= 0) {
        const allLinks = Array.from(
          menuRef.current?.querySelectorAll('a[href]') || []
        ) as HTMLAnchorElement[];

        if (allLinks[activeKeyboardIndex]) {
          allLinks[activeKeyboardIndex].focus();
        }
      }
    }, [activeKeyboardIndex, isOpen]);



    if (!shouldRender && !isOpen) return null;

    const optimalColumns = getOptimalColumns();

    return (
      <div
        className="fixed inset-0 z-50"
        onClick={onClose}
        onMouseLeave={onClose}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mega-menu-title"
      >
        <div className="absolute top-16 inset-x-0 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-full max-w-[95vw] sm:max-w-5xl lg:max-w-6xl xl:max-w-7xl px-2 sm:px-4">
          <div
            ref={menuRef}
            className="relative bg-white/95 dark:bg-brand-navy/95 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 lg:p-6 border-b border-gray-100 dark:border-gray-700">
              <h3
                id="mega-menu-title"
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2"
              >
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                {description}
              </p>
            </div>

            {/* Content */}
            <div className="relative">
              <div
                ref={contentRef}
                className="p-4 sm:p-5 lg:p-6"
              >
                <nav
                  className={`grid gap-4 sm:gap-6 lg:gap-8`}
                  style={{
                    gridTemplateColumns: `repeat(${optimalColumns}, minmax(0, 1fr))`,
                  }}
                  role="navigation"
                  aria-label={`${title} navigation`}
                >
                  {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="space-y-3">
                      <div className="flex items-center gap-2 sm:gap-3 pb-2 border-b border-gray-100 dark:border-gray-700">
                        <section.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary dark:text-sky-300 flex-shrink-0" />
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base lg:text-lg">
                          {section.title}
                        </h4>
                      </div>
                      <ul className="space-y-1" role="list">
                        {section.items.slice(0, 6).map((item, itemIndex) => (
                          <li key={itemIndex} role="listitem">
                            <Link
                              to={item.path}
                              onClick={onClose}
                              className="flex items-center gap-2 sm:gap-3 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-sky-300 transition-all duration-200 py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg group text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                              tabIndex={0}
                            >
                              {item.icon && (
                                <item.icon className="w-4 h-4 text-gray-400 group-hover:text-primary dark:group-hover:text-sky-300 transition-colors duration-200 flex-shrink-0" />
                              )}
                              <span className="truncate">
                                {item.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                        {section.items.length > 6 && (
                          <li role="listitem">
                            <Link
                              to={`/${title.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={onClose}
                              className="text-primary dark:text-sky-300 hover:text-primary/80 dark:hover:text-sky-300/80 transition-colors duration-200 py-2 px-3 text-sm font-medium block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                            >
                              View All {section.title}
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>


            </div>
          </div>
        </div>
      </div>
    );
  },
);

MegaMenu.displayName = "MegaMenu";

export { MegaMenu };
