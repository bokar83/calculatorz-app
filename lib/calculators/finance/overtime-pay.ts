import { CalculatorConfig } from '../types'

export const overtimePay: CalculatorConfig = {
  slug: 'overtime-pay',
  title: 'Overtime Pay Calculator',
  category: 'finance',
  description: 'Calculate overtime earnings based on hours worked and pay rate.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'hourlyRate', label: 'Regular Hourly Rate', type: 'number', defaultValue: 20, min: 0, step: 0.5, prefix: '$' },
    { id: 'regularHours', label: 'Regular Hours Worked', type: 'number', defaultValue: 40, min: 0, max: 168, step: 1 },
    { id: 'overtimeHours', label: 'Overtime Hours Worked', type: 'number', defaultValue: 8, min: 0, max: 80, step: 0.5 },
    {
      id: 'overtimeRate', label: 'Overtime Multiplier', type: 'select',
      options: [
        { value: '1.5', label: '1.5x (time and a half)' },
        { value: '2', label: '2x (double time)' },
        { value: '2.5', label: '2.5x (double time and a half)' },
      ],
    },
  ],
  calculate: (inputs, currency) => {
    const rate = Number(inputs.hourlyRate)
    const regular = Number(inputs.regularHours)
    const ot = Number(inputs.overtimeHours)
    const multiplier = Number(inputs.overtimeRate) || 1.5
    const regularPay = rate * regular
    const otPay = rate * multiplier * ot
    const totalPay = regularPay + otPay
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return {
      values: [
        { label: 'Total Gross Pay', value: fmt(totalPay), primary: true },
        { label: 'Regular Pay', value: fmt(regularPay) },
        { label: 'Overtime Pay', value: fmt(otPay) },
        { label: 'Overtime Rate', value: fmt(rate * multiplier) + '/hr' },
      ],
      summary: `${regular} regular hrs at ${fmt(rate)} + ${ot} OT hrs at ${fmt(rate * multiplier)} = ${fmt(totalPay)} total.`,
    }
  },
  resultLabels: ['Total Gross Pay', 'Regular Pay', 'Overtime Pay', 'Overtime Rate'],
  formula: 'Overtime Pay = Hourly Rate x 1.5 x Overtime Hours',
  content: {
    howTo: ['Enter your regular hourly rate.', 'Enter regular and overtime hours worked.', 'Select overtime multiplier.', 'Click Calculate.'],
    faqs: [
      { q: 'What is the overtime rate?', a: 'Federal law requires 1.5x regular pay for hours over 40 per week.' },
      { q: 'Does double time apply?', a: 'Some states require double time after 12 hours in a day.' },
      { q: 'Are salaried workers eligible for overtime?', a: 'It depends on salary level and job duties under FLSA rules.' },
      { q: 'How is overtime taxed?', a: 'Overtime is taxed at your regular income tax rate.' },
    ],
    related: ['salary-to-hourly', 'hourly-to-salary', 'take-home-pay', 'raise-calculator', 'income-tax', 'salary-comparison'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is the overtime rate?', a: '1.5x regular pay for hours over 40/week under federal law.' },
      { q: 'Does double time apply?', a: 'Some states require double time after 12 hours in a day.' },
      { q: 'Are salaried workers eligible?', a: 'Depends on salary level and job duties under FLSA.' },
      { q: 'How is overtime taxed?', a: 'At your regular income tax rate.' },
    ],
    howToSteps: ['Enter hourly rate.', 'Enter hours.', 'Select multiplier.', 'Click Calculate.'],
  },
}
