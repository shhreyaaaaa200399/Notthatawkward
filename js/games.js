/* Not That Awk — PLAY, MEET, settings + dashboard screens (new screens following the same design language). */
(() => {
'use strict';
const N = window.NTA, D = N.D, S = N.S, { go, reg, ACT, t, ICON, esc, pick, rnd, toast, modal, closeModal, confetti, beep, save, addStars } = N;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const { gearB, closeB, backB, hd, foot, chipHTML } = N;
const mini = (svg, w = 80) => `<span style="display:inline-block;width:${w}px">${svg}</span>`;

/* ------------------------------------------------------------------ PLAY hub */
const GAMES = [
  { id: 'dice', c: 'ol', n: 'Awk Dice', p: 'Roll, flip and chat. The kit, now in your pocket.', tag: 'TOGETHER', r: -3, ic: `<svg viewBox="0 0 90 80" width="90"><polygon points="45,6 82,24 82,56 45,74 8,56 8,24" fill="#9ca32f" stroke="#fff" stroke-width="3"/><polygon points="45,6 82,24 45,42 8,24" fill="#ffffff30"/><polygon points="30,30 40,26 44,34 34,38" fill="#ffcb05"/><polygon points="52,48 62,44 66,52 56,56" fill="#ffcb05"/><polygon points="16,40 24,38 25,48 18,50" fill="#ffcb05"/></svg>` },
  { id: 'myth', c: 'or', n: 'Myth or Fact?', p: 'Swipe-style quiz that busts the whoppers.', tag: 'SOLO', r: 2, ic: `<svg viewBox="0 0 90 80" width="90"><path d="M26 18l16-10 16 10-8 20-4 12H34l4-14z" fill="#ffcb05" stroke="#000" stroke-width="2.5"/><circle cx="42" cy="62" r="7" fill="#ffcb05" stroke="#000" stroke-width="2.5"/><polygon points="62,52 82,50 80,70 66,68" fill="#9ca32f"/></svg>` },
  { id: 'feelings', c: 'pu', n: 'Feelings Flower', p: 'Tap a petal, meet a feeling.', tag: 'SOLO', r: -2, ic: `<svg viewBox="0 0 90 80" width="90">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<polygon points="45,40 ${45 + 34 * Math.cos(i * .785 - .2)},${40 + 34 * Math.sin(i * .785 - .2)} ${45 + 34 * Math.cos(i * .785 + .25)},${40 + 34 * Math.sin(i * .785 + .25)}" fill="${['#ffcb05', '#e35e26', '#9ca32f', '#96c5d1', '#ea8259', '#ffecba', '#434f64', '#fff'][i]}"/>`).join('')}<circle cx="45" cy="40" r="12" fill="#96c5d1" stroke="#000" stroke-width="2"/></svg>` },
  { id: 'safe', c: 'ye', n: 'Safe or Not?', p: 'Spot the green flags and the red ones.', tag: 'SOLO', r: 3, ic: `<svg viewBox="0 0 90 80" width="90"><path d="M45 6l30 10v22c0 20-14 32-30 38-16-6-30-18-30-38V16z" fill="#fff" stroke="#000" stroke-width="3"/><path d="M30 40l11 11 20-22" fill="none" stroke="#59662e" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { id: 'challenge', c: 'nv', n: 'Family Challenge', p: 'One tiny mission for the whole family.', tag: 'WEEKLY', r: -3, ic: `<svg viewBox="0 0 90 80" width="90"><path d="M10 70V30l18 12 17-30 17 30 18-12v40z" fill="#ffcb05" stroke="#000" stroke-width="3" stroke-linejoin="round"/><circle cx="45" cy="55" r="7" fill="#e35e26" stroke="#000" stroke-width="2.5"/></svg>` },
  { id: 'body', c: 'ol', n: 'Body Facts', p: 'True or false? Real names and real facts.', tag: 'SOLO', r: 2, ic: `<svg viewBox="0 0 90 80" width="90"><rect x="22" y="8" width="46" height="64" rx="6" fill="#fff" stroke="#000" stroke-width="3"/><circle cx="45" cy="28" r="9" fill="#ffcb05" stroke="#000" stroke-width="2.5"/><path d="M32 52h26M32 62h18" stroke="#000" stroke-width="3.5"/></svg>` },
  { id: 'priv', c: 'pu', n: 'Private or Public?', p: 'Sort what belongs where.', tag: 'SOLO', r: -2, ic: `<svg viewBox="0 0 90 80" width="90"><rect x="10" y="30" width="30" height="40" fill="#ffcb05" stroke="#000" stroke-width="3"/><rect x="50" y="16" width="30" height="54" fill="#96c5d1" stroke="#000" stroke-width="3"/><circle cx="25" cy="50" r="4" fill="#000"/></svg>` },
  { id: 'wwyd', c: 'or', n: 'What Would You Do?', p: 'Pick the best move in tricky moments.', tag: 'SOLO', r: 3, ic: `<svg viewBox="0 0 90 80" width="90"><circle cx="45" cy="40" r="30" fill="#ffcb05" stroke="#000" stroke-width="3"/><path d="M36 33a9 9 0 1118 2c0 6-9 6-9 12" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round"/><circle cx="45" cy="58" r="3.4" fill="#000"/></svg>` },
  { id: 'match', c: 'nv', n: 'Feelings Match', p: 'Flip cards, find the feeling pairs.', tag: 'SOLO', r: -3, ic: `<svg viewBox="0 0 90 80" width="90"><rect x="8" y="14" width="34" height="48" fill="#fff" stroke="#000" stroke-width="3" transform="rotate(-8 25 38)"/><rect x="48" y="14" width="34" height="48" fill="#e35e26" stroke="#000" stroke-width="3" transform="rotate(8 65 38)"/><circle cx="25" cy="38" r="8" fill="#ffcb05" stroke="#000" stroke-width="2.5"/></svg>` },
];
const gcol = { ol: 'var(--olive)', or: 'var(--orange)', pu: 'var(--logo)', ye: 'var(--yellow)', nv: 'var(--navy)' };
reg('playhub', { name: 'Play · games hub (new)', group: 'Play',
  render: () => `${gearB}${closeB('go:hub')}${chipHTML('sm')}${hd('Pick a game!', 'PLAY', 'sm')}
    <div class="ph-grid">${GAMES.map(g => `<button class="pg ${g.c === 'ye' ? 'ye' : ''}" style="background:${gcol[g.c]};--r:${g.r}deg" data-act="go:${g.id}"><span class="tg">${g.tag}</span><h5>${g.n}</h5><p>${g.p}</p><div class="ic">${g.ic}</div></button>`).join('')}</div>
    <div class="ph-bar"><button data-act="go:stickers">${ICON.sticker} Sticker book <b style="color:var(--orange)">${S.stk.length}/12</b></button><button data-act="go:hub">${ICON.home} Home</button></div>` });

/* ------------------------------------------------------------------ Awk Dice */
const FACE_ROT = [[0, 0], [0, -90], [0, -180], [0, 90], [-90, 0], [90, 0]];
const dice = { face: 0, rolling: false, card: null };
reg('dice', { name: 'Awk Dice (new)', group: 'Play',
  render: () => `${backB}${closeB('go:playhub')}${hd('Roll, flip, talk.', 'AWK DICE', 'sm')}
    <div class="dice-wrap"><div class="cube" id="cube">${D.DICE.map((d, i) => `<div class="f f${i + 1}" style="background:${d.c === '#ffcb05' ? '#9ca32f' : d.c}"><i style="left:${10 + i * 6}px;top:${14 + (i % 3) * 10}px;width:26px;height:22px"></i><i style="right:${12 + i * 3}px;bottom:${12 + (i % 2) * 14}px;width:20px;height:18px"></i><span>${d.label}</span></div>`).join('')}</div></div>
    <div class="shadow"></div><div class="roll-hint" id="rollHint">TAP THE DICE TO ROLL</div>
    <div class="lvl">Deck level <b>${D.TONES[S.tone].name}</b></div>
    <div class="card-area"><div class="flip" id="flip"><div class="bk"><div><b>?</b><span>Roll the dice,<br>a card will appear</span></div></div><div class="fr" id="front"></div></div></div>`,
  mount: el => {
    const cube = $('#cube', el), flip = $('#flip', el), front = $('#front', el), hint = $('#rollHint', el);
    cube.style.transform = 'rotateX(-24deg) rotateY(-32deg)';
    const draw = (i) => {
      const d = D.DICE[i], max = D.TONES[S.tone].max; const pool = d.cards.filter(c => c[0] <= max); const c = pick(pool.filter(x => x !== dice.card) .length ? pool.filter(x => x !== dice.card) : pool); dice.card = c;
      front.innerHTML = `<small style="color:${d.c === '#ffcb05' ? '#8a6d00' : d.c}">${d.label.toUpperCase()} · LEVEL ${c[0]}</small><p>${esc(c[1])}</p>
        <div class="acts"><button class="btn ghost sm" data-pass>Another one</button><button class="btn ol sm" data-did>We talked! ✓</button></div>`;
      $('[data-pass]', front).onclick = () => { flip.classList.remove('on'); setTimeout(() => { draw(i); flip.classList.add('on'); }, 450); beep('tap'); };
      $('[data-did]', front).onclick = () => meter();
    };
    const meter = () => {
      front.innerHTML = `<small style="color:var(--olive)">NICE ONE!</small><p>How awkward was that, honestly?</p><div class="meter">${['😬', '😅', '🙂', '😄', '🤩'].map((e, i) => `<button data-v="${i + 1}" aria-label="Awk level ${i + 1}">${e}</button>`).join('')}<span style="margin-left:8px">awkward → easy-peasy</span></div>`;
      $$('.meter button', front).forEach(b => b.onclick = () => { const v = +b.dataset.v; S.awk.push(v); S.talks++; S.games++; S.week[6] = (S.week[6] || 0) + 1; save(); beep('win'); confetti(36);
        const last = S.awk[S.awk.length - 2]; front.innerHTML = `<small style="color:var(--olive)">AWK-O-METER</small><p>${v >= 4 ? 'Super easy! Look at you two.' : v === 3 ? 'Not bad at all! It gets easier every time.' : 'Awkward is okay. You showed up, and that’s the hard part.'}${last && v > last ? ' <span style="color:var(--olive)">(Easier than last time!)</span>' : ''}</p><div class="acts"><button class="btn sm ol" data-again>Roll again</button></div>`;
        addStars(2, 'a family chat'); $('[data-again]', front).onclick = () => { flip.classList.remove('on'); hint.textContent = 'TAP THE DICE TO ROLL'; }; });
    };
    const roll = () => {
      if (dice.rolling) return; dice.rolling = true; flip.classList.remove('on'); beep('pop');
      const i = Math.floor(rnd(0, 6)), [x, y] = FACE_ROT[i]; hint.textContent = 'ROLLING…';
      cube.style.transform = `rotateX(${x + 720 + (x === 0 ? -20 : 0)}deg) rotateY(${y + 1080 + (x === 0 ? -20 : 0)}deg)`;
      setTimeout(() => { draw(i); flip.classList.add('on'); hint.textContent = D.DICE[i].label.toUpperCase() + '!'; beep('ok'); dice.rolling = false;
        cube.style.transition = 'none'; cube.style.transform = `rotateX(${x + (x === 0 ? -20 : 0)}deg) rotateY(${y + (x === 0 ? -20 : 0)}deg)`; void cube.offsetWidth; cube.style.transition = ''; }, 1500);
    };
    $('.dice-wrap', el).onclick = roll; $('.dice-wrap', el).style.cursor = 'pointer';
  } });

/* ------------------------------------------------------------------ quiz engine (Myth or Fact + Safe or Not) */
function quiz(id, title, data, labels) {
  const st = { i: 0, score: 0 };
  reg(id, { name: title.h[0] + title.h.slice(1).toLowerCase() + ' (new)', group: 'Play',
    render: () => `${backB}${closeB('go:playhub')}${hd(title.sub, title.h, 'sm')}<img class="deco" src="assets/${id === 'myth' ? 'who_child' : 'who_parent'}.png" style="left:40px;bottom:14px;height:112px" alt=""><img class="deco" src="assets/who_other.png" style="right:44px;bottom:16px;height:100px" alt=""><div id="qz"></div>`,
    mount: el => {
      st.i = 0; st.score = 0; const host = $('#qz', el);
      const show = () => {
        if (st.i >= data.length) return end();
        const q = data[st.i];
        host.innerHTML = `<div class="prog">${data.map((_, k) => `<i class="${k < st.i ? 'ok' : k === st.i ? 'on' : ''}"></i>`).join('')}</div>
          <div class="qz-card" id="qc"><small>${title.tag} ${st.i + 1} / ${data.length}</small>${esc(q[0])}</div>
          <div class="qz-act"><button class="btn or" data-a="0">${labels[0]}</button><button class="btn ol" data-a="1">${labels[1]}</button></div>`;
        $$('[data-a]', host).forEach(b => b.onclick = () => answer(+b.dataset.a === 1));
      };
      const answer = v => {
        const q = data[st.i], ok = v === q[1]; if (ok) st.score++; beep(ok ? 'ok' : 'no');
        const qc = $('#qc', host); qc.classList.add(v ? 'out' : 'outl');
        const tell = id === 'safe' && !q[1]; const cls = ok ? 'good' : 'bad';
        setTimeout(() => {
          const ab = $('.qz-act', host); if (ab) ab.style.visibility = 'hidden';
          host.insertAdjacentHTML('beforeend', `<div class="qz-fb ${tell ? 'tell' : cls}"><h4>${ok ? 'Yes!' : 'Not quite!'}</h4><p>${esc(q[2])}</p>${tell ? '<p style="font-size:13px;opacity:.9">👉 Your Trusted Five: ' + esc((S.trusted && S.trusted.length ? S.trusted.join(', ') : 'build it in the “Who can I tell?” story')) + '</p>' : ''}<button class="btn ye sm" data-nx>${st.i === data.length - 1 ? 'See my score' : 'Next'}</button></div>`);
          $('[data-nx]', host).onclick = () => { st.i++; show(); };
        }, 260);
      };
      const end = () => {
        const win = st.score >= Math.ceil(data.length * .7); if (win) { confetti(70); beep('win'); } S.games++; S.week[6] = (S.week[6] || 0) + 1; save();
        host.innerHTML = `<div class="abs" style="left:0;right:0;top:100px;text-align:center"><div class="disp" style="font-size:72px;color:var(--purple);line-height:1">${st.score}<span style="font-size:36px;color:#999"> / ${data.length}</span></div>
          <h3 class="disp" style="font-size:26px;margin:8px 0 6px">${win ? 'Brilliant! You really know your stuff.' : 'Good try! Let’s play again.'}</h3><p style="font:600 14px var(--body);color:#777;margin:0 0 22px">${win ? '+2 stars for the sticker book' : 'Every round makes you wiser.'}</p>
          <div style="display:flex;gap:14px;justify-content:center"><button class="btn ol" data-again>Play again</button><button class="btn ghost" data-act="go:playhub">More games</button></div></div>`;
        $('[data-again]', host).onclick = () => { st.i = 0; st.score = 0; show(); }; if (win) addStars(2, title.h.toLowerCase());
      };
      show();
    } });
}
quiz('myth', { h: 'MYTH OR FACT?', sub: 'Is it a whopper or the truth?', tag: 'STATEMENT' }, D.MYTHS, ['MYTH ✕', 'FACT ✓']);
quiz('safe', { h: 'SAFE OR NOT?', sub: 'Green flag or red flag?', tag: 'SITUATION' }, D.SAFE, ['NOT OK ✕', 'OK ✓']);

quiz('body', { h: 'BODY FACTS', sub: 'True or false? Let’s find out.', tag: 'FACT' }, [
  ['Every body part has a proper name.', true, 'True! Real names help us stay safe and confident.'],
  ['Girls and boys all start puberty on the same day.', false, 'False! Everyone has their own clock.'],
  ['Sweating more is a normal part of growing up.', true, 'True! Bodies change, and a daily wash helps.'],
  ['Pimples mean you are dirty.', false, 'False! Pimples come from hormones, not dirt.'],
  ['A baby grows in the uterus.', true, 'True! It takes about nine months.'],
  ['You can’t ask a doctor about your body.', false, 'False! Doctors love good questions.'],
], ['FALSE ✕', 'TRUE ✓']);
quiz('priv', { h: 'PRIVATE OR PUBLIC?', sub: 'Where does it belong?', tag: 'THING' }, [
  ['Changing your clothes', true, 'Private! Do it in a private space like your room.'],
  ['Playing in the park', false, 'Public! It’s fine for everyone to see.'],
  ['Using the toilet', true, 'Private! Close the door.'],
  ['Your home address', true, 'Private online! Don’t share it with strangers.'],
  ['Your favourite colour', false, 'Public! Share it freely.'],
  ['A photo in your underwear', true, 'Private, always. Never share it, and tell a grown-up if asked.'],
], ['PUBLIC ◯', 'PRIVATE ●']);

/* ------------------------------------------------------------------ What Would You Do? */
const WWYD = [
  ['A classmate keeps making jokes about your body.', ['Laugh along', 'Say “Stop, that’s not okay” and tell a teacher', 'Say nothing'], 1, 'Telling them to stop and getting help works best. You deserve respect.'],
  ['A friend shares a secret that makes you worried for their safety.', ['Keep it secret', 'Tell a trusted grown-up', 'Post about it'], 1, 'Safety secrets are never kept. Telling a grown-up helps your friend.'],
  ['You see something scary online.', ['Close it and tell a grown-up', 'Share it with friends', 'Keep looking'], 0, 'Close it and tell. You won’t be in trouble.'],
  ['Someone asks if they can hug you. You don’t want to.', ['Say “No thanks, high five?”', 'Hug anyway', 'Run away silently'], 0, 'Clear and kind. You decide.'],
  ['You feel embarrassed about a body change.', ['Hide it forever', 'Ask a trusted grown-up', 'Ask a stranger online'], 1, 'Ask someone you trust. Questions are normal.'],
];
const wst = { i: 0, score: 0 };
reg('wwyd', { name: 'What Would You Do? (new)', group: 'Play',
  render: () => `${backB}${closeB('go:playhub')}${hd('Pick the best move.', 'WHAT WOULD YOU DO?', 'sm')}<div id="wq"></div>`,
  mount: el => {
    wst.i = 0; wst.score = 0; const host = $('#wq', el);
    const show = () => {
      if (wst.i >= WWYD.length) {
        const win = wst.score >= 4; if (win) { confetti(70); beep('win'); addStars(2, 'smart choices'); } S.games++; S.week[6] = (S.week[6] || 0) + 1; save();
        host.innerHTML = `<div class="abs" style="left:0;right:0;top:100px;text-align:center"><div class="disp" style="font-size:72px;color:var(--purple);line-height:1">${wst.score}<span style="font-size:36px;color:#999"> / ${WWYD.length}</span></div>
          <h3 class="disp" style="font-size:26px;margin:8px 0 20px">${win ? 'Wise choices!' : 'Good try! Let’s play again.'}</h3>
          <div style="display:flex;gap:14px;justify-content:center"><button class="btn ol" data-again>Play again</button><button class="btn ghost" data-act="go:playhub">More games</button></div></div>`;
        $('[data-again]', host).onclick = () => { wst.i = 0; wst.score = 0; show(); }; return;
      }
      const q = WWYD[wst.i];
      host.innerHTML = `<div class="prog">${WWYD.map((_, k) => `<i class="${k < wst.i ? 'ok' : k === wst.i ? 'on' : ''}"></i>`).join('')}</div>
        <div class="qz-card" style="top:106px;min-height:70px;padding:16px 24px"><small>SITUATION ${wst.i + 1} / ${WWYD.length}</small>${esc(q[0])}</div>
        <div class="wq-opts">${q[1].map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div>`;
      $$('.wq-opts .opt', host).forEach(b => b.onclick = () => {
        const k = +b.dataset.k, ok = k === q[2]; if (ok) wst.score++; beep(ok ? 'ok' : 'no');
        host.insertAdjacentHTML('beforeend', `<div class="qz-fb ${ok ? 'good' : 'bad'}" style="top:106px"><h4>${ok ? 'Yes!' : 'Hmm, not quite.'}</h4><p>${esc(q[3])}</p><button class="btn ye sm" data-nx>${wst.i === WWYD.length - 1 ? 'See score' : 'Next'}</button></div>`);
        $('[data-nx]', host).onclick = () => { wst.i++; show(); };
      });
    };
    show();
  } });

/* ------------------------------------------------------------------ Feelings Match (memory) */
const MATCH = [['😊', 'Happy'], ['😢', 'Sad'], ['😠', 'Angry'], ['😨', 'Scared'], ['😳', 'Embarrassed'], ['😴', 'Tired']];
reg('match', { name: 'Feelings Match (new)', group: 'Play',
  render: () => `${backB}${closeB('go:playhub')}${hd('Find the pairs.', 'FEELINGS MATCH', 'sm')}<div class="mm-grid" id="mm"></div><div class="mm-info" id="mmi">Pairs found: 0 / ${MATCH.length}</div>`,
  mount: el => {
    const host = $('#mm', el), info = $('#mmi', el);
    const cards = MATCH.flatMap(([e, n], i) => [{ i, f: e, face: 'emoji' }, { i, f: n, face: 'word' }]).sort(() => Math.random() - .5);
    host.innerHTML = cards.map((c, k) => `<button class="mc ${c.face}" data-k="${k}"><span class="b">?</span><span class="f">${c.f}</span></button>`).join('');
    let open = [], done = 0, lock = false;
    $$('.mc', host).forEach(b => b.onclick = () => {
      if (lock || b.classList.contains('up') || b.classList.contains('ok')) return; b.classList.add('up'); beep('tap'); open.push(b);
      if (open.length === 2) {
        const [a, c] = open, m = cards[+a.dataset.k].i === cards[+c.dataset.k].i; lock = true;
        setTimeout(() => {
          if (m) { a.classList.add('ok'); c.classList.add('ok'); done++; beep('ok'); info.textContent = `Pairs found: ${done} / ${MATCH.length}`;
            if (done === MATCH.length) { confetti(70); beep('win'); S.games++; S.week[6] = (S.week[6] || 0) + 1; save(); addStars(2, 'matching every feeling'); info.textContent = 'You found them all!'; } }
          else { a.classList.remove('up'); c.classList.remove('up'); beep('no'); }
          open = []; lock = false;
        }, m ? 350 : 800);
      }
    });
  } });


/* ------------------------------------------------------------------ Feelings flower */
reg('feelings', { name: 'Feelings Flower (new)', group: 'Play',
  render: () => `${backB}${closeB('go:playhub')}<div class="eyebrow sm" style="left:400px"><h2>FEELINGS FLOWER</h2><h3>Which petal are you today?</h3></div>
    <div class="abs" style="left:34px;top:58px;width:340px;height:380px">${N.flowerSVG({ cols: D.EMOS.map(e => e.c), click: true, style: 'width:340px;height:378px' })}</div>
    <div class="abs" id="efp" style="left:410px;top:112px;width:480px"><div class="ef-empty" style="position:static;width:auto;padding-top:60px">Tap a petal<small>Meet a feeling. Find it in your body. Learn what helps.</small></div></div>
    <div class="abs" id="efc" style="right:26px;bottom:18px;font:800 11.5px var(--body);color:#777">0 / ${D.EMOS.length} feelings met</div>`,
  mount: el => {
    const found = new Set(); const pts = $$('.pt', el);
    N.D.EMOS.forEach((e, i) => { const p = pts[i]; p.addEventListener('click', () => { found.add(i); $('#efc', el).textContent = `${found.size} / ${D.EMOS.length} feelings met`; if (found.size === D.EMOS.length) { confetti(60); beep('win'); S.games++; save(); addStars(2, 'meeting every feeling'); } }); });
    N.D.EMOS.forEach((e, i) => { }); window.NTA_bindEmo(el, $('#efp', el));
  } });

/* ------------------------------------------------------------------ Sticker book + challenge */
reg('stickers', { name: 'Sticker book (new)', group: 'Play',
  render: () => { const next = 3 + Math.floor(S.stars / 2) + 1; const toNext = (S.stars % 2 === 0) ? 2 : 1;
    return `${backB}${closeB('go:hub')}${hd(`${S.stk.length} of 12 collected`, 'STICKER BOOK', 'sm')}
    <div class="sb-meter"><span>★ ${S.stars}</span><div class="bar"><i style="width:${S.stk.length >= 12 ? 100 : (S.stars % 2 ? 50 : 6)}%"></i></div><span>${S.stk.length >= 12 ? 'Book complete!' : `${toNext} more ★ for the next sticker`}</span></div>
    <div class="sbook" style="top:118px">${D.AVATARS.map((a, i) => { const got = S.stk.includes(a); return `<button class="stk ${got ? 'got' : 'lock'}" style="--r:${[-3, 2, -1, 3, -2, 1][i % 6]}deg" data-act="stk:${a}" aria-label="${got ? D.AV_NAME[a] : 'Locked sticker'}"><img src="assets/av_${a}.png" alt=""><small>${got ? D.AV_NAME[a] : 'keep playing'}</small></button>`; }).join('')}</div>`; } });
ACT.stk = a => { if (S.stk.includes(a)) { beep('pop'); toast(`${D.AV_NAME[a]}: ready to stick on the fridge!`); } else toast('Finish a story or play a game to unlock!'); };

const CHAL = { title: 'The Compliment Chain', body: 'Each day, give one specific compliment to a different family member. Say what you noticed, not just “nice”. Example: “I loved how patient you were with your little cousin.”', days: ['Day 1 · a parent or caretaker', 'Day 2 · a sibling or cousin', 'Day 3 · yourself (yes, really)'] };
reg('challenge', { name: 'Family challenge (new)', group: 'Play',
  render: () => `${backB}${closeB('go:playhub')}${hd('This week’s mission', 'FAMILY CHALLENGE', 'sm')}
    <div class="chal"><small>WEEKLY · ALL AGES</small><h4>${CHAL.title}</h4><p>${CHAL.body}</p></div>
    <img class="deco" src="assets/st_kids4.png" style="right:60px;bottom:6px;height:122px" alt=""><div class="days">${CHAL.days.map((d, i) => `<button class="day ${S.chal[i] ? 'on' : ''}" data-act="day:${i}"><i>${S.chal[i] ? '✓' : ''}</i>${d}</button>`).join('')}</div>` });
ACT.day = i => { i = +i; S.chal[i] = !S.chal[i]; save(); $$('.day').forEach((b, k) => { b.classList.toggle('on', !!S.chal[k]); $('i', b).textContent = S.chal[k] ? '✓' : ''; }); beep('ok'); if (S.chal[i]) { S.talks++; save(); } if (S.chal.every(Boolean)) { confetti(60); beep('win'); addStars(5, 'the weekly challenge'); } };

/* ------------------------------------------------------------------ MEET */
const awkieSVG = (w = 150) => `<svg viewBox="0 0 120 130" width="${w}" class="mascot"><polygon points="12,34 28,2 44,28" fill="#653781" stroke="#000" stroke-width="2.5"/><polygon points="76,28 92,2 108,34" fill="#653781" stroke="#000" stroke-width="2.5"/>
  <polygon points="10,24 108,18 112,116 16,122" fill="#e35e26" stroke="#000" stroke-width="3"/>
  <circle cx="42" cy="58" r="13" fill="#fff" stroke="#000" stroke-width="2.5"/><circle cx="82" cy="56" r="13" fill="#fff" stroke="#000" stroke-width="2.5"/><circle cx="45" cy="60" r="5.5" fill="#000"/><circle cx="85" cy="58" r="5.5" fill="#000"/>
  <ellipse cx="28" cy="84" rx="9" ry="6" fill="#ffcb05" opacity=".9"/><ellipse cx="98" cy="82" rx="9" ry="6" fill="#ffcb05" opacity=".9"/>
  <path d="M38 94Q62 118 88 92" fill="#fff" stroke="#000" stroke-width="3"/><path d="M60 8q4-10 12-4" stroke="#000" stroke-width="3" fill="none"/></svg>`;
reg('meethub', { name: 'Meet · hub (new)', group: 'Meet',
  render: () => `${gearB}${closeB('go:hub')}${chipHTML('sm')}${hd('Ask. Listen. Say hi.', 'MEET', 'sm')}
    <div class="mh">
      <button class="mt" style="background:var(--orange);--r:-2deg;width:220px" data-act="go:awkie"><span class="tg">ANONYMOUS</span><h5>Ask Awkie</h5><p>Whisper any question. Awkie answers, no judgement.</p><div class="ic">${awkieSVG(70)}</div></button>
      <button class="mt" style="background:var(--logo);--r:2deg;width:220px" data-act="go:ama"><span class="tg">LIVE · WEEKLY</span><h5>Ask an Expert</h5><p>Paediatricians, psychologists and educators, answering you.</p><div class="ic" style="gap:4px">${N.avImg('panda').replace('<img', '<img style="height:58px"')}${N.avImg('fox').replace('<img', '<img style="height:68px"')}${N.avImg('hedgehog').replace('<img', '<img style="height:58px"')}</div></button>
      <button class="mt ye" style="background:var(--yellow);--r:-1.5deg;width:220px" data-act="go:world"><span class="tg">GLOBAL</span><h5>Hi, World!</h5><p>See families chatting everywhere. Send a hello!</p><img class="ic" src="assets/why_meet.png" style="width:128px;right:8px;bottom:6px" alt=""></button>
    </div>
    <div class="who-line" style="bottom:20px">Kids can send stickers and greetings only. Grown-ups handle the rest.</div>` });

const chat = { log: [] };
reg('awkie', { name: 'Ask Awkie (new)', group: 'Meet',
  render: () => `${backB}${closeB('go:meethub')}${hd('Ask me anything.', 'ASK AWKIE', 'sm')}
    <div class="awkie">${awkieSVG(150)}<br><button class="anon" data-act="anon"><span class="sw-t ${S._anon === false ? '' : 'on'}"></span> Anonymous</button></div>
    <div class="sos"><b>Feeling unsafe?</b> Tell a trusted grown-up. In India you can call <b>Childline 1098</b> (free).</div>
    <div class="chat"><div class="log" id="log"></div><div class="chips" id="chips"></div><form class="inbar" id="fm"><input id="qin" placeholder="Type your question…" maxlength="140" autocomplete="off" aria-label="Your question"><button class="btn or sm" type="submit">${ICON.send}</button></form></div>`,
  mount: el => {
    const log = $('#log', el), chips = $('#chips', el), inp = $('#qin', el);
    const add = (cls, html) => { const m = document.createElement('div'); m.className = 'msg ' + cls; m.innerHTML = html; log.appendChild(m); log.scrollTop = log.scrollHeight; return m; };
    const bot = html => { const ty = document.createElement('div'); ty.className = 'typing'; ty.innerHTML = '<i></i><i></i><i></i>'; log.appendChild(ty); log.scrollTop = log.scrollHeight; return new Promise(r => setTimeout(() => { ty.remove(); r(add('bot', html)); }, 800)); };
    const ask = async q => {
      if (!q.trim()) return; add('me', esc(q)); inp.value = ''; beep('tap');
      const rule = D.AWKIE.find(r => r.k.test(q)); let html, extra = '';
      if (rule) { html = esc(rule.a); if (rule.go) extra += `<button class="btn sm ye" data-go="${rule.go}">Read the story</button>`; if (rule.card) extra += `<button class="btn sm ol" data-card="${esc(rule.card)}">Make a cue card</button>`; if (rule.sos) html = `<b style="color:var(--maroon)">${html}</b>`; }
      else { html = esc(D.AWKIE_FALLBACK); extra = `<button class="btn sm ol" data-card="${esc(q)}">Make a cue card</button>`; }
      const m = await bot(html + (extra ? `<div class="row">${extra}</div>` : ''));
      $$('[data-go]', m).forEach(b => b.onclick = () => go('story', { id: b.dataset.go.split(':')[1] }));
      $$('[data-card]', m).forEach(b => b.onclick = () => { modal(`<div class="sheet" style="left:230px;top:80px;width:470px;padding:26px 28px;box-shadow:0 0 0 3px #000,10px 10px 0 3px var(--orange)"><div class="disp" style="font-size:13px;letter-spacing:1.5px;color:var(--orange)">CUE CARD FOR THE FRIDGE</div><p style="margin:10px 0 20px;font:800 20px/1.3 var(--body)">${esc(b.dataset.card)}</p><div style="display:flex;justify-content:flex-end;gap:10px"><button class="btn sm ol" data-save>Save to fridge ✓</button></div></div>`); $('#modal [data-save]').onclick = () => { closeModal(); toast('Saved. Chat about it at dinner!'); S.talks++; save(); }; });
    };
    bot('Hi, I’m <b>Awkie</b>! Ask me anything. No question is silly' + (S._anon === false ? '.' : ', and nobody will know it was you.'));
    ['What is a crush?', 'How are babies born?', 'What is a period?', 'Why is it so awkward?'].forEach(q => { const b = document.createElement('button'); b.textContent = q; b.onclick = () => ask(q); chips.appendChild(b); });
    $('#fm', el).onsubmit = e => { e.preventDefault(); ask(inp.value); };
  } });
ACT.anon = () => { S._anon = S._anon === false; $('.sw-t').classList.toggle('on', S._anon !== false); toast(S._anon === false ? 'Awkie will see your nickname' : 'Anonymous mode on'); };

reg('ama', { name: 'Ask an Expert (new)', group: 'Meet',
  render: () => `${backB}${closeB('go:meethub')}${hd('Real experts. Real answers.', 'ASK AN EXPERT', 'sm')}
    <div class="ama"><div class="ses"><div class="qa-h">COMING UP (SAMPLE SESSIONS)</div>${D.AMA.map(a => `<div class="sess" style="--c:${a.c}">${N.avImg(a.av === 'owl' ? 'elephant' : a.av)}<div><b>${a.role}</b><span>${esc(a.topic)}</span></div><span class="when">${a.when}</span></div>`).join('')}
      <button class="btn ye" data-act="askq">Send a question anonymously</button></div>
      <div><div class="qa-h">PARENTS ASKED</div><div class="qa">${D.QA.map(q => `<details><summary>${esc(q[0])}</summary><p>${esc(q[1])}</p></details>`).join('')}</div></div></div>` });
ACT.askq = () => {
  modal(`<div class="sheet" style="left:190px;top:70px;width:550px;padding:24px 28px;box-shadow:0 0 0 3px #000,10px 10px 0 3px var(--yellow)"><h4 class="disp" style="margin:0 0 4px;font-size:26px;color:var(--purple)">Your question, anonymously</h4><p style="margin:0 0 12px;font:600 12.5px var(--body);color:#777">Experts answer in the next live session. Please don’t share names or addresses.</p>
    <textarea id="aq" rows="3" maxlength="200" style="width:100%;font:600 14px var(--body);padding:10px;border:2px solid #000;outline:none;resize:none" placeholder="Type your question…"></textarea>
    <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:14px"><button class="btn ghost sm" data-close>Cancel</button><button class="btn ol sm" data-send>Send</button></div></div>`);
  $('#modal [data-close]').onclick = closeModal; $('#modal [data-send]').onclick = () => { if (!$('#aq').value.trim()) return toast('Type a question first!'); closeModal(); beep('win'); toast('Sent! An expert may answer it live.'); };
};

/* Hi, World! */
const world = { hi: 5902, fam: 1284 };
const CONT = ['M30 80 L90 60 L120 74 L128 106 L104 134 L84 170 L62 158 L52 124 Z', 'M110 180 L146 176 L162 206 L152 262 L128 296 L116 262 L108 214 Z', 'M168 92 L214 70 L248 82 L246 118 L226 138 L238 188 L212 262 L176 240 L168 180 L186 130 Z', 'M252 74 L312 62 L352 86 L342 138 L310 154 L280 138 L258 120 Z', 'M296 232 L336 224 L346 256 L318 272 L296 262 Z'];
reg('world', { name: 'Hi, World! (new)', group: 'Meet',
  render: () => `${backB}${closeB('go:meethub')}<div class="eyebrow sm" style="left:400px"><h2>HI, WORLD!</h2><h3>Families chatting right now</h3></div>
    <div class="gl"><svg viewBox="0 0 360 360"><defs><clipPath id="gc"><circle cx="180" cy="180" r="172"/></clipPath></defs><circle cx="180" cy="180" r="172" fill="#96c5d1" stroke="#000" stroke-width="3"/>
      <g clip-path="url(#gc)"><g transform="translate(-6 8)">${CONT.map(p => `<path d="${p}" fill="#59662e"/>`).join('')}</g>
      ${[0, 1, 2, 3].map(i => `<ellipse cx="${60 + i * 70}" cy="${40 + (i % 2) * 260}" rx="38" ry="12" fill="#fff" opacity=".35"/>`).join('')}
      ${D.CITIES.map((c, i) => `<g class="pin" data-i="${i}" transform="translate(${c.x * 360} ${c.y * 360})"><circle class="pl" r="7" fill="#ffcb05"/><circle r="7" fill="#e35e26" stroke="#000" stroke-width="2.5"/></g>`).join('')}</g></svg></div>
    <div class="gl-side" style="top:82px"><div class="gl-card" id="gc2"><small>TAP A PIN</small><p>Say hi to a family somewhere in the world.</p><em>Demo data, not real families.</em></div>
      <div class="counter"><div style="background:var(--orange)"><b id="cF">${world.fam.toLocaleString()}</b><span>families started a chat today</span></div><div style="background:var(--logo)"><b id="cH">${world.hi.toLocaleString()}</b><span>hellos sent</span></div></div>
      <div class="hi-row">${D.GREETS.map((g, i) => `<button data-g="${i}">${g[0]}</button>`).join('')}</div></div>`,
  mount: el => {
    const card = $('#gc2', el);
    $$('.pin', el).forEach(p => p.onclick = () => { const c = D.CITIES[+p.dataset.i]; beep('pop'); card.innerHTML = `<small>${c.n.toUpperCase()}</small><p>“${esc(c.msg)}”</p><em>${esc(c.who)} · demo data</em>`; card.style.animation = 'none'; void card.offsetWidth; card.style.animation = ''; });
    $$('[data-g]', el).forEach(b => b.onclick = () => {
      const g = D.GREETS[+b.dataset.g]; world.hi++; $('#cH', el).textContent = world.hi.toLocaleString(); beep('ok');
      const i = Math.floor(rnd(0, D.CITIES.length)), c = D.CITIES[i], f = document.createElement('div'); f.className = 'floaty'; f.textContent = g[0] + ' ' + g[1];
      f.style.left = (34 + c.x * 360 * (360 / 360) - 20) + 'px'; f.style.top = (70 + c.y * 360 - 20) + 'px'; $('.screen', document).appendChild(f); setTimeout(() => f.remove(), 2300);
      card.innerHTML = `<small>SENT TO ${c.n.toUpperCase()}</small><p>${esc(c.who)} will see your “${g[0]}”.</p><em>Kids can send stickers and greetings only.</em>`;
      if (world.hi % 5 === 0) addStars(1, 'spreading hellos');
    });
  } });

/* ------------------------------------------------------------------ Settings + dashboard + goodbye */
const setUI = { pane: 'tone' };
reg('settings', { name: 'Settings (grown-ups, new)', group: 'Grown-ups',
  render: () => { const P = [['tone', 'Tone', 'heart'], ['lang', 'Language', 'book'], ['sound', 'Sound & reading', 'play'], ['time', 'Screen time', 'clock'], ['prof', 'Profiles', 'people'], ['priv', 'Privacy', 'lock']];
    return `${backB}${closeB('go:hub')}${hd('Grown-ups corner', 'SETTINGS', 'sm')}
    <div class="set"><nav>${P.map(([id, n, ic]) => `<button class="${setUI.pane === id ? 'on' : ''}" data-act="pane:${id}">${ICON[ic]}<span style="width:18px;display:inline-block"></span>${n}</button>`).join('')}<button data-act="go:dashboard">${ICON.star.replace('#ffcb05', 'currentColor')}<span style="width:18px;display:inline-block"></span>Weekly report</button></nav><div class="pane" id="pane"></div></div>`; },
  mount: el => paneDraw(el) });
const seg = (id, items, val) => `<div class="seg">${items.map(([v, l]) => `<button class="${String(v) === String(val) ? 'on' : ''}" data-act="set:${id}:${v}">${l}</button>`).join('')}</div>`;
const tog = (id, on) => `<button class="sw-t ${on ? 'on' : ''}" data-act="stog:${id}" aria-label="Toggle"></button>`;
function paneDraw(el) {
  const p = $('#pane', el || document); const P = {
    tone: `<div class="row2"><div>Conversation tone<small>Sets the level of the Awk Dice deck and today’s cue cards.</small></div>${seg('tone', D.TONES.map(x => [x.id, x.name]), S.tone)}</div><div class="row2"><div>Parent archetype<small>${S.arch == null ? 'Not set. Retake the quick quiz.' : 'You answered as “The ' + ['Avoider', 'Researcher', 'Worrier', 'Open Mentor'][S.arch] + '”.'}</small></div><button class="btn sm ghost" data-act="go:arch">Retake</button></div>`,
    lang: `<div class="row2"><div>App language<small>English and Hindi are ready in this prototype. 8 more are on the way.</small></div>${seg('lang', [['en', 'English'], ['hi', 'हिंदी']], S.lang)}</div>`,
    sound: `<div class="row2"><div>Sound effects<small>Pops, boings and tiny fanfares.</small></div>${tog('sound', S.sound)}</div><div class="row2"><div>Read stories aloud<small>Uses your device’s voice. Tap the speaker in any story.</small></div>${tog('read', S.read)}</div>`,
    time: `<div class="row2"><div>Daily time limit<small>Awkie suggests a break when time’s up.</small></div>${seg('limit', [[15, '15m'], [30, '30m'], [45, '45m'], [60, '60m']], S.limit)}</div>`,
    prof: `${S.profiles.map(x => `<div class="row2"><div style="display:flex;gap:12px;align-items:center">${N.avImg(x.av).replace('<img', '<img style="height:38px"')}<div>${esc(x.name)}<small>${x.age} years · ${D.STORIES.filter(s => N.storyOn(x.id, s)).length} stories on</small></div></div><button class="btn sm ghost" data-act="mng:${x.id}">Manage stories</button></div>`).join('')}<div class="row2"><div>Add or remove profiles</div><button class="btn sm" data-act="go:users">Open</button></div>`,
    priv: `<div class="row2"><div>Your data<small>This prototype keeps everything on this device. A real launch would follow India’s DPDP Act with verified parental consent.</small></div></div><div class="row2"><div>Reset demo<small>Clears profiles, stars and stickers.</small></div><button class="btn sm or" data-act="resetdemo">Reset</button></div>`,
  }; p.innerHTML = P[setUI.pane];
}
ACT.pane = id => { setUI.pane = id; $$('.set nav button').forEach(b => b.classList.toggle('on', b.dataset.act === 'pane:' + id)); paneDraw(); };
ACT.set = (a) => { const [k, v] = a.split(':'); if (k === 'tone') S.tone = +v; else if (k === 'lang') { S.lang = v; } else if (k === 'limit') S.limit = +v; save(); if (k === 'lang') N.rerender(); else paneDraw(); };
ACT.stog = k => { S[k] = !S[k]; save(); paneDraw(); };
ACT.mng = id => { S.cur = id; save(); go('topics'); };
ACT.resetdemo = () => { try { localStorage.removeItem('nta-proto-v2'); } catch (e) {} location.reload(); };

reg('dashboard', { name: 'Weekly report (new)', group: 'Grown-ups',
  render: () => { const p = N.prof(); const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']; const mx = Math.max(...S.week, 1); const a = S.awk; const trend = a.length > 1 ? a[a.length - 1] - a[0] : 0;
    return `${backB}${closeB('go:hub')}${hd(`This week with ${esc(p.name)}`, 'REPORT', 'sm')}
    <div class="set" style="grid-template-columns:1fr 1fr;gap:28px;top:92px"><div><div class="kpis"><div class="kpi" style="background:var(--orange)"><b>${S.seen.length + 4}</b><span>stories read</span></div><div class="kpi" style="background:var(--logo)"><b>${S.talks}</b><span>family chats</span></div><div class="kpi" style="background:var(--olive)"><b>${S.stars}</b><span>stars earned</span></div></div>
      <div class="qa-h" style="margin-top:14px">CHATS STARTED THIS WEEK</div><div class="bars">${S.week.map((v, i) => `<div style="height:${(v / mx) * 100}%${i === 6 ? ';background:var(--orange)' : ''}"><b>${v}</b><span>${days[i]}</span></div>`).join('')}</div></div>
      <div><div class="qa-h">AWK-O-METER</div><div style="font:600 13.5px/1.5 var(--body);color:#444">${a.length > 1 ? (trend > 0 ? `Chats are getting easier: from <b>${a[0]}/5</b> to <b>${a[a.length - 1]}/5</b>. Keep going!` : trend === 0 ? 'Steady so far. Try a new topic to stretch yourselves.' : 'A tough one lately, and that’s okay. Try a gentler card.') : 'Roll the Awk Dice together to start tracking.'}</div>
      <div class="qa-h" style="margin-top:16px">SUGGESTED NEXT CHAT</div><div class="cue c-ye" style="position:relative;width:auto;--r:-1deg;min-height:0"><small>${p.age} YEARS · ${D.TONES[S.tone].name.toUpperCase()}</small>${esc(pick(D.DICE[1].cards)[1])}</div></div></div>`; } });

reg('goodbye', { name: 'Goodbye (new)', group: 'Grown-ups', cls: 'bye',
  render: () => `<div class="faces"><img class="abs" src="assets/faces_left.png" style="left:-150px;top:0;height:150px;animation:flyL 1s both" alt=""><img class="abs" src="assets/faces_right.png" style="right:-150px;top:20px;height:140px;animation:flyR 1s both" alt=""></div>
    <div class="abs" style="left:0;right:0;top:236px;text-align:center"><h2 class="disp" style="margin:0;font-size:56px;color:var(--purple)">See you <span style="color:var(--orange)">soon!</span></h2><p style="font:600 15px var(--body);color:#666;margin:8px 0 20px">Today you collected <b>${S.stars}</b> ★ and <b>${S.stk.length}</b> stickers. One small chat at a time.</p>
    <button class="btn" data-act="go:splash">Back to start</button></div>` });
})();
