import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";
import { Helmet } from "react-helmet-async";

const ManufacturingIndustrial: React.FC = () => {
  const industry = industriesData.find(
    (ind) => ind.slug === "manufacturing-industrial",
  );

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          Manufacturing & Industrial - Comprehensive Background Checks for
          Manufacturing & Industrial Sectors | IntelliDelve
        </title>
        <meta
          name="description"
          content="AI-powered verification solutions for manufacturing and industrial sectors, including pre-employment screening, contractor background checks, and risk management services."
        />
      </Helmet>
      <IndustryPage industry={industry} />
    </>
  );
};

export default ManufacturingIndustrial;
