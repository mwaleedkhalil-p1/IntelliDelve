import { memo } from "react";
import { ServicePage } from "../components/ServicePageTemplate";
import {
  Database,
  ArrowRightLeft,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const DataMigration = memo(() => {
  const keyFeatures = [
    {
      icon: Database,
      title: "Multi-Platform Support",
      description:
        "Migrate data between any databases, cloud platforms, and systems",
    },
    {
      icon: ArrowRightLeft,
      title: "Zero-Downtime Migration",
      description: "Seamless transitions with minimal business disruption",
    },
    {
      icon: Shield,
      title: "Data Integrity Assurance",
      description: "Comprehensive validation and quality checks throughout",
    },
    {
      icon: BarChart3,
      title: "Analytics Platform Setup",
      description:
        "Complete analytics infrastructure with dashboards and reports",
    },
  ];

  const benefits = [
    "Seamless transition to modern, scalable platforms",
    "Improved data quality and consistency",
    "Enhanced performance and faster query responses",
    "Cost reduction through optimized storage and processing",
    "Advanced analytics and reporting capabilities",
    "Better data governance and security",
    "Compliance with industry standards and regulations",
    "Future-proof architecture for business growth",
  ];

  return (
    <ServicePage
      title="Data Migration & Analytics Platform"
      description="Transform your data infrastructure with secure, efficient migration services and comprehensive analytics platforms designed for modern business intelligence."
      heroImage="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      whatSection={{
        title: "What is Data Migration?",
        content: [
          "Data migration is the process of transferring data from one system, format, or location to another. This critical process involves moving databases, applications, and entire data centers to new environments while maintaining data integrity, security, and accessibility.",
          "Our comprehensive data migration services include legacy system modernization, cloud migration, database consolidation, and the implementation of advanced analytics platforms that turn your data into actionable business insights.",
        ],
      }}
      whySection={{
        title: "Why Migrate Your Data Infrastructure?",
        content: [
          "Legacy systems often limit business growth with outdated technology, poor performance, and high maintenance costs. Modern data platforms offer improved scalability, security, and analytics capabilities that can transform how your organization operates and makes decisions.",
          "Our migration approach ensures your data becomes more accessible, analyzable, and valuable while reducing operational costs and improving system performance.",
        ],
        benefits,
      }}
      howSection={{
        title: "Our Migration Process",
        content: [
          "We follow a proven methodology that includes comprehensive data assessment, migration planning, testing, and validation. Our team ensures zero data loss and minimal downtime throughout the migration process.",
          "Post-migration, we implement analytics platforms with interactive dashboards, automated reporting, and advanced business intelligence tools that provide real-time insights into your operations.",
        ],
        features: keyFeatures,
      }}
      industries={[
        "Financial Services & Banking",
        "Healthcare & Life Sciences",
        "Retail & E-commerce",
        "Manufacturing & Industrial",
        "Government & Public Sector",
        "Education & Research",
        "Insurance & Risk Management",
        "Technology & Software",
      ]}
      ctaTitle="Ready to Modernize Your Data Infrastructure?"
      ctaDescription="Let's discuss your data migration needs and build an analytics platform that drives informed decision-making."
    />
  );
});

DataMigration.displayName = "DataMigration";

export default DataMigration;
