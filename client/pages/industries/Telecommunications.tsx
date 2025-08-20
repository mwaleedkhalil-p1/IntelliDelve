import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";
import { Helmet } from "react-helmet-async";

const Telecommunications: React.FC = () => {
  const industry = industriesData.find(
    (ind) => ind.slug === "telecommunications",
  );

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          Telecommunications - Comprehensive Background Checks for
          Telecommunications Industry | IntelliDelve
        </title>
        <meta
          name="description"
          content="AI-powered verification solutions for the telecommunications sector, including pre-employment screening, contractor verification, and risk management services."
        />
      </Helmet>
      <IndustryPage industry={industry} />
    </>
  );
};

export default Telecommunications;
