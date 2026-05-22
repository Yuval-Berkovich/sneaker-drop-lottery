'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { pad2 } from '@/lib/utils';
import type { CountdownResponse } from '@/lib/types';

function Unit({ value }: { value: string }) {
  return <span className="inline-block min-w-[1.6ch] text-center tabular-nums">{value}</span>;
}

function Sep() {
  return <span className="px-0.5 text-fg-dim">:</span>;
}

/** Live countdown to a rolling 30-day target fetched from /api/countdown. */
export function Countdown() {
  const t = useTranslations('enter');
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    let target = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    fetch('/api/countdown')
      .then((res) => res.json() as Promise<CountdownResponse>)
      .then((data) => {
        target = new Date(data.targetIso).getTime();
        const tick = () => setRemaining(Math.max(0, Math.floor((target - Date.now()) / 1000)));
        tick();
        interval = setInterval(tick, 1000);
      })
      .catch(() => setRemaining(0));

    return () => clearInterval(interval);
  }, []);

  const r = remaining ?? 0;
  const days = Math.floor(r / 86400);
  const hours = Math.floor((r % 86400) / 3600);
  const minutes = Math.floor((r % 3600) / 60);
  const seconds = r % 60;
  const loaded = remaining !== null;

  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
        {t('countdownLabel')}
      </div>
      <div
        dir="ltr"
        className="mt-3.5 flex items-baseline gap-2 font-display text-[clamp(36px,5vw,48px)] font-semibold leading-none tracking-[-0.02em] text-fg-primary"
      >
        <Unit value={loaded ? pad2(days) : '--'} />
        <Sep />
        <Unit value={loaded ? pad2(hours) : '--'} />
        <Sep />
        <Unit value={loaded ? pad2(minutes) : '--'} />
        <Sep />
        <Unit value={loaded ? pad2(seconds) : '--'} />
      </div>
    </div>
  );
}
