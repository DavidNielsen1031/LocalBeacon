import { createServerClient } from '@/lib/supabase'

export interface BusinessContext {
  name: string
  category: string
  primary_city: string
  service_areas: string[]
  specialties: string[]
  description: string
}

const PROFESSIONAL_CATEGORIES = ['law', 'legal', 'dental', 'medical', 'accounting', 'financial']
const FRIENDLY_CATEGORIES = ['restaurant', 'cafe', 'retail', 'salon', 'spa', 'fitness']
const EXPERT_CATEGORIES = ['plumbing', 'hvac', 'electrical', 'roofing', 'construction', 'auto', 'landscaping']

export function getToneForCategory(category: string): string {
  const lower = (category || '').toLowerCase()

  if (PROFESSIONAL_CATEGORIES.some(c => lower.includes(c))) {
    return 'Professional and authoritative'
  }
  if (FRIENDLY_CATEGORIES.some(c => lower.includes(c))) {
    return 'Friendly and welcoming'
  }
  if (EXPERT_CATEGORIES.some(c => lower.includes(c))) {
    return 'Expert and helpful (trades/home services category)'
  }
  return 'Professional and authoritative'
}

export function buildPromptContext(ctx: BusinessContext): string {
  const serviceAreasStr = ctx.service_areas?.length
    ? ctx.service_areas.join(', ')
    : ctx.primary_city

  const specialtiesStr = ctx.specialties?.length
    ? ctx.specialties.join(', ')
    : 'General services'

  const tone = getToneForCategory(ctx.category)

  const lines: string[] = [
    `Business: ${ctx.name}`,
    `Category: ${ctx.category}`,
    `Location: ${ctx.primary_city}`,
    `Service Areas: ${serviceAreasStr}`,
    `Specialties: ${specialtiesStr}`,
  ]

  if (ctx.description) {
    lines.push(`Description: ${ctx.description}`)
  }

  lines.push(`Tone: ${tone}`)

  return lines.join('\n')
}

export async function getBusinessContext(clerkUserId: string, businessId?: string): Promise<BusinessContext | null> {
  try {
    const supabase = createServerClient()
    if (!supabase) return null

    // clerk_id → users.id
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', clerkUserId)
      .single()

    if (userError || !user) return null

    // Fetch specific business if businessId provided, otherwise fall back to first business
    let query = supabase
      .from('businesses')
      .select('name, category, primary_city, service_areas, specialties, description')
      .eq('user_id', user.id)

    if (businessId) {
      query = query.eq('id', businessId)
    }

    const { data: business, error: bizError } = await query.single()

    if (bizError || !business) return null

    return {
      name: business.name || '',
      category: business.category || '',
      primary_city: business.primary_city || '',
      service_areas: Array.isArray(business.service_areas) ? business.service_areas : [],
      specialties: Array.isArray(business.specialties) ? business.specialties : [],
      description: business.description || '',
    }
  } catch {
    return null
  }
}
