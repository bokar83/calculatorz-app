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
  geo: {
    definition: 'The debt-to-income (DTI) ratio is a personal finance metric that compares your total monthly debt obligations to your gross monthly income, expressed as a percentage, and used by lenders to assess your capacity to take on and repay new debt.',
    ruleOfThumb: 'Conventional mortgage lenders typically require a back-end DTI ratio at or below 43%, while borrowers with a DTI at or below 36% receive the most favorable interest rates and broadest loan options. The front-end ratio (housing costs only) should ideally stay below 28%.',
    example: 'A borrower earns $6,000 per month gross. Monthly obligations: mortgage $1,500, car payment $400, student loans $250, credit cards $150. Total debt = $2,300. DTI = $2,300 / $6,000 = 38.3%, which falls in the "good" range and qualifies for most conventional mortgages.',
    keyFacts: [
      'The Consumer Financial Protection Bureau defines a "qualified mortgage" as one where the borrower\'s DTI does not exceed 43%, a threshold tied to evidence that higher-DTI borrowers default at substantially higher rates (CFPB, Ability-to-Repay Rule, 2023).',
      'Fannie Mae\'s Desktop Underwriter system will approve conventional loans up to a 50% DTI for borrowers with strong compensating factors such as large cash reserves and high credit scores (Fannie Mae Selling Guide, B3-6-02, 2024).',
      'FHA loans allow back-end DTI ratios up to 57% in some cases, making them accessible to borrowers who cannot qualify for conventional loans, though the higher DTI increases default risk (HUD, FHA Single Family Housing Policy Handbook, 4000.1).',
      'A 2022 Federal Reserve study found that households with a DTI above 40% were more than twice as likely to experience financial distress within two years compared to households with a DTI below 20% (Federal Reserve Board, Consumer Finance Survey Analysis, 2022).',
    ],
  },
  educational: {
    explainer: 'Your debt-to-income ratio (DTI) is one of the most important numbers a lender looks at when you apply for a mortgage, personal loan, or auto loan. It measures what percentage of your gross monthly income already goes toward debt payments. The calculation uses gross income (before taxes) on the bottom, and all minimum required monthly debt payments on the top. There are actually two DTI figures lenders care about. The front-end ratio counts only your housing payment (principal, interest, taxes, insurance, and HOA fees if applicable) divided by gross income. The back-end ratio adds all other debts on top of housing. When lenders refer to DTI generally, they mean the back-end ratio. A DTI below 36% puts you in a strong position with most lenders. Between 37-43% you can still qualify for most mortgages but may pay higher rates. Above 43%, conventional loan options narrow significantly. Improving your DTI before applying for a major loan, either by paying down balances or increasing income, can save you thousands of dollars in interest over the life of a loan.',
    tips: [
      'Before applying for a mortgage, spend 6 to 12 months paying down revolving credit card balances, since reducing your minimum payments directly lowers your DTI and may also improve your credit score.',
      'Use gross income (before taxes and deductions) when calculating your own DTI, since lenders use gross figures and using net income will make your ratio look worse than what lenders will calculate.',
      'If your DTI is borderline, ask your lender about compensating factors such as a large down payment, strong cash reserves, or a long stable employment history, which can offset a DTI above the standard threshold.',
      'Avoid opening new credit accounts or taking on new loan payments in the months before applying for a mortgage, since any new minimum payment added to your obligations raises your DTI and could disqualify your application.',
    ],
    commonMistakes: [
      'Using net (take-home) pay instead of gross income in the denominator, which inflates the calculated DTI ratio and makes your financial position look worse than the figure lenders will actually use.',
      'Forgetting to include minimum required payments on credit cards with zero balances at the time of calculation, when in reality lenders include the minimum payment due based on the outstanding balance at application.',
      'Treating DTI as a fixed number rather than something you can improve before applying, when in reality a targeted 3-month paydown of high-balance revolving debt can shift DTI by 3-5 percentage points and unlock better loan terms.',
    ],
    example: 'Maria earns $5,200 per month in gross salary. Her monthly debt obligations are: $1,100 rent (she is applying for a mortgage to replace this), $320 car payment, $180 student loan minimum, and $95 credit card minimum, totaling $1,695. Her current back-end DTI is $1,695 / $5,200 = 32.6%, which is excellent. The mortgage she is applying for would replace her rent with a $1,450 payment including taxes and insurance. Her new DTI would be ($1,450 + $320 + $180 + $95) / $5,200 = $2,045 / $5,200 = 39.3%, which qualifies for most conventional loans.',
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
