import React from "react";
import { MapPin } from "lucide-react";
import { ServicePage } from "../components/ServicePage";

const AddressVerification: React.FC = () => {
  const serviceData = {
    title: "Physical and Digital Address Verification",
    subtitle: "Comprehensive address and residency verification",
    description:
      "Verify physical and digital addresses to confirm candidate identity and residency with advanced verification technology.",
    hero: {
      headline: "Physical and Digital Address Verification",
      subtext:
        "Confirm identity and residency with comprehensive address verification services using advanced technology and database cross-referencing.",
    },
    features: [
      "Physical address verification and validation",
      "Residency history and duration confirmation",
      "Digital address and online presence verification",
      "Property ownership and rental history checks",
      "Utility and service connection verification",
      "Geolocation and mapping verification",
      "Identity confirmation through address matching",
      "Real-time address validation services",
    ],
    benefits: [
      "Confirm candidate identity and residency claims",
      "Prevent address fraud and misrepresentation",
      "Ensure compliance with residency requirements",
      "Validate contact information and accessibility",
      "Reduce risk of fraudulent applications",
      "Streamline onboarding with verified address data",
    ],
    process: [
      "Submit address verification request with candidate details",
      "Cross-reference addresses with multiple databases and sources",
      "Verify residency history and property connections",
      "Deliver comprehensive address verification report",
    ],
    icon: <MapPin className="h-6 w-6" />,
    color: "bg-orange-500/10 text-orange-600",
    bgColor:
      "bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800",
    stats: {
      accuracy: "99.2%",
      speed: "1-2 days",
      coverage: "200+",
    },
  };

  return <ServicePage service={serviceData} />;
};

export default AddressVerification;
