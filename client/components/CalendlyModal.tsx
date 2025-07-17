import React, { useEffect, useRef, useState } from "react";
import { X, Loader2, AlertCircle } from "lucide-react";
import { CalendlyIframe } from "./CalendlyIframe";

// Declare Calendly global type
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: Element | null }) => void;
    };
  }
}

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({
  isOpen,
  onClose,
  title = "Schedule a Demo",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [useIframeFallback, setUseIframeFallback] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      setIsLoading(true);
      setHasError(false);

      // Check if Calendly script is already loaded
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]',
      );

      if (existingScript) {
        // Script already exists, just initialize
        setIsLoading(false);
        if (window.Calendly) {
          window.Calendly.initInlineWidget({
            url: "https://calendly.com/mwaleedkhalil/30min",
            parentElement: document.querySelector(".calendly-inline-widget"),
          });
        }
      } else {
        // Load Calendly script dynamically
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;

        script.onload = () => {
          setIsLoading(false);
          // Initialize the widget after script loads
          if (window.Calendly) {
            window.Calendly.initInlineWidget({
              url: "https://calendly.com/mwaleedkhalil/30min",
              parentElement: document.querySelector(".calendly-inline-widget"),
            });
          }
        };

        script.onerror = () => {
          setIsLoading(false);
          setHasError(true);
          console.error("Failed to load Calendly script");
        };

        // Timeout fallback
        setTimeout(() => {
          if (isLoading) {
            setIsLoading(false);
            setHasError(true);
          }
        }, 10000); // 10 second timeout

        document.head.appendChild(script);
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, onClose]);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-primary">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Calendly Widget */}
        <div className="p-6">
          {isLoading && (
            <div className="flex items-center justify-center" style={{ height: "600px" }}>
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-gray-600 dark:text-gray-400">Loading calendar...</p>
              </div>
            </div>
          )}

          {hasError && !useIframeFallback && (
            <div className="flex items-center justify-center" style={{ height: "600px" }}>
              <div className="text-center">
                <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Unable to load calendar widget. Would you like to try an alternative view?
                </p>
                <div className="space-x-4">
                  <button
                    onClick={() => setUseIframeFallback(true)}
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Try Alternative View
                  </button>
                  <a
                    href="https://calendly.com/mwaleedkhalil/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Open in New Tab
                  </a>
                </div>
              </div>
            </div>
          )}

          {useIframeFallback && (
            <CalendlyIframe />
          )}

          {!isLoading && !hasError && !useIframeFallback && (
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/mwaleedkhalil/30min"
              style={{ minWidth: "320px", height: "600px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendlyModal;
