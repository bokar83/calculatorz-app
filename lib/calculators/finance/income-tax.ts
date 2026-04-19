import { CalculatorConfig } from '../types'

const BRACKETS: Record<string, Array<{limit: number; rate: number}>> = {
  single: [
    { limit: 11925, rate: 0.10 },
    { limit: 48475, rate: 0.12 },
    { limit: 103350, rate: 0.22 },
    { limit: 197300, rate: 0.24 },
    { limit: 250525, rate: 0.32 },
    { limit: 626350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
  married: [
    { limit: 23850, rate: 0.10 },
    { limit: 96950, rate: 0.12 },
    { limit: 206700, rate: 0.22 },
    { limit: 394600, rate: 0.24 },
    { limit: 501050, rate: 0.32 },
    { limit: 751600, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
  hoh: [
    { limit: 17000, rate: 0.10 },
    { limit: 64850, rate: 0.12 },
    { limit: 103350, rate: 0.22 },
    { limit: 197300, rate: 0.24 },
    { limit: 250500, rate: 0.32 },
    { limit: 626350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
}
const STANDARD_DEDUCTIONS: Record<string, number> = { single: 15000, married: 30000, hoh: 22500 }

export const incomeTax: CalculatorConfig = {
  slug: 'income-tax',
  title: 'Income Tax Calculator',
  category: 'finance',
  description: 'Estimate your 2025 federal income tax using official IRS brackets. See your effective rate, marginal rate, and take-home pay.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'annualIncome', label: 'Annual Gross Income', type: 'number', defaultValue: 75000, min: 0, step: 1000, prefix: '$', hint: 'Enter your total gross income before any deductions or taxes.' },
    {
      id: 'filingStatus', label: 'Filing Status', type: 'select',
      hint: 'Your status affects both your tax brackets and standard deduction. If unsure, \'Single\' applies to unmarried filers.',
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married Filing Jointly' },
        { value: 'hoh', label: 'Head of Household' },
      ],
    },
    { id: 'deductions', label: 'Additional Deductions (above standard)', type: 'number', defaultValue: 0, min: 0, step: 500, prefix: '$', hint: 'Only enter amounts above the standard deduction ($15,000 for single, $30,000 for married). Most people enter $0 here.' },
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
      { q: 'What are the 2025 federal tax brackets?', a: 'Rates range from 10% to 37% depending on income and filing status.' },
      { q: 'What is the difference between marginal and effective tax rate?', a: 'Marginal is the rate on the last dollar earned; effective is the average rate paid.' },
      { q: 'How do deductions reduce taxes?', a: 'Deductions lower taxable income, reducing the amount of tax owed.' },
      { q: 'What is the 2025 standard deduction?', a: '$15,000 for single filers; $30,000 for married filing jointly.' },
      { q: 'What is the difference between marginal and effective tax rate?', a: 'Your marginal rate is the rate applied to your last dollar of income — it is the highest bracket you reach. Your effective rate is your total tax divided by total income — the actual average rate you pay.' },
      { q: 'Should I take the standard deduction or itemize?', a: 'Take whichever is larger. The 2025 standard deduction is $15,000 (single), $30,000 (married filing jointly), or $22,500 (head of household). Itemizing makes sense only if your deductible expenses exceed these amounts.' },
      { q: 'What income is not subject to federal income tax?', a: 'Contributions to traditional 401(k) and IRA accounts reduce taxable income. Municipal bond interest is generally tax-free. Gifts, inheritances, and life insurance payouts are typically not included in taxable income.' },
      { q: 'How do I reduce my federal income tax legally?', a: 'Maximize pre-tax retirement contributions (401k, IRA, HSA), claim all eligible deductions, harvest tax losses on investments, time income recognition strategically, and consider tax-advantaged accounts for education savings.' },
    ],
    related: ['take-home-pay', 'capital-gains-tax', 'salary-to-hourly', 'retirement-savings', 'raise-calculator', 'salary-comparison'],
  },
  jsonLd: {
    faqs: [
      { q: 'What are the 2025 federal tax brackets?', a: 'Rates from 10% to 37% based on income and filing status.' },
      { q: 'Marginal vs effective tax rate?', a: 'Marginal is on the last dollar; effective is the average rate.' },
      { q: 'How do deductions work?', a: 'They lower taxable income, reducing taxes owed.' },
      { q: 'What is the standard deduction?', a: '$15,000 single; $30,000 married (2025).' },
      { q: 'What is the difference between marginal and effective tax rate?', a: 'Your marginal rate is the rate applied to your last dollar of income — it is the highest bracket you reach. Your effective rate is your total tax divided by total income — the actual average rate you pay.' },
      { q: 'Should I take the standard deduction or itemize?', a: 'Take whichever is larger. The 2025 standard deduction is $15,000 (single), $30,000 (married filing jointly), or $22,500 (head of household). Itemizing makes sense only if your deductible expenses exceed these amounts.' },
      { q: 'What income is not subject to federal income tax?', a: 'Contributions to traditional 401(k) and IRA accounts reduce taxable income. Municipal bond interest is generally tax-free. Gifts, inheritances, and life insurance payouts are typically not included in taxable income.' },
      { q: 'How do I reduce my federal income tax legally?', a: 'Maximize pre-tax retirement contributions (401k, IRA, HSA), claim all eligible deductions, harvest tax losses on investments, time income recognition strategically, and consider tax-advantaged accounts for education savings.' },
    ],
    howToSteps: ['Enter annual income.', 'Select filing status.', 'Click Calculate.'],
  },
  educational: {
    explainer: `The US federal income tax system is progressive, meaning different portions of your income are taxed at different rates. You do not pay your "tax bracket" rate on all your income. Instead, your income is divided into chunks, and each chunk is taxed at the rate for that bracket only. For example, a single filer earning $75,000 in 2025 pays 10% on the first $11,925, 12% on the next $36,550, and 22% on everything above $48,475. Before any of that applies, deductions reduce your taxable income. Most people take the standard deduction ($15,000 for single filers in 2025), which means you do not pay tax on that first chunk of income at all. The result is your effective tax rate, which is almost always lower than your marginal rate and reflects what you actually owe as a percentage of your total income.`,
    tips: [
      'Contribute to a traditional 401(k) or IRA to reduce your taxable income dollar for dollar. Contributing $6,000 to a traditional IRA in the 22% bracket saves you $1,320 in federal taxes that year.',
      'Understand the difference between your marginal rate and effective rate before making financial decisions. If you are in the 22% bracket, only the income above $48,475 is taxed at 22%, not your whole salary.',
      'Consider itemizing deductions if your mortgage interest, state taxes, and charitable contributions exceed $15,000 for single filers. Many homeowners in high-tax states benefit from itemizing.',
      'If you expect a large refund each year, adjust your W-4 withholding. You are giving the IRS an interest-free loan on that money instead of having it in your account all year.',
    ],
    commonMistakes: [
      'Believing a raise will "put you in a higher bracket" and leave you with less take-home pay. Only the income above the bracket threshold is taxed at the higher rate, so earning more always means more after-tax income.',
      'Forgetting that this calculator shows federal tax only. Add your state income tax and FICA (Social Security and Medicare at 7.65%) to see the full picture of what comes out of your paycheck.',
      'Not accounting for other income sources. Freelance earnings, investment dividends, and rental income are all taxable and stack on top of your salary when calculating which bracket applies.',
    ],
    example: `Aisha is a single filer earning $90,000 in 2025. The standard deduction reduces her taxable income to $75,000. She pays 10% on the first $11,925 ($1,193), 12% on the next $36,550 ($4,386), and 22% on the remaining $26,525 ($5,836). Total federal tax: $11,415. Her effective rate is 12.7%, even though her marginal bracket is 22%. She would save $1,100 in taxes by contributing $5,000 to a traditional 401(k), which would drop her taxable income and keep more in the 12% bracket.`,
  },
}
