import { CalculatorConfig } from '../types'

export const capitalGainsTax: CalculatorConfig = {
  slug: 'capital-gains-tax',
  title: 'Capital Gains Tax Calculator',
  category: 'finance',
  description: 'Estimate capital gains tax on the sale of investments or assets.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'salePrice', label: 'Sale Price', type: 'number', defaultValue: 50000, min: 0, step: 500, prefix: '$' },
    { id: 'costBasis', label: 'Cost Basis (original purchase price)', type: 'number', defaultValue: 25000, min: 0, step: 500, prefix: '$' },
    {
      id: 'holdingPeriod', label: 'Holding Period', type: 'select',
      options: [
        { value: 'short', label: 'Short-term (1 year or less)' },
        { value: 'long', label: 'Long-term (over 1 year)' },
      ],
    },
    { id: 'annualIncome', label: 'Annual Taxable Income', type: 'number', defaultValue: 75000, min: 0, step: 1000, prefix: '$' },
  ],
  calculate: (inputs, currency) => {
    const sale = Number(inputs.salePrice)
    const basis = Number(inputs.costBasis)
    const income = Number(inputs.annualIncome)
    const isLongTerm = inputs.holdingPeriod === 'long'
    const gain = sale - basis
    if (gain <= 0) return { values: [{ label: 'Capital Loss', value: currency.symbol + Math.abs(gain).toLocaleString('en-US') }], summary: 'You have a capital loss. Losses can offset gains and up to $3,000 of ordinary income per year.' }

    let rate: number
    if (!isLongTerm) {
      // Short-term: taxed as ordinary income (simplified)
      if (income < 47150) rate = 0.22
      else if (income < 100525) rate = 0.22
      else if (income < 191950) rate = 0.24
      else rate = 0.32
    } else {
      // 2025 long-term rates
      if (income <= 47025) rate = 0
      else if (income <= 518900) rate = 0.15
      else rate = 0.20
    }

    const tax = gain * rate
    const netProceeds = gain - tax
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return {
      values: [
        { label: 'Capital Gain', value: fmt(gain), primary: true },
        { label: 'Tax Owed', value: fmt(tax) },
        { label: 'Tax Rate', value: (rate * 100).toFixed(0) + '%' },
        { label: 'Net Gain After Tax', value: fmt(netProceeds) },
      ],
      summary: `${fmt(gain)} ${isLongTerm ? 'long-term' : 'short-term'} gain taxed at ${(rate * 100).toFixed(0)}% = ${fmt(tax)} owed. Net gain: ${fmt(netProceeds)}.`,
    }
  },
  resultLabels: ['Capital Gain', 'Tax Owed', 'Tax Rate', 'Net Gain After Tax'],
  formula: 'Capital Gains Tax = (Sale Price - Cost Basis) x Tax Rate',
  content: {
    howTo: ['Enter the sale price of the asset.', 'Enter your cost basis (what you paid).', 'Select short or long-term holding period.', 'Enter your annual income for rate calculation.', 'Click Calculate.'],
    faqs: [
      { q: 'What is the capital gains tax rate?', a: 'Long-term rates are 0%, 15%, or 20% based on income; short-term rates match ordinary income tax.' },
      { q: 'What is a long-term vs short-term gain?', a: 'Long-term is for assets held over one year; short-term is one year or less.' },
      { q: 'What is cost basis?', a: 'The original price you paid for an asset, including fees and commissions.' },
      { q: 'Can losses offset gains?', a: 'Yes, capital losses can offset gains and up to $3,000 of ordinary income per year.' },
    ],
    related: ['income-tax', 'investment-return', 'roi-calculator', 'inflation', 'retirement-savings', 'sales-tax'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is the capital gains rate?', a: 'Long-term: 0%, 15%, or 20%; short-term: ordinary income rates.' },
      { q: 'Long-term vs short-term?', a: 'Long-term is over one year; short-term is one year or less.' },
      { q: 'What is cost basis?', a: 'The original purchase price including fees.' },
      { q: 'Can losses offset gains?', a: 'Yes, and up to $3,000 of ordinary income per year.' },
    ],
    howToSteps: ['Enter sale price.', 'Enter cost basis.', 'Select holding period.', 'Click Calculate.'],
  },
}
