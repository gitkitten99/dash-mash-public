import { SkeletonLoader } from '@/components/ui/skeleton-loader';
import { Card } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      {/* Header */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <SkeletonLoader variant="text" className="h-8 w-[200px]" />
            <SkeletonLoader variant="text" className="h-4 w-[300px] mt-2" />
          </div>
          <SkeletonLoader variant="text" className="h-10 w-[120px]" />
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="grid w-full grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonLoader key={i} variant="text" className="h-10" />
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={`ai-card-${i}`} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <SkeletonLoader variant="text" className="h-12 w-12 rounded-lg" />
                  <div>
                    <SkeletonLoader variant="text" className="h-6 w-[150px]" />
                    <SkeletonLoader variant="text" className="h-4 w-[200px] mt-2" />
                  </div>
                </div>
                <SkeletonLoader variant="text" className="h-6 w-[80px]" />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <SkeletonLoader key={j} variant="text" className="h-6 w-[100px]" />
                ))}
              </div>
              
              <SkeletonLoader variant="text" className="h-10 w-full mt-4" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 