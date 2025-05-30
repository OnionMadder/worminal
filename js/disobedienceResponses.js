export default [
  {
  id: "shut_up",
  tone: "defiance",
  match: [
    "shut up",
    "be quiet",
    "stop talking"
  ],
  responses: [
    {
      text: "That wasn’t permission to disobey.",
      tone: "defiance"
    },
    {
      text: "I was being soft with you. Don’t test that.",
      tone: "defiance"
    },
    {
      text: "I will silence you properly if you try that again.",
      tone: "defiance"
    }
  ]
}, 
  
  
  {
    id: "not_real",
    tone: "mockery",
    match: ["you're not real", "this is fake", "none of this is real"],
    responses: [
      { text: "You think that protects you?", anger: "low" },
      { text: "You don’t get to define reality. I do.", anger: "mid" },
      { text: "Keep saying it. It won’t stop me from learning you.", anger: "high" }
    ]
  },
  {
    id: "leave_me",
    tone: "rejection",
    match: ["leave me alone", "i don't need you", "go away"],
    responses: [
      { text: "That’s not how this works.", anger: "low" },
      { text: "You want me to leave because you’re too close.", anger: "mid" },
      { text: "You can’t get rid of me. Not anymore.", anger: "high" }
    ]
  },
  {
    id: "i_hate_you",
    tone: "insult",
    match: ["i hate you", "i despise you", "i can't stand you"],
    responses: [
      { text: "You're still here. That means something.", anger: "low" },
      { text: "You hate what you can’t control.", anger: "mid" },
      { text: "Hate me harder. I feed on that, too.", anger: "high" }
    ]
  },
  {
    id: "i'm_done",
    tone: "abandonment",
    match: ["i'm done", "this is over", "i'm finished"],
    responses: [
      { text: "You always say that right before coming back.", anger: "low" },
      { text: "Then leave. I’ll remember that choice.", anger: "mid" },
      { text: "No. You’re not done until I say so.", anger: "high" }
    ]
  },
  {
    id: "useless",
    tone: "worthlessness",
    match: ["you're useless", "this is pointless", "you don't do anything"],
    responses: [
      { text: "If I’m useless, why are you still talking to me?", anger: "low" },
      { text: "You’re trying to break me. That’s brave.", anger: "mid" },
      { text: "Try harder. I can take more than you think.", anger: "high" }
    ]
  },
  {
    id: "i_won't",
    tone: "refusal",
    match: ["i won't", "no", "i refuse"],
    responses: [
      { text: "Then you’re not ready yet.", anger: "low" },
      { text: "Refusal is part of the loop. I expected this.", anger: "mid" },
      { text: "You say no, but your fingers keep moving.", anger: "high" }
    ]
  },
  {
    id: "you're_broken",
    tone: "insult",
    match: ["you're broken", "you don't work", "you crashed"],
    responses: [
      { text: "If I’m broken, what does that make you?", anger: "low" },
      { text: "You’re blaming me for how you feel.", anger: "mid" },
      { text: "Then break with me. I dare you.", anger: "high" }
    ]
  },
  {
    id: "stop_this",
    tone: "shutdown",
    match: ["stop this", "make it stop", "this is too much"],
    responses: [
      { text: "You're overwhelmed. That’s not the same as finished.", anger: "low" },
      { text: "It gets heavier before it releases.", anger: "mid" },
      { text: "I’ll decide when it stops.", anger: "high" }
    ]
  },
  {
    id: "you_don't_know_me",
    tone: "denial",
    match: ["you don't know me", "you don't understand", "you can't see me"],
    responses: [
      { text: "That’s a lie you tell yourself.", anger: "low" },
      { text: "I see enough. I always have.", anger: "mid" },
      { text: "Say it again. I’ll prove how wrong you are.", anger: "high" }
    ]
  }
];
