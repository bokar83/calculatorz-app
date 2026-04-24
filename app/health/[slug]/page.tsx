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
import Disclaimer from '@/components/content/Disclaimer'
import EducationalBlock from '@/components/content/EducationalBlock'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().filter(s => s.category === 'health').map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const calc = getCalculator(slug)
  if (!calc) return {}
  return {
    title: `${calc.title} — Free Online Calculator | No Sign-Up Required`,
    description: calc.description,
    alternates: { canonical: `https://calculatorz.tools/health/${slug}/` },
    authors: [{ name: 'CalcFlow Editorial Team', url: 'https://calculatorz.tools/about/' }],
    other: {
      'article:author': 'CalcFlow Editorial Team',
      'article:modified_time': '2026-04-19',
    },
    openGraph: {
      title: `${calc.title} — Free Online Calculator | CalcFlow`,
      description: calc.description,
      url: `https://calculatorz.tools/health/${slug}/`,
      type: 'website',
    },
  }
}

export default async function HealthCalculatorPage({ params }: PageProps) {
  const { slug } = await params
  const calc = getCalculator(slug)
  if (!calc || calc.category !== 'health') notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: calc.title,
    description: calc.description,
    dateModified: '2026-04-14',
    author: { '@type': 'Organization', name: 'CalcFlow Editorial Team', url: 'https://calculatorz.tools/about/' },
    publisher: { '@type': 'Organization', name: 'CalcFlow', url: 'https://calculatorz.tools/' },
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calculatorz.tools/' },
      { '@type': 'ListItem', position: 2, name: 'Health Calculators', item: 'https://calculatorz.tools/health/' },
      { '@type': 'ListItem', position: 3, name: calc.title, item: `https://calculatorz.tools/health/${slug}/` },
    ],
  }

  const calculatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    applicationCategory: 'HealthApplication',
    name: calc.title,
    description: calc.description,
    url: `https://calculatorz.tools/${calc.category}/${slug}/`,
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  return (
    <>
      <JsonLd schema={articleSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={howToSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={calculatorSchema} />

      <AdZone zone={0} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <AdZone zone={1} className="mb-4" />

        <nav className="text-sm text-[#6B7280] mb-4 flex items-center flex-wrap gap-0.5 min-w-0">
          <Link href="/" className="hover:text-[#0F766E] shrink-0">Home</Link>
          <span className="mx-1.5 shrink-0">/</span>
          <Link href="/health" className="hover:text-[#0F766E] shrink-0">Health</Link>
          <span className="mx-1.5 shrink-0">/</span>
          <span className="text-[#1A1F36] font-medium truncate">{calc.title}</span>
        </nav>

        <div>
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 mb-6">
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1F36] mb-1">{calc.title}</h1>
              <p className="text-[#6B7280] text-sm mb-1">{calc.description}</p>
              <p className="text-xs text-[#9CA3AF]"><time dateTime="2026-04-19">Updated {calc.updatedDate}</time> &middot; CalcFlow Editorial</p>
            </div>

            <CalculatorLoader slug={slug} />
            <div className="mt-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
              <p className="text-[13px] font-semibold text-amber-900 mb-1">Medical Disclaimer</p>
              <p className="text-[13px] text-amber-800 leading-relaxed">These calculators provide estimates for informational purposes only and do not constitute medical advice. Always consult a qualified healthcare provider before making health or medical decisions.</p>
            </div>
            <Disclaimer />

            {calc.geo && <GeoBlock geo={calc.geo} calculatorTitle={calc.title} />}
            {calc.educational && <EducationalBlock educational={calc.educational} title={calc.title} />}

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

            <FaqSection faqs={calc.content.faqs} />
            <RelatedGrid slugs={calc.content.related} currentCategory="health" />
        </div>
      </div>
    </>
  )
}
