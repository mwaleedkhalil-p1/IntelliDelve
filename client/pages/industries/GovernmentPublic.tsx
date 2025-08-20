import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";
import { Helmet } from "react-helmet-async";

const GovernmentPublic: React.FC = () => {
  const industry = industriesData.find(
    (ind) => ind.slug === "government-public",
  );

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          Government & Public Sector - Comprehensive Background Checks for
          Government & Public Sector | IntelliDelve
        </title>
        <meta
          name="description"
          content="AI-powered verification solutions for the government and public sector, including pre-employment screening, security clearance checks, and risk management services."
        />
      </Helmet>
      <IndustryPage industry={industry} />
    </>
  );
};

export default GovernmentPublic;
