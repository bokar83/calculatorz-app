import { CalculatorConfig } from '../types'

export const profitMargin: CalculatorConfig = {
  slug: 'profit-margin',
  title: 'Profit Margin Calculator',
  category: 'finance',
  description: 'Calculate gross, operating, or net profit margin for your business.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'revenue', label: 'Total Revenue', type: 'number', defaultValue: 100000, min: 0, step: 1000, prefix: '$' },
    { id: 'cogs', label: 'Cost of Goods Sold', type: 'number', defaultValue: 60000, min: 0, step: 1000, prefix: '$' },
    { id: 'operatingExpenses', label: 'Operating Expenses', type: 'number', defaultValue: 20000, min: 0, step: 500, prefix: '$' },
    { id: 'taxes', label: 'Taxes', type: 'number', defaultValue: 5000, min: 0, step: 500, prefix: '$' },
  ],
  calculate: (inputs, currency) => {
    const revenue = Number(inputs.revenue)
    const cogs = Number(inputs.cogs)
    const opex = Number(inputs.operatingExpenses)
    const taxes = Number(inputs.taxes)
    if (revenue === 0) return { values: [{ label: 'Error', value: 'Enter revenue' }] }
    const grossProfit = revenue - cogs
    const operatingProfit = grossProfit - opex
    const netProfit = operatingProfit - taxes
    const grossMargin = (grossProfit / revenue) * 100
    const operatingMargin = (operatingProfit / revenue) * 100
    const netMargin = (netProfit / revenue) * 100
    const fmt = (v: number) => currency.symbol + Math.round(v).toLocaleString('en-US')
    return {
      values: [
        { label: 'Net Profit Margin', value: netMargin.toFixed(2) + '%', primary: true },
        { label: 'Gross Profit Margin', value: grossMargin.toFixed(2) + '%' },
        { label: 'Operating Margin', value: operatingMargin.toFixed(2) + '%' },
        { label: 'Net Profit', value: fmt(netProfit) },
      ],
      summary: 'Revenue ' + fmt(revenue) + ': gross margin ' + grossMargin.toFixed(1) + '%, operating margin ' + operatingMargin.toFixed(1) + '%, net margin ' + netMargin.toFixed(1) + '%.',
    }
  },
  resultLabels: ['Net Profit Margin', 'Gross Profit Margin', 'Operating Margin', 'Net Profit'],
  formula: 'Profit Margin = (Revenue - Costs) / Revenue x 100',
  content: {
    howTo: ['Enter total revenue.', 'Enter cost of goods sold.', 'Enter operating expenses and taxes.', 'Click Calculate.'],
    faqs: [
      { q: 'What is a good profit margin?', a: 'It varies by industry; retail averages 2-5%, software can exceed 20%.' },
      { q: 'What is gross vs net profit margin?', a: 'Gross margin excludes operating expenses; net margin includes all costs.' },
      { q: 'How can I improve profit margins?', a: 'Reduce costs, increase prices, or improve operational efficiency.' },
      { q: 'What is operating profit margin?', a: 'Revenue minus operating expenses, excluding taxes and interest.' },
    ],
    related: ['roi-calculator', 'break-even', 'sales-tax', 'vat-calculator', 'percentage', 'investment-return'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is a good profit margin?', a: 'Varies by industry; retail 2-5%, software can exceed 20%.' },
      { q: 'Gross vs net margin?', a: 'Gross excludes operating costs; net includes all costs.' },
      { q: 'How to improve margins?', a: 'Reduce costs, raise prices, or improve efficiency.' },
      { q: 'What is operating margin?', a: 'Revenue minus operating expenses, excluding taxes and interest.' },
    ],
    howToSteps: ['Enter revenue.', 'Enter costs.', 'Click Calculate.'],
  },
}
