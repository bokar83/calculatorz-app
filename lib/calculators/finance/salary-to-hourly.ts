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
  geo: {
    definition: 'A salary-to-hourly calculator converts an annual salary to its equivalent hourly rate by dividing by the number of working hours per year, typically 2,080 hours (52 weeks times 40 hours per week).',
    ruleOfThumb: 'A quick estimate: divide your annual salary by 2,000 to get a rough hourly rate. Divide by 2,080 for the precise standard full-time figure. Example: $60,000 / 2,000 = $30/hour; $60,000 / 2,080 = $28.85/hour.',
    example: 'Annual salary of $75,000 divided by 2,080 hours equals $36.06 per hour. If the employee regularly works 45 hours per week (2,340 hours per year), the effective hourly rate drops to $75,000 / 2,340 = $32.05 per hour, reflecting unpaid overtime.',
    keyFacts: [
      'The median US weekly earnings for full-time workers was $1,165 in Q4 2024, equivalent to approximately $60,580 annually, according to the Bureau of Labor Statistics.',
      'The federal minimum wage is $7.25 per hour, unchanged since 2009. A living wage for a single adult with no children ranges from $15 to $25 per hour depending on location, according to MIT\'s Living Wage Calculator.',
      'Salaried workers are exempt from federal overtime protections under the Fair Labor Standards Act if they earn above $684 per week ($35,568 annually) and meet job duty tests, meaning unpaid overtime is legal for many white-collar workers.',
      'Total compensation for full-time employees includes employer-paid benefits averaging 30.9% of total compensation costs on top of wages, per Bureau of Labor Statistics Employer Costs for Employee Compensation (2024).',
    ],
  },
  educational: {
    explainer: 'Converting salary to an hourly rate is more than a math exercise; it reveals your true compensation picture and enables meaningful job comparisons. The standard calculation uses 2,080 annual hours (52 weeks times 40 hours), but the real figure for many salaried workers is higher. A manager working 50 hours per week logs 2,600 hours annually, reducing the effective hourly rate by 20% compared to the stated salary. That gap is the hidden cost of salaried positions: unpaid overtime is legal for exempt employees under the Fair Labor Standards Act. When comparing a salaried offer to an hourly position, benefits valuation is equally important. Employer-paid health insurance, 401(k) matching, paid time off, and payroll taxes average an additional 30% on top of wages for US employers, according to Bureau of Labor Statistics data. A $55,000 salary with full benefits may represent more total compensation than a $28/hour contract position without benefits, even though the hourly rate converts to $55,000 / 2,080 = $26.44. Use this calculator to establish your baseline rate, then add benefits and subtract realistic hours to get a true comparison.',
    tips: [
      'Track your actual hours worked for two weeks before evaluating whether your effective hourly rate is fair. Many salaried professionals discover they are earning closer to $18-22 per hour once unpaid overtime is factored into the annual denominator.',
      'When comparing a salaried role with benefits to a freelance or hourly rate, add 25-30% to the salaried figure to account for employer-paid payroll taxes, health insurance, and retirement contributions you would need to cover independently as a contractor.',
      'Negotiate salary on an annual or total-compensation basis, not hourly. Framing the conversation in annual terms makes incremental differences feel smaller and positions you to negotiate benefits improvements alongside base pay.',
      'Use the hourly rate calculation to evaluate whether side income opportunities are worth your time. If your effective rate is $35/hour and a side project pays $20/hour with no growth potential, the opportunity cost is real and compounding.',
    ],
    commonMistakes: [
      'Using 2,000 hours instead of 2,080 for the standard annual denominator, which overstates the hourly rate by 3.8%. On a $75,000 salary, that difference is $1.44 per hour, relevant when comparing roles or calculating contractor rates.',
      'Ignoring unpaid overtime when evaluating compensation. A salaried employee working 50 hours per week earns an effective rate of annual salary divided by 2,600, not 2,080. For a $70,000 salary, that is the difference between $33.65/hour and $26.92/hour.',
      'Forgetting that the salary-to-hourly conversion shows gross earnings before federal income tax, Social Security tax, Medicare tax, and state income tax. Your take-home hourly rate after taxes is typically 25-35% lower than the gross figure this calculator produces.',
    ],
    example: 'James receives a job offer for $72,000 per year as a salaried manager. At 2,080 hours, his stated hourly rate is $34.62. However, his manager role realistically involves 48 hours per week, or 2,496 annual hours. His effective hourly rate is $72,000 / 2,496 = $28.85. His employer provides health insurance worth $7,200 per year and 401(k) matching worth $2,160 (3% of salary). Total compensation = $81,360. True effective rate including benefits at actual hours: $81,360 / 2,496 = $32.60 per hour, a more complete picture for comparing this offer against a $35/hour contract role with no benefits.',
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
