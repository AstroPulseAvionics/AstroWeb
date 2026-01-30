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
AWS_REGION=ca-central-1
DDB_PARTS_TABLE=AstroPulseParts
DDB_SPONSORS_TABLE=AstroPulseSponsors
DDB_INDIVIDUALS_TABLE=AstroPulseIndividuals
DDB_EVENTS_TABLE=AstroPulseWebhookEvents
```

To test webhooks locally, use the Stripe CLI:

```bash
stripe login
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

The webhook updates DynamoDB to track funded totals.

## DynamoDB Tables (Console Setup)

Create three tables in the AWS Console (DynamoDB):

1. `AstroPulseParts` (partition key: `name` as String)
2. `AstroPulseSponsors` (partition key: `name` as String)
3. `AstroPulseIndividuals` (partition key: `name` as String)
4. `AstroPulseWebhookEvents` (partition key: `id` as String)

Recommended attributes per item:

- Parts: `name`, `price`, `description`, `funded`, `image`, `order`
- Sponsors: `name`, `logo`, `url`, `whiteBackground`, `logoPadding`, `order`
- Individuals: `name`, `order`

For default ordering, populate the `order` number field.

## Seeding DynamoDB From JSON

This script reads `lib/part-by-part.json`, `lib/sponsors.json`, and
`lib/individual-supporters.json` and writes them to DynamoDB, adding an `order`
field based on the JSON list order.

```bash
npm run seed:dynamodb
```
