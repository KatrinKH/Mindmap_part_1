/* =========================================================
   Звук темы «Atomic Heart»: научный комплекс.
   Гул реактора и трансформаторов, вентиляция, щелчки реле,
   далёкий лязг механизмов, стрекот терминала. Всё синтезируется.
   ========================================================= */
window.MM_SOUNDS = window.MM_SOUNDS || {};
window.MM_SOUNDS.atomic = {
  ambient(ctx, out, H) {
    const stops = [], nodes = [];
    const rev = H.reverb(2.5, 3), wet = H.gain(.35);
    rev.connect(wet).connect(out);

    // гул реактора: сетевые 50 Гц и гармоники с лёгкой пульсацией
    const hum = H.gain(1); hum.connect(out);
    [[50, .07], [100, .035], [150, .018], [200, .01]].forEach(([f, v]) => {
      const o = H.osc("sine", f), g = H.gain(v);
      o.connect(g).connect(hum); o.start(); nodes.push(o);
    });
    nodes.push(H.lfo(hum.gain, .4, .18));

    // жужжание трансформатора
    const buzz = H.osc("sawtooth", 100), bf = H.filter("bandpass", 1200, 9), bg = H.gain(.008);
    buzz.connect(bf).connect(bg).connect(out); buzz.start(); nodes.push(buzz);

    // вентиляция
    const vent = H.noiseSource("pink"), vf = H.filter("bandpass", 380, .7), vg = H.gain(.05);
    vent.connect(vf).connect(vg).connect(out); vent.start(); nodes.push(vent);
    nodes.push(H.lfo(vg.gain, .05, .02));

    // щелчки реле
    stops.push(H.every(2200, 6500, () => {
      H.blip(out, { noise: "white", dur: .02, vol: .22, filter: ["highpass", 2200] });
      if (Math.random() < .4) H.blip(out, { noise: "white", dur: .02, vol: .16, delay: .09, filter: ["highpass", 2600] });
    }));
    // далёкий металлический лязг
    stops.push(H.every(7000, 15000, () => {
      H.blip(rev, { type: "triangle", freq: 140 + Math.random() * 60, to: 90, dur: .9, vol: .2 });
      H.blip(rev, { noise: "white", dur: .25, vol: .1, filter: ["bandpass", 900, 3] });
    }));
    // короткий писк приборов
    stops.push(H.every(9000, 20000, () => {
      H.blip(out, { type: "square", freq: 1760, dur: .05, vol: .02, filter: ["lowpass", 3000] });
      H.blip(out, { type: "square", freq: 1760, dur: .05, vol: .02, delay: .12, filter: ["lowpass", 3000] });
    }));

    return () => { stops.forEach(s => s()); nodes.forEach(n => n.stop()); };
  },

  sfx: {
    // мягкий щелчок реле
    hover(ctx, out, H) { H.blip(out, { noise: "white", dur: .015, vol: .12, filter: ["highpass", 3000] }); },
    // механический «клац»
    click(ctx, out, H) {
      H.blip(out, { noise: "white", dur: .05, vol: .2, filter: ["lowpass", 900] });
      H.blip(out, { type: "sine", freq: 180, to: 90, dur: .12, vol: .14 });
    },
    open(ctx, out, H) {
      H.blip(out, { noise: "white", dur: .04, vol: .18, filter: ["lowpass", 1200] });
      H.blip(out, { type: "square", freq: 440, dur: .06, vol: .025, delay: .04, filter: ["lowpass", 2000] });
    },
    close(ctx, out, H) {
      H.blip(out, { noise: "white", dur: .04, vol: .18, filter: ["lowpass", 900] });
      H.blip(out, { type: "square", freq: 330, dur: .06, vol: .025, delay: .04, filter: ["lowpass", 2000] });
    },
    // стрекот печати строки в терминале
    type(ctx, out, H) {
      for (let i = 0; i < 14; i++) H.blip(out, { noise: "white", dur: .012, vol: .09 + Math.random() * .05, delay: i * .018, filter: ["highpass", 3200] });
    },
    // «ДОСТУП РАЗРЕШЁН»
    granted(ctx, out, H) {
      H.blip(out, { type: "square", freq: 880, dur: .12, vol: .05, filter: ["lowpass", 3000] });
      H.blip(out, { type: "square", freq: 1318.5, dur: .2, vol: .05, delay: .14, filter: ["lowpass", 3000] });
    },
    // вход в тему: запуск питания
    enter(ctx, out, H) {
      H.blip(out, { type: "sawtooth", freq: 40, to: 180, dur: 1.4, vol: .09, attack: .5, filter: ["lowpass", 700] });
      H.blip(out, { noise: "white", dur: .06, vol: .25, delay: 1.3, filter: ["highpass", 1500] });
    },
    on(ctx, out, H) { H.blip(out, { noise: "white", dur: .03, vol: .2, filter: ["highpass", 2000] }); },
    // пасхалки: сигнал успеха и тревога
    egg(ctx, out, H) { [660, 880, 1320].forEach((f, i) => H.blip(out, { type: "square", freq: f, dur: .14, vol: .045, delay: i * .14, filter: ["lowpass", 3000] })); },
    pop(ctx, out, H) { H.blip(out, { noise: "white", dur: .05, vol: .18, filter: ["highpass", 1500] }); },
    alarm(ctx, out, H) { for (let i = 0; i < 6; i++) H.blip(out, { type: "square", freq: 740, to: 520, dur: .25, vol: .05, delay: i * .4, filter: ["lowpass", 2400] }); }
  }
};
