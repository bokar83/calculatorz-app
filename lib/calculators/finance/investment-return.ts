import { CalculatorConfig } from '../types'

export const investmentReturn: CalculatorConfig = {
  slug: 'investment-return',
  title: 'Investment Return Calculator',
  category: 'finance',
  description: 'Calculate total return and growth on an investment over time.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'initialInvestment', label: 'Initial Investment', type: 'number', defaultValue: 10000, min: 0, step: 500, prefix: '$' },
    { id: 'monthlyContribution', label: 'Monthly Contribution', type: 'number', defaultValue: 200, min: 0, step: 25, prefix: '$' },
    { id: 'annualReturn', label: 'Expected Annual Return (%)', type: 'number', defaultValue: 10, min: 0, max: 50, step: 0.1, suffix: '%' },
    { id: 'years', label: 'Investment Period (Years)', type: 'number', defaultValue: 20, min: 1, max: 50, step: 1 },
  ],
  calculate: (inputs, currency) => {
    const PV = Number(inputs.initialInvestment)
    const PMT = Number(inputs.monthlyContribution)
    const r = Number(inputs.annualReturn) / 100 / 12
    const n = Number(inputs.years) * 12
    const fvInitial = PV * Math.pow(1 + r, n)
    const fvContrib = r === 0 ? PMT * n : PMT * ((Math.pow(1 + r, n) - 1) / r)
    const totalValue = fvInitial + fvContrib
    const totalDeposited = PV + (PMT * n)
    const growthEarned = totalValue - totalDeposited
    const roi = totalDeposited > 0 ? ((growthEarned / totalDeposited) * 100) : 0
    const fmt = (v: number) => currency.symbol + Math.round(v).toLocaleString('en-US')
    return {
      values: [
        { label: 'Final Value', value: fmt(totalValue), primary: true },
        { label: 'Total Deposited', value: fmt(totalDeposited) },
        { label: 'Growth Earned', value: fmt(growthEarned) },
        { label: 'Total ROI', value: roi.toFixed(1) + '%' },
      ],
      summary: `${fmt(PV)} initial + ${fmt(PMT)}/month at ${Number(inputs.annualReturn)}% for ${Number(inputs.years)} years = ${fmt(totalValue)}. Growth: ${fmt(growthEarned)}.`,
    }
  },
  resultLabels: ['Final Value', 'Total Deposited', 'Growth Earned', 'Total ROI'],
  formula: 'FV = PV x (1+r)^n + PMT x [((1+r)^n - 1) / r]',
  content: {
    howTo: ['Enter initial investment amount.', 'Enter monthly contribution.', 'Set expected annual return.', 'Enter investment period.', 'Click Calculate.'],
    faqs: [
      { q: 'What is a realistic investment return?', a: 'The S&P 500 has averaged about 10% annually before inflation.' },
      { q: 'Does inflation affect returns?', a: 'Yes, real returns are nominal returns minus inflation rate.' },
      { q: 'What is dollar-cost averaging?', a: 'Investing fixed amounts regularly to reduce market timing risk.' },
      { q: 'How does reinvesting dividends help?', a: 'It allows dividends to compound over time, boosting total returns.' },
    ],
    related: ['compound-interest', 'savings-goal', 'retirement-savings', 'roi-calculator', 'inflation', 'simple-interest'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is a realistic return?', a: 'S&P 500 averages about 10% annually before inflation.' },
      { q: 'Does inflation affect returns?', a: 'Real return = nominal return minus inflation.' },
      { q: 'What is dollar-cost averaging?', a: 'Investing fixed amounts regularly to reduce timing risk.' },
      { q: 'How does reinvesting dividends help?', a: 'Dividends compound over time, boosting total returns.' },
    ],
    howToSteps: ['Enter initial investment.', 'Enter monthly contribution.', 'Enter return and years.', 'Click Calculate.'],
  },
}
