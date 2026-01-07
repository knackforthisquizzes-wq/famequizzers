// attention-you-can-handle-quiz.js
// (Quiz 4) How long would the attention feel fun?

const obj = {
  0: {
    question: "The first week of attention feels like a fireworks show: messages, praise, strangers noticing. You:",
    options: [
      ["Feel energized. This could be my normal.", ["Endurance", "Energized", "ThrivesOnFeedback"]],
      ["Enjoy it, but I need quiet pockets or I run out of steam.", ["Balanced", "Energized", "NeedsRecovery"]],
      ["Feel overloaded fast. The sparkle turns into static pretty quickly.", ["ShortFuse", "Overloaded", "NeedsPrivacy"]],
      ["Feel wary. I’m bracing for the comment-section plot twist.", ["Guarded", "Overloaded", "NeedsPrivacy"]]
    ]
  },

  1: {
    question: "Interviews start repeating the same questions. Your reaction is:",
    options: [
      ["I can charm through repetition. It’s part of the circus.", ["Endurance", "Energized", "Control"]],
      ["I can handle it if I’m allowed to keep it real.", ["Balanced", "Control", "NeedsRecovery"]],
      ["I hate repeating myself. It drains my battery.", ["ShortFuse", "Overloaded", "NeedsRecovery"]],
      ["I’d rather vanish than do the same performance forever.", ["Guarded", "NeedsPrivacy", "Overloaded"]]
    ]
  },

  2: {
    question: "A random comment thread turns your personality into a ‘type.’ You:",
    options: [
      ["Laugh. People will project no matter what.", ["Endurance", "ThickSkin", "Control"]],
      ["Correct one thing, then log off.", ["Balanced", "Control", "ThickSkin"]],
      ["Get annoyed. Being misread makes me ruminate.", ["ShortFuse", "Overloaded", "ThinSkin"]],
      ["Go quiet. I don’t want to be a public character.", ["Guarded", "NeedsPrivacy", "ThinSkin"]]
    ]
  },

  3: {
    question: "Your notifications are nonstop. The smartest move you’d make is:",
    options: [
      ["Lean in. The feedback loop helps me level up.", ["Endurance", "ThrivesOnFeedback", "Open"]],
      ["Set a rhythm: windows for engagement, windows for life.", ["Balanced", "Control", "NeedsRecovery"]],
      ["Turn them off often. I can’t think with that much input.", ["ShortFuse", "NeedsPrivacy", "NeedsRecovery"]],
      ["Disappear for stretches. I don’t want constant access.", ["Guarded", "NeedsPrivacy", "GuardedPrivacy"]]
    ]
  },

  4: {
    question: "When praise fades (because it always fades), you’re most likely to:",
    options: [
      ["Keep going. My energy isn’t dependent on applause.", ["Endurance", "Stable", "Control"]],
      ["Feel it, but adapt. I can recalibrate.", ["Balanced", "Stable", "NeedsRecovery"]],
      ["Feel restless and snacky for attention. I’d chase the next buzz.", ["ShortFuse", "SeeksValidation", "Open"]],
      ["Feel relieved. Quiet is my baseline.", ["Guarded", "Stable", "NeedsPrivacy"]]
    ]
  },

  5: {
    question: "Scrutiny ramps up: people analyze your face, tone, and wording. You:",
    options: [
      ["Adjust fast. I can be camera-ready on demand.", ["Endurance", "Control", "ThickSkin"]],
      ["Stay mostly myself, just more intentional.", ["Balanced", "Control", "ThickSkin"]],
      ["Start editing everything. It becomes exhausting.", ["ShortFuse", "Overloaded", "ThinSkin"]],
      ["Stop sharing. If everything gets judged, I’m out.", ["Guarded", "NeedsPrivacy", "ThinSkin"]]
    ]
  },

  6: {
    question: "What breaks the “fun” feeling first for you?",
    options: [
      ["Nothing — I’m built for consistent attention.", ["Endurance", "Energized"]],
      ["The repetition. Same cycles, same questions, same takes.", ["Balanced", "NeedsRecovery"]],
      ["The lack of privacy. I can’t breathe.", ["Guarded", "NeedsPrivacy"]],
      ["The criticism. Even small digs stack up.", ["ShortFuse", "ThinSkin", "Overloaded"]]
    ]
  },

  7: {
    question: "Your ideal fame rhythm looks like:",
    options: [
      ["Always on. I like being in the mix.", ["Endurance", "ThrivesOnFeedback", "Open"]],
      ["Seasons: on for projects, off for real life.", ["Balanced", "NeedsRecovery", "Control"]],
      ["Rare appearances. Minimal access.", ["Guarded", "NeedsPrivacy", "Control"]],
      ["One big moment, then vanish.", ["ShortFuse", "NeedsPrivacy", "ChaosExit"]]
    ]
  }
};

// Fame-native tags for Quiz 4
const tags = {
  // Primary outcomes: how long fun lasts
  Endurance: 0,   // stays fun long / sustainable
  Balanced: 0,    // fun in phases / manageable with boundaries
  ShortFuse: 0,   // fun burns out fast
  Guarded: 0,     // fun is limited; privacy matters most

  // Secondary modifiers: why / how it feels
  Energized: 0,
  Overloaded: 0,
  ThrivesOnFeedback: 0,
  NeedsRecovery: 0,
  NeedsPrivacy: 0,

  ThickSkin: 0,
  ThinSkin: 0,

  Control: 0,
  Open: 0,

  Stable: 0,
  SeeksValidation: 0,

  GuardedPrivacy: 0,
  ChaosExit: 0
};

function interpretResults() {
  // ----- pick dominant outcome -----
  const outcomeKeys = ["Endurance", "Balanced", "ShortFuse", "Guarded"];
  let top = outcomeKeys[0];
  outcomeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 8;

  // ----- axes -----
  // Energy: Energized vs Overloaded
  const energyScore = tags.Energized - tags.Overloaded; // approx -8 → +8
  let energyPct = Math.round(((energyScore + totalQuestions) / (totalQuestions * 2)) * 100);
  energyPct = Math.max(0, Math.min(energyPct, 100));

  // Skin: Thick vs Thin
  const skinScore = tags.ThickSkin - tags.ThinSkin; // approx -8 → +8
  let skinPct = Math.round(((skinScore + totalQuestions) / (totalQuestions * 2)) * 100);
  skinPct = Math.max(0, Math.min(skinPct, 100));

  // Recovery: NeedsRecovery vs ThrivesOnFeedback (inverted for "stamina")
  const staminaScore = tags.ThrivesOnFeedback - tags.NeedsRecovery; // approx -8 → +8
  let staminaPct = Math.round(((staminaScore + totalQuestions) / (totalQuestions * 2)) * 100);
  staminaPct = Math.max(0, Math.min(staminaPct, 100));

  // ----- style adjective (shareable, no % shown) -----
  const isHighEnergy = energyPct >= 60;
  const isThick = skinPct >= 60;
  const isHighStamina = staminaPct >= 60;

  let style;
  if (isHighEnergy && isThick && isHighStamina) style = "Built-For-It";
  else if (isHighEnergy && !isHighStamina) style = "Sprint-Mode";
  else if (!isHighEnergy && isThick) style = "Cool-Headed";
  else style = "Sensitive-System";

  const outcomeNames = {
    Endurance: "Endurance",
    Balanced: "Seasonal",
    ShortFuse: "Short Fuse",
    Guarded: "Privacy-First"
  };

  const personaTitle = `${style} ${outcomeNames[top]}`;

  const outcomeBlurb = {
    Endurance: "The early attention stays fun longer for you. You can live in the spotlight without constantly wrestling your own vibe.",
    Balanced: "Attention is fun in phases. You can handle it — but only with a rhythm and some recharge time built in.",
    ShortFuse: "The fun burns fast. The sparkle turns into pressure once the novelty wears off.",
    Guarded: "Attention gets invasive quickly. The loss of privacy is what kills the fun first."
  }[top];

  const energyTone =
    energyPct >= 70 ? "energized" :
    energyPct >= 55 ? "mostly-energized" :
    energyPct >= 45 ? "mixed" :
    "Overloaded";

  const skinTone =
    skinPct >= 70 ? "thick" :
    skinPct >= 55 ? "mostly-thick" :
    skinPct >= 45 ? "mixed" :
    "thin";

  const staminaTone =
    staminaPct >= 70 ? "high-stamina" :
    staminaPct >= 55 ? "stamina" :
    staminaPct >= 45 ? "mixed" :
    "low-stamina";

  const energyPhrase = {
    energized: "You run hot in a good way — attention fuels you more than it drains you.",
    "mostly-energized": "You like attention, but too much input for too long will still cost you.",
    mixed: "Sometimes it’s energizing, sometimes it’s suffocating. Context matters.",
    Overloaded: "Your system maxes out fast. Too many eyes becomes too much noise."
  }[energyTone];

  const skinPhrase = {
    thick: "Scrutiny doesn’t stick as much. You can take public opinions without letting them move in rent-free.",
    "mostly-thick": "You can handle critique, but you still need distance from the noise.",
    mixed: "Some comments bounce off, others cling. Timing matters.",
    thin: "The little digs stack up. You’d feel the crowd more than you’d like."
  }[skinTone];

  const staminaPhrase = {
    "high-stamina": "You don’t need constant recharge time. You can stay ‘on’ longer than most.",
    stamina: "You can stay ‘on,’ but you still need planned downtime to reset.",
    mixed: "You can push through… until you suddenly need a hard reset.",
    "low-stamina": "Without recharge time and a rhythm, attention will chew up your focus."
  }[staminaTone];

  const para1 = `${outcomeBlurb} ${energyPhrase} ${skinPhrase} ${staminaPhrase}`;

  const forwardHook = {
    Endurance: "The real test isn’t the first wave — it’s whether you can stay real while being watched.",
    Balanced: "The real test is consistency: can you stay visible without letting it take over your life?",
    ShortFuse: "The real test is the pivot: do you step back before you start hating the whole game?",
    Guarded: "The real test is access: once people feel entitled to you, what do you protect first?"
  }[top];

  const para2 = `${forwardHook} Next up: what it feels like to never be anonymous again.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByOutcome = {
    Endurance: "rgb(0, 170, 140)",
    Balanced: "rgb(90, 120, 200)",
    ShortFuse: "rgb(200, 170, 90)",
    Guarded: "rgb(200, 90, 90)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByOutcome[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Fame Stamina";
