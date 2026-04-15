import { CalculatorConfig } from '../types'

export const debtPayoff: CalculatorConfig = {
  slug: 'debt-payoff',
  title: 'Debt Payoff Calculator',
  category: 'finance',
  description: 'Calculate how long it will take to pay off debt with fixed monthly payments.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'balance', label: 'Current Balance', type: 'number', defaultValue: 8000, min: 0, step: 100, prefix: '$' },
    { id: 'interestRate', label: 'Annual Interest Rate (APR)', type: 'number', defaultValue: 19.99, min: 0, max: 50, step: 0.01, suffix: '%' },
    { id: 'monthlyPayment', label: 'Monthly Payment', type: 'number', defaultValue: 250, min: 0, step: 10, prefix: '$' },
  ],
  calculate: (inputs, currency) => {
    const P = Number(inputs.balance)
    const annualRate = Number(inputs.interestRate)
    const payment = Number(inputs.monthlyPayment)
    const r = annualRate / 100 / 12

    const minPayment = P * r
    if (payment <= minPayment) {
      return { values: [{ label: 'Error', value: 'Payment too low to cover interest — increase monthly payment.' }] }
    }

    const months = r === 0 ? Math.ceil(P / payment) : Math.ceil(-Math.log(1 - (r * P) / payment) / Math.log(1 + r))
    const total = payment * months
    const interest = total - P
    const years = Math.floor(months / 12)
    const remMonths = months % 12
    const timeline = years > 0 ? `${years}y ${remMonths}m` : `${months} months`

    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    return {
      values: [
        { label: 'Payoff Time', value: timeline, primary: true },
        { label: 'Total Paid', value: fmt(total) },
        { label: 'Total Interest', value: fmt(interest) },
        { label: 'Interest as % of Debt', value: P === 0 ? 'N/A' : ((interest / P) * 100).toFixed(1) + '%' },
      ],
      summary: `Paying ${fmt(payment)}/month on ${fmt(P)} at ${annualRate}% APR: debt-free in ${timeline}. Total interest: ${fmt(interest)}.`,
    }
  },
  resultLabels: ['Payoff Time', 'Total Paid', 'Total Interest', 'Interest as % of Debt'],
  formula: 'Months = -log(1 - (r x Balance / Payment)) / log(1 + r)',
  content: {
    howTo: ['Enter your current debt balance.', 'Enter the APR interest rate.', 'Enter your planned monthly payment.', 'Click Calculate.'],
    faqs: [
      { q: 'What is the debt snowball method?', a: 'Pay off smallest debts first for psychological momentum.' },
      { q: 'What is the debt avalanche method?', a: 'Pay off highest-interest debts first to minimize total interest.' },
      { q: 'How much extra should I pay each month?', a: 'Even small extra payments significantly reduce payoff time.' },
      { q: 'Should I consolidate my debt?', a: 'Consolidation can lower your rate but extends repayment if not managed carefully.' },
    ],
    related: ['loan-payment', 'personal-loan', 'debt-to-income', 'savings-goal', 'compound-interest', 'emergency-fund'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is the debt snowball method?', a: 'Pay smallest debts first for momentum.' },
      { q: 'What is the debt avalanche?', a: 'Pay highest-interest debts first.' },
      { q: 'How much extra should I pay?', a: 'Even small extra payments reduce payoff time significantly.' },
      { q: 'Should I consolidate?', a: 'It can lower your rate but requires discipline.' },
    ],
    howToSteps: ['Enter debt balance.', 'Enter APR.', 'Enter monthly payment.', 'Click Calculate.'],
  },
}
