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
var plan_limits_1 = require("@/lib/plan-limits");
var prompt_context_1 = require("@/lib/prompt-context");
var server_2 = require("next/server");
function mockPage(businessName, category, city, phone) {
    return {
        html: "<h1>".concat(category, " in ").concat(city, " | ").concat(businessName, "</h1>\n<!-- META: Professional ").concat(category.toLowerCase(), " services in ").concat(city, ". ").concat(businessName, " serves all of ").concat(city, " and surrounding areas. Call ").concat(phone || 'today', " for a free estimate. -->\n\n<p>When you need dependable ").concat(category.toLowerCase(), " services in ").concat(city, ", ").concat(businessName, " is the team locals trust. We've built our reputation on honest work, fair pricing, and showing up when we say we will.</p>\n\n<h2>Our ").concat(category, " Services in ").concat(city, "</h2>\n<ul>\n  <li>Emergency repairs and same-day service</li>\n  <li>Routine maintenance and inspections</li>\n  <li>New installations and upgrades</li>\n  <li>Free estimates and consultations</li>\n</ul>\n\n<h2>Why ").concat(city, " Residents Choose ").concat(businessName, "</h2>\n<ul>\n  <li>Licensed, insured, and background-checked professionals</li>\n  <li>Transparent pricing \u2014 no surprise fees</li>\n  <li>Fast response times across all of ").concat(city, "</li>\n</ul>\n\n<h2>Serving All of ").concat(city, "</h2>\n<p>We proudly serve homeowners and businesses throughout ").concat(city, " and the surrounding area. No matter where you are in ").concat(city, ", our team can be there quickly.</p>\n\n<h2>Frequently Asked Questions</h2>\n\n<h3>How quickly can you respond to calls in ").concat(city, "?</h3>\n<p>We offer same-day service for most ").concat(city, " customers, with emergency response available 24/7 for urgent situations.</p>\n\n<h3>Are you licensed and insured to work in ").concat(city, "?</h3>\n<p>Yes \u2014 ").concat(businessName, " is fully licensed and insured, meeting all local requirements for ").concat(category.toLowerCase(), " work in ").concat(city, ".</p>\n\n<h3>Do you offer free estimates for ").concat(city, " customers?</h3>\n<p>Absolutely. We provide free, no-obligation estimates for all ").concat(category.toLowerCase(), " projects in ").concat(city, " and surrounding areas.</p>\n\n<script type=\"application/ld+json\">\n{\n  \"@context\": \"https://schema.org\",\n  \"@graph\": [\n    {\n      \"@type\": \"LocalBusiness\",\n      \"name\": \"").concat(businessName, "\",\n      \"telephone\": \"").concat(phone || '', "\",\n      \"areaServed\": \"").concat(city, "\"\n    },\n    {\n      \"@type\": \"FAQPage\",\n      \"mainEntity\": [\n        {\n          \"@type\": \"Question\",\n          \"name\": \"How quickly can you respond to calls in ").concat(city, "?\",\n          \"acceptedAnswer\": {\n            \"@type\": \"Answer\",\n            \"text\": \"We offer same-day service for most ").concat(city, " customers, with emergency response available 24/7 for urgent situations.\"\n          }\n        },\n        {\n          \"@type\": \"Question\",\n          \"name\": \"Are you licensed and insured to work in ").concat(city, "?\",\n          \"acceptedAnswer\": {\n            \"@type\": \"Answer\",\n            \"text\": \"").concat(businessName, " is fully licensed and insured, meeting all local requirements for ").concat(category.toLowerCase(), " work in ").concat(city, ".\"\n          }\n        },\n        {\n          \"@type\": \"Question\",\n          \"name\": \"Do you offer free estimates for ").concat(city, " customers?\",\n          \"acceptedAnswer\": {\n            \"@type\": \"Answer\",\n            \"text\": \"We provide free, no-obligation estimates for all ").concat(category.toLowerCase(), " projects in ").concat(city, " and surrounding areas.\"\n          }\n        }\n      ]\n    }\n  ]\n}\n</script>\n\n<div class=\"cta\">\n  <p>Ready to get started? Call us today: <strong>").concat(phone || 'Contact Us', "</strong></p>\n</div>"),
        title: "".concat(category, " in ").concat(city),
        word_count: 280,
    };
}
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, limitError, body, business_id, target_city, _a, business_name, _b, business_category, _c, primary_city, _d, phone, bizCtx, contextBlock, effectiveName, effectiveCategory, effectiveHQ, prompt, result, html, wordCount, supabase;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, (0, server_1.auth)()];
                case 1:
                    userId = (_e.sent()).userId;
                    if (!userId)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
                            // Check plan limits
                        ];
                    return [4 /*yield*/, (0, plan_limits_1.enforceLimits)(userId, 'city_page')];
                case 2:
                    limitError = _e.sent();
                    if (limitError)
                        return [2 /*return*/, server_2.NextResponse.json(limitError, { status: 403 })];
                    return [4 /*yield*/, req.json()];
                case 3:
                    body = _e.sent();
                    business_id = body.business_id, target_city = body.target_city, _a = body.business_name, business_name = _a === void 0 ? 'Your Business' : _a, _b = body.business_category, business_category = _b === void 0 ? 'Service Provider' : _b, _c = body.primary_city, primary_city = _c === void 0 ? '' : _c, _d = body.phone, phone = _d === void 0 ? '' : _d;
                    if (!target_city)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'target_city is required' }, { status: 400 })
                            // Enrich prompt with business context from Settings if available
                        ];
                    return [4 /*yield*/, (0, prompt_context_1.getBusinessContext)(userId)];
                case 4:
                    bizCtx = _e.sent();
                    contextBlock = bizCtx
                        ? "You are writing content for the following business:\n".concat((0, prompt_context_1.buildPromptContext)(bizCtx), "\n\n")
                        : '';
                    effectiveName = (bizCtx === null || bizCtx === void 0 ? void 0 : bizCtx.name) || business_name;
                    effectiveCategory = (bizCtx === null || bizCtx === void 0 ? void 0 : bizCtx.category) || business_category;
                    effectiveHQ = (bizCtx === null || bizCtx === void 0 ? void 0 : bizCtx.primary_city) || primary_city;
                    prompt = "".concat(contextBlock, "Generate a complete service area landing page for a local business targeting \"").concat(effectiveCategory, " in ").concat(target_city, "\" searches.\n\nBusiness: ").concat(effectiveName, "\nCategory: ").concat(effectiveCategory, "\nTarget city: ").concat(target_city, "\nHQ city: ").concat(effectiveHQ, "\nPhone: ").concat(phone || 'Contact us', "\n\nGenerate HTML body content (not a full HTML page, just the content) with:\n1. H1: \"[Category] in [City] | [Business Name]\"\n2. HTML comment with meta description: <!-- META: 155 chars max, city+service+phone -->\n3. Intro paragraph (80-100 words, city-specific references, professional tone)\n4. H2 \"Our [Category] Services in [City]\" with 4 list items\n5. H2 \"Why [City] Residents Choose [Business Name]\" with 3 differentiators\n6. H2 \"Serving All of [City]\" paragraph about area coverage\n7. H2 \"Frequently Asked Questions\" with exactly 3 Q&As:\n   <h3>[Question about ").concat(target_city, "?]</h3>\n   <p>[Direct 20-25 word answer. Self-contained. No links.]</p>\n8. JSON-LD script tag with LocalBusiness + FAQPage schema\n9. CTA div with phone/contact\n\nCRITICAL: Content must be unique to ").concat(target_city, ". AEO-optimized FAQ answers (self-contained, 20-25 words each).\n\nReturn only HTML content.");
                    return [4 /*yield*/, (0, anthropic_client_1.generateText)(prompt, { maxTokens: 2000 })];
                case 5:
                    result = _e.sent();
                    if (!result.success || !result.text) {
                        return [2 /*return*/, server_2.NextResponse.json(__assign(__assign({}, mockPage(effectiveName, effectiveCategory, target_city, phone)), { isDegraded: result.isDegraded }))];
                    }
                    html = result.text;
                    wordCount = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
                    if (!business_id) return [3 /*break*/, 7];
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase) return [3 /*break*/, 7];
                    return [4 /*yield*/, supabase.from('content_items').insert({
                            business_id: business_id,
                            type: 'service_page',
                            status: 'draft',
                            title: "".concat(effectiveCategory, " in ").concat(target_city),
                            body: html,
                            metadata: { target_city: target_city, word_count: wordCount },
                        })];
                case 6:
                    _e.sent();
                    _e.label = 7;
                case 7: return [2 /*return*/, server_2.NextResponse.json({ html: html, title: "".concat(effectiveCategory, " in ").concat(target_city), word_count: wordCount })];
            }
        });
    });
}
