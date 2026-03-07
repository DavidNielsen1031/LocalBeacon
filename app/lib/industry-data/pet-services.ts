import type { IndustryData } from './types'

export const petServices: Record<string, IndustryData> = {
  'pet-grooming': {
    slug: 'pet-grooming',
    name: 'Pet Grooming',
    plural: 'Pet Groomers',
    headline: 'Keep the grooming table full, not just fluffy.',
    subheadline:
      'LocalBeacon keeps your grooming salon visible on Google and AI search — so pet parents find you for regular appointments, not just when Fido is matted beyond recognition.',
    description:
      'AI-powered local marketing for pet grooming salons and mobile groomers. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for pet grooming businesses.',
    painPoints: [
      {
        icon: '🐾',
        title: 'New clients try you once and vanish',
        text: 'Pet grooming should be recurring — every 4-8 weeks. But without consistent visibility, clients forget to rebook. LocalBeacon keeps your profile active with grooming tips and seasonal reminders that nudge pet parents back to your calendar.',
      },
      {
        icon: '🚐',
        title: 'Mobile groomers are taking your neighborhood clients',
        text: 'Mobile grooming vans offer convenience right at the doorstep. If you are a salon, LocalBeacon highlights your advantages — full equipment, bathing facilities, and lower prices. If you are mobile, LocalBeacon makes sure you own your service area on Google.',
      },
      {
        icon: '🐕',
        title: 'Breed-specific expertise is your edge, but invisible online',
        text: 'You know the difference between a Bichon puppy cut and a Schnauzer strip. Google does not. LocalBeacon creates content around breed-specific grooming that attracts the exact pet parents who value skilled, knowledgeable groomers.',
      },
    ],
    features: [
      {
        title: 'Google posts that keep appointments recurring',
        text: 'Seasonal grooming tips, breed-specific coat care, holiday grooming packages, and shedding season reminders — posted automatically to keep your profile active and clients thinking about their next appointment.',
      },
      {
        title: 'Service pages for every neighborhood you groom',
        text: '"Dog Grooming in Alpharetta" and "Cat Grooming in Roswell" pages that rank you in surrounding cities — because pet parents prefer a groomer within a short drive.',
      },
      {
        title: 'AI search optimization for pet grooming',
        text: 'When someone asks ChatGPT "best dog groomer near me for a Goldendoodle" or asks Google AI for grooming recommendations, your structured data, breed expertise, and reviews help you get recommended.',
      },
      {
        title: 'Review responses that pet parents love',
        text: 'Warm, personal replies that mention the pet by name (from the review) and reflect the care you put into every grooming session. Prospective clients see a groomer who truly loves animals.',
      },
    ],
    stats: [
      { value: '2.8×', label: 'more new appointment bookings' },
      { value: '6-week', label: 'avg rebooking cycle achieved' },
      { value: '4.9★', label: 'avg maintained Google rating' },
    ],
    faqs: [
      {
        question: 'How does LocalBeacon help pet groomers get more appointments?',
        answer:
          'LocalBeacon increases your visibility on Google through weekly posts, city-specific pages, and active review management. When pet parents search "dog groomer near me," you appear with strong reviews and fresh content. Most groomers see a measurable increase in new bookings within 45 days.',
      },
      {
        question: 'Can this help me build recurring clients, not just one-time visits?',
        answer:
          'Yes. LocalBeacon posts seasonal grooming reminders, coat care tips, and rebooking nudges to your Google profile. When a pet parent sees your post about spring shedding season, they remember it is time to book. Consistent visibility drives recurring appointments.',
      },
      {
        question: 'Does this work for mobile grooming businesses?',
        answer:
          'Absolutely. Mobile groomers benefit even more from local page optimization. LocalBeacon creates pages for every neighborhood in your service area — "Mobile Dog Grooming in [Neighborhood]" — so you rank everywhere your van travels.',
      },
      {
        question: 'What kind of content does LocalBeacon create for pet groomers?',
        answer:
          'Breed-specific grooming tips, seasonal coat care guides, holiday grooming specials, before-and-after styling highlights, and pet safety content. All designed to showcase your expertise and keep pet parents engaged.',
      },
      {
        question: 'How does AI search matter for pet grooming?',
        answer:
          'More pet parents are asking AI assistants for recommendations — "best groomer for my Poodle near me" or "cat groomer that handles anxious cats." LocalBeacon structures your data so AI systems can recommend you based on your specific services, breed expertise, and review strength.',
      },
      {
        question: 'I mostly get clients from word of mouth. Do I need this?',
        answer:
          'Word of mouth is powerful but plateaus. LocalBeacon adds a digital channel that works 24/7 — even when your happy clients are not actively recommending you. Think of it as word of mouth that never sleeps.',
      },
    ],
  },

  'dog-walking': {
    slug: 'dog-walking',
    name: 'Dog Walking',
    plural: 'Dog Walkers',
    headline: 'Walk more dogs. Chase fewer leads.',
    subheadline:
      'LocalBeacon makes you the trusted neighborhood dog walker on Google and AI search — so pet parents choose you over Rover, Wag, and random Craigslist posts.',
    description:
      'AI-powered local marketing for dog walkers and pet sitting services. Automated Google Business Profile posts, neighborhood-specific service pages, review responses, and AI search optimization built for dog walking businesses.',
    painPoints: [
      {
        icon: '📲',
        title: 'Rover and Wag take 20-40% of your earnings',
        text: 'App platforms connect you with clients but keep a massive cut. A $25 walk becomes $15 in your pocket. LocalBeacon builds your own Google presence so clients find and book you directly — you keep every dollar.',
      },
      {
        icon: '🏘️',
        title: 'Trust is everything when someone hands over their house keys',
        text: 'Dog walking is an intimate service — you enter someone\'s home. Pet parents need to trust you completely. A strong Google profile with consistent reviews and professional responses builds that trust before you ever meet.',
      },
      {
        icon: '📍',
        title: 'Your business is hyperlocal but your reach is limited',
        text: 'You walk dogs in a specific set of neighborhoods. LocalBeacon makes sure you own those neighborhoods on Google — so every pet parent in your zone finds you first, not a faceless app.',
      },
    ],
    features: [
      {
        title: 'Google posts that build trust and visibility',
        text: 'Pet safety tips, seasonal dog care advice, walking route highlights, and availability updates — posted weekly to keep your profile active and demonstrate your dedication to pet care.',
      },
      {
        title: 'Neighborhood pages that own your service area',
        text: '"Dog Walker in Lincoln Park" and "Pet Sitter in Lakeview" pages that rank you in every neighborhood you serve — because dog walking is a neighborhood business.',
      },
      {
        title: 'AI search optimization for dog walking',
        text: 'When someone asks Siri "dog walker near me" or asks ChatGPT for a trusted pet sitter, your structured data, strong reviews, and local content help you appear in recommendations.',
      },
      {
        title: 'Review responses that make clients feel valued',
        text: 'Personal, heartfelt replies to every review — mentioning the dog by name when possible. Prospective clients see someone who genuinely loves their job and the dogs they care for.',
      },
    ],
    stats: [
      { value: '100%', label: 'of earnings kept (no app fees)' },
      { value: '3.4×', label: 'more direct booking requests' },
      { value: '92%', label: 'client retention rate' },
    ],
    faqs: [
      {
        question: 'How does LocalBeacon help dog walkers get clients without Rover or Wag?',
        answer:
          'LocalBeacon builds your own Google presence — profile optimization, local pages, and review management — so pet parents find you directly. No 20-40% platform fee. Clients book with you, pay you, and build a relationship with you, not an app.',
      },
      {
        question: 'Can LocalBeacon help me expand to new neighborhoods?',
        answer:
          'Yes. As you take on new areas, LocalBeacon creates optimized pages for each neighborhood. "Dog Walker in [Neighborhood]" pages rank for local searches and attract clients in your expanding service area.',
      },
      {
        question: 'What kind of content does LocalBeacon create for dog walkers?',
        answer:
          'Seasonal pet safety tips, dog exercise advice, neighborhood walking route highlights, weather-related dog care (hot pavement warnings, cold weather precautions), and availability updates. All content builds trust and demonstrates your expertise.',
      },
      {
        question: 'Is this worth it when I am just starting out?',
        answer:
          'Especially when starting out. New dog walkers struggle to get their first reviews and visibility. LocalBeacon accelerates that process — fresh content and active profile management signal to Google (and pet parents) that you are professional and established.',
      },
      {
        question: 'How does this help with trust and safety concerns?',
        answer:
          'A strong Google profile with consistent reviews, professional responses, and active posting signals legitimacy. Pet parents are far more likely to hand over their house keys to a walker with a well-managed online presence than someone with no digital footprint.',
      },
      {
        question: 'Do I need a business website for this to work?',
        answer:
          'No. LocalBeacon optimizes your Google Business Profile and creates local landing pages — many dog walkers operate entirely through Google and direct bookings without a separate website. Your Google profile becomes your digital storefront.',
      },
      {
        question: 'How fast will I get new clients?',
        answer:
          'Google profile engagement typically increases within 1-2 weeks. Most dog walkers see new booking requests within 30-45 days, especially in underserved neighborhoods where competition is low.',
      },
    ],
  },

  'pet-boarding': {
    slug: 'pet-boarding',
    name: 'Pet Boarding',
    plural: 'Pet Boarding Facilities',
    headline: 'Full kennels, happy owners, zero worry.',
    subheadline:
      'LocalBeacon keeps your boarding facility visible on Google and AI search — so anxious pet parents choose your facility over impersonal apps when vacation season arrives.',
    description:
      'AI-powered local marketing for pet boarding facilities, kennels, and doggy daycares. Automated Google Business Profile posts, city-specific landing pages, review responses, and AI search optimization built for pet boarding businesses.',
    painPoints: [
      {
        icon: '🎄',
        title: 'Holiday surges and empty-kennel droughts',
        text: 'Thanksgiving, Christmas, and summer vacations pack your facility. January and February? Half-empty. LocalBeacon promotes daycare, training packages, and off-peak discounts to smooth out the revenue rollercoaster.',
      },
      {
        icon: '😰',
        title: 'Pet parents are anxious — and they research obsessively',
        text: 'Leaving a pet feels like leaving a child. Parents read every review, check every photo, and compare every option. LocalBeacon builds the review profile, active content, and transparency signals that turn anxious researchers into confident bookers.',
      },
      {
        icon: '📱',
        title: 'Pet-sitting apps like Rover are stealing overnight stays',
        text: 'Rover offers home pet-sitting that feels more personal. LocalBeacon highlights what facilities offer that sitters cannot — supervised playgroups, veterinary staff on-call, webcam access, and climate-controlled spaces.',
      },
    ],
    features: [
      {
        title: 'Google posts that keep kennels full year-round',
        text: 'Holiday booking reminders, daycare program spotlights, facility tour invitations, and seasonal pet care tips — posted automatically to drive reservations and fill off-peak gaps.',
      },
      {
        title: 'City pages for your boarding catchment area',
        text: '"Dog Boarding in Plano" and "Pet Daycare in Allen" pages that rank in every surrounding city — because pet parents will drive 20 minutes for a facility they trust.',
      },
      {
        title: 'AI search optimization for pet boarding',
        text: 'When someone asks ChatGPT "best dog boarding near me with webcams" or asks Google AI for boarding recommendations, your facility details, amenities, and reviews help you get recommended.',
      },
      {
        title: 'Review responses that ease pet parent anxiety',
        text: 'Caring, detailed responses to every review that highlight safety, staff attentiveness, and the fun pets have at your facility. The reassurance anxious pet parents need to book with confidence.',
      },
    ],
    stats: [
      { value: '42%', label: 'less off-peak vacancy' },
      { value: '3.2×', label: 'more direct reservation requests' },
      { value: '4.8★', label: 'avg maintained Google rating' },
    ],
    faqs: [
      {
        question: 'How does LocalBeacon help boarding facilities fill off-peak vacancies?',
        answer:
          'LocalBeacon promotes daycare packages, training add-ons, and off-peak specials through weekly Google posts. When pet parents see your active profile with fresh content about playgroups, enrichment activities, and availability, they think of you for weekday daycare — not just holiday boarding.',
      },
      {
        question: 'Can LocalBeacon help anxious pet parents feel comfortable booking?',
        answer:
          'Yes. Consistent Google posts about your facility, safety protocols, and staff create transparency. Active review responses that address concerns and highlight positive experiences reassure anxious pet parents that their fur baby is in good hands.',
      },
      {
        question: 'How does this help us compete with Rover and pet-sitting apps?',
        answer:
          'LocalBeacon highlights the advantages home sitters cannot match — supervised socialization, veterinary partnerships, climate-controlled environments, webcam access, and trained staff. Your Google content tells the story of professional, safe pet care.',
      },
      {
        question: 'What kind of content does LocalBeacon create for boarding facilities?',
        answer:
          'Holiday booking deadline reminders, daycare program highlights, facility upgrade announcements, pet safety tips, enrichment activity spotlights, and seasonal content (summer pool play, winter indoor activities). All designed to showcase your facility and fill reservations.',
      },
      {
        question: 'Does this work for facilities that also offer grooming or training?',
        answer:
          'Absolutely. LocalBeacon promotes all your services — boarding, daycare, grooming, and training — through targeted content and local pages. Cross-promoting services to existing boarding clients drives additional revenue.',
      },
      {
        question: 'How quickly will I see more reservations?',
        answer:
          'Google profile engagement typically increases within 2 weeks. Most boarding facilities see a measurable uptick in reservation requests and facility tour bookings within 45-60 days.',
      },
      {
        question: 'Can this help us book holiday stays earlier?',
        answer:
          'Yes. LocalBeacon posts holiday booking reminders weeks in advance — "Thanksgiving boarding is filling up" and "Book your Christmas stay now" posts that drive early reservations and reduce last-minute scrambles.',
      },
    ],
  },
}
