/* =========================================================
   Звук темы «Silent Hill»: город в тумане.
   Ветер, низкий индустриальный гул, далёкий скрежет металла,
   шаги невидимки в такт следам, шипение радио; при входе — сирена.
   Всё синтезируется в браузере.
   ========================================================= */
window.MM_SOUNDS = window.MM_SOUNDS || {};
(function () {
  // вой сирены: подъём, протяжная нота, спад
  function siren(ctx, out, H, len = 5) {
    const t = ctx.currentTime;
    const lp = H.filter("lowpass", 1400, .7), g = H.gain(0);
    lp.connect(g).connect(out);
    g.gain.linearRampToValueAtTime(.055, t + 1);
    g.gain.setValueAtTime(.055, t + len - 1.4);
    g.gain.linearRampToValueAtTime(0, t + len);
    [0, 6].forEach(det => {
      const o = H.osc("sawtooth", 140);
      o.detune.value = det;
      o.frequency.setValueAtTime(140, t);
      o.frequency.exponentialRampToValueAtTime(560, t + 2);
      o.frequency.setValueAtTime(560, t + len - 1.6);
      o.frequency.exponentialRampToValueAtTime(160, t + len);
      o.connect(lp); o.start(t); o.stop(t + len + .1);
    });
  }
  // шипение радио
  function staticBurst(ctx, out, H, dur = .6, vol = .08) {
    const t = ctx.currentTime;
    const s = H.noiseSource("white", false), hp = H.filter("bandpass", 2600, .6), g = H.gain(0);
    s.connect(hp).connect(g).connect(out);
    for (let i = 0; i < dur * 20; i++) g.gain.setValueAtTime(Math.random() * vol, t + i / 20);
    g.gain.setValueAtTime(0, t + dur);
    s.start(t); s.stop(t + dur + .05);
  }
  // шаг по мокрому асфальту: глухой удар + шорох
  function step(ctx, out, H, vol = .2, delay = 0) {
    H.blip(out, { noise: "brown", dur: .18, vol: vol, delay, filter: ["lowpass", 380] });
    H.blip(out, { noise: "white", dur: .06, vol: vol * .25, delay: delay + .01, filter: ["bandpass", 1800, 2] });
  }
  // далёкий низкий стон ветра в проводах
  function groan(ctx, out, H) {
    const t = ctx.currentTime, len = 2.2 + Math.random() * 1.5;
    const o = H.osc("sawtooth", 70 + Math.random() * 30);
    const bp = H.filter("bandpass", 320, 4), g = H.gain(0);
    bp.frequency.linearRampToValueAtTime(620, t + len * .6);
    bp.frequency.linearRampToValueAtTime(280, t + len);
    o.frequency.linearRampToValueAtTime(o.frequency.value * .8, t + len);
    const vib = H.lfo(o.frequency, 5, 3);
    g.gain.linearRampToValueAtTime(.06, t + .6);
    g.gain.linearRampToValueAtTime(0, t + len);
    o.connect(bp).connect(g).connect(out);
    o.start(t); o.stop(t + len + .1);
    setTimeout(() => vib.stop(), (len + .2) * 1000);
  }

  window.MM_SOUNDS.sh = {
    ambient(ctx, out, H) {
      const stops = [], nodes = [];
      const rev = H.reverb(5, 1.8), wet = H.gain(.55);
      rev.connect(wet).connect(out);

      // ветер: розовый шум с «гуляющим» фильтром
      const wind = H.noiseSource("pink"), wf = H.filter("bandpass", 500, .8), wg = H.gain(.07);
      wind.connect(wf).connect(wg).connect(out); wind.start(); nodes.push(wind);
      nodes.push(H.lfo(wf.frequency, .05, 300), H.lfo(wg.gain, .08, .035));

      // низкий индустриальный гул
      const drone = H.gain(.7); drone.connect(out); drone.connect(rev);
      [[55, "sawtooth", .018], [55.6, "sawtooth", .018], [82.4, "sine", .04]].forEach(([f, type, v]) => {
        const o = H.osc(type, f), lp = H.filter("lowpass", 260), g = H.gain(v);
        o.connect(lp).connect(g).connect(drone); o.start(); nodes.push(o);
      });
      nodes.push(H.lfo(drone.gain, .025, .3));

      // далёкий скрежет металла
      stops.push(H.every(9000, 20000, () => {
        H.blip(rev, { noise: "white", dur: 2.2, vol: .07, attack: .6, filter: ["bandpass", 1800 + Math.random() * 1500, 12] });
        H.blip(rev, { type: "triangle", freq: 420 + Math.random() * 200, to: 380, dur: 2, vol: .02, attack: .5 });
      }));
      // ветер воет в проводах
      stops.push(H.every(18000, 36000, () => groan(ctx, rev, H)));
      // шаги невидимки — точно в такт появлению следов на дороге (цикл 20 с, шаг каждые 0,6 с)
      let stepTimer = null, stepInt = null;
      const firstStep = document.querySelector(".decor-sh .fp");
      const anim = firstStep && firstStep.getAnimations ? firstStep.getAnimations()[0] : null;
      const cycle = () => { for (let k = 0; k < 14; k++) step(ctx, out, H, .22 * (1 - k / 16), k * .6); };
      if (anim && anim.currentTime != null) {
        const wait = (20000 - (anim.currentTime % 20000)) % 20000;
        stepTimer = setTimeout(() => { cycle(); stepInt = setInterval(cycle, 20000); }, wait);
      }
      stops.push(() => { clearTimeout(stepTimer); clearInterval(stepInt); });
      // радио иногда оживает
      stops.push(H.every(8000, 18000, () => staticBurst(ctx, out, H, .4 + Math.random() * .8, .05)));

      return () => { stops.forEach(s => s()); nodes.forEach(n => n.stop()); };
    },

    sfx: {
      hover(ctx, out, H) { staticBurst(ctx, out, H, .05, .04); },
      click(ctx, out, H) {
        H.blip(out, { noise: "white", dur: .04, vol: .16, filter: ["lowpass", 1200] });
        H.blip(out, { type: "sine", freq: 140, to: 80, dur: .15, vol: .12 });
      },
      // шелест бумаги
      open(ctx, out, H) { H.blip(out, { noise: "white", dur: .16, vol: .07, attack: .03, filter: ["bandpass", 3200, 1.2] }); },
      close(ctx, out, H) { H.blip(out, { noise: "white", dur: .12, vol: .06, attack: .02, filter: ["bandpass", 2400, 1.2] }); },
      // вход в тему: сирена
      enter(ctx, out, H) { siren(ctx, out, H, 5); },
      // радио настраивается
      on(ctx, out, H) {
        staticBurst(ctx, out, H, .5, .06);
        H.blip(out, { type: "sine", freq: 300, to: 1200, dur: .5, vol: .02 });
      },
      // пасхалки
      siren(ctx, out, H) { siren(ctx, out, H, 4); },
      // радио шипит, а шаги приближаются
      radio(ctx, out, H) { staticBurst(ctx, out, H, 1.6, .16); for (let k = 0; k < 14; k++) step(ctx, out, H, .06 + k * .025, .3 + k * .22); },
      egg(ctx, out, H) { H.blip(out, { type: "sine", freq: 196, to: 185, dur: 2.2, vol: .07, attack: .5 }); H.blip(out, { type: "sine", freq: 277, to: 262, dur: 2.2, vol: .05, attack: .5 }); },
      pop(ctx, out, H) { staticBurst(ctx, out, H, .12, .08); },
      alarm(ctx, out, H) { staticBurst(ctx, out, H, .8, .1); }
    }
  };
})();
