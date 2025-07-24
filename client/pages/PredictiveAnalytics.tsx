import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TrendingUp,
  Brain,
  BarChart3,
  Zap,
  Target,
  Clock,
  Shield,
  Database,
  Users,
} from "lucide-react";
import { useCalendlyContext } from "../App";

gsap.registerPlugin(ScrollTrigger);

export default function PredictiveAnalytics() {
  const { openCalendly } = useCalendlyContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      );
    }

    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        },
      );
    }
  }, []);

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-500" />,
      title: "AI-Powered Models",
      description:
        "Advanced machine learning algorithms for accurate prediction modeling",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      title: "Future Forecasting",
      description:
        "Predict future trends and outcomes with statistical confidence",
    },
    {
      icon: <Target className="h-8 w-8 text-purple-500" />,
      title: "Risk Assessment",
      description:
        "Identify potential risks before they become critical issues",
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-500" />,
      title: "Real-Time Analytics",
      description: "Live data processing and instant predictive insights",
    },
  ];

  const applications = [
    {
      icon: <Target className="h-6 w-6 text-blue-500" />,
      title: "Candidate Risk Prediction",
      description:
        "Predict and score the likelihood of verification issues based on behavioral data and historical records.",
    },
    {
      icon: <Shield className="h-6 w-6 text-red-500" />,
      title: "Fraud Pattern Detection",
      description:
        "Identify red flags early using ML-powered behavioral pattern analysis.",
    },
    {
      icon: <Clock className="h-6 w-6 text-green-500" />,
      title: "Turnaround Time Optimization",
      description:
        "Forecast verification workloads and adjust team schedules for maximum efficiency.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
      title: "Demand Forecasting for Retail",
      description:
        "Help retail businesses predict product demand and optimize order cycles to reduce stockouts and overstocking.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-orange-500" />,
      title: "Market Trend Forecasting",
      description:
        "Anticipate industry verification trends and hiring surges before they happen.",
    },
  ];

  return (
    <div className="min-h-screen">

      <section className="relative min-h-screen flex items-center overflow-hidden">

        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80&blur=20"
            alt="Predictive Analytics and Machine Learning"
            className="w-full h-full object-cover filter blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-violet-900/90 to-indigo-900/95"></div>
        </div>

        <div className="absolute inset-0 z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="absolute inset-0 z-20">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.02)_25%,_rgba(255,255,255,0.02)_50%,_transparent_50%,_transparent_75%,_rgba(255,255,255,0.02)_75%)] bg-[length:32px_32px]"></div>
        </div>

        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div ref={headerRef} className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
                <Brain className="w-4 h-4 mr-2" />
                AI-Powered Analytics
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
                  Predictive
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400">
                  Analytics
                </span>
                <br />
                <span className="text-white">&</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
                  Forecasting
                </span>
              </h1>
              <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                Advanced AI-powered predictive analytics and forecasting solutions to anticipate future trends, assess risks, and make data-driven decisions with statistical confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => openCalendly("Predictive Analytics & Forecasting - Schedule Meeting")}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-full hover:from-purple-600 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Schedule a Meeting
                  <Users className="ml-2 h-5 w-5" />
                </button>
                <Link
                  to="/partners"
                  className="inline-flex items-center px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300"
                >
                  Partner with Us
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">AI-Powered Insights</h3>
                  <p className="text-gray-200">Machine learning predictions and forecasts</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm">Trends</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Target className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm">Forecasts</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <BarChart3 className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm">Analytics</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Zap className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm">Insights</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Predictive Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to predict future
              outcomes and trends
            </p>
          </div>

          <div
            ref={featuresRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-violet-50 dark:from-brand-navy/50 dark:to-violet-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Real-World Applications
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Practical predictive analytics solutions for verification and risk
              management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {applications.map((app, index) => (
              <div
                key={index}
                className="bg-white dark:bg-brand-navy rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4">
                    {app.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {app.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {app.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Predictive Intelligence Benefits
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Transform your decision-making process with AI-powered
                predictions and insights.
              </p>

              <div className="space-y-6">
                {[
                  "Reduce False Positives by 85%",
                  "Increase Processing Efficiency by 60%",
                  "Predict Risk Patterns with 95% Accuracy",
                  "Automate Decision Workflows",
                  "Real-time Threat Detection",
                  "Custom Model Development",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-violet-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="/Risk_assessment.png"
                alt="Predictive Analytics Dashboard"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-brand-navy/30 dark:to-violet-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Key Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced predictive analytics capabilities designed to enhance your decision-making process
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  AI-Powered Forecasting
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Use advanced machine learning models to anticipate future outcomes across hiring, compliance, and business operations with statistical confidence.
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30">
                  <Target className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Dynamic Risk Scoring
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Assess risk levels with precision using real-time behavioral patterns, historical data, and anomaly detection.
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Fraud Detection & Prevention
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Uncover potentially fraudulent candidates or cases before processing begins. Our models identify suspicious activity with high accuracy and low false positives.
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                  <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Real-Time Analytics Dashboard
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Get instant access to predictive insights through an intuitive dashboard designed for speed and clarity.
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Custom Model Development
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Build and deploy tailored prediction models aligned with your organization's workflows, compliance needs, and risk landscape.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
