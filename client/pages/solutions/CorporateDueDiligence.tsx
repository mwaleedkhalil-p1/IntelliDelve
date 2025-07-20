import React from "react";
import { Search } from "lucide-react";
import { SolutionPage } from "../../components/SolutionPage";
import { SEO } from "../../components/SEO";

const CorporateDueDiligence: React.FC = () => {
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
      <SolutionPage solution={solutionData} />
    </>
  );
};

export default CorporateDueDiligence;
