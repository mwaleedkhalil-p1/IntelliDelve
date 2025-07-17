import { useState, useCallback } from "react";

export const useCalendly = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [calendlyTitle, setCalendlyTitle] = useState("Schedule a Demo");

  const openCalendly = useCallback((title?: string) => {
    if (title) setCalendlyTitle(title);
    setIsCalendlyOpen(true);
  }, []);

  const closeCalendly = useCallback(() => {
    setIsCalendlyOpen(false);
  }, []);

  return {
    isCalendlyOpen,
    calendlyTitle,
    openCalendly,
    closeCalendly,
  };
};

export default useCalendly;
