/* Nadja Glow & Strong Dashboard. Vanilla JS, Daten aus data.js (window.NADJA).
   Persönliche Häkchen, Favoriten und Tracker liegen nur im Browser (localStorage). */
(function () {
  "use strict";
  const D = window.NADJA;
  const app = document.getElementById("app");
  const VIEWS = ["start", "strategie", "ideen", "vorbilder", "recht"];
  const WT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const AUFWAND = ["", "leicht", "mittel", "aufwendig"];

  /* ---------- Helfer ---------- */
  const I = {
    glow: '<path d="M12 3.5c3 3.6 6 7 6 10.3A6 6 0 0 1 6 13.8c0-3.3 3-6.7 6-10.3z"/><path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2.4"/>',
    strong: '<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',
    longevity: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="M5 19l8-8"/>',
    mindset: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".6"/>',
    real: '<path d="M4.5 5h15v10.5H10l-5.5 4z"/><path d="M8.5 9.5h7M8.5 12h4"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    copy: '<rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2"/><path d="M15.5 8.5V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9.5a1 1 0 0 0 1 1h3.5"/>',
    shuffle: '<path d="M3 7h3.5c2 0 3.3 1 4.3 2.7l2.4 4.6c.9 1.7 2.3 2.7 4.3 2.7H21M3 17h3.5c1.3 0 2.3-.4 3.1-1.2M14.4 8.2c.8-.8 1.8-1.2 3.1-1.2H21M18 4l3 3-3 3M18 14l3 3-3 3"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.3-4.3"/>',
    out: '<path d="M7 17 17 7M9 7h8v8"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    trash: '<path d="M4.5 7h15M10 7V4.5h4V7M6.5 7l1 12.5h9l1-12.5"/>',
    bookmark: '<path d="M6.5 4h11v16l-5.5-4-5.5 4z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    scale: '<path d="M12 3v18M5 7h14M5 7l-2.5 6a3 3 0 0 0 5 0zM19 7l-2.5 6a3 3 0 0 0 5 0zM8 21h8"/>'
  };
  const ic = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${I[n] || ""}</svg>`;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmt = (n) => Number(n).toLocaleString("de-DE");
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const store = {
    get(k, d) { try { const v = localStorage.getItem("nadja." + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("nadja." + k, JSON.stringify(v)); } catch (e) { /* privat oder voll: egal, Seite läuft weiter */ } }
  };
  const clip = [];
  const reg = (t) => { clip.push(t); return clip.length - 1; };

  const saeule = Object.fromEntries(D.saeulen.map((s) => [s.key, s]));
  const format = Object.fromEntries(D.formate.map((f) => [f.key, f]));
  const fav = new Set(store.get("fav", []));
  const done = new Set(store.get("done", []));
  let eigene = store.get("eigene", []);
  const state = { s: "alle", f: "alle", status: "alle", q: "", hookTyp: "Alle", sagThema: "Alle", land: "Alle", week: null, gen: null };

  const blueprintFor = (id) => (D.blueprints || []).find((b) => String(b.idee) === String(id));
  const findIdea = (id) => D.ideen.find((i) => String(i.id) === String(id)) || eigene.find((i) => String(i.id) === String(id));
  const tagsFor = (s, n) => { const set = D.hashtags.find((h) => h.saeule === s) || D.hashtags[0]; return set.tags.slice(0, n || 4).concat(s === "glow" ? ["#nadjatestet"] : []); };

  function toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 1700);
  }
  function copy(text) {
    const ok = () => toast("Kopiert");
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(ok, () => fallback()); } else fallback();
    function fallback() {
      const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); ok(); } catch (e) { toast("Kopieren ging nicht"); }
      ta.remove();
    }
  }

  /* ---------- Datum und Plan ---------- */
  function startDate() { const d = new Date((store.get("start", D.planStart)) + "T00:00:00"); return isNaN(d) ? new Date(D.planStart + "T00:00:00") : d; }
  function today() {
    const s = startDate(); const n = new Date(); n.setHours(0, 0, 0, 0);
    const diff = Math.round((n - s) / 864e5);
    if (diff < 0) return { pre: true, until: -diff, week: 0, wd: -1, day: 0, round: 1 };
    return { pre: false, week: Math.floor(diff / 7) % 4, wd: diff % 7, day: diff + 1, round: Math.floor(diff / 28) + 1, cycleStart: Math.floor(diff / 28) * 28 };
  }
  function planDate(week, t) {
    const td = today(); const d = startDate();
    d.setDate(d.getDate() + (td.pre ? 0 : td.cycleStart) + week * 7 + t);
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
  }

  /* ---------- Bausteine ---------- */
  const sec = (id, title, sub, body) => `<section class="sec rise" id="${id}"><div class="sec__head"><div><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ""}</div></div>${body}</section>`;
  const list = (arr) => `<ul class="list">${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  const dot = (s) => `<i class="dot" style="background:${saeule[s] ? saeule[s].farbe : "#ddd"}"></i>`;
  const tagS = (s) => `<span class="tag">${dot(s)}${esc(saeule[s] ? saeule[s].name : s)}</span>`;
  const checkBtn = (key, i, text, sub) => {
    const on = store.get("chk." + key, []).includes(i);
    return `<button class="check${on ? " on" : ""}" data-check="${key}" data-i="${i}" aria-pressed="${on}"><span class="box">${ic("check")}</span><span class="ct">${esc(text)}${sub ? `<small>${esc(sub)}</small>` : ""}</span></button>`;
  };
  const copyBtn = (text, label) => label
    ? `<button class="btn btn--sm btn--ghost" data-copy="${reg(text)}">${ic("copy")}${esc(label)}</button>`
    : `<button class="iconbtn" data-copy="${reg(text)}" aria-label="Kopieren">${ic("copy")}</button>`;

  const bottle = `<svg class="bottle" viewBox="0 0 200 260" aria-hidden="true">
    <defs>
      <linearGradient id="gl" x1="0" x2="1"><stop offset="0" stop-color="#F7DCD3"/><stop offset=".55" stop-color="#EDB7A8"/><stop offset="1" stop-color="#D99486"/></linearGradient>
      <linearGradient id="cap" x1="0" x2="1"><stop offset="0" stop-color="#3A3B41"/><stop offset=".5" stop-color="#242529"/><stop offset="1" stop-color="#17181B"/></linearGradient>
      <linearGradient id="gold" x1="0" x2="1"><stop offset="0" stop-color="#E9D1AE"/><stop offset=".5" stop-color="#C9A57A"/><stop offset="1" stop-color="#A9835B"/></linearGradient>
      <radialGradient id="sh"><stop offset="0" stop-color="#8E5A50" stop-opacity=".35"/><stop offset="1" stop-color="#8E5A50" stop-opacity="0"/></radialGradient>
    </defs>
    <ellipse cx="100" cy="246" rx="70" ry="10" fill="url(#sh)"/>
    <path d="M86 14c0-6 6-10 14-10s14 4 14 10v34H86z" fill="url(#cap)"/>
    <rect x="80" y="44" width="40" height="52" rx="8" fill="url(#cap)"/>
    <rect x="76" y="92" width="48" height="16" rx="4" fill="url(#gold)"/>
    <rect x="52" y="104" width="96" height="138" rx="24" fill="url(#gl)"/>
    <rect x="62" y="114" width="12" height="110" rx="6" fill="#fff" opacity=".35"/>
    <rect x="80" y="150" width="56" height="54" rx="6" fill="#fff" opacity=".82"/>
    <text x="108" y="174" text-anchor="middle" font-family="Urbanist, sans-serif" font-size="11" font-weight="800" fill="#242529" letter-spacing="2">GLOW</text>
    <text x="108" y="190" text-anchor="middle" font-family="Instrument Serif, serif" font-style="italic" font-size="12" fill="#8C6A5E">peptide care</text>
    <path d="M164 150c4 6 8 10 8 15a8 8 0 0 1-16 0c0-5 4-9 8-15z" fill="#E8B3B8"/>
  </svg>`;

  /* ---------- START ---------- */
  function vStart() {
    const td = today();
    let item, eyebrow;
    if (td.pre) { item = findIdea(D.plan[0][0].idee); eyebrow = `Neustart in ${td.until} ${td.until === 1 ? "Tag" : "Tagen"} · Mo ${planDate(0, 0)}`; }
    else {
      const p = D.plan[td.week].find((x) => x.t === td.wd);
      item = p ? findIdea(p.idee) : null;
      eyebrow = `Heute · ${WT[td.wd]} · Woche ${td.week + 1}${td.round > 1 ? ` · Runde ${td.round}` : ""}`;
    }
    const dayNum = td.pre ? 0 : Math.min(td.day, 90);
    const chkN = store.get("chk.neustart", []).length;
    const heute = item
      ? `<div class="card card--dark"><i class="today__glow"></i><span class="eyebrow" style="color:#E8B3B8">${esc(eyebrow)}</span>
          <h3>${esc(item.titel)}</h3><p class="hookline">“${esc(item.hook)}”</p>
          <p class="muted" style="margin-top:10px">${esc(format[item.f] ? format[item.f].name : "")} · Aufwand ${AUFWAND[item.a] || "leicht"}</p>
          <button class="btn btn--light" data-open="${item.id}">Idee öffnen ${ic("arrow")}</button></div>`
      : `<div class="card card--dark"><i class="today__glow"></i><span class="eyebrow" style="color:#E8B3B8">${esc(eyebrow)}</span>
          <h3>Heute ist frei.</h3><p class="hookline">Optional: 10 Sekunden “Tag ${dayNum} von 90”.</p>
          <button class="btn btn--light" data-open="20">Serie öffnen ${ic("arrow")}</button></div>`;

    const weekSel = state.week == null ? td.week : state.week;
    const k = D.kanal;
    return `<div class="view">
      <section class="hero rise">
        <div class="hero__grid">
          <div>
            <span class="eyebrow" style="color:#7A4E45">Social Media Strategie · TikTok</span>
            <h1 style="margin-top:10px">Pro-Aging statt <span class="serif">Anti-Aging.</span></h1>
            <p>${esc(D.positionierung.satz)}</p>
            <div class="hero__cta"><a class="btn" href="#ideen">Content-Ideen ${ic("arrow")}</a><a class="btn btn--ghost" href="#recht">Rechts-Check</a></div>
          </div>
          <div class="hero__art">${bottle}
            <span class="float-chip fc1">${dot("glow")}Glow <small>35 %</small></span>
            <span class="float-chip fc2">${dot("strong")}Strong <small>25 %</small></span>
            <span class="float-chip fc3">${dot("longevity")}Longevity <small>20 %</small></span>
          </div>
        </div>
      </section>

      <div class="today rise" style="animation-delay:.06s">
        ${heute}
        <div class="card">
          <span class="eyebrow">Serie</span>
          <div class="counter" style="margin-top:8px"><b>${dayNum}</b><span>von 90 Tagen</span></div>
          <div class="bar"><i style="width:${(dayNum / 90) * 100}%"></i></div>
          <p class="muted" style="margin-top:14px;font-size:14px">Neustart-Checkliste: <b style="color:var(--ink)">${chkN} von ${D.neustart.length}</b> erledigt</p>
          <div class="bar"><i style="width:${(chkN / D.neustart.length) * 100}%"></i></div>
        </div>
      </div>

      <div class="stats rise" style="animation-delay:.1s">
        <div class="stat"><small>Follower</small><b>${fmt(k.follower)}</b><em>Ziel 90 Tage: 3.000</em></div>
        <div class="stat"><small>Ø Views pro Video</small><b>${fmt(k.viewsSchnitt)}</b><em>Ziel: 5.000</em></div>
        <div class="stat"><small>Bestes Video</small><b>${fmt(k.viewsTop)}</b><em>Ziel: 10.000+</em></div>
        <div class="stat"><small>Likes gesamt</small><b>${fmt(k.likes)}</b><em>Stand ${esc(D.stand)}</em></div>
      </div>

      ${sec("s-saeulen", "Fünf Säulen", "Tippen zeigt die passenden Ideen", `<div class="tiles">${D.saeulen.map((s) => `<button class="tile" data-tile="${s.key}" style="background:${s.farbe}">${ic(s.key)}<span><b>${esc(s.name)}</b><small>${s.anteil} % der Videos</small></span></button>`).join("")}</div>`)}

      ${sec("s-plan", "Dein 4-Wochen-Plan", `Start Montag ${planDate(0, 0)}, danach wiederholt sich der Rhythmus mit neuen Hooks.`,
        `<div class="chips chips--scroll" style="margin-bottom:12px">${D.plan.map((_, i) => `<button class="chip${i === weekSel ? " on" : ""}" data-week="${i}">Woche ${i + 1}</button>`).join("")}</div>
         <div class="week">${WT.map((w, t) => {
           const p = D.plan[weekSel].find((x) => x.t === t);
           const isToday = !td.pre && td.week === weekSel && td.wd === t;
           if (!p) return `<div class="day day--free${isToday ? " day--today" : ""}"><span class="day__d">${w}<small>${planDate(weekSel, t)}</small></span><span class="day__t">Frei<small>optional Tag X von 90</small></span></div>`;
           const it = findIdea(p.idee); const dn = done.has(it.id);
           return `<button class="day${isToday ? " day--today" : ""}${dn ? " day--done" : ""}" data-open="${it.id}"><span class="day__d">${w}<small>${planDate(weekSel, t)}</small></span><span class="day__t">${esc(it.titel)}<small>${dot(it.s)} ${esc(format[it.f].name)}${it.skript && (it.skript.woche || 1) === weekSel + 1 ? '<em class="pill-skript">Skript</em>' : ""}</small></span><span class="ok${dn ? " on" : ""}">${ic("check")}</span></button>`;
         }).join("")}</div>`)}

      ${sec("s-neustart", "Neustart-Checkliste", "Woche 1. Einmal erledigen, dann geht es los.",
        `<div class="checks">${D.neustart.map((t, i) => checkBtn("neustart", i, t)).join("")}</div>`)}

      ${sec("s-tracker", "Wochen-Tracker", "Jeden Sonntag aus TikTok Analytics eintragen. Wird nur auf diesem Gerät gespeichert.", trackerHtml())}

      ${sec("s-roadmap", "90 Tage in drei Phasen", "", `<div class="grid g3">${D.roadmap.map((r, i) => `<div class="card phase"><div class="num">${i + 1}</div><span class="eyebrow">${esc(r.wochen)}</span><h3 style="margin-top:4px">${esc(r.phase)}</h3>${list(r.punkte)}</div>`).join("")}</div>`)}
    </div>`;
  }

  function trackerHtml() {
    const rows = store.get("tracker", []).slice().sort((a, b) => a.d.localeCompare(b.d));
    const all = [{ d: "2026-10-15", fol: D.kanal.follower, views: D.kanal.viewsSchnitt, top: D.kanal.viewsTop, base: true }].concat(rows);
    const show = all.slice(-10);
    const max = Math.max(...show.map((r) => +r.views || 0), 1);
    const W = 600, H = 150, bw = W / show.length;
    const bars = show.map((r, i) => {
      const h = Math.max(4, ((+r.views || 0) / max) * (H - 42));
      const x = i * bw + bw * 0.22, w = bw * 0.56;
      const lab = new Date(r.d + "T00:00:00").toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
      return `<rect x="${x}" y="${H - 22 - h}" width="${w}" height="${h}" rx="6" fill="${r.base ? "#E8D5CC" : i === show.length - 1 ? "#242529" : "#E8B3B8"}"/>
        <text x="${x + w / 2}" y="${H - 26 - h}" text-anchor="middle" font-size="12" font-weight="700" fill="#3B3B40" font-family="Urbanist">${fmt(r.views)}</text>
        <text x="${x + w / 2}" y="${H - 6}" text-anchor="middle" font-size="11" fill="#8C827D" font-family="Urbanist">${lab}</text>`;
    }).join("");
    const iso = new Date().toISOString().slice(0, 10);
    return `<div class="card">
      <form class="track-form" id="trackForm">
        <div class="field"><label for="tf-f">Follower</label><input id="tf-f" inputmode="numeric" pattern="[0-9.]*" placeholder="1.110" required></div>
        <div class="field"><label for="tf-v">Ø Views</label><input id="tf-v" inputmode="numeric" pattern="[0-9.]*" placeholder="456" required></div>
        <div class="field"><label for="tf-t">Bestes Video</label><input id="tf-t" inputmode="numeric" pattern="[0-9.]*" placeholder="1.231"></div>
        <input type="hidden" id="tf-d" value="${iso}">
        <button class="btn" type="submit">Eintragen</button>
      </form>
      <div class="chart"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Durchschnittliche Views pro Woche">${bars}</svg></div>
      <div class="track-rows">
        <div class="hd"><span>Datum</span><span>Follower</span><span>Ø Views</span><span>Top</span><span></span></div>
        ${all.slice().reverse().map((r) => `<div><span>${new Date(r.d + "T00:00:00").toLocaleDateString("de-DE")}${r.base ? " (Start)" : ""}</span><span>${fmt(r.fol)}</span><span>${fmt(r.views)}</span><span>${r.top ? fmt(r.top) : ""}</span><span>${r.base ? "" : `<button data-deltrack="${esc(r.d)}" aria-label="Eintrag löschen">${ic("trash")}</button>`}</span></div>`).join("")}
      </div>
    </div>`;
  }

  /* ---------- STRATEGIE ---------- */
  function vStrategie() {
    const P = D.positionierung, A = D.analyse, K = D.kanal;
    const jump = [["s-analyse", "Analyse"], ["s-position", "Positionierung"], ["s-persona", "Zielgruppe"], ["s-saeulen2", "Säulen"], ["s-formate", "Formate"], ["s-rhythmus", "Rhythmus"], ["s-hooks", "Hooks"], ["s-hashtags", "Hashtags"], ["s-profil", "Profil"], ["s-live", "LIVE"], ["s-ziele", "Ziele"], ["s-geld", "Geld verdienen"]];
    const hookTypes = ["Alle"].concat([...new Set(D.hooks.map((h) => h.typ))]);
    const hooks = D.hooks.filter((h) => state.hookTyp === "Alle" || h.typ === state.hookTyp);
    return `<div class="view">
      <span class="eyebrow">Strategie · Stand ${esc(D.stand)}</span>
      <h1 style="font-size:clamp(32px,7vw,52px);font-weight:800;margin-top:6px;letter-spacing:-.03em">Der Plan für <span class="serif">mehr Reichweite.</span></h1>
      <div class="subnav"><div class="chips chips--scroll">${jump.map(([id, n]) => `<button class="chip" data-jump="${id}">${n}</button>`).join("")}</div></div>

      ${sec("s-analyse", "Ist-Analyse des Kanals", `${K.handle} · ${fmt(K.follower)} Follower · Ø ${fmt(K.viewsSchnitt)} Views aus ${K.gezaehlt} gezählten Videos, bestes ${fmt(K.viewsTop)}`,
        `<div class="grid g3 swot">
          <div class="card"><h4><i class="dot"></i>Stärken</h4>${list(A.staerken)}</div>
          <div class="card"><h4><i class="dot"></i>Baustellen</h4>${list(A.schwaechen)}</div>
          <div class="card"><h4><i class="dot"></i>Chancen</h4>${list(A.chancen)}</div>
        </div>`)}

      ${sec("s-position", "Positionierung", "",
        `<div class="card"><p class="quote">${esc(P.claim)}</p><p class="lead" style="margin-top:12px">${esc(P.satz)}</p>
          <div class="card card--soft" style="margin-top:16px"><span class="eyebrow">Was Nadja anders macht</span><p style="margin-top:6px;font-weight:600">${esc(P.usp)}</p></div>
          <div class="chips" style="margin-top:16px">${P.werte.map((w) => `<span class="chip">${esc(w)}</span>`).join("")}</div></div>`)}

      ${sec("s-persona", "Zielgruppe", "Frauen ab 30 bis 35, Schwerpunkt 40 plus",
        `<div class="card persona"><div class="avatar">${esc(D.persona.name[0])}</div><div><h3>${esc(D.persona.name)}</h3><p style="margin-top:6px">${esc(D.persona.text)}</p>
          <div class="grid g2" style="margin-top:14px"><div><span class="eyebrow">Was sie nervt</span>${list(D.persona.schmerzen)}</div><div><span class="eyebrow">Was sie sucht</span>${list(D.persona.wuensche)}</div></div></div></div>`)}

      ${sec("s-saeulen2", "Content-Säulen", "So verteilen sich die Videos",
        `<div class="share">${D.saeulen.map((s) => `<i style="width:${s.anteil}%;background:${s.farbe}" title="${esc(s.name)} ${s.anteil} %"></i>`).join("")}</div>
         <div class="grid g3">${D.saeulen.map((s) => `<div class="card"><span class="tag" style="background:${s.farbe}">${ic(s.key)}${s.anteil} %</span><h3 style="margin-top:10px">${esc(s.name)}</h3><p class="muted" style="margin-top:4px">${esc(s.text)}</p></div>`).join("")}</div>`)}

      ${sec("s-formate", "Formate, die nur ein Handy brauchen", "Stativ, Handy, Mikro. Kein Schnittprogramm nötig.",
        `<div class="grid g4">${D.formate.map((f) => `<div class="card fmt"><b>${esc(f.name)}<small>${esc(f.zeit)}</small></b><p>${esc(f.text)}</p></div>`).join("")}</div>`)}

      ${sec("s-rhythmus", "Wochenrhythmus", "5 Posts plus 1 LIVE. Gedreht an einem Tag.",
        `<div class="rhythm">${D.rhythmus.map((r) => `<div style="background:${saeule[r.saeule].farbe}"><b>${r.tag}</b>${esc(r.was)}</div>`).join("")}</div>
         <div class="grid g3" style="margin-top:14px">${D.produktion.map((p) => `<div class="card card--soft"><h3 style="font-size:16px">${esc(p.titel)}</h3><p class="muted" style="margin-top:6px;font-size:14.5px">${esc(p.text)}</p></div>`).join("")}</div>`)}

      ${sec("s-hooks", "Hook-Bibliothek", "Die ersten 2 Sekunden entscheiden. [Platzhalter] selbst füllen.",
        `<div class="card card--dark" style="margin-bottom:14px"><span class="eyebrow" style="color:#E8B3B8">Hook-Regeln</span><ul class="list">${D.hookRegeln.map((r) => `<li>${esc(r)}</li>`).join("")}</ul></div>
         <div class="chips chips--scroll" style="margin-bottom:12px">${hookTypes.map((t) => `<button class="chip${state.hookTyp === t ? " on" : ""}" data-hooktyp="${esc(t)}">${esc(t)}</button>`).join("")}</div>
         <div class="grid g2">${hooks.map((h) => `<div class="hookrow"><p><small>${esc(h.typ)}</small>${esc(h.t).replace(/\[([^\]]+)\]/g, "<mark>[$1]</mark>")}</p>${copyBtn(h.t)}</div>`).join("")}</div>`)}

      ${sec("s-hashtags", "Hashtags und Such-Keywords", "3 bis 5 pro Video. TikTok ist eine Suchmaschine.",
        `<div class="grid g3">${D.hashtags.map((h) => `<div class="card tagset"><span class="tag" style="background:${saeule[h.saeule].farbe}">${ic(h.saeule)}${esc(h.name)}</span><div class="tags">${h.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>${copyBtn(h.tags.join(" "), "Alle kopieren")}</div>`).join("")}
          <div class="card tagset tabu"><span class="tag" style="background:var(--no-bg);color:var(--no-ink)">Finger weg</span><div class="tags">${D.hashtagTabu.map((t) => `<span>${esc(t)}</span>`).join("")}</div><p class="muted" style="font-size:14px">Diese Tags hängen an gesperrten Inhalten. Ein einziger kann die Reichweite des ganzen Kontos drücken.</p></div>
        </div>
        <div class="grid g2" style="margin-top:12px">
          <div class="card"><h3>Regeln</h3>${list(D.hashtagRegeln)}</div>
          <div class="card"><h3>Such-Keywords</h3><p class="muted" style="margin-top:4px;font-size:14px">Im Hook sagen, als Text einblenden und in die Beschreibung schreiben. Tippen kopiert.</p><div class="chips" style="margin-top:12px">${D.keywords.map((k) => `<button class="chip" data-copy="${reg(k)}">${esc(k)}</button>`).join("")}</div></div>
        </div>`)}

      ${sec("s-profil", "Profil und Bio", "TikTok erlaubt 80 Zeichen in der Bio.",
        `<div class="bio">${D.bio.map((b) => `<div class="bio__row"><p>${esc(b)}<small>${[...b].length} von 80 Zeichen</small></p>${copyBtn(b)}</div>`).join("")}</div>
         <div class="grid g2" style="margin-top:12px">
           <div class="card"><h3>Name und Handle</h3><div class="chips" style="margin-top:12px">${D.namen.map((n) => `<button class="chip" data-copy="${reg(n)}">${esc(n)}</button>`).join("")}</div><p class="muted" style="margin-top:10px;font-size:14px">Verfügbarkeit in der App prüfen.</p></div>
           <div class="card"><h3>Profil-Check</h3>${list(D.profilTipps)}</div>
         </div>`)}

      ${sec("s-live", "LIVE-Konzepte", "Bindung statt Reichweite. Aus jedem LIVE werden 3 Clips.",
        `<div class="grid g2">${D.lives.map((l) => `<div class="card"><span class="eyebrow">${esc(l.wann)}</span><h3 style="margin-top:4px">${esc(l.name)}</h3>${list(l.ablauf)}</div>`).join("")}</div>
         <div class="card card--soft" style="margin-top:12px"><h3 style="font-size:16px">LIVE-Regeln</h3>${list(D.liveRegeln)}</div>`)}

      ${sec("s-ziele", "Ziele für 90 Tage", "Zielmarken, keine Garantie. Gemessen in TikTok Analytics.",
        `<div class="card tablewrap"><table class="kpi"><thead><tr><th>Kennzahl</th><th>Jetzt</th><th>Monat 1</th><th>Monat 2</th><th>Monat 3</th></tr></thead><tbody>${D.kpis.map((k) => `<tr><td>${esc(k.name)}</td><td>${esc(k.jetzt)}</td><td>${esc(k.m1)}</td><td>${esc(k.m2)}</td><td>${esc(k.m3)}</td></tr>`).join("")}</tbody></table></div>
         <div class="card card--soft" style="margin-top:12px"><h3 style="font-size:16px">Sonntags-Routine, 10 Minuten</h3>${list(D.analyseRoutine)}</div>`)}

      ${sec("s-geld", "Legal Geld verdienen", "Schritt für Schritt, ohne Wirkstoff-Verkauf",
        `<div class="money grid g2">${D.monetarisierung.map((m) => `<div class="card"><h3 style="font-size:16px">${esc(m.name)}</h3><span class="when">${esc(m.wann)}</span><p>${esc(m.text)}</p></div>`).join("")}</div>`)}
    </div>`;
  }

  /* ---------- IDEEN ---------- */
  function vIdeen() {
    const sFilter = ["alle"].concat(D.saeulen.map((s) => s.key));
    const fFilter = ["alle"].concat(D.formate.map((f) => f.key));
    return `<div class="view">
      <section class="gen rise">
        <div>
          <span class="eyebrow" style="color:#7A4E45">Ideen-Generator</span>
          <h2 style="margin-top:6px">Neue Idee <span class="serif">in einem Tipp.</span></h2>
          <p style="margin-top:8px;color:#5A463F;font-size:15px">Mischt Hook, Thema und Format. ${state.s === "alle" ? "Aus allen Säulen." : "Nur " + esc(saeule[state.s].name) + "."}</p>
          <div class="gen__btns"><button class="btn" data-gen>${ic("shuffle")}Mischen</button></div>
        </div>
        <div class="gen__out" id="genOut">${genHtml()}</div>
      </section>
      ${bpRowHtml()}

      <div class="toolbar">
        <div class="chips chips--scroll">${sFilter.map((k) => `<button class="chip${state.s === k ? " on" : ""}" data-fs="${k}">${k === "alle" ? "Alle" : dot(k) + esc(saeule[k].name)}</button>`).join("")}</div>
        <label class="search"><span class="sr">Suchen</span>${ic("search")}<input id="q" type="search" placeholder="Suchen, z. B. Sonnencreme" value="${esc(state.q)}" autocomplete="off"></label>
      </div>
      <div class="chips chips--scroll" style="margin-top:10px">${fFilter.map((k) => `<button class="chip${state.f === k ? " on" : ""}" data-ff="${k}">${k === "alle" ? "Alle Formate" : esc(format[k].name)}</button>`).join("")}</div>
      <div class="chips chips--scroll" style="margin-top:10px">${[["alle", "Alle"], ["fav", "Gemerkt"], ["offen", "Offen"], ["erledigt", "Erledigt"]].map(([k, n]) => `<button class="chip${state.status === k ? " on" : ""}" data-fst="${k}">${n}</button>`).join("")}</div>
      <div class="ideas" id="ideaGrid">${gridHtml()}</div>
    </div>`;
  }

  function gridHtml() {
    const q = state.q.trim().toLowerCase();
    const all = eigene.concat(D.ideen);
    const res = all.filter((i) => (state.s === "alle" || i.s === state.s)
      && (state.f === "alle" || i.f === state.f)
      && (state.status === "alle" || (state.status === "fav" && fav.has(i.id)) || (state.status === "offen" && !done.has(i.id)) || (state.status === "erledigt" && done.has(i.id)))
      && (!q || (i.titel + " " + i.hook + " " + (i.ablauf || []).join(" ")).toLowerCase().includes(q)));
    if (!res.length) return `<p class="empty">Nichts gefunden. Filter lockern oder oben eine neue Idee mischen.</p>`;
    return res.map((i) => {
      const s = saeule[i.s];
      return `<article class="idea${done.has(i.id) ? " done" : ""}" data-open="${i.id}" tabindex="0" role="button" aria-label="${esc(i.titel)}">
        <div class="idea__top" style="background:${s.farbe}">${ic(i.s)}${i.eigen ? '<span class="pill-new">Eigene</span>' : blueprintFor(i.id) ? '<span class="pill-new">▶ Video</span>' : ""}</div>
        <button class="heart${fav.has(i.id) ? " on" : ""}" data-fav="${i.id}" aria-label="Merken" aria-pressed="${fav.has(i.id)}">${ic("heart")}</button>
        <div class="idea__body"><small>${esc(format[i.f].name)} · ${esc(s.name)}</small><b>${esc(i.titel)}</b><p>${esc(i.hook)}</p></div>
        <div class="idea__foot"><span class="effort">${[1, 2, 3].map((n) => `<i class="${n <= (i.a || 1) ? "on" : ""}"></i>`).join("")}&nbsp;${AUFWAND[i.a || 1]}</span>${done.has(i.id) ? `<span class="ok on">${ic("check")}</span>` : ""}</div>
      </article>`;
    }).join("");
  }

  function generate() {
    const s = state.s === "alle" ? pick(D.saeulen.map((x) => x.key)) : state.s;
    const G = D.generator;
    const pool = D.hooks.filter((h) => /\[/.test(h.t) && (!h.nur || h.nur.includes(s)));
    const tpl = pick(pool).t;
    const thema = pick(G.themen[s]);
    const hook = tpl.replace(/\[Thema\]/g, thema).replace(/\[Zeitraum\]/g, () => pick(G.zeitraeume)).replace(/\[Mythos\]/g, () => pick(G.mythen))
      .replace(/\[X\]/g, () => String(/Woche \[X\]/.test(tpl) ? rnd(1, 8) : /Teil \[X\]/.test(tpl) ? rnd(1, 5) : rnd(1, 90)));
    const f = /Tag \[X\]|Woche \[X\]|Teil \[X\]/.test(tpl) ? "serie" : pick(["talking", "voiceover", "karussell", "greenscreen", "reply", "grwm"]);
    state.gen = { id: "g" + Date.now(), eigen: true, s, f, a: 1, titel: thema.charAt(0).toUpperCase() + thema.slice(1), hook, ablauf: G.ablauf[f], cta: "Speichern oder Frage in die Kommentare.", tags: tagsFor(s, 4) };
  }
  function genHtml() {
    const g = state.gen;
    if (!g) return `<span class="tag">Bereit</span><p class="hk">Tipp auf Mischen und du bekommst eine frische Idee mit Hook, Ablauf und Hashtags.</p>`;
    return `<div class="chips">${tagS(g.s)}<span class="tag">${esc(format[g.f].name)}</span></div>
      <p class="hk">“${esc(g.hook)}”</p>
      <ol style="margin:0;padding-left:20px;font-size:14.5px;display:grid;gap:4px">${g.ablauf.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
      <p class="muted" style="margin-top:10px;font-size:14px">${esc(g.tags.join(" "))}</p>
      <div class="gen__btns">${copyBtn(briefing(g), "Kopieren")}<button class="btn btn--sm" data-keep>${ic("bookmark")}Merken</button></div>`;
  }

  function briefing(i) {
    const tags = (i.skript && i.skript.hashtags) || i.tags || tagsFor(i.s, 4);
    return [
      i.titel, "",
      "Hook: " + i.hook, "",
      "Format: " + format[i.f].name + " (" + saeule[i.s].name + ")", "",
      "Ablauf:", ...(i.ablauf || []).map((x, n) => (n + 1) + ". " + x), "",
      "Aufruf: " + (i.cta || ""), "",
      "Hashtags: " + tags.join(" "),
      i.recht ? "\nRecht: " + i.recht : "",
      "\nVor dem Posten: 8-Punkte-Check im Dashboard (Recht)."
    ].join("\n");
  }

  /* ---------- VORBILDER ---------- */
  function vVorbilder() {
    const lands = ["Alle", "DE", "International"];
    const ppl = D.vorbilder.filter((p) => state.land === "Alle" || (state.land === "DE" ? p.land === "DE" : p.land !== "DE"));
    const col = ["#E8B3B8", "#F0B297", "#C6DEDA", "#D1BCA1", "#E3CFC6"];
    return `<div class="view">
      <span class="eyebrow">Vorbilder und Wettbewerb</span>
      <h1 style="font-size:clamp(32px,7vw,52px);font-weight:800;margin-top:6px;letter-spacing:-.03em">Muster lernen, <span class="serif">nicht kopieren.</span></h1>
      <p class="lead" style="margin-top:10px">Erfolgreiche Accounts rund um Hautpflege, Wechseljahre und Longevity. Die meisten sind Fachleute. Genau da liegt Nadjas Lücke.</p>
      <div class="usp rise" style="margin-top:18px"><span class="eyebrow" style="color:#E8B3B8">Nadjas Platz im Markt</span><p class="quote" style="margin-top:10px">${esc(D.positionierung.usp)}</p></div>
      <div class="chips" style="margin-top:20px">${lands.map((l) => `<button class="chip${state.land === l ? " on" : ""}" data-land="${l}">${l}</button>`).join("")}</div>
      <div class="people" style="margin-top:14px">${ppl.map((p, i) => `<div class="card person rise" style="animation-delay:${i * 0.03}s">
        <div class="person__head"><div class="avatar" style="background:${col[i % col.length]}">${esc(p.name.replace(/^Dr\. /, "")[0])}</div><div><h3>${esc(p.name)}</h3><small>${esc(p.land)} · ${esc(p.plattform)}</small></div></div>
        <dl><div><dt>Fokus</dt><dd>${esc(p.fokus)}</dd></div><div><dt>Größe</dt><dd>${esc(p.groesse)}</dd></div><div><dt>Was gut funktioniert</dt><dd>${esc(p.gut)}</dd></div><div class="take"><dt>Was Nadja übernimmt</dt><dd>${esc(p.nadja)}</dd></div></dl>
        <a class="btn btn--sm btn--ghost" href="https://www.tiktok.com/search/user?q=${encodeURIComponent(p.name)}" target="_blank" rel="noopener">Auf TikTok suchen ${ic("out")}</a>
      </div>`).join("")}</div>
      <p class="muted" style="margin-top:14px;font-size:13.5px">Zahlen aus öffentlich zugänglichen Quellen, Stand der Recherche ${esc(D.stand)}. Vor Kooperationen selbst prüfen.</p>
    </div>`;
  }

  /* ---------- RECHT ---------- */
  function vRecht() {
    const R = D.recht;
    const themen = ["Alle"].concat(R.themen);
    const rows = R.sagen.filter((r) => state.sagThema === "Alle" || r.thema === state.sagThema);
    const checkOn = store.get("chk.post", []).length;
    return `<div class="view">
      <span class="eyebrow">Recht und Sicherheit</span>
      <h1 style="font-size:clamp(32px,7vw,52px);font-weight:800;margin-top:6px;letter-spacing:-.03em">Was du sagen darfst, <span class="serif">und was nicht.</span></h1>
      <div class="notice rise" style="margin-top:16px">${ic("info")}<p>${esc(R.hinweis)}</p></div>

      ${sec("r-regeln", "Die 6 Grundregeln", "", `<div class="grid g3">${R.grundregeln.map((g, i) => `<div class="card rule"><span class="n">${i + 1}</span><h3 style="font-size:17px">${esc(g.titel)}</h3><p>${esc(g.text)}</p><span class="src">${esc(g.quelle)}</span></div>`).join("")}</div>`)}

      ${sec("r-sagen", "Sag das, nicht das", "Formulierungen zum Abschauen",
        `<div class="chips chips--scroll">${themen.map((t) => `<button class="chip${state.sagThema === t ? " on" : ""}" data-sag="${esc(t)}">${esc(t)}</button>`).join("")}</div>
         <div class="say">${rows.map((r) => `<div class="say__row"><span class="tag">${esc(r.thema)}</span><div class="say__no">${esc(r.nein)}</div><div class="say__yes">${esc(r.ja)}</div></div>`).join("")}</div>`)}

      ${sec("r-check", "Vor jedem Post: 8-Punkte-Check", `${checkOn} von ${R.check.length} abgehakt`,
        `<div class="card"><div class="checks" style="margin-top:0">${R.check.map((c, i) => checkBtn("post", i, c)).join("")}</div>
          <button class="btn btn--ghost btn--sm" style="margin-top:14px" data-reset="post">Für nächstes Video zurücksetzen</button></div>`)}

      ${sec("r-pflichten", "Pflichten für den Account", "Einmal einrichten, abhaken",
        `<div class="checks">${R.pflichten.map((p, i) => checkBtn("pflichten", i, p.titel + ": " + p.text, p.quelle)).join("")}</div>`)}

      ${sec("r-verkauf", "Wenn Nadja verkaufen will", "Von einfach bis tabu",
        `<div class="steps">${R.verkauf.map((v) => `<div class="card stepc"><span class="lvl ${v.ampel}">${esc(v.stufe)}</span><div><h3 style="font-size:16px">${esc(v.name)}</h3><p>${esc(v.text)}</p></div></div>`).join("")}</div>`)}

      ${sec("r-disclaimer", "Hinweis-Text für Beschreibung und LIVE", "",
        `<div class="card"><p class="quote" style="font-size:22px">“${esc(R.disclaimer)}”</p><div style="margin-top:14px">${copyBtn(R.disclaimer, "Kopieren")}</div></div>`)}

      ${sec("r-quellen", "Quellen zum Nachlesen", "", `<div class="links">${R.quellen.map((q) => `<a href="${esc(q.url)}" target="_blank" rel="noopener">${esc(q.name)}${ic("out")}</a>`).join("")}</div>`)}
    </div>`;
  }

  /* ---------- Skripte (Feld skript an der Idee) ---------- */
  const SPRECH = 2.5; // Wörter pro Sekunde, normales TikTok-Tempo
  const sekunden = (k) => Math.max(5, Math.round([k.hook, ...(k.text || []), k.aufruf].join(" ").split(/\s+/).filter(Boolean).length / SPRECH / 5) * 5);
  function skriptWann(i) {
    const w = (i.skript.woche || 1) - 1;
    const p = (D.plan[w] || []).find((x) => String(x.idee) === String(i.id));
    return `Woche ${w + 1}` + (p ? ` · ${WT[p.t]} ${planDate(w, p.t)}` : "");
  }
  function skriptText(i, teil) {
    const k = i.skript;
    const post = (k.ankuendigung || k.beschreibung) + "\n\n" + (k.hashtags || []).join(" ");
    if (teil === "post") return post;
    if (teil === "sagen") return [k.hook, ...k.text, k.aufruf].join("\n\n");
    if (k.live) {
      return [
        `${i.titel} · ${skriptWann(i)} · ${k.dauer}`, "",
        "LIVE-TITEL: " + k.hookText, "THEMA: " + k.thema, "",
        "ANKÜNDIGUNG (Story am Sonntag)", post,
        ...k.teile.map((t) => ["", `${t.zeit.toUpperCase()} · ${t.titel}`,
          ...(t.sagen || []).map((s) => `Sagen: "${s}"`),
          ...(t.saetze || []).map((s) => `Wenn ${s.wenn}: "${s.sag}"`),
          ...(t.punkte || []).map((s) => "- " + s)].join("\n")),
        "", "RECHTSCHECK", ...k.check.map((c) => "- " + c)
      ].join("\n");
    }
    return [
      `${i.titel} · ${skriptWann(i)} · ca. ${sekunden(k)} Sek.`, "",
      "HOOK ALS TEXT OBEN", k.hookText, "",
      "SPRECHTEXT", [k.hook, ...k.text, k.aufruf].join("\n\n"), "",
      "TEXTEINBLENDUNGEN", ...k.einblendungen.map((e) => "- " + e), "",
      "BESCHREIBUNG", post, "",
      "SO DREHEN", k.dreh, "",
      "RECHTSCHECK", ...k.check.map((c) => "- " + c)
    ].join("\n");
  }
  function skriptHtml(i) {
    const k = i.skript; if (!k) return "";
    // Zahl und Einheit bleiben zusammen (19 Uhr, 8 Wochen), sonst bricht es am Handy hässlich um
    const nb = (x) => esc(x).replace(/(\d) (?=[A-Za-zÄÖÜäöü])/g, "$1&nbsp;");
    const row = (t, body) => `<div class="skript__row"><b>${t}</b>${body}</div>`;
    const ul = (a) => `<ul>${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
    const post = (txt) => `<p class="post">${esc(txt)}<span class="post__tags">${esc((k.hashtags || []).join(" "))}</span></p>`;
    const legal = `<div class="legal">${ic("scale")}<span><b style="display:inline;letter-spacing:0;text-transform:none;color:inherit;font-size:14.5px">Rechtscheck:</b> ${k.check.map(esc).join(". ")}.</span></div>`;
    const head = `<div class="skript__head"><span class="eyebrow">${k.live ? "Ablaufzettel" : "Skript"} · ${esc(skriptWann(i))}</span><span class="tag">${k.live ? esc(k.dauer) : `ca. ${sekunden(k)} Sek.`}</span></div>`;
    if (k.live) {
      return `<section class="skript" aria-label="Ablaufzettel">${head}
        ${row("LIVE-Titel", `<p class="ovl">${nb(k.hookText)}</p>`)}
        ${row("Thema", `<p>${esc(k.thema)}</p>`)}
        ${row("Ankündigung in der Story", post(k.ankuendigung))}
        ${k.teile.map((t) => `<div class="part"><div class="part__h"><span class="tag">${esc(t.zeit)}</span><b>${esc(t.titel)}</b></div>
          ${t.sagen ? `<div class="say">${t.sagen.map((s) => `<p>${nb(s)}</p>`).join("")}</div>` : ""}
          ${t.saetze ? `<div class="wenn">${t.saetze.map((s) => `<p><small>Wenn: ${esc(s.wenn)}</small>“${nb(s.sag)}”</p>`).join("")}</div>` : ""}
          ${t.punkte ? ul(t.punkte) : ""}</div>`).join("")}
        ${legal}
        <div class="skript__btns">
          <button class="btn btn--sm" data-copy="${reg(skriptText(i, "alles"))}">${ic("copy")}Ablaufzettel kopieren</button>
          ${copyBtn(skriptText(i, "post"), "Ankündigung kopieren")}
        </div>
      </section>`;
    }
    return `<section class="skript" aria-label="Skript">${head}
      ${row("Hook als Text oben", `<p class="ovl">${nb(k.hookText)}</p>`)}
      ${row("Sprechtext", `<div class="say"><p class="say__hook"><small>Hook</small>${nb(k.hook)}</p>${k.text.map((s) => `<p>${nb(s)}</p>`).join("")}<p><small>Aufruf</small>${nb(k.aufruf)}</p></div>`)}
      ${row("Texteinblendungen", ul(k.einblendungen))}
      ${row("Beschreibung", post(k.beschreibung))}
      ${row("So drehen", `<p class="muted">${esc(k.dreh)}</p>`)}
      ${legal}
      <div class="skript__btns">
        <button class="btn btn--sm" data-copy="${reg(skriptText(i, "alles"))}">${ic("copy")}Skript kopieren</button>
        ${copyBtn(skriptText(i, "sagen"), "Nur Sprechtext")}
        ${copyBtn(skriptText(i, "post"), "Beschreibung kopieren")}
      </div>
    </section>`;
  }

  /* ---------- Sheet ---------- */
  /* ---------- Blueprint-Videos ---------- */
  function bpRowHtml() {
    const list = D.blueprints || [];
    if (!list.length) return "";
    return `<section class="sec rise" style="margin-top:26px"><div class="sec__head"><div><h2>Blueprint-Videos</h2><p>So kann das fertige Video aussehen. Sprecherin ist eine KI-Stimme, Nadja spricht später selbst.</p></div></div>
      <div class="bprow">${list.map((b) => { const i = findIdea(b.idee); const s = saeule[i.s];
        return `<button class="bpcard" data-open="${i.id}" aria-label="Video: ${esc(b.titel)}">
          <span class="bpcard__img"><img src="${esc(b.poster)}" alt="" loading="lazy"><span class="bpplay"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z"/></svg></span><span class="bpdur">${b.dauer} Sek.</span></span>
          <span class="bpcard__t"><small>${dot(i.s)} ${esc(s.name)} · Idee ${i.id}</small><b>${esc(b.titel)}</b></span></button>`; }).join("")}</div></section>`;
  }
  function bpSheetHtml(i) {
    const b = blueprintFor(i.id); if (!b) return "";
    return `<div class="block bpsheet"><b>Blueprint-Video</b>
      <video class="bpvideo" src="${esc(b.datei)}" poster="${esc(b.poster)}" controls playsinline preload="none"></video>
      <p class="muted" style="font-size:14px;margin-top:8px">KI-Stimme als Vorlage. Hochformat 1080 × 1920, ${b.dauer} Sek., ohne Musik (Sound in TikTok aus der Commercial Music Library).</p>
      <div class="sheet__btns" style="margin-top:10px">${copyBtn(b.sprechertext, "Sprechertext kopieren")}<a class="btn btn--sm btn--ghost" href="${esc(b.datei)}" download>Video laden</a></div></div>`;
  }

  const sheet = document.getElementById("sheet");
  const sheetBody = document.getElementById("sheetBody");
  let lastFocus = null;
  function openIdea(id) {
    const i = findIdea(id); if (!i) return;
    const tags = i.tags || tagsFor(i.s, 4);
    const planned = [];
    D.plan.forEach((w, wi) => w.forEach((p) => { if (String(p.idee) === String(i.id)) planned.push(`Woche ${wi + 1}, ${WT[p.t]}`); }));
    sheetBody.innerHTML = `
      <div class="chips">${tagS(i.s)}<span class="tag">${esc(format[i.f].name)}</span><span class="tag">Aufwand ${AUFWAND[i.a || 1]}</span></div>
      <h2 id="sheetTitle">${esc(i.titel)}</h2>
      <p class="hk">“${esc(i.hook)}”</p>
      <div style="margin-top:8px">${copyBtn(i.hook, "Hook kopieren")}</div>
      ${bpSheetHtml(i)}
      ${skriptHtml(i)}
      <div class="block"><b>Ablauf</b><ol>${(i.ablauf || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ol></div>
      ${i.skript ? "" : `<div class="block"><b>Aufruf am Ende</b><p>${esc(i.cta || "")}</p></div>
      <div class="block"><b>Hashtags</b><p>${esc(tags.join(" "))}</p></div>`}
      <div class="block"><b>So drehen</b><p class="muted">${esc(format[i.f].text)}</p></div>
      ${i.recht ? `<div class="block"><div class="legal">${ic("scale")}<span><b style="display:inline;letter-spacing:0;text-transform:none;color:inherit;font-size:14.5px">Recht:</b> ${esc(i.recht)}</span></div></div>` : ""}
      ${planned.length ? `<div class="block"><b>Im Plan</b><p>${planned.join(" · ")}</p></div>` : ""}
      <div class="sheet__btns">
        <button class="btn${fav.has(i.id) ? "" : " btn--ghost"}" data-fav="${i.id}">${ic("heart")}${fav.has(i.id) ? "Gemerkt" : "Merken"}</button>
        <button class="btn${done.has(i.id) ? "" : " btn--ghost"}" data-done="${i.id}">${ic("check")}${done.has(i.id) ? "Erledigt" : "Als erledigt markieren"}</button>
        ${copyBtn(briefing(i), "Briefing kopieren")}
        ${i.eigen ? `<button class="btn btn--ghost" data-deleigen="${i.id}">${ic("trash")}Löschen</button>` : ""}
      </div>`;
    lastFocus = document.activeElement;
    sheet.classList.add("open"); sheet.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    sheet.querySelector(".sheet__x").focus();
    sheet.dataset.id = i.id;
  }
  function closeSheet() {
    if (!sheet.classList.contains("open")) return;
    sheet.querySelectorAll("video").forEach((v) => { try { v.pause(); } catch (err) { /* egal */ } });
    sheet.classList.remove("open"); sheet.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- Router ---------- */
  function route() {
    const v = (location.hash || "#start").slice(1);
    const view = VIEWS.includes(v) ? v : "start";
    clip.length = 0;
    app.innerHTML = { start: vStart, strategie: vStrategie, ideen: vIdeen, vorbilder: vVorbilder, recht: vRecht }[view]();
    document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("on", a.dataset.nav === view));
    document.title = { start: "Nadja Glow & Strong", strategie: "Strategie · Nadja", ideen: "Ideen · Nadja", vorbilder: "Vorbilder · Nadja", recht: "Recht · Nadja" }[view];
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    route.view = view;
  }
  function rerender(keepScroll) {
    const y = window.scrollY; const v = route.view;
    clip.length = 0;
    app.innerHTML = { start: vStart, strategie: vStrategie, ideen: vIdeen, vorbilder: vVorbilder, recht: vRecht }[v]();
    app.querySelectorAll(".view, .rise").forEach((el) => { el.style.animation = "none"; });
    if (keepScroll) window.scrollTo({ top: y, left: 0, behavior: "instant" });
  }
  function refreshGrid() { const g = document.getElementById("ideaGrid"); if (g) g.innerHTML = gridHtml(); }

  /* ---------- Events ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, [data-open], a");
    if (!t) return;
    const ds = t.dataset;
    if (ds.close !== undefined && t.hasAttribute("data-close")) { closeSheet(); return; }
    if (ds.copy !== undefined) { copy(clip[+ds.copy] != null ? clip[+ds.copy] : ""); return; }
    if (ds.fav) {
      e.stopPropagation();
      const id = isNaN(+ds.fav) ? ds.fav : +ds.fav;
      fav.has(id) ? fav.delete(id) : fav.add(id);
      store.set("fav", [...fav]);
      if (sheet.classList.contains("open")) openIdea(id);
      refreshGrid(); toast(fav.has(id) ? "Gemerkt" : "Entfernt"); return;
    }
    if (ds.done) {
      const id = isNaN(+ds.done) ? ds.done : +ds.done;
      done.has(id) ? done.delete(id) : done.add(id);
      store.set("done", [...done]);
      if (route.view === "ideen") refreshGrid(); else rerender(true);
      openIdea(id); return;
    }
    if (ds.deleigen) {
      eigene = eigene.filter((x) => x.id !== ds.deleigen); store.set("eigene", eigene);
      closeSheet(); refreshGrid(); toast("Gelöscht"); return;
    }
    if (ds.open !== undefined && !t.matches(".heart")) { openIdea(ds.open); return; }
    if (ds.check) {
      const key = "chk." + ds.check; const i = +ds.i; const arr = store.get(key, []);
      const n = arr.includes(i) ? arr.filter((x) => x !== i) : arr.concat(i);
      store.set(key, n); rerender(true); return;
    }
    if (ds.reset) { store.set("chk." + ds.reset, []); rerender(true); toast("Zurückgesetzt"); return; }
    if (ds.week !== undefined) { state.week = +ds.week; rerender(true); return; }
    if (ds.tile) { state.s = ds.tile; state.f = "alle"; state.status = "alle"; state.q = ""; if (location.hash === "#ideen") route(); else location.hash = "ideen"; return; }
    if (ds.jump) { const el = document.getElementById(ds.jump); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if (ds.hooktyp) { state.hookTyp = ds.hooktyp; rerender(true); return; }
    if (ds.sag) { state.sagThema = ds.sag; rerender(true); return; }
    if (ds.land) { state.land = ds.land; rerender(true); return; }
    if (ds.fs) { state.s = ds.fs; rerender(true); return; }
    if (ds.ff) { state.f = ds.ff; rerender(true); return; }
    if (ds.fst) { state.status = ds.fst; rerender(true); return; }
    if (t.hasAttribute("data-gen")) { generate(); document.getElementById("genOut").innerHTML = genHtml(); return; }
    if (t.hasAttribute("data-keep") && state.gen) {
      eigene = [state.gen].concat(eigene); store.set("eigene", eigene);
      fav.add(state.gen.id); store.set("fav", [...fav]);
      state.gen = null; document.getElementById("genOut").innerHTML = genHtml(); refreshGrid(); toast("In Ideen gespeichert"); return;
    }
    if (ds.deltrack) {
      store.set("tracker", store.get("tracker", []).filter((r) => r.d !== ds.deltrack)); rerender(true); return;
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSheet();
    if ((e.key === "Enter" || e.key === " ") && e.target.matches("article[data-open]")) { e.preventDefault(); openIdea(e.target.dataset.open); }
  });
  document.addEventListener("input", (e) => { if (e.target.id === "q") { state.q = e.target.value; refreshGrid(); } });
  document.addEventListener("submit", (e) => {
    if (e.target.id !== "trackForm") return;
    e.preventDefault();
    const num = (id) => parseInt(String(document.getElementById(id).value).replace(/\D/g, ""), 10) || 0;
    const r = { d: document.getElementById("tf-d").value, fol: num("tf-f"), views: num("tf-v"), top: num("tf-t") };
    const rows = store.get("tracker", []).filter((x) => x.d !== r.d).concat(r);
    store.set("tracker", rows); rerender(true); toast("Eingetragen");
  });
  window.addEventListener("hashchange", () => { closeSheet(); route(); });

  document.getElementById("stand").textContent = "Stand " + D.stand;
  route();
})();
