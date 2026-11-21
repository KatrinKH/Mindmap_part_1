/* =========================================================
   Тема «Silent Hill»: описание, карточка для стартового экрана,
   сцена главного экрана (туман, существа, радио) и пасхалки.
   Стили темы — в theme.css рядом, звук — в sound.js.
   Включить / выключить тему: assets/themes/config.js
   ========================================================= */
(window.MM_THEMES = window.MM_THEMES || []).push({
  id: "sh",
  name: "Silent Hill",
  desc: "Психологический хоррор: туман, пепел, шипящее радио и чьи-то следы на пустой дороге",
  kicker: "Дневник · запись № 1",   // строка над заголовком на главном экране
  css: "assets/themes/sh/theme.css",
  sound: "assets/themes/sh/sound.js",   // звуковая атмосфера темы

  // пасхалки темы (общая логика — в assets/eggs.js)
  eggs: {
    sceneClicks: 4,               // столько раз кликнуть по радиоприёмнику
    decode(fx) {
      fx.flash("sh-other", 4200);
      fx.layer("sh-otherworld", 4200);
      fx.sound("siren");
      fx.toast("Записка найдена", "«Декодирование»: на секунду мир показал изнанку — теперь видно, кто есть кто на самом деле", "decode");
    },
    scene(fx) {
      fx.layer("sh-static", 1600);
      fx.flash("sh-close", 4200);
      fx.sound("radio");
      fx.toast("Радио шипит…", "…а чьи-то следы идут прямо к тебе. Не убегай в туман: начни с обработки эмоций", "scene");
    }
  },

  // картинка на карточке стартового экрана
  card: `<svg viewBox="0 0 320 200" aria-hidden="true">
  <defs><linearGradient id="ts1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6d4cf"/><stop offset="1" stop-color="#b5b2ac"/></linearGradient>
  <linearGradient id="ts2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6d4cf" stop-opacity="1"/><stop offset=".55" stop-color="#d6d4cf" stop-opacity="0"/></linearGradient>
  <linearGradient id="ts3" x1="0" y1="0" x2="0" y2="1"><stop offset=".62" stop-color="#d6d4cf" stop-opacity="0"/><stop offset="1" stop-color="#d6d4cf" stop-opacity=".55"/></linearGradient>
  <filter id="tsb"><feGaussianBlur stdDeviation="1.6"/></filter></defs>
  <rect width="320" height="200" fill="url(#ts1)"/>
  <g opacity=".35" filter="url(#tsb)" stroke="#6f6c66" fill="none" stroke-width="1.4"><circle cx="250" cy="58" r="30"/><circle cx="250" cy="58" r="22"/><line x1="250" y1="58" x2="280.0" y2="58.0"/><line x1="250" y1="58" x2="276.0" y2="73.0"/><line x1="250" y1="58" x2="265.0" y2="84.0"/><line x1="250" y1="58" x2="250.0" y2="88.0"/><line x1="250" y1="58" x2="235.0" y2="84.0"/><line x1="250" y1="58" x2="224.0" y2="73.0"/><line x1="250" y1="58" x2="220.0" y2="58.0"/><line x1="250" y1="58" x2="224.0" y2="43.0"/><line x1="250" y1="58" x2="235.0" y2="32.0"/><line x1="250" y1="58" x2="250.0" y2="28.0"/><line x1="250" y1="58" x2="265.0" y2="32.0"/><line x1="250" y1="58" x2="276.0" y2="43.0"/><path d="M250 58 L236 112 M250 58 L264 112" stroke-width="2"/></g>
  <path d="M150 112 L170 112 L260 200 L60 200 Z" fill="#8f8c86"/>
  <path d="M159 116 L161 116 L163 200 L157 200 Z" fill="#c9c6bf" opacity=".6"/>
  <g fill="#5a5752"><rect x="110" y="70" width="3" height="50"/><rect x="100" y="74" width="23" height="2"/><rect x="62" y="40" width="4" height="100"/><rect x="48" y="48" width="32" height="2.5"/><rect x="207" y="70" width="3" height="50"/><rect x="198" y="74" width="23" height="2"/><rect x="254" y="40" width="4" height="100"/><rect x="241" y="48" width="32" height="2.5"/></g>
  <g fill="none" stroke="#5a5752" stroke-width="1"><path d="M64 49 Q90 66 111 75"/><path d="M256 49 Q232 66 209 75"/></g>
  <path d="M60 52 Q160 86 260 52" fill="none" stroke="#5a5752" stroke-width="1"/>
  <line x1="160" y1="69" x2="160" y2="74" stroke="#5a5752" stroke-width="1.2"/>
  <rect x="155" y="74" width="10" height="24" rx="1.5" fill="#3c3935"/>
  <circle cx="160" cy="79" r="2.4" fill="#2a2826"/><circle cx="160" cy="86" r="2.6" fill="#e0a43a"/><circle cx="160" cy="93" r="2.4" fill="#2a2826"/>
  <circle cx="160" cy="86" r="9" fill="#e0a43a" opacity=".22" filter="url(#tsb)"/>
  <g fill="#3f3c38" opacity=".75"><ellipse cx="150" cy="186" rx="5" ry="8"/><ellipse cx="170" cy="168" rx="4.4" ry="7"/><ellipse cx="152" cy="152" rx="3.8" ry="6"/><ellipse cx="167" cy="139" rx="3.2" ry="5"/><ellipse cx="154" cy="128" rx="2.7" ry="4.2"/><ellipse cx="165" cy="120" rx="2.2" ry="3.4"/></g>
  <g transform="translate(214 150) scale(.42)" opacity=".85"><path d="M8 66 L14 46 L46 40 L70 20 L140 18 L170 40 L206 46 L212 66 Z" fill="#4a4743"/><path d="M76 26 L104 24 L104 40 L62 42 Z M110 24 L136 24 L156 40 L110 40 Z" fill="#9a978f" opacity=".6"/><circle cx="52" cy="68" r="15" fill="#33312e"/><circle cx="168" cy="68" r="15" fill="#33312e"/><circle cx="12" cy="54" r="6" fill="#f2e6c4"/></g>
  <path d="M219 172 L150 160 L150 188 Z" fill="#f2e6c4" opacity=".28" filter="url(#tsb)"/>
  <rect width="320" height="200" fill="url(#ts2)" opacity=".85"/>
  <rect width="320" height="200" fill="url(#ts3)"/>
  <text x="22" y="38" font-family="PT Serif, serif" font-size="20" letter-spacing="7" fill="#3b3936">КОНФЛИКТ</text>
  <rect x="22" y="46" width="34" height="2" fill="#a3341f"/>
</svg>`,

  // сцена на фоне главного экрана (data-depth — сила параллакса)
  decor: `
<div class="sh-sky"></div>
<div class="sh-wheel" data-depth=".3" data-mouse="3"><svg viewBox="0 0 200 260"><g class="rim" fill="none" stroke="#7d7a75" stroke-width="2.4"><circle cx="100" cy="100" r="90"/><circle cx="100" cy="100" r="70"/><line x1="100" y1="100" x2="190.0" y2="100.0"/><line x1="100" y1="100" x2="177.9" y2="145.0"/><line x1="100" y1="100" x2="145.0" y2="177.9"/><line x1="100" y1="100" x2="100.0" y2="190.0"/><line x1="100" y1="100" x2="55.0" y2="177.9"/><line x1="100" y1="100" x2="22.1" y2="145.0"/><line x1="100" y1="100" x2="10.0" y2="100.0"/><line x1="100" y1="100" x2="22.1" y2="55.0"/><line x1="100" y1="100" x2="55.0" y2="22.1"/><line x1="100" y1="100" x2="100.0" y2="10.0"/><line x1="100" y1="100" x2="145.0" y2="22.1"/><line x1="100" y1="100" x2="177.9" y2="55.0"/><g fill="#7d7a75" stroke="none"><rect x="184.0" y="98.0" width="12" height="10" rx="2"/><rect x="171.9" y="143.0" width="12" height="10" rx="2"/><rect x="139.0" y="175.9" width="12" height="10" rx="2"/><rect x="94.0" y="188.0" width="12" height="10" rx="2"/><rect x="49.0" y="175.9" width="12" height="10" rx="2"/><rect x="16.1" y="143.0" width="12" height="10" rx="2"/><rect x="4.0" y="98.0" width="12" height="10" rx="2"/><rect x="16.1" y="53.0" width="12" height="10" rx="2"/><rect x="49.0" y="20.1" width="12" height="10" rx="2"/><rect x="94.0" y="8.0" width="12" height="10" rx="2"/><rect x="139.0" y="20.1" width="12" height="10" rx="2"/><rect x="171.9" y="53.0" width="12" height="10" rx="2"/></g></g><g stroke="#7d7a75" stroke-width="4" fill="none"><path d="M100 100 L58 258 M100 100 L142 258 M70 200 L130 200"/></g></svg></div>
<svg class="sh-town" data-depth=".3" data-mouse="4" viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice"><path d="M0 300 V150 H58 V161 H147 V151 H209 V158 H250 V182 H320 V203 H356 V192 H391 V114 H465 V177 H523 V240 H594 V151 H677 V230 H719 V201 H798 V153 H865 V179 H909 V95 H939 V208 H986 V97 H1075 V163 H1125 V168 H1173 V151 H1209 V252 H1263 V120 H1347 V254 H1436 V210 H1511 V300 Z" fill="#8d8a85"/></svg>
<div class="sh-fog f1" data-depth=".26"></div>
<div class="sh-road" data-depth=".08"><div class="line"></div></div>
<div class="sh-steps"><i class="l" style="left:45.92%;top:97.00%;--s:3.10vw;--i:0;--j:13"></i><i class="r" style="left:53.78%;top:94.69%;--s:2.90vw;--i:1;--j:12"></i><i class="l" style="left:46.51%;top:92.38%;--s:2.70vw;--i:2;--j:11"></i><i class="r" style="left:53.19%;top:90.08%;--s:2.50vw;--i:3;--j:10"></i><i class="l" style="left:47.10%;top:87.77%;--s:2.30vw;--i:4;--j:9"></i><i class="r" style="left:52.60%;top:85.46%;--s:2.10vw;--i:5;--j:8"></i><i class="l" style="left:47.69%;top:83.15%;--s:1.90vw;--i:6;--j:7"></i><i class="r" style="left:52.01%;top:80.85%;--s:1.70vw;--i:7;--j:6"></i><i class="l" style="left:48.28%;top:78.54%;--s:1.50vw;--i:8;--j:5"></i><i class="r" style="left:51.42%;top:76.23%;--s:1.30vw;--i:9;--j:4"></i><i class="l" style="left:48.87%;top:73.92%;--s:1.10vw;--i:10;--j:3"></i><i class="r" style="left:50.83%;top:71.62%;--s:0.90vw;--i:11;--j:2"></i><i class="l" style="left:49.46%;top:69.31%;--s:0.70vw;--i:12;--j:1"></i><i class="r" style="left:50.24%;top:67.00%;--s:0.50vw;--i:13;--j:0"></i></div>
<div class="sh-car" data-depth=".05" data-mouse="10"><div class="beam"></div><svg viewBox="0 0 220 90"><path d="M8 66 L14 46 L46 40 L70 20 L140 18 L170 40 L206 46 L212 66 Z" fill="#45423e"/><path d="M76 26 L104 24 L104 40 L62 42 Z M110 24 L136 24 L156 40 L110 40 Z" fill="#8d8a85" opacity=".55"/><path class="door" d="M104 24 L104 64 L130 70 L132 30 Z" fill="#3a3734"/><circle cx="52" cy="68" r="15" fill="#2e2c29"/><circle cx="168" cy="68" r="15" fill="#2e2c29"/><circle cx="52" cy="68" r="6" fill="#55524d"/><circle cx="168" cy="68" r="6" fill="#55524d"/><circle class="head" cx="12" cy="54" r="5"/></svg></div>
<svg class="sh-poles" data-depth=".14" data-mouse="9" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMax slice"><g fill="#55524d"><rect x="559.0" y="210" width="2.0" height="40"/><rect x="552.8" y="213.2" width="14.4" height="1.5"/><rect x="468.8" y="230" width="2.5" height="70"/><rect x="457.4" y="235.6" width="25.2" height="1.8"/><rect x="327.9" y="260" width="4.3" height="120"/><rect x="308.4" y="269.6" width="43.2" height="3.0"/><rect x="116.6" y="330" width="6.8" height="190"/><rect x="85.8" y="345.2" width="68.4" height="4.8"/><rect x="879.0" y="210" width="2.0" height="40"/><rect x="872.8" y="213.2" width="14.4" height="1.5"/><rect x="968.8" y="230" width="2.5" height="70"/><rect x="957.4" y="235.6" width="25.2" height="1.8"/><rect x="1107.9" y="260" width="4.3" height="120"/><rect x="1088.4" y="269.6" width="43.2" height="3.0"/><rect x="1316.6" y="330" width="6.8" height="190"/><rect x="1285.8" y="345.2" width="68.4" height="4.8"/><g transform="translate(1210 330) rotate(6)"><rect x="-3" y="0" width="6" height="190"/><rect x="-60" y="-10" width="120" height="58" rx="3" fill="#6f6c66"/><rect x="-54" y="-4" width="108" height="46" rx="2" fill="none" stroke="#4b4844" stroke-width="3"/><text x="0" y="28" text-anchor="middle" font-family="PT Mono, monospace" font-weight="700" font-size="19" fill="#22201d" letter-spacing="3">ВЫХОД</text><path class="sh-cross" d="M-50 25 Q-10 17 48 11" fill="none" stroke="#d0200e" stroke-width="4.2" stroke-linecap="round"/><path d="M-44 29 Q0 21 44 16" fill="none" stroke="#d0200e" stroke-width="1.8" stroke-linecap="round" opacity=".8"/><path d="M32 13 l1 11 M-22 21 l.6 9" stroke="#d0200e" stroke-width="1.8" stroke-linecap="round" opacity=".85"/></g></g><g fill="none" stroke="#55524d" stroke-width="1.6"><path d="M560 213 Q515 246 470 236"/><path d="M554 216 Q515 252 464 239"/><path d="M470 236 Q400 286 330 270"/><path d="M464 239 Q400 292 324 273"/><path d="M330 270 Q225 370 120 345"/><path d="M324 273 Q225 376 114 348"/><path d="M880 213 Q925 246 970 236"/><path d="M874 216 Q925 252 964 239"/><path d="M970 236 Q1040 286 1110 270"/><path d="M964 239 Q1040 292 1104 273"/><path d="M1110 270 Q1215 370 1320 345"/><path d="M1104 273 Q1215 376 1314 348"/></g></svg>
<div class="sh-signal" data-depth=".1" data-mouse="6"><svg class="wire" viewBox="0 0 1000 60" preserveAspectRatio="none"><path d="M0 4 Q500 56 1000 4" fill="none" stroke="#55524d" stroke-width="2"/></svg><div class="lamp"><svg viewBox="0 0 40 110"><line x1="20" y1="0" x2="20" y2="14" stroke="#55524d" stroke-width="3"/><rect x="6" y="14" width="28" height="92" rx="4" fill="#3c3935"/><circle class="red" cx="20" cy="32" r="8"/><circle class="amber" cx="20" cy="60" r="8"/><circle class="green" cx="20" cy="88" r="8"/></svg></div></div>
<div class="sh-fog f2" data-depth=".12"></div>
<div class="sh-fog f3"></div>
<div class="sh-ash a1"></div>
<div class="sh-ash a2"></div>
<div class="sh-radio" data-egg="scene" title=""><svg viewBox="0 0 64 44"><rect x="2" y="10" width="60" height="32" rx="4" fill="#3c3935"/><path d="M14 10 L40 1" stroke="#3c3935" stroke-width="2.5" stroke-linecap="round"/><circle cx="20" cy="26" r="9" fill="#2a2826"/><circle cx="20" cy="26" r="3" fill="#6d6a65"/><rect x="36" y="18" width="20" height="5" fill="#a3341f"/><rect x="36" y="27" width="20" height="2" fill="#6d6a65"/><rect x="36" y="32" width="14" height="2" fill="#6d6a65"/></svg><span class="bars"><i></i><i></i><i></i><i></i><i></i></span><span class="lbl">Радио · помехи</span></div>
<div class="sh-vignette"></div>
<div class="sh-grain"></div>
<div class="sh-mist"></div>
`
});
