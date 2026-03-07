import type { IndustryData } from './types'

export const foodLocal: Record<string, IndustryData> = {
  restaurants: {
    slug: "restaurants",
    name: "Restaurant",
    plural: "Restaurants",
    headline: "Fill tables, not DoorDash's pockets.",
    subheadline:
      "Third-party delivery apps take 30% of every order. LocalBeacon drives direct traffic to your restaurant — customers who walk in, sit down, and come back next week.",
    description:
      "AI-powered local marketing for restaurants. Automated Google Business Profile posts, city-specific landing pages, review management, and AI search optimization for dine-in, takeout, catering, and direct delivery orders.",
    painPoints: [
      {
        icon: "💸",
        title: "DoorDash and Uber Eats are eating your margins",
        text: "You pay 15-30% commission on every delivery order, turning profitable dishes into break-even transactions. LocalBeacon drives direct orders and walk-ins through organic search — customers who find you on Google, not through an app that takes a cut.",
      },
      {
        icon: "⭐",
        title: "One bad Yelp review can tank a slow Tuesday",
        text: "A single 1-star review sits at the top of your Yelp page for weeks, and you can't delete it. LocalBeacon keeps your Google reviews active, responded to, and growing — so your overall rating stays strong and one bad night doesn't define you.",
      },
      {
        icon: "🍽️",
        title: "Menu updates and seasonal specials get lost",
        text: "You launched a new brunch menu, but your Google listing still shows last year's hours and your website hasn't been updated since COVID. LocalBeacon keeps your online presence fresh with regular posts about specials, events, and menu changes.",
      },
    ],
    features: [
      {
        title: "Google posts that promote specials and events",
        text: "Taco Tuesday deals, new seasonal menus, live music nights, and holiday reservation reminders — posted to your Google profile where hungry locals are already searching for where to eat tonight.",
      },
      {
        title: "City pages that capture \"food near me\" searches",
        text: "\"Best Italian Restaurant in Old Town\" and \"Thai Food in Scottsdale\" pages that rank you for cuisine and location-specific searches — the exact queries people make when deciding where to eat.",
      },
      {
        title: "Review responses that turn critics into regulars",
        text: "Thoughtful responses to every review — positive and negative — show diners that you care about their experience. LocalBeacon crafts responses that acknowledge feedback and invite guests back, turning potential damage into loyalty.",
      },
      {
        title: "Be the AI answer to \"where should I eat?\"",
        text: "When someone asks ChatGPT or Siri \"best restaurants near me\" or \"good sushi in this area,\" your optimized Google presence and content help you appear in those AI-curated recommendations.",
      },
    ],
    stats: [
      { value: "28%", label: "more direct walk-in traffic" },
      { value: "4.6", label: "avg. Google rating maintained" },
      { value: "3.2×", label: "more website orders vs. apps" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help restaurants get more direct customers?",
        answer:
          "We keep your Google Business Profile active with weekly posts about specials, events, and menu updates. Combined with city-specific landing pages and professional review management, this drives more diners to find you on Google and order directly — bypassing third-party delivery apps and their commissions.",
      },
      {
        question: "Can LocalBeacon help reduce our reliance on DoorDash and Uber Eats?",
        answer:
          "Yes. By improving your organic Google visibility, more customers discover your restaurant directly. They call to order, visit your website, or walk in — all without a 15-30% platform commission eating into your margins.",
      },
      {
        question: "How do you handle negative reviews?",
        answer:
          "LocalBeacon responds to negative reviews promptly and professionally, acknowledging the concern and inviting the guest to return. This shows future diners that you take feedback seriously and often leads to the reviewer updating their rating.",
      },
      {
        question: "Can I promote different things at different times — lunch specials, happy hour, weekend brunch?",
        answer:
          "Absolutely. LocalBeacon creates time-relevant content — lunch deals posted mid-morning, happy hour promotions on Wednesday afternoons, and brunch highlights on Thursday and Friday. Your posts reach potential diners when they're deciding where to go.",
      },
      {
        question: "We have multiple locations — does this work for restaurant groups?",
        answer:
          "Yes. Our Agency plan supports unlimited locations, each with its own Google profile, city pages, and tailored content. Perfect for restaurant groups that want consistent marketing across every location.",
      },
      {
        question: "Do I need to update the content myself?",
        answer:
          "No. After initial setup where you provide your menu, specials, and style preferences, LocalBeacon generates all content automatically. You can review and approve posts if you want, or let them publish on autopilot.",
      },
    ],
  },

  catering: {
    slug: "catering",
    name: "Catering",
    plural: "Catering Companies",
    headline: "Book the big events your kitchen deserves.",
    subheadline:
      "Corporate lunch orders and wedding receptions don't happen by accident — event planners research extensively online. LocalBeacon makes sure your catering company is the one they find, review, and call.",
    description:
      "AI-powered local marketing for catering companies. Automated Google Business Profile posts, city-specific landing pages, review management, and AI search optimization for corporate catering, wedding catering, private events, and meal delivery services.",
    painPoints: [
      {
        icon: "🏢",
        title: "Corporate clients search online, not in their Rolodex",
        text: "Office managers and executive assistants Google \"catering near me\" when ordering for meetings, retreats, and holiday parties. If your company doesn't show up in that search, the order goes to ezCater or a competitor who ranks higher.",
      },
      {
        icon: "📊",
        title: "Big events require big trust — and that means reviews",
        text: "No one hires an unknown caterer for a 200-person wedding. Event planners check Google reviews obsessively, looking for mentions of reliability, food quality, and professionalism. LocalBeacon builds and maintains the review profile that earns that trust.",
      },
      {
        icon: "📉",
        title: "Feast-or-famine booking cycles drain your team",
        text: "Wedding season and Q4 corporate events pack your calendar, then January hits and your kitchen goes quiet. LocalBeacon promotes corporate lunches, meal prep, and smaller events during off-months to stabilize your revenue.",
      },
    ],
    features: [
      {
        title: "Google posts timed to event planning cycles",
        text: "\"Book your holiday party catering\" in September, corporate Q1 kickoff promotions in December, wedding tasting events in January — all posted to your Google profile when event planners are actively making decisions.",
      },
      {
        title: "City pages for every market you serve",
        text: "\"Corporate Catering in Buckhead\" and \"Wedding Catering in Marietta\" pages that rank you for high-value searches in the specific areas where your kitchen can deliver — literally.",
      },
      {
        title: "Reviews that prove large-event reliability",
        text: "Catering reviews that mention on-time setup, delicious food for 200 guests, and professional staff are gold. LocalBeacon responds to every review, amplifying these trust signals for the next event planner reading your profile.",
      },
      {
        title: "AI-powered visibility for catering searches",
        text: "When an office manager asks ChatGPT \"best catering companies near me\" or an event planner uses AI to compare local caterers, your optimized presence ensures you're in the results — not just the big national platforms.",
      },
    ],
    stats: [
      { value: "4.1×", label: "more event inquiry calls" },
      { value: "$8,400", label: "avg. new client lifetime value" },
      { value: "15", label: "avg. service area cities ranked" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help catering companies get more bookings?",
        answer:
          "We build your Google presence with weekly posts timed to event planning cycles, create landing pages for every city in your service area, and manage your reviews professionally. This puts you in front of event planners and office managers when they're actively searching for a caterer.",
      },
      {
        question: "Can I target corporate and social events separately?",
        answer:
          "Yes. LocalBeacon creates distinct content for corporate catering (meetings, conferences, holiday parties) and social events (weddings, birthday parties, graduations) — each with messaging that resonates with that specific audience.",
      },
      {
        question: "How do you handle seasonal fluctuations in catering demand?",
        answer:
          "We promote different services throughout the year: wedding tastings in winter, corporate lunch programs in spring, summer event packages, and holiday party catering in fall. Off-season content promotes meal prep, weekly delivery, and smaller private dinners.",
      },
      {
        question: "We compete with ezCater and other platforms — can LocalBeacon help?",
        answer:
          "Absolutely. Those platforms take significant commissions on every order. LocalBeacon drives direct inquiries through organic search — clients who call you directly, negotiate terms with you, and build a relationship that leads to repeat business.",
      },
      {
        question: "How important are Google reviews for a catering company?",
        answer:
          "Extremely. Catering is a high-trust, high-stakes service — nobody wants to risk bad food at their wedding or corporate event. A strong Google review profile with recent, detailed, responded-to reviews is often the deciding factor between you and a competitor.",
      },
      {
        question: "We serve a large metro area — can we rank in multiple cities?",
        answer:
          "Yes. Our Solo plan supports up to 3 service areas, and the Agency plan covers unlimited cities. We create dedicated landing pages for each area so you rank locally in every market your kitchen can reach.",
      },
    ],
  },

  bakeries: {
    slug: "bakeries",
    name: "Bakery",
    plural: "Bakeries",
    headline: "Turn foot traffic into a line out the door.",
    subheadline:
      "Your croissants are perfect and your custom cakes are works of art — but new customers can't taste your baking through a screen. LocalBeacon makes sure they find you, read your rave reviews, and walk through your door.",
    description:
      "AI-powered local marketing for bakeries. Automated Google Business Profile posts, city-specific landing pages, review management, and AI search optimization for custom cakes, daily pastries, wedding cakes, and specialty baked goods.",
    painPoints: [
      {
        icon: "🎂",
        title: "Custom cake orders require trust you haven't earned yet",
        text: "A $500 wedding cake order from a stranger requires enormous trust. They need to see dozens of positive reviews, photos of past work, and proof that you deliver on time. LocalBeacon builds that proof systematically through your Google presence.",
      },
      {
        icon: "🚶",
        title: "Walk-in traffic depends on location luck",
        text: "Bakeries on busy streets thrive; bakeries one block off Main Street struggle. LocalBeacon levels the playing field by driving Google searchers directly to your door — customers who sought you out, not just stumbled past.",
      },
      {
        icon: "📸",
        title: "Instagram-worthy doesn't mean Google-findable",
        text: "Your decorated cookies and layered cakes go viral on Instagram, but that doesn't help when someone Googles \"bakery near me\" and finds your competitor instead. LocalBeacon creates the local search content that Instagram can't provide.",
      },
    ],
    features: [
      {
        title: "Google posts that showcase daily and seasonal specials",
        text: "\"Fresh king cake for Mardi Gras,\" pumpkin spice offerings in October, holiday cookie pre-order announcements, and weekly specials — posted to your Google listing when hungry locals are searching.",
      },
      {
        title: "City pages that drive custom orders",
        text: "\"Custom Wedding Cakes in Georgetown\" and \"Best Bakery in Round Rock\" pages that rank you for the high-intent searches that lead to walk-ins and custom cake consultations.",
      },
      {
        title: "Reviews that make mouths water",
        text: "Bakery reviews are uniquely powerful — customers describe flavors, textures, and the experience of biting into your work. LocalBeacon responds to every review warmly, building a mouthwatering library of testimonials.",
      },
      {
        title: "AI search results for \"best bakery near me\"",
        text: "When someone asks their AI assistant for bakery recommendations or searches \"where to get a custom cake,\" your optimized local presence positions you as the top neighborhood recommendation.",
      },
    ],
    stats: [
      { value: "38%", label: "more walk-in customers" },
      { value: "2.4×", label: "more custom cake inquiries" },
      { value: "6", label: "avg. neighborhoods ranked" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help bakeries get more customers?",
        answer:
          "We keep your Google Business Profile active with posts about daily specials, seasonal offerings, and custom cake availability. Combined with neighborhood landing pages and professional review responses, this drives more foot traffic and custom orders — especially from new customers who discover you through Google.",
      },
      {
        question: "Can LocalBeacon promote custom cake and wedding cake services?",
        answer:
          "Yes. Custom and wedding cakes are typically a bakery's highest-margin items. We create dedicated content targeting searches like \"custom birthday cake near me\" and \"wedding cake baker in [city]\" to drive these valuable consultations.",
      },
      {
        question: "We're a small bakery with one location — is this worth it?",
        answer:
          "Absolutely. Our Free plan is built for single-location businesses. Even a few extra walk-in customers per week can significantly impact a bakery's daily revenue, and one additional custom cake order easily covers the cost of our Solo plan.",
      },
      {
        question: "How do you handle our early morning hours and limited availability?",
        answer:
          "LocalBeacon ensures your Google listing always shows accurate hours, and our posts can highlight early-morning availability, pre-order options, and \"until sold out\" items. We help set customer expectations so they arrive when you're ready for them.",
      },
      {
        question: "We post a lot on Instagram — why do we need Google marketing too?",
        answer:
          "Instagram is great for followers who already know you, but Google captures new customers actively searching for a bakery right now. These are the highest-intent customers — they're hungry, nearby, and ready to buy. LocalBeacon makes sure they find you.",
      },
      {
        question: "Can LocalBeacon promote seasonal and holiday items?",
        answer:
          "Yes. We follow the bakery calendar: Valentine's Day treats, Easter pastries, graduation cakes, fall pumpkin everything, Thanksgiving pies, and holiday cookie boxes. Each seasonal item gets promoted at the right time to capture pre-orders and walk-in demand.",
      },
    ],
  },

  "local-delivery": {
    slug: "local-delivery",
    name: "Local Delivery",
    plural: "Local Delivery Services",
    headline: "Deliver more than packages. Deliver trust.",
    subheadline:
      "Local businesses and residents need fast, reliable delivery from someone who knows the area — not a faceless national carrier. LocalBeacon helps you become the delivery service your community trusts by name.",
    description:
      "AI-powered local marketing for local delivery services. Automated Google Business Profile posts, city-specific landing pages, review management, and AI search optimization for same-day delivery, restaurant delivery, pharmacy delivery, and local courier services.",
    painPoints: [
      {
        icon: "📦",
        title: "Amazon and FedEx set expectations you can't match — or can you?",
        text: "National carriers have trained consumers to expect fast, cheap delivery. But they can't offer the personal touch, same-day flexibility, or local knowledge you provide. LocalBeacon helps you market the advantages that only a local service can deliver.",
      },
      {
        icon: "🤝",
        title: "Restaurant and retail partnerships don't market themselves",
        text: "You've partnered with local restaurants and shops for delivery, but their customers don't know you exist. LocalBeacon creates content that positions you as the trusted local delivery partner — building your brand alongside theirs.",
      },
      {
        icon: "🗺️",
        title: "Geographic coverage is your product, but it's hard to communicate",
        text: "You deliver to 15 zip codes, but potential customers can't figure that out from your basic Google listing. LocalBeacon creates city and neighborhood pages that clearly show where you deliver — capturing searches from every area you cover.",
      },
    ],
    features: [
      {
        title: "Google posts that highlight speed and reliability",
        text: "Same-day delivery promotions, new restaurant partner announcements, expanded coverage area updates, and holiday shipping deadlines — all posted to your Google profile to keep customers informed and ordering.",
      },
      {
        title: "City pages for every delivery zone",
        text: "\"Same-Day Delivery in Decatur\" and \"Local Courier Service in Marietta\" pages that rank you in every city and neighborhood you cover — making your delivery zone crystal clear to potential customers.",
      },
      {
        title: "Reviews that prove local reliability",
        text: "Local delivery lives and dies by reliability. LocalBeacon responds to every review, highlighting mentions of on-time delivery, careful handling, and friendly drivers — the differentiators that national carriers can't match.",
      },
      {
        title: "AI search results for local delivery queries",
        text: "When businesses and residents ask AI assistants \"same-day delivery near me\" or \"local courier service,\" your optimized presence ensures you appear alongside — or instead of — the national shipping giants.",
      },
    ],
    stats: [
      { value: "3.5×", label: "more delivery requests" },
      { value: "24", label: "avg. zip codes ranked per client" },
      { value: "61%", label: "of new clients from Google search" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help local delivery services compete with FedEx and UPS?",
        answer:
          "We help you market the things national carriers can't offer: same-day flexibility, personal service, local knowledge, and community relationships. By ranking you in local search results for every city you cover, we connect you with customers who specifically want a local option.",
      },
      {
        question: "Can LocalBeacon promote our restaurant delivery partnerships?",
        answer:
          "Yes. We create content highlighting your restaurant partners, delivery menus, and ordering options. This builds your brand as the local delivery service that restaurants trust — driving orders from both the restaurants' customers and yours.",
      },
      {
        question: "How do you communicate our delivery zones to potential customers?",
        answer:
          "We create dedicated landing pages for every city and neighborhood in your delivery area. When someone searches \"delivery service in [their city],\" they find a page specifically confirming you deliver there — eliminating guesswork.",
      },
      {
        question: "We also do pharmacy and medical supply delivery — can you promote that?",
        answer:
          "Absolutely. Pharmacy delivery, medical supply delivery, and grocery delivery each get their own content stream. These are often high-trust, recurring services that command premium pricing — exactly the kind of business LocalBeacon helps you attract.",
      },
      {
        question: "How important are reviews for a delivery service?",
        answer:
          "Critical. Customers need to trust that their package, food, or prescription will arrive safely and on time. Strong, recent reviews with professional responses build that trust before a customer ever places their first order with you.",
      },
      {
        question: "We're a small operation with just a few drivers — is this affordable?",
        answer:
          "Our Free plan covers one delivery zone with 5 Google posts per month. The Solo plan at $49/month expands to 3 zones with unlimited posts. Most delivery services find that a few new regular customers per month easily covers the investment.",
      },
      {
        question: "Can LocalBeacon help us expand into new delivery areas?",
        answer:
          "Yes. When you add a new delivery zone, we create landing pages and targeted content for that area immediately. This lets you test demand in a new market before committing drivers and resources — using search volume and inquiries as your proof of concept.",
      },
    ],
  },
}
