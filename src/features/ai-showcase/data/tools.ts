import { Brain, Bot, Sparkles, MessageSquare, Image, Code2, Wand2, type LucideIcon } from 'lucide-react';

export interface DetailedInfo {
  overview: string;
  capabilities: string[];
  useCases: string;
  pricing: string;
  link: string;
}

export interface AITool {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  status: string;
  detailedInfo: DetailedInfo;
}

export interface AICategory {
  category: string;
  items: AITool[];
}

export const aiTools: AICategory[] = [
  {
    category: "Language Models",
    items: [
      {
        title: "ChatGPT",
        description: "Advanced conversational AI for natural language processing and generation",
        features: ["Text generation", "Code assistance", "Creative writing"],
        icon: MessageSquare,
        status: "Popular",
        detailedInfo: {
          overview: "ChatGPT is an AI language model developed by OpenAI that can engage in human-like conversations, assist with various tasks, and generate creative content.",
          capabilities: [
            "Natural language understanding and generation",
            "Context-aware responses",
            "Multiple language support",
            "Code explanation and debugging",
            "Content creation and editing"
          ],
          useCases: "Commonly used for customer service, content creation, programming assistance, and educational purposes.",
          pricing: "Available in both free and premium (Plus) versions",
          link: "https://chat.openai.com"
        }
      },
      {
        title: "Claude",
        description: "Anthropic's AI assistant focused on safety and helpful interactions",
        features: ["Long context", "Technical analysis", "Research"],
        icon: Bot,
        status: "New",
        detailedInfo: {
          overview: "Claude is an AI assistant created by Anthropic, designed with a focus on safety, helpfulness, and the ability to handle complex tasks.",
          capabilities: [
            "Extended context understanding",
            "Detailed technical analysis",
            "Research assistance",
            "Code review and generation",
            "Document analysis"
          ],
          useCases: "Ideal for research, technical writing, data analysis, and complex problem-solving.",
          pricing: "Available through Anthropic's platform with various subscription tiers",
          link: "https://anthropic.com/claude"
        }
      }
    ]
  },
  {
    category: "Image Generation",
    items: [
      {
        title: "DALL-E",
        description: "OpenAI's image generation model that creates images from text descriptions",
        features: ["Text to image", "Image editing", "Art creation"],
        icon: Image,
        status: "Stable",
        detailedInfo: {
          overview: "DALL-E is an AI system by OpenAI that can create realistic images and art from natural language descriptions.",
          capabilities: [
            "Text-to-image generation",
            "Image editing and manipulation",
            "Style transfer",
            "Multiple art styles",
            "Variations generation"
          ],
          useCases: "Perfect for digital art creation, design mockups, concept visualization, and creative projects.",
          pricing: "Credit-based system with both free and paid tiers",
          link: "https://openai.com/dall-e-3"
        }
      },
      {
        title: "Midjourney",
        description: "AI art generator known for high-quality and artistic image creation",
        features: ["Artistic styles", "Detailed control", "Variations"],
        icon: Sparkles,
        status: "Popular",
        detailedInfo: {
          overview: "Midjourney is an AI art generator that creates stunning, artistic images from text descriptions with a unique aesthetic style.",
          capabilities: [
            "High-quality image generation",
            "Artistic style control",
            "Advanced composition",
            "Detail refinement",
            "Version history"
          ],
          useCases: "Ideal for artists, designers, and creative professionals seeking unique visual content.",
          pricing: "Subscription-based with different tiers for various needs",
          link: "https://www.midjourney.com"
        }
      }
    ]
  },
  {
    category: "Code Assistance",
    items: [
      {
        title: "GitHub Copilot",
        description: "AI-powered code completion and suggestion tool",
        features: ["Code completion", "Documentation", "Problem solving"],
        icon: Code2,
        status: "Essential",
        detailedInfo: {
          overview: "GitHub Copilot is an AI pair programmer that helps developers write better code faster with smart suggestions and completions.",
          capabilities: [
            "Real-time code suggestions",
            "Context-aware completions",
            "Documentation generation",
            "Test case creation",
            "Multi-language support"
          ],
          useCases: "Essential for developers looking to increase productivity and code quality.",
          pricing: "Monthly subscription with free tier for students and open source",
          link: "https://github.com/features/copilot"
        }
      },
      {
        title: "Amazon CodeWhisperer",
        description: "AI coding companion that helps developers write code faster",
        features: ["Security scanning", "Code generation", "Best practices"],
        icon: Wand2,
        status: "Growing",
        detailedInfo: {
          overview: "Amazon CodeWhisperer is an AI coding companion that provides intelligent code suggestions while maintaining security best practices.",
          capabilities: [
            "Code generation",
            "Security scanning",
            "Best practice recommendations",
            "API usage suggestions",
            "Multi-language support"
          ],
          useCases: "Great for developers working with AWS services and seeking secure code generation.",
          pricing: "Free for individual developers, paid plans for enterprise",
          link: "https://aws.amazon.com/codewhisperer/"
        }
      }
    ]
  }
]; 