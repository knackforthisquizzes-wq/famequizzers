// losing-control-of-the-narrative-quiz.js
// (Quiz 12) How would you react when the story isn’t yours anymore?
// Sustained fame: tabloid logic, algorithmic distortion, crowd-narrative momentum.

const obj = {
  0: {
    question: "A headline twists something you said into the opposite meaning. Your first instinct is:",
    options: [
      ["Correct it immediately and clearly. I refuse the lie.", ["Fighter", "HighControl", "Direct"]],
      ["Say nothing. Fighting gives it oxygen.", ["Detacher", "LowControl", "Withhold"]],
      ["Post something subtle that signals the truth without begging.", ["Reframer", "MediumControl", "Indirect"]],
      ["Make a joke and pivot. I won’t look pressed.", ["Deflector", "MediumControl", "Humor"]],
      ["Spiral privately, then over-explain publicly.", ["Spiral", "Reactive", "OverExplain"]]
    ]
  },

  1: {
    question: "When people start treating a rumor like fact, you’re most likely to:",
    options: [
      ["Bring receipts and shut it down.", ["Fighter", "HighControl", "Receipts"]],
      ["Ignore it and keep producing work.", ["Detacher", "LowControl", "Withhold"]],
      ["Redirect with a new narrative: project, statement, reframing.", ["Reframer", "MediumControl", "Narrative"]],
      ["Lean into ambiguity. Let them argue in circles.", ["Deflector", "LowControl", "Ambiguous"]],
      ["React emotionally and make it worse.", ["Spiral", "Reactive", "LeakRisk"]]
    ]
  },

  2: {
    question: "The worst part of losing narrative control would be:",
    options: [
      ["People believing a lie about my character.", ["Fighter", "JusticeDrive", "Direct"]],
      ["Never being left alone because the story keeps reloading.", ["Detacher", "Exhaustion", "Withhold"]],
      ["Watching the crowd rewrite me into a simpler version.", ["Reframer", "IdentityThreat", "Narrative"]],
      ["Being forced to perform seriousness when I don’t want to.", ["Deflector", "Exhaustion", "Humor"]],
      ["Not knowing what’s true anymore because it’s so loud.", ["Spiral", "IdentityThreat", "Reactive"]]
    ]
  },

  3: {
    question: "If a clip goes viral and the internet decides you’re a “type,” you:",
    options: [
      ["Correct the record. I’m not letting that label stick.", ["Fighter", "HighControl", "Direct"]],
      ["Disappear for a bit. Let the wave pass.", ["Detacher", "Withhold", "Withdrawal"]],
      ["Use it strategically, then expand the story later.", ["Reframer", "MediumControl", "Narrative"]],
      ["Play with it. If they want a character, I’ll toy with it.", ["Deflector", "Humor", "Ambiguous"]],
      ["Get angry and start responding to everyone.", ["Spiral", "Reactive", "LeakRisk"]]
    ]
  },

  4: {
    question: "Your healthiest long-term move when narratives keep mutating is:",
    options: [
      ["Consistency + facts. I build trust by being clear over time.", ["Fighter", "Receipts", "Direct"]],
      ["Silence + boundaries. I stop feeding the machine.", ["Detacher", "Withhold", "Boundary"]],
      ["Reframing + evolution. I give them better stories to repeat.", ["Reframer", "Narrative", "MediumControl"]],
      ["Deflection + charm. I keep it light so it can’t hook into me.", ["Deflector", "Humor", "Boundary"]],
      ["Avoidance. I shut down and hope it stops.", ["Spiral", "Withdrawal", "Exhaustion"]]
    ]
  },

  5: {
    question: "If the public decides they “know the real you,” you’re most likely to feel:",
    options: [
      ["Offended. That’s arrogant and wrong.", ["Fighter", "JusticeDrive", "Direct"]],
      ["Tired. I don’t have the energy to correct strangers.", ["Detacher", "Exhaustion", "Withhold"]],
      ["Strategic. I’ll use that perception while I build the next chapter.", ["Reframer", "Narrative"]],
      ["Amused. People project, it’s kind of funny.", ["Deflector", "Humor"]],
      ["Unstable. I’d start questioning myself.", ["Spiral", "IdentityThreat", "Reactive"]]
    ]
  },

  6: {
    question: "Which response feels most like you once the story has momentum of its own?",
    options: [
      ["Fight: push back, clarify, and protect reputation.", ["Fighter", "HighControl", "Receipts"]],
      ["Detach: protect peace, stop feeding it, keep moving.", ["Detacher", "LowControl", "Boundary"]],
      ["Reframe: change the story by creating a stronger one.", ["Reframer", "MediumControl", "Narrative"]],
      ["Deflect: stay light, stay unbothered, stay slippery.", ["Deflector", "Humor", "Ambiguous"]],
      ["Spiral: react, over-correct, and pay emotionally.", ["Spiral", "Reactive", "LeakRisk"]]
    ]
  }
};

// Fame-native tags
const tags = {
  // Primary outcomes: narrative response
  Fighter: 0,    // confronts and corrects
  Detacher: 0,   // refuses oxygen / protects peace
  Reframer: 0,   // redirects narrative via new story
  Deflector: 0,  // humor/ambiguity to avoid hooks
  Spiral: 0,     // reactive, over-explain, emotional cost

  // Control axis
  HighControl: 0,
  MediumControl: 0,
  LowControl: 0,

  // Methods / modifiers
  Direct: 0,
  Indirect: 0,
  Humor: 0,
  Withhold: 0,
  Receipts: 0,
  Narrative: 0,
  Ambiguous: 0,

  // Pressure effects
  Reactive: 0,
  OverExplain: 0,
  LeakRisk: 0,
  JusticeDrive: 0,
  Exhaustion: 0,
  IdentityThreat: 0,
  Boundary: 0,
  Withdrawal: 0
};

function interpretResults() {
  // ----- pick dominant RESPONSE TYPE -----
  const typeKeys = ["Fighter", "Detacher", "Reframer", "Deflector", "Spiral"];
  let top = typeKeys[0];
  typeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 7;

  // ----- axes -----
  // Control: High vs Low (Medium dampens)
  const controlScore = (tags.HighControl * 1) + (tags.MediumControl * 0.25) - (tags.LowControl * 1);
  let controlPct = Math.round(((controlScore + totalQuestions) / (totalQuestions * 2)) * 100);
  controlPct = Math.max(0, Math.min(controlPct, 100));

  // Engagement: Direct/Receipts/Narrative vs Withhold/Ambiguous
  const engageScore = (tags.Direct + tags.Receipts + tags.Narrative) - (tags.Withhold + tags.Ambiguous);
  let engagePct = Math.round(((engageScore + totalQuestions) / (totalQuestions * 2)) * 100);
  engagePct = Math.max(0, Math.min(engagePct, 100));

  const isHighControl = controlPct >= 60;
  const isEngage = engagePct >= 60;

  // ----- style adjective -----
  let style;
  if (top === "Fighter" && isHighControl) style = "Reputation-Guardian";
  else if (top === "Detacher" && !isEngage) style = "Peace-Protector";
  else if (top === "Reframer") style = "Narrative-Architect";
  else if (top === "Deflector") style = "Slippery-Survivor";
  else style = "Overexposed-Spiral";

  const typeNames = {
    Fighter: "Fighter",
    Detacher: "Detacher",
    Reframer: "Reframer",
    Deflector: "Deflector",
    Spiral: "Spiral"
  };

  const personaTitle = `${style} ${typeNames[top]}`;

  const typeBlurb = {
    Fighter:
      "When the story isn’t yours anymore, you push back. You’d rather look ‘pressed’ than let a lie harden into your identity.",
    Detacher:
      "When narratives mutate, you protect peace. You starve the machine and keep your real life intact, even if the rumor survives.",
    Reframer:
      "When the crowd writes the story, you change the story. You don’t argue every detail, you build a stronger narrative to replace it.",
    Deflector:
      "When the narrative gets weird, you get slippery. You use humor, ambiguity, and vibe control so the story can’t fully hook into you.",
    Spiral:
      "When the story turns on you, you pay emotionally. You’re tempted to correct everything, over-explain, and end up more exposed."
  }[top];

  const controlPhrase =
    controlPct >= 70 ? "You’re control-forward: you want authorship, clarity, and reputation protection." :
    controlPct >= 55 ? "You want some control, but you won’t fight every battle." :
    "You’re peace-forward: you’d rather limit engagement than try to control the crowd.";

  const engagePhrase =
    engagePct >= 70 ? "You engage directly. You’ll clarify, reframe, and manage perception on purpose." :
    engagePct >= 55 ? "You engage selectively, one statement, then boundaries." :
    "You engage minimally. You prefer silence, ambiguity, and letting waves die on their own.";

  // strongest pressure theme
  const themeKeys = ["JusticeDrive", "Exhaustion", "IdentityThreat"];
  let topTheme = themeKeys[0];
  themeKeys.forEach(k => {
    if (tags[k] > tags[topTheme]) topTheme = k;
  });

  const themeLine = {
    JusticeDrive: "Your trigger is injustice: being lied about hits you like a moral problem, not a PR problem.",
    Exhaustion: "Your trigger is fatigue: the constant reloading of stories drains your nervous system.",
    IdentityThreat: "Your trigger is identity threat: being flattened into a false ‘type’ feels like erasure."
  }[topTheme];

  const watchOut = {
    Fighter: "Watch-out: constant correcting turns you into a permanent spokesperson for yourself.",
    Detacher: "Watch-out: silence protects peace, but it can also let a bad narrative calcify.",
    Reframer: "Watch-out: reframing works, but it can start to feel like you’re living inside strategy.",
    Deflector: "Watch-out: deflection can read as evasive, and some crowds treat that as guilt.",
    Spiral: "Watch-out: over-explaining hands the crowd more material to clip and reuse."
  }[top];

  const para1 = `${typeBlurb} ${controlPhrase} ${engagePhrase} ${themeLine}`;
  const para2 = `${watchOut} Next up: whether you’d ever use controversy to stay relevant.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByType = {
    Fighter: "rgb(0, 170, 140)",
    Detacher: "rgb(90, 120, 200)",
    Reframer: "rgb(200, 170, 90)",
    Deflector: "rgb(170, 120, 220)",
    Spiral: "rgb(200, 90, 90)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByType[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Losing Control of the Narrative";
