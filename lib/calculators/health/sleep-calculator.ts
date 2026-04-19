import { CalculatorConfig } from '../types'

export const sleepCalculator: CalculatorConfig = {
  slug: 'sleep-calculator',
  title: 'Sleep Calculator',
  category: 'health',
  description: 'Calculate the best bedtime or wake time based on 90-minute sleep cycles.',
  updatedDate: 'April 2026',
  tabs: [
    { id: 'wake_time', label: 'I want to wake up at...' },
    { id: 'bedtime', label: 'I am going to bed at...' },
  ],
  inputs: [
    {
      id: 'hour', label: 'Hour', type: 'select',
      options: [
        { value: '12', label: '12' }, { value: '1', label: '1' }, { value: '2', label: '2' },
        { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' },
        { value: '6', label: '6' }, { value: '7', label: '7' }, { value: '8', label: '8' },
        { value: '9', label: '9' }, { value: '10', label: '10' }, { value: '11', label: '11' },
      ],
    },
    {
      id: 'minute', label: 'Minute', type: 'select',
      options: [{ value: '0', label: ':00' }, { value: '15', label: ':15' }, { value: '30', label: ':30' }, { value: '45', label: ':45' }],
    },
    {
      id: 'ampm', label: 'AM / PM', type: 'select',
      options: [{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }],
    },
  ],
  calculate: (inputs, _c, _u, activeTab) => {
    const hour = Number(inputs.hour)
    const minute = Number(inputs.minute)
    const ampm = inputs.ampm as string || 'AM'
    const tab = activeTab || 'wake_time'

    let hours24 = ampm === 'PM' && hour !== 12 ? hour + 12 : (ampm === 'AM' && hour === 12 ? 0 : hour)
    const totalMinutes = hours24 * 60 + minute

    const FALL_ASLEEP = 15
    const CYCLE = 90

    const formatTime = (mins: number) => {
      const m = ((mins % 1440) + 1440) % 1440
      const h = Math.floor(m / 60)
      const min = m % 60
      const suffix = h < 12 ? 'AM' : 'PM'
      const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h
      return displayH + ':' + (min < 10 ? '0' : '') + min + ' ' + suffix
    }

    const cycles = [6, 5, 4, 3]

    if (tab === 'wake_time') {
      const times = cycles.map(c => {
        const bedtime = totalMinutes - FALL_ASLEEP - (c * CYCLE)
        return { cycles: c, time: formatTime(bedtime) }
      })
      return {
        values: [
          { label: 'For 6 cycles (9h sleep)', value: times[0].time, primary: true },
          { label: 'For 5 cycles (7.5h sleep)', value: times[1].time },
          { label: 'For 4 cycles (6h sleep)', value: times[2].time },
          { label: 'For 3 cycles (4.5h sleep)', value: times[3].time },
        ],
        summary: 'To wake at ' + formatTime(totalMinutes) + ' feeling refreshed: go to bed at ' + times[0].time + ' (6 cycles) or ' + times[1].time + ' (5 cycles).',
      }
    } else {
      const times = cycles.map(c => {
        const wakeTime = totalMinutes + FALL_ASLEEP + (c * CYCLE)
        return { cycles: c, time: formatTime(wakeTime) }
      })
      return {
        values: [
          { label: 'Wake after 6 cycles (9h)', value: times[0].time, primary: true },
          { label: 'Wake after 5 cycles (7.5h)', value: times[1].time },
          { label: 'Wake after 4 cycles (6h)', value: times[2].time },
          { label: 'Wake after 3 cycles (4.5h)', value: times[3].time },
        ],
        summary: 'Going to bed at ' + formatTime(totalMinutes) + ': optimal wake times at ' + times[0].time + ' (9h) or ' + times[1].time + ' (7.5h).',
      }
    }
  },
  resultLabels: ['6 Cycles', '5 Cycles', '4 Cycles', '3 Cycles'],
  formula: 'Bedtime = Wake Time - (90 min x Sleep Cycles) - 15 min fall-asleep time',
  content: {
    howTo: ['Select whether you want to know bedtime or wake time.', 'Enter your target time.', 'Click Calculate for optimal sleep times.'],
    faqs: [
      { q: 'How long is one sleep cycle?', a: 'A typical sleep cycle is about 90 minutes.' },
      { q: 'How many sleep cycles do I need?', a: 'Most adults need 5-6 cycles (7.5-9 hours) per night.' },
      { q: 'Why should I wake between cycles?', a: 'Waking mid-cycle causes grogginess; waking between cycles feels more natural.' },
      { q: 'How does sleep affect health?', a: 'Poor sleep is linked to weight gain, impaired cognition, and increased disease risk.' },
      { q: 'How many hours of sleep do adults need?', a: 'The CDC and American Academy of Sleep Medicine recommend 7-9 hours per night for adults aged 18-60. Adults 61+ may need 7-8 hours. Consistently sleeping less than 7 hours is associated with increased health risks.' },
      { q: 'What is a sleep cycle?', a: 'A sleep cycle lasts approximately 90 minutes and includes light sleep, deep sleep (slow-wave), and REM (rapid eye movement) sleep. Most people complete 4-6 cycles per night. Waking between cycles feels more natural than waking mid-cycle.' },
      { q: 'Is it better to sleep less or wake mid-cycle?', a: 'Waking between cycles (at 90-minute intervals) generally feels less groggy than waking mid-deep-sleep. If you must sleep fewer hours, align your wake time to a 90-minute interval boundary for the best outcome.' },
      { q: 'What happens if I consistently get less than 7 hours?', a: 'Chronic sleep deprivation is associated with increased risk of obesity, cardiovascular disease, diabetes, impaired immune function, and cognitive decline. The CDC classifies insufficient sleep as a public health problem.' },
    ],
    related: ['bmi', 'bmr-calories', 'water-intake', 'heart-rate-zones', 'calorie-deficit', 'due-date'],
  },
  jsonLd: {
    faqs: [
      { q: 'How long is one sleep cycle?', a: 'About 90 minutes.' },
      { q: 'How many cycles do I need?', a: '5-6 cycles (7.5-9 hours) per night.' },
      { q: 'Why wake between cycles?', a: 'Waking mid-cycle causes grogginess.' },
      { q: 'How does sleep affect health?', a: 'Poor sleep links to weight gain and disease risk.' },
      { q: 'How many hours of sleep do adults need?', a: 'The CDC and American Academy of Sleep Medicine recommend 7-9 hours per night for adults aged 18-60. Adults 61+ may need 7-8 hours. Consistently sleeping less than 7 hours is associated with increased health risks.' },
      { q: 'What is a sleep cycle?', a: 'A sleep cycle lasts approximately 90 minutes and includes light sleep, deep sleep (slow-wave), and REM (rapid eye movement) sleep. Most people complete 4-6 cycles per night. Waking between cycles feels more natural than waking mid-cycle.' },
      { q: 'Is it better to sleep less or wake mid-cycle?', a: 'Waking between cycles (at 90-minute intervals) generally feels less groggy than waking mid-deep-sleep. If you must sleep fewer hours, align your wake time to a 90-minute interval boundary for the best outcome.' },
      { q: 'What happens if I consistently get less than 7 hours?', a: 'Chronic sleep deprivation is associated with increased risk of obesity, cardiovascular disease, diabetes, impaired immune function, and cognitive decline. The CDC classifies insufficient sleep as a public health problem.' },
    ],
    howToSteps: ['Select mode.', 'Enter your time.', 'Click Calculate.'],
  },
  geo: {
    definition: 'A sleep calculator determines optimal bedtimes and wake times based on 90-minute sleep cycles. The goal is to align wake time with the end of a cycle rather than mid-cycle, reducing sleep inertia (the grogginess felt when woken during deep sleep).',
    ruleOfThumb: 'Adults need 7-9 hours of sleep, which equals 5-6 complete 90-minute sleep cycles. Add 15 minutes to fall asleep when calculating bedtime. To wake at 6:30 AM: count back 6 cycles (9 hours) + 15 min = bedtime of 9:15 PM, or 5 cycles (7.5 hours) + 15 min = 10:45 PM.',
    example: 'Need to wake at 7:00 AM. Preferred cycles: 6 (9 hours sleep). Bedtime = 7:00 AM - 9 hours - 15 min (to fall asleep) = 9:45 PM. Backup option: 5 cycles = bedtime 11:15 PM for 7.5 hours.',
    keyFacts: [
      'Adults aged 18-60 need at least 7 hours of sleep per night for optimal health. (Source: CDC / American Academy of Sleep Medicine)',
      'A single sleep cycle lasts approximately 90 minutes, cycling through N1, N2, N3 (deep sleep), and REM phases. (Source: National Sleep Foundation)',
      'Approximately 1 in 3 US adults regularly gets less than 7 hours of sleep. (Source: CDC Morbidity and Mortality Weekly Report)',
      'Sleeping less than 6 hours per night is associated with a 4.2x higher risk of catching the common cold compared to sleeping 7+ hours. (Source: Carnegie Mellon University sleep research, published in Sleep journal)',
    ],
  },
  educational: {
    explainer: `Sleep is not a single continuous state — it is a series of repeating cycles, each lasting about 90 minutes. Each cycle moves through lighter sleep stages into deep slow-wave sleep and then into REM sleep, where most dreaming and memory consolidation occurs. When an alarm interrupts a deep sleep phase, you feel groggy and disoriented — a state called sleep inertia. The goal of cycle-aware sleep planning is to time your wake moment to the natural end of a cycle, when you are already in lighter sleep. This is why some people feel more rested after 7.5 hours than after 8.5 hours — the shorter duration aligned with cycle boundaries. The optimal number of cycles for most adults is 5-6, translating to 7.5-9 hours. Anything below 4 cycles (6 hours) begins to accumulate sleep debt with measurable cognitive and health consequences.`,
    tips: [
      'Add 15 minutes to your target sleep duration to account for time to fall asleep. Most adults take 10-20 minutes to reach sleep onset.',
      'Consistency matters more than total hours. Going to bed and waking at the same time daily — including weekends — stabilizes your circadian rhythm and improves sleep quality within 2 weeks.',
      'Avoid screens 60 minutes before bed. Blue light from phones and laptops suppresses melatonin production and delays sleep onset by up to 90 minutes.',
      'If you cannot get 7+ hours on weekdays, a 20-30 minute nap before 3 PM can partially restore alertness without disrupting nighttime sleep.',
    ],
    commonMistakes: [
      'Sleeping in on weekends to "catch up." Social jet lag — shifting your sleep schedule by 2+ hours on weekends — disrupts your circadian rhythm and makes Monday mornings harder, not easier.',
      'Setting multiple alarms. Snoozing fragments sleep and forces you to re-enter sleep mid-cycle, increasing sleep inertia. A single alarm at a cycle-boundary time is more effective.',
      'Assuming more is always better. Sleeping more than 9 hours regularly can signal an underlying health issue and is associated with poorer outcomes in the same studies that penalize short sleepers.',
    ],
    example: 'James needs to wake at 6:15 AM for work. He typically falls asleep in about 15 minutes. Using 90-minute cycles: 6 cycles back = 9 hours + 15 min = bedtime 9:00 PM; 5 cycles = 7.5 hours + 15 min = 10:30 PM. He chooses 10:30 PM as realistic. On nights he cannot make that, 12:00 AM (4 cycles = 6 hours) is his minimum — below that, he uses caffeine strategically and avoids high-stakes cognitive work before noon.',
  },
}
