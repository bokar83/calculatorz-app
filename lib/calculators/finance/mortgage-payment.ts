import { CalculatorConfig, Currency } from '../types'

export const mortgagePayment: CalculatorConfig = {
  slug: 'mortgage-payment',
  title: 'Mortgage Payment Calculator',
  category: 'finance',
  description: 'Calculate your monthly mortgage payment instantly. Includes principal, interest, and amortization breakdown — no sign-up required.',
  updatedDate: 'April 2026',
  tabs: [{ id: 'basic', label: 'Monthly Payment' }],
  inputs: [
    { id: 'homePrice', label: 'Home Price', type: 'number', defaultValue: 350000, min: 0, step: 1000, prefix: '$', hint: 'The total purchase price of the home, not including closing costs.' },
    { id: 'downPayment', label: 'Down Payment (%)', type: 'number', defaultValue: 20, min: 0, max: 100, step: 1, suffix: '%', hint: 'Most lenders require at least 3-5%. Putting 20% down eliminates PMI (private mortgage insurance), saving $100-200/month.' },
    { id: 'interestRate', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 7.0, min: 0, max: 30, step: 0.1, suffix: '%', hint: 'Check current rates at your bank or use sites like Bankrate. Even 0.5% makes a significant difference over 30 years.' },
    { id: 'loanTermYears', label: 'Loan Term (Years)', type: 'number', defaultValue: 30, min: 5, max: 30, step: 5, hint: '30-year loans have lower monthly payments; 15-year loans cost far less in total interest.' },
    { id: 'propertyTaxRate', label: 'Property Tax Rate (%/yr)', type: 'number', defaultValue: 1.1, min: 0, max: 5, step: 0.1, suffix: '%', hint: 'Your local rate varies by state and county. The US average is around 1.1%. Check your county assessor\'s website.' },
    { id: 'insurancePerYear', label: 'Home Insurance ($/yr)', type: 'number', defaultValue: 1200, min: 0, step: 100, prefix: '$', hint: 'Homeowner\'s insurance averages $1,200-$2,000/year nationally. Get quotes from 2-3 insurers.' },
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
      {
        q: 'What is included in a mortgage payment?',
        a: "A basic mortgage payment covers principal and interest. Most lenders also collect escrow for property taxes and homeowner's insurance, making the full payment PITI: Principal, Interest, Taxes, Insurance.",
      },
      {
        q: 'How does a 15-year vs 30-year mortgage compare?',
        a: 'A 15-year mortgage has higher monthly payments but builds equity faster and costs significantly less in total interest. A 30-year mortgage has lower payments but you pay nearly twice the interest over the loan term.',
      },
      {
        q: 'What credit score do I need to get a mortgage?',
        a: 'Conventional loans typically require a minimum 620 credit score. FHA loans accept 580+ (3.5% down) or 500-579 (10% down). Better scores qualify for lower interest rates.',
      },
      {
        q: 'Can I pay off my mortgage early?',
        a: 'Yes. Making extra principal payments reduces the loan balance faster and saves significant interest. Even one extra payment per year can cut years off a 30-year mortgage. Check your loan for prepayment penalties.',
      },
    ],
    related: ['loan-payment', 'auto-loan', 'debt-payoff', 'savings-goal', 'income-tax', 'debt-to-income'],
  },
  geo: {
    definition: 'A mortgage payment calculator computes the monthly payment on a home loan using the standard amortization formula, factoring in the loan principal, annual interest rate, and loan term in months, with optional property tax and insurance (PITI).',
    ruleOfThumb: 'The 28/36 rule: your monthly mortgage payment (PITI) should not exceed 28% of your gross monthly income, and total monthly debt payments should not exceed 36% of gross monthly income.',
    example: 'A $350,000 home with 20% down ($70,000), 7% interest rate, 30-year term: loan amount = $280,000. Monthly principal and interest = $1,863. Add $321/mo property tax (1.1%) and $100/mo insurance = $2,284 total monthly payment.',
    keyFacts: [
      'The average 30-year fixed mortgage rate in the US is approximately 6.5-7% as of 2025. (Source: Federal Reserve / Freddie Mac)',
      'A 1% rate difference on a $300,000 loan saves or costs approximately $170/month over 30 years. (Source: Federal Reserve / Freddie Mac)',
      'On a 30-year mortgage, you pay roughly 2x the purchase price in total (principal + interest) at a 7% rate. (Source: Federal Reserve / Freddie Mac)',
      'The US median home price was approximately $412,000 in early 2025, per the National Association of Realtors. (Source: National Association of Realtors)',
    ],
  },
  affiliate: {
    partner: 'LendingTree',
    label: 'Compare mortgage rates on LendingTree',
    url: 'https://www.lendingtree.com/home/mortgage',
    description: 'Get quotes from multiple lenders and find your best mortgage rate.',
  },
  educational: {
    explainer: `A mortgage payment is what you pay every month to repay the money you borrowed to buy your home. It has four components, often called PITI: Principal (paying down the loan balance), Interest (the lender's fee for lending you money), Taxes (property taxes collected monthly and held in escrow), and Insurance (homeowner's policy, also escrowed). In the early years, the vast majority of your monthly payment goes toward interest rather than principal, which is why mortgages feel slow to pay off at first. The interest-to-principal split shifts gradually over time through a process called amortization. Your rate and loan term are the two biggest variables. A 15-year mortgage has higher monthly payments but costs dramatically less in total interest. A 30-year mortgage offers lower monthly obligations but you pay for that flexibility with decades of interest charges.`,
    tips: [
      'Keep your total housing payment below 28% of your gross monthly income. On a $6,000/month income, that means no more than $1,680 per month for PITI combined.',
      'Even one extra payment per year reduces a 30-year mortgage by 4-5 years and saves tens of thousands in interest. You can achieve this by paying half your mortgage every two weeks instead of once monthly.',
      'A 20% down payment eliminates Private Mortgage Insurance (PMI), which typically adds $100-$200/month on a $300,000 loan. If you put down less, factor that cost into your budget.',
      'Get quotes from at least three lenders before accepting a rate. A difference of just 0.5% on a $350,000 loan saves over $35,000 in total interest over 30 years.',
    ],
    commonMistakes: [
      'Looking only at the monthly payment without considering total interest paid. A 30-year mortgage at 7% on a $300,000 loan costs about $418,000 in total, more than $100,000 extra compared to a 15-year term.',
      'Forgetting to budget for property taxes and insurance. These can add $400-$700/month on a typical home and are required costs, not optional.',
      'Maxing out what the bank says you can borrow. Lenders approve you for the maximum you can technically afford, not the comfortable payment that leaves room for savings, repairs, and life.',
    ],
    example: `James buys a $350,000 home with 20% down ($70,000), leaving a $280,000 loan at 7% over 30 years. His principal and interest payment is $1,863/month. Adding $321 in property taxes and $100 in insurance brings his total monthly payment to $2,284. Over 30 years he will pay $390,680 in interest alone, nearly 40% more than the price of the house. Switching to a 15-year term at 6.5% would raise his monthly payment to $2,440 but cut total interest to about $159,000, saving him $231,000.`,
  },
  jsonLd: {
    faqs: [
      { q: 'What is included in a mortgage payment?', a: 'Principal, Interest, property Taxes, and Insurance (PITI).' },
      { q: 'What is a good mortgage rate?', a: 'Rates vary by lender and credit score. Compare multiple lenders.' },
      { q: 'How much house can I afford?', a: 'Keep housing costs below 28% of gross monthly income. Total debt below 36%.' },
      { q: '15 or 30-year mortgage?', a: '15-year saves significantly in total interest but has higher monthly payments.' },
      { q: 'What is included in a mortgage payment?', a: "A basic mortgage payment covers principal and interest. Most lenders also collect escrow for property taxes and homeowner's insurance, making the full payment PITI: Principal, Interest, Taxes, Insurance." },
      { q: 'How does a 15-year vs 30-year mortgage compare?', a: 'A 15-year mortgage has higher monthly payments but builds equity faster and costs significantly less in total interest. A 30-year mortgage has lower payments but you pay nearly twice the interest over the loan term.' },
      { q: 'What credit score do I need to get a mortgage?', a: 'Conventional loans typically require a minimum 620 credit score. FHA loans accept 580+ (3.5% down) or 500-579 (10% down). Better scores qualify for lower interest rates.' },
      { q: 'Can I pay off my mortgage early?', a: 'Yes. Making extra principal payments reduces the loan balance faster and saves significant interest. Even one extra payment per year can cut years off a 30-year mortgage. Check your loan for prepayment penalties.' },
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
