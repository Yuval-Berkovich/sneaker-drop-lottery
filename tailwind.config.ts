import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#06070A',
        'surface-1': '#0A0B12',
        'surface-2': '#11131C',
        border: '#2A2B35',
        'border-subtle': 'rgba(255,255,255,0.06)',
        'fg-primary': '#FFFFFF',
        'fg-secondary': '#C8C9D2',
        'fg-muted': '#8A8B95',
        'fg-dim': '#6A6B75',
        accent: '#A78BFA',
        'accent-2': '#6D8DFF',
        'accent-glow': 'rgba(167,139,250,0.28)',
        'accent-border': 'rgba(167,139,250,0.18)',
        error: '#FF6B6B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        heebo: ['var(--font-heebo)', 'var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-hero': [
          'clamp(48px, min(8.5vw, 12vh), 104px)',
          { lineHeight: '0.94', letterSpacing: '-0.04em', fontWeight: '700' },
        ],
        'display-section': [
          'clamp(36px, 5vw, 56px)',
          { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '600' },
        ],
        'display-finale': [
          'clamp(96px, 18vw, 240px)',
          { lineHeight: '1', letterSpacing: '-0.06em', fontWeight: '700' },
        ],
        h2: [
          'clamp(28px, 4vw, 40px)',
          { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' },
        ],
        body: ['17px', { lineHeight: '1.65' }],
        'body-sm': ['13px', { lineHeight: '1.6' }],
        eyebrow: ['11px', { lineHeight: '1', letterSpacing: '0.18em' }],
        label: ['10px', { lineHeight: '1', letterSpacing: '0.16em' }],
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '80px 80px',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.75)' },
        },
        tbPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.15)' },
        },
        haloBreathe: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.78', transform: 'scale(1.04)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        dotPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        selectedPulse: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.95)' },
          '50%': { opacity: '0.95', transform: 'scale(1)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.7' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        pulse: 'pulse 2.4s ease-in-out infinite',
        'tb-pulse': 'tbPulse 3s ease-in-out infinite',
        'halo-breathe': 'haloBreathe 7s ease-in-out infinite',
        float: 'float 8s ease-in-out infinite',
        'dot-pulse': 'dotPulse 1.2s ease-in-out infinite',
        'selected-pulse': 'selectedPulse 4s ease-in-out infinite',
        bounce: 'bounce 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
