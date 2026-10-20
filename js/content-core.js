/* Content authoring helpers. Stories are written in compact form and turned into scenes by the engine.
   All copy is placeholder for a prototype: it needs review by a paediatrician, a sexual-health educator and a lawyer before launch. */
window.CT = (() => {
  const STORIES = [];
  /* cast shorthand "who:mood:xPercent:pose:flip:scale"  e.g. "riya:worry:30:hold" */
  const parseCast = str => (str || '').trim().split(/\s+/).filter(Boolean).map(s => {
    const [who, mood, x, pose, flip, s2] = s.split(':'); const o = { who, mood: mood || 'smile', x: Math.round((+x || 50) / 100 * 932) };
    if (pose && pose !== '-') o.pose = pose; if (flip === 'f') o.flip = true; if (s2) o.s = +s2; return o;
  });
  /* props shorthand "kind:xPercent:yPercent:scale" */
  const parseProps = str => (str || '').trim().split(/\s+/).filter(Boolean).map(s => { const [k, x, y, sc, c] = s.split(':'); return { k, x: Math.round(+x / 100 * 932), y: Math.round(+y / 100 * 430), s: +sc || 1, c: c ? '#' + c : undefined }; });
  /* speech-bubble shorthand "text|xPercent|yPercent|colour" separated by ;; */
  const parseOver = str => (str || '').split(';;').filter(Boolean).map(s => { const [t, x, y, c] = s.split('|'); return { k: 'bubble', t, x: Math.round(+x / 100 * 932), y: Math.round(+y / 100 * 430), s: .9, c: c ? '#' + c : '#fff' }; });
  const sc = (bg, deco, cast, props, over) => ({ bg, deco, cast: parseCast(cast), props: parseProps(props), over: parseOver(over) });
  /* slide constructors */
  const T = (t, scene, o = {}) => Object.assign({ k: 'text', t, sc: scene }, o);
  const Q = (q, scene, opts, o = {}) => Object.assign({ k: 'choice', q, sc: scene, opts: opts.map(([t, v, fb, to]) => ({ t, v, fb, to })) }, o);
  const F = (head, t, who, tag, icon, bg, o = {}) => Object.assign({ k: 'fact', head, t, who, tag, icon, bg: bg || 'yellow' }, o);
  const W = (w, t, bg, o = {}) => Object.assign({ k: 'widget', w, t, bg: bg || 'cream' }, o);
  const add = s => { s.talk = s.talk || []; STORIES.push(s); return s; };
  return { STORIES, sc, T, Q, F, W, add, parseCast };
})();
