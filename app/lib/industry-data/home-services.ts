import type { IndustryData } from './types'

export const homeServices: Record<string, IndustryData> = {
  plumbers: {
    slug: "plumbers",
    name: "Plumbing",
    plural: "Plumbers",
    headline: "More service calls. Less marketing hassle.",
    subheadline:
      "LocalBeacon keeps your plumbing business visible on Google, AI search, and local directories — so homeowners find you first when the pipes burst.",
    description:
      "AI-powered local marketing for plumbing companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for plumbers.",
    painPoints: [
      {
        icon: "📞",
        title: "Calls dry up between emergencies",
        text: "Without consistent local visibility, you only get calls when someone has a crisis. LocalBeacon keeps you top-of-mind for routine maintenance, remodels, and inspections too.",
      },
      {
        icon: "🗺️",
        title: "Competing across multiple service areas",
        text: "You serve 15 cities but only show up in one. LocalBeacon creates optimized pages for every city you serve, so you rank locally in each one.",
      },
      {
        icon: "⭐",
        title: "Reviews pile up unanswered",
        text: "Every unanswered review is a missed signal to Google. LocalBeacon drafts professional responses to each review so your reputation stays strong.",
      },
    ],
    features: [
      {
        title: "Weekly Google Business posts about plumbing tips",
        text: "Seasonal content like winterization reminders, water heater maintenance, and leak prevention — posted automatically to your Google listing.",
      },
      {
        title: "Service pages for every city you cover",
        text: "\"Emergency Plumber in Burnsville\" pages that rank for local searches in each city, neighborhood, and zip code you serve.",
      },
      {
        title: "AI-optimized for voice and chat search",
        text: "When someone asks ChatGPT or Google AI \"best plumber near me,\" your business shows up with structured data AI assistants can read.",
      },
      {
        title: "Review responses drafted in your tone",
        text: "Professional, warm replies to every Google review — ready to post in one click. Keeps your profile active and your reputation strong.",
      },
    ],
    stats: [
      { value: "3.2×", label: "more calls from Google" },
      { value: "15+", label: "cities ranked per client" },
      { value: "4.8★", label: "avg client review score" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help plumbers get more calls?",
        answer:
          "LocalBeacon automates the three things Google rewards most: fresh content (weekly posts), local relevance (city-specific pages), and reputation signals (review responses). Plumbing companies using LocalBeacon typically see 2-3× more calls within 90 days.",
      },
      {
        question: "Do I need to write any content myself?",
        answer:
          "No. LocalBeacon's AI generates all content — Google posts, service area pages, and review responses — based on your business details. You just review and approve.",
      },
      {
        question: "Can LocalBeacon handle multiple plumbing service areas?",
        answer:
          "Yes. LocalBeacon creates dedicated, optimized pages for every city and neighborhood you serve. Most plumbing clients cover 10-20+ service areas.",
      },
      {
        question: "How is this different from hiring an SEO agency?",
        answer:
          "SEO agencies charge $1,500-5,000/month and take months to show results. LocalBeacon starts at $49/month, deploys immediately, and handles the ongoing content that agencies often neglect after the initial setup.",
      },
      {
        question: "What if I already have a website?",
        answer:
          "LocalBeacon works alongside your existing website. We optimize your Google Business Profile, create supplementary local pages, and ensure your business is structured for AI search — without changing your current site.",
      },
    ],
  },

  hvac: {
    slug: "hvac",
    name: "HVAC",
    plural: "HVAC Companies",
    headline: "Stay booked through every season.",
    subheadline:
      "LocalBeacon keeps your HVAC business visible year-round — so you're not scrambling for leads when the weather changes.",
    description:
      "AI-powered local marketing for HVAC companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for heating and cooling businesses.",
    painPoints: [
      {
        icon: "🌡️",
        title: "Seasonal feast-or-famine cycles",
        text: "Summer AC and winter heating rushes are great, but spring and fall are slow. LocalBeacon keeps your visibility consistent so maintenance and tune-up calls come in year-round.",
      },
      {
        icon: "🏘️",
        title: "New construction areas you can't reach",
        text: "New subdivisions need HVAC installs, but you're invisible there. LocalBeacon builds local pages targeting emerging neighborhoods before your competitors do.",
      },
      {
        icon: "📱",
        title: "AI search is changing how homeowners find HVAC",
        text: "More people ask Siri, Alexa, and ChatGPT for recommendations. If your business isn't structured for AI, you're losing to competitors who are.",
      },
    ],
    features: [
      {
        title: "Seasonal content posted automatically",
        text: "Furnace tune-up reminders in fall, AC prep in spring, emergency tips in extreme weather — all posted to your Google listing on schedule.",
      },
      {
        title: "City pages for every service territory",
        text: "\"AC Repair in Lakeville\" and \"Furnace Installation in Apple Valley\" pages that rank you locally in each area you serve.",
      },
      {
        title: "Ready for AI-powered search",
        text: "Structured data, FAQ schemas, and llms.txt files that help AI assistants recommend your HVAC business when homeowners ask for help.",
      },
      {
        title: "Reputation management on autopilot",
        text: "AI-drafted review responses keep your Google profile active and professional — building trust with every homeowner who reads your reviews.",
      },
    ],
    stats: [
      { value: "40%", label: "more off-season bookings" },
      { value: "12+", label: "cities covered per client" },
      { value: "2.8×", label: "increase in Google visibility" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help HVAC companies during slow seasons?",
        answer:
          "LocalBeacon posts seasonal maintenance reminders, indoor air quality tips, and tune-up offers to your Google listing year-round. This keeps your profile active and drives maintenance calls even in shoulder seasons.",
      },
      {
        question: "Can LocalBeacon help me rank in new service areas?",
        answer:
          "Yes. We create dedicated landing pages for every city, suburb, and neighborhood you want to target — optimized for \"HVAC near me\" searches in each location.",
      },
      {
        question: "What does AI search optimization mean for HVAC?",
        answer:
          "When homeowners ask ChatGPT, Google AI, or voice assistants for HVAC recommendations, those systems pull from structured data. LocalBeacon ensures your business has the right schema markup, FAQ content, and structured information to be recommended.",
      },
      {
        question: "How long does it take to see results?",
        answer:
          "Most HVAC clients see increased Google Business Profile views within 2-4 weeks. Call volume typically increases within 60-90 days as local pages index and content builds authority.",
      },
      {
        question: "Do I need to create any content?",
        answer:
          "No. Our AI generates all posts, pages, and review responses based on your service details. You just review, approve, and watch the calls come in.",
      },
    ],
  },

  electricians: {
    slug: "electricians",
    name: "Electrical",
    plural: "Electricians",
    headline: "Light up your phone with more service calls.",
    subheadline:
      "LocalBeacon makes your electrical business the first one homeowners find — on Google, AI search, and everywhere local customers look.",
    description:
      "AI-powered local marketing for electrical contractors. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for electricians.",
    painPoints: [
      {
        icon: "⚡",
        title: "Emergency calls are great, but inconsistent",
        text: "You can't build a business on emergencies alone. LocalBeacon drives consistent calls for panel upgrades, EV charger installs, and home inspections — the profitable planned work.",
      },
      {
        icon: "🏗️",
        title: "New construction keeps you invisible to homeowners",
        text: "If most of your work is new construction, homeowners don't know you exist. LocalBeacon builds your residential service presence so you diversify your revenue.",
      },
      {
        icon: "🔍",
        title: "Homeowners can't tell electricians apart online",
        text: "All electrical company websites look the same. LocalBeacon differentiates you with consistent content, strong review presence, and AI search visibility that builds trust.",
      },
    ],
    features: [
      {
        title: "Educational content builds trust and calls",
        text: "Home electrical safety tips, EV charger guides, smart home wiring advice, and seasonal electrical maintenance — posted to your Google listing weekly.",
      },
      {
        title: "Service area pages that rank locally",
        text: "\"Licensed Electrician in Maple Grove\" and \"Electrical Panel Upgrade in Plymouth\" pages that capture searches in every city you serve.",
      },
      {
        title: "Review management builds credibility",
        text: "Electrical work requires trust. Fast, professional review responses show homeowners you're responsive and care about customer satisfaction.",
      },
      {
        title: "Get found by AI recommendations",
        text: "As more homeowners ask AI assistants for electrician recommendations, LocalBeacon ensures your business has the structured data to be included in those answers.",
      },
    ],
    stats: [
      { value: "2.9×", label: "more residential calls" },
      { value: "14+", label: "cities ranked per client" },
      { value: "48hr", label: "avg time to first new lead" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help electricians get more residential work?",
        answer:
          "We increase your Google visibility for residential searches — panel upgrades, outlet installs, EV charger installation, and emergency calls. Weekly posts, local pages, and review responses drive consistent residential leads.",
      },
      {
        question: "Can LocalBeacon help me break into new service areas?",
        answer:
          "Yes. We create optimized landing pages for every city and neighborhood you want to serve. As you expand your territory, we expand your local presence to match.",
      },
      {
        question: "What kind of content does LocalBeacon create for electricians?",
        answer:
          "Home electrical safety tips, seasonal maintenance reminders (storm prep, holiday lighting safety), EV charger guides, smart home wiring content, and local community updates. All tailored to build trust and drive calls.",
      },
      {
        question: "Is this worth it if I already get referrals?",
        answer:
          "Referrals are great but unpredictable. LocalBeacon builds a consistent pipeline of new customers who find you online — complementing your referral business and reducing dependence on any single source.",
      },
      {
        question: "How quickly does LocalBeacon start working?",
        answer:
          "Your Google Business Profile posts start going live within the first week. Local pages typically start ranking within 2-4 weeks. Most electricians see measurable lead increases within 60 days.",
      },
    ],
  },

  roofers: {
    slug: "roofers",
    name: "Roofing",
    plural: "Roofers",
    headline: "Get on more roofs. Get off the marketing treadmill.",
    subheadline:
      "LocalBeacon keeps your roofing company visible on Google and AI search — so homeowners call you first after the storm.",
    description:
      "AI-powered local marketing for roofing companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for roofers.",
    painPoints: [
      {
        icon: "⛈️",
        title: "Storm chasers flood your market",
        text: "After every hailstorm, out-of-town roofers flood the market. Consistent local visibility establishes you as the trusted, permanent option homeowners choose over fly-by-night operations.",
      },
      {
        icon: "📊",
        title: "Leads are expensive and inconsistent",
        text: "HomeAdvisor and Angi leads cost $50-100+ each with no guarantee. LocalBeacon builds your own organic presence so leads come to you directly — no middleman fees.",
      },
      {
        icon: "🏠",
        title: "Hard to stand out in a crowded market",
        text: "Every roofer claims quality work. LocalBeacon differentiates you with consistent content, strong reviews, and AI-optimized visibility that positions you as the local authority.",
      },
    ],
    features: [
      {
        title: "Seasonal roofing content on autopilot",
        text: "Storm prep tips, gutter maintenance reminders, ice dam prevention, and spring inspection offers — posted to your Google listing when homeowners need them most.",
      },
      {
        title: "Rank in every city you serve",
        text: "\"Roof Repair in Prior Lake\" and \"Storm Damage Roofing in Shakopee\" pages that capture local searches across your entire service territory.",
      },
      {
        title: "Build trust through reviews",
        text: "Fast, professional responses to every Google review signal reliability. Homeowners see an active, responsive roofing company they can trust with their biggest investment.",
      },
      {
        title: "Get recommended by AI assistants",
        text: "When homeowners ask AI chatbots for roofer recommendations, your structured data and content authority help you show up in those recommendations.",
      },
    ],
    stats: [
      { value: "2.5×", label: "more estimate requests" },
      { value: "20+", label: "service areas per client" },
      { value: "$0", label: "per-lead cost" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help roofing companies get more jobs?",
        answer:
          "We increase your visibility on Google through weekly posts, city-specific landing pages, and review management. Roofing clients typically see 2-3× more estimate requests within the first quarter.",
      },
      {
        question: "Can LocalBeacon help after a major storm?",
        answer:
          "Yes. When storms hit your area, your existing local visibility and content authority mean homeowners find you first — not the storm chasers who show up and disappear. Your established presence builds trust.",
      },
      {
        question: "How does this compare to buying leads from HomeAdvisor?",
        answer:
          "Lead services charge $50-100+ per lead with no exclusivity. LocalBeacon builds your own organic presence at $49/month — leads come directly to you with no per-lead fees and no sharing with competitors.",
      },
      {
        question: "What content does LocalBeacon create for roofers?",
        answer:
          "Seasonal maintenance tips, storm prep guides, roofing material comparisons, and local community content. Plus dedicated pages for each service (repairs, replacements, inspections) in every city you cover.",
      },
      {
        question: "Do I need any technical skills?",
        answer:
          "None. LocalBeacon handles everything — content creation, Google posting, review responses, and local page optimization. You just review and approve what we generate.",
      },
    ],
  },

  painters: {
    slug: "painters",
    name: "Painting",
    plural: "Painters",
    headline: "Fill your schedule without chasing estimates.",
    subheadline:
      "LocalBeacon keeps your painting business front and center on Google and AI search — so homeowners request quotes from you instead of scrolling past.",
    description:
      "AI-powered local marketing for painting companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for house painters.",
    painPoints: [
      {
        icon: "🎨",
        title: "Spring rush, winter silence",
        text: "Exterior painting dries up in cold months, and you lose momentum every year. LocalBeacon keeps your profile active with interior painting, cabinet refinishing, and seasonal prep content so leads come in year-round.",
      },
      {
        icon: "📸",
        title: "Your best work is invisible online",
        text: "Beautiful before-and-after transformations sit in your camera roll instead of driving leads. LocalBeacon turns your portfolio into Google posts and local pages that actually generate calls.",
      },
      {
        icon: "💰",
        title: "Lowball competitors undercut your bids",
        text: "Competing on price is a race to the bottom. LocalBeacon builds your online authority with consistent reviews, educational content, and local presence — so homeowners choose quality over the cheapest quote.",
      },
    ],
    features: [
      {
        title: "Seasonal painting content posted weekly",
        text: "Color trend guides, exterior prep reminders, cabinet refinishing tips, and deck staining season posts — all published to your Google listing to keep homeowners engaged.",
      },
      {
        title: "City pages for every neighborhood you paint",
        text: "\"House Painter in Eden Prairie\" and \"Interior Painting in Edina\" pages that capture local searches across your entire service area.",
      },
      {
        title: "AI search visibility for painting queries",
        text: "When homeowners ask AI assistants \"best painter near me\" or \"how much does it cost to paint a house,\" your business appears with the structured data these tools rely on.",
      },
      {
        title: "Review responses that showcase your craftsmanship",
        text: "Thoughtful replies to every review highlight your attention to detail and professionalism — turning past customers into your most powerful marketing asset.",
      },
    ],
    stats: [
      { value: "2.7×", label: "more estimate requests" },
      { value: "18+", label: "neighborhoods ranked per client" },
      { value: "35%", label: "more winter bookings" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help painters get more jobs?",
        answer:
          "LocalBeacon keeps your Google Business Profile active with weekly painting tips, seasonal content, and professional review responses. Combined with city-specific landing pages, you show up when homeowners search for painters in your area — not just during peak season.",
      },
      {
        question: "Can LocalBeacon help me book interior work during winter?",
        answer:
          "Yes. We post content about interior painting, cabinet refinishing, wallpaper removal, and holiday prep — keeping your profile visible and driving indoor project inquiries through the slow months.",
      },
      {
        question: "How do I stand out from cheaper painting companies?",
        answer:
          "LocalBeacon builds your reputation through consistent review responses, educational content about prep work and paint quality, and a strong local presence. Homeowners who find you through organic search are looking for quality, not the cheapest bid.",
      },
      {
        question: "What kind of content does LocalBeacon create for painters?",
        answer:
          "Color trend updates, exterior prep checklists, interior vs. exterior paint guides, deck and fence staining tips, and seasonal reminders. All written specifically for your market and posted to your Google listing automatically.",
      },
      {
        question: "Do I need to provide photos or content?",
        answer:
          "No. LocalBeacon generates all written content based on your business details. If you want to include before-and-after photos, you can — but it's not required. The AI handles everything from posts to review responses.",
      },
      {
        question: "How long before I see more estimate requests?",
        answer:
          "Google posts go live within the first week. City pages typically start ranking in 2-4 weeks. Most painting companies see a noticeable uptick in estimate requests within 60-90 days.",
      },
    ],
  },

  "cleaning-services": {
    slug: "cleaning-services",
    name: "Cleaning",
    plural: "Cleaning Services",
    headline: "Book more homes. Build a roster that stays.",
    subheadline:
      "LocalBeacon keeps your cleaning business visible on Google and AI search — so new clients find you before they find a competitor with fewer reviews.",
    description:
      "AI-powered local marketing for residential and commercial cleaning companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for cleaning services.",
    painPoints: [
      {
        icon: "🔄",
        title: "Client churn kills your momentum",
        text: "Clients move, cancel, or cut back — and replacing them takes weeks. LocalBeacon keeps a steady stream of new inquiries flowing so one cancellation doesn't derail your schedule.",
      },
      {
        icon: "🛡️",
        title: "Trust is the biggest barrier to booking",
        text: "Homeowners are letting strangers into their home. A thin online presence with few reviews makes them nervous. LocalBeacon builds the review volume and professional presence that earns trust before you walk through the door.",
      },
      {
        icon: "🏢",
        title: "Residential and commercial need different messaging",
        text: "Office managers and homeowners search differently. LocalBeacon creates separate, optimized pages for residential deep cleans, move-out cleaning, and commercial janitorial — so you rank for all of it.",
      },
    ],
    features: [
      {
        title: "Weekly cleaning tips that keep your profile active",
        text: "Spring cleaning checklists, allergy season deep clean reminders, holiday prep guides, and move-out cleaning tips — posted to your Google listing to stay top-of-mind.",
      },
      {
        title: "Service pages for every area you clean",
        text: "\"House Cleaning in Woodbury\" and \"Office Cleaning in Bloomington\" pages that rank you locally for both residential and commercial searches in each city.",
      },
      {
        title: "AI-optimized for \"cleaning service near me\"",
        text: "When someone asks an AI assistant for cleaning service recommendations, your structured data, reviews, and content authority put you in the answer — not buried in page two results.",
      },
      {
        title: "Review responses that build client confidence",
        text: "Fast, professional replies to every review reinforce that you're reliable, thorough, and trustworthy — the exact qualities homeowners need to see before handing over their keys.",
      },
    ],
    stats: [
      { value: "3.1×", label: "more booking inquiries" },
      { value: "22+", label: "zip codes covered per client" },
      { value: "67%", label: "of new clients become recurring" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help cleaning services get more clients?",
        answer:
          "We keep your Google Business Profile active with weekly content, build city-specific landing pages for every area you serve, and draft professional review responses. Cleaning companies using LocalBeacon typically see 2-3× more booking inquiries within 90 days.",
      },
      {
        question: "Can LocalBeacon help me get both residential and commercial clients?",
        answer:
          "Yes. We create separate landing pages optimized for residential cleaning searches (\"house cleaning near me\") and commercial searches (\"office cleaning service\"). Different audiences, different pages, both driving leads.",
      },
      {
        question: "How important are reviews for cleaning services?",
        answer:
          "Critical. Cleaning is a trust-based service — people are letting you into their homes. LocalBeacon helps you respond to every review professionally, building the social proof that converts browsers into bookers.",
      },
      {
        question: "What content does LocalBeacon post for cleaning companies?",
        answer:
          "Seasonal cleaning tips, allergy-reduction guides, move-in/move-out checklists, eco-friendly cleaning advice, and local community updates. All tailored to your services and posted automatically.",
      },
      {
        question: "Will this help me fill cancellation gaps?",
        answer:
          "Yes. A consistent online presence generates a steady flow of new inquiries. When a recurring client cancels, you already have interested prospects ready to fill that slot instead of scrambling to find replacements.",
      },
      {
        question: "Do I need any marketing experience?",
        answer:
          "None at all. LocalBeacon handles content creation, Google posting, review management, and local page optimization. You focus on cleaning — we focus on keeping your schedule full.",
      },
    ],
  },

  "pest-control": {
    slug: "pest-control",
    name: "Pest Control",
    plural: "Pest Control Companies",
    headline: "Be the first call when critters invade.",
    subheadline:
      "LocalBeacon keeps your pest control business visible on Google and AI search — so panicked homeowners find you instantly, not your competitor down the road.",
    description:
      "AI-powered local marketing for pest control companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for exterminators and pest management professionals.",
    painPoints: [
      {
        icon: "🐜",
        title: "Pest seasons are predictable — your leads aren't",
        text: "Ants in spring, mosquitoes in summer, mice in fall. You know the cycle, but homeowners wait until they're desperate. LocalBeacon puts you in front of them before the infestation starts with preventive content that drives early bookings.",
      },
      {
        icon: "🔁",
        title: "One-time treatments don't build a business",
        text: "You need recurring quarterly plans, but customers don't think about prevention. LocalBeacon educates homeowners on recurring treatments through automated content, converting one-time callers into long-term subscribers.",
      },
      {
        icon: "📍",
        title: "You're invisible outside your home city",
        text: "Your truck drives through six counties, but Google only shows you in one. LocalBeacon builds optimized local pages for every community you service, so you rank everywhere you actually work.",
      },
    ],
    features: [
      {
        title: "Seasonal pest alerts posted to your profile",
        text: "Termite swarming season warnings, tick prevention tips, rodent-proofing reminders, and bed bug travel season alerts — posted to your Google listing right when homeowners need them.",
      },
      {
        title: "City pages for your entire service territory",
        text: "\"Pest Control in Maple Grove\" and \"Termite Treatment in Lakeville\" pages that capture searches in every city, suburb, and township you cover.",
      },
      {
        title: "AI search optimization for urgent queries",
        text: "When someone frantically asks their phone \"exterminator near me open now,\" your business shows up with structured hours, services, and the data AI assistants need to recommend you.",
      },
      {
        title: "Review responses that ease homeowner anxiety",
        text: "Pest problems are stressful. Warm, knowledgeable review responses reassure prospective customers that you're experienced, responsive, and will solve their problem fast.",
      },
    ],
    stats: [
      { value: "3.4×", label: "more service calls" },
      { value: "16+", label: "cities ranked per client" },
      { value: "45%", label: "more recurring plan sign-ups" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help pest control companies get more calls?",
        answer:
          "We post seasonal pest alerts, prevention tips, and treatment information to your Google listing year-round. Combined with city-specific landing pages and review management, pest control clients typically see 2-3× more calls within the first quarter.",
      },
      {
        question: "Can LocalBeacon help me sell more recurring treatment plans?",
        answer:
          "Yes. Our automated content educates homeowners on the benefits of quarterly pest prevention — not just reactive treatments. This shifts the conversation from \"kill this bug\" to \"protect my home year-round,\" driving recurring revenue.",
      },
      {
        question: "What kind of content does LocalBeacon create for pest control?",
        answer:
          "Seasonal pest alerts (termite season, rodent season, mosquito season), prevention tips, DIY vs. professional treatment guides, and local pest activity updates. All tailored to your region and the pests your customers actually deal with.",
      },
      {
        question: "How does this help with emergency pest calls?",
        answer:
          "Emergency searches like \"exterminator near me now\" favor businesses with active Google profiles, strong reviews, and structured data. LocalBeacon ensures you check all three boxes so you show up first when someone needs help urgently.",
      },
      {
        question: "Do I need to write anything or manage content?",
        answer:
          "No. LocalBeacon's AI generates all posts, pages, and review responses based on your service details and local pest patterns. You review and approve — that's it.",
      },
      {
        question: "How long until I see more calls?",
        answer:
          "Google posts start within the first week. City pages begin ranking in 2-4 weeks. Most pest control companies see a measurable increase in calls within 60 days, with a significant jump during their next peak pest season.",
      },
    ],
  },

  movers: {
    slug: "movers",
    name: "Moving",
    plural: "Moving Companies",
    headline: "Win the move before they get three quotes.",
    subheadline:
      "LocalBeacon makes your moving company the one homeowners trust and call first — on Google, AI search, and local directories where moving decisions start.",
    description:
      "AI-powered local marketing for moving companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for local and long-distance movers.",
    painPoints: [
      {
        icon: "📦",
        title: "Every customer is a one-time customer",
        text: "People move once every 5-7 years. You can't rely on repeat business — you need a constant stream of new leads. LocalBeacon builds the always-on visibility that replaces every completed job with a new inquiry.",
      },
      {
        icon: "🚫",
        title: "Scam movers make everyone suspicious",
        text: "Rogue movers who hold belongings hostage have made the entire industry look bad. A strong review presence, professional content, and consistent online visibility signal that you're the legitimate, trustworthy choice.",
      },
      {
        icon: "☀️",
        title: "Summer peaks, January flatlines",
        text: "80% of moves happen May through September. LocalBeacon drives off-season leads with corporate relocation content, downsizing guides, and winter moving discounts that keep your crews working year-round.",
      },
    ],
    features: [
      {
        title: "Moving tips and seasonal content on autopilot",
        text: "Packing checklists, moving day preparation guides, utility transfer reminders, and seasonal moving tips — posted to your Google listing to capture homeowners in the planning stage.",
      },
      {
        title: "City-to-city and neighborhood pages",
        text: "\"Movers in Eagan\" and \"Moving from Minneapolis to Rochester\" pages that capture both local and route-specific searches across your service area.",
      },
      {
        title: "AI search readiness for high-intent queries",
        text: "When someone asks an AI assistant \"best movers near me\" or \"reliable moving company in [city],\" your business shows up with the structured data, reviews, and authority AI tools need to recommend you.",
      },
      {
        title: "Reviews that prove you're not a scam",
        text: "Fast, detailed review responses show prospective customers that you're professional, responsive, and accountable — the fastest way to overcome the trust deficit in the moving industry.",
      },
    ],
    stats: [
      { value: "2.6×", label: "more quote requests" },
      { value: "25+", label: "routes and cities covered" },
      { value: "88%", label: "quote-to-book rate from organic leads" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help moving companies get more bookings?",
        answer:
          "We increase your visibility on Google through weekly content, city-specific and route-specific landing pages, and professional review management. Moving companies using LocalBeacon typically see 2-3× more quote requests within the first quarter.",
      },
      {
        question: "Can LocalBeacon help me get off-season bookings?",
        answer:
          "Yes. We post content about corporate relocations, downsizing, senior moves, and winter moving benefits that drive inquiries year-round — not just during the summer rush.",
      },
      {
        question: "How does LocalBeacon help overcome the trust problem in moving?",
        answer:
          "Consistent online presence, strong review management, and professional content signal legitimacy. When a homeowner sees weekly posts, dozens of responded-to reviews, and detailed service pages, they know you're not a fly-by-night operation.",
      },
      {
        question: "What kind of content does LocalBeacon create for movers?",
        answer:
          "Packing tips, moving checklists, cost estimation guides, apartment vs. house moving advice, long-distance moving preparation, and seasonal content. All designed to capture homeowners during the research and planning phase.",
      },
      {
        question: "Can you create pages for specific moving routes?",
        answer:
          "Yes. Beyond city pages, we create route-specific pages like \"Moving from [City A] to [City B]\" that capture long-distance and intercity moving searches — a high-intent keyword most competitors ignore.",
      },
      {
        question: "How quickly will I see results?",
        answer:
          "Posts go live within the first week. Landing pages start ranking in 2-4 weeks. Most moving companies see measurable quote increases within 60-90 days, with the biggest impact during their next peak moving season.",
      },
    ],
  },

  locksmiths: {
    slug: "locksmiths",
    name: "Locksmith",
    plural: "Locksmiths",
    headline: "Be the locksmith they call, not the scam.",
    subheadline:
      "LocalBeacon builds the trusted online presence that separates your legitimate locksmith business from the fake listings and bait-and-switch operators flooding Google.",
    description:
      "AI-powered local marketing for locksmiths. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for legitimate locksmith businesses.",
    painPoints: [
      {
        icon: "🔒",
        title: "Scam listings are burying your real business",
        text: "Fake locksmith listings with bogus addresses dominate Google Maps. A strong, verified presence with consistent content and authentic reviews is the only way to stand out as the real deal.",
      },
      {
        icon: "🕐",
        title: "Emergency calls go to whoever shows up first in search",
        text: "Lockouts happen at 2 AM. The customer doesn't compare three options — they call the first number they see. LocalBeacon makes sure that number is yours with 24/7 visibility and optimized emergency keywords.",
      },
      {
        icon: "💳",
        title: "Low trust means price objections on every call",
        text: "Customers expect to be ripped off because so many have been. A professional online presence with transparent content and strong reviews lets you charge fair prices without the haggling.",
      },
    ],
    features: [
      {
        title: "Security tips that build authority and trust",
        text: "Home security assessments, smart lock guides, lock maintenance tips, and seasonal security reminders — posted to your Google listing to position you as the knowledgeable, trustworthy choice.",
      },
      {
        title: "Local pages that outrank fake listings",
        text: "\"24/7 Locksmith in Burnsville\" and \"Car Lockout Service in Bloomington\" pages with real address verification, service details, and structured data that Google trusts more than scam listings.",
      },
      {
        title: "AI search optimization for emergency queries",
        text: "When someone asks their phone \"locksmith near me open now\" at midnight, your business appears with verified hours, pricing transparency, and the structured data AI assistants prioritize.",
      },
      {
        title: "Review responses that prove legitimacy",
        text: "Detailed, professional responses to every review — including addressing specific jobs — prove you're a real business with real customers, not a call center routing to random contractors.",
      },
    ],
    stats: [
      { value: "3.8×", label: "more emergency calls" },
      { value: "12+", label: "cities with top-3 ranking" },
      { value: "92%", label: "of callers mention finding on Google" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help legitimate locksmiths compete with scam listings?",
        answer:
          "Consistent content, real reviews with professional responses, and verified local pages signal to both Google and customers that you're legitimate. Over time, your authentic presence outranks and outperforms fake listings that have no real engagement.",
      },
      {
        question: "Can LocalBeacon help me get more emergency lockout calls?",
        answer:
          "Yes. We optimize your profile for emergency keywords, ensure your hours show 24/7 availability, and build the local authority that puts you at the top of urgent \"locksmith near me\" searches — when customers don't have time to scroll.",
      },
      {
        question: "What content does LocalBeacon post for locksmiths?",
        answer:
          "Home security tips, smart lock reviews, rekeying vs. replacing guides, car lockout prevention advice, and seasonal security reminders. Content that positions you as a security expert, not just someone who picks locks.",
      },
      {
        question: "How does LocalBeacon help with pricing objections?",
        answer:
          "Transparent content about locksmith pricing, educational posts about what fair pricing looks like, and a strong review presence all reduce the suspicion customers feel. When they see your professional online presence, they're less likely to haggle.",
      },
      {
        question: "Will this work if I also do commercial locksmith work?",
        answer:
          "Absolutely. We create separate pages for residential lockouts, commercial access control, automotive locksmith services, and safe installation — each optimized for the specific searches those customers use.",
      },
      {
        question: "How fast can LocalBeacon start working for my locksmith business?",
        answer:
          "Posts go live within the first week. Because locksmith searches are high-intent and often emergency-driven, even small improvements in visibility translate to calls quickly. Most clients see measurable results within 30-45 days.",
      },
    ],
  },

  handymen: {
    slug: "handymen",
    name: "Handyman",
    plural: "Handymen",
    headline: "Small jobs. Steady pipeline. Zero downtime.",
    subheadline:
      "LocalBeacon keeps your handyman business booked with the small-to-medium projects homeowners need done — on Google, AI search, and local directories.",
    description:
      "AI-powered local marketing for handyman services. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for general handymen and home repair professionals.",
    painPoints: [
      {
        icon: "🔧",
        title: "Too many small jobs, not enough visibility",
        text: "You fix faucets, hang TVs, patch drywall, and assemble furniture — but Google doesn't know that. LocalBeacon creates content for every service you offer so you rank for all the small jobs that add up to a full schedule.",
      },
      {
        icon: "📅",
        title: "Gaps between jobs eat your profits",
        text: "One cancellation and your Tuesday afternoon is empty. LocalBeacon generates a consistent flow of new inquiries so you always have backfill when schedules shift.",
      },
      {
        icon: "🏷️",
        title: "Homeowners don't know what to search for",
        text: "Is it a handyman job or a contractor job? Homeowners aren't sure. LocalBeacon targets the actual phrases people use — \"someone to fix my deck railing\" or \"hang shelves\" — not just \"handyman near me.\"",
      },
    ],
    features: [
      {
        title: "Content for every service in your toolkit",
        text: "Drywall repair tips, furniture assembly guides, seasonal home maintenance checklists, and fix-it advice — posted weekly to show Google (and homeowners) the full range of what you handle.",
      },
      {
        title: "Neighborhood pages that fill your schedule",
        text: "\"Handyman in Savage\" and \"Home Repairs in Prior Lake\" pages that capture local searches in every neighborhood you're willing to drive to.",
      },
      {
        title: "AI search for \"I need someone to fix...\" queries",
        text: "More homeowners describe problems to AI assistants instead of searching for categories. LocalBeacon structures your services so AI tools can match your business to specific fix-it requests.",
      },
      {
        title: "Reviews that build a recurring client base",
        text: "Thoughtful review responses turn one-time callers into regulars who bookmark your number. A strong review presence also reassures first-time customers about letting you into their home.",
      },
    ],
    stats: [
      { value: "2.4×", label: "more weekly bookings" },
      { value: "10+", label: "neighborhoods ranked per client" },
      { value: "52%", label: "of clients become repeat customers" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help handymen get more jobs?",
        answer:
          "We create content and landing pages for every service you offer — not just \"handyman.\" By targeting specific searches like \"deck repair near me\" and \"TV mounting in [city],\" you capture the homeowners who need exactly what you do.",
      },
      {
        question: "Can LocalBeacon help me fill gaps in my schedule?",
        answer:
          "Yes. A consistent online presence generates steady inquiries throughout the week. When a job cancels or finishes early, you have a queue of interested homeowners instead of an empty afternoon.",
      },
      {
        question: "I do a lot of different things — can LocalBeacon handle that?",
        answer:
          "That's actually your superpower. We create separate content and pages for each service — plumbing repairs, drywall patching, deck maintenance, furniture assembly, TV mounting, and more. The broader your skills, the more keywords we can target.",
      },
      {
        question: "What if I don't have a contractor's license?",
        answer:
          "LocalBeacon focuses on the handyman services that typically don't require licensure — small repairs, installations, and maintenance. We tailor your content to the services you legally offer in your state.",
      },
      {
        question: "How does this help me compete with larger home service companies?",
        answer:
          "Homeowners often prefer a local handyman over a big company for small jobs. LocalBeacon amplifies that advantage by making you the visible, well-reviewed local option with neighborhood-specific pages that national companies can't match.",
      },
      {
        question: "How soon will I see more calls?",
        answer:
          "Posts start going live within the first week. Because handyman searches are high-frequency and local, most clients see new inquiries within 3-4 weeks, with a strong pipeline building within 60 days.",
      },
    ],
  },

  "appliance-repair": {
    slug: "appliance-repair",
    name: "Appliance Repair",
    plural: "Appliance Repair Companies",
    headline: "Be the fix, not the second opinion.",
    subheadline:
      "LocalBeacon makes your appliance repair business the first one homeowners find when the fridge stops cooling or the washer won't spin.",
    description:
      "AI-powered local marketing for appliance repair companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for appliance repair technicians.",
    painPoints: [
      {
        icon: "🧊",
        title: "Emergency calls go to whoever ranks first",
        text: "A broken fridge full of groceries is a crisis. Homeowners call the first company they find — if that's not you, you've lost the job before you knew it existed. LocalBeacon puts you at the top of those urgent searches.",
      },
      {
        icon: "🏭",
        title: "Brand-specific searches you're missing",
        text: "Homeowners search for \"Samsung fridge repair\" or \"LG washer technician,\" not just \"appliance repair.\" LocalBeacon creates brand-specific content and pages so you capture these high-intent searches for every brand you service.",
      },
      {
        icon: "🔄",
        title: "Manufacturer warranties send jobs to competitors",
        text: "Warranty-authorized repair networks get the first call on newer appliances. LocalBeacon helps you capture out-of-warranty, older appliance, and second-opinion searches — the jobs that are actually yours to win.",
      },
    ],
    features: [
      {
        title: "Appliance maintenance tips posted weekly",
        text: "Refrigerator coil cleaning reminders, dishwasher maintenance guides, dryer vent safety tips, and seasonal appliance prep — posted to your Google listing to build authority and drive preventive service calls.",
      },
      {
        title: "Brand-specific and city-specific pages",
        text: "\"Whirlpool Repair in Roseville\" and \"Samsung Washer Repair in Woodbury\" pages that capture the specific brand + location searches homeowners actually use.",
      },
      {
        title: "AI search optimization for appliance emergencies",
        text: "When someone asks their phone \"my dishwasher is leaking who do I call,\" your business shows up with the structured service data, hours, and reviews AI assistants need to recommend you.",
      },
      {
        title: "Review responses that highlight expertise",
        text: "Professional replies that mention the specific appliance and fix demonstrate your technical knowledge — convincing prospective customers you can handle their particular brand and problem.",
      },
    ],
    stats: [
      { value: "3.5×", label: "more emergency repair calls" },
      { value: "30+", label: "brand-city page combinations" },
      { value: "24hr", label: "avg time to first new lead" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help appliance repair companies get more calls?",
        answer:
          "We target both general appliance repair searches and brand-specific queries that most competitors miss. Combined with weekly maintenance content and professional review responses, our clients typically see 2-3× more calls within 90 days.",
      },
      {
        question: "Can LocalBeacon create pages for specific appliance brands I service?",
        answer:
          "Yes. We create dedicated pages for every brand you work on — Samsung, LG, Whirlpool, GE, Maytag, Bosch, and more — combined with every city you serve. \"GE Refrigerator Repair in [City]\" is exactly the kind of search that drives high-intent calls.",
      },
      {
        question: "How does this help me compete with manufacturer-authorized repair networks?",
        answer:
          "Many homeowners are out of warranty, have older appliances, or want a second opinion. LocalBeacon positions you as the experienced, local alternative — faster response times, transparent pricing, and the expertise to handle any brand.",
      },
      {
        question: "What content does LocalBeacon create for appliance repair?",
        answer:
          "Appliance maintenance tips, troubleshooting guides (\"Why is my dryer not heating?\"), seasonal prep reminders, energy efficiency advice, and repair vs. replace decision guides. Content that answers the questions homeowners are already searching for.",
      },
      {
        question: "Do I need to provide technical information?",
        answer:
          "Just tell us which brands and appliances you service. Our AI generates technically accurate, homeowner-friendly content based on your specialties. You review and approve — no writing required.",
      },
      {
        question: "How fast does LocalBeacon start generating leads for appliance repair?",
        answer:
          "Appliance repair is one of the fastest categories to see results because searches are urgent and high-intent. Posts go live within the first week, and most clients see new calls within 2-3 weeks as city and brand pages start indexing.",
      },
    ],
  },

  "garage-door": {
    slug: "garage-door",
    name: "Garage Door",
    plural: "Garage Door Companies",
    headline: "Open the door to more service calls.",
    subheadline:
      "LocalBeacon keeps your garage door business visible on Google and AI search — so homeowners call you first when the door won't open, the spring snaps, or they want an upgrade.",
    description:
      "AI-powered local marketing for garage door companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for garage door installation and repair businesses.",
    painPoints: [
      {
        icon: "⚙️",
        title: "Spring replacements are emergencies — and they call whoever's first",
        text: "A broken garage door spring means a car trapped in the garage. Homeowners call the first company they find on Google, not the best. LocalBeacon makes sure you're the first result in these urgent moments.",
      },
      {
        icon: "🏡",
        title: "New construction installers steal your replacement market",
        text: "Builders have their preferred installer, but 10 years later those doors need replacing. LocalBeacon positions you for the replacement and upgrade searches that come after the builder relationship ends.",
      },
      {
        icon: "📱",
        title: "Smart garage door searches are growing fast",
        text: "Wi-Fi openers, smart home integration, and app-controlled garage doors are booming. If you install these but don't rank for these searches, tech-savvy homeowners find someone who does.",
      },
    ],
    features: [
      {
        title: "Garage door maintenance and safety content",
        text: "Spring inspection reminders, opener troubleshooting tips, weatherstripping guides, and smart garage door upgrade posts — published to your Google listing weekly to build authority.",
      },
      {
        title: "City pages for repair and installation",
        text: "\"Garage Door Repair in Plymouth\" and \"New Garage Door Installation in Minnetonka\" pages that rank you locally for both emergency repairs and planned upgrades in every area you serve.",
      },
      {
        title: "AI-ready for urgent garage door searches",
        text: "When someone tells their phone \"my garage door won't close\" or \"garage door repair near me,\" your business appears with service details, hours, and response time data AI assistants use to make recommendations.",
      },
      {
        title: "Review management that builds homeowner confidence",
        text: "Professional review responses that mention specific jobs — spring replacements, opener installs, panel repairs — demonstrate your range of expertise and build trust with future customers.",
      },
    ],
    stats: [
      { value: "2.9×", label: "more repair calls" },
      { value: "14+", label: "cities ranked per client" },
      { value: "38%", label: "increase in installation quotes" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help garage door companies get more business?",
        answer:
          "We increase your Google visibility for both emergency repairs (broken springs, stuck doors) and planned projects (new installations, opener upgrades). Weekly content, local pages, and review management typically drive 2-3× more calls within 90 days.",
      },
      {
        question: "Can LocalBeacon help me get more installation jobs, not just repairs?",
        answer:
          "Yes. We create content about garage door styles, insulation benefits, smart opener features, and curb appeal upgrades that capture homeowners researching new garage doors — not just the ones with an emergency.",
      },
      {
        question: "What kind of content does LocalBeacon create for garage door companies?",
        answer:
          "Spring maintenance tips, opener troubleshooting guides, insulated vs. non-insulated door comparisons, smart garage door features, weatherstripping advice, and seasonal safety checks. All posted automatically to your Google listing.",
      },
      {
        question: "How does this help with emergency garage door calls?",
        answer:
          "Emergency searches are won by the most visible, most trusted result. LocalBeacon builds your profile authority through consistent posting and review management so when someone's spring snaps at 7 AM, you're the first call.",
      },
      {
        question: "Do I need to provide any content or technical information?",
        answer:
          "Just your service details — what you repair, what you install, brands you carry, and areas you cover. Our AI generates all content, posts, and review responses. You just review and approve.",
      },
      {
        question: "How soon will I see results?",
        answer:
          "Garage door searches are high-intent — people need the service now or soon. Posts go live within the first week, and most companies see new calls within 3-4 weeks as local pages index and content builds visibility.",
      },
    ],
  },

  fencing: {
    slug: "fencing",
    name: "Fencing",
    plural: "Fencing Companies",
    headline: "More fence jobs. Less chasing leads.",
    subheadline:
      "LocalBeacon keeps your fencing company visible on Google and AI search — so homeowners call you first when they need a new fence, not the cheapest quote on Thumbtack.",
    description:
      "AI-powered local marketing for fencing companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for fence installation and repair businesses.",
    painPoints: [
      {
        icon: "🌧️",
        title: "Winter kills your pipeline",
        text: "Ground freezes, installations stop, and your phone goes silent for months. LocalBeacon keeps leads flowing through winter with planning content, spring booking incentives, and indoor consultations that fill your spring schedule before the thaw.",
      },
      {
        icon: "📋",
        title: "Permits and regulations confuse your customers",
        text: "Homeowners delay projects because they're overwhelmed by setback rules, HOA requirements, and permit processes. LocalBeacon posts educational content that positions you as the expert who handles the red tape — removing the friction that stalls projects.",
      },
      {
        icon: "🪵",
        title: "Material choices paralyze decision-making",
        text: "Wood, vinyl, aluminum, composite, chain-link — homeowners freeze when they have too many options. LocalBeacon creates comparison content and material guides that move them from research mode to \"call for a quote\" mode.",
      },
    ],
    features: [
      {
        title: "Fencing content that drives quote requests",
        text: "Material comparison guides, privacy fence vs. picket fence posts, maintenance tips for wood and vinyl, and permit process explainers — posted to your Google listing to capture homeowners in the research phase.",
      },
      {
        title: "City pages for every area you install",
        text: "\"Fence Installation in Lakeville\" and \"Privacy Fence in Apple Valley\" pages that rank you locally in every city, suburb, and township across your service territory.",
      },
      {
        title: "AI search optimization for fencing queries",
        text: "When homeowners ask AI assistants \"how much does a fence cost\" or \"best fencing company near me,\" your structured data and content authority put you in the recommended results.",
      },
      {
        title: "Review responses that showcase your installations",
        text: "Professional replies that reference specific fence types, materials, and neighborhoods demonstrate your experience and craftsmanship — turning your review section into a portfolio of completed projects.",
      },
    ],
    stats: [
      { value: "2.3×", label: "more quote requests" },
      { value: "16+", label: "cities ranked per client" },
      { value: "42%", label: "more off-season consultations" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help fencing companies get more jobs?",
        answer:
          "We target the searches homeowners make when planning a fence — material comparisons, cost guides, permit questions, and local contractor searches. Weekly content, city pages, and review management typically drive 2-3× more quote requests within the first quarter.",
      },
      {
        question: "Can LocalBeacon help me book jobs during the off-season?",
        answer:
          "Yes. We post content about spring planning, early-bird booking incentives, material selection guides, and virtual consultation availability — converting winter researchers into confirmed spring installations before your competitors wake up.",
      },
      {
        question: "What kind of content does LocalBeacon create for fencing companies?",
        answer:
          "Wood vs. vinyl comparisons, privacy fence height guides, HOA-friendly fencing options, pool fence safety requirements, property line and setback explainers, and seasonal maintenance tips. All tailored to your local market and regulations.",
      },
      {
        question: "How does this help with the \"three quotes\" problem?",
        answer:
          "Homeowners always get multiple quotes, but they give the job to the company they trust most. A strong online presence with consistent content and professional reviews means you're often the first call — and the one they compare everyone else against.",
      },
      {
        question: "Can LocalBeacon help me rank for specific fence types?",
        answer:
          "Yes. We create content and pages for privacy fences, picket fences, chain-link, vinyl, wood, aluminum, pool fencing, and commercial fencing — each optimized for the specific searches homeowners use for that material or style.",
      },
      {
        question: "How quickly will I see results?",
        answer:
          "Posts go live within the first week. City and material-specific pages typically start ranking in 2-4 weeks. Most fencing companies see measurable quote increases within 60-90 days, especially as their next peak season approaches.",
      },
    ],
  },
}
