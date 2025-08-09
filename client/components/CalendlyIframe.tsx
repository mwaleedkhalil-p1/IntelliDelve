import React, { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

interface CalendlyIframeProps {
  url?: string;
  height?: string;
  width?: string;
}

export const CalendlyIframe: React.FC<CalendlyIframeProps> = ({
  url = "https://calendly.com/mwaleedkhalil/30min?hide_landing_page_details=1&hide_gdpr_banner=1&embed_domain=localhost:3001&embed_type=Inline&prefill_name=&prefill_email=",
  height = "600px",
  width = "100%",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative" style={{ height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-600 dark:text-gray-400">Loading calendar...</p>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Unable to load calendar
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Open in New Tab
            </a>
          </div>
        </div>
      )}

      <iframe
        src={url}
        width={width}
        height={height}
        frameBorder="0"
        scrolling="yes"
        title="Schedule a meeting"
        className={`rounded-lg ${isLoading || hasError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{ minWidth: "320px" }}
        loading="eager"
        importance="high"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default CalendlyIframe;
