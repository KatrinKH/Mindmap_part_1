/* =========================================================
   Тема «GTA 6»: описание, карточка для стартового экрана
   и сцена главного экрана. Стили темы — в theme.css рядом.
   Включить / выключить тему: assets/themes/config.js
   ========================================================= */
(window.MM_THEMES = window.MM_THEMES || []).push({
  id: "gta",
  name: "GTA 6",
  desc: "Неоновый Майами: закат, пальмы, огни ночного города",
  kicker: "Итоговый проект · часть 1",   // строка над заголовком на главном экране
  css: "assets/themes/gta/theme.css",
  sound: "assets/themes/gta/sound.js",   // звуковая атмосфера темы

  // пасхалки темы (общая логика — в assets/eggs.js)
  eggs: {
    sceneClicks: 5,               // столько раз кликнуть по солнцу
    decode(fx) {
      fx.fireworks(["#ff2e88", "#ffd23f", "#19e3d1", "#ff8a3d", "#ffffff"]);
      fx.sound("egg");
      fx.toast("Миссия выполнена", "Декодирование пройдено: теперь ты сразу видишь, кто тут «незаменимый», а кто «зависимый»", "decode");
    },
    scene(fx) {
      const stars = fx.layer("gta-stars", 3600);
      stars.textContent = "★★★★★";
      fx.layer("gta-police", 3600);
      fx.sound("siren");
      fx.toast("Уровень конфликта: ★★★★★", "Слишком горячо! Срочно вниз по лестнице — на 1 этап, обработай эмоции", "scene");
    }
  },

  // картинка на карточке стартового экрана
  card: `
<svg viewBox="0 0 320 200" aria-hidden="true">
  <defs><linearGradient id="tg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a0848"/><stop offset=".5" stop-color="#b0247a"/><stop offset=".8" stop-color="#ff8a3d"/><stop offset="1" stop-color="#ffc07a"/></linearGradient>
  <linearGradient id="tg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff1a8"/><stop offset=".5" stop-color="#ff7a6a"/><stop offset="1" stop-color="#ff2e88"/></linearGradient>
  <clipPath id="tc1"><rect x="0" y="0" width="320" height="150"/></clipPath></defs>
  <rect width="320" height="200" fill="url(#tg1)"/>
  <g clip-path="url(#tc1)"><circle cx="160" cy="140" r="62" fill="url(#tg2)"/>
  <g fill="#b0247a"><rect x="90" y="132" width="140" height="4"/><rect x="90" y="142" width="140" height="5"/></g></g>
  <rect y="150" width="320" height="50" fill="#2a0a45"/>
  <g stroke="#ffc07a" stroke-opacity=".35"><line x1="0" y1="160" x2="320" y2="160"/><line x1="0" y1="172" x2="320" y2="172"/><line x1="0" y1="186" x2="320" y2="186"/></g>
  <g fill="#14061f"><path d="M44 152 C46 120 48 96 58 70 L62 71 C54 98 52 122 52 152 Z"/><path d="M60 72 C46 60 28 60 12 70 C28 64 44 66 59 76 Z"/><path d="M60 72 C66 54 80 46 98 46 C82 54 72 62 62 76 Z"/><path d="M60 72 C78 66 96 70 108 84 C94 76 78 74 62 76 Z"/><path d="M59 73 C50 84 44 98 44 112 C50 98 56 88 62 78 Z"/>
  <path d="M276 152 C272 118 268 96 256 66 L252 67 C262 98 266 120 268 152 Z"/><path d="M254 68 C268 56 286 56 304 66 C288 60 270 62 256 72 Z"/><path d="M254 68 C246 50 232 42 214 42 C230 50 242 58 252 72 Z"/><path d="M254 69 C238 62 220 66 208 80 C222 72 238 70 252 72 Z"/></g>
  <defs><linearGradient id="tg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#ffe680"/><stop offset="1" stop-color="#ffb347"/></linearGradient>
  <filter id="tgglow" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <text x="25" y="41" font-family="Oswald, sans-serif" font-weight="700" font-size="30" letter-spacing="1.5" fill="#ff2e88">КОНФЛИКТ</text>
  <text x="22" y="38" font-family="Oswald, sans-serif" font-weight="700" font-size="30" letter-spacing="1.5" fill="url(#tg3)" stroke="#0b0418" stroke-width=".8" filter="url(#tgglow)">КОНФЛИКТ</text>
  <rect x="22" y="46" width="44" height="3" fill="#19e3d1"/>
</svg>
`,

  // сцена на фоне главного экрана (data-depth — сила параллакса)
  decor: `
<div class="sky" data-depth=".5"></div>
<div class="haze"></div>
<div class="sun" data-depth=".38" data-mouse="4" data-egg="scene"></div>
<svg class="far-city" data-depth=".26" data-mouse="7" viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice"><path d="M0 300 V222 H28 V242 H47 V167 H68 V206 H102 V183 H106 V206 V243 H137 V216 H141 V243 V245 H172 V203 H193 V245 H229 V248 H259 V226 H278 V230 H300 V214 H335 V186 H339 V214 V212 H377 V244 H412 V208 H449 V151 H484 V144 H516 V214 H541 V240 H566 V137 H600 V165 H627 V161 H650 V95 H681 V68 H685 V95 V137 H721 V106 H758 V146 H778 V173 H817 V144 H844 V178 H890 V217 H919 V245 H952 V226 H956 V245 V197 H978 V133 H1023 V109 H1027 V133 V189 H1057 V150 H1101 V154 H1127 V163 H1166 V239 H1188 V222 H1192 V239 V201 H1231 V173 H1235 V201 V193 H1258 V153 H1280 V179 H1317 V247 H1357 V160 H1402 V234 H1432 V245 H1462 V229 H1466 V245 V300 Z" fill="#3a1263"/><g fill="#ffd9a8" opacity=".55"><rect x="902" y="181" width="3" height="5"/><rect x="225" y="227" width="3" height="5"/><rect x="1230" y="153" width="3" height="5"/><rect x="209" y="140" width="3" height="5"/><rect x="1160" y="178" width="3" height="5"/><rect x="1098" y="165" width="3" height="5"/><rect x="744" y="146" width="3" height="5"/><rect x="144" y="193" width="3" height="5"/><rect x="1257" y="236" width="3" height="5"/><rect x="304" y="204" width="3" height="5"/><rect x="711" y="233" width="3" height="5"/><rect x="971" y="171" width="3" height="5"/><rect x="236" y="264" width="3" height="5"/><rect x="954" y="262" width="3" height="5"/><rect x="990" y="219" width="3" height="5"/><rect x="175" y="176" width="3" height="5"/><rect x="209" y="227" width="3" height="5"/><rect x="542" y="262" width="3" height="5"/><rect x="1417" y="181" width="3" height="5"/><rect x="1057" y="145" width="3" height="5"/><rect x="420" y="275" width="3" height="5"/><rect x="740" y="177" width="3" height="5"/><rect x="1413" y="279" width="3" height="5"/><rect x="55" y="275" width="3" height="5"/><rect x="610" y="163" width="3" height="5"/><rect x="1425" y="206" width="3" height="5"/><rect x="1061" y="233" width="3" height="5"/><rect x="342" y="231" width="3" height="5"/><rect x="456" y="276" width="3" height="5"/><rect x="1109" y="268" width="3" height="5"/><rect x="675" y="197" width="3" height="5"/><rect x="1255" y="189" width="3" height="5"/><rect x="490" y="242" width="3" height="5"/><rect x="464" y="191" width="3" height="5"/><rect x="1060" y="266" width="3" height="5"/><rect x="728" y="147" width="3" height="5"/><rect x="57" y="211" width="3" height="5"/><rect x="967" y="206" width="3" height="5"/><rect x="396" y="228" width="3" height="5"/><rect x="915" y="229" width="3" height="5"/><rect x="746" y="160" width="3" height="5"/><rect x="451" y="166" width="3" height="5"/><rect x="464" y="260" width="3" height="5"/><rect x="402" y="226" width="3" height="5"/><rect x="418" y="263" width="3" height="5"/><rect x="1278" y="140" width="3" height="5"/><rect x="981" y="228" width="3" height="5"/><rect x="1317" y="161" width="3" height="5"/><rect x="1352" y="170" width="3" height="5"/><rect x="795" y="191" width="3" height="5"/><rect x="979" y="185" width="3" height="5"/><rect x="888" y="225" width="3" height="5"/><rect x="177" y="241" width="3" height="5"/><rect x="948" y="242" width="3" height="5"/><rect x="173" y="180" width="3" height="5"/><rect x="348" y="172" width="3" height="5"/><rect x="56" y="178" width="3" height="5"/><rect x="1209" y="259" width="3" height="5"/><rect x="1343" y="177" width="3" height="5"/><rect x="1252" y="261" width="3" height="5"/><rect x="1346" y="229" width="3" height="5"/><rect x="319" y="280" width="3" height="5"/><rect x="1122" y="173" width="3" height="5"/><rect x="43" y="143" width="3" height="5"/><rect x="1330" y="166" width="3" height="5"/><rect x="1078" y="175" width="3" height="5"/><rect x="888" y="189" width="3" height="5"/><rect x="432" y="147" width="3" height="5"/><rect x="515" y="194" width="3" height="5"/><rect x="599" y="268" width="3" height="5"/><rect x="492" y="290" width="3" height="5"/><rect x="667" y="206" width="3" height="5"/><rect x="1114" y="247" width="3" height="5"/><rect x="268" y="155" width="3" height="5"/><rect x="724" y="257" width="3" height="5"/><rect x="1356" y="289" width="3" height="5"/><rect x="1058" y="247" width="3" height="5"/><rect x="1027" y="173" width="3" height="5"/><rect x="1089" y="178" width="3" height="5"/><rect x="1072" y="270" width="3" height="5"/><rect x="38" y="252" width="3" height="5"/><rect x="375" y="141" width="3" height="5"/><rect x="306" y="184" width="3" height="5"/><rect x="289" y="261" width="3" height="5"/><rect x="1267" y="170" width="3" height="5"/><rect x="1139" y="155" width="3" height="5"/><rect x="667" y="272" width="3" height="5"/><rect x="1086" y="282" width="3" height="5"/><rect x="988" y="167" width="3" height="5"/><rect x="1147" y="154" width="3" height="5"/></g></svg>
<div class="bridge" data-depth=".16"></div>
<div class="trails" data-depth=".16"><i></i><i></i><i></i><i></i><i></i><i></i></div>
<div class="sea" data-depth=".12"><div class="reflect"></div></div>
<svg class="palms" data-depth=".04" data-mouse="16" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g fill="#14061f">
        <!-- left palm -->
        <path d="M160 420 C170 330 175 250 205 170 L215 172 C190 250 188 330 182 420 Z"/>
        <path d="M208 172 C170 140 120 140 70 170 C120 150 165 155 205 178 Z"/>
        <path d="M208 172 C180 120 140 100 95 105 C145 115 180 140 204 176 Z"/>
        <path d="M210 170 C220 120 250 95 300 90 C258 108 232 135 214 176 Z"/>
        <path d="M212 172 C260 150 310 160 345 195 C305 172 262 168 214 178 Z"/>
        <path d="M209 174 C190 200 170 235 165 275 C182 238 198 210 213 180 Z"/>
        <path d="M211 174 C240 195 262 225 270 262 C252 230 233 205 210 180 Z"/>
        <!-- small left palm -->
        <path d="M330 420 C335 360 340 310 360 260 L367 262 C350 310 347 360 345 420 Z"/>
        <path d="M362 262 C335 240 300 240 268 258 C302 248 333 252 360 268 Z"/>
        <path d="M364 260 C372 228 395 210 430 210 C400 222 382 240 367 266 Z"/>
        <path d="M365 262 C395 250 428 258 450 282 C424 268 396 266 366 268 Z"/>
        <path d="M362 264 C345 282 335 305 332 330 C344 306 354 290 366 270 Z"/>
        <!-- right palm -->
        <path d="M1250 420 C1240 320 1232 240 1200 150 L1190 153 C1218 240 1225 320 1232 420 Z"/>
        <path d="M1196 152 C1235 118 1290 116 1345 148 C1292 128 1243 134 1200 158 Z"/>
        <path d="M1195 150 C1222 98 1265 78 1312 84 C1260 95 1222 120 1198 156 Z"/>
        <path d="M1193 150 C1180 98 1150 72 1098 68 C1142 86 1170 114 1189 156 Z"/>
        <path d="M1192 152 C1140 130 1088 140 1052 176 C1094 152 1138 148 1190 158 Z"/>
        <path d="M1195 154 C1215 182 1236 218 1240 258 C1224 222 1208 192 1192 160 Z"/>
        <path d="M1193 154 C1162 176 1140 208 1132 246 C1150 214 1170 188 1196 160 Z"/>
        <!-- skyline -->
        <path fill="#22082f" d="M480 420 V360 h30 v-40 h20 v40 h18 v-70 h26 v70 h14 v-30 h22 v30 h20 v-90 h12 v-20 h10 v20 h12 v90 h24 v-50 h28 v50 h16 v-110 h30 v110 h18 v-40 h22 v40 h20 v-64 h26 v64 h14 v-26 h20 v26 h22 v-80 h18 v80 h26 v-44 h24 v44 h30 V420 Z"/>
      </g>
    </svg>
<div class="letterbox"></div>
`
});
