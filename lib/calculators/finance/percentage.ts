import { CalculatorConfig } from '../types'

export const percentage: CalculatorConfig = {
  slug: 'percentage',
  title: 'Percentage Calculator',
  category: 'finance',
  description: 'Calculate percentages, percentage change, or find the original value.',
  updatedDate: 'April 2026',
  tabs: [
    { id: 'percent_of', label: 'X% of Y' },
    { id: 'what_percent', label: 'X is what % of Y' },
    { id: 'percent_change', label: 'Percent Change' },
  ],
  inputs: [
    { id: 'valueA', label: 'First Value', type: 'number', defaultValue: 15 },
    { id: 'valueB', label: 'Second Value', type: 'number', defaultValue: 200 },
  ],
  calculate: (inputs, _currency, _unitSystem, activeTab) => {
    const a = Number(inputs.valueA)
    const b = Number(inputs.valueB)
    const tab = activeTab || 'percent_of'

    if (tab === 'percent_of') {
      // What is A% of B?
      const result = (a / 100) * b
      return {
        values: [
          { label: `${a}% of ${b}`, value: result.toLocaleString('en-US', { maximumFractionDigits: 4 }), primary: true },
          { label: 'As a decimal', value: (a / 100).toFixed(4) },
          { label: 'Remaining', value: (b - result).toLocaleString('en-US', { maximumFractionDigits: 4 }) },
        ],
        summary: `${a}% of ${b} = ${result.toLocaleString('en-US', { maximumFractionDigits: 4 })}`,
      }
    }

    if (tab === 'what_percent') {
      // A is what percent of B?
      if (b === 0) return { values: [{ label: 'Error', value: 'Cannot divide by zero' }] }
      const pct = (a / b) * 100
      return {
        values: [
          { label: `${a} is what % of ${b}`, value: pct.toFixed(2) + '%', primary: true },
          { label: 'As a decimal', value: (a / b).toFixed(4) },
          { label: 'Remaining %', value: (100 - pct).toFixed(2) + '%' },
        ],
        summary: `${a} is ${pct.toFixed(2)}% of ${b}`,
      }
    }

    // percent_change: change from A to B
    if (a === 0) return { values: [{ label: 'Error', value: 'Original value cannot be zero' }] }
    const change = ((b - a) / Math.abs(a)) * 100
    const direction = change >= 0 ? 'increase' : 'decrease'
    const diff = b - a
    return {
      values: [
        { label: 'Percent Change', value: (change >= 0 ? '+' : '') + change.toFixed(2) + '%', primary: true },
        { label: 'Direction', value: change >= 0 ? 'Increase' : 'Decrease' },
        { label: 'Absolute Change', value: (diff >= 0 ? '+' : '') + diff.toLocaleString('en-US', { maximumFractionDigits: 4 }) },
      ],
      summary: `From ${a} to ${b} is a ${Math.abs(change).toFixed(2)}% ${direction}.`,
    }
  },
  resultLabels: ['Result', 'As a decimal', 'Remaining'],
  formula: 'Percentage = (Part / Whole) x 100 | Percent Change = (New - Old) / |Old| x 100',
  content: {
    howTo: ['Select the type of calculation (tab above).', 'Enter the two values.', 'Click Calculate for the result.', 'Switch tabs for different percentage operations.'],
    faqs: [
      { q: 'How do I calculate a percentage of a number?', a: 'Multiply the number by the percentage then divide by 100.' },
      { q: 'How do I find percentage change?', a: '(New Value - Old Value) / Old Value x 100.' },
      { q: 'What is percentage increase vs decrease?', a: 'Positive change is an increase; negative change is a decrease.' },
      { q: 'How do I work backwards from a percentage?', a: 'Divide the result by the percentage and multiply by 100.' },
    ],
    related: ['sales-tax', 'tip-calculator', 'vat-calculator', 'profit-margin', 'roi-calculator', 'inflation'],
  },
  jsonLd: {
    faqs: [
      { q: 'How to find a percentage of a number?', a: 'Multiply by percentage then divide by 100.' },
      { q: 'How to find percentage change?', a: '(New - Old) / Old x 100.' },
      { q: 'Percentage increase vs decrease?', a: 'Positive is increase; negative is decrease.' },
      { q: 'How to work backwards from a percentage?', a: 'Divide result by percentage and multiply by 100.' },
    ],
    howToSteps: ['Enter value.', 'Enter percentage.', 'Select type.', 'Click Calculate.'],
  },
  geo: {
    definition:
      'A percentage calculator solves three core problems: finding what percent one number is of another, calculating a percentage of a given value, and computing percent change between two numbers. It uses the formula: Percentage = (Part / Whole) x 100.',
    ruleOfThumb:
      'Quick mental math shortcut: to find 10% of any number, move the decimal one place left. To find 15%, calculate 10% then add half of it. To find 25%, divide by 4. For percent change, always divide by the original (starting) value, not the new one.',
    example:
      'Store discount: original price $80, sale price $68. Percent change = (68 - 80) / 80 x 100 = -15%. The item is 15% off. To verify: 15% of $80 = $12; $80 - $12 = $68.',
    keyFacts: [
      'Percentage errors are among the most common math mistakes in consumer finance, tax filing, and investment returns (FINRA Investor Education, 2023).',
      'A 1% difference in APR on a $300,000 mortgage equals approximately $170/month or $61,000 over a 30-year term.',
      'Percentage change calculations are the basis for inflation rate, GDP growth rate, and stock return reporting.',
      'The word "percent" comes from Latin per centum, meaning "per hundred" — percentages are always expressed out of 100.',
    ],
  },
}
