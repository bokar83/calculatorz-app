import { CalculatorConfig } from '../types'

export const capitalGainsTax: CalculatorConfig = {
  slug: 'capital-gains-tax',
  title: 'Capital Gains Tax Calculator',
  category: 'finance',
  description: 'Estimate capital gains tax on the sale of investments or assets.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'salePrice', label: 'Sale Price', type: 'number', defaultValue: 50000, min: 0, step: 500, prefix: '$' },
    { id: 'costBasis', label: 'Cost Basis (original purchase price)', type: 'number', defaultValue: 25000, min: 0, step: 500, prefix: '$' },
    {
      id: 'holdingPeriod', label: 'Holding Period', type: 'select',
      options: [
        { value: 'short', label: 'Short-term (1 year or less)' },
        { value: 'long', label: 'Long-term (over 1 year)' },
      ],
    },
    { id: 'annualIncome', label: 'Annual Taxable Income', type: 'number', defaultValue: 75000, min: 0, step: 1000, prefix: '$' },
  ],
  calculate: (inputs, currency) => {
    const sale = Number(inputs.salePrice)
    const basis = Number(inputs.costBasis)
    const income = Number(inputs.annualIncome)
    const isLongTerm = inputs.holdingPeriod === 'long'
    const gain = sale - basis
    if (gain <= 0) return { values: [{ label: 'Capital Loss', value: currency.symbol + Math.abs(gain).toLocaleString('en-US') }], summary: 'You have a capital loss. Losses can offset gains and up to $3,000 of ordinary income per year.' }

    let rate: number
    if (!isLongTerm) {
      // Short-term: taxed as ordinary income (simplified)
      if (income < 47150) rate = 0.22
      else if (income < 100525) rate = 0.22
      else if (income < 191950) rate = 0.24
      else rate = 0.32
    } else {
      // 2025 long-term rates
      if (income <= 47025) rate = 0
      else if (income <= 518900) rate = 0.15
      else rate = 0.20
    }

    const tax = gain * rate
    const netProceeds = gain - tax
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return {
      values: [
        { label: 'Capital Gain', value: fmt(gain), primary: true },
        { label: 'Tax Owed', value: fmt(tax) },
        { label: 'Tax Rate', value: (rate * 100).toFixed(0) + '%' },
        { label: 'Net Gain After Tax', value: fmt(netProceeds) },
      ],
      summary: `${fmt(gain)} ${isLongTerm ? 'long-term' : 'short-term'} gain taxed at ${(rate * 100).toFixed(0)}% = ${fmt(tax)} owed. Net gain: ${fmt(netProceeds)}.`,
    }
  },
  resultLabels: ['Capital Gain', 'Tax Owed', 'Tax Rate', 'Net Gain After Tax'],
  formula: 'Capital Gains Tax = (Sale Price - Cost Basis) x Tax Rate',
  content: {
    howTo: ['Enter the sale price of the asset.', 'Enter your cost basis (what you paid).', 'Select short or long-term holding period.', 'Enter your annual income for rate calculation.', 'Click Calculate.'],
    faqs: [
      { q: 'What is the capital gains tax rate?', a: 'Long-term rates are 0%, 15%, or 20% based on income; short-term rates match ordinary income tax.' },
      { q: 'What is a long-term vs short-term gain?', a: 'Long-term is for assets held over one year; short-term is one year or less.' },
      { q: 'What is cost basis?', a: 'The original price you paid for an asset, including fees and commissions.' },
      { q: 'Can losses offset gains?', a: 'Yes, capital losses can offset gains and up to $3,000 of ordinary income per year.' },
    ],
    related: ['income-tax', 'investment-return', 'roi-calculator', 'inflation', 'retirement-savings', 'sales-tax'],
  },
  geo: {
    definition: 'A capital gains tax calculator estimates the federal tax owed on profits from selling a capital asset such as stocks, real estate, or collectibles, applying either short-term (ordinary income) or long-term (preferential) rates depending on the holding period.',
    ruleOfThumb: 'Hold an asset for more than one year to qualify for long-term capital gains rates, which max out at 20% versus up to 37% for short-term gains taxed as ordinary income.',
    example: 'An investor buys stock for $10,000 and sells for $18,000 after 14 months. Long-term gain = $8,000. At the 15% rate (middle income bracket): tax owed = $1,200. Net gain after tax = $6,800.',
    keyFacts: [
      'For 2024, the 0% long-term capital gains rate applies to single filers with taxable income up to $47,025 and married filers up to $94,050 (IRS Revenue Procedure 2023-34).',
      'The 15% long-term rate applies to single filers earning between $47,026 and $518,900 in 2024, covering the vast majority of individual investors (IRS Publication 550, 2024).',
      'Capital losses can offset capital gains dollar for dollar, and up to $3,000 of excess losses can reduce ordinary income per year, with remaining losses carried forward indefinitely (IRS Publication 550).',
      'The Net Investment Income Tax (NIIT) adds an additional 3.8% on investment income for taxpayers with modified adjusted gross income above $200,000 (single) or $250,000 (married), per IRS Form 8960 instructions.',
    ],
  },
  educational: {
    explainer: 'Capital gains tax is the tax you pay when you sell an asset for more than you paid for it. The profit is called a capital gain, and how much tax you owe depends on two things: how long you held the asset and your total income. If you sell within one year of buying, the gain is "short-term" and taxed at your ordinary income rate, which can be as high as 37%. If you hold for more than one year, the gain is "long-term" and taxed at a lower preferential rate of 0%, 15%, or 20% depending on your income. The starting point for calculating your gain is your cost basis, which is what you originally paid including any commissions or fees. Reducing your cost basis error is one of the most common mistakes investors make. You can legally reduce your capital gains tax through strategies like tax-loss harvesting (selling losing positions to offset gains), using tax-advantaged accounts like IRAs and 401(k)s where gains are sheltered, and simply holding assets longer to qualify for the lower long-term rates.',
    tips: [
      'Track your cost basis for every investment from day one, including broker commissions and reinvested dividends, since a higher cost basis directly reduces your taxable gain when you sell.',
      'Practice tax-loss harvesting before December 31 each year by reviewing your portfolio for losing positions that can be sold to offset realized gains, reducing your tax bill for that year.',
      'Prioritize holding volatile or high-growth assets in tax-advantaged accounts like Roth IRAs, where gains grow tax-free and qualified withdrawals owe nothing.',
      'Check your state\'s capital gains tax rules separately, since some states like California tax all capital gains as ordinary income with no preferential rate, which can add 9-13% on top of federal tax.',
    ],
    commonMistakes: [
      'Forgetting that your cost basis includes broker fees and commissions paid at purchase, which reduces your taxable gain and is money left on the table if omitted from your calculation.',
      'Not accounting for state income tax on top of federal capital gains tax, which can raise the effective rate well above 20% in high-tax states like California, New York, and New Jersey.',
      'Confusing the one-year holding period cutoff, specifically selling on day 364 instead of waiting until day 366, which causes a short-term gain taxed at a rate potentially 10-20 percentage points higher than the long-term rate.',
    ],
    example: 'James buys 100 shares of a technology company at $45 each in March 2023, paying a $10 commission, for a total cost basis of $4,510. He sells all 100 shares at $72 each in April 2024 (13 months later) for proceeds of $7,200. His long-term capital gain is $7,200 minus $4,510 = $2,690. With a taxable income of $85,000, James falls in the 15% long-term bracket. His federal capital gains tax is $2,690 times 0.15 = $403.50, leaving a net after-tax profit of $2,286.50.',
  },
  jsonLd: {
    faqs: [
      { q: 'What is the capital gains rate?', a: 'Long-term: 0%, 15%, or 20%; short-term: ordinary income rates.' },
      { q: 'Long-term vs short-term?', a: 'Long-term is over one year; short-term is one year or less.' },
      { q: 'What is cost basis?', a: 'The original purchase price including fees.' },
      { q: 'Can losses offset gains?', a: 'Yes, and up to $3,000 of ordinary income per year.' },
    ],
    howToSteps: ['Enter sale price.', 'Enter cost basis.', 'Select holding period.', 'Click Calculate.'],
  },
}
