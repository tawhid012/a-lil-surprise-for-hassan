// Hand-drawn navy-ink & cream scrapbook SVG illustrations

export function createCornerDecorSVG() {
  return `
    <svg viewBox="0 0 140 140" width="130" height="130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="gingham-navy" width="18" height="18" patternUnits="userSpaceOnUse">
          <rect width="18" height="18" fill="#FAF6EE"/>
          <rect width="9" height="18" fill="rgba(26,43,76,0.28)"/>
          <rect width="18" height="9" fill="rgba(26,43,76,0.28)"/>
          <rect width="9" height="9" fill="rgba(26,43,76,0.55)"/>
        </pattern>
      </defs>
      <path d="M0 0 H122 C92 16 74 42 54 62 C34 82 14 98 0 124 Z" fill="url(#gingham-navy)" stroke="#1A2B4C" stroke-width="2.2"/>
      <!-- 4-point sparkle star -->
      <path d="M96 34 L101 48 L115 53 L101 58 L96 72 L91 58 L77 53 L91 48 Z" fill="#1A2B4C"/>
      <path d="M36 92 L39 100 L47 103 L39 106 L36 114 L33 106 L25 103 L33 100 Z" fill="#1A2B4C"/>
    </svg>
  `;
}

export function createGateEmblemSVG() {
  return `
    <svg viewBox="0 0 120 88" width="108" height="78" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="18" width="92" height="58" rx="5" fill="#F3EBDA" stroke="#1A2B4C" stroke-width="2.6"/>
      <path d="M16 20 L60 52 L104 20" stroke="#1A2B4C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 74 L46 47 M104 74 L74 47" stroke="#1A2B4C" stroke-width="1.6" stroke-dasharray="3 3" opacity="0.55"/>
      <circle cx="60" cy="49" r="12" fill="#1A2B4C" stroke="#FAF6EE" stroke-width="1.6"/>
      <path d="M60 54.5 C60 54.5 54 50.4 54 46.8 C54 45 55.4 43.8 57 43.8 C58.2 43.8 59.3 44.5 60 45.6 C60.7 44.5 61.8 43.8 63 43.8 C64.6 43.8 66 45 66 46.8 C66 50.4 60 54.5 60 54.5 Z" fill="#FAF6EE"/>
    </svg>
  `;
}

export function createBuntingSVG() {
  return `
    <svg viewBox="0 0 1000 108" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin slice">
      <defs>
        <pattern id="bunting-stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <rect width="8" height="8" fill="#FAF6EE"/>
          <line x1="0" y1="0" x2="0" y2="8" stroke="#1A2B4C" stroke-width="3.2"/>
        </pattern>
      </defs>
      <path d="M-10 8 Q250 68 500 22 Q750 68 1010 8" stroke="#1A2B4C" stroke-width="2.4" fill="none"/>
      <polygon points="44,18 90,26 62,72" fill="#1A2B4C" stroke="#1A2B4C" stroke-width="1.5" stroke-linejoin="round"/>
      <polygon points="128,32 174,38 148,82" fill="url(#bunting-stripes)" stroke="#1A2B4C" stroke-width="2" stroke-linejoin="round"/>
      <polygon points="212,42 258,44 234,88" fill="#FAF6EE" stroke="#1A2B4C" stroke-width="2" stroke-linejoin="round"/>
      <polygon points="296,44 342,42 318,86" fill="#1A2B4C" stroke="#1A2B4C" stroke-width="1.5" stroke-linejoin="round"/>
      <polygon points="380,38 426,32 404,76" fill="url(#bunting-stripes)" stroke="#1A2B4C" stroke-width="2" stroke-linejoin="round"/>
      <polygon points="476,23 524,23 500,68" fill="#B24545" stroke="#1A2B4C" stroke-width="2" stroke-linejoin="round"/>
      <polygon points="574,32 620,38 596,76" fill="url(#bunting-stripes)" stroke="#1A2B4C" stroke-width="2" stroke-linejoin="round"/>
      <polygon points="658,42 704,44 682,86" fill="#1A2B4C" stroke="#1A2B4C" stroke-width="1.5" stroke-linejoin="round"/>
      <polygon points="742,44 788,42 766,88" fill="#FAF6EE" stroke="#1A2B4C" stroke-width="2" stroke-linejoin="round"/>
      <polygon points="826,38 872,32 852,82" fill="url(#bunting-stripes)" stroke="#1A2B4C" stroke-width="2" stroke-linejoin="round"/>
      <polygon points="910,26 956,18 938,72" fill="#1A2B4C" stroke="#1A2B4C" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>
  `;
}

export function createCakeSVG() {
  return `
    <svg viewBox="0 0 340 255" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Plate -->
      <ellipse cx="170" cy="232" rx="126" ry="15" fill="#F3EBDA" stroke="#1A2B4C" stroke-width="2.6"/>
      <!-- Bottom tier -->
      <rect x="74" y="148" width="192" height="78" rx="14" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="2.8"/>
      <path d="M84 186 V214 M92 192 V214 M248 192 V214 M256 186 V214" stroke="#1A2B4C" stroke-width="1.4" opacity="0.26" stroke-linecap="round"/>
      <!-- Scalloped icing -->
      <path d="M74 164 Q90 186 106 164 Q122 186 138 164 Q154 186 170 164 Q186 186 202 164 Q218 186 234 164 Q250 186 266 164 L266 154 Q266 148 256 148 L84 148 Q74 148 74 154 Z" fill="#EFE5D0" stroke="#1A2B4C" stroke-width="2.4" stroke-linejoin="round"/>
      <!-- Top tier -->
      <rect x="104" y="96" width="132" height="54" rx="11" fill="#F7F0E2" stroke="#1A2B4C" stroke-width="2.8"/>
      <path d="M104 112 Q120 128 137 112 Q153 128 170 112 Q187 128 203 112 Q220 128 236 112 L236 102 Q236 96 226 96 L114 96 Q104 96 104 102 Z" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="2.4" stroke-linejoin="round"/>
      <!-- Tiny piped details & berries -->
      <circle cx="122" cy="136" r="3.5" fill="#1A2B4C"/>
      <circle cx="170" cy="136" r="4" fill="#B24545"/>
      <circle cx="218" cy="136" r="3.5" fill="#1A2B4C"/>
      <circle cx="114" cy="198" r="4" fill="#1A2B4C"/>
      <circle cx="170" cy="200" r="4.5" fill="#B24545"/>
      <circle cx="226" cy="198" r="4" fill="#1A2B4C"/>

      <!-- Single prominent striped birthday candle -->
      <rect x="163" y="42" width="14" height="54" rx="3" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="2.4"/>
      <path d="M163 54 L177 48 M163 66 L177 60 M163 78 L177 72 M163 90 L177 84" stroke="#1A2B4C" stroke-width="1.8"/>

      <!-- Lit flame (hidden when blown out) -->
      <g class="candle-flame-main">
        <circle cx="170" cy="26" r="14" fill="rgba(227,162,60,0.28)"/>
        <path d="M170 11 C177 21 178 32 170 37 C162 32 163 21 170 11 Z" fill="#E3A23C" stroke="#1A2B4C" stroke-width="1.8"/>
      </g>

      <!-- Gentle smoke wisps (shown after blowing out candle) -->
      <g class="candle-smoke" opacity="0">
        <path d="M170 36 Q164 25 172 16 Q178 9 169 2" stroke="#556789" stroke-width="2" stroke-linecap="round" fill="none"/>
        <path d="M176 32 Q182 23 176 14" stroke="#556789" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
      </g>

      <!-- Hand-drawn heart & star doodles -->
      <path d="M46 138 C46 138 36 130 36 123 C36 119.5 39 117 42 117 C44 117 45.4 118.4 46 120 C46.6 118.4 48 117 50 117 C53 117 56 119.5 56 123 C56 130 46 138 46 138 Z" fill="none" stroke="#1A2B4C" stroke-width="2"/>
      <path d="M294 134 C294 134 284 126 284 119 C284 115.5 287 113 290 113 C292 113 293.4 114.4 294 116 C294.6 114.4 296 113 298 113 C301 113 304 115.5 304 119 C304 126 294 134 294 134 Z" fill="none" stroke="#1A2B4C" stroke-width="2"/>
    </svg>
  `;
}

export function createCuteDoodleSVG(mood = 'pleading') {
  if (mood === 'crying') {
    return `
      <svg viewBox="0 0 180 160" width="165" height="148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Puddle -->
        <ellipse cx="90" cy="142" rx="52" ry="10" fill="#B8D4E8" stroke="#1A2B4C" stroke-width="1.8"/>
        <!-- Body -->
        <path d="M68 104 C62 118 62 134 68 136 H112 C118 134 118 118 112 104" fill="#FFFFFF" stroke="#1A2B4C" stroke-width="2.6" stroke-linecap="round"/>
        <!-- Head -->
        <ellipse cx="90" cy="64" rx="44" ry="38" fill="#FFFFFF" stroke="#1A2B4C" stroke-width="2.6"/>
        <!-- Huge watery eyes -->
        <ellipse cx="72" cy="66" rx="11" ry="13" fill="#1A2B4C"/>
        <ellipse cx="108" cy="66" rx="11" ry="13" fill="#1A2B4C"/>
        <circle cx="68" cy="61" r="4" fill="#FFFFFF"/>
        <circle cx="104" cy="61" r="4" fill="#FFFFFF"/>
        <circle cx="75" cy="71" r="2" fill="#FFFFFF"/>
        <circle cx="111" cy="71" r="2" fill="#FFFFFF"/>
        <!-- Tear streams -->
        <path d="M65 78 Q62 104 64 136" stroke="#85B8DA" stroke-width="7" stroke-linecap="round"/>
        <path d="M115 78 Q118 104 116 136" stroke="#85B8DA" stroke-width="7" stroke-linecap="round"/>
        <!-- Tiny sad mouth -->
        <path d="M84 84 Q90 79 96 84" stroke="#1A2B4C" stroke-width="2.2" stroke-linecap="round"/>
      </svg>
    `;
  }

  if (mood === 'cool') {
    return `
      <svg viewBox="0 0 160 140" width="146" height="128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Body -->
        <path d="M58 92 C52 108 54 126 60 128 H100 C106 126 108 108 102 92" fill="#FFFFFF" stroke="#1A2B4C" stroke-width="2.5"/>
        <!-- Little arms holding a heart -->
        <path d="M56 102 Q42 98 46 88" stroke="#1A2B4C" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M104 102 Q118 98 114 88" stroke="#1A2B4C" stroke-width="2.4" stroke-linecap="round"/>
        <!-- Head -->
        <ellipse cx="80" cy="56" rx="38" ry="33" fill="#FFFFFF" stroke="#1A2B4C" stroke-width="2.5"/>
        <!-- Sunglasses -->
        <rect x="52" y="45" width="24" height="15" rx="4" fill="#1A2B4C"/>
        <rect x="84" y="45" width="24" height="15" rx="4" fill="#1A2B4C"/>
        <path d="M76 50 H84 M44 48 L52 50 M108 50 L116 48" stroke="#1A2B4C" stroke-width="2.2"/>
        <path d="M57 49 L63 49" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M89 49 L95 49" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"/>
        <!-- Smirk -->
        <path d="M74 71 Q80 76 87 70" stroke="#1A2B4C" stroke-width="2.2" stroke-linecap="round"/>
      </svg>
    `;
  }

  if (mood === 'arms-open') {
    return `
      <svg viewBox="0 0 180 150" width="164" height="136" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Open arms -->
        <path d="M58 92 Q24 72 18 54" stroke="#1A2B4C" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M122 92 Q156 72 162 54" stroke="#1A2B4C" stroke-width="2.6" stroke-linecap="round"/>
        <!-- Body -->
        <path d="M64 88 C58 108 60 132 68 134 H112 C120 132 122 108 116 88" fill="#FFFFFF" stroke="#1A2B4C" stroke-width="2.6"/>
        <!-- Head -->
        <ellipse cx="90" cy="52" rx="36" ry="31" fill="#FFFFFF" stroke="#1A2B4C" stroke-width="2.6"/>
        <!-- Happy eyes & blush -->
        <circle cx="77" cy="49" r="3.2" fill="#1A2B4C"/>
        <circle cx="103" cy="49" r="3.2" fill="#1A2B4C"/>
        <ellipse cx="69" cy="56" rx="6" ry="3.2" fill="rgba(178,69,69,0.35)"/>
        <ellipse cx="111" cy="56" rx="6" ry="3.2" fill="rgba(178,69,69,0.35)"/>
        <path d="M83 59 Q90 65 97 59" stroke="#1A2B4C" stroke-width="2.2" stroke-linecap="round"/>
        <!-- Floating heart -->
        <path d="M90 16 C90 16 82 10 82 5.5 C82 3.2 84 1.5 86.2 1.5 C87.8 1.5 89.2 2.4 90 3.8 C90.8 2.4 92.2 1.5 93.8 1.5 C96 1.5 98 3.2 98 5.5 C98 10 90 16 90 16 Z" fill="#B24545"/>
      </svg>
    `;
  }

  // Default: 'pleading' big sparkling eyes & open hands
  return `
    <svg viewBox="0 0 180 156" width="168" height="146" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <path d="M66 96 C60 116 62 134 68 136 H112 C118 134 120 116 114 96" fill="#FFFFFF" stroke="#1A2B4C" stroke-width="2.6"/>
      <!-- Open pleading arms -->
      <path d="M62 106 Q40 100 34 112 Q42 120 58 116" fill="#FFFFFF" stroke="#1A2B4C" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M118 106 Q140 100 146 112 Q138 120 122 116" fill="#FFFFFF" stroke="#1A2B4C" stroke-width="2.4" stroke-linejoin="round"/>
      <!-- Head -->
      <ellipse cx="90" cy="60" rx="46" ry="38" fill="#FFFFFF" stroke="#1A2B4C" stroke-width="2.6"/>
      <!-- Rosy cheeks -->
      <ellipse cx="62" cy="72" rx="10" ry="5.5" fill="rgba(178,69,69,0.38)"/>
      <ellipse cx="118" cy="72" rx="10" ry="5.5" fill="rgba(178,69,69,0.38)"/>
      <!-- Huge sparkling eyes -->
      <ellipse cx="70" cy="58" rx="11.5" ry="13.5" fill="#1A2B4C"/>
      <ellipse cx="110" cy="58" rx="11.5" ry="13.5" fill="#1A2B4C"/>
      <circle cx="66" cy="52" r="4.5" fill="#FFFFFF"/>
      <circle cx="106" cy="52" r="4.5" fill="#FFFFFF"/>
      <circle cx="74" cy="64" r="2.2" fill="#FFFFFF"/>
      <circle cx="114" cy="64" r="2.2" fill="#FFFFFF"/>
      <!-- Sweet tiny smile -->
      <path d="M84 74 Q90 79 96 74" stroke="#1A2B4C" stroke-width="2.2" stroke-linecap="round"/>
    </svg>
  `;
}

export function createEnvelopeObjectSVG() {
  return `
    <svg viewBox="0 0 180 140" width="166" height="128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Peeking cream letter -->
      <rect x="30" y="14" width="120" height="70" rx="4" fill="#F3EBDA" stroke="#1A2B4C" stroke-width="2.2"/>
      <path d="M46 32 H118 M46 44 H102" stroke="#1A2B4C" stroke-width="2" stroke-linecap="round" opacity="0.35"/>
      <!-- Navy envelope body -->
      <rect x="20" y="44" width="140" height="84" rx="6" fill="#1A2B4C" stroke="#1A2B4C" stroke-width="2.2"/>
      <path d="M22 46 L90 92 L158 46" stroke="#FAF6EE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.75"/>
      <!-- Heart wax seal -->
      <circle cx="90" cy="92" r="14" fill="#101C34" stroke="#FAF6EE" stroke-width="1.6"/>
      <path d="M90 98.5 C90 98.5 82.5 93.5 82.5 89.2 C82.5 86.8 84.3 85 86.5 85 C88 85 89.3 85.9 90 87.2 C90.7 85.9 92 85 93.5 85 C95.7 85 97.5 86.8 97.5 89.2 C97.5 93.5 90 98.5 90 98.5 Z" fill="#FAF6EE"/>
    </svg>
  `;
}

export function createBouquetSVG() {
  return `
    <svg viewBox="0 0 200 210" width="176" height="184" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Dark paper wrap back -->
      <polygon points="48,66 152,66 116,162 84,162" fill="#1A2B4C" stroke="#1A2B4C" stroke-width="2.2" stroke-linejoin="round"/>
      <!-- Cream tissue layer -->
      <polygon points="56,74 144,74 114,154 86,154" fill="#F3EBDA" stroke="#1A2B4C" stroke-width="1.8" stroke-linejoin="round"/>
      <!-- Stems & leaves -->
      <path d="M84 68 L96 144 M100 54 L100 144 M118 68 L104 144 M72 86 L92 144 M128 86 L108 144" stroke="#3D5A45" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M70 104 Q60 88 74 78 Q82 92 70 104 Z" fill="#4D6E55" stroke="#1A2B4C" stroke-width="1.5"/>
      <path d="M130 104 Q140 88 126 78 Q118 92 130 104 Z" fill="#4D6E55" stroke="#1A2B4C" stroke-width="1.5"/>
      <!-- White tulip blooms -->
      <g>
        <path d="M100 32 C90 38 88 54 100 60 C112 54 110 38 100 32 Z" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="2"/>
        <path d="M78 44 C68 50 68 65 79 70 C89 65 89 50 78 44 Z" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="2"/>
        <path d="M122 44 C111 50 111 65 121 70 C132 65 132 50 122 44 Z" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="2"/>
        <path d="M64 68 C56 74 57 86 67 90 C76 86 76 74 64 68 Z" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="2"/>
        <path d="M136 68 C124 74 124 86 133 90 C143 86 144 74 136 68 Z" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="2"/>
        <path d="M100 58 C91 64 90 78 100 82 C110 78 109 64 100 58 Z" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="2"/>
      </g>
      <!-- Front paper fold -->
      <polygon points="62,110 138,110 116,178 84,178" fill="#243B66" stroke="#1A2B4C" stroke-width="2.2" stroke-linejoin="round"/>
      <!-- Navy ribbon bow -->
      <rect x="86" y="138" width="28" height="9" rx="3" fill="#101C34" stroke="#FAF6EE" stroke-width="1.2"/>
      <path d="M100 142 C82 132 76 146 88 150 Z" fill="#1A2B4C" stroke="#FAF6EE" stroke-width="1.4"/>
      <path d="M100 142 C118 132 124 146 112 150 Z" fill="#1A2B4C" stroke="#FAF6EE" stroke-width="1.4"/>
      <path d="M96 146 L86 176 M104 146 L114 176" stroke="#1A2B4C" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `;
}

export function createNavyGiftBoxSVG() {
  return `
    <svg viewBox="0 0 170 150" width="158" height="138" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Box body -->
      <rect x="30" y="54" width="110" height="78" rx="6" fill="#1A2B4C" stroke="#101C34" stroke-width="2.4"/>
      <!-- Lid -->
      <rect x="22" y="38" width="126" height="22" rx="5" fill="#243B66" stroke="#101C34" stroke-width="2.4"/>
      <!-- Ribbon -->
      <rect x="76" y="38" width="18" height="94" fill="#B24545"/>
      <!-- Bow -->
      <path d="M85 38 C64 14 44 24 58 38 C68 41 78 39 85 38 Z" fill="#B24545" stroke="#FAF6EE" stroke-width="1.5"/>
      <path d="M85 38 C106 14 126 24 112 38 C102 41 92 39 85 38 Z" fill="#B24545" stroke="#FAF6EE" stroke-width="1.5"/>
      <circle cx="85" cy="38" r="6" fill="#B24545" stroke="#FAF6EE" stroke-width="1.5"/>
    </svg>
  `;
}

export function createVinylSVG() {
  return `
    <svg viewBox="0 0 150 130" width="136" height="118" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="68" cy="65" r="54" fill="#101829" stroke="#FAF6EE" stroke-width="1.8"/>
      <circle cx="68" cy="65" r="44" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>
      <circle cx="68" cy="65" r="34" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <circle cx="68" cy="65" r="20" fill="#B8C7E0" stroke="#FAF6EE" stroke-width="1.5"/>
      <path d="M68 72 C68 72 60 66.5 60 62 C60 59.5 62 58 64.2 58 C65.8 58 67.2 58.9 68 60.2 C68.8 58.9 70.2 58 71.8 58 C74 58 76 59.5 76 62 C76 66.5 68 72 68 72 Z" fill="#1A2B4C"/>
      <circle cx="68" cy="65" r="2.5" fill="#FAF6EE"/>
      <!-- Tonearm -->
      <circle cx="132" cy="24" r="7" fill="#FAF6EE" stroke="#1A2B4C" stroke-width="2"/>
      <path d="M132 24 L112 78 L104 86" stroke="#FAF6EE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

export function createMemoryKeepsakeSVG(type) {
  if (type === 'folded-note') {
    return `
      <svg viewBox="0 0 96 84" width="84" height="74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(-3 48 42)">
          <rect x="14" y="14" width="68" height="56" rx="4" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="2.2"/>
          <path d="M14 34 H82" stroke="#1A2B4C" stroke-width="1.4" stroke-dasharray="3 3" opacity="0.45"/>
          <path d="M26 24 H58" stroke="#1A2B4C" stroke-width="1.8" stroke-linecap="round" opacity="0.5"/>
          <path d="M48 56 C48 56 41 51 41 46.8 C41 44.5 42.8 43 44.8 43 C46.2 43 47.3 43.8 48 45 C48.7 43.8 49.8 43 51.2 43 C53.2 43 55 44.5 55 46.8 C55 51 48 56 48 56 Z" fill="#B24545"/>
        </g>
      </svg>
    `;
  }
  if (type === 'tiny-envelope') {
    return `
      <svg viewBox="0 0 96 84" width="84" height="74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(2 48 42)">
          <rect x="12" y="18" width="72" height="48" rx="5" fill="#F3EBDA" stroke="#1A2B4C" stroke-width="2.2"/>
          <path d="M14 20 L48 46 L82 20" stroke="#1A2B4C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="48" cy="45" r="8" fill="#B24545" stroke="#FFFDF8" stroke-width="1.4"/>
        </g>
      </svg>
    `;
  }
  if (type === 'ribbon-slip') {
    return `
      <svg viewBox="0 0 96 84" width="84" height="74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="14" width="64" height="56" rx="4" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="2.2"/>
        <rect x="43" y="14" width="10" height="56" fill="#1A2B4C" opacity="0.88"/>
        <path d="M48 28 C39 18 32 23 39 28 Z" fill="#B24545" stroke="#1A2B4C" stroke-width="1.6"/>
        <path d="M48 28 C57 18 64 23 57 28 Z" fill="#B24545" stroke="#1A2B4C" stroke-width="1.6"/>
        <circle cx="48" cy="28" r="3.5" fill="#B24545" stroke="#1A2B4C" stroke-width="1.4"/>
      </svg>
    `;
  }
  return `
    <svg viewBox="0 0 96 84" width="84" height="74" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(-2 48 42)">
        <rect x="12" y="16" width="72" height="52" rx="4" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="2.2"/>
        <rect x="62" y="22" width="14" height="16" rx="2" fill="#F3EBDA" stroke="#1A2B4C" stroke-width="1.4" stroke-dasharray="2 2"/>
        <path d="M22 32 H48 M22 42 H54 M22 52 H42" stroke="#1A2B4C" stroke-width="1.8" stroke-linecap="round" opacity="0.5"/>
        <path d="M69 52 L71 56 L75 56.5 L72 59.5 L72.8 63.5 L69 61.5 L65.2 63.5 L66 59.5 L63 56.5 L67 56 Z" fill="#E3A23C" stroke="#1A2B4C" stroke-width="1.2"/>
      </g>
    </svg>
  `;
}

export function createPressedFlowerSVG() {
  return `
    <svg viewBox="0 0 84 84" width="66" height="66" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Stem & leaves -->
      <path d="M42 74 Q40 54 44 36" stroke="#1A2B4C" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M42 58 Q30 52 28 43 Q37 45 42 58 Z" fill="#E8DEC8" stroke="#1A2B4C" stroke-width="1.5"/>
      <path d="M42 52 Q54 46 56 37 Q47 39 42 52 Z" fill="#E8DEC8" stroke="#1A2B4C" stroke-width="1.5"/>
      <!-- Pressed petals -->
      <circle cx="44" cy="24" r="7" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="1.5"/>
      <circle cx="35" cy="31" r="7" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="1.5"/>
      <circle cx="53" cy="31" r="7" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="1.5"/>
      <circle cx="38" cy="40" r="7" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="1.5"/>
      <circle cx="50" cy="40" r="7" fill="#FFFDF8" stroke="#1A2B4C" stroke-width="1.5"/>
      <circle cx="44" cy="33" r="4.5" fill="#E3A23C" stroke="#1A2B4C" stroke-width="1.4"/>
    </svg>
  `;
}

export function createFinalKeepsakeSVG() {
  return `
    <svg viewBox="0 0 180 118" width="156" height="102" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 88 Q90 118 156 88" stroke="#1A2B4C" stroke-width="2.2" stroke-dasharray="4 4"/>
      <path d="M90 92 C90 92 46 65 46 38 C46 24 57 14 70 14 C79 14 86 20 90 27 C94 20 101 14 110 14 C123 14 134 24 134 38 C134 65 90 92 90 92 Z" fill="#B24545" stroke="#1A2B4C" stroke-width="2.8"/>
      <path d="M26 28 L29 35 L36 36 L31 41 L32 48 L26 44.5 L20 48 L21 41 L16 36 L23 35 Z" fill="#E3A23C" stroke="#1A2B4C" stroke-width="1.5"/>
      <path d="M154 22 L156.5 27.5 L162 28.2 L158 32 L159 37.5 L154 34.8 L149 37.5 L150 32 L146 28.2 L151.5 27.5 Z" fill="#E3A23C" stroke="#1A2B4C" stroke-width="1.5"/>
    </svg>
  `;
}
