/* =========================================================
   АВТОР — впишите сюда своё имя (оно появится на стартовом
   экране, в подвале сайта и в справке)
   ========================================================= */
const AUTHOR = "Хомик Екатерина";

// ---------- общие эффекты: буквы заголовка, появление при прокрутке, параллакс ----------
window.MMFX = (function () {
  "use strict";
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // заголовок первого экрана: каждая буква в своём <span class="ch" style="--i:N">,
  // чтобы темы могли анимировать буквы по очереди; data-text — для глитча
  document.querySelectorAll(".hero h1 > span").forEach(line => {
    const text = line.textContent;
    line.dataset.text = text;
    line.setAttribute("aria-label", text);
    line.textContent = "";
    [...text].forEach((c, i) => {
      const ch = document.createElement("span");
      ch.className = "ch";
      ch.setAttribute("aria-hidden", "true");
      ch.style.setProperty("--i", i);
      ch.textContent = c === " " ? " " : c;
      line.appendChild(ch);
    });
  });

  // появление блоков при прокрутке: класс .reveal → .in (вид анимации задаёт тема)
  const targets = document.querySelectorAll(
    ".sec-title, .sec-sub, .step, .flow li, .toolbar, .legend, .viewport, .footer p");
  targets.forEach(el => {
    el.classList.add("reveal");
    const sibs = [...el.parentElement.children].filter(c => c.classList.contains("reveal") || targetsHas(c));
    el.style.setProperty("--ri", Math.max(0, sibs.indexOf(el)));
  });
  function targetsHas(el) { return [...targets].includes(el); }

  // следим за разделами целиком (а не за самими блоками: у обрезанных clip-path
  // блоков нулевая видимая площадь), и при появлении раздела открываем его блоки
  const groups = [...new Set([...targets].map(el => el.closest(".section, .footer") || el))];
  let io = null;
  function observe() {
    if (io) io.disconnect();
    if (reducedMotion || !("IntersectionObserver" in window)) { targets.forEach(el => el.classList.add("in")); return; }
    io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const g = e.target;
        (g.classList.contains("reveal") ? [g] : g.querySelectorAll(".reveal")).forEach(el => el.classList.add("in"));
        io.unobserve(g);
      });
    }, { threshold: 0, rootMargin: "0px 0px -18% 0px" });
    groups.forEach(g => io.observe(g));
  }
  function resetReveal() {
    targets.forEach(el => el.classList.remove("in"));
    requestAnimationFrame(observe);
  }
  observe();

  // параллакс: элементы сцены с data-depth="0.3" сдвигаются при прокрутке и движении мыши
  const hero = document.querySelector(".hero");
  let mx = 0, my = 0, ticking = false;
  function frame() {
    ticking = false;
    const y = window.scrollY;
    if (y > window.innerHeight * 1.2) return;
    document.querySelectorAll('.decor [data-depth]').forEach(el => {
      const d = parseFloat(el.dataset.depth) || 0;
      const k = parseFloat(el.dataset.mouse || "0");
      el.style.translate = `${(mx * k).toFixed(1)}px ${(y * d + my * k).toFixed(1)}px`;
    });
  }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  if (!reducedMotion) {
    window.addEventListener("scroll", request, { passive: true });
    hero.addEventListener("pointermove", e => {
      if (e.pointerType !== "mouse") return;
      mx = (e.clientX / window.innerWidth - 0.5) * -2;
      my = (e.clientY / window.innerHeight - 0.5) * -2;
      request();
    });
  }

  return { reducedMotion, resetReveal, refreshParallax: request };
})();

// ---------- автор и темы оформления ----------
(function () {
  "use strict";
  const KEY = "mindmap-theme";
  const html = document.documentElement;
  const startEl = document.getElementById("start");
  const cardsEl = document.getElementById("theme-cards");
  const decorSlot = document.getElementById("decor-slot");
  const kickerEl = document.getElementById("kicker");
  const openBtn = document.getElementById("theme-open");
  let chosen = false;

  document.querySelectorAll("[data-author]").forEach(el => { el.textContent = AUTHOR; });

  // темы, которые подключены в index.html, и их статус из config.js
  const config = window.MM_THEME_CONFIG || {};
  const defs = {};
  (window.MM_THEMES || []).forEach(t => { defs[t.id] = t; });
  const order = Object.keys(config).filter(id => defs[id]);
  // тема подключена в index.html, но забыта в config.js — считаем включённой
  Object.keys(defs).forEach(id => { if (!(id in config)) order.push(id); });
  const status = id => (config[id] || "on");
  const listed = order.filter(id => status(id) !== "off");     // видны на стартовом экране
  const active = listed.filter(id => status(id) === "on");     // можно выбрать

  // стили и сцены только для видимых тем
  listed.forEach(id => {
    const t = defs[id];
    const link = document.createElement("link");
    link.rel = "stylesheet"; link.href = t.css;
    link.onload = () => { if (window.mmRefresh) window.mmRefresh(); };   // пересчитать карту под шрифты темы
    document.head.appendChild(link);
    if (status(id) === "on") {
      const d = document.createElement("div");
      d.className = "decor decor-" + id;
      d.setAttribute("aria-hidden", "true");
      d.innerHTML = t.decor;
      decorSlot.appendChild(d);
    }
  });

  // карточки на стартовом экране
  listed.forEach(id => {
    const t = defs[id], soon = status(id) === "soon";
    const card = document.createElement("button");
    card.type = "button";
    card.className = "theme-card tc-" + id + (soon ? " soon" : "");
    if (soon) { card.disabled = true; card.setAttribute("aria-disabled", "true"); }
    else card.dataset.themePick = id;
    card.innerHTML =
      '<span class="tc-art">' + (soon ? '<span class="tc-soon-badge">Скоро</span>' : "") + t.card + '</span>' +
      '<span class="tc-body"><span class="tc-name"></span><span class="tc-desc"></span>' +
      '<span class="tc-go">' + (soon ? "Тема в разработке" : "Выбрать →") + '</span></span>';
    card.querySelector(".tc-name").textContent = t.name;
    card.querySelector(".tc-desc").textContent = t.desc;
    cardsEl.appendChild(card);
  });

  // список тем в справке
  const listEl = document.getElementById("theme-list");
  if (listEl) listEl.textContent = active.map(id => defs[id].name).join(", ");

  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(t) { try { localStorage.setItem(KEY, t); } catch (e) { /* хранилище недоступно */ } }

  let current = null;
  function applyTheme(id) {
    if (!active.includes(id)) id = active[0];
    if (!id) { delete html.dataset.theme; return; }
    if (current && current !== id && defs[current].onLeave) defs[current].onLeave();
    current = id;
    html.dataset.theme = id;
    if (window.MMSound) window.MMSound.setTheme(id, defs[id].sound);
    if (kickerEl && defs[id].kicker) kickerEl.textContent = defs[id].kicker;
    cardsEl.querySelectorAll(".theme-card").forEach(c => c.classList.toggle("last", c.dataset.themePick === id));
    if (window.mmRefresh) requestAnimationFrame(() => window.mmRefresh());
  }
  // «вход» в тему: перезапуск анимаций первого экрана и эффект темы (onEnter в theme.js)
  function enterTheme() {
    html.classList.remove("entered");
    void html.offsetWidth;           // перезапуск CSS-анимаций
    html.classList.add("entered");
    window.MMFX.resetReveal();
    if (window.MMSound) window.MMSound.play("enter");
    const t = defs[current];
    if (t && t.onEnter && !window.MMFX.reducedMotion) t.onEnter(window.MMFX);
  }

  function showStart() {
    startEl.classList.remove("hidden");
    document.body.classList.add("start-open");
    const cur = cardsEl.querySelector(".theme-card.last") || cardsEl.querySelector(".theme-card:not(.soon)");
    if (cur) cur.focus({ preventScroll: true });
  }
  function hideStart() {
    startEl.classList.add("hidden");
    document.body.classList.remove("start-open");
  }

  // выбирать не из чего (0–1 тема без заглушек) — стартовый экран и кнопку «Тема» не показываем
  const nothingToChoose = listed.length <= 1;
  if (nothingToChoose) {
    if (openBtn) openBtn.hidden = true;
    document.querySelectorAll(".theme-help").forEach(el => { el.hidden = true; });
  }

  // ?theme=<id> в адресе — сразу открыть сайт в этой теме, без стартового экрана
  const fromUrl = new URLSearchParams(location.search).get("theme");
  if (active.includes(fromUrl) || nothingToChoose) { applyTheme(fromUrl); chosen = true; hideStart(); enterTheme(); }
  else { applyTheme(saved()); showStart(); }

  cardsEl.addEventListener("click", e => {
    const card = e.target.closest("[data-theme-pick]");
    if (!card) return;
    const id = card.dataset.themePick;
    applyTheme(id); save(id);
    if (!chosen) window.scrollTo(0, 0);
    chosen = true;
    hideStart();
    enterTheme();
  });
  if (openBtn) openBtn.addEventListener("click", showStart);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && chosen && !startEl.classList.contains("hidden")) hideStart();
  });
})();

(function () {
  "use strict";

  // цвета веток берутся из темы (переменные --b1…--b5 в assets/themes/*/theme.css)
  const BRANCH_COLORS = ["var(--b1)", "var(--b2)", "var(--b3)", "var(--b4)", "var(--b5)", "var(--a6)"];
  const GAP_X = 46;   // расстояние между уровнями
  const GAP_Y = 10;   // расстояние между соседними узлами
  const GAP_BRANCH = 26;

  const viewport = document.getElementById("viewport");
  const canvas = document.getElementById("canvas");
  const svg = document.getElementById("links");
  const search = document.getElementById("search");

  // ---------- дерево ----------
  let uid = 0;
  const all = [];
  function build(raw, depth, branch, parent) {
    const n = {
      id: uid++, text: raw.t, depth, parent,
      branch: depth === 1 ? BRANCH_COLORS[(all.filter(a => a.depth === 1).length) % BRANCH_COLORS.length] : branch,
      open: depth < 1, kids: [], el: null, x: 0, y: 0, w: 0, h: 0
    };
    all.push(n);
    raw.c.forEach(c => n.kids.push(build(c, depth + 1, n.branch, n)));
    return n;
  }
  const root = build(window.MINDMAP, 0, "var(--a3)", null);

  function classify(n) {
    const t = n.text;
    const cls = ["node", "d" + Math.min(n.depth, 3)];
    if (n.kids.length) cls.push("has-kids");
    if (/^\d этап/.test(t)) cls.push("stage");
    if (/^«/.test(t) || /^Шаблон/.test(t)) cls.push("tpl");
    if (/^Вход/.test(t)) cls.push("k-in");
    if (/^Выход/.test(t)) cls.push("k-out");
    if (/^Ошибка/.test(t)) cls.push("k-err");
    return cls.join(" ");
  }

  function ensureEl(n) {
    if (n.el) return;
    const el = document.createElement("div");
    el.className = classify(n);
    el.style.setProperty("--bc", n.branch);
    el.textContent = n.text;
    el.dataset.id = n.id;
    if (n.kids.length) {
      const b = document.createElement("span");
      b.className = "badge";
      el.appendChild(b);
    }
    canvas.appendChild(el);
    n.el = el;
  }

  // ---------- раскладка ----------
  let cursor = 0;
  function visible(n, out) {
    out.push(n);
    if (n.open) n.kids.forEach(k => visible(k, out));
    return out;
  }
  function shift(n, dy) {
    n.y += dy;
    if (n.open) n.kids.forEach(k => shift(k, dy));
  }
  function place(n, x) {
    n.x = x;
    const start = cursor;
    if (n.open && n.kids.length) {
      n.kids.forEach(k => {
        place(k, x + n.w + GAP_X);
        if (k.depth === 1) cursor += GAP_BRANCH;
      });
      const first = n.kids[0], last = n.kids[n.kids.length - 1];
      const top = first.y, bottom = last.y + last.h;
      n.y = (top + bottom) / 2 - n.h / 2;
      if (n.y < start) {
        const d = start - n.y;
        n.kids.forEach(k => shift(k, d));
        n.y = start;
        cursor += d;
      }
      cursor = Math.max(cursor, n.y + n.h + GAP_Y);
    } else {
      n.y = cursor;
      cursor += n.h + GAP_Y;
    }
  }

  function render() {
    const vis = visible(root, []);
    const visSet = new Set(vis);
    all.forEach(n => {
      if (visSet.has(n)) {
        ensureEl(n);
        n.el.style.display = "";
        n.el.classList.toggle("open", n.open);
        const b = n.el.querySelector(".badge");
        if (b) b.textContent = n.open ? "−" : "+" + n.kids.length;
      } else if (n.el) {
        n.el.style.display = "none";
      }
    });
    vis.forEach(n => { n.w = n.el.offsetWidth; n.h = n.el.offsetHeight; });
    cursor = 0;
    place(root, 0);

    let maxX = 0, maxY = 0, paths = "";
    vis.forEach(n => {
      n.el.style.transform = `translate(${n.x}px, ${n.y}px)`;
      maxX = Math.max(maxX, n.x + n.w);
      maxY = Math.max(maxY, n.y + n.h);
      if (n.parent) {
        const p = n.parent;
        const x1 = p.x + p.w + (p.kids.length ? 12 : 0), y1 = p.y + p.h / 2;
        const x2 = n.x, y2 = n.y + n.h / 2;
        const mx = (x1 + x2) / 2;
        paths += `<path style="stroke:${n.branch}" d="M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}"/>`;
      }
    });
    svg.setAttribute("width", maxX + 40);
    svg.setAttribute("height", maxY + 40);
    svg.innerHTML = paths;
    bounds = { w: maxX, h: maxY };
  }

  // ---------- камера ----------
  let bounds = { w: 0, h: 0 };
  const cam = { x: 40, y: 40, s: 1 };
  function apply() {
    canvas.style.transform = `translate(${cam.x}px, ${cam.y}px) scale(${cam.s})`;
    drawMini();
  }

  // ---------- мини-карта ----------
  // обзор всей структуры с рамкой «вы здесь»; клик или перетаскивание переносит камеру.
  // вид задают темы: переменная --mm-mode в theme.css (radar / plan / dark)
  const mini = document.createElement("div");
  mini.className = "minimap";
  mini.setAttribute("role", "img");
  mini.setAttribute("aria-label", "Мини-карта: нажмите, чтобы перейти к нужному месту");
  mini.innerHTML = '<canvas></canvas><span class="mm-frame"></span>';
  viewport.appendChild(mini);
  const mctx = mini.querySelector("canvas").getContext("2d");
  let miniQueued = false, miniMap = null;
  try { if (localStorage.getItem("mindmap-minimap") === "off") mini.classList.add("hidden"); } catch (e) { /* нет хранилища */ }

  function cssColor(v, fallback) {
    const m = /var\((--[\w-]+)\)/.exec(v || "");
    const c = m ? getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim() : v;
    return c || fallback;
  }
  function drawMini() {
    if (miniQueued) return;
    miniQueued = true;
    requestAnimationFrame(() => { miniQueued = false; paintMini(); });
  }
  function paintMini() {
    if (mini.classList.contains("hidden") || !bounds.w) return;
    const st = getComputedStyle(mini);
    const mode = st.getPropertyValue("--mm-mode").trim() || "plan";
    const W = mini.clientWidth, H = mini.clientHeight, dpr = window.devicePixelRatio || 1;
    const cv = mctx.canvas;
    if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
    mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    mctx.clearRect(0, 0, W, H);
    // радар круглый — вписываем карту в квадрат внутри круга
    const pad = mode === "radar" ? W * .17 : 12;
    const k = Math.min((W - pad * 2) / bounds.w, (H - pad * 2) / bounds.h);
    const ox = (W - bounds.w * k) / 2, oy = (H - bounds.h * k) / 2;
    miniMap = { k, ox, oy };
    const vis = visible(root, []);
    // связи
    mctx.globalAlpha = mode === "dark" ? .25 : .4;
    mctx.lineWidth = 1;
    vis.forEach(n => {
      if (!n.parent) return;
      const p = n.parent;
      mctx.strokeStyle = cssColor(n.branch, "#888");
      mctx.beginPath();
      mctx.moveTo(ox + (p.x + p.w) * k, oy + (p.y + p.h / 2) * k);
      mctx.lineTo(ox + n.x * k, oy + (n.y + n.h / 2) * k);
      mctx.stroke();
    });
    // узлы
    const hitColor = cssColor("var(--a3)", "#fff");
    vis.forEach(n => {
      const hit = n.el && n.el.classList.contains("hit");
      mctx.globalAlpha = hit ? 1 : (mode === "dark" ? .55 : .9);
      mctx.fillStyle = hit ? hitColor : cssColor(n.branch, "#aaa");
      mctx.fillRect(ox + n.x * k, oy + n.y * k, Math.max(2, n.w * k), Math.max(1.5, n.h * k));
    });
    mctx.globalAlpha = 1;
    // рамка «вы здесь»
    const vx = ox + (-cam.x / cam.s) * k, vy = oy + (-cam.y / cam.s) * k;
    const vw = viewport.clientWidth / cam.s * k, vh = viewport.clientHeight / cam.s * k;
    const view = st.getPropertyValue("--mm-view").trim() || "#fff";
    if (mode === "dark") {
      // всё вне рамки тонет в темноте, как под фонарём
      const cx = vx + vw / 2, cy = vy + vh / 2, r = Math.max(vw, vh) * .9 + 10;
      const g = mctx.createRadialGradient(cx, cy, r * .35, cx, cy, r * 1.3);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,.82)");
      mctx.fillStyle = g;
      mctx.fillRect(0, 0, W, H);
    }
    mctx.strokeStyle = view;
    mctx.lineWidth = 1.6;
    mctx.fillStyle = st.getPropertyValue("--mm-view-fill").trim() || "rgba(255,255,255,.08)";
    mctx.fillRect(vx, vy, vw, vh);
    mctx.strokeRect(vx, vy, vw, vh);
    if (mode === "radar") {
      // точка «игрока» в центре рамки
      mctx.fillStyle = view;
      mctx.beginPath(); mctx.arc(vx + vw / 2, vy + vh / 2, 3.5, 0, Math.PI * 2); mctx.fill();
    }
  }
  // переход по клику / перетаскиванию на мини-карте
  function miniGo(e) {
    if (!miniMap) return;
    const r = mini.getBoundingClientRect();
    const x = (e.clientX - r.left - miniMap.ox) / miniMap.k;
    const y = (e.clientY - r.top - miniMap.oy) / miniMap.k;
    cam.x = viewport.clientWidth / 2 - x * cam.s;
    cam.y = viewport.clientHeight / 2 - y * cam.s;
    apply();
  }
  let miniDrag = false;
  mini.addEventListener("pointerdown", e => {
    e.stopPropagation();           // не начинать перетаскивание большой карты
    miniDrag = true; mini.setPointerCapture(e.pointerId); miniGo(e);
  });
  mini.addEventListener("pointermove", e => { if (miniDrag) miniGo(e); });
  mini.addEventListener("pointerup", () => { miniDrag = false; });
  mini.addEventListener("pointercancel", () => { miniDrag = false; });
  mini.addEventListener("wheel", e => e.stopPropagation(), { passive: true });
  function fit() {
    const vw = viewport.clientWidth, vh = viewport.clientHeight, pad = 60;
    cam.s = Math.min((vw - pad) / bounds.w, (vh - pad) / bounds.h, 1.1);
    cam.s = Math.max(cam.s, 0.2);
    cam.x = (vw - bounds.w * cam.s) / 2;
    cam.y = (vh - bounds.h * cam.s) / 2;
    apply();
  }
  function zoomAt(factor, px, py) {
    const s = Math.min(2.5, Math.max(0.15, cam.s * factor));
    const k = s / cam.s;
    cam.x = px - (px - cam.x) * k;
    cam.y = py - (py - cam.y) * k;
    cam.s = s;
    apply();
  }
  function centerOn(n) {
    cam.x = viewport.clientWidth / 2 - (n.x + n.w / 2) * cam.s;
    cam.y = viewport.clientHeight / 2 - (n.y + n.h / 2) * cam.s;
    apply();
  }

  function toggle(n) {
    const sx = n.x * cam.s + cam.x, sy = n.y * cam.s + cam.y;
    n.open = !n.open;
    if (window.MMSound) window.MMSound.play(n.open ? "open" : "close");
    render();
    cam.x = sx - n.x * cam.s;
    cam.y = sy - n.y * cam.s;
    apply();
  }

  // ---------- мышь / тач ----------
  const pointers = new Map();
  let downInfo = null, pinchDist = 0;
  viewport.addEventListener("pointerdown", e => {
    viewport.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) {
      downInfo = { x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y, target: e.target.closest(".node"), moved: false };
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
      if (downInfo) downInfo.moved = true;
    }
  });
  viewport.addEventListener("pointermove", e => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const r = viewport.getBoundingClientRect();
      zoomAt(d / pinchDist, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
      pinchDist = d;
      return;
    }
    if (!downInfo) return;
    const dx = e.clientX - downInfo.x, dy = e.clientY - downInfo.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) { downInfo.moved = true; viewport.classList.add("dragging"); }
    if (downInfo.moved) { cam.x = downInfo.cx + dx; cam.y = downInfo.cy + dy; apply(); }
  });
  function up(e) {
    pointers.delete(e.pointerId);
    viewport.classList.remove("dragging");
    if (pointers.size === 0 && downInfo) {
      if (!downInfo.moved && downInfo.target) {
        const n = all[+downInfo.target.dataset.id];
        if (n.kids.length) toggle(n);
      }
      downInfo = null;
    }
  }
  viewport.addEventListener("pointerup", up);
  viewport.addEventListener("pointercancel", up);
  viewport.addEventListener("wheel", e => {
    e.preventDefault();
    const r = viewport.getBoundingClientRect();
    zoomAt(Math.exp(-e.deltaY * 0.0015), e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });

  // ---------- кнопки ----------
  document.querySelector(".toolbar").addEventListener("click", e => {
    const act = e.target.dataset && e.target.dataset.act;
    if (!act) return;
    const vw = viewport.clientWidth / 2, vh = viewport.clientHeight / 2;
    if (act === "expand") { all.forEach(n => n.open = true); render(); fit(); }
    if (act === "collapse") { all.forEach(n => n.open = n.depth < 1); clearSearch(); render(); fit(); }
    if (act === "fit") fit();
    if (act === "minimap") {
      const off = mini.classList.toggle("hidden");
      e.target.setAttribute("aria-pressed", String(!off));
      try { localStorage.setItem("mindmap-minimap", off ? "off" : "on"); } catch (err) { /* нет хранилища */ }
      drawMini();
    }
    if (act === "zoomin") zoomAt(1.25, vw, vh);
    if (act === "zoomout") zoomAt(0.8, vw, vh);
    if (act === "full") {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (viewport.requestFullscreen) viewport.requestFullscreen();
    }
  });
  document.addEventListener("fullscreenchange", () => setTimeout(fit, 80));

  // ---------- поиск ----------
  function clearSearch() {
    search.value = "";
    drawMini();
    canvas.classList.remove("searching");
    all.forEach(n => n.el && n.el.classList.remove("hit"));
  }
  let timer = null;
  search.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const q = search.value.trim().toLowerCase();
      all.forEach(n => n.el && n.el.classList.remove("hit"));
      if (q.length < 2) { canvas.classList.remove("searching"); return; }
      const hits = all.filter(n => n.text.toLowerCase().includes(q));
      hits.forEach(n => { let p = n.parent; while (p) { p.open = true; p = p.parent; } });
      render();
      hits.forEach(n => n.el.classList.add("hit"));
      drawMini();
      canvas.classList.toggle("searching", hits.length > 0);
      if (hits.length) { cam.s = Math.max(cam.s, 0.9); apply(); centerOn(hits[0]); }
    }, 220);
  });

  // ---------- старт ----------
  function refresh() { render(); fit(); }
  window.mmRefresh = refresh;   // вызывается при смене темы
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh); else refresh();
  if (document.fonts) document.fonts.addEventListener("loadingdone", refresh);
  window.addEventListener("resize", () => { clearTimeout(timer); timer = setTimeout(fit, 150); });
})();

// ---------- справка ----------
(function () {
  const dlg = document.getElementById("help");
  const openBtn = document.getElementById("help-open");
  if (!dlg || !openBtn) return;
  openBtn.addEventListener("click", () => {
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
  });
  dlg.querySelector(".help-close").addEventListener("click", () => dlg.close());
  // клик по затемнённому фону закрывает справку
  dlg.addEventListener("click", e => {
    const r = dlg.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) dlg.close();
  });
  dlg.addEventListener("close", () => openBtn.focus());
})();
