import { CalculatorConfig } from '../types'

export const breakEven: CalculatorConfig = {
  slug: 'break-even',
  title: 'Break-Even Calculator',
  category: 'finance',
  description: 'Calculate the sales volume needed to cover fixed and variable costs.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'fixedCosts', label: 'Monthly Fixed Costs', type: 'number', defaultValue: 10000, min: 0, step: 100, prefix: '$' },
    { id: 'pricePerUnit', label: 'Price Per Unit', type: 'number', defaultValue: 50, min: 0, step: 1, prefix: '$' },
    { id: 'variableCostPerUnit', label: 'Variable Cost Per Unit', type: 'number', defaultValue: 30, min: 0, step: 1, prefix: '$' },
  ],
  calculate: (inputs, currency) => {
    const fixed = Number(inputs.fixedCosts)
    const price = Number(inputs.pricePerUnit)
    const variable = Number(inputs.variableCostPerUnit)
    const contribution = price - variable
    if (contribution <= 0) return { values: [{ label: 'Error', value: 'Price must exceed variable cost' }] }
    const units = Math.ceil(fixed / contribution)
    const revenue = units * price
    const contributionMargin = (contribution / price) * 100
    const profitAt2x = (units * 2 * contribution) - fixed
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return {
      values: [
        { label: 'Break-Even Units', value: units.toLocaleString('en-US'), primary: true },
        { label: 'Break-Even Revenue', value: fmt(revenue) },
        { label: 'Contribution Margin', value: contributionMargin.toFixed(1) + '%' },
        { label: 'Profit at 2x Sales', value: fmt(profitAt2x) },
      ],
      summary: 'Sell ' + units.toLocaleString() + ' units at ' + fmt(price) + ' to break even (' + fmt(revenue) + ' revenue). Contribution margin per unit: ' + fmt(contribution) + '.',
    }
  },
  resultLabels: ['Break-Even Units', 'Break-Even Revenue', 'Contribution Margin', 'Profit at 2x Sales'],
  formula: 'Break-Even Units = Fixed Costs / (Price per Unit - Variable Cost per Unit)',
  content: {
    howTo: ['Enter your monthly fixed costs.', 'Enter price per unit.', 'Enter variable cost per unit.', 'Click Calculate.'],
    faqs: [
      { q: 'What is break-even analysis?', a: 'It shows the point where total revenue equals total costs, resulting in no profit or loss.' },
      { q: 'What are fixed vs variable costs?', a: 'Fixed costs do not change with output; variable costs increase with production.' },
      { q: 'How does price affect break-even?', a: 'Higher prices lower the break-even point; lower prices raise it.' },
      { q: 'Why is break-even important?', a: 'It helps businesses understand the minimum sales needed to stay viable.' },
    ],
    related: ['profit-margin', 'roi-calculator', 'sales-tax', 'percentage', 'investment-return', 'savings-goal'],
  },
  geo: {
    definition: 'A break-even calculator determines the sales volume at which total revenue equals total costs, producing neither profit nor loss, using the formula Break-Even Units = Fixed Costs divided by (Price per Unit minus Variable Cost per Unit).',
    ruleOfThumb: 'If your contribution margin (price minus variable cost) is less than 30% of your selling price, you need very high sales volume to be profitable. Businesses with contribution margins below 20% are extremely vulnerable to cost increases.',
    example: 'A bakery with $3,000 monthly fixed costs sells loaves at $8 each with $3 variable cost. Contribution margin = $5. Break-even = 3,000 / 5 = 600 loaves per month, or about 20 per day.',
    keyFacts: [
      'About 20% of small businesses fail within the first year, often because owners never calculated their break-even point before opening (SBA Office of Advocacy, 2023).',
      'The average small business has fixed costs representing 30-40% of total costs, making contribution margin analysis critical for pricing decisions (SBA Small Business Profiles, 2022).',
      'A 10% price increase on a product with a 20% contribution margin can cut the break-even unit count by one-third, illustrating the leverage of pricing on profitability (Accounting Principles, Weygandt et al.).',
      'Break-even analysis is most accurate when applied monthly rather than annually, since fixed costs such as rent and payroll are paid each month regardless of sales volume (SCORE Mentors, Financial Literacy Guide, 2023).',
    ],
  },
  educational: {
    explainer: 'Break-even analysis is one of the most practical tools a business owner can use. It answers a simple but critical question: how much do I need to sell just to cover my costs? Every business has two types of costs. Fixed costs stay the same no matter how much you sell, things like rent, insurance, and salaries. Variable costs change with each sale, such as raw materials, packaging, or payment processing fees. The difference between your selling price and your variable cost per unit is called the contribution margin. That is the portion of each sale that actually goes toward covering your fixed costs. Once your total contribution margin adds up to equal your fixed costs, you have broken even. Every unit sold beyond that point generates pure profit. Break-even analysis helps you set realistic sales targets, evaluate pricing decisions, and understand how sensitive your business is to cost increases or slow months. It is especially valuable before launching a product or opening a location, when the question "can this actually work?" needs a data-driven answer.',
    tips: [
      'Recalculate break-even whenever you change your price or take on a new fixed cost, such as hiring a part-time employee or adding a software subscription, since even small changes shift the number significantly.',
      'Track your contribution margin by product line, not just overall, so you know which items carry the most weight in reaching break-even faster.',
      'Use your break-even number to set a weekly sales target, divide monthly break-even units by 4.3 to get a weekly floor that keeps you on track.',
      'Stress-test your model by calculating break-even at 80% of your expected price or at 120% of your projected variable cost to see how resilient the business is to real-world surprises.',
    ],
    commonMistakes: [
      'Leaving out the owner\'s salary from fixed costs, which makes the break-even point look lower than it really is and masks the true cost of running the business.',
      'Treating variable costs as fixed once the business is running, when in reality supplier price increases, shipping rate changes, and credit card processing fees creep up and erode your contribution margin over time.',
      'Treating the break-even point as the business goal rather than a floor, which leads owners to stop pushing for growth once they stop losing money instead of aiming for a meaningful profit margin.',
    ],
    example: 'Sarah opens a yoga studio. Her fixed costs are $2,200 per month in rent, $300 in utilities, and $400 in insurance and software, totaling $2,900 per month. She charges $18 per class and her variable cost per attendee (cleaning supplies, booking platform fees) is $3, giving her a contribution margin of $15 per class seat. Her break-even point is $2,900 divided by $15 = 194 class attendees per month. With 4 classes per week, that is about 12 students per class on average just to cover costs. Knowing this, Sarah prices a 10-class pack at $150 and targets 20 students per class to reach profitability.',
  },
  jsonLd: {
    faqs: [
      { q: 'What is break-even analysis?', a: 'The point where revenue equals costs; no profit or loss.' },
      { q: 'Fixed vs variable costs?', a: 'Fixed do not change with output; variable increase with production.' },
      { q: 'How does price affect it?', a: 'Higher prices lower the break-even point.' },
      { q: 'Why is it important?', a: 'Shows minimum sales needed to stay viable.' },
    ],
    howToSteps: ['Enter fixed costs.', 'Enter price per unit.', 'Enter variable cost.', 'Click Calculate.'],
  },
}
