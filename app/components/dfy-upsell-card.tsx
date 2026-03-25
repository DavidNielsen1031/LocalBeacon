"use client";

import Link from "next/link";

interface DfyUpsellCardProps {
  dfyContext?: string;
}

export function DfyUpsellCard({ dfyContext }: DfyUpsellCardProps) {
  return (
    <div
      className="rounded-xl border p-5 mt-4"
      style={{
        background: "linear-gradient(135deg, #FFFDF5 0%, #FFF8E7 100%)",
        borderColor: "#D4A017",
      }}
    >
      {dfyContext && (
        <p className="text-sm font-medium mb-3" style={{ color: "#7A5A00" }}>
          {dfyContext}
        </p>
      )}

      <div className="flex items-center gap-2 mb-3">
        <span className="text-base font-bold" style={{ color: "#1B2A4A" }}>
          DFY Setup includes:
        </span>
      </div>

      <ul className="space-y-1.5 mb-4">
        {[
          "30-min live onboarding call",
          "15-25 custom FAQs for your business",
          "Schema markup + live installation walkthrough",
          "llms.txt + live deployment walkthrough",
          "Full AEO audit with prioritized fixes",
          "1 month of Solo included",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#2D3436" }}>
            <span style={{ color: "#B8860B", fontWeight: 700, marginTop: "1px" }}>✓</span>
            {item}
          </li>
        ))}
      </ul>

      <Link href="/pricing#dfy">
        <button
          className="w-full rounded-lg py-2.5 text-sm font-bold text-black transition-opacity hover:opacity-90"
          style={{
            background: "linear-gradient(90deg, #B8860B 0%, #FFD700 100%)",
          }}
        >
          Get Launch Package — $499 →
        </button>
      </Link>
    </div>
  );
}
