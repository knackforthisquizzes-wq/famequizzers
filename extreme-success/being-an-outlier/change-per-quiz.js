// being-an-outlier-quiz.js
// (Phase 4 – Extreme Success, Quiz 18)
// The glittery, champagne-bubble version of “being an outlier” (no heavy stuff, all sheen)

const obj = {
  0: {
    question: "The moment you realize your life no longer resembles most people’s lives, you feel:",
    options: [
      ["Radiant. I earned this glow.", ["Exceptional", "Grounded", "Earned"]],
      ["Dreamy. Like I stepped into a different room.", ["Isolated", "Dislocation", "Unmoored"]],
      ["Tender. I want to stay kind while I shine.", ["Guilt", "Empathy", "MoralConflict"]],
      ["Curated. Distance keeps the sparkle intact.", ["Boundaried", "Control", "Adaptive"]],
      ["Weightless. Old comparisons don’t even load anymore.", ["Detached", "LowAttachment", "OutlierMindset"]]
    ]
  },

  1: {
    question: "When people from your old life talk about ‘normal problems,’ you:",
    options: [
      ["Still relate. Different backdrop, same human scenes.", ["Grounded", "Continuity"]],
      ["Listen, but feel like you’re visiting a hometown hotel.", ["Isolated", "Distance"]],
      ["Keep your own updates softly edited.", ["Guilt", "SelfCensor"]],
      ["Keep it pleasant and surface-level on purpose.", ["Boundaried", "Control"]],
      ["Smile… and your mind drifts to a different skyline.", ["Detached", "OutlierMindset"]]
    ]
  },

  2: {
    question: "The trickiest part of being an outlier is:",
    options: [
      ["Fewer true peers, the room gets quieter.", ["Isolated", "Loss"]],
      ["Sorting real warmth from performance.", ["Guarded", "Suspicion"]],
      ["Keeping your sweetness without over-explaining it.", ["Guilt", "MoralConflict"]],
      ["Staying composed when everyone’s watching.", ["Exceptional", "Pressure"]],
      ["Redefining what ‘success’ even means now.", ["Detached", "Existential"]]
    ]
  },

  3: {
    question: "Your relationship to ‘average’ success is now:",
    options: [
      ["Graceful. Every path has its own shine.", ["Grounded", "Humility"]],
      ["Nostalgic. It was simpler back then.", ["Isolated", "Longing"]],
      ["A little complicated, I didn’t ask for the distance.", ["Guilt", "Ambivalence"]],
      ["Irrelevant. Comparison doesn’t match this altitude.", ["Detached", "OutlierMindset"]],
      ["Discreet. I keep wins understated to stay easy to be around.", ["Boundaried", "SelfCensor"]]
    ]
  },

  4: {
    question: "When someone treats you like an exception, you:",
    options: [
      ["Nod. It’s just accurate.", ["Exceptional", "Acceptance"]],
      ["Deflect with charm. No pedestals, please.", ["Grounded", "Deflection"]],
      ["Feel a little weird, it changes the temperature.", ["Isolated", "Discomfort"]],
      ["Clock the vibes. People project.", ["Guarded", "Suspicion"]],
      ["Barely react. It’s background music now.", ["Detached", "LowAttachment"]]
    ]
  },

  5: {
    question: "The strategy you rely on most is:",
    options: [
      ["Staying close to people who knew me before the polish.", ["Continuity", "Grounded"]],
      ["Finding a tiny circle that actually gets it.", ["Isolated", "Selective"]],
      ["Keeping things tasteful and understated.", ["Guilt", "SelfCensor"]],
      ["Clear compartments. Clean lines. No chaos.", ["Boundaried", "Control"]],
      ["Soft detachment, fewer hooks, fewer tangles.", ["Detached", "OutlierMindset"]]
    ]
  },

  6: {
    question: "The sentence that feels truest is:",
    options: [
      ["I’m still me, the lighting just changed.", ["Grounded", "Continuity"]],
      ["I gained a lot… and the room got quieter.", ["Isolated", "Loss"]],
      ["I don’t feel ‘better’, just differently styled.", ["Detached", "Existential"]],
      ["I manage access. That’s the job now.", ["Boundaried", "Control"]],
      ["I live outside the curve, and I’ve made it look elegant.", ["Exceptional", "OutlierMindset"]]
    ]
  }
};

// Fame-native tags
const tags = {
  // Primary outlier responses
  Exceptional: 0,   // accepts exception status
  Isolated: 0,      // fewer peers / quieter room
  Guilt: 0,         // tenderness / conscience (kept glossy)
  Boundaried: 0,    // curated access
  Detached: 0,      // weightless distance

  // Secondary modifiers
  Grounded: 0,
  Continuity: 0,
  Earned: 0,

  Dislocation: 0,
  Unmoored: 0,
  Distance: 0,
  Loss: 0,

  Empathy: 0,
  MoralConflict: 0,
  SelfCensor: 0,

  Control: 0,
  Adaptive: 0,
  Guarded: 0,
  Suspicion: 0,

  LowAttachment: 0,
  OutlierMindset: 0,
  Existential: 0,
  Pressure: 0,
  Acceptance: 0,
  Humility: 0,
  Deflection: 0,
  Discomfort: 0,
  Selective: 0,
  Ambivalence: 0
};

function interpretResults() {
  // ----- pick dominant OUTLIER MODE -----
  const typeKeys = ["Exceptional", "Isolated", "Guilt", "Boundaried", "Detached"];
  let top = typeKeys[0];
  typeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 7;

  // Axis: Warmth vs Distance (kept light)
  const attachmentScore =
    (tags.Grounded + tags.Continuity + tags.Empathy) -
    (tags.Detached + tags.LowAttachment + tags.OutlierMindset);

  let attachmentPct = Math.round(((attachmentScore + totalQuestions) / (totalQuestions * 2)) * 100);
  attachmentPct = Math.max(0, Math.min(attachmentPct, 100));

  const isAttached = attachmentPct >= 60;

  let style;
  if (top === "Exceptional") style = "High-Glow";
  else if (top === "Isolated") style = "Quiet-Room";
  else if (top === "Guilt") style = "Soft-Heart";
  else if (top === "Boundaried") style = "Access-Curated";
  else style = "Weightless-Distance";

  const typeNames = {
    Exceptional: "Outlier",
    Isolated: "Outlier",
    Guilt: "Outlier",
    Boundaried: "Outlier",
    Detached: "Outlier"
  };

  const personaTitle = `${style} ${typeNames[top]}`;

  const coreBlurb = {
    Exceptional:
      "You wear exception-status like a tailored piece: clean, intentional, and hard-earned. The main move is staying luminous without becoming untouchable.",
    Isolated:
      "Your life has upgraded, and the room got quieter. You notice the gap, even when everything looks beautiful from the outside.",
    Guilt:
      "You keep your shine gentle. You’re tuned to how things land, so you move with extra care and a softer edge.",
    Boundaried:
      "You run your world like a private lounge: calm, curated, and on purpose. Access is a design choice, not an accident.",
    Detached:
      "You float above old scoreboards. The noise doesn’t stick, the comparisons don’t bite, and you keep things elegantly unbothered."
  }[top];

  const attachmentPhrase = isAttached
    ? "You keep a thread of warmth to people and meaning, even with the upgrade."
    : "You prefer light distance, it keeps everything smooth and low-drama.";

  const riskLine = {
    Exceptional: "Watch-out: becoming a symbol instead of a person.",
    Isolated: "Watch-out: the circle gets too small.",
    Guilt: "Watch-out: over-editing yourself to keep the peace.",
    Boundaried: "Watch-out: turning curation into a wall.",
    Detached: "Watch-out: drifting so far you stop feeling the fun."
  }[top];

  const para1 = `${coreBlurb} ${attachmentPhrase}`;
  const para2 = `${riskLine} Outlier life changes the vibe, so you learn new rules of ease.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByType = {
    Exceptional: "rgb(200, 90, 90)",
    Isolated: "rgb(200, 170, 90)",
    Guilt: "rgb(90, 120, 200)",
    Boundaried: "rgb(0, 170, 140)",
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

const quizTitle = "Being an Outlier";
