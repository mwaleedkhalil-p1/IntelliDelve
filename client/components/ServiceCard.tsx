import React, { memo } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
  textColor: string;
  delay?: number;
  learnMoreLink?: string;
}

const ServiceCard = memo(
  ({
    icon,
    title,
    description,
    features,
    color,
    textColor,
    delay = 0,
    learnMoreLink,
  }: ServiceCardProps) => (
    <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transform hover:-translate-y-2 h-full flex flex-col">
      <div
        className={`${color} w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3
        className={`text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 ${textColor} dark:text-white`}
      >
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
        {description}
      </p>
      <ul className="space-y-2 sm:space-y-3 mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 sm:gap-3">
            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {learnMoreLink && (
        <div className="mt-auto">
          <Link
            to={learnMoreLink}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${textColor} border border-current hover:bg-gray-900 hover:text-white hover:border-gray-900 dark:hover:bg-white dark:hover:text-gray-900 dark:hover:border-white transition-all duration-300 text-sm font-bold group/button`}
          >
            Learn More
            <ArrowRight className="h-4 w-4 group-hover/button:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      )}
    </div>
  ),
);

ServiceCard.displayName = "ServiceCard";

export { ServiceCard };
