import React from "react";
import { Brain } from "lucide-react";
import { SolutionPage } from "../../components/SolutionPage";
import { SEO } from "../../components/SEO";

const AIDataScience: React.FC = () => {
  const solutionData = {
    title: "AI & Data Science Solutions",
    subtitle:
      "Advanced analytics and machine learning for data-driven insights",
    description: "Intelligent systems for strategic decision-making",
    hero: {
      headline: "AI & Data Science Solutions",
      subtext:
        "Leverage cutting-edge artificial intelligence and data science to transform your data into actionable insights for strategic decision-making and competitive advantage.",
    },
    what: {
      title: "What We Offer",
      description:
        "Our AI and data science solutions combine machine learning, advanced analytics, and intelligent systems to help organizations extract maximum value from their data.",
      features: [
        "Predictive analytics and forecasting models for business planning",
        "Natural Language Processing (NLP) for document analysis and sentiment analysis",
        "Computer vision systems for automated image and video analysis",
        "Interactive dashboards and business intelligence platforms",
        "Recommendation engines for personalized user experiences",
        "Document intelligence and OCR for automated data extraction",
        "AI-powered resume ranking and candidate scoring systems",
        "Retrieval-Augmented Generation (RAG) for intelligent information systems",
      ],
    },
    why: {
      title: "Why Choose Our AI Solutions",
      description:
        "Our team of data scientists and AI engineers deliver custom solutions that are scalable, reliable, and designed to integrate seamlessly with your existing systems.",
      benefits: [
        "Increase operational efficiency through intelligent automation and process optimization",
        "Make data-driven decisions with predictive analytics and real-time insights",
        "Reduce manual processing time by up to 80% with automated data extraction",
        "Improve accuracy and consistency in data analysis and pattern recognition",
        "Scale your analysis capabilities to handle large volumes of data efficiently",
        "Gain competitive advantage through advanced machine learning capabilities",
      ],
    },
    how: {
      title: "Our AI Implementation Process",
      description:
        "We follow a systematic approach to ensure successful AI implementation that delivers measurable business value.",
      process: [
        "Data assessment and requirements analysis to identify optimal AI applications",
        "Custom model development and training using your specific data and use cases",
        "Integration and testing with your existing systems and workflows",
        "Deployment, monitoring, and continuous optimization for optimal performance",
      ],
    },
    icon: <Brain className="h-6 w-6" />,
    color: "bg-red-500/10 text-red-600",
    bgColor:
      "bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800",
  };

  return (
    <>
      <SEO
        title="AI & Data Science Solutions - IntelliDelve"
        description="Advanced AI and data science solutions including predictive analytics, machine learning, NLP, computer vision, and intelligent automation for business transformation."
        keywords="AI solutions, data science, machine learning, predictive analytics, NLP, computer vision, business intelligence, automation"
      />
      <SolutionPage solution={solutionData} />
    </>
  );
};

export default AIDataScience;
