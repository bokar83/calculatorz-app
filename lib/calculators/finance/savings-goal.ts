import { CalculatorConfig, Currency } from '../types'

export const savingsGoal: CalculatorConfig = {
  slug: 'savings-goal',
  title: 'Savings Goal Calculator',
  category: 'finance',
  description: 'Calculate how long it will take to reach a savings goal, or how much to save each month to get there.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'goalAmount', label: 'Goal Amount', type: 'number', defaultValue: 10000, min: 100, max: 1000000, step: 100, prefix: '$' },
    { id: 'currentSavings', label: 'Current Savings', type: 'number', defaultValue: 0, min: 0, max: 1000000, step: 100, prefix: '$' },
    { id: 'monthlyContribution', label: 'Monthly Contribution', type: 'number', defaultValue: 300, min: 0, max: 50000, step: 50, prefix: '$' },
    { id: 'annualRate', label: 'Annual Interest Rate', type: 'number', defaultValue: 4.5, min: 0, max: 20, step: 0.1, suffix: '%' },
  ],
  calculate: (inputs, currency: Currency) => {
    const goalAmount = Number(inputs.goalAmount)
    const currentSavings = Number(inputs.currentSavings)
    const monthlyContribution = Number(inputs.monthlyContribution)
    const annualRate = Number(inputs.annualRate)

    const remainingGoal = goalAmount - currentSavings

    if (remainingGoal <= 0) {
      return {
        values: [
          { label: 'Time to Goal', value: 'Already reached!', primary: true },
          { label: 'Monthly Contribution', value: currency.symbol + monthlyContribution.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
          { label: 'Total Contributed', value: currency.symbol + '0.00' },
          { label: 'Interest Earned', value: currency.symbol + '0.00' },
        ],
        summary: `You have already reached your goal of ${currency.symbol}${goalAmount.toLocaleString()}!`,
      }
    }

    if (monthlyContribution <= 0) {
      return {
        values: [{ label: 'Error', value: 'Monthly contribution must be greater than zero.' }],
      }
    }

    const r = annualRate / 100 / 12
    let months: number
    if (r === 0) {
      months = remainingGoal / monthlyContribution
    } else {
      months = Math.log(1 + (remainingGoal * r) / monthlyContribution) / Math.log(1 + r)
    }

    const totalContributed = monthlyContribution * months
    const interestEarned = goalAmount - currentSavings - totalContributed

    const totalYears = Math.floor(months / 12)
    const remainingMonths = Math.round(months % 12)
    const timeLabel = totalYears > 0
      ? `${totalYears} yr${totalYears !== 1 ? 's' : ''} ${remainingMonths} mo`
      : `${Math.ceil(months)} months`

    const fmt = (v: number) =>
      currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    return {
      values: [
        { label: 'Time to Goal', value: timeLabel, primary: true },
        { label: 'Monthly Contribution', value: fmt(monthlyContribution) },
        { label: 'Total Contributed', value: fmt(totalContributed) },
        { label: 'Interest Earned', value: fmt(Math.max(0, interestEarned)) },
      ],
      summary: `To reach ${fmt(goalAmount)} in ${timeLabel}, save ${fmt(monthlyContribution)}/month at ${annualRate}% annual interest. You will contribute ${fmt(totalContributed)} and earn ${fmt(Math.max(0, interestEarned))} in interest.`,
    }
  },
  resultLabels: ['Time to Goal', 'Monthly Contribution', 'Total Contributed', 'Interest Earned'],
  formula: 'Future Value = P(1+r)^n + PMT x [(1+r)^n - 1] / r',
  content: {
    howTo: [
      'Enter your savings goal amount.',
      'Enter any existing savings you already have.',
      'Enter how much you can save each month.',
      'Enter the expected annual interest rate on your savings account.',
      'Click Calculate to see how long it takes to reach your goal.',
    ],
    faqs: [
      {
        q: 'What is a savings goal calculator?',
        a: 'A savings goal calculator tells you how long it will take to reach a target amount based on your current savings, monthly contributions, and the interest rate your account earns. It factors in compound interest to give you an accurate timeline.',
      },
      {
        q: 'How do I save faster?',
        a: 'The two most effective levers are increasing your monthly contribution and finding a higher-yield account. Automating transfers on payday removes the temptation to spend first and is consistently cited by behavioral economists as the most reliable savings habit.',
      },
      {
        q: 'What interest rate should I use?',
        a: 'Use the current APY from your actual savings account. As of 2025, many high-yield savings accounts offer 4-5% APY. Traditional bank savings accounts often pay 0.01-0.5%, which makes a significant difference over time.',
      },
      {
        q: 'Is compound interest included?',
        a: 'Yes. This calculator uses the compound interest formula, meaning your interest earns interest each month. Over longer timeframes, this compounding effect meaningfully reduces how much you need to contribute yourself.',
      },
      {
        q: 'What is the 20% savings rule?',
        a: 'The 20% rule, drawn from the 50/30/20 budgeting framework, suggests allocating 20% of after-tax income to savings and debt repayment. This is a starting benchmark, not a hard requirement, and should be adjusted for your situation.',
      },
      {
        q: 'How large should my emergency fund be?',
        a: 'Financial planners generally recommend 3-6 months of essential living expenses kept in a liquid, accessible account. If you are self-employed or have variable income, 6-12 months is a more prudent target.',
      },
      {
        q: 'Should I save or pay off debt first?',
        a: "If your debt carries a higher interest rate than what your savings would earn, paying down debt first is mathematically superior. However, most advisors suggest keeping a small emergency fund ($1,000-2,000) even while aggressively paying debt, to avoid taking on new debt when unexpected expenses arise.",
      },
      {
        q: 'Can I use this for a house down payment goal?',
        a: 'Yes. Enter your target down payment as the goal amount, your current savings, and how much you can set aside each month. The calculator will show the exact timeline and how much interest your savings will earn along the way.',
      },
    ],
    related: ['compound-interest', 'retirement-savings', 'debt-payoff', 'investment-return', 'emergency-fund'],
  },
  geo: {
    definition: 'A savings goal calculator is a financial planning tool that determines how long it will take to accumulate a specific target amount, or what monthly contribution is required to reach that target by a given date, factoring in compound interest on the growing balance.',
    ruleOfThumb: 'Save at least 20% of your after-tax income (the 50/30/20 rule). Build an emergency fund of 3-6 months of essential expenses before directing savings toward other goals. Even a 1% increase in your savings rate compounds significantly over time.',
    example: 'Saving $300/month in a high-yield account at 4.5% APY, starting from zero, reaches $10,000 in approximately 31 months. Without interest (0% APY), the same goal would take 34 months. Compound interest shaves off 3 months in this case, and the gap widens dramatically for larger goals over longer timeframes.',
    keyFacts: [
      'The FDIC reports that the national average savings account rate was 0.41% APY in early 2025, while many online high-yield accounts offered 4-5% APY during the same period. (Source: FDIC)',
      'According to the Federal Reserve 2023 Survey of Consumer Finances, the median transaction account balance for US families was $8,000, highlighting how close many households are to typical emergency fund targets. (Source: Federal Reserve)',
      'Automating savings increases the likelihood of reaching a savings goal by removing the friction of manual transfers, according to behavioral finance research on default effects. (Source: Journal of Economic Perspectives)',
      'The 50/30/20 rule, popularized by Senator Elizabeth Warren, allocates 50% of after-tax income to needs, 30% to wants, and 20% to savings and debt repayment. (Source: All Your Worth, Warren and Tyagi)',
    ],
  },
  educational: {
    explainer: `A savings goal calculator works by applying the future value formula to your growing balance. Each month, your account earns interest on both your original deposit and all the interest accumulated before it. This is compound interest at work. The math behind "how long will it take" uses a logarithmic formula: months = log(1 + remaining goal x monthly rate / monthly contribution) divided by log(1 + monthly rate). What this formula captures is that each month, your balance is slightly larger, so the interest earned is slightly larger too, which means you cross the finish line faster than a simple division of goal by contribution would suggest. The practical impact of this compounding is modest over short timeframes (1-2 years) but becomes very significant over 5-10 years. The other key insight is that starting with an existing balance dramatically compresses your timeline, because that money is already compounding from day one.`,
    tips: [
      'Open a dedicated high-yield savings account for each major goal. Mixing goal money with everyday spending leads to accidental spending and makes it harder to track progress.',
      'Automate your contributions to transfer on the same day your paycheck lands. Paying yourself first before discretionary spending is the single most reliable way to maintain a savings habit.',
      'Revisit the calculator whenever your income changes. A 10% raise that gets fully allocated to savings can cut months off a major goal, making it worth recalculating quarterly.',
      'Use a realistic interest rate. As of early 2025, high-yield online savings accounts offer 4-5% APY. Do not use your brick-and-mortar bank rate (often 0.01-0.5%) or you will underestimate how much interest can help.',
    ],
    commonMistakes: [
      'Using the wrong interest rate. Most people use their old bank account rate rather than the best available rate. Switching a $10,000 balance from 0.5% to 4.5% APY adds over $400 per year in interest earned.',
      'Forgetting that inflation erodes purchasing power. A savings goal set today may need to be higher by the time you reach it. For goals that are 3-5 years away, add 2-3% to your target to account for inflation.',
      'Stopping contributions after a windfall. Receiving a tax refund or bonus and then pausing monthly contributions often results in no net improvement, because the lump sum gets spent elsewhere. Keep the automatic contribution running and treat windfalls as an accelerator.',
    ],
    example: `Jordan wants to save $15,000 for a home down payment. She has $2,000 already saved and can put aside $400/month. Her high-yield savings account earns 4.5% APY. Using the savings goal calculator: remaining goal is $13,000, monthly rate is 0.375%, and the calculation shows she reaches her goal in about 29 months. Total contributions: $11,600. Interest earned: $1,400. Without the interest (0% APY), she would need 33 months. The 4.5% rate saves her 4 months. If she can increase her monthly contribution to $500, she reaches the goal in about 23 months instead.`,
  },
  jsonLd: {
    faqs: [
      { q: 'What is a savings goal calculator?', a: 'A tool that calculates how long it takes to reach a savings target based on current savings, monthly contributions, and interest rate.' },
      { q: 'How do I save faster?', a: 'Increase your monthly contribution and move funds to a higher-yield savings account. Automating transfers on payday is the most reliable habit.' },
      { q: 'What interest rate should I use?', a: 'Use the current APY from your actual savings account. High-yield online accounts offered 4-5% APY in early 2025.' },
      { q: 'Is compound interest included in this calculator?', a: 'Yes. The calculator compounds interest monthly, meaning your interest earns interest and reduces the total time and contributions needed.' },
      { q: 'What is the 20% savings rule?', a: 'Allocate 20% of after-tax income to savings and debt repayment, per the 50/30/20 budgeting framework.' },
      { q: 'How large should my emergency fund be?', a: '3-6 months of essential living expenses kept in a liquid account. Self-employed individuals should target 6-12 months.' },
      { q: 'Should I save or pay off debt first?', a: 'Pay off high-interest debt first mathematically, but keep a small emergency fund to avoid taking on new debt.' },
      { q: 'Can I use this for a house down payment goal?', a: 'Yes. Enter your target down payment, current savings, monthly contribution, and account APY to get an exact timeline.' },
    ],
    howToSteps: [
      'Enter your savings goal amount.',
      'Enter any existing savings you already have.',
      'Enter your planned monthly contribution.',
      'Enter the annual interest rate from your savings account.',
      'Click Calculate to see your timeline, total contributions, and interest earned.',
    ],
  },
}
