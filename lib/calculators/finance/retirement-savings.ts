import { CalculatorConfig } from '../types'

export const retirementSavings: CalculatorConfig = {
  slug: 'retirement-savings',
  title: 'Retirement Savings Calculator',
  category: 'finance',
  description: 'Estimate how much you will have saved by retirement age.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'currentSavings', label: 'Current Savings', type: 'number', defaultValue: 25000, min: 0, step: 1000, prefix: '$' },
    { id: 'monthlyContribution', label: 'Monthly Contribution', type: 'number', defaultValue: 500, min: 0, step: 50, prefix: '$' },
    { id: 'currentAge', label: 'Current Age', type: 'number', defaultValue: 30, min: 18, max: 80, step: 1 },
    { id: 'retirementAge', label: 'Retirement Age', type: 'number', defaultValue: 65, min: 40, max: 90, step: 1 },
    { id: 'annualReturn', label: 'Annual Return (%)', type: 'number', defaultValue: 7, min: 0, max: 20, step: 0.1, suffix: '%' },
    { id: 'inflationRate', label: 'Inflation Rate (%)', type: 'number', defaultValue: 3, min: 0, max: 10, step: 0.1, suffix: '%' },
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
  geo: {
    definition:
      'A retirement savings calculator projects how much money you will accumulate by retirement age, using the future value formula FV = PV x (1+r)^n + PMT x [((1+r)^n - 1) / r], accounting for your current savings, regular contributions, assumed rate of return, and years until retirement.',
    ruleOfThumb:
      'Save at least 15% of gross income for retirement, including any employer 401(k) match. The 4% rule states you can safely withdraw 4% of your nest egg annually in retirement without running out of money over a 30-year horizon (based on the Trinity Study, updated 2024).',
    example:
      'Starting at age 30 with $20,000 saved, contributing $500/month at a 7% average annual return: by age 65 you would have approximately $932,000. Starting at 40 with the same inputs yields only $432,000 — a $500,000 cost of waiting a decade.',
    keyFacts: [
      'The 2024 IRS 401(k) contribution limit is $23,000 per year ($30,500 if age 50+), plus employer match.',
      'Only 56% of American workers have access to a workplace retirement plan; of those, 83% participate (U.S. Department of Labor, 2023).',
      'The median retirement savings for Americans aged 55-64 is $134,000 — far short of the $1M+ typically recommended (Federal Reserve SCF, 2022).',
      'Social Security replaces approximately 40% of pre-retirement income for average earners; financial planners target 70-90% total replacement rate.',
    ],
  },
}
