import React from "react";
import {
  CheckCircle,
  ArrowRight,
  Shield,
  Users,
  BarChart3,
} from "lucide-react";
import { useCalendlyContext } from "../App";

interface SolutionData {
  title: string;
  subtitle: string;
  description: string;
  hero: {
    headline: string;
    subtext: string;
  };
  what: {
    title: string;
    description: string;
    features: string[];
  };
  why: {
    title: string;
    description: string;
    benefits: (string | { name: string; description: string })[];
  };
  how: {
    title: string;
    description: string;
    process: string[];
  };
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

interface SolutionPageProps {
  solution: SolutionData;
}

export const SolutionPage: React.FC<SolutionPageProps> = ({ solution }) => {
  const { openCalendly } = useCalendlyContext();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      <section
        className={`relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 ${solution.bgColor}`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(59,130,246,0.02)_25%,_rgba(59,130,246,0.02)_50%,_transparent_50%,_transparent_75%,_rgba(59,130,246,0.02)_75%)] bg-[length:32px_32px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-500/5"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full ${solution.color} text-sm font-medium mb-6`}
              >
                {solution.icon}
                <span className="ml-2">Professional Solutions</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6 font-primary">
                {solution.hero.headline}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-secondary">
                {solution.hero.subtext}
              </p>
              <button
                onClick={() => openCalendly(`${solution.title} - Book a Demo`)}
                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-colors duration-300 inline-flex items-center font-primary"
              >
                Book a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${solution.color} rounded-full mb-4`}
                  >
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-primary">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 font-secondary">
                    {solution.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
                {solution.what.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-secondary">
                {solution.what.description}
              </p>
              <div className="space-y-4">
                {solution.what.features.map((feature, index) => (
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
                  Comprehensive Coverage
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-secondary">
                  Our solutions are designed to address every aspect of your
                  verification and risk management needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-20 relative overflow-hidden ${!solution.why.backgroundImage ? 'bg-gray-50 dark:bg-gray-800' : ''}`}>
        {solution.why.backgroundImage && (
          <>
            <div className="absolute inset-0 z-0">
              <img
                src={solution.why.backgroundImage}
                alt="Why choose us"
                className="w-full h-full object-cover filter blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/85 to-indigo-900/90"></div>
            </div>
            <div className="absolute inset-0 z-10">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.02)_25%,_rgba(255,255,255,0.02)_50%,_transparent_50%,_transparent_75%,_rgba(255,255,255,0.02)_75%)] bg-[length:32px_32px]"></div>
            </div>
          </>
        )}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${solution.why.backgroundImage ? 'relative z-20' : ''}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
              {solution.why.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-secondary">
              {solution.why.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solution.why.benefits.map((benefit, index) => {
              const isObject = typeof benefit === 'object' && benefit !== null;
              const benefitName = isObject ? benefit.name : "Key Benefit";
              const benefitDescription = isObject ? benefit.description : benefit;

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-primary">
                      {benefitName}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-secondary">
                    {benefitDescription}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
              {solution.how.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-secondary">
              {solution.how.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solution.how.process.map((step, index) => (
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
            Schedule a consultation to learn how our{" "}
            {solution.title.toLowerCase()} solutions can benefit your
            organization.
          </p>
          <button
            onClick={() => openCalendly(`${solution.title} - Consultation`)}
            className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 font-primary"
          >
            Schedule Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default SolutionPage;
