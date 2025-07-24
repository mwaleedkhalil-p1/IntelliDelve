import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Brain,
  BarChart3,
  Eye,
  Cpu,
  FileText,
  MessageSquare,
  Zap,
  Globe,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Solutions() {
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      );
    }

    if (servicesRef.current) {
      gsap.fromTo(
        servicesRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
          },
        },
      );
    }
  }, []);

  const aiSolutions = [
    {
      icon: <Brain className="h-12 w-12 text-white" />,
      title: "Data Science Solutions",
      description:
        "Advanced predictive analytics and machine learning models for risk assessment and decision-making.",
      features: [
        "Predictive Analytics & Forecasting",
        "Risk Scoring Models & Fraud Detection",
        "Interactive Dashboards & Business Intelligence",

        "High-Volume Identity Verification Engines",
        "Anomaly Detection for Compliance & Fraud",
      ],
      color: "bg-blue-500",
    },
    {
      icon: <Eye className="h-12 w-12 text-white" />,
      title: "AI-Powered Tools",
      description:
        "Cutting-edge AI technologies for document processing, analysis, and verification automation.",
      features: [
        "Natural Language Processing (NLP)",
        "Computer Vision Systems",
        "Retrieval-Augmented Generation (RAG)",
        "Recommendation Engines",
        "Document Intelligence & OCR",
        "Sentiment & Intent Analysis",
        "AI-Powered Resume Ranking & Candidate Scoring",
      ],
      color: "bg-purple-500",
    },
    {
      icon: <Zap className="h-12 w-12 text-white" />,
      title: "Tech & Innovation",
      description:
        "Modern technology solutions and automation tools to streamline your business processes.",
      features: ["Business Process Automation", "Web Development"],
      color: "bg-green-500",
    },
  ];

  return (
    <div className="min-h-screen">

      <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 dark:from-brand-navy dark:to-purple-900 min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=85')`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div ref={headerRef} className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              AI & Data <span className="text-yellow-300">Intelligence</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              Data-driven insights and intelligent systems to support strategic
              decision-making and revolutionize your verification processes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI & Data Intelligence Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Harness the power of artificial intelligence and advanced
              analytics to transform your verification and risk assessment
              capabilities.
            </p>
          </div>

          <div ref={servicesRef} className="space-y-12">
            {aiSolutions.map((solution, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-brand-navy/50 rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div
                      className={`inline-flex p-4 rounded-2xl ${solution.color} mb-6`}
                    >
                      {solution.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                      {solution.description}
                    </p>
                    <button
                      className={`${solution.color} text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105`}
                    >
                      Learn More
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {solution.features.map((feature, fIndex) => (
                      <div
                        key={fIndex}
                        className="bg-white dark:bg-brand-navy rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                            {feature}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-brand-navy/50 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Technology Stack
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built on cutting-edge technologies for maximum performance,
              scalability, and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-blue-500" />,
                title: "Machine Learning",
                description: "TensorFlow, PyTorch, Scikit-learn",
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-green-500" />,
                title: "Data Analytics",
                description: "Apache Spark, Hadoop, Elasticsearch",
              },
              {
                icon: <Cpu className="h-8 w-8 text-purple-500" />,
                title: "Cloud Computing",
                description: "AWS, Azure, Google Cloud Platform",
              },
              {
                icon: <Globe className="h-8 w-8 text-orange-500" />,
                title: "API Integration",
                description: "RESTful APIs, GraphQL, Webhooks",
              },
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-white dark:bg-brand-navy rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-center mb-4">{tech.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">
                  {tech.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Verification Process?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Discover how our AI-powered solutions can revolutionize your
            background verification and risk assessment capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg">
              Schedule a Demo
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300">
              Download Whitepaper
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
