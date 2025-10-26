import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/src/lib/stripe";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature");
  const raw = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const s: any = event.data.object;
    const customerId = s.customer as string;
    const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId } });
    if (user) {
      await prisma.subscription.upsert({
        where: { userId: user.id },
        create: { userId: user.id, priceId: process.env.STRIPE_PRICE_ID!, status: "active" },
        update: { priceId: process.env.STRIPE_PRICE_ID!, status: "active" }
      });
    }
  }
  return NextResponse.json({ received: true });
}
