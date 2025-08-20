import React, { memo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Globe,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  TrendingUp,
  FileCheck,
  Search,
  Clock,
  Lock,
  BarChart3,
  AlertTriangle,
  Building,
  CreditCard,
} from "lucide-react";
import { useCalendlyContext } from "../App";
import { SEO } from "../components/SEO";

const CitizenByInvestment = memo(() => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { openCalendly } = useCalendlyContext();

  const cbiServices = [
    {
      icon: Search,
      title: "Due Diligence Screening",
      description:
        "Comprehensive background checks for CBI applicants including criminal, financial, and reputational screening",
      features: [
        "Criminal record verification",
        "Financial history analysis",
        "Source of funds verification",
        "Sanctions screening",
      ],
    },
    {
      icon: FileCheck,
      title: "Document Verification",
      description:
        "Authentication and verification of all supporting documents required for CBI applications",
      features: [
        "Educational credentials",
        "Professional certifications",
        "Financial statements",
        "Identity documents",
      ],
    },
    {
      icon: Globe,
      title: "Compliance Monitoring",
      description:
        "Ongoing monitoring to ensure continued compliance with CBI program requirements",
      features: [
        "Regulatory updates",
        "Status monitoring",
        "Renewal assistance",
        "Compliance reporting",
      ],
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description:
        "Comprehensive risk evaluation for CBI programs and individual applications",
      features: [
        "Political exposure screening",
        "Adverse media monitoring",
        "Risk scoring",
        "Mitigation strategies",
      ],
    },
  ];

  const cbiPrograms = [
    {
      country: "Premium Citizenship Program",
      description:
        "Expert support for fast, compliant citizenship applications.",
      investment: "$100,000",
      timeframe: "3-4 months",
    },
    {
      country: "Family Citizenship Program",
      description:
        "Solutions designed to secure global mobility for you and your family.",
      investment: "$100,000+",
      timeframe: "3-4 months",
    },
    {
      country: " Investment Citizenship Program",
      description:
        "Tailored investment options with thorough due diligence and guidance.",
      investment: "$150,000+",
      timeframe: "4-6 months",
    },
    {
      country: "Fast-Track Citizenship Program",
      description:
        "Efficient processes to help you achieve citizenship smoothly.",
      investment: "$150,000+",
      timeframe: "4-6 months",
    },
    {
      country: "Global Opportunity Program",
      description:
        "Access worldwide benefits and residency solutions through trusted programs.",
      investment: "$100,000+",
      timeframe: "3-4 months",
    },
    {
      country: "Comprehensive Support Program",
      description:
        "Access worldwide benefits and residency solutions through trusted programs.",
      investment: "$130,000+",
      timeframe: "1-2 months",
    },
  ];

  const benefits = [
    "Enhanced global mobility with visa-free travel",
    "Tax optimization and financial planning opportunities",
    "Business expansion and investment diversification",
    "Educational opportunities for family members",
    "Political and economic stability",
    "Legacy planning and generational wealth transfer",
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEO
        title="Citizen by Investment (CBI) Due Diligence - IntelliDelve"
        description="Comprehensive due diligence and compliance services for Citizen by Investment programs. Expert screening, document verification, and risk assessment for CBI applications."
        keywords="citizen by investment, CBI due diligence, investment citizenship, passport programs, compliance screening, document verification"
      />

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85"
            alt="Citizen by Investment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/80 to-purple-900/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
                <CreditCard className="w-4 h-4 mr-2" />
                CBI Due Diligence
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Citizen by Investment
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Due Diligence
                </span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Comprehensive due diligence and compliance services for Citizen
                by Investment programs, ensuring secure and compliant pathways
                to global citizenship.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">15+</div>
                  <p className="text-sm text-gray-300">CBI Programs</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">98%</div>
                  <p className="text-sm text-gray-300">Success Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <p className="text-sm text-gray-300">Support</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    openCalendly("CBI Due Diligence - Schedule Consultation")
                  }
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-white transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <Globe className="w-16 h-16 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Global Citizenship Solutions
                  </h3>
                  <p className="text-gray-200">
                    Expert guidance for investment citizenship programs
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm">
                      Certified Experts
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm">
                      Secure Process
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm">
                      Fast Processing
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm">
                      High Success
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Our CBI Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Comprehensive CBI Due Diligence
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              End-to-end due diligence services for Citizen by Investment
              programs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {cbiServices.map((service, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Popular Programs
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              CBI Programs We Support
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We provide due diligence services for leading Citizen by
              Investment programs worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cbiPrograms.map((program, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-center">
                  <Building className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {program.country}
                  </h3>
                  <h6 className="text-xs font-normal text-gray-900 dark:text-white mb-2">
                    {program.description}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4 mr-2" />
                Benefits
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose CBI?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Citizen by Investment programs offer numerous advantages for
                individuals and families seeking global mobility and
                opportunities.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Global Citizenship Benefits"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Explore CBI Options?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Let our experts guide you through the Citizen by Investment process
            with comprehensive due diligence and compliance support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                openCalendly("CBI Due Diligence - Ready to Explore")
              }
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Schedule Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Contact Our Experts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});

CitizenByInvestment.displayName = "CitizenByInvestment";

export default CitizenByInvestment;
