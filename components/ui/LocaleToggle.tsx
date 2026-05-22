'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface LocaleToggleProps {
  variant?: 'pill' | 'plain';
}

const LOCALES: Locale[] = ['en', 'he'];

/** EN | HE switcher — swaps the locale while preserving the current path. */
export function LocaleToggle({ variant = 'pill' }: LocaleToggleProps) {
  const active = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(target: Locale) {
    if (target !== active) {
      router.replace(pathname, { locale: target });
    }
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        'inline-flex items-center font-mono text-[11px] uppercase tracking-[0.18em]',
        variant === 'pill' && 'overflow-hidden rounded-full border border-border'
      )}
    >
      {LOCALES.map((loc, i) => (
        <span key={loc} className="contents">
          {i > 0 && (
            <span className={cn('text-fg-dim', variant === 'pill' ? 'opacity-50' : 'px-1.5')}>
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => switchTo(loc)}
            aria-current={active === loc}
            className={cn(
              'cursor-pointer transition-colors duration-200',
              variant === 'pill' && 'px-2.5 py-1',
              active === loc ? 'text-accent' : 'text-fg-dim hover:text-fg-secondary'
            )}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
