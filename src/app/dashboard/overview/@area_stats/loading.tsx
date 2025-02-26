import { SkeletonLoader } from '@/components/ui/skeleton-loader';

export default function Loading() {
  return (
    <SkeletonLoader 
      variant="area-chart"
      count={1}
      className="h-[350px]"
    />
  );
}
