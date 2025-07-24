import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileText,
  Shield,
  Search,
  CheckCircle,
  Clock,
  Users,
  Zap,
  Award,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundScreening() {
  const heroRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      );
    }

    if (stepsRef.current) {
      const steps = stepsRef.current.children;

      Array.from(steps).forEach((step, index) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: 50, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }
  }, []);

  const steps = [
    {
      number: "01",
      title: "Candidate Intake",
      description:
        "Secure collection of candidate information with encrypted data handling and consent management.",
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      color: "bg-blue-50 dark:bg-blue-900/20",
      features: ["Encrypted Forms", "Digital Consent", "GDPR Compliant"],
    },
    {
      number: "02",
      title: "Identity Verification",
      description:
        "Multi-layer identity verification using AI-powered document analysis and biometric matching.",
      icon: <Shield className="h-8 w-8 text-green-500" />,
      color: "bg-green-50 dark:bg-green-900/20",
      features: ["Document OCR", "Biometric Match", "Fraud Detection"],
    },
    {
      number: "03",
      title: "Database Screening",
      description:
        "Comprehensive database searches across criminal, employment, education, and professional records.",
      icon: <Search className="h-8 w-8 text-purple-500" />,
      color: "bg-purple-50 dark:bg-purple-900/20",
      features: ["Criminal Records", "Employment History", "Education"],
    },
    {
      number: "04",
      title: "Manual Verification",
      description:
        "Expert human review and direct verification with institutions for highest accuracy.",
      icon: <Users className="h-8 w-8 text-orange-500" />,
      color: "bg-orange-50 dark:bg-orange-900/20",
      features: ["Expert Review", "Direct Contact", "Quality Assurance"],
    },
    {
      number: "05",
      title: "AI Analysis",
      description:
        "Advanced AI algorithms analyze patterns, detect anomalies, and generate risk scores.",
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      color: "bg-yellow-50 dark:bg-yellow-900/20",
      features: ["Pattern Analysis", "Risk Scoring", "Anomaly Detection"],
    },
    {
      number: "06",
      title: "Report Generation",
      description:
        "Comprehensive, compliant reports delivered through secure channels with actionable insights.",
      icon: <Award className="h-8 w-8 text-red-500" />,
      color: "bg-red-50 dark:bg-red-900/20",
      features: ["Secure Delivery", "Compliance Check", "Actionable Insights"],
    },
  ];

  const processChoices = [
    { icon: <Clock className="h-6 w-6" />, label: "Fast", value: "24hr" },
    { icon: <Shield className="h-6 w-6" />, label: "Secure", value: "99.9%" },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      label: "Accurate",
      value: "AI",
    },
    { icon: <Users className="h-6 w-6" />, label: "Expert", value: "24/7" },
  ];

  return (
    <div className="min-h-screen">

      <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 dark:from-brand-navy dark:to-purple-900 min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('/images/downloaded/unsplash-photo-1560472354-b33ff0c44a43.jpg')`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div ref={heroRef} className="text-center text-white">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span className="text-sm font-medium">Employee Background</span>
              <div className="mx-3 h-4 w-px bg-white/30"></div>
              <span className="text-sm font-medium text-yellow-300">
                Screening
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Advanced Background Screening Process
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              Discover our comprehensive 6-step verification process that
              combines AI technology with human expertise for unmatched accuracy
              and speed.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {processChoices.map((choice, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center"
                >
                  <div className="flex justify-center mb-2 text-yellow-300">
                    {choice.icon}
                  </div>
                  <div className="text-2xl font-bold mb-1">{choice.value}</div>
                  <div className="text-sm opacity-80">{choice.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-brand-navy dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Comprehensive Screening Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Six carefully orchestrated steps ensure thorough, accurate, and
              compliant background verification for every candidate.
            </p>
            <div className="flex flex-wrap justify-center gap-8 max-w-2xl mx-auto">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  FCRA Compliant Process
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  AI-Enhanced Accuracy
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  24-Hour Turnaround
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={processRef} className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={stepsRef} className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${step.color} rounded-3xl p-8 md:p-12 transform transition-all duration-300 hover:scale-105 shadow-lg border border-gray-100 dark:border-gray-700`}
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-white dark:bg-brand-navy rounded-2xl flex items-center justify-center shadow-lg">
                        {step.icon}
                      </div>
                      <div className="text-5xl font-bold text-gray-400 dark:text-gray-600 mt-4 text-center">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {step.features.map((feature, fIndex) => (
                      <div
                        key={fIndex}
                        className="bg-white/60 dark:bg-brand-navy/60 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 text-center border border-white/20 backdrop-blur-sm"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose IntelliDelve
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Advanced technology meets human expertise for the most
              comprehensive background screening available
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="h-12 w-12 text-yellow-300" />,
                title: "Lightning Fast",
                description: "24-hour average turnaround",
              },
              {
                icon: <Shield className="h-12 w-12 text-yellow-300" />,
                title: "Bank-Level Security",
                description: "SOC 2 Type II certified",
              },
              {
                icon: <CheckCircle className="h-12 w-12 text-yellow-300" />,
                title: "99.8% Accuracy",
                description: "AI-enhanced verification",
              },
              {
                icon: <Users className="h-12 w-12 text-yellow-300" />,
                title: "Expert Support",
                description: "24/7 customer service",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="opacity-90">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              Start Your Screening Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
