'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

function generateBreadcrumbs(pathname: string): Breadcrumb[] {
  const paths = pathname.split('/').filter(Boolean);
  return paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join('/')}`;
    const label = path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return {
      label,
      href,
      active: index === paths.length - 1
    };
  });
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  if (pathname === '/') return null;

  return (
    <nav 
      aria-label="Breadcrumb"
      className="flex items-center space-x-1 text-sm text-muted-foreground"
    >
      <Link
        href="/"
        className={cn(
          "inline-flex items-center gap-1 rounded-md p-1.5",
          "text-muted-foreground hover:text-foreground",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      
      {breadcrumbs.map((breadcrumb, index) => (
        <div 
          key={breadcrumb.href}
          className="flex items-center"
        >
          <ChevronRight className="h-4 w-4" />
          <Link
            href={breadcrumb.href}
            aria-current={breadcrumb.active ? 'page' : undefined}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-1.5",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              breadcrumb.active 
                ? "text-foreground font-medium" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {breadcrumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
