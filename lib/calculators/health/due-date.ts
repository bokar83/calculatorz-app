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
  geo: {
    definition: 'A pregnancy due date calculator estimates the expected delivery date by adding 280 days (40 weeks) to the first day of the last menstrual period (LMP), based on Naegele\'s Rule, which assumes a 28-day cycle with ovulation on day 14.',
    ruleOfThumb: 'Only about 5% of babies are born on their exact due date. About 80% of births occur within two weeks before or after. Full-term pregnancy is 39 to 40 weeks; early term is 37 to 38 weeks; post-term is 42 weeks or beyond.',
    example: 'LMP starts January 10. Add 280 days = October 17 estimated due date. If the cycle is 32 days (not 28), conception likely occurred 4 days later, shifting the due date to approximately October 21.',
    keyFacts: [
      'ACOG defines full-term pregnancy as 39 weeks 0 days through 40 weeks 6 days; births before 37 weeks are preterm (ACOG Committee Opinion No. 764).',
      'Only about 4 to 5 percent of births occur on the calculated due date; the typical delivery window spans 37 to 42 weeks (ACOG).',
      'First-trimester ultrasound (before 14 weeks) is the most accurate method for confirming gestational age and may revise the LMP-based due date (ACOG Practice Bulletin No. 175).',
      'Pregnancies lasting 42 weeks or more are considered post-term; ACOG recommends delivery no later than 42 weeks 0 days due to rising risks of stillbirth and neonatal complications.',
    ],
  },
  educational: {
    explainer: 'Naegele\'s Rule, developed in the early 19th century, calculates the estimated due date by adding 280 days (40 weeks) to the first day of the last menstrual period. This assumes a standard 28-day cycle with ovulation occurring on day 14. When cycle length differs, the due date is adjusted accordingly: a 32-day cycle shifts ovulation about 4 days later, pushing the due date forward by 4 days. Pregnancy is divided into three trimesters: weeks 1 through 13 (first), weeks 14 through 27 (second), and weeks 28 through 40 (third). Early ultrasound, ideally between 8 and 13 weeks, measures the fetus\'s crown-rump length and provides the most accurate gestational age. ACOG guidelines state that if the ultrasound estimate differs from the LMP estimate by more than 7 days in the first trimester, the ultrasound date takes precedence. Due dates are statistical estimates; only 5 percent of babies arrive on the exact predicted day, making preparation across a 4-week window practical and important.',
    tips: [
      'Confirm your due date with an early ultrasound between weeks 8 and 13, when fetal size measurements are most precise and produce the smallest margin of error.',
      'Track key prenatal appointments: first visit at 8 to 10 weeks, anatomy scan at 18 to 20 weeks, and glucose screening at 24 to 28 weeks.',
      'Understand the full-term window (39 to 40 weeks) as the safest delivery range; babies born at 37 to 38 weeks (early term) may have slightly higher risks than those born at 39 to 40 weeks.',
      'Prepare for delivery starting at week 36, because about 11 percent of births occur between 37 and 38 weeks, meaning labor can begin earlier than the due date.',
    ],
    commonMistakes: [
      'Using the conception date instead of LMP: the due date formula is built around LMP, not the date of intercourse or confirmed ovulation, so entering conception date produces an inaccurate result.',
      'Treating the due date as an exact delivery date: due dates have a natural margin of two weeks in either direction, and planning for only one specific day leads to unnecessary anxiety.',
      'Not adjusting for irregular cycles: women with cycles shorter than 25 days or longer than 31 days have shifted ovulation windows; using the default 28-day assumption without adjustment produces an off-target due date.',
    ],
    example: 'Sarah\'s LMP was February 5. Her cycle is 35 days, not 28. The standard LMP-based due date (280 days from Feb 5) = November 12. Adjusted due date accounts for 7 extra days (35 minus 28), shifting it to November 19. At week 12 of pregnancy (around May 5), Sarah is in her first trimester. Her adjusted due date of November 19 reflects ovulation on day 21 of her cycle rather than day 14.',
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
