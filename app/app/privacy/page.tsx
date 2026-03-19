import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — LocalBeacon.ai",
  description: "How LocalBeacon.ai collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🔦</span>
            <span className="text-xl font-bold text-[#FFD700]">LocalBeacon.ai</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-white/70 text-sm mb-8">Last updated: March 1, 2026</p>

        <div className="space-y-8 text-white/70 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-lg mb-3">1. Who We Are</h2>
            <p>LocalBeacon.ai is operated by Perpetual Agility LLC, a Minnesota limited liability company. When we say &quot;we,&quot; &quot;us,&quot; or &quot;LocalBeacon,&quot; we mean Perpetual Agility LLC.</p>
            <p className="mt-2">Contact: <a href="mailto:support@localbeacon.ai" className="text-[#FFD700] hover:underline">support@localbeacon.ai</a></p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">2. What We Collect</h2>
            <p className="mb-2">We collect information you provide directly:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white">Account information:</strong> name, email address (via Clerk authentication)</li>
              <li><strong className="text-white">Business information:</strong> business name, category, service areas, phone number, website</li>
              <li><strong className="text-white">Google Business Profile data:</strong> when you connect your Google account, we access your business listing information, posts, and reviews (with your explicit authorization via OAuth 2.0)</li>
              <li><strong className="text-white">Payment information:</strong> processed by Stripe — we never see or store your full card number</li>
              <li><strong className="text-white">Generated content:</strong> AI-written posts, pages, and review responses created through our platform</li>
            </ul>
            <p className="mt-3">We also collect automatically:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Usage data (pages visited, features used)</li>
              <li>Device and browser information</li>
              <li>IP address</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">3. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Generate AI content (posts, pages, review responses) for your business</li>
              <li>Post content to your Google Business Profile on your behalf (when authorized)</li>
              <li>Manage your subscription and process payments</li>
              <li>Send you account notifications and service updates</li>
              <li>Improve our AI models and product features</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">4. AI Content Generation</h2>
            <p>We use Anthropic&apos;s Claude AI to generate content for your business. Your business information (name, category, service areas) is sent to Anthropic&apos;s API to generate relevant posts, pages, and review responses. Anthropic does not use your data to train their models. See <a href="https://www.anthropic.com/privacy" className="text-[#FFD700] hover:underline" target="_blank" rel="noopener noreferrer">Anthropic&apos;s Privacy Policy</a> for details.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">5. Google Business Profile Access</h2>
            <p>When you connect your Google account, we request access to your Google Business Profile through Google&apos;s OAuth 2.0 system. You can review and revoke this access at any time through your <a href="https://myaccount.google.com/permissions" className="text-[#FFD700] hover:underline" target="_blank" rel="noopener noreferrer">Google Account permissions</a>. We only access the specific Google Business Profile data needed to provide our service.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">6. Data Sharing</h2>
            <p className="mb-2">We share your data only with:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white">Clerk</strong> — authentication and user management</li>
              <li><strong className="text-white">Stripe</strong> — payment processing</li>
              <li><strong className="text-white">Anthropic</strong> — AI content generation</li>
              <li><strong className="text-white">Google</strong> — posting to your Google Business Profile (when authorized)</li>
              <li><strong className="text-white">Supabase</strong> — database hosting</li>
              <li><strong className="text-white">Vercel</strong> — application hosting</li>
            </ul>
            <p className="mt-2">We do not sell your personal data. We do not share your data with advertisers.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">7. Data Retention</h2>
            <p>We retain your data for as long as your account is active. If you delete your account, we will delete your personal data and business information within 30 days, except where we are required to retain it for legal or compliance purposes.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">8. Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Revoke Google Business Profile access at any time</li>
            </ul>
            <p className="mt-2">To exercise these rights, email <a href="mailto:support@localbeacon.ai" className="text-[#FFD700] hover:underline">support@localbeacon.ai</a>.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">9. Security</h2>
            <p>We use industry-standard security measures including encryption in transit (TLS), encrypted database connections, and secure authentication through Clerk. API keys and secrets are stored in encrypted environment variables.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">10. Changes</h2>
            <p>We may update this privacy policy from time to time. We will notify you of material changes by email or through the application.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">11. Contact</h2>
            <p>Questions? Email <a href="mailto:support@localbeacon.ai" className="text-[#FFD700] hover:underline">support@localbeacon.ai</a> or write to:</p>
            <p className="mt-2">Perpetual Agility LLC<br />Burnsville, MN 55337</p>
          </section>
        </div>
      </main>

      <footer className="px-6 py-8 border-t border-white/10">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-white/60 text-xs">
          <Link href="/" className="hover:text-white/50">← Back to LocalBeacon.ai</Link>
          <Link href="/terms" className="hover:text-white/50">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
