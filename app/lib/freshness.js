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
exports.getFreshness = getFreshness;
var supabase_1 = require("./supabase");
/**
 * Returns how recently this user's business has posted content.
 * Checks both content_items and content_queue for the latest created_at.
 *
 * Thresholds:
 *   fresh    = 0–7 days
 *   stale    = 8–14 days
 *   critical = 15+ days
 *   none     = no posts ever
 */
function getFreshness(clerkUserId) {
    return __awaiter(this, void 0, void 0, function () {
        var supabase, user, business, latestItem, latestQueued, dates, mostRecent, now, diffMs, daysSinceLastPost, lastPostDate, status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase)
                        return [2 /*return*/, { daysSinceLastPost: null, status: 'none', lastPostDate: null }
                            // Step 1: resolve internal user ID from Clerk ID
                        ];
                    return [4 /*yield*/, supabase
                            .from('users')
                            .select('id')
                            .eq('clerk_id', clerkUserId)
                            .single()];
                case 1:
                    user = (_a.sent()).data;
                    if (!user)
                        return [2 /*return*/, { daysSinceLastPost: null, status: 'none', lastPostDate: null }
                            // Step 2: get business
                        ];
                    return [4 /*yield*/, supabase
                            .from('businesses')
                            .select('id')
                            .eq('user_id', user.id)
                            .single()];
                case 2:
                    business = (_a.sent()).data;
                    if (!business)
                        return [2 /*return*/, { daysSinceLastPost: null, status: 'none', lastPostDate: null }
                            // Step 3: latest created_at from content_items
                        ];
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('created_at')
                            .eq('business_id', business.id)
                            .order('created_at', { ascending: false })
                            .limit(1)
                            .single()
                        // Step 4: latest created_at from content_queue
                    ];
                case 3:
                    latestItem = (_a.sent()).data;
                    return [4 /*yield*/, supabase
                            .from('content_queue')
                            .select('created_at')
                            .eq('business_id', business.id)
                            .order('created_at', { ascending: false })
                            .limit(1)
                            .single()
                        // Step 5: pick the most recent across both tables
                    ];
                case 4:
                    latestQueued = (_a.sent()).data;
                    dates = [];
                    if (latestItem === null || latestItem === void 0 ? void 0 : latestItem.created_at)
                        dates.push(new Date(latestItem.created_at));
                    if (latestQueued === null || latestQueued === void 0 ? void 0 : latestQueued.created_at)
                        dates.push(new Date(latestQueued.created_at));
                    if (dates.length === 0) {
                        return [2 /*return*/, { daysSinceLastPost: null, status: 'none', lastPostDate: null }];
                    }
                    mostRecent = dates.reduce(function (a, b) { return (a > b ? a : b); });
                    now = new Date();
                    diffMs = now.getTime() - mostRecent.getTime();
                    daysSinceLastPost = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                    lastPostDate = mostRecent.toISOString();
                    if (daysSinceLastPost <= 7) {
                        status = 'fresh';
                    }
                    else if (daysSinceLastPost <= 14) {
                        status = 'stale';
                    }
                    else {
                        status = 'critical';
                    }
                    return [2 /*return*/, { daysSinceLastPost: daysSinceLastPost, status: status, lastPostDate: lastPostDate }];
            }
        });
    });
}
