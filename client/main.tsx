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
  console.log("Chatbot initialization requested with config:", config);
  // Backend team can inject their implementation here
  const chatbotMount = document.getElementById("chatbot-mount");
  if (chatbotMount) {
    console.log("Chatbot mount point found:", chatbotMount);
    // Implementation will be provided by backend team
  } else {
    console.warn("Chatbot mount point not found");
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
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
