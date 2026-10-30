/* Coffee.House — interactive tools (each block runs only if its markup is on the page) */
(function () {
  "use strict";
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function r1(n) { return Math.round(n * 10) / 10; }
  function fmtTime(s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }

  var METHODS = {
    pourover: { name: "Pour-over (cone)", ratio: 16, dose: 15, temp: 93, grind: "Medium-fine", time: "2:45–3:30", url: "brew/pour-over-v60.html",
      steps: [[0, "Bloom: pour 2× dose in water, swirl"], [45, "Pour to 60% of total water"], [75, "Pour to 100% in slow spirals"], [105, "Gentle swirl, let it draw down"], [180, "Drawdown complete — serve"]] },
    frenchpress: { name: "French press", ratio: 15, dose: 30, temp: 94, grind: "Coarse", time: "4:00 + settle", url: "brew/french-press.html",
      steps: [[0, "Add all water, saturate grounds"], [240, "Break crust, skim foam"], [300, "Wait for fines to settle"], [480, "Plunge gently to the surface, pour"]] },
    aeropress: { name: "AeroPress", ratio: 15, dose: 15, temp: 88, grind: "Medium-fine", time: "~2:00", url: "brew/aeropress.html",
      steps: [[0, "Add all water, stir 3×"], [10, "Cap on, let it steep"], [90, "Swirl, begin a gentle 30 s press"], [120, "Stop at the hiss — done"]] },
    espresso: { name: "Espresso", ratio: 2, dose: 18, temp: 93, grind: "Fine", time: "25–32 s", url: "brew/espresso-at-home.html",
      steps: [[0, "Start shot"], [6, "First drops should appear"], [28, "Target yield reached — stop"]] },
    chemex: { name: "Chemex", ratio: 16, dose: 30, temp: 94, grind: "Medium-coarse", time: "4:00–4:30", url: "brew/chemex.html",
      steps: [[0, "Bloom: 2× dose in water"], [45, "Pour to 50%"], [90, "Pour to 75%"], [135, "Pour to 100%"], [255, "Drawdown complete — serve"]] },
    mokapot: { name: "Moka pot", ratio: 7, dose: 18, temp: 98, grind: "Fine-medium", time: "4–5 min", url: "brew/moka-pot.html",
      steps: [[0, "Hot water in base, medium-low heat"], [150, "Coffee starts flowing — lower heat"], [240, "Gurgle begins — remove & cool base"]] },
    coldbrew: { name: "Cold brew (concentrate)", ratio: 8, dose: 100, temp: 20, grind: "Coarse", time: "12–18 h", url: "brew/cold-brew.html",
      steps: [[0, "Combine grounds and cool water, stir"], [60, "Stir again, cover, refrigerate 12–18 h"]] },
    turkish: { name: "Turkish (cezve)", ratio: 10, dose: 7, temp: 95, grind: "Powder-fine", time: "2–3 min", url: "brew/turkish-coffee.html",
      steps: [[0, "Stir coffee (and sugar) into cold water"], [30, "Low heat — don't stir again"], [120, "Foam rises — pull before it boils"], [150, "Spoon foam into cup, pour"]] }
  };
  window.CH_METHODS = METHODS;

  /* Home method picker */
  var pk = $("#picker");
  if (pk) {
    var outs = { ratio: $("[data-o=ratio]", pk), temp: $("[data-o=temp]", pk), grind: $("[data-o=grind]", pk), time: $("[data-o=time]", pk) }, go = $("[data-o=link]", pk);
    $$(".chip", pk).forEach(function (ch) {
      ch.addEventListener("click", function () {
        $$(".chip", pk).forEach(function (x) { x.setAttribute("aria-pressed", "false"); }); ch.setAttribute("aria-pressed", "true");
        var m = METHODS[ch.getAttribute("data-m")];
        outs.ratio.textContent = "1:" + m.ratio; outs.temp.textContent = m.temp < 30 ? "Cold" : m.temp + "°C";
        outs.grind.textContent = m.grind; outs.time.textContent = m.time;
        go.href = ROOT + m.url; go.textContent = "Full " + m.name + " guide →";
      });
    });
    $(".chip", pk).click();
  }

  /* Brew ratio calculator */
  var rc = $("#ratio-calc");
  if (rc) {
    var mSel = $("#rc-method", rc), mode = $$("[name=rc-mode]", rc), dose = $("#rc-dose", rc), water = $("#rc-water", rc), ratio = $("#rc-ratio", rc), unit = $("#rc-unit", rc);
    var oBig = $("#rc-big", rc), oLbl = $("#rc-big-label", rc), oRatio = $("#rc-o-ratio", rc), oTemp = $("#rc-o-temp", rc), oGrind = $("#rc-o-grind", rc), oCup = $("#rc-o-cup", rc), oLink = $("#rc-link", rc);
    var vDose = $("#rc-v-dose", rc), vWater = $("#rc-v-water", rc), vRatio = $("#rc-v-ratio", rc);
    function byWater() { return $("[name=rc-mode]:checked", rc).value === "water"; }
    function calc() {
      var m = METHODS[mSel.value], R = +ratio.value, oz = unit.value === "oz";
      vRatio.textContent = "1:" + R;
      $("#rc-dose-row", rc).hidden = byWater(); $("#rc-water-row", rc).hidden = !byWater();
      if (byWater()) {
        var w = +water.value; vWater.textContent = w + " g"; var d = w / R;
        oBig.textContent = (oz ? r1(d / 28.35) + " oz" : r1(d) + " g"); oLbl.textContent = "Coffee to use";
        oCup.textContent = Math.round(w * (m.ratio <= 2 ? 1 : .9)) + " ml";
      } else {
        var dd = +dose.value; vDose.textContent = dd + " g"; var ww = dd * R;
        oBig.textContent = (oz ? r1(ww / 29.57) + " fl oz" : Math.round(ww) + " g"); oLbl.textContent = m.ratio <= 2 ? "Liquid yield (beverage weight)" : "Water to use";
        oCup.textContent = Math.round(m.ratio <= 2 ? ww : ww - dd * 2) + " ml";
      }
      oRatio.textContent = "1:" + R; oTemp.textContent = m.temp < 30 ? "Room temp / cold" : m.temp + "°C / " + Math.round(m.temp * 9 / 5 + 32) + "°F";
      oGrind.textContent = m.grind; oLink.href = ROOT + m.url; oLink.textContent = m.name + " step-by-step →";
    }
    mSel.addEventListener("change", function () {
      var m = METHODS[mSel.value]; ratio.min = m.ratio <= 2 ? 1.5 : (m.ratio < 10 ? 4 : 10); ratio.max = m.ratio <= 2 ? 3 : (m.ratio < 10 ? 12 : 19); ratio.step = m.ratio <= 2 ? .1 : .5;
      ratio.value = m.ratio; dose.value = m.dose; water.value = Math.round(m.dose * m.ratio); calc();
    });
    [dose, water, ratio, unit].forEach(function (el) { el.addEventListener("input", calc); });
    mode.forEach(function (el) { el.addEventListener("change", calc); });
    mSel.dispatchEvent(new Event("change"));
  }

  /* Caffeine calculator */
  var cc = $("#caf-calc");
  if (cc) {
    var DRINKS = [["Espresso (single, ~30 ml)", 63], ["Espresso (double)", 126], ["Drip / filter coffee (240 ml)", 95], ["Pour-over (300 ml)", 140], ["Cold brew (350 ml, diluted)", 155], ["Latte / cappuccino (double shot)", 126], ["Instant coffee (240 ml)", 62], ["Decaf coffee (240 ml)", 3], ["Black tea (240 ml)", 47], ["Green tea (240 ml)", 28], ["Cola (355 ml)", 34], ["Energy drink (250 ml)", 80]];
    var list = $("#caf-list", cc), addSel = $("#caf-add", cc), addTime = $("#caf-time", cc), bed = $("#caf-bed", cc), hl = $("#caf-hl", cc), log = [];
    DRINKS.forEach(function (d, i) { var o = document.createElement("option"); o.value = i; o.textContent = d[0] + " — ~" + d[1] + " mg"; addSel.appendChild(o); });
    function hm(v) { var p = v.split(":"); return +p[0] + (+p[1] || 0) / 60; }
    function paint() {
      var total = 0, atBed = 0, H = +hl.value, b = hm(bed.value);
      $("#caf-v-hl", cc).textContent = H + " h";
      list.innerHTML = log.length ? "" : '<li class="muted">Add what you drink today.</li>';
      log.forEach(function (e, i) {
        total += e.mg; var dt = b - e.t; if (dt < 0) dt += 24; atBed += e.mg * Math.pow(.5, dt / H);
        var li = document.createElement("li");
        li.innerHTML = "<span>" + e.n + " · " + e.ts + "</span><span>" + e.mg + ' mg <button class="chip" aria-label="Remove" data-i="' + i + '">✕</button></span>';
        list.appendChild(li);
      });
      $$("[data-i]", list).forEach(function (x) { x.addEventListener("click", function () { log.splice(+x.getAttribute("data-i"), 1); paint(); }); });
      $("#caf-total", cc).textContent = Math.round(total) + " mg";
      $("#caf-bedtime", cc).textContent = "~" + Math.round(atBed) + " mg";
      var pct = Math.round(total / 400 * 100); $("#caf-pct", cc).textContent = pct + "%";
      var msg = total === 0 ? "—" : total <= 200 ? "Moderate intake" : total <= 400 ? "Within the commonly cited 400 mg/day guide for healthy adults" : "Above the commonly cited 400 mg/day guide";
      $("#caf-msg", cc).textContent = msg;
    }
    $("#caf-add-btn", cc).addEventListener("click", function () {
      var d = DRINKS[+addSel.value]; log.push({ n: d[0], mg: d[1], t: hm(addTime.value), ts: addTime.value }); paint();
    });
    [bed, hl].forEach(function (el) { el.addEventListener("input", paint); });
    paint();
  }

  /* Brew timer */
  var bt = $("#brew-timer");
  if (bt) {
    var sel = $("#bt-method", bt), face = $("#bt-face", bt), ul = $("#bt-steps", bt), startB = $("#bt-start", bt), resetB = $("#bt-reset", bt), sound = $("#bt-sound", bt);
    var t0 = 0, acc = 0, running = false, raf, lastIdx = -1, actx;
    function beep() {
      if (!sound.checked) return;
      try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); var o = actx.createOscillator(), g = actx.createGain(); o.frequency.value = 880; g.gain.value = .08; o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + .18); } catch (e) {}
    }
    function build() {
      var m = METHODS[sel.value];
      ul.innerHTML = m.steps.map(function (s) { return "<li><span>" + s[1] + "</span><b>" + fmtTime(s[0]) + "</b></li>"; }).join("");
      $("#bt-meta", bt).textContent = m.dose + " g coffee · 1:" + m.ratio + " · " + (m.temp < 30 ? "cold water" : m.temp + "°C") + " · " + m.grind.toLowerCase() + " grind";
    }
    function tick() {
      var s = acc + (running ? (Date.now() - t0) / 1000 : 0), m = METHODS[sel.value];
      face.textContent = fmtTime(s);
      var idx = -1; m.steps.forEach(function (st, j) { if (s >= st[0]) idx = j; });
      $$("li", ul).forEach(function (li, j) { li.classList.toggle("now", j === idx); li.classList.toggle("done", j < idx); });
      if (idx !== lastIdx && running) { beep(); lastIdx = idx; }
      if (running) raf = requestAnimationFrame(tick);
    }
    startB.addEventListener("click", function () {
      if (running) { acc += (Date.now() - t0) / 1000; running = false; startB.textContent = "Resume"; cancelAnimationFrame(raf); }
      else { t0 = Date.now(); running = true; startB.textContent = "Pause"; tick(); }
    });
    resetB.addEventListener("click", function () { running = false; acc = 0; lastIdx = -1; cancelAnimationFrame(raf); startB.textContent = "Start"; tick(); });
    sel.addEventListener("change", function () { resetB.click(); build(); tick(); });
    build(); tick();
  }

  /* Coffee shop profit calculator (lead magnet) */
  var pc = $("#profit-calc");
  if (pc) {
    var ids = ["ticket", "cust", "days", "cogs", "labor", "rent", "other", "loan"];
    var el = {}; ids.forEach(function (k) { el[k] = $("#pc-" + k, pc); });
    function money(n) { return (n < 0 ? "−$" : "$") + Math.abs(Math.round(n)).toLocaleString(); }
    function calcP() {
      var v = {}; ids.forEach(function (k) { v[k] = +el[k].value; var o = $("#pc-v-" + k, pc); if (o) o.textContent = k === "cogs" ? v[k] + "%" : (k === "cust" || k === "days") ? v[k] : money(v[k]); });
      var rev = v.ticket * v.cust * v.days, gross = rev * (1 - v.cogs / 100), fixed = v.labor + v.rent + v.other + v.loan, net = gross - fixed;
      var be = v.ticket > 0 ? fixed / (v.ticket * (1 - v.cogs / 100) * v.days) : 0;
      $("#pc-rev", pc).textContent = money(rev); $("#pc-gross", pc).textContent = money(gross);
      $("#pc-net", pc).textContent = money(net); $("#pc-margin", pc).textContent = rev ? Math.round(net / rev * 100) + "%" : "—";
      $("#pc-be", pc).textContent = Math.ceil(be) + " / day"; $("#pc-year", pc).textContent = money(net * 12);
      $("#pc-rentpct", pc).textContent = rev ? Math.round(v.rent / rev * 100) + "%" : "—";
      $("#pc-laborpct", pc).textContent = rev ? Math.round(v.labor / rev * 100) + "%" : "—";
      pc._snap = { est_monthly_revenue: money(rev), est_monthly_net: money(net), breakeven_customers_day: Math.ceil(be), avg_ticket: v.ticket, customers_day: v.cust, cogs_pct: v.cogs, rent: v.rent, labor: v.labor };
    }
    ids.forEach(function (k) { el[k].addEventListener("input", calcP); }); calcP();
    var lf = $("#pc-lead");
    if (lf) lf._extra = function () { return pc._snap || {}; };
  }

  /* Find-your-coffee quiz */
  var qz = $("#quiz");
  if (qz) {
    var qs = $$(".quiz-q", qz), score = {}, qi = 0;
    var RESULTS = {
      pourover: ["Pour-over is your ritual", "You value clarity and nuance. A cone dripper with a light-to-medium roast will show you fruit and florals.", "brew/pour-over-v60.html", "Try a washed Ethiopian or Kenyan", "beans/ethiopia.html"],
      frenchpress: ["French press fits you", "Full body, low fuss, big batches. Choose a medium-to-dark roast with chocolate and nut notes.", "brew/french-press.html", "Try a Brazil or Sumatra", "beans/brazil.html"],
      espresso: ["You're an espresso person", "Intensity, milk drinks and café-style control. Start with a medium roast blend built for espresso.", "brew/espresso-at-home.html", "Make a flat white", "recipes/flat-white.html"],
      aeropress: ["AeroPress is your match", "Fast, forgiving, travel-friendly and endlessly tweakable — perfect for experimenters.", "brew/aeropress.html", "Try a Colombian", "beans/colombia.html"],
      coldbrew: ["Cold brew is calling", "Smooth, low-acid and ready in the fridge. Coarse grind, a medium-dark roast and patience.", "brew/cold-brew.html", "Make an iced latte", "recipes/iced-latte.html"],
      mokapot: ["Moka pot suits you", "Strong, stovetop and classic — an espresso-like brew without the machine.", "brew/moka-pot.html", "Make a Spanish latte", "recipes/spanish-latte.html"]
    };
    function showQ(n) { qs.forEach(function (q, j) { q.classList.toggle("on", j === n); }); $("#quiz-prog", qz).textContent = "Question " + Math.min(n + 1, qs.length) + " of " + qs.length; }
    $$(".quiz-q .chip", qz).forEach(function (b) {
      b.addEventListener("click", function () {
        b.getAttribute("data-s").split(" ").forEach(function (k) { score[k] = (score[k] || 0) + 1; });
        qi++;
        if (qi < qs.length) showQ(qi);
        else {
          var best = Object.keys(score).sort(function (a, b2) { return score[b2] - score[a]; })[0] || "pourover", r = RESULTS[best];
          qs.forEach(function (q) { q.classList.remove("on"); }); $("#quiz-prog", qz).textContent = "Your result";
          var o = $("#quiz-result", qz); o.hidden = false;
          o.innerHTML = '<span class="tag cop">Your match</span><h3 style="margin-top:10px">' + r[0] + "</h3><p>" + r[1] + '</p><div class="btn-row"><a class="btn primary" href="' + ROOT + r[2] + '">Open the guide</a><a class="btn ghost" href="' + ROOT + r[4] + '">' + r[3] + '</a><button class="btn ghost" type="button" id="quiz-again">Retake</button></div>';
          $("#quiz-again").addEventListener("click", function () { score = {}; qi = 0; o.hidden = true; showQ(0); });
        }
      });
    });
    showQ(0);
  }

  /* Flavor wheel (original Coffee.House taxonomy) */
  var fw = $("#flavor-wheel");
  if (fw) {
    var CATS = [
      ["Fruity", "#C2582F", [["Berry", "Blackberry, blueberry, raspberry — common in naturally processed and high-grown African coffees."], ["Citrus", "Lemon, orange, grapefruit — bright acidity typical of washed East African and Central American lots."], ["Stone fruit", "Peach, apricot, cherry — juicy sweetness from ripe, carefully sorted cherries."], ["Tropical", "Mango, pineapple, passion fruit — often from natural or experimental fermentations."]], "Fruit notes come from organic acids and aromatic compounds that light roasting preserves. Explore Ethiopia and Kenya."],
      ["Floral", "#B0688F", [["Jasmine", "Delicate, perfumed aroma associated with heirloom Ethiopian varieties."], ["Rose", "Soft, sweet florals; look for light roasts and Gesha-type varieties."], ["Chamomile", "Gentle herbal-floral sweetness, often in washed coffees."]], "Florals are the most fragile aromatics — brew lighter roasts with fresh beans and good water."],
      ["Sweet", "#D49A4E", [["Caramel", "Cooked-sugar sweetness developed during medium roasting."], ["Honey", "Rounded, syrupy sweetness — common in honey-processed coffees."], ["Brown sugar", "Molasses-like depth found in many Central and South American coffees."], ["Vanilla", "Creamy, aromatic sweetness that reads as softness on the palate."]], "Sweetness is the backbone of a balanced cup. Under-extraction hides it; dial in for it."],
      ["Nutty & cocoa", "#7A4A2E", [["Almond", "Light, clean nuttiness — classic in Brazilian coffees."], ["Hazelnut", "Toasty, rich nut note common in medium roasts."], ["Milk chocolate", "Smooth cocoa sweetness that loves milk drinks."], ["Dark chocolate", "Bittersweet depth from longer roast development."]], "These notes are crowd-pleasers and work brilliantly for espresso and French press."],
      ["Spice", "#A8322A", [["Cinnamon", "Warm, sweet spice — appears in some Central American and Indian coffees."], ["Clove", "Pungent, aromatic spice; can signal deeper roast development."], ["Black pepper", "Sharp, savory edge sometimes found in Indonesian coffees."]], "Spice notes sit between sweetness and roast. Try a Guatemalan or Sumatran."],
      ["Roasted", "#3A2A20", [["Toast", "Bread-crust and cereal notes from Maillard reactions."], ["Smoky", "From darker roasts — pleasant in moderation, ashy when overdone."], ["Tobacco", "Dry, deep, slightly sweet — typical in dark roasts and some aged coffees."]], "Roast flavors grow with time and heat in the roaster. See the roast-levels guide."],
      ["Earthy", "#5B5A3A", [["Cedar", "Woody, resinous note found in some wet-hulled coffees."], ["Forest floor", "Damp, mushroom-like depth — classic Sumatra signature."], ["Herbal", "Fresh herbs or dried hay; can be lovely or a sign of under-ripe cherries."]], "Earthy profiles divide drinkers — try a Sumatran to see where you stand."],
      ["Fermented", "#6E3B5C", [["Winey", "Red-wine-like fruit and acidity; prized when clean."], ["Boozy", "Rum or brandy-like notes from extended or anaerobic fermentations."], ["Yogurt", "Lactic tang — can come from specific fermentation styles."]], "Fermentation-driven flavors are a frontier of specialty coffee. Read processing methods to understand why."],
      ["Green / bright", "#3D6B58", [["Green apple", "Crisp malic acidity, refreshing in washed coffees."], ["Fresh herbs", "Mint, lemongrass, basil — lifted and aromatic."], ["Snap pea", "Vegetal note that can indicate under-development in roasting."]], "Green notes are lively when balanced — and a clue for roasters when they dominate."]
    ];
    var svg = $("svg", fw), info = $("#fw-info"), cx = 160, cy = 160;
    function arc(r0, r1, a0, a1) {
      function p(r, a) { return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
      var L = a1 - a0 > Math.PI ? 1 : 0, A = p(r1, a0), B = p(r1, a1), C = p(r0, a1), D = p(r0, a0);
      return "M" + A + "A" + r1 + "," + r1 + " 0 " + L + " 1 " + B + "L" + C + "A" + r0 + "," + r0 + " 0 " + L + " 0 " + D + "Z";
    }
    var total = CATS.reduce(function (n, c) { return n + c[2].length; }, 0), a = -Math.PI / 2, html = "", unit = 2 * Math.PI / total;
    CATS.forEach(function (c, ci) {
      var span = c[2].length * unit, mid = a + span / 2;
      html += '<path d="' + arc(48, 108, a, a + span) + '" fill="' + c[1] + '" data-c="' + ci + '" tabindex="0" role="button" aria-label="' + c[0] + '"></path>';
      var tx = cx + 78 * Math.cos(mid), ty = cy + 78 * Math.sin(mid);
      html += '<text x="' + tx + '" y="' + ty + '" text-anchor="middle" dominant-baseline="middle" font-size="9.5">' + c[0].split(" ")[0] + "</text>";
      c[2].forEach(function (d, di) {
        var b0 = a + di * unit, b1 = b0 + unit, m2 = (b0 + b1) / 2;
        html += '<path d="' + arc(110, 156, b0, b1) + '" fill="' + c[1] + '" opacity=".78" data-c="' + ci + '" data-d="' + di + '" tabindex="0" role="button" aria-label="' + d[0] + '"></path>';
        var rx = cx + 133 * Math.cos(m2), ry = cy + 133 * Math.sin(m2), deg = m2 * 180 / Math.PI; if (deg > 90 && deg < 270) deg += 180;
        html += '<text x="' + rx + '" y="' + ry + '" text-anchor="middle" dominant-baseline="middle" font-size="8" transform="rotate(' + deg + " " + rx + " " + ry + ')">' + d[0] + "</text>";
      });
      a += span;
    });
    html += '<circle cx="160" cy="160" r="44" fill="var(--paper)" stroke="var(--line)"></circle><text x="160" y="156" text-anchor="middle" style="fill:var(--ink);font:600 12px var(--f-display)">Tap a</text><text x="160" y="171" text-anchor="middle" style="fill:var(--ink);font:600 12px var(--f-display)">flavor</text>';
    svg.innerHTML = html;
    function pick(p) {
      var c = CATS[+p.getAttribute("data-c")], d = p.hasAttribute("data-d") ? c[2][+p.getAttribute("data-d")] : null;
      info.innerHTML = '<span class="tag" style="color:' + c[1] + ';background:color-mix(in srgb,' + c[1] + ' 14%,transparent)">' + c[0] + "</span>" +
        "<h3 style='margin-top:12px'>" + (d ? d[0] : c[0]) + "</h3><p>" + (d ? d[1] : c[3]) + "</p>" +
        (d ? "<p class='muted'>" + c[3] + "</p>" : "<ul>" + c[2].map(function (x) { return "<li><b>" + x[0] + "</b> — " + x[1] + "</li>"; }).join("") + "</ul>");
    }
    $$("path", svg).forEach(function (p) {
      p.addEventListener("click", function () { pick(p); });
      p.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(p); } });
    });
  }
})();
