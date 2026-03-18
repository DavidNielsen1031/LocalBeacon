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
exports.POST = POST;
exports.dynamic = 'force-dynamic';
var supabase_1 = require("@/lib/supabase");
var email_1 = require("@/lib/email");
var server_1 = require("next/server");
/**
 * Send monthly content summary emails to all users.
 * Called by OpenClaw cron on 1st of each month 9 AM CST.
 */
function POST() {
    return __awaiter(this, void 0, void 0, function () {
        var supabase, now, lastMonth, lastMonthEnd, monthName, businesses, sent, errors, _i, businesses_1, business, user, email, postsCount, pagesCount, reviewsCount, aeoScan, result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: 'Database not configured' }, { status: 503 })];
                    }
                    now = new Date();
                    lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                    lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
                    monthName = lastMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                    return [4 /*yield*/, supabase
                            .from('businesses')
                            .select('id, name, user_id, users!inner(clerk_id, email)')];
                case 1:
                    businesses = (_b.sent()).data;
                    if (!businesses || businesses.length === 0) {
                        return [2 /*return*/, server_1.NextResponse.json({ sent: 0, message: 'No businesses found' })];
                    }
                    sent = 0;
                    errors = [];
                    _i = 0, businesses_1 = businesses;
                    _b.label = 2;
                case 2:
                    if (!(_i < businesses_1.length)) return [3 /*break*/, 9];
                    business = businesses_1[_i];
                    user = business.users;
                    email = user === null || user === void 0 ? void 0 : user.email;
                    if (!email)
                        return [3 /*break*/, 8];
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', business.id)
                            .eq('type', 'gbp_post')
                            .gte('created_at', lastMonth.toISOString())
                            .lte('created_at', lastMonthEnd.toISOString())];
                case 3:
                    postsCount = (_b.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', business.id)
                            .eq('type', 'city_page')
                            .gte('created_at', lastMonth.toISOString())
                            .lte('created_at', lastMonthEnd.toISOString())];
                case 4:
                    pagesCount = (_b.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', business.id)
                            .eq('type', 'review_reply')
                            .gte('created_at', lastMonth.toISOString())
                            .lte('created_at', lastMonthEnd.toISOString())
                        // Get latest AEO scan
                    ];
                case 5:
                    reviewsCount = (_b.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('aeo_scans')
                            .select('score')
                            .eq('business_id', business.id)
                            .order('scanned_at', { ascending: false })
                            .limit(1)
                            .single()];
                case 6:
                    aeoScan = (_b.sent()).data;
                    return [4 /*yield*/, (0, email_1.sendMonthlyReportEmail)({
                            to: email,
                            businessName: business.name || 'Your Business',
                            postsGenerated: postsCount !== null && postsCount !== void 0 ? postsCount : 0,
                            pagesCreated: pagesCount !== null && pagesCount !== void 0 ? pagesCount : 0,
                            reviewsReplied: reviewsCount !== null && reviewsCount !== void 0 ? reviewsCount : 0,
                            aeoScore: (_a = aeoScan === null || aeoScan === void 0 ? void 0 : aeoScan.score) !== null && _a !== void 0 ? _a : null,
                            dashboardUrl: 'https://localbeacon.ai',
                            month: monthName,
                        })];
                case 7:
                    result = _b.sent();
                    if (result.success) {
                        sent++;
                    }
                    else {
                        errors.push("".concat(email, ": ").concat(result.error));
                    }
                    _b.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 2];
                case 9: return [2 /*return*/, server_1.NextResponse.json({ sent: sent, total: businesses.length, month: monthName, errors: errors })];
            }
        });
    });
}
