export interface IndustryFAQ {
  question: string
  answer: string
}

export interface IndustryData {
  slug: string
  name: string
  plural: string
  headline: string
  subheadline: string
  description: string
  painPoints: { icon: string; title: string; text: string }[]
  features: { title: string; text: string }[]
  stats: { value: string; label: string }[]
  faqs: IndustryFAQ[]
}

export const industries: Record<string, IndustryData> = {
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

  dental: {
    slug: "dental",
    name: "Dental",
    plural: "Dentists",
    headline: "Fill your chair schedule, not your marketing to-do list.",
    subheadline:
      "LocalBeacon handles your practice's local marketing — so you can focus on patients, not posting to Google.",
    description:
      "AI-powered local marketing for dental practices. Automated Google Business Profile posts, city-specific practice pages, review responses, and AI search optimization built for dentists.",
    painPoints: [
      {
        icon: "🦷",
        title: "New patient acquisition is expensive",
        text: "Google Ads cost $50-150 per click for dental keywords. LocalBeacon drives organic visibility for a fraction of the cost — patients who find you naturally convert better anyway.",
      },
      {
        icon: "📍",
        title: "Competing with corporate dental chains",
        text: "Big chains have marketing teams. You don't. LocalBeacon gives independent practices the same always-on local visibility that corporate chains invest thousands to maintain.",
      },
      {
        icon: "💬",
        title: "Reviews make or break dental practices",
        text: "88% of patients read reviews before choosing a dentist. LocalBeacon ensures every review gets a professional, HIPAA-mindful response that builds trust.",
      },
    ],
    features: [
      {
        title: "Patient education posts every week",
        text: "Oral health tips, seasonal reminders (back-to-school checkups, holiday candy warnings), and practice updates posted to your Google listing automatically.",
      },
      {
        title: "Local pages for surrounding communities",
        text: "\"Family Dentist in Eagan\" and \"Emergency Dental Care in Savage\" pages that attract patients from every neighborhood near your practice.",
      },
      {
        title: "HIPAA-mindful review responses",
        text: "AI-drafted responses that thank patients without discussing treatment details — professional, warm, and compliant with privacy best practices.",
      },
      {
        title: "AI search optimization for dental",
        text: "When someone asks an AI assistant \"best dentist near me accepting new patients,\" your structured data helps your practice appear in recommendations.",
      },
    ],
    stats: [
      { value: "25+", label: "new patients/month avg" },
      { value: "73%", label: "lower cost vs. Google Ads" },
      { value: "4.9★", label: "avg client rating maintained" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help dental practices get more patients?",
        answer:
          "LocalBeacon increases your Google Business Profile visibility through weekly posts, local landing pages, and review management. Most dental clients see 15-30 new patient inquiries per month from improved local visibility.",
      },
      {
        question: "Are the review responses HIPAA-compliant?",
        answer:
          "Yes. Our AI is trained to respond to reviews without referencing specific treatments, diagnoses, or patient health information. Responses thank patients and address concerns in general terms.",
      },
      {
        question: "Can this work for multi-location dental practices?",
        answer:
          "Absolutely. Our Agency plan supports unlimited locations, each with their own Google Business Profile management, local pages, and review responses.",
      },
      {
        question: "What kind of content does LocalBeacon create for dentists?",
        answer:
          "Weekly Google posts about oral health tips, seasonal reminders, practice updates, and community involvement. Plus dedicated landing pages for each service (cleanings, whitening, implants) in each city you serve.",
      },
      {
        question: "How is this different from a dental marketing agency?",
        answer:
          "Dental marketing agencies charge $2,000-8,000/month and often lock you into long contracts. LocalBeacon starts at $49/month, works immediately, and you can cancel anytime.",
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

  landscapers: {
    slug: "landscapers",
    name: "Landscaping",
    plural: "Landscapers",
    headline: "Grow your client list as well as their lawns.",
    subheadline:
      "LocalBeacon keeps your landscaping business visible year-round — so you book spring cleanups in winter and snow removal in summer.",
    description:
      "AI-powered local marketing for landscaping companies. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for landscapers.",
    painPoints: [
      {
        icon: "🌿",
        title: "Seasonal revenue swings hurt cash flow",
        text: "Landscaping is booming in summer but slow in winter. LocalBeacon promotes snow removal, holiday lighting, and spring prep during off-months to keep revenue steady.",
      },
      {
        icon: "📸",
        title: "Your best marketing is visual, but Google wants text",
        text: "Beautiful lawn transformations make great photos, but Google ranks text content. LocalBeacon creates the written content and local pages that help you rank, complementing your visual portfolio.",
      },
      {
        icon: "🏡",
        title: "Neighborhood-by-neighborhood competition",
        text: "Landscaping is hyperlocal — homeowners want someone who knows their neighborhood. LocalBeacon creates pages for every community you serve, showing you're truly local.",
      },
    ],
    features: [
      {
        title: "Seasonal content that drives year-round calls",
        text: "Spring cleanup offers, summer lawn care tips, fall leaf removal reminders, winter snow services — posted to your Google listing at the perfect time.",
      },
      {
        title: "Local pages for every neighborhood",
        text: "\"Landscaping Services in Eden Prairie\" and \"Lawn Care in Bloomington\" pages that rank you in each neighborhood where you want more clients.",
      },
      {
        title: "Turn reviews into your best marketing",
        text: "Happy clients leave great reviews. LocalBeacon responds to each one promptly, keeping your profile active and building trust with every future client who reads them.",
      },
      {
        title: "Be found by AI and voice search",
        text: "When someone asks their phone \"landscaper near me\" or asks ChatGPT for recommendations, your optimized presence helps you appear in those results.",
      },
    ],
    stats: [
      { value: "35%", label: "less seasonal revenue drop" },
      { value: "18+", label: "neighborhoods targeted" },
      { value: "3.4×", label: "more quote requests" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help landscapers get more clients?",
        answer:
          "We automate the local marketing tasks that drive client calls: weekly Google posts, neighborhood-specific landing pages, and professional review responses. Most landscaping clients see measurable increases in quote requests within 60 days.",
      },
      {
        question: "Can LocalBeacon promote my snow removal services too?",
        answer:
          "Yes. LocalBeacon creates seasonal content year-round. In fall and winter, we shift to promoting snow removal, ice management, and holiday lighting services to keep your schedule full.",
      },
      {
        question: "What if I only serve a few neighborhoods?",
        answer:
          "That's fine — even our Free plan supports one location. As you grow, our Solo and Agency plans let you add more service areas and target more neighborhoods.",
      },
      {
        question: "Do I need to provide photos or content?",
        answer:
          "No. Our AI generates all written content based on your service details. If you want to share before/after photos, we can incorporate those, but they're not required.",
      },
      {
        question: "How much does it cost?",
        answer:
          "LocalBeacon starts free for one location. Our Solo plan is $49/month for up to 3 locations with unlimited posts, and the Agency plan is $99/month for unlimited locations and white-label features.",
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
}

export const industryList = Object.values(industries)
export const industrySlugs = Object.keys(industries)
