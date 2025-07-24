import React from "react";
import {
  CheckCircle,
  ArrowRight,
  Shield,
  Users,
  BarChart3,
  Clock,
  Award,
  Globe,
} from "lucide-react";
import { useCalendlyContext } from "../App";
import { SEO } from "./SEO";

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  hero: {
    headline: string;
    subtext: string;
  };
  features: string[];
  benefits: string[];
  process: string[];
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  heroImage?: string;
  stats?: {
    accuracy?: string;
    speed?: string;
    coverage?: string;
  };
}

interface ServicePageProps {
  service: ServiceData;
}

export const ServicePage: React.FC<ServicePageProps> = ({ service }) => {
  const { openCalendly } = useCalendlyContext();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEO
        title={`${service.title} - IntelliDelve`}
        description={service.description}
        keywords={`${service.title.toLowerCase()}, background verification, screening services, IntelliDelve`}
      />

      <section
        className={`relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 ${service.bgColor} overflow-hidden`}
      >
        {service.heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-50"
            style={{
              backgroundImage: `url('${service.heroImage}')`,
            }}
          ></div>
        )}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(59,130,246,0.02)_25%,_rgba(59,130,246,0.02)_50%,_transparent_50%,_transparent_75%,_rgba(59,130,246,0.02)_75%)] bg-[length:32px_32px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full ${service.color} text-sm font-medium mb-6`}
              >
                {service.icon}
                <span className="ml-2">Professional Service</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6 font-primary">
                {service.hero.headline}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-secondary">
                {service.hero.subtext}
              </p>
              <button
                onClick={() => openCalendly(`${service.title} - Request Quote`)}
                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-colors duration-300 inline-flex items-center font-primary"
              >
                Request Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${service.color} rounded-full mb-4`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-primary">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-secondary">
                  {service.subtitle}
                </p>
              </div>

              {service.stats && (
                <div className="grid grid-cols-3 gap-4 text-center">
                  {service.stats.accuracy && (
                    <div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {service.stats.accuracy}
                      </div>
                      <div className="text-xs text-gray-500">Accuracy</div>
                    </div>
                  )}
                  {service.stats.speed && (
                    <div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {service.stats.speed}
                      </div>
                      <div className="text-xs text-gray-500">Speed</div>
                    </div>
                  )}
                  {service.stats.coverage && (
                    <div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {service.stats.coverage}
                      </div>
                      <div className="text-xs text-gray-500">Coverage</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
                What We Provide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-secondary">
                {service.description}
              </p>
              <div className="space-y-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-secondary">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <div className="text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 font-primary">
                  Comprehensive & Reliable
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-secondary">
                  Our verification process combines multiple data sources and
                  advanced technology to ensure the highest accuracy and
                  completeness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
              Why Choose Our Service
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-primary">
                    Key Advantage
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-secondary">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-secondary">
              Our streamlined process ensures quick and accurate results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 font-primary">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 font-primary">
                  Step {index + 1}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-secondary">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6 font-primary">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 font-secondary">
            Get accurate and reliable {service.title.toLowerCase()} services
            tailored to your needs.
          </p>
          <button
            onClick={() => openCalendly(`${service.title} - Consultation`)}
            className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 font-primary"
          >
            Schedule Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
