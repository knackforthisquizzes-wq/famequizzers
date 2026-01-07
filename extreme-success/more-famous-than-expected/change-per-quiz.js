// more-famous-than-expected-quiz.js
// (Phase 4 – Extreme Success, Quiz 16)
// What happens when fame exceeds anything you mentally prepared for? (gloss-only edition)

const obj = {
  0: {
    question: "You wake up and realize your reach is far beyond what you ever imagined. Your first real reaction is:",
    options: [
      ["Starstruck. This is surreal and kind of thrilling.", ["Expansion", "Energized", "Adaptive"]],
      ["Tense. This is bigger than my ability to steer it.", ["Overloaded", "tension", "Cautious"]],
      ["Professional mode. I need systems, people, and structure now.", ["Managerial", "Control", "Adaptive"]],
      ["Floaty disbelief. I don’t feel like the person they think I am.", ["Impostor", "Dislocation", "Fragile"]],
      ["Irritated. I didn’t ask for *this* level of visibility.", ["Resistance", "BoundaryCrisis", "Strain"]]
    ]
  },

  1: {
    question: "When opportunities start coming faster than you can evaluate them, you:",
    options: [
      ["Say yes a lot. Momentum has its own gravity.", ["Expansion", "Speed", "Energized"]],
      ["Hit pause until the fog clears.", ["Cautious", "Control", "Boundary"]],
      ["Hand choices to a tight inner circle.", ["Managerial", "Delegation", "Adaptive"]],
      ["Second-guess everything in private.", ["Impostor", "Fragile", "tension"]],
      ["Start declining out of sheer overload.", ["Resistance", "Withdrawal", "Strain"]]
    ]
  },

  2: {
    question: "The hardest part of being *more famous than expected* would be:",
    options: [
      ["Losing the option of true anonymity.", ["BoundaryCrisis", "Strain"]],
      ["Keeping up with the version people expect.", ["Impostor", "Fragile"]],
      ["Staying in control as scale balloons.", ["Managerial", "Control"]],
      ["The sheer speed of the escalation.", ["Expansion", "Speed"]],
      ["Feeling stuck in something that grew too fast.", ["Overloaded", "tension"]]
    ]
  },

  3: {
    question: "Your relationship to influence changes when fame explodes. You:",
    options: [
      ["Lean in — influence is a tool.", ["Expansion", "PowerComfort"]],
      ["Handle it delicately. It’s a sharp accessory.", ["Cautious", "Ethics"]],
      ["Formalize it through roles, systems, and teams.", ["Managerial", "Control"]],
      ["Feel detached from it. It doesn’t feel real.", ["Impostor", "Dislocation"]],
      ["Want to hand some of it back.", ["Resistance", "Withdrawal"]]
    ]
  },

  4: {
    question: "When people project expectations you never consented to, you:",
    options: [
      ["Adapt. Expectations come with scale.", ["Expansion", "Adaptive"]],
      ["Push back and redraw the lines.", ["Cautious", "Boundary"]],
      ["Clarify through teams, statements, and structure.", ["Managerial", "Control"]],
      ["Take it personally and feel like you’re failing.", ["Impostor", "Fragile"]],
      ["Feel boxed in and annoyed.", ["Resistance", "Strain"]]
    ]
  },

  5: {
    question: "If success keeps compounding beyond reason, your biggest risk is:",
    options: [
      ["Overextending and burning too bright.", ["Expansion", "Overreach"]],
      ["Freezing and missing the moment.", ["Cautious", "Paralysis"]],
      ["Getting trapped by your own systems.", ["Managerial", "Rigidity"]],
      ["Folding into doubt.", ["Impostor", "Fragile"]],
      ["Withdrawing so hard you vanish.", ["Resistance", "Withdrawal"]]
    ]
  },

  6: {
    question: "Deep down, the sentence that spooks you most is:",
    options: [
      ["“This could go even bigger.”", ["Expansion", "Speed"]],
      ["“I’m not built for this.”", ["Overloaded", "tension"]],
      ["“I need to professionalize everything.”", ["Managerial", "Control"]],
      ["“They’re going to realize I’m not enough.”", ["Impostor", "Fragile"]],
      ["“I can’t escape this level of visibility.”", ["BoundaryCrisis", "Strain"]]
    ]
  }
};

// Fame-native tags
const tags = {
  // Primary response patterns
  Expansion: 0,     // grows with scale
  Cautious: 0,      // slows, protects
  Managerial: 0,    // system-builds
  Impostor: 0,      // floaty disbelief
  Resistance: 0,    // pushback / withdrawal

  // Secondary pressures
  Energized: 0,
  Overloaded: 0,
  Control: 0,
  Fragile: 0,
  Strain: 0,

  // Modifiers
  Speed: 0,
  Boundary: 0,
  BoundaryCrisis: 0,
  tension: 0,
  Dislocation: 0,
  Delegation: 0,
  Ethics: 0,
  PowerComfort: 0,
  Withdrawal: 0,
  Overreach: 0,
  Paralysis: 0,
  Rigidity: 0
};

function interpretResults() {
  // ----- pick dominant RESPONSE TYPE -----
  const typeKeys = ["Expansion", "Cautious", "Managerial", "Impostor", "Resistance"];
  let top = typeKeys[0];
  typeKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const totalQuestions = 7;

  // ----- axes -----
  // Spark vs Weight: Energized vs Overloaded/Strain
  const stressScore = tags.Energized - (tags.Overloaded + tags.Strain);
  let stressPct = Math.round(((stressScore + totalQuestions) / (totalQuestions * 2)) * 100);
  stressPct = Math.max(0, Math.min(stressPct, 100));

  // Control orientation
  const controlScore = tags.Control + tags.Delegation - (tags.Paralysis + tags.Withdrawal);
  let controlPct = Math.round(((controlScore + totalQuestions) / (totalQuestions * 2)) * 100);
  controlPct = Math.max(0, Math.min(controlPct, 100));

  const isEnergized = stressPct >= 60;
  const isControlHigh = controlPct >= 60;

  // ----- style adjective -----
  let style;
  if (top === "Expansion" && isEnergized) style = "Momentum-Riding";
  else if (top === "Cautious") style = "Pace-Setting";
  else if (top === "Managerial" && isControlHigh) style = "System-Built";
  else if (top === "Impostor") style = "Reality-Warped";
  else style = "Visibility-Resistant";

  const typeNames = {
    Expansion: "Expander",
    Cautious: "Protector",
    Managerial: "Operator",
    Impostor: "Impostor",
    Resistance: "Resister"
  };

  const personaTitle = `${style} ${typeNames[top]}`;

  const typeBlurb = {
    Expansion:
      "When fame spikes, you grow with it. The scale is intense — but the momentum feels electric.",
    Cautious:
      "You slow the machine. You’d rather stay elegant and intact than let the moment chew you up.",
    Managerial:
      "You respond by building structure. Fame becomes a logistics problem with better lighting.",
    Impostor:
      "The bigger it gets, the more unreal it feels. You’re there, but part of you is watching it happen.",
    Resistance:
      "You push back. The visibility exceeded the contract you thought you signed."
  }[top];

  const stressPhrase =
    stressPct >= 70 ? "You metabolize scale as sparkle and fuel." :
    stressPct >= 55 ? "You feel both thrill and weight at once." :
    "The weight shows up faster than the thrill.";

  const controlPhrase =
    controlPct >= 70 ? "You survive with structure: systems, delegation, clean rules." :
    controlPct >= 55 ? "You want some structure, but not a full corporate takeover of your life." :
    "Once things accelerate, control can feel like trying to hold water.";

  const riskLine = {
    Expansion: "Watch-out: burning too bright and losing the plot.",
    Cautious: "Watch-out: protecting yourself so hard you miss the moment.",
    Managerial: "Watch-out: turning your life into a machine with a glam filter.",
    Impostor: "Watch-out: letting the unreality steal your enjoyment.",
    Resistance: "Watch-out: disappearing instead of designing a new way to be seen."
  }[top];

  const para1 = `${typeBlurb} ${stressPhrase} ${controlPhrase}`;
  const para2 = `${riskLine} This is where success stops being a number and starts being a whole atmosphere.`;

  const description = `${para1}<br><br>${para2}`.trim();

  const colorByType = {
    Expansion: "rgb(200, 90, 90)",
    Cautious: "rgb(0, 170, 140)",
    Managerial: "rgb(90, 120, 200)",
    Impostor: "rgb(200, 170, 90)",
    Resistance: "rgb(170, 120, 220)"
  };

  // Reset tags
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByType[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "More Famous Than Expected";
