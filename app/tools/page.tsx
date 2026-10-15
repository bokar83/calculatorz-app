import type { Metadata } from 'next'
import Link from 'next/link'
import { getCalculatorsByGroup } from '@/lib/registry'
import JsonLd from '@/components/content/JsonLd'

const DESC = 'Free everyday tools: age calculator, date difference, GPA, percentage and hours worked. Fast, accurate and no sign-up required.'

export const metadata: Metadata = {
  title: 'Everyday Tools: Age, Date, GPA and Percentage Calculators',
  description: DESC,
  alternates: { canonical: 'https://calculatorz.tools/tools/' },
  openGraph: { title: 'Everyday Tools | CalcFlow', description: DESC, url: 'https://calculatorz.tools/tools/', type: 'website', siteName: 'CalcFlow' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Everyday Tools',
  description: DESC,
  url: 'https://calculatorz.tools/tools/',
  publisher: { '@type': 'Organization', name: 'CalcFlow', url: 'https://calculatorz.tools/' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calculatorz.tools/' },
      { '@type': 'ListItem', position: 2, name: 'Everyday Tools', item: 'https://calculatorz.tools/tools/' },
    ],
  },
}

export default function ToolsPage() {
  const calcs = getCalculatorsByGroup('tools')
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <JsonLd schema={schema} />
      <nav className="text-sm text-[#6B7280] mb-6">
        <Link href="/" className="hover:text-[#0F766E]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1A1F36] font-medium">Everyday Tools</span>
      </nav>
      <h1 className="text-3xl font-extrabold text-[#1A1F36] mb-2">Everyday Tools</h1>
      <p className="text-[#6B7280] mb-8 max-w-2xl">
        Quick calculators for dates, ages, grades and percentages. They run in your browser and update instantly. Looking for money tools? See the <Link href="/finance" className="font-semibold text-[#0F766E] underline">finance calculators</Link>. Need to convert units? Try the <Link href="/converters" className="font-semibold text-[#0F766E] underline">converters</Link>.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {calcs.map(calc => (
          <Link key={calc.slug} href={`/${calc.category}/${calc.slug}`} className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#0F766E] hover:shadow-md transition-all group">
            <div className="text-sm font-semibold text-[#1A1F36] group-hover:text-[#0F766E] transition-colors leading-snug">{calc.title}</div>
            <div className="text-xs text-[#9CA3AF] mt-1 line-clamp-2">{calc.description}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
