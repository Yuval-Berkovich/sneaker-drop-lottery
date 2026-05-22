'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const SEEN_KEY = 'sole_intro_seen';
const MAX_MS = 6000;
const LOAD_TIMEOUT_MS = 1500;

/**
 * Full-viewport intro that plays once per browser tab session.
 * Dismisses on video end, ESC/Enter/Space, click, or a hard timeout.
 */
export function SplashIntro() {
  const t = useTranslations('splash');
  const tCommon = useTranslations('common');

  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const dismissedRef = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* sessionStorage unavailable — proceed anyway */
    }
    setLeaving(true);
    window.setTimeout(() => {
      setShow(false);
      const first = document.querySelector<HTMLElement>('header a, header button');
      first?.focus({ preventScroll: true });
    }, 600);
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
      seen = false;
    }
    if (seen) {
      dismissedRef.current = true;
      setShow(false);
      return;
    }

    const video = videoRef.current;
    const start = performance.now();
    let loaded = false;
    let raf = 0;
    const timers: number[] = [];

    const tick = () => {
      if (dismissedRef.current) return;
      let p: number;
      if (video && video.duration && isFinite(video.duration) && video.duration > 0) {
        p = video.currentTime / video.duration;
      } else {
        p = (performance.now() - start) / MAX_MS;
      }
      setProgress(Math.min(1, Math.max(0, p)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onLoaded = () => {
      loaded = true;
    };
    if (video) {
      video.addEventListener('ended', dismiss);
      video.addEventListener('error', dismiss);
      video.addEventListener('loadeddata', onLoaded);
      void video.play?.()?.catch(() => {
        /* autoplay blocked — timers will dismiss */
      });
    }

    timers.push(
      window.setTimeout(() => {
        if (!loaded) dismiss();
      }, LOAD_TIMEOUT_MS)
    );
    timers.push(window.setTimeout(dismiss, MAX_MS));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') dismiss();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => clearTimeout(id));
      document.removeEventListener('keydown', onKey);
      if (video) {
        video.removeEventListener('ended', dismiss);
        video.removeEventListener('error', dismiss);
        video.removeEventListener('loadeddata', onLoaded);
      }
    };
  }, [dismiss]);

  if (!show) return null;

  return (
    <div
      onClick={dismiss}
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-bg',
        'transition-opacity duration-[600ms] ease-out',
        leaving && 'pointer-events-none opacity-0'
      )}
    >
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src="/assets/intro.mp4" type="video/mp4" />
      </video>

      {/* corner vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 80% at 50% 50%, transparent 55%, rgba(6,7,10,0.55) 92%, rgba(6,7,10,0.85) 100%)',
        }}
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          dismiss();
        }}
        className="absolute end-5 top-5 z-[2] inline-flex h-8 items-center rounded-md border border-[rgba(255,255,255,0.18)] bg-bg/45 px-3 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-secondary backdrop-blur-[8px] transition-colors hover:border-accent hover:text-fg-primary md:end-8 md:top-8"
      >
        {tCommon('skip')}
      </button>

      <div className="absolute bottom-6 start-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-3 md:bottom-10 rtl:translate-x-1/2">
        <div className="h-px w-[140px] overflow-hidden bg-[rgba(167,139,250,0.2)] md:w-[200px]">
          <div
            className="h-full bg-accent shadow-[0_0_8px_#A78BFA]"
            style={{ width: `${(progress * 100).toFixed(1)}%` }}
          />
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-fg-dim">
          {t('tagline')}
        </div>
      </div>
    </div>
  );
}
