import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { ModelConfig } from '../types';

export const openRouterConfig = {
  defaultModel: 'cognitivecomputations/dolphin3.0-mistral-24b:free',  // Free, powerful general purpose model
  models: {
    text: [
      {
        id: 'cognitivecomputations/dolphin3.0-mistral-24b:free',
        name: 'Dolphin 3.0 Mistral',
        description: 'Powerful general-purpose model with large context window',
        contextWindow: 32768,
        maxOutput: 32768,
        category: 'text',
        features: ['General Purpose', 'Code', 'Analysis'],
        latency: '1.2s',
        throughput: '66t/s'
      },
      {
        id: 'deepseek/deepseek-r1:free',
        name: 'DeepSeek R1',
        description: 'Advanced reasoning and analytical capabilities',
        contextWindow: 32768,
        maxOutput: 32768,
        category: 'text',
        features: ['Reasoning', 'Analysis', 'Technical'],
        latency: '1.1s',
        throughput: '70t/s'
      },
      {
        id: 'deepseek/deepseek-r1-distill-llama-70b:free',
        name: 'DeepSeek R1 70B',
        description: 'High-performance model for complex tasks',
        contextWindow: 32768,
        maxOutput: 32768,
        category: 'text',
        features: ['Complex Tasks', 'Long Context', 'Technical'],
        latency: '1.3s',
        throughput: '65t/s'
      }
    ],
    multimodal: [
      {
        id: 'qwen/qwen-vl-plus:free',
        name: 'Qwen VL Plus',
        description: 'Vision-language model for image understanding',
        contextWindow: 8192,
        maxOutput: 8192,
        category: 'multimodal',
        features: ['Image Analysis', 'Visual Q&A', 'Description'],
        latency: '1.5s',
        throughput: '50t/s'
      },
      {
        id: 'qwen/qwen2.5-vl-72b-instruct:free',
        name: 'Qwen 2.5 VL 72B',
        description: 'Advanced vision-language model with instruction following',
        contextWindow: 8192,
        maxOutput: 8192,
        category: 'multimodal',
        features: ['Image Understanding', 'Detailed Analysis', 'Instructions'],
        latency: '1.6s',
        throughput: '48t/s'
      }
    ]
  },
};

export const openRouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || '',
  baseURL: 'https://openrouter.ai/api/v1',
  compatibility: 'strict',
  headers: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000', // Site URL for rankings
    'X-Title': 'AI Assistant', // Site title for rankings
  },
}); 