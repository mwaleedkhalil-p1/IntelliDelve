import React, { useEffect, useRef } from "react";
import {
  Brain,
  Database,
  Search,
  Zap,
  RefreshCw,
  FileText,
  Shield,
  Users,
  Clock,
  CheckCircle,
  Globe,
  Settings,
  BookOpen,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEO } from "../components/SEO";
import { useCalendlyContext } from "../App";

gsap.registerPlugin(ScrollTrigger);

export default function RAG() {
  const { openCalendly } = useCalendlyContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
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

    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
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
        title="RAG (Retrieval-Augmented Generation) Solutions - IntelliDelve"
        description="Advanced RAG solutions combining retrieval and generation for intelligent document processing, knowledge management, and AI-powered information systems."
        keywords="RAG, retrieval augmented generation, AI document processing, knowledge management, intelligent search, document intelligence, AI information systems"
        canonicalUrl="/rag"
      />
      <div className="min-h-screen">

      <section className="relative min-h-screen flex items-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=85')`,
          }}
        >

          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-indigo-900/70"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Retrieval-Augmented Generation{" "}
              <span className="text-yellow-300">(RAG)</span>
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6 opacity-90">
              Transform Content Creation with Real-Time Intelligence
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              IntelliDelve's Retrieval-Augmented Generation (RAG) system elevates traditional AI by combining large language models with live, context-aware information retrieval. This ensures every response is not just fluent — but fact-based, current, and hyper-relevant.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openCalendly("RAG (Retrieval-Augmented Generation) - Schedule Meeting")}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Schedule a Meeting
                <Users className="ml-2 h-5 w-5" />
              </button>
              <Link
                to="/partners"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                Partner with Us
                <Brain className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Makes Our RAG System Powerful
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced capabilities that transform how AI generates and retrieves information
            </p>
          </div>

          <div ref={capabilitiesRef} className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Contextual Content Generation
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Generate accurate, human-like responses tailored to the specific context of your business query, document, or conversation.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Real-Time Information Retrieval
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Pull the most up-to-date facts from internal systems, knowledge bases, or the web — ensuring outputs are grounded in truth, not just pretraining.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Database className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Multi-Source Knowledge Fusion
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Blend insights from PDFs, databases, CRMs, wikis, and APIs to create unified responses for employees, clients, or platforms.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Smart Document Understanding
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Automatically extract, summarize, and reference key information from legal contracts, compliance policies, SOPs, and technical manuals.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                  <RefreshCw className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Always-On Knowledge Base
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Keep your AI assistant updated with live data streams, version tracking, and real-time refresh to reflect new facts, policies, or content.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-brand-navy/50 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Core Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Technical capabilities that power our RAG system
            </p>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Real-time, retrieval-augmented responses</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Search className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Semantic search and context-aware prompting</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="h-5 w-5 text-purple-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Source citations and automated fact-checking</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Database className="h-5 w-5 text-orange-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Support for structured + unstructured data</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="h-5 w-5 text-red-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Custom knowledge base creation and updates</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="h-5 w-5 text-indigo-500" />
                <span className="font-semibold text-gray-900 dark:text-white">API integration with enterprise systems</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-5 w-5 text-teal-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Document parsing and insight extraction</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <RefreshCw className="h-5 w-5 text-pink-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Version control and knowledge traceability</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Real-World Applications
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Practical RAG implementations across various business functions
            </p>
          </div>

          <div ref={applicationsRef} className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Customer Support Automation
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Accurate, real-time answers to customer queries from internal knowledge bases.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 dark:border-green-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Compliance & Policy Assistants
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Instant referencing of laws, clauses, and regulations within verified documents.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 dark:border-purple-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Search className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Enterprise Knowledge Retrieval
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Search and summarize company documents on-demand.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 dark:border-orange-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Legal & Contract Review
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Automate clause extraction, risk detection, and summary generation.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-100 dark:border-teal-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-teal-100 dark:bg-teal-900/30">
                  <Users className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  HR & Onboarding Bots
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Answer employee FAQs based on latest HR policies, handbooks, and updates.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 dark:border-indigo-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                  <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Internal Chat Assistants
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Empower staff with intelligent helpdesks integrated into internal tools.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-900/30">
                  <Settings className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Troubleshooting Machinery
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Usage of troubleshooting machinery without mechanic
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-brand-navy/50 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Businesses Choose IntelliDelve's RAG
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Key advantages that set our RAG system apart from the competition
            </p>
          </div>

          <div ref={benefitsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Trustworthy Output
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Factual responses backed by traceable sources
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                  <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Time Savings
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Reduce manual document reading and search time by 80%
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Enterprise-Grade Security
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Secure API integrations and access control
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <Settings className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Custom Deployments
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Tailored solutions for legal, financial, HR, and compliance teams
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                  <Globe className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Scalable Infrastructure
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Supports multi-region knowledge sources and high query volumes
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Imagine This:
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 shadow-lg border border-blue-100 dark:border-blue-800">
              <div className="space-y-6">
                <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-md">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">HR Officer Query:</h4>
                      <p className="text-gray-600 dark:text-gray-300 italic">
                        "What's our policy on sick leave for part-time employees in New South Wales?"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-px h-8 bg-gradient-to-b from-blue-300 to-indigo-300"></div>
                </div>

                <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-md">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                      <Brain className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">RAG-Powered Response:</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Your RAG-powered assistant instantly replies with the latest policy, highlights the clause, and provides the source PDF — all within seconds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}