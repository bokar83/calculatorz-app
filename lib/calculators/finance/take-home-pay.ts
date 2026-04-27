import { CalculatorConfig } from '../types'

// 2025 US Federal Tax Brackets (single filer)
const BRACKETS_SINGLE = [
  { limit: 11925, rate: 0.10 },
  { limit: 48475, rate: 0.12 },
  { limit: 103350, rate: 0.22 },
  { limit: 197300, rate: 0.24 },
  { limit: 250525, rate: 0.32 },
  { limit: 626350, rate: 0.35 },
  { limit: Infinity, rate: 0.37 },
]
const BRACKETS_MARRIED = [
  { limit: 23850, rate: 0.10 },
  { limit: 96950, rate: 0.12 },
  { limit: 206700, rate: 0.22 },
  { limit: 394600, rate: 0.24 },
  { limit: 501050, rate: 0.32 },
  { limit: 751600, rate: 0.35 },
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
    { id: 'grossSalary', label: 'Gross Annual Salary', type: 'number', defaultValue: 65000, min: 0, step: 1000, prefix: '$', hint: 'Your annual salary before any deductions or taxes, as shown on your offer letter or pay stub.' },
    {
      id: 'filingStatus', label: 'Filing Status', type: 'select',
      hint: 'Affects your standard deduction and tax brackets. Most single, unmarried people select \'Single\'.',
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married Filing Jointly' },
      ],
    },
    { id: 'stateRate', label: 'State Income Tax Rate (%)', type: 'number', defaultValue: 5, min: 0, max: 15, step: 0.1, suffix: '%', hint: 'Find your state\'s income tax rate on your state government website. Seven states have 0% income tax.' },
    { id: 'pretaxDeductions', label: 'Pre-Tax Deductions/Year (401k, HSA)', type: 'number', defaultValue: 3000, min: 0, step: 100, prefix: '$', hint: 'Enter your annual 401(k), HSA, or FSA contributions. These reduce your taxable income before taxes are calculated.' },
  ],
  calculate: (inputs, currency) => {
    const gross = Number(inputs.grossSalary)
    const married = inputs.filingStatus === 'married'
    const stateRate = Number(inputs.stateRate) / 100
    const pretax = Number(inputs.pretaxDeductions)

    // 2025 standard deductions
    const standardDeduction = married ? 30000 : 15000

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
  affiliate: {
    partner: 'SoFi',
    label: 'Earn more on every paycheck with SoFi',
    url: 'https://www.sofi.com/banking/',
    description: 'High-yield savings and no-fee checking. Get more from the money you take home.',
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
  educational: {
    explainer: `Your take-home pay is what actually lands in your bank account after all mandatory deductions. For most employees, four things come out of every paycheck: federal income tax, state income tax, Social Security (6.2% of wages up to $168,600 in 2025), and Medicare (1.45% of all wages). On top of those, any pre-tax contributions you make to a 401(k), HSA, or similar account are deducted before taxes are calculated, which reduces your taxable income and your tax bill at the same time. The gap between your quoted salary and your actual paycheck can be substantial. On a $65,000 salary in a state with 5% income tax, you might take home around $48,000 annually, or about $4,000 a month. That gap is what planning your budget around gross salary (before deductions) misses, and it is the most common reason people feel financially stretched even after a raise.`,
    tips: [
      'Always negotiate your salary using gross numbers, but build your budget using net numbers. If you earn $65,000 but take home $48,000, your monthly spending limit is $4,000, not $5,417.',
      'Increasing your 401(k) contribution reduces your taxable income. Raising contributions by $200/month may only reduce your paycheck by $150-$160 after the tax savings, depending on your bracket.',
      'Know your state rate. Seven states have no income tax: Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, and Wyoming. Moving across a state line can be worth thousands of dollars annually.',
      'Check that your withholding is accurate after any major life change like marriage, a new dependent, or a significant raise. Under-withholding leads to a tax bill in April; over-withholding means you gave the IRS a free loan.',
    ],
    commonMistakes: [
      'Budgeting based on gross income. If your offer letter says $80,000 and you plan your rent assuming that is your monthly income divided by 12, you will be short every month.',
      'Forgetting FICA taxes. Social Security and Medicare together take 7.65% of every paycheck. Many people focus only on income tax and are surprised by how large these withholdings are.',
      'Ignoring the compounding benefit of pre-tax deductions. A $500/month 401(k) contribution in the 22% tax bracket only reduces your net pay by $390, but your retirement account grows by the full $500.',
    ],
    example: `David earns $75,000 as a single filer in a state with 5% income tax and contributes $3,600/year to his 401(k). His taxable income for federal purposes drops to $56,400 after the standard deduction and 401(k) contribution. Federal tax: approximately $8,000. State tax: $3,750. FICA: $5,738. Total deductions including the 401(k): $21,088. Take-home pay: $53,912 annually, or about $4,493/month. Without the 401(k) contribution, his take-home would be about $4,683 — only $190 more per month, while his retirement savings grow by $300/month net after tax savings.`,
  },
}
