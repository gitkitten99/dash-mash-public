import { useLoadingState } from './use-loading-state';
import { SkeletonLoader } from '@/components/ui/skeleton-loader';
import { type VariantProps } from 'class-variance-authority';
import { skeletonVariants } from '@/components/ui/skeleton-loader';

type SkeletonVariant = NonNullable<VariantProps<typeof skeletonVariants>['variant']>;

interface UseSkeletonLoadingProps {
  variant?: SkeletonVariant;
  count?: number;
  className?: string;
  height?: number | string;
  initialState?: boolean;
}

interface UseSkeletonLoadingResult {
  isLoading: boolean;
  error: Error | null;
  startLoading: () => void;
  stopLoading: () => void;
  setError: (error: Error | null) => void;
  withLoading: <T>(promise: Promise<T>, errorMessage?: string) => Promise<T>;
  reset: () => void;
  SkeletonComponent: React.ComponentType<{ className?: string }>;
}

export function useSkeletonLoading({
  variant = 'default',
  count = 1,
  className = '',
  height,
  initialState = false
}: UseSkeletonLoadingProps = {}): UseSkeletonLoadingResult {
  const {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setError,
    withLoading,
    reset
  } = useLoadingState(initialState);

  const SkeletonComponent = ({ className: componentClassName = '' }: { className?: string }) => {
    if (!isLoading) return null;

    return (
      <SkeletonLoader
        variant={variant}
        count={count}
        className={`${className} ${componentClassName}`.trim()}
        style={height ? { height } : undefined}
        error={error}
        onRetry={reset}
      />
    );
  };

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setError,
    withLoading,
    reset,
    SkeletonComponent
  };
} 