// losing-fame-quiz.js
// (Quiz 28) How would you feel when the spotlight moves on?
// PHASE 6 — LONG-TERM OUTCOMES (deep water, full synthesis)

const obj = {
  0: {
    question: "The spotlight moves on. Your phone is quiet. Your name stops popping up. Your first honest feeling is:",
    options: [
      ["Relief. The quiet feels roomy.", ["Relief", "Grounded", "NeedsPrivacy"]],
      ["Loss. It’s strange not being on people’s radar.", ["Loss", "SeeksValidation", "Sensitive"]],
      ["Resentment. After all that effort, it vanished fast.", ["Resentment", "BitterEdge", "JusticeMind"]],
      ["Stability. It’s just a new chapter. Life continues.", ["Grounding", "Stable", "Resilient"]]
    ]
  },

  1: {
    question: "A year later, you see new people getting the attention you used to get. You:",
    options: [
      ["Feel happy for them. It was never mine to keep.", ["Grounding", "Resilient", "Stable"]],
      ["Feel a dull tug. Part of me misses being noticed.", ["Loss", "SeeksValidation", "Sensitive"]],
      ["Feel annoyed. They didn’t earn it the way I did.", ["Resentment", "BitterEdge", "Comparison"]],
      ["Feel free. I’m glad it’s not my job anymore.", ["Relief", "NeedsPrivacy", "Detached"]]
    ]
  },

  2: {
    question: "The hardest part of the post-spotlight era would be:",
    options: [
      ["Not being able to steer the narrative.", ["Resentment", "Control", "JusticeMind"]],
      ["Losing the steady stream of feedback.", ["Loss", "SeeksValidation", "Open"]],
      ["Having to re-negotiate boundaries and access.", ["Relief", "NeedsPrivacy", "Boundary"]],
      ["Letting go of the “main character energy” of a public phase.", ["Loss", "IdentityShift", "Sensitive"]]
    ]
  },

  3: {
    question: "When someone recognizes you now, it feels:",
    options: [
      ["Nice — a small callback, not my whole deal.", ["Grounding", "Stable", "Open"]],
      ["Weirdly heavy — like an old headline resurfacing.", ["Loss", "IdentityShift", "Sensitive"]],
      ["Irritating — people still act entitled.", ["Resentment", "Boundary", "BitterEdge"]],
      ["Awkward — I’m not sure where it fits anymore.", ["Relief", "Detached", "Boundary"]]
    ]
  },

  4: {
    question: "If you could press a button and be famous again tomorrow, you would:",
    options: [
      ["No. I like the quiet version of life now.", ["Relief", "NeedsPrivacy", "Boundary"]],
      ["Yes. I miss it more than I say out loud.", ["Loss", "SeeksValidation", "Open"]],
      ["Yes, but on my terms. I’d control access.", ["Resentment", "Control", "Boundary"]],
      ["Maybe — if it fit the life I have now.", ["Grounding", "Stable", "Resilient"]]
    ]
  },

  5: {
    question: "The version of you after fame is most likely to be:",
    options: [
      ["More private, calmer, and harder to reach.", ["Relief", "NeedsPrivacy", "Protected"]],
      ["Restless, scanning for the next big thing.", ["Loss", "SeeksValidation", "Restless"]],
      ["Sharper and more skeptical about people.", ["Resentment", "BitterEdge", "Guarded"]],
      ["Grounded and real. Less performance, more life.", ["Grounding", "Resilient", "Stable"]]
    ]
  },

  6: {
    question: "If people remember you for one thing — and it’s not what you wanted — you:",
    options: [
      ["Let it go. That’s not mine to manage anymore.", ["Relief", "Detached", "Resilient"]],
      ["Feel disappointed. I wanted to be understood better.", ["Loss", "Sensitive", "IdentityShift"]],
      ["Feel irritated. That’s careless and unfair.", ["Resentment", "JusticeMind", "BitterEdge"]],
      ["Accept it. Most legacies get simplified.", ["Grounding", "Stable", "Resilient"]]
    ]
  },

  7: {
    question: "What helps you most in the post-spotlight era?",
    options: [
      ["Quiet routines and privacy.", ["Relief", "NeedsPrivacy", "Grounded"]],
      ["A smaller circle that’s real and consistent.", ["Grounding", "Stable", "Resilient"]],
      ["A new project that proves I’ve still got it.", ["Loss", "Restless", "SeeksValidation"]],
      ["Telling the full story in your own words.", ["Resentment", "JusticeMind", "Control"]]
    ]
  }
};

// Fame-native tags for Quiz 28
const tags = {
  // Primary outcomes: after-spotlight vibe
  Relief: 0,
  Loss: 0,
  Resentment: 0,
  Grounding: 0,

  // Secondary modifiers
  NeedsPrivacy: 0,
  Boundary: 0,
  Protected: 0,

  SeeksValidation: 0,
  Restless: 0,

  Sensitive: 0,
  Detached: 0,
  Guarded: 0,

  Control: 0,
  JusticeMind: 0,
  BitterEdge: 0,
  Comparison: 0,

  IdentityShift: 0,

  Stable: 0,
  Resilient: 0,
  Open: 0,
  Grounded: 0
};

function interpretResults() {
  // ----- pick dominant outcome -----
  const outcomeKeys = ["Relief", "Loss", "Resentment", "Grounding"];
  let top = outcomeKeys[0];
  outcomeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 8;

  // ----- axes -----
  // Privacy: NeedsPrivacy/Boundary vs Open/SeeksValidation
  const privacyScore = (tags.NeedsPrivacy + tags.Boundary) - (tags.Open + tags.SeeksValidation);
  let privacyPct = Math.round(((privacyScore + totalQuestions) / (totalQuestions * 3)) * 100);
  privacyPct = Math.max(0, Math.min(privacyPct, 100));

  // Integration: Resilient/Stable/Grounded vs Restless/BitterEdge/IdentityShift
  const integrateScore =
    (tags.Resilient + tags.Stable + tags.Grounded) - (tags.Restless + tags.BitterEdge + tags.IdentityShift);
  let integratePct = Math.round(((integrateScore + totalQuestions) / (totalQuestions * 3)) * 100);
  integratePct = Math.max(0, Math.min(integratePct, 100));

  // Heat: Resentment/Loss vs Relief/Grounding (overall charge)
  const heatScore = (tags.Resentment + tags.Loss) - (tags.Relief + tags.Grounding);
  let heatPct = Math.round(((heatScore + totalQuestions) / (totalQuestions * 4)) * 100);
  heatPct = Math.max(0, Math.min(heatPct, 100));

  // ----- style adjective -----
  const isHighPrivacy = privacyPct >= 60;
  const isIntegrated = integratePct >= 60;
  const isHighHeat = heatPct >= 60;

  let style;
  if (isIntegrated && !isHighHeat) style = "Integrated";
  else if (isHighHeat && !isIntegrated) style = "Spicy";
  else if (isHighPrivacy) style = "Low-Access";
  else style = "In-Between";

  const outcomeNames = {
    Relief: "Relief",
    Loss: "Loss",
    Resentment: "Resentment",
    Grounding: "Grounded"
  };

  const personaTitle = `${style} ${outcomeNames[top]}`;

  const outcomeBlurb = {
    Relief:
      "When the spotlight moves on, your first reaction is relief. Less noise, more room to live.",
    Loss:
      "When the spotlight moves on, you feel a sense of loss — not because life is empty, but because being noticed used to be part of the atmosphere.",
    Resentment:
      "When the spotlight moves on, you feel resentment. It’s hard not to side-eye how quickly the crowd turns the page.",
    Grounding:
      "When the spotlight moves on, you feel grounded. You treat it like a season — meaningful, but not permanent."
  }[top];

  const privacyPhrase =
    privacyPct >= 60
      ? "You reset best with privacy, routines, and controlled access."
      : "You reset best through connection, conversation, and being seen by real people.";

  const integratePhrase =
    integratePct >= 60
      ? "You’re more likely to fold the whole era into your story without making it the only chapter."
      : "You’re more likely to feel like you’re rewriting the script as you go.";

  const heatPhrase =
    heatPct >= 60
      ? "The feelings stay spicy for a while — it takes time to cool off."
      : "You cool off faster and move forward with less lingering charge.";

  const para1 = `${outcomeBlurb} ${privacyPhrase} ${integratePhrase} ${heatPhrase}`;

  const para2 =
    "Next up: what people would reduce you to in the end — the legacy compression problem.";

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByOutcome = {
    Relief: "rgb(0, 170, 140)",
    Loss: "rgb(90, 120, 200)",
    Resentment: "rgb(200, 90, 90)",
    Grounding: "rgb(120, 120, 140)"
  };

  // Reset tags
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByOutcome[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Losing Fame";
