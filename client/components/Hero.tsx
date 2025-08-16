import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (
      titleRef.current &&
      subtitleRef.current &&
      buttonRef.current &&
      imageRef.current
    ) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6",
        );
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800/90 dark:to-purple-900/20 overflow-hidden"
    >

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-pink rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-brand-purple rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-brand-yellow rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
            >
              Professional{" "}
              <span className="text-purple-600 dark:text-purple-400">
                Background Checks
              </span>{" "}
              & <br />
              Due Diligence
            </h1>
            <p
              ref={subtitleRef}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Protect your organization with comprehensive verification
              services. Advanced AI-powered investigations for informed
              decision-making.
            </p>
            <div ref={buttonRef}>
              <Link
                to="/contact"
                className="inline-flex items-center bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-600/20"
              >
                Book Consultation
              </Link>
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="/images/downloaded/freepik-background-check-illustration.jpg"
                alt="Background verification illustration"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-pink rounded-full opacity-20 animate-bounce delay-300"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-green rounded-full opacity-20 animate-bounce delay-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
