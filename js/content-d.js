/* Data used by story widgets: feelings flower, body map, puberty timeline, cycle wheel, anatomy, contraception. Placeholder copy; needs medical review. */
window.CT.WD = (() => {
  const EMOS = [
    { n: 'Happy',       c: '#ffcb05', body: 'Light chest, big smile, bouncy feet.',     do: 'Share it! Tell someone what made you happy.' },
    { n: 'Sad',         c: '#647c8d', body: 'Heavy chest, wet eyes, slow body.',        do: 'Cry if you need to. Ask for a hug or a quiet chat.' },
    { n: 'Angry',       c: '#ac2929', body: 'Hot face, tight fists, fast heart.',       do: 'Stomp, squeeze a pillow, then take three slow breaths.' },
    { n: 'Scared',      c: '#653781', body: 'Tummy flutters, cold hands, wobbly legs.', do: 'Hold a trusted hand and say what scares you.' },
    { n: 'Embarrassed', c: '#ea8259', body: 'Red cheeks, hot ears, wanting to hide.',   do: 'Breathe. Everyone feels it. Tell someone you trust.' },
    { n: 'Excited',     c: '#e35e26', body: 'Fizzy tummy, wiggly body, fast words.',    do: 'Dance it out, then tell someone what you’re excited about.' },
    { n: 'Jealous',     c: '#59662e', body: 'Tight chest, grumpy thoughts.',            do: 'Notice it, name it, and say what you wish you had.' },
    { n: 'Calm',        c: '#96c5d1', body: 'Slow breath, soft shoulders.',             do: 'Remember how this feels so you can find it again.' },
    { n: 'Proud',       c: '#edd25a', body: 'Tall back, glowing chest.',                do: 'Tell someone about the thing you did!' },
    { n: 'Lonely',      c: '#434f64', body: 'Empty tummy, quiet thoughts.',             do: 'Reach out to one person today. Even a wave counts.' },
  ];
  const BODYMAP = [
    { id: 'head', n: 'Head and face', x: 50, y: 20, c: '#9ca32f', t: 'Everyone can see your face. But even here, you can say “no thank you” to a kiss or a touch you don’t like.' },
    { id: 'hands', n: 'Hands and arms', x: 72, y: 59, c: '#e35e26', t: 'Great for waving, high-fives and handshakes. You choose who you shake hands or hold hands with.' },
    { id: 'tummy', n: 'Tummy and back', x: 50, y: 48, c: '#653781', t: 'A tummy rub from a person you trust is okay. If a touch feels yucky, or you don’t want it, you can say stop.' },
    { id: 'private', n: 'Private parts', x: 50, y: 67, c: '#ac2929', t: 'The parts covered by your underwear or swimsuit: penis, testicles, vulva, vagina, bottom and chest. They’re private. Nobody should touch or look at them, except to help you stay healthy, like a doctor with a parent there, or a parent helping you wash when you’re little.' },
    { id: 'feet', n: 'Legs and feet', x: 50, y: 92, c: '#434f64', t: 'For running, jumping and kicking balls. Tickling is only fun when you’re laughing and both people can stop any time.' },
  ];
  const TIMELINE = {
    f: { label: 'Bodies with a uterus and ovaries', rows: [
      ['Breast buds start', 8, 13, 'Small tender lumps under the nipples. One side can start before the other, which is normal.'],
      ['Body and underarm hair', 8, 14, 'Hair grows under the arms and around the vulva. It’s fine to leave it or remove it; it’s your choice.'],
      ['Growth spurt', 9, 14, 'You grow taller quickly, often an inch or two a year. Hips widen.'],
      ['Sweat, smell and spots', 8, 14, 'Sweat glands wake up. Wash daily and wear clean clothes. Acne is common.'],
      ['First period', 9, 15, 'The average is about age 12. Cycles are often irregular for the first couple of years.'] ] },
    m: { label: 'Bodies with testicles and a penis', rows: [
      ['Testicles and penis grow', 9, 14, 'Testicles get bigger first, then the penis. They’re different sizes for everyone, and that’s normal.'],
      ['Body and pubic hair', 10, 15, 'Hair grows around the penis, under the arms and later on the face.'],
      ['Growth spurt', 11, 16, 'Boys usually grow fastest a bit later than girls do. Shoulders widen.'],
      ['Voice deepens', 11, 15, 'The voice box grows. Your voice may crack on the way to deeper.'],
      ['First wet dream', 11, 15, 'Semen can come out during sleep. It’s normal, and not wee.'],
      ['Sweat, smell and spots', 9, 15, 'Sweat glands wake up. Wash daily and wear clean clothes. Acne is common.'] ] },
  };
  const CYCLE = [
    { from: 1, to: 5, n: 'Period', c: '#ac2929', t: 'The thick lining of the uterus that wasn’t needed comes out through the vagina as blood. You may have cramps, feel tired or have a sore back. It lasts 3 to 7 days.' },
    { from: 6, to: 13, n: 'Egg ripening', c: '#ffcb05', t: 'Hormones tell an ovary to ripen an egg, and the uterus lining starts to rebuild. Many people feel more energetic around now.' },
    { from: 14, to: 14, n: 'Ovulation', c: '#e35e26', t: 'An ovary releases an egg. It travels down the fallopian tube for about a day. This is the time in the cycle when pregnancy is possible after sex.' },
    { from: 15, to: 28, n: 'Waiting', c: '#653781', t: 'If the egg isn’t fertilised, hormone levels fall. Some people feel moody, bloated or sore (PMS) before the next period starts.' },
  ];
  const ANAT = {
    f: [
      { n: 'Ovaries', x: 48, y: 132, t: 'Two small organs that store eggs and make hormones (estrogen and progesterone). Most months, one releases an egg.' },
      { n: 'Ovaries', x: 252, y: 132, t: 'Two small organs that store eggs and make hormones (estrogen and progesterone). Most months, one releases an egg.' },
      { n: 'Fallopian tubes', x: 92, y: 98, t: 'Thin tubes that carry an egg from an ovary toward the uterus. If sperm meets the egg, it usually happens here.' },
      { n: 'Fallopian tubes', x: 208, y: 98, t: 'Thin tubes that carry an egg from an ovary toward the uterus. If sperm meets the egg, it usually happens here.' },
      { n: 'Uterus (womb)', x: 150, y: 150, t: 'A muscular pouch where a baby can grow. Its lining is what comes out as a period.' },
      { n: 'Cervix', x: 150, y: 207, t: 'The narrow door between the uterus and the vagina. It opens wide during childbirth.' },
      { n: 'Vagina', x: 150, y: 246, t: 'A stretchy tube from the cervix to the outside. Period blood and babies leave through it. (The outside part you see is the vulva.)' },
    ],
    m: [
      { n: 'Bladder', x: 150, y: 58, t: 'Stores urine (wee). It sits above the sperm ducts, and urine and semen both leave through the same tube, the urethra, though never at the same time.' },
      { n: 'Sperm ducts', x: 116, y: 150, t: 'Tubes that carry sperm from each testicle up and around the bladder to join the urethra.' },
      { n: 'Penis', x: 150, y: 150, t: 'Used for urinating and for sex. An erection happens when the penis fills with blood. The urethra runs through the middle.' },
      { n: 'Testicles', x: 110, y: 236, t: 'Two glands that make sperm and the hormone testosterone. They hang outside because sperm need to be slightly cooler than body heat.' },
      { n: 'Testicles', x: 190, y: 236, t: 'Two glands that make sperm and the hormone testosterone. They hang outside because sperm need to be slightly cooler than body heat.' },
    ],
  };
  const CONTRA = [
    { n: 'Condom', how: 'A thin sheath worn on the penis that catches sperm and blocks fluids.', eff: [87, 98], sti: true, where: 'Chemists and shops. Free at government health centres.' },
    { n: 'The pill', how: 'A hormone tablet taken daily at the same time. It stops eggs being released.', eff: [93, 99], sti: false, where: 'Ask a doctor first. Some pills are available through government programmes.' },
    { n: 'Injection', how: 'A hormone injection every three months.', eff: [96, 99], sti: false, where: 'Doctors and government health centres.' },
    { n: 'Copper-T (IUD)', how: 'A tiny device a doctor places in the uterus. Works for years and can be removed any time.', eff: [99, 99], sti: false, where: 'A doctor or clinic fits and removes it.' },
    { n: 'Emergency pill', how: 'Taken after unprotected sex or a broken condom, as soon as possible and within 72 hours. Not a regular method.', eff: [0, 0], note: 'Lowers the risk; works best the sooner it is taken', sti: false, where: 'Chemists in India sell it.' },
    { n: 'Pulling out', how: 'Taking the penis out before ejaculation. Sperm can come out earlier, so it’s unreliable.', eff: [78, 96], note: 'About 20 in 100 get pregnant in a year', sti: false, where: 'Not recommended as a main method.' },
  ];
  return { EMOS, BODYMAP, TIMELINE, CYCLE, ANAT, CONTRA };
})();
