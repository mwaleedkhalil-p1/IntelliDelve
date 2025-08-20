import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";
import { Helmet } from "react-helmet-async";

const RetailConsumer: React.FC = () => {
  const industry = industriesData.find((ind) => ind.slug === "retail-consumer");

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          Retail & Consumer - Comprehensive Background Checks for Retail &
          Consumer Sectors | IntelliDelve
        </title>
        <meta
          name="description"
          content="AI-powered verification solutions for retail and consumer sectors, including pre-employment screening, customer service background checks, and risk management services."
        />
      </Helmet>
      <IndustryPage industry={industry} />
    </>
  );
};

export default RetailConsumer;
