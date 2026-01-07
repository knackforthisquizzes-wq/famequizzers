// deserved-or-random-quiz.js
// (Phase 4 – Extreme Success, Quiz 17)
// When people call your success “luck,” do you sparkle, smirk, curate the story, or float above it?

const obj = {
  0: {
    question: "A headline implies your success was mostly luck. Your real reaction is:",
    options: [
      ["Polished annoyance. Don’t erase the craft.", ["Earned", "Defensive", "Control"]],
      ["A tiny wobble. What if they’re… kind of right?", ["Impostor", "Anxious", "Fragile"]],
      ["Smooth calm. Luck is part of the champagne.", ["Integrated", "Grounded", "Balanced"]],
      ["Hot indignation. I won’t be minimized.", ["Earned", "Fury", "Defensive"]],
      ["Velvet-rope numb. People narrate; I keep moving.", ["Detached", "Protected", "LowReactivity"]]
    ]
  },

  1: {
    question: "If you had to be honest, the biggest reason you “made it” is:",
    options: [
      ["Skill + output. I delivered.", ["Earned", "Control", "Merit"]],
      ["Timing. Right room, right moment.", ["LuckLean", "Balanced", "Integrated"]],
      ["Access + introductions (some earned, some gifted).", ["LuckLean", "Complex", "Reality"]],
      ["A mix: effort built doors, chance picked the doorway.", ["Integrated", "Balanced", "Reality"]],
      ["I can’t fully pin it down, and that makes me fidgety.", ["Impostor", "Anxious", "Rumination"]]
    ]
  },

  2: {
    question: "When someone says “you got lucky,” you’re most tempted to:",
    options: [
      ["Drop the receipts, beautifully.", ["Earned", "Defensive", "Merit"]],
      ["Tell the full story, because details matter.", ["Integrated", "Complex", "Reality"]],
      ["Smile and glide past it.", ["Detached", "LowReactivity", "Protected"]],
      ["Overthink it later like it’s a runway replay.", ["Impostor", "Anxious", "Rumination"]],
      ["Turn it into a brand line: luck + work.", ["LuckLean", "Control", "Strategy"]]
    ]
  },

  3: {
    question: "The part of ‘randomness’ that bothers you most is:",
    options: [
      ["That it could vanish just as randomly.", ["Anxious", "Fragile", "Instability"]],
      ["That people won’t credit the craft behind it.", ["Earned", "Defensive", "Respect"]],
      ["That success doesn’t have a neat storyline.", ["Integrated", "Reality", "Complex"]],
      ["That someone else could’ve done it and never got spotlighted.", ["LuckLean", "Reality", "Humility"]],
      ["Nothing. I made peace with chaos early.", ["Detached", "Protected", "LowReactivity"]]
    ]
  },

  4: {
    question: "If you could rewrite the narrative, you’d want people to believe:",
    options: [
      ["I earned it. Full stop.", ["Earned", "Merit", "Control"]],
      ["I earned it, and luck opened doors.", ["Integrated", "Balanced", "Reality"]],
      ["It was timing + systems more than personal mythology.", ["LuckLean", "Reality", "Complex"]],
      ["I’m not ‘more deserving’, I just became the face.", ["Integrated", "Humility", "Reality"]],
      ["I’m done caring what the story is.", ["Detached", "Protected", "LowReactivity"]]
    ]
  },

  5: {
    question: "When you think about ‘deserving’ success, you mostly feel:",
    options: [
      ["Bright pride. I did the work.", ["Earned", "Merit", "Grounded"]],
      ["Pressure, like I have to keep proving it.", ["Earned", "Defensive", "Anxious"]],
      ["Warm gratitude. It’s still surreal.", ["Integrated", "Humility", "Grounded"]],
      ["A raised eyebrow. The world rewards odd things.", ["LuckLean", "Reality", "Cynical"]],
      ["Distance. I don’t shop in that aisle anymore.", ["Detached", "Protected", "Balanced"]]
    ]
  },

  6: {
    question: "If your success was truly 50% random, what changes in you?",
    options: [
      ["Nothing. Craft is still craft.", ["Integrated", "Grounded", "Balanced"]],
      ["I’d feel exposed, like I’m not ‘real’ enough.", ["Impostor", "Fragile", "Anxious"]],
      ["I’d feel lighter. Less moral weight, more ease.", ["LuckLean", "Relief", "Balanced"]],
      ["I’d double down on strategy and positioning.", ["Earned", "Control", "Strategy"]],
      ["I’d stop chasing approval entirely.", ["Detached", "LowReactivity", "Protected"]]
    ]
  }
};

// Fame-native tags
const tags = {
  // Primary outcomes: how you narrate legitimacy
  Earned: 0,       // merit-first, wants credit
  LuckLean: 0,     // timing/systems emphasis
  Integrated: 0,   // mixed truth, nuanced
  Impostor: 0,     // wobble about legitimacy (kept glossy)
  Detached: 0,     // not emotionally invested in narrative

  // Secondary axes
  Merit: 0,
  Control: 0,
  Strategy: 0,

  Grounded: 0,
  Balanced: 0,
  Complex: 0,
  Reality: 0,
  Humility: 0,

  Defensive: 0,
  Fury: 0,
  Cynical: 0,
  Relief: 0,

  Anxious: 0,
  Fragile: 0,
  Rumination: 0,
  Instability: 0,
  Respect: 0,

  Protected: 0,
  LowReactivity: 0
};

function interpretResults() {
  // ----- pick dominant LEGITIMACY STYLE -----
  const typeKeys = ["Earned", "Integrated", "LuckLean", "Impostor", "Detached"];
  let top = typeKeys[0];
  typeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 7;

  // Axis 1: Control/Strategy vs Ease (Balanced/Grounded/Humility)
  const controlScore =
    (tags.Control + tags.Strategy + tags.Defensive) -
    (tags.Balanced + tags.Grounded + tags.Humility);

  let controlPct = Math.round(((controlScore + totalQuestions) / (totalQuestions * 2)) * 100);
  controlPct = Math.max(0, Math.min(controlPct, 100));

  // Axis 2: Fidget factor (kept light)
  const fidgetScore = tags.Anxious + tags.Fragile + tags.Rumination + tags.Instability;
  let fidgetPct = Math.round((fidgetScore / (totalQuestions * 2)) * 100);
  fidgetPct = Math.max(0, Math.min(fidgetPct, 100));

  // ----- style adjective -----
  let style;
  if (top === "Earned" && controlPct >= 60) style = "Receipts-Ready";
  else if (top === "Earned") style = "Craft-Claiming";
  else if (top === "Integrated") style = "Champagne-Realist";
  else if (top === "LuckLean") style = "Systems-Savvy";
  else if (top === "Impostor") style = "Story-Wobbly";
  else style = "Narrative-Untouchable";

  const typeNames = {
    Earned: "Earned",
    Integrated: "Mixed-Truth",
    LuckLean: "Luck-Leaning",
    Impostor: "Impostor",
    Detached: "Detached"
  };

  const personaTitle = `${style} ${typeNames[top]}`;

  const coreBlurb = {
    Earned:
      "You experience success as crafted and earned. When people call it luck, it feels like someone trying to smudge your signature.",
    Integrated:
      "You can hold the elegant truth: work matters, timing matters, and outcomes still have a little roulette to them.",
    LuckLean:
      "You read the room like a blueprint: systems, timing, access. ‘Deserving’ feels like a story people add after the confetti.",
    Impostor:
      "Luck-talk hits a tender spot. Not because you’re fake, because the story feels slippery, and you want it to feel solid.",
    Detached:
      "You’ve stopped auditioning for the ‘proper’ narrative. People will talk; you’ll simply keep gliding."
  }[top];

  const controlPhrase =
    controlPct >= 70 ? "Your instinct is to tighten the frame: better strategy, cleaner positioning, sharper receipts." :
    controlPct >= 55 ? "You guide the story gently, but you don’t live inside it." :
    "You lean ease-first: the narrative can be imperfect and you’ll still look composed.";

  const fidgetPhrase =
    fidgetPct >= 50 ? "This topic makes your inner monologue pace a little faster than you’d like." :
    fidgetPct >= 30 ? "You feel some quiet tension around the story, even if you stay polished." :
    "You stay surprisingly relaxed about the whole legitimacy conversation.";

  const riskLine = {
    Earned: "Watch-out: turning life into a permanent proof presentation.",
    Integrated: "Watch-out: getting tired of nuance while the internet wants slogans.",
    LuckLean: "Watch-out: sliding into cynicism and losing the fun of the win.",
    Impostor: "Watch-out: letting the story wobble your confidence.",
    Detached: "Watch-out: going so unbothered you forget to enjoy your own shine."
  }[top];

  const para1 = `${coreBlurb} ${controlPhrase} ${fidgetPhrase}`;
  const para2 = `${riskLine} Next up: the social side—how success changes the room, the circle, and the vibe.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByType = {
    Earned: "rgb(0, 170, 140)",
    Integrated: "rgb(90, 120, 200)",
    LuckLean: "rgb(200, 170, 90)",
    Impostor: "rgb(200, 90, 90)",
    Detached: "rgb(170, 120, 220)"
  };

  // Reset tags
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByType[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Deserved or Random";
