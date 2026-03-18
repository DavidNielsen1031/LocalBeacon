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
exports.default = AIReadinessPage;
exports.dynamic = 'force-dynamic';
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var aeo_recommendations_1 = require("@/lib/aeo-recommendations");
var aeo_recommendations_2 = require("@/components/aeo-recommendations");
function ScoreRing(_a) {
    var score = _a.score;
    var radius = 58;
    var circumference = 2 * Math.PI * radius;
    var offset = circumference - (score / 100) * circumference;
    var color = score >= 80 ? '#22c55e' : score >= 50 ? '#FFD700' : '#ef4444';
    return (<div className="relative w-36 h-36">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"/>
        <circle cx="64" cy="64" r={radius} fill="none" stroke={color} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000 ease-out"/>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold text-white">{score}</span>
        <span className="text-xs text-white/50">out of 100</span>
      </div>
    </div>);
}
function TrendChart(_a) {
    var scans = _a.scans;
    if (scans.length < 2)
        return null;
    var sorted = __spreadArray([], scans, true).reverse(); // oldest first
    var maxScore = 100;
    var width = 320;
    var height = 80;
    var padding = 4;
    var stepX = (width - padding * 2) / (sorted.length - 1);
    var points = sorted.map(function (s, i) { return ({
        x: padding + i * stepX,
        y: height - padding - ((s.score / maxScore) * (height - padding * 2)),
        score: s.score,
        date: new Date(s.scanned_at).toLocaleDateString(),
    }); });
    var pathD = points.map(function (p, i) { return "".concat(i === 0 ? 'M' : 'L', " ").concat(p.x, " ").concat(p.y); }).join(' ');
    var firstScore = sorted[0].score;
    var lastScore = sorted[sorted.length - 1].score;
    var delta = lastScore - firstScore;
    var deltaColor = delta > 0 ? 'text-green-400' : delta < 0 ? 'text-red-400' : 'text-white/40';
    return (<card_1.Card className="bg-white/5 border-white/10">
      <card_1.CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Score History</h3>
          <span className={"text-sm font-bold ".concat(deltaColor)}>
            {delta > 0 ? "+".concat(delta) : delta} pts
          </span>
        </div>
        <svg viewBox={"0 0 ".concat(width, " ").concat(height)} className="w-full h-20">
          <path d={pathD} fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          {points.map(function (p, i) { return (<circle key={i} cx={p.x} cy={p.y} r="3" fill="#FFD700"/>); })}
        </svg>
        <div className="flex justify-between text-xs text-white/30 mt-1">
          <span>{points[0].date}</span>
          <span>{scans.length} scans</span>
          <span>{points[points.length - 1].date}</span>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
function getGradeLabel(score) {
    if (score >= 90)
        return { label: 'Excellent', color: 'text-green-400', emoji: '🏆', message: 'AI search engines can find and recommend your business easily.' };
    if (score >= 70)
        return { label: 'Good', color: 'text-green-300', emoji: '👍', message: 'You\'re ahead of most local businesses, but there\'s room to improve.' };
    if (score >= 50)
        return { label: 'Needs Work', color: 'text-yellow-400', emoji: '⚠️', message: 'AI assistants might find you sometimes, but you\'re missing key signals.' };
    if (score >= 30)
        return { label: 'Poor', color: 'text-orange-400', emoji: '🔧', message: 'AI search engines are unlikely to recommend your business right now.' };
    return { label: 'Critical', color: 'text-red-400', emoji: '🚨', message: 'Your business is invisible to AI assistants like ChatGPT, Siri, and Perplexity.' };
}
function AIReadinessPage() {
    var _this = this;
    var _a = (0, react_1.useState)(''), url = _a[0], setUrl = _a[1];
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), result = _c[0], setResult = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    var _e = (0, react_1.useState)([]), history = _e[0], setHistory = _e[1];
    var fetchHistory = function (scanUrl) { return __awaiter(_this, void 0, void 0, function () {
        var normalized, res, data, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    normalized = scanUrl.trim();
                    if (!normalized.startsWith('http'))
                        normalized = "https://".concat(normalized);
                    normalized = normalized.replace(/\/+$/, '');
                    return [4 /*yield*/, fetch("/api/ai-readiness?url=".concat(encodeURIComponent(normalized)))];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _b.sent();
                    if (data.scans)
                        setHistory(data.scans);
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleScan = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!url.trim())
                        return [2 /*return*/];
                    setLoading(true);
                    setError(null);
                    setResult(null);
                    setHistory([]);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/ai-readiness', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ url: url.trim() }),
                        })];
                case 2:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _b.sent();
                    if (data.error && !data.checks) {
                        setError(data.error);
                    }
                    else {
                        setResult(data);
                        // Fetch history after scan completes (includes the new scan)
                        fetchHistory(url);
                    }
                    return [3 /*break*/, 6];
                case 4:
                    _a = _b.sent();
                    setError('Failed to scan. Please check the URL and try again.');
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var grade = result ? getGradeLabel(result.score) : null;
    // Compute recommendations from scan results
    var recommendations = (0, react_1.useMemo)(function () {
        if (!result)
            return [];
        var signals = {};
        for (var _i = 0, _a = result.checks; _i < _a.length; _i++) {
            var check = _a[_i];
            signals[check.id] = check.passed;
        }
        return (0, aeo_recommendations_1.getRecommendations)(signals);
    }, [result]);
    return (<div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">AI Readiness Score</h1>
        <p className="text-white/50 mt-1">
          Check if AI assistants like ChatGPT, Siri, and Perplexity can find and recommend your business.
        </p>
      </div>

      {/* URL Input */}
      <card_1.Card className="bg-white/5 border-white/10">
        <card_1.CardContent className="p-6">
          <label className="block text-sm font-medium text-white/70 mb-2">
            Enter your website URL
          </label>
          <div className="flex gap-3">
            <input type="text" value={url} onChange={function (e) { return setUrl(e.target.value); }} onKeyDown={function (e) { return e.key === 'Enter' && handleScan(); }} placeholder="example.com or https://example.com" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50 focus:ring-1 focus:ring-[#FFD700]/30"/>
            <button_1.Button onClick={handleScan} disabled={loading || !url.trim()} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold px-8">
              {loading ? 'Scanning...' : 'Scan'}
            </button_1.Button>
          </div>
          {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
        </card_1.CardContent>
      </card_1.Card>

      {/* Loading state */}
      {loading && (<div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-[#FFD700]/30 border-t-[#FFD700] rounded-full animate-spin mb-4"/>
          <p className="text-white/50">Scanning {url}...</p>
          <p className="text-white/30 text-sm mt-1">Checking 15 AI visibility signals</p>
        </div>)}

      {/* Results */}
      {result && grade && (<>
          {/* Score overview */}
          <card_1.Card className="bg-white/5 border-white/10">
            <card_1.CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ScoreRing score={result.score}/>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <span className="text-2xl">{grade.emoji}</span>
                    <span className={"text-2xl font-bold ".concat(grade.color)}>{grade.label}</span>
                  </div>
                  <p className="text-white/60 mb-4">{grade.message}</p>
                  <div className="flex gap-6 justify-center md:justify-start">
                    <div className="text-center">
                      <span className="text-2xl font-bold text-green-400">{result.passed}</span>
                      <p className="text-xs text-white/40">Passed</p>
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-red-400">{result.failed}</span>
                      <p className="text-xs text-white/40">Need Fixing</p>
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-white/60">{result.total}</span>
                      <p className="text-xs text-white/40">Total Checks</p>
                    </div>
                  </div>
                </div>
              </div>
            </card_1.CardContent>
          </card_1.Card>

          {/* Trend chart */}
          {history.length >= 2 && <TrendChart scans={history}/>}

          {/* Failed checks first */}
          {result.checks.filter(function (c) { return !c.passed; }).length > 0 && (<div>
              <h2 className="text-lg font-bold text-white mb-4">
                🔧 What to Fix ({result.checks.filter(function (c) { return !c.passed; }).length} items)
              </h2>
              <div className="space-y-3">
                {result.checks
                    .filter(function (c) { return !c.passed; })
                    .sort(function (a, b) { return b.weight - a.weight; })
                    .map(function (check) { return (<card_1.Card key={check.id} className="bg-red-500/5 border-red-500/20">
                      <card_1.CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="text-red-400 mt-0.5 text-lg">✗</span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{check.label}</h3>
                            <p className="text-white/50 text-sm mt-1">{check.description}</p>
                            <p className="text-red-300/70 text-sm mt-2">
                              <span className="font-medium">Status:</span> {check.details}
                            </p>
                            <div className="mt-3 bg-white/5 rounded-lg p-3">
                              <p className="text-[#FFD700] text-sm font-medium">How to fix:</p>
                              <p className="text-white/60 text-sm mt-1">{check.fix}</p>
                            </div>
                          </div>
                          <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded">
                            Impact: {check.weight >= 8 ? 'High' : check.weight >= 6 ? 'Medium' : 'Low'}
                          </span>
                        </div>
                      </card_1.CardContent>
                    </card_1.Card>); })}
              </div>
            </div>)}

          {/* Passed checks */}
          {result.checks.filter(function (c) { return c.passed; }).length > 0 && (<div>
              <h2 className="text-lg font-bold text-white mb-4">
                ✅ What&apos;s Working ({result.checks.filter(function (c) { return c.passed; }).length} items)
              </h2>
              <div className="space-y-2">
                {result.checks
                    .filter(function (c) { return c.passed; })
                    .sort(function (a, b) { return b.weight - a.weight; })
                    .map(function (check) { return (<card_1.Card key={check.id} className="bg-green-500/5 border-green-500/10">
                      <card_1.CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-green-400 text-lg">✓</span>
                          <div className="flex-1">
                            <h3 className="font-medium text-white text-sm">{check.label}</h3>
                            <p className="text-white/40 text-xs mt-0.5">{check.details}</p>
                          </div>
                        </div>
                      </card_1.CardContent>
                    </card_1.Card>); })}
              </div>
            </div>)}

          {/* AEO Recommendations */}
          <aeo_recommendations_2.AeoRecommendations recommendations={recommendations}/>

          {/* Scanned timestamp */}
          <p className="text-white/20 text-xs text-center">
            Scanned {new Date(result.scannedAt).toLocaleString()} · {result.url}
          </p>
        </>)}

      {/* Empty state */}
      {!result && !loading && (<div className="text-center py-16">
          <span className="text-5xl mb-4 block">🔍</span>
          <h2 className="text-xl font-bold text-white mb-2">Check Your AI Visibility</h2>
          <p className="text-white/50 max-w-md mx-auto mb-6">
            Enter any website URL above to see how visible it is to AI search engines like ChatGPT, Claude, Perplexity, and Google AI.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Your business website', 'A competitor\'s site', 'localbeacon.ai'].map(function (suggestion) { return (<button key={suggestion} onClick={function () { return suggestion === 'localbeacon.ai' ? setUrl('localbeacon.ai') : null; }} className="text-xs text-white/30 bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors">
                Try: {suggestion}
              </button>); })}
          </div>
        </div>)}
    </div>);
}
