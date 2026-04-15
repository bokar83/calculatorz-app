import { CalculatorConfig } from '../types'

export const studentLoan: CalculatorConfig = {
  slug: 'student-loan',
  title: 'Student Loan Calculator',
  category: 'finance',
  description: 'Calculate student loan monthly payments and total repayment cost.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'loanBalance', label: 'Total Loan Balance', type: 'number', defaultValue: 35000, min: 0, step: 500, prefix: '$' },
    { id: 'interestRate', label: 'Annual Interest Rate', type: 'number', defaultValue: 6.54, min: 0, max: 25, step: 0.01, suffix: '%' },
    {
      id: 'repaymentPlan', label: 'Repayment Plan', type: 'select',
      options: [
        { value: '120', label: 'Standard (10 years)' },
        { value: '180', label: 'Extended (15 years)' },
        { value: '240', label: 'Extended (20 years)' },
        { value: '300', label: 'Extended (25 years)' },
        { value: '360', label: 'Extended (30 years)' },
      ],
    },
  ],
  calculate: (inputs, currency) => {
    const P = Number(inputs.loanBalance)
    const annualRate = Number(inputs.interestRate)
    const n = Number(inputs.repaymentPlan) || 120
    const r = annualRate / 100 / 12
    const monthly = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const total = monthly * n
    const interest = total - P
    const years = n / 12
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return {
      values: [
        { label: 'Monthly Payment', value: fmt(monthly), primary: true },
        { label: 'Total Repaid', value: fmt(total) },
        { label: 'Total Interest', value: fmt(interest) },
        { label: 'Payoff Timeline', value: years + ' years' },
      ],
      summary: `${fmt(monthly)}/month for ${years} years. Total repaid: ${fmt(total)}. Interest cost: ${fmt(interest)}.`,
    }
  },
  resultLabels: ['Monthly Payment', 'Total Repaid', 'Total Interest', 'Payoff Timeline'],
  formula: 'M = P x [r(1+r)^n] / [(1+r)^n - 1]',
  content: {
    howTo: ['Enter your total loan balance.', 'Enter the interest rate (check your servicer).', 'Select a repayment plan.', 'Click Calculate.'],
    faqs: [
      { q: 'What is the standard repayment plan?', a: 'The standard plan repays loans in 10 years with fixed monthly payments.' },
      { q: 'What are income-driven repayment plans?', a: 'Plans that cap payments at a percentage of discretionary income.' },
      { q: 'Can student loans be forgiven?', a: 'Public Service Loan Forgiveness (PSLF) and other programs may apply.' },
      { q: 'Should I pay off student loans early?', a: 'It depends on your interest rate versus potential investment returns.' },
    ],
    related: ['loan-payment', 'personal-loan', 'debt-payoff', 'debt-to-income', 'salary-to-hourly', 'income-tax'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is the standard repayment plan?', a: '10 years with fixed monthly payments.' },
      { q: 'What are income-driven plans?', a: 'Payments capped at a percentage of discretionary income.' },
      { q: 'Can loans be forgiven?', a: 'PSLF and other programs may apply.' },
      { q: 'Should I pay off early?', a: 'Depends on rate vs. potential investment returns.' },
    ],
    howToSteps: ['Enter loan balance.', 'Enter interest rate.', 'Select repayment plan.', 'Click Calculate.'],
  },
}
