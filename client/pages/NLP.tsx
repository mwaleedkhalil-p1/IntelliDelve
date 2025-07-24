import {
  MessageSquare,
  Brain,
  Search,
  FileText,
  Zap,
  Database,
  Eye,
  BookOpen,
  Users,
  Globe,
  Target,
  Lightbulb
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCalendlyContext } from "../App";

gsap.registerPlugin(ScrollTrigger);

export default function NLP() {
  const { openCalendly } = useCalendlyContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const applicationsRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <div className="min-h-screen">

      <section className="relative min-h-screen flex items-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          }}
        >

          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-purple-900/70"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Natural Language Processing{" "}
              <span className="text-yellow-300">(NLP)</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              IntelliDelve's NLP solutions harness the power of advanced language models to transform text data into actionable insights. From document parsing to semantic understanding, our AI-driven tools streamline and automate language-based analysis at scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openCalendly("Natural Language Processing (NLP) - Schedule Meeting")}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Schedule a Meeting
                <Users className="ml-2 h-5 w-5" />
              </button>
              <Link
                to="/partners"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-indigo-600 transition-all duration-300"
              >
                Partner with Us
                <MessageSquare className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Core Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced natural language processing capabilities powered by cutting-edge AI and machine learning
            </p>
          </div>

          <div ref={capabilitiesRef} className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Language Understanding
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Leverage cutting-edge machine learning models to interpret human language with high accuracy and contextual relevance.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                  <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Text Analysis & Summarization
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Extract meaning, detect sentiment, and generate concise summaries from long-form content and documents.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Search className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Semantic Search & Retrieval
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Deliver more accurate and relevant results with intelligent, context-aware search capabilities.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <Eye className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Document Intelligence
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Automatically extract structured data from unstructured text in resumes, reports, contracts, and more.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30">
                  <Zap className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Real-Time Text Processing
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Analyze and respond to incoming text inputs instantly — powering chatbots, live feedback loops, and dynamic interfaces.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                  <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Knowledge Base Generation
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Convert unstructured content into organized, searchable knowledge graphs and domain-specific taxonomies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-brand-navy/50 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Key Applications
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real-world applications of our NLP technology across various industries and use cases
            </p>
          </div>

          <div ref={applicationsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Sentiment Analysis & Emotion Detection</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Named Entity Recognition (NER)</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="h-5 w-5 text-purple-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Topic Modeling & Text Classification</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="h-5 w-5 text-orange-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Language Translation & Localization</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-5 w-5 text-red-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Text Summarization & Content Compression</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Lightbulb className="h-5 w-5 text-indigo-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Question Answering Systems</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-5 w-5 text-teal-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Intelligent Chatbots & Virtual Assistants</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Search className="h-5 w-5 text-pink-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Document Parsing & Compliance Extraction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Transform Language into Insight
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Whether analyzing customer feedback, processing large document volumes, or powering intelligent search — IntelliDelve's NLP engine delivers speed, structure, and precision.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Text Analysis and Processing"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Text Analysis</h3>
                  <p className="text-sm opacity-90">Advanced language understanding and processing</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="AI Language Models"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">AI Language Models</h3>
                  <p className="text-sm opacity-90">Cutting-edge machine learning for language understanding</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Document Processing"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">Document Processing</h4>
                  <p className="text-xs opacity-90">Intelligent document analysis</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Sentiment Analysis"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">Sentiment Analysis</h4>
                  <p className="text-xs opacity-90">Emotion & opinion detection</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Chatbot Technology"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">Intelligent Chatbots</h4>
                  <p className="text-xs opacity-90">AI-powered conversations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}