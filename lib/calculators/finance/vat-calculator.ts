import { CalculatorConfig } from '../types'

export const vatCalculator: CalculatorConfig = {
  slug: 'vat-calculator',
  title: 'VAT Calculator',
  category: 'finance',
  description: 'Calculate VAT amount and net or gross price for any VAT rate.',
  updatedDate: 'April 2026',
  tabs: [
    { id: 'add_vat', label: 'Add VAT' },
    { id: 'remove_vat', label: 'Remove VAT' },
  ],
  inputs: [
    { id: 'amount', label: 'Amount', type: 'number', defaultValue: 100, min: 0, step: 0.01, prefix: '$' },
    {
      id: 'vatRate', label: 'VAT Rate', type: 'select',
      options: [
        { value: '5', label: '5% (UK reduced rate)' },
        { value: '10', label: '10% (Australia standard)' },
        { value: '15', label: '15% (New Zealand)' },
        { value: '20', label: '20% (UK standard)' },
        { value: '21', label: '21% (EU common rate)' },
        { value: '23', label: '23% (Ireland standard)' },
        { value: '25', label: '25% (Scandinavia)' },
        { value: 'custom', label: 'Custom rate' },
      ],
    },
    { id: 'customRate', label: 'Custom VAT Rate (%)', type: 'number', defaultValue: 20, min: 0, max: 50, step: 0.1, suffix: '%' },
  ],
  calculate: (inputs, currency, _u, activeTab) => {
    const amount = Number(inputs.amount)
    const vatKey = inputs.vatRate as string
    const rate = (vatKey === 'custom' ? Number(inputs.customRate) : Number(vatKey)) / 100
    const tab = activeTab || 'add_vat'
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    if (tab === 'remove_vat') {
      const net = amount / (1 + rate)
      const vatAmount = amount - net
      return {
        values: [
          { label: 'Net Price (ex-VAT)', value: fmt(net), primary: true },
          { label: 'VAT Amount', value: fmt(vatAmount) },
          { label: 'Gross Price (inc-VAT)', value: fmt(amount) },
          { label: 'VAT Rate', value: (rate * 100).toFixed(1) + '%' },
        ],
        summary: `Gross ${fmt(amount)} = net ${fmt(net)} + ${fmt(vatAmount)} VAT at ${(rate * 100).toFixed(1)}%.`,
      }
    }

    const vatAmount = amount * rate
    const gross = amount + vatAmount
    return {
      values: [
        { label: 'Gross Price (inc-VAT)', value: fmt(gross), primary: true },
        { label: 'VAT Amount', value: fmt(vatAmount) },
        { label: 'Net Price (ex-VAT)', value: fmt(amount) },
        { label: 'VAT Rate', value: (rate * 100).toFixed(1) + '%' },
      ],
      summary: `Net ${fmt(amount)} + ${fmt(vatAmount)} VAT (${(rate * 100).toFixed(1)}%) = gross ${fmt(gross)}.`,
    }
  },
  resultLabels: ['Gross Price', 'VAT Amount', 'Net Price', 'VAT Rate'],
  formula: 'VAT = Net Price x (VAT Rate / 100) | Net = Gross / (1 + Rate)',
  content: {
    howTo: ['Enter the price.', 'Select the VAT rate (or choose custom).', 'Use "Add VAT" to calculate from net; "Remove VAT" to find net from gross.', 'Click Calculate.'],
    faqs: [
      { q: 'What is VAT?', a: 'Value Added Tax is a consumption tax applied at each stage of production and sale.' },
      { q: 'What is the standard VAT rate in the UK?', a: 'The standard UK VAT rate is 20%.' },
      { q: 'How do I remove VAT from a price?', a: 'Divide the gross price by (1 + VAT rate) to get the net price.' },
      { q: 'Is VAT the same as sales tax?', a: 'Similar in concept but collected at each production stage, not just at final sale.' },
    ],
    related: ['sales-tax', 'profit-margin', 'percentage', 'tip-calculator', 'income-tax', 'capital-gains-tax'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is VAT?', a: 'A consumption tax applied at each stage of production.' },
      { q: 'UK standard VAT rate?', a: '20%.' },
      { q: 'How do I remove VAT?', a: 'Divide gross price by (1 + rate).' },
      { q: 'Is VAT the same as sales tax?', a: 'Similar concept but collected at each production stage.' },
    ],
    howToSteps: ['Enter amount.', 'Select VAT rate.', 'Choose add or remove tab.', 'Click Calculate.'],
  },
}
