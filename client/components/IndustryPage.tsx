import React from "react";
import { Shield, CheckCircle, Users, BarChart3 } from "lucide-react";
import { useCalendlyContext } from "../App";

interface IndustryData {
  slug: string;
  title: string;
  hero: {
    headline: string;
    subhead: string;
  };
  overview: string;
  services: string[];
  compliance: string;
  story: {
    stat: string;
    text: string;
  };
  cta: string;
}

interface IndustryPageProps {
  industry: IndustryData;
}

export const IndustryPage: React.FC<IndustryPageProps> = ({ industry }) => {
  const { openCalendly } = useCalendlyContext();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(59,130,246,0.02)_25%,_rgba(59,130,246,0.02)_50%,_transparent_50%,_transparent_75%,_rgba(59,130,246,0.02)_75%)] bg-[length:32px_32px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-500/5"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Industry-Specific Solutions
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6 font-primary">
              {industry.hero.headline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-secondary">
              {industry.hero.subhead}
            </p>
          </div>
        </div>
      </section>

      {/* Industry Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
            Industry Overview
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-secondary">
            {industry.overview}
          </p>
        </div>
      </section>

      {/* Key Screening Services */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-primary">
              Key Screening Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-secondary">
              Specialized verification solutions for{" "}
              {industry.title.toLowerCase()}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {industry.services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-primary">
                    {service}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-primary">
              Compliance Standards
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-secondary">
              {industry.compliance}
            </p>
          </div>
        </div>
      </section>

      {/* Client Success Story */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-primary">
              Client Success Story
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                  <BarChart3 className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2 font-primary">
                  {industry.story.stat}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-secondary">
                  Improvement Achieved
                </p>
              </div>
              <div>
                <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic font-secondary">
                  "{industry.story.text}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary dark:bg-sky-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6 font-primary">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 font-secondary">
            Let us help you implement comprehensive screening solutions for your{" "}
            {industry.title.toLowerCase()} organization.
          </p>
          <button
            onClick={() => openCalendly(industry.cta)}
            className="bg-white text-primary dark:bg-slate-100 dark:text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 dark:hover:bg-slate-200 transition-colors duration-300 font-primary"
          >
            {industry.cta}
          </button>
        </div>
      </section>
    </div>
  );
};

export default IndustryPage;
