import * as React from 'react';
import { cn } from '@/lib/utils';

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {}

const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'absolute h-px w-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
          'clip-path-[inset(50%)]',
          className
        )}
        {...props}
      />
    );
  }
);

VisuallyHidden.displayName = 'VisuallyHidden';

export { VisuallyHidden }; 