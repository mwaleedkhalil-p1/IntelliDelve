import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";
import { Helmet } from "react-helmet-async";

const RealEstate: React.FC = () => {
  const industry = industriesData.find((ind) => ind.slug === "real-estate");

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          Real Estate - Comprehensive Background Checks for Real Estate Industry
          | IntelliDelve
        </title>
        <meta
          name="description"
          content="AI-powered verification solutions for the real estate sector, including pre-employment screening, tenant screening, and risk management services."
        />
      </Helmet>
      <IndustryPage industry={industry} />
    </>
  );
};

export default RealEstate;
