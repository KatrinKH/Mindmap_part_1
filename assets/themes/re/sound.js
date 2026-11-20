/* =========================================================
   Звук темы «Resident Evil Requiem»: тревога и неизвестность.
   Дождь, низкий диссонирующий гул, далёкий гром и глухой удар,
   совпадающий с красной вспышкой на экране. Всё синтезируется.
   ========================================================= */
window.MM_SOUNDS = window.MM_SOUNDS || {};
window.MM_SOUNDS.re = {
  ambient(ctx, out, H) {
    const stops = [], nodes = [];
    const rev = H.reverb(4.5, 2), wet = H.gain(.5);
    rev.connect(wet).connect(out);

    // дождь: шипение капель + низкий шум ливня
    const rain = H.noiseSource("white"), rhp = H.filter("highpass", 1000), rlp = H.filter("lowpass", 7000), rg = H.gain(.045);
    rain.connect(rhp).connect(rlp).connect(rg).connect(out); rain.start(); nodes.push(rain);
    const rumble = H.noiseSource("brown"), rul = H.filter("lowpass", 280), rug = H.gain(.06);
    rumble.connect(rul).connect(rug).connect(out); rumble.start(); nodes.push(rumble);
    nodes.push(H.lfo(rg.gain, .06, .015));
    // отдельные капли
    stops.push(H.every(120, 520, () => H.blip(out, { type: "sine", freq: 2200 + Math.random() * 2400, dur: .02, vol: .008 })));

    // низкий гул: тритон (F — B), медленно нарастает и стихает
    const drone = H.gain(.0); drone.connect(out); drone.connect(rev);
    [[43.65, .06], [61.74, .045], [87.31, .015]].forEach(([f, v]) => {
      const o = H.osc("sine", f), g = H.gain(v);
      o.connect(g).connect(drone); o.start(); nodes.push(o);
    });
    drone.gain.value = .7;
    nodes.push(H.lfo(drone.gain, .03, .3));
    // «воздух» в пустом доме
    const air = H.noiseSource("pink"), af = H.filter("bandpass", 170, 1.5), ag = H.gain(.035);
    air.connect(af).connect(ag).connect(out); air.start(); nodes.push(air);

    // далёкий гром
    function thunder() {
      H.blip(rev, { noise: "brown", dur: 4.5, vol: .5, attack: .35, filter: ["lowpass", 160] });
    }
    stops.push(H.every(22000, 45000, thunder));

    // глухой удар точно в момент красной вспышки (анимация .re-flash, 13 с, пик на 93,6 %)
    function thud() {
      H.blip(out, { type: "sine", freq: 70, to: 32, dur: 1.1, vol: .55 });
      H.blip(rev, { noise: "brown", dur: .8, vol: .3, filter: ["lowpass", 220] });
    }
    let flashTimer = null, flashInt = null;
    const flash = document.querySelector(".decor-re .re-flash");
    const anim = flash && flash.getAnimations ? flash.getAnimations()[0] : null;
    if (anim && anim.currentTime != null) {
      const period = 13000, peak = period * .936;
      const wait = ((peak - (anim.currentTime % period)) + period) % period;
      flashTimer = setTimeout(() => { thud(); flashInt = setInterval(thud, period); }, wait);
    } else {
      stops.push(H.every(15000, 30000, thud));
    }
    stops.push(() => { clearTimeout(flashTimer); clearInterval(flashInt); });

    return () => { stops.forEach(s => s()); nodes.forEach(n => n.stop()); };
  },

  sfx: {
    hover(ctx, out, H) { H.blip(out, { type: "sine", freq: 196, dur: .18, vol: .025, attack: .03 }); },
    click(ctx, out, H) { H.blip(out, { type: "sine", freq: 110, to: 55, dur: .25, vol: .18 }); },
    open(ctx, out, H) { H.blip(out, { type: "sine", freq: 98, to: 130.8, dur: .3, vol: .12, attack: .02 }); },
    close(ctx, out, H) { H.blip(out, { type: "sine", freq: 130.8, to: 73.4, dur: .3, vol: .12, attack: .02 }); },
    // вход в тему: нарастающий шум из темноты и тяжёлый удар
    enter(ctx, out, H) {
      H.blip(out, { noise: "brown", dur: 2.6, vol: .35, attack: 2.3, filter: ["lowpass", 400] });
      H.blip(out, { type: "sine", freq: 65, to: 30, dur: 1.6, vol: .6, delay: 2.4 });
    },
    on(ctx, out, H) { H.blip(out, { type: "sine", freq: 82.4, to: 41.2, dur: .8, vol: .35 }); }
  }
};
