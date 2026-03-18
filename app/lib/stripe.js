"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLANS = exports.stripe = void 0;
var stripe_1 = require("stripe");
exports.stripe = process.env.STRIPE_SECRET_KEY
    ? new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2026-02-25.clover",
        typescript: true,
    })
    : null;
exports.PLANS = {
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
};
