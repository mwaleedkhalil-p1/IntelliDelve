import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEO } from "../components/SEO";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Heart,
  Coffee,
  Laptop,
  GraduationCap,
  Award,
  Globe,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Careers() {
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      // Benefits animation
      gsap.fromTo(
        ".benefit-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 80%",
          },
        }
      );

      // Job cards animation
      gsap.fromTo(
        ".job-card",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".jobs-grid",
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs",
    },
    {
      icon: <Laptop className="h-8 w-8" />,
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours and modern collaboration tools",
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Learning & Development",
      description: "Continuous learning opportunities, conferences, and skill development programs",
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Competitive Compensation",
      description: "Market-leading salaries, equity options, and performance bonuses",
    },
    {
      icon: <Coffee className="h-8 w-8" />,
      title: "Work-Life Balance",
      description: "Unlimited PTO, sabbatical options, and family-friendly policies",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Recognition & Growth",
      description: "Clear career paths, mentorship programs, and achievement recognition",
    },
  ];

  const openPositions = [
    {
      title: "Senior AI/ML Engineer",
      department: "Engineering",
      location: "Remote / Islamabad",
      type: "Full-time",
      experience: "5+ years",
      description: "Lead the development of AI-powered background verification systems and machine learning models.",
      requirements: ["Python, TensorFlow/PyTorch", "ML/AI experience", "Background in NLP", "Cloud platforms (AWS/Azure)"],
    },
    {
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Remote / Islamabad",
      type: "Full-time",
      experience: "3+ years",
      description: "Build and maintain our web applications using modern technologies and frameworks.",
      requirements: ["React/TypeScript", "Node.js/Express", "Database design", "API development"],
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote / Islamabad",
      type: "Full-time",
      experience: "4+ years",
      description: "Drive product strategy and roadmap for our background verification platform.",
      requirements: ["Product management experience", "Technical background", "User research skills", "Agile methodologies"],
    },
    {
      title: "Data Scientist",
      department: "Data Science",
      location: "Remote / Islamabad",
      type: "Full-time",
      experience: "3+ years",
      description: "Analyze large datasets to improve our verification algorithms and business insights.",
      requirements: ["Python/R", "Statistical analysis", "Data visualization", "Machine learning"],
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote / Islamabad",
      type: "Full-time",
      experience: "4+ years",
      description: "Manage our cloud infrastructure and deployment pipelines for scalable operations.",
      requirements: ["AWS/Azure", "Docker/Kubernetes", "CI/CD pipelines", "Infrastructure as Code"],
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote / Islamabad",
      type: "Full-time",
      experience: "3+ years",
      description: "Design intuitive user experiences for our verification platform and client dashboards.",
      requirements: ["Figma/Sketch", "User research", "Prototyping", "Design systems"],
    },
  ];

  const companyValues = [
    {
      icon: <Users className="h-12 w-12" />,
      title: "Collaboration",
      description: "We believe in the power of teamwork and diverse perspectives to solve complex challenges.",
    },
    {
      icon: <TrendingUp className="h-12 w-12" />,
      title: "Innovation",
      description: "We continuously push boundaries with cutting-edge technology and creative solutions.",
    },
    {
      icon: <Globe className="h-12 w-12" />,
      title: "Global Impact",
      description: "Our work helps organizations worldwide make safer, more informed decisions.",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Careers - Join Our Team"
        description="Join IntelliDelve and help shape the future of AI-powered background verification. Explore exciting career opportunities in a remote-first, innovative environment."
        keywords="careers, jobs, employment, AI jobs, machine learning careers, remote work, software engineer jobs, data scientist positions"
      />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-brand-navy dark:via-brand-navy/90 dark:to-purple-900/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Build the Future of <span className="text-primary dark:text-sky-300">Verification</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Join our mission to revolutionize background verification with AI. Work with cutting-edge technology 
              in a remote-first environment that values innovation, growth, and work-life balance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#open-positions"
                className="bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 font-medium transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View Open Positions
              </a>
              <a
                href="mailto:careers@intellidelve.com"
                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 font-medium"
              >
                Contact HR
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 dark:bg-sky-300/10 rounded-full text-primary dark:text-sky-300">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="py-20 bg-gray-50 dark:bg-brand-navy/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Work With Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive benefits and perks that support your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-card bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/10 dark:bg-sky-300/10 rounded-full text-primary dark:text-sky-300 mr-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find your next opportunity with us
            </p>
          </div>

          <div className="jobs-grid space-y-6">
            {openPositions.map((job, index) => (
              <div
                key={index}
                className="job-card bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {job.department}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {job.experience}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <a
                      href={`mailto:careers@intellidelve.com?subject=Application for ${job.title}`}
                      className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 font-medium inline-block"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {job.description}
                </p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Key Requirements:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, reqIndex) => (
                      <span
                        key={reqIndex}
                        className="bg-primary/10 dark:bg-sky-300/10 text-primary dark:text-sky-300 px-3 py-1 rounded-full text-sm"
                      >
                        {req}
                      </span>
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
}
