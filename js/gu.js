/* GROWN-UP SPACE: a calmer, denser view for parents and caregivers. What your child is learning, how to talk about it, topic and age controls, family and settings. */
(() => {
'use strict';
const N = window.NTA, D = N.D, A = N.A, S = N.S, CT = window.CT;
const { go, reg, ACT, ICON, esc, pick, toast, modal, closeModal, save, beep, confetti, prof, tier, tierOf, prog, storyOn } = N;
const { $, $$ } = N;
const gui = { tab: 'overview', open: null };
const kids = () => (S.profiles.length ? S.profiles : N.DEMO);
const T4 = id => D.TIERS[D.tierIdx(id)];
const byId = id => CT.STORIES.find(s => s.id === id);
const seg = (act, items, val) => `<div class="seg">${items.map(([v, l]) => `<button class="${String(v) === String(val) ? 'on' : ''}" data-act="${act}:${v}">${l}</button>`).join('')}</div>`;
const tog = (act, on) => `<button class="sw-t ${on ? 'on' : ''}" data-act="${act}" aria-label="Toggle"></button>`;
const nextTier = id => D.TIERS[Math.min(3, D.tierIdx(id) + 1)].id;

function overview(p) {
  const pg = prog(p.id), T = T4(p.tier); const done = Object.entries(pg.stories).map(([id, v]) => ({ s: byId(id), v })).filter(x => x.s).sort((a, b) => b.v.at - a.v.at);
  const games = Object.values(pg.games).reduce((a, b) => a + b, 0); const teen = p.tier === '13+' && S.teenPriv;
  const sug = CT.STORIES.filter(s => s.tiers.includes(p.tier) && !pg.stories[s.id]).slice(0, 2);
  const kpi = (b, l, c) => `<div class="kpi" style="background:${c}"><b>${b}</b><span>${l}</span></div>`;
  return `<div class="gu-who"><span class="gw-av">${A.avatarHTML(p.av, 56)}</span><div><b>${esc(p.name)}</b><span class="zbadge" style="background:${T.c}">${T.n} · ${T.age}</span></div><button class="lnk" data-act="guTab:topics">Change age zone</button></div>
    <div class="kpis">${kpi(done.length, 'stories finished', '#e35e26')}${kpi(games, 'games played', '#653781')}${kpi(S.talks, 'family chats', '#59662e')}${kpi(S.stars, 'stars earned', '#434f64')}</div>
    <h5 class="gh">What ${esc(p.name)} has been learning</h5>
    ${teen ? `<div class="teen-note"><b>Teen privacy is on.</b> You can see which topics ${esc(p.name)} has explored, but not their answers or their chats with Awkie. ${done.length ? `<div class="chips-row">${done.map(x => `<span>${esc(x.s.title)}</span>`).join('')}</div>` : '<i>Nothing yet.</i>'}</div>`
      : done.length ? done.slice(0, 3).map(x => `<div class="learned"><b>${esc(x.s.title)}</b><p>${esc(x.v.take || x.s.take)}</p><div class="try"><em>Try asking:</em> ${esc(x.s.guide ? x.s.guide.ask : x.s.talk[0][1])}</div></div>`).join('')
        : `<div class="empty"><p>Nothing finished yet. A good place to start:</p>${sug.map(s => `<button class="nu" data-act="guTogether:${s.id}">${esc(s.title)} <i>Read together</i></button>`).join('')}</div>`}
    <h5 class="gh">Try this tonight</h5><div class="cue c-ye"><small>CONVERSATION STARTER · ${T.n.toUpperCase()}</small>${esc(pick(CT.G.DICE[p.tier].body))}</div>`;
}
function guides(p) {
  const list = CT.STORIES.filter(s => s.tiers.includes(p.tier) || s.tiers.includes(nextTier(p.tier))).slice(0, 16);
  return `<p class="gp">Each story comes with a guide: what it teaches, words to use, a question to ask and what to do if it gets awkward. “Next zone” stories help you see what’s coming.</p>
    <div class="glist">${list.map(s => { const g = s.guide || {}; const open = gui.open === s.id; const nxt = !s.tiers.includes(p.tier);
      return `<div class="gitem ${open ? 'open' : ''}"><button class="gh2" data-act="guOpen:${s.id}"><span><b>${esc(s.title)}</b><i>${N.zoneName(s.zone, p.tier)}${nxt ? ' · next zone' : ''} · ${s.mins} min</i></span><em>${open ? '–' : '+'}</em></button>
        ${open ? `<div class="gbody"><div class="gbl"><b>It teaches</b><p>${esc(g.teach || s.hook)}</p></div><div class="gbl"><b>You could say</b><p>${esc(g.say || '')}</p></div><div class="gbl"><b>Ask</b><p>${esc(g.ask || s.talk[0][1])}</p></div><div class="gbl"><b>If it gets awkward</b><p>${esc(g.awk || 'It’s okay to say, “I’m a bit nervous too.”')}</p></div><button class="btn sm" data-act="guTogether:${s.id}">Read it together</button></div>` : ''}</div>`; }).join('')}</div>`;
}
function topics(p) {
  const list = CT.STORIES.filter(s => s.tiers.includes(p.tier) || s.tiers.includes(nextTier(p.tier)) || (S.en[p.id] && S.en[p.id][s.id]));
  const ceil = S.ceil[p.id] || p.tier;
  return `<div class="row2"><div>Age zone for ${esc(p.name)}<small>Changes the stories, words, games and avatars ${esc(p.name)} sees.</small></div>${seg('guZone', D.TIERS.map(t => [t.id, t.s]), p.tier)}</div>
    <div class="row2"><div>Never show content above<small>A ceiling, so ${esc(p.name)} never sees anything beyond this zone unless you switch it on.</small></div>${seg('guCeil', D.TIERS.map(t => [t.id, t.s]), ceil)}</div>
    <h5 class="gh">Stories ${esc(p.name)} can see</h5><div class="tlist">${list.map(s => { const on = storyOn(p, s); return `<div class="trow"><span><b>${esc(s.title)}</b><i>${N.zoneName(s.zone, p.tier)} · ${s.tiers.map(t => T4(t).s).join(' / ')}</i></span>${tog('guTog:' + s.id, on)}</div>`; }).join('')}</div>`;
}
function family(p) {
  return `<div class="flist">${kids().map(k => `<div class="frow ${k.id === p.id ? 'on' : ''}"><span class="gw-av">${A.avatarHTML(k.av, 44)}</span><div><b>${esc(k.name)}</b><span class="zbadge" style="background:${T4(k.tier).c}">${T4(k.tier).n}</span>${S.linked[k.id] ? '<em class="lk">linked</em>' : ''}</div><div class="fb2"><button class="btn sm ghost" data-act="guChild:${k.id}">View</button><button class="btn sm ghost" data-act="guRemove:${k.id}">Remove</button></div></div>`).join('')}</div>
    <div class="fr-act"><button class="btn sm" data-act="guAdd">Add a child</button><div class="linkbox"><input id="lcode" placeholder="Code from your child, e.g. AWK-4821" aria-label="Link code" maxlength="10"><button class="btn sm ol" data-act="guLink">Link</button></div></div>
    <div class="row2"><div>Teen privacy<small>For ages 13 and up, you see the topics they explored, but not their answers or chats. On by default.</small></div>${tog('guPriv', S.teenPriv)}</div>`;
}
function settings() {
  return `<div class="row2"><div>Conversation tone<small>Sets the level of the Awk Dice deck and the cue cards.</small></div>${seg('guSet:tone', [[0, 'Gentle'], [1, 'Mixed'], [2, 'Brave']], S.tone)}</div>
    <div class="row2"><div>Language<small>English and Hindi are ready. Eight more are on the way.</small></div>${seg('guSet:lang', [['en', 'English'], ['hi', 'हिंदी']], S.lang)}</div>
    <div class="row2"><div>Sound effects</div>${tog('guTgl:sound', S.sound)}</div><div class="row2"><div>Read stories aloud<small>Always on for Little Explorers.</small></div>${tog('guTgl:read', S.read)}</div>
    <div class="row2"><div>Read together by default<small>Shows “pause and ask” prompts in stories.</small></div>${tog('guTgl:together', S.together)}</div>
    <div class="row2"><div>Daily time limit</div>${seg('guSet:limit', [[15, '15m'], [30, '30m'], [45, '45m'], [60, '60m']], S.limit)}</div>
    <div class="row2"><div>Your style<small>${S.arch == null ? 'Not set.' : 'Answered as “The ' + ['Avoider', 'Researcher', 'Worrier', 'Open Mentor'][S.arch] + '”.'}</small></div><button class="btn sm ghost" data-act="go:comfort">Retake</button></div>
    <div class="row2"><div>Reset the demo<small>Clears profiles, stars and progress.</small></div><button class="btn sm or" data-act="guReset">Reset</button></div>`;
}
function pane(p) { return gui.tab === 'overview' ? overview(p) : gui.tab === 'guides' ? guides(p) : gui.tab === 'topics' ? topics(p) : gui.tab === 'family' ? family(p) : settings(); }
reg('gu', { name: 'Grown-up space', group: 'Grown-ups', isNew: true, adult: true, cls: 'gu', demo: () => ({ tab: 'overview' }),
  render: o => { if (o && o.tab) gui.tab = o.tab; const p = prof(); const TABS = [['overview', 'Overview', 'home'], ['guides', 'Talk guides', 'book'], ['topics', 'Topics and age', 'shield'], ['family', 'Family', 'people'], ['settings', 'Settings', 'gear']];
    return `<div class="gu-top"><span class="gu-mode">${ICON.lock.replace('currentColor', '#fff')} GROWN-UP VIEW</span><div class="gu-kids">${kids().map(k => `<button class="${k.id === p.id ? 'on' : ''}" data-act="guChild:${k.id}">${A.avatarHTML(k.av, 30)}<span>${esc(k.name)}</span></button>`).join('')}</div><button class="btn sm ye" data-act="go:hub">Back to kid view</button></div>
    <div class="gu-body"><nav class="gu-nav">${TABS.map(([id, n, ic]) => `<button class="${gui.tab === id ? 'on' : ''}" data-act="guTab:${id}">${n}</button>`).join('')}</nav><div class="gu-pane" id="gup">${pane(p)}</div></div>`; } });
const redraw = () => { const g = $('#gup'); if (g) { g.innerHTML = pane(prof()); $$('.gu-nav button').forEach(b => b.classList.toggle('on', b.dataset.act === 'guTab:' + gui.tab)); $$('.gu-kids button').forEach(b => b.classList.toggle('on', b.dataset.act === 'guChild:' + prof().id)); } };
Object.assign(ACT, {
  guTab: t => { gui.tab = t; redraw(); }, guChild: id => { S.cur = id; save(); N.applyTier(); redraw(); }, guOpen: id => { gui.open = gui.open === id ? null : id; redraw(); },
  guZone: id => { const p = prof(); if (!S.profiles.length) return toast('Add a profile first.'); p.tier = id; S.ceil[p.id] = id; save(); N.applyTier(); redraw(); toast(`${p.name} is now in ${T4(id).n}`); },
  guCeil: id => { const p = prof(); S.ceil[p.id] = id; save(); redraw(); },
  guTog: id => { const p = prof(), s = byId(id); S.en[p.id] = S.en[p.id] || {}; S.en[p.id][id] = !storyOn(p, s); save(); redraw(); },
  guPriv: () => { S.teenPriv = !S.teenPriv; save(); redraw(); }, guTgl: k => { S[k] = !S[k]; save(); redraw(); },
  guSet: a => { const [k, v] = a.split(':'); if (k === 'tone') S.tone = +v; else if (k === 'limit') S.limit = +v; else S.lang = v; save(); if (k === 'lang') N.rerender(); else redraw(); },
  guAdd: () => { S.role = 'adult'; save(); N.startAdd(); }, guRemove: id => { if (S.profiles.length < 2) return toast('Keep at least one profile.'); S.profiles = S.profiles.filter(k => k.id !== id); if (S.cur === id) S.cur = S.profiles[0].id; save(); redraw(); },
  guLink: () => { const v = ($('#lcode') || {}).value || ''; if (/^AWK-\d{4}$/i.test(v.trim())) { S.linked[prof().id] = true; save(); toast('Linked. You can now see what they’ve been learning.'); redraw(); } else toast('That code doesn’t look right. It looks like AWK-4821.'); },
  guTogether: id => { S.together = true; save(); go('story', { id }); },
  guReset: () => { try { localStorage.removeItem('nta-proto-v3'); } catch (e) {} location.reload(); },
});
})();
