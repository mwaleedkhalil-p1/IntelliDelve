import React from "react";
import { Shield } from "lucide-react";
import { ServicePage } from "../components/ServicePage";

const KYCCompliance: React.FC = () => {
  const serviceData = {
    title: "KYC / Compliance",
    subtitle: "Know Your Customer and regulatory compliance services",
    description:
      "Comprehensive KYC and compliance screening to meet regulatory requirements and reduce financial crime risks.",
    hero: {
      headline: "KYC / Compliance Services",
      subtext:
        "Ensure regulatory compliance and reduce financial crime risks with comprehensive Know Your Customer and AML screening solutions.",
    },
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=85",
    features: [
      "Customer identification and verification procedures",
      "Anti-Money Laundering (AML) screening and monitoring",
      "Politically Exposed Persons (PEP) identification",
      "Sanctions and watchlist screening",
      "Enhanced due diligence for high-risk customers",
      "Ongoing monitoring and transaction analysis",
      "Regulatory reporting and documentation",
      "Global compliance framework alignment",
    ],
    benefits: [
      "Meet regulatory requirements and avoid penalties",
      "Reduce financial crime and fraud risks",
      "Protect your institution's reputation",
      "Streamline customer onboarding processes",
      "Access real-time sanctions and watchlist data",
      "Ensure ongoing compliance monitoring",
    ],
    process: [
      "Customer risk assessment and classification",
      "Identity verification and document authentication",
      "Enhanced due diligence and ongoing monitoring",
      "Compliance reporting and documentation delivery",
    ],
    icon: <Shield className="h-6 w-6" />,
    color: "bg-blue-500/10 text-blue-600",
    bgColor:
      "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800",
    stats: {
      accuracy: "99.9%",
      speed: "Real-time",
      coverage: "Global",
    },
  };

  return <ServicePage service={serviceData} />;
};

export default KYCCompliance;
