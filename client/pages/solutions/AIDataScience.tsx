import React from "react";
import { Brain, Users, ArrowRight, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { SolutionPage } from "../../components/SolutionPage";
import { SEO } from "../../components/SEO";
import { useCalendlyContext } from "../../App";

const AIDataScience: React.FC = () => {
  const { openCalendly } = useCalendlyContext();

  const solutionData = {
    title: "AI & Data Science Solutions",
    subtitle:
      "Advanced analytics and machine learning for data-driven insights",
    description: "Intelligent systems for strategic decision-making",
    hero: {
      headline: "AI & Data Science Solutions",
      subtext:
        "Leverage cutting-edge artificial intelligence and data science to transform your data into actionable insights for strategic decision-making and competitive advantage.",
    },
    what: {
      title: "What We Offer",
      description:
        "Our AI and data science solutions combine machine learning, advanced analytics, and intelligent systems to help organizations extract maximum value from their data.",
      features: [
        "Predictive analytics and forecasting models for business planning",
        "Natural Language Processing (NLP) for document analysis and sentiment analysis",
        "Computer vision systems for automated image and video analysis",
        "Interactive dashboards and business intelligence platforms",
        "Recommendation engines for personalized user experiences",
        "Document intelligence and OCR for automated data extraction",
        "AI-powered resume ranking and candidate scoring systems",
        "Retrieval-Augmented Generation (RAG) for intelligent information systems",
      ],
    },
    why: {
      title: "Why Choose Our AI Solutions",
      description:
        "Our team of data scientists and AI engineers deliver custom solutions that are scalable, reliable, and designed to integrate seamlessly with your existing systems.",
      benefits: [
        "Increase operational efficiency through intelligent automation and process optimization",
        "Make data-driven decisions with predictive analytics and real-time insights",
        "Reduce manual processing time by up to 80% with automated data extraction",
        "Improve accuracy and consistency in data analysis and pattern recognition",
        "Scale your analysis capabilities to handle large volumes of data efficiently",
        "Gain competitive advantage through advanced machine learning capabilities",
      ],
    },
    how: {
      title: "Our AI Implementation Process",
      description:
        "We follow a systematic approach to ensure successful AI implementation that delivers measurable business value.",
      process: [
        "Data assessment and requirements analysis to identify optimal AI applications",
        "Custom model development and training using your specific data and use cases",
        "Integration and testing with your existing systems and workflows",
        "Deployment, monitoring, and continuous optimization for optimal performance",
      ],
    },
    icon: <Brain className="h-6 w-6" />,
    color: "bg-red-500/10 text-red-600",
    bgColor:
      "bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800",
  };

  return (
    <>
      <SEO
        title="AI & Data Science Solutions - IntelliDelve"
        description="Advanced AI and data science solutions including predictive analytics, machine learning, NLP, computer vision, and intelligent automation for business transformation."
        keywords="AI solutions, data science, machine learning, predictive analytics, NLP, computer vision, business intelligence, automation"
      />

      <div className={`min-h-screen ${solutionData.bgColor}`}>

        <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">

          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2125&q=80')`,
            }}
          ></div>

          <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-red-800/70 to-orange-900/80"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className={`inline-flex items-center justify-center w-20 h-20 ${solutionData.color} bg-white/90 rounded-2xl mb-8`}>
              {solutionData.icon}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-primary">
              {solutionData.hero.headline}
            </h1>
            <p className="text-xl text-white/90 mb-8 font-secondary leading-relaxed">
              {solutionData.hero.subtext}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openCalendly(`${solutionData.title} - Consultation`)}
                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-colors duration-300 font-primary inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                Schedule Consultation
                <ArrowRight className="h-5 w-5" />
              </button>

              <Link
                to="/what-we-offer#ai-and-data-science-solutions"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300 font-primary inline-flex items-center justify-center gap-2"
                onClick={() => {

                  setTimeout(() => {
                    const element = document.getElementById('ai-and-data-science-solutions');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
              >
                <Lightbulb className="h-5 w-5" />
                Explore Solutions
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
                {solutionData.what.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-secondary">
                {solutionData.what.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutionData.what.features.map((feature, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <div className="flex items-center mb-3">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{feature}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
                {solutionData.why.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-secondary">
                {solutionData.why.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutionData.why.benefits.map((benefit, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-primary">
                    {benefit}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-primary">
                {solutionData.how.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-secondary">
                {solutionData.how.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {solutionData.how.process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {index + 1}
                  </div>
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
              Ready to Transform Your Data?
            </h2>
            <p className="text-xl mb-8 font-secondary">
              Schedule a consultation to learn how our AI & data science solutions can unlock the power of your data.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openCalendly(`${solutionData.title} - Consultation`)}
                className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 font-primary inline-flex items-center justify-center gap-2"
              >
                Schedule Consultation
                <ArrowRight className="h-5 w-5" />
              </button>

              <Link
                to="/what-we-offer#ai-and-data-science-solutions"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300 font-primary inline-flex items-center justify-center gap-2"
                onClick={() => {

                  setTimeout(() => {
                    const element = document.getElementById('ai-and-data-science-solutions');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
              >
                <Lightbulb className="h-5 w-5" />
                Explore Solutions
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AIDataScience;
