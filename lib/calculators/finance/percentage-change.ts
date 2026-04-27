import { CalculatorConfig, Currency } from '../types'

export const percentageChange: CalculatorConfig = {
  slug: 'percentage-change',
  title: 'Percentage Change Calculator',
  category: 'finance',
  description: 'Calculate percentage increase or decrease between two values. Also computes percentage of a number and reverse percentage.',
  updatedDate: 'April 2026',
  inputs: [
    {
      id: 'mode',
      label: 'What to Calculate',
      type: 'select',
      defaultValue: 'change',
      options: [
        { value: 'change', label: 'Percentage Change (old to new)' },
        { value: 'of', label: 'Percentage OF a Number' },
        { value: 'reverse', label: 'What is X% of? (Reverse)' },
      ],
    },
    {
      id: 'oldValue',
      label: 'Original / Old Value',
      type: 'number',
      defaultValue: 80,
      min: -9999999,
      max: 9999999,
      step: 0.01,
    },
    {
      id: 'newValue',
      label: 'New Value (or Percentage for mode 2/3)',
      type: 'number',
      defaultValue: 100,
      min: -9999999,
      max: 9999999,
      step: 0.01,
    },
  ],
  calculate: (_inputs: Record<string, number | string>, _currency: Currency) => {
    const mode = String(_inputs.mode)
    const a = Number(_inputs.oldValue)
    const b = Number(_inputs.newValue)

    if (isNaN(a) || isNaN(b)) {
      return { values: [{ label: 'Result', value: 'N/A' }], summary: 'Enter valid numbers.' }
    }

    if (mode === 'change') {
      // % change from old to new
      if (a === 0) {
        return { values: [{ label: 'Change', value: 'Undefined' }], summary: 'Cannot calculate percentage change from 0.' }
      }
      const change = ((b - a) / Math.abs(a)) * 100
      const direction = change >= 0 ? 'increase' : 'decrease'
      const abs = Math.abs(change)
      return {
        values: [
          { label: 'Percentage Change', value: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`, primary: true },
          { label: 'Direction', value: change >= 0 ? 'Increase' : 'Decrease' },
          { label: 'Absolute Change', value: (b - a) >= 0 ? `+${(b - a).toFixed(2)}` : (b - a).toFixed(2) },
          { label: 'Summary', value: `${a} to ${b}` },
        ],
        summary: `From ${a} to ${b} is a ${abs.toFixed(2)}% ${direction}.`,
      }
    }

    if (mode === 'of') {
      // b% of a
      const result = (a * b) / 100
      return {
        values: [
          { label: 'Result', value: result.toFixed(2), primary: true },
          { label: 'Calculation', value: `${b}% of ${a}` },
          { label: 'Formula', value: `${a} x ${b} / 100` },
          { label: 'Remainder', value: (a - result).toFixed(2) },
        ],
        summary: `${b}% of ${a} = ${result.toFixed(2)}`,
      }
    }

    if (mode === 'reverse') {
      // a is the result, b is the percentage — find original
      if (b === 0) {
        return { values: [{ label: 'Result', value: 'Undefined' }], summary: 'Percentage cannot be 0.' }
      }
      const original = (a / b) * 100
      return {
        values: [
          { label: 'Original Value', value: original.toFixed(2), primary: true },
          { label: 'Calculation', value: `${a} is ${b}% of what number?` },
          { label: 'Formula', value: `${a} / (${b} / 100)` },
          { label: 'Verification', value: `${b}% of ${original.toFixed(2)} = ${a}` },
        ],
        summary: `${a} is ${b}% of ${original.toFixed(2)}`,
      }
    }

    return { values: [{ label: 'Result', value: 'N/A' }], summary: 'Select a calculation mode.' }
  },
  resultLabels: ['Result', 'Direction', 'Absolute Change', 'Summary'],
  formula: 'Percentage Change = ((New - Old) / |Old|) x 100  |  X% of Y = (Y x X) / 100  |  Reverse: Original = Value / (Percent / 100)',
  geo: {
    definition: 'Percentage change measures how much a value has increased or decreased relative to its original value, expressed as a percentage. It is one of the most common calculations in finance, retail, and data analysis.',
    ruleOfThumb: 'A positive percentage change is an increase; negative is a decrease. Percentage change from 100 to 200 is +100%, but from 200 to 100 is -50% — the starting value matters.',
    example: 'A price that rose from $80 to $100 increased by ($100 - $80) / $80 x 100 = 25%. A salary cut from $50,000 to $45,000 is a decrease of ($45,000 - $50,000) / $50,000 x 100 = -10%.',
    keyFacts: [
      'Percentage change and percentage point change are different: a rate going from 4% to 6% is a 2 percentage point increase but a 50% relative increase.',
      'Percentage change is symmetric only in theory — a 50% drop requires a 100% gain to recover.',
      'In finance, a 10% loss followed by a 10% gain does NOT return to the original value.',
    ],
  },
  content: {
    howTo: [
      'Select what you want to calculate from the dropdown.',
      'For Percentage Change: enter the original value and the new value.',
      'For Percentage OF: enter the total (field 1) and the percentage (field 2).',
      'For Reverse: enter the result (field 1) and the known percentage (field 2).',
      'Click Calculate to see the result.',
    ],
    refTable: {
      headers: ['From', 'To', 'Percentage Change', 'Notes'],
      rows: [
        ['100', '110', '+10%', '10% increase'],
        ['100', '90', '-10%', '10% decrease'],
        ['50', '100', '+100%', 'Doubled'],
        ['100', '50', '-50%', 'Halved'],
        ['1000', '1200', '+20%', 'Common raise scenario'],
        ['200', '150', '-25%', 'Sale / discount scenario'],
        ['0.5', '1.0', '+100%', 'Decimal values work'],
      ],
    },
    faqs: [
      {
        q: 'How do I calculate percentage increase?',
        a: 'Subtract the old value from the new value, divide by the old value, then multiply by 100. Formula: ((New - Old) / Old) x 100. A result above zero is an increase.',
      },
      {
        q: 'How do I calculate percentage decrease?',
        a: 'Same formula as increase: ((New - Old) / Old) x 100. If the result is negative, it is a decrease. Example: (90 - 100) / 100 x 100 = -10%.',
      },
      {
        q: 'What is the difference between percentage change and percentage points?',
        a: 'Percentage change is relative to the original value. Percentage points are absolute. An interest rate going from 2% to 3% is a 1 percentage point increase but a 50% relative increase.',
      },
      {
        q: 'How do I find what percentage one number is of another?',
        a: 'Divide the part by the whole, then multiply by 100. Example: 40 out of 200 = (40 / 200) x 100 = 20%. Use the "Percentage OF" mode in this calculator.',
      },
    ],
    related: ['percentage', 'profit-margin', 'roi-calculator', 'inflation', 'income-tax'],
  },
  educational: {
    explainer: 'Percentage calculations come in three distinct modes, and using the wrong mode is one of the most common errors in financial math. Percentage change measures how much a value shifted relative to its starting point: divide the difference by the original value, then multiply by 100. This mode powers investment return reporting, salary increase calculations, and inflation measurement. Percentage of a whole answers "what share does this piece represent?" and is used in budgeting, tax calculations, tip math, and grade scoring. Reverse percentage works backward from a known result: if you know the final value and the percentage applied, you can recover the original base. This is useful when working out the pre-discount price of a sale item or the pre-tax base of a total invoice. A critical concept that confuses many investors is that percentage losses and gains are asymmetric. A 30% loss does not cancel out with a 30% gain. A 30% loss on $1,000 leaves $700. A subsequent 30% gain on $700 returns only $910, leaving the investor still $90 short of even. Recovery always requires a larger percentage gain than the percentage that was lost.',
    tips: [
      'When calculating investment returns, always divide by the original purchase price, not the current or final value. Dividing by the wrong base is the most frequent arithmetic error in personal finance.',
      'Distinguish percentage points from percent change when reading about interest rates or economic data. A central bank raising rates from 4% to 5% is a 1 percentage point increase but a 25% relative increase in the rate itself.',
      'Use the reverse percentage mode to verify discount claims while shopping. If a retailer says an item is "now $68" after a 15% discount, the original price should be $68 / (1 - 0.15) = $80, not $68 plus 15%.',
      'For salary negotiations, calculate the percentage increase you are asking for before entering the conversation. Asking for a 10% raise on $72,000 is a $7,200 ask; framing it as a specific dollar amount often lands better in negotiation.',
    ],
    commonMistakes: [
      'Dividing by the new value instead of the original when calculating percent change. If a stock rises from $80 to $100, the correct calculation is (100 - 80) / 80 x 100 = 25%, not (100 - 80) / 100 = 20%.',
      'Confusing percentage points with percent change in financial news. When the unemployment rate drops from 5% to 4%, that is a 1 percentage point decrease but a 20% relative decrease. The two figures tell very different stories.',
      'Applying a second percentage discount to the original price instead of the already-discounted price. A 20% discount followed by an additional 10% discount is not 30% off the original; the 10% applies to the already-reduced price.',
    ],
    example: 'Maria\'s salary increases from $72,000 to $78,000. Percent change = (78,000 - 72,000) / 72,000 x 100 = 8.33%. Now consider a stock that drops 30% from $1,000. It falls to $700. The stock then gains 30%. A 30% gain on $700 = $210, bringing the total to $910. The investor is still $90 (9%) below the original $1,000 starting value, despite the gain percentage matching the loss percentage exactly. To break even from a 30% loss, the required gain is 30 / 70 x 100 = 42.86%, not 30%.',
  },
  jsonLd: {
    faqs: [
      { q: 'How do I calculate percentage increase?', a: '((New - Old) / Old) x 100. Positive result = increase.' },
      { q: 'How do I calculate percentage decrease?', a: 'Same formula: ((New - Old) / Old) x 100. Negative result = decrease.' },
      { q: 'What is the difference between percentage change and percentage points?', a: 'Percentage change is relative; percentage points are absolute. 2% to 3% = 1 percentage point but 50% relative increase.' },
      { q: 'How do I find what percentage one number is of another?', a: 'Divide the part by the whole, multiply by 100. Example: 40/200 x 100 = 20%.' },
    ],
    howToSteps: [
      'Select the calculation mode (Percentage Change, Percentage Of, or Reverse).',
      'Enter the original value and the new value (or percentage, depending on mode).',
      'Click Calculate to see the result.',
    ],
  },
}
