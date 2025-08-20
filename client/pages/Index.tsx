import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEO } from "../components/SEO";
import {
  Shield,
  Search,
  AlertTriangle,
  BarChart3,
  Users,
  Building,
  Heart,
  Laptop,
  GraduationCap,
  Briefcase,
  FileCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { HeroCarousel } from "../components/HeroCarousel";
import { ServiceCard } from "../components/ServiceCard";
import { TestimonialCard } from "../components/TestimonialCard";
import { TestimonialSlideshow } from "../components/TestimonialSlideshow";
import { TrustedIndustriesSlideshow } from "../components/TrustedIndustriesSlideshow";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);

  const [currentServiceSlide, setCurrentServiceSlide] = useState(0);

  useEffect(() => {
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        },
      );

      const chartIcons =
        statsRef.current?.querySelectorAll("[data-chart-icon]");
      if (chartIcons) {
        chartIcons.forEach((icon) => {
          icon.addEventListener("mouseenter", () => {
            gsap.to(icon, { scale: 1.1, duration: 0.3, ease: "power2.out" });
          });
          icon.addEventListener("mouseleave", () => {
            gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
          });
        });
      }
    }

    if (certificationsRef.current) {
      gsap.fromTo(
        certificationsRef.current.children,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: certificationsRef.current,
            start: "top 80%",
          },
        },
      );
    }

    const floatAnimation = gsap.to(".animate-float", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.5,
    });

    return () => {
      floatAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const services = [
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "Background Screening & Risk Mitigation",
      description:
        "Comprehensive employment verification and risk assessment services with AI-powered analysis for informed hiring decisions.",
      features: [
        "Employment History Verification",
        "Criminal Record & Identity Checks",
        "Education & Reference Validation",
        "Global Watchlist Screening",
      ],
      color: "bg-blue-500",
      textColor: "text-blue-500",
      learnMoreLink: "/solutions/background-screening",
    },
    {
      icon: <Search className="h-8 w-8 text-white" />,
      title: "Corporate Due Diligence & Risk Compliance",
      description:
        "Deep business intelligence and regulatory compliance assessments for partnerships, acquisitions, and investment decisions.",
      features: [
        "Financial Health Assessment",
        "Regulatory Compliance Review",
        "KYC & AML Screening",
        "Leadership Background Analysis",
      ],
      color: "bg-purple-500",
      textColor: "text-purple-500",
      learnMoreLink: "/solutions/corporate-due-diligence",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-white" />,
      title: "AI & Data Science Solutions",
      description:
        "Advanced analytics, machine learning, and AI-powered tools for data-driven business insights and decision-making.",
      features: [
        "Predictive Analytics & Forecasting",
        "Natural Language Processing",
        "Computer Vision Systems",
      ],
      color: "bg-red-500",
      textColor: "text-red-500",
      learnMoreLink: "/solutions/ai-data-science",
    },
    {
      icon: <Laptop className="h-8 w-8 text-white" />,
      title: "Tech & Innovation Services",
      description:
        "Custom technology solutions and digital transformation services to accelerate your business growth and innovation.",
      features: [
        "Custom Software Development",
        "System Integration & APIs",
        "Cloud Infrastructure & DevOps",
        "Data Migration & Analytics",
      ],
      color: "bg-green-500",
      textColor: "text-green-500",
      learnMoreLink: "/solutions/tech-innovation",
    },
  ];

  const industries = [
    {
      icon: <Building className="h-8 w-8 text-blue-500" />,
      title: "Banking & Financial Services",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Insurance Companies",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-blue-500" />,
      title: "Corporate & Professional Sector",
    },
    {
      icon: <FileCheck className="h-8 w-8 text-blue-500" />,
      title: "Legal Services & Law Firms",
    },
    {
      icon: <Building className="h-8 w-8 text-blue-500" />,
      title: "Real Estate & Property Management",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
      title: "Accounting & Financial Advisory",
    },
    {
      icon: <Laptop className="h-8 w-8 text-purple-500" />,
      title: "Information Technology & Software",
    },
    {
      icon: <Heart className="h-8 w-8 text-green-500" />,
      title: "Healthcare & Medical Services",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-green-500" />,
      title: "Education & Academic Institutions",
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Government & Public Sector",
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
      title: "Telecommunications",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CISO",
      company: "VP of Operations, Leading Financial Services Firm, USA",
      content:
        "IntelliDelve's comprehensive screening saved us from a potentially catastrophic security breach. Their AI-powered analysis is unmatched.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "HR Director",
      company: "Top Technology Company, Australia",
      content:
        "The speed and accuracy of their background checks have streamlined our hiring process while maintaining the highest security standards.",
      rating: 5,
    },
    {
      name: "Dr. Emma Thompson",
      role: "Chief Medical Officer",
      company: "Head of Compliance, Background Screening Company, UK",
      content:
        "Essential for our healthcare compliance. IntelliDelve ensures every hire meets our strict regulatory requirements.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "VP of Operations",
      company: "Operations Manager, Prominent Banking Institution, Pakistan",
      content:
        "Their AI-powered risk assessment tools helped us identify potential compliance issues before they became problems. Outstanding service.",
      rating: 5,
    },
    {
      name: "Maria Garcia",
      role: "Legal Compliance Manager",
      company: "Senior Risk Analyst, Best Insurance Company, USA",
      content:
        "IntelliDelve's due diligence reports are thorough and delivered faster than any competitor. They're our trusted verification partner.",
      rating: 5,
    },
    {
      name: "David Park",
      role: "Chief Technology Officer",
      company: "Talent Acquisition Lead, HR Outsourcing Network, Australia",
      content:
        "Their tech solutions and background verification services scale perfectly with our growing team. Excellent technical integration.",
      rating: 5,
    },
    {
      name: "Lisa Chen",
      role: "Head of Talent Acquisition",
      company: "Regional Director, Leading Energy Provider, Pakistan",
      content:
        "IntelliDelve transformed our hiring process. We can now make confident decisions faster while maintaining the highest security standards across all our global offices.",
      rating: 5,
    },
    {
      name: "Robert Johnson",
      role: "Compliance Director",
      company: "Chief Legal Counsel, Global Investment Firm, UK",
      content:
        "The depth of their background investigations is remarkable. They caught discrepancies that other providers missed, saving us from potential regulatory issues.",
      rating: 5,
    },
    {
      name: "Amanda Foster",
      role: "VP of Human Resources",
      company: "COO,Leading Cybersecurity Company, USA.",
      content:
        "Essential for healthcare compliance. Their medical license verifications and criminal background checks ensure every hire meets our stringent requirements.",
      rating: 5,
    },
    {
      name: "Kevin Martinez",
      role: "Risk Management Officer",
      company:
        "General Manager, Major Logistics & Supply Chain Company, Australia",
      content:
        "Their AI-powered fraud detection capabilities have been game-changing for our risk assessment processes. Outstanding accuracy and speed.",
      rating: 5,
    },
    {
      name: "Sophia Williams",
      role: "Chief Security Officer",
      company: "Chief HR - Largest Fintech Company, Pakistan",
      content:
        "IntelliDelve's comprehensive security clearance and background verification processes align perfectly with our high-security requirements. Absolutely reliable.",
      rating: 5,
    },
  ];

  const certifications = [
    { name: "SOC 2 Type II", subtitle: "Security & Availability" },
    { name: "ISO 27001", subtitle: "Information Security" },
    { name: "GDPR", subtitle: "Data Protection" },
    { name: "FCRA", subtitle: "Fair Credit Reporting Agency" },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="AI-Powered Background Verification & Risk Management"
        description="Advanced AI-powered background verification, corporate due diligence, and risk management solutions with industry-leading accuracy and fastest turnaround time."
        keywords="background verification, pre-employment screening, corporate due diligence, fraud detection, risk management, AI verification, background checks, employment verification"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "IntelliDelve",
          description:
            "Advanced AI-powered background verification and risk management solutions",
          url: "https://intellidelve.com",
          logo: "https://intellidelve.com/logo.png",
          foundingDate: "2020",
          numberOfEmployees: "50-200",
          industry: "Background Verification and Risk Management",
          serviceArea: "Global",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "500",
            bestRating: "5",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Background Verification Services",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Pre-Employment Screening",
                  description:
                    "Comprehensive background verification for hiring with 99.8% accuracy",
                  provider: {
                    "@type": "Organization",
                    name: "IntelliDelve",
                  },
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Corporate Due Diligence",
                  description:
                    "Business intelligence and risk assessments for partnerships",
                  provider: {
                    "@type": "Organization",
                    name: "IntelliDelve",
                  },
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Fraud Detection",
                  description:
                    "AI-enhanced fraud identification and mitigation",
                  provider: {
                    "@type": "Organization",
                    name: "IntelliDelve",
                  },
                },
              },
            ],
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-800-123-4567",
            contactType: "Customer Service",
            email: "info@intellidelve.com",
          },
        }}
      />
      <HeroCarousel />

      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full animate-float"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-pink-400 rounded-full animate-float"></div>
          <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-green-400 rounded-full animate-float"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <BarChart3
                  className="h-16 w-16 text-yellow-300"
                  data-chart-icon
                />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 font-mono tracking-tight text-white">
                99.8%
              </div>
              <div className="text-lg text-white/90 font-medium">
                Accuracy Rate
              </div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-16 w-16 text-yellow-300" data-chart-icon />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 font-mono tracking-tight text-white">
                50+
              </div>
              <div className="text-lg text-white/90 font-medium">
                Enterprise Clients
              </div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="h-16 w-16 text-yellow-300" data-chart-icon />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 font-mono tracking-tight text-white">
                1M+
              </div>
              <div className="text-lg text-white/90 font-medium">
                Background Checks
              </div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Search className="h-16 w-16 text-yellow-300" data-chart-icon />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 font-mono tracking-tight text-white">
                24hr
              </div>
              <div className="text-lg text-white/90 font-medium">
                Average Turnaround
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustedIndustriesSlideshow industries={industries} />

      <section
        ref={servicesRef}
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-brand-navy/50 dark:to-purple-900/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-primary">
              Four Integrated Service Pillars
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-secondary">
              Comprehensive solutions across four specialized service areas for
              complete risk management and business intelligence
            </p>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} delay={index * 0.2} />
            ))}
          </div>

          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentServiceSlide * 100}%)`,
                }}
              >
                {services.map((service, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <ServiceCard {...service} delay={0} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-20 md:pt-0">
              <button
                onClick={() =>
                  setCurrentServiceSlide(Math.max(0, currentServiceSlide - 1))
                }
                disabled={currentServiceSlide === 0}
                className="p-2 rounded-full bg-primary text-white disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex space-x-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentServiceSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentServiceSlide
                        ? "bg-primary"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentServiceSlide(
                    Math.min(services.length - 1, currentServiceSlide + 1),
                  )
                }
                disabled={currentServiceSlide === services.length - 1}
                className="p-2 rounded-full bg-primary text-white disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSlideshow testimonials={testimonials} />

      <section className="py-20 bg-gray-50 dark:bg-brand-navy/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Certified & Compliant
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Industry-leading security and compliance standards
            </p>
          </div>

          <div
            ref={certificationsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white dark:bg-brand-navy rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                  {cert.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {cert.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
