import { SkeletonLoader } from '@/components/ui/skeleton-loader';

export default function Loading() {
  return (
    <div className="flex h-full w-full gap-4 p-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="w-80">
          <div className="mb-4">
            <SkeletonLoader 
              variant="kanban-card"
              count={3}
            />
          </div>
        </div>
      ))}
    </div>
  );
} 