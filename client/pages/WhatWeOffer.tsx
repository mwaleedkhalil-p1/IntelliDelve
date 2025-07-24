import React, { memo, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shield,
  Search,
  Brain,
  Code,
  ArrowRight,
  Star,
  CheckCircle,
  Users,
  FileCheck,
  Globe,
  Zap,
  Target,
  TrendingUp,
  Database,
  Eye,
  Cpu,
  BarChart3,
  MessageSquare,
  Camera,
  FileText,
  Heart,
  Award,
  Lock,
  Cloud,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Building2,
  Stethoscope,
  Rocket,
  Landmark,
  Factory,
  GraduationCap,
  Home,
  Monitor,
  Settings,
  Network,
  HardDrive,
} from "lucide-react";
import { useCalendlyContext } from "../App";
import { SEO } from "../components/SEO";

gsap.registerPlugin(ScrollTrigger);

const allSolutions = [

  {
    category: "Background Screening & Risk Mitigation",
    categoryIcon: Shield,
    categoryColor: "bg-blue-500",
    categoryDescription: "Comprehensive background verification services to ensure you hire with confidence and maintain a secure workforce.",
    solutions: [
      {
        title: "Employment History Verification",
        description: "Verify employment history, job titles, and tenure with previous employers.",
        icon: Users,
        link: "/employment-verification",
        features: ["Previous employer verification", "Job title confirmation", "Employment dates validation", "Salary verification"]
      },
      {
        title: "Criminal Record & Identity Checks",
        description: "Comprehensive criminal background checks and identity verification.",
        icon: FileCheck,
        link: "/criminal-check",
        features: ["Multi-jurisdictional searches", "Identity verification", "Court records check", "Real-time updates"]
      },
      {
        title: "Education Verification",
        description: "Verify educational credentials, degrees, and certifications.",
        icon: Award,
        link: "/education-verification",
        features: ["Degree verification", "Institution validation", "Certification checks", "Academic records"]
      },
      {
        title: "Reference and Credential Validation",
        description: "Validate professional references and credentials.",
        icon: CheckCircle,
        link: "/reference-validation",
        features: ["Professional references", "Credential validation", "License verification", "Skill assessment"]
      },
      {
        title: "Address Verification",
        description: "Verify current and previous addresses for identity confirmation.",
        icon: Globe,
        link: "/address-verification",
        features: ["Current address verification", "Address history", "Utility bill validation", "Residency confirmation"]
      },
      {
        title: "Global Watchlist Screening",
        description: "Screen against global watchlists and sanctions databases.",
        icon: Eye,
        link: "/watchlist-screening",
        features: ["Sanctions screening", "PEP screening", "Adverse media checks", "Global database access"]
      },

    ]
  },

  {
    category: "Corporate Due Diligence & Risk Compliance",
    categoryIcon: Search,
    categoryColor: "bg-green-500",
    categoryDescription: "Advanced risk assessment and compliance solutions to protect your business from financial and reputational risks.",
    solutions: [
      {
        title: "Risk Scoring & Comprehensive Risk Profiling",
        description: "Advanced risk assessment and scoring algorithms.",
        icon: TrendingUp,
        link: "/risk-scoring",
        features: ["AI-powered risk scoring", "Comprehensive profiling", "Risk analytics", "Predictive modeling"]
      },
      {
        title: "KYC / Compliance",
        description: "Know Your Customer compliance and verification services.",
        icon: Lock,
        link: "/kyc-compliance",
        features: ["Identity verification", "Document validation", "Compliance reporting", "Regulatory adherence"]
      },
      {
        title: "Citizen by Investment (CBI)",
        description: "Comprehensive due diligence for citizenship and investment programs.",
        icon: Search,
        link: "/citizen-by-investment",
        features: ["CBI program verification", "Investment due diligence", "Source of funds analysis", "Regulatory compliance"]
      }
    ]
  },

  {
    category: "AI & Data Science Solutions",
    categoryIcon: Brain,
    categoryColor: "bg-purple-500",
    categoryDescription: "Cutting-edge artificial intelligence and data science capabilities to transform your business operations.",
    solutions: [
      {
        title: "Predictive Analytics & Forecasting",
        description: "Advanced predictive models for business forecasting.",
        icon: BarChart3,
        link: "/predictive-analytics",
        features: ["Machine learning models", "Business forecasting", "Trend analysis", "Data-driven insights"]
      },
      {
        title: "Interactive Dashboards & Business Intelligence",
        description: "Real-time dashboards and business intelligence solutions.",
        icon: Monitor,
        link: "/interactive-dashboards",
        features: ["Real-time dashboards", "Custom visualizations", "Business intelligence", "Data storytelling"]
      },
      {
        title: "Natural Language Processing (NLP)",
        description: "Advanced text analysis and language understanding.",
        icon: MessageSquare,
        link: "/nlp",
        features: ["Text analysis", "Language understanding", "Sentiment analysis", "Content extraction"]
      },
      {
        title: "Computer Vision Systems",
        description: "AI-powered image and video analysis solutions.",
        icon: Camera,
        link: "/computer-vision",
        features: ["Image recognition", "Object detection", "Video analysis", "Pattern recognition"]
      },
      {
        title: "Retrieval-Augmented Generation (RAG)",
        description: "Advanced AI systems for intelligent information retrieval.",
        icon: Database,
        link: "/rag",
        features: ["Intelligent search", "Context-aware responses", "Knowledge extraction", "AI-powered insights"]
      },
      {
        title: "Recommendation Engines",
        description: "Personalized recommendation systems for enhanced user experience.",
        icon: Target,
        link: "/recommendation-engines",
        features: ["Personalized recommendations", "User behavior analysis", "Content filtering", "Machine learning algorithms"]
      },
      {
        title: "Document Intelligence & OCR",
        description: "Intelligent document processing and optical character recognition.",
        icon: FileText,
        link: "/document-intelligence",
        features: ["Document processing", "OCR technology", "Data extraction", "Automated workflows"]
      },
      {
        title: "Sentiment & Intent Analysis",
        description: "Advanced sentiment and intent analysis for customer insights.",
        icon: Heart,
        link: "/sentiment-analysis",
        features: ["Sentiment analysis", "Intent recognition", "Emotion detection", "Customer insights"]
      },
      {
        title: "AI-Powered Resume Ranking",
        description: "Intelligent resume screening and candidate ranking.",
        icon: Users,
        link: "/resume-ranking",
        features: ["Resume screening", "Candidate ranking", "Skill matching", "Automated filtering"]
      }
    ]
  },

  {
    category: "Tech & Innovation Services",
    categoryIcon: Code,
    categoryColor: "bg-orange-500",
    categoryDescription: "Full-stack technology solutions and innovation services to accelerate your digital transformation.",
    solutions: [
      {
        title: "Custom Software Development",
        description: "Tailored software solutions built to your specifications.",
        icon: Code,
        link: "/custom-software",
        features: ["Custom applications", "Full-stack development", "Scalable architecture", "Modern technologies"]
      },
      {
        title: "System Integration & API Development",
        description: "Seamless system integration and API development services.",
        icon: Network,
        link: "/system-integration",
        features: ["System integration", "API development", "Data synchronization", "Legacy modernization"]
      },
      {
        title: "Data Migration & Analytics Platform",
        description: "Comprehensive data migration and analytics solutions.",
        icon: HardDrive,
        link: "/data-migration",
        features: ["Data migration", "Analytics platforms", "Data warehousing", "ETL processes"]
      },
      {
        title: "Cloud Infrastructure & DevOps",
        description: "Modern cloud infrastructure and DevOps solutions.",
        icon: Cloud,
        link: "/cloud-infrastructure",
        features: ["Cloud migration", "DevOps automation", "Infrastructure as code", "Scalable solutions"]
      }
    ]
  }
];

const stats = [
  { number: "25+", label: "Comprehensive Solutions", icon: Zap },
  { number: "16+", label: "Specialized Industries", icon: Globe },
  { number: "50+", label: "Clients Served", icon: Users },
  { number: "99.7%", label: "Accuracy Rate", icon: Target },
  { number: "24/7", label: "Support Available", icon: Settings },
];

const WhatWeOffer = memo(() => {
  const { openCalendly } = useCalendlyContext();
  const heroRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const statsRef = useRef<HTMLDivElement>(null);

  const [currentIndustrySlide, setCurrentIndustrySlide] = useState(0);

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
        ".solution-card",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".solutions-grid",
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="What We Offer - Comprehensive Solutions"
        description="Discover our comprehensive range of background screening, risk management, AI solutions, and technology services designed to transform your business operations."
        keywords="background screening, risk management, AI solutions, data science, technology services, compliance, verification"
      />

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >

        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Modern Business Solutions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/85 to-indigo-900/90"></div>
        </div>

        <div className="absolute inset-0 z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="absolute inset-0 z-20">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.02)_25%,_rgba(255,255,255,0.02)_50%,_transparent_50%,_transparent_75%,_rgba(255,255,255,0.02)_75%)] bg-[length:32px_32px]"></div>
        </div>

        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Comprehensive Solutions
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  Comprehensive Solutions
                </span>
                <br />
                <span className="text-white">for</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400">
                  Modern Business
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
                  Challenges
                </span>
              </h1>
              <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                Four integrated service pillars delivering complete risk management, compliance solutions, and cutting-edge technology services tailored to your industry needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() =>
                    openCalendly("What We Offer - Schedule Consultation")
                  }
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-white transition-all duration-300"
                >
                  View Case Studies
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">25+ Specialized Solutions</h3>
                  <p className="text-gray-200">Across four integrated service pillars</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Shield className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm">Background Screening</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Search className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm">Due Diligence</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Brain className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm">AI Solutions</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Code className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm">Tech Innovation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 dark:bg-sky-300/10 rounded-full text-primary dark:text-sky-300">
                    <stat.icon className="h-8 w-8" />
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

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Solution Portfolio
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive range of 25+ specialized solutions across four integrated service pillars,
              designed to address every aspect of modern business challenges.
            </p>
          </div>

          <div className="solutions-grid space-y-16">
            {allSolutions.map((category, categoryIndex) => {
              const sectionId = category.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
              return (
                <div
                  key={categoryIndex}
                  id={sectionId}
                  className="solution-category scroll-mt-24"
                >

                <div className="text-center mb-12">
                  <div className="flex justify-center mb-4">
                    <div className={`${category.categoryColor} p-4 rounded-2xl`}>
                      <category.categoryIcon className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {category.category}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {category.categoryDescription}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.solutions.map((solution, solutionIndex) => (
                    <div
                      key={solutionIndex}
                      className="solution-card bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group"
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-primary/10 dark:group-hover:bg-sky-300/10 transition-colors duration-300">
                            <solution.icon className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-sky-300 transition-colors duration-300" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white ml-3 group-hover:text-primary dark:group-hover:text-sky-300 transition-colors duration-300">
                            {solution.title}
                          </h4>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                          {solution.description}
                        </p>

                        <div className="space-y-2 mb-6">
                          {solution.features.slice(0, 3).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-400">
                                {feature}
                              </span>
                            </div>
                          ))}
                          {solution.features.length > 3 && (
                            <div className="text-xs text-gray-500 dark:text-gray-500 ml-6">
                              +{solution.features.length - 3} more features
                            </div>
                          )}
                        </div>

                        <Link
                          to={solution.link}
                          className="inline-flex items-center text-primary dark:text-sky-300 hover:text-primary/80 dark:hover:text-sky-300/80 font-medium text-sm transition-colors duration-200 group-hover:translate-x-1 transform"
                        >
                          Learn More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Industry-Specific Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We understand that each industry has unique challenges and
              regulatory requirements. Our solutions are tailored to meet the
              specific needs of your sector.
            </p>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Financial Services", icon: Building2 },
              { name: "Healthcare & Medical", icon: Stethoscope },
              { name: "Technology & Startups", icon: Rocket },
              { name: "Government & Public", icon: Landmark },
              { name: "Manufacturing", icon: Factory },
              { name: "Education", icon: GraduationCap },
              { name: "Insurance", icon: Shield },
              { name: "Real Estate", icon: Home },
            ].map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center border border-gray-200 dark:border-gray-700"
                >
                  <IconComponent className="h-8 w-8 text-primary dark:text-accent mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {industry.name}
                  </h3>
                </div>
              );
            })}
          </div>

          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndustrySlide * 50}%)` }}
              >
                {[
                  { name: "Financial Services", icon: Building2 },
                  { name: "Healthcare & Medical", icon: Stethoscope },
                  { name: "Technology & Startups", icon: Rocket },
                  { name: "Government & Public", icon: Landmark },
                  { name: "Manufacturing", icon: Factory },
                  { name: "Education", icon: GraduationCap },
                  { name: "Insurance", icon: Shield },
                  { name: "Real Estate", icon: Home },
                ].map((industry, index) => {
                  const IconComponent = industry.icon;
                  return (
                    <div key={index} className="w-1/2 flex-shrink-0 px-2">
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center border border-gray-200 dark:border-gray-700">
                        <IconComponent className="h-8 w-8 text-primary dark:text-accent mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {industry.name}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setCurrentIndustrySlide(Math.max(0, currentIndustrySlide - 1))}
                disabled={currentIndustrySlide === 0}
                className="p-2 rounded-full bg-primary text-white disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndustrySlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndustrySlide ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentIndustrySlide(Math.min(3, currentIndustrySlide + 1))}
                disabled={currentIndustrySlide === 3}
                className="p-2 rounded-full bg-primary text-white disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/industries"
              className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore All Industries
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your Risk Management?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Let's discuss how our comprehensive solutions can help your
            organization achieve its goals with confidence and security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Schedule Your Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});

WhatWeOffer.displayName = "WhatWeOffer";

export default WhatWeOffer;
