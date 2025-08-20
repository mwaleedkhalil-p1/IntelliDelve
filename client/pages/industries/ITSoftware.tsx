import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";
import { Helmet } from "react-helmet-async";

const ITSoftware: React.FC = () => {
  const industry = industriesData.find((ind) => ind.slug === "it-software");

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          IT & Software - Comprehensive Background Checks for IT & Software
          Industry | IntelliDelve
        </title>
        <meta
          name="description"
          content="AI-powered verification solutions for the IT and software sector, including pre-employment screening, contractor verification, and risk management services."
        />
      </Helmet>
      <IndustryPage industry={industry} />
    </>
  );
};

export default ITSoftware;
