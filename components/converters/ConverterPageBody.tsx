import Link from 'next/link'
import type { Category } from '@/lib/converters/engine'
import { allPairs, type PairEntry } from '@/lib/converters'
import {
  BASE_URL, categoryPath, categoryUrl, categoryTable, categoryHowTo, pairContent, pairPath, pairUrl,
  pageSchemas, relatedCategories, initialValueFor,
} from '@/lib/converters/seo'
import { getUnit } from '@/lib/converters/engine'
import ConverterTool from './ConverterTool'
import AdZone from '@/components/AdZone'
import JsonLd from '@/components/content/JsonLd'
import Disclaimer from '@/components/content/Disclaimer'
import EducationalBlock from '@/components/content/EducationalBlock'
import FaqSection from '@/components/content/FaqSection'
import FormulaBox from '@/components/content/FormulaBox'
import RefTable from '@/components/content/RefTable'

interface Props {
  category: Category
  entry?: PairEntry
}

export default function ConverterPageBody({ category: cat, entry }: Props) {
  const pc = entry ? pairContent(entry) : null
  const pageName = pc ? pc.h1 : cat.title
  const pageDesc = pc ? pc.description : cat.description
  const url = entry ? pairUrl(entry) : categoryUrl(cat.id)
  const faqs = pc ? pc.faqs : cat.content.faqs
  const howTo = pc ? pc.howTo : categoryHowTo()
  const trail = [
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Converters', url: `${BASE_URL}/converters/` },
    { name: cat.short, url: categoryUrl(cat.id) },
    ...(entry ? [{ name: pc!.h1, url }] : []),
  ]
  const schemas = pageSchemas({ name: pageName, description: pageDesc, url, faqs, howTo, trail })
  const related = relatedCategories(cat)
  const popular = allPairs().filter(p => p.category.id === cat.id && p.slug !== entry?.slug)
  const table = categoryTable(cat)

  return (
    <>
      {schemas.map((s, i) => <JsonLd key={i} schema={s} />)}
      <AdZone zone={0} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <AdZone zone={1} className="mb-4" />

        <nav aria-label="Breadcrumb" className="text-sm text-[#6B7280] mb-4 flex items-center flex-wrap gap-0.5 min-w-0">
          <Link href="/" className="hover:text-[#0F766E] shrink-0">Home</Link>
          <span className="mx-1.5 shrink-0">/</span>
          <Link href="/converters/" className="hover:text-[#0F766E] shrink-0">Converters</Link>
          <span className="mx-1.5 shrink-0">/</span>
          {entry ? (
            <>
              <Link href={categoryPath(cat.id)} className="hover:text-[#0F766E] shrink-0">{cat.short}</Link>
              <span className="mx-1.5 shrink-0">/</span>
              <span className="text-[#1A1F36] font-medium truncate">{pc!.h1}</span>
            </>
          ) : (
            <span className="text-[#1A1F36] font-medium truncate">{cat.short}</span>
          )}
        </nav>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1F36] mb-1">{pageName}</h1>
          <p className="text-[#6B7280] text-sm mb-1">{pc ? pc.intro : cat.description}</p>
          <p className="text-xs text-[#9CA3AF]"><time dateTime="2026-10-14">Updated October 2026</time> &middot; CalcFlow Editorial</p>
        </div>

        <ConverterTool
          categoryId={cat.id}
          initialFrom={entry?.pair.from}
          initialTo={entry?.pair.to}
          initialIngredient={entry?.pair.ingredient}
          initialValue={entry ? initialValueFor(entry) : undefined}
        />
        <Disclaimer />

        {pc ? (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-[#1A1F36] mb-3">{pc.fwd.headers[0]} to {pc.fwd.headers[1]} Conversion Table</h2>
            <RefTable table={pc.fwd} />
            <h2 className="text-xl font-bold text-[#1A1F36] mt-6 mb-3">{pc.rev.headers[0]} to {pc.rev.headers[1]} Conversion Table</h2>
            <RefTable table={pc.rev} />
            <p className="mt-4 text-[14px] text-[#6B7280] leading-relaxed">{pc.example}</p>
            <p className="mt-3 text-[14px]">
              Need other units? Open the full{' '}
              <Link href={categoryPath(cat.id)} className="text-[#0F766E] font-semibold hover:underline">{cat.title}</Link>.
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-[#1A1F36] mb-3">Common {cat.short} Conversions</h2>
            <RefTable table={table} />
          </div>
        )}

        {popular.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-[#1A1F36] mb-3">Popular {cat.short} Conversions</h2>
            <div className="flex flex-wrap gap-2">
              {popular.map(p => {
                const f = getUnit(cat, p.pair.from)
                const t = getUnit(cat, p.pair.to)
                const ing = p.pair.ingredient ? cat.ingredients?.find(i => i.id === p.pair.ingredient)?.label : ''
                return (
                  <Link
                    key={p.slug}
                    href={pairPath(p)}
                    className="bg-white border border-[#E5E7EB] rounded-full px-3.5 py-2 text-[13px] font-semibold text-[#1A1F36] hover:border-[#0F766E] hover:text-[#0F766E] transition-all"
                  >
                    {f.label} to {t.label}{ing ? ` (${ing})` : ''}
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        <FormulaBox formula={cat.formula} />
        <EducationalBlock
          educational={{ explainer: cat.content.explainer, tips: cat.content.tips, commonMistakes: cat.content.commonMistakes, example: cat.content.example }}
          title={cat.short + ' Conversion'}
        />

        <div className="mt-6">
          <h2 className="text-xl font-bold text-[#1A1F36] mb-3">How to Use</h2>
          <ol className="list-decimal list-inside space-y-1.5 text-sm text-[#6B7280]">
            {howTo.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>

        <FaqSection faqs={faqs} />

        <p className="mt-6 text-[12px] text-[#9CA3AF]"><strong>Sources:</strong> {cat.sources}</p>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-[#1A1F36] mb-4">More Converters</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {related.map(r => (
              <Link
                key={r.id}
                href={categoryPath(r.id)}
                className="bg-white border border-[#E5E7EB] rounded-lg p-3 text-sm font-medium text-[#1A1F36] hover:border-[#0F766E] hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                {r.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
