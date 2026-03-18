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
exports.GET = GET;
exports.dynamic = 'force-dynamic';
var server_1 = require("next/server");
var supabase_1 = require("@/lib/supabase");
var aeo_rules_json_1 = require("@/lib/aeo-rules.json");
var AI_CRAWLERS = ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Amazonbot', 'cohere-ai'];
function getRule(id) {
    var rule = aeo_rules_json_1.default.rules.find(function (r) { return r.id === id; });
    if (!rule)
        throw new Error("Rule not found: ".concat(id));
    return rule;
}
function fetchWithRetry(url_1) {
    return __awaiter(this, arguments, void 0, function (url, timeoutMs, maxRetries) {
        var _loop_1, attempt, state_1;
        if (timeoutMs === void 0) { timeoutMs = 5000; }
        if (maxRetries === void 0) { maxRetries = 1; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function (attempt) {
                        var controller, timeout, res, err_1, msg;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    controller = new AbortController();
                                    timeout = setTimeout(function () { return controller.abort(); }, timeoutMs);
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 6, , 12]);
                                    return [4 /*yield*/, fetch(url, {
                                            signal: controller.signal,
                                            headers: { 'User-Agent': 'LocalBeacon-AEO-Checker/1.0' },
                                            redirect: 'follow',
                                        })];
                                case 2:
                                    res = _b.sent();
                                    clearTimeout(timeout);
                                    if (!(res.status >= 500)) return [3 /*break*/, 5];
                                    if (!(attempt < maxRetries)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1000); })];
                                case 3:
                                    _b.sent();
                                    return [2 /*return*/, "continue"];
                                case 4: return [2 /*return*/, { value: { response: res, errorType: 'http_5xx', statusCode: res.status } }];
                                case 5:
                                    if (res.status >= 400) {
                                        return [2 /*return*/, { value: { response: res, errorType: 'http_4xx', statusCode: res.status } }];
                                    }
                                    return [2 /*return*/, { value: { response: res, errorType: 'success', statusCode: res.status } }];
                                case 6:
                                    err_1 = _b.sent();
                                    clearTimeout(timeout);
                                    msg = err_1 instanceof Error ? err_1.message : '';
                                    if (!(msg.includes('abort') || msg.includes('timeout'))) return [3 /*break*/, 9];
                                    if (!(attempt < maxRetries)) return [3 /*break*/, 8];
                                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1000); })];
                                case 7:
                                    _b.sent();
                                    return [2 /*return*/, "continue"];
                                case 8: return [2 /*return*/, { value: { response: null, errorType: 'timeout' } }];
                                case 9:
                                    if (msg.includes('ENOTFOUND') || msg.includes('getaddrinfo') || msg.includes('DNS')) {
                                        return [2 /*return*/, { value: { response: null, errorType: 'dns_error' } }];
                                    }
                                    if (!(attempt < maxRetries)) return [3 /*break*/, 11];
                                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1000); })];
                                case 10:
                                    _b.sent();
                                    return [2 /*return*/, "continue"];
                                case 11: return [2 /*return*/, { value: { response: null, errorType: 'dns_error' } }];
                                case 12: return [2 /*return*/];
                            }
                        });
                    };
                    attempt = 0;
                    _a.label = 1;
                case 1:
                    if (!(attempt <= maxRetries)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(attempt)];
                case 2:
                    state_1 = _a.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    _a.label = 3;
                case 3:
                    attempt++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, { response: null, errorType: 'timeout' }];
            }
        });
    });
}
// --- Individual check functions ---
function checkLlmsTxt(baseUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var rule, _a, res, errorType, passed, body, _b, hasContent;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    rule = getRule('llms_txt');
                    return [4 /*yield*/, fetchWithRetry("".concat(baseUrl, "/llms.txt"))];
                case 1:
                    _a = _c.sent(), res = _a.response, errorType = _a.errorType;
                    passed = (res === null || res === void 0 ? void 0 : res.ok) === true;
                    if (!passed) return [3 /*break*/, 3];
                    return [4 /*yield*/, res.text().catch(function () { return ''; })];
                case 2:
                    _b = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _b = '';
                    _c.label = 4;
                case 4:
                    body = _b;
                    hasContent = body.length > 50;
                    return [2 /*return*/, __assign(__assign({}, rule), { passed: passed && hasContent, details: passed && hasContent
                                ? "Found llms.txt (".concat(body.length, " characters)")
                                : passed ? 'File exists but has very little content' : 'No llms.txt file found', errorType: passed && hasContent ? 'success' : errorType })];
            }
        });
    });
}
function checkRobotsTxt(baseUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var rule, res, body, blocked, lines, currentAgent, _i, lines_1, line, trimmed, _a, AI_CRAWLERS_1, crawler, uniqueBlocked, passed;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    rule = getRule('robots_txt');
                    return [4 /*yield*/, fetchWithRetry("".concat(baseUrl, "/robots.txt"))];
                case 1:
                    res = (_b.sent()).response;
                    if (!(res === null || res === void 0 ? void 0 : res.ok)) {
                        return [2 /*return*/, __assign(__assign({}, rule), { passed: true, details: 'No robots.txt found — all crawlers are allowed by default (this is fine)', errorType: 'success' })];
                    }
                    return [4 /*yield*/, res.text().catch(function () { return ''; })];
                case 2:
                    body = _b.sent();
                    blocked = [];
                    lines = body.split('\n');
                    currentAgent = '';
                    for (_i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                        line = lines_1[_i];
                        trimmed = line.trim().toLowerCase();
                        if (trimmed.startsWith('user-agent:')) {
                            currentAgent = trimmed.replace('user-agent:', '').trim();
                        }
                        if (trimmed.startsWith('disallow:') && trimmed.replace('disallow:', '').trim() === '/') {
                            for (_a = 0, AI_CRAWLERS_1 = AI_CRAWLERS; _a < AI_CRAWLERS_1.length; _a++) {
                                crawler = AI_CRAWLERS_1[_a];
                                if (currentAgent === crawler.toLowerCase() || currentAgent === '*') {
                                    blocked.push(crawler);
                                }
                            }
                        }
                    }
                    uniqueBlocked = __spreadArray([], new Set(blocked), true);
                    passed = uniqueBlocked.length === 0;
                    return [2 /*return*/, __assign(__assign({}, rule), { passed: passed, details: passed
                                ? 'All AI crawlers are allowed access'
                                : "Blocked: ".concat(uniqueBlocked.join(', ')), fix: passed ? '' : "Edit your robots.txt to remove blocks on: ".concat(uniqueBlocked.join(', '), ". These are the bots that power ChatGPT, Claude, and Perplexity search."), errorType: 'success' })];
            }
        });
    });
}
function checkSchemaMarkup(html) {
    return __awaiter(this, void 0, void 0, function () {
        var rule, hasLocalBusiness, hasOrgSchema, hasAnySchema;
        return __generator(this, function (_a) {
            rule = getRule('schema_markup');
            hasLocalBusiness = /LocalBusiness|Plumber|Electrician|Dentist|HVAC|Attorney|Roofing/i.test(html) && /application\/ld\+json/i.test(html);
            hasOrgSchema = /"@type"\s*:\s*"Organization"/i.test(html);
            hasAnySchema = /application\/ld\+json/i.test(html);
            return [2 /*return*/, __assign(__assign({}, rule), { passed: hasLocalBusiness || hasOrgSchema, details: hasLocalBusiness
                        ? 'LocalBusiness schema found — AI can read your business info'
                        : hasOrgSchema
                            ? 'Organization schema found (good, but LocalBusiness schema would be better)'
                            : hasAnySchema
                                ? 'Some schema found, but no business-specific schema'
                                : 'No schema markup found', errorType: 'success' })];
        });
    });
}
function checkFaqContent(html) {
    return __awaiter(this, void 0, void 0, function () {
        var rule, hasFaqSchema, hasFaqSection, questionCount;
        return __generator(this, function (_a) {
            rule = getRule('faq_content');
            hasFaqSchema = /FAQPage/i.test(html) && /application\/ld\+json/i.test(html);
            hasFaqSection = /<(h[1-6])[^>]*>.*?(faq|frequently asked|common questions)/i.test(html);
            questionCount = (html.match(/<(h[2-6])[^>]*>.*?\?/gi) || []).length;
            return [2 /*return*/, __assign(__assign({}, rule), { passed: hasFaqSchema || (hasFaqSection && questionCount >= 3), details: hasFaqSchema
                        ? 'FAQ page with schema markup found — excellent for AI citations'
                        : hasFaqSection
                            ? "FAQ section found with ".concat(questionCount, " questions")
                            : questionCount > 0
                                ? "Found ".concat(questionCount, " question-like headings but no dedicated FAQ section")
                                : 'No FAQ content found', errorType: 'success' })];
        });
    });
}
function checkHttps(url) {
    return __awaiter(this, void 0, void 0, function () {
        var rule, isHttps;
        return __generator(this, function (_a) {
            rule = getRule('https');
            isHttps = url.startsWith('https://');
            return [2 /*return*/, __assign(__assign({}, rule), { passed: isHttps, details: isHttps ? 'Site uses HTTPS' : 'Site does not use HTTPS', errorType: 'success' })];
        });
    });
}
function checkOpenGraph(html) {
    return __awaiter(this, void 0, void 0, function () {
        var rule, hasOg, hasTwitter;
        return __generator(this, function (_a) {
            rule = getRule('open_graph');
            hasOg = /property="og:(title|description|type)"/i.test(html);
            hasTwitter = /name="twitter:(card|title|description)"/i.test(html);
            return [2 /*return*/, __assign(__assign({}, rule), { passed: hasOg, details: hasOg && hasTwitter
                        ? 'Both Open Graph and Twitter Card tags found'
                        : hasOg
                            ? 'Open Graph tags found (add Twitter Card tags too for full coverage)'
                            : 'No Open Graph tags found', errorType: 'success' })];
        });
    });
}
function checkMobile(html) {
    return __awaiter(this, void 0, void 0, function () {
        var rule, hasViewport;
        return __generator(this, function (_a) {
            rule = getRule('mobile');
            hasViewport = /name="viewport"/i.test(html);
            return [2 /*return*/, __assign(__assign({}, rule), { passed: hasViewport, details: hasViewport ? 'Viewport meta tag found — site appears mobile-friendly' : 'No viewport meta tag found', errorType: 'success' })];
        });
    });
}
function checkSitemap(baseUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var rule, res, passed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rule = getRule('sitemap');
                    return [4 /*yield*/, fetchWithRetry("".concat(baseUrl, "/sitemap.xml"))];
                case 1:
                    res = (_a.sent()).response;
                    passed = (res === null || res === void 0 ? void 0 : res.ok) === true;
                    return [2 /*return*/, __assign(__assign({}, rule), { passed: passed, details: passed ? 'sitemap.xml found' : 'No sitemap.xml found', errorType: 'success' })];
            }
        });
    });
}
function checkHeadingStructure(html) {
    return __awaiter(this, void 0, void 0, function () {
        var rule, h1Count, h2Count, passed;
        return __generator(this, function (_a) {
            rule = getRule('headings');
            h1Count = (html.match(/<h1[\s>]/gi) || []).length;
            h2Count = (html.match(/<h2[\s>]/gi) || []).length;
            passed = h1Count === 1 && h2Count >= 2;
            return [2 /*return*/, __assign(__assign({}, rule), { passed: passed, details: "Found ".concat(h1Count, " H1 tag").concat(h1Count !== 1 ? 's' : '', " and ").concat(h2Count, " H2 tags. ").concat(h1Count === 1 ? 'Good H1 structure.' : h1Count === 0 ? 'Missing H1.' : 'Multiple H1s — should have exactly one.', " ").concat(h2Count >= 2 ? 'Good content structure.' : 'Need more H2 sections.'), errorType: 'success' })];
        });
    });
}
function checkServicePages(html) {
    return __awaiter(this, void 0, void 0, function () {
        var rule, serviceLinks, areaLinks, totalLinks;
        return __generator(this, function (_a) {
            rule = getRule('service_pages');
            serviceLinks = html.match(/href="[^"]*(?:service|plumb|hvac|dental|roof|repair|install|clean|landscap|electri|paint)[^"]*"/gi) || [];
            areaLinks = html.match(/href="[^"]*(?:area|location|city|neighborhood|serve|cover)[^"]*"/gi) || [];
            totalLinks = serviceLinks.length + areaLinks.length;
            return [2 /*return*/, __assign(__assign({}, rule), { passed: totalLinks >= 2, details: totalLinks >= 2
                        ? "Found ".concat(serviceLinks.length, " service page links and ").concat(areaLinks.length, " area page links")
                        : 'Few or no service/area-specific page links found', errorType: 'success' })];
        });
    });
}
function checkContentFreshness(html) {
    return __awaiter(this, void 0, void 0, function () {
        var rule, currentYear, lastYear, hasCurrent, hasRecent;
        return __generator(this, function (_a) {
            rule = getRule('freshness');
            currentYear = new Date().getFullYear().toString();
            lastYear = (new Date().getFullYear() - 1).toString();
            hasCurrent = html.includes(currentYear);
            hasRecent = hasCurrent || html.includes(lastYear);
            return [2 /*return*/, __assign(__assign({}, rule), { passed: hasRecent, details: hasCurrent
                        ? "Content references ".concat(currentYear, " \u2014 appears current")
                        : hasRecent
                            ? "Content references ".concat(lastYear, " but not ").concat(currentYear, " \u2014 consider updating")
                            : 'No recent year references found — content may appear outdated to AI', errorType: 'success' })];
        });
    });
}
function checkReviewSchema(html) {
    return __awaiter(this, void 0, void 0, function () {
        var rule, hasReviewSchema, hasTestimonials;
        return __generator(this, function (_a) {
            rule = getRule('reviews');
            hasReviewSchema = /AggregateRating|Review/i.test(html) && /application\/ld\+json/i.test(html);
            hasTestimonials = /testimonial|review|customer said|what our|client feedback/i.test(html);
            return [2 /*return*/, __assign(__assign({}, rule), { passed: hasReviewSchema || hasTestimonials, details: hasReviewSchema
                        ? 'Review/rating schema markup found'
                        : hasTestimonials
                            ? 'Testimonial content found (add schema markup to boost AI visibility)'
                            : 'No review content or testimonials found on homepage', errorType: 'success' })];
        });
    });
}
function checkAnswerFirstContent(html) {
    return __awaiter(this, void 0, void 0, function () {
        var rule, bodyMatch, text, hasLocationMention, hasServiceMention, passed;
        return __generator(this, function (_a) {
            rule = getRule('answer_first');
            bodyMatch = html.match(/<body[^>]*>([\s\S]*)/i);
            if (!bodyMatch) {
                return [2 /*return*/, __assign(__assign({}, rule), { passed: false, details: 'Could not analyze page content', errorType: 'parse_error' })];
            }
            text = bodyMatch[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 1000);
            hasLocationMention = /\b(in|near|serving|located)\s+[A-Z][a-z]+/i.test(text);
            hasServiceMention = /\b(plumb|hvac|heat|cool|dental|roof|repair|install|clean|law|attorney|electric|landscap|paint|construct)/i.test(text);
            passed = hasLocationMention && hasServiceMention;
            return [2 /*return*/, __assign(__assign({}, rule), { passed: passed, details: passed
                        ? 'Homepage content mentions both services and location early — good for AI extraction'
                        : hasServiceMention
                            ? 'Services mentioned but no specific location in early content'
                            : hasLocationMention
                                ? 'Location mentioned but services not clear in early content'
                                : 'Homepage doesn\'t clearly state what you do or where in the first content block', errorType: 'success' })];
        });
    });
}
function checkNapConsistency(html) {
    return __awaiter(this, void 0, void 0, function () {
        var rule, phonePattern, phones, uniquePhones, hasAddress;
        return __generator(this, function (_a) {
            rule = getRule('nap');
            phonePattern = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
            phones = html.match(phonePattern) || [];
            uniquePhones = __spreadArray([], new Set(phones.map(function (p) { return p.replace(/\D/g, ''); })), true);
            hasAddress = /<address/i.test(html) || /itemtype=".*PostalAddress"/i.test(html) || /"address"/i.test(html);
            return [2 /*return*/, __assign(__assign({}, rule), { passed: uniquePhones.length >= 1 && uniquePhones.length <= 2 && hasAddress, details: uniquePhones.length === 0
                        ? 'No phone number found on page'
                        : uniquePhones.length > 2
                            ? "Found ".concat(uniquePhones.length, " different phone numbers \u2014 this confuses AI")
                            : "Phone number found. ".concat(hasAddress ? 'Address markup present.' : 'No structured address found.'), errorType: 'success' })];
        });
    });
}
// --- Main handler ---
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var url, baseUrl, _a, pageRes, pageError, errorDetail, html, checks, totalWeight, earnedWeight, score, passed, failed, scannedAt, supabase, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, req.json()];
                case 1:
                    url = (_b.sent()).url;
                    if (!url) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: 'URL is required' }, { status: 400 })];
                    }
                    baseUrl = url.trim();
                    if (!baseUrl.startsWith('http'))
                        baseUrl = "https://".concat(baseUrl);
                    baseUrl = baseUrl.replace(/\/+$/, '');
                    return [4 /*yield*/, fetchWithRetry(baseUrl, 8000, 1)];
                case 2:
                    _a = _b.sent(), pageRes = _a.response, pageError = _a.errorType;
                    if (!pageRes || !pageRes.ok) {
                        errorDetail = pageError === 'timeout'
                            ? "".concat(baseUrl, " took too long to respond. The site may be slow or down.")
                            : pageError === 'dns_error'
                                ? "Could not find ".concat(baseUrl, ". Check that the domain is correct and the site is online.")
                                : "Could not reach ".concat(baseUrl, " (HTTP ").concat((pageRes === null || pageRes === void 0 ? void 0 : pageRes.status) || 'unknown', "). Make sure the website is online.");
                        console.error(JSON.stringify({
                            event: 'aeo_scan_failed',
                            url: baseUrl,
                            errorType: pageError,
                            statusCode: pageRes === null || pageRes === void 0 ? void 0 : pageRes.status,
                            timestamp: new Date().toISOString(),
                        }));
                        return [2 /*return*/, server_1.NextResponse.json({
                                error: errorDetail,
                                url: baseUrl,
                                score: null,
                                errorType: pageError,
                                checks: [],
                                rulesVersion: aeo_rules_json_1.default.version,
                            }, { status: 400 })];
                    }
                    return [4 /*yield*/, pageRes.text()];
                case 3:
                    html = _b.sent();
                    return [4 /*yield*/, Promise.all([
                            checkLlmsTxt(baseUrl),
                            checkRobotsTxt(baseUrl),
                            checkSchemaMarkup(html),
                            checkFaqContent(html),
                            checkHttps(baseUrl),
                            checkOpenGraph(html),
                            checkMobile(html),
                            checkSitemap(baseUrl),
                            checkHeadingStructure(html),
                            checkServicePages(html),
                            checkContentFreshness(html),
                            checkReviewSchema(html),
                            checkAnswerFirstContent(html),
                            checkNapConsistency(html),
                        ])];
                case 4:
                    checks = _b.sent();
                    totalWeight = checks.reduce(function (sum, c) { return sum + c.weight; }, 0);
                    earnedWeight = checks.reduce(function (sum, c) { return sum + (c.passed ? c.weight : 0); }, 0);
                    score = Math.round((earnedWeight / totalWeight) * 100);
                    passed = checks.filter(function (c) { return c.passed; }).length;
                    failed = checks.filter(function (c) { return !c.passed; }).length;
                    scannedAt = new Date().toISOString();
                    console.log(JSON.stringify({
                        event: 'aeo_scan_complete',
                        url: baseUrl,
                        score: score,
                        passed: passed,
                        failed: failed,
                        rulesVersion: aeo_rules_json_1.default.version,
                        timestamp: scannedAt,
                    }));
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 8, , 9]);
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase) return [3 /*break*/, 7];
                    return [4 /*yield*/, supabase.from('aeo_scans').insert({
                            url: baseUrl,
                            score: score,
                            passed: passed,
                            failed: failed,
                            checks: checks,
                            rules_version: aeo_rules_json_1.default.version,
                            scanned_at: scannedAt,
                        })];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    err_2 = _b.sent();
                    console.error(JSON.stringify({
                        event: 'aeo_scan_persist_failed',
                        url: baseUrl,
                        error: err_2 instanceof Error ? err_2.message : 'unknown',
                        timestamp: scannedAt,
                    }));
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/, server_1.NextResponse.json({
                        url: baseUrl,
                        score: score,
                        passed: passed,
                        failed: failed,
                        total: checks.length,
                        checks: checks,
                        rulesVersion: aeo_rules_json_1.default.version,
                        scannedAt: scannedAt,
                    })];
            }
        });
    });
}
// --- History endpoint ---
function GET(req) {
    return __awaiter(this, void 0, void 0, function () {
        var url, limit, supabase, _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = req.nextUrl.searchParams.get('url');
                    limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') || '20'), 100);
                    if (!url) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: 'url query parameter is required' }, { status: 400 })];
                    }
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: 'Database not configured' }, { status: 503 })];
                    }
                    return [4 /*yield*/, supabase
                            .from('aeo_scans')
                            .select('id, url, score, passed, failed, rules_version, scanned_at')
                            .eq('url', url.replace(/\/+$/, ''))
                            .order('scanned_at', { ascending: false })
                            .limit(limit)];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error(JSON.stringify({ event: 'aeo_history_failed', url: url, error: error.message }));
                        return [2 /*return*/, server_1.NextResponse.json({ error: 'Failed to fetch scan history' }, { status: 500 })];
                    }
                    return [2 /*return*/, server_1.NextResponse.json({
                            url: url,
                            scans: data || [],
                            total: (data === null || data === void 0 ? void 0 : data.length) || 0,
                        })];
            }
        });
    });
}
