// attention-landscape-quiz.js
// (Quiz 30) Where do you actually fit in the attention world?
// PHASE 6 — LONG-TERM OUTCOMES (deep water, full synthesis)

const obj = {
  0: {
    question: "When you imagine long-term visibility, the scale that feels most livable is:",
    options: [
      ["Small and focused. A niche where people actually care.", ["NicheFit", "Depth", "Sustainable"]],
      ["Medium. Enough reach to matter, not enough to overload your life.", ["MidFit", "Balanced", "Boundary"]],
      ["Large. I can handle wide exposure if it’s earned.", ["WideFit", "Capacity", "ThickSkin"]],
      ["Rare. I’d only want visibility in exceptional moments.", ["OutlierFit", "Selective", "LowAccess"]]
    ]
  },

  1: {
    question: "Your best work usually thrives when:",
    options: [
      ["The audience is small but invested.", ["NicheFit", "Depth", "Craft"]],
      ["There’s steady feedback without constant noise.", ["MidFit", "Balanced", "Feedback"]],
      ["A lot of eyes are watching.", ["WideFit", "PressurePositive", "Momentum"]],
      ["There’s distance and control.", ["OutlierFit", "Selective", "Boundary"]]
    ]
  },

  2: {
    question: "If attention grew faster than expected, your instinct would be to:",
    options: [
      ["Slow it down and protect quality.", ["NicheFit", "Boundary", "Craft"]],
      ["Stabilize systems and routines.", ["MidFit", "Balanced", "Infrastructure"]],
      ["Lean in and scale with it.", ["WideFit", "Momentum", "Capacity"]],
      ["Pull back and limit access.", ["OutlierFit", "LowAccess", "Selective"]]
    ]
  },

  3: {
    question: "Which environment sounds most comfortable to live in?",
    options: [
      ["Being known by a specific community.", ["NicheFit", "Depth", "Belonging"]],
      ["Being recognizable but not constantly watched.", ["MidFit", "Balanced", "Privacy"]],
      ["Being widely known with strong buffers.", ["WideFit", "ThickSkin", "Infrastructure"]],
      ["Being mostly unknown with occasional visibility.", ["OutlierFit", "LowAccess", "Privacy"]]
    ]
  },

  4: {
    question: "How do you feel about metrics (followers, views, reach)?",
    options: [
      ["They matter less than substance.", ["NicheFit", "Craft", "Grounded"]],
      ["They’re useful signals, not the point.", ["MidFit", "Balanced", "Grounded"]],
      ["They’re feedback I can work with.", ["WideFit", "Momentum", "DataDriven"]],
      ["I avoid them. They distort priorities.", ["OutlierFit", "Selective", "Boundary"]]
    ]
  },

  5: {
    question: "When conflict or criticism spikes, you’re most likely to:",
    options: [
      ["Engage thoughtfully with the few who matter.", ["NicheFit", "Depth", "Discernment"]],
      ["Respond once and move on.", ["MidFit", "Boundary", "Control"]],
      ["Absorb it publicly and keep moving.", ["WideFit", "ThickSkin", "Endurance"]],
      ["Step back until it cools off.", ["OutlierFit", "LowAccess", "Boundary"]]
    ]
  },

  6: {
    question: "The kind of impact you actually want is:",
    options: [
      ["Deep change for a small group.", ["NicheFit", "Depth", "Impact"]],
      ["Reliable usefulness for many.", ["MidFit", "Balanced", "Impact"]],
      ["Broad influence across culture.", ["WideFit", "Scale", "Impact"]],
      ["Minimal footprint, maximum autonomy.", ["OutlierFit", "Autonomy", "LowAccess"]]
    ]
  },

  7: {
    question: "Looking honestly at your style, you operate best with:",
    options: [
      ["Low noise, high meaning.", ["NicheFit", "Depth", "Sustainable"]],
      ["Moderate noise, clear boundaries.", ["MidFit", "Boundary", "Sustainable"]],
      ["High noise, strong filters.", ["WideFit", "ThickSkin", "Sustainable"]],
      ["Very low noise, rare exposure.", ["OutlierFit", "LowAccess", "Sustainable"]]
    ]
  }
};

// Fame-native tags for Quiz 30
const tags = {
  // Primary outcomes: attention landscape fit
  NicheFit: 0,     // small, deep, focused
  MidFit: 0,       // moderate, balanced
  WideFit: 0,      // large-scale capable
  OutlierFit: 0,   // rare, selective visibility

  // Secondary modifiers
  Depth: 0,
  Balanced: 0,
  Capacity: 0,
  Selective: 0,

  Boundary: 0,
  LowAccess: 0,
  ThickSkin: 0,

  Craft: 0,
  Momentum: 0,
  Infrastructure: 0,

  Grounded: 0,
  Feedback: 0,
  DataDriven: 0,

  Impact: 0,
  Autonomy: 0,
  Endurance: 0,
  Sustainable: 0,
  Privacy: 0,
  Scale: 0,
  Belonging: 0,
  Discernment: 0,
  Control: 0,

  // Kept for scoring compatibility (existing key used in Q1 option 3)
  PressurePositive: 0
};

function interpretResults() {
  // ----- pick dominant outcome -----
  const outcomeKeys = ["NicheFit", "MidFit", "WideFit", "OutlierFit"];
  let top = outcomeKeys[0];
  outcomeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 8;

  // ----- axes -----
  // Noise tolerance: ThickSkin/Momentum vs LowAccess/Privacy
  const noiseScore = (tags.ThickSkin + tags.Momentum) - (tags.LowAccess + tags.Privacy);
  let noisePct = Math.round(((noiseScore + totalQuestions) / (totalQuestions * 2)) * 100);
  noisePct = Math.max(0, Math.min(noisePct, 100));

  // Depth vs Scale
  const depthScore = (tags.Depth + tags.Craft) - (tags.Scale + tags.Momentum);
  let depthPct = Math.round(((depthScore + totalQuestions) / (totalQuestions * 2)) * 100);
  depthPct = Math.max(0, Math.min(depthPct, 100));

  // Boundary need
  const boundaryScore = (tags.Boundary + tags.LowAccess) - (tags.Momentum + tags.Scale);
  let boundaryPct = Math.round(((boundaryScore + totalQuestions) / (totalQuestions * 2)) * 100);
  boundaryPct = Math.max(0, Math.min(boundaryPct, 100));

  // ----- style adjective -----
  const highDepth = depthPct >= 60;
  const highNoise = noisePct >= 60;
  const highBoundary = boundaryPct >= 60;

  let style;
  if (highDepth && highBoundary) style = "Deliberate";
  else if (highNoise && !highBoundary) style = "High-Capacity";
  else if (!highNoise && !highBoundary) style = "Even-Keel";
  else style = "Guarded";

  const outcomeNames = {
    NicheFit: "Niche",
    MidFit: "Mid-Level",
    WideFit: "Wide-Scale",
    OutlierFit: "Outlier"
  };

  const personaTitle = `${style} ${outcomeNames[top]}`;

  const outcomeBlurb = {
    NicheFit:
      "You fit best in a niche attention landscape. Depth beats reach, and meaning beats scale.",
    MidFit:
      "You fit best at a mid-level of attention. Enough visibility to matter, enough distance to stay steady.",
    WideFit:
      "You can operate at wide scale. With filters and systems, broad reach stays workable.",
    OutlierFit:
      "You fit best as an outlier: rare visibility, high autonomy, minimal ongoing access."
  }[top];

  const noisePhrase =
    noisePct >= 60
      ? "You tolerate noise better than most."
      : "You operate best when the noise stays low.";

  const depthPhrase =
    depthPct >= 60
      ? "Depth and substance matter more to you than reach."
      : "Scale and momentum matter more than depth.";

  const boundaryPhrase =
    boundaryPct >= 60
      ? "Clear boundaries are non-negotiable for you."
      : "You can operate with lighter boundaries.";

  const para1 = `${outcomeBlurb} ${noisePhrase} ${depthPhrase} ${boundaryPhrase}`;

  const para2 =
    "This isn’t about winning attention — it’s about fit. The wrong landscape costs you more than it gives.";

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByOutcome = {
    NicheFit: "rgb(0, 170, 140)",
    MidFit: "rgb(90, 120, 200)",
    WideFit: "rgb(200, 170, 90)",
    OutlierFit: "rgb(120, 120, 140)"
  };

  // Reset tags
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByOutcome[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Attention Landscape";
