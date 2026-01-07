// scale-or-stabilize-quiz.js
// (Phase 4 – Extreme Success, Quiz 20)
// When success is already huge, do you keep scaling or stabilize and protect your life? (gloss-only edition)

const obj = {
  0: {
    question: "You’re already wildly successful, and the next step requires even more visibility and output. Your instinct is:",
    options: [
      ["Scale. Momentum is fragile, I keep pushing.", ["Scale", "Expansion", "Drive"]],
      ["Stabilize. I protect what I built before it consumes my calendar.", ["Stabilize", "Boundaries", "Sustainability"]],
      ["Negotiate. I’ll grow, but only with structure and limits.", ["Hybrid", "Control", "Systems"]],
      ["Freeze. Too many options. Too much at once.", ["Freeze", "tension", "Overwhelm"]],
      ["Disappear. I’d rather be rich and unknown than bigger.", ["Exit", "Privacy", "Relief"]]
    ]
  },

  1: {
    question: "If you keep scaling, the cost you side-eye most is:",
    options: [
      ["Losing private life completely.", ["Privacy", "Boundaries"]],
      ["Becoming a brand instead of a person.", ["IdentityStrain", "Meaning"]],
      ["Burning too hot and crashing in public.", ["wear", "Overwhelm"]],
      ["Relationships turning transactional.", ["TrustStrain", "Distance"]],
      ["Nothing. Cost is part of the game.", ["Scale", "Drive"]]
    ]
  },

  2: {
    question: "The phrase that feels most true about you is:",
    options: [
      ["I’d rather build bigger than feel safe.", ["Scale", "Expansion"]],
      ["I’d rather keep my life than keep climbing.", ["Stabilize", "Sustainability"]],
      ["I want growth, but on my terms.", ["Hybrid", "Control"]],
      ["I don’t know what I want anymore.", ["Freeze", "Dislocation"]],
      ["I want out before it becomes a cage.", ["Exit", "Relief", "Privacy"]]
    ]
  },

  3: {
    question: "When people say “you’re leaving money on the table,” you:",
    options: [
      ["Agree. Money follows scale, I’m not stopping.", ["Scale", "Drive"]],
      ["Don’t care. Calm is worth more than upside.", ["Stabilize", "Sustainability"]],
      ["Care a little, but choose limits anyway.", ["Hybrid", "Boundaries"]],
      ["Spin out. What if I regret it later?", ["Freeze", "tension"]],
      ["Feel validated. That pressure is exactly why I’d step back.", ["Exit", "Relief"]]
    ]
  },

  4: {
    question: "Your ideal ‘huge success’ daily life looks like:",
    options: [
      ["High output, high presence, constant movement.", ["Scale", "Expansion"]],
      ["Predictable rhythms, low chaos, protected time.", ["Stabilize", "Sustainability"]],
      ["A strong team running the machine while I steer.", ["Hybrid", "Systems", "Control"]],
      ["No one needing anything from me for a while.", ["Freeze", "Overwhelm"]],
      ["Quiet life, minimal public footprint, selective appearances.", ["Exit", "Privacy", "Boundaries"]]
    ]
  },

  5: {
    question: "The most dangerous lie you could believe is:",
    options: [
      ["I can rest after the next milestone.", ["Scale", "Overreach"]],
      ["If I stop scaling, I’ll become irrelevant.", ["Scale", "tension"]],
      ["Stability means I’m wasting potential.", ["Stabilize", "Guilt"]],
      ["If I choose wrong, I’ll ruin everything.", ["Freeze", "Catastrophe"]],
      ["Leaving is failure, not strategy.", ["Exit", "Misread"]]
    ]
  },

  6: {
    question: "If you zoom out 10 years, the outcome you want most is:",
    options: [
      ["Bigger empire. More impact, more reach.", ["Scale", "Expansion"]],
      ["A stable life that still feels like mine.", ["Stabilize", "IdentitySafe"]],
      ["A controlled operation that doesn’t require constant personal bandwidth.", ["Hybrid", "Systems"]],
      ["A full reset. I want my headspace back.", ["Freeze", "Recovery"]],
      ["Freedom. I can walk away whenever I want.", ["Exit", "Autonomy"]]
    ]
  }
};

// Fame-native tags
const tags = {
  // Primary outcomes
  Scale: 0,       // keep growing
  Stabilize: 0,   // protect what exists
  Hybrid: 0,      // grow with limits/systems
  Freeze: 0,      // stuck/Overloaded
  Exit: 0,        // step back / disappear

  // Secondary modifiers
  Expansion: 0,
  Drive: 0,
  Overreach: 0,

  Boundaries: 0,
  Sustainability: 0,
  Privacy: 0,

  Control: 0,
  Systems: 0,

  tension: 0,
  Overwhelm: 0,
  Dislocation: 0,
  Catastrophe: 0,
  Recovery: 0,

  Relief: 0,
  Autonomy: 0,

  IdentityStrain: 0,
  Meaning: 0,
  TrustStrain: 0,
  Distance: 0,

  Guilt: 0,
  Misread: 0,
  IdentitySafe: 0,

  // keep these keys present (used in options above)
  wear: 0
};

function interpretResults() {
  // ----- pick dominant PATH -----
  const pathKeys = ["Scale", "Stabilize", "Hybrid", "Freeze", "Exit"];
  let top = pathKeys[0];
  pathKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 7;

  // Axis: Growth appetite vs Preservation appetite
  const growthScore =
    (tags.Scale + tags.Expansion + tags.Drive) -
    (tags.Stabilize + tags.Sustainability + tags.Boundaries);
  let growthPct = Math.round(((growthScore + totalQuestions) / (totalQuestions * 2)) * 100);
  growthPct = Math.max(0, Math.min(growthPct, 100));

  const isGrowth = growthPct >= 60;

  let style;
  if (top === "Scale") style = "Scale-Forward";
  else if (top === "Stabilize") style = "Stability-First";
  else if (top === "Hybrid") style = "Structured-Growth";
  else if (top === "Freeze") style = "Decision-Frozen";
  else style = "Quiet-Exit";

  const topNames = {
    Scale: "Scaler",
    Stabilize: "Stabilizer",
    Hybrid: "Systems Builder",
    Freeze: "Over-Loaded",
    Exit: "Quiet Exiter"
  };

  const personaTitle = `${style} ${topNames[top]}`;

  const coreBlurb = {
    Scale: "You treat momentum like oxygen. You’d rather risk overload than stop expanding.",
    Stabilize: "You value durability over dominance. You protect what you built before growth turns into a full-time lifestyle.",
    Hybrid: "You want growth, but only through systems. You scale the machine, not your personal bandwidth.",
    Freeze: "Too many stakes, too many costs. You’d get stuck trying not to choose wrong.",
    Exit: "You’d rather win quietly than keep feeding the public machine. Freedom beats empire."
  }[top];

  const axisPhrase = isGrowth
    ? "Your default is to push forward, even when the costs are real."
    : "Your default is to preserve life and identity, even if growth is available.";

  const riskLine = {
    Scale: "Watch-out: confusing expansion with safety and never letting the game end.",
    Stabilize: "Watch-out: over-protecting until your world gets smaller than it needs to be.",
    Hybrid: "Watch-out: over-systematizing until life feels managed instead of lived.",
    Freeze: "Watch-out: paralysis, not choosing is still a choice.",
    Exit: "Watch-out: disappearing so hard you lose the plot, not just the spotlight."
  }[top];

  const para1 = `${coreBlurb} ${axisPhrase}`;
  const para2 = `${riskLine} This is the endgame question: empire, equilibrium, or quiet escape.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByPath = {
    Scale: "rgb(200, 90, 90)",
    Stabilize: "rgb(0, 170, 140)",
    Hybrid: "rgb(90, 120, 200)",
    Freeze: "rgb(200, 170, 90)",
    Exit: "rgb(170, 120, 220)"
  };

  // Reset tags
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByPath[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Scale or Stabilize";
