# Coffee.House — Idea, Revenue Model & Phase-Wise Build Prompt

## 1. The winning idea

**Coffee.House = "Brew better coffee. Build your café."**
A two-audience coffee hub:

| Engine | Audience | Role | Why |
|---|---|---|---|
| **Traffic engine** | Home brewers worldwide | Volume of pageviews → AdSense RPM | Brew guides, recipes, origins, gear and tools are evergreen, high-volume searches with daily repeat use (ratio calculator, timer). |
| **Revenue engine** | Aspiring/active café owners | High-CPC pages + lead generation | Café-startup queries carry far higher estimated CPCs than consumer coffee queries (third-party estimates: roughly $5–14 vs about $1; see RESEARCH.md). Each founder lead is sellable to equipment suppliers, lenders, roasters, POS and design firms. |

Why this beats the alternatives for this domain:
- **Café directory only** → needs thousands of verified listings before it has value; thin pages hurt AdSense approval. Kept as a *submission funnel* (free → featured listings) instead.
- **Coffee e-commerce** → inventory, logistics, low margins, and "Coffee House" retail brand-conflict risk.
- **Pure recipe blog** → high traffic but low CPC; no lead asset.
The hybrid earns AdSense from both audiences and turns the high-intent one into a lead business.

### Revenue stack (in order of expected impact)
1. **Google AdSense** — Auto ads on all content pages; optional fixed in-article/display units via `assets/js/config.js`.
2. **Café-founder leads** — free launch consultation (4-step form) + profit-calculator lead magnet + quick form on home/business hub → referral fees from vetted partners (opt-in only).
3. **Partner network & sponsorships** — section sponsors, sponsored (labeled) guides, newsletter slots, tool/video sponsorship, contest prize sponsors.
4. **Directory upgrades** — free listings → featured listings and sponsored city guides.
5. **Donations** — tiered (Espresso $3 → Prize Sponsor $100), allocated to operations, content, promotion, hiring and contest prizes. Pledge mode until payment links are pasted into config.
6. **Talent desk** — "hire coffee talent" requests from café owners (future placement fees).
7. **Later**: affiliate links on gear guides (disclosed), paid templates (business plan, costing sheets), courses.

---

## 2. Phase-wise build prompt (reusable)

> Use these prompts in order. Each phase is self-contained and testable. Replace `[OWNER_EMAIL]` with the owner's private email — store it **only** encoded in `config.js` (reversed + base64, assembled at runtime), never in markup, docs or plain text.

### Phase 0 — Research & positioning
```
Research at least 35 world-class coffee-niche websites across: publications (Sprudge, Perfect Daily Grind, Barista Magazine, Coffee Review, European Coffee Trip…), home-brewing guide sites, roasters/DTC brands, equipment retailers/brands, industry bodies (SCA, World Coffee Research, ICO, NCA) and café-business resources. For each, record standout features, monetization, and one design note. Synthesize: ranked must-have features, content gaps, highest-CPC café-business topics, shared design patterns, converting lead-gen patterns, and an AdSense approval checklist verified against Google's help pages. Find and verify 14–18 YouTube tutorials via the oEmbed endpoint. Output RESEARCH.md and videos.json. Do not copy text.
```

### Phase 1 — Architecture, design system & compliance shell
```
Build a static, GitHub-Pages-ready site for coffee.house (main branch, repo root, .nojekyll, CNAME "coffee.house").
Structure: /brew /recipes /beans /gear /business /journal /learn /tools + videos, contests, careers, support, advertise, about, contact, editorial-policy, privacy, cookies, terms, disclaimer, trademark, sitemap, thank-you, 404, saved.
Use a Python builder (_build/build.py) that wraps content fragments (META JSON line + body HTML) in one shared layout and writes plain HTML with relative links.
Every page must have, in order:
 1) A top banner linking to https://web.works/contact with the text "Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership".
 2) In <head>: <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6620975821265271" crossorigin="anonymous"></script> and <meta name="google-adsense-account" content="ca-pub-6620975821265271"> (omit the ad script on thank-you, 404 and saved pages — no ads on screens without publisher content).
 3) Canonical, OG/Twitter tags, JSON-LD (Organization/WebSite, BreadcrumbList, Article/Recipe/FAQPage/WebApplication as relevant).
Design: warm editorial — cream background, espresso-brown ink, copper accent, crema gold, leaf green; Fraunces display + Inter text; light/dark mode; sticky blurred header; card grids with tags; 8px-radius-plus rounded components; accessible focus states; reduced-motion support; print styles.
Add ads.txt ("google.com, pub-6620975821265271, DIRECT, f08c47fec0942fa0"), robots.txt, sitemap.xml, search-index.json, manifest, SVG favicon and OG image.
Trademark safety: never use the single word "coffeehouse" in content; never imply affiliation with any business named Coffee House/The Coffee House; no chain names or chain drink names; original SVG art only.
```

### Phase 2 — Content (AdSense-grade, ~55k words)
```
Write ~59 original pages to a shared spec (_build/CONTENT_SPEC.md): 8 brew guides (key-facts box, numbered method, dialing-in, troubleshooting table, FAQ), 12 drink recipes (recipe object → Recipe schema, scalable card), 13 bean/origin pages, 6 gear buying guides (no branded picks, no prices, no "we tested"), 10 café-business guides (cost ranges with assumptions, worked examples, LEADCTA marker), 9 journal articles (health content consensus-only with not-medical-advice note) and a 100+ term glossary. Each page: 3–6 internal links, 2 AD markers between h2 sections, 3–5 FAQs. Validate JSON, markers, banned words and word counts.
```

### Phase 3 — Interactive tools (traffic + lead magnets)
```
Build in vanilla JS (assets/js/tools.js): brew ratio calculator (8 methods, dose/water mode, g/oz), guided brew timer with pour schedules and chimes, caffeine calculator with half-life bedtime estimate, original interactive SVG flavor wheel (9 families/30 notes), 6-question find-your-coffee quiz, and a coffee-shop profit calculator (revenue, gross, net, margin, break-even customers/day, rent% and labor%) whose lead form auto-attaches the scenario. Home page gets a one-tap method picker. Each tool page carries explanatory content + FAQ for AdSense value.
```

### Phase 4 — Lead generation, donations, contests, hiring, partnerships
```
All forms post via fetch to a FormSubmit AJAX endpoint whose address is assembled at runtime from an encoded key in config.js (reversed + base64 parts) — the address must never appear in HTML, JS strings, docs or the DOM. Include honeypot, consent checkbox, _replyto, subject prefix "Coffee.House —", redirect to thank-you.html.
Forms: 4-step Café Launch Consultation (stage, format, help needed, budget, funding, timeline, location, experience, contact, partner-quote opt-in), quick launch request (home + hub), profit-calculator plan request, directory listing (free/featured/sponsored), contest entry (18+, rules, original work), talent application + hire-talent request, donation pledge (tiers, frequency, allocation: operations / content / promotion / hiring / contests & prizes), advertising/partnership inquiry (incl. "acquire this website/domain"), contact, newsletter.
Donations: tier buttons + payment links read from config.js (PayPal/Stripe/Buy Me a Coffee/Ko-fi); if blank, show pledge mode.
```

### Phase 5 — Engagement & SEO polish
```
Add: Ctrl/⌘+K site search over search-index.json, reading-progress bar, sticky auto-TOC, save/bookmark to localStorage + Saved page, share bar (copy, native share, X, Facebook, Pinterest, WhatsApp), recipe scaler/print, lite YouTube embeds (youtube-nocookie, load on click) on matching guides and a filterable video library, cookie notice with "Essential only" → non-personalized ads, back-to-top, filter chips on hubs.
```

### Phase 6 — QA & launch
```
Automated checks: every page has the banner + AdSense script (except thank-you/404/saved); zero broken internal links; owner email absent from every file except as the encoded key; no "coffeehouse" outside the trademark disclosure; mobile (390px) has no horizontal overflow; Playwright functional tests of every tool, search and the multi-step form (intercept the relay, verify target and payload, verify redirect).
Deploy: push to WEBWORKSA1/Coffee-House main. GitHub → Settings → Pages → Deploy from branch: main / (root). Custom domain coffee.house + Enforce HTTPS. DNS: A records 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; AAAA 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153; CNAME www → webworksa1.github.io.
Then: submit the first form once and click FormSubmit's activation email; add site in AdSense, enable Auto ads and the Privacy & messaging (GDPR) consent message; submit sitemap.xml in Google Search Console.
```

### Phase 7 — Growth (post-approval)
```
Publish 2–3 new guides/week (priority: café-business long-tail, origin pages, seasonal recipes); launch city guides from verified directory submissions; first contest round with sponsor prizes; café-owner newsletter edition; downloadable templates (business plan, menu costing sheet) as email-gated lead magnets; add disclosed affiliate links to gear guides; create AdSense manual units and paste slot IDs into config.js.
```
