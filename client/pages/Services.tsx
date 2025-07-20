import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import {
  Shield,
  Search,
  AlertTriangle,
  BarChart3,
  Download,
  Eye,
  Check,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      );
    }
  }, []);

  useLayoutEffect(() => {
    const container = servicesRef.current;
    if (!container) return;

    const equalizeHeights = () => {
      const cards = Array.from(container.children) as HTMLElement[];
      if (cards.length === 0) return;

      cards.forEach((card) => {
        card.style.height = "auto";
      });

      const maxHeight = Math.max(...cards.map((card) => card.offsetHeight));

      cards.forEach((card) => {
        card.style.height = `${maxHeight}px`;
      });
    };

    equalizeHeights();

    window.addEventListener("resize", equalizeHeights);

    return () => window.removeEventListener("resize", equalizeHeights);
  }, []);

  const services = [
    {
      icon: <Shield className="h-12 w-12 text-white" />,
      title: "Employment Background Screening",
      description:
        "Comprehensive verification services to ensure the integrity and reliability of your workforce.",
      features: [
        "Employment History Verification",
        "Criminal Record & Identity Checks",
        "Education Verification",
        "Reference and Credential Validation",
        "Global Watchlist and Sanctions Screening",

      ],
      color: "bg-blue-500",
      textColor: "text-blue-500",
      link: "/background-screening",
    },
    {
      icon: <Search className="h-12 w-12 text-white" />,
      title: "Due Diligence Investigations",
      description:
        "Thorough background checks and risk assessments for businesses and investments.",
      features: [
        "Risk Scoring & Comprehensive Risk Profiling",
        "KYC / Compliance Verification",
        "Business Verification & Vetting",
        "Regulatory Compliance Review",
        "Financial Health Assessment",
        "Reputation Analysis",
      ],
      color: "bg-purple-500",
      textColor: "text-purple-500",
      link: "/kyc-compliance",
    },
    {
      icon: <AlertTriangle className="h-12 w-12 text-white" />,
      title: "Watchlist & Sanctions Screening",
      description:
        "Global compliance solutions to identify and mitigate risks from sanctioned entities and high-risk individuals.",
      features: [
        "Global Watchlist Screening",
        "PEP (Politically Exposed Persons) Screening",
        "Sanctions & Embargoes Check",
        "Adverse Media Monitoring",
        "Regulatory Compliance",
        "Real-time Risk Alerts",
      ],
      color: "bg-red-500",
      textColor: "text-red-500",
      link: "/watchlist-screening",
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-white" />,
      title: "Compliance & Risk Management",
      description:
        "Comprehensive solutions to ensure regulatory compliance and effective risk mitigation.",
      features: [
        "Regulatory Compliance Management",
        "Risk Assessment & Scoring",
        "Policy Development & Implementation",
        "Compliance Training & Awareness",
        "Audit & Monitoring",
        "Incident Response Planning",
      ],
      color: "bg-green-500",
      textColor: "text-green-500",
      link: "/risk-scoring",
    },
  ];

  const industryServices = [
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Financial Services",
      description:
        "AML compliance, regulatory screening, executive verification.",
      items: [
        "AML compliance, regulatory screening, executive verification",
        "Regulatory compliance and risk assessment for banking, insurance, and investment firms",
        "AML compliance, regulatory screening, executive verification",
      ],
      color: "border-blue-500",
    },
    {
      icon: <Search className="h-8 w-8 text-green-500" />,
      title: "Healthcare",
      description:
        "Medical license verification, HIPAA compliance, patient safety.",
      items: [
        "Medical license verification, HIPAA compliance, patient safety",
        "Critical verification services ensuring patient safety and regulatory compliance",
        "Medical license verification, HIPAA compliance, patient safety",
      ],
      color: "border-green-500",
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-purple-500" />,
      title: "Technology",
      description:
        "Security clearance, IP protection, remote worker verification.",
      items: [
        "Security clearance, IP protection, remote worker verification",
        "Secure talent acquisition and intellectual property protection for tech companies",
        "Security clearance, IP protection, remote worker verification",
      ],
      color: "border-purple-500",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-yellow-500" />,
      title: "Education",
      description: "Faculty screening, student safety, campus security.",
      items: [
        "Faculty screening, student safety, campus security",
        "Comprehensive verification services for educational institutions and student protection",
        "Faculty screening, student safety, campus security",
      ],
      color: "border-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>
          Our Services - IntelliDelve Background Verification & Risk Management
        </title>
        <meta
          name="description"
          content="Comprehensive AI-powered verification solutions including pre-employment screening, corporate due diligence, fraud detection, and risk management services."
        />
      </Helmet>

      <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 dark:from-brand-navy dark:to-purple-900 min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={headerRef} className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-yellow-300">Services</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              Comprehensive verification solutions powered by advanced AI and
              human expertise. Protect your organization with industry-leading
              background checks and due diligence services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
                <Eye className="h-5 w-5 mr-2" />
                Watch Demo
              </button>
              <button className="border-2 border-white dark:border-gray-300 text-white dark:text-white px-8 py-4 rounded-full font-semibold hover:bg-white dark:hover:bg-gray-300 hover:text-blue-600 dark:hover:text-gray-900 transition-colors duration-300 flex items-center justify-center">
                <Download className="h-5 w-5 mr-2" />
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Core Service Portfolio
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Three pillars of comprehensive verification and risk management
            </p>
          </div>

          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 services-mobile-grid md:services-tablet-grid">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 services-mobile-card"
              >
                <div className="flex-grow">
                  <div
                    className={`inline-flex p-4 rounded-2xl ${service.color} mb-6`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                    {service.features.map((feature, fIndex) => (
                      <div
                        key={fIndex}
                        className="flex items-start space-x-2 text-sm"
                      >
                        <Check
                          className={`h-4 w-4 ${service.textColor} mt-1 flex-shrink-0`}
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={service.link}
                  className={`mt-8 w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${service.color} text-white hover:shadow-lg text-center block`}
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-brand-navy/50 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Industry-Specific Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Tailored verification services for your industry's unique
              requirements
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mobile-full-width">
            {industryServices.map((service, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-brand-navy rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${service.color} transform hover:scale-105`}
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.items.slice(0, 2).map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-xs text-gray-500 dark:text-gray-400"
                    >
                      • {item.slice(0, 50)}...
                    </li>
                  ))}
                </ul>
                <button className="mt-4 text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Knowledge Center
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Access comprehensive guides, compliance checklists, and
                  industry reports to stay ahead of evolving verification
                  requirements.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Download className="h-6 w-6 mt-1 text-yellow-300" />
                    <div>
                      <h4 className="font-semibold mb-1">
                        Background Check Best Practices Guide
                      </h4>
                      <p className="text-sm opacity-80">
                        Comprehensive do's and don'ts for HR professionals
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Download className="h-6 w-6 mt-1 text-yellow-300" />
                    <div>
                      <h4 className="font-semibold mb-1">
                        2024 Compliance Checklist
                      </h4>
                      <p className="text-sm opacity-80">
                        Updated regulatory requirements across industries
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <BarChart3 className="h-6 w-6 mt-1 text-yellow-300" />
                    <div>
                      <h4 className="font-semibold mb-1">
                        Industry Risk Report 2024
                      </h4>
                      <p className="text-sm opacity-80">
                        Annual analysis of emerging verification trends
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <img
                  src="/Knowledge_Center.png"
                  alt="Knowledge Center Illustration"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
