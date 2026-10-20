/* Not That Awk — story scenes. Each scene is a function (ctx) => svg (932 x 430). ctx = { tier:'y'|'m'|'o', tone:0|1|2 }.
   tone 0 = "Not That Awk" (comfortable): more direct, diagram-style sex-ed visuals.  tone 2 = "Very Awk": gentler, more metaphor. */
window.SCN = (() => {
  'use strict';
  const A = window.ART, PR = window.PR, C = A.C, { poly, line, shade } = A;
  const { W, H, GY, base, txt, bubble, gloves, bat, stumps, cricketBall, ball, flag, medal, trophy, star, sparkle, heart, tear, mic, sign, table, book, phone, chat, cradle, baby, microscope, flask: flaskP, house, court, stand, floodlight, pitch, window_, hawaMahal } = PR;
  const ppl = (name, x, h, over = {}, flip = false, y = GY) => A.at(A.person(A.P(name, over)), x, y, h, flip);
  const raw = (o, x, h, flip = false, y = GY) => A.at(A.person(o), x, y, h, flip);
  const lying = (o, x, y, h, rot = -90) => { const s = h / 318; return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(-60 -318)">${A.person(o)}</g>`; };
  const mountain = (x, y, w, h, c = '#7b8ea3', snow = '#fff') => `<g>${poly([[x - w / 2, y], [x, y - h], [x + w / 2, y]], c)}${poly([[x - w * .13, y - h * .72], [x, y - h], [x + w * .13, y - h * .72], [x + w * .05, y - h * .62], [x - w * .03, y - h * .7]], snow)}</g>`;
  const bunting = (x1, x2, y, cols) => { let g = `<path d="M${x1} ${y}Q${(x1 + x2) / 2} ${y + 26} ${x2} ${y}" stroke="#555" stroke-width="2" fill="none"/>`; const n = 9; for (let i = 0; i < n; i++) { const t = (i + .5) / n, x = x1 + (x2 - x1) * t, yy = y + 26 * 2 * t * (1 - t) * 1; g += poly([[x - 9, yy], [x + 9, yy], [x, yy + 20]], cols[i % cols.length]); } return g; };
  const ladder = (x, y, h, tilt = 0) => `<g transform="translate(${x} ${y}) rotate(${tilt})">${line([-12, 0], [-12, -h], 5, '#8a5a2b', 'butt')}${line([12, 0], [12, -h], 5, '#8a5a2b', 'butt')}${Array.from({ length: Math.floor(h / 26) }, (_, i) => line([-12, -16 - i * 26], [12, -16 - i * 26], 4, '#8a5a2b', 'butt')).join('')}</g>`;
  const bucket = (x, y, c) => `<g>${poly([[x - 16, y - 24], [x + 16, y - 24], [x + 12, y], [x - 12, y]], '#9aa3b2')}${poly([[x - 14, y - 24], [x + 14, y - 24], [x + 10, y - 17], [x - 10, y - 17]], c)}</g>`;
  const brush = (x, y, c, rot = -30) => `<g transform="translate(${x} ${y}) rotate(${rot})">${line([0, 0], [0, -44], 5, '#8a5a2b', 'butt')}${poly([[-7, -44], [7, -44], [8, -60], [-8, -60]], c)}</g>`;
  const net = (x, y, w, h) => `<g>${line([x, y], [x, y - h - 20], 6, '#555', 'butt')}${line([x + w, y], [x + w, y - h - 20], 6, '#555', 'butt')}${Array.from({ length: 12 }, (_, i) => line([x, y - h + i * 8], [x + w, y - h + i * 8], 1.4, '#fff')).join('')}${Array.from({ length: Math.floor(w / 14) }, (_, i) => line([x + i * 14, y - h], [x + i * 14, y - h + 90], 1.4, '#fff')).join('')}<path d="M${x} ${y - h}H${x + w}" stroke="#fff" stroke-width="6"/></g>`;
  const ring = (x, y, w, c = C.maroon) => `<g>${poly([[x, y - 6], [x + w, y - 12], [x + w, y + 20], [x, y + 26]], '#2f3846')}${[0, 1, 2].map(i => `<path d="M${x + 6} ${y - 30 - i * 24}L${x + w - 6} ${y - 36 - i * 24}" stroke="${[c, '#fff', C.maroon][i]}" stroke-width="5"/>`).join('')}${line([x + 6, y - 6], [x + 6, y - 100], 8, '#434f64', 'butt')}${line([x + w - 6, y - 12], [x + w - 6, y - 106], 8, '#434f64', 'butt')}</g>`;
  const punchBag = (x, y, s = 1, c = C.maroon) => `<g transform="translate(${x} ${y}) scale(${s})">${line([0, -60], [0, 0], 4, '#555', 'butt')}${poly([[-22, 0], [22, 0], [20, 110], [-20, 110]], c)}${poly([[-22, 0], [-8, 0], [-8, 110], [-20, 110]], shade(c, -.2))}${poly([[-22, 40], [22, 40], [22, 50], [-22, 50]], shade(c, .2))}</g>`;
  const podium = (x, y) => `<g>${poly([[x - 140, y], [x - 50, y], [x - 50, y - 60], [x - 140, y - 56]], '#d9d9d9')}${poly([[x - 50, y], [x + 50, y], [x + 50, y - 100], [x - 50, y - 100]], '#ffffff')}${poly([[x + 50, y], [x + 140, y], [x + 140, y - 46], [x + 50, y - 50]], '#e6c9a0')}${txt(x, y - 40, '1', 40, C.orange)}${txt(x - 95, y - 14, '2', 26, '#888')}${txt(x + 95, y - 12, '3', 26, '#b07b3a')}</g>`;
  const beam = (x, y, w) => `<g>${poly([[x, y - 70], [x + w, y - 74], [x + w, y - 56], [x, y - 52]], '#d9a15b')}${line([x + 30, y - 52], [x + 22, y], 7, '#9aa3b2', 'butt')}${line([x + w - 30, y - 56], [x + w - 22, y], 7, '#9aa3b2', 'butt')}</g>`;
  const goal = (x, y, w, h) => `<g><path d="M${x} ${y}V${y - h}H${x + w}V${y}" stroke="#fff" stroke-width="6" fill="none"/>${Array.from({ length: 10 }, (_, i) => line([x + i * w / 9, y - h], [x + i * w / 9 + 10, y - h + 40], 1.4, '#fff')).join('')}</g>`;
  const redCard = (x, y, s = 1, rot = -8) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${poly([[-18, -26], [18, -26], [18, 26], [-18, 26]], '#d41e1e', 'stroke="#fff" stroke-width="3"')}</g>`;
  const tv = (x, y, s = 1, screen = C.sky) => `<g transform="translate(${x} ${y}) scale(${s})">${poly([[-80, -100], [80, -104], [82, 0], [-78, 4]], '#2f3846')}${poly([[-70, -90], [70, -94], [72, -10], [-68, -6]], screen)}${poly([[-30, 4], [30, 2], [40, 18], [-40, 20]], '#2f3846')}</g>`;
  const sunrise = (x, y, r) => `<g>${A.poly(Array.from({ length: 20 }, (_, i) => { const a = Math.PI + i / 19 * Math.PI; return [x + Math.cos(a) * r * 1.5, y + Math.sin(a) * r * 1.5]; }).concat([[x + r * 1.5, y], [x - r * 1.5, y]]), '#ffcb05', 'opacity=".35"')}<path d="M${x - r} ${y}a${r} ${r} 0 0 1 ${2 * r} 0Z" fill="#ffcb05"/></g>`;
  const stars = (n, seed = 3) => Array.from({ length: n }, (_, i) => { const k = (i * 137 + seed * 53) % 1000; return PR.sparkle((k * 7) % W, 20 + (k * 3) % 180, 6 + (k % 5), '#fff3b0'); }).join('');
  const cap = (x, y, c) => poly([[x - 36, y], [x + 36, y - 8], [x + 40, y + 8], [x - 30, y + 14]], c);

  const S = {};

  /* ================================================================== PINK — Jaipur welcome + the 1918 pink-for-boys rule */
  const PINK = '#ee8f86';
  S.pink1 = c => base(c) + PR.hawaMahal(690, GY - 6, 1.05, PINK) + PR.house(30, GY - 4, 120, 80, shade(PINK, .1), true) +
    ppl('papa', 360, 268, { hair: 'turban', hc: '#e35e26', top: '#ffcb05', ts: 'kurta', bot: '#ffecba', bs: 'palazzo', pose: 'point', ex: 'proud', acc: ['moustache'], tilt: -3 }) +
    ppl('mini', 520, 190, { ex: 'wow', pose: 'cheer' }) + ppl('arjun', 200, 190, { ex: 'curious', pose: 'wave' }, true);
  S.pink2 = c => base(c) + [0, 1, 2].map(i => PR.house(60 + i * 270, GY - 4, 250, 190 - i * 14, PINK, true)).join('') +
    bunting(30, 900, 40, [C.yellow, '#fff', C.olive, C.sky, PINK]) + ladder(250, GY - 4, 190, 4) + ladder(640, GY - 4, 160, -4) +
    ppl('kabir', 270, 210, { hair: 'turban', hc: '#e35e26', pose: 'handsup', ex: 'happy', holdR: brush(0, 0, '#c9453e', 10), top: '#fff', ts: 'tee' }) +
    ppl('dev', 640, 200, { hair: 'turban', hc: '#434f64', pose: 'cheer', ex: 'laugh', top: '#fff', ts: 'tee', holdL: brush(0, 0, '#c9453e', -10) }) +
    bucket(420, GY - 4, '#c9453e') + ppl('tara', 520, 170, { ex: 'wow', pose: 'point' }) + ppl('rishi', 760, 170, { ex: 'happy', pose: 'wave' }, true);
  S.pink3 = c => base(c, { kind: 'indoor', wall: '#f5e6c8', floor: '#b88a54' }) +
    `<g>${poly([[40, 70], [900, 62], [900, 76], [40, 84]], '#8a5a2b')}${poly([[40, 190], [900, 182], [900, 196], [40, 204]], '#8a5a2b')}</g>` +
    [0, 1, 2, 3, 4, 5, 6, 7].map(i => `<g transform="translate(${90 + i * 100} 190)">${poly([[-26, -34], [26, -36], [20, 0], [-20, 2]], i % 2 ? '#9ac4e0' : '#f5a3b5')}</g>`).join('') +
    PR.sign(840, 150, ['BABY', 'CLOTHES'], 130, 70, '#fff') +
    PR.table(560, GY - 70, 300) + ppl('papa', 700, 270, { hair: 'balding', hc: '#434f64', top: '#fff', ts: 'shirt', bot: '#434f64', pose: 'hold', ex: 'proud', acc: ['moustache'] }) +
    ppl('mama', 330, 250, { top: '#ea8259', ts: 'dress', bs: 'skirt', pose: 'hold', ex: 'curious', holdL: `<g transform="translate(0 -30) scale(.7)">${PR.baby(0, 0, 1, '#f5a3b5')}</g>` }) +
    PR.bubble(430, 100, 250, 58, ['Pink is for boys,', 'blue is for girls!'], 'br', '#fff', '#0b0b0b', 16);
  S.pink4 = c => base(c) + bunting(20, 910, 30, ['#f5a3b5', '#9ac4e0', C.yellow, C.olive, C.orange, C.purple]) +
    ['riya', 'kabir', 'meera', 'arjun', 'tara', 'dev'].map((n, i) => ppl(n, 120 + i * 140, i % 2 ? 250 : 270, { pose: ['cheer', 'wave', 'hips', 'handsup', 'out', 'heart'][i], ex: ['laugh', 'happy', 'proud', 'laugh', 'happy', 'wow'][i], top: ['#f5a3b5', '#9ac4e0', '#ffcb05', '#ff7664', '#9ca32f', '#f5a3b5'][i], ts: ['kurta', 'tee', 'tee', 'tee', 'dress', 'hoodie'][i] }, i % 2)).join('');

  /* ================================================================== MARY KOM */
  const MK = { hair: 'bun', hc: '#0b0b0b', skin: 'b', top: '#ac2929', ts: 'jersey', bot: '#2f3846', bs: 'pants', stripe: '#fff' };
  S.mk1 = c => base(c, { kind: 'outdoor' }) + poly([[0, GY - 70], [200, GY - 160], [420, GY - 90], [640, GY - 170], [W, GY - 80], [W, H], [0, H]], shade(PR.pal(c).ground, -.1)) +
    [0, 1, 2, 3, 4].map(i => `<g transform="translate(${60 + i * 190} ${GY - 40})">${poly([[-60, 0], [60, -6], [50, 26], [-50, 30]], shade(PR.pal(c).ground, .15))}${[-30, 0, 30].map(x => poly([[x - 6, 0], [x, -26], [x + 6, 0]], C.oliveD)).join('')}</g>`).join('') +
    ppl('mini', 480, 200, { hair: 'braid', top: '#ffcb05', ts: 'dress', bs: 'skirt', pose: 'carry', ex: 'happy', holdR: `<g transform="translate(10 4)">${poly([[-26, 0], [26, 0], [20, 34], [-20, 34]], '#b2763a')}</g>` }) +
    ppl('mama', 640, 270, { top: '#9ca32f', ts: 'saree', bs: 'saree', bot: '#9ca32f', pallu: '#ffcb05', pose: 'stand', ex: 'happy', tilt: 4 }) + ppl('papa', 780, 280, { top: '#fff', ts: 'shirt', bot: '#434f64', pose: 'hips', ex: 'neutral' });
  S.mk2 = c => base(c, { kind: 'indoor', wall: PR.pal(c).sky, floor: '#8a6b4a' }) + PR.window_(60, 160, 120, 100, PR.pal(c).sky2) + punchBag(780, 150, 1.5) +
    ppl('papa', 560, 290, { top: '#434f64', ts: 'tee', bot: '#2f3846', pose: 'hold', ex: 'proud', acc: ['moustache'] }, true) +
    raw({ ...MK, pose: 'box', ex: 'determined', fist: 1, holdL: gloves(0, -6, .7), holdR: gloves(0, -6, .7) }, 360, 270) +
    ppl('arjun', 150, 190, { pose: 'box', ex: 'happy' }) + ppl('rishi', 230, 200, { pose: 'cheer', ex: 'wow' });
  S.mk3 = c => base(c) + ring(40, GY, 200) +
    ppl('dadi', 720, 270, { hair: 'bun', hc: '#d9d9d9', top: '#ffecba', ts: 'saree', bs: 'saree', pallu: '#ac2929', pose: 'shrug', ex: 'worried', acc: ['glasses'] }, true) +
    PR.bubble(520, 70, 270, 56, ['“Boxing is for boys!”'], 'br', '#fff', '#0b0b0b', 17) +
    raw({ ...MK, pose: 'box', ex: 'determined', fist: 1, holdL: gloves(0, -6, .7), holdR: gloves(0, -6, .7) }, 400, 280) + ppl('papa', 220, 270, { top: '#fff', ts: 'shirt', bot: '#434f64', pose: 'think', ex: 'thinking', acc: ['moustache'] });
  S.mk4 = c => base(c) + podium(480, GY) + flag(700, GY - 6, 1.3) + raw({ ...MK, top: '#2f3846', stripe: '#ffcb05', pose: 'cheer', ex: 'proud', holdR: `<g transform="translate(-30 20)">${PR.medal(0, 0, '#cd7f32', .8)}</g>` }, 480, 260, false, GY - 100) +
    ppl('arjun', 200, 190, { pose: 'cheer', ex: 'laugh' }) + ppl('mini', 290, 180, { pose: 'handsup', ex: 'laugh' }, true) + ppl('tara', 790, 180, { pose: 'cheer', ex: 'happy' }) + PR.star(160, 90, 14) + PR.star(840, 120, 12) + PR.sparkle(300, 70, 12);

  /* ================================================================== TEARS — Sachin 2013, Rohit and Virat 2024 */
  const IND = { top: '#2d6ac7', ts: 'jersey', stripe: '#ffcb05', bot: '#2d6ac7', bs: 'pants' };
  S.tears1 = c => base(c) + PR.stand('#3b4a6b', '#2d3a58', 250) + PR.floodlight(120, 270, 1.1) + PR.floodlight(820, 270, 1.1) + PR.pitch() +
    raw({ ...A.P('papa'), ...IND, num: '10', hair: 'short', acc: [], pose: 'cheer', ex: 'teary', holdR: bat(0, 0, .9, 20) }, 466, 300) + stumps(700, GY - 20, 1.2) + cricketBall(300, GY - 18, 9);
  S.tears2 = c => base(c) + PR.stand('#3b4a6b', '#2d3a58', 250) + PR.floodlight(150, 270, 1) + PR.pitch() + mic2() +
    raw({ ...A.P('papa'), top: '#fff', ts: 'shirt', bot: '#fff', hair: 'short', acc: [], pose: 'cover', ex: 'teary', num: '' }, 410, 300) + PR.bubble(560, 90, 300, 60, ['“It’s difficult to talk,', 'but I will manage.”'], 'bl', '#fff', '#0b0b0b', 15);
  function mic2() { return PR.mic(520, GY - 4, 1.4); }
  S.tears3 = c => base(c) + PR.stand('#3b4a6b', '#2d3a58', 240) + PR.pitch() + lying({ ...A.P('papa'), ...IND, num: '45', hair: 'short', acc: [], pose: 'cover', ex: 'cry' }, 440, GY - 40, 250, 90) +
    raw({ ...A.P('kabir'), ...IND, num: '7', pose: 'cheer', ex: 'laugh' }, 220, 250) + raw({ ...A.P('dev'), ...IND, num: '3', pose: 'cheer', ex: 'laugh' }, 690, 250) + raw({ ...A.P('arjun'), ...IND, num: '9', pose: 'handsup', ex: 'wow', kid: 0 }, 820, 230) + PR.sparkle(120, 80, 12) + PR.sparkle(850, 60, 10);
  S.tears4 = c => base(c) + PR.pitch() + flag(160, GY - 6, 1.2) + flag(780, GY - 6, 1.2) + PR.trophy(466, GY - 4, 1.7) +
    raw({ ...A.P('papa'), ...IND, num: '45', hair: 'short', acc: [], pose: 'out', ex: 'cry', tilt: 6 }, 390, 290) + raw({ ...A.P('kabir'), ...IND, num: '18', hair: 'short', acc: ['beard'], pose: 'out', ex: 'teary', tilt: -6 }, 540, 290, true) + PR.heart(466, 110, 1.2) + PR.sparkle(300, 100, 12) + PR.sparkle(650, 90, 12);

  /* ================================================================== ARUNIMA SINHA */
  const ARU = { skin: 'b', hair: 'bun', hc: '#0b0b0b', top: '#e35e26', ts: 'tee', bot: '#2f3846', bs: 'pants' };
  S.aru1 = c => base(c) + net(300, GY - 4, 320, 140) + raw({ ...ARU, top: '#ffcb05', bot: '#2f3846', bs: 'shorts', pose: 'cheer', ex: 'laugh' }, 466, 280, false, GY - 90) + ball(520, 150, 20) + ppl('meera', 760, 250, { pose: 'wave', ex: 'happy' }, true) + ppl('dev', 140, 240, { pose: 'cheer', ex: 'happy' });
  S.aru2 = c => base(c, { kind: 'indoor', wall: '#e9f2f2', floor: '#c9d6d6' }) + PR.window_(640, 90, 180, 170, PR.pal(c).sky2) + `<g>${poly([[140, GY - 90], [520, GY - 96], [520, GY - 70], [140, GY - 64]], '#fff', 'stroke="#9aa3b2" stroke-width="3"')}${poly([[130, GY - 140], [170, GY - 142], [170, GY - 40], [130, GY - 38]], '#9aa3b2')}${poly([[500, GY - 110], [530, GY - 112], [530, GY - 40], [500, GY - 38]], '#9aa3b2')}</g>` +
    raw({ ...ARU, ts: 'shirt', top: '#fff', pose: 'think', ex: 'thinking' }, 340, 240, false, GY - 40) + PR.table(600, GY - 60, 160) + flask(690, GY - 64, 1.1, C.pink) + ppl('mama', 800, 260, { pose: 'wave', ex: 'happy', top: '#9ca32f' }, true);
  function flask(x, y, s, c) { return PR.flask(x, y, s, c); }
  S.aru3 = c => base(c, { ground: '#e8f1f5' }) + mountain(200, GY - 6, 520, 280, '#8da3bb') + mountain(660, GY - 6, 640, 330, '#7b8ea3') + poly([[0, GY + 4], [W, GY - 8], [W, H], [0, H]], '#f4f9fb') +
    raw({ ...A.P('teacher'), top: '#e35e26', ts: 'hoodie', bot: '#434f64', hair: 'beanie', hc: '#e35e26', acc: [], pose: 'point', ex: 'proud' }, 330, 280) + raw({ ...ARU, prost: 1, top: '#ac2929', ts: 'hoodie', hair: 'beanie', hc: '#ffcb05', pose: 'out', ex: 'determined' }, 520, 280, true) + line([420, GY - 150], [600, GY - 140], 3, '#434f64');
  S.aru4 = c => base(c, { ground: '#f4f9fb' }) + sunrise(466, GY - 80, 90) + mountain(466, GY, 760, 160 + 90, '#7b8ea3') + mountain(120, GY, 340, 160, '#8da3bb') + mountain(830, GY, 340, 180, '#8da3bb') +
    flag(500, GY - 242, 1.1) + raw({ ...ARU, prost: 1, top: '#ac2929', ts: 'hoodie', hair: 'beanie', hc: '#ffcb05', pose: 'cheer', ex: 'laugh' }, 456, 120, false, GY - 236) + PR.sparkle(300, 120, 12) + PR.sparkle(700, 100, 14) + PR.star(840, 70, 12);

  Object.defineProperty(S, '_h', { value: { ppl, raw, lying, mountain, bunting, ladder, bucket, brush, net, ring, punchBag, podium, beam, goal, redCard, tv, sunrise, stars, cap, IND }, enumerable: false });
  return S;
})();
