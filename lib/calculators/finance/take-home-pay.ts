import { CalculatorConfig } from '../types'

// 2024 US Federal Tax Brackets (single filer)
const BRACKETS_SINGLE = [
  { limit: 11600, rate: 0.10 },
  { limit: 47150, rate: 0.12 },
  { limit: 100525, rate: 0.22 },
  { limit: 191950, rate: 0.24 },
  { limit: 243725, rate: 0.32 },
  { limit: 609350, rate: 0.35 },
  { limit: Infinity, rate: 0.37 },
]
const BRACKETS_MARRIED = [
  { limit: 23200, rate: 0.10 },
  { limit: 94300, rate: 0.12 },
  { limit: 201050, rate: 0.22 },
  { limit: 383900, rate: 0.24 },
  { limit: 487450, rate: 0.32 },
  { limit: 731200, rate: 0.35 },
  { limit: Infinity, rate: 0.37 },
]

function calcFederalTax(taxable: number, married: boolean): number {
  const brackets = married ? BRACKETS_MARRIED : BRACKETS_SINGLE
  let tax = 0
  let prev = 0
  for (const b of brackets) {
    if (taxable <= prev) break
    tax += (Math.min(taxable, b.limit) - prev) * b.rate
    prev = b.limit
  }
  return tax
}

export const takeHomePay: CalculatorConfig = {
  slug: 'take-home-pay',
  title: 'Take-Home Pay Calculator',
  category: 'finance',
  description: 'Estimate your net pay after federal taxes, FICA, and deductions.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'grossSalary', label: 'Gross Annual Salary', type: 'number', defaultValue: 65000, min: 0, step: 1000, prefix: '$' },
    {
      id: 'filingStatus', label: 'Filing Status', type: 'select',
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married Filing Jointly' },
      ],
    },
    { id: 'stateRate', label: 'State Income Tax Rate (%)', type: 'number', defaultValue: 5, min: 0, max: 15, step: 0.1, suffix: '%' },
    { id: 'pretaxDeductions', label: 'Pre-Tax Deductions/Year (401k, HSA)', type: 'number', defaultValue: 3000, min: 0, step: 100, prefix: '$' },
  ],
  calculate: (inputs, currency) => {
    const gross = Number(inputs.grossSalary)
    const married = inputs.filingStatus === 'married'
    const stateRate = Number(inputs.stateRate) / 100
    const pretax = Number(inputs.pretaxDeductions)

    // 2024 standard deductions
    const standardDeduction = married ? 29200 : 14600

    const taxableIncome = Math.max(0, gross - pretax - standardDeduction)
    const federalTax = calcFederalTax(taxableIncome, married)
    const stateTax = gross * stateRate

    // FICA: Social Security 6.2% up to $168,600, Medicare 1.45%
    const socialSecurity = Math.min(gross, 168600) * 0.062
    const medicare = gross * 0.0145
    const fica = socialSecurity + medicare

    const totalDeductions = federalTax + stateTax + fica + pretax
    const netAnnual = gross - totalDeductions
    const effectiveRate = gross > 0 ? ((federalTax + stateTax) / gross) * 100 : 0

    const fmt = (v: number) => currency.symbol + Math.round(v).toLocaleString('en-US')

    return {
      values: [
        { label: 'Net Annual Pay', value: fmt(netAnnual), primary: true },
        { label: 'Net Monthly Pay', value: fmt(netAnnual / 12) },
        { label: 'Federal Tax', value: fmt(federalTax) },
        { label: 'Effective Tax Rate', value: effectiveRate.toFixed(1) + '%' },
        { label: 'FICA (SS + Medicare)', value: fmt(fica) },
        { label: 'State Tax (estimated)', value: fmt(stateTax) },
      ],
      summary: `Gross ${fmt(gross)} minus ${fmt(totalDeductions)} in taxes/deductions = ${fmt(netAnnual)}/year (${fmt(netAnnual / 12)}/month take-home).`,
    }
  },
  resultLabels: ['Net Annual Pay', 'Net Monthly Pay', 'Federal Tax', 'Effective Tax Rate', 'FICA', 'State Tax'],
  formula: 'Net Pay = Gross Pay - Federal Tax - State Tax - FICA - Pre-Tax Deductions',
  content: {
    howTo: ['Enter your gross annual salary.', 'Select filing status.', 'Enter your state income tax rate.', 'Enter any pre-tax deductions (401k, HSA).', 'Click Calculate.'],
    faqs: [
      { q: 'What is take-home pay?', a: 'Take-home pay is your salary after all taxes and deductions are subtracted.' },
      { q: 'What deductions are included?', a: 'Federal tax, state tax, Social Security, and Medicare.' },
      { q: 'How accurate is this estimate?', a: 'It provides a close estimate; consult a tax professional for exact figures.' },
      { q: 'Does this include 401k contributions?', a: 'Pre-tax contributions reduce your taxable income and affect take-home pay.' },
    ],
    related: ['salary-to-hourly', 'hourly-to-salary', 'income-tax', 'raise-calculator', 'salary-comparison', 'retirement-savings'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is take-home pay?', a: 'Salary minus all taxes and deductions.' },
      { q: 'What deductions are included?', a: 'Federal, state, Social Security, Medicare.' },
      { q: 'How accurate is this estimate?', a: 'A close estimate; consult a tax pro for exact figures.' },
      { q: 'Does this include 401k?', a: 'Pre-tax contributions reduce taxable income.' },
    ],
    howToSteps: ['Enter gross annual salary.', 'Select filing status.', 'Enter state tax rate.', 'Click Calculate.'],
  },
}
