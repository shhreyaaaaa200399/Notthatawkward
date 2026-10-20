/* Stories for Tweens (10–12): puberty, periods, anatomy, consent, relationships, online safety, and how babies are made. */
(() => {
const { sc, T, Q, F, W, add } = window.CT;

add({ id: 'puberty', zone: 'growing', tiers: ['10-12'], title: 'Puberty: what’s actually going on', hook: 'Hormones, growth spurts, sweat, spots and moods. All of it, in plain words.', mins: 7, tone: 'Direct',
  take: 'Puberty is hormones changing your body and feelings. It starts at different ages, and all of it is normal.',
  guide: { teach: 'How puberty works for all bodies, including the wide normal range of timing and hygiene basics.', say: '“Puberty is your body changing into an adult body. There’s no right time, and I’m here to answer anything.”', ask: 'What have you noticed, or what are you wondering about?', awk: 'Let them read first and come back with questions. Keep a calm face.' },
  talk: [['Ask the child', 'Which change are you most curious or most nervous about?'], ['Ask the grown-up', 'What do you wish someone had told you before your own puberty?']],
  slides: [
    T('Puberty is when your body changes from a child’s body into an adult’s. Hormones, chemical messengers in your blood, switch it on. It’s the same process for everyone, just in different timings.', sc('cream', 'hills', 'kabir:smile:30 meera:smile:60 riya:smile:80')),
    W('timeline', 'Tap a bar to see when changes typically start. The line marks about where you are now.', 'cream'),
    T('Sweat glands wake up, so you start to smell different. Washing daily, wearing clean clothes and using deodorant if you like all help. Spots are common too. Wash your face, don’t squeeze, and see a doctor if they get bad.', sc('sky', 'bath', 'dev:shy:40:-:-:1.1', 'drop:55:40:.6:96c5d1 drop:60:48:.5:96c5d1')),
    T('Your feelings can swing too. You might feel moody, self-conscious or curious about relationships. Sleep, food, exercise and talking to someone you trust all help.', sc('lilac', 'room', 'meera:sad:34:-:-:1.1 mama:smile:68', 'heart:48:30:.7:ff7664'), { ask: 'Ask: “How are your moods lately? Anything you’d like help with?”' }),
    Q('You’ve noticed you sweat and smell more. What helps?', sc('lilac', 'bath', 'dev:shy:22:-:-:1.1'), [
      ['Wash daily, wear clean clothes, try deodorant', 'ok', 'Yes. Simple and effective.'],
      ['Ignore it. It’ll go away', 'maybe', 'It won’t go away, but small habits make a big difference.'],
      ['Spray perfume heavily', 'maybe', 'Perfume covers smell but doesn’t fix it. Washing matters most.'] ]),
  ] });

add({ id: 'periods', zone: 'growing', tiers: ['10-12'], title: 'Periods, step by step', hook: 'The cycle, the products, cramps, and the myths you can ignore.', mins: 8, tone: 'Direct',
  take: 'A period is a normal monthly cycle. I can manage it, ask for help, and ignore the myths.',
  guide: { teach: 'The menstrual cycle, practical management and debunking Indian period myths (temples, kitchens, pickles).', say: '“Periods are normal. If you ever need anything at school, you can ask me.”', ask: 'Do you know what to do if your period starts at school?', awk: 'Boys need to learn this too. Include them.' },
  talk: [['Ask the child', 'What would you do if your period started at school (or a friend’s did)?'], ['Ask the grown-up', 'Which period myth did you grow up with that you now know is false?']],
  slides: [
    W('cycle', 'A cycle runs from the first day of one period to the first day of the next. Slide the day to see what’s happening.', 'cream'),
    T('Products: pads stick inside underwear. Tampons go inside the vagina. Menstrual cups are small silicone cups. Period underwear absorbs. Change pads every 4 to 6 hours, and tampons at least every 8.', sc('peach', 'room', 'meera:smile:40:-:-:1.1 mama:smile:72', 'pad:10:30:1.3 bag:8:56:.9'), { ask: 'Show them where you keep spares at home.' }),
    T('Cramps are common. A hot-water bottle, a walk and rest can help. A doctor can suggest pain relief. See one if the pain stops you from school, bleeding is very heavy, or you haven’t had a period by 15.', sc('sky', 'room', 'riya:sad:38:hug:-:1.1 mama:smile:70', 'thermometer:12:40:1')),
    F('Real story', 'At the 2016 Olympics, Chinese swimmer Fu Yuanhui told reporters she felt tired because her period had started. She was relaxed and honest about it, and many people thanked her for saying it aloud.', 'Fu Yuanhui', 'Olympic swimmer', 'star', 'purple'),
    T('Myths to ignore: “don’t enter the temple or kitchen”, “don’t touch the pickle”, “periods make you impure”. None of these are true. A period is a normal body process. And 28 May is World Menstrual Hygiene Day.', sc('lilac', 'room', 'dadi:smile:30 meera:proud:62', 'calendar:44:8:1.1')),
    Q('Your friend’s first period starts at school and she has no pad. What helps?', sc('lilac', 'school', 'zoya:shy:20:-:-:1.1 riya:smile:38:-:-:1.1'), [
      ['Stay calm, give her a pad, and walk with her to the toilets', 'ok', 'Yes. Calm, kind and practical.'],
      ['Tell the whole class so someone can help', 'no', 'Keep it private. Ask one trusted person quietly.'],
      ['Tell her to go home', 'maybe', 'She might need to, but first help her sort herself out with a pad or a jumper round her waist.'] ]),
  ] });

add({ id: 'boys10', zone: 'growing', tiers: ['10-12'], title: 'Erections, wet dreams and voice cracks', hook: 'Puberty in bodies with a penis, and everyone should know.', mins: 7, tone: 'Direct',
  take: 'Erections, wet dreams and voice cracks are all normal parts of puberty. Semen loss doesn’t make you weak.',
  guide: { teach: 'Puberty for bodies with testes: erections, nocturnal emissions, hygiene, plus myths around semen loss and masturbation.', say: '“Erections and wet dreams happen to every boy and are totally normal.”', ask: 'Anything you’ve heard that worries you?', awk: 'If your child is a boy and you’re a woman, it’s fine to say: “Dad / uncle / a doctor can help too.” Don’t let it go unsaid.' },
  talk: [['Ask the child', 'What have you heard about puberty in boys, from friends or online? Let’s check it.'], ['Ask the grown-up', 'Offer a trusted man (relative or doctor) they can ask if they prefer.']],
  slides: [
    T('Between about 9 and 14, the testicles and penis grow, and the testicles start making sperm and testosterone. Hair grows in new places, and you get taller, fast.', sc('cream', 'room', 'kabir:smile:50:-:-:1.1')),
    T('An erection is when the penis fills with blood and gets hard. In puberty they can happen at any time, even when you’re not thinking about anything. It’s normal. They go away on their own.', sc('sky', 'school', 'kabir:shy:50:cross:-:1.1'), { ask: 'Reassure: “It happens to every boy. Loose clothes or a bag in front help.”' }),
    T('A wet dream is when semen, the white fluid with sperm in it, comes out of the penis during sleep. It isn’t wee, and it isn’t your fault. Change your underwear, wash, and carry on.', sc('navy', 'room', 'kabir:shy:50:-:-:1.1', 'bed:12:62:1.2')),
    T('Myth: “Losing semen makes you weak.” It doesn’t. Your body makes more all the time. Masturbation, touching your own private parts for pleasure, is also normal, harmless and private. It’s something to do in private, never in public.', sc('lilac', 'room', 'dev:smile:50:-:-:1.1'), { ask: 'Many Indian boys worry about this because of myths. Say clearly: it’s harmless.' }),
    T('Your voice will crack and then get deeper. Hygiene helps too: wash your genitals daily with water, and under the foreskin gently if it pulls back easily. Don’t force it.', sc('cream', 'bath', 'kabir:big:36:-:-:1.1 papa:smile:70')),
    Q('Your voice cracks in class and someone laughs. What’s true?', sc('cream', 'school', 'kabir:shy:20:-:-:1.1'), [
      ['It’s normal. Almost every boy’s voice cracks.', 'ok', 'Yes. It means your voice box is growing.'],
      ['Something is wrong with me', 'no', 'Nothing is wrong. Voice breaking is a normal sign of puberty.'],
      ['I should stop speaking in class', 'no', 'You don’t have to. It passes in a few months.'] ]),
  ] });

add({ id: 'anatomy10', zone: 'body', tiers: ['10-12'], title: 'Inside and outside: the parts of the reproductive body', hook: 'Real names, real positions, and what each part does.', mins: 6, tone: 'Direct',
  take: 'I know the proper names and jobs of reproductive body parts. Vulva and vagina are different.',
  guide: { teach: 'Accurate anatomy for both kinds of bodies, including the vulva/vagina distinction and intersex variation.', say: '“Here are the proper names. Anything you’re not sure about, ask.”', ask: 'Which part was new to you?', awk: 'Use a diagram together. It’s easier to point than to describe.' },
  talk: [['Ask the child', 'What was something you didn’t know before?'], ['Ask the grown-up', 'Look at the diagrams together and name three parts out loud.']],
  slides: [
    T('Every body has a reproductive system: parts that, later in life, can help make a baby. Bodies with a uterus and ovaries and bodies with testicles and a penis have different parts.', sc('cream', 'room', 'meera:smile:30:-:-:1.1 kabir:smile:62:-:-:1.1')),
    W('anatomy', 'Tap a part to see its name and job. Switch bodies with the tabs.', 'cream'),
    T('Often people say “vagina” for everything down there. The vulva is the outside part (it includes the labia and the clitoris). The vagina is the inside tube. The urethra, for wee, is a separate opening.', sc('peach', 'room', 'doc:smile:50:-:-:1.1')),
    T('Some people are born with parts that don’t fit neatly as “male” or “female”. This is called being intersex. It’s a natural variation.', sc('lilac', 'hills', 'doc:smile:36 riya:smile:66:-:-:1.1')),
    Q('Which is true?', sc('lilac', 'room', 'doc:smile:22:-:-:1.05'), [
      ['Wee and period blood come out of different openings', 'ok', 'Yes. The urethra and the vagina are separate.'],
      ['Wee and period blood come out of the same opening', 'no', 'No. They’re two different openings.'],
      ['The vagina and vulva are the same thing', 'no', 'Close, but no. The vulva is outside; the vagina is the inside tube.'] ]),
  ] });

add({ id: 'consent10', zone: 'consent', tiers: ['10-12'], title: 'Consent: more than “no”', hook: 'What a real yes looks like, and what to do with a no.', mins: 6, tone: 'Direct', branch: true,
  take: 'Consent is a free, clear yes that I can change any time. Silence is not a yes.',
  guide: { teach: 'Consent as freely given, clear and changeable, and respecting other people’s no.', say: '“A yes should be free. A no is a complete answer. And you can always change your mind.”', ask: 'How do you know when someone is really fine with something?', awk: 'Model it: ask before hugging or taking their things.' },
  talk: [['Ask the child', 'What’s a kind way to ask “is it okay if…?”'], ['Ask the grown-up', 'Tell about a time you said no, or heard no, and it was respected.']],
  slides: [
    T('Consent means saying yes to something, freely and clearly. Free means no pressure. Clear means a real yes, not a shrug. And you can change your mind at any time.', sc('lilac', 'room', 'meera:proud:50:-:-:1.1')),
    T('At a sleepover, Kabir keeps tickling Dev. Dev laughs, then says, “Stop!” Kabir says, “You’re laughing, so you like it.”', sc('cream', 'room', 'kabir:big:30:point:-:1.1 dev:worry:66:up:f:1.1'), { id: 'a' }),
    Q('What should Kabir do?', sc('cream', 'room', 'dev:worry:22:up:-:1.1 kabir:neutral:40:-:-:1.1'), [
      ['Stop right away, because “stop” means stop', 'ok', 'Yes. Even if someone is laughing, “stop” means stop. Right away.', 'stop'],
      ['Keep going a bit more, then stop', 'no', 'No. When someone says stop, you stop immediately.', 'bad'],
      ['Say, “You’re no fun”', 'no', 'That’s pressure. A no should always be respected.', 'bad'] ], { id: 'q' }),
    T('Kabir stops straight away. Dev says, “Thanks.” They both relax. Kabir learns that respecting a stop keeps friends feeling safe.', sc('lilac', 'room', 'kabir:smile:36:-:-:1.1 dev:smile:66:-:-:1.1'), { id: 'stop', next: 'rule' }),
    T('Dev feels uncomfortable and stops wanting to sleep over. Kabir is confused. If someone says stop and you keep going, it breaks trust.', sc('navy', 'room', 'dev:sad:36:-:-:1.1 kabir:worry:66:-:-:1.1'), { id: 'bad', next: 'rule' }),
    T('Silence, freezing or looking unsure is not a yes. If you’re not sure, ask. “Is this okay?” Someone who respects you will be glad you asked.', sc('lilac', 'hills', 'riya:smile:36:-:-:1.1 kabir:smile:64:-:-:1.1'), { id: 'rule', ask: 'Agree on a family “stop word” everyone respects instantly.' }),
  ] });

add({ id: 'friends10', zone: 'feelings', tiers: ['10-12'], title: 'Peer pressure: when “everyone’s doing it”', hook: 'How to say no and still keep your friends.', mins: 6, tone: 'Direct', branch: true,
  take: 'I can say no and stay myself. A good friend respects it.',
  guide: { teach: 'Resisting peer pressure with scripts, exit plans and role models.', say: '“You can always blame me: say your mum’s strict. I’ll never mind.”', ask: 'What would you say if a friend pushed you?', awk: 'Agree on a code text to be collected without questions.' },
  talk: [['Ask the child', 'What’s a line you could use? Let’s practise a few.'], ['Ask the grown-up', 'Share a time you went along with the crowd and wish you hadn’t.']],
  slides: [
    T('In the group video call, Zoya’s friends say, “Truth or dare! Dare: send a photo of yourself in just your underwear.”', sc('navy', 'night', 'zoya:worry:30:phone:-:1.1 riya:neutral:66:-:-:1.1', 'phone:48:46:1.4', 'Dare you!|58|22|ffcb05'), { id: 'a' }),
    Q('What should Zoya do?', sc('navy', 'night', 'zoya:worry:22:phone:-:1.1'), [
      ['Send it so they don’t think she’s boring', 'no', 'Never. A photo like that can be shared with the whole world.', 'send'],
      ['Say, “No way. I’m out.” and end the call', 'ok', 'Strong. You can leave any time.', 'out'],
      ['Joke, “My mum checks my phone!”', 'ok', 'A great way out. Blame someone if it helps.', 'joke'] ], { id: 'q' }),
    T('The photo gets screenshotted and passed around within a day. Zoya feels sick, and tells her mum, who stays calm and helps her report it and get it removed. It was not Zoya’s fault.', sc('navy', 'room', 'zoya:sad:34:-:-:1.1 mama:care:66:hug', ''), { id: 'send', next: 'rule' }),
    T('Zoya ends the call. Riya texts her later: “Same, honestly. I didn’t want to either.” Standing up makes it easier for others.', sc('lilac', 'room', 'zoya:proud:34:-:-:1.1 riya:smile:66:-:-:1.1'), { id: 'out', next: 'rule' }),
    T('Everyone laughs, and the dare changes to something silly. Zoya relaxes. A joke can reset the whole mood.', sc('lilac', 'room', 'zoya:big:34:-:-:1.1 riya:big:66:-:-:1.1'), { id: 'joke', next: 'rule' }),
    F('Did you know?', 'At the 2021 Tokyo Olympics, gymnast Simone Biles stepped out of the team final, saying she needed to protect her health. Millions were watching. Saying no, even under pressure, can be the strong choice.', 'Simone Biles', 'Gymnast · Olympic champion', 'star', 'purple', { id: 'rule' }),
  ] });

add({ id: 'crush10', zone: 'feelings', tiers: ['10-12'], title: 'Crushes, attraction and who you like', hook: 'What attraction is, and that people like different people.', mins: 6, tone: 'Direct',
  take: 'Attraction is normal. People are attracted to boys, girls, both or neither, and everyone deserves respect.',
  guide: { teach: 'Attraction, crushes, privacy and sexual orientation in neutral language.', say: '“Whoever you like, or don’t, you’re loved. And you never have to tell anyone before you’re ready.”', ask: 'What’s your friend group like when someone has a crush?', awk: 'If your child comes out, thank them. Don’t ask “are you sure?”.' },
  talk: [['Ask the child', 'What do you think makes someone a good boyfriend, girlfriend or partner later?'], ['Ask the grown-up', 'Tell them: “Whoever you like, I’ll love you.”']],
  slides: [
    T('Around puberty, hormones can make you feel attracted to people: butterflies, blushing, daydreaming. It can feel exciting and confusing.', sc('lilac', 'hills', 'meera:shy:36:-:-:1.1 kabir:smile:66:-:-:1.1', 'heart:48:28:.9:ff7664')),
    T('Some people are attracted to boys, some to girls, some to both, some to neither. Those are all normal. You can’t choose it, and it can take time to work out.', sc('lilac', 'hills', 'dev:smile:24:-:-:1.1 zoya:smile:48:-:-:1.1 riya:smile:72:-:-:1.1', 'heart:46:20:.7:ffcb05')),
    Q('A friend whispers that she thinks she likes both boys and girls. A good reply is…', sc('lilac', 'room', 'zoya:shy:20:-:-:1.1 meera:smile:40:-:-:1.1'), [
      ['“Thanks for telling me. I’m glad you did. I won’t tell anyone.”', 'ok', 'Yes. Kind, private and supportive.'],
      ['“You’re just confused”', 'no', 'That dismisses her feelings. Listen first.'],
      ['Tell everyone for her', 'no', 'That’s her story to tell, when she’s ready.'] ]),
    T('Crushes come and go. Be kind to yourself and to them. Never pressure or tease someone about who they like.', sc('cream', 'hills', 'riya:smile:36:-:-:1.1 dev:smile:62:-:-:1.1')),
  ] });

add({ id: 'online10', zone: 'online', tiers: ['10-12'], title: 'Photos, DMs and strangers', hook: 'Who’s really on the other end, and why private photos are never safe to share.', mins: 6, tone: 'Direct', branch: true,
  take: 'People online can pretend. I never share private photos, and I tell a grown-up if anyone asks.',
  guide: { teach: 'Stranger danger online, grooming warning signs, and why nude or private photos should never be taken or shared.', say: '“If anyone asks for a photo of your body, or says to keep a secret, tell me. You won’t be in trouble.”', ask: 'Has anyone you don’t know ever messaged you?', awk: 'Don’t punish them for telling you. Rewards telling.' },
  talk: [['Ask the child', 'What would you do if a stranger messaged you in a game?'], ['Ask the grown-up', 'Agree on a family rule for apps and games.']],
  slides: [
    T('In an online game, Kabir chats with “Aryan, 12”. Aryan is friendly, compliments him a lot, and then says, “Add me on another app. Let’s keep it between us.”', sc('navy', 'night', 'kabir:smile:30:phone:-:1.1 stranger:neutral:66:-:-:.7', 'phone:46:48:1.4', 'Keep it between us|52|20|ffcb05'), { id: 'a' }),
    T('Warning signs: lots of flattery, moving to a private app, asking you to keep secrets, and asking for photos. Anyone online can pretend to be younger or someone else.', sc('navy', 'night', 'kabir:worry:50:-:-:1.1')),
    Q('Aryan then says, “Send me a pic. No one will ever see it.” What does Kabir do?', sc('navy', 'night', 'kabir:worry:22:phone:-:1.1'), [
      ['Send one. He seems nice', 'no', 'Never. Photos can be saved and used against you.', 'send'],
      ['Stop replying, screenshot it, block, and tell a grown-up', 'ok', 'Exactly right.', 'tell'],
      ['Ignore him but say nothing to anyone', 'maybe', 'Better than sending, but telling a grown-up keeps you and others safe.', 'tell'] ], { id: 'q' }),
    T('Kabir sends it. Aryan asks for more, then threatens, “Send more or I’ll show everyone.” Kabir is scared. He tells his dad, who stays calm, believes him and helps him report it. Kabir did nothing wrong.', sc('navy', 'room', 'kabir:sad:34:-:-:1.1 papa:care:66:hug', ''), { id: 'send', next: 'rule' }),
    T('Kabir’s mum thanks him for telling her. They block the account and report it. She says, “You did the right thing, every step.”', sc('lilac', 'room', 'kabir:proud:34:-:-:1.1 mama:proud:66', ''), { id: 'tell', next: 'rule' }),
    T('Remember: a photo or video of your private body parts should never be taken or sent, by anyone. For anyone under 18, it can be illegal to make or share one, even of yourself. Tell a trusted adult or call Childline on 1098.', sc('lilac', 'hills', 'kabir:smile:36:-:-:1.1 mama:smile:68'), { id: 'rule', ask: 'Check privacy settings together, and who can message them.' }),
  ] });

add({ id: 'how10', zone: 'babies', tiers: ['10-12'], title: 'How are babies made? The full answer', hook: 'Sex, sperm, eggs, pregnancy and birth in plain, honest words.', mins: 8, tone: 'Direct',
  take: 'Sex is something for adults who both want to, and who are ready. It’s how sperm can meet an egg.',
  guide: { teach: 'How sexual intercourse leads to pregnancy, in factual, non-erotic terms, with consent and readiness framing.', say: '“Sex is when two adults who both want to are physically very close. It’s something for adults who are ready.”', ask: 'What’s something you’ve heard that you’d like to check?', awk: 'Keep eye contact, keep it short, and invite questions. It’s okay to say, “I’m a bit nervous too.”' },
  talk: [['Ask the child', 'What have you heard about how babies are made? Is anything unclear?'], ['Ask the grown-up', 'Say: “You can ask me anything about this, anytime.”']],
  slides: [
    T('A baby needs two tiny cells: an egg from an ovary and a sperm from a testicle. For them to meet, the sperm has to get inside the body that has the egg.', sc('cream', 'room', 'doc:smile:50:-:-:1.1', 'womb:12:24:.8')),
    T('Sex, or sexual intercourse, is when two adults who both want to are very close and the penis goes into the vagina. Sperm can come out of the penis, travel through the uterus and meet an egg. That’s how a pregnancy can begin.', sc('lilac', 'room', 'doc:smile:36:-:-:1.1 papa:smile:68'), { ask: 'Pause. Check they’re okay. It’s a lot to take in.' }),
    T('Sex is not just for babies. For adults it’s also about closeness and pleasure. It’s only okay when everyone is a willing adult who consents. It is never for children.', sc('navy', 'room', 'mama:smile:50:-:-:1.05')),
    T('If an egg and sperm join, the fertilised egg settles into the uterus and grows for about 40 weeks. Often one baby, sometimes twins. Some people become parents through adoption, or with help from doctors (like IVF).', sc('peach', 'blobs', 'mama:proud:36:hug:-:1.05 doc:smile:70', 'womb:52:22:.9')),
    Q('Which is true?', sc('peach', 'room', 'doc:smile:22:-:-:1.1'), [
      ['Pregnancy happens when sperm meets an egg', 'ok', 'Yes, that’s the basic mechanism.'],
      ['You can get pregnant from kissing or a toilet seat', 'no', 'No. Pregnancy needs sperm to enter the body to meet an egg.'],
      ['Only adults can ever have sex responsibly', 'maybe', 'Sex is for people who are old enough, ready and consenting. Plenty of people wait until they’re adults.'] ]),
  ] });

add({ id: 'porn10', zone: 'online', tiers: ['10-12'], title: 'Seeing things you didn’t ask to see', hook: 'What porn is, why it’s not real life, and what to do if you see it.', mins: 6, tone: 'Direct',
  take: 'Porn is made for adults, acts like a show, and isn’t how real relationships work. If I see it, it’s not my fault, and I can tell someone.',
  guide: { teach: 'A calm, non-shaming explanation of pornography, and what to do if exposed.', say: '“If you ever see something like that, you’re not in trouble. I’d like to know so I can help.”', ask: 'Has anything popped up that confused you?', awk: 'Be ready for “what is it?” Answer simply: “Videos of adults having sex, made for adults. Not for kids, and not real life.”' },
  talk: [['Ask the child', 'If something weird popped up, what would you do first?'], ['Ask the grown-up', 'Check filters and agree: “Tell me, and you won’t be in trouble.”']],
  slides: [
    T('Sometimes a pop-up, a link or a friend’s phone can show you pictures or videos of adults having sex. This is called pornography, or porn.', sc('navy', 'night', 'dev:wow:34:phone:-:1.1', 'phone:50:48:1.3')),
    T('Porn is made for adults. The people in it are actors performing, not showing real relationships. It often shows things that are unrealistic, and sometimes unkind or violent.', sc('navy', 'night', 'doc:neutral:50:-:-:1.1')),
    T('It can make people feel confused, curious, upset or a bit funny inside. All of those are normal. It is not your fault if you see it.', sc('lilac', 'room', 'dev:worry:40:-:-:1.1 mama:smile:68')),
    Q('You see something odd on a pop-up. What do you do?', sc('lilac', 'room', 'dev:worry:22:phone:-:1.1'), [
      ['Close it, put the phone down, and tell a grown-up I trust', 'ok', 'Yes. You’ll feel better, and they can help you block it.'],
      ['Keep watching to see what happens', 'maybe', 'Curiosity is normal. But it can leave you with confusing ideas. A grown-up can answer questions better.'],
      ['Share it with friends', 'no', 'Please don’t. It isn’t suitable for kids, and it may be illegal to share.'] ]),
    T('Real relationships are about respect, talking, and both people wanting to. If you ever have questions about what you saw, ask a trusted adult, or ask Awkie.', sc('lilac', 'hills', 'dev:smile:36:-:-:1.1 papa:smile:68')),
  ] });
})();
