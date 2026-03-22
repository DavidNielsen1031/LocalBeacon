import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Stripe webhook verification failed: ${message}`);
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 });
  }

  const supabase = createServerClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      // Prefer client_reference_id (Clerk userId), fall back to metadata for legacy sessions
      const clerkUserId = session.client_reference_id || session.metadata?.clerk_user_id;
      const plan = session.metadata?.plan?.toLowerCase() || "solo";

      if (clerkUserId && supabase) {
        if (plan === "dfy") {
          // DFY: one-time payment — grant Solo access for 30 days + set dfy_purchased flag
          const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          await supabase
            .from("users")
            .update({
              plan: "solo",
              plan_expires_at: expiresAt,
              dfy_purchased: true,
              stripe_customer_id: session.customer as string,
            })
            .eq("clerk_id", clerkUserId);
          console.log(`DFY checkout completed: ${session.id} — Local Autopilot access granted until ${expiresAt}, user: ${clerkUserId}`);
        } else {
          // Regular subscription (solo)
          await supabase
            .from("users")
            .update({
              plan: plan,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
            })
            .eq("clerk_id", clerkUserId);
          console.log(`Checkout completed: ${session.id} — plan: ${plan}, user: ${clerkUserId}`);
        }
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const clerkUserId = subscription.metadata?.clerk_user_id;
      const status = subscription.status;

      if (clerkUserId && supabase) {
        if (status === "active") {
          // Plan stays as-is — already set on checkout.session.completed
          console.log(`Subscription active for user ${clerkUserId}`);
        } else if (status === "past_due" || status === "unpaid" || status === "canceled") {
          // Downgrade to free on payment failure or cancellation
          await supabase
            .from("users")
            .update({ plan: "free" })
            .eq("clerk_id", clerkUserId);
          console.log(`Subscription ${status} — downgraded user ${clerkUserId} to free`);
        }
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const clerkUserId = subscription.metadata?.clerk_user_id;

      if (clerkUserId && supabase) {
        await supabase
          .from("users")
          .update({
            plan: "free",
            stripe_subscription_id: null,
          })
          .eq("clerk_id", clerkUserId);
      }
      console.log(`Subscription cancelled for user ${clerkUserId}`);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`Payment failed for invoice: ${invoice.id}, customer: ${invoice.customer}`);

      // Find user by Stripe customer ID and downgrade to free
      if (invoice.customer && supabase) {
        const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer.id;
        const { data: user } = await supabase
          .from("users")
          .select("clerk_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (user?.clerk_id) {
          await supabase
            .from("users")
            .update({ plan: "free" })
            .eq("clerk_id", user.clerk_id);
          console.log(`Payment failed — downgraded user ${user.clerk_id} to free`);
        }
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
