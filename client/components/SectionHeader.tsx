import React, { memo } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeader = memo(
  ({
    title,
    subtitle,
    description,
    centered = true,
    className = "",
  }: SectionHeaderProps) => (
    <div
      className={`${centered ? "text-center" : ""} mb-8 sm:mb-12 lg:mb-16 ${className}`}
    >
      {subtitle && (
        <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 dark:bg-sky-400/20 text-primary dark:text-sky-300 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
          {subtitle}
        </span>
      )}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
        {title}
      </h1>
      {description && (
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
          {description}
        </p>
      )}
    </div>
  ),
);

SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
