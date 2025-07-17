import React from "react";
import { Laptop } from "lucide-react";
import { SolutionPage } from "../../components/SolutionPage";
import { SEO } from "../../components/SEO";

const TechInnovation: React.FC = () => {
  const solutionData = {
    title: "Tech & Innovation Services",
    subtitle: "Custom technology solutions and digital transformation services",
    description: "Accelerate your digital transformation and business growth",
    hero: {
      headline: "Tech & Innovation Services",
      subtext:
        "Accelerate your digital transformation with custom technology solutions, innovative platforms, and cutting-edge development services designed to drive business growth.",
    },
    what: {
      title: "What We Offer",
      description:
        "Our technology and innovation services help organizations build, integrate, and optimize digital solutions that drive efficiency, growth, and competitive advantage.",
      features: [
        "Custom software development with modern frameworks and technologies",
        "System integration and API development for seamless connectivity",
        "Cloud infrastructure setup and DevOps implementation",
        "Data migration and analytics platform development",
        "Mobile application development for iOS and Android platforms",
        "Web application development with responsive design",
        "Digital transformation consulting and strategy development",
        "Technology architecture design and optimization",
      ],
    },
    why: {
      title: "Why Choose Our Tech Services",
      description:
        "Our experienced development team delivers scalable, secure, and innovative technology solutions that align with your business objectives and industry best practices.",
      benefits: [
        "Accelerate time-to-market with agile development methodologies and rapid prototyping",
        "Reduce operational costs through automation and efficient system architecture",
        "Ensure scalability and reliability with cloud-native solutions and modern infrastructure",
        "Improve user experience with intuitive interfaces and responsive design",
        "Maintain security and compliance with industry-standard practices and protocols",
        "Enable data-driven decisions with integrated analytics and reporting capabilities",
      ],
    },
    how: {
      title: "Our Development Process",
      description:
        "We follow industry best practices and agile methodologies to deliver high-quality technology solutions on time and within budget.",
      process: [
        "Discovery and planning phase to understand requirements and define technical specifications",
        "Design and architecture development with user experience and scalability in mind",
        "Agile development with regular testing, feedback, and iterative improvements",
        "Deployment, training, and ongoing support to ensure successful adoption and maintenance",
      ],
    },
    icon: <Laptop className="h-6 w-6" />,
    color: "bg-green-500/10 text-green-600",
    bgColor:
      "bg-gradient-to-br from-green-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800",
  };

  return (
    <>
      <SEO
        title="Tech & Innovation Services - IntelliDelve"
        description="Custom software development, system integration, cloud infrastructure, and digital transformation services to accelerate your business growth and innovation."
        keywords="custom software development, system integration, cloud infrastructure, DevOps, digital transformation, mobile apps, web development"
      />
      <SolutionPage solution={solutionData} />
    </>
  );
};

export default TechInnovation;
