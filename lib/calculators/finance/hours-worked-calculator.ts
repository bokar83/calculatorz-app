import { CalculatorConfig } from '../types'

export const hoursWorkedCalculator: CalculatorConfig = {
  slug: 'hours-worked-calculator',
  title: 'Hours Worked Calculator',
  category: 'finance',
  description: 'Calculate total hours worked between a start time and end time, with optional break deduction. Great for freelancers, contractors, and hourly employees.',
  updatedDate: 'May 2026',
  inputs: [
    {
      id: 'startHour',
      label: 'Start Hour (0-23)',
      type: 'number',
      defaultValue: 9,
      min: 0,
      max: 23,
      step: 1,
      hint: 'Enter hour in 24-hour format. 9 = 9 AM, 13 = 1 PM, 17 = 5 PM.',
    },
    {
      id: 'startMinute',
      label: 'Start Minute (0-59)',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 59,
      step: 1,
    },
    {
      id: 'endHour',
      label: 'End Hour (0-23)',
      type: 'number',
      defaultValue: 17,
      min: 0,
      max: 23,
      step: 1,
      hint: 'Enter hour in 24-hour format. 17 = 5 PM, 22 = 10 PM.',
    },
    {
      id: 'endMinute',
      label: 'End Minute (0-59)',
      type: 'number',
      defaultValue: 30,
      min: 0,
      max: 59,
      step: 1,
    },
    {
      id: 'breakMinutes',
      label: 'Break Time (minutes)',
      type: 'number',
      defaultValue: 30,
      min: 0,
      max: 480,
      step: 5,
      hint: 'Total unpaid break time. Enter 0 if no break or fully paid.',
    },
    {
      id: 'hourlyRate',
      label: 'Hourly Rate (optional, $)',
      type: 'number',
      defaultValue: 0,
      min: 0,
      step: 0.50,
      prefix: '$',
      hint: 'Enter your hourly rate to calculate earnings for this shift. Leave at 0 to skip.',
    },
  ],
  calculate: (inputs) => {
    const startH = Number(inputs.startHour)
    const startM = Number(inputs.startMinute)
    const endH = Number(inputs.endHour)
    const endM = Number(inputs.endMinute)
    const breakMin = Number(inputs.breakMinutes)
    const rate = Number(inputs.hourlyRate)

    let startTotal = startH * 60 + startM
    let endTotal = endH * 60 + endM

    // Handle overnight shifts (end time is next day)
    if (endTotal <= startTotal) {
      endTotal += 24 * 60
    }

    const grossMinutes = endTotal - startTotal
    const netMinutes = Math.max(0, grossMinutes - breakMin)

    const hoursWorked = netMinutes / 60
    const wholeHours = Math.floor(hoursWorked)
    const remainingMinutes = Math.round((hoursWorked - wholeHours) * 60)
    const decimalHours = hoursWorked.toFixed(2)

    const fmt = (v: number) => '$' + v.toFixed(2)

    const results = [
      { label: 'Hours Worked', value: `${wholeHours}h ${remainingMinutes}m`, primary: true },
      { label: 'Decimal Hours', value: decimalHours + ' hrs' },
      { label: 'Gross Time (before breaks)', value: `${Math.floor(grossMinutes / 60)}h ${grossMinutes % 60}m` },
      { label: 'Break Deducted', value: `${breakMin} min` },
    ]

    if (rate > 0) {
      const earnings = hoursWorked * rate
      const overtimeHours = Math.max(0, hoursWorked - 8)
      const regularHours = Math.min(hoursWorked, 8)
      const overtimePay = overtimeHours * rate * 1.5
      const regularPay = regularHours * rate
      results.push({ label: 'Shift Earnings', value: fmt(earnings) })
      if (overtimeHours > 0) {
        results.push({ label: 'Regular Pay (8 hrs)', value: fmt(regularPay) })
        results.push({ label: 'Overtime Pay (1.5x)', value: fmt(overtimePay) })
      }
    }

    const summaryParts = [`Worked ${decimalHours} hours (${wholeHours}h ${remainingMinutes}m) after ${breakMin} min break.`]
    if (rate > 0) {
      summaryParts.push(`Earnings: ${fmt(hoursWorked * rate)}.`)
    }

    return {
      values: results,
      summary: summaryParts.join(' '),
    }
  },
  resultLabels: ['Hours Worked', 'Decimal Hours', 'Gross Time', 'Break Deducted', 'Shift Earnings'],
  formula: 'Hours Worked = (End Time - Start Time) - Break Minutes / 60',
  content: {
    howTo: [
      'Enter your shift start time (hour and minute in 24-hour format).',
      'Enter your shift end time (hour and minute).',
      'Enter total break time in minutes (unpaid time).',
      'Optionally enter your hourly rate to calculate earnings.',
      'Click Calculate to see hours worked and pay.',
    ],
    refTable: {
      headers: ['Common Shift', 'Gross Time', 'With 30 min break'],
      rows: [
        ['9:00 AM - 5:00 PM', '8 hours', '7.5 hours'],
        ['8:00 AM - 4:30 PM', '8.5 hours', '8 hours'],
        ['7:00 AM - 3:00 PM', '8 hours', '7.5 hours'],
        ['12:00 PM - 8:00 PM', '8 hours', '7.5 hours'],
        ['10:00 PM - 6:00 AM (overnight)', '8 hours', '7.5 hours'],
        ['6:00 AM - 2:00 PM', '8 hours', '7.5 hours'],
      ],
    },
    faqs: [
      {
        q: 'How do I calculate hours worked between two times?',
        a: 'Subtract the start time from the end time to get gross work time, then subtract any unpaid break minutes. Convert total minutes to hours by dividing by 60. Example: 9:00 AM to 5:30 PM = 510 minutes, minus 30 min break = 480 minutes = 8.0 hours.',
      },
      {
        q: 'How does this handle overnight shifts?',
        a: 'If your end time is earlier than your start time, the calculator automatically assumes the shift crosses midnight and adds 24 hours to the end time. For example, 10 PM to 6 AM is treated as an 8-hour shift.',
      },
      {
        q: 'What is decimal hours and why does it matter?',
        a: 'Decimal hours express time as a decimal fraction rather than hours and minutes. 8 hours 30 minutes = 8.50 decimal hours. Payroll systems and invoices typically use decimal hours because you can multiply directly by an hourly rate.',
      },
      {
        q: 'Does this calculate overtime?',
        a: 'Yes, if you enter an hourly rate and work more than 8 hours in a shift, the calculator shows regular pay at your rate and overtime pay at 1.5x for hours beyond 8. Note that overtime rules vary by state and employer.',
      },
    ],
    related: ['hourly-to-salary', 'salary-to-hourly', 'overtime-pay', 'take-home-pay', 'tip-calculator'],
  },
  geo: {
    definition: 'An hours worked calculator computes the total time between a shift start and end, subtracts unpaid breaks, and converts the result to decimal hours for payroll and invoice use.',
    ruleOfThumb: 'Standard full-time: 8 hours/day, 40 hours/week. Overtime (US federal) kicks in after 40 hours/week at 1.5x rate. Convert minutes to decimal hours by dividing by 60.',
    example: 'A shift from 9:00 AM to 5:30 PM with a 30-minute lunch break = 8.0 hours worked. At $22/hour, that is $176.00 for the shift.',
    keyFacts: [
      'The US Fair Labor Standards Act (FLSA) requires overtime pay at 1.5x for hours over 40 per week for non-exempt employees.',
      'Some states (California, Alaska, Nevada) require daily overtime after 8 hours in a day, not just weekly.',
      'Freelancers and contractors often bill in 15-minute increments (0.25 hour blocks) for cleaner invoices.',
    ],
  },
  educational: {
    explainer: `Tracking hours accurately is the foundation of fair pay for hourly workers and accurate billing for freelancers. Converting between hours-and-minutes and decimal hours is where most mistakes happen. Most people can subtract 9 AM from 5 PM and get 8 hours, but add a non-round break (37 minutes) or an overnight shift and mental math quickly breaks down. This calculator handles both cases cleanly, including overnight shifts that cross midnight. For anyone billing clients, the decimal hours output is what matters most: multiply decimal hours by your rate and you get your invoice amount directly. For employees, knowing the exact hours worked helps verify that your paycheck matches what you actually worked.`,
    tips: [
      'Use 24-hour format for clarity: 1 PM = 13, 5 PM = 17, 11 PM = 23. This eliminates AM/PM confusion.',
      'Track break time honestly. For non-exempt employees, unpaid breaks must actually be unpaid and duty-free. If you work through lunch, you may be entitled to pay for that time.',
      'For freelancers, bill in 0.25-hour increments (15 minutes minimum). Round up to the nearest 15 minutes to protect your time.',
      'If you work multiple shifts in a day, calculate each separately and add the totals. Do not try to span multiple shifts in one calculation.',
    ],
    commonMistakes: [
      'Forgetting to subtract breaks. A 9:00 AM to 5:00 PM shift is 8 gross hours. With a 30-minute unpaid lunch, the payable time is 7.5 hours.',
      'Using 60-based minutes as decimals. 8 hours 30 minutes is NOT 8.30 hours. It is 8.5 hours. Multiplying 8.30 x $20 gives $166, but the correct answer is $170.',
      'Miscounting overnight shifts. A shift from 10 PM to 6 AM is 8 hours, not -16 hours. Always add 24 hours when the end time is earlier than the start time.',
    ],
    example: `Maria works 6:45 AM to 3:15 PM with a 45-minute unpaid lunch. Gross time: 8 hours 30 minutes = 510 minutes. Minus 45 minutes = 465 minutes = 7.75 hours. At $19.50/hour: 7.75 x $19.50 = $151.13. If Maria bills a client instead, her invoice line reads: 7.75 hours x $75 = $581.25.`,
  },
  jsonLd: {
    faqs: [
      { q: 'How do I calculate hours worked between two times?', a: 'Subtract start from end time in minutes, subtract break minutes, divide by 60. Example: 9 AM to 5:30 PM minus 30 min break = 480 min = 8 hours.' },
      { q: 'How does this handle overnight shifts?', a: 'If end time is earlier than start time, 24 hours is added automatically. 10 PM to 6 AM = 8 hours.' },
      { q: 'What is decimal hours?', a: 'Decimal hours express time as a fraction (8h 30m = 8.5 hrs) for direct multiplication by hourly rate.' },
      { q: 'Does this calculate overtime?', a: 'Yes, hours beyond 8 in a shift are shown at 1.5x when an hourly rate is entered.' },
    ],
    howToSteps: [
      'Enter shift start hour and minute (24-hour format).',
      'Enter shift end hour and minute.',
      'Enter break minutes (unpaid time).',
      'Optionally enter hourly rate for earnings.',
      'Click Calculate.',
    ],
  },
}
