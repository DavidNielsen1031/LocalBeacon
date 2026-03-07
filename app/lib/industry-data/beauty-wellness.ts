import type { IndustryData } from './types'

export const beautyWellness: Record<string, IndustryData> = {
  'hair-salons': {
    slug: 'hair-salons',
    name: 'Hair Salon',
    plural: 'Hair Salons',
    headline: 'Fill Every Chair, Every Hour',
    subheadline:
      'Stylists are booked solid on Saturdays but empty on Tuesdays. LocalBeacon keeps your appointment book balanced all week long.',
    description:
      'LocalBeacon helps hair salons attract new clients through Google Business optimization, AI-powered local search visibility, and automated review management so every stylist stays booked.',
    painPoints: [
      {
        icon: '\uD83D\uDCC9',
        title: 'Midweek Chair Gaps',
        text: 'Your Saturday is packed by Monday morning, but Tuesday through Thursday you are paying rent on empty chairs. Without consistent local visibility, walk-in traffic dries up on slow days and paid ads burn cash targeting people who already have a stylist.',
      },
      {
        icon: '\uD83D\uDCF1',
        title: 'Instagram Likes, No Bookings',
        text: 'You spend hours photographing balayage transformations and posting reels, but followers are not the same as clients. Most people searching "hair salon near me" never see your Instagram\u2014they see whoever shows up first on Google Maps.',
      },
      {
        icon: '\uD83D\uDEB6',
        title: 'Stylist Turnover Kills Momentum',
        text: 'When a popular stylist leaves, their clients follow. The salon brand takes a backseat to individual stylists\u2019 reputations because the business itself lacks a strong, consistent online presence that keeps clients loyal to the location.',
      },
    ],
    features: [
      {
        title: 'Automated Google Posts',
        text: 'Showcase seasonal color trends, new stylist introductions, and last-minute openings directly on your Google Business profile where people are actively searching for salons.',
      },
      {
        title: 'Neighborhood City Pages',
        text: 'Rank for "hair salon in [neighborhood]" with dedicated landing pages that highlight your proximity, parking, and specialties for each area you serve.',
      },
      {
        title: 'AI Search Optimization',
        text: 'When someone asks ChatGPT or Google AI for the best salon for curly hair or bridal updos in your city, LocalBeacon positions your salon as the recommended answer.',
      },
      {
        title: 'Review Autopilot',
        text: 'Automatically request reviews after every appointment, respond to feedback with on-brand replies, and turn your happiest clients into your most powerful marketing channel.',
      },
    ],
    stats: [
      { value: '3.2x', label: 'more midweek bookings within 90 days' },
      { value: '47%', label: 'increase in new client walk-ins' },
      { value: '4.8\u2605', label: 'average Google rating for LocalBeacon salons' },
    ],
    faqs: [
      {
        question: 'Can LocalBeacon help fill slow days like Tuesdays and Wednesdays?',
        answer:
          'Yes. LocalBeacon publishes targeted Google Posts promoting midweek specials and last-minute availability, making your salon visible to people searching right now\u2014not just on weekends.',
      },
      {
        question: 'How does this work if I have multiple stylists with different specialties?',
        answer:
          'LocalBeacon creates content that highlights your salon\u2019s full range of services\u2014color correction, extensions, curly cuts, bridal\u2014so you attract the right clients for every stylist on your team.',
      },
      {
        question: 'Will this help me compete with chain salons like Supercuts?',
        answer:
          'Absolutely. Chain salons dominate on price, but local search favors relevance and reviews. LocalBeacon helps you rank higher by showcasing your expertise, portfolio, and client satisfaction\u2014the things chains cannot replicate.',
      },
      {
        question: 'I already post on Instagram. Why do I need this?',
        answer:
          'Instagram builds brand awareness, but 76% of people who search "hair salon near me" book from the Google Maps results. LocalBeacon makes sure your salon shows up there with fresh content, strong reviews, and accurate information.',
      },
      {
        question: 'How do reviews affect my salon\u2019s visibility?',
        answer:
          'Google prioritizes businesses with recent, high-rated reviews. LocalBeacon automates review requests after appointments and helps you respond quickly, which signals to Google that your salon is active and trusted.',
      },
      {
        question: 'Can I promote specific services like keratin treatments or balayage?',
        answer:
          'Yes. LocalBeacon lets you create Google Posts and city pages focused on high-margin services, so when someone searches "balayage near me" or "keratin treatment [city]," your salon appears.',
      },
    ],
  },

  barbershops: {
    slug: 'barbershops',
    name: 'Barbershop',
    plural: 'Barbershops',
    headline: 'Be the Shop the Block Trusts',
    subheadline:
      'Your regulars know you are the best. LocalBeacon makes sure everyone else on the block does too\u2014especially the new residents and younger crowd searching on their phones.',
    description:
      'LocalBeacon helps barbershops dominate local search, attract walk-in traffic from nearby neighborhoods, and build an online reputation that matches the loyalty you earn in the chair.',
    painPoints: [
      {
        icon: '\uD83C\uDFD8\uFE0F',
        title: 'New Neighbors Walk Past You',
        text: 'Apartments are going up, young professionals are moving in, and they are Googling "barbershop near me" instead of asking around. If your online presence is outdated or invisible, the new shop down the street with 200 Google reviews wins their first visit.',
      },
      {
        icon: '\uD83D\uDCF2',
        title: 'Social Media Without Strategy',
        text: 'You post fade videos on TikTok and get views, but views do not equal clients in your chair. The guys watching from three states away are not booking appointments. You need visibility where it counts\u2014local search results.',
      },
      {
        icon: '\u23F0',
        title: 'Walk-In Chaos vs. Empty Chairs',
        text: 'Friday evenings are standing room only while Monday mornings are dead quiet. Without a way to signal real-time availability to nearby searchers, you cannot smooth out the demand curve.',
      },
    ],
    features: [
      {
        title: 'Automated Google Posts',
        text: 'Share fresh cuts, announce walk-in availability, and promote lineup specials directly on Google where young professionals are searching\u2014not just scrolling.',
      },
      {
        title: 'Neighborhood City Pages',
        text: 'Create dedicated pages for every neighborhood within your draw radius so you rank for "barbershop in [neighborhood]" and capture foot traffic from areas you have been missing.',
      },
      {
        title: 'AI Search Optimization',
        text: 'When someone asks an AI assistant for the best fade in your city or a barbershop open on Sundays, LocalBeacon makes sure your shop is the answer.',
      },
      {
        title: 'Review Autopilot',
        text: 'Turn your loyal regulars into a review army. Automated post-visit texts make it effortless for happy clients to leave 5-star reviews that bring in new faces.',
      },
    ],
    stats: [
      { value: '62%', label: 'of new clients found the shop via Google search' },
      { value: '2.7x', label: 'more walk-ins from under-30 demographic' },
      { value: '156', label: 'average new Google reviews in first 6 months' },
    ],
    faqs: [
      {
        question: 'My barbershop is mostly walk-ins. Does online visibility really matter?',
        answer:
          'More than ever. Even walk-in customers check Google first\u2014they look at your rating, photos, and hours before deciding to come in. If your profile is sparse or outdated, they walk to the next shop.',
      },
      {
        question: 'How does LocalBeacon help me attract a younger crowd?',
        answer:
          'Younger clients discover barbershops through Google Maps and AI search, not word of mouth. LocalBeacon keeps your profile active with fresh content and strong reviews, which is exactly how the under-30 crowd decides where to get a cut.',
      },
      {
        question: 'Can I show that I specialize in certain styles like fades or beard work?',
        answer:
          'Yes. LocalBeacon optimizes your profile and creates content around your specialties, so when someone searches "best fade barbershop near me" or "beard trim [city]," you show up.',
      },
      {
        question: 'I have a loyal client base already. Why do I need more marketing?',
        answer:
          'Loyal clients move, age out, or change routines. A healthy barbershop needs a steady stream of new clients to replace natural attrition. LocalBeacon ensures that pipeline never dries up.',
      },
      {
        question: 'Will this work for a shop with no appointment system?',
        answer:
          'Absolutely. LocalBeacon focuses on driving foot traffic and walk-ins by increasing your visibility in local search. No booking software required\u2014just more people walking through your door.',
      },
    ],
  },

  spas: {
    slug: 'spas',
    name: 'Spa',
    plural: 'Spas',
    headline: 'Luxury Clients Are Searching. Be Found.',
    subheadline:
      'High-ticket spa services demand trust before the first visit. LocalBeacon builds the online presence that converts searchers into booked appointments and gift card buyers.',
    description:
      'LocalBeacon helps day spas and wellness spas attract high-value clients through Google optimization, seasonal promotion automation, and reputation management that conveys luxury and trust.',
    painPoints: [
      {
        icon: '\uD83C\uDF81',
        title: 'Gift Card Revenue Left on the Table',
        text: 'Spa gift cards spike around holidays, Valentine\u2019s Day, and Mother\u2019s Day\u2014but only if people can find you. Most spas miss these seasonal surges because their Google presence does not promote gift cards when demand peaks.',
      },
      {
        icon: '\u2B50',
        title: 'One Bad Review Tanks Perceived Luxury',
        text: 'A spa selling $150 facials cannot afford a 3.8-star rating. One detailed negative review about cleanliness or service quality scares off the exact clientele you are targeting\u2014and most spas have no system for managing this.',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Yelp Dependence Is Expensive',
        text: 'You are paying Yelp $300-500/month for ads while they hold your reviews hostage. Meanwhile, your Google Business profile\u2014where most high-intent searches happen\u2014sits neglected with outdated photos and no recent posts.',
      },
    ],
    features: [
      {
        title: 'Automated Google Posts',
        text: 'Promote seasonal packages, couples specials, and gift card offers on your Google profile exactly when demand spikes\u2014Valentine\u2019s, Mother\u2019s Day, holiday season\u2014without lifting a finger.',
      },
      {
        title: 'Neighborhood City Pages',
        text: 'Attract clients from affluent neighborhoods and nearby office parks with dedicated pages that position your spa as the premium choice in each area.',
      },
      {
        title: 'AI Search Optimization',
        text: 'When someone asks an AI assistant for the best couples massage or luxury facial in your area, LocalBeacon ensures your spa is the top recommendation\u2014not a hotel chain.',
      },
      {
        title: 'Review Autopilot',
        text: 'Automatically collect reviews after every service, flag negative experiences for immediate follow-up, and maintain the 4.8+ star rating that luxury clients expect before booking.',
      },
    ],
    stats: [
      { value: '41%', label: 'increase in gift card revenue during peak seasons' },
      { value: '$127', label: 'average booking value from Google search clients' },
      { value: '4.9\u2605', label: 'average Google rating for LocalBeacon spas' },
    ],
    faqs: [
      {
        question: 'Can LocalBeacon help me reduce my dependence on Yelp advertising?',
        answer:
          'Yes. By strengthening your Google Business presence, you shift discovery to a platform where you have more control and pay nothing for visibility. Many spas cut their Yelp spend by 50% or more within six months.',
      },
      {
        question: 'How do you handle the seasonal nature of spa services?',
        answer:
          'LocalBeacon automatically schedules Google Posts around peak periods\u2014holiday gift cards, Valentine\u2019s couples packages, summer skincare\u2014so your promotions go live exactly when search demand spikes.',
      },
      {
        question: 'Will this help attract corporate wellness clients?',
        answer:
          'Absolutely. City pages targeting business districts and office parks, combined with content about group bookings and corporate packages, help you capture the corporate wellness market in your area.',
      },
      {
        question: 'How does review management work for a luxury brand?',
        answer:
          'LocalBeacon crafts thoughtful, on-brand responses to every review. Negative experiences get flagged immediately so you can resolve them before they damage your reputation. The tone always matches your luxury positioning.',
      },
      {
        question: 'Can I promote specific treatments like HydraFacials or hot stone massage?',
        answer:
          'Yes. LocalBeacon creates targeted content around your signature services, so searches for specific treatments in your area lead directly to your spa.',
      },
      {
        question: 'I have multiple locations. Can LocalBeacon manage all of them?',
        answer:
          'Yes. Our Solo and Agency plans support multiple locations, each with their own optimized Google profile, city pages, and review management\u2014all managed from a single dashboard.',
      },
    ],
  },

  'nail-salons': {
    slug: 'nail-salons',
    name: 'Nail Salon',
    plural: 'Nail Salons',
    headline: 'Stand Out on the Busiest Block',
    subheadline:
      'There are four nail salons within two miles of you. LocalBeacon makes yours the one people choose when they search "nail salon near me."',
    description:
      'LocalBeacon helps nail salons rise above the intense local competition with Google Business optimization, automated review collection, and local search visibility that drives walk-in traffic.',
    painPoints: [
      {
        icon: '\uD83C\uDFEA',
        title: 'Brutal Competition Density',
        text: 'In most metro areas, there is a nail salon every few blocks. When a potential client searches on Google Maps, they see a cluster of pins\u2014and they almost always pick the one with the most reviews and best rating. If you are not actively managing your online presence, you are invisible.',
      },
      {
        icon: '\uD83E\uDDF4',
        title: 'Hygiene Perception Is Make or Break',
        text: 'One review mentioning dirty tools or a skin reaction can tank your walk-in traffic for months. Nail salons live and die by perceived cleanliness, but most have no system for proactively collecting positive reviews that push those rare complaints down.',
      },
      {
        icon: '\uD83D\uDD04',
        title: 'Repeat Clients Disappear Without Warning',
        text: 'Your Tuesday regular just stopped coming. No cancellation, no complaint\u2014they just found another salon closer to their new job. Without steady new client acquisition, every lost regular is a permanent revenue dip.',
      },
    ],
    features: [
      {
        title: 'Automated Google Posts',
        text: 'Showcase new nail art designs, seasonal gel collections, and walk-in availability directly on your Google profile to catch the attention of people searching right now.',
      },
      {
        title: 'Neighborhood City Pages',
        text: 'Rank for "nail salon in [neighborhood]" across every pocket of your city, not just your immediate block. Capture clients from shopping centers, office parks, and residential areas nearby.',
      },
      {
        title: 'AI Search Optimization',
        text: 'When someone asks an AI assistant for the cleanest nail salon or the best gel manicure near them, LocalBeacon makes sure your salon is the answer\u2014with your hygiene standards and specialties front and center.',
      },
      {
        title: 'Review Autopilot',
        text: 'Build a wall of 5-star reviews that buries the occasional complaint. Automated requests after every visit make it easy for happy clients to vouch for your cleanliness and quality.',
      },
    ],
    stats: [
      { value: '38%', label: 'more walk-ins within the first 60 days' },
      { value: '4.7\u2605', label: 'average Google rating after 90 days on LocalBeacon' },
      { value: '89%', label: 'of new clients cited Google reviews as deciding factor' },
    ],
    faqs: [
      {
        question: 'There are five nail salons on my street. Can LocalBeacon really help me stand out?',
        answer:
          'That is exactly the problem LocalBeacon solves. When multiple salons cluster together, the one with the freshest Google content, highest review count, and best rating wins. LocalBeacon automates all three.',
      },
      {
        question: 'How do I handle negative reviews about hygiene?',
        answer:
          'LocalBeacon flags negative reviews instantly so you can respond professionally and quickly. More importantly, it floods your profile with positive reviews so one complaint does not define your salon.',
      },
      {
        question: 'Can I promote specific services like dip powder or nail art?',
        answer:
          'Yes. LocalBeacon creates targeted Google Posts and city page content around your specialties, so when someone searches "dip powder nails near me" or "nail art [city]," your salon ranks.',
      },
      {
        question: 'Most of my clients are walk-ins. How does online marketing help?',
        answer:
          'Walk-in clients are not random\u2014most check Google Maps on their phone before walking in. They look at your rating, photos, and recent reviews. LocalBeacon makes sure what they see convinces them to choose you.',
      },
      {
        question: 'Will this help me attract higher-spending clients?',
        answer:
          'Yes. City pages targeting upscale neighborhoods and content promoting premium services like gel extensions and nail art attract clients who spend more per visit and rebook more frequently.',
      },
    ],
  },

  'med-spas': {
    slug: 'med-spas',
    name: 'Med Spa',
    plural: 'Med Spas',
    headline: 'Build Trust Before They Book',
    subheadline:
      'Nobody injects Botox on impulse. Your future clients are researching providers for weeks. LocalBeacon makes sure your med spa earns their trust at every touchpoint.',
    description:
      'LocalBeacon helps med spas build the authoritative online presence that high-ticket aesthetic clients demand\u2014Google visibility, trust signals, and local search dominance for Botox, fillers, and advanced treatments.',
    painPoints: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Long Research Cycles, Easy to Lose',
        text: 'A client considering Botox or fillers researches providers for 2-6 weeks before booking. During that window, they check Google reviews, read about your providers, and compare you to competitors. If your online presence is thin, you lose them before they ever call.',
      },
      {
        icon: '\u2696\uFE0F',
        title: 'Compliance Limits Your Marketing',
        text: 'You cannot make the same bold claims a day spa can. Before-and-after photos have restrictions. Testimonials need disclaimers. These regulatory constraints make it harder to stand out online, and most marketing agencies do not understand med spa compliance.',
      },
      {
        icon: '\uD83D\uDCB0',
        title: 'High Acquisition Cost, Low Repeat Visibility',
        text: 'You spend $80-150 to acquire a single Botox client through paid ads, but Google Ads for "Botox near me" are fiercely competitive. Meanwhile, your Google Business profile\u2014free real estate\u2014sits underoptimized with three-month-old posts.',
      },
    ],
    features: [
      {
        title: 'Automated Google Posts',
        text: 'Publish educational content about treatments, seasonal specials, and provider credentials directly on your Google profile\u2014building trust with researching clients without triggering compliance issues.',
      },
      {
        title: 'Neighborhood City Pages',
        text: 'Rank for "Botox near [neighborhood]" and "med spa in [city]" with dedicated pages that highlight your providers\u2019 credentials, treatment specialties, and patient satisfaction.',
      },
      {
        title: 'AI Search Optimization',
        text: 'When someone asks an AI assistant about the safest med spa for lip filler or the most experienced Botox provider in your area, LocalBeacon positions your practice as the trusted answer.',
      },
      {
        title: 'Review Autopilot',
        text: 'Collect detailed patient reviews that mention specific treatments and provider names\u2014the social proof that converts researchers into booked consultations.',
      },
    ],
    stats: [
      { value: '$214', label: 'average first-visit revenue from Google search clients' },
      { value: '58%', label: 'reduction in cost-per-acquisition vs. paid ads' },
      { value: '73%', label: 'of booked clients read 5+ reviews before scheduling' },
    ],
    faqs: [
      {
        question: 'Does LocalBeacon understand med spa compliance requirements?',
        answer:
          'Yes. Our content avoids restricted claims, uses appropriate disclaimers, and focuses on provider credentials and patient education\u2014the trust signals that convert without crossing compliance lines.',
      },
      {
        question: 'How does this help me compete with med spas running heavy Google Ads?',
        answer:
          'Google Ads are expensive and temporary. LocalBeacon builds your organic visibility and Google Business presence\u2014which generates leads for free, permanently. Most med spas see a 50%+ drop in paid ad dependence within six months.',
      },
      {
        question: 'Can I highlight specific providers and their credentials?',
        answer:
          'Absolutely. LocalBeacon creates content that showcases your injectors\u2019 and practitioners\u2019 training, certifications, and experience\u2014the exact information patients research before choosing a provider.',
      },
      {
        question: 'How do you handle before-and-after content for treatments?',
        answer:
          'LocalBeacon focuses on educational content and provider expertise rather than before-and-after imagery, keeping your marketing effective while staying within platform and regulatory guidelines.',
      },
      {
        question: 'Will this help with consultations for high-ticket treatments like CoolSculpting?',
        answer:
          'Yes. City pages and Google Posts targeting specific treatments drive consultation bookings. Clients searching for "CoolSculpting [city]" or "body contouring near me" find your practice with the credibility to convert.',
      },
      {
        question: 'I already have a strong Instagram following. Why do I need Google visibility?',
        answer:
          'Instagram builds awareness, but high-ticket decisions happen on Google. Patients searching for "best med spa near me" are ready to book\u2014and they are checking your Google reviews and profile, not your Instagram grid.',
      },
      {
        question: 'How quickly will I see results?',
        answer:
          'Most med spas see measurable increases in Google profile views within 30 days and new consultation bookings within 60-90 days. The ROI compounds over time as your review count and content library grow.',
      },
    ],
  },

  'tanning-salons': {
    slug: 'tanning-salons',
    name: 'Tanning Salon',
    plural: 'Tanning Salons',
    headline: 'Stay Booked Through Every Season',
    subheadline:
      'Tanning demand swings wildly with the calendar. LocalBeacon smooths out the seasonal roller coaster by capturing demand when it spikes and building membership revenue when it dips.',
    description:
      'LocalBeacon helps tanning salons capture seasonal demand surges, promote spray tan services, and build year-round membership revenue through Google Business optimization and local search visibility.',
    painPoints: [
      {
        icon: '\uD83C\uDF26\uFE0F',
        title: 'Seasonal Revenue Whiplash',
        text: 'Prom season and spring break fill your beds, but July through September you are practically empty. Winter brings another spike, then January drops off a cliff. Without a strategy to capture demand during each micro-season, your revenue graph looks like a heart monitor.',
      },
      {
        icon: '\uD83D\uDCA8',
        title: 'Spray Tan Demand You Are Not Capturing',
        text: 'Spray tanning is growing 15% year-over-year as health-conscious consumers shift away from UV. But when someone searches "spray tan near me," your salon does not show up because your online presence still screams tanning beds only.',
      },
      {
        icon: '\uD83D\uDCB3',
        title: 'Membership Churn in Off-Season',
        text: 'You sell monthly memberships, but 40% of members cancel after summer. They forget you exist until next April because your salon disappears from their awareness completely\u2014no Google posts, no visibility, no reason to stay.',
      },
    ],
    features: [
      {
        title: 'Automated Google Posts',
        text: 'Promote prom packages in March, wedding prep in May, winter glow-ups in November\u2014all automatically timed to when people are actually searching for tanning services.',
      },
      {
        title: 'Neighborhood City Pages',
        text: 'Rank for "tanning salon near [neighborhood]" and "spray tan [city]" with pages that highlight both UV and spray options, parking, and membership perks.',
      },
      {
        title: 'AI Search Optimization',
        text: 'When someone asks an AI assistant for the best spray tan or tanning salon near them, LocalBeacon ensures your salon is recommended\u2014with your spray tan options and cleanliness standards highlighted.',
      },
      {
        title: 'Review Autopilot',
        text: 'Collect reviews that mention specific services\u2014spray tans, different bed levels, membership value\u2014building the detailed social proof that converts first-time visitors into recurring members.',
      },
    ],
    stats: [
      { value: '34%', label: 'reduction in off-season membership cancellations' },
      { value: '2.1x', label: 'more spray tan bookings from Google search' },
      { value: '52%', label: 'of new members found the salon through local search' },
    ],
    faqs: [
      {
        question: 'Can LocalBeacon help me promote spray tanning specifically?',
        answer:
          'Yes. LocalBeacon creates dedicated content and city pages targeting spray tan searches, which is one of the fastest-growing segments. This helps you capture health-conscious clients who would otherwise skip your salon entirely.',
      },
      {
        question: 'How does LocalBeacon handle seasonal demand swings?',
        answer:
          'Automated Google Posts are timed to seasonal search trends\u2014prom prep, wedding season, holiday parties, winter tanning\u2014so your salon is visible exactly when demand spikes in your area.',
      },
      {
        question: 'Will this help reduce membership cancellations?',
        answer:
          'Indirectly, yes. By keeping your salon visible in local search year-round, members are constantly reminded of your presence. Consistent Google activity also attracts new members to replace any natural churn.',
      },
      {
        question: 'I offer multiple tanning levels and packages. Can LocalBeacon promote each one?',
        answer:
          'Absolutely. Google Posts and city pages can highlight your full range\u2014from basic UV beds to premium stand-ups to custom spray tans\u2014targeting different search queries for each service level.',
      },
      {
        question: 'How do I compete with new tanning salons opening nearby?',
        answer:
          'New competitors start with zero reviews and no search history. LocalBeacon helps you build an insurmountable lead in reviews, content, and search visibility that new entrants cannot match quickly.',
      },
    ],
  },
}
