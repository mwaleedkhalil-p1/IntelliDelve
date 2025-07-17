import React, { useEffect, useRef } from "react";
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
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function WatchlistScreening() {
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
      title: "OFAC Sanctions Lists",
      description:
        "U.S. Treasury Office of Foreign Assets Control sanctioned individuals and entities",
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-500" />,
      title: "UN Security Council",
      description:
        "United Nations Security Council consolidated sanctions lists",
    },
    {
      icon: <Eye className="h-6 w-6 text-orange-500" />,
      title: "PEP Databases",
      description: "Politically Exposed Persons and their associates worldwide",
    },
    {
      icon: <Lock className="h-6 w-6 text-purple-500" />,
      title: "Terrorism Watch Lists",
      description:
        "International terrorism and counter-terrorism screening databases",
    },
    {
      icon: <Search className="h-6 w-6 text-green-500" />,
      title: "Law Enforcement",
      description: "FBI, Interpol, and international law enforcement lists",
    },
    {
      icon: <Database className="h-6 w-6 text-indigo-500" />,
      title: "Financial Crime",
      description: "Money laundering, fraud, and financial crime databases",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-orange-700 dark:from-brand-navy dark:to-red-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg">
                Start Screening
              </button>
              <button className="border-2 border-white dark:border-gray-300 text-white dark:text-white px-8 py-4 rounded-full font-semibold hover:bg-white dark:hover:bg-gray-300 hover:text-red-600 dark:hover:text-gray-900 transition-colors duration-300">
                View Coverage
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

      {/* Watchlist Coverage */}
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

      {/* Compliance Benefits */}
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ensure Global Compliance Today
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Protect your organization with comprehensive watchlist and sanctions
            screening services
          </p>
          <button className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg">
            Start Compliance Check
          </button>
        </div>
      </section>
    </div>
  );
}
