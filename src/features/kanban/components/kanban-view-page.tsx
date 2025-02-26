import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { KanbanBoard } from './kanban-board';
import NewTaskDialog from './new-task-dialog';
import { Button } from '@/components/ui/button';
import { Filter, Grid2X2, List, Plus, SlidersHorizontal, Calendar, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function KanbanViewPage() {
  return (
    <PageContainer>
      <div className='space-y-4 h-full'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-1'>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Heading 
                  title='Kanban Board'
                  description='Manage and organize your tasks with drag and drop'
                  className="mb-1"
                />
              </div>
              <Badge variant="secondary" className="h-6">Beta</Badge>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>View Options</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Grid2X2 className="mr-2 h-4 w-4" />
                    All Tasks
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    My Tasks
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    Due Soon
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Sort & Filter</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <List className="mr-2 h-4 w-4" />
                    Sort by Priority
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Advanced Filter
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <NewTaskDialog>
              <Button size="sm" className="h-8">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </NewTaskDialog>
          </div>
        </div>
        <Separator className="my-4" />
        <div className={cn(
          "relative rounded-md border bg-background/95 p-4 shadow-sm transition-all",
          "min-h-[calc(100vh-13rem)]",
          "dark:bg-background/95 dark:shadow-2xl dark:backdrop-blur supports-[backdrop-filter]:dark:bg-background/60"
        )}>
          <KanbanBoard />
        </div>
      </div>
    </PageContainer>
  );
}
