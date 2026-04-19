import { CalculatorConfig, Currency } from '../types'

export const compoundInterest: CalculatorConfig = {
  slug: 'compound-interest',
  title: 'Compound Interest Calculator',
  category: 'finance',
  description: 'Calculate how your money grows over time with compound interest. See the real impact of rate, time, and compounding frequency.',
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
      {
        q: 'What is the difference between simple and compound interest?',
        a: 'Simple interest is calculated only on the principal. Compound interest is calculated on the principal plus all accumulated interest, which causes exponential growth over time.',
      },
      {
        q: 'How often does compound interest compound?',
        a: 'Common compounding frequencies are daily, monthly, quarterly, and annually. More frequent compounding produces slightly more growth. Most savings accounts compound daily or monthly.',
      },
      {
        q: 'Is compound interest the same as APY?',
        a: 'APY (Annual Percentage Yield) accounts for compounding, while APR (Annual Percentage Rate) does not. When comparing savings accounts, always compare APY — it reflects the true annual return.',
      },
      {
        q: 'How do I maximize compound interest?',
        a: 'Start as early as possible, contribute regularly, reinvest all returns, choose accounts with higher APY and more frequent compounding, and avoid withdrawals that interrupt the compounding cycle.',
      },
    ],
    related: ['simple-interest', 'investment-return', 'retirement-savings', 'savings-goal', 'emergency-fund', 'roi-calculator'],
  },
  geo: {
    definition: 'A compound interest calculator computes how an investment grows when interest is earned on both the original principal and the accumulated interest from prior periods, using the formula A = P(1 + r/n)^(nt), where P is principal, r is annual rate, n is compounding frequency, and t is time in years.',
    ruleOfThumb: 'The Rule of 72: divide 72 by the annual interest rate to estimate how many years it takes to double your money. At 7% annual return, money doubles in roughly 72 ÷ 7 = 10.3 years.',
    example: '$10,000 invested at 7% annual return, compounded monthly for 30 years = $81,165. Total contributions: $10,000. Total interest earned: $71,165. The money grew 8x with no additional contributions.',
    keyFacts: [
      'The S&P 500 has averaged approximately 10% annual return (7% after inflation) over the past 100 years. (Source: Investopedia / financial mathematics)',
      'Starting 10 years earlier can more than double your final investment amount due to compounding. (Source: Investopedia / financial mathematics)',
      'Daily compounding earns only marginally more than monthly compounding over long periods. (Source: Investopedia / financial mathematics)',
      'Albert Einstein reportedly called compound interest "the eighth wonder of the world." (Source: Investopedia / financial mathematics)',
    ],
  },
  affiliate: {
    partner: 'Betterment',
    label: 'Put your money to work with Betterment',
    url: 'https://www.betterment.com',
    description: 'Automated investing that compounds your returns over time.',
  },
  educational: {
    explainer: `Compound interest is what happens when the interest you earn starts earning interest of its own. You put money in, it earns a return, and then that return gets added to your balance. Next period, you earn a return on the larger balance, including the interest from before. This cycle repeats, and over long stretches of time the growth becomes dramatic. The key inputs are your starting amount, how much you add regularly, the rate of return, and how many years you let it run. Time is the most powerful lever: the same $10,000 invested at 7% for 20 years grows to about $38,700, but left for 40 years it reaches roughly $149,700. That extra 20 years more than triples the outcome without adding a single extra dollar. This is why financial advisors tell young people to start investing even small amounts immediately, rather than waiting until they earn more.`,
    tips: [
      'Start as early as possible. Saving an extra $100/month starting at age 25 rather than age 35 can mean $80,000 more at retirement, assuming a 7% return.',
      'Regular contributions matter as much as the initial deposit. Adding $200/month to a $5,000 starting balance outperforms a $20,000 lump sum with no contributions over 20 years.',
      'Monthly compounding is common for investment accounts. Annual compounding slightly understates your returns, so use the frequency your actual account uses for accurate projections.',
      'Use a realistic return rate. For broad stock market index funds, financial planners typically use 6-7% after inflation. Avoid inflating this number to feel better about the results.',
    ],
    commonMistakes: [
      'Confusing the annual rate with the compounding rate. A 7% annual rate compounded monthly is slightly better than 7% compounded annually because interest builds on itself more frequently throughout the year.',
      'Ignoring inflation. A projection showing $500,000 in 30 years sounds impressive, but in today\'s purchasing power that amount may only be worth around $200,000 at 3% annual inflation.',
      'Stopping contributions during market downturns. Pulling back or pausing contributions is the single most common way people undermine the compounding effect at exactly the wrong moment.',
    ],
    example: `Maria invests $5,000 at age 25 and adds $300/month into an index fund returning 7% annually, compounded monthly. By age 65, she has roughly $854,000. Her total contributions were $149,000. The remaining $705,000 came purely from compound growth. If she had waited until age 35 to start the same plan, she would have about $415,000 at 65 — half the outcome, just from waiting 10 years.`,
  },
  jsonLd: {
    faqs: [
      { q: 'What is compound interest?', a: 'Interest on both principal and accumulated interest, growing exponentially over time.' },
      { q: 'How often should interest compound?', a: 'More frequent compounding yields slightly more. Daily > monthly > annually.' },
      { q: 'What interest rate should I use?', a: "For stocks, 7-10% long-term average. For savings, use your bank's current APY." },
      { q: 'Does starting earlier matter?', a: 'Yes. Starting 10 years earlier can more than double your final amount.' },
      { q: 'What is the difference between simple and compound interest?', a: 'Simple interest is calculated only on the principal. Compound interest is calculated on the principal plus all accumulated interest, which causes exponential growth over time.' },
      { q: 'How often does compound interest compound?', a: 'Common compounding frequencies are daily, monthly, quarterly, and annually. More frequent compounding produces slightly more growth. Most savings accounts compound daily or monthly.' },
      { q: 'Is compound interest the same as APY?', a: 'APY (Annual Percentage Yield) accounts for compounding, while APR (Annual Percentage Rate) does not. When comparing savings accounts, always compare APY — it reflects the true annual return.' },
      { q: 'How do I maximize compound interest?', a: 'Start as early as possible, contribute regularly, reinvest all returns, choose accounts with higher APY and more frequent compounding, and avoid withdrawals that interrupt the compounding cycle.' },
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
