import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";
import { Helmet } from "react-helmet-async";

const StartupsTech: React.FC = () => {
  const industry = industriesData.find((ind) => ind.slug === "startups-tech");

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          Startups & Tech - Comprehensive Background Checks for Startups & Tech
          Industry | IntelliDelve
        </title>
        <meta
          name="description"
          content="AI-powered verification solutions for startups and tech companies, including pre-employment screening, contractor verification, and risk management services."
        />
      </Helmet>
      <IndustryPage industry={industry} />
    </>
  );
};

export default StartupsTech;
