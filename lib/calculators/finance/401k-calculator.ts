import { CalculatorConfig, Currency } from '../types'

export const calculator401k: CalculatorConfig = {
  slug: '401k-calculator',
  title: '401(k) Calculator',
  category: 'finance',
  description: 'Estimate your 401(k) balance at retirement based on contributions, employer match, and investment growth.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'currentAge', label: 'Current Age', type: 'number', defaultValue: 30, min: 18, max: 65, step: 1 },
    { id: 'retirementAge', label: 'Retirement Age', type: 'number', defaultValue: 65, min: 50, max: 80, step: 1 },
    { id: 'currentBalance', label: 'Current 401(k) Balance', type: 'number', defaultValue: 25000, min: 0, max: 5000000, step: 1000, prefix: '$' },
    { id: 'annualSalary', label: 'Annual Salary', type: 'number', defaultValue: 75000, min: 10000, max: 1000000, step: 1000, prefix: '$' },
    { id: 'contributionPct', label: 'Your Contribution (%)', type: 'number', defaultValue: 10, min: 0, max: 23, step: 0.5, suffix: '%', hint: '2025 IRS limit: $23,500 ($31,000 if age 50+). Contribute at least enough to capture the full employer match.' },
    { id: 'employerMatchPct', label: 'Employer Match (%)', type: 'number', defaultValue: 4, min: 0, max: 10, step: 0.5, suffix: '%', hint: 'Many employers match 3-6% of salary. Check your plan documents.' },
    { id: 'annualReturn', label: 'Expected Annual Return', type: 'number', defaultValue: 7, min: 1, max: 15, step: 0.1, suffix: '%' },
  ],
  calculate: (inputs, currency: Currency) => {
    const currentAge = Number(inputs.currentAge)
    const retirementAge = Number(inputs.retirementAge)
    const currentBalance = Number(inputs.currentBalance)
    const annualSalary = Number(inputs.annualSalary)
    const contributionPct = Number(inputs.contributionPct)
    const employerMatchPct = Number(inputs.employerMatchPct)
    const annualReturn = Number(inputs.annualReturn)

    if (retirementAge <= currentAge) {
      return {
        values: [{ label: 'Error', value: 'Retirement age must be greater than current age.' }],
      }
    }

    const years = retirementAge - currentAge
    const IRS_LIMIT_2025 = 23500
    const annualContribution = Math.min(annualSalary * contributionPct / 100, IRS_LIMIT_2025)
    const employerContribution = annualSalary * Math.min(contributionPct, employerMatchPct) / 100
    const totalAnnualContribution = annualContribution + employerContribution

    const r = annualReturn / 100
    const futureValueCurrentBalance = currentBalance * Math.pow(1 + r, years)
    const futureValueContributions = r === 0
      ? totalAnnualContribution * years
      : totalAnnualContribution * (Math.pow(1 + r, years) - 1) / r * (1 + r)

    const projectedBalance = futureValueCurrentBalance + futureValueContributions
    const monthlyRetirementIncome = projectedBalance * 0.04 / 12

    const yourTotalContributions = annualContribution * years
    const employerMatchTotal = employerContribution * years

    const fmt = (v: number) =>
      currency.symbol + Math.round(v).toLocaleString('en-US')
    const fmtFull = (v: number) =>
      currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    return {
      values: [
        { label: 'Projected Balance at Retirement', value: fmt(projectedBalance), primary: true },
        { label: 'Monthly Income (4% Rule)', value: fmtFull(monthlyRetirementIncome) },
        { label: 'Your Total Contributions', value: fmt(yourTotalContributions) },
        { label: 'Employer Match Total', value: fmt(employerMatchTotal) },
      ],
      summary: `At ${retirementAge}, your projected 401(k) balance is ${fmt(projectedBalance)}, supporting ${fmtFull(monthlyRetirementIncome)}/month in retirement income using the 4% rule.`,
    }
  },
  resultLabels: ['Projected Balance at Retirement', 'Monthly Income (4% Rule)', 'Your Total Contributions', 'Employer Match Total'],
  formula: 'Projected Balance = Current Balance x (1+r)^n + Annual Contribution x [(1+r)^n - 1] / r x (1+r)',
  content: {
    howTo: [
      'Enter your current age and planned retirement age.',
      'Enter your current 401(k) balance.',
      'Enter your annual salary.',
      'Enter your contribution percentage and employer match percentage.',
      'Set the expected annual investment return.',
      'Click Calculate to see your projected balance and estimated retirement income.',
    ],
    faqs: [
      {
        q: 'What is the 2025 401(k) contribution limit?',
        a: 'The IRS 401(k) contribution limit for 2025 is $23,500 per year. If you are age 50 or older, you can contribute an additional $7,500 in catch-up contributions for a total of $31,000. These limits are set by the IRS and adjusted periodically for inflation.',
      },
      {
        q: 'What is the 4% rule for retirement income?',
        a: 'The 4% rule, derived from the Trinity Study, suggests that withdrawing 4% of your retirement portfolio in the first year — then adjusting for inflation annually — has historically allowed portfolios to last 30 years. For a $1,000,000 portfolio, this equals $40,000 per year or about $3,333 per month.',
      },
      {
        q: 'Should I contribute to a traditional or Roth 401(k)?',
        a: 'Traditional 401(k) contributions are pre-tax, reducing your taxable income now but taxed on withdrawal. Roth 401(k) contributions are post-tax, but withdrawals in retirement are tax-free. If you expect to be in a higher tax bracket in retirement, Roth is generally better. If you expect lower taxes in retirement, traditional is usually the better choice.',
      },
      {
        q: 'What happens to my 401(k) if I change jobs?',
        a: 'You have four options: roll it over to your new employer plan, roll it into an IRA, leave it with your former employer (if allowed), or cash it out (not recommended — you will pay income tax plus a 10% penalty if under age 59.5). Rolling into an IRA typically provides the most investment flexibility.',
      },
      {
        q: 'What is employer matching and how does it work?',
        a: 'Employer matching is when your company adds money to your 401(k) based on your own contributions. A common match is 100% of contributions up to 4% of salary, meaning if you earn $75,000 and contribute 4%, your employer adds another $3,000. This is effectively a 100% return on that portion of your contribution and should always be captured.',
      },
      {
        q: 'What is vesting and how does it affect employer match?',
        a: 'Vesting is the schedule by which employer contributions become fully yours. Immediate vesting means you own 100% of the match from day one. Graded vesting schedules (e.g., 20% per year over 5 years) mean you lose unvested employer contributions if you leave early. Always check your plan documents.',
      },
      {
        q: 'How much should I have in my 401(k) at each age?',
        a: 'Fidelity suggests these benchmarks: 1x salary by age 30, 3x by age 40, 6x by age 50, 8x by age 60, and 10x by age 67. These are rough guidelines assuming retirement at 67 and a target replacement rate of 45% of pre-retirement income from 401(k) savings.',
      },
      {
        q: 'Can I withdraw from my 401(k) before retirement?',
        a: 'Withdrawals before age 59.5 are subject to a 10% early withdrawal penalty plus ordinary income tax. Some exceptions apply: disability, substantially equal periodic payments (Rule 72(t)), certain medical expenses, and others. Early withdrawal should be a last resort due to the permanent loss of compounding on withdrawn funds.',
      },
    ],
    related: ['retirement-savings', 'investment-return', 'compound-interest', 'take-home-pay', 'income-tax'],
  },
  geo: {
    definition: 'A 401(k) calculator projects your retirement account balance based on your current balance, years until retirement, annual salary, employee contribution percentage, employer match, and expected investment return, using the future value of an annuity due formula to model compound growth of annual contributions.',
    ruleOfThumb: 'Contribute at least enough to capture the full employer match (it is free money, never leave it on the table), then work toward 15% of gross salary total (including employer match). Fidelity benchmarks: 1x salary saved by 30, 3x by 40, 6x by 50, 10x by 67.',
    example: 'Starting at age 30 with $25,000 in a 401(k), contributing 10% of a $75,000 salary with a 4% employer match, at 7% annual return: projected balance at age 65 is approximately $1,050,000. Monthly income using the 4% rule: approximately $3,500/month. Waiting until age 40 to start the same plan produces approximately $480,000 — less than half, from a 10-year delay.',
    keyFacts: [
      'The IRS 401(k) contribution limit for 2025 is $23,500 per year ($31,000 for those age 50 and older). (Source: IRS)',
      'Vanguard research found that 59% of 401(k) participants in 2023 received some form of employer matching contribution, with the median match rate at 4% of salary. (Source: Vanguard How America Saves 2024)',
      'Fidelity reports that the average 401(k) balance for participants in their late 60s was approximately $360,000 in 2024, well below the 10x salary benchmark for full retirement readiness. (Source: Fidelity)',
      'The 4% withdrawal rule, derived from the 1994 Trinity Study, has maintained portfolio survival rates of 95%+ over 30-year retirement periods when applied to a diversified stock and bond portfolio. (Source: Trinity Study / Bengen)',
    ],
  },
  educational: {
    explainer: `A 401(k) is a tax-advantaged retirement account offered by employers. Contributions reduce your taxable income in the year you make them (traditional) or grow tax-free (Roth). The defining feature is the employer match: when your company adds money based on your contributions, you are getting an immediate 50-100% return on that portion of your savings before any investment growth occurs. This is why financial planners universally advise contributing at least enough to capture the full match before doing anything else. The investment growth inside a 401(k) is also tax-deferred, meaning you are not paying annual capital gains or dividend taxes, which allows the full return to compound year after year. Over 30-35 year careers, this tax deferral has a compounding effect that can add hundreds of thousands of dollars to a final balance compared to an equivalent taxable account.`,
    tips: [
      'Always contribute at least enough to capture the full employer match. If your employer matches 4% of salary, contributing 4% yourself means you are effectively doubling that portion of your savings from day one.',
      'Increase your contribution rate by 1% each year, or route every raise directly into your 401(k). Because your take-home pay was already set at the lower rate, lifestyle inflation is avoided and savings compound over decades.',
      'Choose low-cost index funds within your 401(k) plan. A 0.1% expense ratio vs a 1% ratio saves tens of thousands of dollars over a 30-year career on the same underlying investments.',
      'If you are age 50 or older, take advantage of catch-up contributions. The additional $7,500 allowed in 2025 can add $200,000+ to your final balance if invested for 15 years at 7% annual return.',
    ],
    commonMistakes: [
      'Not contributing enough to capture the full employer match. Leaving any employer match uncaptured is the equivalent of refusing a portion of your compensation. It is the highest-return financial decision most people have access to.',
      'Cashing out a 401(k) when changing jobs. A $25,000 cashout at age 30 triggers income tax plus a 10% penalty (roughly $8,000-10,000 gone immediately) and eliminates 35 years of compounding on that amount, which at 7% would have grown to approximately $265,000 by age 65.',
      'Ignoring the investment allocation. Default 401(k) investments are often conservative money market or stable value funds. If you are decades from retirement, a diversified equity allocation is typically appropriate. Review your fund choices and rebalance annually.',
    ],
    example: `Morgan starts contributing at age 30 with a $25,000 balance, earns $75,000, contributes 10% ($7,500/year), and gets a 4% employer match ($3,000/year) for a total of $10,500/year invested at 7% return. By age 65, the projected balance is approximately $1,050,000. The employer match contributed $105,000 over 35 years. That $105,000, compounded at 7% for an average of 17 years, grew to roughly $315,000. Morgan's colleague Sam never changed the default 3% contribution and missed the extra match dollars. Sam's projected balance: approximately $480,000. The difference of $570,000 came primarily from the combination of higher contribution rate and full match capture.`,
  },
  jsonLd: {
    faqs: [
      { q: 'What is the 2025 401(k) contribution limit?', a: '$23,500 per year ($31,000 for those age 50+) per IRS guidelines.' },
      { q: 'What is the 4% rule for retirement income?', a: 'Withdraw 4% of your portfolio in year one, then adjust for inflation annually. Historically sustains portfolios for 30 years.' },
      { q: 'Should I contribute to a traditional or Roth 401(k)?', a: 'Traditional reduces taxes now; Roth provides tax-free withdrawals in retirement. Choose based on your expected tax bracket in retirement.' },
      { q: 'What happens to my 401(k) if I change jobs?', a: 'Roll it to your new employer plan or an IRA. Avoid cashing out — you will pay income tax plus a 10% early withdrawal penalty.' },
      { q: 'What is employer matching and how does it work?', a: 'Your employer adds money to your 401(k) based on your contributions, typically up to 3-6% of salary. Always contribute enough to capture the full match.' },
      { q: 'What is vesting?', a: 'Vesting is the schedule by which employer contributions become fully yours. Immediate vesting means 100% ownership from day one; graded schedules phase in over years.' },
      { q: 'How much should I have in my 401(k) by age?', a: 'Fidelity benchmarks: 1x salary by 30, 3x by 40, 6x by 50, 10x by 67.' },
      { q: 'Can I withdraw from my 401(k) before retirement?', a: 'Yes, but withdrawals before age 59.5 incur a 10% penalty plus income tax. Use only as a last resort.' },
    ],
    howToSteps: [
      'Enter your current age and planned retirement age.',
      'Enter your current 401(k) balance and annual salary.',
      'Enter your contribution percentage and employer match percentage.',
      'Set the expected annual investment return.',
      'Click Calculate to see your projected retirement balance and monthly income.',
    ],
  },
}
