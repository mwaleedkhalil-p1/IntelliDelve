import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Industries = lazy(() => import("./pages/Industries"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Cookies = lazy(() => import("./pages/Cookies"));

const Services = lazy(() => import("./pages/Services"));
const Solutions = lazy(() => import("./pages/Solutions"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Partners = lazy(() => import("./pages/Partners"));
const Clients = lazy(() => import("./pages/Clients"));
const Careers = lazy(() => import("./pages/Careers"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const BlogManagement = lazy(() => import("./pages/admin/BlogManagement"));
const CaseStudyManagement = lazy(() => import("./pages/admin/CaseStudyManagement"));
const CloudinaryTest = lazy(() => import("./pages/admin/CloudinaryTest"));
const ApiTest = lazy(() => import("./pages/ApiTest"));

const BackgroundScreeningSolution = lazy(
  () => import("./pages/solutions/BackgroundScreening"),
);
const CorporateDueDiligence = lazy(
  () => import("./pages/solutions/CorporateDueDiligence"),
);
const AIDataScience = lazy(() => import("./pages/solutions/AIDataScience"));
const TechInnovation = lazy(() => import("./pages/solutions/TechInnovation"));
const CitizenByInvestment = lazy(() => import("./pages/CitizenByInvestment"));

const BankingFinancial = lazy(
  () => import("./pages/industries/BankingFinancial"),
);
const HealthcareMedical = lazy(
  () => import("./pages/industries/HealthcareMedical"),
);
const CorporateProfessional = lazy(
  () => import("./pages/industries/CorporateProfessional"),
);
const Insurance = lazy(() => import("./pages/industries/Insurance"));
const LegalServices = lazy(() => import("./pages/industries/LegalServices"));
const RealEstate = lazy(() => import("./pages/industries/RealEstate"));
const AccountingAdvisory = lazy(
  () => import("./pages/industries/AccountingAdvisory"),
);
const ITSoftware = lazy(() => import("./pages/industries/ITSoftware"));
const StartupsTech = lazy(() => import("./pages/industries/StartupsTech"));
const EcommerceDigital = lazy(
  () => import("./pages/industries/EcommerceDigital"),
);
const Telecommunications = lazy(
  () => import("./pages/industries/Telecommunications"),
);
const GovernmentPublic = lazy(
  () => import("./pages/industries/GovernmentPublic"),
);
const EducationAcademic = lazy(
  () => import("./pages/industries/EducationAcademic"),
);
const NonProfit = lazy(() => import("./pages/industries/NonProfit"));
const ManufacturingIndustrial = lazy(
  () => import("./pages/industries/ManufacturingIndustrial"),
);
const RetailConsumer = lazy(() => import("./pages/industries/RetailConsumer"));
const TransportationLogistics = lazy(
  () => import("./pages/industries/TransportationLogistics"),
);
const EnergyUtilities = lazy(
  () => import("./pages/industries/EnergyUtilities"),
);
const FinancialInstitution = lazy(
  () => import("./pages/industries/FinancialInstitution"),
);
const GigWorkers = lazy(() => import("./pages/industries/GigWorkers"));
const AcademicEducation = lazy(
  () => import("./pages/industries/AcademicEducation"),
);
const HospitalityFoodLeisure = lazy(
  () => import("./pages/industries/HospitalityFoodLeisure"),
);
const IndustrialManufacturing = lazy(
  () => import("./pages/industries/IndustrialManufacturing"),
);
const BackgroundScreening = lazy(() => import("./pages/BackgroundScreening"));
const Contact = lazy(() => import("./pages/Contact"));
const EmploymentVerification = lazy(
  () => import("./pages/EmploymentVerification"),
);
const CriminalCheck = lazy(() => import("./pages/CriminalCheck"));
const EducationVerification = lazy(
  () => import("./pages/EducationVerification"),
);
const ReferenceValidation = lazy(() => import("./pages/ReferenceValidation"));
const WatchlistScreening = lazy(() => import("./pages/WatchlistScreening"));
const AddressVerification = lazy(() => import("./pages/AddressVerification"));
const PredictiveAnalytics = lazy(() => import("./pages/PredictiveAnalytics"));
const KYCCompliance = lazy(() => import("./pages/KYCCompliance"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ComputerVision = lazy(() => import("./pages/ComputerVision"));
const DocumentIntelligence = lazy(() => import("./pages/DocumentIntelligence"));
const InteractiveDashboards = lazy(
  () => import("./pages/InteractiveDashboards"),
);
const NLP = lazy(() => import("./pages/NLP"));
const RAG = lazy(() => import("./pages/RAG"));
const RecommendationEngines = lazy(
  () => import("./pages/RecommendationEngines"),
);
const ResumeRanking = lazy(() => import("./pages/ResumeRanking"));
const RiskScoring = lazy(() => import("./pages/RiskScoring"));
const SentimentAnalysis = lazy(() => import("./pages/SentimentAnalysis"));

const WhatWeOffer = lazy(() => import("./pages/WhatWeOffer"));
const CustomSoftware = lazy(() => import("./pages/CustomSoftware"));
const SystemIntegration = lazy(() => import("./pages/SystemIntegration"));
const DataMigration = lazy(() => import("./pages/DataMigration"));
const CloudInfrastructure = lazy(() => import("./pages/CloudInfrastructure"));

// Sanity-powered pages
const SanityBlogs = lazy(() => import("./pages/SanityBlogs"));
const SanityBlogPost = lazy(() => import("./pages/SanityBlogPost"));
const SanityCaseStudies = lazy(() => import("./pages/SanityCaseStudies"));
const SanityTest = lazy(() => import("./pages/SanityTest"));
const SanityDebug = lazy(() => import("./pages/SanityDebug"));

export const routes: RouteObject[] = [
  { path: "/", element: <Index /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/industries", element: <Industries /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/cookies", element: <Cookies /> },
  { path: "/services", element: <Services /> },
  { path: "/solutions", element: <Solutions /> },
  { path: "/case-studies", element: <CaseStudies /> },
  { path: "/partners", element: <Partners /> },
  { path: "/clients", element: <Clients /> },
  { path: "/careers", element: <Careers /> },
  { path: "/blogs", element: <SanityBlogs /> },
  { path: "/blogs/:id", element: <SanityBlogPost /> },
  
  // Sanity-powered routes (can be used for testing or as primary routes)
  { path: "/sanity/blogs", element: <SanityBlogs /> },
  { path: "/sanity/blogs/:id", element: <SanityBlogPost /> },
  { path: "/sanity/case-studies", element: <SanityCaseStudies /> },

  {
    path: "/solutions/background-screening",
    element: <BackgroundScreeningSolution />,
  },
  {
    path: "/solutions/corporate-due-diligence",
    element: <CorporateDueDiligence />,
  },
  { path: "/solutions/ai-data-science", element: <AIDataScience /> },
  { path: "/solutions/tech-innovation", element: <TechInnovation /> },

  { path: "/industries/banking-financial", element: <BankingFinancial /> },
  { path: "/industries/healthcare-medical", element: <HealthcareMedical /> },
  {
    path: "/industries/corporate-professional",
    element: <CorporateProfessional />,
  },
  { path: "/industries/insurance", element: <Insurance /> },
  { path: "/industries/legal-services", element: <LegalServices /> },
  { path: "/industries/real-estate", element: <RealEstate /> },
  { path: "/industries/accounting-advisory", element: <AccountingAdvisory /> },
  { path: "/industries/it-software", element: <ITSoftware /> },
  { path: "/industries/startups-tech", element: <StartupsTech /> },
  { path: "/industries/ecommerce-digital", element: <EcommerceDigital /> },
  { path: "/industries/telecommunications", element: <Telecommunications /> },
  { path: "/industries/government-public", element: <GovernmentPublic /> },
  { path: "/industries/education-academic", element: <EducationAcademic /> },
  { path: "/industries/non-profit", element: <NonProfit /> },
  {
    path: "/industries/manufacturing-industrial",
    element: <ManufacturingIndustrial />,
  },
  { path: "/industries/retail-consumer", element: <RetailConsumer /> },
  {
    path: "/industries/transportation-logistics",
    element: <TransportationLogistics />,
  },
  { path: "/industries/energy-utilities", element: <EnergyUtilities /> },
  {
    path: "/industries/financial-institution",
    element: <FinancialInstitution />,
  },
  { path: "/industries/gig-workers", element: <GigWorkers /> },
  { path: "/industries/academic-education", element: <AcademicEducation /> },
  {
    path: "/industries/hospitality-food-leisure",
    element: <HospitalityFoodLeisure />,
  },
  {
    path: "/industries/industrial-manufacturing",
    element: <IndustrialManufacturing />,
  },
  { path: "/background-screening", element: <BackgroundScreening /> },
  { path: "/employment-verification", element: <EmploymentVerification /> },
  { path: "/criminal-check", element: <CriminalCheck /> },
  { path: "/education-verification", element: <EducationVerification /> },
  { path: "/reference-validation", element: <ReferenceValidation /> },
  { path: "/watchlist-screening", element: <WatchlistScreening /> },
  { path: "/address-verification", element: <AddressVerification /> },
  { path: "/predictive-analytics", element: <PredictiveAnalytics /> },
  { path: "/kyc-compliance", element: <KYCCompliance /> },
  { path: "/citizen-by-investment", element: <CitizenByInvestment /> },
  { path: "/computer-vision", element: <ComputerVision /> },
  { path: "/document-intelligence", element: <DocumentIntelligence /> },
  { path: "/interactive-dashboards", element: <InteractiveDashboards /> },
  { path: "/nlp", element: <NLP /> },
  { path: "/rag", element: <RAG /> },
  { path: "/recommendation-engines", element: <RecommendationEngines /> },
  { path: "/resume-ranking", element: <ResumeRanking /> },
  { path: "/risk-scoring", element: <RiskScoring /> },
  { path: "/sentiment-analysis", element: <SentimentAnalysis /> },

  { path: "/what-we-offer", element: <WhatWeOffer /> },
  { path: "/custom-software", element: <CustomSoftware /> },
  { path: "/system-integration", element: <SystemIntegration /> },
  { path: "/data-migration", element: <DataMigration /> },
  { path: "/cloud-infrastructure", element: <CloudInfrastructure /> },
  { path: "/contact", element: <Contact /> },
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/admin/BlogManagement", element: <BlogManagement /> },
  { path: "/admin/CaseStudyManagement", element: <CaseStudyManagement /> },
  { path: "/admin/cloudinary-test", element: <CloudinaryTest /> },
  { path: "/api-test", element: <ApiTest /> },
  // { path: "/sanity-test", element: <SanityTest /> },
  // { path: "/sanity-debug", element: <SanityDebug /> },
  { path: "*", element: <NotFound /> }
];
