'use client';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center mb-4 animate-pulse">
      <div className="bg-gray-300 rounded-full h-3 w-3 mr-2" />
      <div className="bg-gray-300 rounded-full h-3 w-3 mr-2" />
      <div className="bg-gray-300 rounded-full h-3 w-3" />
      <span className="text-gray-500 font-semibold text-lg">Assistant is typing...</span>
    </div>
  );
}; 