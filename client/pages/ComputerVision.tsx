import React, { useEffect, useRef } from "react";
import {
  Eye,
  Camera,
  Scan,
  Maximize2,
  Cpu,
  BarChart,
  Target,
  Brain,
  Settings,
  Shield,
  Users,
  FileText,
  Navigation,
  Zap,
  Monitor,
  Lock
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEO } from "../components/SEO";
import { useCalendlyContext } from "../App";

gsap.registerPlugin(ScrollTrigger);

export default function ComputerVision() {
  const { openCalendly } = useCalendlyContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const applicationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    if (capabilitiesRef.current) {
      gsap.fromTo(
        capabilitiesRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: capabilitiesRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (applicationsRef.current) {
      gsap.fromTo(
        applicationsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: applicationsRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <>
      <SEO
        title="Computer Vision Solutions - IntelliDelve"
        description="Advanced computer vision and AI-powered visual analysis solutions. Facial recognition, object detection, visual quality inspection, and automated image processing."
        keywords="computer vision, AI visual analysis, facial recognition, object detection, image processing, visual inspection, automated analysis"
        canonicalUrl="/computer-vision"
      />
      <div className="min-h-screen">

      <section className="relative min-h-screen flex items-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          }}
        >

          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-indigo-900/70"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Computer Vision{" "}
              <span className="text-yellow-300">System</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              IntelliDelve's Computer Vision solutions empower organizations to extract actionable insights from images, video, and real-time visual data. From facial recognition to visual quality inspection, our AI-powered vision platform automates complex visual tasks with speed, consistency, and unmatched accuracy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openCalendly("Computer Vision Solutions - Schedule Meeting")}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Schedule a Meeting
                <Users className="ml-2 h-5 w-5" />
              </button>
              <Link
                to="/partners"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Partner with Us
                <Eye className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Core Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced computer vision capabilities powered by deep learning and AI technology
            </p>
          </div>

          <div ref={capabilitiesRef} className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Image & Video Recognition
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Classify, tag, and interpret images or video frames with precision using deep learning models trained on large-scale visual datasets.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                  <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Real-Time Object Detection & Tracking
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Identify and follow people, vehicles, items, or defects in motion across video streams or live camera feeds — ideal for surveillance, retail, and manufacturing.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Scene Understanding & Spatial Awareness
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Analyze complex scenes to extract environmental context, recognize interactions, and understand spatial relationships for smart automation and decision-making.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <Settings className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Custom Vision Model Training
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                We train and deploy custom computer vision models tailored to your industry and data — enabling domain-specific recognition with high accuracy.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                  <BarChart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Visual Insights Dashboard
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Track detections, generate heatmaps, and monitor vision system performance through an intuitive, centralized dashboard with real-time analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-brand-navy/50 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive technical capabilities for enterprise-grade computer vision deployment
            </p>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Real-time visual anomaly detection</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-gray-900 dark:text-white">OCR & document image parsing</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Monitor className="h-5 w-5 text-purple-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Integration with IoT devices & CCTV systems</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Cpu className="h-5 w-5 text-orange-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Edge AI processing for offline/on-device inference</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="h-5 w-5 text-red-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Role-based access and secure video data handling</span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-navy rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="h-5 w-5 text-indigo-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Scalable deployment via cloud or hybrid infrastructure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Real-World Applications
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Practical computer vision solutions across industries and use cases
            </p>
          </div>

          <div ref={applicationsRef} className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Facial Recognition & Access Control
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Secure identity verification at facilities, events, or borders.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 dark:border-green-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                  <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Quality Control in Manufacturing
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Detect product defects, alignment issues, or packaging errors in real-time.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 dark:border-purple-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <BarChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Retail Analytics
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor customer movement, shelf engagement, and store traffic with AI-driven insights.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 dark:border-orange-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <Eye className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Medical Imaging
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Assist radiologists by identifying patterns in X-rays, MRIs, or pathology slides.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-100 dark:border-teal-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-teal-100 dark:bg-teal-900/30">
                  <FileText className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Document Automation
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Digitize forms, IDs, and records with OCR and visual structure recognition.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 dark:border-indigo-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                  <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Smart Surveillance
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Detect threats, intrusions, or unusual behavior in monitored spaces.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="h-5 w-5 text-pink-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Gesture Recognition</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Enable contactless interfaces through vision-based gesture input.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Navigation className="h-5 w-5 text-cyan-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Autonomous Navigation</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Power self-driving systems with real-time visual scene analysis and obstacle detection.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-5 w-5 text-red-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Security Compliance</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Analyze CCTV and surveillance feeds to detect unauthorized access, unsafe behavior, or compliance breaches in real time.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-brand-navy/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="h-5 w-5 text-purple-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Access & Perimeter Control</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Employ facial recognition, anomaly detection, and scene analysis to secure facilities and critical infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}