'use client';

import * as React from 'react';
import { useLoadingState } from '@/hooks/use-loading-state';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface LoadingContextValue {
  isLoading: boolean;
  error: Error | null;
  setIsLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
  setError: (error: Error | null) => void;
  withLoading: <T>(promise: Promise<T>, errorMessage?: string) => Promise<T>;
  reset: () => void;
}

const LoadingContext = React.createContext<LoadingContextValue | undefined>(undefined);

interface LoadingProviderProps {
  children: React.ReactNode;
  initialLoading?: boolean;
  showErrorAlert?: boolean;
}

export function LoadingProvider({
  children,
  initialLoading = false,
  showErrorAlert = true
}: LoadingProviderProps) {
  const loadingState = useLoadingState(initialLoading);

  return (
    <LoadingContext.Provider value={loadingState}>
      {children}
      {showErrorAlert && loadingState.error && (
        <div className="fixed bottom-4 right-4 z-50 max-w-md animate-in slide-in-from-right-5">
          <Alert variant="destructive" className="relative">
            <AlertDescription>
              {loadingState.error.message}
            </AlertDescription>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-2 h-6 w-6 rounded-full opacity-70 hover:opacity-100"
              onClick={() => loadingState.setError(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading(): LoadingContextValue {
  const context = React.useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
} 