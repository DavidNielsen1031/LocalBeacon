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
      "Local marketing automation for photographers. Automated Google Business Profile posts, city-specific service pages, review management, and AI search optimization for wedding, portrait, family, and commercial photography.",
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
        text: "Couples and families increasingly ask ChatGPT and AI assistants for photographer recommendations. LocalBeacon optimizes your online presence so you're included in those automated lists.",
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
      "Local marketing automation for wedding planners and event coordinators. Automated Google Business Profile posts, city-specific landing pages, review management, and AI search optimization for full-service planning, day-of coordination, and destination weddings.",
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
        text: "Couples ask AI assistants everything from \"best wedding planner near me\" to \"do I need a day-of coordinator?\" LocalBeacon optimizes your content to appear in these AI search results.",
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
          "That's where LocalBeacon shines. Our Autopilot plan lets you create landing pages for every city and venue market you serve — whether that's three neighboring towns or wedding destinations across the country.",
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
      "Local marketing automation for DJs and mobile entertainment companies. Automated Google Business Profile posts, city-specific service pages, review management, and AI search optimization for wedding DJs, corporate event DJs, and party entertainment.",
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
        text: "When someone asks ChatGPT \"best wedding DJ near me\" or tells Siri to find a DJ for their party, your optimized online presence helps you appear in those automated recommendations.",
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
          "Especially so. Solo DJs can't afford a marketing team, but you still need a strong online presence. Our Free plan gets you started, and the Autopilot plan at $99/month is far less than what one additional booking per month would earn you.",
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
      "Local marketing automation for florists and flower shops. Automated Google Business Profile posts, city-specific landing pages, review management, and AI search optimization for wedding flowers, sympathy arrangements, daily deliveries, and special occasion bouquets.",
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
          "LocalBeacon starts free for one location with 5 posts per month. The Autopilot plan at $99/month adds unlimited posts and up to 3 delivery zone areas. Most flower shops find that one or two additional orders per month more than covers the cost.",
      },
    ],
  },

  'wedding-photographers': {
    slug: 'wedding-photographers',
    name: 'Wedding Photography',
    plural: 'Wedding Photographers',
    headline: 'Couples search. Your portfolio converts.',
    subheadline: 'Engaged couples research wedding photographers for months. LocalBeacon makes your portfolio the one they find first and book.',
    description: 'Local SEO for wedding photographers. Rank for wedding photographer near me, engagement photos, and bridal photography in your area.',
    painPoints: [
      { icon: '📸', title: 'Couples research 5-10 photographers before booking', text: 'Wedding photography is a once-in-a-lifetime decision. Couples compare extensively — and photographers with better online presence win the comparison every time.' },
      { icon: '💍', title: 'The Knot and WeddingWire capture most searches', text: 'Wedding directories dominate photographer searches. Without your own strong SEO, you depend on platforms that charge listing fees and commoditize your work.' },
      { icon: '📅', title: 'Wedding season creates booking pressure', text: 'Peak wedding season fills up fast. Without year-round visibility capturing couples in the planning phase, you miss early bookers who lock in photographers 12-18 months out.' },
    ],
    features: [
      { title: 'Portfolio-driven landing pages', text: 'Pages showcasing your wedding work by style — editorial, documentary, romantic, candid — targeting the aesthetic searches couples make.' },
      { title: 'Venue-specific content', text: 'Pages for popular wedding venues you have shot at — capturing couples who search for photographers experienced at their specific venue.' },
      { title: 'Engagement session marketing', text: 'Content promoting engagement shoots as the entry point to wedding bookings — your most effective lead generation tool.' },
      { title: 'Wedding planning timeline content', text: 'Posts about when to book a photographer, what to look for, and consultation tips — capturing couples in the early research phase.' },
    ],
    stats: [
      { value: '$3K-$6K', label: 'avg wedding package value' },
      { value: '2.7x', label: 'more inquiries from couples' },
      { value: '12-18 mo', label: 'typical advance booking window' },
    ],
    faqs: [
      { question: 'How does LocalBeacon help wedding photographers get more bookings?', answer: 'We create portfolio pages and venue-specific content that appears when engaged couples search — capturing them during the research phase when they are comparing photographers.' },
      { question: 'Can LocalBeacon help me depend less on The Knot and WeddingWire?', answer: 'Yes. Building your own search visibility means couples find you directly — no listing fees, no competing with 50 other photographers on the same page.' },
      { question: 'How do venue-specific pages help?', answer: 'Couples searching for photographers at their specific venue are high-intent leads. Pages showcasing your work at popular venues capture these ready-to-book clients.' },
      { question: 'Will engagement session content drive wedding bookings?', answer: 'Absolutely. Engagement sessions are your best lead generation tool — couples who love their engagement photos almost always book you for the wedding.' },
      { question: 'How far in advance do couples book wedding photographers?', answer: 'Typically 12-18 months. LocalBeacon ensures your content is visible throughout this extended planning period — not just during ad campaigns.' },
    ],
  },

  'real-estate-photographers': {
    slug: 'real-estate-photographers',
    name: 'Real Estate Photography',
    plural: 'Real Estate Photographers',
    headline: 'Listings sell faster with you. Get found.',
    subheadline: 'Agents and homeowners need professional real estate photos. LocalBeacon makes your photography service the first call when a listing goes live.',
    description: 'Local SEO for real estate photographers. Rank for real estate photography, listing photos, and property photography near me.',
    painPoints: [
      { icon: '🏠', title: 'Agents have one photographer they always call', text: 'Real estate photography is relationship-driven. If agents do not know you exist, they keep calling their current photographer. Without search visibility, you never get the chance to compete.' },
      { icon: '📱', title: 'iPhone photos are replacing professional photography', text: 'Many agents think phone photos are "good enough." Without content demonstrating the listing performance difference of professional photos, you lose to DIY photography.' },
      { icon: '💰', title: 'Low barriers to entry create price pressure', text: 'Everyone with a camera offers real estate photography. Without content positioning your professional editing, turnaround time, and consistency, you compete on price alone.' },
    ],
    features: [
      { title: 'Service-specific landing pages', text: 'Pages for listing photography, aerial/drone photography, virtual tours, twilight shoots, and video walkthroughs — each targeting specific agent needs.' },
      { title: 'Agent-focused content', text: 'Posts about how professional photos increase listing views, reduce days on market, and drive higher sale prices — the ROI story agents need to hear.' },
      { title: 'Turnaround and reliability content', text: 'Content highlighting your 24-48 hour turnaround, consistent quality, and scheduling flexibility — the operational factors agents value most.' },
      { title: 'Portfolio showcase optimization', text: 'Before/after staging comparisons and dramatic property showcases that demonstrate the value of professional real estate photography.' },
    ],
    stats: [
      { value: '32%', label: 'more online views with pro photos' },
      { value: '$200-$400', label: 'avg listing photo package' },
      { value: '2.8x', label: 'more agent inquiries' },
    ],
    faqs: [
      { question: 'How does LocalBeacon help real estate photographers get clients?', answer: 'We create service-specific pages and agent-focused content that appears when agents search for listing photographers — or when homeowners selling FSBO need professional photos.' },
      { question: 'Can LocalBeacon help me break into the real estate market?', answer: 'Yes. Strong search visibility introduces you to agents who need a new photographer. One successful listing shoot often leads to ongoing work as their go-to photographer.' },
      { question: 'How do I convince agents to use professional photos?', answer: 'Content about listing performance data — more views, faster sales, higher prices — gives agents the ROI justification they need to invest in professional photography.' },
      { question: 'Will drone photography content attract more clients?', answer: 'Absolutely. Aerial/drone photography pages target the growing demand for elevated property views — a premium service that differentiates you from phone-photo competitors.' },
      { question: 'How quickly will real estate photography pages generate leads?', answer: 'Real estate photography is urgency-driven — agents need a photographer this week. Most photographers see new agent inquiries within 2-4 weeks as pages index.' },
    ],
  },

  'wedding-djs': {
    slug: 'wedding-djs',
    name: 'Wedding DJ',
    plural: 'Wedding DJs',
    headline: 'They want the party. Help them find you.',
    subheadline: 'Couples planning receptions search for DJs who understand weddings. LocalBeacon makes your entertainment service the obvious choice.',
    description: 'Local SEO for wedding DJs and wedding entertainment. Rank for wedding DJ near me, reception DJ, and wedding music services.',
    painPoints: [
      { icon: '🎵', title: 'Couples fear hiring the wrong DJ more than any other vendor', text: 'A bad DJ ruins the reception. Couples research extensively, watch videos, and read every review before booking. Without strong content and reviews, you lose to DJs with better online presence.' },
      { icon: '🎤', title: 'Budget DJs and Spotify playlists are your competition', text: 'Some couples think a laptop and Spotify is "good enough." Without content showing the difference a professional DJ makes, you lose bookings to DIY and discount alternatives.' },
      { icon: '📆', title: 'Saturday dates book 12+ months in advance', text: 'Popular wedding dates sell out fast. Without early visibility capturing engaged couples at the start of planning, your Saturdays go to competitors who market earlier.' },
    ],
    features: [
      { title: 'Wedding entertainment landing pages', text: 'Pages for reception DJs, ceremony music, MC services, uplighting, and photo booths — targeting the specific entertainment searches couples make.' },
      { title: 'Venue-specific experience content', text: 'Content mentioning venues you have worked at — capturing couples searching for DJs experienced at their specific reception venue.' },
      { title: 'Wedding planning content', text: 'Posts about music timeline planning, first dance song selection, and reception flow tips that position you as the wedding entertainment expert.' },
      { title: 'Video and audio showcase content', text: 'Content directing couples to your reception videos and mixed samples — the proof points that convert research into bookings.' },
    ],
    stats: [
      { value: '$1,200-$2,500', label: 'avg wedding DJ package' },
      { value: '2.5x', label: 'more consultation bookings' },
      { value: '93%', label: 'say DJ is the most important vendor' },
    ],
    faqs: [
      { question: 'How does LocalBeacon help wedding DJs get more bookings?', answer: 'We create wedding-specific content and venue pages that appear when couples search for reception DJs — driving consultations from couples in the active booking phase.' },
      { question: 'Can LocalBeacon help me compete with budget DJs?', answer: 'Yes. Content explaining the difference between professional DJs and budget operators — equipment, experience, MC skills, reading the crowd — helps couples understand the value.' },
      { question: 'How do venue pages help wedding DJs?', answer: 'Couples searching for "DJ at [venue name]" are ready to book. Pages mentioning venues you have worked at capture these high-intent, venue-specific searches.' },
      { question: 'Will planning content drive DJ bookings?', answer: 'Absolutely. Reception timeline, music selection, and flow planning content positions you as the expert who cares about their wedding — not just someone who plays music.' },
      { question: 'How far in advance should wedding DJs start marketing?', answer: 'Couples book DJs 8-14 months out. LocalBeacon keeps you visible year-round, capturing engaged couples throughout their planning journey.' },
    ],
  },

  'event-florists': {
    slug: 'event-florists',
    name: 'Event Floristry',
    plural: 'Event Florists',
    headline: 'Every event needs flowers. Be the florist.',
    subheadline: 'Corporate events, galas, and large celebrations need professional floral design. LocalBeacon makes your event floristry service discoverable.',
    description: 'Local SEO for event florists and large-scale floral design. Rank for event florist, corporate flowers, and gala floral arrangements.',
    painPoints: [
      { icon: '🌸', title: 'Event planners have established florist relationships', text: 'Breaking into the event market means competing with florists who already have planner relationships. Without strong search presence, planners never discover your capabilities.' },
      { icon: '💐', title: 'Wedding florists dominate floral searches', text: 'Most floral SEO targets weddings. Corporate events, galas, and large-scale installations need different content — without it, event planners searching for commercial floristry find wedding florists instead.' },
      { icon: '📊', title: 'High-value event contracts require portfolio proof', text: 'A $5K-$20K floral installation contract requires proof of capability. Without showcase content demonstrating your large-scale work, event planners cannot justify hiring you.' },
    ],
    features: [
      { title: 'Event type landing pages', text: 'Pages for corporate events, galas, fundraisers, conference florals, and hotel installations — targeting commercial floral searches separate from wedding content.' },
      { title: 'Large-scale installation showcase', text: 'Portfolio content featuring your largest and most impressive installations — the proof event planners need to trust you with high-budget projects.' },
      { title: 'Corporate client content', text: 'Posts about weekly office arrangements, lobby displays, and recurring corporate floral programs — targeting the steady recurring revenue stream.' },
      { title: 'Seasonal event content', text: 'Holiday party, corporate gala, and seasonal event floristry content timed to when event planners are booking vendors.' },
    ],
    stats: [
      { value: '$3K-$15K', label: 'avg event floral contract' },
      { value: '2.3x', label: 'more event inquiries' },
      { value: '78%', label: 'of planners search for new florists online' },
    ],
    faqs: [
      { question: 'How does LocalBeacon help event florists get commercial work?', answer: 'We create event-type specific pages — corporate, galas, conferences — that appear when event planners search for commercial florists, separate from wedding-focused results.' },
      { question: 'Can LocalBeacon help me break into the corporate floral market?', answer: 'Yes. Content targeting weekly office arrangements, lobby displays, and corporate event floristry captures the recurring revenue clients that stabilize your business.' },
      { question: 'How do installation showcases drive bookings?', answer: 'Event planners need visual proof of large-scale capability. Portfolio pages featuring your biggest installations demonstrate that you can handle their event budget and scope.' },
      { question: 'Will seasonal content help my event floristry business?', answer: 'Absolutely. Content published before holiday party season and gala season captures planners when they are actively booking florists — timing is critical.' },
      { question: 'How does event floristry SEO differ from wedding floristry?', answer: 'Event planners search for "corporate florist," "event flowers," and venue-specific terms — different from couples searching for "wedding florist." Separate content captures both markets.' },
    ],
  },
}
