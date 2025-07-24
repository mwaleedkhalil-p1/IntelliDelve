import React, { memo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Building2,
  Users,
  Clock,
  Shield,
} from "lucide-react";
import { useCalendlyContext } from "../App";

interface ServicePageProps {
  title: string;
  description: string;
  heroImage?: string;
  whatSection: {
    title: string;
    content: string[];
  };
  whySection: {
    title: string;
    content: string[];
    benefits: string[];
  };
  howSection: {
    title: string;
    content: string[];
    features: Array<{
      icon: any;
      title: string;
      description: string;
    }>;
  };
  industries: string[];
  ctaTitle: string;
  ctaDescription: string;
}

const ServicePageTemplate = memo<ServicePageProps>(
  ({
    title,
    description,
    heroImage,
    whatSection,
    whySection,
    howSection,
    industries,
    ctaTitle,
    ctaDescription,
  }) => {
    const { openCalendly } = useCalendlyContext();

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">

        <section className="pt-24 pb-12 lg:pt-32 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() =>
                      openCalendly(`${title} - Schedule Consultation`)
                    }
                    className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <Link
                    to="/case-studies"
                    className="inline-flex items-center px-8 py-4 border-2 border-primary dark:border-accent text-primary dark:text-accent font-semibold rounded-full hover:bg-primary dark:hover:bg-accent hover:text-white transition-all duration-300"
                  >
                    View Case Studies
                  </Link>
                </div>
              </div>
              <div className="lg:order-first lg:order-last">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-2xl p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary/20 dark:bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="w-12 h-12 text-primary dark:text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Professional Service
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Enterprise-grade solutions tailored for your business
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {whatSection.title}
              </h2>
              <div className="space-y-6">
                {whatSection.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  {whySection.title}
                </h2>
                <div className="space-y-6">
                  {whySection.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Key Benefits
                </h3>
                <div className="space-y-4">
                  {whySection.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {howSection.title}
              </h2>
              <div className="max-w-3xl mx-auto space-y-6">
                {howSection.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howSection.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary dark:text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Industries We Serve
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our solutions are tailored to meet the specific needs and
                regulatory requirements of diverse industry verticals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center border border-gray-200 dark:border-gray-600"
                >
                  <Star className="h-8 w-8 text-primary dark:text-accent mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {industry}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{ctaTitle}</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              {ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openCalendly(`${title} - Get Started`)}
                className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-white dark:border-gray-300 text-white dark:text-white font-semibold rounded-full hover:bg-white dark:hover:bg-gray-300 hover:text-primary dark:hover:text-gray-900 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  },
);

ServicePageTemplate.displayName = "ServicePageTemplate";

export { ServicePageTemplate as ServicePage };
