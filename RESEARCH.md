# Coffee.House — Niche Research (feeds design/feature spec)

**Methodology:** On 2026-10-30 we visited 44 coffee-niche sites/pages, mostly homepages: 43 by WebFetch (including LivePlan, which we reached through the Bplans redirect, and Corner Coffee Store, reached through the Coffee Affection redirect) and 1 by WebSearch only (Square, because the fetch was blocked). CoffeeShopConsult blocked us through robots.txt and is not counted. A text fetch shows structure, features and monetization reliably. It shows exact colors and fonts only where the markup exposes them, so design notes are partly inferred. For keyword data we read three public SEO tools (seodata.dev, adtargeting.io, rankhero.com). Their figures are third-party estimates. For policy we read Google AdSense and Publisher Policy help pages directly. Each video was checked through YouTube oEmbed. Everything below is paraphrased.

---

## 1. Sites visited

| # | Site | Category | Standout features | Monetization | Design note |
|---|---|---|---|---|---|
| 1 | Sprudge | Publication | Sprudge Maps café directory with café sign-up; jobs board; events with a submission form; podcast; annual awards; city and gift guides | Heavy sponsor banners, a sponsor-presented section, advertise page, shop (coffee/gear/green) | Card grid with a lead story; ad strips between content blocks |
| 2 | Perfect Daily Grind | Publication | Split into Industry and Consumer; weekly round-up; jobs board; events calendar; WhatsApp channel; EN/ES/PT | Display and sidebar sponsor ads, sponsored webinars, paid job posts | Main column plus a narrow ad sidebar; thumbnail cards with bylines |
| 3 | Barista Magazine | Publication (trade) | Free digital edition plus print; events calendar; guides for hosting latte-art throwdowns; competition coverage | Rotating banners, subscriptions/memberships/back issues, event support | Scrolling news ticker; image-led listings; blue accent |
| 4 | Daily Coffee News (Roast Magazine) | B2B news | Sections by supply chain (roasting/retail/origin); separate job board; RSS; Spanish section | Banner and sidebar ads, an advertiser partner roll | Clean news grid with large thumbnails, dates, bylines |
| 5 | Coffee Review | Ratings database | About 10k reviews, searchable with filters (origin, type), point-scored top lists, monthly themed reports, glossary | Banner ads, media kit, paid commissioned reviews | WordPress; sidebar of standard ad units; sliders and tiles |
| 6 | CoffeeGeek | Publication/reviews | Three review depths (first look to full review) with a numeric score; guides; newsletter shows its subscriber count | Display and sponsor placements, PayPal donations (one-time and recurring), likely affiliate links | Elementor card layout; dropdown menu for each section |
| 7 | European Coffee Trip | Café guide/media | Curated directory of about 6k European cafés, apps, weekly newsletter, YouTube channel | Paid premium café profiles | Text-led; repeated promo panels make it cluttered |
| 8 | Home-Barista | Enthusiast forum/reviews | Deep espresso machine and grinder reviews; beginner video series; FAQ curated from the forum; member-nominated content | No monetization visible on the homepage | Plain three-item nav (Reviews/How-Tos/Features) |
| 9 | Home Grounds | Home-brew affiliate | Brew guides by method; ratio calculator, cold-brew ratio tool, grind chart; testing methodology page; 4 languages; YouTube | Amazon affiliate (disclosed), newsletter | Hero with subscribe CTA; press-logo row; topic cards |
| 10 | Coffee Affection, redirects to Corner Coffee Store | Home-brew affiliate | Coffee Affection now 302-redirects to another blog. Corner Coffee Store has 5 categories, buyer's guides by equipment type, and team author cards | Likely affiliate (no disclosure on its homepage) | Built on Astro; colored category icons; author bios with photos |
| 11 | Coffeeness | Home-brew/reviews (DE) | Reviews framed around independence from brands; buying guidance; long publishing history | Not shown on the homepage | Plain reverse-chronological blog |
| 12 | Bean Ground | Home-brew affiliate | Founder credentials up front (Q Grader); a Tools menu with a ratio calculator; Learn/Beans/Brewing/Roasting/Gear/Recipes | Affiliate disclosure, advertise page | Sticky nav with a tools dropdown; subscribe button near the top |
| 13 | Brew Coffee Home | Home-brew affiliate | Brew methods in a 3-level skill path with cost indicators; YouTube hands-on reviews | Affiliate (disclosed), no display ads | Navigation-heavy; thumbnail lists |
| 14 | Roasty Coffee | Home-brew affiliate | Ratio calculator plus a chain-drink nutrition calculator; versus-style comparisons; YouTube and TikTok drink tutorials | Amazon Associates, programmatic ads, advertise page | Playful headlines; accessibility widget; consent panel |
| 15 | Blue Bottle | Roaster DTC | Subscriptions with a prepay perk; points membership; brew guides | DTC sales, subscriptions, loyalty | Stacked cards/banners; product and lifestyle photos; line icons |
| 16 | Counter Culture | Roaster DTC | Coffee-finder quiz; brew guides for 5 methods; training centers and classes; wholesale application; transparency report | DTC, subscriptions (office/gift), wholesale, classes | Shopify; trust badges (B Corp); testimonials; press strip |
| 17 | Stumptown | Roaster DTC | Coffee quiz; product finder plus store locator; subscription intervals from weekly to 8 weeks; nonprofit picker in the cart | DTC, subscriptions, merch collabs, wholesale | Near-white base; tabbed product grid; slide-out cart |
| 18 | Intelligentsia | Roaster DTC | Flexible subscription (pause/skip); Learn + Do brew section; locations; wholesale portal | DTC, subscriptions, wholesale, events, gifting | Big bold headings; white base with a warm red-orange accent; farm-to-bar photography |
| 19 | Onyx Coffee Lab | Roaster DTC | Published roast data; grind-size calculator; roast finder and help-me-choose tool; classes; awards timeline | DTC, subscriptions, cafés, classes, wholesale, consulting | Cream/beige neutrals; letter-spaced bold headings; looping video; alternating left/right features |
| 20 | Verve | Roaster DTC | Blend-matching quiz; subscription grid; locations with order-ahead; sourcing program page | DTC, subscriptions, wholesale | Cream background with charcoal; uppercase nav; mega menus with lifestyle images |
| 21 | La Colombe | Roaster/RTD | Ready-to-drink lattes; paid annual membership; café finder; filters by roast level | DTC, subscriptions, membership, retail RTD | Long, promo-heavy page; muted blue-gray theme; a visible template error |
| 22 | Square Mile | Roaster DTC (UK) | Origin/process/flavor tags on product cards; espresso/filter/decaf filters; lesson-based education program; map of cafés serving its coffee; referrals | DTC, subscriptions bundled with machines, wholesale, events | Minimal Shopify; strong tag system on cards |
| 23 | Trade Coffee | Subscription marketplace | Taste quiz as the main conversion path; roaster directory; coffees scored on attributes and matched to a profile; learn hub | Subscriptions with a discounted trial, gifts, referrals | Repeated build-your-trial CTA; flavor icons; short stats |
| 24 | Atlas Coffee Club | Subscription | One country per month with an origin postcard and story; builder by brew method | Subscriptions, heavy first-box discounts, email-for-discount capture | Icon-step how-it-works section; press logos; guarantee badge |
| 25 | Prima Coffee | Equipment retailer | Comparison tool in the header; Café vs Home split; commercial services (consults, build-outs, cart packages); glossary; blog | Retail, equipment financing, commercial consulting, affiliate program | Mega menus with images; tile grids |
| 26 | Seattle Coffee Gear | Equipment retailer | Commercial section with a free consultation offer; classes; YouTube channel; buying guides; own-brand machines | Retail, classes, repairs, subscriptions | Dark charcoal with red/black; free-shipping progress bar in the cart |
| 27 | Whole Latte Love | Equipment retailer | Large video library, weekly livestreams, comparisons, giveaways, expert sales help | Retail, refurb, subscriptions | White/neutral; lifestyle photos on marble/wood/tile |
| 28 | Clive Coffee | Equipment retailer | Free online coffee course bundled with machine purchases; grinder sale features | Retail | Sparse fetch; short headings with a single CTA |
| 29 | Fellow | Equipment brand | Academy (guides plus how-to videos per method); comparison pages; weekly text-message coffee drops; refurb line | DTC, bundles, drops, wholesale, retail stores | Minimal grid; matte muted product colors; white backgrounds |
| 30 | Hario USA | Equipment brand | Brewing recipes/guides section; nav organized by product type | DTC with a first-order discount and tiered shipping | Warm natural lifestyle imagery (copper, paper filters, outdoors) |
| 31 | Baratza | Equipment brand | Brew-guide videos on YouTube; parts/repair support; product registration | DTC, partner bean offer, affiliate program | Clean; color swatches for product variants |
| 32 | SCA (sca.coffee) | Industry org | Course and certificate pathway; trainer directory; standards and research; global event calendar; business training for café owners | Membership, courses, events, sponsorship, store | Uppercase labels; animated stat counters; event photography |
| 33 | World Coffee Research | Research nonprofit | Interactive varieties catalog; sensory lexicon; climate replanting tool | Industry membership, grants | Looping hero video; card sections; ES locale |
| 34 | ICO (ico.org) | Intergovernmental | Monthly market report with a composite price indicator; statistics; development reports; data platform | Publications and statistics subscriptions | Elementor; pinch-zoom disabled (an accessibility flaw) |
| 35 | National Coffee Association | Trade association | National Coffee Data Trends; market research; regulatory guidance; convention; separate consumer site | Membership, convention, research sales | Image tiles with short sections; some template leftovers |
| 36 | Fairtrade America | Certification | Rotating impact figures; producer stories; intent-based routing (basics, deep dive, get certified) | Licensing/certification (not stated on page) | Bold illustration on bright fields; mega menu |
| 37 | Barista Hustle | Education | Certificate courses with assessments; monthly membership with video archive; coaching network; tools | Courses, subscription, events, tool sales | Built around credentials; founder's championships as trust signal |
| 38 | Fresh Cup | B2B publication | Weekly digest; roaster directory; espresso machine hub; resource library; podcast; summit | Sponsored placements, advertise page, paid box | Editorial WordPress; category labels |
| 39 | Toast: how to start a coffee shop | Café business (POS vendor) | 20-step numbered checklist; cost ranges by format (sit-down, drive-thru, kiosk, truck); FAQ | Many gated free downloads (plan, SOP, manual, training, floor plan); opening-cost and loan calculators; demo CTAs; newsletter | Numbered headings; resource cards between sections |
| 40 | Toast: coffee shop startup cost | Café business (POS vendor) | Costs by shop type; 6-part budget checklist; worked budgets at two levels (lean vs modest) | Gated calculator and templates; demo CTA | Prose and bullets, no tables; FAQ plus feedback poll |
| 41 | Square (Townsquare café guides) | Café business (POS vendor) | Localized café-opening and budget guides (FR/JP found) | POS lead gen (inferred) | **Fetch blocked; seen only through WebSearch** |
| 42 | Coffee Shop Startups | Café business info product | Paid digital kits (shop, mobile, drive-thru); audio interviews with owners; coaching; business-plan review | Paid kits, consultations, flash sales | Product mockups; check-icon feature lists; trust badges by the buy buttons |
| 43 | Bplans, redirects to LivePlan | Business-plan SaaS | The coffee sample-plan URL now 302-redirects to the SaaS homepage; AI plan writing; comparison pages (vs templates, vs AI chat) | Subscription SaaS, money-back guarantee, upsell to a hired planner | Repeated feature-plus-screenshot blocks; product video hero |
| 44 | NerdWallet (small-business hub) | Finance/affiliate | Tool tiles (loans, cards, banking, POS, insurance); lender-matching CTA | Affiliate and lead gen on finance products | Modular cards; heavy disclosures; trust bylines |
| 45 | UpFlip (coffee shop blog) | Business media | Owner-interview videos embedded in guides; newsletter of lessons | YouTube plus newsletter, courses (inferred) | Video-first articles with og:video metadata |

(Rows 39 and 40 are two Toast pages, so the table has 45 rows covering 44 distinct sites/pages.)

---

## 2. Synthesis

### (a) Must-have features, ranked by impact on traffic and revenue

1. **Method brew guides in a fixed format.** Start with a key-facts block (ratio, dose, grind, water temp, time), then numbered steps, an embedded video and an FAQ. This is the niche's traffic core: every home-brew site and most roasters (Counter Culture, Fellow, Hario, Intelligentsia) have it.
2. **Brew-ratio calculator.** Home Grounds, Bean Ground and Roasty all have one. Visitors come back to it, it earns links, and it feeds pages that can carry ads.
3. **Coffee-shop startup cost and profit calculator, used as a lead magnet.** Toast's top commercial asset is a gated opening-cost calculator. Ours should be free to use, with an optional emailed PDF report as the capture.
4. **Café-launch consultation form (multi-step).** Prima (build-outs) and Seattle Coffee Gear (free consult) both show that café buyers expect a human touchpoint. This is the highest value per conversion.
5. **Gated business templates.** Business plan, equipment checklist, opening timeline, SOP and barista training sheet. Toast scatters 5–8 of these through a single article. Exchange them for an email address.
6. **Coffee-match quiz (taste profile to method/bean/drink).** Trade, Stumptown, Verve, Counter Culture and Onyx all use one. It drives engagement and email signups.
7. **Newsletter capture throughout the site.** All 44 sites have one; CoffeeGeek and Fresh Cup show their subscriber counts as social proof.
8. **Gear buying guides built on transparent criteria, plus comparison tables.** These cover the commercial-intent queries. Never claim hands-on testing (spec rule). Instead publish a "how we evaluate" methodology page, as Home Grounds does.
9. **Grind-size chart/tool and brew timer.** Onyx has a grind calculator and Home Grounds a grind chart. They are small tools with long-tail traffic.
10. **Glossary and flavor wheel/sensory reference.** Coffee Review, Prima, and WCR's lexicon show that reference pages build authority and internal links.
11. **Drink recipes with Recipe schema.** Roasty's drink videos and Home Grounds' recipes show demand. They are image-friendly for Pinterest and Discover.
12. **Origins atlas (country pages plus processing explainers).** Atlas's one-country-per-month storytelling and Coffee Review's browse-by-origin are the models. Pair the pages with the Cafe Imports processing videos.
13. **Skill-level learning path.** Brew Coffee Home's three tiers with cost markers help beginners self-select, which increases pages per session.
14. **Community contests (latte-art or brew-photo challenges, monthly).** Barista Magazine's throwdown guides and Sprudge's awards show the format. The goal is UGC and return visits.
15. **Donations (one-time or recurring).** CoffeeGeek runs this successfully alongside ads. Keep it well away from ad units.
16. **Later phase:** café directory/map with paid premium listings (Sprudge Maps, ECT premium profiles), jobs board (PDG, DCN, Sprudge), events calendar, multilingual editions (PDG, Home Grounds).

### (b) Content gaps an independent site can win

- **A vendor-neutral café business hub.** Today's top café-opening content comes from POS vendors (Toast, Square), lenders and affiliates (NerdWallet), or paywalled kits (Coffee Shop Startups). Each steers readers to its product. Neutral content with honest cost ranges and stated assumptions is rare.
- **Costs broken out by format and country.** Toast covers US formats in prose with no tables. A gap exists for clear range tables (cart, kiosk, drive-thru, small café, roastery-café) with currency notes for CA, UK, EU, AU and IN.
- **Café math tools.** Cost per cup, menu price setter, break-even cups per day, staffing-hours estimator. None of the sites visited offers these free and ungated.
- **Mobile cart and kiosk depth.** Prima has cart kits and a video series, and Coffee Shop Startups sells kits, but free, structured guides are thin.
- **Metric-first international audience.** The affiliate sites are US-centric. Grams, °C and ml first with imperial conversions serves the rest of the world.
- **Decision-tree content** ("which brewer should I buy", "why is my espresso sour"). Troubleshooting flows are rare. Most sites publish long prose.
- **Affiliate-site decay.** Coffee Affection now redirects to another blog, and Bplans' coffee sample plan redirects to a SaaS homepage. Ranking URLs in this niche are being abandoned or consolidated, so durable, well-maintained pages can take their place.
- **Origins and processing explained for consumers.** Strong content exists at the trade level (WCR, ICO, Cafe Imports). Consumer-facing synthesis linking origin, processing, flavor and brew method is thin outside roaster product pages.
- **Coffee price and sustainability explainers.** ICO's monthly price reports are trade-oriented. A plain-English "why coffee prices move" page is an evergreen gap.

### (c) Highest-CPC, most commercial café-business topics

All CPCs below are third-party tool estimates. Source and date are noted for each; treat them as directional, not as AdSense earnings (publisher revenue is a fraction of advertiser CPC).

**Café business (seodata.dev, fetched 2026-10-30):**

| Keyword | Est. monthly volume | Est. CPC (USD) |
|---|---|---|
| cost of coffee shop | 110 | 14.17 |
| coffee shop startup costs | 880 | 9.43 |
| coffee shop start up cost | 140 | 8.74 |
| bakery business how to start | 720 | 7.91 |
| cost to start up coffee shop | 210 | 7.28 |
| opening a bakery | 1,300 | 7.02 |
| starting a coffee shop cost / coffee shop opening cost | 480 each | 6.90 |
| opening up coffee shop | 90 | 6.77 |
| how to open a bakery coffee shop | 70 | 5.89 |
| start a coffee business / starting a coffee shop | 1,000 each | 5.82 |
| how to start a coffee shop / how to open coffee shop | 2,400 each | 4.96 |
| startup coffee shop | 1,600 | 4.70 |
| opening a coffee shop | 2,400 | 4.63 |
| how to open a coffee shop | 2,400 | 3.98 |
| how to start a cafe | 2,400 | 3.83 |

**Consumer comparison (for scale):**

| Keyword | Est. CPC (USD) | Source |
|---|---|---|
| espresso (global) | 3.29 | adtargeting.io |
| coffee roasters near me | 2.25 | adtargeting.io |
| coffee company | 2.20 | adtargeting.io |
| coffee shop | 1.02–1.28 | adtargeting.io / rankhero |
| espresso machine(s) | 0.89 | seodata.dev |
| espresso machines for home | 1.22 | seodata.dev |

**Takeaway:** startup-cost intent pays roughly 5–15x the CPC of consumer brewing terms. Café-business pages should be the revenue anchor, and brewing content the traffic anchor.

**Adjacent high-value topics.** These are *estimates not verified this session*; it's common industry knowledge that these verticals carry high CPCs. Coffee shop business loans and equipment financing; commercial espresso machines; café POS systems; commercial insurance for coffee shops; coffee franchise costs; buying an existing café; drive-thru stand economics; wholesale coffee for cafés. Toast, Prima and NerdWallet all funnel exactly these intents.

### (d) Design patterns world-class coffee sites share

1. **Warm-neutral palettes.** Cream or off-white bases (Verve, Onyx, Stumptown), charcoal text, and a single warm accent such as red-orange (Intelligentsia) or brown/terracotta. Retailers diverge: Seattle Coffee Gear is dark charcoal with red, Whole Latte Love white with natural materials. Bright color is used sparingly, mostly in illustration (Fairtrade).
2. **Confident editorial type.** Bold, large, often uppercase or letter-spaced headings and eyebrow labels (Onyx, Verve, SCA, Intelligentsia) over short body copy. Exact font families could not be confirmed from text fetches.
3. **Photography split by purpose.** Clean product shots on white or transparent backgrounds for commerce. Origin and farm imagery for credibility (Intelligentsia, WCR). Tactile lifestyle surfaces such as marble, wood, copper and paper filters (WLL, Hario). Short looping hero video is common (Onyx, WCR).
4. **Card grids with tags.** Content and product cards carry category or attribute tags: origin, process, flavor notes, roast level (Square Mile, Counter Culture). Editorial sites use thumbnail, label, headline, byline and date.
5. **Mega-menus with image tiles, plus an announcement bar** for promos or shipping thresholds (Verve, Fellow, Prima, Trade).
6. **Trust strips.** Press-logo rows, certification badges (B Corp), credential-led author bios (Bean Ground's Q Grader, Barista Hustle's champion founder), stat counters (SCA, Fairtrade), awards timelines (Onyx).
7. **Alternating left/right feature blocks and icon-step how-it-works sections** (Onyx, Atlas, Trade).
8. **Tools in the navigation.** Bean Ground and Home Grounds give tools their own menu, and Prima puts a compare tool in the header.

**Anti-patterns seen:** repeated promo panels (ECT), visible template errors (La Colombe, Square Mile, WLL), disabled pinch-zoom (ICO), and ads crammed between every block (Sprudge). Avoid all of these.

### (e) Lead-generation patterns that convert

- **Gated templates inside long guides** (Toast). Each guide offers 3–8 downloadable checklists or templates in the middle of the content, every one an email capture. Ours: business-plan template, opening timeline, equipment checklist, menu-costing sheet.
- **Calculator as lead magnet** (Toast's opening-cost and loan calculators). The best version is an ungated result on screen with an optional "email me the full PDF breakdown". That captures intent without hurting SEO or UX.
- **Free consultation offer on the commercial path** (Seattle Coffee Gear, Prima). Use a multi-step form: (1) concept type (cart/kiosk/café/roastery), (2) stage (idea/financing/site found/build-out), (3) budget range, (4) timeline, (5) location (country/region), (6) contact details last. Asking for contact details last raises completion. Stage and budget fields qualify the lead for buyers.
- **Quiz to trial** (Trade). A repeated single CTA keeps the quiz as the main path. Ours: "café readiness" quiz leading to a personalized checklist, then the consult.
- **Discount or value for email** (Atlas, Hario first-order discount, Clive's free course bundled with purchase). Our equivalent: a free mini-course by email ("Open your café in 12 lessons"), modeled on Square Mile's lesson format.
- **Risk reducers and comparison pages** (LivePlan: money-back guarantee, versus pages). Ours: neutral "POS vs POS" and "lease vs buy equipment" pages that can later carry partner CTAs.
- **Matching/marketplace CTA** (NerdWallet's lender matching). This is a future revenue line: route qualified leads to equipment, financing or POS partners, with disclosure.
- **Paid info products and reviews** (Coffee Shop Startups: kits plus business-plan review). This is a later upsell from the consult funnel.
- **Premium listings** (ECT premium café profile, Sprudge Maps). Use once a directory exists.

### (f) AdSense approval checklist (verified against Google help pages where noted)

From the eligibility page (support.google.com/adsense/answer/9724):
- [ ] Original, high-quality content that attracts visitors.
- [ ] Applicant owns the site and can edit its HTML.
- [ ] Applicant is 18 or older.
- [ ] Site complies with the Program policies.

From Program policies (answer/48182) and the ads-not-allowed and placement pages (answer/10502938, answer/1346295):
- [ ] No low-value, thin or under-construction pages. Launch with complete pages only, with no placeholder sections or "coming soon" links.
- [ ] No ads on non-content screens: lead-form thank-you pages, 404s, pure navigation or alert screens, empty search results.
- [ ] Ads never outnumber content.
- [ ] Embedded content (YouTube) must sit inside substantial original writing. Pages that mainly embed others' content without meaningful commentary are disallowed. Every video page needs its own guide text.
- [ ] Keep ads away from interactive controls: calculator buttons, timer start/stop, quiz answers, video players, Next/Previous, menus. Google warns that placing these near ads is risky. Leave clear spacing and never put an ad directly under a tool's action button.
- [ ] Ads must not look like content or navigation, and images must not be placed to look related to ads.
- [ ] Label ads only "Advertisements" or "Sponsored Links". Never "Resources" or "Helpful links".
- [ ] No click encouragement: no arrows or flashy pointers at ads, and no rewards for clicks. **Contests and donations must never mention or relate to ads.**
- [ ] No pop-unders and no more than 3 pop-ups. No auto-refresh or auto-redirect pages. No ads shown for a set time before content.
- [ ] No ads in floating boxes, emails or software.
- [ ] Easy, honest navigation. No links to nonexistent content, no forced redirects or downloads, no malware.
- [ ] Traffic hygiene: no paid-to-click, autosurf, click exchanges or spam email. Paid ads must land on pages that match the ad.
- [ ] Don't use Google logos or brand features in a way that implies endorsement.
- [ ] Privacy policy that discloses data collection and cookie/tracking use (answer/10502938).
- [ ] **ads.txt** at the domain root with the AdSense publisher line, following the IAB spec (answer/12171612). Optional but recommended; propagation can take days to a month on low-traffic sites.
- [ ] **Google-certified CMP (IAB TCF)** for EEA, UK and Switzerland visitors before personalized ads are served (answer/13554116). Google's own Privacy & messaging tool qualifies.
- [ ] Publisher Restrictions (publisherpolicies/answer/10437795): alcohol content is restricted only when it facilitates online alcohol sales, promotes irresponsible drinking, or glorifies binge drinking. An Irish coffee recipe is fine; keep it responsible and never link to alcohol sellers.
- [ ] Google may disable ads on pages it cannot review (robots-blocked or password-protected), so don't block crawlers from ad pages.

Recommended but not from the fetched pages (common approval practice): About, Contact and Editorial Policy pages; author or brand bylines; a sitemap; enough published depth before applying (dozens of complete articles, not a handful); mobile-friendly, fast pages.

---

## 3. Verified videos (see `_build/videos.json`)

We checked 18 videos for embedding through YouTube oEmbed. Each returned JSON with a title and author_name.

| Category | ID | Title | Channel |
|---|---|---|---|
| pour-over-v60 | AI4ynXzkSQo | The Ultimate V60 Technique | James Hoffmann |
| pour-over-v60 | P0mI6Ue8BKc | 3 Essential Hario V60 Recipes: James Hoffmann, Tetsu Kasuya & Osmotic Flow | European Coffee Trip |
| french-press | st571DYYTR8 | The Ultimate French Press Technique | James Hoffmann |
| aeropress | j6VlT_jUVPc | The Ultimate AeroPress Technique (Episode #3) | James Hoffmann |
| espresso-dialing-in | aTFsBqhpLes | Understanding Espresso - Dose (Episode #1) | James Hoffmann |
| espresso-dialing-in | er2voEn8ZDU | Understanding Espresso - Grind Size (Episode #4) | James Hoffmann |
| milk-latte-art | gTC3dJvwgUI | How to Steam Milk for Latte Art (feat. Lance Hedrick) | Lance Hedrick |
| milk-latte-art | k7zh4tMGDYo | The Best Milk Tutorial (Part 3) | Lance Hedrick |
| milk-latte-art | 6YMgB61WyvE | Milk Steaming For Latte Art - Barista Tutorial | RealChrisBaca |
| cold-brew | AB0QLjroFss | Everything I Learned About Cold Brew Coffee | James Hoffmann |
| moka-pot | upgQsA5kLAk | The Bialetti Moka Express (Episode #1) | James Hoffmann |
| moka-pot | zK0F5PqJ1Gk | Understanding the Moka Pot (Episode #2) | James Hoffmann |
| origins-processing | Az0W61hotLM | Washed Coffee Processing | Cafe Imports |
| origins-processing | yagagM7SlWs | Natural Coffee Processing | Cafe Imports |
| origins-processing | k5iw31z1FAY | Honey Coffee Processing | Cafe Imports |
| roasting | aYy47C0Xw0I | Coffee Roasting Basics - Color Changes | Sweet Maria's Coffee |
| coffee-shop-business | dbbPRvrUjYI | How to Open a Coffee Shop (And Scale it to 19 Locations!) Pt. 2 | UpFlip |
| coffee-shop-business | HvQt2wbj7DE | Behind The Scenes Of a $24,000 a Month Coffee Shop Business | UpFlip |

**Verified alternates, not in the JSON:** kEZZCQTSSAg (A Beginners Guide to Coffee Tasting, James Hoffmann), qr4eYpttE2Q (moka pot extraction guide, Matteo D'Ottavio, a smaller channel), Hoffmann's other Understanding Espresso episodes (IDs found but not oEmbed-checked: F4wrUP4c5P4 ratio, hQaV3w_XNiw time, QAzE-_ocf1U temperature, po3oGIicu-8 pressure).

**Rejected:** PHYwCbXr0Ew and lB7okb0awXM (oEmbed error). 72fUDztqHX4 verified but comes from a small, non-reputable channel. rilpdy7o7Tw is a vertical "short", unsuitable for an embed.

**Embedding notes:** use youtube-nocookie.com and click-to-load facades (thumbnail first, iframe on click). That helps both performance and consent. Each embed must sit within original guide text (AdSense policy above).
