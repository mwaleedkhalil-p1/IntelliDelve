import React, { useEffect, useRef, useState } from "react";
import { X, Loader2, AlertCircle } from "lucide-react";
import { CalendlyIframe } from "./CalendlyIframe";
import { useSafariModal } from "../hooks/useSafariModal";

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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [useIframeFallback, setUseIframeFallback] = useState(true);

  const { getOverlayClasses, getContentClasses } = useSafariModal(isOpen);

  useEffect(() => {
    const preloadScript = () => {
      const existingScript = document.querySelector('script[src="/calendly-proxy/assets/external/widget.js"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "/calendly-proxy/assets/external/widget.js";
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
      }
    };

    const timer = setTimeout(preloadScript, 1000);
    return () => clearTimeout(timer);
  }, []);

  const loadCalendlyWidget = () => {
    setIsLoading(true);
    setHasError(false);

    const existingScript = document.querySelector(
      'script[src="/calendly-proxy/assets/external/widget.js"]',
    );

    if (existingScript) {

      setIsLoading(false);
      const widgetElement = document.querySelector(".calendly-inline-widget");
      if (window.Calendly && widgetElement) {
        try {
          window.Calendly.initInlineWidget({
            url: "https://calendly.com/mwaleedkhalil/30min?hide_landing_page_details=1&hide_gdpr_banner=1&prefill_name=&prefill_email=",
            parentElement: widgetElement,
          });
        } catch (error) {

          setHasError(true);
        }
      } else {
        setHasError(true);
      }
    } else {

      const script = document.createElement("script");
      script.src = "/calendly-proxy/assets/external/widget.js";
      script.async = true;
      script.defer = true;

      script.crossOrigin = "anonymous";

      script.onload = () => {
        setIsLoading(false);

        const widgetElement = document.querySelector(".calendly-inline-widget");
        if (window.Calendly && widgetElement) {
          try {
            window.Calendly.initInlineWidget({
              url: "https://calendly.com/mwaleedkhalil/30min?hide_landing_page_details=1&hide_gdpr_banner=1&prefill_name=&prefill_email=",
              parentElement: widgetElement,
            });
          } catch (error) {

            setHasError(true);
          }
        } else {
          setHasError(true);
        }
      };

      script.onerror = () => {
        setIsLoading(false);
        setHasError(true);

      };

      setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
          setHasError(true);
        }
      }, 5000);

      document.head.appendChild(script);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);

      setIsLoading(false);
      setHasError(false);
      if (!useIframeFallback) {
        setUseIframeFallback(true);
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose, useIframeFallback]);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={getOverlayClasses("fixed inset-0 flex items-center justify-center")}
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className={getContentClasses("relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden flex flex-col")}
      >

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

        <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
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
            <div>
              <CalendlyIframe />
              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setUseIframeFallback(false);
                    setIsLoading(true);
                    setHasError(false);

                    loadCalendlyWidget();
                  }}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-sky-400 transition-colors"
                >
                  Try Interactive Widget Instead
                </button>
              </div>
            </div>
          )}

          {!isLoading && !hasError && !useIframeFallback && (
            <div
              className="calendly-inline-widget overflow-auto"
              data-url="https://calendly.com/mwaleedkhalil/30min"
              style={{ minWidth: "320px", height: "600px", overflow: "auto" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendlyModal;
