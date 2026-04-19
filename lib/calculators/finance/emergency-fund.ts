import { CalculatorConfig } from '../types'

export const emergencyFund: CalculatorConfig = {
  slug: 'emergency-fund',
  title: 'Emergency Fund Calculator',
  category: 'finance',
  description: 'Calculate how much you need in an emergency fund and how long to save it.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'monthlyExpenses', label: 'Monthly Essential Expenses', type: 'number', defaultValue: 3500, min: 0, step: 100, prefix: '$' },
    {
      id: 'monthsCoverage', label: 'Months of Coverage', type: 'select',
      options: [
        { value: '3', label: '3 months (minimum recommended)' },
        { value: '6', label: '6 months (standard)' },
        { value: '9', label: '9 months (freelancer/variable income)' },
        { value: '12', label: '12 months (conservative/high-risk job)' },
      ],
    },
    { id: 'currentFund', label: 'Current Emergency Fund', type: 'number', defaultValue: 1000, min: 0, step: 100, prefix: '$' },
    { id: 'monthlySavings', label: 'Monthly Savings Toward Fund', type: 'number', defaultValue: 300, min: 0, step: 50, prefix: '$' },
  ],
  calculate: (inputs, currency) => {
    const expenses = Number(inputs.monthlyExpenses)
    const months = Number(inputs.monthsCoverage) || 6
    const current = Number(inputs.currentFund)
    const monthlySave = Number(inputs.monthlySavings)
    const target = expenses * months
    const remaining = Math.max(0, target - current)
    const monthsToGoal = monthlySave > 0 ? Math.ceil(remaining / monthlySave) : Infinity
    const pctDone = target > 0 ? Math.min(100, (current / target) * 100) : 0
    const fmt = (v: number) => currency.symbol + Math.round(v).toLocaleString('en-US')
    return {
      values: [
        { label: 'Target Fund Size', value: fmt(target), primary: true },
        { label: 'Already Saved', value: fmt(current) },
        { label: 'Still Needed', value: fmt(remaining) },
        { label: 'Months to Goal', value: isFinite(monthsToGoal) ? monthsToGoal + ' months' : 'Set a monthly saving amount' },
      ],
      summary: `Your ${months}-month emergency fund target is ${fmt(target)}. You're ${pctDone.toFixed(0)}% there. ${isFinite(monthsToGoal) ? `Saving ${fmt(monthlySave)}/month: fully funded in ${monthsToGoal} months.` : ''}`,
    }
  },
  resultLabels: ['Target Fund Size', 'Already Saved', 'Still Needed', 'Months to Goal'],
  formula: 'Emergency Fund = Monthly Expenses x Months of Coverage',
  content: {
    howTo: ['Enter your monthly essential expenses.', 'Select months of coverage.', 'Enter how much you have saved.', 'Enter monthly savings amount.', 'Click Calculate.'],
    faqs: [
      { q: 'How many months of expenses should I save?', a: '3-6 months is the standard recommendation; 6+ for variable income.' },
      { q: 'Where should I keep my emergency fund?', a: 'A high-yield savings account for easy access and some growth.' },
      { q: 'What counts as an emergency?', a: 'Job loss, major medical expense, critical home or car repair.' },
      { q: 'Should I invest my emergency fund?', a: 'No, it should stay liquid and accessible at all times.' },
      { q: 'What counts as an emergency expense?', a: 'Job loss, unexpected medical bills, critical home repairs (roof, HVAC, plumbing), major car repairs, or a family emergency requiring travel. Planned expenses — vacations, car purchases, annual insurance premiums — should have separate sinking funds, not come from the emergency fund.' },
      { q: 'How do I build an emergency fund fast?', a: 'Temporarily cut discretionary spending (dining, subscriptions, entertainment), sell unused items, take on a short-term side income, and direct tax refunds or bonuses entirely to the fund. Most people can build a starter $1,000 emergency fund within 30-60 days.' },
      { q: 'Should I keep my emergency fund in a high-yield savings account?', a: 'Yes. High-yield savings accounts (HYSA) offer 4-5% APY as of 2024-2025, FDIC insured, with no lock-up period. Do not put emergency funds in CDs (lock-up), stocks (volatility), or checking accounts (low yield). HYSAs are the clear best option.' },
      { q: 'Do I need an emergency fund if I have a credit card?', a: 'A credit card is not an emergency fund — it is high-interest debt. Using a credit card for a $5,000 emergency at 20% APR and paying it off over 12 months costs roughly $560 in interest. An emergency fund costs nothing and keeps you out of the debt cycle.' },
    ],
    related: ['savings-goal', 'retirement-savings', 'compound-interest', 'take-home-pay', 'debt-payoff'],
  },
  jsonLd: {
    faqs: [
      { q: 'How many months should I save?', a: '3-6 months; 6+ for variable income.' },
      { q: 'Where should I keep it?', a: 'A high-yield savings account.' },
      { q: 'What counts as an emergency?', a: 'Job loss, medical bills, critical repairs.' },
      { q: 'Should I invest it?', a: 'No, keep it liquid.' },
      { q: 'What counts as an emergency expense?', a: 'Job loss, unexpected medical bills, critical home repairs (roof, HVAC, plumbing), major car repairs, or a family emergency requiring travel. Planned expenses — vacations, car purchases, annual insurance premiums — should have separate sinking funds, not come from the emergency fund.' },
      { q: 'How do I build an emergency fund fast?', a: 'Temporarily cut discretionary spending (dining, subscriptions, entertainment), sell unused items, take on a short-term side income, and direct tax refunds or bonuses entirely to the fund. Most people can build a starter $1,000 emergency fund within 30-60 days.' },
      { q: 'Should I keep my emergency fund in a high-yield savings account?', a: 'Yes. High-yield savings accounts (HYSA) offer 4-5% APY as of 2024-2025, FDIC insured, with no lock-up period. Do not put emergency funds in CDs (lock-up), stocks (volatility), or checking accounts (low yield). HYSAs are the clear best option.' },
      { q: 'Do I need an emergency fund if I have a credit card?', a: 'A credit card is not an emergency fund — it is high-interest debt. Using a credit card for a $5,000 emergency at 20% APR and paying it off over 12 months costs roughly $560 in interest. An emergency fund costs nothing and keeps you out of the debt cycle.' },
    ],
    howToSteps: ['Enter monthly expenses.', 'Select months of coverage.', 'Enter current fund.', 'Click Calculate.'],
  },
  geo: {
    definition: 'An emergency fund is a dedicated cash reserve held in a liquid, accessible account, sized to cover 3-12 months of essential living expenses. Its purpose is to absorb unexpected financial shocks without requiring debt.',
    ruleOfThumb: 'Standard guidance: 3 months of expenses for dual-income households with stable employment; 6 months for single-income households; 9-12 months for freelancers, contractors, or anyone with variable income. Start with a $1,000 starter fund to cover minor emergencies, then build to full target.',
    example: 'Monthly essential expenses: $3,800 (rent $1,400, food $600, utilities $200, insurance $400, transportation $350, minimum debt payments $850). 6-month target: $22,800. At $400/month savings: fully funded in 57 months (4.75 years). At $800/month: 28.5 months.',
    keyFacts: [
      '57% of Americans cannot cover a $1,000 emergency without borrowing money or selling something. (Source: Bankrate Emergency Savings Report 2024)',
      'The average duration of unemployment in the US is approximately 21 weeks — just over 5 months — making a 6-month fund a practical minimum for most workers. (Source: Bureau of Labor Statistics)',
      'High-yield savings accounts offered 4.5-5.25% APY in 2024-2025, making them the optimal vehicle for emergency funds: liquid, FDIC insured, and interest-bearing. (Source: FDIC weekly national rates)',
      'Medical debt is the leading cause of personal bankruptcy in the US. An emergency fund that covers 3-6 months of expenses provides meaningful protection against this risk. (Source: American Journal of Public Health)',
    ],
  },
  educational: {
    explainer: `An emergency fund is the most important financial buffer you can have — more important than investing, more important than paying down low-interest debt, and certainly more important than optimizing a budget down to the dollar. The reason is simple: without a cash reserve, every unexpected expense becomes a debt event. A car repair becomes a credit card balance at 22% APR. A job loss becomes a missed mortgage payment. The compounding damage from even one emergency without savings can take years to undo. The standard rule — 3 to 6 months of expenses — is calibrated to cover the most common financial emergencies: job loss (average US unemployment spell is about 5 months), major medical event, or critical home or car repair. Freelancers and those with variable income should target 9-12 months because their income risk is higher. The fund should sit in a high-yield savings account: liquid (you can access it in 1-2 business days), FDIC insured, and earning 4-5% interest so inflation does not erode it.`,
    tips: [
      'Open a separate account for your emergency fund — not your regular checking account. The separation creates friction that prevents casual spending from the reserve.',
      'Automate a fixed monthly transfer to your emergency fund immediately after each paycheck. Treat it like a bill. What gets automated gets funded.',
      'Name the account something concrete ("Car Repair Fund" or "Job Loss Buffer"). Research shows named savings accounts have higher completion rates than unnamed ones.',
      'Once your fund is complete, do not stop the automatic transfers. Redirect them to your next financial goal (investing, debt payoff, or a large purchase fund) so the momentum continues.',
    ],
    commonMistakes: [
      'Raiding the fund for non-emergencies. A vacation, holiday gifts, or a great sale are not emergencies. Define what counts as an emergency before you need to make the call under stress.',
      'Keeping the fund in a checking account. You lose 4-5% in annual yield and make it psychologically easier to spend. Move it to a dedicated high-yield savings account.',
      'Waiting until debt is paid off to start. Build a $1,000 starter fund first, even while carrying debt. One unexpected expense without any buffer will send you back into debt anyway.',
    ],
    example: 'Priya is a freelance graphic designer earning $5,800/month on average. Her essential monthly expenses are $3,200. As a freelancer, she targets 9 months: $28,800. She saves $600/month dedicated to the fund. After 48 months (4 years), she has her target, which then sits in a HYSA earning 4.5% APY ($1,296/year in interest). When she lost a major client for 3 months in 2024, she covered expenses without any debt or panic.',
  },
}
