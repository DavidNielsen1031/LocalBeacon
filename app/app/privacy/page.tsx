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
            <img src="/logo-192.png?v=3" alt="LocalBeacon" style={{ height: "36px", width: "36px" }} />
            <span className="text-xl font-bold text-[#FFD700]">LocalBeacon.ai</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-white/70 text-sm mb-8">Last updated: March 21, 2026</p>

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
              <li><strong className="text-white">Account info:</strong> email address, collected via Clerk when you sign up</li>
              <li><strong className="text-white">Business info:</strong> business name, city, state, website URL, email address, and service areas you enter into the app</li>
              <li><strong className="text-white">Google Business Profile data:</strong> when you connect your Google account, we access your business listing, posts, and reviews via OAuth 2.0 (with your explicit authorization)</li>
              <li><strong className="text-white">Search performance data:</strong> we connect to Google Search Console to pull keyword and ranking data for your business (only when you authorize it)</li>
              <li><strong className="text-white">Payment info:</strong> handled entirely by Stripe — we never see or store your card number</li>
              <li><strong className="text-white">Generated content:</strong> Google posts, city pages, review responses, FAQs, and schema markup created through LocalBeacon</li>
            </ul>
            <p className="mt-3">We also collect automatically:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Usage data (pages visited, features used) via PostHog analytics</li>
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
            <p>LocalBeacon uses Anthropic&apos;s Claude to generate content for your business — Google posts, city landing pages, review responses, FAQs, and schema markup. Your business information (name, city, state, service areas) is sent to Anthropic&apos;s API to produce relevant, accurate content.</p>
            <p className="mt-2">Important: <strong className="text-white">AI-generated content is a draft, not a final publication.</strong> You review and approve every piece of content before it&apos;s published to your Google Business Profile or website. We don&apos;t auto-publish anything without your explicit action.</p>
            <p className="mt-2">Anthropic does not use your data to train their models. See <a href="https://www.anthropic.com/privacy" className="text-[#FFD700] hover:underline" target="_blank" rel="noopener noreferrer">Anthropic&apos;s Privacy Policy</a> for details.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">5. Cookies</h2>
            <p className="mb-2">We use a small number of cookies to keep the product working:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white">Clerk session cookie:</strong> keeps you logged in. Required for the app to work.</li>
              <li><strong className="text-white">PostHog analytics cookie:</strong> tracks how features are used so we can improve the product. No personal data is sold. You can opt out by enabling Do Not Track in your browser.</li>
            </ul>
            <p className="mt-2">We do not use advertising cookies or sell your browsing data.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">6. Google Business Profile &amp; Search Console Access</h2>
            <p>When you connect your Google account, we request OAuth 2.0 access to your Google Business Profile and (optionally) Google Search Console. This lets us publish content on your behalf and pull search performance data like keyword rankings and impressions.</p>
            <p className="mt-2">You can review and revoke this access at any time through your <a href="https://myaccount.google.com/permissions" className="text-[#FFD700] hover:underline" target="_blank" rel="noopener noreferrer">Google Account permissions</a>. Revoking access stops all future posting and data pulls but does not delete content already published to your profile.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">7. Third-Party Services</h2>
            <p className="mb-2">We use the following services to run LocalBeacon. Each handles your data according to their own privacy policies:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white">Clerk</strong> — handles sign-up, login, and session management. Your email lives with Clerk.</li>
              <li><strong className="text-white">Stripe</strong> — processes all payments. We don&apos;t store your credit card numbers. Ever.</li>
              <li><strong className="text-white">Supabase</strong> — our database. Your business info and generated content are stored here.</li>
              <li><strong className="text-white">Anthropic Claude</strong> — generates AI content from your business data. Data is not used for model training.</li>
              <li><strong className="text-white">PostHog</strong> — product analytics (feature usage, session data). No data is sold.</li>
              <li><strong className="text-white">Google Search Console API</strong> — retrieves search performance data for your business (only when you connect your Google account).</li>
              <li><strong className="text-white">Vercel</strong> — hosts the LocalBeacon application.</li>
            </ul>
            <p className="mt-2">We do not sell your personal data. We do not share your data with advertisers.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">8. Data Retention</h2>
            <p>We keep your account data (business info, generated content, search data) for as long as your subscription is active. If you cancel or delete your account, we delete your data within 30 days — except where we&apos;re legally required to retain billing records.</p>
            <p className="mt-2">Want your data deleted sooner? Email <a href="mailto:support@localbeacon.ai" className="text-[#FFD700] hover:underline">support@localbeacon.ai</a> and we&apos;ll handle it promptly.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">9. Your Rights (CCPA &amp; GDPR)</h2>
            <p className="mb-2">Whether you&apos;re in California, the EU, or anywhere else, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white">Access</strong> — request a copy of the data we hold about you</li>
              <li><strong className="text-white">Correct</strong> — fix inaccurate business or account information</li>
              <li><strong className="text-white">Delete</strong> — request deletion of your account and all associated data</li>
              <li><strong className="text-white">Export</strong> — receive your data in a portable format</li>
              <li><strong className="text-white">Revoke access</strong> — disconnect your Google account at any time via Google Account settings</li>
              <li><strong className="text-white">Opt out of analytics</strong> — enable Do Not Track in your browser to opt out of PostHog tracking</li>
            </ul>
            <p className="mt-2">We don&apos;t sell personal information. California residents: you have the right to know, delete, and opt out under CCPA. EU/UK residents: you have the rights listed above under GDPR.</p>
            <p className="mt-2">To exercise any of these rights, email <a href="mailto:support@localbeacon.ai" className="text-[#FFD700] hover:underline">support@localbeacon.ai</a>. We&apos;ll respond within 30 days.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">10. Security</h2>
            <p>We use industry-standard security measures including encryption in transit (TLS), encrypted database connections, and secure authentication through Clerk. API keys and secrets are stored in encrypted environment variables.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">11. Changes</h2>
            <p>We may update this privacy policy from time to time. We will notify you of material changes by email or through the application.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">12. Contact</h2>
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
