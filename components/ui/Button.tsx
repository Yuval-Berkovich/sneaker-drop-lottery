'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'ghost' | 'link';
type ButtonSize = 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-bg font-display font-semibold uppercase tracking-[0.04em] rounded-lg ' +
    'transition-shadow duration-200 hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.18)]',
  ghost:
    'bg-transparent text-fg-primary font-body font-medium border border-accent-border rounded-lg ' +
    'transition-colors duration-200 hover:border-accent hover:bg-[rgba(167,139,250,0.06)]',
  link:
    'bg-transparent text-accent font-mono uppercase tracking-[0.12em] underline underline-offset-4 ' +
    'transition-colors duration-200 hover:text-fg-primary',
};

const sizeClasses: Record<ButtonSize, string> = {
  md: 'h-11 px-[18px] text-[13px]',
  lg: 'h-14 px-6 text-[15px]',
};

/** Loading indicator — three pulsing dots, staggered. */
function LoadingDots() {
  return (
    <span className="inline-flex items-center justify-center gap-1.5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-dot-pulse rounded-full bg-current"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </span>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    className,
    children,
    disabled,
    ...props
  },
  ref
) {
  const isLink = variant === 'link';
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap',
        !isLink && 'cursor-pointer disabled:cursor-not-allowed disabled:opacity-40',
        isLink && 'cursor-pointer p-0 disabled:opacity-40',
        variantClasses[variant],
        !isLink && sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? <LoadingDots /> : children}
    </button>
  );
});
