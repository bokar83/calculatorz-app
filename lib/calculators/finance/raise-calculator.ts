import { CalculatorConfig } from '../types'

export const raiseCalculator: CalculatorConfig = {
  slug: 'raise-calculator',
  title: 'Raise Calculator',
  category: 'finance',
  description: 'Calculate your new salary after a raise or percentage increase.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'currentSalary', label: 'Current Annual Salary', type: 'number', defaultValue: 50000, min: 0, step: 1000, prefix: '$' },
    { id: 'raisePercent', label: 'Raise Percentage', type: 'number', defaultValue: 5, min: 0, max: 200, step: 0.1, suffix: '%' },
  ],
  calculate: (inputs, currency) => {
    const current = Number(inputs.currentSalary)
    const pct = Number(inputs.raisePercent)
    const increase = current * (pct / 100)
    const newSalary = current + increase
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return {
      values: [
        { label: 'New Annual Salary', value: fmt(newSalary), primary: true },
        { label: 'Annual Increase', value: fmt(increase) },
        { label: 'New Monthly Pay', value: fmt(newSalary / 12) },
        { label: 'Monthly Increase', value: fmt(increase / 12) },
      ],
      summary: `A ${pct}% raise on ${fmt(current)} = ${fmt(newSalary)}/year. Extra ${fmt(increase)}/year or ${fmt(increase / 12)}/month.`,
    }
  },
  resultLabels: ['New Annual Salary', 'Annual Increase', 'New Monthly Pay', 'Monthly Increase'],
  formula: 'New Salary = Current Salary x (1 + Raise % / 100)',
  content: {
    howTo: ['Enter your current annual salary.', 'Enter the raise percentage.', 'Click Calculate.'],
    faqs: [
      { q: 'What is the average annual raise?', a: 'Average raises in the US are typically 3-5% per year.' },
      { q: 'How do I negotiate a raise?', a: 'Research market rates, document achievements, and present a clear case.' },
      { q: 'Is a raise the same as a promotion?', a: 'Not always; promotions often come with raises but are separate events.' },
      { q: 'How does a raise affect taxes?', a: 'Higher income may push you into a higher tax bracket.' },
      { q: 'How often should I ask for a raise?', a: 'Most companies conduct annual performance reviews. Asking for a raise outside a review cycle is appropriate after a major accomplishment, promotion, or significant market salary shift. Do not ask more than once per year unless your role changes substantially.' },
      { q: 'What is the average annual raise in the US?', a: 'The average merit increase in the US was approximately 3.5-4% in 2024, according to salary surveys. Cost-of-living adjustments (COLAs) often run below inflation. A raise that does not keep pace with inflation is effectively a pay cut.' },
      { q: 'Should I show my employer competing offers?', a: 'It can be effective but carries risk. If you use a competing offer as leverage and your employer matches, they may view you as disloyal. Only use this tactic if you are genuinely prepared to take the other offer.' },
      { q: 'How do I calculate the impact of a raise on my take-home pay?', a: 'Your take-home increase from a gross raise is reduced by income taxes, FICA, and any state/local taxes. A $5,000 raise translates to roughly $3,200-$3,800 in additional take-home pay depending on your tax bracket.' },
    ],
    related: ['salary-to-hourly', 'hourly-to-salary', 'take-home-pay', 'salary-comparison', 'income-tax', 'compound-interest'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is the average annual raise?', a: 'Typically 3-5% per year in the US.' },
      { q: 'How do I negotiate a raise?', a: 'Research market rates and document your achievements.' },
      { q: 'Is a raise the same as a promotion?', a: 'Not always; they are separate events.' },
      { q: 'How does a raise affect taxes?', a: 'Higher income may push you into a higher bracket.' },
      { q: 'How often should I ask for a raise?', a: 'Most companies conduct annual performance reviews. Asking for a raise outside a review cycle is appropriate after a major accomplishment, promotion, or significant market salary shift. Do not ask more than once per year unless your role changes substantially.' },
      { q: 'What is the average annual raise in the US?', a: 'The average merit increase in the US was approximately 3.5-4% in 2024, according to salary surveys. Cost-of-living adjustments (COLAs) often run below inflation. A raise that does not keep pace with inflation is effectively a pay cut.' },
      { q: 'Should I show my employer competing offers?', a: 'It can be effective but carries risk. If you use a competing offer as leverage and your employer matches, they may view you as disloyal. Only use this tactic if you are genuinely prepared to take the other offer.' },
      { q: 'How do I calculate the impact of a raise on my take-home pay?', a: 'Your take-home increase from a gross raise is reduced by income taxes, FICA, and any state/local taxes. A $5,000 raise translates to roughly $3,200-$3,800 in additional take-home pay depending on your tax bracket.' },
    ],
    howToSteps: ['Enter current salary.', 'Enter raise percentage.', 'Click Calculate.'],
  },
  geo: {
    definition: 'A raise calculator computes the dollar and percentage difference between two salaries, the effective hourly rate change, and the annualized income impact of a pay increase or job offer comparison.',
    ruleOfThumb: 'A raise that matches inflation (~3%) keeps your purchasing power flat. A merit raise of 5-7% represents a real increase. Raises below inflation are effectively pay cuts. Switching jobs typically yields 10-20% increases — far above typical internal raises.',
    example: 'Current salary: $68,000. New offer: $74,500. Raise amount: $6,500. Raise percentage: 9.6%. Annualized take-home increase (assuming 28% effective tax): approximately $4,680 more per year, or $390 per month.',
    keyFacts: [
      'Average US salary increase in 2024 was 3.9%, driven largely by tight labor markets in technology, healthcare, and professional services. (Source: Willis Towers Watson Salary Budget Survey 2024)',
      'Workers who switch jobs earn on average 14.8% more than those who stay, based on 12-month wage growth data. (Source: Federal Reserve Bank of Atlanta Wage Growth Tracker)',
      'Women ask for raises at nearly the same rate as men but receive them less often — 15% of women who ask receive a raise vs. 20% of men. (Source: Lean In / McKinsey Women in the Workplace Report)',
      'Negotiating your first salary has compounding effects: a $5,000 higher starting salary, at 3% annual raises, results in $30,000+ more in cumulative earnings over 10 years. (Source: Salary.com research)',
    ],
  },
  educational: {
    explainer: `A raise is not just about the number on offer — it is about what that number means relative to your market value, your current purchasing power, and your long-term earning trajectory. The most important frame is not "how much more am I making" but "is this keeping pace with the market?" The US average merit increase in 2024 was approximately 3.9%. If you received 2.5%, you effectively received a pay cut in real terms when inflation ran at 3-4%. Raise calculators quantify this clearly so you can make informed decisions about whether to accept, negotiate, or look elsewhere. The compounding effect of salary negotiations is significant: a $5,000 difference in year-one salary compounds over a career into hundreds of thousands of dollars in cumulative earnings.`,
    tips: [
      'Come to any raise discussion with market data from at least 3 sources: Glassdoor, LinkedIn Salary, and Bureau of Labor Statistics Occupational Outlook. Employers respond to facts, not feelings.',
      'Frame your ask around value delivered, not personal needs. "I generated $400K in new contracts this year against a $180K quota" is more compelling than "I need more money."',
      'If the number is not negotiable, negotiate everything else: extra PTO, remote work days, professional development budget, or a performance review scheduled for 6 months instead of 12.',
      'Get the offer in writing before resigning from your current position. Verbal commitments are not enforceable.',
    ],
    commonMistakes: [
      'Anchoring to your current salary. If your current salary is below market, accepting a 5% raise still leaves you underpaid. Start with what the role is worth, not what you currently earn.',
      'Asking at the wrong time. Raise conversations succeed or fail based on context. After a major win, during budget season, or after a competitor offer lands are strong moments. Asking during a restructuring or right after a bad quarter is poor timing.',
      'Accepting the first number. Studies consistently show that 85% of employers have flexibility to offer more than the first figure. Not asking leaves money on the table.',
    ],
    example: 'Diana has been earning $62,000 for 2 years. She benchmarks her role using Glassdoor and LinkedIn Salary and finds the median for her title and city is $71,000. She requests a meeting, presents the data, and asks for $72,000. Her manager counters at $67,000. She accepts $67,000 plus an additional week of PTO and a 6-month check-in review. The raise is 8% — above average — plus benefits worth approximately $2,000 more.',
  },
}
