'use client';

import { useChat } from 'ai/react';
import { MessageBubble } from './message-bubble';
import { Card } from '@/components/ui/card';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TypingIndicator } from './typing-indicator';

export const ChatContainer: React.FC = () => {
  const { messages, handleSubmit, input, handleInputChange } = useChat();
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 200;
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setIsTyping(true);
      handleSubmit();
    }
  };

  const handleInputChangeWithCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    setCharCount(e.target.value.length);
    setIsTyping(true);
  };

  const handleClearInput = () => {
    const event = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(event);
    setCharCount(0);
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        setIsTyping(false);
      }
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full p-6">
      <Card className="flex-1 overflow-y-auto p-6 bg-gray-850 rounded-lg shadow-md w-full">
        {messages
          .filter(message => message.role !== 'data' && message.createdAt)
          .map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        {isTyping && <TypingIndicator />}
        <div ref={chatEndRef} />
      </Card>
      <form onSubmit={handleSendMessage} className="p-4 flex items-center border-t border-gray-700">
        <input
          type="text"
          value={input}
          onChange={handleInputChangeWithCount}
          placeholder="Ask me anything..."
          className="border rounded-lg shadow-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          maxLength={maxChars}
        />
        <Button type="button" onClick={handleClearInput} className="ml-2 bg-gray-300 text-black rounded-lg p-2">
          Clear
        </Button>
        <Button type="submit" className="ml-2 bg-blue-500 text-white rounded-lg p-2">
          Send
        </Button>
        <span className="ml-2 text-gray-500 text-lg">{`${charCount}/${maxChars}`}</span>
      </form>
    </div>
  );
};
