import { CalculatorConfig } from '../types'

const BRACKETS: Record<string, Array<{limit: number; rate: number}>> = {
  single: [
    { limit: 11600, rate: 0.10 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
  married: [
    { limit: 23200, rate: 0.10 },
    { limit: 94300, rate: 0.12 },
    { limit: 201050, rate: 0.22 },
    { limit: 383900, rate: 0.24 },
    { limit: 487450, rate: 0.32 },
    { limit: 731200, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
  hoh: [
    { limit: 16550, rate: 0.10 },
    { limit: 63100, rate: 0.12 },
    { limit: 100500, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243700, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
}
const STANDARD_DEDUCTIONS: Record<string, number> = { single: 14600, married: 29200, hoh: 21900 }

export const incomeTax: CalculatorConfig = {
  slug: 'income-tax',
  title: 'Income Tax Calculator',
  category: 'finance',
  description: 'Estimate your 2024 federal income tax liability using current IRS brackets.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'annualIncome', label: 'Annual Gross Income', type: 'number', defaultValue: 75000, min: 0, step: 1000, prefix: '$' },
    {
      id: 'filingStatus', label: 'Filing Status', type: 'select',
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married Filing Jointly' },
        { value: 'hoh', label: 'Head of Household' },
      ],
    },
    { id: 'deductions', label: 'Additional Deductions (above standard)', type: 'number', defaultValue: 0, min: 0, step: 500, prefix: '$' },
  ],
  calculate: (inputs, currency) => {
    const gross = Number(inputs.annualIncome)
    const status = (inputs.filingStatus as string) || 'single'
    const extra = Number(inputs.deductions)
    const stdDed = STANDARD_DEDUCTIONS[status] ?? 14600
    const totalDed = stdDed + extra
    const taxable = Math.max(0, gross - totalDed)
    const brackets = BRACKETS[status] ?? BRACKETS.single
    let tax = 0; let prev = 0
    let marginalRate = 0
    for (const b of brackets) {
      if (taxable <= prev) break
      const chunk = Math.min(taxable, b.limit) - prev
      tax += chunk * b.rate
      if (taxable > prev) marginalRate = b.rate
      prev = b.limit
    }
    const effective = gross > 0 ? (tax / gross) * 100 : 0
    const fmt = (v: number) => currency.symbol + Math.round(v).toLocaleString('en-US')
    return {
      values: [
        { label: 'Estimated Federal Tax', value: fmt(tax), primary: true },
        { label: 'Effective Tax Rate', value: effective.toFixed(2) + '%' },
        { label: 'Marginal Rate', value: (marginalRate * 100).toFixed(0) + '%' },
        { label: 'Taxable Income', value: fmt(taxable) },
      ],
      summary: `On ${fmt(gross)} gross income: ${fmt(tax)} federal tax. Effective rate: ${effective.toFixed(2)}%. Marginal bracket: ${(marginalRate * 100).toFixed(0)}%.`,
    }
  },
  resultLabels: ['Estimated Federal Tax', 'Effective Tax Rate', 'Marginal Rate', 'Taxable Income'],
  formula: 'Tax = Sum of (Income in each bracket x Bracket Rate)',
  content: {
    howTo: ['Enter your annual gross income.', 'Select your filing status.', 'Add any deductions above the standard deduction.', 'Click Calculate.'],
    faqs: [
      { q: 'What are the 2024 federal tax brackets?', a: 'Rates range from 10% to 37% depending on income and filing status.' },
      { q: 'What is the difference between marginal and effective tax rate?', a: 'Marginal is the rate on the last dollar earned; effective is the average rate paid.' },
      { q: 'How do deductions reduce taxes?', a: 'Deductions lower taxable income, reducing the amount of tax owed.' },
      { q: 'What is the 2024 standard deduction?', a: '$14,600 for single filers; $29,200 for married filing jointly.' },
    ],
    related: ['take-home-pay', 'capital-gains-tax', 'salary-to-hourly', 'retirement-savings', 'raise-calculator', 'salary-comparison'],
  },
  jsonLd: {
    faqs: [
      { q: 'What are the 2024 federal tax brackets?', a: 'Rates from 10% to 37% based on income and filing status.' },
      { q: 'Marginal vs effective tax rate?', a: 'Marginal is on the last dollar; effective is the average rate.' },
      { q: 'How do deductions work?', a: 'They lower taxable income, reducing taxes owed.' },
      { q: 'What is the standard deduction?', a: '$14,600 single; $29,200 married (2024).' },
    ],
    howToSteps: ['Enter annual income.', 'Select filing status.', 'Click Calculate.'],
  },
}
