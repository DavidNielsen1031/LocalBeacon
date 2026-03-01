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
    price: 29,
    priceId: process.env.STRIPE_SOLO_PRICE_ID,
  },
  AGENCY: {
    name: "Agency",
    price: 79,
    priceId: process.env.STRIPE_AGENCY_PRICE_ID,
  },
} as const;
