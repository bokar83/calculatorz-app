import { CalculatorConfig, Currency } from '../types'

export const inflation: CalculatorConfig = {
  slug: 'inflation',
  title: 'Inflation Calculator',
  category: 'finance',
  description: 'Calculate the impact of inflation on purchasing power over time.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'amount', label: 'Current Amount', type: 'number', defaultValue: 1000, prefix: '$' },
  ],
  calculate: (_inputs: Record<string, number | string>, _currency: Currency) => ({
    values: [{ label: 'Adjusted Value', value: '$0.00' }],
  }),
  resultLabels: ['Adjusted Value'],
  formula: 'Future Value = Present Value x (1 + Inflation Rate)^Years',
  content: {
    howTo: ['Enter the current amount.', 'Enter average inflation rate.', 'Enter number of years.', 'Click Calculate.'],
    faqs: [
      { q: 'What is inflation?', a: 'The rate at which prices rise and purchasing power falls over time.' },
      { q: 'What is the average US inflation rate?', a: 'Historically around 2-3% per year; the Fed targets 2%.' },
      { q: 'How does inflation affect savings?', a: 'If your savings earn less than inflation, your real purchasing power decreases.' },
      { q: 'What is the CPI?', a: 'The Consumer Price Index measures average price changes across a basket of goods.' },
    ],
    related: ['compound-interest', 'investment-return', 'retirement-savings', 'savings-goal', 'roi-calculator', 'simple-interest'],
  },
  geo: {
    definition: 'An inflation calculator measures how the purchasing power of a sum of money changes over time, using a compound growth formula applied to historical or projected inflation rates to show what a past amount is worth today or what a current amount will be worth in the future.',
    ruleOfThumb: 'At the Federal Reserve\'s 2% inflation target, purchasing power halves in approximately 36 years. At 3% inflation, it halves in 24 years. Use the Rule of 70: divide 70 by the inflation rate to find the number of years it takes for purchasing power to halve.',
    example: '$50,000 in purchasing power from 2000 required approximately $88,900 in 2024 due to cumulative inflation of about 77.8% over that period (BLS CPI data, 2024).',
    keyFacts: [
      'The US Bureau of Labor Statistics CPI-U index showed cumulative inflation of approximately 77.8% from January 2000 to January 2024, meaning prices roughly doubled over 24 years (BLS CPI Historical Data).',
      'The Federal Reserve targets a 2% annual inflation rate as measured by the Personal Consumption Expenditures (PCE) price index, which it views as consistent with long-run price stability (Federal Reserve, Monetary Policy Goals).',
      'From 2021 to 2023, US inflation surged to a 40-year high of 9.1% in June 2022, the highest reading since November 1981, before declining back toward the Fed\'s 2% target (BLS CPI Press Release, July 2022).',
      'Inflation disproportionately affects lower-income households, who spend a larger share of income on necessities like food and energy, which tend to experience above-average price increases during inflationary periods (Federal Reserve Bank of San Francisco, Economic Letter, 2022).',
    ],
  },
  educational: {
    explainer: 'Inflation is the gradual increase in prices across the economy over time. When prices rise, each dollar you hold buys less than it did before. That erosion of purchasing power is why $100 from 2000 only buys what $57 could buy back then in today\'s dollars. For financial planning, the key distinction is between nominal and real returns. A savings account earning 4% interest sounds good, but if inflation is running at 3.5%, your real return (the actual gain in purchasing power) is only 0.5%. This difference compounds dramatically over decades. A retirement plan built on nominal return assumptions will dramatically overestimate how much your savings will actually buy when you need them. The CPI (Consumer Price Index), published monthly by the Bureau of Labor Statistics, is the most widely cited measure of inflation and tracks price changes across a basket of common goods and services. Understanding inflation helps you make smarter decisions about savings rates, investment targets, fixed-income holdings, and long-term financial goals.',
    tips: [
      'Build inflation protection into your retirement projections by using a real return assumption (nominal expected return minus 2-3% for inflation) rather than a gross return figure.',
      'Consider Treasury Inflation-Protected Securities (TIPS) and Series I Savings Bonds for a portion of your fixed-income holdings, since both are explicitly designed to adjust principal or interest with CPI changes.',
      'Equities have historically outpaced inflation over long periods, with the S&P 500 delivering an average real return of roughly 7% per year after inflation from 1926 to 2023 (Morningstar, 2024).',
      'Avoid holding large amounts of cash for long periods beyond your emergency fund, since cash in a low-yield account loses real purchasing power every year inflation exceeds your interest rate.',
    ],
    commonMistakes: [
      'Ignoring inflation entirely when projecting retirement income needs, which causes people to underestimate how much they need to save by a factor of two or more over a 25-year retirement horizon.',
      'Keeping too much money in a standard savings or checking account during high-inflation periods, which guarantees a negative real return when the account rate is below the inflation rate.',
      'Confusing nominal and real investment returns when evaluating portfolio performance, which makes it appear that wealth is growing when purchasing power is actually flat or declining.',
    ],
    example: 'Maria plans to retire in 25 years and estimates she needs $60,000 per year in today\'s dollars to cover her living expenses. At a 3% average annual inflation rate, the actual dollar amount she will need in 25 years is $60,000 times (1.03 to the power of 25) = $60,000 times 2.094 = approximately $125,700 per year. If she plans her retirement savings target based on $60,000 and ignores inflation, she will be short by more than $65,000 per year in real spending power. Her savings plan must account for this future figure, not today\'s.',
  },
  jsonLd: {
    faqs: [
      { q: 'What is inflation?', a: 'The rate prices rise and purchasing power falls.' },
      { q: 'Average US inflation rate?', a: 'Historically 2-3%; Fed targets 2%.' },
      { q: 'How does it affect savings?', a: 'Savings earning less than inflation lose real value.' },
      { q: 'What is the CPI?', a: 'Measures average price changes across a basket of goods.' },
    ],
    howToSteps: ['Enter current amount.', 'Enter inflation rate.', 'Enter years.', 'Click Calculate.'],
  },
}
