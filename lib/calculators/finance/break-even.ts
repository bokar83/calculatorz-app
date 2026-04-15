import { CalculatorConfig } from '../types'

export const breakEven: CalculatorConfig = {
  slug: 'break-even',
  title: 'Break-Even Calculator',
  category: 'finance',
  description: 'Calculate the sales volume needed to cover fixed and variable costs.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'fixedCosts', label: 'Monthly Fixed Costs', type: 'number', defaultValue: 10000, min: 0, step: 100, prefix: '$' },
    { id: 'pricePerUnit', label: 'Price Per Unit', type: 'number', defaultValue: 50, min: 0, step: 1, prefix: '$' },
    { id: 'variableCostPerUnit', label: 'Variable Cost Per Unit', type: 'number', defaultValue: 30, min: 0, step: 1, prefix: '$' },
  ],
  calculate: (inputs, currency) => {
    const fixed = Number(inputs.fixedCosts)
    const price = Number(inputs.pricePerUnit)
    const variable = Number(inputs.variableCostPerUnit)
    const contribution = price - variable
    if (contribution <= 0) return { values: [{ label: 'Error', value: 'Price must exceed variable cost' }] }
    const units = Math.ceil(fixed / contribution)
    const revenue = units * price
    const contributionMargin = (contribution / price) * 100
    const profitAt2x = (units * 2 * contribution) - fixed
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return {
      values: [
        { label: 'Break-Even Units', value: units.toLocaleString('en-US'), primary: true },
        { label: 'Break-Even Revenue', value: fmt(revenue) },
        { label: 'Contribution Margin', value: contributionMargin.toFixed(1) + '%' },
        { label: 'Profit at 2x Sales', value: fmt(profitAt2x) },
      ],
      summary: 'Sell ' + units.toLocaleString() + ' units at ' + fmt(price) + ' to break even (' + fmt(revenue) + ' revenue). Contribution margin per unit: ' + fmt(contribution) + '.',
    }
  },
  resultLabels: ['Break-Even Units', 'Break-Even Revenue', 'Contribution Margin', 'Profit at 2x Sales'],
  formula: 'Break-Even Units = Fixed Costs / (Price per Unit - Variable Cost per Unit)',
  content: {
    howTo: ['Enter your monthly fixed costs.', 'Enter price per unit.', 'Enter variable cost per unit.', 'Click Calculate.'],
    faqs: [
      { q: 'What is break-even analysis?', a: 'It shows the point where total revenue equals total costs, resulting in no profit or loss.' },
      { q: 'What are fixed vs variable costs?', a: 'Fixed costs do not change with output; variable costs increase with production.' },
      { q: 'How does price affect break-even?', a: 'Higher prices lower the break-even point; lower prices raise it.' },
      { q: 'Why is break-even important?', a: 'It helps businesses understand the minimum sales needed to stay viable.' },
    ],
    related: ['profit-margin', 'roi-calculator', 'sales-tax', 'percentage', 'investment-return', 'savings-goal'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is break-even analysis?', a: 'The point where revenue equals costs; no profit or loss.' },
      { q: 'Fixed vs variable costs?', a: 'Fixed do not change with output; variable increase with production.' },
      { q: 'How does price affect it?', a: 'Higher prices lower the break-even point.' },
      { q: 'Why is it important?', a: 'Shows minimum sales needed to stay viable.' },
    ],
    howToSteps: ['Enter fixed costs.', 'Enter price per unit.', 'Enter variable cost.', 'Click Calculate.'],
  },
}
