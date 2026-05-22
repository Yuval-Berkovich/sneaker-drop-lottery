'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { LocaleToggle } from '@/components/ui/LocaleToggle';

const LETTERS = ['S', 'O', 'L', 'E'];

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="relative border-t border-accent-border px-6 pb-16 pt-24 text-center md:px-20">
      <div className="relative z-[1] mx-auto max-w-[1320px]">
        {/* wordmark — letter-by-letter reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.08 }}
          className="inline-flex cursor-default items-baseline font-display text-display-finale font-bold leading-none text-fg-primary transition-transform duration-300 hover:scale-[1.02]"
          aria-label="SOLE"
        >
          {LETTERS.map((letter) => (
            <motion.span
              key={letter}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* violet line draws underneath */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 h-0.5 bg-accent shadow-[0_0_12px_#A78BFA]"
          aria-hidden="true"
        />

        {/* utility row */}
        <div className="mt-20 flex flex-col items-center justify-between gap-5 md:flex-row">
          <div dir="ltr" className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
            {t('tagline')}
          </div>
          <div className="flex items-center gap-6 text-border" aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            >
              <path d="M8 1.5l5.5 3.2v6.6L8 14.5 2.5 11.3V4.7z" strokeLinejoin="round" />
            </svg>
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            >
              <path d="M1 8 Q 4 2, 7 8 T 13 8 T 19 8" />
            </svg>
          </div>
          <LocaleToggle variant="plain" />
        </div>

        <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
          {t('closing')}
        </div>
      </div>
    </footer>
  );
}
