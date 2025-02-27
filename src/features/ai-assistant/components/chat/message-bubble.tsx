'use client';

import { ChatMessage } from '../../types';
import { Icons } from '@/components/icons';

interface MessageBubbleProps {
  message: ChatMessage;
  timestamp: string;
  type?: 'user' | 'assistant' | 'error' | 'system';
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, timestamp, type }) => {
  const isUser = type === 'user';
  const isError = type === 'error';
  const isSystem = type === 'system';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`p-4 rounded-lg shadow-lg transition-all duration-200 ${isUser ? 'bg-blue-500 text-white' : isError ? 'bg-red-500 text-white' : isSystem ? 'bg-yellow-500 text-black' : 'bg-gray-300 text-black'} shadow-md w-3/4`}
        style={{ borderRadius: '12px' }}
      >
        {message.content}
        <div className="text-xs text-gray-500 mt-1">{timestamp}</div>
      </div>
      <div className="ml-2 flex items-center">
        {isUser ? <Icons.user className="w-8 h-8 text-blue-500" /> : <Icons.ai className="w-8 h-8 text-gray-500" />}
      </div>
    </div>
  );
}; 