import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEO } from "../components/SEO";
import {
  Building2,
  Users,
  Shield,
  Award,
  Globe,
  TrendingUp,
  CheckCircle,
  Star,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Clients() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".client-card",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".clients-grid",
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: <Building2 className="h-8 w-8" />, number: "50+", label: "Global Clients" },
    { icon: <Users className="h-8 w-8" />, number: "1M+", label: "Screenings Completed" },
    { icon: <Globe className="h-8 w-8" />, number: "50+", label: "Countries Served" },
    { icon: <Award className="h-8 w-8" />, number: "99.8%", label: "Accuracy Rate" },
  ];

  const clientCategories = [
    {
      title: "Fortune 500 Companies",
      description: "Leading multinational corporations trust us with their most critical hiring decisions.",
      icon: <Building2 className="h-12 w-12" />,
      clients: ["Global Tech Giants", "Financial Institutions", "Healthcare Networks", "Manufacturing Leaders"],
    },
    {
      title: "Government Agencies",
      description: "Secure and compliant background verification for public sector organizations.",
      icon: <Shield className="h-12 w-12" />,
      clients: ["Federal Departments", "Law Enforcement", "Defense Contractors", "Public Utilities"],
    },
    {
      title: "Healthcare Organizations",
      description: "Specialized screening solutions for healthcare providers and medical institutions.",
      icon: <Users className="h-12 w-12" />,
      clients: ["Hospital Systems", "Medical Practices", "Pharmaceutical Companies", "Healthcare Staffing"],
    },
    {
      title: "Financial Services",
      description: "Comprehensive due diligence and compliance screening for financial institutions.",
      icon: <TrendingUp className="h-12 w-12" />,
      clients: ["Investment Banks", "Insurance Companies", "Fintech Startups", "Credit Unions"],
    },
  ];

  const testimonials = [
    {
      quote: "IntelliDelve's AI-powered screening has revolutionized our hiring process. The accuracy and speed are unmatched.",
      author: "Chief Human Resources Officer",
      position: "Global Technology Company",
      rating: 5,
    },
    {
      quote: "Their compliance expertise and attention to detail have been invaluable for our regulatory requirements.",
      author: "Risk Management Director",
      position: "Leading Financial Institution",
      rating: 5,
    },
    {
      quote: "The comprehensive reporting and real-time updates have streamlined our entire verification workflow.",
      author: "HR Leadership Team",
      position: "Major Healthcare Organization",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Clients - Trusted by Global Leaders"
        description="Discover how Fortune 500 companies, government agencies, and leading organizations worldwide trust IntelliDelve for their background verification and risk management needs."
        keywords="clients, testimonials, case studies, Fortune 500, government agencies, healthcare, financial services, background verification clients"
      />

      <section
        ref={heroRef}
        className="relative pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-brand-navy dark:via-brand-navy/90 dark:to-purple-900/20 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-20"
          style={{
            backgroundImage: `url('/images/downloaded/unsplash-photo-1486406146926-c627a92ad1ab.jpg')`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted by <span className="text-primary dark:text-sky-300">Global Leaders</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              From Fortune 500 companies to government agencies, organizations worldwide rely on IntelliDelve
              for accurate, compliant, and efficient background verification solutions.
            </p>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 dark:bg-sky-300/10 rounded-full text-primary dark:text-sky-300">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-brand-navy/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our diverse client base spans across multiple industries, each with unique verification requirements.
            </p>
          </div>

          <div className="clients-grid grid md:grid-cols-2 gap-8">
            {clientCategories.map((category, index) => (
              <div
                key={index}
                className="client-card bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary/10 dark:bg-sky-300/10 rounded-full text-primary dark:text-sky-300 mr-4">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {category.description}
                </p>
                <div className="space-y-2">
                  {category.clients.map((client, clientIndex) => (
                    <div key={clientIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">{client}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 dark:opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real feedback from organizations that trust IntelliDelve
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {testimonial.position}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
