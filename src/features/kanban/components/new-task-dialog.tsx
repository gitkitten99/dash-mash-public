'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTaskStore } from '../utils/store';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

export default function NewTaskDialog({ children }: { children?: React.ReactNode }) {
  const addTask = useTaskStore((state) => state.addTask);
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const { title, description, priority } = Object.fromEntries(formData);

      if (typeof title !== 'string' || typeof description !== 'string' || typeof priority !== 'string') return;

      addTask(title, description, {
        priority: priority as 'low' | 'medium' | 'high',
        dueDate: date ? date.toISOString() : undefined,
      });

      toast.success('Task created successfully');
      form.reset();
      setDate(undefined);
      setOpen(false);
    } catch (error) {
      toast.error('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-background/95 dark:bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80'>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Add a new task to your board. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form
          id='task-form'
          className='grid gap-4 py-4'
          onSubmit={handleSubmit}
        >
          <div className='grid gap-2'>
            <Label htmlFor="title" className="text-sm font-medium">Title</Label>
            <Input
              id='title'
              name='title'
              placeholder='Task title...'
              className='col-span-4'
              required
              autoFocus
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id='description'
              name='description'
              placeholder='Task description...'
              className='col-span-4 min-h-[100px] resize-none'
            />
          </div>
          <div className='grid gap-2'>
            <Label className="text-sm font-medium">Priority</Label>
            <Select name="priority" defaultValue="medium">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low" className="text-green-500">Low Priority</SelectItem>
                <SelectItem value="medium" className="text-yellow-500">Medium Priority</SelectItem>
                <SelectItem value="high" className="text-red-500">High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-2'>
            <Label className="text-sm font-medium">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "EEEE, MMMM do, yyyy") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>
        </form>
        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="ghost" disabled={isSubmitting}>Cancel</Button>
          </DialogClose>
          <Button type='submit' form='task-form' disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Creating...' : 'Create Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
