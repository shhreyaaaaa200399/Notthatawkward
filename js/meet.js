/* MEET: "other people have been through this too". Real-style stories, a me-too wall, the other side of the story, Awkie, experts, Hi world. */
(() => {
'use strict';
const N = window.NTA, D = N.D, A = N.A, S = N.S, CT = window.CT, M = CT.M;
const { go, reg, ACT, ICON, esc, pick, rnd, toast, modal, closeModal, save, beep, speak, confetti, prof, tier, prog, storyOn } = N;
const { $, $$, gearB, backB, closeB, hd, chipHTML } = N;
const tidx = () => D.tierIdx(tier().id);
const t4 = () => tier().id;

/* ------------------------------------------------------------------ hub */
const CARDS = [
  { id: 'reels', n: 'Real stories', p: 'Short stories from kids, teens and grown-ups who’ve been there.', c: '#e35e26', tag: 'WATCH' },
  { id: 'wall', n: 'You’re not the only one', p: 'Questions other people asked, with honest answers.', c: '#653781', tag: 'READ' },
  { id: 'views', n: 'The other side', p: 'See the same moment through different eyes.', c: '#59662e', tag: 'EXPLORE' },
  { id: 'awkie', n: 'Ask Awkie', p: 'Ask anything. Nobody will know it was you.', c: '#c99a00', tag: 'ASK', dark: true },
  { id: 'ama', n: 'Ask an expert', p: 'Live sessions with doctors, psychologists and educators.', c: '#434f64', tag: 'LIVE' },
  { id: 'world', n: 'Hi, world!', p: 'Say hello to families everywhere.', c: '#ac2929', tag: 'SAY HI' },
];
const MI = {
  reels: `<svg viewBox="0 0 64 64"><rect x="18" y="6" width="28" height="52" rx="6" fill="#fff"/><polygon points="28,24 42,32 28,40" fill="#e35e26"/></svg>`,
  wall: `<svg viewBox="0 0 64 64"><circle cx="22" cy="24" r="9" fill="#fff"/><circle cx="42" cy="26" r="7" fill="#ffcb05"/><path d="M6 54c0-12 8-18 16-18s16 6 16 18zM36 54c0-8 4-14 10-14s12 6 12 14z" fill="#fff"/></svg>`,
  views: `<svg viewBox="0 0 64 64"><path d="M4 32s10-16 28-16 28 16 28 16-10 16-28 16S4 32 4 32z" fill="#fff"/><circle cx="32" cy="32" r="9" fill="#59662e"/></svg>`,
  awkie: `<svg viewBox="0 0 64 64"><polygon points="6,14 52,8 58,40 34,44 24,58 24,44 8,42" fill="#653781"/><circle cx="24" cy="26" r="5" fill="#fff"/><circle cx="40" cy="25" r="5" fill="#fff"/></svg>`,
  ama: `<svg viewBox="0 0 64 64"><rect x="10" y="18" width="44" height="30" rx="4" fill="#fff"/><circle cx="32" cy="33" r="8" fill="#434f64"/><circle cx="52" cy="12" r="6" fill="#ac2929"/></svg>`,
  world: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="#96c5d1"/><path d="M14 24q10-8 20 0t8 14-12 6-14-8z" fill="#59662e"/></svg>`,
};
reg('meethub', { name: 'Meet: hub', group: 'Meet', isNew: true, cls: 'tinted',
  render: () => `${gearB}${closeB('go:hub')}${chipHTML('sm')}${hd('Other people have been through this too', 'MEET', 'sm')}
    <div class="ggrid three">${CARDS.map(g => `<button class="gcard ${g.dark ? 'dk' : ''}" style="background:${g.c}" data-act="go:${g.id}"><span class="gt">${g.tag}</span><div class="gi">${MI[g.id]}</div><h5>${g.n}</h5><p>${g.p}</p></button>`).join('')}</div>
    <div class="who-line" style="bottom:18px">Kids can send stickers and greetings only. People who write are always moderated.</div>` });

/* ------------------------------------------------------------------ real stories */
const vlogsFor = () => M.VLOGS.filter(v => v.min === tidx() || v.min === tidx() - 1 || (tidx() === 0 && v.min <= 1) || (tidx() === 1 && v.min <= 1));
const vscene = (v, mood, pose, big) => { const c = v.cast; const o = { bg: c.bg, deco: c.deco, cast: [{ who: c.who, mood, x: 466, pose, s: big ? 1.55 : 1.2, y: big ? 520 : 396, age: c.age }] }; return A.scene(o, { attr: '' }); };
reg('reels', { name: 'Meet: real stories', group: 'Meet', isNew: true,
  render: () => { const list = vlogsFor(); return `${backB}${closeB('go:meethub')}${hd('Hear it from people who’ve been there', 'REAL STORIES', 'sm')}
    <div class="scards" style="top:112px">${list.slice(0, 3).map(v => `<button class="scard" style="--c:#e35e26" data-act="reel:${v.id}"><div class="sc-art"><div class="thw-in">${vscene(v, v.moods[0], 'stand', false)}</div><span class="done-tag" style="background:#e35e26">▶ ${v.lines.length * 4}s</span></div><h5>${esc(v.title)}</h5><p>${esc(v.who)} · ${esc(v.topic)}</p><i>Sample story</i></button>`).join('')}</div>
    <div class="who-line" style="bottom:50px">These are made-up sample stories for the prototype. Real ones would come from people who chose to share.</div>`; } });
ACT.reel = id => go('reel', { id });
reg('reel', { name: 'Meet: story player', group: 'Meet', isNew: true, cls: 'reel', demo: () => ({ id: 'v4' }),
  render: o => { const v = M.VLOGS.find(x => x.id === (o.id || 'v4')); const key = 'r-' + v.id; return `${backB}${closeB('go:reels')}
    <div class="phone"><div class="ph-bars">${v.lines.map(() => '<i><b></b></i>').join('')}</div><div class="ph-scene" id="phs"></div><div class="ph-cap" id="phc"></div><div class="ph-who"><span>${A.avatarHTML(v.av, 34)}</span><b>${esc(v.who)}</b></div><button class="ph-l" data-act="rl" aria-label="Previous"></button><button class="ph-r" data-act="rr" aria-label="Next"></button></div>
    <div class="rp"><span class="topic">${esc(v.topic)}</span><h3>${esc(v.title)}</h3><p class="note">Sample story, made up for this prototype.</p>
      <div class="rp-btns"><button class="btn ol" id="me2" data-act="me2:${key}">Me too <b id="me2n">${S.me2[key] || 40 + v.lines.length * 7}</b></button><button class="btn ghost" data-act="rpause" id="rps">Pause</button><button class="btn ghost" data-act="go:awkie">Ask Awkie about this</button></div><button class="lnk" data-act="rnext:${v.id}">Next story</button></div>`; },
  mount: (el, o) => {
    const v = M.VLOGS.find(x => x.id === (o.id || 'v4')); const bars = $$('.ph-bars i b', el), sc = $('#phs', el), cap = $('#phc', el); let i = 0, tm = null, paused = false; const poses = ['stand', 'hips', 'cross', 'stand', 'wave'];
    const show = n => { i = Math.max(0, Math.min(v.lines.length - 1, n)); sc.innerHTML = vscene(v, v.moods[i % v.moods.length], poses[i % poses.length], true); cap.textContent = v.lines[i]; cap.style.animation = 'none'; void cap.offsetWidth; cap.style.animation = '';
      bars.forEach((b, k) => { b.style.transition = 'none'; b.style.width = k < i ? '100%' : '0'; }); void bars[0].offsetWidth; const dur = Math.max(3400, v.lines[i].length * 62); bars[i].style.transition = `width ${dur}ms linear`; bars[i].style.width = '100%';
      clearTimeout(tm); if (!paused) tm = setTimeout(() => { if (i < v.lines.length - 1) show(i + 1); else end(); }, dur); if (S.read && tier().id !== '4-6') speak(v.lines[i]); };
    const end = () => { cap.innerHTML = 'Did this feel familiar? <b>Tap “Me too” if it did.</b>'; N.addStars(1, 'listening'); prog().takes = prog().takes || []; if (!prog().takes.includes(v.id)) { prog().takes.push(v.id); save(); } };
    ACT.rr = () => show(i + 1 >= v.lines.length ? i : i + 1); ACT.rl = () => show(i - 1);
    ACT.rpause = () => { paused = !paused; $('#rps', el).textContent = paused ? 'Play' : 'Pause'; if (paused) { clearTimeout(tm); const b = bars[i]; const w = getComputedStyle(b).width; b.style.transition = 'none'; b.style.width = w; try { speechSynthesis.cancel(); } catch (e) {} } else show(i); };
    ACT.rnext = id => { const list = vlogsFor(); const k = list.findIndex(x => x.id === id); go('reel', { id: list[(k + 1) % list.length].id }, { noPush: true }); };
    ACT.me2 = key => { if (S.me2[key]) return toast('Thanks! You’ve already said me too.'); S.me2[key] = (+$('#me2n', el).textContent) + 1; $('#me2n', el).textContent = S.me2[key]; save(); beep('ok'); toast('You’re not alone in this.'); };
    show(0);
  } });

/* ------------------------------------------------------------------ you're not the only one (anonymous questions) */
const wallState = { topic: 'All' };
reg('wall', { name: 'Meet: me-too wall', group: 'Meet', isNew: true,
  render: () => { const i = tidx(); const list = M.WALL.filter(q => q.z === i || q.z === i - 1); const topics = ['All', ...new Set(list.map(q => q.topic))]; const shown = list.filter(q => wallState.topic === 'All' || q.topic === wallState.topic);
    return `${backB}${closeB('go:meethub')}${hd('Questions other people asked, anonymously', 'YOU’RE NOT THE ONLY ONE', 'sm')}
    <div class="pills" style="top:92px">${topics.map(tp => `<button class="${wallState.topic === tp ? 'on' : ''}" data-act="wt:${tp}">${tp}</button>`).join('')}</div>
    <div class="wall">${shown.map((q, k) => `<div class="wq" data-k="${k}"><p class="wq-q">${esc(q.q)}</p><div class="wq-m"><button class="me2" data-act="wme:${M.WALL.indexOf(q)}">Me too <b>${q.me + (S.me2['w' + M.WALL.indexOf(q)] ? 1 : 0)}</b></button><button class="seea" data-act="wsee:${k}">See the answer</button></div><div class="wq-a" hidden><small>ANSWER · ${q.z < i ? 'for the zone below yours' : 'for your zone'}</small>${esc(q.a)}</div></div>`).join('')}</div>
    <button class="btn or sm askit" data-act="wask">Ask yours, anonymously</button>`; } });
ACT.wt = tp => { wallState.topic = tp; N.rerender(); };
ACT.wsee = k => { const q = $$('.wq')[+k]; const a = $('.wq-a', q); a.hidden = !a.hidden; q.classList.toggle('open', !a.hidden); beep('tap'); };
ACT.wme = idx => { const key = 'w' + idx; if (S.me2[key]) return toast('You’ve already said me too.'); S.me2[key] = 1; save(); const b = event && event.target.closest('.me2'); if (b) { const n = $('b', b); n.textContent = +n.textContent + 1; } beep('ok'); toast('You’re not alone in this.'); };
ACT.wask = () => { modal(`<div class="sheet" style="left:190px;top:70px;width:550px;padding:24px 28px"><h4 class="disp" style="margin:0 0 4px;font-size:26px;color:var(--purple)">Your question, anonymously</h4><p style="margin:0 0 12px;font:600 12.5px var(--body);color:#777">A moderator reads it first. Please don’t share names or addresses. Good ones get answered here for others too.</p>
  <textarea id="aq" rows="3" maxlength="200" style="width:100%;font:600 14px var(--body);padding:10px;border:2px solid #000;outline:none;resize:none" placeholder="Type your question…"></textarea><div style="display:flex;gap:10px;justify-content:flex-end;margin-top:14px"><button class="btn ghost sm" data-close>Cancel</button><button class="btn ol sm" data-send>Send</button></div></div>`);
  $('#modal [data-close]').onclick = closeModal; $('#modal [data-send]').onclick = () => { if (!$('#aq').value.trim()) return toast('Type a question first!'); closeModal(); beep('win'); toast('Sent. A moderator will read it before it goes up.'); N.addStars(1, 'asking'); }; };

/* ------------------------------------------------------------------ the other side of the story */
const pv = { id: null, who: 0 };
reg('views', { name: 'Meet: the other side', group: 'Meet', isNew: true,
  render: () => { const list = M.PERSPECTIVES.filter(p => p.min <= tidx() && p.min >= tidx() - 2); if (!pv.id || !list.find(x => x.id === pv.id)) pv.id = list[0].id; const p = M.PERSPECTIVES.find(x => x.id === pv.id); const v = p.views[Math.min(pv.who, p.views.length - 1)];
    return `${backB}${closeB('go:meethub')}${hd('Same moment, different eyes', 'THE OTHER SIDE', 'sm')}
    <div class="pills" style="top:76px">${list.map(x => `<button class="${x.id === pv.id ? 'on' : ''}" data-act="pvs:${x.id}">${esc(x.title)}</button>`).join('')}</div>
    <div class="pv-scene">${(() => { const [bg, deco, cast, props, over] = p.scene.split('|'); return A.scene(CT.sc(bg, deco, cast, props, over)); })()}</div>
    <div class="pv-panel"><div class="pv-tabs">${p.views.map((x, i) => `<button class="${i === pv.who ? 'on' : ''}" data-act="pvw:${i}">${esc(x.who)}</button>`).join('')}</div>
      <div class="pv-card"><small>${esc(v.role).toUpperCase()}</small><div class="row"><b>How they feel</b>${esc(v.feel)}</div><div class="row"><b>What they might say</b>${esc(v.say)}</div><div class="row"><b>What could help</b>${esc(v.help)}</div></div></div>`; } });
ACT.pvs = id => { pv.id = id; pv.who = 0; N.rerender(); };
ACT.pvw = i => { pv.who = +i; N.rerender(); };

/* ------------------------------------------------------------------ Awkie */
const pickAns = (r, T) => { if (r.a.all) return r.a.all; const order = ['13+', '10-12', '7-9', '4-6']; let i = order.indexOf(T); for (; i < order.length; i++) if (r.a[order[i]]) return r.a[order[i]]; return Object.values(r.a)[0]; };
reg('awkie', { name: 'Meet: Ask Awkie', group: 'Meet',
  render: () => `${backB}${closeB('go:meethub')}${hd('Ask me anything', 'ASK AWKIE', 'sm')}
    <div class="awkie-l"><div id="awm">${N.awkieB('hi', 150)}</div><button class="anon" data-act="anon"><span class="sw-t ${S._anon === false ? '' : 'on'}"></span> Anonymous</button></div>
    <div class="sos"><b>Feeling unsafe?</b> Tell a trusted adult. In India you can call <b>Childline 1098</b> (free).</div>
    <div class="chat"><div class="log" id="log"></div><div class="chips" id="chips"></div><form class="inbar" id="fm"><input id="qin" placeholder="Type your question…" maxlength="140" autocomplete="off" aria-label="Your question"><button class="btn or sm" type="submit">${ICON.send}</button></form></div>`,
  mount: el => {
    const log = $('#log', el), chips = $('#chips', el), inp = $('#qin', el), awm = $('#awm', el); const T = t4(); const setA = e => { awm.innerHTML = N.awkieB(e, 150); };
    const add = (cls, html) => { const m = document.createElement('div'); m.className = 'msg ' + cls; m.innerHTML = html; log.appendChild(m); log.scrollTop = log.scrollHeight; return m; };
    const bot = html => { setA('listen'); const ty = document.createElement('div'); ty.className = 'typing'; ty.innerHTML = '<i></i><i></i><i></i>'; log.appendChild(ty); log.scrollTop = log.scrollHeight; return new Promise(r => setTimeout(() => { ty.remove(); r(add('bot', html)); }, 800)); };
    const ask = async q => { if (!q.trim()) return; add('me', esc(q)); inp.value = ''; beep('tap'); prog().chats = (prog().chats || 0) + 0;
      const r = M.AW.find(x => x.k.test(q)); let html, extra = '', expr = 'happy';
      if (r) { html = esc(pickAns(r, T)); if (r.sos) { html = `<b style="color:var(--maroon)">${html}</b>`; expr = 'care'; } const s = r.go && CT.STORIES.find(x => x.id === r.go);
        if (s && storyOn(prof(), s)) extra += `<button class="btn sm ye" data-go="${s.id}">Read the story</button>`; else if (s) extra += `<button class="btn sm ghost" data-gate>Ask a grown-up to unlock a story</button>`; extra += `<button class="btn sm ol" data-card="${esc(q)}">Make a conversation card</button>`; }
      else { html = esc(M.AW_FALLBACK); extra = `<button class="btn sm ol" data-card="${esc(q)}">Make a conversation card</button>`; expr = 'think'; }
      const m = await bot(html + (extra ? `<div class="row">${extra}</div>` : '')); setA(expr);
      $$('[data-go]', m).forEach(b => b.onclick = () => go('story', { id: b.dataset.go })); $$('[data-gate]', m).forEach(b => b.onclick = () => N.gate(() => go('gu', { tab: 'topics' }), 'A grown-up can unlock more stories.'));
      $$('[data-card]', m).forEach(b => b.onclick = () => { modal(`<div class="sheet" style="left:230px;top:80px;width:470px;padding:26px 28px;box-shadow:0 0 0 3px #000,10px 10px 0 3px var(--orange)"><div class="disp" style="font-size:13px;letter-spacing:1.5px;color:var(--orange)">CONVERSATION CARD FOR THE FRIDGE</div><p style="margin:10px 0 20px;font:800 19px/1.3 var(--body)">“${esc(b.dataset.card)}”<br><span style="font:600 13px var(--body);color:#666">Ask a grown-up you trust. You can show them this card.</span></p><div style="display:flex;justify-content:flex-end"><button class="btn sm ol" data-save>Save it ✓</button></div></div>`); $('#modal [data-save]').onclick = () => { closeModal(); toast('Saved. Chat about it at dinner!'); S.talks++; save(); }; }); };
    bot('Hi, I’m <b>Awkie</b>! Ask me anything. No question is silly' + (S._anon === false ? '.' : ', and nobody will know it was you.')); setA('hi');
    (({ '4-6': ['Why is it okay to say no?', 'Where do babies come from?', 'Who can I tell if I’m scared?'], '7-9': ['What is a period?', 'What is a crush?', 'How do babies get started?'], '10-12': ['Is it normal to get erections?', 'What is consent?', 'How are babies made?'], '13+': ['How does a condom work?', 'Can I get pregnant the first time?', 'What is consent?'] })[T]).forEach(q => { const b = document.createElement('button'); b.textContent = q; b.onclick = () => ask(q); chips.appendChild(b); });
    $('#fm', el).onsubmit = e => { e.preventDefault(); ask(inp.value); };
  } });
ACT.anon = () => { S._anon = S._anon === false; $('.sw-t').classList.toggle('on', S._anon !== false); toast(S._anon === false ? 'Awkie will see your nickname' : 'Anonymous mode on'); };

/* ------------------------------------------------------------------ experts + Hi world */
reg('ama', { name: 'Meet: ask an expert', group: 'Meet',
  render: () => `${backB}${closeB('go:meethub')}${hd('Real experts. Real answers.', 'ASK AN EXPERT', 'sm')}
    <div class="ama"><div class="ses"><div class="qa-h">COMING UP (SAMPLE SESSIONS)</div>${M.AMA.map(a => `<div class="sess" style="--c:${a.c}">${A.avatarHTML(a.av, 52)}<div><b>${a.role}</b><span>${esc(a.topic)}</span></div><span class="when">${a.when}</span></div>`).join('')}<button class="btn ye" data-act="wask">Send a question anonymously</button></div>
      <div><div class="qa-h">PARENTS ASKED</div><div class="qa">${M.QA.map(q => `<details><summary>${esc(q[0])}</summary><p>${esc(q[1])}</p></details>`).join('')}</div></div></div>` });
const world = { hi: 5902, fam: 1284 };
const CONT = ['M30 80 L90 60 L120 74 L128 106 L104 134 L84 170 L62 158 L52 124 Z', 'M110 180 L146 176 L162 206 L152 262 L128 296 L116 262 L108 214 Z', 'M168 92 L214 70 L248 82 L246 118 L226 138 L238 188 L212 262 L176 240 L168 180 L186 130 Z', 'M252 74 L312 62 L352 86 L342 138 L310 154 L280 138 L258 120 Z', 'M296 232 L336 224 L346 256 L318 272 L296 262 Z'];
reg('world', { name: 'Meet: Hi, world!', group: 'Meet',
  render: () => `${backB}${closeB('go:meethub')}<div class="eyebrow sm" style="left:400px"><h2>HI, WORLD!</h2><h3>Families chatting right now</h3></div>
    <div class="gl"><svg viewBox="0 0 360 360"><defs><clipPath id="gc"><circle cx="180" cy="180" r="172"/></clipPath></defs><circle cx="180" cy="180" r="172" fill="#96c5d1" stroke="#000" stroke-width="3"/>
      <g clip-path="url(#gc)"><g transform="translate(-6 8)">${CONT.map(p => `<path d="${p}" fill="#59662e"/>`).join('')}</g>${[0, 1, 2, 3].map(i => `<ellipse cx="${60 + i * 70}" cy="${40 + (i % 2) * 260}" rx="38" ry="12" fill="#fff" opacity=".35"/>`).join('')}
      ${M.CITIES.map((c, i) => `<g class="pin" data-i="${i}" transform="translate(${c.x * 360} ${c.y * 360})"><circle class="pl" r="7" fill="#ffcb05"/><circle r="7" fill="#e35e26" stroke="#000" stroke-width="2.5"/></g>`).join('')}</g></svg></div>
    <div class="gl-side" style="top:82px"><div class="gl-card" id="gc2"><small>TAP A PIN</small><p>Say hi to a family somewhere in the world.</p><em>Demo data, not real families.</em></div>
      <div class="counter"><div style="background:var(--orange)"><b id="cF">${world.fam.toLocaleString()}</b><span>families started a chat today</span></div><div style="background:var(--logo)"><b id="cH">${world.hi.toLocaleString()}</b><span>hellos sent</span></div></div>
      <div class="hi-row">${M.GREETS.map((g, i) => `<button data-g="${i}">${g[0]}</button>`).join('')}</div></div>`,
  mount: el => { const card = $('#gc2', el);
    $$('.pin', el).forEach(p => p.onclick = () => { const c = M.CITIES[+p.dataset.i]; beep('pop'); card.innerHTML = `<small>${c.n.toUpperCase()}</small><p>“${esc(c.msg)}”</p><em>${esc(c.who)} · demo data</em>`; });
    $$('[data-g]', el).forEach(b => b.onclick = () => { const g = M.GREETS[+b.dataset.g]; world.hi++; $('#cH', el).textContent = world.hi.toLocaleString(); beep('ok'); const c = pick(M.CITIES), f = document.createElement('div'); f.className = 'floaty'; f.textContent = g[0]; f.style.left = (34 + c.x * 360 - 20) + 'px'; f.style.top = (70 + c.y * 360 - 20) + 'px'; $('.screen', document).appendChild(f); setTimeout(() => f.remove(), 2300);
      card.innerHTML = `<small>SENT TO ${c.n.toUpperCase()}</small><p>${esc(c.who)} will see your “${g[0]}”.</p><em>Kids can send stickers and greetings only.</em>`; if (world.hi % 5 === 0) N.addStars(1, 'spreading hellos'); }); } });
})();
