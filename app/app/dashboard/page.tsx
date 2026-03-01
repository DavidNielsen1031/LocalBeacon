export const dynamic = 'force-dynamic';
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName ?? "there";

  // TODO: Fetch real data from Supabase once business is created
  const hasBusiness = false; // Will be true after onboarding
  const businessName = "Your Business";

  // Activity feed — never empty. Shows what's happening or what to do next.
  const activity = hasBusiness
    ? [
        { icon: "✅", text: "4 Google posts generated for this week", time: "Just now", action: "/dashboard/posts" },
        { icon: "📄", text: "3 local city pages ready to review", time: "Today", action: "/dashboard/pages" },
        { icon: "⭐", text: "2 reviews waiting for your response", time: "Today", action: "/dashboard/reviews" },
      ]
    : [
        { icon: "🔗", text: "Connect your Google listing to get started", time: "First step", action: "/onboarding" },
        { icon: "📝", text: "We'll generate your first Google posts automatically", time: "After setup", action: null },
        { icon: "🌐", text: "Local city pages will be built for areas you serve", time: "After setup", action: null },
        { icon: "⭐", text: "Review replies will be drafted as new reviews come in", time: "After setup", action: null },
      ];

  const stats = hasBusiness
    ? [
        { label: "Google Posts", value: "4", sub: "scheduled this week", icon: "📍", href: "/dashboard/posts" },
        { label: "City Pages", value: "3", sub: "cities covered", icon: "🌐", href: "/dashboard/pages" },
        { label: "Reviews", value: "2", sub: "need your response", icon: "⭐", href: "/dashboard/reviews" },
        { label: "Visibility", value: "—", sub: "first report in 30 days", icon: "📊", href: "/dashboard/reviews" },
      ]
    : [
        { label: "Google Posts", value: "—", sub: "connect listing to start", icon: "📍", href: "/onboarding" },
        { label: "City Pages", value: "—", sub: "set up your service areas", icon: "🌐", href: "/onboarding" },
        { label: "Reviews", value: "—", sub: "we'll draft replies for you", icon: "⭐", href: "/onboarding" },
        { label: "Visibility", value: "—", sub: "first report in 30 days", icon: "📊", href: "/onboarding" },
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
              Here&apos;s what LocalBeacon is doing for <strong className="text-white">{businessName}</strong> this week.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white">
              Welcome, {firstName}! Let&apos;s get you set up.
            </h1>
            <p className="text-white/50 mt-1">
              Connect your Google listing and we&apos;ll start generating posts, pages, and review replies automatically.
            </p>
          </>
        )}
      </div>

      {/* Setup CTA — only show if no business */}
      {!hasBusiness && (
        <Card className="bg-[#FFD700]/5 border-[#FFD700]/30 mb-8">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Connect your Google listing</h3>
              <p className="text-white/50 text-sm">
                It takes 2 minutes. We&apos;ll auto-detect your business info and generate your first posts immediately.
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

      {/* Stats */}
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
          {hasBusiness ? "This Week" : "What happens after setup"}
        </h2>
        <div className="space-y-3">
          {activity.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                item.action
                  ? "bg-white/5 border-white/10 hover:border-[#FFD700]/30 cursor-pointer"
                  : "bg-white/[0.02] border-white/5"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className={`text-sm ${item.action ? 'text-white' : 'text-white/50'}`}>{item.text}</p>
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

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: hasBusiness ? "Review This Week's Posts" : "Generate Your First Posts",
              description: hasBusiness
                ? "4 posts are ready — review, edit, or let them auto-publish."
                : "Connect your Google listing and we'll create 4 posts instantly.",
              icon: "📝",
              href: hasBusiness ? "/dashboard/posts" : "/onboarding",
              cta: hasBusiness ? "View Posts" : "Get Started",
            },
            {
              title: "Add a City Page",
              description: "Create a local page to rank for searches in a specific city or neighborhood.",
              icon: "🌐",
              href: "/dashboard/pages",
              cta: "Add City",
            },
            {
              title: "Respond to Reviews",
              description: "Draft professional, thoughtful replies to your Google reviews with AI.",
              icon: "⭐",
              href: "/dashboard/reviews",
              cta: "View Reviews",
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
    </div>
  );
}
