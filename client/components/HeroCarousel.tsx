import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowRight,
  Phone,
  BookOpen,
} from "lucide-react";
import { useCalendlyContext } from "../App";

function usePrevious(value: number | undefined) {
  const ref = useRef<number | undefined>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

interface SlideData {
  id: number;
  headline: string;
  subtext: string;
  primaryCTA: {
    text: string;
    link: string;
  };
  secondaryCTAs: {
    text: string;
    link: string;
    icon: React.ReactNode;
  }[];
  image: string;
  gradientFrom: string;
  gradientTo: string;
}

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const prevSlideIndex = usePrevious(currentSlide);
  const { openCalendly } = useCalendlyContext();

  const slideDuration = 6;

  const slides: SlideData[] = [
    {
      id: 1,
      headline: "Professional Background Screening & Due Diligence",
      subtext:
        "Protect your organization with comprehensive verification services. Advanced AI-powered investigations for informed decision-making.",
      primaryCTA: {
        text: "Request Demo",
        link: "#calendly",
      },
      secondaryCTAs: [
        {
          text: "Learn More",
          link: "/solutions/background-screening",
          icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />,
        },
      ],
      image: "/images/downloaded/unsplash-photo-1507003211169-0a1dd7228f2d.jpg",
      gradientFrom: "from-blue-900/70",
      gradientTo: "to-purple-900/50",
    },
    {
      id: 2,
      headline: "AI & Data Science Solutions",
      subtext:
        "Empower your organization with intelligent analytics and machine learning tools for proactive decision-making and risk mitigation.",
      primaryCTA: {
        text: "Explore Solutions",
        link: "/solutions/ai-data-science",
      },
      secondaryCTAs: [
        {
          text: "Case Studies",
          link: "/case-studies",
          icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />,
        },
      ],
      image: "/images/downloaded/unsplash-photo-1677442136019-21780ecad995.jpg",
      gradientFrom: "from-purple-900/70",
      gradientTo: "to-indigo-900/50",
    },
    {
      id: 3,
      headline: "Tech & Innovation Services",
      subtext:
        "Custom web development, business process automation, and innovative technology solutions designed to streamline operations and enhance productivity.",
      primaryCTA: {
        text: "Our Solutions",
        link: "/solutions/tech-innovation",
      },
      secondaryCTAs: [
        {
          text: "Learn More",
          link: "/what-we-offer",
          icon: <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />,
        },
      ],
      image: "/images/downloaded/unsplash-photo-1519389950473-47ba0277781c.jpg",
      gradientFrom: "from-indigo-900/70",
      gradientTo: "to-blue-900/50",
    },
  ];

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const outgoingSlide = slideRefs.current[prevSlideIndex ?? -1];
    const incomingSlide = slideRefs.current[currentSlide];

    if (!incomingSlide) return;

    const progressBarFill = incomingSlide.querySelector(".progress-bar-fill");
    if (!progressBarFill) return;

    timelineRef.current = gsap.timeline({
      paused: !isPlaying,
      onComplete: () => {
        if (isPlaying) {
          nextSlide();
        }
      },
    });

    if (outgoingSlide && outgoingSlide !== incomingSlide) {
      timelineRef.current.to(outgoingSlide, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => gsap.set(outgoingSlide, { display: "none" }),
      });
    }

    gsap.set(incomingSlide, { display: "block", opacity: 0, x: 50 });
    gsap.set(progressBarFill, { width: "0%" });

    timelineRef.current
      .to(
        incomingSlide,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        outgoingSlide && outgoingSlide !== incomingSlide ? ">-0.2" : ">",
      )
      .to(progressBarFill, {
        width: "100%",
        duration: slideDuration,
        ease: "linear",
      });
  }, [currentSlide]);

  useEffect(() => {
    if (timelineRef.current) {
      if (isPlaying) {
        if (timelineRef.current.progress() === 1) {
          nextSlide();
        } else {
          timelineRef.current.resume();
        }
      } else {
        timelineRef.current.pause();
      }
    }
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const touchStart = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart.current - touchEnd;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
    }
  };

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => (slideRefs.current[index] = el)}
            className="absolute inset-0"
            style={{
              display: index === 0 ? "block" : "none",
              opacity: index === 0 ? 1 : 0,
            }}
          >

            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >

              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradientFrom} ${slide.gradientTo}`}></div>
            </div>

            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                  <div className="space-y-6 sm:space-y-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4 sm:mb-6">
                      {slide.headline}
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-white/90 mb-6 sm:mb-8 max-w-2xl">
                      {slide.subtext}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {slide.primaryCTA.link === "#calendly" ? (
                        <button
                          onClick={() =>
                            openCalendly(
                              `${slide.primaryCTA.text} - ${slide.headline}`,
                            )
                          }
                          className="inline-flex items-center justify-center bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                        >
                          {slide.primaryCTA.text}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                      ) : (
                        <Link
                          to={slide.primaryCTA.link}
                          className="inline-flex items-center justify-center bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                        >
                          {slide.primaryCTA.text}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      )}

                      {slide.secondaryCTAs.map((cta, ctaIndex) => (
                        <Link
                          key={ctaIndex}
                          to={cta.link}
                          className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white/80 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                        >
                          {cta.icon}
                          <span className="ml-2">{cta.text}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-4">
              <div className="max-w-7xl mx-auto">
                <div className="bg-white/20 rounded-full h-1 overflow-hidden backdrop-blur-sm">
                  <div
                    className="progress-bar-fill bg-white h-full rounded-full"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-[150px] z-20">
  <button
    onClick={prevSlide}
    className="bg-white/20 backdrop-blur-lg text-white p-3 sm:p-4 rounded-full hover:bg-white/30 transition-all duration-300 shadow-xl"
    aria-label="Previous slide"
  >
    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
  </button>
  <button
    onClick={nextSlide}
    className="bg-white/20 backdrop-blur-lg text-white p-3 sm:p-4 rounded-full hover:bg-white/30 transition-all duration-300 shadow-xl"
    aria-label="Next slide"
  >
    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
  </button>
</div>


      <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-20">

        <button
          onClick={togglePlayPause}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
          )}
        </button>

        <div className="flex space-x-2 sm:space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={togglePlayPause}
        className="absolute bottom-6 sm:bottom-8 right-4 sm:right-6 bg-white/20 backdrop-blur-lg text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-300 shadow-xl z-20"
        aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
        ) : (
          <Play className="h-4 w-4 sm:h-5 sm:w-5" />
        )}
      </button>
    </div>
  );
}
