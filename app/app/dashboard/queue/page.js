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
exports.default = QueuePage;
exports.dynamic = 'force-dynamic';
var server_1 = require("@clerk/nextjs/server");
var navigation_1 = require("next/navigation");
var supabase_1 = require("@/lib/supabase");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var queue_actions_1 = require("./queue-actions");
var usage_meter_1 = require("@/components/usage-meter");
var freshness_1 = require("@/lib/freshness");
var freshness_badge_1 = require("@/components/freshness-badge");
function getQueueData(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var supabase, user, business, items;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase)
                        return [2 /*return*/, { business: null, items: [] }
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
                        return [2 /*return*/, { business: null, items: [] }];
                    return [4 /*yield*/, supabase
                            .from('businesses')
                            .select('id, name, category, primary_city')
                            .eq('user_id', user.id)
                            .single()];
                case 2:
                    business = (_a.sent()).data;
                    if (!business)
                        return [2 /*return*/, { business: null, items: [] }];
                    return [4 /*yield*/, supabase
                            .from('content_queue')
                            .select('id, title, content, scheduled_for, status, created_at')
                            .eq('business_id', business.id)
                            .order('scheduled_for', { ascending: true })];
                case 3:
                    items = (_a.sent()).data;
                    return [2 /*return*/, { business: business, items: (items !== null && items !== void 0 ? items : []) }];
            }
        });
    });
}
function formatDate(iso) {
    if (!iso)
        return 'Not scheduled';
    return new Date(iso).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}
function QueuePage() {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a, business, items, freshness;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, (0, server_1.currentUser)()];
                case 1:
                    user = _d.sent();
                    if (!user)
                        (0, navigation_1.redirect)('/sign-in');
                    return [4 /*yield*/, getQueueData(user.id)];
                case 2:
                    _a = _d.sent(), business = _a.business, items = _a.items;
                    return [4 /*yield*/, (0, freshness_1.getFreshness)(user.id)];
                case 3:
                    freshness = _d.sent();
                    return [2 /*return*/, (<div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Your Upcoming Posts</h1>
          <p className="text-white/50 text-sm mt-1">
            Posts we&apos;ve written for your Google listing — ready to copy and publish
          </p>
        </div>

        <queue_actions_1.QueueActions businessId={(_b = business === null || business === void 0 ? void 0 : business.id) !== null && _b !== void 0 ? _b : null}/>
      </div>

      {/* Freshness badge */}
      <div className="mb-4">
        <freshness_badge_1.FreshnessBadge daysSinceLastPost={freshness.daysSinceLastPost} status={freshness.status} lastPostDate={freshness.lastPostDate}/>
      </div>

      {/* Usage meter for free plan */}
      <usage_meter_1.UsageMeter />

      {/* List */}
      {items.length === 0 ? (<card_1.Card className="bg-[#111] border-white/10">
          <card_1.CardContent className="py-16 text-center">
            <div className="text-4xl mb-4">📅</div>
            <p className="text-white/60 text-lg mb-2">No posts queued yet.</p>
            <p className="text-white/40 text-sm mb-6">
              Generate your first weekly post!
            </p>
            <queue_actions_1.QueueActions businessId={(_c = business === null || business === void 0 ? void 0 : business.id) !== null && _c !== void 0 ? _c : null} variant="empty"/>
          </card_1.CardContent>
        </card_1.Card>) : (<div className="space-y-4">
          {items.map(function (item) {
                                    var _a, _b;
                                    return (<card_1.Card key={item.id} className="bg-[#111] border-white/10">
              <card_1.CardContent className="p-5">
                {/* Title + meta */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">
                      {item.title || 'Untitled Post'}
                    </p>
                    <p className="text-white/50 text-sm mt-1 line-clamp-2">
                      {item.content.slice(0, 100)}
                      {item.content.length > 100 ? '…' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <StatusBadge status={item.status}/>
                    <span className="text-white/30 text-xs">
                      📅 {formatDate(item.scheduled_for)}
                    </span>
                  </div>
                </div>

                {/* Actions below content */}
                <queue_actions_1.QueueActions businessId={(_a = business === null || business === void 0 ? void 0 : business.id) !== null && _a !== void 0 ? _a : null} itemId={item.id} content={item.content} title={(_b = item.title) !== null && _b !== void 0 ? _b : undefined} status={item.status} variant="item"/>
              </card_1.CardContent>
            </card_1.Card>);
                                })}
        </div>)}
    </div>)];
            }
        });
    });
}
function StatusBadge(_a) {
    var status = _a.status;
    if (status === 'posted') {
        return (<badge_1.Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
        ✅ Posted
      </badge_1.Badge>);
    }
    if (status === 'ready') {
        return (<badge_1.Badge className="bg-yellow-500/20 text-[#FFD700] border-yellow-500/30 text-xs">
        🟡 Ready
      </badge_1.Badge>);
    }
    return (<badge_1.Badge className="bg-white/10 text-white/50 border-white/10 text-xs">
      Draft
    </badge_1.Badge>);
}
