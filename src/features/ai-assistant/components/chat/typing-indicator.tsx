'use client';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center mb-2">
      <div className="animate-pulse bg-gray-300 rounded-full h-2 w-2 mr-2" />
      <div className="animate-pulse bg-gray-300 rounded-full h-2 w-2 mr-2" />
      <div className="animate-pulse bg-gray-300 rounded-full h-2 w-2" />
      <span className="text-gray-500">Assistant is typing...</span>
    </div>
  );
}; 