/* Not That Awk — core: state, age zones, calm router, shared UI, sound/speech, presenter shell. */
(() => {
'use strict';
const D = window.DATA, A = window.ART;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = a => a[Math.floor(Math.random() * a.length)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ------------------------------------------------------------------ state */
const KEY = 'nta-proto-v3';
const DEMO = [
  { id: 'd1', name: 'Aarav', av: 'a:deer', tier: '4-6' },
  { id: 'd2', name: 'Shreya', av: 'a:goat', tier: '7-9' },
  { id: 'd3', name: 'Midha', av: 't:2', tier: '10-12' },
  { id: 'd4', name: 'Kabir', av: 'g:3', tier: '13+' },
];
const defaults = () => ({
  lang: 'en', tone: 1, sound: true, read: true, role: null, consent: false, arch: null, onboarded: false,
  profiles: [], cur: null, stars: 3, talks: 2, awk: [2, 3, 3, 4], week: [2, 4, 3, 5, 2, 6, 4], chal: [true, false, false],
  trusted: [], limit: 30, prog: {}, en: {}, ceil: {}, teenPriv: true, together: false, code: 'AWK-4821', me2: {}, linked: {}, nextAge: null,
});
let S;
try { S = Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = defaults(); }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
const draft = { tier: '4-6', av: null, name: '', age: null };
const prof = () => S.profiles.find(p => p.id === S.cur) || S.profiles[0] || DEMO[0];
const tierOf = p => D.TIERS[D.tierIdx((p || prof()).tier)];
const tier = () => tierOf(prof());
const prog = (pid) => (S.prog[pid || prof().id] = S.prog[pid || prof().id] || { stories: {}, games: {}, chats: 0, takes: [] });
const ceilIdx = p => D.tierIdx(S.ceil[p.id] || p.tier);
const storyOn = (p, s) => {
  const o = S.en[p.id] && S.en[p.id][s.id]; if (o !== undefined) return o;
  return s.tiers.includes(p.tier) && D.tierIdx(p.tier) <= ceilIdx(p);
};
const zoneName = (z, tid) => { const Z = D.ZONES.find(x => x.id === z); return (tid === '4-6' || tid === '7-9') ? Z.nl : Z.n; };
const t = k => (D.T[S.lang] && D.T[S.lang][k]) || D.T.en[k] || k;
const ensureDemo = () => { if (!S.profiles.length) { S.profiles = DEMO.map(x => ({ ...x })); S.cur = 'd1'; S.role = S.role || 'kid'; save(); } };

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
ICON.chat = `<svg viewBox="0 0 24 24"><path d="M4 5h16v11H11l-5 4v-4H4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`;
ICON.info = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v6M12 7.5v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
ICON.pause = `<svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/></svg>`;
ICON.playw = `<svg viewBox="0 0 24 24"><path d="M8 5l12 7-12 7z" fill="#fff"/></svg>`;
ICON.together = `<svg viewBox="0 0 54 54"><circle cx="19" cy="17" r="7" fill="#000"/><circle cx="37" cy="21" r="5.5" fill="#000"/><path d="M5 44c0-9 6-15 14-15s14 6 14 15zM30 44c0-6 4-11 9-11s9 5 9 11z" fill="#000"/></svg>`;
ICON.eyeoff = `<svg viewBox="0 0 24 24"><path d="M3 12s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 20L20 4" stroke="currentColor" stroke-width="2"/></svg>`;
ICON.plus = `<svg viewBox="0 0 24 24"><path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`;
ICON.vol = `<svg viewBox="0 0 24 24"><path d="M3 9h4l5-4v14l-5-4H3z" fill="currentColor"/><path d="M15 9q3 3 0 6M18 6q6 6 0 12" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>`;

/* ------------------------------------------------------------------ sound, speech, confetti, toast */
let ac;
function beep(kind = 'tap') {
  if (!S.sound) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const seq = { tap: [[560, .05]], ok: [[660, .08], [880, .12]], no: [[210, .15]], win: [[523, .09], [659, .09], [784, .09], [1047, .2]], pop: [[420, .05], [680, .07]] }[kind] || [[500, .05]];
    let at = ac.currentTime;
    seq.forEach(([f, d]) => {
      const o = ac.createOscillator(), g = ac.createGain(); o.type = kind === 'no' ? 'triangle' : 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(.0001, at); g.gain.exponentialRampToValueAtTime(.08, at + .015); g.gain.exponentialRampToValueAtTime(.0001, at + d);
      o.connect(g); g.connect(ac.destination); o.start(at); o.stop(at + d + .02); at += d * .9;
    });
  } catch (e) {}
}
function speak(text) {
  try {
    if (!window.speechSynthesis) return; speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text).replace(/\n/g, ' ')); u.lang = S.lang === 'hi' ? 'hi-IN' : 'en-IN'; u.rate = .92; u.pitch = 1.08; speechSynthesis.speak(u);
  } catch (e) {}
}
function confetti(n = 40) {
  const host = $('#stage'); const c = document.createElement('div'); c.className = 'confetti';
  const cols = ['#e35e26', '#653781', '#ffcb05', '#9ca32f', '#96c5d1', '#ff7664'];
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i');
    p.style.cssText = `left:${rnd(8, 92)}%;background:${pick(cols)};--dx:${rnd(-70, 70)}px;--r:${rnd(-360, 360)}deg;animation-delay:${rnd(0, .3)}s;width:${rnd(7, 12)}px;height:${rnd(9, 16)}px;clip-path:${pick(['polygon(0 0,100% 20%,70% 100%,10% 80%)', 'polygon(50% 0,100% 100%,0 100%)', 'none'])}`;
    c.appendChild(p);
  }
  host.appendChild(c); setTimeout(() => c.remove(), 2600);
}
function toast(msg) {
  $$('.toast').forEach(x => x.remove());
  const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg; $('#stage').appendChild(el); setTimeout(() => el.remove(), 2800);
}

/* ------------------------------------------------------------------ modal + grown-up gate */
function modal(html, opt = {}) { const m = $('#modal'); m.innerHTML = html; m.classList.add('on'); m.onclick = e => { if (e.target === m && !opt.sticky) closeModal(); }; return m; }
function closeModal() { const m = $('#modal'); m.classList.remove('on'); setTimeout(() => { if (!m.classList.contains('on')) m.innerHTML = ''; }, 320); }
function gate(cb, why) {
  const a = Math.floor(rnd(4, 9)), b = Math.floor(rnd(4, 9)); const ans = a + b;
  const opts = new Set([ans]); while (opts.size < 3) { const v = ans + Math.floor(rnd(-4, 5)); if (v > 0) opts.add(v); }
  const list = [...opts].sort(() => Math.random() - .5);
  const m = modal(`<div class="gate"><h4>Grown-ups only</h4><p>${esc(why || 'A quick check, so little hands don’t wander into the grown-up area.')}</p>
    <div class="q">${a} + ${b} = ?</div><div class="ans">${list.map(v => `<button data-v="${v}">${v}</button>`).join('')}</div>
    <p style="margin:14px 0 0"><button class="lnk" data-x>Cancel</button></p></div>`);
  $('[data-x]', m).onclick = closeModal;
  $$('.ans button', m).forEach(b => b.onclick = () => { if (+b.dataset.v === ans) { beep('ok'); closeModal(); cb(); } else { b.classList.add('bad'); beep('no'); setTimeout(() => b.classList.remove('bad'), 500); } });
}

/* ------------------------------------------------------------------ stars */
function addStars(n, why) {
  S.stars += n; save(); const total = Math.min(12, 3 + Math.floor(S.stars / 2));
  toast(`+${n} ★${why ? ' · ' + why : ''}`);
  const sn = $('#starN'); if (sn) sn.textContent = S.stars;
}
const stickerCount = () => Math.min(12, 3 + Math.floor(S.stars / 2));

/* ------------------------------------------------------------------ router: calm cross-fade with gentle continuity */
const SC = {}, ORDER = [], ACT = {}; let cur = { id: null, opts: {} }; const hist = []; let langReturn = null;
const reg = (id, def) => { SC[id] = def; ORDER.push(id); };
function buildScreen(id, opts, dirBack) {
  const def = SC[id]; const el = document.createElement('section');
  el.className = 'screen pre' + (dirBack ? ' back' : '') + ' ' + (def.cls || '') + (S.lang === 'hi' ? ' hindi' : ''); el.dataset.screen = id;
  el.innerHTML = def.render(opts || {}); return el;
}
function applyTier() { const st = $('#stage'); if (!st) return; st.dataset.tier = (S.profiles.length || S.onboarded ? tier().id : '7-9'); const m = (SC[cur.id] && SC[cur.id].adult) ? 'adult' : 'kid'; st.dataset.mode = m; }
function render(id, opts, dirBack, instant) {
  const def = SC[id], host = $('#screens'); const old = [...host.children];
  cur = { id, opts: opts || {} }; applyTier();
  const el = buildScreen(id, opts, dirBack); host.appendChild(el);
  if (def.mount) def.mount(el, opts || {});
  const start = () => { el.classList.remove('pre'); old.forEach(o => { o.classList.add('out'); o.style.pointerEvents = 'none'; }); setTimeout(() => old.forEach(o => o.remove()), 700); };
  if (instant) { el.style.transition = 'none'; old.forEach(o => o.remove()); el.classList.remove('pre'); void el.offsetWidth; el.style.transition = ''; } else requestAnimationFrame(() => requestAnimationFrame(start));
  $$('#side nav button').forEach(b => b.classList.toggle('on', b.dataset.id === id));
  const lab = $('#curName'); if (lab) lab.textContent = def.name;
  try { speechSynthesis.cancel(); } catch (e) {}
}
function go(id, opts = {}, o = {}) {
  if (!SC[id]) return; closeModal();
  if (!o.noPush && cur.id && cur.id !== id) hist.push({ id: cur.id, opts: cur.opts });
  render(id, opts, !!o.back, !!o.instant);
}
function back() { const h = hist.pop(); if (h) render(h.id, h.opts, true); else render(S.profiles.length ? 'hub' : 'splash', {}, true); }
const rerender = () => render(cur.id, cur.opts, false, true);

document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const i = b.dataset.act.indexOf(':'); const name = i < 0 ? b.dataset.act : b.dataset.act.slice(0, i); const arg = i < 0 ? '' : b.dataset.act.slice(i + 1);
  if (ACT[name]) { beep('tap'); ACT[name](arg, b, e); }
});
Object.assign(ACT, { go: a => go(a), back: () => back(), noop: () => {} });

/* ------------------------------------------------------------------ shared builders */
const gearB = `<button class="ib gear" data-act="settingsgate" aria-label="Settings">${ICON.gear}</button>`;
const transB = `<button class="ib tr" data-act="trans" aria-label="Language">${ICON.trans}</button>`;
const closeB = (a = 'back') => `<button class="ib tr close" data-act="${a}" aria-label="Close">${ICON.x}</button>`;
const backB = `<button class="ib back" data-act="back" aria-label="Back">${ICON.back}</button>`;
const hd = (sub, h2, cls = '', extra = '') => `<div class="eyebrow ${cls}">${h2 ? `<h2>${h2}</h2>` : ''}<h3>${sub}</h3>${extra}</div>`;
const foot = items => `<div class="foot">${items.map(i => `<button class="${i.cls || ''}" ${i.id ? `id="${i.id}"` : ''} data-act="${i.act}">${i.l}</button>`).join('')}</div>`;
const chipHTML = (cls = '') => { const p = prof(); return `<button class="chip ${cls}" data-act="switch" aria-label="Switch player">${A.avatarHTML(p.av, 56)}<span><b>${esc(p.name)}</b><i>${tierOf(p).n}</i></span></button>`; };
const setNext = (el, on) => { const n = $('#nextB', el); if (n) { n.classList.toggle('dis', !on); n.classList.toggle('pulse', on); } };
const zoneBadge = (p) => { const T = tierOf(p || prof()); return `<span class="zbadge" style="background:${T.c}">${T.n} · ${T.age}</span>`; };
const awkieB = (expr = 'hi', w = 90) => A.awkie(expr, { w });

ACT.trans = () => { langReturn = cur.id; go('language'); };
ACT.settingsgate = () => gate(() => go('gu', { tab: 'settings' }), 'Settings are for grown-ups.');
ACT.switch = () => switchSheet();
function switchSheet() {
  const ps = S.profiles.length ? S.profiles : DEMO;
  modal(`<div class="sheet who-sheet"><button class="ib x" data-close aria-label="Close">${ICON.x}</button><h4 class="disp">${t('who_play')}</h4>
    <div class="wp-grid">${ps.map(p => `<button class="wp ${p.id === S.cur ? 'on' : ''}" data-p="${p.id}">${A.avatarHTML(p.av, 76)}<b>${esc(p.name)}</b><i style="color:${D.TIERS[D.tierIdx(p.tier)].c}">${D.TIERS[D.tierIdx(p.tier)].n}</i></button>`).join('')}
      <button class="wp add" data-add><span>${ICON.plus}</span><b>Add someone</b></button></div></div>`);
  $('#modal [data-close]').onclick = closeModal;
  $$('#modal .wp[data-p]').forEach(b => b.onclick = () => { S.cur = b.dataset.p; save(); closeModal(); beep('pop'); go('hub'); });
  $('#modal [data-add]').onclick = () => { closeModal(); startAdd(); };
}
function startAdd() { draft.name = ''; draft.av = null; draft.tier = '4-6'; S.nextAge = null; go('age', { add: true }); }
ACT.startadd = startAdd;

/* flower (cut-paper petals around a little globe) */
const PET = ['#434f64', '#653781', '#e35e26', '#59662e', '#ffcb05', '#647c8d', '#ffe8b8', '#edd25a', '#653781', '#ea8259', '#b5451b', '#434f64'];
function flowerSVG(o = {}) {
  const N = o.cols ? o.cols.length : 12, cx = 180, cy = 150, r0 = 52, cols = o.cols || PET; let petals = ''; const step = 360 / N;
  for (let i = 0; i < N; i++) {
    const j = ((i * 37) % 11) / 11, a = i * step - 90 + (j - .5) * step * .14, r1 = 122 + j * 30, hi = step * .17, ho = step * (.3 + j * .08);
    const rad = d => d * Math.PI / 180, P = (r, d) => `${(cx + r * Math.cos(rad(a + d))).toFixed(1)},${(cy + r * Math.sin(rad(a + d))).toFixed(1)}`;
    const pts = [P(r0 - 6, -hi), P(r1, -ho), P(r1 - 8, ho * .9), P(r0 - 6, hi)].join(' ');
    const fill = o.fills ? o.fills[i] : cols[i]; const empty = o.fills && !fill;
    petals += `<polygon class="pt ${empty ? 'empty' : ''}" data-i="${i}" points="${pts}" fill="${fill || 'none'}" ${o.stroke ? `stroke="${o.stroke}" stroke-width="2"` : ''} style="cursor:${o.click ? 'pointer' : 'default'}"/>`;
  }
  return `<svg class="fl-svg" viewBox="0 0 360 400" ${o.style ? `style="${o.style}"` : ''}><path d="M176 262C168 310 188 352 176 400" stroke="#59662e" stroke-width="12" fill="none"/>
    <polygon points="206,330 252,314 276,336 232,350 214,346" fill="#59662e" opacity=".85"/>${petals}<circle cx="${cx}" cy="${cy}" r="52" fill="#96c5d1"/>
    <path d="M148 118q14-10 30-6 10 6 6 18-12 6-20 4-12-4-16-16zM190 154q16-8 28 2 4 14-10 22-16 2-22-10 0-8 4-14zM136 160q10 4 10 16-8 8-14 2-4-10 4-18z" fill="#59662e"/></svg>`;
}

/* ------------------------------------------------------------------ shell: scaling, presenter index, boot */
const NTA = window.NTA = { S, D, A, DEMO, draft, go, back, reg, SC, ORDER, ACT, t, ICON, $, $$, rnd, pick, esc, beep, speak, confetti, toast, modal, closeModal, gate, save,
  addStars, stickerCount, prof, tier, tierOf, prog, storyOn, zoneName, rerender, gearB, transB, closeB, backB, hd, foot, chipHTML, setNext, zoneBadge, awkieB, flowerSVG, hist, ensureDemo,
  switchSheet, startAdd, ceilIdx, cur: () => cur, applyTier, langReturn: () => { const r = langReturn; langReturn = null; return r; } };

function buildSide() {
  const groups = {}; ORDER.forEach(id => { if (SC[id].hide) return; const g = SC[id].group || 'Other'; (groups[g] = groups[g] || []).push(id); });
  $('#side nav').innerHTML = Object.entries(groups).map(([g, ids]) => `<h6>${g}</h6>${ids.map(id => `<button data-id="${id}"><span>${SC[id].name}</span>${SC[id].isNew ? '<em>NEW</em>' : ''}</button>`).join('')}`).join('');
  $$('#side nav button').forEach(b => b.onclick = () => { const id = b.dataset.id; if (!['splash', 'intro', 'language', 'role'].includes(id)) ensureDemo(); go(id, SC[id].demo ? SC[id].demo() : {}); });
}
function fit() {
  const vp = $('#viewport'), dev = $('#device'); if (!vp) return; const w = vp.clientWidth, h = vp.clientHeight;
  const portrait = h > w * 1.1 && w < 900; window.NTA_ROT = false;
  const pad = portrait ? 6 : 24; const sc = Math.min((w - pad * 2) / 932, (h - pad * 2) / 430); window.NTA_SCALE = sc;
  dev.style.transform = `scale(${sc})`; const hint = $('#rotHint'); if (hint) hint.hidden = !portrait;
}
NTA.boot = () => {
  buildSide(); fit(); addEventListener('resize', fit); new ResizeObserver(fit).observe($('#viewport'));
  $('#sideToggle').onclick = () => { document.body.classList.toggle('noside'); setTimeout(fit, 30); };
  $('#sideHide').onclick = () => { document.body.classList.add('noside'); setTimeout(fit, 30); };
  $('#resetBtn').onclick = () => { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); };
  $('#demoBtn').onclick = () => { ensureDemo(); S.onboarded = true; save(); go('hub'); };
  addEventListener('keydown', e => { if (e.key === 'p' && !/INPUT|TEXTAREA/.test(e.target.tagName)) { document.body.classList.toggle('noside'); setTimeout(fit, 30); } });
  const q = new URLSearchParams(location.search), s = q.get('s');
  if (s && !['splash', 'intro', 'language', 'role'].includes(s)) ensureDemo();
  if (q.get('p')) { S.cur = q.get('p'); }
  const o = {}; ['id', 'slide', 'tab', 'game', 'g'].forEach(k => { if (q.get(k)) o[k] = q.get(k); });
  render(SC[s] ? s : 'splash', o, false, true);
};
})();
