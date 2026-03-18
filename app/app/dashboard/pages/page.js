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
exports.dynamic = void 0;
exports.default = PagesPage;
exports.dynamic = 'force-dynamic';
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var input_1 = require("@/components/ui/input");
var dialog_1 = require("@/components/ui/dialog");
function PagesPage() {
    var _this = this;
    var _a = (0, react_1.useState)([
        {
            city: 'Burnsville',
            html: '<h1>Professional Plumbing Services in Burnsville, MN</h1><p>Looking for a reliable plumber in Burnsville? We provide expert residential and commercial plumbing services throughout the Burnsville area...</p>',
            title: 'Professional Plumbing Services in Burnsville, MN',
            word_count: 850,
        },
        {
            city: 'Apple Valley',
            html: '<h1>Expert Plumbing Services in Apple Valley, MN</h1><p>Need a plumber in Apple Valley? Our licensed team serves Apple Valley and surrounding neighborhoods with fast, professional plumbing solutions...</p>',
            title: 'Expert Plumbing Services in Apple Valley, MN',
            word_count: 820,
        },
    ]), pages = _a[0], setPages = _a[1];
    var _b = (0, react_1.useState)(''), cityInput = _b[0], setCityInput = _b[1];
    var _c = (0, react_1.useState)(false), generating = _c[0], setGenerating = _c[1];
    var _d = (0, react_1.useState)(false), showAdd = _d[0], setShowAdd = _d[1];
    var _e = (0, react_1.useState)(null), previewPage = _e[0], setPreviewPage = _e[1];
    var _f = (0, react_1.useState)(null), copied = _f[0], setCopied = _f[1];
    var generate = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!cityInput.trim())
                        return [2 /*return*/];
                    setGenerating(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/generate/service-page', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ target_city: cityInput.trim() }),
                        })];
                case 2:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data_1 = _b.sent();
                    setPages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [__assign({ city: cityInput.trim() }, data_1)], false); });
                    setCityInput('');
                    setShowAdd(false);
                    return [3 /*break*/, 6];
                case 4:
                    _a = _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    setGenerating(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var copyHtml = function (page) {
        navigator.clipboard.writeText(page.html);
        setCopied(page.city);
        setTimeout(function () { return setCopied(null); }, 2000);
    };
    return (<div className="flex-1 px-6 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">City Pages</h1>
          <p className="text-white/50 text-sm mt-1">Local pages that help you show up when people search in nearby cities</p>
        </div>
        <div className="flex items-center gap-3">
          <badge_1.Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 text-xs">
            {pages.length} / 3 pages (Free)
          </badge_1.Badge>
          <button_1.Button onClick={function () { return setShowAdd(true); }} disabled={pages.length >= 3} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-sm">
            + Add City
          </button_1.Button>
        </div>
      </div>

      {/* Add city dialog */}
      <dialog_1.Dialog open={showAdd} onOpenChange={setShowAdd}>
        <dialog_1.DialogContent className="bg-zinc-900 border-white/10 text-white max-w-md">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">Add Service Area</h2>
            <p className="text-white/50 text-sm mb-6">
              We&apos;ll create a unique page designed to help you show up when people in that city search for your services.
            </p>
            <input_1.Input placeholder="e.g. Minneapolis, Apple Valley, Eagan..." value={cityInput} onChange={function (e) { return setCityInput(e.target.value); }} onKeyDown={function (e) { return e.key === 'Enter' && generate(); }} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 mb-4" autoFocus/>
            <button_1.Button onClick={generate} disabled={!cityInput.trim() || generating} className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold">
              {generating ? (<span className="flex items-center gap-2"><span className="animate-spin">⟳</span> Generating...</span>) : '✨ Generate Page'}
            </button_1.Button>
          </div>
        </dialog_1.DialogContent>
      </dialog_1.Dialog>

      {/* Preview dialog */}
      <dialog_1.Dialog open={!!previewPage} onOpenChange={function () { return setPreviewPage(null); }}>
        <dialog_1.DialogContent className="bg-white max-w-2xl max-h-[80vh] overflow-y-auto">
          {previewPage && (<div className="p-6 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: previewPage.html }}/>)}
        </dialog_1.DialogContent>
      </dialog_1.Dialog>

      {/* Pages grid */}
      {pages.length === 0 ? (<div className="text-center py-20">
          <div className="text-5xl mb-4">🌐</div>
          <h3 className="text-white font-semibold mb-2">No pages yet</h3>
          <p className="text-white/40 text-sm mb-6 max-w-sm mx-auto">
            Create a service area page for each city you serve. Each page is uniquely written to rank for local searches.
          </p>
          <button_1.Button onClick={function () { return setShowAdd(true); }} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold">
            + Add Your First City
          </button_1.Button>
        </div>) : (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pages.map(function (page) { return (<card_1.Card key={page.city} className="bg-white/5 border-white/10">
              <card_1.CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <card_1.CardTitle className="text-white text-base">{page.city}</card_1.CardTitle>
                  <badge_1.Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs">Draft</badge_1.Badge>
                </div>
                <p className="text-white/30 text-xs">{page.word_count} words · Optimized for local search · FAQ included</p>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="flex gap-2">
                  <button_1.Button size="sm" variant="outline" onClick={function () { return setPreviewPage(page); }} className="border-white/10 text-white/50 hover:bg-white/5 text-xs flex-1">
                    Preview
                  </button_1.Button>
                  <button_1.Button size="sm" onClick={function () { return copyHtml(page); }} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-xs flex-1">
                    {copied === page.city ? '✓ Copied!' : 'Copy HTML'}
                  </button_1.Button>
                </div>
              </card_1.CardContent>
            </card_1.Card>); })}
          {pages.length < 3 && (<button onClick={function () { return setShowAdd(true); }} className="border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-2 p-8 hover:border-[#FFD700]/30 transition-colors">
              <span className="text-3xl">+</span>
              <span className="text-white/30 text-sm">Add City</span>
            </button>)}
        </div>)}

      {pages.length >= 3 && (<div className="mt-6 p-4 bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg text-center">
          <p className="text-[#FFD700] text-sm">
            You&apos;ve reached the Free plan limit. <button className="underline font-semibold">Upgrade to Solo</button> for 10 pages.
          </p>
        </div>)}
    </div>);
}
