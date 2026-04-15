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
    ],
    related: ['bmi', 'bmr-calories', 'water-intake', 'heart-rate-zones', 'calorie-deficit', 'due-date'],
  },
  jsonLd: {
    faqs: [
      { q: 'How long is one sleep cycle?', a: 'About 90 minutes.' },
      { q: 'How many cycles do I need?', a: '5-6 cycles (7.5-9 hours) per night.' },
      { q: 'Why wake between cycles?', a: 'Waking mid-cycle causes grogginess.' },
      { q: 'How does sleep affect health?', a: 'Poor sleep links to weight gain and disease risk.' },
    ],
    howToSteps: ['Select mode.', 'Enter your time.', 'Click Calculate.'],
  },
}
