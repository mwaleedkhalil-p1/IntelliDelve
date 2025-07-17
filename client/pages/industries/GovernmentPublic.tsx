import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";

const GovernmentPublic: React.FC = () => {
  const industry = industriesData.find(
    (ind) => ind.slug === "government-public",
  );

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return <IndustryPage industry={industry} />;
};

export default GovernmentPublic;
