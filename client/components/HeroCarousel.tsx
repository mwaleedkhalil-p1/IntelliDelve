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
      image: "/Regulatory_Compliance_Made_Simple.png",
      gradientFrom: "from-blue-100 dark:from-blue-900",
      gradientTo: "to-purple-100 dark:to-purple-900",
    },
    {
      id: 2,
      headline: "AI-Powered Verification Solutions",
      subtext:
        "Leverage cutting-edge artificial intelligence for faster, more accurate background verification and risk assessment processes.",
      primaryCTA: {
        text: "Request Demo",
        link: "#calendly",
      },
      secondaryCTAs: [
        {
          text: "Case Studies",
          link: "/case-studies",
          icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />,
        },
      ],
      image: "/ai_pow.png",
      gradientFrom: "from-purple-100 dark:from-purple-900",
      gradientTo: "to-indigo-100 dark:to-indigo-900",
    },
    {
      id: 3,
      headline: "Tech & Innovation Services",
      subtext:
        "Custom technology solutions and innovation services to accelerate your digital transformation and business growth.",
      primaryCTA: {
        text: "Request Demo",
        link: "#calendly",
      },
      secondaryCTAs: [
        {
          text: "Our Solutions",
          link: "/solutions/tech-innovation",
          icon: <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />,
        },
      ],
      image: "/Global_Complience.png",
      gradientFrom: "from-indigo-100 dark:from-indigo-900",
      gradientTo: "to-blue-100 dark:to-blue-900",
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
      className="relative w-full h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px] overflow-hidden bg-white dark:bg-gray-900"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradientFrom} ${slides[currentSlide].gradientTo} opacity-50 dark:opacity-100 transition-all duration-700 ease-in-out`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 sm:w-72 h-32 sm:h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
          <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-yellow-300 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-40 sm:w-80 h-40 sm:h-80 bg-pink-300 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-2000"></div>
        </div>
      </div>

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
            <div className="max-w-7xl mx-auto hero-carousel-spacing px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 xl:gap-16 items-stretch w-full py-6 sm:py-8 lg:py-16">
                <div className="relative w-full flex">
                  <div className="hero-carousel-content bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 w-full h-full flex flex-col">
                    <div className="flex-1 flex items-center p-4 sm:p-6 lg:p-10">
                      <div className="w-full">
                        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-2 sm:mb-3 lg:mb-4">
                            {slide.headline}
                          </h1>
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 lg:mb-8">
                            {slide.subtext}
                          </p>

                          <div className="hero-carousel-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5">
                            {slide.primaryCTA.link === "#calendly" ? (
                              <button
                                onClick={() =>
                                  openCalendly(
                                    `${slide.primaryCTA.text} - ${slide.headline}`,
                                  )
                                }
                                className="btn inline-flex items-center justify-center bg-primary text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-bold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl font-primary"
                              >
                                {slide.primaryCTA.text}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </button>
                            ) : (
                              <Link
                                to={slide.primaryCTA.link}
                                className="btn inline-flex items-center justify-center bg-primary text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-bold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl font-primary"
                              >
                                {slide.primaryCTA.text}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            )}

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                              {slide.secondaryCTAs.map((cta, ctaIndex) => (
                                <Link
                                  key={ctaIndex}
                                  to={cta.link}
                                  className="btn inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 px-4 sm:px-5 py-3 sm:py-4 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
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

                    {/* Progress bar at the bottom of the card */}
                    <div className="px-3 sm:px-4 lg:px-6 xl:px-8 pb-3 sm:pb-4 lg:pb-6 xl:pb-8">
                      <div className="bg-gray-300 dark:bg-gray-700 rounded-full h-1 sm:h-1.5 overflow-hidden">
                        <div
                          className="progress-bar-fill bg-blue-500 h-full rounded-full"
                          style={{ width: "0%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none flex">
                  <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 w-full">
                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-sm bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 h-full">
                      <img
                        src={slide.image}
                        alt="Background verification illustration"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                  <div className="absolute -top-3 sm:-top-6 -right-3 sm:-right-6 w-12 sm:w-24 h-12 sm:h-24 bg-white/20 rounded-full backdrop-blur-sm animate-float delay-300"></div>
                  <div className="absolute -bottom-3 sm:-bottom-6 -left-3 sm:-left-6 w-16 sm:w-32 h-16 sm:h-32 bg-white/10 rounded-full backdrop-blur-sm animate-float delay-700"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-white/10 backdrop-blur-lg text-gray-900 dark:text-white p-2 sm:p-3 rounded-full hover:bg-white dark:hover:bg-white/20 transition-all duration-300 shadow-xl z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-white/10 backdrop-blur-lg text-gray-900 dark:text-white p-2 sm:p-3 rounded-full hover:bg-white dark:hover:bg-white/20 transition-all duration-300 shadow-xl z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>

      {/* Slide Indicators and Controls */}
      <div className="absolute bottom-12 sm:bottom-16 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-10">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="p-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-full hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 group"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 text-gray-900 dark:text-white group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="h-4 w-4 text-gray-900 dark:text-white group-hover:scale-110 transition-transform" />
          )}
        </button>

        {/* Slide Indicators */}
        <div className="flex space-x-2 sm:space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gray-900 dark:bg-white scale-125"
                  : "bg-gray-600 dark:bg-white/50 hover:bg-gray-800 dark:hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={togglePlayPause}
        className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-white/90 dark:bg-white/10 backdrop-blur-lg text-gray-900 dark:text-white p-2 sm:p-3 rounded-full hover:bg-white dark:hover:bg-white/20 transition-all duration-300 shadow-xl z-10"
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
