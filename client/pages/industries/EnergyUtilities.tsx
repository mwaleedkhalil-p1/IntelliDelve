import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";
import { Helmet } from "react-helmet-async";

const EnergyUtilities: React.FC = () => {
  const industry = industriesData.find(
    (ind) => ind.slug === "energy-utilities",
  );

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          Energy & Utilities - Comprehensive Background Checks for Energy &
          Utilities Sectors | IntelliDelve
        </title>
        <meta
          name="description"
          content="AI-powered verification solutions for energy and utilities sectors, including pre-employment screening, contractor background checks, and risk management services."
        />
      </Helmet>
      <IndustryPage industry={industry} />
    </>
  );
};

export default EnergyUtilities;
