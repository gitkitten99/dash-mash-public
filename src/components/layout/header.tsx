import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import ThemeToggle from './ThemeToggle/theme-toggle';
import { UserNav } from './user-nav';
import { Notifications } from './notifications';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex h-16 items-center justify-between gap-4 px-4'>
        <div className='flex items-center gap-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='h-6' />
          <Breadcrumbs />
        </div>

        <div className='flex items-center gap-4'>
          <div className='hidden md:flex'>
            <SearchInput />
          </div>
          <div className='flex items-center gap-2'>
            <Notifications />
            <ThemeToggle />
            <Separator orientation='vertical' className='h-6' />
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
}
