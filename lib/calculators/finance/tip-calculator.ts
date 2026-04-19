import { CalculatorConfig } from '../types'

export const tipCalculator: CalculatorConfig = {
  slug: 'tip-calculator',
  title: 'Tip Calculator',
  category: 'finance',
  description: 'Calculate tip amount, total bill, and split per person for any service.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'billAmount', label: 'Bill Amount', type: 'number', defaultValue: 65, min: 0, step: 0.01, prefix: '$' },
    {
      id: 'tipPercent', label: 'Tip Percentage', type: 'select',
      options: [
        { value: '10', label: '10% (poor service/counter)' },
        { value: '15', label: '15% (standard)' },
        { value: '18', label: '18% (good service)' },
        { value: '20', label: '20% (great service)' },
        { value: '25', label: '25% (excellent service)' },
        { value: '30', label: '30% (exceptional)' },
      ],
    },
    { id: 'numPeople', label: 'Number of People', type: 'number', defaultValue: 2, min: 1, max: 50, step: 1 },
  ],
  calculate: (inputs, currency) => {
    const bill = Number(inputs.billAmount)
    const tipPct = Number(inputs.tipPercent) || 18
    const people = Number(inputs.numPeople) || 1
    const tipAmount = bill * (tipPct / 100)
    const total = bill + tipAmount
    const perPerson = total / people
    const tipPerPerson = tipAmount / people
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return {
      values: [
        { label: 'Total Bill', value: fmt(total), primary: true },
        { label: 'Tip Amount', value: fmt(tipAmount) },
        { label: 'Per Person', value: fmt(perPerson) },
        { label: 'Tip Per Person', value: fmt(tipPerPerson) },
      ],
      summary: 'Bill: ' + fmt(bill) + ' + ' + tipPct + '% tip (' + fmt(tipAmount) + ') = ' + fmt(total) + ' total. Split ' + people + ' ways: ' + fmt(perPerson) + ' each.',
    }
  },
  resultLabels: ['Total Bill', 'Tip Amount', 'Per Person', 'Tip Per Person'],
  formula: 'Tip = Bill Amount x Tip Percentage / 100',
  content: {
    howTo: ['Enter the bill amount.', 'Select tip percentage.', 'Enter number of people splitting the bill.', 'Click Calculate.'],
    faqs: [
      { q: 'How much should I tip?', a: '15-20% is standard for restaurants; 10% for counter service.' },
      { q: 'Should I tip on the pre-tax amount?', a: 'Either is acceptable; tipping on pre-tax is slightly less generous.' },
      { q: 'How do I split a tip evenly?', a: 'Divide total tip by the number of people at the table.' },
      { q: 'Are tips taxable income?', a: 'Yes, tips are considered taxable income and must be reported.' },
      { q: 'Is tipping mandatory?', a: 'Tipping is customary but not legally required in the US. However, in many service industries, workers rely heavily on tips as part of their standard wages.' },
      { q: 'How much should I tip for takeout?', a: 'Tipping 10-15% for takeout is considered polite, especially when the restaurant prepared the food to go. Counter service typically ranges from 0-10%.' },
      { q: 'Should I tip on wine and alcohol?', a: 'Yes. Standard practice is to tip on the full bill including alcohol. If the wine is expensive, some diners tip a flat amount rather than a full percentage.' },
      { q: 'How is a tip different from a service charge?', a: 'A tip is voluntary and paid directly to the server. A service charge (sometimes called a gratuity) is mandatory and added by the restaurant. Check your bill carefully before adding an additional tip.' },
    ],
    related: ['sales-tax', 'percentage', 'vat-calculator', 'take-home-pay', 'income-tax', 'profit-margin'],
  },
  jsonLd: {
    faqs: [
      { q: 'How much should I tip?', a: '15-20% for restaurants; 10% for counter service.' },
      { q: 'Tip on pre-tax or post-tax?', a: 'Either is fine; pre-tax is slightly less.' },
      { q: 'How to split a tip?', a: 'Divide total tip by number of people.' },
      { q: 'Are tips taxable?', a: 'Yes, they must be reported as income.' },
      { q: 'Is tipping mandatory?', a: 'Tipping is customary but not legally required in the US. However, in many service industries, workers rely heavily on tips as part of their standard wages.' },
      { q: 'How much should I tip for takeout?', a: 'Tipping 10-15% for takeout is considered polite, especially when the restaurant prepared the food to go. Counter service typically ranges from 0-10%.' },
      { q: 'Should I tip on wine and alcohol?', a: 'Yes. Standard practice is to tip on the full bill including alcohol. If the wine is expensive, some diners tip a flat amount rather than a full percentage.' },
      { q: 'How is a tip different from a service charge?', a: 'A tip is voluntary and paid directly to the server. A service charge (sometimes called a gratuity) is mandatory and added by the restaurant. Check your bill carefully before adding an additional tip.' },
    ],
    howToSteps: ['Enter bill amount.', 'Select tip percentage.', 'Enter people count.', 'Click Calculate.'],
  },
  geo: {
    definition: 'A tip (gratuity) is a voluntary payment made to a service worker above the stated price, calculated as a percentage of the total bill. In the US, tipping is a customary part of the service economy in restaurants, hotels, taxis, and personal care services.',
    ruleOfThumb: 'Standard restaurant tip: 15% for average service, 18-20% for good service, 20-25% for excellent service. At minimum wage states, servers depend on tips for the majority of their income.',
    example: 'A $85 dinner bill at 20% tip = $17 tip, $102 total. Split between 3 people: $34 each ($28.33 food + $5.67 tip each).',
    keyFacts: [
      'The average restaurant tip in the US is approximately 19.4% as of 2024. (Source: Toast Restaurant Technology)',
      'Under the Fair Labor Standards Act, employers can pay tipped employees a base wage as low as $2.13/hour if tips bring total compensation to at least $7.25/hour. (Source: US Department of Labor)',
      'Automatic gratuities of 18-20% are common for parties of 6 or more; this is a service charge, not a traditional tip. (Source: IRS Publication 531)',
      'In 2023, 72% of Americans reported always tipping at sit-down restaurants. (Source: Bankrate 2023 Tipping Survey)',
    ],
  },
  educational: {
    explainer: `Tipping is a deeply embedded practice in American service culture. While the practice varies by country — tipping is often considered rude in Japan and uncommon in much of Europe — in the US it is a core part of how service workers are compensated. The reason is structural: federal law allows employers to pay tipped employees a subminimum wage of $2.13 per hour, with the expectation that tips will bring total pay up to at least the federal minimum wage. In practice, this means your tip is not a reward for exceptional service — it is often a necessary part of the worker's income. The standard has shifted upward over time. What was once 10-15% is now widely understood to be 18-20% for competent restaurant service. Tip calculators help eliminate the mental math and ensure you are tipping on the correct base amount.`,
    tips: [
      'Tip on the pre-tax amount if you want to be precise, but tipping on the post-tax total is more common and easier. The difference on a $60 bill is about $1.',
      'For large groups, check whether an automatic gratuity was already added before writing a tip on the receipt. Double-tipping on a party of 8 is an easy mistake.',
      'In cities with high cost of living (NYC, SF, LA), 20% is considered the floor for table service. 15% signals dissatisfaction with service.',
      'When splitting the bill unevenly, use this calculator to compute each person\'s share of the tip separately rather than splitting the tip evenly — this avoids arguments when one person ordered significantly more.',
    ],
    commonMistakes: [
      'Tipping on the discounted price after a coupon or Groupon. The server delivered the same service regardless of your discount. Tip on the pre-discount amount.',
      'Forgetting to tip on takeout and delivery. The kitchen staff and delivery driver worked for your order. 10-15% for takeout and 15-20% for delivery is appropriate.',
      'Assuming automatic gratuity is optional. If the bill says "18% gratuity included for parties of 6+," that amount is already part of your bill. Not paying it is refusing to pay your tab.',
    ],
    example: 'Four friends at a brunch with a $180 pre-tax bill. With 8.5% tax, total is $195.30. At 20% tip on the pre-tax amount: tip = $36, total = $231.30, each person pays $57.83. Using the post-tax total for the tip: $39.06 tip, $234.36 total, $58.59 each — a difference of about $0.76 per person.',
  },
}
