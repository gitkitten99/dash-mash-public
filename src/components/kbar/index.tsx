'use client';
import { navItems } from '@/constants/data';
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch
} from 'kbar';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import RenderResults from './render-result';
import useThemeSwitching from './use-theme-switching';

interface NavItem {
  title: string;
  url: string;
  shortcut?: string[];
  items?: NavItem[];
}

export default function KBar({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const createAction = (navItem: NavItem) => {
    return {
      id: `${navItem.title.toLowerCase()}Action`,
      name: navItem.title,
      shortcut: navItem.shortcut,
      keywords: navItem.title.toLowerCase(),
      section: 'Navigation',
      subtitle: `Go to ${navItem.title}`,
      perform: () => navigateTo(navItem.url)
    };
  };

  const actions = useMemo(
    () =>
      navItems.flatMap((navItem) => {
        const baseAction = navItem.url !== '#' ? createAction(navItem) : null;

        const childActions =
          navItem.items?.map((childItem) => createAction(childItem)) ?? [];

        return baseAction ? [baseAction, ...childActions] : childActions;
      }),
    []
  );

  return (
    <KBarProvider actions={actions}>
      <KBarComponent>{children}</KBarComponent>
    </KBarProvider>
  );
}
const KBarComponent = ({ children }: { children: React.ReactNode }) => {
  useThemeSwitching();

  return (
    <>
      <KBarPortal>
        <KBarPositioner className='scrollbar-hide fixed inset-0 z-[99999] bg-black/80 !p-0 backdrop-blur-sm'>
          <KBarAnimator className='relative !mt-64 w-full max-w-[600px] !-translate-y-12 overflow-hidden rounded-lg border bg-background text-foreground shadow-lg'>
            <div className='bg-background'>
              <div className='border-x-0 border-b-2'>
                <KBarSearch className='w-full border-none bg-background px-6 py-4 text-lg outline-none focus:outline-none focus:ring-0 focus:ring-offset-0' />
              </div>
              <RenderResults />
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </>
  );
};
