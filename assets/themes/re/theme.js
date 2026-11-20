/* =========================================================
   Тема «Resident Evil Requiem»: описание, карточка для стартового
   экрана и сцена главного экрана. Стили темы — в theme.css рядом.
   Включить / выключить тему: assets/themes/config.js
   ========================================================= */
(window.MM_THEMES = window.MM_THEMES || []).push({
  id: "re",
  name: "Resident Evil Requiem",
  desc: "Кинематографичный хоррор: темнота, тревога и редкие красные вспышки",
  kicker: "Файл № 1 · итоговый проект",   // строка над заголовком на главном экране
  css: "assets/themes/re/theme.css",

  // картинка на карточке стартового экрана
  card: `<svg viewBox="0 0 320 200" aria-hidden="true">
  <defs><linearGradient id="tr1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#030304"/><stop offset=".7" stop-color="#0d1117"/><stop offset="1" stop-color="#161d26"/></linearGradient>
  <radialGradient id="tr2" cx=".42" cy=".4"><stop offset="0" stop-color="#e6edf5"/><stop offset=".5" stop-color="#9fb3c8"/><stop offset="1" stop-color="#2a3646"/></radialGradient>
  <radialGradient id="tr3"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></radialGradient></defs>
  <rect width="320" height="200" fill="url(#tr1)"/>
  <circle cx="246" cy="50" r="22" fill="url(#tr2)" opacity=".85"/>
  <circle cx="246" cy="50" r="44" fill="#9fb3c8" opacity=".08"/>
  <g fill="#040405"><path d="M0 200 V178 C90 170 210 168 320 174 V200 Z"/><path d="M160 174 V132 H172 V124 L184 114 L196 124 V132 H232 V124 L244 110 L256 124 V132 H270 V174 Z"/><path d="M142 174 V112 L154 90 L166 112 V174 Z"/><path d="M262 174 V106 L276 82 L290 106 V174 Z"/></g>
  <rect x="179" y="140" width="5" height="8" fill="#d9a35a" opacity=".7"/>
  <rect x="274" y="110" width="5" height="8" fill="#c4161c"/>
  <g stroke="#9fb3c8" stroke-opacity=".14"><line x1="10" y1="0" x2="-14" y2="200"/><line x1="31" y1="0" x2="7" y2="200"/><line x1="52" y1="0" x2="28" y2="200"/><line x1="73" y1="0" x2="49" y2="200"/><line x1="94" y1="0" x2="70" y2="200"/><line x1="115" y1="0" x2="91" y2="200"/><line x1="136" y1="0" x2="112" y2="200"/><line x1="157" y1="0" x2="133" y2="200"/><line x1="178" y1="0" x2="154" y2="200"/><line x1="199" y1="0" x2="175" y2="200"/><line x1="220" y1="0" x2="196" y2="200"/><line x1="241" y1="0" x2="217" y2="200"/><line x1="262" y1="0" x2="238" y2="200"/><line x1="283" y1="0" x2="259" y2="200"/><line x1="304" y1="0" x2="280" y2="200"/><line x1="325" y1="0" x2="301" y2="200"/><line x1="346" y1="0" x2="322" y2="200"/></g>
  <text x="24" y="84" font-family="Montserrat, sans-serif" font-weight="200" font-size="22" letter-spacing="6" fill="#d9d6d0">КОНФЛИКТ</text>
  <rect x="24" y="94" width="40" height="2" fill="#c4161c"/>
  <rect width="320" height="200" fill="url(#tr3)"/>
</svg>`,

  // сцена на фоне главного экрана (data-depth — сила параллакса)
  decor: `
<div class="re-world" data-depth=".22">
  <div class="re-sky"></div>
  <div class="re-moon"></div>
  <div class="re-cloud"></div>
  <svg class="re-house" data-depth=".06" data-mouse="6" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><g fill="#040405"><path d="M0 560 V505 C220 486 460 492 700 484 C940 476 1180 478 1440 494 V560 Z"/><path d="M820 486 V372 H850 V350 L880 326 L910 350 V372 H1030 V350 L1060 312 L1090 350 V372 H1150 V486 Z"/><path d="M770 486 V318 L800 262 L830 318 V486 Z"/><rect x="797" y="238" width="6" height="28"/><path d="M1140 486 V300 L1172 238 L1204 300 V486 Z"/><rect x="1169" y="212" width="6" height="30"/><rect x="955" y="340" width="16" height="34"/><rect x="1120" y="346" width="14" height="28"/><path d="M955 486 V404 L985 382 L1015 404 V486 Z"/><path d="M600 528 V508 L602 502 L604 508 V528 Z"/><path d="M616 528 V508 L618 502 L620 508 V528 Z"/><path d="M632 528 V508 L634 502 L636 508 V528 Z"/><path d="M648 528 V508 L650 502 L652 508 V528 Z"/><path d="M664 528 V508 L666 502 L668 508 V528 Z"/><path d="M680 528 V508 L682 502 L684 508 V528 Z"/><path d="M696 528 V508 L698 502 L700 508 V528 Z"/><path d="M712 528 V508 L714 502 L716 508 V528 Z"/><path d="M728 528 V508 L730 502 L732 508 V528 Z"/><path d="M744 528 V508 L746 502 L748 508 V528 Z"/><path d="M760 528 V508 L762 502 L764 508 V528 Z"/><path d="M776 528 V508 L778 502 L780 508 V528 Z"/><path d="M792 528 V508 L794 502 L796 508 V528 Z"/><path d="M808 528 V508 L810 502 L812 508 V528 Z"/><path d="M824 528 V508 L826 502 L828 508 V528 Z"/><path d="M840 528 V508 L842 502 L844 508 V528 Z"/><path d="M856 528 V508 L858 502 L860 508 V528 Z"/><path d="M872 528 V508 L874 502 L876 508 V528 Z"/><path d="M888 528 V508 L890 502 L892 508 V528 Z"/><path d="M904 528 V508 L906 502 L908 508 V528 Z"/><path d="M920 528 V508 L922 502 L924 508 V528 Z"/><path d="M936 528 V508 L938 502 L940 508 V528 Z"/><path d="M952 528 V508 L954 502 L956 508 V528 Z"/><path d="M968 528 V508 L970 502 L972 508 V528 Z"/><path d="M984 528 V508 L986 502 L988 508 V528 Z"/><path d="M1000 528 V508 L1002 502 L1004 508 V528 Z"/><path d="M1016 528 V508 L1018 502 L1020 508 V528 Z"/><path d="M1032 528 V508 L1034 502 L1036 508 V528 Z"/><path d="M1048 528 V508 L1050 502 L1052 508 V528 Z"/><path d="M1064 528 V508 L1066 502 L1068 508 V528 Z"/><path d="M1080 528 V508 L1082 502 L1084 508 V528 Z"/><path d="M1096 528 V508 L1098 502 L1100 508 V528 Z"/><path d="M1112 528 V508 L1114 502 L1116 508 V528 Z"/><path d="M1128 528 V508 L1130 502 L1132 508 V528 Z"/><path d="M1144 528 V508 L1146 502 L1148 508 V528 Z"/><path d="M1160 528 V508 L1162 502 L1164 508 V528 Z"/><path d="M1176 528 V508 L1178 502 L1180 508 V528 Z"/><path d="M1192 528 V508 L1194 502 L1196 508 V528 Z"/><path d="M1208 528 V508 L1210 502 L1212 508 V528 Z"/><path d="M1224 528 V508 L1226 502 L1228 508 V528 Z"/><path d="M1240 528 V508 L1242 502 L1244 508 V528 Z"/><path d="M1256 528 V508 L1258 502 L1260 508 V528 Z"/><path d="M1272 528 V508 L1274 502 L1276 508 V528 Z"/><path d="M1288 528 V508 L1290 502 L1292 508 V528 Z"/><path d="M1304 528 V508 L1306 502 L1308 508 V528 Z"/><path d="M1320 528 V508 L1322 502 L1324 508 V528 Z"/><path d="M1336 528 V508 L1338 502 L1340 508 V528 Z"/><path d="M1352 528 V508 L1354 502 L1356 508 V528 Z"/><rect x="600" y="512" width="760" height="3"/></g><path d="M1350 494 C1352 374.0 1346 284.0 1344 194 M1351 359.0 C1320 314.0 1300 269.0 1280 209.0 M1350 314.0 C1370 269.0 1385 239.0 1405 218.0 M1347 254.0 C1330 218.0 1322 194.0 1312 170.0" fill="none" stroke="#040405" stroke-width="7" stroke-linecap="round"/><rect class="win warm flicker" x="876" y="390" width="12" height="20"/><rect class="win red" x="1166" y="330" width="11" height="18"/><rect class="win warm dim" x="979" y="420" width="12" height="22"/></svg>
  <div class="re-fog"></div>
</div>
<div class="re-rain"></div>
<div class="re-rain2"></div>
<div class="re-flash"></div>
<div class="re-vhs"></div>
<div class="re-vignette"></div>
<div class="re-grain"></div>
<div class="re-black"></div>
`
});
