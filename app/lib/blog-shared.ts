export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  category: 'aeo' | 'seo' | 'local-marketing' | 'industry-tips' | 'case-studies'
  industry: string
  author: string
  content: string
  readingTime: number
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  description: string
  category: BlogPost['category']
  industry: string
  author: string
  readingTime: number
  draft?: boolean
}

export const CATEGORY_LABELS: Record<BlogPost['category'], string> = {
  'aeo': 'Answer Engine Optimization',
  'seo': 'SEO',
  'local-marketing': 'Local Marketing',
  'industry-tips': 'Industry Tips',
  'case-studies': 'Case Studies',
}
