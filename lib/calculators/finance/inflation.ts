import { CalculatorConfig, Currency } from '../types'

export const inflation: CalculatorConfig = {
  slug: 'inflation',
  title: 'Inflation Calculator',
  category: 'finance',
  description: 'Calculate the impact of inflation on purchasing power over time.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'amount', label: 'Current Amount', type: 'number', defaultValue: 1000, prefix: '$' },
  ],
  calculate: (_inputs: Record<string, number | string>, _currency: Currency) => ({
    values: [{ label: 'Adjusted Value', value: '$0.00' }],
  }),
  resultLabels: ['Adjusted Value'],
  formula: 'Future Value = Present Value x (1 + Inflation Rate)^Years',
  content: {
    howTo: ['Enter the current amount.', 'Enter average inflation rate.', 'Enter number of years.', 'Click Calculate.'],
    faqs: [
      { q: 'What is inflation?', a: 'The rate at which prices rise and purchasing power falls over time.' },
      { q: 'What is the average US inflation rate?', a: 'Historically around 2-3% per year; the Fed targets 2%.' },
      { q: 'How does inflation affect savings?', a: 'If your savings earn less than inflation, your real purchasing power decreases.' },
      { q: 'What is the CPI?', a: 'The Consumer Price Index measures average price changes across a basket of goods.' },
    ],
    related: ['compound-interest', 'investment-return', 'retirement-savings', 'savings-goal', 'roi-calculator', 'simple-interest'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is inflation?', a: 'The rate prices rise and purchasing power falls.' },
      { q: 'Average US inflation rate?', a: 'Historically 2-3%; Fed targets 2%.' },
      { q: 'How does it affect savings?', a: 'Savings earning less than inflation lose real value.' },
      { q: 'What is the CPI?', a: 'Measures average price changes across a basket of goods.' },
    ],
    howToSteps: ['Enter current amount.', 'Enter inflation rate.', 'Enter years.', 'Click Calculate.'],
  },
}
