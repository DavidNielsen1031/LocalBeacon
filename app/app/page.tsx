import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const outcomes = [
  {
    icon: "📍",
    title: "More calls from Google Maps",
    description: "We post to your Google listing every week so you stay at the top when people search nearby.",
  },
  {
    icon: "🔍",
    title: 'More calls from "near me" searches',
    description: "We create local pages for every city and neighborhood you serve — so you show up everywhere.",
  },
  {
    icon: "🤖",
    title: "Found by AI assistants",
    description: "When someone asks Siri, ChatGPT, or Google AI for a recommendation — your business shows up.",
  },
  {
    icon: "⭐",
    title: "Your reviews work harder",
    description: "We reply to every review so Google knows you're active and new customers trust you.",
  },
  {
    icon: "📊",
    title: "See exactly what's working",
    description: "A monthly report shows how many people found you, where they came from, and what's improving.",
  },
];

const withoutVsWith = {
  without: [
    "You forget to post for weeks — Google thinks you're inactive",
    "Competitors show up above you in search results",
    "Bad reviews sit unanswered — scaring away new customers",
    "You have no idea if anything you're doing is working",
    "You spend hours on marketing instead of running your business",
  ],
  with: [
    "Fresh posts go out every week — automatically",
    "Local pages help you rank in every city you serve",
    "Every review gets a thoughtful, professional reply",
    "Monthly reports prove your visibility is growing",
    "You focus on your business — we handle the rest",
  ],
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    tagline: "Try it out — see what LocalBeacon can do.",
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
    price: "$29",
    period: "/month",
    tagline: "Hands-free local marketing for your business.",
    outcomes: [
      "Unlimited Google posts — auto-scheduled weekly",
      "10 local city pages with SEO optimization",
      "3 business locations",
      "AI-written review replies",
      "1 blog post per month",
      "Monthly visibility report",
    ],
    cta: "Start Solo — $29/mo",
    href: "/sign-up",
    highlight: true,
  },
  {
    name: "Agency",
    price: "$79",
    period: "/month",
    tagline: "Run local marketing for all your clients.",
    outcomes: [
      "Everything in Solo — unlimited",
      "Unlimited client locations",
      "Multi-client dashboard",
      "White-label reports with your branding",
      "Competitor monitoring & alerts",
      "Priority support",
    ],
    cta: "Start Agency — $79/mo",
    href: "/sign-up",
    highlight: false,
  },
];

const faqs = [
  {
    q: "What if I don't have a Google listing yet?",
    a: "No problem! We'll help you create one during setup. It's free through Google and takes about 5 minutes.",
  },
  {
    q: "Will this actually get me more phone calls?",
    a: "Yes — businesses that post weekly to Google and have active review responses consistently rank higher in local search, which means more calls. Our monthly report tracks this so you can see the difference.",
  },
  {
    q: "Is the content written by AI? Will it sound fake?",
    a: "Our AI writes content specifically about your business, your services, and your city — not generic filler. Every post mentions real local details. You can review and edit anything before it goes live.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts, no commitments. Cancel anytime from your dashboard.",
  },
  {
    q: "I'm not tech-savvy. Is this complicated?",
    a: "Not at all. Connect your Google account, confirm your business info, and we handle the rest. Most people are set up in under 2 minutes.",
  },
  {
    q: "How is this different from hiring an SEO agency?",
    a: "An agency charges $800-1,500/month and you wait weeks for results. LocalBeacon does the same work — Google posts, local pages, review replies, rank tracking — for $29/month, starting immediately.",
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
            <span className="text-xl font-bold text-[#FFD700]">LocalBeacon.ai</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/sign-in" className="hover:text-white transition-colors">Sign In</Link>
          </div>
          <Link href="/sign-up">
            <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold">
              Connect Your Google Listing
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 md:py-36 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Your phone rings more.{" "}
            <span className="text-[#FFD700]">We handle everything.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10">
            LocalBeacon posts to your Google listing every week, creates local pages
            for every city you serve, and replies to your reviews — so you get found
            by more customers without lifting a finger.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold text-lg px-10 py-6">
              Connect Your Google Listing — Free
            </Button>
          </Link>
          <p className="mt-4 text-sm text-white/40">
            No credit card required · Set up in under 2 minutes
          </p>
        </div>
      </section>

      {/* Social proof placeholder */}
      <section className="border-y border-white/10 py-6 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 text-white/30 text-sm">
          <span>Trusted by local businesses across the US</span>
          <span>•</span>
          <span>Plumbers · HVAC · Dentists · Roofers · Lawyers</span>
        </div>
      </section>

      {/* 5 Outcomes */}
      <section id="how-it-works" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What LocalBeacon does <span className="text-[#FFD700]">for you</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Five things that get you more customers — all on autopilot.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {outcomes.map((o, i) => (
              <Card key={o.title} className={`bg-white/5 border-white/10 hover:border-[#FFD700]/30 transition-colors ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">{o.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{o.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{o.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="px-6 py-20 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-white/40">Without LocalBeacon</span> vs <span className="text-[#FFD700]">With LocalBeacon</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
              <h3 className="text-red-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span>😓</span> Without LocalBeacon
              </h3>
              <ul className="space-y-3">
                {withoutVsWith.without.map(item => (
                  <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
                    <span className="text-red-400 mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-xl p-6">
              <h3 className="text-[#FFD700] font-bold text-lg mb-4 flex items-center gap-2">
                <span>🔦</span> With LocalBeacon
              </h3>
              <ul className="space-y-3">
                {withoutVsWith.with.map(item => (
                  <li key={item} className="flex items-start gap-2 text-white/80 text-sm">
                    <span className="text-[#FFD700] mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple pricing. <span className="text-[#FFD700]">Real results.</span>
            </h2>
            <p className="text-white/50 text-lg">
              Start free, upgrade anytime. No contracts.
            </p>
          </div>

          {/* Comparison callout */}
          <div className="text-center mb-12">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm">
              <span className="text-white/40">Compared to:</span>
              <span className="text-white/60">Hiring an agency <span className="line-through text-white/30">$800–1,500/mo</span></span>
              <span className="text-white/20">|</span>
              <span className="text-white/60">BrightLocal <span className="line-through text-white/30">$39–59/mo</span> <span className="text-white/30">(fewer features)</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-white/50 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-white/60 text-sm mb-6">{plan.tagline}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.outcomes.map(o => (
                      <li key={o} className="flex items-start gap-2 text-sm text-white/80">
                        <span className="text-[#FFD700] mt-0.5">✓</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <Button className={`w-full font-semibold ${
                      plan.highlight
                        ? "bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
                        : "border border-white/20 bg-transparent text-white hover:bg-white/10"
                    }`} variant={plan.highlight ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Questions? <span className="text-[#FFD700]">We've got answers.</span>
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
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for more calls and less work?
          </h2>
          <p className="text-white/50 text-lg mb-8">
            Connect your Google listing and see your first posts generated in under 2 minutes.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold text-lg px-10 py-6">
              Connect Your Google Listing — Free
            </Button>
          </Link>
          <p className="mt-3 text-white/30 text-xs">No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔦</span>
            <span className="font-bold text-[#FFD700]">LocalBeacon.ai</span>
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="#how-it-works" className="hover:text-white/70 transition-colors">How It Works</Link>
            <Link href="#pricing" className="hover:text-white/70 transition-colors">Pricing</Link>
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
            <Link href="/sign-in" className="hover:text-white/70 transition-colors">Sign In</Link>
          </div>
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Perpetual Agility LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
