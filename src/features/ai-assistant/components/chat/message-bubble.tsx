'use client';

import { ChatMessage } from '../../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div 
        className={`p-3 rounded-lg shadow-lg transition-all duration-200 ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
        style={{ borderRadius: '12px' }}
      >
        {message.content}
      </div>
      <img 
        src={isUser ? '/path/to/user-avatar.png' : '/path/to/assistant-avatar.png'} 
        alt="Avatar" 
        className="w-8 h-8 rounded-full ml-2" 
      />
    </div>
  );
}; 