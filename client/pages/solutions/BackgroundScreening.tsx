import React from "react";
import { Shield, Users, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { SolutionPage } from "../../components/SolutionPage";
import { SEO } from "../../components/SEO";
import { useCalendlyContext } from "../../App";

const BackgroundScreening: React.FC = () => {
  const { openCalendly } = useCalendlyContext();

  const solutionData = {
    title: "Background Screening & Risk Mitigation",
    subtitle:
      "Comprehensive employment verification and risk assessment services",
    description: "Advanced screening solutions for secure hiring decisions",
    hero: {
      headline: "Comprehensive Background Screening & Risk Mitigation",
      subtext:
        "Protect your organization with advanced verification services and AI-powered risk assessment for informed hiring decisions.",
    },
    what: {
      title: "What We Offer",
      description:
        "Our background screening services provide comprehensive verification across multiple data points to ensure you make informed hiring decisions while maintaining compliance with regulatory requirements.",
      features: [
        "Employment History Verification with detailed timeline analysis",
        "Criminal Record & Identity Checks across global databases",
        "Education & Credential Validation from accredited institutions",
        "Professional Reference Verification with structured interviews",
        "Global Watchlist and Sanctions Screening",
        "Address Verification and Residency Confirmation",
        "Real-time Status Updates and Reporting Dashboard",
      ],
    },
    why: {
      title: "Why Choose Our Background Screening",
      description:
        "Our screening solutions combine cutting-edge technology with human expertise to deliver the most accurate and comprehensive results in the industry.",
      benefits: [
        {
          name: "Lightning-Fast Processing",
          description: "Fastest turnaround time in the industry with 24-hour average completion"
        },
        {
          name: "Unmatched Accuracy",
          description: "99.8% accuracy rate verified by independent audits and client feedback"
        },
        {
          name: "Global Reach",
          description: "Global coverage across 100+ countries with local compliance expertise"
        },
        {
          name: "AI-Powered Intelligence",
          description: "AI-powered risk scoring and pattern analysis for enhanced decision making"
        },
        {
          name: "Full Compliance",
          description: "FCRA, GDPR, and SOC 2 Type II compliant processes and data handling"
        },
        {
          name: "Dedicated Support",
          description: "24/7 customer support with dedicated account management"
        },
      ],
    },
    how: {
      title: "How Our Process Works",
      description:
        "Our streamlined process ensures efficient screening while maintaining the highest standards of accuracy and compliance.",
      process: [
        "Submit candidate information through our secure portal or API integration",
        "Automated verification begins across multiple databases and sources",
        "Human experts review and validate all findings for accuracy",
        "Comprehensive report delivered with clear risk assessment and recommendations",
      ],
    },
    icon: <Shield className="h-6 w-6" />,
    color: "bg-blue-500/10 text-blue-600",
    bgColor:
      "bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800",
  };

  return (
    <>
      <SEO
        title="Background Screening & Risk Mitigation - IntelliDelve"
        description="Comprehensive employment verification and background screening services with AI-powered risk assessment. Fast, accurate, and compliant solutions for secure hiring."
        keywords="background screening, employment verification, criminal checks, education verification, risk mitigation, hiring security"
      />

      {/* Custom Background Screening Solution Page */}
      <div className={`min-h-screen ${solutionData.bgColor}`}>
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 ${solutionData.color} rounded-2xl mb-8`}>
              {solutionData.icon}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
              {solutionData.hero.headline}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-secondary leading-relaxed">
              {solutionData.hero.subtext}
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openCalendly(`${solutionData.title} - Consultation`)}
                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-colors duration-300 font-primary inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                Schedule Consultation
                <ArrowRight className="h-5 w-5" />
              </button>

              <Link
                to="/what-we-offer#background-screening-and-risk-mitigation"
                className="bg-transparent border-2 border-primary text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 font-primary inline-flex items-center justify-center gap-2"
                onClick={() => {
                  // Scroll to the section after navigation
                  setTimeout(() => {
                    const element = document.getElementById('background-screening-and-risk-mitigation');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
              >
                <Search className="h-5 w-5" />
                Explore All Checks
              </Link>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
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

        {/* Why Choose Us Section */}
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
                    {benefit.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 font-secondary">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
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

        {/* Custom CTA Section with Two Buttons */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6 font-primary">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 font-secondary">
              Schedule a consultation to learn how our background screening & risk mitigation solutions can benefit your organization.
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
                to="/what-we-offer#background-screening-and-risk-mitigation"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300 font-primary inline-flex items-center justify-center gap-2"
                onClick={() => {
                  // Scroll to the section after navigation
                  setTimeout(() => {
                    const element = document.getElementById('background-screening-and-risk-mitigation');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
              >
                <Search className="h-5 w-5" />
                Explore All Checks
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BackgroundScreening;
