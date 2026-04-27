import { CalculatorConfig } from '../types'

export const heartRateZones: CalculatorConfig = {
  slug: 'heart-rate-zones',
  title: 'Heart Rate Zone Calculator',
  category: 'health',
  description: 'Calculate your 5 target heart rate zones for optimal training.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'age', label: 'Age (years)', type: 'number', defaultValue: 35, min: 10, max: 100, step: 1 },
    { id: 'restingHR', label: 'Resting Heart Rate (bpm)', type: 'number', defaultValue: 65, min: 30, max: 120, step: 1 },
  ],
  calculate: (inputs) => {
    const age = Number(inputs.age)
    const resting = Number(inputs.restingHR)
    const maxHR = 220 - age
    const hrReserve = maxHR - resting

    const zones = [
      { name: 'Z1 Warm-Up', low: 0.50, high: 0.60, desc: 'Fat burn, recovery' },
      { name: 'Z2 Fat Burn', low: 0.60, high: 0.70, desc: 'Aerobic base' },
      { name: 'Z3 Aerobic', low: 0.70, high: 0.80, desc: 'Cardio fitness' },
      { name: 'Z4 Threshold', low: 0.80, high: 0.90, desc: 'Speed endurance' },
      { name: 'Z5 Max', low: 0.90, high: 1.00, desc: 'Peak performance' },
    ]

    const karvonen = (pct: number) => Math.round(resting + hrReserve * pct)

    return {
      values: [
        { label: 'Max Heart Rate', value: maxHR + ' bpm', primary: true },
        { label: 'Z1 (50-60%)', value: karvonen(0.50) + '-' + karvonen(0.60) + ' bpm' },
        { label: 'Z2 Fat Burn (60-70%)', value: karvonen(0.60) + '-' + karvonen(0.70) + ' bpm' },
        { label: 'Z3 Aerobic (70-80%)', value: karvonen(0.70) + '-' + karvonen(0.80) + ' bpm' },
        { label: 'Z4 Threshold (80-90%)', value: karvonen(0.80) + '-' + karvonen(0.90) + ' bpm' },
        { label: 'Z5 Max (90-100%)', value: karvonen(0.90) + '-' + maxHR + ' bpm' },
      ],
      summary: 'Max HR: ' + maxHR + ' bpm. Karvonen zones using resting HR ' + resting + ' bpm. Z2 fat burn: ' + karvonen(0.60) + '-' + karvonen(0.70) + ' bpm.',
    }
  },
  resultLabels: ['Max Heart Rate', 'Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'],
  formula: 'Max HR = 220 - Age | Karvonen Zone = Resting HR + (Max HR - Resting HR) x Zone %',
  content: {
    howTo: ['Enter your age.', 'Enter your resting heart rate (measure in the morning before getting up).', 'Click Calculate to see all 5 zones.'],
    faqs: [
      { q: 'What are heart rate zones?', a: 'Zones 1-5 represent intensity levels from light activity to maximum effort.' },
      { q: 'What zone burns the most fat?', a: 'Zone 2 (60-70% max HR) is often called the fat-burning zone.' },
      { q: 'How do I find my max heart rate?', a: 'A common estimate is 220 minus your age.' },
      { q: 'Is resting heart rate important?', a: 'Lower resting heart rate generally indicates better cardiovascular fitness.' },
    ],
    related: ['bmr-calories', 'bmi', 'calorie-deficit', 'body-fat', 'water-intake', 'sleep-calculator'],
  },
  geo: {
    definition: 'A heart rate zone calculator divides exercise intensity into five zones based on percentage of maximum heart rate (MHR), where MHR is typically estimated as 220 minus age, to guide aerobic training, fat burning, and cardiovascular conditioning.',
    ruleOfThumb: 'Zone 2 training (60 to 70% max HR, conversational pace) is the most researched zone for building aerobic base and burning fat as fuel. Most recreational athletes should spend 70 to 80% of training time in Zone 2.',
    example: 'A 40-year-old with estimated max HR of 180 bpm (220 minus 40). Zone 2 = 108 to 126 bpm. Zone 4 (threshold training) = 144 to 162 bpm. A Zone 2 run means holding a pace where full sentences are easy to speak.',
    keyFacts: [
      'The AHA recommends adults target 150 minutes per week of moderate-intensity aerobic activity (approximately Zone 2 to Zone 3) or 75 minutes of vigorous activity (Zone 4 to Zone 5) (American Heart Association, 2023).',
      'Regular aerobic exercise in Zones 2 to 3 reduces resting heart rate by 5 to 10 bpm on average and improves cardiovascular efficiency (AHA, Exercise and Heart Health).',
      'The 220-minus-age formula has a standard deviation of plus or minus 10 to 12 bpm, meaning actual max HR can vary significantly from the estimate (Robergs and Landwehr, Journal of Exercise Physiology, 2002).',
      'A resting heart rate below 60 bpm is associated with improved cardiovascular fitness and lower risk of cardiac events; trained endurance athletes often have resting HR of 40 to 50 bpm (AHA, Know Your Target Heart Rates).',
    ],
  },
  educational: {
    explainer: 'Heart rate training zones divide exercise intensity into five bands, each producing distinct physiological adaptations. Zone 1 (50 to 60% max HR) supports active recovery and light fat oxidation. Zone 2 (60 to 70%) is the aerobic base zone, where the body primarily burns fat as fuel and builds mitochondrial density, the foundation of endurance performance. Zone 3 (70 to 80%) improves aerobic capacity and is the zone most people default to during moderate runs or bike rides. Zone 4 (80 to 90%) is lactate threshold training, improving the pace you can sustain before lactic acid accumulates. Zone 5 (90 to 100%) develops peak power and speed but is sustainable for only minutes at a time. Research by exercise physiologist Iñigo San Millán and others has shown that elite endurance athletes spend the majority of their training in Zone 2, with only a small fraction in Zones 4 and 5, a pattern called polarized training. Resting heart rate is a key fitness marker: as cardiovascular efficiency improves, the heart pumps more blood per beat, needing fewer beats per minute at rest.',
    tips: [
      'Measure resting heart rate first thing in the morning before getting out of bed, averaged over three days, for the most accurate baseline to use in Karvonen zone calculations.',
      'Use perceived exertion (the talk test) alongside your heart rate monitor: Zone 2 should feel conversational, Zone 4 should allow only short phrases, and Zone 5 should make speech impossible.',
      'Adjust target zones upward by 5 to 10 bpm in hot or humid conditions and downward by a similar margin at altitude above 8,000 feet, because heart rate rises with environmental stress independent of effort.',
      'Match zone training to your goal: prioritize Zone 2 for fat loss and base building, Zone 4 for race pace improvements, and limit Zone 5 to one hard session per week to prevent overtraining.',
    ],
    commonMistakes: [
      'Training too hard too often by staying in Zone 4 to 5 most sessions, which prevents full recovery, raises cortisol chronically, and paradoxically slows aerobic development over time.',
      'Accepting 220-minus-age as exact without verification: the formula has a standard deviation of plus or minus 10 to 12 bpm, so a maximal effort field test (a hard 3-mile run or similar) gives a more accurate MHR.',
      'Ignoring resting heart rate trends over time: a rising resting HR over several days signals overtraining or illness and is an early warning to reduce intensity before performance drops.',
    ],
    example: 'James is 35, giving an estimated max HR of 185 bpm (220 minus 35). His resting HR is 58 bpm. Using the Karvonen formula (resting + reserve x zone %): Zone 1 = 121 to 134 bpm; Zone 2 = 134 to 148 bpm; Zone 3 = 148 to 161 bpm; Zone 4 = 161 to 175 bpm; Zone 5 = 175 to 185 bpm. For half-marathon training, his long runs should stay in Zone 2 (134 to 148 bpm), and his weekly tempo run should target Zone 4 (161 to 175 bpm) for 20 to 30 minutes.',
  },
  jsonLd: {
    faqs: [
      { q: 'What are heart rate zones?', a: 'Zones 1-5 represent intensity from light to maximum effort.' },
      { q: 'Which zone burns the most fat?', a: 'Zone 2 (60-70% max HR) is the fat-burning zone.' },
      { q: 'How to find max heart rate?', a: '220 minus your age is a common estimate.' },
      { q: 'Is resting HR important?', a: 'Lower resting HR indicates better cardiovascular fitness.' },
    ],
    howToSteps: ['Enter age.', 'Enter resting heart rate.', 'Click Calculate.'],
  },
}
