// unequal-attention-quiz.js
// (Phase 4 – Extreme Success, Quiz 19)
// When attention (and praise/credit) isn’t distributed evenly between you and others (gloss-only edition)

const obj = {
  0: {
    question: "You and someone close to you do similar work, but you get 10x the attention. Your first reaction is:",
    options: [
      ["Guilt. This feels unfair.", ["Guilt", "Fairness", "Empathy"]],
      ["Defensiveness. I can’t control what people notice.", ["Defensive", "Merit", "Control"]],
      ["Confusion. Why are they fixated on me specifically?", ["Bewildered", "Dislocation", "Unease"]],
      ["Relief. I’d rather me than them deal with the heat.", ["Protective", "Responsibility"]],
      ["Numb acceptance. This is how the system works.", ["Detached", "SystemRealist"]]
    ]
  },

  1: {
    question: "The person gets bitter about it. You:",
    options: [
      ["Try to share credit publicly and privately.", ["Repair", "Empathy", "Fairness"]],
      ["Get angry — they’re acting like you stole something.", ["Defensive", "Friction", "Boundary"]],
      ["Feel sad and distance yourself to avoid tension.", ["Avoidant", "Distance", "Loss"]],
      ["Over-explain the situation until it feels worse.", ["Anxious", "Rumination", "Repair"]],
      ["Detach. If they can’t handle it, that’s on them.", ["Detached", "Boundary", "Cold"]]
    ]
  },

  2: {
    question: "When people praise you for work you didn’t do alone, you:",
    options: [
      ["Correct them every time. Credit matters.", ["Repair", "Fairness", "Integrity"]],
      ["Correct sometimes, but not constantly.", ["Balanced", "Fairness", "Adaptive"]],
      ["Let it slide. Correcting everything is exhausting.", ["Detached", "Adaptive"]],
      ["Feel guilty but stay quiet.", ["Guilt", "SelfCensor", "Unease"]],
      ["Use the praise as leverage to bring others up.", ["Strategic", "Repair", "Responsibility"]]
    ]
  },

  3: {
    question: "The most uncomfortable part of unequal attention is:",
    options: [
      ["Watching friends feel smaller next to you.", ["Guilt", "Empathy", "Loss"]],
      ["Feeling like you can’t enjoy wins without tension.", ["Guilt", "Unease", "Friction"]],
      ["Knowing you’ll be blamed no matter what.", ["Defensive", "Friction", "Boundary"]],
      ["The isolation — nobody says the real thing out loud.", ["Dislocation", "Distance", "Unease"]],
      ["Realizing attention is arbitrary and messy.", ["SystemRealist", "Detached"]]
    ]
  },

  4: {
    question: "If you could choose, you’d prefer attention to be:",
    options: [
      ["Evenly distributed. No one becomes ‘the face.’", ["Fairness", "Repair"]],
      ["Merit-based and measurable (even if harsh).", ["Merit", "Control", "Defensive"]],
      ["Focused on the work, not the person.", ["Integrity", "Balanced"]],
      ["Absorbed by you so others stay safer.", ["Protective", "Responsibility"]],
      ["None of it matters — attention is a weather system.", ["Detached", "SystemRealist"]]
    ]
  },

  5: {
    question: "Your relationship to credit at scale is:",
    options: [
      ["I’m obsessive about sharing it correctly.", ["Repair", "Integrity", "Fairness"]],
      ["I try, but the system always simplifies.", ["Balanced", "SystemRealist"]],
      ["I accept that simplification is inevitable.", ["Detached", "SystemRealist"]],
      ["I worry about it constantly.", ["Anxious", "Rumination", "Guilt"]],
      ["I treat credit like strategy — use it to stabilize relationships.", ["Strategic", "Responsibility", "Repair"]]
    ]
  },

  6: {
    question: "The sentence that hits hardest is:",
    options: [
      ["‘Why you and not them?’", ["Bewildered", "Unease", "Guilt"]],
      ["‘You think you’re better than us now.’", ["Defensive", "Friction", "Boundary"]],
      ["‘Don’t mention them — it’s your moment.’", ["Integrity", "Fairness", "Unease"]],
      ["‘If I got your attention, my life would change.’", ["Guilt", "Empathy", "Loss"]],
      ["‘Attention was never fair.’", ["Detached", "SystemRealist"]]
    ]
  }
};

// Fame-native tags
const tags = {
  // Primary outcomes
  Repair: 0,        // tries to share credit / mend relationships
  Defensive: 0,     // resists blame, protects self
  Guilt: 0,         // moral discomfort
  Detached: 0,      // accepts unevenness, emotional distance
  Bewildered: 0,    // confused by attention allocation

  // Secondary modifiers
  Fairness: 0,
  Empathy: 0,
  Integrity: 0,

  Merit: 0,
  Control: 0,
  Boundary: 0,
  Friction: 0,

  Dislocation: 0,
  Unease: 0,
  Responsibility: 0,
  Protective: 0,

  SystemRealist: 0,
  Balanced: 0,
  Adaptive: 0,

  Avoidant: 0,
  Distance: 0,
  Loss: 0,

  Anxious: 0,
  Rumination: 0,
  SelfCensor: 0,
  Strategic: 0,
  Cold: 0
};

function interpretResults() {
  // ----- pick dominant UNEQUAL ATTENTION MODE -----
  const typeKeys = ["Repair", "Guilt", "Defensive", "Detached", "Bewildered"];
  let top = typeKeys[0];
  typeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 7;

  // Axis: Repair/Integrity vs Boundary/Detachment
  const repairScore =
    (tags.Repair + tags.Fairness + tags.Integrity + tags.Empathy) -
    (tags.Boundary + tags.Detached + tags.Cold);
  let repairPct = Math.round(((repairScore + totalQuestions) / (totalQuestions * 2)) * 100);
  repairPct = Math.max(0, Math.min(repairPct, 100));

  // Axis: Tension load (kept as "tension" variable name for compatibility, but copy stays glossy)
  const tensionScore = tags.Anxious + tags.Rumination + tags.Unease + tags.Dislocation;
  let tensionPct = Math.round((tensionScore / (totalQuestions * 2)) * 100);
  tensionPct = Math.max(0, Math.min(tensionPct, 100));

  const isRepairHigh = repairPct >= 60;
  const isTensionHigh = tensionPct >= 35;

  let style;
  if (top === "Repair" && isRepairHigh) style = "Credit-Polisher";
  else if (top === "Repair") style = "Credit-Share";
  else if (top === "Guilt") style = "Guilt-Shadowed";
  else if (top === "Defensive") style = "Blame-Deflecting";
  else if (top === "Detached") style = "Weather-Watching";
  else style = "Spotlight-Confused";

  const typeNames = {
    Repair: "Repair",
    Guilt: "Guilt",
    Defensive: "Defensive",
    Detached: "Detached",
    Bewildered: "Bewildered"
  };

  const personaTitle = `${style} ${typeNames[top]}`;

  const coreBlurb = {
    Repair: "You instinctively try to keep the room fair: share credit, name collaborators, smooth the edges.",
    Guilt: "Uneven attention puts a shadow on the win. You feel the imbalance even if you didn’t create it.",
    Defensive: "You refuse to be the villain for the system. You’ll protect your name and your lane.",
    Detached: "You treat attention like weather: unpredictable, uneven, and not worth wrestling all day.",
    Bewildered: "The concentration of attention feels weird and arbitrary — and that weirdness sticks with you."
  }[top];

  const repairPhrase = isRepairHigh
    ? "You lean toward repair: public credit, private reassurance, and less awkwardness lingering in the air."
    : "You focus less on redistribution and more on keeping your own footing under a simplified spotlight.";

  const tensionPhrase = isTensionHigh
    ? "This situation runs hot because it mixes status, closeness, and unspoken comparisons."
    : "You can hold the awkwardness without turning it into a whole spiral.";

  const riskLine = {
    Repair: "Watch-out: becoming the unofficial feelings concierge.",
    Guilt: "Watch-out: dimming your own shine to keep everyone comfortable.",
    Defensive: "Watch-out: isolation — self-protection can read cold from the outside.",
    Detached: "Watch-out: distance becoming a default, not a choice.",
    Bewildered: "Watch-out: getting stuck trying to make something ‘fair’ that won’t behave."
  }[top];

  const para1 = `${coreBlurb} ${repairPhrase} ${tensionPhrase}`;
  const para2 = `${riskLine} Next up: what extreme success does to loyalty, closeness, and the people around you.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByType = {
    Repair: "rgb(0, 170, 140)",
    Guilt: "rgb(90, 120, 200)",
    Defensive: "rgb(200, 90, 90)",
    Detached: "rgb(170, 120, 220)",
    Bewildered: "rgb(200, 170, 90)"
  };

  // Reset tags
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByType[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Unequal Attention";
