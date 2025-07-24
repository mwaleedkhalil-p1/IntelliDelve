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
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Careers() {
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#open-positions') {
      setTimeout(() => {
        const element = document.getElementById('open-positions');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

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
      title: "Expression of Interest",
      department: "All Departments",
      location: "Remote / Islamabad",
      type: "Full-time / Part-time",
      experience: "All Levels",
      description: "We're hiring at IntelliDelve! Explore roles in Software Development, AI Engineering, HR, Investigations, Operations Management, and Field Investigations. If you're passionate about tech, compliance, or risk intelligence, we want to hear from you.",
      requirements: ["Submit your resume and cover letter to careers@intellidelve.com", "Specify your area of interest", "Include relevant experience and skills", "Show passion for technology and innovation"],
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

  const culturePerks = [
    {
      icon: <MapPin className="h-8 w-8 text-blue-500" />,
      title: "Flexible remote and hybrid work options",
    },
    {
      icon: <Heart className="h-8 w-8 text-green-500" />,
      title: "Comprehensive health and wellness benefits",
    },
    {
      icon: <Coffee className="h-8 w-8 text-purple-500" />,
      title: "Professional development and learning opportunities",
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Equity participation and performance bonuses",
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Inclusive and diverse workplace culture",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Careers - Join Our Team"
        description="Join IntelliDelve and help shape the future of AI-powered background verification. Explore exciting career opportunities in a remote-first, innovative environment."
        keywords="careers, jobs, employment, AI jobs, machine learning careers, remote work, software engineer jobs, data scientist positions"
      />

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-brand-navy dark:via-brand-navy/90 dark:to-purple-900/20 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 dark:opacity-40"
          style={{
            backgroundImage: `url('/images/downloaded/unsplash-photo-1522202176988-66273c2fd55f.jpg')`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                key={`job-${index}-${job.title}`}
                className="job-card bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
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
                      href={`mailto:careers@intellidelve.com?subject=Application for ${encodeURIComponent(job.title)}&body=Dear IntelliDelve Team,%0D%0A%0D%0AI am interested in applying for the ${encodeURIComponent(job.title)} position.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0ABest regards`}
                      className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 font-medium inline-block transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      rel="noopener noreferrer"
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

      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Life at IntelliDelve
              </h2>
              <div className="space-y-4">
                {culturePerks.map((perk, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-all duration-300"
                  >
                    {perk.icon}
                    <span className="text-lg">{perk.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/istockphoto-932275488-612x612.jpg"
                alt="Life at IntelliDelve - Team Collaboration and Innovation"
                className="w-full h-auto rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
