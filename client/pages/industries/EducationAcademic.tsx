import React from "react";
import { IndustryPage } from "../../components/IndustryPage";
import industriesData from "../../data/industries.json";
import { Helmet } from "react-helmet-async";

const EducationAcademic: React.FC = () => {
  const industry = industriesData.find(
    (ind) => ind.slug === "education-academic",
  );

  if (!industry) {
    return <div>Industry data not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          Education & Academic - Comprehensive Background Checks for Education &
          Academic Institutions | IntelliDelve
        </title>
        <meta
          name="description"
          content="AI-powered verification solutions for education and academic institutions, including pre-employment screening, credential verification, and risk management services."
        />
      </Helmet>
      <IndustryPage industry={industry} />
    </>
  );
};

export default EducationAcademic;
