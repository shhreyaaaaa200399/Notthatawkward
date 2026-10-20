/* LEARN: the story library, the story reader (scenes, facts, choices, branching, widgets) and the "done" screen. */
(() => {
'use strict';
const N = window.NTA, D = N.D, A = N.A, S = N.S, CT = window.CT, WD = CT.WD;
const { go, reg, ACT, ICON, esc, pick, toast, modal, closeModal, save, beep, speak, confetti, prof, tier, tierOf, prog, storyOn } = N;
const { $, $$, gearB, backB, closeB, hd, foot, chipHTML } = N;
const byId = id => CT.STORIES.find(s => s.id === id);
const tierAge = { '4-6': 5, '7-9': 8, '10-12': 11, '13+': 14 };
const BGC = { peach: 'bg-peach', cream: 'bg-cream', olive: 'bg-olive', yellow: 'bg-yellow', purple: 'bg-purple', orange: 'bg-orange', sky: 'bg-sky', navy: 'bg-navy', lilac: 'bg-lilac' };
const ORIG = { shirt: 'st_shirt', kids3: 'st_kids3', kids4: 'st_kids4', royals: 'st_royals', flower: 'st_flower' };
const ORIGH = { shirt: 380, kids3: 292, kids4: 282, royals: 271, flower: 400 };

/* ------------------------------------------------------------------ thumbnails */
function thumb(s) {
  if (s.thumb && s.thumb.orig) return `<div class="thw-in" style="background:${s.thumb.bg}"><img src="assets/${ORIG[s.thumb.orig]}.png" style="height:150px" alt=""></div>`;
  const sl = s.slides.find(x => x.sc); return sl ? `<div class="thw-in">${A.scene(sl.sc)}</div>` : '<div class="thw-in"></div>';
}

/* ------------------------------------------------------------------ library */
const lib = { z: 'all', page: 0 };
function libList() { const p = prof(); return CT.STORIES.filter(s => storyOn(p, s) && (lib.z === 'all' || s.zone === lib.z)); }
reg('learn', { name: 'Learn: story library', group: 'Learn', cls: 'tinted',
  render: () => {
    const p = prof(), T = tierOf(p), all = CT.STORIES.filter(s => storyOn(p, s)); const pg = prog(p.id).stories;
    const zs = D.ZONES.filter(z => all.some(s => s.zone === z.id));
    const list = libList().sort((a, b) => (!!pg[a.id] - !!pg[b.id])); const per = 3, pages = Math.max(1, Math.ceil(list.length / per)); lib.page = Math.min(lib.page, pages - 1);
    const vis = list.slice(lib.page * per, lib.page * per + per);
    return `${backB}${closeB('go:hub')}${chipHTML()}<div class="eyebrow sm"><h3>Stories for you</h3></div>
    <div class="pills"><button class="${lib.z === 'all' ? 'on' : ''}" data-act="lz:all">All</button>${zs.map(z => `<button class="${lib.z === z.id ? 'on' : ''}" data-act="lz:${z.id}">${N.zoneName(z.id, p.tier)}</button>`).join('')}</div>
    <div class="scards">${vis.map((s, i) => `<button class="scard" style="--c:${(D.ZONES.find(z => z.id === s.zone) || {}).c}" data-act="open:${s.id}"><div class="sc-art">${thumb(s)}${pg[s.id] ? '<span class="done-tag">Done</span>' : s.branch ? '<span class="branch-tag">You choose</span>' : ''}</div>
      <h5>${esc(s.title)}</h5><p>${esc(s.hook)}</p><i>${s.mins} min · ${N.zoneName(s.zone, p.tier)}</i></button>`).join('')}</div>
    ${pages > 1 ? `<div class="pager"><button class="btn sm ghost" data-act="lpage:-1" ${lib.page === 0 ? 'disabled' : ''}>‹</button><span>${lib.page + 1} / ${pages}</span><button class="btn sm ghost" data-act="lpage:1" ${lib.page >= pages - 1 ? 'disabled' : ''}>›</button></div>` : ''}
    <div class="learn-foot"><span class="zbadge" style="background:${T.c}">${T.n} · ${T.age}</span><button class="lnk" data-act="gugate">Not what you need? Ask a grown-up to adjust topics</button></div>`;
  } });
ACT.lz = z => { lib.z = z; lib.page = 0; N.rerender(); };
ACT.lpage = d => { lib.page += +d; N.rerender(); };
ACT.open = id => go('story', { id });

/* ------------------------------------------------------------------ story slide HTML */
const bannerShape = ['b1', 'b2', 'b3', 'b4', 'b5'];
function bn(text, idx, pos, alt) {
  const L = text.length, fs = (L > 170 ? 13.5 : L > 120 ? 15 : 16.5) + (tier().id === '4-6' ? 1.5 : 0);
  return `<div class="bn banner ${bannerShape[idx % 5]} ${pos === 'b' ? 'pos-b' : 'pos-t'} ${alt ? 'alt' : ''}" style="font-size:${fs}px">${esc(text).replace(/\n/g, '<br>')}</div>`;
}
const sceneBg = sl => (sl.sc && (sl.sc.bg === 'orange')) ;
function slideHTML(sl, story, idx, ctx = {}) {
  const k = sl.k;
  if (k === 'orig') {
    const bp = sl.bp, ap = sl.ap, pos = ap.l != null ? `left:${ap.l}px` : `right:${ap.r}px`;
    return `<div class="sl ${BGC[sl.bg] || 'bg-peach'}"><img class="art sway" src="assets/${ORIG[sl.art]}.png" alt="" style="height:${sl.h}px;${pos};bottom:${ap.b}px"><div class="banner ${sl.b} o-bn" style="left:${bp[0]}px;top:${bp[1]}px;width:${bp[2]}px;height:${bp[3]}px;font-size:${sl.t.length > 100 ? 14.5 : 16}px">${esc(sl.t).replace(/\n/g, '<br>')}</div></div>`;
  }
  if (k === 'text') return `<div class="sl scn">${A.scene(sl.sc)}${bn(sl.t, idx, sl.pos, sceneBg(sl))}</div>`;
  if (k === 'choice') return `<div class="sl scn">${A.scene(sl.sc)}${bn(sl.q, idx, 't', sceneBg(sl))}
    <div class="opts-col">${sl.opts.map((o, i) => `<button class="oc" data-o="${i}"><i>${'ABC'[i]}</i><span>${esc(o.t)}</span></button>`).join('')}</div><div class="fbx" hidden></div></div>`;
  if (k === 'fact') {
    const fn = A.PROPS[sl.icon] || A.PROPS.star;
    return `<div class="sl ${BGC[sl.bg] || 'bg-yellow'} fact"><div class="fact-in"><div class="fact-card"><svg viewBox="-20 -20 140 120">${fn(1.2)}</svg></div>
      <div class="fact-tx"><em>${esc(sl.head)}</em><h3>${esc(sl.who)}</h3><b>${esc(sl.tag)}</b><p>${esc(sl.t)}</p></div></div></div>`;
  }
  if (k === 'widget') return `<div class="sl ${BGC[sl.bg] || 'bg-cream'} wd wd-${sl.w}">${widgetHTML(sl, story)}</div>`;
  return '<div class="sl"></div>';
}

/* ------------------------------------------------------------------ the reader */
reg('story', { name: 'Story reader', group: 'Learn', cls: 'story', demo: () => ({ id: 'whose' }),
  render: o => `<div class="stg" id="stg"></div>${backB}
    <button class="ib snd" data-act="speakit" aria-label="Read aloud">${ICON.speak}</button><button class="ib tog ${S.together ? 'on' : ''}" data-act="togtogether" aria-label="Reading together">${ICON.together}</button>
    <button class="s-prev" data-act="sprev" aria-label="Previous">${ICON.chevL}</button><button class="s-next" data-act="snext" aria-label="Next">${ICON.chevR}</button>
    <div class="askchip" id="askchip" hidden></div><div class="prog-bar" id="pbar"><i></i></div>`,
  mount: (el, o) => {
    const story = byId(o.id || 'whose'); const slides = story.slides; const stg = $('#stg', el);
    const idxById = {}; slides.forEach((s, i) => { if (s.id) idxById[s.id] = i; });
    let i = Math.max(0, Math.min(slides.length - 1, +o.slide || 0)); const stack = []; let visited = 0, cur = null; const unlocked = {}; let nextTo = null; const est = story.branch ? Math.ceil(slides.length * .72) : slides.length;
    const GATED = ['palette', 'voice', 'trust', 'bodymap', 'timeline', 'cycle', 'anatomy', 'contra', 'checklist'];
    const needs = sl => sl.k === 'choice' || (sl.k === 'widget' && GATED.includes(sl.w));
    const lockNext = () => { const nx = $('.s-next', el), ok = !needs(slides[i]) || unlocked[i]; nx.classList.toggle('lock', !ok); nx.disabled = !ok; };
    const ctxFor = () => ({ unlock: (to) => { unlocked[i] = true; if (to) nextTo = to; lockNext(); }, setNext: to => { nextTo = to; }, story, slide: slides[i], root: null });
    const show = (n, dirBack) => {
      i = n; nextTo = null; const sl = slides[i]; const ne = document.createElement('div'); ne.className = 'sl-wrap pre' + (dirBack ? ' back' : ''); ne.innerHTML = slideHTML(sl, story, i); stg.appendChild(ne);
      const ctx = ctxFor(); ctx.root = ne;
      if (sl.k === 'choice') bindChoice(ne, sl, ctx); if (sl.k === 'widget') bindWidget(ne, sl, ctx);
      const prev = cur; cur = ne;
      if (!prev) ne.classList.remove('pre'); else requestAnimationFrame(() => requestAnimationFrame(() => { ne.classList.remove('pre'); prev.classList.add('out'); setTimeout(() => prev.remove(), 800); }));
      const pr = Math.min(1, (visited + 1) / est); $('#pbar i', el).style.width = (pr * 100) + '%';
      $('.s-prev', el).style.visibility = stack.length ? 'visible' : 'hidden'; lockNext();
      const ak = $('#askchip', el); if (S.together && sl.ask) { ak.hidden = false; ak.innerHTML = `<b>Pause &amp; ask</b>${esc(sl.ask)}`; } else ak.hidden = true;
      if (S.read && tier().id === '4-6' && sl.t) speak(sl.t); else if (S.read && tier().id === '4-6' && sl.q) speak(sl.q);
    };
    const advance = () => {
      const sl = slides[i]; let n;
      if (nextTo) n = idxById[nextTo]; else if (sl.next === 'end') n = slides.length; else if (sl.next) n = idxById[sl.next]; else n = i + 1;
      if (n == null || n >= slides.length) return finish(); stack.push(i); visited++; show(n, false);
    };
    const finish = () => go('done', { id: story.id });
    ACT.snext = () => advance();
    ACT.sprev = () => { if (!stack.length) return; visited = Math.max(0, visited - 1); show(stack.pop(), true); };
    ACT.speakit = () => { const sl = slides[i]; speak(sl.t || sl.q || ''); const b = $('.snd', el); b.classList.add('on'); setTimeout(() => b.classList.remove('on'), 2500); };
    ACT.togtogether = () => { S.together = !S.together; save(); $('.tog', el).classList.toggle('on', S.together); toast(S.together ? 'Reading together: prompts for grown-ups will show' : 'Reading on my own'); const ak = $('#askchip', el), sl = slides[i]; if (S.together && sl.ask) { ak.hidden = false; ak.innerHTML = `<b>Pause &amp; ask</b>${esc(sl.ask)}`; } else ak.hidden = true; };
    show(i, false);
    const keyh = e => { if (N.cur().id !== 'story') return document.removeEventListener('keydown', keyh); if (e.key === 'ArrowRight' && !$('.s-next', el).disabled) advance(); if (e.key === 'ArrowLeft') ACT.sprev(); }; document.addEventListener('keydown', keyh);
  } });

function bindChoice(root, sl, ctx) {
  const fb = $('.fbx', root); const branchy = sl.opts.some(o => o.to);
  $$('.oc', root).forEach(b => b.onclick = () => {
    const o = sl.opts[+b.dataset.o]; $$('.oc', root).forEach(x => x.classList.remove('ok', 'maybe', 'no', 'pick')); b.classList.add('pick', o.v === 'ok' ? 'ok' : o.v === 'maybe' ? 'maybe' : 'no');
    fb.hidden = false; fb.className = 'fbx ' + (o.v || 'maybe'); fb.innerHTML = `<b>${o.v === 'ok' ? 'Yes!' : o.v === 'maybe' ? 'Think about it' : 'Not quite'}</b> ${esc(o.fb)}`; fb.style.animation = 'none'; void fb.offsetWidth; fb.style.animation = '';
    beep(o.v === 'ok' ? 'ok' : o.v === 'maybe' ? 'tap' : 'no'); if (o.v === 'ok') confetti(10);
    if (branchy) { ctx.unlock(o.to); } else if (o.v !== 'no') ctx.unlock();
  });
}

/* ------------------------------------------------------------------ widgets */
const wrapBn = (t, w = 620, alt) => `<div class="bn banner b3 pos-t ${alt ? 'alt' : ''}" style="width:${w}px">${esc(t)}</div>`;
function widgetHTML(sl, story) {
  switch (sl.w) {
    case 'palette': return `${wrapBn(sl.t)}<div class="swatches">${N.flowerSVG && ['#434f64', '#653781', '#e35e26', '#59662e', '#ffcb05', '#647c8d', '#ffe8b8', '#edd25a', '#653781', '#ea8259', '#b5451b', '#434f64'].map((c, i) => `<button class="sw" style="background:${c};--r:${(i % 5 - 2) * 4}deg" data-c="${c}" aria-label="Colour ${i + 1}"></button>`).join('')}</div>
      <div class="flw">${N.flowerSVG({ fills: Array(12).fill(null), stroke: '#fff', style: 'width:330px;height:370px' })}</div>`;
    case 'emoflower': return `<div class="flw l">${N.flowerSVG({ cols: WD.EMOS.map(e => e.c), click: true, style: 'width:330px;height:370px' })}</div><div class="ef-slot"><div class="ef-empty">${esc(sl.t)}<small>Each petal is a feeling.</small></div></div>`;
    case 'voice': return `${wrapBn(sl.t)}<div class="voice-box"><div class="vmeter"><i></i></div><button class="btn or voice">NO!</button><div class="vsay disp"></div></div>`;
    case 'trust': return `${wrapBn(sl.t)}<div class="trust-box"><div class="trustc">${['Mum', 'Dad', 'Grandparent', 'Teacher', 'Aunt / Uncle', 'Doctor', 'Older sibling', 'Neighbour'].map(n => `<button data-p="${n}">${n}</button>`).join('')}</div><div class="hand5"></div></div>`;
    case 'bodymap': return `${wrapBn(sl.t)}<div class="bm"><div class="bm-fig">${A.bodyFigure()}${WD.BODYMAP.map(b => `<button class="spot" style="left:${b.x}%;top:${b.y}%;--c:${b.c}" data-b="${b.id}" aria-label="${b.n}"></button>`).join('')}</div><div class="bm-panel"><div class="ef-empty">Tap a glowing circle.</div></div></div>`;
    case 'cells': return cellsSVG(sl.n) + wrapBn(sl.t, 620, sl.bg === 'orange');
    case 'timeline': return `${wrapBn(sl.t)}<div class="tl"><div class="tl-tabs"><button class="on" data-t="f">Uterus and ovaries</button><button data-t="m">Testicles and penis</button></div><div class="tl-chart" id="tlc"></div><div class="tl-info" id="tli">Tap a bar to read about it.</div></div>`;
    case 'cycle': return `${wrapBn(sl.t)}<div class="cy"><div class="cy-wheel" id="cyw"></div><div class="cy-side"><input type="range" id="cys" min="1" max="28" value="1" aria-label="Day of cycle"><div class="cy-day" id="cyd"></div><div class="cy-info" id="cyi"></div></div></div>`;
    case 'anatomy': return `${wrapBn(sl.t)}<div class="an"><div class="an-l"><div class="tl-tabs"><button class="on" data-t="f">Uterus and ovaries</button><button data-t="m">Testicles and penis</button></div><div class="an-fig" id="anf"></div></div><div class="an-info" id="ani">Tap a part to see its name and job.</div></div>`;
    case 'contra': return `${wrapBn(sl.t)}<div class="ct"><div class="ct-list">${WD.CONTRA.map((c, i) => `<button data-c="${i}">${c.n}${c.sti ? '<i title="Protects from most STIs">STI</i>' : ''}</button>`).join('')}</div><div class="ct-panel" id="ctp"><div class="ef-empty">Pick a method.</div></div></div>`;
    case 'checklist': return `${wrapBn(sl.t)}<div class="ck-list">${sl.list.map((x, i) => `<button class="ckr" data-i="${i}"><i>${ICON.check}</i>${esc(x)}</button>`).join('')}<div class="ck-res" id="ckres"></div></div>`;
  }
  return '';
}
function cellsSVG(k) {
  const egg = `<circle cx="0" cy="0" r="56" fill="#ffecba" stroke="#000" stroke-width="3"/><circle cx="0" cy="0" r="22" fill="#ffcb05" stroke="#000" stroke-width="2.5"/>`;
  const sperm = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="14" ry="10" fill="#653781" stroke="#000" stroke-width="2.5"/><path d="M-14 0q-18 -10 -30 0t-30 0" stroke="#653781" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
  const lab = (x, y, t) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Black Han Sans" font-size="18" fill="#fff">${t}</text>`;
  const body = k === 0 ? `<g transform="translate(250 210)"><circle r="6" fill="#ffcb05" stroke="#000" stroke-width="1.5"/></g><g transform="translate(480 190)"><circle r="5" fill="#653781"/></g>${lab(250, 250, 'too tiny to see!')}`
    : k === 1 ? `<g transform="translate(260 210)">${egg}</g>${sperm(520, 200, 160)}${lab(260, 296, 'EGG')}${lab(520, 240, 'SPERM')}`
      : `<g transform="translate(380 210)"><circle r="70" fill="#ffecba" stroke="#000" stroke-width="3"/><circle r="30" fill="#ffcb05" stroke="#000" stroke-width="3" class="pulse-c"/></g>${lab(380, 310, 'a baby begins to grow')}`;
  return `<svg class="cells-svg" viewBox="0 0 932 430">${body}</svg>`;
}
function bindWidget(root, sl, ctx) {
  const w = sl.w;
  if (w === 'palette') {
    const pts = $$('.pt', root); let used = 0;
    $$('.sw', root).forEach(b => b.onclick = () => { if (b.classList.contains('used') || used >= 12) return; const p = pts[used++]; p.setAttribute('fill', b.dataset.c); p.classList.remove('empty'); p.classList.add('pop'); setTimeout(() => p.classList.remove('pop'), 400); b.classList.add('used'); beep('pop');
      if (used === 12) { confetti(); beep('win'); toast('It bloomed!'); ctx.unlock(); } else if (used >= 4) ctx.unlock(); });
  }
  if (w === 'emoflower') bindEmo(root, $('.ef-slot', root));
  if (w === 'voice') {
    const btn = $('.voice', root), bar = $('.vmeter i', root), say = $('.vsay', root); let v = 0, raf = 0, down = false, t0 = 0;
    const tick = () => { if (!down) return; v = Math.min(100, (performance.now() - t0) / 14); bar.style.width = v + '%'; btn.style.transform = `scale(${1 + v / 260})`; raf = requestAnimationFrame(tick); };
    const start = e => { e.preventDefault(); down = true; t0 = performance.now(); say.textContent = ''; tick(); beep('pop'); };
    const end = () => { if (!down) return; down = false; cancelAnimationFrame(raf); btn.style.transform = ''; if (v >= 90) { say.textContent = 'THAT’S A STRONG VOICE!'; confetti(24); beep('win'); ctx.unlock(); } else say.textContent = 'A bit louder! Hold a little longer.'; setTimeout(() => { bar.style.width = '0'; }, 700); };
    btn.addEventListener('pointerdown', start); window.addEventListener('pointerup', end); btn.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { start(e); setTimeout(end, 1500); } });
  }
  if (w === 'trust') {
    const hand = $('.hand5', root); const sel = (S.trusted || []).slice(0, 5); const tips = [[322, 190], [276, 84], [226, 66], [176, 82], [124, 108]], cols5 = ['#e35e26', '#653781', '#9ca32f', '#ffcb05', '#96c5d1'];
    const draw = () => { hand.innerHTML = `<svg viewBox="0 0 380 300" width="330" height="260"><g fill="#fff" stroke="#000" stroke-width="4" stroke-linejoin="round"><rect x="102" y="86" width="44" height="130" rx="22"/><rect x="154" y="62" width="46" height="150" rx="23"/><rect x="206" y="46" width="46" height="160" rx="23"/><rect x="258" y="64" width="46" height="150" rx="23"/><rect x="290" y="172" width="86" height="44" rx="22" transform="rotate(-38 300 192)"/><path d="M104 190h200v40c0 38-34 60-100 60S104 268 104 228z"/></g><g fill="#fff"><rect x="108" y="196" width="190" height="14"/></g>
      ${tips.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${sel[i] ? 24 : 17}" fill="${sel[i] ? cols5[i] : '#00000012'}" stroke="#000" stroke-width="${sel[i] ? 3 : 1.5}" stroke-dasharray="${sel[i] ? 0 : '4 4'}"/>${sel[i] ? `<text x="${x}" y="${y + 40}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="12" fill="#000">${esc(sel[i].split(' ')[0])}</text>` : ''}`).join('')}</svg>`; };
    draw(); if (sel.length >= 3) ctx.unlock();
    $$('[data-p]', root).forEach(b => { if (sel.includes(b.dataset.p)) b.classList.add('ok'); b.onclick = () => { const n = b.dataset.p, j = sel.indexOf(n); if (j >= 0) { sel.splice(j, 1); b.classList.remove('ok'); } else if (sel.length < 5) { sel.push(n); b.classList.add('ok'); beep('pop'); } else toast('Five fingers, five people. Remove one first!'); S.trusted = sel; save(); draw(); if (sel.length >= 3) ctx.unlock(); if (sel.length === 5) { confetti(24); beep('win'); } }; });
  }
  if (w === 'bodymap') {
    const panel = $('.bm-panel', root); const seen = new Set();
    $$('.spot', root).forEach(b => b.onclick = () => { const d = WD.BODYMAP.find(x => x.id === b.dataset.b); seen.add(d.id); b.classList.add('seen'); beep('pop'); panel.innerHTML = `<div class="bm-card" style="--c:${d.c}"><h4>${d.n}</h4><p>${esc(d.t)}</p></div>`; if (seen.size >= 3) ctx.unlock(); });
  }
  if (w === 'timeline') {
    const chart = $('#tlc', root), info = $('#tli', root); let cur = 'f'; const age = tierAge[tier().id]; let n = 0; const seenB = new Set();
    const draw = () => { const d = WD.TIMELINE[cur]; const x = a => ((a - 7) / 10) * 100;
      chart.innerHTML = `<div class="tl-axis">${[8, 10, 12, 14, 16].map(a => `<span style="left:${x(a)}%">${a}</span>`).join('')}</div>` + d.rows.map((r, i) => `<div class="tl-row"><label>${r[0]}</label><div class="tl-track"><button class="tl-bar" data-i="${i}" style="left:${x(r[1])}%;width:${x(r[2]) - x(r[1])}%"><span>${r[1]}–${r[2]}</span></button></div></div>`).join('') + `<div class="tl-you" style="left:${(230 + 5.3 * x(age)).toFixed(0)}px"><i>you’re about here</i></div>`;
      $$('.tl-bar', chart).forEach(b => b.onclick = () => { const r = d.rows[+b.dataset.i]; $$('.tl-bar', chart).forEach(z => z.classList.remove('on')); b.classList.add('on'); info.innerHTML = `<b>${r[0]}</b> usually starts between ${r[1]} and ${r[2]}. ${esc(r[3])}`; beep('pop'); seenB.add(cur + b.dataset.i); if (seenB.size >= 2) ctx.unlock(); }); };
    $$('.tl-tabs button', root).forEach(b => b.onclick = () => { cur = b.dataset.t; $$('.tl-tabs button', root).forEach(z => z.classList.toggle('on', z === b)); draw(); info.textContent = 'Tap a bar to read about it.'; beep('tap'); });
    draw();
  }
  if (w === 'cycle') {
    const wheel = $('#cyw', root), inp = $('#cys', root), dayL = $('#cyd', root), infoL = $('#cyi', root); const seen = new Set();
    const arc = (d) => { const a0 = (d - 1) / 28 * 2 * Math.PI - Math.PI / 2, a1 = d / 28 * 2 * Math.PI - Math.PI / 2, R = 96, r = 58; const P = (a, rr) => `${(110 + rr * Math.cos(a)).toFixed(1)},${(110 + rr * Math.sin(a)).toFixed(1)}`; return `M${P(a0, R)}A${R},${R} 0 0 1 ${P(a1, R)}L${P(a1, r)}A${r},${r} 0 0 0 ${P(a0, r)}Z`; };
    const phase = d => WD.CYCLE.find(p => d >= p.from && d <= p.to);
    const draw = d => { const ph = phase(d); wheel.innerHTML = `<svg viewBox="0 0 220 220">${[...Array(28)].map((_, i) => `<path d="${arc(i + 1)}" fill="${phase(i + 1).c}" opacity="${i + 1 === d ? 1 : .5}" stroke="#fff" stroke-width="1.2"/>`).join('')}<text x="110" y="106" text-anchor="middle" font-family="Black Han Sans" font-size="34" fill="#0b0b0b">${d}</text><text x="110" y="128" text-anchor="middle" font-family="Inter" font-weight="700" font-size="11" fill="#555">DAY</text></svg>`;
      dayL.innerHTML = `<b style="color:${ph.c}">${ph.n}</b>`; infoL.textContent = ph.t; seen.add(ph.n); if (seen.size >= 3) ctx.unlock(); };
    inp.oninput = () => draw(+inp.value); draw(1);
  }
  if (w === 'anatomy') {
    const fig = $('#anf', root), info = $('#ani', root); let cur = 'f'; const seen = new Set();
    const draw = () => { fig.innerHTML = `<div class="an-svg">${A.anatomy(cur)}${WD.ANAT[cur].map((h, i) => `<button class="spot sm" style="left:${h.x / 3}%;top:${h.y / 3}%;--c:#0b0b0b" data-i="${i}" aria-label="${h.n}"></button>`).join('')}</div>`;
      $$('.spot', fig).forEach(b => b.onclick = () => { const h = WD.ANAT[cur][+b.dataset.i]; seen.add(cur + b.dataset.i); b.classList.add('seen'); info.innerHTML = `<b>${h.n}</b> ${esc(h.t)}`; beep('pop'); if (seen.size >= 3) ctx.unlock(); }); };
    $$('.tl-tabs button', root).forEach(b => b.onclick = () => { cur = b.dataset.t; $$('.tl-tabs button', root).forEach(z => z.classList.toggle('on', z === b)); draw(); info.textContent = 'Tap a part to see its name and job.'; beep('tap'); }); draw();
  }
  if (w === 'contra') {
    const panel = $('#ctp', root); const seen = new Set();
    $$('.ct-list button', root).forEach(b => b.onclick = () => { const c = WD.CONTRA[+b.dataset.c]; $$('.ct-list button', root).forEach(z => z.classList.toggle('on', z === b)); seen.add(c.n); beep('pop');
      const eff = c.eff[1] ? `<div class="eff"><span>How well it works</span><div class="effbar"><i style="width:${c.eff[0]}%"></i><i class="hi" style="width:${c.eff[1] - c.eff[0]}%"></i></div><b>${c.eff[0] === c.eff[1] ? c.eff[0] + '%' : c.eff[0] + '–' + c.eff[1] + '%'}</b></div>` : `<div class="eff"><span>How well it works</span><b>${esc(c.note || '')}</b></div>`;
      panel.innerHTML = `<div class="ct-card"><h4>${c.n}</h4><p>${esc(c.how)}</p>${eff}${c.note && c.eff[1] ? `<small>${esc(c.note)}</small>` : ''}<div class="sti ${c.sti ? 'y' : 'n'}">${c.sti ? 'Also protects from most STIs' : 'Does not protect from STIs'}</div><div class="where"><b>Where:</b> ${esc(c.where)}</div></div>`; if (seen.size >= 3) ctx.unlock(); });
  }
  if (w === 'checklist') {
    const res = $('#ckres', root); let n = 0;
    $$('.ckr', root).forEach(b => b.onclick = () => { b.classList.toggle('on'); n = $$('.ckr.on', root).length; beep('tap'); const tot = sl.list.length;
      res.textContent = n === 0 ? '' : n < tot ? `${n} of ${tot} ticked. If any are unticked, that’s a good sign to wait, or to talk first.` : 'All ticked. Great, and still remember you can change your mind at any time.'; ctx.unlock(); });
  }
}
function bindEmo(root, panel) {
  const pts = $$('.pt', root);
  pts.forEach((p, i) => { p.onclick = () => { const e = WD.EMOS[i]; pts.forEach(x => x.classList.remove('pop')); p.classList.add('pop'); beep('pop'); const dark = ['#ffcb05', '#96c5d1', '#edd25a'].includes(e.c);
    panel.innerHTML = `<div class="ef-panel" style="background:${e.c};color:${dark ? '#111' : '#fff'}"><h4>${e.n}</h4><div class="row"><b>In my body</b>${e.body}</div><div class="row"><b>What can I do?</b>${e.do}</div></div>`; }; });
}
N.bindEmo = bindEmo;

/* ------------------------------------------------------------------ done */
reg('done', { name: 'Story complete', group: 'Learn', cls: 'done', demo: () => ({ id: 'whose' }),
  render: o => { const s = byId(o.id || 'whose'), p = prof(); const rel = CT.STORIES.filter(x => x.id !== s.id && storyOn(p, x) && !prog(p.id).stories[x.id]).slice(0, 2);
    return `${closeB('go:learn')}${hd('You finished it!', 'WELL DONE', 'sm')}
    <div class="remember"><small>REMEMBER</small><p>${esc(s.take)}</p></div>
    <div class="cues"><div class="cue c-or"><small>${s.talk[0][0]}</small>${esc(s.talk[0][1])}</div><div class="cue c-pu"><small>${s.talk[1] ? s.talk[1][0] : ''}</small>${esc(s.talk[1] ? s.talk[1][1] : '')}</div></div>
    <div class="done-act"><button class="btn ol" data-act="talked:${s.id}">We talked! +2 ★</button>
      ${rel.length ? `<div class="nextup"><small>NEXT UP</small>${rel.map(x => `<button class="nu" data-act="open:${x.id}">${esc(x.title)}</button>`).join('')}</div>` : ''}
      <div class="done-links"><button class="lnk" data-act="go:awkie">Still wondering? Ask Awkie</button><button class="lnk" data-act="go:learn">All stories</button></div></div>`; },
  mount: (el, o) => { const s = byId(o.id || 'whose'), p = prof(), pg = prog(p.id); beep('win'); confetti(36);
    if (!pg.stories[s.id]) { pg.stories[s.id] = { at: Date.now(), take: s.take }; S.week[6] = (S.week[6] || 0) + 1; N.addStars(3, 'finishing a story'); save(); } } });
ACT.talked = () => { S.talks++; prog().chats = (prog().chats || 0) + 1; save(); N.addStars(2, 'talking together'); setTimeout(() => go('learn'), 1300); };
})();
