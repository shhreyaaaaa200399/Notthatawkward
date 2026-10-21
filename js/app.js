/* Not That Awk — interactive prototype core: router, state, shared UI, onboarding, hub, learn + stories. */
(() => {
'use strict';
const D = window.DATA;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = a => a[Math.floor(Math.random() * a.length)];

/* ------------------------------------------------------------------ state */
const KEY = 'nta-proto-v2';
const defaults = () => ({
  lang: 'en', tone: 1, role: 'parent', arch: null, sound: true, read: true, consent: false,
  profiles: [
    { id: 'p1', name: 'Aarav', av: 'deer', age: '4-6' },
    { id: 'p2', name: 'Shreya', av: 'goat', age: '7-9' },
    { id: 'p3', name: 'Midha', av: 'cat', age: '10-12' },
  ],
  cur: 'p1', stars: 3, stk: ['deer', 'goat', 'cat'], en: {}, seen: [], talks: 2, games: 1,
  awk: [2, 3, 3, 4], week: [2, 4, 3, 5, 2, 6, 4], chal: [true, false, false], trusted: [], limit: 30,
});
let S;
try { S = Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = defaults(); }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
const draft = { age: '4-6', av: null, name: '' };
const ageMin = p => ({ '4-6': 4, '7-9': 7, '10-12': 10 }[p.age] || 4);
const prof = () => S.profiles.find(p => p.id === S.cur) || S.profiles[0];
/* reading levels: y = 4-6, m = 7-9, o = 10-12. Each age group gets its own colour world, copy and illustrations. */
const TIER = { '4-6': 'y', '7-9': 'm', '10-12': 'o' };
const tierOf = p => TIER[(p || prof()).age] || 'y';
const pickT = (v, tier) => v == null ? '' : typeof v === 'string' ? v : (v[tier] != null ? v[tier] : (tier === 'o' ? (v.m != null ? v.m : v.y) : tier === 'm' ? (v.y != null ? v.y : v.o) : (v.m != null ? v.m : v.o)) || '');
function storyTier(s, tier) { if (s.tiers.includes(tier)) return tier; const order = { y: ['m', 'o'], m: ['y', 'o'], o: ['m', 'y'] }[tier]; return order.find(t => s.tiers.includes(t)) || s.tiers[0]; }
/* the story as this child will read it: right-level text, right-level slides, tone-aware illustrations */
function effStory(s) {
  const tier = storyTier(s, tierOf()), ctx = { tier, tone: S.tone };
  const slides = s.slides.filter(sl => !sl.only || sl.only.includes(tier)).map(sl => ({ ...sl, t: pickT(sl.t, tier), q: sl.q, ctx, bg: sl.bg || D.CHOICE_BG[tier] }));
  if (tier === 'o' && s.facts) slides.push({ w: 'facts', facts: s.facts, ctx, bg: 'navy', t: '' });
  return { ...s, slides, tier, ctx };
}
const storyOn = (pid, s) => {
  const p = S.profiles.find(x => x.id === pid); const o = S.en[pid] && S.en[pid][s.id];
  return o !== undefined ? o : s.minAge <= ageMin(p);
};
const t = k => (D.T[S.lang] && D.T[S.lang][k]) || D.T.en[k] || k;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ------------------------------------------------------------------ icons */
const ICON = {
  gear: `<svg viewBox="0 0 48 48"><g transform="translate(24 24)" fill="#000"><circle r="12.5" fill="none" stroke="#000" stroke-width="9"/>${[0,45,90,135,180,225,270,315].map(a => `<rect x="-4.5" y="-22.5" width="9" height="8" transform="rotate(${a})"/>`).join('')}</g></svg>`,
  trans: `<svg viewBox="0 0 44 44"><rect x="2" y="2" width="40" height="40" fill="#fff" stroke="#000" stroke-width="3"/><text x="5" y="22" font-family="Mukta,sans-serif" font-weight="800" font-size="19" fill="#000">अ</text><text x="21" y="38" font-family="Inter,sans-serif" font-weight="800" font-size="21" fill="#000">A</text></svg>`,
  x: `<svg viewBox="0 0 40 40"><path d="M5 5L35 35M35 5L5 35" stroke="#000" stroke-width="7" fill="none"/></svg>`,
  back: `<svg viewBox="0 0 64 52"><path d="M4 26L30 2V15C48 15 60 26 62 46C50 36 40 33 30 35V50Z" fill="#000"/></svg>`,
  speak: `<svg viewBox="0 0 54 54"><path d="M6 20h10l12-10v34L16 34H6z" fill="#000"/><path class="w" d="M34 18q7 9 0 18M40 12q12 15 0 30" stroke="#000" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`,
  chevL: `<svg viewBox="0 0 24 24"><path d="M15 5L8 12l7 7" fill="none" stroke="#000" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevR: `<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" fill="none" stroke="#000" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevD: `<svg viewBox="0 0 34 24"><path d="M3 5l14 14L31 5" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24"><path d="M4 13l5 5L20 6" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  clock: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#000" stroke-width="2"/><path d="M12 7v5l3 2" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>`,
  book: `<svg viewBox="0 0 24 24"><path d="M3 5h7a2 2 0 012 2v12a2 2 0 00-2-2H3zM21 5h-7a2 2 0 00-2 2v12a2 2 0 012-2h7z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
  eye: `<svg viewBox="0 0 24 24"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  hide: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#fff" stroke-width="2"/><path d="M5 19L19 5" stroke="#fff" stroke-width="2"/></svg>`,
  play: `<svg viewBox="0 0 24 24"><path d="M8 5l12 7-12 7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  finger: `<svg viewBox="0 0 24 24"><path d="M12 3c-4 0-7 3-7 7v3M12 7c-2 0-4 1.5-4 4v6M12 7c2 0 4 1.5 4 4v5M12 11v8M19 10c0-4-3-7-7-7M8 20c2 1 6 1 8 0" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  heart: `<svg viewBox="0 0 24 24"><path d="M12 20S3 14 3 8.5A4.5 4.5 0 0112 7a4.5 4.5 0 019 1.5C21 14 12 20 12 20z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M5 12h4l2-3 2 5 2-2h3" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
  people: `<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="9" r="2.4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 19c0-3.5 2.7-6 6-6s6 2.5 6 6M16 14c2.8 0 5 2 5 5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
  search: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  shield: `<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.5 12l2.5 2.5L16 9.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  star: `<svg viewBox="0 0 24 24"><path d="M12 2l3 7 7.5.6-5.7 5 1.8 7.4L12 18l-6.6 4 1.8-7.4-5.7-5L9 9z" fill="#ffcb05" stroke="#000" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  flame: `<svg viewBox="0 0 24 24"><path d="M12 2c1 4 6 6 6 12a6 6 0 01-12 0c0-3 2-4 3-7 1 1 2 2 2 3 1-2 1-5 1-8z" fill="#e35e26" stroke="#000" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  lock: `<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor"/><path d="M8 11V8a4 4 0 018 0v3" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  send: `<svg viewBox="0 0 24 24"><path d="M3 12l18-8-6 17-3-7z" fill="#fff" stroke="#000" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  home: `<svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  sticker: `<svg viewBox="0 0 24 24"><path d="M4 4h16v10l-6 6H4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 20v-6h6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
  hand: `<svg viewBox="0 0 24 24"><path d="M7 11V5a1.5 1.5 0 013 0v5m0-1V4a1.5 1.5 0 013 0v6m0-5a1.5 1.5 0 013 0v7m0-3a1.5 1.5 0 013 0v5c0 4-3 7-7 7-3 0-5-1.5-6.5-4L4 14a1.5 1.5 0 012.5-1.5L8 14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};
window.NTA_ICON = ICON;

const avImg = (a, cls = '') => `<img class="${cls}" src="assets/av_${a}.png" alt="${D.AV_NAME[a] || ''} avatar">`;
const artImg = (k, h, cls = '', st = '') => {
  const a = D.ART[k]; if (!a) return '';
  return `<img class="${cls}" src="${a.src}" alt="" style="height:${h || a.h}px;width:auto;${st}">`;
};

/* ------------------------------------------------------------------ sound + speech + confetti */
let ac;
function beep(kind = 'tap') {
  if (!S.sound) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const seq = { tap: [[520, .06]], ok: [[660, .08], [880, .12]], no: [[200, .16]], win: [[523, .09], [659, .09], [784, .09], [1047, .2]], pop: [[400, .05], [700, .07]] }[kind] || [[500, .05]];
    let at = ac.currentTime;
    seq.forEach(([f, d]) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = kind === 'no' ? 'sawtooth' : 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(.0001, at); g.gain.exponentialRampToValueAtTime(.12, at + .01); g.gain.exponentialRampToValueAtTime(.0001, at + d);
      o.connect(g); g.connect(ac.destination); o.start(at); o.stop(at + d + .02); at += d * .9;
    });
  } catch (e) {}
}
function speak(text) {
  try {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/\n/g, ' '));
    u.lang = S.lang === 'hi' ? 'hi-IN' : 'en-IN'; u.rate = .92; u.pitch = 1.1;
    speechSynthesis.speak(u);
  } catch (e) {}
}
function confetti(n = 46) {
  const host = $('#stage'); const c = document.createElement('div'); c.className = 'confetti';
  const cols = ['#e35e26', '#653781', '#ffcb05', '#9ca32f', '#96c5d1', '#ff7664'];
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i');
    p.style.cssText = `left:${rnd(5, 95)}%;background:${pick(cols)};--dx:${rnd(-90, 90)}px;--r:${rnd(-540, 540)}deg;animation-delay:${rnd(0, .35)}s;width:${rnd(8, 15)}px;height:${rnd(10, 20)}px;clip-path:${pick(['polygon(0 0,100% 20%,70% 100%,10% 80%)', 'polygon(50% 0,100% 100%,0 100%)', 'none'])}`;
    c.appendChild(p);
  }
  host.appendChild(c); setTimeout(() => c.remove(), 2600);
}
function toast(msg) {
  $$('.toast').forEach(x => x.remove());
  const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg; $('#stage').appendChild(el);
  setTimeout(() => el.remove(), 2700);
}

/* ------------------------------------------------------------------ modal + parent gate */
function modal(html, opt = {}) {
  const m = $('#modal'); m.innerHTML = html; m.classList.add('on');
  m.onclick = e => { if (e.target === m && !opt.sticky) closeModal(); };
  return m;
}
function closeModal() { const m = $('#modal'); m.classList.remove('on'); m.innerHTML = ''; }
function gate(cb, why) {
  const a = Math.floor(rnd(4, 9)), b = Math.floor(rnd(4, 9)); const ans = a + b;
  const opts = new Set([ans]); while (opts.size < 3) opts.add(ans + Math.floor(rnd(-4, 5)) || ans + 5);
  const list = [...opts].sort(() => Math.random() - .5);
  const m = modal(`<div class="gate"><h4>Grown-ups only!</h4><p>${esc(why || 'Quick check so little hands don’t wander into settings.')}</p>
    <div class="q">${a} + ${b} = ?</div><div class="ans">${list.map(v => `<button data-v="${v}">${v}</button>`).join('')}</div>
    <p style="margin:16px 0 0"><button data-x style="font:700 12px var(--body);color:#888;text-decoration:underline">Cancel</button></p></div>`);
  m.querySelector('[data-x]').onclick = closeModal;
  $$('.ans button', m).forEach(b => b.onclick = () => {
    if (+b.dataset.v === ans) { beep('ok'); closeModal(); cb(); } else { b.classList.add('bad'); beep('no'); setTimeout(() => b.classList.remove('bad'), 500); }
  });
}

/* ------------------------------------------------------------------ stars + stickers */
function addStars(n, why) {
  const before = S.stk.length; S.stars += n;
  while (S.stk.length < Math.min(12, 3 + Math.floor(S.stars / 2))) {
    const nxt = D.AVATARS.find(a => !S.stk.includes(a)); if (!nxt) break; S.stk.push(nxt);
  }
  save();
  if (S.stk.length > before) {
    const a = S.stk[S.stk.length - 1]; beep('win'); confetti(60);
    setTimeout(() => {
      modal(`<div class="sticker-pop"><img src="assets/av_${a}.png" alt=""><h4>New sticker!</h4><p>You unlocked the ${esc(D.AV_NAME[a])} sticker${why ? ' for ' + esc(why) : ''}.</p><button class="btn or" data-close>Yay!</button></div>`);
      $('#modal [data-close]').onclick = closeModal;
    }, 450);
  } else toast(`+${n} ★ ${why ? '· ' + why : ''}`);
}

/* ------------------------------------------------------------------ router */
const SC = {}; const ORDER = []; let cur = { id: null, opts: {} }; const hist = []; let busy = false; let langReturn = null;
const reg = (id, def) => { SC[id] = def; ORDER.push(id); };
const ACT = {};
/* vertical rhythm: sit the main content block in the middle of the space between the title and the footer buttons */
const NO_CENTER = new Set(['splash', 'intro', 'story', 'done', 'goodbye', 'learn', 'topics', 'dice', 'settings', 'playhub', 'challenge', 'awkie', 'ama', 'meethub']);
function centerContent(el) {
  if (!el.isConnected || el.dataset.centred === '1') return;
  const kids = [...el.children].filter(k => getComputedStyle(k).position === 'absolute' && !k.matches('.eyebrow,.ib,.chip,.dots,.foot,.ph-bar,.ph-nv,.deco,.toast,.confetti,.floaty,.mascot,.hint,.go'));
  if (!kids.length) return;
  const eb = [...el.querySelectorAll(':scope>.eyebrow')].reduce((m, e) => Math.max(m, e.offsetTop + e.offsetHeight), 70);
  const ft = [...el.querySelectorAll(':scope>.foot,:scope>.dots,:scope>.ph-bar')].reduce((m, e) => Math.min(m, e.offsetTop), 392);
  const top = Math.min(...kids.map(k => k.offsetTop)), bot = Math.max(...kids.map(k => k.offsetTop + k.offsetHeight));
  const zoneTop = eb + 10, zoneBot = ft - 10, d = Math.round((zoneTop + (zoneBot - zoneTop - (bot - top)) / 2) - top);
  if (d > 6 && d < 130) { kids.forEach(k => { k.style.top = (k.offsetTop + d) + 'px'; }); }
  el.dataset.centred = '1';
}
function render(id, opts) {
  const def = SC[id]; const stage = $('#screens'); stage.innerHTML = '';
  const el = document.createElement('section');
  el.className = 'screen enter ' + (def.cls || '') + (S.lang === 'hi' ? ' hindi' : ''); el.dataset.screen = id;
  el.innerHTML = def.render(opts || {}); stage.appendChild(el);
  cur = { id, opts: opts || {} };
  try { $('#stage').dataset.age = SC[id].group === 'Onboarding' ? 'y' : tierOf(); } catch (e) {}
  if (def.mount) def.mount(el, opts || {});
  if (!NO_CENTER.has(id)) { requestAnimationFrame(() => centerContent(el)); setTimeout(() => centerContent(el), 250); }
  $$('#side nav button').forEach(b => b.classList.toggle('on', b.dataset.id === id));
  const lab = $('#curName'); if (lab) lab.textContent = def.name;
  try { speechSynthesis.cancel(); } catch (e) {}
}
function go(id, opts = {}, o = {}) {
  if (!SC[id]) return; if (busy) return; busy = true;
  const swipe = SC[id].group === 'Onboarding';   // the big wipe is only for the starting screens
  const w = $('#wipe'), swap = () => {
    if (!o.noPush && cur.id && cur.id !== id) hist.push({ id: cur.id, opts: cur.opts });
    closeModal(); render(id, opts);
  };
  if (!swipe) { swap(); const sc = $('#screens .screen'); if (sc) sc.classList.add('quick'); busy = false; return; }
  w.className = 'in';
  setTimeout(() => { swap(); w.className = 'out'; setTimeout(() => { w.className = ''; busy = false; }, 420); }, 330);
}
function back() { const h = hist.pop(); if (h) go(h.id, h.opts, { noPush: true }); else go('hub', {}, { noPush: true }); }
const rerender = () => render(cur.id, cur.opts);

/* delegated actions */
/* click sparkles: a tiny burst wherever you tap */
document.addEventListener('pointerdown', e => {
  const st = e.target.closest && e.target.closest('#stage'); if (!st) return;
  const r = st.getBoundingClientRect(), k = 932 / r.width, x = (e.clientX - r.left) * k, y = (e.clientY - r.top) * k;
  for (let i = 0; i < 7; i++) {
    const d = document.createElement('i'); d.className = 'spk'; const a = (i / 7) * 6.283 + Math.random(), dist = 22 + Math.random() * 22;
    d.style.cssText = `left:${x}px;top:${y}px;--dx:${Math.cos(a) * dist}px;--dy:${Math.sin(a) * dist}px;background:${['#ffcb05', '#e35e26', '#9ca32f', '#96c5d1', '#592898'][i % 5]}`;
    st.appendChild(d); setTimeout(() => d.remove(), 600);
  }
});
document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const i = b.dataset.act.indexOf(':'); const name = i < 0 ? b.dataset.act : b.dataset.act.slice(0, i); const arg = i < 0 ? '' : b.dataset.act.slice(i + 1);
  if (ACT[name]) { beep('tap'); ACT[name](arg, b, e); }
});
Object.assign(ACT, {
  go: a => go(a), back: () => back(),
  gated: a => gate(() => go(a)),
  settings: () => gate(() => go('settings'), 'Settings and profiles are for grown-ups.'),
  trans: () => { langReturn = cur.id; go('language'); },
  exit: () => {
    modal(`<div class="gate" style="margin-top:-130px"><h4>Taking a break?</h4><p>Your stars and stickers are safe. See you soon!</p>
      <div style="display:flex;gap:14px;justify-content:center"><button class="btn ol" data-close>Keep going</button><button class="btn or" data-bye>Bye for now</button></div></div>`);
    $('#modal [data-close]').onclick = closeModal; $('#modal [data-bye]').onclick = () => go('goodbye');
  },
});

/* shared builders */
const gearB = `<button class="ib gear" data-act="settings" aria-label="Settings">${ICON.gear}</button>`;
const transB = `<button class="ib tr" data-act="trans" aria-label="Language">${ICON.trans}</button>`;
const closeB = (a = 'exit') => `<button class="ib tr close" data-act="${a}" aria-label="Close">${ICON.x}</button>`;
const backB = `<button class="ib back" data-act="back" aria-label="Back">${ICON.back}</button>`;
const hd = (sub, h2, cls = '', extra = '') => `<div class="eyebrow ${cls}"><h2>${h2 || t('profile')}</h2><h3>${sub}</h3>${extra}</div>`;
const foot = items => `<div class="foot">${items.map(i => `<button class="${i.cls || ''}" ${i.id ? `id="${i.id}"` : ''} data-act="${i.act}">${i.l}</button>`).join('')}</div>`;
const chipHTML = (cls = '') => { const p = prof(); return `<div class="chip ${cls}">${avImg(p.av)}<b>${esc(p.name)}</b></div>`; };
const setNext = (el, on) => { const n = $('#nextB', el); if (n) n.classList.toggle('dis', !on); };
const stars = () => `<div class="statpills"><div class="stat">${ICON.star}<span id="starN">${S.stars}</span></div></div>`;

/* SVG flower (built from the Figma flower vocabulary: hand-cut petals around a little globe) */
const PET = ['#434f64', '#653781', '#e35e26', '#59662e', '#ffcb05', '#647c8d', '#ffe8b8', '#edd25a', '#653781', '#ea8259', '#b5451b', '#434f64'];
function flowerSVG(o = {}) {
  const N = o.cols ? o.cols.length : 12, cx = 180, cy = 150, r0 = 52, cols = o.cols || PET;
  let petals = '';
  const step = 360 / N;
  for (let i = 0; i < N; i++) {
    const j = ((i * 37) % 11) / 11, a = i * step - 90 + (j - .5) * step * .14;
    const r1 = 122 + j * 30, hi = step * .17, ho = step * (.3 + j * .08);
    const rad = d => d * Math.PI / 180, P = (r, d) => `${(cx + r * Math.cos(rad(a + d))).toFixed(1)},${(cy + r * Math.sin(rad(a + d))).toFixed(1)}`;
    const pts = [P(r0 - 6, -hi), P(r1, -ho), P(r1 - 8, ho * .9), P(r0 - 6, hi)].join(' ');
    const fill = o.fills ? o.fills[i] : cols[i]; const empty = o.fills && !fill;
    petals += `<polygon class="pt ${empty ? 'empty' : ''}" data-i="${i}" points="${pts}" fill="${fill || 'none'}" ${o.stroke ? `stroke="${o.stroke}" stroke-width="2"` : ''} style="cursor:${o.click ? 'pointer' : 'default'}"/>`;
  }
  return `<svg class="fl-svg" viewBox="0 0 360 400" ${o.style ? `style="${o.style}"` : ''}>
    <path d="M176 262C168 310 188 352 176 400" stroke="#59662e" stroke-width="12" fill="none"/>
    <polygon points="206,330 252,314 276,336 232,350 214,346" fill="#59662e" opacity=".85"/>
    ${petals}
    <circle cx="${cx}" cy="${cy}" r="52" fill="#96c5d1"/>
    <path d="M148 118q14-10 30-6 10 6 6 18-12 6-20 4-12-4-16-16zM190 154q16-8 28 2 4 14-10 22-16 2-22-10 0-8 4-14zM136 160q10 4 10 16-8 8-14 2-4-10 4-18z" fill="#59662e"/>
  </svg>`;
}
window.NTA_FLOWER = flowerSVG;

/* ------------------------------------------------------------------ SCREENS: onboarding */
const LOGO = { W: 994, H: 820, parts: [['p1', 165, 27, 312], ['p2', 479, 45, 174], ['p3', 460, 266, 206], ['p6', 61, 420, 144], ['p5', 197, 405, 157], ['p4', 276, 391, 253], ['p7', 500, 472, 226], ['p8', 721, 493, 199]], bub: { o9: [668, 230, 203], o10: [52, 592, 237] } };
const SPLASH_SCRIPT = [
  { who: 'o10', tx: 'Where do babies<br>come from?', ex: { c: 'curious', m: 'surprised', p: 'happy', a: 'happy' } },
  { who: 'o9', tx: 'Let me tell<br>you a story', ex: { c: 'thinking', m: 'worried', p: 'awkward', a: 'embarrassed' } },
];
/* the two families are vector heads: expressions change, they blink, and they talk */
const SPL = { c: { skin: 'c', hair: 'braid', top: 1 }, m: { skin: 'a', hair: 'long', acc: ['bindi', 'earring'] }, p: { skin: 'b', hair: 'short', acc: ['moustache'] }, a: { skin: 'a', hair: 'dupatta', acc: ['bindi'] } };
const SPL_TOP = { c: '#ffcb05', m: '#653781', p: '#96c5d1', a: '#9ca32f' };
const splHead = (k, ex, talk) => `<g class="sh sh-${k}">${ART.poly([[44, 100], [74, 98], [76, 118], [42, 120]], ART.shade(ART.SK[SPL[k].skin], -.2))}${ART.poly([[0, 150], [30, 116], [92, 112], [124, 146], [136, 230], [-10, 236]], SPL_TOP[k])}${ART.head({ ...SPL[k], ex, mouth: talk ? 'open' : null })}</g>`;
const splGroup = (a, b, ea, eb, ta, tb) => `<svg viewBox="0 0 330 290" class="sg">
  <g transform="translate(8 6) scale(1.4) rotate(-5 60 60)">${splHead(a, ea, ta)}</g><g transform="translate(176 128) scale(1.02) rotate(8 60 60)">${splHead(b, eb, tb)}</g></svg>`;
reg('splash', { name: 'Splash', group: 'Onboarding', cls: 'splash',
  render: () => `<div class="sf sfl" id="gL"></div><div class="sf sfr" id="gR"></div>
    <div class="lg" id="lg">${LOGO.parts.map(([f, x, y, w]) => `<img class="lp" src="assets/logo/${f}.png" style="left:${x / LOGO.W * 100}%;top:${y / LOGO.H * 100}%;width:${w / LOGO.W * 100}%" alt="">`).join('')}
      ${Object.entries(LOGO.bub).map(([f, [x, y, w]]) => `<div class="lb ${f}" style="left:${x / LOGO.W * 100}%;top:${y / LOGO.H * 100}%;width:${w / LOGO.W * 100}%"><img src="assets/logo/${f}.png" alt=""><span class="tx"></span></div>`).join('')}</div>
    <div class="abs hint">TAP TO START</div>
    <svg class="abs go" viewBox="0 0 56 24"><path d="M2 12h44M36 3l14 9-14 9" stroke="#000" stroke-width="5" fill="none"/></svg>`,
  mount: el => {
    const lg = $('#lg', el), K = 0.37, LX = (932 - LOGO.W * K) / 2, LY = 30;
    lg.style.cssText = `left:${LX}px;top:${LY}px;width:${LOGO.W * K}px;height:${LOGO.H * K}px`;
    const fl = $('#gL', el), fr = $('#gR', el);
    const st = { c: 'happy', m: 'happy', p: 'happy', a: 'happy' }, tk = { c: 0, m: 0, p: 0, a: 0 };
    // the original illustrations, untouched; they come alive through movement
    const draw = () => { fl.innerHTML = `<img class="sg ${tk.c ? 'talk' : ''}" src="assets/faces_left.png" alt="">`; fr.innerHTML = `<img class="sg ${tk.p ? 'talk' : ''}" src="assets/faces_right.png" alt="">`; };
    draw();
    // blink every few seconds: lids fade in/out through CSS, no redraw needed
    const start = { o10: { cx: 330, cy: 150, sc: 1.7, flip: 1, rot: -6 }, o9: { cx: 600, cy: 262, sc: 1.7, flip: -1, rot: 5 } };
    const bubs = {}; $$('.lb', el).forEach(b => bubs[[...b.classList].find(c => c.startsWith('o'))] = b);
    const fin = f => { const [x, y, w] = LOGO.bub[f]; const h = $('img', bubs[f]).naturalHeight || 200; return { cx: LX + (x + w / 2) * K, cy: LY + (y + h / 2) * K }; };
    const timers = []; let done = false, ready = false, idle = null, talkT = null;
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const place = f => { const s = start[f], e = fin(f); return { dx: s.cx - e.cx, dy: s.cy - e.cy }; };
    const talk = (who, ms) => { tk[who] = 1; draw(); setTimeout(() => { tk[who] = 0; draw(); }, ms); };
    const pop = (f, line) => {
      const b = bubs[f], s = start[f], { dx, dy } = place(f), tx = $('.tx', b);
      tx.innerHTML = line.tx; tx.style.opacity = 1; tx.style.transform = s.flip < 0 ? 'translateY(-50%) scaleX(-1)' : 'translateY(-50%)';
      b.style.opacity = 1; b.style.zIndex = 5;
      b.animate([{ transform: `translate(${dx}px,${dy}px) scale(${s.flip * .2},.2) rotate(${s.rot}deg)`, opacity: 0 }, { transform: `translate(${dx}px,${dy}px) scale(${s.flip * s.sc},${s.sc}) rotate(${s.rot}deg)`, opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.2,1.7,.4,1)', fill: 'forwards' });
      talk(f === 'o10' ? 'c' : 'p', 1400); beep('pop');
    };
    const finale = () => {
      [[fl, 46, 188], [fr, 672, 174]].forEach(([f, l1, t1], i) => { f.style.animation = 'none'; f.style.opacity = 1; const L0 = i ? 600 : 110, T0 = i ? 70 : 170; f.animate([{ left: L0 + 'px', top: T0 + 'px', width: (i ? 287 : 215) + 'px' }, { left: l1 + 'px', top: t1 + 'px', width: (i ? 250 : 190) + 'px' }], { duration: 900, delay: 200, easing: 'cubic-bezier(.3,1.4,.5,1)', fill: 'forwards' }); });
      Object.keys(bubs).forEach((f, i) => {
        const b = bubs[f], s = start[f], { dx, dy } = place(f); $('.tx', b).style.opacity = 0;
        b.animate([{ transform: `translate(${dx}px,${dy}px) scale(${s.flip * s.sc},${s.sc}) rotate(${s.rot}deg)` }, { transform: 'translate(0,0) scale(1,1) rotate(0)' }], { duration: 900, delay: i * 120, easing: 'cubic-bezier(.3,1.5,.5,1)', fill: 'forwards' });
      });
      $$('.lp', el).forEach((l, i) => l.animate([{ transform: 'translateY(-70px) scale(.3) rotate(-14deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 650, delay: 500 + i * 90, easing: 'cubic-bezier(.2,1.8,.4,1)', fill: 'forwards' }));
      at(1500, () => beep('win'));
      at(2100, () => { ready = true; el.classList.add('done'); lifeLoop(); });
    };
    // idle life: expressions drift, like they're still chatting
    const lifeLoop = () => { idle = setInterval(() => { const k = Math.random() < .5 ? 'c' : 'p'; tk[k] = 1; draw(); setTimeout(() => { tk[k] = 0; draw(); }, 900); }, 2600); };
    const finish = () => {
      timers.forEach(clearTimeout); clearInterval(talkT); done = true; ready = true;
      $$('*', el).forEach(n => n.getAnimations && n.getAnimations().forEach(a => a.cancel())); draw(); el.classList.add('done', 'skip'); if (!idle) lifeLoop();
    };
    let t = 900; SPLASH_SCRIPT.forEach((line, i) => { at(t, () => pop(line.who, line)); t += 1900; });
    at(t + 300, finale);
    el.onclick = () => { if (ready) { clearInterval(idle); beep('pop'); go('intro'); } else if (!done) finish(); else { clearInterval(idle); beep('pop'); go('intro'); } };
    el._cleanup = () => { clearInterval(idle); clearInterval(talkT); timers.forEach(clearTimeout); };
  } });

const INTRO = [
  { h: 'Kids have <em>questions.</em>', p: 'Big ones, small ones, “WHAT?!” ones.', art: 'kids4', ah: 170 },
  { h: 'Grown-ups get <em>nervous.</em>', p: 'Most don’t know how to start “The Talk”.', art: 'facesL', ah: 150 },
  { h: 'Let’s make it <em>not that awk.</em>', p: 'Tiny chats. Stories. Games. Giggles.', art: 'flower', ah: 176 },
];
reg('intro', { name: 'Welcome (new)', group: 'Onboarding', cls: 'intro',
  render: () => `<div class="copy"></div><div class="art"></div><div class="dots dk">${INTRO.map(() => '<i></i>').join('')}</div>
    <div class="foot"><button class="lt" data-act="go:language">${t('skip')}</button><button id="nx" data-act="noop">${t('next')}</button></div>`,
  mount: el => {
    let i = 0; const copy = $('.copy', el), art = $('.art', el), dots = $$('.dots i', el), nx = $('#nx', el);
    const draw = () => {
      const s = INTRO[i];
      copy.innerHTML = `<h2>${s.h}</h2><p>${s.p}</p>`;
      art.innerHTML = artImg(s.art, s.ah, 'sway');
      dots.forEach((d, k) => d.classList.toggle('on', k === i));
      nx.textContent = i === INTRO.length - 1 ? 'LET’S GO' : t('next');
      copy.style.animation = 'none'; void copy.offsetWidth; copy.style.animation = 'rise .5s both';
      art.firstChild.style.animation = 'artIn .7s cubic-bezier(.2,1.4,.4,1) both';
    };
    ACT.noop = () => { if (i < INTRO.length - 1) { i++; draw(); } else go('language'); };
    draw();
  } });

reg('language', { name: 'Language', group: 'Onboarding',
  render: () => `${closeB('langdone')}${hd(t('lang_q'), t('lang_t'))}
    <div class="langs">${D.LANGS.map(([c, n, en]) => `<button class="lang ${S.lang === c ? 'on' : ''}" data-act="lang:${c}">${n}<small>${en}</small></button>`).join('')}</div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('done'), act: 'langdone' }])}`,
});
ACT.lang = c => {
  if (c === 'en' || c === 'hi') { S.lang = c; save(); rerender(); }
  else toast('This language is coming soon. We’re building it with local educators.');
};
ACT.langdone = () => { const r = langReturn; langReturn = null; if (r && r !== 'language') go(r, cur.opts, { noPush: true }); else go('who'); };

const WHO = [
  { id: 'parent', art: 'parent', off: [-28, -20], k: 'parent_s' },
  { id: 'child', art: 'child', off: [-21, -20], k: 'child_s' },
  { id: 'other', art: 'other', off: [-2, 14], k: 'other_s' },
];
reg('who', { name: 'Who are we talking to?', group: 'Onboarding',
  render: () => `${gearB}${transB}${hd(t('who_q'))}
    <div class="who3">${WHO.map(w => `<button class="who ${S.roleChosen === w.id ? 'on' : ''}" data-act="who:${w.id}"><div class="box"><img src="${D.ART[w.art].src}" style="left:${w.off[0]}px;top:${w.off[1]}px;height:${D.ART[w.art].h}px" alt=""></div><h4>${t(w.id)}</h4><p>${t(w.k)}</p></button>`).join('')}</div>
    ${foot([{ l: t('exit'), act: 'exit', cls: 'lt' }, { l: t('cont'), act: 'whonext', id: 'nextB', cls: S.roleChosen ? 'pulse' : 'dis' }])}`,
});
ACT.who = id => { S.roleChosen = id; S.role = id; $$('.who').forEach(b => b.classList.toggle('on', b.dataset.act === 'who:' + id)); const n = $('#nextB'); n.classList.remove('dis'); n.classList.add('pulse'); };
ACT.whonext = () => go(S.roleChosen === 'child' ? 'kidgate' : 'comfort');

reg('kidgate', { name: 'Grown-up nearby? (new)', group: 'Onboarding',
  render: () => `<div class="cstack"><img class="sway" src="assets/who_child.png" alt="" style="height:130px"><h2 class="disp">Is a <span style="color:var(--orange)">grown-up</span> nearby?</h2>
      <p>Get one to say hi first. We talk <b>together</b>.</p>
      <div style="display:flex;gap:14px;justify-content:center"><button class="btn ol" data-act="go:consent">Yes, they’re here</button><button class="btn ghost" data-act="kidno">Not yet</button></div></div>${foot([{ l: t('back'), act: 'back', cls: 'lt' }])}`,
});
ACT.kidno = () => { toast('No worries! Come back with a grown-up and we’ll start.'); setTimeout(() => go('who'), 900); };

const faceSVG = lvl => `<svg viewBox="0 0 64 64"><polygon points="8,12 54,6 58,52 14,58" fill="#e35e26" stroke="#000" stroke-width="2.5"/>
  <circle cx="26" cy="28" r="7.5" fill="#fff" stroke="#000" stroke-width="2"/><circle cx="45" cy="27" r="7.5" fill="#fff" stroke="#000" stroke-width="2"/>
  <circle cx="${lvl === 2 ? 28 : 27}" cy="${lvl === 2 ? 30 : 28}" r="3.2" fill="#000"/><circle cx="${lvl === 2 ? 47 : 46}" cy="${lvl === 2 ? 29 : 27}" r="3.2" fill="#000"/>
  ${lvl === 0 ? '<path d="M21 43Q33 55 47 42" stroke="#000" stroke-width="3" fill="#fff"/>' : lvl === 1 ? '<path d="M22 46L47 44" stroke="#000" stroke-width="3.4" stroke-linecap="round"/>' : '<path d="M20 47q6-7 11 0t14-2" stroke="#000" stroke-width="3" fill="none" stroke-linecap="round"/>'}
  ${lvl === 2 ? '<path d="M56 12q5 8 0 11-5-3 0-11z" fill="#96c5d1" stroke="#000" stroke-width="1.5"/><path d="M6 30q4 7 0 9-4-2 0-9z" fill="#96c5d1" stroke="#000" stroke-width="1.5"/>' : ''}</svg>`;
reg('comfort', { name: 'Comfort slider (new)', group: 'Onboarding',
  render: () => `${gearB}${transB}${hd('How awk are you feeling?', t('profile'))}
    <div class="tone-copy" id="toneCopy"></div>
    <div class="slider" id="sl"><div class="trk"></div>${[0, 1, 2].map(i => `<i class="stop" style="left:${i * 50}%"></i><span class="lbl" data-i="${i}" style="left:${i * 50}%">${D.TONES[i].name}</span><button class="hit" data-i="${i}" style="left:${i * 50}%" aria-label="${D.TONES[i].name}"></button>`).join('')}<div class="knob" id="knob"></div></div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('cont'), act: 'go:arch' }])}`,
  mount: el => {
    const knob = $('#knob', el), lbls = $$('.lbl', el), copy = $('#toneCopy', el);
    const set = i => { S.tone = i; save(); knob.style.left = (i * 50) + '%'; knob.innerHTML = faceSVG(i); lbls.forEach((l, k) => l.classList.toggle('on', k === i));
      copy.innerHTML = D.TONES[i].sub; beep('pop'); };
    $$('.hit', el).forEach(b => b.onclick = () => set(+b.dataset.i)); set(S.tone);
    const sl = $('#sl', el); let drag = false;
    const mv = e => { const r = sl.getBoundingClientRect(); const rot = window.NTA_ROT; const p = rot ? (e.clientY - r.top) / r.height : (e.clientX - r.left) / r.width; const x = rot ? (e.clientY - r.top) / r.height : p; const i = Math.max(0, Math.min(2, Math.round(x * 2))); if (i !== S.tone) set(i); };
    knob.onpointerdown = e => { drag = true; knob.setPointerCapture(e.pointerId); }; knob.onpointermove = e => { if (drag) mv(e); }; knob.onpointerup = () => drag = false;
  } });

const ARCH = [
  { k: 'Avoider', o: 'Say, “We’ll talk later, beta.”', d: 'You change the subject when the big questions come. Totally human!', tip: 'Start tiny: roll the Awk Dice for a one-minute chat. No pressure, no lecture.' },
  { k: 'Researcher', o: 'Google it first. Maybe three videos.', d: 'You want to get it right, so you read everything first.', tip: 'Skip the 3 a.m. tabs. Our stories are written to be read together.' },
  { k: 'Worrier', o: 'Worry they’re growing up too fast.', d: 'You’re protective and afraid of saying too much, too soon.', tip: 'Gentle stories answer simply and honestly. Early truths protect kids.' },
  { k: 'Open Mentor', o: 'Say, “Good question. Let’s find out together.”', d: 'You already lean in, and your child knows it.', tip: 'Level up: try “Very Awk” mode and share your wins in Meet.' },
];
reg('arch', { name: 'Quick quiz (new)', group: 'Onboarding',
  render: () => `${gearB}${transB}${hd('When your child asks a big question, you…', t('profile'))}
    <div class="opts">${ARCH.map((a, i) => `<button class="opt" data-act="arch:${i}"><i>${'ABCD'[i]}</i>${a.o}</button>`).join('')}</div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('skip'), act: 'go:consent' }])}` });
ACT.arch = i => { S.arch = +i; save(); go('archres'); };
reg('archres', { name: 'Quiz result (new)', group: 'Onboarding',
  render: () => { const a = ARCH[S.arch == null ? 3 : S.arch]; return `${gearB}${hd('You’re…', t('profile'))}
    <div class="arch"><small>PARENT ARCHETYPE</small><h4>The ${a.k}</h4><p>${a.d}</p></div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('cont'), act: 'go:consent', cls: 'pulse' }])}`; } });

reg('consent', { name: 'Our promise (new)', group: 'Onboarding',
  render: () => `${gearB}${hd('Our promise to your family', t('profile'))}
    <div class="promise">${[
      ['#e35e26', 'No ads. Ever.', 'ban'],
      ['#653781', 'Safe, sticker-only chat', 'chat'],
      ['#59662e', 'You pick the stories', 'book'],
      ['#ffcb05', 'Your data stays yours', 'lock'],
    ].map(([c, h, i]) => `<div class="pr" style="--c:${c}">${promiseIcon(i, c)}<b>${h}</b></div>`).join('')}</div>
    <div class="agree"><button class="cb ${S.consent ? 'on' : ''}" data-act="agree"><i>${ICON.check}</i>I’m the parent or guardian, and I agree</button></div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('cont'), act: 'go:age', id: 'nextB', cls: S.consent ? 'pulse' : 'dis' }])}` });
function promiseIcon(k, c) {
  const m = { ban: '<circle cx="22" cy="22" r="14" fill="none" stroke="#000" stroke-width="4"/><path d="M12 32L32 12" stroke="#000" stroke-width="4"/>', chat: '<path d="M6 8h32v22H20l-9 7v-7H6z" fill="none" stroke="#000" stroke-width="3.5" stroke-linejoin="round"/><path d="M13 16h18M13 22h12" stroke="#000" stroke-width="3"/>', book: '<path d="M4 8h14a4 4 0 014 4v24a4 4 0 00-4-4H4zM40 8H26a4 4 0 00-4 4v24a4 4 0 014-4h14z" fill="none" stroke="#000" stroke-width="3.5" stroke-linejoin="round"/>', lock: '<rect x="8" y="20" width="28" height="20" fill="none" stroke="#000" stroke-width="3.5"/><path d="M14 20v-6a8 8 0 0116 0v6" fill="none" stroke="#000" stroke-width="3.5"/>' }[k];
  return `<svg viewBox="0 0 44 44"><rect x="2" y="2" width="40" height="40" fill="${c}" opacity=".18"/>${m}</svg>`;
}
ACT.agree = () => { S.consent = !S.consent; save(); $('.cb').classList.toggle('on', S.consent); const n = $('#nextB'); n.classList.toggle('dis', !S.consent); n.classList.toggle('pulse', S.consent); beep('tap'); };

/* age carousel */
const AGES = ['4-6', '7-9', '10-12'];
function ageCard(a) {
  if (a === '4-6') return `<div class="agec"><img src="assets/age_46.png" alt="4 to 6 years old"></div>`;
  if (a === '10-12') return `<div class="agec"><img src="assets/age_1012.png" style="width:334px" alt="10 to 12 years old"></div>`;
  return `<div class="agec a79"><div class="cardbox"><b>7-9 YEARS OLD</b><span class="t1"></span><span class="t2"></span><span class="gr"></span></div><img src="assets/age_79_chars.png" alt="7 to 9 years old"></div>`;
}
function carousel(el, sel, n, get, set, gap) {
  const items = $$(sel, el); let i = get();
  const place = () => items.forEach((it, k) => { const d = k - i; it.style.transform = `translateX(${d * gap}px) scale(${d === 0 ? 1 : .94})`; it.style.opacity = Math.abs(d) > 1 ? 0 : 1; it.style.pointerEvents = Math.abs(d) > 1 ? 'none' : 'auto'; it.style.zIndex = d === 0 ? 3 : 1; it.classList.toggle('cur', d === 0); });
  const mv = d => { const j = Math.max(0, Math.min(n - 1, i + d)); if (j !== i) { i = j; set(i); place(); beep('tap'); } };
  place(); items.forEach((it, k) => it.addEventListener('click', () => { if (k !== i) mv(k - i); else if (it.dataset.open) ACT[it.dataset.open](k, it); }));
  $$('.nv', el).forEach(b => b.onclick = () => mv(b.classList.contains('l') ? -1 : 1));
  let x0 = null; el.addEventListener('pointerdown', e => { x0 = (window.NTA_ROT ? e.clientY : e.clientX); }); el.addEventListener('pointerup', e => { if (x0 == null) return; const d = (window.NTA_ROT ? e.clientY : e.clientX) - x0; x0 = null; const sc = window.NTA_SCALE || 1; if (Math.abs(d) > 40 * sc) mv(d < 0 ? 1 : -1); });
  return { mv, place, idx: () => i };
}
reg('age', { name: 'How old is the child?', group: 'Onboarding',
  render: () => `${gearB}${closeB()}${hd(t('age_q'))}
    <div class="car">${AGES.map(a => `<div class="it">${ageCard(a)}</div>`).join('')}
      <button class="nv l" aria-label="Previous">${ICON.chevL}</button><button class="nv r" aria-label="Next">${ICON.chevR}</button></div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('cont'), act: 'go:avatar', cls: 'pulse' }])}`,
  mount: el => { carousel(el, '.it', 3, () => AGES.indexOf(draft.age), i => { draft.age = AGES[i]; }, 394); } });

reg('avatar', { name: 'Pick an avatar', group: 'Onboarding',
  render: () => `${gearB}${closeB()}${hd(t('av_q'), t('profile'), '', `<div class="agetag">[ ${draft.age} YEARS OLD ]</div>`)}
    <div class="avgrid">${D.AVATARS.map(a => `<button class="av ${draft.av === a ? 'on' : ''}" data-act="pickav:${a}" aria-label="${D.AV_NAME[a]}">${avImg(a)}</button>`).join('')}</div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('cont'), act: 'go:name', id: 'nextB', cls: draft.av ? 'pulse' : 'dis' }])}` });
ACT.pickav = a => { draft.av = a; $$('.av').forEach(b => b.classList.toggle('on', b.dataset.act === 'pickav:' + a)); const n = $('#nextB'); n.classList.remove('dis'); n.classList.add('pulse'); beep('pop'); };

reg('name', { name: 'What is the name?', group: 'Onboarding',
  render: () => `${gearB}${closeB()}${hd(t('name_q'))}
    <div class="namebox"><input id="nm" maxlength="10" value="${esc(draft.name)}" placeholder="Type a name" autocomplete="off" aria-label="Name"><div class="cnt"><span id="cn">${draft.name.length}</span>/10</div>
      <div class="hint">A nickname is perfect. Real names aren’t needed.</div>
      <button class="btn ye sm dice-btn" data-act="rollname">🎲 Surprise me</button></div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('cont'), act: 'namego', id: 'nextB', cls: draft.name ? 'pulse' : 'dis' }])}`,
  mount: el => { const inp = $('#nm', el); inp.oninput = () => { draft.name = inp.value.trim(); $('#cn', el).textContent = inp.value.length; setNext(el, !!draft.name); $('#nextB', el).classList.toggle('pulse', !!draft.name); }; } });
ACT.rollname = () => { const n = (pick(D.NAMES_A) + pick(D.NAMES_B)).slice(0, 10); draft.name = n; const i = $('#nm'); i.value = n; $('#cn').textContent = n.length; const b = $('#nextB'); b.classList.remove('dis'); b.classList.add('pulse'); beep('pop'); };
ACT.namego = () => {
  const nm = draft.name || 'Friend'; const ex = S.profiles.find(p => p.name.toLowerCase() === nm.toLowerCase());
  const p = ex || { id: 'p' + Date.now(), name: nm, av: 'deer', age: '4-6' }; p.av = draft.av || p.av; p.age = draft.age; p.name = nm;
  if (!ex) { if (S.profiles.length >= 10) S.profiles.pop(); S.profiles.unshift(p); } S.cur = p.id; save(); draft.name = ''; draft.av = null; go('users');
};

reg('users', { name: 'Who’s using the app?', group: 'Onboarding',
  render: () => { const slots = []; for (let i = 0; i < 10; i++) slots.push(S.profiles[i] || (i === S.profiles.length ? 'add' : null));
    return `${gearB}${closeB()}${hd(t('users_q'))}
    <div class="users">${slots.map(p => p === 'add' ? `<div class="u add"><button class="sq" data-act="adduser" aria-label="Add profile"><span>+</span></button><div class="nm"></div></div>`
      : p ? `<div class="u f ${p.id === S.cur ? 'on' : ''}"><button class="sq" data-act="useuser:${p.id}">${avImg(p.av)}</button><button class="x" data-act="rmuser:${p.id}" aria-label="Remove ${esc(p.name)}">${ICON.x}</button><div class="nm">${esc(p.name)}</div></div>`
      : `<div class="u"><div class="sq"></div><div class="nm"></div></div>`).join('')}</div>
    ${foot([{ l: t('done'), act: 'go:hub', cls: 'pulse' }])}`; } });
ACT.useuser = id => { S.cur = id; save(); $$('.u.f').forEach(u => u.classList.toggle('on', u.querySelector('.sq').dataset.act === 'useuser:' + id)); beep('pop'); setTimeout(() => go('hub'), 350); };
ACT.adduser = () => { draft.name = ''; draft.av = null; go('age'); };
ACT.rmuser = id => gate(() => { if (S.profiles.length < 2) return toast('Keep at least one profile.'); S.profiles = S.profiles.filter(p => p.id !== id); if (S.cur === id) S.cur = S.profiles[0].id; save(); rerender(); }, 'Removing a profile is for grown-ups.');

/* ------------------------------------------------------------------ HOME hub (“Why are you here today?”) */
const TILES = [
  { id: 'play', cls: 't-play', go: 'playhub', art: 'play', st: 'left:-6px;top:-20px;height:136px', k: 'play_s' },
  { id: 'learn', cls: 't-learn', go: 'learn', art: 'learn', st: 'left:-2px;top:-8px;height:124px', k: 'learn_s' },
  { id: 'meet', cls: 't-meet', go: 'meethub', art: 'meet', st: 'left:-14px;top:-20px;height:140px', k: 'meet_s' },
];
reg('hub', { name: 'Why are you here today?', group: 'Home',
  render: () => `${gearB}${transB}${chipHTML('sm')}${hd(t('why_q'))}
    <div class="tiles">${TILES.map(x => `<button class="tile ${x.cls}" data-act="tile:${x.id}"><div class="face"><img src="${D.ART[x.art].src}" style="${x.st}" alt=""><h4>${t(x.id)}</h4></div><p>${t(x.k)}</p></button>`).join('')}</div>
    <div class="statpills"><button class="stat" data-act="go:stickers">${ICON.star}<span>${S.stars}</span></button><button class="stat" data-act="cueofday" aria-label="Today’s cue card">${ICON.flame}<span>Today’s cue</span></button></div>
    ${foot([{ l: 'SWITCH', act: 'go:users', cls: 'lt' }])}` });
ACT.tile = id => { const x = TILES.find(a => a.id === id); $$('.tile').forEach(b => b.classList.toggle('on', b.dataset.act === 'tile:' + id)); setTimeout(() => go(x.go), 380); };
ACT.cueofday = () => {
  const lvl = D.TONES[S.tone].max; const pool = D.DICE.flatMap(d => d.cards.filter(c => c[0] <= lvl).map(c => ({ d, c })));
  const day = new Date().getDate(); const x = pool[day % pool.length];
  modal(`<div class="sheet" style="left:230px;top:70px;width:470px;padding:26px 28px;box-shadow:0 0 0 3px #000,10px 10px 0 3px var(--yellow)"><div class="disp" style="font-size:13px;letter-spacing:1.5px;color:${x.d.c}">TODAY’S CUE · ${x.d.label.toUpperCase()}</div>
    <p style="margin:10px 0 20px;font:800 22px/1.3 var(--body)">${esc(x.c[1])}</p><div style="display:flex;gap:12px;justify-content:flex-end"><button class="btn ghost sm" data-close>Maybe later</button><button class="btn ol sm" data-did>We talked! +2 ★</button></div></div>`);
  $('#modal [data-close]').onclick = closeModal; $('#modal [data-did]').onclick = () => { closeModal(); S.talks++; addStars(2, 'a cue-card chat'); };
};

/* ------------------------------------------------------------------ LEARN */
const zoneFilter = { z: 'all' };
const thumbHTML = s => { const e = effStory(s); return `<div class="th"><svg viewBox="0 0 932 430" preserveAspectRatio="xMidYMid slice">${SCN[s.thumb](e.ctx)}</svg>${s.real ? `<span class="rl">REAL STORY</span>` : ''}</div>`; };
reg('learn', { name: 'Learn · story library', group: 'Learn', cls: '',
  render: () => {
    const p = prof(); const list = D.STORIES.filter(s => storyOn(p.id, s) && (zoneFilter.z === 'all' || s.zone === zoneFilter.z));
    return `${gearB}${closeB('back')}${chipHTML()}
    <div class="pills"><button class="${zoneFilter.z === 'all' ? 'on' : ''}" data-act="zf:all">All</button>${D.ZONES.map(z => `<button class="${zoneFilter.z === z.id ? 'on' : ''}" data-act="zf:${z.id}">${z.name}</button>`).join('')}</div>
    ${list.length ? `<div class="lcar">${list.map(s => `<div class="lc" data-open="openstory" data-id="${s.id}"><div class="lc-cap">${esc(s.title)}</div><div class="thw">${thumbHTML(s)}${s.minAge > ageMin(p) ? `<div class="lk2">${s.minAge}+ · unlocked by a grown-up</div>` : ''}</div></div>`).join('')}
      <button class="nv l" aria-label="Previous">${ICON.chevL}</button><button class="nv r" aria-label="Next">${ICON.chevR}</button></div>`
      : `<div class="abs" style="left:0;right:0;top:170px;text-align:center"><h3 class="disp" style="font-size:26px;margin:0 0 8px">No stories here yet</h3><p style="font:600 14px var(--body);color:#777;margin:0">A grown-up can switch more stories on.</p></div>`}
    <div class="learn-actions"><button class="btn ghost sm" data-act="back">${t('back')}</button><button class="btn sm" style="white-space:nowrap" data-act="gated:topics">${ICON.lock.replace('currentColor', '#fff').replace('<svg','<svg width="16" height="16"')} ${t('grownups')}</button></div>`;
  },
  mount: el => {
    const items = $$('.lc', el); if (!items.length) return;
    const k = carousel(el, '.lc', items.length, () => S._li || 0, i => { S._li = i; }, 392);
    ACT.openstory = (i, it) => go('story', { id: it.dataset.id });
    
  } });
ACT.zf = z => { zoneFilter.z = z; S._li = 0; rerender(); };

/* topics manager (variation 3) */
const mgr = { z: 'all', page: 0 };
reg('topics', { name: 'Choose topics (grown-ups)', group: 'Learn',
  render: () => { const p = prof();
    const all = D.STORIES.filter(s => mgr.z === 'all' || s.zone === mgr.z); const pages = Math.max(1, Math.ceil(all.length / 3)); mgr.page = Math.min(mgr.page, pages - 1);
    const vis = all.slice(mgr.page * 3, mgr.page * 3 + 3);
    return `${gearB}${closeB('back')}<div class="eyebrow"><h2>${t('profile')}</h2><h3>${t('topics_q')} <b>${esc(p.name)}</b></h3><p>${t('topics_s')}</p></div>
    <div class="tm-cards">${vis.map((s, i) => { const on = storyOn(p.id, s); return `<div class="tc z-${s.zone} ${on ? '' : 'off'}" style="--rot:${[-3, 2, -2][i]}deg" data-id="${s.id}">
      <button class="ck" data-act="tog:${s.id}" aria-label="${on ? 'Remove from library' : 'Add to library'}">${ICON.check}</button>
      ${s.minAge > ageMin(p) ? `<span class="lk">${s.minAge}+</span>` : ''}<h5>${esc(s.title)}</h5>
      <div class="wmsvg"><svg viewBox="0 0 932 430" preserveAspectRatio="xMidYMid slice">${SCN[s.thumb](effStory(s).ctx)}</svg></div>
      <button class="pv" data-act="preview:${s.id}">Preview ${ICON.play}</button></div>`; }).join('')}</div>
    <div class="tm-pager"><button class="btn sm ghost" data-act="mpage:-1" ${mgr.page === 0 ? 'disabled' : ''}>‹</button> ${mgr.page + 1} / ${pages} <button class="btn sm ghost" data-act="mpage:1" ${mgr.page >= pages - 1 ? 'disabled' : ''}>›</button></div>
    <div class="zones"><button class="all ${mgr.z === 'all' ? 'on' : ''}" data-act="mz:all">See All</button>${D.ZONES.map(z => `<button class="${mgr.z === z.id ? 'on' : ''}" data-act="mz:${z.id}">${ICON[z.icon]}${z.name}</button>`).join('')}</div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('done'), act: 'go:learn' }])}`; } });
ACT.mz = z => { mgr.z = z; mgr.page = 0; rerender(); };
ACT.mpage = d => { mgr.page += +d; rerender(); };
ACT.tog = id => { const p = prof(); const s = D.STORIES.find(x => x.id === id); S.en[p.id] = S.en[p.id] || {}; S.en[p.id][id] = !storyOn(p.id, s); save(); const card = $(`.tc[data-id="${id}"]`); card && card.classList.toggle('off', !S.en[p.id][id]); toast(S.en[p.id][id] ? `${p.name} can now see this story` : `Hidden from ${p.name}`); };
ACT.preview = id => {
  const s0 = D.STORIES.find(x => x.id === id), s = effStory(s0), p = prof(); let i = 0; const on = () => storyOn(p.id, s0);
  const draw = () => { $('#modal').innerHTML = `<div class="sheet" style="left:34px;top:30px;width:864px;height:372px">
    <button class="ib x" style="left:16px;top:12px;width:50px;height:50px" data-close aria-label="Close">${ICON.x}</button>
    <div class="pv-l"><h4>${esc(s.title)}</h4><p>${esc(s.desc)}</p><div class="tags"><span>${s.tone}</span><span>${ICON.clock} ${s.mins} min</span><span>${s.minAge}+</span></div>
      <button class="big ${on() ? '' : 'en'}" data-t>${on() ? ICON.hide + ' Remove from Library' : ICON.eye + ' Enable this Story'}</button>
      <div class="note">${on() ? `${esc(p.name)} currently has access to this story.` : `${esc(p.name)} cannot see this story right now.`}</div></div>
    <div class="pv-r"><b>${ICON.book} STORY PREVIEW</b><div class="ms"><div class="mini">${slideHTML(s.slides[i], s, i, true)}</div></div><button class="chev" data-n aria-label="Next preview slide">${ICON.chevD}</button></div></div>`;
    $('#modal [data-close]').onclick = () => { closeModal(); rerender(); };
    $('#modal [data-t]').onclick = () => { ACT.tog(id); draw(); };
    $('#modal [data-n]').onclick = () => { i = (i + 1) % s.slides.length; draw(); beep('tap'); };
  };
  modal(''); draw();
};

/* ------------------------------------------------------------------ STORY reader */
const BGC = { peach: 'bg-peach', cream: 'bg-cream', olive: 'bg-olive', yellow: 'bg-yellow', purple: 'bg-purple', orange: 'bg-orange', sky: 'bg-sky', navy: 'bg-navy' };
function slideHTML(s, st, idx, mini) {
  let h = `<div class="sl ${s.scene || s.w === 'facts' ? 'bg-scene' : (BGC[s.bg] || 'bg-peach')}" data-i="${idx}" style="${mini ? 'transform:none;opacity:1' : ''}">`;
  if (s.scene && window.SCN && SCN[s.scene]) {
    h += `<div class="scn"><svg viewBox="0 0 932 430" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${SCN[s.scene](s.ctx || { tier: 'y', tone: 1 })}</svg></div>`;
    if (s.tone) h += `<div class="tonechip">${['Diagram view', 'Simple view', 'Gentle view'][(s.ctx && s.ctx.tone) || 0]}</div>`;
    const len = (s.t || '').length, w = Math.max(280, Math.min(470, 120 + len * 3.1)), fs = len > 130 ? 14 : len > 90 ? 15 : 16.5, lines = Math.ceil(len * (fs * .52) / (w - 60)), hh = Math.max(56, 36 + lines * (fs * 1.38));
    h += `<div class="banner b1 cap" style="left:84px;top:16px;width:${w}px;height:${hh}px;font-size:${fs}px">${esc(s.t || '')}</div>`;
    return h + '</div>';
  }
  if (s.w === 'facts') {
    const f = s.facts;
    return h + `<div class="facts"><small>REAL LIFE · GO DEEPER</small><h4>Fast facts</h4><ul>${f.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>${f.quote ? `<blockquote>${esc(f.quote)}</blockquote>` : ''}</div></div>`;
  }
  if (s.art) {
    const a = D.ART[s.art]; const ap = s.ap || {}; const pos = ap.l != null ? `left:${ap.l}px` : `right:${ap.r}px`;
    h += `<img class="art sway" src="${a.src}" alt="" style="height:${s.h || a.h}px;${pos};bottom:${ap.b || 20}px">`;
  }
  if (s.t && !['voice', 'trust', 'choice', 'emoflower'].includes(s.w)) {
    const bp = s.bp || [60, 50, 400, 90]; const len = s.t.length; const fs = len > 150 ? 13 : len > 100 ? 14.5 : 16;
    const right = s.art && ap_isRight(s) ? '' : '';
    h += `<div class="banner ${s.b || 'b1'} ${s.bg === 'orange' ? 'alt' : ''} ${s.side === 'c' && bp[0] > 400 ? 'right' : ''}" style="left:${bp[0]}px;top:${bp[1]}px;${bp[2] ? `width:${bp[2]}px;` : ''}${bp[3] ? `height:${bp[3]}px;` : ''}font-size:${fs}px">${esc(s.t).replace(/\n/g, '<br>')}</div>`;
  }
  if (s.w) h += widgetHTML(s, st, idx);
  return h + '</div>';
}
function ap_isRight() { return false; }
function widgetHTML(s, st, idx) {
  switch (s.w) {
    case 'palette': return `<div class="swatches" style="left:60px;top:170px">${PET.map((c, i) => `<button class="sw" style="background:${c};--r:${(i % 5 - 2) * 4}deg" data-c="${c}" aria-label="Colour ${i + 1}"></button>`).join('')}</div>
      <div class="abs" style="left:420px;top:10px;width:420px;height:430px">${flowerSVG({ fills: Array(12).fill(null), stroke: '#fff', style: 'width:420px;height:466px' })}</div>`;
    case 'choice': return `<div class="banner b3 ${s.bg === 'orange' ? 'alt' : ''}" style="left:166px;top:30px;width:600px;height:78px;font-size:17px">${esc(s.q)}</div>
      <div class="choice" style="left:251px;top:124px;width:430px">${s.opts.map((o, i) => `<button data-o="${i}">${esc(o[0])}</button>`).join('')}</div><div class="fb" style="left:166px;top:298px;width:600px;text-align:center;display:none"></div>
      <svg class="art sway chart" viewBox="-10 -60 150 390" style="height:200px;right:34px;bottom:10px;width:auto">${ART.person(ART.P(['mini', 'riya', 'arjun', 'meera'][idx % 4], { pose: 'think', ex: 'curious', kid: 1 }))}</svg>`;
    case 'emoflower': return `<div class="abs" style="left:20px;top:0;width:360px">${flowerSVG({ cols: D.EMOS.map(e => e.c), click: true, style: 'width:360px;height:400px' })}</div><div class="ef-panel-slot abs" style="left:420px;top:90px;width:480px"><div class="ef-empty" style="position:static;width:auto;padding-top:60px">${esc(s.t)}<small>Each petal is a feeling.</small></div></div>`;
    case 'cells': { const n = D.STORIES.find(x => x.id === st.id).slides.filter(x => x.w === 'cells'); const k = n.indexOf(s); return cellsSVG(k); }
    case 'voice': return `<div class="banner b3" style="left:96px;top:34px;width:600px;height:70px;font-size:17px">${esc(s.t)}</div>
      <div class="abs" style="left:0;right:0;top:130px;text-align:center"><div class="vmeter" style="width:420px;height:22px;margin:0 auto 18px;background:#ffffff30;transform:skewX(-16deg);position:relative;box-shadow:0 0 0 2px #fff"><i style="position:absolute;left:0;top:0;bottom:0;width:0;background:var(--yellow)"></i></div>
      <button class="btn or voice" style="font-size:44px;padding:26px 56px;touch-action:none">NO!</button><div class="vsay disp" style="color:#fff;margin-top:16px;font-size:22px;height:28px"></div></div>`;
    case 'trust': return `<div class="banner b3" style="left:96px;top:34px;width:600px;height:66px;font-size:17px">${esc(s.t)}</div>
      <div class="abs hand5" style="left:520px;top:104px;width:380px;height:300px"></div>
      <div class="choice trustc" style="left:96px;top:130px;width:420px;flex-direction:row;flex-wrap:wrap;gap:10px">${['Mum', 'Dad', 'Grandparent', 'Teacher', 'Aunt / Uncle', 'Doctor', 'Older sibling', 'Neighbour'].map(n => `<button data-p="${n}" style="padding:10px 14px;font-size:14px">${n}</button>`).join('')}</div>`;
  }
  return '';
}
function cellsSVG(k) {
  const egg = `<circle cx="0" cy="0" r="56" fill="#ffecba" stroke="#000" stroke-width="3"/><circle cx="0" cy="0" r="22" fill="#ffcb05" stroke="#000" stroke-width="2.5"/>`;
  const sperm = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="14" ry="10" fill="#653781" stroke="#000" stroke-width="2.5"/><path d="M-14 0q-18 -10 -30 0t-30 0" stroke="#653781" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
  const lab = (x, y, t) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Black Han Sans" font-size="18" fill="#fff">${t}</text>`;
  const body = k === 0 ? `<g transform="translate(250 250)" style="animation:bnc 2s infinite"><circle r="6" fill="#ffcb05" stroke="#000" stroke-width="1.5"/></g><g transform="translate(480 230)" style="animation:bnc 2.4s infinite"><circle r="5" fill="#653781"/></g>${lab(250, 290, 'too tiny!')}`
    : k === 1 ? `<g transform="translate(240 250)">${egg}</g>${sperm(520, 240, 160)}${lab(240, 336, 'EGG')}${lab(520, 280, 'SPERM')}`
      : `<g transform="translate(330 250)"><circle r="70" fill="#ffecba" stroke="#000" stroke-width="3"/><circle r="30" fill="#ffcb05" stroke="#000" stroke-width="3" style="animation:pulseT 1.6s infinite"/></g>${lab(330, 350, 'a baby begins to grow')}${[0, 1, 2].map(i => `<circle cx="${430 + i * 14}" cy="${200 - i * 12}" r="${5 - i}" fill="#fff" opacity=".7"/>`).join('')}`;
  return `<svg class="abs" viewBox="0 0 932 430" style="left:0;top:0;width:932px;height:430px;pointer-events:none"><g transform="translate(110 50)">${body}</g></svg>`;
}

reg('story', { name: 'Story reader', group: 'Learn', cls: 'story',
  render: o => { const s = effStory(D.STORIES.find(x => x.id === (o.id || 'pink'))); return `<div class="stg">${s.slides.map((sl, i) => slideHTML(sl, s, i)).join('')}</div>
    ${backB}<button class="ib snd" data-act="speakit" aria-label="Read aloud">${ICON.speak}</button>
    <button class="s-prev" data-act="sprev" aria-label="Previous">${ICON.chevL}</button><button class="s-next" data-act="snext" aria-label="Next">${ICON.chevR}</button>
    <div class="dots">${s.slides.map(() => '<i></i>').join('')}</div>`; },
  mount: (el, o) => {
    const s = effStory(D.STORIES.find(x => x.id === (o.id || 'pink'))); const sl = $$('.sl', el), dots = $$('.dots i', el); let i = 0; const need = {};
    const lockNext = () => { const w = s.slides[i].w; const nx = $('.s-next', el); const gated = w && ['palette', 'choice', 'voice', 'trust'].includes(w) && !need[i]; nx.style.opacity = gated ? .35 : 1; nx.style.pointerEvents = gated ? 'none' : 'auto'; };
    const show = n => {
      i = Math.max(0, Math.min(s.slides.length - 1, n));
      sl.forEach((e, k) => { e.style.transform = `translateX(${(k - i) * 100}%)`; e.style.opacity = k === i ? 1 : 0; e.classList.toggle('act', k === i); });
      dots.forEach((d, k) => d.classList.toggle('on', k === i)); $('.s-prev', el).style.visibility = i === 0 ? 'hidden' : 'visible'; lockNext();
      if (S.read && !s.slides[i].w) speak(s.slides[i].t || '');
    };
    ACT.snext = () => { if (i >= s.slides.length - 1) { go('done', { id: s.id }); } else show(i + 1); };
    ACT.sprev = () => show(i - 1);
    ACT.speakit = () => { const t0 = s.slides[i].t || s.slides[i].q || ''; speak(t0); $('.snd', el).classList.add('on'); setTimeout(() => $('.snd', el).classList.remove('on'), 2500); };
    sl.forEach((e, k) => { e.style.transition = 'none'; }); show(+o.slide || 0); requestAnimationFrame(() => sl.forEach(e => e.style.transition = ''));
    let x0 = null; el.onpointerdown = e => { x0 = window.NTA_ROT ? e.clientY : e.clientX; }; el.onpointerup = e => { if (x0 == null) return; const d = (window.NTA_ROT ? e.clientY : e.clientX) - x0; x0 = null; if (Math.abs(d) > 50 * (window.NTA_SCALE || 1)) { d < 0 ? (lockNext(), $('.s-next', el).style.pointerEvents !== 'none' && ACT.snext()) : ACT.sprev(); } };
    const keyh = e => { if (cur.id !== 'story') return document.removeEventListener('keydown', keyh); if (e.key === 'ArrowRight') $('.s-next', el).style.pointerEvents !== 'none' && ACT.snext(); if (e.key === 'ArrowLeft') ACT.sprev(); }; document.addEventListener('keydown', keyh);
    bindWidgets(el, s, sl, need, lockNext);
  } });

function bindWidgets(el, s, sl, need, lockNext) {
  s.slides.forEach((slide, k) => {
    const root = sl[k]; if (!slide.w) return;
    if (slide.w === 'palette') {
      const pts = $$('.pt', root); let used = 0;
      $$('.sw', root).forEach(b => b.onclick = () => { if (b.classList.contains('used') || used >= 12) return; const p = pts[used++]; p.setAttribute('fill', b.dataset.c); p.classList.remove('empty'); p.classList.add('pop'); setTimeout(() => p.classList.remove('pop'), 400); b.classList.add('used'); beep('pop');
        if (used === 12) { need[k] = 1; confetti(); beep('win'); toast('It bloomed! 🌸'); lockNext(); } else if (used >= 4) { need[k] = 1; lockNext(); } });
    }
    if (slide.w === 'choice') {
      $$('[data-o]', root).forEach(b => b.onclick = () => { const o = slide.opts[+b.dataset.o]; $$('[data-o]', root).forEach(x => x.classList.remove('ok', 'no')); b.classList.add(o[1]); const fb = $('.fb', root); fb.style.display = 'block'; fb.textContent = o[2]; fb.style.animation = 'none'; void fb.offsetWidth; fb.style.animation = ''; beep(o[1] === 'ok' ? 'ok' : 'no'); if (o[1] === 'ok') { need[k] = 1; lockNext(); } });
    }
    if (slide.w === 'emoflower') { bindEmo(root, $('.ef-panel-slot', root)); need[k] = 1; }
    if (slide.w === 'voice') {
      const btn = $('.voice', root), bar = $('.vmeter i', root), say = $('.vsay', root); let v = 0, raf = 0, down = false, t0 = 0;
      const tick = () => { if (!down) return; v = Math.min(100, (performance.now() - t0) / 14); bar.style.width = v + '%'; btn.style.transform = `scale(${1 + v / 220})`; raf = requestAnimationFrame(tick); };
      const start = e => { e.preventDefault(); down = true; t0 = performance.now(); say.textContent = ''; tick(); beep('pop'); };
      const end = () => { if (!down) return; down = false; cancelAnimationFrame(raf); btn.style.transform = ''; if (v >= 90) { say.textContent = 'THAT’S A STRONG VOICE!'; confetti(30); beep('win'); need[k] = 1; lockNext(); } else say.textContent = 'Louder! Hold a little longer.'; setTimeout(() => { bar.style.width = '0'; }, 700); };
      btn.addEventListener('pointerdown', start); window.addEventListener('pointerup', end); btn.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { start(e); setTimeout(end, 1500); } });
    }
    if (slide.w === 'trust') {
      const hand = $('.hand5', root); const sel = (S.trusted || []).slice(0, 5);
      const tips = [[322, 190], [276, 84], [226, 66], [176, 82], [124, 108]], cols5 = ['#e35e26', '#653781', '#9ca32f', '#ffcb05', '#96c5d1'];
      const draw = () => { hand.innerHTML = `<svg viewBox="0 0 380 300" width="380" height="300"><g fill="#fff" stroke="#000" stroke-width="4" stroke-linejoin="round">
        <rect x="102" y="86" width="44" height="130" rx="22"/><rect x="154" y="62" width="46" height="150" rx="23"/><rect x="206" y="46" width="46" height="160" rx="23"/><rect x="258" y="64" width="46" height="150" rx="23"/>
        <rect x="290" y="172" width="86" height="44" rx="22" transform="rotate(-38 300 192)"/><path d="M104 190h200v40c0 38-34 60-100 60S104 268 104 228z"/></g>
        <g fill="#fff"><rect x="108" y="196" width="190" height="14"/></g>
        ${tips.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${sel[i] ? 24 : 17}" fill="${sel[i] ? cols5[i] : '#00000012'}" stroke="#000" stroke-width="${sel[i] ? 3 : 1.5}" stroke-dasharray="${sel[i] ? 0 : '4 4'}" style="transition:.3s"/>${sel[i] ? `<text x="${x}" y="${y + 40}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="12" fill="#000">${esc(sel[i].split(' ')[0])}</text>` : ''}`).join('')}</svg>`; };
      draw(); if (sel.length >= 3) need[k] = 1;
      $$('[data-p]', root).forEach(b => { if (sel.includes(b.dataset.p)) b.classList.add('ok'); b.onclick = () => { const n = b.dataset.p; const j = sel.indexOf(n); if (j >= 0) { sel.splice(j, 1); b.classList.remove('ok'); } else if (sel.length < 5) { sel.push(n); b.classList.add('ok'); beep('pop'); } else toast('Five fingers, five people. Remove one first!'); S.trusted = sel; save(); draw(); if (sel.length >= 3) { need[k] = 1; lockNext(); } if (sel.length === 5) { confetti(30); beep('win'); } }; });
    }
  });
}
function bindEmo(root, panel) {
  const pts = $$('.pt', root);
  pts.forEach((p, i) => { p.onclick = () => { const e = D.EMOS[i]; pts.forEach(x => x.classList.remove('pop')); p.classList.add('pop'); beep('pop');
    const dark = ['#ffcb05', '#96c5d1', '#edd25a'].includes(e.c);
    panel.innerHTML = `<div class="ef-panel" style="position:static;left:auto;top:auto;width:auto;background:${e.c};color:${dark ? '#111' : '#fff'};box-shadow:8px 8px 0 #0003"><h4>${e.n}</h4><div class="row"><b>In my body</b>${e.body}</div><div class="row"><b>What can I do?</b>${e.do}</div></div>`; }; });
}
window.NTA_bindEmo = bindEmo;

reg('done', { name: 'Story complete + cue cards', group: 'Learn', cls: 'done',
  render: o => { const s = D.STORIES.find(x => x.id === (o.id || 'pink')); return `${closeB('go:learn')}${hd('Story complete!', 'WELL DONE')}
    <div class="stars" style="top:96px;z-index:4">${[1, 2, 3].map(() => ICON.star).join('')}</div>
    <div class="cue c-or" style="left:150px;top:196px;--r:-3deg"><small>${s.talk[0][0]}</small>${esc(s.talk[0][1])}</div>
    <div class="cue c-pu" style="left:420px;top:204px;--r:2.5deg"><small>${s.talk[1][0]}</small>${esc(s.talk[1][1])}</div>
    <div class="abs" style="left:0;right:0;top:174px;text-align:center;font:800 12px var(--body);color:#888;letter-spacing:.8px">NOW TALK ABOUT IT TOGETHER</div>
    <div class="abs" style="left:680px;top:204px;width:210px;display:flex;flex-direction:column;gap:12px"><button class="btn ol" data-act="talked:${s.id}">We talked! +2 ★</button><button class="btn ye" data-act="go:learn">More stories</button><button class="btn ghost" data-act="go:hub">Home</button></div>`; },
  mount: (el, o) => { const s = D.STORIES.find(x => x.id === (o.id || 'pink')); beep('win'); confetti(50); if (!S.seen.includes(s.id)) { S.seen.push(s.id); S.week[6] = (S.week[6] || 0) + 1; addStars(3, 'finishing a story'); } } });
ACT.talked = () => { S.talks++; save(); addStars(2, 'talking together'); setTimeout(() => go('hub'), 1400); };

/* ------------------------------------------------------------------ presenter shell, scaling, boot */
window.NTA = { S, D, go, back, ACT, reg, SC, ORDER, t, ICON, toast, modal, closeModal, gate, confetti, beep, speak, save, addStars, prof, ageMin, storyOn, avImg, artImg, foot, hd, gearB, transB, closeB, backB, chipHTML, flowerSVG, esc, pick, rnd, rerender, carousel, hist, faceSVG, stars, draft, cur: () => cur };
function buildSide() {
  const groups = {}; ORDER.forEach(id => { const g = SC[id].group; (groups[g] = groups[g] || []).push(id); });
  $('#side nav').innerHTML = Object.entries(groups).map(([g, ids]) => `<h6>${g}</h6>${ids.map(id => `<button data-id="${id}"><span>${SC[id].name}</span>${/new/.test(SC[id].name) ? '<em>NEW</em>' : ''}</button>`).join('')}`).join('');
  $$('#side nav button').forEach(b => b.onclick = () => { go(b.dataset.id, b.dataset.id === 'story' || b.dataset.id === 'done' ? { id: 'colours' } : {}); });
}
function fit() {
  const vp = $('#viewport'), dev = $('#device'); const w = vp.clientWidth, h = vp.clientHeight;
  const portrait = h > w * 1.1 && w < 900; window.NTA_ROT = false;
  const pad = portrait ? 6 : 28; const sc = Math.min((w - pad * 2) / 932, (h - pad * 2) / 430);
  window.NTA_SCALE = sc; dev.style.transform = `scale(${sc})`;
  const hint = $('#rotHint'); if (hint) hint.hidden = !portrait;
}
function boot() {
  buildSide(); fit(); addEventListener('resize', fit);
  $('#sideToggle').onclick = () => document.body.classList.toggle('noside');
  $('#resetBtn').onclick = () => { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); };
  $('#sideHide').onclick = () => document.body.classList.add('noside');
  addEventListener('keydown', e => { if (e.key === 'p' && !/INPUT/.test(e.target.tagName)) document.body.classList.toggle('noside'), setTimeout(fit, 30); });
  new ResizeObserver(fit).observe($('#viewport'));
  const q = new URLSearchParams(location.search); const s = q.get('s');
  render(SC[s] ? s : 'splash', q.get('id') ? { id: q.get('id'), slide: q.get('slide') } : {});
}
window.NTA_boot = boot;
})();
