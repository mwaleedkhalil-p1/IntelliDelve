import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BarChart3, TrendingUp, PieChart, Activity } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function InteractiveCharts() {
  const chartsRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);
  const radarChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartsRef.current) {

      gsap.fromTo(
        chartsRef.current.children,
        { opacity: 0, y: 100, rotationX: -15, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: chartsRef.current,
            start: "top 80%",
          },
        },
      );

      if (barChartRef.current) {
        const bars = barChartRef.current.querySelectorAll("[data-bar]");
        gsap.fromTo(
          bars,
          { height: 0, opacity: 0, filter: "brightness(0.3)" },
          {
            height: (i) => `${[60, 80, 45, 90, 70][i]}%`,
            opacity: 1,
            filter: "brightness(1)",
            duration: 2,
            stagger: 0.15,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: barChartRef.current,
              start: "top 80%",
            },
          },
        );

        gsap.to(bars, {
          boxShadow:
            "0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: 2,
        });
      }

      if (pieChartRef.current) {
        const segments = pieChartRef.current.querySelectorAll("[data-segment]");
        gsap.fromTo(
          segments,
          {
            strokeDasharray: "0 628",
            rotation: -90,
            transformOrigin: "50% 50%",
          },
          {
            strokeDasharray: (i: number) => `${[188, 157, 283][i]} 628`,
            rotation: -90,
            duration: 2.5,
            stagger: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pieChartRef.current,
              start: "top 80%",
            },
          },
        );

        gsap.to(pieChartRef.current, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
          delay: 3,
        });
      }

      if (lineChartRef.current) {
        const lines = lineChartRef.current.querySelectorAll("[data-line]");
        const particles =
          lineChartRef.current.querySelectorAll("[data-particle]");

        gsap.fromTo(
          lines,
          {
            strokeDasharray: "1000",
            strokeDashoffset: "1000",
            filter: "brightness(0.3)",
          },
          {
            strokeDashoffset: 0,
            filter: "brightness(1) drop-shadow(0 0 10px currentColor)",
            duration: 3,
            stagger: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: lineChartRef.current,
              start: "top 80%",
            },
          },
        );

        gsap.fromTo(
          particles,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)",
            delay: 3,
            scrollTrigger: {
              trigger: lineChartRef.current,
              start: "top 80%",
            },
          },
        );
      }

      if (radarChartRef.current) {
        const radarPoints =
          radarChartRef.current.querySelectorAll("[data-radar-point]");
        const radarLines =
          radarChartRef.current.querySelectorAll("[data-radar-line]");

        gsap.fromTo(
          radarLines,
          { strokeDasharray: "200", strokeDashoffset: "200", opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: radarChartRef.current,
              start: "top 80%",
            },
          },
        );

        gsap.fromTo(
          radarPoints,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(2)",
            delay: 1,
            scrollTrigger: {
              trigger: radarChartRef.current,
              start: "top 80%",
            },
          },
        );

        gsap.to(radarPoints, {
          scale: 1.3,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: 3,
        });
      }
    }
  }, []);

  const handleChartHover = (chartRef: React.RefObject<HTMLDivElement>) => {
    if (chartRef.current) {
      gsap.to(chartRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleChartLeave = (chartRef: React.RefObject<HTMLDivElement>) => {
    if (chartRef.current) {
      gsap.to(chartRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-brand-navy/50 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Real-Time Analytics & Insights
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Interactive visualizations of our verification performance and
            industry trends
          </p>
        </div>

        <div
          ref={chartsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >

          <div
            ref={barChartRef}
            className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-white/10 cursor-pointer overflow-hidden group"
            onMouseEnter={() => handleChartHover(barChartRef)}
            onMouseLeave={() => handleChartLeave(barChartRef)}
            style={{
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-xl bg-blue-500/20 mr-3">
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    Neural Processing
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    AI-Powered Speed
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-between h-40 mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-lg"></div>
                {[60, 80, 45, 90, 70].map((height, index) => (
                  <div
                    key={index}
                    className="relative w-8 rounded-t-lg overflow-hidden"
                    data-bar
                    style={{ height: 0 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20"></div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-1">
                  99.2%
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Real-time Processing Efficiency
                </p>
              </div>
            </div>
          </div>

          <div
            ref={pieChartRef}
            className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-white/10 cursor-pointer overflow-hidden group"
            onMouseEnter={() => handleChartHover(pieChartRef)}
            onMouseLeave={() => handleChartLeave(pieChartRef)}
            style={{
              background:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-xl bg-green-500/20 mr-3">
                  <PieChart className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    Market Sectors
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Global Distribution
                  </p>
                </div>
              </div>
              <div className="relative w-40 h-40 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full transform -rotate-90 drop-shadow-lg"
                >
                  <defs>
                    <linearGradient
                      id="greenGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#10B981" stopOpacity="1" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient
                      id="blueGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
                      <stop offset="100%" stopColor="#1D4ED8" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient
                      id="purpleGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="1" />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="url(#greenGrad)"
                    strokeWidth="10"
                    strokeDasharray="0 628"
                    data-segment
                    filter="drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="url(#blueGrad)"
                    strokeWidth="10"
                    strokeDasharray="0 628"
                    data-segment
                    filter="drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="url(#purpleGrad)"
                    strokeWidth="10"
                    strokeDasharray="0 628"
                    data-segment
                    filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="15"
                    fill="rgba(255, 255, 255, 0.1)"
                    className="animate-pulse"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                      AI
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 mb-1">
                  50+
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Enterprise Partnerships
                </p>
              </div>
            </div>
          </div>

          <div
            ref={lineChartRef}
            className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-white/10 cursor-pointer overflow-hidden group"
            onMouseEnter={() => handleChartHover(lineChartRef)}
            onMouseLeave={() => handleChartLeave(lineChartRef)}
            style={{
              background:
                "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-xl bg-purple-500/20 mr-3">
                  <TrendingUp className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    Quantum Growth
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Neural Trajectory
                  </p>
                </div>
              </div>
              <div className="h-40 mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent rounded-lg"></div>
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  <defs>
                    <linearGradient
                      id="lineGrad1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#A855F7" stopOpacity="1" />
                      <stop
                        offset="100%"
                        stopColor="#C084FC"
                        stopOpacity="0.8"
                      />
                    </linearGradient>
                    <linearGradient
                      id="lineGrad2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#0891B2" stopOpacity="1" />
                      <stop
                        offset="100%"
                        stopColor="#67E8F9"
                        stopOpacity="0.8"
                      />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke="url(#lineGrad1)"
                    strokeWidth="4"
                    points="20,80 60,60 100,40 140,30 180,20"
                    data-line
                    filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))"
                  />
                  <polyline
                    fill="none"
                    stroke="url(#lineGrad2)"
                    strokeWidth="4"
                    points="20,70 60,50 100,35 140,25 180,15"
                    data-line
                    filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))"
                  />

                  <circle
                    cx="20"
                    cy="80"
                    r="3"
                    fill="#8B5CF6"
                    data-particle
                    className="animate-pulse"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="3"
                    fill="#8B5CF6"
                    data-particle
                    className="animate-pulse"
                  />
                  <circle
                    cx="100"
                    cy="40"
                    r="3"
                    fill="#8B5CF6"
                    data-particle
                    className="animate-pulse"
                  />
                  <circle
                    cx="140"
                    cy="30"
                    r="3"
                    fill="#8B5CF6"
                    data-particle
                    className="animate-pulse"
                  />
                  <circle
                    cx="180"
                    cy="20"
                    r="3"
                    fill="#8B5CF6"
                    data-particle
                    className="animate-pulse"
                  />

                  <circle
                    cx="20"
                    cy="70"
                    r="3"
                    fill="#06B6D4"
                    data-particle
                    className="animate-pulse"
                  />
                  <circle
                    cx="60"
                    cy="50"
                    r="3"
                    fill="#06B6D4"
                    data-particle
                    className="animate-pulse"
                  />
                  <circle
                    cx="100"
                    cy="35"
                    r="3"
                    fill="#06B6D4"
                    data-particle
                    className="animate-pulse"
                  />
                  <circle
                    cx="140"
                    cy="25"
                    r="3"
                    fill="#06B6D4"
                    data-particle
                    className="animate-pulse"
                  />
                  <circle
                    cx="180"
                    cy="15"
                    r="3"
                    fill="#06B6D4"
                    data-particle
                    className="animate-pulse"
                  />
                </svg>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300 mb-1">
                  +247%
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Exponential AI Evolution
                </p>
              </div>
            </div>
          </div>

          <div
            ref={radarChartRef}
            className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-white/10 cursor-pointer overflow-hidden group"
            onMouseEnter={() => handleChartHover(radarChartRef)}
            onMouseLeave={() => handleChartLeave(radarChartRef)}
            style={{
              background:
                "linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-xl bg-orange-500/20 mr-3">
                  <Activity className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    Neural Matrix
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    System Performance
                  </p>
                </div>
              </div>
              <div className="relative w-40 h-40 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/10 to-amber-500/10"></div>
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(249, 115, 22, 0.3)" />
                      <stop offset="70%" stopColor="rgba(249, 115, 22, 0.1)" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <g
                    stroke="rgba(249, 115, 22, 0.3)"
                    strokeWidth="1"
                    fill="none"
                  >
                    <circle cx="50" cy="50" r="15" data-radar-line />
                    <circle cx="50" cy="50" r="25" data-radar-line />
                    <circle cx="50" cy="50" r="35" data-radar-line />
                    <line x1="50" y1="15" x2="50" y2="85" data-radar-line />
                    <line x1="19.6" y1="35" x2="80.4" y2="65" data-radar-line />
                    <line x1="19.6" y1="65" x2="80.4" y2="35" data-radar-line />
                  </g>

                  <polygon
                    fill="url(#radarGrad)"
                    stroke="#F97316"
                    strokeWidth="3"
                    points="50,20 75,35 75,65 50,80 25,65 25,35"
                    filter="url(#glow)"
                  />

                  {[
                    { x: 50, y: 20, label: "Speed" },
                    { x: 75, y: 35, label: "Accuracy" },
                    { x: 75, y: 65, label: "Security" },
                    { x: 50, y: 80, label: "Scale" },
                    { x: 25, y: 65, label: "Quality" },
                    { x: 25, y: 35, label: "Efficiency" },
                  ].map((point, index) => (
                    <g key={index}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill="#F97316"
                        data-radar-point
                        filter="url(#glow)"
                      />
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="2"
                        fill="#FED7AA"
                        data-radar-point
                      />
                    </g>
                  ))}

                  <circle
                    cx="50"
                    cy="50"
                    r="8"
                    fill="rgba(249, 115, 22, 0.2)"
                    stroke="#F97316"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="3"
                    fill="#F97316"
                    className="animate-pulse"
                  />
                </svg>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 mb-1">
                  AI Core
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Neural Performance Matrix
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
