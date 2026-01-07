// what-would-you-be-famous-for-quiz.js

const obj = {
  0: {
    question: "People can’t summarize you accurately, so they pick the easiest headline. It’s usually:",
    options: [
      ["“They’re insanely good at that one thing.”", ["Craft", "Admiration", "Fixation"]],
      ["“They’re… a lot. You have to experience them.”", ["Aura", "Fixation", "Admiration"]],
      ["“They always say the thing everyone’s scared to say.”", ["Conviction", "Debate", "Admiration"]],
      ["“Remember when that happened?”", ["Moment", "Fixation", "Misunderstood"]],
      ["“Yeah… people have opinions about them.”", ["Controversy", "Debate", "Fixation"]]
    ]
  },

  1: {
    question: "If strangers had one clip of you and nothing else, you’d want it to show:",
    options: [
      ["Competence. Proof. Something undeniable.", ["Craft", "Admiration"]],
      ["Presence. Vibe. The “who IS that?” factor.", ["Aura", "Fixation"]],
      ["Clarity. A point that lands hard.", ["Conviction", "Debate"]],
      ["A weird, human moment that people replay.", ["Moment", "Fixation"]],
      ["A bold take that splits the room.", ["Controversy", "Debate"]]
    ]
  },

  2: {
    question: "Compliments feel best when they sound like:",
    options: [
      ["“You’re the real deal.”", ["Craft", "Admiration"]],
      ["“You’re iconic.”", ["Aura", "Admiration", "Fixation"]],
      ["“You’re right, and people hate that.”", ["Conviction", "Admiration", "Debate"]],
      ["“That moment was everything.”", ["Moment", "Admiration"]],
      ["“You’re fearless… or wild. Not sure.”", ["Controversy", "Debate", "Misunderstood"]]
    ]
  },

  3: {
    question: "The fastest way people would misunderstand you is by assuming you’re:",
    options: [
      ["A natural genius at everything (I’m not).", ["Craft", "Misunderstood"]],
      ["Cold or arrogant (I’m just private).", ["Aura", "Misunderstood"]],
      ["Angry (I just care and I’m direct).", ["Conviction", "Misunderstood", "Debate"]],
      ["Trying to go viral (it was accidental).", ["Moment", "Misunderstood"]],
      ["A villain (I’m just not polite about it).", ["Controversy", "Misunderstood", "Debate"]]
    ]
  },

  4: {
    question: "At scale, the thing people would quote back at you the most is:",
    options: [
      ["Your work. Receipts. Numbers. Results.", ["Craft", "Fixation"]],
      ["Your tone. Your look. Your micro-expressions.", ["Aura", "Fixation"]],
      ["Your statements. People arguing your exact words.", ["Conviction", "Debate", "Fixation"]],
      ["That one story. That one incident. That one day.", ["Moment", "Fixation"]],
      ["The “problematic” thing you did/said (forever).", ["Controversy", "Debate", "Fixation"]]
    ]
  },

  5: {
    question: "If your name started trending right now, you’d assume it’s because:",
    options: [
      ["You delivered something impressive and it spread.", ["Craft", "Admiration"]],
      ["People got obsessed with your vibe and aesthetic.", ["Aura", "Fixation"]],
      ["You said something that hit a nerve (on purpose).", ["Conviction", "Debate"]],
      ["Something happened to you and people latched on.", ["Moment", "Misunderstood"]],
      ["You got pulled into a controversy (fair or not).", ["Controversy", "Debate", "Misunderstood"]]
    ]
  },

  6: {
    question: "Which kind of public memory feels most likely (not most flattering)?",
    options: [
      ["“They were exceptional at what they did.”", ["Craft", "Admiration"]],
      ["“They had that rare aura.”", ["Aura", "Admiration"]],
      ["“They stood for something, loudly.”", ["Conviction", "Debate"]],
      ["“They were the person from that moment.”", ["Moment", "Fixation"]],
      ["“They were always in the discourse.”", ["Controversy", "Debate", "Fixation"]]
    ]
  }
};

// Fame-native tags
const tags = {
  // Primary outcomes: what you’re "known for"
  Craft: 0,        // skill / excellence
  Aura: 0,         // personality / vibe
  Conviction: 0,   // belief / stance
  Moment: 0,       // event / story
  Controversy: 0,  // discourse / conflict

  // Secondary modifiers: the flavor of attention
  Admiration: 0,
  Debate: 0,
  Fixation: 0,
  Misunderstood: 0
};

function interpretResults() {
  // ----- pick dominant "KNOWN FOR" -----
  const fameKeys = ["Craft", "Aura", "Conviction", "Moment", "Controversy"];
  let top = fameKeys[0];
  fameKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  // ----- axes: Admiration vs Debate, Fixation vs Misunderstood -----
  const totalQuestions = 7;

  const admirationScore = tags.Admiration - tags.Debate;          // approx -7 → +7
  const clarityScore = tags.Fixation - tags.Misunderstood;        // approx -7 → +7

  let admirationPct = Math.round(((admirationScore + totalQuestions) / (totalQuestions * 2)) * 100);
  let clarityPct = Math.round(((clarityScore + totalQuestions) / (totalQuestions * 2)) * 100);

  admirationPct = Math.max(0, Math.min(admirationPct, 100));
  clarityPct = Math.max(0, Math.min(clarityPct, 100));

  // ----- style adjective (shareable, no % shown) -----
  // admiration high = "Loved" energy; debate high = "Contested" energy
  // fixation high = "Magnetic" memory; misunderstood high = "Misread" memory
  const isAdmired = admirationPct >= 60;
  const isClear = clarityPct >= 60; // clear meaning people fixate more than they misread

  let style;
  if (isAdmired && isClear) style = "Celebrated";
  else if (isAdmired && !isClear) style = "Misunderstood";
  else if (!isAdmired && isClear) style = "Polarizing";
  else style = "Contentious";

  const knownForNames = {
    Craft: "Skill",
    Aura: "Presence",
    Conviction: "Belief",
    Moment: "Moment",
    Controversy: "Controversy"
  };

  const personaTitle = `${style} ${knownForNames[top]}`;

  const knownForBlurb = {
    Craft: "People remember you for competence that shows. Not potential, proof.",
    Aura: "People remember you for the vibe you leave in a room. You become a reference point.",
    Conviction: "People remember you for what you stand for. You don’t blur your edges to be liked.",
    Moment: "People remember you for a specific story. The internet turns one chapter into your cover.",
    Controversy: "People remember you for discourse. Even your neutral days get interpreted as a statement."
  }[top];

  const admirationTone =
    admirationPct >= 70 ? "admired" :
    admirationPct >= 55 ? "mostly-admired" :
    admirationPct >= 45 ? "mixed" :
    "debated";

  const clarityTone =
    clarityPct >= 70 ? "fixated" :
    clarityPct >= 55 ? "sticky" :
    clarityPct >= 45 ? "split" :
    "misread";

  const admirationPhrase = {
    admired: "Your attention leans admiration-first. People want to credit you, not litigate you.",
    "mostly-admired": "Most people like you, a smaller, louder slice tries to argue you into a box.",
    mixed: "You get praise and pushback in the same breath. Depends who’s watching.",
    debated: "Your attention leans debate-first. People don’t just watch, they take positions."
  }[admirationTone];

  const clarityPhrase = {
    fixated: "The memory is sticky. People replay you, quote you, and build lore around details.",
    sticky: "You leave a strong imprint. Even small moments get saved and reshared.",
    split: "Some people fixate, others misread. Same signal, different stories.",
    misread: "You get misinterpreted fast. People project motives you didn’t have."
  }[clarityTone];

  const para1 = `${knownForBlurb} ${admirationPhrase} ${clarityPhrase}`;

  const forwardHook = {
    Craft: "The real risk: becoming ‘the standard’ and never being allowed to be average again.",
    Aura: "The real risk: people feeling entitled to you because they think they “get” you.",
    Conviction: "The real risk: being turned into a symbol instead of a person.",
    Moment: "The real risk: living in the shadow of your own highlight (or lowlight).",
    Controversy: "The real risk: the internet rewarding your heat and punishing your nuance."
  }[top];

  const para2 = `${forwardHook} Keep going, the next quizzes map how fame finds you and how long it stays fun.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByKnownFor = {
    Craft: "rgb(0, 170, 140)",
    Aura: "rgb(170, 120, 220)",
    Conviction: "rgb(90, 120, 200)",
    Moment: "rgb(200, 170, 90)",
    Controversy: "rgb(200, 90, 90)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByKnownFor[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Fame Origin";
