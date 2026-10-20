/* Stories for Teens (13–15): sex and sexual health, consent, contraception, STIs, pregnancy, online sexual content, relationships, identity, mental health.
   Written to be frank, factual and respectful, in line with international sexuality-education guidance. Needs medical and legal review (esp. Indian law) before launch. */
(() => {
const { sc, T, Q, F, W, add } = window.CT;

add({ id: 'sex13', zone: 'babies', tiers: ['13+'], title: 'Sex: what it is, and how to know if you’re ready', hook: 'Plain facts about sex, readiness, pressure and the law.', mins: 8, tone: 'Frank',
  take: 'Sex should only happen when everyone wants it, is ready, and is protected. Waiting is a completely valid choice.',
  guide: { teach: 'What sex is, readiness, pressure, and the legal framework (POCSO), without shaming or encouraging.', say: '“There’s no rush, and no pressure. If you ever have questions or something goes wrong, you can come to me.”', ask: 'What do your friends say about sex that you want to check?', awk: 'Teens close up if they feel judged. Listen more than you talk.' },
  talk: [['Ask yourself', 'What are my own reasons for waiting, or not waiting? Are they mine?'], ['Ask the grown-up', 'Keep the door open: “You can ask me anything. I won’t freak out.”']],
  slides: [
    T('Sex means different things to different people. Commonly it includes vaginal, oral and anal sex, and other kinds of sexual touching. People have sex for closeness, pleasure and sometimes to have a baby.', sc('navy', 'room', 'didi:neutral:50:-:-:1.05')),
    T('There’s no “right” age or timeline. Many people wait until they’re older, and plenty of adults wait for marriage or for the right person. Not having sex is a normal choice.', sc('lilac', 'hills', 'dev:smile:30:-:-:1.05 riya:smile:62:-:-:1.05')),
    W('checklist', 'Readiness check. Tick the things that are true for you. There’s no score, just a way to think.', 'cream', { list: ['I want to, and nobody is pressuring me', 'I can say stop at any moment and be heard', 'We can talk openly about protection', 'I know how to prevent pregnancy and STIs', 'I’d be okay with the feelings that might follow', 'We’re both old enough, and the law allows it'] }),
    T('The law matters here. In India, the POCSO Act treats anyone under 18 as a child and says a child cannot legally consent to sexual activity. It is there to protect you. If someone has harmed you, you can ask for help without being blamed.', sc('navy', 'room', 'doc:neutral:50:-:-:1.05'), { ask: 'Be clear: teens who need help must never be afraid to ask.' }),
    Q('Your partner says, “If you really loved me, you would.” What is that?', sc('navy', 'room', 'riya:worry:22:-:-:1.05'), [
      ['Pressure. A partner who respects you accepts a no.', 'ok', 'Yes. Love doesn’t need proof like that.'],
      ['A sign I should say yes', 'no', 'No. Pressure like that is a red flag, not a reason.'],
      ['Normal in relationships', 'no', 'It’s common, but it’s still pressure. Healthy partners don’t say it.'] ]),
  ] });

add({ id: 'consent13', zone: 'consent', tiers: ['13+'], title: 'Consent in relationships and sexual situations', hook: 'Five words for a real yes, and what to do at a party.', mins: 8, tone: 'Frank', branch: true,
  take: 'Consent must be Freely given, Reversible, Informed, Enthusiastic and Specific. Drunk, asleep or scared can’t consent.',
  guide: { teach: 'Consent frameworks, impaired consent, bystander action, and where to get help.', say: '“You always have the right to stop, and so does everyone else. If something has happened, it isn’t your fault, and I’ll help you.”', ask: 'How would you step in if you saw a friend in trouble?', awk: 'Discuss it as a skill, like first aid. It lowers the heat.' },
  talk: [['Ask yourself', 'How do I check someone’s okay, in words, not guesses?'], ['Ask the grown-up', 'Agree: “If you’re ever in trouble, call me, and I’ll pick you up, no questions.”']],
  slides: [
    T('Consent is a clear, willing yes to something sexual. Five words describe it: Freely given. Reversible. Informed. Enthusiastic. Specific.', sc('navy', 'room', 'didi:smile:50:-:-:1.05')),
    T('Freely given: no pressure or threats. Reversible: you can change your mind at any time, even mid-way. Informed: you know what you’re saying yes to. Enthusiastic: a real “yes!”, not just “okay”. Specific: yes to one thing isn’t yes to everything.', sc('lilac', 'room', 'dev:smile:30:-:-:1.05 zoya:smile:62:-:-:1.05')),
    T('At a party, Dev sees his friend Kabir leading a girl up the stairs. She seems very drunk and can barely stand.', sc('navy', 'night', 'dev:worry:30:-:-:1.05 kabir:neutral:62:-:-:1.05', '', 'Come on…|56|24|ffcb05'), { id: 'a' }),
    Q('What does Dev do?', sc('navy', 'night', 'dev:worry:22:-:-:1.05'), [
      ['Step in: “Hey, she’s had too much. Let’s get her some water and call her friend.”', 'ok', 'Exactly. A calm interruption can change everything.', 'help'],
      ['Ignore it. It’s not his business', 'no', 'It is everyone’s business when someone can’t consent.', 'ignore'],
      ['Laugh and cheer him on', 'no', 'That makes things worse and could contribute to harm.', 'ignore'] ], { id: 'q' }),
    T('Dev and another friend find the girl’s friend, who takes her home safely. The girl thanks them the next day. A moment of courage prevented something awful.', sc('lilac', 'room', 'dev:proud:30:-:-:1.05 zoya:smile:62:-:-:1.05'), { id: 'help', next: 'rule' }),
    T('The girl wakes up scared and confused. She did not consent. It’s a crime. If you ever see this happening, stepping in, or getting help, is always better than watching.', sc('navy', 'room', 'zoya:sad:50:-:-:1.05'), { id: 'ignore', next: 'rule' }),
    T('Someone who is drunk, high, asleep, unconscious or scared cannot give consent. Silence is not a yes. Saying yes once is not a yes forever. And everyone has the right to say stop.', sc('navy', 'night', 'didi:neutral:50:-:-:1.05'), { id: 'rule' }),
    T('If something has happened to you, it is never your fault. In India you can call Childline 1098 (under 18), Women Helpline 181 or the police on 112, or tell a trusted adult or doctor. You deserve help and support.', sc('lilac', 'room', 'didi:care:36:-:-:1.05 doc:smile:68'), { ask: 'If your teen tells you, stay calm, believe them and thank them.' }),
  ] });

add({ id: 'contra13', zone: 'babies', tiers: ['13+'], title: 'Contraception 101', hook: 'Condoms, pills, injections, IUDs and emergency options, and what really works.', mins: 9, tone: 'Frank',
  take: 'Condoms protect from both pregnancy and most STIs. There are other methods for pregnancy, and an emergency pill if something goes wrong.',
  guide: { teach: 'Main contraception methods with effectiveness and STI protection, emergency contraception, and where to get advice.', say: '“If you ever need contraception, or something has gone wrong, you can come to me or see a doctor. No judgment.”', ask: 'Which of these methods did you already know about?', awk: 'Info about contraception does not cause earlier sex. It makes those who have sex safer.' },
  talk: [['Ask yourself', 'Do I know where to get condoms or advice, if I ever needed to?'], ['Ask the grown-up', 'Offer to take them to a doctor who’s friendly with teens.']],
  slides: [
    T('Contraception means ways to prevent pregnancy. Some also reduce the chance of infections. Knowing about them before you need them keeps you safe.', sc('navy', 'room', 'doc:smile:50:-:-:1.05', 'condom:18:56:1.4 pill:76:58:1.4')),
    W('contra', 'Tap a method to see how it works, how well it works, and whether it protects against infections.', 'cream'),
    T('Condoms are the only method that also reduces the risk of most infections, including HIV. Use a new one every time: check the expiry, open carefully, pinch the tip, roll it on the erect penis before any contact, and hold the base as you withdraw.', sc('sky', 'room', 'doc:smile:50:-:-:1.05', 'condom:20:60:1.7')),
    T('Emergency contraception: if a condom breaks or you had unprotected sex, an emergency pill can reduce the chance of pregnancy if you take it as soon as possible, within 3 days (72 hours). Chemists in India sell it. A doctor can also fit a copper IUD within 5 days.', sc('peach', 'room', 'riya:worry:36:-:-:1.05 doc:smile:68', 'pill:42:62:1.3 clock:76:38:.9')),
    T('Not reliable: “pulling out” (withdrawal) leads to pregnancy in about 20 of 100 people in a year. Peeing after, or standing up, or douching don’t prevent pregnancy.', sc('navy', 'room', 'didi:neutral:50:-:-:1.05')),
    Q('Which method also protects from most infections?', sc('navy', 'room', 'doc:smile:22:-:-:1.05'), [
      ['Condom', 'ok', 'Yes. It’s the only common method that protects from both pregnancy and most STIs.'],
      ['The contraceptive pill', 'no', 'It prevents pregnancy but not infections.'],
      ['Pulling out', 'no', 'It’s not reliable for pregnancy and doesn’t prevent infections.'] ]),
  ] });

add({ id: 'sti13', zone: 'babies', tiers: ['13+'], title: 'Staying healthy: STIs and HIV', hook: 'What they are, how they spread, testing, treatment and stigma.', mins: 7, tone: 'Frank',
  take: 'STIs are common, often have no symptoms, and many are treatable. Condoms, testing and vaccines protect you. Nobody should be shamed for having one.',
  guide: { teach: 'Basics of sexually transmitted infections and HIV, prevention, testing and de-stigmatisation.', say: '“Getting tested is responsible, not shameful. And HIV is treatable today.”', ask: 'What have you heard about STIs?', awk: 'Keep the tone medical, not moral.' },
  talk: [['Ask yourself', 'Do I know where I could get tested confidentially?'], ['Ask the grown-up', 'Share facts calmly. Fear spreads myths more than facts do.']],
  slides: [
    T('STIs (sexually transmitted infections) are infections passed on through sexual contact. Examples are chlamydia, gonorrhoea, herpes, HPV and HIV. They’re common, and anyone who has sex can get one.', sc('navy', 'room', 'doc:smile:50:-:-:1.05', 'cross:18:48:1.2')),
    T('Many STIs have no symptoms, so a person can pass one on without knowing. Signs to check with a doctor: unusual discharge, burning when you wee, sores, itching or lumps.', sc('sky', 'room', 'doc:smile:50:-:-:1.05')),
    T('Protect yourself: use condoms, get tested if you have sex, and get the HPV vaccine (ask a doctor). Most bacterial STIs can be cured with medicine.', sc('lilac', 'room', 'doc:proud:36:-:-:1.05 didi:smile:66:-:-:1.05', 'shield:78:38:1.2')),
    T('HIV weakens the immune system. Today, treatment (ART) is free at government centres in India. People on effective treatment can live long, healthy lives, and can’t pass HIV on. Free, confidential HIV testing is available at government ICTC centres.', sc('lilac', 'hills', 'doc:smile:36:-:-:1.05 zoya:smile:66:-:-:1.05')),
    T('You can’t catch HIV from hugging, sharing food or sitting together. India’s HIV law prohibits discrimination. Having an STI is a health matter, not a character flaw.', sc('navy', 'room', 'didi:smile:36:-:-:1.05 dev:smile:66:-:-:1.05')),
    Q('Which is true?', sc('navy', 'room', 'doc:smile:22:-:-:1.05'), [
      ['Many STIs have no symptoms, so testing is the only way to know', 'ok', 'Yes. That’s why testing is smart and responsible.'],
      ['You can always tell if someone has an STI by looking', 'no', 'No. People often look and feel completely fine.'],
      ['You can catch HIV from a hug', 'no', 'No. HIV isn’t spread by hugging, touch, or sharing food.'] ]),
  ] });

add({ id: 'preg13', zone: 'babies', tiers: ['13+'], title: 'Pregnancy: signs, tests and your options', hook: 'What to do if a period is late, and where to get real help.', mins: 7, tone: 'Frank',
  take: 'If a period is late after sex, take a test and talk to someone you trust. There are options and help, and you aren’t alone.',
  guide: { teach: 'Signs of pregnancy, testing, options and support, with care around legal context.', say: '“If this ever happens, I’ll be on your side. We’ll work it out together.”', ask: 'Who would you go to first if you were scared about this?', awk: 'The best protection is a teen who trusts you enough to tell you early.' },
  talk: [['Ask yourself', 'Who is the safest person I’d go to?'], ['Ask the grown-up', 'Say: “If it ever happens, I’ll listen first and help second.”']],
  slides: [
    T('A missed period, tender breasts, tiredness, feeling sick, or needing to wee more can be signs of pregnancy, but they can also be other things like stress.', sc('navy', 'room', 'riya:worry:50:-:-:1.05', 'calendar:70:40:1.4')),
    T('A pregnancy test (from a chemist) checks urine for a hormone. It’s accurate from the first day of a missed period. A doctor can confirm with another test and a scan.', sc('sky', 'room', 'riya:worry:36:-:-:1.05 doc:smile:68', 'test:76:48:1.2')),
    T('If you’re pregnant, there are options: continuing the pregnancy, adoption, or ending the pregnancy. In India abortion is legal under conditions set by the MTP Act. A doctor can explain what applies to you, and rules for under-18s have extra steps, so ask a trusted adult or doctor early.', sc('lilac', 'room', 'riya:care:36:-:-:1.05 doc:smile:68'), { ask: 'If your teen comes to you, stay calm and ask what they need.' }),
    T('Time matters, so speak up early. You don’t have to deal with it alone. A parent, doctor, school counsellor, helpline (Childline 1098 if you’re under 18) or a trusted friend can help.', sc('lilac', 'hills', 'riya:proud:36:-:-:1.05 mama:smile:68')),
    Q('Your period is 10 days late and you’ve had sex. What’s a good next step?', sc('lilac', 'room', 'riya:worry:22:-:-:1.05'), [
      ['Take a pregnancy test and talk to someone I trust', 'ok', 'Yes. Clear, calm steps help.'],
      ['Wait and see for a few months', 'no', 'Waiting limits your options. Test early.'],
      ['Try home remedies to bring on the period', 'no', 'Unsafe remedies can seriously harm you. See a doctor.'] ]),
  ] });

add({ id: 'sext13', zone: 'online', tiers: ['13+'], title: 'Nudes, sexting and sextortion', hook: 'The law, the risks, and exactly what to do if someone threatens you.', mins: 8, tone: 'Frank', branch: true,
  take: 'Never send a nude. If someone threatens you, don’t pay: screenshot, block, tell someone and report it. It is not your fault.',
  guide: { teach: 'Sexting, image-based abuse and sextortion, the legal position for under-18s in India and how to report.', say: '“If you’ve sent something or someone is threatening you, tell me. I’ll never be angry about that. I’ll help.”', ask: 'Do you know what sextortion is?', awk: 'Resist punishing. Teens who fear punishment hide it, which helps blackmailers.' },
  talk: [['Ask yourself', 'What would I do if someone threatened to share a photo?'], ['Ask the grown-up', 'Agree on a family rule: “No matter what, tell us. We’ll deal with it together.”']],
  slides: [
    T('Sexting is sending sexual messages, photos or videos. A “nude” is a photo of someone’s private body parts. Once you send an image you lose control of it. It can be saved, forwarded or posted.', sc('navy', 'night', 'didi:neutral:36:phone:-:1.05', 'phone:56:44:1.4')),
    T('The law: in India, making, sharing or even having sexual images of anyone under 18 is a crime (under POCSO and the IT Act), even if the person is you, and even if you both agreed. It’s meant to protect you.', sc('navy', 'night', 'doc:neutral:50:-:-:1.05')),
    T('Sextortion is when someone threatens to share an image unless you send more, send money, or do something. Often a stranger pretends to be a teen to get a photo first.', sc('navy', 'night', 'dev:worry:36:phone:-:1.05 stranger:neutral:70:-:-:.9', 'phone:50:46:1.3', 'Pay or I post it…|56|18|ffcb05'), { id: 'a' }),
    Q('Someone has a nude of Dev and says, “Pay ₹5,000 or I’ll send it to your whole class.” What does Dev do?', sc('navy', 'night', 'dev:worry:22:phone:-:1.05'), [
      ['Pay, to make it stop', 'no', 'Paying almost never stops it. They usually ask for more.', 'pay'],
      ['Don’t pay. Screenshot, block, tell a trusted adult and report it', 'ok', 'Exactly right.', 'report'],
      ['Hide it and hope it goes away', 'no', 'Hiding gives them power. Telling takes it away.', 'pay'] ], { id: 'q' }),
    T('Dev paid and they asked for more. In the end he told his sister, who helped him tell their parents. It hurt, but with help, it ended. He wishes he’d told them first.', sc('navy', 'room', 'dev:sad:30:-:-:1.05 didi:care:62:hug', ''), { id: 'pay', next: 'rule' }),
    T('Dev screenshots the messages, blocks the account, and tells his mum. They report it at cybercrime.gov.in and the helpline 1930. Dev’s school also helps. The images don’t spread, and he feels huge relief.', sc('lilac', 'room', 'dev:proud:30:-:-:1.05 mama:proud:64'), { id: 'report', next: 'rule' }),
    T('If an image has been shared: don’t blame yourself, report to the platform, use tools like Take It Down (takeitdown.ncmec.org) for images of under-18s, and tell a trusted adult. You can call Childline 1098 or report at cybercrime.gov.in.', sc('lilac', 'hills', 'didi:care:50:-:-:1.05'), { id: 'rule' }),
  ] });

add({ id: 'relate13', zone: 'feelings', tiers: ['13+'], title: 'Healthy vs unhealthy relationships', hook: 'Green flags, red flags, jealousy, control and breakups.', mins: 7, tone: 'Frank',
  take: 'In a healthy relationship I feel safe, respected and free. Control, pressure and fear are red flags.',
  guide: { teach: 'Characteristics of healthy and abusive relationships and how to handle break-ups.', say: '“A good relationship makes you feel safer and more yourself. If it doesn’t, you can leave.”', ask: 'What do you think a good relationship looks like?', awk: 'Don’t criticise their partner. Criticise the behaviour, calmly.' },
  talk: [['Ask yourself', 'Do I feel more myself, or less, around this person?'], ['Ask the grown-up', 'Share what you look for in a partner, and what you learned the hard way.']],
  slides: [
    T('Healthy relationships have respect, honesty, trust, kindness and room to be yourself. You can disagree and still feel safe. You can say no.', sc('lilac', 'hills', 'riya:smile:36:-:-:1.05 dev:smile:66:-:-:1.05', 'heart:48:22:.7:9ca32f')),
    T('Red flags: checking your phone, telling you who to see, jealousy that gets scary, putting you down, pressure about sex, and cutting you off from friends and family. These are controlling, and they’re never “just love”.', sc('navy', 'room', 'riya:worry:34:phone:-:1.05 dev:angry:66:point:-:1.05', '', 'Show me your phone|56|22|ffcb05')),
    Q('Your partner gets angry whenever you see your friends, and says it’s because he loves you. That’s…', sc('navy', 'room', 'riya:worry:22:-:-:1.05'), [
      ['A red flag: controlling behaviour', 'ok', 'Yes. Love respects your friends and your freedom.'],
      ['Romantic and proof of love', 'no', 'No. That’s controlling, not caring.'],
      ['Normal, I should see my friends less', 'no', 'No. A healthy partner wants you to have friends.'] ]),
    T('Break-ups hurt. It’s okay to cry, take space and lean on friends. If you’re scared of how someone might react, tell a trusted adult. Support exists if you ever feel unsafe.', sc('lilac', 'room', 'riya:sad:36:-:-:1.05 mama:care:66')),
  ] });

add({ id: 'identity13', zone: 'me', tiers: ['13+'], title: 'Gender, orientation and respect', hook: 'The words, the law in India, and how to be a good friend.', mins: 7, tone: 'Frank',
  take: 'People are different in who they’re attracted to and how they identify. Everyone deserves respect, and the law protects them.',
  guide: { teach: 'Sexual orientation and gender identity, the Indian legal context, and supporting friends and family.', say: '“Whoever you are and whoever you love, you belong here.”', ask: 'What would you say if a friend came out?', awk: 'If your teen comes out, say thank you first. Questions later.' },
  talk: [['Ask yourself', 'How would I want to be treated if I were figuring this out?'], ['Ask the grown-up', 'Say the words aloud: “gay, lesbian, bi, trans.” Normalise them.']],
  slides: [
    T('Sexual orientation is who you’re attracted to: people of a different gender (straight), the same gender (gay or lesbian), more than one gender (bisexual), or no one (asexual). Gender identity is who you know yourself to be: a boy, a girl, both or neither.', sc('lilac', 'hills', 'dev:smile:24:-:-:1.05 zoya:smile:50:-:-:1.05 riya:smile:76:-:-:1.05')),
    T('Some people’s gender identity matches the sex they were given at birth (cisgender). Some people’s doesn’t (transgender, non-binary). None of this is a disease or a phase. It’s a natural variety of human experience.', sc('lilac', 'hills', 'didi:smile:50:-:-:1.05')),
    F('Did you know?', 'In 2018 the Supreme Court of India ruled in Navtej Singh Johar v Union of India that consensual same-sex relationships between adults are not a crime. In 2014 the court also recognised transgender people’s rights.', 'Supreme Court of India', 'Landmark rulings, 2014 and 2018', 'shield', 'navy'),
    Q('A friend tells you he’s gay. The best reply is…', sc('navy', 'room', 'dev:shy:22:-:-:1.05'), [
      ['“Thanks for trusting me. I’m here for you.”', 'ok', 'Yes. That’s everything he needed to hear.'],
      ['“Are you sure? It’s just a phase.”', 'no', 'That dismisses him. Listen first.'],
      ['Tell your other friends, so they can support him too', 'no', 'It’s his story to tell. Keep it private unless he says otherwise.'] ]),
    T('If you’re figuring this out, you’re not alone. You can talk to a trusted adult, a counsellor, or call Tele MANAS (14416), a free national mental-health helpline.', sc('lilac', 'room', 'didi:care:40:-:-:1.05 doc:smile:68')),
  ] });

add({ id: 'porn13', zone: 'online', tiers: ['13+'], title: 'Porn vs real life', hook: 'What porn is, what it gets wrong, and how it can affect you.', mins: 7, tone: 'Frank',
  take: 'Porn is a performance made for adults. It’s not a guide to sex, bodies or relationships.',
  guide: { teach: 'Media literacy around pornography: unrealistic portrayals, consent, body image, and healthy habits.', say: '“Lots of teens are curious. Porn isn’t how real sex or relationships work. Ask me anything.”', ask: 'What have you seen or heard about porn that you’d like to check?', awk: 'Stay calm and factual. Shame makes things worse.' },
  talk: [['Ask yourself', 'How would I know if what I’m seeing is hurting my view of real people?'], ['Ask the grown-up', 'Share clear facts instead of rules only.']],
  slides: [
    T('Many teens come across porn, by accident or curiosity. Porn is videos and images of people having sex, made for adults. It’s legal only for adults to watch.', sc('navy', 'night', 'dev:neutral:36:phone:-:1.05', 'phone:56:46:1.4')),
    T('Porn is a performance, like an action film. Bodies, stamina and reactions are exaggerated or edited. It often skips talking, consent, protection and feelings, and sometimes shows aggression as normal.', sc('navy', 'night', 'doc:neutral:50:-:-:1.05')),
    T('Watching a lot can shape expectations: about bodies, about what partners “should” do and about pleasure. It can lead to pressure, anxiety or habits that are hard to break.', sc('lilac', 'room', 'dev:worry:36:-:-:1.05 didi:smile:66:-:-:1.05')),
    Q('Which is true about porn?', sc('lilac', 'room', 'dev:worry:22:-:-:1.05'), [
      ['It’s a performance and doesn’t show what real relationships are like', 'ok', 'Yes. Real intimacy is about people, not performance.'],
      ['It’s a good way to learn what sex is like', 'no', 'It’s a poor guide, because it leaves out consent, communication and feelings.'],
      ['Everyone has the same bodies and reactions as the actors', 'no', 'No. Real bodies are varied, and real reactions are too.'] ]),
    T('If you feel you can’t stop, or it’s worrying you, you can ask a doctor or counsellor for help without shame. And never share or make sexual images of anyone, especially anyone under 18.', sc('lilac', 'hills', 'dev:smile:36:-:-:1.05 doc:smile:68')),
  ] });

add({ id: 'mind13', zone: 'feelings', tiers: ['13+'], title: 'When feelings get too heavy', hook: 'Stress, low mood and how to ask for help.', mins: 6, tone: 'Frank',
  take: 'Struggling isn’t weakness. Talking to someone, and getting help, works.',
  guide: { teach: 'Teen mental health, normalising help-seeking, and where help is.', say: '“Whatever you’re feeling, you’re not a burden. I’m here, and we can find help together.”', ask: 'How have you really been lately?', awk: 'Listen first. Avoid “snap out of it”.' },
  talk: [['Ask yourself', 'Who would notice if I wasn’t okay? Would I tell them?'], ['Ask the grown-up', 'Ask “how are you really?” and wait through the silence.']],
  slides: [
    T('Puberty, exams, friends, relationships and social media can all pile up. Feeling sad, anxious or numb for a long time isn’t a sign that something is wrong with you. It’s a sign you need support.', sc('lilac', 'room', 'riya:sad:50:-:-:1.05', 'heart:72:34:.9:647c8d')),
    F('Did you know?', 'Actor Deepika Padukone spoke publicly about her depression in 2015, and started The Live Love Laugh Foundation to help people talk about mental health. Naomi Osaka and Simone Biles also stepped back from big events to look after themselves.', 'Deepika Padukone', 'Actor · mental-health advocate', 'heart', 'purple'),
    Q('A friend has been very quiet and says she feels like “nothing matters”. What helps?', sc('lilac', 'room', 'zoya:sad:22:-:-:1.05'), [
      ['Listen, stay with her, and encourage her to tell an adult', 'ok', 'Yes. Presence and a trusted adult are the key.'],
      ['Tell her to cheer up', 'no', 'It usually makes people feel more alone.'],
      ['Promise never to tell anyone, even if she’s in danger', 'maybe', 'Don’t promise that. If she’s in danger, tell a trusted adult. It saves lives.'] ]),
    T('Help is available: talk to a parent, teacher, counsellor or doctor. Tele MANAS (14416) is free, 24 hours, in many languages. If you’re in immediate danger, call 112.', sc('lilac', 'hills', 'riya:smile:36:-:-:1.05 mama:smile:66'), { ask: 'Save 14416 on a family phone together.' }),
  ] });
})();
