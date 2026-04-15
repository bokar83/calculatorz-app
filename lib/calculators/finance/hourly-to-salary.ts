import { CalculatorConfig, Currency } from '../types'

export const hourlyToSalary: CalculatorConfig = {
  slug: 'hourly-to-salary',
  title: 'Hourly to Annual Salary Calculator',
  category: 'finance',
  description: 'Convert your hourly wage to annual salary, monthly income, and weekly pay in seconds.',
  updatedDate: 'April 2026',
  tabs: [
    { id: 'basic', label: 'Basic' },
    { id: 'advanced', label: 'With Overtime' },
  ],
  inputs: [
    {
      id: 'hourlyRate',
      label: 'Hourly Rate',
      type: 'number',
      defaultValue: 25,
      min: 0,
      step: 0.01,
      prefix: '$',
    },
    {
      id: 'hoursPerWeek',
      label: 'Hours per Week',
      type: 'number',
      defaultValue: 40,
      min: 1,
      max: 168,
      step: 0.5,
    },
    {
      id: 'weeksPerYear',
      label: 'Weeks per Year',
      type: 'number',
      defaultValue: 52,
      min: 1,
      max: 52,
      step: 1,
    },
  ],
  calculate: (inputs, currency: Currency) => {
    const rate = Number(inputs.hourlyRate)
    const hours = Number(inputs.hoursPerWeek)
    const weeks = Number(inputs.weeksPerYear)
    const annual = rate * hours * weeks
    const monthly = annual / 12
    const biweekly = annual / 26
    const weekly = annual / 52

    const fmt = (n: number) =>
      currency.symbol + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    return {
      values: [
        { label: 'Annual Salary', value: fmt(annual) },
        { label: 'Monthly Income', value: fmt(monthly) },
        { label: 'Bi-weekly Pay', value: fmt(biweekly) },
        { label: 'Weekly Pay', value: fmt(weekly) },
      ],
      summary: `At ${currency.symbol}${rate}/hr for ${hours} hrs/week, you earn ${fmt(annual)} per year.`,
    }
  },
  resultLabels: ['Annual Salary', 'Monthly Income', 'Bi-weekly Pay', 'Weekly Pay'],
  formula: 'Annual Salary = Hourly Rate x Hours per Week x Weeks per Year',
  content: {
    howTo: [
      'Enter your hourly rate in your chosen currency.',
      'Set the number of hours you work per week (standard is 40).',
      'Adjust weeks per year if you take unpaid leave.',
      'Click Calculate to see your annual, monthly, bi-weekly, and weekly figures.',
    ],
    refTable: {
      headers: ['Hourly Rate', 'Annual (40 hrs/wk)', 'Monthly'],
      rows: [
        ['$10', '$20,800', '$1,733'],
        ['$15', '$31,200', '$2,600'],
        ['$20', '$41,600', '$3,467'],
        ['$25', '$52,000', '$4,333'],
        ['$30', '$62,400', '$5,200'],
        ['$40', '$83,200', '$6,933'],
        ['$50', '$104,000', '$8,667'],
        ['$75', '$156,000', '$13,000'],
        ['$100', '$208,000', '$17,333'],
      ],
    },
    faqs: [
      {
        q: 'How do I convert hourly to annual salary?',
        a: 'Multiply your hourly rate by the number of hours you work per week, then multiply by 52 (weeks per year). For example, $25/hr x 40 hours x 52 weeks = $52,000/year.',
      },
      {
        q: 'Does the calculator account for taxes?',
        a: 'No. This calculator shows gross (pre-tax) income. Use our Take-Home Pay Calculator to estimate net income after taxes.',
      },
      {
        q: 'What if I work part time?',
        a: 'Simply enter the actual hours you work per week. The calculator works for any number of hours.',
      },
      {
        q: 'How many work hours are in a year?',
        a: 'A standard full-time employee works 2,080 hours per year (40 hours/week x 52 weeks).',
      },
    ],
    related: ['salary-to-hourly', 'take-home-pay', 'overtime-pay', 'raise-calculator', 'salary-comparison', 'income-tax'],
  },
  geo: {
    definition: 'An hourly to salary calculator converts an hourly wage to annual, monthly, bi-weekly, and weekly income equivalents by multiplying the hourly rate by hours worked per week and the number of working weeks per year.',
    ruleOfThumb: 'A quick mental shortcut: double your hourly rate and add three zeros to get your approximate annual salary. For example, $25/hr × 2 = 50, plus three zeros = $50,000/year (close to the exact $52,000 for 40 hrs/week).',
    example: '$25/hour × 40 hours/week × 52 weeks = $52,000/year. Monthly: $4,333. Bi-weekly paycheck: $2,000. Weekly: $1,000. A standard full-time employee works 2,080 hours per year.',
    keyFacts: [
      'The US federal minimum wage is $7.25/hour, equivalent to $15,080/year at 40 hours/week.',
      'The US median hourly wage was approximately $22.50/hour in 2024, per the Bureau of Labor Statistics.',
      'A standard full-time work year in the US is 2,080 hours (52 weeks × 40 hours).',
      'To estimate hourly rate from salary: divide annual salary by 2,080.',
    ],
  },
  affiliate: {
    partner: 'SoFi',
    label: 'Boost your income with SoFi Personal Finance',
    url: 'https://www.sofi.com',
    description: 'Track earnings, set savings goals, and access financial tools in one app.',
  },
  jsonLd: {
    faqs: [
      { q: 'How do I convert hourly to annual salary?', a: 'Multiply hourly rate x hours per week x 52. Example: $25/hr x 40 hrs x 52 weeks = $52,000/year.' },
      { q: 'Does the calculator account for taxes?', a: 'No. This shows gross income. Use the Take-Home Pay Calculator for net income.' },
      { q: 'What if I work part time?', a: 'Enter the actual hours per week. The calculator works for any schedule.' },
      { q: 'How many work hours are in a year?', a: 'Standard full-time is 2,080 hours (40 hrs/week x 52 weeks).' },
    ],
    howToSteps: [
      'Enter your hourly rate.',
      'Set hours worked per week.',
      'Adjust weeks per year if needed.',
      'Click Calculate to see annual, monthly, bi-weekly, and weekly results.',
    ],
  },
}
