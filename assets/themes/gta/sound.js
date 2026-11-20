/* =========================================================
   Звук темы «GTA 6»: тёплый синтвейв-эмбиент на закате.
   Медленные аккорды на расстроенных пилообразных волнах,
   мягкий бас и шум прибоя. Всё синтезируется в браузере.
   ========================================================= */
window.MM_SOUNDS = window.MM_SOUNDS || {};
window.MM_SOUNDS.gta = {
  ambient(ctx, out, H) {
    const stops = [];
    const rev = H.reverb(3.5, 2.4), wet = H.gain(.4);
    rev.connect(wet).connect(out);
    const dry = H.gain(.7); dry.connect(out);

    // общий фильтр пэда с медленным «дыханием»
    const lp = H.filter("lowpass", 1100, .6);
    lp.connect(dry); lp.connect(rev);
    const lfo = H.lfo(lp.frequency, .07, 450);

    // аккорды: Am — F — C — G
    const chords = [
      [110, 220, 261.63, 329.63],
      [87.31, 174.61, 220, 261.63],
      [65.41, 196, 261.63, 329.63],
      [98, 196, 246.94, 293.66]
    ];
    let step = 0;
    function chord() {
      const notes = chords[step++ % chords.length];
      const t = ctx.currentTime, len = 7.5;
      notes.forEach((f, i) => {
        const bass = i === 0;
        [-7, 7].forEach((cents, k) => {
          if (bass && k) return;          // бас — одна чистая синусоида
          const o = H.osc(bass ? "sine" : "sawtooth", f);
          o.detune.value = bass ? 0 : cents;
          const g = H.gain(0);
          const v = bass ? .09 : .022;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(v, t + 2.2);
          g.gain.setValueAtTime(v, t + len - 2.5);
          g.gain.linearRampToValueAtTime(0, t + len);
          o.connect(g).connect(bass ? dry : lp);
          o.start(t); o.stop(t + len + .1);
        });
      });
    }
    chord();
    const timer = setInterval(chord, 6000);
    stops.push(() => clearInterval(timer));

    // прибой: коричневый шум, громкость накатывает волнами
    const sea = H.noiseSource("brown"), seaF = H.filter("lowpass", 600), seaG = H.gain(.05);
    sea.connect(seaF).connect(seaG).connect(out);
    const seaL = H.lfo(seaG.gain, .09, .04);
    sea.start();

    // изредка — далёкий «блик» мелодии
    stops.push(H.every(5000, 11000, () => {
      const notes = [659.25, 783.99, 880, 987.77, 1174.66];
      const f = notes[Math.floor(Math.random() * notes.length)];
      H.blip(rev, { type: "triangle", freq: f, dur: 1.6, vol: .035, attack: .02 });
    }));

    return () => { stops.forEach(s => s()); lfo.stop(); seaL.stop(); sea.stop(); };
  },

  sfx: {
    hover(ctx, out, H) { H.blip(out, { type: "triangle", freq: 1318.5, dur: .09, vol: .035 }); },
    click(ctx, out, H) {
      H.blip(out, { type: "square", freq: 659.25, dur: .07, vol: .03, filter: ["lowpass", 2400] });
      H.blip(out, { type: "square", freq: 987.77, dur: .1, vol: .03, delay: .06, filter: ["lowpass", 2400] });
    },
    open(ctx, out, H) { H.blip(out, { type: "triangle", freq: 523.25, to: 1046.5, dur: .14, vol: .05 }); },
    close(ctx, out, H) { H.blip(out, { type: "triangle", freq: 1046.5, to: 523.25, dur: .14, vol: .045 }); },
    // вход в тему: «вжух» и аккорд-удар
    enter(ctx, out, H) {
      H.blip(out, { noise: "white", dur: 1.1, vol: .12, attack: .7, filter: ["bandpass", 1800, .8] });
      [220, 329.63, 440, 554.37].forEach(f => H.blip(out, { type: "sawtooth", freq: f, dur: 1.4, vol: .03, delay: .75, filter: ["lowpass", 1800] }));
    },
    on(ctx, out, H) { H.blip(out, { type: "triangle", freq: 880, to: 1760, dur: .2, vol: .05 }); }
  }
};
