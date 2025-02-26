import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon
} from 'lucide-react';
import { memo } from 'react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';

// Memoize the NavProjects component to prevent unnecessary re-renders
export const NavProjects = memo(({
  projects
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) => {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((project) => (
          <SidebarMenuItem key={project.name}>
            <Link href={project.url} className="flex items-center">
              {project.icon && <project.icon />}
              {project.name}
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
});
