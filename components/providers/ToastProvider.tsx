'use client';

import { Toaster } from 'sonner';

/** Sonner toaster themed to match the SOLE design system. */
export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      duration={4000}
      theme="dark"
      toastOptions={{
        classNames: {
          toast:
            'font-mono !bg-surface-2 !border !border-border !text-fg-primary !rounded-lg !text-[12px] !tracking-wide',
          error: '!border-error',
          success: '!border-accent',
        },
      }}
    />
  );
}
