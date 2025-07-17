import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";

const ManufacturingIndustrial: React.FC = () => {
  const industry = industriesData.find(
    (ind) => ind.slug === "manufacturing-industrial",
  );

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return <IndustryPage industry={industry} />;
};

export default ManufacturingIndustrial;
