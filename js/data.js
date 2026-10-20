/* Not That Awk — shared constants: age zones, topic zones, UI strings.
   All content is placeholder copy for a prototype and needs expert (paediatric / sexual-health / legal) review before launch. */
window.DATA = (() => {
  /* ---------- the four age zones. The selected zone changes content, words, avatars, games and layout density. ---------- */
  const TIERS = [
    { id: '4-6', n: 'Little Explorers', s: 'Little', age: '4–6', c: '#9ca32f', ink: '#fff', bg: '#fffaf0',
      pick: ['Loves bedtime stories and cuddles', 'Learning what every body part is called'],
      adult: ['Still needs help with big feelings', 'Asks “why?” about bodies and babies'],
      inside: ['Body names', 'Feelings', 'Safe and unsafe touch', 'Who to tell'],
      voice: 'Short sentences. Real words for body parts. One idea at a time.' },
    { id: '7-9', n: 'Curious Minds', s: 'Curious', age: '7–9', c: '#e35e26', ink: '#fff', bg: '#ffe9dc',
      pick: ['Asks “but how?” about everything', 'Cares a lot about friends and fairness'],
      adult: ['Starting to compare themselves to friends', 'Picking things up from older kids and screens'],
      inside: ['How bodies change', 'Where babies come from', 'Peer pressure', 'Staying safe online'],
      voice: 'Clear facts and correct words, with real-life examples.' },
    { id: '10-12', n: 'Tweens', s: 'Tween', age: '10–12', c: '#653781', ink: '#fff', bg: '#fff1c2',
      pick: ['In group chats, memes and crushes', 'Wondering what is happening to my body'],
      adult: ['Body changes are starting or about to', 'Online a lot, and curious about everything'],
      inside: ['Puberty and periods', 'Consent', 'Crushes and relationships', 'Sexual content online'],
      voice: 'Direct and honest. Proper anatomy, how puberty works, and how sex and pregnancy happen.' },
    { id: '13+', n: 'Teens', s: 'Teen', age: '13–15', c: '#434f64', ink: '#fff', bg: '#dfe6ef',
      pick: ['Making my own decisions', 'Wants real talk, no sugar-coating'],
      adult: ['Dating, peer pressure and independence', 'Needs clear, factual health information'],
      inside: ['Sex and sexual health', 'Contraception and STIs', 'Healthy relationships', 'Consent, sexting and the law'],
      voice: 'Frank, factual and respectful. Sexual health, contraception, consent, relationships and the law.' },
  ];
  const tierIdx = id => Math.max(0, TIERS.findIndex(t => t.id === id));
  const ageToTier = a => a <= 6 ? '4-6' : a <= 9 ? '7-9' : a <= 12 ? '10-12' : '13+';

  /* ---------- topic zones (what a story is about) ---------- */
  const ZONES = [
    { id: 'me',       n: 'Me',                  nl: 'Me',                   icon: 'finger', c: '#9ca32f' },
    { id: 'body',     n: 'My body',             nl: 'My body',              icon: 'search', c: '#e35e26' },
    { id: 'growing',  n: 'Growing up',          nl: 'Growing up',           icon: 'clock',  c: '#ac2929' },
    { id: 'feelings', n: 'Feelings & friends',  nl: 'Feelings & friends',   icon: 'heart',  c: '#653781' },
    { id: 'consent',  n: 'Boundaries & consent',nl: 'My body, my rules',    icon: 'shield', c: '#434f64' },
    { id: 'babies',   n: 'Sex & babies',        nl: 'Babies',               icon: 'people', c: '#ea8259' },
    { id: 'online',   n: 'Online & media',      nl: 'Online & screens',     icon: 'chat',   c: '#647c8d' },
  ];

  const LANGS = [
    ['hi', 'हिंदी', 'Hindi'], ['en', 'English', 'English'], ['bn', 'বাংলা', 'Bengali'], ['te', 'తెలుగు', 'Telugu'], ['mr', 'मराठी', 'Marathi'],
    ['ta', 'தமிழ்', 'Tamil'], ['ur', 'اردو', 'Urdu'], ['gu', 'ગુજરાતી', 'Gujarati'], ['kn', 'ಕನ್ನಡ', 'Kannada'], ['ml', 'മലയാളം', 'Malayalam'],
  ];

  /* ---------- UI strings (English + Hindi); missing keys fall back to English ---------- */
  const T = {
    en: {
      back: 'BACK', cont: 'CONTINUE', done: 'DONE', skip: 'SKIP', next: 'NEXT', lets: 'LET’S GO',
      lang_t: 'LANGUAGE', lang_q: 'Which language feels easiest?',
      role_q: 'Who’s using Not That Awk?', kid: 'I’m a kid or teen', kid_s: 'Learn on my own, at my pace. Honest answers, no judging.',
      adult: 'I’m a grown-up', adult_s: 'Set it up for my child, or learn alongside them.',
      age_q: 'Which sounds most like you?', age_qa: 'Which sounds most like your child?',
      age_why: 'We use this to pick stories, words and games that fit, like picking a shoe size. It’s not a test, and you can change it anytime.',
      av_q: 'Pick your look', name_q: 'What should we call you?', name_qa: 'What should we call your child?',
      hub_q: 'What do you feel like doing?', play: 'PLAY', learn: 'LEARN', meet: 'MEET',
      play_s: 'Games, quizzes and choices', learn_s: 'Stories and straight answers', meet_s: 'Hear from other people',
      play_s0: 'Games and quizzes', learn_s0: 'Stories about you and your body', meet_s0: 'Say hi to Awkie',
      who_play: 'Who’s playing?', grownups: 'GROWN-UPS', hi: 'Hi', stars: 'stars',
    },
    hi: {
      back: 'वापस', cont: 'आगे बढ़ें', done: 'हो गया', skip: 'छोड़ें', next: 'आगे', lets: 'चलो शुरू करें',
      lang_t: 'भाषा', lang_q: 'कौन सी भाषा आसान लगती है?',
      role_q: 'अभी कौन इस्तेमाल कर रहा है?', kid: 'मैं बच्चा / टीनएजर हूँ', kid_s: 'अपनी रफ़्तार से, खुद सीखूँगा/सीखूँगी। सच्चे जवाब, कोई जजमेंट नहीं।',
      adult: 'मैं बड़ा हूँ', adult_s: 'अपने बच्चे के लिए सेट करें, या साथ में सीखें।',
      age_q: 'इनमें से कौन सा आप जैसा है?', age_qa: 'इनमें से कौन सा आपके बच्चे जैसा है?',
      age_why: 'हम इससे सही कहानियाँ, शब्द और खेल चुनते हैं, जैसे जूते का साइज़। यह कोई टेस्ट नहीं है। आप इसे कभी भी बदल सकते हैं।',
      av_q: 'अपना लुक चुनें', name_q: 'हम आपको क्या बुलाएँ?', name_qa: 'हम आपके बच्चे को क्या बुलाएँ?',
      hub_q: 'आज क्या करने का मन है?', play: 'खेलो', learn: 'सीखो', meet: 'मिलो',
      play_s: 'खेल, क्विज़ और चुनाव', learn_s: 'कहानियाँ और सीधे जवाब', meet_s: 'दूसरों की कहानियाँ सुनें',
      play_s0: 'खेल और क्विज़', learn_s0: 'आपके और आपके शरीर की कहानियाँ', meet_s0: 'अवकी से हाय कहें',
      who_play: 'कौन खेल रहा है?', grownups: 'बड़ों के लिए', hi: 'नमस्ते', stars: 'सितारे',
    },
  };

  const NAMES_A = ['Brave', 'Sunny', 'Giggly', 'Curious', 'Zippy', 'Cosy', 'Bold', 'Mighty'];
  const NAMES_B = ['Fox', 'Panda', 'Otter', 'Comet', 'Mango', 'Dino', 'Pixel', 'Maple'];
  return { TIERS, tierIdx, ageToTier, ZONES, LANGS, T, NAMES_A, NAMES_B };
})();
