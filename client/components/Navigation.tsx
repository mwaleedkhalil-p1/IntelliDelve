import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { DarkModeToggle } from "./DarkModeToggle";
import { MegaMenu } from "./MegaMenu";
import { MobileMegaMenu } from "./MobileMegaMenu";

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
  Globe,
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
          name: "Background Screening Process",
          path: "/background-screening",
          icon: Shield,
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
          name: "Employment History Verification",
          path: "/employment-verification",
          icon: Briefcase,
        },
        {
          name: "Global Watchlist and Sanctions Screening",
          path: "/watchlist-screening",
          icon: Search,
        },
        {
          name: "Physical and Digital Address Verification",
          path: "/address-verification",
          icon: Building2,
        },
        {
          name: "Reference and Credential Validation",
          path: "/reference-validation",
          icon: FileCheck,
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
        {
          name: "Citizen by Investment (CBI)",
          path: "/citizen-by-investment",
          icon: Globe,
        },
      ],
    },
    {
      title: "AI & Data Science Solutions",
      icon: Brain,
      items: [
        {
          name: "AI-Powered Resume Ranking & Candidate Scoring",
          path: "/resume-ranking",
          icon: UserCheck,
        },
        {
          name: "Computer Vision Systems",
          path: "/computer-vision",
          icon: Cpu,
        },
        {
          name: "Document Intelligence & OCR",
          path: "/document-intelligence",
          icon: FileCheck,
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
          name: "Predictive Analytics & Forecasting",
          path: "/predictive-analytics",
          icon: LineChart,
        },
        {
          name: "Recommendation Engines",
          path: "/recommendation-engines",
          icon: Cog,
        },
        {
          name: "Retrieval-Augmented Generation (RAG)",
          path: "/rag",
          icon: Brain,
        },
        {
          name: "Sentiment & Intent Analysis",
          path: "/sentiment-analysis",
          icon: Brain,
        },
      ],
    },
    {
      title: "Tech & Innovation Services",
      icon: Code,
      items: [
        {
          name: "Cloud Infrastructure & DevOps",
          path: "/cloud-infrastructure",
          icon: Cpu,
        },
        {
          name: "Custom Software Development",
          path: "/custom-software",
          icon: Code,
        },
        {
          name: "Data Migration & Analytics Platform",
          path: "/data-migration",
          icon: Database,
        },
        {
          name: "System Integration & API Development",
          path: "/system-integration",
          icon: Cog,
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
          name: "Accounting & Financial Advisory",
          path: "/industries/accounting-advisory",
          icon: LineChart,
        },
        {
          name: "Banking & Financial Services",
          path: "/industries/banking-financial",
          icon: Building2,
        },
        {
          name: "Corporate & Professional Sector",
          path: "/industries/corporate-professional",
          icon: Briefcase,
        },
        {
          name: "Insurance Companies",
          path: "/industries/insurance",
          icon: Shield,
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
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(null);
  const navigate = useNavigate();

  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const closeAllMenus = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();

      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');

      // Close menus first
      setActiveMenu(null);
      setIsMobileMenuOpen(false);
      setMobileSubMenuOpen(null);

      // Navigate and scroll to top
      if (href) {
        // Use timeout to ensure menus are closed before navigation
        setTimeout(() => {
          navigate(href);
          // Scroll to top after navigation
          requestAnimationFrame(() => {
            window.scrollTo({
              top: 0,
              behavior: 'instant'
            });
          });
        }, 0);
      }
    } else {
      setActiveMenu(null);
      setIsMobileMenuOpen(false);
      setMobileSubMenuOpen(null);
    }
  }, [navigate]);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleMenuItemHover = useCallback((menuName: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (window.innerWidth >= 1024) {
      clearCloseTimeout();
      setActiveMenu(menuName);
    }
  }, [clearCloseTimeout]);

  const handleMobileSubMenu = useCallback(
    (menuType: string) => {
      setMobileSubMenuOpen(mobileSubMenuOpen === menuType ? null : menuType);
    },
    [mobileSubMenuOpen],
  );

  const handleMouseLeave = useCallback((event: React.MouseEvent) => {
    clearCloseTimeout();

    const relatedTarget = event.relatedTarget as Element;
    const currentTarget = event.currentTarget as Element;

    if (relatedTarget) {
      // Check if moving to a child element or mega menu area
      if (
        currentTarget.contains(relatedTarget) ||
        relatedTarget.closest('[data-mega-menu-area]') ||
        relatedTarget.closest('[data-mega-menu-content]') ||
        (megaMenuRef.current && megaMenuRef.current.contains(relatedTarget)) ||
        (navRef.current && navRef.current.contains(relatedTarget))
      ) {
        return;
      }
    }

    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, [clearCloseTimeout]);

  const handleMouseEnter = useCallback(() => {
    clearCloseTimeout();
  }, [clearCloseTimeout]);

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

  // Global mouse tracking for menu closing
  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (!activeMenu) return;

      const nav = navRef.current;
      const megaMenu = megaMenuRef.current;

      if (!nav) return;

      const navRect = nav.getBoundingClientRect();
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const buffer = 50; // Increased buffer for better UX

      // Since nav is fixed positioned, we can use getBoundingClientRect directly
      const isInsideNav = (
        mouseX >= navRect.left - buffer &&
        mouseX <= navRect.right + buffer &&
        mouseY >= navRect.top - buffer &&
        mouseY <= navRect.bottom + buffer
      );

      let isInsideMegaMenu = false;
      if (megaMenu) {
        const megaMenuContent = megaMenu.querySelector('[data-mega-menu-content]');
        if (megaMenuContent) {
          const contentRect = megaMenuContent.getBoundingClientRect();
          isInsideMegaMenu = (
            mouseX >= contentRect.left - buffer &&
            mouseX <= contentRect.right + buffer &&
            mouseY >= contentRect.top - buffer &&
            mouseY <= contentRect.bottom + buffer
          );
        }
      }

      // Also check if mouse is in the gap between nav and mega menu
      const isInGapArea = megaMenu && (
        mouseX >= navRect.left - buffer &&
        mouseX <= navRect.right + buffer &&
        mouseY >= navRect.bottom &&
        mouseY <= navRect.bottom + 100 // Allow for gap between nav and mega menu
      );

      if (!isInsideNav && !isInsideMegaMenu && !isInGapArea) {
        clearCloseTimeout();
        closeTimeoutRef.current = setTimeout(() => {
          setActiveMenu(null);
        }, 150); // Reduced timeout for better responsiveness
      } else {
        clearCloseTimeout();
      }
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener("mousedown", handleClickOutside);
      clearCloseTimeout();
    };
  }, [handleClickOutside, activeMenu, clearCloseTimeout]);

  // GSAP animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      );
    }
  }, []);

  // Handle window resize
  // Prevent scroll when menus are open
  useEffect(() => {
    const shouldPreventScroll = activeMenu || isMobileMenuOpen;

    if (shouldPreventScroll) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [activeMenu, isMobileMenuOpen]);

  // Ensure body styles are reset on component mount
  useEffect(() => {
    // Reset body styles on initial mount to prevent stuck states
    document.body.style.overflow = '';
    document.body.style.height = '';
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

  // Handle window resize
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
    style={{
      overscrollBehavior: 'contain',
      touchAction: 'pan-x pan-y',
      willChange: 'transform'
    }}
  >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">

            <Link
              to="/"
              className="flex items-center flex-shrink-0 ml-2 sm:-ml-14 md:-ml-12 lg:-ml-10"
              onClick={closeAllMenus}
            >
              <div className="relative">
                <img
                  src="/Main logo TM.png"
                  alt="IntelliDelve"
                  className="h-12 sm:h-13 md:h-14 w-auto dark:hidden"
                />
                <img
                  src="/logo.png"
                  alt="IntelliDelve"
                  className="h-12 sm:h-13 md:h-14 w-auto hidden dark:block"
                />
              </div>
            </Link>

            <div
              className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8"
              data-mega-menu-area
              onMouseLeave={handleMouseLeave}
            >
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasMegaMenu ? (
                    <div
                      className="flex items-center"
                      onMouseEnter={(e) => handleMenuItemHover(item.name.toLowerCase(), e)}
                    >

                      <Link
                        to={item.path}
                        className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-sky-300 transition-colors duration-200 font-medium py-2 px-1 whitespace-nowrap ${
                          location.pathname === item.path
                            ? "text-primary dark:text-sky-300"
                            : ""
                        }`}
                        onClick={closeAllMenus}
                      >
                        {item.name}
                      </Link>

                      <button
                        className={`ml-1 p-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-sky-300 transition-all duration-200 ${
                          activeMenu === item.name.toLowerCase() ? 'text-primary dark:text-sky-300' : ''
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveMenu(activeMenu === item.name.toLowerCase() ? null : item.name.toLowerCase());
                        }}
                        aria-label={`Toggle ${item.name} menu`}
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                          activeMenu === item.name.toLowerCase() ? 'rotate-180' : ''
                        }`} />
                      </button>
                    </div>
                  ) : (
                    <div
                      onMouseEnter={() => {
                        if (activeMenu) {
                          clearCloseTimeout();
                          setActiveMenu(null);
                        }
                      }}
                    >
                      <Link
                        to={item.path}
                        className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-sky-300 transition-colors duration-200 font-medium py-2 px-1 whitespace-nowrap ${
                          location.pathname === item.path
                            ? "text-primary dark:text-sky-300"
                            : ""
                        }`}
                        onClick={closeAllMenus}
                      >
                        {item.name}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              <DarkModeToggle />
              <Link
                to="/contact"
                onClick={closeAllMenus}
                className="bg-primary text-white px-3 py-1.5 rounded-full hover:bg-primary/90 transition-all duration-300 font-medium transform hover:scale-105 shadow-lg hover:shadow-xl text-sm inline-block text-center whitespace-nowrap"
              >
                Get Started
              </Link>
            </div>

            <div className="lg:hidden flex items-center space-x-3">
              <DarkModeToggle />
              <button
                onClick={() => {
                  const scrollX = window.scrollX;
                  const scrollY = window.scrollY;
                  setIsMobileMenuOpen(prev => {
                    const newState = !prev;
                    if (!newState) {
                      // When closing mobile menu, restore scroll position
                      requestAnimationFrame(() => {
                        window.scrollTo(scrollX, scrollY);
                      });
                    }
                    return newState;
                  });
                }}
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
                      <div className="flex items-center rounded-lg overflow-hidden">
                        <Link
                          to={item.path}
                          onClick={closeAllMenus}
                          className={`flex-1 py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-sky-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium ${
                            location.pathname === item.path
                              ? "text-primary dark:text-sky-300 bg-primary/5"
                              : ""
                          }`}
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => handleMobileSubMenu(item.name.toLowerCase())}
                          className="py-3 px-3 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-sky-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                          aria-label={`Toggle ${item.name} submenu`}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              mobileSubMenuOpen === item.name.toLowerCase()
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                      </div>

                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          mobileSubMenuOpen === item.name.toLowerCase()
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                      >
                        <div className="pl-4 pr-2 py-2 space-y-1 max-h-96 overflow-y-auto scrollbar-thin">
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
                  className="block w-full text-center bg-primary text-white py-2 px-3 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg text-sm"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {(activeMenu === "what we offer?" || activeMenu === "industries") && (
        <div
          ref={megaMenuRef}
          className="fixed top-16 left-0 right-0 z-40"
          data-mega-menu-area
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
      )}

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
export default Navigation;
