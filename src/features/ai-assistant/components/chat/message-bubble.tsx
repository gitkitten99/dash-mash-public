'use client';

import { ChatMessage } from '../../types';
import { Icons } from '@/components/icons';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`p-4 rounded-lg shadow-lg transition-all duration-200 ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} shadow-md w-3/4`}
        style={{ borderRadius: '12px' }}
      >
        {message.content}
      </div>
      <div className="ml-2 flex items-center">
        {isUser ? <Icons.user className="w-8 h-8 text-blue-500" /> : <Icons.ai className="w-8 h-8 text-gray-500" />}
      </div>
    </div>
  );
}; 