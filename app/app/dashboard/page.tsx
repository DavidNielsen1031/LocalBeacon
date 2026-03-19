"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useBusinessContext } from "@/components/business-context";
import { FreshnessBadge } from "@/components/freshness-badge";
import { useEffect, useState } from "react";
import {
  FileText,
  Globe,
  Star,
  Zap,
  Link as LinkIcon,
  PenLine,
  BarChart3,
  FileDown,
} from "lucide-react";

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
  const { activeBusiness, activeBusinessId, plan } = useBusinessContext();
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
    setData(null);
    fetch(`/api/businesses/${activeBusinessId}/dashboard`)
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [activeBusinessId]);

  const stats = hasBusiness && data
    ? [
        { label: "Google Posts", value: String(data.postsCount), sub: "posts created", Icon: FileText, href: "/dashboard/posts" },
        { label: "City Pages", value: String(data.pagesCount), sub: "cities covered", Icon: Globe, href: "/dashboard/pages" },
        { label: "Reviews", value: String(data.reviewsCount), sub: "replies drafted", Icon: Star, href: "/dashboard/reviews" },
        { label: "AI Readiness", value: data.aeoScore !== null ? `${data.aeoScore}` : "—", sub: data.aeoScore !== null ? "out of 100" : "run your first scan", Icon: Zap, href: "/dashboard/ai-readiness" },
      ]
    : [
        { label: "Google Posts", value: "—", sub: "connect listing to start", Icon: FileText, href: "/onboarding" },
        { label: "City Pages", value: "—", sub: "set up your service areas", Icon: Globe, href: "/onboarding" },
        { label: "Reviews", value: "—", sub: "we'll draft replies for you", Icon: Star, href: "/onboarding" },
        { label: "AI Readiness", value: "—", sub: "scan your website", Icon: Zap, href: "/dashboard/ai-readiness" },
      ];

  const activityIconMap: Record<string, typeof FileText> = {
    gbp_post: FileText,
    city_page: Globe,
    review_reply: Star,
  };

  const activity = hasBusiness && data && data.recentItems.length > 0
    ? data.recentItems.map((item) => ({
        Icon: activityIconMap[item.type] ?? FileText,
        text: item.title || `${item.type.replace("_", " ")} created`,
        time: new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        action: item.type === "gbp_post" ? "/dashboard/posts" : item.type === "city_page" ? "/dashboard/pages" : "/dashboard/reviews",
      }))
    : [
        { Icon: LinkIcon, text: "Connect your Google listing to get started", time: "First step", action: "/onboarding" },
        { Icon: PenLine, text: "Generate your first Google post", time: "Step 2", action: "/dashboard/posts" },
        { Icon: Globe, text: "Build city pages for areas you serve", time: "Step 3", action: "/dashboard/pages" },
        { Icon: Zap, text: "Check your AI Readiness score", time: "Step 4", action: "/dashboard/ai-readiness" },
      ];

  return (
    <div className="flex-1 px-6 py-8 max-w-6xl">
      {/* Welcome banner */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Badge
            className="text-xs border"
            style={{
              backgroundColor: "rgba(255,107,53,0.1)",
              color: "#FF6B35",
              borderColor: "rgba(255,107,53,0.3)",
            }}
          >
            {plan === "agency" ? "Agency Plan" : plan === "solo" ? "Solo Plan" : "Free Plan"}
          </Badge>
        </div>
        {hasBusiness ? (
          <>
            <h1 className="text-3xl font-bold" style={{ color: "#1B2A4A" }}>
              Welcome back, {firstName}!
            </h1>
            <p className="mt-1" style={{ color: "#636E72" }}>
              Here&apos;s what&apos;s happening with{" "}
              <strong style={{ color: "#1B2A4A" }}>{activeBusiness.name}</strong>.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold" style={{ color: "#1B2A4A" }}>
              Welcome, {firstName}! Let&apos;s get you set up.
            </h1>
            <p className="mt-1" style={{ color: "#636E72" }}>
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
        <Card
          className="mb-8 border"
          style={{ backgroundColor: "rgba(255,107,53,0.05)", borderColor: "rgba(255,107,53,0.2)" }}
        >
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg mb-1" style={{ color: "#1B2A4A" }}>
                Connect your Google listing
              </h3>
              <p className="text-sm" style={{ color: "#636E72" }}>
                It takes 2 minutes. We&apos;ll auto-detect your business info and write your first posts immediately.
              </p>
            </div>
            <Link href="/onboarding">
              <Button
                className="font-semibold whitespace-nowrap px-6 text-white"
                style={{ backgroundColor: "#FF6B35" }}
              >
                Connect Now →
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Loading state */}
      {loading && hasBusiness && (
        <div className="flex items-center justify-center py-12">
          <div className="text-sm" style={{ color: "#636E72" }}>
            Loading dashboard...
          </div>
        </div>
      )}

      {/* Stats */}
      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map((stat) => (
              <Link key={stat.label} href={stat.href}>
                <Card
                  className="rounded-xl border cursor-pointer h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  style={{
                    borderColor: "#DFE6E9",
                    background: "linear-gradient(180deg, #ffffff 0%, #FAF8F5 100%)",
                  }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg"
                        style={{ backgroundColor: "rgba(255,107,53,0.1)" }}
                      >
                        <stat.Icon size={18} style={{ color: "#FF6B35" }} />
                      </div>
                      <stat.Icon size={14} style={{ color: "#DFE6E9" }} />
                    </div>
                    <p className="text-3xl font-bold mb-0.5" style={{ color: "#1B2A4A" }}>
                      {stat.value}
                    </p>
                    <p className="text-xs uppercase tracking-wider font-medium" style={{ color: "#636E72" }}>
                      {stat.label}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#636E72", opacity: 0.7 }}>
                      {stat.sub}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Activity Feed */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4" style={{ color: "#1B2A4A" }}>
              {hasBusiness && data && data.recentItems.length > 0 ? "Recent Activity" : "Getting Started"}
            </h2>
            <div className="space-y-3">
              {activity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl border bg-white cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  style={{ borderColor: "#DFE6E9" }}
                >
                  <div
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                    style={{ backgroundColor: "rgba(255,107,53,0.08)" }}
                  >
                    <item.Icon size={15} style={{ color: "#FF6B35" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: "#2D3436" }}>
                      {item.text}
                    </p>
                  </div>
                  <span className="text-xs" style={{ color: "#636E72" }}>
                    {item.time}
                  </span>
                  {item.action && (
                    <Link href={item.action}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs"
                        style={{ color: "#FF6B35" }}
                      >
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
              <Card
                className="bg-white rounded-xl border shadow-sm"
                style={{ borderColor: "#DFE6E9" }}
              >
                <CardContent className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
                      style={{ backgroundColor: "rgba(255,107,53,0.1)" }}
                    >
                      <FileDown size={16} style={{ color: "#FF6B35" }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm" style={{ color: "#1B2A4A" }}>
                        Monthly Visibility Report
                      </h3>
                      <p className="text-xs" style={{ color: "#636E72" }}>
                        Download a PDF report for {activeBusiness?.name}. Share with clients or keep for your records.
                      </p>
                    </div>
                  </div>
                  <a href={`/api/reports/pdf?businessId=${activeBusinessId}`} download>
                    <Button
                      size="sm"
                      className="font-semibold whitespace-nowrap px-6 text-xs text-white"
                      style={{ backgroundColor: "#FF6B35" }}
                    >
                      Download Report
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold mb-4" style={{ color: "#1B2A4A" }}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: hasBusiness ? "Write New Posts" : "Generate Your First Posts",
                  description: hasBusiness
                    ? "Create fresh Google post drafts for your business."
                    : "Connect your Google listing and we'll write posts for you.",
                  Icon: PenLine,
                  href: hasBusiness ? "/dashboard/posts" : "/onboarding",
                  cta: hasBusiness ? "Write Posts" : "Get Started",
                },
                {
                  title: "Build a City Page",
                  description: "Create a local page to target searches in a specific city or neighborhood.",
                  Icon: Globe,
                  href: "/dashboard/pages",
                  cta: "Build Page",
                },
                {
                  title: "Check AI Readiness",
                  description: "Scan any URL and see how visible it is to AI search engines like ChatGPT.",
                  Icon: Zap,
                  href: "/dashboard/ai-readiness",
                  cta: "Run Scan",
                },
              ].map((action) => (
                <Card
                  key={action.title}
                  className="bg-white rounded-xl border flex flex-col transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  style={{ borderColor: "#DFE6E9" }}
                >
                  <CardContent className="p-5 flex-1 flex flex-col">
                    <div
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3"
                      style={{ backgroundColor: "rgba(255,107,53,0.1)" }}
                    >
                      <action.Icon size={18} style={{ color: "#FF6B35" }} />
                    </div>
                    <h3 className="font-semibold text-sm mb-1" style={{ color: "#1B2A4A" }}>
                      {action.title}
                    </h3>
                    <p className="text-xs mb-4 flex-1" style={{ color: "#636E72" }}>
                      {action.description}
                    </p>
                    <Link href={action.href}>
                      <Button
                        size="sm"
                        className="w-full font-semibold text-xs text-white transition-all duration-200 active:scale-[0.98]"
                        style={{ backgroundColor: "#FF6B35" }}
                      >
                        {action.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Monthly Report widget (extra) */}
          {hasBusiness && (
            <div className="mt-10">
              <Card
                className="bg-white rounded-xl border shadow-sm"
                style={{ borderColor: "#DFE6E9" }}
              >
                <CardContent className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
                      style={{ backgroundColor: "rgba(255,107,53,0.1)" }}
                    >
                      <BarChart3 size={16} style={{ color: "#FF6B35" }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm" style={{ color: "#1B2A4A" }}>
                        View Monthly Progress Report
                      </h3>
                      <p className="text-xs" style={{ color: "#636E72" }}>
                        See your score over time and track what's improving.
                      </p>
                    </div>
                  </div>
                  <Link href="/dashboard/reports">
                    <Button
                      size="sm"
                      variant="outline"
                      className="font-semibold whitespace-nowrap px-6 text-xs"
                      style={{ borderColor: "#FF6B35", color: "#FF6B35" }}
                    >
                      View Report
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
}
