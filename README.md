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

- **Avatars**: animals for everyone, hero avatars for 10-12 (original characters, not brand copies), and a **make-your-own** lab (`js/avatars.js`): optionally take or upload a photo, which is used only on the device to suggest skin and hair colours, then tune hair, accessories, cape, mask and mood. Hero and custom avatars also star in the stories.
- **First visit vs. returning**: first-time families go through onboarding (including the avatar pick); returning families (any saved profile) land straight on the profile screen, and the plus button there is what leads to age, avatar and name. A fresh install has no profiles until the first child is added.
- **Use without a parent**: kids can open the app, Play, Meet, the sound/voice and language settings, and the library of stories their grown-ups approved. Only grown-up controls (tone, screen time, profiles, privacy, topic approvals, weekly report) ask for a quick grown-up check.
- **Anatomy**: the "Real names for body parts" story shows labelled reproductive-system diagrams only at the *Not That Awk* level (7+); lower levels show simple name cards or a gentle note.

## Content caveats

Facts were gathered from public web sources through search summaries only (the research agent could not open full pages). Items flagged in the research and still to be verified by a subject expert before any launch: Mary Kom's early training dates, Harsha Chawda's exact birth date (6 or 16 Aug 1986), exact wording of translated quotes (Zidane, Rosa Parks), the current operator of CHILDLINE 1098 (in transition to the Mission Vatsalya / 112 system), and UNESCO age-band wording. All story copy needs review by a paediatrician, child psychologist and sex educator. Awkie replies are scripted, not AI.
