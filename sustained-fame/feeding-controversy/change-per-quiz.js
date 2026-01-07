// feeding-controversy-quiz.js
// (Quiz 13) Would you ever use backlash to stay relevant?
// Sustained fame: attention-as-fuel vs peace-as-priority. Heat management.

const obj = {
  0: {
    question: "You learn something “mildly controversial” would make you trend today. You:",
    options: [
      ["Post it. Attention is attention — I can handle the sparkle-storm.", ["FuelUser", "HighHeat", "Relevance"]],
      ["Don’t post it. Peace is worth more than reach (and my skin deserves silk).", ["PeaceKeeper", "LowHeat", "Integrity"]],
      ["Post a softer version. I’ll be strategic, not reckless.", ["Strategist", "MediumHeat", "Relevance"]],
      ["Post it, then act shocked at the backlash (for the drama).", ["Troll", "HighHeat", "Chaos"]],
      ["Freeze. I hate the idea of being publicly dragged.", ["Avoider", "LowHeat", "tension"]]
    ]
  },

  1: {
    question: "When backlash hits, your most honest internal reaction is:",
    options: [
      ["Adrenaline. This is the game. I can ride the heat like a runway.", ["FuelUser", "HighHeat", "Dopamine"]],
      ["Stress. I want to undo it and go back to quiet luxury.", ["Avoider", "LowHeat", "tension"]],
      ["Annoyance. People are dramatic. I’m not crying over confetti.", ["Troll", "MediumHeat", "Resentment"]],
      ["Focus. I’ll manage it cleanly and keep the brand polished.", ["Strategist", "MediumHeat", "Control"]],
      ["Softness. I don’t like scorching the room for clicks.", ["PeaceKeeper", "LowHeat", "Integrity"]]
    ]
  },

  2: {
    question: "If controversy reliably boosts your career, you’d most likely:",
    options: [
      ["Use it intentionally. It’s a tool — like a spotlight you can aim.", ["FuelUser", "Relevance", "HighHeat"]],
      ["Refuse it. I don’t want to become that vibe.", ["PeaceKeeper", "Integrity", "LowHeat"]],
      ["Use it rarely, only when it’s about something real to me.", ["Strategist", "Integrity", "MediumHeat"]],
      ["Start leaning into it because it’s addictive.", ["Troll", "Dopamine", "HighHeat"]],
      ["Step back so I don’t have to make the choice.", ["Avoider", "Withdrawal", "LowHeat"]]
    ]
  },

  3: {
    question: "The line you don’t want to cross is:",
    options: [
      ["Lying. I can be provocative, but not dishonest.", ["Strategist", "Integrity", "Control"]],
      ["Harming people. I won’t punch down for attention.", ["PeaceKeeper", "Integrity", "LowHeat"]],
      ["Looking weak. I hate being publicly steered by outrage.", ["FuelUser", "HighHeat", "Ego"]],
      ["Being boring. I’d rather be hated than ignored.", ["Troll", "HighHeat", "Relevance"]],
      ["Being perceived at all. I’d rather disappear.", ["Avoider", "LowHeat", "tension"]]
    ]
  },

  4: {
    question: "If your team said, “Controversy is part of your brand now,” you’d:",
    options: [
      ["Agree. Brand heat keeps the lights on.", ["FuelUser", "Relevance", "HighHeat"]],
      ["Reject it. I’m not selling my peace for a spike.", ["PeaceKeeper", "Integrity", "LowHeat"]],
      ["Negotiate: controlled edges, not chaos.", ["Strategist", "Control", "MediumHeat"]],
      ["Lean in harder. Make it entertaining.", ["Troll", "Chaos", "HighHeat"]],
      ["Feel trapped and want to quit.", ["Avoider", "Withdrawal", "tension"]]
    ]
  },

  5: {
    question: "Your most likely public pattern under pressure is:",
    options: [
      ["Say the thing. Let them argue. Keep moving.", ["FuelUser", "Relevance", "HighHeat"]],
      ["Stay clean and boring. Consistency over drama.", ["PeaceKeeper", "Integrity", "LowHeat"]],
      ["Play close to the line, then step back.", ["Strategist", "MediumHeat", "Control"]],
      ["Make sparks on purpose. I like the chaos.", ["Troll", "Chaos", "HighHeat"]],
      ["Avoid the whole arena. Post less. Hide more.", ["Avoider", "Withdrawal", "LowHeat"]]
    ]
  },

  6: {
    question: "If you accidentally caused a backlash storm, you’d:",
    options: [
      ["Double down. I won’t be bullied into apology.", ["FuelUser", "Ego", "HighHeat"]],
      ["Smooth it over if I actually did harm, then move on.", ["PeaceKeeper", "Integrity", "Control"]],
      ["Clarify carefully and set boundaries.", ["Strategist", "Control", "MediumHeat"]],
      ["Turn it into content. It’s already happening.", ["Troll", "Chaos", "Dopamine"]],
      ["Delete and disappear for a while.", ["Avoider", "Withdrawal", "tension"]]
    ]
  }
};

// Fame-native tags
const tags = {
  // Primary outcomes: controversy posture
  FuelUser: 0,     // uses backlash as fuel
  PeaceKeeper: 0,  // protects peace / avoids heat
  Strategist: 0,   // controlled edge / managed heat
  Troll: 0,        // chaos/enjoys stirring
  Avoider: 0,      // tension/withdrawal

  // Heat axis
  HighHeat: 0,
  MediumHeat: 0,
  LowHeat: 0,

  // Motives / modifiers
  Relevance: 0,
  Integrity: 0,
  Control: 0,
  Chaos: 0,
  Dopamine: 0,
  Ego: 0,
  tension: 0,
  Withdrawal: 0,
  Resentment: 0
};

function interpretResults() {
  // ----- pick dominant CONTROVERSY POSTURE -----
  const typeKeys = ["FuelUser", "PeaceKeeper", "Strategist", "Troll", "Avoider"];
  let top = typeKeys[0];
  typeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 7;

  // ----- axes -----
  // Heat: High vs Low (Medium dampens)
  const heatScore = (tags.HighHeat * 1) + (tags.MediumHeat * 0.25) - (tags.LowHeat * 1);
  let heatPct = Math.round(((heatScore + totalQuestions) / (totalQuestions * 2)) * 100);
  heatPct = Math.max(0, Math.min(heatPct, 100));

  // Ethics: Integrity/Control vs Chaos/Ego/Dopamine
  const ethicsScore = (tags.Integrity + tags.Control) - (tags.Chaos + tags.Ego + tags.Dopamine);
  let ethicsPct = Math.round(((ethicsScore + totalQuestions) / (totalQuestions * 2)) * 100);
  ethicsPct = Math.max(0, Math.min(ethicsPct, 100));

  const isHot = heatPct >= 60;
  const isEthical = ethicsPct >= 60;

  // ----- style adjective -----
  let style;
  if (top === "FuelUser" && isHot) style = "Heat-Converter";
  else if (top === "PeaceKeeper" && isEthical) style = "Peace-First";
  else if (top === "Strategist") style = "Edge-Managed";
  else if (top === "Troll") style = "Chaos-Fed";
  else style = "Heat-Avoidant";

  const typeNames = {
    FuelUser: "Fuel User",
    PeaceKeeper: "Peace Keeper",
    Strategist: "Strategist",
    Troll: "Troll",
    Avoider: "Avoider"
  };

  const personaTitle = `${style} ${typeNames[top]}`;

  const typeBlurb = {
    FuelUser:
      "You can treat backlash like fuel. Not because you’re villain-coded — because you can turn noise into momentum.",
    PeaceKeeper:
      "You won’t trade your peace for reach. You’d rather be smaller and serene than bigger and scorched.",
    Strategist:
      "You’ll flirt with edges, but with guardrails. You manage controversy like fire: useful when contained, messy when loose.",
    Troll:
      "You’re tempted to stir. Attention chaos can feel funny, powerful, and dangerously rewarding — until it stops being cute.",
    Avoider:
      "You don’t want heat. Backlash feels like a threat, not entertainment, and your instinct is to retreat to safety."
  }[top];

  const heatPhrase =
    heatPct >= 70 ? "You tolerate high heat. Outrage doesn’t scare you — you can ride it." :
    heatPct >= 55 ? "You can handle some heat, but it costs you if it becomes constant." :
    "You prefer low heat. Sustained backlash would drain you fast.";

  const ethicsPhrase =
    ethicsPct >= 70 ? "You keep strong guardrails: honesty, harm-reduction, and boundaries matter to you." :
    ethicsPct >= 55 ? "You have some guardrails, but pressure and dopamine can bend them." :
    "Your risk is drift: heat rewards can override your original values.";

  const watchOut = {
    FuelUser: "Watch-out: once you learn backlash boosts you, it becomes hard to stop turning up the heat.",
    PeaceKeeper: "Watch-out: avoiding all heat can make you fade out — and the algorithm doesn’t reward quiet elegance.",
    Strategist: "Watch-out: ‘managed heat’ still burns. You’re playing with a system that loves wildfire.",
    Troll: "Watch-out: chaos makes people stop trusting your sincerity. You become the bit.",
    Avoider: "Watch-out: retreat protects you, but it can shrink your world until you feel boxed in."
  }[top];

  const para1 = `${typeBlurb} ${heatPhrase} ${ethicsPhrase}`;
  const para2 = `${watchOut} Next up: what would dim your shine first under sustained fame.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByType = {
    FuelUser: "rgb(200, 90, 90)",
    PeaceKeeper: "rgb(0, 170, 140)",
    Strategist: "rgb(200, 170, 90)",
    Troll: "rgb(170, 120, 220)",
    Avoider: "rgb(90, 120, 200)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByType[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Feeding Controversy - Fame";
