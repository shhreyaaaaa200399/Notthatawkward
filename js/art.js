/* Not That Awk — vector illustration system.
   Everything here is generated SVG in the visual language of the Figma file: flat hand-cut shapes, angular
   faces, black hair, wide trousers, no outlines. Because it is vector it stays crisp at any size. */
window.ART = (() => {
  const C = { orange:'#e35e26', purple:'#653781', purpleD:'#592898', yellow:'#ffcb05', olive:'#9ca32f', oliveD:'#59662e', cream:'#ffecba',
    peach:'#fcd3c3', sky:'#96c5d1', maroon:'#ac2929', pink:'#ff7664', slate:'#647c8d', navy:'#434f64', ink:'#0b0b0b', salmon:'#ea8259', brown:'#6b2d10', white:'#ffffff' };
  const SK = { a:'#e35e26', b:'#c9561f', c:'#93391a', d:'#ef8a4e', e:'#7a2e10' };
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const shade = (h, a) => { const c = hex(h).map(v => Math.max(0, Math.min(255, Math.round(a < 0 ? v * (1 + a) : v + (255 - v) * a)))); return '#' + c.map(v => v.toString(16).padStart(2, '0')).join(''); };
  const f = n => (+n).toFixed(1);
  const poly = (pts, fill, extra = '') => `<polygon points="${pts.map(p => p.map(f).join(',')).join(' ')}" fill="${fill}" ${extra}/>`;

  /* ---------------------------------------------------------------- roster (recurring cast so stories feel connected) */
  const CAST = {
    riya:   { skin:'a', hair:'long',   top:'#ffcb05', ts:'kurta', bot:'#59662e', bs:'palazzo', age:'teen', acc:['bindi'] },
    kabir:  { skin:'c', hair:'spiky',  top:'#9ca32f', ts:'tee',   bot:'#653781', bs:'pants',   age:'teen' },
    meera:  { skin:'b', hair:'braid',  top:'#ff7664', ts:'tee',   bot:'#434f64', bs:'pants',   age:'teen' },
    dev:    { skin:'a', hair:'short',  top:'#647c8d', ts:'hoodie',bot:'#59662e', bs:'pants',   age:'teen' },
    zoya:   { skin:'d', hair:'hijab',  hc:'#653781', top:'#ffecba', ts:'kurta', bot:'#ffecba', bs:'pants', age:'teen' },
    arjun:  { skin:'b', hair:'curly',  top:'#e35e26', ts:'tee',   bot:'#434f64', bs:'shorts',  age:'kid' },
    tara:   { skin:'a', hair:'bun',    top:'#653781', ts:'dress', bot:'#653781', bs:'pants',   age:'kid' },
    rishi:  { skin:'a', hair:'short',  top:'#9ca32f', ts:'tee',   bot:'#434f64', bs:'pants',   age:'kid' },
    mini:   { skin:'c', hair:'curly',  top:'#ffcb05', ts:'dress', bot:'#ffcb05', bs:'pants',   age:'kid' },
    sam:    { skin:'d', hair:'short',  top:'#ff7664', ts:'tee',   bot:'#434f64', bs:'shorts',  age:'kid' },
    mama:   { skin:'a', hair:'long',   top:'#653781', ts:'kurta', bot:'#ffecba', bs:'palazzo', age:'adult', acc:['bindi','earring'] },
    papa:   { skin:'c', hair:'short',  top:'#96c5d1', ts:'shirt', bot:'#434f64', bs:'pants',   age:'adult', acc:['moustache'] },
    dadi:   { skin:'b', hair:'bun',    hc:'#d9d9d9', top:'#ffecba', ts:'dress', bot:'#ffecba', bs:'pants', age:'adult', acc:['glasses'] },
    doc:    { skin:'a', hair:'bob',    top:'#ffffff', ts:'shirt', bot:'#59662e', bs:'pants',   age:'adult', acc:['glasses'] },
    teacher:{ skin:'c', hair:'bun',    top:'#e35e26', ts:'kurta', bot:'#434f64', bs:'pants',   age:'adult', acc:['bindi'] },
    didi:   { skin:'a', hair:'long',   top:'#434f64', ts:'hoodie',bot:'#647c8d', bs:'pants',   age:'teen', acc:['headphones'] },
    stranger:{ skin:'c', hair:'cap',   hc:'#434f64', top:'#0b0b0b', ts:'hoodie', bot:'#0b0b0b', bs:'pants', age:'adult' },
  };

  /* ---------------------------------------------------------------- people */
  function hairBack(o, id) {
    const c = o.hc || '#0b0b0b';
    switch (o.hair) {
      case 'long':  return poly([[24,34],[44,6],[82,4],[100,30],[106,122],[86,156],[72,100],[48,100],[34,156],[16,112]], c);
      case 'bob':   return poly([[24,34],[44,6],[82,4],[100,30],[102,90],[88,96],[36,94],[20,88]], c);
      case 'braid': return poly([[26,34],[44,6],[82,4],[98,30],[98,70],[26,70]], c) + [0,1,2,3,4].map(i => `<ellipse cx="${100 + (i % 2)}" cy="${78 + i * 17}" rx="9" ry="10" fill="${c}"/>`).join('') + `<polygon points="94,160 108,160 101,176" fill="${C.orange}"/>`;
      case 'hijab': return poly([[18,40],[38,2],[84,0],[106,36],[108,126],[62,140],[12,124]], c);
      default: return '';
    }
  }
  function hairFront(o) {
    const c = o.hc || '#0b0b0b';
    switch (o.hair) {
      case 'short':  return poly([[30,36],[36,14],[70,4],[94,18],[90,42],[78,28],[50,30],[34,48]], c);
      case 'spiky':  return poly([[30,40],[32,16],[44,22],[50,2],[60,18],[72,0],[78,18],[94,10],[90,42],[76,30],[48,34]], c);
      case 'long': case 'bob': case 'braid': return poly([[30,42],[44,12],[84,12],[92,44],[68,26],[46,34]], c);
      case 'curly':  return [[34,28,15],[50,12,15],[70,9,15],[88,22,15],[93,42,11],[29,48,11]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('');
      case 'bun':    return poly([[30,38],[36,14],[70,6],[92,18],[90,42],[76,28],[48,30]], c) + `<circle cx="62" cy="4" r="14" fill="${c}"/>`;
      case 'hijab':  return poly([[30,34],[44,10],[82,10],[92,34],[84,26],[46,28]], shade(c, -.12));
      case 'turban': return poly([[26,38],[34,8],[70,-4],[98,12],[94,42],[72,22],[44,28]], c) + `<path d="M38 16Q62 4 88 16M34 28Q62 14 92 28" stroke="${shade(c,.25)}" stroke-width="2" fill="none"/>`;
      case 'cap':    return poly([[28,38],[34,10],[70,0],[96,14],[92,38],[28,38]], c) + poly([[82,30],[118,34],[116,42],[84,42]], shade(c, -.25));
      case 'balding': return poly([[30,44],[34,28],[44,34],[38,52]], '#d9d9d9') + poly([[88,40],[92,26],[84,30],[82,50]], '#d9d9d9');
      default: return '';
    }
  }
  function features(o, skin) {
    const nose = shade(skin, -.22), m = o.mood, lk = o.look || 0;
    const eyeY = m === 'shy' ? 49 : 47;
    const eye = (x, y) => `<circle cx="${x}" cy="${y}" r="6.6" fill="#fff"/><circle cx="${x + 1.4 + lk * 2.2}" cy="${y + (m === 'sad' ? 1.6 : .6)}" r="3.1" fill="#0b0b0b"/>`;
    const brows = {
      smile:'M44 37L56 35M68 34L82 36', big:'M44 36L56 33M68 32L82 35', worry:'M43 39L57 32M68 31L82 38', sad:'M43 39L57 33M68 32L82 39',
      angry:'M43 32L57 38M68 37L82 31', wow:'M44 31L57 30M68 28L82 29', shy:'M44 38L56 37M68 36L82 37', proud:'M44 34L56 31M68 30L82 33', neutral:'M44 37L56 36M68 35L82 36', think:'M44 37L56 36M68 28L82 30'
    }[m] || 'M44 37L56 36M68 35L82 36';
    const mouth = {
      smile:`<path d="M50 70Q62 82 77 67Z" fill="#fff" stroke="#3a1608" stroke-width="1.6"/>`,
      big:`<path d="M47 68Q62 90 80 64Z" fill="#fff" stroke="#3a1608" stroke-width="1.6"/><path d="M52 76Q63 82 74 74" stroke="#c0452a" stroke-width="2" fill="none"/>`,
      worry:`<path d="M52 76Q57 70 62 75T74 74" stroke="#3a1608" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
      sad:`<path d="M52 79Q63 68 76 78" stroke="#3a1608" stroke-width="2.8" fill="none" stroke-linecap="round"/>`,
      angry:`<path d="M52 77L76 73" stroke="#3a1608" stroke-width="3" stroke-linecap="round"/>`,
      wow:`<ellipse cx="64" cy="75" rx="6" ry="8" fill="#3a1608"/>`,
      shy:`<path d="M54 74Q63 78 72 72" stroke="#3a1608" stroke-width="2.4" fill="none" stroke-linecap="round"/><ellipse cx="45" cy="62" rx="7" ry="4.5" fill="#ff7664" opacity=".6"/><ellipse cx="80" cy="60" rx="7" ry="4.5" fill="#ff7664" opacity=".6"/>`,
      proud:`<path d="M51 70Q63 80 77 68" stroke="#3a1608" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
      neutral:`<path d="M54 74L74 73" stroke="#3a1608" stroke-width="2.6" stroke-linecap="round"/>`,
      think:`<path d="M54 75Q66 74 76 68" stroke="#3a1608" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    }[m] || '';
    return `${eye(51, eyeY)}${eye(74, eyeY - 2)}<path d="${brows}" stroke="#0b0b0b" stroke-width="2.6" stroke-linecap="round" fill="none"/>
      <polygon points="60,56 70,54 66,64" fill="${nose}"/>${mouth}`;
  }
  function accessories(o, skin) {
    return (o.acc || []).map(a => ({
      glasses: `<g fill="none" stroke="#0b0b0b" stroke-width="2.4"><circle cx="51" cy="47" r="10"/><circle cx="74" cy="45" r="10"/><path d="M61 46L64 45"/></g>`,
      moustache: `<polygon points="52,64 64,60 78,62 72,68 62,65 56,69" fill="#0b0b0b"/>`,
      bindi: `<circle cx="63" cy="33" r="2.8" fill="#ac2929"/>`,
      earring: `<circle cx="89" cy="64" r="4" fill="#ffcb05"/>`,
      headphones: `<path d="M26 54Q24 6 62 4T98 50" stroke="#0b0b0b" stroke-width="6" fill="none"/><ellipse cx="26" cy="56" rx="8" ry="13" fill="#0b0b0b"/><ellipse cx="98" cy="52" rx="8" ry="13" fill="#0b0b0b"/>`,
      beard: `<polygon points="38,62 50,76 62,92 78,84 90,62 82,74 62,80 46,72" fill="#0b0b0b" opacity=".92"/>`,
    }[a] || '')).join('');
  }
  function head(o, skin, j) {
    const J = (i) => ((j * 7 + i * 13) % 5) - 2;
    const pts = [[33 + J(0), 24 + J(1)], [84 + J(2), 18 + J(3)], [88 + J(4), 66 + J(1)], [62 + J(3), 92], [36 + J(2), 68 + J(4)]];
    const dk = shade(skin, -.12);
    return `${hairBack(o)}<circle cx="31" cy="54" r="6.5" fill="${dk}"/><circle cx="89" cy="52" r="6.5" fill="${dk}"/>
      <polygon points="52,84 70,82 72,100 50,102" fill="${dk}"/>${poly(pts, skin)}${features(o, skin)}${hairFront(o)}${accessories(o, skin)}`;
  }
  const arm = (sx, sy, hx, hy, w0, w1, skin, sleeve, frac) => {
    const vx = hx - sx, vy = hy - sy, L = Math.hypot(vx, vy) || 1, nx = -vy / L, ny = vx / L;
    const pt = (x, y, w) => [[x + nx * w / 2, y + ny * w / 2], [x - nx * w / 2, y - ny * w / 2]];
    const a = pt(sx, sy, w0), b = pt(hx, hy, w1);
    let out = poly([a[0], b[0], b[1], a[1]], skin) + `<circle cx="${f(hx)}" cy="${f(hy)}" r="${f(w1 * .8)}" fill="${skin}"/>`;
    if (sleeve) { const mx = sx + vx * frac, my = sy + vy * frac, w = w0 + (w1 - w0) * frac + 3, m = pt(mx, my, w), s = pt(sx, sy, w0 + 4); out += poly([s[0], m[0], m[1], s[1]], sleeve); }
    return out;
  };
  const POSES = {
    stand:{ L:[24,170], R:[96,168] }, wave:{ L:[24,170], R:[106,62] }, point:{ L:[24,170], R:[156,112] }, hold:{ L:[48,160], R:[74,158] },
    cross:{ L:[72,138], R:[48,140] }, shrug:{ L:[4,130], R:[116,128] }, up:{ L:[6,60], R:[114,58] }, hug:{ L:[80,152], R:[42,154] },
    phone:{ L:[26,168], R:[78,134] }, think:{ L:[26,168], R:[66,92] }, hips:{ L:[16,152], R:[104,150] },
  };
  function person(opt) {
    const o = Object.assign({ skin:'a', hair:'short', top:'#ffcb05', ts:'tee', bot:'#59662e', bs:'pants', age:'adult', pose:'stand', mood:'smile', acc:[], look:0, flip:false, seed:1 }, CAST[opt.who] || {}, opt);
    const skin = SK[o.skin] || o.skin, top = o.top, bot = o.bot, dk = shade(skin, -.12);
    const P = POSES[o.pose] || POSES.stand; const sleeves = o.ts !== 'dress' || true;
    let legs = '', body = '';
    const shoe = (x, y, w) => poly([[x, y], [x + w, y], [x + w + 6, y + 8], [x - 4, y + 8]], '#0b0b0b');
    const bsk = o.ts === 'kurta' ? 232 : o.ts === 'dress' ? 252 : 176;
    if (o.bs === 'palazzo') legs = poly([[36,176],[62,176],[66,292],[12,292]], bot) + poly([[58,176],[86,176],[108,292],[56,292]], bot) + shoe(12, 292, 52) + shoe(58, 292, 50);
    else if (o.bs === 'shorts') legs = poly([[38,176],[62,176],[60,226],[34,226]], bot) + poly([[58,176],[84,176],[88,226],[60,226]], bot) + poly([[40,226],[56,226],[54,290],[42,290]], skin) + poly([[64,226],[80,226],[80,290],[66,290]], skin) + shoe(36, 290, 22) + shoe(62, 290, 22);
    else if (o.bs === 'skirt') legs = poly([[36,176],[84,176],[102,240],[18,240]], bot) + poly([[40,240],[56,240],[54,290],[42,290]], skin) + poly([[64,240],[80,240],[80,290],[66,290]], skin) + shoe(36, 290, 22) + shoe(62, 290, 22);
    else legs = poly([[38,176],[62,176],[58,290],[32,290]], bot) + poly([[58,176],[84,176],[88,290],[60,290]], bot) + shoe(30, 290, 30) + shoe(58, 290, 30);
    if (o.ts === 'kurta') { legs = legs.replace(/^/, ''); body = poly([[30,106],[90,102],[96,236],[26,238]], top) + `<path d="M60 108L60 160" stroke="${shade(top,-.2)}" stroke-width="2"/>`; }
    else if (o.ts === 'dress') body = poly([[30,106],[90,102],[108,254],[12,256]], top) + `<path d="M60 108L60 150" stroke="${shade(top,-.2)}" stroke-width="2"/>`;
    else if (o.ts === 'hoodie') body = poly([[24,106],[96,100],[92,188],[28,192]], top) + poly([[44,92],[78,90],[92,108],[28,112]], shade(top, -.18)) + `<path d="M52 112L52 140M70 112L70 140" stroke="${shade(top,.4)}" stroke-width="2.4"/>`;
    else if (o.ts === 'shirt') body = poly([[30,106],[90,102],[86,180],[34,182]], top) + `<path d="M60 104L60 180" stroke="${shade(top, -.2)}" stroke-width="2"/>` + poly([[48,100],[60,112],[72,100],[60,104]], '#ffffff55');
    else body = poly([[30,106],[90,102],[84,176],[36,178]], top) + `<path d="M60 106L60 130" stroke="${shade(top,-.2)}" stroke-width="2"/>`;
    const hand = (v, sx, sy) => arm(sx, sy, v[0], v[1], 14, 9, skin, top, o.ts === 'hoodie' ? .85 : .42);
    const arms = hand(P.L, 32, 112) + hand(P.R, 88, 110);
    const ageS = { kid: [.64, 1.32], teen: [.88, 1.08], adult: [1, 1] }[o.age] || [1, 1];
    const hs = ageS[1], bs = ageS[0];
    const g = `<g transform="translate(60 300) scale(${bs}) translate(-60 -300)">${legs}${body}${arms}
      <g transform="translate(60 92) scale(${hs}) translate(-60 -92)">${head(o, skin, o.seed)}</g></g>`;
    return { svg: o.flip ? `<g transform="translate(120 0) scale(-1 1)">${g}</g>` : g, h: 300, w: 120 };
  }

  /* ---------------------------------------------------------------- props */
  const PROPS = {
    phone: (s = 1) => `<g transform="scale(${s})"><rect x="0" y="0" width="46" height="86" rx="8" fill="#0b0b0b"/><rect x="4" y="8" width="38" height="68" rx="3" fill="#96c5d1"/><polygon points="8,14 32,14 34,24 8,26" fill="#fff"/><polygon points="14,32 38,32 38,42 12,44" fill="#ffcb05"/><polygon points="8,50 28,50 30,60 8,62" fill="#fff"/></g>`,
    ball: (s = 1) => `<g transform="scale(${s})"><circle cx="24" cy="24" r="23" fill="#fff" stroke="#0b0b0b" stroke-width="2"/><polygon points="24,12 35,20 31,33 17,33 13,20" fill="#0b0b0b"/><path d="M24 12V2M35 20l11-4M31 33l8 9M17 33l-8 9M13 20L2 16" stroke="#0b0b0b" stroke-width="2"/></g>`,
    teddy: (s = 1) => `<g transform="scale(${s})"><circle cx="12" cy="12" r="9" fill="#e35e26"/><circle cx="44" cy="12" r="9" fill="#e35e26"/><circle cx="28" cy="28" r="22" fill="#e35e26"/><circle cx="28" cy="36" r="9" fill="#ffecba"/><circle cx="20" cy="24" r="3" fill="#0b0b0b"/><circle cx="36" cy="24" r="3" fill="#0b0b0b"/><polygon points="25,33 31,33 28,38" fill="#0b0b0b"/></g>`,
    book: (s = 1) => `<g transform="scale(${s})"><polygon points="0,6 40,0 46,50 4,56" fill="#653781"/><polygon points="6,10 38,5 42,46 8,50" fill="#ffecba"/><path d="M12 18L34 14M13 26L35 22M14 34L36 30" stroke="#59662e" stroke-width="2"/></g>`,
    calendar: (s = 1) => `<g transform="scale(${s})"><rect x="0" y="8" width="70" height="62" fill="#fff"/><rect x="0" y="8" width="70" height="16" fill="#e35e26"/>${[0,1,2,3,4].map(r => [0,1,2,3,4,5].map(c => `<rect x="${5 + c * 10.5}" y="${28 + r * 8.4}" width="7" height="5.5" fill="${(r === 1 && c > 0 && c < 4) ? '#ac2929' : '#d9d2c6'}"/>`).join('')).join('')}</g>`,
    pad: (s = 1) => `<g transform="scale(${s})"><rect x="0" y="0" width="70" height="26" rx="13" fill="#fff"/><rect x="6" y="6" width="58" height="14" rx="7" fill="#ffecba"/><polygon points="22,-6 34,0 34,26 22,32 10,26 10,0" fill="#fff" opacity=".0"/></g>`,
    heart: (s = 1, c = '#e35e26') => `<g transform="scale(${s})"><polygon points="30,52 4,26 8,10 22,6 30,16 38,6 52,10 56,26" fill="${c}"/></g>`,
    shield: (s = 1) => `<g transform="scale(${s})"><path d="M30 2l28 10v22c0 20-14 32-28 38C16 66 2 54 2 34V12z" fill="#fff"/><path d="M16 36l10 10 20-22" fill="none" stroke="#59662e" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>`,
    star: (s = 1, c = '#ffcb05') => `<g transform="scale(${s})"><polygon points="20,0 26,14 40,15 29,25 33,40 20,32 7,40 11,25 0,15 14,14" fill="${c}"/></g>`,
    cake: (s = 1) => `<g transform="scale(${s})"><rect x="0" y="30" width="80" height="34" fill="#ff7664"/><rect x="0" y="22" width="80" height="12" fill="#fff"/>${[14,36,58].map(x => `<rect x="${x}" y="2" width="6" height="22" fill="#96c5d1"/><polygon points="${x + 3},-8 ${x + 8},0 ${x - 2},0" fill="#ffcb05"/>`).join('')}</g>`,
    bubble: (s = 1, t = '', c = '#fff', tc = '#0b0b0b') => `<g transform="scale(${s})"><polygon points="0,6 150,0 156,52 70,56 40,78 44,56 4,54" fill="${c}"/><text x="78" y="32" text-anchor="middle" font-family="Inter,Mukta,sans-serif" font-weight="800" font-size="15" fill="${tc}">${t}</text></g>`,
    lock: (s = 1) => `<g transform="scale(${s})"><path d="M10 26V16a14 14 0 0128 0v10" fill="none" stroke="#0b0b0b" stroke-width="7"/><rect x="2" y="24" width="44" height="34" fill="#ffcb05"/><circle cx="24" cy="40" r="5" fill="#0b0b0b"/></g>`,
    bandage: (s = 1) => `<g transform="scale(${s})"><rect x="0" y="0" width="60" height="22" rx="11" fill="#ffecba"/><rect x="22" y="0" width="16" height="22" fill="#fcd3c3"/></g>`,
    flower: (s = 1) => `<g transform="scale(${s})">${[0,1,2,3,4,5,6,7].map(i => `<polygon points="30,30 ${30 + 28 * Math.cos(i * .785 - .22)},${30 + 28 * Math.sin(i * .785 - .22)} ${30 + 28 * Math.cos(i * .785 + .22)},${30 + 28 * Math.sin(i * .785 + .22)}" fill="${['#ffcb05','#e35e26','#653781','#9ca32f','#ea8259','#647c8d','#ffecba','#434f64'][i]}"/>`).join('')}<circle cx="30" cy="30" r="10" fill="#96c5d1"/></g>`,
    bed: (s = 1) => `<g transform="scale(${s})"><rect x="0" y="40" width="190" height="36" fill="#653781"/><rect x="0" y="20" width="16" height="70" fill="#59662e"/><polygon points="20,40 60,22 100,30 100,40" fill="#fff"/><rect x="104" y="34" width="86" height="12" fill="#ffecba"/></g>`,
    chat: (s = 1) => `<g transform="scale(${s})"><polygon points="0,0 120,0 120,50 40,50 18,70 22,50 0,50" fill="#fff"/><polygon points="40,62 160,62 160,112 140,112 146,132 120,112 40,112" fill="#ffcb05"/><path d="M14 16H90M14 30H70" stroke="#647c8d" stroke-width="5"/><path d="M54 78H130M54 92H112" stroke="#0b0b0b" stroke-width="5"/></g>`,
    megaphone: (s = 1) => `<g transform="scale(${s})"><polygon points="0,18 40,18 90,0 90,60 40,42 0,42" fill="#e35e26"/><rect x="40" y="42" width="14" height="22" fill="#653781"/></g>`,
    thermometer: (s = 1) => `<g transform="scale(${s})"><rect x="0" y="0" width="14" height="52" rx="7" fill="#fff"/><circle cx="7" cy="58" r="12" fill="#ac2929"/><rect x="5" y="14" width="4" height="40" fill="#ac2929"/></g>`,
    bag: (s = 1) => `<g transform="scale(${s})"><path d="M10 10Q30 -8 50 10" stroke="#0b0b0b" stroke-width="5" fill="none"/><polygon points="0,14 60,10 64,66 -2,70" fill="#653781"/></g>`,
    glove: (s = 1) => `<g transform="scale(${s})"><path d="M10 40Q4 10 30 6t30 16q6 24-8 44H18z" fill="#e35e26"/><rect x="14" y="62" width="40" height="14" fill="#ffecba"/><path d="M34 12q-6 12 8 20" stroke="#ac2929" stroke-width="3" fill="none"/></g>`,
    bat: (s = 1) => `<g transform="scale(${s})"><polygon points="6,0 26,0 28,70 4,70" fill="#ffecba"/><rect x="12" y="70" width="8" height="34" fill="#653781"/></g>`,
    telescope: (s = 1) => `<g transform="scale(${s})"><polygon points="0,24 70,0 78,22 8,48" fill="#434f64"/><polygon points="60,4 84,-2 90,20 66,26" fill="#ffcb05"/><path d="M40 40L26 90M46 38L60 90" stroke="#0b0b0b" stroke-width="5"/></g>`,
    javelin: (s = 1) => `<g transform="scale(${s})"><polygon points="0,30 130,16 134,22 0,38" fill="#ffcb05"/><polygon points="130,12 150,19 130,26" fill="#0b0b0b"/></g>`,
    rocket: (s = 1) => `<g transform="scale(${s})"><polygon points="20,0 40,30 40,80 0,80 0,30" fill="#fff"/><polygon points="20,0 40,30 0,30" fill="#e35e26"/><circle cx="20" cy="46" r="8" fill="#96c5d1"/><polygon points="0,60 -14,84 0,80" fill="#653781"/><polygon points="40,60 54,84 40,80" fill="#653781"/></g>`,
    drop: (s = 1, c = '#ac2929') => `<g transform="scale(${s})"><path d="M16 0Q36 28 32 44a16 16 0 11-32 0Q-4 28 16 0z" fill="${c}"/></g>`,
    sparkle: (s = 1, c = '#ffcb05') => `<g transform="scale(${s})"><polygon points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9" fill="${c}"/></g>`,
    clock: (s = 1) => `<g transform="scale(${s})"><circle cx="30" cy="30" r="28" fill="#fff" stroke="#0b0b0b" stroke-width="3"/><path d="M30 14V30L42 36" stroke="#0b0b0b" stroke-width="4" fill="none" stroke-linecap="round"/></g>`,
    pill: (s = 1) => `<g transform="scale(${s})"><rect x="0" y="0" width="64" height="46" rx="6" fill="#dfe3e6"/>${[0,1,2,3].map(i => `<ellipse cx="${14 + i * 14}" cy="14" rx="6" ry="9" fill="${i < 3 ? '#fff' : '#e35e26'}"/><ellipse cx="${14 + i * 14}" cy="34" rx="6" ry="9" fill="#fff"/>`).join('')}</g>`,
    condom: (s = 1) => `<g transform="scale(${s})"><rect x="0" y="0" width="46" height="46" rx="4" fill="#653781"/><circle cx="23" cy="23" r="13" fill="none" stroke="#ffcb05" stroke-width="4"/><path d="M0 6h46M0 40h46" stroke="#ffffff55" stroke-width="2" stroke-dasharray="3 3"/></g>`,
    test: (s = 1) => `<g transform="scale(${s})"><rect x="0" y="0" width="22" height="86" rx="7" fill="#fff"/><rect x="5" y="22" width="12" height="26" fill="#eee"/><rect x="5" y="28" width="12" height="3" fill="#ac2929"/><rect x="5" y="38" width="12" height="3" fill="#ac2929"/></g>`,
    cross: (s = 1) => `<g transform="scale(${s})"><circle cx="32" cy="32" r="30" fill="#fff"/><path d="M32 14v36M14 32h36" stroke="#59662e" stroke-width="12" stroke-linecap="square"/></g>`,
    womb: (s = 1) => `<g transform="scale(${s})"><ellipse cx="150" cy="115" rx="146" ry="108" fill="#e8801f"/><ellipse cx="152" cy="116" rx="118" ry="86" fill="#ffecba"/><polygon points="86,128 112,70 172,58 214,82 222,132 196,170 140,184 98,166" fill="#e35e26"/><polygon points="104,120 122,82 168,72 204,92 206,128 184,152 142,160 112,146" fill="#ea8259"/><polygon points="138,96 176,86 196,106 180,128 146,126" fill="#e35e26"/><polygon points="176,86 226,98 214,116 196,106" fill="#0b0b0b"/></g>`,
    door: (s = 1) => `<g transform="scale(${s})"><rect x="0" y="0" width="90" height="170" fill="#59662e"/><rect x="10" y="10" width="70" height="150" fill="#9ca32f"/><circle cx="68" cy="90" r="6" fill="#ffcb05"/></g>`,
  };

  /* ---------------------------------------------------------------- scenes */
  const BG = { peach: C.peach, cream: C.cream, olive: C.olive, yellow: C.yellow, purple: C.purple, orange: C.orange, sky: C.sky, navy: C.navy, paper: '#f7f1e6', slate: C.slate, pink: '#ffd9cf', lilac: '#e6d9f0' };
  function deco(name, bg) {
    const d = shade(bg, -.12), l = shade(bg, .35);
    switch (name) {
      case 'grass': return `<rect x="0" y="372" width="932" height="58" fill="${C.olive}"/>` + [30,120,210,320,430,540,650,760,850].map((x, i) => poly([[x, 372], [x + 14, 372 - 26 - (i % 3) * 8], [x + 34, 372]], i % 2 ? C.oliveD : C.olive)).join('');
      case 'room': return `<rect x="0" y="340" width="932" height="90" fill="${d}"/><rect x="690" y="70" width="170" height="140" fill="${C.sky}"/><path d="M775 70V210M690 140H860" stroke="${bg}" stroke-width="6"/><rect x="684" y="64" width="182" height="152" fill="none" stroke="${shade(bg, -.3)}" stroke-width="6"/>`;
      case 'night': return `<circle cx="820" cy="80" r="34" fill="${C.yellow}"/><circle cx="834" cy="72" r="30" fill="${bg}"/>` + [[100,60],[180,120],[300,50],[520,70],[640,40],[760,160]].map(([x, y]) => `<g transform="translate(${x} ${y})">${PROPS.sparkle(.6)}</g>`).join('') + `<rect x="0" y="372" width="932" height="58" fill="${shade(bg, -.25)}"/>`;
      case 'school': return `<rect x="0" y="352" width="932" height="78" fill="${d}"/><rect x="60" y="70" width="190" height="110" fill="${C.oliveD}"/><path d="M80 100H210M80 126H180M80 150H220" stroke="#fff" stroke-width="4" opacity=".7"/>`;
      case 'blobs': return [[90,120,70],[170,260,46],[760,90,60],[850,250,84],[640,330,40],[300,330,50]].map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 2 ? l : d}" opacity=".7"/>`).join('') + `<rect x="0" y="380" width="932" height="50" fill="${d}"/>`;
      case 'hills': return poly([[0,330],[180,230],[360,330],[0,330]], d) + poly([[300,330],[520,210],[760,330]], shade(bg, -.07)) + poly([[640,330],[820,250],[932,330]], d) + `<rect x="0" y="330" width="932" height="100" fill="${shade(bg,-.2)}"/>`;
      case 'bath': return `<rect x="0" y="340" width="932" height="90" fill="${d}"/>` + [0,1,2,3].map(i => `<rect x="${60 + i * 220}" y="60" width="150" height="110" fill="${l}" opacity=".5"/>`).join('');
      case 'plain': return `<rect x="0" y="380" width="932" height="50" fill="${d}"/>`;
      default: return '';
    }
  }
  /* sp: {bg, deco, cast:[{who,mood,x,pose,flip,s,y,...}], props:[{k,x,y,s,a}]} x,y in 0..932 / 0..430 */
  function scene(sp, opt = {}) {
    const bg = BG[sp.bg] || sp.bg || BG.peach; const base = sp.sc || .95;
    let g = `<rect width="932" height="430" fill="${bg}"/>${deco(sp.deco || 'plain', bg)}`;
    (sp.props || []).forEach(p => { const fn = PROPS[p.k]; if (fn) g += `<g transform="translate(${p.x} ${p.y}) rotate(${p.r || 0})">${fn(p.s || 1, p.c)}</g>`; });
    (sp.cast || []).forEach((c, i) => {
      const pr = person(Object.assign({ seed: i + 2 }, c)); const ageD = { kid: 1.45, teen: 1.1, adult: .94 }[(CAST[c.who] || {}).age || c.age || 'adult'] || 1; const capA = { kid: 1.75, teen: 1.18, adult: .98 }[(CAST[c.who] || {}).age || c.age || 'adult'] || 1; const s = Math.min(c.s || ageD, capA) * base, y = (c.y == null ? 406 : c.y);
      g += `<g transform="translate(${c.x - 60 * s} ${y - 300 * s}) scale(${s})">${pr.svg}</g>`;
      (c.carry ? [c.carry] : []).forEach(cr => { const fn = PROPS[cr.k]; if (fn) g += `<g transform="translate(${c.x + (cr.dx || 0) * s} ${y - (cr.dy == null ? 150 : cr.dy) * s})">${fn((cr.s || 1) * s * 1.05)}</g>`; });
    });
    (sp.over || []).forEach(p => { const fn = PROPS[p.k]; if (fn) g += `<g transform="translate(${p.x} ${p.y}) rotate(${p.r || 0})">${p.k === 'bubble' ? fn(p.s || 1, p.t, p.c, p.tc) : fn(p.s || 1, p.c)}</g>`; });
    return `<svg viewBox="0 0 932 430" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" ${opt.attr || ''}>${g}</svg>`;
  }

  /* ---------------------------------------------------------------- Awkie: a person-shaped speech bubble */
  function awkie(expr = 'hi', opt = {}) {
    const bubble = poly([[10,52],[40,16],[126,8],[186,30],[196,104],[184,162],[128,176],[106,176],[88,208],[78,176],[34,170],[8,118]], C.purple);
    const hairF = poly([[44,84],[52,44],[96,22],[150,34],[160,72],[136,50],[96,52],[62,66]], '#0b0b0b') + poly([[132,34],[158,24],[170,44],[154,52]], '#0b0b0b');
    const head = poly([[56,56],[142,46],[152,120],[104,158],[58,126]], C.orange);
    const shirt = poly([[40,176],[70,150],[134,150],[168,176],[168,178],[40,178]], C.yellow);
    const looks = { hi:[1,0], listen:[-1.5,-1], think:[2,-2], happy:[0,0], care:[0,1], wow:[0,-1] }[expr] || [0, 0];
    const eye = (x, y) => `<circle cx="${x}" cy="${y}" r="11.5" fill="#fff"/><circle cx="${x + looks[0] * 2.4}" cy="${y + looks[1] * 2}" r="5.4" fill="#0b0b0b"/><circle cx="${x + looks[0] * 2.4 + 1.8}" cy="${y + looks[1] * 2 - 1.8}" r="1.6" fill="#fff"/>`;
    const brows = { hi:'M76 76L96 70M114 68L136 72', listen:'M76 78L96 74M114 72L136 70', think:'M76 78L96 76M114 62L136 66', happy:'M76 74L96 70M114 68L136 71', care:'M76 80L96 70M114 68L136 78', wow:'M76 70L96 66M114 64L136 66' }[expr];
    const mouth = {
      hi:`<path d="M80 118Q104 142 134 112Z" fill="#fff" stroke="#3a1608" stroke-width="2"/>`,
      listen:`<path d="M88 124Q108 134 128 118" stroke="#3a1608" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,
      think:`<path d="M88 126Q112 124 130 112" stroke="#3a1608" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,
      happy:`<path d="M76 114Q106 152 140 108Z" fill="#fff" stroke="#3a1608" stroke-width="2"/><path d="M90 130Q108 140 126 128" stroke="#c0452a" stroke-width="3" fill="none"/>`,
      care:`<path d="M90 126Q108 134 128 122" stroke="#3a1608" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,
      wow:`<ellipse cx="108" cy="128" rx="9" ry="12" fill="#3a1608"/>`,
    }[expr];
    const tilt = expr === 'listen' ? 'rotate(-5 104 104)' : expr === 'think' ? 'rotate(4 104 104)' : '';
    const faceG = `<g transform="${tilt}">${poly([[48,92],[58,84],[62,112],[50,112]], shade(C.orange, -.12)).replace('/>', ' opacity="0"/>')}<circle cx="56" cy="94" r="8" fill="${shade(C.orange, -.14)}"/><circle cx="148" cy="92" r="8" fill="${shade(C.orange, -.14)}"/>${head}
      ${eye(88, 94)}${eye(126, 90)}<path d="${brows}" stroke="#0b0b0b" stroke-width="4" stroke-linecap="round" fill="none"/><polygon points="104,102 118,100 112,114" fill="${shade(C.orange, -.22)}"/>${mouth}${hairF}<circle cx="150" cy="116" r="5.5" fill="${C.yellow}"/></g>`;
    const sp = [[22,26,.9],[186,150,.7],[170,16,.6]].map(([x, y, s]) => `<g transform="translate(${x} ${y})">${PROPS.sparkle(s, C.yellow)}</g>`).join('');
    const w = opt.w || 150;
    return `<svg viewBox="0 0 204 216" width="${w}" height="${w * 216 / 204}" xmlns="http://www.w3.org/2000/svg" class="awk-svg" role="img" aria-label="Awkie, your friendly guide">${bubble}${shirt.replace(C.yellow, shade(C.yellow, -.05))}${faceG}${opt.spark === false ? '' : sp}</svg>`;
  }

  /* ---------------------------------------------------------------- avatars */
  const HSET = {
    tween: [
      { skin:'a', hair:'short',  top:'#9ca32f', ts:'tee' }, { skin:'b', hair:'bun', top:'#ff7664', ts:'tee' }, { skin:'c', hair:'curly', top:'#ffcb05', ts:'tee' }, { skin:'d', hair:'braid', top:'#653781', ts:'tee' },
      { skin:'a', hair:'spiky', top:'#647c8d', ts:'tee' }, { skin:'b', hair:'long', top:'#e35e26', ts:'tee', acc:['bindi'] }, { skin:'c', hair:'hijab', hc:'#59662e', top:'#ffecba', ts:'tee' }, { skin:'d', hair:'short', top:'#ac2929', ts:'tee', acc:['glasses'] },
      { skin:'a', hair:'bob', top:'#434f64', ts:'tee' }, { skin:'e', hair:'curly', top:'#ffcb05', ts:'tee', acc:['glasses'] }, { skin:'b', hair:'turban', hc:'#653781', top:'#9ca32f', ts:'tee' }, { skin:'c', hair:'cap', hc:'#e35e26', top:'#434f64', ts:'tee' },
    ],
    teen: [
      { skin:'a', hair:'short',  top:'#0b0b0b', ts:'hoodie', acc:['headphones'] }, { skin:'b', hair:'long', top:'#647c8d', ts:'hoodie' }, { skin:'c', hair:'spiky', top:'#434f64', ts:'shirt', acc:['glasses'] }, { skin:'d', hair:'bob', top:'#ac2929', ts:'hoodie' },
      { skin:'a', hair:'cap', hc:'#59662e', top:'#0b0b0b', ts:'hoodie' }, { skin:'e', hair:'curly', top:'#ffecba', ts:'shirt' }, { skin:'b', hair:'hijab', hc:'#434f64', top:'#653781', ts:'hoodie' }, { skin:'c', hair:'short', top:'#e35e26', ts:'shirt', acc:['beard'] },
      { skin:'a', hair:'braid', top:'#9ca32f', ts:'hoodie' }, { skin:'d', hair:'bun', top:'#0b0b0b', ts:'shirt', acc:['glasses'] }, { skin:'c', hair:'turban', hc:'#e35e26', top:'#434f64', ts:'shirt', acc:['beard'] }, { skin:'b', hair:'long', top:'#ffcb05', ts:'hoodie', acc:['headphones'] },
    ],
  };
  const AVBG = ['#ffecba', '#fcd3c3', '#96c5d1', '#e6d9f0', '#cfd6a0', '#ffd9cf'];
  function humanAvatar(i, set, size = 96) {
    const o = Object.assign({ mood: i % 3 === 0 ? 'big' : 'smile', age: 'adult', seed: i + 3 }, HSET[set][i % 12]);
    const skin = SK[o.skin] || o.skin, bg = AVBG[i % AVBG.length];
    const sh = poly([[8,150],[24,112],[96,108],[112,150]], o.top);
    return `<svg viewBox="0 0 120 150" width="${size}" height="${size * 1.25}" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="112" height="142" fill="${bg}"/>
      <g transform="translate(0 10)">${sh}<g transform="translate(0 -4)">${head(o, skin, o.seed)}</g></g></svg>`;
  }
  const avatarURI = {};
  function avatarSet(tier) { // returns [{id, html}] 12 items
    if (tier === '4-6') return ['deer','llama','rabbit','panda','hedgehog','cat','pig','goat','dog','raccoon','fox','elephant'].map(a => ({ id: 'a:' + a }));
    if (tier === '7-9') return ['deer','fox','panda','cat','goat','rabbit'].map(a => ({ id: 'a:' + a })).concat([0, 1, 2, 3, 4, 5].map(i => ({ id: 't:' + i })));
    if (tier === '10-12') return [...Array(12)].map((_, i) => ({ id: 't:' + i }));
    return [...Array(12)].map((_, i) => ({ id: 'g:' + i }));
  }
  function avatarHTML(id, size = 92) {
    const [k, v] = String(id || 'a:deer').split(':');
    if (k === 'a') return `<img src="assets/av_${v}.png" alt="" style="height:${size * .9}px;width:auto">`;
    return humanAvatar(+v, k === 't' ? 'tween' : 'teen', size * .8);
  }

  /* ---------------------------------------------------------------- diagrams */
  function anatomy(kind) {
    if (kind === 'f') return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="300" fill="${C.cream}"/>
      <path d="M118 118Q70 80 52 124" stroke="${C.yellow}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M182 118Q230 80 248 124" stroke="${C.yellow}" stroke-width="9" fill="none" stroke-linecap="round"/>
      <ellipse cx="48" cy="132" rx="22" ry="15" fill="${C.yellow}"/><ellipse cx="252" cy="132" rx="22" ry="15" fill="${C.yellow}"/><circle cx="44" cy="130" r="3" fill="${C.cream}"/><circle cx="56" cy="136" r="2.4" fill="${C.cream}"/>
      <polygon points="118,106 182,106 196,162 168,206 132,206 104,162" fill="${C.salmon}"/><polygon points="138,200 162,200 160,214 140,214" fill="${C.maroon}"/>
      <polygon points="138,214 162,214 168,276 132,276" fill="${C.orange}"/><ellipse cx="150" cy="150" rx="22" ry="30" fill="${C.pink}" opacity=".55"/></svg>`;
    return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="300" fill="${C.cream}"/>
      <circle cx="150" cy="58" r="34" fill="${C.sky}"/><path d="M122 84Q104 150 112 214" stroke="${C.purple}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M178 84Q196 150 188 214" stroke="${C.purple}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <rect x="138" y="92" width="24" height="108" rx="11" fill="${C.salmon}"/><path d="M150 96V196" stroke="${C.maroon}" stroke-width="4" opacity=".6"/><ellipse cx="150" cy="204" rx="17" ry="13" fill="${C.orange}"/>
      <ellipse cx="110" cy="236" rx="30" ry="26" fill="${C.orange}"/><ellipse cx="190" cy="236" rx="30" ry="26" fill="${C.orange}"/></svg>`;
  }
  /* kid body figure in a swimsuit: the "underwear rule" picture */
  function bodyFigure(tier = 'kid') {
    const p = person({ who: 'rishi', age: 'kid', ts: 'tee', top: C.yellow, bs: 'shorts', bot: C.purple, mood: 'smile', hair: 'short' });
    return `<svg viewBox="5 80 110 232" xmlns="http://www.w3.org/2000/svg">${p.svg}</svg>`;
  }
  /* four age-zone cards (replace the blurry baked ones) */
  function zoneCard(tier) {
    const cast = {
      '4-6': { bg: '#fffaf0', deco: 'grass', cast: [{ who: 'rishi', mood: 'big', x: 270, pose: 'wave', s: 1.3 }, { who: 'tara', mood: 'smile', x: 560, s: 1.3 }], props: [{ k: 'teddy', x: 400, y: 300, s: 1.3 }] },
      '7-9': { bg: '#ffe5d6', deco: 'hills', cast: [{ who: 'arjun', mood: 'big', x: 300, pose: 'up', s: 1.3 }, { who: 'mini', mood: 'smile', x: 600, s: 1.3 }], props: [{ k: 'ball', x: 410, y: 320, s: 1.5 }] },
      '10-12': { bg: '#fff3c4', deco: 'blobs', cast: [{ who: 'kabir', mood: 'smile', x: 300, s: 1.15 }, { who: 'meera', mood: 'big', x: 600, pose: 'phone', s: 1.15 }], props: [] },
      '13+': { bg: '#cfd8e6', deco: 'night', cast: [{ who: 'didi', mood: 'smile', x: 320, pose: 'phone', s: 1.05 }, { who: 'dev', mood: 'neutral', x: 600, pose: 'cross', s: 1.05, age: 'adult' }], props: [] },
    }[tier];
    return scene(cast, { attr: 'class="zc-svg"' });
  }

  return { C, SK, CAST, person, PROPS, scene, awkie, humanAvatar, avatarSet, avatarHTML, anatomy, bodyFigure, zoneCard, shade, poly, BG };
})();
