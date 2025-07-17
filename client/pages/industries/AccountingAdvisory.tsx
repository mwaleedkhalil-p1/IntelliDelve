import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";

const AccountingAdvisory: React.FC = () => {
  const industry = industriesData.find(
    (ind) => ind.slug === "accounting-advisory",
  );

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return <IndustryPage industry={industry} />;
};

export default AccountingAdvisory;
