import React, { useState } from 'react';
import { SanityCaseStudyList, SanityCaseStudyPopup } from '../components/sanity';
import { FallbackProvider, FallbackDebugPanel } from '../components/FallbackProvider';

const SanityCaseStudiesPage: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCaseStudyClick = (caseStudy: any) => {
    setSelectedCaseStudy(caseStudy);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => setSelectedCaseStudy(null), 300);
  };

  return (
    <FallbackProvider>
      <SanityCaseStudyList onCaseStudyClick={handleCaseStudyClick} />
      <SanityCaseStudyPopup
        caseStudy={selectedCaseStudy}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
      <FallbackDebugPanel />
    </FallbackProvider>
  );
};

export default SanityCaseStudiesPage;