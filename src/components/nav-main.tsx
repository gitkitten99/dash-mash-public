import { ChevronRight, type LucideIcon } from 'lucide-react';
import { memo } from 'react';
import Link from 'next/link';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';

// Memoize the NavMain component to prevent unnecessary re-renders
export const NavMain = memo(({
  items
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title}>
            <CollapsibleTrigger>
              <SidebarMenuButton>
                <Link href={item.url} prefetch>
                  {item.icon && <item.icon />}
                  {item.title}
                </Link>
                {item.isActive && <span aria-hidden="true"> (active)</span>}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {item.items && item.items.map((subItem) => (
                <SidebarMenuSub key={subItem.title}>
                  <SidebarMenuSubButton>
                    <a href={subItem.url}>{subItem.title}</a>
                  </SidebarMenuSubButton>
                </SidebarMenuSub>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
});
