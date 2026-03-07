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

  chiropractors: {
    slug: "chiropractors",
    name: "Chiropractic",
    plural: "Chiropractors",
    headline: "Attract patients who already believe in chiropractic care.",
    subheadline:
      "LocalBeacon puts your practice in front of people actively searching for drug-free pain relief — not skeptics you have to convince.",
    description:
      "AI-powered local marketing for chiropractic practices. Automated Google Business Profile posts, city-specific landing pages, review management, and AI search optimization built for chiropractors.",
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
        text: "When someone asks an AI assistant \"chiropractor near me for lower back pain,\" your structured data and consistent content help your practice surface in AI-generated answers.",
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
      "AI-powered local marketing for optometry practices. Automated Google Business Profile posts, city-specific practice pages, review management, and AI search optimization built for optometrists.",
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
      "AI-powered local marketing for veterinary practices. Automated Google Business Profile posts, city-specific clinic pages, review management, and AI search optimization built for veterinarians.",
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
        text: "When someone asks an AI assistant \"best vet near me for a new puppy,\" your structured data and consistent local content help your practice appear in AI-generated recommendations.",
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
      "AI-powered local marketing for physical therapy clinics. Automated Google Business Profile posts, city-specific clinic pages, review management, and AI search optimization built for physical therapists.",
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
      "AI-powered local marketing for dermatology practices. Automated Google Business Profile posts, city-specific practice pages, review management, and AI search optimization built for dermatologists.",
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
      "AI-powered local marketing for pediatric practices. Automated Google Business Profile posts, city-specific practice pages, review management, and AI search optimization built for pediatricians.",
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
          "Yes. Our Agency plan supports practices with multiple providers and locations. Each location gets its own Google Business Profile management, local pages, and tailored content.",
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
      "AI-powered local marketing for mental health counselors and therapists. Automated Google Business Profile posts, city-specific practice pages, review management, and AI search optimization built for counseling practices.",
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
        text: "When someone asks an AI assistant \"therapist near me who specializes in anxiety,\" your structured data and consistent content help your practice appear in AI-generated recommendations.",
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
          "Absolutely. Solo practitioners often benefit the most because a handful of consistent new clients per month fills your caseload. At $49/month, even one new client covers the cost many times over. And you can pause or cancel anytime.",
      },
      {
        question: "Will the content feel authentic to my practice's approach?",
        answer:
          "Our AI creates professional, general wellness content that's appropriate for any therapeutic orientation. It's designed to be warm and accessible — not to represent a specific modality. You always have the opportunity to review and adjust.",
      },
    ],
  },
}
