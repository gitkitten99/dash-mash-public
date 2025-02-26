import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function PageContainer({
  children,
  scrollable = true,
  fullWidth = false,
  className,
}: PageContainerProps) {
  const containerClasses = cn(
    'flex flex-1',
    !fullWidth && 'mx-auto max-w-6xl',
    className
  );

  return (
    <div className={containerClasses} style={{ padding: 0, minHeight: '100vh' }}>{children}</div>
  );
}
