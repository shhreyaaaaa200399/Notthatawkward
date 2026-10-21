/* Not That Awk — vector illustration system.
   Hand-cut, flat, angular shapes in the language of the Figma file: tilted square faces, big white eyes, black
   hair blobs, long limbs, wide trousers. Everything is generated SVG so expressions can change and blink. */
window.ART = (() => {
  'use strict';
  const C = { orange: '#e35e26', purple: '#653781', purpleD: '#592898', yellow: '#ffcb05', olive: '#9ca32f', oliveD: '#59662e', cream: '#ffecba',
    peach: '#fcd3c3', sky: '#96c5d1', maroon: '#ac2929', pink: '#ff7664', slate: '#647c8d', navy: '#434f64', ink: '#0b0b0b', salmon: '#ea8259', brown: '#6b2d10', white: '#ffffff', grey: '#d9d9d9' };
  const SK = { a: '#e35e26', b: '#c9561f', c: '#93391a', d: '#ef8a4e', e: '#7a2e10' };
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const shade = (h, a) => { const c = hex(h).map(v => Math.max(0, Math.min(255, Math.round(a < 0 ? v * (1 + a) : v + (255 - v) * a)))); return '#' + c.map(v => v.toString(16).padStart(2, '0')).join(''); };
  const f = n => Math.round(n * 10) / 10;
  const poly = (pts, fill, extra = '') => `<polygon points="${pts.map(p => p.map(f).join(',')).join(' ')}" fill="${fill}" ${extra}/>`;
  const line = (a, b, w, c, cap = 'round') => `<path d="M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}" stroke="${c}" stroke-width="${w}" stroke-linecap="${cap}" fill="none"/>`;

  /* ------------------------------------------------------------------ expressions */
  // eyes: open wide happy closed side up down  | brow: [leftAngle, rightAngle, lift] | mouth: kind | extra: blush sweat tear
  const EX = {
    neutral:  { eyes: 'open',  brow: [0, 0, 0],      mouth: 'flat' },
    happy:    { eyes: 'open',  brow: [-4, 4, -2],    mouth: 'smile', blush: 1 },
    laugh:    { eyes: 'happy', brow: [-8, 8, -3],    mouth: 'grin', blush: 1 },
    surprised:{ eyes: 'wide',  brow: [-6, 6, -8],    mouth: 'o' },
    worried:  { eyes: 'open',  brow: [14, -14, -3],  mouth: 'wavy', sweat: 1 },
    shy:      { eyes: 'down',  brow: [8, -8, 0],     mouth: 'smirk', blush: 1 },
    embarrassed:{ eyes: 'side',brow: [12, -12, -2],  mouth: 'wavy', blush: 1, sweat: 1 },
    thinking: { eyes: 'up',    brow: [-8, 10, -6],   mouth: 'side' },
    sad:      { eyes: 'down',  brow: [16, -16, -2],  mouth: 'frown', tear: 1 },
    angry:    { eyes: 'open',  brow: [-18, 18, 3],   mouth: 'grit' },
    proud:    { eyes: 'happy', brow: [-5, 5, -4],    mouth: 'grin' },
    determined:{eyes: 'open',  brow: [-12, 12, 2],   mouth: 'smirk' },
    curious:  { eyes: 'side',  brow: [-4, 12, -6],   mouth: 'o2' },
    tired:    { eyes: 'closed',brow: [6, -6, 2],     mouth: 'flat' },
    wow:      { eyes: 'wide',  brow: [-8, 8, -10],   mouth: 'open' },
    awkward:  { eyes: 'side',  brow: [10, -4, -3],   mouth: 'wavy', sweat: 1 },
    teary:    { eyes: 'open',  brow: [10, -10, -2],  mouth: 'smile', tear: 1 },
    cry:      { eyes: 'closed',brow: [16, -16, -2],  mouth: 'frown', tear: 1 },
  };

  /* ------------------------------------------------------------------ head */
  const FACE = [[12, 24], [94, 8], [104, 94], [30, 112]];
  function hairBack(o) {
    const c = o.hc || '#0b0b0b';
    switch (o.hair) {
      case 'long':  return poly([[22, 36], [44, 4], [84, 0], [102, 30], [112, 130], [90, 164], [74, 104], [46, 104], [36, 166], [14, 118]], c);
      case 'bob':   return poly([[20, 36], [44, 4], [84, 0], [104, 30], [106, 98], [90, 106], [34, 104], [16, 96]], c);
      case 'braid': return poly([[24, 36], [44, 4], [84, 0], [100, 30], [100, 72], [24, 72]], c) + [0, 1, 2, 3, 4].map(i => `<ellipse cx="${102 + (i % 2) * 2}" cy="${82 + i * 17}" rx="9" ry="10" fill="${c}"/>`).join('') + poly([[96, 166], [112, 166], [104, 184]], C.orange);
      case 'hijab': return poly([[14, 42], [38, -2], [88, -4], [110, 38], [112, 134], [62, 150], [8, 130]], c);
      case 'dupatta': return poly([[20, 36], [44, 2], [88, 0], [106, 34], [108, 100], [66, 118], [16, 100]], c);
      case 'bun':   return `<circle cx="58" cy="-6" r="17" fill="${c}"/>`;
      default: return '';
    }
  }
  function hairFront(o) {
    const c = o.hc || '#0b0b0b';
    switch (o.hair) {
      case 'short':  return poly([[10, 40], [14, 14], [60, -2], [100, 10], [96, 40], [82, 24], [50, 28], [28, 52]], c);
      case 'spiky':  return poly([[10, 42], [12, 14], [26, 22], [34, -4], [48, 16], [62, -8], [74, 14], [92, 0], [98, 34], [80, 26], [48, 32], [26, 52]], c);
      case 'long': case 'bob': case 'braid': case 'dupatta':
                     return poly([[10, 44], [26, 6], [88, 6], [100, 40], [70, 22], [40, 32]], c);
      case 'curly':  return [[22, 26, 17], [42, 8, 17], [66, 4, 17], [88, 16, 17], [98, 38, 12], [16, 50, 12]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('');
      case 'bun':    return poly([[10, 40], [18, 12], [62, -2], [98, 12], [96, 40], [80, 24], [48, 26]], c);
      case 'hijab':  return poly([[14, 40], [34, 6], [88, 4], [102, 38], [88, 26], [40, 28]], shade(c, -.1));
      case 'turban': return poly([[6, 42], [14, 4], [62, -12], [106, 6], [100, 42], [76, 20], [36, 28]], c) + `<path d="M18 14Q62 -6 98 14M12 28Q60 6 102 28" stroke="${shade(c, .28)}" stroke-width="3" fill="none"/>`;
      case 'cap':    return poly([[10, 40], [16, 8], [64, -6], [102, 8], [98, 38]], c) + poly([[86, 28], [128, 34], [126, 44], [88, 44]], shade(c, -.25));
      case 'balding':return poly([[10, 46], [12, 28], [24, 34], [22, 58]], c) + poly([[98, 42], [100, 26], [90, 30], [88, 52]], c);
      case 'tuft':   return poly([[44, 10], [58, -14], [70, 8]], c);
      case 'beanie': return poly([[8, 40], [14, 6], [62, -8], [102, 6], [98, 36]], c) + poly([[8, 34], [98, 28], [98, 40], [8, 46]], shade(c, -.2));
      case 'headband': return poly([[10, 40], [14, 12], [60, -2], [100, 10], [96, 40], [82, 24], [50, 28], [28, 52]], '#0b0b0b') + poly([[12, 30], [98, 14], [98, 22], [12, 38]], C.yellow);
      default: return '';
    }
  }
  function features(o) {
    const x = { ...(EX[o.ex || 'neutral'] || EX.neutral) }, d = o.look || 0; if (o.mouth) x.mouth = o.mouth; const w = o.blink ? 0 : 1;
    const L = [40, 52], R = [74, 49];
    let eyes = '';
    const eye = (p, side) => {
      const ink = '#0b0b0b';
      switch (x.eyes) {
        case 'happy': return `<path d="M${p[0] - 11} ${p[1] + 4}Q${p[0]} ${p[1] - 14} ${p[0] + 11} ${p[1] + 4}" stroke="${ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
        case 'closed': return `<path d="M${p[0] - 10} ${p[1]}Q${p[0]} ${p[1] + 7} ${p[0] + 10} ${p[1]}" stroke="${ink}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
        default: {
          const r = x.eyes === 'wide' ? 13.5 : 11, pr = x.eyes === 'wide' ? 4 : 5.2;
          let px = d, py = 0;
          if (x.eyes === 'side') px += 5; if (x.eyes === 'up') { py = -4; px -= 2; } if (x.eyes === 'down') py = 4;
          return `<g class="eye"><circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="#fff"/><circle cx="${p[0] + px}" cy="${p[1] + py}" r="${pr}" fill="${ink}"/>${x.eyes === 'down' ? `<path d="M${p[0] - r} ${p[1] - 2}Q${p[0]} ${p[1] - r * .8} ${p[0] + r} ${p[1] - 2}Z" fill="${o.skinHex}"/>` : ''}<rect class="lid" x="${p[0] - r - 1}" y="${p[1] - r - 1}" width="${2 * r + 2}" height="${2 * r + 2}" fill="${o.skinHex}" style="opacity:${o.blink ? 1 : 0}"/></g>`;
        }
      }
    };
    eyes = eye(L) + eye(R);
    const b = x.brow, lift = b[2];
    const brow = `<path d="M${L[0] - 12} ${L[1] - 18 + lift + b[0] * .5}L${L[0] + 11} ${L[1] - 18 + lift - b[0] * .5}" stroke="#0b0b0b" stroke-width="4" stroke-linecap="round"/><path d="M${R[0] - 11} ${R[1] - 18 + lift + b[1] * .5}L${R[0] + 12} ${R[1] - 18 + lift - b[1] * .5}" stroke="#0b0b0b" stroke-width="4" stroke-linecap="round"/>`;
    const nose = poly([[60, 62], [70, 78], [56, 80]], shade(o.skinHex, -.18));
    const mx = 52, my = 94; let mouth = '';
    switch (x.mouth) {
      case 'smile': mouth = `<path d="M${mx - 14} ${my - 4}Q${mx + 6} ${my + 16} ${mx + 26} ${my - 6}" stroke="#0b0b0b" stroke-width="4" fill="none" stroke-linecap="round"/>`; break;
      case 'grin':  mouth = `<path d="M${mx - 16} ${my - 6}Q${mx + 6} ${my + 24} ${mx + 28} ${my - 8}Z" fill="#fff" stroke="#0b0b0b" stroke-width="3.4" stroke-linejoin="round"/><path d="M${mx - 10} ${my + 3}Q${mx + 6} ${my + 10} ${mx + 22} ${my + 1}" stroke="#d94a2c" stroke-width="3" fill="none"/>`; break;
      case 'open':  mouth = `<ellipse cx="${mx + 6}" cy="${my + 2}" rx="12" ry="13" fill="#7a1a10" stroke="#0b0b0b" stroke-width="3"/><ellipse cx="${mx + 6}" cy="${my - 6}" rx="9" ry="3" fill="#fff"/>`; break;
      case 'o':     mouth = `<ellipse cx="${mx + 6}" cy="${my + 2}" rx="7" ry="9" fill="#7a1a10" stroke="#0b0b0b" stroke-width="3"/>`; break;
      case 'o2':    mouth = `<ellipse cx="${mx + 10}" cy="${my}" rx="6" ry="5" fill="#7a1a10" stroke="#0b0b0b" stroke-width="3"/>`; break;
      case 'frown': mouth = `<path d="M${mx - 12} ${my + 8}Q${mx + 6} ${my - 8} ${mx + 24} ${my + 8}" stroke="#0b0b0b" stroke-width="4" fill="none" stroke-linecap="round"/>`; break;
      case 'wavy':  mouth = `<path d="M${mx - 14} ${my + 2}q7 -9 14 0t14 0t14 0" stroke="#0b0b0b" stroke-width="3.6" fill="none" stroke-linecap="round"/>`; break;
      case 'smirk': mouth = `<path d="M${mx - 10} ${my + 2}Q${mx + 10} ${my + 6} ${mx + 26} ${my - 8}" stroke="#0b0b0b" stroke-width="4" fill="none" stroke-linecap="round"/>`; break;
      case 'side':  mouth = `<path d="M${mx - 4} ${my + 2}L${mx + 24} ${my - 4}" stroke="#0b0b0b" stroke-width="4" stroke-linecap="round"/>`; break;
      case 'grit':  mouth = `<path d="M${mx - 14} ${my - 2}L${mx + 26} ${my - 6}L${mx + 22} ${my + 10}L${mx - 12} ${my + 12}Z" fill="#fff" stroke="#0b0b0b" stroke-width="3.2" stroke-linejoin="round"/><path d="M${mx - 2} ${my - 2}v13M${mx + 10} ${my - 4}v13" stroke="#0b0b0b" stroke-width="2"/>`; break;
      default:      mouth = `<path d="M${mx - 10} ${my + 4}L${mx + 22} ${my}" stroke="#0b0b0b" stroke-width="4" stroke-linecap="round"/>`;
    }
    let ex = '';
    if (x.blush) ex += `<ellipse cx="30" cy="82" rx="10" ry="6" fill="${C.yellow}" opacity=".75"/><ellipse cx="86" cy="78" rx="10" ry="6" fill="${C.yellow}" opacity=".75"/>`;
    if (x.sweat) ex += `<path d="M104 26q8 12 0 18-8-6 0-18z" fill="${C.sky}" stroke="#0b0b0b" stroke-width="1.6"/>`;
    if (x.tear) ex += `<path d="M30 70q6 12 0 17-6-5 0-17z" fill="${C.sky}" stroke="#0b0b0b" stroke-width="1.6"/>`;
    return `<g class="ft">${eyes}${brow}${nose}${mouth}${ex}</g>`;
  }
  function head(o = {}) {
    const skin = SK[o.skin || 'a'] || o.skin; o = { ...o, skinHex: skin };
    const hairBackSvg = hairBack(o), hairFrontSvg = hairFront(o);
    const ears = `<circle cx="14" cy="64" r="9" fill="${shade(skin, -.12)}"/><circle cx="102" cy="58" r="9" fill="${shade(skin, -.12)}"/>`;
    const acc = (o.acc || []).map(a => ({
      bindi: `<circle cx="58" cy="30" r="4" fill="${C.maroon}"/>`,
      earring: `<circle cx="16" cy="78" r="5" fill="${C.yellow}"/>`,
      moustache: `<path d="M34 86q14 -8 26 -2q14 -6 28 2q-14 6 -28 2q-12 6 -26 -2z" fill="#0b0b0b"/>`,
      glasses: `<circle cx="40" cy="52" r="15" fill="none" stroke="#0b0b0b" stroke-width="3"/><circle cx="74" cy="49" r="15" fill="none" stroke="#0b0b0b" stroke-width="3"/><path d="M55 51h4" stroke="#0b0b0b" stroke-width="3"/>`,
      headphones: `<path d="M12 56Q10 -2 58 -2T106 50" fill="none" stroke="#0b0b0b" stroke-width="7"/><rect x="2" y="50" width="16" height="30" rx="5" fill="#0b0b0b"/><rect x="98" y="44" width="16" height="30" rx="5" fill="#0b0b0b"/>`,
      beard: `<path d="M26 82Q30 124 62 126T100 82Q86 100 62 100T26 82z" fill="#0b0b0b"/>`,
      tilak: `<path d="M56 20v22" stroke="${C.maroon}" stroke-width="5"/>`,
      sunglasses: poly([[10, 40], [56, 38], [58, 66], [14, 70]], '#0b0b0b') + poly([[62, 36], [104, 32], [102, 62], [64, 64]], '#0b0b0b') + `<path d="M56 46h8" stroke="#0b0b0b" stroke-width="4"/>`,
      visor: poly([[8, 38], [110, 28], [112, 64], [10, 72]], '#4de0f0', 'opacity=".55"') + `<path d="M8 38L110 28" stroke="#0b0b0b" stroke-width="4"/>`,
      tiara: poly([[22, 22], [30, 0], [42, 14], [56, -10], [70, 14], [84, 0], [92, 20], [90, 28], [24, 34]], C.yellow, 'stroke="#0b0b0b" stroke-width="2"') + `<circle cx="56" cy="8" r="4" fill="${C.pink}"/>`,
      crescent: `<path d="M50 14a16 16 0 1 0 14 24a12 12 0 1 1 -14 -24z" fill="${C.yellow}"/>`,
      bolt: poly([[56, 4], [70, 4], [62, 20], [72, 20], [54, 42], [58, 24], [50, 24]], C.yellow, 'stroke="#0b0b0b" stroke-width="1.6"'),
      stethoscope: '', cape: '', mask: '', star: '',
    }[a] || '')).join('');
    const pre = (o.acc || []).includes('mask') ? poly([[12, 38], [60, 32], [100, 24], [104, 70], [60, 76], [18, 80]], o.maskC || '#0b0b0b') : '';
    return `<g class="head"><g class="hb">${hairBackSvg}</g>${ears}${poly(FACE, skin)}${pre}<g class="hf">${hairFrontSvg}</g>${features(o)}${acc}</g>`;
  }

  /* ------------------------------------------------------------------ body */
  // arm poses: [shoulder-relative elbow, hand] for left (viewer's left) and right
  const POSE = {
    stand:   { L: [[-12, 36], [-14, 74]], R: [[12, 36], [14, 74]] },
    wave:    { L: [[-12, 36], [-14, 74]], R: [[30, 14], [34, -34]] },
    point:   { L: [[-12, 36], [-14, 74]], R: [[40, 18], [88, 10]] },
    pointL:  { L: [[-40, 18], [-88, 10]], R: [[12, 36], [14, 74]] },
    hold:    { L: [[-22, 40], [10, 64]], R: [[22, 40], [-10, 64]] },
    cheer:   { L: [[-34, 10], [-38, -40]], R: [[34, 10], [38, -40]] },
    hips:    { L: [[-30, 34], [-8, 64]], R: [[30, 34], [8, 64]] },
    think:   { L: [[-12, 36], [-14, 74]], R: [[24, 30], [-4, -4]] },
    shrug:   { L: [[-30, 26], [-48, 12]], R: [[30, 26], [48, 12]] },
    out:     { L: [[-34, 24], [-70, 36]], R: [[34, 24], [70, 36]] },
    cover:   { L: [[-26, 30], [-4, -6]], R: [[26, 30], [4, -6]] },
    handsup: { L: [[-30, 14], [-34, -30]], R: [[30, 14], [34, -30]] },
    carry:   { L: [[-24, 44], [4, 70]], R: [[24, 44], [-4, 70]] },
    heart:   { L: [[-20, 34], [8, 28]], R: [[20, 34], [-6, 28]] },
    box:     { L: [[-24, 28], [-10, -2]], R: [[26, 26], [18, -6]] },
    kick:    { L: [[-12, 36], [-14, 74]], R: [[28, 30], [40, 56]] },
  };
  function person(o = {}) {
    const sk = SK[o.skin || 'a'] || o.skin, armC = shade(sk, -.38), top = o.top || C.yellow, bot = o.bot || C.oliveD;
    const pose = POSE[o.pose || 'stand'], ts = o.ts || 'tee', bs = o.bs || 'pants', stride = o.walk ? 18 : 0;
    const ht = o.kid ? .78 : 1;
    const SH = { L: [38, 128], R: [86, 126] };
    const arm = (side) => {
      const s = SH[side], [e, h] = pose[side], ex = s[0] + e[0], ey = s[1] + e[1], hx = s[0] + h[0], hy = s[1] + h[1];
      const sleeve = (ts === 'tee' || ts === 'dress' || ts === 'jersey' || ts === 'kurta') ? `<path d="M${s[0]} ${s[1]}L${s[0] + e[0] * .45} ${s[1] + e[1] * .45}" stroke="${top}" stroke-width="15" stroke-linecap="butt"/>` :
        (ts === 'shirt' || ts === 'hoodie' || ts === 'coat') ? `<path d="M${s[0]} ${s[1]}L${ex} ${ey}L${hx} ${hy}" stroke="${top}" stroke-width="13" stroke-linecap="butt" stroke-linejoin="round" fill="none"/>` : '';
      const hand = o.fist ? `<circle cx="${hx}" cy="${hy}" r="9" fill="${sk}"/>` : `<circle cx="${hx}" cy="${hy}" r="6.5" fill="${sk}"/>`;
      return `<path d="M${s[0]} ${s[1]}L${ex} ${ey}L${hx} ${hy}" stroke="${armC}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>${sleeve}${hand}`;
    };
    // legs / lower garment
    let lower = '';
    const sandal = (x, y, c = '#0b0b0b') => poly([[x - 14, y], [x + 16, y - 2], [x + 20, y + 8], [x - 14, y + 9]], c) + `<path d="M${x - 6} ${y}q6 -6 12 -2" stroke="${C.olive}" stroke-width="3" fill="none"/>`;
    const legH = 292 - (o.kid ? 0 : 0);
    if (bs === 'palazzo') {
      lower = poly([[40, 208], [66, 208], [62 - stride, legH], [18 - stride, legH]], bot) + poly([[60, 208], [90, 206], [112 + stride, legH - 2], [66 + stride, legH]], shade(bot, -.14)) + sandal(36 - stride, legH + 2) + sandal(92 + stride, legH + 2);
    } else if (bs === 'shorts') {
      lower = poly([[42, 206], [64, 206], [62, 244], [38, 244]], bot) + poly([[62, 206], [90, 204], [92, 242], [64, 244]], shade(bot, -.14)) + line([50, 244], [48, 292], 10, armC, 'butt') + line([80, 242], [82, 292], 10, armC, 'butt') + sandal(48, 294) + sandal(84, 294);
    } else if (bs === 'dhoti' || bs === 'skirt') {
      lower = poly([[36, 206], [92, 204], [106, legH - 8], [24, legH - 6]], bot) + `<path d="M60 206L56 ${legH - 6}M74 206L78 ${legH - 6}" stroke="${shade(bot, -.2)}" stroke-width="2"/>` + sandal(44, legH + 2) + sandal(86, legH + 2);
    } else if (bs === 'saree') {
      lower = poly([[34, 206], [94, 204], [112, legH + 6], [14, legH + 6]], bot) + `<path d="M34 206L22 ${legH}M52 206L48 ${legH}M70 206L72 ${legH}M88 205L98 ${legH}" stroke="${shade(bot, -.22)}" stroke-width="2.4"/>` + `<path d="M20 ${legH - 20}L112 ${legH - 24}" stroke="${C.yellow}" stroke-width="5"/>`;
    } else { // pants
      lower = poly([[40, 208], [64, 208], [60 - stride, legH], [30 - stride, legH]], bot) + poly([[62, 208], [90, 206], [96 + stride, legH - 2], [66 + stride, legH]], shade(bot, -.14)) + sandal(44 - stride, legH + 2) + sandal(84 + stride, legH + 2);
    }
    if (o.prost) lower += `<path d="M84 ${legH - 70}L86 ${legH - 4}" stroke="#b8c2cc" stroke-width="8" stroke-linecap="butt"/><path d="M84 ${legH - 70}L86 ${legH - 4}" stroke="#6b7684" stroke-width="2.4"/><path d="M78 ${legH - 70}h14" stroke="#434f64" stroke-width="8"/>` + poly([[70, legH], [106, legH - 3], [110, legH + 8], [70, legH + 10]], '#2f3846');
    // upper garment
    let upper = '';
    switch (ts) {
      case 'kurta': upper = poly([[34, 124], [90, 120], [98, 236], [28, 242]], top) + poly([[34, 124], [90, 120], [88, 136], [36, 140]], shade(top, -.1)) + `<path d="M62 122v30" stroke="${shade(top, -.25)}" stroke-width="3"/>`; break;
      case 'dress': upper = poly([[36, 124], [88, 120], [112, 250], [16, 256]], top) + `<path d="M40 124L88 120" stroke="${shade(top, -.2)}" stroke-width="4"/>`; break;
      case 'shirt': upper = poly([[34, 124], [90, 120], [92, 216], [34, 218]], top) + poly([[56, 122], [68, 122], [62, 146]], '#fff') + `<path d="M62 146V216" stroke="${shade(top, -.22)}" stroke-width="2"/>`; break;
      case 'hoodie': upper = poly([[32, 124], [92, 120], [96, 222], [30, 224]], top) + poly([[44, 120], [80, 118], [62, 140]], shade(top, -.18)) + `<path d="M54 140v22M70 140v22" stroke="#fff" stroke-width="2.5"/>`; break;
      case 'jersey': upper = poly([[34, 124], [90, 120], [92, 216], [34, 218]], top) + poly([[34, 150], [92, 148], [92, 160], [34, 162]], o.stripe || '#fff') + (o.num ? `<text x="62" y="204" text-anchor="middle" font-family="Black Han Sans,sans-serif" font-size="34" fill="${o.stripe || '#fff'}">${o.num}</text>` : ''); break;
      case 'coat': upper = poly([[32, 124], [92, 120], [100, 250], [24, 252]], top) + `<path d="M62 124V250" stroke="${shade(top, -.2)}" stroke-width="2.5"/>`; break;
      case 'saree': upper = poly([[36, 124], [90, 120], [92, 206], [36, 210]], top) + poly([[88, 120], [100, 150], [74, 250], [60, 206]], o.pallu || C.yellow) + `<path d="M36 124L84 210" stroke="${o.pallu || C.yellow}" stroke-width="7"/>`; break;
      case 'bare': upper = poly([[36, 124], [88, 120], [90, 206], [36, 210]], shade(sk, -.05)); break;
      default: upper = poly([[34, 124], [90, 120], [92, 216], [34, 218]], top) + poly([[52, 121], [74, 119], [64, 134]], shade(top, -.2)); // tee
    }
    const neck = poly([[50, 104], [74, 100], [76, 126], [48, 128]], shade(sk, -.2));
    const tilt = o.tilt || 0;
    const held = (o.holdR ? `<g transform="translate(${SH.R[0] + pose.R[1][0]} ${SH.R[1] + pose.R[1][1]})">${o.holdR}</g>` : '') + (o.holdL ? `<g transform="translate(${SH.L[0] + pose.L[1][0]} ${SH.L[1] + pose.L[1][1]})">${o.holdL}</g>` : '');
    const bodyBack = o.over ? '' : '';
    const cape = o.cape ? poly([[34, 122], [92, 118], [128, 250], [112, legH - 20], [8, legH - 14], [-10, 240]], o.cape) + poly([[34, 122], [92, 118], [96, 150], [30, 154]], shade(o.cape, -.2)) : '';
    return `<g class="person" ${o.id ? `data-id="${o.id}"` : ''}>${cape}${lower}${arm('L')}${neck}${upper}<g class="bobg"><g class="hd" transform="rotate(${tilt} 60 112)">${head({ ...o, skin: o.skin || 'a' })}</g></g>${arm('R')}${held}${bodyBack}</g>`;
  }
  /* place a person (or anything) at x,y (feet) with a height in px */
  const at = (svg, x, y, h = 300, flip = false, fh = 318) => { const s = h / fh; return `<g transform="translate(${f(x)} ${f(y - h)}) scale(${f(flip ? -s : s)} ${f(s)}) ${flip ? 'translate(-120 0)' : ''}">${svg}</g>`; };

  /* ------------------------------------------------------------------ small cast */
  const CAST = {
    riya:  { skin: 'a', hair: 'long', top: '#ffcb05', ts: 'kurta', bot: '#59662e', bs: 'palazzo', acc: ['bindi'] },
    kabir: { skin: 'c', hair: 'spiky', top: '#9ca32f', ts: 'tee', bot: '#653781', bs: 'pants' },
    meera: { skin: 'b', hair: 'braid', top: '#ff7664', ts: 'tee', bot: '#434f64', bs: 'pants' },
    dev:   { skin: 'a', hair: 'short', top: '#647c8d', ts: 'hoodie', bot: '#59662e', bs: 'pants' },
    zoya:  { skin: 'd', hair: 'hijab', hc: '#653781', top: '#ffecba', ts: 'kurta', bot: '#ffecba', bs: 'palazzo' },
    arjun: { skin: 'b', hair: 'curly', top: '#e35e26', ts: 'tee', bot: '#434f64', bs: 'shorts', kid: 1 },
    tara:  { skin: 'a', hair: 'bun', top: '#653781', ts: 'dress', bot: '#653781', bs: 'skirt', kid: 1 },
    rishi: { skin: 'a', hair: 'short', top: '#ff7664', ts: 'tee', bot: '#434f64', bs: 'pants', kid: 1 },
    mini:  { skin: 'c', hair: 'curly', top: '#ffcb05', ts: 'dress', bot: '#ffcb05', bs: 'skirt', kid: 1 },
    mama:  { skin: 'a', hair: 'long', top: '#653781', ts: 'kurta', bot: '#ffecba', bs: 'palazzo', acc: ['bindi', 'earring'] },
    papa:  { skin: 'c', hair: 'short', top: '#96c5d1', ts: 'shirt', bot: '#434f64', bs: 'pants', acc: ['moustache'] },
    dadi:  { skin: 'b', hair: 'bun', hc: '#d9d9d9', top: '#ffecba', ts: 'saree', bot: '#ffecba', bs: 'saree', pallu: '#ac2929', acc: ['glasses'] },
    doc:   { skin: 'a', hair: 'bob', top: '#ffffff', ts: 'coat', bot: '#59662e', bs: 'pants', acc: ['glasses'] },
    teacher:{ skin: 'c', hair: 'bun', top: '#e35e26', ts: 'kurta', bot: '#434f64', bs: 'pants', acc: ['bindi'] },
  };
  /* the child's own avatar can star in the stories: the first generic kid in a scene is swapped for them */
  const KIDS = new Set(['mini', 'arjun', 'tara', 'rishi', 'riya', 'kabir', 'meera', 'dev']);
  const LOOK = ['skin', 'hair', 'hc', 'top', 'ts', 'bot', 'bs', 'acc', 'cape', 'num', 'stripe', 'maskC'];
  const P = (name, over = {}) => {
    if (api.ME && KIDS.has(name) && !api._meUsed) {
      api._meUsed = true; const o = { ...over }; LOOK.forEach(k => delete o[k]);
      const base = { ...CAST[name] }; LOOK.forEach(k => delete base[k]);
      return { ...base, ...api.ME, ...o };
    }
    return { ...CAST[name], ...over };
  };

  /* standalone head, for splash / avatars: svg string */
  const headSVG = (o, w = 140) => `<svg viewBox="-24 -34 168 182" width="${w}" style="overflow:visible">${head(o)}</svg>`;
  const api = { C, SK, EX, shade, poly, line, head, headSVG, features, person, at, CAST, P, f, hex, ME: null, _meUsed: false };
  return api;
})();
