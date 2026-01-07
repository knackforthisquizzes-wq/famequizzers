// fame-vs-image-control-quiz.js

const obj = {
  0: {
    question: "A headline about you is slightly wrong, but it’s getting you attention. You:",
    options: [
      ["Let it ride. Attention matters more than perfect accuracy.", ["Visibility", "TradeOff", "ThickSkin"]],
      ["Correct it once, calmly, then move on.", ["Control", "Balanced", "ThickSkin"]],
      ["Push back hard. I won’t let lies become “truth.”", ["Control", "TradeOff", "Sensitive"]],
      ["Say nothing publicly, but tighten access behind the scenes.", ["Control", "Boundary", "ThickSkin"]]
    ]
  },

  1: {
    question: "A meme version of you starts circulating. It’s funny… but it flattens you. You:",
    options: [
      ["Lean into it. Memes are currency.", ["Visibility", "TradeOff", "ThickSkin"]],
      ["Play along a little, but keep redirecting to the real work.", ["Balanced", "Visibility", "ThickSkin"]],
      ["Hate it. Being reduced to a joke feels gross.", ["Control", "Sensitive", "Boundary"]],
      ["Disappear until the cycle moves on.", ["Boundary", "Control", "Sensitive"]]
    ]
  },

  2: {
    question: "You can choose one: bigger reach, or cleaner reputation. You pick:",
    options: [
      ["Bigger reach. I can handle being misread.", ["Visibility", "TradeOff", "ThickSkin"]],
      ["Cleaner reputation. I’d rather be respected than viral.", ["Control", "Boundary", "Sensitive"]],
      ["It depends, I’d push reach only if the message stays intact.", ["Control", "Balanced", "ThickSkin"]],
      ["Neither. I’d rather stay smaller and sane.", ["Boundary", "Sensitive"]]
    ]
  },

  3: {
    question: "People keep misquoting you. The thing that bothers you most is:",
    options: [
      ["Nothing. Misquotes are part of the game.", ["Visibility", "ThickSkin"]],
      ["That it changes what people think I stand for.", ["Control", "Sensitive"]],
      ["That I’ll waste my life correcting strangers.", ["Boundary", "Balanced"]],
      ["That it’s unfair, and I’ll eventually snap.", ["Sensitive", "TradeOff", "Control"]]
    ]
  },

  4: {
    question: "A producer offers a big platform, but wants you to be “more extreme” for views. You:",
    options: [
      ["Do it. You can steer later once you have the mic.", ["Visibility", "TradeOff", "ThickSkin"]],
      ["Negotiate. I’ll grow, but not by becoming a character.", ["Control", "Balanced", "ThickSkin"]],
      ["Decline. If it warps me, it’s not worth it.", ["Control", "Boundary", "Sensitive"]],
      ["Take it, but keep my real self private to compensate.", ["Visibility", "Boundary", "TradeOff"]]
    ]
  },

  5: {
    question: "Your audience starts expecting a “version” of you. You:",
    options: [
      ["Feed it. Consistency is what keeps attention.", ["Visibility", "TradeOff"]],
      ["Give them some consistency, but keep evolving.", ["Balanced", "Visibility"]],
      ["Resist. I don’t want to be trapped in a persona.", ["Control", "Sensitive", "Boundary"]],
      ["Step back. I’d rather lose reach than lose myself.", ["Boundary", "Control", "Sensitive"]]
    ]
  },

  6: {
    question: "What would you sacrifice first if fame got messy?",
    options: [
      // cotton-candy swap: "distortion" -> "sparkly remixing"
      ["Accuracy. I can survive sparkly remixing if I stay visible.", ["Visibility", "TradeOff", "ThickSkin"]],
      ["Reach. I’ll shrink the audience to protect the message.", ["Control", "Boundary", "Sensitive"]],
      ["Comfort. I’ll do the hard work of correcting and clarifying.", ["Control", "TradeOff", "ThickSkin"]],
      // cotton-candy swap: "feeding the machine" -> "feeding the glitter-cannon"
      ["Engagement. I’ll keep doing my thing, but stop feeding the glitter-cannon.", ["Boundary", "Balanced", "ThickSkin"]]
    ]
  }
};

// Fame-native tags
const tags = {
  // Primary dilemma axis
  Visibility: 0,  // choose reach/exposure
  Control: 0,     // choose accuracy/authorship

  // Secondary modifiers
  TradeOff: 0,    // willing to pay costs
  Boundary: 0,    // limits access / pulls back
  Balanced: 0,    // negotiates / moderates
  ThickSkin: 0,   // criticism rolls off
  Sensitive: 0    // criticism sticks / reactive
};

function interpretResults() {
  // ----- pick dominant outcome: Visibility vs Control -----
  const primaryKeys = ["Visibility", "Control"];
  let top = primaryKeys[0];
  primaryKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  // ----- secondary signals -----
  const totalQuestions = 7;

  const resilienceScore = tags.ThickSkin - tags.Sensitive;    // approx -7 → +7
  const boundaryScore = tags.Boundary - tags.TradeOff;        // approx -7 → +7 (higher = more boundary-driven)

  let resiliencePct = Math.round(((resilienceScore + totalQuestions) / (totalQuestions * 2)) * 100);
  let boundaryPct = Math.round(((boundaryScore + totalQuestions) / (totalQuestions * 2)) * 100);

  resiliencePct = Math.max(0, Math.min(resiliencePct, 100));
  boundaryPct = Math.max(0, Math.min(boundaryPct, 100));

  const isResilient = resiliencePct >= 60;
  const isBoundary = boundaryPct >= 60;

  // ----- style adjective (viral/shareable) -----
  // Visibility + resilient = "Unshakeable"
  // Visibility + boundary = "Strategic"
  // Control + resilient = "Principled"
  // Control + boundary = "Guarded"
  let style;
  if (top === "Visibility" && isResilient) style = "Unshakeable";
  else if (top === "Visibility" && isBoundary) style = "Strategic";
  else if (top === "Control" && isResilient) style = "Principled";
  else if (top === "Control" && isBoundary) style = "Guarded";
  else style = "Measured";

  const topName = top === "Visibility" ? "Visibility" : "Control";
  const personaTitle = `${style} ${topName}`;

  const coreBlurb =
    top === "Visibility"
      ? "You’d rather stay seen than stay perfectly understood. You can tolerate playful remixing if it keeps you in the conversation."
      : "You’d rather stay accurate than stay everywhere. You care about authorship, context, and not becoming a cartoon cutout of yourself.";

  const resiliencePhrase =
    isResilient
      ? "Criticism doesn’t derail you easily. You shake it off, adjust your crown, and keep moving."
      : "Feedback sticks. You notice tone, subtext, and unfairness, and it can drain your sparkle over time.";

  const boundaryPhrase =
    isBoundary
      ? "Your instinct is to limit access. You’d rather be smaller than overexposed."
      : "You’ll pay costs to stay in motion, more exposure, more engagement, more risk.";

  const para1 = `${coreBlurb} ${resiliencePhrase} ${boundaryPhrase}`;

  const hook =
    top === "Visibility"
      ? "The danger is becoming dependent on momentum, and accepting a version of you that isn’t quite real because it performs like a firework."
      : "The danger is getting so protective that growth feels like a jump-scare, and you shrink your own reach just to stay perfectly intact.";

  const para2 = `${hook} Keep going, the next quiz asks whether you’d rather be admired or impossible to ignore.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByTop = {
    Visibility: "rgb(200, 170, 90)",
    Control: "rgb(0, 170, 140)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByTop[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Fame vs Control";
