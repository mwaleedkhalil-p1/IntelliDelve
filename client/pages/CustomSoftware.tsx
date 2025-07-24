import React, { memo, useEffect, useRef } from "react";
import {
  Code,
  Zap,
  Users,
  Shield,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Globe,
  Database,
  Settings,
  Layers,
  Rocket,
  Monitor,
  Cpu,
  Palette,
  Workflow,
  Star,
  Award,
  Target,
  Building,
  Heart,
  Factory,
  ShoppingCart,
  GraduationCap,
  Truck,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useCalendlyContext } from "../App";
import { SEO } from "../components/SEO";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CustomSoftware = memo(() => {
  const { openCalendly } = useCalendlyContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)" }
      );
    }

    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { opacity: 0, y: 50, rotationX: -15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
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
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
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
        { opacity: 0, scale: 0.5, rotation: 180 },
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

    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const keyFeatures = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "End-to-end development using modern technologies and frameworks",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Palette,
      title: "UI/UX Excellence",
      description: "Beautiful, intuitive interfaces designed for optimal user experience",
      gradient: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50 dark:bg-pink-900/20"
    },
    {
      icon: Zap,
      title: "Performance Optimized",
      description: "Lightning-fast applications built for speed and scalability",
      gradient: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with advanced encryption and compliance",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: Workflow,
      title: "Agile Development",
      description: "Iterative development with continuous client collaboration",
      gradient: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      icon: Cpu,
      title: "AI Integration",
      description: "Smart features powered by artificial intelligence and machine learning",
      gradient: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20"
    },
  ];

  const developmentProcess = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description: "Deep dive into your business needs, user research, and technical requirements",
      icon: Settings,
      color: "blue"
    },
    {
      step: "02",
      title: "Design & Architecture",
      description: "Create stunning designs and robust system architecture",
      icon: Layers,
      color: "purple"
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Agile development with continuous integration and testing",
      icon: Code,
      color: "green"
    },
    {
      step: "04",
      title: "Launch & Scale",
      description: "Seamless deployment with ongoing optimization and support",
      icon: Rocket,
      color: "orange"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Delivered", icon: Rocket },
    { number: "98%", label: "Client Satisfaction", icon: Users },
    { number: "24/7", label: "Support Available", icon: Shield },
    { number: "50+", label: "Technologies Mastered", icon: Code }
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
    <>
      <SEO
        title="Custom Software Development Services - IntelliDelve"
        description="Professional custom software development services. Tailored solutions, scalable architecture, and cutting-edge technology for your business needs."
        keywords="custom software development, bespoke software, software solutions, application development, web development, mobile development"
        canonicalUrl="/custom-software"
      />
      <div className="min-h-screen">

      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">

        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center opacity-10"></div>

          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/95 to-pink-900/90"></div>

          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-indigo-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>

          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-6 py-3 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                  <Code className="w-5 h-5 mr-3 text-blue-300" />
                  <span className="font-medium text-white">Custom Software Development</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block">Craft Digital</span>
                  <span className="block bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                    Excellence
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                  Transform your business vision into powerful, scalable software solutions that drive innovation and accelerate growth.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/partners"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Your Project
                    <Rocket className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>

                <button
                  onClick={() => openCalendly("Custom Software Development - Schedule Meeting")}
                  className="px-8 py-4 border-2 border-white/30 rounded-2xl font-bold text-white backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  Schedule Meeting
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-8 border-t border-white/20">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-300">500+ Projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-300">Award Winning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-300">98% Success Rate</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Software Development Team"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-xl"></div>
              </div>

              <div className="absolute -top-8 -left-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-bounce">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">React & Node.js</span>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-bounce delay-1000">
                <div className="flex items-center space-x-3">
                  <Database className="w-6 h-6 text-blue-400" />
                  <span className="text-white font-medium">Cloud Native</span>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-bounce delay-2000">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-purple-400" />
                  <span className="text-white font-medium">Enterprise Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
                  <Code className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">What We Do</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Building Tomorrow's
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Software Today
                  </span>
                </h2>

                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  We don't just write code – we architect digital experiences that transform businesses. Our custom software solutions are meticulously crafted to align with your vision and exceed your expectations.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Web Applications</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Responsive, scalable solutions</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Mobile Apps</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Native & cross-platform</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Enterprise Systems</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Complex business automation</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">API Integration</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Seamless connectivity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <img
                src="/Website pictures/12341514.jpg"
                alt="Custom Software Development Process"
                className="relative w-full h-auto rounded-2xl shadow-2xl"
              />

              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">98%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
              <Zap className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Our Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Our
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Development Team
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We combine cutting-edge technology with proven methodologies to deliver exceptional software solutions
            </p>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <div key={index} className={`group relative ${feature.bgColor} rounded-3xl p-8 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl`}>

                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
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

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <Workflow className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Our Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              From Concept to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Reality
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our proven development methodology ensures your project succeeds at every stage
            </p>
          </div>

          <div className="relative">

            <div className="absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full hidden lg:block"></div>

            <div ref={processRef} className="grid lg:grid-cols-4 gap-8">
              {developmentProcess.map((step, index) => (
                <div key={index} className="relative text-center">

                  <div className="w-20 h-20 mx-auto mb-6 relative z-10">
                    <div className={`w-full h-full bg-gradient-to-br ${
                      step.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                      step.color === 'purple' ? 'from-purple-500 to-indigo-500' :
                      step.color === 'green' ? 'from-green-500 to-emerald-500' :
                      'from-orange-500 to-red-500'
                    } rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>

                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-gray-800 rounded-full border-4 border-gray-100 dark:border-gray-700 flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{step.step}</span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Benefits</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  Custom Development
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                In today's competitive landscape, one-size-fits-all solutions often fall short. Custom software gives you the competitive edge you need.
              </p>
              <div ref={benefitsRef} className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80"
                alt="Software Development Benefits"
                className="relative w-full h-auto rounded-2xl shadow-2xl"
              />

              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <Users className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Industries</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted Across
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Industries
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our custom software solutions power businesses across diverse industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Financial Services", icon: Building, color: "from-yellow-400 to-orange-500" },
              { name: "Healthcare", icon: Heart, color: "from-green-400 to-blue-500" },
              { name: "Manufacturing", icon: Factory, color: "from-gray-400 to-gray-600" },
              { name: "E-commerce", icon: ShoppingCart, color: "from-purple-400 to-pink-500" },
              { name: "Education", icon: GraduationCap, color: "from-blue-400 to-indigo-500" },
              { name: "Real Estate", icon: Building, color: "from-teal-400 to-cyan-500" },
              { name: "Logistics", icon: Truck, color: "from-red-400 to-pink-500" },
              { name: "Professional Services", icon: Briefcase, color: "from-indigo-400 to-purple-500" }
            ].map((industry, index) => (
              <div key={index} className="group bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${industry.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <industry.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {industry.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Build Something
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Extraordinary?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-indigo-100 mb-12 leading-relaxed">
              Let's transform your vision into a powerful digital solution that drives growth and innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                to="/partners"
                className="group relative px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Start Your Project
                  <Rocket className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Link>

              <button
                onClick={() => openCalendly("Custom Software Development - Schedule Consultation")}
                className="px-10 py-5 border-2 border-white/30 text-white rounded-2xl font-bold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                Schedule Consultation
              </button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-white/80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No Hidden Costs</span>
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

CustomSoftware.displayName = "CustomSoftware";

export default CustomSoftware;
