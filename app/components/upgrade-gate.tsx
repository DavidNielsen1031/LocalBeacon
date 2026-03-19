"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { DfyUpsellCard } from "./dfy-upsell-card";

interface UpgradeGateProps {
  feature: string;
  currentPlan: string;
  requiredPlan: string;
  children: React.ReactNode;
  previewMode?: "blur" | "limit" | "lock";
  usageCount?: number;
  usageLimit?: number;
  suggestDfy?: boolean;
  dfyContext?: string;
}

function UpgradeCTA({ feature }: { feature: string }) {
  return (
    <div
      className="rounded-xl border p-6 flex flex-col items-center text-center"
      style={{
        backgroundColor: "rgba(255,107,53,0.04)",
        borderColor: "rgba(255,107,53,0.2)",
      }}
    >
      <p className="text-sm font-medium mb-1" style={{ color: "#2D3436" }}>
        Upgrade to Solo to access <strong>{feature}</strong>
      </p>
      <p className="text-xs mb-4" style={{ color: "#636E72" }}>
        Unlock unlimited access and all features for $49/mo.
      </p>
      <Link href="/pricing">
        <button
          className="rounded-lg px-5 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#FF6B35" }}
        >
          Upgrade — $49/mo →
        </button>
      </Link>
    </div>
  );
}

export function UpgradeGate({
  feature,
  currentPlan,
  requiredPlan,
  children,
  previewMode = "lock",
  usageCount = 0,
  usageLimit,
  suggestDfy = false,
  dfyContext,
}: UpgradeGateProps) {
  // If user is on required plan or above, render children directly
  const planOrder = ["free", "solo", "agency"];
  const currentIdx = planOrder.indexOf(currentPlan);
  const requiredIdx = planOrder.indexOf(requiredPlan);

  const isGated = currentIdx < requiredIdx;

  // ── BLUR mode ──────────────────────────────────────────────────────────────
  if (previewMode === "blur") {
    if (!isGated) return <>{children}</>;

    return (
      <div className="space-y-4">
        <div className="relative">
          <div style={{ filter: "blur(8px)", pointerEvents: "none", userSelect: "none" }}>
            {children}
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-xl border p-6 text-center shadow-md max-w-sm mx-4"
              style={{
                backgroundColor: "#FAFAF7",
                borderColor: "rgba(255,107,53,0.2)",
              }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: "#1B2A4A" }}>
                {feature}
              </p>
              <p className="text-xs mb-4" style={{ color: "#636E72" }}>
                Upgrade to Solo to access {feature}
              </p>
              <Link href="/pricing">
                <button
                  className="rounded-lg px-5 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#FF6B35" }}
                >
                  Upgrade — $49/mo →
                </button>
              </Link>
            </div>
          </div>
        </div>
        {suggestDfy && <DfyUpsellCard dfyContext={dfyContext} />}
      </div>
    );
  }

  // ── LIMIT mode ─────────────────────────────────────────────────────────────
  if (previewMode === "limit") {
    const atLimit = usageLimit !== undefined && usageCount >= usageLimit;
    const progressPct =
      usageLimit !== undefined && usageLimit > 0
        ? Math.min(100, Math.round((usageCount / usageLimit) * 100))
        : 0;

    if (!isGated) return <>{children}</>;

    return (
      <div className="space-y-4">
        {/* Usage counter */}
        {usageLimit !== undefined && (
          <div
            className="rounded-xl border p-4"
            style={{
              backgroundColor: atLimit ? "rgba(255,107,53,0.05)" : "rgba(27,42,74,0.03)",
              borderColor: atLimit ? "rgba(255,107,53,0.3)" : "#DFE6E9",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium" style={{ color: "#2D3436" }}>
                {feature} usage this month
              </span>
              <span className="text-xs font-bold" style={{ color: atLimit ? "#FF6B35" : "#1B2A4A" }}>
                {usageCount} of {usageLimit} used
              </span>
            </div>
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: "#DFE6E9" }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${progressPct}%`,
                  backgroundColor: atLimit ? "#FF6B35" : "#1B2A4A",
                }}
              />
            </div>
          </div>
        )}

        {atLimit ? (
          <>
            <UpgradeCTA feature={feature} />
            {suggestDfy && <DfyUpsellCard dfyContext={dfyContext} />}
          </>
        ) : (
          children
        )}
      </div>
    );
  }

  // ── LOCK mode ──────────────────────────────────────────────────────────────
  if (!isGated) return <>{children}</>;

  return (
    <div className="space-y-4">
      <div
        className="rounded-xl border p-8 flex flex-col items-center text-center"
        style={{
          backgroundColor: "#FAFAF7",
          borderColor: "#DFE6E9",
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: "rgba(255,107,53,0.12)" }}
        >
          <Lock size={24} style={{ color: "#FF6B35" }} />
        </div>
        <h3 className="text-base font-bold mb-1" style={{ color: "#1B2A4A" }}>
          {feature}
        </h3>
        <p className="text-sm mb-1" style={{ color: "#636E72" }}>
          Available on Solo plan
        </p>
        <p className="text-xs mb-5" style={{ color: "#636E72" }}>
          Upgrade to unlock {feature} and all other premium features.
        </p>
        <Link href="/pricing">
          <button
            className="rounded-lg px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#FF6B35" }}
          >
            Upgrade — $49/mo →
          </button>
        </Link>
      </div>
      {suggestDfy && <DfyUpsellCard dfyContext={dfyContext} />}
    </div>
  );
}
