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
exports.default = CompetitorsPage;
var react_1 = require("react");
var link_1 = require("next/link");
function getGrade(score) {
    if (score >= 90)
        return { letter: 'A', color: '#22c55e' };
    if (score >= 75)
        return { letter: 'B', color: '#84cc16' };
    if (score >= 60)
        return { letter: 'C', color: '#eab308' };
    if (score >= 40)
        return { letter: 'D', color: '#f97316' };
    return { letter: 'F', color: '#ef4444' };
}
function CompetitorsPage() {
    var _this = this;
    var _a = (0, react_1.useState)([]), competitors = _a[0], setCompetitors = _a[1];
    var _b = (0, react_1.useState)(''), newUrl = _b[0], setNewUrl = _b[1];
    var _c = (0, react_1.useState)(null), myResult = _c[0], setMyResult = _c[1];
    var _d = (0, react_1.useState)(''), myUrl = _d[0], setMyUrl = _d[1];
    var _e = (0, react_1.useState)(false), myLoading = _e[0], setMyLoading = _e[1];
    var scanUrl = (0, react_1.useCallback)(function (url) { return __awaiter(_this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/ai-readiness', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ url: url }),
                        })];
                case 1:
                    res = _b.sent();
                    if (!res.ok)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, _b.sent()];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    var scanMySite = function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!myUrl.trim())
                        return [2 /*return*/];
                    setMyLoading(true);
                    return [4 /*yield*/, scanUrl(myUrl.trim())];
                case 1:
                    result = _a.sent();
                    setMyResult(result);
                    setMyLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var addCompetitor = function () { return __awaiter(_this, void 0, void 0, function () {
        var url, entry, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!newUrl.trim() || competitors.length >= 3)
                        return [2 /*return*/];
                    url = newUrl.trim();
                    setNewUrl('');
                    entry = { url: url, result: null, loading: true };
                    setCompetitors(function (prev) { return __spreadArray(__spreadArray([], prev, true), [entry], false); });
                    return [4 /*yield*/, scanUrl(url)];
                case 1:
                    result = _a.sent();
                    setCompetitors(function (prev) {
                        return prev.map(function (c) { return c.url === url ? __assign(__assign({}, c), { result: result, loading: false }) : c; });
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var removeCompetitor = function (url) {
        setCompetitors(function (prev) { return prev.filter(function (c) { return c.url !== url; }); });
    };
    return (<div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Competitor Comparison</h1>
        <p className="text-white/50 text-sm mt-1">
          See how your AI visibility stacks up against your competitors
        </p>
      </div>

      {/* Your site */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-medium text-white/70 mb-3">Your website</h2>
        {!myResult ? (<div className="flex gap-3">
            <input type="url" value={myUrl} onChange={function (e) { return setMyUrl(e.target.value); }} placeholder="Enter your website URL" className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50" onKeyDown={function (e) { return e.key === 'Enter' && scanMySite(); }}/>
            <button onClick={scanMySite} disabled={myLoading || !myUrl.trim()} className="px-5 py-2.5 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-[#FFD700]/90 disabled:opacity-50 text-sm">
              {myLoading ? 'Scanning...' : 'Scan'}
            </button>
          </div>) : (<div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: getGrade(myResult.score).color }}>
                {myResult.score}
              </div>
              <div>
                <p className="text-white font-medium">{myResult.url.replace(/^https?:\/\//, '').split('/')[0]}</p>
                <p className="text-white/40 text-xs">{myResult.passed}/{myResult.total} signals passing</p>
              </div>
            </div>
            <button onClick={function () { return setMyResult(null); }} className="text-xs text-white/30 hover:text-white/60">
              Rescan
            </button>
          </div>)}
      </div>

      {/* Add competitor */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-white/70">Competitors</h2>
          <span className="text-xs text-white/30">{competitors.length}/3</span>
        </div>

        {competitors.length < 3 && (<div className="flex gap-3 mb-4">
            <input type="url" value={newUrl} onChange={function (e) { return setNewUrl(e.target.value); }} placeholder="Add a competitor's website" className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50" onKeyDown={function (e) { return e.key === 'Enter' && addCompetitor(); }}/>
            <button onClick={addCompetitor} disabled={!newUrl.trim()} className="px-5 py-2.5 bg-white/10 text-white font-medium rounded-lg hover:bg-white/15 disabled:opacity-50 text-sm">
              + Add
            </button>
          </div>)}

        {competitors.length === 0 && (<p className="text-white/30 text-sm text-center py-4">
            Add up to 3 competitors to compare AI readiness scores
          </p>)}

        {/* Competitor list */}
        <div className="space-y-3">
          {competitors.map(function (comp) { return (<div key={comp.url} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
              {comp.loading ? (<div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse"/>
                  <div>
                    <p className="text-white/60 text-sm">{comp.url.replace(/^https?:\/\//, '').split('/')[0]}</p>
                    <p className="text-white/30 text-xs">Scanning...</p>
                  </div>
                </div>) : comp.result ? (<div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: getGrade(comp.result.score).color }}>
                    {comp.result.score}
                  </div>
                  <div>
                    <p className="text-white text-sm">{comp.result.url.replace(/^https?:\/\//, '').split('/')[0]}</p>
                    <p className="text-white/40 text-xs">{comp.result.passed}/{comp.result.total} signals</p>
                  </div>
                </div>) : (<div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-sm">✗</div>
                  <div>
                    <p className="text-white/60 text-sm">{comp.url.replace(/^https?:\/\//, '').split('/')[0]}</p>
                    <p className="text-red-400/60 text-xs">Could not scan</p>
                  </div>
                </div>)}
              <button onClick={function () { return removeCompetitor(comp.url); }} className="text-white/20 hover:text-red-400 text-sm">
                ✕
              </button>
            </div>); })}
        </div>
      </div>

      {/* Comparison table */}
      {myResult && competitors.some(function (c) { return c.result; }) && (<div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h2 className="text-sm font-medium text-white/70 mb-4">Signal-by-signal comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-white/40 font-medium">Signal</th>
                  <th className="text-center py-2 text-[#FFD700] font-medium">You</th>
                  {competitors.filter(function (c) { return c.result; }).map(function (comp) { return (<th key={comp.url} className="text-center py-2 text-white/40 font-medium">
                      {comp.url.replace(/^https?:\/\//, '').split('/')[0].slice(0, 15)}
                    </th>); })}
                </tr>
              </thead>
              <tbody>
                {myResult.checks.map(function (check) { return (<tr key={check.id} className="border-b border-white/5">
                    <td className="py-2 text-white/70">{check.label}</td>
                    <td className="text-center">{check.passed ? '✅' : '❌'}</td>
                    {competitors.filter(function (c) { return c.result; }).map(function (comp) {
                    var compCheck = comp.result.checks.find(function (c) { return c.id === check.id; });
                    return (<td key={comp.url} className="text-center">
                          {(compCheck === null || compCheck === void 0 ? void 0 : compCheck.passed) ? '✅' : '❌'}
                        </td>);
                })}
                  </tr>); })}
                <tr className="font-bold">
                  <td className="py-2 text-white">Total Score</td>
                  <td className="text-center" style={{ color: getGrade(myResult.score).color }}>{myResult.score}</td>
                  {competitors.filter(function (c) { return c.result; }).map(function (comp) { return (<td key={comp.url} className="text-center" style={{ color: getGrade(comp.result.score).color }}>
                      {comp.result.score}
                    </td>); })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>)}

      {/* CTA */}
      <div className="mt-6 text-center">
        <p className="text-white/30 text-xs mb-2">
          Want to share your score comparison with a prospect?
        </p>
        <link_1.default href="/check" className="text-[#FFD700] text-sm hover:underline">
          Use the free public checker →
        </link_1.default>
      </div>
    </div>);
}
