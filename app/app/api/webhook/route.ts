import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe, STRIPE_PLANS } from "@/lib/stripe";
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
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Stripe webhook verification failed: ${message}`);
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 });
  }

  const supabase = createServerClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const clerkUserId = session.client_reference_id || session.metadata?.clerk_user_id;
      const plan = session.metadata?.plan?.toUpperCase() || "SOLO";

      // Pre-auth checkout (no Clerk user yet) — will be claimed via /api/claim-checkout after sign-up
      if (!clerkUserId) {
        const customerEmail = session.customer_details?.email || session.customer_email;
        console.log(`Pre-auth checkout completed: ${session.id} — email: ${customerEmail}, plan: ${plan}. Will be claimed after sign-up.`);
        break;
      }

      if (clerkUserId && supabase) {
        if (plan === "DFY") {
          // DFY: one-time payment → grant Solo access for 30 days
          // Then auto-create a $99/mo subscription (first month free via trial)
          const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          const updateData: Record<string, unknown> = {
            plan: "solo",
            billing_period: "monthly",
            plan_expires_at: expiresAt,
            stripe_customer_id: session.customer as string,
          }
          try {
            await supabase
              .from("users")
              .update({ ...updateData, dfy_purchased: true })
              .eq("clerk_id", clerkUserId);
          } catch {
            await supabase
              .from("users")
              .update(updateData)
              .eq("clerk_id", clerkUserId);
          }

          // Auto-create Autopilot subscription with 30-day trial (first month included in DFY)
          const soloPriceId = STRIPE_PLANS.SOLO.priceId
          if (soloPriceId && session.customer) {
            try {
              const subscription = await stripe.subscriptions.create({
                customer: session.customer as string,
                items: [{ price: soloPriceId }],
                trial_period_days: 30,
                metadata: { clerk_user_id: clerkUserId, plan: 'SOLO', created_via: 'dfy_auto' },
              })
              console.log(`DFY auto-subscription created: ${subscription.id} for user ${clerkUserId} (30-day trial)`)
            } catch (subErr) {
              // Non-fatal — log but don't fail the webhook
              console.error(`Failed to auto-create subscription for DFY user ${clerkUserId}:`, subErr)
            }
          }

          console.log(`DFY checkout completed: ${session.id} — Autopilot access granted until ${expiresAt}, user: ${clerkUserId}`);
        } else {
          // SOLO or SOLO_ANNUAL subscription
          const isAnnual = plan === "SOLO_ANNUAL"
          await supabase
            .from("users")
            .update({
              plan: "solo",
              billing_period: isAnnual ? "annual" : "monthly",
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
            })
            .eq("clerk_id", clerkUserId);
          console.log(`Checkout completed: ${session.id} — plan: ${plan}, billing: ${isAnnual ? 'annual' : 'monthly'}, user: ${clerkUserId}`);
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
          const plan = subscription.metadata?.plan?.toUpperCase() || "SOLO";
          const isAnnual = plan === "SOLO_ANNUAL"
          await supabase
            .from("users")
            .update({ plan: "solo", billing_period: isAnnual ? "annual" : "monthly" })
            .eq("clerk_id", clerkUserId);
          console.log(`Subscription reactivated — restored user ${clerkUserId} to plan: solo (${isAnnual ? 'annual' : 'monthly'})`);
        }
        // Do NOT downgrade on past_due/unpaid — Stripe retries; only downgrade on subscription.deleted
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
            billing_period: null,
            stripe_subscription_id: null,
          })
          .eq("clerk_id", clerkUserId);
      }
      console.log(`Subscription cancelled for user ${clerkUserId}`);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(JSON.stringify({
        event: 'stripe_payment_failed',
        invoice_id: invoice.id,
        customer: invoice.customer,
        attempt_count: invoice.attempt_count,
        timestamp: new Date().toISOString(),
      }));
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
