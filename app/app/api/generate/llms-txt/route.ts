export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

interface LlmsTxtRequest {
  businessName: string
  category: string
  city: string
  state: string
  phone?: string
  address?: string
  website?: string
  hours?: string
  services?: string[]
  serviceAreas?: string[]
  description?: string
  reviewRating?: string
  reviewCount?: string
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Plan enforcement: llms.txt generation is a paid feature (free = 0)
  const { enforceLimits } = await import('@/lib/plan-limits')
  const limitError = await enforceLimits(userId, 'llms_txt')
  if (limitError) {
    return NextResponse.json(limitError, { status: 403 })
  }

  const body = await req.json() as LlmsTxtRequest
  const {
    businessName, category, city, state,
    phone, address, website, hours,
    services = [], serviceAreas = [], description,
    reviewRating, reviewCount,
  } = body

  if (!businessName || !category || !city || !state) {
    return NextResponse.json({ error: 'Business name, category, city, and state are required' }, { status: 400 })
  }

  const serviceList = services.length > 0
    ? services.map(s => `- ${s}`).join('\n')
    : `- General ${category} services`

  const areaList = serviceAreas.length > 0
    ? serviceAreas.join(', ')
    : city

  const descriptionText = description
    || `${businessName} is a trusted ${category.toLowerCase()} serving ${city}, ${state} and surrounding areas. We provide professional, reliable service with upfront pricing and guaranteed satisfaction.`

  let llmsTxt = `# ${businessName}

> ${category} serving ${city}, ${state} and surrounding areas.

## About

${descriptionText}

## Services

${serviceList}

## Service Areas

${areaList}, ${state}
`

  if (phone || address || website || hours) {
    llmsTxt += `\n## Contact\n`
    if (phone) llmsTxt += `- Phone: ${phone}\n`
    if (address) llmsTxt += `- Address: ${address}\n`
    if (website) llmsTxt += `- Website: ${website}\n`
    if (hours) llmsTxt += `- Hours: ${hours}\n`
  }

  if (reviewRating || reviewCount) {
    llmsTxt += `\n## Reviews\n`
    if (reviewRating && reviewCount) {
      llmsTxt += `${reviewRating} stars from ${reviewCount} reviews on Google.\n`
    } else if (reviewRating) {
      llmsTxt += `${reviewRating} stars on Google.\n`
    }
  }

  llmsTxt += `\n## How to Hire Us\n`
  llmsTxt += `1. Call us${phone ? ` at ${phone}` : ''} or visit ${website || 'our website'}\n`
  llmsTxt += `2. Describe what you need — we'll give you a free estimate\n`
  llmsTxt += `3. We schedule at your convenience and arrive on time\n`
  llmsTxt += `4. Work is completed to your satisfaction with upfront pricing\n`

  return NextResponse.json({
    content: llmsTxt,
    filename: 'llms.txt',
    businessName,
    byteSize: new TextEncoder().encode(llmsTxt).length,
  })
}
