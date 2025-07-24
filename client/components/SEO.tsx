import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  structuredData?: object;
  alternateLanguages?: Array<{ hrefLang: string; href: string }>;
}

const defaultDescription =
  "Advanced AI-powered background verification, corporate due diligence, and risk management solutions with industry-leading accuracy and fastest turnaround time.";
const defaultKeywords =
  "background verification, pre-employment screening, corporate due diligence, fraud detection, risk management, AI-powered verification, KYC compliance, background checks";
const defaultOgImage = "/og-image.jpg";
const siteName = "IntelliDelve";
const siteUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://intellidelve.com";

export function SEO({
  title,
  description = defaultDescription,
  keywords = defaultKeywords,
  canonical,
  ogImage = defaultOgImage,
  ogType = "website",
  noindex = false,
  structuredData,
  alternateLanguages = [],
}: SEOProps) {
  const fullTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} - AI-Powered Background Verification & Risk Management`;
  const canonicalUrl =
    canonical ||
    (typeof window !== "undefined" ? window.location.href : siteUrl);
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${siteUrl}${ogImage}`;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: description,
    foundingDate: "2020",
    numberOfEmployees: "50-200",
    industry: "Background Verification and Risk Management",
    serviceArea: "Global",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-123-4567",
      contactType: "Customer Service",
      email: "info@intellidelve.com",
      availableLanguage: ["English", "Spanish", "French"],
    },
    sameAs: [
      "https://www.linkedin.com/company/intellidelve",
      "https://twitter.com/intellidelve",
      "https://www.facebook.com/intellidelve",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Background Verification Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pre-Employment Screening",
            description: "Comprehensive background verification for hiring",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Corporate Due Diligence",
            description: "Business intelligence and risk assessments",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fraud Detection",
            description: "AI-enhanced fraud identification and mitigation",
          },
        },
      ],
    },
  };

  return (
    <Helmet>

      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
      <meta name="format-detection" content="telephone=no" />

      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <meta
        name="googlebot"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || siteName} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@intellidelve" />
      <meta name="twitter:creator" content="@intellidelve" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={title || siteName} />

      <meta name="author" content={siteName} />
      <meta name="publisher" content={siteName} />
      <meta name="copyright" content={siteName} />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />

      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://assets.calendly.com" />
      <link rel="preconnect" href="https://calendly.com" />

      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//assets.calendly.com" />
      <link rel="dns-prefetch" href="//calendly.com" />

      <link
        rel="preload"
        href="https://assets.calendly.com/assets/external/widget.js"
        as="script"
        crossOrigin="anonymous"
      />
      <link
        rel="prefetch"
        href="https://calendly.com/mwaleedkhalil/30min"
      />

      {alternateLanguages.map((lang, index) => (
        <link
          key={index}
          rel="alternate"
          hrefLang={lang.hrefLang}
          href={lang.href}
        />
      ))}

      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>

      <meta httpEquiv="dns-prefetch-control" content="on" />
    </Helmet>
  );
}
