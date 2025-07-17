import { memo } from "react";
import { ServicePage } from "../components/ServicePageTemplate";
import {
  GitBranch,
  Zap,
  Database,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const SystemIntegration = memo(() => {
  const keyFeatures = [
    {
      icon: GitBranch,
      title: "API Development & Management",
      description: "RESTful and GraphQL APIs with comprehensive documentation",
    },
    {
      icon: Zap,
      title: "Real-time Integration",
      description:
        "Live data synchronization between multiple systems and platforms",
    },
    {
      icon: Database,
      title: "Data Transformation",
      description:
        "ETL processes and data mapping for seamless information flow",
    },
    {
      icon: Shield,
      title: "Secure Connections",
      description: "Enterprise-grade security with encrypted data transmission",
    },
  ];

  const benefits = [
    "Eliminate data silos and improve information accessibility",
    "Reduce manual data entry and human error",
    "Streamline business processes across departments",
    "Real-time data synchronization and updates",
    "Improved reporting and analytics capabilities",
    "Enhanced operational efficiency and productivity",
    "Scalable architecture for future system additions",
    "24/7 monitoring and automated error handling",
  ];

  return (
    <ServicePage
      title="System Integration & API Development"
      description="Connect your business systems seamlessly with our comprehensive integration solutions and robust API development services."
      heroImage="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      whatSection={{
        title: "What is System Integration?",
        content: [
          "System integration is the process of connecting different software applications, databases, and platforms to work together as a unified system. Our integration services ensure that your various business tools can communicate effectively, share data seamlessly, and provide a cohesive user experience.",
          "We specialize in creating custom APIs, implementing middleware solutions, and developing integration platforms that connect everything from CRM systems and accounting software to e-commerce platforms and third-party services.",
        ],
      }}
      whySection={{
        title: "Why System Integration Matters",
        content: [
          "In today's digital landscape, businesses rely on multiple software solutions to manage different aspects of their operations. Without proper integration, these systems operate in isolation, creating inefficiencies, data inconsistencies, and missed opportunities.",
          "Our integration solutions break down these barriers, enabling real-time data flow, automated processes, and comprehensive visibility across your entire business ecosystem.",
        ],
        benefits,
      }}
      howSection={{
        title: "Our Integration Approach",
        content: [
          "We follow a systematic approach to system integration, starting with a comprehensive assessment of your current technology stack and business requirements. Our team designs integration architectures that are scalable, secure, and maintainable.",
          "From initial planning to deployment and ongoing support, we ensure your integrated systems operate flawlessly and continue to meet your evolving business needs.",
        ],
        features: keyFeatures,
      }}
      industries={[
        "E-commerce & Online Retail",
        "Financial Services & Fintech",
        "Healthcare & Medical Systems",
        "Manufacturing & Supply Chain",
        "Professional Services",
        "Real Estate & Property Management",
        "Education & Learning Platforms",
        "Telecommunications",
      ]}
      ctaTitle="Ready to Connect Your Systems?"
      ctaDescription="Let's discuss how our integration solutions can streamline your operations and boost productivity."
    />
  );
});

SystemIntegration.displayName = "SystemIntegration";

export default SystemIntegration;
