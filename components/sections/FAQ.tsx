'use client';

import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion, type AccordionItemData } from '@/components/ui/Accordion';
import { cn } from '@/lib/utils';

export function FAQ() {
  const t = useTranslations('faq');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const items: AccordionItemData[] = [1, 2, 3, 4, 5, 6].map((i) => ({
    id: `q${i}`,
    question: t(`q${i}`),
    answer: t(`a${i}`),
  }));

  return (
    <section className="section-grid relative border-t border-border-subtle px-6 py-24 md:px-20 md:py-32">
      <div className="relative z-[1] mx-auto grid max-w-[1320px] gap-12 md:grid-cols-12 md:gap-x-8 md:gap-y-24">
        {/* LEFT — sticky title */}
        <div className="md:sticky md:top-[120px] md:col-span-5 md:self-start">
          <Reveal>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-10 text-balance font-display text-display-section text-fg-primary">
              {t('headline')}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-[40ch] font-body text-[16px] leading-[1.65] text-fg-secondary">
              {t('lede')}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <a
              href="mailto:hello@sole.co"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.12em] text-accent underline decoration-1 underline-offset-4 transition-colors hover:text-fg-primary"
            >
              {tCommon('emailUs')}
              <ArrowRight
                size={14}
                aria-hidden="true"
                className={cn('shrink-0', locale === 'he' && 'rotate-180')}
              />
            </a>
          </Reveal>
        </div>

        {/* RIGHT — accordion */}
        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={0.2}>
            <Accordion items={items} singleOpen defaultOpenId="q1" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
