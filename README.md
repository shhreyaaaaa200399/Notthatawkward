# Not That Awk: interactive prototype

Clickable prototype of the Not That Awk app (Figma: "FTE Portfolio").

Run locally:

    python3 -m http.server 8080   # then open http://localhost:8080

Press `P` for the presenter index (jump to any screen). Deep links: `?s=<screen>&id=<story>&slide=<n>&p=d1..d4` (`d1`–`d4` are demo profiles in each age zone).

## How it is organised
- Two modes: kid mode (works alone) and a separate Grown-up space (maths gate).
- Four age zones (4–6, 7–9, 10–12, 13+) change stories, words, games, avatars and tint.
- `js/art.js` is a vector illustration system in the Figma style (people, scenes, props, Awkie, avatars, diagrams).
- `js/content-*.js` hold stories, game decks and Meet content. All copy is placeholder and needs paediatric, sexual-health and legal review.
- Original Figma raster crops are kept only for the logo, splash faces, hub tiles, animal avatars and the colours story.
