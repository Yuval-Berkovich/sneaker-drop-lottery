'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const EASE = [0.16, 1, 0.3, 1] as const;

/** The emotional payoff — a full-section takeover after OTP verification. */
export function SelectedState() {
  const t = useTranslations('enter');

  return (
    <div className="absolute inset-0 z-[3] flex items-center justify-center px-6 text-center">
      {/* slow violet radial pulse */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 animate-selected-pulse"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(167,139,250,0.22) 0%, rgba(167,139,250,0.08) 30%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-[1] flex flex-col items-center gap-7">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="font-display text-display-finale font-bold tracking-[-0.04em] text-fg-primary"
        >
          {t('selectedHeading')}
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '60vw' }}
          transition={{ duration: 0.8, delay: 1, ease: EASE }}
          className="h-px bg-accent shadow-[0_0_12px_#A78BFA]"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8, ease: EASE }}
          dir="ltr"
          className="font-mono text-[13px] uppercase tracking-[0.22em] text-fg-muted"
        >
          {t('selectedSub')}
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.3, ease: EASE }}
        className="absolute inset-x-0 bottom-10 mx-auto max-w-[480px] px-6 font-body text-[13px] text-fg-dim"
      >
        {t('selectedFootnote')}
      </motion.p>
    </div>
  );
}
