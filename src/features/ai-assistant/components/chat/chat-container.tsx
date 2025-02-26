'use client';

import { useChat } from 'ai/react';
import { MessageBubble } from './message-bubble';
import { Card } from '@/components/ui/card';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export const ChatContainer: React.FC = () => {
  const { messages, handleSubmit, input, handleInputChange } = useChat();
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 200;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSubmit();
    }
  };

  const handleInputChangeWithCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    setCharCount(e.target.value.length);
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 overflow-y-auto p-4 bg-gray-850 rounded-lg shadow-md w-full">
        {messages
          .filter(message => message.role !== 'data' && message.createdAt)
          .map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        <div ref={chatEndRef} />
      </Card>
      <form onSubmit={handleSendMessage} className="p-4 flex items-center">
        <input
          type="text"
          value={input}
          onChange={handleInputChangeWithCount}
          placeholder="Type your message here..."
          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={maxChars}
        />
        <Button type="submit" className="ml-2 bg-blue-500 text-white rounded-lg p-2">
          Send
        </Button>
        <span className="ml-2 text-gray-500">{`${charCount}/${maxChars}`}</span>
      </form>
    </div>
  );
};
