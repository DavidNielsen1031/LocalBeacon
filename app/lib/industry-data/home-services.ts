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
      "Local marketing automation for plumbing companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for plumbers.",
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
      "Local marketing automation for HVAC companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for heating and cooling businesses.",
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
        title: "Ready for AI search",
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
      "Local marketing automation for electrical contractors. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for electricians.",
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
      "Local marketing automation for roofing companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for roofers.",
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
      "Local marketing automation for painting companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for house painters.",
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
      "Local marketing automation for residential and commercial cleaning companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for cleaning services.",
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
      "Local marketing automation for pest control companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for exterminators and pest management professionals.",
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
      "Local marketing automation for moving companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for local and long-distance movers.",
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
      "Local marketing automation for locksmiths. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for legitimate locksmith businesses.",
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
      "Local marketing automation for handyman services. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for general handymen and home repair professionals.",
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
      "Local marketing automation for appliance repair companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for appliance repair technicians.",
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
      "Local marketing automation for garage door companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for garage door installation and repair businesses.",
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
      "Local marketing automation for fencing companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for fence installation and repair businesses.",
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

  'emergency-plumbers': {
    slug: "emergency-plumbers",
    name: "Emergency Plumbing",
    plural: "Emergency Plumbers",
    headline: "Be the first call when pipes burst.",
    subheadline: "Emergency plumbing calls go to whoever ranks first at 2am — LocalBeacon makes sure that's you, not your competitor.",
    description: "Local marketing automation for emergency plumbing services. Own the top spot for burst pipes, flooding, and after-hours plumbing emergencies in every city you serve.",
    painPoints: [
      { icon: "🚨", title: "Emergency searches need instant results", text: "When a pipe bursts at midnight, homeowners click the first result — not the best result. If you're not ranking #1 for 'emergency plumber near me,' that call goes to a competitor." },
      { icon: "📍", title: "Response area visibility gaps", text: "You cover a wide area for emergencies but only show up in one city online. LocalBeacon creates optimized emergency service pages for every zip code you'll actually drive to at 3am." },
      { icon: "⏱️", title: "Speed is your brand — your marketing isn't", text: "You arrive fast but customers can't find you fast enough. A stale Google profile with no recent activity makes you look unavailable — even when you're on call 24/7." },
    ],
    features: [
      { title: "24/7 availability signals on your Google listing", text: "Weekly posts highlighting your after-hours emergency response, response time guarantees, and same-day service availability." },
      { title: "Emergency service pages for every city you cover", text: "City-specific pages for 'emergency plumber in [city]' searches that capture high-intent customers mid-crisis." },
      { title: "Rapid-response review management", text: "Prompt responses to every review reinforce your reputation for speed — the #1 factor emergency customers care about." },
      { title: "AI search optimization for urgent queries", text: "Structured for 'who's the fastest emergency plumber near me' queries in ChatGPT, Google AI, and voice search." },
    ],
    stats: [
      { value: "87%", label: "of emergency calls go to top 3 results" },
      { value: "2-3×", label: "more emergency calls within 90 days" },
      { value: "4.9★", label: "avg rating for speed-focused profiles" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me rank for emergency plumbing searches?", answer: "We create dedicated pages for emergency plumbing in each city you serve, post weekly content emphasizing your 24/7 availability, and ensure your Google Business Profile signals are fresh and trusted — the three things that push emergency service providers to the top." },
      { question: "My service area is large. Can LocalBeacon handle all of it?", answer: "Yes. Emergency plumbers often cover 20-30+ mile radiuses. We create optimized pages for every city and major zip code in your area, so you rank locally wherever you'll actually respond." },
      { question: "How do I compete with big franchises like Roto-Rooter?", answer: "Franchises are slow to update local content and reviews. Independent emergency plumbers who stay active on Google Business Profile consistently outrank them in local search because Google favors recency and local relevance." },
      { question: "Do I need to be available 24/7 to benefit from this?", answer: "It helps, but even 'extended hours' emergency services benefit. We'll create content that accurately represents your availability windows and captures high-intent searches during those hours." },
      { question: "How fast will I see more emergency calls?", answer: "Emergency plumbing pages can rank within 2-4 weeks. Most clients see their first additional emergency calls within 30 days, with the real momentum building after 60-90 days of consistent content." },
    ],
  },

  'commercial-plumbers': {
    slug: "commercial-plumbers",
    name: "Commercial Plumbing",
    plural: "Commercial Plumbers",
    headline: "Land bigger contracts. Stay booked with B2B.",
    subheadline: "Commercial plumbing contracts are lucrative but hard to find — LocalBeacon builds your visibility with property managers, GCs, and facilities teams who search online.",
    description: "Local marketing for commercial plumbing contractors. Get found by property managers, general contractors, and facility managers searching for reliable commercial plumbing partners.",
    painPoints: [
      { icon: "🏢", title: "Residential marketing doesn't reach commercial buyers", text: "Property managers and GCs don't search the same way homeowners do. Your marketing is optimized for the wrong audience, leaving high-value commercial contracts on the table." },
      { icon: "📋", title: "No online portfolio of commercial work", text: "Facility managers want to see your commercial experience before they call. Without case studies, project photos, and commercial-specific content, you look like a residential shop." },
      { icon: "🤝", title: "Referrals alone can't scale your commercial pipeline", text: "Your best commercial clients came from referrals, but referrals are unpredictable. LocalBeacon builds inbound commercial leads that fill gaps between referrals." },
    ],
    features: [
      { title: "Commercial plumbing content for B2B searches", text: "Posts and pages targeting 'commercial plumber for property managers,' 'restaurant plumbing contractor,' and 'multi-unit building plumbing' searches." },
      { title: "Service area pages targeting commercial hubs", text: "Location pages targeting business districts, industrial parks, and commercial corridors where your ideal clients manage properties." },
      { title: "Reputation signals for B2B buyers", text: "Commercial buyers research vendors thoroughly. We ensure your Google profile reflects the experience, licensing, and scale that property managers and GCs require." },
      { title: "AI search visibility for commercial RFPs", text: "When facilities managers ask AI assistants to find commercial plumbers, your structured data ensures you're in the recommendation set." },
    ],
    stats: [
      { value: "4-8×", label: "higher contract value vs. residential" },
      { value: "15+", label: "commercial facility types we rank for" },
      { value: "3.1×", label: "more B2B inquiries within 90 days" },
    ],
    faqs: [
      { question: "Can LocalBeacon help me get more property management contracts?", answer: "Yes. We create content specifically targeting property managers — multi-unit building plumbing, preventive maintenance contracts, 24/7 emergency response for tenants — the things property managers actually search for." },
      { question: "How is commercial plumbing marketing different from residential?", answer: "Commercial buyers research more, compare more, and want to see credentials and experience. LocalBeacon builds that credibility through case-study-style content, certification highlights, and B2B-focused service pages." },
      { question: "I want to break into restaurant plumbing. Can LocalBeacon help?", answer: "Absolutely. We create vertical-specific pages for restaurants, hotels, medical offices, and other commercial niches you want to target — each optimized for the specific searches those owners and managers do." },
      { question: "Do commercial clients use Google to find plumbers?", answer: "Yes, especially for new vendor relationships. Property managers and facilities directors regularly search Google for vetted commercial contractors when their current vendor falls through or they need a backup." },
      { question: "How long until I see commercial leads?", answer: "Commercial searches are lower volume but higher intent. You may see your first commercial inquiry within 30-60 days. Volume builds steadily over 3-6 months as your pages establish authority." },
    ],
  },

  'drain-cleaning': {
    slug: "drain-cleaning",
    name: "Drain Cleaning",
    plural: "Drain Cleaning Services",
    headline: "Own every clogged drain in your city.",
    subheadline: "Drain cleaning is one of the most searched plumbing services — LocalBeacon puts your business at the top for every 'drain cleaning near me' search in your area.",
    description: "Local SEO for drain cleaning services. Dominate searches for clogged drains, sewer line cleaning, hydro jetting, and drain maintenance in every neighborhood you serve.",
    painPoints: [
      { icon: "🚿", title: "Generic plumbing rankings don't capture drain searches", text: "Homeowners searching 'drain cleaning near me' or 'hydro jetting service' aren't finding you if you're only optimized for 'plumber.' Drain-specific pages capture this high-volume traffic." },
      { icon: "🔄", title: "Drain cleaning is repeat business you're missing", text: "Kitchen grease and hair clogs are a recurring problem for the same households. Without follow-up marketing, past drain customers call whoever ranks #1 next time — not you." },
      { icon: "🏠", title: "HOAs and property managers are a goldmine", text: "Multi-unit buildings have chronic drain issues but need a reliable vendor on speed dial. Without B2B visibility, you're missing the recurring contract opportunities right in your market." },
    ],
    features: [
      { title: "Drain-specific content and city pages", text: "Pages targeting 'drain cleaning in [city],' 'hydro jetting near me,' and 'sewer line clearing' — capturing searches that generic plumbing pages miss." },
      { title: "Seasonal drain maintenance campaigns", text: "Grease buildup posts for fall, root intrusion content for spring, and back-to-school kitchen drain tips — timed to when drain calls spike." },
      { title: "Commercial drain service visibility", text: "Restaurant, hotel, and property management-focused content that positions you as the go-to for commercial drain maintenance contracts." },
      { title: "Review management to cement trust", text: "Drain cleaning customers leave reviews when you save the day. We ensure those reviews are responded to and prominently featured in your profile." },
    ],
    stats: [
      { value: "5,400+", label: "'drain cleaning near me' searches/mo" },
      { value: "2.8×", label: "more calls vs. plumber-only positioning" },
      { value: "89%", label: "of drain calls come from Google search" },
    ],
    faqs: [
      { question: "Is drain cleaning worth marketing separately from general plumbing?", answer: "Absolutely. 'Drain cleaning near me' has massive search volume and lower competition than 'plumber near me.' Dedicated drain cleaning pages capture customers who want a specialist, not a generalist." },
      { question: "Can LocalBeacon help me promote hydro jetting services?", answer: "Yes. Hydro jetting has its own search queries and customer profile. We create hydro jetting-specific content that positions your service as the premium drain solution." },
      { question: "How do I get recurring drain cleaning customers?", answer: "LocalBeacon keeps your Google Business Profile active with content about annual drain maintenance programs, which attracts customers interested in preventive service — the most loyal, highest-lifetime-value segment." },
      { question: "Can I target commercial kitchens and restaurants?", answer: "Yes. Restaurant drain cleaning has high contract value and recurring frequency. We create B2B-targeted content and pages specifically for food service drain maintenance." },
      { question: "Will this help me compete with companies that only do drain cleaning?", answer: "Yes. Specialized drain companies often outrank general plumbers for drain searches. LocalBeacon levels the playing field by giving you dedicated drain cleaning content that matches their specialization signal." },
    ],
  },

  'water-heater-installers': {
    slug: "water-heater-installers",
    name: "Water Heater Installation",
    plural: "Water Heater Installers",
    headline: "Every cold shower is a hot lead for you.",
    subheadline: "When a water heater fails, homeowners need a replacement fast — LocalBeacon makes sure you're the first water heater installer they find.",
    description: "Local SEO for water heater installation and replacement services. Rank for tank, tankless, and hybrid water heater searches in every city you serve.",
    painPoints: [
      { icon: "🚿", title: "Water heater failures are urgent and unsearchable in advance", text: "No one plans for a water heater failure. When it happens, they search frantically. If you're not ranking for 'water heater replacement near me,' that $1,500+ job goes to someone else." },
      { icon: "💡", title: "Tankless water heater demand is exploding", text: "Homeowners are actively researching tankless upgrades, but 'plumber' searches won't capture them. Water heater-specific content positions you as the expert for this premium-ticket work." },
      { icon: "🔋", title: "Seasonal demand you're not capitalizing on", text: "Water heater failures spike in winter when demand on the unit increases. Without seasonal content and search visibility, you're missing the most profitable window of the year." },
    ],
    features: [
      { title: "Water heater-specific pages by type and city", text: "Dedicated pages for tank, tankless, and heat pump water heater installation in each city — capturing customers comparing options." },
      { title: "Educational content that converts researchers", text: "'Tankless vs. tank water heater' comparisons, energy savings calculators, and lifespan guides that capture planning-stage buyers before they pick up the phone." },
      { title: "Emergency replacement positioning", text: "After-hours and same-day water heater replacement content that captures homeowners who need immediate service." },
      { title: "Brand and model content", text: "Rheem, Bradford White, Navien, and Rinnai brand-specific content captures customers who've already researched their preferred product and just need an installer." },
    ],
    stats: [
      { value: "$1,200–$3,500", label: "avg water heater job value" },
      { value: "22%", label: "YoY growth in tankless searches" },
      { value: "3.4×", label: "more installs per month for clients" },
    ],
    faqs: [
      { question: "Should I market water heater installation separately from general plumbing?", answer: "Yes. Water heater replacement is one of the most searched plumbing services and one of the highest-ticket. Dedicated water heater pages outperform generic plumber pages for this specific search intent." },
      { question: "How does LocalBeacon help me sell more tankless water heaters?", answer: "We create educational content comparing tankless and tank systems, highlighting long-term savings and comfort benefits — converting homeowners who are considering an upgrade before they decide to wait." },
      { question: "Can I get found for commercial water heater installation too?", answer: "Yes. We create commercial-focused pages for apartment complexes, restaurants, and offices that have large-capacity or commercial water heater needs." },
      { question: "How do I compete with big-box stores that also install water heaters?", answer: "Big-box stores have terrible local search visibility and slow scheduling. LocalBeacon positions you as the fast, expert local alternative — a critical advantage when a homeowner has no hot water." },
      { question: "How quickly will I see more water heater calls?", answer: "Replacement calls can come within the first few weeks as your pages index. Planning-stage and upgrade leads take 30-60 days to build momentum as your content gains authority." },
    ],
  },

  'sewer-repair': {
    slug: "sewer-repair",
    name: "Sewer Repair",
    plural: "Sewer Repair Services",
    headline: "High-ticket sewer jobs start with Google.",
    subheadline: "Sewer line repairs and replacements are among the biggest plumbing jobs — LocalBeacon positions you to capture these high-value leads before your competitors do.",
    description: "Local SEO for sewer repair, sewer line replacement, and trenchless sewer repair services. Dominate local search for high-value sewer work in your service area.",
    painPoints: [
      { icon: "🔩", title: "Sewer searches are high-value and underserved", text: "Sewer line repair and replacement jobs average $3,000-15,000, but most plumbers don't have dedicated sewer pages. That gap means high-intent searches often go unanswered." },
      { icon: "🏡", title: "Homeowners panic-search during sewer failures", text: "A sewage backup or collapsed line creates an urgent, anxious homeowner with a credit card ready. First-call advantage is everything — your ranking determines who gets that call." },
      { icon: "🏗️", title: "Trenchless technology needs its own marketing", text: "Homeowners specifically search for 'trenchless sewer repair' to avoid destroying their yard. If you offer this service but don't rank for it, you're losing premium jobs to competitors who do." },
    ],
    features: [
      { title: "Sewer-specific service pages by city", text: "Dedicated pages for sewer line repair, sewer replacement, and trenchless sewer repair in every city you serve — capturing the highest-value plumbing searches." },
      { title: "Trenchless method content", text: "Pipe lining, pipe bursting, and camera inspection content that educates homeowners and positions your service as the modern, yard-saving solution." },
      { title: "Emergency sewer service positioning", text: "Sewage backup and overflow content that captures emergency sewer searches — the highest-urgency, least price-sensitive segment in plumbing." },
      { title: "Before/after content strategy", text: "We help you showcase project outcomes — collapsed line to restored flow — the type of content that builds trust for large-ticket sewer work." },
    ],
    stats: [
      { value: "$4,800", label: "avg sewer repair job value" },
      { value: "3.7×", label: "ROI vs. paid sewer ads" },
      { value: "15+", label: "sewer-specific search terms we rank for" },
    ],
    faqs: [
      { question: "Is sewer repair worth marketing separately from plumbing?", answer: "Absolutely. Sewer repair has distinct search terms, higher job values, and lower competition than general plumbing. Dedicated sewer pages consistently out-convert general plumber pages for sewer searches." },
      { question: "How does LocalBeacon promote trenchless sewer repair?", answer: "We create trenchless-specific pages and content explaining the benefits — no yard destruction, faster completion, lower long-term cost — targeting the growing segment of homeowners who specifically search for this option." },
      { question: "Can I capture more camera inspection leads?", answer: "Yes. Camera inspection pages attract both emergency diagnosis customers and proactive homeowners checking older sewer lines. These leads often convert into full sewer repair jobs." },
      { question: "How do I compete with large plumbing companies that advertise heavily?", answer: "Large companies dominate paid ads. LocalBeacon dominates organic search, where most long-term high-value customers come from. Organic rankings are more trusted and cost a fraction of PPC." },
      { question: "What cities can LocalBeacon build sewer repair pages for?", answer: "Every city in your service area. Most sewer contractors serve 5-20 cities. We build optimized pages for each, giving you local search presence everywhere you'll do a sewer job." },
    ],
  },

  'ac-repair': {
    slug: "ac-repair",
    name: "AC Repair",
    plural: "AC Repair Services",
    headline: "Be the first call on the hottest days.",
    subheadline: "Air conditioning failures happen when demand is highest — LocalBeacon puts your AC repair business at the top of search before summer even starts.",
    description: "Local SEO for air conditioning repair services. Rank for AC repair, air conditioner troubleshooting, and emergency cooling service searches across your entire service area.",
    painPoints: [
      { icon: "🌡️", title: "Peak demand = peak competition for calls", text: "Every AC company in your market is fighting for the same calls during summer heatwaves. Without strong local search presence, your phones stay quieter than they should." },
      { icon: "📞", title: "Reactive customers have no brand loyalty", text: "When an AC fails, homeowners call the first number they find — not the company they vaguely remember. Without consistent local visibility, you're anonymous until the moment they search." },
      { icon: "❄️", title: "Off-season visibility gaps cost you spring tune-up revenue", text: "The spring maintenance season is your best opportunity for booked schedules and upsells. Without year-round visibility, customers call a competitor they found during summer." },
    ],
    features: [
      { title: "AC repair pages for every city you serve", text: "City-specific pages for 'AC repair in [city]' and 'air conditioner fix near me' — capturing same-day service searches during peak demand." },
      { title: "Seasonal content that stays ahead of demand", text: "Spring tune-up reminders, summer emergency preparedness content, and fall shutdown guides timed to local weather patterns." },
      { title: "Brand-specific repair content", text: "Carrier, Trane, Lennox, and Goodman model-specific content for homeowners who know what unit they have and want a brand-knowledgeable technician." },
      { title: "Emergency cooling call positioning", text: "Same-day and after-hours AC repair content that captures desperate homeowners during heatwaves — the highest-intent, least price-sensitive AC calls." },
    ],
    stats: [
      { value: "4.2×", label: "more calls during summer peaks" },
      { value: "28%", label: "of annual AC revenue in 6 summer weeks" },
      { value: "3.1×", label: "more spring tune-up bookings" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me during summer demand spikes?", answer: "We build your search rankings year-round so that when summer demand surges, you're already on page one. Last-minute optimization doesn't work — we start months before the heat hits." },
      { question: "Can LocalBeacon help me get more maintenance agreements?", answer: "Yes. Maintenance agreement content targets homeowners who want the peace of mind of scheduled tune-ups — the most loyal, highest-lifetime-value AC customers you can have." },
      { question: "How do I rank for 'AC repair near me' in multiple cities?", answer: "We build dedicated city pages for every location you serve. Each page is optimized for local search in that specific city, covering all the neighborhoods where homeowners are searching." },
      { question: "Can I promote specific services like refrigerant recharging or capacitor replacement?", answer: "Yes. Service-specific content captures customers who've done research and know what they need — these leads convert at significantly higher rates than generic 'AC help' searches." },
      { question: "Is it worth marketing AC repair during winter?", answer: "Absolutely. Winter is when homeowners sign up for spring maintenance and research equipment replacement. Being visible in winter keeps your spring schedule full before competitors wake up." },
    ],
  },

  'furnace-repair': {
    slug: "furnace-repair",
    name: "Furnace Repair",
    plural: "Furnace Repair Services",
    headline: "First call when the heat goes out.",
    subheadline: "Furnace failures in January are urgent and stressful — LocalBeacon makes sure your furnace repair business is the first one panicked homeowners find.",
    description: "Local SEO for furnace repair and heating system services. Dominate 'furnace repair near me' searches and emergency heating calls across your service area.",
    painPoints: [
      { icon: "🥶", title: "Heating emergencies can't wait — and won't wait for you", text: "A furnace failure at -10°F is a family crisis. Homeowners call whoever appears first on Google. If that's your competitor, you've lost a job and potentially a long-term customer." },
      { icon: "📅", title: "Fall tune-up season passes without enough bookings", text: "The best time to sell furnace maintenance is October. Without proactive content and visibility, homeowners forget to call until something breaks — costing you the highest-margin work of the year." },
      { icon: "🔄", title: "Repair or replace decisions happen without you", text: "Homeowners with older furnaces are researching replacement online before they call anyone. If you're not visible in that research phase, a competitor wins the installation job." },
    ],
    features: [
      { title: "Emergency furnace repair search domination", text: "City-specific 'emergency furnace repair' pages that capture homeowners searching in crisis — your highest-urgency, least price-sensitive segment." },
      { title: "Fall maintenance content calendar", text: "Pre-winter tune-up reminders and 'furnace not working' diagnostic content timed to the seasons when heating calls spike." },
      { title: "Repair vs. replace decision content", text: "Educational content helping homeowners decide when to repair vs. replace — positioning you as the trusted expert before they even pick up the phone." },
      { title: "Brand and age-specific repair content", text: "Content for Carrier, Lennox, Rheem, and other brands — plus 'furnace over 15 years old' content that captures replacement-ready households." },
    ],
    stats: [
      { value: "3.8×", label: "more calls during cold snaps" },
      { value: "$450–$900", label: "avg furnace repair ticket" },
      { value: "67%", label: "of winter calls come from Google" },
    ],
    faqs: [
      { question: "How early should I start marketing furnace repair for winter?", answer: "By September at the latest. LocalBeacon starts building your search presence months before the cold weather hits, so you're ranked and ready when homeowners start searching in October and November." },
      { question: "How do I capture homeowners who are thinking about furnace replacement?", answer: "We create replacement consideration content — cost guides, efficiency comparisons, repair vs. replace calculators — that captures homeowners in research mode and keeps you top-of-mind for the installation decision." },
      { question: "Can LocalBeacon help me sell more furnace maintenance plans?", answer: "Yes. Content about the value of annual tune-ups, filter replacement, and safety inspections attracts homeowners interested in preventive maintenance — your most loyal repeat customers." },
      { question: "I cover a large area in winter. Can LocalBeacon handle all my cities?", answer: "Yes. We build city-specific furnace repair pages for every location you serve, ensuring you rank locally for 'furnace repair in [city]' searches across your entire winter service territory." },
      { question: "What about marketing heat pump repair as heat pumps become more common?", answer: "Absolutely. Heat pump repair is a fast-growing search segment. We create heat pump-specific content alongside furnace content so you're positioned for both technologies as the market shifts." },
    ],
  },

  'hvac-installation': {
    slug: "hvac-installation",
    name: "HVAC Installation",
    plural: "HVAC Installers",
    headline: "Win the big installation jobs in your market.",
    subheadline: "New system installations are the highest-value HVAC jobs — LocalBeacon positions you to capture homeowners and builders who are actively planning replacements.",
    description: "Local SEO for HVAC installation companies. Rank for new system installation, equipment replacement, and new construction HVAC searches in your market.",
    painPoints: [
      { icon: "🏗️", title: "Replacement decisions happen before they call anyone", text: "Homeowners research new HVAC systems for weeks before requesting quotes. If you're not visible during the research phase, you'll never get the call — no matter how competitive your price." },
      { icon: "🔍", title: "Brand preference drives installation decisions", text: "Many homeowners come to you already decided on Trane or Lennox. Without brand-specific installation content, you're invisible to the most brand-loyal — and often most affluent — buyers." },
      { icon: "🏠", title: "New construction pipeline requires builder relationships", text: "Builders choose HVAC installers based on reputation and reliability. Without a strong professional presence online, you're not in the conversation when new developments start." },
    ],
    features: [
      { title: "Equipment replacement content that converts", text: "System age guides, efficiency upgrade content, and SEER rating comparisons that capture homeowners actively planning to replace aging equipment." },
      { title: "Brand-specific installation pages", text: "Trane, Carrier, Lennox, and Daikin installation pages that capture brand-specific searches and align with manufacturer dealer program requirements." },
      { title: "New construction HVAC visibility", text: "Content targeting 'HVAC for new construction,' 'builder HVAC contractor,' and related searches that capture the high-volume residential building market." },
      { title: "Financing and rebate content", text: "Energy efficiency rebate guides and financing option content that reduces decision friction for homeowners comparing your installation quote to competitors." },
    ],
    stats: [
      { value: "$8,000–$15,000", label: "avg new system installation value" },
      { value: "4.5×", label: "ROI vs. paid installation ads" },
      { value: "2.9×", label: "more installation quotes requested" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me get more HVAC replacement leads?", answer: "We create content targeting homeowners at every stage of the replacement decision — from 'my HVAC is 15 years old' to 'best HVAC brands for Minnesota homes' to 'HVAC installation quotes near me.' This covers the full research journey." },
      { question: "Can LocalBeacon help me become a preferred installer for a specific brand?", answer: "Yes. Brand-specific installation pages signal to manufacturers that you're actively promoting their products, which strengthens your dealer relationship and captures brand-loyal customers." },
      { question: "How do I get more new construction leads from builders?", answer: "We create content that targets builder-focused searches and positions you as a professional trade partner — the kind of presence that gets you added to a builder's preferred vendor list." },
      { question: "Can LocalBeacon help me promote utility rebate programs?", answer: "Absolutely. Rebate and incentive content is one of the most effective HVAC installation drivers — homeowners who know about rebates are already motivated to act. We make you the source of that information." },
      { question: "How long until I see more installation leads?", answer: "Installation searches have a longer research cycle than repair calls. You'll see earliest results in 30-45 days, with a significant increase in qualified installation inquiries by 90 days." },
    ],
  },

  'duct-cleaning': {
    slug: "duct-cleaning",
    name: "Duct Cleaning",
    plural: "Duct Cleaning Services",
    headline: "Capture the 'what's that smell?' search.",
    subheadline: "Duct cleaning is a high-margin service that homeowners don't know they need until they search — LocalBeacon makes sure they find you.",
    description: "Local SEO for air duct cleaning services. Rank for duct cleaning, dryer vent cleaning, and indoor air quality searches in every neighborhood you serve.",
    painPoints: [
      { icon: "😮‍💨", title: "Low awareness means low search volume — unless you create it", text: "Most homeowners don't think about their ducts until there's a smell, allergy flare-up, or utility bill shock. LocalBeacon creates the content that matches those trigger moments." },
      { icon: "🏠", title: "Post-renovation and move-in windows are missed", text: "The two biggest duct cleaning triggers — renovation dust and buying a home — are highly searchable moments you're not capturing without dedicated content targeting these events." },
      { icon: "🔗", title: "HVAC companies are competing for your work", text: "General HVAC companies are adding duct cleaning as an upsell. Without your own strong duct cleaning presence, you're invisible compared to their established Google profiles." },
    ],
    features: [
      { title: "Trigger-moment content that converts", text: "Content targeting 'duct cleaning after renovation,' 'moving into a new house duct cleaning,' and 'musty smell from vents' — the exact moments homeowners search." },
      { title: "Indoor air quality education content", text: "Allergy, asthma, and IAQ content that positions duct cleaning as a health investment — the highest-converting framing for the service." },
      { title: "Dryer vent cleaning upsell visibility", text: "Dryer vent cleaning pages that capture fire-safety-motivated searches and package naturally with duct cleaning for higher average tickets." },
      { title: "Commercial duct cleaning pages", text: "School, restaurant, and office building duct cleaning content targeting facility managers who need IAQ compliance documentation." },
    ],
    stats: [
      { value: "$350–$700", label: "avg duct cleaning ticket" },
      { value: "2.6×", label: "more bookings vs. word-of-mouth only" },
      { value: "73%", label: "of duct customers also book dryer vents" },
    ],
    faqs: [
      { question: "Is duct cleaning search volume high enough to be worth marketing?", answer: "Yes. 'Air duct cleaning near me' generates hundreds of monthly searches in most metro markets, and competition is relatively low compared to general HVAC. These are high-margin, easy-to-schedule jobs." },
      { question: "How does LocalBeacon attract post-renovation customers?", answer: "We create renovation-specific content — 'duct cleaning after remodel,' 'construction dust in vents,' and 'air quality after renovation' — timed to the renovation season in your market." },
      { question: "Can I market to real estate agents and home buyers?", answer: "Yes. Content targeting 'duct cleaning for home sale' and 'what to do when buying a house' captures a high-intent audience who are already in a spending mindset." },
      { question: "How do I differentiate from scammy '$39 duct cleaning' services?", answer: "LocalBeacon helps you build a review profile and content that educates homeowners on what legitimate duct cleaning involves — pre-qualifying customers who want quality work, not the lowest price." },
      { question: "Can LocalBeacon help me get commercial duct cleaning contracts?", answer: "Yes. Schools, offices, and restaurants all have IAQ compliance needs. We create commercial-targeted content that gets you in front of facility managers who are searching for certified duct cleaning vendors." },
    ],
  },

  'heat-pump-installers': {
    slug: "heat-pump-installers",
    name: "Heat Pump Installation",
    plural: "Heat Pump Installers",
    headline: "Ride the heat pump wave before it peaks.",
    subheadline: "Heat pump searches are growing 40% year over year — LocalBeacon positions your business to capture this demand before the market gets crowded.",
    description: "Local SEO for heat pump installation services. Capture the fast-growing demand for heat pump systems, mini-split installations, and heat pump water heaters.",
    painPoints: [
      { icon: "📈", title: "Heat pump demand is surging but your visibility isn't", text: "Federal and state incentives are driving a heat pump boom. Homeowners are searching 'heat pump installer near me' at record rates — but most HVAC companies aren't positioned for these specific searches." },
      { icon: "💰", title: "Incentive complexity is driving homeowners to whoever explains it best", text: "IRA tax credits and utility rebates make heat pumps financially attractive, but confusing. The contractor who explains incentives best gets the install. LocalBeacon makes you that expert." },
      { icon: "🏘️", title: "Mini-split demand has its own search universe", text: "Mini-split and ductless heat pump searches are distinct from whole-home systems. Without dedicated content, you're invisible to a large, fast-growing segment of heat pump buyers." },
    ],
    features: [
      { title: "Heat pump incentive and rebate content", text: "IRA tax credit guides, utility rebate explainers, and cost-comparison content that converts financially motivated heat pump researchers into install customers." },
      { title: "Mini-split and ductless installation pages", text: "System-specific pages for single-zone, multi-zone, and whole-home ductless systems — capturing the fastest-growing segment of the heat pump market." },
      { title: "Climate-specific heat pump content", text: "Cold-climate heat pump content that addresses regional hesitancy and highlights modern heat pump performance in northern climates." },
      { title: "Brand installation authority", text: "Mitsubishi, Daikin, Bosch, and Fujitsu installation content that aligns with dealer program visibility requirements and captures brand-specific searches." },
    ],
    stats: [
      { value: "43%", label: "YoY growth in heat pump searches" },
      { value: "$12,000–$20,000", label: "avg whole-home heat pump value" },
      { value: "3.2×", label: "more install inquiries within 90 days" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me capture heat pump incentive traffic?", answer: "We create content around IRA tax credits, state rebate programs, and utility incentives — the most common research starting point for heat pump buyers. This positions you as the local expert before they request a quote." },
      { question: "Can LocalBeacon help me market specifically to homeowners replacing gas systems?", answer: "Yes. Electrification content targeting gas furnace and boiler replacements captures a high-intent segment of homeowners who've already decided to switch — they just need the right contractor." },
      { question: "How do I rank for mini-split installation searches?", answer: "We create mini-split-specific pages covering single-zone room additions, multi-zone homes without ductwork, and sunroom/garage applications — the most common mini-split use cases in your market." },
      { question: "I'm hesitant to heavily market heat pumps in cold climates. Should I be?", answer: "Not anymore. Modern cold-climate heat pumps work efficiently in temperatures as low as -15°F. We create content that proactively addresses this concern, turning climate skeptics into convinced buyers." },
      { question: "How quickly is the heat pump market growing in my area?", answer: "Growth varies by market but is strong nationally. We research local search volume and create content to capture current demand while positioning you ahead of the acceleration that incentive programs will drive." },
    ],
  },

  'residential-electricians': {
    slug: "residential-electricians",
    name: "Residential Electrical",
    plural: "Residential Electricians",
    headline: "Light up your home service pipeline.",
    subheadline: "Homeowners searching for electrical help want a licensed pro they trust — LocalBeacon builds that trust online before they ever pick up the phone.",
    description: "Local SEO for residential electricians. Rank for home electrical repair, panel upgrades, outlet installation, and residential wiring services in every neighborhood you serve.",
    painPoints: [
      { icon: "🔌", title: "Homeowners can't tell a licensed pro from a handyman online", text: "Your credentials matter — but if your Google presence doesn't showcase your licensing, insurance, and residential specialization, you look identical to unqualified competitors." },
      { icon: "🏡", title: "Remodel season brings calls — but not to you", text: "Kitchen and bathroom remodels create consistent electrical demand, but homeowners find their electrician through whoever shows up in search. Without service-specific pages, that's not you." },
      { icon: "💡", title: "Smart home installation is a growth market you're missing", text: "EV chargers, smart panels, and whole-home generators are booming. Without content targeting these services, you're leaving high-margin modern electrical work to the few competitors who market it." },
    ],
    features: [
      { title: "Residential service pages by type and city", text: "Pages for panel upgrades, outlet installation, ceiling fan wiring, and whole-home rewiring — each optimized for the specific searches homeowners use for each service." },
      { title: "Remodel season content", text: "Kitchen, bathroom, and addition electrical content timed to spring remodeling season — capturing homeowners at the planning stage." },
      { title: "Smart home electrical authority", text: "EV charger, smart panel, generator, and lighting control content that positions you as the go-to for modern residential electrical work." },
      { title: "Safety and code content that builds trust", text: "GFCI, AFCI, and electrical code compliance content that demonstrates your expertise and attracts safety-conscious homeowners willing to pay for quality." },
    ],
    stats: [
      { value: "3.5×", label: "more calls from homeowners in remodel season" },
      { value: "89%", label: "of homeowners Google electricians before calling" },
      { value: "4.8★", label: "avg rating for LocalBeacon electrician clients" },
    ],
    faqs: [
      { question: "How does LocalBeacon showcase my electrical license and qualifications?", answer: "We incorporate your licensing, insurance, and certifications into your Google Business Profile content and local pages — signaling trustworthiness to both homeowners and Google's ranking algorithm." },
      { question: "Can LocalBeacon help me get more panel upgrade jobs?", answer: "Yes. Panel upgrade content targets homeowners in older homes and those adding EV chargers or solar — two of the fastest-growing electrical upgrade drivers. These are $2,000-5,000+ jobs." },
      { question: "How do I market EV charger installation as a residential electrician?", answer: "We create EV charger-specific pages targeting 'Level 2 charger installation near me' searches — one of the fastest-growing residential electrical search terms in most markets." },
      { question: "Can I target specific neighborhoods known for older homes needing rewiring?", answer: "Yes. We can create neighborhood-specific content targeting older housing stock — 'knob and tube wiring replacement in [neighborhood]' and similar searches attract homeowners in exactly the right situation." },
      { question: "How is marketing residential electrical different from general electrical?", answer: "Homeowners have different concerns than commercial buyers — they want trust, cleanliness, minimal disruption, and clear explanations. Our content is crafted with the residential homeowner in mind, not the project manager." },
    ],
  },

  'commercial-electricians': {
    slug: "commercial-electricians",
    name: "Commercial Electrical",
    plural: "Commercial Electricians",
    headline: "Win the contracts that keep you booked for months.",
    subheadline: "Commercial electrical contracts are long-term, high-value, and earned online — LocalBeacon builds the B2B visibility that fills your commercial pipeline.",
    description: "Local SEO for commercial electricians and electrical contractors. Get found by property managers, GCs, and business owners searching for licensed commercial electrical services.",
    painPoints: [
      { icon: "🏢", title: "Commercial buyers research vendors before they call", text: "Property managers and GCs vet contractors online before making contact. A thin Google presence means you don't survive the first pass of their vendor research." },
      { icon: "📋", title: "RFP and bid opportunities require credibility signals", text: "Commercial electrical bids are awarded to companies with visible expertise, licenses, and references. LocalBeacon builds the online credibility package that gets you into those conversations." },
      { icon: "🔁", title: "Maintenance contracts are the holy grail you're not marketing for", text: "Ongoing electrical maintenance contracts create recurring revenue. But without content targeting 'commercial electrical maintenance' searches, you're invisible to buyers seeking a long-term vendor." },
    ],
    features: [
      { title: "Commercial electrical service pages by industry", text: "Restaurant, retail, office, industrial, and multi-family electrical pages that speak the language of each commercial buyer segment." },
      { title: "Contractor and GC visibility", text: "Content positioning you as a reliable trade partner for general contractors — the gateway to the highest-volume commercial electrical work." },
      { title: "Code compliance and inspection content", text: "NEC compliance, electrical inspection, and safety certification content that establishes your authority with commercial buyers who need documentation." },
      { title: "Multi-location and portfolio case content", text: "Content showcasing your commercial project portfolio — the credibility signal that converts commercial researchers into qualified RFP requesters." },
    ],
    stats: [
      { value: "5-10×", label: "higher ticket value vs. residential" },
      { value: "3.3×", label: "more B2B inquiries within 90 days" },
      { value: "78%", label: "of commercial buyers Google contractors first" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me land commercial electrical contracts?", answer: "We build the online credibility markers commercial buyers look for — licensing highlights, project scale references, industry-specific pages, and professional review profiles. This gets you past the first-pass vetting." },
      { question: "Can I get more general contractor referrals through LocalBeacon?", answer: "Yes. GC-targeted content positions you as a preferred trade partner. When GCs search for reliable electrical subs in your area, your content signals experience, professionalism, and reliability." },
      { question: "How do I market to property managers with multiple locations?", answer: "We create multi-location service content and property management-specific pages that speak to the concerns of portfolio managers — standardized service, documentation, and fast response across properties." },
      { question: "Can LocalBeacon help me get into tenant improvement and build-out work?", answer: "Yes. Tenant improvement content targeting commercial real estate activity in your market positions you for one of the most consistent sources of commercial electrical work." },
      { question: "How long before I see commercial electrical leads?", answer: "Commercial leads have a longer sales cycle than residential. Initial inquiries typically start within 45-60 days, with RFP inclusion and contract opportunities building over 3-6 months." },
    ],
  },

  'ev-charger-installation': {
    slug: "ev-charger-installation",
    name: "EV Charger Installation",
    plural: "EV Charger Installers",
    headline: "Every new EV is a lead. Start capturing them.",
    subheadline: "EV adoption is accelerating and every new EV owner needs a home charger — LocalBeacon positions your business to capture this fast-growing demand.",
    description: "Local SEO for EV charger installation services. Rank for Level 2 home charging installation, Tesla Wall Connector, and commercial EV charging station searches in your area.",
    painPoints: [
      { icon: "🚗", title: "EV charger searches are surging and underserved", text: "Millions of new EVs hit the road each year, and every owner needs a Level 2 charger. Most electricians aren't optimized for EV charger searches — a gap you can own right now." },
      { icon: "💡", title: "Automaker referral programs go to whoever ranks", text: "Tesla, GM, and Ford direct customers to local electricians. But they search locally to verify and compare. Without EV charger visibility, you're missing these warm referral leads." },
      { icon: "🏢", title: "Commercial EV charging is a massive opportunity", text: "Apartments, workplaces, and retail locations are all adding EV charging. Without commercial EV charger content, you're invisible to property managers and developers planning installations." },
    ],
    features: [
      { title: "EV charger pages by vehicle brand and charger type", text: "Tesla Wall Connector, Ford Charge Station Pro, GM-compatible charger, and universal Level 2 pages — capturing brand-specific searches from new EV owners." },
      { title: "Permit and utility coordination content", text: "Panel capacity, permit process, and utility rebate content that positions you as the expert who handles the complexity — reducing homeowner anxiety and increasing conversions." },
      { title: "Commercial EVSE installation pages", text: "Multi-unit residential, workplace, and retail EV charging station content targeting property managers planning commercial EV infrastructure." },
      { title: "Incentive and rebate optimization", text: "Federal tax credit, state rebate, and utility incentive content that makes your installation service feel financially obvious to cost-conscious EV buyers." },
    ],
    stats: [
      { value: "40%", label: "annual growth in EV charger searches" },
      { value: "$800–$2,500", label: "avg Level 2 installation value" },
      { value: "3.6×", label: "more EV charger leads within 60 days" },
    ],
    faqs: [
      { question: "Is EV charger installation worth marketing as a standalone service?", answer: "Absolutely. It's one of the fastest-growing residential electrical service categories, with distinct search terms, a motivated buyer segment, and relatively low competition in most local markets." },
      { question: "How does LocalBeacon help me capture Tesla-specific installation searches?", answer: "We create Tesla Wall Connector installation pages targeting searches like 'Tesla charger installer near me' — the most common EV charger brand search. Similar pages for other brands capture their owners too." },
      { question: "Can I market EV charging to apartment buildings and HOAs?", answer: "Yes. Multi-unit residential EV charging is a major growth segment. We create content targeting property managers who are being pressured by tenants and local ordinances to add EV infrastructure." },
      { question: "How do I promote utility rebates for EV charger installation?", answer: "Many utilities offer $200-500 rebates for Level 2 charger installation. We create content around these programs that drives installs from cost-conscious buyers who respond to rebate framing." },
      { question: "How quickly will I see more EV charger installation leads?", answer: "EV charger searches are active year-round. Most clients see additional EV charger inquiries within 30 days, with a steady build as your pages establish authority in this growing category." },
    ],
  },

  'electrical-panel-upgrade': {
    slug: "electrical-panel-upgrade",
    name: "Electrical Panel Upgrade",
    plural: "Electrical Panel Upgrade Services",
    headline: "Older homes need your service. Find them first.",
    subheadline: "Electrical panel upgrades are one of the highest-ticket residential electrical jobs — LocalBeacon connects you with homeowners who need them before they find a competitor.",
    description: "Local SEO for electrical panel upgrade and replacement services. Rank for panel upgrade, breaker box replacement, and load center installation searches in your market.",
    painPoints: [
      { icon: "⚡", title: "Panel upgrade searches spike around specific triggers", text: "Home sales, EV charger additions, solar installations, and aluminum wiring concerns all trigger panel upgrade searches. Without specific content for each trigger, you're missing high-intent leads." },
      { icon: "🏠", title: "Older housing stock is a goldmine you're not mining", text: "Homes built before 1980 with 100A or 60A panels are fire hazards and EV-incompatible. There are millions of them. LocalBeacon targets neighborhoods where these homes are concentrated." },
      { icon: "💰", title: "High-ticket jobs deserve dedicated visibility", text: "A panel upgrade is a $2,000-6,000 job. It deserves its own landing page and search presence — not just a line item buried on your services page." },
    ],
    features: [
      { title: "Panel upgrade pages by trigger scenario", text: "Dedicated pages for EV charger panel upgrades, solar panel upgrades, home sale panel upgrades, and outdated Zinsco/Federal Pacific panel replacements." },
      { title: "Safety and compliance content", text: "Aluminum wiring, outdated breaker panels, and electrical safety inspection content that creates urgency without fear-mongering — and positions you as the solution." },
      { title: "City and neighborhood targeting", text: "Neighborhood-specific pages targeting older housing stock areas — the highest-concentration markets for panel upgrade prospects." },
      { title: "Utility rebate and financing content", text: "Panel upgrade financing and rebate content that reduces decision friction for homeowners facing a large unexpected expense." },
    ],
    stats: [
      { value: "$2,500–$6,000", label: "avg panel upgrade job value" },
      { value: "3.2×", label: "more panel job inquiries within 90 days" },
      { value: "65M+", label: "US homes needing panel assessment" },
    ],
    faqs: [
      { question: "How does LocalBeacon target homeowners who need a panel upgrade?", answer: "We create content that matches the trigger moments — EV charger planning, solar installation prep, home inspection failures, and general 'my breaker keeps tripping' searches — capturing homeowners at exactly the right moment." },
      { question: "Can I target specific panel brands known to be problematic?", answer: "Yes. Zinsco, Federal Pacific, and Murray/Crouse-Hinds panel pages target homeowners who've been told these brands are unsafe — the most motivated panel upgrade buyers you'll find." },
      { question: "How do I capture homeowners planning to add solar or an EV charger?", answer: "We create 'panel upgrade for solar' and 'panel upgrade for EV charger' pages that capture homeowners who know they need more capacity before their next project — a growing and very motivated segment." },
      { question: "Can LocalBeacon help me market panel upgrades to real estate agents?", answer: "Yes. Real estate agents encounter panel upgrade recommendations regularly during inspection periods. Content targeting agents positions you for referrals from one of the most consistent sources of panel jobs." },
      { question: "How long before I see panel upgrade leads from LocalBeacon?", answer: "Panel upgrade pages typically start ranking within 3-4 weeks. Most clients see their first dedicated panel upgrade inquiry within 45 days." },
    ],
  },

  'generator-installation': {
    slug: "generator-installation",
    name: "Generator Installation",
    plural: "Generator Installers",
    headline: "Power outages create your best customers.",
    subheadline: "Every major storm sends homeowners searching for standby generator installers — LocalBeacon makes sure you're the first name they find.",
    description: "Local SEO for whole-home generator installation services. Rank for standby generator installation, Generac installer, and backup power system searches in your service area.",
    painPoints: [
      { icon: "⛈️", title: "Storm season creates demand spikes you can't predict", text: "After a major outage, generator searches spike 10x. If you're not already ranking, you can't capitalize on the surge. LocalBeacon builds your rankings before storm season hits." },
      { icon: "🔋", title: "Generac and Kohler brand searches go uncaptured", text: "Homeowners already sold on a brand search by model name. Without brand-specific installer pages, you're invisible to the most decided — and easiest to close — prospects." },
      { icon: "🏡", title: "High home value areas are your best market and you're not in it", text: "Whole-home generator buyers are typically homeowners who value comfort and security. Without visibility in affluent neighborhoods, you're competing for low-margin customers instead." },
    ],
    features: [
      { title: "Brand-specific generator installer pages", text: "Generac, Kohler, Briggs & Stratton, and Cummins installer pages capturing the brand-specific searches of homeowners who've already decided what they want." },
      { title: "Storm season content calendar", text: "Pre-storm season content about generator installation lead times, post-storm inquiry capture pages, and year-round maintenance content that keeps you visible between events." },
      { title: "Whole-home vs. partial home content", text: "System sizing guides, essential circuits vs. whole-home comparisons, and transfer switch content that educates buyers and positions you as the knowledgeable installer." },
      { title: "Natural gas and propane generator content", text: "Fuel type comparison pages capturing the significant segment of buyers who want to understand their fuel options before selecting a system." },
    ],
    stats: [
      { value: "$10,000–$20,000", label: "avg standby generator install value" },
      { value: "8×", label: "search spike after major outages" },
      { value: "3.0×", label: "more install leads within 90 days" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me capitalize on storms and power outages?", answer: "We build your rankings year-round so you're already on page one when a storm spikes search volume. Last-minute optimization doesn't work in storm surges — you need to be ranked before the outage happens." },
      { question: "Can LocalBeacon help me become a certified Generac dealer and rank for it?", answer: "Yes. Generac dealer certification pages and brand-specific content strengthen your dealer relationship and capture the massive volume of Generac-specific installer searches." },
      { question: "How do I target affluent homeowners who are the most likely buyers?", answer: "We target neighborhoods with higher home values through zip code and neighborhood-specific generator pages, plus content that speaks to the lifestyle concerns — home office continuity, medical equipment, luxury comfort — of this buyer segment." },
      { question: "Can I also market portable generator service and repair?", answer: "Yes. Portable generator tune-up, repair, and storage content captures a different but complementary segment of the generator market, building your brand with entry-level generator owners who may upgrade to standby." },
      { question: "How do I compete with big-box stores that sell generators?", answer: "Big-box stores can't install or service — they just sell the box. Your value is professional installation, permitting, utility coordination, and ongoing maintenance. LocalBeacon helps you communicate that distinction clearly." },
    ],
  },

  'roof-replacement': {
    slug: "roof-replacement",
    name: "Roof Replacement",
    plural: "Roof Replacement Contractors",
    headline: "Win full replacements before the estimate call.",
    subheadline: "Homeowners researching full roof replacements compare contractors online before calling — LocalBeacon positions you to win that comparison before the phone rings.",
    description: "Local SEO for roof replacement contractors. Rank for full roof replacement, re-roofing, and asphalt shingle replacement searches in every market you serve.",
    painPoints: [
      { icon: "🏠", title: "Replacement decisions are made before the first call", text: "Homeowners shopping for a full replacement spend days comparing contractors online before requesting a single quote. If you're not visible in that research phase, you never get a call." },
      { icon: "🌧️", title: "Storm leads go to whoever ranks first", text: "After a hail storm, every homeowner in the damage zone is searching simultaneously. Without pre-built local search presence, you can't ride the wave when it hits." },
      { icon: "💰", title: "Insurance work requires a different positioning", text: "Insurance claim roofing is a separate search journey. Without content targeting 'insurance claim roof replacement,' you're missing the segment with pre-approved budgets and high close rates." },
    ],
    features: [
      { title: "Replacement-specific pages by material and city", text: "Asphalt, metal, tile, and flat roof replacement pages for every city — capturing the material-specific searches of homeowners who've already decided on their new roof type." },
      { title: "Insurance claim content that converts", text: "Hail damage, wind damage, and insurance claim process content targeting the homeowners with approved claims who need a contractor now." },
      { title: "Warranty and manufacturer content", text: "GAF, Owens Corning, and CertainTeed manufacturer page content that builds credibility with brand-aware homeowners and positions you as a certified installer." },
      { title: "Storm response positioning", text: "Pre-built storm damage assessment pages that activate during local storm events and capture urgent replacement inquiries." },
    ],
    stats: [
      { value: "$10,000–$25,000", label: "avg full replacement value" },
      { value: "3.9×", label: "more replacement quotes requested" },
      { value: "2-3 weeks", label: "to first replacement lead from LocalBeacon" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me capture storm-related replacement leads?", answer: "We build your storm damage and insurance claim pages year-round so they're indexed and ranking when a storm hits your area. Emergency optimization after the storm is too late — the calls go in the first 48 hours." },
      { question: "Can LocalBeacon help me get more insurance claim work?", answer: "Yes. Insurance claim content — explaining the process, what to document, how to work with adjusters — captures the most motivated replacement buyers and positions you as an advocate, not just a contractor." },
      { question: "How do I compete with storm chasers who flood my market after damage events?", answer: "Storm chasers have no local history or reviews. LocalBeacon builds your established local presence so homeowners see your track record versus an unknown out-of-town company that appeared overnight." },
      { question: "Can I promote specific shingle brands or warranties?", answer: "Yes. GAF Master Elite, Owens Corning Preferred, and CertainTeed SELECT ShingleMaster certification pages build trust and capture brand-aware homeowners researching warranty coverage." },
      { question: "How do I attract homeowners who are planning a replacement — not just storm victims?", answer: "We create content targeting homeowners with aging roofs — '20-year-old roof signs,' 'when to replace vs. repair your roof,' and 'cost to replace roof in [city]' — capturing the large segment planning ahead." },
    ],
  },

  'roof-repair': {
    slug: "roof-repair",
    name: "Roof Repair",
    plural: "Roof Repair Services",
    headline: "Capture the leak calls. Keep them forever.",
    subheadline: "Roof repair is a high-frequency, relationship-building service — LocalBeacon connects you with homeowners the moment water starts coming in.",
    description: "Local SEO for roof repair services. Rank for roof leak repair, storm damage repair, and emergency roof patching in every neighborhood you serve.",
    painPoints: [
      { icon: "💧", title: "Roof leak calls go to whoever ranks right now", text: "A homeowner with water coming through the ceiling doesn't comparison shop — they call the first number they find. If you're not ranking for 'roof repair near me,' those calls go elsewhere." },
      { icon: "🌩️", title: "Storm damage repairs come in waves you can't predict", text: "Wind and hail damage creates synchronized demand across entire neighborhoods. Without pre-existing search presence, you can't capitalize on these high-volume repair events." },
      { icon: "🔁", title: "Repair customers become replacement customers — if you stay visible", text: "A homeowner you repair today is a replacement customer in 5 years. Without ongoing visibility, they'll search fresh for their replacement contractor and find someone else." },
    ],
    features: [
      { title: "Emergency roof repair search domination", text: "City-specific 'emergency roof repair' and 'roof leak repair near me' pages for high-urgency searches — capturing homeowners in crisis before competitors do." },
      { title: "Storm damage repair content by event type", text: "Hail, wind, ice dam, and tree-strike repair pages that match the specific damage type homeowners search for after weather events." },
      { title: "Repair type pages for common issues", text: "Flashing repair, skylight leak, chimney flashing, and pipe boot replacement pages that capture specific searches from homeowners who know their problem." },
      { title: "Relationship-building follow-up content", text: "Post-repair maintenance tips and inspection content that keeps past customers engaged and positions you for future work." },
    ],
    stats: [
      { value: "$400–$2,000", label: "avg roof repair ticket" },
      { value: "4.1×", label: "more repair calls within 60 days" },
      { value: "65%", label: "of repair customers also book annual inspections" },
    ],
    faqs: [
      { question: "Is roof repair worth marketing separately from roof replacement?", answer: "Yes. Repair and replacement have completely different search journeys. Homeowners searching for a repair need immediate help — they're not comparing long-term contractors. Dedicated repair pages capture this urgent intent." },
      { question: "How does LocalBeacon help me after a storm event?", answer: "Our storm damage pages are pre-built and indexed, so when a storm hits, your pages are already ranking. We also update your Google posts immediately after events to capture the surge of homeowners searching for damage assessment." },
      { question: "Can LocalBeacon help me market free roof inspections?", answer: "Yes. 'Free roof inspection near me' is a high-volume search, especially after storms. We create inspection offer pages that capture these leads and convert them into repair or replacement jobs." },
      { question: "How do I get more flat roof repair work?", answer: "We create flat roof-specific repair pages targeting commercial and residential flat roof searches — a specialized segment with less competition than standard pitched roof searches." },
      { question: "Can I turn repair customers into long-term maintenance clients?", answer: "Yes. LocalBeacon creates roof maintenance program content that follows up on repair customers, building a recurring maintenance relationship that makes you their go-to roofer for future work." },
    ],
  },

  'gutter-installation': {
    slug: "gutter-installation",
    name: "Gutter Installation",
    plural: "Gutter Installers",
    headline: "Rain season brings leads. Are you ready?",
    subheadline: "Gutter installation and replacement searches spike every spring — LocalBeacon positions your business to capture them while competitors scramble to keep up.",
    description: "Local SEO for gutter installation and replacement services. Rank for seamless gutter installation, gutter guard installation, and gutter replacement in every city you serve.",
    painPoints: [
      { icon: "🌧️", title: "Gutter searches are seasonal and you're not ready", text: "Spring rain events and fall leaf season drive predictable spikes in gutter searches. Without content built before the season, you can't rank when demand peaks." },
      { icon: "🏠", title: "New construction and replacement are separate markets", text: "New homebuilder gutter installation and residential replacement have different search journeys. Generic content misses both. Specific pages capture each with precision." },
      { icon: "🛡️", title: "Gutter guard upsell opportunity is consistently missed", text: "Homeowners hate cleaning gutters. Without gutter guard content alongside installation, you're leaving a high-margin upsell opportunity on the table with every installation job." },
    ],
    features: [
      { title: "Seamless vs. sectional gutter content", text: "Material and style comparison pages that capture homeowners researching their options — the most common pre-call search behavior for gutter buyers." },
      { title: "Gutter guard installation pages", text: "LeafGuard, Gutter Helmet, and DIY-alternative gutter guard content that captures upsell interest and positions your premium installation offering." },
      { title: "Seasonal content calendar", text: "Spring installation readiness content, fall maintenance reminders, and post-storm damage assessment positioning timed to local weather patterns." },
      { title: "Color and material selection content", text: "Aluminum, copper, vinyl, and steel gutter pages with color matching guides that help homeowners choose — and give them a reason to call you first." },
    ],
    stats: [
      { value: "$1,500–$4,000", label: "avg full gutter installation" },
      { value: "3.2×", label: "more installation quotes within 90 days" },
      { value: "48%", label: "of gutter clients add guards in year one" },
    ],
    faqs: [
      { question: "When should I start marketing gutter installation for peak season?", answer: "6-8 weeks before your local spring rain season. LocalBeacon builds rankings progressively, so starting in February or March positions you to capture the April-May peak demand." },
      { question: "How do I promote seamless gutters over cheaper sectional options?", answer: "We create comparison content highlighting seamless gutters' durability, fewer leak points, and professional appearance — content that attracts quality-focused homeowners willing to pay the premium." },
      { question: "Can LocalBeacon help me sell more gutter guards?", answer: "Yes. 'Gutter guards near me' and specific guard brand searches are their own segment. We create guard-specific pages that capture homeowners who are tired of cleaning gutters — your best upsell audience." },
      { question: "How do I compete with big national gutter companies?", answer: "National companies like LeafGuard rely heavily on paid advertising. LocalBeacon builds your organic search presence where trust signals like reviews and local authority consistently outperform national ad spend." },
      { question: "Can I target new home builders for gutter installation contracts?", answer: "Yes. New construction gutter content targeting builders and developers in your market positions you for the high-volume, steady-cadence installation work that builder relationships provide." },
    ],
  },

  'flat-roofing': {
    slug: "flat-roofing",
    name: "Flat Roofing",
    plural: "Flat Roofing Contractors",
    headline: "Flat roof specialist. Not a generalist.",
    subheadline: "Commercial and residential flat roof owners search for specialists — LocalBeacon positions your flat roofing expertise as the clear choice in your market.",
    description: "Local SEO for flat roofing contractors. Rank for flat roof installation, TPO roofing, EPDM roofing, and commercial flat roof repair searches in your service area.",
    painPoints: [
      { icon: "🏢", title: "Flat roof work is commercial — and requires commercial-scale visibility", text: "Property managers and building owners research flat roofing contractors more thoroughly than homeowners. Without a professional, content-rich online presence, you don't make their shortlist." },
      { icon: "🔧", title: "Membrane type searches go unanswered", text: "Buyers who search 'TPO roofing contractor' or 'EPDM roof replacement' are highly informed and ready to act. Without membrane-specific content, you're invisible to the most qualified prospects." },
      { icon: "🌧️", title: "Flat roof leak searches are urgent and high-value", text: "A leaking flat roof over a retail store or warehouse is a business emergency. Emergency flat roof repair searches are high-intent and time-sensitive — exactly where you want to rank." },
    ],
    features: [
      { title: "Membrane-specific roofing pages", text: "TPO, EPDM, PVC, modified bitumen, and BUR pages that capture the specific searches of informed commercial and residential flat roof buyers." },
      { title: "Commercial building type pages", text: "Restaurant, warehouse, retail, school, and multifamily flat roof content targeting the specific building owners and property managers in your market." },
      { title: "Emergency flat roof repair positioning", text: "Same-day flat roof repair pages capturing business owners with active roof failures — the most urgent, least price-sensitive flat roofing segment." },
      { title: "Maintenance program content", text: "Preventive flat roof maintenance and annual inspection content that builds recurring contract relationships with commercial property managers." },
    ],
    stats: [
      { value: "$5,000–$50,000+", label: "flat roof project range" },
      { value: "2.8×", label: "more commercial inquiries within 90 days" },
      { value: "82%", label: "of flat roof buyers research online first" },
    ],
    faqs: [
      { question: "How does LocalBeacon differentiate my flat roofing business from general roofers?", answer: "We create specialist positioning through membrane-specific content, commercial case references, and technical content that demonstrates flat roofing expertise — signals that general roofing pages can't provide." },
      { question: "Can LocalBeacon help me win commercial flat roof contracts?", answer: "Yes. Commercial property managers regularly search for flat roofing contractors. We build the content and credibility profile that gets your business into their vendor consideration set." },
      { question: "How do I market TPO vs. EPDM to commercial buyers?", answer: "We create comparison content explaining the differences, use cases, and cost ranges — positioning you as a knowledgeable advisor rather than just a contractor, which dramatically increases quote conversion." },
      { question: "Can LocalBeacon help me get more flat roof maintenance contracts?", answer: "Yes. Preventive maintenance content targeting commercial property managers creates the recurring contract relationships that provide predictable annual revenue for your business." },
      { question: "How do I compete with large commercial roofing companies?", answer: "Large companies dominate paid ads but are slow to update local content. LocalBeacon builds the local search presence and review profile that outperforms big-budget competitors in local organic results." },
    ],
  },

  'interior-painters': {
    slug: "interior-painters",
    name: "Interior Painting",
    plural: "Interior Painters",
    headline: "Fresh walls. Full schedule. Repeat clients.",
    subheadline: "Interior painting is a high-repeat, relationship service — LocalBeacon keeps you top-of-mind in every neighborhood you've ever worked in.",
    description: "Local SEO for interior painters and painting contractors. Rank for interior painting, room painting, cabinet painting, and whole-house interior painting in your area.",
    painPoints: [
      { icon: "🎨", title: "Painting searches are seasonal and unpredictable", text: "Homeowners decide to repaint on a whim — after a furniture delivery, a kid's room change, or a remodel. Without constant local visibility, you miss these impulse-driven high-margin jobs." },
      { icon: "🏠", title: "Whole-house painters lose to specialists on specific searches", text: "Homeowners searching 'cabinet painter near me' or 'accent wall painting' want a specialist feel. Without service-specific pages, you lose these jobs to less capable painters who just rank better." },
      { icon: "🔄", title: "Past customers don't remember your number", text: "Interior painting is a 5-7 year repeat cycle. Without consistent visibility, the homeowner you painted beautifully last time will Google fresh and find someone else for the next room." },
    ],
    features: [
      { title: "Room and service-specific pages", text: "Kitchen cabinet painting, living room painting, bedroom accent wall, and whole-home repaint pages — each capturing the specific searches of homeowners with that project in mind." },
      { title: "Seasonal and trend content", text: "Popular color trends, new year refresh content, spring cleaning repaints, and post-holiday refresh content timed to the natural cycles of interior painting decisions." },
      { title: "Neighborhood visibility", text: "Neighborhood-specific pages that keep you visible in the areas where your best work lives — turning past projects into ongoing referral geography." },
      { title: "Before/after showcase content", text: "Content structured to feature project transformations — the most effective interior painter marketing that converts visual researchers into calling customers." },
    ],
    stats: [
      { value: "$1,800–$5,500", label: "avg interior painting project" },
      { value: "3.3×", label: "more new client inquiries within 90 days" },
      { value: "67%", label: "of painting customers become repeat clients" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me stay booked between large projects?", answer: "We maintain consistent Google Business Profile activity with content about individual room painting, touch-up services, and color consultation — capturing the smaller jobs that fill gaps between full-house projects." },
      { question: "Can LocalBeacon help me get more cabinet painting jobs?", answer: "Yes. Kitchen cabinet painting is one of the highest-demand, highest-margin interior painting services. Dedicated cabinet painting pages capture homeowners who want a kitchen upgrade without a full remodel." },
      { question: "How do I compete with national painting franchise companies?", answer: "Franchises have marketing budgets but limited local knowledge. LocalBeacon helps you build a local reputation through neighborhood-specific content and reviews that national franchises can't replicate authentically." },
      { question: "How do I attract customers who care about low-VOC and eco-friendly paints?", answer: "We create content about eco-friendly paint options and safe painting practices — a growing segment of homeowners, especially those with children, who specifically search for safer interior painting contractors." },
      { question: "Can I attract interior designers and remodelers as referral sources?", answer: "Yes. Content positioning you as a premium interior painting partner for design professionals — including your color expertise and project management approach — generates the trade referrals that lead to consistent, high-quality work." },
    ],
  },

  'exterior-painters': {
    slug: "exterior-painters",
    name: "Exterior Painting",
    plural: "Exterior Painters",
    headline: "Curb appeal season is your peak. Own it.",
    subheadline: "Homeowners plan exterior painting in spring and execute in summer — LocalBeacon keeps you booked from the moment they start researching.",
    description: "Local SEO for exterior house painters. Rank for exterior painting, house painting, siding painting, and deck staining in every neighborhood you serve.",
    painPoints: [
      { icon: "🌤️", title: "Exterior season is short. Your marketing needs to start early.", text: "Most homeowners want exterior painting done May-September. Without search visibility built in March, you miss the planning season and fight for scraps in June." },
      { icon: "🏚️", title: "HOA violation notices create urgent, high-converting leads", text: "Homeowners who receive HOA paint violation notices need a contractor fast. Without content targeting 'HOA exterior painting' and 'house painting for HOA compliance,' you're invisible to this segment." },
      { icon: "💦", title: "Weather-related paint failures are a missed opportunity", text: "Peeling paint after harsh winters or sun exposure sends homeowners searching. Without content about exterior paint failure and restoration, you're missing these high-urgency conversion moments." },
    ],
    features: [
      { title: "Exterior painting city and neighborhood pages", text: "Neighborhood and city-specific exterior painting pages that capture local searches and position you as the known painter in that area." },
      { title: "Surface-specific painting content", text: "Siding, brick, stucco, trim, and deck exterior painting pages capturing material-specific searches from homeowners who know what they need." },
      { title: "HOA and neighborhood association content", text: "HOA compliance painting content and approved color scheme guides that capture the violation-notice and pre-sale paint refresh segments." },
      { title: "Seasonal booking content", text: "Spring reservation reminders, summer availability updates, and fall touch-up content that manages demand and keeps your schedule predictable." },
    ],
    stats: [
      { value: "$3,000–$8,000", label: "avg exterior house painting project" },
      { value: "4.0×", label: "more summer booking inquiries" },
      { value: "5-7 years", label: "typical repaint cycle = loyal customers" },
    ],
    faqs: [
      { question: "When should I start marketing for exterior painting season?", answer: "February or March at the latest. Homeowners start thinking about exterior painting when the snow melts, and the ones who plan early book the best contractors. LocalBeacon ensures you're visible when that planning starts." },
      { question: "How do I capture homeowners who are getting ready to sell their house?", answer: "'Exterior painting to sell house' and 'pre-sale house painting' searches capture sellers who need a quick, professional refresh. We create content specifically for this high-motivation, time-sensitive segment." },
      { question: "Can LocalBeacon help me market deck staining alongside exterior painting?", answer: "Yes. Deck staining pairs naturally with exterior painting — same season, same customer profile. We create deck staining content that generates separate searches and packages naturally with exterior painting jobs." },
      { question: "How do I compete with the low-price painters who underbid everything?", answer: "LocalBeacon helps you attract quality-focused homeowners through content that educates about paint quality, surface preparation, and warranty — the considerations that push buyers toward experienced contractors rather than the cheapest quote." },
      { question: "Can I target new homeowners who want to personalize their exterior?", answer: "Yes. New homeowner exterior painting is a strong segment — people who just bought often want to update the exterior immediately. 'New homeowner house painting' content targets this motivated, spending-ready audience." },
    ],
  },

  'cabinet-painters': {
    slug: "cabinet-painters",
    name: "Cabinet Painting",
    plural: "Cabinet Painters",
    headline: "Kitchen upgrade without the remodel price tag.",
    subheadline: "Cabinet painting is the hottest kitchen upgrade trend — LocalBeacon connects your specialty service with the homeowners searching for it right now.",
    description: "Local SEO for cabinet painting specialists. Rank for kitchen cabinet painting, cabinet refinishing, and cabinet resurfacing searches in your area.",
    painPoints: [
      { icon: "🍳", title: "Cabinet painting searches are high-volume and underserved", text: "Thousands of homeowners search 'kitchen cabinet painting near me' every month. Most painting companies don't have dedicated cabinet pages — leaving you a clear path to own this search." },
      { icon: "🎨", title: "Color trends drive sudden search spikes", text: "When a cabinet color goes viral on Instagram or Pinterest, searches spike. Without trend-aware content, you're invisible when demand peaks for the latest popular cabinet color." },
      { icon: "💰", title: "Cabinet painting buyers want proof before they call", text: "Cabinet painting is a significant investment and homeowners want to see your work. Without before/after showcase content, conversion rates drop — no matter how good your painting actually is." },
    ],
    features: [
      { title: "Cabinet-specific painting pages", text: "Kitchen cabinet, bathroom vanity, laundry cabinet, and entertainment center painting pages — each capturing specific searches from homeowners planning their cabinet refresh." },
      { title: "Color trend and inspiration content", text: "White cabinet, navy cabinet, sage green, and two-tone content aligned with current trends — capturing homeowners in the inspiration phase who convert into paying customers." },
      { title: "Process and durability content", text: "Spray vs. brush finish, primer selection, cabinet painting durability, and refacing vs. repainting comparison content that builds confidence in your expertise." },
      { title: "Before/after project showcase", text: "Structured content highlighting your cabinet transformations — the highest-converting content format for cabinet painting services, capturing visual researchers who are ready to act." },
    ],
    stats: [
      { value: "$1,500–$4,500", label: "avg kitchen cabinet painting project" },
      { value: "5,200+", label: "'cabinet painting near me' searches/mo" },
      { value: "3.8×", label: "more cabinet painting inquiries within 60 days" },
    ],
    faqs: [
      { question: "Is cabinet painting worth marketing as a standalone service?", answer: "Absolutely. Cabinet painting has massive search volume, dedicated buyer intent, and one of the best customer value ratios in painting. Homeowners searching 'cabinet painting near me' are ready to buy — they just need to find you." },
      { question: "How does LocalBeacon help me rank for specific cabinet paint colors?", answer: "We create color-specific content — white cabinets, navy blue, sage green, black kitchen cabinets — that captures homeowners who already know what they want and just need the right painter." },
      { question: "Can LocalBeacon help me showcase my before/after work?", answer: "Yes. Our content strategy includes before/after featured content that tells the transformation story for each cabinet project type — the most effective trust-building format for cabinet painting services." },
      { question: "How do I compete with whole-house painters who also do cabinets?", answer: "Cabinet specialist positioning is more compelling than 'we do everything.' LocalBeacon helps you own the specialist angle — dedicated equipment, specific expertise, better finishes — that converts homeowners who want the best result." },
      { question: "How quickly will I see cabinet painting leads from LocalBeacon?", answer: "Cabinet painting pages are relatively quick to rank due to lower competition. Most clients see cabinet-specific inquiries within 30-45 days of their pages going live." },
    ],
  },

  'commercial-painters': {
    slug: "commercial-painters",
    name: "Commercial Painting",
    plural: "Commercial Painters",
    headline: "Big jobs. Long relationships. Start here.",
    subheadline: "Commercial painting contracts keep crews working for months — LocalBeacon builds the B2B visibility that gets you into these high-value opportunities.",
    description: "Local SEO for commercial painting contractors. Get found by property managers, building owners, and facility directors searching for professional commercial painting services.",
    painPoints: [
      { icon: "🏢", title: "Commercial buyers vet contractors more carefully", text: "Property managers and facility directors research commercial painters for days before reaching out. Without a professional, project-specific online presence, you don't make their consideration set." },
      { icon: "📅", title: "Commercial painting requires schedule flexibility and you need to signal it", text: "Commercial clients care about after-hours and weekend availability to minimize business disruption. Without content addressing scheduling flexibility, you lose to competitors who communicate it better." },
      { icon: "🔁", title: "Repeat contract relationships are the goal — and they start online", text: "A building manager who liked your work is your best customer. But if they can't find you easily when their next property needs painting, they'll search fresh and possibly find someone new." },
    ],
    features: [
      { title: "Commercial facility type pages", text: "Office, retail, restaurant, warehouse, school, and healthcare facility painting pages — each speaking the language of buyers in that specific commercial segment." },
      { title: "Project scale and crew capacity content", text: "Large-crew, multi-phase project content that signals commercial painting capability — reassuring property managers that you can handle their scale." },
      { title: "Commercial painting specs content", text: "Low-VOC, OSHA-compliant, off-hours availability, and insurance documentation content that checks every box commercial buyers care about." },
      { title: "Property management portfolio targeting", text: "Content targeting property management companies with multiple locations — the highest-value recurring commercial painting relationships." },
    ],
    stats: [
      { value: "$15,000–$200,000+", label: "commercial painting contract range" },
      { value: "3.2×", label: "more commercial RFP requests within 90 days" },
      { value: "76%", label: "of commercial painting renewals go to incumbents" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me get commercial painting contracts?", answer: "We build content targeting property managers, facility directors, and building owners — the decision-makers for commercial painting. Specific industry pages, project scale signals, and professional reviews position you as a credible commercial contractor." },
      { question: "Can LocalBeacon help me land HOA and condo complex painting contracts?", answer: "Yes. HOA and condo association painting content targeting community managers is one of the most effective paths to large, repeating exterior painting contracts." },
      { question: "How do I position for industrial painting versus office painting?", answer: "We create industry-specific pages for warehouses, manufacturing, retail, and office segments — each with the relevant content that speaks to that buyer's priorities and compliance requirements." },
      { question: "Can I use LocalBeacon to build relationships with general contractors?", answer: "Yes. GC partnership content positions you as a reliable trade painter for new construction and renovation projects — the most consistent source of volume commercial painting work." },
      { question: "How long before I see commercial painting leads?", answer: "Commercial painting has a longer decision cycle than residential. First inquiries typically appear within 45-60 days, with meaningful RFP volume building over 3-6 months." },
    ],
  },

  'deck-staining': {
    slug: "deck-staining",
    name: "Deck Staining",
    plural: "Deck Staining Services",
    headline: "Every deck is a lead. Start collecting them.",
    subheadline: "Deck staining is a high-repeat, seasonal service — LocalBeacon builds your visibility to capture homeowners searching at the exact moment they decide to stain.",
    description: "Local SEO for deck staining and wood refinishing services. Rank for deck staining, fence staining, and wood deck restoration searches in your local market.",
    painPoints: [
      { icon: "🪵", title: "Deck staining has a natural seasonal trigger you're not capturing", text: "Homeowners notice their deck looking weathered every spring. Without proactive visibility before that moment, they search fresh — and find whoever ranks highest, not whoever did their neighbor's deck." },
      { icon: "🔄", title: "2-3 year repeat cycle means loyal customers — if you stay visible", text: "Deck staining needs redoing every 2-3 years. Without ongoing local visibility, past customers forget you and Google for someone new. LocalBeacon keeps your name in front of them." },
      { icon: "🎨", title: "Stain color and product searches go uncaptured", text: "Homeowners who research 'best deck stain colors' or 'semi-transparent vs. solid stain' are highly engaged buyers. Without educational content, you miss these warm prospects who are halfway to calling." },
    ],
    features: [
      { title: "Seasonal deck staining content calendar", text: "Spring deck inspection content, summer staining project posts, fall preparation tips, and winter deck care guides timed to homeowner decision cycles." },
      { title: "Stain type and color education content", text: "Solid vs. semi-transparent, oil vs. water-based, and color selection guide content that educates buyers and positions your expertise before the first call." },
      { title: "Wood type-specific deck pages", text: "Pressure treated, cedar, redwood, Trex, and composite content addressing the specific staining and sealing needs of each deck material type." },
      { title: "Multi-service bundling content", text: "Deck + fence staining packages, power washing + staining combination content that increases average ticket and captures homeowners looking to refresh multiple exterior surfaces at once." },
    ],
    stats: [
      { value: "$600–$2,500", label: "avg deck staining project" },
      { value: "2-3 years", label: "typical recoating cycle = loyal base" },
      { value: "3.1×", label: "more seasonal staining bookings" },
    ],
    faqs: [
      { question: "Is deck staining worth marketing separately from exterior painting?", answer: "Yes. Deck staining has its own search queries, buyer intent, and seasonal cycle. Homeowners searching 'deck staining near me' aren't looking for a house painter — they want a deck specialist. Separate pages capture this distinction." },
      { question: "How does LocalBeacon help me book spring jobs early?", answer: "We publish winter 'reserve your spring deck staining' content and spring-preview posts that capture homeowners who plan ahead — locking in your schedule before competitors even start marketing." },
      { question: "Can I market fence and pergola staining alongside deck work?", answer: "Yes. Fence, pergola, and gazebo staining content captures related searches and positions natural package add-ons that increase average project value." },
      { question: "How do I educate customers about solid vs. semi-transparent stains?", answer: "LocalBeacon creates comparison content explaining when each stain type works best — establishing your expertise and pre-qualifying customers who come to their estimate already aligned with your recommendation." },
      { question: "How do I compete with pressure washing companies that offer deck staining as an upsell?", answer: "Specialization wins. LocalBeacon positions you as the deck staining specialist — someone who does it right — versus a pressure washing company that does it as an afterthought. Homeowners who care about results choose the specialist." },
    ],
  },

  'house-cleaning': {
    slug: "house-cleaning",
    name: "House Cleaning",
    plural: "House Cleaning Services",
    headline: "Consistent clients. Consistent revenue.",
    subheadline: "House cleaning is the ultimate recurring service business — LocalBeacon keeps new clients finding you while your regulars keep coming back.",
    description: "Local SEO for house cleaning services. Rank for house cleaning, maid service, and home cleaning in every neighborhood you serve.",
    painPoints: [
      { icon: "🏠", title: "Client churn requires constant new acquisition", text: "Even with great service, cleaning clients move, change budgets, or refer friends but don't leave reviews. Without consistent new client flow, churn quietly shrinks your schedule." },
      { icon: "📍", title: "Neighborhood efficiency is invisible online", text: "You clean 10 houses on the same street but customers in the next neighborhood can't find you. LocalBeacon creates the neighborhood-specific visibility that fills your local density." },
      { icon: "⭐", title: "Cleaning service trust depends entirely on reputation", text: "Homeowners let cleaners into their home unsupervised. Reviews and reputation are everything. Without a proactive review strategy, one bad experience can offset 20 good ones." },
    ],
    features: [
      { title: "Neighborhood and zip code specific pages", text: "Hyper-local pages for every neighborhood you serve — capturing 'house cleaning in [neighborhood]' searches that convert at significantly higher rates than city-level searches." },
      { title: "Recurring vs. one-time cleaning content", text: "Weekly, biweekly, and monthly cleaning plan content that attracts recurring clients — the foundation of a stable cleaning business." },
      { title: "Trust and background check content", text: "Bonded, insured, and background-checked employee content that reduces homeowner hesitancy and converts trust-focused buyers." },
      { title: "Review management to build reputation", text: "Automated review requests after every clean and professional responses that keep your Google rating strong and your profile active." },
    ],
    stats: [
      { value: "$150–$350", label: "avg recurring clean ticket" },
      { value: "3.4×", label: "more new client inquiries within 90 days" },
      { value: "82%", label: "of cleaning clients come from Google search" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me find more recurring house cleaning clients?", answer: "We create recurring cleaning plan content that specifically attracts homeowners who want a regular cleaner — not just a one-time service. These are your highest-value, most stable clients." },
      { question: "Can LocalBeacon help me fill my schedule in specific neighborhoods?", answer: "Yes. Neighborhood-specific pages let you build density in target areas — a critical operational efficiency factor for cleaning businesses that reduces drive time between clients." },
      { question: "How do I compete with large cleaning franchises like Molly Maid?", answer: "Franchise companies rely on brand recognition, not local search optimization. LocalBeacon builds the authentic local presence — neighborhood content, specific reviews, personal trust signals — that consistently outperforms franchise advertising in local search." },
      { question: "How do I handle getting reviews from house cleaning clients?", answer: "LocalBeacon builds review request workflows into your content strategy. Cleaning clients are highly loyal and often enthusiastic reviewers — they just need a simple, timely prompt to share their experience." },
      { question: "Can I market eco-friendly cleaning products as a differentiator?", answer: "Yes. Green cleaning content targets the growing segment of homeowners who specifically seek non-toxic cleaning services — especially families with young children and pets. This attracts higher-value, lower-churn clients." },
    ],
  },

  'commercial-cleaning': {
    slug: "commercial-cleaning",
    name: "Commercial Cleaning",
    plural: "Commercial Cleaning Services",
    headline: "Contracts that keep your crews busy for years.",
    subheadline: "Commercial cleaning contracts are the backbone of a stable cleaning business — LocalBeacon builds the B2B visibility that puts you in front of business decision-makers.",
    description: "Local SEO for commercial cleaning companies. Get found by office managers, property managers, and facility directors searching for janitorial and commercial cleaning services.",
    painPoints: [
      { icon: "🏢", title: "Commercial contracts require credibility you need to demonstrate online", text: "Business owners and facility managers review your website and Google profile before calling. Without a professional commercial-focused presence, you don't make their shortlist." },
      { icon: "🔒", title: "Security and trust requirements are more stringent", text: "Commercial clients need bonding, insurance certificates, and background checks — standard for you, but not visible online. Without content addressing these requirements, you lose to competitors who communicate it better." },
      { icon: "🕒", title: "After-hours and weekend availability is a differentiator you're not marketing", text: "Most commercial cleaning happens when the business is closed. Your flexibility is a key selling point — but only if potential clients know about it." },
    ],
    features: [
      { title: "Industry-specific commercial cleaning pages", text: "Office, medical, retail, restaurant, school, and gym cleaning pages that speak directly to the facility management concerns of each commercial buyer segment." },
      { title: "Contract and compliance content", text: "Bonding, insurance, Green Seal certification, and OSHA compliance content that pre-qualifies your service for commercial buyers with vendor requirements." },
      { title: "Property management company targeting", text: "Content targeting property management companies with multiple commercial locations — the highest-recurring-revenue commercial cleaning relationships." },
      { title: "Daytime and after-hours service positioning", text: "Scheduling flexibility content that captures the segment of commercial buyers who need cleaning services tailored to their business hours." },
    ],
    stats: [
      { value: "$1,500–$10,000+", label: "monthly commercial cleaning contracts" },
      { value: "3.1×", label: "more commercial inquiries within 90 days" },
      { value: "88%", label: "of commercial cleaning buyers Google vendors first" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me land commercial cleaning contracts?", answer: "We build industry-specific content targeting the specific facility types you want to serve, position your credentials and compliance capabilities, and build the review profile that commercial buyers require for vendor approval." },
      { question: "Can LocalBeacon help me get into medical office cleaning?", answer: "Yes. Medical facility cleaning has specific compliance requirements and premium rates. We create medical cleaning content highlighting your OSHA training, disinfection protocols, and experience with clinical environments." },
      { question: "How do I differentiate from large janitorial companies with national contracts?", answer: "Responsiveness and local accountability are your advantages. LocalBeacon positions you as the local alternative — faster to respond, more accountable, and with a real decision-maker who answers the phone." },
      { question: "Can I target new commercial developments and office parks?", answer: "Yes. New commercial development content targets property managers who need cleaning services for newly opened spaces — a high-priority, competitive advantage timing window." },
      { question: "How long before I see commercial cleaning contract leads?", answer: "Commercial cleaning has a longer decision cycle than residential. Expect initial inquiries within 45-60 days and contract-level opportunities to develop over 3-6 months as your authority builds." },
    ],
  },

  'move-out-cleaning': {
    slug: "move-out-cleaning",
    name: "Move-Out Cleaning",
    plural: "Move-Out Cleaning Services",
    headline: "Security deposits depend on you. Be there.",
    subheadline: "Moving is stressful and time-crunched — homeowners and renters searching for move-out cleaning need you urgently. LocalBeacon makes sure they find you first.",
    description: "Local SEO for move-out cleaning and end-of-tenancy cleaning services. Rank for move-out cleaning, move-in cleaning, and deep cleaning for security deposit return searches.",
    painPoints: [
      { icon: "📦", title: "Move-out cleaning is urgent with a hard deadline", text: "Renters and homeowners need move-out cleaning done by a specific date — their lease end or closing day. This urgency means they book whoever they find first, not whoever is cheapest." },
      { icon: "🏠", title: "Real estate agents and property managers are referral gold", text: "Real estate agents and property managers recommend cleaning services constantly. Without visibility as a move-out specialist, you're missing these high-volume, recurring referral relationships." },
      { icon: "💰", title: "Security deposit motivation drives high conversion", text: "Renters searching for move-out cleaning are highly motivated — their deposit is on the line. This is the highest-conversion cleaning segment. LocalBeacon positions you to capture it." },
    ],
    features: [
      { title: "Move-out and move-in cleaning pages by city", text: "City-specific move-out cleaning pages capturing 'move-out cleaning in [city]' searches from renters and homeowners facing an imminent move." },
      { title: "Security deposit content that converts", text: "Content explaining how professional move-out cleaning increases security deposit return rates — the most compelling value proposition for renter clients." },
      { title: "Real estate and property manager positioning", text: "Content targeting agents and property managers as referral sources — the relationship that turns one-time moves into ongoing referral volume." },
      { title: "Checklist and standard content", text: "Move-out cleaning checklist content that captures detailed-search homeowners and positions your thoroughness versus cheaper alternatives." },
    ],
    stats: [
      { value: "$250–$600", label: "avg move-out cleaning ticket" },
      { value: "4.2×", label: "higher conversion vs. regular cleaning searches" },
      { value: "3.7×", label: "more move-out bookings within 60 days" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me capture move-out cleaning leads?", answer: "We create move-out-specific pages targeting the exact searches renters and homeowners do during moving — 'move-out cleaning near me,' 'end of lease cleaning,' and 'cleaning for security deposit return.' These searches convert at very high rates." },
      { question: "How do I build relationships with property managers for move-out cleaning?", answer: "We create property manager-focused content positioning you as a reliable, thorough move-out cleaning vendor — the kind of partner who makes their tenant turnover process easier and faster." },
      { question: "Can I offer move-in cleaning too and market both?", answer: "Yes. Move-in cleaning is often needed by the new tenant or buyer right after move-out cleaning. We create both pages and connect them — capturing both sides of the moving transaction." },
      { question: "How quickly can I get move-out cleaning bookings from LocalBeacon?", answer: "Move-out cleaning searches are active year-round with seasonal peaks in May-June and August-September (lease cycle periods). Most clients see additional move-out bookings within 30 days of their pages going live." },
      { question: "How do I compete with cleaning companies that offer every service?", answer: "Move-out cleaning specialization is more credible than 'we do everything.' LocalBeacon helps you own the move-out niche in your market — including checklist-specific content that signals thoroughness to deposit-motivated renters." },
    ],
  },

  'airbnb-cleaning': {
    slug: "airbnb-cleaning",
    name: "Airbnb Cleaning",
    plural: "Airbnb Cleaning Services",
    headline: "5-star turnovers. Keep hosts coming back.",
    subheadline: "Airbnb hosts live and die by their cleanliness ratings — LocalBeacon connects your professional turnover service with hosts who need reliability above all else.",
    description: "Local SEO for Airbnb cleaning and short-term rental turnover services. Rank for Airbnb cleaning, vacation rental cleaning, and STR turnover services in your market.",
    painPoints: [
      { icon: "⭐", title: "One bad review kills an Airbnb host's business", text: "Airbnb hosts know a single cleanliness complaint can tank their ratings. This makes reliability and consistency the #1 buying criterion — and exactly what LocalBeacon helps you signal online." },
      { icon: "📅", title: "Turnover timing is non-negotiable", text: "Airbnb guests check out at 11am, new guests arrive at 3pm. Hosts need cleaners who understand this pressure and show up on time, every time. Your marketing needs to communicate this reliability." },
      { icon: "🔑", title: "STR market growth creates demand you can't see", text: "New Airbnb hosts launch every week in your area. Without visibility for 'Airbnb cleaning service near me,' new hosts find competitors who were faster to market for this niche." },
    ],
    features: [
      { title: "Airbnb and STR platform-specific content", text: "Airbnb, VRBO, and Booking.com turnover cleaning content that speaks the language of short-term rental hosts and captures their specific search behavior." },
      { title: "Turnover speed and reliability messaging", text: "Same-day turnover, 4-hour cleaning windows, and checkin-ready guarantee content that directly addresses the most critical host concerns." },
      { title: "Property size and rate transparency", text: "Studio, 1BR, 2BR, and 3BR Airbnb cleaning rate content that helps hosts find and qualify your service instantly — reducing friction in the booking decision." },
      { title: "Host review and testimonial content", text: "Airbnb host review strategy that showcases the reliability and checklist thoroughness that differentiates professional STR cleaners from standard cleaning services." },
    ],
    stats: [
      { value: "$120–$400", label: "avg Airbnb turnover cleaning fee" },
      { value: "65%", label: "of hosts switch cleaners within 6 months" },
      { value: "3.5×", label: "more STR cleaning bookings within 60 days" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me find Airbnb hosts who need cleaning?", answer: "We create content targeting Airbnb host searches — 'Airbnb cleaning service near me,' 'STR turnover cleaner,' and 'vacation rental cleaning for hosts' — capturing hosts actively looking for a new or first cleaning service." },
      { question: "How do I differentiate my Airbnb cleaning service from regular house cleaners?", answer: "LocalBeacon positions your STR-specific expertise — understanding checkout/checkin windows, restocking protocols, checklist documentation for hosts, and platform-specific standards — that casual cleaning services can't match." },
      { question: "Can I market to VRBO and other platforms besides Airbnb?", answer: "Yes. We create content for all major short-term rental platforms so you capture the full STR host market, not just Airbnb users." },
      { question: "How do I get Airbnb hosts to leave reviews for my cleaning service?", answer: "We build review request strategies tailored to the Airbnb ecosystem — including timing requests around successful guest stays so hosts are in a positive mindset when you ask." },
      { question: "How do I compete with cleaning companies that also target Airbnb?", answer: "STR-specific positioning is more credible than generic cleaning. LocalBeacon helps you create Airbnb-specific content, checklists, and communication that generic cleaners can't authentically replicate." },
    ],
  },

  'deep-cleaning': {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    plural: "Deep Cleaning Services",
    headline: "When regular just won't cut it.",
    subheadline: "Deep cleaning is the highest-ticket residential cleaning service — LocalBeacon captures the homeowners who search for it when they're ready to invest in a serious clean.",
    description: "Local SEO for deep cleaning services. Rank for deep house cleaning, one-time deep clean, post-construction cleaning, and spring cleaning services in your area.",
    painPoints: [
      { icon: "🧹", title: "Deep cleaning searches happen after specific trigger events", text: "Moving in, recovering from illness, hosting an event, or post-renovation — deep cleaning has clear trigger moments. Without content matching these moments, you miss the highest-converting cleaning searches." },
      { icon: "💰", title: "Deep cleaning is your highest-ticket service with the lowest marketing", text: "A deep clean can be 3-5× a regular clean ticket. Yet most cleaning companies market their cheapest service. LocalBeacon helps you lead with your premium offering to attract the right customers." },
      { icon: "🌱", title: "One-time deep clean converts to recurring relationships", text: "First-time deep cleaning clients who love the result become your most loyal recurring customers. Without visibility for this entry point, you miss the top of your client acquisition funnel." },
    ],
    features: [
      { title: "Trigger-moment deep cleaning content", text: "Post-move, post-construction, post-illness, new baby prep, and post-holiday deep clean content that matches the exact moment homeowners decide they need a serious clean." },
      { title: "Service scope and inclusions content", text: "Detailed deep cleaning scope pages — appliances, baseboards, inside cabinets, grout — that help homeowners understand the value and distinguish your service from a standard clean." },
      { title: "Spring cleaning season visibility", text: "Spring deep cleaning content timed to the annual home refresh season — the highest-volume window for one-time deep clean inquiries." },
      { title: "Conversion to recurring service", text: "Deep clean to regular maintenance conversion content that turns your highest-ticket service into the beginning of a long-term cleaning relationship." },
    ],
    stats: [
      { value: "$300–$800", label: "avg deep cleaning ticket" },
      { value: "4.3×", label: "higher ticket vs. standard clean" },
      { value: "58%", label: "of deep clean clients become recurring" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me get more deep cleaning bookings?", answer: "We create content targeting the trigger moments that send homeowners searching for deep cleaning — moving in, post-renovation, spring cleaning, holiday prep — capturing them when their motivation to book is highest." },
      { question: "How do I communicate what's included in a deep clean versus regular cleaning?", answer: "LocalBeacon creates detailed scope content that educates homeowners on the difference — inside appliances, behind furniture, grout scrubbing, window tracks — that justifies the premium price and drives bookings from informed buyers." },
      { question: "Can deep cleaning leads convert into recurring customers?", answer: "Yes, frequently. We create follow-up content and positioning that naturally transitions first-time deep clean clients into recurring cleaning plans — your most profitable and stable revenue source." },
      { question: "How do I market post-construction deep cleaning?", answer: "Construction dust and debris cleanup is a specialized segment with premium rates. We create post-construction deep cleaning content targeting contractors and homeowners completing renovations — high-ticket, time-sensitive jobs." },
      { question: "How quickly will I see deep cleaning inquiries from LocalBeacon?", answer: "Deep cleaning pages typically start generating inquiries within 30-45 days. Seasonal peaks in spring and pre-holiday periods create additional surges that LocalBeacon positions you to capture." },
    ],
  },

  'termite-control': {
    slug: "termite-control",
    name: "Termite Control",
    plural: "Termite Control Services",
    headline: "Stop termites before they eat the call.",
    subheadline: "Termite discovery is terrifying for homeowners — LocalBeacon puts your termite control service at the top of the search before panic sets in.",
    description: "Local SEO for termite control and extermination services. Rank for termite inspection, termite treatment, and subterranean termite control searches in your area.",
    painPoints: [
      { icon: "🪲", title: "Termite discovery triggers immediate, high-urgency search", text: "A homeowner who finds termites doesn't wait. They search immediately and call the first credible result. If you're not ranking for 'termite control near me,' you lose the call in the first 5 minutes." },
      { icon: "🏠", title: "Real estate inspections generate termite treatment leads you're missing", text: "Home inspections frequently uncover termites, creating instant demand for treatment before closing. Real estate agent networks are a referral goldmine for termite companies who are visible and connected." },
      { icon: "🔄", title: "Annual termite inspections are recurring revenue you're not marketing", text: "Prevention contracts and annual inspections create the recurring revenue that makes termite businesses stable. Without content promoting ongoing protection, you're leaving this stream untapped." },
    ],
    features: [
      { title: "Termite species and treatment pages", text: "Subterranean, drywood, dampwood, and Formosan termite content that matches the specific searches of informed homeowners and provides the expertise signal that converts to calls." },
      { title: "Treatment method content", text: "Liquid termiticide, Termidor, fumigation, heat treatment, and bait station content for homeowners researching their options before selecting a provider." },
      { title: "Real estate and inspection positioning", text: "Pre-sale termite inspection and real estate agent partnership content targeting the home sale market — the most predictable, scheduled termite treatment segment." },
      { title: "Prevention and protection plan content", text: "Annual inspection and prevention contract content that builds recurring relationships with homeowners motivated to protect their investment after a scare." },
    ],
    stats: [
      { value: "$1,500–$5,000", label: "avg termite treatment value" },
      { value: "4.6×", label: "higher urgency vs. general pest searches" },
      { value: "3.4×", label: "more treatment leads within 90 days" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me capture urgent termite treatment leads?", answer: "We build your search presence for 'termite control near me,' 'termite exterminator,' and species-specific searches so you're already ranking when a homeowner makes that panicked discovery." },
      { question: "How do I capture leads from real estate transactions?", answer: "We create real estate-focused termite inspection content and position you as a trusted referral for real estate agents — who recommend termite inspectors and treaters multiple times per month." },
      { question: "Can LocalBeacon help me sell annual termite protection contracts?", answer: "Yes. Prevention plan content targeting homeowners in termite-prone areas or those who've had a previous infestation builds the recurring revenue stream that makes termite businesses stable year-round." },
      { question: "How do I explain different treatment methods to homeowners online?", answer: "LocalBeacon creates treatment comparison content — bait stations vs. liquid barriers, fumigation vs. spot treatment — that educates homeowners and positions you as the knowledgeable expert before the estimate." },
      { question: "How quickly will I see termite leads from LocalBeacon?", answer: "Termite searches are active year-round with spring and summer peaks (swarming season). Pages typically start ranking within 2-3 weeks and most clients see additional termite leads within 45 days." },
    ],
  },

  'bed-bug-treatment': {
    slug: "bed-bug-treatment",
    name: "Bed Bug Treatment",
    plural: "Bed Bug Treatment Services",
    headline: "Bed bug calls go fast. Be the first answer.",
    subheadline: "Bed bug discovery is an emergency for homeowners — LocalBeacon makes your service the first credible result they find when panic sets in.",
    description: "Local SEO for bed bug extermination and treatment services. Rank for bed bug treatment, bed bug heat treatment, and bed bug inspection searches in your market.",
    painPoints: [
      { icon: "🛏️", title: "Bed bug discovery triggers immediate, emotional search", text: "Finding bed bugs is one of the most stressful home discoveries. Homeowners search within minutes and call whoever looks most credible. Without strong local visibility, that call doesn't come to you." },
      { icon: "🔥", title: "Heat treatment searches are high-value and growing", text: "Homeowners increasingly prefer heat treatment over chemical methods. Without heat treatment-specific content, you're invisible to the fastest-growing, highest-ticket bed bug service segment." },
      { icon: "🏨", title: "Hotels, rentals, and multi-unit housing are a commercial market you're missing", text: "Hospitality and property management companies need fast, discreet bed bug treatment. Without B2B positioning, you miss the commercial contracts that provide volume and predictable revenue." },
    ],
    features: [
      { title: "Treatment method pages by approach", text: "Heat treatment, chemical treatment, and K9 inspection pages that capture method-specific searches from homeowners who've already researched their preferred approach." },
      { title: "Emergency bed bug response positioning", text: "Same-day and emergency bed bug treatment content capturing the most urgent, highest-converting segment of the bed bug market." },
      { title: "Commercial and hospitality bed bug content", text: "Hotel, Airbnb, apartment, and multi-unit residential content targeting property managers who need fast, discrete treatment that doesn't disrupt their guests or tenants." },
      { title: "Prevention and follow-up content", text: "Bed bug prevention guides and follow-up inspection content that builds ongoing relationships and repeat inspections from previously treated properties." },
    ],
    stats: [
      { value: "$1,000–$4,000", label: "avg bed bug treatment value" },
      { value: "95%", label: "of bed bug calls convert on first contact" },
      { value: "3.8×", label: "more treatment calls within 60 days" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me capture bed bug calls?", answer: "We build your search presence for 'bed bug exterminator near me,' 'bed bug heat treatment,' and 'how to get rid of bed bugs' — capturing homeowners at the exact moment they search in a panic." },
      { question: "How do I market bed bug heat treatment specifically?", answer: "Heat treatment pages targeting 'bed bug heat treatment near me' capture homeowners who want the most effective, chemical-free solution. This is your premium service and it converts at high rates from people who've done their research." },
      { question: "Can LocalBeacon help me get commercial bed bug contracts?", answer: "Yes. Hotel, Airbnb host, and property management bed bug content positions you as the professional, discrete commercial option — critical for hospitality operators who need treatment done without guest awareness." },
      { question: "How do I compete with national pest control companies like Orkin?", answer: "National companies are slow in local search and rely on brand recognition. LocalBeacon builds your authentic local presence — faster response times, local knowledge, and real reviews from your community — consistently outperforming national chains in local results." },
      { question: "How quickly will I see bed bug leads from LocalBeacon?", answer: "Bed bug searches spike year-round with travel season peaks. Pages typically rank within 2-3 weeks and most clients see additional bed bug inquiries within 30-45 days." },
    ],
  },

  'rodent-control': {
    slug: "rodent-control",
    name: "Rodent Control",
    plural: "Rodent Control Services",
    headline: "Mice and rats don't wait. Neither should you.",
    subheadline: "Rodent infestations send homeowners searching immediately — LocalBeacon positions your rodent control service as the first credible option they find.",
    description: "Local SEO for rodent control and extermination services. Rank for mouse control, rat extermination, and rodent exclusion searches in every neighborhood you serve.",
    painPoints: [
      { icon: "🐀", title: "Rodent discovery is urgent and emotionally charged", text: "Finding a mouse in the kitchen or hearing rats in the attic triggers immediate search behavior. Whoever ranks highest for 'rodent control near me' gets the call. Without strong visibility, that's not you." },
      { icon: "❄️", title: "Cold weather rodent invasions are predictable and you're not capitalizing", text: "Rodents move indoors every fall as temperatures drop. This creates a predictable annual spike in rodent calls — but only for pest companies who have built their seasonal visibility in advance." },
      { icon: "🏠", title: "Exclusion and prevention are premium services you're not marketing", text: "Long-term rodent exclusion — sealing entry points, ongoing protection — is far more profitable than one-time trapping. Without exclusion-specific content, customers only find you for the cheap service." },
    ],
    features: [
      { title: "Species-specific rodent control pages", text: "Mouse control, rat extermination, and squirrel removal pages that capture species-specific searches from homeowners who know what they're dealing with." },
      { title: "Fall rodent prevention season content", text: "Pre-winter exclusion content timed to the September-October rodent invasion season — capturing homeowners before they have an infestation rather than after." },
      { title: "Exclusion and long-term protection content", text: "Entry point sealing, exclusion mesh, and ongoing monitoring content that positions your premium services and builds longer-term client relationships." },
      { title: "Commercial rodent control pages", text: "Restaurant, warehouse, and food service rodent control content targeting the commercial segment where health code compliance creates recurring inspection demand." },
    ],
    stats: [
      { value: "$400–$1,500", label: "avg rodent control treatment" },
      { value: "4.1×", label: "fall demand spike vs. spring baseline" },
      { value: "3.3×", label: "more rodent control calls within 90 days" },
    ],
    faqs: [
      { question: "How does LocalBeacon help me capture rodent control calls year-round?", answer: "We create year-round content with seasonal emphasis — prevention in fall, trapping in winter, exclusion in spring — so you capture the natural peaks and maintain visibility during slower periods." },
      { question: "How do I market rodent exclusion as a premium service?", answer: "Exclusion content explains why one-time trapping doesn't solve the problem long-term — and positions your comprehensive sealing and monitoring service as the lasting solution. This attracts higher-value, repeat relationship clients." },
      { question: "Can LocalBeacon help me get commercial rodent control contracts?", answer: "Yes. Restaurants and food service businesses have regulatory requirements around pest control. We create commercial rodent content targeting these buyers — who need consistent, documented service and represent your most stable contracts." },
      { question: "How do I differentiate from one-man rodent operations?", answer: "LocalBeacon positions your insurance, licensing, warranty-backed exclusion service, and professional reputation — the credibility signals that help homeowners choose you over unlicensed operators." },
      { question: "How quickly will I see rodent control leads from LocalBeacon?", answer: "Rodent pages rank relatively quickly due to specific search terms. Most clients see additional rodent inquiries within 30-45 days, with a significant spike during fall rodent invasion season." },
    ],
  },

  'wildlife-removal': {
    slug: "wildlife-removal",
    name: "Wildlife Removal",
    plural: "Wildlife Removal Services",
    headline: "Humanely remove it. Professionally prevent it.",
    subheadline: "Raccoons in the attic, squirrels in the walls — wildlife calls are urgent and high-value. LocalBeacon makes your service the first one homeowners find.",
    description: "Local SEO for wildlife removal and animal control services. Rank for raccoon removal, squirrel removal, bat removal, and wildlife exclusion searches in your area.",
    painPoints: [
      { icon: "🦝", title: "Wildlife calls are urgent and require licensed professionals", text: "Homeowners with animals in their attic can't wait. And they specifically search for 'licensed wildlife removal' — not just pest control. Without species-specific and licensed positioning, you miss these calls." },
      { icon: "🏡", title: "Entry point damage creates recurring work you're not capturing", text: "Every wildlife removal should include exclusion repair, but most homeowners don't know to ask. Without content promoting exclusion services, you're leaving 50% of your potential revenue on the table." },
      { icon: "🌿", title: "Humane removal is the fast-growing preference", text: "Humane trap-and-release searches are growing significantly as homeowners want ethical options. Without humane-specific positioning, you lose this motivated, quality-focused segment to competitors who market it." },
    ],
    features: [
      { title: "Species-specific removal pages", text: "Raccoon, squirrel, bat, skunk, opossum, and groundhog removal pages for each animal type — capturing the highly specific searches homeowners do when they know what's in their home." },
      { title: "Humane removal positioning content", text: "Content emphasizing licensed, humane trap-and-release methods that appeals to the growing segment of homeowners who want ethical wildlife solutions." },
      { title: "Exclusion and prevention service pages", text: "Entry point sealing, chimney caps, soffit repair, and ongoing monitoring content that turns one-time removal calls into recurring prevention contracts." },
      { title: "Emergency wildlife response optimization", text: "After-hours and weekend wildlife emergency content targeting urgent searches — when homeowners find animals in living spaces and need immediate professional help." },
    ],
    stats: [
      { value: "$300–$1,200", label: "avg wildlife removal job" },
      { value: "3.8×", label: "spring/fall demand spike" },
      { value: "2.9×", label: "more wildlife calls within 60 days" },
    ],
    faqs: [
      { question: "How does LocalBeacon help wildlife removal companies get more calls?", answer: "We create species-specific and location-specific content — 'raccoon removal in [city]', 'bat exclusion near me' — targeting the exact searches homeowners make when they have an urgent wildlife problem." },
      { question: "Can LocalBeacon help me market exclusion services?", answer: "Yes. Most homeowners don't know exclusion exists until you tell them. We create content explaining why removal without exclusion leads to repeat invasions — positioning your full-service offering as the smart choice." },
      { question: "How do I compete with pest control companies offering wildlife services?", answer: "LocalBeacon positions your wildlife-specific licensing, humane methods, and species expertise — the specialization that general pest control companies can't match. Homeowners searching specifically for wildlife removal want a specialist." },
      { question: "Do seasonal patterns affect my marketing?", answer: "Absolutely. We create seasonal content — baby season warnings in spring, attic invasion content in fall, bat hibernation guidance in winter — so you're visible during every peak period." },
      { question: "How quickly will wildlife removal pages start ranking?", answer: "Wildlife removal terms are less competitive than general pest control. Most clients see new inquiries within 30-45 days, with significant jumps during spring birthing season and fall nesting season." },
    ],
  },
}
