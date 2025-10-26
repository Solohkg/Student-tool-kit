# Student Productivity Toolkit — Flat Zip (Next.js + Stripe + Email Login)

**All files are in one layer.** During `npm run dev` / `npm run build`, a script (`build-prepare.cjs`) copies them into the proper Next.js folders.

## Quick Start
```bash
npm i
cp .env.example .env.local
npx prisma migrate dev
npm run dev
```

- Open http://localhost:3000
- /login → email magic link
- /pricing → subscribe $5/mo (Stripe test)
- /app → gated app

## Deploy (Vercel)
- Upload these files to a GitHub repo (no folders needed).
- Import to Vercel → add env vars from `.env.example` → Deploy.
- In Stripe, create a recurring **$5/month** price → set `STRIPE_PRICE_ID`.
- Add webhook to `/api/stripe/webhook`.

Enjoy! 🎓
