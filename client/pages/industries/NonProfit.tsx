import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";
import { Helmet } from "react-helmet-async";

const NonProfit: React.FC = () => {
  const industry = industriesData.find((ind) => ind.slug === "non-profit");

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          Non-Profit Sector - Comprehensive Background Checks for Non-Profits |
          IntelliDelve
        </title>
        <meta
          name="description"
          content="AI-powered verification solutions for the non-profit sector, including pre-employment screening, volunteer background checks, and risk management services."
        />
      </Helmet>
      <IndustryPage industry={industry} />
    </>
  );
};

export default NonProfit;
