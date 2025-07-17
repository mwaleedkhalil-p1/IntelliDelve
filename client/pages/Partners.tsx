import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ReCaptcha, { ReCaptchaRef } from "../components/ReCaptcha";
import {
  Laptop,
  Users,
  UserCheck,
  CheckCircle,
  MapPin,
  Coffee,
  Heart,
  Zap,
  Loader2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type PartnershipFormData = {
  company_name: string;
  partnership_type: "background_screening" | "ai_data_intelligence" | "business_tech_solutions" | "others";
  email: string;
  goals: string;
};

export default function Partners() {
  const headerRef = useRef<HTMLDivElement>(null);
  const partnershipsRef = useRef<HTMLDivElement>(null);
  const cultureRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCaptchaRef>(null);

  const [formData, setFormData] = useState<PartnershipFormData>({
    company_name: "",
    partnership_type: "background_screening",
    email: "",
    goals: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      );
    }

    if (partnershipsRef.current) {
      gsap.fromTo(
        partnershipsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: partnershipsRef.current,
            start: "top 80%",
          },
        },
      );
    }

    if (cultureRef.current) {
      gsap.fromTo(
        cultureRef.current.children,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cultureRef.current,
            start: "top 80%",
          },
        },
      );
    }
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Verify CAPTCHA
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA verification");
      setIsSubmitting(false);
      return;
    }

    console.log("Submitting partnership form with data:", formData);

    try {
      const response = await axios.post(
        "https://informed-bluebird-right.ngrok-free.app/partnership",
        {
          ...formData,
          recaptcha_token: captchaToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Partnership submission successful:", response.data);

      setFormData({
        company_name: "",
        partnership_type: "background_screening",
        email: "",
        goals: "",
      });
      setCaptchaToken(null);
      recaptchaRef.current?.resetRecaptcha();

      toast.success("Partnership request submitted successfully!");
    } catch (error) {
      console.error("Error submitting partnership form:", error);

      let errorMessage =
        "Failed to submit partnership request. Please try again.";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Server error response:", error.response.data);
          if (error.response.status === 400) {
            errorMessage = "Please check your input and try again.";
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
          errorMessage =
            "No response from server. Please check your connection.";
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const partnerships = [
    {
      icon: <Laptop className="h-12 w-12 text-blue-500" />,
      title: "Background Screening Dashboard",
      description:
        "Integrate our comprehensive background screening solutions into your platform.",
      color: "bg-blue-50 dark:bg-blue-900/20 border-blue-500",
    },
    {
      icon: <Users className="h-12 w-12 text-purple-500" />,
      title: "AI & Data Intelligence",
      description:
        "Leverage our AI-powered data intelligence solutions for advanced analytics.",
      color: "bg-purple-50 dark:bg-purple-900/20 border-purple-500",
    },
    {
      icon: <UserCheck className="h-12 w-12 text-green-500" />,
      title: "Business Technological Solutions",
      description:
        "Comprehensive tech solutions tailored for your business needs.",
      color: "bg-green-50 dark:bg-green-900/20 border-green-500",
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
    <div className="min-h-screen pt-16">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#f8fafc",
            padding: "16px",
            borderRadius: "12px",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#f8fafc",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#f8fafc",
            },
          },
        }}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 dark:from-brand-navy dark:to-purple-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Join the <span className="text-yellow-300">Future</span> of
              Verification
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              Partner with industry leaders and build your career with a company
              that's revolutionizing background verification through AI and
              human expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#partnership-form"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg inline-block text-center"
              >
                Become a Partner
              </a>
              <Link
                to="/careers"
                className="border-2 border-white dark:border-gray-300 text-white dark:text-white px-8 py-4 rounded-full font-semibold hover:bg-white dark:hover:bg-gray-300 hover:text-blue-600 dark:hover:text-gray-900 transition-colors duration-300 inline-block text-center"
              >
                View Open Positions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partnerships */}
      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Strategic Partnerships
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Collaborate with IntelliDelve to expand your service offerings and
              grow together
            </p>
          </div>

          <div
            ref={partnershipsRef}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {partnerships.map((partnership, index) => (
              <div
                key={index}
                className={`${partnership.color} rounded-2xl p-8 border-l-4 transform hover:scale-105 transition-all duration-300 shadow-lg`}
              >
                <div className="flex justify-center mb-6">
                  {partnership.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                  {partnership.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {partnership.description}
                </p>
              </div>
            ))}
          </div>

          {/* Partnership Application Form */}
          <form
            id="partnership-form"
            ref={formRef}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-gray-50 dark:bg-brand-navy/50 rounded-3xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Partnership Opportunities
            </h3>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="company_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Company Name
                </label>
                <input
                  id="company_name"
                  name="company_name"
                  type="text"
                  value={formData.company_name}
                  onChange={handleFormChange}
                  placeholder="Your Company Name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-brand-navy focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="partnership_type"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Partnership Type
                </label>
                <select
                  id="partnership_type"
                  name="partnership_type"
                  value={formData.partnership_type}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-brand-navy focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="background_screening">Background Screening Dashboard</option>
                  <option value="ai_data_intelligence">AI & Data Intelligence</option>
                  <option value="business_tech_solutions">Business Technological Solutions</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Contact Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="partner@company.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-brand-navy focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="goals"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Partnership Goals
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  rows={4}
                  value={formData.goals}
                  onChange={handleFormChange}
                  placeholder="Describe your partnership objectives..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-brand-navy focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>

              {/* Google reCAPTCHA */}
              <ReCaptcha
                ref={recaptchaRef}
                onVerify={setCaptchaToken}
                theme="light"
              />

              <button
                type="submit"
                disabled={isSubmitting || !captchaToken}
                className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Partnership Application"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Life at IntelliDelve */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Life at IntelliDelve
              </h2>
              <div ref={cultureRef} className="space-y-4">
                {culturePerks.map((perk, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"
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
                alt="Partnership and Team Collaboration at IntelliDelve"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}