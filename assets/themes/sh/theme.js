/* =========================================================
   Тема «Silent Hill»: описание, карточка для стартового экрана,
   сцена главного экрана (туман, существа, радио) и пасхалки.
   Стили темы — в theme.css рядом, звук — в sound.js.
   Включить / выключить тему: assets/themes/config.js
   ========================================================= */
(window.MM_THEMES = window.MM_THEMES || []).push({
  id: "sh",
  name: "Silent Hill",
  desc: "Психологический хоррор: туман, пепел, шипящее радио и силуэты в дымке",
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
      fx.toast("Радио шипит…", "…значит, конфликт совсем рядом. Не убегай в туман: начни с обработки эмоций", "scene");
    }
  },

  // картинка на карточке стартового экрана
  card: `<svg viewBox="0 0 320 200" aria-hidden="true">
  <defs><linearGradient id="ts1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6d4cf"/><stop offset="1" stop-color="#b5b2ac"/></linearGradient>
  <linearGradient id="ts2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6d4cf" stop-opacity="1"/><stop offset=".55" stop-color="#d6d4cf" stop-opacity="0"/></linearGradient>
  <filter id="tsb"><feGaussianBlur stdDeviation="1.6"/></filter></defs>
  <rect width="320" height="200" fill="url(#ts1)"/>
  <path d="M150 112 L170 112 L260 200 L60 200 Z" fill="#8f8c86"/>
  <path d="M159 116 L161 116 L163 200 L157 200 Z" fill="#c9c6bf" opacity=".6"/>
  <g fill="#5a5752"><rect x="110" y="70" width="3" height="50"/><rect x="100" y="74" width="23" height="2"/><rect x="62" y="40" width="4" height="100"/><rect x="48" y="48" width="32" height="2.5"/><rect x="207" y="70" width="3" height="50"/><rect x="198" y="74" width="23" height="2"/><rect x="254" y="40" width="4" height="100"/><rect x="241" y="48" width="32" height="2.5"/></g>
  <g fill="none" stroke="#5a5752" stroke-width="1"><path d="M64 49 Q90 66 111 75"/><path d="M256 49 Q232 66 209 75"/></g>
  <g filter="url(#tsb)" stroke="#3b3936" stroke-linecap="round" fill="none"><path d="M166 104 Q164 120 165 134" stroke-width="7"/><path d="M165 107 Q157 124 156 146" stroke-width="2.4"/><path d="M167 107 Q174 126 175 144" stroke-width="2.4"/><path d="M165 133 L161 160" stroke-width="3.2"/><path d="M166 133 L171 160" stroke-width="3.2"/></g>
  <circle cx="168" cy="98" r="4.5" fill="#3b3936" filter="url(#tsb)"/>
  <rect width="320" height="200" fill="url(#ts2)" opacity=".85"/>
  <rect y="120" width="320" height="80" fill="#d6d4cf" opacity=".35"/>
  <text x="22" y="38" font-family="PT Serif, serif" font-size="20" letter-spacing="7" fill="#3b3936">КОНФЛИКТ</text>
  <rect x="22" y="46" width="34" height="2" fill="#a3341f"/>
</svg>`,

  // сцена на фоне главного экрана (data-depth — сила параллакса)
  decor: `
<div class="sh-sky"></div>
<svg class="sh-town" data-depth=".3" data-mouse="4" viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice"><path d="M0 300 V150 H58 V161 H147 V151 H209 V158 H250 V182 H320 V203 H356 V192 H391 V114 H465 V177 H523 V240 H594 V151 H677 V230 H719 V201 H798 V153 H865 V179 H909 V95 H939 V208 H986 V97 H1075 V163 H1125 V168 H1173 V151 H1209 V252 H1263 V120 H1347 V254 H1436 V210 H1511 V300 Z" fill="#8d8a85"/></svg>
<div class="sh-fog f1" data-depth=".26"></div>
<div class="sh-road" data-depth=".08"><div class="line"></div></div>
<div class="sh-creatures" data-depth=".2"><div class="cr cr-giant" style="animation-delay:-140s"><div class="bob"><svg viewBox="0 0 160 260"><path fill="currentColor" d="M58 260 C54 200 48 150 62 110 C66 96 70 90 72 80 L70 60 C66 50 70 40 80 38 C90 40 94 50 90 60 L88 80 C90 90 94 96 98 110 C112 150 106 200 102 260 Z"/> <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M76 42 L60 20 L64 2 M60 20 L44 14" stroke-width="4"/><path d="M84 42 L100 20 L96 2 M100 20 L116 14" stroke-width="4"/></g></svg></div></div><div class="cr cr-moth" style="animation-delay:-20s"><div class="bob"><svg viewBox="0 0 200 120"><g class="wing wl" fill="currentColor"><path d="M98 52 C70 8 18 4 6 30 C0 50 30 72 96 66 Z"/><path d="M98 68 C72 76 40 102 46 114 C60 120 86 98 98 78 Z"/></g> <g class="wing wr" fill="currentColor"><path d="M102 52 C130 8 182 4 194 30 C200 50 170 72 104 66 Z"/><path d="M102 68 C128 76 160 102 154 114 C140 120 114 98 102 78 Z"/></g> <ellipse fill="currentColor" cx="100" cy="62" rx="8" ry="28"/><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M97 36 Q86 16 74 12" stroke-width="2"/><path d="M103 36 Q114 16 126 12" stroke-width="2"/></g></svg></div></div><div class="cr cr-jelly rev" style="animation-delay:-60s"><div class="bob"><svg viewBox="0 0 120 220"><path fill="currentColor" d="M14 60 C14 18 106 18 106 60 C106 72 96 76 90 70 C84 78 74 78 68 70 C60 78 50 78 44 70 C36 78 24 76 14 60 Z"/><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"><path class="jt2" d="M24 70 Q14 110 28 140 Q38 175 22 212" stroke-width="2.6"/><path class="jt1" d="M40 70 Q30 110 44 140 Q54 175 38 212" stroke-width="2.6"/><path class="jt2" d="M54 70 Q44 110 58 140 Q68 175 52 212" stroke-width="4"/><path class="jt1" d="M66 70 Q56 110 70 140 Q80 175 64 212" stroke-width="4"/><path class="jt2" d="M80 70 Q70 110 84 140 Q94 175 78 212" stroke-width="2.6"/><path class="jt1" d="M96 70 Q86 110 100 140 Q110 175 94 212" stroke-width="2.6"/></g></svg></div></div><div class="cr cr-antler" style="animation-delay:-40s"><div class="bob"><svg viewBox="0 0 140 220"><path fill="currentColor" d="M58 210 L66 140 C50 122 44 98 58 82 C70 68 92 68 100 82 C108 98 104 122 88 140 L94 210 L84 210 L78 152 L74 152 L68 210 Z"/> <circle fill="currentColor" cx="50" cy="88" r="9"/> <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"><path class="br" d="M84 72 L96 40 L90 18 M96 40 L112 28 L118 8 M112 28 L126 30" stroke-width="3.4"/><path class="br2" d="M78 72 L68 42 L58 24 M68 42 L52 44 L42 34" stroke-width="3"/> <path class="arm" d="M60 98 Q38 130 40 176" stroke-width="4"/></g></svg></div></div><div class="cr cr-spider" style="animation-delay:-25s"><div class="bob"><svg viewBox="0 0 220 120"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"><path class="sk1" d="M92 56 L62 14 L28 112" stroke-width="4"/><path class="sk2" d="M96 58 L74 26 L52 114" stroke-width="4"/><path class="sk1" d="M100 60 L96 26 L82 116" stroke-width="4"/><path class="sk2" d="M104 60 L116 24 L114 116" stroke-width="4"/><path class="sk2" d="M120 54 L150 14 L172 112" stroke-width="4"/><path class="sk1" d="M126 56 L160 28 L192 112" stroke-width="4"/><path class="sk2" d="M132 58 L172 40 L208 112" stroke-width="4"/><path class="sk1" d="M112 60 L136 30 L146 116" stroke-width="4"/></g><g fill="currentColor"><ellipse cx="146" cy="50" rx="42" ry="30"/><ellipse cx="96" cy="58" rx="22" ry="16"/><circle cx="76" cy="60" r="8"/></g></svg></div></div><div class="cr cr-slug rev" style="animation-delay:-110s"><div class="bob"><svg viewBox="0 0 220 90"><g class="body" fill="currentColor"><path d="M10 82 C20 52 40 42 60 48 C70 32 90 32 100 44 C112 30 132 30 142 44 C156 32 176 36 186 52 C200 56 210 68 212 82 Z"/> <circle cx="80" cy="40" r="7"/><circle cx="124" cy="36" r="8"/><circle cx="165" cy="44" r="6"/></g> <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"><path class="tn1" d="M22 70 Q4 50 10 28" stroke-width="5"/><path class="tn2" d="M28 64 Q20 38 34 20" stroke-width="4"/><path class="tn1" d="M36 60 Q40 36 54 26" stroke-width="3"/></g></svg></div></div><div class="cr cr-tent" style="animation-delay:0s"><div class="bob"><svg viewBox="0 0 160 160"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"><path class="tw1" d="M40 150 C30 110 46 80 30 40" stroke-width="10"/><path class="tw2" d="M62 150 C70 100 50 70 64 20" stroke-width="12"/><path class="tw1" d="M84 150 C90 112 110 90 100 46" stroke-width="11"/><path class="tw2" d="M104 150 C116 120 128 106 134 70" stroke-width="8"/><path class="tw2" d="M28 150 C18 128 10 112 6 90" stroke-width="7"/></g><path fill="currentColor" d="M14 160 C24 134 136 134 146 160 Z"/></svg></div></div><div class="cr cr-brute" style="animation-delay:-60s"><div class="bob"><svg viewBox="0 0 160 150"><g class="body" fill="currentColor"> <path d="M40 140 C30 110 28 70 52 44 C70 24 104 20 124 40 C140 56 142 86 132 108 C128 118 126 128 128 140 Z"/> <circle cx="44" cy="74" r="10"/><circle cx="70" cy="36" r="10"/><circle cx="100" cy="28" r="9"/> <path class="drag" d="M52 70 C30 82 18 110 16 136 L34 140 C36 116 46 98 62 88 Z"/><circle class="drag" cx="24" cy="140" r="10"/> <path d="M120 72 C134 92 136 112 128 126 L121 123 C126 108 122 94 110 82 Z"/> <path class="lg1" d="M70 126 L64 150 L80 150 L86 126 Z"/><path class="lg2" d="M104 124 L104 150 L119 150 L117 122 Z"/></g></svg></div></div><div class="cr cr-hound rev" style="animation-delay:-15s"><div class="bob"><svg viewBox="0 0 200 120"><path fill="currentColor" d="M40 52 C70 40 120 40 150 48 L170 40 L198 54 L192 62 L166 58 C150 66 120 72 90 66 C70 66 52 66 40 62 Z"/> <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"><path class="lg1" d="M56 62 L46 86 L54 114" stroke-width="5"/><path class="lg2" d="M74 64 L80 88 L72 114" stroke-width="5"/> <path class="lg2" d="M128 62 L118 88 L126 114" stroke-width="5"/><path class="lg1" d="M146 58 L156 86 L148 114" stroke-width="5"/> <path class="tail" d="M42 56 Q18 50 8 66" stroke-width="3"/></g></svg></div></div></div>
<svg class="sh-poles" data-depth=".14" data-mouse="9" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMax slice"><g fill="#55524d"><rect x="559.0" y="210" width="2.0" height="40"/><rect x="552.8" y="213.2" width="14.4" height="1.5"/><rect x="468.8" y="230" width="2.5" height="70"/><rect x="457.4" y="235.6" width="25.2" height="1.8"/><rect x="327.9" y="260" width="4.3" height="120"/><rect x="308.4" y="269.6" width="43.2" height="3.0"/><rect x="116.6" y="330" width="6.8" height="190"/><rect x="85.8" y="345.2" width="68.4" height="4.8"/><rect x="879.0" y="210" width="2.0" height="40"/><rect x="872.8" y="213.2" width="14.4" height="1.5"/><rect x="968.8" y="230" width="2.5" height="70"/><rect x="957.4" y="235.6" width="25.2" height="1.8"/><rect x="1107.9" y="260" width="4.3" height="120"/><rect x="1088.4" y="269.6" width="43.2" height="3.0"/><rect x="1316.6" y="330" width="6.8" height="190"/><rect x="1285.8" y="345.2" width="68.4" height="4.8"/><g transform="translate(1210 330) rotate(6)"><rect x="-3" y="0" width="6" height="190"/><rect x="-60" y="-10" width="120" height="58" rx="3" fill="#6f6c66"/><rect x="-54" y="-4" width="108" height="46" rx="2" fill="none" stroke="#4b4844" stroke-width="3"/><text x="0" y="26" text-anchor="middle" font-family="PT Mono, monospace" font-size="15" fill="#3c3936" letter-spacing="2">ОБЪЕЗД</text></g></g><g fill="none" stroke="#55524d" stroke-width="1.6"><path d="M560 213 Q515 246 470 236"/><path d="M554 216 Q515 252 464 239"/><path d="M470 236 Q400 286 330 270"/><path d="M464 239 Q400 292 324 273"/><path d="M330 270 Q225 370 120 345"/><path d="M324 273 Q225 376 114 348"/><path d="M880 213 Q925 246 970 236"/><path d="M874 216 Q925 252 964 239"/><path d="M970 236 Q1040 286 1110 270"/><path d="M964 239 Q1040 292 1104 273"/><path d="M1110 270 Q1215 370 1320 345"/><path d="M1104 273 Q1215 376 1314 348"/></g></svg>
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
