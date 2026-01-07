// how-fame-finds-you-quiz.js
// (Quiz 3) How would fame arrive? Viral moment, slow-burn reputation, accidental clip, etc.

const obj = {
  0: {
    question: "The first time your name spreads, it happens because:",
    options: [
      ["One short clip hits the algorithm perfectly.", ["ViralHit", "Fast", "Unplanned"]],
      ["People discover you slowly and then won’t shut up about you.", ["SlowBurn", "Slow", "Planned"]],
      ["Someone else posts you (tagged, filmed, quoted) and it takes off.", ["Captured", "Fast", "Unplanned"]],
      ["You intentionally drop something engineered to pop.", ["Launch", "Fast", "Planned"]]
    ]
  },

  1: {
    question: "Which scenario feels most believable for you?",
    options: [
      ["A messy, funny moment that strangers adopt as a meme.", ["ViralHit", "Unplanned", "Chaos"]],
      ["Consistent work builds a reputation until it becomes unavoidable.", ["SlowBurn", "Planned", "Control"]],
      ["A third party frames the story and you’re suddenly the main character.", ["Captured", "Unplanned", "Chaos"]],
      ["You build a rollout and people show up on purpose.", ["Launch", "Planned", "Control"]]
    ]
  },

  2: {
    question: "If fame arrives suddenly, your first reaction is:",
    options: [
      ["Adrenaline. This is thrilling.", ["Fast", "Open"]],
      ["Suspicion. What’s the angle?", ["Fast", "Guarded"]],
      ["Overwhelm. Too many eyes, too fast.", ["Fast", "Guarded"]],
      ["Curiosity. I want to see how far it goes.", ["Fast", "Open"]]
    ]
  },

  3: {
    question: "Your relationship with “putting yourself out there” is:",
    options: [
      ["I can do it when the moment feels real, not staged.", ["Unplanned", "Open"]],
      ["I prefer control and timing. I don’t do chaos launches.", ["Planned", "Control", "Guarded"]],
      ["I’ll post, but I don’t love the spotlight living on me.", ["Open", "Guarded"]],
      ["I’m comfortable being seen and judged in public.", ["Open", "Fast"]]
    ]
  },

  4: {
    question: "The thing you’d be most annoyed about if you went viral is:",
    options: [
      ["People missing the point and repeating the wrong part.", ["ViralHit", "Unplanned", "Misread"]],
      ["People acting like your success was “overnight.”", ["SlowBurn", "Planned", "Misread"]],
      ["A random stranger controlling the narrative about you.", ["Captured", "Unplanned", "Misread"]],
      ["People calling it “calculated” when you actually worked hard.", ["Launch", "Planned", "Misread"]]
    ]
  },

  5: {
    question: "If you *could* pick a path (even though real life ignores preferences), you’d choose:",
    options: [
      ["A quick explosion. Deal with it later.", ["ViralHit", "Fast", "Chaos"]],
      ["A steady climb. Let it compound.", ["SlowBurn", "Slow", "Control"]],
      ["A weird accident that becomes your origin story.", ["Captured", "Fast", "Unplanned"]],
      ["A deliberate launch where you control timing and framing.", ["Launch", "Planned", "Control"]]
    ]
  },

  6: {
    question: "Which feels most like you in a “spotlight moment”?",
    options: [
      ["Lean in, post more, ride it while it’s hot.", ["Fast", "Open", "Chaos"]],
      ["Go quiet, watch, let the noise pass.", ["Guarded", "Control", "Slow"]],
      ["Correct one thing, then disappear.", ["Control", "Guarded"]],
      ["Turn it into something bigger on purpose.", ["Planned", "Control", "Fast"]]
    ]
  }
};

// Tags for Quiz 3
const tags = {
  // Primary outcomes: how fame finds you
  ViralHit: 0,   // sudden, meme/clip, algorithm pop
  SlowBurn: 0,   // gradual reputation that compounds
  Captured: 0,   // you get filmed/quoted/tagged by others
  Launch: 0,     // intentional rollout / engineered visibility

  // Timing/agency axes
  Fast: 0,
  Slow: 0,
  Planned: 0,
  Unplanned: 0,

  // Secondary modifiers
  Control: 0,
  Chaos: 0,
  Guarded: 0,
  Open: 0,
  Misread: 0
};

function interpretResults() {
  // ----- pick dominant ORIGIN -----
  const originKeys = ["ViralHit", "SlowBurn", "Captured", "Launch"];
  let topOrigin = originKeys[0];
  originKeys.forEach(k => {
    if (tags[k] > tags[topOrigin]) topOrigin = k;
  });

  // total questions (used for % normalization)
  const totalQuestions = 7;

  // ----- axes -----
  // Speed: Fast vs Slow
  const speedScore = tags.Fast - tags.Slow; // approx -7 → +7
  let speedPct = Math.round(((speedScore + totalQuestions) / (totalQuestions * 2)) * 100);
  speedPct = Math.max(0, Math.min(speedPct, 100));

  // Agency: Planned vs Unplanned
  const agencyScore = tags.Planned - tags.Unplanned; // approx -7 → +7
  let agencyPct = Math.round(((agencyScore + totalQuestions) / (totalQuestions * 2)) * 100);
  agencyPct = Math.max(0, Math.min(agencyPct, 100));

  // Privacy posture: Guarded vs Open
  const privacyScore = tags.Guarded - tags.Open; // approx -7 → +7
  let privacyPct = Math.round(((privacyScore + totalQuestions) / (totalQuestions * 2)) * 100);
  privacyPct = Math.max(0, Math.min(privacyPct, 100));

  // ----- style adjective -----
  const isFast = speedPct >= 60;
  const isPlanned = agencyPct >= 60;
  const isGuarded = privacyPct >= 60;

  // A tight 4-way label (viral/shareable)
  let style;
  if (isFast && isPlanned) style = "Engineered";
  else if (isFast && !isPlanned) style = "Accidental";
  else if (!isFast && isPlanned) style = "Built";
  else style = "Drifted";

  // ----- display names -----
  const originNames = {
    ViralHit: "Viral Hit",
    SlowBurn: "Slow Burn",
    Captured: "Caught On Camera",
    Launch: "Planned Launch"
  };

  const personaTitle = `${style} ${originNames[topOrigin]}`;

  // ----- primary blurb -----
  const originBlurb = {
    ViralHit: "Your fame arrives like a flash, one moment catches, and the internet repeats it until it sticks.",
    SlowBurn: "Your fame accumulates. People discover you one by one, and the “everyone knows” moment shows up late.",
    Captured: "Your fame starts through other people’s lenses. You become a story before you get to narrate it.",
    Launch: "Your fame begins by design. You pick timing, framing, and momentum, at least at first."
  }[topOrigin];

  // ----- map axes to phrases (no % shown) -----
  const speedTone =
    speedPct >= 70 ? "very-fast" :
    speedPct >= 55 ? "fast" :
    speedPct >= 45 ? "mixed" :
    "slow";

  const agencyTone =
    agencyPct >= 70 ? "high-agency" :
    agencyPct >= 55 ? "guided" :
    agencyPct >= 45 ? "mixed" :
    "low-agency";

  const privacyTone =
    privacyPct >= 70 ? "guarded" :
    privacyPct >= 55 ? "selective" :
    privacyPct >= 45 ? "balanced" :
    "open";

  const speedPhrase = {
    "very-fast": "It hits hard and early. You’re dealing with scale before you’ve even blinked.",
    fast: "It accelerates quickly once the first spark lands.",
    mixed: "It starts uneven, slow, then sudden.",
    slow: "It builds over time. Less shock, more compounding."
  }[speedTone];

  const agencyPhrase = {
    "high-agency": "You try to steer the story, even when the crowd wants to remix it.",
    guided: "You influence the direction, but you don’t control the weather.",
    mixed: "Some parts are intentional. Some parts happen around you.",
    "low-agency": "The story moves without your permission, and you’re reacting more than directing."
  }[agencyTone];

  const privacyPhrase = {
    guarded: "You keep access tight. You’ll go quiet before you let the internet get too comfortable.",
    selective: "You share in controlled doses: enough to feel real, not enough to be easy to box in.",
    balanced: "You reveal some, hide some. You adjust depending on the moment.",
    open: "You’re readable. The audience feels close to you fast, for better and for chaos."
  }[privacyTone];

  const para1 = `${originBlurb} ${speedPhrase} ${agencyPhrase} ${privacyPhrase}`;

  const twistHint = {
    ViralHit: "Plot twist: people may try to define you by the first clip instead of your full range.",
    SlowBurn: "Plot twist: once momentum arrives, people may expect constant output.",
    Captured: "Plot twist: you might end up living inside someone else’s framing of you.",
    Launch: "Plot twist: people may call it “calculated,” even when it’s just preparation."
  }[topOrigin];

  const para2 = `${twistHint} Next up: how long the attention feels fun once it’s not new anymore.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByOrigin = {
    ViralHit: "rgb(200, 90, 90)",
    SlowBurn: "rgb(0, 170, 140)",
    Captured: "rgb(200, 170, 90)",
    Launch: "rgb(90, 120, 200)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByOrigin[topOrigin] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Fame Origins";
