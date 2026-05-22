'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('error');

  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-eyebrow uppercase text-accent">SOLE · DROP 04</p>
      <h1 className="font-display text-h2 text-fg-primary">{t('title')}</h1>
      <p className="max-w-sm font-body text-body-sm text-fg-muted">{t('body')}</p>
      <Button variant="ghost" size="md" onClick={reset}>
        {t('retry')}
      </Button>
    </main>
  );
}
