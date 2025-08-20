import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";
import { Helmet } from "react-helmet-async";

const HealthcareMedical: React.FC = () => {
  const industry = industriesData.find(
    (ind) => ind.slug === "healthcare-medical",
  );

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          Healthcare & Medical - Comprehensive Background Checks for Healthcare
          & Medical Industry | IntelliDelve
        </title>
        <meta
          name="description"
          content="AI-powered verification solutions for the healthcare and medical sector, including pre-employment screening, credential verification, and risk management services."
        />
      </Helmet>
      <IndustryPage industry={industry} />
    </>
  );
};

export default HealthcareMedical;
