'use client';

import { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { entryFormSchema, type EntryFormValues } from '@/lib/validators/entry';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SizePicker } from '@/components/enter/SizePicker';
import { cn } from '@/lib/utils';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA';

const COUNTRY_CODES = [
  { code: '+972', label: '🇮🇱 +972' },
  { code: '+1', label: '🇺🇸 +1' },
  { code: '+44', label: '🇬🇧 +44' },
  { code: '+49', label: '🇩🇪 +49' },
  { code: '+33', label: '🇫🇷 +33' },
];

interface EntryFormProps {
  onEntered: (data: { entryId: string; email: string }) => void;
}

/** Field shell: mono label + control + inline error. */
function Field({
  label,
  error,
  children,
}: {
  label: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
        {label}
      </span>
      {children}
      {error && <p className="mt-1.5 font-body text-[11px] text-error">{error}</p>}
    </div>
  );
}

export function EntryForm({ onEntered }: EntryFormProps) {
  const t = useTranslations('enter');
  const tCommon = useTranslations('common');
  const tToast = useTranslations('toast');
  const locale = useLocale() as 'en' | 'he';

  const turnstileRef = useRef<TurnstileInstance>(null);
  const [token, setToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<EntryFormValues>({
    resolver: zodResolver(entryFormSchema),
    mode: 'onChange',
    defaultValues: { email: '', countryCode: '+972', phone: '', consent: false },
  });

  /** Translate a Zod message key, falling back to the raw string. */
  const msg = (key?: string) => {
    if (!key) return undefined;
    try {
      return t(key);
    } catch {
      return key;
    }
  };

  async function onValid(values: EntryFormValues) {
    if (!token) {
      toast.error(tToast('botDetected'));
      return;
    }
    setSubmitting(true);
    try {
      const phone = values.countryCode + values.phone.replace(/\D/g, '');
      const res = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          phone,
          sizeUs: values.sizeUs,
          consent: values.consent,
          turnstileToken: token,
          locale,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        toast.error(data.error === 'bot_detected' ? tToast('botDetected') : tToast('submitError'));
        turnstileRef.current?.reset();
        return;
      }

      const data = (await res.json()) as { entryId: string };
      onEntered({ entryId: data.entryId, email: values.email });
    } catch {
      toast.error(tToast('network'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-lg border border-accent-border bg-[rgba(167,139,250,0.015)] p-7 md:p-10">
      <h3 className="font-display text-[24px] font-semibold tracking-[-0.01em] text-fg-primary">
        {t('formTitle')}
      </h3>
      <p className="mt-2 font-body text-[13px] text-fg-muted">{t('formSubtitle')}</p>

      <form onSubmit={handleSubmit(onValid)} className="mt-8 flex flex-col gap-7" noValidate>
        <Field label={t('labelEmail')} error={msg(errors.email?.message)}>
          <Input
            type="email"
            inputMode="email"
            autoComplete="email"
            dir="ltr"
            placeholder={t('emailPlaceholder')}
            hasError={!!errors.email}
            {...register('email')}
          />
        </Field>

        <Field label={t('labelPhone')} error={msg(errors.phone?.message)}>
          <div dir="ltr" className="grid grid-cols-[116px_1fr] items-end gap-4">
            <select
              aria-label="Country code"
              className="h-14 border-0 border-b border-b-border bg-transparent font-body text-[14px] text-fg-primary outline-none transition-colors focus:border-b-accent"
              {...register('countryCode')}
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code} className="bg-surface-2 text-fg-primary">
                  {c.label}
                </option>
              ))}
            </select>
            <Input
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder={t('phonePlaceholder')}
              hasError={!!errors.phone}
              {...register('phone')}
            />
          </div>
        </Field>

        <Field
          label={t.rich('labelSize', {
            unit: (chunks) => <span dir="ltr">{chunks}</span>,
          })}
          error={msg(errors.sizeUs?.message)}
        >
          <Controller
            name="sizeUs"
            control={control}
            render={({ field }) => (
              <SizePicker value={field.value ?? null} onChange={field.onChange} />
            )}
          />
        </Field>

        <label className="flex cursor-pointer select-none items-start gap-3">
          <input type="checkbox" className="peer sr-only" {...register('consent')} />
          <span
            aria-hidden="true"
            className={cn(
              'mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border border-[#3A3B45] transition-colors',
              'peer-checked:border-accent peer-checked:bg-accent',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-checked:[&>svg]:scale-100'
            )}
          >
            <svg
              viewBox="0 0 12 12"
              className="h-2.5 w-2.5 scale-0 text-bg transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M2 6.5l2.5 2.5L10 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-body text-[13px] leading-[1.5] text-fg-muted">{t('consent')}</span>
        </label>

        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          options={{ size: 'invisible' }}
          onSuccess={setToken}
          onError={() => setToken(null)}
          onExpire={() => turnstileRef.current?.reset()}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={submitting}
          disabled={!isValid}
        >
          {tCommon('enterDraw')}
        </Button>
      </form>

      <p className="mt-4 font-body text-[11px] leading-[1.55] text-fg-dim">{t('footnote')}</p>
    </div>
  );
}
