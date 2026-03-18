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
exports.CheckerForm = CheckerForm;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
// Simple client-side rate tracking
var RATE_LIMIT_KEY = 'lb_check_scans';
var MAX_SCANS_PER_HOUR = 3;
function checkRateLimit() {
    try {
        var stored = localStorage.getItem(RATE_LIMIT_KEY);
        var scans = stored ? JSON.parse(stored) : [];
        var oneHourAgo_1 = Date.now() - 60 * 60 * 1000;
        var recent = scans.filter(function (t) { return t > oneHourAgo_1; });
        return recent.length < MAX_SCANS_PER_HOUR;
    }
    catch (_a) {
        return true;
    }
}
function recordScan() {
    try {
        var stored = localStorage.getItem(RATE_LIMIT_KEY);
        var scans = stored ? JSON.parse(stored) : [];
        var oneHourAgo_2 = Date.now() - 60 * 60 * 1000;
        var recent = scans.filter(function (t) { return t > oneHourAgo_2; });
        recent.push(Date.now());
        localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
    }
    catch (_a) {
        // ignore
    }
}
function getGrade(score) {
    if (score >= 90)
        return { letter: 'A', color: '#22c55e', summary: 'Excellent visibility' };
    if (score >= 75)
        return { letter: 'B', color: '#84cc16', summary: 'Good, minor gaps' };
    if (score >= 60)
        return { letter: 'C', color: '#eab308', summary: 'Needs improvement' };
    if (score >= 40)
        return { letter: 'D', color: '#f97316', summary: 'Significant gaps' };
    return { letter: 'F', color: '#ef4444', summary: 'Not AI-ready' };
}
function CheckerForm() {
    var _this = this;
    var searchParams = (0, navigation_1.useSearchParams)();
    var _a = (0, react_1.useState)(''), url = _a[0], setUrl = _a[1];
    // Pre-fill URL from query param
    (0, react_1.useEffect)(function () {
        var urlParam = searchParams.get('url');
        if (urlParam)
            setUrl(urlParam);
    }, [searchParams]);
    var _b = (0, react_1.useState)(''), competitorUrl = _b[0], setCompetitorUrl = _b[1];
    var _c = (0, react_1.useState)(false), showCompetitor = _c[0], setShowCompetitor = _c[1];
    var _d = (0, react_1.useState)('idle'), viewState = _d[0], setViewState = _d[1];
    var _e = (0, react_1.useState)(null), result = _e[0], setResult = _e[1];
    var _f = (0, react_1.useState)(null), competitorResult = _f[0], setCompetitorResult = _f[1];
    var _g = (0, react_1.useState)(''), email = _g[0], setEmail = _g[1];
    var _h = (0, react_1.useState)(false), emailSaving = _h[0], setEmailSaving = _h[1];
    var _j = (0, react_1.useState)(false), emailSaved = _j[0], setEmailSaved = _j[1];
    var _k = (0, react_1.useState)(''), error = _k[0], setError = _k[1];
    var runScan = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data_1, data, compRes, compData, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!url.trim())
                        return [2 /*return*/];
                    if (!checkRateLimit()) {
                        setError('You\'ve reached the scan limit (3 per hour). Try again later.');
                        return [2 /*return*/];
                    }
                    setError('');
                    setViewState('scanning');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, fetch('/api/ai-readiness', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ url: url.trim() }),
                        })];
                case 2:
                    res = _b.sent();
                    if (!!res.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, res.json()];
                case 3:
                    data_1 = _b.sent();
                    setError(data_1.error || 'Could not scan that URL. Make sure the website is online.');
                    setViewState('idle');
                    return [2 /*return*/];
                case 4: return [4 /*yield*/, res.json()];
                case 5:
                    data = _b.sent();
                    setResult(data);
                    recordScan();
                    if (!(showCompetitor && competitorUrl.trim())) return [3 /*break*/, 8];
                    return [4 /*yield*/, fetch('/api/ai-readiness', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ url: competitorUrl.trim() }),
                        })];
                case 6:
                    compRes = _b.sent();
                    if (!compRes.ok) return [3 /*break*/, 8];
                    return [4 /*yield*/, compRes.json()];
                case 7:
                    compData = _b.sent();
                    setCompetitorResult(compData);
                    _b.label = 8;
                case 8:
                    setViewState('teaser');
                    return [3 /*break*/, 10];
                case 9:
                    _a = _b.sent();
                    setError('Something went wrong. Please try again.');
                    setViewState('idle');
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); }, [url, competitorUrl, showCompetitor]);
    var handleEmailSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (!email.trim() || !result)
                        return [2 /*return*/];
                    setEmailSaving(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetch('/api/leads', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                email: email.trim(),
                                url_scanned: result.url,
                                score: result.score,
                                checks: result.checks,
                            }),
                        })];
                case 2:
                    _b.sent();
                    setEmailSaved(true);
                    setViewState('full-report');
                    return [3 /*break*/, 5];
                case 3:
                    _a = _b.sent();
                    // Still show the report even if email save fails
                    setViewState('full-report');
                    return [3 /*break*/, 5];
                case 4:
                    setEmailSaving(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="max-w-2xl mx-auto px-6 pb-8">
      {/* Input Form */}
      {(viewState === 'idle' || viewState === 'scanning') && (<div className="bg-white rounded-2xl shadow-lg border border-black/5 p-6">
          <div className="flex gap-3">
            <input type="url" value={url} onChange={function (e) { return setUrl(e.target.value); }} placeholder="Enter your website URL (e.g. bobsplumbing.com)" className="flex-1 px-4 py-3 rounded-lg border border-black/10 bg-[#FAFAF7] text-[#1B2A4A] placeholder:text-[#1B2A4A]/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35]" onKeyDown={function (e) { return e.key === 'Enter' && runScan(); }} disabled={viewState === 'scanning'}/>
            <button onClick={runScan} disabled={viewState === 'scanning' || !url.trim()} className="px-6 py-3 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#FF6B35]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
              {viewState === 'scanning' ? (<span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Scanning...
                </span>) : ('Check My Score')}
            </button>
          </div>

          {/* Competitor toggle */}
          {!showCompetitor ? (<button onClick={function () { return setShowCompetitor(true); }} className="mt-3 text-sm text-[#FF6B35] hover:underline">
              + Compare with a competitor
            </button>) : (<div className="mt-3">
              <input type="url" value={competitorUrl} onChange={function (e) { return setCompetitorUrl(e.target.value); }} placeholder="Competitor's website (optional)" className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#FAFAF7] text-[#1B2A4A] placeholder:text-[#1B2A4A]/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35]" disabled={viewState === 'scanning'}/>
            </div>)}

          {error && (<div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>)}
        </div>)}

      {/* Teaser Score */}
      {viewState === 'teaser' && result && (<div className="bg-white rounded-2xl shadow-lg border border-black/5 p-8 text-center">
          {/* Score circle */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
              <circle cx="60" cy="60" r="52" fill="none" stroke={getGrade(result.score).color} strokeWidth="8" strokeLinecap="round" strokeDasharray={"".concat((result.score / 100) * 327, " 327")}/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#1B2A4A]">{result.score}</span>
              <span className="text-xs text-[#1B2A4A]/40">out of 100</span>
            </div>
          </div>

          <div className="inline-block px-3 py-1 rounded-full text-white font-bold text-sm mb-2" style={{ backgroundColor: getGrade(result.score).color }}>
            Grade: {getGrade(result.score).letter}
          </div>
          <p className="text-[#1B2A4A]/60 text-sm mb-2">{getGrade(result.score).summary}</p>
          <p className="text-[#1B2A4A]/40 text-xs mb-6">
            {result.passed}/{result.total} signals passing · {result.url}
          </p>

          {/* Competitor comparison teaser */}
          {competitorResult && (<div className="mb-6 p-4 rounded-lg bg-[#FAFAF7] border border-black/5">
              <p className="text-sm font-medium text-[#1B2A4A] mb-2">vs. Competitor</p>
              <div className="flex items-center justify-center gap-8">
                <div>
                  <p className="text-2xl font-bold" style={{ color: getGrade(result.score).color }}>{result.score}</p>
                  <p className="text-xs text-[#1B2A4A]/40">Your site</p>
                </div>
                <span className="text-[#1B2A4A]/20 text-lg">vs</span>
                <div>
                  <p className="text-2xl font-bold" style={{ color: getGrade(competitorResult.score).color }}>{competitorResult.score}</p>
                  <p className="text-xs text-[#1B2A4A]/40">{competitorResult.url.replace(/^https?:\/\//, '').split('/')[0]}</p>
                </div>
              </div>
              {result.score > competitorResult.score && (<p className="text-xs text-green-600 mt-2">🏆 You&apos;re ahead by {result.score - competitorResult.score} points!</p>)}
              {result.score < competitorResult.score && (<p className="text-xs text-orange-600 mt-2">📊 You&apos;re {competitorResult.score - result.score} points behind — see how to catch up</p>)}
            </div>)}

          {/* Email gate */}
          <div className="bg-[#FAFAF7] rounded-xl p-6 border border-black/5">
            <h3 className="font-semibold text-[#1B2A4A] mb-1">See your full breakdown</h3>
            <p className="text-sm text-[#1B2A4A]/50 mb-4">
              See which of the 14 signals passed or failed, and get step-by-step instructions to fix each one.
            </p>
            <form onSubmit={handleEmailSubmit} className="flex gap-2">
              <input type="email" value={email} onChange={function (e) { return setEmail(e.target.value); }} placeholder="Your email address" required className="flex-1 px-4 py-3 rounded-lg border border-black/10 bg-white text-[#1B2A4A] placeholder:text-[#1B2A4A]/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30"/>
              <button type="submit" disabled={emailSaving} className="px-6 py-3 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#FF6B35]/90 transition-colors disabled:opacity-50 whitespace-nowrap">
                {emailSaving ? 'Sending...' : 'Get Report'}
              </button>
            </form>
            <p className="text-xs text-[#1B2A4A]/30 mt-2">No spam. Unsubscribe anytime.</p>
          </div>

          {/* Scan another */}
          <button onClick={function () {
                setViewState('idle');
                setResult(null);
                setCompetitorResult(null);
                setUrl('');
                setCompetitorUrl('');
                setEmail('');
                setEmailSaved(false);
            }} className="mt-4 text-sm text-[#FF6B35] hover:underline">
            ← Scan another website
          </button>
        </div>)}

      {/* Full Report */}
      {viewState === 'full-report' && result && (<div className="bg-white rounded-2xl shadow-lg border border-black/5 p-8">
          {/* Score summary */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-black/5">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: getGrade(result.score).color }}>
              {result.score}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1B2A4A]">
                AI Readiness Report — {result.url.replace(/^https?:\/\//, '').split('/')[0]}
              </h2>
              <p className="text-sm text-[#1B2A4A]/50">
                Grade: {getGrade(result.score).letter} · {result.passed} passing · {result.failed} failing
              </p>
            </div>
          </div>

          {emailSaved && (<div className="mb-6 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
              ✅ Report sent to {email}
            </div>)}

          {/* Failing signals first */}
          {result.checks.filter(function (c) { return !c.passed; }).length > 0 && (<div className="mb-8">
              <h3 className="font-semibold text-[#1B2A4A] mb-3 flex items-center gap-2">
                <span className="text-red-500">✗</span> Needs attention ({result.checks.filter(function (c) { return !c.passed; }).length})
              </h3>
              <div className="space-y-3">
                {result.checks.filter(function (c) { return !c.passed; }).sort(function (a, b) { return b.weight - a.weight; }).map(function (check) { return (<div key={check.id} className="p-4 rounded-lg bg-red-50 border border-red-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-[#1B2A4A] text-sm">{check.label}</span>
                      <span className="text-xs text-red-500 font-medium">
                        {check.weight >= 8 ? '🔴 Critical' : check.weight >= 5 ? '🟡 Important' : '⚪ Nice-to-have'}
                      </span>
                    </div>
                    <p className="text-sm text-[#1B2A4A]/60 mb-2">{check.details}</p>
                    {check.fix && (<p className="text-sm text-[#FF6B35] font-medium">💡 {check.fix}</p>)}
                  </div>); })}
              </div>
            </div>)}

          {/* Passing signals */}
          {result.checks.filter(function (c) { return c.passed; }).length > 0 && (<div className="mb-8">
              <h3 className="font-semibold text-[#1B2A4A] mb-3 flex items-center gap-2">
                <span className="text-green-500">✓</span> Passing ({result.checks.filter(function (c) { return c.passed; }).length})
              </h3>
              <div className="space-y-2">
                {result.checks.filter(function (c) { return c.passed; }).map(function (check) { return (<div key={check.id} className="p-3 rounded-lg bg-green-50 border border-green-100 flex items-center gap-3">
                    <span className="text-green-500">✓</span>
                    <div>
                      <span className="font-medium text-[#1B2A4A] text-sm">{check.label}</span>
                      <p className="text-xs text-[#1B2A4A]/50">{check.details}</p>
                    </div>
                  </div>); })}
              </div>
            </div>)}

          {/* Competitor side-by-side */}
          {competitorResult && (<div className="mb-8">
              <h3 className="font-semibold text-[#1B2A4A] mb-3">📊 Competitor Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/10">
                      <th className="text-left py-2 text-[#1B2A4A]/50 font-medium">Signal</th>
                      <th className="text-center py-2 text-[#1B2A4A]/50 font-medium">You</th>
                      <th className="text-center py-2 text-[#1B2A4A]/50 font-medium">Competitor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.checks.map(function (check) {
                    var comp = competitorResult.checks.find(function (c) { return c.id === check.id; });
                    return (<tr key={check.id} className="border-b border-black/5">
                          <td className="py-2 text-[#1B2A4A]">{check.label}</td>
                          <td className="text-center">{check.passed ? '✅' : '❌'}</td>
                          <td className="text-center">{(comp === null || comp === void 0 ? void 0 : comp.passed) ? '✅' : '❌'}</td>
                        </tr>);
                })}
                    <tr className="font-bold">
                      <td className="py-2 text-[#1B2A4A]">Total Score</td>
                      <td className="text-center" style={{ color: getGrade(result.score).color }}>{result.score}/100</td>
                      <td className="text-center" style={{ color: getGrade(competitorResult.score).color }}>{competitorResult.score}/100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>)}

          {/* CTA */}
          <div className="bg-[#FAFAF7] rounded-xl p-6 border border-black/5 text-center">
            <h3 className="font-semibold text-[#1B2A4A] mb-1">Want to fix these issues automatically?</h3>
            <p className="text-sm text-[#1B2A4A]/50 mb-4">
              LocalBeacon handles your local marketing — we fix your AI visibility and keep it growing.
            </p>
            <a href="/sign-up" className="inline-block px-8 py-3 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#FF6B35]/90 transition-colors">
              Start Free →
            </a>
          </div>

          {/* Scan another */}
          <div className="text-center mt-4">
            <button onClick={function () {
                setViewState('idle');
                setResult(null);
                setCompetitorResult(null);
                setUrl('');
                setCompetitorUrl('');
                setEmail('');
                setEmailSaved(false);
            }} className="text-sm text-[#FF6B35] hover:underline">
              ← Scan another website
            </button>
          </div>
        </div>)}
    </div>);
}
