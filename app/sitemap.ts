import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/registry'

export const dynamic = 'force-static'

const BASE = 'https://calculatorz.tools'

export default function sitemap(): MetadataRoute.Sitemap {
  const calcs = getAllSlugs().map(({ slug, category }) => ({
    url: `${BASE}/${category}/${slug}`,
    lastModified: new Date('2026-04-15'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE, lastModified: new Date('2026-04-15'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/finance`, lastModified: new Date('2026-04-15'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/health`, lastModified: new Date('2026-04-15'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/privacy`, lastModified: new Date('2026-04-15'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: new Date('2026-04-15'), changeFrequency: 'yearly', priority: 0.3 },
    ...calcs,
  ]
}
