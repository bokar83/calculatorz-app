import { CalculatorConfig, Currency } from '../types'

export const mortgagePayment: CalculatorConfig = {
  slug: 'mortgage-payment',
  title: 'Mortgage Payment Calculator',
  category: 'finance',
  description: 'Calculate your monthly mortgage payment including principal, interest, taxes, and insurance.',
  updatedDate: 'April 2026',
  tabs: [{ id: 'basic', label: 'Monthly Payment' }],
  inputs: [
    { id: 'homePrice', label: 'Home Price', type: 'number', defaultValue: 350000, min: 0, step: 1000, prefix: '$' },
    { id: 'downPayment', label: 'Down Payment (%)', type: 'number', defaultValue: 20, min: 0, max: 100, step: 1, suffix: '%' },
    { id: 'interestRate', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 7.0, min: 0, max: 30, step: 0.1, suffix: '%' },
    { id: 'loanTermYears', label: 'Loan Term (Years)', type: 'number', defaultValue: 30, min: 5, max: 30, step: 5 },
    { id: 'propertyTaxRate', label: 'Property Tax Rate (%/yr)', type: 'number', defaultValue: 1.1, min: 0, max: 5, step: 0.1, suffix: '%' },
    { id: 'insurancePerYear', label: 'Home Insurance ($/yr)', type: 'number', defaultValue: 1200, min: 0, step: 100, prefix: '$' },
  ],
  calculate: (inputs, currency: Currency) => {
    const price = Number(inputs.homePrice)
    const dpPct = Number(inputs.downPayment) / 100
    const P = price * (1 - dpPct)
    const r = Number(inputs.interestRate) / 100 / 12
    const n = Number(inputs.loanTermYears) * 12
    const taxMonthly = (price * Number(inputs.propertyTaxRate) / 100) / 12
    const insuranceMonthly = Number(inputs.insurancePerYear) / 12

    let principalAndInterest: number
    if (r === 0) {
      principalAndInterest = P / n
    } else {
      principalAndInterest = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    }

    const total = principalAndInterest + taxMonthly + insuranceMonthly
    const totalInterest = principalAndInterest * n - P

    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    return {
      values: [
        { label: 'Total Monthly Payment', value: fmt(total) },
        { label: 'Principal & Interest', value: fmt(principalAndInterest) },
        { label: 'Property Tax (monthly)', value: fmt(taxMonthly) },
        { label: 'Home Insurance (monthly)', value: fmt(insuranceMonthly) },
        { label: 'Total Interest (life of loan)', value: fmt(totalInterest) },
      ],
      summary: `Monthly payment of ${fmt(total)} on a ${currency.symbol}${price.toLocaleString()} home.`,
    }
  },
  resultLabels: ['Total Monthly Payment', 'Principal & Interest', 'Property Tax (monthly)', 'Home Insurance (monthly)', 'Total Interest (life of loan)'],
  formula: 'M = P x [r(1+r)^n] / [(1+r)^n - 1] + monthly taxes + monthly insurance',
  content: {
    howTo: [
      'Enter the home purchase price.',
      'Enter your down payment percentage.',
      'Enter the current mortgage interest rate.',
      'Select 15-year or 30-year term.',
      'Add estimated property tax rate and annual insurance.',
      'Click Calculate to see total monthly payment.',
    ],
    faqs: [
      {
        q: 'What is included in a mortgage payment?',
        a: 'A full mortgage payment (PITI) includes: Principal (loan repayment), Interest, property Taxes, and Insurance.',
      },
      {
        q: 'What is a good mortgage rate right now?',
        a: 'Mortgage rates vary by lender, credit score, and market conditions. Check current rates from multiple lenders.',
      },
      {
        q: 'How much house can I afford?',
        a: 'A common guideline is the 28% rule: housing costs should not exceed 28% of your gross monthly income. Total debt should stay below 36%.',
      },
      {
        q: 'Should I choose a 15 or 30-year mortgage?',
        a: 'A 15-year mortgage has higher monthly payments but far less total interest. A 30-year has lower payments and more flexibility.',
      },
    ],
    related: ['loan-payment', 'auto-loan', 'debt-payoff', 'savings-goal', 'income-tax', 'debt-to-income'],
  },
  geo: {
    definition: 'A mortgage payment calculator computes the monthly payment on a home loan using the standard amortization formula, factoring in the loan principal, annual interest rate, and loan term in months, with optional property tax and insurance (PITI).',
    ruleOfThumb: 'The 28/36 rule: your monthly mortgage payment (PITI) should not exceed 28% of your gross monthly income, and total monthly debt payments should not exceed 36% of gross monthly income.',
    example: 'A $350,000 home with 20% down ($70,000), 7% interest rate, 30-year term: loan amount = $280,000. Monthly principal and interest = $1,863. Add $321/mo property tax (1.1%) and $100/mo insurance = $2,284 total monthly payment.',
    keyFacts: [
      'The average 30-year fixed mortgage rate in the US was approximately 6.8-7.2% in 2024-2025.',
      'A 1% rate difference on a $300,000 loan saves or costs approximately $170/month over 30 years.',
      'On a 30-year mortgage, you pay roughly 2x the purchase price in total (principal + interest) at a 7% rate.',
      'The US median home price was approximately $412,000 in early 2025, per the National Association of Realtors.',
    ],
  },
  affiliate: {
    partner: 'LendingTree',
    label: 'Compare mortgage rates on LendingTree',
    url: 'https://www.lendingtree.com/home/mortgage',
    description: 'Get quotes from multiple lenders and find your best mortgage rate.',
  },
  jsonLd: {
    faqs: [
      { q: 'What is included in a mortgage payment?', a: 'Principal, Interest, property Taxes, and Insurance (PITI).' },
      { q: 'What is a good mortgage rate?', a: 'Rates vary by lender and credit score. Compare multiple lenders.' },
      { q: 'How much house can I afford?', a: 'Keep housing costs below 28% of gross monthly income. Total debt below 36%.' },
      { q: '15 or 30-year mortgage?', a: '15-year saves significantly in total interest but has higher monthly payments.' },
    ],
    howToSteps: [
      'Enter the home price.',
      'Set down payment percentage.',
      'Enter interest rate.',
      'Choose loan term.',
      'Add property tax rate and insurance.',
      'Click Calculate.',
    ],
  },
}
