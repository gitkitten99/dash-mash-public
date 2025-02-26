import { cn } from "@/lib/utils";
import { SkeletonLoader } from './skeleton-loader';

interface LoadingSkeletonProps {
  className?: string;
  height?: number | string;
  variant?: "default" | "card" | "chart" | "trading-chart" | "trading-news" | "trading-overview";
}

export function LoadingSkeleton({ 
  className, 
  height = 400,
  variant = "chart" 
}: LoadingSkeletonProps) {
  return (
    <div className={cn("w-full relative", className)} style={{ height }}>
      <SkeletonLoader variant={variant} className="absolute inset-0" />
    </div>
  );
} 