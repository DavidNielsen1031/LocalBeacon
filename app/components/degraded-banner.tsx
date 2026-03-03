"use client";

import { useEffect, useState } from "react";

export function DegradedBanner() {
  const [isDegraded, setIsDegraded] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch("/api/health", { cache: "no-store" });
        const data = await res.json();
        setIsDegraded(data.anthropic?.isDegraded === true);
      } catch {
        // If health endpoint fails, don't show banner — could be network issue
        setIsDegraded(false);
      }
    };

    checkHealth();
    // Re-check every 60 seconds
    const interval = setInterval(checkHealth, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!isDegraded) return null;

  return (
    <div className="bg-yellow-900/30 border-b border-yellow-700/50 px-4 py-2 text-center">
      <p className="text-yellow-200 text-sm">
        ⚠️ Some AI features are temporarily unavailable. Content you&apos;ve already generated is unaffected.
      </p>
    </div>
  );
}
