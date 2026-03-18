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
var jspdf_1 = require("jspdf");
function GET(req) {
    return __awaiter(this, void 0, void 0, function () {
        // Helper: check if we need a new page
        function checkPageBreak(requiredSpace) {
            if (requiredSpace === void 0) { requiredSpace = 30; }
            if (y + requiredSpace > pageHeight - 30) {
                doc.addPage();
                y = 30;
            }
        }
        var userId, businessId, supabase, user, userPlan, business, now, startOfMonth, postsThisMonth, pagesThisMonth, reviewsThisMonth, totalPosts, totalPages, aeoScans, currentAeoScore, previousAeoScore, aeoTrend, latestPost, daysSinceLastPost, doc, pageWidth, pageHeight, margin, y, contentRows, _i, contentRows_1, _a, label, monthly, total, status_1, statusColor, recommendations, _b, recommendations_1, rec, pdfBuffer, filename;
        var _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, (0, server_1.auth)()];
                case 1:
                    userId = (_g.sent()).userId;
                    if (!userId)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Unauthorized' }, { status: 401 })];
                    businessId = req.nextUrl.searchParams.get('businessId');
                    if (!businessId)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'businessId required' }, { status: 400 })];
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Database not configured' }, { status: 503 })
                            // Verify ownership
                        ];
                    return [4 /*yield*/, supabase
                            .from('users')
                            .select('id, plan')
                            .eq('clerk_id', userId)
                            .single()];
                case 2:
                    user = (_g.sent()).data;
                    if (!user)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'User not found' }, { status: 404 })
                            // Plan gate: PDF reports require Solo+ plan
                        ];
                    userPlan = (user.plan || 'free').toLowerCase();
                    if (userPlan === 'free') {
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'PDF reports require a Solo or Agency plan.', upgrade_url: '/pricing' }, { status: 403 })];
                    }
                    return [4 /*yield*/, supabase
                            .from('businesses')
                            .select('*')
                            .eq('id', businessId)
                            .eq('user_id', user.id)
                            .single()];
                case 3:
                    business = (_g.sent()).data;
                    if (!business)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Business not found' }, { status: 404 })
                            // Gather report data
                        ];
                    now = new Date();
                    startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', businessId)
                            .eq('type', 'gbp_post')
                            .gte('created_at', startOfMonth.toISOString())];
                case 4:
                    postsThisMonth = (_g.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', businessId)
                            .eq('type', 'city_page')
                            .gte('created_at', startOfMonth.toISOString())];
                case 5:
                    pagesThisMonth = (_g.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', businessId)
                            .eq('type', 'review_reply')
                            .gte('created_at', startOfMonth.toISOString())
                        // Total counts
                    ];
                case 6:
                    reviewsThisMonth = (_g.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', businessId)
                            .eq('type', 'gbp_post')];
                case 7:
                    totalPosts = (_g.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('*', { count: 'exact', head: true })
                            .eq('business_id', businessId)
                            .eq('type', 'city_page')
                        // AEO score
                    ];
                case 8:
                    totalPages = (_g.sent()).count;
                    return [4 /*yield*/, supabase
                            .from('aeo_scans')
                            .select('score, scanned_at')
                            .eq('business_id', businessId)
                            .order('scanned_at', { ascending: false })
                            .limit(2)];
                case 9:
                    aeoScans = (_g.sent()).data;
                    currentAeoScore = (_d = (_c = aeoScans === null || aeoScans === void 0 ? void 0 : aeoScans[0]) === null || _c === void 0 ? void 0 : _c.score) !== null && _d !== void 0 ? _d : null;
                    previousAeoScore = (_f = (_e = aeoScans === null || aeoScans === void 0 ? void 0 : aeoScans[1]) === null || _e === void 0 ? void 0 : _e.score) !== null && _f !== void 0 ? _f : null;
                    aeoTrend = currentAeoScore !== null && previousAeoScore !== null
                        ? currentAeoScore - previousAeoScore
                        : null;
                    return [4 /*yield*/, supabase
                            .from('content_items')
                            .select('created_at')
                            .eq('business_id', businessId)
                            .eq('type', 'gbp_post')
                            .order('created_at', { ascending: false })
                            .limit(1)];
                case 10:
                    latestPost = (_g.sent()).data;
                    daysSinceLastPost = (latestPost === null || latestPost === void 0 ? void 0 : latestPost[0])
                        ? Math.floor((Date.now() - new Date(latestPost[0].created_at).getTime()) / (1000 * 60 * 60 * 24))
                        : null;
                    doc = new jspdf_1.jsPDF();
                    pageWidth = doc.internal.pageSize.getWidth();
                    pageHeight = doc.internal.pageSize.getHeight();
                    margin = 20;
                    y = 30;
                    // Header
                    doc.setFontSize(22);
                    doc.setTextColor(27, 42, 74); // NAVY
                    doc.text(business.name, margin, y);
                    y += 10;
                    doc.setFontSize(10);
                    doc.setTextColor(99, 110, 114); // SLATE
                    doc.text("".concat(business.primary_city, ", ").concat(business.primary_state), margin, y);
                    y += 6;
                    doc.text("Report generated: ".concat(now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })), margin, y);
                    y += 4;
                    // Separator
                    doc.setDrawColor(223, 230, 233); // MIST
                    doc.setLineWidth(0.5);
                    doc.line(margin, y + 4, pageWidth - margin, y + 4);
                    y += 14;
                    // Content Summary Section
                    checkPageBreak(60);
                    doc.setFontSize(14);
                    doc.setTextColor(27, 42, 74);
                    doc.text('Content Summary', margin, y);
                    y += 10;
                    doc.setFontSize(11);
                    doc.setTextColor(45, 52, 54); // CHARCOAL
                    contentRows = [
                        ['Google Post Drafts', "".concat(postsThisMonth !== null && postsThisMonth !== void 0 ? postsThisMonth : 0, " this month"), "".concat(totalPosts !== null && totalPosts !== void 0 ? totalPosts : 0, " total")],
                        ['City Pages', "".concat(pagesThisMonth !== null && pagesThisMonth !== void 0 ? pagesThisMonth : 0, " this month"), "".concat(totalPages !== null && totalPages !== void 0 ? totalPages : 0, " total")],
                        ['Review Replies', "".concat(reviewsThisMonth !== null && reviewsThisMonth !== void 0 ? reviewsThisMonth : 0, " this month"), ''],
                    ];
                    for (_i = 0, contentRows_1 = contentRows; _i < contentRows_1.length; _i++) {
                        _a = contentRows_1[_i], label = _a[0], monthly = _a[1], total = _a[2];
                        doc.setTextColor(99, 110, 114);
                        doc.text(label, margin, y);
                        doc.setTextColor(45, 52, 54);
                        doc.text(monthly, margin + 70, y);
                        if (total)
                            doc.text(total, margin + 120, y);
                        y += 8;
                    }
                    y += 6;
                    // AI Readiness Score
                    checkPageBreak(40);
                    doc.setFontSize(14);
                    doc.setTextColor(27, 42, 74);
                    doc.text('AI Readiness Score', margin, y);
                    y += 10;
                    if (currentAeoScore !== null) {
                        doc.setFontSize(28);
                        doc.setTextColor(255, 107, 53); // ORANGE
                        doc.text("".concat(currentAeoScore, "/100"), margin, y);
                        if (aeoTrend !== null) {
                            doc.setFontSize(12);
                            doc.setTextColor(aeoTrend >= 0 ? 0 : 192, aeoTrend >= 0 ? 184 : 57, aeoTrend >= 0 ? 148 : 43);
                            doc.text("".concat(aeoTrend >= 0 ? '+' : '').concat(aeoTrend, " from previous scan"), margin + 50, y);
                        }
                        y += 12;
                    }
                    else {
                        doc.setFontSize(11);
                        doc.setTextColor(99, 110, 114);
                        doc.text('No AI Readiness scan yet — run one from the dashboard.', margin, y);
                        y += 10;
                    }
                    // Content Freshness
                    checkPageBreak(30);
                    y += 4;
                    doc.setFontSize(14);
                    doc.setTextColor(27, 42, 74);
                    doc.text('Content Freshness', margin, y);
                    y += 10;
                    doc.setFontSize(11);
                    if (daysSinceLastPost !== null) {
                        status_1 = daysSinceLastPost <= 7 ? 'Fresh' : daysSinceLastPost <= 14 ? 'Getting Stale' : 'Needs Attention';
                        statusColor = daysSinceLastPost <= 7 ? [0, 184, 148] : daysSinceLastPost <= 14 ? [255, 165, 0] : [225, 112, 85];
                        doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
                        doc.text("".concat(status_1, " \u2014 Last post ").concat(daysSinceLastPost, " day").concat(daysSinceLastPost === 1 ? '' : 's', " ago"), margin, y);
                    }
                    else {
                        doc.setTextColor(99, 110, 114);
                        doc.text('No posts yet — generate your first post from the dashboard.', margin, y);
                    }
                    y += 12;
                    // Recommendations
                    checkPageBreak(40);
                    y += 4;
                    doc.setFontSize(14);
                    doc.setTextColor(27, 42, 74);
                    doc.text('Recommendations', margin, y);
                    y += 10;
                    doc.setFontSize(10);
                    doc.setTextColor(45, 52, 54);
                    recommendations = [];
                    if (daysSinceLastPost === null || daysSinceLastPost > 7) {
                        recommendations.push('Post to Google weekly to keep your listing active and ranking higher.');
                    }
                    if (currentAeoScore === null) {
                        recommendations.push('Run an AI Readiness scan to see how visible you are to ChatGPT and Google AI.');
                    }
                    else if (currentAeoScore < 70) {
                        recommendations.push('Your AI Readiness score is below 70. Check the recommendations on your dashboard.');
                    }
                    if ((totalPages !== null && totalPages !== void 0 ? totalPages : 0) < 3) {
                        recommendations.push('Build more city pages to appear in search results for the areas you serve.');
                    }
                    if (recommendations.length === 0) {
                        recommendations.push('Keep posting weekly and monitoring your AI Readiness score!');
                    }
                    for (_b = 0, recommendations_1 = recommendations; _b < recommendations_1.length; _b++) {
                        rec = recommendations_1[_b];
                        checkPageBreak(16);
                        doc.text("\u2022 ".concat(rec), margin, y, { maxWidth: pageWidth - margin * 2 });
                        y += 8;
                    }
                    // Footer
                    y = doc.internal.pageSize.getHeight() - 20;
                    doc.setFontSize(8);
                    doc.setTextColor(99, 110, 114);
                    doc.text('Powered by LocalBeacon.ai — More calls. Less work.', margin, y);
                    doc.text("\u00A9 ".concat(now.getFullYear(), " LocalBeacon"), pageWidth - margin - 50, y);
                    pdfBuffer = Buffer.from(doc.output('arraybuffer'));
                    filename = "".concat(business.name.replace(/[^a-zA-Z0-9]/g, '-'), "-Report-").concat(now.toISOString().slice(0, 7), ".pdf");
                    return [2 /*return*/, new server_2.NextResponse(pdfBuffer, {
                            status: 200,
                            headers: {
                                'Content-Type': 'application/pdf',
                                'Content-Disposition': "attachment; filename=\"".concat(filename, "\""),
                            },
                        })];
            }
        });
    });
}
