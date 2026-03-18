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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamic = void 0;
exports.default = AuditPage;
exports.dynamic = 'force-dynamic';
var react_1 = require("react");
var AUDIT_ITEMS = [
    // High impact
    { id: 'name', category: 'Basics', label: 'Business name matches your real name', description: 'Your Google listing name should match your legal business name exactly. No keyword stuffing.', impact: 'high', completed: true },
    { id: 'address', category: 'Basics', label: 'Address is accurate and verified', description: 'Your address shows correctly on Google Maps and matches your website.', impact: 'high', completed: true },
    { id: 'phone', category: 'Basics', label: 'Phone number is correct and local', description: 'Use a local phone number, not a toll-free number. Customers trust local numbers more.', impact: 'high', completed: true },
    { id: 'hours', category: 'Basics', label: 'Business hours are up to date', description: 'Include regular hours AND special/holiday hours. Wrong hours = angry customers.', impact: 'high', completed: false },
    { id: 'categories', category: 'Basics', label: 'Primary category is correct', description: 'Your primary category is the #1 ranking factor for Google Maps. Make sure it matches your core service.', impact: 'high', completed: true },
    { id: 'website', category: 'Basics', label: 'Website link works and loads fast', description: 'Your website should load in under 3 seconds on mobile. Broken links kill trust.', impact: 'high', completed: true },
    // Medium impact
    { id: 'description', category: 'Content', label: 'Business description is filled out', description: 'Write a 750-character description mentioning your city, services, and what makes you different.', impact: 'medium', completed: false },
    { id: 'photos', category: 'Content', label: 'At least 10 photos uploaded', description: 'Businesses with 10+ photos get 42% more direction requests. Include your team, workspace, and finished work.', impact: 'medium', completed: false },
    { id: 'services', category: 'Content', label: 'Services list is complete', description: 'Add every service you offer with descriptions and price ranges. This helps Google match you to searches.', impact: 'medium', completed: true },
    { id: 'posts', category: 'Content', label: 'Posted in the last 7 days', description: 'Regular posts signal to Google that your business is active. We handle this for you automatically.', impact: 'medium', completed: true },
    { id: 'reviews_count', category: 'Reviews', label: 'At least 20 reviews', description: 'More reviews = higher ranking + more trust. Ask every happy customer to leave a review.', impact: 'medium', completed: false },
    { id: 'reviews_responded', category: 'Reviews', label: 'All reviews have responses', description: 'Responding to reviews (especially negative ones) shows customers you care. We draft these for you.', impact: 'medium', completed: true },
    { id: 'secondary_cats', category: 'Content', label: 'Secondary categories added', description: 'Add 2-5 secondary categories for related services. Example: a plumber might add "Water Heater Repair".', impact: 'medium', completed: false },
    // Low impact
    { id: 'products', category: 'Extras', label: 'Products/services with prices listed', description: 'Adding products with prices helps Google show rich results for your business.', impact: 'low', completed: false },
    { id: 'qanda', category: 'Extras', label: 'Q&A section has entries', description: 'Pre-populate your Q&A with common questions. This prevents competitors from posting misleading answers.', impact: 'low', completed: false },
    { id: 'attributes', category: 'Extras', label: 'Business attributes filled out', description: 'Attributes like "women-owned", "free estimates", "accepts credit cards" help you stand out.', impact: 'low', completed: false },
];
function AuditPage() {
    var _a = (0, react_1.useState)(AUDIT_ITEMS), items = _a[0], setItems = _a[1];
    var toggleItem = function (id) {
        setItems(function (prev) { return prev.map(function (item) {
            return item.id === id ? __assign(__assign({}, item), { completed: !item.completed }) : item;
        }); });
    };
    var completed = items.filter(function (i) { return i.completed; }).length;
    var total = items.length;
    var score = Math.round((completed / total) * 100);
    var highItems = items.filter(function (i) { return i.impact === 'high'; });
    var mediumItems = items.filter(function (i) { return i.impact === 'medium'; });
    var lowItems = items.filter(function (i) { return i.impact === 'low'; });
    var highCompleted = highItems.filter(function (i) { return i.completed; }).length;
    var medCompleted = mediumItems.filter(function (i) { return i.completed; }).length;
    var scoreColor = score >= 80 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400';
    var scoreBg = score >= 80 ? 'border-green-500/30' : score >= 50 ? 'border-yellow-500/30' : 'border-red-500/30';
    return (<div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Google Listing Health</h1>
        <p className="text-white/50">See how complete your Google listing is — and what to fix to show up higher in search.</p>
      </div>

      {/* Score card */}
      <div className={"bg-[#111] border ".concat(scoreBg, " rounded-xl p-8 mb-8 text-center")}>
        <div className={"text-6xl font-bold ".concat(scoreColor, " mb-2")}>{score}</div>
        <div className="text-white/50 text-lg mb-4">out of 100</div>
        <div className="flex justify-center gap-6 text-sm">
          <span className="text-white/60">✅ {completed} complete</span>
          <span className="text-white/60">⬜ {total - completed} remaining</span>
        </div>
        {score < 80 && (<p className="text-white/40 text-sm mt-4 max-w-md mx-auto">
            {score < 50
                ? "Your listing needs attention. Complete the high-impact items below to start showing up in more searches."
                : "You're getting there! Focus on the remaining items to maximize your visibility."}
          </p>)}
        {score >= 80 && (<p className="text-green-400/70 text-sm mt-4">Your listing is in great shape! Keep it up.</p>)}
      </div>

      {/* Priority breakdown */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#111] border border-white/10 rounded-xl p-4 text-center">
          <div className="text-red-400 text-sm font-medium mb-1">🔴 High Impact</div>
          <div className="text-white text-xl font-bold">{highCompleted}/{highItems.length}</div>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-4 text-center">
          <div className="text-yellow-400 text-sm font-medium mb-1">🟡 Medium Impact</div>
          <div className="text-white text-xl font-bold">{medCompleted}/{mediumItems.length}</div>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-4 text-center">
          <div className="text-blue-400 text-sm font-medium mb-1">🔵 Nice to Have</div>
          <div className="text-white text-xl font-bold">{lowItems.filter(function (i) { return i.completed; }).length}/{lowItems.length}</div>
        </div>
      </div>

      {/* Checklist sections */}
      {[
            { title: '🔴 Fix These First (Biggest Impact)', items: highItems, color: 'border-red-500/20' },
            { title: '🟡 Important Improvements', items: mediumItems, color: 'border-yellow-500/20' },
            { title: '🔵 Nice to Have', items: lowItems, color: 'border-blue-500/20' },
        ].map(function (section) { return (<div key={section.title} className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-3">{section.title}</h2>
          <div className={"bg-[#111] border ".concat(section.color, " rounded-xl overflow-hidden divide-y divide-white/5")}>
            {section.items.map(function (item) { return (<div key={item.id} className="flex items-start gap-4 p-4 hover:bg-white/[0.02] cursor-pointer transition-colors" onClick={function () { return toggleItem(item.id); }}>
                <div className={"w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ".concat(item.completed
                    ? 'bg-green-500/20 border-green-500/50 text-green-400'
                    : 'border-white/20 text-transparent hover:border-white/40')}>
                  {item.completed && '✓'}
                </div>
                <div className="flex-1">
                  <span className={"text-sm font-medium ".concat(item.completed ? 'text-white/40 line-through' : 'text-white')}>
                    {item.label}
                  </span>
                  <p className="text-xs text-white/30 mt-0.5">{item.description}</p>
                </div>
              </div>); })}
          </div>
        </div>); })}
    </div>);
}
