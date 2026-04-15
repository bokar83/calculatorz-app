import { CalculatorConfig } from '../types'

export const savingsGoal: CalculatorConfig = {
  slug: 'savings-goal',
  title: 'Savings Goal Calculator',
  category: 'finance',
  description: 'Calculate how much to save each month to reach a financial goal.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'goalAmount', label: 'Savings Goal', type: 'number', defaultValue: 20000, min: 0, step: 500, prefix: '$' },
    { id: 'currentSavings', label: 'Already Saved', type: 'number', defaultValue: 2000, min: 0, step: 100, prefix: '$' },
    { id: 'months', label: 'Time Frame (Months)', type: 'number', defaultValue: 24, min: 1, max: 600, step: 1 },
    { id: 'annualReturn', label: 'Annual Return (%)', type: 'number', defaultValue: 4.5, min: 0, max: 20, step: 0.1, suffix: '%' },
  ],
  calculate: (inputs, currency) => {
    const goal = Number(inputs.goalAmount)
    const current = Number(inputs.currentSavings)
    const n = Number(inputs.months)
    const r = Number(inputs.annualReturn) / 100 / 12
    const fvCurrent = current * Math.pow(1 + r, n)
    const remaining = goal - fvCurrent
    const monthly = remaining <= 0 ? 0 : (r === 0 ? remaining / n : remaining * r / (Math.pow(1 + r, n) - 1))
    const totalContributions = monthly * n
    const totalDeposited = current + totalContributions
    const growthEarned = goal - totalDeposited
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return {
      values: [
        { label: 'Monthly Savings Needed', value: fmt(Math.max(0, monthly)), primary: true },
        { label: 'Total You Deposit', value: fmt(totalDeposited) },
        { label: 'Growth Earned', value: fmt(Math.max(0, growthEarned)) },
        { label: 'Goal Reached In', value: n + ' months' },
      ],
      summary: `Save ${fmt(Math.max(0, monthly))}/month for ${n} months to reach ${fmt(goal)} (${Number(inputs.annualReturn)}% annual return).`,
    }
  },
  resultLabels: ['Monthly Savings Needed', 'Total Deposits', 'Growth Earned', 'Timeline'],
  formula: 'Monthly = Remaining / [((1+r)^n - 1) / r]',
  content: {
    howTo: ['Enter your savings goal.', 'Enter how much you have already saved.', 'Set the time frame in months.', 'Enter expected annual return.', 'Click Calculate.'],
    faqs: [
      { q: 'How do I set a realistic savings goal?', a: 'Start with a specific target amount and deadline, then work backward.' },
      { q: 'Does investment return matter?', a: 'Yes, higher returns reduce the monthly contribution needed.' },
      { q: 'What savings accounts earn the most?', a: 'High-yield savings accounts and CDs typically offer higher rates.' },
      { q: 'How do I stay on track?', a: 'Automate transfers to a dedicated savings account each payday.' },
    ],
    related: ['compound-interest', 'investment-return', 'retirement-savings', 'emergency-fund', 'inflation', 'simple-interest'],
  },
  jsonLd: {
    faqs: [
      { q: 'How do I set a savings goal?', a: 'Pick a specific target and deadline, then work backward.' },
      { q: 'Does investment return matter?', a: 'Yes, higher returns reduce monthly contributions needed.' },
      { q: 'What accounts earn the most?', a: 'High-yield savings accounts and CDs.' },
      { q: 'How do I stay on track?', a: 'Automate transfers each payday.' },
    ],
    howToSteps: ['Enter savings goal.', 'Enter current savings.', 'Enter time frame and return.', 'Click Calculate.'],
  },
}
