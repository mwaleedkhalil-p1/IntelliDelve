import React, { useState, useEffect, useRef, memo } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { gsap } from "gsap";

interface Industry {
  title: string;
  icon: React.ReactElement;
}

interface TrustedIndustriesSlideshowProps {
  industries: Industry[];
}

const TrustedIndustriesSlideshow = memo<TrustedIndustriesSlideshowProps>(
  ({ industries }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const slideshowRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const itemsPerView = 4;
    const maxIndex = Math.max(0, industries.length - itemsPerView);

    useEffect(() => {
      if (isPlaying && !isPaused) {
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 3000);
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [isPlaying, isPaused, maxIndex]);

    const nextSlide = () => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
      setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const togglePlayPause = () => {
      setIsPlaying(!isPlaying);
    };

    const handleMouseEnter = () => {
      setIsPaused(true);
    };

    const handleMouseLeave = () => {
      setIsPaused(false);
    };

    useEffect(() => {
      if (slideshowRef.current) {
        const items = slideshowRef.current.querySelectorAll('.industry-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
          }
        );
      }
    }, [currentIndex]);

    return (
      <section className="py-20 bg-white dark:bg-brand-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Leading Industries
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive solutions tailored for your sector
            </p>
          </div>

          <div className="relative">

            <div
              ref={slideshowRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {industries.slice(currentIndex, currentIndex + itemsPerView).map((industry, index) => (
                <div
                  key={`${currentIndex}-${index}`}
                  className="industry-item bg-gray-50 dark:bg-brand-navy/50 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-lg group"
                >
                  <div className="flex justify-center mb-4">
                    {React.cloneElement(industry.icon, {
                      className: "h-12 w-12 text-primary dark:text-sky-300 group-hover:scale-110 transition-transform duration-300",
                    })}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white font-primary leading-tight group-hover:text-primary dark:group-hover:text-sky-300 transition-colors duration-300">
                    {industry.title}
                  </h3>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary dark:bg-sky-300 scale-125"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-primary/50 dark:hover:bg-sky-300/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </div>

            <div className="text-center mt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {isPlaying ? "Auto-playing" : "Paused"} • {currentIndex + 1} of {maxIndex + 1}
              </span>
            </div>
          </div>

          <div className="lg:hidden mt-12 mobile-full-width">
            <div className="flex animate-scroll-infinite space-x-4 md:space-x-6 overflow-hidden px-4">

              {industries.map((industry, index) => (
                <div
                  key={`mobile-first-${index}`}
                  className="flex-shrink-0 bg-gray-50 dark:bg-brand-navy/50 rounded-xl p-3 md:p-4 text-center w-40 md:w-48"
                >
                  <div className="flex justify-center mb-2 md:mb-3">
                    {React.cloneElement(industry.icon, {
                      className: "h-6 w-6 md:h-8 md:w-8 text-primary dark:text-sky-300",
                    })}
                  </div>
                  <h3 className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white leading-tight mobile-text-responsive">
                    {industry.title}
                  </h3>
                </div>
              ))}

              {industries.map((industry, index) => (
                <div
                  key={`mobile-second-${index}`}
                  className="flex-shrink-0 bg-gray-50 dark:bg-brand-navy/50 rounded-xl p-4 text-center w-48"
                >
                  <div className="flex justify-center mb-3">
                    {React.cloneElement(industry.icon, {
                      className: "h-8 w-8 text-primary dark:text-sky-300",
                    })}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                    {industry.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

TrustedIndustriesSlideshow.displayName = "TrustedIndustriesSlideshow";

export { TrustedIndustriesSlideshow };
