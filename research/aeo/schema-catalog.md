# Schema.org Catalog for Local Businesses

*Last updated: March 2, 2026*

## Essential Schemas (implement all)

### LocalBusiness
```json
{
  "@context": "https://schema.org",
  "@type": "Plumber",
  "name": "Thompson Plumbing",
  "description": "Professional plumbing services in Burnsville, MN",
  "url": "https://thompsonplumbing.com",
  "telephone": "+1-952-555-1234",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Burnsville",
    "addressRegion": "MN",
    "postalCode": "55337",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "City", "name": "Burnsville" },
    { "@type": "City", "name": "Apple Valley" },
    { "@type": "City", "name": "Eagan" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "07:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.google.com/maps?cid=XXXXX",
    "https://www.yelp.com/biz/thompson-plumbing",
    "https://www.facebook.com/thompsonplumbing"
  ]
}
```

### FAQPage
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does emergency plumbing cost in Burnsville?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Emergency plumbing in Burnsville typically costs $150-$400 depending on the issue. Thompson Plumbing offers 24/7 emergency service with no surprise fees."
      }
    }
  ]
}
```

### Service
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Water Heater Repair",
  "description": "Professional water heater repair and replacement in Burnsville and surrounding areas",
  "provider": { "@type": "Plumber", "name": "Thompson Plumbing" },
  "areaServed": { "@type": "City", "name": "Burnsville" },
  "offers": {
    "@type": "Offer",
    "priceRange": "$150-$800"
  }
}
```

### Organization
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Thompson Plumbing",
  "url": "https://thompsonplumbing.com",
  "logo": "https://thompsonplumbing.com/logo.png",
  "sameAs": ["...all profile URLs..."]
}
```

### HowTo (for service process pages)
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Prepare for a Plumbing Inspection",
  "step": [
    { "@type": "HowToStep", "text": "Clear the area around your main water shutoff valve" },
    { "@type": "HowToStep", "text": "Note any existing leaks or drips" },
    { "@type": "HowToStep", "text": "Make sure all fixtures are accessible" }
  ]
}
```

### BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://example.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Water Heater Repair" }
  ]
}
```

## LocalBusiness Subtypes (use the most specific)

| Category | Schema Type |
|----------|-------------|
| Plumber | `Plumber` |
| Electrician | `Electrician` |
| HVAC | `HVACBusiness` |
| Roofer | `RoofingContractor` |
| Dentist | `Dentist` |
| Lawyer | `Attorney` |
| Auto Mechanic | `AutoRepair` |
| Landscaper | `LandscapingBusiness` (not official — use `HomeAndConstructionBusiness`) |
| General Contractor | `GeneralContractor` |
| Real Estate | `RealEstateAgent` |
| Veterinarian | `VeterinaryCare` |
| Accountant | `AccountingService` |

*Next review: April 2, 2026*
