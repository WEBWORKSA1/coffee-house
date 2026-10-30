# Coffee.House

Brew better coffee. Build your café. — An AdSense-ready static website for **coffee.house**: 59 original guides (≈54k words), 6 interactive tools, a café-founder lead engine, donations, contests, talent desk and partner program.

- **Hosting:** GitHub Pages, `main` branch, repo root (`.nojekyll`, `CNAME` = coffee.house)
- **Build:** `python3 _build/build.py` regenerates all HTML from `_build/content/` and `_build/pages/`, then commit the output to `main`.
- **Config (no rebuild):** `assets/js/config.js` — payment links, AdSense manual slot IDs
- **Docs:** `PROMPTS.md` (idea, revenue model, phase-wise build prompt), `RESEARCH.md` (44-site niche research)

## Go-live checklist
1. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
2. Custom domain `coffee.house` → Enforce HTTPS (after DNS resolves).
3. DNS at the registrar: A `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; AAAA `2606:50c0:8000::153`…`8003::153`; `www` CNAME → `webworksa1.github.io`.
4. Submit any form once and confirm the FormSubmit activation email.
5. AdSense: add site, enable Auto ads + Privacy & messaging consent; `ads.txt` is already live.
6. Search Console: submit `https://coffee.house/sitemap.xml`.

© Coffee.House — original content. Independent; not affiliated with any business named "Coffee House". See `trademark.html`.
