/* Onboarding v2, who's playing, home hub. A kid can set up alone; a grown-up can set up for a child. */
(() => {
'use strict';
const N = window.NTA, D = N.D, A = N.A, S = N.S, { go, reg, ACT, t, ICON, esc, pick, toast, modal, closeModal, gate, save, beep, confetti, draft, prof, tier, tierOf } = N;
const { $, $$, hd, foot, gearB, transB, closeB, backB, chipHTML, setNext } = N;
const T4 = id => D.TIERS[D.tierIdx(id)];

/* ------------------------------------------------------------------ splash */
reg('splash', { name: 'Splash', group: 'Start', cls: 'splash',
  render: () => `<img class="abs fl face" src="assets/faces_left.png" alt=""><img class="abs logo" src="assets/logo_not.png" alt="NOT"><img class="abs fr face" src="assets/faces_right.png" alt="">
    <div class="abs tag">NOT <span>THAT AWK.</span></div><div class="abs sub">Honest sex-ed, for every Indian home</div>
    <svg class="abs go" viewBox="0 0 56 24"><path d="M2 12h44M36 3l14 9-14 9" stroke="#000" stroke-width="5" fill="none"/></svg>`,
  mount: el => { el.onclick = () => { beep('pop'); S.onboarded && S.profiles.length > 1 ? go('whoplay') : S.onboarded && S.profiles.length ? go('hub') : go('intro'); }; } });

/* ------------------------------------------------------------------ intro (3 short slides) */
const INTRO = [
  { h: 'Kids have <em>questions.</em>', p: 'Big ones, small ones, “wait… WHAT?” ones. And they will ask somebody. Better that the answer is a good one.',
    sc: { bg: 'cream', deco: 'room', cast: [{ who: 'arjun', mood: 'wow', x: 190, pose: 'up', s: 1.5 }, { who: 'tara', mood: 'think', x: 400, pose: 'think', s: 1.5 }, { who: 'rishi', mood: 'big', x: 610, pose: 'wave', s: 1.5 }],
      over: [{ k: 'bubble', x: 70, y: 70, s: .9, t: 'Why?', c: '#fff' }, { k: 'bubble', x: 330, y: 50, s: .9, t: 'How?', c: '#ffcb05' }, { k: 'bubble', x: 560, y: 80, s: .9, t: 'Wait, WHAT?', c: '#ff7664' }] } },
  { h: 'Grown-ups get <em>nervous.</em>', p: '3 in 4 Indian parents never start “the talk”. They care a lot. They just don’t know how to begin.',
    sc: { bg: 'peach', deco: 'room', cast: [{ who: 'mama', mood: 'worry', x: 270, pose: 'hold', s: .95 }, { who: 'sam', mood: 'shy', x: 560, s: 1.5 }], over: [{ k: 'bubble', x: 140, y: 52, s: .9, t: '…um…', c: '#fff' }] } },
  { h: 'So we make it <em>not that awk.</em>', p: 'Honest answers in words that fit your age. Learn on your own, or together. One small chat at a time.',
    sc: { bg: 'lilac', deco: 'hills', cast: [{ who: 'papa', mood: 'big', x: 250, pose: 'wave', s: .95 }, { who: 'rishi', mood: 'proud', x: 450, s: 1.5 }, { who: 'meera', mood: 'smile', x: 640, s: 1 }], props: [{ k: 'flower', x: 60, y: 230, s: 1.6 }] } },
];
reg('intro', { name: 'Welcome', group: 'Start', cls: 'intro',
  render: () => `<div class="cnt intro-cnt"><div class="copy"></div><div class="artcard"></div></div><div class="dots dk">${INTRO.map(() => '<i></i>').join('')}</div>
    <div class="foot"><button class="lt" data-act="go:language">${t('skip')}</button><button id="nx" class="pulse" data-act="introNext">${t('next')}</button></div>`,
  mount: el => {
    let i = 0; const copy = $('.copy', el), art = $('.artcard', el), dots = $$('.dots i', el), nx = $('#nx', el);
    const draw = () => { const s = INTRO[i]; copy.innerHTML = `<h2>${s.h}</h2><p>${s.p}</p>`; art.innerHTML = A.scene(s.sc) + (i === 2 ? `<div class="awk-pin">${N.awkieB('hi', 86)}</div>` : '');
      dots.forEach((d, k) => d.classList.toggle('on', k === i)); nx.textContent = i === INTRO.length - 1 ? t('lets') : t('next');
      [copy, art].forEach(e => { e.style.animation = 'none'; void e.offsetWidth; e.style.animation = ''; }); };
    ACT.introNext = () => { if (i < INTRO.length - 1) { i++; draw(); } else go('language'); }; draw();
  } });

/* ------------------------------------------------------------------ language */
reg('language', { name: 'Language', group: 'Start',
  render: () => `${closeB('langdone')}${hd(t('lang_q'), t('lang_t'))}
    <div class="langs">${D.LANGS.map(([c, n, en]) => `<button class="lang ${S.lang === c ? 'on' : ''}" data-act="lang:${c}">${n}<small>${en}</small></button>`).join('')}</div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('done'), act: 'langdone', cls: 'pulse' }])}` });
ACT.lang = c => { if (c === 'en' || c === 'hi') { S.lang = c; save(); N.rerender(); } else toast('This language is coming soon. We’re building it with local educators.'); };
ACT.langdone = () => { const r = N.langReturn(); if (r && r !== 'language') go(r, N.cur().opts, { back: true }); else go('role'); };

/* ------------------------------------------------------------------ who is here: a kid on their own, or a grown-up */
reg('role', { name: 'Kid or grown-up?', group: 'Start', isNew: true,
  render: () => `${transB}${hd(t('role_q'))}
    <div class="roles">
      <button class="role r-kid" data-act="role:kid"><div class="ra">${A.scene({ bg: 'olive', deco: 'grass', cast: [{ who: 'didi', mood: 'big', x: 250, s: 1.45 }, { who: 'rishi', mood: 'smile', x: 520, pose: 'wave', s: 1.7 }] })}</div><div class="rt"><h4>${t('kid')}</h4><p>${t('kid_s')}</p></div></button>
      <button class="role r-adult" data-act="role:adult"><div class="ra">${A.scene({ bg: 'lilac', deco: 'room', cast: [{ who: 'mama', mood: 'smile', x: 250, s: 1.05 }, { who: 'papa', mood: 'smile', x: 560, s: 1.05 }] })}</div><div class="rt"><h4>${t('adult')}</h4><p>${t('adult_s')}</p></div></button>
    </div><div class="who-line">Either way, the other can join in at any time.</div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }])}` });
ACT.role = r => { S.role = r; save(); go(r === 'kid' ? 'age' : 'comfort'); };

/* ------------------------------------------------------------------ grown-up set-up: tone, quiz, promise */
const faceSVG = lvl => `<svg viewBox="0 0 64 64"><polygon points="8,12 54,6 58,52 14,58" fill="#e35e26"/><circle cx="26" cy="28" r="7.5" fill="#fff"/><circle cx="45" cy="27" r="7.5" fill="#fff"/><circle cx="${lvl === 2 ? 28 : 27}" cy="${lvl === 2 ? 30 : 28}" r="3.2" fill="#000"/><circle cx="${lvl === 2 ? 47 : 46}" cy="${lvl === 2 ? 29 : 27}" r="3.2" fill="#000"/>
  ${lvl === 0 ? '<path d="M21 43Q33 55 47 42" stroke="#000" stroke-width="3" fill="#fff"/>' : lvl === 1 ? '<path d="M22 46L47 44" stroke="#000" stroke-width="3.4" stroke-linecap="round"/>' : '<path d="M20 47q6-7 11 0t14-2" stroke="#000" stroke-width="3" fill="none" stroke-linecap="round"/>'}
  ${lvl === 2 ? '<path d="M56 12q5 8 0 11-5-3 0-11z" fill="#96c5d1"/><path d="M6 30q4 7 0 9-4-2 0-9z" fill="#96c5d1"/>' : ''}</svg>`;
const TONES = [
  { n: 'Not that awk', s: 'We chat about this easily.', d: 'Cue cards stay light and friendly.' },
  { n: 'A little awk', s: 'Some topics make me squirm.', d: 'A mix of warm-ups and real talk.' },
  { n: 'Very awk', s: 'I’d rather hide behind the sofa.', d: 'We’ll start with the gentlest cards and build up.' },
];
reg('comfort', { name: 'How awkward does this feel?', group: 'Grown-up set-up', isNew: true, adult: true,
  render: () => `${transB}${hd('How awkward does this topic feel to you?', 'ABOUT YOU')}<div class="tone-copy" id="toneCopy"></div>
    <div class="slider" id="sl"><div class="trk"></div>${[0, 1, 2].map(i => `<i class="stop" style="left:${i * 50}%"></i><span class="lbl" data-i="${i}" style="left:${i * 50}%">${TONES[i].n}</span><button class="hit" data-i="${i}" style="left:${i * 50}%" aria-label="${TONES[i].n}"></button>`).join('')}<div class="knob" id="knob"></div></div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('cont'), act: 'go:arch', cls: 'pulse' }])}`,
  mount: el => {
    const knob = $('#knob', el), lbls = $$('.lbl', el), copy = $('#toneCopy', el);
    const set = i => { S.tone = i; save(); knob.style.left = (i * 50) + '%'; knob.innerHTML = faceSVG(i); lbls.forEach((l, k) => l.classList.toggle('on', k === i)); copy.innerHTML = `“${TONES[i].s}”<br><span>${TONES[i].d}</span>`; beep('pop'); };
    $$('.hit', el).forEach(b => b.onclick = () => set(+b.dataset.i)); set(S.tone);
  } });
const ARCH = [
  { k: 'Avoider', o: 'Say, “We’ll talk later, beta.”', d: 'You change the subject when the big questions come. Totally human.', tip: 'Start tiny: roll the Awk Dice for a one-minute chat. No pressure, no lecture.' },
  { k: 'Researcher', o: 'Google it first. Maybe three videos.', d: 'You want to get it right, so you read everything first.', tip: 'Skip the late-night tabs. Our stories are written to be read together.' },
  { k: 'Worrier', o: 'Worry they’re growing up too fast.', d: 'You’re protective and afraid of saying too much, too soon.', tip: 'Honest, age-sized answers protect kids. Start with the gentle stories.' },
  { k: 'Open Mentor', o: 'Say, “Good question. Let’s find out together.”', d: 'You already lean in, and your child knows it.', tip: 'Level up: try the stories one zone up and share your wins in Meet.' },
];
reg('arch', { name: 'Quick quiz', group: 'Grown-up set-up', isNew: true, adult: true,
  render: () => `${transB}${hd('When your child asks a big question, you usually…', 'ABOUT YOU')}<div class="opts">${ARCH.map((a, i) => `<button class="opt" data-act="arch:${i}"><i>${'ABCD'[i]}</i>${a.o}</button>`).join('')}</div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('skip'), act: 'go:consent' }])}` });
ACT.arch = i => { S.arch = +i; save(); go('archres'); };
reg('archres', { name: 'Quiz result', group: 'Grown-up set-up', isNew: true, adult: true, demo: () => ({}),
  render: () => { const a = ARCH[S.arch == null ? 3 : S.arch]; return `${hd('You’re…', 'ABOUT YOU')}<div class="arch"><small>YOUR STYLE</small><h4>The ${a.k}</h4><p>${a.d}</p><div class="tip">${a.tip}</div></div>
    <div class="abs" style="right:90px;bottom:64px">${N.awkieB('happy', 140)}</div>${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('cont'), act: 'go:consent', cls: 'pulse' }])}`; } });
reg('consent', { name: 'Our promise', group: 'Grown-up set-up', isNew: true, adult: true,
  render: () => `${hd('Our promise to your family', 'BEFORE WE START')}
    <div class="promise">${[
      ['#e35e26', 'No ads. Ever.', 'Nothing here sells to your child.', 'ban'],
      ['#653781', 'Kids don’t chat freely', 'Children only send stickers and greetings. Real people are always moderated.', 'chat'],
      ['#59662e', 'Age-sized content', 'Each child gets stories and words that fit their age. You can adjust this any time.', 'book'],
      ['#ffcb05', 'Their answers stay theirs', 'For teens, grown-ups see topics explored, not private answers. Built for India’s DPDP Act.', 'lock'],
    ].map(([c, h, p, i]) => `<div class="pr" style="--c:${c}">${promiseIcon(i, c)}<b>${h}</b>${p}</div>`).join('')}</div>
    <div class="agree"><button class="cb ${S.consent ? 'on' : ''}" data-act="agree"><i>${ICON.check}</i>I’m a parent or guardian and I agree</button></div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('cont'), act: 'consentgo', id: 'nextB', cls: S.consent ? 'pulse' : 'dis' }])}` });
function promiseIcon(k, c) {
  const m = { ban: '<circle cx="22" cy="22" r="14" fill="none" stroke="#000" stroke-width="4"/><path d="M12 32L32 12" stroke="#000" stroke-width="4"/>', chat: '<path d="M6 8h32v22H20l-9 7v-7H6z" fill="none" stroke="#000" stroke-width="3.5" stroke-linejoin="round"/><path d="M13 16h18M13 22h12" stroke="#000" stroke-width="3"/>', book: '<path d="M4 8h14a4 4 0 014 4v24a4 4 0 00-4-4H4zM40 8H26a4 4 0 00-4 4v24a4 4 0 014-4h14z" fill="none" stroke="#000" stroke-width="3.5" stroke-linejoin="round"/>', lock: '<rect x="8" y="20" width="28" height="20" fill="none" stroke="#000" stroke-width="3.5"/><path d="M14 20v-6a8 8 0 0116 0v6" fill="none" stroke="#000" stroke-width="3.5"/>' }[k];
  return `<svg viewBox="0 0 44 44"><rect x="2" y="2" width="40" height="40" fill="${c}" opacity=".18"/>${m}</svg>`;
}
ACT.agree = () => { S.consent = !S.consent; save(); $('.cb').classList.toggle('on', S.consent); const n = $('#nextB'); n.classList.toggle('dis', !S.consent); n.classList.toggle('pulse', S.consent); };
ACT.consentgo = () => go('age');

/* ------------------------------------------------------------------ age: pick the zone that sounds like you (not a form) */
reg('age', { name: 'Which sounds like you? (age zone)', group: 'Set-up', isNew: true,
  render: o => { const adult = S.role === 'adult' && !o.self;
    return `${gearB}${transB}${hd(adult ? t('age_qa') : t('age_q'), '', '', `<p class="why">${t('age_why')}</p>`)}
    <div class="zcards">${D.TIERS.map(T => `<button class="zc ${draft.tier === T.id && draft.picked ? 'on' : ''}" style="--c:${T.c}" data-act="zone:${T.id}">
      <div class="zart">${A.zoneCard(T.id)}</div><h5>${T.n}</h5><b class="ag">${T.age}</b><ul>${(adult ? T.adult : T.pick).map(x => `<li>${x}</li>`).join('')}</ul></button>`).join('')}</div>
    <div class="zfind" id="zfind"></div><button class="lnk typeage" data-act="typeage">I’d rather type an age</button>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('cont'), act: 'go:avatar', id: 'nextB', cls: draft.picked ? 'pulse' : 'dis' }])}`; },
  mount: () => { if (draft.picked) showFind(draft.tier); } });
function showFind(id) { const T = T4(id); const z = $('#zfind'); if (z) z.innerHTML = `In <b style="color:${T.c}">${T.n}</b> you’ll find: ${T.inside.join(' · ')}`; }
ACT.zone = id => { draft.tier = id; draft.picked = true; $$('.zc').forEach(b => b.classList.toggle('on', b.dataset.act === 'zone:' + id)); showFind(id); const n = $('#nextB'); n.classList.remove('dis'); n.classList.add('pulse'); beep('pop'); };
ACT.typeage = () => {
  let age = 9; const draw = () => { $('#modal .big-age').textContent = age; $('#modal .age-zone').innerHTML = `That’s <b style="color:${T4(D.ageToTier(age)).c}">${T4(D.ageToTier(age)).n}</b>`; $('#modal .cake').innerHTML = A.PROPS.cake(1).replace('<g', '<g'); };
  modal(`<div class="sheet age-sheet"><button class="ib x" data-close aria-label="Close">${ICON.x}</button><h4 class="disp">How old are you?</h4>
    <div class="stepper"><button data-d="-1" aria-label="Younger">−</button><div class="big-age">${age}</div><button data-d="1" aria-label="Older">+</button></div><div class="age-zone"></div>
    <button class="btn" data-ok>Use this</button></div>`);
  const upd = () => { $('#modal .big-age').textContent = age >= 16 ? '15+' : age; $('#modal .age-zone').innerHTML = `That’s <b style="color:${T4(D.ageToTier(age)).c}">${T4(D.ageToTier(age)).n}</b>`; };
  upd(); $('#modal [data-close]').onclick = closeModal;
  $$('#modal [data-d]').forEach(b => b.onclick = () => { age = Math.max(4, Math.min(16, age + +b.dataset.d)); upd(); beep('tap'); });
  $('#modal [data-ok]').onclick = () => { closeModal(); ACT.zone(D.ageToTier(age)); };
};

/* ------------------------------------------------------------------ avatar (changes with the zone) + name */
reg('avatar', { name: 'Pick your look', group: 'Set-up',
  render: () => { const adult = S.role === 'adult'; return `${gearB}${closeB('exit')}${hd(adult ? 'Pick a look for your child' : t('av_q'), '', '', `<p class="why">${draft.tier === '4-6' || draft.tier === '7-9' ? 'Animals and friends to be' : 'Characters that look like people'}  ·  matched to ${T4(draft.tier).n}</p>`)}
    <div class="avgrid">${A.avatarSet(draft.tier).map(a => `<button class="av ${draft.av === a.id ? 'on' : ''}" data-act="pickav:${a.id}" aria-label="avatar">${A.avatarHTML(a.id, 92)}</button>`).join('')}</div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('cont'), act: 'go:name', id: 'nextB', cls: draft.av ? 'pulse' : 'dis' }])}`; } });
ACT.pickav = id => { draft.av = id; $$('.av').forEach(b => b.classList.toggle('on', b.dataset.act === 'pickav:' + id)); const n = $('#nextB'); n.classList.remove('dis'); n.classList.add('pulse'); beep('pop'); };
reg('name', { name: 'What should we call you?', group: 'Set-up',
  render: () => `${gearB}${closeB('exit')}${hd(S.role === 'adult' ? t('name_qa') : t('name_q'))}
    <div class="namebox"><div class="nm-av">${A.avatarHTML(draft.av || 'a:deer', 96)}</div><input id="nm" maxlength="10" value="${esc(draft.name)}" placeholder="Type a nickname" autocomplete="off" aria-label="Nickname"><div class="cnt2"><span id="cn">${draft.name.length}</span>/10</div>
      <div class="hint">A nickname is perfect. We never ask for real names.</div><button class="btn ye sm dice-btn" data-act="rollname">Surprise me</button></div>
    ${foot([{ l: t('back'), act: 'back', cls: 'lt' }, { l: t('cont'), act: 'namego', id: 'nextB', cls: draft.name ? 'pulse' : 'dis' }])}`,
  mount: el => { const inp = $('#nm', el); inp.oninput = () => { draft.name = inp.value.trim(); $('#cn', el).textContent = inp.value.length; setNext(el, !!draft.name); }; } });
ACT.rollname = () => { const n = (pick(D.NAMES_A) + pick(D.NAMES_B)).slice(0, 10); draft.name = n; const i = $('#nm'); i.value = n; $('#cn').textContent = n.length; setNext(document, true); beep('pop'); };
ACT.namego = () => {
  const nm = draft.name || 'Friend'; const p = { id: 'p' + Date.now(), name: nm, av: draft.av || 'a:deer', tier: draft.tier };
  const first = !S.onboarded && S.profiles.length === 0; if (S.profiles.length >= 6) S.profiles.pop(); S.profiles.unshift(p); S.cur = p.id; save();
  draft.name = ''; draft.av = null; draft.picked = false;
  if (!S.onboarded) { S.onboarded = true; save(); go(S.role === 'adult' ? 'handover' : 'invite'); } else go('welcome');
};

/* ------------------------------------------------------------------ after set-up */
reg('invite', { name: 'Invite a grown-up (optional)', group: 'Set-up', isNew: true,
  render: () => { const p = prof(); const teen = p.tier === '13+'; return `${hd('Want a grown-up to join in?', '')}
    <div class="cnt invite"><div class="iv-l"><p>You can use Not That Awk on your own. If you’d like a parent or trusted adult to follow along, share this code with them.</p>
      <p class="sm">${teen ? 'They’ll see which topics you’ve explored, never your answers or your chats with Awkie.' : 'They’ll see what you’ve been learning, so they can chat about it with you.'}</p>
      <div class="btns"><button class="btn ol" data-act="invdone">Show my code</button><button class="btn ghost" data-act="invskip">Maybe later</button></div></div>
      <div class="iv-r">${N.awkieB('care', 150)}</div></div>`; } });
ACT.invskip = () => go('welcome');
ACT.invdone = () => { modal(`<div class="sheet code-sheet"><button class="ib x" data-close aria-label="Close">${ICON.x}</button><h4 class="disp">Your grown-up code</h4><div class="code">${S.code}</div>
  <p>Give this to a parent or trusted adult. They enter it in the Grown-ups area to link up. You can turn it off any time.</p><button class="btn" data-ok>Got it</button></div>`);
  $('#modal [data-close]').onclick = $('#modal [data-ok]').onclick = () => { closeModal(); go('welcome'); }; };
reg('welcome', { name: 'Welcome to your zone', group: 'Set-up', isNew: true,
  render: () => { const T = tier(), p = prof(); const ic = ['finger', 'heart', 'shield', 'people'];
    return `${hd(`${t('hi')} ${esc(p.name)}! Welcome to`, '', 'welcome-h')}<div class="zone-name" style="color:${T.c}">${T.n}</div>
    <div class="cnt wel"><div class="aw">${N.awkieB('hi', 150)}</div><div class="inside"><p class="vo">${T.voice}</p>${T.inside.map((x, i) => `<div class="in-row" style="--c:${T.c}"><span>${ICON[ic[i]]}</span>${x}</div>`).join('')}</div></div>
    ${foot([{ l: t('lets'), act: 'go:hub', cls: 'pulse' }])}`; } });
reg('handover', { name: 'Hand it over or explore together', group: 'Grown-up set-up', isNew: true, adult: true,
  render: () => { const p = prof(); return `${hd(`${esc(p.name)} is all set!`, 'NEXT')}<div class="roles two"><button class="role r-kid" data-act="handover:kid"><div class="ra">${A.scene({ bg: 'olive', deco: 'grass', cast: [{ who: 'rishi', mood: 'big', x: 400, pose: 'up', s: 1.8 }] })}</div><div class="rt"><h4>Hand it to ${esc(p.name)}</h4><p>${esc(p.name)} explores on their own, with content that fits their age. You can look in any time from the Grown-ups area.</p></div></button>
    <button class="role r-adult" data-act="handover:together"><div class="ra">${A.scene({ bg: 'lilac', deco: 'room', cast: [{ who: 'mama', mood: 'smile', x: 300, s: 1.05 }, { who: 'sam', mood: 'big', x: 570, s: 1.5 }] })}</div><div class="rt"><h4>Explore together</h4><p>Stories show gentle “pause and ask” prompts for you to talk through as you go.</p></div></button></div>`; } });
ACT.handover = m => { S.together = m === 'together'; save(); go('welcome'); };

/* ------------------------------------------------------------------ who's playing: only when it makes sense */
reg('whoplay', { name: 'Who’s playing? (returning)', group: 'Home', isNew: true,
  render: () => { const ps = S.profiles.length ? S.profiles : N.DEMO; return `${hd(t('who_play'), '')}<div class="wp-grid page">${ps.map(p => `<button class="wp ${p.id === S.cur ? 'on' : ''}" data-act="useuser:${p.id}">${A.avatarHTML(p.av, 84)}<b>${esc(p.name)}</b><i style="color:${T4(p.tier).c}">${T4(p.tier).n}</i></button>`).join('')}<button class="wp add" data-act="startadd"><span>${ICON.plus}</span><b>Add someone</b></button></div>`; } });
ACT.useuser = id => { S.cur = id; save(); beep('pop'); go('hub'); };

/* ------------------------------------------------------------------ home hub */
const TILES = [
  { id: 'play', cls: 't-play', go: 'playhub', art: 'why_play', st: 'left:-6px;top:-20px;height:136px', k: 'play_s' },
  { id: 'learn', cls: 't-learn', go: 'learn', art: 'why_learn', st: 'left:-2px;top:-8px;height:124px', k: 'learn_s' },
  { id: 'meet', cls: 't-meet', go: 'meethub', art: 'why_meet', st: 'left:-14px;top:-20px;height:140px', k: 'meet_s' },
];
reg('hub', { name: 'Home hub', group: 'Home', cls: 'tinted',
  render: () => { const p = prof(); const little = p.tier === '4-6';
    return `${gearB}${transB}${chipHTML()}${hd(t('hub_q'), `${t('hi')} ${esc(p.name)}!`)}
    <div class="tiles">${TILES.map(x => `<button class="tile ${x.cls}" data-act="tile:${x.id}"><div class="face"><img src="assets/${x.art}.png" style="${x.st}" alt=""><h4>${t(x.id)}</h4></div><p>${t(little ? x.k + '0' : x.k)}</p></button>`).join('')}</div>
    <div class="hub-foot"><button class="gu-btn" data-act="gugate">${ICON.lock.replace('currentColor', '#592898').replace('<svg', '<svg width="15" height="15"')} ${t('grownups')}</button>
      <div class="hub-r"><button class="stat" data-act="go:stickers">${ICON.star}<span id="starN">${S.stars}</span></button><button class="awk-help" data-act="go:awkie" aria-label="Ask Awkie">${N.awkieB('hi', 58)}<span>Ask Awkie</span></button></div></div>`; } });
ACT.tile = id => { const x = TILES.find(a => a.id === id); $$('.tile').forEach(b => b.classList.toggle('on', b.dataset.act === 'tile:' + id)); setTimeout(() => go(x.go), 260); };
ACT.gugate = () => gate(() => go('gu'), 'The grown-up area has what your child is learning, topic controls and settings.');
ACT.exit = () => { modal(`<div class="gate" style="margin-top:-120px"><h4>Taking a break?</h4><p>Your stars are saved. See you soon!</p><div style="display:flex;gap:14px;justify-content:center"><button class="btn ol" data-close>Keep going</button><button class="btn or" data-bye>Bye for now</button></div></div>`);
  $('#modal [data-close]').onclick = closeModal; $('#modal [data-bye]').onclick = () => go('goodbye'); };
reg('goodbye', { name: 'Goodbye', group: 'Home', cls: 'bye',
  render: () => `<img class="abs" src="assets/faces_left.png" style="left:130px;top:34px;height:150px" alt=""><img class="abs" src="assets/faces_right.png" style="right:110px;top:46px;height:140px" alt="">
    <div class="abs" style="left:0;right:0;top:230px;text-align:center"><h2 class="disp" style="margin:0;font-size:54px;color:var(--purple)">See you <span style="color:var(--orange)">soon!</span></h2><p style="font:600 15px var(--body);color:#666;margin:8px 0 18px">You have ${S.stars} ★ so far. One small chat at a time.</p><button class="btn" data-act="go:splash">Back to start</button></div>` });
})();
