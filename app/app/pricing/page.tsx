import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for getting started with local SEO.",
    features: [
      "1 location",
      "5 GBP posts/month",
      "3 landing pages",
      "Basic rank tracking",
      "Community support",
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
      "Priority email support",
      "Advanced analytics",
    ],
    cta: "Start Solo Plan",
    href: "/sign-up",
    highlight: true,
  },
  {
    name: "Agency",
    price: "$79",
    period: "/month",
    description: "Built for agencies managing multiple clients.",
    features: [
      "Unlimited locations",
      "White-label branding",
      "Multi-client management",
      "Everything in Solo",
      "Client reporting dashboard",
      "Dedicated account manager",
      "Custom onboarding call",
    ],
    cta: "Start Agency Plan",
    href: "/sign-up",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes. You can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "We offer a 14-day free trial on Solo and Agency plans. No credit card required to start.",
  },
  {
    q: "What counts as a 'location'?",
    a: "A location is any Google Business Profile you connect to LocalBeacon. Each GBP is one location.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes — we offer a 30-day money-back guarantee on all paid plans, no questions asked.",
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
            <span className="text-xl font-bold text-[#FFD700]">
              LocalBeacon.ai
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <Link href="/#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-white font-medium">
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

      {/* Header */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <Badge className="mb-6 bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 text-sm px-4 py-1">
            Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Simple, honest{" "}
            <span className="text-[#FFD700]">pricing</span>
          </h1>
          <p className="text-lg text-white/60">
            No hidden fees. No long-term contracts. Start free and scale as you
            grow.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.highlight
                  ? "bg-[#FFD700]/10 border-[#FFD700] shadow-xl shadow-[#FFD700]/10"
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
                  <span className="text-5xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  <span className="text-white/50 text-lg">{plan.period}</span>
                </div>
                <p className="text-white/60 text-sm mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-white/80"
                    >
                      <span className="text-[#FFD700] font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <Button
                    className={`w-full font-semibold py-5 ${
                      plan.highlight
                        ? "bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
                        : "border border-white/20 bg-transparent text-white hover:bg-white/10"
                    }`}
                    variant={plan.highlight ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
                {plan.highlight && (
                  <p className="text-center text-xs text-white/40 mt-3">
                    14-day free trial · No credit card required
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="px-6 py-16 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">
            Compare plans
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-6 text-white/60 font-medium">
                    Feature
                  </th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">
                    Free
                  </th>
                  <th className="text-center py-3 px-4 text-[#FFD700] font-bold">
                    Solo
                  </th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">
                    Agency
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ["Locations", "1", "3", "Unlimited"],
                  ["GBP Posts/month", "5", "Unlimited", "Unlimited"],
                  ["Landing Pages", "3", "Unlimited", "Unlimited"],
                  ["AI Review Replies", "✕", "✓", "✓"],
                  ["PDF Export", "✕", "✓", "✓"],
                  ["White-label", "✕", "✕", "✓"],
                  ["Multi-client Management", "✕", "✕", "✓"],
                  ["Support", "Community", "Priority Email", "Dedicated"],
                ].map(([feature, free, solo, agency]) => (
                  <tr key={feature}>
                    <td className="py-3 pr-6 text-white/70">{feature}</td>
                    <td className="py-3 px-4 text-center text-white/50">
                      {free}
                    </td>
                    <td className="py-3 px-4 text-center text-white font-medium">
                      {solo}
                    </td>
                    <td className="py-3 px-4 text-center text-white/70">
                      {agency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="border-b border-white/10 pb-6 last:border-0"
              >
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-white/60 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 bg-[#FFD700]/5 border-t border-[#FFD700]/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">
            Still have questions?
          </h2>
          <p className="text-white/60 mb-6">
            Our team is happy to help. Start free today — no commitment required.
          </p>
          <Link href="/sign-up">
            <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold px-8 py-5">
              Get Started Free
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
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} LocalBeacon.ai. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
