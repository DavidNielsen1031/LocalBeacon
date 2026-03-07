"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { useBusinessContext } from "@/components/business-context";
import { AddClientWizard } from "@/components/add-client-wizard";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "🏠" },
  { href: "/dashboard/posts", label: "GBP Posts", icon: "📍" },
  { href: "/dashboard/queue", label: "Upcoming Posts", icon: "📅" },
  { href: "/dashboard/pages", label: "Page Builder", icon: "🌐" },
  { href: "/dashboard/reviews", label: "Reviews", icon: "⭐" },
  { href: "/dashboard/blog", label: "Blog Posts", icon: "📝" },
  { href: "/dashboard/ai-readiness", label: "AI Readiness", icon: "🤖" },
  { href: "/dashboard/faq", label: "FAQ Builder", icon: "💬" },
  { href: "/dashboard/llms-txt", label: "AI Discovery File", icon: "📄" },
  { href: "/dashboard/audit", label: "Listing Health", icon: "🩺" },
  { href: "/dashboard/schema", label: "Schema Markup", icon: "🔗" },
  { href: "/dashboard/competitors", label: "Competitors", icon: "🏆" },
  { href: "/dashboard/reports", label: "Your Monthly Report", icon: "📊" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const {
    businesses,
    activeBusiness,
    switchBusiness,
    canAddBusiness,
    businessLimit,
  } = useBusinessContext();
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  const hasMultipleBusinesses = businesses.length > 1;

  return (
    <>
      <aside className="w-64 min-h-screen bg-[#111] border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🔦</span>
            <span className="font-bold text-[#FFD700] text-lg">
              LocalBeacon.ai
            </span>
          </Link>
        </div>

        {/* Client Switcher */}
        {businesses.length > 0 && (
          <div className="px-3 py-3 border-b border-white/10">
            <button
              onClick={() => setShowSwitcher(!showSwitcher)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left"
            >
              <span className="text-lg">🏢</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {activeBusiness?.name || "Select business"}
                </p>
                <p className="text-xs text-white/40 truncate">
                  {activeBusiness
                    ? `${activeBusiness.primary_city}, ${activeBusiness.primary_state}`
                    : "No business selected"}
                </p>
              </div>
              {(hasMultipleBusinesses || canAddBusiness) && (
                <span
                  className={`text-white/40 text-xs transition-transform ${
                    showSwitcher ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              )}
            </button>

            {/* Dropdown */}
            {showSwitcher && (
              <div className="mt-1 space-y-1">
                {businesses.map((biz) => (
                  <button
                    key={biz.id}
                    onClick={() => {
                      switchBusiness(biz.id);
                      setShowSwitcher(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      biz.id === activeBusiness?.id
                        ? "bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-xs">
                      {biz.id === activeBusiness?.id ? "●" : "○"}
                    </span>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="truncate font-medium">{biz.name}</p>
                      <p className="text-xs opacity-60 truncate">
                        {biz.primary_city}, {biz.primary_state}
                      </p>
                    </div>
                  </button>
                ))}

                {/* Add Client button */}
                {canAddBusiness ? (
                  <button
                    onClick={() => {
                      setShowSwitcher(false);
                      setShowWizard(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#FFD700]/70 hover:text-[#FFD700] hover:bg-[#FFD700]/5 transition-colors"
                  >
                    <span className="text-base">+</span>
                    <span>Add Client</span>
                  </button>
                ) : (
                  <div className="px-3 py-2 text-xs text-white/30">
                    {businessLimit} business{businessLimit === 1 ? "" : "es"} max
                    on your plan.{" "}
                    <Link
                      href="/pricing"
                      className="text-[#FFD700]/60 hover:text-[#FFD700] underline"
                    >
                      Upgrade
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User section */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40 truncate">Signed in</p>
          </div>
        </div>
      </aside>

      {/* Add Client Wizard */}
      <AddClientWizard
        open={showWizard}
        onOpenChange={setShowWizard}
        onComplete={(businessId) => {
          switchBusiness(businessId);
          setShowWizard(false);
        }}
      />
    </>
  );
}
