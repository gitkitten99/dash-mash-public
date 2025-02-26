import { Task } from '../utils/store';
import { useDndContext, type UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { GripVertical } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ColumnActions } from './column-action';
import { TaskCard } from './task-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

export type ColumnType = 'Column';

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  isOverlay?: boolean;
}

export function BoardColumn({ column, tasks, isOverlay }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.title}`
    }
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  };

  const variants = cva(
    'h-[calc(100vh-16rem)] w-[350px] max-w-full flex flex-col flex-shrink-0 snap-center transition-all',
    {
      variants: {
        dragging: {
          default: 'border-2 border-transparent',
          over: 'ring-2 opacity-30',
          overlay: 'ring-2 ring-primary'
        }
      }
    }
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        variants({
          dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined
        }),
        'bg-muted/50 backdrop-blur-sm',
        'dark:bg-muted/30 dark:backdrop-blur supports-[backdrop-filter]:dark:bg-muted/20'
      )}
    >
      <CardHeader className='space-between flex flex-row items-center border-b bg-muted/50 p-3 text-left font-semibold backdrop-blur-sm'>
        <Button
          variant={'ghost'}
          {...attributes}
          {...listeners}
          className='relative -ml-2 h-auto cursor-grab p-1 text-primary/50 hover:text-primary transition-colors'
        >
          <span className='sr-only'>{`Move column: ${column.title}`}</span>
          <GripVertical className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 flex-1">
          <ColumnActions id={column.id} title={column.title} />
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary" className="font-normal">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex flex-grow flex-col gap-2 p-3 overflow-hidden'>
        <ScrollArea className='h-full pr-2'>
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center h-24 rounded-lg border-2 border-dashed text-muted-foreground">
                <p className="text-sm">No tasks yet</p>
                <p className="text-xs">Drag tasks here or add a new one</p>
              </div>
            )}
          </SortableContext>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  return (
    <ScrollArea className='w-full rounded-lg'>
      <div className='flex gap-4 p-2 pb-4 lg:justify-start'>
        {children}
      </div>
      <ScrollBar orientation='horizontal' className="h-2" />
    </ScrollArea>
  );
}
