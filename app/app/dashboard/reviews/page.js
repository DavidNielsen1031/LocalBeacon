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
exports.default = ReviewsPage;
exports.dynamic = 'force-dynamic';
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var STAR_RATINGS = [1, 2, 3, 4, 5];
function ReviewsPage() {
    var _this = this;
    var _a = (0, react_1.useState)(''), author = _a[0], setAuthor = _a[1];
    var _b = (0, react_1.useState)(5), rating = _b[0], setRating = _b[1];
    var _c = (0, react_1.useState)(''), comment = _c[0], setComment = _c[1];
    var _d = (0, react_1.useState)(false), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(''), response = _e[0], setResponse = _e[1];
    var _f = (0, react_1.useState)(false), copied = _f[0], setCopied = _f[1];
    var _g = (0, react_1.useState)([
        {
            id: 'demo-1',
            author: 'Sarah M.',
            rating: 5,
            comment: 'Amazing service! They came out same day and fixed our furnace. Very professional and fair pricing. Will definitely use again!',
            response: 'Thank you so much, Sarah! We\'re glad we could get to you quickly — same-day service is always our goal. It was a pleasure working with you and we appreciate the kind words about our pricing. We\'ll be here whenever you need us!',
            timestamp: 'Today',
        },
        {
            id: 'demo-2',
            author: 'Mike R.',
            rating: 3,
            comment: 'Work was fine but had to wait 3 days for the appointment. Expected faster service.',
            response: 'Hi Mike, thank you for your honest feedback. We understand how frustrating wait times can be, especially when you need help right away. We\'re actively working on expanding our team to reduce scheduling delays. We\'re glad the work itself met your expectations and we\'d love the chance to provide faster service next time.',
            timestamp: 'Yesterday',
        },
        {
            id: 'demo-3',
            author: 'Jennifer K.',
            rating: 5,
            comment: 'Best plumber in Burnsville! Fixed a leak that two other companies couldn\'t figure out. Highly recommend.',
            response: 'Wow, thank you Jennifer! That means a lot to us. Tricky leaks are actually our specialty — we love a good challenge. We\'re proud to serve the Burnsville community and thrilled we could solve the problem for you. Thank you for the recommendation!',
            timestamp: '2 days ago',
        },
    ]), history = _g[0], setHistory = _g[1];
    var draft = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!comment.trim())
                        return [2 /*return*/];
                    setLoading(true);
                    setResponse('');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/generate/review-response', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                reviewer_name: author || 'Customer',
                                rating: rating,
                                review_text: comment,
                                business_name: 'Your Business',
                            }),
                        })];
                case 2:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data_1 = _b.sent();
                    setResponse(data_1.response || '');
                    setHistory(function (prev) { return __spreadArray([{
                            id: Date.now().toString(),
                            author: author || 'Customer',
                            rating: rating,
                            comment: comment,
                            response: data_1.response || '',
                            timestamp: new Date().toLocaleDateString(),
                        }], prev, true); });
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
    var copy = function () {
        navigator.clipboard.writeText(response);
        setCopied(true);
        setTimeout(function () { return setCopied(false); }, 2000);
    };
    var resetForm = function () {
        setAuthor('');
        setRating(5);
        setComment('');
        setResponse('');
    };
    return (<div className="flex-1 px-6 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Review Responses</h1>
          <p className="text-white/50 text-sm mt-1">We draft professional responses to your Google reviews</p>
        </div>
        <badge_1.Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">
          Manual mode · GBP sync coming soon
        </badge_1.Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input form */}
        <card_1.Card className="bg-white/5 border-white/10 h-fit">
          <card_1.CardHeader className="pb-3">
            <card_1.CardTitle className="text-white text-base">Paste a Review</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-5">
            <div>
              <label_1.Label className="text-white/70 mb-2 block text-sm">Reviewer Name <span className="text-white/30">(optional)</span></label_1.Label>
              <input_1.Input placeholder="e.g. John D." value={author} onChange={function (e) { return setAuthor(e.target.value); }} className="bg-white/5 border-white/10 text-white placeholder:text-white/30"/>
            </div>
            <div>
              <label_1.Label className="text-white/70 mb-2 block text-sm">Star Rating</label_1.Label>
              <div className="flex gap-2">
                {STAR_RATINGS.map(function (star) { return (<button key={star} onClick={function () { return setRating(star); }} className={"text-2xl transition-transform hover:scale-110 ".concat(star <= rating ? 'opacity-100' : 'opacity-20')}>
                    ⭐
                  </button>); })}
                <span className="text-white/40 text-sm self-center ml-1">{rating}/5</span>
              </div>
            </div>
            <div>
              <label_1.Label className="text-white/70 mb-2 block text-sm">Review Text *</label_1.Label>
              <textarea placeholder="Paste the full review text here..." value={comment} onChange={function (e) { return setComment(e.target.value); }} rows={5} className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-md px-3 py-2 text-sm focus:border-[#FFD700]/50 focus:outline-none resize-none"/>
            </div>
            <button_1.Button onClick={draft} disabled={!comment.trim() || loading} className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold">
              {loading ? (<span className="flex items-center gap-2"><span className="animate-spin">⟳</span> Drafting...</span>) : '✨ Draft Response'}
            </button_1.Button>
          </card_1.CardContent>
        </card_1.Card>

        {/* Response output */}
        <div className="space-y-4">
          {response ? (<card_1.Card className="bg-white/5 border-[#FFD700]/30">
              <card_1.CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <card_1.CardTitle className="text-white text-base">Your Response</card_1.CardTitle>
                  <badge_1.Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs">Ready to copy</badge_1.Badge>
                </div>
              </card_1.CardHeader>
              <card_1.CardContent>
                <p className="text-white/80 text-sm leading-relaxed mb-5">{response}</p>
                <div className="flex gap-2">
                  <button_1.Button size="sm" variant="outline" onClick={draft} className="border-white/10 text-white/50 hover:bg-white/5 text-xs flex-1">
                    ↻ Regenerate
                  </button_1.Button>
                  <button_1.Button size="sm" onClick={copy} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-xs flex-1">
                    {copied ? '✓ Copied!' : 'Copy Response'}
                  </button_1.Button>
                </div>
                <p className="text-white/30 text-xs mt-4 text-center">
                  Paste this response directly into Google Maps on your business profile
                </p>
                <button onClick={resetForm} className="text-white/20 text-xs mt-2 w-full text-center hover:text-white/40">
                  ← Start a new review
                </button>
              </card_1.CardContent>
            </card_1.Card>) : (<div className="h-full flex items-center justify-center py-16 text-center">
              <div>
                <div className="text-4xl mb-3">⭐</div>
                <p className="text-white/30 text-sm">Your drafted response will appear here</p>
              </div>
            </div>)}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (<div className="mt-10">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Responses</h2>
          <div className="space-y-3">
            {history.map(function (item) { return (<card_1.Card key={item.id} className="bg-white/5 border-white/10">
                <card_1.CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white font-medium text-sm">{item.author}</span>
                    <span className="text-yellow-400 text-xs">{'⭐'.repeat(item.rating)}</span>
                    <span className="text-white/30 text-xs ml-auto">{item.timestamp}</span>
                  </div>
                  <p className="text-white/40 text-xs italic mb-2 line-clamp-1">&ldquo;{item.comment}&rdquo;</p>
                  <p className="text-white/60 text-xs line-clamp-2">{item.response}</p>
                </card_1.CardContent>
              </card_1.Card>); })}
          </div>
        </div>)}
    </div>);
}
