import type { CalculatorConfig } from '../types.ts'
import { US_STATES } from '../../states.ts'
import { PERIODS_PER_YEAR, computeTakeHome } from '../../tax/takeHome.ts'
import type { DeductionLine, PayFrequency } from '../../tax/takeHome.ts'

// Tax-year constants come from lib/tax/constants2026.ts (single source of truth, primary sources cited there).
// The pay-frequency / pre-tax-deduction / state-wage logic lives in lib/tax/takeHome.ts (pure, unit-tested).
// State rates and brackets: lib/states.ts + lib/salaryNegotiation/stateTax.ts (Tax Foundation, "State Individual
// Income Tax Rates and Brackets, 2026", as of Jan 1 2026, plus state revenue department pages).

const stateOptions = [
  { value: 'custom', label: 'Other / type my own rate' },
  ...[...US_STATES].sort((x, y) => x.name.localeCompare(y.name)).map(s => ({ value: s.slug, label: `${s.name} (${s.abbreviation})` })),
]

const dedHint = 'Enter a dollar amount per paycheck, or switch to % to enter a percent of your gross pay for the pay period.'

export const takeHomePay: CalculatorConfig = {
  slug: 'take-home-pay',
  title: 'Take-Home Pay Calculator',
  category: 'finance',
  usesCurrency: true,
  description: 'Estimate your net pay per paycheck (weekly, biweekly, semi-monthly, monthly, annual) after federal tax, state tax, FICA, and pre-tax deductions.',
  updatedDate: 'October 2026',
  footnote: 'Estimates for planning, not tax advice; state rates as of 2026 (Tax Foundation, state revenue departments). States marked approximate use one blended rate instead of full brackets. Local and city income taxes are not included. A traditional 401(k) lowers income-tax wages but not Social Security or Medicare wages; Section 125 premiums, payroll HSA, FSA and commuter benefits lower both. Pennsylvania and New Jersey tax 401(k) deferrals; California and New Jersey tax HSA contributions.',
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
    {
      id: 'payFrequency', label: 'Pay Frequency', type: 'select', defaultValue: 'biweekly',
      hint: 'How often you are paid. Dollar deductions below are per paycheck, so this sets how many paychecks a year they apply to.',
      options: [
        { value: 'weekly', label: 'Weekly (52 paychecks)' },
        { value: 'biweekly', label: 'Biweekly, every 2 weeks (26 paychecks)' },
        { value: 'semimonthly', label: 'Semi-monthly, twice a month (24 paychecks)' },
        { value: 'monthly', label: 'Monthly (12 paychecks)' },
      ],
    },
    {
      id: 'stateSlug', label: 'State', type: 'select', defaultValue: 'custom', options: stateOptions,
      hint: 'Pick your state and its income tax is calculated for you (no-tax states are 0%, flat-tax states use their flat rate, graduated states use brackets or a labeled estimate). Choose "Other / type my own rate" to enter a rate yourself.',
    },
    { id: 'stateRate', label: 'Your State Income Tax Rate (%)', type: 'number', defaultValue: 5, min: 0, max: 15, step: 0.1, suffix: '%', showWhen: { id: 'stateSlug', equals: 'custom' }, hint: 'Used only because you chose "Other / type my own rate". Nine states tax no wage income: AK, FL, NV, NH, SD, TN, TX, WA, WY.' },
    { id: 'dedRetirement', label: 'Traditional 401(k) / 403(b)', type: 'number', defaultValue: 4, min: 0, amountOrPercent: { defaultMode: 'percent' }, hint: `${dedHint} Lowers income tax but NOT Social Security or Medicare tax.` },
    { id: 'dedHealth', label: 'Health, Dental, Vision Premiums', type: 'number', defaultValue: 0, min: 0, amountOrPercent: { defaultMode: 'amount' }, hint: `${dedHint} Section 125 premiums lower income tax AND Social Security and Medicare tax.` },
    { id: 'dedHsa', label: 'HSA (through payroll)', type: 'number', defaultValue: 0, min: 0, amountOrPercent: { defaultMode: 'amount' }, hint: `${dedHint} Payroll HSA lowers federal income tax and FICA. California and New Jersey still tax it at the state level.` },
    { id: 'dedOther', label: 'Other Pre-Tax (FSA, Commuter)', type: 'number', defaultValue: 0, min: 0, amountOrPercent: { defaultMode: 'amount' }, hint: `${dedHint} FSA and commuter benefits lower income tax and FICA.` },
  ],
  calculate: (inputs, currency) => {
    const gross = Number(inputs.grossSalary) || 0
    const married = inputs.filingStatus === 'married'
    const freq: PayFrequency = (['weekly', 'biweekly', 'semimonthly', 'monthly'] as const).includes(inputs.payFrequency as PayFrequency)
      ? (inputs.payFrequency as PayFrequency) : 'biweekly'
    const mode = (id: string): 'amount' | 'percent' => (inputs[`${id}__mode`] === 'percent' ? 'percent' : 'amount')
    const line = (kind: DeductionLine['kind'], id: string): DeductionLine =>
      ({ kind, value: Number(inputs[id]) || 0, mode: mode(id) })

    const r = computeTakeHome({
      grossAnnual: gross,
      filing: married ? 'married' : 'single',
      payFrequency: freq,
      stateSlug: typeof inputs.stateSlug === 'string' ? inputs.stateSlug : 'custom',
      customStateRatePct: Number(inputs.stateRate) || 0,
      lines: [
        line('retirement', 'dedRetirement'),
        line('health', 'dedHealth'),
        line('hsa', 'dedHsa'),
        line('other125', 'dedOther'),
      ],
      // Legacy single annual-dollar field (kept so older callers keep working).
      legacyAnnualPretax: Number(inputs.pretaxDeductions) || 0,
    })

    const stateInfo = typeof inputs.stateSlug === 'string' && inputs.stateSlug && inputs.stateSlug !== 'custom'
      ? US_STATES.find(s => s.slug === inputs.stateSlug) : undefined

    const totalDeductions = r.federalTax + r.stateTax + r.fica + r.totalPretax
    const effectiveRate = gross > 0 ? ((r.federalTax + r.stateTax) / gross) * 100 : 0
    const fmt = (v: number) => currency.symbol + Math.round(v).toLocaleString('en-US')
    const per = (n: number) => r.netAnnual / n
    const approx = r.stateTier === 'flat-approx' ? ' (approximate)' : ''

    return {
      values: [
        { label: 'Net Annual Pay', value: fmt(r.netAnnual), primary: true },
        { label: 'Net Monthly Pay', value: fmt(per(12)) },
        { label: 'Net Biweekly Pay (26/yr)', value: fmt(per(PERIODS_PER_YEAR.biweekly)) },
        { label: 'Net Semi-Monthly Pay (24/yr)', value: fmt(per(PERIODS_PER_YEAR.semimonthly)) },
        { label: 'Net Weekly Pay (52/yr)', value: fmt(per(PERIODS_PER_YEAR.weekly)) },
        { label: 'Federal Tax', value: fmt(r.federalTax) },
        { label: 'FICA (SS + Medicare)', value: fmt(r.fica) },
        { label: stateInfo ? `${stateInfo.name} State Tax${approx}` : 'State Tax (estimated)', value: fmt(r.stateTax) },
        { label: 'Pre-Tax Deductions (annual)', value: fmt(r.totalPretax) },
        { label: 'Effective Income Tax Rate', value: effectiveRate.toFixed(1) + '%' },
      ],
      summary: `Gross ${fmt(gross)} minus ${fmt(totalDeductions)} in taxes and pre-tax deductions = ${fmt(r.netAnnual)}/year: ${fmt(per(26))} biweekly, ${fmt(per(24))} semi-monthly, ${fmt(per(12))} monthly. Estimates for planning, not tax advice; state rates as of 2026.${r.stateTier === 'flat-approx' ? ' This state uses a blended-rate estimate.' : ''}`,
    }
  },
  resultLabels: ['Net Annual Pay', 'Net Monthly Pay', 'Net Biweekly Pay', 'Net Semi-Monthly Pay', 'Net Weekly Pay', 'Federal Tax', 'FICA', 'State Tax', 'Pre-Tax Deductions', 'Effective Tax Rate'],
  formula: 'Net Pay = Gross Pay - Pre-Tax Deductions - Federal Tax - State Tax - FICA. Biweekly = Annual / 26; semi-monthly = Annual / 24.',
  content: {
    howTo: ['Enter your gross annual salary.', 'Select filing status and how often you are paid.', 'Pick your state, or type your own rate.', 'Enter each pre-tax deduction as a dollar amount per paycheck or a percent of pay.', 'Click Calculate to see annual, monthly, biweekly, semi-monthly and weekly take-home.'],
    faqs: [
      { q: 'What is take-home pay?', a: 'Take-home pay is your salary after all taxes and deductions are subtracted.' },
      { q: 'What deductions are included?', a: 'Federal tax, state tax, Social Security, Medicare, and the pre-tax deductions you enter.' },
      { q: 'How accurate is this estimate?', a: 'It provides a close estimate for planning, not tax advice; consult a tax professional for exact figures. State rates are as of 2026, and some graduated states use a labeled blended-rate estimate.' },
      { q: 'Does this include 401k contributions?', a: 'Yes. A traditional 401(k) lowers the wages used for income tax but not the wages used for Social Security and Medicare. Health premiums, payroll HSA, FSA and commuter benefits lower both.' },
      { q: 'How is biweekly pay calculated?', a: 'Annual take-home divided by 26 paychecks. Semi-monthly divides by 24, weekly by 52.' },
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
      { q: 'What deductions are included?', a: 'Federal, state, Social Security, Medicare, plus your pre-tax deductions.' },
      { q: 'How accurate is this estimate?', a: 'A close estimate; consult a tax pro for exact figures.' },
      { q: 'Does this include 401k?', a: 'Yes. Pre-tax contributions reduce taxable income; a 401(k) does not reduce FICA wages.' },
    ],
    howToSteps: ['Enter gross annual salary.', 'Select filing status and pay frequency.', 'Pick your state.', 'Enter pre-tax deductions as $ or %.', 'Click Calculate.'],
  },
  educational: {
    explainer: `Your take-home pay is what actually lands in your bank account after all mandatory deductions. For most employees, four things come out of every paycheck: federal income tax, state income tax, Social Security (6.2% of wages up to $184,500 in 2026), and Medicare (1.45% of all wages). On top of those, any pre-tax contributions you make to a 401(k), HSA, or similar account are deducted before taxes are calculated, which reduces your taxable income and your tax bill at the same time. A traditional 401(k) lowers income tax but not Social Security or Medicare tax; health premiums and payroll HSA contributions lower both. The gap between your quoted salary and your actual paycheck can be substantial. On a $65,000 salary in a state with 5% income tax, you might take home around $48,700 annually, or about $4,056 a month. That gap is what planning your budget around gross salary (before deductions) misses, and it is the most common reason people feel financially stretched even after a raise.`,
    tips: [
      'Always negotiate your salary using gross numbers, but build your budget using net numbers. If you earn $65,000 but take home $48,000, your monthly spending limit is $4,000, not $5,417.',
      'Increasing your 401(k) contribution reduces your taxable income. Raising contributions by $200/month may only reduce your paycheck by $150-$160 after the tax savings, depending on your bracket.',
      'Know your state rate. Nine states tax no wage income: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. Moving across a state line can be worth thousands of dollars annually.',
      'Biweekly pay (26 paychecks) gives you two "extra" paychecks a year compared with monthly budgeting. Divide annual take-home by 26 for each check, and by 12 for the monthly budget.',
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
