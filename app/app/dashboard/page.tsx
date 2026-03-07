"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useBusinessContext } from "@/components/business-context";
import { FreshnessBadge } from "@/components/freshness-badge";
import { useEffect, useState } from "react";

interface DashboardData {
  postsCount: number;
  pagesCount: number;
  reviewsCount: number;
  aeoScore: number | null;
  recentItems: Array<{
    type: string;
    title: string;
    created_at: string;
  }>;
  freshness: {
    daysSinceLastPost: number | null;
    status: "fresh" | "stale" | "critical" | "none";
    lastPostDate: string | null;
  } | null;
}

export default function DashboardPage() {
  const { user } = useUser();
  const { activeBusiness, activeBusinessId } = useBusinessContext();
  const firstName = user?.firstName ?? "there";
  const hasBusiness = !!activeBusiness;

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeBusinessId) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/businesses/${activeBusinessId}/dashboard`)
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [activeBusinessId]);

  const stats = hasBusiness && data
    ? [
        { label: "Google Posts", value: String(data.postsCount), sub: "posts created", icon: "📍", href: "/dashboard/posts" },
        { label: "City Pages", value: String(data.pagesCount), sub: "cities covered", icon: "🌐", href: "/dashboard/pages" },
        { label: "Reviews", value: String(data.reviewsCount), sub: "replies drafted", icon: "⭐", href: "/dashboard/reviews" },
        { label: "AI Readiness", value: data.aeoScore !== null ? `${data.aeoScore}` : "—", sub: data.aeoScore !== null ? "out of 100" : "run your first scan", icon: "🤖", href: "/dashboard/ai-readiness" },
      ]
    : [
        { label: "Google Posts", value: "—", sub: "connect listing to start", icon: "📍", href: "/onboarding" },
        { label: "City Pages", value: "—", sub: "set up your service areas", icon: "🌐", href: "/onboarding" },
        { label: "Reviews", value: "—", sub: "we'll draft replies for you", icon: "⭐", href: "/onboarding" },
        { label: "AI Readiness", value: "—", sub: "scan your website", icon: "🤖", href: "/dashboard/ai-readiness" },
      ];

  const activity = hasBusiness && data && data.recentItems.length > 0
    ? data.recentItems.map((item) => ({
        icon: item.type === "gbp_post" ? "📝" : item.type === "city_page" ? "🌐" : item.type === "review_reply" ? "⭐" : "📄",
        text: item.title || `${item.type.replace("_", " ")} created`,
        time: new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        action: item.type === "gbp_post" ? "/dashboard/posts" : item.type === "city_page" ? "/dashboard/pages" : "/dashboard/reviews",
      }))
    : [
        { icon: "🔗", text: "Connect your Google listing to get started", time: "First step", action: "/onboarding" },
        { icon: "📝", text: "Generate your first Google post", time: "Step 2", action: "/dashboard/posts" },
        { icon: "🌐", text: "Build city pages for areas you serve", time: "Step 3", action: "/dashboard/pages" },
        { icon: "🤖", text: "Check your AI Readiness score", time: "Step 4", action: "/dashboard/ai-readiness" },
      ];

  return (
    <div className="flex-1 px-6 py-8 max-w-6xl">
      {/* Welcome banner */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🔦</span>
          <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 text-xs">
            Free Plan
          </Badge>
        </div>
        {hasBusiness ? (
          <>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {firstName}!
            </h1>
            <p className="text-white/50 mt-1">
              Here&apos;s what&apos;s happening with <strong className="text-white">{activeBusiness.name}</strong>.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white">
              Welcome, {firstName}! Let&apos;s get you set up.
            </h1>
            <p className="text-white/50 mt-1">
              Connect your Google listing and we&apos;ll start writing posts, pages, and review replies for your business.
            </p>
          </>
        )}

        {hasBusiness && data?.freshness && (
          <div className="mt-3">
            <FreshnessBadge
              daysSinceLastPost={data.freshness.daysSinceLastPost}
              status={data.freshness.status}
              lastPostDate={data.freshness.lastPostDate}
            />
          </div>
        )}
      </div>

      {/* Setup CTA — only show if no business */}
      {!hasBusiness && (
        <Card className="bg-[#FFD700]/5 border-[#FFD700]/30 mb-8">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Connect your Google listing</h3>
              <p className="text-white/50 text-sm">
                It takes 2 minutes. We&apos;ll auto-detect your business info and write your first posts immediately.
              </p>
            </div>
            <Link href="/onboarding">
              <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold whitespace-nowrap px-6">
                Connect Now →
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Loading state */}
      {loading && hasBusiness && (
        <div className="flex items-center justify-center py-12">
          <div className="text-white/40 text-sm">Loading dashboard...</div>
        </div>
      )}

      {/* Stats */}
      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map((stat) => (
              <Link key={stat.label} href={stat.href}>
                <Card className="bg-white/5 border-white/10 hover:border-[#FFD700]/30 transition-colors cursor-pointer h-full">
                  <CardContent className="p-5">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <p className="text-xs text-white/50 uppercase tracking-wider font-medium mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/40 mt-1">{stat.sub}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Activity Feed */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-white mb-4">
              {hasBusiness && data && data.recentItems.length > 0 ? "Recent Activity" : "Getting Started"}
            </h2>
            <div className="space-y-3">
              {activity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-lg border transition-colors bg-white/5 border-white/10 hover:border-[#FFD700]/30 cursor-pointer"
                >
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-white">{item.text}</p>
                  </div>
                  <span className="text-xs text-white/30">{item.time}</span>
                  {item.action && (
                    <Link href={item.action}>
                      <Button size="sm" variant="ghost" className="text-[#FFD700] hover:text-[#FFD700]/80 text-xs">
                        →
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Download Report */}
          {hasBusiness && (
            <div className="mb-10">
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">📄 Monthly Visibility Report</h3>
                    <p className="text-white/40 text-xs">
                      Download a PDF report for {activeBusiness?.name}. Share with clients or keep for your records.
                    </p>
                  </div>
                  <a
                    href={`/api/reports/pdf?businessId=${activeBusinessId}`}
                    download
                  >
                    <Button size="sm" className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold whitespace-nowrap px-6 text-xs">
                      Download Report
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: hasBusiness ? "Write New Posts" : "Generate Your First Posts",
                  description: hasBusiness
                    ? "Create fresh Google post drafts for your business."
                    : "Connect your Google listing and we'll write posts for you.",
                  icon: "📝",
                  href: hasBusiness ? "/dashboard/posts" : "/onboarding",
                  cta: hasBusiness ? "Write Posts" : "Get Started",
                },
                {
                  title: "Build a City Page",
                  description: "Create a local page to target searches in a specific city or neighborhood.",
                  icon: "🌐",
                  href: "/dashboard/pages",
                  cta: "Build Page",
                },
                {
                  title: "Check AI Readiness",
                  description: "Scan any URL and see how visible it is to AI search engines like ChatGPT.",
                  icon: "🤖",
                  href: "/dashboard/ai-readiness",
                  cta: "Run Scan",
                },
              ].map((action) => (
                <Card key={action.title} className="bg-white/5 border-white/10 flex flex-col">
                  <CardContent className="p-5 flex-1 flex flex-col">
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <h3 className="text-white font-semibold text-sm mb-1">{action.title}</h3>
                    <p className="text-white/40 text-xs mb-4 flex-1">{action.description}</p>
                    <Link href={action.href}>
                      <Button size="sm" className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-xs">
                        {action.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
