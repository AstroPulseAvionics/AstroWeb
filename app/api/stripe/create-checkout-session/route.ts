import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;

if (!stripeSecret) {
  throw new Error("STRIPE_SECRET_KEY is not set.");
}

const stripe = new Stripe(stripeSecret, {
  apiVersion: "2024-04-10",
});

export async function POST(request: Request) {
  try {
    const { partName, amount } = (await request.json()) as {
      partName?: string;
      amount?: number;
    };

    if (!partName || typeof partName !== "string") {
      return NextResponse.json(
        { error: "Missing part name." },
        { status: 400 }
      );
    }

    const amountValue = Number(amount);
    if (!Number.isFinite(amountValue) || amountValue <= 0) {
      return NextResponse.json(
        { error: "Invalid amount." },
        { status: 400 }
      );
    }

    const amountInCents = Math.round(amountValue * 100);
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: `Sponsor: ${partName}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        partName,
      },
      success_url: `${baseUrl}/?sponsor=success`,
      cancel_url: `${baseUrl}/?sponsor=cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to create checkout session." },
      { status: 500 }
    );
  }
}
