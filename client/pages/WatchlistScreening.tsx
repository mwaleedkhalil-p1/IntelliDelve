import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  Shield,
  AlertTriangle,
  Search,
  Clock,
  Database,
  Eye,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useCalendlyContext } from "../App";

gsap.registerPlugin(ScrollTrigger);

export default function WatchlistScreening() {
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
      icon: <Globe className="h-8 w-8 text-red-500" />,
      title: "Global Coverage",
      description:
        "Comprehensive screening across international watchlists and sanctions databases",
    },
    {
      icon: <Clock className="h-8 w-8 text-green-500" />,
      title: "Real-Time Updates",
      description: "Continuous monitoring with instant alerts for list updates",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Compliance Assurance",
      description:
        "Ensure AML, KYC, and regulatory compliance with automated screening",
    },
    {
      icon: <Database className="h-8 w-8 text-purple-500" />,
      title: "Multi-Source Data",
      description:
        "Access to government, regulatory, and international databases",
    },
  ];

  const watchlists = [
    {
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
      title: "Sanctions & Watchlists",
      description:
        "Multi-jurisdictional checks against international and national sanctions, embargoes, and enforcement directives.",
    },
    {
      icon: <Eye className="h-6 w-6 text-orange-500" />,
      title: "Political Exposure & Influence Risk",
      description:
        "Screening for politically exposed persons (PEPs), associates, and high-risk profiles across global jurisdictions.",
    },
    {
      icon: <Database className="h-6 w-6 text-blue-500" />,
      title: "Financial & Criminal Risk Databases",
      description:
        "Advanced coverage of fraud, money laundering, organized crime, and white-collar criminal records.",
    },
    {
      icon: <Lock className="h-6 w-6 text-purple-500" />,
      title: "Terrorism & National Security Screening",
      description:
        "Flagging links to global terrorism, extremist groups, and counter-terrorism designations.",
    },
    {
      icon: <Clock className="h-6 w-6 text-green-500" />,
      title: "Dynamic Source Monitoring",
      description:
        "Real-time access to continuously updated, compliance-driven databases.",
    },
    {
      icon: <Shield className="h-6 w-6 text-indigo-500" />,
      title: "Terrorism Risk",
      description:
        "Screening against terrorism-related designations to ensure regulatory compliance.",
    },
  ];

  return (
    <div className="min-h-screen">

      <section className="relative bg-gradient-to-br from-red-600 to-orange-700 dark:from-brand-navy dark:to-red-900 min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div ref={headerRef} className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Global Watchlist &{" "}
              <span className="text-yellow-300">Sanctions</span> Screening
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              Comprehensive watchlist and sanctions screening services to ensure
              compliance with international regulations, AML requirements, and
              counter-terrorism measures through real-time database monitoring.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => openCalendly("Global Watchlist & Sanctions Screening - Start Screening")}
                className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Screening
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Watchlist Screening Technology
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              State-of-the-art screening infrastructure with global database
              coverage and real-time monitoring
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

      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50 dark:from-brand-navy/50 dark:to-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Database Coverage
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Access to all major international watchlists and sanctions
              databases for complete compliance coverage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {watchlists.map((list, index) => (
              <div
                key={index}
                className="bg-white dark:bg-brand-navy rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                    {list.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {list.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {list.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/Regulatory_Compliance_Made_Simple.png"
                alt="Compliance Dashboard"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Regulatory Compliance Made Simple
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Streamline your compliance processes with automated screening
                and continuous monitoring.
              </p>

              <div className="space-y-6">
                {[
                  "AML/KYC Compliance",
                  "OFAC Sanctions Screening",
                  "PEP Identification",
                  "Counter-Terrorism Measures",
                  "Regulatory Reporting",
                  "Risk Assessment",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ensure Global Compliance Today
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Protect your organization with comprehensive watchlist and sanctions
            screening services
          </p>
          <Link
            to="/partners"
            className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg inline-flex items-center"
          >
            Request Screening Service
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
