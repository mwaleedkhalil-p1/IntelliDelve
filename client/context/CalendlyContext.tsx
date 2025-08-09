import React, { createContext, useContext, ReactNode } from 'react';

interface CalendlyContextType {
  openCalendly: () => void;
}

const CalendlyContext = createContext<CalendlyContextType | undefined>(undefined);

export const useCalendlyContext = (): CalendlyContextType => {
  const context = useContext(CalendlyContext);
  if (!context) {
    throw new Error('useCalendlyContext must be used within a CalendlyProvider');
  }
  return context;
};

interface CalendlyProviderProps {
  children: ReactNode;
}

export const CalendlyProvider: React.FC<CalendlyProviderProps> = ({ children }) => {
  const openCalendly = () => {
    // Open Calendly widget or redirect to Calendly URL
    window.open('https://calendly.com/your-calendly-link', '_blank');
  };

  const value: CalendlyContextType = {
    openCalendly,
  };

  return (
    <CalendlyContext.Provider value={value}>
      {children}
    </CalendlyContext.Provider>
  );
};