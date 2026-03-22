export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { generateText } from '@/lib/anthropic-client'
import { buildPromptContext, getToneForCategory } from '@/lib/prompt-context'

const MAX_PAGES_PER_BUSINESS = 3

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || req.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })

  // Get all solo/agency users
  const { data: users } = await supabase
    .from('users')
    .select('id, clerk_id, plan')
    .in('plan', ['solo', 'agency'])

  if (!users?.length) return NextResponse.json({ generated: 0 })

  let generated = 0
  let skipped = 0

  for (const user of users) {
    try {
      // Get user's businesses with all needed fields
      const { data: businesses } = await supabase
        .from('businesses')
        .select('id, name, category, primary_city, service_areas, specialties, description, contact_email')
        .eq('user_id', user.id)

      for (const biz of businesses || []) {
        // Skip if no contact email or no service areas
        if (!biz.contact_email || !Array.isArray(biz.service_areas) || biz.service_areas.length === 0) {
          skipped++
          continue
        }

        // Get cities that already have service pages for this business
        const { data: existingPages } = await supabase
          .from('content_items')
          .select('metadata')
          .eq('business_id', biz.id)
          .eq('type', 'service_page')

        const coveredCities = new Set<string>(
          (existingPages || [])
            .map((p) => (p.metadata as { city?: string })?.city)
            .filter(Boolean) as string[]
        )

        // Find cities not yet covered
        const uncoveredCities = (biz.service_areas as string[]).filter(
          (city) => !coveredCities.has(city)
        )

        if (uncoveredCities.length === 0) continue

        // Generate up to MAX_PAGES_PER_BUSINESS new city pages
        const citiesToGenerate = uncoveredCities.slice(0, MAX_PAGES_PER_BUSINESS)

        const promptCtx = buildPromptContext({
          name: biz.name || '',
          category: biz.category || '',
          primary_city: biz.primary_city || '',
          service_areas: Array.isArray(biz.service_areas) ? biz.service_areas : [],
          specialties: Array.isArray(biz.specialties) ? biz.specialties : [],
          description: biz.description || '',
        })

        const tone = getToneForCategory(biz.category || '')

        for (const city of citiesToGenerate) {
          const prompt = `You are an expert local SEO copywriter. Write an SEO-optimized service area page for a local business serving ${city}.

${promptCtx}
Target City: ${city}

Write a complete service area page with:
1. An H1 headline that includes the business name and city
2. A compelling intro paragraph (2-3 sentences) about serving ${city}
3. A "Why Choose Us" section with 3-4 bullet points highlighting local expertise
4. A services section listing what they offer in ${city}
5. A local trust section mentioning ${city} community ties
6. A clear call-to-action paragraph

Guidelines:
- Tone: ${tone}
- Include the city name naturally throughout (avoid keyword stuffing)
- Keep content under 600 words
- Write in plain text with markdown headings (## for h2, ### for h3)
- Do NOT include HTML tags
- Do NOT include a meta description block — just the page body content`

          const result = await generateText(prompt, {
            maxTokens: 1200,
            system: 'You write concise, SEO-optimized local service area pages for small businesses. Return only the page content in markdown format.',
          })

          if (!result.success || !result.text) {
            console.error(JSON.stringify({
              event: 'city_page_generation_failed',
              businessId: biz.id,
              city,
              error: result.error,
              timestamp: new Date().toISOString(),
            }))
            continue
          }

          const title = `${biz.name} – Serving ${city}`

          const { error: insertError } = await supabase
            .from('content_items')
            .insert({
              business_id: biz.id,
              type: 'service_page',
              status: 'draft',
              title,
              content: result.text,
              metadata: { city },
            })

          if (insertError) {
            console.error(JSON.stringify({
              event: 'city_page_insert_failed',
              businessId: biz.id,
              city,
              error: insertError.message,
              timestamp: new Date().toISOString(),
            }))
          } else {
            generated++
            console.log(JSON.stringify({
              event: 'city_page_generated',
              businessId: biz.id,
              businessName: biz.name,
              city,
              timestamp: new Date().toISOString(),
            }))
          }
        }
      }
    } catch (err) {
      console.error(`City pages cron failed for user ${user.clerk_id}:`, err)
    }
  }

  return NextResponse.json({ generated, skipped })
}
