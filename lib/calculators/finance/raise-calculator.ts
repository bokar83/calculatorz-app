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
    ],
    related: ['salary-to-hourly', 'hourly-to-salary', 'take-home-pay', 'salary-comparison', 'income-tax', 'compound-interest'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is the average annual raise?', a: 'Typically 3-5% per year in the US.' },
      { q: 'How do I negotiate a raise?', a: 'Research market rates and document your achievements.' },
      { q: 'Is a raise the same as a promotion?', a: 'Not always; they are separate events.' },
      { q: 'How does a raise affect taxes?', a: 'Higher income may push you into a higher bracket.' },
    ],
    howToSteps: ['Enter current salary.', 'Enter raise percentage.', 'Click Calculate.'],
  },
}
