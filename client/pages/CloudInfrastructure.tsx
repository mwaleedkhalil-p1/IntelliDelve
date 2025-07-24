import React, { memo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Cloud,
  Settings,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Server,
  Database,
  Globe,
  Lock,
  TrendingUp,
  Users,
  Clock,
  Award,
  Cpu,
  HardDrive,
  Network,
  Monitor,
  GitBranch,
  Layers,
  BarChart3,
  Workflow
} from "lucide-react";
import { useCalendlyContext } from "../App";

const CloudInfrastructure = memo(() => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { openCalendly } = useCalendlyContext();

  const cloudServices = [
    {
      icon: Cloud,
      title: "Multi-Cloud Architecture",
      description: "AWS, Azure, and Google Cloud deployment and management with seamless integration",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Cross-platform compatibility", "Vendor lock-in prevention", "Cost optimization"]
    },
    {
      icon: Settings,
      title: "DevOps Automation",
      description: "CI/CD pipelines, automated testing, and deployment workflows",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Automated deployments", "Continuous integration", "Infrastructure as Code"]
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security with compliance frameworks and monitoring",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Zero-trust architecture", "Compliance automation", "Threat detection"]
    },
    {
      icon: Zap,
      title: "Auto-Scaling & Optimization",
      description: "Dynamic resource allocation and intelligent cost optimization",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Real-time scaling", "Performance monitoring", "Cost analytics"]
    }
  ];

  const infrastructureStats = [
    { label: "Uptime Guarantee", value: "99.9%", icon: TrendingUp },
    { label: "Cost Reduction", value: "40%", icon: BarChart3 },
    { label: "Deployment Speed", value: "10x", icon: Zap },
    { label: "Global Regions", value: "25+", icon: Globe }
  ];

  const cloudPlatforms = [
    {
      name: "Amazon Web Services",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      description: "Leading cloud platform with comprehensive services"
    },
    {
      name: "Microsoft Azure",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg",
      description: "Enterprise-focused cloud solutions and hybrid capabilities"
    },
    {
      name: "Google Cloud",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
      description: "AI-powered cloud infrastructure and data analytics"
    },
    {
      name: "Kubernetes",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg",
      description: "Container orchestration and microservices management"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">

        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Cloud Infrastructure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-indigo-900/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Cloud Infrastructure
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  & DevOps Solutions
                </span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Build scalable, secure, and efficient cloud infrastructure with our comprehensive DevOps solutions and automation services.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {infrastructureStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-6 h-6 text-cyan-400 mr-2" />
                      <span className="text-3xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-sm text-gray-300">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => openCalendly("Cloud Infrastructure - Schedule Consultation")}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-white transition-all duration-300"
                >
                  View Case Studies
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl p-4 text-center">
                    <Server className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">Cloud Servers</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-indigo-600/20 rounded-xl p-4 text-center">
                    <Database className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">Databases</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl p-4 text-center">
                    <Network className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">Networking</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-xl p-4 text-center">
                    <Monitor className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">Monitoring</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Comprehensive Cloud Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From infrastructure design to deployment automation, we provide end-to-end cloud solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {cloudServices.map((service, index) => (
              <div key={index} className="group bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Multi-Cloud Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We work with leading cloud platforms to deliver the best solution for your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cloudPlatforms.map((platform, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {platform.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {platform.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              DevOps Workflow
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Streamlined development and deployment processes for faster time-to-market
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full transform -translate-y-1/2 hidden lg:block"></div>

            <div className="grid lg:grid-cols-5 gap-8">
              {[
                { icon: GitBranch, title: "Code", description: "Version control and collaboration", color: "blue" },
                { icon: Workflow, title: "Build", description: "Automated testing and integration", color: "purple" },
                { icon: Layers, title: "Deploy", description: "Containerized deployment", color: "green" },
                { icon: Monitor, title: "Monitor", description: "Real-time performance tracking", color: "orange" },
                { icon: Settings, title: "Optimize", description: "Continuous improvement", color: "red" }
              ].map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-20 h-20 mx-auto mb-6 relative z-10">
                    <div className={`w-full h-full bg-gradient-to-br ${
                      step.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                      step.color === 'purple' ? 'from-purple-500 to-indigo-500' :
                      step.color === 'green' ? 'from-green-500 to-emerald-500' :
                      step.color === 'orange' ? 'from-orange-500 to-yellow-500' :
                      'from-red-500 to-pink-500'
                    } rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-gray-800 rounded-full border-4 border-gray-100 dark:border-gray-700 flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{index + 1}</span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 min-h-[120px] flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Our Cloud Solutions?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Transform your infrastructure with cloud solutions that scale with your business and accelerate innovation.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {[
                  "Reduced infrastructure costs by up to 40%",
                  "Enhanced scalability and flexibility",
                  "99.9% uptime with automated failover",
                  "Faster deployment and time-to-market",
                  "Improved security and compliance posture",
                  "24/7 monitoring and proactive maintenance",
                  "Disaster recovery and business continuity",
                  "Global reach with edge computing capabilities"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Cloud Infrastructure Benefits"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Trusted by organizations across diverse sectors for mission-critical cloud infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Software & Technology", icon: Cpu },
              { name: "Financial Services", icon: Shield },
              { name: "Healthcare & Life Sciences", icon: Users },
              { name: "E-commerce & Retail", icon: Globe },
              { name: "Media & Entertainment", icon: Monitor },
              { name: "Manufacturing & IoT", icon: Settings },
              { name: "Startups & Scale-ups", icon: TrendingUp },
              { name: "Enterprise & Government", icon: Award }
            ].map((industry, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
                <industry.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {industry.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Infrastructure?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Let's design and implement a cloud solution that scales with your business and accelerates your digital transformation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openCalendly("Cloud Infrastructure - Ready to Transform")}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Contact Our Experts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});

CloudInfrastructure.displayName = "CloudInfrastructure";

export default CloudInfrastructure;
