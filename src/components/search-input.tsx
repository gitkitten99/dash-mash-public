'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div role="search" aria-label="Search input">
      <Input
        type="text"
        placeholder="Search..."
        aria-label="Search input field"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            // Handle search action
          }
        }}
      />
    </div>
  );
}
