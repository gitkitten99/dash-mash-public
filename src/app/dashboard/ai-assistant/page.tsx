'use client';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { openRouterConfig } from '@/features/ai-assistant/config/api-config';
import { ModelSelector } from '@/features/ai-assistant/components/chat/model-selector';
import { ChatContainer } from '@/features/ai-assistant/components/chat/chat-container';
import LoadingIndicator from '@/components/ui/loading-indicator';
import { Toast } from '@/components/ui/toast';

const AIAssistantPage = () => {
  const [currentModel, setCurrentModel] = useState<string>(openRouterConfig.defaultModel);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay
        // here you would fetch your actual data
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full p-4" aria-label="AI Assistant Page">
      <h1 className="text-3xl font-bold mb-4">AI Assistant</h1>
      <Separator className="mb-4" />
      {error && <Toast variant="destructive">{error}</Toast> }
      <div className="flex flex-col md:flex-row flex-1 gap-4" role="region" aria-live="polite">
        <div className="flex-1 mx-auto max-w-md md:max-w-3xl" tabIndex={0}>
          {loading ? <LoadingIndicator /> : <ChatContainer />}
        </div>
        <div className="flex flex-col md:w-1/3 md:ml-4">
          <Card className="p-4 mb-4 bg-gray-800 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Current Model: {currentModel}...</h2>
            <p className="text-sm text-gray-300">This model is designed to assist you with various tasks. To get the best results, try asking specific questions or providing context for your queries.</p>
          </Card>
          <ModelSelector selectedModel={currentModel} onModelChange={setCurrentModel} className="mb-4" />
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage; 