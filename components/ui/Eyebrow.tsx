import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: React.ReactNode;
  /** Pulse the violet dot (used in the hero). */
  pulse?: boolean;
  className?: string;
}

/** Mono eyebrow label with a glowing violet dot. */
export function Eyebrow({ children, pulse = false, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent',
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_12px_#A78BFA]',
          pulse && 'animate-pulse'
        )}
      />
      {children}
    </span>
  );
}
