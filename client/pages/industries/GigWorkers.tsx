import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";

const GigWorkers: React.FC = () => {
  const industry = industriesData.find((ind) => ind.slug === "gig-workers");

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return <IndustryPage industry={industry} />;
};

export default GigWorkers;
