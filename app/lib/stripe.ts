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
    name: "Solo",
    price: 49,
    priceId: process.env.STRIPE_SOLO_PRICE_ID || "price_1T6LhxB0OqzCjZpvnGc84VN7",
  },
  AGENCY: {
    name: "Agency",
    price: 99,
    priceId: process.env.STRIPE_AGENCY_PRICE_ID || "price_1T6LhxB0OqzCjZpvcNk2NQUO",
  },
} as const;
