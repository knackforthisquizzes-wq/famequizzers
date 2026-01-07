// being-recognized-everywhere-quiz.js
// (Quiz 5) How would it feel to never be anonymous again?

const obj = {
  0: {
    question: "You’re at a grocery store in sweatpants. Someone recognizes you and starts filming. You:",
    options: [
      ["Play along. It’s weird, but kind of thrilling.", ["Thrill", "Adaptable", "Open"]],
      ["Act normal, but feel self-conscious the rest of the day.", ["Awkward", "Sensitive", "Boundary"]],
      ["Feel irritated. Random filming is a hard no.", ["Invasive", "PrivacyFirst", "Boundary"]],
      ["Go quiet. I hate surprise attention when I didn’t opt in.", ["Destabilized", "PrivacyFirst", "Guarded"]]
    ]
  },

  1: {
    question: "Strangers start talking about you while you’re standing right there (like you’re not human). You:",
    options: [
      ["Ignore it. That’s background noise now.", ["Adaptable", "ThickSkin", "Open"]],
      ["Feel awkward and want to leave immediately.", ["Awkward", "Sensitive", "Guarded"]],
      ["Interrupt politely. I’m not a display item.", ["Boundary", "Control", "PrivacyFirst"]],
      ["Go quiet. I’d replay it in my head for days.", ["Destabilized", "Sensitive", "Guarded"]]
    ]
  },

  2: {
    question: "You notice you’re changing what you wear and how you move in public. Your honest reaction is:",
    options: [
      ["That’s fine. Being recognizable comes with a look.", ["Adaptable", "Control", "Open"]],
      ["I’d resent it. I don’t want my outfit to become a brand.", ["Invasive", "PrivacyFirst", "Guarded"]],
      ["I’d overthink it constantly. It would take up way too much brain space.", ["Destabilized", "Sensitive", "Guarded"]],
      ["I’d treat it like a game. I can code-switch.", ["Thrill", "Adaptable", "Control"]]
    ]
  },

  3: {
    question: "Someone posts a blurry photo of you with a wrong caption. The worst part is:",
    options: [
      ["The misinformation. People believe anything.", ["Boundary", "Control", "ThickSkin"]],
      ["The feeling of being watched without asking.", ["Invasive", "PrivacyFirst", "Guarded"]],
      ["The guessing game it creates: who else is recording me?", ["Destabilized", "Sensitive", "PrivacyFirst"]],
      ["Honestly, it’s kind of funny. People are weird.", ["Thrill", "Open", "ThickSkin"]]
    ]
  },

  4: {
    question: "Your name becomes a thing people say in public as a joke/reference. You:",
    options: [
      ["Love it. Being a reference point feels powerful.", ["Thrill", "Open", "ThickSkin"]],
      ["Feel embarrassed. I don’t want to be a meme.", ["Awkward", "Sensitive", "Guarded"]],
      ["Feel annoyed. I’m not content for strangers.", ["Invasive", "Boundary", "PrivacyFirst"]],
      ["Feel detached in a bad way, like you’re watching your life from outside.", ["Destabilized", "Sensitive", "Guarded"]]
    ]
  },

  5: {
    question: "The part of losing anonymity that would hit you the hardest is:",
    options: [
      ["Never getting to be ‘off’ in public again.", ["Invasive", "PrivacyFirst", "Boundary"]],
      ["People assuming they know you.", ["Awkward", "Sensitive", "Guarded"]],
      ["Always being on camera — every awkward moment gets saved forever.", ["Destabilized", "PrivacyFirst", "Sensitive"]],
      ["The intensity is worth it. I’d adapt.", ["Thrill", "Adaptable", "Open"]]
    ]
  },

  6: {
    question: "How do you imagine you’d handle being approached by strangers daily?",
    options: [
      ["Warm and present. It’s part of the exchange.", ["Adaptable", "Open", "ThickSkin"]],
      ["Polite but brief. I need distance.", ["Boundary", "Control", "Guarded"]],
      ["Avoidant. I’d route my life around it.", ["PrivacyFirst", "Guarded", "Sensitive"]],
      ["Some days fine, some days I’d feel like I’m evaporating.", ["Destabilized", "Sensitive", "Guarded"]]
    ]
  },

  7: {
    question: "If anonymity disappeared tomorrow, your biggest fear is:",
    options: [
      ["Losing control of my story.", ["Boundary", "Control", "ThickSkin"]],
      ["Never getting to truly reset.", ["Destabilized", "Sensitive", "PrivacyFirst"]],
      ["Losing quiet. Quiet is where I think.", ["Invasive", "PrivacyFirst", "Guarded"]],
      ["Honestly? I’d be excited more than scared.", ["Thrill", "Open", "Adaptable"]]
    ]
  }
};

// Fame-native tags for Quiz 5
const tags = {
  // Primary outcomes: what “no anonymity” feels like
  Thrill: 0,        // thrilling / empowering
  Awkward: 0,       // socially uncomfortable / self-conscious
  Invasive: 0,      // violating / angering
  Destabilized: 0,  // constantly disorienting / surreal

  // Secondary modifiers: coping and needs
  Adaptable: 0,
  PrivacyFirst: 0,
  Boundary: 0,

  ThickSkin: 0,
  Sensitive: 0,

  Control: 0,
  Open: 0,
  Guarded: 0
};

function interpretResults() {
  // ----- pick dominant outcome -----
  const outcomeKeys = ["Thrill", "Awkward", "Invasive", "Destabilized"];
  let top = outcomeKeys[0];
  outcomeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 8;

  // ----- axes -----
  // Openness: Open vs Guarded
  const openScore = tags.Open - tags.Guarded; // approx -8 → +8
  let openPct = Math.round(((openScore + totalQuestions) / (totalQuestions * 2)) * 100);
  openPct = Math.max(0, Math.min(openPct, 100));

  // Skin: Thick vs Sensitive
  const skinScore = tags.ThickSkin - tags.Sensitive;
  let skinPct = Math.round(((skinScore + totalQuestions) / (totalQuestions * 2)) * 100);
  skinPct = Math.max(0, Math.min(skinPct, 100));

  // Boundary: Boundary vs Adaptable (boundary high means you need rules; adaptable high means you can flow)
  const boundaryScore = tags.Boundary - tags.Adaptable;
  let boundaryPct = Math.round(((boundaryScore + totalQuestions) / (totalQuestions * 2)) * 100);
  boundaryPct = Math.max(0, Math.min(boundaryPct, 100));

  // ----- style adjective (shareable, no % shown) -----
  const isOpen = openPct >= 60;
  const isThick = skinPct >= 60;
  const needsBoundaries = boundaryPct >= 60;

  let style;
  if (isOpen && isThick && !needsBoundaries) style = "Unbothered";
  else if (isOpen && needsBoundaries) style = "Selective";
  else if (!isOpen && isThick) style = "Private-Pro";
  else style = "Overexposed";

  const outcomeNames = {
    Thrill: "Thrill",
    Awkward: "Awkward",
    Invasive: "Invasive",
    Destabilized: "Destabilizing"
  };

  const personaTitle = `${style} ${outcomeNames[top]}`;

  const outcomeBlurb = {
    Thrill: "Losing anonymity would feel exciting — like stepping into a bigger, louder version of life.",
    Awkward: "Losing anonymity would feel socially awkward. You’d become extra aware of yourself in public.",
    Invasive: "Losing anonymity would feel infuriating. It’s the uninvited attention that would get old fast.",
    Destabilized: "Losing anonymity would feel weirdly unreal. Not dramatic — just constantly disorienting."
  }[top];

  const opennessTone =
    openPct >= 70 ? "open" :
    openPct >= 55 ? "mostly-open" :
    openPct >= 45 ? "mixed" :
    "guarded";

  const skinTone =
    skinPct >= 70 ? "thick" :
    skinPct >= 55 ? "mostly-thick" :
    skinPct >= 45 ? "mixed" :
    "sensitive";

  const boundaryTone =
    boundaryPct >= 70 ? "hard-boundaries" :
    boundaryPct >= 55 ? "boundaries" :
    boundaryPct >= 45 ? "mixed" :
    "flow";

  const opennessPhrase = {
    open: "You’re relatively comfortable being seen. Visibility doesn’t automatically feel like a problem.",
    "mostly-open": "You can handle being seen, but you still want moments where nobody wants anything from you.",
    mixed: "Some days you’d be fine, some days you’d want to go invisible. Context runs the show.",
    guarded: "You protect your inner life. Too much visibility feels like your brain can’t unclench."
  }[opennessTone];

  const skinPhrase = {
    thick: "Public reactions don’t land as deep. You can stay yourself under observation.",
    "mostly-thick": "You can take some noise, but you’d want distance from constant commentary.",
    mixed: "Certain comments bounce off, others stick. The wrong moment can loop in your head.",
    sensitive: "You’d feel the crowd. Little moments would stack up and get loud."
  }[skinTone];

  const boundaryPhrase = {
    "hard-boundaries": "You’d need strict rules: controlled access, controlled spaces, controlled time.",
    boundaries: "You’d do best with clear rules and predictable routines.",
    mixed: "You’d set some rules, but you’d still get pulled into the chaos sometimes.",
    flow: "You can adapt on the fly. You don’t need heavy rules to function."
  }[boundaryTone];

  const para1 = `${outcomeBlurb} ${opennessPhrase} ${skinPhrase} ${boundaryPhrase}`;

  const forwardHook = {
    Thrill: "The real downside: confusing constant access with real connection.",
    Awkward: "The real downside: starting to perform even when you’re just buying groceries.",
    Invasive: "The real downside: living on defense and getting tired of strangers fast.",
    Destabilized: "The real downside: feeling like you’re always in a fishbowl, even on normal days."
  }[top];

  const para2 = `${forwardHook} That’s the end of the Celebrity Fantasy arc — and the start of the real questions.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByOutcome = {
    Thrill: "rgb(0, 170, 140)",
    Awkward: "rgb(200, 170, 90)",
    Invasive: "rgb(200, 90, 90)",
    Destabilized: "rgb(120, 120, 140)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByOutcome[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "No Anonymity";
