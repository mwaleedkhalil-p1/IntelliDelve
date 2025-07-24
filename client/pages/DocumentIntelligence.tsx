import React, { useEffect, useRef } from "react";
import {
  FileText,
  Search,
  Brain,
  Scan,
  Eye,
  Database,
  Globe,
  Edit,
  Grid,
  CheckCircle,
  Zap,
  Settings,
  Building,
  Heart,
  Scale,
  Users,
  GraduationCap,
  Clock,
  Shield,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEO } from "../components/SEO";
import { useCalendlyContext } from "../App";

gsap.registerPlugin(ScrollTrigger);

export default function DocumentIntelligence() {
  const { openCalendly } = useCalendlyContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);
  const applicationsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    if (capabilitiesRef.current) {
      gsap.fromTo(
        capabilitiesRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: capabilitiesRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (platformRef.current) {
      gsap.fromTo(
        platformRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: platformRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (applicationsRef.current) {
      gsap.fromTo(
        applicationsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: applicationsRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (benefitsRef.current) {
      gsap.fromTo(
        benefitsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <>
      <SEO
        title="Document Intelligence & OCR Solutions - IntelliDelve"
        description="Advanced document intelligence and OCR solutions for automated data extraction, document processing, and intelligent content analysis."
        keywords="document intelligence, OCR, automated data extraction, document processing, intelligent content analysis, AI document processing"
        canonicalUrl="/document-intelligence"
      />
      <div className="min-h-screen">

      <section className="relative min-h-screen flex items-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          }}
        >

          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-blue-900/70"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Document Intelligence{" "}
              <span className="text-yellow-300">and OCR</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              IntelliDelve's Document Intelligence platform combines advanced Optical Character Recognition (OCR) with AI-driven analysis to transform unstructured and structured documents into actionable, searchable data — quickly, accurately, and at scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openCalendly("Document Intelligence & OCR - Schedule Meeting")}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-600 to-blue-600 text-white font-semibold rounded-full hover:from-gray-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Schedule a Meeting
                <Users className="ml-2 h-5 w-5" />
              </button>
              <Link
                to="/partners"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-600 transition-all duration-300"
              >
                Partner with Us
                <FileText className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Key Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced document processing capabilities powered by AI and machine learning
            </p>
          </div>

          <div ref={capabilitiesRef} className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <Scan className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Advanced OCR Technology
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Extract high-accuracy text from scanned documents, images, and handwritten forms using next-generation OCR engines with multi-language and layout-aware capabilities.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                  <Brain className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  AI-Powered Content Understanding
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Classify, analyze, and contextualize content from complex documents including contracts, invoices, certificates, and forms. Our AI models go beyond text to deliver insight.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Visual Structure Recognition
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Detect and process tables, grids, form fields, headers, stamps, and signatures using intelligent layout analysis and visual parsing.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <Search className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Intelligent Search & Navigation
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Make documents fully searchable — not just by text, but by semantic meaning, metadata, or custom fields — enabling fast retrieval and compliance audits.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                  <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Automated Data Extraction
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Capture critical information like names, dates, ID numbers, financial figures, and status fields automatically, reducing manual entry and error rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-brand-navy/50 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Platform Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive technical features for enterprise document processing
            </p>
          </div>

          <div ref={platformRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Scan className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-gray-900 dark:text-white">High-accuracy OCR for printed and handwritten documents</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Support for over 100 languages and RTL scripts</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Edit className="h-5 w-5 text-purple-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Handwriting recognition and form field mapping</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Grid className="h-5 w-5 text-orange-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Table structure extraction and content normalization</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-5 w-5 text-red-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Intelligent document classification and tagging</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-5 w-5 text-indigo-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Smart template matching and adaptive learning</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="h-5 w-5 text-teal-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Data validation with confidence scoring</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="h-5 w-5 text-pink-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Workflow automation and integration via APIs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Business Applications
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Industry-specific document intelligence solutions across various sectors
            </p>
          </div>

          <div ref={applicationsRef} className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Banking & Finance
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                KYC processing, loan document automation, invoice scanning
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 dark:border-green-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                  <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Healthcare
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Patient intake forms, prescriptions, medical records digitization
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 dark:border-purple-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Scale className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Legal
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Contract clause extraction, compliance document review
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 dark:border-orange-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <Building className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Public Sector
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Application processing, citizen form digitization
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-100 dark:border-teal-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-teal-100 dark:bg-teal-900/30">
                  <GraduationCap className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Education
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Transcript scanning, certificate verification
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 dark:border-indigo-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                  <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  HR & Recruitment
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Resume parsing, ID verification, onboarding document review
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-brand-navy/50 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose IntelliDelve
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Key advantages that make our document intelligence platform the preferred choice
            </p>
          </div>

          <div ref={benefitsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  80% Time Reduction
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Reduce document processing time by up to 80%
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Minimize Errors
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Minimize manual data entry and human error
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Compliance Ready
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Improve compliance readiness with searchable, structured records
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Accelerate Workflows
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Accelerate turnaround for onboarding, verification, and reporting workflows
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                  <Settings className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Seamless Integration
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Seamlessly integrate into your systems with secure API support
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              From Scans to Smart Insights
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Whether you're digitizing forms, extracting compliance data, or automating content classification — IntelliDelve turns every document into a structured, searchable asset.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}