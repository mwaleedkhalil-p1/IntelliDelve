import React from "react";

interface CalendlyIframeProps {
  url?: string;
  height?: string;
  width?: string;
}

export const CalendlyIframe: React.FC<CalendlyIframeProps> = ({
  url = "https://calendly.com/mwaleedkhalil/30min",
  height = "600px",
  width = "100%",
}) => {
  return (
    <iframe
      src={url}
      width={width}
      height={height}
      frameBorder="0"
      scrolling="no"
      title="Schedule a meeting"
      className="rounded-lg"
      style={{ minWidth: "320px" }}
    />
  );
};

export default CalendlyIframe;
