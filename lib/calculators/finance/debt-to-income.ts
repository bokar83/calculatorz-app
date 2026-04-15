import { CalculatorConfig } from '../types'

export const debtToIncome: CalculatorConfig = {
  slug: 'debt-to-income',
  title: 'Debt-to-Income Ratio Calculator',
  category: 'finance',
  description: 'Calculate your debt-to-income ratio to assess financial health and loan eligibility.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'monthlyIncome', label: 'Gross Monthly Income', type: 'number', defaultValue: 5500, min: 0, step: 100, prefix: '$' },
    { id: 'housingPayment', label: 'Housing Payment (mortgage/rent)', type: 'number', defaultValue: 1400, min: 0, step: 50, prefix: '$' },
    { id: 'carPayment', label: 'Car Loan Payment', type: 'number', defaultValue: 350, min: 0, step: 25, prefix: '$' },
    { id: 'studentLoans', label: 'Student Loan Payment', type: 'number', defaultValue: 200, min: 0, step: 25, prefix: '$' },
    { id: 'creditCards', label: 'Credit Card Min. Payments', type: 'number', defaultValue: 100, min: 0, step: 25, prefix: '$' },
    { id: 'otherDebts', label: 'Other Monthly Debt Payments', type: 'number', defaultValue: 0, min: 0, step: 25, prefix: '$' },
  ],
  calculate: (inputs, currency) => {
    const income = Number(inputs.monthlyIncome)
    const housing = Number(inputs.housingPayment)
    const car = Number(inputs.carPayment)
    const student = Number(inputs.studentLoans)
    const cc = Number(inputs.creditCards)
    const other = Number(inputs.otherDebts)

    if (income === 0) return { values: [{ label: 'Error', value: 'Enter monthly income' }] }

    const totalDebt = housing + car + student + cc + other
    const dti = (totalDebt / income) * 100
    const frontEnd = (housing / income) * 100

    let status: string
    if (dti <= 28) status = 'Excellent (easily qualifies for loans)'
    else if (dti <= 36) status = 'Good (qualifies for most mortgages)'
    else if (dti <= 43) status = 'Fair (FHA/VA loan threshold)'
    else if (dti <= 50) status = 'High (limited loan options)'
    else status = 'Very High (difficulty qualifying for new credit)'

    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    return {
      values: [
        { label: 'Total DTI Ratio', value: dti.toFixed(1) + '%', primary: true },
        { label: 'Status', value: status },
        { label: 'Front-End Ratio', value: frontEnd.toFixed(1) + '%' },
        { label: 'Total Monthly Debt', value: fmt(totalDebt) },
      ],
      summary: `Your DTI is ${dti.toFixed(1)}% (total debt ${fmt(totalDebt)} / income ${fmt(income)}). ${status}.`,
    }
  },
  resultLabels: ['Total DTI Ratio', 'Status', 'Front-End Ratio', 'Total Monthly Debt'],
  formula: 'DTI = (Total Monthly Debt Payments / Gross Monthly Income) x 100',
  content: {
    howTo: ['Enter your gross monthly income.', 'Enter each monthly debt payment.', 'Click Calculate to see your DTI.'],
    faqs: [
      { q: 'What is a good DTI ratio?', a: 'Below 36% is generally considered good; below 43% is typically required for mortgages.' },
      { q: 'What debts are included in DTI?', a: 'Mortgage, car loans, student loans, credit cards, and other monthly obligations.' },
      { q: 'How can I lower my DTI?', a: 'Pay down debts or increase your income.' },
      { q: 'Does DTI affect loan approval?', a: 'Yes, lenders use DTI to assess your ability to repay new debt.' },
    ],
    related: ['debt-payoff', 'mortgage-payment', 'personal-loan', 'loan-payment', 'take-home-pay', 'salary-comparison'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is a good DTI ratio?', a: 'Below 36% is good; below 43% typically required for mortgages.' },
      { q: 'What debts are included?', a: 'Mortgage, car, student loans, credit cards, and other obligations.' },
      { q: 'How can I lower DTI?', a: 'Pay down debts or increase income.' },
      { q: 'Does DTI affect loans?', a: 'Yes, lenders use it to assess repayment ability.' },
    ],
    howToSteps: ['Enter monthly gross income.', 'Enter each debt payment.', 'Click Calculate.'],
  },
}
