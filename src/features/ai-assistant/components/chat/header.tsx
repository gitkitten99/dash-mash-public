import { ModelSelector } from './model-selector';

interface HeaderProps {
  currentModel: string;
  setCurrentModel: (model: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentModel, setCurrentModel }) => (
  <header className="flex items-center justify-between p-4 bg-gray-800 shadow-md rounded-t-lg">
    <h2 className="text-lg font-semibold">AI Assistant</h2>
    <ModelSelector selectedModel={currentModel} onModelChange={setCurrentModel} />
  </header>
); 