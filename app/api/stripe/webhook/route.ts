import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { updatePartFunding } from "@/lib/part-by-part-store";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecret) {
  throw new Error("STRIPE_SECRET_KEY is not set.");
}

if (!webhookSecret) {
  throw new Error("STRIPE_WEBHOOK_SECRET is not set.");
}

const stripe = new Stripe(stripeSecret, {
  apiVersion: "2023-10-16",
});

export async function POST(request: Request) {
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const partName = session.metadata?.partName;
    const amountTotal = session.amount_total ?? 0;

    if (partName && amountTotal > 0) {
      const amountCad = amountTotal / 100;

      try {
        await updatePartFunding(partName, amountCad);
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Unable to update funding." },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
