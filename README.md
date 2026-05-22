# SOLE — Drop 04 · Black Chrome

A single-page sneaker drop lottery experience for a fictional release of the
**Air Jordan 4 "Black Chrome" (Eminem × Carhartt)** — 1,200 pairs, drawn live,
one entry per verified identity.

> SNKRS-dark, editorial, restrained. Cinematic typography, generous negative
> space, one violet accent.

## About

This is a portfolio piece. It demonstrates a modern full-stack React build:
the App Router, internationalised routing with full RTL support, a typed and
validated API layer, scroll-driven motion, and a multi-step entry flow with
bot protection. The lottery is a demo — every verified entry is "selected".

## Tech stack

| Layer       | Choice                                                                             |
| ----------- | ---------------------------------------------------------------------------------- |
| Framework   | [Next.js 14](https://nextjs.org) (App Router) + TypeScript                         |
| Styling     | [Tailwind CSS 3.4](https://tailwindcss.com) — custom components                    |
| Animation   | [Framer Motion 11](https://www.framer.com/motion/)                                 |
| i18n        | [next-intl 3](https://next-intl.dev) — `/en` + `/he`, RTL                          |
| Forms       | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)            |
| Toasts      | [Sonner](https://sonner.emilkowal.ski)                                             |
| Bot defence | [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) (invisible) |
| Icons       | [lucide-react](https://lucide.dev)                                                 |
| Quality     | ESLint · Prettier · Husky · lint-staged                                            |
| Deploy      | [Vercel](https://vercel.com)                                                       |

## Local setup

```bash
git clone <your-repo-url>
cd sole-sneaker-drop
npm install
cp .env.local.example .env.local   # already filled with working test keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en`.

## Environment variables

`.env.local.example` ships with Cloudflare's **public test keys**, so the app
runs end-to-end with no signup. For production, swap in real values.

| Variable                         | Purpose                         | Where to get it                             |
| -------------------------------- | ------------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile widget (client)       | Cloudflare dashboard → Turnstile → Add site |
| `TURNSTILE_SECRET_KEY`           | Turnstile verification (server) | Same Turnstile site                         |
| `NEXT_PUBLIC_SITE_URL`           | Public base URL                 | Your deployment URL                         |

Cloudflare's test keys (`1x00000000000000000000AA` /
`1x0000000000000000000000000000000AA`) always pass and require no account.

## Mock backend (stateless API routes, OTP `123456`, rolling countdown, Turnstile test keys)

There is no database. The API routes are intentionally **stateless** — Vercel
serverless functions don't share memory across requests, so nothing is
persisted between calls:

- `POST /api/entries` — validates the body (Zod), verifies the Turnstile
  token, and returns a fresh `entryId`.
- `POST /api/entries/verify` — the mock OTP is always `123456`. Any other code
  returns `400`. Every verified entry is "selected" (demo mode).
- `GET /api/countdown` — a rolling 30-day target, recomputed per request, so
  the timer never expires.

No real email, SMS, payment, or lottery logic is involved.

## Scripts

| Command          | Does                 |
| ---------------- | -------------------- |
| `npm run dev`    | Start the dev server |
| `npm run build`  | Production build     |
| `npm run lint`   | ESLint               |
| `npm run format` | Prettier write       |

A Husky pre-commit hook runs `lint-staged` (ESLint + Prettier) on staged files.

## Deployment

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new) — the framework preset is
   detected automatically.
3. Add the three environment variables above in the Vercel project settings.
4. Deploy. Pushes to `main` deploy automatically; `/en` and `/he` both work in
   production.

## License

MIT
