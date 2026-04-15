import Link from 'next/link'
import { getCalculator } from '@/lib/registry'

interface RelatedGridProps {
  slugs: string[]
  currentCategory: 'finance' | 'health'
}

export default function RelatedGrid({ slugs, currentCategory }: RelatedGridProps) {
  const items = slugs
    .map(slug => {
      const calc = getCalculator(slug)
      if (!calc) return null
      return { slug, title: calc.title, category: calc.category }
    })
    .filter(Boolean)
    .slice(0, 6) as { slug: string; title: string; category: string }[]

  if (items.length === 0) return null

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-[#1A1F36] mb-4">Related Calculators</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map(item => (
          <Link
            key={item.slug}
            href={`/${item.category}/${item.slug}`}
            className="bg-white border border-[#E5E7EB] rounded-lg p-3 text-sm font-medium text-[#1A1F36] hover:border-[#0F766E] hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
