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
    ],
    related: ['sales-tax', 'percentage', 'vat-calculator', 'take-home-pay', 'income-tax', 'profit-margin'],
  },
  jsonLd: {
    faqs: [
      { q: 'How much should I tip?', a: '15-20% for restaurants; 10% for counter service.' },
      { q: 'Tip on pre-tax or post-tax?', a: 'Either is fine; pre-tax is slightly less.' },
      { q: 'How to split a tip?', a: 'Divide total tip by number of people.' },
      { q: 'Are tips taxable?', a: 'Yes, they must be reported as income.' },
    ],
    howToSteps: ['Enter bill amount.', 'Select tip percentage.', 'Enter people count.', 'Click Calculate.'],
  },
}
