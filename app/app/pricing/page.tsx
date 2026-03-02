import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    tagline: "Try it out — see what LocalBeacon can do for your business.",
    outcomes: [
      "5 Google posts per month",
      "3 local city pages",
      "1 business location",
      "Copy & post to Google yourself",
    ],
    cta: "Connect Your Google Listing",
    href: "/sign-up",
    highlight: false,
  },
  {
    name: "Solo",
    price: "$49",
    period: "/month",
    tagline: "Hands-free local marketing. More calls, zero effort.",
    outcomes: [
      "Unlimited Google posts — auto-scheduled weekly",
      "10 local city pages with SEO optimization",
      "3 business locations",
      "AI-written review replies",
      "1 blog post per month for your website",
      "Monthly visibility report",
    ],
    cta: "Start Solo — $49/mo",
    href: "/sign-up",
    highlight: true,
  },
  {
    name: "Agency",
    price: "$99",
    period: "/month",
    tagline: "Run local marketing for all your clients under your brand.",
    outcomes: [
      "Everything in Solo — unlimited",
      "Unlimited client locations",
      "Multi-client dashboard",
      "White-label reports with your branding",
      "Competitor monitoring & alerts",
      "Priority support",
    ],
    cta: "Start Agency — $99/mo",
    href: "/sign-up",
    highlight: false,
  },
];

const faqs = [
  {
    q: "What if I don't have a Google listing yet?",
    a: "No problem! We'll help you set one up during onboarding. It's free through Google and takes about 5 minutes. LocalBeacon works best with a Google Business Profile, but you can start building content immediately.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — no contracts, no cancellation fees. Cancel from your dashboard anytime and your subscription ends at the end of the billing period.",
  },
  {
    q: "Will this work for my type of business?",
    a: "LocalBeacon works for any local service business — plumbers, HVAC technicians, dentists, roofers, lawyers, electricians, landscapers, chiropractors, and more. If people search Google to find businesses like yours, LocalBeacon helps.",
  },
  {
    q: "How is this different from hiring an SEO agency?",
    a: "An agency charges $800-1,500/month and you wait weeks to see anything happen. LocalBeacon does the same work — Google posts, local pages, review replies, rank tracking — for $49/month, and your first content is generated within minutes of signing up.",
  },
  {
    q: "Is the content written by AI? Will it sound fake?",
    a: "Our AI writes content specifically about your business, your services, and your local area — not generic filler. You can review and edit every post before it goes live. Most customers find it sounds better than what they'd write themselves.",
  },
  {
    q: "How does LocalBeacon compare to BrightLocal?",
    a: "BrightLocal costs $39-59/month per location and focuses on rank tracking and citations. LocalBeacon costs $49/month and does that PLUS auto-generates your Google posts, builds local city pages, and drafts review responses with AI. More features, lower price.",
  },
  {
    q: "What if I manage multiple clients? (Agency plan)",
    a: "The Agency plan gives you a multi-client dashboard where you manage all your clients from one place. White-label reports go out under your brand. Your clients never see LocalBeacon — they just see great results from their marketing agency.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🔦</span>
            <span className="text-xl font-bold text-[#FFD700]">LocalBeacon.ai</span>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold">
              Connect Your Google Listing
            </Button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="px-6 pt-20 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          More calls for less than <span className="text-[#FFD700]">$2/day</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
          Start free. Upgrade when you see the results. No contracts, cancel anytime.
        </p>

        {/* Comparison callout */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm mb-4">
          <span className="text-white/40">Compare:</span>
          <div className="flex items-center gap-1.5">
            <span className="text-white/60">SEO Agency</span>
            <span className="line-through text-white/30">$800–1,500/mo</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-white/60">BrightLocal</span>
            <span className="line-through text-white/30">$39–59/mo</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#FFD700] font-bold">LocalBeacon</span>
            <span className="text-[#FFD700] font-bold">$49/mo</span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <Card key={plan.name} className={`relative flex flex-col ${
              plan.highlight
                ? "bg-[#FFD700]/10 border-[#FFD700] shadow-lg shadow-[#FFD700]/10"
                : "bg-white/5 border-white/10"
            }`}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#FFD700] text-black font-bold px-4">Most Popular</Badge>
                </div>
              )}
              <CardContent className="p-6 pt-8 flex-1 flex flex-col">
                <p className="text-sm text-white/50 uppercase tracking-wider font-semibold">{plan.name}</p>
                <div className="flex items-baseline gap-1 mt-2 mb-1">
                  <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-white/50 text-sm">{plan.period}</span>
                </div>
                <p className="text-white/60 text-sm mb-6">{plan.tagline}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.outcomes.map(o => (
                    <li key={o} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="text-[#FFD700] mt-0.5 shrink-0">✓</span>
                      {o}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <Button className={`w-full font-semibold h-12 text-base ${
                    plan.highlight
                      ? "bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
                      : "border border-white/20 bg-transparent text-white hover:bg-white/10"
                  }`} variant={plan.highlight ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </Link>
                {plan.name === "Free" && (
                  <p className="text-white/30 text-xs text-center mt-2">No credit card required</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What you get section */}
      <section className="px-6 py-16 bg-white/[0.02] border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Everything included — no hidden fees</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
            {[
              { emoji: "📝", label: "AI-written Google posts" },
              { emoji: "🌐", label: "Local city pages" },
              { emoji: "⭐", label: "Review reply drafts" },
              { emoji: "📊", label: "Rank tracking" },
              { emoji: "📈", label: "Monthly reports" },
              { emoji: "🏷️", label: "SEO tags & structured data" },
              { emoji: "🔔", label: "Competitor alerts" },
              { emoji: "📱", label: "Works on mobile" },
              { emoji: "🎨", label: "White-label (Agency)" },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                <span className="text-xl">{f.emoji}</span>
                <span className="text-white/70 text-sm">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently asked <span className="text-[#FFD700]">questions</span>
          </h2>
          <div className="space-y-6">
            {faqs.map(faq => (
              <div key={faq.q} className="border-b border-white/10 pb-6">
                <h3 className="text-white font-semibold text-base mb-2">{faq.q}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get more calls?</h2>
          <p className="text-white/50 mb-6">Connect your Google listing and see your first posts in under 2 minutes.</p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold text-lg px-10 py-6">
              Connect Your Google Listing — Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🔦</span>
            <span className="font-bold text-[#FFD700]">LocalBeacon.ai</span>
          </Link>
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} Perpetual Agility LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
