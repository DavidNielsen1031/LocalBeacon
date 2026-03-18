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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamic = void 0;
exports.default = PostsPage;
exports.dynamic = 'force-dynamic';
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var POST_TYPES = [
    { value: 'whats_new', label: "What's New", emoji: '📢' },
    { value: 'offer', label: 'Special Offer', emoji: '🎁' },
    { value: 'event', label: 'Event', emoji: '📅' },
    { value: 'product', label: 'Service Spotlight', emoji: '🔦' },
];
// Demo posts — shows what the pipeline looks like when active
var DEMO_POSTS = [
    {
        id: '1',
        day: 'Monday',
        date: 'Mar 3',
        title: '🔧 Spring maintenance season is here!',
        preview: "Don't wait for the first hot day — schedule your AC tune-up now and avoid the summer rush. Our certified technicians...",
        type: "What's New",
        status: 'scheduled',
    },
    {
        id: '2',
        day: 'Wednesday',
        date: 'Mar 5',
        title: '💰 15% off first-time customers this March',
        preview: "New to our service? Welcome! This month, enjoy 15% off any residential service call. Mention this post when you call...",
        type: 'Special Offer',
        status: 'scheduled',
    },
    {
        id: '3',
        day: 'Friday',
        date: 'Mar 7',
        title: '⭐ Spotlight: Emergency plumbing — 24/7',
        preview: "Burst pipe at 2 AM? We've got you covered. Our emergency team responds within 45 minutes, day or night, across...",
        type: 'Service Spotlight',
        status: 'draft',
    },
    {
        id: '4',
        day: 'Sunday',
        date: 'Mar 9',
        title: '📅 Free home safety inspection event',
        preview: "Join us this Saturday at the community center for free home safety inspections. Our experts will check your...",
        type: 'Event',
        status: 'draft',
    },
];
var STATUS_STYLES = {
    draft: { bg: 'bg-white/10', text: 'text-white/50', label: 'Draft — Review & Approve' },
    scheduled: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Scheduled' },
    published: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Published ✓' },
};
function PostsPage() {
    var _this = this;
    var _a = (0, react_1.useState)('whats_new'), postType = _a[0], setPostType = _a[1];
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), result = _c[0], setResult = _c[1];
    var _d = (0, react_1.useState)(false), copied = _d[0], setCopied = _d[1];
    var _e = (0, react_1.useState)('pipeline'), activeTab = _e[0], setActiveTab = _e[1];
    var _f = (0, react_1.useState)(DEMO_POSTS), posts = _f[0], setPosts = _f[1];
    var _g = (0, react_1.useState)(null), editingId = _g[0], setEditingId = _g[1];
    var _h = (0, react_1.useState)(''), editTitle = _h[0], setEditTitle = _h[1];
    var _j = (0, react_1.useState)(''), editBody = _j[0], setEditBody = _j[1];
    var startEdit = function (post) {
        setEditingId(post.id);
        setEditTitle(post.title);
        setEditBody(post.preview);
    };
    var saveEdit = function (id) {
        setPosts(function (prev) { return prev.map(function (p) { return p.id === id ? __assign(__assign({}, p), { title: editTitle, preview: editBody }) : p; }); });
        setEditingId(null);
    };
    var saveAndApprove = function (id) {
        setPosts(function (prev) { return prev.map(function (p) { return p.id === id ? __assign(__assign({}, p), { title: editTitle, preview: editBody, status: 'scheduled' }) : p; }); });
        setEditingId(null);
    };
    var generate = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setLoading(true);
                    setResult(null);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/generate/gbp-post', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ post_type: postType }),
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
    var copy = function () {
        if (!result)
            return;
        navigator.clipboard.writeText("".concat(result.title, "\n\n").concat(result.body));
        setCopied(true);
        setTimeout(function () { return setCopied(false); }, 2000);
    };
    var approvePost = function (id) {
        setPosts(function (prev) { return prev.map(function (p) { return p.id === id ? __assign(__assign({}, p), { status: 'scheduled' }) : p; }); });
    };
    var scheduled = posts.filter(function (p) { return p.status === 'scheduled'; }).length;
    var drafts = posts.filter(function (p) { return p.status === 'draft'; }).length;
    var published = posts.filter(function (p) { return p.status === 'published'; }).length;
    return (<div className="flex-1 px-6 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Google Posts</h1>
          <p className="text-white/50 text-sm mt-1">Your weekly posting pipeline — we write, you approve, Google publishes.</p>
        </div>
        <badge_1.Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 text-xs">
          {posts.length} / 5 this week (Free)
        </badge_1.Badge>
      </div>

      {/* Pipeline stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-white/50">{drafts}</p>
          <p className="text-xs text-white/30">Need Review</p>
        </div>
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-400">{scheduled}</p>
          <p className="text-xs text-blue-400/60">Scheduled</p>
        </div>
        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-400">{published}</p>
          <p className="text-xs text-green-400/60">Published</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white/5 rounded-lg p-1 w-fit">
        {[
            { key: 'pipeline', label: "This Week's Posts" },
            { key: 'create', label: '+ Create Post' },
        ].map(function (tab) { return (<button key={tab.key} onClick={function () { return setActiveTab(tab.key); }} className={"px-4 py-2 rounded-md text-sm font-medium transition-colors ".concat(activeTab === tab.key ? 'bg-[#FFD700] text-black' : 'text-white/50 hover:text-white')}>
            {tab.label}
          </button>); })}
      </div>

      {activeTab === 'pipeline' && (<div className="space-y-3">
          {/* Auto-post banner */}
          <div className="bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg p-4 mb-4 flex items-start gap-3">
            <span className="text-xl">🔦</span>
            <div>
              <p className="text-white text-sm font-medium">Auto-posting is almost ready</p>
              <p className="text-white/40 text-xs mt-1">
                Once your Google listing is connected, these posts will publish automatically on schedule.
                For now, copy each post and paste it into your Google Business Profile.
              </p>
            </div>
          </div>

          {posts.map(function (post) {
                var style = STATUS_STYLES[post.status];
                var isEditing = editingId === post.id;
                return (<card_1.Card key={post.id} className={"bg-white/5 border-white/10 ".concat(post.status === 'draft' ? 'border-l-2 border-l-[#FFD700]/50' : '', " ").concat(isEditing ? 'border-[#FFD700]/30' : '')}>
                <card_1.CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-white/30 text-xs font-medium">{post.day}, {post.date}</span>
                    <badge_1.Badge className={"".concat(style.bg, " ").concat(style.text, " text-xs border-0")}>
                      {style.label}
                    </badge_1.Badge>
                    <badge_1.Badge className="bg-white/5 text-white/30 text-xs border-0">{post.type}</badge_1.Badge>
                  </div>

                  {isEditing ? (<div className="space-y-3 mt-2">
                      <input type="text" value={editTitle} onChange={function (e) { return setEditTitle(e.target.value); }} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FFD700]/50"/>
                      <textarea value={editBody} onChange={function (e) { return setEditBody(e.target.value); }} rows={4} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm leading-relaxed focus:outline-none focus:border-[#FFD700]/50 resize-none"/>
                      <div className="flex gap-2 justify-end">
                        <button_1.Button size="sm" variant="outline" onClick={function () { return setEditingId(null); }} className="border-white/10 text-white/50 hover:bg-white/5 text-xs">
                          Cancel
                        </button_1.Button>
                        <button_1.Button size="sm" variant="outline" onClick={function () { return saveEdit(post.id); }} className="border-white/20 text-white hover:bg-white/10 text-xs">
                          Save Draft
                        </button_1.Button>
                        <button_1.Button size="sm" onClick={function () { return saveAndApprove(post.id); }} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-xs">
                          Save & Approve ✓
                        </button_1.Button>
                      </div>
                    </div>) : (<div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm mb-1">{post.title}</p>
                        <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{post.preview}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {post.status === 'draft' && (<>
                            <button_1.Button size="sm" variant="outline" onClick={function () { return startEdit(post); }} className="border-white/20 text-white/70 hover:bg-white/10 text-xs">
                              ✏️ Edit
                            </button_1.Button>
                            <button_1.Button size="sm" onClick={function () { return approvePost(post.id); }} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-xs">
                              Approve ✓
                            </button_1.Button>
                          </>)}
                        {post.status === 'scheduled' && (<button_1.Button size="sm" variant="outline" onClick={function () { return startEdit(post); }} className="border-white/20 text-white/70 hover:bg-white/10 text-xs">
                            ✏️ Edit
                          </button_1.Button>)}
                        <button_1.Button size="sm" variant="outline" onClick={function () {
                            navigator.clipboard.writeText("".concat(post.title, "\n\n").concat(post.preview));
                        }} className="border-white/10 text-white/50 hover:bg-white/5 text-xs">
                          Copy
                        </button_1.Button>
                      </div>
                    </div>)}
                </card_1.CardContent>
              </card_1.Card>);
            })}

          {posts.length === 0 && (<div className="text-center py-12">
              <p className="text-white/30 text-sm">No posts this week. Click &quot;+ Create Post&quot; to generate one.</p>
            </div>)}
        </div>)}

      {activeTab === 'create' && (<div className="space-y-6">
          <card_1.Card className="bg-white/5 border-white/10">
            <card_1.CardHeader className="pb-3">
              <card_1.CardTitle className="text-white text-base">What kind of post?</card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {POST_TYPES.map(function (type) { return (<button key={type.value} onClick={function () { return setPostType(type.value); }} className={"p-3 rounded-lg border text-left transition-all ".concat(postType === type.value
                    ? 'border-[#FFD700]/50 bg-[#FFD700]/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20')}>
                    <div className="text-2xl mb-1">{type.emoji}</div>
                    <div className={"text-sm font-medium ".concat(postType === type.value ? 'text-[#FFD700]' : 'text-white/70')}>
                      {type.label}
                    </div>
                  </button>); })}
              </div>
              <button_1.Button onClick={generate} disabled={loading} className="w-full mt-5 bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold h-11">
                {loading ? (<span className="flex items-center gap-2">
                    <span className="animate-spin">⟳</span> Writing your post...
                  </span>) : '✨ Generate Post'}
              </button_1.Button>
            </card_1.CardContent>
          </card_1.Card>

          {result && (<card_1.Card className="bg-white/5 border-[#FFD700]/30">
              <card_1.CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <card_1.CardTitle className="text-white text-base">Your Post</card_1.CardTitle>
                  <div className="flex gap-2">
                    <button_1.Button size="sm" variant="outline" onClick={generate} className="border-white/10 text-white/50 hover:bg-white/5 text-xs">
                      ↻ Try Again
                    </button_1.Button>
                    <button_1.Button size="sm" onClick={copy} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-xs">
                      {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                    </button_1.Button>
                  </div>
                </div>
              </card_1.CardHeader>
              <card_1.CardContent>
                <p className="text-white font-semibold mb-3 text-sm">{result.title}</p>
                <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{result.body}</p>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <p className="text-white/30 text-xs">Suggested button: {result.call_to_action}</p>
                  <badge_1.Badge className="bg-white/5 text-white/30 text-xs border-0">
                    Copy this into your Google Business Profile
                  </badge_1.Badge>
                </div>
              </card_1.CardContent>
            </card_1.Card>)}
        </div>)}
    </div>);
}
