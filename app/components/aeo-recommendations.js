'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AeoRecommendations = AeoRecommendations;
var link_1 = require("next/link");
var priorityConfig = {
    critical: {
        label: '🔴 Critical',
        bg: 'bg-red-500/5',
        border: 'border-red-500/20',
        badge: 'bg-red-500/10 text-red-400 border-red-500/30',
    },
    important: {
        label: '🟡 Important',
        bg: 'bg-yellow-500/5',
        border: 'border-yellow-500/20',
        badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    },
    'nice-to-have': {
        label: '⚪ Nice-to-have',
        bg: 'bg-white/[0.02]',
        border: 'border-white/10',
        badge: 'bg-white/5 text-white/50 border-white/10',
    },
};
function AeoRecommendations(_a) {
    var recommendations = _a.recommendations;
    if (recommendations.length === 0) {
        return (<div className="text-center py-8 bg-green-500/5 border border-green-500/20 rounded-xl">
        <span className="text-4xl block mb-2">🎉</span>
        <h3 className="text-lg font-bold text-green-400 mb-1">You&apos;re all set!</h3>
        <p className="text-white/50 text-sm">Your business is fully optimized for AI search engines.</p>
      </div>);
    }
    // Group by priority
    var groups = {
        critical: [],
        important: [],
        'nice-to-have': [],
    };
    for (var _i = 0, recommendations_1 = recommendations; _i < recommendations_1.length; _i++) {
        var rec = recommendations_1[_i];
        groups[rec.priority].push(rec);
    }
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">How to Improve Your Score</h2>
        <span className="text-xs text-white/30">{recommendations.length} recommendations</span>
      </div>

      {['critical', 'important', 'nice-to-have'].map(function (priority) {
            var items = groups[priority];
            if (items.length === 0)
                return null;
            var config = priorityConfig[priority];
            return (<div key={priority}>
            <div className="flex items-center gap-2 mb-3">
              <span className={"text-xs font-medium px-2 py-0.5 rounded-full border ".concat(config.badge)}>
                {config.label}
              </span>
              <span className="text-xs text-white/20">{items.length} item{items.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="space-y-2">
              {items.map(function (rec) { return (<div key={rec.signalId} className={"flex items-center justify-between gap-4 p-4 rounded-lg border ".concat(config.bg, " ").concat(config.border)}>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white text-sm">{rec.title}</h3>
                    <p className="text-white/40 text-xs mt-0.5">{rec.description}</p>
                  </div>
                  {rec.isInternal ? (<link_1.default href={rec.ctaUrl} className="shrink-0 px-4 py-2 bg-[#FFD700] text-black text-xs font-semibold rounded-lg hover:bg-[#FFD700]/90 transition-colors">
                      {rec.ctaLabel} →
                    </link_1.default>) : (<a href={rec.ctaUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 px-4 py-2 bg-white/10 text-white/70 text-xs font-medium rounded-lg hover:bg-white/15 transition-colors">
                      {rec.ctaLabel} ↗
                    </a>)}
                </div>); })}
            </div>
          </div>);
        })}
    </div>);
}
