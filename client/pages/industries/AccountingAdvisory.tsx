import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";
import { Helmet } from "react-helmet-async";

const AccountingAdvisory: React.FC = () => {
  const industry = industriesData.find(
    (ind) => ind.slug === "accounting-advisory",
  );

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          Accounting Advisory - Secure Financial Advisory with Verified
          Professionals | IntelliDelve
        </title>
        <meta
          name="description"
          content="Comprehensive AI-powered verification solutions including pre-employment screening, corporate due diligence, fraud detection, and risk management services."
        />
      </Helmet>
      <IndustryPage industry={industry} />
    </>
  );
};

export default AccountingAdvisory;
