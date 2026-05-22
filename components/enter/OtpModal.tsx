'use client';

import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { VerifyEntryResponse } from '@/lib/types';

interface OtpModalProps {
  entryId: string;
  email: string;
  onVerified: (entryNumber: number) => void;
  onClose: () => void;
}

const LENGTH = 6;

export function OtpModal({ entryId, email, onVerified, onClose }: OtpModalProps) {
  const t = useTranslations('enter');
  const tCommon = useTranslations('common');
  const tToast = useTranslations('toast');

  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(''));
  const [error, setError] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function setDigit(index: number, value: string) {
    const clean = value.replace(/\D/g, '').slice(0, 1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = clean;
      return next;
    });
    setError(false);
    if (clean && index < LENGTH - 1) inputs.current[index + 1]?.focus();
  }

  function onKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') void verify();
  }

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, LENGTH);
    if (!text) return;
    e.preventDefault();
    const next = Array(LENGTH).fill('');
    text.split('').forEach((ch, i) => (next[i] = ch));
    setDigits(next);
    setError(false);
    inputs.current[Math.min(text.length, LENGTH - 1)]?.focus();
  }

  async function verify() {
    const code = digits.join('');
    if (code.length !== LENGTH || verifying) return;
    setVerifying(true);
    try {
      const res = await fetch('/api/entries/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entryId, code }),
      });
      if (!res.ok) {
        setError(true);
        toast.error(tToast('otpWrong'));
        inputs.current[0]?.focus();
        return;
      }
      const data = (await res.json()) as VerifyEntryResponse;
      onVerified(data.entryNumber);
    } catch {
      toast.error(tToast('network'));
    } finally {
      setVerifying(false);
    }
  }

  function resend() {
    setDigits(Array(LENGTH).fill(''));
    setError(false);
    inputs.current[0]?.focus();
    toast.success(tToast('otpResent'));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-bg/85 px-6 backdrop-blur-[20px]"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="otp-title"
        initial={{ scale: 0.96, y: 8 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-[480px] max-w-full rounded-xl border border-accent-border bg-surface-2 p-8 md:p-12"
      >
        <h3 id="otp-title" className="font-display text-[24px] font-semibold text-fg-primary">
          {t('otpTitle')}
        </h3>
        <p className="mb-8 mt-2 font-body text-[13px] text-fg-muted">
          {t('otpSubtitle', { email })}
        </p>

        <div dir="ltr" className="flex justify-center gap-2 md:gap-3">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              value={digit}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              onPaste={onPaste}
              className={cn(
                'h-[52px] w-11 rounded-md border bg-transparent text-center font-display text-[20px] font-semibold text-fg-primary outline-none transition-colors md:h-14 md:w-14 md:text-[22px]',
                error ? 'border-error' : 'border-border focus:border-accent'
              )}
            />
          ))}
        </div>
        {error && (
          <p className="mt-3 text-center font-body text-[12px] text-error">{t('otpError')}</p>
        )}

        <div className="mt-6">
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            loading={verifying}
            onClick={() => void verify()}
          >
            {tCommon('verify')}
          </Button>
        </div>
        <button
          type="button"
          onClick={resend}
          className="mx-auto mt-4 block font-body text-[13px] text-accent hover:underline"
        >
          {tCommon('resend')}
        </button>
      </motion.div>
    </motion.div>
  );
}
