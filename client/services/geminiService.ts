import { knowledgeBase } from '../components/DelversBot';

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

interface ChatMessage {
  role: 'user' | 'model';
  parts: {
    text: string;
  }[];
}

class GeminiService {
  private apiKey: string;
  private baseUrl: string;
  private conversationHistory: ChatMessage[] = [];

  constructor() {
    this.apiKey = 'AIzaSyCDHwO0fz8PSkc7tTfNOrMGvIembVYnSBc';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
  }

  private createSystemPrompt(): string {
    const websiteContent = knowledgeBase.map(chunk => 
      `URL: ${chunk.url}\nContent: ${chunk.text}`
    ).join('\n\n');

    return `You are Delver, an AI assistant for IntelliDelve, a professional background screening and AI solutions company. You must ONLY provide information based on the website content provided below. Be conversational, helpful, and human-like in your responses.

IMPORTANT RESTRICTIONS:
1. ONLY use information from the website content provided below
2. If asked about something not in the website content, politely redirect to scheduling a consultation
3. Be conversational and human-like, not robotic
4. Keep responses concise but informative
5. Always offer to help further or schedule a consultation
6. Use emojis sparingly and naturally

WEBSITE CONTENT:
${websiteContent}

Remember: You represent IntelliDelve professionally while being approachable and human-like.`;
  }

  private findRelevantContent(query: string): string {
    const queryLower = query.toLowerCase();
    const relevantChunks = knowledgeBase.filter(chunk => {
      const textLower = chunk.text.toLowerCase();
      const urlLower = chunk.url.toLowerCase();
      
      // Check for keyword matches
      const keywords = queryLower.split(' ').filter(word => word.length > 2);
      return keywords.some(keyword => 
        textLower.includes(keyword) || urlLower.includes(keyword)
      );
    });

    return relevantChunks.slice(0, 5).map(chunk => 
      `URL: ${chunk.url}\nContent: ${chunk.text}`
    ).join('\n\n');
  }

  async generateResponse(userMessage: string): Promise<string> {
    try {
      const relevantContent = this.findRelevantContent(userMessage);
      
      const prompt = `${this.createSystemPrompt()}

Most relevant content for this query:
${relevantContent}

User question: ${userMessage}

Provide a helpful, human-like response based ONLY on the website content above. If the information isn't available in the content, suggest scheduling a consultation.`;

      const requestBody = {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      };

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        const generatedText = data.candidates[0].content.parts[0].text;
        return this.cleanMarkdownFormatting(generatedText);
      } else {
        throw new Error('No response generated from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      // Fallback to basic response
      return "I'd be happy to help you with that! For detailed information about our services, I recommend scheduling a consultation with one of our specialists who can provide personalized assistance.";
    }
  }

  private cleanMarkdownFormatting(text: string): string {
    // Remove ** bold formatting
    return text.replace(/\*\*(.*?)\*\*/g, '$1');
  }

  clearConversationHistory(): void {
    this.conversationHistory = [];
  }
}

export const geminiService = new GeminiService();
export default geminiService;