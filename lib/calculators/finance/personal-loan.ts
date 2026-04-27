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
  geo: {
    definition: 'A personal loan calculator computes the monthly payment, total interest cost, and full repayment amount for an unsecured installment loan, using the standard amortization formula based on the loan principal, annual percentage rate (APR), and term in months.',
    ruleOfThumb: 'The APR on a personal loan reflects the true annual cost including interest and fees. Borrowers with credit scores above 720 typically qualify for rates between 6% and 12%, while borrowers with scores below 640 often face rates of 20% or higher. Extending the loan term lowers the monthly payment but substantially increases the total interest paid.',
    example: 'A borrower takes a $10,000 personal loan at 12% APR for 36 months. Monthly payment = $332.14. Total paid = $11,957. Total interest = $1,957. The same loan at 60 months: payment drops to $222.44 but total interest rises to $3,346, costing $1,389 more.',
    keyFacts: [
      'The average personal loan interest rate in the US was approximately 12.35% APR as of Q1 2024 for a 24-month loan, according to Federal Reserve consumer credit data (Federal Reserve, Consumer Credit G.19, 2024).',
      'Origination fees on personal loans typically range from 1% to 8% of the loan amount and are often deducted from the loan proceeds, meaning a $10,000 loan with a 5% origination fee delivers only $9,500 but requires repayment of the full $10,000 (CFPB, Personal Loans, 2023).',
      'Personal loan balances in the US reached $245 billion in 2023, with the average loan balance per borrower at approximately $11,600, driven largely by debt consolidation and home improvement uses (TransUnion Industry Insights Report, Q4 2023).',
      'Borrowers who use personal loans for debt consolidation can save an average of $1,400 in interest over the life of the consolidation if they move high-rate credit card balances (averaging 21% APR) to a personal loan at 12% APR (LendingTree Debt Consolidation Study, 2023).',
    ],
  },
  educational: {
    explainer: 'A personal loan is an unsecured installment loan, meaning you borrow a lump sum and repay it in fixed monthly payments over a set term, typically 1 to 7 years. Because it is unsecured (no collateral like a house or car backing it), lenders rely heavily on your credit score and income to set the interest rate. Personal loans are most commonly used for debt consolidation, home improvement, medical expenses, and major purchases. The key number to compare across lenders is the APR (annual percentage rate), which includes both the interest rate and any origination fees. A loan with a 10% interest rate but a 5% origination fee can have a higher effective APR than a loan with an 11% rate and no fees. Choosing the right term involves a tradeoff: a shorter term means higher monthly payments but much less interest paid overall. A longer term makes each payment smaller but the total cost of the loan can be 50-100% higher than the amount you actually needed. Always calculate total interest paid, not just the monthly payment, before committing.',
    tips: [
      'Get pre-qualified with at least 3 lenders before accepting any offer, since pre-qualification uses a soft credit pull that does not affect your score and can reveal rate differences of 4-8 percentage points for the same loan amount.',
      'Compare the total cost of the loan (total payments minus principal), not just the monthly payment, since lenders sometimes advertise low payments by stretching the term and dramatically increasing the interest you pay.',
      'Check whether the lender charges a prepayment penalty before signing, since some personal loan agreements penalize borrowers who pay off early, which eliminates one of the main financial benefits of getting a lower-rate personal loan.',
      'If you are consolidating credit card debt, close the paid-off cards or lower their limits after consolidating, since keeping high open credit limits creates a spending temptation and can lead to re-accumulating debt alongside the new loan.',
    ],
    commonMistakes: [
      'Comparing loans by monthly payment alone rather than total cost, which causes borrowers to choose longer terms that feel affordable but cost thousands more in interest over the life of the loan.',
      'Overlooking origination fees when comparing offers, since a loan advertised at a lower interest rate but with a 4-6% origination fee can cost more in total than a loan with a slightly higher rate but no upfront fees.',
      'Taking the full loan amount offered rather than only what is needed, since lenders sometimes offer more credit than requested and borrowers who accept the larger amount pay interest on money they did not need.',
    ],
    example: 'Sarah needs $8,000 to consolidate credit card debt currently costing her 22% APR. She is offered a personal loan at 10.5% APR for 36 months. Her new monthly payment is $260.33, down from paying minimums of $320 on her cards. Total interest on the personal loan = $1,371.88 over 3 years. At her previous 22% APR on the same balance with minimum payments, she would have paid roughly $3,800 in interest over the same period and still carried a balance. The personal loan saves her approximately $2,400 in interest and gives her a clear payoff date.',
  },
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
