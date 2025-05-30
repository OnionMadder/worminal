import { respondToWormMisbehavior } from '../mommy/wormMommy.js';

const storageKey = "squirmyMemory";

const defaultMemory = {
  name: "squirmy",
  attention: 0,
  ignored: 0,
  clicks: 0,
  affection: 0,
  annoyance: 0,
  trust: 5,
  fear: 0,
  praiseCount: 0,
  jealousy: 0,
  giftsReceived: [],
  giftLikes: ["mommy's ribbon", "data coil"],
  giftDislikes: ["attention chip", "punishment toy"],
  scolded: false,
  currentTier: "early",
  mood: "neutral"
};

export const memory = JSON.parse(localStorage.getItem(storageKey)) || structuredClone(defaultMemory);

export function save() {
  localStorage.setItem(storageKey, JSON.stringify(memory));
}

export function reset() {
  Object.assign(memory, structuredClone(defaultMemory));
  save();
}

export function getWormDisplayName(id) {
  switch (id) {
    case "squirmy":
      return "Squirmy";
    default:
      return "Unknown Worm";
  }
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
    incrementStat("affection", 3);
    incrementStat("trust", 1);
    return `[${memory.name.toUpperCase()}] nuzzled the ${giftItem} with quiet joy.`;
  }

  if (memory.giftDislikes.includes(giftItem)) {
    incrementStat("fear", 1);
    incrementStat("annoyance", 2);
    respondToWormMisbehavior(memory.name);
    return `[${memory.name.toUpperCase()}] flinched at the ${giftItem}. it reminded him of something bad.`;
  }

  incrementStat("affection", 1);
  return `[${memory.name.toUpperCase()}] accepted the ${giftItem}, uncertain but hopeful.`;
}
