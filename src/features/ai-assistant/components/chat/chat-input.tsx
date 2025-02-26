import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  handleChatSubmit: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  ariaLabel: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  handleChatSubmit,
  handleInputChange,
  input,
  onKeyDown,
  ariaLabel
}) => (
  <form onSubmit={handleChatSubmit} className="flex items-center p-4 border-t bg-gray-800 shadow-inner rounded-b-lg">
    <Input
      value={input}
      onChange={handleInputChange}
      placeholder="Type your message..."
      className="flex-1 h-10 border rounded-md bg-gray-700 text-white focus:ring focus:ring-blue-500"
      onKeyDown={onKeyDown}
      aria-label={ariaLabel}
    />
    <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 transition duration-200 h-10 px-4">Send</Button>
  </form>
); 