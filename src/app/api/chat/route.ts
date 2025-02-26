import { streamText } from 'ai';
import { openRouter, openRouterConfig } from '@/features/ai-assistant/config/api-config';

// Force edge runtime
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { messages, model = openRouterConfig.defaultModel } = await req.json();

    // Find model configuration
    const allModels = [
      ...openRouterConfig.models.text,
      ...openRouterConfig.models.multimodal
    ];
    const modelConfig = allModels.find(m => m.id === model);

    if (!modelConfig) {
      return new Response(
        JSON.stringify({ error: 'Invalid model selected' }),
        { status: 400 }
      );
    }

    console.log('Using model:', modelConfig.name);
    console.log('Messages:', JSON.stringify(messages, null, 2));

    const systemMessage = modelConfig.category === 'multimodal'
      ? 'You are the AI Assistant, an expert in analyzing both text and images. You provide clear, accurate, and helpful information while maintaining a professional tone.'
      : 'You are the AI Assistant, an expert in cryptocurrency, blockchain technology, and trading. You provide clear, accurate, and helpful information while maintaining a professional tone.';

    const chatMessages = [
      {
        role: 'system',
        content: systemMessage
      },
      ...messages
    ];

    const result = await streamText({
      model: openRouter(model),
      messages: chatMessages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({ error: 'There was an error processing your request' }),
      { status: 500 }
    );
  }
}

// SSE parser
type ParsedEvent = {
  type: string;
  data: string;
};

type ReconnectInterval = {
  type: 'reconnect-interval';
  value: number;
};

function createParser(onParse: (event: ParsedEvent | ReconnectInterval) => void) {
  let buffer = '';
  return {
    feed(chunk: string) {
      buffer += chunk;
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        if (trimmed.startsWith(':')) continue;
        
        const colonIndex = trimmed.indexOf(':');
        if (colonIndex === -1) continue;
        
        const type = trimmed.slice(0, colonIndex).trim();
        const data = trimmed.slice(colonIndex + 1).trim();
        
        onParse({ type, data });
      }
    },
  };
} 