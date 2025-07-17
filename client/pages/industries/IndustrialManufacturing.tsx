import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";

const IndustrialManufacturing: React.FC = () => {
  const industry = industriesData.find(
    (ind) => ind.slug === "industrial-manufacturing",
  );

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return <IndustryPage industry={industry} />;
};

export default IndustrialManufacturing;
