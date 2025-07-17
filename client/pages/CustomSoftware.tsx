import { memo } from "react";
import { ServicePage } from "../components/ServicePageTemplate";
import {
  Code,
  Zap,
  Users,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const CustomSoftware = memo(() => {
  const keyFeatures = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description:
        "End-to-end development using modern technologies and frameworks",
    },
    {
      icon: Zap,
      title: "Agile Methodology",
      description:
        "Fast, iterative development with continuous client collaboration",
    },
    {
      icon: Users,
      title: "Dedicated Teams",
      description:
        "Experienced developers assigned exclusively to your project",
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Built-in security measures and compliance standards",
    },
  ];

  const benefits = [
    "Tailored solutions that fit your exact business requirements",
    "Scalable architecture that grows with your business",
    "Modern tech stack with latest frameworks and tools",
    "Comprehensive testing and quality assurance",
    "Post-launch support and maintenance",
    "Integration with existing systems and workflows",
    "Mobile-responsive and cross-platform compatibility",
    "Performance optimization and monitoring",
  ];

  return (
    <ServicePage
      title="Custom Software Development"
      description="Transform your business with tailored software solutions designed to meet your unique requirements and accelerate growth."
      heroImage="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      whatSection={{
        title: "What is Custom Software Development?",
        content: [
          "Custom software development is the process of creating software applications specifically designed for your organization's unique needs, workflows, and objectives. Unlike off-the-shelf solutions, custom software is built from the ground up to address your specific challenges and requirements.",
          "Our custom software development services encompass everything from web applications and mobile apps to enterprise software and API integrations. We work closely with you to understand your business processes and create solutions that not only meet your current needs but also scale with your future growth.",
        ],
      }}
      whySection={{
        title: "Why Choose Custom Software Development?",
        content: [
          "In today's competitive landscape, one-size-fits-all solutions often fall short of delivering the competitive advantage your business needs. Custom software development offers the flexibility, scalability, and functionality that generic solutions simply cannot provide.",
          "Our approach ensures that every feature, interface, and integration is designed with your specific users and processes in mind, resulting in higher adoption rates, improved efficiency, and better ROI.",
        ],
        benefits,
      }}
      howSection={{
        title: "How Our Development Process Works",
        content: [
          "Our proven development methodology combines agile practices with thorough planning to deliver exceptional results. We start with comprehensive requirements gathering and system design, followed by iterative development cycles that keep you involved throughout the process.",
          "From initial concept to final deployment and beyond, our team ensures your custom software is delivered on time, within budget, and exceeds your expectations.",
        ],
        features: keyFeatures,
      }}
      industries={[
        "Financial Services & Banking",
        "Healthcare & Medical Devices",
        "Manufacturing & Industrial",
        "E-commerce & Retail",
        "Education & Training",
        "Real Estate & Property Management",
        "Logistics & Transportation",
        "Professional Services",
      ]}
      ctaTitle="Ready to Build Your Custom Solution?"
      ctaDescription="Let's discuss your project requirements and create software that drives your business forward."
    />
  );
});

CustomSoftware.displayName = "CustomSoftware";

export default CustomSoftware;
