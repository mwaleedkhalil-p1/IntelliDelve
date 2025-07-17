import React from "react";
import { AlertCircle } from "lucide-react";
import { ServicePage } from "../components/ServicePage";

const CriminalCheck: React.FC = () => {
  const serviceData = {
    title: "Criminal Record & Identity Checks",
    subtitle: "Comprehensive criminal background screening",
    description:
      "Thorough criminal background checks and identity verification to ensure safe and compliant hiring decisions.",
    hero: {
      headline: "Criminal Record & Identity Checks",
      subtext:
        "Protect your organization with comprehensive criminal background checks and identity verification across multiple jurisdictions.",
    },
    features: [
      "Multi-jurisdictional criminal record searches",
      "Federal, state, and county court record checks",
      "International criminal background verification",
      "Identity verification and document authentication",
      "Sex offender registry searches",
      "Terrorist watchlist and sanctions screening",
      "Real-time database access and updates",
      "FCRA compliant reporting and documentation",
    ],
    benefits: [
      "Ensure workplace safety and security for all employees",
      "Meet legal and regulatory compliance requirements",
      "Reduce liability and insurance costs",
      "Protect your brand reputation and customer trust",
      "Access comprehensive criminal databases worldwide",
      "Receive fast, accurate results with detailed reporting",
    ],
    process: [
      "Submit criminal check request with candidate information",
      "Comprehensive search across criminal databases and court records",
      "Identity verification and document authentication",
      "Detailed criminal background report with findings and recommendations",
    ],
    icon: <AlertCircle className="h-6 w-6" />,
    color: "bg-red-500/10 text-red-600",
    bgColor:
      "bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800",
    stats: {
      accuracy: "99.8%",
      speed: "2-24h",
      coverage: "200+",
    },
  };

  return <ServicePage service={serviceData} />;
};

export default CriminalCheck;
