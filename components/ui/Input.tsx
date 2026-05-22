'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

/**
 * Bare-line input: transparent bg, 1px bottom border only.
 * Violet on focus, red on error. Spreads `register()` props for RHF.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { hasError = false, className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-14 w-full rounded-none border-0 border-b bg-transparent px-0 font-body text-[14px]',
        'text-fg-primary outline-none transition-colors duration-300 placeholder:text-fg-dim',
        hasError ? 'border-b-error' : 'border-b-border focus:border-b-accent',
        className
      )}
      {...props}
    />
  );
});
