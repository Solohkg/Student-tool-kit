import { NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { stripe, createSubscription } from "@/src/lib/stripe";

export async function POST() {
  const session = await auth();
  if (!session?.user?.email || !session.user.id) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  let user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.stripeCustomerId) {
    const customer = await stripe.customers.create({ email: session.user.email! });
    user = await prisma.user.update({ where: { id: session.user.id }, data: { stripeCustomerId: customer.id } });
  }

  const url = await createSubscription({ customerId: user!.stripeCustomerId!, email: session.user.email! });
  return NextResponse.json({ url });
}
