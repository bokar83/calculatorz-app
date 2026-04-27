import { CalculatorConfig, Currency } from '../types'

export const autoLoan: CalculatorConfig = {
  slug: 'auto-loan',
  title: 'Car Loan Calculator',
  category: 'finance',
  description: 'Calculate your monthly car loan payment, total interest paid, and total cost of the vehicle.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'vehiclePrice', label: 'Vehicle Price', type: 'number', defaultValue: 30000, min: 0, step: 500, prefix: '$' },
    { id: 'downPayment', label: 'Down Payment', type: 'number', defaultValue: 3000, min: 0, step: 500, prefix: '$' },
    { id: 'tradeIn', label: 'Trade-in Value', type: 'number', defaultValue: 0, min: 0, step: 500, prefix: '$' },
    { id: 'interestRate', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 7.5, min: 0, max: 30, step: 0.1, suffix: '%' },
    {
      id: 'loanTermMonths',
      label: 'Loan Term',
      type: 'select',
      defaultValue: '60',
      options: [
        { value: '24', label: '24 months (2 years)' },
        { value: '36', label: '36 months (3 years)' },
        { value: '48', label: '48 months (4 years)' },
        { value: '60', label: '60 months (5 years)' },
        { value: '72', label: '72 months (6 years)' },
        { value: '84', label: '84 months (7 years)' },
      ],
    },
    {
      id: 'salesTaxRate',
      label: 'Sales Tax Rate (%)',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: '%',
    },
  ],
  calculate: (inputs, currency: Currency) => {
    const price = Number(inputs.vehiclePrice)
    const down = Number(inputs.downPayment)
    const tradeIn = Number(inputs.tradeIn)
    const rate = Number(inputs.interestRate) / 100 / 12
    const n = Number(inputs.loanTermMonths)
    const taxRate = Number(inputs.salesTaxRate) / 100

    const tax = price * taxRate
    const loanAmount = price + tax - down - tradeIn

    if (loanAmount <= 0) {
      return {
        values: [
          { label: 'Monthly Payment', value: fmt(0, currency) },
          { label: 'Total Interest', value: fmt(0, currency) },
          { label: 'Total Cost', value: fmt(price + tax, currency) },
          { label: 'Loan Amount', value: fmt(0, currency) },
        ],
        summary: 'Down payment covers the full vehicle cost. No loan needed.',
      }
    }

    let monthly: number
    if (rate === 0) {
      monthly = loanAmount / n
    } else {
      monthly = (loanAmount * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1)
    }

    const totalPaid = monthly * n
    const totalInterest = totalPaid - loanAmount
    const totalCost = down + tradeIn + totalPaid + (tax > 0 ? 0 : 0)

    return {
      values: [
        { label: 'Monthly Payment', value: fmt(monthly, currency) },
        { label: 'Total Interest', value: fmt(totalInterest, currency) },
        { label: 'Total Cost', value: fmt(totalCost, currency) },
        { label: 'Loan Amount', value: fmt(loanAmount, currency) },
      ],
      summary: `${fmt(monthly, currency)}/month for ${n} months. Total interest: ${fmt(totalInterest, currency)}.`,
    }
  },
  resultLabels: ['Monthly Payment', 'Total Interest', 'Total Cost', 'Loan Amount'],
  formula: 'Monthly Payment = P x [r(1+r)^n] / [(1+r)^n - 1]   where P = loan amount, r = monthly rate, n = months',
  geo: {
    definition: 'A car loan calculator computes your monthly auto loan payment by dividing the loan principal — vehicle price minus down payment and trade-in — plus interest over the loan term, using the standard amortization formula.',
    ruleOfThumb: 'The 20/4/10 rule for car buying: put at least 20% down, finance for no more than 4 years, and keep total monthly vehicle costs (payment + insurance) below 10% of gross monthly income.',
    example: 'A $30,000 car with $3,000 down at 7.5% interest over 60 months = $540/month. Total interest paid: $2,379. Total cost: $32,379.',
    keyFacts: [
      'The average new car loan rate in the US was around 7% in 2025, according to Experian.',
      'The average new car loan term is 68.5 months — longer terms lower monthly payments but significantly increase total interest.',
      'Buyers with excellent credit (750+) typically qualify for rates 3-5% lower than buyers with fair credit.',
      'A $10,000 trade-in has the same financial effect as a $10,000 down payment.',
    ],
  },
  content: {
    howTo: [
      'Enter the vehicle price (sticker price or negotiated price).',
      'Add your down payment and trade-in value if applicable.',
      'Enter the annual interest rate — check your pre-approval or use the current average.',
      'Select the loan term in months.',
      'Add your state sales tax rate if you want to include it.',
      'Click Calculate to see your monthly payment, total interest, and full loan cost.',
    ],
    refTable: {
      headers: ['Loan Amount', '60 months @ 5%', '60 months @ 7.5%', '60 months @ 10%'],
      rows: [
        ['$15,000', '$283/mo', '$300/mo', '$319/mo'],
        ['$20,000', '$377/mo', '$400/mo', '$425/mo'],
        ['$25,000', '$472/mo', '$500/mo', '$531/mo'],
        ['$30,000', '$566/mo', '$600/mo', '$637/mo'],
        ['$40,000', '$755/mo', '$801/mo', '$850/mo'],
        ['$50,000', '$943/mo', '$1,001/mo', '$1,062/mo'],
      ],
    },
    faqs: [
      {
        q: 'What is a good interest rate for a car loan?',
        a: 'Excellent credit (750+) qualifies for rates around 4-6% on new cars. Good credit (700-749) sees 6-8%. Fair credit (600-699) typically sees 10-15%. Always get pre-approved by your bank or credit union before visiting the dealership.',
      },
      {
        q: 'How long should my auto loan be?',
        a: 'Financial experts recommend 48-60 months maximum. Longer terms (72-84 months) lower your payment but cost significantly more in interest — and you risk being "underwater" (owing more than the car is worth) for years.',
      },
      {
        q: 'Should I put money down on a car?',
        a: 'Yes. A down payment reduces your loan amount, monthly payment, and total interest. It also prevents being upside-down on the loan immediately. Aim for at least 20% down on a new car, 10% on used.',
      },
      {
        q: 'What is the 20/4/10 rule?',
        a: 'A widely used guideline: put 20% down, finance for no more than 4 years, and keep total monthly vehicle costs (loan payment + insurance) under 10% of your gross monthly income.',
      },
      {
        q: 'Does a trade-in help?',
        a: 'Yes. Trade-in value reduces the loan amount exactly like a cash down payment. However, negotiate the car price first before discussing trade-in to avoid the dealer blending the two negotiations.',
      },
    ],
    related: ['loan-payment', 'mortgage-payment', 'personal-loan', 'debt-payoff', 'debt-to-income', 'savings-goal'],
  },
  affiliate: {
    partner: 'LendingTree',
    label: 'Compare auto loan rates on LendingTree',
    url: 'https://www.lendingtree.com/auto/',
    description: 'Get pre-approved and compare rates from multiple lenders before you visit the dealership.',
  },
  educational: {
    explainer: 'An auto loan is a secured installment loan where the vehicle itself is collateral. Your monthly payment is calculated using the amortization formula, meaning early payments are weighted heavily toward interest while later payments chip away at principal. The APR (Annual Percentage Rate) is the true annual cost of borrowing and includes the interest rate plus any lender fees. A seemingly small difference in APR has a large impact: on a $30,000 loan over 60 months, a rate of 5% costs $3,968 in total interest, while 9% costs $7,422, nearly double. Depreciation is the silent cost most buyers ignore. A new car loses roughly 20% of its value in year one and up to 50% by year five, while your loan balance declines much more slowly in the early years due to amortization. This gap is called negative equity or being "underwater," and it is dangerous: if your car is totaled, insurance pays market value, not your loan balance. Evaluating a car purchase financially means comparing the total cost of ownership, including depreciation, insurance, maintenance, and fuel, against alternatives.',
    tips: [
      'Follow the 20/4/10 rule: put at least 20% down, keep the loan term to 4 years or fewer, and ensure total monthly vehicle costs (payment plus insurance) stay below 10% of your gross monthly income.',
      'Get pre-approved by your bank or credit union before visiting a dealership. Pre-approval gives you a rate benchmark and removes the dealer\'s leverage to obscure the true cost by focusing only on monthly payment.',
      'Watch for dealer financing traps: extended terms (72 or 84 months), payment-based negotiation that hides total price, and add-ons like GAP insurance or extended warranties rolled into the loan at inflated cost.',
      'Calculate total cost of ownership before signing: add the total interest paid over the loan life to the purchase price, then estimate insurance, fuel, and maintenance to compare vehicles on true lifetime cost, not just sticker price.',
    ],
    commonMistakes: [
      'Focusing only on the monthly payment allows dealers to extend loan terms or increase price while keeping the payment attractive. Always negotiate the vehicle price first, then discuss financing separately.',
      'Financing a depreciating asset over too long a term means you are likely underwater for most of the loan. A 72-month or 84-month loan on a new car almost guarantees negative equity for the first 3-4 years.',
      'Skipping pre-approval and relying on dealer financing means you have no rate benchmark and may accept an APR 2-4 points higher than you would qualify for at a bank or credit union.',
    ],
    example: 'James buys a $32,000 car with $3,000 down, financing $29,000 at 7.5% APR. On a 72-month term, his monthly payment is $501 and he pays $7,063 in total interest, for a total loan cost of $36,063. If he chooses a 48-month term instead, his payment rises to $704 per month but total interest drops to $4,785, saving $2,278 over the life of the loan. The 48-month option also means he reaches positive equity much faster, reducing his financial exposure if the vehicle is totaled or needs to be sold early.',
  },
  jsonLd: {
    faqs: [
      { q: 'What is a good interest rate for a car loan?', a: 'Excellent credit (750+) qualifies for 4-6% on new cars. Good credit sees 6-8%. Always get pre-approved before visiting the dealership.' },
      { q: 'How long should my auto loan be?', a: 'Financial experts recommend 48-60 months maximum. Longer terms cost more in total interest and risk negative equity.' },
      { q: 'Should I put money down?', a: 'Yes. Aim for at least 20% down on a new car. It reduces your loan amount, monthly payment, and total interest paid.' },
      { q: 'What is the 20/4/10 rule for car buying?', a: '20% down, finance for no more than 4 years, total vehicle costs under 10% of gross monthly income.' },
    ],
    howToSteps: [
      'Enter the vehicle price.',
      'Add down payment and trade-in value.',
      'Enter the annual interest rate.',
      'Select loan term in months.',
      'Click Calculate to see monthly payment and total cost.',
    ],
  },
}

function fmt(n: number, currency: Currency): string {
  return currency.symbol + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
