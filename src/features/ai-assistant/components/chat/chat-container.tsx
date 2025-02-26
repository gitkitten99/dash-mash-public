'use client';

import { useChat } from 'ai/react';
import { type Message } from 'ai';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { useEffect, useRef, useState, Suspense } from 'react';
import { ChatMessage } from '../../types';
import { openRouterConfig } from '../../config/api-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { IconRobot, IconUser, IconRefresh, IconEdit, IconSend, IconCopy, IconPlayerStop } from '@tabler/icons-react';
import { toast } from 'sonner';
import { ModelSelector } from './model-selector';
import { FileUpload } from './file-upload';
import { motion } from 'framer-motion';
import userAvatar from '@/assets/user-avatar.webp';
import assistantAvatar from '@/assets/assistant-avatar.webp';
import { MessageList } from './message-list';
import { ChatInput } from './chat-input';
import { Header } from './header';  
import { Footer } from './footer';

export interface ExtendedMessage extends Message {
  imageUrl?: string | null;
}

interface ChatContainerProps {
  initialMessages?: ChatMessage[];
  className?: string;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Convert ChatMessage to Message for the useChat hook
const convertToMessage = (chatMessage: ChatMessage): ExtendedMessage => ({
  id: chatMessage.id,
  content: chatMessage.content,
  role: chatMessage.role as 'user' | 'assistant' | 'system',
  createdAt: chatMessage.createdAt,
  imageUrl: undefined,
});

// Helper function to check if a model is multimodal
const isModelMultimodal = (modelId: string) => {
  const allModels = [
    ...openRouterConfig.models.text,
    ...openRouterConfig.models.multimodal
  ];
  const model = allModels.find(m => m.id === modelId);
  return model?.category === 'multimodal';
};

export function ChatContainer({
  initialMessages = [],
  className
}: ChatContainerProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentModel, setCurrentModel] = useState(openRouterConfig.defaultModel);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [displayedImages, setDisplayedImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit: handleChatSubmit, 
    isLoading, 
    error: chatError, 
    setMessages,
    stop,
    setInput
  } = useChat({
    api: '/api/chat',
    initialMessages: initialMessages.map(convertToMessage),
    body: {
      model: currentModel
    },
    onResponse: (response) => {
      console.log('Chat response:', response);
    },
    onFinish: (message) => {
      if (input.trim()) {
        setInputHistory(prev => [input, ...prev].slice(0, 10));
      }
    },
    onError: (error) => {
      console.error('Chat error:', error);
      setError('An error occurred while sending the message.');
      toast.error('An error occurred while sending the message.');
    }
  });

  const handleEdit = (message: ExtendedMessage) => {
    setEditingMessageId(message.id);
    setEditingContent(message.content);
  };

  const handleSaveEdit = (id: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, content: editingContent } : msg
    ));
    setEditingMessageId(null);
    setEditingContent('');
  };

  const handleRegenerate = async (messageIndex: number) => {
    const messagesUntilIndex = messages.slice(0, messageIndex + 1);
    setMessages(messagesUntilIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleChatSubmit(e as any);
    }

    if (e.key === 'ArrowUp' && !input) {
      e.preventDefault();
      if (inputHistory.length > 0 && historyIndex < inputHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(inputHistory[newIndex]);
      }
    }

    if (e.key === 'ArrowDown' && historyIndex > -1) {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? '' : inputHistory[newIndex]);
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setInput('');
      setHistoryIndex(-1);
    }
  };

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageCancel = () => {
    setSelectedImage(null);
    setImagePreviewUrl(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!input.trim() && !selectedImage) return;

      if (input.length > 200) {
        toast.error('Input exceeds maximum character limit.');
        return;
      }

      if (selectedImage && imagePreviewUrl) {
        const content = input || "Image analysis request";
        const messageId = crypto.randomUUID();
        setDisplayedImages(prev => ({ ...prev, [messageId]: imagePreviewUrl as string }));
        
        const newMessage = {
          id: messageId,
          content,
          role: 'user' as const,
          createdAt: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
        
        setInput('');
        setSelectedImage(null);
        setImagePreviewUrl(null);

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...messages, newMessage],
            model: currentModel,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const data = await response.json();
        setMessages(prev => [...prev, data.message]);
      } else {
        handleChatSubmit(e);
      }
    } catch (err) {
      const errorMessage = typeof err === 'string' ? err : 'Failed to send message. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async () => {
    setLoading(true);
    setError(null);
    try {
      await handleChatSubmit(); // Retry the last chat submission
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {error && <div className="text-red-500">{error}</div>}
        <Button onClick={handleRetry} disabled={loading}>Retry</Button>
        <Card className={`flex flex-col h-full bg-gray-900 text-white ${className}`}>
          <Header currentModel={currentModel} setCurrentModel={setCurrentModel} />
          <MessageList messages={messages} chatEndRef={chatEndRef} ariaLabel="Chat messages" />
          <ChatInput  
            handleChatSubmit={handleChatSubmit} 
            handleInputChange={handleInputChange} 
            input={input} 
            onKeyDown={handleKeyDown} 
            ariaLabel="Chat input"
          />
          <Footer />
        </Card>
      </div>
    </Suspense>
  );
}