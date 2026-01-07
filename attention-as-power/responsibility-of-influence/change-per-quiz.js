// responsibility-of-influence-quiz.js
// (Quiz 21) How accountable would you feel for what people do with your influence?

const obj = {
  0: {
    question: "A clip of you goes viral and thousands copy what you said—even though it was half-joking. You feel:",
    options: [
      ["Responsible. If I shaped it, I own the ripple effect too.", ["Steward", "HighAccountability", "ConscienceLed"]],
      ["Somewhat responsible. I’d clarify, but I can’t control everyone.", ["Balancer", "MeasuredAccountability", "Clarifier"]],
      ["Not responsible. People choose what they do.", ["Neutralist", "LowAccountability", "BoundaryStrong"]],
      ["Irritated. If people keep twisting it, I’ll share less.", ["Withdrawer", "Defensive", "LowExposure"]]
    ]
  },

  1: {
    question: "A brand offers big money to promote a product you don’t use. You:",
    options: [
      ["Decline. If I endorse it, people will treat it like a recommendation.", ["Steward", "IntegrityFirst", "ConscienceLed"]],
      ["Consider it, but only with clear rules (disclosures, honest caveats).", ["Balancer", "Pragmatic", "Clarifier"]],
      ["Take it. Ads are ads—people can decide for themselves.", ["Neutralist", "Pragmatic", "BoundaryStrong"]],
      ["Avoid it. The deal isn’t worth the drama.", ["Withdrawer", "IntegrityFirst", "LowExposure"]]
    ]
  },

  2: {
    question: "Someone uses your name to justify something extreme (“You inspired me”). Your first move is:",
    options: [
      ["Publicly reject it and draw a hard line.", ["Steward", "Interventionist", "ThickSkin"]],
      ["Clarify your position once, then stop feeding it.", ["Balancer", "Clarifier", "ThickSkin"]],
      ["Say nothing. Arguing gives it oxygen.", ["Neutralist", "Detached", "LowExposure"]],
      ["Step back. I won’t be used as a symbol.", ["Withdrawer", "Defensive", "LowExposure"]]
    ]
  },

  3: {
    question: "Your audience skews younger. That changes how you speak because:",
    options: [
      ["Words land differently. I’d be more careful.", ["Steward", "HighAccountability", "ConscienceLed"]],
      ["A little. I’d keep my voice but avoid reckless messaging.", ["Balancer", "MeasuredAccountability", "Pragmatic"]],
      ["No. It’s not my job to raise strangers online.", ["Neutralist", "LowAccountability", "BoundaryStrong"]],
      ["Yes, and that pressure would make me dislike being visible.", ["Withdrawer", "Overloaded", "NeedsPrivacy"]]
    ]
  },

  4: {
    question: "A cause you believe in could be boosted massively if you post about it. You:",
    options: [
      ["Post—and accept the responsibility that comes with it.", ["Steward", "Interventionist", "ConscienceLed"]],
      ["Post carefully with context and sources.", ["Balancer", "Clarifier", "ConscienceLed"]],
      ["Avoid it. Causes get messy and posts get weaponized.", ["Neutralist", "Detached", "BoundaryStrong"]],
      ["Avoid it because backlash would wear me out.", ["Withdrawer", "Overloaded", "LowExposure"]]
    ]
  },

  5: {
    question: "People start copying your style, worldview, and habits. That makes you feel:",
    options: [
      ["Cautious. I’d tighten what I model publicly.", ["Steward", "HighAccountability", "Control"]],
      ["Aware. I’d keep being me, but I’d think before I post.", ["Balancer", "MeasuredAccountability", "Control"]],
      ["Unbothered. It’s flattering, not my problem.", ["Neutralist", "LowAccountability", "Open"]],
      ["Boxed in. I don’t want to be anyone’s template.", ["Withdrawer", "NeedsPrivacy", "Overloaded"]]
    ]
  },

  6: {
    question: "A rumor spreads that you support something you don’t. The most responsible approach is:",
    options: [
      ["Correct it publicly and repeat the boundary until it sticks.", ["Steward", "Interventionist", "ThickSkin"]],
      ["Correct it once with a clean statement, then move on.", ["Balancer", "Clarifier", "ThickSkin"]],
      ["Ignore it. The internet moves on.", ["Neutralist", "Detached", "LowExposure"]],
      ["Go quiet. Any response becomes more content.", ["Withdrawer", "Defensive", "LowExposure"]]
    ]
  },

  7: {
    question: "Where do you draw the line on your responsibility as a public figure?",
    options: [
      ["I’m responsible for what I amplify, endorse, and normalize.", ["Steward", "HighAccountability", "IntegrityFirst"]],
      ["I’m responsible for my intent and clarity—not everyone’s actions.", ["Balancer", "MeasuredAccountability", "BoundaryStrong"]],
      ["I’m responsible for rules, not moral policing.", ["Neutralist", "LowAccountability", "Pragmatic"]],
      ["I’m responsible to myself first: protect privacy and limit access.", ["Withdrawer", "NeedsPrivacy", "LowExposure"]]
    ]
  }
};

// Fame-native tags for Quiz 21
const tags = {
  // Primary outcomes: relationship to influence-responsibility
  Steward: 0,      // feels strong moral duty for downstream effects
  Balancer: 0,     // feels partial duty; uses boundaries + clarity
  Neutralist: 0,   // sees influence as morally neutral; personal autonomy first
  Withdrawer: 0,   // avoids influence burden; reduces exposure

  // Secondary modifiers: how they execute it
  HighAccountability: 0,
  MeasuredAccountability: 0,
  LowAccountability: 0,

  ConscienceLed: 0,
  IntegrityFirst: 0,
  Pragmatic: 0,

  Interventionist: 0, // actively correct/condemn/engage
  Clarifier: 0,        // clarifies once/with context
  Detached: 0,         // avoids engagement

  BoundaryStrong: 0,
  Control: 0,
  Open: 0,

  ThickSkin: 0,
  Defensive: 0,

  NeedsPrivacy: 0,
  LowExposure: 0,
  Overloaded: 0
};

function interpretResults() {
  // ----- pick dominant outcome -----
  const outcomeKeys = ["Steward", "Balancer", "Neutralist", "Withdrawer"];
  let top = outcomeKeys[0];
  outcomeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 8;

  // ----- axes -----
  // Accountability: High vs Low (Measured is midpoint)
  const accountabilityScore = tags.HighAccountability - tags.LowAccountability; // approx -8 → +8
  let accountabilityPct = Math.round(((accountabilityScore + totalQuestions) / (totalQuestions * 2)) * 100);
  accountabilityPct = Math.max(0, Math.min(100, accountabilityPct));

  // Engagement: Interventionist vs Detached (Clarifier is midpoint-ish)
  const engagementScore = tags.Interventionist - tags.Detached; // approx -8 → +8
  let engagementPct = Math.round(((engagementScore + totalQuestions) / (totalQuestions * 2)) * 100);
  engagementPct = Math.max(0, Math.min(100, engagementPct));

  // Exposure tolerance: Control/Open vs NeedsPrivacy/LowExposure/Overloaded
  const exposureScore = (tags.Control + tags.Open) - (tags.NeedsPrivacy + tags.LowExposure + tags.Overloaded); // wider range
  let exposurePct = Math.round(((exposureScore + totalQuestions) / (totalQuestions * 3)) * 100);
  exposurePct = Math.max(0, Math.min(100, exposurePct));

  // ----- shareable style adjective -----
  const isHighAccountability = accountabilityPct >= 65;
  const isHighEngagement = engagementPct >= 60;
  const isLowExposure = exposurePct <= 40;

  let style;
  if (isHighAccountability && isHighEngagement) style = "Guardian";
  else if (isHighAccountability && !isHighEngagement) style = "Careful-Steward";
  else if (!isHighAccountability && isLowExposure) style = "No-Thank-You";
  else style = "Hands-Off";

  const outcomeNames = {
    Steward: "Steward",
    Balancer: "Boundary Balancer",
    Neutralist: "Moral Neutralist",
    Withdrawer: "Low-Exposure"
  };

  const personaTitle = `${style} ${outcomeNames[top]}`;

  const outcomeBlurb = {
    Steward:
      "You treat attention like leverage. If people use your words as permission, you feel responsible for what you amplify and normalize.",
    Balancer:
      "You feel some responsibility—but you don’t confuse influence with total control. Your instinct is clarity, boundaries, and selective engagement.",
    Neutralist:
      "You see influence as morally neutral. People choose what they do, and you don’t want the burden of being everyone’s compass.",
    Withdrawer:
      "You don’t want the gravity. Once attention starts steering other people, your instinct is to limit access and keep your life simpler."
  }[top];

  const accountabilityTone =
    accountabilityPct >= 70 ? "high" :
    accountabilityPct >= 55 ? "medium" :
    accountabilityPct >= 45 ? "mixed" :
    "low";

  const engagementTone =
    engagementPct >= 70 ? "high" :
    engagementPct >= 55 ? "medium" :
    engagementPct >= 45 ? "mixed" :
    "low";

  const exposureTone =
    exposurePct >= 70 ? "high" :
    exposurePct >= 55 ? "medium" :
    exposurePct >= 45 ? "mixed" :
    "low";

  const accountabilityPhrase = {
    high: "You assume your platform changes outcomes, so you try to use it responsibly—even when it’s inconvenient.",
    medium: "You’ll take responsibility where it’s direct (endorsements, amplification), but you resist being treated like everyone’s moral babysitter.",
    mixed: "You can feel responsible in some moments and detached in others. Context decides what you carry.",
    low: "You don’t accept responsibility for downstream behavior. Autonomy matters more than optics."
  }[accountabilityTone];

  const engagementPhrase = {
    high: "You’ll step in publicly when lines need to be drawn—clarify, correct, repeat.",
    medium: "You’ll engage strategically: one clean statement, context if needed, then you stop feeding the loop.",
    mixed: "You might engage when it’s personal, but ignore it when it’s noisy. Your response threshold varies.",
    low: "You prefer not to engage. Distance feels better than public back-and-forth."
  }[engagementTone];

  const exposurePhrase = {
    high: "You can stay visible while carrying the weight. You don’t need to vanish to keep functioning.",
    medium: "Visibility works for you if it’s structured—boundaries, timing, and clear rules.",
    mixed: "Visibility is fine until it spikes. If pressure ramps up, you’ll tighten access fast.",
    low: "You don’t like constant access. The responsibility feels like a trap, so you minimize exposure."
  }[exposureTone];

  const para1 = `${outcomeBlurb} ${accountabilityPhrase} ${engagementPhrase} ${exposurePhrase}`;

  const forwardHook = {
    Steward: "Next, the hard part: what would you change in yourself to stay relevant—and what would be too expensive to trade?",
    Balancer: "Next, the tricky line: adapting versus erasing yourself to stay relevant.",
    Neutralist: "Next, the temptation test: would you change who you are to keep the spotlight—or let it move on?",
    Withdrawer: "Next, the pressure test: what would you be willing to change to stay visible, and when would you step back?"
  }[top];

  const para2 = `${forwardHook}`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByOutcome = {
    Steward: "rgb(0, 170, 140)",
    Balancer: "rgb(90, 120, 200)",
    Neutralist: "rgb(200, 170, 90)",
    Withdrawer: "rgb(200, 90, 90)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByOutcome[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Responsibility of Influence";
