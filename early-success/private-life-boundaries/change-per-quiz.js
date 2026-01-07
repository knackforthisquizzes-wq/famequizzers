// private-life-boundaries-quiz.js
// (Quiz 9) How much of you would end up online? Boundaries, oversharing, relatability vs protection.

const obj = {
  0: {
    question: "Once people start watching, your default sharing level becomes:",
    options: [
      ["Almost nothing. I’ll give them the work, not my life.", ["LockedDown", "Private", "Controlled"]],
      ["Selective. I’ll share some, but I decide what stays off-limits.", ["Selective", "Private", "Controlled"]],
      ["Moderate. I’ll share enough to feel real, but not everything.", ["Balanced", "Relatable", "Controlled"]],
      ["A lot. If it’s happening to me, it becomes part of the story.", ["OpenBook", "Relatable", "Overshare"]],
      ["I don’t know until it happens, I might overshare under pressure.", ["LeakRisk", "Overshare", "Reactive"]]
    ]
  },

  1: {
    question: "The first thing you’d hate strangers knowing about you is:",
    options: [
      ["Where I live / where I go / my routines.", ["Private", "SafetyFirst", "LockedDown"]],
      ["My relationships (who I’m with, who I’m not).", ["Private", "RelationshipGuard", "Selective"]],
      ["My family, I don’t want them dragged into it.", ["FamilyShield", "Private", "LockedDown"]],
      ["My mental health or low moments becoming “content.”", ["VulnerabilityGuard", "Private", "Selective"]],
      ["Nothing specific, I’m more annoyed by being watched than by details.", ["OpenBook", "Relatable"]]
    ]
  },

  2: {
    question: "If fans start asking personal questions in comments, you:",
    options: [
      ["Ignore it completely. Not feeding that.", ["LockedDown", "Private", "Resistant"]],
      ["Answer vaguely and redirect.", ["Selective", "Controlled", "Resistant"]],
      ["Share small details, it helps people connect.", ["Balanced", "Relatable"]],
      ["Answer honestly unless it’s dangerous.", ["OpenBook", "Relatable", "Overshare"]],
      ["Snap sometimes. The entitlement would get to me.", ["Reactive", "BoundaryStress", "Resistant"]]
    ]
  },

  3: {
    question: "A relationship rumor starts trending. Your instinct is:",
    options: [
      ["Say nothing. I don’t confirm my life.", ["LockedDown", "Private", "Controlled"]],
      ["Deny/confirm once, then stop talking about it.", ["Selective", "Controlled"]],
      ["Address it gently so it doesn’t spiral.", ["Balanced", "Relatable", "Controlled"]],
      ["Make it a joke / post through it to deflate it.", ["OpenBook", "Relatable", "LeakRisk"]],
      ["Panic and delete things / go offline.", ["LeakRisk", "BoundaryStress", "Reactive"]]
    ]
  },

  4: {
    question: "The thing you’d be most tempted to share (even if it backfires) is:",
    options: [
      ["Nothing. My peace is worth more than engagement.", ["LockedDown", "Private"]],
      ["Behind-the-scenes work, not personal life.", ["Selective", "Controlled", "Private"]],
      ["A personal struggle if it helps someone else.", ["Balanced", "Relatable", "Vulnerable"]],
      ["Daily life stuff, routines, relationships, messy honesty.", ["OpenBook", "Overshare", "Relatable"]],
      ["A clapback / emotional post when I feel misread.", ["Reactive", "Overshare", "BoundaryStress"]]
    ]
  },

  5: {
    question: "If you had to pick a boundary rule that never changes, it would be:",
    options: [
      ["No home, no routines, no location clues. Ever.", ["SafetyFirst", "LockedDown", "Private"]],
      ["No family / kids / partners on camera.", ["FamilyShield", "RelationshipGuard", "Private"]],
      ["No real-time posting. Delay everything.", ["Controlled", "Selective", "Private"]],
      ["No pain-content. I don’t monetize pain.", ["VulnerabilityGuard", "Private", "Selective"]],
      ["No rule stays forever, I adapt to what the audience can handle.", ["OpenBook", "LeakRisk", "Relatable"]]
    ]
  },

  6: {
    question: "Deep down, your biggest boundary fear is:",
    options: [
      ["Someone showing up in my real life.", ["SafetyFirst", "Private", "LockedDown"]],
      ["People feeling entitled to my relationship choices.", ["RelationshipGuard", "Private", "BoundaryStress"]],
      ["My family getting targeted because of me.", ["FamilyShield", "Private", "LockedDown"]],
      ["A vulnerable moment becoming a meme forever.", ["VulnerabilityGuard", "Private", "LeakRisk"]],
      ["Losing track of what’s ‘mine’ versus what’s ‘content.’", ["Overshare", "LeakRisk", "BoundaryStress"]]
    ]
  }
};

// Fame-native tags
const tags = {
  // Primary outcomes: boundary posture
  LockedDown: 0,  // hard privacy posture
  Selective: 0,   // curated privacy
  Balanced: 0,    // moderate sharing
  OpenBook: 0,    // high sharing / relatability
  LeakRisk: 0,    // inconsistent / pressure leaks

  // Axes / modifiers
  Private: 0,
  Relatable: 0,
  Controlled: 0,
  Overshare: 0,
  Reactive: 0,
  Resistant: 0,

  // Specific boundary themes
  SafetyFirst: 0,
  RelationshipGuard: 0,
  FamilyShield: 0,
  VulnerabilityGuard: 0,
  Vulnerable: 0,
  BoundaryStress: 0
};

function interpretResults() {
  // ----- pick dominant boundary posture -----
  const postureKeys = ["LockedDown", "Selective", "Balanced", "OpenBook", "LeakRisk"];
  let top = postureKeys[0];
  postureKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 7;

  // ----- axes -----
  // Privacy axis: Private vs Relatable
  const privacyScore = tags.Private - tags.Relatable; // -7 → +7
  let privacyPct = Math.round(((privacyScore + totalQuestions) / (totalQuestions * 2)) * 100);
  privacyPct = Math.max(0, Math.min(privacyPct, 100));

  // Control axis: Controlled vs Reactive (approx)
  const controlScore = tags.Controlled - tags.Reactive;
  let controlPct = Math.round(((controlScore + totalQuestions) / (totalQuestions * 2)) * 100);
  controlPct = Math.max(0, Math.min(controlPct, 100));

  // Exposure risk axis: Overshare + LeakRisk pressure
  const riskScore = (tags.Overshare * 1) + (tags.LeakRisk * 0.75) - (tags.Resistant * 0.5);
  let riskPct = Math.round(((riskScore + totalQuestions) / (totalQuestions * 2)) * 100);
  riskPct = Math.max(0, Math.min(riskPct, 100));

  // ----- style adjective -----
  const isPrivate = privacyPct >= 60;
  const isControlled = controlPct >= 60;
  const isRisky = riskPct >= 60;

  let style;
  if (top === "LockedDown") style = "Hard-Privacy";
  else if (top === "Selective" && isControlled) style = "Curated";
  else if (top === "Balanced") style = "Relatable-With-Rails";
  else if (top === "OpenBook" && !isPrivate) style = "Open-Access";
  else style = "Pressure-Leak";

  const postureNames = {
    LockedDown: "Locked Down",
    Selective: "Selective",
    Balanced: "Balanced",
    OpenBook: "Open Book",
    LeakRisk: "Leak Risk"
  };

  const personaTitle = `${style} ${postureNames[top]}`;

  // ----- primary blurb (cotton-candy swap: no safety/targeting/trauma/mental-health framing; keep playful + non-alarming) -----
  const postureBlurb = {
    LockedDown: "You treat privacy like a velvet rope. If you don’t set the boundary on purpose, the audience will wander right past it.",
    Selective: "You’ll share, but only on your terms. You want connection without full-access backstage passes.",
    Balanced: "You like feeling human and reachable, but you still want parts of your life that stay off-camera and just yours.",
    OpenBook: "You default to transparency. People feel close fast, which builds loyalty and also makes your life more remixable.",
    LeakRisk: "Your boundaries shift when the vibe gets intense. You might start private, then post impulsively when the moment gets loud."
  }[top];

  const privacyPhrase =
    isPrivate
      ? "Your vibe leans private: you prefer a clean line between ‘public’ and ‘mine.’"
      : "Your vibe leans relatable: you’re comfortable letting people see more of the human behind the work.";

  const controlPhrase =
    isControlled
      ? "You tend to keep a consistent boundary policy and stick to it."
      : "You’re more mood-based, your boundaries can flex depending on how the comments feel that week.";

  // pick the strongest boundary theme
  const themeKeys = ["SafetyFirst", "RelationshipGuard", "FamilyShield", "VulnerabilityGuard"];
  let topTheme = themeKeys[0];
  themeKeys.forEach(k => {
    if (tags[k] > tags[topTheme]) topTheme = k;
  });

  const themeLine = {
    SafetyFirst: "Your biggest boundary is real-world details: location clues, routines, and anything that feels too specific.",
    RelationshipGuard: "Your biggest boundary is relationships: rumors, assumptions, and people trying to narrate your love life.",
    FamilyShield: "Your biggest boundary is family: keeping the people you love out of the spotlight.",
    VulnerabilityGuard: "Your biggest boundary is low moments: you don’t want rough days turned into a forever screenshot."
  }[topTheme];

  const riskLine =
    isRisky
      ? "Sparkle tip: your main slip risk isn’t sharing, it’s sharing in the heat of the moment, before you’ve had time to edit the caption."
      : "Sparkle tip: your main drift risk is going so quiet that people fill in the blanks with fan-fiction.";

  const para1 = `${postureBlurb} ${privacyPhrase} ${controlPhrase} ${themeLine}`;
  const para2 = `${riskLine} Next up: whether you curate yourself, or let the internet decide who you are.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByPosture = {
    LockedDown: "rgb(90, 120, 200)",
    Selective: "rgb(0, 170, 140)",
    Balanced: "rgb(200, 170, 90)",
    OpenBook: "rgb(170, 120, 220)",
    LeakRisk: "rgb(200, 90, 90)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByPosture[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Private Life Boundaries";
