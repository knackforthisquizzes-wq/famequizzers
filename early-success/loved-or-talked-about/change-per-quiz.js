// loved-or-talked-about-quiz.js
// (Quiz 8) Would you rather be admired or impossible to ignore?

const obj = {
  0: {
    question: "When people start noticing you, the kind of attention you crave most is:",
    options: [
      ["Quiet respect, people think highly of me, even if they don’t post about it.", ["Admired", "LowDrama", "Controlled"]],
      ["Big visibility, I want to be the topic, even if it’s messy.", ["TalkedAbout", "HighHeat", "Uncontrolled"]],
      ["A mix, I want respect, but I don’t mind noise.", ["Mixed", "MediumHeat"]],
      ["Neither, I want the work to be noticed, not *me*.", ["Avoidant", "LowHeat", "Controlled"]]
    ]
  },

  1: {
    question: "If the internet misunderstands you, your first instinct is:",
    options: [
      ["Correct it calmly and move on.", ["Admired", "Controlled", "Resilient"]],
      ["Clap back or stir the pot. If they’re watching, I’m using it.", ["TalkedAbout", "Uncontrolled", "Volatile"]],
      ["Let it pass. Arguing feeds it.", ["Admired", "LowHeat", "Resilient"]],
      ["Disappear for a bit. I hate being misread.", ["Avoidant", "LowHeat", "Fragile"]]
    ]
  },

  2: {
    question: "Which feels like a worse fate?",
    options: [
      ["Being famous but not respected.", ["Admired", "StatusDriven"]],
      ["Being respected but not relevant.", ["TalkedAbout", "RelevanceDriven"]],
      ["Being both admired *and* constantly dissected.", ["Mixed", "HighHeat"]],
      ["Being known enough to be watched, but not enough to be protected.", ["Avoidant", "Fragile", "LowHeat"]]
    ]
  },

  3: {
    question: "A creator you secretly envy is usually someone who:",
    options: [
      ["Has a clean reputation and steady loyal support.", ["Admired", "Controlled", "LowDrama"]],
      ["Dominates the conversation, love or hate, they run the timeline.", ["TalkedAbout", "HighHeat", "Uncontrolled"]],
      ["Feels human and relatable without being a circus.", ["Mixed", "MediumHeat", "LowDrama"]],
      ["Can make money and stay mostly unknown.", ["Avoidant", "Controlled", "LowHeat"]]
    ]
  },

  4: {
    question: "If controversy boosts your numbers overnight, you:",
    options: [
      ["Try to steer it back to something respectable.", ["Admired", "Controlled", "LowDrama"]],
      ["Ride it. Attention is oxygen.", ["TalkedAbout", "Uncontrolled", "HighHeat"]],
      ["Take the boost but set boundaries fast.", ["Mixed", "Controlled", "MediumHeat"]],
      ["Panic. I don’t want that kind of spotlight.", ["Avoidant", "Fragile", "LowHeat"]]
    ]
  },

  5: {
    question: "Your ideal fan behavior is:",
    options: [
      ["They defend my character and point to the work.", ["Admired", "StatusDriven", "LowDrama"]],
      ["They quote me, remix me, argue about me, constant motion.", ["TalkedAbout", "RelevanceDriven", "HighHeat"]],
      ["They support me, but don’t make me their identity.", ["Mixed", "LowDrama"]],
      ["They leave me alone and just buy what I make.", ["Avoidant", "Controlled", "LowHeat"]]
    ]
  },

  6: {
    question: "Deep down, what scares you more?",
    options: [
      ["Being clowned or treated like a joke.", ["Admired", "Fragile", "StatusDriven"]],
      ["Being ignored once the novelty wears off.", ["TalkedAbout", "Fragile", "RelevanceDriven"]],
      ["Getting trapped between wanting love and needing distance.", ["Mixed", "MediumHeat", "Fragile"]],
      ["Losing privacy and never getting it back.", ["Avoidant", "Controlled", "LowHeat"]]
    ]
  }
};

// Tags for Quiz 8
const tags = {
  // Primary outcomes
  Admired: 0,      // prefers respect, reputation, clean support
  TalkedAbout: 0,  // prefers dominance, visibility, conversation
  Mixed: 0,        // wants both, tries to balance
  Avoidant: 0,     // wants the work noticed, not self exposure

  // Heat axis
  HighHeat: 0,
  MediumHeat: 0,
  LowHeat: 0,

  // Control / volatility
  Controlled: 0,
  Uncontrolled: 0,

  // Social texture
  LowDrama: 0,

  // Motivators
  StatusDriven: 0,
  RelevanceDriven: 0,

  // Stability under interpretation
  Resilient: 0,
  Fragile: 0,
  Volatile: 0
};

function interpretResults() {
  // ----- pick dominant TYPE -----
  const typeKeys = ["Admired", "TalkedAbout", "Mixed", "Avoidant"];
  let topType = typeKeys[0];
  typeKeys.forEach(k => {
    if (tags[k] > tags[topType]) topType = k;
  });

  const totalQuestions = 7;

  // ----- heat % (HighHeat vs LowHeat, MediumHeat dampens) -----
  const heatScore = (tags.HighHeat * 1) + (tags.MediumHeat * 0.25) - (tags.LowHeat * 1);
  let heatPct = Math.round(((heatScore + totalQuestions) / (totalQuestions * 2)) * 100);
  heatPct = Math.max(0, Math.min(heatPct, 100));

  // ----- control % (Controlled vs Uncontrolled) -----
  const controlScore = tags.Controlled - tags.Uncontrolled;
  let controlPct = Math.round(((controlScore + totalQuestions) / (totalQuestions * 2)) * 100);
  controlPct = Math.max(0, Math.min(controlPct, 100));

  // ----- stability adjective -----
  const fragileBias = tags.Fragile - tags.Resilient; // >0 means more fragile
  const volatileBias = tags.Volatile; // any positive implies heat-seeking reactions

  const isHot = heatPct >= 60;
  const isControlled = controlPct >= 60;

  let style;
  if (topType === "TalkedAbout" && isHot && !isControlled) style = "Chaos-Positive";
  else if (topType === "TalkedAbout" && isHot && isControlled) style = "Strategic Heat";
  else if (topType === "Admired" && isControlled) style = "Reputation-First";
  else if (topType === "Avoidant") style = "Low-Exposure";
  else style = "Balancing Act";

  // ----- display names -----
  const typeNames = {
    Admired: "Admired",
    TalkedAbout: "Talked-About",
    Mixed: "Both",
    Avoidant: "Offstage"
  };

  const personaTitle = `${style} ${typeNames[topType]}`;

  // ----- core blurb (cotton-candy swap: no YMYL-y “stings”, “scares”, “watch-out”, “costs you”) -----
  const typeBlurb = {
    Admired: "You’re wired for respect, not noise. The win isn’t being mentioned, it’s being taken seriously.",
    TalkedAbout: "You’re wired for momentum. Being discussed means you’re part of the sparkle-stream, even when the takes get spicy.",
    Mixed: "You want both: warmth and reach. You can handle attention, but only if it doesn’t turn you into a one-note sticker.",
    Avoidant: "You’d rather build value than become a spectacle. Attention is useful, but personal exposure feels pricey."
  }[topType];

  const heatTone =
    heatPct >= 75 ? "high" :
    heatPct >= 55 ? "medium" :
    "low";

  const controlTone =
    controlPct >= 75 ? "high" :
    controlPct >= 55 ? "medium" :
    "low";

  const heatPhrase = {
    high: "You can handle high-intensity attention, the kind that pops fast and glows loud.",
    medium: "You can do attention in bursts, but you don’t want to live inside the confetti cannon.",
    low: "You prefer low-temperature attention, steady, respectful, and not constantly all-over-your-notifications."
  }[heatTone];

  const controlPhrase = {
    high: "You like authorship. You’d rather be a little smaller than be endlessly re-captioned.",
    medium: "You’ll influence the vibe where you can, but you won’t spend all day chasing every stray take.",
    low: "You’re more willing to let the internet do its thing, or you simply move with the wave instead of steering it."
  }[controlTone];

  // cotton-candy swap: replace “Watch-out” language with playful “sparkle tip”
  const stabilityHint =
    volatileBias > 0
      ? "Sparkle tip: when things get extra online, you might turn the dial up instead of down, which keeps the spotlight warm."
      : fragileBias > 1
        ? "Sparkle tip: being re-captioned might land louder than you expect, even if you play it cool."
        : "Sparkle tip: your main drift risk is subtle, slowly editing yourself to match what gets the biggest reactions.";

  const para1 = `${typeBlurb} ${heatPhrase} ${controlPhrase}`;
  const para2 = `${stabilityHint} Next up: whether you curate yourself… or the internet does it for you.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByType = {
    Admired: "rgb(0, 170, 140)",
    TalkedAbout: "rgb(200, 90, 90)",
    Mixed: "rgb(200, 170, 90)",
    Avoidant: "rgb(90, 120, 200)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByType[topType] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Loved or Talked About - Fame";
