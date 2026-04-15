import { CalculatorConfig, Currency } from '../types'

export const compoundInterest: CalculatorConfig = {
  slug: 'compound-interest',
  title: 'Compound Interest Calculator',
  category: 'finance',
  description: 'Calculate how your investments grow with compound interest over time.',
  updatedDate: 'April 2026',
  tabs: [{ id: 'basic', label: 'Calculator' }],
  inputs: [
    { id: 'principal', label: 'Initial Investment', type: 'number', defaultValue: 10000, min: 0, step: 100, prefix: '$' },
    { id: 'rate', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 7, min: 0, max: 100, step: 0.1, suffix: '%' },
    { id: 'years', label: 'Time Period (Years)', type: 'number', defaultValue: 10, min: 1, max: 50, step: 1 },
    {
      id: 'frequency',
      label: 'Compounding Frequency',
      type: 'select',
      defaultValue: '12',
      options: [
        { value: '1', label: 'Annually' },
        { value: '4', label: 'Quarterly' },
        { value: '12', label: 'Monthly' },
        { value: '365', label: 'Daily' },
      ],
    },
    { id: 'monthlyContribution', label: 'Monthly Contribution', type: 'number', defaultValue: 0, min: 0, step: 10, prefix: '$' },
  ],
  calculate: (inputs, currency: Currency) => {
    const P = Number(inputs.principal)
    const r = Number(inputs.rate) / 100
    const n = Number(inputs.frequency)
    const t = Number(inputs.years)
    const pmt = Number(inputs.monthlyContribution)

    const futureValue = P * Math.pow(1 + r / n, n * t)
    let pmtFV: number
    if (r === 0) {
      pmtFV = pmt * 12 * t
    } else {
      pmtFV = pmt > 0 ? pmt * ((Math.pow(1 + r / n, n * t) - 1) / (r / n)) * (n / 12) : 0
    }
    const total = futureValue + pmtFV
    const totalContributions = P + pmt * 12 * t
    const totalInterest = total - totalContributions

    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    const roiDisplay = totalContributions === 0 ? 'N/A' : ((totalInterest / totalContributions) * 100).toFixed(1) + '%'

    return {
      values: [
        { label: 'Future Value', value: fmt(total) },
        { label: 'Total Contributions', value: fmt(totalContributions) },
        { label: 'Total Interest Earned', value: fmt(totalInterest) },
        { label: 'Return on Investment', value: roiDisplay },
      ],
      summary: `${currency.symbol}${P.toLocaleString()} grows to ${fmt(total)} over ${t} years at ${inputs.rate}% compounded.`,
    }
  },
  resultLabels: ['Future Value', 'Total Contributions', 'Total Interest Earned', 'Return on Investment'],
  formula: 'A = P(1 + r/n)^(nt) + PMT x [((1 + r/n)^(nt) - 1) / (r/n)]',
  content: {
    howTo: [
      'Enter your initial investment (principal).',
      'Enter the annual interest rate.',
      'Set the time period in years.',
      'Choose how often interest is compounded.',
      'Optionally add monthly contributions.',
      'Click Calculate to see future value and total interest earned.',
    ],
    faqs: [
      {
        q: 'What is compound interest?',
        a: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, compound interest grows exponentially over time.',
      },
      {
        q: 'How often should interest compound?',
        a: 'More frequent compounding yields slightly more growth. Daily compounding produces more than monthly, which produces more than annual.',
      },
      {
        q: 'What is a realistic interest rate to use?',
        a: "For stock market investments, a long-term average of 7-10% (before inflation) is commonly used. For savings accounts, use your bank's current APY.",
      },
      {
        q: 'How much does starting early matter?',
        a: 'Starting 10 years earlier can more than double your final amount due to compounding. Time is the most powerful factor.',
      },
    ],
    related: ['simple-interest', 'investment-return', 'retirement-savings', 'savings-goal', 'emergency-fund', 'roi-calculator'],
  },
  geo: {
    definition: 'A compound interest calculator computes how an investment grows when interest is earned on both the original principal and the accumulated interest from prior periods, using the formula A = P(1 + r/n)^(nt), where P is principal, r is annual rate, n is compounding frequency, and t is time in years.',
    ruleOfThumb: 'The Rule of 72: divide 72 by the annual interest rate to estimate how many years it takes to double your money. At 7% annual return, money doubles in roughly 72 ÷ 7 = 10.3 years.',
    example: '$10,000 invested at 7% annual return, compounded monthly for 30 years = $81,165. Total contributions: $10,000. Total interest earned: $71,165. The money grew 8x with no additional contributions.',
    keyFacts: [
      'The S&P 500 has averaged approximately 10% annual return (7% after inflation) over the past 100 years.',
      'Starting 10 years earlier can more than double your final investment amount due to compounding.',
      'Daily compounding earns only marginally more than monthly compounding over long periods.',
      'Albert Einstein reportedly called compound interest "the eighth wonder of the world."',
    ],
  },
  affiliate: {
    partner: 'Betterment',
    label: 'Put your money to work with Betterment',
    url: 'https://www.betterment.com',
    description: 'Automated investing that compounds your returns over time.',
  },
  jsonLd: {
    faqs: [
      { q: 'What is compound interest?', a: 'Interest on both principal and accumulated interest, growing exponentially over time.' },
      { q: 'How often should interest compound?', a: 'More frequent compounding yields slightly more. Daily > monthly > annually.' },
      { q: 'What interest rate should I use?', a: "For stocks, 7-10% long-term average. For savings, use your bank's current APY." },
      { q: 'Does starting earlier matter?', a: 'Yes. Starting 10 years earlier can more than double your final amount.' },
    ],
    howToSteps: [
      'Enter your initial investment.',
      'Set the annual interest rate.',
      'Choose your time period.',
      'Select compounding frequency.',
      'Add monthly contributions if applicable.',
      'Click Calculate.',
    ],
  },
}
