import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { DarkModeToggle } from "./DarkModeToggle";
import { MegaMenu } from "./MegaMenu";
import { MobileMegaMenu } from "./MobileMegaMenu";
import { useCalendlyContext } from "../App";

import {
  Shield,
  Briefcase,
  Brain,
  Code,
  Search,
  UserCheck,
  Building2,
  FileCheck,
  AlertCircle,
  BadgeCheck,
  LineChart,
  Database,
  Bot,
  Cpu,
  Cog,
} from "lucide-react";

const whatWeOfferMegaMenuData = {
  title: "What We Offer?",
  description:
    "Comprehensive solutions across four integrated service pillars for complete risk management and business intelligence.",
  sections: [
    {
      title: "Background Screening & Risk Mitigation",
      icon: Shield,
      items: [
        {
          name: "Employment History Verification",
          path: "/employment-verification",
          icon: Briefcase,
        },
        {
          name: "Criminal Record & Identity Checks",
          path: "/criminal-check",
          icon: AlertCircle,
        },
        {
          name: "Education Verification",
          path: "/education-verification",
          icon: BadgeCheck,
        },
        {
          name: "Background Screening Process",
          path: "/background-screening",
          icon: Shield,
        },
        {
          name: "Reference and Credential Validation",
          path: "/reference-validation",
          icon: FileCheck,
        },
        {
          name: "Physical and Digital Address Verification",
          path: "/address-verification",
          icon: Building2,
        },
        {
          name: "Global Watchlist and Sanctions Screening",
          path: "/watchlist-screening",
          icon: Search,
        },
        {
          name: "Continuous Workforce Risk Monitoring",
          path: "/workforce-monitoring",
          icon: UserCheck,
        },
      ],
    },
    {
      title: "Corporate Due Diligence & Risk Compliance",
      icon: Search,
      items: [
        {
          name: "Risk Scoring & Comprehensive Risk Profiling",
          path: "/risk-scoring",
          icon: AlertCircle,
        },
        {
          name: "KYC / Compliance",
          path: "/kyc-compliance",
          icon: Shield,
        },
      ],
    },
    {
      title: "AI & Data Science Solutions",
      icon: Brain,
      items: [
        {
          name: "Predictive Analytics & Forecasting",
          path: "/predictive-analytics",
          icon: LineChart,
        },
        {
          name: "Interactive Dashboards & Business Intelligence",
          path: "/interactive-dashboards",
          icon: LineChart,
        },
        {
          name: "Natural Language Processing (NLP)",
          path: "/nlp",
          icon: Bot,
        },
        {
          name: "Computer Vision Systems",
          path: "/computer-vision",
          icon: Cpu,
        },
        {
          name: "Retrieval-Augmented Generation (RAG)",
          path: "/rag",
          icon: Brain,
        },
        {
          name: "Recommendation Engines",
          path: "/recommendation-engines",
          icon: Cog,
        },
        {
          name: "Document Intelligence & OCR",
          path: "/document-intelligence",
          icon: FileCheck,
        },
        {
          name: "Sentiment & Intent Analysis",
          path: "/sentiment-analysis",
          icon: Brain,
        },
        {
          name: "AI-Powered Resume Ranking & Candidate Scoring",
          path: "/resume-ranking",
          icon: UserCheck,
        },
      ],
    },
    {
      title: "Tech & Innovation Services",
      icon: Code,
      items: [
        {
          name: "Custom Software Development",
          path: "/custom-software",
          icon: Code,
        },
        {
          name: "System Integration & API Development",
          path: "/system-integration",
          icon: Cog,
        },
        {
          name: "Data Migration & Analytics Platform",
          path: "/data-migration",
          icon: Database,
        },
        {
          name: "Cloud Infrastructure & DevOps",
          path: "/cloud-infrastructure",
          icon: Cpu,
        },
      ],
    },
  ],
};

const industriesMegaMenuData = {
  title: "Industries We Serve",
  description:
    "Specialized background screening and risk management solutions tailored for diverse industry verticals.",
  sections: [
    {
      title: "Financial & Professional Services",
      icon: Building2,
      items: [
        {
          name: "Banking & Financial Services",
          path: "/industries/banking-financial",
          icon: Building2,
        },
        {
          name: "Insurance Companies",
          path: "/industries/insurance",
          icon: Shield,
        },
        {
          name: "Corporate & Professional Sector",
          path: "/industries/corporate-professional",
          icon: Briefcase,
        },
        {
          name: "Legal Services & Law Firms",
          path: "/industries/legal-services",
          icon: FileCheck,
        },
        {
          name: "Real Estate & Property Management",
          path: "/industries/real-estate",
          icon: Building2,
        },
        {
          name: "Accounting & Financial Advisory",
          path: "/industries/accounting-advisory",
          icon: LineChart,
        },
      ],
    },
    {
      title: "Technology & Innovation",
      icon: Cpu,
      items: [
        {
          name: "Information Technology & Software",
          path: "/industries/it-software",
          icon: Cpu,
        },
        {
          name: "Startups & Tech Companies",
          path: "/industries/startups-tech",
          icon: Bot,
        },
        {
          name: "E-commerce & Digital Platforms",
          path: "/industries/ecommerce-digital",
          icon: Code,
        },
        {
          name: "Telecommunications",
          path: "/industries/telecommunications",
          icon: Cpu,
        },
      ],
    },
    {
      title: "Healthcare & Essential Services",
      icon: UserCheck,
      items: [
        {
          name: "Healthcare & Medical Services",
          path: "/industries/healthcare-medical",
          icon: UserCheck,
        },
        {
          name: "Government & Public Sector",
          path: "/industries/government-public",
          icon: Shield,
        },
        {
          name: "Education & Academic Institutions",
          path: "/industries/education-academic",
          icon: BadgeCheck,
        },
        {
          name: "Non-Profit Organizations",
          path: "/industries/non-profit",
          icon: UserCheck,
        },
      ],
    },
    {
      title: "Manufacturing & Retail",
      icon: Cog,
      items: [
        {
          name: "Manufacturing & Industrial",
          path: "/industries/manufacturing-industrial",
          icon: Cog,
        },
        {
          name: "Retail & Consumer Goods",
          path: "/industries/retail-consumer",
          icon: Building2,
        },
        {
          name: "Transportation & Logistics",
          path: "/industries/transportation-logistics",
          icon: Cog,
        },
        {
          name: "Energy & Utilities",
          path: "/industries/energy-utilities",
          icon: Cpu,
        },
      ],
    },
  ],
};

const Navigation = memo(() => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(
    null,
  );

  const location = useLocation();
  const { openCalendly } = useCalendlyContext();
  const navRef = useRef<HTMLElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const closeAllMenus = useCallback(() => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
    setMobileSubMenuOpen(null);
  }, []);

  const handleMenuHover = useCallback((menuType: string) => {
    if (window.innerWidth >= 1024) {
      // Clear any pending close timeout
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      setActiveMenu(menuType);
    }
  }, []);

  const handleMobileSubMenu = useCallback(
    (menuType: string) => {
      setMobileSubMenuOpen(mobileSubMenuOpen === menuType ? null : menuType);
    },
    [mobileSubMenuOpen],
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        closeAllMenus();
      }
    },
    [closeAllMenus],
  );

  const handleMouseLeave = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 100);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      );
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setMobileSubMenuOpen(null);
      } else {
        setActiveMenu(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "What We Offer?", path: "/what-we-offer", hasMegaMenu: true },
    { name: "Industries", path: "/industries", hasMegaMenu: true },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Career & Partner", path: "/partners" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-brand-navy/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="flex items-center flex-shrink-0"
              onClick={closeAllMenus}
            >
              <div className="relative">
                <img
                  src="/Main logo TM.png"
                  alt="IntelliDelve"
                  className="h-8 w-auto dark:hidden"
                />
                <img
                  src="/logo.png"
                  alt="IntelliDelve"
                  className="h-8 w-auto hidden dark:block"
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasMegaMenu ? (
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-sky-300 transition-colors duration-200 font-medium py-2 px-1 ${
                        location.pathname === item.path
                          ? "text-primary dark:text-sky-300"
                          : ""
                      }`}
                      onMouseEnter={() =>
                        handleMenuHover(item.name.toLowerCase())
                      }
                      onClick={closeAllMenus}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Link>
                  ) : (
                    <Link
                      to={item.path}
                      className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-sky-300 transition-colors duration-200 font-medium py-2 px-1 ${
                        location.pathname === item.path
                          ? "text-primary dark:text-sky-300"
                          : ""
                      }`}
                      onClick={closeAllMenus}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <DarkModeToggle />
              <Link
                to="/contact"
                onClick={closeAllMenus}
                className="bg-primary text-white px-4 py-2 xl:px-6 xl:py-3 rounded-full hover:bg-primary/90 transition-all duration-300 font-medium transform hover:scale-105 shadow-lg hover:shadow-xl text-sm xl:text-base inline-block text-center"
              >
                Get Started
              </Link>
            </div>

            <div className="lg:hidden flex items-center space-x-3">
              <DarkModeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 text-gray-700 dark:text-gray-300"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          <div
            ref={mobileMenuRef}
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-screen opacity-100 border-t border-gray-200 dark:border-gray-700"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasMegaMenu ? (
                    <div>
                      <button
                        onClick={() =>
                          handleMobileSubMenu(item.name.toLowerCase())
                        }
                        className={`w-full flex items-center justify-between text-left py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-sky-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium rounded-lg ${
                          location.pathname === item.path
                            ? "text-primary dark:text-sky-300 bg-primary/5"
                            : ""
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileSubMenuOpen === item.name.toLowerCase()
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          mobileSubMenuOpen === item.name.toLowerCase()
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                      >
                        <div className="pl-4 pr-2 py-2 space-y-1">
                          {(item.name.toLowerCase().includes("what we offer")
                            ? whatWeOfferMegaMenuData
                            : industriesMegaMenuData
                          ).sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="py-2">
                              <div className="flex items-center gap-2 mb-2 px-3">
                                <section.icon className="w-4 h-4 text-primary dark:text-sky-300" />
                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                  {section.title}
                                </h4>
                              </div>
                              <div className="space-y-1">
                                {section.items.map((subItem, itemIndex) => (
                                  <Link
                                    key={itemIndex}
                                    to={subItem.path}
                                    onClick={closeAllMenus}
                                    className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 py-2 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg group text-sm"
                                  >
                                    <subItem.icon className="w-3 h-3 text-gray-400 group-hover:text-primary dark:group-hover:text-accent transition-colors duration-200 flex-shrink-0" />
                                    <span className="line-clamp-1">
                                      {subItem.name}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-sky-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium rounded-lg ${
                        location.pathname === item.path
                          ? "text-primary dark:text-sky-300 bg-primary/5"
                          : ""
                      }`}
                      onClick={closeAllMenus}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-2">
                <Link
                  to="/contact"
                  onClick={closeAllMenus}
                  className="block w-full text-center bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Mega Menu */}
      <div
        ref={megaMenuRef}
        className="relative z-40 hidden lg:block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {activeMenu === "what we offer?" && (
          <MegaMenu
            isOpen={true}
            onClose={() => setActiveMenu(null)}
            {...whatWeOfferMegaMenuData}
          />
        )}
        {activeMenu === "industries" && (
          <MegaMenu
            isOpen={true}
            onClose={() => setActiveMenu(null)}
            {...industriesMegaMenuData}
          />
        )}
      </div>

      {/* Mobile Mega Menu */}
      <div className="lg:hidden">
        {activeMenu === "what we offer?" && (
          <MobileMegaMenu
            isOpen={true}
            onClose={() => setActiveMenu(null)}
            {...whatWeOfferMegaMenuData}
          />
        )}
        {activeMenu === "industries" && (
          <MobileMegaMenu
            isOpen={true}
            onClose={() => setActiveMenu(null)}
            {...industriesMegaMenuData}
          />
        )}
      </div>
    </>
  );
});

Navigation.displayName = "Navigation";

export { Navigation };
