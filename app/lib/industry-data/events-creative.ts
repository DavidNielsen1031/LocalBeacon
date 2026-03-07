import type { IndustryData } from './types'

export const eventsCreative: Record<string, IndustryData> = {
  photographers: {
    slug: "photographers",
    name: "Photography",
    plural: "Photographers",
    headline: "Get booked without begging for referrals.",
    subheadline:
      "Your portfolio is stunning — but it's buried on Instagram where only your existing followers see it. LocalBeacon puts your photography business in front of people actively searching for a photographer in your area.",
    description:
      "AI-powered local marketing for photographers. Automated Google Business Profile posts, city-specific service pages, review management, and AI search optimization for wedding, portrait, family, and commercial photography.",
    painPoints: [
      {
        icon: "📱",
        title: "Everyone with an iPhone thinks they're a photographer",
        text: "Smartphone cameras have lowered the barrier to entry, flooding the market with casual shooters. LocalBeacon helps you stand out by building a professional local presence that communicates your expertise, consistency, and artistic vision.",
      },
      {
        icon: "💍",
        title: "Wedding season books months in advance — or not at all",
        text: "Engaged couples start searching for photographers 8-12 months before their wedding. If you're not visible when they start looking, you've lost the booking. LocalBeacon keeps you ranking year-round so you're found during that critical research window.",
      },
      {
        icon: "🖼️",
        title: "Your best work lives on Instagram, not Google",
        text: "Instagram showcases your portfolio beautifully, but it doesn't rank on Google. LocalBeacon creates the text-based local content — city pages, Google posts, and optimized descriptions — that brings Google searchers to your portfolio.",
      },
    ],
    features: [
      {
        title: "Google posts that showcase your latest sessions",
        text: "Seasonal mini-session announcements, behind-the-scenes highlights, and booking availability updates — posted to your Google profile to keep it active and engaging for potential clients browsing your listing.",
      },
      {
        title: "City pages for every area you shoot",
        text: "\"Wedding Photographer in Napa Valley\" and \"Family Portraits in Palo Alto\" pages that rank you in the cities where your ideal clients are searching — not just where your studio is located.",
      },
      {
        title: "Reviews that build trust before the consultation",
        text: "Hiring a photographer is deeply personal. LocalBeacon responds to every review warmly and professionally, showing prospective clients that you're not just talented — you're a joy to work with.",
      },
      {
        title: "Show up when AI recommends photographers",
        text: "Couples and families increasingly ask ChatGPT and AI assistants for photographer recommendations. LocalBeacon optimizes your online presence so you're included in those AI-generated lists.",
      },
    ],
    stats: [
      { value: "2.7×", label: "more inquiry form submissions" },
      { value: "68%", label: "of bookings from Google search" },
      { value: "12", label: "avg. cities ranked per photographer" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help photographers book more clients?",
        answer:
          "We build your Google presence with weekly posts, city-specific landing pages, and professional review responses. This puts you in front of people actively searching for a photographer — not just scrolling Instagram. Most photographers see a measurable increase in inquiries within 60-90 days.",
      },
      {
        question: "I'm a wedding photographer — does this work for the wedding industry?",
        answer:
          "Especially well. Engaged couples research heavily on Google before choosing a photographer. LocalBeacon creates content targeting \"wedding photographer in [city]\" searches and builds the review profile that gives couples confidence to book.",
      },
      {
        question: "Can I promote different types of photography?",
        answer:
          "Yes. Whether you shoot weddings, portraits, families, newborns, events, or commercial work, LocalBeacon creates separate content for each specialty — so you rank for every type of photography you offer.",
      },
      {
        question: "I already have a strong Instagram presence — why do I need this?",
        answer:
          "Instagram is great for showcasing your portfolio to followers, but it doesn't help you rank on Google. When someone searches \"photographer near me,\" Google shows local business listings and websites — not Instagram profiles. LocalBeacon fills that gap.",
      },
      {
        question: "What if I work from home and don't have a studio?",
        answer:
          "Many successful photographers work without a physical studio. LocalBeacon focuses on your service areas rather than a storefront, creating city pages for the locations where you shoot and want to book more work.",
      },
      {
        question: "How much time does this take to manage?",
        answer:
          "Almost none. LocalBeacon automates Google posts, review responses, and city page creation. After initial setup (about 15 minutes), the platform runs on autopilot. You focus on shooting — we handle the marketing.",
      },
    ],
  },

  "wedding-planners": {
    slug: "wedding-planners",
    name: "Wedding Planning",
    plural: "Wedding Planners",
    headline: "Be found by brides before the Pinterest spiral.",
    subheadline:
      "Engaged couples Google \"wedding planner near me\" long before they ask friends for referrals. LocalBeacon makes sure your business is the one they find, trust, and call first.",
    description:
      "AI-powered local marketing for wedding planners and event coordinators. Automated Google Business Profile posts, city-specific landing pages, review management, and AI search optimization for full-service planning, day-of coordination, and destination weddings.",
    painPoints: [
      {
        icon: "📋",
        title: "Referral networks are slow and unreliable",
        text: "Vendor referrals are great when they come, but you can't build a business on \"maybe.\" LocalBeacon generates a consistent stream of new inquiries from Google so you're never waiting by the phone for a florist to mention your name.",
      },
      {
        icon: "💬",
        title: "Testimonials are everything, but they're buried",
        text: "Glowing reviews from past couples are your most powerful sales tool — but they're scattered across The Knot, WeddingWire, Google, and your website. LocalBeacon keeps your Google reviews active and responded to, where most couples actually search.",
      },
      {
        icon: "🗓️",
        title: "Booking cycles mean feast or famine",
        text: "Engagement season (November-February) floods you with inquiries, then it goes quiet. LocalBeacon promotes your services year-round — destination weddings in winter, micro-weddings in off-months, corporate events to fill gaps.",
      },
    ],
    features: [
      {
        title: "Google posts timed to engagement season",
        text: "\"Now booking 2027 weddings\" posts in January, venue tour tips in spring, day-of coordination promotions in summer — all automated to match when couples are actively searching and booking.",
      },
      {
        title: "City pages for every venue market you serve",
        text: "\"Wedding Planner in Charleston\" and \"Day-of Coordinator in Savannah\" pages that rank you in the wedding markets where you want to book — not just the city where you live.",
      },
      {
        title: "Review responses that showcase your personality",
        text: "Wedding planning is intensely personal. LocalBeacon crafts warm, thoughtful responses to every review that show prospective couples what it's actually like to work with you — before they ever reach out.",
      },
      {
        title: "AI search visibility for wedding questions",
        text: "Couples ask AI assistants everything from \"best wedding planner near me\" to \"do I need a day-of coordinator?\" LocalBeacon optimizes your content to appear in these AI-powered search results.",
      },
    ],
    stats: [
      { value: "3.8×", label: "more consultation requests" },
      { value: "54%", label: "of clients from organic search" },
      { value: "9", label: "avg. venue markets per planner" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help wedding planners book more couples?",
        answer:
          "We keep your Google Business Profile active with weekly posts, build city-specific landing pages for every venue market you serve, and respond to reviews professionally. This puts you in front of engaged couples when they're actively searching — typically 8-12 months before their wedding.",
      },
      {
        question: "I'm on The Knot and WeddingWire — do I still need this?",
        answer:
          "Yes. Those platforms are pay-to-play and you're listed alongside every competitor. LocalBeacon builds your own Google presence so couples find you directly — no competing vendor listings on the same page, and no commissions or advertising fees.",
      },
      {
        question: "Can LocalBeacon promote day-of coordination separately from full planning?",
        answer:
          "Absolutely. We create distinct content for each service you offer — full-service planning, partial planning, day-of coordination, and destination wedding services — each targeted to the right audience.",
      },
      {
        question: "What if I serve multiple cities or destination markets?",
        answer:
          "That's where LocalBeacon shines. Our Solo and Agency plans let you create landing pages for every city and venue market you serve — whether that's three neighboring towns or wedding destinations across the country.",
      },
      {
        question: "How important are Google reviews for wedding planners?",
        answer:
          "Critical. 93% of couples read reviews before contacting a wedding planner. A profile with many recent, responded-to reviews dramatically outperforms one with a handful of old, unacknowledged reviews — both in Google rankings and in client trust.",
      },
    ],
  },

  djs: {
    slug: "djs",
    name: "DJ",
    plural: "DJs",
    headline: "Stop spinning your wheels. Start spinning at events.",
    subheadline:
      "Your mixes pack dance floors — but that doesn't matter if no one can find you online. LocalBeacon builds the local presence that turns Google searches into gig requests.",
    description:
      "AI-powered local marketing for DJs and mobile entertainment companies. Automated Google Business Profile posts, city-specific service pages, review management, and AI search optimization for wedding DJs, corporate event DJs, and party entertainment.",
    painPoints: [
      {
        icon: "🎵",
        title: "\"Just make a Spotify playlist\" is killing your bookings",
        text: "Hosts increasingly think a playlist can replace a live DJ. LocalBeacon creates content that educates potential clients on the value you bring — reading the crowd, seamless transitions, MC skills, sound equipment — things no playlist can do.",
      },
      {
        icon: "📅",
        title: "Weekends are everything and they book months out",
        text: "DJs earn 80% of their income on Friday and Saturday nights, and popular dates book 6-12 months ahead. If you're not visible when event hosts start planning, you'll have empty weekends that can never be recovered.",
      },
      {
        icon: "🎭",
        title: "Your personality is your brand, but Google can't see it",
        text: "What makes you great — energy, crowd reading, showmanship — doesn't translate to a static Google listing. LocalBeacon creates engaging content that conveys your personality and style to potential clients before they ever see you perform.",
      },
    ],
    features: [
      {
        title: "Google posts that keep your dates filling up",
        text: "\"Now booking summer weddings,\" holiday party availability updates, and New Year's Eve promotions — posted to your Google profile at the exact time event hosts are searching and deciding.",
      },
      {
        title: "City pages for every market you cover",
        text: "\"Wedding DJ in Austin\" and \"Corporate Event DJ in Round Rock\" pages that rank you in every city where you want to perform — expanding your reach beyond word-of-mouth alone.",
      },
      {
        title: "Reviews that sell your energy before the audition",
        text: "The best DJ reviews mention packed dance floors, perfect song choices, and incredible energy. LocalBeacon responds to every review, amplifying the excitement and giving future clients a preview of what you deliver.",
      },
      {
        title: "AI search answers about local DJs",
        text: "When someone asks ChatGPT \"best wedding DJ near me\" or tells Siri to find a DJ for their party, your optimized online presence helps you appear in those AI-powered recommendations.",
      },
    ],
    stats: [
      { value: "3.6×", label: "more event inquiries" },
      { value: "78%", label: "weekend dates booked per season" },
      { value: "11", label: "avg. cities ranked per DJ" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help DJs get more gigs?",
        answer:
          "We build your Google presence with weekly posts, create landing pages for every city you serve, and manage your reviews professionally. This puts you in front of event hosts actively searching for a DJ — not waiting for a friend-of-a-friend referral.",
      },
      {
        question: "I do weddings, corporate events, and private parties — can I promote all of them?",
        answer:
          "Yes. LocalBeacon creates separate content for each event type, targeting brides searching for wedding DJs, event planners looking for corporate entertainment, and hosts planning private parties — each with messaging that resonates with that audience.",
      },
      {
        question: "Can LocalBeacon help me compete against Spotify playlists?",
        answer:
          "Absolutely. We create content that educates potential clients on what a professional DJ brings that a playlist can't — crowd reading, seamless mixing, MC services, professional sound equipment, and the ability to adapt in real time.",
      },
      {
        question: "I'm a solo DJ — is this worth it for a one-person business?",
        answer:
          "Especially so. Solo DJs can't afford a marketing team, but you still need a strong online presence. Our Free plan gets you started, and the Solo plan at $49/month is far less than what one additional booking per month would earn you.",
      },
      {
        question: "How do reviews help DJs specifically?",
        answer:
          "DJs are hired based on trust and vibe. Detailed reviews mentioning packed dance floors, great song selection, and professional demeanor do more selling than any website copy. LocalBeacon ensures every review gets a thoughtful response that reinforces those qualities.",
      },
      {
        question: "What about social media — shouldn't I just focus on Instagram and TikTok?",
        answer:
          "Social media shows what you do, but Google is where people go when they're ready to hire. Most event hosts start with a Google search, check reviews, and visit your website before reaching out. LocalBeacon makes sure that search-to-contact journey works in your favor.",
      },
    ],
  },

  florists: {
    slug: "florists",
    name: "Floral",
    plural: "Florists",
    headline: "Bloom where your customers are searching.",
    subheadline:
      "Local florists are losing orders to 1-800-Flowers and online delivery apps every day. LocalBeacon helps you recapture those customers by making your shop the top result for flower searches in your area.",
    description:
      "AI-powered local marketing for florists and flower shops. Automated Google Business Profile posts, city-specific landing pages, review management, and AI search optimization for wedding flowers, sympathy arrangements, daily deliveries, and special occasion bouquets.",
    painPoints: [
      {
        icon: "📦",
        title: "Online delivery giants are stealing your orders",
        text: "1-800-Flowers, FTD, and BloomNation spend millions on ads to capture local searches. When someone Googles \"flower delivery near me,\" these companies often outrank the local shop five blocks away. LocalBeacon fights back with hyperlocal content they can't replicate.",
      },
      {
        icon: "💐",
        title: "Valentine's and Mother's Day can't carry the whole year",
        text: "Two holidays drive a huge percentage of annual revenue, but the rest of the year can be painfully slow. LocalBeacon promotes sympathy arrangements, weekly subscriptions, corporate accounts, and event work to generate consistent year-round orders.",
      },
      {
        icon: "🤳",
        title: "Your arrangements are Instagram-worthy but Google-invisible",
        text: "Your work is gorgeous, but beautiful photos alone don't rank on Google. LocalBeacon creates the text-based content — local service pages, Google posts, and optimized descriptions — that brings Google searchers to your door and your delivery zone.",
      },
    ],
    features: [
      {
        title: "Holiday and occasion posts that capture peak demand",
        text: "Valentine's Day pre-orders, Mother's Day specials, prom corsage availability, and sympathy arrangement reminders — posted to your Google profile days before customers start searching, so you capture orders before the big chains do.",
      },
      {
        title: "City pages that own your delivery zone",
        text: "\"Flower Delivery in Brentwood\" and \"Wedding Florist in Franklin\" pages that rank your shop in every city and neighborhood within your delivery radius — where online giants can't compete with same-day, hand-delivered quality.",
      },
      {
        title: "Reviews that highlight freshness and artistry",
        text: "The best florist reviews rave about fresh flowers, stunning arrangements, and reliable delivery. LocalBeacon responds to every review, reinforcing the quality and personal touch that set you apart from order-a-box-online competitors.",
      },
      {
        title: "Win when AI recommends local florists",
        text: "When someone asks their AI assistant \"best florist near me\" or \"same-day flower delivery,\" your optimized local presence positions your shop as the go-to recommendation over faceless national brands.",
      },
    ],
    stats: [
      { value: "52%", label: "more same-day delivery orders" },
      { value: "2.9×", label: "increase in wedding consultations" },
      { value: "8", label: "avg. delivery zone cities ranked" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help local florists compete with online delivery services?",
        answer:
          "We create hyperlocal content that national chains can't replicate — city-specific landing pages, neighborhood-targeted Google posts, and a strong local review profile. When someone searches for flowers in your area, we help you outrank the 1-800 numbers.",
      },
      {
        question: "Can LocalBeacon promote wedding floral services?",
        answer:
          "Yes. Wedding florals are often a florist's highest-margin service. We create dedicated content targeting engaged couples searching for wedding florists in your area, with city-specific pages for popular venue locations.",
      },
      {
        question: "What about sympathy and funeral arrangements?",
        answer:
          "Sympathy arrangements are searched for urgently and locally — exactly the kind of search LocalBeacon excels at capturing. We create content that positions your shop as the compassionate, reliable choice for same-day sympathy deliveries.",
      },
      {
        question: "I do most of my marketing on Instagram — why do I need Google?",
        answer:
          "Instagram followers already know you. Google captures new customers who don't know you yet but are actively searching for a florist right now. These are high-intent buyers ready to place an order — the most valuable leads for any flower shop.",
      },
      {
        question: "How do you handle seasonal content for florists?",
        answer:
          "LocalBeacon follows the floral calendar: Valentine's Day, Mother's Day, prom, wedding season, Thanksgiving centerpieces, and holiday arrangements. Content is created and posted in advance of each season to capture early shoppers.",
      },
      {
        question: "Can I promote flower subscriptions and corporate accounts?",
        answer:
          "Absolutely. Recurring revenue from weekly subscriptions and corporate lobby arrangements is the key to smoothing out seasonal peaks. LocalBeacon creates content specifically targeting businesses and individuals interested in regular flower deliveries.",
      },
      {
        question: "What's the cost for a small flower shop?",
        answer:
          "LocalBeacon starts free for one location with 5 posts per month. The Solo plan at $49/month adds unlimited posts and up to 3 delivery zone areas. Most flower shops find that one or two additional orders per month more than covers the cost.",
      },
    ],
  },
}
