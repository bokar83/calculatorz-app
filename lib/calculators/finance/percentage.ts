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
  educational: {
    explainer: 'Percentage calculations are the foundation of consumer finance, tax math, and investing. Three core problems cover nearly every real-world situation. The first: what is X percent of Y? This answers tip calculations, sales tax, discount amounts, and commission payments. Multiply Y by X and divide by 100. The second: X is what percent of Y? This answers grade scoring, budget allocation, and market share analysis. Divide X by Y and multiply by 100. The third: percent change from A to B? This answers investment returns, salary increases, and inflation comparisons. Subtract A from B, divide by A, multiply by 100. Mental math shortcuts accelerate everyday use. To find 10% of any number, move the decimal one place left. To find 15%, calculate 10% and add half of that. To find 25%, divide by 4. To find 5%, halve the 10% figure. A critical distinction: percentage and percentage points are not the same. When a savings account rate rises from 1% to 2%, it increased by 1 percentage point but doubled in relative terms, a 100% increase in the rate itself. Mixing these up leads to significant misunderstandings in mortgage rate discussions, investment fee comparisons, and inflation reporting.',
    tips: [
      'Use the 10/5/1 building block method for fast mental math: find 10% first (move decimal left), then derive 5% (half of 10%) and 1% (a tenth of 10%), then combine to reach any percentage quickly.',
      'Always double-check advertised discounts by working backward. If a price tag says "was $120, now $84," verify: ($120 - $84) / $120 x 100 = 30% off. Retailers occasionally misrepresent the original price in the markdown calculation.',
      'Never add percentages directly when calculating compounding markups or stacked discounts. A 10% raise followed by a 10% raise is not a 20% increase; it is 1.1 x 1.1 = 1.21, or a 21% total increase.',
      'In interest rate discussions, distinguish percentage points from percent change. A mortgage rate moving from 6% to 7% is a 1 percentage point increase but a 16.7% relative increase in your interest cost, a figure that matters when estimating payment changes.',
    ],
    commonMistakes: [
      'Adding percentage increases directly instead of compounding them. Two consecutive 10% raises produce a 21% total increase (1.1 x 1.1), not 20%, because the second raise applies to the already-raised base.',
      'Not knowing which value is the base for a percent change. Always divide by the starting value (the original, the old, the "before"). Dividing by the new or final value produces a smaller, incorrect result.',
      'Confusing markup and margin. A 50% markup means cost plus 50% of cost (cost x 1.5). A 50% margin means profit is 50% of the selling price (cost = 50% of price). They produce very different numbers from the same inputs.',
    ],
    example: 'James is negotiating a car price. The sticker is $28,000. The dealer offers 8% off. The discount = 8% of $28,000 = $2,240. New price = $25,760. The dealer then offers an additional 3% loyalty discount. That 3% applies to the already-discounted price of $25,760, not the original $28,000. Additional discount = 3% of $25,760 = $772.80. Final price = $24,987.20. If instead both discounts were applied to the original price (8% + 3% = 11% of $28,000), the result would be $24,920, a $67.20 difference in the dealer\'s favor when applying each discount sequentially to the reduced price.',
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
