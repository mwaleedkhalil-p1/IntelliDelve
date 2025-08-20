import React from "react";
import {
  Shield,
  CheckCircle,
  Users,
  BarChart3,
  ArrowRight,
  Star,
  Award,
  TrendingUp,
  Building,
  Heart,
  Laptop,
  GraduationCap,
  Briefcase,
  FileCheck,
  Cog,
  AlertTriangle,
  Building2,
  Stethoscope,
  ShoppingCart,
  Utensils,
  Rocket,
  Calculator,
  Factory,
  Zap,
  Home,
} from "lucide-react";
import { useCalendlyContext } from "../App";
import { Link } from "react-router-dom";

interface IndustryData {
  slug: string;
  title: string;
  hero: {
    headline: string;
    subhead: string;
  };
  overview: string;
  services: string[];
  compliance: string;
  story: {
    stat: string;
    text: string;
  };
  cta: string;
}

interface IndustryPageProps {
  industry: IndustryData;
}

const getIndustryAssets = (slug: string) => {
  const assets: {
    [key: string]: {
      image: string;
      color: string;
      icon: any;
      gradient: string;
    };
  } = {
    "banking-financial": {
      image: "/images/downloaded/unsplash-photo-1554224155-6726b3ff858f.jpg",
      color: "blue",
      icon: Building2,
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
    },
    "financial-institution": {
      image: "/images/downloaded/unsplash-photo-1541354329998-f4d9a9f9297f.jpg",
      color: "blue",
      icon: Building2,
      gradient: "from-blue-600 via-sky-600 to-cyan-600",
    },
    "accounting-advisory": {
      image: "/images/downloaded/unsplash-photo-1554224154-26032ffc0d07.jpg",
      color: "green",
      icon: Calculator,
      gradient: "from-green-600 via-emerald-600 to-teal-600",
    },
    insurance: {
      image: "/images/downloaded/unsplash-photo-1450101499163-c8848c66ca85.jpg",
      color: "indigo",
      icon: Shield,
      gradient: "from-indigo-600 via-blue-600 to-purple-600",
    },

    "healthcare-medical": {
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=85",
      color: "green",
      icon: Stethoscope,
      gradient: "from-green-600 via-emerald-600 to-teal-600",
    },

    "it-software": {
      image: "/images/downloaded/unsplash-photo-1517077304055-6e89abbf09b0.jpg",
      color: "purple",
      icon: Laptop,
      gradient: "from-purple-600 via-violet-600 to-indigo-600",
    },
    "startups-tech": {
      image: "/images/downloaded/unsplash-photo-1559136555-9303baea8ebd.jpg",
      color: "purple",
      icon: Rocket,
      gradient: "from-purple-600 via-pink-600 to-red-600",
    },
    telecommunications: {
      image: "/images/downloaded/unsplash-photo-1558618666-fcd25c85cd64.jpg",
      color: "cyan",
      icon: Zap,
      gradient: "from-cyan-600 via-blue-600 to-indigo-600",
    },

    "education-academic": {
      image: "/images/downloaded/unsplash-photo-1541339907198-e08756dedf3f.jpg",
      color: "orange",
      icon: GraduationCap,
      gradient: "from-orange-600 via-amber-600 to-yellow-600",
    },
    "academic-education": {
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85",
      color: "orange",
      icon: GraduationCap,
      gradient: "from-orange-600 via-red-600 to-pink-600",
    },

    "government-public": {
      image: "/images/downloaded/unsplash-photo-1486406146926-c627a92ad1ab.jpg",
      color: "slate",
      icon: Building,
      gradient: "from-slate-600 via-gray-600 to-zinc-600",
    },

    "corporate-professional": {
      image: "/images/downloaded/unsplash-photo-1497366216548-37526070297c.jpg",
      color: "blue",
      icon: Briefcase,
      gradient: "from-blue-600 via-sky-600 to-cyan-600",
    },

    "legal-services": {
      image: "/images/downloaded/unsplash-photo-1589829545856-d10d557cf95f.jpg",
      color: "red",
      icon: FileCheck,
      gradient: "from-red-600 via-rose-600 to-pink-600",
    },

    "manufacturing-industrial": {
      image: "/images/downloaded/unsplash-photo-1581091226825-a6a2a5aee158.jpg",
      color: "gray",
      icon: Factory,
      gradient: "from-gray-600 via-slate-600 to-zinc-600",
    },
    "industrial-manufacturing": {
      image: "/images/downloaded/unsplash-photo-1565793298595-6a879b1d9492.jpg",
      color: "gray",
      icon: Cog,
      gradient: "from-gray-700 via-slate-700 to-zinc-700",
    },

    "energy-utilities": {
      image: "/images/downloaded/unsplash-photo-1473341304170-971dccb5ac1e.jpg",
      color: "yellow",
      icon: Zap,
      gradient: "from-yellow-600 via-orange-600 to-red-600",
    },

    "retail-consumer": {
      image: "/images/downloaded/unsplash-photo-1441986300917-64674bd600d8.jpg",
      color: "pink",
      icon: ShoppingCart,
      gradient: "from-pink-600 via-rose-600 to-red-600",
    },
    "ecommerce-digital": {
      image: "/images/downloaded/unsplash-photo-1556742049-0cfed4f6a45d.jpg",
      color: "purple",
      icon: ShoppingCart,
      gradient: "from-purple-600 via-violet-600 to-pink-600",
    },

    "real-estate": {
      image: "/images/downloaded/unsplash-photo-1560518883-ce09059eeffa.jpg",
      color: "emerald",
      icon: Home,
      gradient: "from-emerald-600 via-green-600 to-teal-600",
    },

    "transportation-logistics": {
      image: "/images/downloaded/unsplash-photo-1586528116311-ad8dd3c8310d.jpg",
      color: "amber",
      icon: Award,
      gradient: "from-amber-600 via-orange-600 to-red-600",
    },

    "hospitality-food-leisure": {
      image: "/images/downloaded/unsplash-photo-1414235077428-338989a2e8c0.jpg",
      color: "orange",
      icon: Utensils,
      gradient: "from-orange-600 via-red-600 to-pink-600",
    },

    "gig-workers": {
      image: "/images/downloaded/unsplash-photo-1521737604893-d14cc237f11d.jpg",
      color: "teal",
      icon: Users,
      gradient: "from-teal-600 via-cyan-600 to-blue-600",
    },

    "non-profit": {
      image: "/images/downloaded/unsplash-photo-1559027615-cd4628902d4a.jpg",
      color: "green",
      icon: Heart,
      gradient: "from-green-600 via-teal-600 to-cyan-600",
    },
  };

  return (
    assets[slug] || {
      image: "/images/downloaded/unsplash-photo-1497366216548-37526070297c.jpg",
      color: "blue",
      icon: Building,
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
    }
  );
};

export const IndustryPage: React.FC<IndustryPageProps> = ({ industry }) => {
  const { openCalendly } = useCalendlyContext();
  const assets = getIndustryAssets(industry.slug);
  const IconComponent = assets.icon;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={assets.image}
            alt={industry.title}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${assets.gradient} opacity-50`}
          ></div>
        </div>

        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.02)_25%,_rgba(255,255,255,0.02)_50%,_transparent_50%,_transparent_75%,_rgba(255,255,255,0.02)_75%)] bg-[length:32px_32px]"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
                <IconComponent className="w-4 h-4 mr-2" />
                Industry-Specific Solutions
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 font-primary">
                {industry.hero.headline}
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed font-secondary">
                {industry.hero.subhead}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => openCalendly(industry.cta)}
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <IconComponent className="w-16 h-16 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Trusted by Industry Leaders
                  </h3>
                  <p className="text-gray-200">
                    Specialized solutions for {industry.title.toLowerCase()}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 rounded-xl p-4">
                    <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-white font-bold">4.9/5</div>
                    <div className="text-xs text-gray-300">Rating</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <Award className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-white font-bold">50+</div>
                    <div className="text-xs text-gray-300">Clients</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-white font-bold">99%</div>
                    <div className="text-xs text-gray-300">Success</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full bg-${assets.color}-100 dark:bg-${assets.color}-900/30 text-${assets.color}-600 dark:text-${assets.color}-400 text-sm font-medium mb-6`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                Industry Overview
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
                Understanding Your
                <span
                  className={`block text-transparent bg-clip-text bg-gradient-to-r ${assets.gradient}`}
                >
                  Industry Needs
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-secondary mb-8">
                {industry.overview}
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold text-${assets.color}-600 dark:text-${assets.color}-400 mb-2`}
                  >
                    24/7
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Support Available
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold text-${assets.color}-600 dark:text-${assets.color}-400 mb-2`}
                  >
                    48hr
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Turnaround Time
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className={`absolute -inset-4 bg-gradient-to-r ${assets.gradient} opacity-20 rounded-3xl blur-xl`}
              ></div>
              <img
                src={assets.image}
                alt={`${industry.title} Industry`}
                className="relative w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className={`py-20 bg-gradient-to-br from-${assets.color}-50 via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full bg-${assets.color}-100 dark:bg-${assets.color}-900/30 text-${assets.color}-600 dark:text-${assets.color}-400 text-sm font-medium mb-6`}
            >
              <Shield className="w-4 h-4 mr-2" />
              Our Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
              Specialized Screening Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-secondary">
              Comprehensive verification solutions tailored specifically for{" "}
              {industry.title.toLowerCase()}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industry.services.map((service, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
              >
                <div className="flex items-start mb-4">
                  <div
                    className={`p-3 bg-${assets.color}-100 dark:bg-${assets.color}-900/30 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <CheckCircle
                      className={`h-6 w-6 text-${assets.color}-600 dark:text-${assets.color}-400`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-primary mb-2">
                      {service}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Industry-compliant verification process
                    </p>
                  </div>
                </div>
                <div
                  className={`w-full h-1 bg-gradient-to-r ${assets.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-${assets.color}-100 dark:bg-${assets.color}-900/30 rounded-full mb-6`}
                  >
                    <Shield
                      className={`h-8 w-8 text-${assets.color}-600 dark:text-${assets.color}-400`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-primary">
                    Industry Compliance
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        100%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Compliant
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        24/7
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Monitoring
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full bg-${assets.color}-100 dark:bg-${assets.color}-900/30 text-${assets.color}-600 dark:text-${assets.color}-400 text-sm font-medium mb-6`}
              >
                <Shield className="w-4 h-4 mr-2" />
                Compliance & Security
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
                Meeting Industry
                <span
                  className={`block text-transparent bg-clip-text bg-gradient-to-r ${assets.gradient}`}
                >
                  Standards
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-secondary mb-8">
                {industry.compliance}
              </p>

              <div className="space-y-4">
                {[
                  "Regulatory compliance monitoring",
                  "Industry-specific protocols",
                  "Automated compliance reporting",
                  "Real-time security updates",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`py-20 bg-gradient-to-br from-${assets.color}-50 via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full bg-${assets.color}-100 dark:bg-${assets.color}-900/30 text-${assets.color}-600 dark:text-${assets.color}-400 text-sm font-medium mb-6`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
              Real Results for Real Businesses
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how we've helped organizations in{" "}
              {industry.title.toLowerCase()} achieve their goals
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${assets.gradient} rounded-full mb-4`}
                >
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <div
                  className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${assets.gradient} mb-2 font-primary`}
                >
                  {industry.story.stat}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-secondary">
                  Improvement Achieved
                </p>
              </div>

              <div className="lg:col-span-2">
                <blockquote className="text-xl text-gray-700 dark:text-gray-300 italic font-secondary mb-6">
                  "{industry.story.text}"
                </blockquote>
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Industry Leader
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {industry.title}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`py-20 bg-gradient-to-r ${assets.gradient} relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
                <Users className="w-4 h-4 mr-2" />
                Get Started Today
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-primary">
                Ready to Transform Your
                <span className="block text-white/90">
                  {industry.title} Operations?
                </span>
              </h2>
              <p className="text-xl text-gray-100 mb-8 leading-relaxed font-secondary">
                Let us help you implement comprehensive screening solutions
                tailored specifically for your {industry.title.toLowerCase()}{" "}
                organization.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => openCalendly(industry.cta)}
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 text-xs font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {industry.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white text-xs font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Contact Our Experts
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <IconComponent className="w-16 h-16 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Why Choose Us?
                  </h3>
                </div>

                <div className="space-y-4">
                  {[
                    "Industry-specific expertise",
                    "Compliance-ready solutions",
                    "24/7 dedicated support",
                    "Proven track record",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center text-white">
                      <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustryPage;
