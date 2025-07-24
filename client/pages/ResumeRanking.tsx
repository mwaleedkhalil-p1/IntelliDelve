import React, { useEffect, useRef } from "react";
import {
  UserCheck,
  Brain,
  Target,
  LineChart,
  Filter,
  Clock,
  FileText,
  Users,
  CheckCircle,
  Shield,
  BarChart3,
  Settings,
  Zap,
  TrendingUp,
  Eye,
  Building,
  GraduationCap,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEO } from "../components/SEO";
import { useCalendlyContext } from "../App";

gsap.registerPlugin(ScrollTrigger);

export default function ResumeRanking() {
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
        title="AI-Powered Resume Ranking & Candidate Scoring - IntelliDelve"
        description="Advanced AI-powered resume ranking and candidate scoring solutions for automated recruitment, talent assessment, and hiring optimization."
        keywords="AI resume ranking, candidate scoring, automated recruitment, talent assessment, hiring optimization, AI recruitment tools"
        canonicalUrl="/resume-ranking"
      />
      <div className="min-h-screen">

      <section className="relative min-h-screen flex items-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=85')`,
          }}
        >

          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-green-900/70"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              AI-Powered Resume Ranking &{" "}
              <span className="text-yellow-300">Candidate Scoring</span>
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6 opacity-90">
              Hire Smarter, Faster, and Fairer
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              IntelliDelve's AI-driven resume scoring and candidate ranking platform transforms your recruitment process by automating the evaluation of resumes and identifying top candidates — all based on your specific role requirements, without bias or delays.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openCalendly("AI-Powered Resume Ranking & Candidate Scoring - Schedule Meeting")}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Schedule a Meeting
                <Users className="ml-2 h-5 w-5" />
              </button>
              <Link
                to="/partners"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-600 transition-all duration-300"
              >
                Partner with Us
                <UserCheck className="ml-2 h-5 w-5" />
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
              Advanced AI-powered recruitment capabilities that transform how you evaluate and rank candidates
            </p>
          </div>

          <div ref={capabilitiesRef} className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Intelligent Resume Parsing
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Automatically extract relevant information such as work history, education, certifications, and skills from any resume format.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                  <Brain className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  AI-Driven Skill Matching
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Match candidates against job descriptions using advanced machine learning models that analyze experience, qualifications, and domain-specific keywords.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Precision Scoring & Ranking
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Generate real-time scores and rankings for each candidate, based on customizable criteria like skill relevance, industry experience, and role fit.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <Filter className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Smart Shortlisting
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Automatically surface top-tier candidates and filter out unqualified profiles — saving hours of manual screening and reducing human error.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                  <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Bias-Aware Evaluation
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Support inclusive hiring practices with AI models designed to reduce unconscious bias and ensure fair candidate comparisons.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50 dark:from-brand-navy/50 dark:to-green-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive technical capabilities for enterprise recruitment automation
            </p>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Automated resume parsing and structuring</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Role-specific skill and experience matching</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="h-5 w-5 text-purple-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Configurable scoring models and weighting</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-5 w-5 text-orange-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Bias detection and mitigation settings</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="h-5 w-5 text-red-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Candidate ranking dashboards</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Building className="h-5 w-5 text-indigo-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Integration with major ATS platforms</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-5 w-5 text-teal-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Scalable for high-volume recruiting</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <LineChart className="h-5 w-5 text-pink-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Visual analytics on pipeline performance</span>
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
              Practical AI-powered recruitment solutions across various hiring scenarios
            </p>
          </div>

          <div ref={applicationsRef} className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  High-volume job applications
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Rapid shortlisting with minimal recruiter effort
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 dark:border-green-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                  <Brain className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Tech & specialized hiring
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Match niche skills and project experience accurately
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 dark:border-purple-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Campus recruitment
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Fair scoring for candidates with limited experience
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 dark:border-orange-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <Building className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Internal mobility programs
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Score existing employees for open roles
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-100 dark:border-teal-800 lg:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-teal-100 dark:bg-teal-900/30">
                  <Briefcase className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recruitment agencies
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Provide value-added shortlists for clients
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-brand-navy/50 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Business Benefits
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Measurable outcomes that transform your recruitment process and hiring success
            </p>
          </div>

          <div ref={benefitsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  70% Faster Hiring
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Reduce time-to-hire by up to 70%
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Better Match Quality
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Improve match quality and candidate retention
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Minimize Bias
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Minimize bias in resume screening
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <Eye className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Actionable Insights
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Empower recruiters with actionable insights
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                  <TrendingUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Scale Without Growing Team
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Scale your hiring process without scaling your team
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Move Beyond Manual Screening
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              With IntelliDelve's AI-Powered Resume Ranking, you gain the speed of automation with the accuracy of intelligent evaluation — ensuring every shortlist starts strong.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}