'use client';
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
exports.default = LlmsTxtPage;
exports.dynamic = 'force-dynamic';
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var deployment_instructions_1 = require("@/lib/deployment-instructions");
function LlmsTxtPage() {
    var _this = this;
    var _a = (0, react_1.useState)(''), businessName = _a[0], setBusinessName = _a[1];
    var _b = (0, react_1.useState)(''), category = _b[0], setCategory = _b[1];
    var _c = (0, react_1.useState)(''), city = _c[0], setCity = _c[1];
    var _d = (0, react_1.useState)(''), state = _d[0], setState = _d[1];
    var _e = (0, react_1.useState)(''), phone = _e[0], setPhone = _e[1];
    var _f = (0, react_1.useState)(''), address = _f[0], setAddress = _f[1];
    var _g = (0, react_1.useState)(''), website = _g[0], setWebsite = _g[1];
    var _h = (0, react_1.useState)(''), hours = _h[0], setHours = _h[1];
    var _j = (0, react_1.useState)(''), services = _j[0], setServices = _j[1];
    var _k = (0, react_1.useState)(''), serviceAreas = _k[0], setServiceAreas = _k[1];
    var _l = (0, react_1.useState)(''), description = _l[0], setDescription = _l[1];
    var _m = (0, react_1.useState)(''), reviewRating = _m[0], setReviewRating = _m[1];
    var _o = (0, react_1.useState)(''), reviewCount = _o[0], setReviewCount = _o[1];
    var _p = (0, react_1.useState)(false), loading = _p[0], setLoading = _p[1];
    var _q = (0, react_1.useState)(null), result = _q[0], setResult = _q[1];
    var _r = (0, react_1.useState)(false), copied = _r[0], setCopied = _r[1];
    var _s = (0, react_1.useState)('generic'), platform = _s[0], setPlatform = _s[1];
    var handleGenerate = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!businessName || !category || !city || !state)
                        return [2 /*return*/];
                    setLoading(true);
                    setResult(null);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/generate/llms-txt', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                businessName: businessName,
                                category: category,
                                city: city,
                                state: state,
                                phone: phone || undefined,
                                address: address || undefined,
                                website: website || undefined,
                                hours: hours || undefined,
                                services: services ? services.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : [],
                                serviceAreas: serviceAreas ? serviceAreas.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : [],
                                description: description || undefined,
                                reviewRating: reviewRating || undefined,
                                reviewCount: reviewCount || undefined,
                            }),
                        })];
                case 2:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _b.sent();
                    setResult(data);
                    return [3 /*break*/, 6];
                case 4:
                    _a = _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleDownload = function () {
        if (!result)
            return;
        var blob = new Blob([result.content], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'llms.txt';
        a.click();
        URL.revokeObjectURL(url);
    };
    var handleCopy = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!result)
                        return [2 /*return*/];
                    return [4 /*yield*/, navigator.clipboard.writeText(result.content)];
                case 1:
                    _a.sent();
                    setCopied(true);
                    setTimeout(function () { return setCopied(false); }, 2000);
                    return [2 /*return*/];
            }
        });
    }); };
    var categories = [
        'Plumber', 'HVAC Contractor', 'Electrician', 'Roofer', 'Dentist',
        'Lawyer', 'Landscaper', 'Painter', 'Auto Mechanic', 'Chiropractor',
        'Real Estate Agent', 'Accountant', 'Veterinarian', 'Cleaning Service',
        'Pest Control', 'Moving Company', 'Handyman', 'General Contractor',
    ];
    return (<div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">AI Discovery File</h1>
        <p className="text-white/50 mt-1">
          Generate an llms.txt file that tells AI assistants about your business. Upload it to your website and AI search engines will know how to recommend you.
        </p>
      </div>

      {/* What is this */}
      <card_1.Card className="bg-[#FFD700]/5 border-[#FFD700]/20">
        <card_1.CardContent className="p-5">
          <h3 className="font-semibold text-[#FFD700] text-sm mb-2">💡 What is an llms.txt file?</h3>
          <p className="text-white/60 text-sm">
            Think of it as a business card for AI. When ChatGPT, Claude, Perplexity, or Google AI searches the web, they look for this file to quickly understand what your business does, where you operate, and what services you offer. Without it, AI has to guess — and it usually guesses wrong or skips you entirely.
          </p>
        </card_1.CardContent>
      </card_1.Card>

      {/* Form */}
      <card_1.Card className="bg-white/5 border-white/10">
        <card_1.CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-white text-sm">Business Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Business Name *</label>
              <input type="text" value={businessName} onChange={function (e) { return setBusinessName(e.target.value); }} placeholder="Thompson Plumbing" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"/>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Business Type *</label>
              <select value={category} onChange={function (e) { return setCategory(e.target.value); }} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFD700]/50">
                <option value="" className="bg-[#111]">Select...</option>
                {categories.map(function (cat) { return <option key={cat} value={cat} className="bg-[#111]">{cat}</option>; })}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">City *</label>
              <input type="text" value={city} onChange={function (e) { return setCity(e.target.value); }} placeholder="Burnsville" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"/>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">State *</label>
              <input type="text" value={state} onChange={function (e) { return setState(e.target.value); }} placeholder="MN" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"/>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Phone</label>
              <input type="text" value={phone} onChange={function (e) { return setPhone(e.target.value); }} placeholder="(952) 555-1234" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"/>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Website</label>
              <input type="text" value={website} onChange={function (e) { return setWebsite(e.target.value); }} placeholder="https://thompsonplumbing.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"/>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Address</label>
              <input type="text" value={address} onChange={function (e) { return setAddress(e.target.value); }} placeholder="123 Main St, Burnsville, MN 55337" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"/>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Hours</label>
              <input type="text" value={hours} onChange={function (e) { return setHours(e.target.value); }} placeholder="Mon-Fri 7AM-6PM, Sat 8AM-2PM" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"/>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/50 mb-1">Services (comma-separated)</label>
            <input type="text" value={services} onChange={function (e) { return setServices(e.target.value); }} placeholder="Water heater repair, drain cleaning, sewer line replacement, faucet installation" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"/>
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1">Service Areas (comma-separated cities)</label>
            <input type="text" value={serviceAreas} onChange={function (e) { return setServiceAreas(e.target.value); }} placeholder="Apple Valley, Eagan, Lakeville, Prior Lake, Savage" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"/>
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1">Business Description (optional)</label>
            <textarea value={description} onChange={function (e) { return setDescription(e.target.value); }} rows={2} placeholder="Family-owned plumbing company serving the south metro since 2005..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Google Review Rating</label>
              <input type="text" value={reviewRating} onChange={function (e) { return setReviewRating(e.target.value); }} placeholder="4.8" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"/>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Number of Reviews</label>
              <input type="text" value={reviewCount} onChange={function (e) { return setReviewCount(e.target.value); }} placeholder="127" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"/>
            </div>
          </div>

          <button_1.Button onClick={handleGenerate} disabled={loading || !businessName || !category || !city || !state} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold">
            {loading ? 'Generating...' : 'Generate AI Discovery File'}
          </button_1.Button>
        </card_1.CardContent>
      </card_1.Card>

      {/* Result */}
      {result && (<>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Your llms.txt File</h2>
            <div className="flex gap-2">
              <button_1.Button variant="outline" size="sm" onClick={handleCopy} className="border-white/20 text-white/70 hover:text-white">
                {copied ? '✓ Copied!' : 'Copy'}
              </button_1.Button>
              <button_1.Button onClick={handleDownload} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold" size="sm">
                ⬇ Download llms.txt
              </button_1.Button>
            </div>
          </div>

          <card_1.Card className="bg-white/5 border-white/10">
            <card_1.CardContent className="p-5">
              <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm text-green-400 whitespace-pre-wrap">
                {result.content}
              </pre>
              <p className="text-white/30 text-xs mt-3">{result.byteSize} bytes — well under the 2KB recommended size</p>
            </card_1.CardContent>
          </card_1.Card>

          {/* Platform-specific instructions */}
          <card_1.Card className="bg-[#FFD700]/5 border-[#FFD700]/20">
            <card_1.CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#FFD700] text-sm">📋 How to add this to your website</h3>
                <select value={platform} onChange={function (e) { return setPlatform(e.target.value); }} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-[#FFD700]/50">
                  {(0, deployment_instructions_1.getAllPlatforms)().map(function (p) { return (<option key={p.id} value={p.id} className="bg-[#111]">{p.name}</option>); })}
                </select>
              </div>
              <ol className="text-white/60 text-sm space-y-2 list-decimal list-inside">
                {(0, deployment_instructions_1.getInstructions)(platform).llmsTxt.map(function (step, i) { return (<li key={i}>{step}</li>); })}
              </ol>
              {(0, deployment_instructions_1.getInstructions)(platform).pitfalls.length > 0 && (<div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-white/40 text-xs font-medium mb-1">⚠️ Watch out for:</p>
                  <ul className="text-white/40 text-xs space-y-1 list-disc list-inside">
                    {(0, deployment_instructions_1.getInstructions)(platform).pitfalls.map(function (p, i) { return (<li key={i}>{p}</li>); })}
                  </ul>
                </div>)}
              <p className="text-white/40 text-xs mt-4">
                AI search engines typically discover new llms.txt files within 1-4 weeks of deployment.
              </p>
            </card_1.CardContent>
          </card_1.Card>
        </>)}

      {/* Empty state */}
      {!result && !loading && (<div className="text-center py-12">
          <span className="text-5xl mb-4 block">📄</span>
          <h2 className="text-xl font-bold text-white mb-2">Your AI Business Card</h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Fill in your business details above and we&apos;ll generate a file that tells ChatGPT, Claude, Perplexity, and Google AI exactly who you are and what you do. One file, all AI assistants.
          </p>
        </div>)}
    </div>);
}
