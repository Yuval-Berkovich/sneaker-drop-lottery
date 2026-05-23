'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Countdown } from '@/components/enter/Countdown';
import { EntryForm } from '@/components/enter/EntryForm';
import { OtpModal } from '@/components/enter/OtpModal';
import { SelectedState } from '@/components/enter/SelectedState';
import { cn } from '@/lib/utils';

type EnterState =
  | { kind: 'idle' }
  | { kind: 'otp'; entryId: string; email: string }
  | { kind: 'selected' };

function TrustBadge({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div className="flex items-center gap-3.5 font-body text-[14px] font-medium text-fg-secondary">
      <span
        aria-hidden="true"
        className="h-1 w-1 shrink-0 animate-tb-pulse rounded-full bg-accent shadow-[0_0_10px_#A78BFA]"
        style={{ animationDelay: `${delay}s` }}
      />
      {children}
    </div>
  );
}

export function Enter() {
  const t = useTranslations('enter');
  const [state, setState] = useState<EnterState>({ kind: 'idle' });
  const isSelected = state.kind === 'selected';

  return (
    <section
      id="enter"
      className="section-grid relative flex min-h-screen items-center overflow-hidden border-t border-border-subtle px-6 py-24 md:px-20 md:py-32"
    >
      <motion.div
        animate={{ opacity: isSelected ? 0 : 1, scale: isSelected ? 0.98 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'relative z-[2] mx-auto grid w-full max-w-[1320px] gap-12 md:grid-cols-12 md:gap-x-8 md:gap-y-24',
          isSelected && 'pointer-events-none'
        )}
      >
        {/* LEFT — persuasion */}
        <div className="md:col-span-6">
          <Reveal>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            {/* unicode-bidi: isolate keeps the three Hebrew sentence periods
                anchored to their phrases when the headline wraps lines. */}
            <h2
              style={{ unicodeBidi: 'isolate' }}
              className="mt-10 max-w-[14ch] text-balance font-display text-display-section text-fg-primary"
            >
              {t('headline')}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-[60ch] font-body text-[17px] leading-[1.65] text-fg-secondary">
              {t('body')}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col gap-4">
              <TrustBadge delay={0}>{t('trust1')}</TrustBadge>
              <TrustBadge delay={0.6}>{t('trust2')}</TrustBadge>
              <TrustBadge delay={1.2}>
                {t.rich('trust3', {
                  price: (chunks) => <span dir="ltr">{chunks}</span>,
                })}
              </TrustBadge>
              <TrustBadge delay={1.8}>{t('trust4')}</TrustBadge>
            </div>
          </Reveal>
          <Reveal delay={0.32} className="mt-10">
            <Countdown />
          </Reveal>
        </div>

        {/* RIGHT — form card */}
        <div className="md:col-span-6">
          <Reveal delay={0.2}>
            <EntryForm
              onEntered={({ entryId, email }) => setState({ kind: 'otp', entryId, email })}
            />
          </Reveal>
        </div>
      </motion.div>

      {isSelected && <SelectedState />}

      <AnimatePresence>
        {state.kind === 'otp' && (
          <OtpModal
            entryId={state.entryId}
            email={state.email}
            onClose={() => setState({ kind: 'idle' })}
            onVerified={() => setState({ kind: 'selected' })}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
