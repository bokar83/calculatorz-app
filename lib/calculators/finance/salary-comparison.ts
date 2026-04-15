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
    ],
    related: ['salary-to-hourly', 'hourly-to-salary', 'take-home-pay', 'raise-calculator', 'income-tax', 'retirement-savings'],
  },
  jsonLd: {
    faqs: [
      { q: 'Why compare salaries by city?', a: 'Cost of living varies widely between locations.' },
      { q: 'What is a cost of living index?', a: 'Compares average costs relative to a baseline.' },
      { q: 'Does this include taxes?', a: 'State income taxes differ and affect real take-home.' },
      { q: 'How often is data updated?', a: 'Typically annually.' },
    ],
    howToSteps: ['Enter current salary.', 'Select cities.', 'Click Calculate.'],
  },
}
