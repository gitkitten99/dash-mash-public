'use client';

import { SkeletonLoader } from '@/components/ui/skeleton-loader';
import { Card } from '@/components/ui/card';

export default function Loading() {
  return (
    <Card className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonLoader key={i} variant="chat-message" />
        ))}
      </div>
      <div className="border-t p-4">
        <SkeletonLoader variant="form" className="h-10" />
      </div>
    </Card>
  );
} 