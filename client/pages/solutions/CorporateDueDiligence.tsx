import React from "react";
import { Search, Users, ArrowRight, FileSearch, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SolutionPage } from "../../components/SolutionPage";
import { SEO } from "../../components/SEO";
import { useCalendlyContext } from "../../App";
import ScrollToTopButton from "../../components/ScrollToTopButton";

const CorporateDueDiligence: React.FC = () => {
  const { openCalendly } = useCalendlyContext();

  const solutionData = {
    title: "Corporate Due Diligence & Risk Compliance",
    subtitle:
      "Comprehensive business intelligence and regulatory compliance solutions",
    description:
      "Advanced due diligence services for informed business decisions",
    hero: {
      headline: "Corporate Due Diligence & Risk Compliance",
      subtext:
        "Make informed business decisions with comprehensive due diligence investigations and regulatory compliance assessments for partnerships, acquisitions, and investments.",
    },
    what: {
      title: "What We Offer",
      description:
        "Our corporate due diligence services provide in-depth analysis of businesses, executives, and transactions to help you make informed decisions while ensuring regulatory compliance.",
      features: [
        "Comprehensive business background investigations and financial analysis",
        "Executive leadership screening and reputation analysis",
        "Regulatory compliance verification across multiple jurisdictions",
        "Anti-Money Laundering (AML) and Know Your Customer (KYC) screening",
        "Citizen by Investment (CBI) due diligence and compliance verification",
        "Sanctions and watchlist screening with real-time monitoring",
        "Corporate structure analysis and beneficial ownership identification",
        "Litigation history and legal risk assessment",
        "Financial health evaluation and credit risk analysis",
      ],
    },
    why: {
      title: "Why Choose Our Due Diligence Services",
      description:
        "Our experienced investigators and analysts combine traditional research methods with advanced technology to deliver comprehensive and reliable due diligence reports.",
      benefits: [
        "Reduce investment risks and avoid costly business partnerships with problematic entities",
        "Ensure regulatory compliance across global markets and jurisdictions",
        "Access to exclusive databases and international public records",
        "Expert analysis from certified fraud examiners and forensic accountants",
        "Customizable reports tailored to your specific industry and requirements",
        "24/7 ongoing monitoring for changes in risk profiles and compliance status",
      ],
    },
    how: {
      title: "Our Due Diligence Process",
      description:
        "Our systematic approach ensures thorough investigation while maintaining strict confidentiality and adherence to legal requirements.",
      process: [
        "Initial consultation to understand your specific requirements and risk tolerance",
        "Comprehensive data collection from multiple sources including public records and proprietary databases",
        "Expert analysis and verification of findings by our team of investigators and compliance specialists",
        "Detailed reporting with clear risk assessment, recommendations, and ongoing monitoring options",
      ],
    },
    icon: <Search className="h-6 w-6" />,
    color: "bg-purple-500/10 text-purple-600",
    bgColor:
      "bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800",
  };

  return (
    <>
      <SEO
        title="Corporate Due Diligence & Risk Compliance - IntelliDelve"
        description="Comprehensive business intelligence and due diligence services for partnerships, acquisitions, and investments. Expert AML, KYC, and regulatory compliance solutions."
        keywords="corporate due diligence, business intelligence, AML compliance, KYC screening, CBI due diligence, citizen by investment, regulatory compliance, risk assessment, executive screening"
      />

      <div className="min-h-screen">

        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")'
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-indigo-900/80"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <Search className="h-10 w-10 text-white" />
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Corporate Due Diligence
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Corporate Due Diligence
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                & Risk Compliance
              </span>
            </h1>

            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Make informed business decisions with comprehensive due diligence investigations and regulatory compliance assessments for partnerships, acquisitions, and investments.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <p className="text-sm text-gray-300">Companies Screened</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">99%</div>
                <p className="text-sm text-gray-300">Accuracy Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <p className="text-sm text-gray-300">Monitoring</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openCalendly(`${solutionData.title} - Consultation`)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <Link
                to="/what-we-offer#corporate-due-diligence-and-risk-compliance"
                className="inline-flex items-center px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-white transition-all duration-300"
                onClick={() => {
                  setTimeout(() => {
                    const element = document.getElementById('corporate-due-diligence-and-risk-compliance');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
              >
                <FileSearch className="mr-2 h-5 w-5" />
                Explore Solutions
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
                {solutionData.what.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-secondary">
                {solutionData.what.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutionData.what.features.map((feature, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <div className="flex items-center mb-3">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{feature}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
                {solutionData.why.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-secondary">
                {solutionData.why.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutionData.why.benefits.map((benefit, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-primary">
                    {benefit}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
                {solutionData.how.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-secondary">
                {solutionData.how.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {solutionData.how.process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {index + 1}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-secondary">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6 font-primary">
              Ready for Due Diligence?
            </h2>
            <p className="text-xl mb-8 font-secondary">
              Schedule a consultation to learn how our corporate due diligence services can protect your investments and partnerships.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openCalendly(`${solutionData.title} - Consultation`)}
                className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 font-primary inline-flex items-center justify-center gap-2"
              >
                Schedule Consultation
                <ArrowRight className="h-5 w-5" />
              </button>

              <Link
                to="/what-we-offer#corporate-due-diligence-and-risk-compliance"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300 font-primary inline-flex items-center justify-center gap-2"
                onClick={() => {

                  setTimeout(() => {
                    const element = document.getElementById('corporate-due-diligence-and-risk-compliance');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
              >
                <FileSearch className="h-5 w-5" />
                Explore Solutions
              </Link>
            </div>
          </div>
        </section>
      </div>

      <ScrollToTopButton />
    </>
  );
};

export default CorporateDueDiligence;
