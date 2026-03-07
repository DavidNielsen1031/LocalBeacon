import type { MetadataRoute } from 'next'
import { industrySlugs } from '@/lib/industry-data'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://localbeacon.ai',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://localbeacon.ai/check',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://localbeacon.ai/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...industrySlugs.map(slug => ({
      url: `https://localbeacon.ai/for/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: 'https://localbeacon.ai/privacy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://localbeacon.ai/terms',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}
