import type { Metadata } from 'next'
import Link from 'next/link'
import { getCalculatorsByCategory } from '@/lib/registry'
import JsonLd from '@/components/content/JsonLd'

export const metadata: Metadata = {
  title: 'Health Calculators — Free Online Tools',
  description: 'Free health calculators for BMI, calories, body fat, ideal weight, water intake, sleep, and more.',
  alternates: { canonical: 'https://calculatorz.tools/health/' },
  openGraph: {
    title: 'Health Calculators — Free Online Tools | CalcFlow',
    description: 'Free health calculators for BMI, calories, body fat, ideal weight, water intake, sleep, and more.',
    url: 'https://calculatorz.tools/health/',
    type: 'website',
    siteName: 'CalcFlow',
  },
}

const healthCollectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Health Calculators',
  description: 'Free health calculators for BMI, calories, body fat, ideal weight, water intake, sleep, and more.',
  url: 'https://calculatorz.tools/health/',
  publisher: { '@type': 'Organization', name: 'CalcFlow', url: 'https://calculatorz.tools/' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calculatorz.tools/' },
      { '@type': 'ListItem', position: 2, name: 'Health Calculators', item: 'https://calculatorz.tools/health/' },
    ],
  },
}

export default function HealthPage() {
  const calcs = getCalculatorsByCategory('health')

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <JsonLd schema={healthCollectionSchema} />
      <nav className="text-sm text-[#6B7280] mb-6">
        <Link href="/" className="hover:text-[#0F766E]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1A1F36] font-medium">Health</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-[#1A1F36] mb-2">Health Calculators</h1>
      <p className="text-[#6B7280] mb-8 max-w-2xl">
        Free online health calculators for BMI, calorie needs, body fat percentage, ideal body weight, daily water intake, heart rate training zones, and more.
        Use these tools to understand your body metrics, set realistic fitness targets, or check key health indicators without a doctor visit.
        All calculators run instantly in your browser with no account needed.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {calcs.map(calc => (
          <Link
            key={calc.slug}
            href={`/health/${calc.slug}`}
            className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#0F766E] hover:shadow-md transition-all group"
          >
            <div className="text-sm font-semibold text-[#1A1F36] group-hover:text-[#0F766E] transition-colors leading-snug">
              {calc.title}
            </div>
            <div className="text-xs text-[#9CA3AF] mt-1 line-clamp-2">{calc.description}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
