/* =========================================================
   Тема «GTA 6»: описание, карточка для стартового экрана
   и сцена главного экрана. Стили темы — в theme.css рядом.
   Включить / выключить тему: assets/themes/config.js
   ========================================================= */
(window.MM_THEMES = window.MM_THEMES || []).push({
  id: "gta",
  name: "GTA 6",
  desc: "Неоновый закат, пальмы и океан в духе Вайс-Сити",
  kicker: "Итоговый проект · часть 1",   // строка над заголовком на главном экране
  css: "assets/themes/gta/theme.css",

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
</svg>
`,

  // сцена на фоне главного экрана
  decor: `
<div class="sky"></div>
      <div class="sun"></div>
      <div class="sea"></div>
      <svg class="palms" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
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
`
});
