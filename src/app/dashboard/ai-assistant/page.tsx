'use client';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { openRouterConfig } from '@/features/ai-assistant/config/api-config';
import { ModelSelector } from '@/features/ai-assistant/components/chat/model-selector';
import { ChatContainer } from '@/features/ai-assistant/components/chat/chat-container';

const AIAssistantPage = () => {
  const [currentModel, setCurrentModel] = useState(openRouterConfig.defaultModel);

  return (
    <div className="flex flex-col h-full p-4">
      <h1 className="text-3xl font-bold mb-4">AI Assistant</h1>
      <Separator className="mb-4" />
      <div className="flex flex-col md:flex-row flex-1 gap-4">
        <div className="flex-1 mx-auto max-w-md md:max-w-3xl">
          <ChatContainer />
        </div>
        <div className="flex flex-col md:w-1/3 md:ml-4">
          <Card className="p-4 mb-4">
            <h2 className="text-xl font-semibold">Current Model: {currentModel}</h2>
            <p>Interact with the AI Assistant to get insights and assistance.</p>
          </Card>
          <ModelSelector selectedModel={currentModel} onModelChange={setCurrentModel} className="mb-4" />
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage; 