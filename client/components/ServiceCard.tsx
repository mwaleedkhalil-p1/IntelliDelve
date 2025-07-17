import { memo } from "react";
import { Check } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
  textColor: string;
  delay?: number;
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
  }: ServiceCardProps) => (
    <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transform hover:-translate-y-2">
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
      <ul className="space-y-2 sm:space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 sm:gap-3">
            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  ),
);

ServiceCard.displayName = "ServiceCard";

export { ServiceCard };
