import React, { memo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Search,
  Brain,
  Code,
  Globe,
  Users,
  Award,
  Target,
  Lock,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
} from "lucide-react";
import { useCalendlyContext } from "../App";
import { useVideoScrollControl } from "../hooks/useVideoScrollControl";
import { SEO } from "@/components/SEO";

const AnimatedCounter = memo<{ value: number; suffix?: string }>(
  ({ value, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.5 },
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (isVisible) {
        const duration = 2000;
        const start = 0;
        const end = value;
        const range = end - start;
        let startTime: number;

        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const currentValue = Math.floor(start + range * progress);

          setCount(currentValue);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }
    }, [isVisible, value]);

    return (
      <div ref={ref} className="inline-block">
        {count}
        {suffix}
      </div>
    );
  },
);

AnimatedCounter.displayName = "AnimatedCounter";

const VideoPlayer = memo(() => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { videoRef, containerRef } = useVideoScrollControl({
    volume: 0.1, // 10% volume
    autoPauseOnScroll: true,
    visibilityThreshold: 0.3,
    autoResumeOnScroll: false,
    onVisibilityChange: (isVisible) => {
      if (!isVisible && isPlaying) {
        setIsPlaying(false);
      }
    },
  });

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          // Handle autoplay restrictions
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseEnter = () => {
    setShowControls(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1000);
  };

  useEffect(() => {
    // Auto-play video when component mounts
    const video = videoRef.current;
    if (video) {
      const playVideo = async () => {
        try {
          await video.play();
          setIsPlaying(true);
        } catch (error) {
          console.warn("Autoplay failed:", error);
          // Autoplay might be blocked by browser policy
        }
      };

      // Small delay to ensure video is loaded
      const timer = setTimeout(playVideo, 100);
      return () => clearTimeout(timer);
    }

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="w-full h-64 md:h-80 object-cover"
        autoPlay
        muted={false}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
      >
        <source src="/ID promotion.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Play/Pause Control */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        <button
          onClick={togglePlay}
          className="bg-primary/80 hover:bg-primary text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
        </button>
      </div>
    </div>
  );
});

VideoPlayer.displayName = "VideoPlayer";

const AboutUs = memo(() => {
  const { openCalendly } = useCalendlyContext();

  const stats = [
    { value: 170, suffix: "+", label: "Countries Covered" },
    { value: 16, suffix: "+", label: "Specialized Industries" },
    { value: 99, suffix: ".7%", label: "Accuracy Rate" },
    { value: 24, suffix: "/7", label: "Support Available" },
  ];

  const capabilities = [
    {
      icon: Shield,
      title: "Background Screening & Global Verification",
      description:
        "Comprehensive employment, education, criminal record, identity, and reputation checks—delivered securely, locally, and in full compliance with global regulations.",
    },
    {
      icon: Search,
      title: "Due Diligence & Risk Compliance",
      description:
        "In-depth intelligence on vendors, investments, and partnerships. We help you meet KYC, AML, GDPR, ISO, and local compliance standards with confidence.",
    },
    {
      icon: Target,
      title: "Fraud Detection & Insider Risk Investigations",
      description:
        "Expose misconduct and high-risk behavior through forensic-grade investigations, digital footprint tracing, and behavioral risk modeling.",
    },
    {
      icon: Brain,
      title: "AI & Data Science Solutions",
      description:
        "Leverage real-time risk scoring, predictive analytics, natural language processing (NLP), and anomaly detection to make proactive, data-backed decisions.",
    },
    {
      icon: Code,
      title: "Tech & Innovation Services",
      description:
        "Deploy automated dashboards, identity verification engines (OCR, facial recognition), cloud-native platforms, and custom-built CRMs for end-to-end risk management.",
    },
  ];

  const features = [
    "AI-Driven Verification Engines that improve accuracy and reduce manual effort",
    "Cross-Border Compliance Expertise aligned with KYC, AML, ISO, CBI, and GDPR",
    "Real-Time Dashboards for transparent reporting, tracking, and auditability",
    "Secure, 24/7 Client Portal Access with multilingual and regional support",
    "Unrivaled Turnaround Time (TAT) powered by global operations and automation",
    "Proven Results in MENA, North America, China, APAC, and beyond",
  ];

  return (
    <>
      <SEO
        title="About Us - IntelliDelve Background Screening Success Stories"
        description="Explore real-world case studies showing how IntelliDelve's AI-powered background screening helped organizations improve compliance, reduce fraud, and accelerate hiring."
        keywords="background screening case studies, client success stories, compliance improvement, fraud reduction, hiring acceleration, ROI background checks"
        canonicalUrl="/about"
      />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/20 dark:to-accent/20">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-blue-600/50 dark:bg-blue-700/60"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Empowering Smarter Decisions with Verification, Compliance &
                  AI
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Building global trust through background checks, due
                  diligence, and data-driven intelligence.
                </p>
                <button
                  onClick={() =>
                    openCalendly("About Us - Schedule Consultation")
                  }
                  className="inline-flex items-center px-8 py-4 bg-blue-500 hover:bg-blue-600 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-blue-600 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
              <div>
                <VideoPlayer />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary dark:text-accent mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Global Intelligence for Smarter, Safer Decisions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                At IntelliDelve, we go beyond traditional background checks. We
                deliver AI-powered risk intelligence and compliance solutions
                that help organizations worldwide reduce fraud, accelerate
                hiring, and navigate complex regulatory environments.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                With active operations in 170+ countries and a footprint across
                North America, the Middle East, APAC, Europe, and China,
                IntelliDelve is trusted by enterprises, government agencies, and
                institutions seeking accurate, fast, and scalable verification
                services—powered by the latest in AI, data science, and digital
                infrastructure.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Core Solutions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive services designed to protect, verify, and empower
                your organization with intelligent risk management.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {capabilities.map((capability, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex items-start">
                    <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-xl mr-4 flex-shrink-0">
                      <capability.icon className="w-8 h-8 text-primary dark:text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {capability.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Global Reach. Local Precision.
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  We combine global scale with hyper-local insight. From
                  multilingual reports in the UAE and China to compliance audits
                  in the US and Southeast Asia, our team of analysts,
                  investigators, and forensic experts ensure every verification
                  is regionally compliant, culturally aware, and globally
                  trusted.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Our infrastructure supports fast, secure turnaround—so clients
                  get actionable insights without delay.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-2xl p-8">
                <Globe className="w-16 h-16 text-primary dark:text-accent mx-auto mb-6" />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Worldwide Coverage
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Operating across 170+ countries with local compliance
                    expertise and cultural awareness in every region.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Leading Organizations Choose IntelliDelve
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                AI & Data Intelligence at the Core of Risk Management
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                At IntelliDelve, AI and data science are deeply embedded in our
                background screening, fraud detection, and compliance
                intelligence workflows. We've engineered intelligent systems
                that combine machine learning, natural language processing
                (NLP), and predictive analytics to flag red flags faster,
                improve accuracy, and deliver actionable insights at scale.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-primary dark:text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  AI-Powered Tools
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Advanced machine learning algorithms for pattern recognition,
                  anomaly detection, and predictive analytics.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-primary dark:text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Data Science Solutions
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive analytics platforms with real-time insights and
                  interactive dashboards for informed decision-making.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-primary dark:text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Security & Compliance
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Enterprise-grade security with compliance frameworks including
                  GDPR, ISO 27001, and industry-specific regulations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Risk Management?
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Whether you're hiring in Saudi Arabia, vetting suppliers in China,
              or automating compliance operations in the US, IntelliDelve gives
              you the AI-powered insight and tech innovation to move faster,
              minimize risk, and make confident, future-ready decisions.
            </p>
            {/* Temporarily commented out due to trae-inspector attribute conflicts */}
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-primary transition-all duration-300">
              Contact Us
            </button>
          </div> */}
          </div>
        </section>
      </div>
    </>
  );
});

AboutUs.displayName = "AboutUs";

export default AboutUs;
