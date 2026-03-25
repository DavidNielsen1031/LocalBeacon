"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useBusinessContext } from "@/components/business-context";
import { FreshnessBadge } from "@/components/freshness-badge";
import { GscCard } from "@/components/gsc-card";
import { AiUpdatesCard } from "@/components/ai-updates-card";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileText,
  Globe,
  Star,
  Zap,
  Link as LinkIcon,
  PenLine,
  BarChart3,
  FileDown,
  CalendarCheck,
  Copy,
  Check,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import { AUTOPILOT_MONTHLY_PRICE } from "@/lib/plans";

const ORANGE = "#FF6B35";
const NAVY = "#1B2A4A";
const SLATE = "#636E72";
const MIST = "#DFE6E9";

interface DashboardData {
  postsCount: number;
  pagesCount: number;
  reviewsCount: number;
  aeoScore: number | null;
  recentItems: Array<{
    type: string;
    title: string;
    content?: string;
    created_at: string;
  }>;
  freshness: {
    daysSinceLastPost: number | null;
    status: "fresh" | "stale" | "critical" | "none";
    lastPostDate: string | null;
  } | null;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button
      size="sm"
      onClick={handleCopy}
      className="font-semibold text-xs text-white gap-1"
      style={{ backgroundColor: copied ? "#16a34a" : ORANGE }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : "Copy to Clipboard"}
    </Button>
  );
}

export default function DashboardPage() {
  const { user } = useUser();
  const { activeBusiness, activeBusinessId, plan } = useBusinessContext();
  const firstName = user?.firstName ?? "there";
  const hasBusiness = !!activeBusiness;
  const searchParams = useSearchParams();

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // DFY success banner
  const [dfySuccess, setDfySuccess] = useState(false);
  const [dfyBannerDismissed, setDfyBannerDismissed] = useState(false);
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? null;

  // Welcome email on first visit
  const userInitRef = useRef(false);

  useEffect(() => {
    if (searchParams.get("upgraded") === "dfy" || searchParams.get("checkout") === "success") {
      setDfySuccess(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!userInitRef.current && user?.id) {
      userInitRef.current = true;
      fetch("/api/user/init", { method: "POST" }).catch(() => {});
    }
  }, [user?.id]);

  useEffect(() => {
    if (!activeBusinessId) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setData(null);
    setError(null);
    fetch(`/api/businesses/${activeBusinessId}/dashboard`)
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => setData(d))
      .catch(() => { setData(null); setError("Something went wrong. Please try again."); })
      .finally(() => setLoading(false));
  }, [activeBusinessId]);

  const [upgradeBannerDismissed, setUpgradeBannerDismissed] = useState(false);
  const [upgradeLoading, setUpgradeLoading] = useState(false);

  const handleUpgradeClick = async () => {
    setUpgradeLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "SOLO" }),
      });
      const d = await res.json();
      if (d.url) { window.location.href = d.url; return; }
    } catch {}
    setUpgradeLoading(false);
  };

  // Extract actionable items (posts/reviews to copy/post)
  const readyPosts = data?.recentItems?.filter((i) => i.type === "gbp_post").slice(0, 2) ?? [];
  const readyReviews = data?.recentItems?.filter((i) => i.type === "review_reply").slice(0, 2) ?? [];
  const publishedBlogs = data?.recentItems?.filter((i) => i.type === "blog_post").slice(0, 3) ?? [];
  const publishedPages = data?.recentItems?.filter((i) => i.type === "city_page").slice(0, 3) ?? [];

  return (
    <div className="flex-1 px-6 py-8 max-w-5xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>
      )}

      {/* DFY success banner */}
      {dfySuccess && !dfyBannerDismissed && (
        <div
          className="mb-6 rounded-xl border overflow-hidden"
          style={{ backgroundColor: "rgba(34,197,94,0.06)", borderColor: "rgba(34,197,94,0.3)" }}
        >
          <div className="px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <CalendarCheck size={22} className="mt-0.5 shrink-0" style={{ color: "#16a34a" }} />
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ color: "#15803d" }}>
                    🎉 Welcome to LocalBeacon!
                  </h3>
                  <p className="text-sm mb-3" style={{ color: NAVY }}>
                    Your Launch Package is active. Book your strategy call so we can get started.
                  </p>
                  {bookingUrl ? (
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-semibold text-sm text-white px-5 py-2.5 rounded-lg"
                      style={{ backgroundColor: "#16a34a" }}
                    >
                      <CalendarCheck size={15} />
                      Book Your Strategy Call →
                    </a>
                  ) : (
                    <p className="text-sm font-medium" style={{ color: SLATE }}>
                      Our team will reach out within 1 business day to schedule your call.
                    </p>
                  )}
                </div>
              </div>
              <button onClick={() => setDfyBannerDismissed(true)} className="text-xs shrink-0" style={{ color: SLATE }}>
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Free plan upgrade banner */}
      {plan === "free" && !upgradeBannerDismissed && (
        <div
          className="mb-6 rounded-xl border flex items-center justify-between gap-4 px-5 py-3"
          style={{ backgroundColor: "rgba(255,107,53,0.06)", borderColor: "rgba(255,107,53,0.25)" }}
        >
          <p className="text-sm" style={{ color: NAVY }}>
            You&apos;re on the <strong>Free plan</strong>. Upgrade to Pro for full access —{" "}
            <button
              onClick={handleUpgradeClick}
              disabled={upgradeLoading}
              className="font-bold underline disabled:opacity-50 cursor-pointer"
              style={{ color: ORANGE }}
            >
              {upgradeLoading ? "Loading..." : `${AUTOPILOT_MONTHLY_PRICE}/mo →`}
            </button>
          </p>
          <button onClick={() => setUpgradeBannerDismissed(true)} className="text-xs shrink-0" style={{ color: SLATE }}>
            ✕
          </button>
        </div>
      )}

      {/* Welcome + plan badge */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Badge
            className="text-xs border"
            style={{
              backgroundColor: "rgba(255,107,53,0.1)",
              color: ORANGE,
              borderColor: "rgba(255,107,53,0.3)",
            }}
          >
            {plan === "solo" ? "LocalBeacon Pro" : "Free Plan"}
          </Badge>
        </div>
        {hasBusiness ? (
          <>
            <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
              Welcome back, {firstName}!
            </h1>
            <p className="mt-1 text-sm" style={{ color: SLATE }}>
              Here&apos;s what&apos;s happening with <strong style={{ color: NAVY }}>{activeBusiness.name}</strong>.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
              Welcome, {firstName}! Let&apos;s get you set up.
            </h1>
            <p className="mt-1 text-sm" style={{ color: SLATE }}>
              Connect your Google listing and we&apos;ll start creating content for your business.
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
        <Card className="mb-8 border" style={{ backgroundColor: "rgba(255,107,53,0.05)", borderColor: "rgba(255,107,53,0.2)" }}>
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg mb-1" style={{ color: NAVY }}>Connect your Google listing</h3>
              <p className="text-sm" style={{ color: SLATE }}>
                It takes 2 minutes. We&apos;ll auto-detect your business info and start creating content immediately.
              </p>
            </div>
            <Link href="/onboarding">
              <Button className="font-semibold whitespace-nowrap px-6 text-white" style={{ backgroundColor: ORANGE }}>
                Connect Now →
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {loading && hasBusiness && (
        <div className="flex items-center justify-center py-12">
          <div className="text-sm" style={{ color: SLATE }}>Loading dashboard...</div>
        </div>
      )}

      {!loading && (
        <>
          {/* ─── Hero: AI Readiness Score ─── */}
          <Card
            className="mb-6 border overflow-hidden"
            style={{
              borderColor: MIST,
              background: "linear-gradient(135deg, #ffffff 0%, #FAF8F5 50%, rgba(255,107,53,0.04) 100%)",
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap size={16} style={{ color: ORANGE }} />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: SLATE }}>
                      AI Readiness Score
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold" style={{ color: NAVY }}>
                      {data?.aeoScore ?? "—"}
                    </span>
                    <span className="text-lg" style={{ color: SLATE }}>/100</span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: SLATE }}>
                    {data?.aeoScore
                      ? "How visible your business is to AI search engines"
                      : "Run your first scan to see your score"}
                  </p>
                </div>
                <Link href="/dashboard/ai-readiness">
                  <Button size="sm" variant="outline" className="text-xs font-semibold" style={{ borderColor: ORANGE, color: ORANGE }}>
                    {data?.aeoScore ? "Re-scan" : "Run Scan"} →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* ─── Stats row ─── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Google Posts", value: data?.postsCount ?? 0, Icon: FileText },
              { label: "City Pages", value: data?.pagesCount ?? 0, Icon: Globe },
              { label: "Review Replies", value: data?.reviewsCount ?? 0, Icon: Star },
              { label: "Blog Posts", value: publishedBlogs.length, Icon: BookOpen },
            ].map((stat) => (
              <Card key={stat.label} className="border" style={{ borderColor: MIST }}>
                <CardContent className="p-4 text-center">
                  <stat.Icon size={16} className="mx-auto mb-1" style={{ color: ORANGE }} />
                  <p className="text-2xl font-bold" style={{ color: NAVY }}>{stat.value}</p>
                  <p className="text-[11px] uppercase tracking-wider" style={{ color: SLATE }}>{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ─── Action Card: Ready for You ─── */}
          {hasBusiness && (readyPosts.length > 0 || readyReviews.length > 0) && (
            <Card className="mb-6 border" style={{ borderColor: ORANGE, boxShadow: `0 2px 12px ${ORANGE}10` }}>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: ORANGE }} />
                  <h2 className="font-bold text-sm" style={{ color: NAVY }}>Ready for You</h2>
                  <span className="text-xs" style={{ color: SLATE }}>— copy & post to your Google listing</span>
                </div>

                {readyPosts.map((post, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-4 mb-3"
                    style={{ backgroundColor: "rgba(255,107,53,0.04)", border: `1px solid ${MIST}` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <Badge className="text-[10px] mb-2" style={{ backgroundColor: "rgba(255,107,53,0.1)", color: ORANGE }}>
                          Google Post
                        </Badge>
                        <p className="text-sm" style={{ color: NAVY }}>{post.title}</p>
                        {post.content && (
                          <p className="text-xs mt-1 line-clamp-3" style={{ color: SLATE }}>{post.content}</p>
                        )}
                      </div>
                      {post.content && <CopyButton text={post.content} />}
                    </div>
                  </div>
                ))}

                {readyReviews.map((review, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-4 mb-3"
                    style={{ backgroundColor: "rgba(250,204,21,0.04)", border: `1px solid ${MIST}` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <Badge className="text-[10px] mb-2" style={{ backgroundColor: "rgba(250,204,21,0.15)", color: "#a16207" }}>
                          Review Reply
                        </Badge>
                        <p className="text-sm" style={{ color: NAVY }}>{review.title}</p>
                        {review.content && (
                          <p className="text-xs mt-1 line-clamp-3" style={{ color: SLATE }}>{review.content}</p>
                        )}
                      </div>
                      {review.content && <CopyButton text={review.content} />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* ─── Progress: What Pro published ─── */}
          {hasBusiness && (publishedBlogs.length > 0 || publishedPages.length > 0) && (
            <Card className="mb-6 border" style={{ borderColor: MIST }}>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={16} style={{ color: "#16a34a" }} />
                  <h2 className="font-bold text-sm" style={{ color: NAVY }}>Published This Month</h2>
                </div>
                <div className="space-y-2">
                  {publishedBlogs.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: `1px solid ${MIST}` }}>
                      <BookOpen size={14} style={{ color: ORANGE }} />
                      <span className="text-sm flex-1" style={{ color: NAVY }}>{item.title}</span>
                      <span className="text-xs" style={{ color: SLATE }}>
                        {new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  ))}
                  {publishedPages.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: `1px solid ${MIST}` }}>
                      <Globe size={14} style={{ color: ORANGE }} />
                      <span className="text-sm flex-1" style={{ color: NAVY }}>{item.title}</span>
                      <span className="text-xs" style={{ color: SLATE }}>
                        {new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard/content">
                  <Button size="sm" variant="ghost" className="text-xs mt-3" style={{ color: ORANGE }}>
                    View all content →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* ─── Google Search Console ─── */}
          {hasBusiness && (
            <div className="mb-6">
              <GscCard />
            </div>
          )}

          {/* ─── AI Search Updates ─── */}
          <div className="mb-6">
            <AiUpdatesCard plan={plan} />
          </div>

          {/* ─── Monthly Report ─── */}
          {hasBusiness && (
            <Card className="mb-6 border" style={{ borderColor: MIST }}>
              <CardContent className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
                    style={{ backgroundColor: "rgba(255,107,53,0.1)" }}
                  >
                    <BarChart3 size={16} style={{ color: ORANGE }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: NAVY }}>Monthly Intelligence Report</h3>
                    <p className="text-xs" style={{ color: SLATE }}>Score trends, competitor tracking, and what we published.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={`/api/reports/pdf?businessId=${activeBusinessId}`} download>
                    <Button size="sm" variant="outline" className="text-xs font-semibold" style={{ borderColor: ORANGE, color: ORANGE }}>
                      <FileDown size={12} className="mr-1" /> PDF
                    </Button>
                  </a>
                  <Link href="/dashboard/reports">
                    <Button size="sm" className="text-xs font-semibold text-white" style={{ backgroundColor: ORANGE }}>
                      View Report →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ─── Getting Started (no business) ─── */}
          {!hasBusiness && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold" style={{ color: NAVY }}>Getting Started</h2>
              {[
                { Icon: LinkIcon, text: "Connect your Google listing to get started", action: "/onboarding" },
                { Icon: PenLine, text: "Generate your first Google post", action: "/dashboard/posts" },
                { Icon: Globe, text: "Build city pages for areas you serve", action: "/dashboard/pages" },
                { Icon: Zap, text: "Check your AI Readiness score", action: "/dashboard/ai-readiness" },
              ].map((item, i) => (
                <Link key={i} href={item.action}>
                  <div
                    className="flex items-center gap-4 p-4 rounded-xl border bg-white cursor-pointer transition-all hover:shadow-sm"
                    style={{ borderColor: MIST }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(255,107,53,0.08)" }}>
                      <item.Icon size={15} style={{ color: ORANGE }} />
                    </div>
                    <span className="text-sm flex-1" style={{ color: NAVY }}>{item.text}</span>
                    <span className="text-xs" style={{ color: ORANGE }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
