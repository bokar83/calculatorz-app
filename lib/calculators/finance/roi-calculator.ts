import { CalculatorConfig } from '../types'

export const roiCalculator: CalculatorConfig = {
  slug: 'roi-calculator',
  title: 'ROI Calculator',
  category: 'finance',
  description: 'Calculate return on investment as a percentage of initial cost.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'initialCost', label: 'Initial Investment', type: 'number', defaultValue: 10000, min: 0, step: 100, prefix: '$' },
    { id: 'finalValue', label: 'Final Value / Return', type: 'number', defaultValue: 14500, min: 0, step: 100, prefix: '$' },
    { id: 'years', label: 'Investment Period (Years)', type: 'number', defaultValue: 3, min: 0, max: 100, step: 0.5 },
  ],
  calculate: (inputs, currency) => {
    const cost = Number(inputs.initialCost)
    const value = Number(inputs.finalValue)
    const years = Number(inputs.years)
    if (cost === 0) return { values: [{ label: 'Error', value: 'Enter initial investment' }] }
    const netReturn = value - cost
    const roi = (netReturn / cost) * 100
    const annualizedRoi = years > 0 ? (Math.pow(value / cost, 1 / years) - 1) * 100 : 0
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return {
      values: [
        { label: 'Total ROI', value: (roi >= 0 ? '+' : '') + roi.toFixed(2) + '%', primary: true },
        { label: 'Net Return', value: fmt(netReturn) },
        { label: 'Annualized ROI', value: years > 0 ? (annualizedRoi >= 0 ? '+' : '') + annualizedRoi.toFixed(2) + '%/yr' : 'N/A' },
        { label: 'Return Multiple', value: (value / cost).toFixed(2) + 'x' },
      ],
      summary: 'Invested ' + fmt(cost) + ', returned ' + fmt(value) + '. ROI: ' + roi.toFixed(2) + '%' + (years > 0 ? ' (' + annualizedRoi.toFixed(2) + '%/yr annualized)' : '') + '.',
    }
  },
  resultLabels: ['Total ROI', 'Net Return', 'Annualized ROI', 'Return Multiple'],
  formula: 'ROI = (Final Value - Initial Cost) / Initial Cost x 100',
  content: {
    howTo: ['Enter the initial investment amount.', 'Enter the final value or total return.', 'Enter the investment period in years.', 'Click Calculate.'],
    faqs: [
      { q: 'What is ROI?', a: 'Return on investment measures the efficiency of an investment relative to its cost.' },
      { q: 'What is a good ROI?', a: 'It depends on the investment type; stocks often target 7-10% annually.' },
      { q: 'How does ROI differ from profit margin?', a: 'ROI measures return relative to investment cost; margin measures profit relative to revenue.' },
      { q: 'Can ROI be negative?', a: 'Yes, a negative ROI means the investment lost money.' },
    ],
    related: ['profit-margin', 'break-even', 'investment-return', 'compound-interest', 'inflation', 'savings-goal'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is ROI?', a: 'Measures investment efficiency relative to its cost.' },
      { q: 'What is a good ROI?', a: 'Stocks often target 7-10% annually.' },
      { q: 'ROI vs profit margin?', a: 'ROI is vs cost; margin is vs revenue.' },
      { q: 'Can ROI be negative?', a: 'Yes, it means the investment lost money.' },
    ],
    howToSteps: ['Enter initial cost.', 'Enter final value.', 'Enter years.', 'Click Calculate.'],
  },
}
