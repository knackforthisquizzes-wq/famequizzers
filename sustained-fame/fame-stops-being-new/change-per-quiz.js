// fame-stops-being-new-quiz.js
// (Quiz 11) What happens when attention stops feeling special?
// Sustained fame: novelty fades → escalation, numbness, retreat, or reinvention.

const obj = {
  0: {
    question: "A year in, being recognized in public barely registers. Your first real reaction is:",
    options: [
      ["Restlessness. I miss the rush.", ["Escalator", "CravesNovelty", "HighHeat"]],
      ["Relief. Thank God it’s not intense anymore.", ["Stabilizer", "ProtectsPeace", "LowHeat"]],
      ["Numbness. I feel weirdly disconnected.", ["Numb", "Dissociation", "LowHeat"]],
      ["Grief. Something about it feels empty now.", ["Reflective", "MeaningSeeking", "LowHeat"]],
      ["Annoyance. This is just constant friction now.", ["Irritated", "BoundaryStrain", "MediumHeat"]]
    ]
  },

  1: {
    question: "Your numbers plateau. Engagement is steady but not thrilling. You:",
    options: [
      ["Engineer a bigger moment to spike attention again.", ["Escalator", "ChasesSpike", "HighHeat"]],
      ["Accept it. Consistency beats adrenaline.", ["Stabilizer", "ProtectsPeace", "LowHeat"]],
      ["Feel anxious and start checking metrics too much.", ["Numb", "DopamineLoop", "MediumHeat"]],
      ["Get philosophical and question why you’re doing this.", ["Reflective", "MeaningSeeking", "LowHeat"]],
      ["Get irritated and blame the platform/people.", ["Irritated", "Resentment", "MediumHeat"]]
    ]
  },

  2: {
    question: "If the audience wants “more of the thing,” you:",
    options: [
      ["Give it to them, and raise the intensity.", ["Escalator", "ChasesSpike", "HighHeat"]],
      ["Give it, but keep it sustainable.", ["Stabilizer", "Bounded", "LowHeat"]],
      ["Half-deliver. My heart isn’t in it.", ["Numb", "Dissociation", "LowHeat"]],
      ["Change direction even if it costs reach.", ["Reflective", "MeaningSeeking", "Recalibrate"]],
      ["Fight them. I hate being trained by demand.", ["Irritated", "BoundaryStrain", "Resentment"]]
    ]
  },

  3: {
    question: "The most dangerous thought you catch yourself having is:",
    options: [
      ["“What if I just do something wild and reset the conversation?”", ["Escalator", "Impulse", "HighHeat"]],
      ["“I want to disappear for a while.”", ["Stabilizer", "Withdrawal", "ProtectsPeace"]],
      ["“I don’t feel anything when they praise me.”", ["Numb", "Dissociation"]],
      ["“This isn’t who I meant to become.”", ["Reflective", "MeaningSeeking"]],
      ["“Everyone wants something from me.”", ["Irritated", "Resentment", "BoundaryStrain"]]
    ]
  },

  4: {
    question: "Your best coping mechanism once fame becomes routine is:",
    options: [
      ["Bigger projects. Bigger moments. Keep the machine fed.", ["Escalator", "ChasesSpike"]],
      ["Structure and boundaries. Protect the private self.", ["Stabilizer", "Bounded", "ProtectsPeace"]],
      ["Detachment. I go on autopilot.", ["Numb", "Dissociation"]],
      ["Reinvention. I pivot toward what feels meaningful.", ["Reflective", "Recalibrate", "MeaningSeeking"]],
      ["Distance through sarcasm or irritation.", ["Irritated", "Resentment"]]
    ]
  },

  5: {
    question: "If attention fades for a month, you mostly feel:",
    options: [
      ["Panic. I need to fix this.", ["Escalator", "CravesNovelty", "ChasesSpike"]],
      ["Peace. My nervous system thanks me.", ["Stabilizer", "ProtectsPeace", "Withdrawal"]],
      ["Nothing. It’s all kind of flat.", ["Numb", "Dissociation"]],
      ["Clarity. I remember what I actually care about.", ["Reflective", "MeaningSeeking", "Recalibrate"]],
      ["Anger. People are so fickle.", ["Irritated", "Resentment"]]
    ]
  },

  6: {
    question: "Which outcome feels most likely for you over time?",
    options: [
      ["Escalation: bigger stunts, bigger swings, bigger risk.", ["Escalator", "HighHeat", "Impulse"]],
      ["Stabilization: controlled pace, boundaries, longevity.", ["Stabilizer", "LowHeat", "Bounded"]],
      ["Numbness: posting without feeling, living half-present.", ["Numb", "Dissociation", "LowHeat"]],
      ["Reorientation: stepping back or pivoting toward meaning.", ["Reflective", "MeaningSeeking", "Recalibrate"]],
      ["Bitterness: resenting the audience and the attention loop.", ["Irritated", "Resentment", "MediumHeat"]]
    ]
  }
};

// Fame-native tags
const tags = {
  // Primary outcomes: novelty response
  Escalator: 0,   // chases bigger moments
  Stabilizer: 0,  // builds boundaries / steady pace
  Numb: 0,        // dissociation / flatness
  Reflective: 0,  // meaning-making / pivot
  Irritated: 0,   // resentment / friction

  // Attention heat
  HighHeat: 0,
  MediumHeat: 0,
  LowHeat: 0,

  // Mechanisms / risks
  CravesNovelty: 0,
  ChasesSpike: 0,
  ProtectsPeace: 0,
  Bounded: 0,
  Withdrawal: 0,
  Dissociation: 0,
  MeaningSeeking: 0,
  Recalibrate: 0,
  BoundaryStrain: 0,
  Resentment: 0,
  DopamineLoop: 0,
  Impulse: 0
};

function interpretResults() {
  // ----- pick dominant NOVELTY RESPONSE -----
  const typeKeys = ["Escalator", "Stabilizer", "Numb", "Reflective", "Irritated"];
  let top = typeKeys[0];
  typeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 7;

  // ----- axes -----
  // Heat: High vs Low (Medium dampens)
  const heatScore = (tags.HighHeat * 1) + (tags.MediumHeat * 0.25) - (tags.LowHeat * 1);
  let heatPct = Math.round(((heatScore + totalQuestions) / (totalQuestions * 2)) * 100);
  heatPct = Math.max(0, Math.min(heatPct, 100));

  // Stability: Bounded/ProtectsPeace vs Impulse/DopamineLoop/BoundaryStrain
  const stabilityScore =
    (tags.Bounded + tags.ProtectsPeace) - (tags.Impulse + tags.DopamineLoop + tags.BoundaryStrain);
  let stabilityPct = Math.round(((stabilityScore + totalQuestions) / (totalQuestions * 2)) * 100);
  stabilityPct = Math.max(0, Math.min(stabilityPct, 100));

  const isHot = heatPct >= 60;
  const isStable = stabilityPct >= 60;

  // ----- style adjective (shareable) -----
  let style;
  if (top === "Escalator" && isHot) style = "Escalation-Seeking";
  else if (top === "Stabilizer" && isStable) style = "Longevity-Built";
  else if (top === "Numb") style = "Numb-Loop";
  else if (top === "Reflective") style = "Meaning-Pivot";
  else style = "Friction-Burn";

  const typeNames = {
    Escalator: "Escalator",
    Stabilizer: "Stabilizer",
    Numb: "Numb",
    Reflective: "Reflective",
    Irritated: "Irritated"
  };

  const personaTitle = `${style} ${typeNames[top]}`;

  // ----- primary blurb -----
  const typeBlurb = {
    Escalator:
      "When attention stops feeling special, you’re tempted to raise the stakes. You chase spikes, not because you’re shallow, because the system trains you to.",
    Stabilizer:
      "When novelty fades, you build structure: boundaries, pacing, and a sustainable lane. You’d rather last than trend.",
    Numb:
      "When attention becomes routine, you risk going emotionally flat. You can keep posting, but feel less present inside it.",
    Reflective:
      "When the rush fades, you start asking bigger questions. You’re willing to pivot, step back, or redefine success around meaning.",
    Irritated:
      "When attention becomes routine, it starts to feel like constant friction. You notice entitlement, demands, and the emotional tax, and resentment builds."
  }[top];

  const heatPhrase =
    heatPct >= 70 ? "Your attention tolerance runs hot, you can live in the blast radius, but it pulls you toward bigger moments." :
    heatPct >= 55 ? "You can handle visibility, but repeated exposure pushes you toward either boundaries or escalation." :
    "You prefer lower heat. Sustained visibility drains you faster than it energizes you.";

  const stabilityPhrase =
    stabilityPct >= 70 ? "Your best protective trait is stability: you can set rules and actually keep them." :
    stabilityPct >= 55 ? "You have some stabilizers, but you’re vulnerable when numbers or mood swing." :
    "Your risk is drift: reactions, impulses, and platform feedback quietly steering your choices.";

  const watchOut = {
    Escalator: "Watch-out: escalation works until it doesn’t, and the crash is usually social, financial, or psychological.",
    Stabilizer: "Watch-out: stability can look like boredom, and boredom is when people make bad fame decisions.",
    Numb: "Watch-out: numbness can turn into identity fog. You’re there, but not fully living it.",
    Reflective: "Watch-out: meaning-pivots can confuse audiences, but they’re often necessary for survival.",
    Irritated: "Watch-out: resentment makes you leak contempt, and the audience feels it even when you don’t say it."
  }[top];

  const para1 = `${typeBlurb} ${heatPhrase} ${stabilityPhrase}`;
  const para2 = `${watchOut} Next up: what you do when the narrative isn’t yours anymore.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByType = {
    Escalator: "rgb(200, 90, 90)",
    Stabilizer: "rgb(0, 170, 140)",
    Numb: "rgb(120, 120, 140)",
    Reflective: "rgb(200, 170, 90)",
    Irritated: "rgb(90, 120, 200)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByType[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Fame Stops Being New";
