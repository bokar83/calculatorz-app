# PRD: Unit Converters + Working Site Search (calculatorz.tools)

Status: DRAFT v1 (pre-gate). Branch: feat/calcz-converters-1014. Owner lane: ms02-init. Date: 2026-10-14.
Rollback: revert the branch (everything here is additive; see section 9).

## 1. Problem and evidence

1. The site has two weak converters: `unit-converter` (4 categories in one dropdown pair, 19 units) and `cm-to-inches`. Both are still registered and render. Git history (`git log --all -S`, `--diff-filter=D`) shows NO converter code was ever deleted: `unit-converter.ts` was added in edf3e11 (2026-04-15) and only edited since. What was deleted over time: `public/sitemap.xml` (6aab921, replaced by `app/sitemap.ts`), `middleware.ts` (360a0ea), `tailwind.config.ts` (288d2dc), `/pro` page (9d82768). The "missing converters" finding is therefore: the converters were never removed, they were never built beyond the single 4-category tool, and that tool is not discoverable (no nav link, no category page, one URL for everything, so "kg to lbs" has nothing to land on). The live site could not be inspected from this machine (Cloudflare challenge returned HTTP 403 to Playwright); live-site state is unverified, repo history is the evidence.
2. Search is a stub. `components/Nav.tsx` renders two `<input type="search">` elements (desktop and mobile menu) with no `value`, no `onChange`, no results UI, and nothing in the repo implements search. Reproduced with Playwright on `npm run dev`: typing "mortgage", "paycheck", "kg" changes nothing on the page and logs no console errors. Root cause: the feature was never wired, not a runtime bug.

## 2. Goals / non-goals

Goals: add a full set of non-currency converters; add a working, accessible, mobile-friendly site search covering every old and new calculator; keep SEO and AdSense-compliance patterns consistent with existing pages.

Non-goals: currency, ads/affiliate changes, deploys, touching existing calculators or routes, a test framework dependency, any backend.

ADD ONLY: no calculator, route, component prop or UI element is removed. Pre-existing files that must be edited (additively): `components/Nav.tsx` (search box + one nav link), `app/sitemap.ts` (extra entries), `app/page.tsx` (one Converters section), `package.json` (a `test` script), `tsconfig.json` (`allowImportingTsExtensions`, so the same TS engine files run under `node --test`). Anything else changed will be listed in the final report.

## 3. Architecture

ONE data-driven engine, not N hand-written pages.

- `lib/converters/engine.ts`: `Unit` = `{ id, slug, label, symbol, aliases[], toBase(v, ctx), fromBase(b, ctx) }`. `linear(factor)` builds the common case; offset/nonlinear units (temperature, fuel economy, shoe and clothing sizes, em/rem) supply their own functions. `convert(category, fromId, toId, value, ctx)` pivots through the category base unit (SI where one exists).
- Factors are written as exact definitions in code with a source comment (NIST SP 811 / Handbook 44 App. B / BIPM SI brochure / IAU). Derived values are computed from their defining expression (e.g. US gallon = 231 in^3 = 0.003785411784 m^3; tsp = gal/768) rather than typed as rounded decimals.
- Special kinds handled by the same client component: `units` (all of the above), `ingredient` (cooking and water-weight: volume to mass through a stated density), `numeral` (number bases, Roman numerals).
- `components/converters/ConverterTool.tsx` (client): two value fields, two unit pickers, swap button, instant bidirectional result (editing either side recomputes the other), rounding to sensible significant figures with full precision available, Copy-result button, aria-live result, keyboard operable.
- Server page templates render title, H1, the tool, a common-conversions table (computed from the same engine at build time), formula, educational block (reuses `EducationalBlock`, `FaqSection`, `RefTable`, `Disclaimer`, `AdZone`, `JsonLd`), related converters.

Categories (28): length, weight (mass), volume, temperature, area, speed, time, data-storage, data-transfer, energy, power, pressure, force, torque, density, fuel-economy, angle, frequency, flow-rate, rainfall, water-weight, cooking, shoe-size, womens-clothing-size, mens-suit-size, number-bases, roman-numerals, typography.

Unit catalog (summary; the authoritative list is the data files):
- Length: mm, cm, m, km, in, ft, yd, mi, nmi, micron, mil, light-year.
- Weight: mg, g, kg, tonne, oz, lb, stone, US ton, UK ton, carat, grain.
- Volume: mL, L, m3, tsp, tbsp, US fl oz, UK fl oz, US cup, US pint, UK pint, US quart, UK quart, US gal, UK gal, in3, ft3, yd3, barrel (42 US gal).
- Temperature: C, F, K, Rankine (offset formulas).
- Area: mm2, cm2, m2, km2, in2, ft2, yd2, acre, hectare, mi2.
- Speed: m/s, km/h, mph, knot, ft/s, Mach (ISA sea level, 340.294 m/s, labelled).
- Time: ns, us, ms, s, min, h, day, week, month (avg), year (Julian 365.25 d), decade.
- Data storage: bit, byte, kB, MB, GB, TB, PB (decimal) and KiB, MiB, GiB, TiB, PiB (binary).
- Data transfer: bit/s to Tbit/s, B/s to GB/s decimal, KiB/s, MiB/s, GiB/s.
- Energy: J, kJ, MJ, cal (thermochemical 4.184 J), kcal, Wh, kWh, BTU(IT), ft-lbf, eV.
- Power: mW, W, kW, MW, hp (mechanical), hp (metric), BTU(IT)/h.
- Pressure: Pa, kPa, MPa, bar, atm, psi, mmHg, inHg, torr.
- Force: N, kN, lbf, kgf, dyne, poundal. Torque: N-m, kN-m, lbf-ft, lbf-in, kgf-m.
- Density: kg/m3, g/cm3, g/mL, kg/L, lb/ft3, lb/in3, lb/US gal.
- Fuel economy: mpg (US), mpg (UK), km/L, L/100 km (reciprocal, guarded at 0).
- Angle: deg, rad, grad, arcmin, arcsec, turn. Frequency: Hz, kHz, MHz, GHz, rpm, rad/s.
- Flow rate: L/s, L/min, m3/h, m3/s, GPM (US), GPM (UK), ft3/s, ft3/min, mL/min.
- Rainfall depth: mm, cm, in, L/m2 (1 mm = 1 L/m2). Water weight: water volume to mass at 20 C (0.9982 g/mL, CRC) with a temperature note.
- Cooking: US cup, tbsp, tsp, fl oz, mL, L to g, kg, oz, lb for named ingredients using the King Arthur Baking Ingredient Weight Chart values (source cited on page; approximate by nature).
- Shoe size: foot length cm/in, US men, US women, UK, EU, US kids. Formulas from Wikipedia "Shoe size" (Brannock/UK barleycorn definitions, Paris point = 2/3 cm). Labelled APPROXIMATE; brands differ.
- Clothing: women's dress UK/US/EU/IT/AU (US = UK - 4, EU = UK + 28, IT = UK + 32); men's suit/jacket chest in/cm and EU. Labelled APPROXIMATE.
- Number bases (2, 8, 10, 16, 36 within the JS safe-integer range), Roman numerals (1 to 3999).
- Typography: px (CSS 1/96 in), pt (1/72 in), pc, in, mm, cm, em, rem (em/rem use a base font size input, default 16 px).

## 4. Routes and URLs (trailingSlash is already true site-wide)

- `/converters/` hub: all categories, grouped, with popular conversions.
- `/converters/<category>/` category page (full tool, all units).
- `/converters/<category>/<from>-to-<to>/` curated popular pair pages (e.g. `/converters/weight/kg-to-lbs/`, `/converters/temperature/celsius-to-fahrenheit/`). About 10 to 25 per major category; pairs defined in data so adding one is one line. `dynamicParams = false`; unknown pair 404s.
- Canonical on every page: `https://calculatorz.tools/converters/.../` with trailing slash. Reverse pair pages are not generated (the tool swaps live), avoiding duplicate content.
- Existing `/finance/unit-converter/` and `/finance/cm-to-inches/` are untouched and linked from the converters hub as "classic" tools.

## 5. SEO, metadata, JSON-LD, sitemap

Per page: unique `<title>` and meta description from data (pair pages: "Kg to Lbs Converter: 1 kg = 2.2046 lb"), canonical, OpenGraph, JSON-LD (`BreadcrumbList`, `FAQPage`, `SoftwareApplication` with `applicationCategory: UtilitiesApplication`, `HowTo`) in the same shape the finance/health templates emit. `app/sitemap.ts` appends hub + category + pair URLs (additive spread, existing entries unchanged). Educational copy: explainer, tips, common mistakes, worked example per category (AdSense compliance pattern), computed common-conversions table, plain-language disclaimer for shoe/clothing/cooking pages. No em-dashes in copy.

## 6. Search

Root cause fixed by building the missing feature: `components/SearchBox.tsx` (client) replaces the two stub inputs in `Nav.tsx` (same classes/placeholder). It lazily fetches `/search-index/` (a `force-static` route handler generating JSON from the registry + converters data) on first focus, scores locally with a pure function (`lib/search/search.ts`), and shows an ARIA combobox listbox: ArrowUp/Down/Enter/Escape, click, touch-friendly row height, closes on outside click. Index entries: every registry calculator (title, description, category, slug, keywords), the salary negotiation page, converter hub, every converter category (aliases + synonyms: "litres", "celsius", "lbs", "kilos", "mph"), and every curated pair page ("kg to lbs", "kg lbs"). Scoring: exact title > title prefix > alias/keyword > description token; "x to y" and "x in y" phrasing is parsed into unit tokens and matched against pair pages and categories via unit aliases. Empty state: "No calculators found" with links to the hub/finance/health. Enter with no highlighted result goes to the top result. State pages for take-home pay (51) are reachable through the "take-home pay" calculator entry and are not indexed individually.

## 7. Verification plan (all mandatory)

- Unit tests (`node --test`, no new dependency): round-trip identity for EVERY ordered unit pair in every `units` category within relative tolerance 1e-9 (looser for shoe/clothing); anchors: 0 C = 32 F = 273.15 K, -40 C = -40 F, 1 mi = 1.609344 km, 1 US gal = 3.785411784 L, 1 UK gal = 4.54609 L, 1 lb = 0.45359237 kg, 1 kWh = 3.6 MJ, 1 atm = 101.325 kPa, 1 GiB = 1073741824 B, 0 L/100km guard, Roman 1994 = MCMXCIV, 255 = 0xFF; search tests for the mandated queries.
- `npm run lint`, `npm run build` pass.
- Route diff: build output html list before (112 files at origin/main) vs after; zero removed.
- Playwright, desktop 1280 and 375 px: home, one converter per category, search results for 5 queries; screenshots viewed.
- Honesty limits: live site not inspectable (Cloudflare 403); shoe/clothing/cooking are approximations by nature.

## 8. Risks

- Floating-point display: mitigated by significant-figure formatting and tolerance-based tests.
- Thin/duplicate-content SEO risk from many pair pages: each pair page carries a computed table, worked example and category education text; reverse duplicates are not generated.
- Build time: a few hundred extra static pages, trivial.
- Search index size: kept off the page payload by lazy fetch.
- `allowImportingTsExtensions` only relaxes an error (noEmit is already true).

## 9. Rollback

Revert or delete the branch. All new files live under `lib/converters/`, `lib/search/`, `components/converters/`, `app/converters/`, `app/search-index/`, `tests/`, `docs/`; edits to the 5 pre-existing files are additive and individually revertable.

## 10. Gate log

(pending: Karpathy and Council results are recorded here after they run.)
