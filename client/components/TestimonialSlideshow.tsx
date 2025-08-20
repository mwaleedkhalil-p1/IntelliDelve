import React, { useState, useEffect, memo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Play,
  Pause,
} from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

interface TestimonialSlideshowProps {
  testimonials: Testimonial[];
}

const TestimonialSlideshow = memo<TestimonialSlideshowProps>(
  ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
      if (!isPlaying) return;

      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 3000);

      return () => clearInterval(interval);
    }, [isPlaying, testimonials.length]);

    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
      setCurrentIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length,
      );
    };

    const goToSlide = (index: number) => {
      setCurrentIndex(index);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 dark:opacity-10"
          style={{
            backgroundImage: `url('/images/downloaded/unsplash-photo-1507003211169-0a1dd7228f2d.jpg')`,
          }}
        ></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Trusted by industry leaders worldwide
            </p>
          </div>

          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto">
              <div className="text-center">
                <Quote className="w-12 h-12 text-primary dark:text-accent mx-auto mb-6 opacity-20" />

                <blockquote className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-8 leading-relaxed">
                  "{currentTestimonial.content}"
                </blockquote>

                <div className="flex items-center justify-center mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-center">
                  <div
                    style={{
                      height: "48px",
                      width: "48px",
                      borderRadius: 100,
                    }}
                    className="mr-4"
                  ></div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {currentTestimonial.role}
                    </h4>
                    <p className="text-primary dark:text-sky-300 font-medium">
                      {currentTestimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={prevSlide}
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

            <button
              onClick={nextSlide}
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                onMouseEnter={() => setIsPlaying(false)}
                onMouseLeave={() => setIsPlaying(true)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                onMouseEnter={() => setIsPlaying(false)}
                onMouseLeave={() => setIsPlaying(true)}
                className={`p-4 rounded-lg transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-primary dark:bg-sky-500 text-white shadow-lg scale-105"
                    : "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-md"
                }`}
              >
                <div
                  style={{
                    height: "48px",
                    width: "48px",
                    borderRadius: 100,
                  }}
                  className="w-12 h-12 rounded-full mx-auto mb-2"
                ></div>

                <h5 className="text-sm font-medium truncate">
                  {testimonial.role}
                </h5>
                <p className="text-xs opacity-75 truncate text-gray-600 dark:text-gray-300">
                  {testimonial.company}
                </p>
              </button>
            ))}
          </div>

          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center px-6 py-3 bg-primary dark:bg-sky-500 text-white rounded-full hover:bg-primary/90 dark:hover:bg-sky-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause Slideshow
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Play Slideshow
                </>
              )}
            </button>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              {currentIndex + 1} of {testimonials.length}
            </div>
          </div>
        </div>
      </section>
    );
  },
);

TestimonialSlideshow.displayName = "TestimonialSlideshow";

export { TestimonialSlideshow };
