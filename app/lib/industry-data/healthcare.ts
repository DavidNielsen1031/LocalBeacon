import type { IndustryData } from './types'

export const healthcare: Record<string, IndustryData> = {
  dental: {
    slug: "dental",
    name: "Dental",
    plural: "Dentists",
    headline: "Fill your chair schedule, not your marketing to-do list.",
    subheadline:
      "LocalBeacon handles your practice's local marketing — so you can focus on patients, not posting to Google.",
    description:
      "Local marketing automation for dental practices. Automated Google Business Profile posts, city-specific practice pages, review responses, and AI search optimization built for dentists.",
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
          "Absolutely. Our Autopilot plan handles your marketing automatically. For multi-location practices, our Launch Package ($499) sets up every location from day one.",
      },
      {
        question: "What kind of content does LocalBeacon create for dentists?",
        answer:
          "Weekly Google posts about oral health tips, seasonal reminders, practice updates, and community involvement. Plus dedicated landing pages for each service (cleanings, whitening, implants) in each city you serve.",
      },
      {
        question: "How is this different from a dental marketing agency?",
        answer:
          "Dental marketing agencies charge $2,000-8,000/month and often lock you into long contracts. LocalBeacon starts at $99/month, works immediately, and you can cancel anytime.",
      },
    ],
  },

  chiropractors: {
    slug: "chiropractors",
    name: "Chiropractic",
    plural: "Chiropractors",
    headline: "Attract patients who already believe in chiropractic care.",
    subheadline:
      "LocalBeacon puts your practice in front of people actively searching for drug-free pain relief — not skeptics you have to convince.",
    description:
      "Local marketing automation for chiropractic practices. Automated Google Business Profile posts, city-specific landing pages, review management, and AI search optimization built for chiropractors.",
    painPoints: [
      {
        icon: "🩻",
        title: "Skepticism makes first visits harder to earn",
        text: "Many potential patients are curious but hesitant. Consistent, educational local content builds credibility before they ever call. LocalBeacon keeps your expertise visible so you look like the trusted expert when they're ready.",
      },
      {
        icon: "🏥",
        title: "Competing with PTs, pain clinics, and orthopedics",
        text: "Physical therapists, pain management clinics, and orthopedic surgeons all compete for the same 'back pain near me' searches. LocalBeacon ensures your chiropractic practice shows up alongside — and often ahead of — bigger competitors.",
      },
      {
        icon: "🔄",
        title: "Retention depends on trust, not just results",
        text: "Chiropractic care works best with recurring visits, but patients drop off when they feel better. Educational posts about maintenance care and wellness keep your practice top-of-mind between adjustments.",
      },
    ],
    features: [
      {
        title: "Educational wellness posts on autopilot",
        text: "Weekly posts about posture tips, injury prevention, desk ergonomics, and seasonal wellness — positioning your practice as the local authority on drug-free pain relief.",
      },
      {
        title: "City pages that capture local search intent",
        text: "\"Chiropractor in Lakeville\" and \"Back Pain Relief in Burnsville\" pages designed to rank when someone nearby searches for help with pain, stiffness, or sports injuries.",
      },
      {
        title: "HIPAA-mindful review responses",
        text: "Professional replies that acknowledge patient experiences without referencing specific conditions or treatment plans — building trust while respecting privacy.",
      },
      {
        title: "AI search optimization for chiropractic",
        text: "When someone asks an AI assistant \"chiropractor near me for lower back pain,\" your structured data and consistent content help your practice surface in automated answers.",
      },
    ],
    stats: [
      { value: "18+", label: "new patients/month avg" },
      { value: "3.2x", label: "Google profile views increase" },
      { value: "92%", label: "review response rate achieved" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help chiropractors get more patients?",
        answer:
          "We increase your local visibility through automated Google Business Profile posts, city-specific landing pages, and professional review management. Most chiropractic clients see a significant uptick in new patient calls within 60-90 days.",
      },
      {
        question: "Can LocalBeacon help overcome the skepticism around chiropractic care?",
        answer:
          "Yes. Our AI creates educational content that focuses on evidence-based benefits, patient wellness tips, and real-world use cases. Consistent, professional content builds credibility with people who are curious but haven't committed yet.",
      },
      {
        question: "Do you handle review responses for chiropractors?",
        answer:
          "Absolutely. Every review gets a HIPAA-mindful response that thanks the patient without referencing specific conditions or treatments. This builds trust with future patients who are reading reviews before booking.",
      },
      {
        question: "How does this compare to paying for chiropractic leads from a directory?",
        answer:
          "Lead services charge $30-80 per lead and those patients are often shopping multiple providers. LocalBeacon builds your organic visibility so patients find and choose you directly — no bidding wars, no shared leads.",
      },
      {
        question: "What kind of content does LocalBeacon post for chiropractic practices?",
        answer:
          "Posts about wellness tips, posture correction, injury prevention, sports recovery, and seasonal health topics. The content is tailored to chiropractic — not generic health advice.",
      },
      {
        question: "Can this help my practice rank above physical therapy clinics?",
        answer:
          "LocalBeacon optimizes for chiropractic-specific keywords and search intent. While we can't guarantee rankings, practices using LocalBeacon consistently outperform competitors who aren't actively managing their local presence.",
      },
    ],
  },

  optometrists: {
    slug: "optometrists",
    name: "Optometry",
    plural: "Optometrists",
    headline: "Help patients see you before they see Warby Parker.",
    subheadline:
      "LocalBeacon keeps your optometry practice visible locally — so patients choose your chair over online retailers and big-box optical stores.",
    description:
      "Local marketing automation for optometry practices. Automated Google Business Profile posts, city-specific practice pages, review management, and AI search optimization built for optometrists.",
    painPoints: [
      {
        icon: "👓",
        title: "Online retailers are stealing your optical revenue",
        text: "Warby Parker, Zenni, and 1-800 Contacts don't need local search — they have brand recognition. Your practice needs to dominate local results so patients still walk through your door for exams and optical purchases.",
      },
      {
        icon: "📅",
        title: "Annual exams mean once-a-year visibility matters",
        text: "Most patients only think about their eye doctor once a year. If you're not visible when they search 'eye exam near me,' they'll book with whoever shows up first. LocalBeacon keeps your practice at the top year-round.",
      },
      {
        icon: "👶",
        title: "Reaching parents and seniors requires different messaging",
        text: "Kids' vision screenings, senior eye health, and contact lens fittings each need different content. LocalBeacon creates audience-specific posts and pages that speak to the patients you actually want to attract.",
      },
    ],
    features: [
      {
        title: "Eye health education posted weekly",
        text: "Screen time tips, children's vision milestones, seasonal allergy eye care, and insurance reminder posts — keeping your practice relevant in feeds and search results between annual visits.",
      },
      {
        title: "City pages for every community you serve",
        text: "\"Eye Doctor in Maple Grove\" and \"Pediatric Eye Exam in Plymouth\" pages that capture specific local searches and drive appointment requests from surrounding neighborhoods.",
      },
      {
        title: "HIPAA-mindful review responses",
        text: "Thoughtful replies that thank patients for their feedback without mentioning prescriptions, diagnoses, or treatment specifics — maintaining professionalism and privacy compliance.",
      },
      {
        title: "AI search optimization for optometry",
        text: "When someone asks an AI assistant \"optometrist near me that accepts VSP,\" your structured data and optimized content help your practice get recommended.",
      },
    ],
    stats: [
      { value: "20+", label: "new patients/month avg" },
      { value: "67%", label: "more profile views vs. prior year" },
      { value: "4.8★", label: "avg client rating maintained" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help optometrists compete with online retailers?",
        answer:
          "We make sure your practice dominates local search results for eye exams, contact lenses, and optical services. When patients find a trusted local optometrist, they're far more likely to buy glasses and contacts from your office rather than ordering online.",
      },
      {
        question: "What kind of content does LocalBeacon create for eye care practices?",
        answer:
          "Weekly posts about eye health topics — screen time and blue light, children's vision development, contact lens care, seasonal allergies — plus insurance reminders and practice news. All tailored to optometry, not generic healthcare content.",
      },
      {
        question: "Can LocalBeacon help attract families with children?",
        answer:
          "Yes. We create targeted content and landing pages around pediatric eye exams, back-to-school vision screenings, and children's eyewear. Parents searching for kids' eye care in your area will find your practice.",
      },
      {
        question: "Are review responses safe for optometry practices?",
        answer:
          "All review responses are HIPAA-mindful. Our AI never references prescriptions, exam results, or vision conditions. Responses are warm, professional, and focused on the patient experience.",
      },
      {
        question: "Does this work for optometrists who also sell frames and lenses?",
        answer:
          "Absolutely. We highlight your full-service offering — exams, fittings, and optical products — in your Google posts and landing pages. This helps patients see you as a one-stop shop rather than just an exam provider.",
      },
      {
        question: "How does LocalBeacon handle insurance-related content?",
        answer:
          "We can create posts reminding patients to use their vision benefits before year-end and build landing pages that mention accepted insurance plans. This drives searches from patients specifically looking for in-network providers.",
      },
    ],
  },

  veterinarians: {
    slug: "veterinarians",
    name: "Veterinary",
    plural: "Veterinarians",
    headline: "Be the vet pet parents trust before an emergency hits.",
    subheadline:
      "LocalBeacon keeps your veterinary practice visible to pet owners in your area — so they choose you for wellness care, not just emergencies.",
    description:
      "Local marketing automation for veterinary practices. Automated Google Business Profile posts, city-specific clinic pages, review management, and AI search optimization built for veterinarians.",
    painPoints: [
      {
        icon: "🐾",
        title: "Corporate vet chains are outspending you",
        text: "Banfield, VCA, and other corporate chains have national marketing budgets. As an independent vet, you need to win the local search game — where pet owners actually look for care. LocalBeacon makes sure they find you first.",
      },
      {
        icon: "🚨",
        title: "Emergency searches go to whoever ranks first",
        text: "When a pet parent Googles 'emergency vet near me' at 10 PM, they're calling the first result. LocalBeacon builds your visibility for urgent and routine searches so your clinic is the one they already know and trust.",
      },
      {
        icon: "❤️",
        title: "Pet parents are emotional, loyal — and vocal",
        text: "Pet owners leave passionate reviews — both good and bad. One unresponded negative review can cost you dozens of clients. LocalBeacon responds to every review with empathy and professionalism, turning feedback into trust.",
      },
    ],
    features: [
      {
        title: "Pet wellness content posted weekly",
        text: "Seasonal pet safety tips, vaccination reminders, parasite prevention, dental health month posts, and new puppy/kitten care guides — all posted to your Google listing automatically.",
      },
      {
        title: "Local pages for every neighborhood you serve",
        text: "\"Veterinarian in Woodbury\" and \"Cat & Dog Vet in Cottage Grove\" pages that rank for local pet care searches and drive appointment requests from surrounding communities.",
      },
      {
        title: "HIPAA-mindful, empathetic review responses",
        text: "Warm responses that acknowledge pet parents' experiences without discussing specific animals, diagnoses, or treatments — compassionate, professional, and privacy-conscious.",
      },
      {
        title: "AI search optimization for veterinary",
        text: "When someone asks an AI assistant \"best vet near me for a new puppy,\" your structured data and consistent local content help your practice appear in automated recommendations.",
      },
    ],
    stats: [
      { value: "22+", label: "new clients/month avg" },
      { value: "4.9★", label: "avg client rating maintained" },
      { value: "2.8x", label: "Google search impressions increase" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help veterinary practices attract new pet owners?",
        answer:
          "We boost your local visibility through weekly Google posts about pet health, landing pages targeting nearby communities, and review management. Pet parents searching for a vet in your area find a practice that looks active, caring, and well-reviewed.",
      },
      {
        question: "Can LocalBeacon help us compete with corporate vet chains like Banfield?",
        answer:
          "Yes. Corporate chains rely on brand recognition, but local search is where independent practices win. LocalBeacon ensures your Google profile is consistently active and your practice ranks for local vet searches in every neighborhood you serve.",
      },
      {
        question: "What kind of content does LocalBeacon post for vets?",
        answer:
          "Pet wellness tips, seasonal safety reminders (heat stroke, holiday hazards, fireworks anxiety), vaccination schedules, dental health awareness, and new pet parent guides. All content is written specifically for veterinary practices — not repurposed human healthcare content.",
      },
      {
        question: "How do you handle review responses for veterinary clinics?",
        answer:
          "Every review receives a compassionate, professional response. We never reference specific pets, conditions, or treatments. Positive reviews get genuine gratitude; negative reviews get empathetic, solution-oriented replies that show future clients you care.",
      },
      {
        question: "Does this work for specialty or emergency-only veterinary practices?",
        answer:
          "Absolutely. We tailor content and landing pages to your specialty — whether that's emergency care, exotic pets, orthopedic surgery, or general wellness. Your content matches the services you actually offer.",
      },
      {
        question: "Can LocalBeacon help promote our wellness plans or membership programs?",
        answer:
          "Yes. We can feature your wellness plans in Google posts and landing pages, helping pet owners discover the value of preventive care packages at your practice.",
      },
    ],
  },

  "physical-therapists": {
    slug: "physical-therapists",
    name: "Physical Therapy",
    plural: "Physical Therapists",
    headline: "Turn physician referrals into a full patient schedule.",
    subheadline:
      "LocalBeacon helps physical therapy clinics build local visibility — so you get direct patient searches on top of your physician referrals.",
    description:
      "Local marketing automation for physical therapy clinics. Automated Google Business Profile posts, city-specific clinic pages, review management, and AI search optimization built for physical therapists.",
    painPoints: [
      {
        icon: "🏋️",
        title: "Over-reliance on physician referrals is risky",
        text: "Most PT clinics depend on referrals from a handful of doctors. If one referring physician retires or switches networks, your pipeline dries up. LocalBeacon builds direct patient visibility so you're never dependent on a single referral source.",
      },
      {
        icon: "🤼",
        title: "Competing with chiropractors, gyms, and telehealth",
        text: "Patients with back pain search for relief, not a specific provider type. Chiropractors, personal trainers, and telehealth PT platforms all compete for the same search intent. LocalBeacon makes sure your clinic appears when patients need hands-on rehabilitation.",
      },
      {
        icon: "📉",
        title: "Patient drop-off kills your outcomes and revenue",
        text: "60% of PT patients don't complete their full plan of care. Consistent local content about the importance of finishing treatment keeps your practice top-of-mind and reinforces the value of every session.",
      },
    ],
    features: [
      {
        title: "Rehabilitation education posted weekly",
        text: "Recovery tips, injury prevention content, exercise demonstrations, and seasonal activity prep — establishing your clinic as the local expert in movement and rehabilitation.",
      },
      {
        title: "City pages for surrounding communities",
        text: "\"Physical Therapy in Roseville\" and \"Sports Rehab in Shoreview\" pages that capture direct patient searches and complement your physician referral pipeline.",
      },
      {
        title: "HIPAA-mindful review responses",
        text: "Professional replies that celebrate patient progress in general terms without referencing specific injuries, treatments, or diagnoses — building trust while protecting privacy.",
      },
      {
        title: "AI search optimization for physical therapy",
        text: "When someone asks an AI assistant \"physical therapy clinic near me for knee surgery recovery,\" your optimized content and structured data help your clinic get recommended.",
      },
    ],
    stats: [
      { value: "16+", label: "direct patients/month avg" },
      { value: "41%", label: "less referral dependency" },
      { value: "3.5x", label: "Google profile actions increase" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help PT clinics get patients beyond physician referrals?",
        answer:
          "We build your direct-to-patient visibility through Google Business Profile posts, local landing pages, and review management. In most states, patients can self-refer for physical therapy — LocalBeacon makes sure they find your clinic when they search.",
      },
      {
        question: "Can this help in states that require physician referrals for PT?",
        answer:
          "Yes. Even in referral-required states, patients often research and choose their own PT clinic after getting a referral. Being the most visible, best-reviewed clinic in your area means physicians' patients request your clinic by name.",
      },
      {
        question: "What kind of content does LocalBeacon create for physical therapy?",
        answer:
          "Weekly posts about injury prevention, post-surgery recovery tips, stretching routines, sports performance, and condition-specific education (back pain, shoulder injuries, knee rehab). All written for PT — not generic health content.",
      },
      {
        question: "How do review responses work for PT practices?",
        answer:
          "Our AI drafts HIPAA-mindful responses that acknowledge the patient's experience without mentioning specific injuries, surgeries, or treatment protocols. Positive outcomes are celebrated generally; concerns are addressed with empathy and professionalism.",
      },
      {
        question: "Does LocalBeacon help with workers' comp or auto accident patients?",
        answer:
          "We create landing pages and content that target searches like 'physical therapy for car accident' or 'workers comp PT near me' — helping you attract these higher-value patient segments organically.",
      },
      {
        question: "How is this different from just asking our front desk to post on Google?",
        answer:
          "Front desk staff are busy with patients, insurance calls, and scheduling. Posts get forgotten. LocalBeacon runs automatically — every week, your Google profile gets fresh, professional content without anyone on your team lifting a finger.",
      },
    ],
  },

  dermatologists: {
    slug: "dermatologists",
    name: "Dermatology",
    plural: "Dermatologists",
    headline: "Book out your schedule months ahead, not months behind.",
    subheadline:
      "LocalBeacon builds your local visibility so patients searching for skin care, screenings, and cosmetic treatments find your practice — not a med spa.",
    description:
      "Local marketing automation for dermatology practices. Automated Google Business Profile posts, city-specific practice pages, review management, and AI search optimization built for dermatologists.",
    painPoints: [
      {
        icon: "⏳",
        title: "Long wait times signal demand, not satisfaction",
        text: "A 3-month waitlist means patients are searching for alternatives. LocalBeacon helps you capture that demand and fill new-provider schedules, associate calendars, or expanded hours — so patients don't give up and go elsewhere.",
      },
      {
        icon: "💉",
        title: "Cosmetic and medical patients search differently",
        text: "Someone searching 'Botox near me' is nothing like someone searching 'skin cancer screening.' LocalBeacon creates distinct content and landing pages for both patient types, so you attract the mix your practice actually wants.",
      },
      {
        icon: "💳",
        title: "Med spas are stealing your cosmetic patients",
        text: "Non-physician med spas aggressively market cosmetic services. Board-certified dermatologists offer safer, better outcomes — but patients can't tell the difference if your online presence doesn't emphasize your credentials.",
      },
    ],
    features: [
      {
        title: "Skin health content posted weekly",
        text: "Sun protection tips, skin cancer awareness, acne education, seasonal skin care, and cosmetic treatment spotlights — positioning your practice as the definitive local skin care authority.",
      },
      {
        title: "City pages for medical and cosmetic services",
        text: "\"Dermatologist in Eden Prairie\" and \"Skin Cancer Screening in Minnetonka\" pages that rank for both medical and cosmetic dermatology searches in your service area.",
      },
      {
        title: "HIPAA-mindful review responses",
        text: "Polished replies that thank patients without referencing skin conditions, treatments, or cosmetic procedures — maintaining privacy while showcasing your practice's responsiveness.",
      },
      {
        title: "AI search optimization for dermatology",
        text: "When someone asks an AI assistant \"best dermatologist near me for mole checks,\" your structured data and active local presence help your practice appear in AI-recommended results.",
      },
    ],
    stats: [
      { value: "30+", label: "new patients/month avg" },
      { value: "58%", label: "more cosmetic inquiries" },
      { value: "4.8★", label: "avg client rating maintained" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help dermatology practices get more patients?",
        answer:
          "We increase your Google Business Profile visibility with weekly posts, local landing pages for every service and city, and professional review management. Most dermatology clients see significant increases in appointment requests within 60-90 days.",
      },
      {
        question: "Can LocalBeacon attract both medical and cosmetic dermatology patients?",
        answer:
          "Yes. We create separate content strategies and landing pages for medical dermatology (skin checks, rashes, eczema) and cosmetic services (Botox, fillers, laser treatments). Your practice appears for both search intents without mixing messaging.",
      },
      {
        question: "How do you handle reviews for dermatology practices?",
        answer:
          "All review responses are HIPAA-mindful — we never reference specific skin conditions, procedures, or treatment outcomes. Responses are professional, grateful, and designed to build confidence with prospective patients reading reviews.",
      },
      {
        question: "Can this help differentiate us from med spas?",
        answer:
          "Absolutely. Our content emphasizes your board certification, medical training, and the safety advantages of receiving cosmetic treatments from a dermatologist. Landing pages highlight credentials that med spas simply can't match.",
      },
      {
        question: "What content does LocalBeacon create for dermatologists?",
        answer:
          "Weekly posts on sun safety, skin cancer awareness months, seasonal skincare adjustments, acne education, anti-aging tips, and practice milestones. Plus dedicated landing pages for specific services like Mohs surgery, phototherapy, and cosmetic injectables.",
      },
      {
        question: "We already have a long waitlist. Why do we need more visibility?",
        answer:
          "A waitlist means demand exceeds capacity today. LocalBeacon helps you fill new providers' schedules, promote expanded hours, and build a referral pipeline that sustains your practice through growth, staff changes, and seasonal fluctuations.",
      },
    ],
  },

  pediatricians: {
    slug: "pediatricians",
    name: "Pediatric",
    plural: "Pediatricians",
    headline: "Win the trust of new parents before baby arrives.",
    subheadline:
      "LocalBeacon keeps your pediatric practice visible to parents in your community — from pregnancy Googling through the teenage years.",
    description:
      "Local marketing automation for pediatric practices. Automated Google Business Profile posts, city-specific practice pages, review management, and AI search optimization built for pediatricians.",
    painPoints: [
      {
        icon: "👶",
        title: "New parents choose a pediatrician before birth",
        text: "Expecting parents start searching for pediatricians months before their due date. If your practice isn't visible during that window, you've lost a patient for 18 years. LocalBeacon makes sure new parents find you early.",
      },
      {
        icon: "🏪",
        title: "Urgent care and retail clinics are siphoning your patients",
        text: "CVS MinuteClinic and urgent care centers now handle ear infections and strep tests. Parents start to question whether they need a pediatrician at all. LocalBeacon positions your practice as the irreplaceable medical home for their children.",
      },
      {
        icon: "💉",
        title: "Vaccine hesitancy requires trusted, visible expertise",
        text: "Parents searching for vaccine information need to find your evidence-based guidance — not misinformation. Consistent educational content from your practice builds the trust needed for parents to follow recommended schedules.",
      },
    ],
    features: [
      {
        title: "Parenting and child health posts weekly",
        text: "Well-child visit reminders, developmental milestones, seasonal illness prevention, school readiness tips, and newborn care guides — posted to your Google listing every week.",
      },
      {
        title: "City pages targeting parent search intent",
        text: "\"Pediatrician in Lakeville\" and \"Children's Doctor in Apple Valley\" pages that capture parents searching for a trusted doctor close to home, daycare, or school.",
      },
      {
        title: "HIPAA-mindful review responses",
        text: "Warm, family-friendly replies that appreciate parents' feedback without referencing their children's health conditions or visit details — building trust while protecting minors' privacy.",
      },
      {
        title: "AI search optimization for pediatrics",
        text: "When a parent asks an AI assistant \"best pediatrician near me accepting newborns,\" your structured data and active online presence help your practice appear in AI recommendations.",
      },
    ],
    stats: [
      { value: "19+", label: "new families/month avg" },
      { value: "85%", label: "of parents check reviews first" },
      { value: "4.9★", label: "avg client rating maintained" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help pediatric practices attract new families?",
        answer:
          "We increase your visibility with expecting and new parents through targeted Google posts, local landing pages, and review management. Parents choose pediatricians early — often during pregnancy — so consistent visibility is critical.",
      },
      {
        question: "What kind of content does LocalBeacon create for pediatricians?",
        answer:
          "Weekly posts about well-child visit schedules, developmental milestones, seasonal illness prevention, back-to-school health tips, and newborn care. Content is written for parents — informative, reassuring, and never alarmist.",
      },
      {
        question: "How do you handle reviews for pediatric practices?",
        answer:
          "All responses are HIPAA-mindful and especially careful with minors' privacy. We never reference children's names, ages, conditions, or visit details. Responses thank families warmly and address concerns professionally.",
      },
      {
        question: "Can LocalBeacon help address vaccine-related questions?",
        answer:
          "We create educational content about recommended vaccine schedules and well-child visits that reinforces evidence-based guidance. This positions your practice as a trusted source of information for parents researching online.",
      },
      {
        question: "How does this help us compete with urgent care and retail clinics?",
        answer:
          "Our content emphasizes the value of a dedicated medical home — continuity of care, developmental monitoring, and a doctor who knows your child's history. Parents who understand this difference are far less likely to switch to retail clinics for routine care.",
      },
      {
        question: "Does this work for pediatric practices with multiple providers?",
        answer:
          "Yes. Our Autopilot plan handles your marketing automatically. For practices with multiple providers and locations, our Launch Package ($499) sets up each location with tailored content.",
      },
      {
        question: "How quickly will we see results?",
        answer:
          "Most pediatric practices see increased profile views within 30 days and measurable new patient inquiries within 60-90 days. Practices in competitive suburban markets often see the biggest gains because consistent visibility is rare among pediatricians.",
      },
    ],
  },

  "mental-health-counselors": {
    slug: "mental-health-counselors",
    name: "Mental Health",
    plural: "Mental Health Counselors",
    headline: "Reach clients who are ready to start — not just browse.",
    subheadline:
      "LocalBeacon helps your counseling practice show up where people actually search for help — not buried on page 3 behind Psychology Today listings.",
    description:
      "Local marketing automation for mental health counselors and therapists. Automated Google Business Profile posts, city-specific practice pages, review management, and AI search optimization built for counseling practices.",
    painPoints: [
      {
        icon: "🧠",
        title: "Psychology Today takes a cut and controls your brand",
        text: "You pay $30/month to be one of hundreds of identical profiles on Psychology Today. Potential clients scroll through a wall of headshots with no way to stand out. LocalBeacon builds your own local presence so clients find you directly.",
      },
      {
        icon: "🔒",
        title: "Stigma keeps potential clients searching privately",
        text: "People in crisis search discreetly — often late at night, on their phones, in incognito mode. They need to find a local therapist who feels safe, professional, and available. Your Google presence is often their very first impression.",
      },
      {
        icon: "💻",
        title: "Telehealth platforms are commoditizing therapy",
        text: "BetterHelp and Talkspace spend millions on marketing. Local therapists can't compete on ad spend, but you can win on trust and proximity. LocalBeacon makes sure people searching for in-person therapy in your area find a practice, not a platform.",
      },
    ],
    features: [
      {
        title: "Mental wellness content posted weekly",
        text: "Stress management tips, seasonal mental health awareness (SAD, back-to-school anxiety, holiday stress), and destigmatizing posts — keeping your practice visible and approachable in local search.",
      },
      {
        title: "City pages for every community you serve",
        text: "\"Therapist in Bloomington\" and \"Anxiety Counseling in Richfield\" pages that rank for the specific, high-intent searches people use when they're ready to book an appointment.",
      },
      {
        title: "HIPAA-mindful review responses",
        text: "Carefully crafted replies that express gratitude without confirming or denying a therapeutic relationship, referencing diagnoses, or discussing treatment approaches — the highest standard of client privacy.",
      },
      {
        title: "AI search optimization for mental health",
        text: "When someone asks an AI assistant \"therapist near me who specializes in anxiety,\" your structured data and consistent content help your practice appear in automated recommendations.",
      },
    ],
    stats: [
      { value: "12+", label: "new clients/month avg" },
      { value: "68%", label: "less reliance on directory sites" },
      { value: "4.9★", label: "avg client rating maintained" },
    ],
    faqs: [
      {
        question: "How does LocalBeacon help therapists get clients outside of Psychology Today?",
        answer:
          "We build your Google Business Profile visibility, create local landing pages, and manage your reviews — so potential clients find your practice directly through Google search and Maps instead of scrolling through directory profiles where you blend in with everyone else.",
      },
      {
        question: "How do you handle review responses for mental health practices?",
        answer:
          "With the highest level of privacy sensitivity. Our AI never confirms or denies a therapeutic relationship, mentions diagnoses, references session content, or discusses treatment modalities. Responses are warm, professional, and fully HIPAA-mindful.",
      },
      {
        question: "What kind of content does LocalBeacon create for counseling practices?",
        answer:
          "Weekly posts on stress management, seasonal mental health topics, wellness tips, and destigmatizing messages. Content is written to be approachable and informative — never clinical or triggering. We help normalize seeking help.",
      },
      {
        question: "Can LocalBeacon help if I'm only on certain insurance panels?",
        answer:
          "Yes. We create landing pages that mention accepted insurance plans and target searches like 'therapist near me that takes Blue Cross.' This helps you attract clients who are specifically looking for in-network providers.",
      },
      {
        question: "How does this help me compete with BetterHelp and other telehealth platforms?",
        answer:
          "Telehealth platforms compete on convenience and price. LocalBeacon helps you compete on trust, personal connection, and local availability. Many clients prefer in-person therapy — they just need to find a local therapist they feel good about. That's where we help.",
      },
      {
        question: "I'm a solo practitioner. Is this worth it if I only need a few new clients per month?",
        answer:
          "Absolutely. Solo practitioners often benefit the most because a handful of consistent new clients per month fills your caseload. At $99/month, even one new client covers the cost many times over. And you can pause or cancel anytime.",
      },
      {
        question: "Will the content feel authentic to my practice's approach?",
        answer:
          "Our AI creates professional, general wellness content that's appropriate for any therapeutic orientation. It's designed to be warm and accessible — not to represent a specific modality. You always have the opportunity to review and adjust.",
      },
    ],
  },

  'cosmetic-dentists': {
    slug: 'cosmetic-dentists',
    name: 'Cosmetic Dentistry',
    plural: 'Cosmetic Dentists',
    headline: 'Smile makeovers start with being found.',
    subheadline: 'Veneers, whitening, bonding — patients search for cosmetic dentists specifically. LocalBeacon makes your aesthetic practice the one they book.',
    description: 'Local SEO for cosmetic dentists. Rank for veneers, teeth whitening, smile makeovers, and cosmetic dental procedures in your area.',
    painPoints: [
      { icon: '✨', title: 'Cosmetic patients research extensively before booking', text: 'Smile makeover patients compare 3-5 providers. Without before/after galleries, procedure-specific pages, and strong reviews, you lose to competitors who showcase their work better online.' },
      { icon: '💰', title: 'High-value procedures need premium positioning', text: 'Veneers and full-mouth restorations are $10K-$50K cases. Generic dental marketing does not attract these patients — they search specifically for cosmetic specialists.' },
      { icon: '📸', title: 'Social proof drives cosmetic decisions', text: 'Prospective patients want to see results. Without consistent content showcasing your aesthetic work and patient transformations, you are invisible to the cosmetic market.' },
    ],
    features: [
      { title: 'Procedure-specific landing pages', text: 'Dedicated pages for veneers, whitening, bonding, Invisalign, and smile design — each targeting the exact terms cosmetic patients search.' },
      { title: 'Before/after showcase optimization', text: 'Content that highlights your transformation results and positions your practice as the go-to aesthetic dentist in your area.' },
      { title: 'Premium patient review management', text: 'AI-drafted review responses that emphasize your cosmetic expertise and patient satisfaction — building the social proof that drives high-value bookings.' },
      { title: 'AI search optimization for cosmetic dental', text: 'Structured data so AI assistants recommend your practice when patients ask about cosmetic dental procedures near them.' },
    ],
    stats: [
      { value: '$8K+', label: 'avg cosmetic case value' },
      { value: '3.2×', label: 'more consultations within 60 days' },
      { value: '4.9★', label: 'avg review rating maintained' },
    ],
    faqs: [
      { question: 'How does LocalBeacon attract cosmetic dental patients specifically?', answer: 'We create procedure-specific content — veneers, whitening, smile makeovers — targeting the exact searches cosmetic patients make. These are higher-intent than general dental searches.' },
      { question: 'Can LocalBeacon help me compete with dental chains offering cosmetic services?', answer: 'Yes. We position your specialized cosmetic expertise, before/after results, and personalized approach — the differentiation that chains cannot replicate.' },
      { question: 'How do I market high-value procedures like full-mouth restorations?', answer: 'LocalBeacon creates educational content around complex procedures that builds trust and positions you as the expert — exactly what patients need before committing to $20K+ treatments.' },
      { question: 'Will this help me get more veneer consultations?', answer: 'Absolutely. Veneer-specific pages rank for "veneers near me," "porcelain veneers cost," and similar high-intent searches that drive consultation bookings.' },
      { question: 'How does cosmetic dental SEO differ from general dental SEO?', answer: 'Cosmetic patients search differently — they look for specific procedures, before/after results, and specialist credentials. Our content targets these unique search patterns rather than generic dental terms.' },
    ],
  },

  'pediatric-dentists': {
    slug: 'pediatric-dentists',
    name: 'Pediatric Dentistry',
    plural: 'Pediatric Dentists',
    headline: 'Parents search. Kids smile. You grow.',
    subheadline: 'Parents choose pediatric dentists online before their child ever sits in your chair. LocalBeacon makes your kid-friendly practice the obvious choice.',
    description: 'Local SEO for pediatric dental practices. Rank for kids dentist, children dental care, and pediatric dental services in your area.',
    painPoints: [
      { icon: '👶', title: 'Parents are extremely selective about children\'s dentists', text: 'Parents read more reviews and research more thoroughly for their kids than for themselves. Without strong parent-focused content and reviews, you lose to practices with better online presence.' },
      { icon: '🏫', title: 'School-age rushes create feast-or-famine scheduling', text: 'Back-to-school and summer checkup seasons create huge demand spikes while other months lag. Without year-round content, you lose the off-season patients to general dentists.' },
      { icon: '😰', title: 'Dental anxiety content drives parent decisions', text: 'Parents of anxious children specifically search for "gentle pediatric dentist" and "sedation dentistry for kids." Without addressing these fears in your content, you miss this high-value segment.' },
    ],
    features: [
      { title: 'Parent-focused content strategy', text: 'First visit guides, teething timelines, cavity prevention tips, and age-specific dental milestones posted to your Google listing to build trust with parents.' },
      { title: 'Kid-friendly practice pages', text: 'Pages highlighting your child-friendly environment, gentle approach, and fun atmosphere — the factors parents actually weigh when choosing.' },
      { title: 'School and seasonal campaign content', text: 'Automated back-to-school checkup reminders, sports mouthguard posts, and holiday candy dental tips that drive seasonal bookings.' },
      { title: 'Review responses for family practices', text: 'Warm, parent-appropriate review responses that reinforce your kid-friendly reputation and encourage other families to book.' },
    ],
    stats: [
      { value: '18+', label: 'new patient families/month' },
      { value: '85%', label: 'of parents check reviews first' },
      { value: '2.7×', label: 'more bookings during back-to-school' },
    ],
    faqs: [
      { question: 'How does LocalBeacon help pediatric practices specifically?', answer: 'We create parent-focused content — first visit guides, age-specific dental tips, gentle dentistry messaging — targeting how parents actually search for kids dentists.' },
      { question: 'Can you help with back-to-school marketing?', answer: 'Yes. Automated seasonal content pushes school checkup reminders, sports mouthguard posts, and summer scheduling content at the right times to fill your calendar.' },
      { question: 'How do I attract parents of children with dental anxiety?', answer: 'We create content around your gentle approach, sedation options, and kid-friendly environment — targeting the specific searches anxious parents make.' },
      { question: 'Will this help me get found for "kids dentist near me"?', answer: 'Absolutely. City-specific pages targeting "pediatric dentist in [city]" and "kids dentist near me" are core to what we build for your practice.' },
      { question: 'How do I compete with general dentists who also see children?', answer: 'LocalBeacon positions your specialized pediatric training, child-specific equipment, and kid-friendly environment — the expertise that general practices cannot match.' },
    ],
  },

  'emergency-dentists': {
    slug: 'emergency-dentists',
    name: 'Emergency Dentistry',
    plural: 'Emergency Dentists',
    headline: 'Toothaches search at 2 AM. Be there.',
    subheadline: 'Emergency dental patients need help now and will book the first practice they find. LocalBeacon ensures that practice is yours.',
    description: 'Local SEO for emergency dental practices. Rank for emergency dentist, same-day dental, toothache relief, and after-hours dental care.',
    painPoints: [
      { icon: '🚨', title: 'Emergency patients search and book within minutes', text: 'A patient with a cracked tooth at 9 PM will call the first result they find. If your after-hours availability is not prominently displayed, you lose these high-value urgent cases.' },
      { icon: '🕐', title: 'After-hours visibility requires always-on content', text: 'Most dental marketing targets business hours. Emergency searches peak evenings and weekends — you need content optimized for when patients actually have emergencies.' },
      { icon: '💵', title: 'Emergency cases are your highest-value walk-ins', text: 'Emergency patients pay premium rates and often convert to long-term patients. Without capturing this segment, you leave significant revenue to urgent care clinics and ERs.' },
    ],
    features: [
      { title: 'Emergency-specific landing pages', text: 'Dedicated pages for toothaches, cracked teeth, knocked-out teeth, and lost fillings — each targeting urgent search terms with clear calls to action.' },
      { title: 'After-hours availability optimization', text: 'Content that prominently features your evening, weekend, and same-day availability — the #1 factor in emergency dental decisions.' },
      { title: 'Urgent care comparison content', text: 'Pages explaining why an emergency dentist is better than the ER for dental emergencies — capturing patients who are unsure where to go.' },
      { title: 'Google Business Profile urgency signals', text: 'Posts highlighting same-day appointments, walk-in availability, and after-hours service that appear when patients search urgently.' },
    ],
    stats: [
      { value: '$450+', label: 'avg emergency visit value' },
      { value: '67%', label: 'convert to ongoing patients' },
      { value: '4.5×', label: 'more after-hours calls' },
    ],
    faqs: [
      { question: 'How does LocalBeacon capture emergency dental searches?', answer: 'We create condition-specific pages — toothache, broken tooth, abscess — with strong calls to action and your after-hours availability. Emergency patients search for symptoms, not practice names.' },
      { question: 'Can this help me rank for after-hours dental searches?', answer: 'Yes. We optimize your Google Business Profile and create content specifically targeting evening and weekend dental searches when competition is lowest and urgency is highest.' },
      { question: 'How do emergency dental patients typically find a dentist?', answer: 'Over 90% search on their phone with terms like "emergency dentist near me open now." LocalBeacon ensures your practice appears for these searches with clear availability information.' },
      { question: 'Will this help me convert emergency patients to regulars?', answer: 'Yes. Follow-up content and review management help turn one-time emergency visits into long-term patient relationships — the real value of emergency dental marketing.' },
      { question: 'How quickly can emergency dental pages start ranking?', answer: 'Emergency dental terms are highly local and specific. Most practices see new emergency inquiries within 2-4 weeks as pages index and your Google Business Profile strengthens.' },
    ],
  },

  'orthodontists': {
    slug: 'orthodontists',
    name: 'Orthodontics',
    plural: 'Orthodontists',
    headline: 'Straight teeth. Straighter path to patients.',
    subheadline: 'Invisalign, braces, retainers — orthodontic patients compare providers extensively. LocalBeacon makes your practice the top choice in your area.',
    description: 'Local SEO for orthodontic practices. Rank for Invisalign, braces, orthodontist near me, and teeth straightening services in your area.',
    painPoints: [
      { icon: '🦷', title: 'Invisalign providers are everywhere now', text: 'General dentists offering Invisalign means more competition. Without positioning your orthodontic specialty and advanced case experience, you blend in with everyone else.' },
      { icon: '🔍', title: 'Patients compare 4-5 orthodontists before choosing', text: 'Orthodontic treatment is a 12-24 month commitment. Patients research extensively — reading reviews, comparing technology, and checking credentials. Your online presence must win this comparison.' },
      { icon: '👨‍👩‍👧', title: 'You need both teen and adult patient pipelines', text: 'Adult orthodontics is the fastest-growing segment but requires different messaging than teen braces. Without dual-audience content, you capture only half your market.' },
    ],
    features: [
      { title: 'Treatment-specific landing pages', text: 'Dedicated pages for Invisalign, traditional braces, clear aligners, and retainers — each targeting the specific terms patients search when researching options.' },
      { title: 'Adult vs. teen orthodontic content', text: 'Separate content streams for adult patients (discreet options, professional concerns) and teen patients (school-friendly, sports-compatible) to capture both demographics.' },
      { title: 'Technology and credentials showcase', text: 'Content highlighting your digital scanning, 3D treatment planning, and orthodontic specialty training — the expertise that differentiates you from general dentists offering aligners.' },
      { title: 'Consultation-driving content strategy', text: 'Posts and pages designed to move patients from research to free consultation booking — with clear value propositions and social proof.' },
    ],
    stats: [
      { value: '$5K-$8K', label: 'avg treatment value' },
      { value: '2.8×', label: 'more consultation requests' },
      { value: '41%', label: 'of patients are now adults' },
    ],
    faqs: [
      { question: 'How does LocalBeacon help orthodontists compete with Invisalign providers?', answer: 'We position your orthodontic specialty, complex case expertise, and advanced training — the credentials that general dentists offering Invisalign cannot match. Patients who understand the difference choose specialists.' },
      { question: 'Can LocalBeacon help me attract more adult orthodontic patients?', answer: 'Yes. We create adult-specific content around discreet options, professional appearance concerns, and clear aligner technology that resonates with the adult market.' },
      { question: 'How do I market free consultations effectively?', answer: 'LocalBeacon creates consultation-focused content with clear value propositions — what patients will learn, what technology you use, and why your practice is worth visiting.' },
      { question: 'Will this help me rank above general dentists for Invisalign searches?', answer: 'Yes. Orthodontic specialty credentials, advanced case content, and comprehensive treatment pages give you a content advantage that general dental practices cannot easily replicate.' },
      { question: 'How does orthodontic SEO differ from general dental SEO?', answer: 'Orthodontic patients have longer research cycles and higher treatment values. Our content targets comparison-stage searches and positions your expertise for the extended decision-making process.' },
    ],
  },

  'sports-chiropractors': {
    slug: 'sports-chiropractors',
    name: 'Sports Chiropractic',
    plural: 'Sports Chiropractors',
    headline: 'Athletes heal faster when they find you first.',
    subheadline: 'Weekend warriors, high school athletes, and pros all search for sports-specific chiropractic care. LocalBeacon puts your practice in front of active patients.',
    description: 'Local SEO for sports chiropractors. Rank for sports injury chiropractic, athlete chiropractic care, and sports rehabilitation in your area.',
    painPoints: [
      { icon: '🏃', title: 'Athletes search for sports-specific chiropractors', text: 'General chiropractic listings do not attract athletes. They search "sports chiropractor" and "chiropractor for runners" — without sport-specific content, you miss these motivated patients.' },
      { icon: '🏫', title: 'Team and school partnerships need local credibility', text: 'High school and college teams want chiropractors with visible sports expertise. Your online presence must demonstrate sport-specific knowledge to win these referral relationships.' },
      { icon: '⚡', title: 'Injury-specific content drives urgent bookings', text: 'A runner with IT band pain searches for specific solutions. Without condition-specific content, you lose these patients to physical therapists or sports medicine clinics.' },
    ],
    features: [
      { title: 'Sport-specific condition pages', text: 'Pages for running injuries, CrossFit recovery, golf back pain, tennis elbow, and other sport-specific conditions that athletes actually search for.' },
      { title: 'Athletic performance content', text: 'Posts about mobility, recovery optimization, injury prevention, and performance enhancement that attract active patients beyond just pain relief.' },
      { title: 'Team and partnership credibility building', text: 'Content showcasing your work with local teams, athletes, and sporting events — building the credibility that drives referral relationships.' },
      { title: 'Active lifestyle community targeting', text: 'Local pages targeting gym communities, running clubs, CrossFit boxes, and sports leagues in your area — reaching athletes where they train.' },
    ],
    stats: [
      { value: '3.4×', label: 'more athlete patients in 90 days' },
      { value: '$120+', label: 'avg visit value' },
      { value: '78%', label: 'of athletes prefer sport-specific care' },
    ],
    faqs: [
      { question: 'How does LocalBeacon attract athletes to my chiropractic practice?', answer: 'We create sport-specific content — running injuries, CrossFit recovery, golf mobility — targeting the exact searches active patients make when they need specialized care.' },
      { question: 'Can this help me get team referral partnerships?', answer: 'Yes. Strong online presence with sports-specific credentials and athlete testimonials builds the credibility coaches and athletic directors look for when choosing team chiropractors.' },
      { question: 'How do I differentiate from general chiropractors?', answer: 'LocalBeacon positions your sports-specific training, athletic recovery protocols, and performance optimization expertise — the specialization that active patients specifically seek.' },
      { question: 'Will this help me compete with sports medicine clinics?', answer: 'Yes. We create content positioning chiropractic care as complementary to — and in many cases preferable to — traditional sports medicine for specific conditions, capturing patients at the research stage.' },
      { question: 'How does sports chiropractic SEO differ from general chiropractic?', answer: 'Athletes search by condition and sport, not just "chiropractor near me." Our content targets these specific searches and positions your sports expertise for higher-intent patients.' },
    ],
  },

  'emergency-vets': {
    slug: 'emergency-vets',
    name: 'Emergency Veterinary Care',
    plural: 'Emergency Vets',
    headline: 'Panicked pet owners search fast. Be first.',
    subheadline: 'When a pet is hurt at midnight, owners grab their phone. LocalBeacon ensures your emergency vet clinic is the first result they find.',
    description: 'Local SEO for emergency veterinary clinics. Rank for emergency vet, 24-hour animal hospital, and after-hours pet care in your area.',
    painPoints: [
      { icon: '🐾', title: 'Pet emergencies happen outside business hours', text: 'Most pet emergencies occur evenings and weekends when regular vets are closed. Without after-hours visibility, panicked pet owners end up at competitors or drive 30+ minutes to find help.' },
      { icon: '📱', title: 'Pet owners search on phones in crisis mode', text: 'A pet owner with a choking dog is not comparing websites carefully. They call the first result. If your emergency availability is not immediately visible, you lose that call.' },
      { icon: '💔', title: 'One bad experience review can devastate emergency vet reputation', text: 'Emergency vet reviews carry extreme emotional weight. One unmanaged negative review from a grieving pet owner can overshadow dozens of positive outcomes.' },
    ],
    features: [
      { title: 'Emergency condition landing pages', text: 'Pages for pet poisoning, trauma, breathing difficulties, and seizures — targeting the frantic symptom-based searches pet owners make during emergencies.' },
      { title: '24/7 availability signals', text: 'Google Business Profile optimization with after-hours, overnight, and holiday availability prominently displayed for urgent searches.' },
      { title: 'Compassionate review management', text: 'AI-drafted responses that handle emotional reviews with empathy — acknowledging grief while protecting your reputation professionally.' },
      { title: 'Urgent care vs. ER education content', text: 'Content helping pet owners understand when to seek emergency care vs. waiting for their regular vet — positioning your clinic as the trusted authority.' },
    ],
    stats: [
      { value: '$800+', label: 'avg emergency visit value' },
      { value: '24/7', label: 'visibility optimization' },
      { value: '3.6×', label: 'more after-hours calls' },
    ],
    faqs: [
      { question: 'How does LocalBeacon help emergency vet clinics get found?', answer: 'We create symptom-specific and condition-specific pages that match how panicked pet owners actually search — "dog ate chocolate," "cat not breathing," "pet hit by car" — with clear emergency contact information.' },
      { question: 'Can you help manage emotionally charged reviews?', answer: 'Yes. Our AI drafts compassionate responses that acknowledge the emotional weight of pet emergencies while professionally representing your care quality.' },
      { question: 'How do I rank for after-hours pet emergency searches?', answer: 'We optimize your Google Business Profile with 24/7 hours, create after-hours specific content, and ensure your emergency availability appears prominently in all search results.' },
      { question: 'Will this help me attract cases from regular vets who are closed?', answer: 'Absolutely. Content explaining when to seek emergency care and pages targeting "vet open now" and "after hours vet near me" capture patients whose regular vets are unavailable.' },
      { question: 'How do I handle negative reviews from grieving pet owners?', answer: 'Our review management drafts empathetic, professional responses that honor the pet owner grief while gently noting the quality of care provided — protecting your reputation without being defensive.' },
    ],
  },

  'cosmetic-dermatology': {
    slug: 'cosmetic-dermatology',
    name: 'Cosmetic Dermatology',
    plural: 'Cosmetic Dermatologists',
    headline: 'Beautiful skin. Beautiful search rankings.',
    subheadline: 'Botox, fillers, laser treatments — cosmetic dermatology patients research extensively online. LocalBeacon makes your practice the one they choose.',
    description: 'Local SEO for cosmetic dermatology practices. Rank for Botox, dermal fillers, laser skin treatments, and cosmetic dermatology near me.',
    painPoints: [
      { icon: '💉', title: 'Med spas are eating your cosmetic market share', text: 'Non-physician med spas now offer Botox and fillers at lower prices. Without positioning your dermatologist credentials and medical expertise, you lose patients to less qualified providers.' },
      { icon: '🔬', title: 'Patients cannot distinguish dermatologists from aestheticians online', text: 'Search results mix board-certified dermatologists with day spas and nurse injectors. Without credential-forward content, patients do not understand why your expertise commands premium pricing.' },
      { icon: '📊', title: 'Cosmetic patients compare 5+ providers before booking', text: 'High-value cosmetic patients research extensively. Without strong content, before/after showcases, and reviews, you lose to competitors with better online marketing.' },
    ],
    features: [
      { title: 'Treatment-specific landing pages', text: 'Dedicated pages for Botox, fillers, chemical peels, laser resurfacing, and microneedling — each targeting the exact procedures patients search for.' },
      { title: 'Medical credentials differentiation', text: 'Content positioning your board certification, residency training, and medical expertise — the credentials that separate you from non-physician cosmetic providers.' },
      { title: 'Premium patient review management', text: 'Review responses that reinforce your medical expertise and patient care quality — building the social proof that drives high-value cosmetic bookings.' },
      { title: 'Procedure education content', text: 'Posts explaining treatment options, recovery timelines, and expected results that build trust and move patients from research to consultation.' },
    ],
    stats: [
      { value: '$2K+', label: 'avg cosmetic treatment value' },
      { value: '3.1×', label: 'more consultation bookings' },
      { value: '89%', label: 'research online before booking' },
    ],
    faqs: [
      { question: 'How does LocalBeacon help cosmetic dermatologists compete with med spas?', answer: 'We position your board certification, medical training, and clinical expertise — the qualifications that med spas and nurse injectors cannot match. Patients who understand the difference choose dermatologists.' },
      { question: 'Can LocalBeacon help me attract Botox patients specifically?', answer: 'Yes. We create Botox-specific pages targeting "Botox near me," "Botox cost," and "best Botox injector" — the high-intent searches that drive consultation bookings.' },
      { question: 'How do I market premium pricing for cosmetic procedures?', answer: 'Content emphasizing your medical credentials, safety protocols, and superior outcomes justifies premium pricing — patients learn why a dermatologist is worth more than a med spa.' },
      { question: 'Will this help me rank for specific cosmetic procedures?', answer: 'Yes. Procedure-specific pages target the exact terms patients search — chemical peels, microneedling, laser treatments — each optimized for your local market.' },
      { question: 'How does cosmetic dermatology SEO differ from medical dermatology?', answer: 'Cosmetic patients search by procedure name and compare providers extensively. Our content targets these procedure-specific, comparison-stage searches rather than medical condition terms.' },
    ],
  },

  'marriage-counselors': {
    slug: 'marriage-counselors',
    name: 'Marriage Counseling',
    plural: 'Marriage Counselors',
    headline: 'Couples search quietly. Be there when they do.',
    subheadline: 'Finding a marriage counselor is deeply personal. LocalBeacon ensures your practice appears when couples are ready to take that first step.',
    description: 'Local SEO for marriage counselors and couples therapists. Rank for marriage counseling, couples therapy, and relationship counseling in your area.',
    painPoints: [
      { icon: '💑', title: 'Couples delay seeking help — then search urgently', text: 'Most couples wait 6 years before seeking counseling. When they finally search, they want to book quickly. If your availability and approach are not immediately clear, they book someone else.' },
      { icon: '🤫', title: 'Privacy concerns limit word-of-mouth referrals', text: 'Couples rarely ask friends for marriage counselor recommendations. They search privately on their phones. Without strong search presence, you miss this entire referral-less market.' },
      { icon: '🎯', title: 'Specialization drives couples counseling decisions', text: 'Couples search for specific approaches — Gottman, EFT, affair recovery. Without modality-specific content, you appear generic when couples want a specialist.' },
    ],
    features: [
      { title: 'Approach-specific landing pages', text: 'Pages for Gottman Method, Emotionally Focused Therapy, affair recovery, and premarital counseling — each targeting the specific approaches couples research.' },
      { title: 'Privacy-forward practice content', text: 'Content emphasizing confidentiality, comfortable office environment, and telehealth options that address the privacy concerns couples have when seeking help.' },
      { title: 'Relationship education content strategy', text: 'Posts about communication skills, conflict resolution, and relationship health that build trust and position you as an approachable expert.' },
      { title: 'Sensitive review management', text: 'AI-drafted responses that maintain client confidentiality while professionally addressing feedback — critical for the sensitive nature of couples therapy.' },
    ],
    stats: [
      { value: '$150-$250', label: 'avg session rate' },
      { value: '2.4×', label: 'more initial consultations' },
      { value: '91%', label: 'search privately online first' },
    ],
    faqs: [
      { question: 'How does LocalBeacon help marriage counselors get clients?', answer: 'Couples search privately and do not ask for referrals. We create approach-specific, condition-specific content that appears when couples are ready to book — capturing clients who would otherwise never find you.' },
      { question: 'Can LocalBeacon help me attract couples seeking specific therapy approaches?', answer: 'Yes. We create pages for Gottman, EFT, affair recovery, and other modalities — targeting couples who research specific approaches before choosing a counselor.' },
      { question: 'How do I market sensitive services like affair recovery?', answer: 'Our content is written with appropriate sensitivity — normalizing the process of seeking help while positioning your expertise for couples in crisis.' },
      { question: 'Will telehealth-focused content help my practice?', answer: 'Absolutely. Telehealth couples counseling searches are growing rapidly. We create content targeting couples who prefer the privacy and convenience of virtual sessions.' },
      { question: 'How do I handle reviews for a marriage counseling practice?', answer: 'Our AI drafts generic, warm responses that never reference treatment details — essential for maintaining the strict confidentiality couples therapy requires.' },
    ],
  },

  'anxiety-therapists': {
    slug: 'anxiety-therapists',
    name: 'Anxiety Therapy',
    plural: 'Anxiety Therapists',
    headline: 'Anxious clients search at 3 AM. Be found.',
    subheadline: 'People struggling with anxiety often research therapists late at night. LocalBeacon ensures your practice is visible when they are ready to reach out.',
    description: 'Local SEO for anxiety therapists and counselors. Rank for anxiety treatment, panic attack therapy, and anxiety counselor near me.',
    painPoints: [
      { icon: '😰', title: 'Anxiety patients search during off-hours', text: 'Anxiety and panic sufferers often research therapists during anxiety episodes — late at night or early morning. Without always-on content, you miss these vulnerable, high-intent searchers.' },
      { icon: '🧠', title: 'CBT and exposure therapy searches are highly specific', text: 'Anxiety patients research specific modalities. Without pages for CBT, exposure therapy, and EMDR, you appear generic when patients want evidence-based, specialized treatment.' },
      { icon: '📱', title: 'Online therapy competition is fierce', text: 'BetterHelp and Talkspace ads dominate anxiety searches. Without strong local positioning, patients choose app-based therapy over your in-person expertise.' },
    ],
    features: [
      { title: 'Condition-specific anxiety pages', text: 'Pages for generalized anxiety, social anxiety, panic disorder, OCD, and phobias — each targeting the specific conditions patients search when seeking specialized help.' },
      { title: 'Treatment modality content', text: 'CBT, exposure therapy, EMDR, and mindfulness-based content that demonstrates your evidence-based approach and attracts patients seeking specific treatments.' },
      { title: 'Anti-stigma educational content', text: 'Blog posts and Google Business Profile content normalizing anxiety treatment and reducing barriers to booking — helping patients take that difficult first step.' },
      { title: 'Telehealth and in-person flexibility content', text: 'Content highlighting both virtual and in-person options — competing with online therapy apps while emphasizing the advantages of local, personalized care.' },
    ],
    stats: [
      { value: '40M+', label: 'Americans with anxiety disorders' },
      { value: '2.9×', label: 'more intake calls within 60 days' },
      { value: '73%', label: 'research treatment options online' },
    ],
    faqs: [
      { question: 'How does LocalBeacon help anxiety therapists get more clients?', answer: 'We create condition-specific content — generalized anxiety, panic disorder, social anxiety — targeting the exact searches people make when they decide to seek help. These are high-intent, ready-to-book patients.' },
      { question: 'Can LocalBeacon help me compete with BetterHelp and online therapy apps?', answer: 'Yes. We position your local expertise, personalized approach, and in-person availability — the advantages that app-based therapy cannot match for patients who want real connection.' },
      { question: 'How do I attract patients seeking specific anxiety treatments like CBT?', answer: 'We create modality-specific pages that target searches like "CBT therapist near me" and "exposure therapy for anxiety" — attracting patients who have already researched and want your specific expertise.' },
      { question: 'Will content about anxiety reduce stigma and increase bookings?', answer: 'Yes. Educational content normalizes seeking help and reduces the barrier to booking. Patients who feel understood by your content are far more likely to make that first call.' },
      { question: 'How quickly will anxiety therapy pages start generating leads?', answer: 'Anxiety-related searches are high-volume and local. Most therapists see new inquiries within 30-45 days, with steady growth as your content library and reviews build authority.' },
    ],
  },
}
