'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Halo } from '@/components/ui/Halo';
import heroShoe from '@/public/assets/hero.png';

/** Decorative corner registration mark. */
function RegMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-[1] h-3.5 w-3.5 border-[rgba(255,255,255,0.14)] opacity-25 ${className}`}
    />
  );
}

/** A spec pill, e.g. STYLE · 136027.019. */
function Pill({ label, value }: { label: string; value: string }) {
  return (
    <span
      dir="ltr"
      className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-[rgba(255,255,255,0.015)] px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.16em] text-fg-secondary"
    >
      <span className="text-[10px] tracking-[0.2em] text-fg-muted">{label}</span>
      {value}
    </span>
  );
}

export function Hero() {
  const t = useTranslations('hero');
  const { scrollY } = useScroll();
  // 0 → 600px scroll maps to 0 → -60px translateY on the shoe.
  const shoeY = useTransform(scrollY, [0, 600], [0, -60]);

  return (
    <section className="section-grid relative flex min-h-screen flex-col overflow-hidden">
      {/* ambient vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(167,139,250,0.06), transparent 60%), radial-gradient(ellipse 100% 70% at 50% 0%, rgba(96,165,250,0.04), transparent 70%)',
        }}
      />

      {/* decorative side rails */}
      <div className="pointer-events-none absolute inset-y-24 start-6 z-[1] hidden w-px bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.14)] to-transparent md:block">
        <span className="writing-vertical absolute -start-5 top-[30%] rotate-180 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-dim">
          {t('railLeft')}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-y-24 end-6 z-[1] hidden w-px bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.14)] to-transparent md:block">
        <span className="writing-vertical absolute -end-5 top-[30%] font-mono text-[10px] uppercase tracking-[0.32em] text-fg-dim">
          {t('railRight')}
        </span>
      </div>

      {/* stage */}
      <div className="relative z-[2] flex flex-1 flex-col items-center px-5 pb-6 pt-9 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow pulse>{t('eyebrow')}</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3.5 max-w-[14ch] text-balance font-display text-display-hero text-fg-primary"
        >
          <span dir="ltr" className="block">
            {t('headlineLine1')}
          </span>
          <span dir="ltr" className="headline-outline block italic">
            {t('headlineLine2')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          dir="ltr"
          className="mt-[18px] font-mono text-[14px] uppercase tracking-[0.22em] text-fg-secondary"
        >
          {t('byline')}
        </motion.p>

        {/* shoe */}
        <motion.div
          style={{ y: shoeY }}
          className="relative z-[1] mx-auto mt-8 grid w-[min(78vw,70vh,1100px)] place-items-center"
        >
          <div className="relative aspect-[1032/774] w-full">
            <Halo inset="-10%" intensity="base" blur={40} breathe className="z-0" />
            {/* ground shadow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[25%] bottom-[6%] z-0 h-[12%]"
              style={{
                background:
                  'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 45%, transparent 75%)',
                filter: 'blur(60px)',
              }}
            />
            <RegMark className="left-[4%] top-[2%] border-b-0 border-l border-r-0 border-t" />
            <RegMark className="right-[4%] top-[2%] border-b-0 border-l-0 border-r border-t" />
            <RegMark className="bottom-[2%] left-[4%] border-b border-l border-r-0 border-t-0" />
            <RegMark className="bottom-[2%] right-[4%] border-b border-l-0 border-r border-t-0" />
            <Image
              src={heroShoe}
              alt="Air Jordan 4 Black Chrome — Eminem × Carhartt"
              priority
              placeholder="blur"
              className="relative z-[1] h-full w-full animate-float object-contain drop-shadow-[0_28px_30px_rgba(0,0,0,0.4)]"
            />
          </div>
        </motion.div>

        <p className="relative z-[3] mx-auto mt-12 max-w-[28rem] font-body text-[16px] italic leading-[1.55] text-fg-secondary">
          {t('lede')}
        </p>

        <div className="relative z-[3] mt-[18px] flex flex-wrap justify-center gap-2.5">
          <Pill label={t('pillStyleKey')} value={t('pillStyleValue')} />
          <Pill label={t('pillPriceKey')} value={t('pillPriceValue')} />
          <Pill label={t('pillDrawnKey')} value={t('pillDrawnValue')} />
        </div>

        {/* scroll cue */}
        <div className="z-[5] mx-auto mt-auto flex animate-bounce flex-col items-center gap-2 pb-4 pt-6 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted">
          <span>{t('scrollCue')}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
