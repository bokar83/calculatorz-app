import { CalculatorConfig, Currency } from '../types'

export const ageCalculator: CalculatorConfig = {
  slug: 'age-calculator',
  title: 'Age Calculator',
  category: 'finance',
  description: 'Calculate your exact age in years, months, weeks, and days from your date of birth.',
  updatedDate: 'April 2026',
  inputs: [
    {
      id: 'birthYear',
      label: 'Birth Year',
      type: 'number',
      defaultValue: 1990,
      min: 1900,
      max: 2025,
      step: 1,
    },
    {
      id: 'birthMonth',
      label: 'Birth Month (1-12)',
      type: 'number',
      defaultValue: 1,
      min: 1,
      max: 12,
      step: 1,
    },
    {
      id: 'birthDay',
      label: 'Birth Day',
      type: 'number',
      defaultValue: 1,
      min: 1,
      max: 31,
      step: 1,
    },
  ],
  calculate: (_inputs: Record<string, number | string>, _currency: Currency) => {
    const year = Number(_inputs.birthYear)
    const month = Number(_inputs.birthMonth)
    const day = Number(_inputs.birthDay)

    if (!year || !month || !day || month < 1 || month > 12 || day < 1 || day > 31) {
      return {
        values: [
          { label: 'Age', value: 'N/A' },
          { label: 'Months', value: 'N/A' },
          { label: 'Weeks', value: 'N/A' },
          { label: 'Days', value: 'N/A' },
        ],
        summary: 'Enter a valid date of birth.',
      }
    }

    const today = new Date()
    const birth = new Date(year, month - 1, day)

    if (birth > today) {
      return {
        values: [
          { label: 'Age', value: 'Future date' },
          { label: 'Months', value: '—' },
          { label: 'Weeks', value: '—' },
          { label: 'Days', value: '—' },
        ],
        summary: 'Date of birth cannot be in the future.',
      }
    }

    const diffMs = today.getTime() - birth.getTime()
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)

    // Exact years/months
    let ageYears = today.getFullYear() - birth.getFullYear()
    let ageMonths = today.getMonth() - birth.getMonth()
    let ageDays = today.getDate() - birth.getDate()

    if (ageDays < 0) {
      ageMonths -= 1
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      ageDays += prevMonth.getDate()
    }
    if (ageMonths < 0) {
      ageYears -= 1
      ageMonths += 12
    }

    const totalMonths = ageYears * 12 + ageMonths

    const nextBirthday = new Date(today.getFullYear(), month - 1, day)
    if (nextBirthday <= today) {
      nextBirthday.setFullYear(today.getFullYear() + 1)
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    return {
      values: [
        { label: 'Age', value: `${ageYears} yrs, ${ageMonths} mo` },
        { label: 'Total Months', value: totalMonths.toLocaleString() },
        { label: 'Total Weeks', value: totalWeeks.toLocaleString() },
        { label: 'Total Days', value: totalDays.toLocaleString() },
      ],
      summary: `You are ${ageYears} years and ${ageMonths} months old. Next birthday in ${daysUntilBirthday} days.`,
    }
  },
  resultLabels: ['Age', 'Total Months', 'Total Weeks', 'Total Days'],
  formula: 'Age = Current Date - Date of Birth  |  Total Days = (Current Date - Birth Date) in milliseconds / 86,400,000',
  geo: {
    definition: 'An age calculator determines a person\'s exact age by computing the difference between their date of birth and today\'s date, expressed in years, months, weeks, and days.',
    ruleOfThumb: 'A standard year contains 365 days (366 in a leap year), 52 weeks and 1 day, and 8,760 hours. A person born on January 1, 1990 turns 35 years old on January 1, 2025.',
    example: 'Someone born on March 15, 1990 is exactly 35 years, 1 month, and 0 days old on April 15, 2025 — or 12,815 days, 1,831 weeks, or 421 months.',
    keyFacts: [
      'A leap year occurs every 4 years (divisible by 4), except century years not divisible by 400.',
      'The average human lifespan globally is approximately 73 years, according to the WHO.',
      'Someone turning 18 in the US has lived approximately 6,570 days.',
    ],
  },
  content: {
    howTo: [
      'Enter your birth year, month (1-12), and day.',
      'Click Calculate to see your exact age.',
      'Results show your age in years/months, total months, total weeks, and total days.',
    ],
    refTable: {
      headers: ['Birth Year', 'Age in 2025', 'Total Days (approx)', 'Total Weeks (approx)'],
      rows: [
        ['2000', '25 years', '9,131', '1,304'],
        ['1995', '30 years', '10,957', '1,565'],
        ['1990', '35 years', '12,783', '1,826'],
        ['1985', '40 years', '14,610', '2,087'],
        ['1980', '45 years', '16,436', '2,348'],
        ['1970', '55 years', '20,088', '2,870'],
        ['1960', '65 years', '23,741', '3,391'],
      ],
    },
    faqs: [
      {
        q: 'How do I calculate my exact age?',
        a: 'Subtract your birth date from today\'s date. For years: take the current year minus birth year, then subtract 1 if today is before your birthday this year. The total days is the difference in milliseconds divided by 86,400,000.',
      },
      {
        q: 'How many days old am I?',
        a: 'Multiply your age in years by 365, add days for leap years (roughly 1 per 4 years), then add remaining days since your last birthday. Or simply use this calculator.',
      },
      {
        q: 'What is a leap year?',
        a: 'A leap year has 366 days instead of 365. It occurs every 4 years when the year is divisible by 4 — except for century years, which must be divisible by 400 (so 2000 was a leap year, but 1900 was not).',
      },
      {
        q: 'How many weeks are in a year?',
        a: 'A standard year has 52 weeks and 1 day (52.1775 weeks exactly). A leap year has 52 weeks and 2 days.',
      },
    ],
    related: ['income-tax', 'retirement-savings', 'savings-goal', 'emergency-fund', 'hourly-to-salary', 'compound-interest'],
  },
  jsonLd: {
    faqs: [
      { q: 'How do I calculate my exact age?', a: 'Subtract your birth date from today\'s date. Current year minus birth year, minus 1 if today is before your birthday this year.' },
      { q: 'How many days old am I?', a: 'Multiply age in years by 365, add leap year days, add days since last birthday. Or use this calculator.' },
      { q: 'What is a leap year?', a: 'A year divisible by 4 (except century years not divisible by 400). Leap years have 366 days.' },
      { q: 'How many weeks are in a year?', a: 'A standard year has 52 weeks and 1 day (52.1775 weeks). A leap year has 52 weeks and 2 days.' },
    ],
    howToSteps: [
      'Enter your birth year.',
      'Enter your birth month (1-12).',
      'Enter your birth day.',
      'Click Calculate to see your exact age in years, months, weeks, and days.',
    ],
  },
}
