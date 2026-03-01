export const dynamic = 'force-dynamic';
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  {
    label: "Posts This Week",
    value: "0",
    delta: "Get started →",
    href: "/dashboard/posts",
    icon: "📍",
  },
  {
    label: "Pages Created",
    value: "0",
    delta: "Create your first page →",
    href: "/dashboard/pages",
    icon: "🌐",
  },
  {
    label: "Reviews Pending",
    value: "0",
    delta: "Connect your GBP →",
    href: "/dashboard/reviews",
    icon: "⭐",
  },
  {
    label: "Avg. Rank Position",
    value: "—",
    delta: "Set up tracking →",
    href: "/dashboard/reviews",
    icon: "📊",
  },
];

const quickActions = [
  {
    title: "Create GBP Post",
    description: "AI-generate a post for your Google Business Profile",
    icon: "📍",
    href: "/dashboard/posts",
    cta: "Create Post",
  },
  {
    title: "Build a Landing Page",
    description: "Add a hyper-local page for a neighborhood or service",
    icon: "🌐",
    href: "/dashboard/pages",
    cta: "Build Page",
  },
  {
    title: "Reply to Reviews",
    description: "See pending reviews and send AI-drafted replies",
    icon: "⭐",
    href: "/dashboard/reviews",
    cta: "View Reviews",
  },
];

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName ?? "there";

  return (
    <div className="flex-1 px-6 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🔦</span>
          <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 text-xs">
            Free Plan
          </Badge>
        </div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {firstName}!
        </h1>
        <p className="text-white/50 mt-1">
          Here&apos;s your LocalBeacon.ai overview for today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="bg-white/5 border-white/10 hover:border-[#FFD700]/30 transition-colors"
          >
            <CardHeader className="pb-2">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <p className="text-xs text-white/50 uppercase tracking-wider font-medium">
                {stat.label}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <Link
                href={stat.href}
                className="text-xs text-[#FFD700] hover:underline mt-1 block"
              >
                {stat.delta}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.title}
              className="bg-white/5 border-white/10 flex flex-col"
            >
              <CardHeader className="pb-2">
                <div className="text-2xl mb-1">{action.icon}</div>
                <CardTitle className="text-white text-base">
                  {action.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-white/50 text-sm mb-4 flex-1">
                  {action.description}
                </p>
                <Link href={action.href}>
                  <Button
                    size="sm"
                    className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold"
                  >
                    {action.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Getting Started Checklist */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">
          Getting Started
        </h2>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {[
                {
                  done: false,
                  text: "Connect your Google Business Profile",
                  sub: "Link your GBP to start automating posts and tracking reviews.",
                },
                {
                  done: false,
                  text: "Create your first landing page",
                  sub: "Build a hyper-local page to rank for a specific neighborhood or service.",
                },
                {
                  done: false,
                  text: "Set up rank tracking",
                  sub: "Add keywords to track and watch your local rankings improve.",
                },
                {
                  done: false,
                  text: "Invite a team member",
                  sub: "Collaborate with your team on posts and pages.",
                },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                      item.done
                        ? "bg-[#FFD700] border-[#FFD700]"
                        : "border-white/20"
                    }`}
                  >
                    {item.done && (
                      <span className="text-black text-xs font-bold">✓</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{item.text}</p>
                    <p className="text-xs text-white/40 mt-0.5">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
