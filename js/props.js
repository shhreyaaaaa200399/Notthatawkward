/* Not That Awk — scene backdrops and props (flat, angular, hand-cut look). Everything returns SVG strings in a 932 x 430 world. */
window.PR = (() => {
  'use strict';
  const A = window.ART, C = A.C, { poly, line, shade, f } = A;
  const W = 932, H = 430, GY = 396;           // GY = ground line where feet stand

  /* age palettes: each age group has its own colour world */
  const PAL = {
    y: { sky: '#ffecba', sky2: '#fcd3c3', ground: '#9ca32f', ground2: '#59662e', accent: '#e35e26', sun: '#ffcb05', ink: '#592898', soft: '#fff7dc' },
    m: { sky: '#dcedf0', sky2: '#96c5d1', ground: '#59662e', ground2: '#3f4a21', accent: '#9ca32f', sun: '#ffcb05', ink: '#3f4a21', soft: '#f1f8f9' },
    o: { sky: '#eee8f5', sky2: '#d9c9ec', ground: '#434f64', ground2: '#2f3846', accent: '#653781', sun: '#ffcb05', ink: '#592898', soft: '#f6f2fa' },
  };
  const pal = ctx => PAL[(ctx && ctx.tier) || 'y'];

  /* ------------------------------------------------------------------ text + bubbles */
  const txt = (x, y, s, size = 20, fill = '#0b0b0b', anchor = 'middle', font = 'Black Han Sans,Inter,sans-serif', extra = '') =>
    `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-size="${size}" fill="${fill}" ${extra}>${s}</text>`;
  const bubble = (x, y, w, h, lines, tail = 'bl', fill = '#fff', ink = '#0b0b0b', size = 17) => {
    const tl = { bl: `${x + 24},${y + h} ${x + 14},${y + h + 24} ${x + 52},${y + h}`, br: `${x + w - 52},${y + h} ${x + w - 14},${y + h + 24} ${x + w - 24},${y + h}`, none: '' }[tail];
    const ls = (Array.isArray(lines) ? lines : [lines]);
    return `<g class="bub"><polygon points="${x},${y + 6} ${x + w - 6},${y} ${x + w},${y + h - 6} ${x + 6},${y + h}" fill="${fill}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>${tl ? `<polygon points="${tl}" fill="${fill}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>` : ''}
      ${ls.map((l, i) => txt(x + w / 2, y + h / 2 + (i - (ls.length - 1) / 2) * (size + 4) + size * .35, l, size, ink)).join('')}</g>`;
  };

  /* ------------------------------------------------------------------ backdrops, one look per age group */
  const spikes = (y, c, n, w0, hmax, seed = 1) => { let p = [[-10, H + 10], [-10, y]], x = -10, k = seed; while (x < W + 20) { k = (k * 9301 + 49297) % 233280; const hh = hmax * (.45 + (k / 233280) * .55); p.push([x + w0 / 2, y - hh], [x + w0, y]); x += w0; } p.push([W + 10, H + 10]); return poly(p, c); };
  const cloud = (x, y, s, c = '#fff', o = 1) => `<g transform="translate(${x} ${y}) scale(${s})" opacity="${o}">${poly([[0, 40], [20, 14], [52, 22], [78, 0], [112, 18], [128, 40]], c)}</g>`;
  const sun = (x, y, r, c) => `<g>${poly(Array.from({ length: 16 }, (_, i) => { const a = i / 16 * Math.PI * 2, rr = i % 2 ? r * 1.0 : r * 1.38; return [x + Math.cos(a) * rr, y + Math.sin(a) * rr]; }), c, 'opacity=".55"')}<circle cx="${x}" cy="${y}" r="${r * .82}" fill="${c}"/></g>`;
  /* sky + motif + ground. kinds: outdoor (default), indoor (wall + floor), night, stage */
  function base(ctx, o = {}) {
    const p = pal(ctx), t = (ctx && ctx.tier) || 'y', kind = o.kind || 'outdoor', gy = o.gy || GY - 14;
    let s = '';
    if (kind === 'indoor') {
      s += `<rect width="${W}" height="${H}" fill="${o.wall || p.sky}"/>` + poly([[0, gy - 6], [W, gy - 14], [W, H], [0, H]], o.floor || p.ground2);
      if (t === 'y') s += [60, 200, 360, 560, 760, 880].map((x, i) => `<circle cx="${x}" cy="${60 + (i % 2) * 40}" r="${24 + (i % 3) * 8}" fill="${shade(o.wall || p.sky, -.05)}"/>`).join('');
      if (t === 'm') s += [0, 1, 2, 3].map(i => poly([[i * 260, 0], [i * 260 + 120, 0], [i * 260 + 60, 90]], shade(o.wall || p.sky, -.04))).join('');
      if (t === 'o') s += `<path d="M0 ${gy - 80}H${W}M0 ${gy - 160}H${W}" stroke="${shade(o.wall || p.sky, -.06)}" stroke-width="2"/>`;
      return s;
    }
    const night = kind === 'night';
    s += `<rect width="${W}" height="${H}" fill="${night ? '#2b2740' : p.sky}"/>`;
    if (t === 'y') { s += sun(790, 92, 42, night ? '#fff3b0' : p.sun) + cloud(130, 150, 1, '#fff', .9) + cloud(560, 190, .8, '#fff', .8) + `<circle cx="470" cy="62" r="20" fill="${p.sky2}"/>`; s += spikes(gy - 30, p.ground2, 0, 34, 70, 3) + spikes(gy - 8, p.ground, 0, 30, 50, 7); }
    if (t === 'm') { s += poly([[0, gy - 40], [160, gy - 150], [330, gy - 70], [520, gy - 190], [700, gy - 80], [W, gy - 150], [W, H], [0, H]], p.sky2) + poly([[0, gy - 10], [200, gy - 90], [420, gy - 30], [640, gy - 100], [W, gy - 20], [W, H], [0, H]], shade(p.ground, .18)); s += cloud(90, 60, 1, '#fff', .85) + cloud(640, 40, .9, '#fff', .8) + Array.from({ length: 18 }, (_, i) => `<circle cx="${(i * 197) % W}" cy="${30 + (i * 53) % 140}" r="3" fill="#fff" opacity=".7"/>`).join(''); }
    if (t === 'o') { s += `<circle cx="150" cy="${gy - 20}" r="120" fill="${p.sun}" opacity=".9"/><circle cx="360" cy="${gy + 40}" r="80" fill="${shade(p.sun, .55)}"/><circle cx="640" cy="${gy - 10}" r="140" fill="${p.sun}" opacity=".9"/><circle cx="860" cy="${gy + 50}" r="90" fill="${shade(p.sun, .55)}"/><circle cx="530" cy="110" r="26" fill="${p.sky2}"/><circle cx="80" cy="70" r="10" fill="${p.sun}"/>`; }
    s += poly([[0, gy + 4], [W, gy - 8], [W, H], [0, H]], o.ground || p.ground);
    if (t === 'y') s += spikes(gy + 6, o.ground || p.ground, 0, 26, 26, 11);
    return s;
  }

  /* ------------------------------------------------------------------ flags + medals + small props */
  const flag = (x, y, s = 1) => `<g transform="translate(${x} ${y - 110 * s}) scale(${s})"><path d="M0 0V110" stroke="#0b0b0b" stroke-width="4"/>${poly([[2, 4], [86, 0], [88, 20], [2, 24]], '#ff9933')}${poly([[2, 24], [88, 20], [88, 40], [2, 44]], '#fff')}${poly([[2, 44], [88, 40], [86, 60], [2, 64]], '#138808')}<circle cx="45" cy="32" r="6" fill="none" stroke="#000a6b" stroke-width="2"/></g>`;
  const medal = (x, y, c = '#cd7f32', s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${poly([[-12, -40], [0, -40], [10, -6], [-2, -6]], C.sky)}${poly([[12, -40], [24, -40], [8, -6], [-2, -6]], C.orange)}<circle cx="4" cy="12" r="20" fill="${c}"/><circle cx="4" cy="12" r="12" fill="${shade(c, .25)}"/></g>`;
  const trophy = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${poly([[-26, -70], [26, -70], [20, -30], [-20, -30]], C.yellow)}<path d="M-26 -62q-20 4-14 24q6 12 24 12M26 -62q20 4 14 24q-6 12-24 12" fill="none" stroke="${C.yellow}" stroke-width="6"/>${poly([[-6, -30], [6, -30], [8, -4], [-8, -4]], C.yellow)}${poly([[-22, -4], [22, -4], [24, 12], [-24, 12]], C.oliveD)}</g>`;
  const ball = (x, y, r = 22) => `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#0b0b0b" stroke-width="2.5"/>${poly([[x - r * .3, y - r * .3], [x + r * .3, y - r * .35], [x + r * .4, y + r * .2], [x, y + r * .45], [x - r * .4, y + r * .15]], '#0b0b0b')}</g>`;
  const cricketBall = (x, y, r = 10, c = C.maroon) => `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><path d="M${x - r * .8} ${y - r * .3}q${r * .8} ${r * .4} ${r * 1.6} 0" stroke="#fff" stroke-width="1.6" fill="none"/></g>`;
  const bat = (x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${poly([[-6, 0], [6, 0], [8, 70], [-8, 70]], '#d9a15b')}${poly([[-5, -34], [5, -34], [6, 0], [-6, 0]], '#0b0b0b')}</g>`;
  const stumps = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${[-14, 0, 14].map(dx => `<rect x="${dx - 2.5}" y="-60" width="5" height="60" fill="#e8c27a"/>`).join('')}<rect x="-14" y="-64" width="13" height="4" fill="#d9a15b"/><rect x="1" y="-64" width="13" height="4" fill="#d9a15b"/></g>`;
  const gloves = (x, y, s = 1, c = C.maroon) => `<g transform="translate(${x} ${y}) scale(${s})">${poly([[-22, 0], [8, -14], [28, -4], [30, 24], [4, 34], [-18, 24]], c)}${poly([[-22, 0], [-26, 24], [-10, 30], [-6, 8]], shade(c, -.25))}${poly([[-18, 24], [4, 34], [2, 44], [-20, 36]], '#fff')}</g>`;
  const mic = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0V-70" stroke="#0b0b0b" stroke-width="5"/>${poly([[-12, -112], [12, -112], [14, -78], [-14, -78]], '#434f64')}<path d="M-12 -100H14M-12 -92H14" stroke="#9aa3b2" stroke-width="2"/><ellipse cx="0" cy="0" rx="28" ry="7" fill="#0b0b0b"/></g>`;
  const heart = (x, y, s = 1, c = C.orange) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 14 L-22 -8 L-14 -22 L0 -14 L14 -22 L22 -8Z" fill="${c}"/>`;
  const star = (x, y, r = 12, c = C.yellow) => poly(Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; return [x + Math.cos(a) * rr, y + Math.sin(a) * rr]; }), c);
  const sparkle = (x, y, r = 10, c = C.yellow) => poly([[x, y - r], [x + r * .3, y - r * .3], [x + r, y], [x + r * .3, y + r * .3], [x, y + r], [x - r * .3, y + r * .3], [x - r, y], [x - r * .3, y - r * .3]], c);
  const tear = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -10q10 14 0 22q-10 -8 0 -22z" fill="${C.sky}" stroke="#0b0b0b" stroke-width="1.6"/>`;
  const sign = (x, y, lines, w = 150, h = 80, c = '#fff', ink = '#0b0b0b') => `<g>${line([x, y], [x, y + 120], 6, '#8a5a2b', 'butt')}${poly([[x - w / 2, y - h + 4], [x + w / 2, y - h], [x + w / 2 - 2, y + 4], [x - w / 2 + 2, y + 8]], c, 'stroke="#0b0b0b" stroke-width="3"')}${(Array.isArray(lines) ? lines : [lines]).map((l, i, a) => txt(x, y - h / 2 + 4 + (i - (a.length - 1) / 2) * 20, l, 16, ink)).join('')}</g>`;

  /* ------------------------------------------------------------------ buildings */
  const archWin = (x, y, w, h, c) => `<path d="M${x} ${y + h}V${y + w / 2}a${w / 2} ${w / 2} 0 0 1 ${w} 0V${y + h}Z" fill="${c}"/>`;
  const hawaMahal = (x, y, s = 1, c = '#ea8259') => { let g = ''; const tiers = [[0, 150, 5], [24, 110, 4], [48, 82, 3], [72, 56, 2]]; tiers.forEach(([dy, w, n], i) => { const yy = -(i + 1) * 62; g += poly([[-w, yy + 62], [w, yy + 62], [w - 6, yy], [-w + 6, yy]], i % 2 ? shade(c, -.06) : c); for (let k = 0; k < n * 2; k++) g += archWin(-w + 14 + k * ((2 * w - 28) / (n * 2)), yy + 14, ((2 * w - 28) / (n * 2)) - 8, 34, '#fff3e6') + `<path d="M${-w + 14 + k * ((2 * w - 28) / (n * 2)) + 2} ${yy + 30}h${((2 * w - 28) / (n * 2)) - 12}" stroke="#fff" stroke-width="1.5"/>`; g += poly([[-w, yy], [w, yy], [w - 8, yy - 8], [-w + 8, yy - 8]], shade(c, .15)); }); g += poly([[-20, -230], [0, -270], [20, -230]], shade(c, .12)); return `<g transform="translate(${x} ${y}) scale(${s})">${g}${poly([[-150, 0], [150, 0], [144, 62], [-144, 62]].map(p => [p[0], p[1] - 62]), shade(c, -.1))}</g>`; };
  const house = (x, y, w, h, c, roof, win = '#fff3e6') => `<g>${poly([[x, y], [x + w, y - 4], [x + w, y - h], [x, y - h + 4]], c)}${roof ? poly([[x - 6, y - h + 4], [x + w + 6, y - h], [x + w + 6, y - h - 12], [x - 6, y - h - 8]], shade(c, -.2)) : ''}${archWin(x + w * .18, y - h * .72, w * .2, h * .4, win)}${archWin(x + w * .6, y - h * .72, w * .2, h * .4, win)}${archWin(x + w * .39, y - h * .34, w * .22, h * .34, shade(c, -.25))}</g>`;
  const court = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${poly([[-150, 0], [150, 0], [150, -14], [-150, -14]], '#d9d9d9')}${poly([[-130, -14], [130, -14], [130, -26], [-130, -26]], '#fff')}${[-110, -66, -22, 22, 66, 110].map(c => poly([[c - 9, -26], [c + 9, -26], [c + 7, -130], [c - 7, -130]], '#fff')).join('')}${poly([[-140, -130], [140, -130], [0, -190]], '#f2f2f2')}${poly([[-140, -130], [140, -130], [140, -142], [-140, -142]], '#d9d9d9')}<path d="M-30 -112a30 30 0 0 1 60 0" fill="${C.sky}"/><circle cx="0" cy="-206" r="22" fill="#fff"/>${poly([[-6, -228], [6, -228], [0, -246]], C.orange)}</g>`;
  const stand = (c1, c2, y = 230) => `<g>${poly([[0, y], [W, y - 10], [W, y - 110], [0, y - 100]], c1)}${poly([[0, y - 100], [W, y - 110], [W, y - 150], [0, y - 140]], c2)}${Array.from({ length: 110 }, (_, i) => { const x = (i * 83) % W, row = Math.floor(i / 22), yy = y - 20 - row * 18 - ((i * 7) % 5); return `<circle cx="${x + (row % 2) * 14}" cy="${yy}" r="6" fill="${['#e35e26', '#ffcb05', '#fff', '#96c5d1', '#ac2929', '#9ca32f'][i % 6]}"/>`; }).join('')}</g>`;
  const floodlight = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${line([0, 0], [0, -150], 6, '#555', 'butt')}${poly([[-34, -150], [34, -150], [34, -196], [-34, -196]], '#3a3a44')}${[0, 1, 2].flatMap(r => [0, 1, 2, 3].map(c => `<circle cx="${-24 + c * 16}" cy="${-186 + r * 14}" r="5" fill="#fff6c9"/>`)).join('')}</g>`;
  const pitch = (y = GY - 8) => `${poly([[0, y - 24], [W, y - 32], [W, H], [0, H]], '#7fa334')}${poly([[310, y - 8], [620, y - 14], [650, H], [280, H]], '#d9c58a')}`;

  /* ------------------------------------------------------------------ inside things */
  const window_ = (x, y, w, h, c = '#fff', frame = '#0b0b0b') => `<g>${poly([[x, y], [x + w, y - 3], [x + w, y + h - 3], [x, y + h]], c, `stroke="${frame}" stroke-width="3"`)}<path d="M${x + w / 2} ${y - 2}V${y + h - 2}M${x + 2} ${y + h / 2}H${x + w - 2}" stroke="${frame}" stroke-width="3"/></g>`;
  const table = (x, y, w, c = '#b2763a') => `<g>${poly([[x, y], [x + w, y - 4], [x + w, y + 12], [x, y + 16]], c)}${poly([[x + 10, y + 16], [x + 22, y + 16], [x + 22, y + 74], [x + 10, y + 74]], shade(c, -.25))}${poly([[x + w - 22, y + 12], [x + w - 10, y + 12], [x + w - 10, y + 70], [x + w - 22, y + 70]], shade(c, -.25))}</g>`;
  const book = (x, y, c = C.orange, w = 40, h = 10) => `<g>${poly([[x, y], [x + w, y - 2], [x + w, y + h - 2], [x, y + h]], c)}<path d="M${x + 3} ${y + h * .5}h${w - 6}" stroke="#fff" stroke-width="1.5"/></g>`;
  const phone = (x, y, s = 1, screen = C.sky, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${poly([[-28, -52], [28, -56], [30, 52], [-26, 56]], '#1d1d24')}${poly([[-22, -42], [22, -46], [24, 42], [-20, 46]], screen)}<circle cx="2" cy="50" r="3" fill="#555"/></g>`;
  const chat = (x, y, w, c, mine = false, label = '') => `<g>${poly(mine ? [[x, y], [x + w, y - 3], [x + w - 4, y + 24], [x + 6, y + 26]] : [[x + 4, y], [x + w, y - 3], [x + w, y + 24], [x, y + 26]], c)}${label ? txt(x + w / 2, y + 17, label, 11, mine ? '#fff' : '#0b0b0b', 'middle', 'Inter,sans-serif', 'font-weight="800"') : `<path d="M${x + 10} ${y + 8}h${w - 24}M${x + 10} ${y + 16}h${w - 38}" stroke="${mine ? '#fff' : '#0b0b0b'}" stroke-width="2.4" opacity=".7"/>`}</g>`;
  const cradle = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${poly([[-60, -30], [60, -30], [44, 20], [-44, 20]], '#d9a15b')}${poly([[-54, -30], [54, -30], [50, -22], [-50, -22]], '#fff')}<path d="M-70 36Q0 64 70 36" stroke="#8a5a2b" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-40 20L-50 38M40 20L50 38" stroke="#8a5a2b" stroke-width="5"/></g>`;
  const baby = (x, y, s = 1, blanket = C.sky, ex = 'happy') => `<g transform="translate(${x} ${y}) scale(${s})">${poly([[-52, 6], [52, 0], [60, 56], [-46, 62]], blanket)}<g transform="translate(-56 -92) scale(.84)">${A.head({ skin: 'd', hair: 'tuft', ex })}</g></g>`;
  const microscope = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${poly([[-40, 0], [40, 0], [40, -8], [-40, -8]], '#2f3846')}${poly([[-8, -8], [8, -8], [10, -88], [-6, -88]], '#434f64')}${poly([[-6, -88], [16, -104], [30, -86], [8, -70]], '#647c8d', '')}${poly([[8, -70], [22, -78], [32, -52], [18, -46]], '#2f3846')}${poly([[-36, -4], [-8, -4], [-8, -30], [-36, -34]], '#434f64')}</g>`;
  const flask = (x, y, s = 1, c = C.olive, glow = false) => `<g transform="translate(${x} ${y}) scale(${s})">${glow ? `<circle cx="0" cy="-20" r="34" fill="${c}" opacity=".25"/>` : ''}${poly([[-8, -60], [8, -60], [8, -34], [26, 0], [-26, 0], [-8, -34]], '#e8f3f5', 'stroke="#0b0b0b" stroke-width="2.4" stroke-linejoin="round"')}${poly([[-18, -10], [18, -10], [26, 0], [-26, 0]], c)}</g>`;

  return { W, H, GY, PAL, pal, txt, bubble, base, cloud, sun, spikes, flag, medal, trophy, ball, cricketBall, bat, stumps, gloves, mic, heart, star, sparkle, tear, sign, archWin, hawaMahal, house, court, stand, floodlight, pitch, window_, table, book, phone, chat, cradle, baby, microscope, flask };
})();
