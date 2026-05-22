'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import detail01 from '@/public/assets/detail-01.png';
import detail02 from '@/public/assets/detail-02.png';
import detail03 from '@/public/assets/detail-03.png';

interface ShotData {
  image: StaticImageData;
  alt: string;
  index: string;
  label: string;
}

function Shot({
  shot,
  onOpen,
  haloBlur,
}: {
  shot: ShotData;
  onOpen: (s: ShotData) => void;
  haloBlur: number;
}) {
  return (
    <div className="group relative grid h-full w-full place-items-center">
      <div className="pointer-events-none absolute -top-6 start-0 z-[3] text-start opacity-50 transition-opacity duration-500 group-hover:opacity-100">
        <span className="block font-display text-[14px] font-medium tracking-[0.16em] text-fg-dim">
          {shot.index}
        </span>
        <span className="mt-1.5 block whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
          {shot.label}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onOpen(shot)}
        aria-label={shot.alt}
        className="relative grid h-full w-full cursor-zoom-in place-items-center"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[6%] z-0 opacity-100 transition-[opacity,filter] duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 55%, rgba(167,139,250,0.28) 0%, rgba(167,139,250,0.10) 35%, transparent 65%)',
            filter: `blur(${haloBlur}px)`,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[18%] bottom-[6%] z-0 h-[12%]"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 45%, transparent 75%)',
            filter: 'blur(50px)',
          }}
        />
        <Image
          src={shot.image}
          alt={shot.alt}
          placeholder="blur"
          className="relative z-[1] h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </button>
    </div>
  );
}

export function DetailGallery() {
  const t = useTranslations('detail');
  const galleryRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start'],
  });
  const featureY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const [active, setActive] = useState<ShotData | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  const feature: ShotData = {
    image: detail01,
    alt: 'Heel detail — Eminem skull and E logo',
    index: t('index1'),
    label: t('label1'),
  };
  const duo: ShotData[] = [
    {
      image: detail02,
      alt: 'Three-quarter angle with Jumpman silhouette',
      index: t('index2'),
      label: t('label2'),
    },
    {
      image: detail03,
      alt: 'Side view with translucent sole',
      index: t('index3'),
      label: t('label3'),
    },
  ];

  return (
    <section
      ref={galleryRef}
      className="section-grid relative border-t border-border-subtle px-6 py-24 md:px-20 md:py-32"
    >
      <header className="relative z-[2] mx-auto max-w-[1320px] text-center">
        <Reveal>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-8 font-display text-display-section text-fg-primary">
            {t('headline')}
          </h2>
        </Reveal>
      </header>

      <div className="relative z-[2] mx-auto mt-16 max-w-[1320px] md:mt-24">
        {/* feature row */}
        <Reveal delay={0.16} className="grid min-h-[520px] place-items-center md:min-h-[720px]">
          <motion.div
            style={{ y: featureY }}
            className="relative aspect-[1032/774] w-[92vw] max-w-[1100px] md:w-[70vw]"
          >
            <Shot shot={feature} onOpen={setActive} haloBlur={50} />
          </motion.div>
        </Reveal>

        {/* duo row */}
        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-8">
          {duo.map((shot, i) => (
            <Reveal
              key={shot.index}
              delay={0.24 + i * 0.15}
              className="grid h-[440px] place-items-center md:h-[560px]"
            >
              <div className="relative h-full w-[92%] md:w-[85%]">
                <Shot shot={shot} onOpen={setActive} haloBlur={40} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-bg/95 backdrop-blur-[8px]"
          >
            <div className="relative grid max-h-[80vh] max-w-[90vw] place-items-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[10%] z-0"
                style={{
                  background:
                    'radial-gradient(ellipse 55% 45% at 50% 55%, rgba(167,139,250,0.42) 0%, rgba(167,139,250,0.14) 35%, transparent 70%)',
                  filter: 'blur(70px)',
                }}
              />
              <Image
                src={active.image}
                alt={active.alt}
                placeholder="blur"
                className="relative z-[1] max-h-[80vh] w-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
