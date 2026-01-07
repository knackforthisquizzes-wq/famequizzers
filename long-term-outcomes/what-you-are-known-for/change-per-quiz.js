// what-you-are-known-for-quiz.js
// (Quiz 29) What would people reduce you to in the end?
// PHASE 6 — LONG-TERM OUTCOMES (deep water, full synthesis)

const obj = {
  0: {
    question: "If the public reduced you to one dominant trait, it would most likely be:",
    options: [
      ["Talent. People would point to what I can do.", ["TalentLegacy", "Craft", "EarnedRespect"]],
      ["Style. People would copy my vibe more than my work.", ["StyleLegacy", "Iconic", "Aesthetic"]],
      ["Opinion. People would quote what I say and argue about it.", ["OpinionLegacy", "Polarizing", "Voice"]],
      ["Mystery. People would project and speculate more than they understand.", ["MysteryLegacy", "Projected", "Distance"]]
    ]
  },

  1: {
    question: "The version of you the internet would keep alive is:",
    options: [
      ["The expert version. The one who delivers.", ["TalentLegacy", "Craft", "Disciplined"]],
      ["The look. The image. The aesthetic snapshot.", ["StyleLegacy", "Aesthetic", "Iconic"]],
      ["The hot-take machine. The headline generator.", ["OpinionLegacy", "Voice", "Polarizing"]],
      ["The unreadable one. The myth people fill in.", ["MysteryLegacy", "Distance", "Projected"]]
    ]
  },

  2: {
    question: "What would annoy you most about being remembered?",
    options: [
      ["People ignoring the work and focusing on surface details.", ["TalentLegacy", "Misunderstood", "EarnedRespect"]],
      ["People copying my look while missing my point.", ["StyleLegacy", "Misread", "Aesthetic"]],
      ["People twisting my words into something uglier.", ["OpinionLegacy", "Misunderstood", "ThinSkin"]],
      ["People inventing stories because I didn’t explain myself.", ["MysteryLegacy", "Projected", "ControlNeed"]]
    ]
  },

  3: {
    question: "If your legacy got flattened into one moment, it would most likely be:",
    options: [
      ["A performance or achievement people can replay.", ["TalentLegacy", "AnchorMoment", "Craft"]],
      ["An image people still post years later.", ["StyleLegacy", "AnchorMoment", "Iconic"]],
      ["A quote that keeps resurfacing.", ["OpinionLegacy", "AnchorMoment", "Voice"]],
      ["A scandal or rumor people can’t let go of.", ["MysteryLegacy", "AnchorMoment", "Projected"]]
    ]
  },

  4: {
    question: "Which kind of recognition would feel most true to you?",
    options: [
      ["Respect for skill. Being known as genuinely good.", ["TalentLegacy", "EarnedRespect", "Grounded"]],
      ["Being a symbol. People feeling something when they see me.", ["StyleLegacy", "Iconic", "Aesthetic"]],
      ["Having impact through ideas. People changing how they think.", ["OpinionLegacy", "Voice", "Impact"]],
      ["Being hard to categorize. Leaving people slightly unsure.", ["MysteryLegacy", "Distance", "Protected"]]
    ]
  },

  5: {
    question: "Which “reduction” would bother you least (even if it’s imperfect)?",
    options: [
      ["At least they remember the work.", ["TalentLegacy", "Grounded", "Craft"]],
      ["At least they felt something from my presence.", ["StyleLegacy", "Iconic", "Aesthetic"]],
      ["At least my words mattered, even if messy.", ["OpinionLegacy", "Impact", "Polarizing"]],
      ["At least I stayed private. They never fully had me.", ["MysteryLegacy", "Protected", "Distance"]]
    ]
  },

  6: {
    question: "If someone misunderstood you at the end, you’d be most tempted to:",
    options: [
      ["Let the work speak. Time will clarify.", ["TalentLegacy", "Grounded", "ThickSkin"]],
      ["Drop one final statement and disappear.", ["OpinionLegacy", "ControlNeed", "Voice"]],
      ["Curate the image carefully until the end.", ["StyleLegacy", "ControlNeed", "Aesthetic"]],
      ["Say nothing. Being misread is the price of distance.", ["MysteryLegacy", "Distance", "Protected"]]
    ]
  },

  7: {
    question: "Your most realistic final public label would be:",
    options: [
      ["“The real one.” Reliable, skilled, respected.", ["TalentLegacy", "EarnedRespect", "Disciplined"]],
      ["“The icon.” A look, a symbol, a vibe.", ["StyleLegacy", "Iconic", "Aesthetic"]],
      ["“The voice.” Quoted, debated, remembered for words.", ["OpinionLegacy", "Voice", "Impact"]],
      ["“The enigma.” Speculated on more than understood.", ["MysteryLegacy", "Projected", "Distance"]]
    ]
  }
};

// Fame-native tags for Quiz 29
const tags = {
  // Primary outcomes: what you get reduced to
  TalentLegacy: 0,
  StyleLegacy: 0,
  OpinionLegacy: 0,
  MysteryLegacy: 0,

  // Secondary modifiers
  Craft: 0,
  EarnedRespect: 0,
  Disciplined: 0,
  Grounded: 0,
  ThickSkin: 0,

  Iconic: 0,
  Aesthetic: 0,

  Voice: 0,
  Impact: 0,
  Polarizing: 0,
  ThinSkin: 0,

  Distance: 0,
  Projected: 0,
  Protected: 0,

  Misunderstood: 0,
  Misread: 0,
  AnchorMoment: 0,
  ControlNeed: 0
};

function interpretResults() {
  // ----- pick dominant outcome -----
  const outcomeKeys = ["TalentLegacy", "StyleLegacy", "OpinionLegacy", "MysteryLegacy"];
  let top = outcomeKeys[0];
  outcomeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 8;

  // ----- axes -----
  // Substance: Craft/EarnedRespect/Grounded vs Aesthetic/Projected
  const substanceScore = (tags.Craft + tags.EarnedRespect + tags.Grounded) - (tags.Aesthetic + tags.Projected);
  let substancePct = Math.round(((substanceScore + totalQuestions) / (totalQuestions * 3)) * 100);
  substancePct = Math.max(0, Math.min(substancePct, 100));

  // Control: ControlNeed vs Distance
  const controlScore = tags.ControlNeed - tags.Distance;
  let controlPct = Math.round(((controlScore + totalQuestions) / (totalQuestions * 2)) * 100);
  controlPct = Math.max(0, Math.min(controlPct, 100));

  // Heat: Polarizing/ThinSkin vs ThickSkin/Grounded
  const heatScore = (tags.Polarizing + tags.ThinSkin) - (tags.ThickSkin + tags.Grounded);
  let heatPct = Math.round(((heatScore + totalQuestions) / (totalQuestions * 2)) * 100);
  heatPct = Math.max(0, Math.min(heatPct, 100));

  // ----- style adjective -----
  const isSubstantial = substancePct >= 60;
  const isHighControl = controlPct >= 60;
  const isHighHeat = heatPct >= 60;

  let style;
  if (isSubstantial && !isHighHeat) style = "Substance";
  else if (isHighHeat) style = "Spicy";
  else if (isHighControl) style = "Curated";
  else style = "Projected";

  const outcomeNames = {
    TalentLegacy: "Talent",
    StyleLegacy: "Icon",
    OpinionLegacy: "Voice",
    MysteryLegacy: "Enigma"
  };

  const personaTitle = `${style} ${outcomeNames[top]}`;

  const outcomeBlurb = {
    TalentLegacy:
      "In the end, people would reduce you to what you can do. Your work becomes the anchor — the thing they point to as proof.",
    StyleLegacy:
      "In the end, people would reduce you to image and vibe. You become a symbol people repost and imitate, even when they don’t understand you.",
    OpinionLegacy:
      "In the end, people would reduce you to your words. Quotes, takes, arguments — your voice becomes the artifact.",
    MysteryLegacy:
      "In the end, people would reduce you to mystery. The less they know, the more they project — and the projection becomes the legacy."
  }[top];

  const substancePhrase =
    substancePct >= 60
      ? "You’re more grounded in craft and earned respect than in optics."
      : "Your public memory is more image-driven than work-driven.";

  const controlPhrase =
    controlPct >= 60
      ? "You’d want to steer how you’re remembered — even at the end."
      : "You’re more likely to let people reduce you without fighting it.";

  const heatPhrase =
    heatPct >= 60
      ? "Your legacy would carry heat: debate, emotion, or distortion."
      : "Your legacy would feel steadier, less charged.";

  const para1 = `${outcomeBlurb} ${substancePhrase} ${controlPhrase} ${heatPhrase}`;

  const para2 =
    "Next up: where you actually fit in the attention world — niche, mid-level, wide-scale, or rare outlier.";

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByOutcome = {
    TalentLegacy: "rgb(0, 170, 140)",
    StyleLegacy: "rgb(200, 170, 90)",
    OpinionLegacy: "rgb(90, 120, 200)",
    MysteryLegacy: "rgb(120, 120, 140)"
  };

  // Reset tags
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByOutcome[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "What You Are Known For";
