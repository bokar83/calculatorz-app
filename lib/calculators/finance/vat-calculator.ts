import { CalculatorConfig } from '../types'

export const vatCalculator: CalculatorConfig = {
  slug: 'vat-calculator',
  title: 'VAT Calculator',
  category: 'finance',
  description: 'Calculate VAT amount and net or gross price for any VAT rate.',
  updatedDate: 'April 2026',
  tabs: [
    { id: 'add_vat', label: 'Add VAT' },
    { id: 'remove_vat', label: 'Remove VAT' },
  ],
  inputs: [
    { id: 'amount', label: 'Amount', type: 'number', defaultValue: 100, min: 0, step: 0.01, prefix: '$' },
    {
      id: 'vatRate', label: 'VAT Rate', type: 'select',
      options: [
        { value: '5', label: '5% (UK reduced rate)' },
        { value: '10', label: '10% (Australia standard)' },
        { value: '15', label: '15% (New Zealand)' },
        { value: '20', label: '20% (UK standard)' },
        { value: '21', label: '21% (EU common rate)' },
        { value: '23', label: '23% (Ireland standard)' },
        { value: '25', label: '25% (Scandinavia)' },
        { value: 'custom', label: 'Custom rate' },
      ],
    },
    { id: 'customRate', label: 'Custom VAT Rate (%)', type: 'number', defaultValue: 20, min: 0, max: 50, step: 0.1, suffix: '%' },
  ],
  calculate: (inputs, currency, _u, activeTab) => {
    const amount = Number(inputs.amount)
    const vatKey = inputs.vatRate as string
    const rate = (vatKey === 'custom' ? Number(inputs.customRate) : Number(vatKey)) / 100
    const tab = activeTab || 'add_vat'
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    if (tab === 'remove_vat') {
      const net = amount / (1 + rate)
      const vatAmount = amount - net
      return {
        values: [
          { label: 'Net Price (ex-VAT)', value: fmt(net), primary: true },
          { label: 'VAT Amount', value: fmt(vatAmount) },
          { label: 'Gross Price (inc-VAT)', value: fmt(amount) },
          { label: 'VAT Rate', value: (rate * 100).toFixed(1) + '%' },
        ],
        summary: `Gross ${fmt(amount)} = net ${fmt(net)} + ${fmt(vatAmount)} VAT at ${(rate * 100).toFixed(1)}%.`,
      }
    }

    const vatAmount = amount * rate
    const gross = amount + vatAmount
    return {
      values: [
        { label: 'Gross Price (inc-VAT)', value: fmt(gross), primary: true },
        { label: 'VAT Amount', value: fmt(vatAmount) },
        { label: 'Net Price (ex-VAT)', value: fmt(amount) },
        { label: 'VAT Rate', value: (rate * 100).toFixed(1) + '%' },
      ],
      summary: `Net ${fmt(amount)} + ${fmt(vatAmount)} VAT (${(rate * 100).toFixed(1)}%) = gross ${fmt(gross)}.`,
    }
  },
  resultLabels: ['Gross Price', 'VAT Amount', 'Net Price', 'VAT Rate'],
  formula: 'VAT = Net Price x (VAT Rate / 100) | Net = Gross / (1 + Rate)',
  content: {
    howTo: ['Enter the price.', 'Select the VAT rate (or choose custom).', 'Use "Add VAT" to calculate from net; "Remove VAT" to find net from gross.', 'Click Calculate.'],
    faqs: [
      { q: 'What is VAT?', a: 'Value Added Tax is a consumption tax applied at each stage of production and sale.' },
      { q: 'What is the standard VAT rate in the UK?', a: 'The standard UK VAT rate is 20%.' },
      { q: 'How do I remove VAT from a price?', a: 'Divide the gross price by (1 + VAT rate) to get the net price.' },
      { q: 'Is VAT the same as sales tax?', a: 'Similar in concept but collected at each production stage, not just at final sale.' },
    ],
    related: ['sales-tax', 'profit-margin', 'percentage', 'tip-calculator', 'income-tax', 'capital-gains-tax'],
  },
  geo: {
    definition: 'A VAT (Value Added Tax) calculator computes the tax component of a price at each stage of production and sale, where businesses collect VAT on sales and reclaim it on purchases, with the end consumer bearing the full tax cost.',
    ruleOfThumb: 'To add VAT, multiply the net price by (1 + rate). To remove VAT from a gross price, divide by (1 + rate). For the UK standard 20% rate: net x 1.20 = gross; gross divided by 1.20 = net.',
    example: 'A UK freelancer invoices a client $1,500 for services. With 20% VAT: VAT amount = $300, gross invoice = $1,800. The client pays $1,800; the freelancer remits $300 to HMRC.',
    keyFacts: [
      'VAT is used in over 170 countries and is the world\'s most common form of consumption tax, raising roughly 20% of global tax revenue according to OECD analysis (OECD, Consumption Tax Trends, 2024).',
      'The UK standard VAT rate is 20%, with a reduced rate of 5% for domestic energy and certain social housing work, and a zero rate for most food, children\'s clothing, and books (HMRC, VAT Rates, 2024).',
      'Unlike US sales tax, which is collected only at the final point of sale, VAT is collected at every stage of the supply chain, but businesses reclaim input VAT on their purchases so only the end consumer bears the full cost (OECD, Tax Policy Studies, 2022).',
      'Businesses in the UK must register for VAT once their taxable turnover exceeds 90,000 GBP in any rolling 12-month period, a threshold that rose from 85,000 GBP in April 2024 (HMRC, VAT Registration Threshold, 2024).',
    ],
  },
  educational: {
    explainer: 'VAT, or Value Added Tax, is a consumption tax applied at every stage of the production and distribution chain, from raw materials through to the final sale to the consumer. Each business in the chain charges VAT on its sales (output VAT) and pays VAT on its purchases (input VAT). The business remits only the difference to the tax authority, meaning the tax burden passes through the chain until it lands entirely on the end consumer. This is fundamentally different from US sales tax, which is collected only once at the final retail point. For consumers, VAT is usually included in the displayed price in countries like the UK and across the EU, so what you see is what you pay. For businesses, VAT compliance requires tracking output and input tax separately on every transaction. Standard VAT rates vary significantly: 20% in the UK, 19% in Germany, 25% in Sweden and Norway, and 10% in Australia. Most countries also have reduced rates for essential goods like food, medicine, and children\'s items.',
    tips: [
      'If you are a VAT-registered business, always keep valid VAT invoices for every purchase, since you can only reclaim input VAT if you have a proper invoice from a VAT-registered supplier.',
      'Check whether your country or region requires you to register for VAT before you hit the threshold, since some international digital service rules require registration as soon as you make a single sale to a consumer in certain countries.',
      'When quoting prices to business clients, quote net (ex-VAT) prices, since VAT-registered businesses can reclaim the VAT. When quoting to consumers, quote gross (VAT-inclusive) prices to avoid confusion.',
      'Use VAT accounting software or connect your bank to a tool that tracks VAT automatically, since manual VAT return errors are one of the most common reasons small businesses receive HMRC penalty notices.',
    ],
    commonMistakes: [
      'Quoting a gross (VAT-inclusive) price to a client who then interprets it as the net price and adds VAT on top, resulting in a dispute over the invoice total and a 20% overbilling.',
      'Missing the VAT registration threshold and continuing to operate without registering, which means you owe VAT on all past sales above the threshold even though you did not charge it to clients.',
      'Failing to reclaim input VAT on legitimate business purchases such as equipment, software subscriptions, and office supplies, which costs VAT-registered businesses a significant amount each year.',
    ],
    example: 'James registers a UK limited company and takes on his first client project. He buys design software and office supplies for a net cost of $600, paying 20% VAT of $120 for a gross spend of $720. He invoices his client $1,000 net for the project plus 20% VAT of $200, sending a gross invoice of $1,200. At the end of the quarter, James calculates his VAT position: output VAT collected ($200) minus input VAT paid ($120) = $80 net VAT owed to HMRC. He keeps the $1,200 the client paid, remits $80 to HMRC, and retains $1,120 before income tax.',
  },
  jsonLd: {
    faqs: [
      { q: 'What is VAT?', a: 'A consumption tax applied at each stage of production.' },
      { q: 'UK standard VAT rate?', a: '20%.' },
      { q: 'How do I remove VAT?', a: 'Divide gross price by (1 + rate).' },
      { q: 'Is VAT the same as sales tax?', a: 'Similar concept but collected at each production stage.' },
    ],
    howToSteps: ['Enter amount.', 'Select VAT rate.', 'Choose add or remove tab.', 'Click Calculate.'],
  },
}
