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
    <div className="bg-white border border-[#DFE6E9] rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[#636E72] text-xs font-semibold uppercase tracking-wider">
          Your Monthly Limit
        </p>
        <Link
          href="/pricing"
          className="text-[#FF6B35] text-xs font-semibold hover:underline"
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
        <span className="text-[#636E72]">{label}</span>
        <span className={atLimit ? "text-red-400 font-semibold" : "text-[#636E72]"}>
          {used}/{limit}
        </span>
      </div>
      <div className="h-1.5 bg-white rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            atLimit ? "bg-red-500" : "bg-[#FF6B35]"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
