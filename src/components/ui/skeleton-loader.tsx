'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';
import { cva, type VariantProps } from 'class-variance-authority';

export const skeletonVariants = cva(
  "animate-in fade-in-0 zoom-in-95 duration-300",
  {
    variants: {
      variant: {
        default: "",
        text: "",
        card: "",
        form: "",
        "table-row": "",
        "stat-card": "",
        chart: "",
        profile: "",
        "kanban-card": "",
        "area-chart": "",
        "bar-chart": "",
        "pie-chart": "",
        "trading-chart": "",
        "trading-news": "",
        "trading-overview": "",
        sales: "",
        "chat-message": ""
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

interface SkeletonLoaderProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof skeletonVariants> {
  loading?: boolean;
  children?: React.ReactNode;
  count?: number;
  error?: Error | null;
  onRetry?: () => void;
}

export function SkeletonLoader({
  loading = true,
  children,
  variant = "default",
  count = 1,
  className,
  error,
  onRetry,
  ...props
}: SkeletonLoaderProps) {
  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-sm text-destructive">{error.message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (!loading) return <>{children}</>;

  const renderSkeleton = () => {
    switch (variant) {
      case "card":
        return (
          <div className="rounded-xl border bg-card p-4">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-full" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        );
      case "table-row":
        return (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
        );
      case "stat-card":
        return (
          <div className="rounded-xl border bg-card p-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-2 w-full" />
            </div>
          </div>
        );
      case "chart":
        return (
          <div className="rounded-xl border bg-card p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-24" />
              </div>
              <Skeleton className="h-[200px] w-full" />
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        );
      case "form":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-20 w-full" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        );
      case "text":
        return <Skeleton className={cn("h-4 w-32", className)} />;
      case "trading-chart":
        return (
          <div className="rounded-xl border bg-card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
            <Skeleton className="h-[600px] w-full" />
          </div>
        );
      case "trading-news":
        return (
          <div className="rounded-xl border bg-card p-4 space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "trading-overview":
        return (
          <div className="rounded-xl border bg-card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
          </div>
        );
      case "kanban-card":
        return (
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="h-12 w-full" />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <Skeleton className="h-2 w-12" />
            </div>
          </div>
        );
      case "area-chart":
        return (
          <div className={cn("space-y-4", className)}>
            <Skeleton className="h-[350px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        );
      case "bar-chart":
        return (
          <div className={cn("space-y-4", className)}>
            <Skeleton className="h-[350px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[180px]" />
              <Skeleton className="h-4 w-[140px]" />
            </div>
          </div>
        );
      case "pie-chart":
        return (
          <div className={cn("space-y-4", className)}>
            <div className="flex justify-center">
              <Skeleton className="h-[300px] w-[300px] rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[160px]" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
          </div>
        );
      case "sales":
        return (
          <div className={cn("space-y-4", className)}>
            <div className="space-y-2">
              <Skeleton className="h-5 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                  <Skeleton className="ml-auto h-4 w-[80px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case "chat-message":
        return (
          <div className="flex items-start space-x-4">
            <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className={cn(
        "w-full",
        skeletonVariants({ variant }),
        className
      )} 
      {...props}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          className={cn(
            "mb-4 last:mb-0",
            "animate-pulse transition-opacity duration-300"
          )}
          style={{
            animationDelay: `${index * 100}ms`
          }}
        >
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
} 