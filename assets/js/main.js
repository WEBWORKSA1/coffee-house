/* Coffee.House — core interactions */
(function () {
  "use strict";
  var S = window.SITE || {};
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function toast(msg) {
    var t = $(".toast"); if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("on"); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("on"); }, 2200);
  }
  window.CH_toast = toast;

  /* Theme */
  var root = document.documentElement;
  $$("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var cur = root.getAttribute("data-theme");
      var dark = cur === "dark" || (!cur && window.matchMedia("(prefers-color-scheme: dark)").matches);
      var next = dark ? "light" : "dark";
      root.setAttribute("data-theme", next); store.set("ch-theme", next);
    });
  });

  /* Mobile menu + dropdowns */
  var mb = $(".menu-btn"), nav = $("#nav");
  if (mb && nav) mb.addEventListener("click", function () {
    var open = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", open);
  });
  $$(".dd>button").forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.stopPropagation(); var dd = b.parentNode, o = dd.classList.toggle("open"); b.setAttribute("aria-expanded", o);
    });
  });
  document.addEventListener("click", function () { $$(".dd.open").forEach(function (d) { d.classList.remove("open"); }); });

  $$("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });

  /* Consent (essential = non-personalized ads) */
  function npa() { (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1; }
  var c = $("#consent");
  if (c && !store.get("ch-consent")) {
    c.hidden = false;
    $$("[data-consent]", c).forEach(function (b) {
      b.addEventListener("click", function () {
        store.set("ch-consent", b.getAttribute("data-consent"));
        if (b.getAttribute("data-consent") === "essential") npa();
        c.hidden = true;
      });
    });
  }
  if (store.get("ch-consent") === "essential") npa();

  /* Manual ad units — only when a slot id is configured (Auto ads otherwise) */
  var slots = S.adSlots || {};
  $$(".ad-slot").forEach(function (box) {
    var kind = box.getAttribute("data-kind") || "inArticle", id = slots[kind];
    if (!id) return;
    box.innerHTML = '<span class="ad-label">Advertisement</span>';
    var ins = document.createElement("ins");
    ins.className = "adsbygoogle"; ins.style.display = "block";
    ins.setAttribute("data-ad-client", S.adsenseClient); ins.setAttribute("data-ad-slot", id);
    if (kind === "inArticle") { ins.style.textAlign = "center"; ins.setAttribute("data-ad-layout", "in-article"); ins.setAttribute("data-ad-format", "fluid"); }
    else { ins.setAttribute("data-ad-format", "auto"); ins.setAttribute("data-full-width-responsive", "true"); }
    box.appendChild(ins);
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  });

  /* Relay endpoint (address assembled at runtime, never present in markup) */
  function relay() {
    var k = S._k || [];
    var rev = function (b) { return atob(b).split("").reverse().join(""); };
    return "https://formsubmit.co/ajax/" + rev(k[0]) + String.fromCharCode(64) + rev(k[1]);
  }

  /* Multi-step forms */
  $$("form[data-steps]").forEach(function (f) {
    var steps = $$(".step", f), bars = $$(".steps-bar i", f), lbl = $(".step-label", f), i = 0;
    function show(n) {
      steps.forEach(function (s, j) { s.hidden = j !== n; });
      bars.forEach(function (b, j) { b.classList.toggle("on", j <= n); });
      if (lbl) lbl.textContent = "Step " + (n + 1) + " of " + steps.length + (steps[n].getAttribute("data-title") ? " — " + steps[n].getAttribute("data-title") : "");
      i = n;
      var first = steps[n].querySelector("input:not([type=radio]):not([type=checkbox]),select,textarea"); if (first && n > 0) first.focus({ preventScroll: true });
    }
    function valid() {
      var ok = true;
      $$("[required]", steps[i]).forEach(function (el) { if (ok && !el.checkValidity()) { el.reportValidity(); ok = false; } });
      var group = steps[i].querySelector("[data-need-one]"), st = $(".form-status", f);
      if (ok && group && !group.querySelector("input:checked")) { ok = false; if (st) { st.className = "form-status err"; st.textContent = "Pick at least one option to continue."; } }
      if (ok && st) st.textContent = "";
      return ok;
    }
    $$("[data-next]", f).forEach(function (b) { b.addEventListener("click", function () { if (valid()) show(i + 1); }); });
    $$("[data-prev]", f).forEach(function (b) { b.addEventListener("click", function () { show(i - 1); }); });
    show(0);
  });

  /* All forms → relay */
  $$("form[data-form]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = $(".form-status", f), btn = f.querySelector("[type=submit]");
      var hp = f.querySelector(".hp input"); if (hp && hp.value) return;
      var data = {};
      new FormData(f).forEach(function (v, k) { if (k === "_hp") return; data[k] = data[k] ? data[k] + ", " + v : v; });
      data._subject = "Coffee.House — " + f.getAttribute("data-form") + (data.name ? " from " + data.name : "");
      data._template = "table"; data._captcha = "false";
      data.form_type = f.getAttribute("data-form"); data.page = location.href;
      if (data.email) data._replyto = data.email;
      if (typeof f._extra === "function") { var x = f._extra(); for (var k in x) data[k] = x[k]; }
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Sending…"; }
      if (status) { status.className = "form-status"; status.textContent = ""; }
      fetch(relay(), { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function () {
          var go = f.getAttribute("data-redirect");
          if (go) { location.href = ROOT + go; return; }
          if (status) { status.className = "form-status ok"; status.textContent = f.getAttribute("data-ok") || "Sent — thank you. We reply within two business days."; }
          f.reset();
        })
        .catch(function () {
          if (status) { status.className = "form-status err"; status.textContent = "That didn't go through. Check your connection and try again."; }
        })
        .finally(function () { if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; } });
    });
  });

  /* Lite YouTube embeds (no third-party load until click) */
  $$("[data-yt]").forEach(function (b) {
    var id = b.getAttribute("data-yt");
    b.style.backgroundImage = "url(https://i.ytimg.com/vi/" + id + "/hqdefault.jpg)";
    b.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      f.title = b.getAttribute("aria-label") || "Video";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      f.allowFullscreen = true; b.replaceWith(f);
    });
  });

  /* Generic chip filters: <div class="filters" data-filter-for="#grid"> <button class="chip" data-f="tag"> */
  $$("[data-filter-for]").forEach(function (bar) {
    var grid = $(bar.getAttribute("data-filter-for")); if (!grid) return;
    $$(".chip", bar).forEach(function (ch) {
      ch.addEventListener("click", function () {
        $$(".chip", bar).forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        ch.setAttribute("aria-pressed", "true");
        var f = ch.getAttribute("data-f");
        $$("[data-tags]", grid).forEach(function (it) {
          it.hidden = !(f === "all" || (" " + it.getAttribute("data-tags") + " ").indexOf(" " + f + " ") > -1);
        });
      });
    });
  });

  /* Support page: tiers + payment links */
  var tiers = $$(".tier");
  if (tiers.length) {
    var amt = $("#amount"), freq = $("#frequency");
    tiers.forEach(function (t) {
      t.addEventListener("click", function () {
        tiers.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        t.setAttribute("aria-pressed", "true");
        if (amt) amt.value = t.getAttribute("data-amount");
        if (freq && t.getAttribute("data-freq")) freq.value = t.getAttribute("data-freq");
      });
    });
  }
  var box = $("#pay-links");
  if (box) {
    var p = S.payments || {}, any = false;
    [["paypal", "Give with PayPal"], ["stripe", "Give by card"], ["buymeacoffee", "Buy us a coffee"], ["kofi", "Support on Ko-fi"]].forEach(function (l) {
      if (p[l[0]]) { any = true; var a = document.createElement("a"); a.href = p[l[0]]; a.className = "btn primary"; a.target = "_blank"; a.rel = "noopener"; a.textContent = l[1]; box.appendChild(a); }
    });
    var n1 = $("#pay-note"), n2 = $("#pledge-note");
    if (any && n1) n1.hidden = false; if (!any && n2) n2.hidden = false;
  }

  /* Reading progress + TOC highlight + back-to-top */
  var bar = $(".progress"), prose = $(".prose"), top = $(".to-top");
  var tocLinks = $$(".toc a"), heads = tocLinks.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
  function onScroll() {
    var y = window.scrollY;
    if (bar && prose) {
      var r = prose.getBoundingClientRect(), h = prose.offsetHeight - window.innerHeight * .6;
      bar.style.width = Math.max(0, Math.min(100, (-r.top / Math.max(h, 1)) * 100)) + "%";
    }
    if (top) top.classList.toggle("on", y > 900);
    if (heads.length) {
      var cur = 0; heads.forEach(function (h, j) { if (h && h.getBoundingClientRect().top < 140) cur = j; });
      tocLinks.forEach(function (a, j) { a.classList.toggle("on", j === cur); });
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  if (top) top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* Share + save */
  $$("[data-copy-link]").forEach(function (b) {
    b.addEventListener("click", function () {
      var u = location.href;
      if (navigator.clipboard) navigator.clipboard.writeText(u).then(function () { toast("Link copied"); }, function () { toast(u); });
      else toast(u);
    });
  });
  $$("[data-native-share]").forEach(function (b) {
    if (!navigator.share) { b.hidden = true; return; }
    b.addEventListener("click", function () { navigator.share({ title: document.title, url: location.href }).catch(function () {}); });
  });
  $$("[data-print]").forEach(function (b) { b.addEventListener("click", function () { window.print(); }); });
  var saved = []; try { saved = JSON.parse(store.get("ch-saved") || "[]"); } catch (e) {}
  $$(".save-btn").forEach(function (b) {
    var key = b.getAttribute("data-save"), title = b.getAttribute("data-title");
    function paint() { var on = saved.some(function (s) { return s.u === key; }); b.setAttribute("aria-pressed", on); b.textContent = on ? "★ Saved" : "☆ Save"; }
    paint();
    b.addEventListener("click", function () {
      var i = -1; saved.forEach(function (s, j) { if (s.u === key) i = j; });
      if (i > -1) { saved.splice(i, 1); toast("Removed from saved"); } else { saved.unshift({ u: key, t: title }); toast("Saved to your list"); }
      store.set("ch-saved", JSON.stringify(saved.slice(0, 60))); paint();
    });
  });
  var savedList = $("#saved-list");
  if (savedList) {
    if (!saved.length) savedList.innerHTML = '<p class="muted">Nothing saved yet. Tap “☆ Save” on any guide or recipe and it will appear here (stored only in this browser).</p>';
    else savedList.innerHTML = "<ul>" + saved.map(function (s) { return '<li><a href="' + ROOT + s.u + '">' + s.t.replace(/</g, "&lt;") + "</a></li>"; }).join("") + "</ul>";
  }

  /* Recipe scaler + ingredient checkboxes */
  var sc = $(".scaler");
  if (sc) {
    var out = $("output", sc), mult = 1, items = $$("[data-qty]");
    items.forEach(function (li) { li._orig = li.getAttribute("data-qty"); });
    function fmt(n) { return (Math.round(n * 10) / 10).toString(); }
    function paintQ() {
      out.textContent = mult + "×";
      items.forEach(function (li) {
        var t = li._orig.replace(/(\d+(?:\.\d+)?)(\s*[–-]\s*(\d+(?:\.\d+)?))?/g, function (m, a, r, b) {
          return fmt(a * mult) + (b ? "–" + fmt(b * mult) : "");
        });
        $(".q", li).textContent = t;
      });
    }
    $$("button", sc).forEach(function (b) {
      b.addEventListener("click", function () { mult = Math.max(1, Math.min(12, mult + (+b.getAttribute("data-d")))); paintQ(); });
    });
  }

  /* Search (Ctrl/Cmd+K) */
  var modal = $("#search"), input = modal && $("input", modal), results = modal && $(".search-results", modal), idx = null, sel = 0;
  function openSearch() {
    if (!modal) return; modal.classList.add("open"); input.value = ""; results.innerHTML = '<p class="muted" style="padding:10px 14px">Try “ratio”, “latte”, “Ethiopia”, “startup costs”…</p>'; input.focus();
    if (!idx) fetch(ROOT + "search-index.json").then(function (r) { return r.json(); }).then(function (j) { idx = j; }).catch(function () { idx = []; });
  }
  function closeSearch() { if (modal) modal.classList.remove("open"); }
  function run() {
    var q = input.value.trim().toLowerCase(); if (!idx) return;
    if (!q) { results.innerHTML = ""; return; }
    var words = q.split(/\s+/);
    var hits = idx.map(function (d) {
      var hay = (d.t + " " + d.d + " " + d.k).toLowerCase(), s = 0;
      words.forEach(function (w) { if (d.t.toLowerCase().indexOf(w) > -1) s += 5; if (hay.indexOf(w) > -1) s += 1; else s -= 100; });
      return { d: d, s: s };
    }).filter(function (h) { return h.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 12);
    sel = 0;
    results.innerHTML = hits.length ? hits.map(function (h, j) {
      return '<a href="' + ROOT + h.d.u + '"' + (j === 0 ? ' class="on"' : "") + '><span class="sec">' + h.d.s + "</span><br>" + h.d.t + "<small>" + h.d.d + "</small></a>";
    }).join("") : '<p class="muted" style="padding:10px 14px">No matches. Try a broader word.</p>';
  }
  if (modal) {
    $$("[data-search]").forEach(function (b) { b.addEventListener("click", openSearch); });
    modal.addEventListener("click", function (e) { if (e.target === modal) closeSearch(); });
    input.addEventListener("input", run);
    input.addEventListener("keydown", function (e) {
      var links = $$("a", results);
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault(); if (!links.length) return;
        sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
        links.forEach(function (a, j) { a.classList.toggle("on", j === sel); }); links[sel].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter" && links[sel]) { location.href = links[sel].href; }
    });
    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
      else if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
      else if (e.key === "Escape") closeSearch();
    });
  }
})();
