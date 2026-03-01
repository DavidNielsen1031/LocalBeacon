import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: "📍",
    title: "GBP Post Automation",
    description:
      "AI-generated Google Business Profile posts tailored to your business. Schedule, publish, and track performance — all in one place.",
  },
  {
    icon: "🌐",
    title: "Local Page Builder",
    description:
      "Create SEO-optimized landing pages for every neighborhood you serve. Built for local search, not generic traffic.",
  },
  {
    icon: "⭐",
    title: "AI Review Replies",
    description:
      "Respond to every review instantly with personalized, on-brand replies. Never let a review go unanswered again.",
  },
  {
    icon: "📊",
    title: "Rank Tracking",
    description:
      "Know exactly where you rank in local search. Track keyword positions and watch your visibility grow week over week.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Get started with the basics.",
    features: [
      "1 location",
      "5 GBP posts/month",
      "3 landing pages",
      "Basic rank tracking",
    ],
    cta: "Get Started Free",
    href: "/sign-up",
    highlight: false,
  },
  {
    name: "Solo",
    price: "$29",
    period: "/month",
    description: "Everything you need to dominate local search.",
    features: [
      "3 locations",
      "Unlimited GBP posts",
      "Unlimited landing pages",
      "AI review replies",
      "PDF export",
      "Priority support",
    ],
    cta: "Start Solo",
    href: "/sign-up",
    highlight: true,
  },
  {
    name: "Agency",
    price: "$79",
    period: "/month",
    description: "Scale across every client you manage.",
    features: [
      "Unlimited locations",
      "White-label branding",
      "Multi-client management",
      "Everything in Solo",
      "Dedicated support",
      "Custom onboarding",
    ],
    cta: "Start Agency",
    href: "/sign-up",
    highlight: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔦</span>
            <span className="text-xl font-bold text-[#FFD700]">
              LocalBeacon.ai
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <Link href="#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/sign-in" className="hover:text-white transition-colors">
              Sign In
            </Link>
          </div>
          <Link href="/sign-up">
            <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold">
              Get Started Free
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 md:py-36 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 text-sm px-4 py-1">
            AI-Powered Local SEO
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Your local business,{" "}
            <span className="text-[#FFD700]">always visible.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10">
            LocalBeacon.ai automates your Google Business Profile, builds
            hyper-local landing pages, and replies to every review — so you rank
            higher and win more customers on autopilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold text-lg px-8 py-6"
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6"
              >
                See How It Works
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/40">
            No credit card required · Free forever plan available
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="text-[#FFD700]">own your local market</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              One platform. Every tool. Built specifically for local businesses
              that want to be found first.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="bg-white/5 border-white/10 hover:border-[#FFD700]/40 transition-colors"
              >
                <CardHeader>
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <CardTitle className="text-white text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, transparent <span className="text-[#FFD700]">pricing</span>
            </h2>
            <p className="text-white/60 text-lg">
              Start free. Upgrade when you&apos;re ready to grow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.highlight
                    ? "bg-[#FFD700]/10 border-[#FFD700] shadow-lg shadow-[#FFD700]/10"
                    : "bg-white/5 border-white/10"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#FFD700] text-black font-bold px-4">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="pt-8">
                  <p className="text-sm text-white/50 uppercase tracking-wider font-semibold">
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-extrabold text-white">
                      {plan.price}
                    </span>
                    <span className="text-white/50">{plan.period}</span>
                  </div>
                  <p className="text-white/60 text-sm mt-1">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-white/80"
                      >
                        <span className="text-[#FFD700]">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <Button
                      className={`w-full font-semibold ${
                        plan.highlight
                          ? "bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
                          : "border border-white/20 bg-transparent text-white hover:bg-white/10"
                      }`}
                      variant={plan.highlight ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 py-20 bg-[#FFD700]/5 border-y border-[#FFD700]/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to light up your local presence?
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Join hundreds of local businesses already using LocalBeacon.ai to
            rank higher, get more reviews, and win more customers.
          </p>
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold text-lg px-10 py-6"
            >
              Start for Free Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔦</span>
            <span className="font-bold text-[#FFD700]">LocalBeacon.ai</span>
            <span className="text-white/40 text-sm ml-2">
              Your local business, always visible.
            </span>
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <Link
              href="#features"
              className="hover:text-white/70 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="hover:text-white/70 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/sign-in"
              className="hover:text-white/70 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="hover:text-white/70 transition-colors"
            >
              Sign Up
            </Link>
          </div>
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} LocalBeacon.ai. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
