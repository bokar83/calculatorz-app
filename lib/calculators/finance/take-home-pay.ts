import type { CalculatorConfig } from '../types.ts'
import { STANDARD_DEDUCTIONS, federalIncomeTax, w2Fica } from '../../tax/constants2026.ts'
import { calcStateTax } from '../../salaryNegotiation/stateTax.ts'
import { getStateBySlug } from '../../states.ts'

// Tax-year constants come from lib/tax/constants2026.ts (single source of truth, primary sources cited there).

export const takeHomePay: CalculatorConfig = {
  slug: 'take-home-pay',
  title: 'Take-Home Pay Calculator',
  category: 'finance',
  usesCurrency: true,
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
    { id: 'stateRate', label: 'State Income Tax Rate (%)', type: 'number', defaultValue: 5, min: 0, max: 15, step: 0.1, suffix: '%', hint: 'Find your state\'s income tax rate on your state government website. Nine states have 0% income tax: AK, FL, NV, NH, SD, TN, TX, WA, WY.' },
    { id: 'pretaxDeductions', label: 'Pre-Tax Deductions/Year (401k, HSA)', type: 'number', defaultValue: 3000, min: 0, step: 100, prefix: '$', hint: 'Enter your annual 401(k), HSA, or FSA contributions. These reduce your taxable income before taxes are calculated.' },
  ],
  calculate: (inputs, currency) => {
    const gross = Number(inputs.grossSalary)
    const married = inputs.filingStatus === 'married'
    const stateRate = Number(inputs.stateRate) / 100
    const pretax = Number(inputs.pretaxDeductions)

    const standardDeduction = STANDARD_DEDUCTIONS[married ? 'married' : 'single']
    const status = married ? 'married' : 'single'

    const taxableIncome = Math.max(0, gross - pretax - standardDeduction)
    const federalTax = federalIncomeTax(taxableIncome, status)

    // State tax. State pages pass a preset stateSlug and the real state rules are used (no-tax states = 0,
    // full bracket tables for CA/NY/HI/NJ/OR/MN/DC, headline flat rate elsewhere). On the generic page
    // the user's own flat rate is applied. Pre-tax 401(k)/HSA/FSA reduce state wages in most states.
    const stateWages = Math.max(0, gross - pretax)
    const stateInfo = typeof inputs.stateSlug === 'string' && inputs.stateSlug ? getStateBySlug(inputs.stateSlug) : undefined
    const stateTax = stateInfo ? calcStateTax(stateInfo.slug, stateWages, status).tax : stateWages * stateRate

    // FICA 2026: Social Security 6.2% up to the SSA wage base, Medicare 1.45%, plus 0.9% Additional Medicare over the threshold.
    const fica = w2Fica(gross, status).total

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
        { label: stateInfo ? `${stateInfo.name} State Tax (estimated)` : 'State Tax (estimated)', value: fmt(stateTax) },
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
    explainer: `Your take-home pay is what actually lands in your bank account after all mandatory deductions. For most employees, four things come out of every paycheck: federal income tax, state income tax, Social Security (6.2% of wages up to $184,500 in 2026), and Medicare (1.45% of all wages). On top of those, any pre-tax contributions you make to a 401(k), HSA, or similar account are deducted before taxes are calculated, which reduces your taxable income and your tax bill at the same time. The gap between your quoted salary and your actual paycheck can be substantial. On a $65,000 salary in a state with 5% income tax, you might take home around $48,700 annually, or about $4,056 a month. That gap is what planning your budget around gross salary (before deductions) misses, and it is the most common reason people feel financially stretched even after a raise.`,
    tips: [
      'Always negotiate your salary using gross numbers, but build your budget using net numbers. If you earn $65,000 but take home $48,000, your monthly spending limit is $4,000, not $5,417.',
      'Increasing your 401(k) contribution reduces your taxable income. Raising contributions by $200/month may only reduce your paycheck by $150-$160 after the tax savings, depending on your bracket.',
      'Know your state rate. Nine states have no income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. Moving across a state line can be worth thousands of dollars annually.',
      'Check that your withholding is accurate after any major life change like marriage, a new dependent, or a significant raise. Under-withholding leads to a tax bill in April; over-withholding means you gave the IRS a free loan.',
    ],
    commonMistakes: [
      'Budgeting based on gross income. If your offer letter says $80,000 and you plan your rent assuming that is your monthly income divided by 12, you will be short every month.',
      'Forgetting FICA taxes. Social Security and Medicare together take 7.65% of every paycheck. Many people focus only on income tax and are surprised by how large these withholdings are.',
      'Ignoring the compounding benefit of pre-tax deductions. A $500/month 401(k) contribution in the 22% tax bracket only reduces your net pay by $390, but your retirement account grows by the full $500.',
    ],
    example: `David earns $75,000 as a single filer in a state with 5% income tax and contributes $3,600/year to his 401(k). His taxable income for federal purposes drops to $55,300 after the 2026 standard deduction ($16,100) and the 401(k) contribution. Federal tax: approximately $6,878. State tax: $3,570. FICA: $5,738. Total deductions including the 401(k): $19,786. Take-home pay: $55,215 annually, or about $4,601/month. Without the 401(k) contribution, his take-home would be about $4,820/month, only $219 more per month, while his retirement savings grow by $300/month before tax savings.`,
  },
}
