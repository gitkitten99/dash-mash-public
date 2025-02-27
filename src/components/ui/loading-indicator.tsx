import { SkeletonLoader } from '@/components/ui/skeleton-loader';

const LoadingIndicator = () => {
  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <div className="typing-indicator bg-primary rounded-full p-1">
        <span className="dot bg-muted"></span>
        <span className="dot bg-muted"></span>
        <span className="dot bg-muted"></span>
      </div>
      <SkeletonLoader variant="chat-message" className="animate-pulse h-20 rounded-lg shadow" />
      <SkeletonLoader variant="form" className="h-10 rounded-lg shadow" />
    </div>
  );
};

export default LoadingIndicator; 