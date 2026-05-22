import { cn } from '@/lib/utils';

interface HaloProps {
  /** Inset offset, e.g. '-10%'. Negative bleeds beyond the parent. */
  inset?: string;
  /** Radial-gradient intensity multiplier on the violet glow. */
  intensity?: 'soft' | 'base' | 'strong';
  /** Blur radius in px. */
  blur?: number;
  /** Slow breathing animation. */
  breathe?: boolean;
  className?: string;
}

const intensityStops: Record<NonNullable<HaloProps['intensity']>, string> = {
  soft: 'radial-gradient(ellipse 55% 45% at 50% 55%, rgba(167,139,250,0.18) 0%, rgba(167,139,250,0.06) 35%, transparent 65%)',
  base: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(167,139,250,0.30) 0%, rgba(167,139,250,0.10) 35%, transparent 70%)',
  strong:
    'radial-gradient(ellipse 55% 45% at 50% 55%, rgba(167,139,250,0.42) 0%, rgba(167,139,250,0.14) 35%, transparent 70%)',
};

/** Reusable violet radial halo placed behind product imagery. */
export function Halo({
  inset = '-10%',
  intensity = 'base',
  blur = 40,
  breathe = false,
  className,
}: HaloProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute', breathe && 'animate-halo-breathe', className)}
      style={{
        inset,
        background: intensityStops[intensity],
        filter: `blur(${blur}px)`,
      }}
    />
  );
}
