// celebrity-fatigue-quiz.js
// (Quiz 14) What would burn you out first?
// Sustained fame: the specific stressor that collapses your stamina (not the first stressor you notice).

const obj = {
  0: {
    question: "The first thing that starts draining your sparkle over time is:",
    options: [
      ["Never being truly off. It’s all velvet ropes and watchful spotlights.", ["NoOffSwitch", "PrivacyDrain", "wearSeed"]],
      ["The repetition. Same champagne questions, same glitter cycle.", ["Repetition", "Boredom", "wearSeed"]],
      ["The entitlement. People treat access like a VIP pass they bought.", ["Entitlement", "BoundaryViolation", "wearSeed"]],
      ["The criticism. Even tiny side-eyes start feeling like sand in satin.", ["Criticism", "Sensitivity", "wearSeed"]],
      ["The performance. Being “on” starts feeling like wearing a designer mask.", ["Performance", "IdentitySplit", "wearSeed"]]
    ]
  },

  1: {
    question: "What kind of day makes you want to slip behind the curtain?",
    options: [
      ["A simple errand turning into flashes, photos, and sparkle-chasing.", ["NoOffSwitch", "PrivacyDrain"]],
      ["Three interviews saying the same thing in different fonts and fragrances.", ["Repetition", "Boredom"]],
      ["Fans crossing a line like you’re part of the package.", ["Entitlement", "BoundaryViolation"]],
      ["A pile-on where strangers critique your tone like it’s couture.", ["Criticism", "Sensitivity"]],
      ["A public event where you feel like a brand, not a person.", ["Performance", "IdentitySplit"]]
    ]
  },

  2: {
    question: "Your most honest “over-it” symptom would look like:",
    options: [
      ["Hypervigilance. I can’t relax in public; I’m always scanning the room.", ["NoOffSwitch", "tension"]],
      ["Numbness. I go glossy and float through it on autopilot.", ["Repetition", "Numbness"]],
      ["Irritation. My patience turns sharp and my smile turns expensive.", ["Entitlement", "Resentment"]],
      ["Rumination. One comment smudges the whole day.", ["Criticism", "Rumination"]],
      ["Dissociation. I feel split from the persona—like I’m watching the show.", ["Performance", "IdentitySplit"]]
    ]
  },

  3: {
    question: "If you had to remove one thing to stay luxe and luminous, it would be:",
    options: [
      ["Random public access to me.", ["NoOffSwitch", "PrivacyDrain", "BoundaryFix"]],
      ["The constant content runway.", ["Repetition", "Boredom", "Treadmill"]],
      ["DMs / parasocial demands.", ["Entitlement", "BoundaryViolation", "BoundaryFix"]],
      ["Comment sections and discourse.", ["Criticism", "Sensitivity", "Discourse"]],
      ["The expectation to be a polished version of myself.", ["Performance", "IdentitySplit", "Mask"]]
    ]
  },

  4: {
    question: "When people say “you signed up for this,” you feel:",
    options: [
      ["Anger. A contract isn’t a blank check on my humanity.", ["Entitlement", "Resentment", "BoundaryViolation"]],
      ["Tired. They’re not wrong, but it still drains the shine.", ["Repetition", "Numbness"]],
      ["Stressed. It makes me want to retreat to something softer.", ["NoOffSwitch", "tension"]],
      ["Small. Like I’m not allowed to be human—only curated.", ["Criticism", "Rumination"]],
      ["Weird. Like I’m watching my life from the mezzanine.", ["Performance", "IdentitySplit"]]
    ]
  },

  5: {
    question: "Your most likely “wear but make it aesthetic” move would be:",
    options: [
      ["Disappear for a while. No posts, no sightings, no sparkle trail.", ["NoOffSwitch", "Withdrawal"]],
      ["Quietly reduce output and get minimal on purpose.", ["Repetition", "SlowFade"]],
      ["Go harder on boundaries and get labeled “difficult.”", ["Entitlement", "BoundaryFix"]],
      ["Snap once, then regret it in HD.", ["Criticism", "Meltdown"]],
      ["Rebrand / reinvent to escape the old era.", ["Performance", "Reinvention"]]
    ]
  },

  6: {
    question: "What would dim your shine first under sustained fame?",
    options: [
      ["Lack of privacy. I can’t breathe.", ["NoOffSwitch", "PrivacyDrain", "wearSeed"]],
      ["Repetition. The loop feels lifeless.", ["Repetition", "Boredom", "wearSeed"]],
      ["Entitlement. People crossing lines.", ["Entitlement", "BoundaryViolation", "wearSeed"]],
      ["Criticism. Constant judgment.", ["Criticism", "Sensitivity", "wearSeed"]],
      ["Performance. Living as a character.", ["Performance", "IdentitySplit", "wearSeed"]]
    ]
  }
};

// Fame-native tags
const tags = {
  // Primary wear causes
  NoOffSwitch: 0,   // constant access, always-on surveillance
  Repetition: 0,    // same cycle forever
  Entitlement: 0,   // parasocial demands / boundary crossing
  Criticism: 0,     // judgment, pile-ons, commentary
  Performance: 0,   // persona strain, being "on"

  // Secondary texture / symptoms
  PrivacyDrain: 0,
  Boredom: 0,
  BoundaryViolation: 0,
  Sensitivity: 0,
  IdentitySplit: 0,

  // Response patterns
  tension: 0,
  Numbness: 0,
  Resentment: 0,
  Rumination: 0,

  // Coping / outcomes
  Withdrawal: 0,
  SlowFade: 0,
  BoundaryFix: 0,
  Meltdown: 0,
  Reinvention: 0,

  // Context markers (kept for flavor, can be ignored in scoring)
  Treadmill: 0,
  Discourse: 0,
  Mask: 0,

  // Anchor (helps weight selection)
  wearSeed: 0
};

function interpretResults() {
  // ----- pick dominant wear CAUSE -----
  const causeKeys = ["NoOffSwitch", "Repetition", "Entitlement", "Criticism", "Performance"];
  let top = causeKeys[0];
  causeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 7;

  // ----- axes -----
  // Heat sensitivity: tension/Rumination/Sensitivity vs Numbness
  const sensitivityScore = (tags.tension + tags.Rumination + tags.Sensitivity) - (tags.Numbness * 1);
  let sensitivityPct = Math.round(((sensitivityScore + totalQuestions) / (totalQuestions * 2)) * 100);
  sensitivityPct = Math.max(0, Math.min(sensitivityPct, 100));

  // Boundary instinct: BoundaryFix vs Withdrawal/SlowFade
  const boundaryScore = (tags.BoundaryFix * 1) - (tags.Withdrawal + tags.SlowFade);
  let boundaryPct = Math.round(((boundaryScore + totalQuestions) / (totalQuestions * 2)) * 100);
  boundaryPct = Math.max(0, Math.min(boundaryPct, 100));

  const isSensitive = sensitivityPct >= 60;
  const isBoundaryForward = boundaryPct >= 60;

  // ----- style adjective (shareable) -----
  let style;
  if (top === "NoOffSwitch") style = isBoundaryForward ? "Velvet-Roped" : "Vanishing";
  else if (top === "Repetition") style = "Champagne-Loop-Weary";
  else if (top === "Entitlement") style = isBoundaryForward ? "Boundary-Enforcer" : "Overdrawn";
  else if (top === "Criticism") style = isSensitive ? "Glitter-Thin" : "Diamond-Cooled";
  else style = "Persona-Strained";

  const causeNames = {
    NoOffSwitch: "No-Off-Switch",
    Repetition: "Repetition",
    Entitlement: "Entitlement",
    Criticism: "Criticism",
    Performance: "Performance"
  };

  const personaTitle = `${style} ${causeNames[top]}`;

  const causeBlurb = {
    NoOffSwitch:
      "Your wear starts with access. Not one big scandal—just the constant spotlight with nowhere soft to land.",
    Repetition:
      "Your wear starts with the loop. Same questions, same sparkle, same cycle until it starts to feel hollow.",
    Entitlement:
      "Your wear starts with boundary erosion. People treating you like a perk wears you down fast.",
    Criticism:
      "Your wear starts with judgment. Even tiny digs stack into a relentless, drip-by-drip drain on your shine.",
    Performance:
      "Your wear starts with persona strain. Being ‘on’ turns into acting, and acting turns into identity fatigue."
  }[top];

  const sensitivityPhrase =
    sensitivityPct >= 70 ? "You’re high-sensitivity under scrutiny. One messy thread can smudge a whole week." :
    sensitivityPct >= 55 ? "You feel the commentary more than you admit, but you can recover with the right structure." :
    "You can gloss over the noise—just remember: numbness has a price tag too.";

  const boundaryPhrase =
    boundaryPct >= 70 ? "Your survival move is boundaries: access control, rules, and real enforcement." :
    boundaryPct >= 55 ? "You try to set boundaries, but you’re tempted to slip out the side door instead." :
    "Your survival move is distance: fading, vanishing, reducing exposure.";

  const likelyOutcome = {
    NoOffSwitch: "Likely pattern: rare appearances, low access, and privacy treated like oxygen.",
    Repetition: "Likely pattern: output slows, enthusiasm drops, and you quietly step off the content runway.",
    Entitlement: "Likely pattern: hard boundaries (and backlash) or withdrawal to stop the violations.",
    Criticism: "Likely pattern: one snap, one messy moment, then a long recalibration.",
    Performance: "Likely pattern: reinvention—new era, new story, new silhouette—just to feel real again."
  }[top];

  const para1 = `${causeBlurb} ${sensitivityPhrase} ${boundaryPhrase}`;
  const para2 = `${likelyOutcome} Next up: whether you’d still feel like yourself without attention.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByCause = {
    NoOffSwitch: "rgb(90, 120, 200)",
    Repetition: "rgb(200, 170, 90)",
    Entitlement: "rgb(0, 170, 140)",
    Criticism: "rgb(200, 90, 90)",
    Performance: "rgb(170, 120, 220)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByCause[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Celebrity Fatigue";
