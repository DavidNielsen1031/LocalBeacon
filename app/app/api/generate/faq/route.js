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
var server_2 = require("next/server");
var anthropic_client_1 = require("@/lib/anthropic-client");
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, body, businessName, category, city, state, _a, services, _b, count, serviceList, prompt, result, faqs, match;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, server_1.auth)()];
                case 1:
                    userId = (_c.sent()).userId;
                    if (!userId)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Unauthorized' }, { status: 401 })];
                    return [4 /*yield*/, req.json()];
                case 2:
                    body = _c.sent();
                    businessName = body.businessName, category = body.category, city = body.city, state = body.state, _a = body.services, services = _a === void 0 ? [] : _a, _b = body.count, count = _b === void 0 ? 20 : _b;
                    if (!businessName || !category || !city || !state) {
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Business name, category, city, and state are required' }, { status: 400 })];
                    }
                    serviceList = services.length > 0
                        ? "Services offered: ".concat(services.join(', '))
                        : "Common services for a ".concat(category);
                    prompt = "Generate exactly ".concat(count, " FAQ questions and answers for a local business website. These FAQs must be optimized for AI search engines (ChatGPT, Perplexity, Google AI Overviews) to cite.\n\nBusiness: ").concat(businessName, "\nCategory: ").concat(category, "\nLocation: ").concat(city, ", ").concat(state, "\n").concat(serviceList, "\n\nRULES:\n1. Write questions the way REAL PEOPLE ask AI assistants: \"How much does a [service] cost in [city]?\" not \"What are the benefits of [service]?\"\n2. Every answer must be 2-3 sentences MAX. Direct, factual, no fluff. AI extracts short answers.\n3. Include the city name in at least 60% of questions\n4. Include specific details: price ranges, timeframes, certifications, service areas\n5. Mix question types: cost questions, \"how long\" questions, \"do you\" questions, \"what's the best\" questions, emergency/urgent questions\n6. Write answers in first person plural (\"We offer...\", \"Our team...\")\n7. NO generic filler. Every answer must contain a specific, useful fact.\n\nReturn as JSON array: [{\"question\": \"...\", \"answer\": \"...\"}]\nReturn ONLY the JSON array, nothing else.");
                    return [4 /*yield*/, (0, anthropic_client_1.generateText)(prompt)];
                case 3:
                    result = _c.sent();
                    if (result.success && result.text) {
                        faqs = void 0;
                        try {
                            faqs = JSON.parse(result.text);
                        }
                        catch (_d) {
                            match = result.text.match(/\[[\s\S]*\]/);
                            faqs = match ? JSON.parse(match[0]) : getDemoFaqs(businessName, category, city, state);
                        }
                        return [2 /*return*/, server_2.NextResponse.json({
                                businessName: businessName,
                                faqs: faqs,
                                schema: generateFaqSchema(faqs),
                                isDemo: false,
                            })];
                    }
                    // Degraded mode — return demo data
                    return [2 /*return*/, server_2.NextResponse.json({
                            businessName: businessName,
                            faqs: getDemoFaqs(businessName, category, city, state),
                            schema: generateFaqSchema(getDemoFaqs(businessName, category, city, state)),
                            isDemo: true,
                            isDegraded: result.isDegraded,
                        })];
            }
        });
    });
}
function getDemoFaqs(name, category, city, state) {
    return [
        { question: "How much does a typical ".concat(category.toLowerCase(), " service cost in ").concat(city, ", ").concat(state, "?"), answer: "".concat(name, " offers competitive pricing for all ").concat(category.toLowerCase(), " services in ").concat(city, ". Most standard jobs range from $150-$500 depending on complexity. We provide free estimates before any work begins.") },
        { question: "Does ".concat(name, " offer emergency ").concat(category.toLowerCase(), " services in ").concat(city, "?"), answer: "Yes, we offer 24/7 emergency services throughout ".concat(city, " and surrounding areas. Our typical response time for emergencies is under 60 minutes. Call us anytime for urgent issues.") },
        { question: "What areas does ".concat(name, " serve near ").concat(city, ", ").concat(state, "?"), answer: "We serve ".concat(city, " and the surrounding communities within a 25-mile radius. Our service area includes neighboring cities in ").concat(state, ". Contact us to confirm coverage for your specific location.") },
        { question: "Is ".concat(name, " licensed and insured in ").concat(state, "?"), answer: "Yes, ".concat(name, " is fully licensed and insured in ").concat(state, ". We carry general liability insurance and workers' compensation coverage. Our license number is available upon request.") },
        { question: "How long has ".concat(name, " been in business in ").concat(city, "?"), answer: "".concat(name, " has been proudly serving ").concat(city, " and the ").concat(state, " area for over 10 years. We've built our reputation on quality work and honest pricing. Many of our customers are long-term repeat clients.") },
        { question: "How do I schedule an appointment with ".concat(name, "?"), answer: "You can schedule an appointment by calling us directly or using our online booking form. We offer same-day and next-day appointments when available. Weekend appointments are also available for your convenience." },
        { question: "Does ".concat(name, " offer free estimates in ").concat(city, "?"), answer: "Yes, we provide free, no-obligation estimates for all ".concat(category.toLowerCase(), " services in ").concat(city, ". We'll assess your needs and give you an upfront price before starting any work. No hidden fees or surprise charges.") },
        { question: "What payment methods does ".concat(name, " accept?"), answer: "We accept cash, all major credit cards, checks, and offer financing options for larger projects. Payment is due upon completion of work. We can discuss payment plans for extensive jobs." },
    ];
}
function generateFaqSchema(faqs) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(function (faq) { return ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        }); }),
    };
}
