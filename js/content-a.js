/* Stories for Little Explorers (4–6) and Curious Minds (7–9). */
(() => {
const { sc, T, Q, F, W, add } = window.CT;

/* ============================================================ LITTLE EXPLORERS 4–6 */
add({ id: 'colours', zone: 'me', tiers: ['4-6'], title: 'Are there girl colours and boy colours?', hook: 'Pink, blue and everything in between belong to everyone.', mins: 5, tone: 'Gentle',
  take: 'All colours are for everyone.', guide: { teach: 'Gender stereotypes about colours and toys are made up by people, not by nature.', say: '“Colours don’t have a gender. You can like any colour you want.”', ask: 'Has anyone ever said something was “only for boys” or “only for girls”?', awk: 'If you hear “that’s for girls”, answer calmly: “Not in our house.”' },
  talk: [['Ask the child', 'What’s your favourite colour? Has anyone said it was “for boys” or “for girls”?'], ['Ask the grown-up', 'Was there a colour, toy or game you were told was “not for you” as a child?']],
  thumb: { orig: 'flower', bg: '#fcd3c3' },
  slides: [
    { k: 'orig', t: 'Rishi wants to wear a pink T-shirt.\nHe likes the T-shirt very much.', art: 'shirt', bg: 'peach', b: 'b1', bp: [96, 44, 400, 92], h: 362, ap: { r: 206, b: 18 } },
    { k: 'orig', t: 'But some children say that pink is only for girls. Is that really true?', art: 'kids3', bg: 'peach', b: 'b2', bp: [140, 26, 640, 76], h: 300, ap: { l: 236, b: 20 }, ask: 'What do you think? Is pink only for girls?' },
    { k: 'orig', t: 'No. All colours are for all children!', art: 'kids4', bg: 'peach', b: 'b4', bp: [176, 28, 586, 62], h: 282, ap: { l: 272, b: 22 } },
    { k: 'orig', t: 'In the past, red was the colour of the king, pink of the prince, and blue of the princess.', art: 'royals', bg: 'peach', b: 'b5', bp: [140, 306, 640, 84], h: 270, ap: { l: 200, b: 150 } },
    { k: 'orig', t: 'Today that is no longer the case.\nEvery colour is for everyone, and that is what makes our world beautiful and colourful.', art: 'flower', bg: 'peach', b: 'b3', bp: [72, 236, 290, 150], h: 400, ap: { l: 440, b: 0 } },
    W('palette', 'Your turn! Tap the colours you love and watch the flower bloom.', 'peach'),
  ] });

add({ id: 'names', zone: 'body', tiers: ['4-6'], title: 'Every part of my body has a name', hook: 'Knees, elbows… and the proper names for private parts.', mins: 5, tone: 'Gentle',
  take: 'My private parts are called penis, vulva and vagina. They are mine, and they are private.',
  guide: { teach: 'Correct names for all body parts, including genitals, and the idea of “private”.', say: '“Your penis / vulva is a private part. We use the proper names, like we do for elbows.”', ask: 'Do you know what the parts under your swimsuit are called?', awk: 'Say the words calmly, as you would “elbow”. Children copy your tone.' },
  talk: [['Ask the child', 'Can you point to your elbow, knee and tummy? What other body parts do you know?'], ['Ask the grown-up', 'Say “penis”, “vulva” and “vagina” out loud once, calmly, so it feels ordinary.']],
  slides: [
    T('Your body is amazing! Every part has a name: head, elbows, knees, tummy, toes.', sc('cream', 'grass', 'sam:big:35:up tara:big:65:wave'), { ask: 'Can they name five body parts?' }),
    W('bodymap', 'Tap parts of the body to find out about them.', 'cream'),
    T('The parts covered by underwear or a swimsuit are called private parts. Everyone has them: boys, girls, grown-ups and kids.', sc('sky', 'room', 'rishi:smile:35 tara:smile:65', 'bag:46:50:.8')),
    T('Their proper names are penis, testicles, vulva, vagina and bottom. They are body parts, just like elbows. They are private, so we keep them covered.', sc('peach', 'room', 'tara:proud:50:hold:-:1.3'), { ask: 'Use the proper names calmly. Do they have any questions?' }),
    Q('Your friend giggles at the word “penis”. What could you say?', sc('cream', 'school', 'rishi:shy:20 sam:big:38:point:f'), [
      ['“It’s just a body part. Let’s play something else.”', 'ok', 'Yes! It’s just a body-part name. You can stay calm and move on.'],
      ['“That’s a bad word!”', 'maybe', 'It isn’t a bad word. It’s a proper name. We just don’t talk about private parts loudly in public.'],
      ['Laugh loudly and tell everyone', 'no', 'Private parts are private. It’s kinder not to make a big fuss.'] ]),
  ] });

add({ id: 'whose', zone: 'consent', tiers: ['4-6'], title: 'Whose body is it? Hugs, kisses and saying no', hook: 'You are the boss of your body, even with people you love.', mins: 4, tone: 'Gentle',
  take: 'My body is mine. I can say “no thank you” to hugs and kisses.',
  guide: { teach: 'Bodily autonomy: children can decline affection from anyone without being rude.', say: '“You never have to hug or kiss anyone. A wave or high-five is fine.”', ask: 'What could you do if you don’t feel like a hug?', awk: 'Back your child up in front of relatives: “She’s not feeling huggy today. A high-five?”' },
  talk: [['Ask the child', 'What could you do instead of a hug if you didn’t feel like one?'], ['Ask the grown-up', 'How can our family practise asking before hugging?']],
  slides: [
    T('Your body is yours. You get to decide who touches it, even with hugs and kisses.', sc('cream', 'room', 'tara:proud:50:hug:-:1.4')),
    T('Dadi wants a kiss. But Tara doesn’t feel like one right now.', sc('peach', 'room', 'dadi:smile:30 tara:shy:62:-:-:1.4', '', '…|58|24|ffffff'), { ask: 'How might Tara feel?' }),
    Q('What could Tara do?', sc('peach', 'room', 'dadi:smile:16:-:-:.9 tara:shy:36:-:-:1.3'), [
      ['Say, “No thank you, but I can give you a high five!”', 'ok', 'Yes! Kind and clear. Dadi will understand.'],
      ['Say nothing, and do it anyway', 'maybe', 'You can, if you want to. But remember: you can always say no.'],
      ['Run away and hide', 'maybe', 'Feeling shy is okay. Next time, try a kind “no thank you”.'] ]),
    T('People who love you will understand. If someone doesn’t, tell a grown-up you trust.', sc('lilac', 'room', 'dadi:smile:36 tara:big:64:wave:-:1.4')),
  ] });

add({ id: 'touch', zone: 'consent', tiers: ['4-6'], title: 'Safe touches, unsafe touches and secrets', hook: 'How to tell the difference, and who to tell.', mins: 6, tone: 'Gentle',
  take: 'If a touch or a secret feels yucky, I tell a grown-up I trust, and keep telling until someone listens.',
  guide: { teach: 'Telling safe from unsafe touch, the difference between surprises and secrets, and building a Trusted Five.', say: '“You will never be in trouble for telling me anything.”', ask: 'Who are the five grown-ups you could tell anything?', awk: 'If your child discloses something, stay calm, believe them, thank them for telling. Call Childline 1098 for guidance.' },
  talk: [['Ask the child', 'Who is in your Trusted Five? Why them?'], ['Ask the grown-up', 'Promise out loud: “You can tell me anything and I won’t be angry.”']],
  slides: [
    T('Some touches are safe: a hug you like, a high five, a doctor checking you with your parent in the room.', sc('cream', 'grass', 'tara:big:35:wave rishi:big:65:up')),
    T('Some touches are not okay: touches that hurt, or someone touching your private parts, or asking you to touch theirs.', sc('sky', 'room', 'tara:worry:50:cross:-:1.4'), { ask: 'Make sure they understand: unsafe touch is never their fault.' }),
    T('A surprise is something that gets told soon, like a birthday present. A secret about touching or something yucky should NEVER be kept.', sc('lilac', 'room', 'sam:smile:40:hold:-:1.3 mama:smile:70', 'cake:20:60:.9')),
    Q('Someone says, “This is our special secret. Don’t tell your parents.” What do you do?', sc('lilac', 'room', 'rishi:worry:22:-:-:1.5', '', 'Shh…|10|20|ffffff'), [
      ['Tell a grown-up I trust, right away', 'ok', 'Yes. Yucky secrets are never okay to keep. Telling is always the right thing.'],
      ['Keep it a secret so I don’t get in trouble', 'no', 'You will never get in trouble for telling. The person who asked you to keep it is the one doing wrong.'],
      ['Tell a friend and hope for the best', 'maybe', 'A friend can’t keep you safe. Tell a grown-up, like Mum, Dad, a teacher or a doctor.'] ]),
    W('trust', 'Pick up to five grown-ups for your Trusted Five.', 'peach'),
    T('Keep telling until someone listens. In India you can also call Childline on 1098 for free, any time.', sc('cream', 'room', 'tara:proud:35:phone:-:1.3 doc:smile:70'), { ask: 'Write 1098 somewhere your child can see it.' }),
  ] });

add({ id: 'babies4', zone: 'babies', tiers: ['4-6'], title: 'Where do babies come from?', hook: 'The simple, true answer.', mins: 4, tone: 'Gentle',
  take: 'A baby grows in a womb, from a tiny egg and a tiny sperm, for about nine months.',
  guide: { teach: 'Basic reproduction in true, simple terms, plus that families come in many forms.', say: '“A baby starts from an egg from a woman and a sperm from a man. It grows in the womb for about nine months.”', ask: 'What do you think a baby feels like inside the womb?', awk: 'If they ask “how do they meet?”, you can say: “That’s a grown-up thing, and I’ll explain when you’re a bit older.” Then follow up later.' },
  talk: [['Ask the child', 'What do you think a baby is doing inside a tummy?'], ['Ask the grown-up', 'Tell the story of the day your child was born.']],
  slides: [
    T('A baby starts as two very tiny things, too small to see: an egg and a sperm.', sc('cream', 'blobs', '', 'womb:34:22:1.2')),
    T('The egg comes from a woman’s body. The sperm comes from a man’s body. When they join, a baby can begin to grow.', sc('sky', 'blobs', 'mama:smile:28 papa:smile:72', 'womb:40:30:.9')),
    T('The baby grows in a special space called the womb, inside a woman’s tummy. It takes about nine months.', sc('peach', 'blobs', 'mama:proud:50:hug:-:1.1', 'womb:40:50:.7')),
    T('When it’s ready, the baby is born. Most babies come out through an opening called the vagina. Some are born through a small cut in the tummy, called a C-section.', sc('cream', 'room', 'doc:smile:36 mama:big:66:-:-:1.1', 'bed:18:60:.6')),
    T('Every family is different. Some babies are adopted. Some have two mums or two dads. All families are real families.', sc('lilac', 'hills', 'mama:smile:20:-:-:.9 papa:smile:40:-:-:.9 rishi:big:62:-:-:1.4 mini:big:80:-:-:1.4')),
  ] });

add({ id: 'feelings', zone: 'feelings', tiers: ['4-6', '7-9'], title: 'All the feelings', hook: 'Every feeling is okay. Learn their names and where they live.', mins: 5, tone: 'Gentle',
  take: 'All feelings are okay. I can name them and I can ask for help.',
  guide: { teach: 'Emotional vocabulary and body awareness, the foundation for talking about anything harder later.', say: '“I see you’re feeling ___. Where do you feel it in your body?”', ask: 'Which petal were you today?', awk: 'Name your own feelings out loud: “I’m a bit frustrated. I’m taking three slow breaths.”' },
  talk: [['Ask the child', 'Which petal did you feel today? Where did you feel it in your body?'], ['Ask the grown-up', 'Name a big feeling you had this week and what helped you.']],
  slides: [
    T('Feelings are like petals on a flower. Lots of colours, all growing from the same stem: you!', sc('peach', 'blobs', 'tara:big:50:up:-:1.4', 'flower:12:20:2.2 flower:80:25:1.6')),
    W('emoflower', 'Tap a petal to meet a feeling.', 'peach'),
    T('No feeling is bad. Even the loud ones. What matters is what we do next, and who we tell.', sc('cream', 'grass', 'rishi:sad:30:-:-:1.4 sam:proud:50:-:-:1.4 mama:smile:78')),
  ] });

add({ id: 'embarrass', zone: 'feelings', tiers: ['4-6'], title: 'Red cheeks and hot ears', hook: 'What embarrassment is, and what helps.', mins: 3, tone: 'Gentle',
  take: 'Everyone gets embarrassed. It passes.',
  guide: { teach: 'Normalising embarrassment, which later underpins talking about bodies and puberty.', say: '“Everyone feels embarrassed. It goes away.”', ask: 'What helps you when you feel embarrassed?', awk: 'Share a time you felt embarrassed. Kids relax when grown-ups are human too.' },
  talk: [['Ask the child', 'What was the last thing that made your cheeks go red?'], ['Ask the grown-up', 'Share a time you felt embarrassed when you were little.']],
  slides: [
    T('Sometimes your cheeks go red, your ears feel hot and you want to hide. That’s called being embarrassed.', sc('cream', 'school', 'arjun:shy:50:-:-:1.5')),
    Q('What can help when you feel embarrassed?', sc('cream', 'school', 'arjun:shy:22:-:-:1.5'), [
      ['Take three slow dragon breaths', 'ok', 'Yes! Slow breaths tell your body it’s safe.'],
      ['Pretend it never happened', 'maybe', 'Hiding can make it feel bigger. A breath, and telling someone, can help more.'],
      ['Tell someone I trust', 'ok', 'Yes! Feelings get lighter when we share them.'] ]),
    T('Everyone gets embarrassed, even grown-ups. It passes, like a little cloud.', sc('lilac', 'hills', 'mama:shy:36:-:-:1.1 arjun:big:64:-:-:1.5')),
  ] });

add({ id: 'play4', zone: 'me', tiers: ['4-6', '7-9'], title: 'Who says how I’m allowed to play?', hook: 'Football, dolls, skipping and cricket: games are for everyone.', mins: 4, tone: 'Gentle',
  take: 'Anyone can play any game. Boys and girls can do anything.',
  guide: { teach: 'Challenging gender stereotypes using real role models.', say: '“Anyone can like any game.”', ask: 'What’s your favourite game, and who do you play it with?', awk: 'Watch for your own comments like “that’s a girl thing”. Kids notice.' },
  talk: [['Ask the child', 'What’s your favourite game? Who do you play it with?'], ['Ask the grown-up', 'Share a game you loved as a child. Did anyone say you couldn’t play it?']],
  slides: [
    T('Some children love football. Some love teddy bears. Some love both!', sc('cream', 'grass', 'sam:big:30:-:-:1.5 tara:smile:60:-:-:1.5', 'ball:42:76:1.3 teddy:46:70:1.1')),
    T('A loud voice says, “Football is for boys!” Another says, “Teddies are for girls!”', sc('peach', 'grass', 'rishi:worry:70:-:-:1.5 arjun:angry:26:point:-:1.5', '', 'Football is for boys!|2|22|ffffff;;Teddies are for girls!|38|52|ffcb05')),
    F('Did you know?', 'Mary Kom is a boxer from Manipur. She has won six world titles, and she is also a mum. Nobody told her boxing was “only for boys”.', 'Mary Kom', 'Boxer · six-time world champion', 'glove', 'orange', { ask: 'What could you do that people say is “not for you”?' }),
    Q('Who gets to decide what YOU love to play?', sc('cream', 'grass', 'sam:big:22:-:-:1.4'), [
      ['Whoever shouts the loudest', 'no', 'Not quite. A loud voice doesn’t get to be the boss of your fun.'],
      ['Me, with kind friends and grown-ups', 'ok', 'Yes! You choose what you love, as long as everyone stays safe and kind.'],
      ['Nobody knows', 'no', 'Somebody does: YOU. You know best what makes you smile.'] ]),
  ] });

add({ id: 'exclude', zone: 'feelings', tiers: ['4-6', '7-9'], title: 'When a friend says “you can’t play”', hook: 'Left out? What to do, and how to include others.', mins: 4, tone: 'Gentle',
  take: 'Being left out hurts. I can say how I feel, ask for help and include others.',
  guide: { teach: 'Friendship skills, empathy and speaking up.', say: '“I’d feel sad too. What could we try?”', ask: 'Has anyone ever left you out?', awk: 'Resist fixing it for them. Ask what they’d like to try first.' },
  talk: [['Ask the child', 'Has anyone ever left you out? What happened next?'], ['Ask the grown-up', 'Tell a story about a good friend who stood by you.']],
  slides: [
    T('Four friends are playing. Then someone says, “You can’t play with us.”', sc('peach', 'grass', 'tara:sad:28:-:-:1.4 rishi:angry:62:point:-:1.4 sam:neutral:80:-:-:1.4')),
    Q('How might that feel?', sc('peach', 'grass', 'tara:sad:22:-:-:1.5'), [
      ['Left out', 'ok', 'Yes. Being left out can feel lonely.'],
      ['Angry', 'ok', 'Yes, that’s a very real feeling too.'],
      ['Nothing at all', 'maybe', 'It’s okay to feel something. Most of us do.'] ]),
    T('What can we do? Say how we feel. Ask a grown-up. Find another friend. Invite someone who is alone.', sc('cream', 'grass', 'tara:big:30:wave:-:1.4 mini:big:60:-:-:1.4 sam:smile:82')),
  ] });

/* ============================================================ CURIOUS MINDS 7–9 */
add({ id: 'change79', zone: 'growing', tiers: ['7-9'], title: 'Your body is going to change. That’s normal.', hook: 'What puberty is, when it starts and why everyone’s clock is different.', mins: 5, tone: 'Curious',
  take: 'Puberty is how a child’s body grows into an adult body. It starts at different times for everyone.',
  guide: { teach: 'Puberty preview: it’s coming for everyone, with a wide normal range.', say: '“Your body will change over the next few years. Everyone’s changes start at their own time.”', ask: 'What have you heard about puberty?', awk: 'If they’ve heard things from older kids, ask what they heard, then correct gently.' },
  talk: [['Ask the child', 'What have you heard about puberty? What do you want to know?'], ['Ask the grown-up', 'Tell them one thing about your own puberty that surprised you.']],
  slides: [
    T('Your body has been growing since you were a baby. Soon it will start to change in new ways. This is called puberty.', sc('cream', 'hills', 'rishi:smile:30:-:-:1.5 meera:smile:62:-:-:1.1')),
    T('Puberty can start anywhere from about age 8 to 14. Early, late or in the middle: all are normal.', sc('sky', 'room', 'arjun:proud:25:-:-:1.5 meera:smile:50:-:-:1.1 dev:smile:75:-:-:1.1', 'calendar:44:14:1')),
    T('You might get taller, grow hair in new places, sweat more, get spots on your face and have bigger feelings. Bodies with a uterus start to have periods. Voices deepen.', sc('lilac', 'room', 'kabir:shy:50:hips:-:1.1'), { ask: 'Ask: “What do you think might be the hardest part? The best part?”' }),
    Q('Your best friend is growing faster than you. What’s true?', sc('lilac', 'room', 'rishi:worry:22:-:-:1.5'), [
      ['Everyone has their own clock. Early and late are both normal.', 'ok', 'Yes. There’s no “right” time.'],
      ['I’m doing something wrong', 'no', 'Not at all. Nothing you do speeds it up or slows it down.'],
      ['I should hide my body', 'no', 'Your body is nothing to hide. If it feels worrying, talk to a grown-up or a doctor.'] ]),
  ] });

add({ id: 'periods79', zone: 'growing', tiers: ['7-9'], title: 'What is a period?', hook: 'Everyone should know, not only girls.', mins: 5, tone: 'Curious',
  take: 'A period is normal body stuff: blood from the womb about once a month. It’s nothing to be ashamed of.',
  guide: { teach: 'Periods explained for ALL children, which reduces shame and bullying.', say: '“A period is when blood comes out of the vagina about once a month. It’s normal and healthy.”', ask: 'What have you heard about periods?', awk: 'Boys need to know too. Say so: “Everyone should understand this.”' },
  talk: [['Ask the child', 'What do you know about periods? What would you like to know?'], ['Ask the grown-up', 'Share your first period story, or how you found out, in a few words.']],
  slides: [
    T('Some bodies have a uterus, a stretchy pouch inside where a baby can grow. About once a month, the soft lining of the uterus comes out. This is called a period.', sc('peach', 'blobs', '', 'womb:30:20:1.3 calendar:70:30:1.4'), { ask: 'This is a good moment to check what they already know.' }),
    T('It comes out of the body through the vagina as blood. Periods usually start between ages 9 and 15, and last 3 to 7 days.', sc('sky', 'room', 'meera:smile:40:-:-:1.1 mama:smile:70', 'calendar:10:20:1.1 pad:20:60:.9')),
    T('People use pads or other products to catch the blood. It’s not dirty, not shameful, and not a reason to be left out of anything.', sc('cream', 'room', 'dadi:smile:30 meera:proud:62', 'pad:46:56:1.2')),
    F('Real story', 'Arunachalam Muruganantham from Tamil Nadu noticed that many women near him could not afford sanitary pads. He built a machine to make low-cost pads, and won a Padma Shri in 2016. A man who cared enough to learn about periods.', 'Arunachalam Muruganantham', 'Inventor · low-cost pad machines', 'pad', 'orange', { ask: 'Why do you think more people should know about periods?' }),
    Q('A classmate has a period stain on her skirt. What’s the kind thing to do?', sc('cream', 'school', 'meera:shy:22:-:-:1.1 zoya:smile:42:-:-:1.1'), [
      ['Quietly tell her, and lend a jumper to tie round her waist', 'ok', 'Yes. Kind, private and helpful.'],
      ['Laugh and point', 'no', 'That would really hurt. Periods are normal, and everyone with a period has had this happen.'],
      ['Pretend I didn’t see', 'maybe', 'It’s understandable. But a quiet word can really help her.'] ]),
  ] });

add({ id: 'babies79', zone: 'babies', tiers: ['7-9'], title: 'How do babies get started?', hook: 'Eggs, sperm, the womb, and how long it takes.', mins: 6, tone: 'Curious',
  take: 'A baby begins when an egg and a sperm meet and grow in the womb for about nine months.',
  guide: { teach: 'Conception, pregnancy and birth in plain language, without the how of intercourse yet.', say: '“A baby begins when an egg and a sperm meet. How they meet is something we’ll talk about when you’re a little older.”', ask: 'What questions do you still have?', awk: 'If they ask how exactly: “They join through sex, which is something adults do. I’m happy to tell you more when you’re ready.”' },
  talk: [['Ask the child', 'What questions do you still have? No question is silly.'], ['Ask the grown-up', 'Pick the words you’re comfortable with and answer one question honestly.']],
  slides: [
    W('cells', 'Every baby starts from two tiny cells, far too small to see.', 'orange', { n: 0 }),
    W('cells', 'One cell, an egg, comes from a person with ovaries. The other, a sperm, comes from a person with testicles.', 'orange', { n: 1 }),
    W('cells', 'When an egg and a sperm meet inside the body, they can join together and start growing into a baby. This is called conception.', 'orange', { n: 2 }),
    T('The baby grows in the uterus for about nine months. Doctors check that mum and baby are healthy along the way.', sc('peach', 'room', 'mama:proud:36:hug:-:1.05 doc:smile:70', 'womb:56:20:1')),
    T('How an egg and a sperm get close enough to meet is something grown-ups do together, called sex. We’ll explain that when you’re a bit older. Some babies also begin with a doctor’s help.', sc('lilac', 'hills', 'mama:smile:30 papa:smile:70', '', ''), { ask: 'Decide how much to add. Short and true is perfect.' }),
  ] });

add({ id: 'dare', zone: 'feelings', tiers: ['7-9'], title: 'The dare', hook: 'When friends push you to do or watch something you’re not sure about.', mins: 6, tone: 'Curious', branch: true,
  take: 'I can say no to a dare. If I see something confusing, I tell a grown-up.',
  guide: { teach: 'Peer pressure, assertive refusal, and what to do after seeing something unsuitable.', say: '“You can always blame me: say your parents are strict.”', ask: 'What would you say if a friend dared you?', awk: 'If they tell you they saw something, thank them first. Then ask what they saw and how they feel.' },
  talk: [['Ask the child', 'What’s a good line to say when you don’t want to do something?'], ['Ask the grown-up', 'Did you ever go along with something because of friends? What would you tell your younger self?']],
  slides: [
    T('At Kabir’s cousin’s house, an older boy says, “I’ve got a video on my phone. It’s not for kids. Dare you to watch.”', sc('navy', 'night', 'kabir:worry:30:-:-:1.1 dev:smile:62:phone:-:1.1', 'phone:48:52:1.2'), { id: 'a1' }),
    Q('What does Kabir do?', sc('navy', 'night', 'kabir:worry:22:-:-:1.2'), [
      ['Watch it. Everybody’s watching', 'maybe', 'It’s hard to say no when others are watching. Let’s see what happens.', 'watch'],
      ['Say, “No thanks, not my thing” and walk away', 'ok', 'Brave! A calm no is hard but strong.', 'no'],
      ['Tell a grown-up straight away', 'ok', 'That’s smart and brave.', 'tell'] ], { id: 'q1' }),
    T('Kabir watches. It’s confusing and makes him feel strange, and he’s not sure what he just saw. He feels a bit sick.', sc('navy', 'night', 'kabir:sad:50:-:-:1.4'), { id: 'watch', next: 'join' }),
    T('Kabir says, “No thanks, not my thing.” The older boy shrugs. Another kid says, “Same, actually.” Kabir feels proud.', sc('navy', 'night', 'kabir:proud:35:-:-:1.1 meera:smile:65:-:-:1.1'), { id: 'no', next: 'join' }),
    T('Kabir finds his uncle and says, “Someone wanted me to watch something. I didn’t.” His uncle says, “Thank you for telling me. Well done.”', sc('cream', 'room', 'kabir:big:30:-:-:1.1 papa:smile:68'), { id: 'tell', next: 'join' }),
    T('Whatever happens, one thing is true: if you see something that confuses or upsets you, it is NOT your fault, and you can tell a grown-up. They won’t be angry.', sc('lilac', 'hills', 'kabir:smile:36:-:-:1.1 mama:smile:68'), { id: 'join', ask: 'Tell your child: “If you ever see something confusing, you can tell me and you will never be in trouble.”' }),
  ] });

add({ id: 'stereo79', zone: 'me', tiers: ['7-9'], title: 'Who says what girls and boys can do?', hook: 'Astronauts, boxers and the man who made pads.', mins: 5, tone: 'Curious',
  take: 'Girls and boys can do any job, love any hobby and show any feeling.',
  guide: { teach: 'Challenging gender stereotypes using real people.', say: '“Girls and boys can both be anything.”', ask: 'What job would you love, and has anyone said it’s not for you?', awk: 'Notice who’s shown in jobs on TV together, and chat about it.' },
  talk: [['Ask the child', 'If you could do any job, which one? Has anyone said it’s not for you?'], ['Ask the grown-up', 'Which stereotype did you grow up with that you’d like to break?']],
  slides: [
    T('Some people say, “Boys don’t cry.” “Girls can’t be scientists.” “Men don’t cook.” Are these true?', sc('peach', 'school', 'rishi:worry:30:-:-:1.5 meera:neutral:62:cross:-:1.1', '', 'Boys don’t cry!|4|20|ffffff;;Girls can’t…|56|18|ffcb05')),
    F('Did you know?', 'Kalpana Chawla, born in Haryana, became the first woman of Indian origin to go to space in 1997. She worked hard at maths and flying, and she followed her dream.', 'Kalpana Chawla', 'Astronaut', 'rocket', 'navy'),
    F('Did you know?', 'Neeraj Chopra won India’s first Olympic gold in athletics in 2021, in the javelin. He is also known for being kind and humble, and says it’s okay to feel nervous before a big throw.', 'Neeraj Chopra', 'Olympic champion · javelin', 'javelin', 'olive'),
    Q('Dev loves dancing. A boy says, “Dancing is for girls.” Dev should…', sc('cream', 'school', 'dev:worry:22:-:-:1.1'), [
      ['Keep dancing. It’s his joy.', 'ok', 'Yes! Many of the world’s best dancers are men.'],
      ['Stop, so he fits in', 'no', 'Fitting in isn’t worth hiding what you love.'],
      ['Wait until nobody’s watching', 'maybe', 'Understandable, but you shouldn’t have to hide what makes you happy.'] ]),
  ] });

add({ id: 'chat79', zone: 'online', tiers: ['7-9'], title: 'The photo in the group chat', hook: 'Someone shared a photo without asking. What now?', mins: 5, tone: 'Curious', branch: true,
  take: 'Ask before sharing someone’s photo. If a photo hurts someone, tell a grown-up.',
  guide: { teach: 'Online consent, privacy and telling a trusted adult about harmful posts.', say: '“If it’s someone else’s photo, ask first. If it hurts someone, tell me.”', ask: 'Has anyone ever shared a photo of you without asking?', awk: 'Don’t take their device away as a first reaction. They’ll stop telling you.' },
  talk: [['Ask the child', 'What rule would you make for sharing photos in a group chat?'], ['Ask the grown-up', 'What’s your own rule for posting photos of other people?']],
  slides: [
    T('Meera wears a silly hat in a photo with her friends. Zoya puts it in the class group chat. Everyone laughs. Meera feels hot and embarrassed.', sc('navy', 'night', 'meera:shy:30:-:-:1.1 zoya:big:64:phone:-:1.1', 'chat:44:36:.9'), { id: 'a' }),
    Q('Dev is in the chat. What should he do?', sc('navy', 'night', 'dev:worry:22:phone:-:1.1', 'chat:6:10:.7'), [
      ['Add a laughing emoji', 'no', 'That makes it worse for Meera, even if it feels like a joke.', 'laugh'],
      ['Message Zoya privately: “Please take it down, Meera doesn’t like it”', 'ok', 'Good! A kind, direct ask can fix it.', 'ask'],
      ['Tell a grown-up or teacher', 'ok', 'Also good. You can ask for help any time.', 'tell'] ], { id: 'q' }),
    T('More laughing emojis pile in. Meera stops answering messages and doesn’t want to go to school.', sc('navy', 'night', 'meera:sad:50:-:-:1.3'), { id: 'laugh', next: 'rule' }),
    T('Zoya says, “Oh, sorry! I didn’t think.” She deletes it and messages Meera to say sorry. Meera says, “Thanks.”', sc('lilac', 'room', 'zoya:shy:36:phone:-:1.1 meera:smile:66:-:-:1.1'), { id: 'ask', next: 'rule' }),
    T('The teacher asks everyone to delete the photo and chats with the class about asking first. Meera feels supported.', sc('cream', 'school', 'teacher:smile:70 meera:proud:34:-:-:1.1'), { id: 'tell', next: 'rule' }),
    T('Rule of thumb: ask before you share a photo of someone. If you’re not sure, don’t share it.', sc('lilac', 'hills', 'meera:big:30:-:-:1.1 zoya:smile:60:-:-:1.1', 'phone:80:50:1.2'), { id: 'rule', ask: 'Together, write a family rule for photos.' }),
  ] });

add({ id: 'pants', zone: 'consent', tiers: ['7-9'], title: 'Five rules to keep me safe', hook: 'Private parts are private, and what to do if someone breaks the rules.', mins: 6, tone: 'Curious',
  take: 'My body belongs to me. I can say no, and I can always tell someone.',
  guide: { teach: 'Five safety rules about privacy, bodily ownership, saying no, upsetting secrets, and speaking up.', say: '“Your body is yours. If anything makes you uncomfortable, tell me. You will never be in trouble.”', ask: 'Which rule is hardest to remember?', awk: 'Practise the words: “Stop that. I’m telling.”' },
  talk: [['Ask the child', 'Which of the five rules is the most important to you?'], ['Ask the grown-up', 'Practise saying “stop that, I’m telling” together, loudly and calmly.']],
  slides: [
    T('Rule 1: Private parts are private. Parts covered by underwear or a swimsuit are only yours.', sc('cream', 'room', 'arjun:proud:50:cross:-:1.7')),
    T('Rule 2: Your body belongs to you. Nobody can touch you in a way you don’t like, even someone you know.', sc('sky', 'room', 'tara:proud:50:hug:-:1.7')),
    T('Rule 3: No means no. You can say it to anyone, and people must stop. You can also say stop even if you said yes before.', sc('peach', 'room', 'rishi:angry:50:point:-:1.7', '', 'STOP|60|20|ffcb05')),
    T('Rule 4: Secrets that upset you or make you feel yucky should never be kept. Surprises are different. They’re fun and get told soon.', sc('lilac', 'room', 'sam:worry:50:-:-:1.7', '', 'Shh…|60|20|ffffff')),
    T('Rule 5: Speak up. Tell a grown-up you trust, and keep telling until someone listens. You can also call Childline on 1098.', sc('cream', 'room', 'tara:big:30:phone:-:1.4 doc:smile:70')),
    Q('Which of these breaks the rules?', sc('cream', 'room', 'sam:worry:22:-:-:1.5'), [
      ['A grown-up saying “don’t tell your parents we did this”', 'ok', 'Yes. An upsetting secret like that should be told, to someone you trust.'],
      ['A doctor checking me with my parent in the room', 'no', 'That’s a safe check-up, and a parent is there.'],
      ['A friend asking if they can have a hug', 'no', 'Asking first is great. You can say yes or no.'] ]),
  ] });

add({ id: 'crush79', zone: 'feelings', tiers: ['7-9'], title: 'Butterflies: what’s a crush?', hook: 'Liking someone a lot. It’s normal, and respectful.', mins: 4, tone: 'Curious',
  take: 'A crush is a strong liking. It’s normal, and everyone gets to say no.',
  guide: { teach: 'Normalising early crushes, and respect and privacy around them.', say: '“Crushes are normal and you never have to tell anyone.”', ask: 'What do you think a crush feels like?', awk: 'Never tease about crushes. It teaches them to hide things from you.' },
  talk: [['Ask the child', 'Why do you think people get butterflies?'], ['Ask the grown-up', 'Tell a gentle (or funny) crush story from when you were young.']],
  slides: [
    T('Sometimes you start liking someone a lot. You think about them, smile when they walk in, and feel butterflies in your tummy. That’s a crush.', sc('lilac', 'hills', 'meera:shy:36:-:-:1.1 kabir:smile:66:-:-:1.1', 'heart:48:30:.9:ff7664')),
    T('A crush can be on a boy, a girl, or nobody at all. You don’t choose it, and it can come and go.', sc('lilac', 'hills', 'dev:smile:30 zoya:smile:50 riya:smile:70', 'heart:46:20:.7:ffcb05')),
    Q('What’s good to remember about crushes?', sc('lilac', 'hills', 'meera:shy:22:-:-:1.2'), [
      ['They might not like me back, and that’s okay', 'ok', 'Yes. Feelings are real, and so are other people’s choices.'],
      ['I should tell the whole class', 'no', 'You never have to. Share only with people you trust.'],
      ['Everyone gets to say no, including my crush', 'ok', 'Yes. Respect goes both ways.'] ]),
  ] });

add({ id: 'bodies79', zone: 'body', tiers: ['7-9'], title: 'Bodies come in all shapes', hook: 'Why comparing bodies is a trap, and what to say to a teaser.', mins: 4, tone: 'Curious',
  take: 'Bodies come in every shape and size. Teasing about bodies is unkind, and I can say so.',
  guide: { teach: 'Body diversity, early body image and responding to teasing.', say: '“There is no one right body. Bodies are for doing things, not just for looking at.”', ask: 'What do you like your body can do?', awk: 'Be careful with comments on weight or looks, including your own.' },
  talk: [['Ask the child', 'What’s something your body can do that you’re proud of?'], ['Ask the grown-up', 'Say one kind thing about your own body out loud.']],
  slides: [
    T('Some people are tall, some are short. Some are slim, some are round. Some have glasses, some use wheelchairs. Bodies come in every shape.', sc('cream', 'grass', 'rishi:smile:20:-:-:1.5 sam:smile:38:-:-:1.5 dadi:smile:60 meera:smile:84:-:-:1.1')),
    F('Did you know?', 'Simone Biles is only 4 feet 8 inches tall, and she is one of the most decorated gymnasts in history. Her body is exactly right for what she does.', 'Simone Biles', 'Gymnast', 'star', 'purple'),
    Q('A kid says, “You’re so skinny!” in a mean voice. What can you say?', sc('cream', 'school', 'sam:sad:22:-:-:1.4'), [
      ['“That’s not kind. Please stop.”', 'ok', 'Yes! Clear and calm. Tell a grown-up if it keeps happening.'],
      ['Say something mean back', 'maybe', 'It’s tempting, but it usually makes things worse.'],
      ['Believe them and feel bad', 'no', 'Their words say something about them, not about you.'] ]),
  ] });
})();
