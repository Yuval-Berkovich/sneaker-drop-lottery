'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LocaleToggle } from '@/components/ui/LocaleToggle';
import { cn } from '@/lib/utils';

/** Edge-faded ticker that scrolls beneath the nav. */
function Marquee({ text }: { text: string }) {
  const half = (
    <div className="flex shrink-0 gap-14 pe-14" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="shrink-0 font-mono text-[11px] uppercase tracking-[0.25em] text-fg-muted"
        >
          ⬢ {text}
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative z-[5] flex h-[34px] items-center overflow-hidden border-b border-border-subtle bg-[rgba(255,255,255,0.015)]">
      <div className="flex w-max animate-marquee">
        {half}
        {half}
      </div>
      <div className="pointer-events-none absolute inset-y-0 start-0 w-20 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-20 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}

export function Nav() {
  const t = useTranslations('nav');
  const ticker = useTranslations()('ticker');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 flex items-center justify-between border-b border-border-subtle px-5 py-4 md:px-8',
          'transition-colors duration-300',
          scrolled
            ? 'bg-bg/85 backdrop-blur-[14px] backdrop-saturate-150'
            : 'bg-bg/40 backdrop-blur-[6px]'
        )}
      >
        {/* Left: brand */}
        <div className="flex items-center gap-3 md:gap-[18px]">
          <span
            aria-hidden="true"
            className="grid h-[26px] w-[26px] place-items-center rounded-[7px] bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] font-display text-[15px] font-bold tracking-tight text-bg shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_6px_18px_-8px_rgba(139,92,246,0.6)]"
          >
            S
          </span>
          <span
            dir="ltr"
            className="font-display text-[15px] font-bold tracking-[0.04em] text-fg-primary"
          >
            {t('brand')}
          </span>
          <span
            dir="ltr"
            className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted sm:flex"
          >
            <span className="opacity-40">/</span>
            {t('drops')}
          </span>
        </div>

        {/* Right: locale toggle + admin (visual only) */}
        <div className="flex items-center gap-4 md:gap-[18px]">
          <LocaleToggle variant="pill" />
          <a
            href="#"
            className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted transition-colors hover:text-fg-primary md:inline"
          >
            {t('admin')}
          </a>
        </div>
      </header>
      <Marquee text={ticker} />
    </>
  );
}
