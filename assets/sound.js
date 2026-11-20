/* =========================================================
   ЗВУК. Все звуки синтезируются в браузере (Web Audio API),
   аудиофайлов нет. Звук каждой темы лежит в её папке:
   assets/themes/<тема>/sound.js — он подгружается, только
   когда звук включён и выбрана эта тема.
   По умолчанию звук выключен; выбор запоминается.
   ========================================================= */
window.MM_SOUNDS = window.MM_SOUNDS || {};

window.MMSound = (function () {
  "use strict";
  const KEY = "mindmap-sound";
  let ctx = null, master = null, enabled = false;
  let themeId = null, themeUrl = null;
  let ambient = null;          // { bus, stop }
  const loading = {};

  function saved() { try { return localStorage.getItem(KEY) === "on"; } catch (e) { return false; } }
  function save(v) { try { localStorage.setItem(KEY, v ? "on" : "off"); } catch (e) { /* нет хранилища */ } }

  // ---------- помощники для звуков тем ----------
  const noiseCache = {};
  const H = {
    // буфер шума: white / pink / brown
    noise(type = "white", seconds = 4) {
      const k = type + seconds;
      if (noiseCache[k]) return noiseCache[k];
      const len = Math.floor(ctx.sampleRate * seconds);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, last = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        if (type === "pink") { b0 = .997 * b0 + w * .029591; b1 = .985 * b1 + w * .032534; b2 = .95 * b2 + w * .048056; d[i] = (b0 + b1 + b2 + w * .1848) * .6; }
        else if (type === "brown") { last = (last + .02 * w) / 1.02; d[i] = last * 3.5; }
        else d[i] = w;
      }
      return (noiseCache[k] = buf);
    },
    // зацикленный источник шума
    noiseSource(type, loop = true) {
      const s = ctx.createBufferSource();
      s.buffer = H.noise(type);
      s.loop = loop;
      return s;
    },
    // ревербератор с синтетическим откликом
    reverb(seconds = 3, decay = 2.5) {
      const len = Math.floor(ctx.sampleRate * seconds);
      const buf = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let c = 0; c < 2; c++) {
        const d = buf.getChannelData(c);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
      const conv = ctx.createConvolver();
      conv.buffer = buf;
      return conv;
    },
    gain(v = 1) { const g = ctx.createGain(); g.gain.value = v; return g; },
    filter(type, freq, q = 1) { const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q; return f; },
    osc(type, freq) { const o = ctx.createOscillator(); o.type = type; o.frequency.value = freq; return o; },
    // медленное колебание параметра (LFO)
    lfo(param, rate, depth) {
      const o = H.osc("sine", rate), g = H.gain(depth);
      o.connect(g).connect(param); o.start();
      return o;
    },
    // короткий звук с огибающей: H.blip(out, {type, freq, to, dur, vol, attack, filter})
    blip(out, o = {}) {
      const t = ctx.currentTime + (o.delay || 0);
      const dur = o.dur || .1, vol = o.vol || .1;
      const src = o.noise ? H.noiseSource(o.noise, false) : H.osc(o.type || "sine", o.freq || 440);
      if (!o.noise && o.to) src.frequency.exponentialRampToValueAtTime(o.to, t + dur);
      const g = H.gain(0);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + (o.attack || .005));
      g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      let node = src;
      if (o.filter) { const f = H.filter(o.filter[0], o.filter[1], o.filter[2] || 1); node.connect(f); node = f; }
      node.connect(g).connect(out);
      src.start(t);
      src.stop(t + dur + .05);
    },
    // повторять fn через случайные промежутки; возвращает функцию остановки
    every(minMs, maxMs, fn) {
      let id = null, alive = true;
      const tick = () => { if (!alive) return; fn(); id = setTimeout(tick, minMs + Math.random() * (maxMs - minMs)); };
      id = setTimeout(tick, minMs + Math.random() * (maxMs - minMs));
      return () => { alive = false; clearTimeout(id); };
    },
    get ctx() { return ctx; },
    get now() { return ctx.currentTime; }
  };

  // ---------- движок ----------
  function ensureCtx() {
    if (ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = .7;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp).connect(ctx.destination);
    return true;
  }

  function loadTheme(id, url) {
    if (window.MM_SOUNDS[id]) return Promise.resolve(window.MM_SOUNDS[id]);
    if (!url) return Promise.resolve(null);
    if (!loading[id]) loading[id] = new Promise(res => {
      const s = document.createElement("script");
      s.src = url;
      s.onload = () => res(window.MM_SOUNDS[id] || null);
      s.onerror = () => res(null);
      document.head.appendChild(s);
    });
    return loading[id];
  }

  function stopAmbient() {
    if (!ambient) return;
    const a = ambient; ambient = null;
    const t = ctx.currentTime;
    a.bus.gain.cancelScheduledValues(t);
    a.bus.gain.setValueAtTime(a.bus.gain.value, t);
    a.bus.gain.linearRampToValueAtTime(0, t + 1.2);
    setTimeout(() => { try { a.stop && a.stop(); } catch (e) { /* уже остановлено */ } a.bus.disconnect(); }, 1400);
  }

  function startAmbient() {
    if (!enabled || !ctx || !themeId) return;
    const id = themeId;
    loadTheme(id, themeUrl).then(mod => {
      if (!mod || !mod.ambient || !enabled || themeId !== id || ambient) return;
      const bus = ctx.createGain();
      bus.gain.value = 0;
      bus.connect(master);
      const stop = mod.ambient(ctx, bus, H);
      bus.gain.linearRampToValueAtTime(1, ctx.currentTime + 2.5);
      ambient = { bus, stop, id };
    });
  }

  function setTheme(id, url) {
    if (themeId === id) return;
    themeId = id; themeUrl = url;
    if (ctx) { stopAmbient(); startAmbient(); }
  }

  function play(name) {
    if (!enabled || !ctx || ctx.state !== "running") return;
    const mod = window.MM_SOUNDS[themeId];
    const sfx = (mod && mod.sfx) || {};
    const fn = sfx[name] || ((name === "open" || name === "close") && sfx.click);
    if (fn) fn(ctx, master, H);
  }

  function setEnabled(v) {
    enabled = v;
    save(v);
    if (v) {
      if (!ensureCtx()) return;
      ctx.resume();
      startAmbient();
      play("on");
    } else if (ctx) {
      stopAmbient();
    }
    document.querySelectorAll("[data-sound-toggle]").forEach(b => {
      b.setAttribute("aria-pressed", String(v));
      b.classList.toggle("on", v);
      const l = b.querySelector(".snd-label");
      if (l) l.textContent = v ? "Звук включён" : "Включить звук";
      b.title = v ? "Выключить звук" : "Включить звук";
    });
  }

  // ---------- интерфейс ----------
  function init() {
    document.querySelectorAll("[data-sound-toggle]").forEach(b => b.addEventListener("click", () => setEnabled(!enabled)));
    // звук был включён в прошлый раз — включаем при первом действии пользователя
    // (браузеры не дают запускать звук без клика или нажатия клавиши)
    if (saved()) {
      setEnabled(true);
      const kick = () => { if (enabled && ensureCtx()) { ctx.resume().then(startAmbient); } };
      ["pointerdown", "keydown"].forEach(ev => document.addEventListener(ev, kick, { once: true, capture: true }));
    }
    // звуки интерфейса
    let lastHover = 0;
    document.addEventListener("pointerover", e => {
      const el = e.target.closest(".step, .flow li, .theme-card:not(.soon), .btn, .toolbar button, .navlinks a, .theme-btn");
      if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return;
      const now = performance.now();
      if (now - lastHover < 90) return;
      lastHover = now;
      play("hover");
    });
    document.addEventListener("click", e => {
      if (e.target.closest("[data-sound-toggle]")) return;
      if (e.target.closest(".toolbar button, .btn, .help-pill, .theme-btn, .navlinks a")) play("click");
    });
    document.addEventListener("visibilitychange", () => {
      if (!ctx || !enabled) return;
      if (document.hidden) ctx.suspend(); else ctx.resume();
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();

  return { setTheme, play, setEnabled, get enabled() { return enabled; } };
})();
