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
  geo: {
    definition: 'A simple interest calculator computes interest earned or owed using only the original principal amount, applying the formula I = P x R x T, where P is principal, R is the annual rate, and T is time in years.',
    ruleOfThumb: 'Simple interest always produces less total interest than compound interest for the same principal and rate over periods longer than one year. For a one-year loan or investment, the two methods produce identical results.',
    example: '$5,000 at 6% simple interest for 3 years = $5,000 x 0.06 x 3 = $900 interest, total $5,900. The same amount compounded monthly at 6% would yield $5,983, earning $83 more over the same period.',
    keyFacts: [
      'Most auto loans in the US use simple interest calculated on the daily outstanding balance, meaning every payment you make immediately reduces the principal and the next day\'s interest charge (Consumer Financial Protection Bureau, Auto Loan Guide).',
      'Personal loans from banks and credit unions typically use simple interest amortization, where early payments are largely interest and later payments are largely principal, making early payoff financially advantageous (CFPB, Understanding Loan Costs, 2023).',
      'The Rule of 78s, a simple-interest-adjacent calculation method, is banned for loans over 61 months in the US and can result in prepayment penalties that cost borrowers hundreds of dollars if they pay off early (15 U.S.C. Section 1615).',
      'Short-term personal loans and payday loans sometimes advertise a flat fee rather than an APR, but when converted using simple interest math, effective annual rates can exceed 300-400% (CFPB Payday Loan Report, 2022).',
    ],
  },
  educational: {
    explainer: 'Simple interest is the most straightforward way to calculate the cost of borrowing or the return on lending. You multiply the original amount (principal) by the annual interest rate and by the number of years. The key word is "simple": interest is calculated only on the starting principal, never on interest that has already built up. This is different from compound interest, where unpaid interest is added to the principal and then earns additional interest in future periods. For borrowers, simple interest is usually more favorable than compound interest on long-term debt because the interest charge does not snowball. For savers, however, compound interest is almost always better because it allows your returns to grow on themselves. Auto loans, most personal loans, and some short-term installment loans use simple interest. Savings accounts, CDs, mortgages, and most investment vehicles use compound interest. Knowing which method applies to your situation helps you accurately compare costs and returns before signing any financial agreement.',
    tips: [
      'When comparing simple-interest loans, focus on the APR rather than the stated monthly rate, since lenders sometimes quote monthly rates that look small but translate to much higher annual costs.',
      'Make extra principal payments on a simple-interest loan as early as possible in the repayment term, since each dollar of principal you eliminate stops generating daily interest charges immediately.',
      'If you have a simple-interest personal loan, making bi-weekly payments instead of monthly payments can reduce total interest paid by several hundred dollars over a 3-year term without changing your rate.',
      'Verify whether your loan uses simple interest or add-on interest before signing, since add-on interest front-loads the total interest into the loan balance from day one, making early payoff far less beneficial.',
    ],
    commonMistakes: [
      'Assuming all consumer loans use simple interest, when many short-term and payday loan products actually use add-on interest or flat-fee structures that result in much higher effective annual rates.',
      'Not checking the loan agreement for Rule of 78s prepayment language, which can charge a disproportionate share of interest in the early months and penalize borrowers who pay off ahead of schedule.',
      'Ignoring the difference between a simple interest rate and an APR on a loan with origination fees, since a 10% simple interest rate with a 3% origination fee results in an effective APR well above 10%.',
    ],
    example: 'David takes a $12,000 personal loan at 8% simple interest for 2 years. Using I = P x R x T, his total interest is $12,000 x 0.08 x 2 = $1,920. His total repayment is $12,000 + $1,920 = $13,920. Divided evenly over 24 months, his fixed monthly payment is $580. If David pays off the loan in full after 12 months instead, he owes $12,000 + ($12,000 x 0.08 x 1) = $12,960, saving him $960 in interest compared to completing the full term.',
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
