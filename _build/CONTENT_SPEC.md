# Coffee.House — Content Spec (read fully before writing)

Coffee.House is an independent, ad-supported coffee publication + toolkit: brewing guides, drink recipes,
origins & beans, gear buying guides, a café-business (open/run a coffee shop) hub, a journal, and a glossary.
Audience: home brewers worldwide (volume) and aspiring/active café owners (high-value leads).
Voice: expert, warm, practical, precise. Plain English. Numbers wherever they help (grams, ratios, °C/°F, minutes, %).
Every page must be ORIGINAL writing that passes Google AdSense "valuable content" review.

## File format (one file per page)
Path: `_build/content/<section>/<slug>.html`
Line 1 MUST be a single-line HTML comment containing JSON metadata, exactly:
`<!--META {"title": "...", "description": "...", "lede": "...", "read_min": 7, "tags": ["..."], "faq": [["Question?", "Answer."], ...], "recipe": null} -->`
Then the page body HTML (no <html>, <head>, <body>, <h1>, header, footer — the builder adds those).

Metadata rules:
- `title`: page H1 and SEO title, ≤ 60 chars, keyword-first (e.g. "How to Brew Pour-Over Coffee (V60 Method)").
- `description`: meta description, 140–158 chars, specific, no clickbait.
- `lede`: 1–2 sentence standfirst shown under the H1 (≤ 220 chars).
- `read_min`: integer estimated reading minutes.
- `faq`: 3–5 genuine Q&A pairs (answers 1–3 sentences, plain text, no HTML). Rendered as FAQ + FAQPage schema.
- `recipe`: null for everything except drink recipes (see below). JSON must be valid — use \" for quotes inside strings, never raw newlines.

## Body HTML rules
- Use only: <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <a>, <table>, <thead>, <tbody>, <tr>, <th>, <td>, <blockquote>, <div class="...">.
- Start with a short intro paragraph (no heading), then `<h2>` sections. 5–9 h2 sections for long guides.
- Allowed components:
  - `<div class="callout tip"><p><strong>Pro tip:</strong> ...</p></div>` (also `callout warn`, `callout note`)
  - `<div class="keyfacts"><dl><dt>Ratio</dt><dd>1:16</dd><dt>Grind</dt><dd>Medium-fine</dd>...</dl></div>` — use near the top of brew guides/origin pages (4–6 pairs).
  - `<ol class="steps"><li><strong>Step name.</strong> detail...</li></ol>` for procedures.
  - Tables wrapped: `<div class="table-wrap"><table>...</table></div>`.
- Insert the marker `<!--AD-->` on its own line exactly 2 times per page, between h2 sections (never inside a list/table, never before the first h2). Recipes: 1 time.
- Business-section pages: insert `<!--LEADCTA-->` on its own line once, mid-article (builder injects the free café-launch consultation call-to-action).
- Internal links: root-absolute paths to the slugs listed below, e.g. `<a href="/brew/pour-over-v60.html">pour-over guide</a>`. Add 3–6 natural internal links per page. Tools live at `/tools/brew-ratio-calculator.html`, `/tools/caffeine-calculator.html`, `/tools/brew-timer.html`, `/tools/coffee-shop-profit-calculator.html`, `/tools/coffee-quiz.html`, `/tools/flavor-wheel.html`. Lead form: `/business/launch-consultation.html`. Glossary: `/learn/glossary.html`.
- External links: only to stable authoritative homepages/pages you have verified load with WebFetch (e.g. https://sca.coffee, https://worldcoffeeresearch.org, https://www.ico.org, https://www.fda.gov/...). Use `target="_blank" rel="noopener"`. 0–3 per page. If unsure, omit.

## Hard rules (compliance)
- NEVER write the single word "coffeehouse" (brand-risk). Use "coffee house", "café" or "coffee shop".
- Never mention or imply affiliation with any chain or brand named "Coffee House"/"The Coffee House", or Starbucks, Tim Hortons, Costa, Dunkin', Nespresso, etc. Do not use chain-specific drink names (e.g. no "Frappuccino", no "Double-Double").
- Product category names in common generic use are fine (pour-over cone/"V60-style dripper", AeroPress, Chemex, moka pot, French press). Don't recommend specific branded models, don't quote prices for specific products, never claim "we tested" or invent test results, reviews, testimonials, quotes, statistics or studies. Cost figures in business guides must be presented as typical RANGES with stated assumptions (e.g. "commonly USD 80k–300k depending on build-out"), labeled as estimates.
- Health content: conservative, consensus-only (e.g. FDA's ~400 mg/day for most healthy adults). Add "This is general information, not medical advice" in a callout note. No cures, no weight-loss claims.
- No content copied or closely paraphrased from any website. No song lyrics, no quotes from people.
- No email addresses, phone numbers or personal names of real people anywhere.
- Spelling: US English. Units: metric first with imperial in parentheses where useful.

## Lengths
- Brew guides: 1,000–1,400 words. Origin/bean pages: 700–1,000. Gear guides: 900–1,200. Business guides: 1,100–1,600. Journal: 900–1,300. Recipes: 350–600 words of body.
- Glossary: 70+ terms, as `<h2>` letter groups (A, B, C…) each followed by `<dl class="glossary"><dt id="term-slug">Term</dt><dd>Definition.</dd>...</dl>`. Include 2 AD markers between letter groups. Term ids: `term-` + lowercase-hyphenated term.

## Recipe pages (section `recipes`) — `recipe` metadata object
`"recipe": {"yield": "1 drink (240 ml)", "prep_min": 5, "cook_min": 0, "ingredients": ["18 g espresso coffee (a double shot)", "180 ml whole milk"], "steps": ["Pull a double espresso...", "Steam milk to 60–65°C..."], "difficulty": "Easy"}`
The builder renders ingredients/steps as a recipe card + Recipe schema, so the body HTML should cover: what the drink is & its origin (general history, hedged), flavor/texture, technique notes, variations (<h2>Variations</h2> with a list), common mistakes, serving tips. Don't repeat the full ingredient list in the body.

## Site slug map (only link to these)
brew/: pour-over-v60, french-press, aeropress, espresso-at-home, cold-brew, moka-pot, chemex, turkish-coffee
recipes/: latte, cappuccino, flat-white, cortado, americano, mocha, iced-latte, dalgona-coffee, affogato, irish-coffee, vietnamese-iced-coffee, spanish-latte
beans/: coffee-origins, ethiopia, colombia, brazil, kenya, guatemala, indonesia-sumatra, roast-levels, processing-methods, arabica-vs-robusta, grind-size-chart, storing-coffee-beans, water-for-coffee
gear/: coffee-grinder-buying-guide, espresso-machine-buying-guide, pour-over-kettles, coffee-scales, home-coffee-bar-setup, cleaning-and-descaling
business/: how-to-open-a-coffee-shop, coffee-shop-startup-costs, coffee-shop-business-plan, coffee-shop-equipment-checklist, coffee-menu-pricing, coffee-shop-location, mobile-coffee-cart-business, hiring-and-training-baristas, coffee-shop-marketing, wholesale-coffee-sourcing
journal/: caffeine-guide, coffee-and-health, decaf-explained, history-of-coffee, latte-art-basics, cold-brew-vs-iced-coffee, sustainable-coffee, coffee-cultures-of-the-world, how-to-taste-coffee
learn/: glossary

## Validation (run before finishing)
For each file, run: `python3 -c "import json,re,sys;t=open(sys.argv[1]).read();m=re.match(r'<!--META (.*?) -->\n',t);json.loads(m.group(1));print('ok')" FILE`
Also confirm: AD marker count correct, no "coffeehouse" (case-insensitive), no "@" characters, word count in range (`python3 -c` strip tags and count).
