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
exports.default = ReportsPage;
exports.dynamic = 'force-dynamic';
var server_1 = require("@clerk/nextjs/server");
var supabase_1 = require("@/lib/supabase");
var card_1 = require("@/components/ui/card");
function getMonthlyData(clerkUserId) {
    return __awaiter(this, void 0, void 0, function () {
        var supabase, user, business, now, startOfMonth, postsCount, pagesCount, reviewsCount, prevMonthStart, prevMonthEnd, prevPostsCount, prevPagesCount, prevReviewsCount, queuedCount, postedCount, aeoScan;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, supabase
                            .from('users')
                            .select('id')
                            .eq('clerk_id', clerkUserId)
                            .single()];
                case 1:
                    user = (_c.sent()).data;
                    if (!user)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, supabase
                            .from('businesses')
                            .select('id, name')
                            .eq('user_id', user.id)
                            .single()];
                case 2:
                    business = (_c.sent()).data;
                    if (!business)
                        return [2 /*return*/, null
                            // Current month range
                        ];
                    now = new Date();
                    startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', business.id)
                            .eq('type', 'gbp_post')
                            .gte('created_at', startOfMonth.toISOString())];
                case 3:
                    postsCount = (_c.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', business.id)
                            .eq('type', 'city_page')
                            .gte('created_at', startOfMonth.toISOString())];
                case 4:
                    pagesCount = (_c.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', business.id)
                            .eq('type', 'review_reply')
                            .gte('created_at', startOfMonth.toISOString())
                        // Previous month counts for comparison
                    ];
                case 5:
                    reviewsCount = (_c.sent()).count;
                    prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                    prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', business.id)
                            .eq('type', 'gbp_post')
                            .gte('created_at', prevMonthStart.toISOString())
                            .lte('created_at', prevMonthEnd.toISOString())];
                case 6:
                    prevPostsCount = (_c.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', business.id)
                            .eq('type', 'city_page')
                            .gte('created_at', prevMonthStart.toISOString())
                            .lte('created_at', prevMonthEnd.toISOString())];
                case 7:
                    prevPagesCount = (_c.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', business.id)
                            .eq('type', 'review_reply')
                            .gte('created_at', prevMonthStart.toISOString())
                            .lte('created_at', prevMonthEnd.toISOString())
                        // Count queued items
                    ];
                case 8:
                    prevReviewsCount = (_c.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('content_queue')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', business.id)
                            .gte('created_at', startOfMonth.toISOString())];
                case 9:
                    queuedCount = (_c.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('content_queue')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', business.id)
                            .eq('status', 'posted')
                            .gte('created_at', startOfMonth.toISOString())
                        // Latest AEO scan
                    ];
                case 10:
                    postedCount = (_c.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('aeo_scans')
                            .select('score, scanned_at')
                            .eq('business_id', business.id)
                            .order('scanned_at', { ascending: false })
                            .limit(1)
                            .single()];
                case 11:
                    aeoScan = (_c.sent()).data;
                    return [2 /*return*/, {
                            businessName: business.name,
                            postsGenerated: postsCount !== null && postsCount !== void 0 ? postsCount : 0,
                            prevPosts: prevPostsCount !== null && prevPostsCount !== void 0 ? prevPostsCount : 0,
                            pagesCreated: pagesCount !== null && pagesCount !== void 0 ? pagesCount : 0,
                            prevPages: prevPagesCount !== null && prevPagesCount !== void 0 ? prevPagesCount : 0,
                            reviewsReplied: reviewsCount !== null && reviewsCount !== void 0 ? reviewsCount : 0,
                            prevReviews: prevReviewsCount !== null && prevReviewsCount !== void 0 ? prevReviewsCount : 0,
                            queuedTotal: queuedCount !== null && queuedCount !== void 0 ? queuedCount : 0,
                            queuedPosted: postedCount !== null && postedCount !== void 0 ? postedCount : 0,
                            aeoScore: (_a = aeoScan === null || aeoScan === void 0 ? void 0 : aeoScan.score) !== null && _a !== void 0 ? _a : null,
                            aeoDate: (_b = aeoScan === null || aeoScan === void 0 ? void 0 : aeoScan.scanned_at) !== null && _b !== void 0 ? _b : null,
                            monthName: now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                        }];
            }
        });
    });
}
function ReportsPage() {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, _a, stats;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0: return [4 /*yield*/, (0, server_1.auth)()];
                case 1:
                    userId = (_m.sent()).userId;
                    if (!userId) return [3 /*break*/, 3];
                    return [4 /*yield*/, getMonthlyData(userId)];
                case 2:
                    _a = _m.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = null;
                    _m.label = 4;
                case 4:
                    data = _a;
                    stats = [
                        { label: 'Google Posts', value: (_b = data === null || data === void 0 ? void 0 : data.postsGenerated) !== null && _b !== void 0 ? _b : 0, prev: (_c = data === null || data === void 0 ? void 0 : data.prevPosts) !== null && _c !== void 0 ? _c : 0, icon: '📝' },
                        { label: 'City Pages', value: (_d = data === null || data === void 0 ? void 0 : data.pagesCreated) !== null && _d !== void 0 ? _d : 0, prev: (_e = data === null || data === void 0 ? void 0 : data.prevPages) !== null && _e !== void 0 ? _e : 0, icon: '🌐' },
                        { label: 'Review Replies', value: (_f = data === null || data === void 0 ? void 0 : data.reviewsReplied) !== null && _f !== void 0 ? _f : 0, prev: (_g = data === null || data === void 0 ? void 0 : data.prevReviews) !== null && _g !== void 0 ? _g : 0, icon: '⭐' },
                        { label: 'Posts Queued', value: (_h = data === null || data === void 0 ? void 0 : data.queuedTotal) !== null && _h !== void 0 ? _h : 0, prev: null, icon: '📅' },
                        { label: 'Posts Published', value: (_j = data === null || data === void 0 ? void 0 : data.queuedPosted) !== null && _j !== void 0 ? _j : 0, prev: null, icon: '✅' },
                    ];
                    return [2 /*return*/, (<div className="flex-1 px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Your Monthly Report</h1>
        <p className="text-white/50 mt-1 text-sm">
          {(_k = data === null || data === void 0 ? void 0 : data.monthName) !== null && _k !== void 0 ? _k : 'This month'} — {(_l = data === null || data === void 0 ? void 0 : data.businessName) !== null && _l !== void 0 ? _l : 'Your Business'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map(function (stat) {
                                var delta = stat.prev !== null ? stat.value - stat.prev : null;
                                return (<card_1.Card key={stat.label} className="bg-white/5 border-white/10">
              <card_1.CardContent className="p-5 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                {delta !== null && delta !== 0 && (<p className={"text-xs mt-1 font-semibold ".concat(delta > 0 ? 'text-green-400' : 'text-red-400')}>
                    {delta > 0 ? "\u2191 ".concat(delta, " more") : "\u2193 ".concat(Math.abs(delta), " fewer")} than last month
                  </p>)}
              </card_1.CardContent>
            </card_1.Card>);
                            })}
      </div>

      {/* AEO Score */}
      {(data === null || data === void 0 ? void 0 : data.aeoScore) !== null && (data === null || data === void 0 ? void 0 : data.aeoScore) !== undefined && (<card_1.Card className="bg-white/5 border-white/10 mb-8">
          <card_1.CardContent className="p-6 flex items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#00B894]">
                {data.aeoScore}
              </div>
              <div className="text-xs text-white/40 mt-1">out of 100</div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">AI Readiness Score</h3>
              <p className="text-white/50 text-sm">
                How visible your business is to AI search engines like ChatGPT, Perplexity, and Google AI.
                {data.aeoDate && (<span className="text-white/30">
                    {' '}Last scanned {new Date(data.aeoDate).toLocaleDateString()}.
                  </span>)}
              </p>
            </div>
          </card_1.CardContent>
        </card_1.Card>)}

      {/* Empty state */}
      {(!data || (data.postsGenerated === 0 && data.pagesCreated === 0 && data.reviewsReplied === 0 && data.queuedTotal === 0)) && (<card_1.Card className="bg-[#FFD700]/5 border-[#FFD700]/30">
          <card_1.CardContent className="p-6 text-center">
            <p className="text-white text-lg font-semibold mb-2">No activity yet this month</p>
            <p className="text-white/50 text-sm mb-4">
              Start generating content and your monthly summary will appear here.
              You&apos;ll also receive this as an email on the 1st of each month.
            </p>
          </card_1.CardContent>
        </card_1.Card>)}

      {/* Email note */}
      <p className="text-white/30 text-xs text-center mt-8">
        This summary is emailed to you on the 1st of each month.
      </p>
    </div>)];
            }
        });
    });
}
