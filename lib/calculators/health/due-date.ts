import { CalculatorConfig } from '../types'

export const dueDate: CalculatorConfig = {
  slug: 'due-date',
  title: 'Due Date Calculator',
  category: 'health',
  description: 'Calculate your estimated due date based on last menstrual period.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'lmpYear', label: 'LMP Year', type: 'number', defaultValue: 2025, min: 2020, max: 2030, step: 1 },
    {
      id: 'lmpMonth', label: 'LMP Month', type: 'select',
      options: [
        { value: '1', label: 'January' }, { value: '2', label: 'February' }, { value: '3', label: 'March' },
        { value: '4', label: 'April' }, { value: '5', label: 'May' }, { value: '6', label: 'June' },
        { value: '7', label: 'July' }, { value: '8', label: 'August' }, { value: '9', label: 'September' },
        { value: '10', label: 'October' }, { value: '11', label: 'November' }, { value: '12', label: 'December' },
      ],
    },
    { id: 'lmpDay', label: 'LMP Day', type: 'number', defaultValue: 15, min: 1, max: 31, step: 1 },
    { id: 'cycleLength', label: 'Average Cycle Length (days)', type: 'number', defaultValue: 28, min: 21, max: 45, step: 1 },
  ],
  calculate: (inputs) => {
    const year = Number(inputs.lmpYear)
    const month = Number(inputs.lmpMonth) - 1
    const day = Number(inputs.lmpDay)
    const cycleAdj = Number(inputs.cycleLength) - 28
    const lmp = new Date(year, month, day)
    const dueDate = new Date(lmp)
    dueDate.setDate(dueDate.getDate() + 280 + cycleAdj)

    const today = new Date()
    const daysPregnant = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24))
    const weeksPregnant = Math.floor(daysPregnant / 7)
    const daysMod = daysPregnant % 7
    const daysUntilDue = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dueDateStr = months[dueDate.getMonth()] + ' ' + dueDate.getDate() + ', ' + dueDate.getFullYear()
    const trimester = weeksPregnant < 14 ? '1st Trimester' : weeksPregnant < 28 ? '2nd Trimester' : '3rd Trimester'

    return {
      values: [
        { label: 'Estimated Due Date', value: dueDateStr, primary: true },
        { label: 'Current Week', value: weeksPregnant >= 0 ? weeksPregnant + ' weeks ' + daysMod + ' days' : 'LMP in future' },
        { label: 'Trimester', value: weeksPregnant >= 0 ? trimester : '-' },
        { label: 'Days Until Due', value: daysUntilDue > 0 ? daysUntilDue + ' days' : 'Overdue by ' + Math.abs(daysUntilDue) + ' days' },
      ],
      summary: 'Due date: ' + dueDateStr + '. Currently ' + weeksPregnant + ' weeks ' + daysMod + ' days pregnant (' + trimester + ').',
    }
  },
  resultLabels: ['Estimated Due Date', 'Current Week', 'Trimester', 'Days Until Due'],
  formula: 'Due Date = LMP + 280 days (adjusted for cycle length)',
  content: {
    howTo: ['Enter the first day of your last menstrual period.', 'Enter your average cycle length.', 'Click Calculate.'],
    faqs: [
      { q: 'How is due date calculated?', a: 'Add 280 days (40 weeks) to the first day of your last menstrual period.' },
      { q: 'How accurate is the due date?', a: 'Only about 5% of babies are born on their exact due date; a 2-week window is normal.' },
      { q: 'What is a full-term pregnancy?', a: 'Full term is 39-40 weeks; early term is 37-38 weeks.' },
      { q: 'Can an ultrasound change the due date?', a: 'Yes, early ultrasounds can refine the estimate based on fetal measurements.' },
    ],
    related: ['ovulation', 'sleep-calculator', 'water-intake', 'bmr-calories', 'bmi', 'ideal-body-weight'],
  },
  jsonLd: {
    faqs: [
      { q: 'How is due date calculated?', a: 'LMP + 280 days.' },
      { q: 'How accurate is it?', a: 'Only 5% are born on the exact date; a 2-week window is normal.' },
      { q: 'What is full term?', a: '39-40 weeks.' },
      { q: 'Can ultrasound change it?', a: 'Yes, early ultrasounds can refine the estimate.' },
    ],
    howToSteps: ['Enter LMP date.', 'Enter cycle length.', 'Click Calculate.'],
  },
}
