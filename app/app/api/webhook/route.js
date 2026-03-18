"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
var server_1 = require("next/server");
var stripe_1 = require("@/lib/stripe");
var supabase_1 = require("@/lib/supabase");
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var body, signature, event, message, supabase, _a, session, clerkUserId, plan, subscription, clerkUserId, status_1, subscription, clerkUserId, invoice;
        var _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, req.text()];
                case 1:
                    body = _g.sent();
                    signature = req.headers.get("stripe-signature");
                    if (!signature) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })];
                    }
                    if (!stripe_1.stripe) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Stripe not configured" }, { status: 500 })];
                    }
                    try {
                        event = stripe_1.stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
                    }
                    catch (err) {
                        message = err instanceof Error ? err.message : "Unknown error";
                        console.error("Stripe webhook verification failed: ".concat(message));
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Webhook error: ".concat(message) }, { status: 400 })];
                    }
                    supabase = (0, supabase_1.createServerClient)();
                    _a = event.type;
                    switch (_a) {
                        case "checkout.session.completed": return [3 /*break*/, 2];
                        case "customer.subscription.updated": return [3 /*break*/, 5];
                        case "customer.subscription.deleted": return [3 /*break*/, 6];
                        case "invoice.payment_failed": return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 10];
                case 2:
                    session = event.data.object;
                    clerkUserId = (_b = session.metadata) === null || _b === void 0 ? void 0 : _b.clerk_user_id;
                    plan = ((_d = (_c = session.metadata) === null || _c === void 0 ? void 0 : _c.plan) === null || _d === void 0 ? void 0 : _d.toLowerCase()) || "solo";
                    if (!(clerkUserId && supabase)) return [3 /*break*/, 4];
                    return [4 /*yield*/, supabase
                            .from("users")
                            .update({
                            plan: plan,
                            stripe_customer_id: session.customer,
                            stripe_subscription_id: session.subscription,
                        })
                            .eq("clerk_id", clerkUserId)];
                case 3:
                    _g.sent();
                    _g.label = 4;
                case 4:
                    console.log("Checkout completed: ".concat(session.id, " \u2014 plan: ").concat(plan, ", user: ").concat(clerkUserId));
                    return [3 /*break*/, 11];
                case 5:
                    {
                        subscription = event.data.object;
                        clerkUserId = (_e = subscription.metadata) === null || _e === void 0 ? void 0 : _e.clerk_user_id;
                        status_1 = subscription.status;
                        if (clerkUserId && supabase) {
                            if (status_1 === "active") {
                                // Plan stays as-is
                            }
                            else if (status_1 === "past_due" || status_1 === "unpaid") {
                                // Keep plan but flag status
                                console.log("Subscription ".concat(status_1, " for user ").concat(clerkUserId));
                            }
                        }
                        return [3 /*break*/, 11];
                    }
                    _g.label = 6;
                case 6:
                    subscription = event.data.object;
                    clerkUserId = (_f = subscription.metadata) === null || _f === void 0 ? void 0 : _f.clerk_user_id;
                    if (!(clerkUserId && supabase)) return [3 /*break*/, 8];
                    return [4 /*yield*/, supabase
                            .from("users")
                            .update({
                            plan: "free",
                            stripe_subscription_id: null,
                        })
                            .eq("clerk_id", clerkUserId)];
                case 7:
                    _g.sent();
                    _g.label = 8;
                case 8:
                    console.log("Subscription cancelled for user ".concat(clerkUserId));
                    return [3 /*break*/, 11];
                case 9:
                    {
                        invoice = event.data.object;
                        console.log("Payment failed for invoice: ".concat(invoice.id));
                        return [3 /*break*/, 11];
                    }
                    _g.label = 10;
                case 10:
                    console.log("Unhandled event type: ".concat(event.type));
                    _g.label = 11;
                case 11: return [2 /*return*/, server_1.NextResponse.json({ received: true })];
            }
        });
    });
}
