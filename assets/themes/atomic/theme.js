/* =========================================================
   Тема «Atomic Heart»: описание, карточка для стартового экрана,
   сцена главного экрана и загрузочный терминал.
   Стили темы — в theme.css рядом.
   Включить / выключить тему: assets/themes/config.js
   ========================================================= */
(window.MM_THEMES = window.MM_THEMES || []).push({
  id: "atomic",
  name: "Atomic Heart",
  desc: "Ретрофутуризм: плакаты, научный комплекс, роботы и терминалы",
  kicker: "НИИ конфликтологии · отчёт № 1",   // строка над заголовком на главном экране
  css: "assets/themes/atomic/theme.css",

  // загрузка в стиле старого терминала при входе в тему
  onEnter() {
    const lines = [
      "НИИ КОНФЛИКТОЛОГИИ · ТЕРМИНАЛ № 1",
      "> ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ ............. OK",
      "> ЗАГРУЗКА ЛЕСТНИЦЫ КОНФЛИКТОВ ...... OK",
      "> КАЛИБРОВКА ДЕКОДИРОВАНИЯ .......... OK",
      "> ПРОВЕРКА ЛИЧНЫХ ГРАНИЦ ............ OK",
      "ДОСТУП РАЗРЕШЁН"
    ];
    this.onLeave();
    const box = document.createElement("div");
    box.className = "ah-boot";
    box.innerHTML = '<div class="ah-boot-in"><div class="ah-boot-lines"></div><div class="ah-boot-bar"><i></i></div><p class="ah-boot-skip">клик — пропустить</p></div>';
    document.body.appendChild(box);
    this._boot = box;
    const out = box.querySelector(".ah-boot-lines");
    const timers = [];
    lines.forEach((t, i) => timers.push(setTimeout(() => {
      const p = document.createElement("p");
      p.textContent = t;
      if (i === lines.length - 1) p.className = "ok";
      out.appendChild(p);
    }, 180 + i * 260)));
    const close = () => {
      timers.forEach(clearTimeout);
      box.classList.add("done");
      setTimeout(() => box.remove(), 450);
      if (this._boot === box) this._boot = null;
    };
    timers.push(setTimeout(close, 180 + lines.length * 260 + 380));
    box.addEventListener("click", close);
  },
  onLeave() { if (this._boot) { this._boot.remove(); this._boot = null; } },

  // картинка на карточке стартового экрана
  card: `
<svg viewBox="0 0 320 200" aria-hidden="true">
  <rect width="320" height="200" fill="#efe4cc"/>
  <g fill="#e2d1af"><path d="M230 92 L630 92 L628 134 Z"/><path d="M230 92 L621 175 L610 216 Z"/><path d="M230 92 L595 255 L576 292 Z"/><path d="M230 92 L554 327 L527 360 Z"/><path d="M230 92 L498 389 L465 416 Z"/><path d="M230 92 L430 438 L393 457 Z"/><path d="M230 92 L354 472 L313 483 Z"/><path d="M230 92 L272 490 L230 492 Z"/><path d="M230 92 L188 490 L147 483 Z"/><path d="M230 92 L106 472 L67 457 Z"/><path d="M230 92 L30 438 L-5 416 Z"/><path d="M230 92 L-38 389 L-67 360 Z"/><path d="M230 92 L-94 327 L-116 292 Z"/><path d="M230 92 L-135 255 L-150 216 Z"/><path d="M230 92 L-161 175 L-168 134 Z"/><path d="M230 92 L-170 92 L-168 50 Z"/><path d="M230 92 L-161 9 L-150 -32 Z"/><path d="M230 92 L-135 -71 L-116 -108 Z"/><path d="M230 92 L-94 -143 L-67 -176 Z"/><path d="M230 92 L-38 -205 L-5 -232 Z"/><path d="M230 92 L30 -254 L67 -273 Z"/><path d="M230 92 L106 -288 L147 -299 Z"/><path d="M230 92 L188 -306 L230 -308 Z"/><path d="M230 92 L272 -306 L313 -299 Z"/><path d="M230 92 L354 -288 L393 -273 Z"/><path d="M230 92 L430 -254 L465 -232 Z"/><path d="M230 92 L498 -205 L527 -176 Z"/><path d="M230 92 L554 -143 L576 -108 Z"/><path d="M230 92 L595 -71 L610 -32 Z"/><path d="M230 92 L621 9 L628 50 Z"/></g>
  <circle cx="230" cy="92" r="62" fill="#d7263d" stroke="#efe4cc" stroke-width="6"/>
  <g fill="none" stroke="#efe4cc" stroke-width="4"><ellipse cx="230" cy="92" rx="52" ry="17"/><ellipse cx="230" cy="92" rx="52" ry="17" transform="rotate(60 230 92)"/><ellipse cx="230" cy="92" rx="52" ry="17" transform="rotate(120 230 92)"/></g>
  <circle cx="230" cy="92" r="8" fill="#efe4cc"/>
  <rect x="-10" y="150" width="340" height="22" fill="#d7263d" transform="rotate(-3 160 160)"/>
  <rect y="176" width="320" height="24" fill="#1c1a17"/>
  <text x="22" y="70" font-family="Russo One, sans-serif" font-size="30" fill="#1c1a17">КОНФЛИКТ</text>
  <rect x="22" y="80" width="96" height="16" fill="#1c1a17"/>
</svg>
`,

  // сцена на фоне главного экрана (data-depth — сила параллакса)
  decor: `
<div class="ah-rays" data-depth=".22"></div>
<div class="ah-sun" data-depth=".14" data-mouse="5"></div>
<svg class="ah-schema" data-depth=".14" data-mouse="5" viewBox="0 0 400 400" fill="none" stroke="#3d8fb0" stroke-width="1.4">
  <circle cx="200" cy="200" r="196" stroke-dasharray="4 6"/>
  <line x1="0" y1="200" x2="400" y2="200" stroke-dasharray="10 6"/>
  <line x1="200" y1="0" x2="200" y2="400" stroke-dasharray="10 6"/>
  <path d="M8 392 L8 410 M392 392 L392 410 M8 404 H392"/>
  <text x="170" y="420" fill="#3d8fb0" stroke="none" font-family="PT Mono, monospace" font-size="13">Ø 1:1 · СХЕМА 1-А</text>
  <text x="208" y="16" fill="#3d8fb0" stroke="none" font-family="PT Mono, monospace" font-size="12">ЯДРО · ЦЕЛЬ НА КОНФЛИКТ</text>
</svg>
<svg class="ah-atom" data-depth=".14" data-mouse="5" viewBox="0 0 400 400">
        <g class="orbits" fill="none" stroke="#efe4cc" stroke-width="7">
          <ellipse cx="200" cy="200" rx="168" ry="56"/>
          <ellipse cx="200" cy="200" rx="168" ry="56" transform="rotate(60 200 200)"/>
          <ellipse cx="200" cy="200" rx="168" ry="56" transform="rotate(120 200 200)"/>
          <circle cx="368" cy="200" r="10" fill="#1c1a17" stroke="#efe4cc" stroke-width="4"/>
          <circle cx="116" cy="54" r="10" fill="#1c1a17" stroke="#efe4cc" stroke-width="4"/>
          <circle cx="116" cy="346" r="10" fill="#1c1a17" stroke="#efe4cc" stroke-width="4"/>
        </g>
        <circle cx="200" cy="200" r="30" fill="#efe4cc"/>
        <circle cx="200" cy="200" r="14" fill="#1c1a17"/>
      </svg>
<svg class="ah-tower" data-depth=".06" data-mouse="10" viewBox="0 0 200 460" aria-hidden="true"><g stroke="#1c1a17" stroke-width="2.2" fill="none"><line x1="30.0" y1="460" x2="50.0" y2="400"/><line x1="30.0" y1="460" x2="150.0" y2="400"/><line x1="44.0" y1="460" x2="60.0" y2="400"/><line x1="44.0" y1="460" x2="140.0" y2="400"/><line x1="58.0" y1="460" x2="70.0" y2="400"/><line x1="58.0" y1="460" x2="130.0" y2="400"/><line x1="72.0" y1="460" x2="80.0" y2="400"/><line x1="72.0" y1="460" x2="120.0" y2="400"/><line x1="86.0" y1="460" x2="90.0" y2="400"/><line x1="86.0" y1="460" x2="110.0" y2="400"/><line x1="100.0" y1="460" x2="100.0" y2="400"/><line x1="100.0" y1="460" x2="100.0" y2="400"/><line x1="114.0" y1="460" x2="110.0" y2="400"/><line x1="114.0" y1="460" x2="90.0" y2="400"/><line x1="128.0" y1="460" x2="120.0" y2="400"/><line x1="128.0" y1="460" x2="80.0" y2="400"/><line x1="142.0" y1="460" x2="130.0" y2="400"/><line x1="142.0" y1="460" x2="70.0" y2="400"/><line x1="156.0" y1="460" x2="140.0" y2="400"/><line x1="156.0" y1="460" x2="60.0" y2="400"/><line x1="170.0" y1="460" x2="150.0" y2="400"/><line x1="170.0" y1="460" x2="50.0" y2="400"/><line x1="27" y1="460" x2="173" y2="460" stroke-width="5"/><line x1="47" y1="400" x2="153" y2="400" stroke-width="5"/><line x1="50.0" y1="400" x2="62.0" y2="310"/><line x1="50.0" y1="400" x2="138.0" y2="310"/><line x1="60.0" y1="400" x2="69.6" y2="310"/><line x1="60.0" y1="400" x2="130.4" y2="310"/><line x1="70.0" y1="400" x2="77.2" y2="310"/><line x1="70.0" y1="400" x2="122.8" y2="310"/><line x1="80.0" y1="400" x2="84.8" y2="310"/><line x1="80.0" y1="400" x2="115.2" y2="310"/><line x1="90.0" y1="400" x2="92.4" y2="310"/><line x1="90.0" y1="400" x2="107.6" y2="310"/><line x1="100.0" y1="400" x2="100.0" y2="310"/><line x1="100.0" y1="400" x2="100.0" y2="310"/><line x1="110.0" y1="400" x2="107.6" y2="310"/><line x1="110.0" y1="400" x2="92.4" y2="310"/><line x1="120.0" y1="400" x2="115.2" y2="310"/><line x1="120.0" y1="400" x2="84.8" y2="310"/><line x1="130.0" y1="400" x2="122.8" y2="310"/><line x1="130.0" y1="400" x2="77.2" y2="310"/><line x1="140.0" y1="400" x2="130.4" y2="310"/><line x1="140.0" y1="400" x2="69.6" y2="310"/><line x1="150.0" y1="400" x2="138.0" y2="310"/><line x1="150.0" y1="400" x2="62.0" y2="310"/><line x1="47" y1="400" x2="153" y2="400" stroke-width="5"/><line x1="59" y1="310" x2="141" y2="310" stroke-width="5"/><line x1="62.0" y1="310" x2="72.0" y2="225"/><line x1="62.0" y1="310" x2="128.0" y2="225"/><line x1="69.6" y1="310" x2="77.6" y2="225"/><line x1="69.6" y1="310" x2="122.4" y2="225"/><line x1="77.2" y1="310" x2="83.2" y2="225"/><line x1="77.2" y1="310" x2="116.8" y2="225"/><line x1="84.8" y1="310" x2="88.8" y2="225"/><line x1="84.8" y1="310" x2="111.2" y2="225"/><line x1="92.4" y1="310" x2="94.4" y2="225"/><line x1="92.4" y1="310" x2="105.6" y2="225"/><line x1="100.0" y1="310" x2="100.0" y2="225"/><line x1="100.0" y1="310" x2="100.0" y2="225"/><line x1="107.6" y1="310" x2="105.6" y2="225"/><line x1="107.6" y1="310" x2="94.4" y2="225"/><line x1="115.2" y1="310" x2="111.2" y2="225"/><line x1="115.2" y1="310" x2="88.8" y2="225"/><line x1="122.8" y1="310" x2="116.8" y2="225"/><line x1="122.8" y1="310" x2="83.2" y2="225"/><line x1="130.4" y1="310" x2="122.4" y2="225"/><line x1="130.4" y1="310" x2="77.6" y2="225"/><line x1="138.0" y1="310" x2="128.0" y2="225"/><line x1="138.0" y1="310" x2="72.0" y2="225"/><line x1="59" y1="310" x2="141" y2="310" stroke-width="5"/><line x1="69" y1="225" x2="131" y2="225" stroke-width="5"/><line x1="72.0" y1="225" x2="80.0" y2="150"/><line x1="72.0" y1="225" x2="120.0" y2="150"/><line x1="77.6" y1="225" x2="84.0" y2="150"/><line x1="77.6" y1="225" x2="116.0" y2="150"/><line x1="83.2" y1="225" x2="88.0" y2="150"/><line x1="83.2" y1="225" x2="112.0" y2="150"/><line x1="88.8" y1="225" x2="92.0" y2="150"/><line x1="88.8" y1="225" x2="108.0" y2="150"/><line x1="94.4" y1="225" x2="96.0" y2="150"/><line x1="94.4" y1="225" x2="104.0" y2="150"/><line x1="100.0" y1="225" x2="100.0" y2="150"/><line x1="100.0" y1="225" x2="100.0" y2="150"/><line x1="105.6" y1="225" x2="104.0" y2="150"/><line x1="105.6" y1="225" x2="96.0" y2="150"/><line x1="111.2" y1="225" x2="108.0" y2="150"/><line x1="111.2" y1="225" x2="92.0" y2="150"/><line x1="116.8" y1="225" x2="112.0" y2="150"/><line x1="116.8" y1="225" x2="88.0" y2="150"/><line x1="122.4" y1="225" x2="116.0" y2="150"/><line x1="122.4" y1="225" x2="84.0" y2="150"/><line x1="128.0" y1="225" x2="120.0" y2="150"/><line x1="128.0" y1="225" x2="80.0" y2="150"/><line x1="69" y1="225" x2="131" y2="225" stroke-width="5"/><line x1="77" y1="150" x2="123" y2="150" stroke-width="5"/><line x1="80.0" y1="150" x2="87.0" y2="90"/><line x1="80.0" y1="150" x2="113.0" y2="90"/><line x1="84.0" y1="150" x2="89.6" y2="90"/><line x1="84.0" y1="150" x2="110.4" y2="90"/><line x1="88.0" y1="150" x2="92.2" y2="90"/><line x1="88.0" y1="150" x2="107.8" y2="90"/><line x1="92.0" y1="150" x2="94.8" y2="90"/><line x1="92.0" y1="150" x2="105.2" y2="90"/><line x1="96.0" y1="150" x2="97.4" y2="90"/><line x1="96.0" y1="150" x2="102.6" y2="90"/><line x1="100.0" y1="150" x2="100.0" y2="90"/><line x1="100.0" y1="150" x2="100.0" y2="90"/><line x1="104.0" y1="150" x2="102.6" y2="90"/><line x1="104.0" y1="150" x2="97.4" y2="90"/><line x1="108.0" y1="150" x2="105.2" y2="90"/><line x1="108.0" y1="150" x2="94.8" y2="90"/><line x1="112.0" y1="150" x2="107.8" y2="90"/><line x1="112.0" y1="150" x2="92.2" y2="90"/><line x1="116.0" y1="150" x2="110.4" y2="90"/><line x1="116.0" y1="150" x2="89.6" y2="90"/><line x1="120.0" y1="150" x2="113.0" y2="90"/><line x1="120.0" y1="150" x2="87.0" y2="90"/><line x1="77" y1="150" x2="123" y2="150" stroke-width="5"/><line x1="84" y1="90" x2="116" y2="90" stroke-width="5"/><line x1="100" y1="90" x2="100" y2="40" stroke-width="4"/><circle cx="100" cy="34" r="7" fill="#d7263d" stroke="none"/></g></svg>
<svg class="ah-arm" data-depth=".04" data-mouse="14" viewBox="0 0 300 420">
  <g fill="#1c1a17">
    <rect x="70" y="370" width="160" height="50"/>
    <rect x="95" y="345" width="110" height="30"/>
    <g class="seg1">
      <rect x="132" y="190" width="36" height="170" rx="6"/>
      <circle cx="150" cy="350" r="26"/>
      <g class="seg2">
        <rect x="140" y="168" width="130" height="30" rx="6" transform="rotate(-28 150 190)"/>
        <circle cx="150" cy="190" r="22"/>
        <g class="claw" transform="rotate(-28 150 190)">
          <rect x="262" y="172" width="16" height="22"/>
          <path d="M276 170 h22 l6 -16 h-8 l-5 9 h-15 Z"/>
          <path d="M276 196 h22 l6 16 h-8 l-5 -9 h-15 Z"/>
        </g>
      </g>
    </g>
  </g>
  <g fill="#d7263d"><circle cx="150" cy="350" r="9"/><circle cx="150" cy="190" r="8"/></g>
  <circle class="led" cx="112" cy="395" r="5" fill="#6cc4e0"/>
  <circle class="led led2" cx="132" cy="395" r="5" fill="#d7263d"/>
  <rect x="160" y="388" width="50" height="4" fill="#efe4cc" opacity=".5"/>
  <rect x="160" y="398" width="34" height="4" fill="#efe4cc" opacity=".5"/>
</svg>
<div class="ah-ground"></div>
<div class="ah-band"><span>Эмоции · Границы · Защита границ · Сепарация · Декодирование · Цель на конфликт · Эмоции · Границы · Защита границ · Сепарация · Декодирование · Цель на конфликт ·</span></div>
<div class="ah-status"><span class="led"></span>Система в норме<span class="sep">·</span>Объект № 1<span class="sep">·</span>Сектор «Переговоры»</div>
<div class="ah-scan"></div>
<div class="ah-grain"></div>
`
});
