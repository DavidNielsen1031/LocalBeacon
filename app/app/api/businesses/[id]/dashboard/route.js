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
exports.dynamic = void 0;
exports.GET = GET;
exports.dynamic = 'force-dynamic';
var server_1 = require("@clerk/nextjs/server");
var supabase_1 = require("@/lib/supabase");
var server_2 = require("next/server");
function GET(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var userId, businessId, supabase, user, business, postsCount, pagesCount, reviewsCount, recentItems, aeoScans, aeoScore, latestPost, freshness, lastPostDate, daysSince;
        var _c, _d;
        var params = _b.params;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, (0, server_1.auth)()];
                case 1:
                    userId = (_e.sent()).userId;
                    if (!userId)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Unauthorized' }, { status: 401 })];
                    return [4 /*yield*/, params];
                case 2:
                    businessId = (_e.sent()).id;
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Database not configured' }, { status: 503 })
                            // Verify ownership: user must own this business
                        ];
                    return [4 /*yield*/, supabase
                            .from('users')
                            .select('id')
                            .eq('clerk_id', userId)
                            .single()];
                case 3:
                    user = (_e.sent()).data;
                    if (!user)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'User not found' }, { status: 404 })];
                    return [4 /*yield*/, supabase
                            .from('businesses')
                            .select('id')
                            .eq('id', businessId)
                            .eq('user_id', user.id)
                            .single()];
                case 4:
                    business = (_e.sent()).data;
                    if (!business)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Business not found' }, { status: 404 })
                            // Get content counts
                        ];
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', businessId)
                            .eq('type', 'gbp_post')];
                case 5:
                    postsCount = (_e.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', businessId)
                            .eq('type', 'city_page')];
                case 6:
                    pagesCount = (_e.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', businessId)
                            .eq('type', 'review_reply')
                        // Get recent content items
                    ];
                case 7:
                    reviewsCount = (_e.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('type, title, created_at')
                            .eq('business_id', businessId)
                            .order('created_at', { ascending: false })
                            .limit(5)
                        // Get latest AEO scan
                    ];
                case 8:
                    recentItems = (_e.sent()).data;
                    return [4 /*yield*/, supabase
                            .from('aeo_scans')
                            .select('score')
                            .eq('business_id', businessId)
                            .order('scanned_at', { ascending: false })
                            .limit(1)];
                case 9:
                    aeoScans = (_e.sent()).data;
                    aeoScore = (_d = (_c = aeoScans === null || aeoScans === void 0 ? void 0 : aeoScans[0]) === null || _c === void 0 ? void 0 : _c.score) !== null && _d !== void 0 ? _d : null;
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('created_at')
                            .eq('business_id', businessId)
                            .eq('type', 'gbp_post')
                            .order('created_at', { ascending: false })
                            .limit(1)];
                case 10:
                    latestPost = (_e.sent()).data;
                    freshness = null;
                    if (latestPost && latestPost.length > 0) {
                        lastPostDate = latestPost[0].created_at;
                        daysSince = Math.floor((Date.now() - new Date(lastPostDate).getTime()) / (1000 * 60 * 60 * 24));
                        freshness = {
                            daysSinceLastPost: daysSince,
                            status: daysSince <= 7 ? 'fresh' : daysSince <= 14 ? 'stale' : 'critical',
                            lastPostDate: lastPostDate,
                        };
                    }
                    else {
                        freshness = {
                            daysSinceLastPost: null,
                            status: 'none',
                            lastPostDate: null,
                        };
                    }
                    return [2 /*return*/, server_2.NextResponse.json({
                            postsCount: postsCount !== null && postsCount !== void 0 ? postsCount : 0,
                            pagesCount: pagesCount !== null && pagesCount !== void 0 ? pagesCount : 0,
                            reviewsCount: reviewsCount !== null && reviewsCount !== void 0 ? reviewsCount : 0,
                            aeoScore: aeoScore,
                            recentItems: recentItems !== null && recentItems !== void 0 ? recentItems : [],
                            freshness: freshness,
                        })];
            }
        });
    });
}
