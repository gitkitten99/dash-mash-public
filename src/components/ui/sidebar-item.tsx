'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { useSidebar } from './sidebar';
import { LucideIcon } from 'lucide-react';

interface IconElement extends React.ReactElement<any, string | React.JSXElementConstructor<any>> {
  props: {
    className?: string;
  };
}

interface SidebarItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon?: IconElement;
  title: string;
  isSubmenu?: boolean;
  showTooltip?: boolean;
}

export function SidebarItem({
  href,
  icon,
  title,
  isSubmenu = false,
  showTooltip = true,
  className,
  children,
  ...props
}: SidebarItemProps) {
  const pathname = usePathname();
  const sidebar = useSidebar();
  const isCollapsed = sidebar.state !== 'expanded';
  const isActive = pathname === href;

  const content = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-lg px-2 py-2",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isSubmenu ? "pl-4" : "px-2",
        isActive
          ? "bg-primary/15 text-primary hover:bg-primary/20"
          : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="relative min-w-[24px]">
          {React.cloneElement(icon, {
            className: cn(
              "h-4 w-4",
              isActive && "text-primary",
              icon.props.className
            )
          })}
        </div>
      )}
      {(!isCollapsed || isSubmenu) && (
        <span className={cn(
          "text-sm font-medium",
          isActive && "text-primary"
        )}>
          {title}
        </span>
      )}
      {children}
    </Link>
  );

  if (isCollapsed && !isSubmenu && showTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right">
          {title}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
} 