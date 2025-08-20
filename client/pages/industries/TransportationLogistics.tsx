import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";
import { Helmet } from "react-helmet-async";

const TransportationLogistics: React.FC = () => {
  const industry = industriesData.find(
    (ind) => ind.slug === "transportation-logistics",
  );

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          Transportation & Logistics - Comprehensive Background Checks for
          Transportation & Logistics Sectors | IntelliDelve
        </title>
        <meta
          name="description"
          content="AI-powered verification solutions for transportation and logistics sectors, including pre-employment screening, driver background checks, and risk management services."
        />
      </Helmet>
      <IndustryPage industry={industry} />
    </>
  );
};

export default TransportationLogistics;
