import React from "react";
import { FileCheck } from "lucide-react";
import { ServicePage } from "../components/ServicePage";

const ReferenceValidation: React.FC = () => {
  const serviceData = {
    title: "Reference and Credential Validation",
    subtitle: "Professional reference and credential verification",
    description:
      "Validate professional references and credentials to ensure authentic candidate qualifications and work history.",
    hero: {
      headline: "Reference and Credential Validation",
      subtext:
        "Verify professional references and validate credentials to make informed hiring decisions with confidence.",
    },
    features: [
      "Professional reference interviews and validation",
      "Credential and certification verification",
      "Work performance and competency assessment",
      "Character and integrity reference checks",
      "Management and leadership reference validation",
      "Technical skill and expertise verification",
      "Cultural fit and team compatibility assessment",
      "Structured reference interview process",
    ],
    benefits: [
      "Gain insights into candidate performance and work style",
      "Validate technical skills and professional competencies",
      "Assess cultural fit and team compatibility",
      "Reduce hiring risks with comprehensive reference checks",
      "Verify professional credentials and certifications",
      "Make informed decisions with detailed reference reports",
    ],
    process: [
      "Collect reference contacts and credential information",
      "Conduct structured interviews with professional references",
      "Verify credentials and certifications with issuing bodies",
      "Compile comprehensive reference and credential validation report",
    ],
    icon: <FileCheck className="h-6 w-6" />,
    color: "bg-purple-500/10 text-purple-600",
    bgColor:
      "bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800",
    stats: {
      accuracy: "98.9%",
      speed: "2-3 days",
      coverage: "Global",
    },
  };

  return <ServicePage service={serviceData} />;
};

export default ReferenceValidation;
