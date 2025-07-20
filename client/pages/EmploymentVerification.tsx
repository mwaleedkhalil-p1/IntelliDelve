import React from "react";
import { Briefcase } from "lucide-react";
import { ServicePage } from "../components/ServicePage";

const EmploymentVerification: React.FC = () => {
  const serviceData = {
    title: "Employment History Verification",
    subtitle: "Comprehensive employment background checks",
    description:
      "Verify employment history, positions, dates, and responsibilities with our comprehensive employment verification service.",
    hero: {
      headline: "Employment History Verification",
      subtext:
        "Ensure accurate employment history with comprehensive verification of positions, dates, responsibilities, and reasons for leaving.",
    },
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=85",
    features: [
      "Direct contact with previous employers and HR departments",
      "Verification of job titles, dates of employment, and salary information",
      "Confirmation of responsibilities and performance evaluations",
      "Documentation of reasons for leaving and eligibility for rehire",
      "Global employment verification across 100+ countries",
      "Real-time status updates and detailed reporting",
      "Automated reference collection and verification",
    ],
    benefits: [
      "Reduce hiring risks by verifying candidate employment claims",
      "Ensure compliance with employment verification regulations",
      "Streamline your hiring process with automated verification",
      "Access global employment records and references",
      "Receive fast, accurate results with detailed documentation",
      "Protect your organization from resume fraud and misrepresentation",
    ],
    process: [
      "Submit employment verification request with candidate details",
      "Initiation of Investigation Process",
      "Confidential validation using industry best practices",
      "A detailed verification report is shared with confirmed insights",
    ],
    icon: <Briefcase className="h-6 w-6" />,
    color: "bg-blue-500/10 text-blue-600",
    bgColor:
      "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800",
    stats: {
      accuracy: "99.5%",
      speed: "24-48h",
      coverage: "100+",
    },
  };

  return <ServicePage service={serviceData} />;
};

export default EmploymentVerification;
