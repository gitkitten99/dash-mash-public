import { SkeletonLoader } from '@/components/ui/skeleton-loader';

export default function Loading() {
  return (
    <SkeletonLoader 
      variant="sales"
      count={1}
      className="h-[400px]"
    />
  );
}
