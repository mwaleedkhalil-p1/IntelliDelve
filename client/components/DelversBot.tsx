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
      // Initial greeting
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

  const getBotResponse = (userMessage: string): { text: string; quickReplies?: string[] } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('background') || message.includes('screening') || message.includes('verification')) {
      return {
        text: "🔍 Our background screening services include employment verification, criminal checks, education verification, and more. We serve clients globally with 99.7% accuracy and fast turnaround times. Would you like to learn more about a specific service?",
        quickReplies: ["Employment Verification", "Criminal Background Check", "Education Verification", "Schedule Consultation"]
      };
    }
    
    if (message.includes('ai') || message.includes('data science') || message.includes('machine learning')) {
      return {
        text: "🤖 We offer cutting-edge AI solutions including NLP, computer vision, predictive analytics, recommendation engines, and custom AI development. Our AI-powered tools help businesses automate processes and gain valuable insights. What AI solution interests you?",
        quickReplies: ["Natural Language Processing", "Computer Vision", "Predictive Analytics", "Custom AI Development"]
      };
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('quote') || message.includes('pricing')) {
      return {
        text: "💰 Our pricing varies based on your specific needs and volume. We offer competitive rates and flexible packages. I'd recommend scheduling a consultation with our team to get a personalized quote. Would you like me to set that up?",
        quickReplies: ["Schedule Consultation", "Get Quote", "View Packages", "Contact Sales"]
      };
    }
    
    if (message.includes('meeting') || message.includes('consultation') || message.includes('schedule') || message.includes('appointment')) {
      return {
        text: "📅 I'd be happy to help you schedule a meeting with our experts! You can book a consultation directly through our calendar system. What type of consultation are you looking for?",
        quickReplies: ["Background Screening Consultation", "AI Solutions Meeting", "General Consultation", "Technical Demo"]
      };
    }
    
    if (message.includes('contact') || message.includes('support') || message.includes('help')) {
      return {
        text: "📞 You can reach our team through multiple channels:\n\n• Schedule a meeting: Use our calendar system\n• Email: contact@intellidelve.com\n• Phone: Available during business hours\n• Live chat: Right here with me!\n\nHow would you prefer to connect?",
        quickReplies: ["Schedule Meeting", "Send Email", "Continue Chat", "View Contact Page"]
      };
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return {
        text: "Hello! 👋 Great to meet you! I'm here to help you learn about IntelliDelve's background screening and AI solutions. What would you like to know more about?",
        quickReplies: ["Our Services", "Background Screening", "AI Solutions", "Get Started"]
      };
    }
    
    // Default response
    return {
      text: "I'd be happy to help you with that! For detailed information about our services, I recommend speaking with one of our specialists. You can also explore our website or schedule a consultation. What would work best for you?",
      quickReplies: ["Schedule Consultation", "Browse Services", "Contact Support", "Learn More"]
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    addUserMessage(inputValue);
    const userMessage = inputValue;
    setInputValue('');
    
    simulateTyping();
    
    setTimeout(() => {
      const response = getBotResponse(userMessage);
      addBotMessage(response.text, response.quickReplies);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);
    
    simulateTyping();
    
    setTimeout(() => {
      let response;
      
      if (reply.includes('Schedule') || reply.includes('Consultation') || reply.includes('Meeting')) {
        openCalendly("Delver's Bot - Schedule Consultation");
        response = { text: "Perfect! I've opened our scheduling system for you. You can book a time that works best for your schedule. Our team will be ready to discuss your specific needs!" };
      } else if (reply.includes('Background Screening')) {
        response = { text: "🔍 Excellent choice! Our background screening services are trusted by companies worldwide. We offer comprehensive verification including employment, criminal, education, and reference checks. Would you like to see our screening packages or schedule a demo?", quickReplies: ["View Packages", "Schedule Demo", "Learn More", "Get Quote"] };
      } else if (reply.includes('AI Solutions') || reply.includes('AI')) {
        response = { text: "🤖 Our AI solutions are designed to transform businesses through intelligent automation. We specialize in NLP, computer vision, predictive analytics, and custom AI development. Which area interests you most?", quickReplies: ["NLP Solutions", "Computer Vision", "Predictive Analytics", "Custom Development"] };
      } else {
        response = getBotResponse(reply);
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
        
        {/* Tooltip */}
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
        {/* Header */}
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
            {/* Messages */}
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

            {/* Input */}
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
