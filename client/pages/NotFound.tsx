import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  ArrowLeft,
  Shield,
  Brain,
  Code,
  BarChart3,
  AlertTriangle
} from "lucide-react";
import { SEO } from "../components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {

  }, [location.pathname]);

  const quickLinks = [
    { name: "Background Screening", path: "/solutions/background-screening", icon: Shield },
    { name: "AI & Data Science", path: "/solutions/ai-data-science", icon: Brain },
    { name: "Tech Innovation", path: "/solutions/tech-innovation", icon: Code },
    { name: "Case Studies", path: "/case-studies", icon: BarChart3 },
  ];

  return (
    <>
      <SEO
        title="Page Not Found - IntelliDelve"
        description="The page you're looking for doesn't exist. Explore our background screening and AI solutions instead."
        keywords="404, page not found, background screening, AI solutions"
        canonicalUrl="/404"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-4xl mx-auto text-center">

          <div className="mb-8">
            <div className="relative">
              <div className="text-8xl md:text-9xl font-bold text-gray-200 dark:text-gray-700 select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <AlertTriangle className="h-16 w-16 md:h-20 md:w-20 text-primary animate-pulse" />
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Requested URL: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">{location.pathname}</code>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Explore Our Solutions
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={index}
                    to={link.path}
                    className="group p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg"
                  >
                    <IconComponent className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-primary transition-colors duration-300">
                      {link.name}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Can't find what you're looking for?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-300"
            >
              <Search className="mr-2 h-4 w-4" />
              Contact our support team
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
