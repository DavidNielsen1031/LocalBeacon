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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamic = void 0;
exports.POST = POST;
exports.dynamic = 'force-dynamic';
var server_1 = require("@clerk/nextjs/server");
var anthropic_client_1 = require("@/lib/anthropic-client");
var supabase_1 = require("@/lib/supabase");
var plan_limits_1 = require("@/lib/plan-limits");
var prompt_context_1 = require("@/lib/prompt-context");
var server_2 = require("next/server");
var postTypeDescriptions = {
    whats_new: "What's New post — share recent updates, seasonal availability, or a helpful tip",
    offer: 'Special offer or limited-time promotion',
    event: 'Local event or community involvement',
    product: 'Highlight a specific service you offer',
};
function mockPost(businessName, category, city) {
    return {
        title: "".concat(businessName, " \u2014 Trusted ").concat(category, " in ").concat(city),
        body: "Looking for a reliable ".concat(category.toLowerCase(), " in ").concat(city, "? ").concat(businessName, " has been proudly serving the ").concat(city, " community with professional, dependable service.\n\nWhether it's a routine check or an emergency call, our team is ready to help \u2014 fast.\n\n\u2705 Licensed & fully insured\n\u2705 Same-day service available\n\u2705 Transparent, upfront pricing"),
        call_to_action: 'CALL',
    };
}
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, limitError, body, business_id, _a, post_type, _b, business_name, _c, business_category, _d, primary_city, _e, service_areas, bizCtx, contextBlock, prompt, aiResult, result, jsonMatch, supabase;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, (0, server_1.auth)()];
                case 1:
                    userId = (_f.sent()).userId;
                    if (!userId)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
                            // Check plan limits
                        ];
                    return [4 /*yield*/, (0, plan_limits_1.enforceLimits)(userId, 'gbp_post')];
                case 2:
                    limitError = _f.sent();
                    if (limitError)
                        return [2 /*return*/, server_2.NextResponse.json(limitError, { status: 403 })];
                    return [4 /*yield*/, req.json()];
                case 3:
                    body = _f.sent();
                    business_id = body.business_id, _a = body.post_type, post_type = _a === void 0 ? 'whats_new' : _a, _b = body.business_name, business_name = _b === void 0 ? 'Your Business' : _b, _c = body.business_category, business_category = _c === void 0 ? 'Service Provider' : _c, _d = body.primary_city, primary_city = _d === void 0 ? 'Your City' : _d, _e = body.service_areas, service_areas = _e === void 0 ? [] : _e;
                    return [4 /*yield*/, (0, prompt_context_1.getBusinessContext)(userId)];
                case 4:
                    bizCtx = _f.sent();
                    contextBlock = bizCtx
                        ? "You are writing content for the following business:\n".concat((0, prompt_context_1.buildPromptContext)(bizCtx), "\n\n")
                        : '';
                    prompt = "".concat(contextBlock, "Generate a Google Business Profile post for this local business.\n\nBusiness: ").concat((bizCtx === null || bizCtx === void 0 ? void 0 : bizCtx.name) || business_name, "\nCategory: ").concat((bizCtx === null || bizCtx === void 0 ? void 0 : bizCtx.category) || business_category, "\nPrimary city: ").concat((bizCtx === null || bizCtx === void 0 ? void 0 : bizCtx.primary_city) || primary_city, "\nService areas: ").concat(bizCtx
                        ? __spreadArray([bizCtx.primary_city], bizCtx.service_areas, true).join(', ')
                        : __spreadArray([primary_city], service_areas, true).join(', '), "\nPost type: ").concat(postTypeDescriptions[post_type] || postTypeDescriptions.whats_new, "\n\nRequirements:\n- Title: max 58 characters, compelling, mentions city or service\n- Body: 150-250 words, professional but warm\n- Include: city name, specific service reference, clear CTA\n- End with 3 \u2705 bullet points (key benefits)\n- NOT generic \u2014 specific to this business and location\n- call_to_action: one of CALL, BOOK, LEARN_MORE, SIGN_UP\n\nRespond in JSON only:\n{\"title\":\"...\",\"body\":\"...\",\"call_to_action\":\"CALL\"}");
                    return [4 /*yield*/, (0, anthropic_client_1.generateText)(prompt, { maxTokens: 600 })];
                case 5:
                    aiResult = _f.sent();
                    if (aiResult.success && aiResult.text) {
                        try {
                            jsonMatch = aiResult.text.match(/\{[\s\S]*\}/);
                            result = jsonMatch ? JSON.parse(jsonMatch[0]) : mockPost(business_name, business_category, primary_city);
                        }
                        catch (_g) {
                            result = mockPost(business_name, business_category, primary_city);
                        }
                    }
                    else {
                        result = mockPost(business_name, business_category, primary_city);
                    }
                    if (!business_id) return [3 /*break*/, 7];
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase) return [3 /*break*/, 7];
                    return [4 /*yield*/, supabase.from('content_items').insert({
                            business_id: business_id,
                            type: 'gbp_post',
                            status: 'draft',
                            title: result.title,
                            body: result.body,
                            metadata: { post_type: post_type, call_to_action: result.call_to_action },
                        })];
                case 6:
                    _f.sent();
                    _f.label = 7;
                case 7: return [2 /*return*/, server_2.NextResponse.json(__assign(__assign({}, result), { isDegraded: aiResult.isDegraded }))];
            }
        });
    });
}
