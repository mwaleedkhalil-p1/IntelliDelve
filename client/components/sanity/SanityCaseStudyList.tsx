import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  TrendingUp, 
  Shield, 
  Users, 
  Building, 
  Eye, 
  Brain, 
  Zap, 
  Globe, 
  Lock, 
  Database, 
  ArrowRight, 
  Loader2, 
  AlertTriangle,
  Search,
  Filter,
  X
} from "lucide-react";
import { SEO } from "../SEO";
import { useSanityCaseStudiesWithFallback } from "../../hooks/useSanityWithFallback";
import { useFallback } from "../FallbackProvider";
import SanityImage from "./SanityImage";
import type { CaseStudyFilters } from "../../types/sanity";

gsap.registerPlugin(ScrollTrigger);

interface SanityCaseStudyListProps {
  initialFilters?: CaseStudyFilters;
  showSearch?: boolean;
  showFilters?: boolean;
  showPagination?: boolean;
  itemsPerPage?: number;
  className?: string;
  onCaseStudyClick?: (caseStudy: any) => void;
}

const SanityCaseStudyList: React.FC<SanityCaseStudyListProps> = ({
  initialFilters = {},
  showSearch = true,
  showFilters = true,
  showPagination = true,
  itemsPerPage = 20,
  className = "",
  onCaseStudyClick
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const casesRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [currentPage, setCurrentPage] = useState(1);
  
  const { contentSource, isSanityHealthy } = useFallback();

  // Build filters for API call
  const filters: CaseStudyFilters = React.useMemo(() => ({
    ...initialFilters,
    search: searchQuery.trim() || undefined,
    industry: selectedIndustry !== "All Industries" ? selectedIndustry : undefined,
    status: 'published',
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  }), [initialFilters, searchQuery, selectedIndustry, currentPage, itemsPerPage]);

  // Fetch case studies with fallback
  const { data: caseStudiesResponse, isLoading, error, refetch } = useSanityCaseStudiesWithFallback(filters);

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

    if (casesRef.current && !isLoading) {
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
  }, [isLoading]);

  // Extract case studies from response
  const caseStudies = caseStudiesResponse?.data || [];
  const dataSource = caseStudiesResponse?.source || 'sanity';
  
  // Calculate total pages (simplified for now)
  const totalPages = Math.ceil(caseStudies.length / itemsPerPage);

  const stats = [
    { number: "99.8%", label: "Accuracy Rate" },
    { number: "50+", label: "Enterprise Clients" },
    { number: "1M+", label: "Background Checks" },
    { number: "24hr", label: "Average Turnaround" },
  ];

  const industries = [
    "All Industries",
    "Banking & Financial Services",
    "Healthcare & Medical",
    "Technology",
    "Education & Academic",
    "Government & Public Sector",
    "Manufacturing & Industrial",
    "Legal Services",
    "Insurance",
    "Real Estate",
    "Transportation & Logistics",
    "Energy & Utilities",
    "Retail & Consumer",
    "Non-Profit"
  ];

  // Transform case study for display with consistent styling
  const transformCaseStudy = (caseStudy: any, index: number) => {
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
    
    return {
      ...caseStudy,
      ...style,
      displayResults: caseStudy.results?.slice(0, 2) || []
    };
  };

  const displayCaseStudies = caseStudies.map(transformCaseStudy);

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefresh = async () => {
    await refetch();
  };

  const handleCaseStudyClick = (caseStudy: any) => {
    if (onCaseStudyClick) {
      onCaseStudyClick(caseStudy);
    }
  };

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <span className="ml-2 text-gray-600 dark:text-gray-300">
        Loading case studies from {dataSource === 'sanity' ? 'Sanity CMS' : 'Legacy API'}...
      </span>
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
      <div className="flex gap-2 justify-center">
        <button
          onClick={handleRefresh}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
        {dataSource === 'sanity' && !isSanityHealthy && (
          <div className="text-sm text-yellow-600 dark:text-yellow-400">
            Sanity CMS is currently unavailable. Trying fallback...
          </div>
        )}
      </div>
    </div>
  );

  // Data source indicator
  const DataSourceIndicator = () => (
    <div className="mb-4 text-center">
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
        dataSource === 'sanity' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      }`}>
        <div className={`w-2 h-2 rounded-full ${
          dataSource === 'sanity' ? 'bg-green-500' : 'bg-yellow-500'
        }`} />
        Content from {dataSource === 'sanity' ? 'Sanity CMS' : 'Legacy API'}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${className}`}>
      <SEO
        title="Case Studies - IntelliDelve Background Screening Success Stories"
        description="Explore real-world case studies showing how IntelliDelve's AI-powered background screening helped organizations improve compliance, reduce fraud, and accelerate hiring."
        keywords="background screening case studies, client success stories, compliance improvement, fraud reduction, hiring acceleration, ROI background checks"
        canonicalUrl="/case-studies"
      />

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

            {showSearch && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search case studies..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleRefresh}
                  className="inline-flex items-center gap-2 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                  title="Refresh case studies data"
                >
                  <TrendingUp className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            )}
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

      {showFilters && (
        <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => handleIndustrySelect(industry)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    industry === selectedIndustry
                      ? "bg-primary text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DataSourceIndicator />
          
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
            <>
              {displayCaseStudies.length === 0 ? (
                <div className="text-center py-16">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    No case studies found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {searchQuery
                      ? `No case studies match "${searchQuery}". Try different keywords or browse by industry.`
                      : `No case studies found in "${selectedIndustry}" industry.`
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      >
                        <X className="w-4 h-4" />
                        Clear Search
                      </button>
                    )}
                    <button
                      onClick={() => handleIndustrySelect("All Industries")}
                      className="inline-flex items-center gap-2 border border-primary text-primary dark:text-sky-300 px-6 py-3 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-sky-300 dark:hover:text-brand-navy transition-colors font-medium"
                    >
                      <ArrowRight className="w-4 h-4" />
                      View All Case Studies
                    </button>
                  </div>
                </div>
              ) : (
                <div ref={casesRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {displayCaseStudies.map((study, index) => (
                    <div
                      key={study._id}
                      className="bg-gray-50 dark:bg-slate-800/50 rounded-3xl p-6 md:p-8 border-l-8 border-l-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02] cursor-pointer"
                      onClick={() => handleCaseStudyClick(study)}
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
                                {study.client} • {study.industry}
                              </p>
                            </div>
                          </div>

                          {study.featuredImage && (
                            <div className="mb-6">
                              <SanityImage
                                image={study.featuredImage}
                                alt={study.title}
                                className="w-full h-48 rounded-lg"
                                aspectRatio="video"
                              />
                            </div>
                          )}

                          <div className="space-y-4">
                            {study.challenge && (
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                  Challenge
                                </h4>
                                <div className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                                  {typeof study.challenge === 'string' 
                                    ? study.challenge 
                                    : 'Complex business challenge requiring innovative solutions'
                                  }
                                </div>
                              </div>
                            )}

                            {study.solution && (
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                  Solution
                                </h4>
                                <div className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                                  {typeof study.solution === 'string' 
                                    ? study.solution 
                                    : 'Comprehensive solution delivered with measurable results'
                                  }
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {study.displayResults.length > 0 && (
                          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-center">
                              Results
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              {study.displayResults.map((result: any, rIndex: number) => (
                                <div key={rIndex} className="text-center">
                                  <div className="text-3xl font-bold text-primary dark:text-sky-300 mb-1">
                                    {result.metric}
                                  </div>
                                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                                    {result.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCaseStudyClick(study);
                              }}
                              className="mt-4 bg-primary dark:bg-sky-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-primary/90 dark:hover:bg-sky-400 transition-colors transform hover:scale-105 mx-auto block text-sm"
                            >
                              View Full Case Study
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Pagination Section */}
      {showPagination && !isLoading && !error && totalPages > 1 && (
        <section className="py-8 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    page === currentPage
                      ? 'text-white bg-primary border border-primary'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </div>

            <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
              Showing page {currentPage} of {totalPages} ({displayCaseStudies.length} total case studies)
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SanityCaseStudyList;