import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useCalendlyContext } from "../App";
import ReCaptcha, { ReCaptchaRef } from "../components/ReCaptcha";

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCaptchaRef>(null);
  const { openCalendly } = useCalendlyContext();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    serviceInterest: "Background Screening",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      );
    }
    if (formRef.current) {
      gsap.fromTo(
        formRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3,
        },
      );
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const serviceInterestMap: Record<string, string> = {
    "Background Screening": "background",
    "Due Diligence": "due_diligence",
    "Fraud Detection": "fraud",
    "Risk Management": "risk",
    "Custom Solution": "custom",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA verification");
      setIsSubmitting(false);
      return;
    }

    const serviceInterestValue =
      serviceInterestMap[formData.serviceInterest] || "other";

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      company: formData.company,
      service_interest: serviceInterestValue,
      message: formData.message,
      recaptcha_token: captchaToken,
    };

    const endpoint = "https://informed-bluebird-right.ngrok-free.app/contact";

    try {
      const response = await axios.post(endpoint, payload);
      toast.success(
        "Message sent successfully! We will get back to you shortly.",
      );

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        serviceInterest: "Background Screening",
        message: "",
      });
      setCaptchaToken(null);
      recaptchaRef.current?.resetRecaptcha();
    } catch (error) {
      let errorMessage = "Failed to send message. Please try again later.";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            if (error.response.data?.service_interest) {
              errorMessage = `Invalid service selection: ${error.response.data.service_interest[0]}`;
            } else if (error.response.data) {
              errorMessage = `Validation error: ${JSON.stringify(error.response.data)}`;
            }
          }
        } else if (error.request) {
          errorMessage =
            "No response from server. Please check your connection and try again.";
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary dark:text-accent" />,
      title: "Email Us",
      details: "sales@intellidelve.com",
      subtext: "We'll respond within 24 hours",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary dark:text-accent" />,
      title: "Call Us",
      details: "+92 333 000 1456",
      subtext: "Monday to Friday, 9 AM - 6 PM EST",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary dark:text-accent" />,
      title: "Visit Us",
      details: "Islamabad , Pakistan",
      subtext: "Schedule an appointment",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary dark:text-accent" />,
      title: "Business Hours",
      details: "Mon - Fri: 9 AM - 6 PM EST",
      subtext: "Emergency support available 24/7",
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
      <Helmet>
        <title>
          Contact Us - IntelliDelve Background Verification Services
        </title>
        <meta
          name="description"
          content="Get in touch with IntelliDelve for comprehensive background verification, due diligence, and risk management solutions. Schedule a demo or consultation today."
        />
      </Helmet>

      <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 dark:from-brand-navy dark:to-purple-900 min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={headerRef} className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get <span className="text-yellow-300">Started</span> Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              Ready to enhance your hiring process with comprehensive background
              verification? Let's discuss your specific requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Send us a Message
              </h2>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service Interest
                  </label>
                  <select
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  >
                    <option>Background Screening</option>
                    <option>Due Diligence</option>
                    <option>Fraud Detection</option>
                    <option>Risk Management</option>
                    <option>Custom Solution</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-brand-navy focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your specific requirements..."
                  ></textarea>
                </div>

                <ReCaptcha
                  ref={recaptchaRef}
                  onVerify={setCaptchaToken}
                  theme="light"
                />

                <button
                  type="submit"
                  disabled={isSubmitting || !captchaToken}
                  className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg disabled:bg-primary/60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Get in Touch
              </h2>
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-gray-50 dark:bg-brand-navy/50 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        {info.details}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {info.subtext}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-gradient-to-br from-primary to-purple-600 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Need Immediate Assistance?
                </h3>
                <p className="mb-6 opacity-90">
                  Our expert team is ready to help you implement the right
                  verification solution for your organization.
                </p>
                <button
                  onClick={() =>
                    openCalendly("Contact Page - Schedule Your Demo")
                  }
                  className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                >
                  Schedule a Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
