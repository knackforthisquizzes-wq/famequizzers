// changing-yourself-for-fame-quiz.js
// (Quiz 22) What would you be willing to change to stay relevant?
// PHASE 5, ATTENTION AS POWER (celebrity becomes force)

const obj = {
  0: {
    question: "A platform shift happens and your old style stops performing. To stay visible, you would:",
    options: [
      ["Adapt fast. Relevance is a moving target.", ["Adapter", "FlexibleIdentity", "PerformanceDriven"]],
      ["Adjust slightly, but keep my core voice.", ["BoundaryKeeper", "SelectiveChange", "IntegrityFirst"]],
      ["Hold my style. I’d rather shrink than fake it.", ["Anchor", "IntegrityFirst", "CoreStable"]],
      ["Pause and wait it out. Too many changes at once.", ["Drift", "Overloaded", "NeedsRecovery"]]
    ]
  },

  1: {
    question: "Your team says: “We need a cleaner, more marketable version of you.” Your reaction is:",
    options: [
      ["Sure. Packaging is part of the game.", ["Adapter", "Brandable", "PerformanceDriven"]],
      ["Only if it’s still me. No made-up persona.", ["BoundaryKeeper", "IntegrityFirst", "Boundary"]],
      ["Hard no. I’m not a product line.", ["Anchor", "Boundary", "ResistsControl"]],
      ["I’d start editing everything before I even speak.", ["Drift", "PeoplePleasing", "Overloaded"]]
    ]
  },

  2: {
    question: "You find yourself editing your opinions to avoid backlash. That feels like:",
    options: [
      ["Strategy. I don’t have to share everything.", ["Adapter", "Control", "Pragmatic"]],
      ["Fine in moderation, as long as I’m not pretending.", ["BoundaryKeeper", "SelectiveChange", "Control"]],
      ["Too costly. I’d rather take the hit than perform a lie.", ["Anchor", "IntegrityFirst", "ResistsControl"]],
      ["Like I’m slowly sanding off my edges.", ["Drift", "Overloaded", "NeedsPrivacy"]]
    ]
  },

  3: {
    question: "A new trend would boost your reach, but it’s not really you. You:",
    options: [
      ["Do it anyway. You can’t be precious about branding.", ["Adapter", "PerformanceDriven", "FlexibleIdentity"]],
      ["Try a version that still fits you.", ["BoundaryKeeper", "SelectiveChange", "Pragmatic"]],
      ["Skip it. If it’s fake, it’s not worth it.", ["Anchor", "CoreStable", "IntegrityFirst"]],
      ["Go back and forth until the moment passes.", ["Drift", "Overloaded", "PeoplePleasing"]]
    ]
  },

  4: {
    question: "Your appearance becomes part of your brand. The pressure to look a certain way makes you:",
    options: [
      ["Optimize. It’s part of the package.", ["Adapter", "Brandable", "ThickSkin"]],
      ["Keep standards, but I won’t chase perfection.", ["BoundaryKeeper", "Boundary", "Control"]],
      ["Annoyed. My body shouldn’t be a business asset.", ["Anchor", "NeedsPrivacy", "ResistsControl"]],
      ["Hyper-aware in public. Like I’m always being watched.", ["Drift", "Sensitive", "Overloaded"]]
    ]
  },

  5: {
    question: "Your audience starts rewarding a more extreme version of you. You’re tempted to lean into it because:",
    options: [
      ["Momentum matters. I can steer it later.", ["Adapter", "PerformanceDriven", "RiskTaker"]],
      ["Only if it’s still honest.", ["BoundaryKeeper", "IntegrityFirst", "SelectiveChange"]],
      ["Nope. Extremes turn into cages.", ["Anchor", "CoreStable", "Boundary"]],
      ["Maybe… and then I’d regret it later.", ["Drift", "PeoplePleasing", "Overloaded"]]
    ]
  },

  6: {
    question: "People say they miss the “old you.” Your move is:",
    options: [
      ["Keep evolving. Nostalgia isn’t my boss.", ["Adapter", "FlexibleIdentity", "ThickSkin"]],
      ["Explain it once, then move on.", ["BoundaryKeeper", "Control", "ThickSkin"]],
      ["Return to my core. I don’t want to become a brand ghost.", ["Anchor", "CoreStable", "IntegrityFirst"]],
      ["Overthink it for days.", ["Drift", "Sensitive", "PeoplePleasing"]]
    ]
  },

  7: {
    question: "Which sentence is closest to your boundary?",
    options: [
      ["I’ll change format, delivery, and style—whatever it takes.", ["Adapter", "PerformanceDriven", "FlexibleIdentity"]],
      ["I’ll adapt, but I won’t betray my values.", ["BoundaryKeeper", "IntegrityFirst", "Boundary"]],
      ["I won’t trade my identity for relevance.", ["Anchor", "CoreStable", "IntegrityFirst"]],
      ["I’m not sure. I’d end up building myself around feedback.", ["Drift", "Overloaded", "NeedsRecovery"]]
    ]
  }
};

// Fame-native tags for Quiz 22
const tags = {
  // Primary outcomes: relationship to change under fame-pressure
  Adapter: 0,        // changes readily to keep relevance
  BoundaryKeeper: 0, // adapts, but with strong lines
  Anchor: 0,         // refuses self-distortion; core-first
  Drift: 0,          // vulnerable to self-erasure / stress spiral

  // Secondary modifiers: what drives the change (or resistance)
  FlexibleIdentity: 0,
  SelectiveChange: 0,
  CoreStable: 0,

  PerformanceDriven: 0,
  IntegrityFirst: 0,
  Pragmatic: 0,

  Boundary: 0,
  Control: 0,
  ResistsControl: 0,

  ThickSkin: 0,
  Sensitive: 0,

  PeoplePleasing: 0,
  Overloaded: 0,
  NeedsPrivacy: 0,
  NeedsRecovery: 0,

  RiskTaker: 0
};

function interpretResults() {
  // ----- pick dominant outcome -----
  const outcomeKeys = ["Adapter", "BoundaryKeeper", "Anchor", "Drift"];
  let top = outcomeKeys[0];
  outcomeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 8;

  // ----- axes -----
  // Flexibility: FlexibleIdentity vs CoreStable
  const flexScore = tags.FlexibleIdentity - tags.CoreStable; // approx -8 → +8
  let flexPct = Math.round(((flexScore + totalQuestions) / (totalQuestions * 2)) * 100);
  flexPct = Math.max(0, Math.min(flexPct, 100));

  // Integrity: IntegrityFirst vs PerformanceDriven
  const integrityScore = tags.IntegrityFirst - tags.PerformanceDriven; // approx -8 → +8
  let integrityPct = Math.round(((integrityScore + totalQuestions) / (totalQuestions * 2)) * 100);
  integrityPct = Math.max(0, Math.min(integrityPct, 100));

  // Stability: Control/ThickSkin vs Overloaded/PeoplePleasing/Sensitive
  const stabilityScore = (tags.Control + tags.ThickSkin) - (tags.Overloaded + tags.PeoplePleasing + tags.Sensitive); // wider range
  let stabilityPct = Math.round(((stabilityScore + totalQuestions) / (totalQuestions * 3)) * 100);
  stabilityPct = Math.max(0, Math.min(stabilityPct, 100));

  // ----- style adjective (shareable, no % shown) -----
  const isHighFlex = flexPct >= 60;
  const isHighIntegrity = integrityPct >= 60;
  const isLowStability = stabilityPct <= 40;

  let style;
  if (isHighFlex && !isHighIntegrity) style = "Shapeshifter";
  else if (isHighFlex && isHighIntegrity) style = "Adaptive-Real";
  else if (!isHighFlex && isHighIntegrity) style = "Unbought";
  else if (isLowStability) style = "Self-Eroding";
  else style = "Split-Track";

  const outcomeNames = {
    Adapter: "Adapter",
    BoundaryKeeper: "Boundary Keeper",
    Anchor: "Anchor",
    Drift: "Drift"
  };

  const personaTitle = `${style} ${outcomeNames[top]}`;

  const outcomeBlurb = {
    Adapter:
      "You’d change a lot to stay relevant. You treat your public image as flexible and visibility as a system you can learn to play.",
    BoundaryKeeper:
      "You’ll adapt, but you keep lines. You’ll refresh the packaging without rewriting the person.",
    Anchor:
      "You won’t trade yourself for relevance. If staying visible requires pretending, you’d rather shrink than perform a lie.",
    Drift:
      "You’d feel the pull to adjust around feedback. The risk isn’t one big switch—it’s a bunch of tiny edits that add up."
  }[top];

  const flexTone =
    flexPct >= 70 ? "high-flex" :
    flexPct >= 55 ? "flex" :
    flexPct >= 45 ? "mixed" :
    "core";

  const integrityTone =
    integrityPct >= 70 ? "high-integrity" :
    integrityPct >= 55 ? "integrity" :
    integrityPct >= 45 ? "mixed" :
    "performance";

  const stabilityTone =
    stabilityPct >= 70 ? "stable" :
    stabilityPct >= 55 ? "mostly-stable" :
    stabilityPct >= 45 ? "mixed" :
    "fragile";

  const flexPhrase = {
    "high-flex": "You can pivot fast—format, voice, vibe—without it feeling like whiplash.",
    flex: "You can evolve smoothly, as long as it still feels like you.",
    mixed: "Part of you wants to adapt; part of you wants to hit pause and protect the original vibe.",
    core: "You like continuity. Too much change starts to feel like acting."
  }[flexTone];

  const integrityPhrase = {
    "high-integrity": "You care more about alignment than applause. You won’t buy reach with pretending.",
    integrity: "You’ll play the game, but you won’t fake a persona to win it.",
    mixed: "You want integrity, but you also notice what performs and feel the pull.",
    performance: "You prioritize results. If it works, it’s hard to argue with."
  }[integrityTone];

  const stabilityPhrase = {
    stable: "You can take feedback without your whole vibe turning into a committee decision.",
    "mostly-stable": "You can stay grounded, but you’ll need boundaries so you don’t slowly over-edit.",
    mixed: "You’ll be fine until the pressure stacks. Then you’ll start negotiating with yourself.",
    fragile: "Too much feedback would turn everything into second-guessing, and the edits would pile up."
  }[stabilityTone];

  const para1 = `${outcomeBlurb} ${flexPhrase} ${integrityPhrase} ${stabilityPhrase}`;

  const forwardHook = {
    Adapter: "Next is the real chaos: what happens when millions misread you and your “brand” starts living its own life?",
    BoundaryKeeper: "Next: being misread at scale—because clarity doesn’t stop projection.",
    Anchor: "Next: being misread by millions—because even staying true won’t stop narratives.",
    Drift: "Next: being misread at scale—because once you’re already adjusting, projection hits harder."
  }[top];

  const para2 = `${forwardHook}`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByOutcome = {
    Adapter: "rgb(0, 170, 140)",
    BoundaryKeeper: "rgb(90, 120, 200)",
    Anchor: "rgb(200, 170, 90)",
    Drift: "rgb(200, 90, 90)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByOutcome[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Changing Yourself for Fame";
