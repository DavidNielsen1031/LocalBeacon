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
exports.getUserPlan = getUserPlan;
exports.checkUsage = checkUsage;
exports.enforceLimits = enforceLimits;
var supabase_1 = require("./supabase");
var PLAN_LIMITS = {
    free: { postsPerMonth: 5, cityPages: 3, locations: 1 },
    solo: { postsPerMonth: null, cityPages: 10, locations: 3 },
    agency: { postsPerMonth: null, cityPages: null, locations: null },
};
/**
 * Get the user's current plan tier from Supabase.
 * Falls back to 'free' if not found.
 */
function getUserPlan(clerkUserId) {
    return __awaiter(this, void 0, void 0, function () {
        var supabase, user, plan;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase)
                        return [2 /*return*/, 'free'];
                    return [4 /*yield*/, supabase
                            .from('users')
                            .select('plan')
                            .eq('clerk_id', clerkUserId)
                            .single()];
                case 1:
                    user = (_a.sent()).data;
                    if (!(user === null || user === void 0 ? void 0 : user.plan))
                        return [2 /*return*/, 'free'];
                    plan = user.plan.toLowerCase();
                    if (plan === 'solo' || plan === 'agency')
                        return [2 /*return*/, plan];
                    return [2 /*return*/, 'free'];
            }
        });
    });
}
/**
 * Count how many items of a given type the user has generated this month.
 */
function getMonthlyUsage(userId, type) {
    return __awaiter(this, void 0, void 0, function () {
        var supabase, user, businesses, business, startOfMonth, count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase)
                        return [2 /*return*/, 0
                            // Get the user's internal ID
                        ];
                    return [4 /*yield*/, supabase
                            .from('users')
                            .select('id')
                            .eq('clerk_id', userId)
                            .single()];
                case 1:
                    user = (_a.sent()).data;
                    if (!user)
                        return [2 /*return*/, 0
                            // Get first business ID (for backward compat — callers should pass businessId directly)
                        ];
                    return [4 /*yield*/, supabase
                            .from('businesses')
                            .select('id')
                            .eq('user_id', user.id)
                            .limit(1)];
                case 2:
                    businesses = (_a.sent()).data;
                    business = businesses === null || businesses === void 0 ? void 0 : businesses[0];
                    if (!business)
                        return [2 /*return*/, 0
                            // Count this month's content items
                        ];
                    startOfMonth = new Date();
                    startOfMonth.setDate(1);
                    startOfMonth.setHours(0, 0, 0, 0);
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', business.id)
                            .eq('type', type)
                            .gte('created_at', startOfMonth.toISOString())];
                case 3:
                    count = (_a.sent()).count;
                    return [2 /*return*/, count !== null && count !== void 0 ? count : 0];
            }
        });
    });
}
/**
 * Check if the user can generate a specific content type.
 * Returns usage info including whether the action is allowed.
 */
function checkUsage(clerkUserId, contentType) {
    return __awaiter(this, void 0, void 0, function () {
        var plan, limits, limitKey, limit, used, remaining;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserPlan(clerkUserId)];
                case 1:
                    plan = _a.sent();
                    limits = PLAN_LIMITS[plan];
                    limitKey = contentType === 'gbp_post' ? 'postsPerMonth' : 'cityPages';
                    limit = limits[limitKey];
                    // Unlimited plan
                    if (limit === null) {
                        return [2 /*return*/, {
                                allowed: true,
                                plan: plan,
                                limit: null,
                                used: 0,
                                remaining: null,
                                upgradeUrl: '/pricing',
                            }];
                    }
                    return [4 /*yield*/, getMonthlyUsage(clerkUserId, contentType)];
                case 2:
                    used = _a.sent();
                    remaining = Math.max(0, limit - used);
                    return [2 /*return*/, {
                            allowed: used < limit,
                            plan: plan,
                            limit: limit,
                            used: used,
                            remaining: remaining,
                            upgradeUrl: '/pricing',
                        }];
            }
        });
    });
}
/**
 * Enforce limits — call this at the top of generation API routes.
 * Returns null if allowed, or an error response object if blocked.
 */
function enforceLimits(clerkUserId, contentType) {
    return __awaiter(this, void 0, void 0, function () {
        var usage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkUsage(clerkUserId, contentType)];
                case 1:
                    usage = _a.sent();
                    if (usage.allowed)
                        return [2 /*return*/, null];
                    return [2 /*return*/, {
                            error: 'limit_reached',
                            limit: usage.limit,
                            used: usage.used,
                            plan: usage.plan,
                            upgrade_url: usage.upgradeUrl,
                        }];
            }
        });
    });
}
