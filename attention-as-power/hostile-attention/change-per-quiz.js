// hostile-attention-quiz.js
// (Quiz 25) How do you react when attention turns hostile?
// PHASE 5 — ATTENTION AS POWER (celebrity becomes force)

const obj = {
  0: {
    question: "A wave of criticism hits. The comments aren’t just disagreement — they’re personal. You:",
    options: [
      ["Address it directly. I’m not letting rumors sit.", ["Confronter", "HighEngagement", "Control"]],
      ["Respond once, clearly, then stop engaging.", ["BoundarySetter", "MeasuredEngagement", "Control"]],
      ["Say nothing publicly, but still notice it.", ["Absorber", "LowEngagement", "Aware"]],
      ["Step back from visibility for a while.", ["Vanisher", "NeedsPrivacy", "LowEngagement"]]
    ]
  },

  1: {
    question: "Someone makes a viral joke at your expense. Your first reaction is:",
    options: [
      ["Push back. I don’t let things slide.", ["Confronter", "Reactive", "ThickSkin"]],
      ["Annoyed, but composed.", ["BoundarySetter", "ThickSkin", "Control"]],
      ["Cringing and replaying it.", ["Absorber", "Aware", "Overthinking"]],
      ["Checking out mentally and scrolling past.", ["Vanisher", "Detached", "LowEngagement"]]
    ]
  },

  2: {
    question: "A false accusation starts spreading. Your priority is:",
    options: [
      ["Correct the record publicly.", ["Confronter", "HighEngagement", "Control"]],
      ["One clear statement through official channels.", ["BoundarySetter", "Control", "Boundary"]],
      ["Shielding people close to me from the noise.", ["Absorber", "Aware", "Boundary"]],
      ["Reducing exposure as fast as possible.", ["Vanisher", "NeedsPrivacy", "Boundary"]]
    ]
  },

  3: {
    question: "When you notice hostile threads about you, you tend to:",
    options: [
      ["Read them. I want context.", ["Confronter", "HighEngagement", "Reactive"]],
      ["Skim once, then disengage.", ["BoundarySetter", "MeasuredEngagement", "Boundary"]],
      ["Read more than I should.", ["Absorber", "Overthinking", "Aware"]],
      ["Avoid them entirely.", ["Vanisher", "NeedsPrivacy", "LowEngagement"]]
    ]
  },

  4: {
    question: "During public backlash, your instinct is to protect:",
    options: [
      ["My reputation. Narrative matters.", ["Confronter", "Control", "HighEngagement"]],
      ["My boundaries. I won’t be dragged.", ["BoundarySetter", "Boundary", "Control"]],
      ["My inner circle and private space.", ["Absorber", "Boundary", "Aware"]],
      ["My personal life. Less access, period.", ["Vanisher", "NeedsPrivacy", "Guarded"]]
    ]
  },

  5: {
    question: "If hostility lasts for months, you’d most likely:",
    options: [
      ["Get sharper and more strategic.", ["Confronter", "ThickSkin", "Control"]],
      ["Operate with strict rules and limited engagement.", ["BoundarySetter", "Boundary", "Control"]],
      ["Change how openly I show up.", ["Absorber", "Aware", "LowEngagement"]],
      ["Step back from public-facing roles.", ["Vanisher", "NeedsPrivacy", "Exit"]]
    ]
  },

  6: {
    question: "Which kind of hostility bothers you most?",
    options: [
      ["False framing or misinformation.", ["Confronter", "Control", "ThickSkin"]],
      ["People crossing personal boundaries.", ["BoundarySetter", "Boundary", "ThickSkin"]],
      ["Mockery or being turned into a punchline.", ["Absorber", "Aware", "Overthinking"]],
      ["Anything that feels invasive.", ["Vanisher", "NeedsPrivacy", "Guarded"]]
    ]
  },

  7: {
    question: "Your long-term approach to hostile attention would be:",
    options: [
      ["Engage and correct. I won’t let it define me.", ["Confronter", "HighEngagement", "Reactive"]],
      ["Respond selectively and keep distance.", ["BoundarySetter", "MeasuredEngagement", "Boundary"]],
      ["Limit exposure but stay visible.", ["Absorber", "Aware", "LowEngagement"]],
      ["Disengage hard until the noise fades.", ["Vanisher", "NeedsPrivacy", "Exit"]]
    ]
  }
};

// Fame-native tags for Quiz 25
const tags = {
  // Primary outcomes
  Confronter: 0,
  BoundarySetter: 0,
  Absorber: 0,
  Vanisher: 0,

  // Engagement
  HighEngagement: 0,
  MeasuredEngagement: 0,
  LowEngagement: 0,

  // Modifiers
  Control: 0,
  Boundary: 0,

  ThickSkin: 0,
  Aware: 0,

  Reactive: 0,
  Overthinking: 0,

  NeedsPrivacy: 0,
  Detached: 0,

  Guarded: 0,
  Exit: 0
};

function interpretResults() {
  const outcomeKeys = ["Confronter", "BoundarySetter", "Absorber", "Vanisher"];
  let top = outcomeKeys[0];
  outcomeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 8;

  const engageScore = tags.HighEngagement - tags.LowEngagement;
  let engagePct = Math.round(((engageScore + totalQuestions) / (totalQuestions * 2)) * 100);

  const skinScore = tags.ThickSkin - tags.Aware;
  let skinPct = Math.round(((skinScore + totalQuestions) / (totalQuestions * 2)) * 100);

  const capScore = (tags.Control + tags.Boundary) - tags.Detached;
  let capPct = Math.round(((capScore + totalQuestions) / (totalQuestions * 3)) * 100);

  engagePct = Math.max(0, Math.min(engagePct, 100));
  skinPct = Math.max(0, Math.min(skinPct, 100));
  capPct = Math.max(0, Math.min(capPct, 100));

  let style;
  if (engagePct >= 60 && skinPct >= 60) style = "Steel-Front";
  else if (skinPct >= 60) style = "Stone-Cool";
  else if (capPct <= 40) style = "Low-Exposure";
  else style = "Selective-Response";

  const outcomeNames = {
    Confronter: "Confronter",
    BoundarySetter: "Boundary Setter",
    Absorber: "Absorber",
    Vanisher: "Vanisher"
  };

  const personaTitle = `${style} ${outcomeNames[top]}`;

  const outcomeBlurb = {
    Confronter:
      "When attention turns hostile, you respond head-on. You’d rather challenge the narrative than let it harden without you.",
    BoundarySetter:
      "You engage on your terms. You’ll address what matters, then step back before it becomes a spectacle.",
    Absorber:
      "You notice everything. Even without responding publicly, the tone of attention shapes how you show up.",
    Vanisher:
      "You reduce access fast. When things turn sour, distance is your primary tool."
  }[top];

  const para1 = outcomeBlurb;

  const forwardHook =
    "That closes Phase 5 — attention as power. Next comes the aftermath: what prolonged visibility turns you into.";

  const description = `${para1}<br><br>${forwardHook}`;

  const colorByOutcome = {
    Confronter: "rgb(0, 170, 140)",
    BoundarySetter: "rgb(90, 120, 200)",
    Absorber: "rgb(200, 170, 90)",
    Vanisher: "rgb(200, 90, 90)"
  };

  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByOutcome[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Backlash Mode";
