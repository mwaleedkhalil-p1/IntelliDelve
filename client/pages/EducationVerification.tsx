import React from "react";
import { GraduationCap } from "lucide-react";
import { ServicePage } from "../components/ServicePage";

const EducationVerification: React.FC = () => {
  const serviceData = {
    title: "Education Verification",
    subtitle: "Academic credential and degree verification",
    description:
      "Verify educational credentials, degrees, certifications, and academic achievements to ensure candidate qualifications.",
    hero: {
      headline: "Education Verification",
      subtext:
        "Confirm academic credentials and educational achievements with comprehensive verification from institutions worldwide.",
    },
    features: [
      "Direct verification with educational institutions globally",
      "Degree, diploma, and certificate authentication",
      "Academic transcript and GPA verification",
      "Professional certification and license validation",
      "Detection of diploma mills and fraudulent credentials",
      "International education verification services",
      "Real-time verification status updates",
      "Detailed academic verification reports",
    ],
    benefits: [
      "Prevent academic fraud and misrepresentation",
      "Ensure candidates meet required educational qualifications",
      "Verify professional certifications and licenses",
      "Access global network of educational institutions",
      "Streamline hiring process with fast verification",
      "Maintain compliance with industry education requirements",
    ],
    process: [
      "Submit education verification request with academic details",
      "Direct contact with educational institutions and registrars",
      "Verification of degrees, transcripts, and certifications",
      "Comprehensive academic verification report delivered",
    ],
    icon: <GraduationCap className="h-6 w-6" />,
    color: "bg-green-500/10 text-green-600",
    bgColor:
      "bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800",
    stats: {
      accuracy: "99.7%",
      speed: "3-5 days",
      coverage: "500+",
    },
  };

  return <ServicePage service={serviceData} />;
};

export default EducationVerification;
