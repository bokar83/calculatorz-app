import { CalculatorConfig, Currency } from '../types'

export const gpaCalculator: CalculatorConfig = {
  slug: 'gpa-calculator',
  title: 'GPA Calculator',
  category: 'finance',
  description: 'Calculate your GPA by entering your course grades and credit hours. Supports letter grades and 4.0 scale.',
  updatedDate: 'April 2026',
  inputs: [
    {
      id: 'grade1',
      label: 'Course 1 Grade (0-4.0)',
      type: 'number',
      defaultValue: 3.7,
      min: 0,
      max: 4.0,
      step: 0.1,
    },
    {
      id: 'credits1',
      label: 'Course 1 Credits',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 6,
      step: 1,
    },
    {
      id: 'grade2',
      label: 'Course 2 Grade (0-4.0)',
      type: 'number',
      defaultValue: 3.3,
      min: 0,
      max: 4.0,
      step: 0.1,
    },
    {
      id: 'credits2',
      label: 'Course 2 Credits',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 6,
      step: 1,
    },
    {
      id: 'grade3',
      label: 'Course 3 Grade (0-4.0)',
      type: 'number',
      defaultValue: 4.0,
      min: 0,
      max: 4.0,
      step: 0.1,
    },
    {
      id: 'credits3',
      label: 'Course 3 Credits',
      type: 'number',
      defaultValue: 4,
      min: 1,
      max: 6,
      step: 1,
    },
    {
      id: 'grade4',
      label: 'Course 4 Grade (0-4.0)',
      type: 'number',
      defaultValue: 2.7,
      min: 0,
      max: 4.0,
      step: 0.1,
    },
    {
      id: 'credits4',
      label: 'Course 4 Credits',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 6,
      step: 1,
    },
  ],
  calculate: (_inputs: Record<string, number | string>, _currency: Currency) => {
    const courses = [
      { grade: Number(_inputs.grade1), credits: Number(_inputs.credits1) },
      { grade: Number(_inputs.grade2), credits: Number(_inputs.credits2) },
      { grade: Number(_inputs.grade3), credits: Number(_inputs.credits3) },
      { grade: Number(_inputs.grade4), credits: Number(_inputs.credits4) },
    ].filter(c => c.credits > 0 && c.grade >= 0 && c.grade <= 4.0)

    if (courses.length === 0) {
      return {
        values: [{ label: 'GPA', value: 'N/A' }],
        summary: 'Enter at least one course with valid grade and credits.',
      }
    }

    const totalPoints = courses.reduce((sum, c) => sum + c.grade * c.credits, 0)
    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0)
    const gpa = totalPoints / totalCredits

    const letterGrade = gpa >= 3.7 ? 'A' : gpa >= 3.3 ? 'A-' : gpa >= 3.0 ? 'B+' : gpa >= 2.7 ? 'B' : gpa >= 2.3 ? 'B-' : gpa >= 2.0 ? 'C+' : gpa >= 1.7 ? 'C' : gpa >= 1.3 ? 'C-' : gpa >= 1.0 ? 'D' : 'F'

    const standing = gpa >= 3.5 ? "Dean's List" : gpa >= 3.0 ? 'Good Standing' : gpa >= 2.0 ? 'Satisfactory' : 'Academic Probation Risk'

    return {
      values: [
        { label: 'GPA', value: gpa.toFixed(2), primary: true },
        { label: 'Letter Grade', value: letterGrade },
        { label: 'Total Credits', value: totalCredits.toString() },
        { label: 'Academic Standing', value: standing },
      ],
      summary: `Your GPA is ${gpa.toFixed(2)} (${letterGrade}) across ${totalCredits} credit hours — ${standing}.`,
    }
  },
  resultLabels: ['GPA', 'Letter Grade', 'Total Credits', 'Academic Standing'],
  formula: 'GPA = Sum(Grade Points x Credits) / Sum(Credits)  |  Grade Points: A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0',
  geo: {
    definition: 'GPA (Grade Point Average) is a numerical summary of a student\'s academic performance calculated by dividing the total grade points earned by the total credit hours attempted.',
    ruleOfThumb: 'Most US universities use a 4.0 scale where A=4.0, B=3.0, C=2.0, D=1.0, F=0. A GPA of 3.5 or higher is typically required for Dean\'s List recognition. Graduate school admissions generally require a minimum GPA of 3.0.',
    example: 'A student who earns an A (4.0) in a 3-credit course and a B (3.0) in a 4-credit course has a GPA of (4.0x3 + 3.0x4) / (3+4) = 24/7 = 3.43.',
    keyFacts: [
      'A cumulative GPA of 3.0 or higher is typically required to maintain academic good standing.',
      'Many graduate programs, scholarships, and honor societies require a minimum 3.5 GPA.',
      'One failed course (F = 0.0) in a standard semester can drop a 3.5 GPA by roughly 0.3-0.5 points.',
    ],
  },
  content: {
    howTo: [
      'Enter your grade on the 4.0 scale for each course (A=4.0, B=3.0, C=2.0, D=1.0, F=0).',
      'Enter the number of credit hours for each course.',
      'Click Calculate to see your weighted GPA.',
      'Use letter grade equivalents below if your school reports letter grades.',
    ],
    refTable: {
      headers: ['Letter Grade', 'Grade Points', 'Percentage Range', 'Description'],
      rows: [
        ['A', '4.0', '93-100%', 'Excellent'],
        ['A-', '3.7', '90-92%', 'Near Excellent'],
        ['B+', '3.3', '87-89%', 'Above Average'],
        ['B', '3.0', '83-86%', 'Good'],
        ['B-', '2.7', '80-82%', 'Above Satisfactory'],
        ['C+', '2.3', '77-79%', 'Slightly Above Average'],
        ['C', '2.0', '73-76%', 'Average / Satisfactory'],
        ['D', '1.0', '60-69%', 'Passing (Barely)'],
        ['F', '0.0', 'Below 60%', 'Failing'],
      ],
    },
    faqs: [
      {
        q: 'How is GPA calculated?',
        a: 'Multiply each course grade (on the 4.0 scale) by the number of credit hours. Add all those products together. Divide by the total number of credit hours. The result is your weighted GPA.',
      },
      {
        q: 'What is a good GPA?',
        a: 'A GPA of 3.5 or above is generally considered excellent and qualifies for Dean\'s List at most universities. A GPA of 3.0+ is good standing. Below 2.0 puts students at risk of academic probation.',
      },
      {
        q: 'What is the difference between GPA and CGPA?',
        a: 'GPA is calculated for a single semester or term. CGPA (Cumulative GPA) is your overall GPA across all semesters combined. Graduate school applications look at CGPA.',
      },
      {
        q: 'Can I raise my GPA significantly in one semester?',
        a: 'The more credits you have already earned, the harder it is to move your cumulative GPA significantly. A student with 120 credits who earns a 4.0 one semester will see a much smaller GPA change than a student with 30 credits.',
      },
    ],
    related: ['percentage', 'income-tax', 'hourly-to-salary', 'student-loan', 'savings-goal'],
  },
  jsonLd: {
    faqs: [
      { q: 'How is GPA calculated?', a: 'Multiply each course grade by its credit hours, sum all grade points, then divide by total credit hours.' },
      { q: 'What is a good GPA?', a: 'A GPA of 3.5+ is excellent (Dean\'s List). 3.0+ is good standing. Below 2.0 risks academic probation.' },
      { q: 'What is the difference between GPA and CGPA?', a: 'GPA is for a single term; CGPA is the cumulative average across all terms.' },
      { q: 'Can I raise my GPA in one semester?', a: 'Yes, but the impact decreases as total credits increase. Earlier in your degree, one strong semester has more effect.' },
    ],
    howToSteps: [
      'Enter your grade (0-4.0 scale) for each course.',
      'Enter the number of credit hours for each course.',
      'Click Calculate to see your weighted GPA and letter grade equivalent.',
    ],
  },
}
