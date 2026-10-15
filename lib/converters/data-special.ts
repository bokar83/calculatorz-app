// Special-kind categories: ingredient (volume to mass via density), sizes (approximate), numerals.
import { linear, affine, type Category, type Ingredient, type Unit } from './engine.ts'
import { INCH, FOOT, POUND, US_GAL, UK_GAL } from './data-physical.ts'

const CUP_ML = 236.5882365 // US cup in mL (231 in^3 / 16, exact)

function vol(id: string, slug: string, label: string, symbol: string, ml: number, aliases: string[] = []): Unit {
  return { ...linear(id, slug, label, symbol, ml, aliases), dim: 'v' }
}
function mass(id: string, slug: string, label: string, symbol: string, g: number, aliases: string[] = []): Unit {
  return { ...linear(id, slug, label, symbol, g, aliases), dim: 'm' }
}

// Grams per US cup from the King Arthur Baking "Ingredient Weight Chart" (per-measure values scaled to 1 cup).
export const KA = 'King Arthur Baking, Ingredient Weight Chart (kingarthurbaking.com/learn/ingredient-weight-chart)'
export const ingredients: Ingredient[] = [
  { id: 'ap-flour', slug: 'flour', label: 'All-purpose flour', gPerCup: 120 },
  { id: 'bread-flour', slug: 'bread-flour', label: 'Bread flour', gPerCup: 120 },
  { id: 'whole-wheat', slug: 'whole-wheat-flour', label: 'Whole wheat flour', gPerCup: 113 },
  { id: 'cake-flour', slug: 'cake-flour', label: 'Cake flour', gPerCup: 120 },
  { id: 'sugar', slug: 'sugar', label: 'Granulated sugar', gPerCup: 198 },
  { id: 'brown-sugar', slug: 'brown-sugar', label: 'Brown sugar (packed)', gPerCup: 213 },
  { id: 'powdered-sugar', slug: 'powdered-sugar', label: 'Powdered sugar (unsifted)', gPerCup: 113 },
  { id: 'butter', slug: 'butter', label: 'Butter', gPerCup: 226 }, // 8 tbsp = 113 g
  { id: 'honey', slug: 'honey', label: 'Honey', gPerCup: 336 }, // 1 tbsp = 21 g x 16
  { id: 'veg-oil', slug: 'vegetable-oil', label: 'Vegetable oil', gPerCup: 198 },
  { id: 'olive-oil', slug: 'olive-oil', label: 'Olive oil', gPerCup: 200 }, // 1/4 cup = 50 g
  { id: 'cocoa', slug: 'cocoa-powder', label: 'Cocoa powder (unsweetened)', gPerCup: 84 }, // 1/2 cup = 42 g
  { id: 'oats', slug: 'rolled-oats', label: 'Rolled oats', gPerCup: 113 },
  { id: 'rice', slug: 'rice', label: 'Long-grain rice (dry)', gPerCup: 198 }, // 1/2 cup = 99 g
  { id: 'salt', slug: 'table-salt', label: 'Table salt', gPerCup: 288 }, // 1 tbsp = 18 g x 16
  { id: 'peanut-butter', slug: 'peanut-butter', label: 'Peanut butter', gPerCup: 270 }, // 1/2 cup = 135 g
  { id: 'maple', slug: 'maple-syrup', label: 'Maple syrup', gPerCup: 312 }, // 1/2 cup = 156 g
  { id: 'cornstarch', slug: 'cornstarch', label: 'Cornstarch', gPerCup: 112 }, // 1/4 cup = 28 g
  { id: 'water', slug: 'water', label: 'Water (20 C)', gPerCup: 0.998207 * CUP_ML },
]

export const cooking: Category = {
  id: 'cooking',
  kind: 'ingredient',
  group: 'Cooking & water',
  title: 'Cooking Measurement Converter',
  short: 'Cooking',
  description: 'Convert cups, tablespoons, teaspoons and milliliters to grams, ounces and pounds for flour, sugar, butter, honey and other common ingredients.',
  aliases: ['baking', 'recipe', 'cups to grams', 'grams to cups', 'cup of flour', 'cup of sugar', 'tablespoon to grams', 'teaspoon', 'kitchen'],
  units: [
    vol('cup', 'cups', 'Cups (US)', 'cup', CUP_ML, ['cup', 'cups']),
    vol('tbsp', 'tablespoons', 'Tablespoons (US)', 'tbsp', CUP_ML / 16, ['tablespoon', 'tbsp']),
    vol('tsp', 'teaspoons', 'Teaspoons (US)', 'tsp', CUP_ML / 48, ['teaspoon', 'tsp']),
    vol('floz', 'fluid-ounces', 'Fluid ounces (US)', 'fl oz', CUP_ML / 8, ['fl oz', 'fluid ounce']),
    vol('ml', 'milliliters', 'Milliliters', 'mL', 1, ['millilitre', 'ml']),
    vol('l', 'liters', 'Liters', 'L', 1000, ['litre', 'l']),
    mass('g', 'grams', 'Grams', 'g', 1, ['gram', 'g']),
    mass('kg', 'kg', 'Kilograms', 'kg', 1000, ['kilogram', 'kilo']),
    mass('oz', 'ounces', 'Ounces (weight)', 'oz', (POUND * 1000) / 16, ['ounce', 'oz']),
    mass('lb', 'pounds', 'Pounds', 'lb', POUND * 1000, ['pound', 'lb', 'lbs']),
  ],
  ingredients,
  defaultIngredient: 'ap-flour',
  defaultFrom: 'cup',
  defaultTo: 'g',
  pairs: [
    { from: 'cup', to: 'g', ingredient: 'ap-flour' }, { from: 'cup', to: 'g', ingredient: 'sugar' },
    { from: 'cup', to: 'g', ingredient: 'brown-sugar' }, { from: 'cup', to: 'g', ingredient: 'butter' },
    { from: 'cup', to: 'g', ingredient: 'powdered-sugar' }, { from: 'cup', to: 'g', ingredient: 'honey' },
    { from: 'cup', to: 'g', ingredient: 'rice' }, { from: 'cup', to: 'g', ingredient: 'oats' },
    { from: 'g', to: 'cup', ingredient: 'ap-flour' }, { from: 'g', to: 'cup', ingredient: 'sugar' },
    { from: 'tbsp', to: 'g', ingredient: 'butter' }, { from: 'tsp', to: 'g', ingredient: 'sugar' },
    { from: 'cup', to: 'ml', ingredient: 'water' },
  ],
  tableValues: [0.25, 0.5, 1, 2, 3],
  approximate: 'Ingredient weights are approximate. They depend on how an ingredient is scooped, packed or sifted, and on brand. For baking accuracy, weigh ingredients on a kitchen scale.',
  formula: 'grams = cups x grams per cup for that ingredient (1 US cup = 236.5882365 mL exactly)',
  content: {
    explainer: 'A cup measures volume while a gram measures mass, so the conversion depends on how heavy the ingredient is for its volume. A cup of all-purpose flour weighs about 120 grams, a cup of granulated sugar about 198 grams, and a cup of water about 236 grams. This tool uses published ingredient weight charts from a professional baking source and a US customary cup of exactly 236.5882365 mL. Weighing is more accurate than scooping because flour can vary by 20 percent depending on how it is packed.',
    tips: ['Spoon flour into the cup and level it; scooping straight from the bag packs in up to 20 percent more.', 'For recipes from outside the US, check whether "cup" means 250 mL (metric cup) instead of 236.6 mL.', 'A kitchen scale removes nearly all of the guesswork when baking.'],
    commonMistakes: ['Assuming a cup of every ingredient weighs the same.', 'Mixing fluid ounces (volume) with ounces (weight).', 'Using the flour figure for whole wheat or cake flour, which weigh differently.'],
    example: '2 cups of all-purpose flour is about 2 x 120 = 240 grams. 1 cup of butter (two sticks) is about 226 grams.',
    faqs: [
      { q: 'How many grams are in a cup of flour?', a: 'About 120 grams for all-purpose flour, using the common baking chart value.' },
      { q: 'How many grams are in a cup of sugar?', a: 'About 198 grams for granulated white sugar.' },
      { q: 'Why do cup-to-gram conversions vary between websites?', a: 'Ingredients compact differently, and each source measures a different scoop method, so the numbers differ by a few percent.' },
    ],
  },
  sources: `Ingredient grams per cup: ${KA}. Volume units: NIST Handbook 44 Appendix B (US cup, tablespoon, teaspoon, fluid ounce).`,
}

const WATER_NOTE = 'Water density from the CRC Handbook of Chemistry and Physics (g/mL): 4 C 0.999975, 20 C 0.998207, 25 C 0.997048, 100 C 0.958365; seawater is typically about 1.025.'
export const waterIngredients: Ingredient[] = [
  { id: 'w20', slug: 'water', label: 'Fresh water at 20 C (room temperature)', gPerCup: 0.998207 * CUP_ML },
  { id: 'w4', slug: 'water-4c', label: 'Fresh water at 4 C (maximum density)', gPerCup: 0.999975 * CUP_ML },
  { id: 'w25', slug: 'water-25c', label: 'Fresh water at 25 C', gPerCup: 0.997048 * CUP_ML },
  { id: 'w100', slug: 'water-100c', label: 'Water at 100 C (boiling)', gPerCup: 0.958365 * CUP_ML },
  { id: 'sea', slug: 'seawater', label: 'Seawater (typical, about 1.025 g/mL)', gPerCup: 1.025 * CUP_ML },
]

export const waterWeight: Category = {
  id: 'water-weight',
  kind: 'ingredient',
  group: 'Cooking & water',
  title: 'Water Volume to Weight Converter',
  short: 'Water Weight',
  description: 'Convert water volume to weight and back: gallons, liters, cups and cubic feet to pounds, kilograms and ounces, at different water temperatures.',
  aliases: ['how much does water weigh', 'water weight', 'gallon of water', 'liter of water', 'water mass', 'gallons to pounds', 'liters to kg'],
  units: [
    vol('l', 'liters', 'Liters', 'L', 1000, ['litre', 'liters', 'l']),
    vol('ml', 'milliliters', 'Milliliters', 'mL', 1, ['millilitre', 'ml']),
    vol('gal', 'gallons', 'Gallons (US)', 'gal', US_GAL * 1e6, ['gallon', 'gal', 'us gallon']),
    vol('galuk', 'uk-gallons', 'Gallons (UK)', 'gal UK', UK_GAL * 1e6, ['imperial gallon']),
    vol('cup', 'cups', 'Cups (US)', 'cup', CUP_ML, ['cup']),
    vol('floz', 'fluid-ounces', 'Fluid ounces (US)', 'fl oz', CUP_ML / 8, ['fl oz']),
    vol('ft3', 'cubic-feet', 'Cubic feet', 'ft3', FOOT ** 3 * 1e6, ['cubic foot', 'cu ft']),
    vol('m3', 'cubic-meters', 'Cubic meters', 'm3', 1e6, ['cubic metre', 'm3']),
    mass('kg', 'kg', 'Kilograms', 'kg', 1000, ['kilogram', 'kilo']),
    mass('g', 'grams', 'Grams', 'g', 1, ['gram']),
    mass('lb', 'lbs', 'Pounds', 'lb', POUND * 1000, ['pound', 'pounds', 'lbs']),
    mass('oz', 'ounces', 'Ounces (weight)', 'oz', (POUND * 1000) / 16, ['ounce']),
    mass('t', 'tonnes', 'Metric tonnes', 't', 1e6, ['tonne', 'metric ton']),
  ],
  ingredients: waterIngredients,
  defaultIngredient: 'w20',
  defaultFrom: 'gal',
  defaultTo: 'lb',
  pairs: [
    { from: 'gal', to: 'lb', ingredient: 'w20' }, { from: 'l', to: 'kg', ingredient: 'w20' },
    { from: 'lb', to: 'gal', ingredient: 'w20' }, { from: 'kg', to: 'l', ingredient: 'w20' },
    { from: 'ft3', to: 'lb', ingredient: 'w20' }, { from: 'gal', to: 'kg', ingredient: 'w20' },
    { from: 'cup', to: 'g', ingredient: 'w20' }, { from: 'm3', to: 't', ingredient: 'w20' },
  ],
  tableValues: [1, 2, 5, 10, 20, 50, 100],
  formula: 'mass = volume x density (water at 20 C is 0.998207 g/mL; 1 US gal = 3.785411784 L)',
  content: {
    explainer: 'The metric system was built around water: one liter of pure water at its densest, about 4 degrees C, has a mass of almost exactly one kilogram. At room temperature the figure is 0.998 kg per liter, and hot water is lighter per liter. A US gallon of fresh water weighs about 8.33 pounds, and a cubic foot weighs about 62.3 pounds. Seawater is about 2.5 percent denser than fresh water because of dissolved salt.',
    tips: ['For quick estimates use 1 liter = 1 kilogram and 1 US gallon = 8.34 pounds.', 'A 50 gallon water heater holds roughly 416 pounds of water when full.', 'Use the temperature selector for hot or cold water if precision matters.'],
    commonMistakes: ['Using the US gallon figure (8.33 lb) for an imperial gallon, which holds about 10.0 lb.', 'Forgetting that a container adds its own weight to the water.', 'Using 1 kg per liter for seawater or brine.'],
    example: 'A 10 US gallon aquarium holds 10 x 3.785411784 x 0.998207 = 37.79 kg of fresh water at 20 C, about 83.3 pounds.',
    faqs: [
      { q: 'How much does a gallon of water weigh?', a: 'A US gallon of fresh water weighs about 8.33 pounds (3.78 kg) at 20 degrees C.' },
      { q: 'How much does a liter of water weigh?', a: 'About 0.998 kilograms at room temperature, and 0.99997 kg at 4 degrees C.' },
      { q: 'How much does a cubic foot of water weigh?', a: 'About 62.3 pounds (28.3 kg) at room temperature.' },
    ],
  },
  sources: `${WATER_NOTE} Volume units: NIST Handbook 44 Appendix B.`,
}

// ---------------------------------------------------------------------------
// Sizes (approximate). Base for shoes = foot length in cm.
// Formulas: Wikipedia "Shoe size": US men = 3 x foot length (in) - 22; UK = US men - 1; Paris point = 2/3 cm,
// EU = 1.5 x last length (cm) with last = foot + 2 barleycorns (2/3 in); US kids size 1 = foot 3 7/12 in.
// US women = US men + 1.5 (common retailer convention; the FIA "standard" scale uses +1).
const I = INCH * 100 // cm per inch

function size(id: string, slug: string, label: string, symbol: string, scale: number, offset: number, roundTo: number, aliases: string[] = []): Unit {
  return { ...affine(id, slug, label, symbol, scale, offset, aliases), roundTo }
}

export const shoeSize: Category = {
  id: 'shoe-size',
  kind: 'units',
  group: 'Sizes',
  title: 'Shoe Size Converter',
  short: 'Shoe Size',
  description: 'Convert shoe sizes between US men, US women, UK, EU and US kids, and from foot length in centimeters or inches. Approximate: sizes vary by brand.',
  aliases: ['footwear', 'sneakers', 'boots', 'us to eu shoe', 'uk to us shoe', 'eu to us shoe', 'shoe size chart', 'mens shoe size', 'womens shoe size'],
  units: [
    size('cm', 'foot-cm', 'Foot length (cm)', 'cm', 1, 0, 0.1, ['foot length', 'cm']),
    size('in', 'foot-in', 'Foot length (inches)', 'in', I, 0, 0.05, ['foot length inches', 'inches']),
    size('usm', 'us-mens', 'US men\'s size', 'US M', I / 3, (22 * I) / 3, 0.5, ['us mens', 'men\'s']),
    size('usw', 'us-womens', 'US women\'s size', 'US W', I / 3, (20.5 * I) / 3, 0.5, ['us womens', 'women\'s']),
    size('uk', 'uk', 'UK size', 'UK', I / 3, (23 * I) / 3, 0.5, ['united kingdom']),
    size('eu', 'eu', 'EU size (Paris points)', 'EU', 1 / 1.5, -(2 / 3) * I, 0.5, ['european', 'euro']),
    size('usk', 'us-kids', 'US kids\' size (child scale)', 'US Kids', I / 3, (9.75 * I) / 3, 0.5, ['kids', 'children', 'toddler']),
  ],
  defaultFrom: 'usm',
  defaultTo: 'eu',
  defaultValue: '9',
  pairs: [
    { from: 'usm', to: 'eu' }, { from: 'eu', to: 'usm' }, { from: 'usm', to: 'uk' }, { from: 'uk', to: 'usm' },
    { from: 'usw', to: 'eu' }, { from: 'eu', to: 'usw' }, { from: 'usw', to: 'uk' }, { from: 'usm', to: 'usw' },
    { from: 'cm', to: 'usm' }, { from: 'usm', to: 'cm' }, { from: 'cm', to: 'eu' },
  ],
  tableValues: [6, 7, 8, 9, 10, 11, 12, 13],
  approximate: 'Shoe sizes are approximate. They are calculated from foot length with the standard Brannock and Paris-point formulas, but every brand cuts its lasts differently, so always check the brand size chart and try shoes on.',
  formula: 'US men = 3 x foot length (in) - 22;  UK = US men - 1;  US women = US men + 1.5;  EU = 1.5 x (foot length cm + 1.69)',
  content: {
    explainer: 'Shoe sizing systems all describe the length of the shoe last, the form the shoe is made on, but they start at different zero points and use different steps. US and UK sizes count in barleycorns, one third of an inch per full size. EU sizes count in Paris points of two thirds of a centimeter. US women\'s sizes are typically 1.5 sizes above US men\'s sizes at the same length, and UK sizes are one below US men\'s. Because brands round and allow different room for the toes, any conversion is a good starting point, not a guarantee of fit.',
    tips: ['Measure your foot in the evening, when it is largest, standing on a sheet of paper.', 'Between two sizes, choose the larger and use an insole if needed.', 'Check the brand\'s own chart, especially for athletic shoes and boots.'],
    commonMistakes: ['Treating the conversion as exact; brands vary by half a size or more.', 'Using men\'s and women\'s US sizes interchangeably.', 'Ignoring width; a correct length can still fit badly in a narrow or wide shoe.'],
    example: 'A US men\'s size 10 foot is about 27.1 cm long, which comes out near EU 43 to 44, UK 9 and US women\'s 11.5.',
    faqs: [
      { q: 'How do I convert US men\'s shoe size to EU?', a: 'Estimate the foot length (3 x length in inches - 22 = US men\'s size) and multiply the last length in centimeters by 1.5. A US men\'s 10 is about EU 43 to 44.' },
      { q: 'What is the difference between US men\'s and women\'s shoe size?', a: 'Women\'s sizes are usually 1.5 higher than men\'s for the same length in most retailer charts. Some brands use 1.' },
      { q: 'Is UK size smaller than US?', a: 'Yes. A UK size is one below the US men\'s size and about 2.5 below the US women\'s size for adults.' },
    ],
  },
  sources: 'Wikipedia "Shoe size" (Brannock device formula, UK/US barleycorn scale, Paris point = 2/3 cm). Approximate by nature; brand charts differ.',
}

export const womensClothing: Category = {
  id: 'womens-clothing-size',
  kind: 'units',
  group: 'Sizes',
  title: 'Women\'s Clothing Size Converter',
  short: 'Women\'s Clothing Size',
  description: 'Convert women\'s dress and clothing sizes between US, UK, EU, Italy and France. Approximate: sizes vary by brand.',
  aliases: ['dress size', 'us to uk dress size', 'uk to us dress size', 'eu dress size', 'women size', 'clothing size', 'clothes size chart', 'international sizes'],
  units: [
    size('uk', 'uk', 'UK / Australia size', 'UK', 1, 0, 1, ['australia', 'au']),
    size('us', 'us', 'US size', 'US', 1, 4, 1, ['united states']),
    size('eu', 'eu', 'EU / German size', 'EU', 1, -28, 1, ['european', 'german', 'de']),
    size('fr', 'fr', 'French size', 'FR', 1, -30, 1, ['france']),
    size('it', 'it', 'Italian size', 'IT', 1, -32, 1, ['italy']),
  ],
  defaultFrom: 'us',
  defaultTo: 'uk',
  defaultValue: '8',
  pairs: [
    { from: 'us', to: 'uk' }, { from: 'uk', to: 'us' }, { from: 'us', to: 'eu' }, { from: 'eu', to: 'us' },
    { from: 'uk', to: 'eu' }, { from: 'eu', to: 'uk' }, { from: 'us', to: 'it' }, { from: 'us', to: 'fr' },
  ],
  tableValues: [0, 2, 4, 6, 8, 10, 12, 14],
  approximate: 'Clothing sizes are approximate. The offsets between countries are the common ones used on size charts, but each brand cuts its own sizes, so check the brand chart and the garment measurements.',
  formula: 'US = UK - 4;  EU = UK + 28;  FR = UK + 30;  IT = UK + 32  (women\'s dresses, typical size chart offsets)',
  content: {
    explainer: 'Women\'s clothing sizes are not standardized worldwide. Each country uses its own numbering, but for dresses and tops most size charts line up with fixed offsets: a UK size 10 is a US 6, an EU 38, a French 40 and an Italian 42. These offsets are a convenient starting point. Garments from different brands, and from different decades, can fit a size apart even inside one country.',
    tips: ['Use bust, waist and hip measurements against the brand\'s chart rather than only the converted number.', 'Check the garment\'s fabric: stretch fabrics fit differently from woven ones.', 'When between sizes, read recent customer reviews about whether a brand runs small or large.'],
    commonMistakes: ['Assuming the same size number fits the same in every brand.', 'Ordering by the number alone without checking measurements.', 'Applying women\'s offsets to men\'s sizes.'],
    example: 'A US size 8 dress is a UK 12, an EU 40, a French 42 and an Italian 44.',
    faqs: [
      { q: 'What is a US size 6 in UK?', a: 'A US 6 is about a UK 10.' },
      { q: 'What is a UK size 12 in EU?', a: 'A UK 12 is about an EU 40.' },
      { q: 'Why does my size change between brands?', a: 'There is no legal sizing standard for clothing, so each brand sets its own measurements, which is why a chart conversion is only approximate.' },
    ],
  },
  sources: 'Common retailer and fashion-industry size chart conventions (US = UK - 4, EU = UK + 28, IT = UK + 32). Approximate by nature.',
}

export const mensSuit: Category = {
  id: 'mens-suit-size',
  kind: 'units',
  group: 'Sizes',
  title: 'Men\'s Suit and Jacket Size Converter',
  short: 'Men\'s Suit Size',
  description: 'Convert men\'s suit and jacket sizes between US/UK chest size in inches, chest in centimeters and EU sizes. Approximate: fit varies by brand.',
  aliases: ['jacket size', 'suit size', 'chest size', 'mens size', 'coat size', 'blazer size', 'us to eu jacket'],
  units: [
    size('in', 'us-uk', 'US / UK size (chest, inches)', 'in', I, 0, 1, ['us', 'uk', 'chest inches']),
    size('cm', 'chest-cm', 'Chest (cm)', 'cm', 1, 0, 1, ['chest cm', 'centimeters']),
    size('eu', 'eu', 'EU size', 'EU', 2, 0, 2, ['european', 'euro']),
  ],
  defaultFrom: 'in',
  defaultTo: 'eu',
  defaultValue: '40',
  pairs: [
    { from: 'in', to: 'eu' }, { from: 'eu', to: 'in' }, { from: 'in', to: 'cm' }, { from: 'cm', to: 'in' },
    { from: 'cm', to: 'eu' }, { from: 'eu', to: 'cm' },
  ],
  tableValues: [36, 38, 40, 42, 44, 46, 48],
  approximate: 'Suit and jacket sizes are approximate. The EU size is the chest measurement in centimeters divided by two, rounded to an even number, but cuts and fits vary by maker.',
  formula: 'chest (cm) = US/UK size x 2.54;  EU size = chest (cm) / 2, rounded to an even number',
  content: {
    explainer: 'In the US and UK a man\'s jacket size is the chest measurement in inches around the fullest part of the chest, so a 40 jacket fits a 40 inch chest. Continental Europe numbers jackets by half the chest measurement in centimeters, rounded to an even number, so a 40 inch (101.6 cm) chest is about an EU 50 or 52. Shirt, trouser and coat sizes use other conventions, so use this tool only for jackets and suits.',
    tips: ['Measure around the fullest part of the chest, under the arms, with a soft tape.', 'Jackets also come in short, regular and long lengths, which do not change the chest size.', 'Add a little room if you plan to wear a sweater underneath.'],
    commonMistakes: ['Using a shirt collar size for a jacket.', 'Rounding an EU size to an odd number; sizes run in steps of two.', 'Ignoring the shoulder fit, which matters more than the chest for tailoring.'],
    example: 'A 42 inch chest is 106.7 cm, which is about an EU 54.',
    faqs: [
      { q: 'What is a US 40 jacket in EU?', a: 'A US 40 is a 101.6 cm chest, which is about an EU 50 to 52.' },
      { q: 'How do I measure my jacket size?', a: 'Measure around the fullest part of the chest in inches for the US or UK size, or in centimeters and halve it for the EU size.' },
      { q: 'Is a UK 42 the same as a US 42?', a: 'Yes. Both use the chest measurement in inches.' },
    ],
  },
  sources: 'Common tailoring conventions (jacket size = chest in inches in US/UK; EU size = chest cm / 2). Approximate by nature.',
}

// ---------------------------------------------------------------------------
// Numerals
function radixUnit(id: string, slug: string, label: string, symbol: string, radix: number, aliases: string[] = []): Unit {
  return { ...linear(id, slug, label, symbol, 1, aliases), radix }
}

export const numberBases: Category = {
  id: 'number-bases',
  kind: 'numeral',
  group: 'Developer & design',
  title: 'Number Base Converter',
  short: 'Number Bases',
  description: 'Convert numbers between binary, octal, decimal, hexadecimal and base 36.',
  aliases: ['binary', 'hex', 'hexadecimal', 'octal', 'decimal', 'base 2', 'base 16', 'binary to decimal', 'decimal to binary', 'hex to decimal', 'radix', 'base36'],
  units: [
    radixUnit('dec', 'decimal', 'Decimal (base 10)', 'decimal', 10, ['base 10']),
    radixUnit('bin', 'binary', 'Binary (base 2)', 'binary', 2, ['base 2']),
    radixUnit('oct', 'octal', 'Octal (base 8)', 'octal', 8, ['base 8']),
    radixUnit('hex', 'hex', 'Hexadecimal (base 16)', 'hex', 16, ['hexadecimal', 'base 16']),
    radixUnit('b36', 'base36', 'Base 36', 'base 36', 36, ['base 36']),
  ],
  defaultFrom: 'dec',
  defaultTo: 'bin',
  defaultValue: '255',
  pairs: [
    { from: 'dec', to: 'bin' }, { from: 'bin', to: 'dec' }, { from: 'dec', to: 'hex' }, { from: 'hex', to: 'dec' },
    { from: 'bin', to: 'hex' }, { from: 'hex', to: 'bin' }, { from: 'dec', to: 'oct' }, { from: 'oct', to: 'dec' },
  ],
  formula: 'value = sum of digit x base^position;  hex digits 0-9 and A-F;  base 36 uses 0-9 and A-Z',
  content: {
    explainer: 'A number base says how many distinct digits a positional system uses. Humans count in base 10. Computers store numbers in base 2 (binary) and programmers often write them in base 16 (hexadecimal) because each hex digit stands for exactly four bits. Octal (base 8) groups bits in threes and still appears in file permissions. This tool converts whole non-negative numbers up to 9,007,199,254,740,991 (2^53 - 1), the largest integer that is always exact.',
    tips: ['One hex digit equals four binary digits, so 0xFF is 11111111.', 'Binary 1010 is decimal 10, hex A.', 'Add 0x or 0b prefixes only in code; this tool wants plain digits.'],
    commonMistakes: ['Entering a digit that does not exist in the base, such as 2 in binary.', 'Confusing letter O with zero in octal and hex.', 'Expecting fractions or negatives; only whole non-negative numbers are supported.'],
    example: 'Decimal 255 is binary 11111111, octal 377 and hexadecimal FF.',
    faqs: [
      { q: 'How do I convert binary to decimal?', a: 'Add the powers of two for each 1 digit. 1011 is 8 + 2 + 1 = 11.' },
      { q: 'What is 255 in hex?', a: '255 in decimal is FF in hexadecimal.' },
      { q: 'Why is hexadecimal used in computing?', a: 'Each hex digit maps to exactly four bits, so it is a compact way to write binary values.' },
    ],
  },
  sources: 'Standard positional numeral systems; ECMAScript Number.MAX_SAFE_INTEGER = 2^53 - 1.',
}

export const romanNumerals: Category = {
  id: 'roman-numerals',
  kind: 'numeral',
  group: 'Developer & design',
  title: 'Roman Numeral Converter',
  short: 'Roman Numerals',
  description: 'Convert numbers to Roman numerals and Roman numerals back to numbers, from 1 to 3,999.',
  aliases: ['roman', 'numerals', 'roman numeral', 'xiv', 'mcmxciv', 'year in roman numerals', 'number to roman'],
  units: [
    radixUnit('dec', 'number', 'Number (1 to 3,999)', 'decimal', 10, ['decimal', 'arabic']),
    { ...linear('roman', 'roman-numerals', 'Roman numerals', 'Roman', 1, ['roman']), radix: 'roman' },
  ],
  defaultFrom: 'dec',
  defaultTo: 'roman',
  defaultValue: '1994',
  pairs: [{ from: 'dec', to: 'roman' }, { from: 'roman', to: 'dec' }],
  formula: 'I=1, V=5, X=10, L=50, C=100, D=500, M=1000; a smaller symbol before a larger one is subtracted (IV = 4, CM = 900)',
  content: {
    explainer: 'Roman numerals write numbers with the letters I, V, X, L, C, D and M. Symbols are added from largest to smallest, except where a smaller symbol sits before a larger one, in which case it is subtracted: IV is 4 and XC is 90. Only the subtractive pairs IV, IX, XL, XC, CD and CM are standard. The usual system stops at 3,999 (MMMCMXCIX) because there is no standard symbol above M. Roman numerals are still used for clock faces, book chapters, outlines and sporting events.',
    tips: ['Never repeat a symbol more than three times in a row; 4 is IV, not IIII.', 'Break a year into thousands, hundreds, tens and ones: 1994 is M + CM + XC + IV.', 'There is no Roman numeral for zero.'],
    commonMistakes: ['Writing IC for 99; the correct form is XCIX.', 'Using V, L or D in a subtractive pair.', 'Trying to write numbers over 3,999 without a vinculum (overbar) extension.'],
    example: '1994 is MCMXCIV (1000 + 900 + 90 + 4). 2026 is MMXXVI.',
    faqs: [
      { q: 'What is 2026 in Roman numerals?', a: 'MMXXVI.' },
      { q: 'What is the largest standard Roman numeral?', a: 'MMMCMXCIX, which is 3,999.' },
      { q: 'How do you write 4 in Roman numerals?', a: 'IV, which is one before five. Some clock faces use IIII.' },
    ],
  },
  sources: 'Standard subtractive Roman numeral notation.',
}
