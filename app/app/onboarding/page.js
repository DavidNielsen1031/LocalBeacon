'use client';
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
exports.default = OnboardingPage;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var BUSINESS_CATEGORIES = [
    'Plumber', 'HVAC Technician', 'Dentist', 'Roofer', 'Lawyer',
    'Electrician', 'Landscaper', 'Pest Control', 'House Painter',
    'Auto Repair', 'Chiropractor', 'Physical Therapist', 'Other',
];
function OnboardingPage() {
    var _this = this;
    var router = (0, navigation_1.useRouter)();
    var _a = (0, react_1.useState)(1), step = _a[0], setStep = _a[1];
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(''), areaInput = _c[0], setAreaInput = _c[1];
    var _d = (0, react_1.useState)(null), generatedPost = _d[0], setGeneratedPost = _d[1];
    var _e = (0, react_1.useState)(false), copied = _e[0], setCopied = _e[1];
    var _f = (0, react_1.useState)({
        name: '', category: '', primary_city: '', primary_state: '',
        phone: '', website: '', service_areas: [],
    }), data = _f[0], setData = _f[1];
    var update = function (field, value) {
        return setData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    var addArea = function () {
        if (areaInput.trim() && !data.service_areas.includes(areaInput.trim())) {
            setData(function (prev) { return (__assign(__assign({}, prev), { service_areas: __spreadArray(__spreadArray([], prev.service_areas, true), [areaInput.trim()], false) })); });
            setAreaInput('');
        }
    };
    var removeArea = function (area) {
        return setData(function (prev) { return (__assign(__assign({}, prev), { service_areas: prev.service_areas.filter(function (a) { return a !== area; }) })); });
    };
    var saveBusiness = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, json;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch('/api/businesses', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                    })];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    json = _b.sent();
                    return [2 /*return*/, (_a = json.business) === null || _a === void 0 ? void 0 : _a.id];
            }
        });
    }); };
    var generateFirstPost = function (businessId) { return __awaiter(_this, void 0, void 0, function () {
        var res, json, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/generate/gbp-post', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                business_id: businessId,
                                post_type: 'whats_new',
                                business_name: data.name,
                                business_category: data.category,
                                primary_city: data.primary_city,
                                service_areas: data.service_areas,
                            }),
                        })];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()
                        // Ensure we have content — fall back to mock if API failed
                    ];
                case 2:
                    json = _b.sent();
                    // Ensure we have content — fall back to mock if API failed
                    if (!json.title && !json.body) {
                        return [2 /*return*/, {
                                title: "".concat(data.name, " \u2014 Trusted ").concat(data.category, " in ").concat(data.primary_city),
                                body: "Looking for a reliable ".concat(data.category.toLowerCase(), " in ").concat(data.primary_city, "? ").concat(data.name, " has been proudly serving the community with professional service.\n\nWhether it's a routine check or an emergency, our team is ready.\n\n\u2705 Licensed & insured\n\u2705 Same-day service available\n\u2705 Transparent pricing"),
                                call_to_action: 'CALL',
                            }];
                    }
                    return [2 /*return*/, json];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, {
                            title: "".concat(data.name, " \u2014 Trusted ").concat(data.category, " in ").concat(data.primary_city),
                            body: "Looking for a reliable ".concat(data.category.toLowerCase(), " in ").concat(data.primary_city, "? ").concat(data.name, " has been proudly serving the community with professional service.\n\nWhether it's a routine check or an emergency, our team is ready.\n\n\u2705 Licensed & insured\n\u2705 Same-day service available\n\u2705 Transparent pricing"),
                            call_to_action: 'CALL',
                        }];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleStep3Continue = function (plan) { return __awaiter(_this, void 0, void 0, function () {
        var businessId, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (plan !== 'free') {
                        // TODO: Stripe checkout — for now continue on free
                    }
                    setLoading(true);
                    return [4 /*yield*/, saveBusiness()];
                case 1:
                    businessId = _a.sent();
                    return [4 /*yield*/, generateFirstPost(businessId)];
                case 2:
                    post = _a.sent();
                    setGeneratedPost(post);
                    setLoading(false);
                    setStep(4);
                    return [2 /*return*/];
            }
        });
    }); };
    var copyPost = function () {
        if (generatedPost) {
            navigator.clipboard.writeText("".concat(generatedPost.title, "\n\n").concat(generatedPost.body));
            setCopied(true);
            setTimeout(function () { return setCopied(false); }, 2000);
        }
    };
    var steps = ['Business Info', 'Service Areas', 'Choose Plan', 'First Post'];
    return (<div className="min-h-screen bg-black flex flex-col items-center px-4 py-12">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <span className="text-2xl">🔦</span>
        <span className="text-white font-bold text-xl">LocalBeacon.ai</span>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map(function (s, i) { return (<div key={s} className="flex items-center gap-2">
            <div className={"w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ".concat(i + 1 === step ? 'bg-[#FFD700] text-black' :
                i + 1 < step ? 'bg-[#FFD700]/30 text-[#FFD700]' :
                    'bg-white/10 text-white/30')}>
              {i + 1 < step ? '✓' : i + 1}
            </div>
            <span className={"text-sm hidden sm:block ".concat(i + 1 === step ? 'text-white' : 'text-white/30')}>{s}</span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-white/10 mx-1"/>}
          </div>); })}
      </div>

      <div className="w-full max-w-lg">
        {/* Step 1: Business Basics */}
        {step === 1 && (<div>
            <h1 className="text-2xl font-bold text-white mb-2">Tell us about your business</h1>
            <p className="text-white/50 mb-8">We&apos;ll use this to generate locally-targeted content.</p>
            <div className="space-y-5">
              <div>
                <label_1.Label className="text-white/70 mb-2 block">Business Name *</label_1.Label>
                <input_1.Input placeholder="e.g. Johnson Plumbing & Heating" value={data.name} onChange={function (e) { return update('name', e.target.value); }} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50"/>
              </div>
              <div>
                <label_1.Label className="text-white/70 mb-2 block">Business Type *</label_1.Label>
                <select value={data.category} onChange={function (e) { return update('category', e.target.value); }} className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 focus:border-[#FFD700]/50 focus:outline-none">
                  <option value="" className="bg-zinc-900">Select your business type...</option>
                  {BUSINESS_CATEGORIES.map(function (c) { return (<option key={c} value={c} className="bg-zinc-900">{c}</option>); })}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label_1.Label className="text-white/70 mb-2 block">City *</label_1.Label>
                  <input_1.Input placeholder="e.g. Burnsville" value={data.primary_city} onChange={function (e) { return update('primary_city', e.target.value); }} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50"/>
                </div>
                <div>
                  <label_1.Label className="text-white/70 mb-2 block">State *</label_1.Label>
                  <input_1.Input placeholder="e.g. MN" maxLength={2} value={data.primary_state} onChange={function (e) { return update('primary_state', e.target.value.toUpperCase()); }} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50"/>
                </div>
              </div>
              <div>
                <label_1.Label className="text-white/70 mb-2 block">Phone Number</label_1.Label>
                <input_1.Input placeholder="e.g. (612) 555-0100" value={data.phone} onChange={function (e) { return update('phone', e.target.value); }} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50"/>
              </div>
              <div>
                <label_1.Label className="text-white/70 mb-2 block">Website <span className="text-white/30">(optional)</span></label_1.Label>
                <input_1.Input placeholder="e.g. https://johnsonplumbing.com" value={data.website} onChange={function (e) { return update('website', e.target.value); }} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50"/>
              </div>
              <button_1.Button onClick={function () { return setStep(2); }} disabled={!data.name || !data.category || !data.primary_city || !data.primary_state} className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold h-11 mt-2">
                Continue →
              </button_1.Button>
            </div>
          </div>)}

        {/* Step 2: Service Areas */}
        {step === 2 && (<div>
            <h1 className="text-2xl font-bold text-white mb-2">Where do you serve?</h1>
            <p className="text-white/50 mb-8">Add cities and neighborhoods you cover. We&apos;ll create local pages for each one.</p>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input_1.Input placeholder="e.g. Minneapolis, Apple Valley, Lakeville..." value={areaInput} onChange={function (e) { return setAreaInput(e.target.value); }} onKeyDown={function (e) { return e.key === 'Enter' && addArea(); }} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50"/>
                <button_1.Button onClick={addArea} variant="outline" className="border-white/10 text-white hover:bg-white/5 shrink-0">
                  Add
                </button_1.Button>
              </div>
              {data.service_areas.length > 0 && (<div className="flex flex-wrap gap-2 p-4 bg-white/5 rounded-lg border border-white/10">
                  {data.service_areas.map(function (area) { return (<badge_1.Badge key={area} className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 cursor-pointer hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-colors" onClick={function () { return removeArea(area); }}>
                      {area} ×
                    </badge_1.Badge>); })}
                </div>)}
              {data.service_areas.length === 0 && (<p className="text-white/30 text-sm text-center py-4">No service areas added yet. We&apos;ll default to {data.primary_city}.</p>)}
              <div className="flex gap-3 pt-2">
                <button_1.Button onClick={function () { return setStep(1); }} variant="outline" className="border-white/10 text-white/50 hover:bg-white/5 flex-1">
                  ← Back
                </button_1.Button>
                <button_1.Button onClick={function () { return setStep(3); }} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold flex-1">
                  Continue →
                </button_1.Button>
              </div>
            </div>
          </div>)}

        {/* Step 3: Plan Selection */}
        {step === 3 && (<div>
            <h1 className="text-2xl font-bold text-white mb-2">Choose your plan</h1>
            <p className="text-white/50 mb-8">Start free, upgrade anytime.</p>
            <div className="space-y-3">
              {[
                {
                    plan: 'free', name: 'Free', price: '$0', badge: null,
                    features: ['5 GBP posts/month', '3 service area pages', '1 business location', 'Copy-paste mode'],
                    cta: 'Start Free',
                },
                {
                    plan: 'solo', name: 'Solo', price: '$49/mo', badge: 'Most Popular',
                    features: ['Unlimited GBP posts', '10 service area pages', '3 locations', '1 blog post/month', 'Review response drafts'],
                    cta: 'Start Solo →',
                },
                {
                    plan: 'agency', name: 'Agency', price: '$99/mo', badge: null,
                    features: ['Everything unlimited', 'Multi-client dashboard', 'White-label reports', 'Priority support'],
                    cta: 'Start Agency →',
                },
            ].map(function (_a) {
                var plan = _a.plan, name = _a.name, price = _a.price, badge = _a.badge, features = _a.features, cta = _a.cta;
                return (<card_1.Card key={plan} className={"border cursor-pointer transition-all ".concat(plan === 'solo'
                        ? 'border-[#FFD700]/50 bg-[#FFD700]/5'
                        : 'border-white/10 bg-white/5 hover:border-white/20')} onClick={function () { return handleStep3Continue(plan); }}>
                  <card_1.CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-lg">{name}</span>
                        {badge && <badge_1.Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 text-xs">{badge}</badge_1.Badge>}
                      </div>
                      <span className="text-[#FFD700] font-bold">{price}</span>
                    </div>
                    <ul className="space-y-1">
                      {features.map(function (f) { return (<li key={f} className="text-white/60 text-sm flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span> {f}
                        </li>); })}
                    </ul>
                    <button_1.Button className={"w-full mt-4 font-semibold ".concat(plan === 'solo'
                        ? 'bg-[#FFD700] text-black hover:bg-[#FFD700]/90'
                        : 'bg-white/10 text-white hover:bg-white/15')} disabled={loading}>
                      {loading ? 'Setting up...' : cta}
                    </button_1.Button>
                  </card_1.CardContent>
                </card_1.Card>);
            })}
            </div>
            <button onClick={function () { return setStep(2); }} className="text-white/30 text-sm mt-4 w-full text-center hover:text-white/50">
              ← Back
            </button>
          </div>)}

        {/* Step 4: First Generated Post */}
        {step === 4 && (<div>
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎉</div>
              <h1 className="text-2xl font-bold text-white mb-2">Your first Google post is ready!</h1>
              <p className="text-white/50">Copy it and paste it into your Google Business Profile right now.</p>
            </div>
            {generatedPost && (<card_1.Card className="bg-white/5 border-[#FFD700]/30 mb-6">
                <card_1.CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <badge_1.Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 text-xs">GBP Post — Draft</badge_1.Badge>
                  </div>
                  <h3 className="text-white font-semibold text-base mb-3">{generatedPost.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{generatedPost.body}</p>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-white/30 text-xs">CTA: {generatedPost.call_to_action}</span>
                    <button_1.Button size="sm" onClick={copyPost} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-xs">
                      {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                    </button_1.Button>
                  </div>
                </card_1.CardContent>
              </card_1.Card>)}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
              <p className="text-white/50 text-sm text-center">
                📱 To post: Open <strong className="text-white">Google Maps</strong> → find your business → <strong className="text-white">Add post</strong> → paste this content
              </p>
            </div>
            <button_1.Button onClick={function () { return router.push('/dashboard'); }} className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold h-11">
              Go to Dashboard →
            </button_1.Button>
          </div>)}
      </div>
    </div>);
}
