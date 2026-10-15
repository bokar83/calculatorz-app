// Core physical-unit categories. Every factor is an exact definition (NIST SP 811 / NIST Handbook 44
// Appendix B / BIPM SI Brochure / IAU 2012) or is computed from one.
import { linear, affine, type Category } from './engine.ts'

// Exact definitions
export const INCH = 0.0254 // m, international inch (1959)
export const FOOT = 0.3048 // m
export const YARD = 0.9144 // m
export const MILE = 1609.344 // m, international mile (5280 ft)
export const POUND = 0.45359237 // kg, avoirdupois pound (1959)
export const US_GAL = 231 * INCH ** 3 // m^3 = 0.003785411784
export const UK_GAL = 0.00454609 // m^3, imperial gallon (exact, 4.54609 L)

export const length: Category = {
  id: 'length',
  kind: 'units',
  group: 'Everyday',
  title: 'Length Converter',
  short: 'Length',
  description: 'Convert millimeters, centimeters, meters, kilometers, inches, feet, yards, miles, nautical miles and more. Exact definitions, instant results.',
  aliases: ['distance', 'height', 'metric', 'imperial', 'cm', 'inch', 'feet', 'foot', 'meter', 'metre', 'mile', 'km'],
  units: [
    linear('mm', 'millimeters', 'Millimeters', 'mm', 1e-3, ['millimetre', 'millimetres', 'mm']),
    linear('cm', 'centimeters', 'Centimeters', 'cm', 1e-2, ['centimetre', 'centimetres', 'cm']),
    linear('m', 'meters', 'Meters', 'm', 1, ['metre', 'metres', 'meter', 'm']),
    linear('km', 'kilometers', 'Kilometers', 'km', 1e3, ['kilometre', 'kilometres', 'kilometer', 'km', 'kms']),
    linear('in', 'inches', 'Inches', 'in', INCH, ['inch', 'in', 'ins']),
    linear('ft', 'feet', 'Feet', 'ft', FOOT, ['foot', 'ft']),
    linear('yd', 'yards', 'Yards', 'yd', YARD, ['yard', 'yd', 'yds']),
    linear('mi', 'miles', 'Miles', 'mi', MILE, ['mile', 'mi']),
    linear('nmi', 'nautical-miles', 'Nautical miles', 'nmi', 1852, ['nautical mile', 'nm']),
    linear('um', 'microns', 'Microns (micrometers)', 'um', 1e-6, ['micron', 'micrometer', 'micrometre', 'um']),
    linear('mil', 'mils', 'Mils (thousandths of an inch)', 'mil', INCH / 1000, ['mil', 'thou']),
    linear('ly', 'light-years', 'Light-years', 'ly', 9460730472580800, ['light year', 'lightyear', 'ly']),
  ],
  defaultFrom: 'cm',
  defaultTo: 'in',
  pairs: [
    { from: 'cm', to: 'in' }, { from: 'in', to: 'cm' }, { from: 'ft', to: 'm' }, { from: 'm', to: 'ft' },
    { from: 'mi', to: 'km' }, { from: 'km', to: 'mi' }, { from: 'mm', to: 'in' }, { from: 'in', to: 'mm' },
    { from: 'yd', to: 'm' }, { from: 'ft', to: 'cm' }, { from: 'cm', to: 'ft' }, { from: 'nmi', to: 'mi' },
  ],
  tableValues: [1, 2, 5, 10, 25, 50, 100, 500, 1000],
  formula: 'meters = value x unit factor (1 in = 0.0254 m exactly, 1 ft = 0.3048 m, 1 mi = 1609.344 m)',
  content: {
    explainer: 'Length is measured in the metric system (meters and its multiples) almost everywhere, while the United States still uses inches, feet, yards and miles for everyday distances. Since 1959 the inch has been defined as exactly 2.54 centimeters, so every imperial length converts to metric with an exact factor, not an approximation. This converter pivots every unit through the meter, which keeps results consistent no matter which pair you pick.',
    tips: ['Remember 1 inch = 2.54 cm exactly; multiply inches by 2.54 for centimeters and divide centimeters by 2.54 for inches.', 'For a quick road estimate, 1 mile is about 1.6 km and 1 km is about 0.62 miles.', 'Use the swap button when you want the reverse direction without retyping the number.'],
    commonMistakes: ['Mixing up the international mile (1609.344 m) with the nautical mile (1852 m), which is used at sea and in aviation.', 'Treating feet and inches as one decimal number: 5 ft 10 in is 70 inches, not 5.10 feet.', 'Rounding the factor too early. Convert first and round only the final answer.'],
    example: 'A person who is 180 cm tall is 180 / 2.54 = 70.87 inches, which is 5 feet and 10.87 inches. A 10 km run is 10 / 1.609344 = 6.21 miles.',
    faqs: [
      { q: 'How many centimeters are in an inch?', a: 'There are exactly 2.54 centimeters in one inch. This is the international definition used since 1959.' },
      { q: 'How many feet are in a mile?', a: 'There are 5,280 feet in one international mile, which equals exactly 1,609.344 meters.' },
      { q: 'What is a nautical mile?', a: 'A nautical mile is exactly 1,852 meters, about 1.15 statute miles. It is used in marine and air navigation.' },
    ],
  },
  sources: 'NIST SP 811 (Guide for the Use of the International System of Units); BIPM SI Brochure; IAU 2012 Resolution B2 (light-year based on 299,792,458 m/s and the Julian year).',
}

export const weight: Category = {
  id: 'weight',
  kind: 'units',
  group: 'Everyday',
  title: 'Weight and Mass Converter',
  short: 'Weight',
  description: 'Convert kilograms, grams, pounds, ounces, stones, tonnes, US and UK tons, carats and grains with exact definitions.',
  aliases: ['mass', 'kilos', 'kilogram', 'kg', 'lbs', 'pounds', 'ounces', 'stone', 'tonne'],
  units: [
    linear('mg', 'milligrams', 'Milligrams', 'mg', 1e-6, ['milligram', 'mg']),
    linear('g', 'grams', 'Grams', 'g', 1e-3, ['gram', 'gm', 'g']),
    linear('kg', 'kg', 'Kilograms', 'kg', 1, ['kilogram', 'kilograms', 'kilo', 'kilos', 'kg']),
    linear('t', 'tonnes', 'Metric tonnes', 't', 1000, ['tonne', 'metric ton', 'metric tonne']),
    linear('oz', 'ounces', 'Ounces', 'oz', POUND / 16, ['ounce', 'oz']),
    linear('lb', 'lbs', 'Pounds', 'lb', POUND, ['pound', 'pounds', 'lb', 'lbs']),
    linear('st', 'stone', 'Stone', 'st', POUND * 14, ['stones', 'st']),
    linear('ton-us', 'us-tons', 'US (short) tons', 'ton', POUND * 2000, ['short ton', 'us ton', 'ton']),
    linear('ton-uk', 'uk-tons', 'UK (long) tons', 'long ton', POUND * 2240, ['long ton', 'uk ton', 'imperial ton']),
    linear('ct', 'carats', 'Carats (metric)', 'ct', 2e-4, ['carat', 'ct']),
    linear('gr', 'grains', 'Grains', 'gr', 64.79891e-6, ['grain', 'gr']),
  ],
  defaultFrom: 'kg',
  defaultTo: 'lb',
  pairs: [
    { from: 'kg', to: 'lb' }, { from: 'lb', to: 'kg' }, { from: 'g', to: 'oz' }, { from: 'oz', to: 'g' },
    { from: 'st', to: 'lb' }, { from: 'lb', to: 'st' }, { from: 'kg', to: 'st' }, { from: 'st', to: 'kg' },
    { from: 't', to: 'ton-us' }, { from: 'mg', to: 'g' }, { from: 'lb', to: 'oz' }, { from: 'ct', to: 'g' },
  ],
  tableValues: [1, 2, 5, 10, 25, 50, 75, 100, 200],
  formula: 'kilograms = value x unit factor (1 lb = 0.45359237 kg exactly, 1 oz = 1/16 lb, 1 st = 14 lb)',
  content: {
    explainer: 'Mass is measured in kilograms in the metric system, while the United States uses pounds and ounces and the UK often uses stones for body weight. The avoirdupois pound has been defined as exactly 0.45359237 kilograms since 1959, so conversions are exact. Strictly, weight is a force and mass is an amount of matter, but in everyday use both words mean the same thing on a scale at the surface of the Earth.',
    tips: ['To convert kilograms to pounds, multiply by 2.20462; to convert pounds to kilograms, multiply by 0.45359.', 'A stone is 14 pounds, so body weight in stones and pounds needs a division by 14 and a remainder.', 'Jewelry uses carats (200 mg) for gemstones; do not confuse them with karats, which measure gold purity.'],
    commonMistakes: ['Confusing the short ton (2,000 lb, US) with the long ton (2,240 lb, UK) and the metric tonne (1,000 kg).', 'Using troy ounces for gold with the regular avoirdupois ounce factor; troy ounces are heavier.', 'Reading a stone value like 11.5 st as 11 st 5 lb; it is 11 st 7 lb.'],
    example: 'A 70 kg person weighs 70 x 2.20462 = 154.32 lb, which is 11 stone and 0.3 lb. A 500 g bag of flour is 17.64 oz.',
    faqs: [
      { q: 'How many pounds are in a kilogram?', a: 'One kilogram equals about 2.2046 pounds. The exact factor is 1 / 0.45359237.' },
      { q: 'How many ounces are in a pound?', a: 'There are exactly 16 avoirdupois ounces in a pound.' },
      { q: 'What is the difference between a ton and a tonne?', a: 'A tonne is a metric ton of 1,000 kg. A US short ton is 2,000 lb (907.18 kg) and a UK long ton is 2,240 lb (1,016.05 kg).' },
    ],
  },
  sources: 'NIST Handbook 44 Appendix B (avoirdupois pound, ton, grain); BIPM SI Brochure (tonne, carat 200 mg).',
}

export const volume: Category = {
  id: 'volume',
  kind: 'units',
  group: 'Everyday',
  title: 'Volume Converter',
  short: 'Volume',
  description: 'Convert liters, milliliters, US and UK gallons, quarts, pints, cups, fluid ounces, tablespoons, teaspoons, cubic inches, feet and yards, and barrels.',
  aliases: ['capacity', 'liquid', 'litres', 'liters', 'gallons', 'gallon', 'cups', 'ml'],
  units: [
    linear('ml', 'milliliters', 'Milliliters', 'mL', 1e-6, ['millilitre', 'millilitres', 'ml', 'cc']),
    linear('l', 'liters', 'Liters', 'L', 1e-3, ['litre', 'litres', 'liter', 'l']),
    linear('m3', 'cubic-meters', 'Cubic meters', 'm3', 1, ['cubic metre', 'cubic metres', 'm3', 'm^3']),
    linear('tsp', 'teaspoons', 'Teaspoons (US)', 'tsp', US_GAL / 768, ['teaspoon', 'tsp']),
    linear('tbsp', 'tablespoons', 'Tablespoons (US)', 'tbsp', US_GAL / 256, ['tablespoon', 'tbsp']),
    linear('floz', 'fluid-ounces', 'Fluid ounces (US)', 'fl oz', US_GAL / 128, ['fl oz', 'floz', 'fluid ounce', 'us fluid ounce']),
    linear('floz-uk', 'uk-fluid-ounces', 'Fluid ounces (UK)', 'fl oz UK', UK_GAL / 160, ['imperial fluid ounce', 'uk fl oz']),
    linear('cup', 'cups', 'Cups (US)', 'cup', US_GAL / 16, ['cup', 'cups']),
    linear('pt', 'pints', 'Pints (US)', 'pt', US_GAL / 8, ['pint', 'pints', 'us pint']),
    linear('pt-uk', 'uk-pints', 'Pints (UK)', 'pt UK', UK_GAL / 8, ['imperial pint', 'uk pint']),
    linear('qt', 'quarts', 'Quarts (US)', 'qt', US_GAL / 4, ['quart', 'quarts', 'us quart']),
    linear('qt-uk', 'uk-quarts', 'Quarts (UK)', 'qt UK', UK_GAL / 4, ['imperial quart', 'uk quart']),
    linear('gal', 'gallons', 'Gallons (US)', 'gal', US_GAL, ['gallon', 'gallons', 'gal', 'us gallon']),
    linear('gal-uk', 'uk-gallons', 'Gallons (UK)', 'gal UK', UK_GAL, ['imperial gallon', 'uk gallon']),
    linear('in3', 'cubic-inches', 'Cubic inches', 'in3', INCH ** 3, ['cubic inch', 'cu in', 'in3']),
    linear('ft3', 'cubic-feet', 'Cubic feet', 'ft3', FOOT ** 3, ['cubic foot', 'cu ft', 'ft3']),
    linear('yd3', 'cubic-yards', 'Cubic yards', 'yd3', YARD ** 3, ['cubic yard', 'cu yd', 'yd3']),
    linear('bbl', 'barrels', 'Barrels (US oil, 42 gal)', 'bbl', US_GAL * 42, ['barrel', 'oil barrel', 'bbl']),
  ],
  defaultFrom: 'gal',
  defaultTo: 'l',
  pairs: [
    { from: 'gal', to: 'l' }, { from: 'l', to: 'gal' }, { from: 'ml', to: 'floz' }, { from: 'floz', to: 'ml' },
    { from: 'cup', to: 'ml' }, { from: 'ml', to: 'cup' }, { from: 'tbsp', to: 'tsp' }, { from: 'tsp', to: 'ml' },
    { from: 'qt', to: 'l' }, { from: 'pt', to: 'ml' }, { from: 'ft3', to: 'l' }, { from: 'gal-uk', to: 'gal' },
  ],
  tableValues: [1, 2, 5, 10, 20, 50, 100, 500, 1000],
  formula: 'cubic meters = value x unit factor (1 US gal = 231 in3 = 0.003785411784 m3 exactly; 1 UK gal = 4.54609 L)',
  content: {
    explainer: 'Volume units come in two families that share names: US customary (gallon, quart, pint, cup, fluid ounce) and British imperial (the same names with different sizes). The US gallon is defined as exactly 231 cubic inches, or 3.785411784 liters. The imperial gallon is exactly 4.54609 liters, about 20 percent larger. Cooking measures such as teaspoons and tablespoons are derived from the US gallon here.',
    tips: ['A US gallon is about 3.785 liters; an imperial gallon is about 4.546 liters. Check which one a recipe or fuel figure means.', 'One US cup is about 236.6 mL, though nutrition labels round a cup to 240 mL.', 'For liquids in cooking, 3 teaspoons make 1 tablespoon and 16 tablespoons make 1 US cup.'],
    commonMistakes: ['Using US gallons for a UK recipe or car fuel figure, which can be off by about 20 percent.', 'Assuming a fluid ounce and an ounce of weight are the same; they measure different things.', 'Mixing the US pint (473 mL) with the imperial pint (568 mL).'],
    example: '3 US gallons is 3 x 3.785411784 = 11.356 liters. A 2 liter bottle holds 2 / 0.2365882365 = 8.45 US cups.',
    faqs: [
      { q: 'How many liters are in a US gallon?', a: 'A US gallon is exactly 3.785411784 liters.' },
      { q: 'How many milliliters are in a cup?', a: 'A US customary cup is 236.5882365 mL. Many nutrition labels use a rounded 240 mL cup.' },
      { q: 'Is a UK gallon the same as a US gallon?', a: 'No. A UK (imperial) gallon is 4.54609 liters, about 1.2 US gallons.' },
    ],
  },
  sources: 'NIST Handbook 44 Appendix B (US gallon = 231 cubic inches; tablespoon, teaspoon, cup, pint, quart); UK Weights and Measures Act (imperial gallon = 4.54609 L); 42-gallon petroleum barrel.',
}

const C_TO_K = 273.15

export const temperature: Category = {
  id: 'temperature',
  kind: 'units',
  group: 'Everyday',
  title: 'Temperature Converter',
  short: 'Temperature',
  description: 'Convert Celsius, Fahrenheit, Kelvin and Rankine with the correct offset formulas. 0 C = 32 F = 273.15 K.',
  aliases: ['celsius', 'fahrenheit', 'kelvin', 'rankine', 'degrees', 'c to f', 'f to c', 'weather', 'oven'],
  units: [
    affine('c', 'celsius', 'Celsius', '°C', 1, C_TO_K, ['centigrade', 'degrees celsius', 'c']),
    affine('f', 'fahrenheit', 'Fahrenheit', '°F', 5 / 9, C_TO_K - 32 * (5 / 9), ['degrees fahrenheit', 'f']),
    affine('k', 'kelvin', 'Kelvin', 'K', 1, 0, ['kelvins', 'k']),
    affine('r', 'rankine', 'Rankine', '°R', 5 / 9, 0, ['degrees rankine', 'r']),
  ],
  defaultFrom: 'c',
  defaultTo: 'f',
  pairs: [
    { from: 'c', to: 'f' }, { from: 'f', to: 'c' }, { from: 'c', to: 'k' }, { from: 'k', to: 'c' },
    { from: 'f', to: 'k' }, { from: 'k', to: 'f' }, { from: 'f', to: 'r' }, { from: 'c', to: 'r' },
  ],
  tableValues: [-40, -10, 0, 10, 20, 25, 37, 100, 180],
  approximate: undefined,
  formula: 'F = C x 9/5 + 32;  C = (F - 32) x 5/9;  K = C + 273.15;  R = F + 459.67',
  content: {
    explainer: 'Temperature scales do not share a zero point, so converting between them needs an offset as well as a multiplier. Celsius sets 0 at the freezing point of water and 100 at its boiling point at standard pressure. Fahrenheit sets those at 32 and 212. Kelvin starts at absolute zero and uses the Celsius degree size, so 0 degrees C is 273.15 K. Rankine starts at absolute zero with the Fahrenheit degree size.',
    tips: ['Fahrenheit to Celsius: subtract 32, then multiply by 5/9 (about 0.556).', 'Celsius to Fahrenheit: multiply by 1.8, then add 32.', 'At -40 degrees the Celsius and Fahrenheit scales give the same number.'],
    commonMistakes: ['Multiplying first and forgetting the 32 offset (or applying the offset in the wrong order).', 'Using degrees with Kelvin; the unit is written K, not degrees K.', 'Converting a temperature difference with the offset formula; a 10 degree C change is an 18 degree F change, with no offset.'],
    example: 'A comfortable room at 20 degrees C is 20 x 1.8 + 32 = 68 degrees F. Normal body temperature of 98.6 degrees F is (98.6 - 32) x 5/9 = 37 degrees C.',
    faqs: [
      { q: 'What is 0 degrees Celsius in Fahrenheit?', a: '0 degrees Celsius is exactly 32 degrees Fahrenheit, the freezing point of water.' },
      { q: 'How do I convert Celsius to Kelvin?', a: 'Add 273.15 to the Celsius value. 25 degrees C is 298.15 K.' },
      { q: 'At what temperature are Celsius and Fahrenheit equal?', a: 'At -40. That is the only temperature where both scales read the same number.' },
    ],
  },
  sources: 'BIPM SI Brochure (kelvin, triple point and Celsius offset 273.15); NIST SP 811 (Fahrenheit and Rankine definitions).',
}

export const area: Category = {
  id: 'area',
  kind: 'units',
  group: 'Everyday',
  title: 'Area Converter',
  short: 'Area',
  description: 'Convert square millimeters, centimeters, meters, kilometers, square inches, feet, yards, acres, hectares and square miles.',
  aliases: ['land', 'surface', 'square feet', 'sq ft', 'sqft', 'acres', 'hectares', 'square meters', 'sq m'],
  units: [
    linear('mm2', 'square-millimeters', 'Square millimeters', 'mm2', 1e-6, ['sq mm', 'mm2']),
    linear('cm2', 'square-centimeters', 'Square centimeters', 'cm2', 1e-4, ['sq cm', 'cm2']),
    linear('m2', 'square-meters', 'Square meters', 'm2', 1, ['sq m', 'sqm', 'm2', 'square metres']),
    linear('km2', 'square-kilometers', 'Square kilometers', 'km2', 1e6, ['sq km', 'km2']),
    linear('in2', 'square-inches', 'Square inches', 'in2', INCH ** 2, ['sq in', 'in2']),
    linear('ft2', 'square-feet', 'Square feet', 'ft2', FOOT ** 2, ['sq ft', 'sqft', 'ft2', 'square foot']),
    linear('yd2', 'square-yards', 'Square yards', 'yd2', YARD ** 2, ['sq yd', 'yd2']),
    linear('ac', 'acres', 'Acres', 'ac', 43560 * FOOT ** 2, ['acre', 'ac']),
    linear('ha', 'hectares', 'Hectares', 'ha', 1e4, ['hectare', 'ha']),
    linear('mi2', 'square-miles', 'Square miles', 'mi2', MILE ** 2, ['sq mi', 'mi2']),
  ],
  defaultFrom: 'ft2',
  defaultTo: 'm2',
  pairs: [
    { from: 'ft2', to: 'm2' }, { from: 'm2', to: 'ft2' }, { from: 'ac', to: 'ha' }, { from: 'ha', to: 'ac' },
    { from: 'ac', to: 'ft2' }, { from: 'ac', to: 'm2' }, { from: 'km2', to: 'mi2' }, { from: 'mi2', to: 'km2' },
    { from: 'in2', to: 'cm2' }, { from: 'yd2', to: 'm2' },
  ],
  tableValues: [1, 2, 5, 10, 25, 50, 100, 500, 1000],
  formula: 'square meters = value x unit factor (1 ft2 = 0.09290304 m2 exactly; 1 acre = 43,560 ft2 = 4,046.8564224 m2)',
  content: {
    explainer: 'Area units are squares of length units, so their conversion factors are the squares of the length factors: one square foot is 0.3048 squared, or 0.09290304 square meters. Land is usually quoted in acres in the United States and hectares elsewhere. One acre is exactly 43,560 square feet and one hectare is 10,000 square meters.',
    tips: ['To go from square feet to square meters multiply by 0.0929; the reverse is about 10.764.', 'One hectare is about 2.471 acres, and one acre is about 0.4047 hectares.', 'Square-unit factors are the length factor squared, so never reuse a length factor directly.'],
    commonMistakes: ['Applying a length factor to an area (for example multiplying square feet by 0.3048 instead of 0.0929).', 'Confusing square meters with meters squared in a formula: 2 m squared means 4 m2 when it is a length, but 2 m2 is an area.', 'Using the survey acre for a legal boundary when the international acre is meant; they differ slightly.'],
    example: 'A 1,200 square foot apartment is 1,200 x 0.09290304 = 111.48 square meters. A 5 acre lot is 2.02 hectares.',
    faqs: [
      { q: 'How many square feet are in an acre?', a: 'An acre is exactly 43,560 square feet.' },
      { q: 'How many square meters are in a hectare?', a: 'A hectare is exactly 10,000 square meters.' },
      { q: 'How do I convert square feet to square meters?', a: 'Multiply the square feet by 0.09290304, because one foot is exactly 0.3048 meters.' },
    ],
  },
  sources: 'NIST SP 811 and Handbook 44 Appendix B (international foot, acre = 43,560 ft2); BIPM SI Brochure (hectare).',
}

export const speed: Category = {
  id: 'speed',
  kind: 'units',
  group: 'Everyday',
  title: 'Speed Converter',
  short: 'Speed',
  description: 'Convert meters per second, kilometers per hour, miles per hour, knots, feet per second and Mach.',
  aliases: ['velocity', 'mph', 'kph', 'kmh', 'km/h', 'knots', 'miles per hour'],
  units: [
    linear('ms', 'meters-per-second', 'Meters per second', 'm/s', 1, ['mps', 'm/s', 'metres per second']),
    linear('kmh', 'kmh', 'Kilometers per hour', 'km/h', 1000 / 3600, ['kph', 'kmh', 'km/h', 'kilometres per hour']),
    linear('mph', 'mph', 'Miles per hour', 'mph', MILE / 3600, ['mph', 'miles per hour']),
    linear('kn', 'knots', 'Knots', 'kn', 1852 / 3600, ['knot', 'kt', 'kts']),
    linear('fts', 'feet-per-second', 'Feet per second', 'ft/s', FOOT, ['fps', 'ft/s']),
    linear('mach', 'mach', 'Mach (ISA sea level, 340.294 m/s)', 'Ma', 340.294, ['mach', 'speed of sound']),
  ],
  defaultFrom: 'kmh',
  defaultTo: 'mph',
  pairs: [
    { from: 'kmh', to: 'mph' }, { from: 'mph', to: 'kmh' }, { from: 'ms', to: 'kmh' }, { from: 'kmh', to: 'ms' },
    { from: 'kn', to: 'mph' }, { from: 'mph', to: 'kn' }, { from: 'ms', to: 'mph' }, { from: 'mach', to: 'kmh' },
    { from: 'fts', to: 'mph' },
  ],
  tableValues: [1, 5, 10, 20, 30, 50, 60, 100, 120],
  approximate: 'Mach depends on air temperature and altitude. This tool uses the International Standard Atmosphere value at sea level (340.294 m/s), so treat Mach results as approximate.',
  formula: 'm/s = value x factor (1 mph = 0.44704 m/s exactly; 1 knot = 1852/3600 m/s; 1 km/h = 1/3.6 m/s)',
  content: {
    explainer: 'Speed is distance divided by time, so speed units pair a length unit with a time unit. Road speeds are in kilometers per hour in most countries and miles per hour in the United States and UK. Ships and aircraft use knots, a nautical mile per hour. Mach compares speed with the speed of sound, which changes with temperature, so a fixed sea-level reference is used here.',
    tips: ['To convert km/h to mph multiply by 0.6214; mph to km/h multiply by 1.6093.', 'To convert m/s to km/h multiply by 3.6.', 'One knot is about 1.15 mph or 1.852 km/h.'],
    commonMistakes: ['Dividing by 3.6 when you should multiply (m/s to km/h multiplies, km/h to m/s divides).', 'Treating a knot as a unit of distance; it is already per hour, so "knots per hour" is wrong.', 'Using Mach 1 as a constant 1,235 km/h; it varies with altitude and temperature.'],
    example: 'A speed limit of 100 km/h is 100 x 0.621371 = 62.14 mph. A 20 knot wind is 20 x 1.852 = 37.04 km/h.',
    faqs: [
      { q: 'How fast is 100 km/h in mph?', a: '100 km/h is about 62.14 mph.' },
      { q: 'How do I convert m/s to km/h?', a: 'Multiply meters per second by 3.6 to get kilometers per hour.' },
      { q: 'How many mph is one knot?', a: 'One knot is exactly 1.852 km/h, which is about 1.1508 mph.' },
    ],
  },
  sources: 'NIST SP 811 (mile, knot); ISO 2533 International Standard Atmosphere (speed of sound 340.294 m/s at sea level, 15 C).',
}

const DAY = 86400
const JULIAN_YEAR = 365.25 * DAY

export const time: Category = {
  id: 'time',
  kind: 'units',
  group: 'Everyday',
  title: 'Time Converter',
  short: 'Time',
  description: 'Convert nanoseconds, microseconds, milliseconds, seconds, minutes, hours, days, weeks, months, years and decades.',
  aliases: ['duration', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'years', 'months'],
  units: [
    linear('ns', 'nanoseconds', 'Nanoseconds', 'ns', 1e-9, ['nanosecond', 'ns']),
    linear('us', 'microseconds', 'Microseconds', 'us', 1e-6, ['microsecond', 'us', 'µs']),
    linear('msec', 'milliseconds', 'Milliseconds', 'ms', 1e-3, ['millisecond', 'ms', 'msec']),
    linear('s', 'seconds', 'Seconds', 's', 1, ['second', 'sec', 'secs', 's']),
    linear('min', 'minutes', 'Minutes', 'min', 60, ['minute', 'min', 'mins']),
    linear('h', 'hours', 'Hours', 'h', 3600, ['hour', 'hr', 'hrs', 'h']),
    linear('d', 'days', 'Days', 'd', DAY, ['day', 'd']),
    linear('wk', 'weeks', 'Weeks', 'wk', 7 * DAY, ['week', 'wk', 'wks']),
    linear('mo', 'months', 'Months (average)', 'mo', JULIAN_YEAR / 12, ['month', 'mo', 'months']),
    linear('yr', 'years', 'Years (365.25 days)', 'yr', JULIAN_YEAR, ['year', 'yr', 'yrs']),
    linear('dec', 'decades', 'Decades', 'dec', JULIAN_YEAR * 10, ['decade']),
  ],
  defaultFrom: 'h',
  defaultTo: 'min',
  pairs: [
    { from: 'h', to: 'min' }, { from: 'min', to: 's' }, { from: 'd', to: 'h' }, { from: 'wk', to: 'd' },
    { from: 'yr', to: 'd' }, { from: 'yr', to: 'wk' }, { from: 's', to: 'msec' }, { from: 'd', to: 'min' },
    { from: 'mo', to: 'd' }, { from: 'h', to: 's' },
  ],
  tableValues: [1, 2, 5, 10, 15, 30, 60, 100, 365],
  formula: 'seconds = value x unit factor (1 min = 60 s, 1 h = 3,600 s, 1 d = 86,400 s, 1 yr = 365.25 d, 1 month = 1/12 yr)',
  content: {
    explainer: 'The second is the SI base unit of time. Minutes, hours, days and weeks are fixed multiples of it. Months and years are not fixed in the calendar, so this converter uses averages: a year of 365.25 days (the Julian year used in astronomy) and a month of one twelfth of that, about 30.44 days. For exact calendar spans between two dates, use a date difference calculator instead.',
    tips: ['There are 86,400 seconds in a day and 604,800 in a week.', 'A year is about 8,766 hours using the 365.25 day average.', 'For payroll or deadlines use real dates; averages are for estimates.'],
    commonMistakes: ['Assuming every month has 30 days; the average is 30.4375 days.', 'Using 365 days for a leap-year-sensitive calculation.', 'Mixing minutes and decimal hours, for example reading 1.5 hours as 1 hour 5 minutes (it is 1 hour 30 minutes).'],
    example: 'A 3.5 hour flight lasts 3.5 x 60 = 210 minutes, which is 12,600 seconds. A 52 week year is 364 days, one day short of the 365 day calendar year.',
    faqs: [
      { q: 'How many minutes are in a day?', a: 'There are 1,440 minutes in a day.' },
      { q: 'How many days are in a year?', a: 'A calendar year has 365 days, or 366 in a leap year. This tool uses the 365.25 day average.' },
      { q: 'How many seconds are in an hour?', a: 'There are 3,600 seconds in an hour.' },
    ],
  },
  sources: 'BIPM SI Brochure (second, minute, hour, day); IAU 2012 (Julian year = 365.25 days of 86,400 s).',
}
