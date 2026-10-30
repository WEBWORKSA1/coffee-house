#!/usr/bin/env python3
"""Coffee.House static site builder.
Reads _build/content/<section>/<slug>.html (META json + body) and _build/pages/**/*.html (META json + body),
wraps them in the shared layout and writes plain static HTML to the repo root (GitHub Pages, main branch).
Run:  python3 _build/build.py
"""
import json, re, os, html, glob, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = os.path.join(ROOT, "_build")
DOMAIN = "https://coffee.house"
SITE = "Coffee.House"
PUB = "ca-pub-6620975821265271"
OWNER = "https://web.works/contact"
TODAY = datetime.date.today()
UPDATED = TODAY.strftime("%B %Y")
ISO = TODAY.isoformat()
VER = TODAY.strftime("%Y%m%d")

# ---------------------------------------------------------------- icons
def ic(d, extra=""):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"{extra}>{d}</svg>'
ICONS = {
    "cup": ic('<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 2.5c0 1.5 1.2 1.5 1.2 3M12 2.5c0 1.5 1.2 1.5 1.2 3"/>'),
    "dripper": ic('<path d="M4 5h16l-5 8H9L4 5Z"/><path d="M12 13v3"/><path d="M7 19h10"/><path d="M8 16h8v3H8z"/>'),
    "bean": ic('<ellipse cx="12" cy="12" rx="6.5" ry="9" transform="rotate(35 12 12)"/><path d="M8.5 17.5c2-2.5 1-5.5 3.5-8s3.5-2 3.5-2"/>'),
    "grinder": ic('<path d="M7 9h10l-1 11H8L7 9Z"/><path d="M6 9h12"/><path d="M12 9V5"/><path d="M12 5h5"/><circle cx="17.5" cy="5" r="1.2"/>'),
    "shop": ic('<path d="M3 10.5 12 4l9 6.5"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/><path d="M10 11.5h4"/>'),
    "book": ic('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5V5.5Z"/><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20"/>'),
    "leaf": ic('<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19 13 11"/>'),
    "play": ic('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3V9Z"/>'),
    "calc": ic('<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2M8 18h2M14 18h2"/>'),
    "timer": ic('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2"/><path d="M9.5 2.5h5"/>'),
    "trophy": ic('<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4"/><path d="M12 13v4M8.5 20h7M9.5 17h5"/>'),
    "heart": ic('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>'),
    "mega": ic('<path d="M4 10v4h3l7 4V6L7 10H4Z"/><path d="M17.5 9a4 4 0 0 1 0 6"/>'),
    "brief": ic('<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5h6v2"/><path d="M3 12h18"/>'),
    "search": ic('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>'),
    "moon": ic('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>'),
    "menu": ic('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    "wheel": ic('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3"/><path d="M12 3.5V9M12 15v5.5M3.5 12H9M15 12h5.5M6 6l4 4M14 14l4 4M18 6l-4 4M10 14l-4 4"/>'),
    "quiz": ic('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.6v.6"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>'),
    "pin": ic('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    "glass": ic('<path d="M6 3h12l-1.5 17h-9L6 3Z"/><path d="M6.6 9h10.8"/><path d="M10 13h1M13 15h1"/>'),
    "up": ic('<path d="m6 14 6-6 6 6"/>'),
    "users": ic('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>'),
    "mail": ic('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>'),
}
LOGO = ('<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 22 24 7l18 15" fill="none" stroke="var(--accent)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>'
        '<path d="M13 24h19v7a8 8 0 0 1-8 8h-3a8 8 0 0 1-8-8v-7Z" fill="var(--brand)"/><path d="M32 26.5h2.5a3.5 3.5 0 0 1 0 7H31" fill="none" stroke="var(--brand)" stroke-width="2.6"/>'
        '<path d="M19 15.5c0 2 1.6 2 1.6 4M24.5 15.5c0 2 1.6 2 1.6 4" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round"/></svg>')

SECTIONS = {
    "brew":     {"name": "Brew Guides", "icon": "dripper", "grad": "t1", "blurb": "Step-by-step methods with exact ratios, temperatures and troubleshooting."},
    "recipes":  {"name": "Recipes", "icon": "cup", "grad": "t4", "blurb": "Café-quality coffee drinks you can make at home, hot and iced."},
    "beans":    {"name": "Beans & Origins", "icon": "bean", "grad": "t2", "blurb": "Origins, roast levels, processing and the science of fresh beans."},
    "gear":     {"name": "Gear Guides", "icon": "grinder", "grad": "t3", "blurb": "What actually matters when you buy grinders, machines, kettles and scales."},
    "business": {"name": "Café Business", "icon": "shop", "grad": "t5", "blurb": "Open, fund and run a profitable coffee shop — costs, plans and playbooks."},
    "journal":  {"name": "Journal", "icon": "book", "grad": "t6", "blurb": "Caffeine, health research, history, culture and the craft of tasting."},
    "learn":    {"name": "Learn", "icon": "leaf", "grad": "t2", "blurb": "Reference material: the A–Z coffee glossary and learning paths."},
}

ORDER = {
    "brew": ["pour-over-v60", "french-press", "espresso-at-home", "aeropress", "cold-brew", "chemex", "moka-pot", "turkish-coffee"],
    "recipes": ["latte", "cappuccino", "flat-white", "iced-latte", "cortado", "mocha", "americano", "vietnamese-iced-coffee", "spanish-latte", "dalgona-coffee", "affogato", "irish-coffee"],
    "beans": ["coffee-origins", "roast-levels", "processing-methods", "grind-size-chart", "arabica-vs-robusta", "ethiopia", "colombia", "brazil", "kenya", "guatemala", "indonesia-sumatra", "storing-coffee-beans", "water-for-coffee"],
    "gear": ["coffee-grinder-buying-guide", "espresso-machine-buying-guide", "home-coffee-bar-setup", "pour-over-kettles", "coffee-scales", "cleaning-and-descaling"],
    "business": ["how-to-open-a-coffee-shop", "coffee-shop-startup-costs", "coffee-shop-business-plan", "coffee-shop-equipment-checklist", "coffee-menu-pricing", "coffee-shop-location", "wholesale-coffee-sourcing", "hiring-and-training-baristas", "coffee-shop-marketing", "mobile-coffee-cart-business"],
    "journal": ["caffeine-guide", "coffee-and-health", "how-to-taste-coffee", "latte-art-basics", "cold-brew-vs-iced-coffee", "decaf-explained", "history-of-coffee", "coffee-cultures-of-the-world", "sustainable-coffee"],
}

# ---------------------------------------------------------------- helpers
def esc(s): return html.escape(str(s), quote=True)
def slugify(s): return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
def strip_tags(s): return re.sub(r"<[^>]+>", " ", s)
def words(s): return len(strip_tags(s).split())

def read_meta(path):
    t = open(path, encoding="utf-8").read()
    m = re.match(r"<!--META (.*?) -->\s*\n", t, re.S)
    if not m: raise SystemExit(f"Missing META in {path}")
    return json.loads(m.group(1)), t[m.end():]

def canon(path):
    p = path[:-10] if path.endswith("index.html") else path
    return DOMAIN + "/" + p

def relativize(doc, path):
    depth = path.count("/")
    pre = "../" * depth
    doc = re.sub(r'(href|src|action|data-save)="/(?!/)', lambda m: f'{m.group(1)}="{pre}', doc)
    doc = doc.replace(f'href="{pre}"', f'href="{pre}index.html"' if pre else 'href="index.html"')
    doc = doc.replace('href=""', 'href="index.html"')
    return doc

AD = lambda kind="inArticle": f'<div class="ad-slot" data-kind="{kind}"></div>'

LEADCTA = ('<div class="lead-cta"><div class="ico">' + ICONS["shop"] + '</div><div><h4>Planning a coffee shop? Get a free launch consultation.</h4>'
           '<p>Tell us your concept, budget and timeline — we\'ll reply with a tailored starting plan and introductions to vetted equipment, financing and roaster partners.</p></div>'
           '<a class="btn primary" href="/business/launch-consultation.html">Get my free plan</a></div>')

# ---------------------------------------------------------------- layout
NAV = [
    ("Brew", "/brew/", "brew"), ("Recipes", "/recipes/", "recipes"), ("Beans", "/beans/", "beans"),
    ("Gear", "/gear/", "gear"), ("Tools", "/tools/", "tools"), ("Videos", "/videos.html", "videos"),
]
def header(active):
    links = "".join(f'<a href="{u}"{" aria-current=\"page\"" if k == active else ""}>{n}</a>' for n, u, k in NAV)
    biz = f'<a class="hot" href="/business/"{" aria-current=\"page\"" if active == "business" else ""}>Open a Café</a>'
    more = ('<div class="dd"><button type="button" aria-expanded="false" aria-haspopup="true">More ▾</button><div class="dd-menu">'
            '<a href="/journal/">Journal<small>Caffeine, health, history, culture</small></a>'
            '<a href="/learn/glossary.html">Coffee glossary<small>80+ terms, A–Z</small></a>'
            '<a href="/contests.html">Contests &amp; prizes<small>Latte art, photo &amp; recipe challenges</small></a>'
            '<a href="/careers.html">Careers &amp; talent<small>Write, film, consult — or hire talent</small></a>'
            '<a href="/business/list-your-cafe.html">List your café<small>Free directory submission</small></a>'
            '<a href="/advertise.html">Advertise &amp; partner<small>Sponsorships and partnerships</small></a>'
            '<a href="/saved.html">Saved items<small>Your bookmarked guides</small></a>'
            '<a href="/about.html">About Coffee.House</a></div></div>')
    return f'''<div class="topbar"><a href="{OWNER}" target="_blank" rel="noopener">Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership →</a></div>
<header class="site-header"><div class="wrap hdr">
<a class="logo" href="/" aria-label="Coffee.House home">{LOGO}<span>Coffee<b>.</b>House</span></a>
<nav class="nav" id="nav" aria-label="Main">{links}{biz}{more}</nav>
<div class="hdr-actions">
<button class="icon-btn" type="button" data-search aria-label="Search (Ctrl+K)">{ICONS["search"]}</button>
<button class="icon-btn" type="button" data-theme-toggle aria-label="Toggle dark mode">{ICONS["moon"]}</button>
<a class="btn primary sm" href="/support.html">Support us</a>
<button class="icon-btn menu-btn" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav">{ICONS["menu"]}</button>
</div></div></header>'''

def footer():
    return f'''<section class="section tight alt" aria-label="Newsletter"><div class="wrap newsletter">
<div><span class="eyebrow">The Weekly Grind</span><h2 style="margin-bottom:.3em">Better coffee, every Friday.</h2><p class="muted" style="margin:0">One new guide, one recipe, one tool tip and the latest contest news. Free, no spam, unsubscribe anytime.</p></div>
<form class="nl-form" data-form="Newsletter signup" data-ok="You're in! Watch your inbox on Friday.">
<div class="hp"><label>Leave empty<input name="_hp" tabindex="-1" autocomplete="off"></label></div>
<label class="sr" for="nl-email">Email address</label><input id="nl-email" type="email" name="email" placeholder="Your email address" required autocomplete="email">
<select name="interest" aria-label="I'm most interested in" style="flex:0 1 210px"><option>Home brewing</option><option>Opening a café</option><option>Both</option></select>
<button class="btn primary" type="submit">Subscribe</button><p class="form-status" aria-live="polite" style="flex-basis:100%"></p></form>
</div></section>
<footer class="site-footer"><div class="wrap">
<div class="foot-grid">
<div class="foot-brand"><a class="logo" href="/">{LOGO}<span>Coffee<b>.</b>House</span></a><p style="margin-top:14px">An independent home for coffee lovers and café builders: brewing guides, recipes, origins, tools and a free launch desk for future coffee shop owners.</p>
<div class="btn-row" style="margin-top:16px"><a class="btn primary sm" href="/support.html">Support Coffee.House</a><a class="btn ghost sm" style="color:#fff;border-color:rgba(255,255,255,.3)" href="/business/launch-consultation.html">Free café consult</a></div></div>
<div><h4>Brew</h4><ul><li><a href="/brew/pour-over-v60.html">Pour-over</a></li><li><a href="/brew/espresso-at-home.html">Espresso</a></li><li><a href="/brew/french-press.html">French press</a></li><li><a href="/brew/cold-brew.html">Cold brew</a></li><li><a href="/recipes/">All recipes</a></li><li><a href="/beans/">Beans &amp; origins</a></li></ul></div>
<div><h4>Tools</h4><ul><li><a href="/tools/brew-ratio-calculator.html">Brew ratio calculator</a></li><li><a href="/tools/brew-timer.html">Brew timer</a></li><li><a href="/tools/caffeine-calculator.html">Caffeine calculator</a></li><li><a href="/tools/flavor-wheel.html">Flavor wheel</a></li><li><a href="/tools/coffee-quiz.html">Find your coffee quiz</a></li><li><a href="/tools/coffee-shop-profit-calculator.html">Café profit calculator</a></li></ul></div>
<div><h4>Café business</h4><ul><li><a href="/business/how-to-open-a-coffee-shop.html">How to open a coffee shop</a></li><li><a href="/business/coffee-shop-startup-costs.html">Startup costs</a></li><li><a href="/business/coffee-shop-business-plan.html">Business plan</a></li><li><a href="/business/launch-consultation.html">Free launch consultation</a></li><li><a href="/business/list-your-cafe.html">List your café</a></li></ul></div>
<div><h4>Community</h4><ul><li><a href="/contests.html">Contests &amp; prizes</a></li><li><a href="/careers.html">Careers &amp; talent</a></li><li><a href="/support.html">Donate / support</a></li><li><a href="/advertise.html">Advertise &amp; partner</a></li><li><a href="/about.html">About</a></li><li><a href="/contact.html">Contact</a></li></ul></div>
</div>
<div class="foot-bottom"><span>© <span data-year>{TODAY.year}</span> Coffee.House. Original content. Independent publication — not affiliated with any coffee chain or brand. <a href="/trademark.html">Trademark &amp; copyright</a>.</span>
<nav aria-label="Legal"><a href="/privacy.html">Privacy</a><a href="/cookies.html">Cookies</a><a href="/terms.html">Terms</a><a href="/disclaimer.html">Disclaimer</a><a href="/editorial-policy.html">Editorial policy</a><a href="/sitemap.html">Sitemap</a></nav></div>
</div></footer>
<div class="consent" id="consent" hidden role="dialog" aria-label="Cookie preferences"><p>We use cookies for essential features and to show ads through Google AdSense. Choose “Accept all” for personalized ads or “Essential only” for non-personalized ads. <a href="/cookies.html">Learn more</a>.</p>
<div class="btn-row"><button class="btn primary sm" type="button" data-consent="all">Accept all</button><button class="btn ghost sm" type="button" data-consent="essential">Essential only</button></div></div>
<div class="search-modal" id="search" role="dialog" aria-label="Search Coffee.House"><div class="search-box"><input type="search" placeholder="Search guides, recipes, origins, tools…" aria-label="Search"><div class="search-results"></div><div style="padding:10px 16px;border-top:1px solid var(--line);font-size:.8rem;color:var(--muted)"><span class="kbd">↑↓</span> navigate · <span class="kbd">Enter</span> open · <span class="kbd">Esc</span> close</div></div></div>
<button class="icon-btn to-top" type="button" aria-label="Back to top">{ICONS["up"]}</button>'''

def layout(path, title, desc, body, active="", schema=None, ads=True, scripts=(), og_type="website", robots="index,follow", full_title=None):
    depth = path.count("/")
    rootattr = "../" * depth
    ft = full_title or (f"{title} | {SITE}" if title != SITE else f"{SITE} — Brew Better Coffee & Build Your Café")
    ld = ""
    for s in (schema or []):
        ld += '<script type="application/ld+json">' + json.dumps(s, ensure_ascii=False) + "</script>\n"
    adsense = f'<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={PUB}" crossorigin="anonymous"></script>\n' if ads else ""
    sc = "".join(f'<script src="/assets/js/{s}?v={VER}" defer></script>' for s in scripts)
    doc = f'''<!DOCTYPE html>
<html lang="en" data-root="{rootattr}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(ft)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="{robots}">
<link rel="canonical" href="{canon(path)}">
<meta name="google-adsense-account" content="{PUB}">
{adsense}<meta property="og:type" content="{og_type}"><meta property="og:site_name" content="{SITE}"><meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(desc)}"><meta property="og:url" content="{canon(path)}"><meta property="og:image" content="{DOMAIN}/assets/img/og-image.svg">
<meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#5E3521">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"><link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/site.css?v={VER}">
<script>try{{var t=localStorage.getItem("ch-theme");if(t)document.documentElement.setAttribute("data-theme",t)}}catch(e){{}}</script>
{ld}</head>
<body>
<a class="skip" href="#main">Skip to content</a>
{header(active)}
<main id="main">
{body}
</main>
{footer()}
<script src="/assets/js/config.js?v={VER}"></script><script src="/assets/js/main.js?v={VER}" defer></script>{sc}
</body>
</html>
'''
    return doc if path == "404.html" else relativize(doc, path)

ORG = {"@type": "Organization", "name": SITE, "url": DOMAIN + "/", "logo": DOMAIN + "/assets/img/favicon.svg"}
def crumbs_ld(items):
    return {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": DOMAIN + u} for i, (n, u) in enumerate(items)]}
def crumbs_html(items):
    out = []
    for i, (n, u) in enumerate(items):
        out.append(f'<a href="{u}">{esc(n)}</a>' if i < len(items) - 1 else f'<span aria-current="page">{esc(n)}</span>')
    return '<nav class="crumbs" aria-label="Breadcrumb">' + '<span aria-hidden="true">/</span>'.join(out) + "</nav>"

# ---------------------------------------------------------------- content
CONTENT = {}  # section -> list of dicts
def load_content():
    for sec in SECTIONS:
        items = []
        for f in sorted(glob.glob(os.path.join(B, "content", sec, "*.html"))):
            meta, body = read_meta(f)
            slug = os.path.splitext(os.path.basename(f))[0]
            meta.update(slug=slug, section=sec, body=body, path=f"{sec}/{slug}.html", url=f"/{sec}/{slug}.html", words=words(body))
            items.append(meta)
        order = ORDER.get(sec, [])
        items.sort(key=lambda x: order.index(x["slug"]) if x["slug"] in order else 99)
        CONTENT[sec] = items

def all_items():
    for sec, items in CONTENT.items():
        for it in items: yield it

def card(it, show_sec=False):
    s = SECTIONS[it["section"]]
    tags = " ".join(slugify(t) for t in it.get("tags", []))
    secl = f'<span class="tag">{s["name"]}</span>' if show_sec else (f'<span class="tag">{esc(it["tags"][0])}</span>' if it.get("tags") else "")
    return (f'<article class="card" data-tags="{tags}"><div class="thumb {s["grad"]}">{ICONS[s["icon"]]}</div>{secl}'
            f'<h3><a href="{it["url"]}">{esc(it["title"])}</a></h3><p>{esc(it["description"])}</p>'
            f'<div class="meta">{ICONS["timer"].replace("<svg", "<svg width=14 height=14")} {it.get("read_min", 5)} min read</div></article>')

def cards(sec, limit=None, show_sec=False, order=None):
    items = CONTENT.get(sec, [])
    if order: items = sorted(items, key=lambda x: order.index(x["slug"]) if x["slug"] in order else 99)
    if limit: items = items[:limit]
    return "".join(card(i, show_sec) for i in items)

def process_body(body, sec):
    toc = []
    def h2(m):
        inner = m.group(2)
        hid = m.group(1) or slugify(strip_tags(inner))[:60]
        toc.append((hid, strip_tags(inner).strip()))
        return f'<h2 id="{hid}">{inner}</h2>'
    body = re.sub(r'<h2(?: id="([^"]+)")?>(.*?)</h2>', h2, body, flags=re.S)
    def kf(m):
        inner = re.sub(r"(<dt>.*?</dt>\s*<dd>.*?</dd>)", r'<div class="kf">\1</div>', m.group(1), flags=re.S)
        return f'<div class="keyfacts"><dl>{inner}</dl></div>'
    body = re.sub(r'<div class="keyfacts">\s*<dl>(.*?)</dl>\s*</div>', kf, body, flags=re.S)
    body = body.replace("<!--AD-->", AD())
    body = body.replace("<!--LEADCTA-->", LEADCTA)
    return body, toc

def recipe_card(r, title):
    ings = "".join(f'<li data-qty="{esc(i)}"><input type="checkbox" aria-label="Got it"><span class="q">{esc(i)}</span></li>' for i in r["ingredients"])
    steps = "".join(f"<li>{esc(s)}</li>" for s in r["steps"])
    total = (r.get("prep_min") or 0) + (r.get("cook_min") or 0)
    return f'''<div class="recipe-card"><div class="recipe-top"><div class="facts"><div>Yield<b>{esc(r.get("yield",""))}</b></div><div>Time<b>{total} min</b></div><div>Difficulty<b>{esc(r.get("difficulty","Easy"))}</b></div></div>
<div class="btn-row"><span class="scaler" aria-label="Scale recipe"><button type="button" data-d="-1" aria-label="Fewer">−</button><output>1×</output><button type="button" data-d="1" aria-label="More">+</button></span><button class="btn ghost sm" type="button" data-print>Print</button></div></div>
<div class="recipe-body"><div><h3>Ingredients</h3><ul>{ings}</ul></div><div><h3>Method</h3><ol>{steps}</ol></div></div></div>'''

ASIDE_CTA = {
    "business": ('Free café launch consultation', 'Concept, budget, equipment, financing and roaster introductions — tailored to you.', '/business/launch-consultation.html', 'Get my free plan'),
    "default": ('Run the numbers on your café', 'Our free profit calculator shows break-even customers per day in under a minute.', '/tools/coffee-shop-profit-calculator.html', 'Open the calculator'),
    "brew": ('Dial it in with the calculator', 'Exact coffee and water for any method, cup size and ratio.', '/tools/brew-ratio-calculator.html', 'Brew ratio calculator'),
}

def build_article(it):
    sec = it["section"]; S = SECTIONS[sec]
    body, toc = process_body(it["body"], sec)
    crumbs = [("Home", "/"), (S["name"], f"/{sec}/"), (it["title"], it["url"])]
    rc = recipe_card(it["recipe"], it["title"]) if it.get("recipe") else ""
    vb = video_block(it["slug"])
    if vb:
        body += vb; toc.append(("watch", "Watch it done"))
    faq = it.get("faq") or []
    faq_html = ""
    if faq:
        faq_html = '<section class="faq" aria-label="FAQ"><h2 id="faq">Frequently asked questions</h2>' + "".join(
            f"<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>" for q, a in faq) + "</section>"
        toc.append(("faq", "FAQ"))
    toc_html = "".join(f'<li><a href="#{h}">{esc(t)}</a></li>' for h, t in toc)
    related = [x for x in CONTENT[sec] if x["slug"] != it["slug"]]
    idx = [x["slug"] for x in CONTENT[sec]].index(it["slug"])
    related = (related[idx:] + related[:idx])[:3]
    rel_html = "".join(card(r) for r in related)
    cta = ASIDE_CTA.get(sec if sec in ASIDE_CTA else ("brew" if sec in ("brew", "recipes", "beans", "gear") else "default"))
    share_u = esc(canon(it["path"]))
    share_t = esc(it["title"])
    share = (f'<div class="share"><span>Share</span><button type="button" data-copy-link>Copy link</button><button type="button" data-native-share>Share…</button>'
             f'<a href="https://twitter.com/intent/tweet?url={share_u}&text={share_t}" target="_blank" rel="noopener">X</a>'
             f'<a href="https://www.facebook.com/sharer/sharer.php?u={share_u}" target="_blank" rel="noopener">Facebook</a>'
             f'<a href="https://pinterest.com/pin/create/button/?url={share_u}&description={share_t}" target="_blank" rel="noopener">Pinterest</a>'
             f'<a href="https://wa.me/?text={share_t}%20{share_u}" target="_blank" rel="noopener">WhatsApp</a>'
             f'<button class="save-btn" type="button" data-save="{it["path"]}" data-title="{share_t}">☆ Save</button></div>')
    page = f'''<div class="progress" aria-hidden="true"></div>
<div class="wrap page-head">{crumbs_html(crumbs)}<span class="eyebrow">{S["name"]}</span><h1>{esc(it["title"])}</h1><p class="lede">{esc(it["lede"])}</p>
<div class="byline"><span class="pill">{it.get("read_min",5)} min read</span><span>By the Coffee.House editorial team</span><span>Updated {UPDATED}</span><a href="/editorial-policy.html">How we write</a></div></div>
<div class="wrap article-grid"><article class="prose">{rc}{body}{faq_html}{share}</article>
<aside class="aside">{('<nav class="toc" aria-label="On this page"><h4>On this page</h4><ol>' + toc_html + '</ol></nav>') if toc else ''}
<div class="side-cta"><h4>{cta[0]}</h4><p>{cta[1]}</p><a class="btn primary sm" href="{cta[2]}">{cta[3]}</a></div>
{AD("display")}</aside></div>
<section class="section alt tight"><div class="wrap"><div class="sec-head"><h2>Keep exploring</h2><a class="btn ghost sm" href="/{sec}/">All {S["name"].lower()} →</a></div><div class="grid g3">{rel_html}</div></div></section>'''
    schema = [crumbs_ld(crumbs)]
    if it.get("recipe"):
        r = it["recipe"]
        schema.append({"@context": "https://schema.org", "@type": "Recipe", "name": it["title"], "description": it["description"],
                       "author": ORG, "publisher": ORG, "datePublished": ISO, "recipeCategory": "Drink", "recipeCuisine": "Coffee",
                       "recipeYield": r.get("yield"), "prepTime": f"PT{r.get('prep_min') or 0}M", "cookTime": f"PT{r.get('cook_min') or 0}M",
                       "totalTime": f"PT{(r.get('prep_min') or 0) + (r.get('cook_min') or 0)}M", "keywords": ", ".join(it.get("tags", [])),
                       "image": [DOMAIN + "/assets/img/og-image.svg"],
                       "recipeIngredient": r["ingredients"], "recipeInstructions": [{"@type": "HowToStep", "text": s} for s in r["steps"]]})
    else:
        schema.append({"@context": "https://schema.org", "@type": "Article", "headline": it["title"], "description": it["description"],
                       "author": ORG, "publisher": ORG, "datePublished": ISO, "dateModified": ISO, "mainEntityOfPage": canon(it["path"]),
                       "image": DOMAIN + "/assets/img/og-image.svg", "wordCount": it["words"]})
    if faq:
        schema.append({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faq]})
    return layout(it["path"], it["title"], it["description"], page, active=sec, schema=schema, og_type="article")

# ---------------------------------------------------------------- hubs
HUB_INTRO = json.load(open(os.path.join(B, "hubs.json"), encoding="utf-8"))

def build_hub(sec):
    S = SECTIONS[sec]; H = HUB_INTRO[sec]
    items = CONTENT[sec]
    tagcount = {}
    for it in items:
        for t in it.get("tags", [])[:3]: tagcount[t] = tagcount.get(t, 0) + 1
    top = [t for t, n in sorted(tagcount.items(), key=lambda x: -x[1]) if n > 1][:7]
    chips = ('<div class="filters" data-filter-for="#hub-grid"><button class="chip" type="button" data-f="all" aria-pressed="true">All</button>' +
             "".join(f'<button class="chip" type="button" data-f="{slugify(t)}" aria-pressed="false">{esc(t)}</button>' for t in top) + "</div>") if top else ""
    crumbs = [("Home", "/"), (S["name"], f"/{sec}/")]
    intro = "".join(f"<p>{p}</p>" for p in H["intro"])
    extra = H.get("extra", "")
    body = f'''<div class="wrap page-head">{crumbs_html(crumbs)}<span class="eyebrow">{S["name"]}</span><h1>{esc(H["h1"])}</h1><p class="lede">{esc(H["lede"])}</p></div>
<section class="wrap" style="padding-bottom:56px">{chips}<div class="grid g3" id="hub-grid">{"".join(card(i) for i in items)}</div></section>
{extra}
<section class="section alt"><div class="wrap prose" style="max-width:860px"><h2>{esc(H["about_h2"])}</h2>{intro}{AD("display")}</div></section>'''
    schema = [crumbs_ld(crumbs), {"@context": "https://schema.org", "@type": "CollectionPage", "name": H["h1"], "description": H["description"], "url": canon(f"{sec}/index.html"),
              "hasPart": [{"@type": "Article", "headline": i["title"], "url": canon(i["path"])} for i in items]}]
    return layout(f"{sec}/index.html", H["title"], H["description"], body, active=sec, schema=schema)

# ---------------------------------------------------------------- videos
CAT_LABEL = {"pour-over-v60": "Pour-over", "french-press": "French press", "aeropress": "AeroPress", "espresso-dialing-in": "Espresso",
             "milk-latte-art": "Milk & latte art", "cold-brew": "Cold brew", "moka-pot": "Moka pot", "origins-processing": "Origins & processing",
             "roasting": "Roasting", "coffee-shop-business": "Café business"}
ARTICLE_VIDEO = {"pour-over-v60": "pour-over-v60", "chemex": "pour-over-v60", "french-press": "french-press", "aeropress": "aeropress",
                 "espresso-at-home": "espresso-dialing-in", "cold-brew": "cold-brew", "moka-pot": "moka-pot", "latte": "milk-latte-art",
                 "cappuccino": "milk-latte-art", "flat-white": "milk-latte-art", "latte-art-basics": "milk-latte-art", "cortado": "milk-latte-art",
                 "processing-methods": "origins-processing", "coffee-origins": "origins-processing", "roast-levels": "roasting",
                 "how-to-open-a-coffee-shop": "coffee-shop-business", "coffee-shop-startup-costs": "coffee-shop-business", "cold-brew-vs-iced-coffee": "cold-brew"}
def load_videos():
    p = os.path.join(B, "videos.json")
    return json.load(open(p, encoding="utf-8")) if os.path.exists(p) else []
def video_block(slug):
    cat = ARTICLE_VIDEO.get(slug)
    if not cat: return ""
    vids = [v for v in load_videos() if v.get("category") == cat][:2]
    if not vids: return ""
    items = "".join(f'<div class="video-card"><button class="yt" type="button" data-yt="{esc(v["id"])}" aria-label="Play: {esc(v["title"])}"></button><h3>{esc(v["title"])}</h3><p>{esc(v.get("channel",""))}</p></div>' for v in vids)
    return (f'<h2 id="watch">Watch it done</h2><p>Prefer to see the technique? These tutorials from respected coffee educators pair well with this guide. '
            f'Videos load only when you press play and remain the property of their creators.</p><div class="grid g2">{items}</div>'
            f'<p><a href="/videos.html">Browse the full video library →</a></p>')

# ---------------------------------------------------------------- pages
def videos_html(cat=None, limit=None):
    vids = load_videos()
    if cat: vids = [v for v in vids if cat.lower() in v.get("category", "").lower()]
    elif limit:  # spread across categories for teasers
        seen, pick = set(), []
        for v in vids:
            if v["category"] not in seen: seen.add(v["category"]); pick.append(v)
        vids = pick
    if limit: vids = vids[:limit]
    return "".join(f'<div class="video-card" data-tags="{slugify(v.get("category","other"))}"><button class="yt" type="button" data-yt="{esc(v["id"])}" aria-label="Play: {esc(v["title"])}"></button>'
                   f'<h3>{esc(v["title"])}</h3><p>{esc(v.get("channel",""))} · {esc(CAT_LABEL.get(v.get("category",""), v.get("category","")))}</p></div>' for v in vids)

def video_filters():
    vids = load_videos()
    cats = []
    for v in vids:
        c = v.get("category", "other")
        if c not in cats: cats.append(c)
    return ('<div class="filters" data-filter-for="#video-grid"><button class="chip" type="button" data-f="all" aria-pressed="true">All</button>' +
            "".join(f'<button class="chip" type="button" data-f="{slugify(c)}" aria-pressed="false">{esc(CAT_LABEL.get(c, c))}</button>' for c in cats) + "</div>")

def expand(body):
    body = re.sub(r"\{\{CARDS:(\w+)(?::(\d+))?\}\}", lambda m: cards(m.group(1), int(m.group(2)) if m.group(2) else None), body)
    body = re.sub(r"\{\{VIDEOS(?::([^:}]*))?(?::(\d+))?\}\}", lambda m: videos_html(m.group(1) or None, int(m.group(2)) if m.group(2) else None), body)
    body = body.replace("{{VIDEO_FILTERS}}", video_filters())
    body = body.replace("{{LEADCTA}}", LEADCTA)
    body = body.replace("{{AD}}", AD("display"))
    body = body.replace("{{COUNT}}", str(sum(len(v) for v in CONTENT.values())))
    body = re.sub(r"\{\{ICON:(\w+)\}\}", lambda m: ICONS[m.group(1)], body)
    body = body.replace("{{LOGO}}", LOGO)
    body = body.replace("{{UPDATED}}", UPDATED)
    return body

def build_page(f):
    meta, body = read_meta(f)
    rel = os.path.relpath(f, os.path.join(B, "pages")).replace(os.sep, "/")
    body = expand(body)
    crumbs = meta.get("crumbs")
    schema = []
    if crumbs:
        crumbs = [tuple(c) for c in crumbs]
        body = body.replace("{{CRUMBS}}", crumbs_html(crumbs)); schema.append(crumbs_ld(crumbs))
    if meta.get("faq"):
        schema.append({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in meta["faq"]]})
        body = body.replace("{{FAQ}}", '<section class="faq"><h2 id="faq">Frequently asked questions</h2>' + "".join(
            f"<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>" for q, a in meta["faq"]) + "</section>")
    for s in meta.get("schema", []): schema.append(s)
    if meta.get("app"):
        schema.append({"@context": "https://schema.org", "@type": "WebApplication", "name": meta["title"], "description": meta["description"],
                       "applicationCategory": "UtilitiesApplication", "operatingSystem": "Any", "url": canon(rel), "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}})
    return rel, meta, layout(rel, meta["title"], meta["description"], body, active=meta.get("active", ""), schema=schema,
                             ads=meta.get("ads", True), scripts=meta.get("scripts", []), robots=meta.get("robots", "index,follow"), full_title=meta.get("full_title"))

# ---------------------------------------------------------------- main
def main():
    load_content()
    out = {}
    for it in all_items(): out[it["path"]] = build_article(it)
    for sec in SECTIONS:
        if sec in HUB_INTRO and CONTENT[sec]: out[f"{sec}/index.html"] = build_hub(sec)
    pmeta = {}
    for f in sorted(glob.glob(os.path.join(B, "pages", "**", "*.html"), recursive=True)):
        rel, meta, doc = build_page(f); out[rel] = doc; pmeta[rel] = meta
    # sitemap.html
    sm = ['<div class="wrap page-head">' + crumbs_html([("Home", "/"), ("Sitemap", "/sitemap.html")]) + '<h1>Sitemap</h1><p class="lede">Every page on Coffee.House.</p></div><div class="wrap grid g3" style="padding-bottom:60px">']
    for sec, S in SECTIONS.items():
        if not CONTENT[sec]: continue
        sm.append(f'<div><h2 style="font-size:1.3rem"><a href="/{sec}/">{S["name"]}</a></h2><ul>' + "".join(f'<li><a href="{i["url"]}">{esc(i["title"])}</a></li>' for i in CONTENT[sec]) + "</ul></div>")
    sm.append('<div><h2 style="font-size:1.3rem">Site</h2><ul>' + "".join(f'<li><a href="/{r}">{esc(m["title"])}</a></li>' for r, m in sorted(pmeta.items()) if m.get("robots", "index") .startswith("index")) + "</ul></div></div>")
    out["sitemap.html"] = layout("sitemap.html", "Sitemap", "A complete list of every guide, recipe, tool and page on Coffee.House.", "".join(sm))
    # write html
    for rel, doc in out.items():
        p = os.path.join(ROOT, rel); os.makedirs(os.path.dirname(p), exist_ok=True)
        open(p, "w", encoding="utf-8").write(doc)
    # search index
    idx = [{"u": i["path"], "t": i["title"], "d": i["description"], "s": SECTIONS[i["section"]]["name"], "k": " ".join(i.get("tags", []))} for i in all_items()]
    for r, m in pmeta.items():
        if m.get("search", True) and m.get("robots", "index").startswith("index"):
            idx.append({"u": r, "t": m["title"], "d": m["description"], "s": m.get("section_label", "Page"), "k": m.get("keywords", "")})
    json.dump(idx, open(os.path.join(ROOT, "search-index.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    # sitemap.xml
    urls = [r for r in out if not (pmeta.get(r, {}).get("robots", "index").startswith("noindex"))]
    pri = lambda r: "1.0" if r == "index.html" else ("0.9" if r.endswith("index.html") or r.startswith("business/") or r.startswith("tools/") else "0.7")
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "".join(
        f"<url><loc>{canon(r)}</loc><lastmod>{ISO}</lastmod><priority>{pri(r)}</priority></url>\n" for r in sorted(urls)) + "</urlset>\n"
    open(os.path.join(ROOT, "sitemap.xml"), "w").write(xml)
    n_words = sum(i["words"] for i in all_items())
    print(f"Built {len(out)} pages · {sum(len(v) for v in CONTENT.values())} articles · {n_words:,} article words")

if __name__ == "__main__":
    main()
