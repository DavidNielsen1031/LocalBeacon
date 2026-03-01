export type Plan = 'free' | 'solo' | 'agency'
export type PostType = 'whats_new' | 'offer' | 'event' | 'product'
export type ContentStatus = 'draft' | 'approved' | 'published'

export interface Business {
  id: string
  user_id: string
  name: string
  category: string
  primary_city: string
  primary_state: string
  service_areas: string[]
  phone: string
  website?: string
  gbp_connected: boolean
  gbp_account_id?: string
  created_at: string
}

export interface ContentItem {
  id: string
  business_id: string
  type: 'gbp_post' | 'service_page' | 'review_response' | 'blog_post'
  status: ContentStatus
  title: string
  body: string
  metadata: Record<string, unknown>
  published_at?: string
  created_at: string
}

export interface Review {
  id: string
  business_id: string
  gbp_review_id?: string
  author: string
  rating: number
  comment: string
  responded: boolean
  response_draft?: string
  created_at: string
}

export interface User {
  id: string
  clerk_id: string
  email: string
  plan: Plan
  stripe_customer_id?: string
  stripe_subscription_id?: string
  created_at: string
}
