const storageKey = "wormyMemory";

const defaultMemory = {
  name: "wormy",
  clicks: 0,
  affection: 0,
  annoyance: 0,
  suspicion: 0,
  jealousy: 0,
  giftsReceived: [],
  giftLikes: ["socks", "old recordings"],
  giftDislikes: ["noise"],
  scolded: false,
  mood: "curious",
};

export const memory = JSON.parse(localStorage.getItem(storageKey)) || structuredClone(defaultMemory);

export function save() {
  localStorage.setItem(storageKey, JSON.stringify(memory));
}

export function reset() {
  Object.assign(memory, structuredClone(defaultMemory));
  save();
}

export function incrementStat(stat, amount = 1) {
  if (typeof memory[stat] === "number") {
    memory[stat] += amount;
    save();
  }
}

export function setMood(newMood) {
  memory.mood = newMood;
  save();
}

export function handleGift(giftItem) {
  memory.giftsReceived.push(giftItem);

  if (memory.giftLikes.includes(giftItem)) {
    incrementStat("affection", 2);
    return `[WORMY] wriggled around the ${giftItem}. it made him feel noticed.`;
  }

  if (memory.giftDislikes.includes(giftItem)) {
    incrementStat("annoyance", 2);
    return `[WORMY] pulsed in protest. the ${giftItem} was too much.`; // or call a misbehavior handler
  }

  incrementStat("affection", 1);
  return `[WORMY] accepted the ${giftItem}. he stared at it for a long time.`;
}
