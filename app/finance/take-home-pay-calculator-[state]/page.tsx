import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getStateBySlug, getAllStateSlugs } from '@/lib/states'
import CalculatorLoader from '@/components/calculator/CalculatorLoader'
import AdZone from '@/components/AdZone'
import FaqSection from '@/components/content/FaqSection'
import JsonLd from '@/components/content/JsonLd'
import Disclaimer from '@/components/content/Disclaimer'

interface PageProps {
  params: Promise<{ state: string }>
}

export async function generateStaticParams() {
  return getAllStateSlugs().map(state => ({ state }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params
  const stateData = getStateBySlug(state)
  if (!stateData) return {}

  const title = `${stateData.name} Take-Home Pay Calculator — Free 2025 Paycheck Estimator`
  const description = `Calculate your take-home pay in ${stateData.name} after federal taxes, ${stateData.hasNoIncomeTax ? 'FICA, and deductions. ' + stateData.name + ' has no state income tax.' : `${stateData.stateTaxRate}% state income tax, FICA, and deductions.`} Free, no sign-up required.`

  return {
    title,
    description,
    alternates: { canonical: `https://calculatorz.tools/finance/take-home-pay-calculator-${state}` },
    authors: [{ name: 'CalcFlow Editorial Team', url: 'https://calculatorz.tools/about' }],
    openGraph: {
      title,
      description,
      url: `https://calculatorz.tools/finance/take-home-pay-calculator-${state}`,
      type: 'website',
    },
  }
}

export default async function StateTakeHomePayPage({ params }: PageProps) {
  const { state } = await params
  const stateData = getStateBySlug(state)
  if (!stateData) notFound()

  const taxNote = stateData.hasNoIncomeTax
    ? `${stateData.name} has no state income tax. Set the state tax field to 0%.`
    : `Use ${stateData.stateTaxRate}% as the starting state tax rate for ${stateData.name}.`

  const faqs = [
    {
      q: `What is the state income tax rate in ${stateData.name}?`,
      a: stateData.hasNoIncomeTax
        ? `${stateData.name} has no state income tax on wages. ${stateData.notes}`
        : `${stateData.name} has a state income tax rate of approximately ${stateData.stateTaxRate}% for middle-income earners. ${stateData.notes}${stateData.brackets ? ' Tax brackets: ' + stateData.brackets + '.' : ''}`,
    },
    {
      q: `How do I calculate take-home pay in ${stateData.name}?`,
      a: `Start with your gross annual salary. Subtract your pre-tax deductions (401k, HSA). Apply federal tax brackets and the 2025 standard deduction. Add FICA taxes (6.2% Social Security up to $168,600, plus 1.45% Medicare). Then apply ${stateData.name}'s state income tax${stateData.hasNoIncomeTax ? ' — which is 0%' : ` of approximately ${stateData.stateTaxRate}%`}. The result is your estimated net annual take-home pay.`,
    },
    {
      q: `Does ${stateData.name} have any special payroll taxes I should know about?`,
      a: stateData.notes,
    },
    {
      q: 'How accurate is this take-home pay estimate?',
      a: 'This calculator provides a close estimate using 2025 federal tax brackets, standard deductions, and approximate state tax rates. Your actual paycheck may differ based on your exact withholding elections (W-4), employer benefits, supplemental wages, local taxes, or specific deduction amounts. Use this as a planning tool and consult a tax professional for exact figures.',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const calculatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    applicationCategory: 'FinanceApplication',
    name: `${stateData.name} Take-Home Pay Calculator`,
    description: `Calculate take-home pay after taxes in ${stateData.name}.`,
    url: `https://calculatorz.tools/finance/take-home-pay-calculator-${state}`,
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calculatorz.tools' },
      { '@type': 'ListItem', position: 2, name: 'Finance Calculators', item: 'https://calculatorz.tools/finance' },
      { '@type': 'ListItem', position: 3, name: 'Take-Home Pay Calculator', item: 'https://calculatorz.tools/finance/take-home-pay' },
      { '@type': 'ListItem', position: 4, name: `${stateData.name} Take-Home Pay`, item: `https://calculatorz.tools/finance/take-home-pay-calculator-${state}` },
    ],
  }

  return (
    <>
      <JsonLd schema={faqSchema} />
      <JsonLd schema={calculatorSchema} />
      <JsonLd schema={breadcrumbSchema} />

      <AdZone zone={0} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <AdZone zone={1} className="mb-4" />

        <nav className="text-sm text-[#6B7280] mb-4 flex items-center flex-wrap gap-0.5 min-w-0">
          <Link href="/" className="hover:text-[#0F766E] shrink-0">Home</Link>
          <span className="mx-1.5 shrink-0">/</span>
          <Link href="/finance" className="hover:text-[#0F766E] shrink-0">Finance</Link>
          <span className="mx-1.5 shrink-0">/</span>
          <Link href="/finance/take-home-pay" className="hover:text-[#0F766E] shrink-0">Take-Home Pay</Link>
          <span className="mx-1.5 shrink-0">/</span>
          <span className="text-[#1A1F36] font-medium truncate">{stateData.name}</span>
        </nav>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1F36] mb-1">
            {stateData.name} Take-Home Pay Calculator
          </h1>
          <p className="text-[#6B7280] text-sm mb-1">
            Estimate your net paycheck in {stateData.name} after federal taxes, FICA, and state income tax deductions.
          </p>
          <p className="text-xs text-[#9CA3AF]">
            <time dateTime="2026-05-06">Updated May 2026</time> &middot; CalcFlow Editorial
          </p>
        </div>

        {/* State tax info banner */}
        <div className={`rounded-lg border-l-4 p-4 mb-6 ${stateData.hasNoIncomeTax ? 'bg-green-50 border-green-500' : 'bg-blue-50 border-blue-400'}`}>
          <p className="text-sm font-semibold mb-1" style={{ color: stateData.hasNoIncomeTax ? '#065f46' : '#1e3a5f' }}>
            {stateData.name} State Tax ({stateData.abbreviation})
          </p>
          <p className="text-sm" style={{ color: stateData.hasNoIncomeTax ? '#047857' : '#1d4ed8' }}>
            {stateData.hasNoIncomeTax
              ? `${stateData.name} has no state income tax on wages. Set the state tax rate to 0% in the calculator below.`
              : `Approximate effective rate for middle-income earners: ${stateData.stateTaxRate}%. ${stateData.brackets ? 'Brackets: ' + stateData.brackets + '.' : ''}`
            }
          </p>
          <p className="text-xs mt-2" style={{ color: stateData.hasNoIncomeTax ? '#6ee7b7' : '#93c5fd', opacity: 0.9 }}>
            {stateData.notes}
          </p>
        </div>

        {/* Calculator — pre-populated with state rate */}
        <CalculatorLoader slug="take-home-pay" />
        <Disclaimer />

        {/* State tax note */}
        <div className="mt-4 bg-[#F8FAFB] border border-[#E5E7EB] rounded-lg p-4">
          <p className="text-sm font-semibold text-[#1A1F36] mb-1">How to Use This Calculator for {stateData.name}</p>
          <p className="text-sm text-[#6B7280]">{taxNote} The calculator above uses the state tax rate field — enter the rate that matches your income level for the most accurate estimate.</p>
        </div>

        {/* FAQs */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-[#1A1F36] mb-4">{stateData.name} Take-Home Pay — Frequently Asked Questions</h2>
          <FaqSection faqs={faqs} />
        </div>

        {/* Related state links */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-[#1A1F36] mb-3">Other State Take-Home Pay Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {[
              { slug: 'california', name: 'California' },
              { slug: 'texas', name: 'Texas' },
              { slug: 'florida', name: 'Florida' },
              { slug: 'new-york', name: 'New York' },
              { slug: 'washington', name: 'Washington' },
              { slug: 'illinois', name: 'Illinois' },
              { slug: 'pennsylvania', name: 'Pennsylvania' },
              { slug: 'ohio', name: 'Ohio' },
            ].filter(s => s.slug !== state).slice(0, 7).map(s => (
              <Link
                key={s.slug}
                href={`/finance/take-home-pay-calculator-${s.slug}`}
                className="text-sm text-[#0F766E] hover:underline bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-center block"
              >
                {s.name}
              </Link>
            ))}
            <Link
              href="/finance/take-home-pay"
              className="text-sm text-[#6B7280] hover:text-[#0F766E] bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-center block"
            >
              All States
            </Link>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-6">
          <Link href="/finance/take-home-pay" className="text-sm text-[#0F766E] hover:underline">
            View the main Take-Home Pay Calculator (all states)
          </Link>
        </div>
      </div>
    </>
  )
}
