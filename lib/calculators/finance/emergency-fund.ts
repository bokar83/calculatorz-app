import { CalculatorConfig } from '../types'

export const emergencyFund: CalculatorConfig = {
  slug: 'emergency-fund',
  title: 'Emergency Fund Calculator',
  category: 'finance',
  description: 'Calculate how much you need in an emergency fund and how long to save it.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'monthlyExpenses', label: 'Monthly Essential Expenses', type: 'number', defaultValue: 3500, min: 0, step: 100, prefix: '$' },
    {
      id: 'monthsCoverage', label: 'Months of Coverage', type: 'select',
      options: [
        { value: '3', label: '3 months (minimum recommended)' },
        { value: '6', label: '6 months (standard)' },
        { value: '9', label: '9 months (freelancer/variable income)' },
        { value: '12', label: '12 months (conservative/high-risk job)' },
      ],
    },
    { id: 'currentFund', label: 'Current Emergency Fund', type: 'number', defaultValue: 1000, min: 0, step: 100, prefix: '$' },
    { id: 'monthlySavings', label: 'Monthly Savings Toward Fund', type: 'number', defaultValue: 300, min: 0, step: 50, prefix: '$' },
  ],
  calculate: (inputs, currency) => {
    const expenses = Number(inputs.monthlyExpenses)
    const months = Number(inputs.monthsCoverage) || 6
    const current = Number(inputs.currentFund)
    const monthlySave = Number(inputs.monthlySavings)
    const target = expenses * months
    const remaining = Math.max(0, target - current)
    const monthsToGoal = monthlySave > 0 ? Math.ceil(remaining / monthlySave) : Infinity
    const pctDone = target > 0 ? Math.min(100, (current / target) * 100) : 0
    const fmt = (v: number) => currency.symbol + Math.round(v).toLocaleString('en-US')
    return {
      values: [
        { label: 'Target Fund Size', value: fmt(target), primary: true },
        { label: 'Already Saved', value: fmt(current) },
        { label: 'Still Needed', value: fmt(remaining) },
        { label: 'Months to Goal', value: isFinite(monthsToGoal) ? monthsToGoal + ' months' : 'Set a monthly saving amount' },
      ],
      summary: `Your ${months}-month emergency fund target is ${fmt(target)}. You're ${pctDone.toFixed(0)}% there. ${isFinite(monthsToGoal) ? `Saving ${fmt(monthlySave)}/month: fully funded in ${monthsToGoal} months.` : ''}`,
    }
  },
  resultLabels: ['Target Fund Size', 'Already Saved', 'Still Needed', 'Months to Goal'],
  formula: 'Emergency Fund = Monthly Expenses x Months of Coverage',
  content: {
    howTo: ['Enter your monthly essential expenses.', 'Select months of coverage.', 'Enter how much you have saved.', 'Enter monthly savings amount.', 'Click Calculate.'],
    faqs: [
      { q: 'How many months of expenses should I save?', a: '3-6 months is the standard recommendation; 6+ for variable income.' },
      { q: 'Where should I keep my emergency fund?', a: 'A high-yield savings account for easy access and some growth.' },
      { q: 'What counts as an emergency?', a: 'Job loss, major medical expense, critical home or car repair.' },
      { q: 'Should I invest my emergency fund?', a: 'No, it should stay liquid and accessible at all times.' },
    ],
    related: ['savings-goal', 'retirement-savings', 'compound-interest', 'take-home-pay', 'debt-payoff', 'monthly-budget'],
  },
  jsonLd: {
    faqs: [
      { q: 'How many months should I save?', a: '3-6 months; 6+ for variable income.' },
      { q: 'Where should I keep it?', a: 'A high-yield savings account.' },
      { q: 'What counts as an emergency?', a: 'Job loss, medical bills, critical repairs.' },
      { q: 'Should I invest it?', a: 'No, keep it liquid.' },
    ],
    howToSteps: ['Enter monthly expenses.', 'Select months of coverage.', 'Enter current fund.', 'Click Calculate.'],
  },
}
