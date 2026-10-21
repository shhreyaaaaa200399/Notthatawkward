/* Not That Awk — the story library.
   Every story is anchored in something that really happened (a real person, place or law), told in three reading levels:
   y = 4-6, m = 7-9, o = 10-12.  `t` is the slide caption per level; a slide with `only` appears just at those levels.
   Facts were researched from public sources; items marked “verify” in the README must be checked by a subject expert before launch.
   Slide scenes are drawn in js/scenes*.js; scenes marked tone:true change with the family's “Awk level”. */
(() => {
  const D = window.DATA;
  const talk = (c, g) => [['Ask the child', c], ['Ask the grown-up', g]];
  const CH = { y: 'cream', m: 'sky', o: 'navy' };

  D.STORIES = [
    /* ---------------------------------------------------------------- IDENTITY */
    { id: 'pink', zone: 'identity', tiers: 'ym', minAge: 4, mins: 4, tone: 'Gentle', real: 'Jaipur, 1876 · baby shops, 1918', thumb: 'pink1',
      title: 'Is pink only for girls?', desc: 'Jaipur was painted pink to say “welcome”, and shops once told parents pink was for boys. Colours belong to everyone.',
      slides: [
        { scene: 'pink1', t: { y: 'Long ago in Jaipur, a king wanted to say “Welcome!” to an important guest.', m: 'In 1876 the ruler of Jaipur, Maharaja Ram Singh II, wanted to welcome a royal guest from Britain, the Prince of Wales.' } },
        { scene: 'pink2', t: { y: 'So the city walls were painted pink, a colour that says “you are welcome here”.', m: 'The old city was painted pink, a colour said to stand for hospitality. People still call Jaipur the Pink City.' } },
        { scene: 'pink3', t: { y: 'Far away, shops once said pink was for baby boys and blue for baby girls!', m: 'Around 1918 a baby-clothes magazine in the US told shops: pink for boys, blue for girls, because pink seemed strong.' } },
        { scene: 'pink4', t: { y: 'Later the rule flipped. Colours never had a gender. They are for everybody!', m: 'Shops later swapped the rule. It kept changing, because colours don’t belong to anyone.' } },
        { w: 'choice', q: 'A friend says, “Pink is only for girls.” You say…', opts: [
          ['“Yes, you’re right.”', 'no', 'Not quite. The rule has changed many times. People of every gender can love any colour.'],
          ['“Not really! Jaipur is pink, and shops once said pink was for boys.”', 'ok', 'Yes! Colours are for everyone, and you used a real fact.'],
          ['Say nothing and feel sad', 'no', 'You can speak up kindly. Colours are for everybody.'] ] },
      ],
      talk: talk('What is your favourite colour? Does a colour have to belong to anyone?', 'Was there a colour or toy you were once told was “not for you”?') },

    { id: 'marykom', zone: 'identity', tiers: 'ym', minAge: 4, mins: 4, tone: 'Gentle', real: 'Mary Kom, boxer from Manipur', thumb: 'mk4',
      title: 'Who says what I’m allowed to play?', desc: 'Mary Kom grew up in a Manipur village and became a world boxing champion, even when people said boxing was for boys.',
      slides: [
        { scene: 'mk1', t: { y: 'Mary grew up in a village in Manipur. Her family worked hard in the fields, and she helped.', m: 'Mary Kom grew up in a village in Manipur. Her parents farmed hill fields, and she helped from a young age.' } },
        { scene: 'mk2', t: { y: 'She loved boxing and started to train, even though most boxers were boys.', m: 'Inspired by a Manipuri boxer’s gold at the 1998 Asian Games, she started training, often alongside boys.' } },
        { scene: 'mk3', t: { y: 'Some people said, “Boxing is for boys!” But Mary kept on training.', m: 'Some people said boxing was a man’s sport, and her father worried at first. Mary kept training, and he came round.' } },
        { scene: 'mk4', t: { y: 'She became a champion and won a medal for India!', m: 'Mary became a six-time World Champion and won an Olympic bronze medal in 2012.' } },
        { w: 'choice', q: 'A classmate says, “Girls can’t play cricket.” You say…', opts: [
          ['“Mary Kom boxed her way to the Olympics. Anyone can play!”', 'ok', 'Yes! You can use real stories to answer unfair rules.'],
          ['“Maybe you’re right.”', 'no', 'Not quite. Nobody gets to decide that for you.'],
          ['Laugh along', 'no', 'You can say kindly, “Anyone can play.”'] ] },
      ],
      talk: talk('What game would you love to try? Has anyone said it isn’t for you?', 'Which sports or hobbies did we steer sons and daughters toward or away from, and why?') },

    { id: 'nalsa', zone: 'identity', tiers: 'o', minAge: 10, mins: 5, tone: 'Curious', real: 'Supreme Court of India, 15 April 2014', thumb: 'nal3',
      title: 'Everyone gets to say who they are', desc: 'In 2014 India’s Supreme Court recognised transgender people’s right to say who they are.',
      slides: [
        { scene: 'nal1', t: { o: 'India is home to all kinds of people. Some are transgender: they feel they are not the gender they were given at birth. They are just people.' } },
        { scene: 'nal2', t: { o: 'Laxmi Narayan Tripathi, a transgender rights activist, spoke up about how unfairly many people were treated.' } },
        { scene: 'nal3', t: { o: 'On 15 April 2014 the Supreme Court said everyone has the right to say who they are, and recognised a “third gender”.' } },
        { scene: 'nal4', t: { o: 'In 2015 Manabi Bandopadhyay became a college principal in West Bengal, widely reported as India’s first transgender college principal.' } },
      ],
      facts: { items: ['The case is NALSA v Union of India (2014).', 'The Court said people can self-identify their gender as part of their dignity and equality.', 'It was a milestone, not the end of unfair treatment. Many people still face it today.'], quote: 'Respect means seeing each person as they are.' },
      talk: talk('Why is it important that everyone is treated with respect, even when they look or feel different from us?', 'What words about transgender people did we grow up hearing? What would we like our children to hear instead?') },

    /* ---------------------------------------------------------------- EMOTIONS */
    { id: 'tears', zone: 'emotions', tiers: 'ym', minAge: 4, mins: 4, tone: 'Gentle', real: 'Sachin Tendulkar, 2013 · Rohit and Virat, 2024', thumb: 'tears2',
      title: 'Do big players cry?', desc: 'Sachin Tendulkar, Rohit Sharma and Virat Kohli all cried in front of the whole world. Tears are for everyone.',
      slides: [
        { scene: 'tears1', t: { y: 'Sachin Tendulkar played cricket for 24 years. On his last day, the whole stadium cheered.', m: 'In November 2013 Sachin Tendulkar played his 200th and last Test, at Wankhede in Mumbai. The crowd roared.' } },
        { scene: 'tears2', t: { y: 'At the microphone he said, “It’s difficult to talk, but I will manage.” He was crying.', m: 'His farewell speech began, “It’s difficult to talk but I will manage.” He cried that day in front of everyone.' } },
        { scene: 'tears3', t: { y: 'Years later, India won the World Cup. Rohit Sharma cried happy tears.', m: 'In June 2024 India won the T20 World Cup in Barbados. Rohit Sharma was seen crying on the ground.' } },
        { scene: 'tears4', t: { y: 'Virat hugged him. Tears can come when we are happy, proud or sad.', m: 'Virat Kohli and Rohit were both emotional. Tears can come from joy, pride or sadness, all at once.' } },
        { w: 'choice', q: 'Your cousin says, “Boys don’t cry!” You say…', opts: [
          ['“Sachin cried at his farewell. Everyone cries.”', 'ok', 'Yes! Crying is how bodies let big feelings out.'],
          ['“Okay, I won’t.”', 'no', 'Not quite. Holding it in can make feelings bigger. It’s fine to cry.'],
          ['“That’s a silly rule.”', 'ok', 'True! You can say it kindly, too.'] ] },
      ],
      talk: talk('Have you ever cried when you were happy? What was happening?', 'When did you last cry in front of someone? What did it teach you about showing feelings?') },

    { id: 'biles', zone: 'emotions', tiers: 'mo', minAge: 7, mins: 4, tone: 'Curious', real: 'Simone Biles, Tokyo 2020 Olympics', thumb: 'bil2',
      title: 'When it’s okay to stop', desc: 'Simone Biles stopped at the Olympics to protect herself. Listening to your body and mind takes courage.',
      slides: [
        { scene: 'bil1', t: { m: 'Simone Biles is one of the greatest gymnasts ever. At the Tokyo Olympics in 2021, her body and mind stopped agreeing in the air.' } },
        { scene: 'bil2', t: { m: 'She knew it wasn’t safe to keep going, so she stopped and said she had to focus on her mental health.' } },
        { scene: 'bil3', t: { m: 'She stayed with her team and cheered them on as they won silver. Stopping did not make her a bad teammate.' } },
        { scene: 'bil4', t: { m: 'Days later she tried the balance beam, kept it simple, and won a bronze medal. She did it her own way.' } },
      ],
      facts: { items: ['Gymnasts call it “the twisties” when they lose track of where they are in the air. It can be dangerous.', 'She withdrew from the team final on 27 July 2021, and won beam bronze on 3 August.', 'Looking after your mind is part of looking after your body.'], quote: 'It is brave to say, “I need a break.”' },
      talk: talk('What can you do when something feels too scary or wobbly? Who can you tell?', 'When did you push on when you should have paused? How can we make “I need a break” okay at home?') },

    { id: 'zidane', zone: 'emotions', tiers: 'mo', minAge: 7, mins: 4, tone: 'Curious', real: 'Zinedine Zidane, World Cup final 2006', thumb: 'zid2',
      title: 'When anger gets too big', desc: 'Even a football legend lost his temper on the biggest stage. What he did next is the lesson.',
      slides: [
        { scene: 'zid1', t: { m: 'Zinedine Zidane was a famous footballer. In the 2006 World Cup final, another player said hurtful things about his family.' } },
        { scene: 'zid2', t: { m: 'His anger got very big. He hit the player with his head, and the referee showed him a red card.' } },
        { scene: 'zid3', t: { m: 'A few days later Zidane went on TV and said sorry to the millions of children who had watched.' } },
        { scene: 'zid4', t: { m: 'Big feelings are okay. What we do with them matters. Saying sorry is brave, even for a hero.' } },
      ],
      facts: { items: ['The final was on 9 July 2006 in Berlin. It was the last match of Zidane’s career.', 'Hurtful words never make hitting okay.', 'He apologised to children for the example he set.'], quote: '“I want to ask for forgiveness from all the children who watched.” (Zidane, TV interview, July 2006; translated)' },
      talk: talk('What can you do when you feel very angry? What could Zidane have done instead?', 'When did you last say sorry to your child? What does it show them?') },

    { id: 'stammer', zone: 'emotions', tiers: 'mo', minAge: 7, mins: 4, tone: 'Curious', real: 'Ed Sheeran, singer', thumb: 'sch4',
      title: 'When words get stuck', desc: 'Ed Sheeran had a stammer as a child. Everyone’s voice finds its own way.',
      slides: [
        { scene: 'sch1', t: { m: 'When Ed Sheeran was a child, his words sometimes got stuck. That is called a stammer, and many people have one.' } },
        { scene: 'sch2', t: { m: 'A stammer can feel embarrassing, especially when others don’t understand. Being patient helps.' } },
        { scene: 'sch3', t: { m: 'Ed says rapping along to an album he loved, again and again, helped his words flow.' } },
        { scene: 'sch4', t: { m: 'He grew up to sing on huge stages. Everyone’s voice finds its own way.' } },
      ],
      facts: { items: ['Ed Sheeran has spoken publicly about having a stutter as a child.', 'Different people find different ways to speak. Speech therapy helps many.', 'Nothing is “wrong” with someone who stammers.'], quote: 'He says that rapping an album over and over “cured” his stutter. (His own words)' },
      talk: talk('What would you say to a friend whose words got stuck? How can we be patient listeners?', 'Did anyone get teased about how they spoke when you were small? What would you do differently now?') },

    /* ---------------------------------------------------------------- FRIENDSHIP */
    { id: 'kambli', zone: 'friendship', tiers: 'mo', minAge: 7, mins: 4, tone: 'Curious', real: 'Sachin Tendulkar and Vinod Kambli', thumb: 'kam2',
      title: 'When friends drift apart', desc: 'Two school friends made a world record together, drifted apart, and met again. Friendships change, and that’s okay.',
      slides: [
        { scene: 'kam1', t: { m: 'Sachin Tendulkar and Vinod Kambli were school friends in Mumbai.' } },
        { scene: 'kam2', t: { m: 'In 1988 they batted together for days at a school match and scored 664 runs, a world record that stood for 18 years.' } },
        { scene: 'kam3', t: { m: 'They grew up, and their lives went different ways. They had a disagreement and stopped talking for a while.' } },
        { scene: 'kam4', t: { m: 'In December 2024 they met again at a memorial for their coach, Ramakant Achrekar. Old friendships can warm up again.' } },
      ],
      facts: { items: ['The 664-run partnership happened in a Harris Shield school match in Mumbai in February 1988.', 'Friendships can pause and start again.', 'It’s fine to miss an old friend and say hello first.'], quote: 'Who is a friend you miss? What could you say to them?' },
      talk: talk('Do you have a friend you don’t play with as much now? How do you feel about it?', 'Which old friend do you miss? What stops you from calling?') },

    { id: 'greta', zone: 'friendship', tiers: 'mo', minAge: 7, mins: 4, tone: 'Curious', real: 'Greta Thunberg, Stockholm, 2018', thumb: 'gre2',
      title: 'What if nobody else agrees?', desc: 'Greta Thunberg sat alone outside parliament for something she cared about. Soon others joined.',
      slides: [
        { scene: 'gre1', t: { m: 'Greta Thunberg was a schoolgirl in Sweden who worried about the Earth getting too hot. She made a sign.' } },
        { scene: 'gre2', t: { m: 'On 20 August 2018, aged 15, she sat outside Sweden’s parliament instead of going to school. At first she was alone.' } },
        { scene: 'gre3', t: { m: 'Some people stopped to talk, and others came to sit with her over the following days.' } },
        { scene: 'gre4', t: { m: 'Soon children in many countries joined “Fridays for Future” strikes. One person can start a wave.' } },
      ],
      facts: { items: ['Her sign said “Skolstrejk för klimatet”, Swedish for “school strike for climate”.', 'People hold strong and different views about this topic. The lesson here is standing up, calmly, for what you care about.', 'Missing school is a decision for families and schools.'], quote: 'What would you do if nobody agreed with you?' },
      talk: talk('What if no one agreed with you? Would you still say what you think?', 'When did you last stand apart from the group? What helped, or stopped you?') },

    { id: 'curie', zone: 'friendship', tiers: 'o', minAge: 10, mins: 4, tone: 'Curious', real: 'Marie and Pierre Curie, Paris', thumb: 'cur4',
      title: 'Working side by side, with respect', desc: 'Marie and Pierre Curie shared a love of science and a Nobel Prize. Respect means making room for each other.',
      slides: [
        { scene: 'cur1', t: { o: 'In 1894 in Paris, Marie Sklodowska met a scientist named Pierre Curie. They both loved science. They married in 1895.' } },
        { scene: 'cur2', t: { o: 'They worked side by side in a cold lab and found two new elements, polonium and radium.' } },
        { scene: 'cur3', t: { o: 'When prizes were being chosen, Marie’s name was left off the list at first. Pierre wrote that her work should count too.' } },
        { scene: 'cur4', t: { o: 'In 1903 they shared the Nobel Prize in Physics with Henri Becquerel. Respect means making room for each other.' } },
      ],
      facts: { items: ['Marie went on to win a second Nobel Prize, in Chemistry, in 1911.', 'Healthy partnerships share credit and respect each other’s work.', 'Her work earned the prize. The story is about respect, not rescue.'], quote: 'How do we make sure everyone in our family gets credit for what they do?' },
      talk: talk('What do you love doing that you would like to do with a friend?', 'How do we make sure each person in our family gets credit and respect for their work?') },

    /* ---------------------------------------------------------------- BODY */
    { id: 'arunima', zone: 'body', tiers: 'ym', minAge: 4, mins: 4, tone: 'Gentle', real: 'Arunima Sinha, Mount Everest, 2013', thumb: 'aru4',
      title: 'Every body is different, every body is strong', desc: 'Arunima Sinha climbed Mount Everest with a prosthetic leg. All bodies are different and strong.',
      slides: [
        { scene: 'aru1', t: { y: 'Arunima loved volleyball. She played for her state.', m: 'Arunima Sinha was a national-level volleyball player from Uttar Pradesh.' } },
        { scene: 'aru2', t: { y: 'One day an accident changed her body, and she rested in hospital.', m: 'In 2011 an accident on a train changed her body. She lost a leg and spent a long time in hospital.' } },
        { scene: 'aru3', t: { y: 'She did not give up. She asked a famous climber to teach her.', m: 'She asked Bachendri Pal, India’s first woman to climb Everest, to train her, and she practised with a prosthetic leg.' } },
        { scene: 'aru4', t: { y: 'Step by step, she reached the top of Mount Everest!', m: 'On 21 May 2013 she stood on top of Mount Everest, the first woman with an amputated leg to do it.' } },
      ],
      talk: talk('What is something your body does really well? What helps when something feels hard?', 'Every body works differently. How can we notice what bodies CAN do, and be kind to bodies that look different?') },

    { id: 'messi', zone: 'body', tiers: 'mo', minAge: 7, mins: 5, tone: 'Curious', real: 'Lionel Messi, Rosario to Barcelona', thumb: 'mes5',
      title: 'Bodies grow at their own speed', desc: 'Lionel Messi was small as a child and needed medicine to grow. Bodies change at different times, and that is normal.',
      slides: [
        { scene: 'mes1', t: { m: 'Lionel Messi loved football from the time he was little, even though he was smaller than other kids.' } },
        { scene: 'mes2', t: { m: 'Around age 10 doctors found his body made less growth hormone. He needed medicine to grow.' } },
        { scene: 'mes3', t: { m: 'A club in Spain, Barcelona, promised to help. The first promise was written on a napkin in December 2000.' } },
        { scene: 'mes4', t: { m: 'At 13 he moved to Spain to keep playing football.' } },
        { scene: 'mes5', tone: true, t: { m: 'Bodies change at different times. Puberty can start between about 8 and 13 for girls and 9 and 14 for boys. Earlier or later is normal too.', o: 'This is called puberty. It starts at different ages, and earlier or later are both normal. If you are worried, a doctor can check.' } },
      ],
      facts: { items: ['Most short children are healthy. Messi’s treatment was for a specific condition.', 'Comparing bodies with friends doesn’t help. Everyone has their own clock.', 'Talk to a doctor if puberty hasn’t started by about 14, or started very early.'], quote: '“I had nothing else to write on, so I used a napkin.” (Carles Rexach, as reported)' },
      talk: talk('Have you ever felt smaller or bigger than others your age? What helped?', 'Do I compare my child’s growth with others? How can I reassure them that bodies grow at their own speed?') },

    { id: 'babies', zone: 'body', tiers: 'ymo', minAge: 4, mins: 5, tone: 'Curious', real: 'Louise Brown, 1978 · Durga and Harsha, India', thumb: 'bab3',
      title: 'How does a baby begin?', desc: 'A simple, honest answer about how a baby begins, and the real doctors who helped families have babies.',
      slides: [
        { scene: 'bab1', tone: true, t: { y: 'Every baby grows inside a special place in a mummy’s tummy. It is called the uterus.', m: 'A baby grows inside a special place in a woman’s body called the uterus.', o: 'A baby grows inside the uterus, a muscular organ in a woman’s body, for about nine months.' } },
        { scene: 'bab2', only: 'mo', t: { m: 'Long ago, some families wanted a baby but needed a doctor’s help. Robert Edwards, Patrick Steptoe and scientist Jean Purdy worked for years.', o: 'In the 1970s doctor Patrick Steptoe, scientist Robert Edwards and embryologist Jean Purdy worked for years on IVF, helping an egg and sperm meet in a lab.' } },
        { scene: 'bab3', only: 'mo', t: { m: 'On 25 July 1978, Louise Brown was born in England, the first baby born through IVF.', o: 'On 25 July 1978 in Oldham, England, Louise Brown became the first baby born through IVF.' } },
        { scene: 'bab4', only: 'mo', t: { m: 'In India, a baby named Durga was born in Kolkata in 1978 and Harsha in Mumbai in 1986, also with doctors’ help.', o: 'In India, Durga was born in Kolkata in 1978, and Harsha in Mumbai in 1986. Doctors in both cities helped families grow.' } },
        { scene: 'bab5', tone: true, t: { y: 'A baby starts as a tiny seed-like cell that grows and grows.', m: 'A baby begins when a tiny egg from a woman’s body and a tiny sperm from a man’s body join. It grows in the uterus for about nine months.', o: 'A baby begins when an egg cell and a sperm cell join (fertilisation). The cell divides, settles in the uterus and grows for about nine months.' } },
      ],
      facts: { items: ['IVF means doctors help the egg and sperm meet in a lab dish, then place the embryo in the uterus.', 'Families begin in many ways: birth, adoption, IVF and more. All are real families.', 'Jean Purdy helped in the work and was left off the first plaque. She is now remembered.'], quote: 'Any question about bodies and babies is a good question.' },
      talk: talk('Where do you think a baby grows before it is born?', 'Families begin in different ways. How can we explain that with love?') },


    { id: 'names', zone: 'body', tiers: 'ymo', minAge: 4, mins: 4, tone: 'Gentle', real: 'The words doctors and teachers use', thumb: 'names2',
      title: 'Real names for body parts', desc: 'Every body part has a real name, and so do the private ones. Using real words helps us stay healthy and safe.',
      slides: [
        { scene: 'names1', t: { y: 'Every part of your body has a real name: head, elbow, knee, tummy…', m: 'Every part of your body has a real name. Using real names helps you stay healthy and safe.' } },
        { scene: 'names2', t: { y: 'Some parts are private, the ones under your underwear. They have real names too.', m: 'The parts covered by your underwear are private. Their names are body words, not rude words.', o: 'Private parts have real names. Everyone’s body is different, and all of them are normal.' } },
        { scene: 'names3', tone: true, only: 'mo', t: { m: 'Doctors and teachers use pictures like this to show what these parts look like and where they are.', o: 'Diagrams like this show the reproductive system: the parts of the body that can help make a baby when you are grown up.' } },
        { scene: 'names4', t: { y: 'Private parts are private. Only you, and a doctor with a grown-up there, may check them when you need help.', m: 'Only you, and a doctor with a grown-up there, may check private parts when you need help. Anyone else asking: say no and tell a trusted adult.' } },
      ],
      facts: { items: ['UNESCO’s sex-education guidance says children should learn the correct names of body parts from an early age.', 'Real names make it easier to tell a doctor or a grown-up exactly what you mean.', 'Diagrams only appear when a grown-up has chosen the “Not That Awk” level.'], quote: 'Body words are just words.' },
      talk: talk('Can you say the real name of three body parts out loud?', 'Say the proper words calmly. Children copy your tone.') },

    { id: 'padman', zone: 'body', tiers: 'o', minAge: 10, mins: 5, tone: 'Deep', real: 'Arunachalam Muruganantham, Coimbatore', thumb: 'pad4',
      title: 'The man who talked about periods', desc: 'Arunachalam Muruganantham made low-cost pads so women could stay healthy, even when people laughed.',
      slides: [
        { scene: 'pad1', t: { o: 'Arunachalam Muruganantham from Coimbatore saw his wife using old cloth during her period because pads cost too much.' } },
        { scene: 'pad2', t: { o: 'He spent years building a low-cost pad-making machine, testing and trying again and again.' } },
        { scene: 'pad3', t: { o: 'People whispered and laughed. Periods were hardly talked about. He kept going.' } },
        { scene: 'pad4', t: { o: 'At last his machines worked. Women in villages could make and sell clean, low-cost pads themselves.' } },
        { scene: 'pad5', tone: true, t: { o: 'A period is when the lining of the uterus leaves the body as a little blood for a few days, about once a month. It is healthy and normal.' } },
      ],
      facts: { items: ['He received the Padma Shri in 2016.', 'His TED talk (TED@Bangalore, 2012) is called “How I started a sanitary napkin revolution!”.', 'The film Pad Man (2018) was inspired by his story. Women’s groups made and sold the pads.'], quote: 'Periods are nothing to be ashamed of, and everyone should learn about them.' },
      talk: talk('Why do you think some people feel shy to talk about periods? Can everyone learn about them?', 'What did I learn, or not learn, about periods growing up? What do I want my child to hear differently?') },

    /* ---------------------------------------------------------------- BOUNDARIES AND SAFETY */
    { id: 'pants', zone: 'boundaries', tiers: 'ym', minAge: 4, mins: 5, tone: 'Gentle', real: 'The PANTS rule (NSPCC) · POCSO Act, India', thumb: 'pan1',
      title: 'My body, my rules: the PANTS rule', desc: 'Five simple rules that help children stay safe, from the UK charity NSPCC, with India’s own law that protects children.',
      slides: [
        { scene: 'pan1', t: { y: 'Meet our dino! He knows five rules that keep kids safe. They spell PANTS.', m: 'The PANTS rule comes from a UK charity, NSPCC. India also has a law, POCSO 2012, that protects children.' } },
        { scene: 'pan2', tone: true, t: { y: 'P: Privates are private. The parts under your underwear are just yours.', m: 'P: Privates are private. The parts covered by your underwear belong only to you.' } },
        { scene: 'panA', t: { y: 'A: Always remember your body belongs to you.', m: 'A: Always remember your body belongs to you. Nobody can make you feel uncomfortable.' } },
        { scene: 'pan3', t: { y: 'N: No means no. You can say no to a touch you don’t like.', m: 'N: No means no. You can say no to any touch you don’t like, even from someone you know.' } },
        { scene: 'pan4', t: { y: 'T: Talk about secrets that upset you. Surprises are fun, but upsetting secrets must be told.', m: 'T: Talk about secrets that upset you. Safe secrets, like surprise gifts, are fun. Upsetting secrets must be told.' } },
        { scene: 'pan5', t: { y: 'S: Speak up, someone can help. Tell a grown-up you trust, and keep telling.', m: 'S: Speak up, someone can help. Tell a trusted grown-up and keep telling. You can also call 1098.' } },
      ],
      talk: talk('Who are three grown-ups you could tell if something felt wrong or yucky?', 'Do I stay calm when my child says “no” to a hug or tickle? How can I show that their body is theirs?') },

    { id: 'rosa', zone: 'boundaries', tiers: 'ymo', minAge: 4, mins: 4, tone: 'Gentle', real: 'Rosa Parks, Montgomery, 1955', thumb: 'ros2',
      title: '“No” is a whole sentence', desc: 'Rosa Parks said a calm, firm no on a bus in 1955, and thousands stood with her.',
      slides: [
        { scene: 'ros1', t: { y: 'Rosa Parks rode the bus home after a long day at work.', m: 'On 1 December 1955, Rosa Parks, a seamstress, rode a city bus in Montgomery, Alabama.' } },
        { scene: 'ros2', t: { y: 'The driver told Rosa to give up her seat. Rosa said, “No.”', m: 'Unfair rules said Black passengers had to give up seats to white passengers. The driver told Rosa to move. She said no.' } },
        { scene: 'ros3', t: { y: 'She was calm and kind, but she did not change her mind.', m: 'She was arrested for saying no. She stayed calm, and she knew her no was fair.' } },
        { scene: 'ros4', t: { y: 'Thousands of people stopped riding the buses to stand with her. After 381 days the unfair rule ended.', m: 'Thousands of people stopped riding the buses to stand with her. After 381 days the unfair rule ended.' } },
        { w: 'choice', q: 'A grown-up asks for a kiss, but you don’t want to. You can…', opts: [
          ['Give a kiss anyway', 'no', 'You never have to. Your body, your rules.'],
          ['Offer a wave or high five', 'ok', 'Perfect. Kind and clear.'],
          ['Say “no thanks” and tell a trusted grown-up', 'ok', 'Great. You said no, and told someone.'] ] },
      ],
      facts: { items: ['She was arrested on 1 December 1955 in Montgomery, Alabama.', 'The Montgomery bus boycott lasted 381 days.', 'Saying no calmly is not rude. Then you can tell a trusted adult.'], quote: 'She later said she was not tired in her body. She was tired of giving in.' },
      talk: talk('Has anyone asked you to do something that felt wrong? What did you want to say?', 'Can you say no to me, calmly, when something feels unfair? I will listen.') },

    { id: 'childline', zone: 'boundaries', tiers: 'ymo', minAge: 4, mins: 4, tone: 'Gentle', real: 'CHILDLINE 1098 · Jeroo Billimoria, Mumbai', thumb: 'cl2',
      title: 'Who can I call?', desc: 'India’s free children’s helpline, 1098, started in Mumbai in 1996. Any child can call, day or night.',
      slides: [
        { scene: 'cl1', t: { y: 'In Mumbai, a teacher named Jeroo cared about children who had no one to call.', m: 'In the 1990s, Mumbai teacher Jeroo Billimoria worried about children living on the streets with no one to call.', o: 'CHILDLINE began in June 1996 as a project at TISS in Mumbai, started by professor Jeroo Billimoria.' } },
        { scene: 'cl2', t: { y: 'She helped start a free phone line: 1098. Any child could call, day or night.', m: 'She helped start a free phone line, 1098. Any child could call, day or night.' } },
        { scene: 'cl3', t: { y: 'A child called with a worry. A kind helper listened and sent help.', m: 'A child called with a worry. A kind helper listened and sent help.' } },
        { scene: 'cl4', t: { y: 'If you feel scared, hurt, lost or unsafe, call 1098. You do not have to be alone.', m: 'If you feel scared, hurt, lost or unsafe, you can call 1098. You do not have to be alone.' } },
      ],
      facts: { items: ['CHILDLINE 1098 is described as India’s first 24-hour free helpline for children in need.', 'Anyone can call, including a child, a parent or a teacher.', 'Check with a grown-up that the number works, and save it in a phone. Many places also respond on 112 (emergency).'], quote: 'Calling is brave. It is never a punishment.' },
      talk: talk('If you felt scared and could not tell anyone at home, who could you call? Can we write the number down?', 'Let’s save 1098 in my phone and the school diary, and practise when to call.') },

    { id: 'online', zone: 'boundaries', tiers: 'mo', minAge: 7, mins: 5, tone: 'Deep', real: 'India’s school cyber ambassadors · helpline 1930', thumb: 'on2',
      title: 'Screens, strangers and secrets', desc: 'Online, people can pretend to be someone else. A simple plan: stop, don’t reply, tell a grown-up.',
      slides: [
        { scene: 'on1', t: { m: 'Online, you can meet people you don’t know. Some are kind. Some are not who they say they are.' } },
        { scene: 'on2', t: { m: 'If a stranger asks for photos, secrets or to meet, STOP. You don’t have to reply.' } },
        { scene: 'on3', t: { m: 'Show a trusted grown-up straight away. You will not be in trouble for telling.' } },
        { scene: 'on4', t: { m: 'In some schools across India, students become “cyber helpers”. Grown-ups can report online harm at cybercrime.gov.in or on 1930. Kids can call 1098.' } },
        { w: 'choice', q: 'A stranger online asks for your photo and says “keep it secret”. You…', opts: [
          ['Send it. They seem nice', 'no', 'Nope. Nice-seeming people can still be unsafe.'],
          ['Stop, screenshot it and tell a trusted grown-up', 'ok', 'Exactly. You did nothing wrong by telling.'],
          ['Keep it a secret', 'no', 'Secrets that feel yucky are not okay to keep. Tell someone.'] ] },
      ],
      facts: { items: ['India’s National Cyber Crime Reporting Portal is cybercrime.gov.in; the helpline is 1930 (a grown-up reports).', 'Kids can call 1098 any time.', 'Agree as a family: whatever happens online, you can tell me, and your device won’t be taken away as punishment.'], quote: 'Stop. Don’t reply. Tell.' },
      talk: talk('Has anyone online ever asked you something that felt weird? What would you do?', 'Let’s agree: whatever happens online, you can tell me and I won’t take away your device as punishment.') },
  ];
  D.ZONES_ORDER = ['identity', 'emotions', 'friendship', 'body', 'boundaries'];
  D.CHOICE_BG = CH;
})();
