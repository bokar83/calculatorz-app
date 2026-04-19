import { CalculatorConfig } from '../types'

export const roiCalculator: CalculatorConfig = {
  slug: 'roi-calculator',
  title: 'ROI Calculator',
  category: 'finance',
  description: 'Calculate return on investment as a percentage of initial cost.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'initialCost', label: 'Initial Investment', type: 'number', defaultValue: 10000, min: 0, step: 100, prefix: '$' },
    { id: 'finalValue', label: 'Final Value / Return', type: 'number', defaultValue: 14500, min: 0, step: 100, prefix: '$' },
    { id: 'years', label: 'Investment Period (Years)', type: 'number', defaultValue: 3, min: 0, max: 100, step: 0.5 },
  ],
  calculate: (inputs, currency) => {
    const cost = Number(inputs.initialCost)
    const value = Number(inputs.finalValue)
    const years = Number(inputs.years)
    if (cost === 0) return { values: [{ label: 'Error', value: 'Enter initial investment' }] }
    const netReturn = value - cost
    const roi = (netReturn / cost) * 100
    const annualizedRoi = years > 0 ? (Math.pow(value / cost, 1 / years) - 1) * 100 : 0
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return {
      values: [
        { label: 'Total ROI', value: (roi >= 0 ? '+' : '') + roi.toFixed(2) + '%', primary: true },
        { label: 'Net Return', value: fmt(netReturn) },
        { label: 'Annualized ROI', value: years > 0 ? (annualizedRoi >= 0 ? '+' : '') + annualizedRoi.toFixed(2) + '%/yr' : 'N/A' },
        { label: 'Return Multiple', value: (value / cost).toFixed(2) + 'x' },
      ],
      summary: 'Invested ' + fmt(cost) + ', returned ' + fmt(value) + '. ROI: ' + roi.toFixed(2) + '%' + (years > 0 ? ' (' + annualizedRoi.toFixed(2) + '%/yr annualized)' : '') + '.',
    }
  },
  resultLabels: ['Total ROI', 'Net Return', 'Annualized ROI', 'Return Multiple'],
  formula: 'ROI = (Final Value - Initial Cost) / Initial Cost x 100',
  content: {
    howTo: ['Enter the initial investment amount.', 'Enter the final value or total return.', 'Enter the investment period in years.', 'Click Calculate.'],
    faqs: [
      { q: 'What is ROI?', a: 'Return on investment measures the efficiency of an investment relative to its cost.' },
      { q: 'What is a good ROI?', a: 'It depends on the investment type; stocks often target 7-10% annually.' },
      { q: 'How does ROI differ from profit margin?', a: 'ROI measures return relative to investment cost; margin measures profit relative to revenue.' },
      { q: 'Can ROI be negative?', a: 'Yes, a negative ROI means the investment lost money.' },
      { q: 'What is a good ROI?', a: 'It depends on the asset class. The S&P 500 averages ~10% annually. Real estate averages 8-12%. A good ROI beats your cost of capital — what you could earn on the next best alternative investment.' },
      { q: 'What is the difference between ROI and IRR?', a: 'ROI measures total return as a percentage of cost, without considering time. IRR (Internal Rate of Return) annualizes return accounting for cash flow timing. IRR is more accurate for comparing investments of different durations.' },
      { q: 'How do I calculate ROI on real estate?', a: 'Real estate ROI = (Annual Rental Income - Annual Expenses) / Total Investment Cost. For appreciation: (Sale Price - Purchase Price - Costs) / Total Investment. Include closing costs, improvements, and taxes.' },
      { q: 'Does ROI include dividends or only price appreciation?', a: 'A total return calculation includes dividends, interest, or rental income. A price-only return calculation excludes income. Always clarify which you are calculating when comparing investments.' },
    ],
    related: ['profit-margin', 'break-even', 'investment-return', 'compound-interest', 'inflation', 'savings-goal'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is ROI?', a: 'Measures investment efficiency relative to its cost.' },
      { q: 'What is a good ROI?', a: 'Stocks often target 7-10% annually.' },
      { q: 'ROI vs profit margin?', a: 'ROI is vs cost; margin is vs revenue.' },
      { q: 'Can ROI be negative?', a: 'Yes, it means the investment lost money.' },
      { q: 'What is a good ROI?', a: 'It depends on the asset class. The S&P 500 averages ~10% annually. Real estate averages 8-12%. A good ROI beats your cost of capital — what you could earn on the next best alternative investment.' },
      { q: 'What is the difference between ROI and IRR?', a: 'ROI measures total return as a percentage of cost, without considering time. IRR (Internal Rate of Return) annualizes return accounting for cash flow timing. IRR is more accurate for comparing investments of different durations.' },
      { q: 'How do I calculate ROI on real estate?', a: 'Real estate ROI = (Annual Rental Income - Annual Expenses) / Total Investment Cost. For appreciation: (Sale Price - Purchase Price - Costs) / Total Investment. Include closing costs, improvements, and taxes.' },
      { q: 'Does ROI include dividends or only price appreciation?', a: 'A total return calculation includes dividends, interest, or rental income. A price-only return calculation excludes income. Always clarify which you are calculating when comparing investments.' },
    ],
    howToSteps: ['Enter initial cost.', 'Enter final value.', 'Enter years.', 'Click Calculate.'],
  },
  geo: {
    definition: 'Return on Investment (ROI) is a performance metric that measures the profitability of an investment relative to its cost, expressed as a percentage: (Net Profit / Cost of Investment) x 100. It is used to compare the efficiency of different investments.',
    ruleOfThumb: 'A positive ROI means you made money. Benchmark against alternatives: S&P 500 index funds average ~10% annually. If your investment ROI consistently underperforms the S&P 500, consider reallocating. For business investments, ROI should exceed your cost of capital.',
    example: 'You invest $5,000 in equipment. It generates $7,200 in revenue over 2 years with $1,200 in operating costs, for $6,000 net revenue. Net profit = $6,000 - $5,000 = $1,000. ROI = ($1,000 / $5,000) x 100 = 20% over 2 years, or about 9.5% annualized.',
    keyFacts: [
      'The S&P 500 has delivered an average annual return of approximately 10% (7% inflation-adjusted) over the past 100 years. (Source: Morningstar / NYU Stern)',
      'ROI does not account for time value of money; for multi-year investments, use Net Present Value (NPV) or IRR for more accurate comparison. (Source: CFA Institute)',
      'Marketing ROI in the US averages $5.44 return per $1 spent across industries, though it varies widely by channel and sector. (Source: Nielsen Annual Marketing Report 2023)',
      'Real estate investments in the US have returned an average of 8.6% annually when accounting for appreciation, income, and total costs. (Source: NCREIF Property Index)',
    ],
  },
  educational: {
    explainer: `ROI (Return on Investment) is the most common metric for evaluating whether an investment is worth making. The formula is simple: divide the net profit by the original investment cost, then multiply by 100 to get a percentage. A 20% ROI means you made 20 cents for every dollar invested. The challenge is that ROI alone is incomplete — it ignores how long the investment took. A 20% ROI over 10 years is far worse than a 20% ROI over 1 year. That is why annualized ROI or IRR (Internal Rate of Return) is more useful when comparing investments of different durations. ROI is most powerful as a comparison tool: which of two investments returned more relative to cost? It is used for everything from marketing campaigns to equipment purchases to real estate to stock portfolios.`,
    tips: [
      'Always annualize ROI when comparing investments of different durations. A 30% ROI over 3 years is only 9.1% annualized — worse than an index fund.',
      'Include all costs. For real estate, include closing costs, property taxes, insurance, maintenance, and vacancy. For business investments, include staff time at an hourly rate.',
      'Compare ROI against your opportunity cost — what you would have earned doing the next best thing. If you could get 7% risk-free, an investment ROI of 5% is actually a loss in real terms.',
      'Negative ROI investments are not always wrong if they build brand, capability, or strategic position. Quantify those benefits or exclude them from ROI analysis to keep the comparison clean.',
    ],
    commonMistakes: [
      'Ignoring time. A 100% ROI sounds great until you learn it took 20 years. Always annualize before comparing.',
      'Excluding hidden costs. Entrepreneurs often calculate ROI on revenue vs. product cost but forget to include their own labor, which can cost more than the product itself.',
      'Comparing ROI across asset classes without risk adjustment. A 15% ROI on a startup investment is not the same as 15% on Treasury bonds. Higher ROI must be discounted for higher risk.',
    ],
    example: 'Sarah runs a $3,000 Facebook ad campaign for her online store. It generates $11,500 in revenue with $5,000 in product costs. Net profit = $11,500 - $5,000 - $3,000 = $3,500. ROI = $3,500 / $3,000 = 116.7%. For every dollar spent on ads, she earned $2.17 in profit.',
  },
}
