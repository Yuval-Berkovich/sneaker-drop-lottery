/**
 * Passthrough root layout. The real <html>/<body> shell lives in
 * app/[locale]/layout.tsx (it needs the locale for lang/dir); the global
 * app/not-found.tsx renders its own shell.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
