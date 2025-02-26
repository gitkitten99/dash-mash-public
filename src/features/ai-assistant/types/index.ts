import { Message } from 'ai';

export interface ChatMessage extends Omit<Message, 'createdAt'> {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system' | 'data';
  createdAt?: Date;
}

export interface ModelInfo {
  id: string;
  name: string;
  description: string;
  contextWindow: number;
  pricing: {
    prompt: number;
    completion: number;
  };
  isFree: boolean;
}

export interface ChatPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: number;
  codeTheme: string;
  notifications: boolean;
  preferredModel: string;
  modelSettings: Record<string, ModelSettings>;
}

export interface ModelSettings {
  temperature: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

export interface StoredChat {
  id: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  model: string;
  title?: string;
}

export interface ModelConfig {
  id: string;
  name: string;
  description: string;
  contextWindow: number;
  maxOutput: number;
  category: 'text' | 'multimodal';
  features: string[];
  latency: string;
  throughput: string;
}

export interface ExtendedMessage extends Omit<Message, 'createdAt'> {
  imageUrl?: string;
  createdAt: number;
} 