import React from "react";
import { Shield } from "lucide-react";
import { SolutionPage } from "../../components/SolutionPage";
import { SEO } from "../../components/SEO";

const BackgroundScreening: React.FC = () => {
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
      <SolutionPage solution={solutionData} />
    </>
  );
};

export default BackgroundScreening;
