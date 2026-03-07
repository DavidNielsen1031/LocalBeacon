import type { IndustryData } from './types'

export const professionalServices: Record<string, IndustryData> = {
  accountants: {
    slug: 'accountants',
    name: 'Accounting',
    plural: 'Accountants',
    headline: 'Book more clients than just tax season.',
    subheadline:
      'LocalBeacon keeps your accounting practice visible year-round — so businesses and individuals find you for advisory, bookkeeping, and planning, not just April filings.',
    description:
      'AI-powered local marketing for accounting firms and CPAs. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for accountants.',
    painPoints: [
      {
        icon: '📅',
        title: 'Tax season surge, then silence',
        text: 'January through April is chaos. May through December? Crickets. LocalBeacon promotes your advisory, bookkeeping, and planning services year-round so your revenue stops depending on a single quarter.',
      },
      {
        icon: '🖥️',
        title: 'TurboTax and H&R Block dominate search',
        text: 'When someone Googles "tax preparation near me," national brands own the top spots. LocalBeacon builds your hyperlocal presence so you outrank the chains in your specific cities and neighborhoods.',
      },
      {
        icon: '🤝',
        title: 'Trust is your product, but hard to prove online',
        text: 'Clients trust CPAs with their most sensitive financial data. A thin online presence with few reviews signals risk. LocalBeacon builds the review profile and consistent content that signals credibility.',
      },
    ],
    features: [
      {
        title: 'Seasonal Google posts that match the tax calendar',
        text: 'Quarterly estimated tax reminders, year-end planning tips, W-2 deadlines, and small business advisory content — posted automatically so your profile stays active when clients need you.',
      },
      {
        title: 'Service pages for every city you serve',
        text: '"CPA in Naperville" and "Small Business Accountant in Schaumburg" pages that rank for local searches — because clients want an accountant they can sit down with.',
      },
      {
        title: 'AI search optimization for financial services',
        text: 'When business owners ask ChatGPT or Google AI "best accountant near me for small business," your structured data and content authority help you appear in those recommendations.',
      },
      {
        title: 'Professional review responses that build trust',
        text: 'Thoughtful, privacy-conscious replies to every Google review. Show prospective clients that you are responsive, professional, and engaged — without revealing any financial details.',
      },
    ],
    stats: [
      { value: '2.7×', label: 'more off-season client inquiries' },
      { value: '68%', label: 'of new clients cite Google as source' },
      { value: '4.9★', label: 'avg maintained review score' },
    ],
    faqs: [
      {
        question: 'How does LocalBeacon help accountants get year-round clients?',
        answer:
          'Most accounting firms go quiet on marketing after April. LocalBeacon automatically posts advisory content, bookkeeping tips, and planning reminders to your Google Business Profile year-round. This consistent visibility drives inquiries for payroll, QuickBooks help, business formation, and estate planning — not just tax prep.',
      },
      {
        question: 'Will this help me compete with TurboTax and H&R Block?',
        answer:
          'Yes. National chains win on brand awareness, but local searches are different. When someone searches "CPA near me" or "accountant in [city]," LocalBeacon ensures your practice appears with strong reviews, fresh content, and city-specific pages — signals Google rewards over generic national listings.',
      },
      {
        question: 'Are review responses appropriate for accounting clients?',
        answer:
          'Absolutely. Our AI drafts responses that thank clients without referencing any specific financial details, tax situations, or account information. Every response is professional, warm, and privacy-conscious.',
      },
      {
        question: 'Can LocalBeacon handle multiple office locations?',
        answer:
          'Yes. Our Solo plan supports up to 3 locations and our Agency plan covers unlimited offices. Each location gets its own Google Business Profile management, local pages, and review responses.',
      },
      {
        question: 'How is this different from hiring a marketing agency?',
        answer:
          'Marketing agencies specializing in accounting firms charge $2,000-6,000/month and often lock you into annual contracts. LocalBeacon starts at $49/month, deploys the same day, and handles the ongoing content and review management that agencies typically neglect after the initial setup.',
      },
      {
        question: 'Do I need to write blog posts or create content?',
        answer:
          'No. LocalBeacon generates all content — Google posts, city pages, and review responses — based on the services you offer and the areas you serve. You simply review and approve.',
      },
    ],
  },

  'financial-advisors': {
    slug: 'financial-advisors',
    name: 'Financial Advisory',
    plural: 'Financial Advisors',
    headline: 'Attract clients who value advice over algorithms.',
    subheadline:
      'LocalBeacon positions your advisory practice as the trusted local option — so prospects choose your expertise over Betterment, Wealthfront, and the robo-advisors.',
    description:
      'AI-powered local marketing for financial advisors and wealth management firms. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for RIAs and financial planners.',
    painPoints: [
      {
        icon: '🤖',
        title: 'Robo-advisors are stealing your prospects',
        text: 'Betterment and Wealthfront spend millions on ads targeting your ideal clients. LocalBeacon builds local authority so prospects in your area find a real human advisor — you — before they default to an app.',
      },
      {
        icon: '⚖️',
        title: 'Compliance makes marketing feel impossible',
        text: 'SEC and FINRA rules limit what you can say in ads. LocalBeacon creates educational, compliance-friendly content — no performance promises, no testimonials risks — just helpful financial planning content that builds trust.',
      },
      {
        icon: '🔒',
        title: 'Referrals are great but not scalable',
        text: 'Most advisors get 80% of new clients from referrals. That works until it doesn\'t. LocalBeacon builds a consistent inbound pipeline from Google and AI search so your growth does not depend solely on who your clients happen to know.',
      },
    ],
    features: [
      {
        title: 'Compliance-friendly Google posts on autopilot',
        text: 'Market commentary, retirement planning tips, tax-efficient investing education, and life-stage financial guides — posted weekly without performance claims or testimonial language.',
      },
      {
        title: 'Local pages for every community you serve',
        text: '"Financial Advisor in Scottsdale" and "Retirement Planning in Paradise Valley" pages that rank locally — because high-net-worth clients want an advisor who understands their community.',
      },
      {
        title: 'AI search visibility for advisory services',
        text: 'When a prospect asks ChatGPT "best financial advisor near me for retirement planning," your structured data and authority help you appear — not just the robo-advisors with massive ad budgets.',
      },
      {
        title: 'Review responses that reinforce credibility',
        text: 'Thoughtful replies that thank clients without discussing portfolios, returns, or specific advice. Every response reinforces your professionalism and approachability.',
      },
    ],
    stats: [
      { value: '3.1×', label: 'more discovery meeting requests' },
      { value: '$2.4M', label: 'avg new AUM per client/year' },
      { value: '91%', label: 'of prospects research advisors online' },
    ],
    faqs: [
      {
        question: 'Is LocalBeacon content compliant with SEC and FINRA rules?',
        answer:
          'LocalBeacon generates educational, informational content — market commentary, planning tips, life-stage guides — without performance claims, guarantees, or testimonial language. We recommend your compliance team review posts before publishing, and our one-click approval workflow makes that easy.',
      },
      {
        question: 'How does this help me compete with robo-advisors?',
        answer:
          'Robo-advisors dominate paid search with massive budgets. But local, organic search is different. When someone searches "financial advisor in [city]," Google prioritizes local businesses with strong profiles, reviews, and fresh content. LocalBeacon builds exactly that.',
      },
      {
        question: 'What kind of content does LocalBeacon create for financial advisors?',
        answer:
          'Retirement planning tips, Social Security optimization guides, market commentary, tax-efficient investing education, estate planning reminders, and life-event financial guides (new baby, divorce, inheritance). All educational, never promotional.',
      },
      {
        question: 'Can I use this if I serve a niche like business owners or doctors?',
        answer:
          'Yes. LocalBeacon tailors content to your specific clientele. If you specialize in physician financial planning or business succession, your Google posts and local pages reflect that specialization.',
      },
      {
        question: 'How does this work with my existing website and CRM?',
        answer:
          'LocalBeacon works alongside your existing website and marketing. We focus on Google Business Profile optimization, local landing pages, and AI search readiness — complementing your site, not replacing it.',
      },
      {
        question: 'How long before I see results?',
        answer:
          'Google Business Profile engagement typically increases within 2-3 weeks. Most financial advisors see an uptick in discovery meeting requests within 60-90 days as local pages index and content authority builds.',
      },
    ],
  },

  'insurance-agents': {
    slug: 'insurance-agents',
    name: 'Insurance',
    plural: 'Insurance Agents',
    headline: 'Win the quote before they go online.',
    subheadline:
      'LocalBeacon keeps your insurance agency top of local search — so clients call you first instead of comparing rates on Geico.com or Progressive.com.',
    description:
      'AI-powered local marketing for independent insurance agents and agencies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for insurance professionals.',
    painPoints: [
      {
        icon: '💻',
        title: 'Online quote engines are eating your pipeline',
        text: 'Geico, Progressive, and Lemonade let customers buy insurance without talking to anyone. LocalBeacon positions your local expertise — claims advocacy, bundling advice, annual reviews — as the value no app can offer.',
      },
      {
        icon: '🔄',
        title: 'Policy renewals depend on staying top-of-mind',
        text: 'Clients who forget your name at renewal time are one Google search from switching. LocalBeacon keeps your profile active with seasonal tips, coverage reminders, and community content that maintain the relationship.',
      },
      {
        icon: '📣',
        title: 'Referrals alone cannot sustain growth',
        text: 'Word-of-mouth built your book, but it plateaus. LocalBeacon adds a consistent digital lead channel so your agency grows from both referrals and local search — instead of just one.',
      },
    ],
    features: [
      {
        title: 'Coverage education posts that drive calls',
        text: 'Seasonal reminders — hurricane prep, winter driving, teen driver tips, open enrollment guides — posted to your Google listing when clients are actively thinking about coverage.',
      },
      {
        title: 'City pages for every area you write policies',
        text: '"Home Insurance in Coral Springs" and "Auto Insurance Agent in Boca Raton" pages that capture local searches before prospects default to national carriers.',
      },
      {
        title: 'AI search positioning for insurance',
        text: 'When someone asks an AI assistant "best insurance agent near me," your structured data, strong reviews, and fresh content help you get recommended over online-only carriers.',
      },
      {
        title: 'Review responses that reinforce the relationship',
        text: 'Warm, professional replies that thank clients and subtly remind readers about your local, personal service — the one thing GEICO and Progressive cannot match.',
      },
    ],
    stats: [
      { value: '2.4×', label: 'more inbound quote requests' },
      { value: '34%', label: 'higher client retention rate' },
      { value: '8+', label: 'cities covered per agent' },
    ],
    faqs: [
      {
        question: 'How does LocalBeacon help insurance agents compete with online carriers?',
        answer:
          'Online carriers win on convenience, but local agents win on trust and expertise. LocalBeacon amplifies your local advantage by keeping your Google presence active with educational content, strong reviews, and city-specific pages that position you as the go-to local expert.',
      },
      {
        question: 'Can LocalBeacon help with client retention, not just acquisition?',
        answer:
          'Yes. Consistent Google posts and review engagement keep your agency visible to existing clients. When renewal season hits, they see your name regularly and are less likely to shop around.',
      },
      {
        question: 'What kind of content does LocalBeacon create for insurance agents?',
        answer:
          'Seasonal coverage reminders, claims preparation guides, policy bundling tips, life-event insurance guides (new home, new baby, teen driver), and community safety content. All designed to educate and build trust.',
      },
      {
        question: 'Does this work for independent agents with multiple carriers?',
        answer:
          'Absolutely. LocalBeacon highlights your ability to shop multiple carriers on behalf of clients — a key advantage over captive agents and direct-to-consumer carriers. Your content emphasizes choice, not a single brand.',
      },
      {
        question: 'How quickly will I see new leads?',
        answer:
          'Google profile engagement typically increases within 2-3 weeks. Most insurance agents see measurable increases in quote requests within 45-60 days as local pages index and content builds visibility.',
      },
      {
        question: 'Is this worth it if I already have a good referral network?',
        answer:
          'Referrals are valuable but unpredictable. LocalBeacon adds a consistent inbound channel that complements referrals — so your pipeline stays full even during slow referral months.',
      },
    ],
  },

  'real-estate-agents': {
    slug: 'real-estate-agents',
    name: 'Real Estate',
    plural: 'Real Estate Agents',
    headline: 'Be the agent your neighborhood already knows.',
    subheadline:
      'LocalBeacon establishes your hyperlocal authority on Google and AI search — so buyers and sellers find you before they find a Zillow Premier Agent.',
    description:
      'AI-powered local marketing for real estate agents and brokerages. Automated Google Business Profile posts, neighborhood-specific landing pages, review responses, and AI search optimization built for realtors.',
    painPoints: [
      {
        icon: '🏠',
        title: 'Zillow and Realtor.com own your leads',
        text: 'You are paying Zillow $500-2,000/month for leads that get shared with three other agents. LocalBeacon builds your own organic presence so sellers and buyers come directly to you — no middleman, no shared leads.',
      },
      {
        icon: '📍',
        title: 'Your hyperlocal expertise is invisible online',
        text: 'You know every street, school district, and HOA in your market. But Google does not. LocalBeacon creates neighborhood-level content that proves your local knowledge to both search engines and prospective clients.',
      },
      {
        icon: '⭐',
        title: 'Personal brand is everything — and hard to build',
        text: 'In real estate, people hire people. But building a recognizable personal brand online takes consistent effort. LocalBeacon automates the content, reviews, and visibility that make you the name everyone knows locally.',
      },
    ],
    features: [
      {
        title: 'Market update posts that position you as the expert',
        text: 'Monthly market stats, mortgage rate commentary, seasonal buying and selling tips, and neighborhood spotlights — posted to your Google listing so prospects see you as the local authority.',
      },
      {
        title: 'Neighborhood pages that dominate local search',
        text: '"Homes for Sale in Westlake Village" and "Real Estate Agent in Thousand Oaks" pages that rank you in every neighborhood, suburb, and school district in your market.',
      },
      {
        title: 'AI search visibility for real estate',
        text: 'When someone asks ChatGPT "best realtor in [neighborhood]" or asks Google AI about local market conditions, your structured data and content authority help you get recommended.',
      },
      {
        title: 'Review management that closes listings',
        text: 'Fast, personal responses to every Google review. Sellers interviewing agents check reviews first — an active, well-managed review profile is often the difference between getting the listing and losing it.',
      },
    ],
    stats: [
      { value: '4.2×', label: 'more direct inquiry calls' },
      { value: '22+', label: 'neighborhoods ranked per agent' },
      { value: '$0', label: 'per-lead cost vs. Zillow' },
    ],
    faqs: [
      {
        question: 'How does LocalBeacon help real estate agents get listings?',
        answer:
          'Sellers research agents online before calling. LocalBeacon ensures your Google presence is strong — fresh market content, active review responses, and neighborhood-specific pages that prove you know the area. When a seller searches "best realtor in [neighborhood]," you show up with credibility.',
      },
      {
        question: 'Can this replace Zillow Premier Agent?',
        answer:
          'Many agents use LocalBeacon to reduce their Zillow dependency. Instead of paying $500-2,000/month for shared leads, LocalBeacon builds your own organic pipeline at a fraction of the cost. The leads come directly to you, unshared.',
      },
      {
        question: 'What kind of content does LocalBeacon create for realtors?',
        answer:
          'Monthly market updates, mortgage rate commentary, neighborhood spotlights, seasonal buying and selling guides, open house announcements, and community event highlights. Content that positions you as the hyperlocal expert.',
      },
      {
        question: 'Does this work for teams and brokerages?',
        answer:
          'Yes. Our Agency plan supports unlimited locations and agents. Each agent or office can have their own Google Business Profile management, local pages, and review responses.',
      },
      {
        question: 'How does the AI search optimization work for real estate?',
        answer:
          'AI assistants like ChatGPT and Google AI pull from structured data when recommending local professionals. LocalBeacon adds schema markup, FAQ content, and neighborhood authority signals that help these AI systems recommend you.',
      },
      {
        question: 'I already post on social media. Do I need this?',
        answer:
          'Social media is great for brand awareness, but it does not help you rank on Google. When someone actively searches for an agent — the highest-intent moment — Google results matter most. LocalBeacon ensures you show up there.',
      },
      {
        question: 'How fast will I see results?',
        answer:
          'Google profile views typically increase within 2 weeks. Most agents see a measurable increase in direct calls and listing inquiries within 60-90 days.',
      },
    ],
  },

  notaries: {
    slug: 'notaries',
    name: 'Notary',
    plural: 'Notaries',
    headline: 'Be the notary they call, not the one they skip.',
    subheadline:
      'LocalBeacon keeps your notary services visible on Google and AI search — so clients find you for closings, apostilles, and mobile appointments before they try an online service.',
    description:
      'AI-powered local marketing for notaries and mobile notary services. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for notary professionals.',
    painPoints: [
      {
        icon: '📱',
        title: 'Remote Online Notarization is taking your clients',
        text: 'RON platforms let clients notarize from their couch. But many transactions still require in-person notarization — real estate closings, immigration documents, estate planning. LocalBeacon makes sure people who need an in-person notary find you first.',
      },
      {
        icon: '🔎',
        title: 'Low ticket means you need high volume',
        text: 'At $10-25 per signature, you need steady volume to build a real income. LocalBeacon drives consistent appointment requests from Google and AI search, turning a side gig into a sustainable business.',
      },
      {
        icon: '🚗',
        title: 'Mobile notary demand is booming but invisible',
        text: 'Title companies and signing services take a huge cut. Direct clients pay better. LocalBeacon helps you attract direct clients who search "mobile notary near me" — cutting out the middleman and keeping your full fee.',
      },
    ],
    features: [
      {
        title: 'Google posts that drive appointment requests',
        text: 'Content about when you need a notary, mobile notary availability, real estate closing prep tips, and document requirements — posted weekly so your profile stays active and visible.',
      },
      {
        title: 'Service pages for every area you travel to',
        text: '"Mobile Notary in Henderson" and "Notary Public in Summerlin" pages that rank for local searches across your entire mobile service radius.',
      },
      {
        title: 'AI search optimization for notary services',
        text: 'When someone asks Siri or ChatGPT "notary near me open now" or "mobile notary for real estate closing," your structured data helps you appear in those recommendations.',
      },
      {
        title: 'Review responses that build repeat business',
        text: 'Fast, professional replies to every Google review. Real estate agents, title companies, and attorneys notice — building the referral relationships that drive your best repeat business.',
      },
    ],
    stats: [
      { value: '3.8×', label: 'more direct appointment bookings' },
      { value: '45%', label: 'more revenue vs. signing services' },
      { value: '12+', label: 'cities covered per notary' },
    ],
    faqs: [
      {
        question: 'How does LocalBeacon help notaries get more appointments?',
        answer:
          'Most people search "notary near me" when they need one urgently. LocalBeacon ensures your Google Business Profile is optimized with fresh content, strong reviews, and city-specific pages so you appear first in those time-sensitive searches.',
      },
      {
        question: 'Can LocalBeacon help me get direct clients instead of signing service jobs?',
        answer:
          'Yes. Signing services pay $75-150 per appointment and take a significant cut. Direct clients from Google typically pay your full mobile notary fee ($150-300+). LocalBeacon builds the visibility that drives direct bookings.',
      },
      {
        question: 'How does this help me compete with Remote Online Notarization?',
        answer:
          'Many transactions still legally require in-person notarization — certain real estate closings, immigration documents, and court filings. LocalBeacon positions you as the convenient, mobile, in-person option for clients who need physical presence.',
      },
      {
        question: 'What content does LocalBeacon create for notaries?',
        answer:
          'Document preparation guides, "when do you need a notary" educational posts, real estate closing tips, apostille process explanations, and mobile notary availability updates. Content that answers the exact questions people have when they need a notary.',
      },
      {
        question: 'Is this worth it for a side-gig notary?',
        answer:
          'Especially so. At $49/month, even two or three additional direct clients per month more than pays for LocalBeacon. Many side-gig notaries use LocalBeacon to transition to full-time mobile notary work.',
      },
    ],
  },
}
