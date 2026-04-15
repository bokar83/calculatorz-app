import { CalculatorConfig, Currency } from '../types'

export const dateDifference: CalculatorConfig = {
  slug: 'date-difference',
  title: 'Date Difference Calculator',
  category: 'finance',
  description: 'Calculate the number of days, weeks, months, and years between two dates.',
  updatedDate: 'April 2026',
  inputs: [
    {
      id: 'startYear',
      label: 'Start Year',
      type: 'number',
      defaultValue: 2020,
      min: 1900,
      max: 2100,
      step: 1,
    },
    {
      id: 'startMonth',
      label: 'Start Month (1-12)',
      type: 'number',
      defaultValue: 1,
      min: 1,
      max: 12,
      step: 1,
    },
    {
      id: 'startDay',
      label: 'Start Day',
      type: 'number',
      defaultValue: 1,
      min: 1,
      max: 31,
      step: 1,
    },
    {
      id: 'endYear',
      label: 'End Year',
      type: 'number',
      defaultValue: 2026,
      min: 1900,
      max: 2100,
      step: 1,
    },
    {
      id: 'endMonth',
      label: 'End Month (1-12)',
      type: 'number',
      defaultValue: 4,
      min: 1,
      max: 12,
      step: 1,
    },
    {
      id: 'endDay',
      label: 'End Day',
      type: 'number',
      defaultValue: 16,
      min: 1,
      max: 31,
      step: 1,
    },
  ],
  calculate: (_inputs: Record<string, number | string>, _currency: Currency) => {
    const sy = Number(_inputs.startYear)
    const sm = Number(_inputs.startMonth)
    const sd = Number(_inputs.startDay)
    const ey = Number(_inputs.endYear)
    const em = Number(_inputs.endMonth)
    const ed = Number(_inputs.endDay)

    if (!sy || !sm || !sd || !ey || !em || !ed) {
      return {
        values: [{ label: 'Days', value: 'N/A' }],
        summary: 'Enter valid start and end dates.',
      }
    }

    const start = new Date(sy, sm - 1, sd)
    const end = new Date(ey, em - 1, ed)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return {
        values: [{ label: 'Days', value: 'Invalid date' }],
        summary: 'One or both dates are invalid.',
      }
    }

    const earlier = start <= end ? start : end
    const later = start <= end ? end : start
    const direction = start <= end ? '' : ' (reversed)'

    const diffMs = later.getTime() - earlier.getTime()
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)

    let years = later.getFullYear() - earlier.getFullYear()
    let months = later.getMonth() - earlier.getMonth()
    let days = later.getDate() - earlier.getDate()

    if (days < 0) {
      months -= 1
      const prevMonth = new Date(later.getFullYear(), later.getMonth(), 0)
      days += prevMonth.getDate()
    }
    if (months < 0) {
      years -= 1
      months += 12
    }

    const totalMonths = years * 12 + months

    // Business days (Mon-Fri only)
    let businessDays = 0
    const cursor = new Date(earlier)
    while (cursor < later) {
      const dow = cursor.getDay()
      if (dow !== 0 && dow !== 6) businessDays++
      cursor.setDate(cursor.getDate() + 1)
    }

    return {
      values: [
        { label: 'Total Days', value: totalDays.toLocaleString() + direction, primary: true },
        { label: 'Business Days', value: businessDays.toLocaleString() },
        { label: 'Weeks', value: totalWeeks.toLocaleString() },
        { label: 'Months / Years', value: `${totalMonths} months (${years} yr, ${months} mo, ${days} d)` },
      ],
      summary: `${totalDays.toLocaleString()} total days (${businessDays.toLocaleString()} business days) — ${years} years, ${months} months, ${days} days${direction}.`,
    }
  },
  resultLabels: ['Total Days', 'Business Days', 'Weeks', 'Months / Years'],
  formula: 'Days = (End Date - Start Date) / 86,400,000 ms  |  Business Days = Count of Mon-Fri between dates',
  geo: {
    definition: 'A date difference calculator computes the exact number of days, weeks, months, and years between two calendar dates, and optionally counts only business days (Monday through Friday).',
    ruleOfThumb: 'A standard year has 365 days, 52 weeks, and approximately 261 business days. A month averages 30.44 days. Use business days for deadline calculations in work or legal contexts.',
    example: 'From January 1, 2020 to April 16, 2026 is 2,297 days, 328 weeks, or approximately 75 months and 15 days.',
    keyFacts: [
      'Leap years (every 4 years) add an extra day in February, affecting multi-year calculations.',
      'The US legal system often counts calendar days for deadlines unless statutes specify business days.',
      'A 30-day notice period from April 1 expires May 1 — not May 31.',
    ],
  },
  content: {
    howTo: [
      'Enter the start year, month (1-12), and day.',
      'Enter the end year, month, and day.',
      'Click Calculate to see the difference in days, weeks, months, and years.',
      'Business days excludes Saturdays and Sundays (no holiday adjustment).',
    ],
    refTable: {
      headers: ['Period', 'Calendar Days', 'Business Days (approx)', 'Weeks (approx)'],
      rows: [
        ['1 month', '30-31', '21-23', '4.3'],
        ['3 months', '90-92', '65', '13'],
        ['6 months', '181-184', '130', '26'],
        ['1 year', '365-366', '261', '52'],
        ['2 years', '730-731', '522', '104'],
        ['5 years', '1,826-1,827', '1,304', '261'],
        ['10 years', '3,652-3,653', '2,609', '522'],
      ],
    },
    faqs: [
      {
        q: 'How do I calculate the number of days between two dates?',
        a: 'Subtract the earlier date from the later date in milliseconds, then divide by 86,400,000 (the number of milliseconds in a day). This calculator does that automatically.',
      },
      {
        q: 'How do I count business days between dates?',
        a: 'Iterate through each calendar day between the two dates and count only Monday through Friday. This calculator counts business days but does not adjust for public holidays.',
      },
      {
        q: 'Does this calculator account for leap years?',
        a: 'Yes. The calculation uses JavaScript date objects which correctly handle leap years. February 29 is included when present.',
      },
      {
        q: 'What is the difference between calendar days and business days?',
        a: 'Calendar days count every day including weekends. Business days count only Monday through Friday, which is typically 5 out of every 7 days.',
      },
    ],
    related: ['age-calculator', 'percentage', 'savings-goal', 'due-date', 'retirement-savings'],
  },
  jsonLd: {
    faqs: [
      { q: 'How do I calculate the number of days between two dates?', a: 'Subtract the earlier date from the later in milliseconds and divide by 86,400,000 (ms per day).' },
      { q: 'How do I count business days between dates?', a: 'Count only Monday through Friday in the date range. This calculator does it automatically.' },
      { q: 'Does this calculator account for leap years?', a: 'Yes, it uses standard date math which correctly handles February 29 in leap years.' },
      { q: 'What is the difference between calendar days and business days?', a: 'Calendar days count every day. Business days count only Monday through Friday.' },
    ],
    howToSteps: [
      'Enter the start year, month, and day.',
      'Enter the end year, month, and day.',
      'Click Calculate to see the difference in days, weeks, months, and years.',
    ],
  },
}
