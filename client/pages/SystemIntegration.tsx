import React, { memo, useEffect, useRef } from "react";
import {
  Network,
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Link as LinkIcon,
  Database,
  Cloud,
  Settings,
  Layers,
  GitBranch,
  Server,
  Cpu,
  Globe,
  Workflow,
  Activity,
  Lock,
  Monitor,
  Building,
  Heart,
  Factory,
  ShoppingCart,
  Users,
  GraduationCap,
  FileCheck,
  Laptop
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useCalendlyContext } from "../App";
import { SEO } from "../components/SEO";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SystemIntegration = memo(() => {
  const { openCalendly } = useCalendlyContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)" }
      );
    }

    if (networkRef.current) {
      gsap.fromTo(
        networkRef.current.children,
        { opacity: 0, scale: 0, rotation: 180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: networkRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { opacity: 0, x: (index) => (index % 2 === 0 ? -100 : 100), y: 50 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 75%",
          },
        }
      );
    }

    if (benefitsRef.current) {
      gsap.fromTo(
        benefitsRef.current.children,
        { opacity: 0, y: 30, rotationX: -15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (processRef.current) {
      gsap.fromTo(
        processRef.current.children,
        { opacity: 0, scale: 0.5, rotation: 90 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const keyFeatures = [
    {
      icon: Network,
      title: "API Development & Management",
      description: "RESTful and GraphQL APIs with comprehensive documentation and versioning",
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      icon: Zap,
      title: "Real-time Integration",
      description: "Live data synchronization between multiple systems and platforms",
      gradient: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50 dark:bg-teal-900/20"
    },
    {
      icon: Database,
      title: "Data Transformation",
      description: "ETL processes and data mapping for seamless information flow",
      gradient: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20"
    },
    {
      icon: Shield,
      title: "Secure Connections",
      description: "Enterprise-grade security with encrypted data transmission",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: Activity,
      title: "Performance Monitoring",
      description: "Real-time monitoring and analytics for all integration endpoints",
      gradient: "from-lime-500 to-green-500",
      bgColor: "bg-lime-50 dark:bg-lime-900/20"
    },
    {
      icon: Workflow,
      title: "Process Automation",
      description: "Automated workflows and business process orchestration",
      gradient: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
    },
  ];

  const integrationProcess = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description: "Comprehensive assessment of existing systems and integration requirements",
      icon: Settings,
      color: "emerald"
    },
    {
      step: "02",
      title: "Architecture Design",
      description: "Design scalable integration architecture and data flow patterns",
      icon: Layers,
      color: "teal"
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Build custom APIs and configure third-party integrations with testing",
      icon: GitBranch,
      color: "cyan"
    },
    {
      step: "04",
      title: "Deployment & Monitoring",
      description: "Production deployment with continuous monitoring and optimization",
      icon: Cloud,
      color: "green"
    }
  ];

  const networkNodes = [
    { id: 1, label: "CRM", icon: Database, position: "top-left" },
    { id: 2, label: "ERP", icon: Server, position: "top-right" },
    { id: 3, label: "API Gateway", icon: Network, position: "center" },
    { id: 4, label: "Analytics", icon: BarChart3, position: "bottom-left" },
    { id: 5, label: "Cloud", icon: Cloud, position: "bottom-right" },
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
    <>
      <SEO
        title="System Integration Services - IntelliDelve"
        description="Professional system integration services connecting your business applications, databases, and platforms for seamless data flow and operational efficiency."
        keywords="system integration, API integration, enterprise integration, data integration, application connectivity, system architecture"
        canonicalUrl="/system-integration"
      />
      <div className="min-h-screen">

      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900">

        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-5"></div>

          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="circuit" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 0 10 L 10 10 L 10 0 M 10 10 L 20 10 M 10 10 L 10 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  <circle cx="10" cy="10" r="1" fill="currentColor"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#circuit)" />
            </svg>
          </div>

          <div className="absolute top-20 left-20 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-teal-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-cyan-400 rounded-full animate-pulse delay-2000"></div>

          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
            <line x1="200" y1="200" x2="400" y2="350" stroke="#10b981" strokeWidth="2" className="animate-pulse"/>
            <line x1="400" y1="350" x2="700" y2="250" stroke="#14b8a6" strokeWidth="2" className="animate-pulse delay-500"/>
            <line x1="700" y1="250" x2="800" y2="500" stroke="#06b6d4" strokeWidth="2" className="animate-pulse delay-1000"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-6 py-3 bg-emerald-500/20 rounded-full border border-emerald-400/30 backdrop-blur-sm">
                  <Network className="w-5 h-5 mr-3 text-emerald-400" />
                  <span className="font-medium text-emerald-300">System Integration & API Development</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block">Integrate</span>
                  <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Everything
                  </span>
                  <span className="block">Effortlessly</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                  Connect your business systems seamlessly with our comprehensive integration solutions and robust API development services.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => openCalendly("System Integration Services - Schedule Meeting")}
                  className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Schedule a Meeting
                    <Users className="ml-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>

                <Link
                  to="/partners"
                  className="px-8 py-4 border-2 border-emerald-400/50 rounded-2xl font-bold text-emerald-300 backdrop-blur-sm hover:bg-emerald-400/10 transition-all duration-300 inline-flex items-center justify-center"
                >
                  Partner with Us
                  <Network className="ml-3 w-5 h-5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-emerald-400/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400">500+</div>
                  <div className="text-sm text-gray-400">APIs Integrated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-400">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime SLA</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">{"< 50ms"}</div>
                  <div className="text-sm text-gray-400">Response Time</div>
                </div>
              </div>
            </div>

            <div className="relative">

              <div ref={networkRef} className="relative w-full h-96 bg-gradient-to-br from-emerald-900/30 to-teal-900/30 rounded-3xl border border-emerald-400/20 backdrop-blur-sm p-8">

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Network className="w-8 h-8 text-white" />
                </div>

                {networkNodes.map((node, index) => (
                  <div
                    key={node.id}
                    className={`absolute w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg ${
                      node.position === 'top-left' ? 'top-4 left-4' :
                      node.position === 'top-right' ? 'top-4 right-4' :
                      node.position === 'bottom-left' ? 'bottom-4 left-4' :
                      node.position === 'bottom-right' ? 'bottom-4 right-4' :
                      'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                    }`}
                  >
                    <node.icon className="w-6 h-6 text-white" />
                  </div>
                ))}

                <svg className="absolute inset-0 w-full h-full">
                  <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#10b981" strokeWidth="2" className="animate-pulse"/>
                  <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#14b8a6" strokeWidth="2" className="animate-pulse delay-500"/>
                  <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#06b6d4" strokeWidth="2" className="animate-pulse delay-1000"/>
                  <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#0891b2" strokeWidth="2" className="animate-pulse delay-1500"/>
                </svg>

                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-lg px-3 py-1 border border-white/20">
                  <span className="text-xs text-white font-medium">API Gateway</span>
                </div>
              </div>

              <div className="absolute -top-6 -left-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">Real-time Sync</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-emerald-400" />
                  <span className="text-white text-sm font-medium">Secure APIs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/10 dark:to-teal-900/10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
                  <Network className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">What We Do</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Connecting Your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                    Digital Ecosystem
                  </span>
                </h2>

                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  We bridge the gap between disparate systems, creating seamless data flows and unified business processes that drive efficiency and innovation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <Link className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">API Development</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">RESTful & GraphQL APIs</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Data Synchronization</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Real-time data flows</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Cloud className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Cloud Integration</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Multi-cloud connectivity</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Custom Connectors</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Bespoke integrations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="System Integration Architecture"
                className="relative w-full h-auto rounded-2xl shadow-2xl"
              />

              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">500+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Integrations</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">99.9%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-brand-navy/50 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Integration Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive integration solutions that connect your business systems seamlessly
            </p>
          </div>

          <div ref={featuresRef} className="grid lg:grid-cols-2 gap-8">
            {keyFeatures.map((feature, index) => (
              <div key={index} className={`bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`p-3 rounded-xl bg-${feature.color}-100 dark:bg-${feature.color}-900/30`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Integration Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A systematic approach that ensures successful system integration from planning to deployment
            </p>
          </div>

          <div ref={processRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {integrationProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-900">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-brand-navy/50 dark:to-indigo-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/Website pictures/14587.jpg"
                alt="Integration Benefits"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Integrate Your Systems?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                In today's digital landscape, businesses rely on multiple software systems to operate efficiently. However, when these systems work in isolation, they create data silos that hinder productivity and decision-making. System integration breaks down these barriers.
              </p>
              <div ref={benefitsRef} className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our integration solutions power businesses across diverse industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Financial Services & Banking", icon: Building },
              { name: "Healthcare & Life Sciences", icon: Heart },
              { name: "Manufacturing & Supply Chain", icon: Factory },
              { name: "Retail & E-commerce", icon: ShoppingCart },
              { name: "Government & Public Sector", icon: Users },
              { name: "Education & Research", icon: GraduationCap },
              { name: "Insurance & Risk Management", icon: FileCheck },
              { name: "Technology & Software", icon: Laptop }
            ].map((industry, index) => (
              <div key={index} className="bg-gray-50 dark:bg-brand-navy/50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow group">
                <industry.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {industry.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-indigo-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Connect Your Systems?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let's discuss your integration needs and create a unified technology ecosystem for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openCalendly("System Integration Services - Schedule Meeting")}
              className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              Schedule a Meeting
            </button>
            <Link
              to="/partners"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors inline-flex items-center justify-center"
            >
              Partner with Us
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
});

SystemIntegration.displayName = "SystemIntegration";

export default SystemIntegration;
