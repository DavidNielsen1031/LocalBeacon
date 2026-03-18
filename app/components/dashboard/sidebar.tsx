"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { useBusinessContext } from "@/components/business-context";
import { AddClientWizard } from "@/components/add-client-wizard";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Globe,
  Star,
  BookOpen,
  Zap,
  HelpCircle,
  FileCode,
  Activity,
  Code,
  Users,
  BarChart3,
  Settings,
  Building2,
  ChevronDown,
  Plus,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", Icon: LayoutDashboard },
  { href: "/dashboard/posts", label: "GBP Posts", Icon: FileText },
  { href: "/dashboard/queue", label: "Upcoming Posts", Icon: Calendar },
  { href: "/dashboard/pages", label: "Page Builder", Icon: Globe },
  { href: "/dashboard/reviews", label: "Reviews", Icon: Star },
  { href: "/dashboard/blog", label: "Blog Posts", Icon: BookOpen },
  { href: "/dashboard/ai-readiness", label: "AI Readiness", Icon: Zap },
  { href: "/dashboard/faq", label: "FAQ Builder", Icon: HelpCircle },
  { href: "/dashboard/llms-txt", label: "AI Discovery File", Icon: FileCode },
  { href: "/dashboard/audit", label: "Listing Health", Icon: Activity },
  { href: "/dashboard/schema", label: "Schema Markup", Icon: Code },
  { href: "/dashboard/competitors", label: "Competitors", Icon: Users },
  { href: "/dashboard/reports", label: "Monthly Report", Icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", Icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const {
    businesses,
    activeBusiness,
    switchBusiness,
    refreshBusinesses,
    canAddBusiness,
    businessLimit,
  } = useBusinessContext();
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  const hasMultipleBusinesses = businesses.length > 1;

  return (
    <>
      <aside className="w-64 min-h-screen flex flex-col" style={{ backgroundColor: "#1B2A4A" }}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-192.png" alt="LocalBeacon" style={{ height: "32px", width: "32px" }} />
            <span className="font-bold text-lg" style={{ color: "#FAFAF7" }}>
              Local<span style={{ color: "#FF6B35" }}>Beacon</span>.ai
            </span>
          </Link>
        </div>

        {/* Client Switcher */}
        {businesses.length > 0 && (
          <div className="px-3 py-3 border-b border-white/10">
            <button
              onClick={() => setShowSwitcher(!showSwitcher)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left hover:bg-white/10"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <Building2 size={18} className="text-white/60 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {activeBusiness?.name || "Select business"}
                </p>
                <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {activeBusiness
                    ? `${activeBusiness.primary_city}, ${activeBusiness.primary_state}`
                    : "No business selected"}
                </p>
              </div>
              {(hasMultipleBusinesses || canAddBusiness) && (
                <ChevronDown
                  size={14}
                  className={`shrink-0 transition-transform text-white/40 ${showSwitcher ? "rotate-180" : ""}`}
                />
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
                        ? "border"
                        : "hover:bg-white/5"
                    }`}
                    style={
                      biz.id === activeBusiness?.id
                        ? {
                            backgroundColor: "rgba(255,107,53,0.1)",
                            borderColor: "rgba(255,107,53,0.3)",
                            color: "#FF6B35",
                          }
                        : { color: "rgba(255,255,255,0.6)" }
                    }
                  >
                    <span className="text-xs">{biz.id === activeBusiness?.id ? "●" : "○"}</span>
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
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5"
                    style={{ color: "rgba(255,107,53,0.7)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color = "#FF6B35")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,107,53,0.7)")
                    }
                  >
                    <Plus size={14} />
                    <span>Add Client</span>
                  </button>
                ) : (
                  <div className="px-3 py-2 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {businessLimit} business{businessLimit === 1 ? "" : "es"} max on your plan.{" "}
                    <Link
                      href="/pricing"
                      className="underline hover:text-white/60"
                      style={{ color: "rgba(255,107,53,0.6)" }}
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
          <ul className="space-y-0.5">
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
                      isActive ? "border-l-2" : "hover:bg-white/10"
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: "rgba(255,107,53,0.12)",
                            borderLeftColor: "#FF6B35",
                            color: "#FF6B35",
                          }
                        : { color: "rgba(255,255,255,0.7)", borderLeft: "2px solid transparent" }
                    }
                  >
                    <item.Icon size={16} className="shrink-0" />
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
            <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
              Signed in
            </p>
          </div>
        </div>
      </aside>

      {/* Add Client Wizard */}
      <AddClientWizard
        open={showWizard}
        onOpenChange={setShowWizard}
        onComplete={async (businessId) => {
          await refreshBusinesses();
          switchBusiness(businessId);
          setShowWizard(false);
        }}
      />
    </>
  );
}
