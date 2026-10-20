# Not That Awk — interactive prototype

Clickable landscape prototype of the Not That Awk app (Figma: "FTE Portfolio").

Run locally:

    python3 -m http.server 8080   # then open http://localhost:8080

Press `P` to toggle the presenter sidebar. `?s=<screen>&id=<story>&slide=<n>` deep-links.

## What's inside

- **Illustrations are drawn in code** (`js/art.js` people and expressions, `js/props.js` backdrops and props, `js/scenes*.js` one scene per story slide). They follow the Figma language: tilted square faces, big eyes, black hair, wide trousers. Faces blink and change expression on the splash.
- **18 stories, each anchored in something real** (Mary Kom, Sachin Tendulkar, Rosa Parks, CHILDLINE 1098, Arunachalam Muruganantham, ...). Text lives in `js/stories2.js`.
- **Three reading levels / colour worlds**: 4-6 (warm), 7-9 (green and sky), 10-12 (purple, with a "Go deeper" fact card). Set by the child's profile age.
- **"Awk level" changes the pictures**: slides marked `tone:true` show a labelled diagram at *Not That Awk*, a simpler view at *A Little Awk*, and a gentle metaphor at *Very Awk*.

## Content caveats

Facts were gathered from public web sources through search summaries only (the research agent could not open full pages). Items flagged in the research and still to be verified by a subject expert before any launch: Mary Kom's early training dates, Harsha Chawda's exact birth date (6 or 16 Aug 1986), exact wording of translated quotes (Zidane, Rosa Parks), the current operator of CHILDLINE 1098 (in transition to the Mission Vatsalya / 112 system), and UNESCO age-band wording. All story copy needs review by a paediatrician, child psychologist and sex educator. Awkie replies are scripted, not AI.
