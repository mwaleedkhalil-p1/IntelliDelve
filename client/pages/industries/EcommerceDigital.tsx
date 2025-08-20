import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";
import { Helmet } from "react-helmet-async";

const EcommerceDigital: React.FC = () => {
  const industry = industriesData.find(
    (ind) => ind.slug === "ecommerce-digital",
  );

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          Ecommerce & Digital - Comprehensive Background Checks for Ecommerce &
          Digital Industry | IntelliDelve
        </title>
        <meta
          name="description"
          content="AI-powered verification solutions for the ecommerce and digital sector, including pre-employment screening, vendor verification, and risk management services."
        />
      </Helmet>
      <IndustryPage industry={industry} />
    </>
  );
};

export default EcommerceDigital;
