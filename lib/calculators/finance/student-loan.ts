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
  affiliate: {
    partner: 'Credible',
    label: 'Refinance your student loans and save',
    url: 'https://www.credible.com/refinance-student-loans',
    description: 'Compare real rates from multiple lenders in 2 minutes. No impact to your credit score.',
  },
  geo: {
    definition: 'A student loan calculator estimates the monthly payment and total repayment cost for federal or private student loans, applying standard amortization math to the loan balance, interest rate, and repayment term chosen from the available federal or private repayment plan options.',
    ruleOfThumb: 'A widely used benchmark is to keep total student loan payments below 10% of your expected gross monthly income after graduation. Borrowers whose payments exceed 15% of gross income are at significantly higher risk of financial hardship and may benefit from an income-driven repayment plan.',
    example: 'A borrower with $35,000 in federal direct loans at 6.54% on the standard 10-year plan pays $394 per month and $12,280 in total interest. Switching to a 25-year extended plan cuts the monthly payment to $237 but increases total interest to $36,158, paying back more in interest than the original principal.',
    keyFacts: [
      'The average federal student loan debt per borrower was approximately $37,574 as of 2023, with about 43 million Americans carrying federal student loan balances totaling over $1.6 trillion (Federal Student Aid Data Center, Q4 2023).',
      'Federal direct loan interest rates for undergraduate students were set at 6.53% for the 2024-2025 academic year, with graduate unsubsidized loans at 8.08% and PLUS loans at 9.08%, all fixed for the life of the loan (US Department of Education, 2024-25 Interest Rates).',
      'Public Service Loan Forgiveness (PSLF) forgives the remaining federal direct loan balance after 120 qualifying monthly payments (10 years) for borrowers working full-time at a government or qualifying nonprofit organization (US Department of Education, PSLF Program Guide).',
      'Income-driven repayment (IDR) plans such as SAVE, IBR, PAYE, and ICR cap monthly payments at 5-20% of discretionary income and forgive any remaining balance after 10-25 years depending on the plan and loan type (Federal Student Aid, Repayment Plans, 2024).',
    ],
  },
  educational: {
    explainer: 'Student loans come in two main categories: federal loans issued by the US government, and private loans from banks and credit unions. Federal loans offer fixed interest rates set by Congress each year, and access to income-driven repayment (IDR) plans, deferment, forbearance, and forgiveness programs like Public Service Loan Forgiveness (PSLF). Private loans have none of these protections and typically charge higher rates for borrowers without strong credit. On the standard 10-year federal repayment plan, your payment is fixed and the loan is fully paid off in 120 equal installments. Income-driven plans like SAVE and IBR instead base your payment on your income and family size, which can lower payments dramatically for lower-income borrowers. The tradeoff is that lower payments mean more interest accumulates and the repayment timeline stretches to 20-25 years. Any balance remaining at the end of an IDR plan is forgiven, though it may be taxable. Understanding the long-term cost difference between plan options is critical to making a smart choice that fits your actual post-graduation income and career path.',
    tips: [
      'Log in to studentaid.gov to see all your federal loan balances, servicer information, and repayment history in one place before making any decisions about repayment strategy or refinancing.',
      'If you work for a government agency or qualifying nonprofit, apply for PSLF immediately and submit the Employment Certification Form annually, since tracking qualifying payments from the start avoids disputes about eligibility later.',
      'Be cautious about refinancing federal loans into a private loan for a lower rate, since refinancing permanently converts federal loans to private and eliminates access to IDR plans, PSLF, and federal deferment options that protect you if your income drops.',
      'Make interest payments during any deferment or grace period when possible, since unpaid interest capitalizes (is added to the principal) at the end of the deferment period, increasing the balance on which future interest accrues.',
    ],
    commonMistakes: [
      'Choosing the lowest monthly payment plan without calculating total interest over the full repayment term, which causes borrowers to pay significantly more over 20-25 years than the standard 10-year plan would cost.',
      'Refinancing federal loans into a private loan without fully understanding that they permanently lose access to income-driven repayment, PSLF, and federal forbearance protections that can be critical if income drops or a qualifying forgiveness opportunity arises.',
      'Ignoring student loan interest during the grace period or deferment, which allows unpaid interest to capitalize and increase the principal balance, meaning the first repayment period payment covers interest on a larger amount than the original loan.',
    ],
    example: 'James graduates with $42,000 in federal direct loans at 6.54% interest. On the standard 10-year plan, his monthly payment is $474 and he pays $14,880 in total interest, repaying $56,880 overall. His starting salary is $48,000 per year ($4,000 per month). His payment represents 11.9% of gross monthly income, slightly above the 10% benchmark. James enrolls in the SAVE income-driven plan, which initially caps his payment at around $175 per month based on his income and family size. His payments will rise as his salary increases. If his balance is not paid off after 20 years, the remaining balance is forgiven.',
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
