'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { useBusinessContext } from '@/components/business-context'
import { UpgradeGate } from '@/components/upgrade-gate'
import { posthog } from '@/lib/posthog'

function generateLocalBusinessSchema(biz: {
  name: string
  address?: string
  phone: string
  website?: string
  description?: string
  specialties?: string
  service_areas: string[]
  primary_city: string
  primary_state: string
  category: string
}) {
  const services = biz.specialties
    ? biz.specialties.split(',').map((s) => s.trim()).filter(Boolean)
    : [biz.category]

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": biz.name,
    ...(biz.description ? { "description": biz.description } : {}),
    "telephone": biz.phone,
    ...(biz.website ? { "url": biz.website } : {}),
    ...(biz.address ? {
      "address": {
        "@type": "PostalAddress",
        "streetAddress": biz.address,
        "addressLocality": biz.primary_city,
        "addressRegion": biz.primary_state,
        "addressCountry": "US"
      }
    } : {}),
    ...(biz.service_areas.length > 0 ? {
      "areaServed": biz.service_areas.map((a) => ({
        "@type": "City",
        "name": a
      }))
    } : {}),
    ...(services.length > 0 ? {
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services",
        "itemListElement": services.map((s) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": s
          }
        }))
      }
    } : {})
  }
}

function generateFAQSchema(biz: {
  name: string
  category: string
  primary_city: string
  primary_state: string
  specialties?: string
}) {
  const services = biz.specialties
    ? biz.specialties.split(',').map((s) => s.trim()).filter(Boolean)
    : [biz.category]
  const topService = services[0] || biz.category

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much does ${topService.toLowerCase()} cost in ${biz.primary_city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Pricing for ${topService.toLowerCase()} in ${biz.primary_city}, ${biz.primary_state} varies by project scope. Contact ${biz.name} for a free estimate tailored to your needs.`
        }
      },
      {
        "@type": "Question",
        "name": `Is ${biz.name} licensed and insured in ${biz.primary_state}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, ${biz.name} is a licensed and insured ${biz.category.toLowerCase()} serving ${biz.primary_city} and surrounding areas.`
        }
      },
      {
        "@type": "Question",
        "name": `What areas does ${biz.name} serve?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${biz.name} serves ${biz.primary_city}, ${biz.primary_state} and surrounding communities. Contact us to confirm service in your area.`
        }
      }
    ]
  }
}

function generateServiceSchema(biz: {
  name: string
  specialties?: string
  category: string
  service_areas: string[]
  primary_city: string
  primary_state: string
}) {
  const services = biz.specialties
    ? biz.specialties.split(',').map((s) => s.trim()).filter(Boolean)
    : [biz.category]

  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service,
    "provider": {
      "@type": "LocalBusiness",
      "name": biz.name
    },
    "areaServed": (biz.service_areas.length > 0 ? biz.service_areas : [biz.primary_city]).map((a) => ({
      "@type": "City",
      "name": a
    }))
  }))
}

const DEMO_BUSINESS = {
  name: "Thompson Plumbing & Heating",
  address: "123 Main St, Burnsville, MN 55337",
  phone: "(952) 555-0123",
  website: "https://thompsonplumbing.com",
  description: "Licensed plumbing and heating contractor serving Burnsville and the south metro since 1998.",
  specialties: "Plumbing Repair, Water Heater Installation, Drain Cleaning, AC Repair, Furnace Maintenance",
  service_areas: ["Burnsville", "Apple Valley", "Eagan", "Lakeville", "Prior Lake"],
  primary_city: "Burnsville",
  primary_state: "MN",
  category: "Plumbing",
}

export default function SchemaPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'business' | 'faq' | 'services'>('business')
  const { activeBusiness, plan } = useBusinessContext()

  // Use real business data if available, fall back to demo
  const biz = activeBusiness
    ? {
        name: activeBusiness.name,
        address: activeBusiness.address,
        phone: activeBusiness.phone,
        website: activeBusiness.website,
        description: activeBusiness.description,
        specialties: activeBusiness.specialties,
        service_areas: activeBusiness.service_areas || [],
        primary_city: activeBusiness.primary_city,
        primary_state: activeBusiness.primary_state,
        category: activeBusiness.category,
      }
    : DEMO_BUSINESS

  const isDemo = !activeBusiness

  const localBiz = generateLocalBusinessSchema(biz)
  const faq = generateFAQSchema(biz)
  const services = generateServiceSchema(biz)

  const schemas = {
    business: { label: 'Local Business', data: localBiz, desc: 'Tells Google your name, address, phone, hours, and services. This is the foundation.' },
    faq: { label: 'FAQ', data: faq, desc: 'Helps your FAQ answers appear directly in Google search results.' },
    services: { label: 'Services', data: services, desc: 'Lists each service you offer so Google can match you to specific searches.' },
  }

  const active = schemas[activeTab]
  const scriptTag = `<script type="application/ld+json">\n${JSON.stringify(active.data, null, 2)}\n</script>`

  const handleCopy = (type: string) => {
    navigator.clipboard.writeText(scriptTag)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
    try { posthog.capture('tool_used', { tool: 'schema' }) } catch {}
  }



  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#2D3436] mb-2">Schema Markup</h1>
        <p className="text-[#636E72]">Copy these code snippets into your website to help Google understand your business better. Just paste into your site footer.</p>
      </div>

      {isDemo && (
        <div className="bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-xl p-4 mb-6">
          <p className="text-[#FF6B35] text-sm font-medium">👋 Demo mode — showing example data</p>
          <p className="text-[#636E72] text-xs mt-1">Add your business in Settings to generate schema markup personalized to your actual business.</p>
        </div>
      )}

      {/* What is this */}
      <div className="bg-white border border-[#FF6B35]/20 rounded-xl p-5 mb-8">
        <h2 className="text-[#FF6B35] font-semibold mb-2">💡 What is Schema Markup?</h2>
        <p className="text-[#636E72] text-sm leading-relaxed">
          Schema markup is a small piece of code that tells Google exactly what your business does, where you&apos;re located,
          and what services you offer. It&apos;s like giving Google a cheat sheet about your business. Businesses with schema markup
          can get <span className="text-[#1B2A4A] font-semibold">rich results</span> in search — showing your rating, hours, and services right in the search listing.
          <br /><br />
          <span className="text-[#636E72]">How to use it:</span> Copy the code below and paste it into your website&apos;s footer (or ask your web person to do it). That&apos;s it — one time, and you&apos;re done.
        </p>
      </div>

      {/* Tab selector */}
      <div className="flex gap-2 mb-6">
        {(Object.keys(schemas) as Array<keyof typeof schemas>).map(key => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === key
                ? 'bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/30'
                : 'text-[#636E72] border border-[#DFE6E9] hover:border-[#DFE6E9]'
            }`}
          >
            {schemas[key].label}
          </button>
        ))}
      </div>

      {/* Schema display */}
      <UpgradeGate
        feature="Schema Markup Generator"
        currentPlan={plan}
        requiredPlan="solo"
        previewMode="blur"
        suggestDfy={true}
        dfyContext="Don't want to touch code? Our team installs this for you."
      >
        <div className="bg-white border border-[#DFE6E9] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[#DFE6E9]">
            <div>
              <h3 className="text-[#1B2A4A] font-medium">{active.label} Schema</h3>
              <p className="text-[#636E72] text-xs mt-0.5">{active.desc}</p>
            </div>
            <button
              onClick={() => handleCopy(activeTab)}
              className="bg-[#FF6B35] text-black font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#FF6B35]/90 transition-all"
            >
              {copied === activeTab ? '✓ Copied!' : 'Copy Code'}
            </button>
          </div>
          <pre className="p-4 text-sm text-green-400/80 overflow-x-auto leading-relaxed" style={{ maxHeight: '400px' }}>
            <code>{scriptTag}</code>
          </pre>
        </div>
      </UpgradeGate>

      {/* Google preview */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-[#2D3436] mb-3">How Google Will See You</h2>
        <div className="bg-white rounded-xl p-5 max-w-lg">
          <div className="text-[#1a0dab] text-lg font-medium hover:underline cursor-pointer">
            {biz.name} – {biz.primary_city}
          </div>
          <div className="text-[#006621] text-sm mt-0.5">{biz.website || 'Your website URL'}</div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-gray-500 text-sm">schema markup enables star ratings</span>
          </div>
          <div className="text-gray-700 text-sm mt-1">{biz.description || `${biz.category} serving ${biz.primary_city}, ${biz.primary_state}.`}</div>
          {biz.specialties && (
            <div className="text-gray-500 text-xs mt-2">
              Services: {biz.specialties.split(',').slice(0, 3).join(' · ')}
              {biz.specialties.split(',').length > 3 && ` · +${biz.specialties.split(',').length - 3} more`}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
