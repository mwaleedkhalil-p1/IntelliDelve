import React, { memo } from "react";
import { Shield, Eye, Lock, Globe, Users, FileText } from "lucide-react";

const PrivacyPolicy = memo(() => {
  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: FileText,
      content: [
        {
          subtitle: "1. Directly Provided Data:",
          items: [
            "Name, contact information, address",
            "Identification documents (e.g., CNIC, passport, driver's license)",
            "Education and employment history",
            "References or supporting documents",
          ],
        },
        {
          subtitle: "2. Automatically Collected Data:",
          items: [
            "IP addresses & device identifiers",
            "Browsing activity within our portals (for security and auditing)",
            "Geolocation data (when permitted)",
          ],
        },
      ],
    },
    {
      id: "use-of-information",
      title: "Use of Information",
      icon: Users,
      content: [
        {
          subtitle: "We use your data to:",
          items: [
            "Conduct background screening, criminal record and employment verification",
            "Perform due diligence investigations and fraud risk assessments",
            "Power AI & data intelligence tools for resume ranking, identity verification, and compliance automation",
            "Deliver accurate, secure reports to clients (with your consent or as required by law)",
            "Improve our products through anonymized analytics and machine learning",
            "Following the FCRA policy, we do not keep clients' data like credentials for more than 90 days",
          ],
        },
      ],
    },
    {
      id: "global-compliance",
      title: "Global Compliance & Data Transfers",
      icon: Globe,
      content: [
        {
          subtitle: "",
          text: "IntelliDelve operates in 170+ countries. Based on scope of work, your data may be shared with third party screeners after anonymising to fulfill the service requested. We follow data localization, cross-border transfer safeguards, and contractual clauses aligned with:",
          items: [
            "General Data Protection Regulation (GDPR)",
            "California Consumer Privacy Act (CCPA)",
            "China Personal Information Protection Law (PIPL)",
            "Pakistan's PECA and related frameworks",
            "ISO 27001 and SOC 2 best practices",
          ],
        },
      ],
    },
    {
      id: "data-security",
      title: "Data Security Measures",
      icon: Lock,
      content: [
        {
          subtitle:
            "We employ state-of-the-art technologies and operational safeguards to protect your information, including:",
          items: [
            "AES 256-bit encryption at rest and in transit",
            "Role-based access controls",
            "End-to-end audit trails",
            "Continuous monitoring and threat detection",
            "Hosting on secure cloud infrastructure",
          ],
        },
      ],
    },
    {
      id: "ai-decision-making",
      title: "AI & Automated Decision-Making",
      icon: Eye,
      content: [
        {
          subtitle: "",
          text: "IntelliDelve uses AI models to support efficiency and accuracy in their services and solutions. These systems do not make solely automated decisions that produce legal effects without human oversight. All final decisions are reviewed by our group of compliance experts or client representatives.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies & Website Tracking",
      icon: Globe,
      content: [
        {
          subtitle: "",
          text: "Our website uses essential cookies for functionality and analytics tools to understand visitor behavior and improve performance. No tracking cookies are used without your consent.",
        },
      ],
    },
    {
      id: "third-party-disclosure",
      title: "Third-Party Disclosure",
      icon: Shield,
      content: [
        {
          subtitle:
            "We do not sell or share your personal data for marketing purposes. Data is only disclosed to:",
          items: [
            "Authorized client organizations (who requested the check)",
            "Trusted verification partners or academic/employment institutions",
            "Legal or government authorities where required by law",
          ],
          text: "All third parties are subject to strict confidentiality and data processing agreements.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/20 dark:to-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 dark:bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary dark:text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              At IntelliDelve, your privacy is our priority. This Privacy Policy
              outlines how we collect, use, protect, and manage your information
              when you engage with our services.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Effective Date:</strong> January 1, 2024
                <br />
                <strong>Last Updated:</strong> January 1, 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We are committed to transparency, data protection, and global
              regulatory compliance, including GDPR, ISO 27001, KYC/AML, and
              regional privacy laws across MENA, USA, APAC, Europe, and China.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-start mb-6">
                  <div className="bg-primary/20 dark:bg-primary/30 p-3 rounded-xl mr-4 flex-shrink-0">
                    <section.icon className="w-6 h-6 text-primary dark:text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {index + 1}. {section.title}
                    </h2>

                    {section.content.map((content, contentIndex) => (
                      <div key={contentIndex} className="mb-6">
                        {content.subtitle && (
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            {content.subtitle}
                          </h3>
                        )}
                        {content.text && (
                          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                            {content.text}
                          </p>
                        )}
                        {content.items && (
                          <ul className="space-y-2">
                            {content.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="flex items-start text-gray-700 dark:text-gray-300"
                              >
                                <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
});

PrivacyPolicy.displayName = "PrivacyPolicy";

export default PrivacyPolicy;
