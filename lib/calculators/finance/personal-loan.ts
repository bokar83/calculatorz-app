import { CalculatorConfig } from '../types'

export const personalLoan: CalculatorConfig = {
  slug: 'personal-loan',
  title: 'Personal Loan Calculator',
  category: 'finance',
  description: 'Calculate monthly payments, total interest, and full cost for a personal loan.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'loanAmount', label: 'Loan Amount', type: 'number', defaultValue: 10000, min: 0, step: 500, prefix: '$' },
    { id: 'interestRate', label: 'Annual Interest Rate (APR)', type: 'number', defaultValue: 11.5, min: 0, max: 50, step: 0.1, suffix: '%' },
    {
      id: 'loanTermMonths', label: 'Loan Term', type: 'select',
      options: [
        { value: '12', label: '1 year (12 months)' },
        { value: '24', label: '2 years (24 months)' },
        { value: '36', label: '3 years (36 months)' },
        { value: '48', label: '4 years (48 months)' },
        { value: '60', label: '5 years (60 months)' },
        { value: '84', label: '7 years (84 months)' },
      ],
    },
  ],
  calculate: (inputs, currency) => {
    const P = Number(inputs.loanAmount)
    const annualRate = Number(inputs.interestRate)
    const n = Number(inputs.loanTermMonths) || 36
    const r = annualRate / 100 / 12
    const monthly = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const total = monthly * n
    const interest = total - P
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return {
      values: [
        { label: 'Monthly Payment', value: fmt(monthly), primary: true },
        { label: 'Total Payment', value: fmt(total) },
        { label: 'Total Interest', value: fmt(interest) },
        { label: 'Interest as % of Loan', value: P === 0 ? 'N/A' : ((interest / P) * 100).toFixed(1) + '%' },
      ],
      summary: `${fmt(monthly)}/month for ${n} months. Total paid: ${fmt(total)}. Total interest: ${fmt(interest)}.`,
    }
  },
  resultLabels: ['Monthly Payment', 'Total Payment', 'Total Interest', 'Interest as % of Loan'],
  formula: 'M = P x [r(1+r)^n] / [(1+r)^n - 1]',
  content: {
    howTo: ['Enter the loan amount.', 'Enter the APR interest rate.', 'Select loan term.', 'Click Calculate.'],
    faqs: [
      { q: 'What can a personal loan be used for?', a: 'Debt consolidation, home improvement, medical bills, or large purchases.' },
      { q: 'What is a typical personal loan rate?', a: 'Rates range from 6% to 36% depending on creditworthiness.' },
      { q: 'Are personal loans secured or unsecured?', a: 'Most personal loans are unsecured, meaning no collateral is required.' },
      { q: 'How does credit score affect my rate?', a: 'Higher credit scores qualify for lower interest rates.' },
    ],
    related: ['loan-payment', 'auto-loan', 'debt-payoff', 'debt-to-income', 'compound-interest', 'savings-goal'],
  },
  affiliate: { partner: 'LendingTree', label: 'Compare personal loan rates on LendingTree', url: 'https://www.lendingtree.com', description: 'Get multiple offers from top lenders in minutes.' },
  jsonLd: {
    faqs: [
      { q: 'What can a personal loan be used for?', a: 'Debt consolidation, home improvement, medical, or large purchases.' },
      { q: 'What is a typical rate?', a: '6% to 36% depending on creditworthiness.' },
      { q: 'Are personal loans secured?', a: 'Most are unsecured; no collateral required.' },
      { q: 'How does credit score affect rate?', a: 'Higher scores qualify for lower rates.' },
    ],
    howToSteps: ['Enter loan amount.', 'Enter interest rate.', 'Select term.', 'Click Calculate.'],
  },
}
