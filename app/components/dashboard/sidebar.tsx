"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

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

  return (
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

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
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
  );
}
