// burn-bright-or-last-quiz.js
// (Quiz 27) Do you prefer intensity or staying power?
// PHASE 6, LONG-TERM OUTCOMES (deep water, full synthesis)

const obj = {
  0: {
    question: "If you could choose your visibility arc, you’d rather have:",
    options: [
      ["A huge, explosive peak even if it fades quickly.", ["BurnBright", "Intensity", "HighRisk"]],
      ["A smaller rise that stays relevant for years.", ["LastLong", "Longevity", "LowRisk"]],
      ["A few intense seasons, followed by long quiet stretches.", ["Hybrid", "Cycles", "Recovery"]],
      ["No clear peak, just steady presence over time.", ["LastLong", "Longevity", "Steady"]]
    ]
  },

  1: {
    question: "What feels like the tougher trade-off?",
    options: [
      ["Never hitting a major peak, even if things are stable.", ["BurnBright", "StatusHunger", "Intensity"]],
      ["Hitting a peak and then falling out of the spotlight.", ["LastLong", "StabilityNeed", "Longevity"]],
      ["Constantly reinventing to stay visible.", ["LastLong", "StabilityNeed", "Boundary"]],
      ["Only being visible in short bursts.", ["BurnBright", "Intensity", "AllOrNothing"]]
    ]
  },

  2: {
    question: "You’re offered a deal: instant massive exposure, but it likely shortens your run. You:",
    options: [
      ["Take it. Big moments are worth the trade.", ["BurnBright", "HighRisk", "MomentumChaser"]],
      ["Pass. You’d rather build something durable.", ["LastLong", "LowRisk", "Disciplined"]],
      ["Take it, but only with clear limits and a plan.", ["Hybrid", "Control", "Boundary"]],
      ["Hesitate, the trade-off doesn’t feel worth it.", ["LastLong", "StabilityNeed", "RiskSensitive"]]
    ]
  },

  3: {
    question: "Which style sounds most like you?",
    options: [
      ["I can run hot for a while if the moment is right.", ["BurnBright", "Intensity", "Overdrive"]],
      ["I prefer consistency and rhythm.", ["LastLong", "Longevity", "StabilityNeed"]],
      ["I like sprints with real downtime in between.", ["Hybrid", "Cycles", "Recovery"]],
      ["I’d rather keep visibility low overall.", ["Withdraw", "Boundary", "NeedsPrivacy"]]
    ]
  },

  4: {
    question: "If attention started fading, your instinct would be to:",
    options: [
      ["Go bigger and shake things up.", ["BurnBright", "Intensity", "Reinvention"]],
      ["Keep working steadily and let momentum build.", ["LastLong", "Longevity", "Disciplined"]],
      ["Adjust course without panic.", ["Hybrid", "Control", "Cycles"]],
      ["Step back. You’re not chasing the crowd.", ["Withdraw", "NeedsPrivacy", "Boundary"]]
    ]
  },

  5: {
    question: "Which long-term reputation sounds best?",
    options: [
      ["A brief era people still remember.", ["BurnBright", "AllOrNothing", "MythicPeak"]],
      ["A long run with consistent respect.", ["LastLong", "Steady", "Longevity"]],
      ["A career with chapters: peaks, pauses, returns.", ["Hybrid", "Cycles", "Resilient"]],
      ["A low-profile life where visibility never took over.", ["Withdraw", "NeedsPrivacy", "Protected"]]
    ]
  },

  6: {
    question: "Which statement feels closest to how you see relevance?",
    options: [
      ["If you’re not rising, you’re slipping.", ["BurnBright", "StatusHunger", "Intensity"]],
      ["Consistency matters more than spikes.", ["LastLong", "Disciplined", "Longevity"]],
      ["Relevance comes in waves, ride them.", ["Hybrid", "Cycles", "Control"]],
      ["Relevance is optional. Freedom matters more.", ["Withdraw", "NeedsPrivacy", "Boundary"]]
    ]
  },

  7: {
    question: "If you had to accept one cost, you’d choose:",
    options: [
      ["Short-term overload for a big moment.", ["BurnBright", "HighRisk", "Overdrive"]],
      ["Slow progress for staying power.", ["LastLong", "Longevity", "LowRisk"]],
      ["Ongoing adjustment for balance.", ["Hybrid", "Control", "Recovery"]],
      ["Lower visibility for independence.", ["Withdraw", "NeedsPrivacy", "Boundary"]]
    ]
  }
};

// Fame-native tags for Quiz 27
const tags = {
  BurnBright: 0,
  LastLong: 0,
  Hybrid: 0,
  Withdraw: 0,

  Intensity: 0,
  Longevity: 0,

  HighRisk: 0,
  LowRisk: 0,
  RiskSensitive: 0,

  StatusHunger: 0,
  StabilityNeed: 0,

  MomentumChaser: 0,
  Disciplined: 0,

  Control: 0,
  Boundary: 0,
  NeedsPrivacy: 0,
  Protected: 0,

  Cycles: 0,
  Recovery: 0,

  Overdrive: 0,
  Reinvention: 0,

  AllOrNothing: 0,
  Steady: 0,
  Resilient: 0,

  MythicPeak: 0
};

function interpretResults() {
  const outcomeKeys = ["BurnBright", "LastLong", "Hybrid", "Withdraw"];
  let top = outcomeKeys[0];
  outcomeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 8;

  const horizonScore = tags.Longevity - tags.Intensity;
  let horizonPct = Math.round(((horizonScore + totalQuestions) / (totalQuestions * 2)) * 100);
  horizonPct = Math.max(0, Math.min(horizonPct, 100));

  const riskScore = tags.LowRisk - tags.HighRisk;
  let riskPct = Math.round(((riskScore + totalQuestions) / (totalQuestions * 2)) * 100);
  riskPct = Math.max(0, Math.min(riskPct, 100));

  const boundaryScore = (tags.NeedsPrivacy + tags.Boundary) - (tags.MomentumChaser + tags.Overdrive);
  let boundaryPct = Math.round(((boundaryScore + totalQuestions) / (totalQuestions * 3)) * 100);
  boundaryPct = Math.max(0, Math.min(boundaryPct, 100));

  const isLong = horizonPct >= 60;
  const isLowRisk = riskPct >= 60;
  const isHighBoundary = boundaryPct >= 60;

  let style;
  if (!isLong && !isLowRisk) style = "High-Heat";
  else if (isLong && isLowRisk) style = "Long-Game";
  else if (isHighBoundary) style = "Protected";
  else style = "Seasonal";

  const outcomeNames = {
    BurnBright: "Burn Bright",
    LastLong: "Last",
    Hybrid: "Chapters",
    Withdraw: "Opt-Out"
  };

  const personaTitle = `${style} ${outcomeNames[top]}`;

  const outcomeBlurb = {
    BurnBright:
      "You’re drawn to big moments and high visibility, even if the window is shorter.",
    LastLong:
      "You prefer steady relevance over dramatic spikes, even if growth is slower.",
    Hybrid:
      "You like working in chapters, intensity balanced with downtime.",
    Withdraw:
      "You value independence and space more than staying visible at all costs."
  }[top];

  const horizonPhrase =
    horizonPct >= 60
      ? "You tend to prioritize staying power over flash."
      : "You’re comfortable trading longevity for momentum.";

  const riskPhrase =
    riskPct >= 60
      ? "You favor smoother paths over sharp swings."
      : "You’re open to volatility if the upside feels worth it.";

  const boundaryPhrase =
    boundaryPct >= 60
      ? "Clear limits around visibility matter to you."
      : "You can sit in the spotlight longer than most.";

  const description = `${outcomeBlurb} ${horizonPhrase} ${riskPhrase} ${boundaryPhrase}`;

  const colorByOutcome = {
    BurnBright: "rgb(200, 90, 90)",
    LastLong: "rgb(0, 170, 140)",
    Hybrid: "rgb(90, 120, 200)",
    Withdraw: "rgb(120, 120, 140)"
  };

  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByOutcome[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Burn Bright or Last";
