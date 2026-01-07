// celebrity-arc-quiz.js
// (Quiz 26) What kind of visibility trajectory would you actually live?
// PHASE 6 — LONG-TERM OUTCOMES (deep water, full synthesis)

const obj = {
  0: {
    question: "Your first big break hits. What’s the most realistic way you respond over the next year?",
    options: [
      ["I build slowly and consistently. I’m not trying to spike — I’m trying to last.", ["SteadyArc", "LongGame", "Disciplined"]],
      ["I ride momentum hard while it’s hot. I can rest later.", ["VolatileArc", "Intensity", "MomentumChaser"]],
      ["I spike fast from one moment, then struggle to repeat it.", ["BriefArc", "PeakMoment", "Unstable"]],
      ["I stay visible, but quietly. I keep my life intact while I grow.", ["QuietArc", "Protected", "LongGame"]]
    ]
  },

  1: {
    question: "When attention starts fading (because it always does), you’re most likely to:",
    options: [
      ["Adjust and keep producing. Consistency beats hype.", ["SteadyArc", "Disciplined", "Resilient"]],
      ["Escalate or reinvent aggressively to get it back.", ["VolatileArc", "Intensity", "Reinvention"]],
      ["Feel unanchored. I don’t know what to do without the spike.", ["BriefArc", "FragileIdentity", "Unstable"]],
      ["Let it fade on purpose. I don’t want to live chasing it.", ["QuietArc", "Protected", "NeedsPrivacy"]]
    ]
  },

  2: {
    question: "Your relationship to publicity is best described as:",
    options: [
      ["A tool. I can work it without letting it take over.", ["SteadyArc", "Control", "LongGame"]],
      ["Fuel. I perform better when the volume is high.", ["VolatileArc", "ThrivesOnFeedback", "Intensity"]],
      ["A distraction. It throws me off more than I admit.", ["BriefArc", "Sensitive", "Overloaded"]],
      ["A cost. I’ll pay it only in small, controlled doses.", ["QuietArc", "Boundary", "Protected"]]
    ]
  },

  3: {
    question: "If you had to choose a pattern you’d likely repeat, it would be:",
    options: [
      ["Stable output, steady growth, fewer dramatic spikes.", ["SteadyArc", "LongGame", "Disciplined"]],
      ["Big waves: high highs, low lows, reinvention cycles.", ["VolatileArc", "Reinvention", "Unstable"]],
      ["One iconic peak that people bring up forever.", ["BriefArc", "PeakMoment", "LegacyCompressed"]],
      ["A niche lane with loyal people, not maximum scale.", ["QuietArc", "Protected", "NicheBuilt"]]
    ]
  },

  4: {
    question: "The thing most likely to disrupt your trajectory is:",
    options: [
      ["Over-commitment that makes the pace hard to keep.", ["VolatileArc", "Overdrive", "NeedsRecovery"]],
      ["One public mistake becoming the headline.", ["BriefArc", "FragileIdentity", "RiskSensitive"]],
      ["Boredom with repetition and obligation.", ["QuietArc", "NeedsPrivacy", "Boundary"]],
      ["Nothing dramatic — just the slow grind of staying consistent.", ["SteadyArc", "Disciplined", "Resilient"]]
    ]
  },

  5: {
    question: "How do you handle success internally?",
    options: [
      ["I stay grounded. I can enjoy it without turning it into identity.", ["SteadyArc", "Grounded", "Resilient"]],
      ["It turns into hunger. I want more — faster.", ["VolatileArc", "Intensity", "MomentumChaser"]],
      ["It feels surreal. I’m not sure I can hold it.", ["BriefArc", "Overloaded", "Sensitive"]],
      ["I compartmentalize. Success lives in one box, life lives in another.", ["QuietArc", "Protected", "Boundary"]]
    ]
  },

  6: {
    question: "Your most realistic “public image” over time would be:",
    options: [
      ["Reliable. People know what I do and trust it.", ["SteadyArc", "LongGame", "Control"]],
      ["Unpredictable. I’m always shifting and people keep watching.", ["VolatileArc", "Reinvention", "Intensity"]],
      ["Mythic-but-limited. One moment becomes the headline.", ["BriefArc", "LegacyCompressed", "PeakMoment"]],
      ["Low-access. People know *of* me more than they know me.", ["QuietArc", "NeedsPrivacy", "Protected"]]
    ]
  },

  7: {
    question: "When you imagine “history” looking at you, which outcome feels most likely?",
    options: [
      ["A steady career that quietly outlasted louder people.", ["SteadyArc", "LongGame", "Resilient"]],
      ["A dramatic arc with reinventions and public phases.", ["VolatileArc", "Intensity", "Unstable"]],
      ["A short, bright run people romanticize forever.", ["BriefArc", "PeakMoment", "LegacyCompressed"]],
      ["A sustained niche presence with strong boundaries.", ["QuietArc", "NicheBuilt", "Protected"]]
    ]
  }
};

// Fame-native tags for Quiz 26
const tags = {
  SteadyArc: 0,
  VolatileArc: 0,
  BriefArc: 0,
  QuietArc: 0,

  LongGame: 0,
  Intensity: 0,

  Disciplined: 0,
  Resilient: 0,

  MomentumChaser: 0,
  Reinvention: 0,
  Overdrive: 0,

  PeakMoment: 0,
  LegacyCompressed: 0,
  FragileIdentity: 0,
  RiskSensitive: 0,

  Protected: 0,
  Boundary: 0,
  NeedsPrivacy: 0,
  NicheBuilt: 0,

  Control: 0,
  ThrivesOnFeedback: 0,

  Grounded: 0,
  Sensitive: 0,
  Overloaded: 0,

  Unstable: 0,
  NeedsRecovery: 0
};

function interpretResults() {
  const outcomeKeys = ["SteadyArc", "VolatileArc", "BriefArc", "QuietArc"];
  let top = outcomeKeys[0];
  outcomeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 8;

  // Longevity: LongGame vs Intensity
  const longScore = tags.LongGame - tags.Intensity;
  let longPct = Math.round(((longScore + totalQuestions) / (totalQuestions * 2)) * 100);
  longPct = Math.max(0, Math.min(longPct, 100));

  // Smoothness: Disciplined/Resilient/Grounded vs Unstable/Overdrive/Overloaded
  const stableScore =
    (tags.Disciplined + tags.Resilient + tags.Grounded) -
    (tags.Unstable + tags.Overdrive + tags.Overloaded);
  let stablePct = Math.round(((stableScore + totalQuestions) / (totalQuestions * 4)) * 100);
  stablePct = Math.max(0, Math.min(stablePct, 100));

  // Access: Protected/Boundary/NeedsPrivacy vs ThrivesOnFeedback/Intensity
  const accessScore =
    (tags.Protected + tags.Boundary + tags.NeedsPrivacy) -
    (tags.ThrivesOnFeedback + tags.Intensity);
  let accessPct = Math.round(((accessScore + totalQuestions) / (totalQuestions * 3)) * 100);
  accessPct = Math.max(0, Math.min(accessPct, 100));

  const isLong = longPct >= 60;
  const isStable = stablePct >= 60;
  const isHighAccessProtection = accessPct >= 60;

  let style;
  if (isLong && isStable) style = "Durable";
  else if (!isLong && isStable) style = "High-Voltage";
  else if (isHighAccessProtection) style = "Low-Access";
  else style = "Storm-Path";

  const outcomeNames = {
    SteadyArc: "Steady Arc",
    VolatileArc: "Volatile Arc",
    BriefArc: "Brief Arc",
    QuietArc: "Quiet Arc"
  };

  const personaTitle = `${style} ${outcomeNames[top]}`;

  const outcomeBlurb = {
    SteadyArc:
      "Your most likely trajectory is steady. You’d build over time through consistency, repetition, and slow compounding.",
    VolatileArc:
      "Your most likely trajectory is wave-shaped. You’d move through intense phases, reinventions, and big visibility swings.",
    BriefArc:
      "Your most likely trajectory is brief-but-bright. One peak moment could define you, and repeating it may be harder than it looks.",
    QuietArc:
      "Your most likely trajectory is quiet-but-enduring. You’d stay low-access, keep clear boundaries, and grow a loyal lane instead of chasing maximum scale."
  }[top];

  const longTone =
    longPct >= 70 ? "longevity" :
    longPct >= 55 ? "mostly-longevity" :
    longPct >= 45 ? "mixed" :
    "intensity";

  const stableTone =
    stablePct >= 70 ? "smooth" :
    stablePct >= 55 ? "mostly-smooth" :
    stablePct >= 45 ? "mixed" :
    "chaotic";

  const accessTone =
    accessPct >= 70 ? "low-access" :
    accessPct >= 55 ? "guarded" :
    accessPct >= 45 ? "mixed" :
    "high-access";

  const longPhrase = {
    longevity: "You naturally optimize for a longer run over quick spikes.",
    "mostly-longevity": "You lean long-game, as long as life doesn’t turn into a constant chase.",
    mixed: "You’re split: part of you wants steadiness, part wants the spike.",
    intensity: "You’d pick the spike. Momentum feels more natural than slow compounding."
  }[longTone];

  const stablePhrase = {
    smooth: "You handle long cycles with a steadier rhythm than most.",
    "mostly-smooth": "You can hold a long run, but you’ll still want resets and limits.",
    mixed: "You can keep it together… until a few messy weeks stack up.",
    chaotic: "Without guardrails, the pace would get messy fast."
  }[stableTone];

  const accessPhrase = {
    "low-access": "You’d keep access tight — you don’t want the crowd inside your life.",
    guarded: "You do best with controlled engagement and predictable rhythms.",
    mixed: "Sometimes open, sometimes retreat. Your openness would shift by season.",
    "high-access": "You tolerate high access better than most, even when it gets noisy."
  }[accessTone];

  const para1 = `${outcomeBlurb} ${longPhrase} ${stablePhrase} ${accessPhrase}`;

  const forwardHook = {
    SteadyArc: "Next: intensity vs longevity — what arc would you choose on purpose?",
    VolatileArc: "Next: intensity vs longevity — because waves often come from choosing heat over time.",
    BriefArc: "Next: intensity vs longevity — because a bright peak can be a choice, not an accident.",
    QuietArc: "Next: intensity vs longevity — because staying low-access is its own trade-off."
  }[top];

  const description = `${para1}<br><br>${forwardHook}`.trim();

  const colorByOutcome = {
    SteadyArc: "rgb(0, 170, 140)",
    VolatileArc: "rgb(200, 170, 90)",
    BriefArc: "rgb(200, 90, 90)",
    QuietArc: "rgb(90, 120, 200)"
  };

  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByOutcome[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Celebrity Arc";
