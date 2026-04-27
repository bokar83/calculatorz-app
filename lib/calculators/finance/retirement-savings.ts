import { CalculatorConfig } from '../types'

export const retirementSavings: CalculatorConfig = {
  slug: 'retirement-savings',
  title: 'Retirement Savings Calculator',
  category: 'finance',
  description: 'Estimate how much you will have saved by retirement age.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'currentSavings', label: 'Current Savings', type: 'number', defaultValue: 25000, min: 0, step: 1000, prefix: '$', hint: 'Include all retirement accounts: 401(k), IRA, Roth IRA, pension value. If starting fresh, enter 0.' },
    { id: 'monthlyContribution', label: 'Monthly Contribution', type: 'number', defaultValue: 500, min: 0, step: 50, prefix: '$', hint: 'Even $100/month makes a meaningful difference over decades. Include your employer match if applicable.' },
    { id: 'currentAge', label: 'Current Age', type: 'number', defaultValue: 30, min: 18, max: 80, step: 1, hint: 'Your age today.' },
    { id: 'retirementAge', label: 'Retirement Age', type: 'number', defaultValue: 65, min: 40, max: 90, step: 1, hint: 'The age you plan to stop working. US Social Security full retirement age is 67 for those born after 1960.' },
    { id: 'annualReturn', label: 'Annual Return (%)', type: 'number', defaultValue: 7, min: 0, max: 20, step: 0.1, suffix: '%', hint: 'Historical US stock market average is 7-10% before inflation. Use 6-7% for a conservative, realistic projection.' },
    { id: 'inflationRate', label: 'Inflation Rate (%)', type: 'number', defaultValue: 3, min: 0, max: 10, step: 0.1, suffix: '%', hint: 'The US 20-year average inflation rate is approximately 2.5-3%. Higher inflation reduces the real value of your savings.' },
  ],
  calculate: (inputs, currency) => {
    const PV = Number(inputs.currentSavings)
    const PMT = Number(inputs.monthlyContribution)
    const currentAge = Number(inputs.currentAge)
    const retirementAge = Number(inputs.retirementAge)
    const annualReturn = Number(inputs.annualReturn) / 100
    const inflationRate = Number(inputs.inflationRate) / 100

    if (retirementAge <= currentAge) {
      return { values: [{ label: 'Error', value: 'Retirement age must be greater than current age' }] }
    }

    const years = retirementAge - currentAge
    const n = years * 12
    const r = annualReturn / 12

    // Future value of current savings
    const fvSavings = PV * Math.pow(1 + r, n)
    // Future value of monthly contributions
    const fvContributions = r === 0
      ? PMT * n
      : PMT * ((Math.pow(1 + r, n) - 1) / r)

    const totalNominal = fvSavings + fvContributions
    const totalContributed = PV + (PMT * n)
    const totalGrowth = totalNominal - totalContributed

    // Real (inflation-adjusted) value
    const realValue = totalNominal / Math.pow(1 + inflationRate, years)

    // 4% rule annual withdrawal
    const annualWithdrawal = totalNominal * 0.04
    const monthlyWithdrawal = annualWithdrawal / 12

    const fmt = (v: number) => currency.symbol + Math.round(v).toLocaleString('en-US')

    return {
      values: [
        { label: 'Projected Balance', value: fmt(totalNominal), primary: true },
        { label: 'Inflation-Adjusted Value', value: fmt(realValue) },
        { label: 'Monthly Withdrawal (4% rule)', value: fmt(monthlyWithdrawal) },
        { label: 'Total Contributions', value: fmt(totalContributed) },
        { label: 'Investment Growth', value: fmt(totalGrowth) },
      ],
      summary: `In ${years} years you could have ${fmt(totalNominal)} (${fmt(realValue)} in today's dollars). At the 4% rule, that supports ${fmt(monthlyWithdrawal)}/month in retirement.`,
    }
  },
  resultLabels: ['Projected Balance', 'Inflation-Adjusted Value', 'Monthly Withdrawal (4% rule)', 'Total Contributions', 'Investment Growth'],
  formula: 'Future Value = PV x (1+r)^n + PMT x [((1+r)^n - 1) / r]',
  content: {
    howTo: ['Enter your current retirement savings.', 'Enter your monthly contribution amount.', 'Set your current and target retirement ages.', 'Adjust the expected return and inflation rate.', 'Click Calculate to see your projected balance.'],
    faqs: [
      { q: 'How much should I save for retirement?', a: 'A common guideline is to save 15% of income, including employer match.' },
      { q: 'What is the 4% rule?', a: 'You can withdraw 4% of savings annually in retirement without depleting funds.' },
      { q: 'When should I start saving?', a: 'The earlier the better; compounding rewards early savers significantly.' },
      { q: 'What is a 401(k) match?', a: 'Employer contributions that match a percentage of your own contributions.' },
    ],
    related: ['compound-interest', 'savings-goal', 'investment-return', 'inflation', 'income-tax', 'emergency-fund'],
  },
  jsonLd: {
    faqs: [
      { q: 'How much should I save?', a: 'A common guideline is 15% of income including employer match.' },
      { q: 'What is the 4% rule?', a: 'Withdraw 4% annually without depleting funds.' },
      { q: 'When should I start?', a: 'The earlier the better due to compounding.' },
      { q: 'What is a 401(k) match?', a: 'Employer contributions matching a percentage of yours.' },
    ],
    howToSteps: ['Enter current savings.', 'Enter monthly contribution.', 'Enter years to retirement.', 'Click Calculate.'],
  },
  educational: {
    explainer: `A retirement savings calculator shows you the likely size of your nest egg at the age you want to stop working, based on what you have now, what you contribute regularly, and the growth rate of your investments. The critical insight is that your contributions and your investment returns are not equal partners: over long time horizons, investment growth does most of the heavy lifting. Someone who starts with $25,000 at age 30 and adds $500/month at a 7% return will have accumulated roughly $930,000 by 65. Of that, only about $235,000 came from their own contributions; the remaining $695,000 is growth. The calculator also shows you inflation-adjusted value, which matters because $930,000 in 35 years will not buy what $930,000 buys today. The 4% rule output gives you a practical sense of monthly income: at 4% annual withdrawals, a $930,000 balance supports about $3,100/month in retirement income.`,
    tips: [
      'Always contribute at least enough to capture the full employer 401(k) match. If your employer matches 3% of salary, not contributing that 3% is the equivalent of turning down a 3% pay raise every year.',
      'Increase your contribution rate by 1% per year, ideally each time you get a raise. You will rarely notice the difference in your paycheck, but the impact on your retirement balance over 30 years is significant.',
      'Do not withdraw from retirement accounts early. A $10,000 early withdrawal before age 59.5 triggers a 10% penalty plus income tax, potentially costing you $3,000-$4,000 immediately and far more in lost compound growth over decades.',
      'Use the inflation-adjusted figure, not the nominal balance, when setting retirement income goals. A 3% annual inflation rate cuts purchasing power roughly in half over 24 years.',
    ],
    commonMistakes: [
      'Using an overly optimistic return rate. Assuming 10-12% returns may feel exciting but ignores fees, taxes on gains, and the reality that most people do not hold through market downturns. Use 6-7% for a conservative, more reliable projection.',
      'Treating the projected balance as guaranteed income. Markets vary. A projection at 7% average return could look very different if the decade before your retirement has poor returns, a known phenomenon called sequence-of-returns risk.',
      'Not accounting for Required Minimum Distributions (RMDs). Traditional 401(k) and IRA accounts require mandatory withdrawals starting at age 73, which affects your tax planning in retirement.',
    ],
    example: `Carlos is 35 years old with $40,000 saved. He contributes $600/month to his 401(k) and expects 7% average annual returns. The calculator projects he will have about $922,000 by age 65. Inflation-adjusted to today's dollars at 3% inflation, that is worth about $380,000 in current purchasing power. At the 4% withdrawal rule, his savings can support about $3,067/month in nominal retirement income, or roughly $1,267/month in today's dollars. He will need Social Security and possibly other income to hit his target retirement lifestyle.`,
  },
  affiliate: {
    partner: 'Betterment',
    label: 'Grow your retirement savings with Betterment',
    url: 'https://www.betterment.com/retirement',
    description: 'Automated IRA and 401(k) rollover investing. Set your target and let it compound.',
  },
  geo: {
    definition:
      'A retirement savings calculator projects how much money you will accumulate by retirement age, using the future value formula FV = PV x (1+r)^n + PMT x [((1+r)^n - 1) / r], accounting for your current savings, regular contributions, assumed rate of return, and years until retirement.',
    ruleOfThumb:
      'Save at least 15% of gross income for retirement, including any employer 401(k) match. The 4% rule states you can safely withdraw 4% of your nest egg annually in retirement without running out of money over a 30-year horizon (based on the Trinity Study).',
    example:
      'Starting at age 30 with $20,000 saved, contributing $500/month at a 7% average annual return: by age 65 you would have approximately $932,000. Starting at 40 with the same inputs yields only $432,000 — a $500,000 cost of waiting a decade.',
    keyFacts: [
      'The 2025 IRS 401(k) contribution limit is $23,500 per year ($31,000 if age 50+), plus employer match.',
      'Only 56% of American workers have access to a workplace retirement plan; of those, 83% participate (U.S. Department of Labor, 2023).',
      'The median retirement savings for Americans aged 55-64 is $134,000 — far short of the $1M+ typically recommended (Federal Reserve SCF, 2022).',
      'Social Security replaces approximately 40% of pre-retirement income for average earners; financial planners target 70-90% total replacement rate.',
    ],
  },
}
