import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Clock, CheckCircle, AlertTriangle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  suffix: string;
  color: string;
  delay: number;
}

function MetricCard({
  icon,
  title,
  value,
  suffix,
  color,
  delay,
}: MetricCardProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current && valueRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            onEnter: () => {
              gsap.to(
                { value: 0 },
                {
                  value,
                  duration: 2,
                  ease: "power2.out",
                  onUpdate: function () {
                    setCurrentValue(Math.round(this.targets()[0].value));
                  },
                },
              );
            },
          },
        },
      );

      const handleMouseEnter = () => {
        gsap.to(cardRef.current, {
          y: -10,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
          y: 0,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      cardRef.current.addEventListener("mouseenter", handleMouseEnter);
      cardRef.current.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        if (cardRef.current) {
          cardRef.current.removeEventListener("mouseenter", handleMouseEnter);
          cardRef.current.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }
  }, [value, delay]);

  return (
    <div
      ref={cardRef}
      className="relative bg-white dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 dark:border-white/10 cursor-pointer overflow-hidden group transition-all duration-300"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>

      <div className="relative z-10">
        <div className={`inline-flex p-3 rounded-2xl ${color} mb-6 relative`}>
          <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
          <div className="relative z-10">{icon}</div>
        </div>
        <div
          ref={valueRef}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-3"
          style={{
            textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
          }}
        >
          {currentValue}
          {suffix}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm font-medium tracking-wide uppercase transition-colors duration-300">
          {title}
        </p>

        <div className="absolute inset-0 rounded-3xl border border-white/20 group-hover:border-white/40 transition-colors duration-500"></div>

        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
}

export function AnimatedDashboard() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      const progressBars =
        progressRef.current.querySelectorAll("[data-progress]");

      progressBars.forEach((bar, index) => {
        const width = [95, 88, 92, 99][index];
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${width}%`,
            duration: 1.5,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: progressRef.current,
              start: "top 80%",
            },
          },
        );
      });
    }
  }, []);

  const metrics = [
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Security Score",
      value: 99.8,
      suffix: "%",
      color: "bg-blue-500",
      delay: 0,
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Avg Response Time",
      value: 24,
      suffix: "hr",
      color: "bg-green-500",
      delay: 0.2,
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      title: "Success Rate",
      value: 98.5,
      suffix: "%",
      color: "bg-purple-500",
      delay: 0.4,
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-white" />,
      title: "Risk Detection",
      value: 99.2,
      suffix: "%",
      color: "bg-orange-500",
      delay: 0.6,
    },
  ];

  const progressMetrics = [
    { label: "Background Checks", value: 95, color: "bg-blue-500" },
    { label: "Identity Verification", value: 88, color: "bg-green-500" },
    { label: "Document Validation", value: 92, color: "bg-purple-500" },
    { label: "Fraud Detection", value: 99, color: "bg-orange-500" },
  ];

  return (
    <section className="py-20 bg-white dark:bg-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-primary">
            Live Performance Dashboard
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-secondary">
            Real-time insights into IntelliDelve's system efficiency and
            performance metrics across all verification services
          </p>
        </div>

        <div
          ref={dashboardRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div
          ref={progressRef}
          className="relative bg-gray-50 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-300"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5"></div>

          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 dark:from-blue-400 dark:via-purple-400 dark:to-green-400 mb-8 text-center transition-colors duration-300">
              Neural Performance Matrix
            </h3>
            <div className="space-y-8">
              {progressMetrics.map((metric, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg tracking-wide transition-colors duration-300">
                      {metric.label}
                    </span>
                    <span
                      className="text-gray-900 dark:text-white font-bold text-xl transition-colors duration-300"
                      style={{ textShadow: "0 0 10px currentColor" }}
                    >
                      {metric.value}%
                    </span>
                  </div>
                  <div className="relative w-full bg-gray-200 dark:bg-white/10 rounded-full h-4 overflow-hidden transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-full"></div>
                    <div
                      className={`h-4 rounded-full ${metric.color} transition-all duration-300 relative overflow-hidden`}
                      data-progress
                      style={{
                        width: "0%",
                        background: `linear-gradient(90deg, ${
                          metric.color.includes("blue")
                            ? "#3B82F6, #60A5FA"
                            : metric.color.includes("green")
                              ? "#10B981, #34D399"
                              : metric.color.includes("purple")
                                ? "#8B5CF6, #A78BFA"
                                : "#F59E0B, #FBBF24"
                        })`,
                        boxShadow: `0 0 20px ${
                          metric.color.includes("blue")
                            ? "rgba(59, 130, 246, 0.5)"
                            : metric.color.includes("green")
                              ? "rgba(16, 185, 129, 0.5)"
                              : metric.color.includes("purple")
                                ? "rgba(139, 92, 246, 0.5)"
                                : "rgba(245, 158, 11, 0.5)"
                        }`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] animate-pulse"></div>
                    </div>
                    <div className="absolute inset-0 rounded-full border border-white/20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div
            className="absolute top-8 right-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-6 left-8 w-1 h-1 bg-green-400 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>
    </section>
  );
}
