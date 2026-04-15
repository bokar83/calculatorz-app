import { Currency } from './calculators/types'

export const PINNED_CURRENCY_CODES = ['USD', 'EUR', 'GBP', 'AED', 'INR', 'CAD']

export const CURRENCY_GROUPS: { region: string; currencies: Currency[] }[] = [
  {
    region: 'Americas',
    currencies: [
      { code: 'USD', symbol: '$', label: 'US Dollar' },
      { code: 'CAD', symbol: 'CA$', label: 'Canadian Dollar' },
      { code: 'MXN', symbol: 'MX$', label: 'Mexican Peso' },
      { code: 'BRL', symbol: 'R$', label: 'Brazilian Real' },
      { code: 'ARS', symbol: 'AR$', label: 'Argentine Peso' },
      { code: 'COP', symbol: 'COP$', label: 'Colombian Peso' },
      { code: 'CLP', symbol: 'CL$', label: 'Chilean Peso' },
      { code: 'PEN', symbol: 'S/', label: 'Peruvian Sol' },
    ],
  },
  {
    region: 'Europe',
    currencies: [
      { code: 'EUR', symbol: '€', label: 'Euro' },
      { code: 'GBP', symbol: '£', label: 'British Pound' },
      { code: 'CHF', symbol: 'CHF', label: 'Swiss Franc' },
      { code: 'SEK', symbol: 'kr', label: 'Swedish Krona' },
      { code: 'NOK', symbol: 'kr', label: 'Norwegian Krone' },
      { code: 'DKK', symbol: 'kr', label: 'Danish Krone' },
      { code: 'PLN', symbol: 'zł', label: 'Polish Zloty' },
      { code: 'TRY', symbol: '₺', label: 'Turkish Lira' },
      { code: 'CZK', symbol: 'Kč', label: 'Czech Koruna' },
      { code: 'HUF', symbol: 'Ft', label: 'Hungarian Forint' },
      { code: 'RON', symbol: 'lei', label: 'Romanian Leu' },
      { code: 'RUB', symbol: '₽', label: 'Russian Ruble' },
    ],
  },
  {
    region: 'Middle East',
    currencies: [
      { code: 'AED', symbol: 'AED', label: 'UAE Dirham' },
      { code: 'SAR', symbol: 'SAR', label: 'Saudi Riyal' },
      { code: 'QAR', symbol: 'QAR', label: 'Qatari Riyal' },
      { code: 'KWD', symbol: 'KD', label: 'Kuwaiti Dinar' },
      { code: 'BHD', symbol: 'BD', label: 'Bahraini Dinar' },
      { code: 'OMR', symbol: 'OMR', label: 'Omani Rial' },
      { code: 'JOD', symbol: 'JD', label: 'Jordanian Dinar' },
      { code: 'IQD', symbol: 'IQD', label: 'Iraqi Dinar' },
      { code: 'ILS', symbol: '₪', label: 'Israeli Shekel' },
    ],
  },
  {
    region: 'Africa',
    currencies: [
      { code: 'ZAR', symbol: 'R', label: 'South African Rand' },
      { code: 'EGP', symbol: 'E£', label: 'Egyptian Pound' },
      { code: 'NGN', symbol: '₦', label: 'Nigerian Naira' },
      { code: 'ETB', symbol: 'Br', label: 'Ethiopian Birr' },
      { code: 'KES', symbol: 'KSh', label: 'Kenyan Shilling' },
      { code: 'TZS', symbol: 'TSh', label: 'Tanzanian Shilling' },
      { code: 'GHS', symbol: 'GH₵', label: 'Ghanaian Cedi' },
      { code: 'MAD', symbol: 'MAD', label: 'Moroccan Dirham' },
      { code: 'DZD', symbol: 'DA', label: 'Algerian Dinar' },
      { code: 'TND', symbol: 'DT', label: 'Tunisian Dinar' },
      { code: 'XOF', symbol: 'CFA', label: 'West African CFA (XOF)' },
      { code: 'XAF', symbol: 'FCFA', label: 'Central African CFA (XAF)' },
      { code: 'GNF', symbol: 'FG', label: 'Guinean Franc' },
      { code: 'UGX', symbol: 'USh', label: 'Ugandan Shilling' },
      { code: 'AOA', symbol: 'Kz', label: 'Angolan Kwanza' },
      { code: 'MZN', symbol: 'MT', label: 'Mozambican Metical' },
    ],
  },
  {
    region: 'Asia Pacific',
    currencies: [
      { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
      { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
      { code: 'CNY', symbol: 'CN¥', label: 'Chinese Yuan' },
      { code: 'KRW', symbol: '₩', label: 'South Korean Won' },
      { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar' },
      { code: 'HKD', symbol: 'HK$', label: 'Hong Kong Dollar' },
      { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
      { code: 'NZD', symbol: 'NZ$', label: 'New Zealand Dollar' },
      { code: 'THB', symbol: '฿', label: 'Thai Baht' },
      { code: 'MYR', symbol: 'RM', label: 'Malaysian Ringgit' },
      { code: 'PHP', symbol: '₱', label: 'Philippine Peso' },
      { code: 'IDR', symbol: 'Rp', label: 'Indonesian Rupiah' },
      { code: 'VND', symbol: '₫', label: 'Vietnamese Dong' },
      { code: 'PKR', symbol: '₨', label: 'Pakistani Rupee' },
      { code: 'BDT', symbol: '৳', label: 'Bangladeshi Taka' },
      { code: 'LKR', symbol: 'LKR', label: 'Sri Lankan Rupee' },
      { code: 'NPR', symbol: 'NPR', label: 'Nepalese Rupee' },
      { code: 'MMK', symbol: 'K', label: 'Myanmar Kyat' },
      { code: 'TWD', symbol: 'NT$', label: 'New Taiwan Dollar' },
      { code: 'KHR', symbol: '៛', label: 'Cambodian Riel' },
    ],
  },
]

// Flat list for lookup by code
export const ALL_CURRENCIES: Currency[] = CURRENCY_GROUPS.flatMap(g => g.currencies)

export const DEFAULT_CURRENCY: Currency = { code: 'USD', symbol: '$', label: 'US Dollar' }

export function getCurrencyByCode(code: string): Currency {
  return ALL_CURRENCIES.find(c => c.code === code) ?? DEFAULT_CURRENCY
}

export function getPinnedCurrencies(): Currency[] {
  return PINNED_CURRENCY_CODES.map(code => getCurrencyByCode(code))
}
