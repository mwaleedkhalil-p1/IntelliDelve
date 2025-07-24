import React, { memo, useEffect, useRef } from "react";
import {
  Database,
  ArrowRightLeft,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Cloud,
  Server,
  HardDrive,
  Settings,
  Layers,
  FileText,
  Upload,
  Download,
  Zap,
  Lock,
  Activity,
  TrendingUp,
  Globe,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCalendlyContext } from "../App";
import { SEO } from "../components/SEO";

gsap.registerPlugin(ScrollTrigger);

const DataMigration = memo(() => {
  const { openCalendly } = useCalendlyContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)" }
      );
    }

    if (dashboardRef.current) {
      gsap.fromTo(
        dashboardRef.current.children,
        { opacity: 0, y: 50, rotationY: 45 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: dashboardRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { opacity: 0, x: (index) => (index % 2 === 0 ? -100 : 100), scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
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
        { opacity: 0, y: 30, rotationX: -10 },
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
        { opacity: 0, scale: 0.3, rotation: 45 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.2,
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
      icon: Database,
      title: "Multi-Platform Support",
      description: "Migrate data between any databases, cloud platforms, and systems",
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      icon: ArrowRightLeft,
      title: "Zero-Downtime Migration",
      description: "Seamless transitions with minimal business disruption",
      gradient: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    },
    {
      icon: Shield,
      title: "Data Integrity Assurance",
      description: "Comprehensive validation and quality checks throughout",
      gradient: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      icon: BarChart3,
      title: "Analytics Platform Setup",
      description: "Complete analytics infrastructure with dashboards and reports",
      gradient: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    {
      icon: Cloud,
      title: "Cloud-Native Architecture",
      description: "Modern cloud infrastructure with auto-scaling capabilities",
      gradient: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance with industry standards",
      gradient: "from-red-500 to-orange-500",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    },
  ];

  const migrationProcess = [
    {
      step: "01",
      title: "Data Discovery",
      description: "Comprehensive analysis of existing data sources and structures",
      icon: Database,
      color: "orange"
    },
    {
      step: "02",
      title: "Migration Planning",
      description: "Strategic roadmap with risk assessment and timeline",
      icon: Settings,
      color: "red"
    },
    {
      step: "03",
      title: "Data Transfer",
      description: "Secure, monitored migration with real-time validation",
      icon: FileText,
      color: "amber"
    },
    {
      step: "04",
      title: "Validation & Go-Live",
      description: "Quality assurance testing and production deployment",
      icon: CheckCircle,
      color: "yellow"
    }
  ];

  const dashboardMetrics = [
    { label: "Data Transferred", value: "2.5TB", icon: Upload, color: "orange" },
    { label: "Migration Speed", value: "1.2GB/s", icon: Zap, color: "red" },
    { label: "Success Rate", value: "99.9%", icon: TrendingUp, color: "amber" },
    { label: "Downtime", value: "< 5min", icon: Activity, color: "yellow" },
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
    <>
      <SEO
        title="Data Migration & Analytics Services - IntelliDelve"
        description="Professional data migration and analytics services. Seamless data transfer, cloud migration, and advanced analytics platform development."
        keywords="data migration, cloud migration, data analytics, database migration, data transfer, analytics platform, data warehouse"
        canonicalUrl="/data-migration"
      />
      <div className="min-h-screen">

      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-orange-900 to-red-900">

        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>

          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="dataflow" width="25" height="25" patternUnits="userSpaceOnUse">
                  <rect width="25" height="25" fill="none"/>
                  <circle cx="12.5" cy="12.5" r="1" fill="currentColor" opacity="0.5"/>
                  <path d="M5,12.5 L20,12.5 M12.5,5 L12.5,20" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#dataflow)" />
            </svg>
          </div>

          <div className="absolute top-20 left-20 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-amber-400 rounded-full animate-pulse delay-2000"></div>

          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000">
            <path d="M100,300 Q300,200 500,300 T900,300" stroke="#f97316" strokeWidth="3" fill="none" className="animate-pulse"/>
            <path d="M100,500 Q300,400 500,500 T900,500" stroke="#ef4444" strokeWidth="3" fill="none" className="animate-pulse delay-1000"/>
            <path d="M100,700 Q300,600 500,700 T900,700" stroke="#f59e0b" strokeWidth="3" fill="none" className="animate-pulse delay-2000"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-6 py-3 bg-orange-500/20 rounded-full border border-orange-400/30 backdrop-blur-sm">
                  <Database className="w-5 h-5 mr-3 text-orange-400" />
                  <span className="font-medium text-orange-300">Data Migration & Cloud Infrastructure</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block">Migrate Your</span>
                  <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
                    Data Safely
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                  Seamlessly migrate your data to modern cloud platforms with zero downtime and complete data integrity.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/partners"
                  className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Migration
                    <Upload className="ml-3 w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>

                <button
                  onClick={() => openCalendly("Data Migration & Analytics - Schedule Meeting")}
                  className="px-8 py-4 border-2 border-orange-400/50 rounded-2xl font-bold text-orange-300 backdrop-blur-sm hover:bg-orange-400/10 transition-all duration-300"
                >
                  Schedule Meeting
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-orange-400/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">10PB+</div>
                  <div className="text-sm text-gray-400">Data Migrated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">99.99%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">Zero</div>
                  <div className="text-sm text-gray-400">Data Loss</div>
                </div>
              </div>
            </div>

            <div className="relative">

              <div ref={dashboardRef} className="relative w-full h-96 bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-3xl border border-orange-400/20 backdrop-blur-sm p-6">

                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-lg">Migration Dashboard</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Live</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {dashboardMetrics.map((metric, index) => (
                    <div key={index} className="bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-xl p-4 border border-orange-400/30">
                      <div className="flex items-center justify-between mb-2">
                        <metric.icon className="w-5 h-5 text-orange-400" />
                        <span className="text-2xl font-bold text-orange-400">{metric.value}</span>
                      </div>
                      <div className="text-xs text-gray-400">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Migration Progress</span>
                    <span>87%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-200"></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-400"></div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-orange-400" />
                  <Cloud className="w-5 h-5 text-orange-400" />
                </div>
              </div>

              <div className="absolute -top-6 -left-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">Zero Downtime</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-orange-400" />
                  <span className="text-white text-sm font-medium">Data Integrity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/10 dark:to-red-900/10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6">
                  <Database className="w-4 h-4 mr-2 text-orange-600 dark:text-orange-400" />
                  <span className="text-sm font-medium text-orange-700 dark:text-orange-300">What We Do</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Transforming Your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                    Data Infrastructure
                  </span>
                </h2>

                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  We specialize in seamless data migration and cloud infrastructure transformation, ensuring your business data is secure, accessible, and optimized for modern analytics.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Cloud className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Cloud Migration</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">AWS, Azure, GCP</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-amber-500 rounded-xl flex items-center justify-center">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Database Migration</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Zero downtime transfers</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Analytics Platform</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Business intelligence</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Data Security</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise encryption</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Data Migration Infrastructure"
                className="relative w-full h-auto rounded-2xl shadow-2xl"
              />

              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">10PB+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Migrated</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">99.99%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
              <Zap className="w-4 h-4 mr-2 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-700 dark:text-red-300">Our Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Advanced Migration
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Technologies
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cutting-edge tools and methodologies for secure, efficient data migration
            </p>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <div key={index} className={`group relative ${feature.bgColor} rounded-3xl p-8 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl`}>

                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 transition-all duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-amber-600"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Modernize Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Data Infrastructure?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-orange-100 mb-12 leading-relaxed">
              Let's discuss your migration needs and create a seamless transition plan for your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                to="/partners"
                className="group relative px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Start Migration
                  <Upload className="ml-3 w-6 h-6 group-hover:translate-y-1 transition-transform" />
                </span>
              </Link>

              <button
                onClick={() => openCalendly("Data Migration & Analytics - Schedule Assessment")}
                className="px-10 py-5 border-2 border-white/30 text-white rounded-2xl font-bold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                Schedule Assessment
              </button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-white/80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Zero Data Loss</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Minimal Downtime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
});

DataMigration.displayName = "DataMigration";

export default DataMigration;
