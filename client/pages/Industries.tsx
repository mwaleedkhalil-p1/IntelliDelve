import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import {
  Building,
  Shield,
  Heart,
  Laptop,
  GraduationCap,
  Users,
  Briefcase,
  FileCheck,
  BarChart3,
  Cog,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import industriesData from "../data/industries.json";

const Industries: React.FC = () => {
  const getIconForIndustry = (slug: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      "banking-financial": <Building className="h-8 w-8" />,
      "healthcare-medical": <Heart className="h-8 w-8" />,
      "it-software": <Laptop className="h-8 w-8" />,
      "education-academic": <GraduationCap className="h-8 w-8" />,
      "government-public": <Users className="h-8 w-8" />,
      "corporate-professional": <Briefcase className="h-8 w-8" />,
      insurance: <Shield className="h-8 w-8" />,
      "legal-services": <FileCheck className="h-8 w-8" />,
      "real-estate": <Building className="h-8 w-8" />,
      "accounting-advisory": <BarChart3 className="h-8 w-8" />,
      "startups-tech": <Laptop className="h-8 w-8" />,
      "ecommerce-digital": <Laptop className="h-8 w-8" />,
      telecommunications: <AlertTriangle className="h-8 w-8" />,
      "non-profit": <Users className="h-8 w-8" />,
      "manufacturing-industrial": <Cog className="h-8 w-8" />,
      "retail-consumer": <Building className="h-8 w-8" />,
      "transportation-logistics": <Cog className="h-8 w-8" />,
      "energy-utilities": <AlertTriangle className="h-8 w-8" />,
    };
    return iconMap[slug] || <Building className="h-8 w-8" />;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEO
        title="Industries We Serve - Specialized Background Screening Solutions"
        description="Comprehensive background screening and risk management solutions tailored for 18+ industry verticals including banking, healthcare, technology, and more."
        keywords="industry background screening, sector-specific verification, banking screening, healthcare verification, technology background checks"
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(59,130,246,0.02)_25%,_rgba(59,130,246,0.02)_50%,_transparent_50%,_transparent_75%,_rgba(59,130,246,0.02)_75%)] bg-[length:32px_32px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-500/5"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Industry Expertise
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6 font-primary">
            Industries We Serve
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 font-secondary">
            Specialized background screening and risk management solutions
            tailored for diverse industry verticals
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industriesData.map((industry) => (
              <Link
                key={industry.slug}
                to={`/industries/${industry.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400 mr-4">
                    {getIconForIndustry(industry.slug)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-primary">
                      {industry.title}
                    </h3>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 font-secondary">
                  {industry.hero.subhead}
                </p>

                <div className="space-y-2">
                  {industry.services.slice(0, 3).map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                      <span className="font-secondary">{service}</span>
                    </div>
                  ))}
                  {industry.services.length > 3 && (
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      +{industry.services.length - 3} more services
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 font-primary">
            Don't See Your Industry?
          </h2>
          <p className="text-xl mb-8 font-secondary">
            We provide customized screening solutions for businesses across all
            sectors. Contact us to discuss your specific industry requirements.
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 inline-flex items-center font-primary"
          >
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Industries;
