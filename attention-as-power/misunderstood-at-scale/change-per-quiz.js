// misunderstood-at-scale-quiz.js
// (Quiz 23) How would you handle being misread by millions?
// PHASE 5, ATTENTION AS POWER (celebrity becomes force)

const obj = {
  0: {
    question: "A huge account posts a “take” about you that’s wrong, and it spreads faster than the truth. You:",
    options: [
      ["Correct it immediately and clearly. I won’t let lies fossilize.", ["Corrector", "HighEngagement", "Control"]],
      ["Post one clean clarification, then stop feeding it.", ["Strategist", "MeasuredEngagement", "Control"]],
      ["Say nothing. The internet will move on.", ["Resigned", "LowEngagement", "ThickSkin"]],
      ["Disappear for a while. I hate being turned into content.", ["Withdrawn", "NeedsPrivacy", "LowEngagement"]]
    ]
  },

  1: {
    question: "People keep projecting a personality onto you that isn’t true. The worst part is:",
    options: [
      ["The misinformation, it affects real decisions.", ["Corrector", "Control", "IntegrityFirst"]],
      ["The emotional drain of constantly correcting.", ["Strategist", "NeedsRecovery", "MeasuredEngagement"]],
      ["Nothing. Projection is normal at scale.", ["Resigned", "ThickSkin", "Detached"]],
      ["The loss of humanity. I start feeling like a character.", ["Withdrawn", "Sensitive", "Overloaded"]]
    ]
  },

  2: {
    question: "A rumor involves your family or private life. Your default move is:",
    options: [
      ["Address it firmly. Privacy still needs enforcement.", ["Corrector", "Boundary", "Control"]],
      ["Say the minimum needed, then shut it down.", ["Strategist", "Boundary", "MeasuredEngagement"]],
      ["Ignore it. Engaging makes it bigger.", ["Resigned", "LowEngagement", "Detached"]],
      ["Go silent and lock everything down.", ["Withdrawn", "NeedsPrivacy", "Boundary"]]
    ]
  },

  3: {
    question: "A “misread” version of you becomes profitable (memes, edits, headlines). You:",
    options: [
      ["Fight it. Letting it stand rewards distortion.", ["Corrector", "IntegrityFirst", "HighEngagement"]],
      ["Redirect it: release your own framing and move on.", ["Strategist", "Control", "MeasuredEngagement"]],
      ["Accept it. That’s the tax of scale.", ["Resigned", "ThickSkin", "Detached"]],
      ["Hate it. I’d rather be less famous than be fictional.", ["Withdrawn", "Sensitive", "NeedsPrivacy"]]
    ]
  },

  4: {
    question: "You’ve corrected something three times and people still repeat the wrong story. You:",
    options: [
      ["Keep correcting. Repetition is part of the job.", ["Corrector", "HighEngagement", "Stubborn"]],
      ["Stop. It’s not worth the oxygen.", ["Strategist", "NeedsRecovery", "Boundary"]],
      ["Shrug. Truth doesn’t scale as fast as vibes.", ["Resigned", "Detached", "ThickSkin"]],
      ["Feel your nervous system start to fry.", ["Withdrawn", "Overloaded", "Sensitive"]]
    ]
  },

  5: {
    question: "A journalist offers to do a long interview to “set the record straight.” You:",
    options: [
      ["Yes. I want my words on the record.", ["Corrector", "Control", "HighEngagement"]],
      ["Maybe, but only with guardrails and tight messaging.", ["Strategist", "Control", "Boundary"]],
      ["No. They’ll still spin it.", ["Resigned", "LowEngagement", "Guarded"]],
      ["No. I don’t want more exposure, period.", ["Withdrawn", "NeedsPrivacy", "LowEngagement"]]
    ]
  },

  6: {
    question: "How do you handle comments that confidently misunderstand you?",
    options: [
      ["Correct a few, so the thread doesn’t become fake canon.", ["Corrector", "HighEngagement", "ThickSkin"]],
      ["Correct once with a pinned post, then mute it.", ["Strategist", "MeasuredEngagement", "Control"]],
      ["Ignore. Comment sections aren’t reality.", ["Resigned", "Detached", "ThickSkin"]],
      ["Avoid reading them. It messes with my head.", ["Withdrawn", "Sensitive", "NeedsRecovery"]]
    ]
  },

  7: {
    question: "What’s your most realistic strategy for being misread by millions?",
    options: [
      ["Actively manage the narrative. If I don’t, someone else will.", ["Corrector", "Control", "Boundary"]],
      ["Clarify selectively, then protect my energy.", ["Strategist", "Boundary", "NeedsRecovery"]],
      ["Accept misunderstanding as permanent background noise.", ["Resigned", "Detached", "ThickSkin"]],
      ["Minimize access. Less exposure = less distortion.", ["Withdrawn", "NeedsPrivacy", "LowEngagement"]]
    ]
  }
};

// Fame-native tags for Quiz 23
const tags = {
  // Primary outcomes: response to mass projection / misreading
  Corrector: 0,     // actively corrects narratives
  Strategist: 0,    // corrects selectively with boundaries
  Resigned: 0,      // accepts misread as tax of scale
  Withdrawn: 0,     // reduces access / disappears

  // Secondary modifiers: coping style & pressure response
  HighEngagement: 0,
  MeasuredEngagement: 0,
  LowEngagement: 0,

  Control: 0,
  Boundary: 0,

  ThickSkin: 0,
  Sensitive: 0,

  Detached: 0,
  Guarded: 0,

  IntegrityFirst: 0,
  NeedsRecovery: 0,
  NeedsPrivacy: 0,

  Overloaded: 0,
  Stubborn: 0
};

function interpretResults() {
  // ----- pick dominant outcome -----
  const outcomeKeys = ["Corrector", "Strategist", "Resigned", "Withdrawn"];
  let top = outcomeKeys[0];
  outcomeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 8;

  // ----- axes -----
  // Engagement: HighEngagement vs LowEngagement
  const engageScore = tags.HighEngagement - tags.LowEngagement; // approx -8 → +8
  let engagePct = Math.round(((engageScore + totalQuestions) / (totalQuestions * 2)) * 100);
  engagePct = Math.max(0, Math.min(engagePct, 100));

  // Skin: ThickSkin vs Sensitive
  const skinScore = tags.ThickSkin - tags.Sensitive; // approx -8 → +8
  let skinPct = Math.round(((skinScore + totalQuestions) / (totalQuestions * 2)) * 100);
  skinPct = Math.max(0, Math.min(skinPct, 100));

  // Control: Control/Boundary vs Overloaded
  const controlScore = (tags.Control + tags.Boundary) - tags.Overloaded; // wider range
  let controlPct = Math.round(((controlScore + totalQuestions) / (totalQuestions * 3)) * 100);
  controlPct = Math.max(0, Math.min(controlPct, 100));

  // ----- shareable style adjective -----
  const isHighEngage = engagePct >= 60;
  const isThick = skinPct >= 60;
  const isHighControl = controlPct >= 60;
  const isLowControl = controlPct <= 40;

  let style;
  if (isHighEngage && isHighControl) style = "Narrative-Manager";
  else if (!isHighEngage && isThick) style = "Unbothered";
  else if (isLowControl) style = "Attention-Overhead";
  else style = "Selective-Operator";

  const outcomeNames = {
    Corrector: "Corrector",
    Strategist: "Strategist",
    Resigned: "Resigned",
    Withdrawn: "Withdrawn"
  };

  const personaTitle = `${style} ${outcomeNames[top]}`;

  const outcomeBlurb = {
    Corrector:
      "You don’t tolerate false stories. Being misread by millions would kick in a correction instinct, because you know repeated narratives can start feeling like “the story.”",
    Strategist:
      "You’ll clarify selectively. You want accuracy, but you refuse to spend your day debating every take online.",
    Resigned:
      "You treat misreads as part of being seen at scale. You’d rather keep moving than wrestle the crowd’s version of events.",
    Withdrawn:
      "Being misread would feel uncomfortable and overly intrusive. Your move is simple: reduce access, less visibility, fewer remixable moments."
  }[top];

  const engageTone =
    engagePct >= 70 ? "high" :
    engagePct >= 55 ? "medium" :
    engagePct >= 45 ? "mixed" :
    "low";

  const skinTone =
    skinPct >= 70 ? "thick" :
    skinPct >= 55 ? "mostly-thick" :
    skinPct >= 45 ? "mixed" :
    "sensitive";

  const controlTone =
    controlPct >= 70 ? "high-control" :
    controlPct >= 55 ? "control" :
    controlPct >= 45 ? "mixed" :
    "low-control";

  const engagePhrase = {
    high: "You’re willing to engage publicly to shape perception, even if it takes repetition.",
    medium: "You’ll engage when it matters, but you won’t chase every rumor.",
    mixed: "Some misreads would pull you in; others you’d ignore. Your threshold shifts with stakes and timing.",
    low: "You prefer distance. You don’t want your life to become a permanent response thread."
  }[engageTone];

  const skinPhrase = {
    thick: "You can handle being talked about without taking every comment personally.",
    "mostly-thick": "You can handle noise, but you still prefer space from nonstop commentary.",
    mixed: "Some projections bounce off, others stick, especially when they touch something personal.",
    sensitive: "Misreads would linger longer than you’d like, so you’d do best with clear limits on how much you read and respond."
  }[skinTone];

  const controlPhrase = {
    "high-control": "You’d build systems: boundaries, statements, timing, and clear rules about what gets access to your attention.",
    control: "You’d do best with guardrails and predictable routines around engagement.",
    mixed: "You’d try to manage it, but the chaos would still leak through sometimes.",
    "low-control": "Without firm boundaries, this would start eating your time and pulling your focus away from what you actually want to do."
  }[controlTone];

  const para1 = `${outcomeBlurb} ${engagePhrase} ${skinPhrase} ${controlPhrase}`;

  const forwardHook = {
    Corrector: "Next: stepping into influence versus backing away, because if you can manage projection, you might start shaping culture on purpose.",
    Strategist: "Next: influence, do you step into it, or quietly back away once it gets heavy?",
    Resigned: "Next: influence, do you use visibility to shape culture, or stay out of the mess entirely?",
    Withdrawn: "Next: influence, because once attention becomes force, withdrawal starts looking like access control."
  }[top];

  const para2 = `${forwardHook}`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByOutcome = {
    Corrector: "rgb(0, 170, 140)",
    Strategist: "rgb(90, 120, 200)",
    Resigned: "rgb(200, 170, 90)",
    Withdrawn: "rgb(200, 90, 90)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByOutcome[top] || "rgb(90, 120, 200)"
  };
}


const quizTitle = "Misunderstood at Scale";
