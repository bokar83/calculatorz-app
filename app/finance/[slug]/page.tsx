import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getCalculator, getAllSlugs } from '@/lib/registry'
import CalculatorLoader from '@/components/calculator/CalculatorLoader'
import AdZone from '@/components/AdZone'
import FormulaBox from '@/components/content/FormulaBox'
import RefTable from '@/components/content/RefTable'
import FaqSection from '@/components/content/FaqSection'
import RelatedGrid from '@/components/content/RelatedGrid'
import JsonLd from '@/components/content/JsonLd'
import GeoBlock from '@/components/content/GeoBlock'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().filter(s => s.category === 'finance').map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const calc = getCalculator(slug)
  if (!calc) return {}
  return {
    title: `${calc.title} — Free Online Calculator`,
    description: calc.description,
    alternates: { canonical: `https://calculatorz.tools/finance/${slug}` },
    openGraph: {
      title: `${calc.title} — Free Online Calculator | CalcFlow`,
      description: calc.description,
      url: `https://calculatorz.tools/finance/${slug}`,
      type: 'website',
    },
  }
}

export default async function FinanceCalculatorPage({ params }: PageProps) {
  const { slug } = await params
  const calc = getCalculator(slug)
  if (!calc || calc.category !== 'finance') notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: calc.title,
    description: calc.description,
    dateModified: '2026-04-14',
    author: { '@type': 'Organization', name: 'CalcFlow Editorial' },
    publisher: { '@type': 'Organization', name: 'CalcFlow', url: 'https://calculatorz.tools' },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: calc.jsonLd.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use the ${calc.title}`,
    step: calc.jsonLd.howToSteps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: s,
    })),
  }

  return (
    <>
      <JsonLd schema={articleSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={howToSchema} />

      <AdZone zone={0} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <AdZone zone={1} className="mb-4" />

        <nav className="text-sm text-[#6B7280] mb-4 flex items-center flex-wrap gap-0.5 min-w-0">
          <Link href="/" className="hover:text-[#0F766E] shrink-0">Home</Link>
          <span className="mx-1.5 shrink-0">/</span>
          <Link href="/finance" className="hover:text-[#0F766E] shrink-0">Finance</Link>
          <span className="mx-1.5 shrink-0">/</span>
          <span className="text-[#1A1F36] font-medium truncate">{calc.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 mb-6">
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1F36] mb-1">{calc.title}</h1>
              <p className="text-[#6B7280] text-sm mb-1">{calc.description}</p>
              <p className="text-xs text-[#9CA3AF]">Updated {calc.updatedDate} &middot; CalcFlow Editorial</p>
            </div>

            <CalculatorLoader slug={slug} />

            {calc.geo && <GeoBlock geo={calc.geo} calculatorTitle={calc.title} />}

            <AdZone zone={2} className="mt-6" />

            <div className="mt-6">
              <h2 className="text-xl font-bold text-[#1A1F36] mb-3">How to Use</h2>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-[#6B7280]">
                {calc.content.howTo.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            <FormulaBox formula={calc.formula} />
            <RefTable table={calc.content.refTable} />

            <AdZone zone={3} className="mt-6" />

            <FaqSection faqs={calc.content.faqs} />
            <RelatedGrid slugs={calc.content.related} currentCategory="finance" />
          </div>

          <aside className="hidden lg:flex flex-col gap-5 w-[268px] shrink-0">
            <AdZone zone={4} />
            <AdZone zone={5} />
          </aside>
        </div>
      </div>
    </>
  )
}
