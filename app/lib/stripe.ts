import Stripe from "stripe";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-02-25.clover",
      typescript: true,
    })
  : null;

export const STRIPE_PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    priceId: null,
  },
  SOLO: {
    name: "Autopilot (Monthly)",
    price: 99,
    priceId: process.env.STRIPE_SOLO_PRICE_ID,
  },
  SOLO_ANNUAL: {
    name: "Autopilot (Annual)",
    price: 899,
    priceId: process.env.STRIPE_SOLO_ANNUAL_PRICE_ID,
  },
  DFY: {
    name: "Launch Package",
    price: 499,
    priceId: process.env.STRIPE_DFY_PRICE_ID,
  },
} as const;

/** @deprecated Use STRIPE_PLANS instead */
export const PLANS = STRIPE_PLANS;

export type StripePlanKey = keyof typeof STRIPE_PLANS;

// Startup validation — log warnings for missing config (non-fatal)
if (typeof window === "undefined") {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("[stripe] STRIPE_SECRET_KEY not set — payments disabled");
  }
  if (!process.env.STRIPE_SOLO_PRICE_ID) {
    console.warn("[stripe] STRIPE_SOLO_PRICE_ID not set — Autopilot monthly unavailable");
  }
  if (!process.env.STRIPE_SOLO_ANNUAL_PRICE_ID) {
    console.warn("[stripe] STRIPE_SOLO_ANNUAL_PRICE_ID not set — Autopilot annual unavailable");
  }
  if (!process.env.STRIPE_DFY_PRICE_ID) {
    console.warn("[stripe] STRIPE_DFY_PRICE_ID not set — Launch Package unavailable");
  }
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.warn("[stripe] STRIPE_WEBHOOK_SECRET not set — webhook verification disabled");
  }
}
