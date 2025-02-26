'use client';

import * as React from 'react';

interface LoadingState {
  isLoading: boolean;
  error: Error | null;
  setIsLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
  setError: (error: Error | null) => void;
  withLoading: <T>(promise: Promise<T>, errorMessage?: string) => Promise<T>;
  reset: () => void;
}

export function useLoadingState(initialState = false): LoadingState {
  const [isLoading, setIsLoading] = React.useState(initialState);
  const [error, setError] = React.useState<Error | null>(null);

  const startLoading = React.useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  const reset = React.useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  const withLoading = React.useCallback(async <T,>(
    promise: Promise<T>,
    errorMessage?: string
  ): Promise<T> => {
    try {
      startLoading();
      const result = await promise;
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(errorMessage || 'An error occurred');
      setError(error);
      throw error;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  return {
    isLoading,
    error,
    setIsLoading,
    startLoading,
    stopLoading,
    setError,
    withLoading,
    reset
  };
} 