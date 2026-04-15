import { CalculatorConfig } from '../types'

export const salesTax: CalculatorConfig = {
  slug: 'sales-tax',
  title: 'Sales Tax Calculator',
  category: 'finance',
  description: 'Calculate sales tax amount and total price including or excluding tax.',
  updatedDate: 'April 2026',
  tabs: [
    { id: 'add_tax', label: 'Add Tax to Price' },
    { id: 'remove_tax', label: 'Remove Tax from Price' },
  ],
  inputs: [
    { id: 'amount', label: 'Amount', type: 'number', defaultValue: 100, min: 0, step: 0.01, prefix: '$' },
    { id: 'taxRate', label: 'Sales Tax Rate', type: 'number', defaultValue: 8.25, min: 0, max: 25, step: 0.01, suffix: '%' },
  ],
  calculate: (inputs, currency, _u, activeTab) => {
    const amount = Number(inputs.amount)
    const rate = Number(inputs.taxRate) / 100
    const tab = activeTab || 'add_tax'
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    if (tab === 'remove_tax') {
      const preTax = amount / (1 + rate)
      const taxAmount = amount - preTax
      return {
        values: [
          { label: 'Pre-Tax Price', value: fmt(preTax), primary: true },
          { label: 'Tax Amount', value: fmt(taxAmount) },
          { label: 'Original (with tax)', value: fmt(amount) },
          { label: 'Tax Rate', value: (rate * 100).toFixed(2) + '%' },
        ],
        summary: `${fmt(amount)} (tax included) = ${fmt(preTax)} pre-tax + ${fmt(taxAmount)} tax at ${Number(inputs.taxRate)}%.`,
      }
    }

    const taxAmount = amount * rate
    const total = amount + taxAmount
    return {
      values: [
        { label: 'Total Price', value: fmt(total), primary: true },
        { label: 'Tax Amount', value: fmt(taxAmount) },
        { label: 'Pre-Tax Price', value: fmt(amount) },
        { label: 'Tax Rate', value: (rate * 100).toFixed(2) + '%' },
      ],
      summary: `${fmt(amount)} + ${(rate * 100).toFixed(2)}% tax = ${fmt(taxAmount)} tax. Total: ${fmt(total)}.`,
    }
  },
  resultLabels: ['Total Price', 'Tax Amount', 'Pre-Tax Price', 'Tax Rate'],
  formula: 'Total = Price x (1 + Tax Rate / 100)',
  content: {
    howTo: ['Enter the price.', 'Enter the sales tax rate.', 'Use "Add Tax" for pre-tax prices; "Remove Tax" to find the pre-tax price from a tax-included total.', 'Click Calculate.'],
    faqs: [
      { q: 'What is sales tax?', a: 'A percentage added to the purchase price of goods and services by state/local governments.' },
      { q: 'Which states have no sales tax?', a: 'Oregon, Montana, New Hampshire, Delaware, and Alaska have no state sales tax.' },
      { q: 'What is the average US sales tax rate?', a: 'The average combined state and local rate is around 7-8%.' },
      { q: 'Are all items taxable?', a: 'Some items like groceries and prescription drugs may be exempt in certain states.' },
    ],
    related: ['vat-calculator', 'income-tax', 'tip-calculator', 'percentage', 'profit-margin', 'capital-gains-tax'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is sales tax?', a: 'A percentage added to purchases by state/local governments.' },
      { q: 'Which states have no sales tax?', a: 'Oregon, Montana, New Hampshire, Delaware, and Alaska.' },
      { q: 'What is the average US rate?', a: 'Around 7-8% combined state and local.' },
      { q: 'Are all items taxable?', a: 'Groceries and prescriptions may be exempt in some states.' },
    ],
    howToSteps: ['Enter price.', 'Enter tax rate.', 'Select add or remove tab.', 'Click Calculate.'],
  },
}
