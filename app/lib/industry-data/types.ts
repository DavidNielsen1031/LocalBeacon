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
