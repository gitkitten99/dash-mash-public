import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Task } from '../utils/store';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { GripVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

// export interface Task {
//   id: UniqueIdentifier;
//   columnId: ColumnId;
//   content: string;
// }

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = 'Task';

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    } satisfies TaskDragData,
    attributes: {
      roleDescription: 'Task'
    }
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  };

  const variants = cva(
    'group hover:shadow-md transition-all duration-200 bg-card dark:bg-card/80 dark:hover:bg-card/90',
    {
      variants: {
        dragging: {
          over: 'ring-2 opacity-30',
          overlay: 'ring-2 ring-primary shadow-lg'
        }
      }
    }
  );

  const priorityConfig = {
    high: { color: 'text-red-500 bg-red-500/10', label: 'High' },
    medium: { color: 'text-yellow-500 bg-yellow-500/10', label: 'Medium' },
    low: { color: 'text-green-500 bg-green-500/10', label: 'Low' }
  };

  const priority = task.priority || 'medium';
  const priorityStyle = priorityConfig[priority];

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        variants({
          dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined
        }),
        'mb-2'
      )}
    >
      <CardHeader className='space-between relative flex flex-row items-center px-3 py-2'>
        <Button
          variant={'ghost'}
          {...attributes}
          {...listeners}
          className='-ml-2 h-auto cursor-grab p-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity'
        >
          <span className='sr-only'>Move task</span>
          <GripVertical className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 ml-auto">
          <Badge 
            variant="secondary" 
            className={cn(
              'font-medium text-xs',
              priorityStyle.color
            )}
          >
            {priorityStyle.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-2 px-3 pb-3'>
        <div className="font-medium">{task.title}</div>
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
            {task.assignee && (
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={task.assignee.avatar} />
                  <AvatarFallback className="text-[10px]">
                    {task.assignee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>{task.assignee.name}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
