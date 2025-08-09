import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Shield, Users, Building, Eye, Brain, Zap, Globe, Lock, Database, ArrowRight, Loader2, AlertTriangle } from "lucide-react";
import { CaseStudyPopup } from "../components/CaseStudyPopup";
import { SEO } from "../components/SEO";
import { useCaseStudies } from "../hooks/useApi";
import { CaseStudyFilters } from "../services/apiService";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudies() {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const casesRef = useRef<HTMLDivElement>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // API integration
  const filters: CaseStudyFilters = { status: 'published', limit: 20 };
  const { data: caseStudiesResponse, isLoading, error, refetch } = useCaseStudies(filters);

  const openCaseStudy = (caseStudy: any) => {
    setSelectedCaseStudy(caseStudy);
    setIsPopupOpen(true);
  };

  const closeCaseStudy = () => {
    setIsPopupOpen(false);
    setTimeout(() => setSelectedCaseStudy(null), 300);
  };

  // Get case studies from API or use fallback data
  const apiCaseStudies = caseStudiesResponse?.success ? caseStudiesResponse.data.data : [];

  // Debug logging
  React.useEffect(() => {
    console.log('🔍 Case Studies API Response:', {
      loading: isLoading,
      error: error?.message,
      response: caseStudiesResponse,
      apiCaseStudiesLength: apiCaseStudies.length,
      usingFallback: apiCaseStudies.length === 0
    });
  }, [caseStudiesResponse, isLoading, error, apiCaseStudies.length]);

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <span className="ml-2 text-gray-600 dark:text-gray-300">Loading case studies...</span>
    </div>
  );

  // Error component
  const ErrorMessage = () => (
    <div className="text-center py-12">
      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Unable to load case studies
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {error?.message || 'Something went wrong while fetching case studies.'}
      </p>
      <button
        onClick={() => refetch()}
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      );
    }

    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        },
      );
    }

    if (casesRef.current) {
      gsap.fromTo(
        casesRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: casesRef.current,
            start: "top 80%",
          },
        },
      );
    }
  }, []);

  const stats = [
    { number: "99.8%", label: "Accuracy Rate" },
    { number: "50+", label: "Enterprise Clients" },
    { number: "1M+", label: "Background Checks" },
    { number: "24hr", label: "Average Turnaround" },
  ];

  // Transform API case studies into display format with fallback
  const transformCaseStudy = (apiCaseStudy: any, index: number) => {
    const colors = [
      { color: "text-blue-500", bgGradient: "bg-gradient-to-br from-blue-600 to-blue-800", icon: <Building className="h-8 w-8 text-white" /> },
      { color: "text-green-500", bgGradient: "bg-gradient-to-br from-green-600 to-green-800", icon: <Shield className="h-8 w-8 text-white" /> },
      { color: "text-purple-500", bgGradient: "bg-gradient-to-br from-purple-600 to-purple-800", icon: <Lock className="h-8 w-8 text-white" /> },
      { color: "text-orange-500", bgGradient: "bg-gradient-to-br from-orange-600 to-orange-800", icon: <Zap className="h-8 w-8 text-white" /> },
      { color: "text-indigo-500", bgGradient: "bg-gradient-to-br from-indigo-600 to-indigo-800", icon: <Users className="h-8 w-8 text-white" /> },
      { color: "text-teal-500", bgGradient: "bg-gradient-to-br from-teal-600 to-teal-800", icon: <Globe className="h-8 w-8 text-white" /> },
    ];
    
    const styleIndex = index % colors.length;
    const style = colors[styleIndex];
    
    // Parse metrics if they're stored as JSON
    let metrics = [];
    try {
      metrics = typeof apiCaseStudy.metrics === 'string' 
        ? JSON.parse(apiCaseStudy.metrics) 
        : (apiCaseStudy.metrics || []);
    } catch (e) {
      metrics = [];
    }
    
    // Parse testimonial if it's stored as JSON
    let testimonial = { quote: '', author: '', position: '' };
    try {
      testimonial = typeof apiCaseStudy.testimonial === 'string' 
        ? JSON.parse(apiCaseStudy.testimonial) 
        : (apiCaseStudy.testimonial || testimonial);
    } catch (e) {
      testimonial = { quote: '', author: '', position: '' };
    }

    return {
      id: apiCaseStudy.uuid || apiCaseStudy.id,
      title: apiCaseStudy.title,
      ...style,
      company: apiCaseStudy.client,
      industry: apiCaseStudy.industry,
      location: apiCaseStudy.location || 'Not specified',
      duration: apiCaseStudy.duration || 'Not specified',
      completedDate: apiCaseStudy.completed_date || new Date(apiCaseStudy.created_at || Date.now()).toLocaleDateString(),
      challenge: apiCaseStudy.challenge,
      solution: apiCaseStudy.solution,
      implementation: [], // Implementation steps could be parsed from content if needed
      results: metrics,
      testimonial,
      tags: apiCaseStudy.tags || [],
    };
  };
  
  // Fallback case studies for when API has no data
  const fallbackCaseStudies = [
    {
      id: "techglobal-corp",
      title: "Global Workforce Screening Transformation",
      icon: <Building className="h-8 w-8 text-white" />,
      company: "TechGlobal Corp",
      industry: "Multinational Technology Company",
      location: "San Francisco, CA & Global",
      duration: "6 months",
      completedDate: "March 2024",
      challenge:
        "TechGlobal Corp needed to screen 2,000+ candidates across 15 countries while ensuring compliance with local regulations, maintaining strict confidentiality requirements, and reducing time-to-hire by 50%. Their existing manual process was taking 3-4 weeks per candidate and had compliance gaps.",
      solution:
        "We deployed our comprehensive global screening platform with automated compliance checks, real-time reporting dashboard, and AI-powered risk assessment. The solution included integration with their HRIS system and custom workflows for different regions.",
      implementation: [
        "Conducted comprehensive audit of existing screening processes across all regions",
        "Designed custom workflows for each country's regulatory requirements",
        "Integrated our platform with their existing HRIS and ATS systems",
        "Implemented automated compliance monitoring and reporting",
        "Trained regional HR teams on the new platform and processes",
        "Established 24/7 support channels for global operations"
      ],
      results: [
        { metric: "85%", label: "Faster Screening", improvement: "From 3-4 weeks to 3-5 days" },
        { metric: "100%", label: "Compliance Rate", improvement: "Zero regulatory violations" },
        { metric: "2,000+", label: "Candidates Screened", improvement: "Monthly processing capacity" }
      ],
      testimonial: {
        quote: "IntelliDelve transformed our global hiring process. What used to take weeks now takes days, and we have complete confidence in our compliance across all regions. The platform is intuitive and the support team is exceptional.",
        author: "Sarah Chen",
        position: "Global Head of Talent Acquisition, TechGlobal Corp"
      },
      tags: ["Global Screening", "Compliance Automation", "HRIS Integration", "Risk Assessment", "Multi-Region"],
      color: "text-blue-500",
      bgGradient: "bg-gradient-to-br from-blue-600 to-blue-800"
    },
    {
      id: "medcare-alliance",
      title: "Healthcare Compliance & Safety Enhancement",
      icon: <Shield className="h-8 w-8 text-white" />,
      company: "MedCare Alliance",
      industry: "Healthcare Network",
      location: "Chicago, IL",
      duration: "4 months",
      completedDate: "January 2024",
      challenge:
        "MedCare Alliance required comprehensive healthcare-specific background checks with strict HIPAA compliance for 500+ medical professionals. They needed to verify licenses, check sanctions lists, and ensure ongoing monitoring while maintaining patient data security.",
      solution:
        "We implemented specialized healthcare screening protocols with automated license verification, sanctions checking, and continuous monitoring. The solution included HIPAA-compliant data handling and integration with medical licensing boards.",
      implementation: [
        "Developed HIPAA-compliant screening workflows and data handling procedures",
        "Integrated with state medical licensing boards for real-time verification",
        "Implemented automated sanctions and exclusion list monitoring",
        "Created custom reporting dashboards for compliance officers",
        "Established continuous monitoring for license renewals and sanctions",
        "Provided specialized training for healthcare HR teams"
      ],
      results: [
        { metric: "99.9%", label: "Accuracy Rate", improvement: "Zero false positives or negatives" },
        { metric: "60%", label: "Time Savings", improvement: "From 2 weeks to 3 days" },
        { metric: "500+", label: "Professionals Screened", improvement: "Monthly processing volume" }
      ],
      testimonial: {
        quote: "Patient safety is our top priority, and IntelliDelve's healthcare screening solution gives us complete confidence in our hiring decisions. The automated license verification and continuous monitoring are game-changers.",
        author: "Dr. Michael Rodriguez",
        position: "Chief Medical Officer, MedCare Alliance"
      },
      tags: ["Healthcare Screening", "HIPAA Compliance", "License Verification", "Sanctions Monitoring", "Continuous Monitoring"],
      color: "text-green-500",
      bgGradient: "bg-gradient-to-br from-green-600 to-green-800"
    },
    {
      id: "fintech-innovations",
      title: "Financial Services Risk Mitigation",
      icon: <Lock className="h-8 w-8 text-white" />,
      company: "FinTech Innovations",
      industry: "Financial Technology",
      location: "New York, NY",
      duration: "8 months",
      completedDate: "February 2024",
      challenge:
        "A rapidly growing fintech company needed to implement comprehensive background screening for 1,000+ employees while meeting strict financial regulatory requirements including SOX compliance, anti-money laundering checks, and ongoing risk monitoring.",
      solution:
        "We deployed our financial services screening platform with enhanced due diligence capabilities, regulatory compliance automation, and continuous risk monitoring. The solution included integration with financial crime databases and regulatory reporting tools.",
      implementation: [
        "Conducted regulatory compliance assessment and gap analysis",
        "Implemented enhanced due diligence procedures for high-risk roles",
        "Integrated with financial crime and sanctions databases",
        "Developed automated regulatory reporting capabilities",
        "Established continuous monitoring for regulatory changes",
        "Created role-based screening protocols for different risk levels"
      ],
      results: [
        { metric: "100%", label: "Regulatory Compliance", improvement: "Zero compliance violations" },
        { metric: "75%", label: "Risk Reduction", improvement: "Significant decrease in risk exposure" },
        { metric: "1,000+", label: "Employees Screened", improvement: "Comprehensive coverage achieved" }
      ],
      testimonial: {
        quote: "IntelliDelve's financial services expertise is unmatched. They understand our regulatory environment and delivered a solution that not only meets compliance requirements but enhances our overall risk management strategy.",
        author: "Jennifer Walsh",
        position: "Chief Risk Officer, FinTech Innovations"
      },
      tags: ["Financial Services", "SOX Compliance", "AML Screening", "Risk Monitoring", "Regulatory Reporting"],
      color: "text-purple-500",
      bgGradient: "bg-gradient-to-br from-purple-600 to-purple-800"
    },
    {
      id: "global-manufacturing",
      title: "Manufacturing Safety & Security Enhancement",
      icon: <Zap className="h-8 w-8 text-white" />,
      company: "Global Manufacturing Solutions",
      industry: "Industrial Manufacturing",
      location: "Detroit, MI & International",
      duration: "5 months",
      completedDate: "December 2023",
      challenge:
        "A multinational manufacturing company needed to enhance workplace safety and security by implementing comprehensive background screening for 3,000+ employees across multiple facilities, including security clearance verification for sensitive projects.",
      solution:
        "We implemented a comprehensive manufacturing-focused screening solution with safety record verification, security clearance management, and international background checks. The platform included integration with safety management systems and security protocols.",
      implementation: [
        "Developed manufacturing-specific screening criteria and safety protocols",
        "Implemented security clearance verification and management system",
        "Integrated with existing safety management and HR systems",
        "Established international screening capabilities for global workforce",
        "Created automated reporting for safety and security compliance",
        "Provided specialized training for facility managers and HR teams"
      ],
      results: [
        { metric: "90%", label: "Safety Improvement", improvement: "Significant reduction in incidents" },
        { metric: "100%", label: "Security Clearance", improvement: "Complete verification coverage" },
        { metric: "3,000+", label: "Employees Processed", improvement: "Full workforce coverage" }
      ],
      testimonial: {
        quote: "Workplace safety is paramount in manufacturing. IntelliDelve's solution has significantly enhanced our ability to maintain a safe and secure work environment while streamlining our hiring processes.",
        author: "Robert Thompson",
        position: "VP of Operations, Global Manufacturing Solutions"
      },
      tags: ["Manufacturing Safety", "Security Clearance", "International Screening", "Safety Compliance", "Risk Management"],
      color: "text-orange-500",
      bgGradient: "bg-gradient-to-br from-orange-600 to-orange-800"
    },
    {
      id: "education-network",
      title: "Educational Institution Safety Enhancement",
      icon: <Users className="h-8 w-8 text-white" />,
      company: "National Education Network",
      industry: "Education & Academia",
      location: "Boston, MA & Multi-State",
      duration: "6 months",
      completedDate: "November 2023",
      challenge:
        "A network of educational institutions needed comprehensive background screening for 2,500+ faculty and staff members across multiple campuses, ensuring student safety while maintaining compliance with state and federal education regulations.",
      solution:
        "We implemented education-specific screening protocols with automated degree verification, criminal background checks, and ongoing monitoring. The solution included integration with state education databases and compliance reporting systems.",
      implementation: [
        "Developed education-specific screening workflows and compliance protocols",
        "Integrated with state education licensing and certification databases",
        "Implemented automated degree and credential verification systems",
        "Created specialized reporting for education compliance officers",
        "Established ongoing monitoring for license renewals and violations",
        "Provided training for campus HR and administrative teams"
      ],
      results: [
        { metric: "100%", label: "Student Safety", improvement: "Zero safety incidents post-implementation" },
        { metric: "95%", label: "Compliance Rate", improvement: "Exceeded state requirements" },
        { metric: "2,500+", label: "Staff Screened", improvement: "Complete network coverage" }
      ],
      testimonial: {
        quote: "Student safety is our highest priority. IntelliDelve's education-focused screening solution has given us complete confidence in our hiring decisions while streamlining our compliance processes across all campuses.",
        author: "Dr. Patricia Williams",
        position: "Superintendent, National Education Network"
      },
      tags: ["Education Screening", "Student Safety", "Credential Verification", "Multi-Campus", "Compliance Monitoring"],
      color: "text-indigo-500",
      bgGradient: "bg-gradient-to-br from-indigo-600 to-indigo-800"
    },
    {
      id: "logistics-enterprise",
      title: "Transportation & Logistics Security Overhaul",
      icon: <Globe className="h-8 w-8 text-white" />,
      company: "TransGlobal Logistics",
      industry: "Transportation & Logistics",
      location: "Atlanta, GA & International",
      duration: "7 months",
      completedDate: "October 2023",
      challenge:
        "A major logistics company required comprehensive driver and warehouse staff screening across 50+ locations internationally, including DOT compliance, criminal background checks, and ongoing monitoring for safety-sensitive positions.",
      solution:
        "We deployed a transportation-focused screening platform with DOT compliance automation, international background checks, and continuous monitoring. The solution included integration with fleet management systems and safety protocols.",
      implementation: [
        "Developed DOT-compliant screening workflows for drivers and safety-sensitive roles",
        "Implemented international background check capabilities for global operations",
        "Integrated with fleet management and safety monitoring systems",
        "Created automated compliance reporting for DOT and international regulations",
        "Established continuous monitoring for license violations and safety incidents",
        "Provided specialized training for logistics and safety managers"
      ],
      results: [
        { metric: "98%", label: "DOT Compliance", improvement: "Exceeded federal requirements" },
        { metric: "80%", label: "Safety Improvement", improvement: "Significant reduction in incidents" },
        { metric: "5,000+", label: "Personnel Screened", improvement: "Complete workforce coverage" }
      ],
      testimonial: {
        quote: "Safety and compliance are critical in our industry. IntelliDelve's transportation screening solution has transformed our hiring process and significantly improved our safety record across all operations.",
        author: "Mark Johnson",
        position: "Chief Safety Officer, TransGlobal Logistics"
      },
      tags: ["DOT Compliance", "Driver Screening", "International Background", "Safety Monitoring", "Fleet Management"],
      color: "text-teal-500",
      bgGradient: "bg-gradient-to-br from-teal-600 to-teal-800"
    }
  ];
  
  // Use API data if available, otherwise use fallback
  const displayCaseStudies = apiCaseStudies.length > 0 ? apiCaseStudies.map(transformCaseStudy) : fallbackCaseStudies;

  const industries = [
    {
      icon: <Building className="h-12 w-12 text-blue-500" />,
      title: "Financial Services",
      description:
        "Major bank reduced compliance risk by 95% while processing 15,000+ screenings monthly.",
      metric: "95%",
      metricLabel: "Risk Reduction",
      slug: "banking-financial",
    },
    {
      icon: <Users className="h-12 w-12 text-green-500" />,
      title: "Education Sector",
      description:
        "University system improved safety protocols with 100% compliance across 50+ campuses.",
      metric: "100%",
      metricLabel: "Compliance Rate",
      slug: "education-academic",
    },
    {
      icon: <Shield className="h-12 w-12 text-purple-500" />,
      title: "Government Agency",
      description:
        "Federal contractor achieved 100% security clearance verification with zero false positives.",
      metric: "100%",
      metricLabel: "Security Clearance",
      slug: "government-public",
    },
  ];

  return (
    <>
      <SEO
        title="Case Studies - IntelliDelve Background Screening Success Stories"
        description="Explore real-world case studies showing how IntelliDelve's AI-powered background screening helped organizations improve compliance, reduce fraud, and accelerate hiring."
        keywords="background screening case studies, client success stories, compliance improvement, fraud reduction, hiring acceleration, ROI background checks"
        canonicalUrl="/case-studies"
      />
      <div className="min-h-screen">

      <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 dark:from-brand-navy dark:to-purple-900 min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=85')`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={headerRef} className="text-center text-white">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <TrendingUp className="h-5 w-5 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">
                Tracking Client Departments
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Client Case Studies,{" "}
              <span className="text-yellow-300">Proven Background Screening ROI</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              Explore real-world case studies of how IntelliDelve's AI-powered
              background screening helped global organizations improve compliance,
              reduce fraud, and accelerate hiring.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-300">
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real-world examples of how IntelliDelve has helped organizations
              mitigate risk, ensure compliance, and make confident hiring
              decisions.
            </p>
          </div>

          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage />}
          {!isLoading && !error && (
            <div ref={casesRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 case-studies-mobile-grid md:case-studies-tablet-grid mobile-full-width">
              {displayCaseStudies.map((study, index) => (
              <div
                key={study.id}
                className={`bg-gray-50 dark:bg-slate-800/50 rounded-3xl p-6 md:p-8 border-l-8 border-l-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02] case-studies-mobile-card`}
              >
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-6">
                      {study.icon}
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {study.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {study.company} • {study.industry}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Challenge
                        </h4>
                        <div 
                          className="text-gray-600 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: study.challenge }}
                        />
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Solution
                        </h4>
                        <div 
                          className="text-gray-600 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: study.solution }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-6 text-center">
                      Results
                    </h4>
                    <div className="grid grid-cols-2 gap-6">
                      {study.results.slice(0, 2).map((result, rIndex) => (
                        <div key={rIndex} className="text-center">
                          <div className="text-4xl font-bold text-primary dark:text-sky-300 mb-2">
                            {result.metric}
                          </div>
                          <div className="text-gray-600 dark:text-gray-300 text-sm">
                            {result.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => openCaseStudy(study)}
                      className="mt-6 bg-primary dark:bg-sky-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 dark:hover:bg-sky-400 transition-colors transform hover:scale-105 mx-auto block"
                    >
                      View Full Case Study
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-brand-navy/50 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Industry Highlights
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Proven success across diverse sectors and use cases
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex justify-center mb-6">{industry.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                  {industry.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                  {industry.description}
                </p>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {industry.metric}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    {industry.metricLabel}
                  </div>
                </div>
                <Link
                  to={`/industries/${industry.slug}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center justify-center mt-6 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyPopup
        isOpen={isPopupOpen}
        onClose={closeCaseStudy}
        caseStudy={selectedCaseStudy}
      />
    </div>
    </>
  );
}
