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
  geo: {
    definition: 'An overtime pay calculator determines gross earnings when an employee works beyond the standard 40-hour workweek, applying the Fair Labor Standards Act (FLSA) requirement of at least 1.5 times the regular rate of pay for each hour worked over 40 in a workweek.',
    ruleOfThumb: 'Under federal law, any non-exempt employee who works more than 40 hours in a single workweek must be paid at least 1.5 times their regular hourly rate for each additional hour. Some states such as California also require double time (2x) for hours exceeding 12 in a single day.',
    example: 'An employee earns $18 per hour and works 48 hours in a week. Regular pay: 40 hours x $18 = $720. Overtime pay: 8 hours x $27 (1.5 x $18) = $216. Total gross pay = $936 for the week.',
    keyFacts: [
      'The FLSA requires employers to pay non-exempt employees at least 1.5 times the regular rate for all hours worked over 40 in a single workweek; there is no federal requirement for overtime based on hours worked in a single day (US Department of Labor, FLSA Overtime, 2024).',
      'As of July 1, 2024, the FLSA salary threshold for overtime exemption rose to $844 per week ($43,888 annually), meaning salaried workers earning below this amount must receive overtime regardless of their job duties (US Department of Labor, Final Rule, 2024).',
      'California requires double time (2x regular rate) for hours worked beyond 12 in a single day and for all hours worked on the seventh consecutive day of a workweek beyond 8 hours, going further than federal law (California Labor Code, Section 510).',
      'Misclassifying workers as exempt from overtime is one of the most common wage-and-hour violations investigated by the Department of Labor, resulting in over $230 million in back wages recovered for workers in fiscal year 2023 (US Department of Labor, WHD Annual Report, 2023).',
    ],
  },
  educational: {
    explainer: 'Overtime pay is the additional compensation required by law when an eligible employee works more than 40 hours in a workweek. Under the federal Fair Labor Standards Act (FLSA), the minimum overtime rate is 1.5 times (time and a half) the employee\'s regular rate of pay. The key word is "regular rate," which is not just your base hourly wage. It includes certain bonuses and commissions paid that week, which can push the actual overtime rate higher than a simple 1.5x calculation. Not all workers are covered. The FLSA exempts certain executive, administrative, professional, and outside sales employees from overtime requirements, provided they meet both a salary threshold (currently $844 per week as of mid-2024) and a duties test. Just calling someone a "manager" or paying them a salary does not automatically exempt them from overtime. State laws can be more generous than federal law: California and several other states have daily overtime rules, and some jurisdictions require double time under specific conditions. Overtime wages are subject to regular income tax withholding, Social Security, and Medicare taxes, just like regular pay.',
    tips: [
      'Track your hours worked in a workweek precisely, including time spent answering emails or calls outside the office, since all compensable work time counts toward the 40-hour overtime threshold under the FLSA.',
      'If you are a salaried employee earning under $43,888 per year (as of 2024), confirm with your HR department whether you are classified as exempt or non-exempt, since you may be entitled to overtime pay regardless of your job title.',
      'Understand that your employer can set any regular schedule, including four 10-hour days, without triggering federal overtime, since the FLSA threshold is based on total hours in a workweek, not hours in a single day (except in states like California with daily overtime rules).',
      'Keep your own records of hours worked separately from your employer\'s timekeeping system, since in a wage dispute the burden of proof lies with the employer to show accurate records, but having your own log strengthens any claim you may need to make.',
    ],
    commonMistakes: [
      'Assuming salaried employees are automatically exempt from overtime, when in reality salary alone does not create an exemption under the FLSA unless the employee also meets a specific duties test and earns above the salary threshold.',
      'Forgetting that the overtime threshold is based on a single workweek (Sunday through Saturday, or any fixed 7-day period the employer designates), so working 50 hours one week and 30 the next does not average out to 40 hours for overtime purposes.',
      'Not accounting for nondiscretionary bonuses (production bonuses, attendance bonuses, commissions) when calculating the regular rate of pay, which must be included in the base used to compute the overtime rate under FLSA rules.',
    ],
    example: 'David works as a warehouse supervisor earning $22 per hour. In a busy holiday week he works his standard 40 hours plus 12 hours of overtime. His regular pay for the week is 40 x $22 = $880. His overtime rate is $22 x 1.5 = $33 per hour. His overtime pay is 12 x $33 = $396. Total gross pay for the week = $880 + $396 = $1,276. Compared to a week with no overtime where he earns $880, the 12 extra hours added $396 to his paycheck, an effective extra rate of $33 per hour before taxes.',
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
