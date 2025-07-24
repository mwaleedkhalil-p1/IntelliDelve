import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Expose chatbot initialization function globally
declare global {
  interface Window {
    initChatbot: (config?: any) => void;
  }
}

window.initChatbot = (config) => {

  // Backend team can inject their implementation here
  const chatbotMount = document.getElementById("chatbot-mount");
  if (chatbotMount) {

    // Implementation will be provided by backend team
  } else {

  }
};

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = createRoot(container);
root.render(<App />);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {

      })
      .catch((registrationError) => {

      });
  });
}
