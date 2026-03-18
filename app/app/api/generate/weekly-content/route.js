"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var server_1 = require("@clerk/nextjs/server");
var anthropic_client_1 = require("@/lib/anthropic-client");
var supabase_1 = require("@/lib/supabase");
var prompt_context_1 = require("@/lib/prompt-context");
var server_2 = require("next/server");
function getNextMonday9AMCST() {
    var now = new Date();
    // Convert to CST (UTC-6 standard, UTC-5 daylight)
    var cstOffset = -6 * 60; // use standard time offset
    var utcMs = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    var cstMs = utcMs + cstOffset * 60 * 1000;
    var cstNow = new Date(cstMs);
    // Find next Monday
    var dayOfWeek = cstNow.getDay(); // 0=Sun, 1=Mon, ...
    var daysUntilMonday = dayOfWeek === 1 ? 7 : (8 - dayOfWeek) % 7 || 7;
    var nextMonday = new Date(cstNow);
    nextMonday.setDate(cstNow.getDate() + daysUntilMonday);
    nextMonday.setHours(9, 0, 0, 0);
    // Convert back to UTC for storage
    var utcNextMonday = new Date(nextMonday.getTime() - cstOffset * 60 * 1000);
    return utcNextMonday;
}
function mockWeeklyPost(businessName, category, city) {
    return {
        title: "".concat(businessName, " \u2014 Your Trusted ").concat(category, " in ").concat(city),
        content: "This week at ".concat(businessName, ", we're focused on serving ").concat(city, " with reliable ").concat(category.toLowerCase(), " services.\n\nWhether you need a quick check-up or a full service, our team is ready to help \u2014 fast, affordable, and friendly.\n\n\u2705 Licensed & fully insured\n\u2705 Same-day appointments available\n\u2705 Serving ").concat(city, " and surrounding areas"),
    };
}
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, body, business_id, supabase, _a, business, bizError, businessName, category, city, bizCtx, contextBlock, prompt, aiResult, post, jsonMatch, scheduledFor, _b, inserted, insertError;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, (0, server_1.auth)()];
                case 1:
                    userId = (_d.sent()).userId;
                    if (!userId)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Unauthorized' }, { status: 401 })];
                    return [4 /*yield*/, req.json()];
                case 2:
                    body = _d.sent();
                    business_id = body.business_id;
                    if (!business_id) {
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'business_id is required' }, { status: 400 })];
                    }
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Database not configured' }, { status: 503 })
                            // Fetch business
                        ];
                    return [4 /*yield*/, supabase
                            .from('businesses')
                            .select('id, name, category, primary_city')
                            .eq('id', business_id)
                            .single()];
                case 3:
                    _a = _d.sent(), business = _a.data, bizError = _a.error;
                    if (bizError || !business) {
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Business not found' }, { status: 404 })];
                    }
                    businessName = business.name || 'Your Business';
                    category = business.category || 'Service Provider';
                    city = business.primary_city || 'Your City';
                    return [4 /*yield*/, (0, prompt_context_1.getBusinessContext)(userId)];
                case 4:
                    bizCtx = _d.sent();
                    contextBlock = bizCtx
                        ? "You are writing content for the following business:\n".concat((0, prompt_context_1.buildPromptContext)(bizCtx), "\n\n")
                        : '';
                    prompt = "".concat(contextBlock, "Generate a Google Business Profile post for the upcoming week.\n\nBusiness: ").concat((bizCtx === null || bizCtx === void 0 ? void 0 : bizCtx.name) || businessName, "\nCategory: ").concat((bizCtx === null || bizCtx === void 0 ? void 0 : bizCtx.category) || category, "\nCity: ").concat((bizCtx === null || bizCtx === void 0 ? void 0 : bizCtx.primary_city) || city, "\n").concat(((_c = bizCtx === null || bizCtx === void 0 ? void 0 : bizCtx.specialties) === null || _c === void 0 ? void 0 : _c.length) ? "Specialties: ".concat(bizCtx.specialties.join(', ')) : '', "\n\nRequirements:\n- Title: max 58 characters, upbeat, mentions the city or a key service\n- Content: 150-200 words, friendly and professional\n- Reference the current week and local community\n- Include 3 \u2705 bullet points listing key benefits\n- End with a clear call to action (call, book, or visit)\n\nRespond in JSON only:\n{\"title\":\"...\",\"content\":\"...\"}");
                    return [4 /*yield*/, (0, anthropic_client_1.generateText)(prompt, { maxTokens: 500 })];
                case 5:
                    aiResult = _d.sent();
                    if (aiResult.success && aiResult.text) {
                        try {
                            jsonMatch = aiResult.text.match(/\{[\s\S]*\}/);
                            post = jsonMatch ? JSON.parse(jsonMatch[0]) : mockWeeklyPost(businessName, category, city);
                        }
                        catch (_e) {
                            post = mockWeeklyPost(businessName, category, city);
                        }
                    }
                    else {
                        post = mockWeeklyPost(businessName, category, city);
                    }
                    scheduledFor = getNextMonday9AMCST();
                    return [4 /*yield*/, supabase
                            .from('content_queue')
                            .insert({
                            business_id: business_id,
                            type: 'gbp_post',
                            title: post.title,
                            content: post.content,
                            scheduled_for: scheduledFor.toISOString(),
                            status: 'ready',
                        })
                            .select()
                            .single()];
                case 6:
                    _b = _d.sent(), inserted = _b.data, insertError = _b.error;
                    if (insertError) {
                        console.error('content_queue insert error:', insertError);
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Failed to save post' }, { status: 500 })];
                    }
                    return [2 /*return*/, server_2.NextResponse.json(__assign(__assign({}, inserted), { isDegraded: aiResult.isDegraded }))];
            }
        });
    });
}
