/* Not That Awk — vector avatars: heroes for 10-12 and the make-your-own builder.
   They are drawn in the same language as the animal avatars: a tilted square head, big eyes, flat colour, no outlines.
   Hero looks are original characters (cape, mask, tiara, crescent ...) rather than copies of any brand or real person. */
(() => {
  'use strict';
  const A = window.ART, { poly, shade, C } = A;
  A.HEROES = {
    comet:     { name: 'Captain Comet',  skin: 'c', hair: 'short', top: '#e35e26', ts: 'tee', bot: '#434f64', bs: 'pants', cape: '#ac2929', acc: ['star'], ex: 'proud' },
    lightning: { name: 'Lady Lightning', skin: 'a', hair: 'long', top: '#ffcb05', ts: 'tee', bot: '#653781', bs: 'pants', cape: '#653781', acc: ['mask', 'bolt'], maskC: '#653781', ex: 'determined' },
    shield:    { name: 'Shield Princess', skin: 'b', hair: 'long', top: '#2b3a8c', ts: 'tee', bot: '#ac2929', bs: 'pants', cape: '#ac2929', acc: ['tiara'], ex: 'proud' },
    moon:      { name: 'Moon Ranger',    skin: 'd', hair: 'beanie', hc: '#434f64', top: '#434f64', ts: 'hoodie', bot: '#2f3846', bs: 'pants', cape: '#647c8d', acc: ['crescent'], ex: 'curious' },
    pop:       { name: 'Pop Star',       skin: 'a', hair: 'bob', hc: '#ff7664', top: '#9b4fd1', ts: 'jersey', stripe: '#ffcb05', bot: '#0b0b0b', bs: 'pants', acc: ['headphones', 'earring'], ex: 'laugh' },
    fashion:   { name: 'Fashion Star',   skin: 'c', hair: 'bun', hc: '#2a1f1a', top: '#ff7664', ts: 'dress', bot: '#ff7664', bs: 'skirt', acc: ['sunglasses', 'earring'], ex: 'happy' },
    cyber:     { name: 'Cyber Scout',    skin: 'b', hair: 'spiky', hc: '#0b0b0b', top: '#2f3846', ts: 'hoodie', bot: '#2f3846', bs: 'pants', acc: ['visor'], ex: 'determined' },
    striker:   { name: 'Star Striker',   skin: 'c', hair: 'curly', top: '#2d6ac7', ts: 'jersey', stripe: '#fff', num: '10', bot: '#fff', bs: 'shorts', acc: [], ex: 'proud' },
  };

  /* head and shoulders on a transparent square, like the animal avatars */
  A.avatarSVG = (sp, w = 120) => {
    const o = { ...sp }; const skin = A.SK[o.skin || 'a'] || o.skin;
    const top = o.top || C.yellow;
    const cape = o.cape ? poly([[6, 126], [114, 122], [146, 196], [-26, 204]], o.cape) : '';
    const bust = poly([[0, 156], [30, 118], [96, 114], [126, 150], [136, 200], [-10, 204]], top) + poly([[44, 112], [76, 110], [78, 130], [42, 132]], shade(skin, -.2));
    const emblem = (o.acc || []).includes('star') ? poly(Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? 9 : 20; return [62 + Math.cos(a) * rr, 168 + Math.sin(a) * rr]; }), C.yellow) : '';
    const num = o.num ? `<text x="62" y="186" text-anchor="middle" font-family="Black Han Sans,sans-serif" font-size="30" fill="${o.stripe || '#fff'}">${o.num}</text>` : '';
    const hd = A.head({ ...o, acc: (o.acc || []).filter(a => a !== 'star'), ex: o.ex || 'happy' });
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-30 -36 190 244" width="${w}">${cape}${bust}${emblem}${num}${hd}</svg>`;
  };
  A.avatarURL = sp => 'data:image/svg+xml;utf8,' + encodeURIComponent(A.avatarSVG(sp));
})();
