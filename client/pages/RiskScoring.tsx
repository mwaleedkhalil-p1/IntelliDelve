import React from "react";
import { BarChart3 } from "lucide-react";
import { ServicePage } from "../components/ServicePage";

const RiskScoring: React.FC = () => {
  const serviceData = {
    title: "Risk Scoring & Comprehensive Risk Profiling",
    subtitle: "Advanced risk assessment and scoring solutions",
    description:
      "Comprehensive risk scoring and profiling services to assess and quantify risks for informed business decisions.",
    hero: {
      headline: "Risk Scoring & Comprehensive Risk Profiling",
      subtext:
        "Make informed decisions with advanced risk assessment, scoring, and profiling solutions powered by AI and machine learning.",
    },
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=85",
    features: [
      "AI-powered risk scoring algorithms",
      "Comprehensive risk profiling and assessment",
      "Multi-factor risk analysis and evaluation",
      "Predictive risk modeling and forecasting",
      "Industry-specific risk frameworks",
      "Real-time risk monitoring and alerts",
      "Custom risk scoring models",
      "Risk visualization and reporting dashboards",
    ],
    benefits: [
      "Quantify and assess risks with precision",
      "Make data-driven risk management decisions",
      "Reduce exposure to high-risk individuals or entities",
      "Optimize risk assessment processes",
      "Improve compliance and regulatory alignment",
      "Enhance overall organizational risk posture",
    ],
    process: [
      "Data collection and risk factor identification",
      "AI-powered analysis and risk score calculation",
      "Comprehensive risk profile development",
      "Risk reporting and monitoring dashboard delivery",
    ],
    icon: <BarChart3 className="h-6 w-6" />,
    color: "bg-red-500/10 text-red-600",
    bgColor:
      "bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800",
    stats: {
      accuracy: "95.2%",
      speed: "Real-time",
      coverage: "Multi-factor",
    },
  };

  return <ServicePage service={serviceData} />;
};

export default RiskScoring;
