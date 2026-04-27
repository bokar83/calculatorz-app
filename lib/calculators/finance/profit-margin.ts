import { CalculatorConfig } from '../types'

export const profitMargin: CalculatorConfig = {
  slug: 'profit-margin',
  title: 'Profit Margin Calculator',
  category: 'finance',
  description: 'Calculate gross, operating, or net profit margin for your business.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'revenue', label: 'Total Revenue', type: 'number', defaultValue: 100000, min: 0, step: 1000, prefix: '$' },
    { id: 'cogs', label: 'Cost of Goods Sold', type: 'number', defaultValue: 60000, min: 0, step: 1000, prefix: '$' },
    { id: 'operatingExpenses', label: 'Operating Expenses', type: 'number', defaultValue: 20000, min: 0, step: 500, prefix: '$' },
    { id: 'taxes', label: 'Taxes', type: 'number', defaultValue: 5000, min: 0, step: 500, prefix: '$' },
  ],
  calculate: (inputs, currency) => {
    const revenue = Number(inputs.revenue)
    const cogs = Number(inputs.cogs)
    const opex = Number(inputs.operatingExpenses)
    const taxes = Number(inputs.taxes)
    if (revenue === 0) return { values: [{ label: 'Error', value: 'Enter revenue' }] }
    const grossProfit = revenue - cogs
    const operatingProfit = grossProfit - opex
    const netProfit = operatingProfit - taxes
    const grossMargin = (grossProfit / revenue) * 100
    const operatingMargin = (operatingProfit / revenue) * 100
    const netMargin = (netProfit / revenue) * 100
    const fmt = (v: number) => currency.symbol + Math.round(v).toLocaleString('en-US')
    return {
      values: [
        { label: 'Net Profit Margin', value: netMargin.toFixed(2) + '%', primary: true },
        { label: 'Gross Profit Margin', value: grossMargin.toFixed(2) + '%' },
        { label: 'Operating Margin', value: operatingMargin.toFixed(2) + '%' },
        { label: 'Net Profit', value: fmt(netProfit) },
      ],
      summary: 'Revenue ' + fmt(revenue) + ': gross margin ' + grossMargin.toFixed(1) + '%, operating margin ' + operatingMargin.toFixed(1) + '%, net margin ' + netMargin.toFixed(1) + '%.',
    }
  },
  resultLabels: ['Net Profit Margin', 'Gross Profit Margin', 'Operating Margin', 'Net Profit'],
  formula: 'Profit Margin = (Revenue - Costs) / Revenue x 100',
  content: {
    howTo: ['Enter total revenue.', 'Enter cost of goods sold.', 'Enter operating expenses and taxes.', 'Click Calculate.'],
    faqs: [
      { q: 'What is a good profit margin?', a: 'It varies by industry; retail averages 2-5%, software can exceed 20%.' },
      { q: 'What is gross vs net profit margin?', a: 'Gross margin excludes operating expenses; net margin includes all costs.' },
      { q: 'How can I improve profit margins?', a: 'Reduce costs, increase prices, or improve operational efficiency.' },
      { q: 'What is operating profit margin?', a: 'Revenue minus operating expenses, excluding taxes and interest.' },
    ],
    related: ['roi-calculator', 'break-even', 'sales-tax', 'vat-calculator', 'percentage', 'investment-return'],
  },
  geo: {
    definition: 'A profit margin calculator measures profitability as a percentage of revenue, computing gross margin (revenue minus cost of goods sold), operating margin (after operating expenses), or net margin (after all expenses and taxes).',
    ruleOfThumb: 'A net profit margin above 10% is generally considered healthy. Retail businesses often operate at 2-5% net margin; software companies at 20-30%. Gross margins below 30% leave little room for covering overhead and still producing net profit.',
    example: 'A restaurant has $800,000 in annual revenue, $480,000 in COGS (food and direct labor), and $240,000 in overhead. Gross profit = $320,000; gross margin = 40%. Operating income = $80,000; operating margin = 10%. After 21% tax on operating income, net profit = $63,200; net margin = 7.9%.',
    keyFacts: [
      'The average net profit margin across all US industries is approximately 7-8%, with wide variation by sector (NYU Stern School of Business Industry Data, 2024).',
      'Software and technology companies report average gross margins of 60-80%, reflecting minimal cost of goods for digital products, while grocery retailers average gross margins below 25% (IBISWorld Industry Reports, 2024).',
      'Investors and analysts use net profit margin alongside revenue growth to assess whether a business is scaling efficiently or growing at the expense of profitability.',
      'A business with a high gross margin but a low net margin signals that operating expenses (sales, marketing, administration) are consuming most of the gross profit, a key warning sign for sustainability.',
    ],
  },
  educational: {
    explainer: 'Profit margin is not a single number. It is a cascade of three distinct measurements, each one revealing a different layer of business health. Gross margin strips out only the direct cost of producing your product or service (cost of goods sold, or COGS) and shows how much revenue remains to cover everything else. A gross margin of 40% means 40 cents of every revenue dollar survives after paying for what you sold. Operating margin deducts overhead: rent, salaries not in COGS, marketing, software, and administrative expenses. It shows how much the core business earns before taxes and financing costs. Net margin is the bottom line after everything, including interest expense and taxes. For investors, net margin is the most meaningful number because it shows what the owner actually keeps. A business can have a strong gross margin but a weak net margin if overhead is bloated or debt service is high. Margin signals differ by industry. A 3% net margin at a grocery chain may be excellent; the same margin at a software company signals a fundamental structural problem. Comparing your margin to industry benchmarks from NYU Stern or IBISWorld tells you whether you are performing or bleeding relative to peers.',
    tips: [
      'Track all three margins separately, not just net. If gross margin is declining while revenue grows, your product costs are rising faster than your prices. If operating margin is thin despite a healthy gross margin, overhead is the culprit.',
      'To improve gross margin without raising prices, focus on supplier negotiations, product mix shifts toward higher-margin items, and reducing waste or rework in production or service delivery.',
      'Operating leverage is the concept that fixed costs spread across more revenue units. Scaling revenue while holding fixed costs steady dramatically improves operating margin. Identify which expenses are truly fixed versus variable.',
      'Investors use the price-to-earnings (P/E) ratio partly as a function of net margin and growth rate. A business with a 20% net margin growing at 30% per year commands a very different valuation than one with a 3% margin at the same growth rate.',
    ],
    commonMistakes: [
      'Conflating gross margin with profitability. A 60% gross margin sounds excellent but if operating expenses consume 58% of revenue, the business is barely breaking even and has almost nothing left after taxes.',
      'Ignoring the difference between gross margin percentage and gross profit dollars. A product with a 70% gross margin on a $10 sale generates $7 in gross profit. A product with a 40% gross margin on a $100 sale generates $40. The higher-margin product produces less cash per unit sold.',
      'Not separating owner compensation from operating expenses when analyzing a small business. If the owner pays themselves below-market wages, the reported operating margin is artificially high and will not survive a management transition or due-diligence review.',
    ],
    example: 'Sarah runs a skincare brand with $500,000 in annual revenue. COGS (manufacturing, packaging, fulfillment) = $200,000. Gross profit = $300,000; gross margin = 60%. Operating expenses (marketing $80,000, payroll $120,000, software and admin $30,000) = $230,000. Operating profit = $70,000; operating margin = 14%. After 21% corporate tax ($14,700), net profit = $55,300; net margin = 11.1%. The NYU Stern benchmark for personal products is approximately 12% net margin, meaning Sarah is performing close to the industry median and has room to improve by trimming marketing spend or raising prices on top-selling SKUs.',
  },
  jsonLd: {
    faqs: [
      { q: 'What is a good profit margin?', a: 'Varies by industry; retail 2-5%, software can exceed 20%.' },
      { q: 'Gross vs net margin?', a: 'Gross excludes operating costs; net includes all costs.' },
      { q: 'How to improve margins?', a: 'Reduce costs, raise prices, or improve efficiency.' },
      { q: 'What is operating margin?', a: 'Revenue minus operating expenses, excluding taxes and interest.' },
    ],
    howToSteps: ['Enter revenue.', 'Enter costs.', 'Click Calculate.'],
  },
}
