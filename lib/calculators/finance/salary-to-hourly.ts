import { CalculatorConfig } from '../types'

export const salaryToHourly: CalculatorConfig = {
  slug: 'salary-to-hourly',
  title: 'Salary to Hourly Calculator',
  category: 'finance',
  description: 'Convert annual salary to hourly, daily, weekly, and monthly rates.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'annualSalary', label: 'Annual Salary', type: 'number', defaultValue: 52000, min: 0, step: 1000, prefix: '$' },
    { id: 'hoursPerWeek', label: 'Hours Per Week', type: 'number', defaultValue: 40, min: 1, max: 80, step: 0.5 },
    { id: 'weeksPerYear', label: 'Weeks Per Year', type: 'number', defaultValue: 52, min: 1, max: 52, step: 1 },
  ],
  calculate: (inputs, currency) => {
    const annual = Number(inputs.annualSalary)
    const hrs = Number(inputs.hoursPerWeek)
    const wks = Number(inputs.weeksPerYear)
    const totalHours = hrs * wks
    const hourly = totalHours > 0 ? annual / totalHours : 0
    const daily = hourly * (hrs / 5)
    const weekly = annual / wks
    const monthly = annual / 12
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return {
      values: [
        { label: 'Hourly Rate', value: fmt(hourly), primary: true },
        { label: 'Daily Rate', value: fmt(daily) },
        { label: 'Weekly Rate', value: fmt(weekly) },
        { label: 'Monthly Rate', value: fmt(monthly) },
      ],
      summary: `${fmt(annual)}/year at ${hrs} hrs/week = ${fmt(hourly)}/hour (${totalHours.toLocaleString()} total hours/year).`,
    }
  },
  resultLabels: ['Hourly Rate', 'Daily Rate', 'Weekly Rate', 'Monthly Rate'],
  formula: 'Hourly Rate = Annual Salary / (Hours per Week x Weeks per Year)',
  content: {
    howTo: ['Enter your annual salary.', 'Enter hours worked per week.', 'Adjust weeks per year if needed.', 'Click Calculate.'],
    faqs: [
      { q: 'How do I convert salary to hourly?', a: 'Divide annual salary by total annual hours (typically 2,080 for 40hr/wk).' },
      { q: 'Are these gross or net figures?', a: 'Gross (pre-tax).' },
      { q: 'What if I work overtime?', a: 'Use the Overtime Pay Calculator for overtime scenarios.' },
      { q: 'How many work hours are in a year?', a: 'Standard full-time is 2,080 hours (40 hrs/week x 52 weeks).' },
    ],
    related: ['hourly-to-salary', 'take-home-pay', 'overtime-pay', 'raise-calculator', 'salary-comparison', 'income-tax'],
  },
  jsonLd: {
    faqs: [
      { q: 'How do I convert salary to hourly?', a: 'Divide annual salary by 2,080.' },
      { q: 'Are these gross or net figures?', a: 'Gross (pre-tax).' },
      { q: 'What if I work overtime?', a: 'Use the Overtime Pay Calculator.' },
      { q: 'How many hours in a work year?', a: '2,080 (40 hrs/wk x 52 wks).' },
    ],
    howToSteps: ['Enter annual salary.', 'Enter hours per week.', 'Click Calculate.'],
  },
}
