import { CalculatorConfig, Currency } from '../types'

export const debtPayoff: CalculatorConfig = {
  slug: 'debt-payoff',
  title: 'Debt Payoff Calculator',
  category: 'finance',
  description: 'Calculate how long it will take to pay off debt and how much interest you will pay in total.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'balance', label: 'Current Balance', type: 'number', defaultValue: 5000, min: 1, max: 500000, step: 100, prefix: '$' },
    { id: 'interestRate', label: 'Annual Interest Rate (APR)', type: 'number', defaultValue: 19.99, min: 0, max: 50, step: 0.01, suffix: '%' },
    { id: 'monthlyPayment', label: 'Monthly Payment', type: 'number', defaultValue: 200, min: 1, max: 50000, step: 10, prefix: '$' },
    { id: 'extraPayment', label: 'Extra Monthly Payment', type: 'number', defaultValue: 0, min: 0, max: 10000, step: 10, prefix: '$', hint: 'Adding even $25-50/month can cut months off your payoff date and save significant interest.' },
  ],
  calculate: (inputs, currency: Currency) => {
    const balance = Number(inputs.balance)
    const interestRate = Number(inputs.interestRate)
    const monthlyPayment = Number(inputs.monthlyPayment)
    const extraPayment = Number(inputs.extraPayment)
    const monthlyRate = interestRate / 100 / 12

    const fmt = (v: number) =>
      currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    const minInterest = balance * monthlyRate
    if (monthlyPayment <= minInterest && interestRate > 0) {
      return {
        values: [{ label: 'Error', value: 'Monthly payment too low to cover interest. Increase your payment.' }],
      }
    }

    const calcMonths = (payment: number): number => {
      if (monthlyRate === 0) return Math.ceil(balance / payment)
      return Math.ceil(-Math.log(1 - (balance * monthlyRate) / payment) / Math.log(1 + monthlyRate))
    }

    const months = calcMonths(monthlyPayment)
    const totalPaid = monthlyPayment * months
    const totalInterest = totalPaid - balance

    const totalYears = Math.floor(months / 12)
    const remMonths = months % 12
    const timeLabel = totalYears > 0
      ? `${totalYears} yr${totalYears !== 1 ? 's' : ''} ${remMonths} mo`
      : `${months} months`

    let interestSavedLabel = 'N/A'
    let timeWithExtraLabel = 'N/A'

    if (extraPayment > 0) {
      const totalPaymentWithExtra = monthlyPayment + extraPayment
      if (totalPaymentWithExtra > minInterest || monthlyRate === 0) {
        const monthsWithExtra = calcMonths(totalPaymentWithExtra)
        const totalPaidWithExtra = totalPaymentWithExtra * monthsWithExtra
        const totalInterestWithExtra = totalPaidWithExtra - balance
        const interestSaved = totalInterest - totalInterestWithExtra

        const yearsExtra = Math.floor(monthsWithExtra / 12)
        const remExtra = monthsWithExtra % 12
        timeWithExtraLabel = yearsExtra > 0
          ? `${yearsExtra} yr${yearsExtra !== 1 ? 's' : ''} ${remExtra} mo`
          : `${monthsWithExtra} months`
        interestSavedLabel = fmt(Math.max(0, interestSaved))
      }
    }

    return {
      values: [
        { label: 'Payoff Time (Current)', value: timeLabel, primary: true },
        { label: 'Payoff Time (With Extra)', value: timeWithExtraLabel },
        { label: 'Total Interest (Current)', value: fmt(totalInterest) },
        { label: 'Interest Saved', value: interestSavedLabel },
      ],
      summary: `Paying ${fmt(monthlyPayment)}/month on ${fmt(balance)} at ${interestRate}% APR: debt-free in ${timeLabel}. Total interest paid: ${fmt(totalInterest)}.`,
    }
  },
  resultLabels: ['Payoff Time (Current)', 'Payoff Time (With Extra)', 'Total Interest (Current)', 'Interest Saved'],
  formula: 'Months = -log(1 - Balance x MonthlyRate / Payment) / log(1 + MonthlyRate)',
  content: {
    howTo: [
      'Enter your current debt balance.',
      'Enter the annual interest rate (APR) on the debt.',
      'Enter your planned monthly payment.',
      'Optionally enter any extra amount you can add each month.',
      'Click Calculate to see your payoff timeline and total interest cost.',
    ],
    faqs: [
      {
        q: 'What is the debt avalanche method?',
        a: 'The debt avalanche method targets your highest-interest debt first while making minimum payments on all others. Once the highest-rate debt is gone, you roll that payment to the next highest. This approach minimizes total interest paid and is mathematically optimal.',
      },
      {
        q: 'What is the debt snowball method?',
        a: 'The debt snowball method pays off the smallest balance first regardless of interest rate, then rolls that freed-up payment to the next smallest. It costs more in total interest than the avalanche but delivers quick wins that help sustain motivation. Research by Kellogg School of Management shows the snowball produces better real-world outcomes for many people because of the psychological momentum.',
      },
      {
        q: 'How does the minimum payment affect total interest?',
        a: 'Minimum payments on credit cards are typically 1-3% of the balance. At 19.99% APR, paying only the minimum on a $5,000 balance can take over 15 years to pay off and cost more than $5,000 in interest alone — more than the original debt.',
      },
      {
        q: 'Should I pay off debt or invest?',
        a: 'If your debt carries an interest rate above 6-7%, paying it off is often the better financial move because the guaranteed return (eliminating that interest cost) exceeds expected investment returns. High-interest debt like credit cards (15-25% APR) should almost always be prioritized before investing beyond an employer match.',
      },
      {
        q: 'What is a good monthly payment strategy?',
        a: 'Pay at least 2-3 times the minimum payment. On a $5,000 credit card at 19.99% APR with a $100 minimum, doubling the payment to $200 cuts payoff time by more than 10 years and saves thousands in interest.',
      },
      {
        q: 'Does debt consolidation help?',
        a: 'Consolidation can lower your interest rate and simplify payments, but it only helps if you do not accumulate new debt on the cleared cards. A balance transfer to a 0% promotional card followed by aggressive payoff is one of the most effective debt reduction tools available.',
      },
      {
        q: 'How does extra payment affect payoff time?',
        a: 'Extra payments reduce the principal faster, which means less interest accrues each month, which accelerates the payoff. Even $25-50 per month extra on a $5,000 balance at 20% APR can save 6-12 months and hundreds of dollars in interest.',
      },
      {
        q: 'What credit card APR is considered high?',
        a: 'The Federal Reserve reported the average credit card APR in the United States exceeded 21% in 2024. Any rate above 15% warrants aggressive payoff. Rates above 20% should be treated as a financial emergency.',
      },
    ],
    related: ['loan-payment', 'compound-interest', 'savings-goal', 'take-home-pay', 'personal-loan'],
  },
  affiliate: {
    partner: 'LendingTree',
    label: 'Consolidate your debt at a lower rate',
    url: 'https://www.lendingtree.com/personal/',
    description: 'Compare debt consolidation loans from top lenders and reduce your interest payments.',
  },
  geo: {
    definition: 'A debt payoff calculator determines how long it will take to become debt-free given a current balance, annual interest rate, and fixed monthly payment, using the loan amortization formula to compute total interest paid and the number of payment periods remaining.',
    ruleOfThumb: 'Pay at least 2-3 times the minimum monthly payment. The minimum payment is designed to keep you in debt as long as possible, maximizing interest revenue for the lender. Doubling your payment often cuts payoff time by more than half.',
    example: '$5,000 credit card balance at 19.99% APR: paying the $100 minimum takes over 8 years and costs $5,700 in interest. Paying $200/month instead: debt-free in 31 months and only $1,244 in interest. The $100/month difference saves $4,456 in interest and 65 months of payments.',
    keyFacts: [
      'The Federal Reserve reported the average credit card interest rate in the United States exceeded 21% in 2024, the highest level recorded since the Fed began tracking the data. (Source: Federal Reserve)',
      'According to the CFPB, credit card minimum payments are typically calculated as 1-2% of the balance plus interest, which prolongs repayment and maximizes total interest paid. (Source: CFPB)',
      'Research published by the Kellogg School of Management found that the debt snowball method (smallest balance first) leads to faster total debt elimination in practice because of the motivational effect of clearing individual accounts. (Source: Journal of Marketing Research)',
      'Americans collectively hold over $1.2 trillion in credit card debt as of 2025, with the average indebted household carrying approximately $8,000 in credit card balances. (Source: Federal Reserve / NerdWallet)',
    ],
  },
  educational: {
    explainer: `Debt payoff calculators use the standard loan amortization formula in reverse: instead of solving for payment, they solve for time. Each month, interest accrues on your remaining balance. Your payment first covers that interest, then the rest reduces the principal. Because the principal shrinks, the interest charge next month is slightly smaller, which means slightly more of your payment goes to principal. This self-reinforcing cycle is why the early months feel slow and the final months feel fast. The math is driven by the logarithm of the ratio of your payment to the interest charge. The key practical insight is that anything that increases the principal reduction per payment has a compounding effect: double the extra payment and you get more than double the benefit, because each extra dollar reduces the principal on which future interest is calculated.`,
    tips: [
      'List all debts with balances, rates, and minimum payments. Choose either the avalanche (highest rate first) or snowball (smallest balance first) method and apply every freed-up payment to the next target.',
      'Call your credit card issuer and ask for a rate reduction. A five-minute call can lower your APR by 2-5 points if you have a good payment history, and the savings compound over every remaining payment.',
      'Set up autopay for at least the minimum on every account to avoid late fees and rate penalties, then manually add extra payments to your target debt.',
      'Redirect any windfall income such as tax refunds, bonuses, or side income directly to principal. A $1,500 tax refund applied to a $5,000 balance at 20% APR shortens payoff by roughly 9 months.',
    ],
    commonMistakes: [
      'Making only minimum payments. Credit card minimum payments are calculated to extend repayment for 10-15 years, which is a feature for the lender and a disaster for the borrower. Never treat the minimum as a payoff strategy.',
      'Opening new credit while paying down existing debt. New balances reset the clock. If you are serious about becoming debt-free, pause new credit purchases until existing balances are gone or very low.',
      'Ignoring the interest rate when choosing payoff order. Paying off a $200 balance before a $5,000 balance feels good but may cost thousands more in interest if the $5,000 is at a much higher rate. Run the numbers for both methods and make an informed choice.',
    ],
    example: `Alex has two debts: a $3,000 credit card at 22% APR (minimum $60/month) and a $2,000 personal loan at 8% APR (fixed $90/month). Using the avalanche method, Alex pays $200 on the credit card and $90 on the loan. The credit card is paid off in 18 months ($540 in interest). Then Alex redirects the $200 to the loan. Total time: 30 months, total interest paid: approximately $740. Using the snowball method (loan first), total interest paid would be approximately $890. The avalanche saves $150 and is slightly faster.`,
  },
  jsonLd: {
    faqs: [
      { q: 'What is the debt avalanche method?', a: 'Pay the highest-interest debt first while making minimums on others. Minimizes total interest paid.' },
      { q: 'What is the debt snowball method?', a: 'Pay the smallest balance first for psychological wins. Costs more interest but often more effective in practice.' },
      { q: 'How does the minimum payment affect total interest?', a: 'Minimum payments extend repayment for 10-15 years on credit cards and can cost more in interest than the original balance.' },
      { q: 'Should I pay off debt or invest?', a: 'Pay off debt with rates above 6-7% before investing, as it provides a guaranteed return equivalent to the interest rate.' },
      { q: 'What is a good monthly payment strategy?', a: 'Pay at least 2-3 times the minimum. Doubling payments cuts payoff time and interest by more than half in most cases.' },
      { q: 'Does debt consolidation help?', a: 'Yes, if it lowers your rate and you stop accumulating new debt. Balance transfers to 0% promotional cards are especially effective.' },
      { q: 'How does extra payment affect payoff time?', a: 'Even $25-50/month extra reduces principal faster, causing interest to accrue more slowly and shortening payoff time significantly.' },
      { q: 'What credit card APR is considered high?', a: 'The US average exceeded 21% in 2024. Any rate above 15% warrants aggressive payoff strategy.' },
    ],
    howToSteps: [
      'Enter your current debt balance.',
      'Enter the annual interest rate (APR) on the debt.',
      'Enter your planned monthly payment.',
      'Enter any extra monthly amount you can add.',
      'Click Calculate to see payoff timeline and total interest paid.',
    ],
  },
}
