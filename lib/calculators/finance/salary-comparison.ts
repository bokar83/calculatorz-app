import { CalculatorConfig } from '../types'

const CITY_COL: Record<string, { name: string; index: number }> = {
  nyc: { name: 'New York City, NY', index: 187 },
  sf: { name: 'San Francisco, CA', index: 182 },
  boston: { name: 'Boston, MA', index: 162 },
  la: { name: 'Los Angeles, CA', index: 173 },
  seattle: { name: 'Seattle, WA', index: 155 },
  chicago: { name: 'Chicago, IL', index: 107 },
  miami: { name: 'Miami, FL', index: 123 },
  austin: { name: 'Austin, TX', index: 121 },
  denver: { name: 'Denver, CO', index: 128 },
  atlanta: { name: 'Atlanta, GA', index: 107 },
  dallas: { name: 'Dallas, TX', index: 104 },
  houston: { name: 'Houston, TX', index: 98 },
  phoenix: { name: 'Phoenix, AZ', index: 107 },
  minneapolis: { name: 'Minneapolis, MN', index: 108 },
  portland: { name: 'Portland, OR', index: 131 },
  charlotte: { name: 'Charlotte, NC', index: 99 },
  nashville: { name: 'Nashville, TN', index: 109 },
  raleigh: { name: 'Raleigh, NC', index: 104 },
  columbus: { name: 'Columbus, OH', index: 90 },
  indianapolis: { name: 'Indianapolis, IN', index: 87 },
}

export const salaryComparison: CalculatorConfig = {
  slug: 'salary-comparison',
  title: 'Salary Comparison Calculator',
  category: 'finance',
  description: 'Compare two salaries accounting for cost of living differences between cities.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'currentSalary', label: 'Current Salary', type: 'number', defaultValue: 80000, min: 0, step: 1000, prefix: '$' },
    {
      id: 'city1', label: 'Current City', type: 'select',
      options: Object.entries(CITY_COL).map(([k, v]) => ({ value: k, label: v.name })),
    },
    {
      id: 'city2', label: 'Destination City', type: 'select',
      options: Object.entries(CITY_COL).map(([k, v]) => ({ value: k, label: v.name })),
    },
  ],
  calculate: (inputs, currency) => {
    const salary = Number(inputs.currentSalary)
    const city1 = CITY_COL[(inputs.city1 as string)] ?? { name: 'Current City', index: 100 }
    const city2 = CITY_COL[(inputs.city2 as string)] ?? { name: 'Destination', index: 100 }
    const equivalent = salary * (city2.index / city1.index)
    const diff = equivalent - salary
    const pctDiff = ((city2.index - city1.index) / city1.index) * 100
    const direction = pctDiff > 0 ? 'more expensive' : 'less expensive'
    const fmt = (v: number) => currency.symbol + Math.round(v).toLocaleString('en-US')
    return {
      values: [
        { label: `Equivalent in ${city2.name}`, value: fmt(equivalent), primary: true },
        { label: 'Difference', value: (diff >= 0 ? '+' : '') + fmt(diff) },
        { label: 'Cost of Living Gap', value: Math.abs(pctDiff).toFixed(1) + '% ' + direction },
        { label: 'CoL Index Ratio', value: (city2.index / city1.index).toFixed(2) + 'x' },
      ],
      summary: `${fmt(salary)} in ${city1.name} = ${fmt(equivalent)} in ${city2.name}. ${city2.name} is ${Math.abs(pctDiff).toFixed(1)}% ${direction}.`,
    }
  },
  resultLabels: ['Equivalent Salary', 'Difference', 'CoL Gap', 'Index Ratio'],
  formula: 'Adjusted Salary = Salary x (CoL Index City 2 / CoL Index City 1)',
  content: {
    howTo: ['Enter your current salary.', 'Select your current city.', 'Select the comparison city.', 'Click Calculate.'],
    faqs: [
      { q: 'Why compare salaries by city?', a: 'Cost of living varies widely; $70K in NYC buys less than $70K in a lower-cost city.' },
      { q: 'What is a cost of living index?', a: 'A measure comparing average costs across cities relative to a baseline of 100.' },
      { q: 'Does this include taxes?', a: 'State income taxes differ by location and affect real take-home pay.' },
      { q: 'How often is this data updated?', a: 'Cost of living data is typically updated annually.' },
      { q: 'How do I compare salaries in different cities?', a: 'Use a cost-of-living index to adjust salaries. A $80,000 salary in Dallas has roughly the same purchasing power as $120,000 in San Francisco due to differences in housing, taxes, and goods.' },
      { q: 'Should I negotiate salary or accept the first offer?', a: 'Always negotiate. Research suggests 85% of hiring managers have room to go higher on the first offer. Come with market data (Glassdoor, LinkedIn Salary, BLS) and ask for 10-15% above your target.' },
      { q: 'How does a raise compare to a new job offer?', a: 'Calculate both as annual compensation including benefits, bonuses, and equity. Switching jobs typically yields 10-20% salary increases on average, while internal raises average 3-5%.' },
      { q: 'What benefits should I include when comparing job offers?', a: 'Health insurance premiums (employer vs employee share), 401k match, paid time off, remote work savings, equity/RSUs, signing bonus amortized over expected tenure, and professional development budget.' },
    ],
    related: ['salary-to-hourly', 'hourly-to-salary', 'take-home-pay', 'raise-calculator', 'income-tax', 'retirement-savings'],
  },
  jsonLd: {
    faqs: [
      { q: 'Why compare salaries by city?', a: 'Cost of living varies widely between locations.' },
      { q: 'What is a cost of living index?', a: 'Compares average costs relative to a baseline.' },
      { q: 'Does this include taxes?', a: 'State income taxes differ and affect real take-home.' },
      { q: 'How often is data updated?', a: 'Typically annually.' },
      { q: 'How do I compare salaries in different cities?', a: 'Use a cost-of-living index to adjust salaries. A $80,000 salary in Dallas has roughly the same purchasing power as $120,000 in San Francisco due to differences in housing, taxes, and goods.' },
      { q: 'Should I negotiate salary or accept the first offer?', a: 'Always negotiate. Research suggests 85% of hiring managers have room to go higher on the first offer. Come with market data (Glassdoor, LinkedIn Salary, BLS) and ask for 10-15% above your target.' },
      { q: 'How does a raise compare to a new job offer?', a: 'Calculate both as annual compensation including benefits, bonuses, and equity. Switching jobs typically yields 10-20% salary increases on average, while internal raises average 3-5%.' },
      { q: 'What benefits should I include when comparing job offers?', a: 'Health insurance premiums (employer vs employee share), 401k match, paid time off, remote work savings, equity/RSUs, signing bonus amortized over expected tenure, and professional development budget.' },
    ],
    howToSteps: ['Enter current salary.', 'Select cities.', 'Click Calculate.'],
  },
  geo: {
    definition: 'A salary comparison calculator converts different pay structures (hourly, weekly, monthly, annual) and adjusts for cost-of-living differences to allow apples-to-apples comparison between job offers or career paths.',
    ruleOfThumb: 'When comparing offers: total compensation = base salary + bonus + equity value + employer benefits value (health insurance ~$7,000-$15,000/year employer cost, 401k match, PTO cash value). A higher salary with worse benefits may be worth less.',
    example: 'Offer A: $85,000 salary, $8,000 health insurance, 4% 401k match ($3,400), 15 PTO days. Offer B: $92,000 salary, $3,000 health insurance contribution, no match, 10 PTO days. True value: Offer A = $96,400 equivalent. Offer B = $95,000. Offer A wins despite lower headline salary.',
    keyFacts: [
      'The median US worker tenure is 4.1 years, meaning the long-term value of a signing bonus must be spread over that expected period. (Source: Bureau of Labor Statistics, 2024)',
      'Employees who switch jobs earn 10-20% more on average than those who stay, according to longitudinal wage data. (Source: Federal Reserve Bank of Atlanta Wage Growth Tracker)',
      'The employer cost of providing health insurance averages $7,911/year for single coverage and $22,463 for family coverage. (Source: KFF Employer Health Benefits Survey 2024)',
      'Cost-of-living difference between the cheapest and most expensive US metros can exceed 100%. A $70,000 salary in Memphis is equivalent to over $150,000 in Manhattan. (Source: Missouri Economic Research and Information Center)',
    ],
  },
  educational: {
    explainer: `Comparing job offers or career paths requires looking past the headline number. Two jobs with identical salaries can have wildly different total compensation when you account for health insurance contributions, retirement matching, paid time off, equity, remote work savings, and location-based cost of living. The most common mistake is treating salary as the primary variable when it may not even be the largest driver of financial outcome. A $10,000 salary difference can be offset entirely by employer health insurance or 401k matching. The second most common mistake is ignoring cost of living. A $120,000 salary in San Francisco has less purchasing power than $75,000 in Nashville after accounting for housing, taxes, and everyday expenses. This calculator helps you convert everything to a common basis before deciding.`,
    tips: [
      'Always ask for the full benefits package in writing before accepting an offer. "Competitive benefits" is not a number.',
      'Value paid time off at your effective hourly rate. Two extra weeks of PTO at $50/hour = $4,000 in cash-equivalent value per year.',
      'Equity and RSUs are only worth what you can sell. Discount unvested equity at a 30-50% haircut to account for vesting risk, company failure risk, and illiquidity.',
      'For remote positions, add the value of eliminated commute (time + cost). At 45 minutes each way and $12/day in transit or gas, that is $3,000+ per year and 180+ hours.',
    ],
    commonMistakes: [
      'Comparing base salary only. Bonuses, commissions, equity, and benefits routinely add 20-40% to total compensation at many employers. Always ask for the total compensation breakdown.',
      'Ignoring payroll tax differences between states. Moving from a state with 9.3% income tax to one with no state income tax is a raise of several thousand dollars a year on a $100K salary.',
      'Anchoring to your current salary during negotiation. Your current salary is irrelevant to what the role is worth in the market. Use market data, not personal history, as your anchor.',
    ],
    example: 'Marcus earns $78,000 in Dallas at a company with no 401k match and pays $450/month for health insurance. He receives an offer for $82,000 in Austin with a 3% 401k match ($2,460) and employer-paid health insurance (saves $5,400/year). The Austin offer is worth $82,000 + $2,460 + $5,400 = $89,860 in total compensation — $11,860 more than his current package, not just $4,000.',
  },
}
