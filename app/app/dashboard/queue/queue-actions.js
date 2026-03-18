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
exports.QueueActions = QueueActions;
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var navigation_1 = require("next/navigation");
function QueueActions(_a) {
    var businessId = _a.businessId, itemId = _a.itemId, content = _a.content, title = _a.title, status = _a.status, _b = _a.variant, variant = _b === void 0 ? 'header' : _b;
    var _c = (0, react_1.useState)(false), generating = _c[0], setGenerating = _c[1];
    var _d = (0, react_1.useState)(false), copying = _d[0], setCopying = _d[1];
    var _e = (0, react_1.useState)(false), marking = _e[0], setMarking = _e[1];
    var _f = (0, react_1.useState)(false), expanded = _f[0], setExpanded = _f[1];
    var _g = (0, react_1.useState)(false), editMode = _g[0], setEditMode = _g[1];
    var _h = (0, react_1.useState)(content !== null && content !== void 0 ? content : ''), editText = _h[0], setEditText = _h[1];
    var _j = (0, react_1.useState)(null), error = _j[0], setError = _j[1];
    var router = (0, navigation_1.useRouter)();
    function handleGenerate() {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!businessId) {
                            setError('No business found. Set up your business in Settings first.');
                            return [2 /*return*/];
                        }
                        setGenerating(true);
                        setError(null);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, 6, 7]);
                        return [4 /*yield*/, fetch('/api/generate/weekly-content', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ business_id: businessId }),
                            })];
                    case 2:
                        res = _a.sent();
                        if (!!res.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _a.sent();
                        if (data.error === 'limit_reached') {
                            setError("You've used all ".concat(data.limit, " posts this month. Upgrade to keep going \u2014 plans start at $49/mo."));
                            return [2 /*return*/];
                        }
                        throw new Error(data.error || 'Failed to generate post');
                    case 4:
                        router.refresh();
                        return [3 /*break*/, 7];
                    case 5:
                        err_1 = _a.sent();
                        setError(err_1 instanceof Error ? err_1.message : 'Something went wrong');
                        return [3 /*break*/, 7];
                    case 6:
                        setGenerating(false);
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    function handleCopy() {
        return __awaiter(this, void 0, void 0, function () {
            var textToCopy, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        textToCopy = editMode ? editText : (content !== null && content !== void 0 ? content : '');
                        if (!textToCopy)
                            return [2 /*return*/];
                        setCopying(true);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, navigator.clipboard.writeText(textToCopy)];
                    case 2:
                        _b.sent();
                        setTimeout(function () { return setCopying(false); }, 1500);
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        setCopying(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function handleMarkPosted() {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!itemId)
                            return [2 /*return*/];
                        setMarking(true);
                        setError(null);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, 6, 7]);
                        return [4 /*yield*/, fetch("/api/content-queue/".concat(itemId), {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ status: 'posted' }),
                            })];
                    case 2:
                        res = _a.sent();
                        if (!!res.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _a.sent();
                        throw new Error(data.error || 'Failed to update post');
                    case 4:
                        router.refresh();
                        return [3 /*break*/, 7];
                    case 5:
                        err_2 = _a.sent();
                        setError(err_2 instanceof Error ? err_2.message : 'Something went wrong');
                        return [3 /*break*/, 7];
                    case 6:
                        setMarking(false);
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    // Header / empty state: show Generate button
    if (variant === 'header' || variant === 'empty') {
        return (<div className="flex flex-col items-end gap-2">
        <button_1.Button onClick={handleGenerate} disabled={generating || !businessId} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold">
          {generating ? 'Writing…' : "Write My Post For This Week"}
        </button_1.Button>
        {error && (<div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm max-w-sm">
            <p className="text-red-400">{error}</p>
            {error.includes('Upgrade') && (<a href="/pricing" className="text-[#FFD700] font-semibold text-xs hover:underline mt-1 inline-block">
                View Plans →
              </a>)}
          </div>)}
      </div>);
    }
    // Per-item actions: Expand, Edit, Copy, Mark as Posted
    return (<div className="flex flex-col gap-2 w-full">
      {/* Expand/collapse full content */}
      {expanded && (<div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-2">
          <p className="text-xs text-white/40 mb-1 font-semibold">{title || 'Your Post'}</p>
          {editMode ? (<textarea value={editText} onChange={function (e) { return setEditText(e.target.value); }} className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white text-sm min-h-[120px] focus:outline-none focus:border-[#FFD700]/50"/>) : (<p className="text-white/80 text-sm whitespace-pre-wrap">{content}</p>)}
        </div>)}

      <div className="flex items-center gap-2 flex-wrap">
        <button_1.Button size="sm" variant="outline" onClick={function () { setExpanded(!expanded); if (!expanded)
        setEditText(content !== null && content !== void 0 ? content : ''); }} className="border-white/20 text-white/70 hover:text-white hover:border-white/40 text-xs">
          {expanded ? '▲ Collapse' : '▼ Read Full Post'}
        </button_1.Button>

        {expanded && (<button_1.Button size="sm" variant="outline" onClick={function () { return setEditMode(!editMode); }} className="border-white/20 text-white/70 hover:text-white hover:border-white/40 text-xs">
            {editMode ? '👁 Preview' : '✏️ Edit Before Copying'}
          </button_1.Button>)}

        <button_1.Button size="sm" variant="outline" onClick={handleCopy} className="border-white/20 text-white/70 hover:text-white hover:border-white/40 text-xs">
          {copying ? '✅ Copied!' : '📋 Copy Text'}
        </button_1.Button>

        {status !== 'posted' && (<button_1.Button size="sm" variant="outline" onClick={handleMarkPosted} disabled={marking} className="border-green-500/30 text-green-400 hover:bg-green-500/10 text-xs">
            {marking ? 'Saving…' : '✅ Mark as Posted'}
          </button_1.Button>)}
      </div>

      {error && (<div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-xs">
          <p className="text-red-400">{error}</p>
          {error.includes('Upgrade') && (<a href="/pricing" className="text-[#FFD700] font-semibold hover:underline mt-1 inline-block">
              View Plans →
            </a>)}
        </div>)}
    </div>);
}
