/**
 * Design tokens for JS contexts (Framer Motion, inline styles).
 * Colors mirror tailwind.config.ts; motion presets per the build spec.
 */

export const colors = {
  bg: '#06070A',
  surface1: '#0A0B12',
  surface2: '#11131C',
  border: '#2A2B35',
  borderSubtle: 'rgba(255,255,255,0.06)',
  fgPrimary: '#FFFFFF',
  fgSecondary: '#C8C9D2',
  fgMuted: '#8A8B95',
  fgDim: '#6A6B75',
  accent: '#A78BFA',
  accent2: '#6D8DFF',
  accentGlow: 'rgba(167,139,250,0.28)',
  accentBorder: 'rgba(167,139,250,0.18)',
  error: '#FF6B6B',
} as const;

export const motion = {
  easeOut: [0.16, 1, 0.3, 1] as const, // signature curve
  easeInOut: [0.83, 0, 0.17, 1] as const,
  duration: { fast: 0.2, base: 0.4, slow: 0.8 },
  spring: { type: 'spring', damping: 22, stiffness: 220 } as const,
};

/** Shared whileInView reveal — opacity + y lift on the signature curve. */
export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};
