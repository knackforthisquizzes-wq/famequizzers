// shaping-a-celebrity-persona-quiz.js
// (Quiz 10) Would you curate yourself or let the internet decide?
// Early success: performance vs ambiguity, authorship vs crowd-narrative.

const obj = {
  0: {
    question: "Once clips and comments start defining you, your instinct is to:",
    options: [
      ["Lock in a clear persona fast so people know what to do with you.", ["Curated", "HighControl", "Brand"]],
      ["Stay human and inconsistent. I refuse to become a character.", ["Uncurated", "LowControl", "Authentic"]],
      ["Let it evolve slowly while I watch what lands.", ["Adaptive", "MediumControl", "TestAndLearn"]],
      ["Resist labeling entirely. If they misunderstand me, that’s their problem.", ["Uncurated", "LowControl", "Ambiguous"]],
      ["Try to control it, but I’ll probably get pulled around by reactions.", ["Reactive", "MediumControl", "LeakRisk"]]
    ]
  },

  1: {
    question: "Your biggest fear about being “a public persona” is:",
    options: [
      ["Getting trapped in a brand that stops being true.", ["Brand", "IdentityErosion", "Curated"]],
      ["Being misread and flattened into a meme.", ["CrowdNarrative", "Misread", "Uncurated"]],
      ["Feeling like I’m performing even on normal days.", ["Performance", "IdentityErosion", "Curated"]],
      ["People feeling entitled to versions of me I never agreed to.", ["CrowdNarrative", "Entitlement", "Uncurated"]],
      ["Not knowing what’s real anymore once feedback gets loud.", ["Reactive", "IdentityErosion", "LeakRisk"]]
    ]
  },

  2: {
    question: "If a certain “version of you” starts performing best, you:",
    options: [
      ["Lean into it. Consistency builds power.", ["Curated", "HighControl", "Performance"]],
      ["Keep doing what feels real, even if it’s worse for numbers.", ["Uncurated", "LowControl", "Authentic"]],
      ["Use it sometimes, but don’t let it become the whole thing.", ["Adaptive", "MediumControl", "Authentic"]],
      ["Get annoyed. I hate being trained by engagement.", ["Uncurated", "LowControl", "Resistant"]],
      ["Accidentally slide into it without noticing until it’s a box.", ["Reactive", "LeakRisk", "CrowdNarrative"]]
    ]
  },

  3: {
    question: "A viral clip misrepresents you. Your move is:",
    options: [
      ["Post a clean clarification and reframe the story.", ["HighControl", "Curated", "Brand"]],
      ["Say nothing. Clarifying makes it bigger.", ["Uncurated", "LowControl", "Ambiguous"]],
      ["Respond once in a human way, then stop feeding it.", ["Adaptive", "MediumControl", "Authentic"]],
      ["Make a joke and pivot. Control the vibe, not the facts.", ["Curated", "MediumControl", "Performance"]],
      ["Spiral a bit. I’d probably over-explain.", ["Reactive", "LeakRisk", "Misread"]]
    ]
  },

  4: {
    question: "How do you feel about “playing a role” publicly?",
    options: [
      ["Fine. Everyone’s performing — I’d rather do it intentionally.", ["Curated", "Performance", "HighControl"]],
      ["Gross. If I’m acting, I’ll start disappearing.", ["Uncurated", "Authentic", "LowControl"]],
      ["I can do it for the work, not for my entire identity.", ["Adaptive", "MediumControl", "Authentic"]],
      ["I don’t mind performance, but I hate being predictable.", ["Uncurated", "Ambiguous", "Resistant"]],
      ["I’d try, but feedback would mess with my head.", ["Reactive", "LeakRisk", "IdentityErosion"]]
    ]
  },

  5: {
    question: "If you could set one rule for your public identity, it would be:",
    options: [
      ["I define the narrative. I don’t let the crowd write my lore.", ["HighControl", "Curated", "Brand"]],
      ["No persona. People get the real me, messy and all.", ["Uncurated", "Authentic", "LowControl"]],
      ["I control the core, but I allow evolution.", ["Adaptive", "MediumControl", "TestAndLearn"]],
      ["I stay intentionally hard to label.", ["Uncurated", "Ambiguous", "LowControl"]],
      ["I keep changing so nobody can lock me in.", ["Reactive", "LeakRisk", "Resistant"]]
    ]
  },

  6: {
    question: "The thing most likely to quietly change you over time is:",
    options: [
      ["Trying to stay consistent so the brand doesn’t break.", ["Curated", "IdentityErosion", "Performance"]],
      ["Constant projection — people insisting they know who I am.", ["CrowdNarrative", "Entitlement", "Uncurated"]],
      ["Audience feedback shaping what I say and don’t say.", ["Adaptive", "TestAndLearn", "IdentityErosion"]],
      ["Being misunderstood and having to decide whether to correct it.", ["Uncurated", "Misread", "Ambiguous"]],
      ["The dopamine loop — numbers controlling my mood.", ["Reactive", "LeakRisk", "IdentityErosion"]]
    ]
  }
};

// Fame-native tags
const tags = {
  // Primary outcomes: identity strategy
  Curated: 0,     // intentional persona / brand building
  Uncurated: 0,   // refuses a persona / stays messy
  Adaptive: 0,    // evolves intentionally, balances
  Reactive: 0,    // pushed around by feedback / mood

  // Control axis
  HighControl: 0,
  MediumControl: 0,
  LowControl: 0,

  // Style / mechanics
  Brand: 0,
  Authentic: 0,
  Ambiguous: 0,
  Performance: 0,

  // Crowd dynamics + risks
  CrowdNarrative: 0,
  Entitlement: 0,
  Misread: 0,
  Resistant: 0,
  LeakRisk: 0,
  IdentityErosion: 0,
  TestAndLearn: 0
};

function interpretResults() {
  // ----- pick dominant STRATEGY -----
  const stratKeys = ["Curated", "Uncurated", "Adaptive", "Reactive"];
  let top = stratKeys[0];
  stratKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 7;

  // ----- axes -----
  // Control: High vs Low (Medium dampens)
  const controlScore = (tags.HighControl * 1) + (tags.MediumControl * 0.25) - (tags.LowControl * 1);
  let controlPct = Math.round(((controlScore + totalQuestions) / (totalQuestions * 2)) * 100);
  controlPct = Math.max(0, Math.min(controlPct, 100));

  // Persona: Brand/Performance vs Authentic/Ambiguous
  const personaScore = (tags.Brand + tags.Performance) - (tags.Authentic + tags.Ambiguous);
  let personaPct = Math.round(((personaScore + totalQuestions) / (totalQuestions * 2)) * 100);
  personaPct = Math.max(0, Math.min(personaPct, 100));

  const isHighControl = controlPct >= 60;
  const isPersonaForward = personaPct >= 60; // leans brand/performance

  // ----- style adjective -----
  let style;
  if (top === "Curated" && isHighControl) style = "Author-Led";
  else if (top === "Curated" && !isHighControl) style = "Brand-Trying";
  else if (top === "Adaptive" && isHighControl) style = "Intentional-Evolution";
  else if (top === "Adaptive") style = "Experimenting";
  else if (top === "Uncurated" && !isPersonaForward) style = "Unscripted";
  else if (top === "Uncurated") style = "Anti-Brand";
  else style = "Feedback-Driven";

  const stratNames = {
    Curated: "Curator",
    Uncurated: "Unfiltered",
    Adaptive: "Balancer",
    Reactive: "Reactor"
  };

  const personaTitle = `${style} ${stratNames[top]}`;

  // ----- primary blurb -----
  const stratBlurb = {
    Curated:
      "You’d rather be misunderstood less, even if it means becoming a deliberate version of yourself. You try to author your own myth.",
    Uncurated:
      "You don’t want to become a character. You’d rather be messy and real than clean and marketable — even if it costs reach.",
    Adaptive:
      "You’ll shape a persona, but you won’t freeze yourself in amber. You test what lands, keep what’s true, and adjust the rest.",
    Reactive:
      "Your public identity is at risk of being shaped by pressure: comments, numbers, and misunderstandings steering your next move."
  }[top];

  const controlTone =
    controlPct >= 75 ? "high" :
    controlPct >= 55 ? "medium" :
    "low";

  const personaTone =
    personaPct >= 75 ? "persona-forward" :
    personaPct >= 55 ? "somewhat-persona" :
    "human-forward";

  const controlPhrase = {
    high: "You push for authorship. You’d rather steer the narrative than ride it.",
    medium: "You’ll guide the narrative when it matters, but you won’t try to control every ripple.",
    low: "You’re more likely to let the crowd’s story form and then decide what to do about it."
  }[controlTone];

  const personaPhrase = {
    "persona-forward": "You’re comfortable with performance and branding as tools — even if they sometimes feel fake.",
    "somewhat-persona": "You’ll use persona tactics when useful, but you still want the core to feel real.",
    "human-forward": "You’re allergic to acting. You want closeness and truth, even when it’s inconvenient."
  }[personaTone];

  // strongest risk signal
  const riskKeys = ["IdentityErosion", "CrowdNarrative", "LeakRisk", "Misread", "Entitlement"];
  let topRisk = riskKeys[0];
  riskKeys.forEach(k => {
    if (tags[k] > tags[topRisk]) topRisk = k;
  });

  const riskLine = {
    IdentityErosion:
      "Risk: slowly changing yourself to stay ‘consistent’ or ‘successful’ until you can’t tell what you actually think anymore.",
    CrowdNarrative:
      "Risk: the crowd writing your lore so aggressively that your real self becomes irrelevant to your public self.",
    LeakRisk:
      "Risk: emotional posting and reactive pivots — not because you’re unstable, but because the system is.",
    Misread:
      "Risk: being clipped and simplified until you’re constantly deciding whether to correct people or let it rot.",
    Entitlement:
      "Risk: people treating access to you like a subscription — and punishing you when you act like a person."
  }[topRisk];

  const para1 = `${stratBlurb} ${controlPhrase} ${personaPhrase}`;
  const para2 = `${riskLine} Next up: what happens when attention stops being new and starts being routine.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByStrategy = {
    Curated: "rgb(0, 170, 140)",
    Uncurated: "rgb(90, 120, 200)",
    Adaptive: "rgb(200, 170, 90)",
    Reactive: "rgb(200, 90, 90)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByStrategy[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Celebrity Persona";
