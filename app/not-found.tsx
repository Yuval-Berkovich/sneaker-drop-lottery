import Link from 'next/link';
import './globals.css';

/**
 * Root not-found for paths outside the [locale] segment.
 * Standalone (no locale layout), so it renders its own html/body.
 */
export default function NotFound() {
  return (
    <html lang="en" dir="ltr">
      <body className="bg-bg">
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            SOLE · DROP 04
          </p>
          <h1 className="font-display text-4xl font-semibold text-white">Page not found.</h1>
          <p className="max-w-sm font-body text-[13px] text-fg-muted">
            This drop doesn&rsquo;t exist. Head back to the entry.
          </p>
          <Link
            href="/en"
            className="font-display text-[15px] font-semibold uppercase tracking-[0.04em] text-accent underline underline-offset-4"
          >
            Back to SOLE
          </Link>
        </main>
      </body>
    </html>
  );
}
