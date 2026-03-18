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
var server_1 = require("@clerk/nextjs/server");
var anthropic_client_1 = require("@/lib/anthropic-client");
var prompt_context_1 = require("@/lib/prompt-context");
var server_2 = require("next/server");
var mockResponses = {
    5: function (name, biz) { return "Thank you so much, ".concat(name, "! We're thrilled you had a great experience with ").concat(biz, ". Your kind words mean everything to our team \u2014 we'll make sure they hear about this. We look forward to serving you again!"); },
    4: function (name, biz) { return "Thank you for the kind words, ".concat(name, "! We're glad ").concat(biz, " could help. We'd love to earn that 5th star next time \u2014 don't hesitate to reach out if there's anything we can do better!"); },
    3: function (name, biz) { return "Thank you for taking the time to share your experience, ".concat(name, ". We always strive to improve at ").concat(biz, " and appreciate your honest feedback. Please feel free to reach out directly so we can make it right."); },
    2: function (name, biz) { return "Thank you for your feedback, ".concat(name, ". We're sorry your experience with ").concat(biz, " didn't meet expectations. Please reach out to us directly \u2014 we take every concern seriously and want to make this right for you."); },
    1: function (name, biz) { return "Thank you for your feedback, ".concat(name, ". We sincerely apologize that your experience with ").concat(biz, " fell short. Please contact us directly so we can address your concerns \u2014 this is not the standard we hold ourselves to."); },
};
var toneGuide = {
    5: 'warm, genuinely grateful, personal — reference a specific detail from their review if possible',
    4: 'grateful and positive, acknowledge what went well, subtly invite them to return',
    3: 'professional and empathetic, acknowledge concern, offer to improve, invite direct contact',
    2: 'calm and professional, empathetic, take the conversation offline (invite direct contact)',
    1: 'calm, professional, empathetic — never defensive, offer to resolve it directly',
};
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, body, _a, business_name, _b, reviewer_name, _c, rating, _d, review_text, _e, business_category, bizCtx, contextBlock, effectiveName, effectiveCategory, prompt, result, fn;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, (0, server_1.auth)()];
                case 1:
                    userId = (_f.sent()).userId;
                    if (!userId)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Unauthorized' }, { status: 401 })];
                    return [4 /*yield*/, req.json()];
                case 2:
                    body = _f.sent();
                    _a = body.business_name, business_name = _a === void 0 ? 'Our Business' : _a, _b = body.reviewer_name, reviewer_name = _b === void 0 ? 'Customer' : _b, _c = body.rating, rating = _c === void 0 ? 5 : _c, _d = body.review_text, review_text = _d === void 0 ? '' : _d, _e = body.business_category, business_category = _e === void 0 ? '' : _e;
                    return [4 /*yield*/, (0, prompt_context_1.getBusinessContext)(userId)];
                case 3:
                    bizCtx = _f.sent();
                    contextBlock = bizCtx
                        ? "You are writing content for the following business:\n".concat((0, prompt_context_1.buildPromptContext)(bizCtx), "\n\n")
                        : '';
                    effectiveName = (bizCtx === null || bizCtx === void 0 ? void 0 : bizCtx.name) || business_name;
                    effectiveCategory = (bizCtx === null || bizCtx === void 0 ? void 0 : bizCtx.category) || business_category;
                    prompt = "".concat(contextBlock, "Write a Google review response for this local business.\n\nBusiness: ").concat(effectiveName).concat(effectiveCategory ? " (".concat(effectiveCategory, ")") : '', "\nReviewer: ").concat(reviewer_name, "\nRating: ").concat(rating, "/5 stars\nReview: \"").concat(review_text, "\"\n\nTone: ").concat(toneGuide[rating] || toneGuide[3], "\n\nRules:\n- Max 150 words\n- Mention the business name once\n- NEVER say \"we value your feedback\" \u2014 hollow and generic\n- NEVER be defensive\n- For 1-2 stars: invite direct contact to resolve\n- Sound human, not corporate\n- Vary the opening (don't start with \"Thank you for your review\")\n\nReturn only the response text.");
                    return [4 /*yield*/, (0, anthropic_client_1.generateText)(prompt, { maxTokens: 250 })];
                case 4:
                    result = _f.sent();
                    if (result.success && result.text) {
                        return [2 /*return*/, server_2.NextResponse.json({ response: result.text.trim(), isDegraded: false })];
                    }
                    fn = mockResponses[rating] || mockResponses[3];
                    return [2 /*return*/, server_2.NextResponse.json({ response: fn(reviewer_name, effectiveName), isDegraded: result.isDegraded })];
            }
        });
    });
}
