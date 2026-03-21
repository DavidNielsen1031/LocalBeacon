import Stripe from "stripe";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-02-25.clover",
      typescript: true,
    })
  : null;

export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    priceId: null,
  },
  SOLO: {
    name: "Local Autopilot",
    price: 49,
    priceId: process.env.STRIPE_SOLO_PRICE_ID || "price_1T6LhxB0OqzCjZpvnGc84VN7",
  },
  AGENCY: {
    name: "Agency",
    price: 99,
    priceId: process.env.STRIPE_AGENCY_PRICE_ID || "price_1T6LhxB0OqzCjZpvcNk2NQUO",
  },
  DFY: {
    name: "Done-For-You",
    price: 499,
    priceId: process.env.STRIPE_DFY_PRICE_ID || "price_1TCRxpB0OqzCjZpvVebA66dn",
  },
} as const;

// Startup validation — log warnings for missing config (non-fatal)
if (typeof window === "undefined") {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("[stripe] STRIPE_SECRET_KEY not set — payments disabled");
  }
  if (!process.env.STRIPE_DFY_PRICE_ID) {
    console.warn("[stripe] STRIPE_DFY_PRICE_ID not set — DFY plan unavailable");
  }
}
