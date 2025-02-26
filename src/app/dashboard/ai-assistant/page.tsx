'use client';

import { ChatContainer } from '@/features/ai-assistant/components/chat/chat-container';
import { cn } from '@/lib/utils';

export default function AIAssistantPage() {
  return (
    <div className={cn(
      "relative rounded-md border bg-background/95 p-4 shadow-sm transition-all",
      "min-h-[calc(100vh-13rem)]",
      "dark:bg-background/95 dark:shadow-2xl dark:backdrop-blur supports-[backdrop-filter]:dark:bg-background/60"
    )}>
      <ChatContainer />
    </div>
  );
} 