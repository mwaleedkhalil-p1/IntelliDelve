import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";
import { Helmet } from "react-helmet-async";

const Insurance: React.FC = () => {
  const industry = industriesData.find((ind) => ind.slug === "insurance");

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          Insurance - Comprehensive Background Checks for Insurance Industry |
          IntelliDelve
        </title>
        <meta
          name="description"
          content="AI-powered verification solutions for the insurance sector, including pre-employment screening, fraud detection, and risk management services."
        />
      </Helmet>
      <IndustryPage industry={industry} />
    </>
  );
};

export default Insurance;
