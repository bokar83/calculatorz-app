import { CalculatorConfig, Currency } from '../types'

export const investmentReturn: CalculatorConfig = {
  slug: 'investment-return',
  title: 'Investment Return Calculator',
  category: 'finance',
  description: 'Calculate the total return on an investment, including annual contributions and the effect of compounding.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'initialInvestment', label: 'Initial Investment', type: 'number', defaultValue: 10000, min: 0, max: 10000000, step: 500, prefix: '$' },
    { id: 'annualContribution', label: 'Annual Contribution', type: 'number', defaultValue: 6000, min: 0, max: 500000, step: 500, prefix: '$' },
    { id: 'annualReturn', label: 'Expected Annual Return', type: 'number', defaultValue: 7, min: 0, max: 30, step: 0.1, suffix: '%' },
    { id: 'years', label: 'Investment Period', type: 'number', defaultValue: 20, min: 1, max: 50, step: 1, suffix: 'yrs' },
  ],
  calculate: (inputs, currency: Currency) => {
    const initialInvestment = Number(inputs.initialInvestment)
    const annualContribution = Number(inputs.annualContribution)
    const annualReturn = Number(inputs.annualReturn)
    const years = Number(inputs.years)

    const r = annualReturn / 100
    const fvInitial = initialInvestment * Math.pow(1 + r, years)
    const fvContributions = r === 0
      ? annualContribution * years
      : annualContribution * (Math.pow(1 + r, years) - 1) / r * (1 + r)

    const totalFutureValue = fvInitial + fvContributions
    const totalContributed = initialInvestment + annualContribution * years
    const totalGrowth = totalFutureValue - totalContributed
    const effectiveReturn = totalContributed > 0
      ? ((totalFutureValue / totalContributed - 1) * 100).toFixed(1) + '%'
      : 'N/A'

    const fmt = (v: number) =>
      currency.symbol + Math.round(v).toLocaleString('en-US')

    return {
      values: [
        { label: 'Total Future Value', value: fmt(totalFutureValue), primary: true },
        { label: 'Total Contributed', value: fmt(totalContributed) },
        { label: 'Investment Growth', value: fmt(totalGrowth) },
        { label: 'Effective Total Return', value: effectiveReturn },
      ],
      summary: `${fmt(initialInvestment)} initial + ${fmt(annualContribution)}/year at ${annualReturn}% for ${years} years grows to ${fmt(totalFutureValue)}. Growth: ${fmt(totalGrowth)}.`,
    }
  },
  resultLabels: ['Total Future Value', 'Total Contributed', 'Investment Growth', 'Effective Total Return'],
  formula: 'FV = P(1+r)^n + C x [(1+r)^n - 1] / r x (1+r)',
  content: {
    howTo: [
      'Enter your initial lump-sum investment.',
      'Enter your planned annual contribution amount.',
      'Set the expected annual return rate.',
      'Enter the number of years you plan to invest.',
      'Click Calculate to see total future value, contributions, and growth.',
    ],
    faqs: [
      {
        q: 'What is a realistic stock market return?',
        a: 'The S&P 500 has averaged approximately 10% per year (nominal) over the past century. After accounting for inflation at roughly 3%, the real return is approximately 7% per year. Most financial planners use 6-7% as the real return assumption for long-term projections to avoid overstating outcomes.',
      },
      {
        q: 'How does inflation affect investment returns?',
        a: 'Inflation erodes purchasing power. A 10% nominal return in a year with 3% inflation is effectively a 7% real return. For long-term projections beyond 10 years, consider using the inflation-adjusted return (nominal rate minus inflation) to understand what your future value is worth in today\'s dollars.',
      },
      {
        q: 'What is dollar-cost averaging?',
        a: 'Dollar-cost averaging means investing a fixed amount at regular intervals regardless of market conditions. By investing consistently, you buy more shares when prices are low and fewer when prices are high, reducing the impact of market volatility on your average cost per share over time.',
      },
      {
        q: 'Should I invest in index funds?',
        a: 'Index funds that track the S&P 500 or total market provide broad diversification at very low cost. Vanguard research consistently shows that low-cost index funds outperform the majority of actively managed funds over 10-20 year periods, largely because of lower expense ratios compounding favorably over time.',
      },
      {
        q: 'What is the annuity due formula and why does this calculator use it?',
        a: 'This calculator assumes contributions are made at the beginning of each year (annuity due), which is consistent with investing a lump sum at the start of each period. This produces slightly more growth than end-of-year contributions (ordinary annuity) because the money compounds for one extra year.',
      },
      {
        q: 'How much should I invest each year?',
        a: 'The IRS limit for IRA contributions in 2025 is $7,000 ($8,000 for those 50 and older). For 401(k) accounts, the limit is $23,500 ($31,000 for 50+). Maximizing tax-advantaged accounts first before taxable accounts is the standard guidance.',
      },
      {
        q: 'What happens if I stop contributing early?',
        a: 'Stopping contributions early has a dramatic effect due to lost compounding. $6,000/year for 20 years at 7% grows to about $262,000. Stopping after 10 years and letting it sit for another 10 produces about $197,000. The second decade of growth would have been $65,000 from just $60,000 of additional contributions.',
      },
      {
        q: 'What is the difference between nominal and real returns?',
        a: 'Nominal return is the raw percentage gain before adjusting for inflation. Real return accounts for inflation and reflects actual purchasing power gained. For accurate long-term financial planning, use real returns when your goal is expressed in today\'s dollars.',
      },
    ],
    related: ['compound-interest', 'retirement-savings', 'savings-goal', 'capital-gains-tax', '401k-calculator'],
  },
  affiliate: {
    partner: 'Betterment',
    label: 'Put your investment returns to work',
    url: 'https://www.betterment.com/investing',
    description: 'Automated, diversified portfolios designed to maximize long-term returns.',
  },
  geo: {
    definition: 'An investment return calculator projects the future value of an investment given an initial amount, regular contributions, expected annual return rate, and time horizon, using the future value of an annuity due formula to account for the compounding effect of periodic contributions.',
    ruleOfThumb: 'The Rule of 72: divide 72 by the annual return rate to estimate how long your money takes to double. At 7% annual return, money doubles every 10.3 years. At 10%, it doubles every 7.2 years. This is a useful mental shortcut for estimating long-term growth.',
    example: '$10,000 initial investment plus $6,000 per year at 7% annual return for 20 years: total future value approximately $262,000. Total contributed: $130,000. Investment growth: $132,000. More than half of the final value came from compounding, not from contributions.',
    keyFacts: [
      'The S&P 500 has averaged approximately 10% annual return (7% inflation-adjusted) over rolling 30-year periods, with no 30-year period ending in a loss. (Source: Vanguard / S&P historical data)',
      'Vanguard research found that over a 15-year period ending 2023, approximately 88% of actively managed US equity funds underperformed their benchmark index fund. (Source: Vanguard SPIVA Report)',
      'Morningstar research shows that a 0.5% reduction in expense ratio (from 1% to 0.5%) translates to approximately $10,000 in additional wealth over 20 years on a $50,000 portfolio at 7% return. (Source: Morningstar)',
      'Starting investing at 25 versus 35 with the same annual contributions produces roughly 2x the final balance at retirement due to an extra decade of compounding. (Source: Fidelity Investments)',
    ],
  },
  educational: {
    explainer: `This calculator uses the future value formula for an annuity due, which assumes contributions are made at the start of each year. The math has two parts: first, the initial lump sum grows on its own through compounding. Second, each annual contribution also compounds for the remaining years. The total is the sum of both. The key insight is that both components grow exponentially, not linearly. This is why the growth accelerates in later years. In year one, a $10,000 investment at 7% earns $700. In year twenty, that same original amount is now part of a much larger balance and the growth is far larger. Adding consistent annual contributions compounds this effect because each new contribution also starts its own compounding cycle. The longer the time horizon, the more dramatically the math works in your favor.`,
    tips: [
      'Use 6-7% as your return assumption for long-term stock market projections, not 10%. The 10% historical average is nominal and does not account for inflation. Using the real return gives you a more honest picture of future purchasing power.',
      'Maximize tax-advantaged accounts first. Contributions to a 401(k) or IRA reduce your taxable income today and let growth compound without annual tax drag. This is equivalent to an immediate return boost.',
      'Increase contributions whenever your income increases. A 1% increase in your savings rate has a much larger impact than a 1% increase in expected return because the contribution increase is certain and the return is not.',
      'Do not try to time the market. Research consistently shows that missing even the 10 best market days in a decade significantly reduces long-term returns. Investing consistently and holding through downturns is the strategy with the best long-term track record.',
    ],
    commonMistakes: [
      'Using an inflated return assumption. Entering 12% or 15% because it makes the outcome more exciting leads to retirement plans built on unrealistic foundations. Use 6-7% real return for conservative, realistic projections.',
      'Ignoring taxes on investment gains. Taxable brokerage accounts incur capital gains tax when you sell, which reduces the effective return. For long-term projections, account for taxes or confirm you are modeling tax-advantaged accounts.',
      'Cashing out investments during downturns. Selling when markets are down locks in losses and misses the recovery. Historical data shows that investors who stayed invested through every major downturn since 1929 recovered and exceeded prior highs in every case.',
    ],
    example: `Sam starts with $10,000 at age 30 and contributes $6,000 per year into a diversified index fund returning 7% annually. By age 60 (30 years), the calculator shows a total future value of approximately $671,000. Sam contributed $190,000 over 30 years. The remaining $481,000 came from investment growth. Sam's twin sibling Robin waited until age 40 to start the same plan. At age 60, Robin has approximately $266,000. The 10-year head start was worth $405,000 — far more than the $60,000 in extra contributions Sam made.`,
  },
  jsonLd: {
    faqs: [
      { q: 'What is a realistic stock market return?', a: 'The S&P 500 has averaged 10% nominal (7% inflation-adjusted) per year over the past century. Use 6-7% for conservative long-term projections.' },
      { q: 'How does inflation affect investment returns?', a: 'Inflation reduces purchasing power. Real return equals nominal return minus inflation rate. Use real returns for goals expressed in today\'s dollars.' },
      { q: 'What is dollar-cost averaging?', a: 'Investing a fixed amount at regular intervals regardless of market conditions, reducing the average cost per share over time.' },
      { q: 'Should I invest in index funds?', a: 'Low-cost index funds outperform the majority of actively managed funds over 10-20 year periods due to lower expense ratios.' },
      { q: 'How much should I invest each year?', a: '2025 IRA limit: $7,000 ($8,000 age 50+). 401(k) limit: $23,500 ($31,000 age 50+). Maximize tax-advantaged accounts first.' },
      { q: 'What happens if I stop contributing early?', a: 'Stopping contributions has a dramatic long-term impact because future years of compounding on those contributions are lost.' },
      { q: 'What is the Rule of 72?', a: 'Divide 72 by your annual return rate to estimate how long money takes to double. At 7%, money doubles every 10.3 years.' },
      { q: 'What is the difference between nominal and real returns?', a: 'Nominal return is the raw gain. Real return subtracts inflation and reflects actual purchasing power gained.' },
    ],
    howToSteps: [
      'Enter your initial lump-sum investment.',
      'Enter your annual contribution amount.',
      'Set the expected annual return rate.',
      'Enter the investment period in years.',
      'Click Calculate to see total future value, contributions, and investment growth.',
    ],
  },
}
