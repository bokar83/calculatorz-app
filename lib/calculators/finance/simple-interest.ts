import { CalculatorConfig } from '../types'

export const simpleInterest: CalculatorConfig = {
  slug: 'simple-interest',
  title: 'Simple Interest Calculator',
  category: 'finance',
  description: 'Calculate simple interest earned or owed on a principal amount.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'principal', label: 'Principal Amount', type: 'number', defaultValue: 5000, min: 0, step: 100, prefix: '$' },
    { id: 'rate', label: 'Annual Interest Rate', type: 'number', defaultValue: 5, min: 0, max: 100, step: 0.1, suffix: '%' },
    { id: 'years', label: 'Time Period (Years)', type: 'number', defaultValue: 3, min: 0, max: 50, step: 0.5 },
  ],
  calculate: (inputs, currency) => {
    const P = Number(inputs.principal)
    const R = Number(inputs.rate) / 100
    const T = Number(inputs.years)
    const interest = P * R * T
    const total = P + interest
    const monthly = T > 0 ? interest / (T * 12) : 0
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return {
      values: [
        { label: 'Total Interest', value: fmt(interest), primary: true },
        { label: 'Total Amount', value: fmt(total) },
        { label: 'Monthly Interest', value: fmt(monthly) },
        { label: 'Effective Return', value: P === 0 ? 'N/A' : ((interest / P) * 100).toFixed(2) + '%' },
      ],
      summary: `${fmt(P)} at ${Number(inputs.rate)}% simple interest for ${T} years earns ${fmt(interest)}. Total: ${fmt(total)}.`,
    }
  },
  resultLabels: ['Total Interest', 'Total Amount', 'Monthly Interest', 'Effective Return'],
  formula: 'Interest = Principal x Rate x Time (I = PRT)',
  content: {
    howTo: ['Enter the principal amount.', 'Enter the annual interest rate.', 'Enter the number of years.', 'Click Calculate.'],
    faqs: [
      { q: 'What is simple interest?', a: 'Interest calculated only on the principal, not on accumulated interest.' },
      { q: 'How is simple interest different from compound?', a: 'Simple interest does not earn interest on interest; compound interest does.' },
      { q: 'When is simple interest used?', a: 'Common for short-term loans and certain savings accounts.' },
      { q: 'Is simple or compound interest better for savings?', a: 'Compound interest grows faster for savings; simple is more straightforward for loans.' },
    ],
    related: ['compound-interest', 'savings-goal', 'investment-return', 'loan-payment', 'personal-loan', 'roi-calculator'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is simple interest?', a: 'Interest on principal only, not accumulated interest.' },
      { q: 'How is it different from compound?', a: 'Simple does not earn interest on interest.' },
      { q: 'When is simple interest used?', a: 'Short-term loans and some savings accounts.' },
      { q: 'Which is better for savings?', a: 'Compound grows faster; simple is more predictable.' },
    ],
    howToSteps: ['Enter principal.', 'Enter rate.', 'Enter years.', 'Click Calculate.'],
  },
}
