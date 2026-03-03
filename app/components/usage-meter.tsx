"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface UsageData {
  plan: string;
  posts: { used: number; limit: number | null };
  pages: { used: number; limit: number | null };
}

export function UsageMeter() {
  const [usage, setUsage] = useState<UsageData | null>(null);

  useEffect(() => {
    fetch("/api/businesses?include=usage")
      .then((res) => res.json())
      .then((data) => {
        if (data.usage) setUsage(data.usage);
      })
      .catch(() => {});
  }, []);

  if (!usage || usage.plan !== "free") return null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">
          Your Monthly Limit
        </p>
        <Link
          href="/pricing"
          className="text-[#FFD700] text-xs font-semibold hover:underline"
        >
          Upgrade →
        </Link>
      </div>
      <div className="space-y-2">
        <UsageBar
          label="Google Posts"
          used={usage.posts.used}
          limit={usage.posts.limit ?? 0}
        />
        <UsageBar
          label="City Pages"
          used={usage.pages.used}
          limit={usage.pages.limit ?? 0}
        />
      </div>
    </div>
  );
}

function UsageBar({
  label,
  used,
  limit,
}: {
  label: string;
  used: number;
  limit: number;
}) {
  const pct = limit > 0 ? Math.min(100, (used / limit) * 100) : 0;
  const atLimit = used >= limit;

  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-white/50">{label}</span>
        <span className={atLimit ? "text-red-400 font-semibold" : "text-white/50"}>
          {used}/{limit}
        </span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            atLimit ? "bg-red-500" : "bg-[#FFD700]"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
