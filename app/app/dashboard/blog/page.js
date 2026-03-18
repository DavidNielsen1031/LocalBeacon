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
exports.default = BlogPage;
exports.dynamic = 'force-dynamic';
var react_1 = require("react");
var BLOG_TYPES = [
    { value: 'seasonal', label: 'Seasonal Tips', desc: 'Timely advice your customers are searching for right now' },
    { value: 'faq', label: 'FAQ Article', desc: 'Answer the questions your customers actually ask' },
    { value: 'how_to', label: 'How-To Guide', desc: 'Step-by-step guides that build trust and rank on Google' },
    { value: 'local', label: 'Local Guide', desc: 'Neighborhood-specific content that wins "near me" searches' },
];
var DEMO_POSTS = [
    {
        id: '1',
        title: '5 Signs Your AC Needs Maintenance Before Summer',
        type: 'seasonal',
        city: 'Burnsville',
        wordCount: 850,
        status: 'ready',
        preview: "As temperatures start climbing in Burnsville and the surrounding south metro area, your air conditioning system is about to work overtime. Here are 5 warning signs that your AC needs professional attention before the summer rush hits...",
        faqs: [
            { q: 'How often should I service my AC?', a: 'Most HVAC professionals recommend servicing your AC at least once a year...' },
            { q: 'How much does AC maintenance cost in Burnsville?', a: 'A typical AC tune-up in the Burnsville area runs between $89-$150...' },
        ]
    },
    {
        id: '2',
        title: "Homeowner's Guide to Emergency Plumbing in Apple Valley",
        type: 'how_to',
        city: 'Apple Valley',
        wordCount: 1100,
        status: 'draft',
        preview: "A burst pipe at 2 AM is every Apple Valley homeowner's nightmare. Before you panic, here's exactly what to do — and when to call a professional. Step 1: Locate your main water shutoff valve...",
        faqs: [
            { q: 'What counts as a plumbing emergency?', a: 'Any situation involving uncontrolled water flow, sewage backup, or no water at all...' },
            { q: 'How fast can a plumber get to Apple Valley?', a: 'Most emergency plumbers in the south metro can arrive within 60-90 minutes...' },
        ]
    },
];
function BlogPage() {
    var _this = this;
    var _a = (0, react_1.useState)('seasonal'), selectedType = _a[0], setSelectedType = _a[1];
    var _b = (0, react_1.useState)(''), city = _b[0], setCity = _b[1];
    var _c = (0, react_1.useState)(''), topic = _c[0], setTopic = _c[1];
    var _d = (0, react_1.useState)(false), generating = _d[0], setGenerating = _d[1];
    var posts = (0, react_1.useState)(DEMO_POSTS)[0];
    var _e = (0, react_1.useState)(null), expandedPost = _e[0], setExpandedPost = _e[1];
    var handleGenerate = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setGenerating(true);
            // TODO: Wire to /api/blog endpoint
            setTimeout(function () { return setGenerating(false); }, 2000);
            return [2 /*return*/];
        });
    }); };
    return (<div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Blog Posts</h1>
        <p className="text-white/50">We write locally-optimized blog posts that rank on Google and bring in new customers.</p>
      </div>

      {/* Generator */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Write a New Post</h2>
        
        {/* Post type selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {BLOG_TYPES.map(function (t) { return (<button key={t.value} onClick={function () { return setSelectedType(t.value); }} className={"p-3 rounded-lg border text-left transition-all ".concat(selectedType === t.value
                ? 'border-[#FFD700]/50 bg-[#FFD700]/10'
                : 'border-white/10 hover:border-white/20')}>
              <span className={"text-sm font-medium ".concat(selectedType === t.value ? 'text-[#FFD700]' : 'text-white')}>
                {t.label}
              </span>
              <p className="text-xs text-white/40 mt-1">{t.desc}</p>
            </button>); })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-sm text-white/60 block mb-1.5">City or neighborhood</label>
            <input type="text" value={city} onChange={function (e) { return setCity(e.target.value); }} placeholder="e.g. Burnsville, Apple Valley" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:outline-none"/>
          </div>
          <div>
            <label className="text-sm text-white/60 block mb-1.5">Topic (optional — we'll pick one if blank)</label>
            <input type="text" value={topic} onChange={function (e) { return setTopic(e.target.value); }} placeholder="e.g. water heater maintenance, teeth whitening" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:outline-none"/>
          </div>
        </div>

        <button onClick={handleGenerate} disabled={generating} className="bg-[#FFD700] text-black font-semibold px-6 py-2.5 rounded-lg hover:bg-[#FFD700]/90 disabled:opacity-50 transition-all">
          {generating ? 'Writing...' : 'Write My Blog Post'}
        </button>
      </div>

      {/* Post list */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Your Blog Posts</h2>
        {posts.map(function (post) { return (<div key={post.id} className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
            <div className="p-5 cursor-pointer hover:bg-white/[0.02] transition-colors" onClick={function () { return setExpandedPost(expandedPost === post.id ? null : post.id); }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1">{post.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <span>📍 {post.city}</span>
                    <span>📄 ~{post.wordCount} words</span>
                    <span className={"px-2 py-0.5 rounded-full ".concat(post.status === 'ready' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400')}>
                      {post.status === 'ready' ? '✓ Ready to publish' : 'Draft'}
                    </span>
                  </div>
                </div>
                <span className="text-white/30 text-lg">{expandedPost === post.id ? '▲' : '▼'}</span>
              </div>
            </div>

            {expandedPost === post.id && (<div className="border-t border-white/10 p-5">
                <p className="text-white/70 text-sm mb-4 leading-relaxed">{post.preview}</p>

                {/* FAQ section */}
                {post.faqs.length > 0 && (<div className="mb-4">
                    <h4 className="text-sm font-medium text-[#FFD700] mb-2">FAQ Section (Schema Markup Included)</h4>
                    {post.faqs.map(function (faq, i) { return (<div key={i} className="mb-2 text-sm">
                        <p className="text-white/80 font-medium">Q: {faq.q}</p>
                        <p className="text-white/50 ml-4">A: {faq.a}</p>
                      </div>); })}
                  </div>)}

                <div className="flex gap-3">
                  <button className="bg-[#FFD700] text-black font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#FFD700]/90">
                    Copy HTML
                  </button>
                  <button className="border border-white/20 text-white/70 px-4 py-2 rounded-lg text-sm hover:bg-white/5">
                    Edit
                  </button>
                  <button className="border border-white/20 text-white/70 px-4 py-2 rounded-lg text-sm hover:bg-white/5">
                    Download
                  </button>
                </div>
              </div>)}
          </div>); })}
      </div>
    </div>);
}
