import type { Metadata } from 'next'
import Link from 'next/link'
import { CATEGORIES, GROUPS, allPairs } from '@/lib/converters'
import { getUnit } from '@/lib/converters/engine'
import { BASE_URL, categoryPath, crumbs, pairPath } from '@/lib/converters/seo'
import JsonLd from '@/components/content/JsonLd'

const DESC = 'Free unit converters: length, weight, volume, temperature, area, speed, time, data storage, energy, power, pressure, cooking, shoe sizes and more. Exact definitions, instant results, no sign-up.'

export const metadata: Metadata = {
  title: 'Unit Converters: Length, Weight, Volume, Temperature and More',
  description: DESC,
  alternates: { canonical: `${BASE_URL}/converters/` },
  openGraph: { title: 'Unit Converters | CalcFlow', description: DESC, url: `${BASE_URL}/converters/`, type: 'website', siteName: 'CalcFlow' },
}

export default function ConvertersHub() {
  const pairs = allPairs()
  const popularEntries = [
    ['weight', 'kg-to-lbs'], ['temperature', 'celsius-to-fahrenheit'], ['length', 'centimeters-to-inches'],
    ['length', 'miles-to-kilometers'], ['volume', 'gallons-to-liters'], ['speed', 'kmh-to-mph'],
    ['cooking', 'cups-to-grams-flour'], ['pressure', 'psi-to-bar'],
  ]
    .map(([c, s]) => pairs.find(p => p.category.id === c && p.slug === s))
    .filter(Boolean) as ReturnType<typeof allPairs>

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Unit Converters',
    description: DESC,
    url: `${BASE_URL}/converters/`,
    publisher: { '@type': 'Organization', name: 'CalcFlow', url: `${BASE_URL}/` },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <JsonLd schema={schema} />
      <JsonLd schema={crumbs([{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Converters', url: `${BASE_URL}/converters/` }])} />
      <nav aria-label="Breadcrumb" className="text-sm text-[#6B7280] mb-6">
        <Link href="/" className="hover:text-[#0F766E]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1A1F36] font-medium">Converters</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-[#1A1F36] mb-2">Unit Converters</h1>
      <p className="text-[#6B7280] mb-8 max-w-2xl">
        {CATEGORIES.length} free converters for everyday measurements, science and engineering, computing, cooking and sizes. Every factor uses an exact published definition, results update as you type, and you can swap direction or copy the answer in one tap. Currency is not included because exchange rates change by the minute.
      </p>

      {popularEntries.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold text-[#1A1F36] mb-3">Popular conversions</h2>
          <div className="flex flex-wrap gap-2">
            {popularEntries.map(p => (
              <Link
                key={`${p.category.id}/${p.slug}`}
                href={pairPath(p)}
                className="bg-white border border-[#E5E7EB] rounded-full px-3.5 py-2 text-[13px] font-semibold text-[#1A1F36] hover:border-[#0F766E] hover:text-[#0F766E] transition-all"
              >
                {getUnit(p.category, p.pair.from).label} to {getUnit(p.category, p.pair.to).label}
                {p.pair.ingredient ? ` (${p.category.ingredients?.find(i => i.id === p.pair.ingredient)?.label.toLowerCase()})` : ''}
              </Link>
            ))}
          </div>
        </div>
      )}

      {GROUPS.map(group => {
        const cats = CATEGORIES.filter(c => c.group === group)
        if (cats.length === 0) return null
        return (
          <section key={group} className="mb-8" aria-labelledby={`g-${group}`}>
            <h2 id={`g-${group}`} className="text-lg font-bold text-[#1A1F36] mb-3">{group}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {cats.map(c => (
                <Link
                  key={c.id}
                  href={categoryPath(c.id)}
                  className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#0F766E] hover:shadow-md transition-all group"
                >
                  <div className="text-sm font-semibold text-[#1A1F36] group-hover:text-[#0F766E] transition-colors leading-snug">{c.title}</div>
                  <div className="text-xs text-[#9CA3AF] mt-1 line-clamp-2">{c.units.slice(0, 4).map(u => u.symbol).join(', ')} and more</div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      <section className="mt-10" aria-labelledby="classic">
        <h2 id="classic" className="text-lg font-bold text-[#1A1F36] mb-3">Classic converters</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            ['/finance/unit-converter', 'Unit Converter (length, weight, temperature, volume)'],
            ['/finance/cm-to-inches', 'CM to Inches Converter'],
            ['/finance/currency-converter', 'Currency Converter'],
            ['/finance/hex-to-rgb', 'Hex to RGB Converter'],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="bg-white border border-[#E5E7EB] rounded-lg p-4 text-sm font-semibold text-[#1A1F36] hover:border-[#0F766E] hover:text-[#0F766E] transition-all">
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
