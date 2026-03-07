import type { IndustryData } from './types'

export const fitnessRecreation: Record<string, IndustryData> = {
  gyms: {
    slug: 'gyms',
    name: 'Gym',
    plural: 'Gyms',
    headline: 'Keep members walking in, not walking out.',
    subheadline:
      'LocalBeacon keeps your gym visible year-round on Google and AI search — so your January rush turns into February retention and your summer slump becomes a signup season.',
    description:
      'AI-powered local marketing for gyms and fitness centers. Automated Google Business Profile posts, city-specific landing pages, review responses, and AI search optimization built for independent gyms.',
    painPoints: [
      {
        icon: '📉',
        title: 'January rush, summer ghost town',
        text: 'New Year\'s resolutions pack your floor in January. By March, half are gone. LocalBeacon promotes challenge programs, summer specials, and group class launches throughout the year to flatten the membership curve.',
      },
      {
        icon: '🏢',
        title: 'Planet Fitness and big chains dominate search',
        text: 'National chains spend millions on "join for $10/month" ads. Your edge is community, coaching quality, and real results. LocalBeacon tells that story on Google where it matters — in local search results.',
      },
      {
        icon: '🚪',
        title: 'Member churn is the silent revenue killer',
        text: 'Acquiring a new member costs 5-10× more than keeping one. LocalBeacon keeps your profile active with class schedules, member spotlights, and challenge announcements that remind existing members why they chose you.',
      },
    ],
    features: [
      {
        title: 'Google posts that match the fitness calendar',
        text: 'New Year\'s kickoff specials, spring shred challenges, summer boot camps, fall league signups — posted automatically to your Google listing when motivation peaks.',
      },
      {
        title: 'City pages that bring in local members',
        text: '"Gym in Frisco" and "Fitness Center in McKinney" pages that rank you in surrounding cities — because members will drive 10 minutes for the right gym.',
      },
      {
        title: 'AI search optimization for fitness',
        text: 'When someone asks ChatGPT "best gym near me with group classes" or asks Google AI for gym recommendations, your structured data and review strength help you appear.',
      },
      {
        title: 'Review responses that build community',
        text: 'Energetic, genuine replies to every review that reflect your gym\'s personality — showing prospective members the welcoming, results-driven culture they will join.',
      },
    ],
    stats: [
      { value: '35%', label: 'less seasonal membership drop-off' },
      { value: '2.6×', label: 'more walk-in tour requests' },
      { value: '4.7★', label: 'avg maintained Google rating' },
    ],
    faqs: [
      {
        question: 'How does LocalBeacon help gyms retain members?',
        answer:
          'Retention starts with visibility. When members see your gym actively posting challenges, new classes, and community updates on Google, it reinforces their decision to stay. LocalBeacon automates this ongoing engagement without adding to your staff\'s workload.',
      },
      {
        question: 'Can this help my gym compete with Planet Fitness and national chains?',
        answer:
          'Yes. Chains win on price, but independent gyms win on community, coaching, and results. LocalBeacon helps you dominate local search with content that highlights what chains cannot offer — personal attention, real coaching, and a genuine community.',
      },
      {
        question: 'What kind of content does LocalBeacon create for gyms?',
        answer:
          'Seasonal fitness challenges, new class announcements, training tips, nutrition guidance, member achievement highlights, and community events. Content tailored to your gym\'s specific offerings and personality.',
      },
      {
        question: 'Does this work for specialized gyms like CrossFit or boutique studios?',
        answer:
          'Absolutely. LocalBeacon adapts content to your niche — WOD tips for CrossFit boxes, class format spotlights for boutique studios, or powerlifting content for strength gyms. Your Google presence reflects what makes you unique.',
      },
      {
        question: 'How does AI search matter for gyms?',
        answer:
          'More people are asking AI assistants "best gym near me" instead of scrolling Google results. LocalBeacon structures your business data so AI systems can recommend you — including your class types, hours, amenities, and review strength.',
      },
      {
        question: 'How quickly will I see new member signups?',
        answer:
          'Google profile views typically increase within 2 weeks. Most gyms see a measurable uptick in tour requests and trial signups within 45-60 days.',
      },
    ],
  },

  'personal-trainers': {
    slug: 'personal-trainers',
    name: 'Personal Training',
    plural: 'Personal Trainers',
    headline: 'Fill your training schedule without begging for referrals.',
    subheadline:
      'LocalBeacon positions you as the go-to trainer in your area — so clients find your expertise on Google and AI search instead of scrolling past another Instagram post.',
    description:
      'AI-powered local marketing for personal trainers and fitness coaches. Automated Google Business Profile posts, city-specific service pages, review responses, and AI search optimization built for independent trainers.',
    painPoints: [
      {
        icon: '📱',
        title: 'Online coaching apps are undercutting your rates',
        text: 'Peloton, Future, and Caliber offer "personal training" for $30/month. Your in-person expertise is worth more, but clients need to find you first. LocalBeacon makes sure they do — on Google, not just Instagram.',
      },
      {
        icon: '🏅',
        title: 'Certifications do not sell themselves',
        text: 'You invested in NASM, ACE, or CSCS certifications, but clients do not search for credentials — they search for "personal trainer near me." LocalBeacon makes sure your expertise shows up where that search happens.',
      },
      {
        icon: '🔁',
        title: 'Client retention is a constant battle',
        text: 'One cancelled client and your week has a hole. LocalBeacon keeps a pipeline of new prospects flowing from local search so you are never one cancellation away from a slow month.',
      },
    ],
    features: [
      {
        title: 'Google posts that showcase your expertise',
        text: 'Quick workout tips, nutrition guidance, client transformation concepts, and seasonal fitness content — posted weekly to your Google listing to prove you are active and knowledgeable.',
      },
      {
        title: 'Local pages for every area you train',
        text: '"Personal Trainer in Buckhead" and "Fitness Coach in Midtown Atlanta" pages that rank you in every neighborhood where your ideal clients live and work.',
      },
      {
        title: 'AI search visibility for personal training',
        text: 'When someone asks ChatGPT "best personal trainer near me for weight loss" or asks Google AI for trainer recommendations, your structured content and reviews help you get recommended.',
      },
      {
        title: 'Reviews that sell your next client',
        text: 'Professional, personal responses to every Google review that highlight your coaching approach. Prospects reading reviews see a trainer who genuinely cares about client results.',
      },
    ],
    stats: [
      { value: '3.5×', label: 'more consultation bookings' },
      { value: '78%', label: 'of new clients from Google search' },
      { value: '60-day', label: 'avg time to full schedule' },
    ],
    faqs: [
      {
        question: 'How does LocalBeacon help personal trainers get more clients?',
        answer:
          'Most personal trainers rely on gym floor networking and Instagram. LocalBeacon adds a third, more reliable channel — Google local search. When someone in your area searches for a personal trainer, you show up with strong reviews, fresh content, and city-specific pages.',
      },
      {
        question: 'I already post on Instagram. Why do I need this?',
        answer:
          'Instagram builds brand awareness but reaches people who are already following you. Google reaches people actively searching for a trainer right now — the highest-intent prospects. LocalBeacon ensures you show up in those ready-to-buy searches.',
      },
      {
        question: 'Can LocalBeacon help if I train at multiple locations?',
        answer:
          'Yes. Whether you train at clients\' homes, multiple gyms, or your own studio, LocalBeacon creates local pages for every area you serve — so you are found wherever your clients are.',
      },
      {
        question: 'What content does LocalBeacon create for trainers?',
        answer:
          'Quick workout tips, nutrition advice, exercise form guidance, seasonal fitness content (summer shred, holiday survival guides), and general wellness education. All designed to demonstrate your expertise and drive consultation requests.',
      },
      {
        question: 'How does this compare to paying a gym for leads?',
        answer:
          'Gym lead programs charge $200-500/month and you compete with other trainers at the same facility. LocalBeacon builds your own client pipeline for less money — leads come directly to you, exclusively.',
      },
      {
        question: 'Is this worth it if I only have a few open slots?',
        answer:
          'Especially then. When your schedule is nearly full, you can be selective about new clients. A steady pipeline lets you choose clients who are the best fit rather than accepting anyone who walks in.',
      },
    ],
  },

  'yoga-studios': {
    slug: 'yoga-studios',
    name: 'Yoga Studio',
    plural: 'Yoga Studios',
    headline: 'Grow your studio without losing your soul.',
    subheadline:
      'LocalBeacon brings new students to your mat through Google and AI search — so your community grows organically without you spending hours on marketing.',
    description:
      'AI-powered local marketing for yoga studios and meditation centers. Automated Google Business Profile posts, city-specific studio pages, review responses, and AI search optimization built for yoga businesses.',
    painPoints: [
      {
        icon: '📲',
        title: 'At-home apps are stealing your students',
        text: 'Peloton yoga, Alo Moves, and YouTube offer free or cheap classes from home. Your edge is the in-person community, hands-on adjustments, and real connection. LocalBeacon helps people who crave that experience find you online.',
      },
      {
        icon: '🧘',
        title: 'Instructor following does not always translate to studio loyalty',
        text: 'When a popular teacher leaves, students follow them. LocalBeacon builds your studio brand on Google — so students discover your studio for its offerings, not just one teacher\'s Instagram following.',
      },
      {
        icon: '💸',
        title: 'ClassPass sends bodies, not loyal students',
        text: 'ClassPass fills mats at a fraction of your drop-in rate and trains students to hop between studios. LocalBeacon drives direct sign-ups — students who find you on Google and become members, not class-hoppers.',
      },
    ],
    features: [
      {
        title: 'Google posts that fill your class schedule',
        text: 'New class announcements, workshop promotions, seasonal series (30-day challenges, New Year intentions), and wellness tips — posted automatically to keep your Google listing vibrant.',
      },
      {
        title: 'Local pages for surrounding communities',
        text: '"Yoga Studio in La Jolla" and "Hot Yoga in Del Mar" pages that attract students from neighboring areas who are willing to drive for the right studio.',
      },
      {
        title: 'AI search visibility for yoga',
        text: 'When someone asks an AI assistant "best yoga studio near me for beginners" or "hot yoga classes in [area]," your structured data and content help you appear in recommendations.',
      },
      {
        title: 'Review responses that reflect your values',
        text: 'Warm, genuine, community-minded replies to every Google review. Your response tone matches the welcoming energy students experience when they walk through your door.',
      },
    ],
    stats: [
      { value: '2.9×', label: 'more intro class sign-ups' },
      { value: '41%', label: 'of new students cite Google search' },
      { value: '4.8★', label: 'avg maintained Google rating' },
    ],
    faqs: [
      {
        question: 'How does LocalBeacon help yoga studios get new students?',
        answer:
          'When someone searches "yoga near me" or "beginner yoga classes in [city]," LocalBeacon ensures your studio appears with strong reviews, fresh content, and class variety information. Most studios see a measurable increase in intro class sign-ups within 60 days.',
      },
      {
        question: 'Can this help reduce my ClassPass dependency?',
        answer:
          'Yes. ClassPass fills mats at a discount and builds no loyalty. LocalBeacon drives direct Google traffic — students who find you organically, pay full rate, and are more likely to become long-term members.',
      },
      {
        question: 'What kind of content does LocalBeacon create for yoga studios?',
        answer:
          'Workshop announcements, new class format launches, teacher spotlights, mindfulness tips, seasonal wellness content (winter restorative series, summer outdoor yoga), and community event highlights. All written in an authentic, wellness-aligned tone.',
      },
      {
        question: 'Does this work for specialized styles like hot yoga, Ashtanga, or Kundalini?',
        answer:
          'Absolutely. LocalBeacon tailors content to your specific style and offerings. If you specialize in hot yoga, your Google posts and local pages reflect that — attracting the students who are specifically seeking your style.',
      },
      {
        question: 'Will the AI-generated content feel authentic to my studio\'s voice?',
        answer:
          'LocalBeacon generates content based on your studio\'s offerings, style, and values. The tone is warm, community-focused, and wellness-aligned. You review and approve everything before it posts.',
      },
      {
        question: 'How is this different from posting on Instagram?',
        answer:
          'Instagram reaches your existing followers. Google reaches people actively searching for a yoga studio right now — the highest-intent prospects. Both matter, but LocalBeacon ensures you win the moment someone decides to try yoga.',
      },
    ],
  },

  'martial-arts': {
    slug: 'martial-arts',
    name: 'Martial Arts',
    plural: 'Martial Arts Schools',
    headline: 'Fill your dojo without fighting for attention.',
    subheadline:
      'LocalBeacon keeps your martial arts school visible on Google and AI search — so parents find your kids programs and adults discover your self-defense classes.',
    description:
      'AI-powered local marketing for martial arts schools, dojos, and academies. Automated Google Business Profile posts, city-specific landing pages, review responses, and AI search optimization built for martial arts businesses.',
    painPoints: [
      {
        icon: '👧',
        title: 'Kids programs drive revenue, but parents are hard to reach',
        text: 'Kids\' martial arts classes are your bread and butter, but parents research exhaustively before enrolling their children. LocalBeacon builds the strong Google presence — reviews, content, local authority — that gives parents confidence to book a trial.',
      },
      {
        icon: '🥋',
        title: 'Belt progression keeps students, but new signups are unpredictable',
        text: 'Your belt system retains students for years, but the front door needs to keep opening. LocalBeacon creates a consistent pipeline of new trial class requests from local search so your enrollment grows alongside your retention.',
      },
      {
        icon: '🎬',
        title: 'Competing with MMA gyms and YouTube self-defense',
        text: 'UFC popularity drives interest in martial arts, but also in unstructured MMA gyms and online tutorials. LocalBeacon positions your school\'s structured curriculum, discipline values, and qualified instruction as the better choice.',
      },
    ],
    features: [
      {
        title: 'Google posts that drive trial class bookings',
        text: 'Back-to-school enrollment pushes, summer camp promotions, anti-bullying awareness content, and belt testing celebrations — posted automatically to attract both kids\' and adults\' programs.',
      },
      {
        title: 'City pages for your enrollment area',
        text: '"Kids Karate in Chandler" and "Brazilian Jiu-Jitsu in Gilbert" pages that rank for the specific martial art you teach in every city within your enrollment radius.',
      },
      {
        title: 'AI search visibility for martial arts',
        text: 'When a parent asks ChatGPT "best martial arts for kids near me" or someone searches Google AI for self-defense classes, your school\'s structured data and content help you appear.',
      },
      {
        title: 'Review management that parents trust',
        text: 'Thoughtful responses to every review — especially from parents — that highlight your school\'s safety, discipline values, and positive impact on children. The social proof that seals enrollment decisions.',
      },
    ],
    stats: [
      { value: '3.1×', label: 'more trial class bookings' },
      { value: '62%', label: 'of new students from local search' },
      { value: '18-mo', label: 'avg student retention' },
    ],
    faqs: [
      {
        question: 'How does LocalBeacon help martial arts schools get more students?',
        answer:
          'Parents research extensively before enrolling their kids. LocalBeacon ensures your school has a strong Google presence — active posting, great review management, and local landing pages — so when parents search "martial arts for kids near me," your school appears with the credibility they need to book a trial.',
      },
      {
        question: 'Can LocalBeacon promote both kids and adult programs?',
        answer:
          'Yes. LocalBeacon creates content for both audiences — kids\' discipline and confidence-building content that appeals to parents, and self-defense, fitness, and competition-focused content that attracts adult students.',
      },
      {
        question: 'What kind of content does LocalBeacon create for martial arts schools?',
        answer:
          'Belt testing celebrations, anti-bullying awareness posts, summer camp promotions, tournament announcements, self-defense tips, new class schedule updates, and martial arts philosophy content. All tailored to your specific discipline — karate, taekwondo, BJJ, or mixed martial arts.',
      },
      {
        question: 'Does this work for multiple martial arts styles?',
        answer:
          'Absolutely. Whether you teach karate, taekwondo, Brazilian jiu-jitsu, Krav Maga, or multiple disciplines, LocalBeacon tailors your content and local pages to the specific styles you offer.',
      },
      {
        question: 'How does this help with seasonal enrollment?',
        answer:
          'Martial arts schools see enrollment spikes in September (back-to-school) and January (resolutions). LocalBeacon promotes trial classes and special offers ahead of these peaks, and maintains visibility during slower months with ongoing content.',
      },
      {
        question: 'How fast will I see new trial class requests?',
        answer:
          'Google profile engagement typically increases within 2 weeks. Most martial arts schools see a measurable increase in trial class bookings within 45-60 days as local pages index and content builds authority.',
      },
      {
        question: 'Is this worth it for a small, single-location school?',
        answer:
          'Yes — small schools benefit the most. You do not have a marketing department or big ad budget. LocalBeacon gives you the consistent local visibility that larger schools achieve through sheer name recognition. Even our Free plan supports one location.',
      },
    ],
  },
}
