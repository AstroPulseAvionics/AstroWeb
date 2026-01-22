This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stripe Sponsorship Setup

Install the Stripe server SDK if you haven't already:

```bash
npm install
```

Set the following environment variables (for local development use `.env.local`):

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

To test webhooks locally, use the Stripe CLI:

```bash
stripe login
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

The webhook updates `lib/part-by-part.json` to track funded totals. This file-based
storage is intended for local/dev only; for production you should store funding
data in a database or external service.
