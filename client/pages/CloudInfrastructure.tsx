import React, { memo } from "react";
import { ServicePage } from "../components/ServicePageTemplate";
import {
  Cloud,
  Settings,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const CloudInfrastructure = memo(() => {
  const keyFeatures = [
    {
      icon: Cloud,
      title: "Multi-Cloud Architecture",
      description: "AWS, Azure, and Google Cloud deployment and management",
    },
    {
      icon: Settings,
      title: "DevOps Automation",
      description: "CI/CD pipelines, automated testing, and deployment",
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security with compliance frameworks",
    },
    {
      icon: Zap,
      title: "Auto-Scaling & Optimization",
      description: "Dynamic resource allocation and cost optimization",
    },
  ];

  const benefits = [
    "Reduced infrastructure costs and improved ROI",
    "Enhanced scalability and flexibility",
    "99.9% uptime with automated failover",
    "Faster deployment and time-to-market",
    "Improved security and compliance posture",
    "24/7 monitoring and proactive maintenance",
    "Disaster recovery and business continuity",
    "Global reach with edge computing capabilities",
  ];

  return (
    <ServicePage
      title="Cloud Infrastructure & DevOps"
      description="Build scalable, secure, and efficient cloud infrastructure with our comprehensive DevOps solutions and automation services."
      heroImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      whatSection={{
        title: "What is Cloud Infrastructure?",
        content: [
          "Cloud infrastructure refers to the virtual computing resources that enable businesses to build, deploy, and manage applications in the cloud. Our cloud infrastructure services encompass everything from initial architecture design to ongoing optimization and management.",
          "We specialize in creating robust, scalable cloud environments using leading platforms like AWS, Microsoft Azure, and Google Cloud. Our DevOps practices ensure efficient development workflows, automated deployments, and continuous integration that accelerates your development cycles.",
        ],
      }}
      whySection={{
        title: "Why Move to the Cloud?",
        content: [
          "Cloud infrastructure offers unparalleled flexibility, scalability, and cost-effectiveness compared to traditional on-premises solutions. With the cloud, you can rapidly scale resources up or down based on demand, access global infrastructure, and leverage cutting-edge technologies without massive upfront investments.",
          "Our DevOps approach combines cloud infrastructure with automated processes that improve reliability, reduce deployment time, and enable continuous delivery of new features and updates.",
        ],
        benefits,
      }}
      howSection={{
        title: "Our Cloud & DevOps Approach",
        content: [
          "We start with a comprehensive assessment of your current infrastructure and business requirements. Our team designs cloud architectures that optimize performance, security, and cost while implementing DevOps practices that streamline your development and deployment processes.",
          "From migration planning to ongoing optimization, we ensure your cloud infrastructure evolves with your business needs and takes advantage of the latest cloud technologies and best practices.",
        ],
        features: keyFeatures,
      }}
      industries={[
        "Software & Technology",
        "Financial Services",
        "Healthcare & Life Sciences",
        "E-commerce & Retail",
        "Media & Entertainment",
        "Manufacturing & IoT",
        "Startups & Scale-ups",
        "Enterprise & Government",
      ]}
      ctaTitle="Ready to Transform Your Infrastructure?"
      ctaDescription="Let's design and implement a cloud solution that scales with your business and accelerates your digital transformation."
    />
  );
});

CloudInfrastructure.displayName = "CloudInfrastructure";

export default CloudInfrastructure;
