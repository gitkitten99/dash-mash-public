import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { persist } from 'zustand/middleware';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Column } from '../components/board-column';

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type Priority = 'low' | 'medium' | 'high';

interface Assignee {
  name: string;
  avatar?: string;
}

const defaultCols = [
  {
    id: 'TODO' as const,
    title: 'Todo'
  }
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]['id'];

export interface Task {
  id: UniqueIdentifier;
  title: string;
  description?: string;
  status: Status;
  priority?: Priority;
  dueDate?: string;
  assignee?: Assignee;
}

export type State = {
  tasks: Task[];
  columns: Column[];
  draggedTask: string | null;
};

const initialTasks: Task[] = [
  {
    id: 'task1',
    status: 'TODO',
    title: 'Project initiation and planning'
  },
  {
    id: 'task2',
    status: 'TODO',
    title: 'Gather requirements from stakeholders'
  }
];

export type Actions = {
  addTask: (title: string, description?: string, options?: { priority?: Priority; dueDate?: string; assignee?: Assignee }) => void;
  addCol: (title: string) => void;
  dragTask: (id: string | null) => void;
  removeTask: (title: string) => void;
  removeCol: (id: UniqueIdentifier) => void;
  setTasks: (updatedTask: Task[]) => void;
  setCols: (cols: Column[]) => void;
  updateCol: (id: UniqueIdentifier, newName: string) => void;
};

export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      columns: defaultCols,
      draggedTask: null,
      addTask: (title: string, description?: string, options?: { priority?: Priority; dueDate?: string; assignee?: Assignee }) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { 
              id: uuid(), 
              title, 
              description, 
              status: 'TODO',
              priority: options?.priority,
              dueDate: options?.dueDate,
              assignee: options?.assignee
            }
          ]
        })),
      updateCol: (id: UniqueIdentifier, newName: string) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === id ? { ...col, title: newName } : col
          )
        })),
      addCol: (title: string) =>
        set((state) => ({
          columns: [
            ...state.columns,
            { title, id: state.columns.length ? title.toUpperCase() : 'TODO' }
          ]
        })),
      dragTask: (id: string | null) => set({ draggedTask: id }),
      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
      removeCol: (id: UniqueIdentifier) =>
        set((state) => ({
          columns: state.columns.filter((col) => col.id !== id)
        })),
      setTasks: (newTasks: Task[]) => set({ tasks: newTasks }),
      setCols: (newCols: Column[]) => set({ columns: newCols })
    }),
    { name: 'task-store', skipHydration: true }
  )
);
