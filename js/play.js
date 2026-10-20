/* PLAY: a games hub that adapts to the age zone, plus nine game engines. */
(() => {
'use strict';
const N = window.NTA, D = N.D, A = N.A, S = N.S, CT = window.CT, G = CT.G, WD = CT.WD;
const { go, reg, ACT, ICON, esc, pick, rnd, toast, modal, closeModal, save, beep, confetti, prof, tier, prog, storyOn } = N;
const { $, $$, gearB, backB, closeB, hd, foot, chipHTML } = N;
const tid = () => tier().id;
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const played = (g) => { const p = prog(); p.games[g] = (p.games[g] || 0) + 1; S.week[6] = (S.week[6] || 0) + 1; save(); };
const awk = (e, w = 70) => N.awkieB(e, w);
const sceneFromStr = str => { const [bg, deco, cast, props, over] = str.split('|'); return A.scene(CT.sc(bg, deco, cast, props, over)); };

/* ------------------------------------------------------------------ hub */
const ico = {
  wwyd: `<svg viewBox="0 0 64 64"><polygon points="8,10 56,6 58,40 34,44 20,58 22,44 10,42" fill="#fff"/><path d="M24 22q8-8 16 0t-8 10v4" stroke="#e35e26" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="32" cy="42" r="2.6" fill="#e35e26"/></svg>`,
  path: `<svg viewBox="0 0 64 64"><path d="M32 58V34M32 34L14 14M32 34L50 14" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="14" cy="12" r="6" fill="#ffcb05"/><circle cx="50" cy="12" r="6" fill="#ffcb05"/></svg>`,
  myth: `<svg viewBox="0 0 64 64"><path d="M20 20l12-10 12 10-6 16h-12z" fill="#ffcb05"/><circle cx="32" cy="48" r="5.5" fill="#ffcb05"/></svg>`,
  flags: `<svg viewBox="0 0 64 64"><path d="M16 56V10" stroke="#fff" stroke-width="5" stroke-linecap="round"/><polygon points="18,10 52,18 18,32" fill="#ffcb05"/></svg>`,
  brain: `<svg viewBox="0 0 64 64"><circle cx="32" cy="30" r="20" fill="#fff"/><path d="M32 18v24M20 26h24" stroke="#434f64" stroke-width="5" stroke-linecap="round"/><rect x="24" y="52" width="16" height="6" fill="#fff"/></svg>`,
  sort: `<svg viewBox="0 0 64 64"><rect x="6" y="30" width="24" height="26" fill="#fff"/><rect x="34" y="30" width="24" height="26" fill="#ffcb05"/><polygon points="22,6 42,10 38,26 20,22" fill="#fff"/></svg>`,
  match: `<svg viewBox="0 0 64 64"><rect x="6" y="14" width="24" height="34" fill="#fff"/><rect x="34" y="14" width="24" height="34" fill="#ffcb05"/><path d="M16 32h4M44 32h4" stroke="#653781" stroke-width="5" stroke-linecap="round"/></svg>`,
  dice: `<svg viewBox="0 0 64 64"><polygon points="32,6 58,20 58,44 32,58 6,44 6,20" fill="#fff"/><polygon points="32,6 58,20 32,34 6,20" fill="#ffffff90"/><polygon points="20,26 28,22 32,30 24,34" fill="#9ca32f"/><polygon points="40,38 48,34 51,42 43,46" fill="#9ca32f"/></svg>`,
  feelings: `<svg viewBox="0 0 64 64">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<polygon points="32,32 ${32 + 28 * Math.cos(i * .785 - .2)},${32 + 28 * Math.sin(i * .785 - .2)} ${32 + 28 * Math.cos(i * .785 + .25)},${32 + 28 * Math.sin(i * .785 + .25)}" fill="${['#ffcb05', '#e35e26', '#9ca32f', '#96c5d1', '#ea8259', '#ffecba', '#434f64', '#fff'][i]}"/>`).join('')}<circle cx="32" cy="32" r="9" fill="#96c5d1"/></svg>`,
  challenge: `<svg viewBox="0 0 64 64"><path d="M8 54V24l14 10 10-22 10 22 14-10v30z" fill="#ffcb05"/><circle cx="32" cy="44" r="5" fill="#e35e26"/></svg>`,
};
const GAMES = [
  { id: 'wwyd', n: 'What would you do?', p: 'Pick what you’d do, then see what happens.', c: '#e35e26', tag: 'CHOOSE' },
  { id: 'path', n: 'Choose your path', p: 'Stories where you decide what happens next.', c: '#653781', tag: 'STORY', need: () => CT.STORIES.some(s => s.branch && storyOn(prof(), s)) },
  { id: 'myth', n: 'Myth or fact?', p: 'Spot the whoppers and the truths.', c: '#59662e', tag: 'QUIZ' },
  { id: 'flags', n: t => ({ '4-6': 'Safe or not?', '7-9': 'Safe or not?' }[t] || 'Green flag, red flag'), p: 'Healthy or unhealthy? OK or not OK?', c: '#c99a00', tag: 'QUIZ', dark: true },
  { id: 'brain', n: 'Brain boost', p: 'Five quick multiple-choice questions.', c: '#434f64', tag: 'QUIZ' },
  { id: 'sort', n: 'Sort it!', p: 'Tap the box each card belongs in.', c: '#ac2929', tag: 'PUZZLE' },
  { id: 'match', n: 'Match up', p: 'Flip cards to pair words with meanings.', c: '#9ca32f', tag: 'PUZZLE' },
  { id: 'dice', n: 'Awk dice', p: 'Roll, flip, talk together.', c: '#e35e26', tag: 'TOGETHER' },
  { id: 'feelings', n: 'Feelings flower', p: 'Tap a petal and meet a feeling.', c: '#653781', tag: 'SOLO', tiers: ['4-6', '7-9', '10-12'] },
  { id: 'challenge', n: 'Family challenge', p: 'A tiny mission for the whole family.', c: '#434f64', tag: 'WEEKLY' },
];
const hubState = { page: 0 };
reg('playhub', { name: 'Play: games hub', group: 'Play', isNew: true, cls: 'tinted',
  render: () => {
    const T = tid(); const list = GAMES.filter(g => (!g.tiers || g.tiers.includes(T)) && (!g.need || g.need())); const per = 8, pages = Math.ceil(list.length / per); hubState.page = Math.min(hubState.page, pages - 1);
    const vis = list.slice(hubState.page * per, hubState.page * per + per);
    return `${gearB}${closeB('go:hub')}${chipHTML('sm')}${hd(({ '4-6': 'Pick a game!', '7-9': 'Pick a game', '10-12': 'Pick something to play', '13+': 'Choose an activity' })[T], 'PLAY', 'sm')}
    <div class="ggrid">${vis.map((g, i) => `<button class="gcard ${g.dark ? 'dk' : ''}" style="background:${g.c}" data-act="gopen:${g.id}"><span class="gt">${g.tag}</span><div class="gi">${ico[g.id]}</div><h5>${typeof g.n === 'function' ? g.n(T) : g.n}</h5><p>${g.p}</p></button>`).join('')}</div>
    <div class="gbar">${pages > 1 ? `<button class="btn sm ghost" data-act="gpage:-1" ${hubState.page === 0 ? 'disabled' : ''}>‹</button><span>${hubState.page + 1} / ${pages}</span><button class="btn sm ghost" data-act="gpage:1" ${hubState.page >= pages - 1 ? 'disabled' : ''}>More ›</button>` : ''}
      <button class="sbtn" data-act="go:stickers">${ICON.sticker} Sticker book <b>${N.stickerCount()}/12</b></button></div>`; } });
ACT.gpage = d => { hubState.page += +d; N.rerender(); };
ACT.gopen = id => { if (id === 'path') return go('pathlist'); go(id, { g: id }); };

/* ------------------------------------------------------------------ choose your path (list of branching stories) */
reg('pathlist', { name: 'Choose your path: list', group: 'Play', isNew: true,
  render: () => { const list = CT.STORIES.filter(s => s.branch && storyOn(prof(), s));
    return `${backB}${closeB('go:playhub')}${hd('You decide what happens next', 'CHOOSE YOUR PATH', 'sm')}<div class="scards" style="top:120px">${list.map(s => `<button class="scard" style="--c:#653781" data-act="open:${s.id}"><div class="sc-art">${CT.thumbHTML ? '' : ''}${(() => { const sl = s.slides.find(x => x.sc); return `<div class="thw-in">${A.scene(sl.sc)}</div>`; })()}<span class="branch-tag">You choose</span></div><h5>${esc(s.title)}</h5><p>${esc(s.hook)}</p><i>${s.mins} min</i></button>`).join('')}</div>`; } });

/* ------------------------------------------------------------------ binary quiz: myth/fact + flags */
function quizScreen(id) {
  reg(id, { name: id === 'myth' ? 'Myth or fact?' : 'Safe / green flag, red flag', group: 'Play', isNew: true,
    render: () => { const T = tid(); const meta = id === 'myth' ? { h: 'MYTH OR FACT?', s: 'Is it a whopper or the truth?', a: 'MYTH', b: 'FACT' } : { h: G.FLAGS[T].title, s: G.FLAGS[T].sub, a: G.FLAGS[T].a, b: G.FLAGS[T].b };
      return `${backB}${closeB('go:playhub')}${hd(meta.s, meta.h, 'sm')}<div class="qz-aw" id="qza">${awk('hi', 74)}</div><div id="qz" data-a="${meta.a}" data-b="${meta.b}"></div>`; },
    mount: el => {
      const T = tid(); const data = shuffle(id === 'myth' ? G.MYTH[T] : G.FLAGS[T].items); const host = $('#qz', el), aw = $('#qza', el); const st = { i: 0, score: 0 };
      const la = host.dataset.a, lb = host.dataset.b; const setAw = e => { aw.innerHTML = awk(e, 74); };
      const show = () => {
        if (st.i >= data.length) return end(); const q = data[st.i]; setAw('hi');
        host.innerHTML = `<div class="prog">${data.map((_, k) => `<i class="${k < st.i ? 'ok' : k === st.i ? 'on' : ''}"></i>`).join('')}</div><div class="qz-card" id="qc"><small>${st.i + 1} OF ${data.length}</small>${esc(q[0])}</div>
          <div class="qz-act"><button class="btn or" data-a="0">${la}</button><button class="btn ol" data-a="1">${lb}</button></div>`;
        $$('[data-a]', host).forEach(b => b.onclick = () => answer(+b.dataset.a === 1));
      };
      const answer = v => { const q = data[st.i], ok = v === q[1]; if (ok) st.score++; beep(ok ? 'ok' : 'no'); setAw(ok ? 'happy' : 'care'); $('.qz-act', host).style.visibility = 'hidden'; $('#qc', host).classList.add(v ? 'out' : 'outl');
        setTimeout(() => { host.insertAdjacentHTML('beforeend', `<div class="qz-fb ${ok ? 'good' : 'bad'}"><h4>${ok ? 'Yes!' : 'Not quite'}</h4><p>${esc(q[2])}</p><button class="btn ye sm" data-nx>${st.i === data.length - 1 ? 'See my score' : 'Next'}</button></div>`); $('[data-nx]', host).onclick = () => { st.i++; show(); }; }, 240); };
      const end = () => { const win = st.score >= Math.ceil(data.length * .7); if (win) { confetti(50); beep('win'); } played(id); setAw(win ? 'happy' : 'hi');
        host.innerHTML = `<div class="qz-end"><div class="big-score">${st.score}<span> / ${data.length}</span></div><h3 class="disp">${win ? 'Brilliant! You really know your stuff.' : 'Good try. Let’s play again.'}</h3><p>${win ? '+2 stars' : 'Every round makes you wiser.'}</p><div class="btns"><button class="btn ol" data-again>Play again</button><button class="btn ghost" data-act="go:playhub">More games</button></div></div>`;
        $('[data-again]', host).onclick = () => { st.i = 0; st.score = 0; show(); }; if (win) N.addStars(2, 'a great round'); };
      show();
    } });
}
quizScreen('myth'); quizScreen('flags');

/* ------------------------------------------------------------------ Brain boost (multiple choice) */
reg('brain', { name: 'Brain boost', group: 'Play', isNew: true,
  render: () => `${backB}${closeB('go:playhub')}${hd('Five quick questions', 'BRAIN BOOST', 'sm')}<div class="qz-aw" id="qza">${awk('think', 74)}</div><div id="qz"></div>`,
  mount: el => {
    const data = G.MCQ[tid()]; const host = $('#qz', el), aw = $('#qza', el); const st = { i: 0, score: 0 };
    const show = () => { if (st.i >= data.length) return end(); const q = data[st.i]; aw.innerHTML = awk('think', 74);
      host.innerHTML = `<div class="prog">${data.map((_, k) => `<i class="${k < st.i ? 'ok' : k === st.i ? 'on' : ''}"></i>`).join('')}</div><div class="mq-q">${esc(q[0])}</div><div class="mq-opts">${q[1].map((o, i) => `<button class="oc" data-i="${i}"><i>${'ABC'[i]}</i><span>${esc(o)}</span></button>`).join('')}</div><div class="mq-fb" hidden></div>`;
      $$('.oc', host).forEach(b => b.onclick = () => { if (b.dataset.done) return; const ok = +b.dataset.i === q[2]; $$('.oc', host).forEach(x => x.dataset.done = 1); b.classList.add(ok ? 'ok' : 'no'); if (!ok) $$('.oc', host)[q[2]].classList.add('ok'); if (ok) st.score++; beep(ok ? 'ok' : 'no'); aw.innerHTML = awk(ok ? 'happy' : 'care', 74);
        const fb = $('.mq-fb', host); fb.hidden = false; fb.innerHTML = `<b>${ok ? 'Yes!' : 'Not quite.'}</b> ${esc(q[3])} <button class="btn ye sm" data-nx>${st.i === data.length - 1 ? 'See my score' : 'Next'}</button>`; $('[data-nx]', fb).onclick = () => { st.i++; show(); }; }); };
    const end = () => { const win = st.score >= 4; if (win) { confetti(50); beep('win'); } played('brain'); aw.innerHTML = awk(win ? 'happy' : 'hi', 74);
      host.innerHTML = `<div class="qz-end"><div class="big-score">${st.score}<span> / ${data.length}</span></div><h3 class="disp">${win ? 'Top of the class!' : 'Good effort. Try again?'}</h3><p>${win ? '+2 stars' : 'Practice makes it easier.'}</p><div class="btns"><button class="btn ol" data-again>Play again</button><button class="btn ghost" data-act="go:playhub">More games</button></div></div>`; $('[data-again]', host).onclick = () => { st.i = 0; st.score = 0; show(); }; if (win) N.addStars(2, 'Brain boost'); };
    show();
  } });

/* ------------------------------------------------------------------ What would you do? */
reg('wwyd', { name: 'What would you do?', group: 'Play', isNew: true,
  render: () => `${backB}${closeB('go:playhub')}${hd('Pick what you would do', 'WHAT WOULD YOU DO?', 'sm')}<div id="ww"></div>`,
  mount: el => {
    const list = G.WWYD[tid()]; const host = $('#ww', el); const st = { i: 0, pts: 0 };
    const show = () => { if (st.i >= list.length) return end(); const sc = list[st.i];
      host.innerHTML = `<div class="ww-scene">${sceneFromStr(sc.sc)}</div><div class="ww-box"><small>SITUATION ${st.i + 1} OF ${list.length} · ${esc(sc.t).toUpperCase()}</small><p>${esc(sc.q)}</p><div class="ww-opts">${shuffle(sc.opts.map((o, i) => ({ o, i }))).map(({ o, i }) => `<button class="oc" data-i="${i}"><i>•</i><span>${esc(o[0])}</span></button>`).join('')}</div><div class="ww-out" hidden></div></div>`;
      $$('.oc', host).forEach(b => b.onclick = () => { if (b.dataset.done) return; const o = sc.opts[+b.dataset.i]; $$('.oc', host).forEach(x => x.dataset.done = 1); b.classList.add(o[1] === 2 ? 'ok' : o[1] === 1 ? 'maybe' : 'no'); st.pts += o[1]; beep(o[1] === 2 ? 'ok' : o[1] === 1 ? 'tap' : 'no');
        const out = $('.ww-out', host); out.hidden = false; out.className = 'ww-out ' + (o[1] === 2 ? 'ok' : o[1] === 1 ? 'maybe' : 'no'); out.innerHTML = `<b>${o[1] === 2 ? 'Great choice!' : o[1] === 1 ? 'That could work' : 'Think again'}</b> ${esc(o[2])} <button class="btn ye sm" data-nx>${st.i === list.length - 1 ? 'See how I did' : 'Next'}</button>`; $('[data-nx]', out).onclick = () => { st.i++; show(); }; }); };
    const end = () => { const max = list.length * 2, win = st.pts >= max * .66; if (win) { confetti(46); beep('win'); } played('wwyd');
      host.innerHTML = `<div class="qz-end"><div class="big-score">${st.pts}<span> / ${max} points</span></div><h3 class="disp">${win ? 'You make smart, safe choices!' : 'Good thinking. Want to try again?'}</h3><p>${win ? '+2 stars' : 'There’s often more than one good option.'}</p><div class="btns"><button class="btn ol" data-again>Play again</button><button class="btn ghost" data-act="go:playhub">More games</button></div></div>`; $('[data-again]', host).onclick = () => { st.i = 0; st.pts = 0; show(); }; if (win) N.addStars(2, 'smart choices'); };
    show();
  } });

/* ------------------------------------------------------------------ Sort it */
reg('sort', { name: 'Sort it!', group: 'Play', isNew: true,
  render: () => { const d = G.SORT[tid()]; return `${backB}${closeB('go:playhub')}${hd('Tap the box each card belongs in', d.title.toUpperCase(), 'sm')}<div id="so"></div>`; },
  mount: el => {
    const d = G.SORT[tid()], host = $('#so', el); const st = { i: 0, score: 0, items: shuffle(d.items) };
    const show = () => { if (st.i >= st.items.length) return end(); const it = st.items[st.i];
      host.innerHTML = `<div class="prog">${st.items.map((_, k) => `<i class="${k < st.i ? 'ok' : k === st.i ? 'on' : ''}"></i>`).join('')}</div><div class="so-card" id="soc">${esc(it[0])}</div><div class="so-bins">${d.bins.map((b, i) => `<button class="so-bin" style="background:${b[1]}" data-b="${i}">${esc(b[0])}</button>`).join('')}</div><div class="so-fb" id="sofb"></div>`;
      $$('.so-bin', host).forEach(b => b.onclick = () => { const ok = +b.dataset.b === it[1]; if (ok) st.score++; beep(ok ? 'ok' : 'no'); const c = $('#soc', host); c.classList.add(ok ? 'good' : 'bad'); $('#sofb', host).textContent = ok ? 'Yes!' : `Not quite: it goes in “${d.bins[it[1]][0]}”`; $$('.so-bin', host).forEach(x => x.disabled = true); setTimeout(() => { st.i++; show(); }, 1100); }); };
    const end = () => { const win = st.score >= Math.ceil(st.items.length * .75); if (win) { confetti(46); beep('win'); } played('sort');
      host.innerHTML = `<div class="qz-end"><div class="big-score">${st.score}<span> / ${st.items.length}</span></div><h3 class="disp">${win ? 'Sorted! Nicely done.' : 'Nearly! Try again.'}</h3><p>${esc(d.why.join(' '))}</p><div class="btns"><button class="btn ol" data-again>Play again</button><button class="btn ghost" data-act="go:playhub">More games</button></div></div>`; $('[data-again]', host).onclick = () => { st.i = 0; st.score = 0; st.items = shuffle(d.items); show(); }; if (win) N.addStars(2, 'sorting'); };
    show();
  } });

/* ------------------------------------------------------------------ Match up (memory) */
reg('match', { name: 'Match up', group: 'Play', isNew: true,
  render: () => `${backB}${closeB('go:playhub')}${hd('Find each word and its meaning', 'MATCH UP', 'sm')}<div class="mt-grid" id="mg"></div><div class="mt-st" id="mts"></div>`,
  mount: el => {
    const pairs = G.MATCH[tid()]; const cards = shuffle(pairs.flatMap((p, i) => [{ k: i, t: p[0], w: true }, { k: i, t: p[1], w: false }])); const grid = $('#mg', el), stt = $('#mts', el);
    grid.innerHTML = cards.map((c, i) => `<button class="mc ${c.w ? 'wd' : 'df'}" data-i="${i}"><span class="front">?</span><span class="back">${esc(c.t)}</span></button>`).join('');
    let open = [], matched = 0, moves = 0;
    $$('.mc', grid).forEach(b => b.onclick = () => { if (b.classList.contains('on') || b.classList.contains('done') || open.length >= 2) return; b.classList.add('on'); open.push(b); beep('tap');
      if (open.length === 2) { moves++; const [x, y] = open, a = cards[+x.dataset.i], c = cards[+y.dataset.i];
        if (a.k === c.k && a.w !== c.w) { setTimeout(() => { x.classList.add('done'); y.classList.add('done'); open = []; matched++; beep('ok'); stt.textContent = `${matched} of ${pairs.length} pairs found`; if (matched === pairs.length) { confetti(50); beep('win'); played('match'); stt.innerHTML = `All matched in ${moves} tries! <button class="btn ye sm" data-again>Play again</button>`; N.addStars(2, 'matching'); $('[data-again]', stt).onclick = () => N.rerender(); } }, 500); }
        else setTimeout(() => { x.classList.remove('on'); y.classList.remove('on'); open = []; }, 1000); } });
    stt.textContent = `0 of ${pairs.length} pairs found`;
  } });

/* ------------------------------------------------------------------ Awk dice */
const FACE_ROT = [[0, 0], [0, -90], [0, -180], [0, 90], [-90, 0], [90, 0]];
const dice = { rolling: false, card: null };
reg('dice', { name: 'Awk dice', group: 'Play', isNew: true,
  render: () => `${backB}${closeB('go:playhub')}${hd('Roll, flip, talk', 'AWK DICE', 'sm')}
    <div class="dice-wrap"><div class="cube" id="cube">${G.CATS.map((c, i) => `<div class="f f${i + 1}" style="background:${c.c}"><i style="left:${10 + i * 6}px;top:${14 + (i % 3) * 10}px;width:26px;height:22px"></i><i style="right:${12 + i * 3}px;bottom:${12 + (i % 2) * 14}px;width:20px;height:18px"></i><span>${c.label}</span></div>`).join('')}</div></div>
    <div class="shadow"></div><div class="roll-hint" id="rollHint">TAP THE DICE TO ROLL</div><div class="lvl">Deck: <b>${D.TIERS[D.tierIdx(tid())].s}</b> · tone <b>${['Gentle', 'Mixed', 'Brave'][S.tone]}</b></div>
    <div class="card-area"><div class="flip" id="flip"><div class="bk"><div><b>?</b><span>Roll the dice,<br>a card will appear</span></div></div><div class="fr" id="front"></div></div></div>`,
  mount: el => {
    const cube = $('#cube', el), flip = $('#flip', el), front = $('#front', el), hint = $('#rollHint', el); cube.style.transform = 'rotateX(-24deg) rotateY(-32deg)';
    const draw = i => { const cat = G.CATS[i], max = S.tone + 1; const arr = G.DICE[tid()][cat.id].filter((_, k) => k < max); const t = pick(arr.filter(x => x !== dice.card).length ? arr.filter(x => x !== dice.card) : arr); dice.card = t;
      front.innerHTML = `<small style="color:${cat.c}">${cat.label.toUpperCase()}</small><p>${esc(t)}</p><div class="acts"><button class="btn ghost sm" data-pass>Another one</button><button class="btn ol sm" data-did>We talked ✓</button></div>`;
      $('[data-pass]', front).onclick = () => { flip.classList.remove('on'); setTimeout(() => { draw(i); flip.classList.add('on'); }, 450); beep('tap'); }; $('[data-did]', front).onclick = () => meter(); };
    const meter = () => { front.innerHTML = `<small style="color:var(--olive)">NICE ONE!</small><p>How awkward was that, honestly?</p><div class="meter">${['😬', '😅', '🙂', '😄', '🤩'].map((e, i) => `<button data-v="${i + 1}" aria-label="Awk level ${i + 1}">${e}</button>`).join('')}<span>awkward → easy</span></div>`;
      $$('.meter button', front).forEach(b => b.onclick = () => { const v = +b.dataset.v; S.awk.push(v); S.talks++; prog().chats = (prog().chats || 0) + 1; played('dice'); beep('win'); confetti(30); const last = S.awk[S.awk.length - 2];
        front.innerHTML = `<small style="color:var(--olive)">AWK-O-METER</small><p>${v >= 4 ? 'Super easy! Look at you two.' : v === 3 ? 'Not bad at all! It gets easier every time.' : 'Awkward is okay. You showed up, and that’s the hard part.'}${last && v > last ? ' (Easier than last time!)' : ''}</p><div class="acts"><button class="btn sm ol" data-again>Roll again</button></div>`; N.addStars(2, 'a family chat'); $('[data-again]', front).onclick = () => { flip.classList.remove('on'); hint.textContent = 'TAP THE DICE TO ROLL'; }; }); };
    const roll = () => { if (dice.rolling) return; dice.rolling = true; flip.classList.remove('on'); beep('pop'); const i = Math.floor(rnd(0, 6)), [x, y] = FACE_ROT[i]; hint.textContent = 'ROLLING…'; const ox = x === 0 ? -20 : 0;
      cube.style.transform = `rotateX(${x + 720 + ox}deg) rotateY(${y + 1080 + ox}deg)`;
      setTimeout(() => { draw(i); flip.classList.add('on'); hint.textContent = G.CATS[i].label.toUpperCase() + '!'; beep('ok'); dice.rolling = false; cube.style.transition = 'none'; cube.style.transform = `rotateX(${x + ox}deg) rotateY(${y + ox}deg)`; void cube.offsetWidth; cube.style.transition = ''; }, 1500); };
    $('.dice-wrap', el).onclick = roll;
  } });

/* ------------------------------------------------------------------ Feelings flower (game) */
reg('feelings', { name: 'Feelings flower', group: 'Play', isNew: true,
  render: () => `${backB}${closeB('go:playhub')}<div class="eyebrow sm" style="left:400px"><h2>FEELINGS FLOWER</h2><h3>Which petal are you today?</h3></div>
    <div class="abs" style="left:34px;top:58px;width:340px;height:380px">${N.flowerSVG({ cols: WD.EMOS.map(e => e.c), click: true, style: 'width:340px;height:378px' })}</div>
    <div class="abs" id="efp" style="left:410px;top:112px;width:440px"><div class="ef-empty">Tap a petal<small>Meet a feeling. Find it in your body. Learn what helps.</small></div></div><div class="abs" id="efc" style="right:30px;bottom:14px;font:800 11.5px var(--body);color:#777">0 / ${WD.EMOS.length} feelings met</div>`,
  mount: el => { const found = new Set(); const pts = $$('.pt', el); pts.forEach((p, i) => p.addEventListener('click', () => { found.add(i); $('#efc', el).textContent = `${found.size} / ${WD.EMOS.length} feelings met`; if (found.size === WD.EMOS.length) { confetti(50); beep('win'); played('feelings'); N.addStars(2, 'meeting every feeling'); } })); N.bindEmo(el, $('#efp', el)); } });

/* ------------------------------------------------------------------ Family challenge */
reg('challenge', { name: 'Family challenge', group: 'Play', isNew: true,
  render: () => { const c = G.CHAL[tid()]; return `${backB}${closeB('go:playhub')}${hd('This week’s mission', 'FAMILY CHALLENGE', 'sm')}<div class="chal"><small>WEEKLY · ${D.TIERS[D.tierIdx(tid())].n.toUpperCase()}</small><h4>${c.title}</h4><p>${c.body}</p></div>
    <div class="days">${c.days.map((d, i) => `<button class="day ${S.chal[i] ? 'on' : ''}" data-act="day:${i}"><i>${S.chal[i] ? '✓' : ''}</i>${d}</button>`).join('')}</div>`; } });
ACT.day = i => { i = +i; S.chal[i] = !S.chal[i]; save(); $$('.day').forEach((b, k) => { b.classList.toggle('on', !!S.chal[k]); $('i', b).textContent = S.chal[k] ? '✓' : ''; }); beep('ok'); if (S.chal[i]) { S.talks++; save(); } if (S.chal.every(Boolean)) { confetti(50); beep('win'); N.addStars(5, 'the weekly challenge'); } };

/* ------------------------------------------------------------------ Sticker book */
reg('stickers', { name: 'Sticker book', group: 'Play', isNew: true,
  render: () => { const T = tid(); const set = A.avatarSet(T); const n = N.stickerCount(); const toNext = S.stars % 2 === 0 ? 2 : 1;
    return `${backB}${closeB('go:hub')}${hd(`${n} of 12 collected`, 'STICKER BOOK', 'sm')}
    <div class="sb-meter"><span>★ ${S.stars}</span><div class="bar"><i style="width:${n >= 12 ? 100 : (S.stars % 2 ? 50 : 6)}%"></i></div><span>${n >= 12 ? 'Book complete!' : `${toNext} more ★ for the next sticker`}</span></div>
    <div class="sbook" style="top:118px">${set.map((a, i) => { const got = i < n; return `<button class="stk ${got ? 'got' : 'lock'}" style="--r:${[-3, 2, -1, 3, -2, 1][i % 6]}deg" data-act="stk:${i}" aria-label="${got ? 'Sticker ' + (i + 1) : 'Locked sticker'}">${A.avatarHTML(a.id, 84)}<small>${got ? '' : 'keep playing'}</small></button>`; }).join('')}</div>`; } });
ACT.stk = i => { if (+i < N.stickerCount()) { beep('pop'); toast('Ready to stick on the fridge!'); } else toast('Finish a story or play a game to unlock!'); };
})();
