'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { LoadingProvider } from '@/providers/loading-provider';

export default function Providers({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <LoadingProvider>
        {children}
      </LoadingProvider>
    </ThemeProvider>
  );
}
