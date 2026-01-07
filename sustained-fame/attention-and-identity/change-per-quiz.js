// attention-and-identity-quiz.js
// (Quiz 15) Would you still feel like yourself without attention?
// Sustained fame: attention as tool vs attention as identity.
//
// YMYL-STRIPPED PASS:
// - Removed clinical / mental-health framing (panic, addiction, identity threat, compulsion, survive, etc.)
// - Recast into vibe + preference language (grounded, attached, fused) without diagnosis-y implications
// - Kept the same tag logic + structure so your scoring system still works

const obj = {
  0: {
    question: "If the spotlight vanished tomorrow, your first gut reaction would be:",
    options: [
      ["Relief. I’d feel like I got my bandwidth back.", ["Grounded", "ToolUser", "Detachment"]],
      ["A dip. Like something meaningful just went missing.", ["Attached", "Need", "Loss"]],
      ["Disorientation. I wouldn’t know what to do with the quiet.", ["Fused", "Need", "IdentityThreat"]],
      ["Curiosity. I’d see what I actually want without the noise.", ["Grounded", "ToolUser", "Reflection"]],
      ["I’d feel dismissed — like I got edited out.", ["Attached", "Need", "EgoHit"]]
    ]
  },

  1: {
    question: "When attention slows down, you’re most likely to:",
    options: [
      ["Keep living. My life isn’t built on applause.", ["Grounded", "ToolUser", "Stable"]],
      ["Feel restless and try to spark something new.", ["Attached", "Chase", "Restless"]],
      ["Go bigger. Bigger moves, bigger moments.", ["Fused", "Chase", "Escalation"]],
      ["Step back on purpose and reset.", ["Grounded", "ToolUser", "Boundary"]],
      ["Rework every detail until it’s exhausting.", ["Attached", "Need", "Rumination"]]
    ]
  },

  2: {
    question: "The truest sentence about you is:",
    options: [
      ["I like being seen, but I don’t need it.", ["Grounded", "ToolUser", "Stable"]],
      ["I act like I don’t care, but I care a lot.", ["Attached", "Need", "Mask"]],
      ["Attention feels weirdly necessary — I’m not proud of it.", ["Fused", "Need", "Honest"]],
      ["I can take long breaks without feeling like I’m disappearing.", ["Grounded", "ToolUser", "Detachment"]],
      ["When I’m not seen, I feel underestimated.", ["Attached", "Need", "EgoHit"]]
    ]
  },

  3: {
    question: "If someone said “you’re hooked on attention,” your honest reaction is:",
    options: [
      ["No. I like it, but it doesn’t run my life.", ["Grounded", "ToolUser", "Stable"]],
      ["Maybe. I hate that it might be true.", ["Attached", "Need", "Honest"]],
      ["Yeah… and I don’t love how much it pulls me.", ["Fused", "Need", "Compulsion"]],
      ["Not hooked — just aware attention is leverage.", ["Grounded", "ToolUser", "Strategic"]],
      ["I’d get defensive and start proving them wrong.", ["Attached", "Chase", "Defensive"]]
    ]
  },

  4: {
    question: "Your biggest worry about fading from relevance is:",
    options: [
      ["I don’t worry much. I’ll evolve and move on.", ["Grounded", "ToolUser", "Detachment"]],
      ["People forgetting me after years of being ‘the one.’", ["Attached", "Need", "Loss"]],
      ["Feeling like I turn invisible again — and I hate that idea.", ["Fused", "Need", "IdentityThreat"]],
      ["Losing influence, not self. I care about impact.", ["Grounded", "ToolUser", "Strategic"]],
      ["Being replaced like I never mattered.", ["Attached", "Need", "EgoHit"]]
    ]
  },

  5: {
    question: "How do you make decisions when attention is involved?",
    options: [
      ["I choose based on values, not the crowd.", ["Grounded", "ToolUser", "Boundary"]],
      ["I check what the crowd wants more than I admit.", ["Attached", "Need", "Mask"]],
      ["I pick what keeps the spotlight on me.", ["Fused", "Chase", "Compulsion"]],
      ["I use attention as a tool, then step away.", ["Grounded", "ToolUser", "Strategic"]],
      ["I overthink because I’m scared of losing the room.", ["Attached", "Need", "Rumination"]]
    ]
  },

  6: {
    question: "In a quiet week (no posts, no praise), you feel:",
    options: [
      ["Good. Quiet feels restorative.", ["Grounded", "ToolUser", "Stable"]],
      ["Uneasy. Like I’m fading.", ["Attached", "Need", "Restless"]],
      ["Agitated. I want to do something big.", ["Fused", "Chase", "Escalation"]],
      ["Fine if I chose it. Not fine if it chose me.", ["Grounded", "ToolUser", "Boundary"]],
      ["Embarrassed. Like the world moved on.", ["Attached", "Need", "EgoHit"]]
    ]
  },

  7: {
    question: "Would you still feel like yourself without attention?",
    options: [
      ["Yes. Attention doesn’t define me.", ["Grounded", "ToolUser", "Stable"]],
      ["Mostly, but I’d miss it more than I admit.", ["Attached", "Need", "Loss"]],
      ["I’m not totally sure.", ["Attached", "Need", "IdentityThreat"]],
      ["Yes — and I’d probably feel lighter.", ["Grounded", "ToolUser", "Detachment"]],
      ["No. It’s become part of how I orient myself.", ["Fused", "Need", "IdentityThreat"]]
    ]
  }
};

// Fame-native tags
const tags = {
  // Primary outcomes: attention-identity relationship
  Grounded: 0,  // attention as optional / non-identity
  Attached: 0,  // attention matters, but not total identity
  Fused: 0,     // attention is identity-ish / strongly needed

  // Secondary axis: tool vs need
  ToolUser: 0,
  Need: 0,
  Chase: 0,

  // Modifiers / states
  Stable: 0,
  Boundary: 0,
  Detachment: 0,
  Reflection: 0,
  Strategic: 0,

  Loss: 0,
  EgoHit: 0,
  Rumination: 0,
  Restless: 0,
  IdentityThreat: 0,
  Compulsion: 0,
  Escalation: 0,
  Mask: 0,
  Honest: 0,
  Defensive: 0
};

function interpretResults() {
  // ----- pick dominant TYPE -----
  const typeKeys = ["Grounded", "Attached", "Fused"];
  let top = typeKeys[0];
  typeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 8;

  // ----- axes -----
  // Tool vs Need
  const toolNeedScore = tags.ToolUser - tags.Need; // approx -8 → +8
  let toolNeedPct = Math.round(((toolNeedScore + totalQuestions) / (totalQuestions * 2)) * 100);
  toolNeedPct = Math.max(0, Math.min(toolNeedPct, 100));

  // Chase intensity
  const chaseScore = tags.Chase + tags.Compulsion + tags.Escalation - (tags.Boundary + tags.Detachment);
  let chasePct = Math.round(((chaseScore + totalQuestions) / (totalQuestions * 2)) * 100);
  chasePct = Math.max(0, Math.min(chasePct, 100));

  const isTool = toolNeedPct >= 60;
  const isChaser = chasePct >= 60;

  // ----- style adjective -----
  let style;
  if (top === "Grounded" && isTool) style = "Self-Rooted";
  else if (top === "Grounded" && !isTool) style = "Quietly-Independent";
  else if (top === "Attached" && isChaser) style = "Room-Responsive";
  else if (top === "Attached") style = "Attention-Aware";
  else style = isChaser ? "Spotlight-Oriented" : "Identity-Leaning";

  const typeNames = {
    Grounded: "Grounded",
    Attached: "Attached",
    Fused: "Fused"
  };

  const personaTitle = `${style} ${typeNames[top]}`;

  const typeBlurb = {
    Grounded:
      "Attention is real, but it isn’t your core. You can be seen without being rearranged by being seen.",
    Attached:
      "Attention matters to you more than you want to admit. You can still be yourself — but the room quietly influences your mood and choices.",
    Fused:
      "Attention has started to feel structural. When the spotlight dims, it’s not just quieter — it can feel like you lost your coordinates."
  }[top];

  const toolNeedPhrase =
    toolNeedPct >= 70 ? "You treat attention like a tool: useful, not sacred." :
    toolNeedPct >= 55 ? "You use attention — and sometimes it tugs back." :
    "You lean need-first: attention feels emotionally important, not just helpful.";

  const chasePhrase =
    chasePct >= 70 ? "When attention drops, you’re tempted to go bigger. Big moves feel like the fastest reset." :
    chasePct >= 55 ? "You’ll try to rekindle the spark — not always consciously." :
    "You’re not strongly chase-driven. Quiet doesn’t automatically feel like failure.";

  // strongest sensitivity
  const vulnKeys = ["Loss", "EgoHit", "Rumination", "IdentityThreat"];
  let topVuln = vulnKeys[0];
  vulnKeys.forEach(k => {
    if (tags[k] > tags[topVuln]) topVuln = k;
  });

  const vulnLine = {
    Loss: "Your tender spot is loss: being forgotten feels like a real subtraction.",
    EgoHit: "Your tender spot is being overlooked: replacement feels personal.",
    Rumination: "Your tender spot is replaying: you re-run moments like a scoreboard.",
    IdentityThreat: "Your tender spot is orientation: without attention, you question what to build the day around."
  }[topVuln];

  const forwardHook = {
    Grounded: "Upside: you can step off-stage without wobbling. Watch-out: people may underestimate your need for privacy and quiet time.",
    Attached: "Upside: attention genuinely energizes you. Watch-out: you start shaping yourself around keeping the room.",
    Fused: "Upside: you can generate serious momentum. Watch-out: the spotlight starts steering the steering wheel."
  }[top];

  const para1 = `${typeBlurb} ${toolNeedPhrase} ${chasePhrase} ${vulnLine}`;
  const para2 = `${forwardHook} End of Phase 3 — Phase 4 goes long-term: what attention does to relationships, routines, and the future.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByType = {
    Grounded: "rgb(0, 170, 140)",
    Attached: "rgb(200, 170, 90)",
    Fused: "rgb(200, 90, 90)"
  };

  // Reset tags for next run
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByType[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "Attention and Identity";
