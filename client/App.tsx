import "./global.css";
import "./styles/accessibility.css";

import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from "react-helmet-async";
import React, { Suspense, createContext, useContext, useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { SEO } from "./components/SEO";
import { PageLoader } from "./components/PageLoader";
import { CalendlyModal } from "./components/CalendlyModal";
import { BackToTopButton } from "./components/BackToTopButton";
import { NavigationButtons } from "./components/NavigationButtons";
import { DelversBot } from "./components/DelversBot";
import AccessibilityMenu from "./components/AccessibilityMenu";
import ScrollToTop from "./components/ScrollToTop";
import HashNavigation from "./components/HashNavigation";
import { queryClient } from "./lib/queryClient";
import { imagePreloader } from "./services/imagePreloader";
import { routes } from "./routes";
import { useCalendly } from "./hooks/useCalendly";
import { useTimeBasedTheme } from "./hooks/useTimeBasedTheme";
import { AuthProvider } from "./context/AuthContext";

// Import API test utilities for debugging
import "./utils/apiTest";

export const CalendlyContext = createContext<{
  openCalendly: (title?: string) => void;
  closeCalendly: () => void;
  isCalendlyOpen: boolean;
}>({
  openCalendly: () => {},
  closeCalendly: () => {},
  isCalendlyOpen: false,
});

const AppContent: React.FC<{ calendly: ReturnType<typeof useCalendly> }> = ({
  calendly,
}) => (
  <CalendlyContext.Provider value={calendly}>
    <SEO />
    <Toaster />
    <Sonner />
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <HashNavigation />
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CalendlyModal
          isOpen={calendly.isCalendlyOpen}
          onClose={calendly.closeCalendly}
          title={calendly.calendlyTitle}
        />
        <BackToTopButton />
        <NavigationButtons />
        <AccessibilityMenu />
        <DelversBot />
      </div>
    </BrowserRouter>
  </CalendlyContext.Provider>
);

const App: React.FC = () => {
  const calendly = useCalendly();
  
  // Initialize time-based theme
  useTimeBasedTheme();

  // Initialize image preloading on app startup
  useEffect(() => {
    imagePreloader.initialize().catch(console.error);

    // Run image diagnostics in development
    if (process.env.NODE_ENV === 'development') {
      import('./utils/imageDebugger').then(({ ImageDebugger }) => {
        // Delay to let the app load first
        setTimeout(() => {
          ImageDebugger.runDiagnostics();
        }, 2000);
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <AuthProvider>
            <AppContent calendly={calendly} />
          </AuthProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export const useCalendlyContext = () => {
  const context = useContext(CalendlyContext);
  if (!context) {
    throw new Error(
      "useCalendlyContext must be used within CalendlyContext.Provider",
    );
  }
  return context;
};

export default App;