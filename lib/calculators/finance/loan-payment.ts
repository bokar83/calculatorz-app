import { CalculatorConfig, Currency } from '../types'

export const loanPayment: CalculatorConfig = {
  slug: 'loan-payment',
  title: 'Loan Payment Calculator',
  category: 'finance',
  description: 'Calculate your monthly loan payment, total interest, and full repayment cost.',
  updatedDate: 'April 2026',
  tabs: [{ id: 'basic', label: 'Monthly Payment' }],
  inputs: [
    { id: 'loanAmount', label: 'Loan Amount', type: 'number', defaultValue: 10000, min: 0, step: 100, prefix: '$' },
    { id: 'interestRate', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 6.5, min: 0, max: 100, step: 0.1, suffix: '%' },
    { id: 'loanTermYears', label: 'Loan Term (Years)', type: 'number', defaultValue: 5, min: 1, max: 30, step: 1 },
  ],
  calculate: (inputs, currency: Currency) => {
    const P = Number(inputs.loanAmount)
    const annualRate = Number(inputs.interestRate)
    const years = Number(inputs.loanTermYears)
    const r = annualRate / 100 / 12
    const n = years * 12

    let monthly: number
    if (r === 0) {
      monthly = P / n
    } else {
      monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    }

    const totalPayment = monthly * n
    const totalInterest = totalPayment - P

    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    return {
      values: [
        { label: 'Monthly Payment', value: fmt(monthly) },
        { label: 'Total Payment', value: fmt(totalPayment) },
        { label: 'Total Interest', value: fmt(totalInterest) },
        { label: 'Interest as % of Loan', value: P === 0 ? 'N/A' : ((totalInterest / P) * 100).toFixed(1) + '%' },
      ],
      summary: `Monthly payment of ${fmt(monthly)} for ${n} months. Total interest: ${fmt(totalInterest)}.`,
    }
  },
  resultLabels: ['Monthly Payment', 'Total Payment', 'Total Interest', 'Interest as % of Loan'],
  formula: 'M = P x [r(1+r)^n] / [(1+r)^n - 1]  where r = monthly rate, n = number of payments',
  content: {
    howTo: [
      'Enter the total loan amount.',
      'Enter the annual interest rate.',
      'Set the loan term in years.',
      'Click Calculate to see your monthly payment and total interest.',
    ],
    faqs: [
      {
        q: 'How is a loan payment calculated?',
        a: 'Loan payments use an amortization formula: M = P x [r(1+r)^n] / [(1+r)^n - 1], where P is principal, r is monthly interest rate, and n is number of payments.',
      },
      {
        q: 'What happens if I make extra payments?',
        a: 'Extra payments reduce principal faster, cutting total interest and shortening the loan term.',
      },
      {
        q: 'What is a good interest rate for a personal loan?',
        a: 'Personal loan rates typically range from 6% to 36% APR depending on credit score. Rates below 10% are generally competitive.',
      },
      {
        q: 'Can I use this for a mortgage calculation?',
        a: 'Yes for a basic estimate, but mortgages often include property taxes, insurance, and HOA fees. Use our Mortgage Calculator for a more complete picture.',
      },
    ],
    related: ['mortgage-payment', 'auto-loan', 'personal-loan', 'student-loan', 'debt-payoff', 'debt-to-income'],
  },
  affiliate: {
    partner: 'LendingTree',
    label: 'Compare loan rates on LendingTree',
    url: 'https://www.lendingtree.com',
    description: 'Get multiple loan offers from top lenders in minutes.',
  },
  jsonLd: {
    faqs: [
      { q: 'How is a loan payment calculated?', a: 'Using the amortization formula: M = P x [r(1+r)^n] / [(1+r)^n - 1].' },
      { q: 'What happens if I make extra payments?', a: 'Extra payments cut principal faster, reducing total interest and loan term.' },
      { q: 'What is a good interest rate for a personal loan?', a: 'Typically 6-36% APR. Below 10% is competitive.' },
      { q: 'Can I use this for a mortgage?', a: 'For a basic estimate yes, but use the Mortgage Calculator for full costs.' },
    ],
    howToSteps: [
      'Enter the loan amount.',
      'Enter the annual interest rate.',
      'Set the loan term in years.',
      'Click Calculate.',
    ],
  },
  geo: {
    definition:
      'A loan payment calculator computes the fixed monthly payment for an installment loan using the amortization formula M = P x [r(1+r)^n] / [(1+r)^n - 1], where P is the principal, r is the monthly interest rate, and n is the total number of payments.',
    ruleOfThumb:
      'A rough estimate: for every $10,000 borrowed at 7% over 5 years, expect a monthly payment of about $198. Each extra percentage point in rate adds roughly $5/month per $10,000 borrowed. Doubling the loan term cuts the monthly payment nearly in half but more than doubles total interest paid.',
    example:
      '$15,000 personal loan at 9% APR over 4 years: monthly rate = 0.75%, n = 48 payments. Monthly payment = $373. Total paid = $17,904. Total interest = $2,904 (19.4% of loan).',
    keyFacts: [
      'Average personal loan interest rate in Q1 2025 was 12.37% APR for a 24-month loan (Federal Reserve G.19 data).',
      'Paying one extra monthly payment per year on a 5-year loan at 8% cuts total interest by approximately 14%.',
      'The first payment on a standard amortizing loan goes mostly to interest; over time, the split shifts toward principal.',
      'Origination fees (typically 1-8% of loan amount) are not captured in the monthly payment formula but add to total borrowing cost.',
    ],
  },
}
