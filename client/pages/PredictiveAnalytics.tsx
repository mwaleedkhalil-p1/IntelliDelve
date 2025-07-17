import React, { useEffect, useRef } from "react";
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
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PredictiveAnalytics() {
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
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: "Risk Scoring",
      description:
        "Predict candidate risk levels based on historical data patterns",
      metrics: ["95% Accuracy", "Real-time Scoring", "Custom Models"],
    },
    {
      icon: <Database className="h-6 w-6 text-green-500" />,
      title: "Fraud Detection",
      description:
        "Identify potentially fraudulent applications before processing",
      metrics: ["99.2% Detection", "Low False Positives", "ML-Powered"],
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
      title: "Market Trends",
      description: "Forecast industry trends and verification demand patterns",
      metrics: ["Industry Insights", "Demand Forecasting", "Trend Analysis"],
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-violet-600 to-purple-700 dark:from-brand-navy dark:to-violet-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Predictive Analytics &{" "}
              <span className="text-yellow-300">Forecasting</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              Advanced AI-powered predictive analytics and forecasting solutions
              to anticipate future trends, assess risks, and make data-driven
              decisions with statistical confidence and machine learning
              precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-violet-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg">
                Explore Analytics
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-violet-600 transition-colors duration-300">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
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

      {/* Applications */}
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

          <div className="grid lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <div
                key={index}
                className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                    {app.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {app.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {app.description}
                </p>
                <div className="space-y-2">
                  {app.metrics.map((metric, metricIndex) => (
                    <div
                      key={metricIndex}
                      className="inline-block bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-3 py-1 rounded-full text-sm font-medium mr-2"
                    >
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-purple-600 text-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Unlock Predictive Intelligence
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Transform your verification processes with AI-powered predictive
            analytics and forecasting
          </p>
          <button className="bg-white text-violet-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg">
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}
