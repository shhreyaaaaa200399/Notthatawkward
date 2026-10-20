/* Not That Awk — prototype content.
   Everything here is placeholder copy for the prototype; a real launch needs expert review
   (paediatrician / child psychologist / sex educator) before any of it ships. */
window.DATA = (() => {

  /* ---------- illustration library (cut from the Figma frames) ---------- */
  const ART = {
    shirt:   { src: 'assets/st_shirt.png',   w: 204, h: 380 },
    kids3:   { src: 'assets/st_kids3.png',   w: 407, h: 292 },
    kids4:   { src: 'assets/st_kids4.png',   w: 385, h: 282 },
    royals:  { src: 'assets/st_royals.png',  w: 467, h: 271 },
    flower:  { src: 'assets/st_flower.png',  w: 320, h: 400 },
    kiss:    { src: 'assets/th_kiss.png',    w: 218, h: 187 },
    baby:    { src: 'assets/baby.svg',        w: 300, h: 230 },
    facesL:  { src: 'assets/faces_left.png', w: 215, h: 200 },
    facesR:  { src: 'assets/faces_right.png',w: 287, h: 205 },
    parent:  { src: 'assets/who_parent.png', w: 228, h: 182 },
    child:   { src: 'assets/who_child.png',  w: 218, h: 179 },
    other:   { src: 'assets/who_other.png',  w: 150, h: 136 },
    play:    { src: 'assets/why_play.png',   w: 170, h: 136 },
    learn:   { src: 'assets/why_learn.png',  w: 161, h: 124 },
    meet:    { src: 'assets/why_meet.png',   w: 196, h: 140 },
    logo:    { src: 'assets/logo_not.png',   w: 195, h: 205 },
  };
  const AVATARS = ['deer','llama','rabbit','panda','hedgehog','cat','pig','goat','dog','raccoon','fox','elephant'];
  const AV_NAME = { deer:'Deer', llama:'Llama', rabbit:'Bunny', panda:'Panda', hedgehog:'Hedgehog', cat:'Cat', pig:'Piglet', goat:'Goat', dog:'Pup', raccoon:'Raccoon', fox:'Fox', elephant:'Elephant' };

  /* ---------- languages ---------- */
  const LANGS = [
    ['hi','हिंदी','Hindi'],['en','English','English'],['bn','বাংলা','Bengali'],['te','తెలుగు','Telugu'],['mr','मराठी','Marathi'],
    ['ta','தமிழ்','Tamil'],['ur','اردو','Urdu'],['gu','ગુજરાતી','Gujarati'],['kn','ಕನ್ನಡ','Kannada'],['ml','മലയാളം','Malayalam']
  ];

  /* ---------- UI strings (English + Hindi). Anything missing falls back to English. ---------- */
  const T = {
    en: {
      profile:'PROFILE', back:'BACK', cont:'CONTINUE', done:'DONE', exit:'EXIT', skip:'SKIP', next:'NEXT',
      lang_t:'LANGUAGE', lang_q:'What language do you prefer?',
      who_q:'Who are we talking to?', child:'CHILD', parent:'PARENT', other:'OTHER',
      child_s:'If you are a child of 4-12 years', parent_s:'If you are here for your child', other_s:'If you are a caretaker of a child',
      why_q:'Why are you here today?', play:'PLAY', learn:'LEARN', meet:'MEET',
      play_s:'Play games with learning experiences about sex-ed', learn_s:'Ask questions according to your profile and concern', meet_s:'See what is happening around the globe and connect',
      age_q:'How old is the child?', av_q:'Pick an avatar!', name_q:'What is the name?', users_q:'Who’s using the app at the moment?',
      topics_q:'Choose the topic for', topics_s:'You can adjust these anytime. Tap a story to manage access.',
      hi_user:'Hi', grownups:'GROWN-UPS'
    },
    hi: {
      profile:'प्रोफ़ाइल', back:'वापस', cont:'आगे बढ़ें', done:'हो गया', exit:'बाहर', skip:'छोड़ें', next:'आगे',
      lang_t:'भाषा', lang_q:'आप कौन सी भाषा पसंद करते हैं?',
      who_q:'हम किससे बात कर रहे हैं?', child:'बच्चा', parent:'माता-पिता', other:'अन्य',
      child_s:'अगर आप 4-12 साल के बच्चे हैं', parent_s:'अगर आप अपने बच्चे के लिए आए हैं', other_s:'अगर आप बच्चे की देखभाल करते हैं',
      why_q:'आज आप यहाँ क्यों आए हैं?', play:'खेलो', learn:'सीखो', meet:'मिलो',
      play_s:'सेक्स-एड के बारे में सीखने वाले खेल खेलें', learn_s:'अपनी प्रोफ़ाइल के हिसाब से सवाल पूछें', meet_s:'देखें दुनिया में क्या हो रहा है और जुड़ें',
      age_q:'बच्चे की उम्र कितनी है?', av_q:'अपना अवतार चुनें!', name_q:'नाम क्या है?', users_q:'अभी ऐप कौन इस्तेमाल कर रहा है?',
      topics_q:'विषय चुनें:', topics_s:'आप इन्हें कभी भी बदल सकते हैं। किसी कहानी को टैप करें।',
      hi_user:'नमस्ते', grownups:'बड़ों के लिए'
    }
  };

  /* ---------- zones ---------- */
  const ZONES = [
    { id:'identity',   name:'Identity',            icon:'finger' },
    { id:'emotions',   name:'Emotions',            icon:'heart'  },
    { id:'friendship', name:'Friendship',          icon:'people' },
    { id:'body',       name:'Body Curiosity',      icon:'search' },
    { id:'boundaries', name:'Boundaries & Safety', icon:'shield' },
  ];

  /* ---------- stories ----------
     slide: { t:text, art:key|'av:name'|'flower', side:'l'|'r'|'c', bg, b:banner-shape, bp:[l,t,w,h], h:art height, ap:{l|r,b}, w:widget }  */
  const STORIES = [
    { id:'colours', zone:'identity', minAge:4, mins:5, tone:'Gentle',
      title:'Are there girl colours and boy colours?',
      desc:'Navigating peer pressure around gendered colors, encouraging self-expression, and affirming that toys and colors are for everyone.',
      thumb:{ bg:'#fcd3c3', art:'flower', h:170 },
      slides:[
        { t:'Rishi wants to wear a pink T-shirt.\nHe likes the T-shirt very much.', art:'shirt', side:'r', bg:'peach', b:'b1', bp:[96,44,400,92], h:362, ap:{r:206,b:18} },
        { t:'But some children say that pink is only for girls. Is that really true?', art:'kids3', side:'c', bg:'peach', b:'b2', bp:[140,26,640,76], h:300, ap:{l:236,b:20} },
        { t:'No. All colours are for all children!', art:'kids4', side:'c', bg:'peach', b:'b4', bp:[176,28,586,62], h:282, ap:{l:272,b:22} },
        { t:'In the past, red was the colour of the king, pink of the prince, and blue of the princess.', art:'royals', side:'c', bg:'peach', b:'b5', bp:[140,306,640,84], h:270, ap:{l:200,b:150} },
        { t:'Today that is no longer the case.\nEvery colour is for everyone - and that is what makes our world beautiful and colourful.', art:'flower', side:'r', bg:'peach', b:'b3', bp:[72,236,290,150], h:400, ap:{l:440,b:0} },
        { w:'palette', t:'Your turn! Tap the colours you love and watch the flower bloom.', bg:'peach', b:'b1', bp:[96,84,330,70] },
      ],
      talk:[ ['Ask the child','What is your favourite colour? Has anyone ever said it was “for boys” or “for girls”?'],
             ['Ask the grown-up','Was there a colour, toy or game you were told was “not for you” when you were small?'] ] },

    { id:'play', zone:'identity', minAge:4, mins:4, tone:'Gentle',
      title:'Who says how I am allowed to play?',
      desc:'Football, teddy bears, skipping ropes and cricket bats. Everyone gets to join in, whatever they play.',
      thumb:{ bg:'#ffecba', art:'kids4', h:150 },
      slides:[
        { t:'Some children love football.\nSome love teddy bears.\nSome love both!', art:'kids4', side:'c', bg:'cream', b:'b4', bp:[170,28,590,92], h:282, ap:{l:272,b:22} },
        { t:'A loud voice says, “Football is for boys!”\nAnother says, “Teddies are for girls!”', art:'kids3', side:'r', bg:'cream', b:'b2', bp:[70,70,420,110], h:296, ap:{r:30,b:22} },
        { w:'choice', q:'So who gets to decide what YOU love to play?', bg:'cream', bp:[60,130,0,0], opts:[
            ['Whoever shouts the loudest','no','Not quite. Loud voices don’t get to be the boss of your fun.'],
            ['Me, with kind friends and grown-ups','ok','Yes! You get to choose what you love, as long as everyone stays safe and kind.'],
            ['Nobody knows','no','Somebody does: YOU. You know best what makes you smile.'] ] },
        { t:'Play is for everyone. Games get better when everyone can join in!', art:'kids4', side:'c', bg:'cream', b:'b4', bp:[176,28,586,62], h:282, ap:{l:272,b:22} },
      ],
      talk:[ ['Ask the child','What is your favourite game? Who do you play it with?'],
             ['Ask the grown-up','Share a game you loved as a child. Did anyone ever say you couldn’t play it?'] ] },

    { id:'gender', zone:'identity', minAge:7, mins:5, tone:'Curious',
      title:'Who chooses the gender for the baby?',
      desc:'Gently unpacking how bodies, names and identity differ, and why every child deserves respect.',
      thumb:{ bg:'#9ca32f', art:'baby', h:150 },
      slides:[
        { t:'When a baby is growing in a belly, nobody gets to choose what the baby will be like.', art:'baby', side:'r', bg:'olive', b:'b1', bp:[60,60,420,92], h:262, ap:{r:80,b:60} },
        { t:'When a baby is born, doctors look at its body and say “it’s a girl” or “it’s a boy”. Bodies can be different from each other.', art:'baby', side:'r', bg:'olive', b:'b2', bp:[60,60,440,120], h:262, ap:{r:80,b:60} },
        { t:'As children grow, they learn who they are on the inside too: what they love, how they feel, who they want to be.', art:'kids3', side:'r', bg:'cream', b:'b3', bp:[96,70,360,120], h:290, ap:{r:30,b:22} },
        { t:'Some people feel just like the word they were given. Some feel different. Every one of them deserves kindness and respect.', art:'facesR', side:'c', bg:'cream', b:'b5', bp:[150,288,640,84], h:205, ap:{l:322,b:130} },
      ],
      talk:[ ['Ask the child','What do you think makes someone “them”, besides how they look?'],
             ['Ask the grown-up','How do we show respect when someone is different from us?'] ] },

    { id:'feelings', zone:'emotions', minAge:4, mins:5, tone:'Gentle',
      title:'Merry-go-round of emotions',
      desc:'Feelings come in every colour. Name them, find them in your body, and learn that no feeling is a “bad” one.',
      thumb:{ bg:'#fcd3c3', art:'flower', h:170 },
      slides:[
        { t:'Feelings are like petals on a flower. Lots of colours, all growing from the same stem: you!', art:'flower', side:'r', bg:'peach', b:'b1', bp:[60,70,360,100], h:400, ap:{l:440,b:0} },
        { w:'emoflower', t:'Tap a petal to meet a feeling.', bg:'peach' },
        { t:'No feeling is bad. Even the loud ones. What matters is what we do next, and who we tell.', art:'facesL', side:'c', bg:'cream', b:'b4', bp:[170,30,590,84], h:200, ap:{l:360,b:100} },
      ],
      talk:[ ['Ask the child','Which petal did you feel today? Where did you feel it in your body?'],
             ['Ask the grown-up','Name a big feeling you had this week and what helped you with it.'] ] },

    { id:'embarrass', zone:'emotions', minAge:4, mins:3, tone:'Gentle',
      title:'Red cheeks and hot ears',
      desc:'Everyone feels embarrassed sometimes. Here’s what is going on and what helps.',
      thumb:{ bg:'#ffecba', art:'other', h:130 },
      slides:[
        { t:'Sometimes your cheeks go red, your ears feel hot and you want to hide. That’s embarrassment!', art:'other', side:'r', bg:'cream', b:'b1', bp:[60,70,400,100], h:260, ap:{r:130,b:50} },
        { w:'choice', q:'What can help when you feel embarrassed?', bg:'cream', bp:[60,120,0,0], opts:[
            ['Take 3 slow dragon breaths','ok','Yes! Slow breaths tell your body it’s safe.'],
            ['Pretend it never happened','no','Hiding it can make it bigger. Try a breath, then tell someone.'],
            ['Tell someone I trust','ok','Yes! Feelings get lighter when we share them.'] ] },
        { t:'Everyone gets embarrassed, even grown-ups. It passes, like a little cloud.', art:'parent', side:'c', bg:'cream', b:'b4', bp:[170,30,590,70], h:182, ap:{l:360,b:110} },
      ],
      talk:[ ['Ask the child','What was the last thing that made your cheeks go red?'],
             ['Ask the grown-up','Share a time you felt embarrassed when you were little.'] ] },

    { id:'exclude', zone:'friendship', minAge:4, mins:4, tone:'Gentle',
      title:'When a friend says “you can’t play”',
      desc:'Left out? Here’s how it feels, and what we can do about it.',
      thumb:{ bg:'#fcd3c3', art:'kids3', h:160 },
      slides:[
        { t:'Four friends are playing. Then someone says, “You can’t play with us.”', art:'kids4', side:'c', bg:'peach', b:'b4', bp:[170,28,590,70], h:282, ap:{l:272,b:22} },
        { w:'choice', q:'How might that feel?', bg:'peach', bp:[60,120,0,0], opts:[
            ['Left out','ok','Yes, that can feel lonely.'],
            ['Angry','ok','Yes, that’s a very real feeling too.'],
            ['Nothing at all','no','It’s okay to feel something! Most of us do.'] ] },
        { t:'What can we do? Say how we feel. Ask a grown-up. Find another friend. Invite someone who is alone.', art:'kids3', side:'r', bg:'peach', b:'b3', bp:[96,70,360,126], h:296, ap:{r:30,b:22} },
      ],
      talk:[ ['Ask the child','Has anyone ever left you out? What happened next?'],
             ['Ask the grown-up','Tell a story about a good friend who stood by you.'] ] },

    { id:'crush', zone:'friendship', minAge:10, mins:5, tone:'Curious',
      title:'Butterflies: what is a crush?',
      desc:'Liking someone a lot can feel exciting and confusing. All of it is normal.',
      thumb:{ bg:'#653781', art:'facesR', h:130 },
      slides:[
        { t:'Sometimes you start liking someone a lot. You think about them, smile when they walk in, and feel butterflies. That’s a crush.', art:'facesR', side:'c', bg:'purple', b:'b4', bp:[110,30,700,100], h:205, ap:{l:322,b:90} },
        { w:'choice', q:'What’s good to remember about crushes?', bg:'purple', bp:[60,130,0,0], opts:[
            ['They might not like me back, and that’s okay','ok','Yes. Feelings are real, and so are other people’s choices.'],
            ['I have to tell the whole class','no','You never have to. Share only with people you trust.'],
            ['Everyone gets to say no, including my crush','ok','Yes! Respect goes both ways.'] ] },
        { t:'Crushes come and go. Be kind to yourself and to them.', art:'parent', side:'c', bg:'purple', b:'b4', bp:[170,30,590,64], h:182, ap:{l:360,b:110} },
      ],
      talk:[ ['Ask the child','What do you think makes a good friend vs. a crush?'],
             ['Ask the grown-up','Tell a gentle (or funny) crush story from when you were young.'] ] },

    { id:'diff', zone:'body', minAge:4, mins:4, tone:'Gentle',
      title:'What is the difference between boys and girls?',
      desc:'Bodies can be different. Feelings, strength and kindness are for everyone. Plus, the proper names for body parts.',
      thumb:{ bg:'#ffecba', art:'kids3', h:160 },
      slides:[
        { t:'Boys and girls can have different bodies. Some parts are private. That means they are just ours.', art:'kids3', side:'r', bg:'cream', b:'b1', bp:[96,70,360,110], h:296, ap:{r:30,b:22} },
        { t:'Every body part has a proper name. Penis. Vulva. Nipples. Saying them calmly is okay.', art:'parent', side:'c', bg:'cream', b:'b4', bp:[170,30,590,70], h:182, ap:{l:360,b:110} },
        { t:'But feelings? Everyone has them. Strong? Everyone can be. Kind? Everyone can be!', art:'kids4', side:'c', bg:'cream', b:'b4', bp:[170,28,590,70], h:282, ap:{l:272,b:22} },
      ],
      talk:[ ['Ask the child','What do you want to know about your body?'],
             ['Ask the grown-up','Try saying proper body-part names out loud. No giggling… okay, a little giggling.'] ] },

    { id:'out', zone:'body', minAge:4, mins:4, tone:'Gentle',
      title:'How do babies come out of the belly?',
      desc:'A simple, honest answer about birth, for curious little ones.',
      thumb:{ bg:'#9ca32f', art:'baby', h:150 },
      slides:[
        { t:'A baby grows inside a special space in a grown-up’s body called the womb.', art:'baby', side:'r', bg:'olive', b:'b1', bp:[60,70,400,92], h:262, ap:{r:80,b:60} },
        { t:'After about nine months, the baby is ready to meet the world.', art:'baby', side:'r', bg:'olive', b:'b2', bp:[60,70,400,92], h:262, ap:{r:80,b:60} },
        { t:'Doctors and nurses help. Most babies come out through an opening called the vagina. Some are born through a small cut in the belly, called a C-section.', art:'baby', side:'r', bg:'olive', b:'b3', bp:[50,60,440,140], h:262, ap:{r:80,b:60} },
        { t:'Both ways are okay. Both bring a brand new person into the world!', art:'kids4', side:'c', bg:'cream', b:'b4', bp:[170,28,590,66], h:282, ap:{l:272,b:22} },
      ],
      talk:[ ['Ask the child','What do you think a baby feels like when it is born?'],
             ['Ask the grown-up','Tell the story of the day your child was born.'] ] },

    { id:'in', zone:'body', minAge:7, mins:5, tone:'Curious',
      title:'How do babies get into a belly?',
      desc:'The first, simple chapter on how a baby begins. For the “how exactly?” age.',
      thumb:{ bg:'#e35e26', art:'baby', h:150 },
      slides:[
        { t:'Every baby starts from two tiny cells, far too small to see.', w:'cells', bg:'orange', b:'b1', bp:[60,70,400,80] },
        { t:'One cell, an egg, comes from a person with a womb. The other, a sperm, comes from a person with a penis.', w:'cells', bg:'orange', b:'b2', bp:[60,70,420,112] },
        { t:'When the two cells meet inside the womb, they can grow into a baby. How they meet is something a grown-up you trust can explain when you ask.', w:'cells', bg:'orange', b:'b3', bp:[50,60,440,140] },
        { t:'It takes about nine months to grow. Questions? Great! Ask anytime.', art:'kids4', side:'c', bg:'cream', b:'b4', bp:[170,28,590,66], h:282, ap:{l:272,b:22} },
      ],
      talk:[ ['Ask the child','What questions do you still have? No question is silly.'],
             ['Ask the grown-up','Pick the words you’re comfortable with and answer one question honestly.'] ] },

    { id:'grow', zone:'body', minAge:10, mins:6, tone:'Deep',
      title:'Growing up: what is changing?',
      desc:'A friendly guide to puberty for ages 10 and up: what to expect, and that everyone’s clock is different.',
      thumb:{ bg:'#ffcb05', art:'child', h:130 },
      slides:[
        { t:'Between about 8 and 14, bodies start to change. Everyone’s clock is different, and that’s normal.', art:'child', side:'c', bg:'yellow', b:'b4', bp:[170,30,590,70], h:179, ap:{l:360,b:110} },
        { t:'You might grow taller, get hair in new places, sweat more, or get pimples. Voices can crack. Some bodies get breasts or start having periods.', art:'facesL', side:'r', bg:'yellow', b:'b2', bp:[60,60,480,126], h:200, ap:{r:110,b:70} },
        { t:'Feelings change too: moods go up and down. This is normal, and you’re not “being dramatic”.', art:'facesR', side:'c', bg:'yellow', b:'b5', bp:[140,288,640,70], h:205, ap:{l:322,b:90} },
        { t:'Got questions? Perfect. Ask someone you trust, or Awkie.', art:'kids4', side:'c', bg:'cream', b:'b4', bp:[170,28,590,62], h:282, ap:{l:272,b:22} },
      ],
      talk:[ ['Ask the child','What is the weirdest or funniest thing you’ve heard about growing up?'],
             ['Ask the grown-up','Tell one thing you wish someone had told you about growing up.'] ] },

    { id:'kiss', zone:'boundaries', minAge:4, mins:4, tone:'Gentle',
      title:'Is it okay not to want to be kissed sometimes?',
      desc:'Your body is yours. You can say “no thank you” to hugs and kisses, even from people you love.',
      thumb:{ bg:'#ffecba', art:'kiss', h:184 },
      slides:[
        { t:'Your body is yours. You get to decide who touches it, even with hugs and kisses.', art:'kiss', side:'c', bg:'cream', b:'b4', bp:[170,30,590,66], h:230, ap:{l:332,b:60} },
        { t:'Aunty wants a kiss, but you don’t feel like it. That’s okay.', art:'kiss', side:'c', bg:'cream', b:'b4', bp:[170,30,590,56], h:230, ap:{l:332,b:60} },
        { t:'You can say, “No thank you, but I can give you a high five!”', art:'kiss', side:'c', bg:'cream', b:'b4', bp:[170,30,590,56], h:230, ap:{l:332,b:60} },
        { t:'People who love you will understand. If someone doesn’t, tell a trusted grown-up.', art:'kids4', side:'c', bg:'cream', b:'b4', bp:[170,28,590,66], h:282, ap:{l:272,b:22} },
      ],
      talk:[ ['Ask the child','What could you do instead of a hug if you didn’t feel like one?'],
             ['Ask the grown-up','How can our family practise asking before hugging?'] ] },

    { id:'no', zone:'boundaries', minAge:4, mins:3, tone:'Gentle',
      title:'No means no!',
      desc:'“No” is a whole sentence. Practise a strong voice and know what to do when someone doesn’t listen.',
      thumb:{ bg:'#434f64', art:'child', h:130 },
      slides:[
        { t:'“No” is a whole sentence. When you say it, people should stop.', art:'child', side:'c', bg:'navy', b:'b4', bp:[170,30,590,62], h:179, ap:{l:360,b:110} },
        { w:'voice', t:'Try your strong voice! Press and hold the button.', bg:'navy' },
        { t:'If someone doesn’t stop: walk away and tell a trusted grown-up. It’s never your fault.', art:'parent', side:'c', bg:'navy', b:'b4', bp:[170,30,590,70], h:182, ap:{l:360,b:110} },
      ],
      talk:[ ['Ask the child','When is it hard to say “no”? What would help?'],
             ['Ask the grown-up','Practise a “no thanks” out loud together. Make it funny, then make it firm.'] ] },

    { id:'trust', zone:'boundaries', minAge:4, mins:4, tone:'Gentle',
      title:'Who can I tell?',
      desc:'Build your own “Trusted Five”: the grown-ups you can tell about anything that feels yucky, scary or confusing.',
      thumb:{ bg:'#fcd3c3', art:'kids3', h:160 },
      slides:[
        { t:'If something feels yucky, scary or confusing, tell someone you trust.', art:'kids3', side:'r', bg:'peach', b:'b1', bp:[96,70,360,110], h:296, ap:{r:30,b:22} },
        { w:'trust', t:'Pick up to five grown-ups for your Trusted Five.', bg:'peach' },
        { t:'Keep telling until someone listens. Childline 1098 is a free helpline in India: you can just dial 1098.', art:'kids4', side:'c', bg:'peach', b:'b4', bp:[140,28,640,70], h:282, ap:{l:272,b:22} },
      ],
      talk:[ ['Ask the child','Who is in your Trusted Five? Why them?'],
             ['Ask the grown-up','Promise out loud: “You can tell me anything and I won’t be angry.”'] ] },

    { id:'online', zone:'boundaries', minAge:10, mins:5, tone:'Deep',
      title:'Screens, strangers and secrets',
      desc:'Online, people can pretend to be someone else. How to spot red flags and what to do.',
      thumb:{ bg:'#434f64', art:'facesL', h:130 },
      slides:[
        { t:'Online, people can pretend to be someone they’re not.', art:'other', side:'r', bg:'navy', b:'b1', bp:[60,70,400,70], h:260, ap:{r:130,b:50} },
        { w:'choice', q:'A stranger online asks for your photo and says “keep it secret”. You…', bg:'navy', bp:[60,130,0,0], opts:[
            ['Send it. They seem nice','no','Nope. Nice-seeming people can still be unsafe.'],
            ['Stop, screenshot it and tell a trusted grown-up','ok','Exactly. You did nothing wrong by telling.'],
            ['Keep it a secret','no','Secrets that feel yucky are not okay to keep. Tell someone.'] ] },
        { t:'Rule of thumb: if it makes your tummy go “hmm”, step back and tell someone. You’ll never be in trouble for it.', art:'facesR', side:'c', bg:'navy', b:'b5', bp:[110,288,700,80], h:205, ap:{l:322,b:130} },
      ],
      talk:[ ['Ask the child','What apps do you use? Has anyone ever messaged you something odd?'],
             ['Ask the grown-up','Agree on one family “safe word” to use if anyone ever feels unsafe online or offline.'] ] },
  ];

  /* ---------- dice deck (the physical kit, digitised) ---------- */
  const DICE = [
    { id:'feel',  label:'Feelings', c:'#e35e26', cards:[
      [1,'What made you smile today?'],
      [1,'If your mood was a flower petal, which colour would it be today?'],
      [2,'When did you last feel embarrassed? What helped?'],
      [3,'Is there something you’ve wanted to ask but it felt awkward?'] ]},
    { id:'body',  label:'Body',     c:'#59662e', cards:[
      [1,'What is one thing your body did today that you’re thankful for?'],
      [2,'Say the proper names of three body parts out loud. Giggling allowed!'],
      [3,'What changes do you think happen as people grow up? What have you heard?'] ]},
    { id:'friend',label:'Friends',  c:'#653781', cards:[
      [1,'Who is a good friend, and what makes them good?'],
      [2,'What would you do if a friend said something that made you uncomfortable?'],
      [3,'Have you ever felt pressure to do something because friends did it?'] ]},
    { id:'fam',   label:'Family',   c:'#ffcb05', cards:[
      [1,'What is a family tradition you love?'],
      [2,'Grown-up: share something you were confused about at your child’s age.'],
      [3,'Which topics do you think our family finds hard to talk about, and why?'] ]},
    { id:'rules', label:'Rules',    c:'#434f64', cards:[
      [1,'What is a house rule you think is fair? And one that isn’t?'],
      [2,'How can we ask before giving someone a hug?'],
      [3,'What does “no means no” look like at school, online and at home?'] ]},
    { id:'wild',  label:'Wild card!', c:'#ac2929', cards:[
      [1,'Do a silly dance together, then share one question you’ve never asked.'],
      [2,'Swap roles: the child plays the grown-up and answers a question.'],
      [3,'Write an “Anything Box” question on a slip and put it on the fridge.'] ]},
  ];
  const TONES = [
    { id:0, name:'Not That Awk', sub:'Easy-going. We’ll keep it light and warm.', max:1 },
    { id:1, name:'A Little Awk', sub:'A mix of warm-ups and real talk.',           max:2 },
    { id:2, name:'Very Awk',     sub:'We’re nervous, but ready for the brave stuff.', max:3 },
  ];

  /* ---------- myth or fact ---------- */
  const MYTHS = [
    ['Pink is only for girls.', false, 'Myth! Colours are for everyone. Even kings once wore pink!'],
    ['Boys can cry.', true, 'Fact! Crying is how bodies let feelings out. Everyone cries.'],
    ['You have to hug or kiss a relative even if you don’t want to.', false, 'Myth! Your body is yours. A wave or high five is a great choice.'],
    ['It’s okay to ask questions about bodies.', true, 'Fact! Questions are how we learn. No question is naughty.'],
    ['If a secret makes you feel yucky, you should tell a trusted grown-up.', true, 'Fact! Yucky secrets are never okay to keep.'],
    ['Everybody grows up at exactly the same time.', false, 'Myth! Bodies have their own clocks. Early, late, all normal.'],
    ['Only girls can play with dolls and only boys can play football.', false, 'Myth! Games are for everyone.'],
    ['Asking about how babies are made means you’re being naughty.', false, 'Myth! It means you’re curious, and curious is great.'],
  ];

  /* ---------- safe or not ---------- */
  const SAFE = [
    ['A friend asks, “Can I give you a hug?”', true, 'They asked first. You can say yes or “no thanks”. Both are okay.'],
    ['Someone you don’t know well says, “Don’t tell your parents about this.”', false, 'Not okay. Tell a trusted grown-up right away.'],
    ['Grandma wants a kiss, but you offer a high five instead.', true, 'Perfect! You were kind and you kept your boundary.'],
    ['An older kid online asks for photos of you.', false, 'Not okay. Stop, screenshot and tell a trusted grown-up.'],
    ['A doctor explains the check-up first, with your parent in the room.', true, 'Safe! Doctors explain, ask and always have a grown-up nearby.'],
    ['Someone keeps tickling you after you say “stop”.', false, 'Not okay. “Stop” means stop, every time. Tell someone.'],
  ];

  /* ---------- emotions flower ---------- */
  const EMOS = [
    { n:'Happy',       c:'#ffcb05', body:'Light chest, big smile, bouncy feet.',     do:'Share it! Tell someone what made you happy.' },
    { n:'Sad',         c:'#647c8d', body:'Heavy chest, wet eyes, slow body.',        do:'Cry if you need to. Ask for a hug or a quiet chat.' },
    { n:'Angry',       c:'#ac2929', body:'Hot face, tight fists, fast heart.',       do:'Stomp, squeeze a pillow, then take 3 dragon breaths.' },
    { n:'Scared',      c:'#653781', body:'Tummy flutters, cold hands, wobbly legs.', do:'Hold a trusted hand and say what scares you.' },
    { n:'Embarrassed', c:'#ea8259', body:'Red cheeks, hot ears, want to hide.',      do:'Breathe. Everyone feels it. Tell someone you trust.' },
    { n:'Excited',     c:'#e35e26', body:'Fizzy tummy, wiggly body, fast words.',    do:'Dance it out! Then tell someone what you’re excited about.' },
    { n:'Jealous',     c:'#59662e', body:'Tight chest, grumpy thoughts.',            do:'Notice it, name it, and say what you wish you had.' },
    { n:'Calm',        c:'#96c5d1', body:'Slow breath, soft shoulders.',             do:'Remember how this feels so you can find it again.' },
    { n:'Proud',       c:'#edd25a', body:'Tall back, glowing chest.',                do:'Tell someone about the thing you did!' },
    { n:'Lonely',      c:'#434f64', body:'Empty tummy, quiet thoughts.',             do:'Reach out to one person today. Even a wave counts.' },
  ];

  /* ---------- Awkie (scripted placeholder: not an AI) ---------- */
  const AWKIE = [
    { k:/period|pad\b|menstru/i, a:'Periods happen when a body that can grow a baby someday sheds a soft lining, usually about once a month. They often start between 9 and 15. They’re completely normal, and nobody needs to feel embarrassed.', card:'Periods are normal. Ask: what have you heard about them?' },
    { k:/crush|love someone|like someone|boyfriend|girlfriend/i, a:'Crushes are common! Butterflies, smiles, thinking about someone a lot. It’s all normal. Remember: you never have to share it, and everyone gets to say no, including your crush.', card:'Crushes: share a gentle story from your own childhood.' },
    { k:/baby|babies|born|belly|pregnan/i, a:'A baby starts from two tiny cells, one from each of two grown-ups, and grows in the womb for about nine months. Want the full story? Try “How do babies get into a belly?” in Learn!', go:'story:in' },
    { k:/penis|vagina|vulva|private part|body part|boobs|breast/i, a:'Good question! Those are proper body-part names, and saying them is okay. “Private” means they’re just yours: nobody should touch or ask to see them, except a doctor with a parent nearby.', go:'story:diff' },
    { k:/secret|touch|hurt|scared|unsafe|abuse|bully|someone made me/i, a:'Thank you for telling me. What you’re describing sounds important. Please tell a trusted grown-up right now. If you can’t, call Childline on 1098 (free, India). It is never your fault.', sos:true },
    { k:/pink|colou?r|girl|boy|gender/i, a:'All colours are for everyone, and so are toys and games! Want to see the story?', go:'story:colours' },
    { k:/sex|porn/i, a:'It’s okay to be curious. Sex is a grown-up topic, and the best answers come from a trusted grown-up who knows you. I can make you a conversation card to start that chat.', card:'My child is curious about sex. Ask: what have you heard? Then answer simply and honestly.' },
    { k:/hello|hi\b|hey|namaste/i, a:'Hi hi! I’m Awkie. Ask me anything. Nobody will know it was you, and no question is silly.' },
  ];
  const AWKIE_FALLBACK = 'That’s a great question! I’m not sure I have the right answer yet. Want me to turn it into a conversation card so you can ask a grown-up you trust?';

  /* ---------- AMA (placeholders) ---------- */
  const AMA = [
    { av:'elephant', role:'Paediatrician', topic:'Puberty questions from 9–12 year-olds', when:'Sat · 6 PM', c:'#9ca32f' },
    { av:'panda', role:'Child psychologist', topic:'“My child went quiet when I mentioned the talk”', when:'Sun · 11 AM', c:'#653781' },
    { av:'fox', role:'Sex educator', topic:'Hinglish Q&A: words that work at home', when:'Wed · 7 PM', c:'#e35e26' },
  ];
  const QA = [
    ['When should I start “the talk”?', 'Earlier than you think, and in small pieces. Use everyday moments (a TV ad, a pregnant neighbour) and answer simply. Little talks beat one big talk.'],
    ['My child laughed nervously and changed the subject. Did I mess up?', 'Not at all. Nervous laughter is a very common reaction. Say, “It’s okay to feel awkward. We can try again later.” You’ve opened the door.'],
    ['What if I don’t know the answer?', 'Say so! “Great question. Let’s find out together.” Use the Learn stories to help.'],
    ['Is it too early to teach body-part names?', 'Not at all. Proper names help children describe things clearly and stay safe.'],
  ];

  /* ---------- Hi, World ---------- */
  const CITIES = [
    { n:'Bengaluru', x:.595, y:.62, who:'Mira & Dad', msg:'We rolled the dice and laughed for ten minutes!' },
    { n:'Lucknow',   x:.60,  y:.53, who:'Aarush & Mummy', msg:'Pehli baar humne colours wali story padhi.' },
    { n:'Mumbai',    x:.575, y:.58, who:'Zara & Papa', msg:'Today we made our Trusted Five. 🖐' },
    { n:'Kolkata',   x:.63,  y:.55, who:'Tiya & Maa', msg:'We practised our strong “no!” voices.' },
    { n:'Dubai',     x:.52,  y:.52, who:'Nikhil & Mum', msg:'Hello from the desert! Feelings flower is our favourite.' },
    { n:'London',    x:.40,  y:.36, who:'Priya & Dad', msg:'Our first Awkie question went to the fridge door.' },
    { n:'Toronto',   x:.18,  y:.42, who:'Anaya & Mama', msg:'Hi from snow! We did the Myth or Fact game.' },
    { n:'Singapore', x:.69,  y:.66, who:'Kabir & Mum', msg:'We got the fox sticker today!' },
  ];
  const GREETS = [['Hi!','🇬🇧'],['नमस्ते','🇮🇳'],['வணக்கம்','🇮🇳'],['হ্যালো','🇮🇳'],['Salaam','🌙'],['Hola','🌎']];

  const NAMES_A = ['Brave','Sunny','Giggly','Curious','Zippy','Cosy','Bold','Mighty'];
  const NAMES_B = ['Fox','Panda','Llama','Bunny','Otter','Comet','Mango','Dino'];

  return { ART, AVATARS, AV_NAME, LANGS, T, ZONES, STORIES, DICE, TONES, MYTHS, SAFE, EMOS, AWKIE, AWKIE_FALLBACK, AMA, QA, CITIES, GREETS, NAMES_A, NAMES_B };
})();
