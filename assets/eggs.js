/* =========================================================
   ПАСХАЛКИ. Всего их 5, найденные запоминаются.
   Общие пасхалки работают в любой теме; у тем есть свои
   эффекты — функции eggs.decode() и eggs.scene() в theme.js.
   Элемент сцены, по которому нужно кликать, помечен
   атрибутом data-egg="scene" в разметке сцены темы.
   ========================================================= */
window.MMEggs = (function () {
  "use strict";
  const KEY = "mindmap-eggs";
  const TOTAL = 5;
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function found() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function markFound(id) {
    const list = found();
    if (!list.includes(id)) { list.push(id); try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* нет хранилища */ } }
    return list.length;
  }
  const theme = () => window.MM_CURRENT_THEME || {};
  const sound = name => { if (window.MMSound) window.MMSound.play(name); };

  // ---------- уведомление ----------
  let toastTimer = null;
  function toast(title, text, id) {
    const n = id ? markFound(id) : found().length;
    let el = document.querySelector(".egg-toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "egg-toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      document.body.appendChild(el);
    }
    el.innerHTML = '<p class="egg-kicker"></p><p class="egg-title"></p><p class="egg-text"></p><p class="egg-count"></p>';
    el.querySelector(".egg-kicker").textContent = "Пасхалка найдена";
    el.querySelector(".egg-title").textContent = title;
    el.querySelector(".egg-text").textContent = text;
    el.querySelector(".egg-count").textContent = `Найдено: ${n} из ${TOTAL}` + (n === TOTAL ? " — все пасхалки! 🏆" : "");
    el.classList.remove("show");
    void el.offsetWidth;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 5200);
    updateHint();
  }

  // ---------- помощники для эффектов ----------
  // временный слой поверх страницы; удаляется сам
  function layer(cls, ms) {
    const el = document.createElement("div");
    el.className = "egg-layer " + cls;
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
    setTimeout(() => el.remove(), ms);
    return el;
  }
  // временный класс на <html>
  function flash(cls, ms) {
    const h = document.documentElement;
    h.classList.remove(cls); void h.offsetWidth; h.classList.add(cls);
    setTimeout(() => h.classList.remove(cls), ms);
  }
  // салют частицами на canvas
  function fireworks(colors, ms = 3500) {
    if (reduced) return;
    const cv = document.createElement("canvas");
    cv.className = "egg-layer egg-canvas";
    cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv);
    const dpr = window.devicePixelRatio || 1;
    const W = innerWidth, H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    const c = cv.getContext("2d"); c.scale(dpr, dpr);
    const parts = [];
    function burst() {
      const x = W * (.15 + Math.random() * .7), y = H * (.12 + Math.random() * .4);
      const col = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 70; i++) {
        const a = Math.random() * Math.PI * 2, v = 1.5 + Math.random() * 4.5;
        parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, col });
      }
      sound("pop");
    }
    const bursts = setInterval(burst, 380); burst();
    setTimeout(() => clearInterval(bursts), ms - 1200);
    const t0 = performance.now();
    (function step(t) {
      c.globalCompositeOperation = "destination-out";
      c.fillStyle = "rgba(0,0,0,.22)"; c.fillRect(0, 0, W, H);
      c.globalCompositeOperation = "lighter";
      parts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += .05; p.vx *= .985; p.life -= .012;
        if (p.life > 0) { c.globalAlpha = p.life; c.fillStyle = p.col; c.beginPath(); c.arc(p.x, p.y, 2.2, 0, 7); c.fill(); }
      });
      if (t - t0 < ms) requestAnimationFrame(step); else cv.remove();
    })(t0);
  }
  // дождь из слов
  function wordRain(words, ms = 4500) {
    const box = layer("egg-rain", ms + 2500);
    const n = reduced ? 0 : 40;
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.textContent = words[i % words.length];
      s.style.left = (Math.random() * 96) + "%";
      s.style.animationDelay = (Math.random() * ms / 1000) + "s";
      s.style.animationDuration = (2.2 + Math.random() * 2.2) + "s";
      s.style.fontSize = (14 + Math.random() * 22) + "px";
      box.appendChild(s);
    }
  }
  const ctx = { toast, layer, flash, fireworks, wordRain, sound, reduced };

  // ---------- 1–2. секретные слова ----------
  const WORDS = {
    "декодирование": () => {
      const t = theme();
      if (t.eggs && t.eggs.decode) t.eggs.decode(ctx);
      else toast("Декодирование", "Ты видишь социальные роли насквозь", "decode");
    },
    "манипуляция": () => {
      flash("egg-glitch", 900);
      sound("alarm");
      toast("Манипуляция обнаружена!", "Не поддавайся: верни декодирование или вскрой цель манипулятора — «Ты хочешь, чтобы мне стало стыдно?»", "manip");
    }
  };
  // латинская раскладка → русская, чтобы слово срабатывало без переключения языка
  const LAT = "`qwertyuiop[]asdfghjkl;'zxcvbnm,.", CYR = "ёйцукенгшщзхъфывапролджэячсмитьбю";
  let buf = "";
  const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];
  let kpos = 0;
  document.addEventListener("keydown", e => {
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    // ---------- 4. код ↑↑↓↓←→←→BA ----------
    kpos = (e.code === KONAMI[kpos]) ? kpos + 1 : (e.code === KONAMI[0] ? 1 : 0);
    if (kpos === KONAMI.length) {
      kpos = 0;
      wordRain(["Эмоции", "Границы", "Декодирование", "Цель на конфликт", "Я-ощущение", "Сепарация", "Эскалация", "Право на отказ", "Аудит негатива", "Манипуляция", "Переговоры", "Факт", "Потребность"]);
      sound("egg");
      toast("Секретный код принят", "Все термины курса — с неба. Поймай хотя бы декодирование!", "konami");
      return;
    }
    if (!e.key || e.key.length !== 1) return;
    let ch = e.key.toLowerCase();
    const i = LAT.indexOf(ch);
    if (i >= 0) ch = CYR[i];
    buf = (buf + ch).slice(-20);
    for (const w in WORDS) if (buf.endsWith(w)) { buf = ""; WORDS[w](); break; }
  });

  // ---------- 3. несколько кликов по объекту на сцене ----------
  let sceneClicks = 0, sceneTimer = null;
  document.addEventListener("click", e => {
    const target = e.target.closest && e.target.closest('[data-egg="scene"]');
    if (!target) return;
    sceneClicks++;
    target.classList.remove("egg-poke"); void target.getBoundingClientRect(); target.classList.add("egg-poke");
    clearTimeout(sceneTimer);
    sceneTimer = setTimeout(() => { sceneClicks = 0; }, 1500);
    const need = (theme().eggs && theme().eggs.sceneClicks) || 5;
    if (sceneClicks >= need) {
      sceneClicks = 0;
      const t = theme();
      if (t.eggs && t.eggs.scene) t.eggs.scene(ctx);
    }
  });

  // ---------- 5. пять быстрых кликов по центру mindmap ----------
  let rootClicks = 0, rootTimer = null;
  function rootClick() {
    rootClicks++;
    clearTimeout(rootTimer);
    rootTimer = setTimeout(() => { rootClicks = 0; }, 1200);
    if (rootClicks >= 5) {
      rootClicks = 0;
      document.querySelectorAll(".node").forEach((n, i) => n.style.setProperty("--wave", (i % 40) * 30 + "ms"));
      flash("egg-wave", 2600);
      sound("egg");
      toast("Карта ожила", "Ты так часто открываешь алгоритм, что он уже знает тебя в лицо", "root");
    }
  }

  // ---------- подсказка в справке ----------
  function updateHint() {
    const el = document.getElementById("egg-hint");
    if (!el) return;
    const n = found().length;
    el.textContent = n === 0
      ? `На сайте спрятано ${TOTAL} пасхалок. Подсказка: понажимайте на сцену первого экрана и наберите на клавиатуре важное слово курса.`
      : `Найдено пасхалок: ${n} из ${TOTAL}.` + (n < TOTAL ? " Ищите дальше: на сцене, на клавиатуре и в самой карте." : " Вы нашли всё! 🏆");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", updateHint); else updateHint();

  return { rootClick, toast, ctx };
})();
