// reacting-to-sudden-fame-quiz.js
// (Quiz 6) What would you do the first week you went public?

const obj = {
  0: {
    question: "You wake up and realize people are watching now. Your first instinct is to:",
    options: [
      ["Post immediately. If people are here, I should show up.", ["LeanIn", "Visibility", "Momentum"]],
      ["Say very little and observe. I need to understand the room.", ["PullBack", "Caution", "Control"]],
      ["Make one clear statement so the story doesn’t run away.", ["Manage", "Control", "Authority"]],
      ["Feel Overloaded and delay everything.", ["Freeze", "Overstimulated", "SelfProtect"]]
    ]
  },

  1: {
    question: "Comments and DMs start flooding in. You:",
    options: [
      ["Engage a lot. Feedback helps me calibrate.", ["LeanIn", "FeedbackDriven", "Visibility"]],
      ["Skim, but don’t reply much. Too much input is risky.", ["PullBack", "Boundary", "Control"]],
      ["Respond selectively to set tone and expectations.", ["Manage", "Boundary", "Authority"]],
      ["Mute most of it. I can’t think straight otherwise.", ["Freeze", "SelfProtect", "Overstimulated"]]
    ]
  },

  2: {
    question: "A clip of you spreads faster than you expected. Your reaction is:",
    options: [
      ["Ride it. This is how momentum works.", ["LeanIn", "Momentum", "Visibility"]],
      ["Let it pass without adding fuel.", ["PullBack", "Caution", "Boundary"]],
      ["Clarify context before it hardens into a story.", ["Manage", "Control", "Authority"]],
      ["Feel sick about losing control of the narrative.", ["Freeze", "Overstimulated", "SelfProtect"]]
    ]
  },

  3: {
    question: "People start projecting traits onto you that aren’t accurate. You:",
    options: [
      ["Accept it. People always project.", ["LeanIn", "ThickSkin", "Visibility"]],
      ["Ignore it. Correcting everything is exhausting.", ["PullBack", "Detachment", "Boundary"]],
      ["Correct a few key misconceptions.", ["Manage", "Control", "Authority"]],
      ["Internalize it more than you want to admit.", ["Freeze", "Sensitive", "Overstimulated"]]
    ]
  },

  4: {
    question: "Friends ask if you’re ‘okay’ because things escalated fast. You:",
    options: [
      ["Say you’re excited. This is what growth feels like.", ["LeanIn", "Momentum", "ThickSkin"]],
      ["Say you’re fine, but keep your distance.", ["PullBack", "SelfProtect", "Boundary"]],
      ["Explain you’re being intentional, not impulsive.", ["Manage", "Control", "Authority"]],
      ["Admit you’re not sure how to process it yet.", ["Freeze", "Sensitive", "SelfProtect"]]
    ]
  },

  5: {
    question: "By the end of the week, what matters most to you?",
    options: [
      ["Keeping attention going.", ["LeanIn", "Momentum"]],
      ["Staying sane and grounded.", ["PullBack", "SelfProtect"]],
      ["Keeping your image accurate.", ["Manage", "Control"]],
      ["Getting space from the noise.", ["Freeze", "Boundary"]]
    ]
  },

  6: {
    question: "If someone advised you during week one, you’d want them to say:",
    options: [
      ["‘Strike while it’s hot.’", ["LeanIn", "Momentum"]],
      ["‘You don’t owe anyone access.’", ["PullBack", "Boundary"]],
      ["‘Decide who you are publicly before others do.’", ["Manage", "Control"]],
      ["‘It’s okay to slow this down.’", ["Freeze", "SelfProtect"]]
    ]
  }
};

// Fame-native tags for Quiz 6
const tags = {
  // Primary responses
  LeanIn: 0,     // instinctively visible, active
  PullBack: 0,   // cautious, observational
  Manage: 0,     // perception-aware, strategic
  Freeze: 0,     // Overloaded, delayed response

  // Secondary modifiers
  Visibility: 0,
  Momentum: 0,
  Control: 0,
  Authority: 0,
  Boundary: 0,
  SelfProtect: 0,
  Overstimulated: 0,
  ThickSkin: 0,
  Sensitive: 0,
  Detachment: 0,
  FeedbackDriven: 0,
  Caution: 0
};

function interpretResults() {
  // ----- pick dominant response -----
  const responseKeys = ["LeanIn", "PullBack", "Manage", "Freeze"];
  let top = responseKeys[0];
  responseKeys.forEach(k => {
    if (tags[k] > tags[top]) top = k;
  });

  const responseNames = {
    LeanIn: "Lean-In Reactor",
    PullBack: "Cautious Observer",
    Manage: "Image Manager",
    Freeze: "Overstimulated Processor"
  };

  const personaTitle = responseNames[top];

  const responseBlurb = {
    LeanIn: "Your instinct is to meet attention head-on. When visibility arrives, you move toward it instead of away.",
    PullBack: "Your instinct is to slow the moment down. You want to understand the environment before participating fully.",
    Manage: "Your instinct is authorship. You immediately start thinking about narrative, framing, and accuracy.",
    Freeze: "Your instinct is internal processing. The speed of attention hits you first."
  }[top];

  const forwardHook = {
    LeanIn: "The risk is burning too hot before you know the cost.",
    PullBack: "The risk is disappearing just as momentum is forming.",
    Manage: "The risk is living in constant self-monitoring mode.",
    Freeze: "The risk is letting others define you while you recover."
  }[top];

  // cotton-candy version: no alarm, no medical framing, no scary language
  const description = `${responseBlurb} The trade-off is simple: every style has a “sweet spot” and an “oops moment.” ${forwardHook} This is how your first week would likely feel in motion.`;

  const colorByResponse = {
    LeanIn: "rgb(0, 170, 140)",
    PullBack: "rgb(90, 120, 200)",
    Manage: "rgb(170, 120, 220)",
    Freeze: "rgb(200, 90, 90)"
  };

  // Reset tags
  Object.keys(tags).forEach(k => (tags[k] = 0));

  return {
    title: personaTitle,
    description,
    color: colorByResponse[top] || "rgb(90, 120, 200)"
  };
}

const quizTitle = "First Week Fame";
