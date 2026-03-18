'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreshnessBadge = FreshnessBadge;
var link_1 = require("next/link");
function FreshnessBadge(_a) {
    var daysSinceLastPost = _a.daysSinceLastPost, status = _a.status, lastPostDate = _a.lastPostDate;
    // "No posts yet" state
    if (status === 'none' || daysSinceLastPost === null) {
        return (<div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/60">
        <span>📭</span>
        <span>No posts yet —</span>
        <link_1.default href="/dashboard/queue" className="text-[#FFD700] hover:underline font-medium">
          generate your first!
        </link_1.default>
      </div>);
    }
    var dayLabel = daysSinceLastPost === 0
        ? 'today'
        : daysSinceLastPost === 1
            ? '1 day ago'
            : "".concat(daysSinceLastPost, " days ago");
    if (status === 'fresh') {
        return (<div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-sm text-green-400">
        <span>✅</span>
        <span>Last post: {dayLabel}</span>
      </div>);
    }
    if (status === 'stale') {
        return (<div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-sm text-yellow-400">
        <span>⚠️</span>
        <span>Last post: {dayLabel} — Time to post!</span>
      </div>);
    }
    // critical
    return (<div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400">
      <span>🔴</span>
      <span>Last post: {dayLabel} — Your Google listing needs a new post!</span>
    </div>);
}
