import React from "react";
import { Code, Users, ArrowRight, Zap, Rocket, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { SolutionPage } from "../../components/SolutionPage";
import { SEO } from "../../components/SEO";
import { useCalendlyContext } from "../../App";
import ScrollToTopButton from "../../components/ScrollToTopButton";

const TechInnovation: React.FC = () => {
  const { openCalendly } = useCalendlyContext();

  const solutionData = {
    title: "Tech & Innovation Services",
    subtitle: "Custom technology solutions and digital transformation services",
    description: "Accelerate your digital transformation and business growth",
    hero: {
      headline: "Tech & Innovation Services",
      subtext:
        "Accelerate your digital transformation with custom technology solutions, innovative platforms, and cutting-edge development services designed to drive business growth.",
    },
    what: {
      title: "What We Offer",
      description:
        "Our technology and innovation services help organizations build, integrate, and optimize digital solutions that drive efficiency, growth, and competitive advantage.",
      features: [
        "Custom software development with modern frameworks and technologies",
        "System integration and API development for seamless connectivity",
        "Cloud infrastructure setup and DevOps implementation",
        "Data migration and analytics platform development",
        "Mobile application development for iOS and Android platforms",
        "Web application development with responsive design",
        "Digital transformation consulting and strategy development",
        "Technology architecture design and optimization",
      ],
    },
    why: {
      title: "Why Choose Our Tech Services",
      description:
        "Our experienced development team delivers scalable, secure, and innovative technology solutions that align with your business objectives and industry best practices.",
      benefits: [
        "Accelerate time-to-market with agile development methodologies and rapid prototyping",
        "Reduce operational costs through automation and efficient system architecture",
        "Ensure scalability and reliability with cloud-native solutions and modern infrastructure",
        "Improve user experience with intuitive interfaces and responsive design",
        "Maintain security and compliance with industry-standard practices and protocols",
        "Enable data-driven decisions with integrated analytics and reporting capabilities",
      ],
    },
    how: {
      title: "Our Development Process",
      description:
        "We follow industry best practices and agile methodologies to deliver high-quality technology solutions on time and within budget.",
      process: [
        "Discovery and planning phase to understand requirements and define technical specifications",
        "Design and architecture development with user experience and scalability in mind",
        "Agile development with regular testing, feedback, and iterative improvements",
        "Deployment, training, and ongoing support to ensure successful adoption and maintenance",
      ],
    },
    icon: <Code className="h-6 w-6" />,
    color: "bg-green-500/10 text-green-600",
    bgColor:
      "bg-gradient-to-br from-green-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800",
  };

  return (
    <>
      <SEO
        title="Tech & Innovation Services - IntelliDelve"
        description="Custom software development, system integration, cloud infrastructure, and digital transformation services to accelerate your business growth and innovation."
        keywords="custom software development, system integration, cloud infrastructure, DevOps, digital transformation, mobile apps, web development"
      />

      <div className="min-h-screen">

        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/images/downloaded/unsplash-photo-1518186285589-2f7649de83e0.jpg")'
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-teal-900/70 to-blue-900/80"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <Code className="h-10 w-10 text-white" />
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
                <Rocket className="w-4 h-4 mr-2" />
                Tech & Innovation
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Tech & Innovation
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                Services
              </span>
            </h1>

            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your business with cutting-edge technology solutions, custom software development, and innovative digital platforms designed to accelerate growth and efficiency.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100+</div>
                <p className="text-sm text-gray-300">Projects Delivered</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <p className="text-sm text-gray-300">Technologies</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <p className="text-sm text-gray-300">Support</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openCalendly(`${solutionData.title} - Consultation`)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <Link
                to="/what-we-offer#tech-and-innovation-services"
                className="inline-flex items-center px-8 py-4 border-2 border-green-400 text-green-400 font-semibold rounded-full hover:bg-green-400 hover:text-white transition-all duration-300"
                onClick={() => {
                  setTimeout(() => {
                    const element = document.getElementById('tech-and-innovation-services');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
              >
                <Zap className="mr-2 h-5 w-5" />
                Explore Solutions
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
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
              Ready to Innovate?
            </h2>
            <p className="text-xl mb-8 font-secondary">
              Schedule a consultation to learn how our tech & innovation services can accelerate your digital transformation.
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
                to="/what-we-offer#tech-and-innovation-services"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300 font-primary inline-flex items-center justify-center gap-2"
                onClick={() => {

                  setTimeout(() => {
                    const element = document.getElementById('tech-and-innovation-services');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
              >
                <Zap className="h-5 w-5" />
                Explore Solutions
              </Link>
            </div>
          </div>
        </section>
      </div>

      <ScrollToTopButton />
    </>
  );
};

export default TechInnovation;
