'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

const DEMO_BUSINESS = {
  name: "Thompson Plumbing & Heating",
  address: "123 Main St, Burnsville, MN 55337",
  phone: "(952) 555-0123",
  website: "https://thompsonplumbing.com",
  hours: "Mon-Fri 7:00-18:00, Sat 8:00-14:00",
  description: "Licensed plumbing and heating contractor serving Burnsville and the south metro since 1998. Emergency service available 24/7.",
  services: ["Plumbing Repair", "Water Heater Installation", "Drain Cleaning", "AC Repair", "Furnace Maintenance"],
  areas: ["Burnsville", "Apple Valley", "Eagan", "Lakeville", "Prior Lake"],
  rating: 4.7,
  reviewCount: 89,
}

function generateLocalBusinessSchema(biz: typeof DEMO_BUSINESS) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": biz.name,
    "description": biz.description,
    "telephone": biz.phone,
    "url": biz.website,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main St",
      "addressLocality": "Burnsville",
      "addressRegion": "MN",
      "postalCode": "55337",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 44.7677,
      "longitude": -93.2777
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": biz.rating,
      "reviewCount": biz.reviewCount
    },
    "areaServed": biz.areas.map(a => ({
      "@type": "City",
      "name": a
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services",
      "itemListElement": biz.services.map(s => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s
        }
      }))
    }
  }
}

function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does a plumber cost in Burnsville?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most plumbing service calls in Burnsville range from $89-$350 depending on the issue. Emergency calls may cost more. We offer free estimates for all non-emergency work."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer 24/7 emergency plumbing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Thompson Plumbing offers 24/7 emergency plumbing service across Burnsville, Apple Valley, Eagan, and the surrounding south metro area."
        }
      }
    ]
  }
}

function generateServiceSchema(biz: typeof DEMO_BUSINESS) {
  return biz.services.map(service => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service,
    "provider": {
      "@type": "LocalBusiness",
      "name": biz.name
    },
    "areaServed": biz.areas.map(a => ({
      "@type": "City",
      "name": a
    }))
  }))
}

export default function SchemaPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'business' | 'faq' | 'services'>('business')

  const localBiz = generateLocalBusinessSchema(DEMO_BUSINESS)
  const faq = generateFAQSchema()
  const services = generateServiceSchema(DEMO_BUSINESS)

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
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Schema Markup</h1>
        <p className="text-white/50">Copy these code snippets into your website to help Google understand your business better. Just paste into your site footer.</p>
      </div>

      {/* What is this */}
      <div className="bg-[#111] border border-[#FFD700]/20 rounded-xl p-5 mb-8">
        <h2 className="text-[#FFD700] font-semibold mb-2">💡 What is Schema Markup?</h2>
        <p className="text-white/60 text-sm leading-relaxed">
          Schema markup is a small piece of code that tells Google exactly what your business does, where you're located, 
          and what services you offer. It's like giving Google a cheat sheet about your business. Businesses with schema markup 
          can get <span className="text-white">rich results</span> in search — showing your rating, hours, and services right in the search listing.
          <br /><br />
          <span className="text-white/40">How to use it:</span> Copy the code below and paste it into your website's footer (or ask your web person to do it). That's it — one time, and you're done.
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
                ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30'
                : 'text-white/50 border border-white/10 hover:border-white/20'
            }`}
          >
            {schemas[key].label}
          </button>
        ))}
      </div>

      {/* Schema display */}
      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div>
            <h3 className="text-white font-medium">{active.label} Schema</h3>
            <p className="text-white/40 text-xs mt-0.5">{active.desc}</p>
          </div>
          <button
            onClick={() => handleCopy(activeTab)}
            className="bg-[#FFD700] text-black font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#FFD700]/90 transition-all"
          >
            {copied === activeTab ? '✓ Copied!' : 'Copy Code'}
          </button>
        </div>
        <pre className="p-4 text-sm text-green-400/80 overflow-x-auto leading-relaxed" style={{ maxHeight: '400px' }}>
          <code>{scriptTag}</code>
        </pre>
      </div>

      {/* Google preview */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-white mb-3">How Google Will See You</h2>
        <div className="bg-white rounded-xl p-5 max-w-lg">
          <div className="text-[#1a0dab] text-lg font-medium hover:underline cursor-pointer">
            {DEMO_BUSINESS.name} - {DEMO_BUSINESS.areas[0]}
          </div>
          <div className="text-[#006621] text-sm mt-0.5">{DEMO_BUSINESS.website}</div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-yellow-500">{'★'.repeat(Math.round(DEMO_BUSINESS.rating))}</span>
            <span className="text-gray-500 text-sm">{DEMO_BUSINESS.rating} ({DEMO_BUSINESS.reviewCount} reviews)</span>
          </div>
          <div className="text-gray-700 text-sm mt-1">{DEMO_BUSINESS.description}</div>
          <div className="text-gray-500 text-xs mt-2">
            Services: {DEMO_BUSINESS.services.slice(0, 3).join(' · ')} · +{DEMO_BUSINESS.services.length - 3} more
          </div>
        </div>
      </div>
    </div>
  )
}
