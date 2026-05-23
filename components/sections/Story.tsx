'use client';

import { useTranslations } from 'next-intl';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

function FactCard({ number, label, delay }: { number: string; label: string; delay: number }) {
  return (
    <Reveal
      delay={delay}
      className="rounded-lg border border-accent-border p-6 transition-colors duration-300 hover:border-[rgba(167,139,250,0.35)] hover:bg-[rgba(167,139,250,0.02)]"
    >
      {/* dir=ltr so "10", "₪30k+", "1,200" render with digits and symbols
          in the correct visual order inside the RTL Hebrew layout. */}
      <div
        dir="ltr"
        className="font-display text-[48px] font-bold leading-none tracking-[-0.02em] text-fg-primary"
      >
        {number}
      </div>
      <div className="mt-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
        {label}
      </div>
    </Reveal>
  );
}

export function Story() {
  const t = useTranslations('story');

  return (
    <section className="section-grid relative overflow-hidden border-t border-border-subtle px-6 py-24 md:px-20 md:py-32">
      {/* drifting violet glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute start-0 top-[40%] z-0 h-[420px] w-[420px] -translate-y-1/2"
        style={{
          background:
            'radial-gradient(circle, rgba(167,139,250,0.18) 0%, rgba(167,139,250,0.05) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-[2] mx-auto grid max-w-[1320px] gap-14 md:grid-cols-[1.5fr_1fr] md:gap-24">
        {/* LEFT — long-form */}
        <div>
          <Reveal>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-10 max-w-[16ch] text-balance font-display text-display-section text-fg-primary">
              {t('headline')}
            </h2>
          </Reveal>

          <div className="mt-14 flex max-w-[60ch] flex-col gap-8">
            <Reveal delay={0.16}>
              <p className="font-body text-[17px] leading-[1.65] text-fg-secondary">{t('p1')}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="font-body text-[17px] leading-[1.65] text-fg-secondary">{t('p2')}</p>
            </Reveal>
            <Reveal delay={0.32}>
              <blockquote className="border-s-2 border-accent ps-6 font-display text-[28px] font-medium italic leading-[1.3] tracking-[-0.01em] text-fg-primary">
                {t('pullquote')}
              </blockquote>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="font-body text-[17px] leading-[1.65] text-fg-secondary">{t('p3')}</p>
            </Reveal>
          </div>
        </div>

        {/* RIGHT — fact cards */}
        <aside className="flex flex-col gap-4 md:sticky md:top-[120px] md:self-start">
          <FactCard number={t('fact1Number')} label={t('fact1Label')} delay={0.2} />
          <FactCard number={t('fact2Number')} label={t('fact2Label')} delay={0.28} />
          <FactCard number={t('fact3Number')} label={t('fact3Label')} delay={0.36} />
        </aside>
      </div>
    </section>
  );
}
