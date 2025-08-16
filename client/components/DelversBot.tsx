import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { useCalendlyContext } from '../App';
import { geminiService } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
}

interface DelversBotProps {
  className?: string;
}

interface KnowledgeChunk {
  url: string;
  text: string;
}

// Knowledge base data - exported for use in geminiService
export const knowledgeBase: KnowledgeChunk[] = [
  {"url": "https://intellidelve-beta.netlify.app/", "text": "JavaScript Required"},
  {"url": "https://intellidelve-beta.netlify.app/industries", "text": "Industry Expertise Industries We Serve Specialized background screening and risk management solutions tailored for diverse industry verticals 18+ Industries 50+ Clients 99% Success Rate Trusted Across Industries From startups to Fortune 500 companies Healthcare Technology Education Finance"},
  {"url": "https://intellidelve-beta.netlify.app/industries", "text": "Industries We Serve"},
  {"url": "https://intellidelve-beta.netlify.app/industries", "text": "Don't See Your Industry? We provide customized screening solutions for businesses across all sectors Contact us to discuss your specific industry requirements Contact Us"},
  {"url": "https://intellidelve-beta.netlify.app/partners", "text": "Join the Future of Verification Partner with industry leaders and build your career with a company that's revolutionizing background verification through AI and human expertise Become a Partner View Open Positions"},
  {"url": "https://intellidelve-beta.netlify.app/partners", "text": "Strategic Partnerships Collaborate with IntelliDelve to expand your service offerings and grow together Background Screening Integrate our comprehensive background screening solutions into your platform AI & Data Intelligence Leverage our AI-powered data intelligence solutions for advanced analytics Business Technological Solutions Comprehensive tech solutions tailored for your business needs Partnership Opportunities Company Name Partnership Type Background Screening AI & Data Intelligence Business Technological Solutions Others Contact Email Partnership Goals Submit Partnership Application"},
  {"url": "https://intellidelve-beta.netlify.app/background-screening", "text": "Employee Background Screening Advanced Background Screening Process Discover our comprehensive 6-step verification process that combines AI technology with human expertise for unmatched accuracy and speed 24hr Fast 99.9% Secure AI Accurate 24/7 Expert"},
  {"url": "https://intellidelve-beta.netlify.app/background-screening", "text": "Our Comprehensive Screening Process Six carefully orchestrated steps ensure thorough, accurate, and compliant background verification for every candidate FCRA Compliant Process AI-Enhanced Accuracy 24-Hour Turnaround"},
  {"url": "https://intellidelve-beta.netlify.app/background-screening", "text": "01 Candidate Intake Secure collection of candidate information with encrypted data handling and consent management Encrypted Forms Digital Consent GDPR Compliant 02 Identity Verification Multi-layer identity verification using AI-powered document analysis and biometric matching Document OCR Biometric Match Fraud Detection 03 Database Screening Comprehensive database searches across criminal, employment, education, and professional records Criminal Records Employment History Education 04 Manual Verification Expert human review and direct verification with institutions for highest accuracy Expert Review Direct Contact Quality Assurance 05 AI Analysis Advanced AI algorithms analyze patterns, detect anomalies, and generate risk scores Pattern Analysis Risk Scoring Anomaly Detection 06 Report Generation Comprehensive, compliant reports delivered through secure channels with actionable insights Secure Delivery Compliance Check Actionable Insights"},
  {"url": "https://intellidelve-beta.netlify.app/background-screening", "text": "Why Choose IntelliDelve Advanced technology meets human expertise for the most comprehensive background screening available Lightning Fast 24-hour average turnaround Bank-Level Security SOC 2 Type II certified 99.8% Accuracy AI-enhanced verification Expert Support 24/7 customer service Start Your Screening Today"},
  {"url": "https://intellidelve-beta.netlify.app/industries/telecommunications", "text": "Industry-Specific Solutions Secure Communications with Verified Telecom Professionals Ensure network security and regulatory compliance with comprehensive screening for telecommunications staff Get Started Today Learn More Trusted by Industry Leaders Specialized solutions for telecommunications 4.9/5 Rating 50+ Clients 99% Success"},
  {"url": "https://intellidelve-beta.netlify.app/industries/telecommunications", "text": "Industry Overview Understanding Your Industry Needs Telecommunications professionals have access to critical infrastructure and sensitive communications data Our screening ensures your team meets security clearance requirements and regulatory standards 24/7 Support Available 48hr Turnaround Time"},
  {"url": "https://intellidelve-beta.netlify.app/industries/telecommunications", "text": "Our Services Specialized Screening Services Comprehensive verification solutions tailored specifically for telecommunications Security Clearance Verification Industry-compliant verification process Technical Certification Checks Industry-compliant verification process Criminal Background Screening Industry-compliant verification process Professional License Validation Industry-compliant verification process Identity and Credential Verification Industry-compliant verification process"},
  {"url": "https://intellidelve-beta.netlify.app/industries/telecommunications", "text": "Industry Compliance 100% Compliant 24/7 Monitoring Compliance & Security Meeting Industry Standards Aligned with telecommunications regulations and security standards Regulatory compliance monitoring Industry-specific protocols Automated compliance reporting Real-time security updates"},
  {"url": "https://intellidelve-beta.netlify.app/industries/telecommunications", "text": "Success Stories Real Results for Real Businesses See how we've helped organizations in telecommunications achieve their goals 99.8% Network Security Compliance Improvement Achieved A major telecom provider achieved 99.8% security compliance after implementing comprehensive screening, ensuring all network access personnel met strict security requirements. Industry Leader Telecommunications"},
  {"url": "https://intellidelve-beta.netlify.app/industries/government-public", "text": "Industry-Specific Solutions Trusted Public Service Through Comprehensive Screening Ensure public trust and security with thorough background checks for government and public sector employees Get Started Today Learn More Trusted by Industry Leaders Specialized solutions for government & public sector 4.9/5 Rating 50+ Clients 99% Success"},
  {"url": "https://intellidelve-beta.netlify.app/industries/government-public", "text": "Industry Overview Understanding Your Industry Needs Government and public sector roles require the highest levels of integrity and security clearance Our comprehensive screening ensures public servants meet strict requirements for serving the community 24/7 Support Available 48hr Turnaround Time"},
  {"url": "https://intellidelve-beta.netlify.app/industries/government-public", "text": "Our Services Specialized Screening Services Comprehensive verification solutions tailored specifically for government & public sector Security Clearance Processing Industry-compliant verification process Criminal Background Investigation Industry-compliant verification process Financial Integrity Assessment Industry-compliant verification process Professional Reference Verification Industry-compliant verification process Continuous Monitoring Services Industry-compliant verification process"},
  {"url": "https://intellidelve-beta.netlify.app/industries/government-public", "text": "Success Stories Real Results for Real Businesses See how we've helped organizations in government & public sector achieve their goals 100% Security Clearance Success Rate Improvement Achieved A government agency achieved 100% success rate in security clearance processing, ensuring all personnel met strict requirements for handling sensitive public information. Industry Leader Government & Public Sector"},
  {"url": "https://intellidelve-beta.netlify.app/solutions/tech-innovation", "text": "Tech & Innovation Tech & Innovation Services Transform your business with cutting-edge technology solutions, custom software development, and innovative digital platforms designed to accelerate growth and efficiency 100+ Projects Delivered 50+ Technologies 24/7 Support Schedule Consultation Explore Solutions"},
  {"url": "https://intellidelve-beta.netlify.app/solutions/tech-innovation", "text": "What We Offer Our technology and innovation services help organizations build, integrate, and optimize digital solutions that drive efficiency, growth, and competitive advantage Custom software development with modern frameworks and technologies System integration and API development for seamless connectivity Cloud infrastructure setup and DevOps implementation Data migration and analytics platform development Mobile application development for iOS and Android platforms Web application development with responsive design Digital transformation consulting and strategy development Technology architecture design and optimization"},
  {"url": "https://intellidelve-beta.netlify.app/solutions/corporate-due-diligence", "text": "Corporate Due Diligence Corporate Due Diligence & Risk Compliance Make informed business decisions with comprehensive due diligence investigations and regulatory compliance assessments for partnerships, acquisitions, and investments 500+ Companies Screened 99% Accuracy Rate 24/7 Monitoring Schedule Consultation Explore Solutions"},
  {"url": "https://intellidelve-beta.netlify.app/solutions/corporate-due-diligence", "text": "What We Offer Our corporate due diligence services provide in-depth analysis of businesses, executives, and transactions to help you make informed decisions while ensuring regulatory compliance Comprehensive business background investigations and financial analysis Executive leadership screening and reputation analysis Regulatory compliance verification across multiple jurisdictions Anti-Money Laundering (AML) and Know Your Customer (KYC) screening Citizen by Investment (CBI) due diligence and compliance verification Sanctions and watchlist screening with real-time monitoring Corporate structure analysis and beneficial ownership identification Litigation history and legal risk assessment Financial health evaluation and credit risk analysis"},
  {"url": "https://intellidelve-beta.netlify.app/clients", "text": "Industries We Serve Our diverse client base spans across multiple industries, each with unique verification requirements Fortune 500 Companies Leading multinational corporations trust us with their most critical hiring decisions Global Tech Giants Financial Institutions Healthcare Networks Manufacturing Leaders Government Agencies Secure and compliant background verification for public sector organizations Federal Departments Law Enforcement Defense Contractors Public Utilities Healthcare Organizations Specialized screening solutions for healthcare providers and medical institutions Hospital Systems Medical Practices Pharmaceutical Companies Healthcare Staffing Financial Services Comprehensive due diligence and compliance screening for financial institutions Investment Banks Insurance Companies Fintech Startups Credit Unions"},
  {"url": "https://intellidelve-beta.netlify.app/clients", "text": "What Our Clients Say Real feedback from organizations that trust IntelliDelve IntelliDelve's AI-powered screening has revolutionized our hiring process The accuracy and speed are unmatched. Sarah Johnson CHRO, Global Tech Corp Their compliance expertise and attention to detail have been invaluable for our regulatory requirements. Michael Chen Risk Manager, Financial Services Inc The comprehensive reporting and real-time updates have streamlined our entire verification workflow. Emily Rodriguez HR Director, Healthcare Network"},
  {"url": "https://intellidelve-beta.netlify.app/industries/hospitality-food-leisure", "text": "Industry-Specific Solutions Enhance Guest Trust with Hospitality Background Screening Hire staff who meet safety and service standards with fast, reliable background checks for hotels, restaurants, and resorts Get Started Today Learn More Trusted by Industry Leaders Specialized solutions for hospitality, food & leisure sector 4.9/5 Rating 50+ Clients 99% Success"},
  {"url": "https://intellidelve-beta.netlify.app/industries/hospitality-food-leisure", "text": "Industry Overview Understanding Your Industry Needs Customer-facing roles require clean histories and verified credentials We screen for criminal pasts, previous misconduct, and employment inconsistencies 24/7 Support Available 48hr Turnaround Time"},
  {"url": "https://intellidelve-beta.netlify.app/industries/hospitality-food-leisure", "text": "Success Stories Real Results for Real Businesses See how we've helped organizations in hospitality, food & leisure sector achieve their goals Luxury Hotel Chain Cuts Internal Theft by 45% Improvement Achieved After adopting IntelliDelve across all properties, the chain uncovered candidates with fake IDs, undisclosed criminal records, and falsified employment histories. Industry Leader Hospitality, Food & Leisure Sector"}
];

export const DelversBot: React.FC<DelversBotProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { openCalendly } = useCalendlyContext();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {

      setTimeout(() => {
        addBotMessage(
          "👋 Hi! I'm Delver, your AI assistant at IntelliDelve. I'm here to help you with background screening, AI solutions, and any questions about our services. How can I assist you today?",
          [
            "Background Screening Services",
            "AI & Data Science Solutions",
            "Schedule a Meeting",
            "Get a Quote"
          ]
        );
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text: string, quickReplies?: string[]) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      quickReplies
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  // Intelligent text matching function
  const findRelevantContent = (query: string): KnowledgeChunk[] => {
    const queryLower = query.toLowerCase();
    const keywords = queryLower.split(' ').filter(word => word.length > 2);
    
    const scoredChunks = knowledgeBase.map(chunk => {
      const textLower = chunk.text.toLowerCase();
      let score = 0;
      
      // Exact phrase matching (higher weight)
      if (textLower.includes(queryLower)) {
        score += 10;
      }
      
      // Keyword matching
      keywords.forEach(keyword => {
        const keywordCount = (textLower.match(new RegExp(keyword, 'g')) || []).length;
        score += keywordCount * 2;
      });
      
      // Industry-specific matching
      const industryTerms = ['telecommunications', 'government', 'hospitality', 'healthcare', 'finance', 'technology'];
      industryTerms.forEach(term => {
        if (queryLower.includes(term) && textLower.includes(term)) {
          score += 5;
        }
      });
      
      // Service-specific matching
      const serviceTerms = ['background screening', 'due diligence', 'compliance', 'verification', 'tech innovation'];
      serviceTerms.forEach(term => {
        if (queryLower.includes(term.split(' ')[0]) && textLower.includes(term)) {
          score += 5;
        }
      });
      
      return { ...chunk, score };
    });
    
    return scoredChunks
      .filter(chunk => chunk.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const getBotResponse = async (userMessage: string): Promise<{ text: string; quickReplies?: string[] }> => {
    try {
      const response = await geminiService.generateResponse(userMessage);
      
      // Generate contextual quick replies based on the message content
      const message = userMessage.toLowerCase();
      let quickReplies: string[] = [];
      
      if (message.includes('background') || message.includes('screening')) {
        quickReplies = ["Employment Verification", "Criminal Background Check", "Education Verification", "Schedule Consultation"];
      } else if (message.includes('ai') || message.includes('data') || message.includes('tech')) {
        quickReplies = ["Custom Software", "System Integration", "Cloud Infrastructure", "Mobile Development"];
      } else if (message.includes('price') || message.includes('cost') || message.includes('quote')) {
        quickReplies = ["Schedule Consultation", "Get Quote", "View Packages", "Contact Sales"];
      } else if (message.includes('meeting') || message.includes('consultation') || message.includes('schedule')) {
        quickReplies = ["Background Screening Consultation", "AI Solutions Meeting", "General Consultation", "Technical Demo"];
      } else if (message.includes('industry') || message.includes('sector')) {
        quickReplies = ["Healthcare", "Technology", "Finance", "Government"];
      } else {
        quickReplies = ["Our Services", "Schedule Consultation", "Get Quote", "Learn More"];
      }
      
      return {
        text: response,
        quickReplies
      };
    } catch (error) {
      console.error('Error getting bot response:', error);
      // Fallback response
      return {
        text: "I'd be happy to help you with that! For detailed information about our services, I recommend scheduling a consultation with one of our specialists who can provide personalized assistance.",
        quickReplies: ["Schedule Consultation", "Browse Services", "Contact Support", "Learn More"]
      };
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    const userMessage = inputValue;
    setInputValue('');

    simulateTyping();

    setTimeout(async () => {
      const response = await getBotResponse(userMessage);
      addBotMessage(response.text, response.quickReplies);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);

    simulateTyping();

    setTimeout(async () => {
      let response;

      if (reply.includes('Schedule') || reply.includes('Consultation') || reply.includes('Meeting')) {
        openCalendly("Delver's Bot - Schedule Consultation");
        response = { text: "Perfect! I've opened our scheduling system for you. You can book a time that works best for your schedule. Our team will be ready to discuss your specific needs!" };
      } else if (reply.includes('Background Screening')) {
        response = { text: "🔍 Excellent choice! Our background screening services are trusted by companies worldwide. We offer comprehensive verification including employment, criminal, education, and reference checks. Would you like to see our screening packages or schedule a demo?", quickReplies: ["View Packages", "Schedule Demo", "Learn More", "Get Quote"] };
      } else if (reply.includes('AI Solutions') || reply.includes('AI')) {
        response = { text: "🤖 Our AI solutions are designed to transform businesses through intelligent automation. We specialize in NLP, computer vision, predictive analytics, and custom AI development. Which area interests you most?", quickReplies: ["NLP Solutions", "Computer Vision", "Predictive Analytics", "Custom Development"] };
      } else {
        response = await getBotResponse(reply);
      }

      addBotMessage(response.text, response.quickReplies);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="group w-14 h-14 bg-gradient-to-r from-primary to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse flex items-center justify-center"
          aria-label="Open Delver's Bot"
        >
          <MessageCircle className="h-6 w-6" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
            1
          </div>
        </button>

        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
            Chat with Delver's Bot
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
      }`}>

        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary to-blue-600 text-white rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bot className="h-8 w-8" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold">Delver's Bot</h3>
              <p className="text-xs opacity-90">AI Assistant • Online</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isBot ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    }`}>
                      {message.isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className={`px-4 py-2 rounded-2xl ${
                        message.isBot
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          : 'bg-primary text-white'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                      </div>
                      {message.quickReplies && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.quickReplies.map((reply, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickReply(reply)}
                              className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors border border-blue-200 dark:border-blue-700"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
