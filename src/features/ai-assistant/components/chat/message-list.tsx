import React from 'react';
import { ExtendedMessage } from './chat-container';
import { Card } from '@/components/ui/card';

interface MessageListProps {
  messages: ExtendedMessage[];
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  ariaLabel: string;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, chatEndRef, ariaLabel }) => (
  <div className="flex-1 overflow-y-auto p-4 bg-gray-850" style={{ minHeight: 'calc(100vh - 200px)' }} aria-label={ariaLabel}>
    {messages.map(message => (
      <MessageBubble key={message.id} message={message} />
    ))}
    <div ref={chatEndRef} />
  </div>
);

const MessageBubble: React.FC<{ message: ExtendedMessage }> = ({ message }) => (
  <Card className={`my-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
    <div className={`inline-block p-3 rounded-lg shadow-md ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}>
      <div className="flex items-center">
        {message.content}
        <span className="text-xs text-gray-400 ml-2">
          {message.createdAt ? new Date(message.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
        </span>
      </div>
    </div>
  </Card>
);