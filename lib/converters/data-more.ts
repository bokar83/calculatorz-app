// Science, engineering, computing and design categories. Exact definitions; sources per category.
import { linear, type Category, type Unit } from './engine.ts'
import { INCH, FOOT, MILE, POUND, US_GAL, UK_GAL } from './data-physical.ts'

const G0 = 9.80665 // m/s^2, standard gravity (exact by definition)
const LBF = POUND * G0 // N, pound-force = 4.4482216152605
const BTU_IT = 1055.05585262 // J, International Table BTU (exact by definition)
const CAL_TH = 4.184 // J, thermochemical calorie (exact)
const HP_MECH = 550 * FOOT * LBF // W, mechanical horsepower = 745.6998715822702
const MMHG = 13595.1 * G0 * 0.001 // Pa, conventional mmHg = 133.322387415 (13595.1 kg/m3 x g0 x 1 mm)
const FT_LBF = FOOT * LBF // J = 1.3558179483314004

export const dataStorage: Category = {
  id: 'data-storage',
  kind: 'units',
  group: 'Computing',
  title: 'Data Storage Converter',
  short: 'Data Storage',
  description: 'Convert bits, bytes, kilobytes, megabytes, gigabytes, terabytes and petabytes, in both decimal (KB, MB, GB) and binary (KiB, MiB, GiB) units.',
  aliases: ['bytes', 'megabytes', 'gigabytes', 'terabytes', 'mb to gb', 'gb to mb', 'storage', 'file size', 'disk', 'ram', 'gib', 'mib'],
  units: [
    linear('bit', 'bits', 'Bits', 'bit', 1, ['bit', 'bits']),
    linear('B', 'bytes', 'Bytes', 'B', 8, ['byte', 'bytes']),
    linear('kB', 'kb', 'Kilobytes (1,000 B)', 'kB', 8e3, ['kilobyte', 'kb']),
    linear('MB', 'mb', 'Megabytes (1,000,000 B)', 'MB', 8e6, ['megabyte', 'mb', 'megs']),
    linear('GB', 'gb', 'Gigabytes (10^9 B)', 'GB', 8e9, ['gigabyte', 'gb', 'gigs']),
    linear('TB', 'tb', 'Terabytes (10^12 B)', 'TB', 8e12, ['terabyte', 'tb']),
    linear('PB', 'pb', 'Petabytes (10^15 B)', 'PB', 8e15, ['petabyte', 'pb']),
    linear('KiB', 'kib', 'Kibibytes (1,024 B)', 'KiB', 8 * 1024, ['kibibyte', 'kib']),
    linear('MiB', 'mib', 'Mebibytes (1,024^2 B)', 'MiB', 8 * 1024 ** 2, ['mebibyte', 'mib']),
    linear('GiB', 'gib', 'Gibibytes (1,024^3 B)', 'GiB', 8 * 1024 ** 3, ['gibibyte', 'gib']),
    linear('TiB', 'tib', 'Tebibytes (1,024^4 B)', 'TiB', 8 * 1024 ** 4, ['tebibyte', 'tib']),
    linear('PiB', 'pib', 'Pebibytes (1,024^5 B)', 'PiB', 8 * 1024 ** 5, ['pebibyte', 'pib']),
  ],
  defaultFrom: 'GB',
  defaultTo: 'MB',
  pairs: [
    { from: 'MB', to: 'GB' }, { from: 'GB', to: 'MB' }, { from: 'GB', to: 'TB' }, { from: 'TB', to: 'GB' },
    { from: 'kB', to: 'MB' }, { from: 'GB', to: 'GiB' }, { from: 'GiB', to: 'GB' }, { from: 'MB', to: 'MiB' },
    { from: 'B', to: 'bit' }, { from: 'TB', to: 'TiB' },
  ],
  tableValues: [1, 2, 5, 10, 64, 100, 256, 500, 1000],
  formula: 'bits = value x unit factor (decimal: 1 kB = 1,000 B; binary: 1 KiB = 1,024 B; 1 byte = 8 bits)',
  content: {
    explainer: 'Two systems share the same abbreviations in everyday talk. Decimal units follow SI prefixes: a kilobyte is 1,000 bytes and a gigabyte is 10^9 bytes. Binary units, standardized by the IEC as kibibyte, mebibyte and gibibyte, count in powers of 1,024. Drive makers advertise decimal gigabytes, while many operating systems report binary ones, which is why a "500 GB" drive appears as roughly 465 GiB.',
    tips: ['Divide a decimal GB figure by 1.0737 to get GiB.', 'RAM is normally sold in binary multiples, while disk and network sizes use decimal.', 'A byte is 8 bits; lowercase b means bits and uppercase B means bytes.'],
    commonMistakes: ['Mixing bits and bytes, which is an eight-fold error.', 'Treating a kilobyte as always 1,024 bytes; under SI it is 1,000.', 'Expecting a new drive to show its full advertised size in the operating system.'],
    example: 'A drive sold as 500 GB holds 500 x 10^9 bytes, which is 500,000,000,000 / 1,073,741,824 = 465.66 GiB.',
    faqs: [
      { q: 'How many MB are in a GB?', a: 'In decimal (SI) units there are 1,000 MB in a GB. In binary units there are 1,024 MiB in a GiB.' },
      { q: 'Why does my 1 TB drive show less than 1 TB?', a: 'Makers use decimal terabytes (10^12 bytes) while many systems display binary tebibytes (1,024^4 bytes), so 1 TB shows as about 931 GiB.' },
      { q: 'How many bits are in a byte?', a: 'There are 8 bits in one byte.' },
    ],
  },
  sources: 'IEC 80000-13 and BIPM SI prefixes (decimal kB/MB/GB; binary KiB/MiB/GiB).',
}

export const dataTransfer: Category = {
  id: 'data-transfer',
  kind: 'units',
  group: 'Computing',
  title: 'Data Transfer Rate Converter',
  short: 'Data Transfer Rate',
  description: 'Convert bits per second, kilobits, megabits and gigabits per second, and bytes per second, megabytes per second and gigabytes per second.',
  aliases: ['bandwidth', 'internet speed', 'download speed', 'mbps', 'mb/s', 'gbps', 'network speed', 'throughput'],
  units: [
    linear('bps', 'bps', 'Bits per second', 'bit/s', 1, ['bps', 'bit/s']),
    linear('kbps', 'kbps', 'Kilobits per second', 'kbit/s', 1e3, ['kbps', 'kbit/s']),
    linear('Mbps', 'mbps', 'Megabits per second', 'Mbit/s', 1e6, ['mbps', 'mbit/s', 'megabits per second']),
    linear('Gbps', 'gbps', 'Gigabits per second', 'Gbit/s', 1e9, ['gbps', 'gbit/s', 'gigabits per second']),
    linear('Tbps', 'tbps', 'Terabits per second', 'Tbit/s', 1e12, ['tbps', 'tbit/s']),
    linear('Bps', 'bytes-per-second', 'Bytes per second', 'B/s', 8, ['b/s', 'bytes per second']),
    linear('kBps', 'kbs', 'Kilobytes per second', 'kB/s', 8e3, ['kb/s', 'kilobytes per second']),
    linear('MBps', 'mbs', 'Megabytes per second', 'MB/s', 8e6, ['mb/s', 'megabytes per second']),
    linear('GBps', 'gbs', 'Gigabytes per second', 'GB/s', 8e9, ['gb/s', 'gigabytes per second']),
    linear('KiBps', 'kibs', 'Kibibytes per second', 'KiB/s', 8 * 1024, ['kib/s']),
    linear('MiBps', 'mibs', 'Mebibytes per second', 'MiB/s', 8 * 1024 ** 2, ['mib/s']),
    linear('GiBps', 'gibs', 'Gibibytes per second', 'GiB/s', 8 * 1024 ** 3, ['gib/s']),
  ],
  defaultFrom: 'Mbps',
  defaultTo: 'MBps',
  pairs: [
    { from: 'Mbps', to: 'MBps' }, { from: 'MBps', to: 'Mbps' }, { from: 'Gbps', to: 'MBps' }, { from: 'MBps', to: 'Gbps' },
    { from: 'Gbps', to: 'Mbps' }, { from: 'Mbps', to: 'Gbps' }, { from: 'kbps', to: 'Mbps' }, { from: 'Mbps', to: 'kBps' },
  ],
  tableValues: [1, 8, 10, 25, 50, 100, 250, 500, 1000],
  formula: 'bits per second = value x unit factor (1 byte = 8 bits; decimal prefixes 1 Mbit/s = 1,000,000 bit/s)',
  content: {
    explainer: 'Internet plans quote speed in megabits or gigabits per second, while browsers and download managers show megabytes per second. Because a byte is eight bits, a 100 Mbit/s connection can move at most 12.5 MB/s. Real throughput is lower because of protocol overhead, Wi-Fi conditions and server limits, so treat the converted figure as the ceiling rather than the speed you will see in practice.',
    tips: ['Divide megabits per second by 8 to get megabytes per second.', 'A gigabit connection tops out near 125 MB/s in theory.', 'Lowercase b is bits and uppercase B is bytes; check which one a plan or app uses.'],
    commonMistakes: ['Comparing a Mbit/s plan to an MB/s download figure without dividing by 8.', 'Assuming advertised speed equals measured speed.', 'Using binary prefixes for network rates; network rates are decimal by convention.'],
    example: 'A 100 Mbit/s plan is 100 / 8 = 12.5 MB/s, so a 1 GB file needs at least 1,000 / 12.5 = 80 seconds.',
    faqs: [
      { q: 'How many MB/s is 100 Mbps?', a: '100 megabits per second equals 12.5 megabytes per second.' },
      { q: 'What is the difference between Mbps and MBps?', a: 'Mbps is megabits per second and MBps is megabytes per second. One MBps equals 8 Mbps.' },
      { q: 'How many Mbps is 1 Gbps?', a: '1 gigabit per second is 1,000 megabits per second in decimal units.' },
    ],
  },
  sources: 'IEC 80000-13 and BIPM SI prefixes; byte = 8 bits.',
}

export const energy: Category = {
  id: 'energy',
  kind: 'units',
  group: 'Science & engineering',
  title: 'Energy Converter',
  short: 'Energy',
  description: 'Convert joules, kilojoules, megajoules, calories, kilocalories, watt-hours, kilowatt-hours, BTU, foot-pounds and electronvolts.',
  aliases: ['work', 'heat', 'calories', 'kcal', 'kwh', 'btu', 'joules', 'food energy'],
  units: [
    linear('J', 'joules', 'Joules', 'J', 1, ['joule', 'j']),
    linear('kJ', 'kilojoules', 'Kilojoules', 'kJ', 1e3, ['kilojoule', 'kj']),
    linear('MJ', 'megajoules', 'Megajoules', 'MJ', 1e6, ['megajoule', 'mj']),
    linear('cal', 'calories', 'Calories (thermochemical)', 'cal', CAL_TH, ['calorie', 'small calorie', 'cal']),
    linear('kcal', 'kilocalories', 'Kilocalories (food Calories)', 'kcal', CAL_TH * 1000, ['kilocalorie', 'food calorie', 'big calorie', 'kcal', 'Calories']),
    linear('Wh', 'watt-hours', 'Watt-hours', 'Wh', 3600, ['watt hour', 'wh']),
    linear('kWh', 'kwh', 'Kilowatt-hours', 'kWh', 3.6e6, ['kilowatt hour', 'kwh', 'electricity']),
    linear('BTU', 'btu', 'BTU (International Table)', 'BTU', BTU_IT, ['british thermal unit', 'btu']),
    linear('ftlbf', 'foot-pounds', 'Foot-pounds force', 'ft-lbf', FT_LBF, ['foot pound', 'ft lb', 'ft-lbf']),
    linear('eV', 'electronvolts', 'Electronvolts', 'eV', 1.602176634e-19, ['electron volt', 'ev']),
  ],
  defaultFrom: 'kWh',
  defaultTo: 'MJ',
  pairs: [
    { from: 'kcal', to: 'kJ' }, { from: 'kJ', to: 'kcal' }, { from: 'kWh', to: 'MJ' }, { from: 'kWh', to: 'BTU' },
    { from: 'BTU', to: 'kWh' }, { from: 'J', to: 'cal' }, { from: 'cal', to: 'J' }, { from: 'kWh', to: 'kcal' },
    { from: 'Wh', to: 'J' }, { from: 'BTU', to: 'J' },
  ],
  tableValues: [1, 2, 5, 10, 50, 100, 500, 1000, 2000],
  formula: 'joules = value x unit factor (1 cal = 4.184 J, 1 Wh = 3,600 J, 1 BTU(IT) = 1,055.05585262 J, 1 eV = 1.602176634e-19 J)',
  content: {
    explainer: 'Energy is measured in joules in the SI system. Electricity bills use kilowatt-hours, nutrition labels use kilocalories (called Calories on food packaging), and heating equipment is often rated in BTU. The thermochemical calorie is exactly 4.184 joules, so one food Calorie (a kilocalorie) is 4,184 joules. The electronvolt, now exactly defined, is used for particles and atoms.',
    tips: ['One kilowatt-hour equals 3.6 megajoules, or about 3,412 BTU.', 'A food Calorie with a capital C is a kilocalorie, or 4.184 kJ.', 'Divide kilojoules by 4.184 to get kilocalories.'],
    commonMistakes: ['Mixing calories (cal) with kilocalories (kcal); there is a factor of 1,000.', 'Confusing kilowatts (power) with kilowatt-hours (energy).', 'Using a different BTU definition than the one you are comparing with; several exist.'],
    example: 'A 2,000 kcal day is 2,000 x 4.184 = 8,368 kJ. Running a 1.5 kW heater for 2 hours uses 3 kWh, which is 10.8 MJ.',
    faqs: [
      { q: 'How many joules are in a kilocalorie?', a: 'One kilocalorie is exactly 4,184 joules using the thermochemical calorie.' },
      { q: 'How many BTU are in a kWh?', a: 'One kilowatt-hour is about 3,412.14 BTU (International Table).' },
      { q: 'What is the difference between kW and kWh?', a: 'A kilowatt is a rate of energy use (power). A kilowatt-hour is the energy used by 1 kW running for one hour.' },
    ],
  },
  sources: 'NIST SP 811 (calorie_th = 4.184 J, BTU_IT, foot-pound force); SI Brochure 2019 (elementary charge 1.602176634e-19 C, so 1 eV exact).',
}

export const power: Category = {
  id: 'power',
  kind: 'units',
  group: 'Science & engineering',
  title: 'Power Converter',
  short: 'Power',
  description: 'Convert milliwatts, watts, kilowatts, megawatts, mechanical and metric horsepower, and BTU per hour.',
  aliases: ['watts', 'kilowatts', 'horsepower', 'hp', 'kw', 'btu/h', 'btuh'],
  units: [
    linear('mW', 'milliwatts', 'Milliwatts', 'mW', 1e-3, ['milliwatt', 'mw']),
    linear('W', 'watts', 'Watts', 'W', 1, ['watt', 'w']),
    linear('kW', 'kilowatts', 'Kilowatts', 'kW', 1e3, ['kilowatt', 'kw']),
    linear('MW', 'megawatts', 'Megawatts', 'MW', 1e6, ['megawatt']),
    linear('hp', 'horsepower', 'Horsepower (mechanical)', 'hp', HP_MECH, ['hp', 'horse power', 'mechanical horsepower', 'bhp']),
    linear('PS', 'metric-horsepower', 'Horsepower (metric)', 'PS', 75 * G0, ['ps', 'cv', 'pferdestarke', 'metric hp']),
    linear('BTUh', 'btu-per-hour', 'BTU per hour', 'BTU/h', BTU_IT / 3600, ['btu/h', 'btuh', 'btu per hour']),
  ],
  defaultFrom: 'hp',
  defaultTo: 'kW',
  pairs: [
    { from: 'hp', to: 'kW' }, { from: 'kW', to: 'hp' }, { from: 'W', to: 'hp' }, { from: 'hp', to: 'W' },
    { from: 'PS', to: 'kW' }, { from: 'kW', to: 'PS' }, { from: 'BTUh', to: 'W' }, { from: 'W', to: 'BTUh' },
    { from: 'MW', to: 'kW' }, { from: 'hp', to: 'PS' },
  ],
  tableValues: [1, 5, 10, 50, 100, 150, 200, 500, 1000],
  formula: 'watts = value x unit factor (1 hp = 550 ft-lbf/s = 745.6998715822702 W; 1 PS = 75 kgf-m/s = 735.49875 W)',
  content: {
    explainer: 'Power is the rate of doing work, with the watt (one joule per second) as the SI unit. Engines are still rated in horsepower in many markets. Mechanical horsepower (used in the US and UK) is exactly 550 foot-pounds per second, about 745.7 W, while metric horsepower (PS or CV, used in continental Europe) is 75 kilogram-force meters per second, about 735.5 W. Air conditioners and furnaces are often rated in BTU per hour.',
    tips: ['Multiply horsepower by 0.7457 to get kilowatts.', 'Multiply kilowatts by 1.341 to get mechanical horsepower.', 'One BTU per hour is about 0.293 W.'],
    commonMistakes: ['Treating metric and mechanical horsepower as the same; they differ by about 1.4 percent.', 'Confusing BTU (energy) with BTU per hour (power).', 'Reading a kW rating as kWh.'],
    example: 'A 150 hp engine delivers 150 x 745.7 = 111.85 kW. A 12,000 BTU/h air conditioner draws about 12,000 x 0.29307 = 3,517 W of cooling capacity.',
    faqs: [
      { q: 'How many watts are in a horsepower?', a: 'One mechanical horsepower is about 745.7 watts.' },
      { q: 'Is a PS the same as a hp?', a: 'No. One metric horsepower (PS) is 735.49875 W, slightly less than a mechanical horsepower.' },
      { q: 'How many kW is 100 hp?', a: '100 mechanical horsepower is about 74.57 kW.' },
    ],
  },
  sources: 'NIST SP 811 (horsepower = 550 ft lbf/s; BTU_IT); DIN 66036 (metric horsepower = 75 kgf m/s with g_n = 9.80665 m/s2).',
}

export const pressure: Category = {
  id: 'pressure',
  kind: 'units',
  group: 'Science & engineering',
  title: 'Pressure Converter',
  short: 'Pressure',
  description: 'Convert pascals, kilopascals, megapascals, bar, atmospheres, psi, mmHg, inHg and torr.',
  aliases: ['psi', 'bar', 'kpa', 'atm', 'tire pressure', 'mmhg', 'blood pressure', 'barometric'],
  units: [
    linear('Pa', 'pascals', 'Pascals', 'Pa', 1, ['pascal', 'pa']),
    linear('kPa', 'kpa', 'Kilopascals', 'kPa', 1e3, ['kilopascal', 'kpa']),
    linear('MPa', 'mpa', 'Megapascals', 'MPa', 1e6, ['megapascal', 'mpa']),
    linear('bar', 'bar', 'Bar', 'bar', 1e5, ['bars']),
    linear('atm', 'atm', 'Atmospheres (standard)', 'atm', 101325, ['atmosphere', 'atmospheres']),
    linear('psi', 'psi', 'Pounds per square inch', 'psi', LBF / INCH ** 2, ['pound per square inch', 'psi']),
    linear('mmHg', 'mmhg', 'Millimeters of mercury', 'mmHg', MMHG, ['mm hg', 'millimeter of mercury', 'mmhg']),
    linear('inHg', 'inhg', 'Inches of mercury', 'inHg', MMHG * 25.4, ['in hg', 'inch of mercury', 'inhg']),
    linear('torr', 'torr', 'Torr', 'Torr', 101325 / 760, ['torr']),
  ],
  defaultFrom: 'psi',
  defaultTo: 'bar',
  pairs: [
    { from: 'psi', to: 'bar' }, { from: 'bar', to: 'psi' }, { from: 'psi', to: 'kPa' }, { from: 'kPa', to: 'psi' },
    { from: 'atm', to: 'psi' }, { from: 'psi', to: 'atm' }, { from: 'atm', to: 'Pa' }, { from: 'mmHg', to: 'kPa' },
    { from: 'inHg', to: 'kPa' }, { from: 'bar', to: 'kPa' }, { from: 'torr', to: 'Pa' },
  ],
  tableValues: [1, 5, 10, 14.7, 30, 32, 100, 1000, 5000],
  formula: 'pascals = value x unit factor (1 atm = 101,325 Pa, 1 bar = 100,000 Pa, 1 psi = 6,894.757293168 Pa, 1 mmHg = 133.322387415 Pa)',
  content: {
    explainer: 'Pressure is force per area. The SI unit is the pascal, which is tiny, so kilopascals and bar are more common. Tire gauges in the US read pounds per square inch (psi) while much of the world uses bar or kPa. Weather reports use hectopascals or inches of mercury, and blood pressure is measured in millimeters of mercury. Standard atmospheric pressure is exactly 101,325 pascals.',
    tips: ['One bar is about 14.504 psi and 100 kPa.', 'Standard atmosphere is 14.696 psi, 1.01325 bar or 760 mmHg.', 'Check whether a gauge reads absolute pressure or gauge pressure (relative to the air around you).'],
    commonMistakes: ['Confusing gauge and absolute pressure, which differ by about 14.7 psi at sea level.', 'Mixing kPa and MPa, a factor of 1,000.', 'Treating torr and mmHg as different; they agree to within a few parts per billion for practical use.'],
    example: 'A tire at 32 psi is 32 x 0.0689476 = 2.206 bar, which is 220.6 kPa. A blood pressure of 120 mmHg is 16.0 kPa.',
    faqs: [
      { q: 'How many psi is 1 bar?', a: 'One bar is about 14.5038 psi.' },
      { q: 'How many kPa is 1 atm?', a: 'One standard atmosphere is exactly 101.325 kPa.' },
      { q: 'What is 32 psi in bar?', a: '32 psi is about 2.206 bar.' },
    ],
  },
  sources: 'NIST SP 811 (standard atmosphere, psi from lbf and in, conventional mmHg 13,595.1 kg/m3 x g_n); BIPM SI Brochure (bar).',
}

export const force: Category = {
  id: 'force',
  kind: 'units',
  group: 'Science & engineering',
  title: 'Force Converter',
  short: 'Force',
  description: 'Convert newtons, kilonewtons, pounds-force, kilograms-force, dynes and poundals.',
  aliases: ['newton', 'newtons', 'lbf', 'kgf', 'thrust', 'weight force'],
  units: [
    linear('N', 'newtons', 'Newtons', 'N', 1, ['newton', 'n']),
    linear('kN', 'kilonewtons', 'Kilonewtons', 'kN', 1e3, ['kilonewton', 'kn force']),
    linear('lbf', 'pounds-force', 'Pounds-force', 'lbf', LBF, ['pound force', 'lbf']),
    linear('kgf', 'kilograms-force', 'Kilograms-force', 'kgf', G0, ['kilogram force', 'kgf']),
    linear('dyn', 'dynes', 'Dynes', 'dyn', 1e-5, ['dyne']),
    linear('pdl', 'poundals', 'Poundals', 'pdl', POUND * FOOT, ['poundal']),
  ],
  defaultFrom: 'N',
  defaultTo: 'lbf',
  pairs: [
    { from: 'N', to: 'lbf' }, { from: 'lbf', to: 'N' }, { from: 'kgf', to: 'N' }, { from: 'N', to: 'kgf' },
    { from: 'kN', to: 'lbf' }, { from: 'lbf', to: 'kN' },
  ],
  tableValues: [1, 5, 10, 50, 100, 500, 1000, 5000, 10000],
  formula: 'newtons = value x unit factor (1 lbf = 4.4482216152605 N, 1 kgf = 9.80665 N, 1 dyn = 1e-5 N)',
  content: {
    explainer: 'Force is measured in newtons, the force that accelerates one kilogram at one meter per second squared. Pounds-force and kilograms-force express the force of gravity on one pound or one kilogram at standard gravity, 9.80665 m/s2, which is how they are defined exactly. Dynes belong to the older CGS system and poundals to the foot-pound-second system.',
    tips: ['Multiply newtons by 0.2248 to get pounds-force.', 'Multiply kilograms-force by 9.80665 to get newtons.', 'A newton is roughly the weight of a small apple.'],
    commonMistakes: ['Confusing mass (kg, lb) with force (N, lbf).', 'Using 9.8 or 10 for gravity in a precise conversion.', 'Mixing pounds-force and poundals, which differ by about a factor of 32.'],
    example: 'A 100 N pull is 100 / 4.4482216 = 22.48 lbf. A 75 kgf load is 75 x 9.80665 = 735.5 N.',
    faqs: [
      { q: 'How many newtons are in a pound-force?', a: 'One pound-force is exactly 4.4482216152605 newtons.' },
      { q: 'How many newtons are in a kilogram-force?', a: 'One kilogram-force is exactly 9.80665 newtons.' },
      { q: 'What is a newton?', a: 'A newton is the force that gives a one kilogram mass an acceleration of one meter per second squared.' },
    ],
  },
  sources: 'NIST SP 811 (standard acceleration of gravity g_n = 9.80665 m/s2, pound-force, poundal, dyne).',
}

export const torque: Category = {
  id: 'torque',
  kind: 'units',
  group: 'Science & engineering',
  title: 'Torque Converter',
  short: 'Torque',
  description: 'Convert newton-meters, kilonewton-meters, pound-feet, pound-inches and kilogram-force meters.',
  aliases: ['nm', 'lb-ft', 'ft lb', 'foot pounds torque', 'wrench', 'engine torque'],
  units: [
    linear('Nm', 'newton-meters', 'Newton-meters', 'N-m', 1, ['newton meter', 'nm', 'n.m', 'n-m']),
    linear('kNm', 'kilonewton-meters', 'Kilonewton-meters', 'kN-m', 1e3, ['knm']),
    linear('lbfft', 'pound-feet', 'Pound-feet', 'lbf-ft', FOOT * LBF, ['foot pound', 'foot pounds', 'lb ft', 'ft lb', 'lb-ft']),
    linear('lbfin', 'pound-inches', 'Pound-inches', 'lbf-in', INCH * LBF, ['inch pound', 'inch pounds', 'in lb', 'lb-in']),
    linear('kgfm', 'kilogram-force-meters', 'Kilogram-force meters', 'kgf-m', G0, ['kgf m']),
  ],
  defaultFrom: 'Nm',
  defaultTo: 'lbfft',
  pairs: [
    { from: 'Nm', to: 'lbfft' }, { from: 'lbfft', to: 'Nm' }, { from: 'lbfin', to: 'Nm' }, { from: 'Nm', to: 'lbfin' },
    { from: 'lbfft', to: 'lbfin' }, { from: 'kgfm', to: 'Nm' },
  ],
  tableValues: [1, 5, 10, 25, 50, 100, 200, 300, 500],
  formula: 'newton-meters = value x unit factor (1 lbf-ft = 1.3558179483314004 N-m, 1 lbf-in = 0.1129848290276167 N-m)',
  content: {
    explainer: 'Torque is the turning effect of a force at a distance from an axis, expressed as force times length. Car engines and wheel nut specifications use newton-meters in most markets and pound-feet in the US. Small fasteners often quote pound-inches. Although foot-pounds of torque and foot-pounds of energy share a name, they measure different quantities.',
    tips: ['Multiply N-m by 0.7376 to get pound-feet.', 'Twelve pound-inches make one pound-foot.', 'Use a torque wrench set in the same unit the manufacturer lists.'],
    commonMistakes: ['Confusing pound-feet (torque) with foot-pounds of energy.', 'Mixing lbf-in and lbf-ft, a factor of 12 error that can strip or crack a bolt.', 'Applying a torque value tightened dry to a lubricated thread without checking the specification.'],
    example: 'A wheel nut torque of 100 N-m is 100 x 0.737562 = 73.76 lbf-ft. A spec of 120 lbf-in is 120 x 0.112985 = 13.56 N-m.',
    faqs: [
      { q: 'How do I convert Nm to lb-ft?', a: 'Multiply newton-meters by 0.737562 to get pound-feet.' },
      { q: 'How many lb-in are in a lb-ft?', a: 'There are 12 pound-inches in one pound-foot.' },
      { q: 'Is Nm the same as joules?', a: 'They have the same dimensions, but torque is a rotational effect and energy is work done, so they are used for different quantities.' },
    ],
  },
  sources: 'NIST SP 811 (pound-force, foot, inch, g_n); SI Brochure (newton-meter).',
}

export const density: Category = {
  id: 'density',
  kind: 'units',
  group: 'Science & engineering',
  title: 'Density Converter',
  short: 'Density',
  description: 'Convert kg/m3, g/cm3, g/mL, kg/L, lb/ft3, lb/in3 and lb/gal.',
  aliases: ['specific gravity', 'mass per volume', 'g/cm3', 'kg/m3', 'lb/ft3'],
  units: [
    linear('kgm3', 'kg-m3', 'Kilograms per cubic meter', 'kg/m3', 1, ['kg/m3', 'kg/m^3']),
    linear('gcm3', 'g-cm3', 'Grams per cubic centimeter', 'g/cm3', 1000, ['g/cm3', 'g/cc', 'gcc']),
    linear('gml', 'g-ml', 'Grams per milliliter', 'g/mL', 1000, ['g/ml']),
    linear('kgl', 'kg-l', 'Kilograms per liter', 'kg/L', 1000, ['kg/l']),
    linear('lbft3', 'lb-ft3', 'Pounds per cubic foot', 'lb/ft3', POUND / FOOT ** 3, ['lb/ft3', 'pcf']),
    linear('lbin3', 'lb-in3', 'Pounds per cubic inch', 'lb/in3', POUND / INCH ** 3, ['lb/in3']),
    linear('lbgal', 'lb-gal', 'Pounds per US gallon', 'lb/gal', POUND / US_GAL, ['lb/gal']),
  ],
  defaultFrom: 'gcm3',
  defaultTo: 'lbft3',
  pairs: [
    { from: 'gcm3', to: 'kgm3' }, { from: 'kgm3', to: 'gcm3' }, { from: 'gcm3', to: 'lbft3' }, { from: 'lbft3', to: 'kgm3' },
    { from: 'kgm3', to: 'lbft3' }, { from: 'lbgal', to: 'kgl' },
  ],
  tableValues: [0.5, 1, 2, 5, 7.8, 10, 100, 1000, 2700],
  formula: 'kg/m3 = value x unit factor (1 g/cm3 = 1,000 kg/m3, 1 lb/ft3 = 16.018463373960138 kg/m3)',
  content: {
    explainer: 'Density is mass divided by volume. Pure water at about 4 degrees C has a density of roughly 1,000 kg/m3, which is 1 g/cm3 or 1 kg/L. Engineers often use kilograms per cubic meter, chemists use grams per milliliter, and US builders use pounds per cubic foot. Specific gravity is density relative to water, so for most purposes it equals density in g/cm3.',
    tips: ['g/cm3, g/mL and kg/L are all the same number.', 'Multiply g/cm3 by 62.428 to get lb/ft3.', 'Density changes with temperature, so quote it with a reference temperature when precision matters.'],
    commonMistakes: ['Forgetting that 1 g/cm3 is 1,000 kg/m3, not 1.', 'Mixing US and imperial gallons in lb/gal figures.', 'Using a density at one temperature for a liquid heated well above it.'],
    example: 'Steel at about 7.85 g/cm3 is 7,850 kg/m3, which is 490 lb/ft3. Water at 1 g/cm3 is 62.43 lb/ft3.',
    faqs: [
      { q: 'What is the density of water in kg/m3?', a: 'About 1,000 kg/m3 near 4 degrees C, slightly less at room temperature.' },
      { q: 'How do I convert g/cm3 to kg/m3?', a: 'Multiply by 1,000.' },
      { q: 'How many lb/ft3 is 1 g/cm3?', a: '1 g/cm3 is about 62.428 pounds per cubic foot.' },
    ],
  },
  sources: 'NIST SP 811 (pound, foot, inch, US gallon).',
}

const MPG_US_TO_KML = MILE / 1000 / (US_GAL * 1000) // km per liter per mpg(US)
const MPG_UK_TO_KML = MILE / 1000 / (UK_GAL * 1000)

function reciprocal(id: string, slug: string, label: string, symbol: string, k: number, aliases: string[]): Unit {
  // Stored base is km/L. This unit = k / (km/L) (e.g. L/100km = 100 / kmL).
  return {
    id, slug, label, symbol, aliases,
    toBase: v => (v === 0 ? Infinity : k / v),
    fromBase: b => (b === 0 ? Infinity : k / b),
  }
}

export const fuelEconomy: Category = {
  id: 'fuel-economy',
  kind: 'units',
  group: 'Everyday',
  title: 'Fuel Economy Converter',
  short: 'Fuel Economy',
  description: 'Convert miles per gallon (US and UK), kilometers per liter and liters per 100 kilometers.',
  aliases: ['mpg', 'gas mileage', 'fuel consumption', 'l/100km', 'km/l', 'petrol', 'miles per gallon'],
  units: [
    linear('mpgus', 'mpg-us', 'Miles per US gallon', 'mpg (US)', MPG_US_TO_KML, ['mpg', 'us mpg', 'miles per gallon']),
    linear('mpguk', 'mpg-uk', 'Miles per UK gallon', 'mpg (UK)', MPG_UK_TO_KML, ['uk mpg', 'imperial mpg']),
    linear('kml', 'km-l', 'Kilometers per liter', 'km/L', 1, ['kpl', 'km/l', 'km per liter']),
    reciprocal('l100', 'l-100km', 'Liters per 100 km', 'L/100km', 100, ['l/100km', 'litres per 100 km', 'l per 100 km']),
  ],
  defaultFrom: 'mpgus',
  defaultTo: 'l100',
  pairs: [
    { from: 'mpgus', to: 'l100' }, { from: 'l100', to: 'mpgus' }, { from: 'mpgus', to: 'kml' }, { from: 'kml', to: 'mpgus' },
    { from: 'mpguk', to: 'mpgus' }, { from: 'mpgus', to: 'mpguk' }, { from: 'l100', to: 'mpguk' }, { from: 'l100', to: 'kml' },
  ],
  tableValues: [5, 8, 10, 15, 20, 25, 30, 40, 50],
  formula: 'km/L = mpg x 1.609344 / 3.785411784 (US) ;  L/100km = 100 / (km/L) ;  mpg and L/100km are reciprocals',
  content: {
    explainer: 'Fuel economy is expressed two opposite ways. Miles per gallon and kilometers per liter measure distance per unit of fuel, so higher is better. Liters per 100 kilometers measures fuel per distance, so lower is better, and it is the reciprocal of the others. US and UK gallons differ by about 20 percent, so a UK mpg figure is higher than the US figure for the same car.',
    tips: ['Divide 235.215 by the US mpg figure to get L/100km, and the other way round.', 'Divide 282.481 by the UK mpg figure to get L/100km.', 'Compare cars in the same unit, ideally L/100km, to see fuel saved per distance.'],
    commonMistakes: ['Comparing a US mpg figure with a UK mpg figure directly.', 'Assuming a 10 mpg improvement saves the same fuel from 15 to 25 mpg as from 40 to 50 mpg (it does not).', 'Dividing instead of using the reciprocal when switching between mpg and L/100km.'],
    example: 'A car rated at 30 mpg (US) uses 235.215 / 30 = 7.84 L/100km. The same car in UK mpg is about 36 mpg.',
    faqs: [
      { q: 'How do I convert mpg to L/100km?', a: 'Divide 235.215 by the mpg value (US gallons). For UK gallons divide 282.481.' },
      { q: 'Is 30 mpg good?', a: '30 mpg (US) is about 7.8 L/100km, which is typical for a modern midsize car.' },
      { q: 'Why are US and UK mpg different?', a: 'The UK gallon (4.546 L) is larger than the US gallon (3.785 L), so the same car covers more miles per gallon on the UK scale.' },
    ],
  },
  sources: 'NIST SP 811 (mile, US gallon); UK imperial gallon = 4.54609 L.',
}

export const angle: Category = {
  id: 'angle',
  kind: 'units',
  group: 'Science & engineering',
  title: 'Angle Converter',
  short: 'Angle',
  description: 'Convert degrees, radians, gradians, arcminutes, arcseconds and turns.',
  aliases: ['degrees', 'radians', 'degree', 'radian', 'gradian', 'rotation', 'deg to rad', 'rad to deg'],
  units: [
    linear('deg', 'degrees', 'Degrees', '°', Math.PI / 180, ['degree', 'deg']),
    linear('rad', 'radians', 'Radians', 'rad', 1, ['radian', 'rad']),
    linear('grad', 'gradians', 'Gradians', 'grad', Math.PI / 200, ['gradian', 'gon', 'grad']),
    linear('arcmin', 'arcminutes', 'Arcminutes', "'", Math.PI / 10800, ['arcminute', 'arc minute', 'minute of arc']),
    linear('arcsec', 'arcseconds', 'Arcseconds', '"', Math.PI / 648000, ['arcsecond', 'arc second', 'second of arc']),
    linear('turn', 'turns', 'Turns (revolutions)', 'turn', 2 * Math.PI, ['turn', 'revolution', 'rev', 'cycle']),
  ],
  defaultFrom: 'deg',
  defaultTo: 'rad',
  pairs: [
    { from: 'deg', to: 'rad' }, { from: 'rad', to: 'deg' }, { from: 'deg', to: 'grad' }, { from: 'grad', to: 'deg' },
    { from: 'deg', to: 'arcmin' }, { from: 'arcsec', to: 'deg' }, { from: 'turn', to: 'deg' }, { from: 'rad', to: 'turn' },
  ],
  tableValues: [1, 15, 30, 45, 60, 90, 180, 270, 360],
  formula: 'radians = degrees x pi / 180;  1 turn = 360 degrees = 400 gradians = 2 pi radians',
  content: {
    explainer: 'An angle can be measured in degrees, where a full circle is 360, in radians, where a full circle is 2 pi, or in gradians, where a full circle is 400. Radians are the natural unit in mathematics and physics because they make formulas such as arc length equal to radius times angle. Arcminutes and arcseconds are 1/60 and 1/3600 of a degree and are used in navigation and astronomy.',
    tips: ['Multiply degrees by 0.017453 to get radians; multiply radians by 57.2958 to get degrees.', 'A right angle is 90 degrees, pi/2 radians or 100 gradians.', 'Set your calculator to the right angle mode before using sine or cosine.'],
    commonMistakes: ['Leaving a calculator in degree mode when the formula expects radians.', 'Confusing arcminutes with minutes of time.', 'Treating gradians as degrees; a gradian is 0.9 degrees.'],
    example: '180 degrees is pi radians (3.14159). A bearing of 45 degrees is 0.7854 radians, or 50 gradians.',
    faqs: [
      { q: 'How many degrees is one radian?', a: 'One radian is about 57.2958 degrees.' },
      { q: 'How many degrees in a full circle?', a: '360 degrees, which is 2 pi radians or 400 gradians.' },
      { q: 'How many arcseconds are in a degree?', a: 'There are 3,600 arcseconds in a degree.' },
    ],
  },
  sources: 'BIPM SI Brochure (radian; degree, arcminute, arcsecond as accepted units).',
}

export const frequency: Category = {
  id: 'frequency',
  kind: 'units',
  group: 'Science & engineering',
  title: 'Frequency Converter',
  short: 'Frequency',
  description: 'Convert hertz, kilohertz, megahertz, gigahertz, revolutions per minute and radians per second.',
  aliases: ['hertz', 'hz', 'ghz', 'mhz', 'khz', 'rpm', 'cycles per second'],
  units: [
    linear('Hz', 'hertz', 'Hertz', 'Hz', 1, ['hz']),
    linear('kHz', 'khz', 'Kilohertz', 'kHz', 1e3, ['khz']),
    linear('MHz', 'mhz', 'Megahertz', 'MHz', 1e6, ['mhz']),
    linear('GHz', 'ghz', 'Gigahertz', 'GHz', 1e9, ['ghz']),
    linear('rpm', 'rpm', 'Revolutions per minute', 'rpm', 1 / 60, ['revolutions per minute', 'rev/min']),
    linear('rads', 'rad-per-second', 'Radians per second', 'rad/s', 1 / (2 * Math.PI), ['rad/s', 'angular velocity']),
  ],
  defaultFrom: 'MHz',
  defaultTo: 'GHz',
  pairs: [
    { from: 'MHz', to: 'GHz' }, { from: 'GHz', to: 'MHz' }, { from: 'Hz', to: 'kHz' }, { from: 'kHz', to: 'Hz' },
    { from: 'rpm', to: 'Hz' }, { from: 'Hz', to: 'rpm' }, { from: 'rpm', to: 'rads' }, { from: 'rads', to: 'rpm' },
  ],
  tableValues: [1, 10, 33.33, 45, 60, 100, 440, 1000, 3000],
  formula: 'hertz = value x unit factor (1 rpm = 1/60 Hz; 1 rad/s = 1/(2 pi) Hz)',
  content: {
    explainer: 'Frequency counts how many times something repeats each second; one hertz is one cycle per second. Radio uses kilohertz to gigahertz, computer processors are rated in gigahertz, and engines and turntables use revolutions per minute. Angular velocity in radians per second is related to frequency by a factor of 2 pi, which is why rotating machinery is described in whichever of the three units suits the field.',
    tips: ['Divide rpm by 60 to get hertz.', 'Multiply hertz by 2 pi to get radians per second.', 'The concert pitch A above middle C is 440 Hz.'],
    commonMistakes: ['Confusing frequency in Hz with angular frequency in rad/s, a factor of about 6.28.', 'Treating rpm as a per-second unit.', 'Mixing MHz and GHz when reading CPU or Wi-Fi bands.'],
    example: 'A record at 33 1/3 rpm turns 0.5556 times each second (0.5556 Hz). A 3 GHz processor ticks 3,000,000,000 times a second.',
    faqs: [
      { q: 'How many Hz is 60 rpm?', a: '60 revolutions per minute is exactly 1 Hz.' },
      { q: 'How many MHz in a GHz?', a: 'There are 1,000 MHz in one GHz.' },
      { q: 'How do I convert Hz to rad/s?', a: 'Multiply by 2 pi (about 6.2832).' },
    ],
  },
  sources: 'BIPM SI Brochure (hertz; radian).',
}

export const flowRate: Category = {
  id: 'flow-rate',
  kind: 'units',
  group: 'Cooking & water',
  title: 'Flow Rate Converter',
  short: 'Flow Rate',
  description: 'Convert liters per second and minute, cubic meters per hour, US and UK gallons per minute, cubic feet per second and minute, and milliliters per minute.',
  aliases: ['gpm', 'water flow', 'pump', 'gallons per minute', 'liters per minute', 'lpm', 'cfm', 'cfs', 'm3/h'],
  units: [
    linear('Ls', 'liters-per-second', 'Liters per second', 'L/s', 1e-3, ['l/s', 'lps']),
    linear('Lmin', 'liters-per-minute', 'Liters per minute', 'L/min', 1e-3 / 60, ['l/min', 'lpm']),
    linear('m3h', 'cubic-meters-per-hour', 'Cubic meters per hour', 'm3/h', 1 / 3600, ['m3/h', 'm3/hr']),
    linear('m3s', 'cubic-meters-per-second', 'Cubic meters per second', 'm3/s', 1, ['m3/s', 'cumec']),
    linear('gpm', 'gpm', 'US gallons per minute', 'GPM', US_GAL / 60, ['gpm', 'gallons per minute', 'us gpm']),
    linear('gpmuk', 'gpm-uk', 'UK gallons per minute', 'GPM (UK)', UK_GAL / 60, ['imperial gpm']),
    linear('cfs', 'cfs', 'Cubic feet per second', 'ft3/s', FOOT ** 3, ['cfs', 'ft3/s']),
    linear('cfm', 'cfm', 'Cubic feet per minute', 'ft3/min', FOOT ** 3 / 60, ['cfm', 'ft3/min']),
    linear('mlmin', 'milliliters-per-minute', 'Milliliters per minute', 'mL/min', 1e-6 / 60, ['ml/min']),
  ],
  defaultFrom: 'gpm',
  defaultTo: 'Lmin',
  pairs: [
    { from: 'gpm', to: 'Lmin' }, { from: 'Lmin', to: 'gpm' }, { from: 'm3h', to: 'Lmin' }, { from: 'Lmin', to: 'm3h' },
    { from: 'gpm', to: 'm3h' }, { from: 'm3h', to: 'gpm' }, { from: 'cfm', to: 'Ls' }, { from: 'cfm', to: 'm3h' },
    { from: 'Ls', to: 'gpm' }, { from: 'cfs', to: 'm3s' },
  ],
  tableValues: [1, 2, 5, 10, 20, 50, 100, 500, 1000],
  formula: 'cubic meters per second = value x unit factor (1 GPM = 3.785411784 L / 60 s; 1 m3/h = 1/3,600 m3/s)',
  content: {
    explainer: 'Flow rate is volume per unit of time. Plumbing and pumps in the US are rated in gallons per minute, while metric plumbing uses liters per minute or cubic meters per hour. Air handling uses cubic feet per minute, and rivers are measured in cubic meters or cubic feet per second. The same number means different things for US and UK gallons, so check which one a pump label uses.',
    tips: ['Multiply US gallons per minute by 3.785 to get liters per minute.', 'Divide cubic meters per hour by 3.6 to get liters per second.', 'Shower heads in the US are limited to about 2.5 GPM, roughly 9.5 L/min.'],
    commonMistakes: ['Mixing US and UK GPM.', 'Confusing m3/h with m3/s, a factor of 3,600.', 'Reading a pump curve at the wrong head or pressure rather than the quoted flow.'],
    example: 'A pump rated at 10 GPM moves 10 x 3.785411784 = 37.85 liters per minute, which is 2.27 cubic meters per hour.',
    faqs: [
      { q: 'How many liters per minute is 1 GPM?', a: 'One US gallon per minute is 3.785411784 liters per minute.' },
      { q: 'How do I convert m3/h to L/min?', a: 'Multiply cubic meters per hour by 1,000 and divide by 60 (about 16.667).' },
      { q: 'What is CFM?', a: 'CFM is cubic feet per minute, a common unit for air flow in fans and ventilation. One CFM is about 0.4719 L/s.' },
    ],
  },
  sources: 'NIST SP 811 (US gallon, cubic foot); UK imperial gallon = 4.54609 L.',
}

export const rainfall: Category = {
  id: 'rainfall',
  kind: 'units',
  group: 'Cooking & water',
  title: 'Rainfall Converter',
  short: 'Rainfall',
  description: 'Convert rainfall depth between millimeters, centimeters, inches and liters per square meter.',
  aliases: ['rain', 'precipitation', 'mm of rain', 'inches of rain', 'rain gauge', 'snow', 'water depth'],
  units: [
    linear('mm', 'millimeters', 'Millimeters', 'mm', 1e-3, ['millimetre', 'mm']),
    linear('cm', 'centimeters', 'Centimeters', 'cm', 1e-2, ['centimetre', 'cm']),
    linear('in', 'inches', 'Inches', 'in', INCH, ['inch', 'in']),
    linear('lm2', 'liters-per-square-meter', 'Liters per square meter', 'L/m2', 1e-3, ['l/m2', 'litres per square metre']),
  ],
  defaultFrom: 'mm',
  defaultTo: 'in',
  pairs: [
    { from: 'mm', to: 'in' }, { from: 'in', to: 'mm' }, { from: 'cm', to: 'in' }, { from: 'in', to: 'cm' },
    { from: 'mm', to: 'lm2' }, { from: 'lm2', to: 'in' },
  ],
  tableValues: [1, 2, 5, 10, 25.4, 50, 100, 250, 500],
  formula: 'meters of depth = value x unit factor (1 in = 25.4 mm exactly; 1 mm of rain = 1 L per m2)',
  content: {
    explainer: 'Rainfall is reported as the depth of water that would collect on flat ground. Meteorological services outside the US use millimeters, while US reports use inches. One millimeter of rain is the same as one liter of water spread over one square meter, which is why the two units give identical numbers. One inch of rain is exactly 25.4 millimeters.',
    tips: ['Divide millimeters by 25.4 to get inches.', '1 mm of rain on 1 m2 is 1 liter.', 'A roof area in square meters times millimeters of rain gives liters collected.'],
    commonMistakes: ['Assuming 1 inch of snow equals 1 inch of rain; snow is usually ten times as deep as its water equivalent.', 'Forgetting that rainfall depth does not depend on area but total volume does.', 'Mixing monthly totals with single-event totals.'],
    example: '50 mm of rain is 50 / 25.4 = 1.97 inches. On a 40 m2 roof that is 40 x 50 = 2,000 liters of water.',
    faqs: [
      { q: 'How many mm is an inch of rain?', a: 'One inch is exactly 25.4 millimeters.' },
      { q: 'How many liters is 1 mm of rain?', a: 'One millimeter of rain over one square meter is exactly one liter.' },
      { q: 'How many gallons of water fall on an acre with an inch of rain?', a: 'About 27,154 US gallons, since an acre is 43,560 square feet and an inch is 1/12 ft.' },
    ],
  },
  sources: 'NIST SP 811 (international inch = 25.4 mm); definition of the liter (1 L = 1 dm3).',
}

export const typography: Category = {
  id: 'typography',
  kind: 'units',
  group: 'Developer & design',
  title: 'Typography and CSS Unit Converter',
  short: 'Typography',
  description: 'Convert pixels, points, picas, em, rem, inches, millimeters and centimeters for web and print, with an adjustable base font size.',
  aliases: ['px to rem', 'px to em', 'pt to px', 'css', 'font size', 'rem to px', 'pixels', 'points', 'picas', 'web design'],
  units: [
    linear('px', 'px', 'Pixels (CSS px)', 'px', INCH / 96, ['pixel', 'pixels', 'css px']),
    linear('pt', 'pt', 'Points', 'pt', INCH / 72, ['point', 'points']),
    linear('pc', 'pc', 'Picas', 'pc', INCH / 6, ['pica', 'picas']),
    linear('in', 'in', 'Inches', 'in', INCH, ['inch', 'inches']),
    linear('mm', 'mm', 'Millimeters', 'mm', 1e-3, ['millimeter', 'millimetre']),
    linear('cm', 'cm', 'Centimeters', 'cm', 1e-2, ['centimeter', 'centimetre']),
    {
      id: 'em', slug: 'em', label: 'em (relative to base font size)', symbol: 'em', aliases: ['ems'],
      toBase: (v, c) => (v * (c.baseFontPx ?? 16) * INCH) / 96,
      fromBase: (b, c) => (b * 96) / INCH / (c.baseFontPx ?? 16),
    },
    {
      id: 'rem', slug: 'rem', label: 'rem (relative to root font size)', symbol: 'rem', aliases: ['rems'],
      toBase: (v, c) => (v * (c.baseFontPx ?? 16) * INCH) / 96,
      fromBase: (b, c) => (b * 96) / INCH / (c.baseFontPx ?? 16),
    },
  ],
  defaultFrom: 'px',
  defaultTo: 'rem',
  defaultValue: '16',
  pairs: [
    { from: 'px', to: 'rem' }, { from: 'rem', to: 'px' }, { from: 'px', to: 'em' }, { from: 'em', to: 'px' },
    { from: 'px', to: 'pt' }, { from: 'pt', to: 'px' }, { from: 'pt', to: 'mm' }, { from: 'mm', to: 'px' },
    { from: 'in', to: 'px' }, { from: 'px', to: 'in' },
  ],
  tableValues: [8, 10, 12, 14, 16, 18, 24, 32, 48],
  ctxInput: { id: 'baseFontPx', label: 'Base font size (px)', default: 16 },
  formula: 'CSS defines 1 in = 96 px = 72 pt = 6 pc; rem and em = px / base font size (default 16 px)',
  content: {
    explainer: 'On the web, CSS fixes the reference pixel at 1/96 of an inch, a point at 1/72 of an inch and a pica at 12 points, so 1 inch is 96 px, 72 pt and 6 pc. Relative units such as em and rem scale with a base font size, which browsers set to 16 pixels by default. Using rem for type and spacing keeps a layout responsive to the reader\'s font preference.',
    tips: ['At the default 16 px base, 1 rem is 16 px and 0.75 rem is 12 px.', 'Divide px by the base size for rem; multiply rem by the base size for px.', 'Use rem for font sizes so users who raise their browser font size get larger text.'],
    commonMistakes: ['Assuming 1 em always equals 16 px; em depends on the parent element font size, and the base here is adjustable.', 'Treating a CSS pixel as a physical device pixel on high density screens.', 'Using pt on screens when the design brief is in px.'],
    example: '24 px at a 16 px base is 24 / 16 = 1.5 rem. A 12 pt print font is 12 x 96 / 72 = 16 px.',
    faqs: [
      { q: 'How do I convert px to rem?', a: 'Divide the pixel value by the root font size. With the default 16 px, 24 px is 1.5 rem.' },
      { q: 'How many px is 1 pt?', a: 'One point is 96/72, which is 1.3333 CSS pixels.' },
      { q: 'What is the difference between em and rem?', a: 'rem is relative to the root element font size, while em is relative to the font size of the element it is used in. This tool uses one base size for both.' },
    ],
  },
  sources: 'CSS Values and Units Module Level 3/4 (W3C): 1in = 96px = 2.54cm, 1pt = 1/72in, 1pc = 12pt.',
}
