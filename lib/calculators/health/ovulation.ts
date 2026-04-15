import { CalculatorConfig } from '../types'

export const ovulation: CalculatorConfig = {
  slug: 'ovulation',
  title: 'Ovulation Calculator',
  category: 'health',
  description: 'Estimate your ovulation window and most fertile days.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'lmpYear', label: 'First Day of Last Period - Year', type: 'number', defaultValue: 2025, min: 2020, max: 2030, step: 1 },
    {
      id: 'lmpMonth', label: 'Month', type: 'select',
      options: [
        { value: '1', label: 'January' }, { value: '2', label: 'February' }, { value: '3', label: 'March' },
        { value: '4', label: 'April' }, { value: '5', label: 'May' }, { value: '6', label: 'June' },
        { value: '7', label: 'July' }, { value: '8', label: 'August' }, { value: '9', label: 'September' },
        { value: '10', label: 'October' }, { value: '11', label: 'November' }, { value: '12', label: 'December' },
      ],
    },
    { id: 'lmpDay', label: 'Day', type: 'number', defaultValue: 1, min: 1, max: 31, step: 1 },
    { id: 'cycleLength', label: 'Average Cycle Length (days)', type: 'number', defaultValue: 28, min: 21, max: 45, step: 1 },
  ],
  calculate: (inputs) => {
    const year = Number(inputs.lmpYear)
    const month = Number(inputs.lmpMonth) - 1
    const day = Number(inputs.lmpDay)
    const cycle = Number(inputs.cycleLength)
    const lmp = new Date(year, month, day)

    const ovulationDay = cycle - 14
    const ovulationDate = new Date(lmp)
    ovulationDate.setDate(ovulationDate.getDate() + ovulationDay)

    const fertileStart = new Date(ovulationDate)
    fertileStart.setDate(fertileStart.getDate() - 5)
    const fertileEnd = new Date(ovulationDate)
    fertileEnd.setDate(fertileEnd.getDate() + 1)

    const nextPeriod = new Date(lmp)
    nextPeriod.setDate(nextPeriod.getDate() + cycle)

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const fmt = (d: Date) => months[d.getMonth()] + ' ' + d.getDate()

    return {
      values: [
        { label: 'Estimated Ovulation', value: fmt(ovulationDate), primary: true },
        { label: 'Fertile Window', value: fmt(fertileStart) + ' - ' + fmt(fertileEnd) },
        { label: 'Next Period', value: fmt(nextPeriod) },
        { label: 'Cycle Day of Ovulation', value: 'Day ' + ovulationDay },
      ],
      summary: 'Estimated ovulation: ' + fmt(ovulationDate) + '. Fertile window: ' + fmt(fertileStart) + ' to ' + fmt(fertileEnd) + '.',
    }
  },
  resultLabels: ['Estimated Ovulation', 'Fertile Window', 'Next Period', 'Cycle Day'],
  formula: 'Ovulation Day = Cycle Length - 14',
  content: {
    howTo: ['Enter the first day of your last menstrual period.', 'Enter your average cycle length.', 'Click Calculate.'],
    faqs: [
      { q: 'When does ovulation occur?', a: 'Typically 12-16 days before the next period, around day 14 of a 28-day cycle.' },
      { q: 'How long is the fertile window?', a: 'Usually 5-6 days: the 5 days before ovulation and the day of ovulation.' },
      { q: 'What if my cycle is irregular?', a: 'Irregular cycles make prediction harder; tracking basal body temperature can help.' },
      { q: 'Can stress affect ovulation?', a: 'Yes, high stress can delay or disrupt ovulation.' },
    ],
    related: ['due-date', 'sleep-calculator', 'water-intake', 'bmi', 'bmr-calories', 'ideal-body-weight'],
  },
  jsonLd: {
    faqs: [
      { q: 'When does ovulation occur?', a: 'Around day 14 of a 28-day cycle.' },
      { q: 'How long is the fertile window?', a: '5-6 days including the day of ovulation.' },
      { q: 'What if cycle is irregular?', a: 'Tracking basal body temperature can help.' },
      { q: 'Can stress affect ovulation?', a: 'Yes, stress can delay or disrupt it.' },
    ],
    howToSteps: ['Enter first day of last period.', 'Enter cycle length.', 'Click Calculate.'],
  },
}
