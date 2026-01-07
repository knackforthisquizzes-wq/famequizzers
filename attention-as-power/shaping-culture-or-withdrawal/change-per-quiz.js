// shaping-culture-or-withdrawal-quiz.js
// (Quiz 24) Would you step into influence or quietly back away?
// PHASE 5 — ATTENTION AS POWER (celebrity becomes force)

const obj = {
  0: {
    question: "People start looking to you for opinions on social or cultural issues. Your instinct is to:",
    options: [
      ["Speak up. If I have reach, I should use it.", ["Shaper", "HighEngagement", "ResponsibilityDriven"]],
      ["Speak selectively. Not everything needs my voice.", ["SelectiveActor", "MeasuredEngagement", "Boundary"]],
      ["Stay neutral. My platform isn’t a soapbox.", ["NonParticipant", "LowEngagement", "Detached"]],
      ["Pull back. I don’t want that kind of weight.", ["Withdrawer", "NeedsPrivacy", "Overloaded"]]
    ]
  },

  1: {
    question: "You notice that when you comment on something, people change their behavior because of it. You feel:",
    options: [
      ["Motivated. Influence should do something.", ["Shaper", "AgencyFocused", "HighEngagement"]],
      ["Careful. That kind of power needs restraint.", ["SelectiveActor", "Boundary", "ResponsibilityDriven"]],
      ["Uneasy. I didn’t sign up to steer people.", ["NonParticipant", "Detached", "LowEngagement"]],
      ["Avoidant. I’d rather not affect others at all.", ["Withdrawer", "Overloaded", "NeedsPrivacy"]]
    ]
  },

  2: {
    question: "A controversial issue explodes, and people pressure you to take a stance. You:",
    options: [
      ["Take a clear position, even if it costs followers.", ["Shaper", "Conviction", "HighEngagement"]],
      ["Respond with nuance and limits.", ["SelectiveActor", "MeasuredEngagement", "Boundary"]],
      ["Say nothing. Silence is cleaner.", ["NonParticipant", "Detached", "LowEngagement"]],
      ["Log off. The noise feels too much.", ["Withdrawer", "NeedsRecovery", "Overloaded"]]
    ]
  },

  3: {
    question: "Your silence on an issue is interpreted as a statement. That makes you:",
    options: [
      ["Speak up more clearly next time.", ["Shaper", "Control", "HighEngagement"]],
      ["Clarify once, then disengage.", ["SelectiveActor", "Boundary", "MeasuredEngagement"]],
      ["Accept that people will project regardless.", ["NonParticipant", "Detached", "ThickSkin"]],
      ["Want to reduce visibility altogether.", ["Withdrawer", "NeedsPrivacy", "Sensitive"]]
    ]
  },

  4: {
    question: "If your influence could realistically shape culture, the responsibility feels:",
    options: [
      ["Worth it. Impact matters.", ["Shaper", "ResponsibilityDriven", "AgencyFocused"]],
      ["Heavy, but manageable with limits.", ["SelectiveActor", "Boundary", "ResponsibilityDriven"]],
      ["Unwanted. Culture shouldn’t hinge on individuals.", ["NonParticipant", "Detached", "Skeptical"]],
      ["Overwhelming. I don’t want that role.", ["Withdrawer", "Overloaded", "NeedsPrivacy"]]
    ]
  },

  5: {
    question: "Your audience starts expecting leadership from you. You:",
    options: [
      ["Lean into it. Leadership is part of influence.", ["Shaper", "Conviction", "HighEngagement"]],
      ["Redefine the relationship with clear boundaries.", ["SelectiveActor", "Boundary", "Control"]],
      ["Resist it. I didn’t agree to lead anyone.", ["NonParticipant", "Detached", "LowEngagement"]],
      ["Distance yourself so expectations drop.", ["Withdrawer", "NeedsRecovery", "Guarded"]]
    ]
  },

  6: {
    question: "Which feels more dangerous to you?",
    options: [
      ["Having influence and not using it.", ["Shaper", "ResponsibilityDriven", "AgencyFocused"]],
      ["Using influence carelessly.", ["SelectiveActor", "Boundary", "ResponsibilityDriven"]],
      ["Letting influence distort personal freedom.", ["NonParticipant", "Skeptical", "Detached"]],
      ["Letting influence consume my life.", ["Withdrawer", "Overloaded", "NeedsPrivacy"]]
    ]
  },

  7: {
    question: "Your ideal relationship to influence looks like:",
    options: [
      ["Active. I help steer conversations and norms.", ["Shaper", "HighEngagement", "AgencyFocused"]],
      ["Conditional. I engage when it aligns with my values.", ["SelectiveActor", "MeasuredEngagement", "Boundary"]],
      ["Minimal. I keep my work separate from influence.", ["NonParticipant", "LowEngagement", "Detached"]],
      ["Distant. I’d rather not be a reference point.", ["Withdrawer", "NeedsPrivacy", "Guarded"]]
    ]
  }
};

// Fame-native tags for Quiz 24
const tags = {
  // Primary outcomes: relationship to influence-as-power
  Shaper: 0,           // actively uses influence to shape culture
  SelectiveActor: 0,   // engages with boundaries and restraint
  NonParticipant: 0,   // avoids shaping culture intentionally
  Withdrawer: 0,       // reduces visibility to escape influence

  // Secondary modifiers
  HighEngagement: 0,
  MeasuredEngagement: 0,
  LowEngagement: 0,

  ResponsibilityDriven: 0,
  AgencyFocused: 0,
  Conviction: 0,

  Boundary: 0,
  Control: 0,

  Detached: 0,
  Skeptical: 0,

  ThickSkin: 0,
  Sensitive: 0,

  Overloaded: 0,
  NeedsPrivacy: 0,
  NeedsRecovery: 0,
  Guarded: 0
};

function interpretResults() {
  // ----- pick dominant outcome -----
  const outcomeKeys = ["Shaper", "SelectiveActor", "NonParticipant", "Withdrawer"];
  let top = outcomeKeys[0];
  outcomeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 8;

  // ----- axes -----
  // Engagement: High vs Low
  const engageScore = tags.HighEngagement - tags.LowEngagement;
  let engagePct = Math.round(((engageScore + totalQuestions) / (totalQuestions * 2)) * 100);
  engagePct = Math.max(0, Math.min(engagePct, 100));

  // Responsibility: ResponsibilityDriven vs Skeptical
  const respScore = tags.ResponsibilityDriven - tags.Skeptical;
  let respPct = Math.round(((respScore + totalQuestions) / (totalQuestions * 2)) * 100);
  respPct = Math.max(0, Math.min(respPct, 100));

  // Capacity: Control/Boundary vs Overloaded
  const capScore = (tags.Control + tags.Boundary) - tags.Overloaded;
  let capPct = Math.round(((capScore + totalQuestions) / (totalQuestions * 3)) * 100);
  capPct = Math.max(0, Math.min(capPct, 100));

  // ----- style adjective -----
  const isHighEngage = engagePct >= 60;
  const isHighResp = respPct >= 60;
  const isLowCap = capPct <= 40;

  let style;
  if (isHighEngage && isHighResp) style = "Culture-Driver";
  else if (isHighResp && !isHighEngage) style = "Reluctant-Leader";
  else if (isLowCap) style = "Overloaded";
  else style = "Hands-Off";

  const outcomeNames = {
    Shaper: "Shaper",
    SelectiveActor: "Selective Actor",
    NonParticipant: "Non-Participant",
    Withdrawer: "Withdrawer"
  };

  const personaTitle = `${style} ${outcomeNames[top]}`;

  const outcomeBlurb = {
    Shaper:
      "You’d step into influence on purpose. If attention gives you leverage, you’d rather steer it than let it drift.",
    SelectiveActor:
      "You’d engage carefully. You’re willing to shape culture—but only inside boundaries you control.",
    NonParticipant:
      "You’d avoid shaping culture intentionally. Influence feels like a side effect, not a role you want to take on.",
    Withdrawer:
      "You’d pull back. Once attention starts carrying weight, your instinct is to reduce exposure and protect your life."
  }[top];

  const engagePhrase =
    engagePct >= 60
      ? "You’re comfortable being visible and vocal when it matters."
      : "You prefer distance over constant public engagement.";

  const respPhrase =
    respPct >= 60
      ? "You feel a pull to do something with influence, not just have it."
      : "You’re skeptical of individuals steering collective behavior.";

  const capPhrase =
    capPct >= 60
      ? "With boundaries, you can carry influence without it swallowing your identity."
      : "Without limits, influence would start to feel like a trap.";

  const para1 = `${outcomeBlurb} ${engagePhrase} ${respPhrase} ${capPhrase}`;

  const forwardHook = {
    Shaper: "Next comes the hardest test: what happens when attention turns hostile?",
    SelectiveActor: "Next: hostile attention—because influence attracts resistance.",
    NonParticipant: "Next: hostile attention—because even silence can provoke backlash.",
    Withdrawer: "Next: hostile attention—because withdrawal doesn’t always stop it."
  }[top];

  const description = `${para1}<br><br>${forwardHook}`;

  const colorByOutcome = {
    Shaper: "rgb(0, 170, 140)",
    SelectiveActor: "rgb(90, 120, 200)",
    NonParticipant: "rgb(200, 170, 90)",
    Withdrawer: "rgb(200, 90, 90)"
  };

  // Reset tags
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByOutcome[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Shaping Culture";
