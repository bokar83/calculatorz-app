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
  geo: {
    definition: 'An ovulation calculator estimates the fertile window by identifying the day of ovulation (typically 14 days before the next expected period) and the five days preceding it, during which conception is most likely, based on average sperm viability and egg survival times.',
    ruleOfThumb: 'In a 28-day cycle, ovulation occurs around day 14. In a 35-day cycle, around day 21. The fertile window spans 5 days before ovulation through the day of ovulation. An egg survives 12 to 24 hours after release; sperm survive up to 5 days.',
    example: 'Cycle length is 32 days. LMP started March 1. Ovulation estimate: March 1 plus 18 days = March 19. Fertile window: March 14 to March 19. Next period expected around April 2 (32 days after March 1).',
    keyFacts: [
      'ACOG states that the fertile window for most women spans the 6 days ending on ovulation day, with pregnancy probability peaking in the 2 days before ovulation (ACOG, Fertility Awareness Methods).',
      'Sperm can survive in the female reproductive tract for up to 5 days under favorable cervical mucus conditions, while an egg survives only 12 to 24 hours after ovulation (ACOG).',
      'Cycle length in healthy women ranges from 21 to 35 days, and ovulation timing varies accordingly; only about 30 percent of women have cycles that fall in the fertile window predicted by a standard 28-day calculation (NIH, National Institute of Child Health and Human Development).',
      'Ovulation calculator tools are aids for family planning, not contraceptive methods; ACOG notes that even with perfect cycle tracking, pregnancy rates with fertility awareness methods are 0.4 to 5 percent per year with typical use.',
    ],
  },
  educational: {
    explainer: 'The menstrual cycle has two main phases separated by ovulation. The follicular phase runs from the first day of menstruation to ovulation, during which follicle-stimulating hormone (FSH) triggers follicle growth and rising estrogen thickens the uterine lining. Ovulation occurs when a luteinizing hormone (LH) surge causes one follicle to release an egg. The luteal phase follows, lasting a consistent 12 to 16 days in most women, regardless of total cycle length. This is why ovulation timing shifts with cycle length: only the follicular phase varies. A woman with a 35-day cycle has a longer follicular phase, pushing ovulation to around day 21. The egg is viable for just 12 to 24 hours, making the 5 days before ovulation, when sperm are already present, the most fertile period. Factors including stress, illness, significant weight changes, thyroid disorders, and polycystic ovarian syndrome (PCOS) can shift or suppress ovulation. This calculator provides estimates based on average cycle patterns; individual variation is substantial.',
    tips: [
      'Track basal body temperature (BBT) each morning before getting up using a digital thermometer; a sustained rise of 0.2 to 0.5 degrees Fahrenheit for 3 consecutive days confirms ovulation has occurred.',
      'Use ovulation predictor kits (OPKs) alongside this calculator to detect the LH surge that occurs 24 to 48 hours before ovulation, providing a forward-looking signal that BBT alone cannot give.',
      'Understand that the luteal phase (ovulation to next period) is fixed at roughly 14 days for most women; it is the follicular phase that determines where ovulation falls in any given cycle.',
      'Note that stress, significant illness, intense exercise, travel across time zones, or sudden weight changes can delay ovulation by several days within a single cycle.',
    ],
    commonMistakes: [
      'Assuming every cycle is exactly 28 days: average cycle length among healthy women ranges from 21 to 35 days, and many women have natural month-to-month variation of 2 to 4 days.',
      'Using an ovulation calculator as a birth control method: the American College of Obstetricians and Gynecologists classifies fertility awareness methods as having a typical-use failure rate of 2 to 23 percent per year, far higher than barrier or hormonal contraception.',
      'Not accounting for the fertile window starting 5 days before ovulation: waiting until the estimated ovulation day to begin timed intercourse misses the highest-probability days, since sperm viability in optimal cervical mucus can reach 3 to 5 days.',
    ],
    example: 'Maria has tracked her last four cycles: 29, 31, 28, and 30 days. Her average is 29.5 days, rounded to 30 for this estimate. Next cycle starts May 1. Estimated ovulation: May 1 plus 16 days (30 minus 14) = May 17. Fertile window: May 12 to May 17. Given her cycle variation of plus or minus 1.5 days, her ovulation could realistically fall anywhere from May 15 to May 19, so the fertile window should be treated as May 10 to May 19 for planning purposes.',
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
