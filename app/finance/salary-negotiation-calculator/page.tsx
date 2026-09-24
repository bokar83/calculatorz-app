import type { Metadata } from 'next'
import JsonLd from '@/components/content/JsonLd'
import SalaryNegotiationClient from './Client'

export const metadata: Metadata = {
  title: 'Salary Negotiation & Take-Home Calculator — Is That Raise Actually Worth It? | CalcFlow',
  description: 'Find out if a job offer actually increases your take-home pay after federal tax, FICA/self-employment tax, and all 50 states + DC. Solve backward for your minimum negotiation target. Free, 2026 tax figures.',
  alternates: { canonical: 'https://calculatorz.tools/finance/salary-negotiation-calculator' },
  openGraph: {
    title: 'Salary Negotiation & Take-Home Calculator | CalcFlow',
    description: 'A raise crossing a tax bracket almost never reduces your take-home pay. See the real math, and solve backward for the minimum offer worth accepting.',
    url: 'https://calculatorz.tools/finance/salary-negotiation-calculator',
    type: 'website',
    siteName: 'CalcFlow',
  },
}

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Salary Negotiation & Take-Home Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Computes real take-home pay after federal income tax, FICA or self-employment tax, and state income tax across all 50 states + DC, using 2026 tax figures. Solves backward for the minimum salary needed to break even or hit a target net gain.',
  url: 'https://calculatorz.tools/finance/salary-negotiation-calculator',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calculatorz.tools/' },
      { '@type': 'ListItem', position: 2, name: 'Finance Calculators', item: 'https://calculatorz.tools/finance/' },
      { '@type': 'ListItem', position: 3, name: 'Salary Negotiation Calculator', item: 'https://calculatorz.tools/finance/salary-negotiation-calculator' },
    ],
  },
  faq: {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can a raise that pushes me into a higher tax bracket actually reduce my take-home pay?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The US uses a marginal (progressive) tax system: crossing into a higher bracket only taxes the dollars earned above that threshold at the higher rate, not your entire salary. A raise can only reduce your net check in unusual edge cases involving means-tested benefit cliffs, not from federal or state income tax brackets alone.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Marginal Effective Tax Rate (METR)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'METR is the share of a raise that is taken by taxes: METR = 1 minus (change in take-home pay divided by change in gross pay). A 30% METR means you keep 70 cents of every additional dollar.',
        },
      },
    ],
  },
}

export default function SalaryNegotiationCalculatorPage() {
  return (
    <>
      <JsonLd schema={pageSchema} />
      <SalaryNegotiationClient />
    </>
  )
}
